/* eslint-disable no-unused-vars */
import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;



    useEffect(() => {
        getProducts();

      }, [currentPage])

      const getProducts = () => {
        setLoading(true)
        axiosClient.get(`/admin/products?page=${currentPage}&limit=${itemsPerPage}`)
          .then(({ data }) => {
              console.log(data);
              console.log(data.meta.links);


            setLoading(false)
            setProducts(data.data)
            setTotalPages(data.meta.links);

            // const itemsPerPage = 10; // Number of items to display per page
            // const startIndex = (currentPage - 1) * itemsPerPage;
            // const endIndex = startIndex + itemsPerPage;
            // const displayedItems = data.slice(startIndex, endIndex);
          })
          .catch(() => {
            setLoading(false)
          })
      }
      const onDeleteClick = product => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
          return
        }
        axiosClient.delete(`/admin/products/${product.id}`)
          .then(() => {
            setNotification('Product was successfully deleted')
            getProducts()
          })
      }



      const handlePageChange = (page) => {
        setCurrentPage(page);
      };

      const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages.length; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </button>
          );
        }

        return pageNumbers;
      };



      return (
        <div>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <h1>Products</h1>
            <Link className="btn-add" to="/admin/products/new">Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>title</th>
                <th>category</th>
                <th>Create Date</th>
                <th>image</th>
                <th>price</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }
              {!loading &&
                <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.product_title}</td>
                    <td>{p.cat_id}</td>
                    <td>{p.product_img}</td>
                    <td>{p.price}</td>
                    <td>{p.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/admin/products/' + p.id}>Edit</Link>
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>
                    </td>
                  </tr>
                ))}
                </tbody>
              }
            </table>


          </div>
           {/* Render pagination controls */}
           {/* <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>


      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button> */}
      <div className="pagination">
            {renderPageNumbers()}

           </div>


        </div>
      )
  }


export default Products
