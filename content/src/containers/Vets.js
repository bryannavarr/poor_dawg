import React from "react";
import * as vetService from "../services/vet.service";
import VetForm from "./VetForm";

class Vets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vets: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    vetService.readAll().then(data => {
      this.setState({ vets: data.items });
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    vetService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.vets.filter(item => {
            return item._id !== formData._id;
          });

          return { vets: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.vets.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.vets.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.vets.concat(updatedFormData);
      }
      return {
        vets: updatedItems,
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
    const vets = this.state.vets ? (
      this.state.vets.map(vet => (
        <li key={vet._id} onClick={this.onSelect.bind(this, vet)}>
          {vet.firstName + " " + vet.lastName}
        </li>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <div className="container">
        <div className="row">
          <div className='panel'>
            <ul>{vets}</ul>
          </div>
          <div>
            <VetForm
              formData={this.state.formData}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onCancel={this.onCancel}
            />
          </div>
        </div>
      </div>

    )
  }
}

export default Vets;
