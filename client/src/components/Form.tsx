import { FormEvent, useState } from 'react';

import socket from '../socket';

const Form: React.FC = () => {

  const [ value, setValue ] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setValue('');
    socket.emit('enter');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setValue(input);
    socket.emit('input', input);
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input onChange={ handleInputChange } value={ value } />
      </form>
    </>
  );
}

export default Form;
