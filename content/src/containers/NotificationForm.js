import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as notificationService from "../services/notification.service";
import DogOwnersDropdown from './DogOwnersDropdown'
import DogsMenu from './DogsMenu'

class NotificationsForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      notifications: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    notificationService.readAll().then(data => {
      this.setState({ notifications: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const notification =
      props.formData && props.formData._id ? props.formData : {};

    const initializedNotification = {
      _id: notification._id || "",
      type: notification.type || "",
      dogOwnerId: notification.dogOwnerId || "",
      dogId: notification.dogId || "",
      message: notification.message || ""
    };

    let formData = {
      _id: {
        originalValue: initializedNotification._id,
        value: initializedNotification._id,
        valid: true,
        validation: {},
        touched: false
      },
      type: {
        originalValue: initializedNotification.type,
        value: initializedNotification.type,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      dogOwnerId: {
        originalValue: initializedNotification.dogOwnerId,
        value: initializedNotification.dogOwnerId,
        valid: true,
        validation: {
            required: true
        },
        touched: false
      },
      dogId: {
        originalValue: initializedNotification.dogId,
        value: initializedNotification.dogId,
        valid: true,
        validation: {
            required: true
        },
        touched: false
      },
      message: {
        originalValue: initializedNotification.message,
        value: initializedNotification.message,
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
      message: this.state.formData.message.value,
      type: this.state.formData.type.value,
      dogOwnerId: this.state.formData.dogOwnerId.value,
      dogId: this.state.formData.dogId.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      notificationService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      notificationService
        .create(item)
        .then(data => {
          //mod state to show assigned id
          this.setState(prevState => {
            const field = {
              ...prevState.formData._id,
              _id: data
            };
            const formData = {
              ...prevState.formData,
              _id: field
            };
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
              !this.state.formData.type.valid &&
              this.state.formData.type.touched
                ? "form-group has-feedback has-error"
                : this.state.formData.type.valid &&
                this.state.formData.type.touched ?
                "form-group has-feedback has-success"
                : "form-group has-feedback"
            }
          >
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              name="type"
              id="type"
              className="form-control"
              value={this.state.formData.type.value}
              onChange={this.onChange}
            />
            <i className={
                !this.state.formData.type.valid &&
                this.state.formData.type.touched
                  ? "form-control-feedback glyphicon glyphicon-remove"
                  : this.state.formData.type.valid &&
                    this.state.formData.type.touched
                  ? "form-control-feedback glyphicon glyphicon-ok"
                  : "form-control-feedback"
            }
            />
            {!this.state.formData.type.valid &&
            this.state.formData.type.touched ? (
              <p className="text-danger">A type is required.</p>
            ) : null}
          </div>

          <div
            className={
              !this.state.formData.message.valid &&
              this.state.formData.message.touched
                ? "form-group has-feedback has-error"
                : this.state.formData.message.valid &&
                  this.state.formData.message.touched
                ? "form-group has-feedback has-success"
                : "form-group has-feedback"
            }
          >
            <label htmlFor="message">Message:</label>
            <input
              type="text"
              name="message"
              id="message"
              className="form-control"
              value={this.state.formData.message.value}
              onChange={this.onChange}
            />
            <i className={
                !this.state.formData.message.valid &&
                this.state.formData.message.touched
                  ? "form-control-feedback glyphicon glyphicon-remove"
                  : this.state.formData.message.valid &&
                  this.state.formData.message.touched
                  ? "form-control-feedback glyphicon glyphicon-ok"
                  : "form-control-feedback"
            }
            />
            {!this.state.formData.message.valid &&
            this.state.formData.message.touched ? (
              <p className="text-danger">A message is required.</p>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="notificationId">Notification Id:</label>
            <input
              type="text"
              name="notificationId"
              id="notificationId"
              className="form-control"
              disabled
              value={this.state.formData._id.value}
              onChange={this.onChange}
            />
          </div>

          <div className=
          {
              !this.state.formData.dogOwnerId.valid &&
              this.state.formData.dogOwnerId.touched
                ? "form-group has-feedback has-error"
                : this.state.formData.dogOwnerId.valid &&
                  this.state.formData.dogOwnerId.touched
                ? "form-group has-feedback has-success"
                : "form-group has-feedback"
            }>
            <label htmlFor="dogOwnerId">Dog Owner Id:</label>
            <DogOwnersDropdown
              value={this.state.formData.dogOwnerId.value}
              onSelect={this.onChange}
            />
            <i className={
                !this.state.formData.dogOwnerId.valid &&
                this.state.formData.dogOwnerId.touched
                  ? "form-control-feedback glyphicon glyphicon-remove"
                  : this.state.formData.dogOwnerId.valid &&
                  this.state.formData.dogOwnerId.touched
                  ? "form-control-feedback glyphicon glyphicon-ok"
                  : "form-control-feedback"
            }
            />
          </div>

          <div className={
              !this.state.formData.dogId.valid &&
              this.state.formData.dogId.touched
                ? "form-group has-feedback has-error"
                : this.state.formData.dogId.valid &&
                  this.state.formData.dogId.touched
                ? "form-group has-feedback has-success"
                : "form-group has-feedback"
            }>
            <label htmlFor="dogId">Dog Id:</label>
            <DogsMenu
              value={this.state.formData.dogId.value}
              onChange={this.onChange}
            />
            <i className={
                !this.state.formData.dogId.valid &&
                this.state.formData.dogId.touched
                  ? "form-control-feedback glyphicon glyphicon-remove"
                  : this.state.formData.dogId.valid &&
                  this.state.formData.dogId.touched
                  ? "form-control-feedback glyphicon glyphicon-ok"
                  : "form-control-feedback"
            }
            />
          </div>
          <div>
            
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

export default NotificationsForm;
