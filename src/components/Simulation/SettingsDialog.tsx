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
import { Settings } from "lucide-react";

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
        <Button size="sm" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Simulation Settings</DialogTitle>
          <DialogDescription>
            Customize your solar system visualization experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Visual Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Visual Settings</h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-orbits">Show Orbital Paths</Label>
              <Switch
                id="show-orbits"
                checked={showOrbits}
                onCheckedChange={setShowOrbits}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-labels">Show Planet Labels</Label>
              <Switch
                id="show-labels"
                checked={showLabels}
                onCheckedChange={setShowLabels}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="star-density">Star Density: {starDensity}</Label>
              <Slider
                id="star-density"
                min={1}
                max={20}
                step={1}
                value={[starDensity]}
                onValueChange={(value) => setStarDensity(value[0])}
              />
            </div>
          </div>

          {/* Unit Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Units</h4>
            
            <div className="space-y-2">
              <Label htmlFor="units">Distance Units</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger>
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilometers</SelectItem>
                  <SelectItem value="au">Astronomical Units</SelectItem>
                  <SelectItem value="mi">Miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Performance</h4>
            <p className="text-sm text-muted-foreground">
              Reduce star density or disable orbital paths for better performance on slower devices.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}