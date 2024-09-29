import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'; // Adjust this import based on your store setup
import { 
  createEntryTimeSheetDB, 
  getEntriesTimeSheetDB 
} from '@/lib/actions';
export const mockEntries: TimesheetEntry[] = [
  {
    id: '1',
    client: 'Client 1',
    workLocation: 'Work Location 1',
    contractNumber: 'Contract Number 1',
    dateEntries: [
      {
        date: '2021-10-01',
        startTime: '08:00',
        endTime: '12:00',
        hours: '4',
      },
      {
        date: '2021-10-02',
        startTime: '08:00',
        endTime: '12:00',
        hours: '4',
      },
    ],
    totalHeuresSimple: '8',
    totalHeuresDouble: '0',
    totalVoyageSimple: '0',
    totalVoyageDouble: '0',
    materialTransported: 'Material Transported 1',
    autresPrecisions: 'Autres Precisions 1',
    ejesCamion: 'Ejes Camion 1',
    numeroCamion: 'Numero Camion 1',
    transporteur: 'Transporteur 1',
    nomChauffeur: 'Nom Chauffeur 1',
    numeroPlaque: 'Numero Plaque 1',
    signature: 'Signature 1',
    metadata: {
      name: 'Timesheet 1',
      description: 'Timesheet Description 1',
      createdBy: 'User 1',
      createdAt: '2021-10-01T00:00:00',
      updatedAt: '2021-10-01T00:00:00',
      status: 'Draft',
      statusUpdatedAt: '2021-10-01T00:00:00',
    },
  },
  {
    id: '2',
    client: 'Client 2',
    workLocation: 'Work Location 2',
    contractNumber: 'Contract Number 2',
    dateEntries: [
      {
        date: '2021-10-01',
        startTime: '08:00',
        endTime: '12:00',
        hours: '4',
      },
      {
        date: '2021-10-02',
        startTime: '08:00',
        endTime: '12:00',
        hours: '4',
      },
    ],
    totalHeuresSimple: '8',
    totalHeuresDouble: '0',
    totalVoyageSimple: '0',
    totalVoyageDouble: '0',   
    materialTransported: 'Material Transported 2',
    autresPrecisions: 'Autres Precisions 2',
    ejesCamion: 'Ejes Camion 2',
    numeroCamion: 'Numero Camion 2',
    transporteur: 'Transporteur 2',
    nomChauffeur: 'Nom Chauffeur 2',
    numeroPlaque: 'Numero Plaque 2',
    signature: 'Signature 2',
    metadata: {
      name: 'Timesheet 2',
      description: 'Timesheet Description 2',
      createdBy
      : 'User 2',     
      createdAt: '2021-10-02T00:00:00',
      updatedAt: '2021-10-02T00:00:00',
      status: 'Draft',
      statusUpdatedAt: '2021-10-02T00:00:00',
    },
  },
];
export interface DateEntry {
  date: string;
  startTime: string;
  endTime: string;
  hours: string;
}
export interface FormDataProps {
  client: string;
  workLocation: string;
  contractNumber: string;
  dateEntries: DateEntry[];
  totalHeuresSimple: string;
  totalHeuresDouble: string;
  totalVoyageSimple: string;
  totalVoyageDouble: string;
  materialTransported: string;
  autresPrecisions: string;
  ejesCamion: string;
  numeroCamion: string;
  transporteur: string;
  nomChauffeur: string;
  numeroPlaque: string;
  signature: string;
}
export interface TimesheetEntry {
  id: string;
  client: string;
  workLocation: string;
  contractNumber: string;
  dateEntries: DateEntry[];
  totalHeuresSimple: string;
  totalHeuresDouble: string;
  totalVoyageSimple: string;
  totalVoyageDouble: string;
  materialTransported: string;
  autresPrecisions: string;
  ejesCamion: string;
  numeroCamion: string;
  transporteur: string;
  nomChauffeur: string;
  numeroPlaque: string;
  signature: string;
  metadata: MetadataProps;
}
export interface MetadataProps {
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  statusUpdatedAt: string;
}
export interface TimesheetState {
  entries: TimesheetEntry[];
  loading: boolean;
  error: string | null;
}
export const initialState: TimesheetState = {
  entries:[],
  loading: false,
  error: null,
};

export const getEntries = createAsyncThunk(
  'getEntries',
  async (_, thunkApi) => {
    try {
      const response = await getEntriesTimeSheetDB();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const handleSubmitForm = createAsyncThunk(
  'handleSubmitForm',
  async (data: TimesheetEntry, thunkApi) => {
    try {
      const response = await createEntryTimeSheetDB(data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<TimesheetEntry>) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<TimesheetEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    setEntries: (state, action: PayloadAction<TimesheetEntry[]>) => {
      state.entries = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleSubmitForm.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleSubmitForm.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      //  get the confirmation from the backend and update the state
    });
    builder.addCase(handleSubmitForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getEntries.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      console.log('Entries fetched:', action.payload);
      state.entries = action.payload;
    });
    builder.addCase(getEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
})

export const {
  addEntry,
  updateEntry,
  deleteEntry,
  setEntries,
  setLoading,
  setError,
} = timesheetSlice.actions;

// Selectors
export const selectAllEntries = (state: RootState) => state.timesheet.entries;
export const selectLoading = (state: RootState) => state.timesheet.loading;
export const selectError = (state: RootState) => state.timesheet.error;

export default timesheetSlice.reducer