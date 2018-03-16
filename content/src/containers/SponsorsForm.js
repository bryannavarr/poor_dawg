import React, { Component } from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as SponsorsService from "../services/sponsors.service";

class SponsorsForm extends Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      sponsors: [],
      formData: formData,
      formValid: false
    };
    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({
      formData: formData
    });
  }

  convertPropsToFormData(props) {
    const sponsor = props.formData && props.formData._id ? props.formData : {};

    const initializedSponsor = {
      _id: sponsor._id || "",
      companyName: sponsor.companyName || "",
      firstName: sponsor.firstName || "",
      lastName: sponsor.lastName || "",
      email: sponsor.email || "",
      zipCode: sponsor.zipCode || "",
      phone: sponsor.phone || "",
      createDate: sponsor.createDate || "",
      updateDate: sponsor.updateDate || ""
    };

    let formData = {
      _id: {
        originalValue: initializedSponsor._id,
        value: initializedSponsor._id,
        valid: true,
        validation: {},
        touched: false
      },
      companyName: {
        originalValue: initializedSponsor.companyName,
        value: initializedSponsor.companyName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      firstName: {
        originalValue: initializedSponsor.firstName,
        value: initializedSponsor.firstName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      lastName: {
        originalValue: initializedSponsor.lastName,
        value: initializedSponsor.lastName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      email: {
        originalValue: initializedSponsor.email,
        value: initializedSponsor.email,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      zipCode: {
        originalValue: initializedSponsor.zipCode,
        value: initializedSponsor.zipCode,
        valid: true,
        validation: {},
        touched: true
      },
      phone: {
        originalValue: initializedSponsor.phone,
        value: initializedSponsor.phone,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      createDate: {
        originalValue: initializedSponsor.createDate,
        value: initializedSponsor.createDate,
        valid: true,
        validation: {},
        touched: false
      },
      updateDate: {
        originalValue: initializedSponsor.updateDate,
        value: initializedSponsor.updateDate,
        valid: true,
        validation: {},
        touched: false
      }
    };
    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }

    return formData;
  }

  onSave(event) {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({
        formData: formData
      });
      return;
    }
    const that = this;
    let item = {
      companyName: this.state.formData.companyName.value,
      firstName: this.state.formData.firstName.value,
      lastName: this.state.formData.lastName.value,
      email: this.state.formData.email.value,
      zipCode: this.state.formData.zipCode.value,
      phone: this.state.formData.phone.value,
      updateDate: this.state.formData.updateDate.value
    };
    if (this.state.formData._id.value.length > 0) {
      item.createDate = this.state.formData.createDate.value;
      item._id = this.state.formData._id.value;
      SponsorsService.update(item)
        .then(data => {
          that.props.onSave(item);
          this.setState({
            formValid: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      SponsorsService.create(item)
        .then(data => {
          that.props.onSave({
            ...item,
            _id: data.id,
            createDate:data.createDate,
            updateDate:data.updateDate
          });
          this.setState({
            formValid: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="company-name">Id</label>
            <input
              type="text"
              name="id"
              value={this.state.formData._id.value}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="company-name">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={this.state.formData.companyName.value}
              placeholder="Company Name"
              onChange={this.onChange}
            />
            {!this.state.formData.companyName.valid &&
            this.state.formData.companyName.touched ? (
              <p className="text-danger">This field is required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.formData.firstName.value}
              placeholder="First Name"
              onChange={this.onChange}
            />
            {!this.state.formData.firstName.valid &&
            this.state.formData.firstName.touched ? (
              <p className="text-danger">This field is required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.formData.lastName.value}
              placeholder="Last Name"
              onChange={this.onChange}
            />
            {!this.state.formData.lastName.valid &&
            this.state.formData.lastName.touched ? (
              <p className="text-danger">This field is required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={this.state.formData.email.value}
              placeholder="Email"
              onChange={this.onChange}
            />
            {!this.state.formData.email.valid &&
            this.state.formData.email.touched ? (
              <p className="text-danger">This field is required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="zip-code">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={this.state.formData.zipCode.value}
              placeholder="Zip Code"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              name="phone"
              value={this.state.formData.phone.value}
              placeholder="Phone Number"
              onChange={this.onChange}
            />
            {!this.state.formData.phone.valid &&
            this.state.formData.phone.touched ? (
              <p className="text-danger">This field is required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Create Date</label>
            <input
              type="text"
              name="create-date"
              value={this.state.formData.createDate.value}
              onChange={this.onChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Update Date</label>
            <input
              type="text"
              name="update-date"
              value={this.state.formData.updateDate.value}
              onChange={this.onChange}
              disabled
            />
          </div>
        </form>
        <input
          type="button"
          value="Save"
          onClick={this.onSave}
          disabled={!this.state.formValid}
        />
        <input type="button" value="Cancel" onClick={this.props.onCancel} />
        <input
          type="button"
          value="Delete"
          onClick={() => this.props.onDelete(this.state.formData)}
          disabled={!this.state.formData._id.value}
        />
      </React.Fragment>
    );
  }
}

export default SponsorsForm;
