import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import DropDown from 'components/Dropdown';
import Button from 'components/Button';
import firebase from 'firebase';
import { toast } from 'react-toast';
import { states } from '../../constants/index';

type Props = {
  isOpen: boolean;
  closeModal: (value: boolean) => void;
  userId: string;
  vaccines: string[];
};

const db = firebase.firestore();

const EditForm: React.FC<Props> = ({ isOpen, closeModal, vaccines, userId }) => {
  const [dose1, setDose1] = useState<string>('');
  const [dose2, setDose2] = useState<string>('');
  const [dose1Date, setDose1Date] = useState<string>('');
  const [dose2Date, setDose2Date] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [passport, setPassport] = useState<string>('');
  const [state, setState] = useState<string>('');

  const updateSelectedVaccine = async () => {
    if (userId !== '') {
      const userData = (await db.collection('users').doc(userId).get()).data() as firebase.firestore.DocumentData;
      if (userData) {
        setDose1(userData.dose1);
        setDose2(userData.dose2);
        setDose1Date(userData.dose1_date);
        setDose2Date(userData.dose2_date);
        setName(userData.name);
        setPassport(userData.passportNo);
        setState(userData.state);
      }
    }
  };

  const onSave = async () => {
    try {
      const userData = (await db.collection('users').doc(userId).get()).data() as firebase.firestore.DocumentData;
      userData.dose1 = dose1;
      userData.dose1_date = dose1Date;
      userData.dose2 = dose2;
      userData.dose2_date = dose2Date;
      userData.name = name;
      userData.passportNo = passport;
      userData.state = state;
      await db.collection('users').doc(userId).set(userData);
      closeModal(false);
      toast.success('User data updated successfully.');
    } catch (e: any) {
      toast.warn(e.message);
    }
  };

  useEffect(() => {
    updateSelectedVaccine();
  }, [isOpen]);

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Certificate
                </Dialog.Title>
                <div className="mt-8">
                  <div className="text-base text-gray-600 font-bold my-3">Name: </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Passport No: </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={passport}
                    onChange={e => {
                      setPassport(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">State: </div>
                  <DropDown selectedItem={state} setSelectedItem={setState} data={states} />
                  <div className="text-base text-gray-600 font-bold my-3">Dose 1: </div>
                  <DropDown selectedItem={dose1} setSelectedItem={setDose1} data={vaccines} />
                  <div className="text-base text-gray-600 font-bold my-3">Dose 1 Date: </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={dose1Date}
                    onChange={e => {
                      setDose1Date(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Dose 2: </div>
                  <DropDown selectedItem={dose2} setSelectedItem={setDose2} data={vaccines} />
                  <div className="text-base text-gray-600 font-bold my-3">Dose 2 Date: </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={dose2Date}
                    onChange={e => {
                      setDose2Date(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4 flex w-full items-center justify-around">
                  <Button
                    type="button"
                    className="bg-green-400 hover:bg-green-500 transition-colors duration-300 w-24"
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 transition-colors duration-300 w-24"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditForm;
