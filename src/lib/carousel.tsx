import * as React from "react";
import {
  animate,
  AnimationOptions,
  //   motion,
  //   MotionStyle,
  PanInfo,
  useMotionValue,
} from "framer-motion";

import { CarouselProps } from "./types";
import Arrow from "./arrow";
import Slider from "./slider";
import Dots from "./dots";

const wrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "300px",
  height: "100%",
  // overflowX: "hidden",
  display: "flex",
};

const transition: AnimationOptions<any> = {
  type: "spring",
  bounce: 0,
};

const Wrapper = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  (props, ref) => (
    <div ref={ref} style={wrapperStyle}>
      {props.children}
    </div>
  )
);

export const Carousel = ({
  children,
  renderArrowLeft,
  renderArrowRight,
  renderDots,
  autoPlay = true,
  interval = 2000,
  setIndexer,
}: CarouselProps) => {
  const x = useMotionValue(0);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  (function () {
    console.log("Index: ", index);
  })();
  const recomputeX = React.useCallback(
    () => -index * (wrapperRef.current?.clientWidth || 0),
    [index]
  );

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const clientWidth = wrapperRef.current?.clientWidth || 0;

    const { offset } = dragProps;

    if (offset.x > clientWidth / 4) {
      handlePrev();
    } else if (offset.x < -clientWidth / 4) {
      handleNext();
    } else {
      animate(x, recomputeX(), transition);
    }
  };

  const childrens = React.Children.toArray(children);

  const handleNext = React.useCallback(() => {
    setIndex(index + 1 === childrens.length ? index : index + 1);
    setIndexer(index + 1 === childrens.length ? index : index + 1);
  }, [childrens.length, index, setIndexer]);

  const handlePrev = () => {
    setIndex(index - 1 < 0 ? 0 : index - 1);
    setIndexer(index - 1 < 0 ? 0 : index - 1);
  };

  React.useEffect(() => {
    const controls = animate(x, recomputeX(), transition);
    return controls.stop;
  }, [recomputeX, index, x]);

  React.useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const timer = setInterval(() => handleNext(), interval);
    return clearInterval(timer);
  }, [autoPlay, handleNext, interval]);

  return (
    <Wrapper ref={wrapperRef}>
      {childrens.map((child, i) => {
        return (
          <Slider activeIndex={index} onDragEnd={handleEndDrag} x={x} i={i}>
            {child}
          </Slider>
        );
      })}
      {/* left arrow */}
      {renderArrowLeft ? (
        renderArrowLeft({ handlePrev, activeIndex: index })
      ) : (
        <Arrow left onClick={handlePrev}>
          &larr;
        </Arrow>
      )}

      {/* right arrow */}
      {renderArrowRight ? (
        renderArrowRight({ handleNext, activeIndex: index })
      ) : (
        <Arrow onClick={handleNext}>&rarr;</Arrow>
      )}

      <h1 style={{ position: "absolute", top: "20%" }}>Index: {index}</h1>

      {/* dots */}
      {renderDots ? (
        renderDots({ setActiveIndex: setIndex, activeIndex: index })
      ) : (
        <Dots
          length={childrens.length}
          setActiveIndex={setIndex}
          activeIndex={index}
        />
      )}
    </Wrapper>
  );
};
