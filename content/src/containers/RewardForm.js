import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as rewardService from "../services/reward.service";

class Rewards extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      rewards: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    rewardService.readAll().then(data => {
      this.setState({ rewards: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const reward = props.formData && props.formData._id ? props.formData : {};

    const initializedReward = {
      _id: reward._id || "",
      title: reward.title || "",
      type: reward.type || "",
      restrictions: reward.restrictions || "",
      description: reward.description || "",
      pointsRequired: reward.pointsRequired || "",
      sponsor: reward.sponsor || ""
    };

    let formData = {
      _id: {
        originalValue: initializedReward._id,
        value: initializedReward._id,
        valid: true,
        validation: {},
        touched: false
      },
      title: {
        originalValue: initializedReward.title,
        value: initializedReward.title,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      restrictions: {
        originalValue: initializedReward.restrictions,
        value: initializedReward.restrictions,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      description: {
        originalValue: initializedReward.description,
        value: initializedReward.description,
        valid: true,
        validation: {
          required: true,
          maxLength: 128
        },
        touched: false
      },
      pointsRequired: {
        originalValue: initializedReward.pointsRequired,
        value: initializedReward.pointsRequired,
        valid: true,
        validation: {
          required: true,
          max: 2000
        },
        touched: false
      },
      sponsor: {
        originalValue: initializedReward.sponsor,
        value: initializedReward.sponsor,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      type: {
        originalValue: initializedReward.type,
        value: initializedReward.type,
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
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
      return;
    }
    const that = this;
    let item = {
      title: this.state.formData.title.value,
      type: this.state.formData.type.value,
      restrictions: this.state.formData.restrictions.value,
      description: this.state.formData.description.value,
      pointsRequired: this.state.formData.pointsRequired.value,
      sponsor: this.state.formData.sponsor.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      rewardService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      rewardService
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
              !this.state.formData.title.valid &&
              this.state.formData.title.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={this.state.formData.title.value}
              onChange={this.onChange}
            />
            {!this.state.formData.title.valid &&
            this.state.formData.title.touched ? (
              <p className="text-danger">The title is required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.restrictions.valid &&
              this.state.formData.restrictions.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="restrictions">Restrictions:</label>
            <input
              type="text"
              name="restrictions"
              id="restrictions"
              className="form-control"
              value={this.state.formData.restrictions.value}
              onChange={this.onChange}
            />
            {!this.state.formData.restrictions.valid &&
            this.state.formData.restrictions.touched ? (
              <p className="text-danger">The restrictions is required</p>
            ) : null}
          </div>
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
            {!this.state.formData.description.valid &&
            this.state.formData.description.touched ? (
              <p className="text-danger">The description is required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.pointsRequired.valid &&
              this.state.formData.pointsRequired.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="pointsRequired">Points Required:</label>
            <input
              type="number"
              name="pointsRequired"
              id="pointsRequired"
              className="form-control"
              value={this.state.formData.pointsRequired.value}
              onChange={this.onChange}
            />
            {!this.state.formData.pointsRequired.valid &&
            this.state.formData.pointsRequired.touched ? (
              <p className="text-danger">The pointsRequired is required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.sponsor.valid &&
              this.state.formData.sponsor.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="sponsor">Sponsor:</label>
            <input
              type="text"
              name="sponsor"
              id="sponsor"
              className="form-control"
              value={this.state.formData.sponsor.value}
              onChange={this.onChange}
            />
            {!this.state.formData.sponsor.valid &&
            this.state.formData.sponsor.touched ? (
              <p className="text-danger">The sponsor is required</p>
            ) : null}
          </div>
          <div
            className={
              !this.state.formData.type.valid &&
              this.state.formData.type.touched
                ? "form-group has-error"
                : "form-group"
            }
          >
            <label htmlFor="type">Type</label>
            <select
              name="type"
              className="form-control"
              value={this.state.formData.type.value}
              onChange={this.onChange}
            >
              <option key="" defaultValue>
                {" "}
              </option>
              <option key="Rewards" value="Rewards">
                Rewards
              </option>
              <option key="Perks" value="Perks">
                Perks
              </option>
            </select>
            {!this.state.formData.type.valid &&
            this.state.formData.type.touched ? (
              <p className="text-danger">The type is required</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="itemId">Reward Id:</label>
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

export default Rewards;
