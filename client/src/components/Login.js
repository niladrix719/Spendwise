import {useState, useEffect} from 'react';
import '../index.css';
import '../styles/Login.css';
import axios from "axios";

function Login()
{
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });



    const handleLogin = async (e) =>
    {
        e.preventDefault();
        try
        {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, loginData);
            localStorage.setItem('expenseTrackerUserToken', JSON.stringify(response.data.token));
            setInvalidEmail(false);
            setLoginData({
                email: '',
                password: ''
            });
            window.location.reload();
        }
        catch(error)
        {
            if (error.response.status === 401)
            {
                setInvalidEmail(true);
                console.error(error.response.data.message);
                return;
            }
            console.error(error.response.data.message);
        }
    }




    return(
        <div className="login_form_container">
            <form onSubmit={handleLogin} className='p-2 flex gap-2'>
                <input
                    type='email'
                    placeholder='Email'
                    value={loginData.email}
                    onChange={(e)=>setLoginData({...loginData, email: e.target.value})}
                    required
                    className='bg-transparent outline-none border-b-2 border-white'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={loginData.password}
                    onChange={(e)=>setLoginData({...loginData, password: e.target.value})}
                    required
                    className='bg-transparent outline-none border-b-2 border-white'
                />
                <button type='submit' className='p-2 bg-violet-500'>Log in</button>
            </form>
        </div>
    );
}

export default Login;