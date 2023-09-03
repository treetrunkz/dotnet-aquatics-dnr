namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;
using WebApi.Services;


[Authorize]
[ApiController]
[Route("[controller]")]
public class UsersController : Controller
{
    public User loggedInId;
    private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;


    public UsersController(
        IUserService userService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _userService = userService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    [AllowAnonymous]
    [Route("/")]
    public IActionResult Index()
    {
        return View("Views/Login/login.cshtml");
    }

    [AllowAnonymous]
    [Route("/Aquatics")]
    public ActionResult Aquatics()
    {
        string id = TempData.Peek("first").ToString();
        int res = Int32.Parse(id);
        User userdata = _userService.GetById(res);
        ViewBag.UserData = userdata;
        return View();
    }

    //User Login Management Section 

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public ActionResult Authenticate(AuthenticateRequest model)
    {

        var response = _userService.Authenticate(model);
        if(response.Token == null)
        {
            return Ok(response);
        }
        
        else
        {
            User temp = _userService.GetUserId(response);
            var send = temp.Id;
            TempData["first"] = send;


            return RedirectToAction("Aquatics");
        }
        
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register(RegisterRequest model)
    {

        _userService.Register(model);
        return Ok(new { message = "Registration successful" });
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateRequest model)
    {
        _userService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userService.Delete(id);
        return Ok(new { message = "User deleted successfully" });
    }
}