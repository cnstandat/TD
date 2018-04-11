using System.Web.Mvc;

namespace TD.Areas.V4
{
    public class V4AreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "V4";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "V4_default",
                "V4/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}