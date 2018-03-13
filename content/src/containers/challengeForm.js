import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as challengeService from "../services/challenge.service";

class ChallengeForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      challenges: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
  }

  componentDidMount() {
    challengeService
      .readAll()
      .then(data => [this.setState({ challenges: data })]);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const challenge =
      props.formData && props.formData._id ? props.formData : {};

    const initializedChallenge = {
      _id: challenge._id || "",
      description: challenge.description || "",
      expirationDate: challenge.expirationDate || "",
      points: challenge.points || "",
      dogOwnerType: challenge.dogOwnerType || "",
      createDate: challenge.createDate || "",
      updateDate: challenge.updateDate || ""
    };

    let formData = {
      _id: {
        originalValue: initializedChallenge._id,
        value: initializedChallenge._id,
        valid: true,
        validation: {},
        touched: false
      },
      description: {
        originalValue: initializedChallenge.description,
        value: initializedChallenge.description,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      expirationDate: {
        originalValue: initializedChallenge.expirationDate,
        value: initializedChallenge.expirationDate,
        valid: true,
        validation: {},
        touched: false
      },
      points: {
        originalValue: initializedChallenge.points,
        value: initializedChallenge.points,
        valid: true,
        validation: {},
        touched: false
      },
      dogOwnerType: {
        originalValue: initializedChallenge.dogOwnerType,
        value: initializedChallenge.dogOwnerType,
        valid: true,
        validation: {},
        touched: false
      },
      createDate: {
        originalValue: initializedChallenge.createDate,
        value: initializedChallenge.createDate,
        valid: true,
        validation: {},
        touched: false
      },
      updateDate: {
        originalValue: initializedChallenge.updateDate,
        value: initializedChallenge.updateDate,
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

  render() {
    return (
      <React.Fragment>
        <form>
          <div
            className={
              !this.state.formData._id.valid && this.state.formData._id.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="challengeId">Challenge Id:</label>
            <input
              type="text"
              name="challengeId"
              id="challengeId"
              className="form-control"
              value={this.state.formData._id.value}
              onChange={this.onChange}
            />
          </div>
          <div
            className={
              !this.state.formData.description.valid &&
              this.state.formData.description.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="challengeDescription">Description:</label>
            <input
              type="text"
              name="challengeDescription"
              id="challengeDescription"
              className="form-control"
              value={this.state.formData.description.value}
              onChange={this.onChange}
            />
          </div>
          <div
            className={
              !this.state.formData.expirationDate.valid &&
              this.state.formData.expirationDate.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="challengeExpirationDate">Expiration Date</label>
            <input
              type="text"
              name="challengeExpirationDate"
              id="challengeExpirationDate"
              className="form-control"
              value={this.state.formData.expirationDate.value}
              onChange={this.onChange}
            />
          </div>
          <div
            className={
              !this.state.formData.points.valid &&
              this.state.formData.points.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="challengePoints">Points:</label>
            <input
              type="number"
              name="challengePoints"
              id="challengePoints"
              className="form-control"
              value={this.state.formData.points.value}
              onChange={this.onChange}
            />
          </div>
          <div
            className={
              !this.state.formData.dogOwnerType.valid &&
              this.state.formData.dogOwnerType.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="dogOwnerType">Dog Owner Type:</label>
            <input
              type="text"
              name="dogOwnerType"
              id="dogOwnerType"
              className="form-control"
              value={this.state.formData.dogOwnerType.value}
              onChange={this.onChange}
            />
          </div>
          <div
            className={
              !this.state.formData.createDate.valid &&
              this.state.formData.createDate.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="createDate">Date of creation:</label>
            <input
              type="text"
              name="createDate"
              id="createDate"
              className="form-control"
              value={this.state.formData.createDate.value}
              onChange={this.onChange}
            />
          </div>
          <div
            className={
              !this.state.formData.updateDate.valid &&
              this.state.formData.updateDate.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="updateDate">Date of update:</label>
            <input
              type="text"
              name="updateDate"
              id="updateDate"
              className="form-control"
              value={this.state.formData.updateDate.value}
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
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ChallengeForm;
