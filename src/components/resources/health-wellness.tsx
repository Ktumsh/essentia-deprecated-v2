"use client";

import {
  Card,
  CardBody,
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { HEALTH_MODAL_DATA } from "@/consts/health-modal";
import RESOURCES_VIDEOS from "@/consts/resources-videos";
import { ModalComponent } from "../ui/modal";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Fragment, useState } from "react";
import { Video } from "@/types/resource";
import { PlayIcon } from "../icons/icons";

const videos: Video[] =
  RESOURCES_VIDEOS.find((section) => section.section === "HealthWellness")
    ?.videos || [];

const getYouTubeThumbnail = (videoId: string) => {
  return `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`;
};

const HealthWellness = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const handleOpenModal = (video: Video) => {
    setActiveVideo(video);
    onOpen();
  };

  return (
    <>
      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-8">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-xl font-semibold">
            <span className="px-2 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Artículos
            </span>{" "}
            Interesantes
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {HEALTH_MODAL_DATA.map((modal, index) => (
            <ModalComponent
              key={index}
              tooltip="Ver artículo"
              modalTitle={modal.modalTitle}
              modalImage={modal.modalImage}
              modalBody={modal.modalBody}
              componentId=""
            />
          ))}
        </div>
      </section>

      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-6">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-xl font-semibold">
            <span className="px-2 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Videos
            </span>{" "}
            Recomendados
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {videos.map((video, index) => (
            <Fragment key={index}>
              <Card
                classNames={{
                  base: "border border-gray-100 dark:border-base-dark bg-white dark:bg-base-full-dark on-scroll shadow-md",
                  body: "p-0",
                }}
                shadow="sm"
              >
                <CardBody>
                  <div className="grid grid-cols-12 h-full items-center justify-center">
                    <div className="relative col-span-5 size-full">
                      <Card
                        isPressable
                        radius="md"
                        onPress={() => handleOpenModal(video)}
                        classNames={{
                          base: "h-full",
                        }}
                      >
                        <Image
                          src={getYouTubeThumbnail(video.link)}
                          alt={video.title}
                          classNames={{
                            wrapper: "!max-w-none h-full rounded-md",
                            img: "object-cover h-full rounded-md",
                          }}
                        />
                        <PlayIcon className="group size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
                      </Card>
                    </div>
                    <div className="flex flex-col justify-center h-full col-span-7 p-3">
                      <p className="line-clamp-4 text-xs sm:text-sm text-base-color-h dark:text-base-color-dark">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-6">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-xl font-semibold">
            <span className="px-2 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Podcasts
            </span>{" "}
            Recomendados
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <iframe
            className="shadow-md bg-transparent"
            style={{ borderRadius: 16 }}
            src="https://open.spotify.com/embed/show/0aNjR24pN6QYOvGjqEZHRh?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="shadow-md bg-transparent"
            style={{ borderRadius: 16 }}
            src="https://open.spotify.com/embed/show/2nAf8IDQG1sPEwAKdG2DyM?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="shadow-md bg-transparent"
            style={{ borderRadius: 16 }}
            src="https://open.spotify.com/embed/show/5YdWqfLVaREPm8rgwA2lkE?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>

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
              id={activeVideo.link}
              title={activeVideo.title}
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

export default HealthWellness;
