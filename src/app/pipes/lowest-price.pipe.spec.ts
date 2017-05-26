import { LowestPricePipe } from './lowest-price.pipe';

describe('LowestPricePipe', () => {
  it('create an instance', () => {
    const pipe = new LowestPricePipe();
    expect(pipe).toBeTruthy();
  });
});
