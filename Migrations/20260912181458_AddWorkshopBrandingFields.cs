using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarAutoCenter.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkshopBrandingFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "BusinessSettings",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "BusinessSettings",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "BusinessSettings");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "BusinessSettings");
        }
    }
}
