import React,{useState} from 'react'
import axios from 'axios'

export default function Create() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')

    const handleFirstname = (e) => {
        setFirstname(e.target.value)
    }
    const handleLastname = (e) => {
        setLastname(e.target.value)
    }
    const handleAge = (e) => {
        setAge(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePhonenumber = (e) => {
        setPhonenumber(e.target.value)
    }

    const onSubmit = (e) => {
        
        const customers = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            email: email,
            phonenumber: phonenumber
        }

        axios.post(`http://127.0.0.1:8000/api/customers`, customers)
            .then(res => {
                console.log(res);
            });
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
            firstname 
                <input type="text" value={firstname} onChange={handleFirstname}/>
            </div>
            <div>
            lastname 
                <input type="text" value={lastname} onChange={handleLastname}/>
            </div>
            <div>
            age 
                <input type="number" value={age} onChange={handleAge}/>
            </div>
            <div>
            email 
                <input type="email" value={email} onChange={handleEmail}/>
            </div>
            <div>
            phonenumber 
                <input type="number" value={phonenumber} onChange={handlePhonenumber}/>
            </div>
            <button type="submit">submit</button>
        </form>
    )
}
