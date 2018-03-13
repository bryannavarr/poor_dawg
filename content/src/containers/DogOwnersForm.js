import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as dogOwnerService from "../services/dogOwner.service";

class DogOwners extends React.Component {
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
      name: dogOwner.name || ""
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
    //   for let in
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
      return;
    }
    const that = this;
    let item = {
      name: this.state.formData.name.value
    };
// check for array length?
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
          {/* input starts */}
          {/* tried to change name to first name and it's giving me an error */}
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={this.state.formData.name.value}
              onChange={this.onChange}
            />
            {/* {!this.state.formData.name.valid &&
            this.state.formData.name.touched ? (
              <p className="text-danger">The Name is required</p>
            ) : null} */}
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

export default DogOwners;
