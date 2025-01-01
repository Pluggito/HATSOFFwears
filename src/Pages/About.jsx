import { assets } from "../assets/asset"
import Title from "../Components/Title"
import NewsLetter from './NewsLetter'

const About = () => {
  return (
    <div>
      <div className="text 2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
    
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.logo_icon1} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to HatsOff, your premier destination for authentic streetwear and urban fashion. 
            Founded with a passion for style and self-expression, we&apos;ve been crafting quality apparel 
            that speaks to the heart of street culture since our inception.
          </p>
          <p>
            Our collection features carefully designed pieces that blend comfort with contemporary 
            urban aesthetics. From our signature t-shirts to our distinctive accessories, each item 
            is created with attention to detail and a commitment to quality that our customers have 
            come to trust and expect.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At HatsOff, our mission is to redefine streetwear culture by creating authentic, high-quality apparel that empowers self-expression. We strive to build a community where style meets comfort, and where every piece tells a unique story of urban creativity and individual flair.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default About