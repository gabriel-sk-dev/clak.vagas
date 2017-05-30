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
    public class CurriculosController : Controller
    {
        private string _stringConnection = @"Data Source=.\SQLEXPRESS;User Id=sa;Password=sa; Initial Catalog=clakVagas";

        [HttpPost]
        public void Post([FromBody]CurriculoInput curriculo)
        {
            using (var conexao = new SqlConnection(_stringConnection))
            {
                var sql = @" INSERT INTO curriculos (nome, dataNascimento, endereço, genero,telefone, email, cpf, formacao, experiencia)
                           values (@nome, @dataNascimento, @endereço, @genero,@telefone, @email, @cpf, @formacao, @experiencia )";
                conexao.Execute(sql, new
                {
                    nome = curriculo.Nome,
                    dataNascimento = curriculo.DataNascimento,
                    endereco = curriculo.Endereco,
                    genero = curriculo.Genero,
                    telefone = curriculo.Telefone,
                    email = curriculo.Email,
                    cpf = curriculo.Cpf,
                    formacao = curriculo.Formacao,
                    experiencia = curriculo.Experiencia,
                });
                sql = @" INSERT INTO usuario (userName,senha,tipo)
                        values (@userName,@senha,@tipo)";
                conexao.Execute(sql, new
                {
                    userName = curriculo.UserName,
                    senha = curriculo.Senha
                });
            }
        }
    }

    public class CurriculoInput
    {
        public String Nome { get; set; }
        public String DataNascimento { get; set; }
        public String Endereco { get; set; }
        public String Genero { get; set; }
        public String Telefone{ get; set; }
        public String Email { get; set; }
        public String Cpf{ get; set; }
        public String Formacao { get; set; }
        public String Experiencia{ get; set; }
        public String UserName{ get; set; }
        public String Senha { get; set; }
    }
}

