import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import WelcomeContact from "../../components/WelcomeContact/WelcomeContact";
import ContactInfo from "../../components/ContactInfo/ContactInfo";

export default  function ContactPage () {
    return (
        <>
        <Header/>
        <main>
            <WelcomeContact/>
            <ContactInfo/>
        </main>
    <Footer/>
        </>
    )
}