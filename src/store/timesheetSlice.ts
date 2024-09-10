import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TimesheetEntry {
  date: string
  hours: number
}

interface TimesheetState {
  entries: TimesheetEntry[]
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