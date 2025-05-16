
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import TopMenu from "@/components/TopMenu";
import Helmet from "@/components/Helmet";

interface FavoriteStation {
  id: string;
  station_id: string;
  name: string;
  description: string;
  genre: string;
}

const Profile = () => {
  const { user, profile, isLoading, signOut } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteStation[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    } else if (user) {
      fetchFavorites();
    }
  }, [user, isLoading, navigate]);

  const fetchFavorites = async () => {
    try {
      setIsLoadingFavorites(true);
      
      const { data: favoriteData, error: favoriteError } = await supabase
        .from('favorite_stations')
        .select('id, station_id')
        .eq('user_id', user?.id);

      if (favoriteError) {
        console.error('Error fetching favorites:', favoriteError);
        return;
      }

      // For a real app, you would fetch station details from your database
      // Here we're just using the station_id as a key for demo purposes
      const enrichedFavorites = favoriteData.map(favorite => {
        // In a real app, you'd match this with actual station data
        return {
          id: favorite.id,
          station_id: favorite.station_id,
          name: `Station ${favorite.station_id}`,
          description: "Description de la station",
          genre: "Genre de la station"
        };
      });

      setFavorites(enrichedFavorites);
    } catch (error) {
      console.error('Error in fetchFavorites:', error);
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorite_stations')
        .delete()
        .eq('id', favoriteId);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer la station des favoris.",
          variant: "destructive",
        });
        return;
      }

      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      
      toast({
        title: "Station supprimée",
        description: "La station a été supprimée de vos favoris.",
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const getInitials = () => {
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e1b4b]">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] text-white p-4">
      <Helmet 
        title="Profil | soundSHINE Radio"
        description="Gérez votre profil et vos stations préférées sur soundSHINE Radio"
      />
      <TopMenu />
      
      <div className="max-w-4xl mx-auto pt-24 pb-16">
        <div className="bg-[#220d50]/40 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-2 border-[#4d1fae]">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile?.username || "User"} />
              ) : (
                <AvatarFallback className="bg-[#4d1fae] text-white text-2xl">
                  {getInitials()}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">
                {profile?.username || user?.email || "Utilisateur"}
              </h1>
              
              {profile?.discord_id && (
                <p className="text-[#4d1fae] mb-4">
                  Connecté avec Discord
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="border-[#4d1fae] text-white hover:bg-[#4d1fae] hover:text-white"
                >
                  Retour à la radio
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Se déconnecter
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#220d50]/40 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-pink-500" />
            <h2 className="text-xl font-bold">Stations favorites</h2>
          </div>
          
          {isLoadingFavorites ? (
            <div className="animate-pulse">Chargement des favorites...</div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map(station => (
                <div 
                  key={station.id}
                  className="bg-[#1a0a3c] rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{station.name}</h3>
                    <p className="text-sm text-gray-400">{station.genre}</p>
                  </div>
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFavorite(station.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Vous n'avez pas encore ajouté de stations à vos favoris.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
