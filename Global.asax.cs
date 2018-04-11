using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

using System.Web.Routing;

namespace TD
{
    public class TDApp : System.Web.HttpApplication
    {
        protected void Application_Start()
        {

            ShareOptions.RootPath = Server.MapPath("~");
            ViewEngines.Engines.Clear();
            var customEngine = new RazorViewEngine();
            customEngine.PartialViewLocationFormats = new string[]
            {
    "~/Views/{1}/{0}.cshtml",
    "~/Views/Shared/{0}.cshtml",
    "~/Views/Partial/{0}.cshtml",
    "~/Views/Partial/{1}/{0}.cshtml"
            };
            customEngine.ViewLocationFormats = new string[]
            {
            "~/Views/{1}/{0}.cshtml",
            "~/Views/Shared/{0}.cshtml",
            "~/Views/Controller/{1}/{0}.cshtml"
            };

            customEngine.MasterLocationFormats = new string[]
            {
            "~/Views/Shared/{0}.cshtml",
            "~/Views/Layout/{0}.cshtml"
            };

            ViewEngines.Engines.Add(customEngine);
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            new DatabaseBootstrapper(new Models.TDContext()).Configure();
        }
    }
}
