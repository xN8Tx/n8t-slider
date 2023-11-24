
---
<h1 align="center">N8T Slider</h1>
<p align="center">Simple and lightweight carousel slider for HTML</p>

---

## Installation

```sh
npm install n8t-slider
```

## Usage

### HTML


>**⚠️ Add [`n8t-slider-style.min.css`](https://?github.com/xN8Tx/n8t-slider/blob/main/dist/style/n8t-slider-style.min.css) to HTML for correct work ⚠️**



```html
<div slider-container>
  <div slider-list>
    <div slider-item>...</div>
    // Another items
  </div>
  <button slider-prev>...</button>
  <button slider-next>...</button>
  <div slider-pagination>// Nothing here</div>
</div>
```

### JS

```JS
import N8TSlider from "n8t-slider";

const sliderElement = document.querySelector("[slider-container]");

const slider = new N8TSlider({
  sliderContainer: sliderElement,
});
```

## Documentation

### JS

<!-- prettier-ignore -->
| **Property**      | **Description**                                                                                                             | **Type**                                                                               |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| sliderContainer   | Element of container(main) element of slider. Required                                                                      | HTMLElement                                                                            |
| slidesQnt         | Number of slides shown. Optional, default one                                                                               | Number                                                                                 |
| animationDuration | The amount of time the animation will play. By seconds. Optional, default 0.3                                               | Number                                                                                 |
| animationEffect   | The effect the animation will play with. Optional, default 0.3                                                              | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' |
| pagination        | Is pagination(navigation) shown. Optional, default false                                                                    | boolean                                                                                |
| infinity          | Is slider scroll is infinity. Optional, default false                                                                       | boolean                                                                                |
| interval          | The value at which time interval the slider will change its contents. By seconds. Optional, default 0 | Number                                                                                 |

### HTML

| **Attribute**     | **Description**                                  |
| ----------------- | ------------------------------------------------ |
| slider-container  | Container(main) element of slider                |
| slider-list       | Wrapper to slider-items.                         |
| slider-item       | Slider item.                                     |
| slider-prev       | Previous slide button.                           |
| slider-next       | Next slide button.                               |
| slider-pagination | Pagination wrapper. Automatically made children. |
