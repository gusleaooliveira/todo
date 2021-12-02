import React, {useState} from "react"
import { api } from "../services/Api"

const Cadastrar: React.FC = () => {
    const [tarefa, setTarefa] = useState('')
    const [estrela, setEstrela] = useState(false)

    function funcaoCadastrar(){
        let objTarefa = {
            tarefa: tarefa,
            estrela: estrela,
            concluido: false,
            id: Math.floor( 1 + Math.random() * 1000000000000000000)
        }
        console.log(objTarefa)
        api.post('/tarefas', objTarefa)
           .then((resp) => console.log('Funcionou', resp.data))
          .catch((error) => console.log('Não funcionou', error))
    }

    return (
        <>
            <label>
                Tarefa:
                <input type="text" value={tarefa} onChange={(e)=> setTarefa(e.target.value)} />
            </label>

            <label>
                <input type="radio" value="false" checked name="estrela" onClick={()=>setEstrela(false)}  />
                Sem estrela
            </label>
            <label>
                <input type="radio" value="true" name="estrela" onClick={()=>setEstrela(true)} />
                Com estrela
            </label>

            <input type="submit" value="Enviar" onClick={funcaoCadastrar} />
        </>
    )
}

export default Cadastrar