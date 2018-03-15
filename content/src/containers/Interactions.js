import React from "react";
import InteractionForm from "./InteractionForm";
import * as interactionService from "../services/interaction.service";

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
        //console.log(data)
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
    debugger;
    // let id = formData._id.value
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
        <li
          key={interaction._id}
          onClick={this.onSelect.bind(this, interaction)}
        >{`ID: ${interaction._id}`}</li>
      ))
    ) : (
      <h2> NONE</h2>
    );

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
              data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
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
          <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 class="page-title txt-color-blueDark">
                <i class="fa fa-paw fa-fw " />
                Interactions
                <span>> Add or Update Interactions</span>
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <ul>{interactions}</ul>
            </div>
            <div className="col-sm-6">
              <div
                className="jarviswidget "
                data-widget-togglebutton="true"
                id="wid-id-interactionsForm"
                
                data-widget-colorbutton="false"
                data-widget-editbutton="false"
                data-widget-deletebutton="false"
                data-widget-sortable="false"
                role="widget"
              >
                <header>
                  <h2>Interactions</h2>
                  
                </header>
                
                <div>
                <legend>
                  Fill this out please
                </legend>
                

                  <div className="widget-body">
                    <InteractionForm
                      formData={this.state.formData}
                      onSave={this.onSave}
                      onDelete={this.onDelete}
                      onCancel={this.onCancel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Interactions;
