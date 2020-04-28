import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import Axios from '../../api'

import { Button, DeleteButton, EditButton, Warpper } from './index.view'

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

    const columns = [
        {
          name: 'ชื่อ',
          selector: 'firstname',
          sortable: true,
        },
        {
          name: 'นามสกุล',
          selector: 'lastname',
          sortable: true,
        },
        {
          name: 'อายุ',
          selector: 'age',
          sortable: true,
        },
        {
          name: 'อีเมล',
          selector: 'email',
          sortable: true,
        },
        {
          name: 'เบอร์โทรศัพท์',
          selector: 'phonenumber',
          sortable: true,
        },
        {
          name: 'แก้ไข',
          cell: row => <EditButton onClick={() => onUpdate(row.id)}>แก้ไข</EditButton>
        },
        {
          name: 'ลบ',
          cell: row => <DeleteButton onClick={() => { if (window.confirm('Are you sure you want delete this item?')) onRemove(row.id)} }>ลบ</DeleteButton>
        }
      ];

    return (
        <div>
            {loading ? ("Loading...") : (
                <Warpper>
                    <DataTable
                    title="Customer"
                    columns={columns}
                    data={data}
                    />
                    <Button onClick={onCreate}>Create</Button> 
                </Warpper>
            )}
        </div>
    )
}
