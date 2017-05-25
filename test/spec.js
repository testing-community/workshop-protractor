describe('This is the first example of protractor', () => {
  it('should have a title', () => {
    browser.ignoreSynchronization = true;
    browser.get('http://www.google.com');
    expect(browser.getTitle()).toEqual('Google');
  });
});
