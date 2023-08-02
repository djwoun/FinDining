
import React, { useState } from "react";
import { Rating2 } from "./Rating2.tsx" //"ui-kit";
import "./RatingPage.module.scss";
import Cookies from "./Cookie.tsx"
import { cookies, useCookies, CookiesProvider } from 'react-cookie';

export const RatingPage: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [cookies, setCookie] = useCookies(['rating']);
  function onChange(newName) {
    setCookie('rating', newName, { path: '/' }, {expires: 100});
    setRating(newName);
  }
  return (
    <section className="RatingPage">
      <h2>Rating</h2>
      <CookiesProvider>
        <Rating2
          activeColor="#ffd700"
          count={5}
          size={45}
	  onChange = {onChange}
        />
      </CookiesProvider>
      <div>
      <h2>
        Rate: {JSON.stringify(rating, null, 2)}
      </h2>
      <h1>Cookie: {cookies.rating} </h1>
      </div>
    </section>
  );
};
