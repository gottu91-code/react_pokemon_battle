import classes from '../css/Pokemon.module.css';

export const Pokemon = (props) => {
    const {name, img, hp, wazaList, isTurn} = props.fighter;
    const { changeTurn } = props;

    return (
        <div className={classes.pokemon}>
            <div className={classes.img}>
                <img src={img} alt={name} />
            </div>
            <p className={classes.name}>{name} HP: {hp}</p>
            <div className={classes.waza_list}>
                {
                    Object.entries(wazaList).map((waza) => {
                        return (
                            <button onClick={ () => {waza[1](); changeTurn();} } key={waza[0]} disabled={!props.isActiveWazaButton || !isTurn}>{waza[0]}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}
