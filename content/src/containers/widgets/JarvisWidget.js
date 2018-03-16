import React from "react";

import InteractionForm from '../InteractionForm'

class JarvisWidget extends React.Component {


  render() {
    return (
      <div
      className= {this.props.classes ? this.props.classes : "jarviswidget"}
      >
        <header>
          <h2>{this.props.title}</h2>
        </header>

        <div>

            {this.props.legend ? <legend>{this.props.legend}</legend> : null }

          
          <div className="widget-body">
              {this.props.body}
          </div>
        </div>
      </div>
    );
  }
}

export default JarvisWidget;
