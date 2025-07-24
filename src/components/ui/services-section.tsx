import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

interface ServicesSectionProps {
  services: { name: string; description: string; price: string }[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  if (services.length === 0) return null;

  // Generate service ID from name
  const generateServiceId = (name: string) => {
    return `service-${name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim()}`
  }

  return (
    <section className="mb-8" aria-labelledby="services-heading">
      <TypographyH2 id="services-heading" className="text-xl sm:text-2xl mb-6 text-center">
        Nos services
      </TypographyH2>
      <div className="grid gap-4 sm:gap-6">
        {services.map((service, idx) => (
          <Card 
            key={idx} 
            id={generateServiceId(service.name)}
            className="border shadow-sm hover:shadow-md transition-shadow duration-200 scroll-mt-20"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg leading-tight">
                  {service.name}
                </h3>
                <span className="text-primary font-semibold text-base sm:text-lg shrink-0">
                  {service.price}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <TypographyP className="text-sm sm:text-base text-muted-foreground">
                {service.description}
              </TypographyP>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}