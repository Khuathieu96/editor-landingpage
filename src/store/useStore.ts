import { useContext } from "react";
import { GameSettingContext } from "../context/GameContext/GameContext";

export const useStores = () => useContext(GameSettingContext);
