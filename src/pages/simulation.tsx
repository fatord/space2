import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import SettingsDialog from "@/components/Simulation/SettingsDialog";
import PlanetDetails from "@/components/Simulation/PlanetDetails";

const SolarSystem = dynamic(() => import("@/components/Simulation/SolarSystem"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🌌</div>
        <p className="text-xl text-muted-foreground">Loading Enhanced 3D Solar System...</p>
        <p className="text-sm text-muted-foreground mt-2">Preparing realistic planet models...</p>
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
  };

  return (
    <>
      <Head>
        <title>Enhanced 3D Solar System - Space Explorer</title>
        <meta name="description" content="Interactive 3D solar system simulation with realistic planet models and rich data" />
      </Head>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold glow-text mb-2">Enhanced Solar System</h1>
            <p className="text-muted-foreground">Explore our solar system with realistic 3D models and comprehensive data</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* 3D Viewer */}
            <div className="lg:col-span-3">
              <Card className="h-[600px]">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <SolarSystem 
                      onPlanetSelect={handlePlanetSelect}
                      timeSpeed={isPlaying ? timeSpeed[0] : 0}
                      showOrbits={showOrbits}
                      starDensity={starDensity[0]}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Controls */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => setIsPlaying(!isPlaying)}
                        variant={isPlaying ? "default" : "outline"}
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
                      <span className="text-sm text-muted-foreground">
                        Speed: {timeSpeed[0]}x
                      </span>
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Speed</label>
                    <Slider
                      value={timeSpeed}
                      onValueChange={setTimeSpeed}
                      max={10}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.1x</span>
                      <span>Real Time</span>
                      <span>10x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Info Panel */}
            <div className="space-y-4">
              <PlanetDetails selectedPlanet={selectedPlanet} units={units} />

              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Planets:</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dwarf Planets:</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Known Moons:</span>
                      <span>200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Asteroids:</span>
                      <span>1M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age:</span>
                      <span>4.6B years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Click and drag to rotate view</p>
                    <p>• Scroll to zoom in/out</p>
                    <p>• Click planets for details</p>
                    <p>• Use time controls to adjust speed</p>
                    <p>• Access settings for visual options</p>
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