import React from "react";
import loader from "../assets/images/loader.png";

const Loader = () => {
    return (
        <div className="loader-outer">
            <img src={loader} className="loader-custom" alt="loader"/>
        </div>);
}

export default Loader;