import React from 'react'
import * as hackerService from '../services/hacker.service'
import HackerForm from './HackerForm'

class Hackers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hackers: []
        }

        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        hackerService.readAll().then(data => {
            this.setState({ hackers: data.items })
        })
    }

    onCancel() {
        this.setState({ formData: null })
    }

    onDelete() {
        const formData = this.state.formData;
  
        hackerService.del(formData._id)
           .then(() => {
              this.setState(prevState => {
                 const updatedItems = prevState.hackers.filter(item => {
                    return item._id !== formData._id;
                 });
  
                 return { hackers: updatedItems };
              });
  
              this.onCancel();
           })
           .catch(err => console.log(err))
     }

    onSave(updatedFormData) {
        this.setState(prevState => {
            debugger;
            const existingItem = prevState.hackers.filter(item => {
                return item._id === updatedFormData._id;
            })
            let updatedItems = [];
            if (existingItem && existingItem.length > 0) {
                updatedItems = prevState.hackers.map(item => {
                    return (
                        item._id === updatedFormData._id
                            ? updatedFormData
                            : item
                    );
                });

            }
            else {
                updatedItems = prevState.hackers.concat(updatedFormData);
            }
            return {
                hackers: updatedItems,
                formData: null,
                errorMessage: null
            };


        }
        );
    }

    onSelect(item, event) {
        event.preventDefault();
        this.setState({
            formData: item
        });
    }

    render() {
        const hackers = this.state.hackers ? this.state.hackers.map(hacker => (
            <li key={hacker._id} onClick={this.onSelect.bind(this, hacker)}>{hacker.name}</li>
        ))
            : <React.Fragment></React.Fragment>

        return (
            <React.Fragment>
                <ul>
                    {hackers}
                </ul>

                <div>
                    <HackerForm
                        formData={this.state.formData}
                        onSave={this.onSave}
                        onDelete={this.onDelete}
                        onCancel={this.onCancel}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Hackers