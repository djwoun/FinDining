import { NextPage } from "next";
import { useEffect, useState } from "react";
import CampusMap from "../../components/CampusMap";
import Help from "../../components/help_page";
import Strip from "../../components/strip_page";
import MapButton from "../../components/mapButton";
import Popup from "../../components/Popup";
import * as locations from "../../../data/new.json";
import { freemem } from "os";

let loc_map: Record<number, DataProps> = {};

interface MenuProp {
  category: string;
  name: string;
  price: string;
}

export interface DataProps {
  name: string;
  location: string;
  address: string;
  ms: Array<string>;
  hours: Record<string, Array<string> | string>;
  menu: Record<number, MenuProp>
  vegandveg: boolean;
  lac_free: boolean;
  glu_free: boolean;
  coordinates: Array<number>;
  image: string;
  cardinal: string;
}

// Insert each location into the map, keyed on a number 0 - 39
for (let i = 0; i < 39; i++) {
    const string = JSON.stringify(locations[i])
    const json = JSON.parse(string)

    let jsonMenu: Array<JSON>;
    let menuList: Array<MenuProp> = [];
    let hourList: Record<string, Array<string>> = {}

    // Convert Menu.
    jsonMenu = (json["Menu"] === null) ? [] : json["Menu"];
    for (let j = 0; j < jsonMenu.length; j++) {
      var menuEntry: MenuProp = {
        category: json["Menu"][j].category,
        name: json["Menu"][j].name,
        price: json["Menu"][j].price
      }
      menuList.push(menuEntry);
    }
    
    // Convert Hours.
    hourList["Monday"] = json["Monday"];
    hourList["Tuesday"] = json["Tuesday"];
    hourList["Wednesday"] = json["Wednesday"];
    hourList["Thursday"] = json["Thursday"];
    hourList["Friday"] = json["Friday"];
    hourList["Saturday"] = json["Saturday"];
    hourList["Sunday"] = json["Sunday"];

    var value: DataProps = {
      name: json["name"],
      location: json["location"],
      address: json["address"],
      ms: json["MS"],
      hours: hourList,
      menu: menuList,
      vegandveg: json["Vegan & Vegetarian"],
      lac_free: json["Lactose-Free"],
      glu_free: json["Gluten-Free"],
      coordinates: json["coordinate"],
      image: json["image"],
      cardinal: json["cardinal"]
    }
    loc_map[i] = value;
}

interface PopupProps {
  locationId: number;
  isVisible: boolean;
  closePopup: () => void;
  data: Record<number, DataProps>;
}

interface CampusMapProps {
  openPopup: (locationId: number) => void;
  OpenHelp: () => void;
  data: Record<number, DataProps>;
  OpenStrip: () => void;
}

interface HelpProps{
  isVisible: boolean;
  CloseHelp: () => void;
}

interface StripProps { 
  isVisible: boolean;
  CloseStrip: () => void;
} 

const map: NextPage = () => {

  useEffect(() => {
    console.log(loc_map);
  }, [])

  const test = { position: 'absolute', top: 0, left: 0 }
  useEffect(() => {
    console.log(loc_map);
  }, []);
  
  const showPopup = (locationId: number) => {
    const data: PopupProps = { locationId: locationId, isVisible: true, closePopup: hidePopup, data: loc_map};
    setPopupProps(data);
  };

  const hidePopup = () => {
    const data: PopupProps = popupProps;
    data.isVisible = false;
    setPopupProps(data);
  }

  const showHelp = () => {
    setHelp(true);
  }
  
  const hideHelp = () => {
    setHelp(false);
  }

  const showStrip = () => {
    setStrip(true);
  }
  
  const hideStrip = () => {
    setStrip(false);
  }


  const [helpisVisible, setHelp] = useState(false);
  const [stripisVisible, setStrip] = useState(false);

  const [popupProps, setPopupProps] = useState({locationId: 0, isVisible: false, closePopup: hidePopup, data: loc_map});
  const campusMapProps: CampusMapProps = {
    openPopup: showPopup,
    OpenHelp: showHelp,
    data: loc_map,
    OpenStrip: showStrip
  }
  
  const helpProps: HelpProps = {
    isVisible: helpisVisible,
    CloseHelp: hideHelp,
  }

  const stripProps: StripProps = {
    isVisible: stripisVisible,
    CloseStrip: hideStrip,
  }

  return (
    <>
      <CampusMap {...campusMapProps} />
      <Popup {...popupProps} />
      <Help {...helpProps}/> 
      <Strip {...stripProps}/>
    </>
  );
}

export default map;