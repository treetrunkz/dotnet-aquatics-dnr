namespace WebApi.Entities;

using System.ComponentModel;
using System.Diagnostics.Metrics;
using System.Text.Json.Serialization;

public class Sound
{
    public Sound(int id, int permissionReq, string name, float coordinate_X, float coordinate_Y, int width_m, int depth_m, string wildlife, string biome, string waterHealth, float speed, string currents, string tides, string invasiveSpecies, bool isResidential, bool isPublicLands, string topography)
    {
        Id = id;
        PermissionReq = permissionReq;
        Name = name;
        Coordinate_X = coordinate_X;
        Coordinate_Y = coordinate_Y;
        Width_m = width_m;
        Depth_m = depth_m;
        Wildlife = wildlife;
        Biome = biome;
        WaterHealth = waterHealth;
        Speed = speed;
        Currents = currents;
        Tides = tides;
        InvasiveSpecies = invasiveSpecies;
        IsResidential = isResidential;
        IsPublicLands = isPublicLands;
        Topography = topography;
    }

    public int Id { get; set; }
    public int PermissionReq { get; set; }
    public string Name { get; set; }
    public float Coordinate_X { get; set; }
    public float Coordinate_Y { get; set; }
    public int Width_m { get; set; }
    public int Depth_m { get; set; }
    public string Wildlife { get; set; }
    public string Biome { get; set; }
    public string WaterHealth { get; set; }
    public float Speed { get; set; }
    public string Currents { get; set; }
    public string Tides { get; set; }
    public string InvasiveSpecies { get; set; }
    public bool IsResidential { get; set; }
    public bool IsPublicLands { get; set; }
    public string Topography { get; set; }
}