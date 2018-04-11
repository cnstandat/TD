/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2017 Jörn Zaefferer
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(function($) {

    $.extend($.fn, {

        // https://jqueryvalidation.org/validate/
        validate: function(options) {

            // If nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }

            // Check if a validator for this form was already created
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr("novalidate", "novalidate");

            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);

            if (validator.settings.onsubmit) {

                this.on("click.validate", ":submit", function(event) {

                    // Track the used submit button to properly handle scripted
                    // submits later.
                    validator.submitButton = event.currentTarget;

                    // Allow suppressing validation by adding a cancel class to the submit button
                    if ($(this).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }

                    // Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ($(this).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });

                // Validate the form on submit
                this.on("submit.validate", function(event) {
                    if (validator.settings.debug) {

                        // Prevent form submit to be able to see console output
                        event.preventDefault();
                    }

                    function handle() {
                        var hidden, result;

                        // Insert a hidden input as a replacement for the missing submit button
                        // The hidden input is inserted in two cases:
                        //   - A user defined a `submitHandler`
                        //   - There was a pending request due to `remote` method and `stopRequest()`
                        //     was called to submit the form in case it's valid
                        if (validator.submitButton && (validator.settings.submitHandler || validator.formSubmitted)) {
                            hidden = $("<input type='hidden'/>")
                                .attr("name", validator.submitButton.name)
                                .val($(validator.submitButton).val())
                                .appendTo(validator.currentForm);
                        }

                        if (validator.settings.submitHandler) {
                            result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (hidden) {

                                // And clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            if (result !== undefined) {
                                return result;
                            }
                            return false;
                        }
                        return true;
                    }

                    // Prevent submit for invalid forms or custom submit handlers
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },

        // https://jqueryvalidation.org/valid/
        valid: function() {
            var valid, validator, errorList;

            if ($(this[0]).is("form")) {
                valid = this.validate().form();
            } else {
                errorList = [];
                valid = true;
                validator = $(this[0].form).validate();
                this.each(function() {
                    valid = validator.element(this) && valid;
                    if (!valid) {
                        errorList = errorList.concat(validator.errorList);
                    }
                });
                validator.errorList = errorList;
            }
            return valid;
        },

        // https://jqueryvalidation.org/rules/
        rules: function(command, argument) {
            var element = this[0],
                settings, staticRules, existingRules, data, param, filtered;

            // If nothing is selected, return empty object; can't chain anyway
            if (element == null) {
                return;
            }

            if (!element.form && element.hasAttribute("contenteditable")) {
                element.form = this.closest("form")[0];
                element.name = this.attr("name");
            }

            if (element.form == null) {
                return;
            }

            if (command) {
                settings = $.data(element.form, "validator").settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));

                        // Remove messages from rules, but allow them to be set separately
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        filtered = {};
                        $.each(argument.split(/\s/), function(index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                        });
                        return filtered;
                }
            }

            data = $.validator.normalizeRules(
                $.extend({},
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.dataRules(element),
                    $.validator.staticRules(element)
                ), element);

            // Make sure required is at front
            if (data.required) {
                param = data.required;
                delete data.required;
                data = $.extend({ required: param }, data);
            }

            // Make sure remote is at back
            if (data.remote) {
                param = data.remote;
                delete data.remote;
                data = $.extend(data, { remote: param });
            }

            return data;
        }
    });

    // Custom selectors
    $.extend($.expr.pseudos || $.expr[":"], { // '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

        // https://jqueryvalidation.org/blank-selector/
        blank: function(a) {
            return !$.trim("" + $(a).val());
        },

        // https://jqueryvalidation.org/filled-selector/
        filled: function(a) {
            var val = $(a).val();
            return val !== null && !!$.trim("" + val);
        },

        // https://jqueryvalidation.org/unchecked-selector/
        unchecked: function(a) {
            return !$(a).prop("checked");
        }
    });

    // Constructor for validator
    $.validator = function(options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };

    // https://jqueryvalidation.org/jQuery.validator.format/
    $.validator.format = function(source, params) {
        if (arguments.length === 1) {
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (params === undefined) {
            return source;
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(element) {
                this.lastActive = element;

                // Hide error label and remove error class on focus if enabled
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.hideThese(this.errorsFor(element));
                }
            },
            onfocusout: function(element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function(element, event) {

                // Avoid revalidate the field when pressing one of the following keys
                // Shift       => 16
                // Ctrl        => 17
                // Alt         => 18
                // Caps lock   => 20
                // End         => 35
                // Home        => 36
                // Left arrow  => 37
                // Up arrow    => 38
                // Right arrow => 39
                // Down arrow  => 40
                // Insert      => 45
                // Num lock    => 144
                // AltGr key   => 225
                var excludedKeys = [
                    16, 17, 18, 20, 35, 36, 37,
                    38, 39, 40, 45, 144, 225
                ];

                if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
                    return;
                } else if (element.name in this.submitted || element.name in this.invalid) {
                    this.element(element);
                }
            },
            onclick: function(element) {

                // Click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);

                    // Or option elements, check parent select in that case
                } else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // https://jqueryvalidation.org/jQuery.validator.setDefaults/
        setDefaults: function(settings) {
            $.extend($.validator.defaults, settings);
        },

        messages: {
            required: "Không được để trống.",
            remote: "{0} đã được sử dụng .",
            email: "Vui lòng nhập đúng định dạng email.",
            url: "Vui lòng nhập đúng định dạng link.",
            date: "Ngày tháng không hợp lệ.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Vui lòng nhập đúng định dạng thẻ.",
            digits: "Chỉ được nhập số.",
            equalTo: "Mật khẩu không khớp.",
            maxlength: $.validator.format("không quá {0} ký tự."),
            minlength: $.validator.format("ít nhất {0} ký tự."),
            rangelength: $.validator.format("từ {0} đến {1} ký tự."),
            range: $.validator.format("Nhập giá trị từ {0} đến {1}."),
            max: $.validator.format("Giá trị lớn nhất là {0}."),
            min: $.validator.format("Giá trị nhỏ nhất là {0}."),
            step: $.validator.format("Số phải chia hết cho {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function() {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = (this.groups = {}),
                    rules;
                $.each(this.settings.groups, function(key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function(index, name) {
                        groups[name] = key;
                    });
                });
                rules = this.settings.rules;
                $.each(rules, function(key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {

                    // Set form expando on contenteditable
                    if (!this.form && this.hasAttribute("contenteditable")) {
                        this.form = $(this).closest("form")[0];
                        this.name = $(this).attr("name");
                    }

                    var validator = $.data(this.form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, ""),
                        settings = validator.settings;
                    if (settings[eventType] && !$(this).is(settings.ignore)) {
                        settings[eventType].call(validator, this, event);
                    }
                }

                $(this.currentForm)
                    .on("focusin.validate focusout.validate keyup.validate",
                        ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                        "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                        "[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate)

                // Support: Chrome, oldIE
                // "select" is provided as event.target when clicking a option
                .on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                }
            },

            // https://jqueryvalidation.org/Validator.form/
            form: function() {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function() {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },

            // https://jqueryvalidation.org/Validator.element/
            element: function(element) {
                var cleanElement = this.clean(element),
                    checkElement = this.validationTargetFor(cleanElement),
                    v = this,
                    result = true,
                    rs, group;

                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name];
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);

                    // If this element is grouped, then validate all group elements already
                    // containing a value
                    group = this.groups[checkElement.name];
                    if (group) {
                        $.each(this.groups, function(name, testgroup) {
                            if (testgroup === group && name !== checkElement.name) {
                                cleanElement = v.validationTargetFor(v.clean(v.findByName(name)));
                                if (cleanElement && cleanElement.name in v.invalid) {
                                    v.currentElements.push(cleanElement);
                                    result = v.check(cleanElement) && result;
                                }
                            }
                        });
                    }

                    rs = this.check(checkElement) !== false;
                    result = result && rs;
                    if (rs) {
                        this.invalid[checkElement.name] = false;
                    } else {
                        this.invalid[checkElement.name] = true;
                    }

                    if (!this.numberOfInvalids()) {

                        // Hide error containers on last error
                        this.toHide = this.toHide.add(this.containers);
                    }
                    this.showErrors();

                    // Add aria-invalid status for screen readers
                    $(element).attr("aria-invalid", !rs);
                }

                return result;
            },

            // https://jqueryvalidation.org/Validator.showErrors/
            showErrors: function(errors) {
                if (errors) {
                    var validator = this;

                    // Add items to error list and map
                    $.extend(this.errorMap, errors);
                    this.errorList = $.map(this.errorMap, function(message, name) {
                        return {
                            message: message,
                            element: validator.findByName(name)[0]
                        };
                    });

                    // Remove items from success list
                    this.successList = $.grep(this.successList, function(element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },

            // https://jqueryvalidation.org/Validator.resetForm/
            resetForm: function() {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var elements = this.elements()
                    .removeData("previousValue")
                    .removeAttr("aria-invalid");

                this.resetElements(elements);
            },

            resetElements: function(elements) {
                var i;

                if (this.settings.unhighlight) {
                    for (i = 0; elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i],
                            this.settings.errorClass, "");
                        this.findByName(elements[i].name).removeClass(this.settings.validClass);
                    }
                } else {
                    elements
                        .removeClass(this.settings.errorClass)
                        .removeClass(this.settings.validClass);
                }
            },

            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },

            objectLength: function(obj) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for (i in obj) {

                    // This check allows counting elements with empty error
                    // message as invalid elements
                    if (obj[i] !== undefined && obj[i] !== null && obj[i] !== false) {
                        count++;
                    }
                }
                return count;
            },

            hideErrors: function() {
                this.hideThese(this.toHide);
            },

            hideThese: function(errors) {
                errors.not(this.containers).text("");
                this.addWrapper(errors).hide();
            },

            valid: function() {
                return this.size() === 0;
            },

            size: function() {
                return this.errorList.length;
            },

            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus()

                        // Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                        .trigger("focusin");
                    } catch (e) {

                        // Ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function(n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },

            elements: function() {
                var validator = this,
                    rulesCache = {};

                // Select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                    .find("input, select, textarea, [contenteditable]")
                    .not(":submit, :reset, :image, :disabled")
                    .not(this.settings.ignore)
                    .filter(function() {
                        var name = this.name || $(this).attr("name"); // For contenteditable
                        if (!name && validator.settings.debug && window.console) {
                            console.error("%o has no name assigned", this);
                        }

                        // Set form expando on contenteditable
                        if (this.hasAttribute("contenteditable")) {
                            this.form = $(this).closest("form")[0];
                            this.name = name;
                        }

                        // Select only the first element for each name, and only those with rules specified
                        if (name in rulesCache || !validator.objectLength($(this).rules())) {
                            return false;
                        }

                        rulesCache[name] = true;
                        return true;
                    });
            },

            clean: function(selector) {
                return $(selector)[0];
            },

            errors: function() {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            resetInternals: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
            },

            reset: function() {
                this.resetInternals();
                this.currentElements = $([]);
            },

            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },

            prepareElement: function(element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function(element) {
                var $element = $(element),
                    type = element.type,
                    val, idx;

                if (type === "radio" || type === "checkbox") {
                    return this.findByName(element.name).filter(":checked").val();
                } else if (type === "number" && typeof element.validity !== "undefined") {
                    return element.validity.badInput ? "NaN" : $element.val();
                }

                if (element.hasAttribute("contenteditable")) {
                    val = $element.text();
                } else {
                    val = $element.val();
                }

                if (type === "file") {

                    // Modern browser (chrome & safari)
                    if (val.substr(0, 12) === "C:\\fakepath\\") {
                        return val.substr(12);
                    }

                    // Legacy browsers
                    // Unix-based path
                    idx = val.lastIndexOf("/");
                    if (idx >= 0) {
                        return val.substr(idx + 1);
                    }

                    // Windows-based path
                    idx = val.lastIndexOf("\\");
                    if (idx >= 0) {
                        return val.substr(idx + 1);
                    }

                    // Just the file name
                    return val;
                }

                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function(element) {
                element = this.validationTargetFor(this.clean(element));

                var rules = $(element).rules(),
                    rulesCount = $.map(rules, function(n, i) {
                        return i;
                    }).length,
                    dependencyMismatch = false,
                    val = this.elementValue(element),
                    result, method, rule, normalizer;

                // Prioritize the local normalizer defined for this element over the global one
                // if the former exists, otherwise user the global one in case it exists.
                if (typeof rules.normalizer === "function") {
                    normalizer = rules.normalizer;
                } else if (typeof this.settings.normalizer === "function") {
                    normalizer = this.settings.normalizer;
                }

                // If normalizer is defined, then call it to retreive the changed value instead
                // of using the real one.
                // Note that `this` in the normalizer is `element`.
                if (normalizer) {
                    val = normalizer.call(element, val);

                    if (typeof val !== "string") {
                        throw new TypeError("The normalizer should return a string value.");
                    }

                    // Delete the normalizer from rules to avoid treating it as a pre-defined method.
                    delete rules.normalizer;
                }

                for (method in rules) {
                    rule = { method: method, parameters: rules[method] };
                    try {
                        result = $.validator.methods[method].call(this, val, element, rule.parameters);

                        // If a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if (result === "dependency-mismatch" && rulesCount === 1) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }

                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        if (e instanceof TypeError) {
                            e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                        }

                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },

            // Return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function(element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() +
                    method.substring(1).toLowerCase()) || $(element).data("msg");
            },

            // Return the custom message for the given element name and validation method
            customMessage: function(name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },

            // Return the first defined argument, allowing empty strings
            findDefined: function() {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            // The second parameter 'rule' used to be a string, and extended to an object literal
            // of the following form:
            // rule = {
            //     method: "method name",
            //     parameters: "the given method parameters"
            // }
            //
            // The old behavior still supported, kept to maintain backward compatibility with
            // old code, and will be removed in the next major release.
            defaultMessage: function(element, rule) {
                if (typeof rule === "string") {
                    rule = { method: rule };
                }

                var message = this.findDefined(
                        this.customMessage(element.name, rule.method),
                        this.customDataMessage(element, rule.method),

                        // 'title' is never undefined, so handle empty string as undefined
                        !this.settings.ignoreTitle && element.title || undefined,
                        $.validator.messages[rule.method],
                        "<strong>Warning: No message defined for " + element.name + "</strong>"
                    ),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }

                return message;
            },

            formatAndAdd: function(element, rule) {
                var message = this.defaultMessage(element, rule);

                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function(toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },

            defaultShowErrors: function() {
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },

            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function() {
                return $(this.errorList).map(function() {
                    return this.element;
                });
            },

            showLabel: function(element, message) {
                var place, group, errorID, v,
                    error = this.errorsFor(element),
                    elementID = this.idOrName(element),
                    describedBy = $(element).attr("aria-describedby");

                if (error.length) {

                    // Refresh error/success class
                    error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);

                    // Replace message on existing label
                    error.html(message);
                } else {

                    // Create error element
                    error = $("<" + this.settings.errorElement + ">")
                        .attr("id", elementID + "-error")
                        .addClass(this.settings.errorClass)
                        .html(message || "");

                    // Maintain reference to the element to be placed into the DOM
                    place = error;
                    if (this.settings.wrapper) {

                        // Make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (this.labelContainer.length) {
                        this.labelContainer.append(place);
                    } else if (this.settings.errorPlacement) {
                        this.settings.errorPlacement.call(this, place, $(element));
                    } else {
                        place.insertAfter(element);
                    }

                    // Link error back to the element
                    if (error.is("label")) {

                        // If the error is a label, then associate using 'for'
                        error.attr("for", elementID);

                        // If the element is not a child of an associated label, then it's necessary
                        // to explicitly apply aria-describedby
                    } else if (error.parents("label[for='" + this.escapeCssMeta(elementID) + "']").length === 0) {
                        errorID = error.attr("id");

                        // Respect existing non-error aria-describedby
                        if (!describedBy) {
                            describedBy = errorID;
                        } else if (!describedBy.match(new RegExp("\\b" + this.escapeCssMeta(errorID) + "\\b"))) {

                            // Add to end of list if not already present
                            describedBy += " " + errorID;
                        }
                        $(element).attr("aria-describedby", describedBy);

                        // If this element is grouped, then assign to all elements in the same group
                        group = this.groups[element.name];
                        if (group) {
                            v = this;
                            $.each(v.groups, function(name, testgroup) {
                                if (testgroup === group) {
                                    $("[name='" + v.escapeCssMeta(name) + "']", v.currentForm)
                                        .attr("aria-describedby", error.attr("id"));
                                }
                            });
                        }
                    }
                }
                if (!message && this.settings.success) {
                    error.text("");
                    if (typeof this.settings.success === "string") {
                        error.addClass(this.settings.success);
                    } else {
                        this.settings.success(error, element);
                    }
                }
                this.toShow = this.toShow.add(error);
            },

            errorsFor: function(element) {
                var name = this.escapeCssMeta(this.idOrName(element)),
                    describer = $(element).attr("aria-describedby"),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";

                // 'aria-describedby' should directly reference the error element
                if (describer) {
                    selector = selector + ", #" + this.escapeCssMeta(describer)
                        .replace(/\s+/g, ", #");
                }

                return this
                    .errors()
                    .filter(selector);
            },

            // See https://api.jquery.com/category/selectors/, for CSS
            // meta-characters that should be escaped in order to be used with JQuery
            // as a literal part of a name/id or any selector.
            escapeCssMeta: function(string) {
                return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },

            idOrName: function(element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function(element) {

                // If radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName(element.name);
                }

                // Always apply ignore filter
                return $(element).not(this.settings.ignore)[0];
            },

            checkable: function(element) {
                return (/radio|checkbox/i).test(element.type);
            },

            findByName: function(name) {
                return $(this.currentForm).find("[name='" + this.escapeCssMeta(name) + "']");
            },

            getLength: function(value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function(param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function(param) {
                    return param;
                },
                "string": function(param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function(param, element) {
                    return param(element);
                }
            },

            optional: function(element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function(element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    $(element).addClass(this.settings.pendingClass);
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function(element, valid) {
                this.pendingRequest--;

                // Sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                $(element).removeClass(this.settings.pendingClass);
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();

                    // Remove the hidden input that was used as a replacement for the
                    // missing submit button. The hidden input is added by `handle()`
                    // to ensure that the value of the used submit button is passed on
                    // for scripted submits triggered by this method
                    if (this.submitButton) {
                        $("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove();
                    }

                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function(element, method) {
                method = typeof method === "string" && method || "remote";

                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, { method: method })
                });
            },

            // Cleans up all forms and elements, removes validator-specific events
            destroy: function() {
                this.resetForm();

                $(this.currentForm)
                    .off(".validate")
                    .removeData("validator")
                    .find(".validate-equalTo-blur")
                    .off(".validate-equalTo")
                    .removeClass("validate-equalTo-blur");
            }

        },

        classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            number: { number: true },
            digits: { digits: true },
            creditcard: { creditcard: true }
        },

        addClassRules: function(className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function(element) {
            var rules = {},
                classes = $(element).attr("class");

            if (classes) {
                $.each(classes.split(" "), function() {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        normalizeAttributeRule: function(rules, type, method, value) {

            // Convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if (/min|max|step/.test(method) && (type === null || /number|range|text/.test(type))) {
                value = Number(value);

                // Support Opera Mini, which returns NaN for undefined minlength
                if (isNaN(value)) {
                    value = undefined;
                }
            }

            if (value || value === 0) {
                rules[method] = value;
            } else if (type === method && type !== "range") {

                // Exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[method] = true;
            }
        },

        attributeRules: function(element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {

                // Support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = element.getAttribute(method);

                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }

                    // Force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                this.normalizeAttributeRule(rules, type, method, value);
            }

            // 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function(element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                this.normalizeAttributeRule(rules, type, method, value);
            }
            return rules;
        },

        staticRules: function(element) {
            var rules = {},
                validator = $.data(element.form, "validator");

            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function(rules, element) {

            // Handle dependency check
            $.each(rules, function(prop, val) {

                // Ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        $.data(element.form, "validator").resetElements($(element));
                        delete rules[prop];
                    }
                }
            });

            // Evaluate parameters
            $.each(rules, function(rule, parameter) {
                rules[rule] = $.isFunction(parameter) && rule !== "normalizer" ? parameter(element) : parameter;
            });

            // Clean number parameters
            $.each(["minlength", "maxlength"], function() {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(["rangelength", "range"], function() {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {

                // Auto-create ranges
                if (rules.min != null && rules.max != null) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength != null && rules.maxlength != null) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function(data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function() {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // https://jqueryvalidation.org/jQuery.validator.addMethod/
        addMethod: function(name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        // https://jqueryvalidation.org/jQuery.validator.methods/
        methods: {

            // https://jqueryvalidation.org/required-method/
            required: function(value, element, param) {

                // Check if dependency is met
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {

                    // Could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return value.length > 0;
            },

            // https://jqueryvalidation.org/email-method/
            email: function(value, element) {

                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                // Retrieved 2014-01-14
                // If you have a problem with this implementation, report a bug against the above spec
                // Or use custom methods to implement your own email validation
                return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },

            // https://jqueryvalidation.org/url-method/
            url: function(value, element) {

                // Copyright (c) 2010-2013 Diego Perini, MIT licensed
                // https://gist.github.com/dperini/729294
                // see also https://mathiasbynens.be/demo/url-regex
                // modified to allow protocol-relative URLs
                return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
            },

            // https://jqueryvalidation.org/date-method/
            date: function(value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },

            // https://jqueryvalidation.org/dateISO-method/
            dateISO: function(value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            // https://jqueryvalidation.org/number-method/
            number: function(value, element) {
                return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },

            // https://jqueryvalidation.org/digits-method/
            digits: function(value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // https://jqueryvalidation.org/minlength-method/
            minlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param;
            },

            // https://jqueryvalidation.org/maxlength-method/
            maxlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length <= param;
            },

            // https://jqueryvalidation.org/rangelength-method/
            rangelength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            },

            // https://jqueryvalidation.org/min-method/
            min: function(value, element, param) {
                return this.optional(element) || value >= param;
            },

            // https://jqueryvalidation.org/max-method/
            max: function(value, element, param) {
                return this.optional(element) || value <= param;
            },

            // https://jqueryvalidation.org/range-method/
            range: function(value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            },

            // https://jqueryvalidation.org/step-method/
            step: function(value, element, param) {
                var type = $(element).attr("type"),
                    errorMessage = "Step attribute on input type " + type + " is not supported.",
                    supportedTypes = ["text", "number", "range"],
                    re = new RegExp("\\b" + type + "\\b"),
                    notSupported = type && !re.test(supportedTypes.join()),
                    decimalPlaces = function(num) {
                        var match = ("" + num).match(/(?:\.(\d+))?$/);
                        if (!match) {
                            return 0;
                        }

                        // Number of digits right of decimal point.
                        return match[1] ? match[1].length : 0;
                    },
                    toInt = function(num) {
                        return Math.round(num * Math.pow(10, decimals));
                    },
                    valid = true,
                    decimals;

                // Works only for text, number and range input types
                // TODO find a way to support input types date, datetime, datetime-local, month, time and week
                if (notSupported) {
                    throw new Error(errorMessage);
                }

                decimals = decimalPlaces(param);

                // Value can't have too many decimals
                if (decimalPlaces(value) > decimals || toInt(value) % toInt(param) !== 0) {
                    valid = false;
                }

                return this.optional(element) || valid;
            },

            // https://jqueryvalidation.org/equalTo-method/
            equalTo: function(value, element, param) {

                // Bind to the blur event of the target in order to revalidate whenever the target field is updated
                var target = $(param);
                if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
                    target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },

            // https://jqueryvalidation.org/remote-method/
            remote: function(value, element, param, method) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                method = typeof method === "string" && method || "remote";

                var previous = this.previousValue(element, method),
                    validator, data, optionDataString;

                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];
                this.settings.messages[element.name][method] = previous.message;

                param = typeof param === "string" && { url: param } || param;
                optionDataString = $.param($.extend({ data: value }, param.data));
                if (previous.old === optionDataString) {
                    return previous.valid;
                }

                previous.old = optionDataString;
                validator = this;
                this.startRequest(element);

                data = {};
                data[element.name] = value;
                //var current = element.getAttribute('data-current');
                //if (current && current.length) {
                //    if (current == value) return;
                //}
                $.ajax($.extend(true, {
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function(response) {
                        var valid = response === true || response === "true",
                            errors, message, submitted;

                        validator.settings.messages[element.name][method] = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.resetInternals();
                            validator.toHide = validator.errorsFor(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            validator.invalid[element.name] = false;
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, { method: method, parameters: value });
                            errors[element.name] = previous.message = message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }
        }

    });

    // Ajax mode: abort
    // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
    // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

    var pendingRequests = {},
        ajax;

    // Use a prefilter if available (1.5+)
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function(settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {

        // Proxy ajax
        ajax = $.ajax;
        $.ajax = function(settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }
    return $;
}));
//Version 1.8.2
/*eslint eqeqeq: "error"*/
(function () {
    var $, AbstractChosen, Chosen, SelectParser,
      bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; },
      extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
      hasProp = {}.hasOwnProperty;

    SelectParser = (function () {
        function SelectParser() {
            this.options_index = 0;
            this.parsed = [];
        }

        SelectParser.prototype.add_node = function (child) {
            if (child.nodeName.toUpperCase() === "OPTGROUP") {
                return this.add_group(child);
            } else {
                return this.add_option(child);
            }
        };

        SelectParser.prototype.add_group = function (group) {
            var group_position, i, len, option, ref, results1;
            group_position = this.parsed.length;
            this.parsed.push({
                array_index: group_position,
                group: true,
                label: group.label,
                title: group.title ? group.title : void 0,
                children: 0,
                disabled: group.disabled,
                classes: group.className
            });
            ref = group.childNodes;
            results1 = [];
            for (i = 0, len = ref.length; i < len; i++) {
                option = ref[i];
                results1.push(this.add_option(option, group_position, group.disabled));
            }
            return results1;
        };

        SelectParser.prototype.add_option = function (option, group_position, group_disabled) {
            if (option.nodeName.toUpperCase() === "OPTION") {
                if (option.text !== "") {
                    if (group_position != null) {
                        this.parsed[group_position].children += 1;
                    }
                    this.parsed.push({
                        array_index: this.parsed.length,
                        options_index: this.options_index,
                        value: option.value,
                        text: option.text,
                        html: option.innerHTML,
                        title: option.title ? option.title : void 0,
                        selected: option.selected,
                        disabled: group_disabled === true ? group_disabled : option.disabled,
                        group_array_index: group_position,
                        group_label: group_position != null ? this.parsed[group_position].label : null,
                        classes: option.className,
                        style: option.style.cssText
                    });
                } else {
                    this.parsed.push({
                        array_index: this.parsed.length,
                        options_index: this.options_index,
                        empty: true
                    });
                }
                return this.options_index += 1;
            }
        };

        return SelectParser;

    })();

    SelectParser.select_to_array = function (select) {
        var child, i, len, parser, ref;
        parser = new SelectParser();
        ref = select.childNodes;
        for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            parser.add_node(child);
        }
        return parser.parsed;
    };

    AbstractChosen = (function () {
        function AbstractChosen(form_field, options1) {
            this.form_field = form_field;
            this.options = options1 != null ? options1 : {};
            this.label_click_handler = bind(this.label_click_handler, this);
            if (!AbstractChosen.browser_is_supported()) {
                return;
            }
            this.is_multiple = this.form_field.multiple;
            this.set_default_text();
            this.set_default_values();
            this.setup();
            this.set_up_html();
            this.register_observers();
            this.on_ready();
        }

        AbstractChosen.prototype.set_default_values = function () {
            this.click_test_action = (function (_this) {
                return function (evt) {
                    return _this.test_active_click(evt);
                };
            })(this);
            this.activate_action = (function (_this) {
                return function (evt) {
                    return _this.activate_field(evt);
                };
            })(this);
            this.active_field = false;
            this.mouse_on_container = false;
            this.results_showing = false;
            this.result_highlighted = null;
            this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className);
            this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
            this.disable_search_threshold = this.options.disable_search_threshold || 0;
            this.disable_search = this.options.disable_search || false;
            this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
            this.group_search = this.options.group_search != null ? this.options.group_search : true;
            this.search_contains = this.options.search_contains || false;
            this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
            this.max_selected_options = this.options.max_selected_options || Infinity;
            this.inherit_select_classes = this.options.inherit_select_classes || false;
            this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
            this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
            this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;
            this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY;
            this.case_sensitive_search = this.options.case_sensitive_search || false;
            return this.hide_results_on_select = this.options.hide_results_on_select != null ? this.options.hide_results_on_select : true;
        };

        AbstractChosen.prototype.set_default_text = function () {
            if (this.form_field.getAttribute("data-placeholder")) {
                this.default_text = this.form_field.getAttribute("data-placeholder");
            } else if (this.is_multiple) {
                this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
            } else {
                this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
            }
            this.default_text = this.escape_html(this.default_text);
            return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
        };

        AbstractChosen.prototype.choice_label = function (item) {
            if (this.include_group_label_in_selected && (item.group_label != null)) {
                return "<b class='group-name'>" + item.group_label + "</b>" + item.html;
            } else {
                return item.html;
            }
        };

        AbstractChosen.prototype.mouse_enter = function () {
            return this.mouse_on_container = true;
        };

        AbstractChosen.prototype.mouse_leave = function () {
            return this.mouse_on_container = false;
        };

        AbstractChosen.prototype.input_focus = function (evt) {
            if (this.is_multiple) {
                if (!this.active_field) {
                    return setTimeout(((function (_this) {
                        return function () {
                            return _this.container_mousedown();
                        };
                    })(this)), 50);
                }
            } else {
                if (!this.active_field) {
                    return this.activate_field();
                }
            }
        };

        AbstractChosen.prototype.input_blur = function (evt) {
            if (!this.mouse_on_container) {
                this.active_field = false;
                return setTimeout(((function (_this) {
                    return function () {
                        return _this.blur_test();
                    };
                })(this)), 100);
            }
        };

        AbstractChosen.prototype.label_click_handler = function (evt) {
            if (this.is_multiple) {
                return this.container_mousedown(evt);
            } else {
                return this.activate_field();
            }
        };

        AbstractChosen.prototype.results_option_build = function (options) {
            var content, data, data_content, i, len, ref, shown_results;
            content = '';
            shown_results = 0;
            ref = this.results_data;
            for (i = 0, len = ref.length; i < len; i++) {
                data = ref[i];
                data_content = '';
                if (data.group) {
                    data_content = this.result_add_group(data);
                } else {
                    data_content = this.result_add_option(data);
                }
                if (data_content !== '') {
                    shown_results++;
                    content += data_content;
                }
                if (options != null ? options.first : void 0) {
                    if (data.selected && this.is_multiple) {
                        this.choice_build(data);
                    } else if (data.selected && !this.is_multiple) {
                        this.single_set_selected_text(this.choice_label(data));
                    }
                }
                if (shown_results >= this.max_shown_results) {
                    break;
                }
            }
            return content;
        };

        AbstractChosen.prototype.result_add_option = function (option) {
            var classes, option_el;
            if (!option.search_match) {
                return '';
            }
            if (!this.include_option_in_results(option)) {
                return '';
            }
            classes = [];
            if (!option.disabled && !(option.selected && this.is_multiple)) {
                classes.push("active-result");
            }
            if (option.disabled && !(option.selected && this.is_multiple)) {
                classes.push("disabled-result");
            }
            if (option.selected) {
                classes.push("result-selected");
            }
            if (option.group_array_index != null) {
                classes.push("group-option");
            }
            if (option.classes !== "") {
                classes.push(option.classes);
            }
            option_el = document.createElement("li");
            option_el.className = classes.join(" ");
            option_el.style.cssText = option.style;
            option_el.setAttribute("data-option-array-index", option.array_index);
            option_el.innerHTML = option.highlighted_html || option.html;
            if (option.title) {
                option_el.title = option.title;
            }
            return this.outerHTML(option_el);
        };

        AbstractChosen.prototype.result_add_group = function (group) {
            var classes, group_el;
            if (!(group.search_match || group.group_match)) {
                return '';
            }
            if (!(group.active_options > 0)) {
                return '';
            }
            classes = [];
            classes.push("group-result");
            if (group.classes) {
                classes.push(group.classes);
            }
            group_el = document.createElement("li");
            group_el.className = classes.join(" ");
            group_el.innerHTML = group.highlighted_html || this.escape_html(group.label);
            if (group.title) {
                group_el.title = group.title;
            }
            return this.outerHTML(group_el);
        };

        AbstractChosen.prototype.results_update_field = function () {
            this.set_default_text();
            if (!this.is_multiple) {
                this.results_reset_cleanup();
            }
            this.result_clear_highlight();
            this.results_build();
            if (this.results_showing) {
                return this.winnow_results();
            }
        };

        AbstractChosen.prototype.reset_single_select_options = function () {
            var i, len, ref, result, results1;
            ref = this.results_data;
            results1 = [];
            for (i = 0, len = ref.length; i < len; i++) {
                result = ref[i];
                if (result.selected) {
                    results1.push(result.selected = false);
                } else {
                    results1.push(void 0);
                }
            }
            return results1;
        };

        AbstractChosen.prototype.results_toggle = function () {
            if (this.results_showing) {
                return this.results_hide();
            } else {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.results_search = function (evt) {
            if (this.results_showing) {
                return this.winnow_results();
            } else {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.winnow_results = function () {
            var escapedQuery, fix, i, len, option, prefix, query, ref, regex, results, results_group, search_match, startpos, suffix, text;
            this.no_results_clear();
            results = 0;
            query = this.get_search_text();
            escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            regex = this.get_search_regex(escapedQuery);
            ref = this.results_data;
            for (i = 0, len = ref.length; i < len; i++) {
                option = ref[i];
                option.search_match = false;
                results_group = null;
                search_match = null;
                option.highlighted_html = '';
                if (this.include_option_in_results(option)) {
                    if (option.group) {
                        option.group_match = false;
                        option.active_options = 0;
                    }
                    if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
                        results_group = this.results_data[option.group_array_index];
                        if (results_group.active_options === 0 && results_group.search_match) {
                            results += 1;
                        }
                        results_group.active_options += 1;
                    }
                    text = option.group ? option.label : option.text;
                    if (!(option.group && !this.group_search)) {
                        search_match = this.search_string_match(text, regex);
                        option.search_match = search_match != null;
                        if (option.search_match && !option.group) {
                            results += 1;
                        }
                        if (option.search_match) {
                            if (query.length) {
                                startpos = search_match.index;
                                prefix = text.slice(0, startpos);
                                fix = text.slice(startpos, startpos + query.length);
                                suffix = text.slice(startpos + query.length);
                                option.highlighted_html = (this.escape_html(prefix)) + "<em>" + (this.escape_html(fix)) + "</em>" + (this.escape_html(suffix));
                            }
                            if (results_group != null) {
                                results_group.group_match = true;
                            }
                        } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
                            option.search_match = true;
                        }
                    }
                }
            }
            this.result_clear_highlight();
            if (results < 1 && query.length) {
                this.update_results_content("");
                return this.no_results(query);
            } else {
                this.update_results_content(this.results_option_build());
                return this.winnow_results_set_highlight();
            }
        };

        AbstractChosen.prototype.get_search_regex = function (escaped_search_id) {
            var regex_flag, regex_string;
            regex_string = this.search_contains ? escaped_search_id : "(^|\\s|\\b)" + escaped_search_id + "[^\\s]*";
            if (!(this.enable_split_word_search || this.search_contains)) {
                regex_string = "^" + regex_string;
            }
            regex_flag = this.case_sensitive_search ? "" : "i";
            return new RegExp(regex_string, regex_flag);
        };

        AbstractChosen.prototype.search_string_match = function (search_string, regex) {
            var match;
            match = regex.exec(search_string);
            if (!this.search_contains && (match != null ? match[1] : void 0)) {
                match.index += 1;
            }
            return match;
        };

        AbstractChosen.prototype.choices_count = function () {
            var i, len, option, ref;
            if (this.selected_option_count != null) {
                return this.selected_option_count;
            }
            this.selected_option_count = 0;
            ref = this.form_field.options;
            for (i = 0, len = ref.length; i < len; i++) {
                option = ref[i];
                if (option.selected) {
                    this.selected_option_count += 1;
                }
            }
            return this.selected_option_count;
        };

        AbstractChosen.prototype.choices_click = function (evt) {
            evt.preventDefault();
            this.activate_field();
            if (!(this.results_showing || this.is_disabled)) {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.keydown_checker = function (evt) {
            var ref, stroke;
            stroke = (ref = evt.which) != null ? ref : evt.keyCode;
            this.search_field_scale();
            if (stroke !== 8 && this.pending_backstroke) {
                this.clear_backstroke();
            }
            switch (stroke) {
                case 8:
                    this.backstroke_length = this.get_search_field_value().length;
                    break;
                case 9:
                    if (this.results_showing && !this.is_multiple) {
                        this.result_select(evt);
                    }
                    this.mouse_on_container = false;
                    break;
                case 13:
                    evt.preventDefault();
                    if (this.results_showing) {

                        //if (!this.is_multiple || this.result_highlight) {
                        //    return this.result_select(evt);
                        //}
                        if (this.result_highlight) {
                            return this.result_select(evt);
                        }
                        $(this.form_field).append('<option value="' + evt.target.value + '">' + evt.target.value + '</option>');
                        $(this.form_field).trigger('chosen:updated');
                        this.result_highlight = this.search_results.find('li.active-result').last();
                        return this.result_select(evt);
                    }
                    //if (this.results_showing) {
                    //  evt.preventDefault();
                    //}
                    break;
                case 27:
                    if (this.results_showing) {
                        evt.preventDefault();
                    }
                    break;
                case 32:
                    if (this.disable_search) {
                        evt.preventDefault();
                    }
                    break;
                case 38:
                    evt.preventDefault();
                    this.keyup_arrow();
                    break;
                case 40:
                    evt.preventDefault();
                    this.keydown_arrow();
                    break;
            }
        };

        AbstractChosen.prototype.keyup_checker = function (evt) {
            var ref, stroke;
            stroke = (ref = evt.which) != null ? ref : evt.keyCode;
            this.search_field_scale();
            switch (stroke) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
                        this.keydown_backstroke();
                    } else if (!this.pending_backstroke) {
                        this.result_clear_highlight();
                        this.results_search();
                    }
                    break;
                case 13:
                    evt.preventDefault();
                    if (this.results_showing) {
                        this.result_select(evt);
                    }
                    break;
                case 27:
                    if (this.results_showing) {
                        this.results_hide();
                    }
                    break;
                case 9:
                case 16:
                case 17:
                case 18:
                case 38:
                case 40:
                case 91:
                    break;
                default:
                    this.results_search();
                    break;
            }
        };

        AbstractChosen.prototype.clipboard_event_checker = function (evt) {
            if (this.is_disabled) {
                return;
            }
            return setTimeout(((function (_this) {
                return function () {
                    return _this.results_search();
                };
            })(this)), 50);
        };

        AbstractChosen.prototype.container_width = function () {
            if (this.options.width != null) {
                return this.options.width;
            } else {
                return this.form_field.offsetWidth + "px";
            }
        };

        AbstractChosen.prototype.include_option_in_results = function (option) {
            if (this.is_multiple && (!this.display_selected_options && option.selected)) {
                return false;
            }
            if (!this.display_disabled_options && option.disabled) {
                return false;
            }
            if (option.empty) {
                return false;
            }
            return true;
        };

        AbstractChosen.prototype.search_results_touchstart = function (evt) {
            this.touch_started = true;
            return this.search_results_mouseover(evt);
        };

        AbstractChosen.prototype.search_results_touchmove = function (evt) {
            this.touch_started = false;
            return this.search_results_mouseout(evt);
        };

        AbstractChosen.prototype.search_results_touchend = function (evt) {
            if (this.touch_started) {
                return this.search_results_mouseup(evt);
            }
        };

        AbstractChosen.prototype.outerHTML = function (element) {
            var tmp;
            if (element.outerHTML) {
                return element.outerHTML;
            }
            tmp = document.createElement("div");
            tmp.appendChild(element);
            return tmp.innerHTML;
        };

        AbstractChosen.prototype.get_single_html = function () {
            return "<a class=\"chosen-single chosen-default\">\n  <span>" + this.default_text + "</span>\n  <div><b></b></div>\n</a>\n<div class=\"chosen-drop\">\n  <div class=\"chosen-search\">\n    <input class=\"chosen-search-input input-text ignore\" type=\"text\" autocomplete=\"off\" />\n  </div>\n  <ul class=\"chosen-results\"></ul>\n</div>";
        };

        AbstractChosen.prototype.get_multi_html = function () {
            return "<ul class=\"chosen-choices\">\n  <li class=\"search-field\">\n    <input class=\"chosen-search-input text-input ignore\" type=\"text\" autocomplete=\"off\" value=\"" + this.default_text + "\" />\n  </li>\n</ul>\n<div class=\"chosen-drop\">\n  <ul class=\"chosen-results\"></ul>\n</div>";
        };

        AbstractChosen.prototype.get_no_results_html = function (terms) {
            return "<li class=\"no-results\">\n  " + this.results_none_found + " <span>" + (this.escape_html(terms)) + "</span>\n</li>";
        };

        AbstractChosen.browser_is_supported = function () {
            if ("Microsoft Internet Explorer" === window.navigator.appName) {
                return document.documentMode >= 8;
            }
            //if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {
            //    return false;
            //}
            return true;
        };

        AbstractChosen.default_multiple_text = "Select Some Options";

        AbstractChosen.default_single_text = "Select an Option";

        AbstractChosen.default_no_result_text = "No results match";

        return AbstractChosen;

    })();

    $ = jQuery;

    $.fn.extend({
        chosen: function (options) {
            if (!AbstractChosen.browser_is_supported()) {
                console.log('chosen not Supported');
                return this;
            }
            return this.each(function (input_field) {
                var $this, chosen;
                $this = $(this);
                chosen = $this.data('chosen');
                if (options === 'destroy') {
                    if (chosen instanceof Chosen) {
                        chosen.destroy();
                    }
                    return;
                }
                if (!(chosen instanceof Chosen)) {
                    $this.data('chosen', new Chosen(this, options));
                }
            });
        }
    });

    Chosen = (function (superClass) {
        extend(Chosen, superClass);

        function Chosen() {
            return Chosen.__super__.constructor.apply(this, arguments);
        }

        Chosen.prototype.setup = function () {
            this.form_field_jq = $(this.form_field);
            return this.current_selectedIndex = this.form_field.selectedIndex;
        };

        Chosen.prototype.set_up_html = function () {
            var container_classes, container_props;
            container_classes = ["chosen-container"];
            container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
            if (this.inherit_select_classes && this.form_field.className) {
                container_classes.push(this.form_field.className);
            }
            if (this.is_rtl) {
                container_classes.push("chosen-rtl");
            }
            container_props = {
                'class': container_classes.join(' '),
                'title': this.form_field.title
            };
            if (this.form_field.id.length) {
                container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
            }
            this.container = $("<div />", container_props);
           // this.container.width(this.container_width());
            if (this.is_multiple) {
                this.container.html(this.get_multi_html());
            } else {
                this.container.html(this.get_single_html());
            }
            this.form_field_jq.hide().after(this.container);
            this.dropdown = this.container.find('div.chosen-drop').first();
            this.search_field = this.container.find('input').first();
            this.search_results = this.container.find('ul.chosen-results').first();
            this.search_field_scale();
            this.search_no_results = this.container.find('li.no-results').first();
            if (this.is_multiple) {
                this.search_choices = this.container.find('ul.chosen-choices').first();
                this.search_container = this.container.find('li.search-field').first();
            } else {
                this.search_container = this.container.find('div.chosen-search').first();
                this.selected_item = this.container.find('.chosen-single').first();
            }
            this.results_build();
            this.set_tab_index();
            return this.set_label_behavior();
        };

        Chosen.prototype.on_ready = function () {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            });
        };

        Chosen.prototype.register_observers = function () {
            this.container.on('touchstart.chosen', (function (_this) {
                return function (evt) {
                    _this.container_mousedown(evt);
                };
            })(this));
            this.container.on('touchend.chosen', (function (_this) {
                return function (evt) {
                    _this.container_mouseup(evt);
                };
            })(this));
            this.container.on('mousedown.chosen', (function (_this) {
                return function (evt) {
                    _this.container_mousedown(evt);
                };
            })(this));
            this.container.on('mouseup.chosen', (function (_this) {
                return function (evt) {
                    _this.container_mouseup(evt);
                };
            })(this));
            this.container.on('mouseenter.chosen', (function (_this) {
                return function (evt) {
                    _this.mouse_enter(evt);
                };
            })(this));
            this.container.on('mouseleave.chosen', (function (_this) {
                return function (evt) {
                    _this.mouse_leave(evt);
                };
            })(this));
            this.search_results.on('mouseup.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_mouseup(evt);
                };
            })(this));
            this.search_results.on('mouseover.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_mouseover(evt);
                };
            })(this));
            this.search_results.on('mouseout.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_mouseout(evt);
                };
            })(this));
            this.search_results.on('mousewheel.chosen DOMMouseScroll.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_mousewheel(evt);
                };
            })(this));
            this.search_results.on('touchstart.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_touchstart(evt);
                };
            })(this));
            this.search_results.on('touchmove.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_touchmove(evt);
                };
            })(this));
            this.search_results.on('touchend.chosen', (function (_this) {
                return function (evt) {
                    _this.search_results_touchend(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:updated.chosen", (function (_this) {
                return function (evt) {
                    _this.results_update_field(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:activate.chosen", (function (_this) {
                return function (evt) {
                    _this.activate_field(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:open.chosen", (function (_this) {
                return function (evt) {
                    _this.container_mousedown(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:close.chosen", (function (_this) {
                return function (evt) {
                    _this.close_field(evt);
                };
            })(this));
            this.search_field.on('blur.chosen', (function (_this) {
                return function (evt) {
                    _this.input_blur(evt);
                };
            })(this));
            this.search_field.on('keyup.chosen', (function (_this) {
                return function (evt) {
                    _this.keyup_checker(evt);
                };
            })(this));
            this.search_field.on('keydown.chosen', (function (_this) {
                return function (evt) {
                    _this.keydown_checker(evt);
                };
            })(this));
            this.search_field.on('focus.chosen', (function (_this) {
                return function (evt) {
                    _this.input_focus(evt);
                };
            })(this));
            this.search_field.on('cut.chosen', (function (_this) {
                return function (evt) {
                    _this.clipboard_event_checker(evt);
                };
            })(this));
            this.search_field.on('paste.chosen', (function (_this) {
                return function (evt) {
                    _this.clipboard_event_checker(evt);
                };
            })(this));
            if (this.is_multiple) {
                return this.search_choices.on('click.chosen', (function (_this) {
                    return function (evt) {
                        _this.choices_click(evt);
                    };
                })(this));
            } else {
                return this.container.on('click.chosen', function (evt) {
                    evt.preventDefault();
                });
            }
        };

        Chosen.prototype.destroy = function () {
            $(this.container[0].ownerDocument).off('click.chosen', this.click_test_action);
            if (this.form_field_label.length > 0) {
                this.form_field_label.off('click.chosen');
            }
            if (this.search_field[0].tabIndex) {
                this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
            }
            this.container.remove();
            this.form_field_jq.removeData('chosen');
            return this.form_field_jq.show();
        };

        Chosen.prototype.search_field_disabled = function () {
            this.is_disabled = this.form_field.disabled || this.form_field_jq.parents('fieldset').is(':disabled');
            this.container.toggleClass('chosen-disabled', this.is_disabled);
            this.search_field[0].disabled = this.is_disabled;
            if (!this.is_multiple) {
                this.selected_item.off('focus.chosen', this.activate_field);
            }
            if (this.is_disabled) {
                return this.close_field();
            } else if (!this.is_multiple) {
                return this.selected_item.on('focus.chosen', this.activate_field);
            }
        };

        Chosen.prototype.container_mousedown = function (evt) {
            var ref;
            if (this.is_disabled) {
                return;
            }
            if (evt && ((ref = evt.type) === 'mousedown' || ref === 'touchstart') && !this.results_showing) {
                evt.preventDefault();
            }
            if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
                if (!this.active_field) {
                    if (this.is_multiple) {
                        this.search_field.val("");
                    }
                    $(this.container[0].ownerDocument).on('click.chosen', this.click_test_action);
                    this.results_show();
                } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
                    evt.preventDefault();
                    this.results_toggle();
                }
                return this.activate_field();
            }
        };

        Chosen.prototype.container_mouseup = function (evt) {
            if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
                return this.results_reset(evt);
            }
        };

        Chosen.prototype.search_results_mousewheel = function (evt) {
            var delta;
            if (evt.originalEvent) {
                delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
            }
            if (delta != null) {
                evt.preventDefault();
                if (evt.type === 'DOMMouseScroll') {
                    delta = delta * 40;
                }
                return this.search_results.scrollTop(delta + this.search_results.scrollTop());
            }
        };

        Chosen.prototype.blur_test = function (evt) {
            if (!this.active_field && this.container.hasClass("chosen-container-active")) {
                return this.close_field();
            }
        };

        Chosen.prototype.close_field = function () {
            $(this.container[0].ownerDocument).off("click.chosen", this.click_test_action);
            this.active_field = false;
            this.results_hide();
            this.container.removeClass("chosen-container-active");
            this.clear_backstroke();
            this.show_search_field_default();
            this.search_field_scale();
            return this.search_field.blur();
        };

        Chosen.prototype.activate_field = function () {
            if (this.is_disabled) {
                return;
            }
            this.container.addClass("chosen-container-active");
            this.active_field = true;
            this.search_field.val(this.search_field.val());
            return this.search_field.focus();
        };

        Chosen.prototype.test_active_click = function (evt) {
            var active_container;
            active_container = $(evt.target).closest('.chosen-container');
            if (active_container.length && this.container[0] === active_container[0]) {
                return this.active_field = true;
            } else {
                return this.close_field();
            }
        };

        Chosen.prototype.results_build = function () {
            this.parsing = true;
            this.selected_option_count = null;
            this.results_data = SelectParser.select_to_array(this.form_field);
            if (this.is_multiple) {
                this.search_choices.find("li.search-choice").remove();
            } else if (!this.is_multiple) {
                this.single_set_selected_text();
                if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
                    this.search_field[0].readOnly = true;
                    this.container.addClass("chosen-container-single-nosearch");
                } else {
                    this.search_field[0].readOnly = false;
                    this.container.removeClass("chosen-container-single-nosearch");
                }
            }
            this.update_results_content(this.results_option_build({
                first: true
            }));
            this.search_field_disabled();
            this.show_search_field_default();
            this.search_field_scale();
            return this.parsing = false;
        };

        Chosen.prototype.result_do_highlight = function (el) {
            var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
            if (el.length) {
                this.result_clear_highlight();
                this.result_highlight = el;
                this.result_highlight.addClass("highlighted");
                maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
                visible_top = this.search_results.scrollTop();
                visible_bottom = maxHeight + visible_top;
                high_top = this.result_highlight.position().top + this.search_results.scrollTop();
                high_bottom = high_top + this.result_highlight.outerHeight();
                if (high_bottom >= visible_bottom) {
                    return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
                } else if (high_top < visible_top) {
                    return this.search_results.scrollTop(high_top);
                }
            }
        };

        Chosen.prototype.result_clear_highlight = function () {
            if (this.result_highlight) {
                this.result_highlight.removeClass("highlighted");
            }
            return this.result_highlight = null;
        };

        Chosen.prototype.results_show = function () {
            if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
                this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                });
                return false;
            }
            this.container.addClass("chosen-with-drop");
            this.results_showing = true;
            this.search_field.focus();
            this.search_field.val(this.get_search_field_value());
            this.winnow_results();
            return this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            });
        };

        Chosen.prototype.update_results_content = function (content) {
            return this.search_results.html(content);
        };

        Chosen.prototype.results_hide = function () {
            if (this.results_showing) {
                this.result_clear_highlight();
                this.container.removeClass("chosen-with-drop");
                this.form_field_jq.trigger("chosen:hiding_dropdown", {
                    chosen: this
                });
            }
            return this.results_showing = false;
        };

        Chosen.prototype.set_tab_index = function (el) {
            var ti;
            if (this.form_field.tabIndex) {
                ti = this.form_field.tabIndex;
                this.form_field.tabIndex = -1;
                return this.search_field[0].tabIndex = ti;
            }
        };

        Chosen.prototype.set_label_behavior = function () {
            this.form_field_label = this.form_field_jq.parents("label");
            if (!this.form_field_label.length && this.form_field.id.length) {
                this.form_field_label = $("label[for='" + this.form_field.id + "']");
            }
            if (this.form_field_label.length > 0) {
                return this.form_field_label.on('click.chosen', this.label_click_handler);
            }
        };

        Chosen.prototype.show_search_field_default = function () {
            if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
                this.search_field.val(this.default_text);
                return this.search_field.addClass("default");
            } else {
                this.search_field.val("");
                return this.search_field.removeClass("default");
            }
        };

        Chosen.prototype.search_results_mouseup = function (evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if (target.length) {
                this.result_highlight = target;
                this.result_select(evt);
                return this.search_field.focus();
            }
        };

        Chosen.prototype.search_results_mouseover = function (evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if (target) {
                return this.result_do_highlight(target);
            }
        };

        Chosen.prototype.search_results_mouseout = function (evt) {
            if ($(evt.target).hasClass("active-result") || $(evt.target).parents('.active-result').first()) {
                return this.result_clear_highlight();
            }
        };

        Chosen.prototype.choice_build = function (item) {
            var choice, close_link;
            choice = $('<li />', {
                "class": "search-choice"
            }).html("<span>" + (this.choice_label(item)) + "</span>");
            if (item.disabled) {
                choice.addClass('search-choice-disabled');
            } else {
                close_link = $('<a />', {
                    "class": 'search-choice-close',
                    'data-option-array-index': item.array_index
                });
                close_link.on('click.chosen', (function (_this) {
                    return function (evt) {
                        return _this.choice_destroy_link_click(evt);
                    };
                })(this));
                choice.append(close_link);
            }
            return this.search_container.before(choice);
        };

        Chosen.prototype.choice_destroy_link_click = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (!this.is_disabled) {
                return this.choice_destroy($(evt.target));
            }
        };

        Chosen.prototype.choice_destroy = function (link) {
            if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
                if (this.active_field) {
                    this.search_field.focus();
                } else {
                    this.show_search_field_default();
                }
                if (this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1) {
                    this.results_hide();
                }
                link.parents('li').first().remove();
                return this.search_field_scale();
            }
        };

        Chosen.prototype.results_reset = function () {
            this.reset_single_select_options();
            this.form_field.options[0].selected = true;
            this.single_set_selected_text();
            this.show_search_field_default();
            this.results_reset_cleanup();
            this.trigger_form_field_change();
            if (this.active_field) {
                return this.results_hide();
            }
        };

        Chosen.prototype.results_reset_cleanup = function () {
            this.current_selectedIndex = this.form_field.selectedIndex;
            return this.selected_item.find("abbr").remove();
        };

        Chosen.prototype.result_select = function (evt) {
            var high, item;
            if (this.result_highlight) {
                high = this.result_highlight;
                this.result_clear_highlight();
                if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
                    this.form_field_jq.trigger("chosen:maxselected", {
                        chosen: this
                    });
                    return false;
                }
                if (this.is_multiple) {
                    high.removeClass("active-result");
                } else {
                    this.reset_single_select_options();
                }
                high.addClass("result-selected");
                item = this.results_data[high[0].getAttribute("data-option-array-index")];
                item.selected = true;
                this.form_field.options[item.options_index].selected = true;
                this.selected_option_count = null;
                this.search_field.val("");
                if (this.is_multiple) {
                    this.choice_build(item);
                } else {
                    this.single_set_selected_text(this.choice_label(item));
                }
                if (this.is_multiple && (!this.hide_results_on_select || (evt.metaKey || evt.ctrlKey))) {
                    this.winnow_results();
                } else {
                    this.results_hide();
                    this.show_search_field_default();
                }
                if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
                    this.trigger_form_field_change({
                        selected: this.form_field.options[item.options_index].value
                    });
                }
                this.current_selectedIndex = this.form_field.selectedIndex;
                evt.preventDefault();
                return this.search_field_scale();
            }
        };

        Chosen.prototype.single_set_selected_text = function (text) {
            if (text == null) {
                text = this.default_text;
            }
            if (text === this.default_text) {
                this.selected_item.addClass("chosen-default");
            } else {
                this.single_deselect_control_build();
                this.selected_item.removeClass("chosen-default");
            }
            return this.selected_item.find("span").html(text);
        };

        Chosen.prototype.result_deselect = function (pos) {
            var result_data;
            result_data = this.results_data[pos];
            if (!this.form_field.options[result_data.options_index].disabled) {
                result_data.selected = false;
                this.form_field.options[result_data.options_index].selected = false;
                this.selected_option_count = null;
                this.result_clear_highlight();
                if (this.results_showing) {
                    this.winnow_results();
                }
                this.trigger_form_field_change({
                    deselected: this.form_field.options[result_data.options_index].value
                });
                this.search_field_scale();
                return true;
            } else {
                return false;
            }
        };

        Chosen.prototype.single_deselect_control_build = function () {
            if (!this.allow_single_deselect) {
                return;
            }
            if (!this.selected_item.find("abbr").length) {
                this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
            }
            return this.selected_item.addClass("chosen-single-with-deselect");
        };

        Chosen.prototype.get_search_field_value = function () {
            return this.search_field.val();
        };

        Chosen.prototype.get_search_text = function () {
            return $.trim(this.get_search_field_value());
        };

        Chosen.prototype.escape_html = function (text) {
            return $('<div/>').text(text).html();
        };

        Chosen.prototype.winnow_results_set_highlight = function () {
            var do_high, selected_results;
            selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
            do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
            if (do_high != null) {
                return this.result_do_highlight(do_high);
            }
        };

        Chosen.prototype.no_results = function (terms) {
            var no_results_html;
            no_results_html = this.get_no_results_html(terms);
            this.search_results.append(no_results_html);
            return this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            });
        };

        Chosen.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove();
        };

        Chosen.prototype.keydown_arrow = function () {
            var next_sib;
            if (this.results_showing && this.result_highlight) {
                next_sib = this.result_highlight.nextAll("li.active-result").first();
                if (next_sib) {
                    return this.result_do_highlight(next_sib);
                }
            } else {
                return this.results_show();
            }
        };

        Chosen.prototype.keyup_arrow = function () {
            var prev_sibs;
            if (!this.results_showing && !this.is_multiple) {
                return this.results_show();
            } else if (this.result_highlight) {
                prev_sibs = this.result_highlight.prevAll("li.active-result");
                if (prev_sibs.length) {
                    return this.result_do_highlight(prev_sibs.first());
                } else {
                    if (this.choices_count() > 0) {
                        this.results_hide();
                    }
                    return this.result_clear_highlight();
                }
            }
        };

        Chosen.prototype.keydown_backstroke = function () {
            var next_available_destroy;
            if (this.pending_backstroke) {
                this.choice_destroy(this.pending_backstroke.find("a").first());
                return this.clear_backstroke();
            } else {
                next_available_destroy = this.search_container.siblings("li.search-choice").last();
                if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
                    this.pending_backstroke = next_available_destroy;
                    if (this.single_backstroke_delete) {
                        return this.keydown_backstroke();
                    } else {
                        return this.pending_backstroke.addClass("search-choice-focus");
                    }
                }
            }
        };

        Chosen.prototype.clear_backstroke = function () {
            if (this.pending_backstroke) {
                this.pending_backstroke.removeClass("search-choice-focus");
            }
            return this.pending_backstroke = null;
        };

        Chosen.prototype.search_field_scale = function () {
            var div, i, len, style, style_block, styles, width;
            if (!this.is_multiple) {
                return;
            }
            style_block = {
                position: 'absolute',
                left: '-1000px',
                top: '-1000px',
                display: 'none',
                whiteSpace: 'pre'
            };
            styles = ['fontSize', 'fontStyle', 'fontWeight', 'fontFamily', 'lineHeight', 'textTransform', 'letterSpacing'];
            for (i = 0, len = styles.length; i < len; i++) {
                style = styles[i];
                style_block[style] = this.search_field.css(style);
            }
            div = $('<div />').css(style_block);
            div.text(this.get_search_field_value());
            $('body').append(div);
            width = div.width() + 25;
            div.remove();
            if (this.container.is(':visible')) {
                width = Math.min(this.container.outerWidth() - 10, width);
            }
            return this.search_field.width(width);
        };

        Chosen.prototype.trigger_form_field_change = function (extra) {
            this.form_field_jq.trigger("input", extra);
            return this.form_field_jq.trigger("change", extra);
        };

        return Chosen;

    })(AbstractChosen);

}).call(this);

/*! Jcrop.js v2.0.4 - build: 20151117
 *  @copyright 2008-2015 Tapmodo Interactive LLC
 *  @license Free software under MIT License
 *  @website http://jcrop.org/
 **/
/*eslint eqeqeq: "error"*/
(function ($) {
    'use strict';

    // Jcrop constructor
    var Jcrop = function (element, opt) {
        var _ua = navigator.userAgent.toLowerCase();

        this.opt = $.extend({}, Jcrop.defaults, opt || {});

        this.container = $(element);

        this.opt.is_msie = /msie/.test(_ua);
        this.opt.is_ie_lt9 = /msie [1-8]\./.test(_ua);

        this.container.addClass(this.opt.css_container);

        this.ui = {};
        this.state = null;
        this.ui.multi = [];
        this.ui.selection = null;
        this.filter = {};

        this.init();
        this.setOptions(opt);
        this.applySizeConstraints();
        this.container.trigger('cropinit', this);

        // IE<9 doesn't work if mouse events are attached to window
        if (this.opt.is_ie_lt9)
            this.opt.dragEventTarget = document.body;
    };


    // Jcrop static functions
    $.extend(Jcrop, {
        component: {},
        filter: {},
        stage: {},
        registerComponent: function (name, component) {
            Jcrop.component[name] = component;
        },
        registerFilter: function (name, filter) {
            Jcrop.filter[name] = filter;
        },
        registerStageType: function (name, stage) {
            Jcrop.stage[name] = stage;
        },
        // attach: function(element,opt){{{
        attach: function (element, opt) {
            var obj = new $.Jcrop(element, opt);
            return obj;
        },
        // }}}
        // imgCopy: function(imgel){{{
        imgCopy: function (imgel) {
            var img = new Image;
            img.src = imgel.src;
            return img;
        },
        // }}}
        // imageClone: function(imgel){{{
        imageClone: function (imgel) {
            return $.Jcrop.supportsCanvas ?
              Jcrop.canvasClone(imgel) :
              Jcrop.imgCopy(imgel);
        },
        // }}}
        // canvasClone: function(imgel){{{
        canvasClone: function (imgel) {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            $(canvas).width(imgel.width).height(imgel.height),
            canvas.width = imgel.naturalWidth;
            canvas.height = imgel.naturalHeight;
            ctx.drawImage(imgel, 0, 0, imgel.naturalWidth, imgel.naturalHeight);
            return canvas;
        },
        // }}}
        // propagate: function(plist,config,obj){{{
        propagate: function (plist, config, obj) {
            for (var i = 0, l = plist.length; i < l; i++)
                if (config.hasOwnProperty(plist[i]))
                    obj[plist[i]] = config[plist[i]];
        },
        // }}}
        // getLargestBox: function(ratio,w,h){{{
        getLargestBox: function (ratio, w, h) {
            if ((w / h) > ratio)
                return [h * ratio, h];
            else return [w, w / ratio];
        },
        // }}}
        // stageConstructor: function(el,options,callback){{{
        stageConstructor: function (el, options, callback) {

            // Get a priority-ordered list of available stages
            var stages = [];
            $.each(Jcrop.stage, function (i, e) {
                stages.push(e);
            });
            stages.sort(function (a, b) { return a.priority - b.priority; });

            // Find the first one that supports this element
            for (var i = 0, l = stages.length; i < l; i++) {
                if (stages[i].isSupported(el, options)) {
                    stages[i].create(el, options, function (obj, opt) {
                        if (typeof callback == 'function') callback(obj, opt);
                    });
                    break;
                }
            }
        },
        // }}}
        // supportsColorFade: function(){{{
        supportsColorFade: function () {
            return $.fx.step.hasOwnProperty('backgroundColor');
        },
        // }}}
        // wrapFromXywh: function(xywh){{{
        wrapFromXywh: function (xywh) {
            var b = { x: xywh[0], y: xywh[1], w: xywh[2], h: xywh[3] };
            b.x2 = b.x + b.w;
            b.y2 = b.y + b.h;
            return b;
        }
        // }}}
    });

    var AbstractStage = function () {
    };

    $.extend(AbstractStage, {
        isSupported: function (el, o) {
            // @todo: should actually check if it's an HTML element
            return true;
        },
        // A higher priority means less desirable
        // AbstractStage is the last one we want to use
        priority: 100,
        create: function (el, options, callback) {
            var obj = new AbstractStage;
            obj.element = el;
            callback.call(this, obj, options);
        },
        prototype: {
            attach: function (core) {
                this.init(core);
                core.ui.stage = this;
            },
            triggerEvent: function (ev) {
                $(this.element).trigger(ev);
                return this;
            },
            getElement: function () {
                return this.element;
            }
        }
    });
    Jcrop.registerStageType('Block', AbstractStage);


    var ImageStage = function () {
    };

    ImageStage.prototype = new AbstractStage();

    $.extend(ImageStage, {
        isSupported: function (el, o) {
            if (el.tagName == 'IMG') return true;
        },
        priority: 90,
        create: function (el, options, callback) {
            $.Jcrop.component.ImageLoader.attach(el, function (w, h) {
                var obj = new ImageStage;
                obj.element = $(el).wrap('<div />').parent();

                obj.element.width(w).height(h);
                obj.imgsrc = el;

                if (typeof callback == 'function')
                    callback.call(this, obj, options);
            });
        }
    });
    Jcrop.registerStageType('Image', ImageStage);


    var CanvasStage = function () {
        this.angle = 0;
        this.scale = 1;
        this.scaleMin = 0.2;
        this.scaleMax = 1.25;
        this.offset = [0, 0];
    };

    CanvasStage.prototype = new ImageStage();

    $.extend(CanvasStage, {
        isSupported: function (el, o) {
            if ($.Jcrop.supportsCanvas && (el.tagName == 'IMG')) return true;
        },
        priority: 60,
        create: function (el, options, callback) {
            var $el = $(el);
            var opt = $.extend({}, options);
            $.Jcrop.component.ImageLoader.attach(el, function (w, h) {
                var obj = new CanvasStage;
                $el.hide();
                obj.createCanvas(el, w, h);
                $el.before(obj.element);
                obj.imgsrc = el;
                opt.imgsrc = el;

                if (typeof callback == 'function') {
                    callback(obj, opt);
                    obj.redraw();
                }
            });
        }
    });

    $.extend(CanvasStage.prototype, {
        init: function (core) {
            this.core = core;
        },
        // setOffset: function(x,y) {{{
        setOffset: function (x, y) {
            this.offset = [x, y];
            return this;
        },
        // }}}
        // setAngle: function(v) {{{
        setAngle: function (v) {
            this.angle = v;
            return this;
        },
        // }}}
        // setScale: function(v) {{{
        setScale: function (v) {
            this.scale = this.boundScale(v);
            return this;
        },
        // }}}
        boundScale: function (v) {
            if (v < this.scaleMin) v = this.scaleMin;
            else if (v > this.scaleMax) v = this.scaleMax;
            return v;
        },
        createCanvas: function (img, w, h) {
            this.width = w;
            this.height = h;
            this.canvas = document.createElement('canvas');
            this.canvas.width = w;
            this.canvas.height = h;
            this.$canvas = $(this.canvas).width('100%').height('100%');
            this.context = this.canvas.getContext('2d');
            this.fillstyle = "rgb(0,0,0)";
            this.element = this.$canvas.wrap('<div />').parent().width(w).height(h);
        },
        triggerEvent: function (ev) {
            this.$canvas.trigger(ev);
            return this;
        },
        // clear: function() {{{
        clear: function () {
            this.context.fillStyle = this.fillstyle;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            return this;
        },
        // }}}
        // redraw: function() {{{
        redraw: function () {
            // Save the current context
            this.context.save();
            this.clear();

            // Translate to the center point of our image
            this.context.translate(parseInt(this.width * 0.5), parseInt(this.height * 0.5));
            // Perform the rotation and scaling
            this.context.translate(this.offset[0] / this.core.opt.xscale, this.offset[1] / this.core.opt.yscale);
            this.context.rotate(this.angle * (Math.PI / 180));
            this.context.scale(this.scale, this.scale);
            // Translate back to the top left of our image
            this.context.translate(-parseInt(this.width * 0.5), -parseInt(this.height * 0.5));
            // Finally we draw the image
            this.context.drawImage(this.imgsrc, 0, 0, this.width, this.height);

            // And restore the updated context
            this.context.restore();
            this.$canvas.trigger('cropredraw');
            return this;
        },
        // }}}
        // setFillStyle: function(v) {{{
        setFillStyle: function (v) {
            this.fillstyle = v;
            return this;
        }
        // }}}
    });

    Jcrop.registerStageType('Canvas', CanvasStage);


    /**
     *  BackoffFilter
     *  move out-of-bounds selection into allowed position at same size
     */
    var BackoffFilter = function () {
        this.minw = 40;
        this.minh = 40;
        this.maxw = 0;
        this.maxh = 0;
        this.core = null;
    };
    $.extend(BackoffFilter.prototype, {
        tag: 'backoff',
        priority: 22,
        filter: function (b) {
            var r = this.bound;

            if (b.x < r.minx) { b.x = r.minx; b.x2 = b.w + b.x; }
            if (b.y < r.miny) { b.y = r.miny; b.y2 = b.h + b.y; }
            if (b.x2 > r.maxx) { b.x2 = r.maxx; b.x = b.x2 - b.w; }
            if (b.y2 > r.maxy) { b.y2 = r.maxy; b.y = b.y2 - b.h; }

            return b;
        },
        refresh: function (sel) {
            this.elw = sel.core.container.width();
            this.elh = sel.core.container.height();
            this.bound = {
                minx: 0 + sel.edge.w,
                miny: 0 + sel.edge.n,
                maxx: this.elw + sel.edge.e,
                maxy: this.elh + sel.edge.s
            };
        }
    });
    Jcrop.registerFilter('backoff', BackoffFilter);

    /**
     *  ConstrainFilter
     *  a filter to constrain crop selection to bounding element
     */
    var ConstrainFilter = function () {
        this.core = null;
    };
    $.extend(ConstrainFilter.prototype, {
        tag: 'constrain',
        priority: 5,
        filter: function (b, ord) {
            if (ord == 'move') {
                if (b.x < this.minx) { b.x = this.minx; b.x2 = b.w + b.x; }
                if (b.y < this.miny) { b.y = this.miny; b.y2 = b.h + b.y; }
                if (b.x2 > this.maxx) { b.x2 = this.maxx; b.x = b.x2 - b.w; }
                if (b.y2 > this.maxy) { b.y2 = this.maxy; b.y = b.y2 - b.h; }
            } else {
                if (b.x < this.minx) { b.x = this.minx; }
                if (b.y < this.miny) { b.y = this.miny; }
                if (b.x2 > this.maxx) { b.x2 = this.maxx; }
                if (b.y2 > this.maxy) { b.y2 = this.maxy; }
            }
            b.w = b.x2 - b.x;
            b.h = b.y2 - b.y;
            return b;
        },
        refresh: function (sel) {
            this.elw = sel.core.container.width();
            this.elh = sel.core.container.height();
            this.minx = 0 + sel.edge.w;
            this.miny = 0 + sel.edge.n;
            this.maxx = this.elw + sel.edge.e;
            this.maxy = this.elh + sel.edge.s;
        }
    });
    Jcrop.registerFilter('constrain', ConstrainFilter);

    /**
     *  ExtentFilter
     *  a filter to implement minimum or maximum size
     */
    var ExtentFilter = function () {
        this.core = null;
    };
    $.extend(ExtentFilter.prototype, {
        tag: 'extent',
        priority: 12,
        offsetFromCorner: function (corner, box, b) {
            var w = box[0], h = box[1];
            switch (corner) {
                case 'bl': return [b.x2 - w, b.y, w, h];
                case 'tl': return [b.x2 - w, b.y2 - h, w, h];
                case 'br': return [b.x, b.y, w, h];
                case 'tr': return [b.x, b.y2 - h, w, h];
            }
        },
        getQuadrant: function (s) {
            var relx = s.opposite[0] - s.offsetx
            var rely = s.opposite[1] - s.offsety;

            if ((relx < 0) && (rely < 0)) return 'br';
            else if ((relx >= 0) && (rely >= 0)) return 'tl';
            else if ((relx < 0) && (rely >= 0)) return 'tr';
            return 'bl';
        },
        filter: function (b, ord, sel) {

            if (ord == 'move') return b;

            var w = b.w, h = b.h, st = sel.state, r = this.limits;
            var quad = st ? this.getQuadrant(st) : 'br';

            if (r.minw && (w < r.minw)) w = r.minw;
            if (r.minh && (h < r.minh)) h = r.minh;
            if (r.maxw && (w > r.maxw)) w = r.maxw;
            if (r.maxh && (h > r.maxh)) h = r.maxh;

            if ((w == b.w) && (h == b.h)) return b;

            return Jcrop.wrapFromXywh(this.offsetFromCorner(quad, [w, h], b));
        },
        refresh: function (sel) {
            this.elw = sel.core.container.width();
            this.elh = sel.core.container.height();

            this.limits = {
                minw: sel.minSize[0],
                minh: sel.minSize[1],
                maxw: sel.maxSize[0],
                maxh: sel.maxSize[1]
            };
        }
    });
    Jcrop.registerFilter('extent', ExtentFilter);


    /**
     *  GridFilter
     *  a rudimentary grid effect
     */
    var GridFilter = function () {
        this.stepx = 1;
        this.stepy = 1;
        this.core = null;
    };
    $.extend(GridFilter.prototype, {
        tag: 'grid',
        priority: 19,
        filter: function (b) {

            var n = {
                x: Math.round(b.x / this.stepx) * this.stepx,
                y: Math.round(b.y / this.stepy) * this.stepy,
                x2: Math.round(b.x2 / this.stepx) * this.stepx,
                y2: Math.round(b.y2 / this.stepy) * this.stepy
            };

            n.w = n.x2 - n.x;
            n.h = n.y2 - n.y;

            return n;
        }
    });
    Jcrop.registerFilter('grid', GridFilter);


    /**
     *  RatioFilter
     *  implements aspectRatio locking
     */
    var RatioFilter = function () {
        this.ratio = 0;
        this.core = null;
    };
    $.extend(RatioFilter.prototype, {
        tag: 'ratio',
        priority: 15,
        offsetFromCorner: function (corner, box, b) {
            var w = box[0], h = box[1];
            switch (corner) {
                case 'bl': return [b.x2 - w, b.y, w, h];
                case 'tl': return [b.x2 - w, b.y2 - h, w, h];
                case 'br': return [b.x, b.y, w, h];
                case 'tr': return [b.x, b.y2 - h, w, h];
            }
        },
        getBoundRatio: function (b, quad) {
            var box = Jcrop.getLargestBox(this.ratio, b.w, b.h);
            return Jcrop.wrapFromXywh(this.offsetFromCorner(quad, box, b));
        },
        getQuadrant: function (s) {
            var relx = s.opposite[0] - s.offsetx
            var rely = s.opposite[1] - s.offsety;

            if ((relx < 0) && (rely < 0)) return 'br';
            else if ((relx >= 0) && (rely >= 0)) return 'tl';
            else if ((relx < 0) && (rely >= 0)) return 'tr';
            return 'bl';
        },
        filter: function (b, ord, sel) {

            if (!this.ratio) return b;

            var rt = b.w / b.h;
            var st = sel.state;

            var quad = st ? this.getQuadrant(st) : 'br';
            ord = ord || 'se';

            if (ord == 'move') return b;

            switch (ord) {
                case 'n':
                    b.x2 = this.elw;
                    b.w = b.x2 - b.x;
                    quad = 'tr';
                    break;
                case 's':
                    b.x2 = this.elw;
                    b.w = b.x2 - b.x;
                    quad = 'br';
                    break;
                case 'e':
                    b.y2 = this.elh;
                    b.h = b.y2 - b.y;
                    quad = 'br';
                    break;
                case 'w':
                    b.y2 = this.elh;
                    b.h = b.y2 - b.y;
                    quad = 'bl';
                    break;
            }

            return this.getBoundRatio(b, quad);
        },
        refresh: function (sel) {
            this.ratio = sel.aspectRatio;
            this.elw = sel.core.container.width();
            this.elh = sel.core.container.height();
        }
    });
    Jcrop.registerFilter('ratio', RatioFilter);


    /**
     *  RoundFilter
     *  rounds coordinate values to integers
     */
    var RoundFilter = function () {
        this.core = null;
    };
    $.extend(RoundFilter.prototype, {
        tag: 'round',
        priority: 90,
        filter: function (b) {

            var n = {
                x: Math.round(b.x),
                y: Math.round(b.y),
                x2: Math.round(b.x2),
                y2: Math.round(b.y2)
            };

            n.w = n.x2 - n.x;
            n.h = n.y2 - n.y;

            return n;
        }
    });
    Jcrop.registerFilter('round', RoundFilter);


    /**
     *  ShadeFilter
     *  A filter that implements div-based shading on any element
     *
     *  The shading you see is actually four semi-opaque divs
     *  positioned inside the container, around the selection
     */
    var ShadeFilter = function (opacity, color) {
        this.color = color || 'black';
        this.opacity = opacity || 0.5;
        this.core = null;
        this.shades = {};
    };
    $.extend(ShadeFilter.prototype, {
        tag: 'shader',
        fade: true,
        fadeEasing: 'swing',
        fadeSpeed: 320,
        priority: 95,
        init: function () {
            var t = this;

            if (!t.attached) {
                t.visible = false;

                t.container = $('<div />').addClass(t.core.opt.css_shades)
                  .prependTo(this.core.container).hide();

                t.elh = this.core.container.height();
                t.elw = this.core.container.width();

                t.shades = {
                    top: t.createShade(),
                    right: t.createShade(),
                    left: t.createShade(),
                    bottom: t.createShade()
                };

                t.attached = true;
            }
        },
        destroy: function () {
            this.container.remove();
        },
        setColor: function (color, instant) {
            var t = this;

            if (color == t.color) return t;

            this.color = color;
            var colorfade = Jcrop.supportsColorFade();
            $.each(t.shades, function (u, i) {
                if (!t.fade || instant || !colorfade) i.css('backgroundColor', color);
                else i.animate({ backgroundColor: color }, { queue: false, duration: t.fadeSpeed, easing: t.fadeEasing });
            });
            return t;
        },
        setOpacity: function (opacity, instant) {
            var t = this;

            if (opacity == t.opacity) return t;

            t.opacity = opacity;
            $.each(t.shades, function (u, i) {
                if (!t.fade || instant) i.css({ opacity: opacity });
                else i.animate({ opacity: opacity }, { queue: false, duration: t.fadeSpeed, easing: t.fadeEasing });
            });
            return t;
        },
        createShade: function () {
            return $('<div />').css({
                position: 'absolute',
                backgroundColor: this.color,
                opacity: this.opacity
            }).appendTo(this.container);
        },
        refresh: function (sel) {
            var m = this.core, s = this.shades;

            this.setColor(sel.bgColor ? sel.bgColor : this.core.opt.bgColor);
            this.setOpacity(sel.bgOpacity ? sel.bgOpacity : this.core.opt.bgOpacity);

            this.elh = m.container.height();
            this.elw = m.container.width();
            s.right.css('height', this.elh + 'px');
            s.left.css('height', this.elh + 'px');
        },
        filter: function (b, ord, sel) {

            if (!sel.active) return b;

            var t = this,
              s = t.shades;

            s.top.css({
                left: Math.round(b.x) + 'px',
                width: Math.round(b.w) + 'px',
                height: Math.round(b.y) + 'px'
            });
            s.bottom.css({
                top: Math.round(b.y2) + 'px',
                left: Math.round(b.x) + 'px',
                width: Math.round(b.w) + 'px',
                height: (t.elh - Math.round(b.y2)) + 'px'
            });
            s.right.css({
                left: Math.round(b.x2) + 'px',
                width: (t.elw - Math.round(b.x2)) + 'px'
            });
            s.left.css({
                width: Math.round(b.x) + 'px'
            });

            if (!t.visible) {
                t.container.show();
                t.visible = true;
            }

            return b;
        }
    });
    Jcrop.registerFilter('shader', ShadeFilter);


    /**
     *  CanvasAnimator
     *  manages smooth cropping animation
     *
     *  This object is called internally to manage animation.
     *  An in-memory div is animated and a progress callback
     *  is used to update the selection coordinates of the
     *  visible selection in realtime.
     */
    var CanvasAnimator = function (stage) {
        this.stage = stage;
        this.core = stage.core;
        this.cloneStagePosition();
    };

    CanvasAnimator.prototype = {

        cloneStagePosition: function () {
            var s = this.stage;
            this.angle = s.angle;
            this.scale = s.scale;
            this.offset = s.offset;
        },

        getElement: function () {
            var s = this.stage;

            return $('<div />')
              .css({
                  position: 'absolute',
                  top: s.offset[0] + 'px',
                  left: s.offset[1] + 'px',
                  width: s.angle + 'px',
                  height: s.scale + 'px'
              });
        },

        animate: function (cb) {
            var t = this;

            this.scale = this.stage.boundScale(this.scale);
            t.stage.triggerEvent('croprotstart');

            t.getElement().animate({
                top: t.offset[0] + 'px',
                left: t.offset[1] + 'px',
                width: t.angle + 'px',
                height: t.scale + 'px'
            }, {
                easing: t.core.opt.animEasing,
                duration: t.core.opt.animDuration,
                complete: function () {
                    t.stage.triggerEvent('croprotend');
                    (typeof cb == 'function') && cb.call(this);
                },
                progress: function (anim) {
                    var props = {}, i, tw = anim.tweens;

                    for (i = 0; i < tw.length; i++) {
                        props[tw[i].prop] = tw[i].now;
                    }

                    t.stage.setAngle(props.width)
                      .setScale(props.height)
                      .setOffset(props.top, props.left)
                      .redraw();
                }
            });
        }

    };
    Jcrop.stage.Canvas.prototype.getAnimator = function () {
        return new CanvasAnimator(this);
    };
    Jcrop.registerComponent('CanvasAnimator', CanvasAnimator);


    /**
     *  CropAnimator
     *  manages smooth cropping animation
     *
     *  This object is called internally to manage animation.
     *  An in-memory div is animated and a progress callback
     *  is used to update the selection coordinates of the
     *  visible selection in realtime.
     */
    // var CropAnimator = function(selection){{{
    var CropAnimator = function (selection) {
        this.selection = selection;
        this.core = selection.core;
    };
    // }}}

    CropAnimator.prototype = {

        getElement: function () {
            var b = this.selection.get();

            return $('<div />')
              .css({
                  position: 'absolute',
                  top: b.y + 'px',
                  left: b.x + 'px',
                  width: b.w + 'px',
                  height: b.h + 'px'
              });
        },

        animate: function (x, y, w, h, cb) {
            var t = this;

            t.selection.allowResize(false);

            t.getElement().animate({
                top: y + 'px',
                left: x + 'px',
                width: w + 'px',
                height: h + 'px'
            }, {
                easing: t.core.opt.animEasing,
                duration: t.core.opt.animDuration,
                complete: function () {
                    t.selection.allowResize(true);
                    cb && cb.call(this);
                },
                progress: function (anim) {
                    var props = {}, i, tw = anim.tweens;

                    for (i = 0; i < tw.length; i++) {
                        props[tw[i].prop] = tw[i].now;
                    }

                    var b = {
                        x: parseInt(props.left),
                        y: parseInt(props.top),
                        w: parseInt(props.width),
                        h: parseInt(props.height)
                    };

                    b.x2 = b.x + b.w;
                    b.y2 = b.y + b.h;

                    t.selection.updateRaw(b, 'se');
                }
            });
        }

    };
    Jcrop.registerComponent('Animator', CropAnimator);


    /**
     *  DragState
     *  an object that handles dragging events
     *
     *  This object is used by the built-in selection object to
     *  track a dragging operation on a selection
     */
    // var DragState = function(e,selection,ord){{{
    var DragState = function (e, selection, ord) {
        var t = this;

        t.x = e.pageX;
        t.y = e.pageY;

        t.selection = selection;
        t.eventTarget = selection.core.opt.dragEventTarget;
        t.orig = selection.get();

        selection.callFilterFunction('refresh');

        var p = selection.core.container.position();
        t.elx = p.left;
        t.ely = p.top;

        t.offsetx = 0;
        t.offsety = 0;
        t.ord = ord;
        t.opposite = t.getOppositeCornerOffset();

        t.initEvents(e);

    };
    // }}}

    DragState.prototype = {
        // getOppositeCornerOffset: function(){{{
        // Calculate relative offset of locked corner
        getOppositeCornerOffset: function () {

            var o = this.orig;
            var relx = this.x - this.elx - o.x;
            var rely = this.y - this.ely - o.y;

            switch (this.ord) {
                case 'nw':
                case 'w':
                    return [o.w - relx, o.h - rely];
                    return [o.x + o.w, o.y + o.h];

                case 'sw':
                    return [o.w - relx, -rely];
                    return [o.x + o.w, o.y];

                case 'se':
                case 's':
                case 'e':
                    return [-relx, -rely];
                    return [o.x, o.y];

                case 'ne':
                case 'n':
                    return [-relx, o.h - rely];
                    return [o.w, o.y + o.h];
            }

            return [null, null];
        },
        // }}}
        // initEvents: function(e){{{
        initEvents: function (e) {
            $(this.eventTarget)
              .on('mousemove.jcrop', this.createDragHandler())
              .on('mouseup.jcrop', this.createStopHandler());
        },
        // }}}
        // dragEvent: function(e){{{
        dragEvent: function (e) {
            this.offsetx = e.pageX - this.x;
            this.offsety = e.pageY - this.y;
            this.selection.updateRaw(this.getBox(), this.ord);
        },
        // }}}
        // endDragEvent: function(e){{{
        endDragEvent: function (e) {
            var sel = this.selection;
            sel.core.container.removeClass('jcrop-dragging');
            sel.element.trigger('cropend', [sel, sel.core.unscale(sel.get())]);
            sel.focus();
        },
        // }}}
        // createStopHandler: function(){{{
        createStopHandler: function () {
            var t = this;
            return function (e) {
                $(t.eventTarget).off('.jcrop');
                t.endDragEvent(e);
                return false;
            };
        },
        // }}}
        // createDragHandler: function(){{{
        createDragHandler: function () {
            var t = this;
            return function (e) {
                t.dragEvent(e);
                return false;
            };
        },
        // }}}
        //update: function(x,y){{{
        update: function (x, y) {
            var t = this;
            t.offsetx = x - t.x;
            t.offsety = y - t.y;
        },
        //}}}
        //resultWrap: function(d){{{
        resultWrap: function (d) {
            var b = {
                x: Math.min(d[0], d[2]),
                y: Math.min(d[1], d[3]),
                x2: Math.max(d[0], d[2]),
                y2: Math.max(d[1], d[3])
            };

            b.w = b.x2 - b.x;
            b.h = b.y2 - b.y;

            return b;
        },
        //}}}
        //getBox: function(){{{
        getBox: function () {
            var t = this;
            var o = t.orig;
            var _c = { x2: o.x + o.w, y2: o.y + o.h };
            switch (t.ord) {
                case 'n': return t.resultWrap([o.x, t.offsety + o.y, _c.x2, _c.y2]);
                case 's': return t.resultWrap([o.x, o.y, _c.x2, t.offsety + _c.y2]);
                case 'e': return t.resultWrap([o.x, o.y, t.offsetx + _c.x2, _c.y2]);
                case 'w': return t.resultWrap([o.x + t.offsetx, o.y, _c.x2, _c.y2]);
                case 'sw': return t.resultWrap([t.offsetx + o.x, o.y, _c.x2, t.offsety + _c.y2]);
                case 'se': return t.resultWrap([o.x, o.y, t.offsetx + _c.x2, t.offsety + _c.y2]);
                case 'ne': return t.resultWrap([o.x, t.offsety + o.y, t.offsetx + _c.x2, _c.y2]);
                case 'nw': return t.resultWrap([t.offsetx + o.x, t.offsety + o.y, _c.x2, _c.y2]);
                case 'move':
                    _c.nx = o.x + t.offsetx;
                    _c.ny = o.y + t.offsety;
                    return t.resultWrap([_c.nx, _c.ny, _c.nx + o.w, _c.ny + o.h]);
            }
        }
        //}}}
    };
    Jcrop.registerComponent('DragState', DragState);


    /**
     *  EventManager
     *  provides internal event support
     */
    var EventManager = function (core) {
        this.core = core;
    };
    EventManager.prototype = {
        on: function (n, cb) { $(this).on(n, cb); },
        off: function (n) { $(this).off(n); },
        trigger: function (n) { $(this).trigger(n); }
    };
    Jcrop.registerComponent('EventManager', EventManager);


    /**
     * Image Loader
     * Reliably pre-loads images
     */
    // var ImageLoader = function(src,element,cb){{{
    var ImageLoader = function (src, element, cb) {
        this.src = src;
        if (!element) element = new Image;
        this.element = element;
        this.callback = cb;
        this.load();
    };
    // }}}

    $.extend(ImageLoader, {
        // attach: function(el,cb){{{
        attach: function (el, cb) {
            return new ImageLoader(el.src, el, cb);
        },
        // }}}
        // prototype: {{{
        prototype: {
            getDimensions: function () {
                var el = this.element;

                if (el.naturalWidth)
                    return [el.naturalWidth, el.naturalHeight];

                if (el.width)
                    return [el.width, el.height];

                return null;
            },
            fireCallback: function () {
                this.element.onload = null;
                if (typeof this.callback == 'function')
                    this.callback.apply(this, this.getDimensions());
            },
            isLoaded: function () {
                return this.element.complete;
            },
            load: function () {
                var t = this;
                var el = t.element;

                el.src = t.src;

                if (t.isLoaded()) t.fireCallback();
                else t.element.onload = function (e) {
                    t.fireCallback();
                };
            }
        }
        // }}}
    });
    Jcrop.registerComponent('ImageLoader', ImageLoader);


    /**
     * JcropTouch
     * Detects and enables mobile touch support
     */
    // var JcropTouch = function(core){{{
    var JcropTouch = function (core) {
        this.core = core;
        this.init();
    };
    // }}}

    $.extend(JcropTouch, {
        // support: function(){{{
        support: function () {
            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
                return true;
        },
        // }}}
        prototype: {
            // init: function(){{{
            init: function () {
                var t = this,
                  p = $.Jcrop.component.DragState.prototype;

                // A bit of an ugly hack to make sure we modify prototype
                // only once, store a key on the prototype
                if (!p.touch) {
                    t.initEvents();
                    t.shimDragState();
                    t.shimStageDrag();
                    p.touch = true;
                }
            },
            // }}}
            // shimDragState: function(){{{
            shimDragState: function () {
                var t = this;
                $.Jcrop.component.DragState.prototype.initEvents = function (e) {

                    // Attach subsequent drag event handlers based on initial
                    // event type - avoids collecting "pseudo-mouse" events
                    // generated by some mobile browsers in some circumstances
                    if (e.type.substr(0, 5) == 'touch') {

                        $(this.eventTarget)
                          .on('touchmove.jcrop.jcrop-touch', t.dragWrap(this.createDragHandler()))
                          .on('touchend.jcrop.jcrop-touch', this.createStopHandler());

                    }

                        // For other events, use the mouse handlers that
                        // the default DragState.initEvents() method sets...
                    else {

                        $(this.eventTarget)
                          .on('mousemove.jcrop', this.createDragHandler())
                          .on('mouseup.jcrop', this.createStopHandler());

                    }

                };
            },
            // }}}
            // shimStageDrag: function(){{{
            shimStageDrag: function () {
                this.core.container
                  .addClass('jcrop-touch')
                  .on('touchstart.jcrop.jcrop-stage', this.dragWrap(this.core.ui.manager.startDragHandler()));
            },
            // }}}
            // dragWrap: function(cb){{{
            dragWrap: function (cb) {
                return function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.type.substr(0, 5) == 'touch') {
                        e.pageX = e.originalEvent.changedTouches[0].pageX;
                        e.pageY = e.originalEvent.changedTouches[0].pageY;
                        return cb(e);
                    }
                    return false;
                };
            },
            // }}}
            // initEvents: function(){{{
            initEvents: function () {
                var t = this, c = t.core;

                c.container.on(
                  'touchstart.jcrop.jcrop-touch',
                  '.' + c.opt.css_drag,
                  t.dragWrap(c.startDrag())
                );
            }
            // }}}
        }
    });
    Jcrop.registerComponent('Touch', JcropTouch);


    /**
     *  KeyWatcher
     *  provides keyboard support
     */
    // var KeyWatcher = function(core){{{
    var KeyWatcher = function (core) {
        this.core = core;
        this.init();
    };
    // }}}
    $.extend(KeyWatcher, {
        // defaults: {{{
        defaults: {
            eventName: 'keydown.jcrop',
            passthru: [9],
            debug: false
        },
        // }}}
        prototype: {
            // init: function(){{{
            init: function () {
                $.extend(this, KeyWatcher.defaults);
                this.enable();
            },
            // }}}
            // disable: function(){{{
            disable: function () {
                this.core.container.off(this.eventName);
            },
            // }}}
            // enable: function(){{{
            enable: function () {
                var t = this, m = t.core;
                m.container.on(t.eventName, function (e) {
                    var nudge = e.shiftKey ? 16 : 2;

                    if ($.inArray(e.keyCode, t.passthru) >= 0)
                        return true;

                    switch (e.keyCode) {
                        case 37: m.nudge(-nudge, 0); break;
                        case 38: m.nudge(0, -nudge); break;
                        case 39: m.nudge(nudge, 0); break;
                        case 40: m.nudge(0, nudge); break;

                        case 46:
                        case 8:
                            m.requestDelete();
                            return false;
                            break;

                        default:
                            if (t.debug) console.log('keycode: ' + e.keyCode);
                            break;
                    }

                    if (!e.metaKey && !e.ctrlKey)
                        e.preventDefault();
                });
            }
            // }}}
        }
    });
    Jcrop.registerComponent('Keyboard', KeyWatcher);


    /**
     * Selection
     * Built-in selection object
     */
    var Selection = function () { };

    $.extend(Selection, {
        // defaults: {{{
        defaults: {
            minSize: [8, 8],
            maxSize: [0, 0],
            aspectRatio: 0,
            edge: { n: 0, s: 0, e: 0, w: 0 },
            bgColor: null,
            bgOpacity: null,
            last: null,

            state: null,
            active: true,
            linked: true,
            canDelete: true,
            canDrag: true,
            canResize: true,
            canSelect: true
        },
        // }}}
        prototype: {
            // init: function(core){{{
            init: function (core) {
                this.core = core;
                this.startup();
                this.linked = this.core.opt.linked;
                this.attach();
                this.setOptions(this.core.opt);
                core.container.trigger('cropcreate', [this]);
            },
            // }}}
            // attach: function(){{{
            attach: function () {
                // For extending init() sequence
            },
            // }}}
            // startup: function(){{{
            startup: function () {
                var t = this, o = t.core.opt;
                $.extend(t, Selection.defaults);
                t.filter = t.core.getDefaultFilters();

                t.element = $('<div />').addClass(o.css_selection).data({ selection: t });
                t.frame = $('<button />').addClass(o.css_button).data('ord', 'move').attr('type', 'button');
                t.element.append(t.frame).appendTo(t.core.container);

                // IE background/draggable hack
                if (t.core.opt.is_msie) t.frame.css({
                    opacity: 0,
                    backgroundColor: 'white'
                });

                t.insertElements();

                // Bind focus and blur events for this selection
                t.frame.on('focus.jcrop', function (e) {
                    t.core.setSelection(t);
                    t.element.trigger('cropfocus', t);
                    t.element.addClass('jcrop-focus');
                }).on('blur.jcrop', function (e) {
                    t.element.removeClass('jcrop-focus');
                    t.element.trigger('cropblur', t);
                });
            },
            // }}}
            // propagate: [{{{
            propagate: [
              'canDelete', 'canDrag', 'canResize', 'canSelect',
              'minSize', 'maxSize', 'aspectRatio', 'edge'
            ],
            // }}}
            // setOptions: function(opt){{{
            setOptions: function (opt) {
                Jcrop.propagate(this.propagate, opt, this);
                this.refresh();
                return this;
            },
            // }}}
            // refresh: function(){{{
            refresh: function () {
                this.allowResize();
                this.allowDrag();
                this.allowSelect();
                this.callFilterFunction('refresh');
                this.updateRaw(this.get(), 'se');
            },
            // }}}
            // callFilterFunction: function(f,args){{{
            callFilterFunction: function (f, args) {
                for (var i = 0; i < this.filter.length; i++)
                    if (this.filter[i][f]) this.filter[i][f](this);
                return this;
            },
            // }}}
            //addFilter: function(filter){{{
            addFilter: function (filter) {
                filter.core = this.core;
                if (!this.hasFilter(filter)) {
                    this.filter.push(filter);
                    this.sortFilters();
                    if (filter.init) filter.init();
                    this.refresh();
                }
            },
            //}}}
            // hasFilter: function(filter){{{
            hasFilter: function (filter) {
                var i, f = this.filter, n = [];
                for (i = 0; i < f.length; i++) if (f[i] === filter) return true;
            },
            // }}}
            // sortFilters: function(){{{
            sortFilters: function () {
                this.filter.sort(
                  function (x, y) { return x.priority - y.priority; }
                );
            },
            // }}}
            //clearFilters: function(){{{
            clearFilters: function () {
                var i, f = this.filter;

                for (var i = 0; i < f.length; i++)
                    if (f[i].destroy) f[i].destroy();

                this.filter = [];
            },
            //}}}
            // removeFiltersByTagBlog: function(tag){{{
            removeFilter: function (tag) {
                var i, f = this.filter, n = [];

                for (var i = 0; i < f.length; i++)
                    if ((f[i].tag && (f[i].tag == tag)) || (tag === f[i])) {
                        if (f[i].destroy) f[i].destroy();
                    }
                    else n.push(f[i]);

                this.filter = n;
            },
            // }}}
            // runFilters: function(b,ord){{{
            runFilters: function (b, ord) {
                for (var i = 0; i < this.filter.length; i++)
                    b = this.filter[i].filter(b, ord, this);
                return b;
            },
            // }}}
            //endDrag: function(){{{
            endDrag: function () {
                if (this.state) {
                    $(document.body).off('.jcrop');
                    this.focus();
                    this.state = null;
                }
            },
            //}}}
            // startDrag: function(e,ord){{{
            startDrag: function (e, ord) {
                var t = this;
                var m = t.core;

                ord = ord || $(e.target).data('ord');

                this.focus();

                if ((ord == 'move') && t.element.hasClass(t.core.opt.css_nodrag))
                    return false;

                this.state = new Jcrop.component.DragState(e, this, ord);
                return false;
            },
            // }}}
            // allowSelect: function(v){{{
            allowSelect: function (v) {
                if (v === undefined) v = this.canSelect;

                if (v && this.canSelect) this.frame.attr('disabled', false);
                else this.frame.attr('disabled', 'disabled');

                return this;
            },
            // }}}
            // allowDrag: function(v){{{
            allowDrag: function (v) {
                var t = this, o = t.core.opt;
                if (v == undefined) v = t.canDrag;

                if (v && t.canDrag) t.element.removeClass(o.css_nodrag);
                else t.element.addClass(o.css_nodrag);

                return this;
            },
            // }}}
            // allowResize: function(v){{{
            allowResize: function (v) {
                var t = this, o = t.core.opt;
                if (v == undefined) v = t.canResize;

                if (v && t.canResize) t.element.removeClass(o.css_noresize);
                else t.element.addClass(o.css_noresize);

                return this;
            },
            // }}}
            // remove: function(){{{
            remove: function () {
                this.element.trigger('cropremove', this);
                this.element.remove();
            },
            // }}}
            // toBack: function(){{{
            toBack: function () {
                this.active = false;
                this.element.removeClass('jcrop-current jcrop-focus');
            },
            // }}}
            // toFront: function(){{{
            toFront: function () {
                this.active = true;
                this.element.addClass('jcrop-current');
                this.callFilterFunction('refresh');
                this.refresh();
            },
            // }}}
            // redraw: function(b){{{
            redraw: function (b) {
                this.moveTo(b.x, b.y);
                this.resize(b.w, b.h);
                this.last = b;
                return this;
            },
            // }}}
            // update: function(b,ord){{{
            update: function (b, ord) {
                return this.updateRaw(this.core.scale(b), ord);
            },
            // }}}
            // update: function(b,ord){{{
            updateRaw: function (b, ord) {
                b = this.runFilters(b, ord);
                this.redraw(b);
                this.element.trigger('cropmove', [this, this.core.unscale(b)]);
                return this;
            },
            // }}}
            // animateTo: function(box,cb){{{
            animateTo: function (box, cb) {
                var ca = new Jcrop.component.Animator(this),
                    b = this.core.scale(Jcrop.wrapFromXywh(box));

                ca.animate(b.x, b.y, b.w, b.h, cb);
            },
            // }}}
            // center: function(instant){{{
            center: function (instant) {
                var b = this.get(), m = this.core;
                var elw = m.container.width(), elh = m.container.height();
                var box = [(elw - b.w) / 2, (elh - b.h) / 2, b.w, b.h];
                return this[instant ? 'setSelect' : 'animateTo'](box);
            },
            // }}}
            //createElement: function(type,ord){{{
            createElement: function (type, ord) {
                return $('<div />').addClass(type + ' ord-' + ord).data('ord', ord);
            },
            //}}}
            //moveTo: function(x,y){{{
            moveTo: function (x, y) {
                this.element.css({ top: y + 'px', left: x + 'px' });
            },
            //}}}
            // blur: function(){{{
            blur: function () {
                this.element.blur();
                return this;
            },
            // }}}
            // focus: function(){{{
            focus: function () {
                this.core.setSelection(this);
                this.frame.focus();
                return this;
            },
            // }}}
            //resize: function(w,h){{{
            resize: function (w, h) {
                this.element.css({ width: w + 'px', height: h + 'px' });
            },
            //}}}
            //get: function(){{{
            get: function () {
                var b = this.element,
                  o = b.position(),
                  w = b.width(),
                  h = b.height(),
                  rv = { x: o.left, y: o.top };

                rv.x2 = rv.x + w;
                rv.y2 = rv.y + h;
                rv.w = w;
                rv.h = h;

                return rv;
            },
            //}}}
            //insertElements: function(){{{
            insertElements: function () {
                var t = this, i,
                  m = t.core,
                  fr = t.element,
                  o = t.core.opt,
                  b = o.borders,
                  h = o.handles,
                  d = o.dragbars;

                for (i = 0; i < d.length; i++)
                    fr.append(t.createElement(o.css_dragbars, d[i]));

                for (i = 0; i < h.length; i++)
                    fr.append(t.createElement(o.css_handles, h[i]));

                for (i = 0; i < b.length; i++)
                    fr.append(t.createElement(o.css_borders, b[i]));
            }
            //}}}
        }
    });
    Jcrop.registerComponent('Selection', Selection);


    /**
     * StageDrag
     * Facilitates dragging
     */
    // var StageDrag = function(manager,opt){{{
    var StageDrag = function (manager, opt) {
        $.extend(this, StageDrag.defaults, opt || {});
        this.manager = manager;
        this.core = manager.core;
    };
    // }}}
    // StageDrag.defaults = {{{
    StageDrag.defaults = {
        offset: [-8, -8],
        active: true,
        minsize: [20, 20]
    };
    // }}}

    $.extend(StageDrag.prototype, {
        // start: function(e){{{
        start: function (e) {
            var c = this.core;

            // Do nothing if allowSelect is off
            if (!c.opt.allowSelect) return;

            // Also do nothing if we can't draw any more selections
            if (c.opt.multi && c.opt.multiMax && (c.ui.multi.length >= c.opt.multiMax)) return false;

            // calculate a few variables for this drag operation
            var o = $(e.currentTarget).offset();
            var origx = e.pageX - o.left + this.offset[0];
            var origy = e.pageY - o.top + this.offset[1];
            var m = c.ui.multi;

            // Determine newly dragged crop behavior if multi disabled
            if (!c.opt.multi) {
                // For multiCleaanup true, remove all existing selections
                if (c.opt.multiCleanup) {
                    for (var i = 0; i < m.length; i++) m[i].remove();
                    c.ui.multi = [];
                }
                    // If not, only remove the currently active selection
                else {
                    c.removeSelection(c.ui.selection);
                }
            }

            c.container.addClass('jcrop-dragging');

            // Create the new selection
            var sel = c.newSelection()
              // and position it
              .updateRaw(Jcrop.wrapFromXywh([origx, origy, 1, 1]));

            sel.element.trigger('cropstart', [sel, this.core.unscale(sel.get())]);

            return sel.startDrag(e, 'se');
        },
        // }}}
        // end: function(x,y){{{
        end: function (x, y) {
            this.drag(x, y);
            var b = this.sel.get();

            this.core.container.removeClass('jcrop-dragging');

            if ((b.w < this.minsize[0]) || (b.h < this.minsize[1]))
                this.core.requestDelete();

            else this.sel.focus();
        }
        // }}}
    });
    Jcrop.registerComponent('StageDrag', StageDrag);


    /**
     * StageManager
     * Provides basic stage-specific functionality
     */
    // var StageManager = function(core){{{
    var StageManager = function (core) {
        this.core = core;
        this.ui = core.ui;
        this.init();
    };
    // }}}

    $.extend(StageManager.prototype, {
        // init: function(){{{
        init: function () {
            this.setupEvents();
            this.dragger = new StageDrag(this);
        },
        // }}}
        // tellConfigUpdate: function(options){{{
        tellConfigUpdate: function (options) {
            for (var i = 0, m = this.ui.multi, l = m.length; i < l; i++)
                if (m[i].setOptions && (m[i].linked || (this.core.opt.linkCurrent && m[i] == this.ui.selection)))
                    m[i].setOptions(options);
        },
        // }}}
        // startDragHandler: function(){{{
        startDragHandler: function () {
            var t = this;
            return function (e) {
                if (!e.button || t.core.opt.is_ie_lt9) return t.dragger.start(e);
            };
        },
        // }}}
        // removeEvents: function(){{{
        removeEvents: function () {
            this.core.event.off('.jcrop-stage');
            this.core.container.off('.jcrop-stage');
        },
        // }}}
        // shimLegacyHandlers: function(options){{{
        // This method uses the legacyHandlers configuration object to
        // gracefully wrap old-style Jcrop events with new ones
        shimLegacyHandlers: function (options) {
            var _x = {}, core = this.core, tmp;

            $.each(core.opt.legacyHandlers, function (k, i) {
                if (k in options) {
                    tmp = options[k];
                    core.container.off('.jcrop-' + k)
                      .on(i + '.jcrop.jcrop-' + k, function (e, s, c) {
                          tmp.call(core, c);
                      });
                    delete options[k];
                }
            });
        },
        // }}}
        // setupEvents: function(){{{
        setupEvents: function () {
            var t = this, c = t.core;

            c.event.on('configupdate.jcrop-stage', function (e) {
                t.shimLegacyHandlers(c.opt);
                t.tellConfigUpdate(c.opt)
                c.container.trigger('cropconfig', [c, c.opt]);
            });

            this.core.container
              .on('mousedown.jcrop.jcrop-stage', this.startDragHandler());
        }
        // }}}
    });
    Jcrop.registerComponent('StageManager', StageManager);


    var Thumbnailer = function () {
    };

    $.extend(Thumbnailer, {
        defaults: {
            // Set to a specific Selection object
            // If this value is set, the preview will only track that Selection
            selection: null,

            fading: true,
            fadeDelay: 1000,
            fadeDuration: 1000,
            autoHide: false,
            width: 80,
            height: 80,
            _hiding: null
        },

        prototype: {
            recopyCanvas: function () {
                var s = this.core.ui.stage, cxt = s.context;
                this.context.putImageData(cxt.getImageData(0, 0, s.canvas.width, s.canvas.height), 0, 0);
            },
            init: function (core, options) {
                var t = this;
                this.core = core;
                $.extend(this, Thumbnailer.defaults, options);
                t.initEvents();
                t.refresh();
                t.insertElements();
                if (t.selection) {
                    t.renderSelection(t.selection);
                    t.selectionTarget = t.selection.element[0];
                } else if (t.core.ui.selection) {
                    t.renderSelection(t.core.ui.selection);
                }

                if (t.core.ui.stage.canvas) {
                    t.context = t.preview[0].getContext('2d');
                    t.core.container.on('cropredraw', function (e) {
                        t.recopyCanvas();
                        t.refresh();
                    });
                }
            },
            updateImage: function (imgel) {
                this.preview.remove();
                this.preview = $($.Jcrop.imageClone(imgel));
                this.element.append(this.preview);
                this.refresh();
                return this;
            },
            insertElements: function () {
                this.preview = $($.Jcrop.imageClone(this.core.ui.stage.imgsrc));

                this.element = $('<div />').addClass('jcrop-thumb')
                  .width(this.width).height(this.height)
                  .append(this.preview)
                  .appendTo(this.core.container);
            },
            resize: function (w, h) {
                this.width = w;
                this.height = h;
                this.element.width(w).height(h);
                this.renderCoords(this.last);
            },
            refresh: function () {
                this.cw = (this.core.opt.xscale * this.core.container.width());
                this.ch = (this.core.opt.yscale * this.core.container.height());
                if (this.last) {
                    this.renderCoords(this.last);
                }
            },
            renderCoords: function (c) {
                var rx = this.width / c.w;
                var ry = this.height / c.h;

                this.preview.css({
                    width: Math.round(rx * this.cw) + 'px',
                    height: Math.round(ry * this.ch) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });

                this.last = c;
                return this;
            },
            renderSelection: function (s) {
                return this.renderCoords(s.core.unscale(s.get()));
            },
            selectionStart: function (s) {
                this.renderSelection(s);
            },
            show: function () {
                if (this._hiding) clearTimeout(this._hiding);

                if (!this.fading) this.element.stop().css({ opacity: 1 });
                else this.element.stop().animate({ opacity: 1 }, { duration: 80, queue: false });
            },
            hide: function () {
                var t = this;
                if (!t.fading) t.element.hide();
                else t._hiding = setTimeout(function () {
                    t._hiding = null;
                    t.element.stop().animate({ opacity: 0 }, { duration: t.fadeDuration, queue: false });
                }, t.fadeDelay);
            },
            initEvents: function () {
                var t = this;
                t.core.container.on('croprotstart croprotend cropimage cropstart cropmove cropend', function (e, s, c) {
                    if (t.selectionTarget && (t.selectionTarget !== e.target)) return false;

                    switch (e.type) {

                        case 'cropimage':
                            t.updateImage(c);
                            break;

                        case 'cropstart':
                            t.selectionStart(s);
                        case 'croprotstart':
                            t.show();
                            break;

                        case 'cropend':
                            t.renderCoords(c);
                        case 'croprotend':
                            if (t.autoHide) t.hide();
                            break;

                        case 'cropmove':
                            t.renderCoords(c);
                            break;
                    }
                });
            }
        }
    });
    Jcrop.registerComponent('Thumbnailer', Thumbnailer);


    /**
     * DialDrag component
     * This is a little hacky, it was adapted from some previous/old code
     * Plan to update this API in the future
     */
    var DialDrag = function () { };

    DialDrag.prototype = {

        init: function (core, actuator, callback) {
            var that = this;

            if (!actuator) actuator = core.container;
            this.$btn = $(actuator);
            this.$targ = $(actuator);
            this.core = core;

            this.$btn
              .addClass('dialdrag')
              .on('mousedown.dialdrag', this.mousedown())
              .data('dialdrag', this);

            if (!$.isFunction(callback)) callback = function () { };
            this.callback = callback;
            this.ondone = callback;
        },

        remove: function () {
            this.$btn
              .removeClass('dialdrag')
              .off('.dialdrag')
              .data('dialdrag', null);
            return this;
        },

        setTarget: function (obj) {
            this.$targ = $(obj);
            return this;
        },

        getOffset: function () {
            var targ = this.$targ, pos = targ.offset();
            return [
              pos.left + (targ.width() / 2),
              pos.top + (targ.height() / 2)
            ];
        },

        relMouse: function (e) {
            var x = e.pageX - this.offset[0],
                y = e.pageY - this.offset[1],
                ang = Math.atan2(y, x) * (180 / Math.PI),
                vec = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            return [x, y, ang, vec];
        },

        mousedown: function () {
            var that = this;

            function mouseUp(e) {
                $(window).off('.dialdrag');
                that.ondone.call(that, that.relMouse(e));
                that.core.container.trigger('croprotend');
            }

            function mouseMove(e) {
                that.callback.call(that, that.relMouse(e));
            }

            return function (e) {
                that.offset = that.getOffset();
                var rel = that.relMouse(e);
                that.angleOffset = -that.core.ui.stage.angle + rel[2];
                that.distOffset = rel[3];
                that.dragOffset = [rel[0], rel[1]];
                that.core.container.trigger('croprotstart');

                $(window)
                  .on('mousemove.dialdrag', mouseMove)
                  .on('mouseup.dialdrag', mouseUp);

                that.callback.call(that, that.relMouse(e));

                return false;
            };
        }

    };
    Jcrop.registerComponent('DialDrag', DialDrag);


    /////////////////////////////////
    // DEFAULT SETTINGS

    Jcrop.defaults = {

        // Selection Behavior
        edge: { n: 0, s: 0, e: 0, w: 0 },
        setSelect: null,
        linked: true,
        linkCurrent: true,
        canDelete: true,
        canSelect: true,
        canDrag: true,
        canResize: true,

        // Component constructors
        eventManagerComponent: Jcrop.component.EventManager,
        keyboardComponent: Jcrop.component.Keyboard,
        dragstateComponent: Jcrop.component.DragState,
        stagemanagerComponent: Jcrop.component.StageManager,
        animatorComponent: Jcrop.component.Animator,
        selectionComponent: Jcrop.component.Selection,

        // This is a function that is called, which returns a stage object
        stageConstructor: Jcrop.stageConstructor,

        // Stage Behavior
        allowSelect: true,
        multi: false,
        multiMax: false,
        multiCleanup: true,
        animation: true,
        animEasing: 'swing',
        animDuration: 400,
        fading: true,
        fadeDuration: 300,
        fadeEasing: 'swing',
        bgColor: 'black',
        bgOpacity: .5,

        // Startup options
        applyFilters: ['constrain', 'extent', 'backoff', 'ratio', 'shader', 'round'],
        borders: ['e', 'w', 's', 'n'],
        handles: ['n', 's', 'e', 'w', 'sw', 'ne', 'nw', 'se'],
        dragbars: ['n', 'e', 'w', 's'],

        dragEventTarget: window,

        xscale: 1,
        yscale: 1,

        boxWidth: null,
        boxHeight: null,

        // CSS Classes
        // @todo: These need to be moved to top-level object keys
        // for better customization. Currently if you try to extend one
        // via an options object to Jcrop, it will wipe out all
        // the others you don't specify. Be careful for now!
        css_nodrag: 'jcrop-nodrag',
        css_drag: 'jcrop-drag',
        css_container: 'jcrop-active',
        css_shades: 'jcrop-shades',
        css_selection: 'jcrop-selection',
        css_borders: 'jcrop-border',
        css_handles: 'jcrop-handle jcrop-drag',
        css_button: 'jcrop-box jcrop-drag',
        css_noresize: 'jcrop-noresize',
        css_dragbars: 'jcrop-dragbar jcrop-drag',

        legacyHandlers: {
            onChange: 'cropmove',
            onSelect: 'cropend'
        }

    };


    // Jcrop API methods
    $.extend(Jcrop.prototype, {
        //init: function(){{{
        init: function () {
            this.event = new this.opt.eventManagerComponent(this);
            this.ui.keyboard = new this.opt.keyboardComponent(this);
            this.ui.manager = new this.opt.stagemanagerComponent(this);
            this.applyFilters();

            if ($.Jcrop.supportsTouch)
                new $.Jcrop.component.Touch(this);

            this.initEvents();
        },
        //}}}
        // applySizeConstraints: function(){{{
        applySizeConstraints: function () {
            var o = this.opt,
                img = this.opt.imgsrc;

            if (img) {

                var iw = img.naturalWidth || img.width,
                    ih = img.naturalHeight || img.height,
                    bw = o.boxWidth || iw,
                    bh = o.boxHeight || ih;

                if (img && ((iw > bw) || (ih > bh))) {
                    var bx = Jcrop.getLargestBox(iw / ih, bw, bh);
                    $(img).width(bx[0]).height(bx[1]);
                    this.resizeContainer(bx[0], bx[1]);
                    this.opt.xscale = iw / bx[0];
                    this.opt.yscale = ih / bx[1];
                }

            }

            if (this.opt.trueSize) {
                var dw = this.opt.trueSize[0];
                var dh = this.opt.trueSize[1];
                var cs = this.getContainerSize();
                this.opt.xscale = dw / cs[0];
                this.opt.yscale = dh / cs[1];
            }
        },
        // }}}
        initComponent: function (name) {
            if (Jcrop.component[name]) {
                var args = Array.prototype.slice.call(arguments);
                var obj = new Jcrop.component[name];
                args.shift();
                args.unshift(this);
                obj.init.apply(obj, args);
                return obj;
            }
        },
        // setOptions: function(opt){{{
        setOptions: function (opt, proptype) {

            if (!$.isPlainObject(opt)) opt = {};

            $.extend(this.opt, opt);

            // Handle a setSelect value
            if (this.opt.setSelect) {

                // If there is no current selection
                // passing setSelect will create one
                if (!this.ui.multi.length)
                    this.newSelection();

                // Use these values to update the current selection
                this.setSelect(this.opt.setSelect);

                // Set to null so it doesn't get called again
                this.opt.setSelect = null;
            }

            this.event.trigger('configupdate');
            return this;
        },
        // }}}
        //destroy: function(){{{
        destroy: function () {
            if (this.opt.imgsrc) {
                this.container.before(this.opt.imgsrc);
                this.container.remove();
                $(this.opt.imgsrc).removeData('Jcrop').show();
            } else {
                // @todo: more elegant destroy() process for non-image containers
                this.container.remove();
            }
        },
        // }}}
        // applyFilters: function(){{{
        applyFilters: function () {
            var obj;
            for (var i = 0, f = this.opt.applyFilters, l = f.length; i < l; i++) {
                if ($.Jcrop.filter[f[i]])
                    obj = new $.Jcrop.filter[f[i]];
                obj.core = this;
                if (obj.init) obj.init();
                this.filter[f[i]] = obj;
            }
        },
        // }}}
        // getDefaultFilters: function(){{{
        getDefaultFilters: function () {
            var rv = [];

            for (var i = 0, f = this.opt.applyFilters, l = f.length; i < l; i++)
                if (this.filter.hasOwnProperty(f[i]))
                    rv.push(this.filter[f[i]]);

            rv.sort(function (x, y) { return x.priority - y.priority; });
            return rv;
        },
        // }}}
        // setSelection: function(sel){{{
        setSelection: function (sel) {
            var m = this.ui.multi;
            var n = [];
            for (var i = 0; i < m.length; i++) {
                if (m[i] !== sel) n.push(m[i]);
                m[i].toBack();
            }
            n.unshift(sel);
            this.ui.multi = n;
            this.ui.selection = sel;
            sel.toFront();
            return sel;
        },
        // }}}
        // getSelection: function(raw){{{
        getSelection: function (raw) {
            var b = this.ui.selection.get();
            return b;
        },
        // }}}
        // newSelection: function(){{{
        newSelection: function (sel) {
            if (!sel)
                sel = new this.opt.selectionComponent();

            sel.init(this);
            this.setSelection(sel);

            return sel;
        },
        // }}}
        // hasSelection: function(sel){{{
        hasSelection: function (sel) {
            for (var i = 0; i < this.ui.multi; i++)
                if (sel === this.ui.multi[i]) return true;
        },
        // }}}
        // removeSelection: function(sel){{{
        removeSelection: function (sel) {
            var i, n = [], m = this.ui.multi;
            for (var i = 0; i < m.length; i++) {
                if (sel !== m[i])
                    n.push(m[i]);
                else m[i].remove();
            }
            return this.ui.multi = n;
        },
        // }}}
        //addFilter: function(filter){{{
        addFilter: function (filter) {
            for (var i = 0, m = this.ui.multi, l = m.length; i < l; i++)
                m[i].addFilter(filter);

            return this;
        },
        //}}}
        // removeFiltersByTagBlog: function(tag){{{
        removeFilter: function (filter) {
            for (var i = 0, m = this.ui.multi, l = m.length; i < l; i++)
                m[i].removeFilter(filter);

            return this;
        },
        // }}}
        // blur: function(){{{
        blur: function () {
            this.ui.selection.blur();
            return this;
        },
        // }}}
        // focus: function(){{{
        focus: function () {
            this.ui.selection.focus();
            return this;
        },
        // }}}
        //initEvents: function(){{{
        initEvents: function () {
            var t = this;
            t.container.on('selectstart', function (e) { return false; })
              .on('mousedown', '.' + t.opt.css_drag, t.startDrag());
        },
        //}}}
        // maxSelect: function(){{{
        maxSelect: function () {
            this.setSelect([0, 0, this.elw, this.elh]);
        },
        // }}}
        // nudge: function(x,y){{{
        nudge: function (x, y) {
            var s = this.ui.selection, b = s.get();

            b.x += x;
            b.x2 += x;
            b.y += y;
            b.y2 += y;

            if (b.x < 0) { b.x2 = b.w; b.x = 0; }
            else if (b.x2 > this.elw) { b.x2 = this.elw; b.x = b.x2 - b.w; }

            if (b.y < 0) { b.y2 = b.h; b.y = 0; }
            else if (b.y2 > this.elh) { b.y2 = this.elh; b.y = b.y2 - b.h; }

            s.element.trigger('cropstart', [s, this.unscale(b)]);
            s.updateRaw(b, 'move');
            s.element.trigger('cropend', [s, this.unscale(b)]);
        },
        // }}}
        // refresh: function(){{{
        refresh: function () {
            for (var i = 0, s = this.ui.multi, l = s.length; i < l; i++)
                s[i].refresh();
        },
        // }}}
        // blurAll: function(){{{
        blurAll: function () {
            var m = this.ui.multi;
            for (var i = 0; i < m.length; i++) {
                if (m[i] !== sel) n.push(m[i]);
                m[i].toBack();
            }
        },
        // }}}
        // scale: function(b){{{
        scale: function (b) {
            var xs = this.opt.xscale,
                ys = this.opt.yscale;

            return {
                x: b.x / xs,
                y: b.y / ys,
                x2: b.x2 / xs,
                y2: b.y2 / ys,
                w: b.w / xs,
                h: b.h / ys
            };
        },
        // }}}
        // unscale: function(b){{{
        unscale: function (b) {
            var xs = this.opt.xscale,
                ys = this.opt.yscale;

            return {
                x: b.x * xs,
                y: b.y * ys,
                x2: b.x2 * xs,
                y2: b.y2 * ys,
                w: b.w * xs,
                h: b.h * ys
            };
        },
        // }}}
        // requestDelete: function(){{{
        requestDelete: function () {
            if ((this.ui.multi.length > 1) && (this.ui.selection.canDelete))
                return this.deleteSelection();
        },
        // }}}
        // deleteSelection: function(){{{
        deleteSelection: function () {
            if (this.ui.selection) {
                this.removeSelection(this.ui.selection);
                if (this.ui.multi.length) this.ui.multi[0].focus();
                this.ui.selection.refresh();
            }
        },
        // }}}
        // animateTo: function(box){{{
        animateTo: function (box) {
            if (this.ui.selection)
                this.ui.selection.animateTo(box);
            return this;
        },
        // }}}
        // setselect: function(box){{{
        setSelect: function (box) {
            if (this.ui.selection)
                this.ui.selection.update(Jcrop.wrapFromXywh(box));
            return this;
        },
        // }}}
        //startDrag: function(){{{
        startDrag: function () {
            var t = this;
            return function (e) {
                var $targ = $(e.target);
                var selection = $targ.closest('.' + t.opt.css_selection).data('selection');
                var ord = $targ.data('ord');
                t.container.trigger('cropstart', [selection, t.unscale(selection.get())]);
                selection.startDrag(e, ord);
                return false;
            };
        },
        //}}}
        // getContainerSize: function(){{{
        getContainerSize: function () {
            return [this.container.width(), this.container.height()];
        },
        // }}}
        // resizeContainer: function(w,h){{{
        resizeContainer: function (w, h) {
            this.container.width(w).height(h);
            this.refresh();
        },
        // }}}
        // setImage: function(src,cb){{{
        setImage: function (src, cb) {
            var t = this, targ = t.opt.imgsrc;

            if (!targ) return false;

            new $.Jcrop.component.ImageLoader(src, null, function (w, h) {
                t.resizeContainer(w, h);

                targ.src = src;
                $(targ).width(w).height(h);
                t.applySizeConstraints();
                t.refresh();
                t.container.trigger('cropimage', [t, targ]);

                if (typeof cb == 'function')
                    cb.call(t, w, h);
            });
        },
        // }}}
        // update: function(b){{{
        update: function (b) {
            if (this.ui.selection)
                this.ui.selection.update(b);
        }
        // }}}
    });

    // Jcrop jQuery plugin function
    $.fn.Jcrop = function (options, callback) {
        options = options || {};

        var first = this.eq(0).data('Jcrop');
        var args = Array.prototype.slice.call(arguments);

        // Return API if requested
        if (options == 'api') { return first; }

            // Allow calling API methods (with arguments)
        else if (first && (typeof options == 'string')) {

            // Call method if it exists
            if (first[options]) {
                args.shift();
                first[options].apply(first, args);
                return first;
            }

            // Unknown input/method does not exist
            return false;
        }

        // Otherwise, loop over selected elements
        this.each(function () {
            var t = this, $t = $(this);
            var exists = $t.data('Jcrop');
            var obj;

            // If Jcrop already exists on this element only setOptions()
            if (exists)
                exists.setOptions(options);

            else {

                if (!options.stageConstructor)
                    options.stageConstructor = $.Jcrop.stageConstructor;

                options.stageConstructor(this, options, function (stage, options) {
                    var selection = options.setSelect;
                    if (selection) delete (options.setSelect);

                    var obj = $.Jcrop.attach(stage.element, options);

                    if (typeof stage.attach == 'function')
                        stage.attach(obj);

                    $t.data('Jcrop', obj);

                    if (selection) {
                        obj.newSelection();
                        obj.setSelect(selection);
                    }

                    if (typeof callback == 'function')
                        callback.call(obj);
                });
            }

            return this;
        });
    };

    /* Modernizr 2.7.1 (Custom Build) | MIT & BSD
     * Build: http://modernizr.com/download/#-csstransforms-canvas-canvastext-draganddrop-inlinesvg-svg-svgclippaths-touch-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-url_data_uri
     */
    ;

    var Modernizr = (function (window, document, undefined) {

        var version = '2.7.1',

        Modernizr = {},


        docElement = document.documentElement,

        mod = 'modernizr',
        modElem = document.createElement(mod),
        mStyle = modElem.style,

        inputElem,


        toString = {}.toString,

        prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



        omPrefixes = 'Webkit Moz O ms',

        cssomPrefixes = omPrefixes.split(' '),

        domPrefixes = omPrefixes.toLowerCase().split(' '),

        ns = { 'svg': 'http://www.w3.org/2000/svg' },

        tests = {},
        inputs = {},
        attrs = {},

        classes = [],

        slice = classes.slice,

        featureName,


        injectElementWithStyles = function (rule, callback, nodes, testnames) {

            var style, ret, node, docOverflow,
                div = document.createElement('div'),
                      body = document.body,
                      fakeBody = body || document.createElement('body');

            if (parseInt(nodes, 10)) {
                while (nodes--) {
                    node = document.createElement('div');
                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                    div.appendChild(node);
                }
            }

            style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
            div.id = mod;
            (body ? div : fakeBody).innerHTML += style;
            fakeBody.appendChild(div);
            if (!body) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
                docOverflow = docElement.style.overflow;
                docElement.style.overflow = 'hidden';
                docElement.appendChild(fakeBody);
            }

            ret = callback(div, rule);
            if (!body) {
                fakeBody.parentNode.removeChild(fakeBody);
                docElement.style.overflow = docOverflow;
            } else {
                div.parentNode.removeChild(div);
            }

            return !!ret;

        },



        isEventSupported = (function () {

            var TAGNAMES = {
                'select': 'input', 'change': 'input',
                'submit': 'form', 'reset': 'form',
                'error': 'img', 'load': 'img', 'abort': 'img'
            };

            function isEventSupported(eventName, element) {

                element = element || document.createElement(TAGNAMES[eventName] || 'div');
                eventName = 'on' + eventName;

                var isSupported = eventName in element;

                if (!isSupported) {
                    if (!element.setAttribute) {
                        element = document.createElement('div');
                    }
                    if (element.setAttribute && element.removeAttribute) {
                        element.setAttribute(eventName, '');
                        isSupported = is(element[eventName], 'function');

                        if (!is(element[eventName], 'undefined')) {
                            element[eventName] = undefined;
                        }
                        element.removeAttribute(eventName);
                    }
                }

                element = null;
                return isSupported;
            }
            return isEventSupported;
        })(),


        _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

        if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
            hasOwnProp = function (object, property) {
                return _hasOwnProperty.call(object, property);
            };
        }
        else {
            hasOwnProp = function (object, property) {
                return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
            };
        }


        if (!Function.prototype.bind) {
            Function.prototype.bind = function bind(that) {

                var target = this;

                if (typeof target != "function") {
                    throw new TypeError();
                }

                var args = slice.call(arguments, 1),
                    bound = function () {

                        if (this instanceof bound) {

                            var F = function () { };
                            F.prototype = target.prototype;
                            var self = new F();

                            var result = target.apply(
                                self,
                                args.concat(slice.call(arguments))
                            );
                            if (Object(result) === result) {
                                return result;
                            }
                            return self;

                        } else {

                            return target.apply(
                                that,
                                args.concat(slice.call(arguments))
                            );

                        }

                    };

                return bound;
            };
        }

        function setCss(str) {
            mStyle.cssText = str;
        }

        function setCssAll(str1, str2) {
            return setCss(prefixes.join(str1 + ';') + (str2 || ''));
        }

        function is(obj, type) {
            return typeof obj === type;
        }

        function contains(str, substr) {
            return !!~('' + str).indexOf(substr);
        }

        function testProps(props, prefixed) {
            for (var i in props) {
                var prop = props[i];
                if (!contains(prop, "-") && mStyle[prop] !== undefined) {
                    return prefixed == 'pfx' ? prop : true;
                }
            }
            return false;
        }

        function testDOMProps(props, obj, elem) {
            for (var i in props) {
                var item = obj[props[i]];
                if (item !== undefined) {

                    if (elem === false) return props[i];

                    if (is(item, 'function')) {
                        return item.bind(elem || obj);
                    }

                    return item;
                }
            }
            return false;
        }

        function testPropsAll(prop, prefixed, elem) {

            var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if (is(prefixed, "string") || is(prefixed, "undefined")) {
                return testProps(props, prefixed);

            } else {
                props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
                return testDOMProps(props, prefixed, elem);
            }
        }



        tests['canvas'] = function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        };

        tests['canvastext'] = function () {
            return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
        };
        tests['touch'] = function () {
            var bool;

            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                bool = true;
            } else {
                injectElementWithStyles(['@media (', prefixes.join('touch-enabled),('), mod, ')', '{#modernizr{top:9px;position:absolute}}'].join(''), function (node) {
                    bool = node.offsetTop === 9;
                });
            }

            return bool;
        };

        tests['draganddrop'] = function () {
            var div = document.createElement('div');
            return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
        };


        tests['csstransforms'] = function () {
            return !!testPropsAll('transform');
        };


        tests['svg'] = function () {
            return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
        };

        tests['inlinesvg'] = function () {
            var div = document.createElement('div');
            div.innerHTML = '<svg/>';
            return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
        };



        tests['svgclippaths'] = function () {
            return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
        };

        for (var feature in tests) {
            if (hasOwnProp(tests, feature)) {
                featureName = feature.toLowerCase();
                Modernizr[featureName] = tests[feature]();

                classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
            }
        }



        Modernizr.addTest = function (feature, test) {
            if (typeof feature == 'object') {
                for (var key in feature) {
                    if (hasOwnProp(feature, key)) {
                        Modernizr.addTest(key, feature[key]);
                    }
                }
            } else {

                feature = feature.toLowerCase();

                if (Modernizr[feature] !== undefined) {
                    return Modernizr;
                }

                test = typeof test == 'function' ? test() : test;

                if (typeof enableClasses !== "undefined" && enableClasses) {
                    docElement.className += ' ' + (test ? '' : 'no-') + feature;
                }
                Modernizr[feature] = test;

            }

            return Modernizr;
        };


        setCss('');
        modElem = inputElem = null;


        Modernizr._version = version;

        Modernizr._prefixes = prefixes;
        Modernizr._domPrefixes = domPrefixes;
        Modernizr._cssomPrefixes = cssomPrefixes;


        Modernizr.hasEvent = isEventSupported;

        Modernizr.testProp = function (prop) {
            return testProps([prop]);
        };

        Modernizr.testAllProps = testPropsAll;


        Modernizr.testStyles = injectElementWithStyles;
        return Modernizr;

    })(window, window.document);
    // data uri test.
    // https://github.com/Modernizr/Modernizr/issues/14

    // This test is asynchronous. Watch out.


    // in IE7 in HTTPS this can cause a Mixed Content security popup. 
    //  github.com/Modernizr/Modernizr/issues/362
    // To avoid that you can create a new iframe and inject this.. perhaps..


    (function () {

        var datauri = new Image();


        datauri.onerror = function () {
            Modernizr.addTest('datauri', function () { return false; });
        };
        datauri.onload = function () {
            Modernizr.addTest('datauri', function () { return (datauri.width == 1 && datauri.height == 1); });
        };

        datauri.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    })();
    ;

    // Attach to jQuery object
    $.Jcrop = Jcrop;

    $.Jcrop.supportsCanvas = Modernizr.canvas;
    $.Jcrop.supportsCanvasText = Modernizr.canvastext;
    $.Jcrop.supportsDragAndDrop = Modernizr.draganddrop;
    $.Jcrop.supportsDataURI = Modernizr.datauri;
    $.Jcrop.supportsSVG = Modernizr.svg;
    $.Jcrop.supportsInlineSVG = Modernizr.inlinesvg;
    $.Jcrop.supportsSVGClipPaths = Modernizr.svgclippaths;
    $.Jcrop.supportsCSSTransforms = Modernizr.csstransforms;
    $.Jcrop.supportsTouch = Modernizr.touch;

})(jQuery);