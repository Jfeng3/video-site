import React from 'react';
//const ReactAnimationFrame = require('react-animation-frame');
import  ReactAudioPlayer from 'react-audio-player';
import SMQT from './lib/smqt';
import FFT from './lib/fft';
import dspFilter from './lib/dspFilter';
import jensenDiff from './lib/jensenDiff';
import raf from 'raf';




//firebase.initializeApp(config);
  //Firebase.initializeApp(config);

class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.onPlay = this.onPlay.bind(this);
    this.state = {
      whistleSoundRate : 0,
      audioList: "https://firebasestorage.googleapis.com/v0/b/peeq-b81e7.appspot.com/o/highlights%2Fhighlight0%2FPeeq_transition%2002.mp4?alt=media&token=3b709f12-b67f-46fd-86e8-56efe5c1eca0",
      ctx: null,
      audio: null,
      audioSrc: null,
      analyser: null,
      timeDomainData: null,
      sampleRate: 44100,  // Audio Input sample rate
      maxLevel: 8,        // Maximum level of SMQT
      freqBinCount: 512,   // Size of FFT
      jDiffThreshold: 0.45,   // Jensen Difference Threshold
      whistleBlockThreshold: 25, // Ratio of bandpass and bandstop blocks for 500-5000Hz
      sampleThreshold: 5,// Threshold for postive samples / 50 samples
      count: 0,
      timeBuf: null,
      totalSamples: 0,
      positiveSamples: 0,


  };
  this.onPlay = this.onPlay.bind(this);
  this.whistleFinder = this.whistleFinder.bind(this);
}
  // onAnimationFrame() {
  //
  //   const progress =  Math.abs(this.state.count)*10;
  //   console.log(progress);
  //   this.bar.style.width = `${progress}%`;
  //
  //  if (this.state.progress > 100.0) { // need change later for this condition
  //    this.props.endAnimation();
  //  }
  // }

  componentDidMount(){
    //this.setState({ctx: new AudioContext()});
    //console.log("onAnimationFrame")
    console.log("mounted");
    this.state.ctx = new AudioContext();
    this.state.audio = document.getElementById('myAudio');
    this.state.audio.addEventListener("play", this.onPlay, true);
    //this.state.audio.addEventListener('touchstart', function() { audio.play(); }, false);
    //audio = document.getElementById('myAudio')

    this.state.audioSrc =  this.state.ctx.createMediaElementSource(this.state.audio);
    //audioSrc = this.state.ctx.createMediaElementSource(audio);
    this.state.analyser =   this.state.ctx.createAnalyser();
    // we have to connect the MediaElementSource with the analyser
    this.state.audioSrc.connect(this.state.analyser);
    this.state.audioSrc.connect(this.state.ctx.destination);
    //this.state.timeDomainData = new Float32Array(this.state.analyser.fftSize);
    this.state.timeBuf = new Uint8Array( this.state.freqBinCount );

  }

   onPlay() {
    console.log("playing")
     //his.state.audio.play();
    this.whistleFinder();
     }


  whistleFinder() {
    console.log("in whistlefinder"); //time domain data

      var normData, fft, pbp,
      pbs, maxpbp, sumAmplitudes,sumpbp,meanpbs,meanpbp,
      minpbp, ratio, jDiff, i;
    this.state.analyser.getByteTimeDomainData(this.state.timeBuf);
    //console.log(timeBuf);

    SMQT.init(this.state.timeBuf, this.state.maxLevel).calculate();

    // FFT calculation of nomralized data
    fft = new FFT(this.state.freqBinCount, this.state.sampleRate);

    fft.forward(SMQT.normalize());

    pbp = dspFilter.bandpass( fft.spectrum, {
      sampleRate : this.state.sampleRate,
      fLower : 3000,
      fUpper : 4000
    });
    //console.log("pbp",pbp);

    pbs = dspFilter.bandstop( fft.spectrum, {
      sampleRate : this.state.sampleRate,
      fLower : 3000,
      fUpper : 4000
    });
    //console.log("pbs",pbs);

    // Calculating mean(pbs) max(pbp)
    maxpbp = 0; sumAmplitudes = 0; minpbp = 100; sumpbp = 0;

    for(i = 0; i < this.state.freqBinCount / 2; i++) {

      // Since it's a TypedArray, we can't use _Math._ operations
      if( pbp[i] > maxpbp)
        maxpbp = pbp[i];

      if( pbp[i] < minpbp)
        minpbp = pbp[i];

      sumAmplitudes += Math.abs(pbs[i]);
      sumpbp +=Math.abs(pbp[i]);
    }

    meanpbs = sumAmplitudes / (i - 1);
    meanpbp = sumpbp / (i-1);

    // Forming data for Jensen Difference
    sumAmplitudes = 0;
    for( i = 0; i < this.state.freqBinCount / 2; i++) {
      pbp[i] = (pbp[i] - minpbp) + 2 / this.state.freqBinCount;
      sumAmplitudes += pbp[i];
    }

    for( i = 0; i < this.state.freqBinCount / 2; i++)
      pbp[i] /= sumAmplitudes;

    ratio = maxpbp / (meanpbs + 1);
    //console.log(ratio);
    //console.log(maxpbp);
    //console.log(meanpbs);
    jDiff = jensenDiff(pbp, this.state.freqBinCount);

    if( meanpbp>1.2 ) {
      // console.log("ration: ",ratio);
      // maxpbp > 14 &&
      //&jDiff > this.state.jDiffThreshold
      // console.log("maxpbp: ",maxpbp);
      // console.log("meanpbs: ",meanpbs);
      // console.log("meab pbp: ", meanpbp);
      // console.log('\n');
      this.state.positiveSamples++;
      console.log(this.state.positiveSamples);

      if( this.state.positiveSamples > this.state.sampleThreshold ) {
        this.state.count  = this.state.count+1;
        this.state.totalSamples = 0;
        this.state.positiveSamples = 0;
      }
    }

    if ( this.state.totalSamples === 50 ) {
      this.state.totalSamples = 0;
      this.state.positiveSamples = 0;
    } else {
      this.state.totalSamples += 1;
    }

    const progress =  Math.abs(this.state.count)*10;
    this.bar.style.width = `${progress}%`;
    raf(this.whistleFinder);
  }




  render() {
    return (
      <section>
        <header>
          <img src="/img/banner.jpeg" width="100%" />
        </header>

        <section>
          <section className="container">
            <video controls id={this.props.video_id} preload="auto" >
              <source src={this.props.video} type="video/mp4"></source>
            </video>
          </section>
          <div className="timer">
            <div className="timer__bar" ref={node => this.bar = node}></div>
            <h1>{this.state.count}</h1>
          </div>
        </section>
      </section>
    );
  }
}

export default AudioItem;
