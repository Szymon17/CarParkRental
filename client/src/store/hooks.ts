import { dispatchType, stateType } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<stateType> = useSelector;
export const useAppDispatch = () => useDispatch<dispatchType>();
