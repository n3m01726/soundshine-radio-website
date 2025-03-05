
import { useEffect } from 'react';

interface HelmetProps {
  title?: string;
  description?: string;
  author?: string;
  ogImage?: string;
}

const Helmet = ({ 
  title = "soundSHINE Radio - Les meilleurs hits du moment",
  description = "Écoutez soundSHINE Radio en direct - La radio qui fait briller votre journée avec les meilleurs hits",
  author = "soundSHINE Radio",
  ogImage = "/logo.webp"
}: HelmetProps) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      description: description,
      author: author,
      "og:image": ogImage,
      "og:title": title,
      "og:description": description
    };
    
    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });
    
    return () => {
      // Clean up is optional here as meta changes persist
    };
  }, [title, description, author, ogImage]);

  return null; // This component doesn't render anything visible
};

export default Helmet;
