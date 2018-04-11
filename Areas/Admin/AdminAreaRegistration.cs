using System.Web.Mvc;
using System.Web.Routing;

namespace TD.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {

            //  context.MapRoute(
            //    "admin_config",
            //    "admin/{action}/{id}",
            //     new { controller = "HomeAdmin", id = UrlParameter.Optional },
            //     new { action = new ConfigConstraint(), }
            //);
            context.MapRoute(
                "Admin_default",
                "admin/{controller}/{action}/{id}",
                 new
                 {
                     controller = "Home",
                     action = "Index",
                     id = UrlParameter.Optional,
                 },
                 namespaces: new string[] { typeof(TD.Areas.Admin.Controllers.HomeController).Namespace }
            );
            //      context.MapRoute(
            //    "admin_controller",
            //    "Admin/{controller}"
            //);
        }
    }
}