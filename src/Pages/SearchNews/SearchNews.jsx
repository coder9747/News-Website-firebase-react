import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Context } from '../../Context/Context';
import { Link } from 'react-router-dom';

const SearchNews = () => {
    const { searchNews,searchWithTags,setSearchNewsLastDoc,searchNewsLastDoc } = useContext(Context);
    function handleSearch()
    {
        setSearchNewsLastDoc(null);
        searchWithTags();  
    }
    return (
        <Layout>
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span class="absolute px-3 font-medium text-xl text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Search Results</span>
            </div>
            <div className="grid lg:grid-cols-4 gap-2 md:p-5 place-items-center md:grid-cols-2 grid-cols-1">
                {searchNews && searchNews.map((item) => {
                    return (
                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg" src={`${item.thumbnail}`} alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title.slice(0,100)}...</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description.slice(0,100)}...</p>
                                <Link  to={`/news/${item.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-red-500   dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    )
                })}
            </div>
{  searchNewsLastDoc &&           <button onClick={handleSearch} className="my-2 block mx-auto bg-red-500  rounded-sm p-2 ">Load More</button>
}        </Layout>
    )
}

export default SearchNews
