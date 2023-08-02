import { NextPage } from "next";
import RatePages from "../../components/RatingPage"
import { getCookie, setCookie, removeCookie } from "../../components/typescript-cookie"

//import StarRating from "../../components/RatingPage"
//import { RatingPage } from "../../components/RatingPage";
const RatePage: NextPage = () => {
//  setCookie('Rating', 'rating') 
  return (
    <>
      <RatePages/>
    </>
  );
}

export default RatePage;
