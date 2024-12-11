import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import AboutSell from "../../components/AboutSell/AboutSell";
import SellService from "../../components/SellService/SellService";
import WelcomServiceSell from "../../components/WelcomeServiceSell/WelcomeServiceSell";

export default function PartSellPage() {
    return (
        <>
            <Header />
            <main>
                <WelcomServiceSell/>
                <AboutSell/>
                <SellService/>
            </main>
            <Footer/>
        </>
    )
}