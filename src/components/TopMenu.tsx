
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Mail, Menu, ShoppingBag, X } from "lucide-react";
import AboutModal from "./AboutModal";
import ContactModal from "./ContactModal";
import { useIsMobile } from "@/hooks/use-mobile";

const TopMenu = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {isMobile ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#9b87f5] hover:bg-[#1A1F2C] hover:text-white transition-colors"
            onClick={handleMobileMenuToggle}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#9b87f5] hover:bg-[#1A1F2C] hover:text-white transition-colors"
              onClick={() => setAboutOpen(true)}
            >
              <Info className="mr-1 h-4 w-4" />
              The soundSHINE Vibe
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#9b87f5] hover:bg-[#1A1F2C] hover:text-white transition-colors"
              asChild
            >
              <a href="https://shop.soundshineradio.com" target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="mr-1 h-4 w-4" />
                The Shop
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#9b87f5] hover:bg-[#1A1F2C] hover:text-white transition-colors"
              onClick={() => setContactOpen(true)}
            >
              <Mail className="mr-1 h-4 w-4" />
              Contact us
            </Button>
          </>
        )}
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="absolute top-14 right-4 bg-[#1A1F2C]/90 backdrop-blur-md p-4 rounded-lg z-50 flex flex-col gap-2 w-48 shadow-xl animate-fade-in">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#9b87f5] hover:bg-[#230e4e] hover:text-white transition-colors justify-start"
            onClick={() => {
              setAboutOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            <Info className="mr-2 h-4 w-4" />
            About
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#9b87f5] hover:bg-[#230e4e] hover:text-white transition-colors justify-start"
            asChild
          >
            <a href="https://shop.soundshineradio.com" target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop
            </a>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#9b87f5] hover:bg-[#230e4e] hover:text-white transition-colors justify-start"
            onClick={() => {
              setContactOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </div>
      )}

      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default TopMenu;
