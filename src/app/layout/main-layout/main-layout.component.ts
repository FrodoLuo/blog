import { Component, OnInit, Inject, HostListener } from "@angular/core";
import {
  trigger,
  transition,
  group,
  style,
  animate,
  query,
} from "@angular/animations";
import { ConfigService } from "../../services/config.service";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { ArticlesService } from "../../services/articles.service";
import { ScreenService } from 'src/app/services/screen.service';

const routerAnimation = trigger("routerAnimation", [
  transition("* <=> *", [
    style({
      position: "relative",
    }),
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }),
      ],
      {
        optional: true,
      }
    ),
    group([
      query(
        ":leave",
        [
          style({ opacity: 1, display: "block" }),
          animate("200ms ease", style({ opacity: 0, display: "none" })),
        ],
        {
          optional: true,
        }
      ),
      query(
        ":enter",
        [
          style({ opacity: 0, display: "block" }),
          animate("400ms 600ms ease", style({ opacity: 1 })),
        ],
        {
          optional: true,
        }
      ),
    ]),
  ]),
]);

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
  animations: [routerAnimation],
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private configService: ConfigService,
    private screenService: ScreenService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        if (typeof this.document.documentElement.scrollTo === "function") {
          setTimeout(() => {
            this.document.documentElement.scrollTo(0, 0);
          }, 400);
        }
      }
    });
  }

  public background = this.configService.indexBackground$;

  public toggle = this.router.url !== "/";

  public sideOpen = false;

  public hasHistory = false;

  public verticalScreen = this.screenService.isVerticalScreen$;

  ngOnInit() {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        this.toggle = e.url !== "/";
      }
    });
    this.screenService.onResize();
  }

}
