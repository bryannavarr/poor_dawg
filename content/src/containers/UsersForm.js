import React from 'react'
import * as validationHelper from '../helpers/validation.helper'
import * as usersService from '../services/users.service'

class Users extends React.Component {
    constructor(props) {
        super(props)

        const formData = this.convertPropsToFormData(props);

        this.state = {
            users: [],
            formData: formData,
            formValid: false
        };

        this.onChange = validationHelper.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    // componentDidMount() {
    //     usersService.readAll().then(data => {
    //         this.setState({ users: data })
    //     })
    // }

    componentWillReceiveProps(nextProps) {
        const formData = this.convertPropsToFormData(nextProps);
        this.setState({ formData: formData })
    }

    convertPropsToFormData(props) {
        const user = props.formData && props.formData._id
            ? props.formData
            : {};

        const initializedUser = {
            _id: user._id || '',
            password: user.password || '',
            role: user.role || '',
            createDate: user.createDate || '',
            updateDate: user.updateDate || '',
            // email: user.email || '',
            isEmailConfirmed: typeof user.isEmailConfirmed === "undefined" ? '' : (user.isEmailConfirmed).toString()
        }

        let formData = {
            // email: {
            //     originalValue: initializedUser.email,
            //     value: initializedUser.email,
            //     valid: true,
            //     validation: {
            //         required: true
            //     },
            //     touched: false
            // },
            password: {
                originalValue: initializedUser.password,
                value: initializedUser.password,
                valid: true,
                validation: {
                    required: true,
                },
                touched: false
            },
            isEmailConfirmed: {
                originalValue: initializedUser.isEmailConfirmed,
                value: initializedUser.isEmailConfirmed,
                valid: true,
                validation: {
                    required: true,
                },
                touched: false
            },
            role: {
                originalValue: initializedUser.role,
                value: initializedUser.role,
                valid: true,
                validation: {
                    required: true,
                    // minLength: 5,
                    // maxLength: 8,
                    // list: ['Admin',
                    //     'DogOwner',
                    //     'DogLover',
                    //     'Sponsor']
                },
                touched: false
            },
            _id: {
                originalValue: initializedUser._id,
                value: initializedUser._id,
                valid: true,
                validation: {

                },
                touched: false
            },
            createDate: {
                originalValue: initializedUser.createDate,
                value: initializedUser.createDate,
                valid: true,
                validation: {

                },
                touched: false
            },
            updateDate: {
                originalValue: initializedUser.updateDate,
                value: initializedUser.updateDate,
                valid: true,
                validation: {

                },
                touched: false
            }
        }

        for (let fieldName in formData) {
            const field = formData[fieldName]
            field.valid = validationHelper.validate(field.value, field.validation)
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
            // email: this.state.formData.email.value,
            isEmailConfirmed: this.state.formData.isEmailConfirmed.value,
            role: this.state.formData.role.value,
            password: this.state.formData.password.value
        };

        if (this.state.formData._id.value.length > 0) {
            item._id = this.state.formData._id.value;
            item.createDate = this.state.formData.createDate.value;
            item.updateDate = this.state.formData.updateDate.value;
            usersService.update(item)
                .then(data => {
                    that.props.onSave(item);
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            usersService.create(item)
                .then(data => {
                    this.setState(prevState => {
                        const field = { ...prevState.formData._id, _id: data };
                        const formData = { ...prevState.formData, _id: field };
                        return { ...prevState, formData: formData };
                    });
                    that.props.onSave({ ...item, _id: data.item });
                })
                .catch(
                    error => console.log(error)
                );
        }
    }

    render() {
        return (
            < React.Fragment >
                <form className="userForm">
                    <fieldset>
                        <div className="form-group">
                            <div className="row">
                                {/* <div className={!this.state.formData.email.valid && this.state.formData.email.touched
                                    ? "form-group has-error" : "form-group col-md-8"}>
                                    <label htmlFor="email">Email </label>
                                    <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.formData.email.value}
                                        onChange={this.onChange} />
                                </div> */}
                                <div className={!this.state.formData.isEmailConfirmed.valid && this.state.formData.isEmailConfirmed.touched
                                    ? "form-group has-error" : "col-md-4 selectContainer"}>
                                    <label htmlFor="isEmailConfirmed">Is This Email Confirmed?</label>
                                    <select className="form-control" name="isEmailConfirmed" value={this.state.formData.isEmailConfirmed.value}
                                        onChange={this.onChange} >
                                        <option value="" ></option>
                                        <option value="true" >True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <div className="row">
                                <div className={!this.state.formData.password.valid && this.state.formData.password.touched
                                    ? "form-group has-error" : "form-group col-sm-12 col-md-4"}>
                                    <label htmlFor="password">Password:</label>
                                    <input type="text" className="form-control" name="password" placeholder="Password (6 chars)" value={this.state.formData.password.value}
                                        onChange={this.onChange} />
                                </div>
                                <div className="col-sm-12 col-md-8">
                                    <label htmlFor="_id">_id:</label>
                                    <input type="text" className="form-control" name="_id" placeholder="_id" disabled value={this.state.formData._id.value}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <div className="row">
                                <div className={!this.state.formData.role.valid && this.state.formData.isEmailConfirmed.touched
                                    ? "form-group has-error" : "col-md-4 selectContainer"}>
                                    <label htmlFor="role">Your Role:</label>
                                    <select className="form-control" name="role" value={this.state.formData.role.value}
                                        onChange={this.onChange} >
                                        <option value="" ></option>
                                        <option value="Admin" >Admin</option>
                                        <option value="DogOwner">Dog Owner</option>
                                        <option value="DogLover">Dog Lover</option>
                                        <option value="Sponsor">Sponsor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <label htmlFor="role">Your Role:</label>
                                </div>
                                <div className={!this.state.formData.role.valid && this.state.formData.isEmailConfirmed.touched
                                    ? "form-group has-error" : "col-md-4 selectContainer"}>
                                    <select className="form-control" name="role" value={this.state.formData.role.value}
                                        onChange={this.onChange} >
                                        <option value="" ></option>
                                        <option value="Admin" >Admin</option>
                                        <option value="DogOwner">Dog Owner</option>
                                        <option value="DogLover">Dog Lover</option>
                                        <option value="Sponsor">Sponsor</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <label htmlFor="role">Your Role</label>
                                </div>
                                <div className={!this.state.formData.role.valid && this.state.formData.role.touched
                                    ? "form-group has-error" : "form-group col-sm-12 col-md-10 well"}>
                                    <label htmlFor="radio radio-inline no-margin">
                                        <input type="radio" id="rating" name="radioBtn" value="admin" className="radiobox style-2" />
                                        <span>Admin</span> </label>
                                    <label htmlFor="radio radio-inline no-margin">
                                        <input type="radio" id="dogOwner" name="radioBtn" value="dogowner" className="radiobox style-2" />
                                        <span>Dog Owner</span> </label>
                                    <label htmlFor="radio radio-inline no-margin">
                                        <input type="radio" id="dogLover" name="radioBtn" value="doglover" className="radiobox style-2" />
                                        <span>Dog Lover</span> </label>
                                    <label htmlFor="radio radio-inline no-margin">
                                        <input type="radio" id="sponsor" name="radioBtn" value="sponsor" className="radiobox style-2" />
                                        <span>Sponsor</span> </label>
                                </div>
                            </div>
                        </div> */}
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <label htmlFor="createDate">Create Date:</label>
                                    <input type="text" className="form-control" name="createDate" placeholder="Create Date" disabled value={this.state.formData.createDate.value}
                                        onChange={this.onChange} />
                                </div>
                                <div>
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor="updateDate">Update Date:</label>
                                        <input type="text" className="form-control" name="updateDate" placeholder="Update Date" disabled value={this.state.formData.updateDate.value}
                                            onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="btn-group" role="group" >
                        <button type="button" className="btn btn-primary" onClick={this.onSave} disabled={!this.state.formValid}>Save</button>
                        <button type="button" className="btn btn-warning" onClick={this.props.onCancel} disabled={!this.state.formData.password.touched && !this.state.formData.isEmailConfirmed.touched && !this.state.formData.role.touched}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={() => this.props.onDelete(this.state.formData)} disabled={!this.state.formValid}>Delete</button>
                    </div>
                </form>
            </React.Fragment >
        )
    }

}

export default Users