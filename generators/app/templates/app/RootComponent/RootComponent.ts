import { Component, View, bootstrap, provide } from "angular2/angular2";
import { HTTP_PROVIDERS } from "angular2/http"
import {
	ROUTER_DIRECTIVES,
	ROUTER_PROVIDERS,
	APP_BASE_HREF,
	ROUTER_PRIMARY_COMPONENT,
	LocationStrategy,
	HashLocationStrategy,
	Router,
	RouteConfig,
	RouteParams
} from "angular2/router";

import { HomeComponent } from "../HomeComponent/HomeComponent";
import { HotelComponent } from "../HotelComponent/HotelComponent";

@Component({
	selector: 'hello-derwent'
})
@View({
	templateUrl: 'RootComponent/RootComponent.jade',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', redirectTo: '/home' },
	{ path: '/home', as: 'Home', component: HomeComponent },
	{ path: '/hotel', as: 'Hotel', component: HotelComponent }
])
class HelloDerwent { }

bootstrap(HelloDerwent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	provide(ROUTER_PRIMARY_COMPONENT, { useValue: HelloDerwent }),
	provide(APP_BASE_HREF, { useValue: '/' })
]);