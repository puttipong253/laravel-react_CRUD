import React,{useState} from 'react';
import Axios from '../../../api';

export default function Register(props) {
    const [register, setRegister] = useState({
        name:"",
        email:"",
        password:"",
        c_password:""
    })
    const [avatar, setAvatar] = useState(null)

    const handleRegister = (e) =>{
        const newRegister = {...register}
        newRegister[e.target.name] = e.target.value
        setRegister(newRegister)
    }

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',register.name)
        formData.append('email',register.email)
        formData.append('password',register.password)
        formData.append('c_password',register.c_password)
        formData.append('avatar',avatar)

        Axios.post('register/',formData)
        .then(res => {
            console.log(res.data)
            alert("บันทึกข้อมูลเรียบร้อย")
            localStorage.setItem('access_token', res.data.user.token);
            props.history.push('/')
        })
    }

    const homePage = () => {
        props.history.push('/')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">ชื่อ </label> 
                <input type="text" value={register.name} name="name" onChange={handleRegister}/>
            </div>
            <div>
                <label htmlFor="email">อีเมล </label>  
                <input type="text" value={register.email} name="email" onChange={handleRegister}/>
            </div>
            <div>
                <label htmlFor="password">รหัสผ่าน </label> 
                <input type="password" value={register.password} name="password" onChange={handleRegister}/>
            </div>
            <div>
                <label htmlFor="c_password">ยืนยันรหัสผ่าน </label> 
                <input type="password" value={register.c_password} name="c_password" onChange={handleRegister}/>
            </div>
            <div>
                <label htmlFor="avatar">ยืนยันรหัสผ่าน </label> 
                <input type="file" name="avatar" onChange={handleAvatar}/>
            </div>
                <button type="submit">ตกลง</button>
                <button onClick={homePage}>กลับหน้าหลัก</button>
            </form>
            
        </div>
    )
}
