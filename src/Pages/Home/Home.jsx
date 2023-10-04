import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import { Context } from '../../Context/Context';
import { Card } from 'flowbite-react';
import { Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import parse from "html-react-parser"
import NewsCardComponents from '../../Components/NewsCardComponents/NewsCardComponents';


const Home = () => {
  
  const { allPost, getAllPosts, carsoleNews, searchNews } = useContext(Context);
  console.log(allPost);
  return (
    <Layout>
      {!searchNews ? <div className='home p-5 md:p-10 font-semibold '>
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Trending News</span>
        </div>

        <div className='grid  grid-col-1  px-4 my-10'>
          <Carousel className='md:h-[400px] h-[300px] ' slideInterval={1000} >
            {
              carsoleNews && carsoleNews.map((item) => {
                return (<div className='relative border h-full border-green-800'>
                  <Link to={`/news/${item.id}`} className='absolute inset-0 bg-black opacity-20'>

                  </Link>
                  <img
                    alt="..."
                    className='w-full h-full'
                    src={item.thumbnail}
                  />
                  <div
                    class="absolute inset-x-[15%] bottom-5  hidden  py-5 text-center text-white md:block">
                    <h5 class="text-xl">{item.title}</h5>
                    <p>
                      {item.description.slice(0, 50)}
                    </p>
                  </div>
                </div>)
              })
            }
          </Carousel>
        </div>
        <div className='news-today border px-2'>
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">New Today</span>
          </div>
          <div className="news-list-grid  grid lg:grid-cols-3 gap-2 grid-cols-2 md:grid-cols-2 place-items-center ">
            {allPost && allPost.map((item) => {
              return (
                <NewsCardComponents {...item}/>
              )
            })}
          </div>
          <button className='min-w-full h-10 text-red-600' onClick={() => getAllPosts()}>Load More</button>
        </div>

      </div>
        :
        <div className='p-5 md:p-10'>
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Searched Result</span>
          </div>        <div className="news-list-grid  grid lg:grid-cols-4 gap-2 grid-cols-1 md:grid-cols-2 place-items-center ">
            {
              searchNews.map((item) => {
                return (<Link to={`/news/${item.id}`} class="md:max-w-sm max-w-xs   bg-white border mx-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className='w-full m-w-full h-[200px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzsBeAeL9K0wXeBjImXYijdHc6VYKXHz7FUyNa2N0yFQ&s" alt="" />
                  </a>
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:text-red-600 rounded-lg text-red-400    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </Link>)
              })
            }
          </div>
       {searchNews.length!=0 &&    <button className='block p-3 text-white rounded-xl mx-auto mt-5 bg-red-600'>
            Load More
          </button>}
        </div>
      }
    </Layout>
  )
}

export default Home
