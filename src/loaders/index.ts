import { loadConfig } from './config';
import { loadExpress } from './express';
import { loadRoutes } from './routes';

export async function init(app) {
    loadConfig(app);
    loadExpress(app);
    return loadRoutes(app, `${__dirname}/../routes`);
}
