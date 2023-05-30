import React from "react";
import styles from "./Modal.module.scss";

const Backdrop = (props) => {
  return <div className={styles.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${styles.modal} ${props.className}`}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop />
      <ModalOverlay className={props.className}>{props.children}</ModalOverlay>
    </React.Fragment>
  );
};

export default Modal;
