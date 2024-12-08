import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Loading from "../../components/Loading/loading";
import "./NotFoundStyle.scss"
export default function NotFound() {
    return (
        <>
            <Header />
            <main>
                <div className="container__eror">
                    <h1>404</h1>
                    <h2>Такой страницы не существует</h2>
                </div>
                <Loading/>
            </main>
            <Footer/>
        </>
    );
}
