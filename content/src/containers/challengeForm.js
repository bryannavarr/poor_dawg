import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as challengeService from "../services/challenge.service";
import OwnerTypeDropdown from "./OwnerTypeDropdown";

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
        <form className="bv-form">
          <fieldset>
            <div className="form-group">
              <div className="row">
                {/* ============================================================== */}
                <div
                  className={
                    !this.state.formData.description.touched
                      ? "col-md-8 has-feedback"
                      : !this.state.formData.description.valid
                        ? "col-md-8 has-feedback has-error"
                        : "col-md-8 has-feedback has-success"
                  }
                >
                  <label className="control-label">Description:</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    value={this.state.formData.description.value}
                    onChange={this.onChange}
                  />
                  <i
                    className={
                      !this.state.formData.description.valid &&
                      this.state.formData.description.touched
                        ? "form-control-feedback glyphicon glyphicon-remove"
                        : "form-control-feedback glyphicon glyphicon-ok"
                    }
                    data-bv-icon-for="description"
                    style={{
                      display: this.state.formData.description.touched
                        ? "block"
                        : "none"
                    }}
                  />
                </div>
                {/* ============================================================== */}
                <OwnerTypeDropdown
                  onChange={this.onChange}
                  ownerType={this.state.formData.dogOwnerType.value}
                />
                {/* ============================================================== */}
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <div className="row">
                {/* ============================================================== */}
                <div
                  className={
                    !this.state.formData.expirationDate.touched
                      ? "col-md-8 has-feedback"
                      : !this.state.formData.expirationDate.valid
                        ? "col-md-8 has-feedback has-error"
                        : "col-md-8 has-feedback has-success"
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
                  <i
                    className={
                      !this.state.formData.expirationDate.valid &&
                      this.state.formData.expirationDate.touched
                        ? "form-control-feedback glyphicon glyphicon-remove"
                        : "form-control-feedback glyphicon glyphicon-ok"
                    }
                    data-bv-icon-for="description"
                    style={{
                      display: this.state.formData.expirationDate.touched
                        ? "block"
                        : "none"
                    }}
                  />
                </div>
                {/* ============================================================== */}
                <div
                  className={
                    !this.state.formData.points.touched
                      ? "col-md-4 has-feedback"
                      : !this.state.formData.points.valid
                        ? "col-md-4 has-feedback has-error"
                        : "col-md-4 has-feedback has-success"
                  }
                >
                  <label htmlFor="points">Points</label>
                  <input
                    type="number"
                    name="points"
                    id="points"
                    className="form-control"
                    value={this.state.formData.points.value}
                    onChange={this.onChange}
                  />
                  <i
                    className={
                      !this.state.formData.points.valid &&
                      this.state.formData.points.touched
                        ? "form-control-feedback glyphicon glyphicon-remove"
                        : "form-control-feedback glyphicon glyphicon-ok"
                    }
                    data-bv-icon-for="description"
                    style={{
                      display: this.state.formData.points.touched
                        ? "block"
                        : "none"
                    }}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          {/* ============================================================== */}
          <div className="form-actions">
            <div className="row">
              <div className="col-md-12">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={this.props.onCancel}
                    className="btn btn-default"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={this.onSave}
                    className="btn btn-primary"
                    disabled={!this.state.formValid}
                  >
                    Save
                  </button>
                  {this.state.formData._id.value ? (
                    <button
                      type="button"
                      onClick={() => this.props.onDelete(this.state.formData)}
                      className="btn btn-danger"
                      disabled={!this.state.formValid}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ChallengeForm;
