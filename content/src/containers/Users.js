import React from "react";
import * as usersService from "../services/users.service.js";
import UsersForm from "./UsersForm";
import WizardGrid from "./widgets/WidgetGrid";
import JarvisWidget from "./widgets/JarvisWidget";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    usersService.readAll().then(data => {
      this.setState({ users: data.items });
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;
    usersService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.users.filter(item => {
            return item._id !== formData._id;
          });
          return { users: updatedItems };
        });
        this.onCancel();
      })
      .catch(err => console.log("error=", err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.users.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.users.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.users.concat(updatedFormData);
      }
      return {
        users: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
  }

  render() {
    const users = this.state.users ? (
      this.state.users.map(user => (
        <ol
          className="list-unstyled"
          key={user._id}
          onClick={this.onSelect.bind(this, user)}
        >
          <li>{user.email},</li>
          <li>{user._id},</li>
          <li>{user.password},</li>
          <li>{user.isEmailConfirmed.toString()},</li>
          <li>{user.role},</li>
          <hr />
        </ol>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWIdgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>

          <ol className="breadcrumb">
            <li>Home</li>
            <li>Users</li>
          </ol>
        </div>
        <div id="content">
          <div className="row">
            <div className="col xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 className="page-title txt-color-blueDark">
                <i className="fa fa-user fa-fw" />
                Users >
                <span> &nbsp;My User Page</span>
              </h1>
            </div>
          </div>
          <WizardGrid>
            <div className="row">
              <article className="col-sm-12 col-md-12 col-lg-6">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-user" />
                      {"  "}Users Form
                    </span>
                  }
                >
                  <UsersForm
                    formData={this.state.formData}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    onCancel={this.onCancel}
                  />
                </JarvisWidget>
              </article>
              <article className="col-sm-12 col-md-12 col-lg-6">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-user" />
                      {"  "}Users List
                    </span>
                  }
                >
                  {users}
                </JarvisWidget>
              </article>
            </div>
          </WizardGrid>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
