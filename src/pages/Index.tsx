
import RadioPlayer from "@/components/RadioPlayer"
import Helmet from "@/components/Helmet"

const Index = () => {
  return (
    <>
      <Helmet 
        title="soundSHINE Radio - Les meilleurs hits du moment"
        description="Écoutez soundSHINE Radio en direct - La radio qui fait briller votre journée avec les meilleurs hits"
        author="soundSHINE Radio"
        ogImage="/logo.webp"
      />
      <RadioPlayer />
    </>
  )
}

export default Index
