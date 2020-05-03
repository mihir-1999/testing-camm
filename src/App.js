import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import LogIn from './Pages/LogIn';
import CustomerDetails from './Pages/CustomerDetails';
import Selfie from './Pages/Selfie';
import GovtID from  './Pages/GovtID';
import Success from './Pages/Success';
import './App.css';


class App extends Component {
    constructor(){
    super();
        console.log('AppConstructor');
    }
        state={
        pages:[
          
          {
            id:0,
            address:"/",
            name: LogIn,
            nextPage:"/customerdetails"
          },
          {
            id:1,
            address:"/customerdetails",
            name: CustomerDetails,
            nextPage:"/selfie"
          },
          {
            id:2,
            address:"/selfie",
            name: Selfie,
            nextPage:"/govtid"
          },
          {
            id:3,
            address: "/govtid",
            name:GovtID,
            nextPage:"/success"
          },
          {
            id:4,
            address: "/success",
            name: Success,
            nextPage:"/"
          }
        ]
      }

    componentDidMount(){
      console.log('AppComponentDidMount');
      this.state.pages.map((page)=>{
        return(
          localStorage.setItem(page.address,page.nextPage)
        )
      })
      localStorage.setItem('currentPage','/');
    }
  
    
    
    render(){
      
      return(
        <Router>
        {
          this.state.pages.map((page)=>{
            return(
              <Route exact strict path={page.address} component={page.name} key={page.id}></Route>
              )
            })
          }
        </Router>
      );
    }

}

export default App;
