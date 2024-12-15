import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import AdminPanel from "../../components/AdminPanel/AdminPanel";

export default function AdminPage() {
    return (
        <>
            <Header />
            <main>
                <AdminPanel/>
            </main>
            <Footer/>
        </>
    )
}