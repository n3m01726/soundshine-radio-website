import { FaFacebook, FaInstagram, FaDiscord, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="flex items-center space-x-4 mr-4">
      <a 
        href="https://discord.gg/uhc7RUSk84" 
        target="_blank"
        className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
      >
        <FaDiscord size={20} />
      </a>
      <a 
        href="https://www.facebook.com/soundshiner/" 
        target="_blank"
        className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
      >
        <FaFacebook size={20} />
      </a>
      <a 
        href="https://www.instagram.com/soundshiner/" 
        target="_blank"
        className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
      >
        <FaInstagram size={20} />
      </a>
      <a 
        href="https://www.x.com/soundshiner/" 
        target="_blank"
        className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
      >
        <FaTwitter size={20} />
      </a>
    </div>
  )
}

export default Footer
