using System;
using System.Linq;

namespace TD
{
    public static class GetValueExtensions
    {
        //public static System.Data.DataRow GetCurrentRow(this System.Windows.Forms.BindingSource oBindingSource)
        //{
        //    System.Data.DataRow result = null;
        //    if (oBindingSource != null && !oBindingSource.IsBindingSuspended && oBindingSource.Current != null)
        //    {
        //        result = ((System.Data.DataRowView)oBindingSource.Current).Row;
        //    }
        //    return result;
        //}

        public static readonly DateTime minDate = new DateTime(1900, 1, 1);
        public static bool ToBoolean(this object value)
        {
            if (value == null) return false;
            if (!bool.TryParse(value.ToString(), out bool returnValue)) returnValue = false;
            return returnValue;
        }
        public static Int64 ToLong(this object value)
        {
            if (value == null) return 0;
            if (Int64.TryParse(value.ToString(), out long v)) return v;
            else return 0;
        }
        public static DateTime ToDate(this object value)
        {
            DateTime date = DateTime.Now;
            if (DateTime.TryParse(value.ToString(), out date)) return date;
            else return DateTime.MinValue;
        }
        public static Int32 ToInt32(this object value)
        {
            if (value == null) return 0;
            if (!Int32.TryParse(value.ToString(), out int returnValue)) returnValue = 0;
            return returnValue;
        }
        public static decimal ToDecimal(this object value)
        {
            if (value == null) return 0;
            if (!decimal.TryParse(value.ToString(), out decimal returnValue)) returnValue = 0;
            return returnValue;
        }
        public static decimal GetDecimal(this object value, decimal defaultValue = 0m)
        {
            if (value == DBNull.Value) return defaultValue;
            if (!decimal.TryParse(value.ToString(), out decimal result)) return defaultValue;
            return result;
        }
        public static int GetInt32(this object value, int defaultValue = 0)
        {
            if (value == DBNull.Value) return defaultValue;
            if (!int.TryParse(value.ToString(), out int result)) return defaultValue;
            return result;
        }
        public static bool GetBoolean(this object value, bool defaultValue = false)
        {
            if (value == DBNull.Value) return defaultValue;
            if (!bool.TryParse(value.ToString(), out bool result)) return defaultValue;
            return result;
        }
        public static DateTime GetDateTime(this object value)
        {
            DateTime result = DateTime.MinValue;
            if (value == DBNull.Value) return minDate;
            if (!DateTime.TryParse(value.ToString(), out result)) return minDate;
            return result;
        }
        public static Guid ToGuid(this object value)
        {
            if (value == null) return Guid.Empty;
            if (Guid.TryParse(value.ToString(), out Guid g)) return g;
            return Guid.Empty;
        }
        public static string GetString(this object value, string defaultValue = "")
        {
            string result = string.Empty;
            if (value == DBNull.Value) return defaultValue;
            if (value == null) return null;
            return value.ToString();
        }

    
    }
}
