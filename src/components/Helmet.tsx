
import { useEffect } from 'react';

interface HelmetProps {
  title?: string;
  description?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  fbAppId?: string;
  twitterCard?: string;
  twitterImage?: string;
}

const Helmet = ({ 
  title = "soundSHINE Radio | On vous en met plein les oreilles!",
  description = "Tanné d'entendre toujours la même affaire ? soundSHINE Radio, c't'un mix éclectique qui sort du lot, 24/7. Des classiques, des découvertes, pis du stock que t'entendras nulle part ailleurs. Branche-toi, écoute, pis enjoy !",
  author = "soundSHINE Radio",
  ogImage = "https://soundshineradio.com/img/social/fb_link_cover.jpg",
  ogUrl = "https://soundshineradio.com",
  fbAppId = "2004208316763230",
  twitterCard = "summary_large_image",
  twitterImage = "https://soundshineradio.com/img/socials/fb_link_cover.jpg"
}: HelmetProps) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      // Basic meta tags
      description: description,
      author: author,
      
      // Facebook Open Graph
      "fb:app_id": fbAppId,
      "og:type": "website",
      "og:url": ogUrl,
      "og:title": title,
      "og:description": description,
      "og:image": ogImage,
      
      // Twitter Card
      "twitter:card": twitterCard,
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": twitterImage
    };
    
    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('fb:')) {
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
  }, [title, description, author, ogImage, ogUrl, fbAppId, twitterCard, twitterImage]);

  return null; // This component doesn't render anything visible
};

export default Helmet;
