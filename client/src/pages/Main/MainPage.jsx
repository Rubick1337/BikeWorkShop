import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import WelcomeMain from "../../components/WelcomeMain/WelcomeMain";
import SliderMain from "../../components/SliderMain/SliderMain";
import ItemsMain from "../../components/ItemsMain/ItemsMain";
import ServicesMain from "../../components/ServicesMain/ServicesMain";

function MainPage() {
    return (
        <>
            <Header/>
            <main>
                <WelcomeMain/>
                <SliderMain/>
                <ItemsMain/>
                <ServicesMain/>
            </main>
            <Footer/>
        </>
    )
}

export default MainPage;
