using System;
using System.Linq;

namespace TD
{
    public class ImageResizeOption
    {
        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public ImageResizeOption(string Name, int width, int height)
        {
            this.Name = Name;
            Width = width;
            Height = height;
        }
    }
}
