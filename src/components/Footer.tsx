
import { Facebook, Instagram, X } from "lucide-react"
import { FaDiscord } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="flex items-center space-x-4 mr-4">
            <a 
        href="https://discord.gg/uhc7RUSk84" 
        target="_blank"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <FaDiscord size={20} />
      </a>
      <a 
        href="https://www.facebook.com/soundshiner/" 
        target="_blank"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <Facebook size={20} />
      </a>
      <a 
        href="https://www.instagram.com/soundshiner/" 
        target="_blank"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <Instagram size={20} />
      </a>
    <a 
        href="https://www.x.com/soundshiner/" 
        target="_blank"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <X size={20} />
      </a>
      
    </div>
  )
}

export default Footer
