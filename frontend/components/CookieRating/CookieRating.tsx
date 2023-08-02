import React, { memo } from "react";
import ReactStars from "react-rating-stars-component";

export interface IRatingProps {
  activeColor?: string;
  count?: number;
  size?: number;
  onChange?: (newRating: number) => void;
  cookie?: number;
}

const RatingComponent: React.FC<IRatingProps> = ({
  activeColor,
  count,
  size,
  onChange,
  cookie,
}) => {
  return (
    <ReactStars
      activeColor = "#ffd700" 
      count = {5}
       size = {50}
      onChange={onChange}
      //cookie=JSON.stringfy(rating)
    />
  );
};

export const CookieRating = memo(RatingComponent);

