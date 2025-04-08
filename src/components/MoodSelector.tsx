
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Smile, Meh, Frown, Angry } from "lucide-react";
import { format } from 'date-fns';

type MoodType = 'happy' | 'neutral' | 'sad' | 'angry' | undefined;

interface MoodSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  onSaveMood: (date: Date, mood: MoodType) => void;
  currentMood?: MoodType;
}

const MoodSelector = ({ 
  open, 
  onOpenChange, 
  selectedDate, 
  onSaveMood, 
  currentMood 
}: MoodSelectorProps) => {
  const [mood, setMood] = React.useState<MoodType>(currentMood);

  React.useEffect(() => {
    if (open) {
      setMood(currentMood);
    }
  }, [open, currentMood]);

  const handleSave = () => {
    if (selectedDate && mood) {
      onSaveMood(selectedDate, mood);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedDate ? `Record Mood for ${format(selectedDate, 'MMMM d, yyyy')}` : 'Record Mood'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup 
            value={mood} 
            onValueChange={(value) => setMood(value as MoodType)}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="happy" id="happy" />
              <Label htmlFor="happy" className="flex items-center gap-2">
                <Smile className="h-6 w-6 text-green-500" />
                <span>Happy</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="neutral" />
              <Label htmlFor="neutral" className="flex items-center gap-2">
                <Meh className="h-6 w-6 text-blue-500" />
                <span>Neutral</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sad" id="sad" />
              <Label htmlFor="sad" className="flex items-center gap-2">
                <Frown className="h-6 w-6 text-purple-500" />
                <span>Sad</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="angry" id="angry" />
              <Label htmlFor="angry" className="flex items-center gap-2">
                <Angry className="h-6 w-6 text-red-500" />
                <span>Angry</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!mood}>Save Mood</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelector;
