import React, { ReactChild, useContext } from 'react';
import AppContextProvider from './AppContext';
import GameContextProvider from './GameContext';
// import { AppContext } from 'src/context';

// const NeedAppContext = (props) => {
//   const { children } = props;
// const classes = useStyles();
// const { appContext } = useContext(AppContext);
// const [language] = useLanguage();
// const messages = isGlobalMode()
//   ? {
//       ko: { ...gpmsKo, ...styleKo, ...vtzaloKo },
//       en: { ...gpmsEn, ...styleEn, ...vtzaloEn },
//       vi: { ...gpmsVi, ...styleVi, ...vtzaloVi },
//       ru: { ...gpmsRu, ...styleRu },
//     }
//   : {
//       ko: { ...kpmsKo, ...styleKo, vtzaloKo },
//       en: { ...kpmsEn, ...styleEn, vtzaloEn },
//     };

// return (
// <IntlProvider locale={language} messages={messages[language]}>
// <ThemeProvider theme={createMuiTheme(appContext.theme)}>
// <SnackbarProvider
//   classes={{
//     root: classes.root,
//     containerAnchorOriginBottomCenter:
//       classes.containerAnchorOriginBottomCenter
//   }}
//   maxSnack={3}
//   anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//   disableWindowBlurListener={true}
// >
// { children }
// </SnackbarProvider>
//   </ThemeProvider>
// </IntlProvider>
//   );
// };
interface PropsContextProvide {
  children: ReactChild;
}

const ContextProvider = (props: PropsContextProvide) => {
  const { children } = props;

  return (
    <AppContextProvider>
      {/* <TopbarContextProvider> */}
      {/* <ApolloProvider> */}
      <GameContextProvider>{children}</GameContextProvider>

      {/* </ApolloProvider> */}
      {/* </TopbarContextProvider> */}
    </AppContextProvider>
  );
};

export default ContextProvider;
