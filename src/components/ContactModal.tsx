
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Facebook, Instagram, } from "lucide-react"
import { FaFacebook, FaInstagram, FaDiscord, FaTwitter } from "react-icons/fa"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-[#220d50] border border-[#4d1fae] max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contact Us</DialogTitle>
          <DialogDescription className="text-[#4d1fae]">
          Prends contact avec l'équipe de soundSHINE Radio!
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4 text-[#220d50]">
          On veut avoir de tes nouvelles! Que ce soit pour nous partager tes impressions, faire une demande spéciale ou discuter d'une collaboration, notre équipe est là pour t'aider.
          </p>
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-[#220d50]">Email</h3>
            <p className="text-[#220d50]">contact @ soundshineradio.com</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-[#220d50]">Médias Sociaux</h3>
            <p className="text-[#220d50]">Suis-nous sur les réseaux sociaux pour ne rien manquer et découvrir les coulisses de soundSHINE Radio!</p>
            <div className="flex gap-2 mt-4">
            <div className="flex items-center space-x-4 mr-4">
              <a 
                href="https://discord.gg/uhc7RUSk84" 
                target="_blank"
                className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
              >
                <FaDiscord size={20} />
              </a>
              <a 
                href="https://www.facebook.com/soundshiner/" 
                target="_blank"
                className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/soundshiner/" 
                target="_blank"
                className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://www.x.com/soundshiner/" 
                target="_blank"
                className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
