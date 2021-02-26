# geoshapes

## Getting Started

### Installation

First, clone the repository. Get the link from [Gerrit](https://gerrit.wikimedia.org/r/admin/projects/mediawiki/services/geoshapes) or use the one from [Github](https://github.com/wikimedia/mediawiki-services-geoshapes).

```shell script
git clone git@github.com:wikimedia/mediawiki-services-geoshapes
```

Install the dependencies

```shell script
cd geoshapes
npm install
```

You are now ready to get to work!

* Inspect/modify/configure `src/app.ts`
* Add routes by placing files in `src/routes/` (look at the files there for examples)

### Build the project
Since this project is using TypeScript please run the build first before starting the service. To automatically rebuild the project and restart the service when the source code changes you can run:

```shell script
npm run watch
```

Note: this does not happen when a file in the `test` folder changes.

### Running the examples

The template is a fully-working example, so you may try it right away. To
start the server hosting the REST API, simply run (inside the repo's directory)

```shell script
npm start
```

This starts an HTTP server listening on `localhost:8901`. There are several
routes you may query (with a browser, or `curl` and friends):

* `http://localhost:8901/?doc`
* `http://localhost:8901/_info/`
* `http://localhost:8901/_info/name`
* `http://localhost:8901/_info/version`
* `http://localhost:8901/_info/home`

### Tests

The template also includes a small set of executable tests. To fire them up,
simply run:

```shell script
npm test
```

If you haven't changed anything in the code (and you have a working Internet
connection), you should see all the tests passing. As testing most of the code
is an important aspect of service development, there is also a bundled tool
reporting the percentage of code covered. Start it with:

```shell script
npm run-script coverage
```

### Metrics

The service uses prometheus (directly) for exposing metrics. Here are the operational
metrics we keep track of:

* Traffic (req/sec)
    * by HTTP method
    * by HTTP status
    * by endpoint
* Errors
    * Total
    * Current error rate
    * Current error %
* Latency
    * Total
        * by HTTP method
        * by HTTP status
        * by endpoint
    * Quantiles
        * by HTTP method
        * by HTTP status
        * by endpoint
* Saturation
    * Total CPU
    * Total memory
    * Total network
    * Avg CPU per container
    * Avg memory per container
    * Top 5 pods (network/memory/traffic)
    * Garbage collection (total, duration, quantiles)

### Deployment

Service is deployed in Kubernetes and the setup is maintained using helm.

* [Here you can find](https://gerrit.wikimedia.org/r/plugins/gitiles/operations/deployment-charts/)
more information about the deployment-charts that we use to maintain the Kubernetes setup.
* [Here you can find](https://wikitech.wikimedia.org/wiki/Deployments_on_kubernetes)
more information on how to deploy a new version of the service.


### Troubleshooting

In a lot of cases when there is an issue with node it helps to recreate the
`node_modules` and `dist` directories:

```shell script
rm -r node_modules dist
npm install
npm run build
```

Enjoy!
