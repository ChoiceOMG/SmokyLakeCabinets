// userConfig.ts
export interface ProgressState {
  kitchenStep: number;
  materialStep: string;
}

interface SetKitchenProgressAction {
  type: 'SET_KITCHEN_PROGRESS';
  payload: number;
}
interface SetMaterialProgressAction {
  type: 'SET_MATERIAL_PROGRESS';
  payload: string;
}

type TrackProgressActions =
  | SetKitchenProgressAction
  | SetMaterialProgressAction;

const initialState: ProgressState = {
  kitchenStep: 1,
  materialStep: '',
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

export default trackProgress;
