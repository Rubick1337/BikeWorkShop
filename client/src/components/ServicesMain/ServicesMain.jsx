import React from "react";
import "./ServicesMainStyle.scss"
export default function ServicesMain() {
    return (
        <div className="container__services">
            <div className="title_section">
                <h3>Наши услуги</h3>
                <div className="line__title"></div>
            </div>
            <div className="background__service">
                <div className="container__service">
                    <div className="service">
                        <div className="img__bike__service"></div>
                        <div>
                        <div className="title">
                            <h4>Продажа велосипедов</h4>
                        </div>
                        <div className="text__service">
                            <h5>Высокий выбор велосипедов по выгодным ценам</h5>
                        </div>
                        </div>
                    </div>
                    <div className="service const">
                        <div className="img__const__service"></div>
                        <div>
                        <div className="title">
                            <h4>Констуктор</h4>
                        </div>
                        <div className="text__service">
                            <h5>Сделайте велосипед вашей мечты</h5>
                        </div>
                        </div>
                    </div>
                    <div className="service part">
                        <div className="img__part__service"></div>
                        <div>
                        <div className="title">
                            <h4>Запчасти</h4>
                        </div>
                        <div className="text__service">
                            <h5>Высокий выбор запчастей по выгодным ценам</h5>
                        </div>
                        </div>
                    </div>
                    <button className="button__service">Еще...</button>
                </div>
            </div>
        </div>
    )
}