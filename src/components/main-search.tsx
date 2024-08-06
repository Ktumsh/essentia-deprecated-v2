"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Kbd,
  Modal,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  Chevron,
  DeleteHistoryIcon,
  HashFillIcon,
  SearchIcon,
} from "./icons/icons";
import { useId } from "react";
import { useRouter, usePathname } from "next/navigation";
import { searchData, SearchResult } from "@/consts/search-data";
import { containsAllLetters, normalizeText } from "@/lib/utils";
import useWindowSize from "@/lib/hooks/use-window-size";

const MainSearch: React.FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowSize();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const storedSearches: SearchResult[] = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    const normalizedValue = normalizeText(value);

    const results = searchData.filter((search) => {
      const normalizedContent = normalizeText(search.content);
      const normalizedType = normalizeText(search.type);

      return (
        containsAllLetters(normalizedContent, normalizedValue) ||
        containsAllLetters(normalizedType, normalizedValue)
      );
    });

    setSearchResults(results);
  };

  const handleSearchSelect = (search: SearchResult) => {
    if (pathname === search.url.split("#")[0]) {
      window.location.hash = search.url.split("#")[1];
      setTimeout(() => {
        const event = new Event("hashchange");
        window.dispatchEvent(event);
      }, 100);
    } else {
      router.push(search.url);
    }
    saveRecentSearch(search);
    onClose();
  };

  const handleRecentSearchClick = (search: SearchResult) => {
    handleSearchSelect(search);
  };

  const saveRecentSearch = (search: SearchResult) => {
    let updatedSearches = [...recentSearches];
    if (!recentSearches.some((s) => s.objectID === search.objectID)) {
      updatedSearches = [search, ...recentSearches].slice(0, 5);
    }
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>
      <Button
        aria-label="Abrir búsqueda"
        radius="full"
        onPress={onOpen}
        startContent={<SearchIcon className="size-5" />}
        className="hidden md:inline-flex lg:justify-start w-10 xl:w-full px-0 lg:px-4 min-w-0 lg:min-w-40 dark:bg-base-dark text-base-color-m dark:text-base-color-dark-m"
      >
        <span className="hidden lg:block">Busca rápida...</span>
      </Button>

      <Button
        aria-label="Abrir búsqueda"
        onPress={onOpen}
        fullWidth
        radius="none"
        variant="light"
        color="danger"
        className="inline-flex md:hidden !h-full min-w-0 after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-[3px] after:bg-current after:scale-x-0 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-full-dark-50 text-gray-500 dark:text-gray-400 dark:data-[hover=true]:text-bittersweet-400 dark:dark:data-[hover=true]:text-cerise-red-600"
      >
        <SearchIcon className="size-6" aria-hidden="true" />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark text-base-color dark:text-base-color-dark",
          closeButton: "hidden",
          header: "p-0 border-b border-gray-200 dark:border-base-dark",
        }}
      >
        <ModalContent>
          <>
            <ModalHeader>
              <div className="flex items-center w-full pl-2 pr-4">
                <Input
                  role="combobox"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-autocomplete="list"
                  aria-expanded="true"
                  aria-controls={id}
                  aria-labelledby={id}
                  isClearable
                  size="lg"
                  placeholder="Busca todo lo que quieras..."
                  value={searchTerm}
                  onValueChange={handleSearchChange}
                  startContent={<SearchIcon className="size-7 mr-1" />}
                  classNames={{
                    inputWrapper:
                      "h-14 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent text-base-color-m dark:text-base-color-dark-m group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
                    input: "placeholder:text-lg",
                  }}
                />
                <Kbd
                  classNames={{
                    abbr: "hidden",
                    base: "hidden lg:block py-1 px-2 font-medium text-[0.7rem] leading-snug bg-gray-200 dark:bg-base-dark text-base-color dark:text-base-color-dark",
                  }}
                >
                  ESC
                </Kbd>
              </div>
            </ModalHeader>
            <div
              role="listbox"
              aria-label="Sugerencias"
              aria-labelledby={id}
              id={id}
              className="px-4 mt-2 pb-4 overflow-y-auto max-h-[50vh] scrollbar-hide md:scrollbar-default custom-scroll v2"
            >
              {/* Búsquedas recientes */}
              {searchTerm.length < 1 && recentSearches.length > 0 && (
                <div role="presentation" data-value="recent">
                  <div id={id} aria-hidden="true">
                    <div className="flex items-center justify-between">
                      <p>Recientes</p>
                    </div>
                  </div>
                  <div role="group" aria-labelledby={id}>
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        role="option"
                        data-value={search.content}
                        fullWidth
                        size="lg"
                        radius="sm"
                        variant="light"
                        disableAnimation
                        startContent={
                          <SearchIcon className="size-7 text-base-color-d dark:text-base-color-dark-d group-data-[hover=true]:text-white group-data-[focus=true]:text-white" />
                        }
                        endContent={<Chevron className="size-5 rotate-180" />}
                        className="justify-between h-16 mt-2 px-4 text-start bg-gray-200 dark:bg-base-dark data-[hover=true]:bg-bittersweet-400 dark:data-[hover=true]:bg-cerise-red-600 data-[focus=true]:bg-bittersweet-400 dark:data-[focus=true]:bg-cerise-red-600 text-base-color-m dark:text-base-color-dark-m hover:!text-white"
                        onPress={() => handleRecentSearchClick(search)}
                      >
                        <div className="flex flex-col w-full justify-center max-w-[80%]">
                          <span className="text-xs group-data-[focus=true]:text-white select-none">
                            {search.type}
                          </span>
                          <p className="truncate text-base-color-h dark:text-base-color-dark-h group-data-[hover=true]:text-white group-data-[focus=true]:text-white select-none">
                            {search.content}
                          </p>
                        </div>
                      </Button>
                    ))}
                    <Tooltip
                      content="Limpiar historial de búsquedas"
                      delay={800}
                      closeDelay={0}
                      classNames={{
                        content:
                          "bg-gradient-to-br from-white to-gray-300 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h",
                      }}
                    >
                      <Button
                        isIconOnly
                        radius="sm"
                        size="sm"
                        variant="flat"
                        color="danger"
                        className="mt-2 float-end"
                        startContent={<DeleteHistoryIcon className="size-5" />}
                        onPress={clearRecentSearches}
                      ></Button>
                    </Tooltip>
                  </div>
                </div>
              )}
              {/* Esto aparece si el usuario ingresó menos de dos caracteres o simplemente no se encuentra la búsqueda */}
              {searchTerm.length >= 1 &&
                searchTerm.length < 6 &&
                searchResults.length === 0 && (
                  <div role="presentation" data-value="no-results">
                    <div className="flex flex-col text-center items-center justify-center h-32">
                      <div>
                        <p>No hay resultados para "{searchTerm}"</p>
                        <p className="text-base-color-d dark:text-base-color-dark-d">
                          Intente agregar más caracteres a su término de
                          búsqueda.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              {/* Esto aparece si el usuario ingresó más de 6 caracteres y no se encuentra la búsqueda */}
              {searchTerm.length >= 6 && searchResults.length === 0 && (
                <div role="presentation" data-value="no-results">
                  <div className="flex flex-col text-center items-center justify-center h-32">
                    <div>
                      <p>No hay resultados para "{searchTerm}"</p>
                      <p className="text-base-color-d dark:text-base-color-dark-d">
                        Intente buscar otra cosa.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Búsqueda | aparece cuando encuentra una o más búsquedas*/}
              {searchResults.length > 0 && (
                <div role="presentation" data-value="search">
                  {searchResults.map((result, index) => (
                    <Button
                      key={index}
                      role="option"
                      data-value={result.content}
                      fullWidth
                      size="lg"
                      radius="sm"
                      variant="light"
                      disableAnimation
                      startContent={
                        result.icon ? (
                          <result.icon className="size-6 text-base-color-d dark:text-base-color-dark-d group-data-[hover=true]:text-white group-data-[focus=true]:text-white" />
                        ) : (
                          <HashFillIcon className="size-6 text-base-color-d dark:text-base-color-dark-d group-data-[hover=true]:text-white group-data-[focus=true]:text-white" />
                        )
                      }
                      endContent={<Chevron className="size-5 rotate-180" />}
                      className="justify-between h-16 mt-2 px-4 text-start bg-gray-200 dark:bg-base-dark data-[hover=true]:bg-bittersweet-400 dark:data-[hover=true]:bg-cerise-red-600 data-[focus=true]:bg-bittersweet-400 dark:data-[focus=true]:bg-cerise-red-600 text-base-color-m dark:text-base-color-dark-m hover:!text-white"
                      onPress={() => handleSearchSelect(result)}
                    >
                      <div className="flex flex-col w-full justify-center max-w-[80%]">
                        <span className="text-xs group-data-[focus=true]:text-white select-none">
                          {result.type}
                        </span>
                        <p className="truncate text-base-color-h dark:text-base-color-dark-h group-data-[hover=true]:text-white group-data-[focus=true]:text-white select-none">
                          {result.content}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
              {/* Sin búsquedas recientes */}
              {searchTerm.length < 1 && recentSearches.length === 0 && (
                <div role="presentation" data-value="no-recent">
                  <div className="flex flex-col text-center items-center justify-center h-32">
                    <p className="text-base-color-d dark:text-base-color-dark-d">
                      Sin búsquedas recientes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainSearch;
