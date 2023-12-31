import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from 'store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
