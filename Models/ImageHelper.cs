using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using TD.Models;

namespace TD
{
    public class AppFileValue
    {
        public string Message { get; set; }
        public bool OK { get; set; }
        public AppFile Image { get; set; }
        public static AppFileValue Error(string Message)
        {
            return new AppFileValue
            {
                Message = Message,
                OK = false
            };
        }
        public static AppFileValue Success(AppFile Image, string Message = null)
        {
            return new AppFileValue
            {
                Message = Message,
                OK = true,
                Image = Image
            };

        }
    }
    public static class ImageHelper
    {
        public static async Task<AppFileValue> SaveImage(this TDContext db, string ImageData, string Path, string id=null)
        {
            AppFile find = null;
            if (id != null && id.Length > 0)
                find = await db.AppFiles.FindAsync(id);
            if (find == null)
            {
                var saveFile = ImageData.WriteImageString(Path);
                if (!saveFile.Success) return AppFileValue.Error(saveFile.Message);
                find = new AppFile(new DBHelper().GetAppFileId(db), saveFile.FileName);
                find.UploadType = UploadType.Image;
                find.FullPath = saveFile.Output.Replace(HttpContext.Current.Server.MapPath("~"), "").Replace("\\", "/");
                db.AppFiles.Add(find);
            }
            else
            {
                var filepath = HttpContext.Current.Server.MapPath("~"+find.FullPath);
                var saveFile = ImageData.WriteImageString(null, filepath);
                if (!saveFile.Success)
                    return AppFileValue.Error(saveFile.Message);
                find.FileName = saveFile.FileName;
                find.UploadType = UploadType.Image;
                find.FullPath = saveFile.Output.Replace(HttpContext.Current.Server.MapPath("~"), "").Replace("\\", "/");
                db.Entry(find).State = EntityState.Modified;
            }
            return AppFileValue.Success(find);
        }
    }
}