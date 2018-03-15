import React, { Component } from "react";
import SponsorsForm from "./SponsorsForm";
import * as SponsorsService from "../services/sponsors.service";

class Sponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsors: []
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    SponsorsService.getAll()
      .then(data => {
        this.setState({
          sponsors: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSave(updatedFormData) {
    debugger;
    this.setState(prevState => {
      const existingItem = prevState.sponsors.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.sponsors.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.sponsors.concat(updatedFormData);
      }
      return {
        sponsors: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onSelect(item, event) {
    this.setState({
      formData: item
    });
  }

  onCancel(event) {
    this.setState({
      formData: null
    });
  }

  onDelete() {
    const formData = this.state.formData;
    SponsorsService.deleteEntry(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.sponsors.filter(item => {
            return item._id !== formData._id;
          });
          return { sponsors: updatedItems };
        });
        this.onCancel();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const sponsorItem = this.state.sponsors.map(sponsors => {
      return (
        <li key={sponsors._id} onClick={this.onSelect.bind(this, sponsors)}>
          <h3>
            {sponsors.firstName} {sponsors.lastName} of {sponsors.companyName}
          </h3>
          <p>Email:{sponsors.email}</p>
          <p>Zip Code:{sponsors.zipCode}</p>
          <p>Phone #:{sponsors.phone}</p>
        </li>
      );
    });
    return (
      <React.Fragment>
        <h1>Welcome Sponsor!</h1>
        {this.state.sponsors && <ul>{sponsorItem}</ul>}
        <SponsorsForm
          formData={this.state.formData}
          onSave={this.onSave}
          onCancel={this.onCancel}
          onDelete={this.onDelete}
        />
      </React.Fragment>
    );
  }
}

export default Sponsors;
