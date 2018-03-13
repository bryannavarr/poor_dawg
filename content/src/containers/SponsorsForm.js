import React, { Component } from "react";
import * as SponsorsService from "../services/sponsors.service";

class SponsorsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: "",
            firstName: "",
            lastName: "",
            email: "",
            zipCode: "",
            phone: ""
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange = event => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleFormSubmit = event => {
        SponsorsService.postNew(this.state)
            .then(
                data => {
                    console.log(data)
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name="companyName" className="form-control" value={this.state.companyName} placeholder="Company Name" onChange={this.handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" name="firstName" className="form-control" value={this.state.firstName} placeholder="First Name" onChange={this.handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={this.state.lastName} placeholder="Last Name" onChange={this.handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} placeholder="Email" onChange={this.handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip-code">Zip Code</label>
                        <input type="text" name="zipCode" className="form-control" value={this.state.zipCode} placeholder="Zip Code" onChange={this.handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" name="phone" className="form-control" value={this.state.phone} placeholder="Phone Number" onChange={this.handleFormChange} />
                    </div>
                </form>
                <input type="button" value="Register" onClick={this.handleFormSubmit} />
            </React.Fragment >
        )
    }
}

export default SponsorsForm