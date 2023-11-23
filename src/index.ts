/* eslint-disable @typescript-eslint/no-this-alias */
import isEnd from './utils/isEnd';

import type { AnimationEffectType, InputParametersType } from './models/types';

import './style/style.scss';

class N8TSlider {
  private sliderContainer: HTMLElement;
  private sliderList: HTMLElement;
  private sliderPrevButton: HTMLElement;
  private sliderNextButton: HTMLElement;
  private sliderPagination: HTMLElement | null;
  private sliderItems: NodeListOf<HTMLElement>;
  private widthOfContainer: number;
  private qntOfSlides: number;
  private maximumSlides: number;
  private slidePosition: number = 0;
  private numberOfActiveSlide: number = 1;
  private isInfinityScroll: boolean;
  private interval: number;
  private intervalBody: number = 0;
  private animationDuration: number;
  private posX1: number = 0;
  private posX2: number = 0;
  private scrollPath: number;

  public constructor({
    sliderContainer,
    slidesQnt = 1,
    pagination = false,
    animationDuration = 0.3,
    animationEffect = 'ease',
    infinity = false,
    interval = 0,
  }: InputParametersType) {
    this.initialization(
      sliderContainer,
      slidesQnt,
      pagination,
      infinity,
      interval,
      animationDuration,
    );
    this.setCssVariables(animationDuration, animationEffect);
    this.start();
  }

  // Initializations
  private initialization(
    sliderContainer: HTMLElement | string,
    slidesQnt: number,
    pagination: boolean,
    infinity: boolean,
    interval: number,
    animationDuration: number,
  ) {
    // ELEMENTS INITIALIZATION
    this.sliderContainer =
      typeof sliderContainer === 'string'
        ? document.querySelector<HTMLElement>(sliderContainer)
        : sliderContainer;
    this.sliderList =
      this.sliderContainer.querySelector<HTMLElement>('[slider-list]');
    this.sliderItems =
      this.sliderContainer.querySelectorAll<HTMLElement>('[slider-item=""]');
    this.sliderPrevButton =
      this.sliderContainer.querySelector<HTMLElement>('[slider-prev]');
    this.sliderNextButton =
      this.sliderContainer.querySelector<HTMLElement>('[slider-next]');
    this.sliderPagination =
      pagination &&
      this.sliderContainer.querySelector<HTMLElement>('[slider-pagination]');

    // INFORMATION
    this.widthOfContainer = this.sliderContainer.offsetWidth;
    this.maximumSlides = Math.ceil(this.sliderItems.length / slidesQnt);
    this.animationDuration = animationDuration;

    // OPTIONAL INFORMATION
    this.qntOfSlides = slidesQnt;
    this.isInfinityScroll = infinity;
    this.interval = interval;

    // variable information
    this.slidePosition = this.isInfinityScroll ? -this.widthOfContainer : 0;
  }
  private setCssVariables(
    animationDuration: number,
    animationEffect: AnimationEffectType,
  ) {
    document.documentElement.style.setProperty(
      '--n8t-slider-slide-qnt',
      this.qntOfSlides.toString(),
    );
    document.documentElement.style.setProperty(
      '--n8t-slider-animation-effect',
      animationEffect,
    );
    document.documentElement.style.setProperty(
      '--n8t-slider-animation-duration',
      `${animationDuration}s`,
    );
  }
  private start() {
    const thisObj = this;

    if (this.sliderPagination) {
      this.createPagination();
      this.sliderPagination.addEventListener(
        'click',
        this.paginationClickHandler.bind(thisObj),
      );
    }
    if (this.interval > 0) {
      this.createIntervalScroll();
    }

    if (this.isInfinityScroll) {
      this.createInfinityScroll();
    }

    // Navigation
    this.sliderPrevButton.addEventListener(
      'click',
      this.prevSlideHandler.bind(thisObj),
    );
    this.sliderNextButton.addEventListener(
      'click',
      this.nextSlideHandler.bind(thisObj),
    );
    this.sliderContainer.addEventListener(
      'touchmove',
      this.touchMoveHandler.bind(thisObj),
      { passive: true },
    );
    this.sliderContainer.addEventListener(
      'touchend',
      this.touchEndHandler.bind(thisObj),
      { passive: true },
    );
  }

  // Creators
  private createPagination() {
    let index = this.isInfinityScroll ? 1 : 0;
    const maximumSlides = this.isInfinityScroll
      ? this.maximumSlides + 1
      : this.maximumSlides;

    for (index; index < maximumSlides; index++) {
      const paginationBall = document.createElement('span');
      paginationBall.setAttribute('slider-pagination-item', '');
      paginationBall.setAttribute('slider-index', index.toString());

      this.sliderPagination.append(paginationBall);
    }
  }
  private createIntervalScroll() {
    if (this.interval > 0) {
      this.intervalBody = setInterval(() => {
        this.switchElement('next');
      }, this.interval * 1000);
    } else if (this.interval < 0) {
      throw new Error(
        '[N8T SLIDER ERROR] Invalid interval. Interval must be greater than 0.',
      );
    }
  }
  private deleteIntervalScroll() {
    if (this.intervalBody !== 0) {
      clearInterval(this.intervalBody);
      this.intervalBody = 0;
    }
  }
  private createInfinityScroll() {
    if (this.isInfinityScroll) {
      // Add fake elements
      const children = this.sliderItems;

      const firstElementOfSliderList = children[0];
      const lengthOfSliderListChild = children.length - this.qntOfSlides;

      for (let index = 0; index < this.qntOfSlides; index++) {
        const elementFromStart = children[0 + index].cloneNode(true);
        const elementFromEnd =
          children[lengthOfSliderListChild + index].cloneNode(true);

        (elementFromStart as HTMLElement).setAttribute('slider-item', 'fake');
        (elementFromEnd as HTMLElement).setAttribute('slider-item', 'fake');

        this.sliderList.insertBefore(elementFromEnd, firstElementOfSliderList);
        this.sliderList.append(elementFromStart);
      }

      // translate to active slide
      this.sliderList.style.transition = 'none';
      this.sliderList.style.transform = `
        translate3d(${-this.widthOfContainer}px, 0px, 0px)
      `;

      setTimeout(() => {
        this.sliderList.style.transition = null;
      });
    }
  }

  // Handlers
  private nextSlideHandler() {
    this.switchElement('next');
    this.deleteIntervalScroll();
  }
  private prevSlideHandler() {
    this.switchElement('prev');
    this.deleteIntervalScroll();
  }
  private paginationClickHandler(event: MouseEvent) {
    if ((event.target as HTMLElement).getAttribute('slider-pagination-item') === "") {
      const indexOfElement = Number(
        (event.target as HTMLElement).getAttribute('slider-index'),
      );
      this.slidePosition = -(indexOfElement * this.widthOfContainer);

      this.sliderList.style.transform = `
          translate3d(${this.slidePosition}px, 0px, 0px)
        `;

      this.deleteIntervalScroll();
    }
  }
  private touchMoveHandler(event: TouchEvent) {
    const x = Math.floor(event.targetTouches[0].clientX);

    if (this.posX1 !== 0) {
      this.posX2 = x;
    } else {
      this.posX1 = x;
    }

    this.deleteIntervalScroll();
  }
  private touchEndHandler() {
    this.scrollPath = this.posX1 - this.posX2;
    this.posX1 = 0;

    if (this.scrollPath > 0) {
      this.switchElement('next');
    } else {
      this.switchElement('prev');
    }
  }

  // Functions
  private switchElement(type: 'next' | 'prev') {
    const localWidthOfContainer =
      type === 'next' ? -this.widthOfContainer : this.widthOfContainer;

    if (
      !isEnd(
        this.maximumSlides,
        this.slidePosition,
        localWidthOfContainer,
        type,
        this.isInfinityScroll,
      )
    ) {
      this.slidePosition = this.slidePosition + localWidthOfContainer;
      this.numberOfActiveSlide =
        type === 'next'
          ? this.numberOfActiveSlide++
          : this.numberOfActiveSlide--;

      this.sliderList.style.transform = `
        translate3d(${this.slidePosition}px, 0px, 0px)
      `;
    } else {
      this.infinitySwitchElement(type);
    }
  }
  private infinitySwitchElement(type: 'next' | 'prev') {
    const localWidthOfContainer =
      type === 'next' ? -this.widthOfContainer : this.widthOfContainer;

    if (this.isInfinityScroll) {
      this.slidePosition = this.slidePosition + localWidthOfContainer;
      this.sliderList.style.transform = `
          translate3d(${this.slidePosition}px, 0px, 0px)
      `;

      setTimeout(() => {
        this.numberOfActiveSlide = type === 'next' ? 1 : this.maximumSlides;
        this.slidePosition =
          type === 'next'
            ? -this.widthOfContainer
            : -(this.maximumSlides * this.widthOfContainer);

        // style
        this.sliderList.style.transition = 'none';
        this.sliderList.style.transform = `
          translate3d(${this.slidePosition}px, 0px, 0px)
        `;

        setTimeout(() => {
          this.sliderList.style.transition = null;
        }, 100);
      }, this.animationDuration * 1000);
    }
  }
}

export default N8TSlider;
