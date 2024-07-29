import React from "react";
import '../css/Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

export default function Footer(){
    return(
        <div className="footer-div">
            <h4 className="footer-content">All Rights Reserved</h4>
            <div className="footer-links-div">
                <p className="footer-links-text">Contact Us:-</p>
                <div className="footer-links">
                <a href="https://www.instagram.com" target="_blank" className="mylink"><FontAwesomeIcon icon={['fab','instagram']}/></a>
                <a href="https://www.facebook.com" target="_blank" className="mylink"><FontAwesomeIcon icon={["fab","facebook"]}/></a>
                <a href="https://www.twitter.com" target="_blank" className="mylink"><FontAwesomeIcon icon={["fab","twitter"]}/></a>
                <a href="https://www.linkedin.com" target="_blank" className="mylink"><FontAwesomeIcon icon={["fab","linkedin"]}/></a>
                </div>
            </div>
        </div>
    )
}