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

        private string _stringConnection = @"Data Source=.\SQLEXPRESS;User Id=sa;Password=sa; Initial Catalog=clakVagas";


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
    }
}

// [HttpGet()]
// [Route("admin")]
// 
// [HttpPost]
// public void Post([FromBody]string value)
// {
// 
// }

public class VagasListView
{
    public VagasListView(int id, string titulo, string detalhes)
    {   
        Id = Id;
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

