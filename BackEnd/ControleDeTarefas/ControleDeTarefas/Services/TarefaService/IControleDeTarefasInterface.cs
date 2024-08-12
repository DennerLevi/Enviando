using ControleDeTarefas.Models;

namespace ControleDeTarefas.Services.LivrosService
{
    public interface IControleDeTarefasInterface
    {
        Task<IEnumerable<Tarefa>> GetAllTarefas();
        Task<Tarefa> GetTarefaByName(string titulo); 
        Task<IEnumerable<Tarefa>> CreateTarefa(Tarefa tarefa);
        Task<IEnumerable<Tarefa>> UpdateTarefa(Tarefa tarefa);
        Task<IEnumerable<Tarefa>> DeletionTarefa(string titulo);

    }
}
