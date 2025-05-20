
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
      className="text-[#4d1fae] hover:bg-[#220d50] hover:text-white transition-colors"
    >
      {language === "fr" ? "EN" : "FR"}
    </Button>
  );
}
