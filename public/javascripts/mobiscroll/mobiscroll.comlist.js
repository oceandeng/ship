(function ($, undefined) {
    var ms = $.mobiscroll,
        defaults = {
            invalid: [],
            showInput: true,
            inputClass: ''
        };

    ms.presets.scroller.commonlist = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
            isLiquid = layout == 'liquid',
            origReadOnly = s.readonly,
            elm = $(this),
            input,
            prevent,
            id = this.id + '_dummy',
            lvl = 0,
            ilvl = 0,
            timer = {},
            currLevel,
            currWheelVector = [],
            wa = s.wheelArray || createWheelArray(elm),
            labels = generateLabels(lvl),
            // fwv = firstWheelVector(wa),
            fwv = [0, 0, 0],
            w = generateWheelsFromVector(fwv, lvl);

        /**
            * Disables the invalid items on the wheels
            * @param {Object} dw - the jQuery mobiscroll object
            * @param {Number} nrWheels - the number of the current wheels
            * @param {Array} whArray - The wheel array objects containing the wheel tree
            * @param {Array} whVector - the wheel vector containing the current keys
            */
        function setDisabled(dw, nrWheels, whArray, whVector) {
            var j,
                i = 0;

            while (i < nrWheels) {
                var currWh = $('.dwwl' + i, dw),
                    inv = getInvalidKeys(whVector, i, whArray);

                for (j = 0; j < inv.length; j++) {
                    $('.dw-li[data-val="' + inv[j] + '"]', currWh).removeClass('dw-v');
                }
                i++;
            }
        }

        /**
            * Returns the invalid keys of one wheel as an array
            * @param {Array} whVector - the wheel vector used to search for the wheel in the wheel array
            * @param {Number} index - index of the wheel in the wheel vector, that we are interested in
            * @param {Array} whArray - the wheel array we are searching in
            * @return {Array} - list of invalid keys
            */
        function getInvalidKeys(whVector, index, whArray) {
            var i = 0,
                n,
                whObjA = whArray,
                invalids = [];

            while (i < index) {
                var ii = whVector[i];
                //whObjA = whObjA[ii].children;
                for (n in whObjA) {
                    if (whObjA[n].key == ii) {
                        whObjA = whObjA[n].children;
                        break;
                    }
                }
                i++;
            }
            i = 0;
            while (i < whObjA.length) {
                if (whObjA[i].invalid) {
                    invalids.push(whObjA[i].key);
                }
                i++;
            }
            return invalids;
        }

        /**
            * Creates a Boolean vector with true values (except one) that can be used as the readonly vector
            * n - the length of the vector
            * i - the index of the value that's going to be false
            */
        function createROVector(n, i) {
            var a = [];
            while (n) {
                a[--n] = true;
            }
            a[i] = false;
            return a;
        }

        /**
            * Creates a labels vector, from values if they are defined, otherwise from numbers
            * l - the length of the vector
            */
        function generateLabels(l) {
            var a = [],
                i;
            for (i = 0; i < l; i++) {
                a[i] = s.labels && s.labels[i] ? s.labels[i] : i;
            }
            return a;
        }

        /**
            * Creates the wheel array from the vector provided
            * wv - wheel vector containing the values that should be selected on the wheels
            * l - the length of the wheel array
            */
        function generateWheelsFromVector(wv, l, index) {
            var i = 0, j, obj, chInd,
                w = [[]],
                wtObjA = wa;

            while (i < wtObjA.length){
                w[0][i] = getWheelFromObjA(wtObjA, i);
                i++;
            }


            return w;
        }

        /**
            * Returns the first valid Wheel Node Object or its index from a Wheel Node Object Array
            * getInd - if it is true then the return value is going to be the index, otherwise the object itself
            */
        function getFirstValidItemObjOrInd(wtObjA, getInd) {
            if (!wtObjA) {
                return false;
            }

            var i = 0,
                obj;

            while (i < wtObjA.length) {
                if (!(obj = wtObjA[i++]).invalid) {
                    return getInd ? i - 1 : obj;
                }
            }
            return false;
        }

        function getWheelFromObjA(objA, lbl) {
            var wheel = {
                    keys: [],
                    values: [],
                    label: lbl
                },
                j = 0;

            while (j < objA[lbl].length) {
                wheel.values.push(objA[lbl][j].value);
                wheel.keys.push(objA[lbl][j].key);
                j++;
            }

            return wheel;
        }

        /**
            * Hides the last i number of wheels
            * i - the last number of wheels that has to be hidden
            */
        function hideWheels(dw, i) {
            $('.dwfl', dw).css('display', '').slice(i).hide();
        }

        /**
            * Generates the first wheel vector from the wheeltree
            * wt - the wheel tree object
            * uses the lvl global variable to determine the length of the vector
            */
        function firstWheelVector(wa) {
            var t = [],
                ndObjA = wa,
                obj,
                ok = true,
                i = 0;

            while (ok) {
                obj = getFirstValidItemObjOrInd(ndObjA);
                t[i++] = obj.key;
                ok = obj.children;
                if (ok) {
                    ndObjA = ok;
                }
            }

            return t;
        }

        function createWheelArray(ul) {
            var wheelArray = [];
            var wheelSubArray = [];

            lvl = lvl > ilvl++ ? lvl : ilvl;

            var ulList = ul.children('li').children('ul');

            ulList.each(function (index) {
                var that = $(this),
                    c = that.clone();

                c.children('ul,ol').remove();

                that.children('li').each(function(k){
                    var _this = $(this);
                    var parentIndex = _this.parent().index()

                    var v = inst._processMarkup ? inst._processMarkup(c) : $(this).html().replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
                        inv = that.attr('data-invalid') ? true : false,
                        // wheelObj = {},
                        wheelObj = {
                            key: that.attr('data-val') === undefined || that.attr('data-val') === null ? k : that.attr('data-val'),
                            value: v,
                            invalid: inv,
                            index: index
                        };
                        wheelSubArray.push(wheelObj);
                });
            });

            ilvl--;

            // 遍历数组生成二维数组
            // var arr = [];

            for(var i in wheelSubArray){
                var iNum = Number(i);

                if(iNum == 0){
                    wheelArray[wheelSubArray[iNum].index] = [];
                    wheelArray[wheelSubArray[iNum].index].push(wheelSubArray[iNum]);
                }else if(iNum > 0 && iNum < wheelSubArray.length - 1){
                    if(wheelSubArray[iNum].index == wheelSubArray[iNum + 1].index){
                        wheelArray[wheelSubArray[iNum].index].push(wheelSubArray[iNum]);
                    }else if(wheelSubArray[iNum].index != wheelSubArray[iNum + 1].index){
                        wheelArray[wheelSubArray[iNum].index].push(wheelSubArray[iNum]);
                        wheelArray[wheelSubArray[iNum + 1].index] = [];
                    }
                }else if(iNum == wheelSubArray.length - 1){
                        wheelArray[wheelSubArray[iNum].index].push(wheelSubArray[iNum]);
                }
            }

            // wheelArray.push(arr);

            return wheelArray;
        }

        $('#' + id).remove(); // Remove input if exists

        if (s.showInput) {
            input = $('<input type="text" id="' + id + '" value="" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />').insertBefore(elm);
            s.anchor = input; // give the core the input element for the bubble positioning
            inst.attachShow(input);
        }

        if (!s.wheelArray) {
            elm.hide().closest('.ui-field-contain').trigger('create');
        }

        return {
            width: 50,
            wheels: w,
            layout: layout,
            headerText: false,
            // formatValue: function (d) {
            //     if (currLevel === undefined) {
            //         currLevel = calcLevelOfVector2(d, d.length).lvl;
            //     }
            //     return d.slice(0, currLevel).join(' ');
            // },
            parseValue: function (value) {
                return value ? (value + '').split(' ') : (s.defaultValue || fwv).slice(0);
            },
            onBeforeShow: function () {
                var t = inst.getArrayVal(true);
                currWheelVector = t.slice(0);
                s.wheels = generateWheelsFromVector(t, lvl, lvl);
                prevent = true;
            },
            onValueFill: function (v) {
                currLevel = undefined;
                if (input) {
                    input.val(v);
                }
            },
            onShow: function (dw) {
                $('.dwwl', dw).on('mousedown touchstart', function () {
                    clearTimeout(timer[$('.dwwl', dw).index(this)]);
                });
            },
            onDestroy: function () {
                if (input) {
                    input.remove();
                }
                elm.show();
            },
            validate: function (dw, index, time) {

            }
        };
    };
})(jQuery);