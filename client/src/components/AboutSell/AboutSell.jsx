import './AboutSellStyle.scss'

export default function AboutSell() {
    return (
        <div className="container__about__sell">
            <div className="title__about">
                <h2>О наших товарах</h2>
            </div>
            <div className="all__item">
                <div className="container__item__about">
                    <div className="dilevery__container">
                        <div className="img_dilevery"></div>
                        <div className="title_item__about">
                            <h3>Партнерские поставки</h3>
                        </div>
                        <div className="text__item__about">
                            <h4>Наши велосипеды и комплектующие поставляются только от проверенных партнеров,
                                что гарантирует высокое качество продукции.</h4>
                        </div>

                    </div>
                </div>
                <div className="container__item__about">
                    <div className="dilevery__container">
                        <div className="img_garant"></div>
                        <div className="title_item__about">
                            <h3>Гарантия качества</h3>
                        </div>
                        <div className="text__item__about">
                            <h4>Каждая деталь и велосипед проходят строгий контроль качества
                                и сопровождаются гарантией на срок до 2 лет.</h4>
                        </div>

                    </div>
                </div>
                <div className="container__item__about">
                    <div className="dilevery__container">
                        <div className="img_safe"></div>
                        <div className="title_item__about">
                            <h3>Надежность</h3>
                        </div>
                        <div className="text__item__about">
                            <h4>Мы выбираем материалы, которые обеспечивают долговечность
                                и надежность вашего велосипеда даже при интенсивном использовании.</h4>
                        </div>
                    </div>
                </div>
                <div className="container__item__about">
                    <div className="dilevery__container">
                        <div className="img_help"></div>
                        <div className="title_item__about">
                            <h3>Поддержка клиентов</h3>
                        </div>
                        <div className="text__item__about">
                            <h4>Покупая у нас, вы получаете квалифицированную поддержку и
                                возможность сервисного обслуживания у наших партнеров.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
