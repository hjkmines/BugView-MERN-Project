import React, { useState, useEffect, useContext, useCallback } from 'react'; 
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom'; 
import 'materialize-css';
import { useHistory } from 'react-router-dom'; 
import M from 'materialize-css'; 
import { Button, Modal, Select } from 'react-materialize';

const Home = () => {
    const [data, setData] = useState([]); 
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory(); 
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState(''); 
    const [due, setDue] = useState(''); 
    const [github, setGithub] = useState(''); 
    const [teamMembers, setTeamMembers] = useState(''); 
    const [severity, setSeverity] = useState(''); 
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch('/getsubpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts)
        })
    }, [])

    const updateDetails = () => {

        fetch('/createpost', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                title, 
                body, 
                due, 
                github, 
                teamMembers, 
                severity, 
                status
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log(data)
                M.toast({ html: data.error, classes: '#c62828 red darken-3' })
            } else {
                M.toast({ html: 'Ticket Submitted Successfully', classes: '#43a047 green darken-1' })
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const likePost = (id) => {
        fetch('/like', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                postId: id 
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id) {
                    return result 
                } else {
                    return item 
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }, 
            body: JSON.stringify({
                postId, 
                text
            })
        }).then(res => res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id == result._id) {
                    return result 
                } else {
                    return item 
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: 'DELETE', 
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id 
            })
            setData(newData)
        })
    }

    return (
        <div className='home'>
            {
                data.map( item => {
                    return (
                        <div className='card home-card' key={item._id}>
                        <div style={{ textAlign: 'center', backgroundColor: item.severity === 'High' ? 'red' : item.severity === 'Moderate' ? 'green' : item.severity === 'Low' ? 'yellow' : null, height: '25px' }}><span><strong>Ticket #: </strong>{item._id}</span></div>
                            <h5 style={{ textAlign: 'center' }}>{item.title}</h5> 
                            <h5 style={{ marginLeft: '10px', textAlign: 'center' }}><strong>Posted By: </strong><Link to={item.postedBy._id !== state._id ? ('/profile/' + item.postedBy._id) : '/profile' }>{item.postedBy.firstName} {item.postedBy.lastName}</Link> {item.postedBy._id == state._id 
                            && <i 
                                className="material-icons" 
                                style={{ float: 'right' }}
                                onClick={() => deletePost(item._id)}
                                >
                                delete
                            </i>
                            
                            }</h5>
                            <h6 style={{textAlign: 'center'}}><strong>Posted At: </strong>{(item.createdAt).toString().split('').slice(11,19)} {(item.createdAt).toString().split('').slice(0,10)}</h6>
                                <h6 style={{textAlign: 'center'}}><strong>Last Update: </strong>{(item.updatedAt).toString().split('').slice(11,19)} {(item.updatedAt).toString().split('').slice(0,10)}</h6>
                                <br/>
                                <h6 style={{textAlign: 'center'}}><strong>Status: </strong>{item.status === 'Pending' ? <span>⌛</span> : item.status === 'Completed' ? <span>✔️</span> : null} {item.status}</h6>
                                <Modal
                                    actions={[
                                        <Button flat modal="close" node="button" waves="green">Close</Button>
                                    ]}
                                    style={{textAlign: 'center', height: '700px'}}
                                    bottomSheet={false}
                                    fixedFooter
                                    header="Update Ticket"
                                    id="Modal-0"
                                    open={false}
                                    options={{
                                        dismissible: true,
                                        endingTop: '10%',
                                        inDuration: 250,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        opacity: 0.5,
                                        outDuration: 250,
                                        preventScrolling: true,
                                        startingTop: '4%'
                                    }}
                                    // root={[object HTMLBodyElement]}
                                    trigger={<div style={{ display: 'flex', justifyContent: 'center' }}><Button node="button">Update Ticket</Button></div>}
                                    >
                                

                                    <div 
                                    className='card input-filled'
                                    style={{
                                        margin: '30px auto', 
                                        maxWidth: '1200px', 
                                        padding: '20px', 
                                        textAlign: 'center', 
                                        marginTop: '25px'
                                    }}
                                >
                                    {/* <div style={{fontSize: '30px', marginBottom: '10px'}}><strong>Update Ticket</strong></div> */}
                                    <input 
                                        type='text' 
                                        // placeholder={item.due}
                                        // default={item.due}
                                        value={item.due !== due ? item.due : due}
                                        onChange={(e) => setDue(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    /> 
                                    <input 
                                        type='text' 
                                        value={item.title !== title ? item.title : title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    />
                                    <input 
                                        type='text' 
                                        value={item.body !== body ? item.body : body}
                                        onChange={(e) => setBody(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    />
                                    <input 
                                        type='text' 
                                        value={item.github !== github ? item.github : github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        style={{marginBottom: '25px'}}
                                    />
                                    <input 
                                        type='text' 
                                        placeholder={item.teamMembers}
                                        value={item.teamMembers !== teamMembers ? item.teamMembers : teamMembers}
                                        onChange={(e) => setTeamMembers(e.target.value)}
                                        style={{marginBottom: '10px'}}
                                    />
                                        <Select
                                            id="Select-9"
                                            style={{marginBottom: '25px'}}
                                            multiple={false}
                                            onChange={function noRefCheck(){}}
                                            options={{
                                                classes: '',
                                                dropdownOptions: {
                                                alignment: 'left',
                                                autoTrigger: true,
                                                closeOnClick: true,
                                                constrainWidth: true,
                                                coverTrigger: true,
                                                hover: false,
                                                inDuration: 150,
                                                onCloseEnd: null,
                                                onCloseStart: null,
                                                onOpenEnd: null,
                                                onOpenStart: null,
                                                outDuration: 250
                                                }
                                            }}
                                            value=""
                                            value={severity}
                                            onChange={(e) => setSeverity(e.target.value)}
                                            >
                                            <option
                                                disabled
                                                value=""
                                            >
                                             {item.severity !== severity ? item.severity : severity}
                                            </option>
                                            <option value="High">🔴 High</option>
                                            <option value="Moderate">🟢 Moderate</option>
                                            <option value="Low">🟡 Low</option>
                                        </Select>
                                        <Select
                                            id="Select-9"
                                            style={{marginBottom: '25px'}}
                                            multiple={false}
                                            onChange={function noRefCheck(){}}
                                            options={{
                                                classes: '',
                                                dropdownOptions: {
                                                alignment: 'left',
                                                autoTrigger: true,
                                                closeOnClick: true,
                                                constrainWidth: true,
                                                coverTrigger: true,
                                                hover: false,
                                                inDuration: 150,
                                                onCloseEnd: null,
                                                onCloseStart: null,
                                                onOpenEnd: null,
                                                onOpenStart: null,
                                                outDuration: 250
                                                }
                                            }}
                                            value=""
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            >
                                            <option
                                                disabled
                                                value=""
                                            >
                                             {item.status !== status ? item.status : status}
                                            </option>
                                            <option value="Pending">⌛ Pending</option>
                                            <option value="Completed">✔️ Completed</option>
                                        </Select>
                                    <button 
                                        className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                                        onClick={() => updateDetails()}
                                    >
                                        Submit Ticket 
                                    </button>
                                </div>
                                </Modal>
                            <div className='card-image'>
                            </div>
                            <div className='card-content' style={{paddingTop: '0'}}>
                                <h6><strong>Deadline: </strong>{item.due}</h6>
                                <h6><strong>Source Code: </strong><a href={item.github}>{item.github}</a></h6>
                                <h6><strong>Severity: </strong>{item.severity} {item.severity === 'High' ? <span>🔴</span> : item.severity === 'Moderate' ? <span>🟢</span> : item.severity === 'Low' ? <span>🟡</span> : null}</h6>
                                <h6><strong>Team Members: </strong>{item.teamMembers}</h6>
                                <h6><strong>Ticket Summary: </strong>{item.body}</h6>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder='Add a comment' /> 
                                </form>
                                <Modal
                                    actions={[
                                        <Button flat modal="close" node="button" waves="green">Close</Button>
                                    ]}
                                    bottomSheet={false}
                                    fixedFooter
                                    header="Comments"
                                    style={{marginBottom: '20px'}}
                                    id="Modal-0"
                                    open={false}
                                    options={{
                                        dismissible: true,
                                        endingTop: '10%',
                                        inDuration: 250,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        opacity: 0.5,
                                        outDuration: 250,
                                        preventScrolling: true,
                                        startingTop: '4%'
                                    }}
                                    // root={[object HTMLBodyElement]}
                                    trigger={<div style={{ display: 'flex', justifyContent: 'center' }}><Button node="button">{item.comments.length} Comments</Button></div>}
                                    >
                                    {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{ fontWeight: '500', marginTop: '10px', marginBottom: '10px' }}>{record.postedBy.firstName} {record.postedBy.lastName}: </span>{record.text}</h6>
                                        )
                                    })
                                    }
                                </Modal>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}; 

export default Home; 