import React,{useState, useEffect} from 'react'
import API from '../api'

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
        API.get(`api/customers/`+id)
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
        API.put(`api/customers/`+id,data)
            .then(res => {
                console.log(res.data);
                props.history.push("/")
            });
        
    }

    return (
        <div>
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
                <input type="number" value={data.phonenumber} name="phonenumber"  onChange={handle}/>
            </div>
            <button type="submit">submit</button>
        </form> 
        </div>
    )
}
