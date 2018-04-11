using System;
using System.Linq;
using Newtonsoft.Json;

namespace TD
{
    public class ImageResult
    {

        public ImageResult()
        {
            this.Success = true;
        }
        public ImageResult(string Output, string Error, string FileName)
        {
            this.Success = string.IsNullOrEmpty(Error);
            this.Output = Output;
            this.Error = Error;
            this.FileName = FileName;
        }
        public ImageResult(string Description, bool Complete = true)
        {
            this.Success = Complete;
            this.Error = Description;
        }
        public bool Success { get; set; }
        [JsonIgnore]
        public string Output { get; set; }
        [JsonIgnore]
        public string Error { get; set; }
        public string Message
        {
            get
            {
                return string.Format("{0}{1}{2}", string.IsNullOrEmpty(Error) ? "" : "E:" + Error, "<br/>", string.IsNullOrEmpty(Output) ? "" : Output);
            }
        }
        public string FileName { get; set; }
    }
}
