import React from 'react'
import $ from 'jquery'
// import "smartadmin-plugins/jquery-ui-custom/jquery-ui.core.min.js"
import 'jquery-ui'


const testList = ["A", "B", "C", "D"]


class Sortable extends React.Component {

    renderItems(){
        return testList.map(item => <li key={item}>{item}</li>)
    }

    componentDidMount(){
        this.$node = $(this.refs.sortable)
        this.$node.sortable();
    }

    render(){

        return <ul ref="sortable"> {this.renderItems()} </ul>

    }
}

export default Sortable