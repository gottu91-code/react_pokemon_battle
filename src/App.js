import { useState } from "react";
import { Field } from "./components/Field";
import { Pokemon } from "./components/Pokemon";
import { Reset } from "./components/Reset";
import { Result } from "./components/Result";
import './css/common.css';
import classes from './css/App.module.css';
import { Version } from "./components/Version";

function App() {
  const defaultHpPokemon1 = 340;
  const defaultHpPokemon2 = 285;
  const [pokemon1Hp, setPokemon1Hp] = useState(defaultHpPokemon1); // ゲンガー
  const [pokemon2Hp, setPokemon2Hp] = useState(defaultHpPokemon2); // ピカチュウ
  const [isShowResetButton, setIsShowResetButton] = useState(false); // リセットボタン
  const [isShowResult, setIsShowResult] = useState(false); // 結果
  const [isActiveWazaButton, setIsActiveWazaButton] = useState(true); // 技リスト
  const [winnerName, setWinnerName] = useState(); // 勝者
  const [isTurnPokemon1, setIsTurnPokemon1] = useState(true); // ゲンガーが先行
  const [isTurnPokemon2, setIsTurnPokemon2] = useState(false); // ピカチュウは後攻

  const reset = () => {
    setPokemon1Hp(() => defaultHpPokemon1);
    setPokemon2Hp(() => defaultHpPokemon2);
    setIsShowResetButton(prev => !prev);
    setIsActiveWazaButton(prev => !prev);
    setIsShowResult(prev => !prev);
    setIsTurnPokemon1(() => true);
    setIsTurnPokemon2(() => false);
  }

  const isFinish = (prev, attackPoint, enemyNum) => {
    if(prev <= attackPoint) {
      setIsShowResetButton(prev => !prev);
      setIsShowResult(prev => !prev);
      setIsActiveWazaButton(prev => !prev);
      setWinnerName(() => {
        if(enemyNum === 1) {
          return pokemonList[1].name;
        } else if(enemyNum === 2) {
          return pokemonList[0].name;
        }
      });
      return true;
    }
  }

  const attack = (enemyNum, attackPoint) => {
    if(enemyNum === 1) {
      setPokemon1Hp((prev) => {
        if(isFinish(prev, attackPoint, enemyNum)) return 0;
        return prev - attackPoint;
      });
    } else if(enemyNum === 2) {
      setPokemon2Hp((prev) => {
        if(isFinish(prev, attackPoint, enemyNum)) return 0;
        return prev - attackPoint;
      });
    }

  }

  const changeTurn = () => {
    setIsTurnPokemon1(prev => !prev);
    setIsTurnPokemon2(prev => !prev);
  }

  const pokemonList = [
    {
      id: 1,
      name: 'ゲンガー',
      img: 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/72c82f8be362d1b53ae308d706728411.png',
      hp: pokemon1Hp,
      wazaList: {
        'シャドークロー (60ダメージ)': () => { attack(2, 60) },
        'あくのはどう (80ダメージ)': () => { attack(2, 80) },
        'サイコキネシス (90ダメージ)': () => { attack(2, 90) },
        'きあいだま (140ダメージ)': () => { attack(2, 140) },
        'キズぐすり(40回復)': () => { attack(1, -50) },
      },
      isTurn: isTurnPokemon1,
    }, {
      id: 2,
      name: 'ピカチュウ',
      img: 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/5bb0cfd44302cd4df0c0c88d37457931.png',
      hp: pokemon2Hp,
      wazaList: {
        '電気ショック (50ダメージ)': () => { attack(1, 50) },
        '10万ボルト (80ダメージ)': () => { attack(1, 80) },
        'かみなり (110ダメージ)': () => { attack(1, 110) },
        'ボルテッカー (120ダメージ)': () => { attack(1, 120) },
        'キズぐすり(40回復)': () => { attack(2, -50) },
      },
      isTurn: isTurnPokemon2,
    }
  ]

  return (
      <div className={classes.app}>
        <Field>
          <Result isShowResult={isShowResult} winnerName={winnerName}/>
          <Reset isShowResetButton={isShowResetButton} reset={reset} />
          {pokemonList.map((pokemon, index) => {
            return <Pokemon fighter={pokemon} isActiveWazaButton={isActiveWazaButton} changeTurn={changeTurn} />
          })}
        </Field>
        <Version />
      </div>
  );
}

export default App;
