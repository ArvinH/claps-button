import { newE2EPage } from '@stencil/core/testing';

describe('claps-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<claps-button></claps-button>');
    const element = await page.find('claps-button');
    expect(element).toHaveClass('hydrated');
  });
});
