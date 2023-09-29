import React, { useContext, useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import { Navigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { Tweet } from "react-tweet"
import { serverTimestamp } from 'firebase/firestore';

const WriteForUs = () => {
  const { allcategory, addPost } = useContext(Context);
  const [postInfo, setInfo] = useState({
    title1: "",
    title2: "",
    content1: "",
    content2: "",
    imageUrl1: "",
    imageUrl2: "",
    category: "",
    youtubeLink: "",
    tweetId: "",
    tags: "",
    readTime: "",
  })
  function handleChange(e) {
    const { name, value } = e.target;
    setInfo({ ...postInfo, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const arr = postInfo.tags.toLocaleLowerCase().split(" ");
    const obj = { ...postInfo, tags: arr };
    obj.approved = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : false;
    obj.name = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "unknown";
    obj.userId = JSON.parse(localStorage.getItem("user")).userId;
    obj.email = JSON.parse(localStorage.getItem("user")).email;
    obj.time = serverTimestamp();
    obj.commments = [];
    addPost(obj);
  }
  return (
    <Layout>
      {!localStorage.getItem("user") && <Navigate to='/auth' />}
      <form className='p-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Title</label>
          <input value={postInfo.title1} onChange={handleChange} name='title1' type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Title Here" required />
        </div>
        <div>
          <label htmlFor="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Content 1</label>
          <textarea value={postInfo.content1} onChange={handleChange} name='content1' id="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        <div>
          <label htmlFor="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input value={postInfo.title2} onChange={handleChange} name='title2' type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Title Here" required />
        </div>

        <div>
          <label htmlFor="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Content 2</label>
          <textarea value={postInfo.content2} onChange={handleChange} name='content2' id="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        <div>
          <label htmlFor='imageUrl' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url 1</label>
          <input value={postInfo.imageUrl1} onChange={handleChange} name='imageUrl1' type="text" id="imageUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="imageUrl" required />
        </div>
        <div>
          <label htmlFor='imageUrl' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url 2</label>
          <input value={postInfo.imageUrl2} onChange={handleChange} name='imageUrl2' type="text" id="imageUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="imageUrl" required />
        </div>
        <div>
          <label htmlFor="category" class="block my-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
          <select onChange={handleChange} name='category' id="category" class="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Category</option>
            {
              allcategory && allcategory.map((item) => {
                return (<option value={item.name}>{item.name}</option>)
              })
            }
          </select>
        </div>
        <div className='my-2'>
          <label htmlFor='youtubeLink' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Youtube Video Link (Optional)</label>
          <input value={postInfo.youtubeLink} onChange={handleChange} name='youtubeLink' type="text" id="youtubeLink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Youtube Link" required />
        </div>
        <div className='my-2'>
          <label htmlFor='tweetId' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tweet Id (Optional)</label>
          <input value={postInfo.tweetId} onChange={handleChange} name='tweetId' type="text" id="tweetId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tweet Id" required />
        </div>
        <div className='my-2'>
          <label htmlFor='tags' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
          <input value={postInfo.tags} onChange={handleChange} name='tags' type="text" id="tweetId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Tags Seperated by space" required />
        </div>
        <div className='my-2'>
          <label htmlFor='readtime' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Read Time in mins</label>
          <input value={postInfo.readTime} onChange={handleChange} name='readTime' type="text" id="tweetId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Read Time In mins" required />
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>


    </Layout>
  )
}

export default WriteForUs

