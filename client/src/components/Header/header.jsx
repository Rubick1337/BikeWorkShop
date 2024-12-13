import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; // Импортируем компоненты из Bootstrap
import './headerStyle.scss';
import { useDispatch, useSelector } from 'react-redux'; // Добавляем useSelector
import { logout } from '../../store/slice/authSlice'; // Импортируем действие logout

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const toggle = () => setIsOpen(!isOpen);
    const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);  // Функция для toggle dropdown профиля

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <header className="header">
            <div className="header__logo">
                <div className="logo"></div>
                <h2 className="Title__text">Bike Workshop</h2>
            </div>

            <Navbar  expand="md" className="header__navbar">
                <NavbarToggler onClick={toggle} className="d-md-none " />

                {/* Offcanvas меню для мобильных устройств */}
                <Offcanvas isOpen={isOpen} toggle={toggle} placement="end" className="offcanvas-menu">
                    <OffcanvasHeader toggle={toggle}>
                        <p>Меню</p>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <Nav vertical>
                            <NavItem>
                                <Link to="/sellbike" className="nav-link">Велосипеды</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/sellservice" className="nav-link">Услуги</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/contact" className="nav-link">Контакты</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/sellpart" className="nav-link">Детали</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/const" className="nav-link">Конструктор</Link>
                            </NavItem>
                            {/* Иконки профиля и корзины внутри бокового меню */}
                            <div className="user-actions-mobile">
                                <NavItem>
                                   <Link to="/basket"> <div className="basket__container__mobile">
                                        <div className="basket__background"></div>
                                    </div></Link>
                                </NavItem>
                            </div>
                        </Nav>
                    </OffcanvasBody>
                </Offcanvas>

                {/* Навигация для больших экранов */}
                <Nav className="ml-auto d-none d-md-flex" navbar>
                    <NavItem>
                        <Link to="/sellbike" className="nav-link">Велосипеды</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/sellservice" className="nav-link">Услуги</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/contact" className="nav-link">Контакты</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/sellpart" className="nav-link">Детали</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/const" className="nav-link">Конструктор</Link>
                    </NavItem>
                </Nav>

                {/* Иконки профиля и корзины на больших экранах */}
                <div className="user-actions-desktop">
                    <Dropdown isOpen={profileDropdownOpen} toggle={toggleProfileDropdown}>
                        <DropdownToggle tag="div" className="profile__container">
                            <div className="profile__background"></div>
                        </DropdownToggle>
                        <DropdownMenu className="custom-dropdown-menu" end>
                            {isAuthenticated ? (
                                <>
                                    <DropdownItem tag={Link} to="/profile">Мой профиль</DropdownItem>
                                    <DropdownItem tag={Link} to="/" onClick={handleLogout}>Выйти</DropdownItem>
                                </>
                            ) : (
                                <>
                                    <DropdownItem tag={Link} to="/login">Войти</DropdownItem>
                                    <DropdownItem tag={Link} to="/registration">Зарегистрироваться</DropdownItem>
                                </>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Link to="/basket"><div className="basket__container__desktop">
                        <div className="basket__background"></div>
                    </div></Link>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
