import React from 'react'
import * as dogOwnerService from '../services/dogOwner.service'
import DogOwnerForm from './DogOwnersForm'

class DogOwners extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dogOwners: []
        }

        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelect = this.onSelect.bind(this);
     }
 
    onSelect(item, event){
        event.preventDefault();
        this.setState({
            formData:item
        })
    }

    onSave(updatedFormData) {
        this.setState(prevState=>{
            const existingItem=prevState.dogOwners.filter(item=>{
                return item._id === updatedFormData._id;
            })
            let updatedItems=[]
            if (existingItem&&existingItem.length>0){
                updatedItems = prevState.dogOwners.map(item=>{
                    return (
                        item._id===updatedFormData._id
                        ? updatedFormData
                        :item
                    )
                })
            }
            else{
                updatedItems = prevState.dogOwners.concat(updatedFormData)
            }
            return {
                dogOwners: updatedItems,
                formData: null,
                errorMessage: null
            }
        })
    }

    onCancel(){
        this.setState({formData:null})
    }

    onDelete(){
        const formData = this.state.formData;

        dogOwnerService.del(formData._id)
        .then(()=>{
            this.setState(prevState=>{
                const updatedItems = prevState.dogOwners.filter(item=>{
                    return item._id !== formData._id;
                })
                return {dogOwners: updatedItems}
            })
            this.onCancel();
        })
        .catch(err=> console.log(err))
    }

    componentDidMount() {

        dogOwnerService.readAll().then(data => {
            this.setState({ dogOwners: data })
        })
    }

    render() {

        const dogOwners = this.state.dogOwners ? this.state.dogOwners.map(dogOwner => (
            <li key={dogOwner._id}>{dogOwner.firstName}</li>
        ))
            : <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
                <ul>
                    {dogOwners}
                </ul>

                <div>
                    <DogOwnerForm
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

export default DogOwners