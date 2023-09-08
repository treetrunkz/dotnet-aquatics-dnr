namespace WebApi.Models.Sounds;

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class AddRequest
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [DefaultValue(1)]
    [DisplayName("Permissions")]
    public int PermissionReq { get; set; }

    [Required]
    [DisplayName("Name")]
    public string Name { get; set; }

    [Required]
    [DisplayName("Latitude")]
    public float Coordinate_X { get; set; }

    [Required]
    [DisplayName("Longitude")]
    public float Coordinate_Y { get; set; }

    [Required]
    [DisplayName("Width (m)")]
    public int Width_m { get; set; }

    [Required]
    [DisplayName("Depth (m)")]
    public int Depth_m { get; set; }

    [Required]
    [DisplayName("Wildlife")]
    public string Wildlife { get; set; }

    [Required]
    [DisplayName("Biome")]
    public string Biome { get; set; }

    [Required]
    [DisplayName("Water Health")]
    public string WaterHealth { get; set; }

    [Required]
    [DisplayName("Speed")]
    public float Speed { get; set; }

    [Required]
    [DisplayName("Currents")]
    public string Currents { get; set; }

    [Required]
    [DisplayName("Tides")]
    public string Tides { get; set; }

    [Required]
    [DisplayName("Invasive Species")]
    public string InvasiveSpecies { get; set; }

    [Required]
    [DisplayName("Residential")]
    public bool IsResidential { get; set; }

    [Required]
    [DisplayName("Public Lands")]
    public bool IsPublicLands { get; set; }

    [Required]
    [DisplayName("Topography")]
    public string Topography { get; set; }
}