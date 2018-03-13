import React from 'react'
import InteractionForm from './InteractionForm'
import * as interactionService from '../services/interaction.service'

class Interactions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            interactions: []
        }
        this.onSelect = this.onSelect.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    componentDidMount() {
        interactionService.readAll()
            .then(data => {
                //console.log(data)
                this.setState({ interactions: data.data.items })
            })
            .catch(err => console.log(err))
    }

    onSelect(item, event) {
        event.preventDefault()
        this.setState({
            formData: item
        })
    }

    onCancel() {
        this.setState({ formData: null })
    }

    onDelete() {
        const formData = this.state.formData
        interactionService.deleteById(formData._id)
            .then(() => {
                this.setState(prevState => {
                    const updatedItems = prevState.interactions.filter(item => item._ed !== formData._id)
                    return { interactions: updatedItems }
                })
                this.onCancel()
            })
            .catch(err => console.log(err))
    }

    onSave(updatedFormData) {
        this.setState(prevState => {
            const existingItem = prevState.interactions.filter(item => {
                return item._id === updatedFormData._id;
            })
            let updatedItems = [];
            if (existingItem && existingItem.length > 0) {
                updatedItems = prevState.interactions.map(item => {
                    return item._id === updatedFormData._id ? updatedFormData : item
                })
            }
            else {
                updatedItems = prevState.interactions.concat(updatedFormData);
            }
            return {
                interactions: updatedItems,
                formData: null,
                errorMessage: null
            }
        })
    }


    render() {
        const interactions = this.state.interactions ? this.state.interactions.map(interaction => (
            <li key={interaction._id} onClick={this.onSelect.bind(this, interaction)}>{`Points: ${interaction.points}`}</li>
        )) : <h2> NONE</h2>

        return (<div>
            <h1> Interactions</h1>
            {interactions}

            <div>
                <InteractionForm
                    formData={this.state.formData}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    onCancel={this.onCancel}
                />

            </div>
        </div>)
    }
}

export default Interactions