
import { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "en";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageProviderContext = createContext<LanguageProviderState | undefined>(undefined);

// Traductions
const translations = {
  fr: {
    "app.title": "soundSHINE Radio | On vous en met plein les oreilles!",
    "app.description": "Tanné d'entendre toujours la même affaire ? soundSHINE Radio, c't'un mix éclectique qui sort du lot, 24/7. Des classiques, des découvertes, pis du stock que t'entendras nulle part ailleurs. Branche-toi, écoute, pis enjoy !",
    "menu.about": "La Vibe soundSHINE",
    "menu.contact": "Contactez-nous!",
    "menu.shop": "La Shop",
    "menu.about.full": "À propos de soundSHINE",
    "footer.copyright": "© 2020-2024 soundSHINE Radio. Tous droits réservés.",
    "player.loading": "Chargement du flux...",
    "player.currentlyPlaying": "En cours de lecture",
    "player.noMetadata": "Aucune métadonnée disponible",
    "stations.mainstream": "Les meilleurs hits du moment",
    "stations.lofi": "Détendez-vous avec LoFi",
    "stations.indie": "Découvrez des artistes indépendants",
    "stations.electronic": "Électronique et Dance",
  },
  en: {
    "app.title": "soundSHINE Radio | We fill your ears with sound!",
    "app.description": "Tired of hearing the same old tunes? soundSHINE Radio is an eclectic mix that stands out, 24/7. Classics, discoveries, and stuff you won't hear anywhere else. Plug in, listen, and enjoy!",
    "menu.about": "The soundSHINE Vibe",
    "menu.contact": "Contact Us!",
    "menu.shop": "The Shop",
    "menu.about.full": "About soundSHINE",
    "footer.copyright": "© 2020-2024 soundSHINE Radio. All rights reserved.",
    "player.loading": "Loading stream...",
    "player.currentlyPlaying": "Currently Playing",
    "player.noMetadata": "No metadata available",
    "stations.mainstream": "The best current hits",
    "stations.lofi": "Relax with LoFi",
    "stations.indie": "Discover independent artists",
    "stations.electronic": "Electronic and Dance",
  }
};

export function LanguageProvider({
  children,
  defaultLanguage = "fr",
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem("language") as Language) || defaultLanguage
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageProviderContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);
  
  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");
  
  return context;
};
