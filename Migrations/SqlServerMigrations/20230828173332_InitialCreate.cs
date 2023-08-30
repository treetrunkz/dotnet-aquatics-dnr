using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sounds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionReq = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coordinate_X = table.Column<float>(type: "real", nullable: false),
                    Coordinate_Y = table.Column<float>(type: "real", nullable: false),
                    Width_m = table.Column<int>(type: "int", nullable: false),
                    Depth_m = table.Column<int>(type: "int", nullable: false),
                    Wildlife = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Biome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaterHealth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Speed = table.Column<float>(type: "real", nullable: false),
                    Currents = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tides = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvasiveSpecies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsResidential = table.Column<bool>(type: "bit", nullable: false),
                    IsPublicLands = table.Column<bool>(type: "bit", nullable: false),
                    Topography = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sounds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Permission = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sounds");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
