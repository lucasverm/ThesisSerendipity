import { Component, ElementRef, ViewChild } from '@angular/core';

interface Point {
  x: number;
  y: number;
}
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
  private offset: Point = { x: 0, y: 0 };
  private trianglePoint1: Point;
  private trianglePoint2: Point;
  private trianglePoint3: Point;
  private pointRadius: number = 5;
  public distance1: number;
  public distance2: number;
  public distance3: number;
  private triangleGrootte = 400;
  private canvasOffset = 5;
  private movingPoint: Point = {
    x: (this.triangleGrootte + 2 * this.canvasOffset) / 2,
    y: this.triangleGrootte / 2
  };
  private canvasWidth: number;
  private canvasHeight: number;


  ngOnInit(): void {
    this.canvasWidth = this.triangleGrootte + 2 * this.canvasOffset;
    this.canvasHeight = Math.sqrt(Math.pow(this.triangleGrootte, 2) - Math.pow(this.triangleGrootte / 2, 2)) + 2 * this.canvasOffset;
    this.canvasRef.nativeElement.width = this.canvasWidth
    this.canvasRef.nativeElement.height = this.canvasHeight
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.drawTriangle();
    this.drawHelpingLines();
    this.drawPoint(this.movingPoint);
    this.calculateDistances();

  }

  onMouseDown(event: MouseEvent): void {
    let clickOnPoint = this.pointInCircle(event.offsetX, event.offsetY)
    if (clickOnPoint) {
      this.isDragging = true;
      this.offset = { x: 0, y: 0 };
      this.offset.x = event.offsetX - this.movingPoint.x;
      this.offset.y = event.offsetY - this.movingPoint.y;
    }

  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.isPointInsideTriangle()) {
      let oldPointX = this.movingPoint.x;
      let oldPointY = this.movingPoint.y;
      this.movingPoint.x = event.offsetX - this.offset.x;
      this.movingPoint.y = event.offsetY - this.offset.y;
      if (!this.isPointInsideTriangle()) {
        this.movingPoint.x = oldPointX;
        this.movingPoint.y = oldPointY;
      }
      this.draw();
      this.calculateDistances();
    }
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;

  }

  public projectPointOnLineSegment(point: Point, endpoint1: Point, endpoint2: Point) {
    // bereken de richting van het lijnstuk
    const dx = endpoint2.x - endpoint1.x;
    const dy = endpoint2.y - endpoint1.y;

    // bereken de afstand van het punt tot endpoint1 langs de richting van het lijnstuk
    const t = ((point.x - endpoint1.x) * dx + (point.y - endpoint1.y) * dy) / (dx * dx + dy * dy);

    // beperk de afstand tot het lijnstuk
    const clampedT = Math.max(0, Math.min(t, 1));

    // bereken het geprojecteerde punt
    const projectedPoint = {
      x: endpoint1.x + clampedT * dx,
      y: endpoint1.y + clampedT * dy
    };

    return projectedPoint;
  }

  private calculateDistances() {
    let factor = Math.sqrt(Math.pow(this.triangleGrootte, 2) - Math.pow(this.triangleGrootte / 2, 2));
    //distance1
    let overliggendPunt = this.middleOf2Points(this.trianglePoint2, this.trianglePoint3)
    let projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint1, overliggendPunt);
    this.distance1 = 1 - this.distance(this.trianglePoint1, projectedPoint) / factor;

    //distance2
    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint3)
    projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint2, overliggendPunt);
    this.distance2 = 1 - this.distance(this.trianglePoint2, projectedPoint) / factor;

    //distance3
    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint2)
    projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint3, overliggendPunt);
    this.distance3 = 1 - this.distance(this.trianglePoint3, projectedPoint) / factor;
  }

  private drawHelpingLines() {
    this.context?.moveTo(this.trianglePoint1.x, this.trianglePoint1.y);
    let overliggendPunt = this.middleOf2Points(this.trianglePoint2, this.trianglePoint3)
    this.context?.lineTo(overliggendPunt.x, overliggendPunt.y);

    this.context?.moveTo(this.trianglePoint2.x, this.trianglePoint2.y);
    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint3)
    this.context?.lineTo(overliggendPunt.x, overliggendPunt.y);

    this.context?.moveTo(this.trianglePoint3.x, this.trianglePoint3.y);
    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint2)
    this.context?.lineTo(overliggendPunt.x, overliggendPunt.y);

    this.context?.stroke();
    this.context?.closePath();

  }

  private drawProjectedPoints() {
    let overliggendPunt = this.middleOf2Points(this.trianglePoint2, this.trianglePoint3)
    let projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint1, overliggendPunt);
    this.drawPoint(projectedPoint, "blue");

    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint3)
    projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint2, overliggendPunt);
    this.drawPoint(projectedPoint, "blue");

    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint2)
    projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint3, overliggendPunt);
    this.drawPoint(projectedPoint, "blue");

  }

  private middleOf2Points(point1: Point, point2: Point) {
    return { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 };

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

  private drawPoint(point: Point, color?: string) {
    if (!color) color = "red";
    this.context?.beginPath();
    this.context?.arc(point.x, point.y, this.pointRadius, 0, 2 * Math.PI, true);
    if (this.context) this.context.fillStyle = color;
    this.context?.fill();
  }

  private isPointInsideTriangle() {
    // Calculate the vectors representing the edges of the triangle
    const e1 = [this.trianglePoint2.x - this.trianglePoint1.x, this.trianglePoint2.y - this.trianglePoint1.y];
    const e2 = [this.trianglePoint3.x - this.trianglePoint1.x, this.trianglePoint3.y - this.trianglePoint1.y];

    // Calculate the barycentric coordinates of the point with respect to the triangle
    const det = e1[0] * e2[1] - e1[1] * e2[0];
    const det1 = (this.movingPoint.x - this.trianglePoint1.x) * e2[1] - (this.movingPoint.y - this.trianglePoint1.y) * e2[0];
    const det2 = e1[0] * (this.movingPoint.y - this.trianglePoint1.y) - e1[1] * (this.movingPoint.x - this.trianglePoint1.x);
    const u = det1 / det;
    const v = det2 / det;
    const w = 1 - u - v;

    // If the barycentric coordinates are all non-negative, the point is inside the triangle
    return u >= 0 && v >= 0 && w >= 0;
  }

  draw() {
    this.context?.clearRect(0, 0, this.triangleGrootte + 2 * this.canvasOffset, this.triangleGrootte + 2 * this.canvasOffset);
    this.drawTriangle();
    this.drawPoint(this.movingPoint);
    this.drawHelpingLines();
    this.drawProjectedPoints();
  }

  private pointInCircle(offsetX: number, offsetY: number) {
    var distancesquared = (offsetX - this.movingPoint.x) * (offsetX - this.movingPoint.x) + (offsetY - this.movingPoint.y) * (offsetY - this.movingPoint.y);
    return distancesquared <= this.pointRadius * this.pointRadius;
  }

  private distance(point1: Point, point2: Point) {
    var xDistance = point2.x - point1.x;
    var yDistance = point2.y - point1.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
}
