// userConfig.ts
export interface JobQuestionsState {
  jobLocation: string;
  jobQuoteOn: string;
  cabinets: boolean;
  countertops: boolean;
  hasDrawings: boolean;
  hasDrawingsFile: object;
  hasKitchen: number;
  hasIsland: number;
  hasPantry: number;
  hasVanity: number;
  hasEnsuite: number;
  hasJackJill: number;
  hasBasementVanity: number;
  hasMudroom: number;
  hasLaundry: number;
  hasBar: number;
  hasOther: object;
  finishQ: boolean;
  selectedRooms: Array<string>
}

interface SetJobLocationAction {
  type: 'SET_JOB_LOCATION';
  payload: string;
}
interface SetJobQuoteOnAction {
  type: 'SET_JOB_QUOTE_ON';
  payload: string;
}
interface SetCabinetsAction {
  type: 'SET_CABINETS';
  payload: boolean;
}
interface SetCountertopsAction {
  type: 'SET_COUNTERTOPS';
  payload: boolean;
}
interface SetDrawingsAction {
  type: 'SET_DRAWINGS';
  payload: boolean;
}
interface SetFinishQAction {
  type: 'SET_FINISHQ';
  payload: boolean;
}
interface SetDrawingsFileAction {
  type: 'SET_DRAWINGSFILE';
  payload: object;
}


interface SetKitchenAction {
  type: 'SET_KITCHEN';
  payload: number;
}
interface SetIslandAction {
  type: 'SET_ISLAND';
  payload: number;
}
interface SetPantryAction {
  type: 'SET_PANTRY';
  payload: number;
}
interface SetVanityAction {
  type: 'SET_VANITY';
  payload: number;
}
interface SetEnsuiteAction {
  type: 'SET_ENSUITE';
  payload: number;
}
interface SetJackJillAction {
  type: 'SET_JACK_JILL';
  payload: number;
}
interface SetBasementVanityAction {
  type: 'SET_BASEMENT_VANITY';
  payload: number;
}
interface SetMudroomAction {
  type: 'SET_MUDROOM';
  payload: number;
}
interface SetLaundryAction {
  type: 'SET_LAUNDRY';
  payload: number;
}
interface SetBarAction {
  type: 'SET_BAR';
  payload: number;
}
interface SetOtherAction {
  type: 'SET_OTHER';
  payload: object;
}

interface SetSelectedRoomsAction{
  type: 'SET_SELECTED_ROOMS';
  payload: Array<string>
}

type JobQuestionsActions =
  | SetJobLocationAction
  | SetJobQuoteOnAction
  | SetCabinetsAction
  | SetCountertopsAction
  | SetDrawingsAction
  | SetKitchenAction
  | SetDrawingsFileAction 
  | SetFinishQAction
  | SetIslandAction
  | SetPantryAction
  | SetVanityAction
  | SetEnsuiteAction
  | SetJackJillAction
  | SetBasementVanityAction
  | SetMudroomAction
  | SetLaundryAction
  | SetBarAction
  | SetSelectedRoomsAction
  | SetOtherAction;

const initialState: JobQuestionsState = {
  jobLocation: '',
  jobQuoteOn: '',
  cabinets: false,
  countertops: false,
  hasDrawings: false,
  hasDrawingsFile: {},
  hasKitchen: 0,
  hasIsland: 0,
  hasPantry: 0,
  hasVanity: 0,
  hasEnsuite: 0,
  hasJackJill: 0,
  hasBasementVanity: 0,
  hasMudroom: 0,
  hasLaundry: 0,
  hasBar: 0,
  hasOther: {},
  finishQ: false,
  selectedRooms: []

};

const jobQuestions = (
  state = initialState,
  action: JobQuestionsActions
): JobQuestionsState => {
  switch (action.type) {
    case 'SET_JOB_LOCATION':
      return { ...state, jobLocation: action.payload };
    case 'SET_JOB_QUOTE_ON':
      return { ...state, jobQuoteOn: action.payload };
    case 'SET_CABINETS':
      return { ...state, cabinets: action.payload };
    case 'SET_COUNTERTOPS':
      return { ...state, countertops: action.payload };
    case 'SET_DRAWINGS':
      return { ...state, hasDrawings: action.payload };
    case 'SET_FINISHQ':
        return { ...state, finishQ: action.payload };
    case 'SET_DRAWINGSFILE':
      return { ...state, hasDrawingsFile: action.payload };
    case 'SET_KITCHEN':
      return { ...state, hasKitchen: action.payload };
    case 'SET_ISLAND':
      return { ...state, hasIsland: action.payload };
    case 'SET_PANTRY':
      return { ...state, hasPantry: action.payload };
    case 'SET_VANITY':
      return { ...state, hasVanity: action.payload };
    case 'SET_ENSUITE':
      return { ...state, hasEnsuite: action.payload };
    case 'SET_JACK_JILL':
      return { ...state, hasJackJill: action.payload };
    case 'SET_BASEMENT_VANITY':
      return { ...state, hasBasementVanity: action.payload };
    case 'SET_MUDROOM':
      return { ...state, hasMudroom: action.payload };
    case 'SET_LAUNDRY':
      return { ...state, hasLaundry: action.payload };
    case 'SET_BAR':
      return { ...state, hasBar: action.payload };
    case 'SET_OTHER':
      return { ...state, hasOther: action.payload };
    case 'SET_SELECTED_ROOMS':
      return {...state, selectedRooms: action.payload}
    default:
      return state;
  }
};

export const setJobLocation = (location: string) => ({
  type: 'SET_JOB_LOCATION',
  payload: location,
});
export const setJobQuoteOn = (quoteOn: string) => ({
  type: 'SET_JOB_QUOTE_ON',
  payload: quoteOn,
});

export const setCabinets = (cabinets: boolean) => ({
  type: 'SET_CABINETS',
  payload: cabinets,
});
export const setCountertops = (countertops: boolean) => ({
  type: 'SET_COUNTERTOPS',
  payload: countertops,
});
export const setDrawings = (drawings: boolean) => ({
  type: 'SET_DRAWINGS',
  payload: drawings,
});
export const setDrawingsFile = (drawingsfile: object) => (
 
  {
  type: 'SET_DRAWINGSFILE',
  payload: drawingsfile,
});

export const setFinishQ = (finishq: boolean) => ({
  type: 'SET_FINISHQ',
  payload: finishq,
});

export const setKitchen = (kitchen: number) => ({
  type: 'SET_KITCHEN',
  payload: kitchen,
});
export const setIsland = (island: number) => ({
  type: 'SET_ISLAND',
  payload: island,
});
export const setPantry = (pantry: number) => ({
  type: 'SET_PANTRY',
  payload: pantry,
});
export const setVanity = (vanity: number) => ({
  type: 'SET_VANITY',
  payload: vanity,
});
export const setEnsuite = (ensuite: number) => ({
  type: 'SET_ENSUITE',
  payload: ensuite,
});
export const setJackJill = (jackJill: number) => ({
  type: 'SET_JACK_JILL',
  payload: jackJill,
});
export const setBasementVanity = (basementVanity: number) => ({
  type: 'SET_BASEMENT_VANITY',
  payload: basementVanity,
});
export const setMudroom = (mudroom: number) => ({
  type: 'SET_MUDROOM',
  payload: mudroom,
});
export const setLaundry = (laundry: number) => ({
  type: 'SET_LAUNDRY',
  payload: laundry,
});
export const setBar = (bar: number) => ({
  type: 'SET_BAR',
  payload: bar,
});
export const setOther = (other: object) => (
  console.log(other),{
  type: 'SET_OTHER',
  payload: other,
});
export const setSelectedRooms = (select: Array<string>) => (
  {
  type: 'SET_SELECTED_ROOMS',
  payload: select
})
export default jobQuestions;
