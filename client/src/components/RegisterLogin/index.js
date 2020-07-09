import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from '../../actions/user_actions';
import { Link, withRouter } from 'react-router-dom';

const RegisterLogin = withRouter(({history}) => {
    // Setup States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // Setup Redux useDispatch to replace normal dispatch, this is so we can work with React Hooks
    const dispatch = useDispatch();


    // This will display errors
    const displayErrors = currentErrors => 
        currentErrors.map((error, i) => <p key={i+Math.random()}>{error}</p>);


    // This handles form submits
    const submitForm = (event) => {
        event.preventDefault();
        

        let dataToSubmit = {
            email: email,
            password: password
        };
        console.log(errors)
        
        if(isFormValid(email, password)) {
            setErrors([]);
            console.log(email, password)

            // Using Redux here
            dispatch(loginUser(dataToSubmit))
            .then(response => {
                if (response.payload.loginSuccess) {
                    history.push('/');
                } else {
                    setErrors(["Login Failed! Check your Email and Password!"]);
                }
            })
        } else {
            setErrors(["Form Invalid: Fill out all fields bro..."]);
        }
    }

    const isFormValid = (email, password) => email && password;
    

    return (
        <div className="container">
            <h2>Login</h2>
            <div className="row">
                <form className="col s12" onSubmit={submitForm}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input 
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            className="validate"
                        />

                        <label htmlFor="email">Email</label>
                        <span
                            className="helper-text"
                            data-error="Please enter a valid email"
                            data-success="Good!"
                        />    
                    </div>
                </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input 
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                className="validate"
                            />

                            <label htmlFor="email">Password</label>
                            <span
                                className="helper-text"
                                data-error="Wrong"
                                data-success="Good!"
                            /> 
                        </div>
                    </div>


                    {errors.length > 0 && (
                        <div>
                            {displayErrors(errors)}
                        </div>
                    )}


                    <div className="row">
                        <div className="col 12">
                            <button
                                className="btn waves-effect purple lighten-1"
                                type="submit"
                                name="action"
                                onClick={submitForm}
                                >
                                    Login
                            </button>
                        </div>

                        <div className="col 12">
                            <Link to="/register">
                            <button
                                className="btn waves-effect purple lighten-1"
                                type="submit"
                                name="action"
                                >
                                    Register
                            </button>
                            </Link>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    );
});


export default RegisterLogin;