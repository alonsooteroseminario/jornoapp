import { TimesheetEntry } from "@/store/slice/timesheetSlice";
import axios from "axios";

export async function getEntriesTimeSheetDB() {
    try {
        const response = await axios.get('/api/timesheet');
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createEntryTimeSheetDB(data: TimesheetEntry) {
    try {
        console.log('createEntryTimeSheetDB data:', data);
        const response = await axios.post('/api/timesheet', data);
        console.log('createEntryTimeSheetDB response:', response);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}