import { NextPage } from "next";
import Popup from "../../components/Popup";

const Pop: NextPage = () => {
  const popupProps = {name: 'Chick fil a', isVisible: true, closePopup: () => {}};
  return (
    <>
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter" />
      </div>
      <Popup {...popupProps} />
    </>
  );
}

export default Pop;