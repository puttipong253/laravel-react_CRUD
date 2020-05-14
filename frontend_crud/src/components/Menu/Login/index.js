import React, { useState } from 'react';
import Axios from '../../../api';

export default function Login(props) {
    const [login, setLogin] = useState({
        email:"",
        password:"",
    })
    const handleLogin = (e) =>{
        const newLogin = {...login}
        newLogin[e.target.name] = e.target.value
        setLogin(newLogin)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',login.email)
        formData.append('password',login.password)

        Axios.post('login/',formData)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('access_token', res.data.user.token);
            props.history.push('/')
        }).catch(error => {
            console.log(error)
            alert("รหัสผ่านไม่ถูกต้อง")
        })
    }

    const homePage = () => {
        props.history.push('/')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">อีเมล </label>  
                <input type="text" value={login.email} name="email" onChange={handleLogin}/>
            </div>
            <div>
                <label htmlFor="password">รหัสผ่าน </label> 
                <input type="password" value={login.password} name="password" onChange={handleLogin}/>
            </div>
                <button type="submit">ตกลง</button>
                <button type="submit" onClick={homePage}>กลับหน้าหลัก</button>
            </form>
        </div>
    )
}
