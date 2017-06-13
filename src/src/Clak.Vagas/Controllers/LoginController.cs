using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;

namespace Clak.Vagas.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private string _stringConnection = @"Data Source=ev5toyh7r2.database.windows.net,1433;User Id=clak;Password=vagas+2017; Initial Catalog=clakVagas";


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
                        UserName = u.userName,
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
            public string UserName { get; set; }
            public string Senha { get; set; }
            public string Tipo { get; set; }
        }
    }
}
