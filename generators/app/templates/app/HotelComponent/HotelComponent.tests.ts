import {
it,
describe,
expect,
injectAsync,
TestComponentBuilder,
beforeEachProviders
} from 'angular2/testing';

import { HTTP_PROVIDERS } from 'angular2/http'
import { HotelComponent } from './HotelComponent';
import { Hotels } from '../Services/Hotels';

export function main() {
	// Currently there is no documentation about testing the async pipe :/ so this will stay
	// commented for the moment, if you need a good resource about testing:
	// https://www.youtube.com/watch?v=C0F2E-PRm44
}