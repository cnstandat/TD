using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace TD
{
    public static class DBExtensions
    {
        public static string GetModelStateError(this Controller controller)
        {
            var errors = controller.ModelState.Where(x => x.Value.Errors.Count > 0)
    .Select(x => new { x.Key, x.Value.Errors })
    .ToArray();
            StringBuilder sb = new StringBuilder();
            foreach (var e in errors)
            {
                foreach (var er in e.Errors)
                {
                    if (!string.IsNullOrEmpty(er.ErrorMessage))
                        sb.Append(er.ErrorMessage + "<br/>");
                    if (er.Exception != null)
                        sb.Append(er.Exception.GetExceptionString() + "<br/>");
                }
            }

            return sb.ToString();

        }
        public static async Task<string> SaveMessageAsync(this DbContext db)
        {
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return ex.GetExceptionString();
            }
            return null;
        }
        public static async Task SaveAsync(this DbContext db)
        {
            try
            {
                await db.SaveChangesAsync();
            }
            catch
            {
                return;
            }
            return;
        }
        public static DBAction SaveMessage(this DbContext db)
        {
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return new DBAction(ex.GetExceptionString(),ex.Entries);
            }

            catch (DbUpdateException ex)
            {
          
                return new DBAction(ex.GetExceptionString(),ex.Entries);
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var item in ex.EntityValidationErrors)
                    if (!item.IsValid)
                    {
                        //sb.Append(item.Entry.Entity.ToString());
                        foreach(var e in item.ValidationErrors)
                        {
                            sb.Append(e.PropertyName + ":" + e.ErrorMessage+Environment.NewLine);
                        }
                    }
                return new DBAction(sb.ToString());
            }
            catch (Exception ex)
            {
                return new DBAction(ex);
            }
            return new DBAction();
        }

    }
}
