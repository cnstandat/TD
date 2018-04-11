using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace TD.Areas.Admin
{
    public class ConfigConstraint : IRouteConstraint
    {
        private readonly List<string> _promos = new List<string> { "Config", "CreatePage","EditPage","DeletePage","CreateGallery","EditGallery","GetPages","DeleteGallery","Pages","Gallery" };

        public bool Match(
            HttpContextBase httpContext
            , Route route
            , string parameterName
            , RouteValueDictionary values
            , RouteDirection routeDirection
        )
        {
            object value;
            if (!values.TryGetValue(parameterName, out value)) return false;

            var str = value as string;
            if (str == null) return false;

            return _promos.Any(promo => promo.ToLower() == str.ToLower());
        }
    }
}