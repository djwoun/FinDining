import { NextPage } from "next";
import FiltersElements from "../../components/FiltersElements";

const Filters: NextPage = () => {
  return (
    <>
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter" />
      </div>
      <FiltersElements />
    </>
  );
}

export default Filters;