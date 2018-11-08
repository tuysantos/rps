import { AppPage } from './app.po';

describe('RPS App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Rock Paper Scissors Game');
  });

  it('should play in basic mode', ()=>{
    page.navigateTo();
    let playAgainBtn = page.getPlayButton();
    playAgainBtn.click();
    let rockBtn = page.getImgButton('imgRock');
    rockBtn.click();

    let imgView = page.getMyPlay().then(res => {
      return res;
    });

    let endGameBtn = page.getEndGameButton();
    endGameBtn.click(); 
    
    expect(imgView).toEqual(true);
  });
});
