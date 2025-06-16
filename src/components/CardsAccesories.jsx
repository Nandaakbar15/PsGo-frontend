import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router';
import Modal from './Modal';

export default function CardsAccesories() {
  const [accesories, setAccesories] = useState([]);
  const [pagination, setPaginations] = useState({
    current_page: 1,
    last_page: 1
  });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const getAllAccessories = async(page = 1) => {
    try { 
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://127.0.0.1:8000/api/customer/aksesoris?page=${page}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });

      // console.log(response.data.data.data);

      setAccesories(response.data.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page
      });
    } catch(error) {
      console.error("Error : ", error);
    }
  }

  const handleOrder = async (aksesoris) => {
    const token = localStorage.getItem("token");
    const quantity = 1; // default sementara
    const jumlah_pembayaran = aksesoris.harga * quantity;
    const status = "Pending"; // status default

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/customer/order', {
        id_aksesoris: aksesoris.id_aksesoris,
        quantity: quantity,
        jumlah_pembayaran: jumlah_pembayaran,
        status: status
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setShowModal(true);
      setMessage(response.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate('/customer/order');
      });

    } catch (error) {
      console.error("Gagal membuat pesanan: ", error);
      // console.error("Gagal membuat pesanan: ", error);
      console.log("Detail error:", error.response?.data);
      setShowModal(true);
      setMessage("Gagal membuat pesanan!");
    }
  };

  useEffect(() => {
    getAllAccessories();
  }, [])
  
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {accesories.map((aksesoris) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={aksesoris.id_aksesoris}>
              <div className="card h-100 shadow-sm">
                <Link to={`/detailaksesoris/${aksesoris.id_aksesoris}`}>
                  <img 
                    src={`http://127.0.0.1:8000/images/${aksesoris.gambar}`} 
                    className="card-img-top" 
                    alt={aksesoris.nama_aksesoris} 
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title" onChange={() => setAccesories(aksesoris.nama_aksesoris)}>{aksesoris.nama_aksesoris}</h5>
                  <p className="card-text" onChange={() => setAccesories(aksesoris.harga)}>Harga: Rp. {aksesoris.harga}</p>
                  <p className="card-text" onChange={() => setAccesories(aksesoris.stok)}>Stok: {aksesoris.stok}</p>
                  <button className='btn btn-success w-100' onClick={() => handleOrder(aksesoris)}>Pesan!</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <button 
            className="btn btn-outline-primary mx-2"
            disabled={pagination.current_page === 1}
            onClick={() => getAllAccessories(pagination.current_page - 1)}
          >
            Previous
          </button>
          <button 
            className="btn btn-outline-primary mx-2"
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => getAllAccessories(pagination.current_page + 1)}
          >
            Next
          </button>
          {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
        </div>
      </div>
    </>
  )
}
