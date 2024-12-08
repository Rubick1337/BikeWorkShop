import Header from "../../components/Header/header";
import WelcomBikeSell from "../../components/WelcomBikeSell/WelcomeBikeSell";
import Footer from "../../components/Footer/footer";
import AboutSell from "../../components/AboutSell/AboutSell";
import SellBike from "../../components/SellBike/SellBike";

export default function BikeSellPage() {
    return (
        <>
            <Header />
            <main>
                <WelcomBikeSell/>
                <AboutSell/>
                <SellBike/>
            </main>
            <Footer/>
        </>
    )
}