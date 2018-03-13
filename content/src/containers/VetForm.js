import React from 'react'
import * as vetService from '../services/vet.service'

class VetForm extends React.Component {
    constructor(props) {
        super(props)
        const formData = this.convertPropsToFormData(props)

        this.state = {
            formData: formData,
            formValid: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const formData = this.convertPropsToFormData(nextProps)
        this.setState({formData: formData})
    }

    convertPropsToFormData(props) {
        const vet = props.formData && props.formData._id
            ? props.formData
            : {}

        const initializedVet = {
            _id: vet._id || '',
            firstName: vet.firstName || '',
            lastName: vet.lastName || '',
            email: vet.email || '',
            smsNumber: vet.smsNumber || '',
            address: vet.address ? {...vet.address} : {}
        }

        let formData = {
            _id: {
                displayName: 'Veterinarian ID',
                originalValue: initializedVet._id,
                value: initializedVet._id,
                valid: true,
                validation: {
                },
                brokenRules: [],
                touched: false
            },
            firstName: {
                displayName: 'First Name',
                originalValue: initializedVet.firstName,
                value: initializedVet.firstName,
                valid: true,
                validation: {
                    required: {value: true, message: 'First name is required'},
                    maxLength: {value: 50, message: 'First name must be no more than 50 characters'}
                },
                brokenRules: [],
                touched: false
            },
            lastName: {
                displayName: 'Last Name',
                originalValue: initializedVet.lastName,
                value: initializedVet.lastName,
                valid: true,
                validation: {
                    required: {value: true, message: 'Last name is required'},
                    maxLength: {value: 50, message: 'Last name must be no more than 50 characters'}
                },
                brokenRules: [],
                touched: false
            },
            email: {
                displayName: 'Email',
                originalValue: initializedVet.email,
                value: initializedVet.email,
                valid: true,
                validation: {
                    required: {value: true, message: 'Email is required'}
                },
                brokenRules: [],
                touched: false
            },
            smsNumber: {
                displayName: 'Phone Number',
                originalValue: initializedVet.smsNumber,
                value: initializedVet.smsNumber,
                valid: true,
                validation: {
                    required: {value: true, message: 'Phone number is required'}
                },
                brokenRules: [],
                touched: false
            },
            street: {
                displayName: 'Street',
                originalValue: initializedVet.address.street,
                value: initializedVet.address.street,
                valid: true,
                validation: {},
                brokenRules: [],
                touched: false
            },
            suite: {
                displayName: 'Street Line 2',
                originalValue: initializedVet.address.suite,
                value: initializedVet.address.suite,
                valid: true,
                validation: {},
                brokenRules: [],
                touched: false
            },
            city: {
                displayName: 'City',
                originalValue: initializedVet.address.city,
                value: initializedVet.address.city,
                valid: true,
                validation: {},
                brokenRules: [],
                touched: false
            },
            state: {
                displayName: 'State',
                originalValue: initializedVet.address.state,
                value: initializedVet.address.state,
                valid: true,
                validation: {},
                brokenRules: [],
                touched: false
            },
            zip: {
                displayName: 'Zip',
                originalValue: initializedVet.address.zip,
                value: initializedVet.address.zip,
                valid: true,
                validation: {},
                brokenRules: [],
                touched: false
            }
        }

        for (let fieldName in formData) {
            const field = formData[fieldName]
            this.validate(field)
        }

        return formData
    }

    onChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState(prevState => {
            const field = {...prevState.formData[name]}
            field.value = value
            field.touched = true
            this.validate(field)

            const formData = {...prevState.formData, [name]: field}

            let formValid = true
            for (let inputIdentifier in formData) {
                formValid = formValid && formData[inputIdentifier].valid
            }
            return {formData: formData, formValid: formValid}
        })
    }

    validate(fieldSpec) {
        let brokenRules = []
        let value = fieldSpec.value
        let rules = fieldSpec.validation || {}
        let msg = null

        if (rules.required && rules.required.value) {
            if (typeof (value) === 'string') {
                if (value.trim() === '') {
                    msg = rules.required.message ||
                        `${fieldSpec.displayName || 'Field'} is required`
                    brokenRules.push({rule: 'required', msg: msg})
                }
            } else if (!value || value === 0) {
                msg = rules.required.message ||
                    `${fieldSpec.displayName || 'Field'} is required`
                brokenRules.push({rule: 'required', msg: msg})
            }
        }
        if (rules.minLength && value.trim().length <= rules.minLength.value) {
            msg = rules.minLength.message ||
                `${fieldSpec.displayName || 'Field'} must be at least ${rules.minLength.value} characters`
            brokenRules.push({rule: 'minLength', msg: msg})
        }
        if (rules.maxLength && value.trim().length >= rules.maxLength.value) {
            msg = rules.maxLength.message ||
                `${fieldSpec.displayName || 'Field'} must be no more than ${rules.maxLength.value} characters`
            brokenRules.push({rule: 'maxLength', msg: msg})
        }
        if ((rules.min || rules.min === 0) && value <= rules.min.value) {
            msg = rules.min.message ||
                `${fieldSpec.displayName || 'Field'} must be at least ${rules.min.value}`
            brokenRules.push({rule: 'min', msg: msg})
        }
        if ((rules.max || rules.max === 0) && value >= rules.max.value) {
            msg = rules.max.message ||
                `${fieldSpec.displayName || 'Field'} must be no more than ${rules.max.value}`
            brokenRules.push({rule: 'max', msg: msg})
        }
        if (rules.list && !rules.list.includes(value)) {
            msg = rules.max.message ||
                `${fieldSpec.displayName || 'Field'} has an illegal value`
            brokenRules.push({rule: 'list', msg: msg})
        }

        // brokenRules will be an empty array if no validation errors.
        // if there are errors, there will be a property for each broken rule,
        fieldSpec.brokenRules = brokenRules
        fieldSpec.valid = brokenRules.length === 0
    }

    onSave(event) {
        if (!this.state.formValid) {
            // Mark all fields as touched to display validation errors for all fields
            const formData = JSON.parse(JSON.stringify(this.state.formData))
            for (let fieldIdentifier in formData) {
                formData[fieldIdentifier].touched = false
            }
            this.setState({ formData: formData })
            return
        }
        const that = this
        let item = {
            firstName: this.state.formData.firstName.value,
            lastName: this.state.formData.lastName.value,
            email: this.state.formData.email.value,
            smsNumber: this.state.formData.smsNumber.value,
            address: {
                street: this.state.formData.street.value,
                suite: this.state.formData.suite.value,
                city: this.state.formData.city.value,
                state: this.state.formData.state.value,
                zip: this.state.formData.suite.zip
            }
        }

        if (this.state.formData._id.value.length > 0) {
            item._id = this.state.formData._id.value
            vetService.update(item)
                .then(data => {
                    that.props.onSave(item);
                })
                .catch(
                    error => console.log(error)
                )
        } else {
            vetService.create(item)
                .then(data => {
                    // Modify state to reflect assigned id value
                    this.setState(prevState => {
                        const field = { ...prevState.formData._id, _id: data }
                        const formData = { ...prevState.formData, _id: field }
                        return { ...prevState, formData: formData }
                    })

                    that.props.onSave({ ...item, _id: data.item })
                })
                .catch(
                    error => console.log(error)
                )
        }
    }

    renderErrorMsgs(field) {
        return (
            !field.valid && field.touched
                ? field.brokenRules.map(br => {
                    return <p key={br.rule} className='text-danger'>{br.msg}</p>
                })
                : null
        )
    }

    render() {
        return (
            <React.Fragment>
                <form >
                    <div className={!this.state.formData.firstName.valid && this.state.formData.firstName.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' name='firstName' id='firstName'
                            className='form-control'
                            value={this.state.formData.firstName.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.firstName)}
                    </div>
                    <div className={!this.state.formData.lastName.valid && this.state.formData.lastName.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' name='lastName' id='lastName'
                            className='form-control'
                            value={this.state.formData.lastName.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.lastName)}
                    </div>
                    <div className={!this.state.formData.email.valid && this.state.formData.email.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email'
                            className='form-control'
                            value={this.state.formData.email.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.email)}
                    </div>
                    <div className={!this.state.formData.smsNumber.valid && this.state.formData.smsNumber.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='smsNumber'>Phone (SMS)</label>
                        <input type='text' name='smsNumber' id='smsNumber'
                            className='form-control'
                            value={this.state.formData.smsNumber.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.smsNumber)}
                    </div>
                    <div className={!this.state.formData.street.valid && this.state.formData.street.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='street'>Street</label>
                        <input type='text' name='street' id='street'
                            className='form-control'
                            value={this.state.formData.street.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.street)}
                    </div>
                    <div className={!this.state.formData.suite.valid && this.state.formData.suite.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='suite'>Street Line 2</label>
                        <input type='text' name='suite' id='suite'
                            className='form-control'
                            value={this.state.formData.suite.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.suite)}
                    </div>
                    <div className={!this.state.formData.city.valid && this.state.formData.city.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='city'>City</label>
                        <input type='text' name='city' id='city'
                            className='form-control'
                            value={this.state.formData.city.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.city)}
                    </div>
                    <div className={!this.state.formData.state.valid && this.state.formData.state.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='state'>State</label>
                        <input type='text' name='state' id='state'
                            className='form-control'
                            value={this.state.formData.state.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.state)}
                    </div>
                    <div className={!this.state.formData.zip.valid && this.state.formData.zip.touched
                        ? 'form-group has-error' : 'form-group'} >
                        <label htmlFor='zip'>Zip</label>
                        <input type='text' name='zip' id='zip'
                            className='form-control'
                            value={this.state.formData.zip.value}
                            onChange={this.onChange} />
                        {this.renderErrorMsgs(this.state.formData.zip)}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='itemId'>Veterinarian Id:</label>
                        <input type='text' name='id' id='itemId'
                            className='form-control'
                            disabled
                            value={this.state.formData._id.value}
                            onChange={this.onChange} />
                    </div>

                    <div className='btn-group' role='group'>
                        <button type='button'
                            onClick={this.onSave}
                            className='btn btn-primary btn-sm'
                            disabled={!this.state.formValid} >
                            Save
                        </button>
                        <button type='button'
                            onClick={this.props.onCancel}
                            className='btn btn-default btn-sm' >
                            Cancel
                        </button>
                        <button type='button'
                            onClick={() => this.props.onDelete(this.state.formData)}
                            className='btn btn-danger btn-sm' >
                            Delete
                        </button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default VetForm
