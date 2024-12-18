import Image from "next/image";
import { ArrowRightV2Icon } from "../icons/icons";
import Link from "next/link";

type Props = {
  class?: string;
  title: string;
  img?: string;
  alt?: string;
  href?: string;
  children?: React.ReactNode;
};

const ResourcesItem = ({
  class: classNameName,
  title,
  img,
  alt,
  href,
  children,
}: Props) => {
  return (
    <div
      id="resource_card"
      className={`
    ${classNameName}
    group flex flex-col relative
    text-foreground outline-none
    shadow-md
    hover:shadow-lg
    border border-gray-200 dark:border-none
    rounded-xl transition-all md:hover:z-50
    motion-reduce:transition-none h-48 sm:h-[241px] duration-500`}
    >
      <div className="flex flex-col items-start justify-start absolute w-full shrink-0 top-1 px-5 pt-3 z-10">
        <span className="text-tiny text-white/60 uppercase font-bold lg:group-hover:opacity-0 transition-opacity">
          Recurso
        </span>
        <h4 className="text-white font-medium text-2xl sm:text-xl 2xl:text-2xl lg:group-hover:opacity-0 transition-opacity">
          {title}
        </h4>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={600}
        height={400}
        src={img || ""}
        alt={alt || ""}
        className="relative size-full object-cover rounded-xl brightness-95 z-0 lg:group-hover:brightness-75 blur-0 !transition-all dark:lg:group-hover:blur-lg"
      />
      <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_40%)]"></div>
      <div className="flex items-center justify-end absolute bottom-0 h-auto w-full p-3 text-inherit subpixel-antialiased rounded-b-xl bg-white/30 dark:bg-base-full-dark-40 border-t-1 border-gray-100/50 dark:border-base-full-dark-50 backdrop-blur backdrop-saturate-150 lg:group-hover:pt-[195px] lg:group-hover:bg-white/50 dark:lg:group-hover:bg-base-full-dark-40 lg:group-hover:rounded-xl transition-all duration-500 z-10">
        {children}
        <Link
          href={href || "#"}
          className="relative inline-flex h-8 w-12 items-center justify-center overflow-hidden rounded-full cursor-pointer text-sm font-normal text-white shadow-md bg-light-gradient dark:bg-dark-gradient-v2 transition-all duration-300 hover:brightness-90 active:scale-[.97] lg:group-hover:w-20 lg:group-hover:-translate-x-4"
        >
          <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 lg:group-hover:-translate-x-3 lg:group-hover:opacity-100">
            Ver
          </div>
          <div className="absolute right-3.5">
            <ArrowRightV2Icon className="size-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ResourcesItem;
