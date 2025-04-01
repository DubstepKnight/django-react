import React from 'react';

interface IError {
  errorMessage: string;
}

const ErrorComponent: React.FC<IError> = ({ errorMessage }) => {
  if (errorMessage === 'Unauthorized') {
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-24">
        <h1 className="font-bold text-5xl"> 401 </h1>
        <p className="font-bold text-xl"> {errorMessage} </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-24">
      <h1 className="font-bold text-5xl"> Unknown error </h1>
      <p className="font-bold text-xl"> {errorMessage} </p>
    </div>
  );
};

export default ErrorComponent;
