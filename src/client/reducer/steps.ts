import { Action } from 'redux';

export interface QuizState {
  slideNames: string[];
  currentSlide: string;
  progressPercentage: number;
  answers: Record<string, Record<string, any>>; // Обновленная структура ответов
}

export interface SetCurrentSlideAction extends Action {
  type: 'SET_CURRENT_SLIDE';
  payload: string;
}

export interface SaveRoomAnswersAction extends Action {
  type: 'SAVE_ROOM_ANSWERS';
  payload: {
    room: string;
    question: string;
    answer: any;
  };
}

export interface ResetProgressAction extends Action {
  type: 'RESET_PROGRESS';
}

const initialState: QuizState = {
  slideNames: [
    "CabinetStyles",
    "WallHeights",
    "GlassStyle",
    "PantryTall",
    "SelectBoxMaterial",
    "SelectHardwarePackage",
    "SelectDrawers"
  ],
  currentSlide: "",
  progressPercentage: 0,
  answers: {}, // Инициализируем пустой объект для хранения ответов
};

const Steps = (
  state = initialState,
  action: SetCurrentSlideAction | SaveRoomAnswersAction | ResetProgressAction
): QuizState => {
  switch (action.type) {
    case "SET_CURRENT_SLIDE":
      const currentIndex = state.slideNames.indexOf(action.payload);
      const progressPercentage = (currentIndex + 1) / state.slideNames.length * 100;
      return {
        ...state,
        currentSlide: action.payload,
        progressPercentage,
      };
    case "SAVE_ROOM_ANSWERS":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.room]: {
            ...state.answers[action.payload.room],
            [action.payload.question]: action.payload.answer,
          },
        },
      };
    case "RESET_PROGRESS":
      return {
        ...state,
        progressPercentage: 0,
      };
    default:
      return state;
  }
};


export const saveRoomAnswers = (
  room: string,
  question: string,
  answer: any
): SaveRoomAnswersAction => {
  return {
    type: 'SAVE_ROOM_ANSWERS',
    payload: {
      room,
      question,
      answer,
    },
  };
};


export default Steps;
