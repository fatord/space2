
import React, { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Zap, Target, Orbit, Rocket, Play, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationPage() {
  const [thrustValue, setThrustValue] = useState([50]);
  const [gravityStrength, setGravityStrength] = useState([100]);
  const [isPlaying, setIsPlaying] = useState(false);

  const modules = [
    {
      id: "gravity",
      title: "Gravity & Orbits",
      description: "Understand how gravity shapes planetary motion",
      icon: Target,
      difficulty: "Beginner"
    },
    {
      id: "thrust",
      title: "Thrust & Propulsion",
      description: "Learn how rockets generate thrust and change orbits",
      icon: Rocket,
      difficulty: "Intermediate"
    },
    {
      id: "orbital-mechanics",
      title: "Orbital Mechanics",
      description: "Master the physics of spacecraft trajectories",
      icon: Orbit,
      difficulty: "Advanced"
    },
    {
      id: "delta-v",
      title: "Delta-V Budget",
      description: "Calculate energy requirements for space missions",
      icon: Zap,
      difficulty: "Advanced"
    }
  ];

  return (
    <>
      <Head>
        <title>Educational Tools - Space Explorer</title>
        <meta name="description" content="Learn spaceflight concepts through interactive visualizations" />
      </Head>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold glow-text mb-2">Educational Tools</h1>
            <p className="text-muted-foreground">Master spaceflight concepts through interactive learning</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Module Selection */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Learning Modules</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {modules.map((module) => {
                    const Icon = module.icon;
                    return (
                      <div
                        key={module.id}
                        className="p-3 border rounded-lg hover:glow-border transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="font-medium">{module.title}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {module.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Interactive Visualization */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle>Interactive Demonstration</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  <Tabs defaultValue="gravity" className="h-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="gravity">Gravity</TabsTrigger>
                      <TabsTrigger value="thrust">Thrust</TabsTrigger>
                      <TabsTrigger value="orbits">Orbits</TabsTrigger>
                      <TabsTrigger value="deltav">Delta-V</TabsTrigger>
                    </TabsList>

                    <TabsContent value="gravity" className="h-full mt-4">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                          <motion.div
                            className="relative"
                            animate={isPlaying ? { rotate: 360 } : {}}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                              ☀️
                            </div>
                            <motion.div
                              className="absolute w-4 h-4 bg-blue-500 rounded-full"
                              style={{
                                top: "50%",
                                left: "50%",
                                transformOrigin: "0 0"
                              }}
                              animate={isPlaying ? {
                                rotate: 360,
                                x: 60 * Math.cos(0),
                                y: 60 * Math.sin(0)
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Gravity Strength: {gravityStrength[0]}%
                            </label>
                            <Slider
                              value={gravityStrength}
                              onValueChange={setGravityStrength}
                              max={200}
                              min={10}
                              step={10}
                              className="w-full"
                            />
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="flex-1"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {isPlaying ? "Pause" : "Play"} Animation
                            </Button>
                            <Button variant="outline" onClick={() => setIsPlaying(false)}>
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="thrust" className="h-full mt-4">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🚀</div>
                            <p className="text-sm text-muted-foreground">Thrust Vector Visualization</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Thrust Power: {thrustValue[0]}%
                            </label>
                            <Slider
                              value={thrustValue}
                              onValueChange={setThrustValue}
                              max={100}
                              min={0}
                              step={5}
                              className="w-full"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-card rounded">
                              <span className="text-muted-foreground">Acceleration:</span>
                              <span className="ml-2">{(thrustValue[0] * 0.1).toFixed(1)} m/s²</span>
                            </div>
                            <div className="p-2 bg-card rounded">
                              <span className="text-muted-foreground">Fuel Rate:</span>
                              <span className="ml-2">{(thrustValue[0] * 0.05).toFixed(1)} kg/s</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="orbits" className="h-full mt-4">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🌍</div>
                            <p className="text-sm text-muted-foreground">Orbital Mechanics Demo</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-card rounded">
                            <span>Orbital Velocity:</span>
                            <span>7.8 km/s</span>
                          </div>
                          <div className="flex justify-between p-2 bg-card rounded">
                            <span>Altitude:</span>
                            <span>400 km</span>
                          </div>
                          <div className="flex justify-between p-2 bg-card rounded">
                            <span>Period:</span>
                            <span>92.7 minutes</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="deltav" className="h-full mt-4">
                      <div className="h-full flex flex-col">
                        <div className="flex-1 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <div className="text-4xl mb-2">⚡</div>
                            <p className="text-sm text-muted-foreground">Delta-V Calculator</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-card rounded">
                            <span>Earth to LEO:</span>
                            <span>9.4 km/s</span>
                          </div>
                          <div className="flex justify-between p-2 bg-card rounded">
                            <span>LEO to Moon:</span>
                            <span>3.2 km/s</span>
                          </div>
                          <div className="flex justify-between p-2 bg-card rounded">
                            <span>Earth to Mars:</span>
                            <span>5.7 km/s</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
