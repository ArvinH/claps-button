import { Component, Element, Event, EventEmitter, Prop, State, Listen, h, Host } from '@stencil/core';

@Component({
  tag: 'claps-button',
  styleUrl: 'claps-button.scss',
  shadow: true,
})
export class MyComponent {
  @Element() el: HTMLElement;
  @State() count: number = 0;
  @Prop() color: string;
  @Prop() size: string;
  @Prop() preserve: boolean;
  @Event() clapDone: EventEmitter;

  @Listen('click', { capture: true })

  handleClick(e) {
    e.stopPropagation();
    this.count = this.count + 1;
    this.clapDone.emit({ count: this.count });
    if (this.preserve) {
      localStorage.setItem(`claps-wc-${location.pathname}`, `${this.count}`);
    }
    window.requestAnimationFrame(this.runAnimation.bind(this));
  }

  componentWillLoad() {
    if (!this.preserve) return;
    this.count = +localStorage.getItem(`claps-wc-${location.pathname}`);
  }

  runAnimation() {
    const root = document.createDocumentFragment();
    const rootElm  = this.el.shadowRoot.querySelector('.claps-btn-container');
    const rootBoundingBox = rootElm.getBoundingClientRect();
    const centreElmRectX = Math.floor(rootBoundingBox.width / 2) - 10;
    const centreElmRectY = Math.floor(rootBoundingBox.height / 2);
    const generateChi = () => {
      const numberOfChi = 20;
      const chiArray = [];
      for (let i = 0; i < numberOfChi; i++) {
        const chi = document.createElement("div");
        chi.className = 'star';
        // calculate circle x-y
        let radius = 10; // Math.floor(Math.random() * 100) + 10;
        const angle = 360 / numberOfChi * i;
        // x1   =   x0   +   r   *   cos(angle   *   3.14   /180   )
        // y1   =   y0   +   r   *   sin(angle   *   3.14   /180   )
        const initXpos = centreElmRectX + radius * Math.sin(angle * 3.14/180);
        const initYpos = centreElmRectY + radius * Math.cos(angle * 3.14/180);
        const randomDuration = Math.floor(Math.random() * 20) * 0.08;
        chi.style.left = `${initXpos}px`;
        chi.style.top = `${initYpos}px`;
        chi.style.opacity = '0';
        radius = 100;
        const afterXpos = centreElmRectX + radius * Math.sin(angle * 3.14/180);
        const afterYpos = centreElmRectY + radius * Math.cos(angle * 3.14/180);
        const chiAnimateObj = chi.animate([
            // keyframes
            { transform: `translate(${afterXpos}px, ${afterYpos}px)`, scale: 1, opacity: 0 },
            { opacity: 1 },
            { transform: 'translate(0, 0)', scale: 0.3, opacity: 0.3 }
          ], {
            // timing options
            duration: 800,
            delay: randomDuration * 500,
          }
        );
        chiAnimateObj.onfinish = function() {
          chi.remove();
        };
        chiArray.push(chi);
      }
      return chiArray;
    }
    const chiArray = generateChi();

    chiArray.forEach(chi => {
      root.appendChild(chi);
    })

    rootElm.appendChild(root);
  }

  render() {
    return (
      <Host>
        <div class="counter" style={{
          color: this.color,
          borderColor: this.color,
          width: this.size || '3rem',
          height: this.size || '3rem',
        }}>{this.count}</div>
        <div
          class="claps-btn-container"
          data-count={this.count}
          onClick={this.handleClick}
          style={{
            width: this.size || '3rem',
            height: this.size || '3rem',
            fontSize: this.size || '3rem',
            textShadow: `1px 0px ${(
              this.count < 20 ? this.count : 20
            ).toFixed(2)}px red`,
            filter: `grayscale(${(
              1 - this.count / 20
            ).toFixed(2)})`
          }}
        >
          👏
        </div>
      </Host>
    );
  }
}
