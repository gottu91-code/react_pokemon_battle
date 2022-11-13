import classes from '../css/Field.module.css';

export const Field = ({ children }) => {
    return (
        <div className={classes.field}>
            {children}
        </div>
    )
}