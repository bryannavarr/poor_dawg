import React, { Component } from "react";
import SponsorsForm from "./SponsorsForm";
import * as SponsorsService from "../services/sponsors.service";

class Sponsors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sponsors: null
        }
    }

    componentDidMount() {
        this.runGetAll()
    }

    runGetAll(){
        SponsorsService.getAll()
        .then(
            data => {
                // console.log(data.length)
                let sponsorList = []
                for (let i = 0; i < data.length; i++) {
                    // console.log(data[i]);
                    sponsorList.push(
                        <li key={data[i]._id}>
                            <h3>{data[i].firstName} {data[i].lastName} of {data[i].companyName}</h3>
                            <p>Email:{data[i].email}</p>
                            <p>Zip Code:{data[i].zipCode}</p>
                            <p>Phone #:{data[i].phone}</p>
                        </li>
                    )
                }
                this.setState(
                    {
                        sponsors: sponsorList
                    }
                )
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    }

    handleFormSubmit() {

    }

    render() {
        return (
            <React.Fragment>
                <h1>Welcome Sponsor!</h1>
                <ul>{this.state.sponsors}</ul>
                <SponsorsForm handleFormSubmit={this.handleFormSubmit} />
            </React.Fragment>
        )
    }
}

export default Sponsors;