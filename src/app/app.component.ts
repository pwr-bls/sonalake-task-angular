import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen = false;
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
  }
}
