import React, { useState, useEffect } from 'react';
import Button from '../../../components/UI/Button';
import EditProductForm from './EditProductForm';

interface AuthorizationProps {
  product: any;
  onUpdateProduct: any;
}

const Authorization: React.FC<AuthorizationProps> = ({ product, onUpdateProduct }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeCorrect, setPasscodeCorrect] = useState(false);

  useEffect(() => {
    const productPasscode = 'passcode' 

    if (enteredPasscode === productPasscode) {
      setIsAuthorized(true);
      setPasscodeCorrect(true);
    } else {
      setPasscodeCorrect(false);
    }
  }, [enteredPasscode, product]);

  useEffect(() => {
    // When a new product is selected, reset the passcode state
    setIsAuthorized(false);
    setEnteredPasscode('');
    setPasscodeCorrect(false);
  }, [product]);

  const handleUpdateProduct = (updatedProduct: any) => {
    onUpdateProduct(updatedProduct);
  };

  const handlePasscodeSubmit = () => {
    const productPasscode = product.passcode; // Replace 'passcode' with the correct passcode for this product

    if (enteredPasscode === productPasscode) {
      setIsAuthorized(true);
      setPasscodeCorrect(true);
    } else {
      setPasscodeCorrect(false);
    }
  };

  return (
    <div className='md:w-2/3'>
      {isAuthorized ? (
        <div>
          <EditProductForm productId={product}  />
        </div>
      ) : (
        <div className='w-fit m-auto mt-4'>
          {!passcodeCorrect ? (
            <div className='p-2 w-full text-center'>Enter 'Passcode' for Authentication</div>
          ) : null}
          <input
            type='password'
            placeholder='Enter Passcode'
            value={enteredPasscode}
            className='p-2 border rounded-md'
            onChange={(e) => setEnteredPasscode(e.target.value)}
          />
          <Button variant='secondary' onClick={handlePasscodeSubmit} className='bg-slate-200 rounded-md'>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Authorization;
