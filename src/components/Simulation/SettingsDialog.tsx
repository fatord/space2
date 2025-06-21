import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SettingsDialogProps {
  showOrbits: boolean;
  setShowOrbits: (show: boolean) => void;
  starDensity: number;
  setStarDensity: (density: number) => void;
  units: string;
  setUnits: (units: string) => void;
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
}

export default function SettingsDialog({
  showOrbits,
  setShowOrbits,
  starDensity,
  setStarDensity,
  units,
  setUnits,
  showLabels,
  setShowLabels,
}: SettingsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="glow-border">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Simulation Settings</span>
          </DialogTitle>
          <DialogDescription>
            Customize your solar system visualization experience with advanced controls.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Visual Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium">Visual Settings</h4>
              <Badge variant="outline" className="text-xs">Enhanced</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-orbits" className="text-sm">Orbital Paths</Label>
                <Switch
                  id="show-orbits"
                  checked={showOrbits}
                  onCheckedChange={setShowOrbits}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-labels" className="text-sm">Planet Labels</Label>
                <Switch
                  id="show-labels"
                  checked={showLabels}
                  onCheckedChange={setShowLabels}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="star-density" className="text-sm">
                  Star Density: {starDensity}x
                </Label>
                <div className="flex items-center space-x-2">
                  <Info className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {starDensity < 5 ? "Low" : starDensity < 15 ? "Medium" : "High"}
                  </span>
                </div>
              </div>
              <Slider
                id="star-density"
                min={1}
                max={20}
                step={1}
                value={[starDensity]}
                onValueChange={(value) => setStarDensity(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimal</span>
                <span>Realistic</span>
                <span>Dense</span>
              </div>
            </div>
          </div>

          {/* Unit Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Measurement Units</h4>
            
            <div className="space-y-2">
              <Label htmlFor="units" className="text-sm">Distance Units</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger>
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">
                    <div className="flex items-center justify-between w-full">
                      <span>Kilometers</span>
                      <Badge variant="outline" className="ml-2 text-xs">km</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="au">
                    <div className="flex items-center justify-between w-full">
                      <span>Astronomical Units</span>
                      <Badge variant="outline" className="ml-2 text-xs">AU</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="mi">
                    <div className="flex items-center justify-between w-full">
                      <span>Miles</span>
                      <Badge variant="outline" className="ml-2 text-xs">mi</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Performance</h4>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Optimization Tips:</strong>
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Reduce star density for better performance on slower devices</li>
                <li>• Disable orbital paths if experiencing lag</li>
                <li>• Planet labels may impact performance with many objects</li>
              </ul>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Quick Presets</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setShowOrbits(false);
                  setShowLabels(false);
                  setStarDensity(5);
                }}
              >
                Performance
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setShowOrbits(true);
                  setShowLabels(false);
                  setStarDensity(10);
                }}
              >
                Balanced
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setShowOrbits(true);
                  setShowLabels(true);
                  setStarDensity(15);
                }}
              >
                Quality
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}