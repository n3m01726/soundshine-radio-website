
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, User } from "lucide-react";

interface UserAvatarProps {
  className?: string;
}

const UserAvatar = ({ className }: UserAvatarProps) => {
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
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

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-white hover:bg-[#220d50] hover:text-white transition-colors p-1"
        onClick={toggleMenu}
      >
        <Avatar className="h-8 w-8 border border-[#4d1fae]">
          {profile?.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={profile?.username || "User"} />
          ) : (
            <AvatarFallback className="bg-[#4d1fae] text-white">
              {getInitials()}
            </AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-1 bg-[#220d50]/90 backdrop-blur-md p-2 rounded-lg z-50 w-48 shadow-xl animate-fade-in">
          {profile?.username && (
            <div className="px-3 py-2 text-white text-sm font-medium border-b border-[#4d1fae] mb-2">
              {profile.username}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-full justify-start text-white hover:bg-[#4d1fae] hover:text-white transition-colors mb-1"
          >
            <a href="/profile">
              <User className="mr-2 h-4 w-4" />
              Profil
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-white hover:bg-[#4d1fae] hover:text-white transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
