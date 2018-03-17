export function validate(value, rules) {

  let isValid = true;

  if (rules.required) {
    if (typeof value === "string") {
      isValid = value && value.trim() !== "" && isValid;
    } else if (typeof value === "number") {
      isValid = (value || value === 0) && isValid;
    } else {
      isValid = false;
    }
  }
  
  if (rules.minLength && typeof value==="string") {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  if (rules.maxLength && typeof value==="string") {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }
  if (rules.min || rules.min === 0) {
    isValid = value >= rules.min && isValid;
  }
  if (rules.max || rules.min === 0) {
    isValid = value <= rules.max && isValid;
  }
  if (rules.list) {
    isValid = isValid && rules.list.includes(value);
  }
  if (rules.objectId) {
    isValid = isValid && RegExp("([0-9a-fA-F]{24})").test(value);
  }
  if (rules.number) {
    isValid =
      isValid && !isNaN(value) && typeof parseInt(value, 10) === "number";
  }
  if (rules.date) {
    var dateVal = new Date(value)
    isValid =
      isValid && (dateVal instanceof Date) && (!isNaN(dateVal.valueOf()));
  }

  return isValid;
}

export function onChange(event) {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;

  this.setState(prevState => {
    const field = { ...prevState.formData[name] };
    field.value = value;
    field.touched = true;
    field.valid = validate(field.value, field.validation);
    const formData = { ...prevState.formData, [name]: field };
    let formValid = true;
    for (let inputIdentifier in formData) {
      formValid = formValid && formData[inputIdentifier].valid;
    }
    return { formData: formData, formValid: formValid };
  });
}
