import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.column1}>
        <p>Aras</p>
        <p>Aras</p>
      </div>
      <div className={classes.column2}>
        <p>Aras2</p>
      </div>
    </footer>
  );
};

export default Footer;
