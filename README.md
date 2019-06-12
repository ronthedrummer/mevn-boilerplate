# mevn-boilerplate

Simple boilerplate for MEVN applications

1. Ensure you already have node & npm installed.
2. If you're on a Mac - Install Mongodb via homebrew, If PC - You're on your own. I encourage you to use the [MongoDB GUI](https://www.mongodb.com/products/compass)

- Update homebrew `brew update`
- Install mongodb `brew install mongodb`
- Add the directory for the database to live in `sudo mkdir -p /data/db`
- Make the directory owned by your user & read/write `cd /data/db && chown {username} ./ && chmod 755 ./`
- Run the server `mongod`

3. Run `npm install` to install all the dependencies.
4. Install global dependencies `npm i -g vue-cli vue-devtools mongodb babel nodemon concurrently`
5. Start Mongo in a new terminal window `mongod`
6. Run the task to rule them all `npm run start`

## Adding a global Sass file

There's already an alias in the `vue.config.js` file that allows you to point to files in the `/scss/` directory using `Styles`. I've also included a Sass file for you to add stuff to. It will be bundled during the webpack build and be included in your site-wide `app.css` file. I've also included Bootstrap's 'bootstrap-reboot.scss' file from the node_module using the node module alias `~`.

## Production Build

1. Run the production build task `npm run build`
