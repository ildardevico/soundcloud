import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'progressbar',
  template:`
  <div #progresselement class='pr-container'>
    <ngb-progressbar
      class='progressbar-element'
      [value]="value"
      >
      </ngb-progressbar>
      <span class='time-container'>
        <span>{{ currentTime }}</span>
        <span>{{ duration }}</span>
      </span>
   </div>
  `,
  styles: ['./progressbar.component.css']
})
export class ProgressbarBasic {
  @Input() value: number;
  @Input() updateValueHandler: Function;
  @Input() currentTime: string;
  @Input() duration: string;

  @ViewChild('progresselement')
    progressElement: ElementRef;

  progressDrag: boolean = false;

  @HostListener('mousedown', ['$event'])
    onMousedown(e): void {
      this.progressDrag = true;
      this.updateValue(e);
    }

  @HostListener('mouseup', ['$event'])
    onMouseup(e): void {
      if(this.progressDrag) {
        this.progressDrag = false;
        this.updateValue(e);
      }
    }

  @HostListener('mousemove', ['$event'])
    onMousemove(e): void {
      if(this.progressDrag) {
        this.updateValue(e);
      }
    }

  updateValue = (e): void => {
    const { clientWidth } = this.progressElement.nativeElement
    const { pageX, target: { offsetLeft } } = e;
    const coordinateX = pageX - offsetLeft;
    const value = (coordinateX / clientWidth) * 100;
    this.updateValueHandler(Math.round(value));
  }
}
