
import { Clock, Music, User, MessageCircle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRequests } from "@/hooks/useRequests";
import { SongRequest } from "@/types/requests";

const RequestsList = () => {
  const { recentRequests, isLoading } = useRequests();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'played':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'played':
        return 'Jouée';
      case 'rejected':
        return 'Rejetée';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'played':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="text-center text-white/60">
            Chargement des demandes...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music className="h-5 w-5" />
          Demandes récentes
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto space-y-3">
        {recentRequests.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            Aucune demande pour le moment
          </div>
        ) : (
          recentRequests.map((request: SongRequest) => (
            <div
              key={request.id}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-white/60" />
                  <span className="text-white font-medium">
                    {request.username}
                  </span>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusIcon(request.status)}
                  <span className="ml-1">{getStatusText(request.status)}</span>
                </Badge>
              </div>
              
              {request.song_id && (
                <div className="mb-2">
                  <div className="text-white/80 text-sm">
                    🎵 {request.song_id}
                  </div>
                </div>
              )}
              
              {request.message && (
                <div className="mb-2 flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-white/60 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">
                    {request.message}
                  </span>
                </div>
              )}
              
              <div className="text-xs text-white/50">
                {new Date(request.requested).toLocaleString('fr-FR')}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RequestsList;
