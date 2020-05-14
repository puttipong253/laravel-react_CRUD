import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Axios from '../../../api';

import { Button, DeleteButton, EditButton, Warpper } from './index.view'

export default function Home(props) {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('access_token');
    
    useEffect(() => {
      if (token) {
        Axios.get(`product/`)
            .then(res => {
              setProduct(res.data)
              setLoading(false)
            })
      }else{
        props.history.push('/login')
      }
        
    }, [token,props])

    const onUpdate = (id) => {
        props.history.push("/update/"+id)
    }

    const onRemove = (id) => {
        Axios.delete(`product/`+id)
        .then(res=>{
            console.log(res.data)
            const myProduct = product.filter(item=>item.id !== id)
            setProduct(myProduct)
        })
    }

    const onCreate = () => {
        props.history.push("/create/")
    }

    const onLogout = () => {
      localStorage.removeItem('access_token')
      props.history.push("/login")
  }

    const columns = [
        {
          name: 'ชื่อ',
          selector: 'fishing_name',
          sortable: true,
        },
        {
          name: 'ประเภท',
          selector: 'type',
          sortable: true,
        },
        {
          name: 'ราคา',
          selector: 'price',
          sortable: true,
        },
        {
          name: 'รูปภาพ',
          cell: row => (<img src={"http://127.0.0.1:8000/storage/"+row.image} alt={row.id} width="80px" />),
          center: true,
        },
        {
          name: 'แก้ไข',
          center: true,
          cell: row => <EditButton onClick={() => onUpdate(row.id)}>แก้ไข</EditButton>
        },
        {
          name: 'ลบ',
          center: true,
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
                    data={product}
                    />
                    <Button onClick={onCreate}>Create</Button> 
                    <Button onClick={onLogout}>Logout</Button> 
                </Warpper>
            )}
        </div>
    )
}
