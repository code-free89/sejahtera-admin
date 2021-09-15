import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import ReactPaginate from 'react-paginate';
import EditForm from 'components/Dialog/EditForm';
import { UserType } from 'types/global';
import Alert from 'components/Dialog/Alert';
import { toast } from 'react-toast';
import FCInput from 'components/Input/fc-input';
import DropDown from 'components/Dropdown';

const approveStatuses = ['', 'Approved', 'Not Approved'];

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [vaccines, setVaccines] = useState<string[]>([]);
  const db = firebase.firestore();
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [approvedState, setApprovedState] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const itemsPerPage = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE ?? '10', 10);

  const collectUsers = async (): Promise<void> => {
    const data = await db.collection('users').get();
    setUsers([...data.docs.map(item => ({ id: item.id, ...item.data() } as UserType))]);
  };

  const collectVaccines = async (): Promise<void> => {
    const data = await db.collection('vaccines').get();
    setVaccines([...vaccines, ...data.docs.map(item => item.id)]);
  };

  const changePage = (data: { selected: number }) => {
    setPageNumber(data.selected);
  };

  useEffect(() => {
    collectUsers();
    collectVaccines();
  }, []);

  useEffect(() => {
    setPageCount(users.length / itemsPerPage);
  }, [users]);

  return (
    <div className="w-full pt-12">
      <EditForm
        isOpen={isEditOpen}
        closeModal={() => {
          setIsEditOpen(false);
        }}
        vaccines={vaccines}
        userId={userID}
      />
      <Alert
        isOpen={isAlertOpen}
        closeModal={() => {
          setIsAlertOpen(false);
        }}
        title="Delete User"
        description="Do you want to delete this user?"
        onOkay={async () => {
          try {
            await db.collection('users').doc(userID).delete();
            collectUsers();
          } catch (e) {
            toast.error(e.message);
            console.log(e.message);
          }
          setIsAlertOpen(false);
        }}
      />
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            <FCInput
              value={name}
              onChange={(value: string) => {
                setName(value);
                setPageCount(
                  users.filter(
                    user =>
                      user.name?.toLowerCase().includes(name.toLowerCase()) &&
                      user.email?.toLowerCase().includes(email.toLowerCase()) &&
                      user.phoneNumber?.toLowerCase().includes(phoneNumber.toLowerCase()) &&
                      ((user.dose2 !== '' && approvedState === 'Approved') ||
                        (user.dose2 === '' && approvedState === 'Not Approved') ||
                        approvedState === '')
                  ).length / itemsPerPage
                );
              }}
              label="Name : "
            />
            <FCInput
              value={email}
              onChange={(value: string) => {
                setEmail(value);
                setPageCount(
                  users.filter(
                    user =>
                      user.name?.toLowerCase().includes(name.toLowerCase()) &&
                      user.email?.toLowerCase().includes(email.toLowerCase()) &&
                      user.phoneNumber?.toLowerCase().includes(phoneNumber.toLowerCase()) &&
                      ((user.dose2 !== '' && approvedState === 'Approved') ||
                        (user.dose2 === '' && approvedState === 'Not Approved') ||
                        approvedState === '')
                  ).length / itemsPerPage
                );
              }}
              label="Email : "
            />
            <FCInput
              value={phoneNumber}
              onChange={(value: string) => {
                setPhoneNumber(value);
                setPageCount(
                  users.filter(
                    user =>
                      user.name?.toLowerCase().includes(name.toLowerCase()) &&
                      user.email?.toLowerCase().includes(email.toLowerCase()) &&
                      user.phoneNumber?.toLowerCase().includes(phoneNumber.toLowerCase()) &&
                      ((user.dose2 !== '' && approvedState === 'Approved') ||
                        (user.dose2 === '' && approvedState === 'Not Approved') ||
                        approvedState === '')
                  ).length / itemsPerPage
                );
              }}
              label="Phone Number : "
            />
            <div className="w-44 flex flex-wrap">
              <div className="text-base text-gray-600 font-bold my-3">Approve Status :</div>
              <DropDown
                selectedItem={approvedState}
                setSelectedItem={value => {
                  setApprovedState(value);
                  setPageCount(
                    users.filter(
                      user =>
                        user.name?.toLowerCase().includes(name.toLowerCase()) &&
                        user.email?.toLowerCase().includes(email.toLowerCase()) &&
                        user.phoneNumber?.toLowerCase().includes(phoneNumber.toLowerCase()) &&
                        ((user.dose2 !== '' && value === 'Approved') ||
                          (user.dose2 === '' && value === 'Not Approved') ||
                          value === '')
                    ).length / itemsPerPage
                  );
                }}
                data={approveStatuses}
              />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PhoneNumber
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.length > 0 ? (
                    users
                      .filter(
                        user =>
                          user.name?.toLowerCase().includes(name.toLowerCase()) &&
                          user.email?.toLowerCase().includes(email.toLowerCase()) &&
                          user.phoneNumber?.toLowerCase().includes(phoneNumber.toLowerCase()) &&
                          ((user.dose2 !== '' && approvedState === 'Approved') ||
                            (user.dose2 === '' && approvedState === 'Not Approved') ||
                            approvedState === '')
                      )
                      .map((user, index) =>
                        index >= pageNumber * itemsPerPage && index < (pageNumber + 1) * itemsPerPage ? (
                          <tr key={`user-${index}`} className="bg-white">
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{user.name} </span>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{user.email} </span>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">{user.phoneNumber} </span>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">
                                {user.dose2 === '' ? 'Not Approved' : 'Approved'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center flex items-center justify-center space-x-4">
                              <div
                                aria-hidden
                                className="bg-gray-100 rounded-md border-gray-400 p-2"
                                onClick={() => {
                                  setIsEditOpen(true);
                                  setUserID(user.id);
                                }}
                              >
                                <PencilIcon className="h-4 cursor-pointer transform duration-500 hover:scale-125 text-green-500" />
                              </div>
                              <div
                                aria-hidden
                                className="bg-gray-100 rounded-md border-gray-400 p-2"
                                onClick={() => {
                                  setIsAlertOpen(true);
                                  setUserID(user.id);
                                }}
                              >
                                <TrashIcon className="h-4 cursor-pointer transform duration-500 hover:scale-125 text-red-500" />
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )
                      )
                  ) : (
                    <></>
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

export default Users;
