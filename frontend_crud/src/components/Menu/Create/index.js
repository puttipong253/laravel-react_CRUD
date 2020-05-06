import React, { useState } from 'react'
import Axios from '../../../api'

export default function Create(props) {

    const [product, setProduct] = useState({
        fishing_name:"",
        type:"",
        price:"",
    })

    const [image, setImage] = useState(null)

    const handleData = (e) => {
        const newProduct = {...product}
        newProduct[e.target.name] = e.target.value
        setProduct(newProduct)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('fishing_name', product.fishing_name)
        formData.append('type', product.type)
        formData.append('price', product.price)
        formData.append('image', image)
        
        Axios.post(`product/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res);
                alert("บันทึกข้อมูลเรียบร้อย");
                props.history.push("/")
            });
    }

    const homePage = (e) => {
        props.history.push("/")
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">ชื่อ </label> 
                <input type="text" value={product.fishing_name} name="fishing_name" onChange={handleData}/>
            </div>
            <div>
                <label htmlFor="type">ประเภท </label>  
                <input type="text" value={product.type} name="type" onChange={handleData}/>
            </div>
            <div>
                <label htmlFor="price">ราคา </label> 
                <input type="number" value={product.price} name="price" onChange={handleData}/>
            </div>
            <div>
                <label htmlFor="image">รูปภาพ </label> 
                <input type="file" name="image" onChange={handleImage}/>
            </div>
            <button type="submit">ตกลง</button>
            <button type="submit" onClick={homePage}>กลับหน้าหลัก</button>
        </form>
    )
}
