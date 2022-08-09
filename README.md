# Github API Wrapper

## Prerequisites

* [NodeJS](https://nodejs.org/uk/download/) 16.x
* [pnpm](https://nodejs.org/uk/download/) 7.x - optional

On Linux/Mac NodeJS can be installed easily using [nvm](https://github.com/nvm-sh/nvm) instructions.
About package manager - of course standard `npm` will work,
but I recommend to use `pnpm` due to optimized speed and disk space usage

## Configuring

Project uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment
variables. You can see `.env.example` file in the project root as an example.
Parameters list:

* PORT - port on which Express server starts listening
* ACCESS_TOKEN - GitHub API access token
* GITHUB_API - base GitHub API url

But all that is __optional__ - everything has a default value

## NPM scripts

1. `test` - runs Jest tests
2. `clean` - clears `lib` folder
3. `copy-files` - copies swagger file for `lib` folder
4. `build` - runs tests, compiles typescript and copies files
5. `starts` - starts compiled NodeJS app 
6. `docker-build` - builds DOcker container

## Installation

```bash
pnpm i
```

## Usage

```bash
pnpm build && pnpm start
```

After that you'll see next output
```bash
⚡️[server]: Server is running at http://localhost:[PORT]
```

## Swagger

After server start Swagger doc is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs). 
Note, that port can be changed