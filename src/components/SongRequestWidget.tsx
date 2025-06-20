
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, ChevronDown, ChevronUp } from "lucide-react";
import RequestForm from "./RequestForm";
import RequestsList from "./RequestsList";

const SongRequestWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-0">
          <Button
            variant="ghost"
            className="w-full p-4 text-black hover:bg-white/10 flex items-center justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              <span className="font-medium">Demandes musicales</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
          
          {isExpanded && (
            <div className="p-6 pt-0 grid md:grid-cols-2 gap-6">
              <div>
                <RequestForm />
              </div>
              <div>
                <RequestsList />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SongRequestWidget;
