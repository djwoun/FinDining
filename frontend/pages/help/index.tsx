import { NextPage } from "next";
import Help from "../../components/help_page";

const help: NextPage = () => {
  return (
    <>
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter" />
      </div>
      <Help/>
    </>
  );
}

export default help;