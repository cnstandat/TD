using AngleSharp.Parser.Html;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;

namespace TD
{
    public static class HTMLExtensions
    {
        public static async Task<string> GetSummary(this string html, int max = 200)
        {
            if (string.IsNullOrEmpty(html)) return null;
            string summaryHtml = string.Empty;
            var doc = new HtmlParser().Parse(html);
            // load our html document
            //HtmlDocument htmlDoc = new HtmlDocument();
            //htmlDoc.LoadHtml(html);
            InputCheck(doc);
            int wordCount = max;

            foreach (var element in doc.Body.ChildNodes)
            {
                if (wordCount == 0) break;
                // inner text will strip out all html, and give us plain text
                string elementText = element.TextContent;
                if (elementText.Length > wordCount)
                {
                    summaryHtml += elementText.Substring(0, wordCount);
                    wordCount = 0;
                }
                else
                {
                    summaryHtml += elementText;
                    wordCount -= elementText.Length;
                }
                // we split by space to get all the words in this element
                //string[] elementWords = elementText.Split(new char[] { ' ' });

                // and if we haven't used too many words ...
                //if (wordCount <= max)
                //{
                //    // add the *outer* HTML (which will have proper 
                //    // html formatting for this fragment) to the summary
                //    summaryHtml += element.InnerText;
                //    wordCount += element.InnerText.Length;
                //    summaryHtml += element.OuterHtml;

                //    wordCount += elementWords.Count() + 1;
                //}
                //else
                //{
                //    break;
                //}
            }

            return await summaryHtml.GetValidHtml();
        }
        public static async Task<string> GetValidHtml(this string html)
        {
            var parser = new HtmlParser();

            html.Replace("<script>", "<div>&lt;script&gt;</div>");
            html.Replace("</script>", "<div>&lt;/script&gt;</div>");
            var doc = await parser.ParseAsync(html);

            InputCheck(doc);
            if (doc.Body.HasChildNodes)
                return doc.Body.InnerHtml;
            else return "";
        }
        public static async Task<List<string>> GetValidHtmls(this string html, int max = 200)
        {
            var parser = new HtmlParser();
            var lst = new List<string>();
            html.Replace("<script>", "<div>&lt;script&gt;</div>");
            html.Replace("</script>", "<div>&lt;/script&gt;</div>");
            var doc = await parser.ParseAsync(html);

            InputCheck(doc);
            StringBuilder summaryHtml = new StringBuilder();
            if (doc.Body.HasChildNodes)
            {
                lst.Add(doc.Body.InnerHtml);

                int wordCount = max;
                foreach (var element in doc.Body.ChildNodes)
                {
                    if (wordCount == 0) break;
                    string elementText = element.TextContent;
                    string[] elementWords = elementText.Split(new char[] { ' ' });
                    if (wordCount <= max)
                    {
                        summaryHtml.Append(element.ToString());

                        wordCount += elementWords.Count() + 1;
                    }
                    else
                    {
                        break;
                    }
                }
            }
            return lst;
        }
        private static void LiTagsCheck(AngleSharp.Dom.Html.IHtmlDocument doc)
        {
            var firstLi = doc.All.FirstOrDefault(x => x.LocalName == "li" && (x.ParentElement == null || (x.ParentElement.LocalName != "ul" && x.ParentElement.LocalName != "ol")));
            while (firstLi != null)
            {
                var ul = doc.CreateElement("ul");
                var parent = firstLi.ParentElement;
                if (parent.HasChildNodes)
                {
                    var allChild = parent.Children.Where(x => x.LocalName == "li");
                    foreach (var item in allChild)
                    {
                        parent.RemoveChild(item);
                        ul.AppendChild(item);
                    }
                    parent.AppendChild(ul);
                    firstLi = doc.All.FirstOrDefault(x => x.LocalName == "li" && (x.ParentElement == null || (x.ParentElement.LocalName != "ul" && x.ParentElement.LocalName != "ol")));
                }

            }
        }
        static void InputCheck(AngleSharp.Dom.Html.IHtmlDocument doc)
        {

            LiTagsCheck(doc);
            var input = doc.QuerySelectorAll("input");
            foreach (var item in input)
            {
                if (!item.ClassList.Contains("ignore")) item.ClassList.Add("ignore");
            }
            var scripts = doc.Body.Children.Where(x => x.LocalName == "script" && x.ParentElement.LocalName != "code");

            foreach (var item in scripts)
            {
                var parent = item.ParentElement;
                parent.RemoveChild(item);

                var code = doc.CreateElement("code");
                code.AppendChild(item);
                parent.AppendChild(code);

            }

            var scritps = doc.Scripts.ToList();

            foreach (var item in scritps)
            {
                var pre = doc.CreateElement("pre");
                pre.ClassName = "code code-javascript";
                var code = doc.CreateElement("code");
                code.InnerHtml = HttpUtility.HtmlEncode(item.OuterHtml);
                pre.AppendChild(code);
                item.Remove();
                doc.Body.AppendChild(pre);
            }
            var codes = doc.Body.Children.Where(x => x.LocalName == "code" && x.ParentElement.LocalName != "pre");
            foreach (var item in codes)
            {
                var parent = item.ParentElement;
                parent.RemoveChild(item);

                var pre = doc.CreateElement("pre");
                pre.ClassName = "code code-javascript";
                pre.AppendChild(item);
                parent.AppendChild(pre);
            }
            var pres = doc.Body.Children.Where(x => x.LocalName == "pre");
            foreach (var item in pres)
            {
                if (!item.Children.Any(x => x.LocalName == "code"))
                {
                    var code = doc.CreateElement("code");
                    foreach (var c in item.Children)
                    {
                        c.Remove();
                        code.AppendChild(c);
                    }
                    item.AppendChild(code);
                }
                if (!item.ClassList.Contains("code"))
                    item.ClassList.Add("code");
                if (item.TextContent.Contains("script"))
                {
                    item.ClassList.Add("code-javascript");
                }
                else if (item.TextContent.Contains("style"))
                {
                    item.ClassList.Add("code-css");
                }
            }
            var empty = doc.Body.QuerySelectorAll(":empty");
            foreach (var item in empty)
            {
                if (!"img video".Contains(item.LocalName))
                {
                    item.Remove();
                }
                else if (item.LocalName == "img")
                {
                    var src = item.GetAttribute("src");
                    if (src.Contains(";base64,"))
                    {
                        string filePath = System.IO.Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "/data/img/upload");

                        var str = src.WriteImageString(filePath);
                        if (str.Success)
                        {
                            item.SetAttribute("src", str.FileName);
                        }

                    }
                }
            }
        }
    }
}
