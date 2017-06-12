import { OnlineAssignmentPage } from './app.po';

describe('online-assignment App', () => {
  let page: OnlineAssignmentPage;

  beforeEach(() => {
    page = new OnlineAssignmentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
