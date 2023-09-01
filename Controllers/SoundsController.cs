namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Services;

    [Authorize]    
    [Route("[controller]")]
    [ApiController]
    public class SoundsController : ControllerBase
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

        [HttpGet]
        [Route("Aquatics")]
        public IActionResult GetSounds(int id) 
        { 
            var sound = _soundService.GetById(id); 
            return Ok(User);
        }
    }
