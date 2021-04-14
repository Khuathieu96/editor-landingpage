import React, { ReactChild, Reducer, useReducer } from 'react';

// let { theme: localTheme } = (() => {
//   if (isGlobalMode()) return require("gpms/theme");
//   else return require("kpms/theme");
// })();

const initialState = {
  // language: isGlobalMode() ? localStorage.getItem("lang") || "en" : "ko",
  // refresh: 0,
  // theme: {
  //   ...basicTheme,
  //   ...localTheme,
  //   typography: {
  //     ...basicTheme.typography,
  //     fontFamily: [
  //       localStorage.getItem("lang") === "en" ? "Roboto" : "Noto Sans",
  //       "-apple-system",
  //       "BlinkMacSystemFont"
  //     ].join(",")
  //   }
  // },
  // route: { path: "", props: null },
  permission: null,
  needNotify: false,
  certs: null,
  ready: false,
  cache: 0,
  refresh: 0,
};
// const fontChange = (targetLanguage, targetTheme) => {
//   const fontFamily = targetLanguage === "ko" ? "Noto Sans" : "Roboto";

//   const newTypography = {
//     ...targetTheme.typography,
//     fontFamily: [fontFamily, "-apple-system", "BlinkMacSystemFont"].join(",")
//   };

//   const newTheme = {
//     ...targetTheme,
//     typography: newTypography,
//     // ...localTheme
//   };

//   return newTheme;
// };
const initializer = () => {
  // if (!localStorage.getItem("lang")) {
  //   if (isGlobalMode()) {
  //     localStorage.setItem("lang", "en");
  //   } else {
  //     localStorage.setItem("lang", "ko");
  //   }
  // }
  // const theme = fontChange(initialState.language, initialState.theme);
  // getMomentLocale(initialState.language);
  return {
    ...initialState,
    // theme: theme
  };
};

type Action = {
  type: string;
  target: any;
};
type State = {
  permission: null;
  needNotify: false;
  certs: null;
  ready: false;
  cache: 0;
  refresh: 0;
};

const reducer = (state: State, action: Action) => {
  // console.info(action);
  switch (action.type) {
    case 'init':
      return initializer();

    case 'language':
      localStorage.setItem('lang', action.target);
      // getMomentLocale(action.target);
      // const newTheme = fontChange(action.target, state.theme);
      return {
        ...state,
        language: action.target,
        // theme: newTheme,
        refresh: state.refresh + 1,
      };

    case 'refresh':
      return { ...state, refresh: state.refresh + 1 };

    case 'cache':
      return { ...state, cache: state.cache + 1 };

    // case "theme":
    //   if (action.target === basicTheme.themeName) {
    //     const newTheme = fontChange(state.language, basicTheme);
    //     return { ...state, theme: newTheme };
    //   } else if (action.target === blueTheme.themeName) {
    //     const newTheme = fontChange(state.language, blueTheme);
    //     return { ...state, theme: newTheme };
    //   }
    //   return state;

    case 'ready':
    case 'certs':
    case 'token':
    case 'route':
    case 'permission':
    case 'needNotify':
      return { ...state, [action.type]: action.target };
    default:
      return state;
  }
};

const AppContext = React.createContext({});
const AppContextConsumer = AppContext.Consumer;

interface AppContextProps {
  children: ReactChild;
}

const AppContextProvider = (props: AppContextProps) => {
  const [appContext, dispatchApp] = useReducer<Reducer<any, any>>(reducer, {
    ...initializer(),
  });
  const value = { appContext, dispatchApp };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
export { AppContext, AppContextConsumer };
