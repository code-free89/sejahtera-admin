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
  const [confirmedCases, setConfirmedCases] = useState<string>('');
  const [todayConfirmedCases, setTodayConfirmedCases] = useState<string>('');
  const [recoveredCases, setRecoveredCases] = useState<string>('');
  const [todayRecoveredCases, setTodayRecoveredCases] = useState<string>('');
  const [death, setDeath] = useState<string>('');
  const [todayDeath, setTodayDeath] = useState<string>('');
  const [activeCases, setActiveCases] = useState<string>('');
  const [todayActiveCases, setTodayActiveCases] = useState<string>('');
  const storage = firebase.storage();

  const updateStatisticsData = async () => {
    const data = (await db.collection('statistics').doc('global').get()).data() as GlobalStatistics;
    console.log(data);
    setDate(data.date);
    setConfirmedCases(data.confirmedCases);
    setTodayConfirmedCases(data.todayConfirmedCases);
    setRecoveredCases(data.recoveredCases);
    setTodayRecoveredCases(data.todayRecoveredCases);
    setDeath(data.death);
    setTodayDeath(data.todayDeath);
    setActiveCases(data.activeCases);
    setTodayActiveCases(data.todayActiveCases);
  };

  const onSave = async () => {
    try {
      const data = (await db.collection('statistics').doc('global').get()).data() as GlobalStatistics;
      data.date = date;
      data.confirmedCases = confirmedCases;
      data.todayConfirmedCases = todayConfirmedCases;
      data.recoveredCases = recoveredCases;
      data.todayRecoveredCases = todayRecoveredCases;
      data.death = death;
      data.todayDeath = todayDeath;
      data.activeCases = activeCases;
      data.todayActiveCases = todayActiveCases;
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
      <FCInput value={confirmedCases} onChange={setConfirmedCases} label="Confirm Cases : " />
      <FCInput value={todayConfirmedCases} onChange={setTodayConfirmedCases} label="Today Confirmed Cases : " />
      <FCInput value={recoveredCases} onChange={setRecoveredCases} label="Recovered Cases : " />
      <FCInput value={todayRecoveredCases} onChange={setTodayRecoveredCases} label="Today Recovered Cases : " />
      <FCInput value={death} onChange={setDeath} label="Death : " />
      <FCInput value={todayDeath} onChange={setTodayDeath} label="Today Death : " />
      <FCInput value={activeCases} onChange={setActiveCases} label="Active Cases : " />
      <FCInput value={todayActiveCases} onChange={setTodayActiveCases} label="Today Active Cases : " />
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
