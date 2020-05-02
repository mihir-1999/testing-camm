import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Success extends Component{
    constructor(){
        super();
        console.log('successConstructor')
    }
    state={
        isFilled:false
    }
    logout(){
        sessionStorage.clear();
        localStorage['currentPage']=localStorage.getItem('/success');
        this.setState({
            isFilled:true
        })

    }
    render(){
        if(localStorage.getItem('currentPage')!=='/success')
        return (<Redirect to={localStorage.getItem('/success')}/>)
        return(
        <>
        <button onClick={this.logout.bind(this)}>logout</button>
        <h1>form Submitted!!</h1>
        </>
        );
    }
}
export default Success;