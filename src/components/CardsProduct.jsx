import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router';
import PagesTitle from './PagesTitle';

export default function CardsProduct() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const getProducts = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://127.0.0.1:8000/api/customer/products?page=${page}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });

      setProducts(response.data.data.data); // array produk
      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {products.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id_konsol}>
              <div className="card h-100 shadow-sm">
                <Link to={`/detailproduct/${product.id_konsol}`}>
                  <img 
                    src={`http://127.0.0.1:8000/images/${product.image}`} 
                    className="card-img-top" 
                    alt={product.name} 
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Tarif Perjam: Rp. {product.hourly_rate.toLocaleString('id-ID')}</p>
                  <Link to="/customer/booking" className="btn btn-primary w-100">Pesan</Link>
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
            onClick={() => getProducts(pagination.current_page - 1)}
          >
            Previous
          </button>
          <button 
            className="btn btn-outline-primary mx-2"
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => getProducts(pagination.current_page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
