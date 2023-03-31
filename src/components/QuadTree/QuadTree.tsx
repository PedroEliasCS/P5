import Sketch from "react-p5";
import p5Types from "p5";
import { Circle, Point, QuadTreeClass, Rectangle } from "./QuadtreeClass";
import { Particle } from "./Particle";

const QuadTree: React.FC = () => {
  // let tree: QuadTreeClass;
  const particles: Particle[] = [];

  const setup = (p5: p5Types) => {
    p5.createCanvas(800, 800);

    for (let i = 0; i < 1000; i++) {
      particles[i] = new Particle(p5.random(p5.width), p5.random(p5.height));
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    const boundary = new Rectangle(
      p5.width / 2,
      p5.height / 2,
      p5.width / 2,
      p5.height / 2
    );
    const qTree = new QuadTreeClass(boundary, 4);

    for (const p of particles) {
      const point = new Point(p.x, p.y, p);
      qTree.insert(point);

      p.move(p5);
      p.show(p5);
      p.highLigth = false;
    }

    qTree.show(p5);

    for (const p of particles) {
      const range = new Circle(p.x, p.y, p.r * 2);
      const points = qTree.query(range);

      for (const point of points) {
        const other = point.userData;
        if (p !== other && p.intersects(other, p5)) {
          p.highLigth = true;
        }
      }
    }
  };

  // const mousePressed = (p5: p5Types) => {
  //   const p = new Point(p5.mouseX, p5.mouseY);
  //   tree.insert(p);
  // };

  return <Sketch setup={setup} draw={draw} />;
};

export default QuadTree;
