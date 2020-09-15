import React from "react";
import { Route } from 'react-router-dom';

import Objectives from "../pages/Objectives";



const ReactRouter = () => {
    return (
        <React.Fragment>
            <Route  exact path="/" component={Objectives} />
        </React.Fragment>
    );
}
export default ReactRouter;
