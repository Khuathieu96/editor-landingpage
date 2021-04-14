import React, { createContext, ReactChild, useContext } from 'react';
import { storeGameSetting } from '../../store/store';

interface GameContextProps {
  children: ReactChild;
}

const GameSettingContext = createContext(storeGameSetting);

const GameContext = (props: GameContextProps) => {
  // const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <GameSettingContext.Provider value={storeGameSetting}>
      {props.children}
    </GameSettingContext.Provider>
  );
};
export default GameContext;

export { GameSettingContext };
