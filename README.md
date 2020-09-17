# Overview

A static site bundle tools.
Compile the code of EJS, SCSS and Babel.

## Using

### Steps to start

1. Install the Package Manager [yarn](https://classic.yarnpkg.com/en/docs/install) on your computer.

2. Execute the `yarn` command in the directory containing package.json.

3. When the installation is done, just `yarn start` to get started.

4. Do a `git init` to add the project's initial commit and start developing the project 🎉

### Watch out

- If your project has coding guidelines, change the configuration file to suit your environment.

- Project settings should be added to `.env` and not registered in git.(Please refer to the sample configuration to create your own.)

- The dist directory are only html verified, so the developer is responsible for checking the generated files.

- Please run `yarn lint` and `yarn test` frequently to ensure the quality of your source code.

- You can't do a Git commit until you have no more problems with `yarn lint`.

## Package commands

An overview of commonly used commands

| Command            | Description                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| `yarn start`       | Short-hand of `yarn watch`.                                                                        |
| `yarn dev`         | Short-hand of `yarn development`.                                                                  |
| `yarn development` | Build the resource directory for development.                                                      |
| `yarn prod`        | Short-hand of `yarn production`.                                                                   |
| `yarn production`  | Build the resource directory for production.                                                       |
| `yarn watch`       | Monitoring and previewing source code for the development environment. Browsing on localhost:3000. |
| `yarn watch:prod`  | Monitoring and previewing source code for the production environment. Browsing on localhost:3000.  |
| `yarn lint`        | Verification of unconverted files in the resource directory, SCSS and BABEL.                       |
| `yarn lint:fix`    | Fixing the code that had a problem with `yarn lint`.                                               |
| `yarn test`        | Verification of HTML in the dist directory, in addition to `yarn lint`.                            |

## Directory Structure

Customize it to fit your project!

| Directory | Description                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| resources |                                                                                                                                          |
| static    | Stores files that do not need to be built. This directory will be copied into the dist directory.                                        |
| dist      | A copy of the static directory and the built result of the resources directory are generated. The test server references this directory. |

## Sample Configuration

### .env

For example, Path and API_KEY settings.

```.env
ASSET_PATH = '/sample'
BASE_PATH = '/sample'
MAP_API_KEY = 'xxxx'
```
