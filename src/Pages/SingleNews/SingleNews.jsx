import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout';
import { Tweet } from 'react-tweet';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../Firebase/Config-file';
import { Context } from '../../Context/Context';

const SingleNews = () => {
    const { newsId } = useParams();
    const { setLoading } = useContext(Context);
    const [news, setNews] = useState(null);
    useEffect(() => {
        setLoading(true);
        (async () => {
            const collectionRef = doc(database, "posts", newsId);
            const data = await getDoc(collectionRef);
            console.log(data.data())
            setNews(data.data());
        })()
        setLoading(false);

    }, [newsId])
    return (
        <Layout>
            {news && <div>
                <div className='news md:px-96 px-7 text-sm md:text-lg'>
                    <img src={news.imageUrl1} className='h-[400px] w-screen mx-auto my-2' alt="news Image" />
                    <h1 className='text-xl md:text-4xl break-words pe-10 md:pe-20 text-start font-semibold'>{news.title1}</h1>
                    <p className='text-sm font-normal text-slate-500 my-2'>Read<span className='text-red-500 ps-1'>{news.readTime} min</span> </p>
                    <div className='content'>
                        <p className='font-normal my-10 text-slate-600 leading-7 md:text-lg text-sm tracking-wider'>{news.content1.split(" ").slice(0, 100).join(" ")}</p>
                        <p className='font-normal my-10 text-slate-600  leading-7 md:text-lg text-sm  tracking-wider'>{news.content1.split(" ").slice(100, 200).join(" ")}</p>
                        <p className='font-normal my-10 text-slate-600  leading-7 md:text-lg text-sm  tracking-wider'>{news.content1.split(" ").slice(200).join(" ")}</p>
                        {news.youtubeLink &&
                            <iframe className='mx-auto md:h-[300px] w-full' src="https://www.youtube.com/embed/r9jwGansp1E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        }
                        <p className='font-normal my-10 text-slate-600  leading-7 md:text-lg text-sm  tracking-wider'>{news.content2.split(" ").slice(0, 200).join(" ")}</p>
                        {news.tweetId && <div className='flex justify-center items-center '><Tweet id='1706929665729089548' /></div>}
                        <p className='font-normal my-10 text-slate-600  leading-7 md:text-lg text-sm  tracking-wider'>{news.content2.split(" ").slice(200, 300).join(" ")}</p>
                        <img src={news.imageUrl2} className='h-[400px] w-screen mx-auto my-2' alt="news Image" />
                        <p className='font-normal my-10 text-slate-600  leading-7 md:text-lg text-sm  tracking-wider'>{news.content2.split(" ").slice(300).join(" ")}</p>
                    </div>
                    <p className='text-xl font-normal text-slate-500 text-end'>Author :{news.name}</p>
                </div>
            </div>}
        </Layout>
    )
}

export default SingleNews






