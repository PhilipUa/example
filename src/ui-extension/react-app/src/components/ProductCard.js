import React, { useState } from 'react';
import axios from 'axios';


const  ProductCard = ({product}) => {
    //console.log(product.items.items)
    const [newProduct, setNewProduct] = useState([]);

    const fetchData = async () => {
        const newPro = await axios.delete(`http://127.0.0.1:3000/products/${product.id}`);
        // console.log(items.items);
        // setProduct(items.items);

        // const newPro2 = product.filter(item => item.id !== product.id);
        // console.log(newPro2);

        const asArray = Object.entries(product)
        console.log(asArray)
        const filtered = asArray.filter(([key, value]) =>  value.id !== product.id);
        console.log('filtered ' + filtered)
        const justStrings = Object.fromEntries(filtered);
        console.log(justStrings);
        setNewProduct(justStrings)
      }

    const deleteProduct = async () => {
        console.log(product);
        console.log(newProduct);

         await fetchData();

    }
  return (
    <div className={"movie-card"}>
        <h3>{product.name}</h3>
      <img className={"product-cover"} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019' alt='image' />
      
      <div className='product-info'>
      <span>{product.description}</span>
      
      </div>
      
      


    </div>
  )
}

export default ProductCard
