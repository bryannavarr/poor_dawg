import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as breedService from "../services/breed.service";

class BreedForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      breeds: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const breed = props.formData && props.formData._id ? props.formData : {};

    const initializedBreed = {
      _id: breed._id || "",
      name: breed.name || "",
      individualNeeds: breed.individualNeeds || "",
      activityLevel: breed.activityLevel || ""
    };

    let formData = {
      _id: {
        originalValue: initializedBreed._id,
        value: initializedBreed._id,
        valid: true,
        validation: {},
        touched: false
      },
      name: {
        originalValue: initializedBreed.name,
        value: initializedBreed.name,
        validation: {
          required: true
        },
        touched: false
      },
      individualNeeds: {
        originalValue: initializedBreed.individualNeeds,
        value: initializedBreed.individualNeeds,
        validation: {
          required: true
        },
        touched: false
      },
      activityLevel: {
        originalValue: initializedBreed.activityLevel,
        value: initializedBreed.activityLevel,
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
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
      return;
    }
    const that = this;
    let item = {
      name: this.state.formData.name.value,
      individualNeeds: this.state.formData.individualNeeds.value,
      activityLevel: this.state.formData.activityLevel.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      breedService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(err => console.log(err));
    } else {
      breedService
        .create(item)
        .then(data => {
          this.setState(prevState => {
            const field = { ...prevState.formData._id, _id: data.data.item };
            const formData = { ...prevState.formData, _id: field };
            return { ...prevState, formData };
          });

          that.props.onSave({ ...item, _id: data.data.item });
        })
        .catch(err => console.log(err));
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
            <label htmlFor="name">Name:</label>
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
              <p className="text-danger">The Name is Required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.individualNeeds.valid &&
              this.state.formData.individualNeeds.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="individualNeeds">Individual Needs:</label>
            <input
              type="text"
              name="individualNeeds"
              id="individualNeeds"
              className="form-control"
              value={this.state.formData.individualNeeds.value}
              onChange={this.onChange}
            />
            {!this.state.formData.individualNeeds.valid &&
            this.state.formData.individualNeeds.touched ? (
              <p className="text-danger">Individual Needs is Required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.activityLevel.valid &&
              this.state.formData.activityLevel.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="activityLevel">Activity Level:</label>
            <input
              type="text"
              name="activityLevel"
              id="activityLevel"
              className="form-control"
              value={this.state.formData.activityLevel.value}
              onChange={this.onChange}
            />
            {!this.state.formData.activityLevel.valid &&
            this.state.formData.activityLevel.touched ? (
              <p className="text-danger">Activity Level is Required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="itemId">Breed Id:</label>
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

export default BreedForm;
