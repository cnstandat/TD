using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using TD.Models;
using TD.Models.Views;
using System.Web.Routing;
using System.Collections.Generic;
using System.Reflection;
using TD.Admin.Views;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin,Admin,BlogManager,UserManager")]
    public partial class HomeController : Controller
    {
        TDContext db = new TDContext();

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }

        public async Task<ActionResult> Config(string id)
        {
            if (string.IsNullOrEmpty(id))
                return View();
            else
            {
                var config = db.DPages.Find(id);
                if (config == null)
                    config = new DPage
                    {
                        Id = id,
                        CreatorId = User.Identity.GetUserId(),
                        LastModify = DateTime.UtcNow
                    };
                await db.SaveAsync();
                return View("Pages", new DPageViewModel
                {
                    Id = config.Id,
                    Name = config.Name,
                    Content = config.Content
                });
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Config(DPageViewModel view)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var data = db.DPages.Find(view.Id);
            view.Content = await view.Content.GetValidHtml();
            if (data == null)
            {
                data = new DPage(view)
                {
                    CreatorId = User.Identity.GetUserId(),
                    LastModify = DateTime.UtcNow
                };
                db.DPages.Add(data);
                var str =await db.SaveMessageAsync();
                if (str!=null) return Json(Js.Error(str));
            }
            else
            {
                data.Name = view.Name;
                data.Content = await view.Content.GetValidHtml();
                data.LastModify = DateTime.UtcNow;
                data.ModifyId = User.Identity.GetUserId();
                db.Entry(data).State = System.Data.Entity.EntityState.Modified;
                var str =await db.SaveMessageAsync();
                if (str!=null) return Json(Js.Error(str));
            }
            return Json(Js.SuccessRedirect("Đã lưu trang", "/admin/home/config"));
        }

        public virtual ActionResult Index()
        {
            var list = GetSubClasses<Controller>();

            // Get all controllers with their actions
            var getAllcontrollers = (from item in list
                                     let name = item.Name
                                  //   where !item.Name.StartsWith("T4MVC_") // I'm using T4MVC
                                     select new MyController()
                                     {
                                         Name = name.Replace("Controller", ""),
                                         Namespace = item.Namespace,
                                         MyActions = GetListOfAction(item)
                                     }).ToList();

            // Now we will get all areas that has been registered in route collection
            var getAllAreas = RouteTable.Routes.OfType<Route>()
                .Where(d => d.DataTokens != null && d.DataTokens.ContainsKey("area"))
                .Select(
                    r =>
                        new MyArea
                        {
                            Name = r.DataTokens["area"].ToString(),
                            Namespace = r.DataTokens["Namespaces"] as IList<string>,
                        }).ToList()
                .Distinct().ToList();


            // Add a new area for default controllers
            getAllAreas.Insert(0, new MyArea()
            {
                Name = "Main",
                Namespace = new List<string>()
            {
                typeof (TD.Controllers.HomeController).Namespace
            }
            });


            foreach (var area in getAllAreas)
            {
                var temp = new List<MyController>();
                foreach (var item in area.Namespace)
                {
                    temp.AddRange(getAllcontrollers.Where(x => x.Namespace == item).ToList());
                }
                area.MyControllers = temp;
            }

            return View(getAllAreas);
        }

        private static List<Type> GetSubClasses<T>()
        {
            return Assembly.GetCallingAssembly().GetTypes().Where(
                type => type.IsSubclassOf(typeof(T))).ToList();
        }

        private IEnumerable<MyAction> GetListOfAction(Type controller)
        {
            var navItems = new List<MyAction>();

            // Get a descriptor of this controller
            ReflectedControllerDescriptor controllerDesc = new ReflectedControllerDescriptor(controller);

            // Look at each action in the controller
            foreach (ActionDescriptor action in controllerDesc.GetCanonicalActions())
            {
                bool validAction = true;
                bool isHttpPost = false;

                // Get any attributes (filters) on the action
                object[] attributes = action.GetCustomAttributes(false);

                // Look at each attribute
                foreach (object filter in attributes)
                {
                    // Can we navigate to the action?
                    if (filter is ChildActionOnlyAttribute)
                    {
                        validAction = false;
                        break;
                    }
                    if (filter is HttpPostAttribute)
                    {
                        isHttpPost = true;
                    }

                }

                // Add the action to the list if it's "valid"
                if (validAction)
                    navItems.Add(new MyAction()
                    {
                        Name = action.ActionName,
                        IsHttpPost = isHttpPost
                    });
            }
            return navItems;
        }


        [HttpPost]

        [ValidateAntiForgeryToken]
        public ActionResult ResetDefaultData()
        {
            var fileData = Server.MapPath("~/data/default.json");
            if (!fileData.IsExits()) return Json(Js.Error("Chưa có file mẫu"));
            var data = Newtonsoft.Json.JsonConvert.DeserializeObject(fileData.LoadFromFile());

            return Json(Js.Success("Đang khởi tạo"));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SaveCurrentData()
        {
            var fileData = Server.MapPath("~/data/default.json");
            if (!fileData.IsExits()) return Json(Js.Error("Chưa có file mẫu"));
            var data = Newtonsoft.Json.JsonConvert.DeserializeObject(fileData.LoadFromFile());

            return Json(Js.Success("Đang khởi tạo"));
        }
        [HttpPost]

        [ValidateAntiForgeryToken]
        public ActionResult OptimizerImage()
        {
            var progress = ImageExtensions.OptimizeImages();
            return Json(Js.Success(progress, 180));
        }
     
    }
}