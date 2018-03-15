export function validate(value, rules) {
  let isValid = true;

  if (rules.required ) {
    isValid =
      value &&
      typeof value === "string" &&
      (typeof value !== "string" || value.trim() !== "") &&
      isValid;
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
 //not sure what this function does..
    field.valid = validate(field.value, field.validation);
    

    const formData = { ...prevState.formData, [name]: field };

//form valid is already false 
    let formValid = true;
    console.log(formValid)
    //it is console logging true though?????????
    //why isn't this changing?
    //setting state doesn't change right away?? maybe that's why?
    //but it's inside a function??
    for (let inputIdentifier in formData) {
      formValid = formValid && formData[inputIdentifier].valid;
      console.log(formValid +"  "+inputIdentifier)
    }
    return { formData: formData, formValid: formValid };
  });
}
