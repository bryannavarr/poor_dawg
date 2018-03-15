import React from "react";
//import * as validationHelper from '../helpers/validation.helper'
class DogsMenu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         dogs: [
            { dogId: "5aaae37e010207f32cae741d"},
            { dogId: "5aaae37e010207f32cae741f" },
            { dogId: "5aaae37e010207f32cae741c" }
         ]
      };
      //this.onChange = validationHelper.onChange.bind(this);
   }

//    onChange(dog, e) {
//       this.setState({
//          //name: dog.name,
//          dogId: dog.dogId
//       });
//    }

   render() {
      const dogs = 
      //this.state.dogs ? (
         this.state.dogs.map(dog => (
            <option
               name={dog.dogId}
               key={dog.dogId}
               value={dog.dogId}
               //id={dog.dogId}
            //    onClick={
            //        (e)=> {
            //     debugger;
            //     this.onChange(dog, e)}
            // }
               
            >
               {dog.dogId}
            </option>
         ))
    //   ) : (
    //      <React.Fragment />
    //   );

      return (
         <React.Fragment>
            <select 
            onChange={
                this.props.onChange
                //(e) => 
                //this.onChange
            }
            name="dogId"
            value={this.state.dogs.dogId}>{dogs}</select>
         </React.Fragment>
      );
   }
}

export default DogsMenu;
