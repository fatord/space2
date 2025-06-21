import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import planetData from "@/data/planetData.json";
import { Thermometer, Zap, Globe, Clock } from "lucide-react";

interface PlanetDetailsProps {
  selectedPlanet: string;
  units: string;
}

export default function PlanetDetails({ selectedPlanet, units }: PlanetDetailsProps) {
  const planet = planetData[selectedPlanet as keyof typeof planetData];
  
  if (!planet) {
    return (
      <Card className="glow-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Select a Planet</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌌</div>
            <p className="text-muted-foreground">Click on any planet to explore detailed information about its properties, composition, and characteristics.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDistance = (km: number) => {
    switch (units) {
      case 'au':
        return `${(km / 149.6).toFixed(2)} AU`;
      case 'mi':
        return `${(km * 0.621371).toFixed(0)} million mi`;
      default:
        return `${km} million km`;
    }
  };

  const getRelativeSize = (radius: number) => {
    const earthRadius = 6371;
    return ((radius / earthRadius) * 100).toFixed(1);
  };

  const getRelativeMass = (massString: string) => {
    // Extract the coefficient from scientific notation
    const match = massString.match(/(\d+\.?\d*)/);
    if (!match) return 0;
    const coefficient = parseFloat(match[1]);
    
    // Earth's mass is approximately 5.972 × 10²⁴ kg
    const earthMass = 5.972;
    return ((coefficient / earthMass) * 100).toFixed(1);
  };

  return (
    <Card className="glow-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>{planet.name}</span>
          </CardTitle>
          <Badge variant="outline" className="glow-border">
            {planet.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground leading-relaxed">
          {planet.description}
        </div>
        
        <Separator />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="text-sm font-medium">{planet.temperature}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
            <Zap className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Gravity</p>
              <p className="text-sm font-medium">{planet.gravity}</p>
            </div>
          </div>
        </div>

        {/* Physical Properties */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <span>Physical Properties</span>
          </h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Radius:</span>
                <span>{planet.radius?.toLocaleString()} km</span>
              </div>
              {planet.radius && (
                <div className="flex items-center space-x-2">
                  <Progress value={Math.min(parseFloat(getRelativeSize(planet.radius)), 100)} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">{getRelativeSize(planet.radius)}% of Earth</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Mass:</span>
                <span>{planet.mass}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={Math.min(parseFloat(getRelativeMass(planet.mass)), 100)} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground">{getRelativeMass(planet.mass)}% of Earth</span>
              </div>
            </div>
          </div>
        </div>

        {planet.distanceFromSun && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Orbital Properties</span>
              </h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">Distance from Sun:</span>
                  <span className="font-medium">{formatDistance(planet.distanceFromSun)}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">Orbital Period:</span>
                  <span className="font-medium">{planet.orbitalPeriod} days</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">Rotation Period:</span>
                  <span className="font-medium">{planet.rotationPeriod}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted/30 rounded">
                  <span className="text-muted-foreground">Moons:</span>
                  <span className="font-medium">{planet.moons}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />
        
        {/* Composition & Atmosphere */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Composition & Atmosphere</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-muted/30 rounded">
              <span className="text-muted-foreground font-medium">Composition:</span>
              <p className="mt-1 text-sm">{planet.composition}</p>
            </div>
            {planet.atmosphere && (
              <div className="p-3 bg-muted/30 rounded">
                <span className="text-muted-foreground font-medium">Atmosphere:</span>
                <p className="mt-1 text-sm">{planet.atmosphere}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}