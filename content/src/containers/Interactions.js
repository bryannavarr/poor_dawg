import React from "react";
import InteractionForm from "./InteractionForm";
import * as interactionService from "../services/interaction.service";
import jquery from "jquery";
import JarvisWidget from "./widgets/JarvisWidget";
window.$ = window.jQuery = jquery;
require("smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js");
const defaults = {
  grid: "article",
  widgets: ".jarviswidget",
  localStorage: false,
  deleteSettingsKey: "#deletesettingskey-options",
  settingsKeyLabel: "Reset settings?",
  deletePositionKey: "#deletepositionkey-options",
  positionKeyLabel: "Reset position?",
  sortable: true,
  buttonsHidden: false,
  // toggle button
  toggleButton: true,
  toggleClass: "fa fa-minus | fa fa-plus",
  toggleSpeed: 200,
  onToggle: function() {},
  // delete btn
  deleteButton: true,
  deleteMsg: "Warning: This action cannot be undone!",
  deleteClass: "fa fa-times",
  deleteSpeed: 200,
  onDelete: function() {},
  // edit btn
  editButton: true,
  editPlaceholder: ".jarviswidget-editbox",
  editClass: "fa fa-cog | fa fa-save",
  editSpeed: 200,
  onEdit: function() {},
  // color button
  colorButton: true,
  // full screen
  fullscreenButton: true,
  fullscreenClass: "fa fa-expand | fa fa-compress",
  fullscreenDiff: 3,
  onFullscreen: function() {},
  // custom btn
  customButton: false,
  customClass: "folder-10 | next-10",
  customStart: function() {
    alert("Hello you, this is a custom button...");
  },
  customEnd: function() {
    alert("bye, till next time...");
  },
  // order
  buttonOrder: "%refresh% %custom% %edit% %toggle% %fullscreen% %delete%",
  opacity: 1.0,
  dragHandle: "> header",
  placeholderClass: "jarviswidget-placeholder",
  indicator: true,
  indicatorTime: 600,
  ajax: true,
  timestampPlaceholder: ".jarviswidget-timestamp",
  timestampFormat: "Last update: %m%/%d%/%y% %h%:%i%:%s%",
  refreshButton: true,
  refreshButtonClass: "fa fa-refresh",
  labelError: "Sorry but there was a error:",
  labelUpdated: "Last Update:",
  labelRefresh: "Refresh",
  labelDelete: "Delete widget:",
  afterLoad: function() {},
  rtl: false, // best not to toggle this!
  onChange: function() {},
  onSave: function() {}
  // ajaxnav : $.navAsAjax // declears how the localstorage should be saved (HTML or AJAX Version)
};
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

    window.$(this.grid).jarvisWidgets(defaults);
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
                <span>> Add or Update Interactions</span>
              </h1>
            </div>
          </div>
          <section id="widget-grid" ref={grid => (this.grid = grid)}>
            <div className="row">
              <div className="col-sm-6">
                <JarvisWidget
                  title="Interactions Form"
                  legend="Please fill me out"
                  body={
                    <InteractionForm
                      formData={this.state.formData}
                      onSave={this.onSave}
                      onDelete={this.onDelete}
                      onCancel={this.onCancel}
                    />
                  }
                />
              </div>
              <div className="col-sm-6">
                <JarvisWidget
                  title="Current Interactions"
                  body={<ol>{interactions} </ol>}
                />
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Interactions;
