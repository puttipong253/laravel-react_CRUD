import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Index() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/customers')
            .then(res =>{
                const data = res.data;
                setData(data)
            })
    }, [])

    return (
        <div>
            {data.map(data => (
                <li>
                    {data.firstname}
                </li>
            ))}
        </div>
    )
}
