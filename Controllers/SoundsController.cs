namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Services;
using WebApi.Models.Sounds;

[Authorize]
[ApiController]
[Route("[controller]")]
public class SoundsController : Controller
{
    private ISoundService _soundService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;

    public SoundsController(
        ISoundService soundService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _soundService = soundService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    [AllowAnonymous]
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _soundService.Delete(id);
        return Ok(new { message = "Sucessfully deleted record!" });
    }

    [AllowAnonymous]
    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateRequest model)
    {
        _soundService.Update(id, model);
        return Ok(new { message = "Updated record: " + model.Name });
    }

    [AllowAnonymous]
    [HttpPost("add")]
    public IActionResult Add(AddRequest model)
    {
        _soundService.Add(model);
        return Ok(new { message = "Adding new record successful" });
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetSounds() 
    {
        var sounds = _soundService.GetAllSounds();
        return Ok(sounds);
    }
}
