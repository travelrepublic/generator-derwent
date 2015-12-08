import {
it,
describe,
expect,
injectAsync,
TestComponentBuilder,
beforeEachProviders
} from 'angular2/testing';
import { HTTP_PROVIDERS } from "angular2/http"
import { HomeComponent } from './HomeComponent';

export function main() {
	describe('Home Component', () => {
		it('should work', injectAsync([TestComponentBuilder], (tcb) => {
			return tcb.createAsync(HomeComponent).then((fixture) => {
				fixture.detectChanges();

				let compiled = fixture.debugElement.nativeElement;
				expect(compiled.querySelector('h3')).toHaveText('This is a new derwent.io block!');
			})
		}))
	})
}