import React, { useState, useEffect } from 'react'; 
import M from 'materialize-css'; 
import { useHistory } from 'react-router-dom'; 
import 'materialize-css';
import { Select } from 'react-materialize';
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';



const CreatePost = () => {
    const history = useHistory(); 
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState(''); 
    const [due, setDue] = useState(''); 
    const [github, setGithub] = useState(''); 
    const [teamMembers, setTeamMembers] = useState(''); 
    const [severity, setSeverity] = useState(''); 
    const [status, setStatus] = useState(''); 
    const [language, setLanguage] = useState(''); 
    const [framework, setFramework] = useState(''); 

    //     // The first commit of Material-UI
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const postDetails = () => {

        fetch('/createpost', {
            method: 'POST', 
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
                status, 
                language, 
                framework
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

    return (
        <div 
            className='card input-filled'
            style={{
                margin: '30px auto', 
                maxWidth: '1200px', 
                padding: '20px', 
                textAlign: 'center', 
                marginTop: '100px'
            }}
        >
            <div style={{fontSize: '30px', marginBottom: '10px'}}><strong>Create New Ticket</strong></div>
            <input 
                type='text' 
                placeholder='Due Date' 
                value={due}
                onChange={(e) => setDue(e.target.value)}
                style={{marginBottom: '25px'}}
            /> 
            <input 
                type='text' 
                placeholder='Title' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{marginBottom: '25px'}}
            />
            <input 
                type='text' 
                placeholder='Description' 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{marginBottom: '25px'}}
            />
            <input 
                type='text' 
                placeholder='GitHub Link' 
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                style={{marginBottom: '25px'}}
            />
            <input 
                type='text' 
                placeholder='Assign Team Members' 
                value={teamMembers}
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
                        Choose Severity
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
                        Choose Status
                    </option>
                    <option value="Pending">⌛ Pending</option>
                    <option value="Completed">✔️ Completed</option>
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
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    >
                    <option
                        disabled
                        value=""
                    >
                        Choose Language
                    </option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                    <option value="Go">Go</option>
                    <option value="PHP">PHP</option>
                    <option value="Perl">Perl</option>
                    <option value="Scala">Scala</option>
                    <option value="Rust">Rust</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Swift">Swift</option>
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
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    >
                    <option
                        disabled
                        value=""
                    >
                        Choose Framework
                    </option>
                    <option value="None">None</option>
                    <option value="ASP.NET CORE">ASP.NET CORE</option>
                    <option value="React.js">React.js</option>
                    <option value="Vue.js">Vue.js</option>
                    <option value="Angular.js">Angular.js</option>
                    <option value="Express.js">Express.js</option>
                    <option value="Ruby on Rails">Ruby on Rails</option>
                    <option value="Spring">Spring</option>
                    <option value="Django">Django</option>
                    <option value="Flask">Flask</option>
                    <option value="Angular">Angular</option>
                </Select>
                
            <button 
                className='btn waves-effect waves-light #64b5f6 blue darken-1' 
                onClick={() => postDetails()}
            >
                Submit Ticket 
            </button>
        </div>
    )
}; 

export default CreatePost; 