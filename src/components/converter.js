import React, { Component } from 'react';


 export class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = { msg: "Your result is:",
        inputValue:1,
        list_currency_names: [],
        modificator2:"",
        modificator:"",
        result:""
      };
        this.getModificatorRightSelect= this.getModificatorRightSelect.bind(this),
        this.getModificatorLeftSelect= this.getModificatorLeftSelect.bind(this),
        this.showResult= this.showResult.bind(this),
        this.changeInput= this.changeInput.bind(this)
      }
  getModificatorRightSelect(e){
    let current_valute,
        modificator_arr = []
    current_valute = e.target.value.substr(0,3)
    for (let key in this.props.rates){
      if (current_valute === key)
        modificator_arr.push(this.props.rates[key])
    }
    modificator_arr = modificator_arr.join()
    this.setState({modificator:modificator_arr})
  }

  getModificatorLeftSelect(e){
    let current_valute2,
        modificator_arr2 = []
    current_valute2 = e.target.value.substr(0,3)
    for (let key in this.props.rates){
      if (current_valute2 === key)
        modificator_arr2.push(this.props.rates[key])
    }
    modificator_arr2 = modificator_arr2.join()
    this.setState({modificator2:modificator_arr2})
  }



  changeInput(e){
   this.setState({ inputValue:e.target.value }) 
  }


  showResult(){
    let modificator,
        modificator2, 
        result
    modificator = this.state.modificator
    modificator2 = this.state.modificator2||1  

      // Добавил единицу тк был баг (если не изменять поля, не вноситься значение долллара и колличество то  происходит деление 0 на число)
    result = ((modificator/modificator2) * this.state.inputValue)
    this.setState({result:result})
  }
  componentDidMount(){
        fetch('https://openexchangerates.org/api/currencies.json')
        .then(response=> {
            response.json()
            .then(data=> {
              let arrlist_currency_names=[]
              for (let key in data){
                arrlist_currency_names.push(key+":"+data[key])
              }
               this.setState({list_currency_names:arrlist_currency_names})
            })
          })
      }
  render() {
    return (
      <div className="app_wrapper"> 
        <div className="app_choose_wrapper">
          <form>
            <input onChange={this.changeInput} type="number" value={this.state.inputValue}/>
          </form>

          <select onChange={this.getModificatorLeftSelect} className="currencies_left">
            <option className="currencies_left__item">USD</option>
               {this.state.list_currency_names.map((item, index) =>
            <option key={index} className="currencies__item">{item}</option>
                )} 
          </select>

          <select onChange={this.getModificatorRightSelect} className="currencies_right">
          <option className="currencies_left__item">Chose current valute</option>
              {this.state.list_currency_names.map((item, index) =>
            <option key={index} className="currencies_right__item">{item}</option>
                )}
          </select>

          <button className="convert_btn" onClick={this.showResult}>CONVERT</button>
        </div>

        <div className="app_result_wrapper">
          <p className="app_result__title">{this.state.msg}</p>
          <form>
            <input type="number" value={this.state.result}/>
          </form>
        </div>
      </div>
    );
  }
}
export default Converter;





