# About Gatsby Minimal Sample

This repository holds the sample source code for a Gatsby implementation of a simple site that uses digital assets managed in Oracle Content Management.

Please see the complete [tutorial](https://www.oracle.com/pls/topic/lookup?ctx=cloud&id=oce-gatsby-minimal-sample) and the live [demo](https://headless.mycontentdemo.com/samples/oce-gatsby-minimal-sample).

## Installation

Run the following to install the dependencies needed by this sample:

```shell
npm install
```

## Running the project

> **NOTE:** If you need to use a proxy to reach the internet then define a `PROXY_URL` environment variable through the shell or in the .env file:

```shell
export PROXY_URL=<scheme>://<proxyhost>:<port>
```

### Development

During development the dev script should be used:

```shell
npm run develop
```

### Production

The following command will produce a complete static build in the /public directory of your project.

```shell
npm run build
```

This can then be deployed on a web server. If you want to test it in place you can run:

```shell
npm run serve
```

and then open [http://localhost:9000](http://localhost:9000)

## Images

Sample images may be downloaded from [https://www.oracle.com/middleware/technologies/content-experience-downloads.html](https://www.oracle.com/middleware/technologies/content-experience-downloads.html) under a separate license.  These images are provided for reference purposes only and may not be hosted or redistributed by you.

## Contributing

This project welcomes contributions from the community. Before submitting a pull
request, please [review our contribution guide](./CONTRIBUTING.md).

## Security

Please consult the [security guide](./SECURITY.md) for our responsible security
vulnerability disclosure process.

## License

Copyright (c) 2021, 2022, Oracle and/or its affiliates.

Released under the Universal Permissive License v1.0 as shown at
<https://oss.oracle.com/licenses/upl/>.
