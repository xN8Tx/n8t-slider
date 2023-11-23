type AnimationEffectType =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end';

type InputParametersType = {
  sliderContainer: HTMLElement | string;
  slidesQnt?: number;
  pagination?: boolean;
  infinity?: boolean;
  interval?: number; // seconds
  animationDuration?: number; // seconds
  animationEffect?: AnimationEffectType;
};

export type { InputParametersType, AnimationEffectType };
