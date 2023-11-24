import type { InputParametersType } from './models/types';
import './style/style.scss';
declare class N8TSlider {
    private sliderContainer;
    private sliderList;
    private sliderPrevButton;
    private sliderNextButton;
    private sliderPagination;
    private sliderItems;
    private widthOfContainer;
    private qntOfSlides;
    private maximumSlides;
    private slidePosition;
    private numberOfActiveSlide;
    private isInfinityScroll;
    private interval;
    private intervalBody;
    private animationDuration;
    private posX1;
    private posX2;
    private scrollPath;
    constructor({ sliderContainer, slidesQnt, pagination, animationDuration, animationEffect, infinity, interval, }: InputParametersType);
    private initialization;
    private setCssVariables;
    private start;
    private createPagination;
    private createIntervalScroll;
    private deleteIntervalScroll;
    private createInfinityScroll;
    private nextSlideHandler;
    private prevSlideHandler;
    private paginationClickHandler;
    private touchMoveHandler;
    private touchEndHandler;
    private switchElement;
    private infinitySwitchElement;
}
export default N8TSlider;
