import { MotionValue, PanInfo } from "framer-motion";
import React from "react";
export type CarouselProps = {
  children: React.ReactNode;
  renderArrowLeft?: (args: {
    handlePrev: () => void;
    activeIndex: number;
  }) => React.ReactNode;
  renderArrowRight?: (args: {
    handleNext: () => void;
    activeIndex: number;
  }) => React.ReactNode;
  renderDots?: (args: Omit<DotProps, "length">) => React.ReactNode;
  autoPlay: boolean;
  interval: number;
  setIndexer: React.Dispatch<React.SetStateAction<number>>;
};

export type ArrowProps = {
  onClick: () => void;
  left?: boolean;
  children: React.ReactNode;
};

export type SliderProps = {
  x: MotionValue<number>;
  i: number;
  children: React.ReactNode;
  activeIndex: number;
  onDragEnd: (e: Event, dragProps: PanInfo) => void;
};

export type DotProps = {
  length: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};
