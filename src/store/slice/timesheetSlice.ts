import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'; // Adjust this import based on your store setup
import { 
  createEntryTimeSheetDB, 
  deleteEntryTimeSheetDB, 
  getEntriesTimeSheetDB 
} from '@/lib/actions';
export interface DateEntry {
  date: string;
  startTime: string;
  endTime: string;
  hours: string;
}
export interface FormDataProps {
  id: string;
  userId: string;
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
  userId: string;
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
export const deleteEntry = createAsyncThunk(
  'timesheet/deleteEntry',
  async (id: string, thunkAPI) => {
    try {
      await deleteEntryTimeSheetDB(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
    SET_DOCUMENT_NAME: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.entries = state.entries.map(entry => {
        if (entry.id === action.payload.id) {
          return {
            ...entry,
            metadata: {
              ...entry.metadata,
              name: action.payload.name
            }
          };
        }
        return entry;
      });
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
      console.log('handleSubmitForm.fulfilled Entry created:', action.payload);
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
    builder
    .addCase(deleteEntry.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteEntry.fulfilled, (state, action) => {
      state.loading = false;
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    })
    .addCase(deleteEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
})

export const {
  addEntry,
  updateEntry,
  setEntries,
  setLoading,
  setError,
  SET_DOCUMENT_NAME
} = timesheetSlice.actions;

// Selectors
export const selectAllEntries = (state: RootState) => state.timesheet.entries;
export const selectEntryById = (state: RootState, id: string) => state.timesheet.entries.find(entry => entry.id === id);
export const selectLoading = (state: RootState) => state.timesheet.loading;
export const selectError = (state: RootState) => state.timesheet.error;

export default timesheetSlice.reducer