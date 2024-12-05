import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./authorizationStyle.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Authorization() {
    const [passwordVisible, setPasswordVisible] = useState(false);  // Состояние для видимости пароля
    const [password, setPassword] = useState("");  // Состояние для пароля

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);  // Переключаем видимость пароля
    };

    return (
        <div className="container-registration">
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Войти в аккаунт</h1>
                    <span>Пожалуйста, введите свою почту и пароль</span>

                    <input type="email" placeholder="Электронная почта" />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button className="custom-button">Войти</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>Нет аккаунта?</h1>
                        <p>Зарегистрируйтесь, чтобы продолжить</p>
                        <Link to="/registration">
                            <button className="ghost custom-button">Зарегистрироваться</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authorization;
