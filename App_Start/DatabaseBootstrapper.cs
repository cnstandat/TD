using System;
using System.Linq;
using TD.Migrations;
using TD.Models;

namespace TD
{
    public class DatabaseBootstrapper
    {
        private readonly TDContext context;

        public DatabaseBootstrapper(TDContext context)
        {
            this.context = context;
        }

        public void Configure()
        {
            if (context.Database.Exists())
                return;

            context.Database.Create();
            SeedHelper.Seed(context);
        }
    }
}