// https://netbasal.com/building-a-simple-carousel-component-with-angular-3a94092b7080
// https://medium.com/@asm/animated-slide-panel-with-angular-e985ad646f9

/* ==== Usage====

  <carousel #carousel="carousel" [showControls]="false">
    <ng-container *ngFor="let item of items;">
      <ng-container *carouselItem>
        <div class="item">{{item.title}}</div>
      </ng-container>
    </ng-container>
  </carousel>

  <div>
    <a (click)="carousel.next()">Next</a>
    <a (click)="carousel.prev()">Prev</a>
  </div>

*/


import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemDirective } from '../../directives/carousel-item/carousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
}

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  template: `
    <section class="carousel-wrapper" [ngStyle]="carouselWrapperStyle">
      <ul class="carousel-inner" #carousel [ngStyle]="ulStyle">
        <li *ngFor="let item of items;" class="carousel-item">
          <ng-container [ngTemplateOutlet]="item.tpl"></ng-container>
        </li>
      </ul>
    </section>
    <div *ngIf="showControls" style="margin-top: 1em">
      <button (click)="next()" class="btn btn-default">Next</button>
      <button (click)="prev()" class="btn btn-default">Prev</button>
    </div>
  `,
  styles: [`
    .carousel-wrapper {
      display: block;
      overflow: hidden;
      height: 100%;
      opacity: 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      height: 100%;
    }

    .carousel-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: scroll;
    }
  `]
})

export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;

  private player : AnimationPlayer;
  private itemWidth : number;
  private currentSlide = 0;
  public carouselWrapperStyle = {}
  public ulStyle = {}
  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}%)` }))
    ]);
  }

  constructor( private builder : AnimationBuilder ) { }

  next() {
    if( this.currentSlide + 1 === this.items.length ) return;

    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    this._move();
  }

  prev() {
    if( this.currentSlide === 0 ) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    this._move();
  }

  slideTo(index) {
    if( index < 0 || index > this.items.length ) return;

    this.currentSlide = index
    this._move();
  }

  _move() {
    const offset = this.currentSlide * (100 / this.items.length);
    const myAnimation : AnimationFactory = this.buildAnimation(offset);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      // this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.ulStyle = { width: `${100 * this.items.length}%` }
      this.carouselWrapperStyle = { opacity: 1 };
    }, 200);
  }
}
