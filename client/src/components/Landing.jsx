import React from "react";
import { Link } from 'react-router-dom';
import styles from'./styles/Landing.module.css';

export default function LandingPage() {
    return (
        <div className={styles.landingImage}>
            <div className={styles.one}>
                <h1>If you love play games this is your site</h1>
            <Link to='/home' id="click">
                <button className={styles.homeButton}>Discover</button>
            </Link>
            

            </div>
        </div>
    )
}