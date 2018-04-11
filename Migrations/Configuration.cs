
using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
namespace TD.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<TD.Models.TDContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(TD.Models.TDContext context)
        {
            SeedHelper.Seed(context);
        }
    }
}
