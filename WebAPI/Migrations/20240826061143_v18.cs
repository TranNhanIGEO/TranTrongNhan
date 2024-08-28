using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoftKiwiFlorist.Migrations
{
    /// <inheritdoc />
    public partial class v18 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Bought",
                table: "Products",
                newName: "Sold");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sold",
                table: "Products",
                newName: "Bought");
        }
    }
}
