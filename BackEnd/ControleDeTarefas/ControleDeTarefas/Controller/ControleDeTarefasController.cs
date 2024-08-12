using ControleDeTarefas.Models;
using ControleDeTarefas.Services.LivrosService;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeTarefas.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControleDeTarefasController : ControllerBase
    {
        private readonly IControleDeTarefasInterface _controleDeTarefasInterface;
        public ControleDeTarefasController(IControleDeTarefasInterface TarefaInterface)
        {
            _controleDeTarefasInterface = TarefaInterface;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetAllTarefas()
        {
            IEnumerable<Tarefa> tarefa = await _controleDeTarefasInterface.GetAllTarefas();

            if (!tarefa.Any())
            {
                return NotFound("Nenhum registro localizado");
            }

            return Ok(tarefa);
        }
        [HttpGet("Titulo")]
        public async Task<ActionResult<Tarefa>> GetTarefaByName(string titulo)
        {
            Tarefa tarefa = await _controleDeTarefasInterface.GetTarefaByName(titulo);

            if (tarefa == null)
            {
                return NotFound("Tarefa nao encontrado");
            }
            return Ok(tarefa);
        }

        [HttpPost("Tarefa")]
        public async Task<ActionResult<IEnumerable<Tarefa>>> CreateTarefa(Tarefa tarefaId)
        {
            IEnumerable<Tarefa> tarefa = await _controleDeTarefasInterface.CreateTarefa(tarefaId);

            return Ok(tarefa);
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Tarefa>>> UpdateTarefa(Tarefa tarefa)
        {
            Tarefa Titulo = await _controleDeTarefasInterface.GetTarefaByName(tarefa.Titulo);

            if (Titulo.Titulo == null)
                return NotFound("Titulo não encontrado");

            IEnumerable<Tarefa> tarefas = await _controleDeTarefasInterface.UpdateTarefa(tarefa);

            return Ok(tarefas);
        }
        [HttpDelete("Tarefa")]
        public async Task<ActionResult<IEnumerable<Tarefa>>> DeletionTarefa(string titulo)
        {
            Tarefa registro = await _controleDeTarefasInterface.GetTarefaByName(titulo);

            if (registro.Titulo == null)
                return NotFound("Tarefa não encontrado");

            IEnumerable<Tarefa> tarefas = await _controleDeTarefasInterface.DeletionTarefa(titulo);

            return Ok(tarefas);
        }
    }

}
