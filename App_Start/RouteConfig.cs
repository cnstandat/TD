using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TD
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //     name: "GetMoreBlog",
            //     url: "GetMoreBlog/{id}/{page}/{year}/{month}",
            //     defaults: new { controller = "Home", action = "GetMoreBlog", year = UrlParameter.Optional, month = UrlParameter.Optional, id = UrlParameter.Optional, page = UrlParameter.Optional }
            // );
            routes.MapRoute(
                 name: "Blog",
                 url: "Blog/{id}/{year}/{month}",
                 defaults: new { controller = "Home", action = "Blog", year = UrlParameter.Optional, month = UrlParameter.Optional, id = UrlParameter.Optional },
                    namespaces: new string[] { "TD.Controllers" }
             );
            //routes.MapRoute(
            //     name: "LoadMoreComment",
            //     url: "LoadMoreComment/{id}/{page}",
            //     defaults: new { controller = "Home", action = "LoadMoreComment" }
            // );
            //routes.MapRoute(
            //     name: "LoadCommentChild",
            //     url: "LoadCommentChild/{id}/{page}",
            //     defaults: new { controller = "Home", action = "LoadCommentChild" }
            // );
            routes.MapRoute(
                name: "ViewPost",
                url: "ViewPost/{id}",
                defaults: new { controller = "Home", action = "ViewPost" },
                   namespaces: new string[] { "TD.Controllers" }
            );

            routes.MapRoute(
              name: "Default",
              url: "{controller}/{action}/{id}",
              defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
              namespaces: new string[] { "TD.Controllers" }

          );
        }
    }
}
