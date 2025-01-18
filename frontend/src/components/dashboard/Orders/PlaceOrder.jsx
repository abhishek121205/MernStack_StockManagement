import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { SummaryApi } from '../../../common/commonApi';
import { toast } from 'react-toastify';


const PlaceOrder = ({ onClose, fetchAllProducts, orderProductId }) => {

    const [order, setOrder] = useState({}) //change

    const handleOnChange = (e) => {
        let { name, value } = e.target
        setOrder({ ...order, [name]: value, productId: orderProductId._id });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const apiData = await fetch(SummaryApi.makeOrder.url, {  //change
            method: SummaryApi.makeOrder.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(order) //change
        })

        const response = await apiData.json()
        if (response.success) {
            toast.success(response.message)
            // fetchAllProducts()
            onClose()
            setOrder({})
        }
        if (response.error) {
            toast.error(response.message);
        }
    }

    return (
        <div className='flex fixed w-full h-full bg-opacity-50 bg-slate-300 top-0 z-50 bottom-0 left-0 right-0 justify-center items-center px-3 md:px-0'>
            <div className='bg-white dark:bg-gray-700 w-full max-w-xl h-full max-h-[61%] xl:max-h-[54%] overflow-y-scroll scrollbar-none px-5 py-4 rounded-md'>
                <div className='flex justify-between items-center pb-3'>
                    <h1 className='font-bold dark:text-white' style={{ fontSize: "20px" }}>Place Order for {orderProductId?.productName}</h1>
                    <div
                        className="w-fit text-2xl hover:text-red-600 cursor-pointer dark:text-white"
                        onClick={onClose}
                    >
                        <IoMdClose />
                    </div>
                </div>
                <form className='grid gap-2' onSubmit={handleSubmit}>
                    <label htmlFor="addedStockNumber" className='dark:text-white font-semibold'>Number of products:</label>
                    <input
                        type="number"
                        name="addedStockNumber"
                        id="addedStockNumber"
                        value={order.addedStockNumber || ""}
                        onChange={handleOnChange}
                        className='p-2 border rounded-md dark:bg-gray-700 dark:border-white-600 dark:text-white'
                    />

                    <label htmlFor="perProductPrice" className='dark:text-white font-semibold'>Price per order:</label>
                    <input
                        type="number"
                        name="perProductPrice"
                        id="perProductPrice"
                        value={order.perProductPrice || ""}
                        onChange={handleOnChange}
                        className='p-2 border rounded-md dark:bg-gray-700 dark:border-white-600 dark:text-white'
                    />
                    <button className='bg-blue-500 text-white py-3 rounded-md'>Place Order</button>
                </form>
            </div>
        </div>
    )
}

export default PlaceOrder
