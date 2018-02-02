# Operon Cloud Platform

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js](https://nodejs.org/en/): We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn](https://yarnpkg.com/en/): We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.
3. [RabbitMq](https://www.rabbitmq.com/): This application uses RabbitMq for asynchronous messaging.
    So you'll either need an instance of `RabbitMq` running on port `5672`. Our recommended approach is to use `docker-compose` to install `RabbitMq`. We have already included the necessary setup for you. So all you need to do is run the following command in a new tab of your commandline tool. It'll download a dockerised instance of `RabbitMq` and run it - you will of course need to install Docker first.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in `package.json`.

    yarn install

We use yarn scripts and [Webpack](https://webpack.js.org/) as our build system.

Run the following commands in three separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    docker-compose -f src/main/docker/rabbitmq.yml up
    ./mvnw
    yarn start

[Yarn](https://yarnpkg.com/en/) is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in `package.json`. You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.

## Dockerisation

To build the inidus cloudplatform application as a Docker image for production, run:

    `./mvnw clean package -Pprod -DskipTests=true docker:build`

To ensure everything worked, run:

    `docker-compose -f target/docker/app.yml up`

Then navigate to [http://localhost:8181](http://localhost:8181) in your browser.

## Building for production

To optimize the operoncloudplatform application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    `java -jar target/*.war`

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Testing

Ensure `RabbitMq` is up and running first (see above). To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma](https://karma-runner.github.io) and written with [Jasmine](https://jasmine.github.io/). They're located in `src/test/javascript/` and can be run with:

    yarn test

UI end-to-end tests are powered by [Protractor](http://www.protractortest.org/#/), which is built on top of WebDriverJS. They're located in `src/test/javascript/e2e`
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`gulp itest`) in a second one.
