import "./orderWindow.styles.sass";
import Button, { BUTTON_CLASSES } from "../button/button.component";

const OrderWindow = () => {
  return (
    <div className="orderWindow">
      <div className="orderWindow__container">
        <div className="orderWindow__item">
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Miejsce odbioru</label>
            <input type="text" className="orderWindow__input"></input>
          </div>
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Miejsce zwrotu</label>
            <input type="text" className="orderWindow__input"></input>
          </div>
        </div>
        <div className="orderWindow__item">
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Data odbioru</label>
            <input type="text" className="orderWindow__input"></input>
          </div>
          <div className="orderWindow__inputContainer">
            <label className="orderWindow__inputLabel">Data zwrotu</label>
            <input type="text" className="orderWindow__input"></input>
          </div>
        </div>
      </div>
      <div className="orderWindow__buttonContainer">
        <Button buttonType={BUTTON_CLASSES.green}>Szukaj</Button>
      </div>
    </div>
  );
};

export default OrderWindow;
