using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace TD
{


    public static class EnumExtensions
    {
        public static IEnumerable<Enum> GetUniqueFlags(this Enum flags)
        {
            ulong flag = 1;
            var lst = new List<Enum>();
            foreach (var value in Enum.GetValues(flags.GetType()).Cast<Enum>())
                if (Convert.ToInt64(value) > -65536)
                {
                    ulong bits = Convert.ToUInt64(value);
                    while (flag < bits)
                    {
                        flag <<= 1;
                    }

                    if (flag == bits && flags.HasFlag(value))
                    {
                        lst.Add( value);
                    }
                }
            return lst;
        }
        public static bool Have(this Enum enumList, Enum value)
        {
            UInt64 list = Convert.ToUInt64(enumList);
            UInt64 number = Convert.ToUInt64(value);
            return (list & number) == number;
            // return (Convert.ToUInt64 (enumList) &Convert.ToUInt64( value)) == value;
        }
        ///<summary>
        ///Key=enum Value , Value=Descript
        ///</summary>
        public static Dictionary<int, string> GetDictionary(this Type t)
        {
            if (t == null)
                return null;
            if (!t.IsEnum)
                return null;
            string[] names = Enum.GetNames(t);
            Array values = Enum.GetValues(t);
            return (from i in Enumerable.Range(0, names.Length) select new { Value = names[i], Key = (int)values.GetValue(i) }).ToDictionary(k => k.Key, k => k.Value.GetEnumDescription(t));
        }
       
        public static IEnumerable GetList(this Type t)
        {
            if (t == null)
                return null;
            if (!t.IsEnum)
                return null;
          
            Array values = Enum.GetValues(t);
            var lst = new List<Enum>();
            for (int i = 0; i < values.Length; i++)
            {
                lst.Add((Enum) values.GetValue(i));
            }
            return lst;
        }
     

        public static T ToEnum<T>(this object value) where T : struct
        {
            if (value == null) return (T)Enum.Parse(typeof(T), "0");
            else return (T)Enum.Parse(typeof(T), value.ToString(), true);
        }
   
        public static string GetEnumDescription(this Enum value)
        {
            return GetEnumDescription(value.ToString(), value.GetType());
        }
        public static string GetEnumDescription(this string value, Type type)
        {
            var name = Enum.GetNames(type).Where(f => f.Equals(value, StringComparison.CurrentCultureIgnoreCase)).Select(d => d).FirstOrDefault();
            if (name == null)
                return string.Empty;
            var field = type.GetField(name);
            var customAttribute = field.GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
            return customAttribute.Length > 0 ? ((System.ComponentModel.DescriptionAttribute)customAttribute[0]).Description : name;
        }
    }
  
}
