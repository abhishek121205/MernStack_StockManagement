import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { SummaryApi } from '../../../common/commonApi';
import { toast } from 'react-toastify';


const AddProduct = ({ onClose, fetchAllProducts }) => {

    const [product, setProduct] = useState({}) //change

    const handleOnChange = (e) => {
        let { name, value } = e.target
        if (name === "stockManagement" && value === "false") {
            setProduct({ ...product, [name]: value, numberOfStock: 0 });
        } else {
            setProduct({ ...product, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const apiData = await fetch(SummaryApi.addProduct.url, {  //change
            method: SummaryApi.addProduct.method,
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(product) //change
        })

        const response = await apiData.json()
        if (response.success) {
            toast.success(response.message)
            fetchAllProducts()
            setProduct({})
        }
        if (response.error) {
            toast.error(response.message);
        }
    }

    return (
        <div className='flex fixed w-full h-full bg-opacity-50 bg-slate-300 top-0 z-50 bottom-0 left-0 right-0 justify-center items-center px-3 md:px-0'>
            <div className='bg-white dark:bg-gray-700 w-full max-w-xl h-full max-h-[72%] overflow-y-scroll scrollbar-none px-5 py-4 rounded-md'>
                <div className='flex justify-between items-center pb-3'>
                    <h1 className='font-bold dark:text-white' style={{ fontSize: "20px" }}>Add Product</h1>
                    <div
                        className="w-fit text-2xl hover:text-red-600 cursor-pointer dark:text-white"
                        onClick={onClose}
                    >
                        <IoMdClose />
                    </div>
                </div>
                <form className='grid gap-2' onSubmit={handleSubmit}>
                    <label htmlFor="productName" className='dark:text-white font-semibold'>Product name:</label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        value={product.productName || ""}
                        onChange={handleOnChange}
                        className='p-2 border rounded-md dark:bg-gray-700 dark:border-white-600 dark:text-white'
                    />

                    <label htmlFor="productPrice" className='dark:text-white font-semibold'>Product price:</label>
                    <input
                        type="number"
                        name="productPrice"
                        id="productPrice"
                        value={product.productPrice || ""}
                        onChange={handleOnChange}
                        className='p-2 border rounded-md dark:bg-gray-700 dark:border-white-600 dark:text-white'
                    />

                    <label htmlFor="productDescryption" className='dark:text-white font-semibold'>Product descryption:</label>
                    <textarea
                        name="productDescryption"
                        id="productDescryption"
                        rows={5}
                        value={product.productDescryption || ""}
                        onChange={handleOnChange}
                        className='p-2 border rounded-md dark:bg-gray-700 dark:border-white-600 dark:text-white'
                    ></textarea>

                    <div>
                        <label className='dark:text-white font-semibold'>Stock management:</label>
                        <h1 className='flex items-center dark:text-white'>True:
                            <input type="radio" name='stockManagement'
                                onChange={handleOnChange}
                                value={true}
                                checked={product.stockManagement == 'true'}
                                className='bg-red-700 ms-1 mt-1' style={{ width: "15px", height: "15px" }}
                            />
                        </h1>
                        <h1 className='flex items-center dark:text-white'>False:
                            <input type="radio" name='stockManagement'
                                onChange={handleOnChange}
                                checked={product.stockManagement == 'false'}
                                value={false}
                                className='bg-red-700 ms-1 mt-1' style={{ width: "15px", height: "15px" }}
                            />
                        </h1>
                    </div>

                    <label htmlFor="numberOfStock" className='dark:text-white font-semibold'>Number of stock:</label>
                    <input
                        type="number"
                        name="numberOfStock"
                        id="numberOfStock"
                        value={product.stockManagement == "true" ? product.numberOfStock || "" : 0}
                        onChange={handleOnChange}
                        disabled={product.stockManagement == "true" ? false : true}
                        className='p-2 border rounded-md dark:bg-gray-700 dark:border-white-600 dark:text-white'
                    />
                    <button className='bg-blue-500 text-white py-3 rounded-md'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
