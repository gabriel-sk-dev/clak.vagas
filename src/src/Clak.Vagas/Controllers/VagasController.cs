using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Clak.Vagas.Controllers
{
    [Route("api/[controller]")]
    public class VagasController : Controller
    {
        private string _stringConnection = @"Data Source=ev5toyh7r2.database.windows.net,1433;User Id=clak;Password=vagas+2017; Initial Catalog=clakVagas";


        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            using (var conexao = new SqlConnection(_stringConnection))
            {
                var sql = "SELECT * FROM Vagas";
                var resultado = conexao.Query(sql)
                    .Select(vaga => new VagasListView(vaga.id, vaga.titulo, vaga.detalhes));

                return Ok(resultado);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (var conexao = new SqlConnection(_stringConnection))
            {
                var sql = "SELECT * FROM Vagas WHERE id = @idParams";
                var resultado = conexao.Query(sql, new { idParams = id })
                    .Select(vaga => new VagaDetalhadaView(vaga.id, vaga.titulo, vaga.detalhes, vaga.requisitos, vaga.salario, vaga.cargaHoraria, vaga.tipoContratacao))
                    .FirstOrDefault();

                return Ok(resultado);
            }
        }
        [HttpPost]
        [Route("inscricao")]
        public void Post([FromBody]Vagacadastrarse inscricao)
        {
            using (var conexao = new SqlConnection(@"Data Source=PC-18\SQLEXPRESS;User Id=sa;Password=sa;Initial Catalog=clakVagas"))
            {
                var sql = @"INSERT INTO curriculos_vagas (id_curriculos, id_vagas) 
                            VALUES (@id_curriculos, @id_vagas)";
                conexao.Execute(sql, new
                {
                    id_curriculos = inscricao.id_curriculos,
                    id_vagas = inscricao.id_vagas
                });
            }
        }

        [HttpGet()]
        [Route("admin")]
        public IActionResult GetAdminTabela()
        {
            using (var conexao = new SqlConnection(_stringConnection))
            {
                var sql = "SELECT vagas.id, vagas.titulo, count(curriculos_vagas.id_vagas) as quantidade FROM vagas left join curriculos_vagas on (vagas.id = curriculos_vagas.id_vagas) group by vagas.id, vagas.titulo";
                var resultado = conexao.Query(sql)
                    .Select(vaga => new VagasTabelaView(vaga.id, vaga.titulo, vaga.quantidade));

                return Ok(resultado);
            }
        }
    }
}

public class VagasListView
{
    public VagasListView(int id, string titulo, string detalhes)
    {   
        Id = id;
        Titulo = titulo;
        Detalhes = detalhes;
    }

    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Detalhes { get; set; }
}

public class VagaDetalhadaView
{
    public VagaDetalhadaView(int id, string titulo, string detalhes, string requisitos, string salario, string cargaHoraria, string tipoContratacao)
    {
        Id = id;
        Titulo = titulo;
        Detalhes = detalhes;
        Requisitos = requisitos;
        Salario = salario;
        CargaHoraria = cargaHoraria;
        TipoContratacao = tipoContratacao;
    }
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Detalhes { get; set; }
    public string Requisitos { get; set; }
    public string Salario { get; set; }
    public string CargaHoraria { get; set; }
    public string TipoContratacao { get; set; }
}

public class Vagacadastrarse
{
    public int id_curriculos { get; set; }
    public int id_vagas { get; set; }
}

public class VagasTabelaView
{
    public VagasTabelaView(int id, string titulo, int quantidade)
    {
        Id = id;
        Titulo = titulo;
        Quantidade = quantidade;
    }

    public int Id { get; set; }
    public string Titulo { get; set; }
    public int Quantidade { get; set; }
}

