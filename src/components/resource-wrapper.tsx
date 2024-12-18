"use client";

import SearchHighlight from "@/components/search-highlight";
import {
  Button,
  Chip,
  Image,
  Modal,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { PlayIcon2, StarIcon } from "./icons/icons";
import { FC, useState } from "react";
import { cn, normalizeTitle } from "@/lib/utils";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { motion } from "framer-motion";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "./lite-youtube.css";

import { tooltipStyles } from "@/styles/tooltip-styles";

interface Props {
  title: string;
  quote: string;
  videoTitle: string;
  videoLink: string;
  videoImage: string;
  imageFull: string;
  background?: string;
  component: FC;
}

const ResourceWrapper: FC<Props> = ({
  title,
  quote,
  videoTitle,
  videoLink,
  videoImage,
  imageFull,
  background,
  component: ContentComponent,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeVideo, setActiveVideo] = useState<Props | null>(null);

  const formatedTitle = normalizeTitle(title);

  const handleOpenModal = (video: Props) => {
    setActiveVideo(video);
    onOpen();
  };
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none hidden dark:block"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className={cn(
            "before:absolute before:left-1/3 before:top-1/4 before:w-[800px] before:h-[600px] before:content-[''] before:z-[-1] before:blur-[200px] before:rounded-full before:opacity-40",
            "after:absolute after:left-1/2 after:top-1/4 after:w-[160px] after:h-[200px] after:content-[''] after:z-[-1] after:blur-3xl after:opacity-80",
            `before:${background} after:${background}`
          )}
        ></motion.div>
      </div>
      <div className="relative flex justify-center size-full">
        <main className="relative flex flex-col min-h-[calc(100dvh-80px)] w-full md:min-w-[768px] max-w-5xl mt-14 py-5 lg:px-5 shrink items-stretch grow">
          <div className="container mx-auto select-none">
            <div className="flex flex-col w-full mx-auto">
              <section
                id={`introduccion-a-${formatedTitle}`}
                data-id={`introduccion-a-${formatedTitle}`}
                data-name={`Introducción a ${title}`}
                className="relative flex mb-5 border border-gray-100 dark:border-base-dark shadow-md lg:rounded-xl overflow-hidden"
              >
                <div className="absolute p-5 top-0 right-0 z-20">
                  <Tooltip
                    content="Contenido recomendado"
                    delay={800}
                    closeDelay={0}
                    classNames={{
                      content: tooltipStyles.content,
                    }}
                  >
                    <Chip
                      variant="shadow"
                      classNames={{
                        base: "w-12 max-w-full justify-center bg-light-gradient dark:bg-dark-gradient-v2 cursor-help",
                        content: "flex justify-center",
                      }}
                    >
                      <StarIcon className="w-4 text-white" />
                    </Chip>
                  </Tooltip>
                </div>
                <div className="group relative flex flex-col justify-center w-full h-[368px] lg:h-[422px] text-base-color overflow-hidden">
                  <div className="flex flex-col items-start justify-start absolute w-full shrink-0 top-1 px-5 pt-3 z-10 group-active:opacity-0 lg:group-hover:opacity-0 transition-opacity duration-500">
                    <span className="font-bold uppercase text-white/60 font-motivasans">
                      Introducción a
                    </span>
                    <h2 className="text-4xl font-bold text-white">{title}</h2>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center size-full opacity-0 group-active:backdrop-blur-lg group-active:opacity-100 lg:group-hover:backdrop-blur-lg lg:group-hover:opacity-100 transition duration-500 z-10">
                    <div className="relative flex flex-col items-center justify-center max-w-60 lg:max-w-2xl z-10 before:bg-black/40 before:absolute before:inset-0 before:blur-xl before:rounded-full before:z-[-1] group-active:scale-110 lg:group-hover:scale-110 transition duration-500">
                      <q className="text-center lg:text-2xl text-white font-medium drop-shadow-sm">
                        {quote}
                      </q>
                    </div>
                  </div>
                  <Image
                    classNames={{
                      wrapper: "!max-w-full h-full sm:h-auto",
                      img: "relative size-full rounded-none brightness-95 object-cover object-center z-0",
                    }}
                    src={imageFull}
                    alt={title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-base-full-dark-50 to-black/0 to-40%"></div>
                </div>
                <div className="absolute right-0 bottom-0 px-5 py-3 z-20">
                  <Tooltip
                    content={videoTitle}
                    delay={800}
                    closeDelay={0}
                    classNames={{
                      content: tooltipStyles.content,
                    }}
                  >
                    <Button
                      variant="flat"
                      className="h-8 min-w-16 z-10 data-[hover=true]:bg-black/60 bg-black/40 backdrop-blur-sm backdrop-saturate-150"
                      onPress={() =>
                        handleOpenModal({
                          title,
                          quote,
                          videoTitle,
                          videoLink,
                          videoImage,
                          imageFull,
                          background,
                          component: ContentComponent,
                        })
                      }
                    >
                      <PlayIcon2 className="group size-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10" />
                    </Button>
                  </Tooltip>
                </div>
              </section>
              <div
                id="content"
                className="relative text-base-color dark:text-base-color-dark"
              >
                <SearchHighlight />
                <ContentComponent />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal
        backdrop="blur"
        radius="none"
        size="5xl"
        placement="center"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-[101]",
          wrapper: "z-[102]",
          closeButton:
            "z-10 hover:bg-black/5 active:bg-black/10 text-white transition-colors duration-150",
        }}
      >
        <ModalContent>
          {activeVideo && (
            <LiteYouTubeEmbed
              id={activeVideo.videoLink}
              title={activeVideo.videoTitle}
              wrapperClass="yt-wrap !rounded-none"
              playerClass="yt-player"
              activatedClass="yt-activated"
              poster="maxresdefault"
              webp
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResourceWrapper;
