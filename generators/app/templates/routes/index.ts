import * as express from 'express';

let router: express.Router = express.Router();

router.get('/*', function(req: express.Request, res: express.Response, next: Function) {
	res.render('index');
});

module.exports = router;