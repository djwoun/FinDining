import { NextPage } from "next";
import HelloWorld from "../../components/HelloWorld";
import MapButton from "../../components/mapButton";
import { getHelloWorld } from "../../server/actions/HelloWorld";


const Map: NextPage = () => {
  return ( 
    <>
      <MapButton />
    </>
  );
}

export default Map;