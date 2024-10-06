import { ShareTimesheetEntry } from "@/lib/types";
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
        const response = await axios.post('/api/timesheet', data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteEntryTimeSheetDB(id: string) {
    try {
      const response = await axios.delete(`/api/timesheet/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  export async function updateEntryTimeSheetDB(data: Partial<TimesheetEntry>) {
    try {
      const response = await axios.put(`/api/timesheet/${data.id}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


  // export async function shareTimesheetEntry({timesheetId, emailToShare}:ShareTimesheetEntry) {
  //   try {
  //     const response = await axios.put('/api/timesheet/share', { timesheetId, emailToShare });
  //     return response;
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }