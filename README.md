* Screenshots

    ![alt tag](https://raw.githubusercontent.com/ltfschoen/PolkadotConsensusVR/master/screenshots/animated0001.gif)

* Instructions

    * Drag your mouse around the screen to familiarise with 3D environment.

    * Click the square icon in the bottom right of the screen to activate VR mode (i.e. if you are viewing using Google Cardboard, etc). Using VR turn your head and look around.

    * Click "Start Round" Button a few times and watch the black-screens Configuration parameters change randomly.
    If the Proposal Duration `proposal_dur` changes, then the DNA-like chains change in size according to the
    Proposal Duration for each Group `group_id` representative of the duration to Consensus Proposal using the Ethereum blockchain.

    * Click "Step Round" Button multiple times and observe the World Timer increase (dashboard), and Proposal IDs `proposal_ids` progressively generated for
    each Node ID `node_ids` in each Group. Consensus Proposal approval by peers for each Group is updated (purple-screens).
    Once a Group obtains all four (4) consensus' the dashboard is updated with Consensus Count value increasing.
    Consensus Count will be shown red-coloured until all Groups reach consensus to all the Proposals, then it
    is shown green-coloured "Consensus Count: 4 / 4". Note that it is out of four (4) if there are four (4) Groups. It
    may be necessary to drag/look to your right to see the 4th Group.

* Install 
	* https://facebook.github.io/react-vr/docs/getting-started.html#content

	```
	npm install -g react-vr-cli
	react-vr init PolkadotConsensusVR
	cd PolkadotConsensusVR
	```

* Run
	
	```
	npm start
	```

	* Open http://localhost:8081/vr/index.html

* Debugging

    * Optionally add `debugger;` in code to pause at these breakpoints when run in browser

* Deploy Static Content
    * https://facebook.github.io/react-vr/docs/publishing.html#content
    * https://facebook.github.io/react-vr/docs/react-vroverview.html#content

    * Generate static content for production
        ```
        npm run bundle
        cp -r ./static_assets vr/build/static_assets
        cp vr/index.html vr/build
        ```
    * Modify the following files:
        * vr/index.html
            * Replace `<script src="./build/client.bundle?platform=vr"></script>` with `<script src="./client.bundle.js?platform=vr"></script>`
            * Replace `'./build/index.bundle?platform=vr&dev=false',` with `'./index.bundle.js?platform=vr',`
            * Modify `document.body` with the following for all static assets:
                ```
                document.body,
                {},
                ['./static_assets/dna.jpg',
                 './static_assets/dna_black.png',
                 './static_assets/storm_960_720.jpg'
                ]
                ```
    * Deploy ./PolkadotConsensusVR/vr/build as static content
    * Create dynamic file `index.php` in the build directory of static site `touch ./vr/build/index.php` to be served before index.html and trick Heroku to deploy a static site. Add the following code to `index.php` `<?php header( 'Location: /index.html' ) ;  ?>`
    * Use [Heroku Buildpack Static](https://github.com/heroku/heroku-buildpack-static)by creating a static.json file in project root directory with the following contents to point to build directory static content, and to redirect all HTTP requests to HTTPS:
        ```
        {
          "root": "vr/build/",
          "https_only": true
        }
        ```
    * Create Procfile in project root with contents:
        `web: npm install`
    * Install Heroku Toolbelt
    * Run `heroku login`
    * Try running locally:
        * Run locally using Heroku
            ```
            heroku local web
            ```
        * Go to http://localhost:8081/vr/
    * Install Heroku Buildpack Static and [Static CLI Plugin](https://gist.github.com/hone/24b06869b4c1eca701f9)
    ```
    heroku plugins:install heroku-cli-static
    heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static
    ```
    * Setup Root directory by bootstrapping the static configuration file static.json and build assets in the defined build directory
        ```
        heroku static:init
        ```

        ```
        $ heroku static:init
        ? Enter the directory of your app: vr/build
        ? Drop `.html` extensions from urls? No
        ? Path to custom error page from root directory: 
        {
          "root": "vr/build/",
          "clean_urls": false
          "https_only": true
        }
        ```

        ```
        heroku static:deploy
        heroku ps:scale web=1
        heroku open
        ```

    * Go to https://polkadot-vr.herokuapp.com/

* Configure Smartphone for VR
    * [Mobile phone config for simple HMD](https://www.ntt-tx.co.jp/column/dojo_review_blog/20170511/) (i.e. Google Cardboard, Chrome on Android smartphone)
        * Android terminal requires gyro
        * Use Canary version if issues (i.e. blackout, upside down)using Chrome for Android
        * [Install the Google VR server on gyro terminals](https://play.google.com/store/apps/details?id=com.google.vr.vrcore)
        * [Chrome WebVR environment requires HTTPS to obtain WebVR](https://www.reddit.com/r/WebVR/comments/4slzvl/chrome_webvr_to_be_available_on_only_secure/) content so static content must be hosted on HTTPS to avoid error `WebVR will not run on an insecure origin`. When browsing locally using `npm start`, the React Native Packager does not support HTTPS, so you need to set up a reverse proxy server for HTTPS using this specific method.
            * Create Proxy with HTTPS support 
                * Install NPM library http-proxy 
                    ```
                    npm install -g http-proxy
                    ```
                * Create certificates to serve them via HTTPS. Remember the paraphrase that was set.
                    ```
                    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem
                    ```
                * Create `proxy.js` file and add [this code to it](https://gist.github.com/bakkerme/2730336d83b6f1cd85ace5a68a902819). Paste the certificate paraphrase obtained previously.
                    ```
                    var fs = require('fs');
                    var http = require('http'),
                        httpProxy = require('http-proxy');

                    httpProxy.createProxyServer({
                        target:'http://localhost:8081',
                        ssl: {
                          key: fs.readFileSync('key.pem', 'utf8'),
                          cert: fs.readFileSync('cert.pem', 'utf8'),
                          passphrase: '<ADD YOUR PASSPHRASE HERE>'
                        },
                    }).listen(8000); 
                    console.log('Running!');
                    ```
                * Open Chrome Canary on smartphone and go to https://<YOUR MACHINE IP HERE>/vr:8000, where you will get the Insecure Connection screen since the certificate we created is self signed. Click Advanced and add an exception.
                * Click the "View in VR" button (bottom left of screen)
                    * Install Google VR Services if prompted and repeat
            * Enable WebVR in browser:
                * Go to `chrome://flags/#enable-webvr` and click "Enable"

* Features

    * [X] - Loads front-end automatically with initialised World instance comprising multiple Node instances with shuffled peer Nodes using
    algorithm in [./redux/api/consensusDemo.js](https://github.com/ltfschoen/PolkadotConsensusVR/blob/master/redux/api/consensusDemo.js).
    that is a modified version of [consensis-demo](https://github.com/polkadot-io/polkadot-io.github.io/tree/master/consensus-demo)
    authored by [Polkadot.io](http://polkadot.io)
        * Note: Nodes Quantity == Member Quantity * Groups Quantity

    * [X] - Press "Start Round" button:
        * Resets the Consensus Count to 0
        * Resets the World Timer to 0
        * Reshuffles Nodes
        * Creates New Round for each Node in the World
        * Sets the Nodes' Proposal Duration to 4
        * Sets the Nodes' Address according to its Group
        * Sets a Table instance with the Group, Nodes' Address, and Members.
        Within each Group it initialises for each Member attributes associated with a Proposal including a Score, the Validity of their votes
        according to other peers, and Tally

    * [X] - Press "Step Round" button:
        * Reads all incoming message Proposals for each Node.
        * Mark the Proposal as Valid if its from a peer in the same Group.
        * Checks for Progression and punish peer if necessary (i.e if its a forked progression)
        * Checks that the Node's Proposal Duration (does not change in the demo) has not exceeded World Clock Timer
        * Generates a Proposal instance on the Node and allocates it a ticket and validity
        * Update the Table with the current Node as Sender and the the Node's Proposal for sending to all peers by
        relaying messages from the Nodes' Outgoing messages to peer Nodes' Incoming messages
        * Checks if ready to Finalise Vote. Sees if list of candidate Proposals for each Group have gathered sufficient
        data to form Consensus and then Group Leader finds out of those that are valid the Candidate Proposal Group Member
        with highest Score in the Table of results that is most likely to form consensus based on validity and
        most preference votes for the Group

    * [ ] - Add Slider to Control Panel to change quantity of Members and Groups

    * [ ] - Fix so when click Start Round button it resets  the Consensus Count to 0 / 4
