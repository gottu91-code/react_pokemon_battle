import React from 'react';
import classes from '../css/Reset.module.css';

export const Reset = (props) => {
  const { isShowResetButton, reset } = props;

  return (
    <div onClick={reset} className={classes.reset} style={isShowResetButton ? {display: 'block'} : {}}>
      <button>最初からやり直す</button>
    </div>
  )
}
