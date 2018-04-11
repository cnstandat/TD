//using HtmlAgilityPack;
using System;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;

namespace TD
{
    public static class VNLangExtensions
    {
        private static readonly string[] VietnameseSigns = new string[]
        {

            "aAeEoOuUiIdDyY",

            "áàạảãâấầậẩẫăắằặẳẵ",

            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

            "éèẹẻẽêếềệểễ",

            "ÉÈẸẺẼÊẾỀỆỂỄ",

            "óòọỏõôốồộổỗơớờợởỡ",

            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

            "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ",

            "íìịỉĩ",

            "ÍÌỊỈĨ",

            "đ",

            "Đ",

            "ýỳỵỷỹ",

            "ÝỲỴỶỸ"

        };
        #region Kinh dịch
        private static readonly string[] VietnameseSigns2 = new string[]
        {

            "aAeEoOuUiI'yY",

            "áàạảãâấầậẩẫăắằặẳẵ",

            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

            "éèẹẻẽêếềệểễ",

            "ÉÈẸẺẼÊẾỀỆỂỄ",

            "óòọỏõôốồộổỗơớờợởỡ",

            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

            "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ",

            "íìịỉĩ",

            "ÍÌỊỈĨ",
 "Đ",


            "ýỳỵỷỹ",

            "ÝỲỴỶỸ"

        };
        #endregion


        public static string ToShortString(this string str, char replace = ' ', char replace2 = ';')
        {
            var len = str.Length;
            var src = str.ToCharArray();
            int dstIdx = 0;
            bool pre = false;
            //bool pre2 = false;
            for (int i = 0; i < len; i++)
            {
                var ch = src[i];
                switch (ch)
                {
                    case '\u0020':
                    case '\u00A0':
                    case '\u1680':
                    case '\u2000':
                    case '\u2001':
                    case '\u2002':
                    case '\u2003':
                    case '\u2004':
                    case '\u2005':
                    case '\u2006':
                    case '\u2007':
                    case '\u2008':
                    case '\u2009':
                    case '\u200A':
                    case '\u202F':
                    case '\u205F':
                    case '\u3000':
                    case '\u2028':
                    case '\u2029':
                    case '\u0009':
                    case '\u000A':
                    case '\u000B':
                    case '\u000C':
                    case '\u000D':
                    case '\u0085':
                        if (!pre)
                        {
                            pre = true;
                            src[dstIdx++] = replace;
                        }
                        continue;
                    //case ';':
                    //    if (!pre2)
                    //    {
                    //        pre2 = true;
                    //        src[dstIdx++] = replace2;
                    //    }
                    //continue;
                    default:
                        src[dstIdx++] = ch;
                        pre = false;
                        break;
                }
                // using the switch above is faster than calling the method (even when inlined)
                /*if (!isWhiteSpace(ch))
                    src[dstIdx++] = ch;*/
            }
            return new string(src, 0, dstIdx);
        }
        public static string convertToUnSign3(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
        public static string BoDau(this string str)
        {

            for (int i = 1; i < VietnameseSigns.Length; i++)
            {

                for (int j = 0; j < VietnameseSigns[i].Length; j++)

                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);

            }
            return str;
        }
        public static string BoDau2(this string str)
        {

            for (int i = 1; i < VietnameseSigns2.Length; i++)
            {

                for (int j = 0; j < VietnameseSigns2[i].Length; j++)

                    str = str.Replace(VietnameseSigns2[i][j], VietnameseSigns2[0][i - 1]);

            }
            return str;
        }
        public static string Says(this decimal number, string DonViTinh = "đồng")
        {
            if (number == 0) return "Không " + DonViTinh;
            string s = number.ToString("#");
            string[] so = new string[] { "không ", "một ", "hai ", "ba ", "bốn ", "năm ", "sáu ", "bảy ", "tám ", "chín " };
            string[] hang = new string[] { "", "nghìn ", "triệu ", "tỷ " };
            int i, j, donvi, chuc, tram;
            StringBuilder str = new StringBuilder();
            str.Append(" ");
            bool bAm = false;
            decimal decS = 0;
            if (!string.IsNullOrEmpty(s))
            {
                try
                {
                    decS = Convert.ToDecimal(s);
                }
                catch
                {

                }
                if (decS < 0)
                {
                    decS = -decS;
                    s = decS.ToString();
                    bAm = true;
                }
                i = s.Length;
                if (i == 0)
                    str.Insert(0, so[0]);
                else
                {
                    j = 0;
                    while (i > 0)
                    {
                        donvi = Convert.ToInt32(s.Substring(i - 1, 1));
                        i--;
                        if (i > 0)
                            chuc = Convert.ToInt32(s.Substring(i - 1, 1));
                        else
                            chuc = -1;
                        i--;
                        if (i > 0)
                            tram = Convert.ToInt32(s.Substring(i - 1, 1));
                        else
                            tram = -1;
                        i--;
                        if ((donvi > 0) || (chuc > 0) || (tram > 0) || (j == 3))
                            str.Insert(0, hang[j]);
                        j++;
                        if (j > 3) j = 1;
                        if ((donvi == 1) && (chuc > 1))
                            str.Insert(0, "một ");
                        else
                        {
                            if ((donvi == 5) && (chuc > 0))
                                str.Insert(0, "lăm ");
                            else if (donvi > 0)
                                str.Insert(0, so[donvi]);
                        }
                        if (chuc < 0)
                            break;
                        else
                        {
                            if ((chuc == 0) && (donvi > 0)) str.Insert(0, "lẻ ");
                            if (chuc == 1) str.Insert(0, "mười ");
                            if (chuc > 1) str.Insert(0, so[chuc] + "mươi ");
                        }
                        if (tram < 0) break;
                        else
                        {
                            if ((tram > 0) || (chuc > 0) || (donvi > 0)) str.Insert(0, so[tram] + "trăm ");
                        }
                        str.Insert(0, "");
                    }
                }

                if (bAm) str.Insert(0, "Âm ");
                str.Append(DonViTinh);
                str[0] = Char.ToUpper(str[0]);
                return str.Replace("  ", " ").ToString();
            }
            else
                return "Chuỗi lỗi";
        }
        [MethodImpl(MethodImplOptions.AggressiveInlining)] // if it does not get inlined then it will be slow!!!

        public static bool isWhiteSpace(char ch)
        {
            // this is surprisingly faster than the equivalent if statement
            switch (ch)
            {
                case '\u0009':
                case '\u000A':
                case '\u000B':
                case '\u000C':
                case '\u000D':
                case '\u0020':
                case '\u0085':
                case '\u00A0':
                case '\u1680':
                case '\u2000':
                case '\u2001':
                case '\u2002':
                case '\u2003':
                case '\u2004':
                case '\u2005':
                case '\u2006':
                case '\u2007':
                case '\u2008':
                case '\u2009':
                case '\u200A':
                case '\u2028':
                case '\u2029':
                case '\u202F':
                case '\u205F':
                case '\u3000':
                    return true;
                default:
                    return false;
            }
        }
        public static string GetDBName(this object value, string DefaultDatabaseName)
        {
            if (value == null) return DefaultDatabaseName;
            var str = value.ToString();
            if (string.IsNullOrEmpty(str)) return DefaultDatabaseName;
            return Regex.Replace(str, "[^a-zA-Z]+", "");
            //var len = str.Length;
            //var src = str.ToCharArray();
            //int dstIdx = 0;
            //bool pre = false;
            //for (int i = 0; i < len; i++)
            //{
            //    var ch = src[i];

            //    if (isWhiteSpace(ch))
            //    {
            //        if (!pre)
            //        {
            //            pre = true;
            //            src[dstIdx++] = replace;
            //        }

            //    }
            //    else
            //    {
            //        src[dstIdx++] = ch;
            //        pre = false;
            //    }
            //}
            //return new string(src, 0, dstIdx);
        }
        public static string GetSafeName(this string str)
        {
            return str.BoDau().ToLower().TrimAllWithInplaceCharArray();
        }
        public static string TrimAllWithInplaceCharArray(this string str, char replace = '-')
        {
            return Regex.Replace(str, "[^0-9a-zA-Z]+", replace.ToString());
            //var len = str.Length;
            //var src = str.ToCharArray();
            //int dstIdx = 0;
            //bool pre = false;
            //for (int i = 0; i < len; i++)
            //{
            //    var ch = src[i];

            //    if (isWhiteSpace(ch))
            //    {
            //        if (!pre)
            //        {
            //            pre = true;
            //            src[dstIdx++] = replace;
            //        }

            //    }
            //    else
            //    {
            //        src[dstIdx++] = ch;
            //        pre = false;
            //    }
            //}
            //return new string(src, 0, dstIdx);
        }


    }
}
