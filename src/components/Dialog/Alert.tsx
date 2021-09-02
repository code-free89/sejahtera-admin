import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import React, { Fragment } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  onOkay: Function;
  closeModal: (value: boolean) => void;
};

const Alert: React.FC<Props> = ({ isOpen, closeModal, title, description, onOkay }) => {
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
                  {title}
                </Dialog.Title>
                <div className="mt-4 text-base text-gray-600 font-bold my-3">{description}</div>
                <div className="mt-8 flex w-full items-center justify-around">
                  <Button
                    type="button"
                    className="bg-green-400 hover:bg-green-500 transition-colors duration-300 w-24"
                    onClick={onOkay}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 transition-colors duration-300 w-24"
                    onClick={closeModal}
                  >
                    No
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

export default Alert;
