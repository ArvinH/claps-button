/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface ClapsButton {
    'color': string;
    'preserve': boolean;
    'size': string;
  }
}

declare global {


  interface HTMLClapsButtonElement extends Components.ClapsButton, HTMLStencilElement {}
  var HTMLClapsButtonElement: {
    prototype: HTMLClapsButtonElement;
    new (): HTMLClapsButtonElement;
  };
  interface HTMLElementTagNameMap {
    'claps-button': HTMLClapsButtonElement;
  }
}

declare namespace LocalJSX {
  interface ClapsButton {
    'color'?: string;
    'preserve'?: boolean;
    'size'?: string;
  }

  interface IntrinsicElements {
    'claps-button': ClapsButton;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'claps-button': LocalJSX.ClapsButton & JSXBase.HTMLAttributes<HTMLClapsButtonElement>;
    }
  }
}


