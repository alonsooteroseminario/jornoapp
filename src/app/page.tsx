'use client'

import { useDispatch, useSelector } from 'react-redux'
import { addEntry, TimesheetEntry } from '@/store/timesheetSlice'
import type { RootState, AppDispatch } from '@/store/store'
import { TransportForm } from './components/TransportForm'
import TransportInvoice from './components/TransportInvoice'

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

  // Sample data for the TransportInvoice component
  const sampleInvoiceData = {
    date: '29-08-24',
    driver: 'S. BREARD',
    client: 'POMERLEAU',
    site: 'JOB 23 0040 5RB PIE-IX',
    plate: '964210',
    unit: '23-20',
    vehicleType: '12 roues' as const,
    timeEntries: [
      { from: '07:30', to: '12:00', hours: '4 1/2' },
      { from: '12:30', to: '15:00', hours: '2 1/2' },
    ],
    totalHours: '7.00',
    invoiceNumber: '13906',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Camion Driver Timesheet</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">New Entry</h2>
          <TransportForm onSubmit={handleFormSubmit} />
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Entries</h2>
          <ul className="divide-y divide-gray-200">
            {entries.map((entry, index) => (
              <li key={index} className="py-3">
                <p className="text-lg">{entry.date}: <span className="font-semibold">{entry.hours.toFixed(2)} hours</span></p>
                <p className="text-gray-600">{entry.client} - {entry.chantier}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sample Invoice</h2>
          <TransportInvoice {...sampleInvoiceData} />
        </section>
      </main>
    </div>
  )
}