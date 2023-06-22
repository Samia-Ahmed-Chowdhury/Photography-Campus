import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { imageUpload } from '../../../api/imageUp';

function AddClass() {

  const { userName, userEmail } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure()

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => {
    //image upload
    const image = data.img[0]
    imageUpload(image).then(imgLink => {
      const { img,price,availableSeats ,...restData } = data
      const saveClass = { instructorName: userName, instructorEmail: userEmail, classImage: imgLink,price:+price,availableSeats:+availableSeats, ...restData }
      console.log(saveClass)
      axiosSecure.post('/add_class', saveClass)
        .then(data => {
          console.log(data)
          if (data.data?.insertedId) {
            Swal.fire(
              'Good job!',
              'Added Successfully (^_^)',
              'success'
            )
            navigate('/dashboard/my_classes')
          }
        })
    })
  }

  return(
  <form onSubmit={handleSubmit(onSubmit)} className="card lg:w-[60%] mx-5 shadow-2xl bg-base-100 lg:mx-auto mt-8 mb-10">
    <h2 className='text-center text-3xl font-medium mt-8 mb-2'>Add New Class </h2>
    <div className="card-body">
      <div className='flex flex-col lg:flex-row justify-between gap-5'>
        <div className="form-control w-full">
          <input type="text" defaultValue={userName} className="bg-primaryColor text-white font-medium input input-bordered" readOnly />
        </div>
        <div className="form-control w-full">
          <input type="text" defaultValue={userEmail} className="bg-primaryColor text-white font-medium input input-bordered" readOnly />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Photo URl</span>
        </label>
        <input type="file"  {...register("img", { required: true })} name='img' placeholder="Enter Photo url" className="file-input file-input-bordered file-input-error w-full max-w-xs" />
        {errors.img?.type === 'required' && <p role="alert" className='text-red-700'> Image is required</p>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Class Name</span>
        </label>
        <input type="text" {...register("className", { required: true })} name='className' placeholder="Enter Toy Name" className="input input-bordered" />
        {errors.className?.type === 'required' && <p role="alert" className='text-red-700'> class Name is required</p>}
      </div>
      
      <div className='flex flex-col lg:flex-row justify-between gap-5'>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Available Seats</span>
          </label>
          <input type="number" {...register('availableSeats', { required: true })} name='availableSeats' placeholder="Enter Available quantity" className="input input-bordered" />
          {errors.availableSeats?.type === 'required' && <p role="alert" className='text-red-700'>availableSeats is required</p>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="text"  {...register('price', { required: true })} name='price' placeholder="Enter Price" className="input input-bordered" />
          {errors.price?.type === 'required' && <p role="alert" className='text-red-700'>price is required</p>}
        </div>
      </div>

      <div className="form-control  mt-6">
        <button className="btn bg-primaryColor text-white border-0">Add Class</button>
      </div>
    </div>
  </form>
  )
}

export default AddClass