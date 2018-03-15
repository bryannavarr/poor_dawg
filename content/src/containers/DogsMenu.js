import React from "react";
class DogsMenu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         dogs: [
            { dogId: "5aaae37e010207f32cae741d" },
            { dogId: "5aaae37e010207f32cae741f" },
            { dogId: "5aaae37e010207f32cae741c" }
         ]
      };
   }

   render() {
      const dogs = this.state.dogs.map(dog => (
         <option
            name={dog.dogId}
            key={dog.dogId}
            value={dog.dogId}
         >
            {dog.dogId}
         </option>
      ));

      return (
         <React.Fragment>
            <select
               onChange={this.props.onChange}
               name="dogId"
               value={this.state.dogs.dogId}
            >
               {dogs}
            </select>
         </React.Fragment>
      );
   }
}

export default DogsMenu;
