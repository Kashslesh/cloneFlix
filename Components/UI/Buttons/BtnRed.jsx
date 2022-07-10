import classes from './BtnRed.module.css';
const BtnRed = (props) => {
  return (
    <button className={props.className ? props.className : classes.btnred}>{props.children}</button>
  );
};
export default BtnRed;
