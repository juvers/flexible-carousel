import * as React from "react";
import Carousel from "./lib";

const colors = ["#f90", "#ef0", "#e0f", "#f00", "#3ec"];

const App = () => (
  <Carousel
    interval={2000}
    // onChange={() => console.log("Data changed")}
    autoPlay={false}
  >
    {colors.map((item, i) => (
      <div
        key={i}
        style={{
          width: "100%",
          height: i === 1 ? "40vh" : "60vh",
          backgroundColor: colors[i],
        }}
      ></div>
    ))}
  </Carousel>
);
export default App;
