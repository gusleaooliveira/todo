import React from 'react';
import Cadastrar from './Cadastrar/Cadastrar'
import Listar from './Listar/Listar'

const App : React.FC = () => {
  return (
    <>
      <Cadastrar />
      <Listar />
    </>
  );
}

export default App;
