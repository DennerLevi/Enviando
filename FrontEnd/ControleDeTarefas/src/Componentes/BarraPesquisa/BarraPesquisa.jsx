import React, { useState } from 'react';
import './BarraPesquisa.css';

const BarraPesquisa = ({ onAddTask, onSearch,searchTerm, setSearchTerm }) => {
  
    return (
        <section className="search-section">
            <div className="search-bar">
                <div className="search-input">
                    <input
                        type="text"
                        id="search"
                        placeholder="Digite o título da tarefa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button id="searchButton" onClick={onSearch}>Pesquisar</button>
                    <button onClick={onAddTask}>Adicionar tarefa</button>
                </div>
            </div>
        </section>
    );
}

export default BarraPesquisa;
