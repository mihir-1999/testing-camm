import React, {Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import zestmoney from './zestmoney.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Grid from '@material-ui/core/Grid';
import Container from  '@material-ui/core/Container';
import {createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme=createMuiTheme({
    palette:{
      primary:green,
      secondary: lightBlue
    },
    spacing: 8
  });
  class LogIn extends Component{
    
    constructor(){
        super();  

            this.state={
            username:"",
            password:"",
            correctUsername:"M",
            correctPassword:"M",
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
        sessionStorage.setItem('userError',false);
        sessionStorage.setItem('passError',false);

    }
    login(e){
        if(this.state.username===this.state.correctUsername && 
        this.state.password===this.state.correctPassword){
        localStorage['currentPage']=localStorage.getItem('/');
        this.setState({
        })
        }
        else{
            if(this.state.username==="" || this.state.user!==this.state.correctUsername)
            sessionStorage['userError']=true;
            if(this.state.password==="" || this.state.user!==this.state.correctPassword)
            sessionStorage['passError']=true;
            this.setState({})
        }
    }

    updateNameData(e){
        sessionStorage['userError']=false;
        this.setState({
            username:e.target.value
        })
        
    }
    updatePassData(e){
        sessionStorage['passError']=false;
        this.setState({
            password:e.target.value
        })

    }


    render(){
            if(localStorage.getItem('currentPage')!=='/'){
               
                return(
                    <Redirect to={localStorage.getItem('currentPage')}/>
                );
            }

            return(
                <div class="App">
                <ThemeProvider theme={theme}>  

                <h3>Welcome to login enter your credentials</h3>
                <img src={zestmoney} alt="Logo" height="44%" width="44%"/>
                <br/>
                    <AccountCircle color="primary" fontSize="large" style={{marginTop:'12'}}/> 
                    <TextField error={sessionStorage.getItem('userError')==='true'} 
                               helperText={sessionStorage.getItem('userError')==='true'?(this.state.username===""?"Can't leave username empty!":"Wrong credentials detected! try again carefully"):""}
                               color="secondary" variant="outlined" type="text" label="Enter your Username" 
                               style ={{width: '75%'}}
                               inputStyle ={{width: '75%%'}}
                               onChange={this.updateNameData.bind(this)} value={this.state.username}/>       
                <br/>
                <br/>
                    <VpnKeyRoundedIcon color="primary" fontSize="large" style={{marginTop:'12'}}/>   
                
                    <TextField  error={sessionStorage.getItem('passError')==='true'} 
                                helperText={sessionStorage.getItem('passError')==='true'?(this.state.password===""?"Can't leave password empty":"Wrong credentials detected! try again carefully"):""}
                                color="secondary" variant="outlined" type="password" label="Enter your Password" 
                                style ={{width: '75%'}}
                                inputStyle ={{width: '75%%'}}
                                onChange={this.updatePassData.bind(this)} value={this.state.password}/>
                
                <br/>
                <br/>        
                <Button  style ={{width: '81%'}} color="primary" variant="contained" onClick={this.login.bind(this)}>Login</Button>
            </ThemeProvider>
            </div>
        );}
}
export default LogIn;
