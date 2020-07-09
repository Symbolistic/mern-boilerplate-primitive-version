import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/user_actions";
import { withRouter } from 'react-router-dom';

const Register = withRouter(({history}) => {
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);


    // Setup Redux useDispatch to replace normal dispatch, this is so we can work with React Hooks
    const dispatch = useDispatch();


    // This will display errors
    const displayErrors = currentErrors => 
    currentErrors.map((error, i) => <p key={i+Math.random()}>{error}</p>);

    // Checks to make sure all fields are filled in
    const isFormValid = () => {
        let errors = [];
        let error;

        if (isFormEmpty(lastName, name, email, password, passwordConfirmation)) {
            error = { message: "Fill in all fields" };
            setErrors(errors.concat(error));
        } else if (!isPasswordValid(password, passwordConfirmation)) {
            error = {message: "Password invalid or does not match"};
            setErrors(errors.concat(error));
        } else {
            return true;
        }
    }

    // Here we take in the password/passwordConfirmation parameters and compare to make sure they match
    const isPasswordValid = (password, passwordConfirmation) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }

    }

    const isFormEmpty = (lastName, name, email, password, passwordConfirmation) => {
        // This will return false if any of the lengths are 0, meaning they haven't been filled in.
        return (
            !name.length ||
            !lastName.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    }


    const submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: email,
            name: name,
            lastName: lastName,
            password: password,
            passwordConfirmation: passwordConfirmation
        }

        if (isFormValid()) {
            setErrors([]);

            // Using Redux here
            dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        history.push('/login');
                    } else {
                        setErrors(["Your attempt to register failed, check your info"]);
                    }
                })
                .catch(err => {
                    setErrors(errors.concat(err));
                })
        } else {
            setErrors(["Your attempt to register failed, check your info"]);
            console.error("This form is not valid, check your info");
        }
    }

    return (
        <div className="container">
            <h2>Register</h2>

            <div className="row">
                <form className="col s12" onSubmit={submitForm}>

                    <div className="row">
                        <div className="input-field col s12">
                            <input 
                            name="lastname"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            id="lastname"
                            type="text"
                            className="validate"
                        />

                        <label className="active" htmlFor="email">Last Name</label>
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
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            type="text"
                            className="validate"
                        />

                        <label className="active" htmlFor="email">Name</label>
                        <span
                            className="helper-text"
                            data-error="Wrong"
                            data-success="Good!"
                        /> 
                    </div>
                </div>

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

                        <label className="active" htmlFor="email">Email</label>
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

                        <label className="active" htmlFor="email">Password</label>
                        <span
                            className="helper-text"
                            data-error="Wrong"
                            data-success="Good!"
                        /> 
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            id="passwordConfirmation"
                            type="password"
                            className="validate"
                        />

                        <label className="active" htmlFor="passwordConfirmation">Password Confirmation</label>
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
                                Create an account
                        </button>
                    </div>

                </div>      
            </form>
        </div>
    </div>

    );
});

export default Register;