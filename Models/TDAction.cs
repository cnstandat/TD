using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace TD.Models
{
    public static class TDActionExtensions
    {
        public static Js GetError(this string str)
        {
            return Js.Error(str);
        }
        public static Js GetNoData(this Controller control)
        {
            return GetError(Global.NoData);
        }
        public static Js GetError(this IdentityResult result)
        {
            var sb = new StringBuilder();
            foreach(var e in result.Errors)
            {
                sb.Append(e);
                sb.Append("<br/>");
            }
            return Js.Error(sb.ToString());
        }
      
    }
    public class Js
    {
        const string success = "success", warning = "warning", error = "danger";
        public string DataType { get; set; }
        public string Message { get; set; }
        public int Time { get; set; } = 1;
        public bool IsReload { get; set; }
        public string RedirectUrl { get; set; }
        public string Component { get; set; }
        public string Param { get; set; }
        public static Js Reload(string str = null)
        {
            return new Js
            {
                Message = str,
                IsReload = true,
                Time = string.IsNullOrEmpty(str) ? 0 : 1
            };
        }
        public static Js Error(string str = null, int? Time = null)
        {
            return new Js
            {
                Message = str ?? Global.GenericError,
                DataType = error,
                Time = Time ?? 180
            };
        }
        public static Js Success(string str, int Time = 1)
        {
            return new Js
            {
                Message = str,
                DataType = success,
                IsReload = false,
                Time = Time
            };
        }
        public static Js SuccessRedirect(string str, string redirect,int Time=1)
        {
            return new Js
            {
                Message = str,
                DataType = success,
                IsReload = false,
                Time = Time,
                RedirectUrl = redirect
            };
        }
        public static Js SuccessLoad(string str)
        {
            return new Js
            {
                Message = str,
                DataType = success,
                Time = 1,
                IsReload = true
            };
        }
        public static Js SuccessComponent(string str, string comp)
        {
            return new Js
            {
                DataType = success,
                Message = str,
                Component = comp,
            };
        }
        public static Js Warning(string str, string redirect = null, string data = null)
        {
            return new Js
            {
                DataType = warning,
                Message = str,
                RedirectUrl = redirect
            };
        }
        public static Js WarningComponent(string str, string Component, string number)
        {
            return new Js
            {
                DataType = warning,
                Message = str,
                Component = Component,
                Param = number
            };
        }


        public Js()
        {
            this.Time = 1;
        }


    }
}