/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * @website: http://www.datejs.com/
 */
(Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy",
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|aft(er)?|from|hence)/i,
        subtract: /^(\-|bef(ore)?|ago)/i,
        yesterday: /^yes(terday)?/i,
        today: /^t(od(ay)?)?/i,
        tomorrow: /^tom(orrow)?/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^mn|min(ute)?s?/i,
        hour: /^h(our)?s?/i,
        week: /^w(eek)?s?/i,
        month: /^m(onth)?s?/i,
        day: /^d(ay)?s?/i,
        year: /^y(ear)?s?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a(?!u|p)|p)/i,
    },
    timezones: [
        { name: "UTC", offset: "-000" },
        { name: "GMT", offset: "-000" },
        { name: "EST", offset: "-0500" },
        { name: "EDT", offset: "-0400" },
        { name: "CST", offset: "-0600" },
        { name: "CDT", offset: "-0500" },
        { name: "MST", offset: "-0700" },
        { name: "MDT", offset: "-0600" },
        { name: "PST", offset: "-0800" },
        { name: "PDT", offset: "-0700" },
    ],
}),
    (function () {
        var t,
            e,
            n,
            r = Date,
            i = r.prototype,
            s = r.CultureInfo,
            a = function (t, e) {
                return e || (e = 2), ("000" + t).slice(-1 * e);
            };
        (i.clearTime = function () {
            return this.setHours(0), this.setMinutes(0), this.setSeconds(0), this.setMilliseconds(0), this;
        }),
            (i.setTimeToNow = function () {
                var t = new Date();
                return this.setHours(t.getHours()), this.setMinutes(t.getMinutes()), this.setSeconds(t.getSeconds()), this.setMilliseconds(t.getMilliseconds()), this;
            }),
            (r.today = function () {
                return new Date().clearTime();
            }),
            (r.compare = function (t, e) {
                if (isNaN(t) || isNaN(e)) throw new Error(t + " - " + e);
                if (t instanceof Date && e instanceof Date) return t < e ? -1 : t > e ? 1 : 0;
                throw new TypeError(t + " - " + e);
            }),
            (r.equals = function (t, e) {
                return 0 === t.compareTo(e);
            }),
            (r.getDayNumberFromName = function (t) {
                for (var e = s.dayNames, n = s.abbreviatedDayNames, r = s.shortestDayNames, i = t.toLowerCase(), a = 0; a < e.length; a++) if (e[a].toLowerCase() == i || n[a].toLowerCase() == i || r[a].toLowerCase() == i) return a;
                return -1;
            }),
            (r.getMonthNumberFromName = function (t) {
                for (var e = s.monthNames, n = s.abbreviatedMonthNames, r = t.toLowerCase(), i = 0; i < e.length; i++) if (e[i].toLowerCase() == r || n[i].toLowerCase() == r) return i;
                return -1;
            }),
            (r.isLeapYear = function (t) {
                return (t % 4 == 0 && t % 100 != 0) || t % 400 == 0;
            }),
            (r.getDaysInMonth = function (t, e) {
                return [31, r.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e];
            }),
            (r.getTimezoneAbbreviation = function (t) {
                for (var e = s.timezones, n = 0; n < e.length; n++) if (e[n].offset === t) return e[n].name;
                return null;
            }),
            (r.getTimezoneOffset = function (t) {
                for (var e = s.timezones, n = 0; n < e.length; n++) if (e[n].name === t.toUpperCase()) return e[n].offset;
                return null;
            }),
            (i.clone = function () {
                return new Date(this.getTime());
            }),
            (i.compareTo = function (t) {
                return Date.compare(this, t);
            }),
            (i.equals = function (t) {
                return Date.equals(this, t || new Date());
            }),
            (i.between = function (t, e) {
                return this.getTime() >= t.getTime() && this.getTime() <= e.getTime();
            }),
            (i.isAfter = function (t) {
                return 1 === this.compareTo(t || new Date());
            }),
            (i.isBefore = function (t) {
                return -1 === this.compareTo(t || new Date());
            }),
            (i.isToday = function () {
                return this.isSameDay(new Date());
            }),
            (i.isSameDay = function (t) {
                return this.clone().clearTime().equals(t.clone().clearTime());
            }),
            (i.addMilliseconds = function (t) {
                return this.setMilliseconds(this.getMilliseconds() + t), this;
            }),
            (i.addSeconds = function (t) {
                return this.addMilliseconds(1e3 * t);
            }),
            (i.addMinutes = function (t) {
                return this.addMilliseconds(6e4 * t);
            }),
            (i.addHours = function (t) {
                return this.addMilliseconds(36e5 * t);
            }),
            (i.addDays = function (t) {
                return this.setDate(this.getDate() + t), this;
            }),
            (i.addWeeks = function (t) {
                return this.addDays(7 * t);
            }),
            (i.addMonths = function (t) {
                var e = this.getDate();
                return this.setDate(1), this.setMonth(this.getMonth() + t), this.setDate(Math.min(e, r.getDaysInMonth(this.getFullYear(), this.getMonth()))), this;
            }),
            (i.addYears = function (t) {
                return this.addMonths(12 * t);
            }),
            (i.add = function (t) {
                if ("number" == typeof t) return (this._orient = t), this;
                var e = t;
                return (
                    e.milliseconds && this.addMilliseconds(e.milliseconds),
                    e.seconds && this.addSeconds(e.seconds),
                    e.minutes && this.addMinutes(e.minutes),
                    e.hours && this.addHours(e.hours),
                    e.weeks && this.addWeeks(e.weeks),
                    e.months && this.addMonths(e.months),
                    e.years && this.addYears(e.years),
                    e.days && this.addDays(e.days),
                    this
                );
            }),
            (i.getWeek = function () {
                var r, i, s, a, o, u, h;
                return (
                    (t = t || this.getFullYear()),
                    (e = e || this.getMonth() + 1),
                    (n = n || this.getDate()),
                    e <= 2
                        ? ((h = (i = (((r = t - 1) / 4) | 0) - ((r / 100) | 0) + ((r / 400) | 0)) - ((((r - 1) / 4) | 0) - (((r - 1) / 100) | 0) + (((r - 1) / 400) | 0))), (s = 0), (a = n - 1 + 31 * (e - 1)))
                        : ((s = (h = (i = (((r = t) / 4) | 0) - ((r / 100) | 0) + ((r / 400) | 0)) - ((((r - 1) / 4) | 0) - (((r - 1) / 100) | 0) + (((r - 1) / 400) | 0))) + 1), (a = n + (153 * (e - 3) + 2) / 5 + 58 + h)),
                    (t = e = n = null),
                    (u = (a + 3 - ((a + (o = (r + i) % 7) - s) % 7)) | 0) < 0 ? 53 - (((o - h) / 5) | 0) : u > 364 + h ? 1 : 1 + ((u / 7) | 0)
                );
            }),
            (i.getISOWeek = function () {
                return (t = this.getUTCFullYear()), (e = this.getUTCMonth() + 1), (n = this.getUTCDate()), a(this.getWeek());
            }),
            (i.setWeek = function (t) {
                return this.moveToDayOfWeek(1).addWeeks(t - this.getWeek());
            }),
            (r._validate = function (t, e, n, r) {
                if (void 0 === t) return !1;
                if ("number" != typeof t) throw new TypeError(t + " is not a Number.");
                if (t < e || t > n) throw new RangeError(t + " is not a valid value for " + r + ".");
                return !0;
            }),
            (r.validateMillisecond = function (t) {
                return r._validate(t, 0, 999, "millisecond");
            }),
            (r.validateSecond = function (t) {
                return r._validate(t, 0, 59, "second");
            }),
            (r.validateMinute = function (t) {
                return r._validate(t, 0, 59, "minute");
            }),
            (r.validateHour = function (t) {
                return r._validate(t, 0, 23, "hour");
            }),
            (r.validateDay = function (t, e, n) {
                return r._validate(t, 1, r.getDaysInMonth(e, n), "day");
            }),
            (r.validateMonth = function (t) {
                return r._validate(t, 0, 11, "month");
            }),
            (r.validateYear = function (t) {
                return r._validate(t, 0, 9999, "year");
            }),
            (i.set = function (t) {
                return (
                    r.validateMillisecond(t.millisecond) && this.addMilliseconds(t.millisecond - this.getMilliseconds()),
                    r.validateSecond(t.second) && this.addSeconds(t.second - this.getSeconds()),
                    r.validateMinute(t.minute) && this.addMinutes(t.minute - this.getMinutes()),
                    r.validateHour(t.hour) && this.addHours(t.hour - this.getHours()),
                    r.validateMonth(t.month) && this.addMonths(t.month - this.getMonth()),
                    r.validateYear(t.year) && this.addYears(t.year - this.getFullYear()),
                    r.validateDay(t.day, this.getFullYear(), this.getMonth()) && this.addDays(t.day - this.getDate()),
                    t.timezone && this.setTimezone(t.timezone),
                    t.timezoneOffset && this.setTimezoneOffset(t.timezoneOffset),
                    t.week && r._validate(t.week, 0, 53, "week") && this.setWeek(t.week),
                    this
                );
            }),
            (i.moveToFirstDayOfMonth = function () {
                return this.set({ day: 1 });
            }),
            (i.moveToLastDayOfMonth = function () {
                return this.set({ day: r.getDaysInMonth(this.getFullYear(), this.getMonth()) });
            }),
            (i.moveToNthOccurrence = function (t, e) {
                var n = 0;
                if (e > 0) n = e - 1;
                else if (-1 === e) return this.moveToLastDayOfMonth(), this.getDay() !== t && this.moveToDayOfWeek(t, -1), this;
                return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(t, 1).addWeeks(n);
            }),
            (i.moveToDayOfWeek = function (t, e) {
                var n = (t - this.getDay() + 7 * (e || 1)) % 7;
                return this.addDays(0 === n ? (n += 7 * (e || 1)) : n);
            }),
            (i.moveToMonth = function (t, e) {
                var n = (t - this.getMonth() + 12 * (e || 1)) % 12;
                return this.addMonths(0 === n ? (n += 12 * (e || 1)) : n);
            }),
            (i.getOrdinalNumber = function () {
                return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 864e5) + 1;
            }),
            (i.getTimezone = function () {
                return r.getTimezoneAbbreviation(this.getUTCOffset());
            }),
            (i.setTimezoneOffset = function (t) {
                var e = this.getTimezoneOffset(),
                    n = (-6 * Number(t)) / 10;
                return this.addMinutes(n - e);
            }),
            (i.setTimezone = function (t) {
                return this.setTimezoneOffset(r.getTimezoneOffset(t));
            }),
            (i.hasDaylightSavingTime = function () {
                return Date.today().set({ month: 0, day: 1 }).getTimezoneOffset() !== Date.today().set({ month: 6, day: 1 }).getTimezoneOffset();
            }),
            (i.isDaylightSavingTime = function () {
                return this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({ month: 6, day: 1 }).getTimezoneOffset();
            }),
            (i.getUTCOffset = function () {
                var t,
                    e = (-10 * this.getTimezoneOffset()) / 6;
                return e < 0 ? (t = (e - 1e4).toString()).charAt(0) + t.substr(2) : "+" + (t = (e + 1e4).toString()).substr(1);
            }),
            (i.getElapsed = function (t) {
                return (t || new Date()) - this;
            }),
            i.toISOString ||
                (i.toISOString = function () {
                    function t(t) {
                        return t < 10 ? "0" + t : t;
                    }
                    return '"' + this.getUTCFullYear() + "-" + t(this.getUTCMonth() + 1) + "-" + t(this.getUTCDate()) + "T" + t(this.getUTCHours()) + ":" + t(this.getUTCMinutes()) + ":" + t(this.getUTCSeconds()) + 'Z"';
                }),
            (i._toString = i.toString),
            (i.toString = function (t) {
                var e = this;
                if (t && 1 == t.length) {
                    var n = s.formatPatterns;
                    switch (((e.t = e.toString), t)) {
                        case "d":
                            return e.t(n.shortDate);
                        case "D":
                            return e.t(n.longDate);
                        case "F":
                            return e.t(n.fullDateTime);
                        case "m":
                            return e.t(n.monthDay);
                        case "r":
                            return e.t(n.rfc1123);
                        case "s":
                            return e.t(n.sortableDateTime);
                        case "t":
                            return e.t(n.shortTime);
                        case "T":
                            return e.t(n.longTime);
                        case "u":
                            return e.t(n.universalSortableDateTime);
                        case "y":
                            return e.t(n.yearMonth);
                    }
                }
                return t
                    ? t.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function (t) {
                          if ("\\" === t.charAt(0)) return t.replace("\\", "");
                          switch (((e.h = e.getHours), t)) {
                              case "hh":
                                  return a(e.h() < 13 ? (0 === e.h() ? 12 : e.h()) : e.h() - 12);
                              case "h":
                                  return e.h() < 13 ? (0 === e.h() ? 12 : e.h()) : e.h() - 12;
                              case "HH":
                                  return a(e.h());
                              case "H":
                                  return e.h();
                              case "mm":
                                  return a(e.getMinutes());
                              case "m":
                                  return e.getMinutes();
                              case "ss":
                                  return a(e.getSeconds());
                              case "s":
                                  return e.getSeconds();
                              case "yyyy":
                                  return a(e.getFullYear(), 4);
                              case "yy":
                                  return a(e.getFullYear());
                              case "dddd":
                                  return s.dayNames[e.getDay()];
                              case "ddd":
                                  return s.abbreviatedDayNames[e.getDay()];
                              case "dd":
                                  return a(e.getDate());
                              case "d":
                                  return e.getDate();
                              case "MMMM":
                                  return s.monthNames[e.getMonth()];
                              case "MMM":
                                  return s.abbreviatedMonthNames[e.getMonth()];
                              case "MM":
                                  return a(e.getMonth() + 1);
                              case "M":
                                  return e.getMonth() + 1;
                              case "t":
                                  return e.h() < 12 ? s.amDesignator.substring(0, 1) : s.pmDesignator.substring(0, 1);
                              case "tt":
                                  return e.h() < 12 ? s.amDesignator : s.pmDesignator;
                              case "S":
                                  return (function (t) {
                                      switch (1 * t) {
                                          case 1:
                                          case 21:
                                          case 31:
                                              return "st";
                                          case 2:
                                          case 22:
                                              return "nd";
                                          case 3:
                                          case 23:
                                              return "rd";
                                          default:
                                              return "th";
                                      }
                                  })(e.getDate());
                              default:
                                  return t;
                          }
                      })
                    : this._toString();
            });
    })(),
    (function () {
        var t = Date,
            e = t.prototype,
            n = t.CultureInfo,
            r = Number.prototype;
        (e._orient = 1),
            (e._nth = null),
            (e._is = !1),
            (e._same = !1),
            (e._isSecond = !1),
            (r._dateElement = "day"),
            (e.next = function () {
                return (this._orient = 1), this;
            }),
            (t.next = function () {
                return t.today().next();
            }),
            (e.last = e.prev = e.previous = function () {
                return (this._orient = -1), this;
            }),
            (t.last = t.prev = t.previous = function () {
                return t.today().last();
            }),
            (e.is = function () {
                return (this._is = !0), this;
            }),
            (e.same = function () {
                return (this._same = !0), (this._isSecond = !1), this;
            }),
            (e.today = function () {
                return this.same().day();
            }),
            (e.weekday = function () {
                return !!this._is && ((this._is = !1), !this.is().sat() && !this.is().sun());
            }),
            (e.at = function (e) {
                return "string" == typeof e ? t.parse(this.toString("d") + " " + e) : this.set(e);
            }),
            (r.fromNow = r.after = function (t) {
                var e = {};
                return (e[this._dateElement] = this), (t ? t.clone() : new Date()).add(e);
            }),
            (r.ago = r.before = function (t) {
                var e = {};
                return (e[this._dateElement] = -1 * this), (t ? t.clone() : new Date()).add(e);
            });
        var i,
            s = "sunday monday tuesday wednesday thursday friday saturday".split(/\s/),
            a = "january february march april may june july august september october november december".split(/\s/),
            o = "Millisecond Second Minute Hour Day Week Month Year".split(/\s/),
            u = "Milliseconds Seconds Minutes Hours Date Week Month FullYear".split(/\s/),
            h = "final first second third fourth fifth".split(/\s/);
        (e.toObject = function () {
            for (var t = {}, e = 0; e < o.length; e++) t[o[e].toLowerCase()] = this["get" + u[e]]();
            return t;
        }),
            (t.fromObject = function (t) {
                return (t.week = null), Date.today().set(t);
            });
        for (
            var c = function (e) {
                    return function () {
                        if (this._is) return (this._is = !1), this.getDay() == e;
                        if (null !== this._nth) {
                            this._isSecond && this.addSeconds(-1 * this._orient), (this._isSecond = !1);
                            var n = this._nth;
                            this._nth = null;
                            var r = this.clone().moveToLastDayOfMonth();
                            if ((this.moveToNthOccurrence(e, n), this > r)) throw new RangeError(t.getDayName(e) + " does not occur " + n + " times in the month of " + t.getMonthName(r.getMonth()) + " " + r.getFullYear() + ".");
                            return this;
                        }
                        return this.moveToDayOfWeek(e, this._orient);
                    };
                },
                d = function (e) {
                    return function () {
                        var r = t.today(),
                            i = e - r.getDay();
                        return 0 === e && 1 === n.firstDayOfWeek && 0 !== r.getDay() && (i += 7), r.addDays(i);
                    };
                },
                l = 0;
            l < s.length;
            l++
        )
            (t[s[l].toUpperCase()] = t[s[l].toUpperCase().substring(0, 3)] = l), (t[s[l]] = t[s[l].substring(0, 3)] = d(l)), (e[s[l]] = e[s[l].substring(0, 3)] = c(l));
        for (
            var f = function (t) {
                    return function () {
                        return this._is ? ((this._is = !1), this.getMonth() === t) : this.moveToMonth(t, this._orient);
                    };
                },
                y = function (e) {
                    return function () {
                        return t.today().set({ month: e, day: 1 });
                    };
                },
                m = 0;
            m < a.length;
            m++
        )
            (t[a[m].toUpperCase()] = t[a[m].toUpperCase().substring(0, 3)] = m), (t[a[m]] = t[a[m].substring(0, 3)] = y(m)), (e[a[m]] = e[a[m].substring(0, 3)] = f(m));
        for (
            var g = function (t) {
                    return function () {
                        if (this._isSecond) return (this._isSecond = !1), this;
                        if (this._same) {
                            this._same = this._is = !1;
                            for (var e = this.toObject(), n = (arguments[0] || new Date()).toObject(), r = "", i = t.toLowerCase(), s = o.length - 1; s > -1; s--) {
                                if (e[(r = o[s].toLowerCase())] != n[r]) return !1;
                                if (i == r) break;
                            }
                            return !0;
                        }
                        return "s" != t.substring(t.length - 1) && (t += "s"), this["add" + t](this._orient);
                    };
                },
                M = function (t) {
                    return function () {
                        return (this._dateElement = t), this;
                    };
                },
                p = 0;
            p < o.length;
            p++
        )
            (e[(i = o[p].toLowerCase())] = e[i + "s"] = g(o[p])), (r[i] = r[i + "s"] = M(i));
        e._ss = g("Second");
        for (
            var v = function (t) {
                    return function (e) {
                        return this._same ? this._ss(arguments[0]) : e || 0 === e ? this.moveToNthOccurrence(e, t) : ((this._nth = t), 2 === t && null == e ? ((this._isSecond = !0), this.addSeconds(this._orient)) : this);
                    };
                },
                D = 0;
            D < h.length;
            D++
        )
            e[h[D]] = v(0 === D ? -1 : D);
    })(),
    (function () {
        Date.Parsing = {
            Exception: function (t) {
                this.message = "Parse error at '" + t.substring(0, 10) + " ...'";
            },
        };
        for (
            var t = Date.Parsing,
                e = (t.Operators = {
                    rtoken: function (e) {
                        return function (n) {
                            var r = n.match(e);
                            if (r) return [r[0], n.substring(r[0].length)];
                            throw new t.Exception(n);
                        };
                    },
                    token: function (t) {
                        return function (t) {
                            return e.rtoken(new RegExp("^s*" + t + "s*"))(t);
                        };
                    },
                    stoken: function (t) {
                        return e.rtoken(new RegExp("^" + t));
                    },
                    until: function (t) {
                        return function (e) {
                            for (var n = [], r = null; e.length; ) {
                                try {
                                    r = t.call(this, e);
                                } catch (t) {
                                    n.push(r[0]), (e = r[1]);
                                    continue;
                                }
                                break;
                            }
                            return [n, e];
                        };
                    },
                    many: function (t) {
                        return function (e) {
                            for (var n = [], r = null; e.length; ) {
                                try {
                                    r = t.call(this, e);
                                } catch (t) {
                                    return [n, e];
                                }
                                n.push(r[0]), (e = r[1]);
                            }
                            return [n, e];
                        };
                    },
                    optional: function (t) {
                        return function (e) {
                            var n = null;
                            try {
                                n = t.call(this, e);
                            } catch (t) {
                                return [null, e];
                            }
                            return [n[0], n[1]];
                        };
                    },
                    not: function (e) {
                        return function (n) {
                            try {
                                e.call(this, n);
                            } catch (t) {
                                return [null, n];
                            }
                            throw new t.Exception(n);
                        };
                    },
                    ignore: function (t) {
                        return t
                            ? function (e) {
                                  return [null, t.call(this, e)[1]];
                              }
                            : null;
                    },
                    product: function () {
                        for (var t = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = [], i = 0; i < t.length; i++) r.push(e.each(t[i], n));
                        return r;
                    },
                    cache: function (e) {
                        var n = {},
                            r = null;
                        return function (i) {
                            try {
                                r = n[i] = n[i] || e.call(this, i);
                            } catch (t) {
                                r = n[i] = t;
                            }
                            if (r instanceof t.Exception) throw r;
                            return r;
                        };
                    },
                    any: function () {
                        var e = arguments;
                        return function (n) {
                            for (var r = null, i = 0; i < e.length; i++)
                                if (null != e[i]) {
                                    try {
                                        r = e[i].call(this, n);
                                    } catch (t) {
                                        r = null;
                                    }
                                    if (r) return r;
                                }
                            throw new t.Exception(n);
                        };
                    },
                    each: function () {
                        var e = arguments;
                        return function (n) {
                            for (var r = [], i = null, s = 0; s < e.length; s++)
                                if (null != e[s]) {
                                    try {
                                        i = e[s].call(this, n);
                                    } catch (e) {
                                        throw new t.Exception(n);
                                    }
                                    r.push(i[0]), (n = i[1]);
                                }
                            return [r, n];
                        };
                    },
                    all: function () {
                        var t = arguments,
                            e = e;
                        return e.each(e.optional(t));
                    },
                    sequence: function (n, r, i) {
                        return (
                            (r = r || e.rtoken(/^\s*/)),
                            (i = i || null),
                            1 == n.length
                                ? n[0]
                                : function (e) {
                                      for (var s = null, a = null, o = [], u = 0; u < n.length; u++) {
                                          try {
                                              s = n[u].call(this, e);
                                          } catch (t) {
                                              break;
                                          }
                                          o.push(s[0]);
                                          try {
                                              a = r.call(this, s[1]);
                                          } catch (t) {
                                              a = null;
                                              break;
                                          }
                                          e = a[1];
                                      }
                                      if (!s) throw new t.Exception(e);
                                      if (a) throw new t.Exception(a[1]);
                                      if (i)
                                          try {
                                              s = i.call(this, s[1]);
                                          } catch (e) {
                                              throw new t.Exception(s[1]);
                                          }
                                      return [o, s ? s[1] : e];
                                  }
                        );
                    },
                    between: function (t, n, i) {
                        i = i || t;
                        var s = e.each(e.ignore(t), n, e.ignore(i));
                        return function (t) {
                            var e = s.call(this, t);
                            return [[e[0][0], r[0][2]], e[1]];
                        };
                    },
                    list: function (t, n, r) {
                        return (n = n || e.rtoken(/^\s*/)), (r = r || null), t instanceof Array ? e.each(e.product(t.slice(0, -1), e.ignore(n)), t.slice(-1), e.ignore(r)) : e.each(e.many(e.each(t, e.ignore(n))), px, e.ignore(r));
                    },
                    set: function (n, r, i) {
                        return (
                            (r = r || e.rtoken(/^\s*/)),
                            (i = i || null),
                            function (s) {
                                for (var a = null, o = null, u = null, h = null, c = [[], s], d = !1, l = 0; l < n.length; l++) {
                                    (u = null), (o = null), (a = null), (d = 1 == n.length);
                                    try {
                                        a = n[l].call(this, s);
                                    } catch (t) {
                                        continue;
                                    }
                                    if (((h = [[a[0]], a[1]]), a[1].length > 0 && !d))
                                        try {
                                            u = r.call(this, a[1]);
                                        } catch (t) {
                                            d = !0;
                                        }
                                    else d = !0;
                                    if ((d || 0 !== u[1].length || (d = !0), !d)) {
                                        for (var f = [], y = 0; y < n.length; y++) l != y && f.push(n[y]);
                                        (o = e.set(f, r).call(this, u[1]))[0].length > 0 && ((h[0] = h[0].concat(o[0])), (h[1] = o[1]));
                                    }
                                    if ((h[1].length < c[1].length && (c = h), 0 === c[1].length)) break;
                                }
                                if (0 === c[0].length) return c;
                                if (i) {
                                    try {
                                        u = i.call(this, c[1]);
                                    } catch (e) {
                                        throw new t.Exception(c[1]);
                                    }
                                    c[1] = u[1];
                                }
                                return c;
                            }
                        );
                    },
                    forward: function (t, e) {
                        return function (n) {
                            return t[e].call(this, n);
                        };
                    },
                    replace: function (t, e) {
                        return function (n) {
                            var r = t.call(this, n);
                            return [e, r[1]];
                        };
                    },
                    process: function (t, e) {
                        return function (n) {
                            var r = t.call(this, n);
                            return [e.call(this, r[0]), r[1]];
                        };
                    },
                    min: function (e, n) {
                        return function (r) {
                            var i = n.call(this, r);
                            if (i[0].length < e) throw new t.Exception(r);
                            return i;
                        };
                    },
                }),
                n = function (t) {
                    return function () {
                        var e = null,
                            n = [];
                        if ((arguments.length > 1 ? (e = Array.prototype.slice.call(arguments)) : arguments[0] instanceof Array && (e = arguments[0]), !e)) return t.apply(null, arguments);
                        for (var r = 0, i = e.shift(); r < i.length; r++) return e.unshift(i[r]), n.push(t.apply(null, e)), e.shift(), n;
                    };
                },
                i = "optional not ignore cache".split(/\s/),
                s = 0;
            s < i.length;
            s++
        )
            e[i[s]] = n(e[i[s]]);
        for (
            var a = function (t) {
                    return function () {
                        return arguments[0] instanceof Array ? t.apply(null, arguments[0]) : t.apply(null, arguments);
                    };
                },
                o = "each any all".split(/\s/),
                u = 0;
            u < o.length;
            u++
        )
            e[o[u]] = a(e[o[u]]);
    })(),
    (function () {
        var t = Date,
            e = (t.prototype, t.CultureInfo),
            n = function (t) {
                for (var e = [], r = 0; r < t.length; r++) t[r] instanceof Array ? (e = e.concat(n(t[r]))) : t[r] && e.push(t[r]);
                return e;
            };
        (t.Grammar = {}),
            (t.Translator = {
                hour: function (t) {
                    return function () {
                        this.hour = Number(t);
                    };
                },
                minute: function (t) {
                    return function () {
                        this.minute = Number(t);
                    };
                },
                second: function (t) {
                    return function () {
                        this.second = Number(t);
                    };
                },
                meridian: function (t) {
                    return function () {
                        this.meridian = t.slice(0, 1).toLowerCase();
                    };
                },
                timezone: function (t) {
                    return function () {
                        var e = t.replace(/[^\d\+\-]/g, "");
                        e.length ? (this.timezoneOffset = Number(e)) : (this.timezone = t.toLowerCase());
                    };
                },
                day: function (t) {
                    var e = t[0];
                    return function () {
                        this.day = Number(e.match(/\d+/)[0]);
                    };
                },
                month: function (t) {
                    return function () {
                        this.month = 3 == t.length ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(t) / 4 : Number(t) - 1;
                    };
                },
                year: function (t) {
                    return function () {
                        var n = Number(t);
                        this.year = t.length > 2 ? n : n + (n + 2e3 < e.twoDigitYearMax ? 2e3 : 1900);
                    };
                },
                rday: function (t) {
                    return function () {
                        switch (t) {
                            case "yesterday":
                                this.days = -1;
                                break;
                            case "tomorrow":
                                this.days = 1;
                                break;
                            case "today":
                                this.days = 0;
                                break;
                            case "now":
                                (this.days = 0), (this.now = !0);
                        }
                    };
                },
                finishExact: function (e) {
                    e = e instanceof Array ? e : [e];
                    for (var n = 0; n < e.length; n++) e[n] && e[n].call(this);
                    var r = new Date();
                    if (
                        ((!this.hour && !this.minute) || this.month || this.year || this.day || (this.day = r.getDate()),
                        this.year || (this.year = r.getFullYear()),
                        this.month || 0 === this.month || (this.month = r.getMonth()),
                        this.day || (this.day = 1),
                        this.hour || (this.hour = 0),
                        this.minute || (this.minute = 0),
                        this.second || (this.second = 0),
                        this.meridian && this.hour && ("p" == this.meridian && this.hour < 12 ? (this.hour = this.hour + 12) : "a" == this.meridian && 12 == this.hour && (this.hour = 0)),
                        this.day > t.getDaysInMonth(this.year, this.month))
                    )
                        throw new RangeError(this.day + " is not a valid value for days.");
                    var i = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
                    return this.timezone ? i.set({ timezone: this.timezone }) : this.timezoneOffset && i.set({ timezoneOffset: this.timezoneOffset }), i;
                },
                finish: function (e) {
                    if (0 === (e = e instanceof Array ? n(e) : [e]).length) return null;
                    for (var r = 0; r < e.length; r++) "function" == typeof e[r] && e[r].call(this);
                    var i = t.today();
                    if (this.now && !this.unit && !this.operator) return new Date();
                    this.now && (i = new Date());
                    var s,
                        a,
                        o,
                        u = !!((this.days && null !== this.days) || this.orient || this.operator);
                    if (
                        ((o = "past" == this.orient || "subtract" == this.operator ? -1 : 1),
                        this.now || -1 == "hour minute second".indexOf(this.unit) || i.setTimeToNow(),
                        (this.month || 0 === this.month) && -1 != "year day hour minute second".indexOf(this.unit) && ((this.value = this.month + 1), (this.month = null), (u = !0)),
                        !u && this.weekday && !this.day && !this.days)
                    ) {
                        var h = Date[this.weekday]();
                        (this.day = h.getDate()), this.month || (this.month = h.getMonth()), (this.year = h.getFullYear());
                    }
                    if (
                        (u && this.weekday && "month" != this.unit && ((this.unit = "day"), (s = t.getDayNumberFromName(this.weekday) - i.getDay()), (a = 7), (this.days = s ? (s + o * a) % a : o * a)),
                        this.month && "day" == this.unit && this.operator && ((this.value = this.month + 1), (this.month = null)),
                        null != this.value && null != this.month && null != this.year && (this.day = 1 * this.value),
                        this.month && !this.day && this.value && (i.set({ day: 1 * this.value }), u || (this.day = 1 * this.value)),
                        this.month || !this.value || "month" != this.unit || this.now || ((this.month = this.value), (u = !0)),
                        u && (this.month || 0 === this.month) && "year" != this.unit && ((this.unit = "month"), (s = this.month - i.getMonth()), (a = 12), (this.months = s ? (s + o * a) % a : o * a), (this.month = null)),
                        this.unit || (this.unit = "day"),
                        !this.value && this.operator && null !== this.operator && this[this.unit + "s"] && null !== this[this.unit + "s"]
                            ? (this[this.unit + "s"] = this[this.unit + "s"] + ("add" == this.operator ? 1 : -1) + (this.value || 0) * o)
                            : (null != this[this.unit + "s"] && null == this.operator) || (this.value || (this.value = 1), (this[this.unit + "s"] = this.value * o)),
                        this.meridian && this.hour && ("p" == this.meridian && this.hour < 12 ? (this.hour = this.hour + 12) : "a" == this.meridian && 12 == this.hour && (this.hour = 0)),
                        this.weekday && !this.day && !this.days)
                    ) {
                        h = Date[this.weekday]();
                        (this.day = h.getDate()), h.getMonth() !== i.getMonth() && (this.month = h.getMonth());
                    }
                    return (
                        (!this.month && 0 !== this.month) || this.day || (this.day = 1),
                        this.orient || this.operator || "week" != this.unit || !this.value || this.day || this.month
                            ? (u && this.timezone && this.day && this.days && (this.day = this.days), u ? i.add(this) : i.set(this))
                            : Date.today().setWeek(this.value)
                    );
                },
            });
        var r,
            i = t.Parsing.Operators,
            s = t.Grammar,
            a = t.Translator;
        (s.datePartDelimiter = i.rtoken(/^([\s\-\.\,\/\x27]+)/)), (s.timePartDelimiter = i.stoken(":")), (s.whiteSpace = i.rtoken(/^\s*/)), (s.generalDelimiter = i.rtoken(/^(([\s\,]|at|@|on)+)/));
        var o = {};
        (s.ctoken = function (t) {
            var n = o[t];
            if (!n) {
                for (var r = e.regexPatterns, s = t.split(/\s+/), a = [], u = 0; u < s.length; u++) a.push(i.replace(i.rtoken(r[s[u]]), s[u]));
                n = o[t] = i.any.apply(null, a);
            }
            return n;
        }),
            (s.ctoken2 = function (t) {
                return i.rtoken(e.regexPatterns[t]);
            }),
            (s.h = i.cache(i.process(i.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), a.hour))),
            (s.hh = i.cache(i.process(i.rtoken(/^(0[0-9]|1[0-2])/), a.hour))),
            (s.H = i.cache(i.process(i.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), a.hour))),
            (s.HH = i.cache(i.process(i.rtoken(/^([0-1][0-9]|2[0-3])/), a.hour))),
            (s.m = i.cache(i.process(i.rtoken(/^([0-5][0-9]|[0-9])/), a.minute))),
            (s.mm = i.cache(i.process(i.rtoken(/^[0-5][0-9]/), a.minute))),
            (s.s = i.cache(i.process(i.rtoken(/^([0-5][0-9]|[0-9])/), a.second))),
            (s.ss = i.cache(i.process(i.rtoken(/^[0-5][0-9]/), a.second))),
            (s.hms = i.cache(i.sequence([s.H, s.m, s.s], s.timePartDelimiter))),
            (s.t = i.cache(i.process(s.ctoken2("shortMeridian"), a.meridian))),
            (s.tt = i.cache(i.process(s.ctoken2("longMeridian"), a.meridian))),
            (s.z = i.cache(i.process(i.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), a.timezone))),
            (s.zz = i.cache(i.process(i.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), a.timezone))),
            (s.zzz = i.cache(i.process(s.ctoken2("timezone"), a.timezone))),
            (s.timeSuffix = i.each(i.ignore(s.whiteSpace), i.set([s.tt, s.zzz]))),
            (s.time = i.each(i.optional(i.ignore(i.stoken("T"))), s.hms, s.timeSuffix)),
            (s.d = i.cache(i.process(i.each(i.rtoken(/^([0-2]\d|3[0-1]|\d)/), i.optional(s.ctoken2("ordinalSuffix"))), a.day))),
            (s.dd = i.cache(i.process(i.each(i.rtoken(/^([0-2]\d|3[0-1])/), i.optional(s.ctoken2("ordinalSuffix"))), a.day))),
            (s.ddd = s.dddd = i.cache(
                i.process(s.ctoken("sun mon tue wed thu fri sat"), function (t) {
                    return function () {
                        this.weekday = t;
                    };
                })
            )),
            (s.M = i.cache(i.process(i.rtoken(/^(1[0-2]|0\d|\d)/), a.month))),
            (s.MM = i.cache(i.process(i.rtoken(/^(1[0-2]|0\d)/), a.month))),
            (s.MMM = s.MMMM = i.cache(i.process(s.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), a.month))),
            (s.y = i.cache(i.process(i.rtoken(/^(\d\d?)/), a.year))),
            (s.yy = i.cache(i.process(i.rtoken(/^(\d\d)/), a.year))),
            (s.yyy = i.cache(i.process(i.rtoken(/^(\d\d?\d?\d?)/), a.year))),
            (s.yyyy = i.cache(i.process(i.rtoken(/^(\d\d\d\d)/), a.year))),
            (r = function () {
                return i.each(i.any.apply(null, arguments), i.not(s.ctoken2("timeContext")));
            }),
            (s.day = r(s.d, s.dd)),
            (s.month = r(s.M, s.MMM)),
            (s.year = r(s.yyyy, s.yy)),
            (s.orientation = i.process(s.ctoken("past future"), function (t) {
                return function () {
                    this.orient = t;
                };
            })),
            (s.operator = i.process(s.ctoken("add subtract"), function (t) {
                return function () {
                    this.operator = t;
                };
            })),
            (s.rday = i.process(s.ctoken("yesterday tomorrow today now"), a.rday)),
            (s.unit = i.process(s.ctoken("second minute hour day week month year"), function (t) {
                return function () {
                    this.unit = t;
                };
            })),
            (s.value = i.process(i.rtoken(/^\d\d?(st|nd|rd|th)?/), function (t) {
                return function () {
                    this.value = t.replace(/\D/g, "");
                };
            })),
            (s.expression = i.set([s.rday, s.operator, s.value, s.unit, s.orientation, s.ddd, s.MMM])),
            (r = function () {
                return i.set(arguments, s.datePartDelimiter);
            }),
            (s.mdy = r(s.ddd, s.month, s.day, s.year)),
            (s.ymd = r(s.ddd, s.year, s.month, s.day)),
            (s.dmy = r(s.ddd, s.day, s.month, s.year)),
            (s.date = function (t) {
                return (s[e.dateElementOrder] || s.mdy).call(this, t);
            }),
            (s.format = i.process(
                i.many(
                    i.any(
                        i.process(i.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (e) {
                            if (s[e]) return s[e];
                            throw t.Parsing.Exception(e);
                        }),
                        i.process(i.rtoken(/^[^dMyhHmstz]+/), function (t) {
                            return i.ignore(i.stoken(t));
                        })
                    )
                ),
                function (t) {
                    return i.process(i.each.apply(null, t), a.finishExact);
                }
            ));
        var u = {},
            h = function (t) {
                return (u[t] = u[t] || s.format(t)[0]);
            };
        (s.formats = function (t) {
            if (t instanceof Array) {
                for (var e = [], n = 0; n < t.length; n++) e.push(h(t[n]));
                return i.any.apply(null, e);
            }
            return h(t);
        }),
            (s._formats = s.formats([
                '"yyyy-MM-ddTHH:mm:ssZ"',
                "yyyy-MM-ddTHH:mm:ssZ",
                "yyyy-MM-ddTHH:mm:ssz",
                "yyyy-MM-ddTHH:mm:ss",
                "yyyy-MM-ddTHH:mmZ",
                "yyyy-MM-ddTHH:mmz",
                "yyyy-MM-ddTHH:mm",
                "ddd, MMM dd, yyyy H:mm:ss tt",
                "ddd MMM d yyyy HH:mm:ss zzz",
                "MMddyyyy",
                "ddMMyyyy",
                "Mddyyyy",
                "ddMyyyy",
                "Mdyyyy",
                "dMyyyy",
                "yyyy",
                "Mdyy",
                "dMyy",
                "d",
            ])),
            (s._start = i.process(i.set([s.date, s.time, s.expression], s.generalDelimiter, s.whiteSpace), a.finish)),
            (s.start = function (t) {
                try {
                    var e = s._formats.call({}, t);
                    if (0 === e[1].length) return e;
                } catch (t) {}
                return s._start.call({}, t);
            }),
            (t._parse = t.parse),
            (t.parse = function (e) {
                var n = null;
                if (!e) return null;
                if (e instanceof Date) return e;
                try {
                    n = t.Grammar.start.call({}, e.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
                } catch (t) {
                    return null;
                }
                return 0 === n[1].length ? n[0] : null;
            }),
            (t.getParseFunction = function (e) {
                var n = t.Grammar.formats(e);
                return function (t) {
                    var e = null;
                    try {
                        e = n.call({}, t);
                    } catch (t) {
                        return null;
                    }
                    return 0 === e[1].length ? e[0] : null;
                };
            }),
            (t.parseExact = function (e, n) {
                return t.getParseFunction(n)(e);
            });
    })();
