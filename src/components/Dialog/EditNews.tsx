import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'components/Button';
import firebase from 'firebase';
import { toast } from 'react-toast';

type Props = {
  isOpen: boolean;
  closeModal: (value: boolean) => void;
  newsId: number;
  type: string;
};

const db = firebase.firestore();

const EditNews: React.FC<Props> = ({ isOpen, closeModal, newsId, type }) => {
  const [newsDate, setNewsDate] = useState<string>('');
  const [newsImage, setNewsImage] = useState<string>('');
  const [newsTitle, setNewsTitle] = useState<string>('');
  const [newsLink, setNewsLink] = useState<boolean>(false);

  const updateNewsData = async () => {
    if (newsId !== 0) {
      const newsData = await db.collection('news').doc(newsId.toString()).get();
      if (newsData) {
        setNewsDate(newsData.data()!.date);
        setNewsImage(newsData.data()!.image);
        setNewsTitle(newsData.data()!.title);
        setNewsLink(newsData.data()!.link);
      }
    }
  };

  const onSave = async () => {
    try {
      const timestamp = new Date(newsDate).getTime();
      if (type === 'create')
        await db
          .collection('news')
          .doc(timestamp.toString())
          .set({ date: newsDate, image: newsImage, link: newsLink, title: newsTitle, timestamp });
      else {
        const newsData = (
          await db.collection('news').doc(timestamp.toString()).get()
        ).data() as firebase.firestore.DocumentData;
        console.log(newsData);
        newsData.title = newsTitle;
        newsData.image = newsImage;
        newsData.link = newsLink;
        await db.collection('news').doc(newsId.toString()).set(newsData);
      }
    } catch (e) {
      toast.warn(e.message);
    }
    closeModal(false);
  };

  useEffect(() => {
    setNewsDate('');
    setNewsImage('');
    setNewsTitle('');
    setNewsLink(false);
    if (type === 'edit') updateNewsData();
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
                  News
                </Dialog.Title>
                <div className="mt-8">
                  <div className="text-base text-gray-600 font-bold my-3">Title : </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newsTitle}
                    onChange={e => {
                      setNewsTitle(e.target.value);
                    }}
                  />
                  <div className="text-base text-gray-600 font-bold my-3">Date : (30 Aug 2021, 11:03 AM)</div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newsDate}
                    disabled={type === 'edit'}
                    onChange={e => {
                      setNewsDate(e.target.value);
                    }}
                  />
                  <div className="flex items-center my-3">
                    <div className="text-xs text-gray-600 mr-3">AttachLink : </div>
                    <input
                      type="checkbox"
                      checked={newsLink}
                      onChange={e => {
                        console.log(e.target.checked);
                        setNewsLink(e.target.checked);
                      }}
                    />
                  </div>
                  <div className="text-base text-gray-600 font-bold my-3">Image : </div>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newsImage}
                    onChange={e => {
                      setNewsImage(e.target.value);
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

export default EditNews;
