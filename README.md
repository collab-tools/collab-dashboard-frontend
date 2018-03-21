# collab-dashboard-frontend

### Pre-Requisites

Ensure that you have the following dependencies:

1. Node.js
2. npm package manager
3. collab

### Getting Started

Navigate to the `collab-dashboard-backend` folder, and type the following commands on the command line:

```
$ npm install
$ npm start
```

Open another command line and navigate to the root directory of `collab-dashboard-frontend` folder. Type the following commands on the command line:

```
$ npm install
$ npm run development
```

Your Collab Dashboard set up should now be complete and you can view the project at `localhost:3000`.

### Development

During development, navigate to the `collab-dashboard-backend` folder, and type the following commands on the command line:

```
$ npm start
```

Open another command line and navigate to the root directory of `collab-dashboard-frontend` folder. Type the following commands on the command line:

```
$ npm run development
```

Your setup should be running and you can view the project at `localhost:3000`.

### Production

Navigate to the root directory of `collab-dashboard-frontend` folder. Type the following commands on the command line:

```
$ npm run production
```

This will generate static files to the `\static\` directory of `collab-dashboard-frontend`.

### Testing

#### Component Testing using Mocha and Chai-Enzyme

Navigate to the `collab-dashboard-frontend` folder, and type the following commands on the command line:

```
$ npm test
```

This will run Enzyme/Mocha/Chai tests in the `\tests\` folder.

#### End-to-End Testing using Nightwatch

Keep both `collab-dashboard-backend` and `collab-dashboard-frontend` running by typing `npm start` and `npm run development`in their respective command prompts.

Ensure that that you installed Nightwatch globally beforehand by typing the following command on the command line:

```
$ npm install nightwatch -g
```

Open another command prompt, and navigate to the `collab-dashboard-frontend` folder, and type the following commands on the command line:

```
$ nightwatch
```

You should see a Chrome page automatically opening and running the tests which are in the `\nightwatch\tests` folder. The results will be stored in the `\nightwatch\reports` folder.
