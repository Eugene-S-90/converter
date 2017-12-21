import React, { Component } from 'react';
import './App.css';
import Converter from './components/converter';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { msg: "Show all valute compare to 1 $",
    AllRates: [],
    rates:{}
  }
  }
  componentDidMount(){
    fetch('https://openexchangerates.org/api/latest.json?app_id=ec088d5252f94f66b4c67c2a8b8ae212')
    .then(response=> {
        response.json()
        .then(data=> {
          let arrRates=[]
               for (var key in data.rates){
            arrRates.push(key+":"+data.rates[key])
           }
           this.setState({
             AllRates:arrRates,
            rates:data.rates
          })
        })
      })
  }
  render() {
    return (
     <div className="main">
      <Converter rates={this.state.rates}  />
       </div>
    );
  }
}
export default App;









