import React, { useState, useContext } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import { UserContext } from '../../App'; 
import M from 'materialize-css'; 

const Login = () => {
    const { state, dispatch } = useContext(UserContext); 
    const history = useHistory(); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: 'Invalid email', classes: '#c62828 red darken-3' })
            return 
        }

        fetch('/signin', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email, 
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log(data)
                M.toast({ html: data.error, classes: '#c62828 red darken-3' })
            } else {
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({ type: 'USER', payload: data.user })
                M.toast({ html: 'Signed In Successfully', classes: '#43a047 green darken-1' })
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='mycard auth'>
        <div className='card auth-card input field'>
            <h2 className='company-name'><i className='large material-icons'>bug_report</i><span>BugView</span></h2>
            <input 
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                onClick={() => PostData()}
                style={{ marginTop: '20px', marginBottom: '20px' }}
            >
                Log In 
            </button>
            <h5>
                <Link to='/signup'>Need an account?</Link>
            </h5>
            <h5>
                {/* <Link to='/reset'>Forgot your password?</Link> */}
            </h5>
        </div>
        <div className='auth1'>

        </div>
        </div>
    )
}; 

export default Login; 