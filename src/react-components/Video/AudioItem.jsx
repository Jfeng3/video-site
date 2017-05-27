'use strict';

const React = require('react');
const ReactAnimationFrame = require('react-animation-frame');


// var config = {
//     apiKey: "AIzaSyAe7Sd3_RCCemKxTtP5blGmTJqcn1wGsao",
//     authDomain: "emailanalysis-1178.firebaseapp.com",
//     databaseURL: "https://emailanalysis-1178.firebaseio.com",
//     storageBucket: "emailanalysis-1178.appspot.com",
//     messagingSenderId: "255388495206"
//   };
//   //Firebase.initializeApp(config);

class AudioItem extends React.Component {
  constructor() {
    super();
    console.log("here");
    this.state = {
    whistleSoundRate : 0,
    audioList: "/video/simple_game.wav",
    ctx: new AudioContext(),
    audio: null,
    audioSrc: null,
    analyser: null,
    timeDomainData: null,
  };
}
  onAnimationFrame() {

    this.state.analyser.getFloatTimeDomainData(this.state.timeDomainData);
    const progress =  Math.abs(this.state.timeDomainData[0])*10;
    console.log(progress);
    this.bar.style.width = `${progress}%`;

   if (this.state.timeDomainData[0] == 100.0) { // need change later for this condition
     this.props.endAnimation();
   }
  }

  componentDidMount(){
    //this.setState({ctx: new AudioContext()});
    //console.log("onAnimationFrame")

    this.setState({audio: document.getElementById('myAudio')});
    this.state.audio = document.getElementById('myAudio');
    //audio = document.getElementById('myAudio')

    this.state.audioSrc =  this.state.ctx.createMediaElementSource(this.state.audio);
    //audioSrc = this.state.ctx.createMediaElementSource(audio);
    this.state.analyser =   this.state.ctx.createAnalyser();
  // we have to connect the MediaElementSource with the analyser
    this.state.audioSrc.connect(this.state.analyser);
    this.state.timeDomainData = new Float32Array(this.state.analyser.fftSize);

  }

  onPlay() {
    this.state.audio.play();
  }



  render() {
    return (
      <section>
        <header>
          <img src="/img/banner.jpeg" width="100%" />
        </header>

        <section>
          <section className="container">
            {
              this.state.audioList
              ?

              <audio controls id='myAudio' onplay="onPlay">
                <source src={this.state.audioList} type="audio/wav"> </source>
                Your browser does not support the audio element.
              </audio>

              :
              null
            }
          </section>
            <div className="timer">
            <div className="timer__bar" ref={node => this.bar = node}></div>
          </div>
        </section>
      </section>
    );
  }
}

module.exports = ReactAnimationFrame(AudioItem);
