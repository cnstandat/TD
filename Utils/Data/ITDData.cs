using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace TD
{

    public interface ITDData
    {
        //string Id { get; set; }
        [JsonIgnore]
        DataState DataState { get; set; }

    }
    //public interface ITDUserControl<T>
    //{
    //    T CurrentData { get; set; }
    //    List<T> lstData { get; set; }

    //}
    public enum DataState
    {
        NoChange = 0,
        New,
        Change,
        Delete,
        NewWaiting,
        ChangeWaiting,
        DeleteWaiting
    }
    [Flags]
    public enum ButtonDefine
    {
        None = 0,
        Add = 1 << 0,
        Save = 1 << 1,
        SaveAdd = 1 << 2,
        Delete = 1 << 3,
        Load = 1 << 4,
        Print = 1 << 5,
        Import = 1 << 6,
        Export = 1 << 7,
        Post = 1 << 8,
        Layout=1<<9,
        Close =1<<10,
    }
}
