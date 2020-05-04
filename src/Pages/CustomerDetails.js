import React, {Component,Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from  '@material-ui/core/Container';
import {createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import {KeyboardDatePicker} from '@material-ui/pickers';
import '../App.css';
import filling from './filling.png';

const theme=createMuiTheme({
    palette:{
      primary:green,
      secondary: lightBlue
    },
    spacing: 8
  });

class CustomerDetails extends Component{
    constructor(){
        super();
        console.log('customerConstructor')
        if(sessionStorage.getItem('firstError')){
            sessionStorage['firstError']='false';
            sessionStorage['lastError']='false';
            sessionStorage['dobError']='false';
            sessionStorage['gendertError']='false';
        }
        if(sessionStorage.getItem('details')){
            let obj=sessionStorage.getItem('details');
            this.state=JSON.parse(obj)
        }
        else{
            this.state={

               
                firstName:"",
                middleName:"",
                lastName:"",
                dob:"",
                gender:"",
                isFilled:false,

            }
        }
    }
    componentDidMount(){
        sessionStorage.setItem('details',JSON.stringify(this.state));
        sessionStorage.setItem('firstError','false')
        sessionStorage.setItem('lastError','false')
        sessionStorage.setItem('dobError','false')
        sessionStorage.setItem('genderError','false')
    }
    updateDetail(e){
        sessionStorage['firstError']='false';
        sessionStorage['lastError']='false';
        sessionStorage['dobError']='false';
        sessionStorage['genderError']='false';
        if((e.target.name==="firstName")||
        (e.target.name==="middleName")||
        (e.target.name==="lastName"))
        {
            var n=e.target.value.length;
            let newChar=e.target.value[n-1];
            if(n===0)
            {
                this.setState({
                    [e.target.name] : e.target.value
                    })  
            }
            else if(n===1)
            {
               
                if(newChar>='A' && newChar<='Z')
                {
                this.setState({
                    [e.target.name] : e.target.value
                    })    
                }
                else  if(newChar>='a' && newChar<='z'){
                    this.setState({
                        [e.target.name] : newChar.toUpperCase()
                    })    
                }
                else
                e.preventDefault();
            }
            else{
                let str=e.target.value;
                if(str[0]>='a' && str[0]<='z'){
                    newChar=str[0];
                    let newStr=newChar.toUpperCase()+str.slice(1,n-1);
                    this.setState({
                        [e.target.name]:newStr
                    })
                }
                else{
                    let index=1;
                    while(index<n && str[index]>='a' && str[index]<='z')
                    index++;
                    
                    if(index<n){
                        if(str[index]>='A' && str[index]<='Z'){
                            let newStr=str.slice(0,index)+
                            str[index].toLowerCase()+str.slice(index+1,n-1);
                            this.setState({
                                [e.target.name]:newStr
                            })
                        }
                        else
                        e.preventDefault();
                    }
                    else{

                        this.setState({
                            [e.target.name] : e.target.value
                        })   
                    }
                
                }
        }
        }
        else{
            this.setState({
            [e.target.name] : e.target.value
            })
        }   
    }
    verify(e){
        
        if(this.state.firstName===""){
            e.preventDefault();
            sessionStorage['firstError']='true';    
        }
            else if(this.state.lastName===""){
            e.preventDefault();
            sessionStorage['lastError']='true';
        }
            else if(this.state.gender===""){
            e.preventDefault();
            sessionStorage['genderError']='true';
        }
            else if(this.state.dob===""){
            e.preventDefault();
            sessionStorage['dobError']='true';
        }
        
        else{
            this.setState({
                isFilled:true
            })
        }
        this.setState({})
    }
    edit(){
        this.setState({
            isFilled:false
        })
    }
    nextPage(){
        axios.post('http://www.mocky.io/v2/5eacdd2f330000bf0cdfe6be',this.state)
        .then(response=>{
            console.log(response);
        })
        .then(error=>{
            console.log('error');
        })
        localStorage['currentPage']=localStorage.getItem('/customerdetails');
        this.setState({
        }
        )
    }
    logout(){
        sessionStorage.clear();
        localStorage['currentPage']='/';
        this.setState({
        })
    }
    render(){
        if(localStorage.getItem('currentPage')!=='/customerdetails')
        return(<Redirect to={localStorage.getItem('currentPage')}/>);
       
        else if(!this.state.isFilled){
            sessionStorage['details']=JSON.stringify(this.state);
            return(
            <div className="details">
            <ThemeProvider theme={theme}>  
            <button onClick={this.logout.bind(this)}>Logout</button>
            <section className="section">
            <div class="inline">
            <img src={filling} height="100%"/>
            <br/>
            </div>
            <div class="inline1">
            <Typography style={{height:"6vh"}} variant="h6">Help us start up your account</Typography>
            <Typography style={{height:"4vh"}}variant="caption">We'll verify it with your KYC documents</Typography>
            
            </div>
            </section>
            <Box marginX={2} marginY={1} paddingY={2} paddingLeft={1} boxShadow={3} height="75%">
                    <form onSubmit={this.verify.bind(this)}>
                    <Typography variant="subtitle2">Enter your first Name:</Typography>
                    <TextField type="text" autoComplete="off" name="firstName" 
                    error={sessionStorage.getItem('firstError')==='true'}
                    helperText={sessionStorage.getItem('firstError')==='true'?"Cant leave your first name empty":"First letter will be capital and spaces not allowed"}
                    onChange={this.updateDetail.bind(this)} 
                    
                    value={this.state.firstName}
                    variant="outlined"
                    placeholder="eg. Mihir"
                    size="small"
                    style={{width:'95%'}}
                    color="secondary"
                    />
                    <br/>
                    <Typography variant="subtitle2">Enter your middle name:</Typography>
                    <TextField type="text" autoComplete="off" name="middleName" 
                    helperText={"Leave blank if you don't have a middle name "}
                    onChange={this.updateDetail.bind(this)} 
                    value={this.state.middleName}
                    variant="outlined"
                    placeholder="eg. Narayan"
                    size="small"
                    style={{width:'95%'}}
                    color="secondary"
                    />
                    <br/>

                    <Typography variant="subtitle2">Enter your Last Name:</Typography>
                    <TextField type="text" autoComplete="off" name="lastName" 
                    error={sessionStorage.getItem('lastError')==='true'}
                    helperText={sessionStorage.getItem('lastError')==='true'?"Cant leave your last name empty":"First letter capital and spaces not allowed"}
                    onChange={this.updateDetail.bind(this)} 
                    value={this.state.lastName}
                    variant="outlined"
                    placeholder="eg. Gurjar"
                    size="small"
                    style={{width:'95%'}}
                    color="secondary"
                    />
                    <br/>
                    
                    <Typography variant="subtitle2">Enter your date of birth:</Typography>
                    <TextField type="date" name="dob" variant="outlined" size="small" style={{width:'50%'}} placeholder="DD/MM/YYYY" color="secondary"
                      error={sessionStorage.getItem('dobError')==='true'}
                      helperText={sessionStorage.getItem('dobError')==='true'?"Cant leave your date of birth empty":""}
                      onChange={this.updateDetail.bind(this)} 
                      value={this.state.dob}
                    />
                    <br/>
                    <br/>
                    
                    <Typography variant="subtitle2">Your gender:</Typography>
                    <div className="buttons">
                    <input className={this.state.gender==="Male"? "selected":"notselected"} type="button" name="gender" onClick={this.updateDetail.bind(this)} value="Male"/>
                    <input className={this.state.gender==="Female"? "selected":"notselected"} type="button" name="gender" onClick={this.updateDetail.bind(this)} value="Female"/>
                    <input className={this.state.gender==="Others"? "selected":"notselected"} type="button" name="gender" onClick={this.updateDetail.bind(this)} value="Others"/>
                    </div>
                    <br/>
                    <br/>
                    <Button centerRipple type="submit" size="large" style ={{width: '95%'}} color="primary" variant="contained" onClick={this.verify.bind(this)}><Fragment color="white">Submit</Fragment></Button>
                    </form>
                    </Box>
                    </ThemeProvider>
                    </div>
            );
        }
        else
        {
           sessionStorage['details']=JSON.stringify(this.state);
            return(
            <>
            <button onClick={this.logout.bind(this)}>Logout</button>
            <div className="details">
            <ThemeProvider theme={theme}>
            <section className="section">
            <div class="inline">
            <img src={filling} height="100%"/>
            <br/>
            </div>
            <div class="inline1">
            <Typography style={{height:"6vh"}} variant="h6">Help us start up your account</Typography>
            <Typography style={{height:"4vh"}}variant="caption">We'll verify it with your KYC documents</Typography>
            
            </div>
            </section>
                <Box marginX={2} marginTop={1}  paddingY={2} paddingLeft={2} boxShadow={3} height="90%">  
                        <Typography variant="h4">Verify that entered details are correct </Typography>
                        <br/><br/>
                        <Typography display="inline" variant="h6">First name : </Typography>  <Typography display="inline">{this.state.firstName}</Typography>
                        <br/><br/>
                        {this.state.middleName!=="" &&(
                        <>
                        <Typography variant="h6" display="inline">Middle name : </Typography>  <Typography display="inline">{this.state.middleName}</Typography>
                        <br/><br/>
                        </>)}
                        
                        
                        <Typography variant="h6" display="inline">Last name : </Typography>  <Typography display="inline">{this.state.lastName}</Typography>
                        <br/><br/>
                        <Typography variant="h6" display="inline">Date of birth : </Typography>  <Typography display="inline">{this.state.dob}</Typography>
                        <br/><br/>
                        <Typography variant="h6" display="inline">Gender : </Typography>  <Typography display="inline">{this.state.gender}</Typography>
                        <br/><br/><br/>
                        <Button centerRipple type="submit" size="large" style ={{width: '48%'}} color="primary" variant="contained" onClick={this.nextPage.bind(this)}>Confirm</Button>
                        <span> </span>
                        <Button centerRipple type="submit" size="large" style={{marginLeft:'10px'}} style ={{width:'48%'}} color="primary" variant="contained"onClick={this.edit.bind(this)}>Edit</Button>
             </Box>
            </ThemeProvider>
            </div>
            </>)
        }
    }
}
export default CustomerDetails;