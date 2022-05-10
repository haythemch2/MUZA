import React from "react"
import notification  from "@/notification";

class NavigationListener extends React.Component {
    constructor() {
      super();
    }
    render()
    {
      return <></>
    }
    componentDidMount() {
      notification.destroy() 
    }
    componentWillUnmount() {
  
    }
  };
  export default NavigationListener