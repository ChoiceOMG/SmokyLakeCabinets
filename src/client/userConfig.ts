// userConfig.ts
interface ConfigState {
  theme: 'dark' | 'light';
  language: 'en' | 'fr';
}

interface SetThemeAction {
  type: 'SET_THEME';
  payload: 'dark' | 'light';
}
interface SetLanguageAction {
  type: 'SET_LANGUAGE';
  payload: 'en' | 'fr';
}
interface SetUserAction {
  type: 'SET_USER';
  payload: object | null;
}

type ConfigActions = SetThemeAction | SetLanguageAction | SetUserAction;

const initialState: ConfigState = {
  theme: 'dark',
  language: 'en',
};

const userConfig = (
  state = initialState,
  action: ConfigActions
): ConfigState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export const setTheme = (theme: 'dark' | 'light') => ({
  type: 'SET_THEME',
  payload: theme,
});

export const setLanguage = (language: 'en' | 'fr') => ({
  type: 'SET_LANGUAGE',
  payload: language,
});

export default userConfig;
