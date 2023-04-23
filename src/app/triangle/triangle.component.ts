import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent {

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;
  private isDragging = false;
  private offset = { x: 0, y: 0 };
  private trianglePoint1: any;
  private trianglePoint2: any;
  private trianglePoint3: any;
  private pointRadius: number = 5;
  public distance1: number;
  public distance2: number;
  public distance3: number;
  private triangleGrootte = 400;
  private pointX: number = this.triangleGrootte / 2;
  private pointY: number = this.triangleGrootte / 2;
  private canvasWidth: number;
  private canvasHeight: number;
  private canvasOffset = 5;

  ngOnInit(): void {
    this.canvasWidth = this.triangleGrootte + 2 * this.canvasOffset;
    this.canvasHeight = Math.sqrt(Math.pow(this.triangleGrootte, 2) - Math.pow(this.triangleGrootte / 2, 2)) + 2 * this.canvasOffset;
    this.canvasRef.nativeElement.width = this.canvasWidth
    this.canvasRef.nativeElement.height = this.canvasHeight
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.drawTriangle();
    this.drawPoint();
    this.calculateDistances();

  }

  onMouseDown(event: MouseEvent): void {
    let clickOnPoint = this.pointInCircle(event.offsetX, event.offsetY)
    if (clickOnPoint) {
      this.isDragging = true;
      this.offset = { x: 0, y: 0 };
      this.offset.x = event.offsetX - this.pointX;
      this.offset.y = event.offsetY - this.pointY;
    }

  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.isPointInsideTriangle()) {
      let oldPointX = this.pointX;
      let oldPointY = this.pointY;
      this.pointX = event.offsetX - this.offset.x;
      this.pointY = event.offsetY - this.offset.y;
      if (!this.isPointInsideTriangle()) {
        this.pointX = oldPointX;
        this.pointY = oldPointY;
      }
      this.draw();
    }
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    this.calculateDistances();

  }

  private calculateDistances() {
    //let factor = Math.sqrt(Math.pow(this.triangleGrootte, 2) - Math.pow(this.triangleGrootte / 2, 2));
    this.distance1 = 1 - this.distance(this.trianglePoint1.x, this.trianglePoint1.y, this.pointX, this.pointY) / this.triangleGrootte;
    this.distance2 = 1 - this.distance(this.trianglePoint2.x, this.trianglePoint2.y, this.pointX, this.pointY) / this.triangleGrootte;
    this.distance3 = 1 - this.distance(this.trianglePoint3.x, this.trianglePoint3.y, this.pointX, this.pointY) / this.triangleGrootte;
  }

  private drawTriangle(): void {
    let topX = (this.triangleGrootte / 2) + this.canvasOffset;
    let topY = 0 + this.canvasOffset;
    var height = this.triangleGrootte * (Math.sqrt(3) / 2);
    if (this.context) this.context.lineWidth = 2;
    this.context?.beginPath();
    if (this.context) this.context.fillStyle = "black";
    this.trianglePoint1 = {
      x: topX,
      y: topY
    };
    this.trianglePoint2 = {
      x: topX + (this.triangleGrootte / 2),
      y: topY + height
    };
    this.trianglePoint3 = {
      x: topX - (this.triangleGrootte / 2),
      y: topY + height,
    };
    this.context?.moveTo(this.trianglePoint1.x, this.trianglePoint1.y);
    this.context?.lineTo(this.trianglePoint2.x, this.trianglePoint2.y);
    this.context?.lineTo(this.trianglePoint3.x, this.trianglePoint3.y);
    this.context?.lineTo(this.trianglePoint1.x, this.trianglePoint1.y);
    this.context?.stroke();
    this.context?.closePath();
  }

  private drawPoint() {
    this.context?.beginPath();
    this.context?.arc(this.pointX, this.pointY, this.pointRadius, 0, 2 * Math.PI, true);
    if (this.context) this.context.fillStyle = "red";
    this.context?.fill();
  }

  private isPointInsideTriangle() {
    // Calculate the vectors representing the edges of the triangle
    const e1 = [this.trianglePoint2.x - this.trianglePoint1.x, this.trianglePoint2.y - this.trianglePoint1.y];
    const e2 = [this.trianglePoint3.x - this.trianglePoint1.x, this.trianglePoint3.y - this.trianglePoint1.y];

    // Calculate the barycentric coordinates of the point with respect to the triangle
    const det = e1[0] * e2[1] - e1[1] * e2[0];
    const det1 = (this.pointX - this.trianglePoint1.x) * e2[1] - (this.pointY - this.trianglePoint1.y) * e2[0];
    const det2 = e1[0] * (this.pointY - this.trianglePoint1.y) - e1[1] * (this.pointX - this.trianglePoint1.x);
    const u = det1 / det;
    const v = det2 / det;
    const w = 1 - u - v;

    // If the barycentric coordinates are all non-negative, the point is inside the triangle
    return u >= 0 && v >= 0 && w >= 0;
  }

  draw() {
    this.context?.clearRect(0, 0, 510, 450);
    this.drawTriangle();
    this.drawPoint();
  }

  private pointInCircle(offsetX: number, offsetY: number) {
    var distancesquared = (offsetX - this.pointX) * (offsetX - this.pointX) + (offsetY - this.pointY) * (offsetY - this.pointY);
    return distancesquared <= this.pointRadius * this.pointRadius;
  }

  private distance(x1: number, y1: number, x2: number, y2: number) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
}
