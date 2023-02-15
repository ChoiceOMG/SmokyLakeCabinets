type CabinetInteriorPreference = {
  id: number;
  boxMaterial: string;
  hardware: string;
  drawerMaterial: string;
  applyToSections: string[];
};
type CabinetExteriorPreference = {
  id: number;
  doorStyle: string;
  upperDoorStyle: string;
  finishes: string;
};


export interface MaterialsFinishesState {
  interior: CabinetInteriorPreference[];
  exterior: CabinetExteriorPreference[];
  kitchenSpecs: {
    wallHeight: number;
    vaultedCeiling: boolean;
    upperCabinetHeight: number;
    ultraUpperCabinetHeight: number; // 12" above upper cabinet requires glass
    matchingDoors: boolean;
    glassInsertsType: string;
    tallCabinets: number;
    closedToCeiling: boolean;
    toeKickHeight: number;
    toeKickHeightType: string;
    crownMolding: boolean;
    lightValance: boolean;
    lightValanceType: string;
    floatingShelves: boolean;
    coffeeHutch: boolean;
    coffeeHutchType: string;
    coffeeHutchDoor: number;
  };
}
interface SetInteriorPreferenceAction {
  type: 'SET_INTERIOR_PREFERENCE';
  payload: CabinetInteriorPreference;
}
interface SetExteriorPreferenceAction {
  type: 'SET_EXTERIOR_PREFERENCE';
  payload: CabinetExteriorPreference;
}
interface SetKitchenSpecsAction {
  type: 'SET_KITCHEN_SPECS';
  payload: {
    wallHeight: number;
    vaultedCeiling: boolean;
    upperCabinetHeight: number;
    ultraUpperCabinetHeight: number; // 12" above upper cabinet requires glass
    matchingDoors: boolean;
    glassInsertsType: string;
    tallCabinets: number;
    closedToCeiling: boolean;
    toeKickHeight: number;
    toeKickHeightType: string;
    crownMolding: boolean;
    lightValance: boolean;
    lightValanceType: string;
    floatingShelves: boolean;
    coffeeHutch: boolean;
    coffeeHutchType: string;
    coffeeHutchDoor: number;
  };
}
type MaterialsFinishesAction =
  | SetInteriorPreferenceAction
  | SetExteriorPreferenceAction
  | SetKitchenSpecsAction;

const initialState: MaterialsFinishesState = {
  interior: [
    {
      id: 1,
      boxMaterial: 'MDF',
      hardware: 'Hinges',
      drawerMaterial: 'MDF',
      applyToSections: ['All'],
    },
  ],
  exterior: [
    {
      id: 1,
      doorStyle: 'Shaker',
      upperDoorStyle: 'Shaker',
      finishes: 'White',
    },
  ],
  kitchenSpecs: {
    wallHeight: 84,
    vaultedCeiling: false,
    upperCabinetHeight: 12,
    ultraUpperCabinetHeight: 12, // 12" above upper cabinet requires glass
    matchingDoors: false,
    glassInsertsType: 'None',
    tallCabinets: 0,
    closedToCeiling: false,
    toeKickHeight: 4,
    toeKickHeightType: 'Standard',
    crownMolding: false,
    lightValance: false,
    lightValanceType: 'None',
    floatingShelves: false,
    coffeeHutch: false,
    coffeeHutchType: 'None',
    coffeeHutchDoor: 0,
  },
};

 const materialsFinishesReducer = (
  state = initialState,
  action: MaterialsFinishesAction
): MaterialsFinishesState => {
  switch (action.type) {
    case 'SET_INTERIOR_PREFERENCE':
      return {
        ...state,
        interior: state.interior.map((preference) =>
          preference.id === action.payload.id ? action.payload : preference
        ),
      };
    case 'SET_EXTERIOR_PREFERENCE':
      return {
        ...state,
        exterior: state.exterior.map((preference) =>
          preference.id === action.payload.id ? action.payload : preference
        ),
      };
    case 'SET_KITCHEN_SPECS':
      return {
        ...state,
        kitchenSpecs: action.payload,
      };
    default:
      return state;
  }
};

export default materialsFinishesReducer;