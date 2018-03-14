import React from "react";

class DogOwnerDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogOwners: []
    };

    this.tempList = [
      {
        _id: "5aa841b37d28c6062671b721",
        firstName: "Abby",
        lastName: "Cloft"
      },
      {
        _id: "5aa841ba7d28c6062671b722",
        firstName: "Hannah",
        lastName: "Something"
      },
      {
        _id: "5aa846517d28c6062671b724",
        firstName: "Casey",
        lastName: "Smith"
      },
      {
        _id: "5aa946f27286946ee37d69ab",
        firstName: "HEY",
        lastName: "THERE"
      }
    ];
  }

  componentDidMount(){
      this.setState({dogOwners: this.tempList})
  }
  render() {
    const dogOwners = this.state.dogOwners.map(dogOwner => {
       return <option key={dogOwner._id} value={dogOwner._id}>{dogOwner.firstName} {dogOwner.lastName}</option>
    })

    return (
      <select
      name='dogOwnerId'
      value={this.props.value}
      className='form-control'
      onChange={this.props.onSelect}>
        <option key='' defaultValue> </option>
       {dogOwners}
      </select>
    );
  }
}

export default DogOwnerDropdown;
