import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Camera from './Camera/index';
import Button from '@material-ui/core/Button';
import {createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import selfie from './selfie.jpg';
import selfieman from './selfieman.jpg';
import filling from './filling.png';

const theme=createMuiTheme({
    palette:{
      primary:green,
      secondary: lightBlue
    },
    spacing: 8
  });

class Selfie extends Component{
    constructor(){
        super();
        console.log('selfieConstructor')
        const obj=JSON.parse(sessionStorage.getItem('details'));
        if(sessionStorage.getItem('selfie'))
        {
            let data=sessionStorage.getItem('selfie');
            this.state=JSON.parse(data);
        }
        else{
        this.state={
            
            isFrCameraOpen:false,
            isFilled:false,
        }
        }
    }
    componentDidMount(){
        sessionStorage.setItem('selfie',JSON.stringify(this.state));
        sessionStorage.setItem('isVideoPlaying','false');
        sessionStorage.setItem('isCanvasEmpty','true');
        sessionStorage.setItem('myImage','');
    }
    goFull(){
        var elem=document.getElementById("root");
        if(elem.requestFullscreen){
            elem.requestFullscreen();
        }else if(elem.msRequestFullscreen){
            elem.msRequestFullscreen();
        }else if(elem.mozRequestFullscreen){
            elem.mozRequestFullscreen();
        }else if(elem.webkitRequestFullscreen){
            elem.webkitRequestFullscreen();
        }
    }
    goNormal(){
        if(!window.screenTop && !window.screenY){
           if(document.exitFullscreen){
                document.exitFullscreen();
            }else if(document.msExitFullscreen){
                document.msExitFullscreen();
            }else if(document.mozCancelFullscreen){
                document.mozCancelFullscreen();
            }else if(document.webkitExitFullscreen){
                document.webkitExitFullscreen();
            }
        }
    }
    
    nextPage(){
        sessionStorage.removeItem('isCanvasEmpty');
        sessionStorage.removeItem('isVideoPlaying');
        localStorage['currentPage']=localStorage.getItem('/selfie');
        const obj={
            image : sessionStorage.getItem('myImage')
        }
        axios.post('http://www.mocky.io/v2/5eacd69a330000dc64dfe6b1/selfie',JSON.stringify(obj))
        .then(response=>{
            console.log(response);
        })
        .then(error=>{
            console.log('error');
        })
        this.setState({
            isFilled:true
        })
    }
    openCamera(){
            this.setState({
            isFrCameraOpen:true,
        })
    }
    
    clickImage(blob){
        this.setState({
            isFrCameraOpen:false
        })
    }
    clearImage(){
        this.setState({
            isFrCameraOpen:true
        })
    }
    edit(){
        this.setState({
            isFrCameraOpen:true
        })
    }
    logout(){
        sessionStorage.clear();
        localStorage['currentPage']='/';
        this.setState({
        })
    }
    render(){
        if(localStorage.getItem('currentPage')!=='/selfie')
        return (<Redirect to={localStorage.getItem('currentPage')}/>)
        
        if(!this.state.isFrCameraOpen){
        sessionStorage['selfie']=JSON.stringify(this.state);
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
            <Typography style={{height:"6vh"}} variant="h6">Verify your identity</Typography>
            <Typography style={{height:"4vh"}}variant="caption">Please upload a selfie for KYC verification</Typography>
            </div>
            </section>
            <Box marginX={2} marginTop={1}  paddingY={2} paddingX={2} boxShadow={3} height="90%">
                
                <Typography variant="h5">Take a selfie</Typography>
                <br/>
                <Typography variant="caption">Make sure you whole face is clearly visible without any glare or blur</Typography>
                <br/>
                <img className="image" src={this.state.gender==="Female"?selfie:selfieman} width="45%"/>
                
                <Button centerRipple size="large" style ={{width: '100%'}} color="primary" variant="contained"  onClick={this.openCamera.bind(this)}>Take Selfie</Button>
            </Box>
            </ThemeProvider>
            </div>
        </>
        );}
        else if(sessionStorage.getItem('myImage')){
            sessionStorage['selfie']=JSON.stringify(this.state);
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
               <Typography style={{height:"6vh"}} variant="h6">Verify your identity</Typography>
               <Typography style={{height:"4vh"}}variant="caption">Please upload a selfie for KYC verification</Typography>
               </div>
               </section>
               <Box marginX={2} marginTop={1}  paddingY={2} paddingX={2} boxShadow={3} height="90%">
                   
                   <Typography variant="h5">Selfie taken</Typography>
                   <Typography variant="caption">Make sure you whole face is clearly visible without any glare or blur</Typography>
                   <br/><br/>
                   <img src={"data:image/png;base64,"+sessionStorage.getItem('myImage')} width="55%"/>
                   <br/>              
                   <br/>
                   <Button centerRipple style ={{width: '47%'}} color="primary" variant="contained"  onClick={this.nextPage.bind(this)}>Looks Good</Button>
                  <span> </span>
                   <Button centerRipple  style ={{width: '47%'}} color="primary" variant="contained"  onClick={this.edit.bind(this)}>Take another</Button>
               
               </Box>
               </ThemeProvider>
               </div>
               </>
         )}
        else{
            sessionStorage['selfie']=JSON.stringify(this.state);
            return(
                
                <Camera id="camera" onCapture={(blob)=>this.clickImage.bind(this,blob)}
                onClear={this.clearImage.bind(this)}></Camera>

            )
        }
    }
}
export default Selfie;