import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-triangle-slider-visualisation',
  templateUrl: './triangle-slider-visualisation.component.html',
  styleUrls: ['./triangle-slider-visualisation.component.scss']
})
export class TriangleSliderVisualisationComponent {

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;
  @Input() title: string;
  @Input() value: number;
  @Input() color: string;
  public rectWidth = 80;
  public rectHeight = 5;

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

  getValue() {
    return Math.round(this.value * 10000) / 100;
  }


  ngOnInit(): void {
    this.fixCanvas();
    this.refreshDrawing();
  }

  ngOnChanges() {
    this.refreshDrawing();
  }

  public drawOutsideRectangle(color: string) {
    this.context?.beginPath();
    this.context?.rect(1, 1, this.rectWidth, this.rectHeight);
    if (this.context) this.context.lineWidth = 0.5;
    if (this.context) this.context.strokeStyle = color;
    this.context?.stroke();
  }

  public drawInsideRectangle(color: string) {
    this.context?.beginPath();
    this.context?.rect(1, 1, this.rectWidth * this.value, this.rectHeight);
    if (this.context) this.context.fillStyle = color;
    this.context?.fill();
  }

  public refreshDrawing() {
    this.context?.clearRect(0, 0, this.rectWidth * 2, this.rectHeight * 2);
    this.drawOutsideRectangle(this.color);
    this.drawInsideRectangle(this.color);
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
}
