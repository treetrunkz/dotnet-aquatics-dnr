namespace WebApi.Models.Sounds;

using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    public string Name { get; set; }
    public int Id { get; set; }
    public int PermissionReq { get; set; }
    public string Name { get; set; }
    public float Coordinate_X { get; set; }
    public float Coordinate_Y { get; set; }
    public int Width_m { get; set; }
    public int Depth_m { get; set; }
    public string Wildlife { get; set; }
    public string Biome { get; set; }
    public string Health { get; set; }
    public float Speed { get; set; }
    public string InvasiveSpecies { get; set; }
    public bool IsResidential { get; set; }
    public bool IsPublicLands { get; set; }
    public string Topography { get; set; }

}