import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ManageDish = () => {
    const [products, setProducts] = useState([]);
    const [ID, setId] = useState();
    useEffect(() => {
        axios.get('https://fathomless-bayou-79225.herokuapp.com/productsForManage')
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [products])

    const handleDelete = (id) => {
        console.log((id).split("'")[1]);
        axios.delete(`https://fathomless-bayou-79225.herokuapp.com/delete?id=${ (id).split("'")[1] }`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    return (
        <div>
            <h1>Total Products: {products.length}</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product =>
                            <tr>
                                <td>{product.Name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td><button onClick={() => handleDelete(`'${ product._id }'`)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageDish;