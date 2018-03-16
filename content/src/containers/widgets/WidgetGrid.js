import React from "react";
import defaults from "./WidgetDefaults";
import jquery from "jquery";
window.$ = window.jQuery = jquery;
require("smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js");

class WidgetGrid extends React.Component {
  componentDidMount() {
    window.$(this.grid).jarvisWidgets(defaults);
  }

  render() {
    return (
      <section id="widget-grid" ref={grid => (this.grid = grid)}>
        {this.props.children}
      </section>
    );
  }
}

export default WidgetGrid;
