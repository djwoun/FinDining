import React, { memo } from "react";
import ReactStars from "react-rating-stars-component";

export interface IRatingProps {
  activeColor?: string;
  count?: number;
  size?: number;
  onChange?: (newRating: number) => void;
}

const RatingComponent: React.FC<IRatingProps> = ({
  activeColor,
  count,
  size,
  onChange,
}) => {
  return (
    <ReactStars
      activeColor={activeColor}
      count={count}
      size={size}
      onChange={onChange}
    />
  );
};

export const RatingPage = memo(RatingComponent);
/*
import React, { memo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import {Rating } from "../Rating"

export interface IRatingProps {
  activeColor?: string;
  count?: number;
  size?: number;
  onChange?: (newRating: number) => void;
  //Cookie?: number;
//  const [rating, setRating] => useState(0);
}
//const [rating, setRating] = useState(0);
const RatingComponent: React.FC<IRatingProps> = ({
  activeColor,
  count,
  size,
  onChange,
  //Cookie,
}) => {
  return (
    <ReactStars
      activeColor = "#ffd700" 
      //activeColor={activeColor}
      count = {5}
      size = {50}
      onChange={onChange}
      //Cookie={JSON.stringify(useState(0), null, 2)}
     />
  );
};

export const RatingPage = memo(RatingComponent);

*/
