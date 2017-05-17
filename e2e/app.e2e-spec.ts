import { AwamPage } from './app.po';

describe('awam App', () => {
  let page: AwamPage;

  beforeEach(() => {
    page = new AwamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
