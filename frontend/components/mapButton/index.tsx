import styles from "./mapButton.module.scss"
import React, { useState, useEffect, ReactNode } from "react";

interface Props {
  openTime: number;
  closeTime: number;
  top: number;
  left: number;
  imgUrl: string;
  openPopup: (locationId: number) => void;
  locID: number;
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}




function addZero(i) {
  if (i < 10) {i = "0" + i}
  
  return i;
}

const d = new Date();

const MapButton: React.FC<Props> = ({...props}) => {
  
  const size = useWindowSize();
  //console.log(size.height)
  //console.log(size.width)
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let minutes = h*60+m;

 const SCALER = 0.25* (size.height/760)
 const SCALER2 = 0.25* (size.width/1536)
  return (
    
    <div>
      <button 
      onClick = {() => {props.openPopup(props.locID)}} /* TODO: Replace 0 with location ID. */
      style={{ 
        backgroundImage: "url(" + props.imgUrl + ")",
        position: 'absolute', 
        top:  props.top * SCALER,
        left: props.left * SCALER2,
        zIndex: 1
      }} 
      className = {(minutes <= props.closeTime && minutes >=  props.openTime) ? styles.button : styles.buttonNO} type="submit"
      >
      </button>
    </div>


    )
}; 

export default MapButton;
