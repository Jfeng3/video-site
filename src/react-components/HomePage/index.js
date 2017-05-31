import React from 'react';
import ProductList from '../Product/ProductList';
console.log("prev");
import * as Firebase from 'firebase';
console.log("after")
//import admin from 'firebase-admin';
console.log("latest")

var config = {
   apiKey: "AIzaSyDCl_r_dnX1gDO6fjVl6-BWJL9gab1BWoA",
   authDomain: "peeq2-63baf.firebaseapp.com",
   databaseURL: "https://peeq2-63baf.firebaseio.com",
   projectId: "peeq2-63baf",
   storageBucket: "peeq2-63baf.appspot.com",
   messagingSenderId: "456006647360"
 };

  Firebase.initializeApp(config);

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: []
    }

    var ref = Firebase.database().ref('/')
    ref.on('value', (snapshot) => {
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
        return  products[key];

      });
      console.log("url",productArr);
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
