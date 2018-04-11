using System;

namespace TD
{
    [Flags]
    public enum ButtonTypes
    {
        None = 0,
        New = 1 << 0,
        Edit = 1 << 1,
        Delete = 1 << 2,
        Save = 1 << 3,
        SaveAndNew = Save | New,
        Close = 1 << 5,
        Refresh = 1 << 6,
        Print = 1 << 7,
        SaveAndClose = Save | Close,
        ImportD = 1 << 9,
        Options = 1 << 10,
        Export = 1 << 11,
        All = New | Edit | Delete | Save | Close | Refresh | Print | ImportD | Export | Options
    }
    //public class FlagCheckedListBox : CheckedListBox
    //{
    //    private System.ComponentModel.Container components = null;

    //    public FlagCheckedListBox()
    //    {
    //        // This call is required by the Windows.Forms Form Designer.
    //        InitializeComponent();

    //        // TODO: Add any initialization after the InitForm call

    //    }

    //    protected override void Dispose(bool disposing)
    //    {
    //        if (disposing)
    //        {
    //            if (components != null)
    //                components.Dispose();
    //        }
    //        base.Dispose(disposing);
    //    }

    //    #region Component Designer generated code
    //    private void InitializeComponent()
    //    {
    //        // 
    //        // FlaggedCheckedListBox
    //        // 
    //        this.CheckOnClick = true;

    //    }
    //    #endregion

    //    // Adds an integer value and its associated description
    //    public FlagCheckedListBoxItem Add(int v, string c)
    //    {
    //        FlagCheckedListBoxItem item = new FlagCheckedListBoxItem(v, c);
    //        Items.Add(item);
    //        return item;
    //    }

    //    public FlagCheckedListBoxItem Add(FlagCheckedListBoxItem item)
    //    {
    //        Items.Add(item);
    //        return item;
    //    }

    //    protected override void OnItemCheck(ItemCheckEventArgs e)
    //    {
    //        base.OnItemCheck(e);

    //        if (isUpdatingCheckStates)
    //            return;

    //        // Get the checked/unchecked item
    //        FlagCheckedListBoxItem item = Items[e.Index] as FlagCheckedListBoxItem;
    //        // Update other items
    //        UpdateCheckedItems(item, e.NewValue);
    //    }

    //    // Checks/Unchecks items depending on the give bitvalue
    //    protected void UpdateCheckedItems(int value)
    //    {

    //        isUpdatingCheckStates = true;

    //        // Iterate over all items
    //        for (int i = 0; i < Items.Count; i++)
    //        {
    //            FlagCheckedListBoxItem item = Items[i] as FlagCheckedListBoxItem;

    //            if (item.value == 0)
    //            {
    //                SetItemChecked(i, value == 0);
    //            }
    //            else
    //            {

    //                // If the bit for the current item is on in the bitvalue, check it
    //                if ((item.value & value) == item.value && item.value != 0)
    //                    SetItemChecked(i, true);
    //                // Otherwise uncheck it
    //                else
    //                    SetItemChecked(i, false);
    //            }
    //        }

    //        isUpdatingCheckStates = false;

    //    }

    //    // Updates items in the checklistbox
    //    // composite = The item that was checked/unchecked
    //    // cs = The check state of that item
    //    protected void UpdateCheckedItems(FlagCheckedListBoxItem composite, CheckState cs)
    //    {

    //        // If the value of the item is 0, call directly.
    //        if (composite.value == 0)
    //            UpdateCheckedItems(0);


    //        // Get the total value of all checked items
    //        int sum = 0;
    //        for (int i = 0; i < Items.Count; i++)
    //        {
    //            FlagCheckedListBoxItem item = Items[i] as FlagCheckedListBoxItem;

    //            // If item is checked, add its value to the sum.
    //            if (GetItemChecked(i))
    //                sum |= item.value;
    //        }

    //        // If the item has been unchecked, remove its bits from the sum
    //        if (cs == CheckState.Unchecked)
    //            sum = sum & (~composite.value);
    //        // If the item has been checked, combine its bits with the sum
    //        else
    //            sum |= composite.value;

    //        // Update all items in the checklistbox based on the final bit value
    //        UpdateCheckedItems(sum);

    //    }

    //    private bool isUpdatingCheckStates = false;

    //    // Gets the current bit value corresponding to all checked items
    //    public int GetCurrentValue()
    //    {
    //        int sum = 0;

    //        for (int i = 0; i < Items.Count; i++)
    //        {
    //            FlagCheckedListBoxItem item = Items[i] as FlagCheckedListBoxItem;

    //            if (GetItemChecked(i))
    //                sum |= item.value;
    //        }

    //        return sum;
    //    }

    //    Type enumType;
    //    Enum enumValue;

    //    // Adds items to the checklistbox based on the members of the enum
    //    private void FillEnumMembers()
    //    {
    //        foreach (string name in Enum.GetNames(enumType))
    //        {
    //            object val = Enum.Parse(enumType, name);
    //            int intVal = (int)Convert.ChangeType(val, typeof(int));

    //            Add(intVal, name);
    //        }
    //    }

    //    // Checks/unchecks items based on the current value of the enum variable
    //    private void ApplyEnumValue()
    //    {
    //        int intVal = (int)Convert.ChangeType(enumValue, typeof(int));
    //        UpdateCheckedItems(intVal);

    //    }

    //    [DesignerSerializationVisibilityAttribute(DesignerSerializationVisibility.Hidden)]
    //    public Enum EnumValue
    //    {
    //        get
    //        {
    //            object e = Enum.ToObject(enumType, GetCurrentValue());
    //            return (Enum)e;
    //        }
    //        set
    //        {

    //            Items.Clear();
    //            enumValue = value; // Store the current enum value
    //            enumType = value.GetType(); // Store enum type
    //            FillEnumMembers(); // Add items for enum members
    //            ApplyEnumValue(); // Check/uncheck items depending on enum value

    //        }
    //    }


    //}

    //// Represents an item in the checklistbox
    //public class FlagCheckedListBoxItem
    //{
    //    public FlagCheckedListBoxItem(int v, string c)
    //    {
    //        value = v;
    //        caption = c;
    //    }

    //    public override string ToString()
    //    {
    //        return caption;
    //    }

    //    // Returns true if the value corresponds to a single bit being set
    //    public bool IsFlag
    //    {
    //        get
    //        {
    //            return ((value & (value - 1)) == 0);
    //        }
    //    }

    //    // Returns true if this value is a member of the composite bit value
    //    public bool IsMemberFlag(FlagCheckedListBoxItem composite)
    //    {
    //        return (IsFlag && ((value & composite.value) == value));
    //    }

    //    public int value;
    //    public string caption;
    //}


    // UITypeEditor for flag enums
    //public class FlagEnumUIEditor : UITypeEditor
    //{
    //    // The checklistbox
    //    private FlagCheckedListBox flagEnumCB;

    //    public FlagEnumUIEditor()
    //    {
    //        flagEnumCB = new FlagCheckedListBox();
    //        flagEnumCB.BorderStyle = BorderStyle.None;
    //    }

    //    public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
    //    {
    //        if (context != null
    //            && context.Instance != null
    //            && provider != null)
    //        {

    //            IWindowsFormsEditorService edSvc = (IWindowsFormsEditorService)provider.GetService(typeof(IWindowsFormsEditorService));

    //            if (edSvc != null)
    //            {

    //                Enum e = (Enum)Convert.ChangeType(value, context.PropertyDescriptor.PropertyType);
    //                flagEnumCB.EnumValue = e;
    //                edSvc.DropDownControl(flagEnumCB);
    //                return flagEnumCB.EnumValue;

    //            }
    //        }
    //        return null;
    //    }

    //    public override UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
    //    {
    //        return UITypeEditorEditStyle.DropDown;
    //    }


    //}


    //public class ButtonTypeSetEditor : EnumSetEditor<ButtonTypes> { }
    //public class ButtonTypeSetConverter : EnumSetConverter<ButtonTypes> { }
    //public abstract class EnumSetConverter<T> : TypeConverter where T : struct
    //{
    //    public override bool CanConvertTo(ITypeDescriptorContext context, Type destinationType)
    //    {
    //        return destinationType == typeof(string) || base.CanConvertTo(context, destinationType);
    //    }
    //    public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
    //    {
    //        if (destinationType == typeof(string))
    //        {
    //            long set = value.ToLong();
    //            if (set == 0) return "(null)";

    //            StringBuilder sb = new StringBuilder();
    //            foreach (T item in Enum.GetValues(typeof(T)))
    //            {
    //                var longValue = item.ToLong();
    //                if ((set & longValue) == longValue)
    //                {
    //                    if (sb.Length > 0) sb.Append(", ");
    //                    sb.Append(item);
    //                }
    //            }
    //            return sb.ToString();
    //        }
    //        return base.ConvertTo(context, culture, value, destinationType);
    //    }
    //}

    //public abstract class EnumSetEditor<T> : UITypeEditor where T : struct
    //{
    //    public override UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
    //    {
    //        return UITypeEditorEditStyle.DropDown;
    //    }
    //    public override bool IsDropDownResizable
    //    {
    //        get { return true; }
    //    }
    //    public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
    //    {
    //        IWindowsFormsEditorService svc = (IWindowsFormsEditorService)
    //        provider.GetService(typeof(IWindowsFormsEditorService));
    //        var set = value.ToLong();
    //        if (svc != null)
    //        {
    //            UserControl ctrl = new UserControl();
    //            CheckedComboBoxEdit clb = new CheckedComboBoxEdit();
    //            clb.Properties.SetFlags(typeof(T));
    //            clb.Dock = DockStyle.Fill;
    //            Button btn = new Button();
    //            btn.Dock = DockStyle.Bottom;
    //            clb.SetEditValue(value);
    //            //foreach (T item in Enum.GetValues(typeof(T)))
    //            //{
    //            //    var longValue = item.ToLong();
    //            //    clb.Items.Add(item, (set &longValue)==longValue);
    //            //}
    //            ctrl.Controls.Add(clb);
    //            ctrl.Controls.Add(btn);
    //            btn.Text = "OK";
    //            btn.Click += delegate
    //            {
    //                value = clb.EditValue;
    //                clb.EditValue = null;
    //                //set.Clear();
    //                //foreach (T item in clb.CheckedItems)
    //                //{
    //                //    set.Add(item);
    //                //}
    //                svc.CloseDropDown();
    //            };
    //            svc.DropDownControl(ctrl);
    //        }

    //        return value;
    //    }
    //}
}
