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
        <div
          className="row"
          key={challenge._id}
          onClick={this.onSelect.bind(this, challenge)}
        >
          <div className="col-md-3">{challenge.description}</div>
          <div className="col-md-3">{challenge.expirationDate}</div>
          <div className="col-md-3">{challenge.points}</div>
          <div className="col-md-3">{challenge.dogOwnerType}</div>
        </div>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-assignment" />
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Hacker</li>
            <li>Challenge</li>
          </ol>
        </div>
        <div id="content">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4" />
            <h1 className="page-title txt-color-blueDark">
              <i className="fa fa-bomb fa-fw" />
              Challenges
              <span>  >  Are you worthy!?</span>
            </h1>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <ChallengeForm
                formData={this.state.formData}
                onSave={this.onSave}
                onCancel={this.onCancel}
                onDelete={this.onDelete}
              />
            </div>
            <div id="challengeGrid" className="col-md-6">
              <div className="well">
                <div className="row">
                  <div className="col-sm-3"> Description</div>
                  <div className="col-sm-3">Expiration Date</div>
                  <div className="col-sm-3">Points</div>
                  <div className="col-sm-3">Dog Owner Type</div>
                </div>
              </div>
              <div className="jarviswidget">{challenges}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Challenges;
