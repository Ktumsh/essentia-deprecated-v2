import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NutritionCarouselItem from "./nutrition-carousel-item";
import { ModalData } from "@/types/general";

interface Props {
  data: Array<ModalData>;
  startIndex: number;
  totalItems: number;
}

const NutritionCarousel = ({ data, startIndex, totalItems }: Props) => {
  const itemsGroup = data.slice(startIndex, startIndex + totalItems);

  return (
    <>
      <Carousel className="w-full" opts={{ slidesToScroll: 3, loop: true }}>
        <CarouselContent className="-ml-5">
          {itemsGroup.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-8 md:basis-1/2 lg:basis-1/3"
            >
              <NutritionCarouselItem
                modalTitle={item.modalTitle}
                modalImage={item.modalImage}
                modalBody={item.modalBody}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"absolute -bottom-10 left-10"} />
        <CarouselNext className={"absolute -bottom-10 right-7"} />
      </Carousel>
    </>
  );
};

export default NutritionCarousel;
