import React, {useState, useEffect} from 'react'
import API from '../api'

export default function Index(props) {
    
    const [data, setData] = useState([])

    useEffect(() => {
        API.get(`api/customers/`)
            .then(res =>{
                const data = res.data;
                setData(data)
            })
    }, [])

    const handleOnclickEdit = (id) => {
        console.log(id)
        props.history.push("/update/"+id)
    }

    const onRemove = (id) => {
        API.delete(`api/customers/`+id)
        .then(res=>{
            console.log(res.data)
            const myData = data.filter(item=>item.id !== id)
            setData(myData)
        })
    }

    return (
        <div>
            {data.map(data => (
                <tr key={data.id}>
                    <td>
                        {data.firstname}
                        <button onClick={()=>handleOnclickEdit(data.id)}>edit</button>
                        <button onClick={() => { if (window.confirm('Are you sure you want delete this item?')) onRemove(data.id)} }>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </div>
    )
}
