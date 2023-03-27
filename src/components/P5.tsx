import Sketch from "react-p5";
import p5Types from "p5";

const P5: React.FC = () => {
  let offset = 0;
  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.strokeWeight(4);
    p5.stroke(255);

    for (let x = 0; x <= p5.width; x += 50) {
      p5.fill(p5.random(255), 0, p5.random(255));
      p5.ellipse(x + offset, p5.height / 2, 25, 25);
    }

    offset += 1;
  };

  const mousePressed = (p5: p5Types) => {
    console.log("a");
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default P5;
