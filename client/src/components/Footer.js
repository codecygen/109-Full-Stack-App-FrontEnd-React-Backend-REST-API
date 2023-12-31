import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

import classes from "./Footer.module.scss";

const Footer = (props) => {
  return (
    <footer className={classes.footer} onClick={props.onClick}>
      <div className={classes.column1}>
        <p>
          <FontAwesomeIcon icon={faFutbol} size="xl" /> Soccer Club
        </p>
        <p>
          <NavLink to="/">Latest Events</NavLink>
        </p>
      </div>
      <div className={classes.column2}>
        <p>
          Created by{" "}
          <strong>
            <a href="https://aras-portfolio.web.app/">Vahit Aras Sen</a>
          </strong>
          , ©{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
