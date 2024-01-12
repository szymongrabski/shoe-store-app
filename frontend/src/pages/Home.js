import React from "react"
import Header from '../components/header/Header'
import ProductsList from "../components/home/ProductsList"
import Footer from "../components/footer"

const Home = () => {

    return (
        <div className="wrapper">
            <Header />
            <ProductsList />
            <Footer />
        </div>
    )
}

export default Home