import React from 'react';
import ProductItem from './ProductItem';
import AudioItem from '../Video/AudioItem.jsx';

class ProductList extends React.Component {
  render() {
    return (
      <ul className="product-list">
        {
          this.props.productList.map(function(item, idx) {
            return <AudioItem video_id={idx} {...item}/>
          })
        }
      </ul>
    );
  }
}

export default ProductList;
