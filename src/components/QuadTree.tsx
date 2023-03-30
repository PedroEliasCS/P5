import Sketch from "react-p5";
import p5Types from "p5";

class Point {
  constructor(public x: number, public y: number) {}
}

class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}

  contains(point: Point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range: Rectangle) {
    return (
      range.x - range.w < this.x + this.w &&
      range.x + range.w > this.x - this.w &&
      range.y - range.h < this.y + this.h &&
      range.y + range.h > this.y - this.h
    );
  }
}

class QuadTreeClass {
  private points: Point[] = [];
  private northWest!: QuadTreeClass;
  private northHeast!: QuadTreeClass;
  private southWest!: QuadTreeClass;
  private southHeast!: QuadTreeClass;
  private divided = false;

  constructor(public boundary: Rectangle, public capacity: number) {}

  public subdivide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.w;
    const h = this.boundary.h;

    const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northHeast = new QuadTreeClass(ne, this.capacity);

    const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northWest = new QuadTreeClass(nw, this.capacity);

    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southHeast = new QuadTreeClass(se, this.capacity);

    const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southWest = new QuadTreeClass(sw, this.capacity);
  }

  public insert(point: Point) {
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.divided) {
        this.subdivide();
        this.divided = true;
      }

      this.northHeast.insert(point);
      this.northWest.insert(point);
      this.southHeast.insert(point);
      this.southWest.insert(point);
    }
  }
}

const QuadTree: React.FC = () => {
  const setup = (p5: p5Types) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    const boundary = new Rectangle(200, 200, 200, 200);
    const qt = new QuadTreeClass(boundary, 4);
    console.log(qt);

    for (let i = 0; i < 1; i++) {
      const p = new Point(p5.random(p5.width), p5.random(p5.height));
      qt.insert(p);
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default QuadTree;
