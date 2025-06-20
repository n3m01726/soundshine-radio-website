
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Clock, CheckCircle, XCircle } from "lucide-react";
import RequestForm from "@/components/RequestForm";
import RequestsList from "@/components/RequestsList";
import Helmet from "@/components/Helmet";

const Requests = () => {
  return (
    <>
      <Helmet 
        title="Demandes musicales | soundSHINE Radio"
        description="Demandez vos chansons préférées sur soundSHINE Radio. Soumettez vos requests et suivez leur statut en temps réel."
        author="soundSHINE Radio"
        ogImage="https://soundshineradio.com/img/social/fb_link_cover.jpg"
        ogUrl="https://soundshineradio.com/requests"
        fbAppId="2004208316763230"
        twitterCard="summary_large_image"
        twitterImage="https://soundshineradio.com/img/socials/fb_link_cover.jpg"
      />
      
      <div className="min-h-screen w-full text-white custom-gradient">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Music className="h-8 w-8" />
              Demandes musicales
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Vous avez une chanson que vous aimeriez entendre ? 
              Faites votre demande et suivez son statut en temps réel !
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <RequestForm />
            </div>
            <div>
              <RequestsList />
            </div>
          </div>

          <div className="mt-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Comment ça marche ?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 space-y-4">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <Clock className="h-8 w-8 text-yellow-400 mx-auto" />
                    <h3 className="font-semibold text-white">1. En attente</h3>
                    <p className="text-sm">Votre demande est en cours de traitement</p>
                  </div>
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto" />
                    <h3 className="font-semibold text-white">2. Jouée</h3>
                    <p className="text-sm">Votre chanson a été diffusée à l'antenne</p>
                  </div>
                  <div className="space-y-2">
                    <XCircle className="h-8 w-8 text-red-400 mx-auto" />
                    <h3 className="font-semibold text-white">3. Non disponible</h3>
                    <p className="text-sm">La chanson n'est pas disponible dans notre base</p>
                  </div>
                </div>
                <div className="text-center mt-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm">
                    <strong>Conseil :</strong> Soyez précis dans le titre et l'artiste pour 
                    augmenter vos chances que votre demande soit trouvée et jouée !
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
