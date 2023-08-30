using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Net;

namespace WebApi.Controllers
{
    public class UserDataController : Controller
    {
        [Route("")]
        public IActionResult Data()
        {
            return View("Pages/Login/Register.cshtml");
        }
    }
}
