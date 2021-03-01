const postgres = require('pg-promise')();

export async function loadDB(app) {
    const conf = app.conf.postgres;
    if (!conf.database || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(conf.database)) {
        app.logger.log('error/db', '"geoshapes" parameters must specify "database"');
        throw new Error('"geoshapes" parameters must specify "database"');
    }
    console.log(conf);
    app.conf.db = await postgres({
        host: conf.host,
        port: conf.port,
        database: conf.database,
        user: conf.user,
        password: conf.password
    });
}
