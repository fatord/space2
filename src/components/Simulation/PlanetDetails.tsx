import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import planetData from "@/data/planetData.json";

interface PlanetDetailsProps {
  selectedPlanet: string;
  units: string;
}

export default function PlanetDetails({ selectedPlanet, units }: PlanetDetailsProps) {
  const planet = planetData[selectedPlanet as keyof typeof planetData];
  
  if (!planet) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select a Planet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Click on a planet to view detailed information.</p>
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{planet.name}</CardTitle>
          <Badge variant="outline">{planet.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{planet.description}</p>
        
        <Separator />
        
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Physical Properties</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Radius:</span>
              <span>{planet.radius?.toLocaleString()} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mass:</span>
              <span>{planet.mass}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gravity:</span>
              <span>{planet.gravity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature:</span>
              <span>{planet.temperature}</span>
            </div>
          </div>
        </div>

        {planet.distanceFromSun && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Orbital Properties</h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance from Sun:</span>
                  <span>{formatDistance(planet.distanceFromSun)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Orbital Period:</span>
                  <span>{planet.orbitalPeriod} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rotation Period:</span>
                  <span>{planet.rotationPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moons:</span>
                  <span>{planet.moons}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />
        
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Composition & Atmosphere</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Composition:</span>
              <p className="mt-1">{planet.composition}</p>
            </div>
            {planet.atmosphere && (
              <div>
                <span className="text-muted-foreground">Atmosphere:</span>
                <p className="mt-1">{planet.atmosphere}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}