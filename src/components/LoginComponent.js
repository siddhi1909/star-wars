// IMPORT EXTERNAL LIBRARIES/MODULES
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// IMPORT API & ROUTE ACTIONS
import logo from '../assets/images/star-wars-logo.png';
import '../styles/App.css';
import {loginUserSucess} from '../redux/actions/authActions';
import SimpleCrypto from 'simple-crypto-js'

export class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isFormValid: true,
            validationMessage: ''
        }
    }

    onSubmit = async e => {
        try {
            e.preventDefault();
            let userList = [];
            const res = await axios({
                method: 'get',
                url: 'https://swapi.co/api/people/?search=' + this.state.username,
                timeout: 60 * 4 * 1000,
            });

            userList = res.data.results;
            let index = userList.findIndex((element) => {
                return element.name === this.state.username && element.birth_year === this.state.password;
            })

            if (index !== -1) {
                /******Encrypt username*******/
                let _secretKey = "siddhi";
                let simpleCrypto = new SimpleCrypto(_secretKey);
                let chiperText = simpleCrypto.encrypt(this.state.username);
                localStorage.setItem('user', chiperText);
                this.props.dispatch(loginUserSucess(this.state.username));
                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    isFormValid: !this.state.isFormValid,
                    validationMessage: "Wrong Username & password combination!"
                })
            }
        } catch (error) {
            this.setState({
                isFormValid: !this.state.isFormValid,
                validationMessage: error.message
            })
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value, isFormValid: true, validationMessage: ''});
    }

    render() {
        let boxClass = ["form-box"];
        if (!this.state.isFormValid) {
            boxClass.push('was-validated');
        }
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="logo" alt="logo"/>
                </div>
                <div className="container">
                    <form onSubmit={this.onSubmit} className={boxClass.join(' ')} id="login">
                        {(this.state.validationMessage) ?
                            (<div className="alert alert-danger alert-dismissible fade show">
                                <strong>Error!</strong> {this.state.validationMessage}
                            </div>) : ''
                        }
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control" id="username"
                                   placeholder="Username"
                                   required value={this.state.username} onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">Please enter a valid username.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" id="password"
                                   placeholder="Password"
                                   required value={this.state.password} onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">Please enter your password to continue.</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.user,
});

export default connect(mapStateToProps, null)(LoginComponent);