import React from "react";
import InteractionForm from "./InteractionForm";
import * as interactionService from "../services/interaction.service";
import jquery from "jquery";
import WizardGrid from "./widgets/WidgetGrid";
import JarvisWidget from "./widgets/JarvisWidget";
window.$ = window.jQuery = jquery;
require("smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js");

class Interactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interactions: []
    };
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    interactionService
      .readAll()
      .then(data => {
        this.setState({ interactions: data.data.items });
      })
      .catch(err => console.log(err));
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;
    interactionService
      .deleteById(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.interactions.filter(
            item => item._id !== formData._id
          );
          return { interactions: updatedItems };
        });
        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.interactions.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.interactions.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.interactions.concat(updatedFormData);
      }
      return {
        interactions: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  render() {
    const interactions = this.state.interactions ? (
      this.state.interactions.map(interaction => (
        <tr
          key={interaction._id}
          onClick={this.onSelect.bind(this, interaction)}
        >
          <td> {interaction._id}</td>
          <td> {interaction.points}</td>
          <td> {interaction.dogOwnerId}</td>
        </tr>
      ))
    ) : null;

    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWidgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Interactions</li>
          </ol>
        </div>
        <div id="content">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 className="page-title txt-color-blueDark">
                <i className="fa fa-paw fa-fw " />
                Interactions
                <span> > Add or Update Interactions</span>
              </h1>
            </div>
          </div>

          <WizardGrid>
            <div className="row">
              <div className="col-sm-7">
                <JarvisWidget title="Current Interactions">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                        <td>
                          <strong> Interaction ID</strong>
                        </td>
                        <td>
                          <strong>Points</strong>
                        </td>
                        <td>
                          <strong> Dog Owner Id</strong>
                        </td>
                        </tr>            
                      </thead>
                      <tbody>
                        {interactions}
                      </tbody>
                    </table>
                  </div>
                </JarvisWidget>
              </div>
              <div className="col-sm-5">
                <JarvisWidget
                  title="Interactions Form"
                  legend="Please fill me out"
                >
                  <InteractionForm
                    formData={this.state.formData}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    onCancel={this.onCancel}
                  />
                </JarvisWidget>
              </div>
            </div>
          </WizardGrid>
        </div>
      </React.Fragment>
    );
  }
}

export default Interactions;
