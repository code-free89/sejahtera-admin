import FCInput from 'components/Input/fc-input';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Button from 'components/Button';
import { toast } from 'react-toast';

const UpdateSection: React.FC = () => {
  const db = firebase.firestore();

  const [rvalue, setRvalue] = useState<string>('');
  const [image, setImage] = useState<FileList | null>();
  const [fileName, setFileName] = useState<string>('');

  const [date, setDate] = useState<string>('');
  const [confirmCase, setConfirmCase] = useState<string>('');
  const [todayConfirmCases, setTodayConfirmCases] = useState<string>('');
  const [recovered, setRecovered] = useState<string>('');
  const [todayRecovered, setTodayRecovered] = useState<string>('');
  const [death, setDeath] = useState<string>('');
  const [todayDeath, setTodayDeath] = useState<string>('');
  const [activeCase, setActiveCase] = useState<string>('');
  const [todayActiveCases, setTodayActiveCases] = useState<string>('');
  const storage = firebase.storage();

  const updateStatisticsData = async () => {
    const data = (await db.collection('statistics').doc('update').get()).data() as UpdateStatistics;
    setRvalue(data.rValue);
    setDate(data.date);
    setConfirmCase(data.confirmCase);
    setTodayConfirmCases(data.todayConfirmCases);
    setRecovered(data.recovered);
    setTodayRecovered(data.todayRecovered);
    setDeath(data.death);
    setTodayDeath(data.todayDeath);
    setActiveCase(data.activeCase);
    setTodayActiveCases(data.todayActiveCases);
  };

  const onSave = async () => {
    try {
      const data = (await db.collection('statistics').doc('update').get()).data() as firebase.firestore.DocumentData;
      data.rValue = rvalue;
      data.date = date;
      data.confirmCase = confirmCase;
      data.todayConfirmCases = todayConfirmCases;
      data.recovered = recovered;
      data.todayRecovered = todayRecovered;
      data.death = death;
      data.todayDeath = todayDeath;
      data.activeCase = activeCase;
      data.todayActiveCases = todayActiveCases;
      await db.collection('statistics').doc('update').set(data);
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
      <div className="text-xl text-green-600 font-bold text-center">Update</div>
      <FCInput value={rvalue} onChange={setRvalue} label="Nilai R(R Value) : " />
      <FCInput value={date} onChange={setDate} label="Date : " />
      <FCInput value={confirmCase} onChange={setConfirmCase} label="ConfirmCase : " />
      <FCInput value={todayConfirmCases} onChange={setTodayConfirmCases} label="TodayConfirmCases : " />
      <FCInput value={recovered} onChange={setRecovered} label="Recovered : " />
      <FCInput value={todayRecovered} onChange={setTodayRecovered} label="Today Recovered : " />
      <FCInput value={death} onChange={setTodayDeath} label="Death : " />
      <FCInput value={todayDeath} onChange={setTodayDeath} label="Today Death : " />
      <FCInput value={activeCase} onChange={setActiveCase} label="Active Cases : " />
      <FCInput value={todayActiveCases} onChange={setTodayActiveCases} label="Today Active Cases : " />
      <div className="text-base text-gray-600 font-bold my-3">Weekly Statistics : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('weeklyStatistics');
          setImage(e.target.files);
        }}
      />
      <div className="text-base text-gray-600 font-bold my-3">Active Cases Trend : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('activeCaseTrend');
          setImage(e.target.files);
        }}
      />

      <div className="text-base text-gray-600 font-bold my-3">Weekly Trend : </div>
      <input
        type="file"
        onChange={e => {
          setFileName('weeklyTrend');
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

export default UpdateSection;
