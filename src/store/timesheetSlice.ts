import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TimesheetEntry {
  date: string;
  hours: number;
  client: string;
  chantier: string;
  sousTraitant: string;
  plaque: string;
  vehicleType: string;
  totalHeuresSimple: string;
  totalHeuresDouble: string;
  totalVoyageSimple: string;
  totalVoyageDouble: string;
  infoVoyage: string;
  acceptePar: string;
}

interface TimesheetState {
  entries: TimesheetEntry[];
}

const initialState: TimesheetState = {
  entries: []
}

export const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<TimesheetEntry>) => {
      state.entries.push(action.payload)
    }
  }
})

export const { addEntry } = timesheetSlice.actions

export default timesheetSlice.reducer