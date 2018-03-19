import React from "react";

class JarvisWidget extends React.Component {
  render() {
    return (
      <div
        className="jarviswidget"
        data-widget-togglebutton
        data-widget-editbutton
        data-widget-deletebutton
      >
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <div>
          {this.props.legend ? <legend>{this.props.legend}</legend> : null}
          <div className="widget-body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default JarvisWidget;
