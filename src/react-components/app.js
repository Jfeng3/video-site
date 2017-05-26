import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import AudioItem from './Video';


class App extends React.Component {
  constructor() {
    super();

  }

  renderFrame() {
     window.requestAnimationFrame(this.renderFrame);
     // update data in frequencyData
     this.prop.analyser.getByteFrequencyData(this.prop.frequencyData);
     this.prop.analyser.getFloatTimeDomainData(this.prop.timeDomainData);
     console.log(this.prop.timeDomainData);
     console.log(this.prop.timeDomainData[0]);
     this.setState({whistleSoundRate: this.prop.timeDomainData[0] });
     //console.log("redering frame")
     // render frame based on values in frequencyData
     //console.log(frequencyData)
     //console.log(frequencyData)
  }
    componentDidMount() {
      var ctx = new AudioContext();
      var audio = document.getElementById('myAudio');
      this.prop.audioSrc = ctx.createMediaElementSource(audio);
      this.prop.analyser = ctx.createAnalyser();
      this.prop.audioSrc.connect(this.prop.analyser);



    // we have to connect the MediaElementSource with the analyser

    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

    // frequencyBinCount tells you how many values you'll receive from the analyser
    this.prop.frequencyData = new Uint8Array(this.prop.analyser.frequencyBinCount);
    this.prop.timeDomainData = new Float32Array(this.prop.analyser.fftSize);


    console.log("audio mounted!")
    console.log(audio)

    // we're ready to receive some data!
    // loop

    //audio.play();
    this.renderFrame();

  }

  render() {
    return (
      <section>
        <Navbar user={true}/>
        <AudioItem />
      </section>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
