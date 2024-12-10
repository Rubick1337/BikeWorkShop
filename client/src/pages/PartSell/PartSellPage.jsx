import Header from "../../components/Header/header";
import WelcomPartSell from "../../components/WelcomePartSell/WelcomePartSell";
import Footer from "../../components/Footer/footer";
import AboutSell from "../../components/AboutSell/AboutSell";
import SellPart from "../../components/SellDetails/SellPart";

export default function PartSellPage() {
    return (
        <>
            <Header />
            <main>
                <WelcomPartSell/>
                <AboutSell/>
                <SellPart/>
            </main>
            <Footer/>
        </>
    )
}