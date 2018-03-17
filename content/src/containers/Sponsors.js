import React, { Component } from "react";
import SponsorsForm from "./SponsorsForm";
import * as SponsorsService from "../services/sponsors.service";

class Sponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sponsors: []
    };
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    SponsorsService.readAll()
      .then(data => {
        this.setState({
          sponsors: data.items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSave(updatedFormData) {
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
    SponsorsService.del(formData._id)
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
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWidgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Sponsors</li>
          </ol>
        </div>
        <div id="content">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 className="page-title txt-color-blueDark">
                <i className="fa fa-building fa-fw" />
                Welcome Sponsor!
              </h1>
            </div>
          </div>
          {this.state.sponsors && <ul>{sponsorItem}</ul>}
          <div>
            <SponsorsForm
              formData={this.state.formData}
              onSave={this.onSave}
              onCancel={this.onCancel}
              onDelete={this.onDelete}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Sponsors;
