import Sketch from "react-p5";
import p5Types from "p5";

const UploadMidia: React.FC = () => {
  // let unicorn: Bubble;

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    // unicorn = new Bubble(p5, 100, 100, 25);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default UploadMidia;
