import AdminProductsList from "../components/admin/AdminProductsList"
import Footer from "../components/footer"
import Header from "../components/header/Header"

const Admin = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div>
                <AdminProductsList />
            </div>
            <Footer />
        </div>
    )
}

export default Admin