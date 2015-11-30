import { Component, View, bootstrap, provide } from "angular2/angular2";
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

import { HomeComponent } from "../HomeComponent/HomeComponent"

@Component({
	selector: 'hello-derwent'
})
@View({
	templateUrl: 'RootComponent/RootComponent.jade',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', redirectTo: '/home' },
	{ path: '/home', as: 'Home', component: HomeComponent }
])
class HelloDerwent {

}

bootstrap(HelloDerwent, [
	ROUTER_PROVIDERS,
	provide(ROUTER_PRIMARY_COMPONENT, { useValue: HelloDerwent }),
	provide(APP_BASE_HREF, { useValue: '/' })
]);