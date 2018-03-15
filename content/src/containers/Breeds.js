import React from "react";
import * as breedService from "../services/breed.service";
import BreedForm from "./BreedForm";

class Breeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: []
    };
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    breedService
      .readAll()
      .then(data => {
        this.setState({ breeds: data.data.items });
      })
      .catch(err => console.log(err));
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;
    breedService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.breeds.filter(
            item => item._id !== formData._id
          );
          return { breeds: updatedItems };
        });
        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.breeds.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.breeds.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.breeds.concat(updatedFormData);
      }
      return {
        breeds: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
  }

  render() {
    const breeds = this.state.breeds ? (
      this.state.breeds.map(breed => (
        <li
          key={breed._id}
          onClick={this.onSelect.bind(this, breed)}
        >
        
            {`ID: ${breed._id}, `}
            {` ${breed.individualNeeds},`}
            {`${breed.name}, `}
            {`${breed.activityLevel}, `}
         
        </li>
      ))
    ) : (
      <span> NONE </span>
    );

    return (
      <div>
        <div>
          <BreedForm
            formData={this.state.formData}
            onSave={this.onSave}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
          />
        </div>
        <div className="container">
          <h1>
            {" "}
            Breeds
            {breeds}
          </h1>
        </div>
      </div>
    );
  }
}

export default Breeds;
