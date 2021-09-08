import FCInput from 'components/Input/fc-input';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Button from 'components/Button';
import { toast } from 'react-toast';

const GlobalSection: React.FC = () => {
  const db = firebase.firestore();

  const [image, setImage] = useState<FileList | null>();
  const [fileName, setFileName] = useState<string>('');

  const [date, setDate] = useState<string>('');
  const [worldConfirmed, setWorldConfirmed] = useState<string>('');
  const [worldConfirmedToday, setWorldConfirmedToday] = useState<string>('');
  const [worldRecovered, setWorldRecovered] = useState<string>('');
  const [worldRecoveredToday, setWorldRecoveredToday] = useState<string>('');
  const [worldDeath, setWorldDeath] = useState<string>('');
  const [worldDeathToday, setWorldDeathToday] = useState<string>('');
  const [activeCases, setActiveCases] = useState<string>('');
  const [activeCasesToday, setActiveCasesToday] = useState<string>('');
  const storage = firebase.storage();

  const updateStatisticsData = async () => {
    const data = (await db.collection('statistics').doc('global').get()).data() as firebase.firestore.DocumentData;
    setDate(data.date);
    setWorldConfirmed(data.confirmedCases);
    setWorldConfirmedToday(data.todayConfirmedCases);
    setWorldRecovered(data.recoveredCases);
    setWorldRecoveredToday(data.todayRecoveredCases);
    setWorldDeath(data.death);
    setWorldDeathToday(data.todayDeath);
    setActiveCases(data.activeCases);
    setActiveCasesToday(data.todayActiveCases);
  };

  const onSave = async () => {
    try {
      const data = (await db.collection('statistics').doc('global').get()).data() as firebase.firestore.DocumentData;
      data.date = date;
      data.confirmedCases = worldConfirmed;
      data.todayConfirmedCases = worldConfirmedToday;
      data.recoveredCases = worldRecovered;
      data.todayRecoveredCases = worldRecoveredToday;
      data.death = worldDeath;
      data.todayDeath = worldDeathToday;
      data.activeCase = activeCases;
      data.todayActiveCases = setActiveCases;
      await db.collection('statistics').doc('global').set(data);
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
      <div className="text-xl text-green-600 font-bold text-center">Global</div>
      <FCInput value={date} onChange={setDate} label="Date : " />
      <FCInput value={worldConfirmed} onChange={setWorldConfirmed} label="Total Confirmed : " />
      <FCInput value={worldConfirmedToday} onChange={setWorldConfirmedToday} label="Total Confirmed Today : " />
      <FCInput value={worldRecovered} onChange={setWorldRecovered} label="Total Recovered : " />
      <FCInput value={worldRecoveredToday} onChange={setWorldRecoveredToday} label="Total Recovered Today : " />
      <FCInput value={worldDeath} onChange={setWorldDeath} label="Total Death : " />
      <FCInput value={worldDeathToday} onChange={setWorldDeathToday} label="Total Death Today : " />
      <FCInput value={activeCases} onChange={setActiveCases} label="Active Cases : " />
      <FCInput value={activeCasesToday} onChange={setActiveCasesToday} label="Active Cases Today : " />
      <div className="text-base text-gray-600 font-bold my-3">Top Countries : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('topCountries');
          setImage(e.target.files);
        }}
      />
      <div className="text-base text-gray-600 font-bold my-3">ASEAN Statistics : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('aseanStatistics');
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

export default GlobalSection;
