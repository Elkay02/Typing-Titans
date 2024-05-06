import { FormEvent } from 'react';

import socket from '../socket';

const Form: React.FC = () => {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    socket.emit('enter');
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input />
      </form>
    </>
  );
}

export default Form;
