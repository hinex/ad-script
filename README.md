# Ad script
Examples: `/example/index.html`

## Installation
Before run application need to install the latest version of Node.js. 

#### Configuration
First need to change the configuration files for server. Configuration files already into `./config` directory. Configuration files are available for each `NODE_ENV` separately. They also extend from the `default.js` file.
```
config
├── default.js
├── development.js
├── production.js
└── staging.js
```

Documentation: https://github.com/lorenwest/node-config/wiki

#### ENV

| Key                  | Description                 | Default                                          |
| -------------------- |:---------------------------:| ------------------------------------------------:|
| NODE_ENV             | Env for run application     | development                                      |
| API_PORT             | Port for application        | 5000                                             |
| API_DOMAIN           | Domain for API              | `http://localhost:5000`                          |

#### Local development
```bash
npm i
npm run dev
```

## Documentation

#### API
If not run in production mode, `swagger` documentation for the API is available here:
http://localhost:5000/documentation

#### Application framework
For this service we use `hapi.js` framework:
https://hapijs.com/api

