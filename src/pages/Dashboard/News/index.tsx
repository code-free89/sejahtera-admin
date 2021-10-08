import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import firebase from 'firebase';
import Button from 'components/Button';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import EditNews from 'components/Dialog/EditNews';
import Alert from 'components/Dialog/Alert';
import { toast } from 'react-toast';

const News = () => {
  const db = firebase.firestore();
  const [news, setNews] = useState<NewsType[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isNewsEditOpen, setIsNewsEditOpen] = useState<boolean>(false);
  const [newsId, setNewsId] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('edit');
  const itemsPerPage = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE ?? '10', 10);

  const collectNews = async (): Promise<void> => {
    const data = await db.collection('news').get();
    setNews([
      ...data.docs.map(item => ({
        id: item.id,
        title: item.data().title,
        date: item.data().date,
        timestamp: item.data().timestamp,
      })),
    ]);
  };

  const changePage = (data: { selected: number }) => {
    setPageNumber(data.selected);
  };

  useEffect(() => {
    collectNews();
  }, []);

  useEffect(() => {
    setPageCount(news.length / itemsPerPage);
  }, [news]);

  return (
    <div className="w-full pt-12">
      <EditNews
        isOpen={isNewsEditOpen}
        closeModal={() => {
          setIsNewsEditOpen(false);
        }}
        newsId={newsId}
        type={type}
      />
      <Alert
        isOpen={isAlertOpen}
        closeModal={() => {
          setIsAlertOpen(false);
        }}
        title="Delete News"
        description="Do you want to delete this news?"
        onOkay={async () => {
          try {
            await db.collection('news').doc(newsId.toString()).delete();
            collectNews();
          } catch (e: any) {
            toast.error(e.message);
          }
          setIsAlertOpen(false);
        }}
      />
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
              <div className="flex justify-end m-4">
                <Button
                  type="button"
                  className="w-44 bg-green-400 hover:bg-green-500"
                  onClick={() => {
                    setType('create');
                    setIsNewsEditOpen(true);
                  }}
                >
                  <PlusIcon className="w-5 mr-3" />
                  Add News
                </Button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news.map((item, index) =>
                    index >= pageNumber * itemsPerPage && index < (pageNumber + 1) * itemsPerPage ? (
                      <tr key={`user-${index}`} className="bg-white">
                        <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">{item.title} </span>
                        </td>
                        <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">{item.date} </span>
                        </td>
                        <td className="px-6 py-4 text-center flex items-center justify-center space-x-4">
                          <div
                            aria-hidden
                            className="bg-gray-100 rounded-md border-gray-400 p-2"
                            onClick={() => {
                              setType('edit');
                              setNewsId(item.id);
                              setIsNewsEditOpen(true);
                            }}
                          >
                            <PencilIcon className="h-4 cursor-pointer transform duration-500 hover:scale-125 text-green-500" />
                          </div>
                          <div
                            aria-hidden
                            className="bg-gray-100 rounded-md border-gray-400 p-2"
                            onClick={() => {
                              setIsAlertOpen(true);
                              setNewsId(item.id);
                            }}
                          >
                            <TrashIcon className="h-4 cursor-pointer transform duration-500 hover:scale-125 text-red-500" />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )
                  )}
                </tbody>
              </table>
              <div className="my-6 flex w-full justify-end pr-12">
                <ReactPaginate
                  pageCount={pageCount}
                  previousLabel={
                    <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 bg-white hover:text-gray-500">
                      Previous
                    </div>
                  }
                  nextLabel={
                    <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:text-gray-500">
                      Next
                    </div>
                  }
                  breakLabel={
                    <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      ...
                    </div>
                  }
                  pageClassName="relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  pageLinkClassName="px-4 py-2"
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  forcePage={pageNumber}
                  containerClassName="flex items-center justify-end"
                  activeClassName="bg-gray-100 text-dark"
                  onPageChange={changePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
