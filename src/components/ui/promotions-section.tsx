import { TypographyH2 } from "@/components/ui/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PromotionImage } from "@/components/ui/image-seo";

interface PromotionsSectionProps {
  promotions: { image: string; text: string }[];
}

export function PromotionsSection({ promotions }: PromotionsSectionProps) {
  if (promotions.length === 0) return null;

  return (
    <section className="mb-8" aria-labelledby="promotions-heading">
      <TypographyH2 id="promotions-heading" className="text-xl sm:text-2xl mb-4 text-center">
        Promotions
      </TypographyH2>
      <Carousel className="w-full max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
        <CarouselContent>
          {promotions.map((promo, idx) => (
            <CarouselItem
              key={idx}
              className="flex flex-col items-center justify-center p-4"
            >
              <PromotionImage
                src={promo.image}
                alt={promo.text}
                width={350}
                height={120}
                className="mb-3 rounded-lg"
              />
              <div className="text-lg sm:text-xl font-bold text-center leading-tight">
                {promo.text}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous promotion" />
        <CarouselNext aria-label="Next promotion" />
      </Carousel>
    </section>
  );
}