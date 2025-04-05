'use client';

import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

function AddProductsPage() {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennet',
    authorImg: '/logo.png',
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('authorImg', data.authorImg);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/blog', formData);
      
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennet",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error('Error uploading blog');
      }
    } catch (error) {
      toast.error('Failed to upload blog');
      console.error('Upload Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 ml-20 sm:ml-64 max-w-2xl">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? '/uploadImg.png' : URL.createObjectURL(image)}
            alt="upload image"
            width={140}
            height={100}
            className="mt-4"
          />
        </label>
        <input onChange={onImageChange} type="file" id="image" hidden required />

        {/* title */}
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="Type here"
          required
        />

        {/* description */}
        <p className="text-xl mt-4">Blog description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="Write description here!"
          required
        />

      

        {/* category */}
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-5 py-3 text-gray-500 border"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="LifeStyle">LifeStyle</option>
        </select>

        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
}

export default AddProductsPage;
