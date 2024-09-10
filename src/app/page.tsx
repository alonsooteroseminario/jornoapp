'use client'

import { useDispatch, useSelector } from 'react-redux'
import { addEntry, TimesheetEntry } from '@/store/timesheetSlice'
import type { RootState, AppDispatch } from '@/store/store'
import { TransportForm } from './components/TransportForm'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const entries = useSelector((state: RootState) => state.timesheet.entries)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (formData: any) => {
    // Calculate total hours worked
    const startTime = new Date(`2000-01-01 ${formData.startTime} ${formData.startAmPm.toUpperCase()}`)
    const endTime = new Date(`2000-01-01 ${formData.endTime} ${formData.endAmPm.toUpperCase()}`)
    const hoursWorked = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

    const newEntry: TimesheetEntry = {
      date: formData.date,
      hours: hoursWorked,
      client: formData.client,
      chantier: formData.chantier,
      sousTraitant: formData.sousTraitant,
      plaque: formData.plaque,
      vehicleType: formData.vehicleType,
      totalHeuresSimple: formData.totalHeuresSimple,
      totalHeuresDouble: formData.totalHeuresDouble,
      totalVoyageSimple: formData.totalVoyageSimple,
      totalVoyageDouble: formData.totalVoyageDouble,
      infoVoyage: formData.infoVoyage,
      acceptePar: formData.acceptePar
    }

    dispatch(addEntry(newEntry))
  }

  return (
    <main className="container mx-auto p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Camion Driver Timesheet</h1>
      <TransportForm onSubmit={handleFormSubmit} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Entries:</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index} className="mb-1">
              {entry.date}: {entry.hours.toFixed(2)} hours - {entry.client} ({entry.chantier})
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}