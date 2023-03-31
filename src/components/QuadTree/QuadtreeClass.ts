import { Particle } from "./Particle";
import p5Types from "p5";

export class Point {
  constructor(public x: number, public y: number, public userData: Particle) {}
}

export class Circle {
  public rSquared: number;
  constructor(public x: number, public y: number, public r: number) {
    this.rSquared = this.r * this.r;
  }

  contains(point: Point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    const d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return d <= this.rSquared;
  }

  intersects(range: Rectangle) {
    const xDist = Math.abs(range.x - this.x);
    const yDist = Math.abs(range.y - this.y);

    // radius of the circle
    const r = this.r;

    const w = range.w;
    const h = range.h;

    const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    // no intersection
    if (xDist > r + w || yDist > r + h) return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true;

    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}

export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}

  contains(point: Point): boolean {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range: Rectangle): boolean {
    return (
      range.x - range.w < this.x + this.w &&
      range.x + range.w > this.x - this.w &&
      range.y - range.h < this.y + this.h &&
      range.y + range.h > this.y - this.h
    );
  }
}

export class QuadTreeClass {
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

    this.divided = true;
  }

  public insert(point: Point): boolean {
    if (!this.boundary.contains(point)) return false; // if point is not in boundary, return

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (
        this.northHeast.insert(point) ||
        this.northWest.insert(point) ||
        this.southHeast.insert(point) ||
        this.southWest.insert(point)
      )
        return true;

      // if case error return false
      return false;
    }
  }

  public query(range: Circle): Point[] {
    const found: Point[] = [];

    if (!range.intersects(this.boundary)) return found; // if range is not in boundary, return

    for (const p of this.points) {
      if (range.contains(p)) found.push(p);
    }

    if (this.divided) {
      // if divided, query all children
      found.push(...this.northHeast.query(range));
      found.push(...this.northWest.query(range));
      found.push(...this.southHeast.query(range));
      found.push(...this.southWest.query(range));
    }
    return found;
  }

  public show(p5: p5Types) {
    p5.stroke(255);
    p5.strokeWeight(1);
    p5.noFill();

    p5.rectMode(p5.CENTER);
    p5.rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );

    if (this.divided) {
      this.northHeast.show(p5);
      this.northWest.show(p5);
      this.southHeast.show(p5);
      this.southWest.show(p5);
    }

    // for (const p of this.points) {
    //   p5.strokeWeight(4);
    //   p5.point(p.x, p.y);
    // }
  }
}
