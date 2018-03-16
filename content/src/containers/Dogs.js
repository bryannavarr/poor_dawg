import React from "react";
import * as dogsService from "../services/dogs.service";
import DogsForm from './DogsForm'

class Dogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    }

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    dogsService.readAll().then(data => {
      this.setState({ dogs: data.items });
    })
  }

  onCancel() {
    this.setState({ formData: null })
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.dogs.filter(item => {
        return item._id === updatedFormData._id;
      })
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.dogs.map(item => {
          return (
            item._id === updatedFormData._id
              ? updatedFormData
              : item
          );
        });
      }
      else {
        updatedItems = prevState.dogs.concat(updatedFormData);
      }
      return {
        dogs: updatedItems
        , formData: null
        , errorMessage: null
      };
    });
  }

  onDelete() {
    const formData = this.state.formData;

    dogsService.del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.dogs.filter(item => {
            return item._id !== formData._id;
          });
          return { dogs: updatedItems };
        });
        this.onCancel();
      })
      .catch(err => console.log(err))
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    })
  }

  render() {
    const dogs = this.state.dogs ?
      this.state.dogs.map(dog => (
        <ul key={dog._id} onClick={this.onSelect.bind(this, dog)}>
          <li>Breed: {dog.breed} </li>
          <li>Birth Date: {dog.birthDate} </li>
          <li>Adoption Date: {dog.adoptionDate} </li>
          <li>Death Date: {dog.deathDate} </li>
        </ul>
      ))
        : <React.Fragment></React.Fragment>
    
    return (
      <React.Fragment>
        <h1>List of dogs below:</h1>
        <div>{dogs}</div>

        <div>
            <DogsForm
                formData={this.state.formData}
                onSave={this.onSave}
                onCancel={this.onCancel}
                onDelete={this.onDelete}
            />
        </div>
      </React.Fragment>
    );
  }
}
export default Dogs;