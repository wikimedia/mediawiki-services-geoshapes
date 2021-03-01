import { Application } from 'express';
const BBPromise = require('bluebird');
const fs = BBPromise.promisifyAll(require('fs'));
const yaml = require('js-yaml');
const info = require('../../package.json');

export function initGeoshapesConfig(app : Application) {
    // Load queries from yaml file
    app.conf.queries = yaml.load(fs.readFileSync(`${__dirname}/../../queries.yaml`, 'utf8'));

    const userAgent = `${info.name}/${info.version} (https://mediawiki.org/Maps)`;

    if (!app.conf.wikidataQueryService) {
        throw new Error('"geoshapes" parameters must specify "wikidataQueryService"');
    }

    app.conf.sparqlHeaders = {
        'User-Agent': userAgent,
        Accept: 'application/sparql-results+json'
    };

    app.conf.mwapiHeaders = {
        'User-Agent': userAgent,
        Host: 'en.wikipedia.org'
    };

    app.conf.maxidcount = app.conf.maxidcount !== undefined ? parseInt(app.conf.maxidcount, 10) : 500;
    if (app.conf.maxidcount <= 0) {
        throw new Error('"geoshapes.maxidcount" must be a positive integer');
    }
    // Which query to use by default
    const defaultQ = app.conf.queries.simplifyarea;

    if (app.conf.allowUserQueries) {
        app.conf.queries.default = defaultQ;
    } else {
        // Delete all queries except the default one, and remove parameter
        // names to prevent user parameters
        app.conf.queries = { default: defaultQ };
        if (defaultQ.params) {
            defaultQ.params.forEach((param) => {
                delete param.name;
            });
        }
    }
}
