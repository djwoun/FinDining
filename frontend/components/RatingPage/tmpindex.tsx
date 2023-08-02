import RatingPage from "./RatingPage.tsx"
import styles from "./RatingPage.module.scss"
import React, {useState } from "react";
//import { Rating } from "../Rating/index.tsx" //"ui-kit";

//import styles from "./RatingPage.module.scss"
const RatePages: React.Fc = () => {

  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  return ( 
   // <Rating
  //    activeColor="#ffd700"
  //    count={5}
  //    size={45}
  //    onChange={handleRatingChange}
   // />
    //</section>
      <>
      <h2>Rating</h2>
      <RatingPage 
      activeColor = "#ffd700"
      count={5}
      size={45}
      onChange={handleRatingChange} />
      <ratingpage className = {styles.h2}> Meal </ratingpage>
       <div>
      <pre>{JSON.stringify(rating, null, 2)}</pre>
    </div>
      </>
  );
}
export default RatePages;
//export { RatingPage as default } from "./RatingPage";


