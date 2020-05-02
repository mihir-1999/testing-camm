import React, {Component} from 'react';
import axios from 'axios';
import Camera1 from './Camera/index1';
import Camera2 from './Camera/index2';
import {Redirect} from 'react-router-dom';

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
        this.goNormal();
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
        if(this.state.idType===""){
        e.preventDefault();}
        else{
            this.goFull();
            this.setState({
            isBkCameraOpen:true,
            })
        }
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
        this.goFull();
        sessionStorage['frontImage']='';
        this.setState({
        isBkCameraOpen:true,
        })
    }
    edit2(){
        this.goFull();
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
        <>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <h1>This is GovtID</h1>
            <form onSubmit={this.openCamera.bind(this)}>
            <label>Select idType:</label>
            <br/>
            <input type="button" value="aadhaar" name="idType" onClick={this.setId.bind(this)} />
            
            <input type="button"  value="pan" name="idType" onClick={this.setId.bind(this)} />
            
            <input type="button" value="driver-license" name="idType" onClick={this.setId.bind(this)} /> 
            <br/>
            <input type="submit" value="Open BackCamera"/>
            </form>
        </>
        );
        }
        else if(sessionStorage.getItem('frontImage')!=='' && sessionStorage.getItem('backImage')!==''){
                sessionStorage['govtId']=JSON.stringify(this.state);
                return(
                <>
                <div>
                <button><h2>Images Captured!! Click submit to go to next step or edit to take id photos again</h2>
                </button>
                <br/>
                <img src={"data:image/png;base64,"+sessionStorage.getItem('frontImage')} width="45%"/>
                <img src={"data:image/png;base64,"+sessionStorage.getItem('backImage')} width="45%"/>
                </div>
                <button onClick={this.nextPage.bind(this)}>Submit</button>
                <button onClick={this.edit1.bind(this)}>Edit first image</button>
                <button onClick={this.edit2.bind(this)}>Edit second image</button>
                </>
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