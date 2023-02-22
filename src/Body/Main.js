import React,{useState, useEffect} from 'react'
import Product from './Product';
import '../styles/main.css';
import { RotatingLines } from 'react-loader-spinner';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add } from '../Stores/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from './Banner';
import imageForLogo from "../images/ImageForApp.png";

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const checkProductinBucket = useSelector((state)=>state.bucket);
    const [ProductList, setProductList] = useState([]);
    const fetchProducts = ()=>{
    return fetch("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products").then((res)=>res.json())
    .then((response)=>{
      //  console.log(response);
        setProductList(response);
    })
}
const [loader,setLoader] = useState(true);
const fetchCategory = (category)=>{

  return  fetch("https://fakestoreapi.com/products/category/"+category).then((res)=>res.json())
  .then((response)=>{
    setProductList(response);
  })
}

   const handleCategory = (e)=>{

    
       if(e.target.id === "allProducts"){
        fetchProducts();
       }
       if(e.target.id === "electronics"){
        fetchCategory("electronics");
       }
       if(e.target.id === "jewelery"){
        fetchCategory("jewelery");
       }
       if(e.target.id === "mensclothing"){
        fetchCategory("men's clothing");
       }
       if(e.target.id === "womensclothing"){
        fetchCategory("women's clothing");
       }
   }

    useEffect(() => {
        fetchProducts();
      },[])

      const handleAddToBucket = (products)=>{
        let countForProduct=0;
      checkProductinBucket.map((oldPrdcts)=>{
        if(oldPrdcts.id===products.id){
          countForProduct++;
        }
      })
        if(countForProduct===0){
          dispatch(add(products));
          toast.success('Added to Bucket Successfully', {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message-add-bucket'
        });
        }else{
          alert("Already Have in Bucket");
        }
      }
      const handleGotoBucket = (e)=>{
        navigate("/bucket");
      }
  return (
    <>
    <div className='categoryDiv'>
       <div id='allProducts' onClick={handleCategory}>All</div>
       <div id='electronics' onClick={handleCategory}>Electronics</div>
       <div id='jewelery' onClick={handleCategory}>Jewelery</div>
       <div id='mensclothing' onClick={handleCategory}>Men's clothing</div>
       <div id='womensclothing' onClick={handleCategory}>Women's clothing</div>
       <div id='appsDivImg'><img src={imageForLogo} /></div>
    </div>
    <Banner />
    <div className='bodyGrid'>
   { ProductList.map((prdcts, index)=>{
            return <div className='productsData'key={index} > <Product products={prdcts} index={index} handleAddToBucket={handleAddToBucket}/> </div> 
    })}
    
</div>
<div id='goToBtnDiv' onClick={handleGotoBucket}><button className='GotoBucketBtn'>Go to Bucket</button></div>
<ToastContainer />
    </>
  )
}

export default Main