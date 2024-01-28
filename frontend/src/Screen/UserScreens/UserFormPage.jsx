import React, { useEffect, useState } from 'react'
import "./UserFormPage.css"
import axios from 'axios';

const UserFormPage = ({url="something",type="login"}) => {
    const [error,setError] = useState("")
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    });
    const handleChange = (e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
        const response = await axios.post(url,inputs)
        }catch(err){
            setError()
        }

    }
    useEffect(()=>console.log(inputs),[inputs])
  return (
    <section className='user-form-container'>
        <div className='user-form-form-container'>
            <div className="form-heading">{type}</div>
            <form action="" className='form' onSubmit={handleSubmit}>
                <div className='user-form-input-outline'>
                    <div className="input-heading">Email</div>
                    <input name='email' type="email" className='inputfield' onChange={handleChange}/>
                </div>
                <div className='user-form-input-outline'>
                    <div className="input-heading">Password</div>
                    <input name='password' type="password" className='inputfield'onChange={handleChange}/>
                </div>
                <div className='btn-container'>
                    <button className='form-btn' type='submit'>{type}</button>
                    <span className='link'>{type==="login"?"Don't have account?":"Have account?"}<a href="">{type==="login"?"signup":"login"}</a></span>
                </div>
                
            </form>
        </div>
    </section>
  )
}

export default UserFormPage