import React from 'react';
import Timer from './Timer.jsx'


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
    this.state = {
    whistleSoundRate : 0,
    audioList: "/video/simple_game.wav",
    audio: {}
    analyser: {}

  };
   this.renderFrame.bind(this);
}

    // Firebase.database().ref('products').on('value', (snapshot) => {
    //   var products = snapshot.val();
    //   console.log("product: "+ products);
    //   console.log("keys: "+Object.keys(products));
    //   var productArr = Object.keys(products).map(function (key) {
    //     return products[key];
    //   });

    //   this.setState({
    //     productList: productArr
    //   })
    //});

    componentDidMount() {
      var ctx = new AudioContext();
      this.state.audio = document.getElementById('myAudio');
      this.state.audioSrc = ctx.createMediaElementSource(this.state.audio);
      this.state.analyser = ctx.createAnalyser();
      this.state.audioSrc.connect(this.state.analyser);



    // we have to connect the MediaElementSource with the analyser

    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

    // frequencyBinCount tells you how many values you'll receive from the analyser
    frequencyData = new Uint8Array(this.state.analyser.frequencyBinCount);
    timeDomainData = new Float32Array(this.state.analyser.fftSize);


    console.log("audio mounted!")
    console.log(this.state.audio)

    // we're ready to receive some data!
    // loop

    //audio.play();
    this.renderFrame();

  }

  onPlay() {
    this.state.audio.play();
    this.renderFrame();
  }

  renderFrame() {
     window.requestAnimationFrame(this.renderFrame);
     // update data in frequencyData
     this.state.analyser.getByteFrequencyData(this.state.frequencyData);
     this.state.analyser.getFloatTimeDomainData(this.state.timeDomainData);
     console.log(this.state.timeDomainData);
     console.log(this.state.timeDomainData[0]);
     this.setState({whistleSoundRate: this.state.timeDomainData[0] });
     //console.log("redering frame")
     // render frame based on values in frequencyData
     //console.log(frequencyData)
     //console.log(frequencyData)
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
          <section className="timer">
            <Timer message="Let's Time Stuff!"  whistleSoundRate={this.props.whistleSoundRate}/>
          </section>
        </section>
      </section>
    );
  }
}

export default AudioItem;
