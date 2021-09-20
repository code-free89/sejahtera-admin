import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'components/Button';
import firebase from 'firebase';
import { toast } from 'react-toast';

type Props = {
  isOpen: boolean;
  closeModal: (value: boolean) => void;
  vaccineId: string;
  type: string;
};

const db = firebase.firestore();

const EditVaccine: React.FC<Props> = ({ isOpen, closeModal, vaccineId, type }) => {
  const [vaccineName, setVaccineName] = useState('');
  const [vaccineBatch, setVaccineBatch] = useState('');
  const [vaccineManufacturer, setVaccineManufacturer] = useState('');
  const [vaccineFacility, setVaccineFacility] = useState('');

  const updateVaccineData = async () => {
    if (vaccineId !== '') {
      const vaccineData = await db.collection('vaccines').doc(vaccineId).get();
      if (vaccineData) {
        setVaccineName(vaccineData.id);
        setVaccineBatch(vaccineData.data()!.batch);
        setVaccineManufacturer(vaccineData.data()!.manufacturer);
        setVaccineFacility(vaccineData.data()!.facility);
      }
    }
  };

  const onSave = async () => {
    try {
      if (type === 'create')
        await db
          .collection('vaccines')
          .doc(vaccineName)
          .set({ batch: vaccineBatch, manufacturer: vaccineManufacturer, facility: vaccineFacility });
      else {
        const vaccineData = (
          await db.collection('vaccines').doc(vaccineName).get()
        ).data() as firebase.firestore.DocumentData;
        vaccineData.batch = vaccineBatch;
        vaccineData.manufacturer = vaccineManufacturer;
        vaccineData.facility = vaccineFacility;
        await db.collection('vaccines').doc(vaccineName).set(vaccineData);
      }
    } catch (e: any) {
      toast.warn(e.message);
    }
    closeModal(false);
  };

  useEffect(() => {
    setVaccineName('');
    setVaccineBatch('');
    setVaccineManufacturer('');
    if (type === 'edit') updateVaccineData();
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Vaccine
                </Dialog.Title>
                <div className="mt-8">
                  <div className="text-base text-gray-600 font-bold my-3">Name : </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled={type === 'edit'}
                    value={vaccineName}
                    onChange={e => {
                      setVaccineName(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Manufacturer : </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={vaccineManufacturer}
                    onChange={e => {
                      setVaccineManufacturer(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Facility : </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={vaccineFacility}
                    onChange={e => {
                      setVaccineFacility(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Batch : </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={vaccineBatch}
                    onChange={e => {
                      setVaccineBatch(e.target.value);
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

export default EditVaccine;
