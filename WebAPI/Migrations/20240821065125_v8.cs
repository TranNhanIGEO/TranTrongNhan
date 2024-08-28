using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoftKiwiFlorist.Migrations
{
    /// <inheritdoc />
    public partial class v8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingSessions_SessionStatuses_SessionStatusId",
                table: "ShoppingSessions");

            migrationBuilder.DropColumn(
                name: "NormalizedTerm",
                table: "ShoppingSessions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ShoppingSessions");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingSessions_SessionStatuses",
                table: "ShoppingSessions",
                column: "SessionStatusId",
                principalTable: "SessionStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingSessions_SessionStatuses",
                table: "ShoppingSessions");

            migrationBuilder.AddColumn<string>(
                name: "NormalizedTerm",
                table: "ShoppingSessions",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ShoppingSessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingSessions_SessionStatuses_SessionStatusId",
                table: "ShoppingSessions",
                column: "SessionStatusId",
                principalTable: "SessionStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
