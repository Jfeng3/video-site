'use strict';

const React = require('react');
const ReactAnimationFrame = require('react-animation-frame');

class Timer extends React.Component {
  constructor() {
	super();
}

	onAnimationFrame() {
		const progress =  this.props.whistleSoundRate;
		this.bar.style.height = `${progress}%`;

		if (progress >= 100) {
			this.props.endAnimation();
		}
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
