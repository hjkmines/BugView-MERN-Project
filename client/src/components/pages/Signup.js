import React, { useState, useEffect } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import M from 'materialize-css'; 

const Signup = () => {
    const history = useHistory(); 
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLasttName] = useState(''); 
    const [jobTitle, setJobTitle] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [image, setImage] = useState('') ;
    const [url, setUrl] = useState(undefined); 

    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])

    const uploadImage = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'bugview')
        data.append('cloud_name', 'tk23')
        fetch('https://api.cloudinary.com/v1_1/tk23/image/upload', {
            method: 'POST', 
            body: data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const uploadFields = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: 'Invalid email', classes: '#c62828 red darken-3' })
            return 
        }

        fetch('/signup', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                firstName, 
                lastName, 
                jobTitle, 
                email, 
                password, 
                image: url
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                M.toast({ html: data.error, classes: '#c62828 red darken-3' })
            } else {
                M.toast({ html: data.message, classes: '#43a047 green darken-1' })
                history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const PostData = () => {
        if (image) {
            uploadImage()
        } else {
            uploadFields()
        }
        
    }

    return (
        <div className='mycard auth'>
        <div className='card auth-card input field'>
            <h2 className='company-name'><i className='large material-icons'>bug_report</i><span>BugView</span></h2>
            <input 
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLasttName(e.target.value)}
            />
            <input 
                type='text'
                placeholder='Job Title'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />
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
            <div className='file-field input-field'>
            <div className='btn #64b5f6 blue darken-1'>
                <span>Upload Profile Picture</span>
                <input type='file' onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className='file-path-wrapper'>
                <input className='file-path validate' type='text' />
            </div>
            </div>
            <button 
                className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                onClick={() => PostData()}
                style={{ marginTop: '20px', marginBottom: '20px' }}
            >
                Register
            </button>
            <h5>
                <Link to='/login'>Already have an account?</Link>
            </h5>
        </div>
        </div>
    )
}; 

export default Signup; 