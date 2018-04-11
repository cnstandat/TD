var CheckBox = function () {
    function toggleCheckBox() {
        this.setAttribute('checked', !this.getAttribute('checked'));
        this.setAttribute('value', (this.getAttribute('value') === 'true' ? 'false' : 'true'));
        classie.toggle(this, "checkedBox");
    }
    function wrapCheckBox(el) {
        var par = el.parentNode;
        if (!classie.has(el, 'check-box')) {
            var div = document.createElement("div");
            div.classList = "check-box";

            par.replaceChild(div, el);
            var i = document.createElement("i");
            if (el.getAttribute('value') === "true") {
                classie.add(div, "checkedBox");
            }
            i.appendChild(el);
            div.appendChild(i);
            div.addEventListener('click', toggleCheckBox)
        }

    }
    return {
        wrapAll: function () {
            var checkBoxList = document.querySelectorAll('.ck');
            if (checkBoxList.length) {
                [].slice.call(checkBoxList).forEach(function (el) {
                    classie.remove(el, "ck");
                    wrapCheckBox(el);
                });
            }

        },
        init: function () {
            CheckBox.wrapAll();
        }
    }
}();