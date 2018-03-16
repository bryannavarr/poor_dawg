import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as dogsService from "../services/dogs.service";

class DogsForm extends React.Component {
  constructor(props) {
    super(props)

    const formData = this.convertPropsToFormData(props);

    this.state = {
      dogs: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    dogsService.readAll().then(data => {
      this.setState({ dogs: data });
    });
  }

  componentWillReceiveProps(nextProps) {
      const formData = this.convertPropsToFormData(nextProps);
      this.setState({formData: formData})
  }

  convertPropsToFormData(props) {
      const dog = props.formData && props.formData._id
        ? props.formData
        : {};

        const initializedDog = {
            _id: dog._id || '',
            breed: dog.breed || '',
            birthDate: dog.birthDate || '',
            adoptionDate: dog.adoptionDate || '',
            deathDate: dog.deathDate || ''
        }

        let formData = {
            _id: {
                originalValue: initializedDog._id,
                value: initializedDog._id,
                valid: true,
                validation: {},
                touched: false
            },
            breed: {
                originalValue:initializedDog.breed,
                value: initializedDog.breed,
                valid: true,
                validation: {
                    required: true,
                    maxLength: 50
                },
                touched: false
            },
            birthDate: {
                originalValue:initializedDog.birthDate,
                value: initializedDog.birthDate,
                valid: true,
                validation: {
                    required: true,
                    maxLength: 50
                },
                touched: false
            },
            adoptionDate: {
                originalValue:initializedDog.adoptionDate,
                value: initializedDog.adoptionDate,
                valid: true,
                validation: {
                    required: true,
                    maxLength: 50
                },
                touched: false
            },
            deathDate: {
                originalValue:initializedDog.deathDate,
                value: initializedDog.deathDate,
                valid: true,
                validation: {
                    required: true,
                    maxLength: 50
                },
                touched: false
            }
        }

        for (let fieldName in formData) {
            const field = formData[fieldName]
            field.valid = validationHelper.validate(field.value, field.validation)
        }

        return formData;
    }

  onSave(event) {
      if (!this.state.formValid) {
          const formData = JSON.parse(JSON.stringify(this.state.formData));
          for (let fieldIdntifier in formData) {
              formData[fieldIdntifier].touched = false;
          }
          this.setState({ formData: formData });
          return;
      }
      const that = this;
      let item = {
          breed: this.state.formData.breed.value
          , birthDate: this.state.formData.birthDate.value
          , adoptionDate: this.state.formData.adoptionDate.value
          , deathDate: this.state.formData.deathDate.value
      };

      if (this.state.formData._id.value.length > 0) {
          item._id = this.state.formData._id.value
          dogsService.update(item)
            .then(data => {
                that.props.onSave(item);
            })
            .catch(
                error => console.log(error)
            );
      } else {
          dogsService.create(item)
            .then(data => {
                this.setState(prevState => {
                    const field = { ...prevState.formData._id, _id: data };
                    const formData = { ...prevState.formData, _id: field };
                    return { ...prevState, formData: formData };
                });

                that.props.onSave({ ...item, _id: data.item });
            })
            .catch(
                error => console.log(error)
            );
      }
  }

  render() {
    return (
        <React.Fragment>
            <form className='container'>
                <div className={!this.state.formData.breed.valid && this.state.formData.breed.touched
                    ? 'form-group has-error' : 'form-group'} >
                    <label htmlFor='breed'>Breed:</label>
                    <input type='text' name='breed' id='breed'
                        className='form-control'
                        value={this.state.formData.breed.value}
                        onChange={this.onChange} />
                    {!this.state.formData.breed.valid && this.state.formData.breed.touched
                        ? <p className='text-danger'> The Breed is required</p> : null}
                </div>
                <div className={!this.state.formData.birthDate.valid && this.state.formData.birthDate.touched
                    ? 'form-group has-error' : 'form-group'} >
                    <label htmlFor='birthDate'>Birth Date:</label>
                    <input type='text' name='birthDate' id='birthDate'
                        className='form-control'
                        value={this.state.formData.birthDate.value}
                        onChange={this.onChange} />
                    {!this.state.formData.birthDate.valid && this.state.formData.birthDate.touched
                        ? <p className='text-danger'> The Birth Date is required</p> : null}
                </div>
                <div className={!this.state.formData.adoptionDate.valid && this.state.formData.adoptionDate.touched
                    ? 'form-group has-error' : 'form-group'} >
                    <label htmlFor='adoptionDate'>Adoption Date:</label>
                    <input type='text' name='adoptionDate' id='adoptionDate'
                        className='form-control'
                        value={this.state.formData.adoptionDate.value}
                        onChange={this.onChange} />
                    {!this.state.formData.adoptionDate.valid && this.state.formData.adoptionDate.touched
                        ? <p className='text-danger'> The Adoption Date is required</p> : null}
                </div>
                <div className={!this.state.formData.deathDate.valid && this.state.formData.deathDate.touched
                    ? 'form-group has-error' : 'form-group'} >
                    <label htmlFor='deathDate'>Death Date:</label>
                    <input type='text' name='deathDate' id='deathDate' 
                        className='form-control'
                        value={this.state.formData.deathDate.value}
                        onChange={this.onChange} />
                    {!this.state.formData.deathDate.valid && this.state.formData.deathDate.touched
                        ? <p className='text-danger'> The Death Date is required</p> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor='itemId'>Dog Id:</label>
                    <input type='text' name='id' id='itemId'
                        className='form-control'
                        disabled
                        value={this.state.formData._id.value}
                        onChange={this.onChange} />
                </div>
                
                <div className='btn-group' role='group'>
                    <button type='button'
                        onClick={this.onSave}
                        className='btn btn-success btn-sm'
                        disabled={!this.state.formValid} >
                        Save
                    </button>
                    <button type='button'
                        onClick={this.props.onCancel}
                        className='btn btn-default btn-sm' >
                        Cancel
                    </button>
                    <button type = 'button'
                        onClick={() => this.props.onDelete(this.state.formData)}
                        className='btn btn-danger btn-sm' >
                        Delete
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
  }

}

export default DogsForm;