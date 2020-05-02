import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Camera from './Camera/index'
class Selfie extends Component{
    constructor(){
        super();
        console.log('selfieConstructor')
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
        this.goNormal();
        sessionStorage.removeItem('isCanvasEmpty');
        sessionStorage.removeItem('isVideoPlaying');
        localStorage['currentPage']=localStorage.getItem('/selfie');
        const obj={
            image : sessionStorage.getItem('myImage')
        }
        axios.post('http://localhost:3000/selfie/1',JSON.stringify(obj))
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
            this.goFull();
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
            this.goFull();

        sessionStorage.removeItem('myImage');
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
        
        if(this.state.isFrCameraOpen===false && sessionStorage.getItem('myImage')===null){
        sessionStorage['selfie']=JSON.stringify(this.state);
        return(
        <>
         <button onClick={this.logout.bind(this)}>Logout</button>
        <h1>This is Selfie</h1>
        <div>
        <button onClick={this.openCamera.bind(this)}>Take Selfie</button>
        </div>
        </>
        );}
        else if(sessionStorage.getItem('myImage')){
         return(
         <>
         <div>
         <button><h2>Image Captured!! Click submit to go to next step or edit to take new Selfie</h2>
         </button>
         <br/>
         <img src={"data:image/png;base64,"+sessionStorage.getItem('myImage')}/>
         </div>
         <button onClick={this.nextPage.bind(this)}>Submit</button>
         <button onClick={this.edit.bind(this)}>Edit</button>
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