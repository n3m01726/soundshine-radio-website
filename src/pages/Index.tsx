
import RadioPlayer from "@/components/RadioPlayer";
import Helmet from "@/components/Helmet";
import { useLanguage } from "@/hooks/use-language";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet 
        title={t("app.title")}
        description={t("app.description")}
        author="soundSHINE Radio"
        ogImage="https://soundshineradio.com/img/social/fb_link_cover.jpg"
        ogUrl="https://soundshineradio.com"
        fbAppId="2004208316763230"
        twitterCard="summary_large_image"
        twitterImage="https://soundshineradio.com/img/socials/fb_link_cover.jpg"
      />
      <RadioPlayer />
    </>
  );
};

export default Index;
