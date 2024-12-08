import React from 'react';
import Map from "../Map/Map"
import "./ContactInfoStyle.scss"
const ContactInfo = () => {
    return (
        <div className="container__info">
            <div className="title_section">
                <h3>Контакты</h3>
                <div className="line__title"></div>
            </div>
            <div className="container-contacts-info">
                <div className="contacts-info">
                    <div className="text-contacts">
                        <h2>Центральный офис:<br/>г. Москва, ул,Гоголя 13, 1й этаж</h2>
                    </div>
                    <div className="text-contacts">
                        <h2>Представительство в Киеве:<br/>г. Киев, ул. Є. Коновальця, 103 оф. 410</h2>
                    </div>
                    <div className="text-contacts"><a href="https://github.com/Rubick1337?tab=repositories">Github</a>
                    </div>
                    <div className="telephone">
                        <h2>Телефон:</h2>
                        <div className="text-contacts"><a href="tel:+7987654-54-56">+7 987 654-54-56</a></div>
                        <div className="text-contacts"><a href="tel:+38067504-32-57">+38 067 504-32-57</a></div>
                    </div>
                    <div className="text-contacts"><a
                        href="mailto:poss1337@gmail.com">Почта:&nbsp;poss1337@gmail.com</a></div>
                </div>
                <Map/>
            </div>
        </div>

    );
}

export default ContactInfo;
