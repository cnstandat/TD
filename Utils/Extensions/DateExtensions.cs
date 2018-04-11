using System;
using System.Linq;
using System.Text;

namespace TD
{
    public static class DateExtensions
    {
        #region Add Work Day
        public static bool IsWeekday(this DayOfWeek dow)
        {
            switch (dow)
            {
                case DayOfWeek.Sunday:
                case DayOfWeek.Saturday:
                    return false;

                default:
                    return true;
            }
        }


        #endregion

        public static bool IsWeekend(this DayOfWeek dow)
        {
            return !dow.IsWeekday();
        }

        public static Int64 DateDiff(this DateTime StartDate, String DatePart, DateTime EndDate)
        {
            Int64 DateDiffVal = 0;
            System.Globalization.Calendar cal = System.Threading.Thread.CurrentThread.CurrentCulture.Calendar;
            TimeSpan ts = new TimeSpan(EndDate.Ticks - StartDate.Ticks);
            switch (DatePart.ToLower().Trim())
            {
                case "year":
                case "yy":
                case "yyyy":
                    DateDiffVal = (Int64)(cal.GetYear(EndDate) - cal.GetYear(StartDate));
                    break;
                case "quarter":
                case "qq":
                case "q":
                    DateDiffVal = (Int64)((((cal.GetYear(EndDate) - cal.GetYear(StartDate)) * 4) + ((cal.GetMonth(EndDate) - 1) / 3)) - ((cal.GetMonth(StartDate) - 1) / 3));
                    break;
                case "month":
                case "mm":
                case "m":
                    DateDiffVal = (Int64)(((cal.GetYear(EndDate) - cal.GetYear(StartDate)) * 12 + cal.GetMonth(EndDate)) - cal.GetMonth(StartDate));
                    break;
                case "day":
                case "d":
                case "dd":
                    DateDiffVal = (Int64)ts.TotalDays;
                    break;
                case "week":
                case "wk":
                case "ww":
                    DateDiffVal = (Int64)(ts.TotalDays / 7);
                    break;
                case "hour":
                case "hh":
                    DateDiffVal = (Int64)ts.TotalHours;
                    break;
                case "minute":
                case "mi":
                case "n":
                    DateDiffVal = (Int64)ts.TotalMinutes;
                    break;
                case "second":
                case "ss":
                case "s":
                    DateDiffVal = (Int64)ts.TotalSeconds;
                    break;
                case "millisecond":
                case "ms":
                    DateDiffVal = (Int64)ts.TotalMilliseconds;
                    break;
                default:
                    throw new Exception(String.Format("DatePart \"{0}\" is unknown", DatePart));
            }
            return DateDiffVal;
        }
        public static DateTime AddWorkDays(this DateTime startDate, int days)
        {
            // start from a weekday        
            while (startDate.DayOfWeek.IsWeekend())
                startDate = startDate.AddDays(1.0);
            for (int i = 0; i < days; ++i)
            {
                startDate = startDate.AddDays(1.0);
                while (startDate.DayOfWeek.IsWeekend())
                    startDate = startDate.AddDays(1.0);
            }
            return startDate;
        }
        public static DateTime FirstDayOfMonth(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1);
        }
        public static DateTime LastDayOfMonth(this DateTime date)
        {
            if (date.Month < 12)
                return new DateTime(date.Year, date.Month + 1, 1).AddDays(-1);
            else
                return new DateTime(date.Year, 12, 31);
        }
        public static DateTime FirstDayOfYear(this DateTime date)
        {
            return new DateTime(date.Year, 1, 1);
        }
        public static DateTime LastDayOfYear(this DateTime date)
        {
            return new DateTime(date.Year+1, 1, 1).AddDays(-1);
        }
        public static string ToUtcString(this DateTime d)
        {
            string format = ShareOptions.UCTString;
            return d.ToString(format);
        }
        public static string ToSystemFile(this DateTime d,string seperator="_")
        {
            return string.Format("{3}{0}{3}{1}{3]{2}", d.Year, d.Month, d.Day,seperator);
        }

        public static DateTime ThisWeekMonday(this DateTime dt)
        {
            var today = DateTime.Now;
            return new System.Globalization.GregorianCalendar().AddDays(today, -((int)today.DayOfWeek) + 1);
        }

    }
}
