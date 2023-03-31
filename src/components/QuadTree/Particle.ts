import p5Types from "p5";

export class Particle {
  constructor(
    public x: number,
    public y: number,
    public r = 2,
    public highLigth = false
  ) {}

  public move(p5: p5Types, speed = 1) {
    this.x += p5.random(speed * -1, speed);
    this.y += p5.random(speed * -1, speed);
  }

  public intersects(other: Particle, p5: p5Types) {
    const d = p5.dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  public show(p5: p5Types) {
    p5.noStroke();
    if (this.highLigth) p5.fill(255);
    else p5.fill(100);

    // console.log(this.highLigth);

    p5.ellipse(this.x, this.y, this.r * 2);
  }
}
