import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
class LogIn extends Component{
    
    constructor(){
        super();  
        if(sessionStorage.getItem('login')) {
            let data=sessionStorage.getItem('login');
            this.state=JSON.parse(data);
        }
        else{     
            this.state={
            username:"",
            password:"",
            correctUsername:"admin",
            correctPassword:"pass"
            }
        }
    }
    componentDidMount(){
        /*axios.get('http://www.mocky.io/v2/5eacdcd33300008524dfe6bd')
        .then(response =>{
            this.setState({
                correctUsername:response.data.correctUsername,
                correctPassword:response.data.correctPassword
            })
        })
        .catch(error=>{
        
            console.log('error')
        })*/
        sessionStorage.setItem('login',JSON.stringify(this.state));

    }
    login(){
        if(this.state.username===this.state.correctUsername && 
        this.state.password===this.state.correctPassword){
        localStorage['currentPage']=localStorage.getItem('/');
        this.setState({
        })
        }
        else{
        alert('Wrong Username or password')
        this.setState({
        })
        }
    }

    updateNameData(e){
        this.setState({
            username:e.target.value
        })
    }
    updatePassData(e){
        this.setState({
            password:e.target.value
        })
    }


    render(){
            if(localStorage.getItem('currentPage')!=='/'){
                return(<Redirect to={localStorage.getItem('currentPage')}/>);
            }
            return(
                <form onSubmit={this.login.bind(this)}> 
                <h1>Welcome to login enter your credentials</h1>

                <label>
                <input type="text" placeholder="Enter your Username" onChange={this.updateNameData.bind(this)} value={this.state.username}/>
                <br/>
                </label>
                <label>
                <input type="password" placeholder="Enter your Password" onChange={this.updatePassData.bind(this)} value={this.state.password}/>
                <br/>
                </label>    
                <input type="submit" value="Login"/>
            </form>
        );}
}
export default LogIn;
