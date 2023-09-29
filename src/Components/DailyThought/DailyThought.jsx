import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database } from '../../Firebase/Config-file'

const DailyThought = () => {
    useEffect(() => {
        (async () => {
            const collectionRef = collection(database, "thought");
            const q = query(collectionRef, orderBy("time", "desc"), limit(1));
            const data = await getDocs(q);
            const thought = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            })
            setState(thought[0]);
        })()

    }, [])
    const [state, setState] = useState(null);
    return (
        <div className='font-medium bg-red-400 font-serif p-2'>
            <p>  Today Thought
              <span className='ms-10'> {state && state.name}</span> </p>
        </div>
    )
}

export default DailyThought
