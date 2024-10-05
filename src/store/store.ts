import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import timesheetReducer from './slice/timesheetSlice'
import formSlice from '@/store/slice/formSlice'
import userReducer from './slice/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    timesheet: timesheetReducer,
    form: formSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This disables the SerializableStateInvariantMiddleware
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;