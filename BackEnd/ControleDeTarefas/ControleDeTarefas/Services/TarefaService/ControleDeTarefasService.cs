using ControleDeTarefas.Models;
using Dapper;
using System.Data.SqlClient;

namespace ControleDeTarefas.Services.LivrosService
{
    public class ControleDeTarefasService : IControleDeTarefasInterface
    {
        private readonly IConfiguration _configuration;
        private readonly string getConnection;

        public ControleDeTarefasService(IConfiguration configuration)
        {
            _configuration = configuration;
            getConnection = _configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Tarefa>> CreateTarefa(Tarefa tarefa)
        {
            using (var con = new SqlConnection(getConnection))
            {
                var sql = "insert into Tarefa(titulo,horario,arquivo) values (@titulo,@horario,@arquivo)";
                //executar dentro do banco
                await con.ExecuteAsync(sql, tarefa);

                return await con.QueryAsync<Tarefa>("select * from Tarefa order by 1 desc");
            }
        }

        public async Task<IEnumerable<Tarefa>> DeletionTarefa(string tarefaId)
        {
            using (var con = new SqlConnection(getConnection))
            {
                var sql = "delete from Tarefa where titulo = @titulo";
                await con.ExecuteAsync(sql, new { Titulo = tarefaId });
                return await con.QueryAsync<Tarefa>("Select * from Tarefa order by 1 desc");
            }
        }
        public async Task<IEnumerable<Tarefa>> GetAllTarefas()
        {
            //abri a conexão com o banco
            using (var con = new SqlConnection(getConnection))
            {
                //pegando todos os registros 
                var sql = "select * from Tarefa order by 1 desc";
                return await con.QueryAsync<Tarefa>(sql);
            }
        }

        public async Task<Tarefa> GetTarefaByName(string titulo)
        {
            using (var con = new SqlConnection(getConnection))
            {
                var sql = "select * from Tarefa where Titulo =@Titulo";
                return await con.QueryFirstOrDefaultAsync<Tarefa>(sql, new { Titulo = titulo });
            }
        }

        public async Task<IEnumerable<Tarefa>> UpdateTarefa(Tarefa tarefaId)
        {
            using (var con = new SqlConnection(getConnection))
            {
                var sql = "update tarefa set titulo = @titulo,autor = @autor where id = @id";
                await con.ExecuteAsync(sql, tarefaId);
                return await con.QueryAsync<Tarefa>("Select * from tarefa order by 1 desc");
            }
        }
    }
}