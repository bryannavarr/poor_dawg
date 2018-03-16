import React from "react";
import * as hackerService from "../services/hacker.service";
import HackerForm from "./HackerForm";

class Hackers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hackers: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    hackerService.readAll().then(data => {
      this.setState({ hackers: data.items });
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    hackerService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.hackers.filter(item => {
            return item._id !== formData._id;
          });

          return { hackers: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.hackers.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.hackers.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.hackers.concat(updatedFormData);
      }
      return {
        hackers: updatedItems,
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
    const hackers = this.state.hackers ? (
      this.state.hackers.map(hacker => (
        <li key={hacker._id} onClick={this.onSelect.bind(this, hacker)}>
          {hacker.name}
        </li>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <div id="ribbon">
          <span class="ribbon-button-alignment">
            <span
              id="refresh"
              class="btn btn-ribbon"
              data-action="resetWidgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i class="fa fa-refresh" />
            </span>
          </span>

          <ol class="breadcrumb">
            <li>Home</li>
            <li>Hacker</li>
          </ol>
        </div>

        <div id="content">
          <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 class="page-title txt-color-blueDark">
                <i class="fa fa-bomb fa-fw " />
                Hackers
                <span>> Do NOT touch</span>
              </h1>
            </div>
          </div>
          <ul>{hackers}</ul>

          <div>
            <HackerForm
              formData={this.state.formData}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onCancel={this.onCancel}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Hackers;
