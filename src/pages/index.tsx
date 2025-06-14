
import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Globe, BookOpen, Zap, Orbit, Telescope } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: Globe,
      title: "3D Solar System",
      description: "Explore our solar system in stunning 3D with real-time planetary motion and accurate orbital mechanics.",
      href: "/simulation"
    },
    {
      icon: Rocket,
      title: "Space Missions",
      description: "Follow historic and current space missions with interactive trajectories and mission timelines.",
      href: "/missions"
    },
    {
      icon: BookOpen,
      title: "Educational Tools",
      description: "Learn spaceflight concepts through interactive visualizations and hands-on demonstrations.",
      href: "/education"
    }
  ];

  return (
    <>
      <Head>
        <title>Space Explorer - Interactive Space Visualization</title>
        <meta name="description" content="Explore the cosmos with interactive 3D visualizations, space missions, and educational tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 parallax-bg" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
                Space Explorer
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Journey through the cosmos with interactive 3D visualizations, explore historic space missions, and master the science of spaceflight
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/simulation">
                  <Button size="lg" className="glow-border">
                    <Orbit className="mr-2 h-5 w-5" />
                    Explore Solar System
                  </Button>
                </Link>
                <Link href="/missions">
                  <Button variant="outline" size="lg" className="bg-transparent hover:bg-transparent/10">
                    <Telescope className="mr-2 h-5 w-5" />
                    View Missions
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Animation Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
                Explore the Universe
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the wonders of space through cutting-edge visualization technology and interactive learning experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Link href={feature.href}>
                      <Card className="h-full hover:glow-border transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-8 text-center">
                          <div className="mb-6 flex justify-center">
                            <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 glow-text">
                The Universe at Your Fingertips
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">8</div>
                  <div className="text-muted-foreground">Planets to Explore</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Historic Missions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">∞</div>
                  <div className="text-muted-foreground">Learning Possibilities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
                Ready to Launch?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Begin your journey through space and discover the mysteries of our solar system
              </p>
              
              <Link href="/simulation">
                <Button size="lg" className="glow-border">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Exploring
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
