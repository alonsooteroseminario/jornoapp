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
    <div className="bg-white p-4 shadow-md rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">S Racine TRANSPORT</h2>
        <div className="text-sm">
          <p>40 rue Gélinas</p>
          <p>Laval, Qc H7M 2Z5</p>
          <p>Répartiteur: 514.791.6911</p>
          <p>Bureau: 450.629.6911</p>
          <p>Cell: 514.241.4409</p>
          <p>9217-7450 Québec inc. | info@transportracine.com</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p><strong>DATE:</strong> {date}</p>
          <p><strong>CHAUFFEUR:</strong> {driver}</p>
          <p><strong>LOUÉ À:</strong> {client}</p>
          <p><strong>CHANTIER:</strong> {site}</p>
        </div>
        <div>
          <p><strong>PLAQUE:</strong> {plate}</p>
          <p><strong>UNITÉ #:</strong> {unit}</p>
          <p><strong>TYPE DE VÉHICULE:</strong> {vehicleType}</p>
        </div>
      </div>

      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left">DESCRIPTION</th>
            <th>DE</th>
            <th>À</th>
            <th>HEURES</th>
          </tr>
        </thead>
        <tbody>
          {timeEntries.map((entry, index) => (
            <tr key={index}>
              <td>{index === 0 ? 'Travail régulier' : ''}</td>
              <td className="text-center">{entry.from}</td>
              <td className="text-center">{entry.to}</td>
              <td className="text-center">{entry.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <p><strong>TOTAL HEURES:</strong> {totalHours}</p>
        <p><strong>NO. FACTURE:</strong> {invoiceNumber}</p>
      </div>

      <div className="mt-8 border-t pt-4">
        <p className="text-sm text-gray-600">Signature du client: _________________________</p>
      </div>
    </div>
  );
};

export default TransportInvoice;