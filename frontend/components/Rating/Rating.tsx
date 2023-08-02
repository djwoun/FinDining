import React, { memo } from "react";
import ReactStars from "react-rating-stars-component";
import { getCookie, setCookie } from 'typescript-cookie';
import styles from "./Cookie.module.scss";

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
      activeColor = "#ffd700"
      //activeColor={activeColor}
      count = {5}
      size = {50}
      onChange={onChange}
    />
  );
};

export const Rating = memo(RatingComponent);
