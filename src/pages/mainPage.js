import React, { useState } from 'react';
import axios from 'axios';
import '../styling/mainpage.css';

const App = (props) => {
    const [show, setShow] = useState(true);
    const [todoValue, setTodoValue] = useState('');
    const [taskArray, setTaskArray] = useState([]);
    // const [showCross, setShowCross] = useState(true);

    useState(async () => {
        //   console.log((localStorage.getItem('token')));
        if (localStorage.getItem('token')) {
            await axios.get('http://localhost:3000/todo', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data)
                const arr = [...response.data];
                setTaskArray(arr)
                console.log("akhil", arr)
            }).catch((e) => {
                console.log(e);
            })

        }
        else {
            props.history.push('/');
        }
    }, [])

    const addButton = () => {
        setShow(false);
    }
    const addInput = (e) => {
        if (!todoValue) {
            return null;
        }
        const temp = [...taskArray, { description: todoValue, crossShow: true }];
        setTaskArray(temp);
        setShow(true);
        setTodoValue('');
        axios.post('http://localhost:3000/todo', {
            description: todoValue
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        })
    }
    const deleteInput = (i) => {
        const temp = [...taskArray];
        temp.splice(i, 1);
        setTaskArray(temp);
        axios.delete(`http://localhost:3000/todo/${taskArray[i]._id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        })
    }
    const logoutUser = () => {
        localStorage.clear();
        props.history.push('/');
    }
    // console.log(taskArray[0]._id);
    return (
        <div>

            <div className="header">
                <p className='headerText' style={{ fontSize: 22, marginLeft: 20 }}>Todo-app</p>
                <a className="headerText">{localStorage.getItem('name')}</a>
                <a onClick={logoutUser} className='headerText' >Logout</a>
            </div>

            <div style={{ textAlign: 'center' }}>
                {show ? <button onClick={addButton} className='add'>ADD CONTENT </button>
                    :
                    <div>
                        <input value={todoValue}
                            onChange={(e) => setTodoValue(e.target.value)}
                            placeholder="enter the content" className="addInput" />
                        <button
                            onClick={addInput}
                            style={{
                                backgroundColor: 'darkgreen',
                                marginLeft: -15,
                                height: 45,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white',
                                width: 40
                            }}>+</button>
                    </div>}
            </div>
            <div>
                {taskArray.map((item, index) => {
                    return (
                        <div style={{ display: 'flex', margin: 10, marginLeft: 100 }}>
                            <div
                                onMouseEnter={() => {
                                    const temp = [...taskArray];
                                    temp[index].crossShow = false;
                                    setTaskArray(temp);

                                }}
                                onMouseLeave={() => {
                                    const temp = [...taskArray];
                                    temp[index].crossShow = true;
                                    setTaskArray(temp);
                                }}
                                style={{
                                    borderRadius: 100,
                                    backgroundColor: item.crossShow ? 'darkslateblue' : 'darkred',
                                    height: 25,
                                    width: 25,
                                    textAlign: 'center',
                                    padding: 10,
                                }}>
                                {item.crossShow ?
                                    <p style={{ marginTop: 3, color: 'white', fontWeight: 'bold' }}>{index + 1}</p> :
                                    <p onClick={() => deleteInput(index)} style={{ marginTop: 3, color: 'white', fontWeight: 'bold' }}>X</p>}
                            </div>
                            <div className='todoItem'>
                                <p style={{ fontSize: 20, fontFamily: 'roboto' }}>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;