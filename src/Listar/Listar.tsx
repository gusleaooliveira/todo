import React, {useState, useEffect} from "react"
import { api } from "../services/Api"
import estrela from '../assets/estrela.png'

import styled from 'styled-components'

const Table = styled.table`
    border: 1px solid black; 
    width: 100%; 
    text-align: center;

    & > tr:nth-child(2n)  {
        background-color: #ccc;
    }
`

const Td = styled.td`
    boder: 1px solid black;
    
`

const Tr = styled.tr`
    border: 1px solid black;
`

const Listar: React.FC = () => {
    const [ tarefas, setTarefas ] = useState([{id: 0, tarefa: '', estrela: false, concluido: false}])
    const [ opcao, setOpcao ] = useState('naofavoritas')

    function getTarefas(){
        let url = '/tarefas'
        if(opcao == ''){ url = '/tarefas' }
        if(opcao == 'concluidas'){ url = '/tarefas?concluido_like=true' }
        if(opcao == 'naoconcluidas'){ url = '/tarefas?concluido_like=false' }
        if(opcao == 'favoritas'){ url = '/tarefas?estrela_like=true' }
        if(opcao == 'naofavoritas'){ url = '/tarefas?estrela_like=false' }
        api.get(url)
            .then((resp)=>{
                setTarefas(resp.data)
            })
            .catch((error) => {
                console.log(error)
                setTarefas([{id: 0, tarefa: '', estrela: false, concluido: false}])
            })
    }
   
    useEffect(() => {getTarefas(); }, [getTarefas]);



    return (
    <>  
        <div>
            <select onChange={(e)=>setOpcao(e.target.value)}>
                <option value="">Selecione</option>
                <option value="concluidas">Concluídas</option>
                <option value="naoconcluidas">Não Concluídas</option>
                <option value="favoritas">Favoritas</option>
                <option value="naofavoritas">Não Favoritas</option>
            </select>
        </div>
        <Table>
            <Tr>
                <th>Tarefa</th>
                <th>Favorito</th>
                <th>Concluído</th>
                <th>Editar?</th>
                <th>Excluir?</th>
            </Tr>
                {tarefas.map((valor, chave) => {
                    return  <Tr>
                                <Td>
                                   {valor.tarefa}
                                </Td>
                                <Td>
                                    <button onClick={()=>{
                                    
                                    let objTarefa = {
                                        ...valor, estrela: valor.estrela ? false : true 
                                    }
                                    api.put(`/tarefas/${valor.id}`, objTarefa)
                                        .then((resp) => console.log('Alterado', resp.data))
                                        .catch((error) => console.log('Não Alterado', error))

                                }}>    
                                        {valor.estrela ? <img src={estrela} width="20px" height="20px" /> : 'Favoritar'}
                                    </button>
                                </Td>
                                <Td> <input type="checkbox" checked={valor.concluido} onClick={()=>{
                                    
                                    let objTarefa = {
                                        ...valor, concluido: valor.concluido ? false : true 
                                    }
                                    api.put(`/tarefas/${valor.id}`, objTarefa)
                                        .then((resp) => console.log('Alterado', resp.data))
                                        .catch((error) => console.log('Não Alterado', error))

                                }} /> </Td>
                                <Td> <input type="button" value="Editar" onClick={()=>{
                                    
                                    let tempTarefa = prompt('Editar')

                                    let objTarefa = {
                                        ...valor, tarefa: tempTarefa != null ? tempTarefa : valor.tarefa
                                    }
                                    api.put(`/tarefas/${valor.id}`, objTarefa)
                                        .then((resp) => console.log('Alterado', resp.data))
                                        .catch((error) => console.log('Não Alterado', error))

                                }} /> </Td>
                                <Td>
                                    <button onClick={()=>{
                                        api.delete(`/tarefas/${valor.id}`)
                                            .then((resp) => console.log('Apagado', resp.data))
                                            .catch((error) => console.log('Não Apagado', error))

                                    }}>
                                        Excluir
                                    </button>
                                </Td>
                            </Tr>
                })}
        </Table>
    </>
    )
}

export default Listar