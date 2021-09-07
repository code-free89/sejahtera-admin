import FCInput from 'components/Input/fc-input';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Button from 'components/Button';
import { toast } from 'react-toast';

const StatesSection: React.FC = () => {
  const db = firebase.firestore();

  const [image, setImage] = useState<FileList | null>();
  const [fileName, setFileName] = useState<string>('');

  const [date, setDate] = useState<string>('');
  const storage = firebase.storage();

  const updateStatisticsData = async () => {
    const data = (await db.collection('statistics').doc('states').get()).data() as firebase.firestore.DocumentData;
    setDate(data.date);
  };

  const onSave = async () => {
    try {
      const data = (await db.collection('statistics').doc('states').get()).data() as firebase.firestore.DocumentData;
      data.date = date;
      await db.collection('statistics').doc('states').set(data);
      toast.success('Statistics updated successfully');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    upload();
  }, [image]);

  useEffect(() => {
    updateStatisticsData();
  }, []);

  const upload = () => {
    if (image) {
      if (image[0] == null) return;
      storage.ref(`/statistics/${fileName}.png`).put(image[0]);
    }
  };

  return (
    <div className="w-full pb-8">
      <div className="text-xl text-blue-600 font-bold text-center">States</div>
      <FCInput value={date} onChange={setDate} label="Date : " />
      <div className="text-base text-gray-600 font-bold my-3">Cases by States : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('caseStates');
          setImage(e.target.files);
        }}
      />
      <div className="text-base text-gray-600 font-bold my-3">Cases in West Malaysia : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('caseWest');
          setImage(e.target.files);
        }}
      />

      <div className="text-base text-gray-600 font-bold my-3">Cases in East Malaysia : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('caseEast');
          setImage(e.target.files);
        }}
      />

      <div className="text-base text-gray-600 font-bold my-3">Cases Overview : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('caseOverview');
          setImage(e.target.files);
        }}
      />

      <Button
        type="button"
        className="w-full mt-3 bg-green-500 hover:bg-green-600 transition-colors duration-300"
        onClick={onSave}
      >
        Save
      </Button>
    </div>
  );
};

export default StatesSection;
