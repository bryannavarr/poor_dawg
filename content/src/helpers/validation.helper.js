export function validate(value, rules) {
    let isValid = true

    if (rules.required) {
        isValid = isValid && value && (typeof (value) === 'string') &&
            ((typeof (value) !== 'string') || (value.trim() !== ''))
    }
    if (rules.minLength) {
        isValid = isValid && value.trim().length >= rules.minLength
    }
    if (rules.maxLength) {
        isValid = isValid && value.trim().length <= rules.maxLength
    }
    if (rules.min || rules.min === 0) {
        isValid = isValid && value >= rules.min
    }
    if (rules.max || rules.min === 0) {
        isValid = isValid && value <= rules.max
    }
    if (rules.list) {
        isValid = isValid &&
            rules.list.includes(value)
    }

    return isValid
}

export function onChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    
    this.setState(prevState => {
        const field = {...prevState.formData[name]}
        field.value = value
        field.touched = true
        field.valid = validate(field.value, field.validation)

        const formData = {...prevState.formData, [name]: field}

        let formValid = true
        for (let inputIdentifier in formData) {
            formValid = formValid && formData[inputIdentifier].valid
        }
        return {formData: formData, formValid: formValid}
    })
}
