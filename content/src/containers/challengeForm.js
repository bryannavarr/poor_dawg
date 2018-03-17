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
    this.onSave = this.onSave.bind(this);
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
      dogOwnerType: challenge.dogOwnerType || ""
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
          required: true
        },
        touched: false
      },
      expirationDate: {
        originalValue: initializedChallenge.expirationDate,
        value: initializedChallenge.expirationDate,
        valid: true,
        validation: {
          required: true,
          date: true
        },
        touched: false
      },
      points: {
        originalValue: initializedChallenge.points,
        value: initializedChallenge.points,
        valid: true,
        validation: {
          required: true,
          number: true,
          max: 500
        },
        touched: false
      },
      dogOwnerType: {
        originalValue: initializedChallenge.dogOwnerType,
        value: initializedChallenge.dogOwnerType,
        valid: true,
        validation: {
          required: true
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
      description: this.state.formData.description.value,
      expirationDate: this.state.formData.expirationDate.value,
      points: this.state.formData.points.value,
      dogOwnerType: this.state.formData.dogOwnerType.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      challengeService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      challengeService
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
              !this.state.formData.description.valid &&
              this.state.formData.description.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
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
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              id="expirationDate"
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
            <label htmlFor="points">Points:</label>
            <input
              type="number"
              name="points"
              id="points"
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

export default ChallengeForm;
