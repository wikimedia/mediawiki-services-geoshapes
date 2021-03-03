import * as routing from '../lib/routing';
const BBPromise = require('bluebird');
const GeoShapes = require('../lib/geoshapes');
const router = routing.router();

let app;

/**
 * Web server (express) route handler to get geoshapes
 *
 * @param {string} type
 * @param {Object} req request object
 * @param {Object} req.query request object's query
 * @param {Object} res response object
 * @param {Function} next will be called if request is not handled
 */
function handler(type, req, res, next) {
    const start = Date.now();
    let geoshape;

    return BBPromise.try(() => {
        geoshape = new GeoShapes(type, req.query, app);
        const lowerHeaders = Object.keys(req.headers).reduce((newHeaders, key) => {
            newHeaders[key.toLowerCase()] = req.headers[key];
            return newHeaders;
        }, {});
        return geoshape.execute(lowerHeaders['x-client-ip']);
    }).then((geodata) => {
        res.type('application/vnd.geo+json').json(geodata);
        app.metrics.endTiming(geoshape.metric, start);
    }).catch((err) => {
        // equivalent to reportRequestError
        app.logger.log(err.metrics === 'string' ? 'info' : 'error', err);
        app.metrics.increment((err.metrics === 'string' && err.metrics) || 'err.unknown');
        return new routing.HTTPError(err);
    }).catch(next);
}

function checkValidStructure() {
    // Check the valid structure of the table - use invalid id
    return BBPromise.all([
        new GeoShapes('geoshape', { ids: 'Q123456789' }, app).execute(),
        new GeoShapes('geoline', { ids: 'Q123456789' }, app).execute()
    ]).then(() => app);
}

router.get('/shape', (req, res, next) => handler('geoshape', req, res, next)); // obsolete
router.get('/geoshape', (req, res, next) => handler('geoshape', req, res, next));
router.get('/geoline', (req, res, next) => handler('geoline', req, res, next));

module.exports = async (appObj) => {
    app = appObj;
    await checkValidStructure();
    return {
        path: '/',
        skip_domain: true,
        router
    };
};

export {};
