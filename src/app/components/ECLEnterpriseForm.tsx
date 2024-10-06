'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SET_FORM_DATA } from '@/store/slice/formSlice';
import { useRouter } from 'next/navigation';
import { 
  useUser,
} from '@clerk/nextjs'
import React, { useEffect, useState } from 'react';
import { 
  FormDataProps, 
  handleSubmitForm, 
  MetadataProps, 
  selectEntryById, 
  TimesheetEntry 
} from '@/store/slice/timesheetSlice';
import { fixInvalidObjectId } from '@/lib/utils';
interface ECLEnterpriseFormProps {
  documentId: string;
}

export const ECLEnterpriseForm: React.FC<ECLEnterpriseFormProps> = ({ documentId }) => {
  const clerkUser: any = useUser()
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { 
    form 
  } = useAppSelector(state => state.form);
  const { 
    id: clerkId,
    email,
    firstName,
    lastName,
    role,
    profile
  } = useAppSelector(state => state.user);

  const [documentName, setDocumentName] = useState('Untitled Document');
  const [uniqueId, setUniqueId] = useState('');
  const [formData, setFormData] = useState<FormDataProps>({
    id: fixInvalidObjectId(documentId),
    userId: clerkId,
    client: form?.client || '',
    workLocation: form?.workLocation || '',
    contractNumber: form?.contractNumber || '',
    dateEntries: form?.dateEntries || [{ date: '', startTime: '', endTime: '', hours: '' }],
    totalHeuresSimple: form?.totalHeuresSimple || '',
    totalHeuresDouble: form?.totalHeuresDouble || '',
    totalVoyageSimple: form?.totalVoyageSimple || '',
    totalVoyageDouble: form?.totalVoyageDouble || '',
    materialTransported: form?.materialTransported || '',
    autresPrecisions: form?.autresPrecisions || '',
    ejesCamion: form?.ejesCamion || '',
    numeroCamion: form?.numeroCamion || '',
    transporteur: form?.transporteur || '',
    nomChauffeur: form?.nomChauffeur || '',
    numeroPlaque: form?.numeroPlaque || '',
    signature: form?.signature || '',
  });


  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        console.log('Path:', path);
        const parts = path.split('/');
        const id = parts[parts.length - 1];
        console.log('id: ', id);
  
        // if path is /new, then we are creating a new document
        if (id === 'new') {
          console.log('Creating a new document');
  
          // submit timesheet with name untitle and empty fields
          const timeSheet: TimesheetEntry = {
            id: fixInvalidObjectId(documentId),
            userId: clerkId,
            client: formData?.client,
            workLocation: formData?.workLocation,
            contractNumber: formData?.contractNumber,
            dateEntries: formData?.dateEntries,
            totalHeuresSimple: formData?.totalHeuresSimple,
            totalHeuresDouble: formData?.totalHeuresDouble,
            totalVoyageSimple: formData?.totalVoyageSimple,
            totalVoyageDouble: formData?.totalVoyageDouble,
            materialTransported: formData?.materialTransported,
            autresPrecisions: formData?.autresPrecisions,
            ejesCamion: formData?.ejesCamion,
            numeroCamion: formData?.numeroCamion,
            transporteur: formData?.transporteur,
            nomChauffeur: formData?.nomChauffeur,
            numeroPlaque: formData?.numeroPlaque,
            signature: formData?.signature,
            metadata: {
              name: documentName,
              description: '',
              createdBy: clerkUser.fullName,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              status: 'Draft',
              statusUpdatedAt: new Date().toISOString(),
            },
          }
          const resultAction = dispatch(handleSubmitForm(timeSheet)).unwrap();
          console.log('Created timesheet succesfull:', resultAction);
        } else {
          console.log('Fetching document:', id);
          setUniqueId(id);
        }
  
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(!clerkUser) {
      console.log('No user found', clerkUser);
      router.push('/sign-in');
    }
  }, [clerkUser, router]);
  useEffect(() => {
    dispatch(SET_FORM_DATA(formData));
  }, [dispatch, formData]);
  useEffect(() => {
    if(uniqueId !==``) {
        console.log('uniqueId:', uniqueId);
    }
  }, [uniqueId]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData : any) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleDateEntryChange = (index: number, field: string, value: string) => {
    const newDateEntries = formData.dateEntries.map((entry: any, i: any) => {
      if (i === index) {
        return { ...entry, [field]: value };
      }
      return entry;
    });
    setFormData((prevData : any) => ({
      ...prevData,
      dateEntries: newDateEntries
    }));
  };
  const addDateEntry = () => {
    setFormData((prevData : any) => ({
      ...prevData,
      dateEntries: [...prevData?.dateEntries, { date: '', startTime: '', endTime: '', hours: '' }]
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      // Dispatch the handleSubmitForm action
      const timeSheet: TimesheetEntry = {
        id: documentId,
        userId: clerkUser.id,
        client: formData?.client,
        workLocation: formData?.workLocation,
        contractNumber: formData?.contractNumber,
        dateEntries: formData?.dateEntries,
        totalHeuresSimple: formData?.totalHeuresSimple,
        totalHeuresDouble: formData?.totalHeuresDouble,
        totalVoyageSimple: formData?.totalVoyageSimple,
        totalVoyageDouble: formData?.totalVoyageDouble,
        materialTransported: formData?.materialTransported,
        autresPrecisions: formData?.autresPrecisions,
        ejesCamion: formData?.ejesCamion,
        numeroCamion: formData?.numeroCamion,
        transporteur: formData?.transporteur,
        nomChauffeur: formData?.nomChauffeur,
        numeroPlaque: formData?.numeroPlaque,
        signature: formData?.signature,
        metadata: {
          name: documentName,
          description: '',
          createdBy: clerkUser.fullName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'Draft',
          statusUpdatedAt: new Date().toISOString(),
        },
      }
      const resultAction = await dispatch(handleSubmitForm(timeSheet)).unwrap();
      console.log('Form submission successful:', resultAction);
      router.push('/documents');

    } catch (error) {
      console.error('Failed to submit form:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const WatermarkTag = () => (
    <div className="">
      <p className="text-[9px] text-pink-600 font-semibold">Unique ID: {uniqueId}</p>
    </div>
  );
  return (
    <div className="text-pink-600 max-w-4xl mx-auto p-8 bg-pink-100 shadow-lg rounded-lg border-2 border-pink-300" style={{ fontFamily: 'Arial, sans-serif' }}>
      
        <div className="text-center mb-6 border-b-2 border-pink-300 pb-4">
            <h1 className="text-3xl font-bold text-pink-800">ECL ENTREPRISE</h1>
            <p className="text-sm text-pink-600">7230 rue l&apos;Archeveque, porte 6</p>
            <p className="text-sm text-pink-600">Montreal QC H1K 2K3</p>
            <p className="text-sm text-pink-600">T: 514 649-9430</p>
        </div>
        <div className='absolute top-32'>
            <WatermarkTag />
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-pink-700">CLIENT</label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData?.client}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="workLocation" className="block text-sm font-medium text-pink-700">LIEU DE TRAVAIL</label>
            <input
              type="text"
              id="workLocation"
              name="workLocation"
              value={formData?.workLocation}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contractNumber" className="block text-sm font-medium text-pink-700">NUMÉRO DE CONTRAT</label>
          <input
            type="text"
            id="contractNumber"
            name="contractNumber"
            value={formData?.contractNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
          />
        </div>
        
        {/* Date Entries Table */}
        <div className="mt-6">
          <table className="min-w-full border border-pink-300">
            <thead className="bg-pink-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider border-r border-pink-300">DATE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider border-r border-pink-300">DE</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider border-r border-pink-300">À</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">HRS</th>
              </tr>
            </thead>
            <tbody>
              {formData?.dateEntries?.map((entry: any, index: any) => (
                <tr key={index} className="border-b border-pink-300">
                  <td className="px-4 py-2 border-r border-pink-300">
                    <input
                      type="date"
                      value={entry.date}
                      onChange={(e) => handleDateEntryChange(index, 'date', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2 border-r border-pink-300">
                    <input
                      type="time"
                      value={entry.startTime}
                      onChange={(e) => handleDateEntryChange(index, 'startTime', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2 border-r border-pink-300">
                    <input
                      type="time"
                      value={entry.endTime}
                      onChange={(e) => handleDateEntryChange(index, 'endTime', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={entry.hours}
                      onChange={(e) => handleDateEntryChange(index, 'hours', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addDateEntry}
            className="mt-2 text-sm text-pink-600 hover:text-pink-800"
          >
            + Ajouter une entrée
          </button>
        </div>

        {/* Double Hours Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalHeuresSimple" className="block text-sm font-medium text-pink-700">TOTAL HEURES SIMPLE</label>
            <input
              type="number"
              id="totalHeuresSimple"
              name="totalHeuresSimple"
              value={formData?.totalHeuresSimple}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="totalHeuresDouble" className="block text-sm font-medium text-pink-700">TOTAL HEURES DOUBLE</label>
            <input
              type="number"
              id="totalHeuresDouble"
              name="totalHeuresDouble"
              value={formData?.totalHeuresDouble}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalVoyageSimple" className="block text-sm font-medium text-pink-700">TOTAL VOYAGE SIMPLE</label>
            <input
              type="number"
              id="totalVoyageSimple"
              name="totalVoyageSimple"
              value={formData?.totalVoyageSimple}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="totalVoyageDouble" className="block text-sm font-medium text-pink-700">TOTAL VOYAGE DOUBLE</label>
            <input
              type="number"
              id="totalVoyageDouble"
              name="totalVoyageDouble"
              value={formData?.totalVoyageDouble}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>

        {/* Material Transported and New Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="materialTransported" className="block text-sm font-medium text-pink-700">MATÉRIEL TRANSPORTÉ</label>
            <input
              type="text"
              id="materialTransported"
              name="materialTransported"
              value={formData?.materialTransported}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="autresPrecisions" className="block text-sm font-medium text-pink-700">AUTRES PRÉCISIONS</label>
            <input
              type="text"
              id="autresPrecisions"
              name="autresPrecisions"
              value={formData?.autresPrecisions}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ejesCamion" className="block text-sm font-medium text-pink-700">ESSIEUX DU CAMION</label>
            <input
              type="text"
              id="ejesCamion"
              name="ejesCamion"
              value={formData?.ejesCamion}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="numeroCamion" className="block text-sm font-medium text-pink-700">Nº CAMION</label>
            <input
              type="text"
              id="numeroCamion"
              name="numeroCamion"
              value={formData?.numeroCamion}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="transporteur" className="block text-sm font-medium text-pink-700">TRANSPORTEUR</label>
            <input
              type="text"
              id="transporteur"
              name="transporteur"
              value={formData?.transporteur}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="nomChauffeur" className="block text-sm font-medium text-pink-700">NOM DU CHAUFFEUR</label>
            <input
              type="text"
              id="nomChauffeur"
              name="nomChauffeur"
              value={formData?.nomChauffeur}
              onChange={handleInputChange}
              className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            />
          </div>
        </div>
        <div>
          <label htmlFor="numeroPlaque" className="block text-sm font-medium text-pink-700">NUMÉRO DE PLAQUE</label>
          <input
            type="text"
            id="numeroPlaque"
            name="numeroPlaque"
            value={formData?.numeroPlaque}
            onChange={handleInputChange}
            className="mt-1 block w-full border-b border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
          />
        </div>

        <div>
          <label htmlFor="signature" className="block text-sm font-medium text-pink-700">SIGNATURE</label>
          <input
            type="text"
            id="signature"
            name="signature"
            value={formData?.signature}
            onChange={handleInputChange}
            className="mt-1 block w-full border-b-2 border-pink-300 bg-transparent focus:border-pink-500 focus:ring-0"
            placeholder="Tapez votre nom pour signer"
          />
        </div>
        <div className="text-right mt-6">
          <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};