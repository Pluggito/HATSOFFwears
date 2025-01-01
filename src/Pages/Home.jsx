import Hero from "../Components/Hero"
import LimitedEditions from "./LimitedEditions"
import NewCollections from "./NewCollections"
import NewsLetter from "./NewsLetter"
import Policy from "./Policy"



export default function Home(){
  return(
      <div>
          <Hero /> 
          <NewCollections />
          <LimitedEditions />
          <Policy />
          <NewsLetter />
      
      </div>
  )
}