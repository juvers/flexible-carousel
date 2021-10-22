import React from "react";
import { motion, MotionStyle } from "framer-motion";
import { SliderProps } from "./types";

const pageStyle: MotionStyle = {
  width: "100%",
  height: "100vh",
  display: "inline-block",
  flex: "none",
};

const Slider = ({ x, i, onDragEnd, children, activeIndex }: SliderProps) => (
  <motion.div
    style={{
      ...pageStyle,
      height: i === activeIndex ? "150%" : "100%",
      x,
      left: `${i * 100}%`,
      right: `${i * 100}%`,
    }}
    drag="x"
    dragElastic={0.3}
    onDragEnd={onDragEnd}
  >
    {children}
  </motion.div>
);

export default Slider;