using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TD
{
    public static class ImageExtensions
    {

        public static string DefaultPath = "\\data\\img";
        public static void DrawWatermarkText(Graphics graphics, string text, string fontName = "Segoe UI")
        {
            int imageHeight = (int)graphics.VisibleClipBounds.Height;
            int imageWidth = (int)graphics.VisibleClipBounds.Width;
            int maxTextWidth = (int)(imageHeight * 0.4);
            int[] fontSizes = new int[] { 72, 48, 36, 24, 18, 18, 14, 12, 10 };
            Font font = null;
            foreach (int fontSize in fontSizes)
            {
                font = new Font(fontName, fontSize, GraphicsUnit.Pixel);
                if (graphics.MeasureString(text, font).Width <= maxTextWidth)
                    break;
            }
            GraphicsState state = graphics.Save();

            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
            graphics.RotateTransform(-90);
            float padding = font.Size / 2;
            graphics.TranslateTransform(-imageHeight + padding, imageWidth - font.GetHeight() - padding);
            graphics.TextContrast = 12;
            graphics.PageUnit = font.Unit;
            graphics.DrawString(text, font, new SolidBrush(Color.FromArgb(120, Color.Black)), 1, 1);
            graphics.DrawString(text, font, new SolidBrush(Color.FromArgb(120, Color.White)), 0, 0);
            graphics.Restore(state);
        }
        public static float GetDifference(System.Drawing.Image OrginalImage, System.Drawing.Image SecoundImage, int? skip = null)
        {
            float percent = 0;
            try
            {
                float counter = 0;
                Bitmap bt1 = new Bitmap(OrginalImage);
                Bitmap bt2 = new Bitmap(SecoundImage);
                int size_H = bt1.Size.Height;
                int size_W = bt1.Size.Width;
                float total = size_H * size_W; Color pixel_image1;
                float skipWhen = 0;
                bool Skiping = false;
                if (skip != null)
                {
                    Skiping = true;
                    skipWhen = skip.Value * total / 100;
                }
                Color pixel_image2;
                if (!Skiping)
                {
                    for (int x = 0; x != size_W; x++)
                    {
                        for (int y = 0; y != size_H; y++)
                        {
                            pixel_image1 = bt1.GetPixel(x, y);
                            pixel_image2 = bt2.GetPixel(x, y);
                            if (pixel_image1 != pixel_image2)
                                counter++;
                        }
                    }
                    goto count;
                }


                else
                {
                    for (int x = 0; x != size_W; x++)
                    {
                        for (int y = 0; y != size_H; y++)
                        {
                            pixel_image1 = bt1.GetPixel(x, y);
                            pixel_image2 = bt2.GetPixel(x, y);
                            if (pixel_image1 != pixel_image2)
                                counter++;
                            if (counter > skipWhen)
                            {
                                goto count;
                            }
                        }
                    }
                    goto count;
                }
                count:
                percent = (counter / total) * 100;
            }
            catch (Exception) { percent = 100; }
            return percent;
        }
        public static byte[] ImageToArray(this System.Drawing.Image imageIn)
        {
            if (imageIn == null) return null;
            return ImageToArray(imageIn, imageIn.RawFormat);
        }
        public static byte[] ImageToArrayJPG(this System.Drawing.Image img)
        {
            if (img == null) return null;
            return ImageToArray(img, ImageFormat.Jpeg);
        }
        public static byte[] ImageToArray(System.Drawing.Image img, ImageFormat format)
        {

            using (MemoryStream ms = new MemoryStream())
            {
                img.Save(ms, format);
                return ms.ToArray();
            }

        }

        public static string ImageToBase64(this System.Drawing.Image image, ImageFormat format)
        {
            if (image == null) return string.Empty;
            try
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    image.Save(ms, format);
                    byte[] imageBytes = ms.ToArray();
                    string base64String = Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }
            catch
            {
                return null;
            }
        }

        public static System.Drawing.Image ArrayToImage(this byte[] imageBytes)
        {
            if (imageBytes == null || imageBytes.Length == 0) return null;
            using (MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                ms.Write(imageBytes, 0, imageBytes.Length);
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                return image;
            }
        }
        public static System.Drawing.Image Base64ToImage(this string base64String)
        {
            if (string.IsNullOrEmpty(base64String)) return null;
            byte[] imageBytes = Convert.FromBase64String(base64String);
            return ArrayToImage(imageBytes);
        }

        public static ImageDataBase64 Base64MimeType(this string encoded)
        {

            var regex = new Regex(@"data:(?<mime>[\w/\-\.]+);(?<encoding>\w+),(?<data>.*)", RegexOptions.Compiled);

            var match = regex.Match(encoded);
            return new ImageDataBase64
            {
                Mime = match.Groups["mime"].Value,
                Type = match.Groups["encoding"].Value,
                Data = match.Groups["data"].Value
            };
        }
        public static string GetFileNameWithMIME(this string str)
        {
            if (str.Contains("png")) return ".png";
            if (str.Contains("jpeg")) return ".jpg";
            if (str.Contains("gif")) return ".gif";
            if (str.Contains("svg")) return ".svg";
            //"image/gif", "image/jpeg", "image/pjpeg", "image/x-png", "image/png", "image/svg+xml";
            return ".unk";
        }
        //Auto : true , tạo file 
        //False : ghi đè file
        public static ImageResult WriteImageString(this string Data, string ParentPath, string CurrentFullPath = null
            , params ImageResizeOption[] args)
        {
            try
            {
                if (Data == null)
                    return new ImageResult("Không có dữ liệu", false);
                var imageData = Data.Base64MimeType();
                if (imageData == null) return new ImageResult("Dữ liệu lỗi", false);
                if (string.IsNullOrEmpty(imageData.Data))
                    return new ImageResult("Không có dữ liệu", false);
                byte[] bytes;
                try
                {
                    bytes = Convert.FromBase64String(imageData.Data);
                }
                catch (FormatException ex)
                {
                    return new ImageResult("Lỗi B64:" + ex.GetExceptionString());
                }

              
                string absolutePath = "",fileName="",fullName="",ext="";
                ext = GetFileNameWithMIME(imageData.Mime);
                CurrentFullPath.DeleteFile();
                if (ParentPath != null)
                {
                    absolutePath = string.Format("{0}{1}\\{2}", ShareOptions.RootPath, DefaultPath, ParentPath);
                   
                    fileName = absolutePath.GetRandomFileNameWithExt(ext);
                    fullName = absolutePath + "\\" + fileName;
                }
                    
                else
                {
                    absolutePath = Path.GetDirectoryName(CurrentFullPath);
                    fullName = CurrentFullPath;
                    fileName = Path.GetFileName(fullName);
                }
                if (!Directory.Exists(absolutePath)) Directory.CreateDirectory(absolutePath);

                using (var imageFile = new FileStream(fullName, FileMode.OpenOrCreate))
                {
                    imageFile.Write(bytes, 0, bytes.Length);
                    imageFile.Flush();
                }

                Task.Run(() =>
                {
                    if (ext == ".jpg")
                    {
                        OptinmizeJPG(ParentPath);
                    }
                    else if (ext == ".png")
                    {
                        OptinmizePNG(ParentPath);
                    }
                });
                return new ImageResult(fullName, null, fileName);
            }
            catch (Exception ex)
            {
                return new ImageResult(ex.GetExceptionString(), false);
            }
        }
        public static string OptimizeImages()
        {
            string folder = Path.Combine(ShareOptions.RootPath, @"data\img");
            var files = Directory.GetFiles(folder, "*.*", SearchOption.AllDirectories)
                 .Where(s => s.EndsWith(".png") || s.EndsWith(".jpg") || s.EndsWith(".jpeg"));

            StringBuilder sb = new StringBuilder();
            long lengt;
            foreach (var file in files)
            {
                var fileInfo = new FileInfo(file);
                try
                {
                    lengt = fileInfo.Length;
                    if (fileInfo.Extension == ".png")
                    {
                        var ret = OptinmizePNG(fileInfo.FullName);
                        if (ret.Success) sb.Append(ret.Output);
                        else sb.Append(ret.Error);
                    }
                    else if (fileInfo.Extension == ".jpg")
                    {
                        var ret = OptinmizeJPG(fileInfo.FullName);
                        if (ret.Success) sb.Append(ret.Output);
                        else sb.Append(ret.Error);
                    }
                    else
                    {
                        sb.AppendFormat("{0} Không hỗ trợ định dạng", file);
                        return sb.ToString();
                    }
                    fileInfo.Refresh();
                    double percent = (double)((lengt - fileInfo.Length) / lengt) * 100;
                    sb.AppendFormat("File: {0} {1}/{2}: {3}%", file, lengt, fileInfo.Length, percent);

                }
                catch (Exception ex)
                {
                    sb.AppendFormat("{0} - {1}", file, ex.GetExceptionString());
                }

                sb.Append(Environment.NewLine);
            }
            return sb.ToString();

        }

        static ImageResult RunExeFile(string fileName, string Params)
        {
            string exePath = Path.Combine(ShareOptions.RootPath, fileName);
            try
            {
                ProcessStartInfo info = new ProcessStartInfo()
                {
                    FileName = exePath,
                    WindowStyle = ProcessWindowStyle.Hidden,
                    Arguments = Params,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true
                };
                string output = string.Empty;
                string error = string.Empty;
                // Use Process for the application.
                using (Process exe = Process.Start(info))
                {
                    error = exe.StandardError.ReadToEnd();
                    output = exe.StandardOutput.ReadToEnd();
                    exe.WaitForExit();
                }
                return new ImageResult(output, error, "");
            }
            catch (Exception ex)
            {
                return new ImageResult(ex.GetExceptionString(), false);
            }
        }
        static ImageResult OptinmizeJPG(string f)
        {
            return RunExeFile("jpegoptim.exe", "-m60 -o --force --strip-all --strip-iptc --strip-icc --all-progressive " + f);
        }
        static ImageResult OptinmizePNG(string f)
        {
            return RunExeFile("optipng.exe", "\"" + f + "\" -o7");

        }
        public static System.Drawing.Image FixedSize(System.Drawing.Image image, int Width, int Height, bool needToFill)
        {
            #region calculations
            int sourceWidth = image.Width;
            int sourceHeight = image.Height;
            int sourceX = 0;
            int sourceY = 0;
            double destX = 0;
            double destY = 0;

            double nScale = 0;
            double nScaleW = 0;
            double nScaleH = 0;

            nScaleW = ((double)Width / (double)sourceWidth);
            nScaleH = ((double)Height / (double)sourceHeight);
            if (!needToFill)
            {
                nScale = Math.Min(nScaleH, nScaleW);
            }
            else
            {
                nScale = Math.Max(nScaleH, nScaleW);
                destY = (Height - sourceHeight * nScale) / 2;
                destX = (Width - sourceWidth * nScale) / 2;
            }

            if (nScale > 1)
                nScale = 1;

            int destWidth = (int)Math.Round(sourceWidth * nScale);
            int destHeight = (int)Math.Round(sourceHeight * nScale);
            #endregion

            System.Drawing.Bitmap bmPhoto = null;
            try
            {
                bmPhoto = new System.Drawing.Bitmap(destWidth + (int)Math.Round(2 * destX), destHeight + (int)Math.Round(2 * destY));
            }
            catch (Exception ex)
            {
                throw new ApplicationException(string.Format("destWidth:{0}, destX:{1}, destHeight:{2}, desxtY:{3}, Width:{4}, Height:{5}",
                    destWidth, destX, destHeight, destY, Width, Height), ex);
            }
            using (System.Drawing.Graphics grPhoto = System.Drawing.Graphics.FromImage(bmPhoto))
            {
                grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
                grPhoto.CompositingQuality = CompositingQuality.HighQuality;
                grPhoto.SmoothingMode = SmoothingMode.HighQuality;

                Rectangle to = new System.Drawing.Rectangle((int)Math.Round(destX), (int)Math.Round(destY), destWidth, destHeight);
                Rectangle from = new System.Drawing.Rectangle(sourceX, sourceY, sourceWidth, sourceHeight);
                grPhoto.DrawImage(image, to, from, System.Drawing.GraphicsUnit.Pixel);

                return bmPhoto;
            }
        }


    }
}
