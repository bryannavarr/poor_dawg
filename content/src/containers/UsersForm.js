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
            password: user.password || '',
            role: user.role || '',
            createDate: user.createDate || '',
            updateDate: user.updateDate || '',
            isEmailConfirmed: typeof user.isEmailConfirmed === "undefined" ? '' : (user.isEmailConfirmed).toString()
        }

        let formData = {
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
                    minLength: 5,
                    maxLength: 8,
                    list: ['Admin',
                        'DogOwner',
                        'DogLover',
                        'Sponsor']
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

    for(let fieldName in formData) {
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
        role: this.state.formData.role.value,
        password: this.state.formData.password.value,
        isEmailConfirmed: this.state.formData.isEmailConfirmed.value
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
            <div className="form-group row">
                <form className="container">
                    <div className={!this.state.formData.password.valid && this.state.formData.password.touched
                        ? "form-group has-error" : "form-group"}>
                        <label htmlFor="password">Password:</label>
                        <input type="text" name="password" id="password" className="form-control" placeholder="Password (6 digits only)" value={this.state.formData.password.value} onChange={this.onChange} />
                        {!this.state.formData.password.valid && this.state.formData.password.touched
                            ? <p className="text-danger">The password is required</p> : null}
                    </div>
                    <div className={!this.state.formData.isEmailConfirmed.valid && this.state.formData.isEmailConfirmed.touched
                        ? "form-group has-error" : "form-group"}>
                        <label htmlFor="isEmailConfirmed">Is Email Confirmed?:</label>
                        <input type="text" name="isEmailConfirmed" id="isEmailConfirmed" className="form-control" placeholder="Is Email Confirmed (bool)" value={this.state.formData.isEmailConfirmed.value} onChange={this.onChange} />
                        {!this.state.formData.isEmailConfirmed.valid && this.state.formData.isEmailConfirmed.touched
                            ? <p className="text-danger">The Email is required</p> : null}
                    </div>
                    <div className={!this.state.formData.role.valid && this.state.formData.role.touched
                        ? "form-group has-error" : "form-group"}>
                        <label htmlFor="role">Role:</label>
                        <input type="text" name="role" id="role" className="form-control" placeholder="Admin, DogOwner, DogLover, or Sponsor" value={this.state.formData.role.value} onChange={this.onChange} />
                        {!this.state.formData.role.valid && this.state.formData.role.touched
                            ? <p className="text-danger">The Role is required</p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="_id">_id:</label>
                        <input type="text" name="_id" id="_id" className="form-control" disabled placeholder="_id" value=
                            {this.state.formData._id.value} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="createDate">Create Date:</label>
                        <input type="text" name="createDate" id="createDate" className="form-control" disabled placeholder="Create Date" value={this.state.formData.createDate.value} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="updateDate">Update Date:</label>
                        <input type="text" name="updateDate" id="updateDate" className="form-control" disabled placeholder="Update Date" value={this.state.formData.updateDate.value} onChange={this.onChange} />
                    </div>
                    <div className="btn-group" role="group">
                        <button type='button' onClick={this.onSave} className='btn btn-primary btn-sm' disabled={!this.state.formValid}>Save</button>
                        <button type='button' onClick={this.props.onCancel} className='btn btn-warning btn-sm' disabled={!this.state.formData.password.touched || !this.state.formData.isEmailConfirmed.touched || !this.state.formData.role.touched}>Cancel</button>
                        <button type='button' onClick={() => this.props.onDelete(this.state.formData)} className='btn btn-danger btn-sm' >Delete</button>
                    </div>
                </form>
            </div>
        </React.Fragment >
    )
}

}

export default Users

// disabled={!this.state.formValid} 
// disabled= {this.state.formValid && !this.state.formData.password.touched && !this.state.formData.isEmailConfirmed.touched && !this.state.formData.role.touched}