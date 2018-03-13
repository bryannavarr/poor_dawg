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
        }
        this.onChange = validationHelper.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        // this.onCancel= this.onCancel.bind(this);
    }

    componentDidMount() {
        usersService.readAll().then(data => {
                this.setState({ users: data })
            })
    }

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
            name: user.name || '',
            role: user.role || '',
            password: user.password || '',
            isEmailConfirmed: user.isEmailConfirmed || ''
            
        }

        let formData = {
            _id:
                {
                    originalValue: initializedUser._id,
                    value: initializedUser._id,
                    valid: true,
                    validation: {
                    },
                    touched: false
                },
            name: {

                originalValue: initializedUser.name,
                value: initializedUser.name,
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
                },
                touched: false
            },
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
            name: this.state.formData.name.value
        };
        if (this.state.formData._id.value.length > 0) {
            item._id = this.state.formData._id.value
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
            <React.Fragment>
                <form>
                    <div className={!this.state.formData.name.valid && this.state.formData.name.touched
                        ? "form-group has-error" : "form-group"}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" className="form-control" value={this.state.formData.name.value} onChange={this.onChange} />
                        {!this.state.formData.name.valid && this.state.formData.name.touched
                            ? <p className="text-danger">The name is required</p> : null}
                        <br />
                        <label htmlFor="role">Role:</label>
                        <input type="text" name="role" id="role" className="form-control" value={this.state.formData.role.value} onChange={this.onChange} />
                        {!this.state.formData.role.valid && this.state.formData.role.touched
                            ? <p className="text-danger">The role is required</p> : null}
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="text" name="password" id="password" className="form-control" value={this.state.formData.password.value} onChange={this.onChange} />
                        {!this.state.formData.password.valid && this.state.formData.password.touched
                            ? <p className="text-danger">The password is required</p> : null}
                        <br />
                        <label htmlFor="isEmailConfirmed">Is Email Confirmed:</label>
                        <input type="text" name="isEmailConfirmed" id="isEmailConfirmed" className="form-control" value={this.state.formData.isEmailConfirmed.value} onChange={this.onChange} />
                        {!this.state.formData.isEmailConfirmed.valid && this.state.formData.isEmailConfirmed.touched
                            ? <p className="text-danger">The email is required</p> : null}
                    </div>
                    {/* <div className='form-group'>
                        <label htmlFor='itemId'>User Id:</label>
                        <input type='text' name='id' id='itemId' className='form-control' disabled value={this.state.formData._id.value} onChange={this.onChange} />
                    </div> */}
                    <div className='btn-group' role='group'>
                        <button type='button' onClick={this.onSave} className='btn btn-primary btn-sm' disabled={!this.state.formValid}>Save</button>
                        <button type='button' onClick={this.props.onCancel} className='btn btn-default btn-sm'> Cancel</button>
                        <button type='button' onClick={() => this.props.onDelete(this.state.formData)} className='btn bntn-danger btn-sm'>Delete</button>
                    </div>
                </form>
            </React.Fragment >
        )
    }

}

export default Users