import React from "react";

class OwnerTypeDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogOwnerType: {}
    };

    this.updateOwnerType = this.updateOwnerType.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    // const ownerType = nextprops;
    this.setState({ dogOwnerType: nextprops });
  }

  updateOwnerType(event) {
    this.setState({
      dogOwnerType: {
        ownerType: event.target.value
      }
    });
    return event.target.value
  }

  render() {
    return (
      <div
        className={
          !this.state.dogOwnerType.touched
            ? "col-md-4 selecetContainer has-feedback"
            : !this.state.dogOwnerType.valid
              ? "col-md-4 selecetContainer has-feedback has-error"
              : "col-md-4 selecetContainer has-feedback has-success"
        }
      >
        <label className="control-label" htmlFor="dogOwnerType">
          Dog Owner Type:
        </label>
        <select
          type="text"
          name="dogOwnerType"
          id="dogOwnerType"
          className="form-control"
          data-bv-field="dogOwnerType"
          value={this.state.dogOwnerType.ownerType}
          onChange={this.updateOwnerType}
        >
          <option value="">Choose Owner Type</option>
          <option value="DogLover">DogLover</option>
          <option value="DogOwner">DogOwner</option>
        </select>
        <i
          className={
            !this.state.dogOwnerType.valid && this.state.dogOwnerType.touched
              ? "form-control-feedback glyphicon glyphicon-remove"
              : "form-control-feedback glyphicon glyphicon-ok"
          }
          data-bv-icon-for="dogOwnerType"
          style={{
            display: this.state.dogOwnerType.touched ? "block" : "none"
          }}
        />
      </div>
    );
  }
}

export default OwnerTypeDropdown;
