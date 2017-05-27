import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import AudioItem from './Video/AudioItem.jsx';


class App extends React.Component {
  constructor() {
    super();

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
