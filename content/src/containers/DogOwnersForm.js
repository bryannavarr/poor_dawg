import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as dogOwnerService from "../services/dogOwner.service";

class DogOwnerForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      dogOwners: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    dogOwnerService.readAll().then(data => {
      this.setState({ dogOwners: data });
    });
  }
  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const dogOwner = props.formData && props.formData._id ? props.formData : {};

    const initializedDogOwner = {
      _id: dogOwner._id || "",
      name: dogOwner.name || "",
      lastName: dogOwner.lastName || "",
      zipCode: dogOwner.zipCode || "",
      email: dogOwner.email || "",
      phone: dogOwner.phone || "",
      dogs: dogOwner.dogs || "",
      subscriptionLevel: dogOwner.subscriptionLevel || ""
    };

    let formData = {
      _id: {
        originalValue: initializedDogOwner._id,
        value: initializedDogOwner._id,
        valid: true,
        validation: {},
        touched: false
      },
      name: {
        originalValue: initializedDogOwner.name,
        value: initializedDogOwner.name,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      lastName: {
        originalValue: initializedDogOwner.lastName,
        value: initializedDogOwner.lastName,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      zipCode: {
        originalValue: initializedDogOwner.zipCode,
        value: initializedDogOwner.zipCode,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      },
      email: {
        originalValue: initializedDogOwner.email,
        value: initializedDogOwner.email,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      },
      phone: {
        originalValue: initializedDogOwner.phone,
        value: initializedDogOwner.phone,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      },
      dogs: {
        originalValue: initializedDogOwner.dogs,
        value: initializedDogOwner.dogs,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      },
      subscriptionLevel: {
        originalValue: initializedDogOwner.subscriptionLevel,
        value: initializedDogOwner.subscriptionLevel,
        valid: true,
        validation: {
          maxLength: 50
        },
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
      this.setState({ formData: formData });
      return;
    }
    const that = this;
    let item = {
      name: this.state.formData.name.value,
      lastName: this.state.formData.lastName.value,
      zipCode: this.state.formData.zipCode.value,
      email: this.state.formData.email.value,
      phone: this.state.formData.phone.value,
      dogs: this.state.formData.dogs.value,
      subscriptionLevel: this.state.formData.subscriptionLevel.value
    };
    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      dogOwnerService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      dogOwnerService
        .create(item)
        .then(data => {
          this.setState(prevState => {
            const field = { ...prevState.formData._id, _id: data };
            const formData = { ...prevState.formData, _id: field };
            return { ...prevState, formData: formData };
          });
          that.props.onSave({ ...item, _id: data.item });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <div
            className={
              !this.state.formData.name.valid &&
              this.state.formData.name.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={this.state.formData.name.value}
              onChange={this.onChange}
            />
            {!this.state.formData.name.valid &&
            this.state.formData.name.touched ? (
              <p className="text-danger">First Name is required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.lastName.valid &&
              this.state.formData.lastName.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
              value={this.state.formData.lastName.value}
              onChange={this.onChange}
            />
            {!this.state.formData.lastName.valid &&
            this.state.formData.lastName.touched ? (
              <p className="errorMessage">Last Name is required</p>
            ) : null}
          </div>

          <div
            className={
              !this.state.formData.zipCode.valid &&
              this.state.formData.zipCode.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="number" 
              name="zipCode" 
              id="zipCode" 
              className="form-control"
              value={this.state.formData.zipCode.value}
              onChange={this.onChange}
            />
            {!this.state.formData.zipCode.valid &&
            this.state.formData.zipCode.touched ? (
              <p className="text-danger">Zip Code required</p>
            ) : null}
          </div>

          <div
            className={
              !this.state.formData.email.valid &&
              this.state.formData.email.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label>Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={this.state.formData.email.value}
              onChange={this.onChange}
            />
            {!this.state.formData.email.valid &&
            this.state.formData.email.touched ? (
              <p className="errorMessage">Type your e-mail</p>
            ) : null}
          </div>

          <div
            className={
              !this.state.formData.phone.valid &&
              this.state.formData.phone.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label>Phone:</label>
            <input
              type="number"
              name="phone"
              id="phone"
              className="form-control"
              value={this.state.formData.phone.value}
              onChange={this.onChange}
            />
            {!this.state.formData.phone.valid &&
            this.state.formData.phone.touched ? (
              <p className="errorMessage">Type your phone number</p>
            ) : null}
          </div>

          <div
            className={
              !this.state.formData.dogs.valid &&
              this.state.formData.dogs.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label>Dogs:</label>
            <input
              type="text"
              name="dogs"
              id="dogs"
              className="form-control"
              value={this.state.formData.dogs.value}
              onChange={this.onChange}
            />
            {!this.state.formData.dogs.valid &&
            this.state.formData.dogs.touched ? (
              <p className="errorMessage">Type your dog's name</p>
            ) : null}
          </div>

          <div
            className={
              !this.state.formData.subscriptionLevel.valid &&
              this.state.formData.subscriptionLevel.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label>subscriptionLevel:</label>
            <input
              type="text"
              name="subscriptionLevel"
              id="subscriptionLevel"
              className="form-control"
              value={this.state.formData.subscriptionLevel.value}
              onChange={this.onChange}
            />
            {!this.state.formData.subscriptionLevel.valid &&
            this.state.formData.subscriptionLevel.touched ? (
              <p className="errorMessage">Choose a subscriptionLevel</p>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="itemId">DogOwner Id:</label>
            <input
              type="text"
              name="id"
              id="itemId"
              className="form-control"
              disabled
              value={this.state.formData._id.value}
              onChange={this.onChange}
            />
          </div>

          <div className="btn-group" role="group">
            <button
              type="button"
              onClick={this.onSave}
              className="btn btn-primary btn-sm"
              disabled={!this.state.formValid}
            >
              Save
            </button>
            <button
              type="button"
              onClick={this.props.onCancel}
              className="btn btn-default btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => this.props.onDelete(this.state.formData)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default DogOwnerForm;
