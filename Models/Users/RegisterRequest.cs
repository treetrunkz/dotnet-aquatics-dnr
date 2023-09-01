namespace WebApi.Models.Users;

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    [Display(Name = "Firstname")]
    public string FirstName { get; set; }

    [Required]
    [Display(Name = "Lastname")]
    public string LastName { get; set; }
        
    [Required]
    [Display(Name = "Username")]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long."), MinLength(6), MaxLength(50) ]
    public string Username { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }

    [Required]
    [DefaultValue(1)]
    public int Permission { get; set; }
}