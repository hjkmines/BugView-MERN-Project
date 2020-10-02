import userEvent from '@testing-library/user-event';
import React, { useContext, useRef, useEffect, useState, useLayoutEffect } from 'react'; 
import { Link, useHistory } from 'react-router-dom'; 
import { UserContext } from '../App'; 
import M from 'materialize-css'; 
import { Button, Dropdown } from 'react-materialize';


const Navbar = () => {
    const history = useHistory(); 
    const searchModal = useRef(null); 
    const [search, setSearch] = useState('');
    const [userDetails, setUserDetails] = useState([]); 
    const { state, dispatch } = useContext(UserContext); 

    useEffect(() => {
        M.Modal.init(searchModal.current)
    })

    const renderedList = () => {
        
        if(state) {
            return [
            
                <li key='1'><Link to="/profile" className='link-title'>My Profile</Link></li>, 
                <li key='2'><Link to="/myfollowerspost" className='link-title'>My Team's Tickets</Link></li>, 
                <li key='3'><Link to="/alltickets" className='link-title'>All Tickets</Link></li>, 
                <li key='4'><Link to="/createpost" className='link-title'>Create New Ticket</Link></li>,
                <li key='5'>
                    <button 
                        className='btn #c62828 red darken-3' 
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: 'CLEAR' })
                            history.push('/login')
                        }}
                        style={{ marginRight: '25px' }}
                    >
                        Log Out
                    </button>
                </li>
            ]
        } else {
            return [
                <li key='6'><Link to="/login" className='link-title'>Log In</Link></li>,
                <li key='7'><Link to="/signup" className='link-title'>Register</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {

        setSearch(query)

        fetch('/search', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                query
            })
        }).then( res => res.json())
        .then(results => {
            setUserDetails(results.user)
        })
    }

    return (
        <div>
            <nav className='navigation'>
                <div class="nav-wrapper">
                    <Link to={ state ? "/" : "/login" } className="brand-logo left" style={{ marginLeft: '20px' }}><i className='large material-icons'>bug_report</i>BugView</Link>
                        <ul id="nav-mobile" className="right menu">
                        {window.innerWidth < 960 ?  
                            <Dropdown
                                id="Dropdown_6"
                                options={{
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    container: null,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 250
                                }}
                                trigger={<Button style={{marginRight: '20px'}} node="button">Options</Button>}
                                >
                                {renderedList()}
                            </Dropdown>
                            : 
                            renderedList()
                        }
                        </ul>
                </div>
                <div 
                    id="modal1" 
                    className="modal" 
                    ref={searchModal}
                    style={{ color: 'black' }}
                >
                    <div className="modal-content">
                    <input 
                        type='text'
                        placeholder='Search Users'
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {
                        userDetails.map( item => {
                            return <Link to={item._id !== state._id ? '/profile/' + item._id : '/profile'} onClick={() => {
                                M.Modal.getInstance(searchModal.current).close()
                                setSearch('')
                            }}><li className="collection-item">{item.email}</li></Link>
                        })
                        }
                    </ul>
                    </div>
                <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>Search</button>
                </div>
                </div>
            </nav>
        </div>
    )
}; 

export default Navbar; 