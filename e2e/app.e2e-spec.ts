import { AngularExpressPage } from './app.po';

describe('angular-express App', () => {
  let page: AngularExpressPage;

  beforeEach(() => {
    page = new AngularExpressPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
