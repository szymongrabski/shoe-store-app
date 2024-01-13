import React from "react"
import Header from '../components/header/Header'
import ProductsList from "../components/home/ProductsList"
import Footer from "../components/footer"
import SearchBar from "../components/home/SearchBar"

const Home = () => {

    return (
        <div className="wrapper">
            <div>
                <Header />
                <SearchBar />
            </div>
            <ProductsList />
            <Footer />
        </div>
    )
}

export default Home