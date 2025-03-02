
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Mail, ShoppingBag } from "lucide-react";
import AboutModal from "./AboutModal";
import ContactModal from "./ContactModal";

const TopMenu = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:bg-white/10"
        onClick={() => setAboutOpen(true)}
      >
        <Info className="mr-1 h-4 w-4" />
        About
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:bg-white/10"
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
        className="text-white hover:bg-white/10"
        onClick={() => setContactOpen(true)}
      >
        <Mail className="mr-1 h-4 w-4" />
        Contact
      </Button>

      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default TopMenu;
