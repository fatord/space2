
import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Settings, ZoomIn, ZoomOut } from "lucide-react";

const SolarSystem = dynamic(() => import("@/components/Simulation/SolarSystem"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🌌</div>
        <p className="text-xl text-muted-foreground">Loading 3D Solar System...</p>
      </div>
    </div>
  )
});

export default function SimulationPage() {
  const [selectedPlanet, setSelectedPlanet] = useState("Earth");
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeSpeed, setTimeSpeed] = useState([1]);

  const planetData = {
    Mercury: { distance: "57.9M km", period: "88 days", moons: 0, temp: "427°C" },
    Venus: { distance: "108.2M km", period: "225 days", moons: 0, temp: "462°C" },
    Earth: { distance: "149.6M km", period: "365.25 days", moons: 1, temp: "15°C" },
    Mars: { distance: "227.9M km", period: "687 days", moons: 2, temp: "-65°C" },
    Jupiter: { distance: "778.5M km", period: "12 years", moons: 79, temp: "-110°C" },
    Saturn: { distance: "1.43B km", period: "29 years", moons: 82, temp: "-140°C" },
    Uranus: { distance: "2.87B km", period: "84 years", moons: 27, temp: "-195°C" },
    Neptune: { distance: "4.50B km", period: "165 years", moons: 14, temp: "-200°C" }
  };

  const handlePlanetSelect = (planet: string) => {
    setSelectedPlanet(planet);
  };

  return (
    <>
      <Head>
        <title>3D Solar System - Space Explorer</title>
        <meta name="description" content="Interactive 3D solar system simulation with real-time planetary motion" />
      </Head>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-bold glow-text mb-2">Solar System Simulation</h1>
            <p className="text-muted-foreground">Explore our solar system in interactive 3D</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* 3D Viewer */}
            <div className="lg:col-span-3">
              <Card className="h-[600px]">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <SolarSystem onPlanetSelect={handlePlanetSelect} />
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
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
                      <Button size="sm" variant="outline">
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
                      <span className="text-sm text-muted-foreground">Speed: {timeSpeed[0]}x</span>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Planet Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{selectedPlanet}</h4>
                      <div className="space-y-2 mt-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Distance from Sun:</span>
                          <span>{planetData[selectedPlanet as keyof typeof planetData]?.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Orbital Period:</span>
                          <span>{planetData[selectedPlanet as keyof typeof planetData]?.period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Moons:</span>
                          <span>{planetData[selectedPlanet as keyof typeof planetData]?.moons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg Temperature:</span>
                          <span>{planetData[selectedPlanet as keyof typeof planetData]?.temp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                    <p>• Use controls to adjust time</p>
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
