import React from 'react'
import * as userService from '../services/users.service.js'
import UserForm from './UserForm'

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        userService.readAll()
            .then(data => {
                this.setState({ users: data.items })
            })
    }

    onCancel() {
        this.setState({ formData: null })
    }

    onDelete() {
        const formData = this.state.formData;
        userService.delete(formData._id)
            .then(() => {
                this.setState(prevState => {
                    const updatedItems = prevState.users.filter(item => {
                        return item._id !== formData._id;
                    });
                    return { Users: updatedItems }
                });
                this.onCancel();
            })
            .catch(err => console.log("error=", err))
    }

    onSave(updatedFormData) {
        this.setState(prevState => {
            const existingItem = prevState.users.filter(item => {
                return item._id === updatedFormData._id;

            })
            let updatedItems = [];
            if (existingItem && existingItem.length > 0) {
                updatedItems = prevState.users.map(item => {
                    return (
                        item._id === updatedFormData._id
                            ? updatedFormData
                            : item
                    );
                });
            }
            else {
                updatedItems = prevState.users.concat(updatedFormData);
            }
            return {
                users: updatedItems,
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
        const users = this.state.users ? this.state.users.map
            (user => (
                <li key={user._id} onCLick={this.onSelect.bind(this, user)}>{user.name}</li>
            ))
            : <React.Fragment></React.Fragment>

        return (
            <React.Fragment>
                <ul>
                    {users}
                </ul>

                <div>
                    <UserForm
                        formData={this.state.formData}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Users