import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./registrationStyle.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registration() {
    const [passwordVisible, setPasswordVisible] = useState(false);  // Состояние для видимости пароля
    const [password, setPassword] = useState("");  // Состояние для пароля

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);  // Переключаем видимость пароля
    };

    return (
        <div className="container-registration">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Создать аккаунт</h1>
                    <span>или используйте вашу почту для регистрации</span>

                    <input type="text" placeholder="Имя" />
                    <input type="text" placeholder="Фамилия" />
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

                    <input type="text" placeholder="Адрес" />

                    <button className="custom-button">Зарегистрироваться</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>Добро пожаловать обратно!</h1>
                        <p>Чтобы продолжить, войдите с вашими личными данными</p>
                        <Link to="/login">
                            <button className="ghost custom-button">Войти</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
