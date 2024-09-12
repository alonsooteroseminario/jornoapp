import React from 'react';

interface TransportInvoiceProps {
  date: string;
  driver: string;
  client: string;
  site: string;
  plate: string;
  unit: string;
  vehicleType: '12 roues' | 'Semi 2 essieux' | 'Semi 3 essieux' | 'Semi 4 essieux' | 'Pick-up';
  timeEntries: Array<{
    from: string;
    to: string;
    hours: string;
  }>;
  totalHours: string;
  invoiceNumber: string;
}

const TransportInvoice: React.FC<TransportInvoiceProps> = ({
  date,
  driver,
  client,
  site,
  plate,
  unit,
  vehicleType,
  timeEntries,
  totalHours,
  invoiceNumber
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-8">
      <div className="bg-gray-800 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">S Racine TRANSPORT</h2>
          <div className="text-sm text-right">
            <p>40 rue Gélinas, Laval, Qc H7M 2Z5</p>
            <p>Répartiteur: 514.791.6911 | Bureau: 450.629.6911</p>
            <p>Cell: 514.241.4409 | info@transportracine.com</p>
            <p>9217-7450 Québec inc.</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <p><span className="font-semibold">DATE:</span> {date}</p>
            <p><span className="font-semibold">CHAUFFEUR:</span> {driver}</p>
            <p><span className="font-semibold">LOUÉ À:</span> {client}</p>
            <p><span className="font-semibold">CHANTIER:</span> {site}</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-semibold">PLAQUE:</span> {plate}</p>
            <p><span className="font-semibold">UNITÉ #:</span> {unit}</p>
            <p><span className="font-semibold">TYPE DE VÉHICULE:</span> {vehicleType}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">DESCRIPTION</th>
                <th className="p-2 border">DE</th>
                <th className="p-2 border">À</th>
                <th className="p-2 border">HEURES</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-2 border">{index === 0 ? 'Travail régulier' : ''}</td>
                  <td className="p-2 border text-center">{entry.from}</td>
                  <td className="p-2 border text-center">{entry.to}</td>
                  <td className="p-2 border text-center">{entry.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-lg"><span className="font-semibold">TOTAL HEURES:</span> {totalHours}</p>
          <p className="text-lg"><span className="font-semibold">NO. FACTURE:</span> {invoiceNumber}</p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">Signature du client: _________________________</p>
        </div>
      </div>
    </div>
  );
};

export default TransportInvoice;