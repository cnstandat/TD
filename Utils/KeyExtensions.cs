using System;
using System.Linq;
using System.Windows.Forms;

namespace TD
{
    public static class KeyExtensions
    {
        public static string KeysToString(this Keys key)
        {
            string result = "";
            string all = key.ToString();
            var arr = all.Split(',');
            if (all.Contains("Control")) result = "Ctrl + ";
            if (all.Contains("Alt")) result += "Alt + ";
            foreach (var k in arr)
            {
                if (!string.IsNullOrEmpty(k) && !k.Contains("Control") && !k.Contains("Alt")) result += k + " +";
            }
            if (result.EndsWith(" +")) result = result.Substring(0, result.Length - 2);
            return result;
        }
    }
}
