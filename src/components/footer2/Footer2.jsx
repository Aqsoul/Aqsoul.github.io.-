import React from 'react';
import './Footer2.css'
import logo from '../../assets/icon-removebg-preview.png'
import insta from '../../assets/free-icon-instagram-717392.png'
import facebook from '../../assets/free-icon-facebook-3670271.png'
import whats from '../../assets/free-icon-whatsapp-1384023.png'
import apps from '../../assets/png-transparent-google-play-app-store-app-market-download-button-thumbnail-removebg-preview.png'
import arrow from '../../assets/right-arrow.png'



const Footer2 = () => {
    return (

        <footer>
            <div className="row">
                <div className="col">
                    <img src={logo} className="logo"/>
                    <p>Телефон доставки</p>
                    <p>г.Алматы;</p>
                    <p className="number">+7(707)581 20 01</p>
                    <p className="number">+7(705)878 41 53</p>
                    <p className="number">+7(700)622 62 60</p>
                </div>
                <div className="col">
                    <h3></h3>
                    <img src={insta} className="icon"/>
                    <img src={facebook} className="icon"/>
                    <img src={whats} className="icon"/>
                    <p className="email-id">akzhan.marat.01@mail.ru</p>
                    <img src={apps} className="apps"/>
                </div>
                {/*<div className="col">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Services</a></li>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Features</a></li>
                        <li><a href="">Contacts</a></li>
                    </ul>
                </div>*/}
                <div className="col">
                    <h3>Новостная рассылка</h3>
                    <form>
                        <i className="fa-regular fa-envelope"></i>
                        <input type="email" placeholder="Enter your email id" required/>
                        <button type="submit"><img src={arrow} className="butarrow"/></button>
                    </form>
                </div>
            </div>
        </footer>


    );
};

export default Footer2;