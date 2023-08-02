import React, { useCallback, useEffect, useRef, useState } from "react"
import styles from "./campusmap.module.scss"
import campusMapImg from "../../public/campus_map.png"
import Image from 'next/future/image'

let tranOrigin = "0px 0px";
let tran = "";
let x = [];
let y = [];
let scale = [];
let origin = {x: 0, y: 0};
let newOrigin = {x: 0, y: 0};
let original = "";
let accumlatedFactor = 0;

const CampusMap: React.FC = () => {
  // const [origin, setOrigin] = useState({x: 0, y: 0});
  const [myZoom, setZoom] = useState(1);
  const [myOrigin, setOrigin] = useState("");

  const [dim, setDim] = useState({width: 0, height: 0});
  
  const [domNode, setDomNode] = useState(null);
  const onRefChange = useCallback(node => {
    setDomNode(node);
  }, []);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [update, setUpdate] = useState(0);

  // Todo: Make this interactive and les`s pixelated on zoom.
  //   May have to pivot to another map concept.
  const css = { width: '100%', height: '100vh', backgroundColor: 'red', position: 'relative', top: 0, left: 0, overflow: 'auto' } // 100% 100vh
  const imageStyle = { position: 'absolute', top: 0, left: 0, transformOrigin: tranOrigin, transform: tran }
  const myBtn = { position: 'fixed', top: 50, left: 50 }
  const myBtn2 = { position: 'fixed', top: 100, left: 50 }
  const test = { width: 5, height: 5, position: 'absolute', top: origin.y, left: origin.x, backgroundColor: 'red' }

  const compileOrigin = (): string => {
    let transform = "";
    console.log(y);
    for (let i = 0; i < x.length; i++) {
        transform += "translate(" + (x[i] - newOrigin.x) + "px, " + (y[i] - newOrigin.y) + "px) scale(" + scale[i] + ") translate(" + (newOrigin.x - x[i]) + "px, " + (newOrigin.y - y[i]) + "px) ";
    }
    return transform;
  }

  const zoom = (factor: number) => {
    newOrigin.x = (ref.current.clientWidth)/2 + (ref.current.scrollLeft); // imageStyle, left
    newOrigin.y = (ref.current.clientHeight)/2 + (ref.current.scrollTop); // imageStyle, top
    if (origin.x - newOrigin.x != 0 || origin.y - newOrigin.y != 0) {
      x.push(origin.x);
      y.push(origin.y);
      scale.push(1 + accumlatedFactor);
      tran = compileOrigin();
      original = tran;
      accumlatedFactor = 0;
    }
    origin.x = newOrigin.x;
    origin.y = newOrigin.y;
    accumlatedFactor += factor;
    tran = original + "scale(" + (1 + accumlatedFactor) + ")";
    tranOrigin = origin.x + "px " + origin.y + "px";
    setUpdate((prevState) => prevState += 1);
    console.log(tran);
  }

  return (
    <div style={css} ref={ref}>
      <Image
        src={campusMapImg}
        style={imageStyle}
        alt="Map of campus image"
      />
      <button style={myBtn} onClick={() => {zoom(0.05)}}>ZOOM IN</button>
      <button style={myBtn2} onClick={() => {zoom(-0.05)}}>ZOOM OUT</button>
      <div style={test}></div>
    </div>
  )
};

export default CampusMap;