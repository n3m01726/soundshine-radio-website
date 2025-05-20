
import { RadioStation } from "@/types/radio";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

interface StationSelectorProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  onSelectStation: (station: RadioStation) => void;
}

const StationSelector = ({ stations, currentStation, onSelectStation }: StationSelectorProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {stations.map((station) => (
        <Button
          key={station.id}
          variant="outline"
          className={`p-4 rounded-lg h-auto flex flex-col items-center justify-center transition-all duration-300 ${
            currentStation?.id === station.id 
              ? "bg-[#220d50]/70 text-white border-[#4d1fae] shadow-lg" 
              : "bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-[#220d50]/40 hover:border-[#4d1fae]/60"
          }`}
          onClick={() => onSelectStation(station)}
        >
          <div className="font-bold text-lg mb-1">{station.name}</div>
          <div className="text-xs opacity-80">{t(station.description)}</div>
        </Button>
      ))}
    </div>
  );
};

export default StationSelector;
