import Sketch from "react-p5";
import p5Types from "p5";

class Bubble {
  x: number;
  y: number;
  r: number;
  brightness: number;

  constructor(protected p5: p5Types, x: number, y: number, r = 50) {
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
    return d < this.r;
  }

  move(sped = 2) {
    this.x = this.x + this.p5.random(sped * -1, sped);
    this.y = this.y + this.p5.random(sped * -1, sped);
    // this.r = this.r + this.p5.random(-2, 2);
  }

  show() {
    this.p5.stroke(255);
    this.p5.strokeWeight(4);
    this.p5.fill(this.brightness, 125);

    this.p5.ellipse(this.x, this.y, this.r * 2);
  }

  intersects(other: Bubble) {
    const d = this.p5.dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }
}

const BolhasComunicacao: React.FC = () => {
  const bubbles: Bubble[] = [];
  // let unicorn: Bubble;

  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    for (let i = 0; i < 50; i++) {
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      const r = p5.random(15, 50);
      bubbles[i] = new Bubble(p5, x, y, r);
    }

    // unicorn = new Bubble(p5, 100, 100, 25);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].move();
      bubbles[i].show();

      let overlapping = 0;

      for (let o = i; o < bubbles.length; o++) {
        if (bubbles[i] !== bubbles[o] && bubbles[i].intersects(bubbles[o]))
          overlapping = o;
      }

      if (overlapping != 0) {
        bubbles[i].changeColor(255);
        bubbles[overlapping].changeColor(255);

        bubbles[i].move(10);
        bubbles[overlapping].move(10);

        if (bubbles[i].r < 100) bubbles[i].r += 1;
        if (bubbles[overlapping].r < 100) bubbles[overlapping].r += 1;
      } else {
        bubbles[i].changeColor(0);

        if (bubbles[i].r > 10) bubbles[i].r -= 1;
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default BolhasComunicacao;
