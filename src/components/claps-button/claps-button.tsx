import { Component, Element, Method, State, Listen, h, Host } from '@stencil/core';

@Component({
  tag: 'claps-button',
  styleUrl: 'claps-button.scss',
  shadow: true,
})
export class MyComponent {
  @Element() el: HTMLElement;
  @State() count: number = 0;

  @Listen('click', { capture: true })

  handleClick(e) {
    e.stopPropagation();
    this.count = this.count + 1;
    this.ani();
  }

  @Method()
  async ani() {
    const root = document.createDocumentFragment();
    const centreElmRectX = 15;
    const centreElmRectY = 25;
    const generateChi = () => {
      const randomNum = 20;
      const chiArray = [];
      for (let i = 0; i < randomNum; i++) {
        const chi = document.createElement("div");
        chi.className = 'star';
        // calculate circle x-y
        const centre = [centreElmRectX, centreElmRectY];
        let radius = 10; // Math.floor(Math.random() * 100) + 10;
        const angle = 360 / randomNum * i;
        // x1   =   x0   +   r   *   cos(ao   *   3.14   /180   )
        // y1   =   y0   +   r   *   sin(ao   *   3.14   /180   )
        const initXpos = centre[0] + radius * Math.sin(angle * 3.14/180);
        const initYpos = centre[1] + radius * Math.cos(angle * 3.14/180);
        const randomDuration = Math.floor(Math.random() * 20) * 0.08;
        chi.style.left = `${initXpos}px`;
        chi.style.top = `${initYpos}px`;
        chi.style.opacity = '0';
        radius = 100;
        const randomXpos = centre[0] + radius * Math.sin(angle * 3.14/180);
        const randomYpos = centre[1] + radius * Math.cos(angle * 3.14/180);
        const chiAnimateObj = chi.animate([
            // keyframes
            { transform: `translate(${randomXpos}px, ${randomYpos}px)`, scale: 1, opacity: 0 },
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

    const rootElm  = this.el.shadowRoot.querySelector('#root');
    rootElm.appendChild(root);
  }

  render() {
    return (
      <Host>
        <div class="counter">{this.count}</div>
        <div
          id="root"
          class="claps-btn-container"
          data-count={this.count}
          onClick={this.handleClick}
          style={{
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
