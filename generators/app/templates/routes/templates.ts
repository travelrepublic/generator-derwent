import * as express from 'express';

let router: express.Router = express.Router();

router.get('*.jade', function(req, res, next) {
	res.render(req.originalUrl.replace('/', ''));
});

module.exports = router;
