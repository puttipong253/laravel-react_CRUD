import React, { useState, useEffect } from 'react'
import Axios from '../../api'

import { Button } from './index.view'

export default function Home(props) {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get(`api/customers/`)
            .then(res =>{
                setData(res.data)
                setLoading(false)
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
            {loading ? ("Loading...") : (
                <div>
                    <table width="100%" >
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>อายุ</th>
                                <th>อีเมล</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>แก้ไข</th>
                                <th>ลบ</th>
                            </tr>
                        </thead>
                            {data.map((item,i) => (
                            <tbody key={i}>
                                <tr>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.age}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phonenumber}</td>
                                    <td><button onClick={() => onUpdate(item.id)}>edit</button></td>
                                    <td><button onClick={() => { if (window.confirm('Are you sure you want delete this item?')) onRemove(data.id)} }>Delete</button></td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <Button onClick={onCreate}>Create</Button> 
                </div>
            )}
        </div>
    )
}
