import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('color')
  public color: string = 'black';

  public menuConfigs: IMenuConfig = [
    {
      path: "/",
      name: "Home",
      icon: "home",
    },
    {
      path: "/blog",
      name: "Blog",
      icon: "collections_bookmark",
    },
    {
      path: "/album",
      name: "Album",
      icon: "photo_album",
    },
  ];
}

type IMenuConfig = Array<{
  path: string;
  icon: string;
  name: string;
}>;
