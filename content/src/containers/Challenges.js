import React from "react";
import * as challengeService from "../services/challenge.service";
import ChallengeForm from "./ChallengeForm";

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    challengeService.readAll().then(data => {
      this.setState({ challenges: data.items });
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    challengeService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.challenges.filter(item => {
            return item._id !== formData._id;
          });
          return { challenges: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.challenges.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.challenges.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.challenges.concat(updatedFormData);
      }
      return {
        challenges: updatedItems,
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
    const challenges = this.state.challenges ? (
      this.state.challenges.map(challenge => (
        <li key={challenge._id} onClick={this.onSelect.bind(this, challenge)}>
          <p>{challenge._id}</p>
          <p>{challenge.description}</p>
          <p>{challenge.expirationDate}</p>
          <p>{challenge.points}</p>
          <p>{challenge.dogOwnerType}</p>
          <p>{challenge.createDate}</p>
          <p>{challenge.updateDate}</p>
        </li>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <div className="container">
          <ul className="col-md-6">{challenges}</ul>
          <div className="col-md-offset-6">
            <ChallengeForm
              formData={this.state.formData}
              onSave={this.onSave}
              onCancel={this.onCancel}
              onDelete={this.onDelete}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Challenges;
