"use client";

import {
  Button,
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
import { Fragment, useState, useEffect } from "react";
import { Video } from "@/types/resource";
import { HashIcon, PlayIcon } from "../icons/icons";
import Link from "next/link";
import { normalizeTitle } from "@/lib/utils";
import { useModalHash } from "@/lib/hooks/use-modal-hash";

const videos: Video[] =
  RESOURCES_VIDEOS.find((section) => section.section === "HealthWellness")
    ?.videos || [];

const getYouTubeThumbnail = (videoId: string) => {
  return `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`;
};

const HealthWellness = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <>
      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-8">
          <h3 className="drop-shadow-md text-base-color dark:text-white">
            <Button
              as={Link}
              id="articulos-interesantes"
              data-id="articulos-interesantes"
              data-name="Artículos Interesantes"
              href="#articulos-interesantes"
              disableRipple
              radius="none"
              variant="flat"
              endContent={
                <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
              }
              className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
            >
              <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
                Artículos
              </span>
              Interesantes
            </Button>
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
            <Button
              as={Link}
              id="videos-recomendados"
              data-id="videos-recomendados"
              data-name="Videos Recomendados"
              href="#videos-recomendados"
              disableRipple
              radius="none"
              variant="flat"
              endContent={
                <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
              }
              className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
            >
              <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
                Videos
              </span>
              Recomendados
            </Button>
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-5">
          {videos.map((video, index) => {
            const formatedTitle = normalizeTitle(video.title);
            const { isOpen, onOpen, onOpenChange } = useDisclosure();

            useModalHash(formatedTitle, isOpen, onOpen, setActiveVideo, video);

            useEffect(() => {
              console.log(isOpen);
            }, [isOpen]);

            return (
              <Fragment key={index}>
                <Card
                  id={formatedTitle}
                  data-id={formatedTitle}
                  data-name={video.title}
                  classNames={{
                    base: "col-span-12 md:col-span-6 border border-gray-100 dark:border-base-dark bg-white dark:bg-base-full-dark on-scroll shadow-md",
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
                          onPress={() => {
                            setActiveVideo(video);
                            onOpen();
                          }}
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
                    {activeVideo && activeVideo.link === video.link && (
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
              </Fragment>
            );
          })}
        </div>
      </section>

      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-6">
          <Button
            as={Link}
            id="podcasts-recomendados"
            data-id="podcasts-recomendados"
            data-name="Podcasts Recomendados"
            href="#podcasts-recomendados"
            disableRipple
            radius="none"
            variant="flat"
            endContent={
              <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
            }
            className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
          >
            <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Podcasts
            </span>
            Recomendados
          </Button>
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
    </>
  );
};

export default HealthWellness;
