
import React from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Calendar, MapPin, ExternalLink } from "lucide-react";

export default function MissionsPage() {
  const missions = [
    {
      name: "Apollo 11",
      status: "Completed",
      launch: "July 16, 1969",
      destination: "Moon",
      description: "First crewed lunar landing mission",
      type: "Crewed"
    },
    {
      name: "Voyager 1",
      status: "Active",
      launch: "September 5, 1977",
      destination: "Interstellar Space",
      description: "Exploring the outer solar system and beyond",
      type: "Probe"
    },
    {
      name: "Mars Perseverance",
      status: "Active",
      launch: "July 30, 2020",
      destination: "Mars",
      description: "Searching for signs of ancient microbial life",
      type: "Rover"
    },
    {
      name: "Artemis I",
      status: "Completed",
      launch: "November 16, 2022",
      destination: "Moon",
      description: "Uncrewed test flight of Orion spacecraft",
      type: "Test Flight"
    }
  ];

  return (
    <>
      <Head>
        <title>Space Missions - Space Explorer</title>
        <meta name="description" content="Explore historic and current space missions with interactive trajectories" />
      </Head>

      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold glow-text mb-2">Space Missions</h1>
            <p className="text-muted-foreground">Explore humanity's greatest adventures in space</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mission List */}
            <div className="lg:col-span-2 space-y-4">
              {missions.map((mission, index) => (
                <Card key={index} className="hover:glow-border transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Rocket className="h-5 w-5 text-primary" />
                          <span>{mission.name}</span>
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{mission.description}</p>
                      </div>
                      <Badge variant={mission.status === "Active" ? "default" : "secondary"}>
                        {mission.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{mission.launch}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{mission.destination}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {mission.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Mission Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission Viewer */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mission Trajectory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🚀</div>
                      <p className="text-sm text-muted-foreground">3D Mission Path</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mission Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Launch</p>
                        <p className="text-xs text-muted-foreground">Mission begins</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-muted rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Transit</p>
                        <p className="text-xs text-muted-foreground">Journey to destination</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-muted rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Arrival</p>
                        <p className="text-xs text-muted-foreground">Reach target</p>
                      </div>
                    </div>
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
