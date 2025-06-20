
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Send, Loader2 } from "lucide-react";
import { useRequests } from "@/hooks/useRequests";

const RequestForm = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [songId, setSongId] = useState("");
  
  const { submitRequest, isSubmitting } = useRequests();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }

    submitRequest({
      username: username.trim(),
      message: message.trim() || undefined,
      song_id: songId.trim() || undefined
    });

    // Reset form
    setUsername("");
    setMessage("");
    setSongId("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-black flex items-center justify-center gap-2">
          <Music className="h-5 w-5" />
          Demande musicale
        </CardTitle>
        <CardDescription className="text-black/80">
          Demandez votre chanson préférée !
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Votre nom/pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-white/20 border-white/30 text-black placeholder:text-black/60"
            />
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="Titre - Artiste (optionnel)"
              value={songId}
              onChange={(e) => setSongId(e.target.value)}
              className="bg-white/20 border-white/30 text-black placeholder:text-black/60"
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Message personnel (optionnel)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="bg-white/20 border-white/30 text-black placeholder:text-black/60 resize-none"
            />
          </div>
          
          <Button
            type="submit"
            disabled={!username.trim() || isSubmitting}
            className="w-full bg-[#4d1fae] hover:bg-[#220d50] text-black"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Envoyer la demande
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
