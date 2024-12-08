import React from "react";
import "./ItemsMainStyle.scss"
export  default  function ItemsMain()
{
    return (
        <div className="container__item">
            <div className="title_section">
                <h3>Наш ассортимент</h3>
                <div className="line__title"></div>
            </div>
            <div className="container__sell">
                <div className="container__sell__item">
                    <div className="container__img__button">
                        <div className="img__bike"></div>
                        <div className="button__sell"></div>
                    </div>
                    <div className="text__sell">
                        <h3>Откройте для себя мир приключений с нашими велосипедами! Ищете идеальный велосипед для
                            города или экстремальных поездок по горам? У нас есть всё, что вам нужно. Наш ассортимент
                            сочетает в себе передовые технологии и стильный дизайн.
                            Переходите на страницу ассортимента, чтобы найти свой идеальный велосипед и начать новое
                            путешествие!</h3>
                    </div>
                </div>
                <div className="container__sell__item reverse">
                    <div className="text__sell">
                        <h3>Улучшите свой велосипед с нашими высококачественными деталями!
                            Ищете надежные компоненты для улучшения производительности и комфорта вашего велосипеда?
                            Наш ассортимент деталей включает в себя всё: от прочных рам до высокоточных тормозов.
                            Посетите нашу страницу ассортимента и найдите идеальные решения для любых условий и стиля езды!</h3>
                    </div>
                    <div className="container__img__button">
                        <div className="button__sell__left"></div>
                        <div className="img__part"></div>
                    </div>
                </div>
                <div className="container__sell__item">
                    <div className="container__img__button">
                        <div className="img__const"></div>
                        <div className="button__sell"></div>
                    </div>
                    <div className="text__sell">
                        <h3>Создайте велосипед своей мечты с нашим конструктором!
                            Хотите уникальный велосипед, который отражает ваш стиль и нужды?
                            Наш конструктор позволяет выбрать все — от рамы до последних штрихов.
                            Погрузитесь в процесс создания и получите велосипед, который будет идеально соответствовать вашим ожиданиям.
                            Перейдите на страницу конструктора и начните своё уникальное путешествие!</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}