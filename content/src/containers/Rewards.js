import React from "react";
import * as rewardService from "../services/reward.service";
import RewardForm from "./RewardForm";

class Rewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rewards: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    rewardService
      .readAll()
      .then(data => {
        this.setState({ rewards: data.items });
      })
      .catch(err => console.log(err));
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    rewardService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.rewards.filter(item => {
            return item._id !== formData._id;
          });

          return { rewards: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.rewards.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.rewards.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.rewards.concat(updatedFormData);
      }
      return {
        rewards: updatedItems,
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
    const rewards = this.state.rewards ? (
      this.state.rewards.map(reward => (
        <div
          key={reward._id}
          className="well"
          onClick={this.onSelect.bind(this, reward)}
        > 
          <li><h4><b> {`${reward.title}`} </b></h4></li>
          <li>{`Type: ${reward.type}`}</li>
          <li>{`Restrictions: ${reward.restrictions}`}</li>
          <li>{`Description:`}</li> 
        <li>{`${reward.description}`}</li>
          <li>{`Points Required: ${reward.pointsRequired}`}</li>
          <li>{`Sponsor: ${reward.sponsor}`}</li>
          <li>{`ID: ${reward._id}`}</li>
        </div>
      ))
    ) : (
      <h2> You have no rewards! </h2>
    );

    return (
      <React.Fragment>
          <h1>Rewards</h1>
         
        <ul className="noBullets col-lg-6 col-lg-3-offset">{rewards}</ul>

        <div>
          <RewardForm
            formData={this.state.formData}
            onSave={this.onSave}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Rewards;
