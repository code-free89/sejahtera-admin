import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import firebase from 'firebase';
import React, { Fragment, useState } from 'react';
import { toast } from 'react-toast';

export type Props = {
  isOpen: boolean;
  closeModal: (value: boolean) => void;
};

const AddUser: React.FC<Props> = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSave = async () => {
    try {
      const db = firebase.firestore();
      const userCredential: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(userCredential.user?.uid).set({
        address: '',
        age: 0,
        dose1: '',
        dose1_date: '',
        dose2: '',
        dose2_date: '',
        email,
        ethnity: 'Malay',
        gender: '',
        isFirstTimeLogin: true,
        isVerified: false,
        last_checkin: '',
        last_checkin_address: '',
        name: '',
        passportNo: '',
        phoneNumber: '',
        postcode: '',
        state: '',
      });
      closeModal(false);
      toast.success('User added successfully.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

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
                  Add New User
                </Dialog.Title>
                <div className="mt-8">
                  <div className="text-base text-gray-600 font-bold my-3">Email: </div>
                  <input
                    type="email"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Password: </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddUser;
