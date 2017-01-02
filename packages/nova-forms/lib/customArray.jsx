import React, { PropTypes, Component } from 'react';
import DateTimePicker from 'react-datetime';
import {debounce} from 'throttle-debounce';
import moment from 'moment';
import countries from 'meteor/nova:countries';

//import currency from "./meteor/nova:countries/i18n/currency.json";
//console.log("currency: ",currency);
class CustomArray extends Component {
  
  // when the datetime picker mounts, NovaForm will catch the date value (no formsy mixin in this component)
  componentWillMount() {
    
  //console.log("custom array ", this.props)

 

  
  var propsArr = [];
  if(this.props.value.constructor === Array){
      
      this.props.value = this.props.value.forEach(function(items,index){
        if(items !== null){
          propsArr.push(items);
        }
      })
      this.props.value = [];
      this.props.value = propsArr;

  }
  // this.context.addToAutofilledValues({[this.props.name]: this.props.value});
   this.state = {inputvalue: propsArr,name:this.props.name,updateCurrentValue:this.props.updateCurrentValue,currencySelected:'',isExpanded:false};
   this.setState({inputvalue:this.state.inputvalue,name:this.state.name,currencyIcons:this.state.currencyIcons,isExpanded:this.state.isExpanded})
   //this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue});


  
  }

  changeInputValue(event,inputIndex){
   
  //    console.log("inputIndex  :  ",event,inputIndex);
      this.state.inputvalue[inputIndex].country = event.target.value;
      if(this.state.inputvalue[inputIndex].price == undefined){
        this.state.inputvalue[inputIndex].price = '';
      }
      if(this.state.inputvalue[inputIndex].reldate == undefined){
        this.state.inputvalue[inputIndex].reldate = '';
      }
      if(this.state.inputvalue[inputIndex].currencyIcon == undefined){
        this.state.inputvalue[inputIndex].currencyIcon = '';
      }

      this.setState({inputvalue:this.state.inputvalue});
      this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue});
      // this.setValue(this.state.inputvalue);
  }
   changePriceValue(inputIndex,event){
  //  console.log("inputIndex : ",event,inputIndex)
    this.state.inputvalue[inputIndex].price = event.target.value;
     if(this.state.inputvalue[inputIndex].country == undefined){
        this.state.inputvalue[inputIndex].country = '';
      }
      if(this.state.inputvalue[inputIndex].reldate == undefined){
        this.state.inputvalue[inputIndex].reldate = '';
      }
      if(this.state.inputvalue[inputIndex].currencyIcon == undefined){
        this.state.inputvalue[inputIndex].currencyIcon = '';
      }

    this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue});
    this.setState({inputvalue:this.state.inputvalue});
  
    // this.setValue(this.state.inputvalue);
  }

onChangeDate(inputIndex,event){
   //  console.log("inputIndex",event,inputIndex)
    this.state.inputvalue[inputIndex].reldate = event._d;
    this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue});
    this.setState({inputvalue:this.state.inputvalue});
}

  setCurrency(inputIndex,Icon){
  //   console.log("this.state.inputvalue ",this.state.inputvalue,inputIndex,Icon)
    this.state.inputvalue[inputIndex].currencyIcon = Icon;
    this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue});
    this.setState({inputvalue:this.state.inputvalue});
   
  }

  deleteCountry(inputIndex,event){
        this.state.inputvalue.splice(inputIndex, 1);
        this.setState({inputvalue:this.state.inputvalue});
        this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue}); 
  }

  addMore(event){
    if(this.state.inputvalue.constructor !== Array){
      this.state.inputvalue = [];
    }
    else{
        if(this.state.inputvalue[0]==null){
          this.state.inputvalue =[];
          this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue}); 
        }
    }
    this.state.inputvalue.push({});
   // this.context.addToAutofilledValues({[this.state.name]: this.state.inputvalue});
    this.setState({inputvalue:this.state.inputvalue});
  }
  render() {

   var currencyIcons = [];
  countries.find().fetch().forEach(function(countryItems){
      if(countryItems && countryItems.hasOwnProperty("icon")){
        currencyIcons.push(countryItems.icon)  
      }
  })
    var that =  this;
      if(that.state.inputvalue.length ==0){
        return <div className="AdditionalInfoContainer"> <button type="button" className="btn btn-info AdditionalInfoBtn" name="newinput" onClick={that.addMore.bind(that)}>Aditional Information</button></div>
      }
      
    return (
      <div className="form-group row countryRelDateParentContainer">
        <label className="control-label col-sm-3"></label>
        <button type="button" name="newinput" className="btn btn-primary" onClick={that.addMore.bind(that)}>Add Release</button>
        <div className="col-sm-12 ">
        
          {that.state.inputvalue.map(function(items,inputIndex){
            
            return(<div className="countryRelDateContainer">
              <div className="col-xs-2">
                  <input className="form-control"
                  key={"CustomArray_"+inputIndex}
               type="text"  
                placeholder="Country"
                value={items.country}
                name={that.state.name}
                // newDate argument is a Moment object given by re|act-datetime
                onChange={e=> that.changeInputValue(e.persist()||e,inputIndex)}
                  
              />

           
              
             
           </div> 

          <div className="col-xs-2 priceContainer">

           <div className={that.state.isExpanded ? "dropdown open currencyDropDown" : "dropdown currencyDropDown"}>
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" onClick={()=>{ that.setState({isExpanded:!that.state.isExpanded})  }}><i className={items.currencyIcon}></i>
                  <span className="caret"></span></button>
                 
                  <ul className="dropdown-menu">
                        {currencyIcons.map(function(icons){
                           return <li onClick={(e,icons)=>{  that.setState({currencySelected:e.target.className,isExpanded:!that.state.isExpanded}); that.setCurrency(inputIndex,e.target.className); }   }  className={icons} value={icons}></li>
                         })}
                  </ul>  
            </div>
            
            <input
          className="form-control"
              key={"CustomArray_Price_"+inputIndex}
           type="text"  
             placeholder="Price"
            value={items.price}
            name={that.state.name}
            // newDate argument is a Moment object given by react-datetime
            onChange={that.changePriceValue.bind(that,inputIndex)}
              
          />

             

          </div>
          <div className="col-xs-4">
            <DateTimePicker
              name={that.state.name} 
              key={"CustomArray_relDate_"+inputIndex}
              value={items.reldate || new Date()}
              // newDate argument is a Moment object given by react-datetime
              onChange={that.onChangeDate.bind(that,inputIndex)}
              format={"x"} 
            />
  
          </div>
          <button type="button" className="btn btn-danger" onClick={that.deleteCountry.bind(that,inputIndex)}> Delete</button>


            </div>)
          })}

      

        </div>
      </div>
    );
  }
}

CustomArray.propTypes = {
  // control: React.PropTypes.any,
  // datatype: React.PropTypes.any,
  // group: React.PropTypes.any,
  // label: React.PropTypes.string,
  // name: React.PropTypes.string,
  // value: React.PropTypes.any,
};

CustomArray.contextTypes = {
  addToAutofilledValues: React.PropTypes.func,
  updateCurrentValue: React.PropTypes.func,
};

export default CustomArray;
// <DateTimePicker
//             name={that.state.name[inputIndex]['price']} 
//             key={"CustomArray_relDate_"+inputIndex}
//             value={items.reldate || new Date()}
//             // newDate argument is a Moment object given by react-datetime
//             onChange={that.onChangeDate.bind(that,inputIndex)}
//             format={"x"} 
//           />
// <input
//               key={"CustomArray_Price_"+inputIndex}
//            type="text"  
//             value={items.price}
//             name={that.state.name[inputIndex]['price']}
//             // newDate argument is a Moment object given by react-datetime
//             onChange={that.changePriceValue.bind(that,inputIndex)}
              
//           />
 // <select onChange={ (e)=>{ console.log("state : ",that.state.currencySelected,e.target.value); that.setState({currencySelected:e.target.value}) }   }  value={that.state.currencySelected} className={that.state.currencySelected}>
 //                    {currencyIcons.map(function(icons){
 //                      return <option  className={icons} value={icons}><i className={icons}/></option>
 //                    })}
                   
 //                </select>

