import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SummaryApi } from '../../../common/commonApi';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import PlaceOrder from '../Orders/PlaceOrder';

const ViewProducts = () => {

  const { currentUser } = useSelector((state) => state?.user)
  const [onClose, setOnClose] = useState(false)
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(false)
  const [editData, setEditData] = useState()
  const [placeOrder, setPlaceOrder] = useState(false)
  const [orderProductId, setOrderProductId] = useState()

  const fetchAllProducts = async () => {
    const apiData = await fetch(SummaryApi.getAllProduct.url, {
      method: SummaryApi.getAllProduct.method,
      credentials: "include"
    })
    const response = await apiData.json()
    if (response.success) {
      setProducts(response.data)
    }
    if (response.error) {
      toast.error(response.message)
    }
  }

  const deleteProduct = async (id) => {
    const apiData = await fetch(`${SummaryApi.deleteProduct.url}/${id}`, {
      method: SummaryApi.deleteProduct.method,
      credentials: "include"
    })
    const response = await apiData.json()
    if (response.success) {
      toast.success(response.message)
      fetchAllProducts()
    }
    if (response.error) {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className="">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Products</h2>
        <button onClick={() => setOnClose(true)} className='transition-all border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-1 px-3 rounded-full'>Upload product</button>
      </div>
      <div className='py-4'>
        <div className='products grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
          {
            products.map((val) => (
              <div key={val?._id + val?.userId} className='bg-white p-3 rounded-sm shadow-md text-center dark:bg-gray-800'>
                <h1 className='text-ellipsis line-clamp-1 text-lg dark:text-white'>{val?.productName}</h1>
                <span className='font-bold text-md inline-block mt-2 dark:text-white'>₹{val?.productPrice}</span>
                <p className='text-ellipsis line-clamp-2 text-sm dark:text-white'>{val?.productDescryption}</p>
                <div className={val?.stockManagement == true ? 'flex justify-between items-center mt-3' : 'flex justify-end items-center mt-3'}>
                  {
                    val?.stockManagement == true && (
                      <h2 className='dark:text-white'>Stock: {val?.numberOfStock}</h2>
                    )
                  }
                  <div className='flex gap-2'>
                    <div className='w-fit p-2 bg-green-100 dark:bg-green-300 dark:hover:text-white dark:hover:bg-green-600 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => {
                      setEditProduct(true)
                      setEditData(val)
                    }}>
                      <MdModeEditOutline />
                    </div>
                    <div className='w-fit p-2 bg-red-100 dark:bg-red-300 dark:hover:bg-red-600 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={() => deleteProduct(val?._id)}>
                      <MdDelete />
                    </div>
                    {
                      val?.stockManagement == true && (
                        <div className='w-fit p-2 bg-red-100 dark:bg-orange-300 dark:hover:bg-orange-600 hover:bg-orange-600 rounded-full hover:text-white cursor-pointer' onClick={() => {
                          setPlaceOrder(true)
                          setOrderProductId(val)
                        }}>
                          <FaCartPlus />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {
        onClose && (
          <AddProduct onClose={() => setOnClose(false)} fetchAllProducts={fetchAllProducts} />
        )
      }
      {
        editProduct && (
          <EditProduct onClose={() => setEditProduct(false)} fetchAllProducts={fetchAllProducts} productData={editData} />
        )
      }
      {
        placeOrder && (
          <PlaceOrder onClose={() => setPlaceOrder(false)} fetchAllProducts={fetchAllProducts} orderProductId={orderProductId} />
        )
      }
    </div>
  );
};

export default ViewProducts;