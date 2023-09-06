namespace WebApi.Services;

using AutoMapper;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Sounds;

public interface ISoundService
{
    IEnumerable<Sound> GetAllSounds();
    Sound GetById(int id);
    void Add(AddRequest model);
    void Update(int id, UpdateRequest model);
    void Delete(int id);
}

public class SoundService : ISoundService
{
    private DataContext _context;
    //private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public SoundService(
        DataContext context,
        //IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        //_jwtUtils = jwtUtils;
        _mapper = mapper;
    }

    public IEnumerable<Sound> GetAllSounds()
    {
        return _context.Sounds;
    }

    public Sound GetById(int id)
    {
        return getSound(id);
    }

    // Note: follow up with where these records are appended, if they need to be reorganized.
    public void Add(AddRequest model)
    {
        // validate
        if (_context.Sounds.Any(x => x.Name == model.Name))
            throw new AppException("This item: '" + model.Name + "' is already been entered.");

        // map model to new object
        var sound = _mapper.Map<Sound>(model);

        // save record
        _context.Sounds.Add(sound);
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var sound = getSound(id);

        // copy model to object and save
        _mapper.Map(model, sound);
        _context.Sounds.Update(sound);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var sound = getSound(id);
        _context.Sounds.Remove(sound);
        _context.SaveChanges();
    }

    // helper methods
    private Sound getSound(int id)
    {
        var sound = _context.Sounds.Find(id);
        if (sound == null) throw new KeyNotFoundException("Record not found");
        return sound;
    }
}