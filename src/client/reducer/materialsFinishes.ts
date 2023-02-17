


interface MaterialsFinishesAction {
  type: string;
  payload: {
    roomName: string;
    props?: object | any;
    progress?: number
  };
}


// Action Types
export const ADD_MATERIALS_FINISHES = 'ADD_MATERIALS_FINISHES';

export const DELETE_FINISHES = 'DELETE_FINISHES';

export const UPDATE_MATERIALS_FINISHES = 'UPDATE_MATERIALS_FINISHES';
// Action Creators 
export const addMaterialsFinishes = (roomName: string, props: any) => {
  console.log('addMaterialsFinishes', roomName, props)
  return {
    type: ADD_MATERIALS_FINISHES,
    payload: { roomName, props }
  };
};
export const updateMaterialsFinishes = (roomName: string, props?: object, progress?: number): MaterialsFinishesAction => {
  return {
    type: UPDATE_MATERIALS_FINISHES,
    payload: { roomName, props, progress }
  };
};

export const deleteFinishes = () => {

  return {
    type: DELETE_FINISHES,
    payload: {}
  };
};


// Reducer 
const initialState = {
  materialsFinishes: [{ "room": { "name": "", "props": [], "progress": 0 } }]
};


const materialsFinishesReducer = (state = initialState, action: MaterialsFinishesAction) => {
  switch (action.type) {
    case ADD_MATERIALS_FINISHES: {
      return {
        ...state,
        materialsFinishes: [...state.materialsFinishes, { room: { name: action.payload.roomName, props: action.payload.props } }]
      };
    }
    case DELETE_FINISHES: {
      return {
        ...state,
        materialsFinishes: []
      };

    }

    case UPDATE_MATERIALS_FINISHES: {
      return {
        ...state,
        materialsFinishes: state.materialsFinishes.map((room) => {
          let updateProps = {};
          if (room.room.name === action.payload.roomName) {

            const PropKey = action.payload.props ? Object.keys(action.payload.props)[0] : null;
            if (!Object.prototype.hasOwnProperty.call(room.room.props, PropKey ? PropKey : '')) {
              const newObj = { ...room.room.props, ...action.payload.props };
              console.log('--- room.room.name', room.room.name)
              console.log('room.room.props', room.room.props)
              console.log('newObj', newObj)
              return { room: { name: action.payload.roomName, props: newObj, progress: action.payload.progress } };
            } else {
              console.log('--- Have a props! room.room.name', room.room.name)
              console.log('room.room.props', room.room.props)

              Object.entries(room.room.props).forEach((value, key) => {



                if (PropKey) {
                  Object.entries(action.payload.props).map((element: any, key: number) => {


                    if (value[0] === element[0]) {

                      updateProps[value[0]] = element[1]
                      console.log('updateProps', updateProps[value[0]]);
                    }

                  });

                }
                updateProps[value[0]] = value[1]


              });





              return {

                room: {
                  name: action.payload.roomName, props: updateProps ? updateProps : null
                  , progress: action.payload.progress
                }

              };
            }
          }
          return room;
        }),

      };
    }
    default: return state;
  }
};

export default materialsFinishesReducer;




