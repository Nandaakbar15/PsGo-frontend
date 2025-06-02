import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router';

export default function CardsAccesories() {
  const [accesories, setAccesories] = useState([]);
  const [pagination, setPaginations] = useState({
    current_page: 1,
    last_page: 1
  });

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
                  <h5 className="card-title">{aksesoris.nama_aksesoris}</h5>
                  <p className="card-text">Harga: Rp. {aksesoris.harga}</p>
                  <p className="card-text">Stok: {aksesoris.stok}</p>
                  <Link to="/customer/order" className="btn btn-primary w-100">Pesan</Link>
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
        </div>
      </div>
    </>
  )
}
