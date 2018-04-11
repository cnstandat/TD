using Microsoft.AspNet.Identity;
using System;
using System.IO;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;

namespace TD.Controllers
{
    [Authorize]
    public class FileApiController : Controller
    {
        TDContext db = new TDContext();
        const string uploadPath = "";
        public ActionResult UploadFile()
        {
            try
            {
                return Json(TD.File.Upload(System.Web.HttpContext.Current, uploadPath));
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        public ActionResult UploadImage(string ImageData)
        {
            var file = ImageData.Base64MimeType();
            if (file == null) return Json(Js.Error("Dữ liệu không đúng"));

            var saveFile = ImageData.WriteImageString("upload\\" + User.Identity.GetUserId());
            if (!saveFile.Success) return Json(new {
                Success=false,
                Message=saveFile.Message
            });
            db.AppFiles.Add(new AppFile(new DBHelper().GetAppFileId(db),saveFile.FileName));
            return Json(new
            {
                Success = true,
                FileName ="/data/img/upload/"+User.Identity.GetUserId()+"/"+ saveFile.FileName
            });
        }
        [HttpGet]
        public ActionResult LoadImages()
        {
            try
            {
                return Json(TD.Image.List(string.Format("/data/img/upload/{0}/", User.Identity.GetUserId())), JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        public ActionResult UploadFileValidation()
        {


            Func<string, string, bool> validationFunction = (filePath, mimeType) =>
            {

                long size = new System.IO.FileInfo(filePath).Length;
                if (size > 10 * 1024 * 1024)
                {
                    return false;
                }

                return true;
            };

            TD.FileOptions options = new TD.FileOptions
            {
                Fieldname = "myFile",
                Validation = new TD.FileValidation(validationFunction)
            };

            try
            {
                return Json(TD.Image.Upload(System.Web.HttpContext.Current, uploadPath, options));
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        public ActionResult DeleteFile()
        {
            try
            {
                TD.File.Delete(HttpContext.Request.Form["src"]);
                return Json(true);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        public ActionResult DeleteImage()
        {
            try
            {
                TD.Image.Delete(HttpContext.Request.Form["src"]);
                return Json(true);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        public ActionResult Error()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }

            }
            base.Dispose(disposing);
        }
    }
}
