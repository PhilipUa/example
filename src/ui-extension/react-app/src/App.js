import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import ProductCard from './components/ProductCard';

function App() {
  const [product, setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [languageCode, setLanguageCode] = useState('');


  // const fetchData = () => {
  //   const data = fetch('http://127.0.0.1:3000/products')
  //   .then(response => response.json())
  //   .then(json => console.log(json))

  //   setProduct(data)
  // }

  const fetchData = async () => {
    const {data: items} = await axios.get('http://127.0.0.1:3000/products');
    console.log(items.items);
    setProduct(items.items);
  }

  const fetchData2 = async () => {
    // const data = await axios.get('http://127.0.0.1:3000/products');
    // console.log(items.items);
    // setProduct(items.items);
   const data =  axios.post('http://127.0.0.1:3000/products', {
      // name: 'Apple Ipad',
      // description: 'Good computer for you and you family',
      // slug: 'someslug',
      // languageCode: 'en'
      name: name,
      description: description,
      slug: slug,
      languageCode: languageCode
    });
  }

  useEffect(() => {
  fetchData()
  }, [])

  const renderProduct = () => (
    product.map(product => (
      <ProductCard
      key={product.id}
      product={product}
      />
    ))
  )

  const searchProducts = (e) => {
    e.preventDefault();
    fetchData2()
    
  }

  return (
    <div className='App'>
      <header className='header' >
        <div className={"header-content max-center"}>
        <h1 >Extension of UI </h1>

      <form className='form' onSubmit={searchProducts}>
        <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='description' onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder='laguage code' onChange={(e) => setLanguageCode(e.target.value)} />
        <input type="text" placeholder='slug' onChange={(e) => setSlug(e.target.value)} />



        <button className='button' type={"submit"} >Create product</button>
      </form>
      </div>
      </header>
      
            {/* Hi there! */}

      <div className='container max-center'>
       {renderProduct()}
      </div>
     
    </div >
  );
}

export default App;
