import { HEALTH_MODAL_DATA } from "@/consts/health-modal";
import { normalizeTitle } from "@/lib/utils";
import { Video } from "@/types/resource";
import { nanoid } from "nanoid";
import RESOURCES_VIDEOS from "./resources-videos";
import { FITNESS_MODAL_DATA } from "./fitness-modal";
import { IconSvgProps } from "@/types/general";
import {
  ExcerciseIcon,
  ForAllAgesIcon,
  HealthIcon,
  NutritionIcon,
  SexualityIcon,
  WellbeingIcon,
} from "@/components/icons/main";
import { NUTRITION_MODAL_DATA } from "./nutrition-modal";

export interface SearchResult {
  content: string;
  objectID: string;
  type: string;
  url: string;
  icon?: (props: IconSvgProps) => JSX.Element;
}

const healthVideos: Video[] =
  RESOURCES_VIDEOS.find((section) => section.section === "HealthWellness")
    ?.videos || [];

// Datos estáticos
const healthSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud y Bienestar",
    objectID: nanoid(),
    type: "Salud y bienestar",
    url: "/salud-y-bienestar#introduccion-a-salud-y-bienestar",
    icon: HealthIcon,
  },
  {
    content: "Artículos Interesantes",
    objectID: nanoid(),
    type: "Salud y bienestar",
    url: "/salud-y-bienestar#articulos-interesantes",
  },
  {
    content: "Videos Recomendados",
    objectID: nanoid(),
    type: "Salud y bienestar",
    url: "/salud-y-bienestar#videos-recomendados",
  },
  {
    content: "Podcasts Recomendados",
    objectID: nanoid(),
    type: "Salud y bienestar",
    url: "/salud-y-bienestar#podcasts-recomendados",
  },
];

const fitnessSearchData: SearchResult[] = [
  {
    content: "Introducción a Ejercicios y Fitness",
    objectID: nanoid(),
    type: "Ejercicios y fitness",
    url: "/ejercicios-y-fitness#introduccion-a-ejercicios-y-fitness",
    icon: ExcerciseIcon,
  },
  {
    content: "Rutinas de Ejercicios",
    objectID: nanoid(),
    type: "Ejercicios y fitness",
    url: "/ejercicios-y-fitness#rutinas-de-ejercicios",
  },
  {
    content: "Música para tu Entrenamiento",
    objectID: nanoid(),
    type: "Ejercicios y fitness",
    url: "/ejercicios-y-fitness#musica-para-tu-entrenamiento",
  },
];

const nutritionSearchData: SearchResult[] = [
  {
    content: "Introducción a Nutrición y Alimentación",
    objectID: nanoid(),
    type: "Nutrición y alimentación",
    url: "/nutricion-y-alimentacion#introduccion-a-nutricion-y-alimentacion",
    icon: NutritionIcon,
  },
  {
    content: "Recetas Saludables",
    objectID: nanoid(),
    type: "Nutrición y alimentación",
    url: "/nutricion-y-alimentacion#recetas-saludables",
  },
  {
    content: "Desayunos Saludables",
    objectID: nanoid(),
    type: "Nutrición y alimentación",
    url: "/nutricion-y-alimentacion#desayunos-saludables",
  },
  {
    content: "Almuerzos y Cenas Saludables",
    objectID: nanoid(),
    type: "Nutrición y alimentación",
    url: "/nutricion-y-alimentacion#almuerzos-y-cenas-saludables",
  },
  {
    content: "Onces Saludables",
    objectID: nanoid(),
    type: "Nutrición y alimentación",
    url: "/nutricion-y-alimentacion#onces-saludables",
  },
];

const wellbeingSearchData: SearchResult[] = [
  {
    content: "Introducción a Bienestar Emocional",
    objectID: nanoid(),
    type: "Bienestar emocional",
    url: "/bienestar-emocional#introduccion-a-bienestar-emocional",
    icon: WellbeingIcon,
  },
];

const sexEducationSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud y Educación Sexual",
    objectID: nanoid(),
    type: "Salud y educación sexual",
    url: "/salud-y-educacion-sexual#introduccion-a-salud-y-educacion-sexual",
    icon: SexualityIcon,
  },
];

const forAllAgesSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud para Todas las Edades",
    objectID: nanoid(),
    type: "Salud para todas las edades",
    url: "/salud-para-todas-las-edades#introduccion-a-salud-para-todas-las-edades",
    icon: ForAllAgesIcon,
  },
];

// Datos de video modales
const videoHealthSearchData: SearchResult[] = healthVideos.map((video) => ({
  content: video.title,
  objectID: nanoid(),
  type: "Salud y bienestar",
  url: `/salud-y-bienestar#${normalizeTitle(video.title)}`,
  icon: HealthIcon,
}));

// Datos de modal
const healthModalSearchData: SearchResult[] = HEALTH_MODAL_DATA.map((data) => ({
  content: data.modalTitle,
  objectID: nanoid(),
  type: "Salud y bienestar",
  url: `/salud-y-bienestar#${normalizeTitle(data.modalTitle)}`,
  icon: HealthIcon,
}));

const fitnessModalSearchData: SearchResult[] = FITNESS_MODAL_DATA.map(
  (data) => ({
    content: data.modalTitle,
    objectID: nanoid(),
    type: "Ejercicios y fitness",
    url: `/ejercicios-y-fitness#${normalizeTitle(data.modalTitle)}`,
    icon: ExcerciseIcon,
  })
);

const nutritionModalSearchData: SearchResult[] = NUTRITION_MODAL_DATA.map(
  (data) => ({
    content: data.modalTitle,
    objectID: nanoid(),
    type: "Nutrición y alimentación - Recetas",
    url: `/nutricion-y-alimentacion#${normalizeTitle(data.modalTitle)}`,
    icon: NutritionIcon,
  })
);

// Combinación de arrays
export const searchData: SearchResult[] = [
  ...healthSearchData,
  ...fitnessSearchData,
  ...nutritionSearchData,
  ...wellbeingSearchData,
  ...sexEducationSearchData,
  ...forAllAgesSearchData,
  ...healthModalSearchData,
  ...fitnessModalSearchData,
  ...nutritionModalSearchData,
  ...videoHealthSearchData,
];
