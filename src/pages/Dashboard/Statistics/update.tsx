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
  const [totalConfirmed, setTotalConfirmed] = useState<string>('');
  const [totalConfirmedToday, setTotalConfirmedToday] = useState<string>('');
  const [totalRecovered, setTotalRecovered] = useState<string>('');
  const [totalRecoveredToday, setTotalRecoveredToday] = useState<string>('');
  const [totalDeath, setTotalDeath] = useState<string>('');
  const [totalDeathToday, setTotalDeathToday] = useState<string>('');
  const [activeCases, setActiveCases] = useState<string>('');
  const [activeCasesToday, setActiveCasesToday] = useState<string>('');
  const storage = firebase.storage();

  const updateStatisticsData = async () => {
    const data = (await db.collection('statistics').doc('update').get()).data() as firebase.firestore.DocumentData;
    setRvalue(data.rValue);
    setDate(data.date);
    setTotalConfirmed(data.confirmCase);
    setTotalConfirmedToday(data.todayConfirmCases);
    setTotalRecovered(data.recovered);
    setTotalRecoveredToday(data.todayRecovered);
    setTotalDeath(data.death);
    setTotalDeathToday(data.todayDeath);
    setActiveCases(data.activeCase);
    setActiveCasesToday(data.todayActiveCases);
  };

  const onSave = async () => {
    try {
      const data = (await db.collection('statistics').doc('update').get()).data() as firebase.firestore.DocumentData;
      data.rValue = rvalue;
      data.date = date;
      data.confirmCase = totalConfirmed;
      data.todayConfirmCases = totalConfirmedToday;
      data.recovered = totalRecovered;
      data.todayRecovered = totalRecoveredToday;
      data.death = totalDeath;
      data.todayDeath = totalDeathToday;
      data.activeCase = activeCases;
      data.todayActiveCases = activeCasesToday;
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
      <FCInput value={totalConfirmed} onChange={setTotalConfirmed} label="Total Confirmed : " />
      <FCInput value={totalConfirmedToday} onChange={setTotalConfirmedToday} label="Total Confirmed Today : " />
      <FCInput value={totalRecovered} onChange={setTotalRecovered} label="Total Recovered : " />
      <FCInput value={totalRecoveredToday} onChange={setTotalRecoveredToday} label="Total Recovered Today : " />
      <FCInput value={totalDeath} onChange={setTotalDeath} label="Total Death : " />
      <FCInput value={totalDeathToday} onChange={setTotalDeathToday} label="Total Death Today : " />
      <FCInput value={activeCases} onChange={setActiveCases} label="Active Cases : " />
      <FCInput value={activeCasesToday} onChange={setActiveCasesToday} label="Active Cases Today : " />
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
