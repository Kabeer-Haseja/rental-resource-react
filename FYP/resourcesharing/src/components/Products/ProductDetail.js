import React, { useState,useEffect } from 'react'
import './Product.css';
import DetailsThumb from './DetailsThumb';
import axios from 'axios';

export  default function ProductDetail () {
   
  const [products, index] = useState( {
        products: [
            {
              "_id": "1",
              "title": "Nike Shoes",
              "src": [
                  "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
                  "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
                  "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
                  "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
                ],
              "description": "UI/UX designing, html css tutorials",
              "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
              "price": 23,
              "colors":["red","black","crimson","teal"],
              "count": 1
            }
          ],
          index: 0
    
    });
     
    const  handleTab = (index) =>{
        this.setState({index: index})
        const images = this.myRef.current.children;
        for(let i=0; i<images.length; i++){
          images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
      };
      useEffect(() => {
        const {index} = this.products;
        this.myRef.current.children[index].className = "active";
      },[])
      
    
        return(
          <div className="app">
            {
              products.map(item =>(
                <div className="details" key={item._id}>
                  <div className="big-img">
                    <img src={item.src[index]} alt=""/>
                  </div>
    
                  <div className="box">
                    <div className="row">
                      <h2>{item.title}</h2>
                      <span>${item.price}</span>
                    </div>
                
                    <p>{item.description}</p>
                    <p>{item.content}</p>
    
                    <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
                    <button className="cart">Add to cart</button>
    
                  </div>
                </div>
              ))
            }
          </div>
        );
      };

