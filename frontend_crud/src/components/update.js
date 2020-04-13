import React,{useState, useEffect} from 'react'
import Axios from '../api'

export default function Update(props) {

    const [data, setData] = useState({
        firstname:"",
        lastname:"",
        age:"",
        email:"",
        phonenumber:""
    })

    useEffect(() => {
        const id = props.match.params.id
        Axios.get(`api/customers/`+id)
            .then(res =>{
                console.log(res.data)
                setData(res.data)
            })
    }, [props])

    const handle = (e) => {
        const newData = {...data}
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const id = props.match.params.id
        Axios.put(`api/customers/`+id,data)
            .then(res => {
                console.log(res.data);
                props.history.push("/")
            });
    }

    const homePage = (e) => {
        props.history.push("/")
    }

    return (
        <div>
           <form onSubmit={onSubmit}>
           <div>
                <label htmlFor="firstname">ชื่อ </label> 
                <input type="text" value={data.firstname} name="firstname" onChange={handle}/>
            </div>
            <div>
                <label htmlFor="lastname">นามสกุล </label>  
                <input type="text" value={data.lastname} name="lastname" onChange={handle}/>
            </div>
            <div>
                <label htmlFor="age">อายุ </label> 
                <input type="number" value={data.age} name="age" onChange={handle}/>
            </div>
            <div>
                <label htmlFor="email">อีเมล </label> 
                <input type="email" value={data.email} name="email" onChange={handle}/>
            </div>
            <div>
                <label htmlFor="phonenumber">เบอร์โทรศัพท์ </label> 
                <input type="number" value={data.phonenumber} name="phonenumber" onChange={handle}/>
            </div>
            <button type="submit">ตกลง</button>
            <button type="submit" onClick={homePage}>กลับหน้าหลัก</button>
        </form>
        </div>
    )
}
