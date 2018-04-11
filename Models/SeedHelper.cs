using System;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TD.Models;

namespace TD.Migrations
{
    public class SeedHelper
    {
        public static void Seed(TDContext db)
        {
            if (!db.Roles.Any(r => r.Name == "SysAdmin"))
            {
                var storeRole = new RoleStore<IdentityRole>(db);
                var managerRole = new RoleManager<IdentityRole>(storeRole);
                var role = new IdentityRole { Name = "SysAdmin" };

                managerRole.Create(role);
            }
            var store = new UserStore<User>(db);
            var manager = new UserManager(store);
            var sadmin = db.Users.FirstOrDefault(x => x.UserName == "sadmin");
            if (sadmin == null)
            {

                var user = new User("sadmin");// { UserName = "sadmin" };

                manager.Create(user, "pleasechange!");
                manager.AddToRole(user.Id, "SysAdmin");
                sadmin = db.Users.SingleOrDefault(x => x.UserName == "sadmin");
               
                db.SaveChanges();
            }
            var test = db.Users.FirstOrDefault(x => x.UserName == "test");
            if (test == null)
            {
                test = new User("test");// { UserName = "test" };
                manager.Create(test, "test!!");
                test = db.Users.FirstOrDefault(x => x.UserName == "test");
            }

           

        }

   
    }
}