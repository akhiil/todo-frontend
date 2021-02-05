import React, { useState } from 'react';
import axios from 'axios';
import '../styling/signin.css';

const App = (props) => {
    const [mailValue, setMailValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const onSubmit = () => {
        axios.post('http://localhost:3000/signin', {
            email: mailValue,
            password: passValue
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.user.name);
            // console.log(response);
            if (response.status === 200) {
                props.history.push('/main', { name: response.data.user.name });
            }
        }).catch((e) => {
            alert('please enter valid email or password')
            console.log(e);
        })
        // console.log(props);
        // props.history.push('/main')
    }

    return (
        <div className="Container">
            <div className="header">
                <p className='headerText' style={{ fontSize: 22, marginLeft: 20, textAlign: 'center' }}>Todo-app</p>
            </div>
            <div style={{ marginTop: 50, marginRight: 300, marginLeft: 250, backgroundColor: 'lightgray', borderRadius: 10, padding: 50 }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>signin-page</h1>
                </div>

                <div className="email">
                    <p style={{ fontWeight: 'bold', marginRight: 50, height: 25, width: 200 }}>Email: </p>
                    <input value={mailValue}
                        onChange={(e) => setMailValue(e.target.value)}
                        style={{ width: '100%' }} type="text" />
                </div>

                <div className="email">
                    <p style={{ fontWeight: 'bold', marginRight: 50, width: 200, height: 25 }}>Password: </p>
                    <input value={passValue}
                        onChange={(e) => setPassValue(e.target.value)}
                        style={{ width: '100%' }} type="text" />
                </div>

                <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <button onClick={onSubmit} className="button">Login</button>
                </div>
                <a style={{ textDecoration: 'none', marginTop: 10 }} href="/signup">don't have a account, signup?</a>
            </div>
        </div>
    );
}

export default App;