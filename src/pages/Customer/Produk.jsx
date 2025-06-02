import React from 'react'
import CustomerNavbar from '../../components/NavBarCustomer'
import Banner from '../../components/Banner'
import PagesTitle from '../../components/PagesTitle'
import CardsProduct from '../../components/CardsProduct'

export default function ProductsPages() {
  return (
    <>
      <PagesTitle title={'Produk'}/>
      <CustomerNavbar />
      <div className="container mt-3">
        <Banner/>
        <div className="row mt-3">
          <h1>Produk Kami</h1>
          <CardsProduct/>
        </div>
      </div>
    </>
  )
}
