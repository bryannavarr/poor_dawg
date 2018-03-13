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

        this.onCHange = validationHelper.onChange.bind(this);
        this.onSave - this.onSave.bind(this)

    }

    componentDidMount() {
        usersService.readAll()
            .then(data => {
                this.setState({ users: data })
            })
    }

    componentWillRecieveProps(nextProps) {
        const formData = this.convertPropsToFormData(nextProps);
        this.setState({ formData: formData })
    }

    convertPropsToFormData(props) {
        const user = props.formData && props.formData._id
            ? props.formData
            : {};

        const initializedUser = {
            _id: user._id || '',
            name: user.name || ''
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
                value: initializedUser, name,
                valid: true,
                validation: {
                    required: true,
                    maxLength: 50
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
        if (this.state.formData._id.value.length>0 {
            
        })


    }






}