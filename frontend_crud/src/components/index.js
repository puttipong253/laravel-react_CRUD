import React, { useState, useEffect } from 'react'
import Axios from '../api'

export default function Index(props) {
    
    const [data, setData] = useState([])

    useEffect(() => {
        Axios.get(`api/customers/`)
            .then(res =>{
                setData(res.data)
            })
    }, [])

    const onUpdate = (id) => {
        console.log(id)
        props.history.push("/update/"+id)
    }

    const onRemove = (id) => {
        Axios.delete(`api/customers/`+id)
        .then(res=>{
            console.log(res.data)
            const myData = data.filter(item=>item.id !== id)
            setData(myData)
        })
    }

    const onCreate = () => {
        props.history.push("/create/")
    }

    return (
        <div>
            {data.map(data => (
                <table>
                    <tbody>
                        <tr key={data.id}>
                            <td>{data.firstname}</td>
                            <td><button onClick={() => onUpdate(data.id)}>edit</button></td>
                            <td><button onClick={() => { if (window.confirm('Are you sure you want delete this item?')) onRemove(data.id)} }>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            ))}
            <button onClick={onCreate}>Create</button>
        </div>
    )
}
