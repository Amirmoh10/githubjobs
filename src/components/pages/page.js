import React, { useContext } from "react";
import DispatchContext from "../../dispatchContext";
import { ACTION } from "../../App";
import "../../App.css";
import { Button } from "@material-ui/core";

const buttOneStyle = {
  classes: ["clickedStyle"],
};

const buttTwoStyle = {
  classes: ["normalStyle"],
};

const buttThreeStyle = {
  classes: ["normalStyle"],
};

function Page() {
  const pageDispatch = useContext(DispatchContext);
  const onClick = (event) => {
    switch (event.target.value) {
      case "1":
        buttOneStyle.classes[0] = "clickedStyle";
        buttTwoStyle.classes[0] = "normalStyle";
        buttThreeStyle.classes[0] = "normalStyle";
        break;
      case "2":
        buttOneStyle.classes[0] = "normalStyle";
        buttTwoStyle.classes[0] = "clickedStyle";
        buttThreeStyle.classes[0] = "normalStyle";
        break;
      case "3":
         buttOneStyle.classes[0] = "normalStyle";
         buttTwoStyle.classes[0] = "normalStyle";
         buttThreeStyle.classes[0] = "clickedStyle";
        break;
        default:
    }

    pageDispatch({
      type: ACTION.CLICK_PAGE,
      value: Number(event.target.value),
    });
  };

  return (
    <div className="pageButtons">
      <button
        className={buttOneStyle.classes.join("")}
        onClick={onClick}
        value="1"
      >
        1
      </button>
      <button
        className={buttTwoStyle.classes.join("")}
        onClick={onClick}
        value="2"
      >
        2
      </button>
      <button
        className={buttThreeStyle.classes.join("")}
        onClick={onClick}
        value="3"
      >
        3
      </button>
    </div>
  );
}

export default Page;

// function PageOneButton() {
//   let pageOneButton = null;
//   pageOneButton = (
//     <div >
//       <button  value="1">
//         1
//       </button>
//     </div>
//   );
//   return pageOneButton;
// }

// function PageTwoButton() {
//   let pageTwoButton = null;
//   pageTwoButton = (
//     <div>
//       <button style={normalStyle} value="1">
//         2
//       </button>
//     </div>
//   );
//   return pageTwoButton;
// }
