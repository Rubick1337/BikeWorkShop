import "./WelcomeContactStyle.scss"

export default function WelcomeContact() {
    return (
        <div className="container__contact__welcome">
            <div className="container__welcome__contact">
                <div className="background__contact">
                    <div className="text__contact">
                        <h3>Мы делаем велосипеды счастливыми</h3>
                    </div>
                </div>
                <div className="text__mission">
                    <div className="text__mission__title">
                        <h3>Наша миссия</h3>
                    </div>
                    <div className="text__mission__description">
                        <h4>Мы хотим, чтобы велосипед был доступен каждому и приносил радость.
                            Мы верим, что велосипед - это не просто средство передвижения,
                            но и способ улучшить свое здоровье и настроение.</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
