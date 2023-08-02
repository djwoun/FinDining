import React, { useEffect } from "react"
import styles from "./filterselements.module.scss"
import { Filters } from "../CampusMap/index"

interface Props {
  update: (filterType: string, values: Record<string, boolean>) => void; // Record<string, boolean>
  status: Filters;
}

const FiltersElements: React.FC<Props> = ({update, status}) => {
  // // OPTION: Select meal type (breakfast, lunch, or dinner) based on current time.
  // const d = new Date();
  // const hour: number = d.getHours();
  // const minutes: number = d.getMinutes();
  // let meal: string = "";
  // if (hour <= 10 && minutes < 30) meal = "breakfast";
  // else if (hour <= 16 && minutes < 30) meal = "lunch";
  // else meal = "dinner";

  const prepUpdate = (e, name) => {
    let options: HTMLOptionsCollection = e.target.options;
    let filters: Record<string, boolean> = {};

    for (let i = 0; i < options.length; i++) {
      if (options[i].value !== "noFilter")
        filters[options[i].value] = options[i].selected;
    }

    update(name, filters);
  }

  return (
    <div className={styles.container}>
      <label className={styles.filter}>
        <span>Dietary Restrictions</span>
        <select multiple={true} onChange={(e) => prepUpdate(e, "dietaryRestrictions")}>
          <option value="vegan" selected={status.dietaryRestrictions.vegan}>Vegan/Vegetarian</option>
          <option value="lactose" selected={status.dietaryRestrictions.lactose}>Lactose-Free</option>
          <option value="gluten" selected={status.dietaryRestrictions.gluten}>Gluten-Free</option>
        </select>
      </label>

      <br /><br />

      <label className={styles.filter}>
        <span>Meal</span>
        <select onChange={(e) => prepUpdate(e, "meal")}>
          <option value="noFilter">No Filter</option>
          <option value="breakfast" selected={status.meal.breakfast}>Breakfast</option>
          <option value="lunch" selected={status.meal.lunch}>Lunch</option>
          <option value="dinner" selected={status.meal.dinner}>Dinner</option>
        </select>
      </label>

      <br /><br />
      
      <label className={styles.filter}>
        <span>Location</span>
        <select multiple={true} onChange={(e) => prepUpdate(e, "location")}>
          <option value="central" selected={status.location.central}>Central</option>
          <option value="north" selected={status.location.north}>North</option>
          <option value="west" selected={status.location.west}>West</option>
          <option value="south" selected={status.location.south}>South</option>
          <option value="east" selected={status.location.east}>East</option>
        </select>
      </label>

      <br /><br />

      <label className={styles.filter}>
        <span>Hours</span>
        <select multiple={true} onChange={(e) => prepUpdate(e, "hours")}>
          <option value="openingSoon" selected={status.hours.openingSoon}>Opening Soon</option>
          <option value="currentlyOpen" selected={status.hours.currentlyOpen}>Currently Open</option>
          <option value="closingSoon" selected={status.hours.closingSoon}>Closing Soon</option>
          <option value="currentlyClosed" selected={status.hours.currentlyClosed}>Currently Closed</option> 
        </select>
      </label>
    </div>
  );
};

export default FiltersElements;