'use client'

import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransportForm({ onSubmit }: { onSubmit: (formData: any) => void }) {
    const [formData, setFormData] = useState({
      client: '',
      chantier: '',
      sousTraitant: '',
      plaque: '',
      date: '',
      vehicleType: '12 roues',
      startTime: '',
      startAmPm: 'am',
      endTime: '',
      endAmPm: 'am',
      totalHeuresSimple: '',
      totalHeuresDouble: '',
      totalVoyageSimple: '',
      totalVoyageDouble: '',
      infoVoyage: '',
      acceptePar: '',
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    }
  
    return (
      <form onSubmit={handleSubmit} className="bg-yellow-100 p-6 max-w-2xl mx-auto font-sans">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-2"></div>
            <div>
              <h1 className="text-xl font-bold">MBLogix</h1>
              <p className="text-sm">Courtier en transport</p>
            </div>
          </div>
          <div className="text-red-600 text-sm">
            F0200.02.01 -5.75<br />
            .02 - 4
          </div>
        </div>
  
        <div className="text-sm mb-4">
          <p>269 Alfred-Messier, Terrebonne, J6W 5S2</p>
          <p>Tél.: 514 880-7913 | facturation.mblogix@outlook.com</p>
        </div>
  
        <div className="mb-4">
          <div className="flex mb-2">
            <label className="w-1/4">Client:</label>
            <input type="text" name="client" value={formData.client} onChange={handleChange} className="flex-grow border-b border-black bg-transparent" />
          </div>
          <div className="flex mb-2">
            <label className="w-1/4">Chantier:</label>
            <input type="text" name="chantier" value={formData.chantier} onChange={handleChange} className="flex-grow border-b border-black bg-transparent" />
          </div>
          <div className="flex mb-2">
            <label className="w-1/4">Sous-Traitant:</label>
            <input type="text" name="sousTraitant" value={formData.sousTraitant} onChange={handleChange} className="flex-grow border-b border-black bg-transparent" />
          </div>
          <div className="flex mb-2">
            <label className="w-1/4">Plaque:</label>
            <input type="text" name="plaque" value={formData.plaque} onChange={handleChange} className="flex-grow border-b border-black bg-transparent" />
            <label className="ml-4">Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-32 border-b border-black bg-transparent" />
          </div>
        </div>
  
        {/* Vehicle type checkboxes */}
        <div className="flex mb-4">
          {['12 roues', 'Semi 2 essieux', 'Semi 3 essieux', 'Semi 4 essieux'].map(type => (
            <label key={type} className="mr-4">
              <input
                type="checkbox"
                name="vehicleType"
                value={type}
                checked={formData.vehicleType === type}
                onChange={handleChange}
                className="mr-1"
              />
              {type}
            </label>
          ))}
        </div>
  
        {/* Time entry table */}
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left">De:</th>
              <th className="text-left">À:</th>
              <th className="text-right">HEURES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-20 border-b border-black bg-transparent" />
                <select name="startAmPm" value={formData.startAmPm} onChange={handleChange} className="bg-transparent">
                  <option value="am">a.m.</option>
                  <option value="pm">p.m.</option>
                </select>
              </td>
              <td>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-20 border-b border-black bg-transparent" />
                <select name="endAmPm" value={formData.endAmPm} onChange={handleChange} className="bg-transparent">
                  <option value="am">a.m.</option>
                  <option value="pm">p.m.</option>
                </select>
              </td>
              <td className="text-right">{/* Calculate hours */}</td>
            </tr>
          </tbody>
        </table>
  
        {/* Totals section */}
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <div className="flex justify-between mb-2">
              <span>TOTAL HEURES SIMPLE</span>
              <input type="text" name="totalHeuresSimple" value={formData.totalHeuresSimple} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
            </div>
            <div className="flex justify-between mb-2">
              <span>TOTAL HEURES DOUBLE</span>
              <input type="text" name="totalHeuresDouble" value={formData.totalHeuresDouble} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
            </div>
            <div className="flex justify-between mb-2">
              <span>TOTAL VOYAGE SIMPLE</span>
              <input type="text" name="totalVoyageSimple" value={formData.totalVoyageSimple} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
            </div>
            <div className="flex justify-between">
              <span>TOTAL VOYAGE DOUBLE</span>
              <input type="text" name="totalVoyageDouble" value={formData.totalVoyageDouble} onChange={handleChange} className="w-16 border-b border-black bg-transparent" />
            </div>
          </div>
          <div className="w-1/3 bg-gray-200 p-2">
            <div className="text-center mb-2">TOTAL HRS JOURNÉE</div>
            <div className="text-center text-3xl font-bold">{/* Calculate total hours */}</div>
            <div className="text-center">HRS</div>
          </div>
        </div>
  
        <div className="mb-4">
          <label>Info voyage:</label>
          <input type="text" name="infoVoyage" value={formData.infoVoyage} onChange={handleChange} className="w-full border-b border-black bg-transparent" />
        </div>
  
        <div className="flex justify-between items-center">
          <div>
            <label className="mr-2">Accepté par:</label>
            <input type="text" name="acceptePar" value={formData.acceptePar} onChange={handleChange} className="w-8 border-b border-black bg-transparent" />
          </div>
          <div className="text-2xl font-bold">No 12662</div>
        </div>
  
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Submit Form
        </button>
      </form>
    )
  }