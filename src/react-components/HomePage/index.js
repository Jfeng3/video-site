import React from 'react';
import ProductList from '../Product/ProductList';
import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAe7Sd3_RCCemKxTtP5blGmTJqcn1wGsao",
    authDomain: "emailanalysis-1178.firebaseapp.com",
    databaseURL: "https://emailanalysis-1178.firebaseio.com",
    storageBucket: "emailanalysis-1178.appspot.com",
    messagingSenderId: "255388495206"
  };
  Firebase.initializeApp(config);

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: []
    }

    Firebase.database().ref('products').on('value', (snapshot) => {
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
