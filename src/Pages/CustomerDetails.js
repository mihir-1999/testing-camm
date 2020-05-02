import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class CustomerDetails extends Component{
    constructor(){
        super();
        console.log('customerConstructor')
        
        if(sessionStorage.getItem('details')){
            let obj=sessionStorage.getItem('details');
            this.state=JSON.parse(obj)
        }
        else{
            this.state={

               
                firstName:"",
                middleName:"",
                lastName:" ",
                dob:"",
                gender:"",
                isFilled:false,

            }
        }
    }
    componentDidMount(){
        sessionStorage.setItem('details',JSON.stringify(this.state))
    }
    updateDetail(e){
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
                            let newStr=str.slice(0,index-1)+
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
        
        if(this.state.firstName==="")
        e.preventDefault();
        else if(this.setState.lastName==="")
        e.preventDefault();
        else if(this.state.gender==="")
        e.preventDefault();
        else if(this.state.dob==="")
        e.preventDefault();
        
        else{
            this.setState({
                isFilled:true
            })
        }
    }
    edit(){
        this.setState({
            isFilled:false
        })
    }
    nextPage(){
        axios.put('http://localhost:3000/details/1',this.state)
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
            <>
            <button onClick={this.logout.bind(this)}>Logout</button>
            <form onSubmit={
                this.verify.bind(this)
                }>
            <h1>Enter your details</h1>
            <label>Enter your First Name:
            <input type="text" autoComplete="off" name="firstName" onChange={this.updateDetail.bind(this)} value={this.state.firstName}/>
            </label>
            <br/>
            <label>Enter your Middle Name:
            <input type="text" autoComplete="off" name="middleName" onChange={this.updateDetail.bind(this)} value={this.state.middleName}/>
            </label>
            <br/>
            <label>Enter your Last Name:
            <input type="text" autoComplete="off" name="lastName" onChange={this.updateDetail.bind(this)} value={this.state.lastName}/>
            </label>
            <br/>
            <label>Enter your Date of Birth:
            <br/>
            <input type="date" name="dob" onChange={this.updateDetail.bind(this)} value={this.state.dob}/>
            </label>
            <br/>
            <label>Gender:
            <br/>
            <input type="button" name="gender" onClick={this.updateDetail.bind(this)} value="Male"/>
            <input type="button" name="gender" onClick={this.updateDetail.bind(this)} value="Female"/>
            <input type="button" name="gender" onClick={this.updateDetail.bind(this)} value="Others"/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
            </form>
            </>
            );
        }
        else
        {
           sessionStorage['details']=JSON.stringify(this.state);
            return(
            <>
            <button onClick={this.logout.bind(this)}>Logout</button>
            <div>
            <h1>Verify that entered details are correct </h1>
            <h3>First Name :{this.state.firstName}</h3>
            <h3>Middle Name :{this.state.middleName}</h3>
            <h3>Last Name :{this.state.lastName}</h3>
            <h3>Dob: {this.state.dob}</h3>
            <h3>Gender: {this.state.gender}</h3>
            <button onClick={this.nextPage.bind(this)}>Si ,correcto</button><button onClick={this.edit.bind(this)}>oh No no no no</button>
            </div>
            </>)
        }
    }
}
export default CustomerDetails;