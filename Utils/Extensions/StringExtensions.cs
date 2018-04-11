using System;
using System.Linq;

namespace TD
{
    public static class StringExtensions
    {
        public static bool NotNull(this string str)
        {
            return !string.IsNullOrEmpty(str);
        }
        public static bool Have(this string str,params string[] args)
        {
            if (args == null) return false;
            if (args.Length == 0) return false;
            foreach(string paternSearch in args)
            {
                if (str.Contains(paternSearch)) return true;
            }
            return false;
        }
        public static bool HaveEnd(this string str,params string[] args)
        {
            if (args == null) return false;
            if (args.Length == 0) return false;
            foreach (string paternSearch in args)
            {
                if (str.EndsWith(paternSearch)) return true;
            }
            return false;
        }
    }
}
