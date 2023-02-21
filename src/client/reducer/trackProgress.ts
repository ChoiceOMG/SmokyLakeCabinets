// userConfig.ts
export interface ProgressState {
  kitchenStep: number;
  materialStep: string;
  formStep: number;
}

interface SetKitchenProgressAction {
  type: 'SET_KITCHEN_PROGRESS';
  payload: number;
}
interface SetMaterialProgressAction {
  type: 'SET_MATERIAL_PROGRESS';
  payload: string;
}
interface SetFormProgressAction {
  type: 'SET_FORM_PROGRESS';
  payload: number;
}
type TrackProgressActions =
  | SetKitchenProgressAction
  | SetFormProgressAction
  | SetMaterialProgressAction;

const initialState: ProgressState = {
  kitchenStep: 1,
  materialStep: '',
  formStep: 0
};

const trackProgress = (
  state = initialState,
  action: TrackProgressActions
): ProgressState => {
  switch (action.type) {
    case 'SET_KITCHEN_PROGRESS':
      return { ...state, kitchenStep: action.payload };
    case 'SET_MATERIAL_PROGRESS':
      return { ...state, materialStep: action.payload };
    case 'SET_FORM_PROGRESS':
      return { ...state, formStep: action.payload };
    default:
      return state;
  }
};

export const setKitchenProgressStep = (step: number) => ({
  type: 'SET_KITCHEN_PROGRESS',
  payload: step,
});
export const setMaterialsRoom = (room: string) => ({
  type: 'SET_MATERIAL_PROGRESS',
  payload: room,
});

export const setFormStep = (step: number) => ({
  type: 'SET_FORM_PROGRESS',
  payload: step,
});

export default trackProgress;
