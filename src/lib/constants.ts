import { TimesheetEntry } from "@/store/slice/timesheetSlice";

export const mockEntries: TimesheetEntry[] = [
    {
      id: '1',
      userId: '1',
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
      userId: '1',
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