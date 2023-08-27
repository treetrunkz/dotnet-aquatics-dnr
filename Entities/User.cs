namespace WebApi.Entities;

using System.ComponentModel;
using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }

    [DefaultValue(0)]
    public int Permission { get; set; }

    [JsonIgnore]
    public string PasswordHash { get; set; }
}