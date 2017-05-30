import React from 'react';
import ProductList from '../Product/ProductList';
console.log("prev");
import * as Firebase from 'firebase';
console.log("after")
//import admin from 'firebase-admin';
console.log("latest")

var config = {
  apiKey: " AIzaSyB72ITVcX5g94YSu4lNr4f697RRsxD64qY",
  authDomain: "peeq-b81e7.firebaseapp.com",
  databaseURL: "https://peeq-b81e7.firebaseio.com",
  storageBucket: "peeq-b81e7.appspot.com",
};
  Firebase.initializeApp(config);

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: []
    }

    var ref = Firebase.database().ref('/playerHighlightVideos')
    console.log("here",ref);
    ref.once('value').then(function (snap) {
      console.log('snapval:', snap.val());
    });
    ref.on('value', (snapshot) => {
      console.log("snapshotting");
      var products = snapshot.val();
      console.log("product: "+ products);
      console.log("keys: "+Object.keys(products));
      var productArr = Object.keys(products).map(function (key) {
        return products[key];
      });

      this.setState({
        productList: productArr
      })
    });
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
              this.state.productList
              ?
              <ProductList productList={this.state.productList}/>
              :
              null
            }
          </section>
        </section>
      </section>
    );
  }
}

export default HomePage;
