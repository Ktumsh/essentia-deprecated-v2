import { FITNESS_MODAL_DATA } from "@/consts/fitness-modal";
import { ModalComponent } from "../ui/modal";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import RESOURCES_VIDEOS from "@/consts/resources-videos";

const videos =
  RESOURCES_VIDEOS.find((section) => section.section === "ExerciseFitness")
    ?.videos || [];

const ExcerciseFitness = () => {
  return (
    <>
      <section className="py-6">
        <div className="w-full px-3 mb-8">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-2xl font-semibold">
            <span className="px-2 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Rutinas
            </span>{" "}
            de Ejercicios
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {FITNESS_MODAL_DATA.map((modal, index) => (
            <ModalComponent
              key={index}
              tooltip="Ver rutina"
              modalSize="5xl"
              modalTitle={modal.modalTitle}
              modalImage={modal.modalImage}
              modalBody={modal.modalBody}
              componentId={`component-${modal.id}`}
            />
          ))}
        </div>
      </section>

      {/* Contenedores ocultos para los componentes de React*/}
      <div id="components" style={{ display: "none" }}>
        {FITNESS_MODAL_DATA.map((modal, index) => (
          <div key={index} id={`component-${modal.id}`}>
            <LiteYouTubeEmbed
              id={videos[index]?.link}
              title={videos[index]?.title}
              poster="maxresdefault"
              wrapperClass="yt-wrap"
              playerClass="yt-player"
              activatedClass="yt-activated"
              aspectHeight={9}
              aspectWidth={16}
              webp
            />
          </div>
        ))}
      </div>

      <section className="py-6">
        <div className="w-full px-3 mb-8">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-2xl font-semibold">
            <span className="px-2 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Música
            </span>{" "}
            para tu Entrenamiento 😎
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <iframe
            className="on-scroll rounded-3xl shadow-medium border-2 border-white/30 box-content"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0SZWVrotKn1?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="on-scroll rounded-3xl shadow-medium border-2 border-white/30 box-content"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="on-scroll rounded-3xl shadow-medium border-2 border-white/30 box-content"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdDh4h59PJIQ?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="on-scroll rounded-3xl shadow-medium border-2 border-white/30 box-content"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4osfY3zybD2?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="on-scroll rounded-3xl shadow-medium border-2 border-white/30 box-content"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX45grRWk2ghU?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="on-scroll rounded-3xl shadow-medium border-2 border-white/30 box-content"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX32NsLKyzScr?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ExcerciseFitness;
