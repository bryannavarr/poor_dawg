import React from "react";
import * as vetService from "../services/vet.service";
import VetForm from "./VetForm";

class Vets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vets: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    vetService.readAll().then(data => {
      this.setState({ vets: data.items });
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    vetService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.vets.filter(item => {
            return item._id !== formData._id;
          });

          return { vets: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.vets.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.vets.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.vets.concat(updatedFormData);
      }
      return {
        vets: updatedItems,
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
    const vets = this.state.vets ? (
      this.state.vets.map(vet => (
        <div key={vet._id} onClick={this.onSelect.bind(this, vet)}>
          {vet.firstName + " " + vet.lastName}
        </div>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              class="btn btn-ribbon"
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
            <li>Vets</li>
          </ol>
        </div>
        <div id="content">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
              <h1 className="page-title txt-color-blueDark">
                <i className="fa fa-medkit fa-fw " />
                Veterinarians >
                <span> &nbsp;Keeping your Dog Healthy</span>
              </h1>
            </div>
          </div>
          <section className="widget-grid">
            <div className="row ">
              <article className="col-sm-12 col-md-12 col-lg-6">
                {/* Widget ID (each widget will need unique ID) */}
                <div
                  className="jarviswidget"
                  id="wid-id-0"
                  data-widget-colorbutton="true"
                  data-widget-editbutton="true"
                  data-widget-fullscreenbutton="true"
                  data-widget-custombutton="false"
                  data-widget-collapsed="false"
                  data-widget-sortable="true"
                >
                  <header>
                    <span className="widget-icon">
                      {" "}
                      <i className="fa fa-medkit" />{" "}
                    </span>
                    <h2>Veterinarians</h2>
                  </header>
                  <div>
                    <div className="jarviswidget-editbox">
                      {/* This area used as dropdown edit box */}
                    </div>
                    <div className="widget-body">{vets}</div>
                  </div>
                </div>
              </article>
              <article className="col-sm-12 col-md-12 col-lg-6">
                <div
                  className="jarviswidget"
                  id="wid-id-1"
                  data-widget-colorbutton="false"
                  data-widget-editbutton="false"
                >
                  <header>
                    <span className="widget-icon">
                      {" "}
                      <i className="fa fa-medkit" />{" "}
                    </span>
                    <h2>Create / Edit</h2>
                  </header>
                  <div>
                    <div className="widget-body">
                      <VetForm
                        formData={this.state.formData}
                        onSave={this.onSave}
                        onDelete={this.onDelete}
                        onCancel={this.onCancel}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Vets;
