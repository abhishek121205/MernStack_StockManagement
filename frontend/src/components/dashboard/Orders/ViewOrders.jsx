import React, { useEffect, useState } from 'react'
import { SummaryApi } from '../../../common/commonApi'
import moment from "moment"
import { useSelector } from 'react-redux';

const ViewOrders = () => {

  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state?.user)


  const fetchAllOrders = async () => {
    const apiData = await fetch(SummaryApi.getAllOrder.url, {
      method: SummaryApi.getAllOrder.method,
      credentials: "include"
    })
    const response = await apiData.json()
    if (response.success) {
      setOrders(response.data)
    }
    if (response.error) {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Orders</h2>
      <div>
        <div className='py-4 w-full'>
          {
            orders.map((val, index) => {
              return (
                <div key={val?.userId + val?._id} className='mb-3'>
                  <p className='font-medium text-lg dark:text-white'>{moment(val?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <div className='border rounded p-2 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                      <div className='grid gap-1'>
                        {
                          val?.productId.map((product, index) => {
                            return (
                              <div key={product._id + index} className='flex gap-3'>
                                <div>
                                  <div className='mt-1'>
                                    <h1 className='text-lg font-medium dark:text-gray-400'>Product Details :</h1>
                                    <p className='text-ellipsis line-clamp-1 ml-1 dark:text-white'>Product: <span className='font-medium dark:text-gray-400'>{product.productName}</span></p>
                                    <p className='ml-1 dark:text-white'>Price: <span className='text-red-500'>₹{product.productPrice}</span></p>
                                    <span className='ml-1 dark:text-white'>Available stock : {product.numberOfStock}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                      <div className='flex flex-col lg:gap-4 lg:p-2 min-w-[300px]'>
                        <div>
                          <h1 className='text-lg font-medium dark:text-gray-400 mt-2 lg:mt-0'>Order Details : </h1>
                          <span className='block ml-1 dark:text-white'>Ordered Stock : {val.addedStockNumber}</span>
                          <span className='block ml-1 dark:text-white'>Price per product : ₹{val.perProductPrice}</span>
                        </div>
                        <div>
                          <h1 className='text-lg font-medium dark:text-gray-400 mt-2 lg:mt-0'>User Details: </h1>
                          <span className='ml-1 dark:text-white'>Username : {currentUser.userName}</span>
                        </div>
                      </div>
                    </div>
                    <h1 className='font-semibold ml-auto w-fit lg:text-lg dark:text-gray-400 mt-2'>
                      Total order amount : <span className='dark:text-white'>{val.totalOrderAmount}</span>
                    </h1>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ViewOrders
