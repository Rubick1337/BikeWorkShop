import React, {useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Route, Routes } from 'react-router-dom'; // Импортируем Router, Route и Routes

import "./scrollbar/styleScrollbar.scss"
import { checkAuth } from "./store/slice/authSlice";
import Loading from "./components/Loading/loading";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AuthorizationPage from "./pages/AuthorizaionPage/AuthorizaionPage";
import MainPage from "./pages/Main/MainPage";
import NotFound from "./pages/NotFound/NotFound";
import ContactPage from "./pages/Contact/ContactPage";
import BikeSellPage from "./pages/BikeSell/BikeSellPage";
import PartSellPage from "./pages/PartSell/PartSellPage";
import ServiceSellPage from "./pages/ServiceSell/ServiceSellPage";
import ConstPage from "./pages/ConstPage/ConstructorPage";
import BasketPage from "./pages/Basket/BasketPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AdminPage from "./pages/AdminPage/AdminPage";

const App = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.isLoading)
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Сработал");
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true); // Если токена нет, сразу инициализируем приложение
        }
    }, [dispatch]);

    if (!isInitialized) {
        return <Loading />
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<AuthorizationPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/sellbike" element={<BikeSellPage/>}/>
                <Route path="/sellpart" element={<PartSellPage/>}/>
                <Route path="*" element={<NotFound />} />
                <Route path="/sellservice" element={<ServiceSellPage/>}/>
                <Route path="/const" element={<ConstPage/>}/>
                <Route path="/basket" element={<BasketPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </div>
    );
};

export default App;
