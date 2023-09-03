namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Services;
using WebApi.Models.Sounds;

    [Authorize]    
    [Route("[controller]")]
    [ApiController]
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
        [HttpPost("add")]
        public IActionResult Add(AddRequest model)
        {
            _soundService.Add(model);
            return Ok(new { message = "Adding new record successful" });
        }

        [HttpGet]
        [AllowAnonymous]    
        [Route("/sounds")]
        public IActionResult GetSounds() 
        {
            var sound = _soundService.GetAllSounds();
            return Ok(sound);
        }
    }
