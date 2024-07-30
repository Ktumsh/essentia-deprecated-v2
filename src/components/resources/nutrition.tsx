import { NUTRITION_MODAL_DATA } from "@/consts/nutrition-modal";
import NutritionCarousel from "./nutrition-carousel";

const Nutrition = () => {
  return (
    <>
      <section className="-ml-3 py-6">
        <div className="w-full px-6 mb-8">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-2xl font-semibold">
            <span className="px-2 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Recetas
            </span>{" "}
            Saludable
          </h3>
        </div>
        <div className="mb-24">
          <div className="flex flex-col sm:px-3 space-y-3 mb-4 text-base-color dark:text-white">
            <h4 className="text-lg">Desayunos Saludables</h4>
            <p className="text-sm text-base-color-h dark:text-base-color-dark">
              En Essentia te damos las mejores recetas de desayuno saludable
              para que comiences el día comiendo sano. Granola, batido de frutas
              o Yogurt con berries.
            </p>
          </div>
          <NutritionCarousel
            data={NUTRITION_MODAL_DATA}
            startIndex={18}
            totalItems={15}
          />
        </div>
        <div className="mb-24">
          <div className="flex flex-col sm:px-3 space-y-3 mb-4 text-base-color dark:text-white">
            <h4 className="text-lg">Almuerzos y Cenas Saludables</h4>
            <p className="text-sm text-base-color-h dark:text-base-color-dark">
              Prepara tu almuerzo o cena de forma saludable con nuestras recetas
              Gourmet. Tortilla de acelga, berenjena rellena o salmón a la
              plancha.
            </p>
          </div>
          <NutritionCarousel
            data={NUTRITION_MODAL_DATA}
            startIndex={0}
            totalItems={18}
          />
        </div>
        <div className="mb-24">
          <div className="flex flex-col sm:px-3 space-y-3 mb-4 text-base-color dark:text-white">
            <h4 className="text-lg">Onces Saludables</h4>
            <p className="text-sm text-base-color-h dark:text-base-color-dark">
              Prepara tu once saludable o la hora del té con alguna de estas
              recetas. Aprende a hacer pan integral, hamburguesas de lentejas o
              galletas de avena.
            </p>
          </div>
          <NutritionCarousel
            data={NUTRITION_MODAL_DATA}
            startIndex={33}
            totalItems={15}
          />
        </div>
      </section>
    </>
  );
};

export default Nutrition;
