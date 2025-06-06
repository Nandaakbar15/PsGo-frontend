import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardAdmin from './pages/Admin/DashboadAdmin'
import DataKonsolAdminPages from './pages/Admin/DataKonsol/indexconsole'
import TambahConsole from './pages/Admin/DataKonsol/TambahConsole'
import DataUserAdmin from './pages/Admin/DataUser/indexuser'
import UbahDataKonsolAdmin from './pages/Admin/DataKonsol/UbahConsole'
import DataAksesorisAdmin from './pages/Admin/DataAksesoris/IndexAksesoris'
import FormTambahAksesoris from './pages/Admin/DataAksesoris/TambahAksesoris'
import FormUbahAksesoris from './pages/Admin/DataAksesoris/UbahAksesoris'
import DashboardCustomerPages from './pages/Customer/DashboardCustomer'
import ProductsPages from './pages/Customer/Produk'
import AksesorisPages from './pages/Customer/Aksesoris'
import DetailProdukPages from './pages/Customer/DetailProduk'
import DetailAksesorisPages from './pages/Customer/DetailAksesoris'
import ProfilPages from './pages/Customer/Profil'
import PesanPages from './pages/Customer/Pesan'
import BookingAdminPages from './pages/Admin/DataBooking/IndexBooking'
import BookingPages from './pages/Customer/Booking'
import ListBookingPages from './pages/Customer/ListBooking'
import DataTransaksiAdminPages from './pages/Admin/Data Transaksi/IndexDataTransaksi'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/dashboardadmin' element={<DashboardAdmin/>}></Route>
        <Route path='/admin/data_user_admin' element={<DataUserAdmin/>}></Route>
        <Route path='/admin/data_konsol_admin' element={<DataKonsolAdminPages/>}></Route>
        <Route path='/admin/tambah_data_konsol_admin' element={<TambahConsole/>}></Route>
        <Route path='/admin/ubahdatakonsol/:id_konsol' element={<UbahDataKonsolAdmin/>}></Route>
        <Route path='/admin/data_aksesoris_admin' element={<DataAksesorisAdmin/>}></Route>
        <Route path='/admin/tambah_data_aksesoris' element={<FormTambahAksesoris/>}></Route>
        <Route path='/admin/ubah_data_aksesoris/:id_aksesoris' element={<FormUbahAksesoris/>}></Route>
        <Route path='/admin/data_booking_admin' element={<BookingAdminPages/>}></Route>
        <Route path='/admin/data_transaksi' element={<DataTransaksiAdminPages/>}></Route>
        <Route path='/dashboardcustomer' element={<DashboardCustomerPages/>}></Route>
        <Route path='/customer/akun' element={<ProfilPages/>}></Route>
        <Route path='/customer/produk' element={<ProductsPages/>}></Route>
        <Route path='/customer/aksesoris' element={<AksesorisPages/>}></Route>
        <Route path='/detailproduct/:id_konsol' element={<DetailProdukPages/>}></Route>
        <Route path='/detailaksesoris/:id_aksesoris' element={<DetailAksesorisPages/>}></Route>
        <Route path='/booking/:id_konsol' element={<BookingPages/>}></Route>
        <Route path='/customer/order' element={<PesanPages/>}></Route>
        <Route path='/customer/listbooking' element={<ListBookingPages/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
