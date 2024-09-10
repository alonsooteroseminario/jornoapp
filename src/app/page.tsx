'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEntry } from '@/store/timesheetSlice'
import type { RootState, AppDispatch } from '@/lib/store'

export default function Home() {
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const entries = useSelector((state: RootState) => state.timesheet.entries)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addEntry({ date, hours: parseFloat(hours) }))
    setDate('')
    setHours('')
  }

  return (
    <main className="container mx-auto p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Camion Driver Timesheet</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="date" className="block">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-1 text-black bg-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="hours" className="block">Hours Worked:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            step="0.5"
            min="0"
            max="24"
            className="border p-1 text-black bg-white"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Entry
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">Entries:</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index} className="mb-1">
              {entry.date}: {entry.hours} hours
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}