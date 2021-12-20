import React, { useEffect, useState } from 'react';
import './App.css'
import './index.css'
import axios from 'axios';
import Moment, { relativeTimeRounding } from 'moment';
import DateCountdown from 'react-date-countdown-timer';
import Clock from './Clock';
// Types...

function LenderBorroweDetailAdminApproved() {
    const data = JSON.parse(localStorage.getItem('rowdetail'));
    
    const [customerdetail, setcustomerdetail] = useState([])
    const [productimage, setproductImage] = useState('');
    const [productHonor, setproductHonor] = useState([]);
    const [productDetail, setproductDetail] = useState([]);
    const [requestOrderDetail,setRequestOrderDetail]=useState([]);

    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();
    let interval;
    const startTimer = () => {
        const countDownDate = new Date("May 30,2021 ").getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            const days = Math.floor(distance / (24 * 60 * 60 * 1000));
            const hours = Math.floor(
                (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
            const seconds = Math.floor((distance % (60 * 1000)) / 1000);

            if (distance < 0) {
                // Stop Timer

                clearInterval(interval.current);
            } else {
                // Update Timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        });
    };
    const reload=()=>{
        axios.get(`http://localhost:8080/customerRequest/${data.row.productid}`).then((response) => {
            setcustomerdetail(response.data)
        })
        axios.get(`http://localhost:8080/ProductImageGet/${data.row.productid}`).then((response) => {
            setproductImage(response.data)
        })
        axios.get(`http://localhost:8080/ProductHonor/${data.row.productid}`).then((response) => {
            setproductHonor(response.data)
        })
        axios.get(`http://localhost:8080/findById/${data.row.productid}`).then((response) => {
            setproductDetail(response.data)
        })
        axios.get(`http://localhost:8080/requestOrderDetail/${data.row.productid}/${data.row.orderstatus}`).then((response) => {
        setRequestOrderDetail(response.data)
        })
      

    }
useEffect(() => {
    
    console.log(data.row.id)
      axios.get(`http://localhost:8080/customerRequest/${data.row.id}`).then((response) => {
            setcustomerdetail(response.data)
        })
        axios.get(`http://localhost:8080/ProductImageGet/${data.row.productid}`).then((response) => {
            setproductImage(response.data)
        })
        axios.get(`http://localhost:8080/ProductHonor/${data.row.productid}`).then((response) => {
            setproductHonor(response.data)
        })
        axios.get(`http://localhost:8080/findById/${data.row.productid}`).then((response) => {
        console.log(response.data);    
        setproductDetail(response.data)
        })
        axios.get(`http://localhost:8080/requestOrderDetail/${data.row.id}`).then((response) => {
            setRequestOrderDetail(response.data)
        })
      
    }, [])
       
    const changeProductStatus=()=>{
        axios.get(`http://localhost:8080/changeProductStatusAdmin/${data.row.productid}`).then((response) => 
        {
            reload();
    })
    axios.get(`http://localhost:8080/changeorderStatusAdmin/${data.row.productid}/${data.row.orderstatus}`).then((response) => {
    })
    }
    const completeOrder=()=>{
        axios.get(`http://localhost:8080/changeProductStatusAdmintoNotRented/${data.row.productid}`).then((response) => {
       
        axios.get(`http://localhost:8080/changeorderStatusAdminCompleted/${data.row.productid}`).then((response) => {
       
        axios.get(`http://localhost:8080/deletenotification/${data.row.productid}`).then((response) => {
               
                    reload()
                        
                           })
                       
                
                   })
              
        
    })
   
    }
   
    return (

        <section id="team" class="pb-5" style={{ marginTop: '65px', marginLeft: 80, marginRight: 80, position: 'center' }}>
            <div class="container">
                <h5 class="section-title h1">Borrower And Lender </h5>
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                        <div class="image-flip" >
                            <div class="mainflip flip-0">
                                <div class="frontside" >
                                    <div class="card" style={{ backgroundColor: '#101820FF' }}>
                                        <div class="card-body text-center" >
                                            <p><img class=" img-fluid" src={productimage} alt="card image" /></p>

                                            <h2 class="card-title">Borrower</h2>
                                            <h3 class="card-title">Name: {customerdetail.username}</h3>
                                            <h4 class="card-title">Email: {customerdetail.email}</h4>
                                            <h3 class="card-title">Phone: {customerdetail.phone}</h3>
                                            <h3 class="card-title">CNIC: {customerdetail.nic}</h3>

                                        </div>
                                    </div>

                                </div>
                                <div class="backside"  >
                                    <div class="card" style={{ backgroundColor: '#F2AA4CFF' }}>
                                        <div class="card-body text-center mt-4">
                                            <h2 class="card-title">Lender</h2>
                                            <h3 class="card-title">Name: {productHonor.username}</h3>
                                            <h4 class="card-title">Email: {productHonor.email}</h4>
                                            <h3 class="card-title">Phone: {productHonor.phone}</h3>
                                            <h3 class="card-title">CNIC: {productHonor.nic}</h3>

                                            <p class="card-text">{productHonor.username}</p>
                                            <ul class="list-inline">
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-facebook"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-skype"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                        <i class="fa fa-google"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-8">
                        <div class="" >
                            <div class="">
                                <div class="frontside">
                                    <div class="card" style={{ backgroundColor: '#101820FF' }}>
                                        <div class="card-body text-center">
                                            <p><img class=" img-fluid" src={productimage} alt="card image" /></p>

                                            <h2 class="card-title1">Product Detail</h2>
                                            <h4 class="card-title1">Product Name: {data.row.productName}</h4>
                                            <h4 class="card-title1">Request Date: {Moment(data.row.requestDate).format('DD-MM-YYYY')}</h4>
                                            <h4 class="card-title1">From:  {Moment(data.row.fromdate).format('DD-MM-YYYY')}</h4>
                                            <h4 class="card-title1">To:  {Moment(data.row.todate).format('DD-MM-YYYY')}</h4>
                                            <h4 class="card-title1">Product Status: {productDetail.status}</h4>
                                            
                                            <h4 class="card-title1">Order Status:  {requestOrderDetail.orderstatus}</h4>

                                            {/* <div class="button" id="button-5">
                                                <div id="translate"></div>
                                                <a onClick={changeProductStatus}>Update Status</a>
                                            </div> */}
                                            <div class="button" id="button-5">
                                                <div id="translate"></div>
                                                <a onClick={completeOrder}>Complete</a>
                                            </div>
                                    
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section >
    );
}

export default LenderBorroweDetailAdminApproved;