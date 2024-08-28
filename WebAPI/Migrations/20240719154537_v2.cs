using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoftKiwiFlorist.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "PromotionProducts");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "PromotionProducts");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "PromotionCategories");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "PromotionCategories");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "Promotions",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountPercentage",
                table: "Promotions",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Promotions");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "Promotions");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "PromotionProducts",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountPercentage",
                table: "PromotionProducts",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "PromotionCategories",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountPercentage",
                table: "PromotionCategories",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
