// src/Componentes/TarefasLista.jsx
import React from 'react';

const TarefasLista = ({ tarefas }) => {
    return (
        <div>
            {tarefas.map((tarefa, index) => (
                <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h3>{tarefa.titulo}</h3>
                    <p>SLA: {tarefa.sla} horas</p>
                    {tarefa.arquivo && <p>Arquivo: {tarefa.arquivo.name}</p>}
                </div>
            ))}
        </div>
    );
};

export default TarefasLista;
