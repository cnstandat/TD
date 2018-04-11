using System.Web.Mvc;

namespace TD.Areas.RM
{
    public class RMAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "RM";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "RM_default",
                "RM/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] {typeof(TD.Areas.RM.Controllers.RegController).Namespace}
            );
        }
    }
}