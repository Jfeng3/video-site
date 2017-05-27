'use strict';

const React = require('react');
const ReactAnimationFrame = require('react-animation-frame');

class Timer extends React.Component {
  constructor() {
	super();
}

	onAnimationFrame(whistleSoundRate) {
		const progress =  whistleSoundRate * 100;
		this.bar.style.height = `${progress}%`;

		if (progress >= 100) {
			this.props.endAnimation();
		}
	}

  componentDidMount(){
    this.setState(ctx : new AudioContext());
    this.setState(audio : document.getElementById('myAudio'));
    this.setState(audioSrc: ctx.createMediaElementSource(this.state.audio));
    this.setState(analyser:  ctx.createAnalyser());
  // we have to connect the MediaElementSource with the analyser
    this.state.audioSrc.connect(this.state.analyser);
  }

	render() {
		return (
			<div className="timer">
				<p>{this.props.message}</p>
				<div className="timer__bar" ref={node => this.bar = node}></div>
			</div>
		);
	}
}

module.exports = ReactAnimationFrame(Timer);
