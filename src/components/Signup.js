import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
    let navigate = useNavigate()
    const handleSumbit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {

            //save the auth token and redirect
            localStorage.setItem('token', json.authToken)

            props.showAlert("Account Created Successfully", "success")
            navigate('/home')
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>

            <div className="text-center mt-5 mb-4">
                <h1>iNOTEBOOK</h1>
                <p>Your notes on cloud ☁️ </p>
            </div>

            <p className='text-center'>New to iNotebook? 👉🏻Create a new account here!</p>
            <div className='container'>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                    </div>
                    <div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        <br />
                        <p className='text-center last-para'>Already have an account? <Link to="/login">Login-&gt;</Link> </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup