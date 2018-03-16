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

Open another command line and navigate to the root directory of `collab-dashboard-v2` folder. Type the following commands on the command line:

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

Navigate to the `collab-dashboard-v2` folder, and type the following commands on the command line:

```
npm test
```

This will run Enzyme/Mocha/Chai tests in the `\tests\` folder.
