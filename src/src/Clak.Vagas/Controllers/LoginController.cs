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
    public class LoginController : Controller
    {
        private string _stringConnection = @"Data Source=.\SQLEXPRESS;User Id=sa;Password=sa; Initial Catalog=clakVagas";


        // GET: api/values
        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            using (var conexao = new SqlConnection(_stringConnection))
            {
                var sql = "SELECT * from usuarios WHERE userName = @userName";
                var resultado = conexao.Query(sql, new { userName = username })
                    .Select(u => new User()
                    {
                        Id = u.id,
                        Senha = u.senha,
                        Tipo = u.tipo
                    })
                    .FirstOrDefault();
                if (resultado == null)
                    return NotFound();

                return Ok(resultado);
            }

        }

        public class User
        {
            public int Id { get; set; }
            public string Senha { get; set; }
            public string Tipo { get; set; }
        }
    }
}
