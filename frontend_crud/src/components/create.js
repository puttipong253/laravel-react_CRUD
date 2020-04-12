import React,{useState} from 'react'
import API from '../api'

export default function Create(props) {

    const [data, setData] = useState({
        firstname:"",
        lastname:"",
        age:"",
        email:"",
        phonenumber:""
    })

    const handle = (e) => {
        const newData = {...data}
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        API.post(`api/customers/`, data)
            .then(res => {
                console.log(res.data);
            });
    }

    const onSubmitHome = (e) => {
        props.history.push("/")
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
            firstname 
                <input type="text" value={data.firstname} name="firstname" onChange={handle}/>
            </div>
            <div>
            lastname 
                <input type="text" value={data.lastname} name="lastname" onChange={handle}/>
            </div>
            <div>
            age 
                <input type="number" value={data.age} name="age" onChange={handle}/>
            </div>
            <div>
            email 
                <input type="email" value={data.email} name="email" onChange={handle}/>
            </div>
            <div>
            phonenumber 
                <input type="number" value={data.phonenumber} name="phonenumber" onChange={handle}/>
            </div>
            <button type="submit">submit</button>
            <button type="submit" onClick={onSubmitHome}>home</button>
        </form>
    )
}
