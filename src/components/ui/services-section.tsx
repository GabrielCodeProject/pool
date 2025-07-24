"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState, useMemo, useCallback } from "react";
import { InfoIcon, ClockIcon, CheckCircleIcon, GitCompareIcon, XIcon, AlertCircleIcon, RefreshCwIcon, WifiOffIcon } from "lucide-react";

interface Service {
  name: string;
  description: string;
  price: string;
}

interface ServicesSectionProps {
  services: Service[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

type ServiceCategory = {
  id: string;
  label: string;
  description: string;
  services: Service[];
};

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export function ServicesSection({ services, isLoading = false, error = null, onRetry }: ServicesSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [filterByCategory, setFilterByCategory] = useState<string>('all');
  const [selectedForComparison, setSelectedForComparison] = useState<Service[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Feedback management functions
  const showFeedback = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setFeedbackMessage({ type, message });
    setTimeout(() => setFeedbackMessage(null), 5000); // Auto-hide after 5 seconds
  }, []);

  const hideFeedback = useCallback(() => {
    setFeedbackMessage(null);
  }, []);

  // Comparison management functions with feedback
  const addToComparison = useCallback((service: Service) => {
    if (selectedForComparison.length >= 3) {
      showFeedback('error', 'Vous ne pouvez comparer que 3 services maximum.');
      return;
    }
    
    if (selectedForComparison.find(s => s.name === service.name)) {
      showFeedback('info', 'Ce service est déjà sélectionné pour la comparaison.');
      return;
    }
    
    setSelectedForComparison([...selectedForComparison, service]);
    showFeedback('success', `${service.name} ajouté à la comparaison.`);
  }, [selectedForComparison, showFeedback]);

  const removeFromComparison = useCallback((service: Service) => {
    setSelectedForComparison(selectedForComparison.filter(s => s.name !== service.name));
    showFeedback('info', `${service.name} retiré de la comparaison.`);
  }, [selectedForComparison, showFeedback]);

  // Quote request handler with feedback
  const handleQuoteRequest = useCallback((service: Service) => {
    // Simulate quote request (in real app, this would make an API call)
    showFeedback('success', `Demande de devis envoyée pour "${service.name}". Nous vous contacterons bientôt.`);
  }, [showFeedback]);

  // Generate service ID from name
  const generateServiceId = (name: string) => {
    return `service-${name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim()}`
  }

  // Categorize services based on their names and types
  const categorizeServices = (services: Service[]): ServiceCategory[] => {
    const seasonal: Service[] = [];
    const cleaning: Service[] = [];
    const maintenance: Service[] = [];

    services.forEach(service => {
      const serviceName = service.name.toLowerCase();
      if (serviceName.includes('ouverture') || serviceName.includes('fermeture')) {
        seasonal.push(service);
      } else if (serviceName.includes('nettoyage') || serviceName.includes('premier')) {
        cleaning.push(service);
      } else if (serviceName.includes('maintenance') || serviceName.includes('entretien')) {
        maintenance.push(service);
      } else {
        // Default to maintenance category
        maintenance.push(service);
      }
    });

    const categories: ServiceCategory[] = [];
    
    if (seasonal.length > 0) {
      categories.push({
        id: 'seasonal',
        label: 'Services saisonniers',
        description: 'Préparation et fermeture de votre piscine',
        services: seasonal
      });
    }
    
    if (cleaning.length > 0) {
      categories.push({
        id: 'cleaning',
        label: 'Services de nettoyage',
        description: 'Nettoyage et remise à neuf',
        services: cleaning
      });
    }
    
    if (maintenance.length > 0) {
      categories.push({
        id: 'maintenance',
        label: 'Entretien régulier',
        description: 'Maintenance continue de votre piscine',
        services: maintenance
      });
    }

    return categories;
  };

  const categories = categorizeServices(services);

  // Parse price from string (e.g., "300$" -> 300)
  const parsePrice = (priceString: string): number => {
    const numericValue = priceString.replace(/[^\d]/g, '');
    return parseInt(numericValue) || 0;
  };

  // Sort services based on selected option
  const sortServices = useMemo(() => {
    return (serviceList: Service[]): Service[] => {
      const sorted = [...serviceList];
      switch (sortBy) {
        case 'name-asc':
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
          return sorted.sort((a, b) => b.name.localeCompare(a.name));
        case 'price-asc':
          return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        case 'price-desc':
          return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        default:
          return sorted;
      }
    };
  }, [sortBy]);

  // Filter and sort services for all views
  const processedServices = useMemo(() => {
    if (filterByCategory === 'all') {
      return sortServices(services);
    } else {
      const category = categories.find(cat => cat.id === filterByCategory);
      return category ? sortServices(category.services) : [];
    }
  }, [services, categories, filterByCategory, sortServices]);

  // Create processed categories with sorted services
  const processedCategories = useMemo(() => {
    return categories.map(category => ({
      ...category,
      services: sortServices(category.services)
    }));
  }, [categories, sortServices]);

  const isInComparison = (service: Service) => {
    return selectedForComparison.some(s => s.name === service.name);
  };

  if (!isLoading && services.length === 0) return null;

  // Show error state
  if (error && !isLoading) {
    return (
      <section className="mb-8" aria-labelledby="services-heading">
        <TypographyH2 id="services-heading" className="text-xl sm:text-2xl mb-6 text-center">
          Nos services
        </TypographyH2>
        
        <ServiceErrorState error={error} onRetry={onRetry} />
      </section>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="mb-8" aria-labelledby="services-heading">
        <TypographyH2 id="services-heading" className="text-xl sm:text-2xl mb-6 text-center">
          Nos services
        </TypographyH2>
        
        {/* Loading Filter Controls */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="h-9 w-[200px]" />
          </div>
        </div>

        {/* Loading Service Cards */}
        <div className="grid gap-4 sm:gap-6">
          {[...Array(3)].map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }

  // If only one category, show simple layout with filters
  if (categories.length <= 1) {
    return (
      <section className="mb-8" aria-labelledby="services-heading">
        <TypographyH2 id="services-heading" className="text-xl sm:text-2xl mb-6 text-center">
          Nos services
        </TypographyH2>
        
        {/* Sort Controls */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-4 items-center">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {processedServices.map((service, idx) => (
            <ServiceCard 
              key={idx} 
              service={service} 
              generateServiceId={generateServiceId}
              onAddToComparison={addToComparison}
              onRemoveFromComparison={removeFromComparison}
              isInComparison={isInComparison(service)}
              canAddToComparison={selectedForComparison.length < 3}
              onQuoteRequest={handleQuoteRequest}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8" aria-labelledby="services-heading">
      <TypographyH2 id="services-heading" className="text-xl sm:text-2xl mb-6 text-center">
        Nos services
      </TypographyH2>

      {/* Feedback Message */}
      {feedbackMessage && (
        <FeedbackAlert 
          type={feedbackMessage.type}
          message={feedbackMessage.message}
          onDismiss={hideFeedback}
        />
      )}
      
      {/* Filter and Sort Controls */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Select value={filterByCategory} onValueChange={setFilterByCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par catégorie..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les services</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
              <SelectItem value="price-asc">Prix (croissant)</SelectItem>
              <SelectItem value="price-desc">Prix (descendant)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Comparison Bar */}
      {selectedForComparison.length > 0 && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GitCompareIcon className="h-5 w-5" />
              <span className="font-medium">
                Services sélectionnés pour comparaison ({selectedForComparison.length}/3)
              </span>
            </div>
            <div className="flex gap-2">
              {selectedForComparison.length >= 2 && (
                <Button 
                  onClick={() => setShowComparison(true)}
                  className="shrink-0"
                >
                  Comparer les services
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedForComparison([])}
              >
                Effacer tout
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedForComparison.map((service, idx) => (
              <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                {service.name}
                <button
                  onClick={() => removeFromComparison(service)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Service Comparison Modal */}
      <ServiceComparisonDialog 
        services={selectedForComparison}
        open={showComparison}
        onOpenChange={setShowComparison}
        error={error}
        onRetry={onRetry}
        onQuoteRequest={handleQuoteRequest}
      />

      {/* Show filtered view or tabbed view */}
      {filterByCategory === 'all' ? (
        <Tabs defaultValue={processedCategories[0]?.id}>
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 lg:max-w-lg">
              {processedCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-xs sm:text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {processedCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="text-center mb-4">
                <Badge variant="outline" className="mb-2">
                  {category.services.length} service{category.services.length > 1 ? 's' : ''}
                </Badge>
                <TypographyP className="text-sm text-muted-foreground">
                  {category.description}
                </TypographyP>
              </div>
              
              <div className="grid gap-4 sm:gap-6">
                {category.services.map((service, idx) => (
                  <ServiceCard 
                    key={`${category.id}-${idx}`} 
                    service={service} 
                    generateServiceId={generateServiceId}
                    onAddToComparison={addToComparison}
                    onRemoveFromComparison={removeFromComparison}
                    isInComparison={isInComparison(service)}
                    canAddToComparison={selectedForComparison.length < 3}
                    onQuoteRequest={handleQuoteRequest}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="text-xs">
              {processedServices.length} service{processedServices.length > 1 ? 's' : ''} trouvé{processedServices.length > 1 ? 's' : ''}
            </Badge>
            <TypographyP className="text-sm text-muted-foreground">
              {categories.find(cat => cat.id === filterByCategory)?.description}
            </TypographyP>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            {processedServices.map((service, idx) => (
              <ServiceCard 
                key={`filtered-${idx}`} 
                service={service} 
                generateServiceId={generateServiceId}
                onAddToComparison={addToComparison}
                onRemoveFromComparison={removeFromComparison}
                isInComparison={isInComparison(service)}
                canAddToComparison={selectedForComparison.length < 3}
                onQuoteRequest={handleQuoteRequest}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// Get detailed service information based on service name
function getServiceDetails(service: Service) {
  const baseDetails = {
    duration: "2-3 heures",
    included: [] as string[],
    process: [] as string[],
    warranty: "Satisfaction garantie",
    notes: ""
  };

  const serviceName = service.name.toLowerCase();
  
  if (serviceName.includes('ouverture') || serviceName.includes('fermeture')) {
    return {
      ...baseDetails,
      duration: "3-4 heures",
      included: [
        "Inspection complète de l'équipement",
        "Nettoyage du filtre et des skimmers",
        "Test et ajustement des produits chimiques",
        "Vérification de la pompe et du système"
      ],
      process: [
        "Retrait de la bâche d'hiver",
        "Reconnexion de tous les équipements",
        "Mise en marche du système de filtration",
        "Premier traitement chimique"
      ],
      notes: "Service recommandé en avril-mai pour l'ouverture"
    };
  } else if (serviceName.includes('nettoyage') || serviceName.includes('premier')) {
    return {
      ...baseDetails,
      duration: "4-5 heures",
      included: [
        "Nettoyage complet du bassin",
        "Aspiration des débris et algues",
        "Brossage des parois et du fond",
        "Nettoyage approfondi du filtre"
      ],
      process: [
        "Évaluation de l'état de l'eau",
        "Retrait des gros débris",
        "Traitement choc si nécessaire",
        "Filtration intensive 24-48h"
      ],
      notes: "Idéal après l'hiver ou en cas de négligence prolongée"
    };
  } else {
    return {
      ...baseDetails,
      included: [
        "Test et ajustement du pH et chlore",
        "Nettoyage des skimmers et paniers",
        "Vérification du niveau d'eau",
        "Inspection visuelle de l'équipement"
      ],
      process: [
        "Arrivée et évaluation",
        "Nettoyage et entretien",
        "Tests chimiques",
        "Rapport de visite"
      ],
      notes: "Service régulier recommandé toutes les 1-2 semaines"
    };
  }
}

// Service Comparison Dialog Component
function ServiceComparisonDialog({ 
  services, 
  open, 
  onOpenChange,
  isLoading = false,
  error = null,
  onRetry,
  onQuoteRequest
}: { 
  services: Service[]; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onQuoteRequest?: (service: Service) => void;
}) {
  if (!isLoading && !error && services.length < 2) return null;


  const getServiceType = (service: Service) => {
    const name = service.name.toLowerCase();
    if (name.includes('ouverture') || name.includes('fermeture')) return 'Saisonnier';
    if (name.includes('nettoyage') || name.includes('premier')) return 'Nettoyage';
    return 'Entretien';
  };

  const getEquipmentIncluded = (service: Service) => {
    const details = getServiceDetails(service);
    return details.included.length;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comparaison des services</DialogTitle>
          <DialogDescription>
            Comparez les caractéristiques de {services.length} services sélectionnés
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {error ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Alert variant="destructive" className="mb-4">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Erreur de comparaison</AlertTitle>
                <AlertDescription>
                  Impossible de charger les détails pour la comparaison des services.
                </AlertDescription>
              </Alert>
              {onRetry && (
                <Button onClick={onRetry} variant="outline" className="flex items-center gap-2">
                  <RefreshCwIcon className="h-4 w-4" />
                  Réessayer
                </Button>
              )}
            </div>
          ) : isLoading ? (
            <ComparisonTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Caractéristiques</TableHead>
                  {services.map((service, idx) => (
                    <TableHead key={idx} className="text-center">
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">{service.name}</div>
                        <Badge variant="secondary" className="text-xs">
                          {service.price}
                        </Badge>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Description</TableCell>
                  {services.map((service, idx) => (
                    <TableCell key={idx} className="text-sm">
                      {service.description}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Durée estimée</TableCell>
                  {services.map((service, idx) => (
                    <TableCell key={idx} className="text-center">
                      {getServiceDetails(service).duration}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Type de service</TableCell>
                  {services.map((service, idx) => (
                    <TableCell key={idx} className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {getServiceType(service)}
                      </Badge>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Éléments inclus</TableCell>
                  {services.map((service, idx) => (
                    <TableCell key={idx} className="text-center">
                      <Badge variant="secondary" className="text-xs">
                        {getEquipmentIncluded(service)} éléments
                      </Badge>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Recommandé pour</TableCell>
                  {services.map((service, idx) => {
                    const details = getServiceDetails(service);
                    return (
                      <TableCell key={idx} className="text-xs text-muted-foreground">
                        {details.notes || "Usage général"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => {
              services.forEach(service => onQuoteRequest?.(service));
              onOpenChange(false);
            }}
          >
            Demander des devis pour tous
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Service Detail Dialog Component
function ServiceDetailDialog({ 
  service, 
  isLoading = false, 
  hasError = false, 
  onQuoteRequest 
}: { 
  service: Service; 
  isLoading?: boolean; 
  hasError?: boolean; 
  onQuoteRequest?: (service: Service) => void; 
}) {
  const details = getServiceDetails(service);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1" disabled={isLoading || hasError}>
          <InfoIcon className="mr-2 h-4 w-4" />
          {hasError ? 'Détails indisponibles' : 'Voir les détails'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isLoading ? <Skeleton className="h-6 w-[200px]" /> : service.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {isLoading ? <Skeleton className="h-4 w-full" /> : service.description}
          </DialogDescription>
        </DialogHeader>
        
        {hasError ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Alert variant="destructive" className="mb-4">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Détails indisponibles</AlertTitle>
              <AlertDescription>
                Impossible de charger les détails complets pour ce service.
              </AlertDescription>
            </Alert>
          </div>
        ) : isLoading ? (
          <ServiceDetailSkeleton />
        ) : (
          <div className="grid gap-6 py-4">
            {/* Price and Duration */}
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Durée: {details.duration}</span>
              </div>
              <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
                {service.price}
              </Badge>
            </div>

            {/* What's Included */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                Ce qui est inclus
              </h4>
              <ul className="space-y-2">
                {details.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h4 className="font-semibold mb-3">Processus de travail</h4>
              <ol className="space-y-2">
                {details.process.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Badge variant="outline" className="text-xs px-2 py-1 shrink-0">
                      {idx + 1}
                    </Badge>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Additional Notes */}
            {details.notes && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> {details.notes}
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button 
            className="w-full" 
            disabled={isLoading || hasError}
            onClick={() => onQuoteRequest?.(service)}
          >
            {isLoading ? <Skeleton className="h-4 w-[120px]" /> : hasError ? "Service indisponible" : "Demander un devis"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Extracted ServiceCard component for reusability
function ServiceCard({ 
  service, 
  generateServiceId,
  onAddToComparison,
  onRemoveFromComparison,
  isInComparison,
  canAddToComparison,
  hasError = false,
  onQuoteRequest
}: { 
  service: Service;
  generateServiceId: (name: string) => string;
  onAddToComparison: (service: Service) => void;
  onRemoveFromComparison: (service: Service) => void;
  isInComparison: boolean;
  canAddToComparison: boolean;
  hasError?: boolean;
  onQuoteRequest?: (service: Service) => void;
}) {
  return (
    <Card 
      id={generateServiceId(service.name)}
      className={`border shadow-sm hover:shadow-md transition-all duration-200 scroll-mt-20 hover:border-primary/20 ${
        isInComparison ? 'ring-2 ring-primary/20 bg-primary/5' : ''
      } ${
        hasError ? 'border-destructive/50 bg-destructive/5' : ''
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h3 className="font-bold text-base sm:text-lg leading-tight">
            {service.name}
          </h3>
          <Badge variant="secondary" className="text-base sm:text-lg font-semibold shrink-0">
            {service.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <TypographyP className="text-sm sm:text-base text-muted-foreground">
          {service.description}
        </TypographyP>
        
        {hasError && (
          <Alert variant="destructive" className="mb-3">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>
              Certaines fonctionnalités peuvent être indisponibles pour ce service.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-2">
          <ServiceDetailDialog service={service} hasError={hasError} onQuoteRequest={onQuoteRequest} />
          
          {isInComparison ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onRemoveFromComparison(service)}
              className="flex-1"
              disabled={hasError}
            >
              <XIcon className="mr-2 h-4 w-4" />
              Retirer de la comparaison
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAddToComparison(service)}
              disabled={!canAddToComparison || hasError}
              className="flex-1"
            >
              <GitCompareIcon className="mr-2 h-4 w-4" />
              Comparer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Service Card Skeleton for loading state
function ServiceCardSkeleton() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}

// Comparison Table Skeleton for loading state
function ComparisonTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">
            <Skeleton className="h-4 w-[150px]" />
          </TableHead>
          {[...Array(2)].map((_, idx) => (
            <TableHead key={idx} className="text-center">
              <div className="space-y-1">
                <Skeleton className="h-4 w-[120px] mx-auto" />
                <Skeleton className="h-5 w-[60px] mx-auto" />
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-[120px]" />
            </TableCell>
            {[...Array(2)].map((_, colIdx) => (
              <TableCell key={colIdx} className="text-center">
                <Skeleton className="h-4 w-[100px] mx-auto" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Service Detail Dialog Skeleton for loading state
function ServiceDetailSkeleton() {
  return (
    <div className="grid gap-6 py-4">
      {/* Price and Duration Skeleton */}
      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-[120px]" />
        </div>
        <Skeleton className="h-8 w-[80px]" />
      </div>

      {/* What's Included Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-[150px]" />
        </div>
        <div className="space-y-2">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Skeleton className="h-4 w-4 rounded-full mt-0.5 shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Process Skeleton */}
      <div>
        <Skeleton className="h-5 w-[180px] mb-3" />
        <div className="space-y-2">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Skeleton className="h-6 w-6 shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes Skeleton */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

// Service Error State Component
function ServiceErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  const getErrorDetails = (errorMessage: string) => {
    const message = errorMessage.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return {
        icon: WifiOffIcon,
        title: "Problème de connexion",
        description: "Impossible de charger les services. Vérifiez votre connexion internet.",
        suggestions: [
          "Vérifiez votre connexion internet",
          "Actualisez la page",
          "Réessayez dans quelques instants"
        ]
      };
    }
    
    if (message.includes('timeout') || message.includes('slow')) {
      return {
        icon: ClockIcon,
        title: "Délai d'attente dépassé",
        description: "Le chargement des services prend plus de temps que prévu.",
        suggestions: [
          "Patientez quelques instants",
          "Vérifiez votre connexion",
          "Réessayez plus tard"
        ]
      };
    }
    
    if (message.includes('server') || message.includes('500') || message.includes('internal')) {
      return {
        icon: AlertCircleIcon,
        title: "Erreur du serveur",
        description: "Un problème temporaire empêche le chargement des services.",
        suggestions: [
          "Réessayez dans quelques minutes",
          "Contactez le support si le problème persiste"
        ]
      };
    }
    
    return {
      icon: AlertCircleIcon,
      title: "Erreur de chargement",
      description: error || "Une erreur inattendue s'est produite lors du chargement des services.",
      suggestions: [
        "Actualisez la page",
        "Réessayez plus tard",
        "Contactez le support si le problème persiste"
      ]
    };
  };

  const errorDetails = getErrorDetails(error);
  const IconComponent = errorDetails.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Alert variant="destructive" className="max-w-2xl mb-6">
        <IconComponent className="h-4 w-4" />
        <AlertTitle>{errorDetails.title}</AlertTitle>
        <AlertDescription>
          <p className="mb-3">{errorDetails.description}</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {errorDetails.suggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} className="flex items-center gap-2">
            <RefreshCwIcon className="h-4 w-4" />
            Réessayer
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCwIcon className="h-4 w-4" />
          Actualiser la page
        </Button>
      </div>
    </div>
  );
}

// Feedback Alert Component
function FeedbackAlert({ 
  type, 
  message, 
  onDismiss 
}: { 
  type: 'success' | 'error' | 'info'; 
  message: string; 
  onDismiss: () => void; 
}) {
  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      case 'error':
        return AlertCircleIcon;
      case 'info':
        return InfoIcon;
      default:
        return InfoIcon;
    }
  };

  const IconComponent = getIcon(type);

  return (
    <div className="mb-6 flex justify-center">
      <Alert variant={getAlertVariant(type)} className="max-w-2xl">
        <IconComponent className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{message}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="ml-4 h-auto p-1 hover:bg-transparent"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}