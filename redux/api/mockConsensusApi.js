import delay from './delay';
import { ConsensusDemo } from './consensusDemo';

class ConsensusApi {
	static consensusDemo = new ConsensusDemo();
	static consensus = [
		{
			clock: ConsensusApi.consensusDemo.world.clock,
			groups: ConsensusApi.consensusDemo.world.groups,
			members: ConsensusApi.consensusDemo.world.members,
			nodes: ConsensusApi.consensusDemo.world.nodes.length
		}
	];

	static getConsensus() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], ConsensusApi.consensus));
			}, delay);
		});
	}

	static startRound() {
		console.log(`api:startRound`);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				ConsensusApi.consensusDemo.start()
			}, delay);

			let newConsensus = {
				clock: ConsensusApi.consensusDemo.world.clock,
				groups: ConsensusApi.consensusDemo.world.groups,
				members: ConsensusApi.consensusDemo.world.members,
				nodes: ConsensusApi.consensusDemo.world.nodes.length,
			};

			ConsensusApi.consensus.splice(0, 1, newConsensus);

			console.log("api:startRound updated ConsensusApi");
			resolve(Object.assign([], newConsensus));
		});
	}

	static stepRound() {
		console.log(`api:stepRound`);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				ConsensusApi.consensusDemo.tick();

				let newConsensus = {
					clock: ConsensusApi.consensusDemo.world.clock,
					groups: ConsensusApi.consensusDemo.world.groups,
					members: ConsensusApi.consensusDemo.world.members,
					nodes: 50
				};

				ConsensusApi.consensus.splice(0, 1, newConsensus);

				console.log("api:stepRound updated ConsensusApi");
				resolve(Object.assign([], newConsensus));
			}, delay);
		});
	}

}

export default ConsensusApi;