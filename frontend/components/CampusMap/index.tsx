import React, { useCallback, useEffect, useRef, useState } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./campusmap.module.scss"
import campusMapImg from "../../public/campus_map.png"
import Image from 'next/future/image'
import ZoomBtns from '../ZoomBtns'
import MapButton from "../mapButton"
import FiltersElements from "../FiltersElements"
import { json } from "stream/consumers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Search from "../Search";
import { DataProps } from "../../pages/map";

interface Props {
  openPopup: (locationId: number) => void;
  OpenHelp: () => void;
  data: Record<number, DataProps>;
  OpenStrip: () => void;
}

interface MapButtonProps {
  openTime: number;
  closeTime: number;
  top: number;
  left: number;
  imgUrl: string;
  openPopup: (locationId: number) => void;
  locID: number;
}

interface Time {
  hour: number;
  minute: number;
}

interface FiltersDietRestrict {
  vegan: boolean;
  lactose: boolean;
  gluten: boolean;
}

interface FiltersMeal {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface FiltersLocation {
  central: boolean;
  north: boolean,
  west: boolean,
  south: boolean,
  east: boolean
}

interface FiltersHours {
  openingSoon: boolean;
  currentlyOpen: boolean,
  closingSoon: boolean,
  currentlyClosed: boolean
}

export interface Filters {
  dietaryRestrictions: FiltersDietRestrict;
  meal: FiltersMeal;
  location: FiltersLocation;
  hours: FiltersHours;
}

// Based on d.getDay() return value
const daysAsIndices = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}

const filters: Filters = {
  dietaryRestrictions: {
    vegan: false,
    lactose: false,
    gluten: false
  },
  meal: {
    breakfast: false,
    lunch: false,
    dinner: false
  },
  location: {
    central: false,
    north: false,
    west: false,
    south: false,
    east: false
  },
  hours: {
    openingSoon: false,
    currentlyOpen: false,
    closingSoon: false,
    currentlyClosed: false
  }
}

let locations: Array<Array<any>> = [];

const getHrAndMin = (military: string): Time => {
  let hour, min;
  if (military.length == 3) { // ex: 700
    hour = parseInt(military[0]);
    min = parseInt(military.substring(1, 3), 10);
  } else if (military.length == 4) { // ex: 1400
    hour = parseInt(military.substring(0, 2));
    min = parseInt(military.substring(2, 4), 10);
  }

  return { hour: hour, minute: min };
}

const CampusMap: React.FC<Props> = (props) => {
  const css = { width: '100%', height: '100vh' }
  const test = {width: '100%'}
  const [filtersVisibility, setFiltersVisibility] = useState(0);
  const [left, something] = useState(-770);
  const anything = {left:left, top:0}
  const [list, setList] = useState([]); // Array of [locationId, name]

  const testMapBtn: MapButtonProps = {
    openTime: 450,
    closeTime: 1170,
    top: 1200,
    left: 4100,
    imgUrl: "steak.png",
    openPopup: props.openPopup,
    locID: 0
  }
  


   var testMapBtns = [];//: Array<MapButtonProps>
   let j = 0
   for (const key in props.data) {
     //testMapBtns.push()
     var dayOfWeekText;
     const dayOfWeekDigit = new Date().getDay();
     if (dayOfWeekDigit == 1)
      dayOfWeekText =  "Monday";
     if (dayOfWeekDigit == 2)
      dayOfWeekText =  "Tuesday";
     if (dayOfWeekDigit == 3)
      dayOfWeekText =  "Wednesday";
     if (dayOfWeekDigit == 4)
      dayOfWeekText =  "Thursday";
     if (dayOfWeekDigit == 5)
      dayOfWeekText =  "Friday";
     if (dayOfWeekDigit == 6)
      dayOfWeekText = "Saturday"
     if (dayOfWeekDigit == 0)
      dayOfWeekText = "Sunday";
     testMapBtns.push({'openTime':props.data[key].hours[dayOfWeekText][0],'closeTime':props.data[key].hours[dayOfWeekText][1],'top':props.data[key].coordinates[0]
              , 'left':props.data[key].coordinates[1], 'imgUrl':props.data[key].image,'openPopup':props.openPopup,'locID':j });
     console.log(testMapBtns)
     j++
   }
  
   props.data.menu[0]
  

  const setFilterAttr = (filterType: string, values: Record<string, boolean>) => {
    /* Set filters here, key on filterType, then filter entry by iterating through values record and keying on individual entries */
    filters[filterType] = values;

    locations = [];

    for (const key in props.data) {
      // Dietary Restrictions
      if (
        (filters.dietaryRestrictions.gluten && !props.data[key].glu_free)
        || (filters.dietaryRestrictions.lactose && !props.data[key].lac_free)
        || (filters.dietaryRestrictions.vegan && !props.data[key].vegandveg)
      ) continue;

      // Meal Swipe
      if (
        (filters.meal.breakfast && !props.data[key].ms.includes("Breakfast"))
        || (filters.meal.lunch && !props.data[key].ms.includes("Lunch"))
        || (filters.meal.dinner && !props.data[key].ms.includes("Dinner"))
      ) continue;

      // Location
      if (!(
        (filters.location.central && props.data[key].location === "central")
        || (filters.location.east && props.data[key].location === "east")
        || (filters.location.north && props.data[key].location === "north")
        || (filters.location.south && props.data[key].location === "south")
        || (filters.location.west && props.data[key].location === "west")
        || (!filters.location.central && !filters.location.east && !filters.location.north && !filters.location.south && !filters.location.west) // No filter selected.
      )) continue;

      // Hours
      //   Note: "Soon" is defined as within an hour.
      const d = new Date();
      // Get current day of the week.
      const day: string = daysAsIndices[d.getDay()];
      if (props.data[key].hours[day] === "CLOSED") {
        // Note: need to check all of these instead of !filters.hours.currentlyClosed because <select> is multiple.
        if ((filters.hours.openingSoon || filters.hours.currentlyOpen || filters.hours.closingSoon) && !filters.hours.currentlyClosed) continue;
      } else if (filters.hours.closingSoon || filters.hours.currentlyClosed || filters.hours.currentlyOpen || filters.hours.openingSoon) { // Should show all if none are selected.
        let show: boolean = false; // just needs to be true for one of the hours checks below.
        let openingTime: Time = getHrAndMin(props.data[key].hours[day][0]);
        let openingTimeInMin: number = openingTime.hour * 60 + openingTime.minute;
        let closingTime: Time = getHrAndMin(props.data[key].hours[day][1]);
        let closingTimeInMin: number = closingTime.hour * 60 + closingTime.minute;
        let currentTime: Time = {
          hour: d.getHours(), // 0 - 23
          minute: d.getMinutes() // 0 - 59
        };
        let currentTimeInMin: number = currentTime.hour * 60 + currentTime.minute;
        
        // Closing soon
        if (filters.hours.closingSoon) {
          if (currentTimeInMin > closingTimeInMin - 60 && currentTimeInMin < closingTimeInMin) show = true;
        }

        // Currently closed
        if (filters.hours.currentlyClosed) {
          if (currentTimeInMin < openingTimeInMin || currentTimeInMin >= closingTimeInMin) show = true;
        }

        // Currently open
        if (filters.hours.currentlyOpen) {
          if (currentTimeInMin >= openingTimeInMin && currentTimeInMin < closingTimeInMin) show = true;
        }

        // Opening soon
        if (filters.hours.openingSoon) {
          // console.log(openingTimeInMin);
          if (currentTimeInMin > openingTimeInMin - 60 && currentTimeInMin < openingTimeInMin) show = true;
        }

        if (!show) continue;
      }

      // Price
      let name: string = "";
      if (key == "0") name = "Fresh Food Company @ Stokely";
      else if (key == "1") name = "Dining Hall @ Rocky Top";
      else if (key == "2") name = "Southern Kitchen @ Volunteer Hall";
      else if (key == "3") name = "Vol Bakery @ Rocky Top";
      else if (key == "4") name = "Arena Dining Cafe @ Thompson-Boling";
      else if (key == "5") name = "Mabel's @ McCord Hall"
      else if (key == "6") name =  "Subway @ Fred Brown Hall";
      else if (key == "7") name =  "Subway @ Student Union";
      else if (key == "8") name =  "Qdoba @ Student Union";
      else if (key == "9") name =  "Rising Roll @ Student Union";
      else if (key == "10") name =  "Steak n Shake @ Student Union";
      else if (key == "11") name =  "Chick-fil-A @ Rocky Top";
      else if (key == "12") name =  "Chick-fil-A @ Student Union";
      else if (key == "13") name =  "Panda Express @ Cumberland";
      else if (key == "14") name =  "Panda Express @ Student Union";
      else if (key == "15") name =  "Twisted Taco @ Brown Hall";
      else if (key == "16") name =  "Raising Canes @ Cumberland";
      else if (key == "17") name =  "Dunkin Donuts @ Volunteer Hall";
      else if (key == "18") name =  "Bento Sushi @ Thompson-Boling";
      else if (key == "19") name =  "Blenz Smoothie Bowls @ Student Union";
      else if (key == "20") name =  "Einstein Bros Bagels @ Art & Architecture";
      else if (key == "21") name =  "Einstein Bros Bagels @ Haslam";
      else if (key == "22") name =  "Einstein Bros Bagels @ Mossman";
      else if (key == "23") name =  "Starbucks @ Hodges Library";
      else if (key == "24") name =  "Starbucks @ Student Union";
      else if (key == "25") name =  "Blenz @ TRECS";
      else if (key == "26") name =  "Dippers @ Hess Hall";
      else if (key == "27") name =  "Which Wich @ Thompson-Boling";
      else if (key == "28") name =  "Side Bar Cafe @ Law School";
      else if (key == "29") name =  "P.O.D @ Rocky Top";
      else if (key == "30") name =  "P.O.D @ Stokely";
      else if (key == "31") name =  "P.O.D @ Hodges Libary";
      else if (key == "32") name =  "P.O.D @ Hess Hall";
      else if (key == "33") name =  "P.O.D @ Humanities";
      else if (key == "34") name =  "P.O.D @ Laurel Hall";
      else if (key == "35") name =  "P.O.D @ Volunteer Hall";
      else if (key == "36") name =  "P.O.D @ Clement Hall";
      else if (key == "37") name =  "P.O.D @ Ag Campus";
      else if (key == "38") name =  "P.O.D @ Zeanah Engineering";

      // If made this far, then show.
      locations.push([key, name]); //props.data[key]["name"]]);      
    }

    setList(locations);
  }

  /**
   * TEMPORARY
   */
  useEffect(() => {
    for (const key in props.data) {
	  //here
      let name: string = "";
      if (key == "0") name = "Fresh Food Company @ Stokely";
      else if (key == "1") name = "Dining Hall @ Rocky Top";
      else if (key == "2") name = "Southern Kitchen @ Volunteer Hall";
      else if (key == "3") name = "Vol Bakery @ Rocky Top";
      else if (key == "4") name = "Arena Dining Cafe @ Thompson-Boling";
      else if (key == "5") name = "Mabel's @ McCord Hall"
      else if (key == "6") name =  "Subway @ Fred Brown Hall";
      else if (key == "7") name =  "Subway @ Student Union";
      else if (key == "8") name =  "Qdoba @ Student Union";
      else if (key == "9") name =  "Rising Roll @ Student Union";
      else if (key == "10") name =  "Steak n Shake @ Student Union";
      else if (key == "11") name =  "Chick-fil-A @ Rocky Top";
      else if (key == "12") name =  "Chick-fil-A @ Student Union";
      else if (key == "13") name =  "Panda Express @ Cumberland";
      else if (key == "14") name =  "Panda Express @ Student Union";
      else if (key == "15") name =  "Twisted Taco @ Brown Hall";
      else if (key == "16") name =  "Raising Canes @ Cumberland";
      else if (key == "17") name =  "Dunkin Donuts @ Volunteer Hall";
      else if (key == "18") name =  "Bento Sushi @ Thompson-Boling";
      else if (key == "19") name =  "Blenz Smoothie Bowls @ Student Union";
      else if (key == "20") name =  "Einstein Bros Bagels @ Art & Architecture";
      else if (key == "21") name =  "Einstein Bros Bagels @ Haslam";
      else if (key == "22") name =  "Einstein Bros Bagels @ Mossman";
      else if (key == "23") name =  "Starbucks @ Hodges Library";
      else if (key == "24") name =  "Starbucks @ Student Union";
      else if (key == "25") name =  "Blenz @ TRECS";
      else if (key == "26") name =  "Dippers @ Hess Hall";
      else if (key == "27") name =  "Which Wich @ Thompson-Boling";
      else if (key == "28") name =  "Side Bar Cafe @ Law School";
      else if (key == "29") name =  "P.O.D @ Rocky Top";
      else if (key == "30") name =  "P.O.D @ Stokely";
      else if (key == "31") name =  "P.O.D @ Hodges Libary";
      else if (key == "32") name =  "P.O.D @ Hess Hall";
      else if (key == "33") name =  "P.O.D @ Humanities";
      else if (key == "34") name =  "P.O.D @ Laurel Hall";
      else if (key == "35") name =  "P.O.D @ Volunteer Hall";
      else if (key == "36") name =  "P.O.D @ Clement Hall";
      else if (key == "37") name =  "P.O.D @ Ag Campus";
      else if (key == "38") name =  "P.O.D @ Zeanah Engineering";
      locations.push([key, name]);
    }
    setList(locations);
  }, []);

  return (
    <>
      <div className = {styles.logo}></div>
        <div className={styles.sidebar} style = {anything}>
          <div onClick = {() => {something(-720)}} className = {`${styles.ListButton} ${styles.ListButtonNoAbs}`}></div>
          <div className={styles.scrollable}>
            {!filtersVisibility ? (
              <>
                <Search locations={locations} setList={setList} setFiltersVisibility={setFiltersVisibility} />
                {list.length > 0 ? (
                  list.map(item=>(
                    <div>    <a onClick={() => { props.openPopup(item[0]) }}>ㅤㅤ{item[1]}</a> </div>
                  ))
                ) : (
                  <p className={styles.emptyMsg}>No dining locations found.</p>
                )}
              </>
            ) : (
              <>
                <div onClick={() => { setFiltersVisibility((prevState) => (prevState ? 0 : 1)) }} className = {styles.emoji}><FontAwesomeIcon icon={faArrowLeft} /></div>
                <FiltersElements update={setFilterAttr} status={filters} />
              </>
            )}
          </div>
        </div>
      <div onClick = {() => {something(0)}} className = {styles.ListButton}></div>

      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter" />
      </div>

      <TransformWrapper
        initialScale={2.5}
        centerOnInit={true} // Note: Adding initialPositionX and initialPositionY can cause issues with smaller screens if values are too large.
      >
      {({ zoomIn, zoomOut, centerView, ...rest }) => (
        <React.Fragment>
          <ZoomBtns ZoomInFn={zoomIn} ZoomOutFn={zoomOut} ZoomResetFn={() => {centerView()}} OpenHelp={props.OpenHelp} OpenStrip={props.OpenStrip} /> {/* resetTransform(), issue when using centerOnInit={true} */}
          <TransformComponent
            wrapperStyle={css}
          >
            <img style={test} src="campus_map.png" alt="test" />
            
            {testMapBtns.length > 0 ? (
                  testMapBtns.map(item=>(
                    <MapButton {...item} />
                  ))
                ) : (
                  <p className={styles.emptyMsg}>No dining locations found.</p>
                )}





            {/* loop through the data prop using .map ask jihun how to put a map button for each element Jovi doesnt know
                key value record variable how to map through */}
          </TransformComponent>
            
        </React.Fragment>
      )}
      </TransformWrapper>
    </>
  );
};

export default CampusMap;

