import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../App.css';
import InfiniteScroll from 'react-infinite-scroll-component'


const PaginationOnScroll = () => {
const totalProductCount = 100;
const PAGE_LIMIT = 12;

//API
const apiPath = 'https://dummyjson.com/products'
const [products, setProducts] = useState([]);

const getProductsList = async() =>{

    try {

let pageNum = Math.ceil(products.length / PAGE_LIMIT) +1;

const queryParams = "?page=" + pageNum + "&limit=" + PAGE_LIMIT;
const url = apiPath + queryParams;
const response = await axios.get(url)
const apiRes = await response.data.products;
const mergeProducts = [...products,...apiRes];
setProducts(mergeProducts);

    }
catch(error){
    console.log(error)
}

}

useEffect(()=>{

    getProductsList();
}, [])

const fetchMoreData = () =>{
   
        getProductsList();
    
    
}

  return (
    <>
    <div className='container'>
        <h1>Product Details</h1>
        <div className="row">
         <InfiniteScroll
         dataLength={products.length}
         next={fetchMoreData}
         hasMore={products.length < totalProductCount}
         loader={<h4>Loading..</h4>}
         >
        {
          products && products.length> 0 && products.map((item)=>{
            return(
                <>
                <div key={item.id} className="card">
                    
           <div>
            <img src={item.thumbnail} alt="#"/>
            </div>
           <div className="card-description">
               <h6>{item.title}</h6>
               <h6>{`Price: ${item.price}`}</h6>
               
           </div>
          </div>
                </>
            )
            }) }
            
     </InfiniteScroll>  
        
            </div>
        </div>
        </>
  )
}

export default PaginationOnScroll