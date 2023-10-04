import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout';
import { Tweet } from 'react-tweet';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../Firebase/Config-file';
import { Context } from '../../Context/Context';
import parse from "html-react-parser"

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
            {news && <div className='lg:px-56 md:px-28 px-10'>
               {parse(news.content)}
            </div>}
        </Layout>
    )
}

export default SingleNews






