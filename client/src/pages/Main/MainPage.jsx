import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import WelcomeMain from "../../components/WelcomeMain/WelcomeMain";
import SliderMain from "../../components/SliderMain/SliderMain";

function MainPage() {
    return (
        <>
            <Header/>
            <main>
                <WelcomeMain/>
                <SliderMain/>
            </main>
            <Footer/>
        </>
    )
}

export default MainPage;
