import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DigitalCertificate: React.FC = () => {
  const db = firebase.firestore();
  const params = useParams<{ userId: string; vaccineId: string }>();

  const [name, setName] = useState<string>('');
  const [passportNo, setPassportNo] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [batchNo, setBatchNo] = useState<string>('');
  const [medicalOffer, setMedicalOffer] = useState<string>('');

  const getCertificateData = async () => {
    console.log(params.userId);
    const data = (await db.collection('users').doc(params.userId).get()).data();
    setName(data!.name);
    setPassportNo(data!.passportNo);
    if (params.vaccineId === '1') {
      setDate(data!.dose1_date.toString().split(' ')[0].replaceAll('-', ' '));
      const vaccine = data!.dose1;
      const vaccineData = (await db.collection('vaccines').doc(vaccine).get()).data();
      setLocation(vaccineData!.facility);
      setManufacturer(vaccineData!.manufacturer);
      setBatchNo(vaccineData!.batch);
    } else if (params.vaccineId === '2') {
      setDate(data!.dose2_date.toString().split(' ')[0].replaceAll('-', ' '));
      const vaccine = data!.dose2;
      const vaccineData = (await db.collection('vaccines').doc(vaccine).get()).data();
      setLocation(vaccineData!.facility);
      setManufacturer(vaccineData!.manufacturer);
      setBatchNo(vaccineData!.batch);
    }
  };

  useEffect(() => {
    getCertificateData();
  }, []);

  return name !== '' ? (
    <div className="bg-primary w-screen h-screen px-5 py-2 overflow-y-auto">
      <img alt="logo" src="/assets/images/mosti.png" className="h-16 mx-auto" />
      <div className="text-2xl mt-4 font-bold w-full text-center">Certificate of Vaccination</div>
      <div className="text-center font-semibold mt-12">This is to certify that</div>
      <div className="mx-auto border-2 border-black rounded-md w-max p-4 mt-4">
        <div className="text-center text-2xl font-semibold">{name.toUpperCase()}</div>
        <div className="text-center font-semibold">{passportNo}</div>
      </div>
      <div className="mt-8 text-center px-4 pb-4 border-b border-black">
        has on the date been vaccinated in accordance with the international health regulations
      </div>
      <div className="bg-secondary rounded-lg shadow-lg px-4 py-3 mt-8">
        <div className="text-right font-bold text-xl">{date}</div>
        <div className="text-gray-600 text-lg font-semibold mt-3">Location:</div>
        <div className="text-gray-500 text-lg">{location}</div>
        <div className="text-gray-600 text-lg font-semibold mt-3">Manufacturer:</div>
        <div className="text-gray-500 text-lg">{manufacturer}</div>
        <div className="text-gray-600 text-lg font-semibold mt-3">Batch No:</div>
        <div className="text-gray-500 text-lg">{batchNo}</div>
        <div className="text-gray-600 text-lg font-semibold mt-3">Medical Officer:</div>
        <div className="text-gray-500 text-lg">Haravind</div>
        <div className="flex justify-end mb-4">
          <img alt="qr" src="/assets/images/qr-medium.png" width={40} height={40} />
        </div>
      </div>
    </div>
  ) : null;
};

export default DigitalCertificate;
