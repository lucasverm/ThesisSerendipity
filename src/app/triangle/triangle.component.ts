import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

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
  private pointRadius: number = 7;
  public distance1: number;
  public distance2: number;
  public distance3: number;
  private triangleGrootte = 300;
  private canvasOffset = 5;
  private movingPoint: Point = { x: 250, y: 250 };
  private middlePoint: Point;

  @Output() distanceMouseUpEventEmitter = new EventEmitter<any>();

  @Output() distanceChangingEventEmitter = new EventEmitter<any>();



  fixCanvas() {
    const originalHeight = this.canvasRef.nativeElement.height;
    const originalWidth = this.canvasRef.nativeElement.width;
    let dimensions = this.getObjectFitSize(
      true,
      this.canvasRef.nativeElement.clientWidth,
      this.canvasRef.nativeElement.clientHeight,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );
    const dpr = window.devicePixelRatio || 1;
    this.canvasRef.nativeElement.width = dimensions.width * dpr;
    this.canvasRef.nativeElement.height = dimensions.height * dpr;

    this.context = this.canvasRef.nativeElement.getContext('2d');
    let ratio = Math.min(
      this.canvasRef.nativeElement.clientWidth / originalWidth,
      this.canvasRef.nativeElement.clientHeight / originalHeight
    );
    this.context?.scale(ratio * dpr, ratio * dpr); //adjust this!
  }


  ngOnInit(): void {
    this.fixCanvas();
    this.drawMainTriangle();
    this.drawHelpingLines();
    this.drawPoint(this.movingPoint);
    this.calculateDistances();
  }

  public getObjectFitSize(
    contains: boolean /* true = contain, false = cover */,
    containerWidth: number,
    containerHeight: number,
    width: number,
    height: number
  ) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;

    if (test) {
      targetWidth = containerWidth;
      targetHeight = targetWidth / doRatio;
    } else {
      targetHeight = containerHeight;
      targetWidth = targetHeight * doRatio;
    }

    return {
      width: targetWidth,
      height: targetHeight,
      x: (containerWidth - targetWidth) / 2,
      y: (containerHeight - targetHeight) / 2
    };
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
      this.refreshDrawing();
      this.calculateDistances();
      this.distanceChangingEventEmitter.emit({ value1: this.distance1, value2: this.distance2, value3: this.distance3 });
    }
  }

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    this.distanceMouseUpEventEmitter.emit({ value1: this.distance1, value2: this.distance2, value3: this.distance3 });
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
    this.distance1 = 1 - this.distanceBetweenPoints(this.trianglePoint1, projectedPoint) / factor;

    //distance2
    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint3)
    projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint2, overliggendPunt);
    this.distance2 = 1 - this.distanceBetweenPoints(this.trianglePoint2, projectedPoint) / factor;

    //distance3
    overliggendPunt = this.middleOf2Points(this.trianglePoint1, this.trianglePoint2)
    projectedPoint = this.projectPointOnLineSegment(this.movingPoint, this.trianglePoint3, overliggendPunt);
    this.distance3 = 1 - this.distanceBetweenPoints(this.trianglePoint3, projectedPoint) / factor;
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
    //this.drawTriangle(this.trianglePoint1, this.trianglePoint2, this.middlePoint);

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

  private drawMainTriangle(): void {
    let topX = (this.triangleGrootte / 2) + this.canvasOffset;
    let topY = 0 + this.canvasOffset;
    var height = this.triangleGrootte * (Math.sqrt(3) / 2);
    if (this.context) this.context.lineWidth = 1;
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
    this.middlePoint = this.snijpuntRechten(this.trianglePoint3, this.middleOf2Points(this.trianglePoint1, this.trianglePoint2), this.trianglePoint2, this.middleOf2Points(this.trianglePoint1, this.trianglePoint3))
    this.movingPoint.x = this.middlePoint.x;
    this.movingPoint.y = this.middlePoint.y;
    this.drawTriangle(this.trianglePoint1, this.trianglePoint2, this.trianglePoint3);
  }

  public drawTriangle(point1: Point, point2: Point, point3: Point) {
    var radius = 360;
    var grd1 = this.context?.createRadialGradient(point1.x, point1.y, 0, point1.x, point1.y, radius);
    grd1?.addColorStop(0, "orange");
    grd1?.addColorStop(1, "#FF000000");

    var grd2 = this.context?.createRadialGradient(point2.x, point2.y, 0, point2.x, point2.y, radius);
    grd2?.addColorStop(0, "green");
    grd2?.addColorStop(1, "#00FF0000");

    var grd3 = this.context?.createRadialGradient(point3.x, point3.y, 0, point3.x, point3.y, radius);
    grd3?.addColorStop(0, "blue");
    grd3?.addColorStop(1, "#0000FF00");
    this.context?.beginPath();
    if (this.context) this.context.fillStyle = "black";
    this.context?.moveTo(point1.x, point1.y);
    this.context?.lineTo(point2.x, point2.y);
    this.context?.lineTo(point3.x, point3.y);
    this.context?.lineTo(point1.x, point1.y);
    this.context?.stroke();
    // fill with black
    this.context?.fill();

    // set blend mode
    if (this.context) this.context.globalCompositeOperation = "lighter";

    if (this.context && grd1) this.context.fillStyle = grd1;
    this.context?.fill();

    if (this.context && grd2) this.context.fillStyle = grd2;
    this.context?.fill();

    if (this.context && grd3) this.context.fillStyle = grd3;
    this.context?.fill();
    this.context?.closePath();
  }

  snijpuntRechten(point1: Point, point2: Point, point3: Point, point4: Point) {
    // Bereken de richtingscoëfficiënten van elke lijn
    const a1 = (point2.y - point1.y) / (point2.x - point1.x);
    const a2 = (point4.y - point3.y) / (point4.x - point3.x);

    // Bereken de y-afsnijdingen van elke lijn
    const b1 = point1.y - a1 * point1.x;
    const b2 = point3.y - a2 * point3.x;

    // Bereken de x-coördinaat van het snijpunt van de lijnen
    const x = (b2 - b1) / (a1 - a2);

    // Bereken de y-coördinaat van het snijpunt van de lijnen
    const y = a1 * x + b1;

    // Retourneer het snijpunt als een array van coördinaten
    return { x, y };
  }


  private drawPoint(point: Point, color?: string) {
    if (!color) color = "red";
    if (this.context) this.context.globalCompositeOperation = "source-over";
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

  refreshDrawing() {
    this.context?.clearRect(0, 0, this.triangleGrootte + 2 * this.canvasOffset, this.triangleGrootte + 2 * this.canvasOffset);
    this.drawTriangle(this.trianglePoint1, this.trianglePoint2, this.trianglePoint3);
    this.drawPoint(this.movingPoint);
    //this.drawHelpingLines();
    //this.drawProjectedPoints();
  }

  private pointInCircle(offsetX: number, offsetY: number) {
    var distancesquared = (offsetX - this.movingPoint.x) * (offsetX - this.movingPoint.x) + (offsetY - this.movingPoint.y) * (offsetY - this.movingPoint.y);
    return distancesquared <= this.pointRadius * this.pointRadius;
  }

  private distanceBetweenPoints(point1: Point, point2: Point) {
    var xDistance = point2.x - point1.x;
    var yDistance = point2.y - point1.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
}
