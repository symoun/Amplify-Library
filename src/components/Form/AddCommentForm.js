import Modal from "../modalForm/Modal";
import styles from "./AddForm.module.scss";
import { useState } from "react";

const AddForm = (props) => {
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmitForm(value);
  };

  return (
    <Modal className={styles.modal}>
      <h2>{props.header}</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <label htmlFor="AddBook">{props.name}</label>
        <input
          id="AddBook"
          name="AddBook"
          type="text"
          onChange={changeHandler}
          value={value}
        />
        <div className={styles.buttoncontainer}>
          <button type="submit">Add </button>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddForm;
