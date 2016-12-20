import React, { PropTypes, Component } from 'react';
import FRC from 'formsy-react-components';
import ReactTagInput from 'react-tag-input';

const ReactTags = ReactTagInput.WithContext;

const Input = FRC.Input;

class CustomAutoForm extends Component {

  constructor(props) {
    super(props);
	console.log("post auto form",Posts,props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);


  }

  handleDelete(i) {

    const tags = this.state.tags;
    tags.splice(i, 1);
    
    const value = this.state.value;
    value.splice(i,1);

    this.setState({
      tags: tags,
      value: value
    });
  }

  handleAddition(tag) {
    
    // first, check if added tag is part of the possible options
    const option = _.findWhere(this.props.options, {label: tag});

    if (option) {

      // add tag to state (for tag widget)
      const tags = this.state.tags;
      tags.push({
          id: tags.length + 1,
          text: tag
      });

      // add value to state (to store in db)
      const value = this.state.value;
      value.push(option.value);

      this.setState({
        tags: tags,
        value: value
      });
    }

  }
  onChageForm(event){
	  
  }

  render() {

    const {name, value, label} = this.props;

    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">DateCountry</label>
        <div className="col-sm-9">
          <div className="tags-field">
			<input type="input" onChange={this.onChageForm.bind(this)} className="form-control"  name="datecountry" value="one"/>
          </div>
        </div>
      </div>
    );
  }
}

CustomAutoForm.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string
}

export default CustomAutoForm;