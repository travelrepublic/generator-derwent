import { Injectable } from 'angular2/angular2';
import { Http, Headers } from 'angular2/http';

@Injectable()
export class Hotels {

	private apiUrl = 'api/hotels';

	constructor(private http: Http) {
	}

	getById(ids: number[]) {
		let body = {
			CultureCode: 'en-gb',
			EstablishmentIds: ids,
			DomainId: 1
		},
			headers = new Headers();

		headers.append('Content-Type', 'application/json');

		return this.http.post(
			`${this.apiUrl}/static/gethotelsbyid`,
			JSON.stringify(body),
			{ headers }
		);
	}
}
