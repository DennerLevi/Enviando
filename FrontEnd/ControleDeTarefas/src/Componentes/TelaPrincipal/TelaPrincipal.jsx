import React, { useEffect, useState } from 'react';
import BarraPesquisa from '../BarraPesquisa/BarraPesquisa';
import FormularioTarefa from '../FormularioTarefa/FormularioTarefa';
import './TelaPrincipal.css';
import api from '../../service/api';


const TelaPrincipal = () => {
    const [showForm, setShowForm] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [ordenacao, setOrdenacao] = useState('maisRecente');
    const [searchTerm, setSearchTerm] = useState('');
    const handleFormOpen = () => setShowForm(true);
    const handleFormClose = () => setShowForm(false);

    const addTarefa = (tarefa) => {
        setTarefas([...tarefas, { ...tarefa, dataCriacao: new Date() }]);
        handleFormClose();
    };

    const handleOrdenacao = (criterio) => {
        setOrdenacao(criterio);
    };

    // const tarefasOrdenadas = tarefas.sort((a, b) => {
    //     return ordenacao === 'maisRecente' ? b.dataCriacao - a.dataCriacao : a.dataCriacao - b.dataCriacao;
    // });


    const getTarefaByTitulo = async () => {
        try {
            const response = await api.get(`Titulo`, { params: { titulo: searchTerm } })
            setTarefas([response.data])
        } catch (error) {
            alert("Busca não encontrada")
        }
    }
    const getTarefaAll = async () => {
        try {
            const response = await api.get('/')
            setTarefas(response.data)
        } catch (error) {
            alert("Busca não encontrada")
        }
    }

    const convertTime = (horaCompleta)=> {
        const hora = new Date(horaCompleta)
        const horas = hora.getHours()

        return `${horas} horas`
    }

    useEffect(()=>{
        getTarefaAll();
    },[])

    return (
        <div className="container">
            <h1>Controle de Tarefas</h1>
            <BarraPesquisa onAddTask={handleFormOpen} onSearch={getTarefaByTitulo} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {showForm && <FormularioTarefa onAddTarefa={addTarefa} onClose={handleFormClose} />}
            {/* {tarefas.length > 0 && ( */}
            <>
                <div className="sorting-controls">
                    <button onClick={() => handleOrdenacao('maisRecente')}>&#x25B2; Mais Recente</button>
                    <button onClick={() => handleOrdenacao('maisAntigo')}>&#x25BC; Mais Antigo</button>
                </div>
                <div className="results-area">
                    <div className="table-header">
                        <div className="table-cell">Título</div>
                        <div className="table-cell">Horas (SLA)</div>
                        <div className="table-cell">Arquivo</div>
                    </div>
                    {tarefas.map((tarefa, index) => (
                        <div key={index} className="table-row">
                            <div className="table-cell">{tarefa.titulo ?? tarefa.title}</div>
                            <div className="table-cell">{tarefa.horario ? convertTime(tarefa.horario) : `${tarefa.sla} horas`} </div>
                            <div className="table-cell">{tarefa.arquivo ? "Nenhum arquivo": tarefa.file }</div> 
                        </div>
                    ))}

                    {/* {tarefasOrdenadas.map((tarefa, index) => ( */}

                    {/* ))} */}
                </div>
            </>
            {/* )} */}

        </div>
    );
}

export default TelaPrincipal;
