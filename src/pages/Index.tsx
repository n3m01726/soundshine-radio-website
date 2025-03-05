
import RadioPlayer from "@/components/RadioPlayer"
import Helmet from "@/components/Helmet"

const Index = () => {
  return (
    <>
      <Helmet 
        title="soundSHINE Radio | On vous en met plein les oreilles!"
        description="Tanné d'entendre toujours la même affaire ? soundSHINE Radio, c't'un mix éclectique qui sort du lot, 24/7. Des classiques, des découvertes, pis du stock que t'entendras nulle part ailleurs. Branche-toi, écoute, pis enjoy !"
        author="soundSHINE Radio"
        ogImage="https://soundshineradio.com/img/social/fb_link_cover.jpg"
        ogUrl="https://soundshineradio.com"
        fbAppId="2004208316763230"
        twitterCard="summary_large_image"
        twitterImage="https://soundshineradio.com/img/socials/fb_link_cover.jpg"
      />
      <RadioPlayer />
    </>
  )
}

export default Index
