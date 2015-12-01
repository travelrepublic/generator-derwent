import { Component, View, NgFor } from 'angular2/angular2';
import { Hotels } from '../Services/Hotels';

@Component({
	selector: 'hotel-component',
	providers: [Hotels]
})
@View({
	templateUrl: 'HotelComponent/HotelComponent.jade',
	directives: [NgFor]
})
export class HotelComponent {
		hotels: any;

		constructor (
			private Hotels: Hotels
		) {
			this.hotels =
				this.Hotels.getById([3050580, 3050600])
					.map((res: any) => res.json())
					.map((res: any) => res.Establishments)
		}
}