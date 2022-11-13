import React from 'react'
import classes from '../css/Result.module.css';

export const Result = (props) => {
    const { isShowResult, winnerName } = props;

  return (
    <div className={classes.result} style={isShowResult ? {display: 'block'} : {}}>
        {winnerName}の勝ち！
    </div>
  )
}
