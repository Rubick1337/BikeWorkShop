import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Basket from "../../components/Basket/Basket";

export default function BasketPage() {
    return (
        <>
            <Header />
            <main>
                <Basket/>
            </main>
            <Footer/>
        </>
    )
}