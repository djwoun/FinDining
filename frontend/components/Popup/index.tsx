import { NextPage } from "next";
import Popup from "../../components/Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils, faX, faLocationDot, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
import {faStar as star} from '@fortawesome/free-regular-svg-icons'
import {faStarHalfStroke} from '@fortawesome/free-regular-svg-icons'
import styles from "./Popup.module.scss";
import { useCallback, useEffect, useState } from "react";
import MenuBoard from "../MenuBoard"
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import styles2 from "../../components/MenuBoard/MenuBoard.module.scss"
import ReactStars from "react-rating-stars-component";
import { DataProps } from "../../pages/map/index";

interface Props {
  locationId: number;
  isVisible: boolean;
  closePopup: () => void;
  data: Record<number, DataProps>;
}

interface Food{
  Menu: string;
  priceone: string;
  pricetwo: string;
  pricethree: string;
}
interface Food extends Array<Food>{}

interface DisplayHours {
  days: string;
  hours: string;
}

interface Hours {
  open: string;
  close: string;
}

interface WeeklyHours {
  Monday: Hours | string;
  Tuesday: Hours | string;
  Wednesday: Hours | string;
  Thursday: Hours | string;
  Friday: Hours | string;
  Saturday: Hours | string;
  Sunday: Hours | string;
}

interface Address {
  lineOne: string;
  lineTwo: string;
}

// interface MenuBoard{
//   Menu: string;
//   priceone: string;
//   pricetwo: string;
//   pricethree: string;
// }
// interface Props extends Array<Props>{}

const Pop: NextPage<Props, Food> = (props, food) => {
  const [popmenu, setBoard] = useState(0);
  const [hoursToDisplay, setHoursToDisplay] = useState([]);
  const empty: Address = { lineOne: "", lineTwo: "" };
  const [addressToDisplay, setAddressToDisplay] = useState(empty);
  const [imgUrl, setImgUrl] = useState(``);
  const [toggle, setToggle] = useState(0);

  const convertToStdTime = (military: string): string => {
    let hour, min;
    if (military.length == 3) { // ex: 700
      hour = parseInt(military[0]);
      min = parseInt(military.substring(1, 3), 10);
    } else if (military.length == 4) { // ex: 1400
      hour = parseInt(military.substring(0, 2));
      min = parseInt(military.substring(2, 4), 10);
    }

    let isAM = true;
    if (hour >= 12 && hour < 24) isAM = false;
    if (hour > 12) hour -= 12;

    return hour + ":" + (min <= 9 ? "0" : "") + min + (isAM ? "AM" : "PM");
  }

  const formatTime = (raw: string) => {
    const times: string[] = raw.split(",");
    const open: string = convertToStdTime(times[0]);
    const close: string = convertToStdTime(times[1]);
    return open + " - " + close;
  }

  const coalesce = (hours: Hours | string, value: string, coalesced: Record<string, string[]>) => {
    if (typeof(hours) === "string") {
      if (!("CLOSED" in coalesced)) coalesced["CLOSED"] = [];
      coalesced["CLOSED"].push(value);
    } else {
      if (!(hours.open + "," + hours.close in coalesced)) coalesced[hours.open + "," + hours.close] = [];
      coalesced[hours.open + "," + hours.close].push(value);
    }
    return coalesced;
  }

  const coalesceAll = (hours: WeeklyHours) => {
    let coalesced: Record<string, string[]> = {};
    coalesced = coalesce(hours.Monday, "MON", coalesced);
    coalesced = coalesce(hours.Tuesday, "TUE", coalesced);
    coalesced = coalesce(hours.Wednesday, "WED", coalesced);
    coalesced = coalesce(hours.Thursday, "THU", coalesced);
    coalesced = coalesce(hours.Friday, "FRI", coalesced);
    coalesced = coalesce(hours.Saturday, "SAT", coalesced);
    coalesced = coalesce(hours.Sunday, "SUN", coalesced);

    // coalesced format at this point: key=>"openTime,closeTime" | value=>['MON','TUE','FRI',...]

    let preHoursToDisplay: Array<DisplayHours> = [];
    let coalescedStr, timeStr: string;
    let prev: string;
    let isDash: boolean;
    let isSame: boolean;
    for (const key in coalesced) {
      for (let i = 0; i < coalesced[key].length; i++) {
        if (i == 0) {
          coalescedStr = coalesced[key][i];
          prev = coalesced[key][i];
          isSame = true;
        } else {
          if (
            (coalesced[key][i] === "TUE" && prev === "MON")
            || (coalesced[key][i] === "WED" && prev === "TUE")
            || (coalesced[key][i] === "THU" && prev === "WED")
            || (coalesced[key][i] === "FRI" && prev === "THU")
            || (coalesced[key][i] === "SAT" && prev === "FRI")
            || (coalesced[key][i] === "SUN" && prev === "SAT")
          ) {
            // Is consecutive, so should use dash.
            isDash = true;
            prev = coalesced[key][i];
            isSame = false;

            if (i == coalesced[key].length-1) {
              coalescedStr += "-" + prev;
            }
          } else {
            // Not consecutive, so should use comma.
            if (isDash && !isSame) coalescedStr += "-" + prev;
            isDash = false;
            coalescedStr += ", " + coalesced[key][i];
            prev = coalesced[key][i];
            isSame = true;
          }
        }
      }

      timeStr = (key === "CLOSED") ? "CLOSED" : formatTime(key);
      preHoursToDisplay.push({ days: coalescedStr, hours: timeStr });
    }

    setHoursToDisplay(preHoursToDisplay);
  }
  
  const category: Food = [
    {Menu: "Entrees", priceone: "", pricetwo: "Sandwich", pricethree: "Meal"},
    {Menu: "Sides", priceone: "", pricetwo: "Medium", pricethree: "Large"},
    {Menu: "Treats", priceone: "", pricetwo: "Medium", pricethree: "Large"},
    {Menu: "Beverages", priceone: (toggle ? "" : "Small"), pricetwo: "Medium", pricethree: "Large"}
  ]

  let menus: Food = [
      {Menu: "ChickenBurger", priceone: "", pricetwo: (toggle ? "$ 12.34" : "$9.34"), pricethree: (toggle ? "$ 56.34" : "$12.34")},
      {Menu: "SpicyBurger", priceone: "", pricetwo: (toggle ? "$ 76.42" : "$10.59"), pricethree: (toggle ? "$ 96.23" : "$123.56")},
      {Menu: "SpicyBurger", priceone: "", pricetwo: (toggle ? "$ 76.42" : "$10.59"), pricethree: (toggle ? "$ 96.23" : "$123.56")},
  ]

  useEffect(() => {
    let hours: WeeklyHours = {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    };
    // Convert data hours from ['openTime','closeTime'] to {open: 'openTime', close: 'closeTime'} for above coalesce operations.
    const dataHours: Record<string, string | string[]> = props.data[props.locationId].hours;
    for (const key in dataHours) {
      if (typeof(dataHours[key]) === "string") {
        hours[key] = dataHours[key];
      } else {
        hours[key] = {
          open: dataHours[key][0],
          close: dataHours[key][1]
        }
      }
    }
    coalesceAll(hours);
    
    setAddressToDisplay({ lineOne: props.data[props.locationId].address, lineTwo: "Knoxville, TN 37916" }); // 1502 Cumberland Ave | Knoxville, TN 37916
    setImgUrl(props.data[props.locationId].image);
  }, [props.isVisible]);

  useEffect(() => {
    menus = [
      {Menu: "ChickenBurger", priceone: "", pricetwo: (toggle ? "$ 12.34" : "$9.34"), pricethree: "$ 56.78"},
      {Menu: "SpicyBurger", priceone: "", pricetwo: "$ 56.78", pricethree: "$ 90.12"},
      {Menu: "SpicyBurger", priceone: "", pricetwo: "$ 56.78", pricethree: "$ 90.12"}
    ]
  }, [toggle]);

  return (
    /* bb is for putting background map so that popup would be more like popup*/
    <>
      <div onClick={() => {props.closePopup(); setBoard(0);}} className = {`${styles.bb} ${props.isVisible ? styles.showBB : ''}`} ></div>
      <div className = {`${styles.back} ${props.isVisible ? styles.showBack : ''}`}>
        {!popmenu?(
        <>
        <div>
          {/* <a href="http://localhost:3000/map" className={styles.wrap}><FontAwesomeIcon icon={faLocationDot} /></a> */}
          <a className={styles.wrap} onClick={() => { setBoard((prevState) => (prevState ? 0 : 1)) }}><FontAwesomeIcon icon={faUtensils} /></a>
          <a onClick={() => {props.closePopup(); setBoard(0);}} className={`${styles.wrap} ${styles.wrapRight}`}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></a>
        </div>
        <div style={{backgroundImage: `url(${imgUrl})`}} className = {styles.img}></div>
        <div className = {styles.opcl}><FontAwesomeIcon icon={faClock} /> OPEN / CLOSE </div>
          <div className = {styles.star}>
            <ReactStars
              activeColor = "#947F57"
              count = {5}
              size = {58}
            />
          </div>

        <div className = {styles.splitleft}>
            {hoursToDisplay.map(item=>(
              <div className = {styles.simp}>{item.days} <span className = {styles.time}>{item.hours}</span></div>
            ))}
        </div>
        <div className = {styles.splitright}>
          <div className = {styles.address}> {addressToDisplay.lineOne}</div>
          <div className = {styles.address}> {addressToDisplay.lineTwo}</div>
        </div>
        </>
        ) : (
          <>
          <div onClick={() => { setBoard((prevState) => (prevState ? 1 : 0)) }} className = {styles2.bb}>
            <div className = {styles2.bg}>
                {/* Icons */}
                <div>
                    <div className = {styles2.splitleft}>
                      <a onClick={() => { setBoard((prevState) => (prevState ? 0 : 1)) }} className = {styles2.emoji}><FontAwesomeIcon icon={faHouse} /></a>
                    </div>
                    <div className = {styles2.splitright}>
                      <div className = {styles2.button} id = {styles2.buttonFunc}>
                          <input onClick={() => {setToggle((toggle) => (toggle ? 0 : 1))}} type = "checkbox" className = {styles2.checkbox} />
                            <div className = {styles2.knobs}>
                              <span>Meal Swipe</span>
                            </div>
                          <div className = {styles2.layer}></div>
                        </div>
                    </div>
                </div>
                {/*Menu */}
                <div className = {styles2.scroll}>
                {category.map(item=>(
                    <div>
                        <div className = {styles2.solid}></div>
                        <div className = {styles2.row}>
                            <div className = {styles2.list}>
                                <div className = {styles2.first}> {item.Menu}</div>
                                <div className = {styles2.second}> {item.priceone}</div>
                                <div className = {styles2.third}> {item.pricetwo}</div>
                                <div className = {styles2.third}> {item.pricethree}</div>
                            </div>
                        </div>
                        <div className = {styles2.dot}></div>
                        <div>
                            {menus.map(mitem => (
                            <div className = {styles2.row}>
                                <div className = {styles2.divider}></div>
                                <div className = {styles2.menu}>
                                    <div className = {styles2.first}>{mitem.Menu}</div>
                                    <div className = {styles2.second}>{mitem.priceone}</div>
                                    <div className = {styles2.third}> {mitem.pricetwo}</div>
                                    <div className = {styles2.fourth}> {mitem.pricethree}</div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                ))}
                  <div className = {styles2.solid}></div>
                </div>
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pop;