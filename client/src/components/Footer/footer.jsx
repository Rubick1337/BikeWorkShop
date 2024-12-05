import { Link } from 'react-router-dom';
import './footerStyle.scss';
import facebookIcon from "../../images/bxl-facebook.png";
import instagramIcon from "../../images/instagram-logo.png";
import twitterIcon from "../../images/bxl-twitter.png";
import youtubeIcon from "../../images/youtube-logo.png";

const Footer = () => {

    return (
        <footer className="footer">
            <div className="container__footer">
                <div className="logo__footer"></div>
                <div className="footer__container__links">

                    <div className="container__learn">
                        <h3 className="Title__footer">Learn More</h3>
                        <div className="container__link">
                            <Link to="/" className="footer-link">About Lift</Link>
                            <Link to="/" className="footer-link">Press Releases</Link>
                            <Link to="/" className="footer-link">Environment</Link>
                            <Link to="/" className="footer-link">Jobs</Link>
                            <Link to="/" className="footer-link">Privacy Policy</Link>
                            <Link to="/" className="footer-link">Contact Us</Link>
                        </div>
                    </div>
                    <div className="container__ticket">
                        <h3 className="Title__footer">Tickets</h3>
                        <div className="container__link">
                            <Link to="/" className="footer-link">Lift Tickets</Link>
                            <Link to="/" className="footer-link">Season Passes</Link>
                            <Link to="/" className="footer-link">Vacation Packages</Link>
                        </div>
                    </div>
                    <div className="container__contact">
                        <h3 className="Title__footer">Contact Us</h3>
                        <div className="container__link">
                            <div className="contact__item">
                                <span className="label">Hotel Reservation:</span>
                                <a href="tel:123-456-7890" className="number">123-456-7890</a>
                            </div>
                            <div className="contact__item">
                                <span className="label">Ticket Office:</span>
                                <a href="tel:123-456-7890" className="number">123-456-7890</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container__social">
                    <h3 className="Title__footer">Social</h3>
                    <div className="container_icons">
                        <a href="https://www.facebook.com" className="facebook" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook"/>
                        </a>
                        <a href="https://www.instagram.com" className="instagram" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram"/>
                        </a>
                        <a href="https://www.twitter.com" className="twitter" target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter"/>
                        </a>
                        <a href="https://www.youtube.com" className="youtube" target="_blank" rel="noopener noreferrer">
                            <img src={youtubeIcon} alt="YouTube"/>
                        </a>
                    </div>
                </div>
                <div className="line__footer"></div>
                <div className="rights">
                    <h5>© 2024 Bike Workshop | All Rights Reserved</h5>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
