import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {

  @Input('color')
  public color = 'black';

  @Input('expand')
  public expand = true;

  public menuConfigs: IMenuConfig = [
    {
      path: '/blog',
      name: 'Home',
      icon: 'home',
    },
    {
      path: '/album',
      name: 'Album',
      icon: 'photo_album',
    },
  ];
}

type IMenuConfig = Array<{
  path: string;
  icon: string;
  name: string;
}>;
