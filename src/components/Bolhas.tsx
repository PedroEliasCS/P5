import Sketch from "react-p5";
import p5Types from "p5";

class Bubble {
  protected x: number;
  protected y: number;
  protected r: number;
  protected brightness: number;

  constructor(x: number, y: number, r: number, protected p5: p5Types) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  changeColor(bright: number) {
    this.brightness = bright;
  }

  rollover(px: number, py: number) {
    const d = this.p5.dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + this.p5.random(-2, 2);
    this.y = this.y + this.p5.random(-2, 2);
  }

  show() {
    this.p5.stroke(255);
    this.p5.strokeWeight(4);
    this.p5.fill(this.brightness, 125);
    this.p5.ellipse(this.x, this.y, this.r * 2);
  }
}

const Bolhas: React.FC = () => {
  const bubbles: Bubble[] = [];

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    for (let i = 0; i < 100; i++) {
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      const r = p5.random(20, 60);
      const b = new Bubble(x, y, r, p5);
      bubbles.push(b);
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].move();
      bubbles[i].show();
    }
  };

  const mousePressed = (p5: p5Types) => {
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].rollover(p5.mouseX, p5.mouseY)) {
        bubbles[i].changeColor(255);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default Bolhas;
