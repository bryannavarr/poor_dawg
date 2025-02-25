import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as interactionService from "../services/interaction.service";
import DogOwnersDropdown from "./DogOwnersDropdown";
import DogsMenu from  './DogsMenu'

class InteractionForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      interactions: [],
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
    const interaction =
      props.formData && props.formData._id ? props.formData : {};

    const intializedInteractions = {
      _id: interaction._id || "",
      challengeId: interaction.challengeId || "",
      dogOwnerId: interaction.dogOwnerId || "",
      dogId: interaction.dogId || "",
      points: interaction.points || ""
    };

    let formData = {
      _id: {
        originalValue: intializedInteractions._id,
        value: intializedInteractions._id,
        valid: true,
        validation: {},
        touched: false
      },
      challengeId: {
        originalValue: intializedInteractions.challengeId,
        value: intializedInteractions.challengeId,
        valid: true,
        validation: {
          objectId: true
        },
        touched: false
      },
      dogOwnerId: {
        originalValue: intializedInteractions.dogOwnerId,
        value: intializedInteractions.dogOwnerId,
        valid: true,
        validation: {
          objectId: true
        },
        touched: false
      },
      dogId: {
        originalValue: intializedInteractions.dogId,
        value: intializedInteractions.dogId,
        valid: true,
        validation: {
          objectId: true
        },
        touched: false
      },
      points: {
        originalValue: intializedInteractions.points,
        value: intializedInteractions.points,
        valid: true,
        validation: {
          required: true,
          max: 100
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
      points: this.state.formData.points.value,
      challengeId: this.state.formData.challengeId.value,
      dogOwnerId: this.state.formData.dogOwnerId.value,
      dogId: this.state.formData.dogId.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      interactionService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(err => console.log(err));
    } else {
      interactionService
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
        <form data-bv-feedbackicons-invalid="glyphicon glyphicon-remove">
          <div className="form-group">
            <label> Interaction ID</label>
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
          <label> Challenge ID</label>
          <div
            className={
              !this.state.formData.challengeId.valid &&
              this.state.formData.challengeId.touched
                ? "form-group has-error has-feedback inputGroupContainer"
                : "form-group  inputGroupContainer"
            }
          >
            <input
              type="text"
              name="challengeId"
              id="challengeId"
              className="form-control "
              value={this.state.formData.challengeId.value}
              onChange={this.onChange}
            />
            {!this.state.formData.challengeId.valid &&
            this.state.formData.challengeId.touched ? (
              <i className=" form-control-feedback bv-icon-input-group glyphicon glyphicon-remove" />
            ) : null}
            {!this.state.formData.challengeId.valid &&
            this.state.formData.challengeId.touched ? (
              <small className="has-error help-block">
                Please enter a valid object ID
              </small>
            ) : null}
          </div>
          <label> Dog Owner</label>
          <div
            className={
              !this.state.formData.dogOwnerId.valid &&
              this.state.formData.dogOwnerId.touched
                ? "form-group has-error has-feedback inputGroupContainer"
                : "form-group inputGroupContainer"
            }
          >
            <DogOwnersDropdown
              value={this.state.formData.dogOwnerId.value}
              onSelect={this.onChange}
            />
            {!this.state.formData.dogOwnerId.valid &&
            this.state.formData.dogOwnerId.touched ? (
              <i className=" form-control-feedback bv-icon-input-group glyphicon glyphicon-remove" />
            ) : null}
            {!this.state.formData.dogOwnerId.valid &&
            this.state.formData.dogOwnerId.touched ? (
              <small className="has-error">Please select a dog owner</small>
            ) : null}
          </div>
          <label> Dog ID</label>
          <div
            className={
              !this.state.formData.dogId.valid &&
              this.state.formData.dogId.touched
                ? "form-group has-error has-feedback inputGroupContainer"
                : "form-group inputGroupContainer"
            }
          >
            <DogsMenu
              value={this.state.formData.dogId.value}
              onChange={this.onChange}
            />
            {!this.state.formData.dogId.valid &&
            this.state.formData.dogId.touched ? (
              <i className=" form-control-feedback bv-icon-input-group glyphicon glyphicon-remove" />
            ) : null}
            {!this.state.formData.dogId.valid &&
            this.state.formData.dogId.touched ? (
              <small className="has-error">
                Please enter a valid object ID
              </small>
            ) : null}
          </div>
          <label> Points</label>
          <div
            className={
              !this.state.formData.points.valid &&
              this.state.formData.points.touched
                ? "form-group has-error has-feedback inputGroupContainer"
                : "form-group inputGroupContainer"
            }
          >
            <input
              type="number"
              name="points"
              id="points"
              className="form-control"
              value={this.state.formData.points.value}
              onChange={this.onChange}
            />
            {!this.state.formData.points.valid &&
            this.state.formData.points.touched ? (
              <i className=" form-control-feedback bv-icon-input-group glyphicon glyphicon-remove" />
            ) : null}
            {!this.state.formData.points.valid &&
            this.state.formData.points.touched ? (
              <small className="has-error">
                Please enter a points value under 100{" "}
              </small>
            ) : null}
          </div>
          <div className="form-actions btn-toolbar">
            <div className="pull-right">
              <button
                type="button"
                onClick={this.onSave}
                className="btn btn-primary"
                disabled={!this.state.formValid}
              >
                Save
              </button>
              <button
                type="button"
                onClick={this.props.onCancel}
                className="btn btn-default"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => this.props.onDelete(this.state.formData)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default InteractionForm;
