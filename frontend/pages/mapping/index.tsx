import { NextPage } from "next";
import * as locations from "../../../data/new.json";

let map = new Map<number, JSON>

// Insert each location into the map, keyed on a number 0 - 39
for (let i = 0; i < 39; i++) {
    const json = JSON.stringify(locations[i])
    const parse = JSON.parse(json)
    map.set(i, parse)
}

export default map;