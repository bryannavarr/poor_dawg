import React from 'react'
import * as notificationService from '../services/notification.service'
import NotificationForm from './NotificationForm'

class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: []
        }

        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        notificationService.readAll().then(data => {
            this.setState({ notifications: data.items })
        })
    }

    onCancel() {
        this.setState({ formData: null })
    }

    onDelete() {
        const formData = this.state.formData;

        notificationService.del(formData._id)
            .then(() => {
                this.setState(prevState => {
                    const updatedItems = prevState.notifications.filter(item => {
                        return item._id !== formData._id;
                    });
                    return { notifications: updatedItems };
                });

                this.onCancel();
            })
            .catch(err => console.log(err))
    }

    onSave(updatedFormData) {
        debugger;
        this.setState(prevState => {
            const existingItem = prevState.notifications.filter(item => {
                return item._id === updatedFormData._id;
            })
            debugger;
            let updatedItems = [];
            debugger;
            if (existingItem && existingItem.length > 0) {
                updatedItems = prevState.notifications.map(item => {
                    debugger;
                    return (
                        item._id === updatedFormData._id
                            ? updatedFormData
                            : item
                    );
                });
            }
            else {
                updatedItems = prevState.notifications.concat(updatedFormData);
            }
            debugger;
            return {
                notifications: updatedItems,
                formData: null,
                errorMessage: null
            };
        });
    }

    onSelect(item, event) {
        event.preventDefault();
        this.setState({
            formData: item
        });
    }

    render() {
        const notifications = this.state.notifications ? this.state.notifications.map(notification => (
            <li key={notification._id} onClick={this.onSelect.bind(this, notification)}>{notification.message}</li>
        ))

            : <React.Fragment></React.Fragment>

        return (
            <React.Fragment>
                <ul>
                    {notifications}
                </ul>

                <div>
                    <NotificationForm
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

export default Notifications