import { useReducer, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData, EventFormErrors } from "../types/campus-event";
import { getEventErrors } from "../core/form-rules";

type EditorState = { data: EventFormData; errors: EventFormErrors };
type EditorAction =
  | { type: "field"; field: keyof EventFormData; value: string }
  | { type: "errors"; errors: EventFormErrors };

function formReducer(state: EditorState, action: EditorAction): EditorState {
  if (action.type === "field") return { ...state, data: { ...state.data, [action.field]: action.value } };
  return { ...state, errors: action.errors };
}

export function useEventEditor(initialData: EventFormData, onSave: (form: EventFormData) => void) {
  const [state, dispatch] = useReducer(formReducer, { data: initialData, errors: {} });

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    dispatch({ type: "field", field: event.currentTarget.name as keyof EventFormData, value: event.currentTarget.value });
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = getEventErrors(state.data);
    dispatch({ type: "errors", errors });
    if (Object.keys(errors).length === 0) onSave(state.data);
  }

  return { ...state, updateField, save };
}
