import React, {Component} from 'react';
import axios from 'axios';
import Camera1 from './Camera/index1';
import Camera2 from './Camera/index2';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import '../App.css';
import id from './id.jpg';

const theme=createMuiTheme({
    palette:{
      primary:green,
      secondary: lightBlue
    },
    spacing: 8
  });


class GovtID extends Component{
    constructor(){
        super();
        console.log('govtidConstructor')
        if(sessionStorage.getItem('govtId'))
        {
                let data=sessionStorage.getItem('govtId');
                this.state=JSON.parse(data);
            }
            else{
            this.state={
                isBkCameraOpen:false,
                idType:"",
                isFilled:false,
            }
        }
    }
    componentDidMount(){
        sessionStorage.setItem('govtId',JSON.stringify(this.state));
        sessionStorage.setItem('isVideoPlaying','false');
        sessionStorage.setItem('isCanvasEmpty','true');
        sessionStorage.setItem('frontImage','');
        sessionStorage.setItem('backImage','');
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
        if(document.fullscreenElement){
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
        localStorage['currentPage']=localStorage.getItem('/govtid');
        const obj={
            idType: this.state.idType,
            frontImage : sessionStorage.getItem('frontImage'),
            backImage:sessionStorage.getItem('backImage')
        }
        axios.post('http://www.mocky.io/v2/5eacd69a330000dc64dfe6b1/govtid',JSON.stringify(obj))
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
    setId(e){
        this.setState({
            idType:e.target.value
        })

    }
    openCamera(e){
            this.setState({
            isBkCameraOpen:true,
            })
    }
    clickImage1(blob){
        this.setState({
        })
    }
    clearImage1(){
        this.setState({
        })
    }
    clickImage2(blob){
        this.setState({
        })
    }
    clearImage2(){
        this.setState({
        })
    }
    edit1(){
        sessionStorage['frontImage']='';
        this.setState({
        isBkCameraOpen:true,
        })
    }
    edit2(){
        sessionStorage['backImage']='';
        this.setState({
        isBkCameraOpen:true,
        })
    }
    logout(){
        sessionStorage.clear();
        localStorage['currentPage']='/';
        this.setState({
        })
    }
    render(){
        if(localStorage.getItem('currentPage')!=='/govtid'){
        return (<Redirect to={localStorage.getItem('currentPage')}/>);}
        
        else if(!this.state.isBkCameraOpen){
        sessionStorage['govtId']=JSON.stringify(this.state);
        return(
        <div className="details">
            <button onClick={this.logout.bind(this)}>Logout</button>
            <ThemeProvider theme={theme}>
            <section className="section">
            <div class="inline">
            <img src={id} height="50%"/>
            <br/>
            </div>
            <div class="inline1">
            <Typography style={{height:"6vh"}} variant="h6">Verify your identity</Typography>
            <Typography style={{height:"4vh"}}variant="caption">Please upload a government id for KYC verification</Typography>
            </div>
            </section>
            <Box marginX={2} marginTop={1}  paddingY={2} paddingX={2} boxShadow={3} height="90%">

            <Typography variant="h5">Select a Government ID</Typography>
                    <br/>    
                    <div className="buttons">
                    <input className={this.state.idType==="Aadhaar Card"? "selected":"notselected"} type="button"  onClick={this.setId.bind(this)} value="Aadhaar Card"/>
                    <input className={this.state.idType==="Voter ID"? "selected":"notselected"} type="button" onClick={this.setId.bind(this)} value="Voter ID"/>
                    <input className={this.state.idType==="PAN Card"? "selected":"notselected"} type="button" onClick={this.setId.bind(this)} value="PAN Card"/>
                    <input className={this.state.idType==="Driving License"? "selected":"notselected"} type="button"  onClick={this.setId.bind(this)} value="Driving License"/>
                    </div>
                    
                    {this.state.idType &&(
                    <>
                    <Typography variant="h6">Front of and back of {this.state.idType}</Typography>
                    <Typography variant="caption">Your name,photo and address should be clearly visible</Typography>
                    <br/>
                    <img className="image" src={this.state.idType} width="45%"/>
                    </>
                    )
                    }
                <Button disabled={this.state.idType===""} centerRipple size="large" style ={{width: '100%'}} color="primary" variant="contained"  onClick={this.openCamera.bind(this)}>Click photo of {this.state.idType}</Button>
            </Box>
            </ThemeProvider>
            </div>
        );
        }
        else if(sessionStorage.getItem('frontImage')!=='' && sessionStorage.getItem('backImage')!==''){
                sessionStorage['govtId']=JSON.stringify(this.state);
                return(

            <div className="details">
            <button onClick={this.logout.bind(this)}>Logout</button>
            <ThemeProvider theme={theme}>
            <section className="section">
            <div class="inline">
            <img src="id" width="50%"/>
            <br/>
            </div>
            <div class="inline1">
            <Typography style={{height:"6vh"}} variant="h6">Verify your identity</Typography>
            <Typography style={{height:"4vh"}}variant="caption">Please upload a government id for KYC verification</Typography>
            </div>
            </section>
            <Box marginX={2} marginTop={1}  paddingY={2} paddingX={2} boxShadow={3} height="90%">
                <Typography variant="h5">Your Government ID</Typography>
                 <img src={"data:image/png;base64,"+sessionStorage.getItem('frontImage')} className="image" width="45%"/>
                <img src={"data:image/png;base64,"+sessionStorage.getItem('backImage')} className="image" width="45%"/>
               
                <button className="selected" onClick={this.edit1.bind(this)}>Edit front image</button>
                <button className="selected" onClick={this.edit2.bind(this)}>Edit back image</button>
                
                <Button centerRipple size="large" style ={{width: '100%'}} color="primary" variant="contained"  onClick={this.nextPage.bind(this)}>Submit</Button>
            </Box>
            </ThemeProvider>
            </div>
            )}

            else if(sessionStorage.getItem('frontImage')===''){
                sessionStorage['govtId']=JSON.stringify(this.state);
                return(
                <Camera1 onCapture={(blob)=>this.clickImage1.bind(this,blob)}
                onClear={this.clearImage1.bind(this)}></Camera1>
                );
            }
            else if(sessionStorage.getItem('backImage')===''){
            sessionStorage['govtId']=JSON.stringify(this.state);
            return(
                <Camera2 onCapture={(blob)=>this.clickImage2.bind(this,blob)}
                onClear={this.clearImage2.bind(this)}></Camera2>
            );
        }
    }
}
export default GovtID;