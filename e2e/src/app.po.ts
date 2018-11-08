import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.driver.get('http://localhost:4200/');
  }

  getParagraphText() {
    return element(by.id('h2Title')).getText();
  }

  getPlayButton(){
    return element(by.id('btnPlay'));
  }

  getPlayAgainButton(){
    return element(by.id('btnPlayAgain'));
  }

  getEndGameButton(){
    return element(by.id('btnEndGame'));
  }

  getImgButton(img: string){
    return element(by.id(img));
  }

  getMyPlay(){
    return element(by.id('imgDetailUser')).isDisplayed();
  }
}
