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

* Deployment
    * https://facebook.github.io/react-vr/docs/publishing.html#content
    * https://facebook.github.io/react-vr/docs/react-vroverview.html#content

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
