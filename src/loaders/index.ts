import { loadConfig } from './config';
import { loadExpress } from './express';
import { loadRoutes } from './routes';
import { loadDB } from './loadDB';

export async function init(app) {
    loadConfig(app);
    loadExpress(app);
    await loadDB(app);
    return loadRoutes(app, `${__dirname}/../routes`);
}
