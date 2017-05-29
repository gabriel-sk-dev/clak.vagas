using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Clak.Vagas.Controllers
{
    [Route("api/[controller]")]
    public class CurriculosController : Controller
    {
        private string _stringConnection = @"Data Source=.\SQLEXPRESS;User Id=da;Password=sa; Initial Catalog=clakVagas";


        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
