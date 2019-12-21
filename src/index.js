import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import NavBar from './components/navbar';
import Cover from './components/cover';
import Container from './components/container';


const pic = ['puzzle-pop-art', 'puzzle-antique-doorknobs', 'puzzle-awsome-a', 'puzzle-bizzare-bookshop-2', 'puzzle-christmas-in-the-square', 'puzzle-collector-cupboard', 'puzzle-craft-cupboard', 'puzzle-doors-of-the-world', 'puzzle-gardener-cupboard', 'puzzle-greatest-show-on-earth', 'puzzle-honefleur-reflection', 'puzzle-kitchen-cupboard', 'puzzle-locker-room', 'puzzle-merlin-laboratory', 'puzzle-new-york', 'puzzle-when-pigs-fly'];

const colors = ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			info: 'Click an image to begin!',
			score: 0,
			topScore: 0,
			pic: pic,
			selectedPic: []
		};
	};

	shufflePic() {
		this.setState({ pic: _.shuffle(pic) });
	};

	topScoreUpdater(currentScore, currentTopScore, name) {
		currentScore++;
		_.delay(() => {
			this.setState({ info: 'Choose your next picture!' });
		}, 500);
		if (currentScore >= currentTopScore) {
			return this.setState({ score: currentScore, topScore: currentScore, info: `Correct!` });
		};
		return this.setState({ score: currentScore, info: `Correct!` });
	};

	checkForDuplicate(name) {
		if (this.state.selectedPic.indexOf(name) === -1) {
			this.state.selectedPic.push(name);
			this.topScoreUpdater(this.state.score, this.state.topScore, name);
			if (this.state.selectedPic.length === pic.length) {
				this.setState({ selectedPic: [] });
			};
		} else {
			_.delay(() => {
				this.setState({ info: 'You Lose!' });
			}, 500);
			this.setState({ score: 0, selectedPic: [], info: `Wrong!` });
		}
		this.shufflePic();
	};

	handleSelectPic(name) {
		this.checkForDuplicate(name);
	};

	render() {
		return (
			<div>
				<NavBar
					score={this.state.score}
					topScore={this.state.topScore}
					message={this.state.info}
				/>
				<Cover />
				<div className="row"></div>
				<Container
					colors={colors}
					pic={this.state.pic}
					onImageClick={name => { this.handleSelectPic(name) }}
				/>
			</div>
		);
	};
};

ReactDOM.render(<App />, document.getElementById('root'));
