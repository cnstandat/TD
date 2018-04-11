using System;
using System.Collections.Generic;
using TD.Models.Views;

namespace TD.Models
{
    public class ProductCategory
    {
        public ProductCategory()
        {
            Products = new List<Product>();
            Information = new List<ProductCategoryInfo>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<ProductCategoryInfo> Information { get; set; }
    }
    public class ProductCategoryInfo
    {
        public ProductCategoryInfo()
        {

        }
        public string CategoryId { get; set; }
        public virtual ProductCategory Category { get; set; }
        public string InfoId { get; set; }
        public virtual InfoProduct Info { get; set; }
        public bool Required { get; set; }
    }
    public class InfoProduct
    {
        public InfoProduct()
        {
            Categories = new List<ProductCategoryInfo>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public ValueType ValueType { get; set; }
        public virtual ICollection<ProductCategoryInfo> Categories { get; set; }
        public virtual ICollection<ProductInfo> Products { get; set; }
    }
    public class Product
    {
        
        public Product()
        {
            Images = new List<AppFile>();
            Carts = new List<CartItem>();
            Blogs = new List<Blog>();
            Information = new List<ProductInfo>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string OldPrice { get; set; }
        public bool IsHot { get; set; }
        public virtual ICollection<AppFile> Images { get; set; }
        public virtual ICollection<CartItem> Carts { get; set; }
        public string CreatorId { get; set; }
        public string ModifyId { get; set; }
        public virtual User Creator { get; set; }
        public virtual User Modify { get; set; }
        public DateTime LastModify { get; set; }
        public virtual ICollection< Blog> Blogs { get; set; }
        public virtual ICollection<ProductInfo> Information { get; set; }
        public string CategoryId { get; set; }
        public virtual ProductCategory Category { get; set; }
    }
    public class ProductInfo
    {
        
        public ProductInfo()
        {
            
        }
        public string ProductId { get; set; }
        public string InfoId { get; set; }
        public virtual Product Product { get; set; }
        public virtual InfoProduct Info { get; set; }
        public string Value { get; set; }
    }
}