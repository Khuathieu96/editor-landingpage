import React, { createContext, ReactChild, useContext } from 'react';
import { storeGamesList } from '../../store/store';

interface GameContextProps {
  children: ReactChild;
}

const GameSettingContext = createContext(storeGamesList);
console.log(
  'storeGamesList, GameSettingContext',
  storeGamesList,
  GameSettingContext,
);

const GameContextProvider = (props: GameContextProps) => {
  // const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <GameSettingContext.Provider value={storeGamesList}>
      {props.children}
    </GameSettingContext.Provider>
  );
};
export default GameContextProvider;

export { GameSettingContext };
