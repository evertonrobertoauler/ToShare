import { MaterialblogprodPage } from './app.po';

describe('materialblogprod App', () => {
  let page: MaterialblogprodPage;

  beforeEach(() => {
    page = new MaterialblogprodPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
     expect(page.getParagraphText()).toEqual(<any>'app works!'); 
  });
});
