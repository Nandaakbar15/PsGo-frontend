import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardAdmin from './pages/Admin/DashboadAdmin'
import DataKonsolAdminPages from './pages/Admin/DataKonsol/indexconsole'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/dashboardadmin' element={<DashboardAdmin/>}></Route>
        <Route path='/data_konsol_admin' element={<DataKonsolAdminPages/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
