
import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateEntry {
  date: string;
  startTime: string;
  endTime: string;
  hours: string;
}

interface FormState {
    form: FormDataProps| any
}

interface FormDataProps {
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

const initialState: FormState = {
    form: {}
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    SET_FORM_DATA: (state, action: PayloadAction<any>) => {
        state.form = action.payload;
    },
    UPDATE_FIELD: (state, action: PayloadAction<{ name: string; value: string }>) => {
        const { name, value } = action.payload;
        state.form[name] = value;
    },
    UPDATE_DATE_ENTRY: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
        const { index, field, value } = action.payload;
        state.form.dateEntries[index][field] = value;
    },
    ADD_DATE_ENTRY: (state) => {
        state.form.dateEntries.push({ date: '', startTime: '', endTime: '', hours: '' });
    },
  },
});

export const { 
    UPDATE_FIELD, 
    UPDATE_DATE_ENTRY, 
    ADD_DATE_ENTRY,
    SET_FORM_DATA
} = formSlice.actions;

export const selectForm = (state: RootState) => state.form.form;

export default formSlice.reducer;