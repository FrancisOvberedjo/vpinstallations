import Button from "@/components/Button"
import ImageCarousel from "@/components/ImageCarousel"

const Hero = () => {
  return (
    <section className="pt-20 mx-auto max-w-7xl">
        <div>
            <h1>Seamless TV Setup for Every Home</h1>
            <p>Hassle-free installations for the perfect home entertainment view.</p>
        </div>

        <div>
            <Button label="Book Now" href="" variant="fill"/>
            <Button label="Get Quote" href="" variant="outline"/>
        </div>

        <div>
            <ImageCarousel/>
        </div>

    </section>
  )
}

export default Hero