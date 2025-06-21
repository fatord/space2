import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Info } from "lucide-react";
import SettingsDialog from "@/components/Simulation/SettingsDialog";
import PlanetDetails from "@/components/Simulation/PlanetDetails";

const SolarSystem = dynamic(() => import("@/components/Simulation/SolarSystem"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🌌</div>
        <p className="text-xl text-muted-foreground mb-2">Loading Enhanced 3D Solar System...</p>
        <p className="text-sm text-muted-foreground">Preparing realistic planet models and textures...</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  )
});

export default function SimulationPage() {
  const [selectedPlanet, setSelectedPlanet] = useState("Earth");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeSpeed, setTimeSpeed] = useState([1]);
  const [showOrbits, setShowOrbits] = useState(true);
  const [starDensity, setStarDensity] = useState([10]);
  const [units, setUnits] = useState("km");
  const [showLabels, setShowLabels] = useState(false);

  const handlePlanetSelect = (planet: string) => {
    setSelectedPlanet(planet);
  };

  const resetSimulation = () => {
    setTimeSpeed([1]);
    setSelectedPlanet("Earth");
    setIsPlaying(true);
    setShowOrbits(true);
    setStarDensity([10]);
    setShowLabels(false);
  };

  const getSpeedDescription = (speed: number) => {
    if (speed === 0) return "Paused";
    if (speed < 0.5) return "Very Slow";
    if (speed < 1) return "Slow";
    if (speed === 1) return "Real Time";
    if (speed < 3) return "Fast";
    if (speed < 6) return "Very Fast";
    return "Ultra Fast";
  };

  return (
    <>
      <Head>
        <title>Enhanced 3D Solar System - Space Explorer</title>
        <meta name="description" content="Interactive 3D solar system simulation with realistic planet models, rich data, and advanced controls" />
      </Head>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold glow-text mb-2">Enhanced Solar System</h1>
                <p className="text-muted-foreground">Explore our solar system with realistic 3D models and comprehensive planetary data</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="glow-border">
                  <Info className="h-3 w-3 mr-1" />
                  Interactive 3D
                </Badge>
                <Badge variant="outline" className="glow-border">
                  Real Data
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Enhanced 3D Viewer */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] glow-border">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <SolarSystem 
                      onPlanetSelect={handlePlanetSelect}
                      timeSpeed={isPlaying ? timeSpeed[0] : 0}
                      showOrbits={showOrbits}
                      starDensity={starDensity[0]}
                      showLabels={showLabels}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Control Panel */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Simulation Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Primary Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => setIsPlaying(!isPlaying)}
                        variant={isPlaying ? "default" : "outline"}
                        className="glow-border"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={resetSimulation}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Speed</p>
                        <p className="text-sm font-medium">{timeSpeed[0]}x - {getSpeedDescription(timeSpeed[0])}</p>
                      </div>
                      <SettingsDialog
                        showOrbits={showOrbits}
                        setShowOrbits={setShowOrbits}
                        starDensity={starDensity[0]}
                        setStarDensity={(density) => setStarDensity([density])}
                        units={units}
                        setUnits={setUnits}
                        showLabels={showLabels}
                        setShowLabels={setShowLabels}
                      />
                    </div>
                  </div>

                  {/* Time Speed Control */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Time Speed</label>
                      <Badge variant="outline" className="text-xs">
                        {isPlaying ? "Running" : "Paused"}
                      </Badge>
                    </div>
                    <Slider
                      value={timeSpeed}
                      onValueChange={setTimeSpeed}
                      max={10}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                      disabled={!isPlaying}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.1x (Slow)</span>
                      <span>1x (Real Time)</span>
                      <span>10x (Fast)</span>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-1 p-2 bg-muted/30 rounded">
                      <div className={`w-2 h-2 rounded-full ${showOrbits ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span>Orbits</span>
                    </div>
                    <div className="flex items-center space-x-1 p-2 bg-muted/30 rounded">
                      <div className={`w-2 h-2 rounded-full ${showLabels ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span>Labels</span>
                    </div>
                    <div className="flex items-center space-x-1 p-2 bg-muted/30 rounded">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>{starDensity[0]}k Stars</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Info Panel */}
            <div className="space-y-4">
              <PlanetDetails selectedPlanet={selectedPlanet} units={units} />

              <Card className="glow-border">
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-muted/30 rounded text-center">
                        <p className="text-lg font-bold text-primary">8</p>
                        <p className="text-xs text-muted-foreground">Planets</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded text-center">
                        <p className="text-lg font-bold text-primary">5</p>
                        <p className="text-xs text-muted-foreground">Dwarf Planets</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded text-center">
                        <p className="text-lg font-bold text-primary">200+</p>
                        <p className="text-xs text-muted-foreground">Known Moons</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded text-center">
                        <p className="text-lg font-bold text-primary">4.6B</p>
                        <p className="text-xs text-muted-foreground">Years Old</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Navigation Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Click and drag to rotate view</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Scroll to zoom in/out</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Click planets for detailed info</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Use controls to adjust time</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Settings for visual options</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}