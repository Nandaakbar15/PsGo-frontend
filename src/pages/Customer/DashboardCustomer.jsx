import React from 'react'
import CustomerNavbar from '../../components/NavBarCustomer'
import Banner from '../../components/Banner'
import Cards from '../../components/Cards'
import PagesTitle from '../../components/PagesTitle'
import Cards2 from '../../components/Cards2'

export default function DashboardCustomerPages() {
  return (
    <>
      <PagesTitle title={'Dashboard Customer'}/>
      <CustomerNavbar />
      <div className="container mt-3">
        <Banner/>
        <div className="row mt-3">
          <h1>Selamat Datang di PS Go</h1>
          <Cards/>
          <div className="mt-3">
            <Cards2/>
          </div>
        </div>
      </div>
    </>
  )
}
