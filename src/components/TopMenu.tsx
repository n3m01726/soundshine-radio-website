
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Mail, ShoppingBag, Radio } from "lucide-react";
import AboutModal from "./AboutModal";
import ContactModal from "./ContactModal";

interface TopMenuProps {
  onPlayRadio: () => void;
}

const TopMenu = ({ onPlayRadio }: TopMenuProps) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 absolute top-0 left-0 z-10">
      <div className="flex items-center">
        <img 
          src="/logo.webp" 
          alt="soundSHINE Radio" 
          className="h-16 w-auto" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-[#9b87f5] hover:bg-[#120616] hover:text-white transition-colors"
          onClick={() => setAboutOpen(true)}
        >
          <Info className="mr-1 h-4 w-4" />
          About
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-[#9b87f5] hover:bg-[#120616] hover:text-white transition-colors"
          asChild
        >
          <a href="https://shop.soundshineradio.com" target="_blank" rel="noopener noreferrer">
            <ShoppingBag className="mr-1 h-4 w-4" />
            Shop
          </a>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-[#9b87f5] hover:bg-[#120616] hover:text-white transition-colors"
          onClick={() => setContactOpen(true)}
        >
          <Mail className="mr-1 h-4 w-4" />
          Contact
        </Button>

        <Button 
          variant="default" 
          size="sm" 
          className="bg-[#f1f1f1] text-[#230e4e] hover:bg-white ml-2"
          onClick={onPlayRadio}
        >
          <Radio className="mr-1 h-4 w-4" />
          Listen Radio
        </Button>

        <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
        <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
      </div>
    </div>
  );
};

export default TopMenu;
