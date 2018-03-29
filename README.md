# collab-dashboard-frontend

### Pre-Requisites

Ensure that you have the following dependencies:

1. Node.js
2. npm package manager
3. collab

### Getting Started

Navigate to the `collab-tools/collab-dashboard-backend` folder, and type the following commands on the command line:

```
$ npm install
$ npm start
```

Open another command line and navigate to the root directory of `collab-tools/collab-dashboard-frontend` folder. Type the following commands on the command line:

```
$ npm install
$ npm run dev
```

**Note 1: Use `npm run dev:vm` instead of `npm run dev` if you are developing while using a virtual machine environment like Vagrant.**

**Note 2: You need to have the `collab-tools/collab-dashboard-backend` running in a command prompt, and `collab-tools/collab-dashboard-frontend` running in another command prompt.**

If there are no errors, your Collab Dashboard set up should now be complete and you can view the project at `localhost:3000`.

#### Troubleshooting for Vagrant

If you are using Windows but developing on Vagrant and see the following error while using `npm install` on the `collab-tools/collab-dashboard-frontend` folder:

```
$ npm ERR! path ../acorn/bin/acorn
$ npm ERR! code EPROTO
$ npm ERR! errno -71
$ npm ERR! syscall symlink
```

Try typing `npm install --no-bin-links` in the `collab-tools/collab-dashboard-frontend` folder and this should solve the problem. Run `npm run dev:vm` to view the project at `localhost:3000`.

If you type `npm run dev:vm` and get the following error:

```
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: spawn webpack-dev-server ENOENT
    at exports._errnoException (util.js:1020:11)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:193:32)
    at onErrorNT (internal/child_process.js:367:16)
    at _combinedTickCallback (internal/process/next_tick.js:80:11)
    at process._tickCallback (internal/process/next_tick.js:104:9)
    at Module.runMain (module.js:606:11)
    at run (bootstrap_node.js:389:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:504:3
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

Try the following steps:

```
$ rm -rf node_modules
$ rm package-lock.json
$ npm cache clear --force
$ sudo npm install --no-optional --no-bin-links
```
Run `npm run dev:vm` again to view the project at `localhost:3000`.

If it still cannot be run, remove and `node_modules` and `package-lock.json` file and re-install the project natively on your computer in the same folder as `collab-tools` where your vagrant file is located by typing `npm install` in the `collab-tools/collab-dashboard-frontend` folder. Once the project has been successfully installed natively in your computer, type the following commands in the `collab-tools` folder:

```
$ vagrant up
$ vagrant ssh
$ cd /vagrant/collab-dashboard-frontend
$ npm run dev:vm
```

The project should be viewable at `localhost:3000`.

### Development

During development, navigate to the `collab-tools/collab-dashboard-backend` folder, and type the following commands on the command line:

```
$ npm start
```

Open another command line and navigate to the root directory of `collab-tools/collab-dashboard-frontend` folder. Type the following commands on the command line:

```
$ npm run dev
```

**Note 1: Use `npm run dev:vm` instead of `npm run dev` if you are developing while using a virtual machine environment like Vagrant.**

**Note 2: You need to have the `collab-tools/collab-dashboard-backend` running in a command prompt, and `collab-tools/collab-dashboard-frontend` running in another command prompt.**

Your setup should be running and you can view the project at `localhost:3000`.

### Production

Navigate to the root directory of `collab-tools/collab-dashboard-frontend` folder. Type the following commands on the command line:

```
$ npm run build
```

This will generate static files to the `/static/` directory of `collab-tools/collab-dashboard-frontend`.

### Testing

#### Component Testing using Mocha and Chai-Enzyme

Navigate to the `collab-tools/collab-dashboard-frontend` folder, and type the following commands on the command line:

```
$ npm test
```

This will run Enzyme/Mocha/Chai tests in the `/tests/` folder.

#### End-to-End Testing using Nightwatch

Keep both `collab-tools/collab-dashboard-backend` and `collab-tools/collab-dashboard-frontend` running by typing `npm start` and `npm run dev` (or `npm run dev:vm` if you are using Vagrant) in their respective command prompts.

Ensure that that you installed Nightwatch and Java globally beforehand by typing the following command on the command line:

```
$ npm install nightwatch -g
```

If you are running on vagrant, type the following command:

```
$ java -version
$ sudo npm install nightwatch -g
```

Open another command prompt, and navigate to the `collab-tools/collab-dashboard-frontend` folder, and type the following commands on the command line:

```
$ nightwatch
```

**Note 3: You should have a total of three command prompts running, one command prompt to start the backend server for `collab-tool/collab-dashboard-backend`, another command prompt to start the frontend app for `collab-tool/collab-dashboard-frontend` and the last command prompt to run nightwatch in `collab-tool/collab-dashboard-frontend`.**

You should see a Chrome page automatically opening and running the tests which are in the `/nightwatch/tests` folder. The results will be stored in the `/nightwatch/reports` folder.
