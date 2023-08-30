using WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 
namespace WebApi.Controllers
{
    public class AquaticsDBController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
