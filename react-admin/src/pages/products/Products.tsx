import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product, key: number) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img src={p.image} width={50} />
                </td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/products/${p.id}/e dit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={(e) => del(p.id)}
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
      </div>
    </Wrapper>
  );
}
