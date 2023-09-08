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
    private readonly IMapper _map;

    public SoundService(
        DataContext context,
        IMapper map)
    {
        _context = context;
        _map = map;
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
        var sound_mapped = new Sound(0,0,"",0,0,0,0,"","","",0,"","","",false,false,"");

        sound_mapped.Id = model.Id;
        sound_mapped.PermissionReq = model.PermissionReq;
        sound_mapped.Name = model.Name;
        sound_mapped.Coordinate_X = model.Coordinate_X;
        sound_mapped.Coordinate_Y = model.Coordinate_Y;
        sound_mapped.Width_m = model.Width_m;
        sound_mapped.Depth_m = model.Depth_m;
        sound_mapped.Wildlife = model.Wildlife;
        sound_mapped.Biome = model.Biome;
        sound_mapped.WaterHealth = model.WaterHealth;
        sound_mapped.Speed = model.Speed;
        sound_mapped.Currents = model.Currents;
        sound_mapped.Tides = model.Tides;
        sound_mapped.InvasiveSpecies = model.InvasiveSpecies;
        sound_mapped.IsResidential = model.IsResidential;
        sound_mapped.IsPublicLands = model.IsPublicLands;
        sound_mapped.Topography = model.Topography;
  
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        //System.Diagnostics.Debug.WriteLine("Add Data: " + model);   
        // validate
        if (_context.Sounds.Any(x => x.Name == model.Name))
            throw new AppException("This item: '" + model.Name + "' is already been entered.");

        System.Diagnostics.Debug.WriteLine("AddRequest model: " + model);
        System.Diagnostics.Debug.WriteLine("AddRequest model.Name: " + model.Name);
        //map model to new object
        //var sound = _map.Map<AddRequest, Sound>(model);
        //System.Diagnostics.Debug.WriteLine("AddRequest model.Name: " + sound);
        //var sound = _map.Map<Sound>(model);

        // save record
        _context.Sounds.Add(sound_mapped);
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var sound = getSound(id);

        // copy model to object and save
        _map.Map(model, sound);
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