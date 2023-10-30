import { useState } from "react";

const GradientBackground = () => {
  const [gradient, setGradient] = useState(["red", "blue", "yellow"]);
  const style = {
    background: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 100%),
            radial-gradient(yellow, yellow)`,
    // background: `linear-gradient(45deg, ${gradient.join(",")})`,
    // background: "radial-gradient(#e66465, #9198e5, blue, red)",
    // background: `linear-gradient(45deg, #e66465, #9198e5)`,
    // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
    backgroundSize: "200% 200%",
    height: 1000,
  };
  const getRandomKey = () => {
    return Math.random(100);
}
  const changeGradient = (colors) => {
    setGradient(colors)
  }
  return (
    <div
    key={getRandomKey()}
    style={style}
      className="bg-animation"
    >
      {/* <button onClick={() => setGradient(["orange", "purple", "black"])}>Click me</button> */}
    </div>
  );
};

export default GradientBackground;
