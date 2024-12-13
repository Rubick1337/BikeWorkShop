import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Constructor from "../../components/Constructor/Constructor";

export default function ConstPage() {
    return (
        <>
            <Header />
            <main>
                <Constructor/>
            </main>
            <Footer/>
        </>
    )
}