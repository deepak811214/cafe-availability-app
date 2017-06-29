import { TableAvailabilityPage } from './app.po';

describe('table-availability App', () => {
  let page: TableAvailabilityPage;

  beforeEach(() => {
    page = new TableAvailabilityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
