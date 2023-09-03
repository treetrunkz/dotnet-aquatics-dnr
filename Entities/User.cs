using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.Schema;
using System.ComponentModel;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Features;

namespace WebApi.Entities;
public class User
    {
        [DisplayName("Id")]
        public int Id { get; set; }

        [DisplayName("FirstName")]
        public string FirstName { get; set; }

        [DisplayName("LastName")]
        public string LastName { get; set; }

        [DisplayName("UserName")]
        public string Username { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }

        [DisplayName("Permission")]
        public int Permission { get; set; }
    }
