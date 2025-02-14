
import { Facebook, Instagram } from "lucide-react"
import { FaDiscord } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="py-4 mt-auto">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-400">
            © 2020-2024 soundSHINE Radio. Tous droits réservés.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.facebook.com/soundshineradiocom/" 
              target="_blank"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/soundshineradio/" 
              target="_blank"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://discord.gg/uhc7RUSk84" 
              target="_blank"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <FaDiscord size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
