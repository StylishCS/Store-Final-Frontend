import React, { useEffect, useState } from 'react'
import http from './http'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
function EditInvoice() {
    const [invoice, setInvoice] = useState({})
    const [products, setProducts] = useState([])
    const [subTotal, setSubtotal] = useState(0)
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        http.GET(`/statistics/invoices/invoice/${params.id}`)
        .then((res)=>{
            setInvoice(res);
            setProducts(res.products)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        setSubtotal(invoice.totalPrice);
    }, [invoice, products])

    function updateTotalPrice(updatedProducts) {
        const newTotalPrice = updatedProducts.reduce(
        (total, product) => total + product.sellPrice * product.quantity,
        0
    );

    const newNetPrice = updatedProducts.reduce(
        (total, product) => total + product.netPrice * product.quantity,
        0
    );

    const newProfit = newTotalPrice - newNetPrice;

    setInvoice((prevInvoice) => ({
        ...prevInvoice,
        totalPrice: newTotalPrice,
        netPrice: newNetPrice,
        profit: newProfit,
    }));
}

function handleRemove(id) {
    const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, quantity: 0 } : product
    );

    setInvoice((prevInvoice) => ({
        ...prevInvoice,
        products: updatedProducts,
    }));

    setProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
}

function handleQuantityChange(id, newQuantity) {
    const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, quantity: newQuantity } : product
    );

    setInvoice((prevInvoice) => ({
        ...prevInvoice,
        products: updatedProducts,
    }));

    setProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
}

function decreaseQuantity(id) {
    const updatedProducts = products.map((product) =>
        product._id === id && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
    );

    setInvoice((prevInvoice) => ({
        ...prevInvoice,
        products: updatedProducts,
    }));

    setProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
}

function increaseQuantity(id) {
    // can't increase quantity
}

function handleUpdate(){
    console.log(invoice);
    http.PATCH(`/statistics/invoices/deleteItems/${params.id}`, {invoice})
    .then((res)=>{
        navigate("/statistics")
    })
    .catch((err)=>{
        console.log(err)
    })
}
  return (
    <>
    <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Invoice Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* product cards */}
        {
            products.map((product)=>{
                return (
                    <div className="rounded-lg md:w-2/3">
                        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src={product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                            <p className="mt-1 text-xs text-gray-700">{product.category}</p>
                            </div>
                            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                                <span onClick={() => decreaseQuantity(product._id)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))} min="1" />
                                <span onClick={() => increaseQuantity(product._id)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm">{product.sellPrice * product.quantity} EGP</p>
                                <svg onClick={e=>handleRemove(product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                )
            })
        }
        {/* product cards */}
        {/* Subtotal */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{invoice.totalPrice + invoice.discount} EGP</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Discount</p>
            <input
              type="number"
              value={invoice.discount}
              disabled
              className="w-20 h-8 px-2 border rounded-md"
            />
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">{subTotal} EGP</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button onClick={handleUpdate} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
        {/* Subtotal */}
        </div>
        </div>
    </>
  )
}

export default EditInvoice