
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutModal = ({ open, onOpenChange }: AboutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#230e4e] text-white border border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">About SoundShine Radio</DialogTitle>
          <DialogDescription className="text-white/80">
            Learn more about our radio station
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            SoundShine Radio is your premier destination for the best hits and music. 
            We've been broadcasting since 2020, bringing you the latest and greatest 
            in popular music.
          </p>
          <p className="mb-4">
            Our team of passionate DJs and music enthusiasts work around the clock to 
            curate the perfect playlist for your listening pleasure.
          </p>
          <p>
            Whether you're at home, at work, or on the go, SoundShine Radio is your 
            companion for great music all day, every day.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
