import React from "react";

class DogsMenu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         dogs: [
            { name: "happy", dogId: 5 },
            { name: "scruffy", dogId: 6 },
            { name: "skippy", dogId: 9 }
         ]
      };
      this.onChange = this.onChange.bind(this);
   }

   onChange(dog, e) {
      this.setState({
         name: dog.name,
         dogId: dog.dogId
      });
   }

   render() {
      const dogs = 
      //this.state.dogs ? (
         this.state.dogs.map(dog => (
            <option
               name={dog.name}
               key={dog.dogId}
               value={dog.dogId}
               onClick={(e)=> {
                debugger;
                this.onChange(dog, e)}}
               
            >
               {dog.name}
            </option>
         ))
    //   ) : (
    //      <React.Fragment />
    //   );

      return (
         <React.Fragment>
            <select 
            onChange={
                //this.props.onChange
                (e) => 
                this.onChange(e)
            }
            value={this.state.dogs}>{dogs}</select>
         </React.Fragment>
      );
   }
}

export default DogsMenu;
