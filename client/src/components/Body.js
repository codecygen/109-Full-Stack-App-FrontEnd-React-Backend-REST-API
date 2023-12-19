import classes from "./Body.module.scss";

const Body = (props) => {

  return (
    <main className={classes.body}>
      {props.children}
    </main>
  );
};

export default Body;
