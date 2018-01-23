import { MapsPage } from './app.po';

describe('maps App', function() {
  let page: MapsPage;

  beforeEach(() => {
    page = new MapsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
