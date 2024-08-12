import React, { useState } from 'react';
import './FormularioTarefa.css';
import api from '../../service/api';

const FormularioTarefa = ({ onAddTarefa, onClose }) => {
    const [title, setTitle] = useState('');
    const [sla, setSla] = useState('');
    const [file, setFile] = useState('');

    const resetField = () => {
        setTitle('');
        setSla('');
        setFile('');
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { title, sla, file:file.name}
       
        try {
            const response = await api.post('/Tarefa',data)
            onAddTarefa(response.data);
            resetField();
        } catch (error) {
            alert("Erro ao inserir tarefa")
        }
    };

    return (
        <div className="modal show">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className="modal-title">Adicionando Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Título</label>
                    <input type="text" id="titleModal" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <label htmlFor="sla">SLA (em horas)</label>
                    <input type="number" id="slaModal" name="sla" value={sla} onChange={(e) => setSla(e.target.value)} required />

                    <label htmlFor="file">Upload de Arquivo</label>
                    <input type="file" id="fileModal" name="file"  onChange={(e) => setFile(e.target.files[0])} />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default FormularioTarefa;
