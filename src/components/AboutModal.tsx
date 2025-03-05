
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
          <DialogTitle className="text-xl font-bold">À propos de la Vibe soundSHINE Radio</DialogTitle>
          <DialogDescription className="text-white/80">
            Apprend-en plus sur la vibe soundSHINE Radio!
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
          Tanné d'entendre toujours la même affaire ? soundSHINE Radio, c't'un mix éclectique qui sort du lot, 24/7. 
          Des classiques, des découvertes, pis du stock que t'entendras nulle part ailleurs. Branche-toi, écoute, pis enjoy !
          </p>
          <p className="mb-4">
          Parce que, notre gang de DJs crinqués pis de trippeux de musique bosse jour et nuit pour te pondre la playlist parfaite.
          </p>
          <p>
          🎶 Que t’aies les deux pieds ben relax chez vous, en plein rush au boulot ou en train de courir partout, soundSHINE Radio t’accompagne avec du gros beat, toute la journée, tous les jours!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
