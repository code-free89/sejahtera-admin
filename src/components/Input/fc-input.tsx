import React from 'react';

type Props = {
  value: string;
  onChange: Function;
  label: string;
};

const FCInput: React.FC<Props> = ({ value, onChange, label }) => {
  return (
    <div>
      {label && <div className="text-base text-gray-600 font-bold my-3">{label}</div>}
      <input
        type="text"
        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default FCInput;
