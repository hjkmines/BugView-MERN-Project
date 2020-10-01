import React, { useState, useEffect, useContext, useCallback } from 'react'; 
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom'; 
import 'materialize-css';
import { useHistory } from 'react-router-dom'; 
import M from 'materialize-css'; 
import { Button, Modal, Select } from 'react-materialize';
import {Doughnut, Bar, Line, HorizontalBar} from 'react-chartjs-2';

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
    const [language, setFramework] = useState(''); 
    const [framework, setLanguage] = useState(''); 
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [high, setHigh] = useState([]);
    const [moderate, setModerate] = useState([]);
    //months
    const [low, setLow] = useState([]);
    const [jan, setJan] = useState([]);
    const [feb, setFeb] = useState([]);
    const [mar, setMar] = useState([]);
    const [apr, setApr] = useState([]);
    const [may, setMay] = useState([]);
    const [jun, setJun] = useState([]);
    const [jul, setJul] = useState([]);
    const [aug, setAug] = useState([]);
    const [sep, setSep] = useState([]);
    const [oct, setOct] = useState([]);
    const [nov, setNov] = useState([]);
    const [dec, setDec] = useState([]);
    //languages
    const [javaScript, setJavaScript] = useState([]);
    const [typeScript, setTypeScript] = useState([]);
    const [ruby, setRuby] = useState([]);
    const [java, setJava] = useState([]);
    const [python, setPython] = useState([]);
    const [cPlus, setCPlus] = useState([]);
    const [cSharp, setCSharp] = useState([]);
    const [htmlCss, setHtmlCss] = useState([]);
    const [go, setGo] = useState([]);
    const [php, setPhp] = useState([]);
    const [perl, setPerl] = useState([]);
    const [scala, setScala] = useState([]);
    const [rust, setRust] = useState([]);
    const [kotlin, setKotlin] = useState([]);
    const [swift, setSwift] = useState([]);

    const [none, setNone] = useState([]); 
    const [asp, setAsp] = useState([]); 
    const [reactJs, setReactJs] = useState([]); 
    const [vueJs, setVueJs] = useState([]); 
    const [angularJs, setAngularJs] = useState([]); 
    const [expressJs, setExpressJs] = useState([]); 
    const [rails, setRails] = useState([]); 
    const [spring, setSpring] = useState([]); 
    const [django, setDjango] = useState([]); 
    const [flask, setFlask] = useState([]); 
    const [angular, setAngular] = useState([]); 


    

                    
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts) 
        })
    }, [])
    
    useEffect(() => {
        let pendingArray = []; 
        let completedArray = []; 
        let highArray = []; 
        let moderateArray = []; 
        let lowArray = []; 
        let janArray = [];
        let febArray = [];
        let marArray = [];
        let aprArray = [];
        let mayArray = [];
        let junArray = [];
        let julArray = [];
        let augArray = [];
        let sepArray = [];
        let octArray = [];
        let novArray = [];
        let decArray = [];

        let javaScriptArray = []; 
        let typeScriptArray = []; 
        let rubyArray = []; 
        let javaArray = []; 
        let pythonArray = []; 
        let cPlusArray = []; 
        let cSharpArray = []; 
        let htmlCssArray = []; 
        let goArray = []; 
        let phpArray = []; 
        let perlArray = []; 
        let scalaArray = []; 
        let rustArray = []; 
        let kotlinArray = []; 
        let swiftArray = []; 
        
        let noneArray = []; 
        let aspArray = []; 
        let reactArray = []; 
        let vueArray = []; 
        let angularJsArray = []; 
        let expressArray = []; 
        let railsArray = []; 
        let springArray = []; 
        let djangoArray = []; 
        let flaskArray = []; 
        let angularArray = []; 

        data.forEach((element, index, array) => {
            if (element.status === 'Pending') {
                pendingArray.push(element.status)
                setPending(pendingArray); 
            } else if (element.status === 'Completed') {
                completedArray.push(element.status)
                setCompleted(completedArray)
            }

            if (element.severity === 'High') {
                highArray.push(element.severity)
                setHigh(highArray); 
            } else if (element.severity === 'Moderate') {
                moderateArray.push(element.severity)
                setModerate(moderateArray)
            } else if (element.severity === 'Low') {
                lowArray.push(element.severity)
                setLow(lowArray)
            }

            if (element.createdAt.split('').slice(5,7).join('').toString() === '01') {
                janArray.push(element.createdAt)
                setJan(janArray); 
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '02') {
                febArray.push(element.createdAt)
                setFeb(febArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '03') {
                marArray.push(element.createdAt)
                setMar(marArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '04') {
                aprArray.push(element.createdAt)
                setApr(aprArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '05') {
                mayArray.push(element.createdAt)
                setMay(mayArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '06') {
                junArray.push(element.createdAt)
                setJun(junArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '07') {
                julArray.push(element.createdAt)
                setJul(julArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '08') {
                augArray.push(element.createdAt)
                setAug(augArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '09') {
                sepArray.push(element.createdAt)
                setSep(sepArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '10') {
                octArray.push(element.createdAt)
                setOct(octArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '11') {
                novArray.push(element.createdAt)
                setNov(novArray)
            } else if (element.createdAt.split('').slice(5,7).join('').toString() === '12') {
                decArray.push(element.createdAt)
                setDec(decArray)
            }

            if (element.language === 'JavaScript') {
                javaScriptArray.push(element.language)
                setJavaScript(javaScriptArray); 
            } else if (element.language === 'TypeScript') {
                typeScriptArray.push(element.language)
                setTypeScript(typeScriptArray)
            } else if (element.language === 'Ruby') {
                rubyArray.push(element.language)
                setRuby(rubyArray)
            } else if (element.language === 'Java') {
                javaArray.push(element.language)
                setJava(javaArray)
            } else if (element.language === 'Python') {
                pythonArray.push(element.language)
                setPython(pythonArray)
            } else if (element.language === 'C++') {
                cPlusArray.push(element.language)
                setCPlus(cPlusArray)
            } else if (element.language === 'C#') {
                cSharpArray.push(element.language)
                setCSharp(cSharpArray)
            } else if (element.language === 'HTML/CSS') {
                htmlCssArray.push(element.language)
                setHtmlCss(htmlCssArray)
            } else if (element.language === 'Go') {
                goArray.push(element.language)
                setGo(goArray)
            } else if (element.language === 'PHP') {
                phpArray.push(element.language)
                setPhp(phpArray)
            } else if (element.language === 'Perl') {
                perlArray.push(element.language)
                setPerl(perlArray)
            } else if (element.language === 'Scala') {
                scalaArray.push(element.language)
                setScala(scalaArray)
            } else if (element.language === 'Rust') {
                rustArray.push(element.language)
                setRust(rustArray)
            } else if (element.language === 'Kotlin') {
                kotlinArray.push(element.language)
                setKotlin(kotlinArray)
            } else if (element.language === 'Swift') {
                swiftArray.push(element.language)
                setSwift(swiftArray)
            }

            if (element.framework === 'None') {
                noneArray.push(element.framework)
                setNone(noneArray); 
            } else if (element.framework === 'ASP.NET CORE') {
                aspArray.push(element.framework)
                setAsp(aspArray)
            } else if (element.framework === 'React.js') {
                reactArray.push(element.framework)
                setReactJs(reactArray)
            } else if (element.framework === 'Vue.js') {
                vueArray.push(element.framework)
                setVueJs(vueArray)
            } else if (element.framework === 'Angular.js') {
                angularJsArray.push(element.framework)
                setAngularJs(angularJsArray)
            } else if (element.framework === 'Express.js') {
                expressArray.push(element.framework)
                setExpressJs(expressArray)
            } else if (element.framework === 'Ruby on Rails') {
                railsArray.push(element.framework)
                setRails(railsArray)
            } else if (element.framework === 'Spring') {
                springArray.push(element.framework)
                setSpring(springArray)
            } else if (element.framework === 'Django') {
                djangoArray.push(element.framework)
                setDjango(djangoArray)
            } else if (element.framework === 'Flask') {
                flaskArray.push(element.framework)
                setFlask(flaskArray)
            } else if (element.framework === 'Angular') {
                angularArray.push(element.framework)
                setAngular(angularArray)
            } 
        })

    }, [data])
    
    const statusChart = {
        labels: [
            'Completed',
            'Pending'
        ],
        datasets: [{
            data: [completed.length, pending.length],
            backgroundColor: [
                'green', 
                '#FFCE56' 
            ],
            hoverBackgroundColor: [
                'green', 
                '#FFCE56' 
            ]
        }]
    };

    const severityChart = {
        labels: ['High', 'Moderate', 'Low'],
        datasets: [
          {
            backgroundColor: ['#B22222','green', 'yellow'], 
            borderColor: ['#DC143C', '#90EE90', '#F0E68C'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgba(205, 92, 92, 0.4)', '#90EE90', '#F0E68C'],
            hoverBorderColor: ['#DC143C','#90EE90', '#F0E68C'],
            data: [high.length, moderate.length, low.length]
          }
        ]
      };

      const postedTicket = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            // label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [jan.length, feb.length, mar.length, apr.length, may.length, jun.length, jul.length, aug.length, sep.length, oct.length, nov.length, dec.length]
          }
        ]
      };

      const languageChart = {
          labels: ['JavaScript', 'TypeScript', 'Ruby', 'Java', 'Python', 'C++', 'C#', 'HTML/CSS', 'Go', 'PHP', 'Perl', 'Scala', 'Rust', 'Kotlin', 'Swift'],
          datasets: [
            {
              // label: ['High', 'Moderate', 'Low'],
              backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#ff0040',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF',
                '#808080',
                '#0000FF',
                '#6600CC',
                '#bfff00'
              ], 
              borderColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#ff0040',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF',
                '#808080',
                '#0000FF',
                '#6600CC',
                '#bfff00'
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#ff0040',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF',
                '#808080',
                '#0000FF',
                '#6600CC',
                '#bfff00'
              ],
              hoverBorderColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#ff0040',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF',
                '#808080',
                '#0000FF',
                '#6600CC',
                '#bfff00'
              ],
              data: [javaScript.length, typeScript.length, ruby.length, java.length, python.length, cPlus.length, cSharp.length, htmlCss.length, go.length, php.length, perl.length, scala.length, rust.length, kotlin.length, swift.length]
            }
          ]
      };

      const frameworkChart = {
          labels: ['None', 'ASP.NET CORE', 'React.js', 'Vue.js', 'Angular.js', 'Express.js', 'Ruby on Rails', 'Spring', 'Django', 'Flask', 'Angular'],
          datasets: [
            {
              // label: ['High', 'Moderate', 'Low'],
              backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#6600CC',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF'
              ], 
              borderColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#6600CC',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF'
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#6600CC',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF'
              ],
              hoverBorderColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#6600CC',
                '#36A2EB', 
                '#101010',
                '#600000',
                '#00CC99',
                '#990099',
                '#9999FF',
                '#FF66FF'
              ],
              data: [none.length, asp.length, reactJs.length, vueJs.length, angularJs.length, expressJs.length, rails.length, spring.length, django.length, flask.length, angular.length]
            }
          ]
      };

    return (
        <div>
            <div style={{fontSize: '30px', textAlign: 'center', fontSize: '40px', marginTop: '10px'}}>
            <strong>Dashboard 👋</strong>
            </div>
        <div style={{margin: '20px 20px 20px 20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', marginTop: '25px', marginBottom: '25px'}}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '30px' }}><strong>Ticket Severity Count</strong></span>
                <HorizontalBar
                data={severityChart} 
                width={600}
                height={120}
                options={{
                maintainAspectRatio: false, 
                legend: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 20, 
                            beginAtZero: true
                            }
                        }], 
                    yAxes: [{
                        ticks: {
                            fontSize: 20
                            }
                        }]
                 }
                }}
                />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '30px' }}><strong>Ticket Status Count</strong></span>
                <Doughnut 
                data={statusChart}
                width={350}
                height={120}
                options={{ 
                    maintainAspectRatio: false, 
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 20
                        }
                    }
                }}
                />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '30px' }}><strong>Tickets Reported (Monthly)</strong></span>
                <Line 
                data={postedTicket}
                width={620}
                height={120}
                options={{
                maintainAspectRatio: false, 
                legend: false, 
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 20
                            }
                        }], 
                    yAxes: [{
                        ticks: {
                            fontSize: 20
                            }
                        }]
                 }
                }}
                />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '30px' }}><strong>Language Associated With Tickets</strong></span>
                <HorizontalBar 
                data={languageChart} 
                width={700}
                height={400}
                options={{
                maintainAspectRatio: false, 
                legend: false, 
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 20, 
                            beginAtZero: true
                            }
                        }], 
                    yAxes: [{
                        ticks: {
                            fontSize: 20
                            }
                        }]
                 }
                }}
                />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '30px' }}><strong>Framework Associated With Tickets</strong></span>
                <HorizontalBar
                data={frameworkChart} 
                width={700}
                height={400}
                options={{
                maintainAspectRatio: false, 
                legend: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 20, 
                            beginAtZero: true
                            }
                        }], 
                    yAxes: [{
                        ticks: {
                            fontSize: 20
                            }
                        }]
                 }
                }}
                />
                </div>
            </div>
        </div>
        
        </div>
    )
}; 

export default Home; 

