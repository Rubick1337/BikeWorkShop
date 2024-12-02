import React from 'react';
import { Link } from 'react-router-dom';
import "./headerStyle.scss"

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <div className="logo"></div>
                <h2 className="Title__text">Bike Workshop</h2>
            </div>
            <div className="header__menu">
                <nav className="navigation">
                    <ul>
                        <li><Link to="/">Велосипеды</Link></li>
                        <li><Link to="/about">Услуги</Link></li>
                        <li><Link to="/services">Контакты</Link></li>
                        <li><Link to="/contact">Детали</Link></li>
                        <li><Link to="/">Конструктор</Link></li>
                    </ul>
                </nav>
                <div className="user-actions">
                    <div className="profile__container">
                        <div className="profile__background"></div>
                    </div>
                    <div className="basket__container">
                        <div className="basket__background"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
