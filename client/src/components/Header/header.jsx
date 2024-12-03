import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'; // Импортируем компоненты из Bootstrap
import './headerStyle.scss';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="header">
            <div className="header__logo">
                <div className="logo"></div>
                <h2 className="Title__text">Bike Workshop</h2>
            </div>

            <Navbar color="light" light expand="md" className="header__navbar">
                <NavbarToggler onClick={toggle} className="d-md-none" />

                {/* Offcanvas меню для мобильных устройств */}
                <Offcanvas isOpen={isOpen} toggle={toggle} placement="end" className="offcanvas-menu">
                    <OffcanvasHeader toggle={toggle}>
                        <p>Меню</p>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <Nav vertical>
                            <NavItem>
                                <Link to="/bike" className="nav-link">Велосипеды</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/services" className="nav-link">Услуги</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/contact" className="nav-link">Контакты</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/details" className="nav-link">Детали</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/constructor" className="nav-link">Конструктор</Link>
                            </NavItem>
                            {/* Иконки профиля и корзины внутри бокового меню */}
                            <div className="user-actions-mobile">
                                <NavItem>
                                    <div className="profile__container">
                                        <div className="profile__background"></div>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="basket__container">
                                        <div className="basket__background"></div>
                                    </div>
                                </NavItem>
                            </div>
                        </Nav>
                    </OffcanvasBody>
                </Offcanvas>

                {/* Навигация для больших экранов */}
                <Nav className="ml-auto d-none d-md-flex" navbar>
                    <NavItem>
                        <Link to="/bike" className="nav-link">Велосипеды</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/services" className="nav-link">Услуги</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/contact" className="nav-link">Контакты</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/details" className="nav-link">Детали</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/constructor" className="nav-link">Конструктор</Link>
                    </NavItem>
                </Nav>

                {/* Иконки профиля и корзины на больших экранах */}
                <div className="user-actions-desktop">
                    <div className="profile__container">
                        <div className="profile__background"></div>
                    </div>
                    <div className="basket__container">
                        <div className="basket__background"></div>
                    </div>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
