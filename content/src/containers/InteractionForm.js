import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as interactionService from "../services/interaction.service";

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

  componentDidMount() {
    interactionService.readAll().then(data => {
      this.setState({ interactions: data.data.items });
    });
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
      dogId: this.state.formData.dogOwnerId.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      // add update date here
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
        <form>
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
          <div
            className={
              !this.state.formData.challengeId.valid &&
              this.state.formData.challengeId.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label> Challenge ID</label>
            <input
              type="text"
              name="challengeId"
              id="challengeId"
              className="form-control"
              value={this.state.formData.challengeId.value}
              onChange={this.onChange}
            />
            {!this.state.formData.challengeId.valid &&
            this.state.formData.challengeId.touched ? (
              <p className="has-error">Please enter a valid object ID</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.dogOwnerId.valid &&
              this.state.formData.dogOwnerId.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label> Dog Owner ID</label>
            <input
              type="text"
              name="dogOwnerId"
              id="dogOwnerId"
              className="form-control"
              value={this.state.formData.dogOwnerId.value}
              onChange={this.onChange}
            />
            {!this.state.formData.dogOwnerId.valid &&
            this.state.formData.dogOwnerId.touched ? (
              <p className="has-error">Please enter a valid object ID</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.dogId.valid &&
              this.state.formData.dogId.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label> Dog ID</label>
            <input
              type="text"
              name="dogId"
              id="dogId"
              className="form-control"
              value={this.state.formData.dogId.value}
              onChange={this.onChange}
            />
            {!this.state.formData.dogId.valid &&
            this.state.formData.dogId.touched ? (
              <p className="has-error">Please enter a valid object ID</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.points.valid &&
              this.state.formData.points.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label> Points</label>
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
              <p className="has-error">
                Please enter a points value under 100{" "}
              </p>
            ) : null}
          </div>

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
        </form>
      </React.Fragment>
    );
  }
}

export default InteractionForm;
