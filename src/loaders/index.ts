import { loadConfig } from './config';
import { loadExpress } from './express';
import { loadRoutes } from './routes';
import { loadDB } from './loadDB';

export async function init(app) {
    loadConfig(app);
    loadExpress(app);
    // FIXME: handle db loading during tests (T276341)
    if (!process.env.TESTING) {
        await loadDB(app);
    }
    return loadRoutes(app, `${__dirname}/../routes`);
}
