/**
 * This is the MSFT Call to Action webpart:
 * https://spoprod-a.akamaihd.net/files/sp-client/TBD.js
 * 
 * Look in this folder in Sources under Page
 * >>  modern.akamai.odsp.cdn.office.net    >> files    >> sp-client    >> TBD.js
 * 
 * this.properties:
 * "locations": {               // weatherLocationList: this.properties.locations || [],
 * "webPartTitle": {            // webPartTitle: this.properties.webPartTitle,
 * "": {
 * "": {
 *                            
 */


define("868ac3c3-cad7-4bd6-9a1c-14dc5cc8e823_0.0.1", ["tslib", "@ms/sp-telemetry", "@ms/sp-grid-layout", "@microsoft/sp-component-base", "@microsoft/sp-loader", "@microsoft/office-ui-fabric-react-bundle", "@ms/sp-dataproviders", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-page-context", "@ms/i18n-utilities", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities", "@microsoft/load-themed-styles", "@ms/sp-deferred-component", "@microsoft/sp-diagnostics", "@microsoft/sp-http", "@ms/odsp-utilities-bundle"], function(e, t, a, n, i, r, o, s, m, p, c, d, h, l, u, _, g, w, y, f) {
    return function(e) {
      function t(t) {
        for (var a, i, r = t[0], o = t[1], s = 0, m = []; s < r.length; s++) i = r[s], Object.prototype.hasOwnProperty.call(n, i) && n[i] && m.push(n[i][0]), n[i] = 0;
        for (a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a]);
        for (p && p(t); m.length;) m.shift()()
      }
      var a = {},
        n = {
          0: 0
        };
  
      function i(t) {
        if (a[t]) return a[t].exports;
        var n = a[t] = {
          i: t,
          l: !1,
          exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
      }
      i.e = function(t) {
        for (var a = [], o = function(e) {
            return {
              2: [{
                i: "17ce0976-e69a-4355-be84-89b69a74717d",
                v: "0.1.0",
                m: "fglE"
              }]
            } [e] || []
          }(t), s = 0; s < o.length; s++) e[o[s].m] || function(t) {
          a.push(r.SPComponentLoader.loadComponentById(t.i, t.v).then(function(a) {
            e[t.m] = function(e) {
              e.exports = a
            }
          }))
        }(o[s]);
        var m = n[t];
        if (0 !== m)
          if (m) a.push(m[2]);
          else {
            var p = new Promise(function(e, a) {
              m = n[t] = [e, a]
            });
            a.push(m[2] = p);
            var c, d = document.createElement("script");
            d.charset = "utf-8", d.timeout = 120, i.nc && d.setAttribute("nonce", i.nc), d.src = function(e) {
              return i.p + "chunk." + ({
                1: "spweather-weathercardplaceholder",
                2: "vendors~spweather-weathercardplaceholder",
                3: "weather-property-pane"
              } [e] || e) + "_" + (["en-us", "none"])[{
                "1": 0,
                "2": 1,
                "3": 0
              } [e]] + "_" + {
                1: "e680d9dc753aa0ff872e",
                2: "f6bebcce0b44f1bf4f1d",
                3: "cf65d57a352675ad9adb"
              } [e] + ".js"
            }(t);
            var h = new Error;
            c = function(e) {
              d.onerror = d.onload = null, clearTimeout(l);
              var a = n[t];
              if (0 !== a) {
                if (a) {
                  var i = e && ("load" === e.type ? "missing" : e.type),
                    r = e && e.target && e.target.src;
                  h.message = "Loading chunk " + t + " failed.\n(" + i + ": " + r + ")", h.name = "ChunkLoadError", h.type = i, h.request = r, a[1](h)
                }
                n[t] = void 0
              }
            };
            var l = setTimeout(function() {
              c({
                type: "timeout",
                target: d
              })
            }, 12e4);
            d.onerror = d.onload = c, document.head.appendChild(d)
          } return Promise.all(a)
      }, i.m = e, i.c = a, i.d = function(e, t, a) {
        i.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: a
        })
      }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        })
      }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var n in e) i.d(a, n, function(t) {
            return e[t]
          }.bind(null, n));
        return a
      }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e.default
        } : function() {
          return e
        };
        return i.d(t, "a", t), t
      }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, i.p = "";
      var r = i("I6O9");
      i.oe = function(e) {
        throw console.error(e), e
      };
      var o = window.webpackJsonp_868ac3c3_cad7_4bd6_9a1c_14dc5cc8e823_0_0_1 = window.webpackJsonp_868ac3c3_cad7_4bd6_9a1c_14dc5cc8e823_0_0_1 || [],
        s = o.push.bind(o);
      o.push = t, o = o.slice();
      for (var m = 0; m < o.length; m++) t(o[m]);
      var p = s;
      return function() {
        var e, t = document.getElementsByTagName("script"),
          a = "undefined" != typeof spScriptNamePattern ? spScriptNamePattern : /sp-weather-webpart_en-us_02f99f6ace3c33ec5ae5\.js/i;
        if (t && t.length)
          for (var n = 0; n < t.length; n++)
            if (t[n]) {
              var r = t[n].getAttribute("src");
              if (r && r.match(a)) {
                e = r.substring(0, r.lastIndexOf("/") + 1);
                break
              }
            } if (!e)
          for (var o in window.__setWebpackPublicPathLoaderSrcRegistry__)
            if (o && o.match(a)) {
              e = o.substring(0, o.lastIndexOf("/") + 1);
              break
            } i.p = e
      }(), i(i.s = "NN/g")
    }({
      "17wl": function(t, a) {
        t.exports = e
      },
      "2q6Q": function(e, a) {
        e.exports = t
      },
      "6mGg": function(e, t) {
        e.exports = a
      },
      "7Awa": function(e, t) {
        e.exports = n
      },
      I6O9: function(e, t) {
        e.exports = i
      },
      KL1q: function(e, t) {
        e.exports = r
      },
      "NN/g": function(e, t, a) {
        "use strict";
        a.r(t);
        var n = a("17wl"),
          i = a("cDcd"),
          r = a("faye"),
          o = a("KL1q"),
          s = a("7Awa"),
          m = a("UWqr"),
          p = a("ut3N"),
          c = a("br4S"),
          d = a("QZHX"),
          h = a("2q6Q"),
          l = a("vlQI"),
          u = a("X+PM"),
          _ = a("y88i"),
          g = a("hiL/"),
          w = function() {
            function e(e) {
              this._httpClient = e.consume(l.HttpClient.serviceKey), this._cultureName = e.consume(u.PageContext.serviceKey).cultureInfo.currentUICultureName
            }
            return e.prototype.getWeatherInfo = function(e, t) {
              return Object(n.__awaiter)(this, void 0, void 0, function() {
                var a = this;
                return Object(n.__generator)(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return [4, g.RetryHelper.retry(3, "WeatherWebPart", "GetWeatherInfo", function() {
                        return a._getWeatherInfo(e, t)
                      })];
                    case 1:
                      return [2, n.sent()]
                  }
                })
              })
            }, e.prototype._getWeatherInfo = function(e, t) {
              var a = this,
                n = "https://service.weather.microsoft.com/" + this._cultureName + "/weather/summary/" + e.latitude + "," + e.longitude + "?units=" + t + "&formcode=SPWP&appid=F7EC616D-DEBC-417F-BC1B-E2E342F13477";
              return this._httpClient.get(n, l.HttpClient.configurations.v1).catch(function(e) {
                var t = new _.Uri(window.location.href);
                return Promise.reject(new g.UnexpectedFailure("NetworkError", e, {
                  pagePathNameMD5: Object(g.Md5Hash)(t.getHost() + t.getPath())
                }))
              }).then(this._checkResponseStatus).then(function(e) {
                return a._parseWeatherResponse(e, t)
              })
            }, e.prototype._parseWeatherResponse = function(e, t) {
              if (!e.responses[0].error) {
                var a = e.responses[0].weather[0];
                return {
                  temperature: a.current.temp,
                  icon: a.current.icon,
                  caption: a.current.cap,
                  highestTemperature: a.forecast.days[0].tempHi,
                  lowestTemperature: a.forecast.days[0].tempLo,
                  temperatureUnit: t
                }
              }
            }, e.prototype._parseLocationResponse = function(e) {
              if (!e.responses[0].error) {
                var t = e.responses[0].locations[0];
                return {
                  latitude: t.coordinates.lat,
                  longitude: t.coordinates.lon,
                  name: t.displayName,
                  showCustomizedDisplayName: !1,
                  customizedDisplayName: void 0
                }
              }
            }, e.prototype._checkResponseStatus = function(e) {
              return e.ok ? e.json().catch(function(e) {
                return Promise.reject(new g.UnexpectedFailure("FailedToParseResponse", e))
              }) : e.json().catch(function(e) {
                return Promise.reject(new g.UnexpectedFailure("FailedToParseError", e))
              }).then(function(e) {
                return Promise.reject(new g.UnexpectedFailure("RequestFailure", JSON.stringify(e)))
              })
            }, Object(n.__decorate)([Object(g.monitor)("WeatherWebPart.GetWeatherInfo")], e.prototype, "getWeatherInfo", null), Object(n.__decorate)([o.autobind], e.prototype, "_parseWeatherResponse", null), e
          }(),
          y = a("6mGg"),
          f = a("U4ag"),
          b = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(n.__extends)(t, e), t.prototype._internalLoad = function() {
              return Promise.all([a.e(2), a.e(1)]).then(a.bind(null, "4rEz")).then(function(e) {
                return e.WeatherCardPlaceholder
              })
            }, t
          }(a("qjmy")._DeferredComponent),
          v = a("Ycni"),
          I = new Map([
            ["1", "1"],
            ["2", "1"],
            ["101", "1"],
            ["3", "3"],
            ["4", "3"],
            ["5", "5"],
            ["32", "5"],
            ["6", "6"],
            ["33", "6"],
            ["61", "6"],
            ["62", "6"],
            ["87", "6"],
            ["88", "6"],
            ["93", "6"],
            ["94", "6"],
            ["95", "6"],
            ["96", "6"],
            ["7", "7"],
            ["34", "7"],
            ["57", "7"],
            ["58", "7"],
            ["59", "7"],
            ["60", "7"],
            ["8", "8"],
            ["13", "8"],
            ["17", "8"],
            ["19", "8"],
            ["35", "8"],
            ["40", "8"],
            ["44", "8"],
            ["46", "8"],
            ["9", "9"],
            ["18", "9"],
            ["21", "9"],
            ["36", "9"],
            ["45", "9"],
            ["48", "9"],
            ["63", "9"],
            ["64", "9"],
            ["10", "10"],
            ["11", "10"],
            ["37", "10"],
            ["38", "10"],
            ["69", "10"],
            ["70", "10"],
            ["71", "10"],
            ["72", "10"],
            ["12", "12"],
            ["39", "12"],
            ["89", "12"],
            ["90", "12"],
            ["14", "14"],
            ["22", "14"],
            ["41", "14"],
            ["49", "14"],
            ["15", "15"],
            ["25", "15"],
            ["42", "15"],
            ["52", "15"],
            ["16", "16"],
            ["65", "16"],
            ["73", "16"],
            ["20", "20"],
            ["47", "20"],
            ["23", "23"],
            ["79", "23"],
            ["24", "24"],
            ["51", "24"],
            ["75", "24"],
            ["76", "24"],
            ["85", "24"],
            ["86", "24"],
            ["26", "26"],
            ["53", "26"],
            ["81", "26"],
            ["27", "27"],
            ["54", "27"],
            ["67", "27"],
            ["68", "27"],
            ["28", "28"],
            ["29", "28"],
            ["102", "28"],
            ["30", "30"],
            ["31", "30"],
            ["43", "43"],
            ["66", "43"],
            ["74", "43"],
            ["50", "50"],
            ["80", "50"],
            ["77", "77"],
            ["83", "77"],
            ["78", "78"],
            ["84", "78"],
            ["82", "82"],
            ["91", "91"],
            ["92", "91"]
          ]),
          A = (new Map([
            ["50", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kMP0.img"],
            ["91", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiclk.img"],
            ["77_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiyOQ.img"],
            ["6", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBimeH.img"],
            ["12", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBihcA.img"],
            ["77", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kllo.img"],
            ["7", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiAT6.img"],
            ["15", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiyD0.img"],
            ["5_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBi4jn.img"],
            ["43_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiB97.img"],
            ["16_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBi1Rq.img"],
            ["82_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiBbz.img"],
            ["10", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiyB9.img"],
            ["20", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiAZc.img"],
            ["50_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBimuu.img"],
            ["1", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBih5H.img"],
            ["26", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kKUu.img"],
            ["43", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kPhF.img"],
            ["26_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBirDn.img"],
            ["3", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kvzy.img"],
            ["5", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kc8s.img"],
            ["23", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kvFq.img"],
            ["3_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBievA.img"],
            ["30_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiB8e.img"],
            ["8", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBi9ul.img"],
            ["28", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiwNf.img"],
            ["24", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBi9D1.img"],
            ["23_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBieHe.img"],
            ["78", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kj0A.img"],
            ["30", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kKVy.img"],
            ["16", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kvEj.img"],
            ["78_old", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiBb8.img"],
            ["9", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBi9v6.img"],
            ["27", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBhZsN.img"],
            ["82", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kvLx.img"],
            ["14", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBiyCq.img"],
            ["150", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeH28O.img"],
            ["151", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeHelH.img"],
            ["152", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeH6A1.img"],
            ["153", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeK7JP.img"],
            ["154", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKkRS.img"],
            ["155", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKA3q.img"],
            ["156", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJzVs.img"],
            ["157", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKspo.img"],
            ["158", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKxG9.img"],
            ["159", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKnod.img"],
            ["160", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJxoG.img"],
            ["161", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKfv5.img"],
            ["162", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKfv8.img"],
            ["163", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKnoL.img"],
            ["164", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKnoW.img"],
            ["165", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJzWf.img"],
            ["166", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeK7La.img"],
            ["167", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKnqM.img"],
            ["168", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKkWj.img"],
            ["169", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKalK.img"],
            ["170", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKfyk.img"],
            ["171", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKi9Z.img"],
            ["172", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKiae.img"],
            ["173", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJxsx.img"],
            ["174", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeK5dg.img"],
            ["175", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeK7Om.img"],
            ["176", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKkYE.img"],
            ["177", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJxsU.img"],
            ["178", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA00.img"],
            ["179", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKiaX.img"],
            ["180", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA0a.img"],
            ["181", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKfzx.img"],
            ["182", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKfzA.img"],
            ["183", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKv50.img"],
            ["184", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA0m.img"],
            ["185", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKibd.img"],
            ["186", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKxMA.img"],
            ["187", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKibg.img"],
            ["188", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKqb5.img"],
            ["189", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA0v.img"],
            ["190", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKl0l.img"],
            ["191", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKl0s.img"],
            ["192", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKduX.img"],
            ["193", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKnva.img"],
            ["194", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA0G.img"],
            ["195", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJvqT.img"],
            ["197", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKic4.img"],
            ["198", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeK7QX.img"],
            ["199", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA2E.img"],
            ["200", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKswB.img"],
            ["202", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeJA3m.img"],
            ["203", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKiev.img"],
            ["204", "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAeKdAy.img"]
          ]), new Map([
            ["1", "Sunny"],
            ["3", "PartlyCloudyDay"],
            ["5", "Cloudy"],
            ["6", "Duststorm"],
            ["7", "BlowingSnow"],
            ["8", "Rain"],
            ["9", "Fog"],
            ["10", "Freezing"],
            ["12", "Fog"],
            ["14", "Rain"],
            ["15", "Snow"],
            ["16", "HailDay"],
            ["20", "Snow"],
            ["23", "RainShowersDay"],
            ["24", "RainSnow"],
            ["26", "SnowShowerDay"],
            ["27", "Thunderstorms"],
            ["28", "ClearNight"],
            ["30", "PartlyCloudyNight"],
            ["43", "HailNight"],
            ["50", "RainShowersNight"],
            ["77", "RainSnow"],
            ["78", "RainSnow"],
            ["82", "SnowShowerNight"],
            ["91", "Squalls"]
          ]));
  
        function C(e) {
          var t = I.get(e.toString());
          if (t) return A.get(t)
        }
        window.devicePixelRatio, window.devicePixelRatio;
        var L = new Map([
            ["ar-ae", "http://www.msn.com/ar-ae/weather/today/{0}/we-city?weadegreetype={1}"],
            ["ar-eg", "http://www.msn.com/ar-eg/weather/today/{0}/we-city?weadegreetype={1}"],
            ["ar-sa", "http://www.msn.com/ar-sa/weather/today/{0}/we-city?weadegreetype={1}"],
            ["ar-xl", "http://www.msn.com/ar-xl/weather/today/{0}/we-city?weadegreetype={1}"],
            ["da-dk", "http://www.msn.com/da-dk/vejr/i-dag/{0}/we-city?weadegreetype={1}"],
            ["de-ch", "http://www.msn.com/de-ch/wetter/heute/{0}/we-city?weadegreetype={1}"],
            ["de-de", "http://www.msn.com/de-de/wetter/heute/{0}/we-city?weadegreetype={1}"],
            ["el-gr", "http://www.msn.com/el-gr/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-ae", "http://www.msn.com/en-ae/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-au", "http://www.msn.com/en-au/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-ca", "http://www.msn.com/en-ca/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-gb", "http://www.msn.com/en-gb/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-ie", "http://www.msn.com/en-ie/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-in", "http://www.msn.com/en-in/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-my", "http://www.msn.com/en-my/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-nz", "http://www.msn.com/en-nz/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-ph", "http://www.msn.com/en-ph/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-sa", "http://www.msn.com/en-sa/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-us", "http://www.msn.com/en-us/weather/today/{0}/we-city?weadegreetype={1}"],
            ["en-za", "http://www.msn.com/en-za/weather/today/{0}/we-city?weadegreetype={1}"],
            ["es-ar", "http://www.msn.com/es-ar/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-cl", "http://www.msn.com/es-cl/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-co", "http://www.msn.com/es-co/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-es", "http://www.msn.com/es-es/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-mx", "http://www.msn.com/es-mx/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-pe", "http://www.msn.com/es-pe/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-us", "http://www.msn.com/es-us/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-ve", "http://www.msn.com/es-ve/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["es-xl", "http://www.msn.com/es-xl/el-tiempo/hoy/{0}/we-city?weadegreetype={1}"],
            ["fi-fi", "http://www.msn.com/fi-fi/saa/tanaan/{0}/we-city?weadegreetype={1}"],
            ["fr-be", "http://www.msn.com/fr-be/meteo/aujourd-hui/{0}/we-city?weadegreetype={1}"],
            ["fr-ca", "http://www.msn.com/fr-ca/meteo/aujourd-hui/{0}/we-city?weadegreetype={1}"],
            ["fr-ch", "http://www.msn.com/fr-ch/meteo/aujourd-hui/{0}/we-city?weadegreetype={1}"],
            ["fr-fr", "http://www.msn.com/fr-fr/meteo/aujourd-hui/{0}/we-city?weadegreetype={1}"],
            ["id-id", "http://www.msn.com/id-id/cuaca/hariini/{0}/we-city?weadegreetype={1}"],
            ["it-it", "http://www.msn.com/it-it/meteo/oggi/{0}/we-city?weadegreetype={1}"],
            ["ja-jp", "http://www.msn.com/ja-jp/weather/today/{0}/we-city?weadegreetype={1}&q={0}"],
            ["ko-kr", "http://www.msn.com/ko-kr/weather/today/{0}/we-city?weadegreetype={1}"],
            ["nb-no", "http://www.msn.com/nb-no/weather/idag/{0}/we-city?weadegreetype={1}"],
            ["nl-be", "http://www.msn.com/nl-be/weer/vandaag/{0}/we-city?weadegreetype={1}"],
            ["nl-nl", "http://www.msn.com/nl-nl/weer/vandaag/{0}/we-city?weadegreetype={1}"],
            ["pl-pl", "http://www.msn.com/pl-pl/pogoda/dzisiaj/{0}/we-city?weadegreetype={1}"],
            ["pt-br", "http://www.msn.com/pt-br/clima/hoje/{0}/we-city?weadegreetype={1}"],
            ["pt-pt", "http://www.msn.com/pt-pt/meteorologia/hoje/{0}/we-city?weadegreetype={1}"],
            ["ru-ru", "http://www.msn.com/ru-ru/weather/today/{0}/we-city?weadegreetype={1}"],
            ["sv-se", "http://www.msn.com/sv-se/weather/idag/{0}/we-city?weadegreetype={1}"],
            ["th-th", "http://www.msn.com/th-th/weather/today/{0}/we-city?weadegreetype={1}"],
            ["tr-tr", "http://www.msn.com/tr-tr/havadurumu/bugun/{0}/we-city?weadegreetype={1}"],
            ["zh-hk", "http://www.msn.com/zh-hk/weather/today/{0}/we-city?weadegreetype={1}"],
            ["zh-tw", "/http://www.msn.com/zh-tw/weather/today/{0}/we-city?weadegreetype={1}"]
          ]),
          k = 20,
          S = 10,
          x = 240,
          z = 3;
  
        function P(e) {
          return e.showCustomizedDisplayName && e.customizedDisplayName || e.name
        }
  
        function E(e) {
          return Math.min(Math.floor((e + k) / (x + k)) || 1, z)
        }
        var T = function(e) {
            var t = e.isEdit,
              a = e.variantTheme;
            return {
              weatherCardWrapper: {
                background: "transparent",
                border: "1px solid",
                borderColor: a && a.semanticColors.bodyDivider,
                selectors: {
                  "&:hover": t && {
                    borderColor: a && a.semanticColors.focusBorder
                  },
                  "&:focus": {
                    borderColor: a && a.semanticColors.focusBorder
                  }
                }
              },
              bodyText: {
                color: a && a.semanticColors.bodyText
              },
              bodySubtext: {
                color: a && a.semanticColors.bodySubtext
              },
              actionLink: {
                color: a && a.semanticColors.actionLink,
                selectors: {
                  "&:hover, &:focus, &:active": {
                    color: a && a.semanticColors.actionLinkHovered
                  }
                }
              }
            }
          },
          j = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(n.__extends)(t, e), t.prototype.getStyles = function(e) {
              return T(e)
            }, t
          }(f.BaseEmphasisComponentStyles);
        a("SWVy");
        var D = a("qdau"),
          N = Object(o.classNamesFunction)(),
          W = function(e) {
            function t(t) {
              var a = e.call(this, t) || this;
              return a._handleBlur = function() {
                a.setState({
                  isFocusedInside: !1
                })
              }, a._handleFocus = function() {
                a.setState({
                  isFocusedInside: !0
                })
              }, a._handleSwitchUnit = function() {
                var e = "C" === a.props.displayTemperatureUnit ? "F" : "C";
                a.props.onSwitchTemperatureUnit(e)
              }, a._handleClick = function() {
                h._EngagementLogger.logEvent("WeatherWebPart.WeatherProvider.Click")
              }, a._handleClickDeleteButton = function(e) {
                a.props.onDelete(), e.stopPropagation(), e.preventDefault()
              }, a._handleKeyDown = function(e) {
                a.props.isEdit && e.which === o.KeyCodes.del && (a.props.onDelete(), e.stopPropagation())
              }, a.state = {
                isFocusedInside: !1
              }, a
            }
            return Object(n.__extends)(t, e), t._formatDateString = function(e) {
              var t = v.LocaleFormat.formatDate(e, {
                  raw: "MM"
                }),
                a = v.LocaleFormat.formatDate(e, {
                  raw: "dd"
                }),
                n = v.LocaleFormat.formatDate(e, {
                  raw: "yyyy"
                });
              return _.StringHelper.format(D.h, t, a, n)
            }, t.prototype.render = function() {
              m._SPFlight.isEnabled(276) ? this._emphasisClassNames = N(T, {
                isEdit: this.props.isEdit,
                variantTheme: this.props.variantTheme
              }) : this._emphasisClassNames = (new j).getClassNames({
                isEdit: this.props.isEdit,
                variantTheme: this.props.variantTheme
              });
              var e = Object(o.css)("a_a_98d8a262", this._emphasisClassNames.weatherCardWrapper),
                t = i.createElement("div", {
                  "aria-label": this._weatherDetailMessage,
                  "aria-posinset": this.props.positionInSet,
                  "aria-setsize": this.props.setSize,
                  className: e,
                  "data-automation-id": "weather-card-wrapper",
                  ref: this.props.rootFocusRef,
                  style: {
                    width: this.props.width
                  },
                  "data-drag-tag": this.props.dataDragTag,
                  "data-drag-handle": this.props.dataDragHandle,
                  role: "listitem",
                  "data-is-focused-in": this.state.isFocusedInside,
                  "data-is-focusable": !0,
                  onKeyDown: this._handleKeyDown,
                  onClick: this.props.onClick,
                  onBlur: this._handleBlur,
                  onFocus: this._handleFocus
                }, i.createElement("div", {
                  className: "c_a_98d8a262",
                  "data-automation-id": "weatherCard"
                }, i.createElement("div", {
                  className: Object(o.css)("e_a_98d8a262", this._emphasisClassNames.bodyText)
                }, this._displayedLocation), this._renderWeatherInfo), this._renderActionBar);
              return i.createElement(o.Customizer, {
                settings: {
                  theme: this.props.variantTheme
                }
              }, t)
            }, Object.defineProperty(t.prototype, "_renderWeatherInfo", {
              get: function() {
                return this.props.weatherItem.weatherInfo ? this._renderTemperatureInfo(this.props.weatherItem.weatherInfo) : this._renderWeatherShimmer()
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._renderTemperatureInfo = function(e) {
              var a = this.props.width >= 320 ? i.createElement("span", {
                className: "l_a_98d8a262"
              }, t._formatDateString(this._currentDate)) : void 0;
              return i.createElement("div", {
                className: "f_a_98d8a262"
              }, this._weatherIcon(e.icon), i.createElement("div", {
                className: Object(o.css)("h_a_98d8a262", this._emphasisClassNames.bodyText)
              }, this._convertToDisplayTemperature(e.temperature)), this._temperatureUnit, i.createElement("div", {
                className: "k_a_98d8a262"
              }, i.createElement("div", {
                className: Object(o.css)("m_a_98d8a262", this._emphasisClassNames.bodyText)
              }, i.createElement("span", {
                className: "l_a_98d8a262"
              }, e.caption)), i.createElement("div", {
                className: Object(o.css)("n_a_98d8a262", this._emphasisClassNames.bodySubtext)
              }, i.createElement("span", {
                className: "l_a_98d8a262"
              }, this._temperatureRange), a, this._renderWeatherProvider())))
            }, t.prototype._weatherIcon = function(e) {
              return i.createElement(o.Icon, {
                iconName: C(e),
                styles: {
                  root: {
                    width: 28,
                    height: 28,
                    fontSize: 28,
                    lineHeight: 28,
                    textAlign: "center",
                    minWidth: 28,
                    margin: "2px 8px 0 0"
                  }
                }
              })
            }, Object.defineProperty(t.prototype, "_temperatureUnit", {
              get: function() {
                var e = "C" === this.props.displayTemperatureUnit ? D.a : D.f,
                  t = Object(o.css)("i_a_98d8a262", "j_a_98d8a262", this._emphasisClassNames.actionLink);
                return this.props.isEdit ? i.createElement("span", {
                  className: Object(o.css)("i_a_98d8a262", this._emphasisClassNames.bodyText)
                }, e) : i.createElement(o.Link, {
                  className: t,
                  title: D.l,
                  onClick: this._handleSwitchUnit,
                  "aria-label": D.m
                }, e)
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._renderWeatherShimmer = function() {
              var e = i.createElement("div", {
                className: "p_a_98d8a262"
              }, i.createElement(o.ShimmerElementsGroup, {
                shimmerElements: [{
                  type: o.ShimmerElementType.circle,
                  width: 30,
                  height: 30
                }, {
                  type: o.ShimmerElementType.gap,
                  width: 8,
                  height: 30
                }, {
                  type: o.ShimmerElementType.line,
                  width: 42,
                  height: 30
                }, {
                  type: o.ShimmerElementType.gap,
                  width: 36,
                  height: 30
                }]
              }), i.createElement(o.ShimmerElementsGroup, {
                flexWrap: !0,
                width: "100%",
                shimmerElements: [{
                  type: o.ShimmerElementType.line,
                  width: "60%",
                  height: 12,
                  verticalAlign: "top"
                }, {
                  type: o.ShimmerElementType.gap,
                  width: "40%",
                  height: 15
                }, {
                  type: o.ShimmerElementType.line,
                  width: "100%",
                  height: 12,
                  verticalAlign: "bottom"
                }]
              }));
              return i.createElement(o.Shimmer, {
                customElementsGroup: e,
                width: this.props.width - k
              })
            }, t.prototype._renderWeatherProvider = function() {
              return this.props.isEdit ? i.createElement("span", {
                className: this._emphasisClassNames.bodyText
              }, this._providerName) : i.createElement(o.Link, {
                className: this._emphasisClassNames.actionLink,
                href: this._weatherLink,
                target: "_blank",
                "aria-label": D.k,
                onClick: this._handleClick
              }, this._providerName)
            }, Object.defineProperty(t.prototype, "_weatherLink", {
              get: function() {
                var e = this.props.cultureName.toLowerCase(),
                  t = L.get(e);
                if (m._SPKillSwitch.isActivated("4fbd1d81-3022-49d4-9ede-7189209b7f3d") || L.get(e) || (t = L.get("en-us")), "zh-cn" === e) return "http://weather.com.cn";
                if (this.props.weatherItem.location && this.props.weatherItem.weatherInfo && t) {
                  var a = this.props.weatherItem.location.countryName ? this.props.weatherItem.location.name + ", " + this.props.weatherItem.location.countryName : this.props.weatherItem.location.name;
                  return _.StringHelper.format(t, encodeURIComponent(a), this.props.displayTemperatureUnit)
                }
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_providerName", {
              get: function() {
                return "zh-cn" === this.props.cultureName.toLowerCase() ? "中国天气网" : D.p
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_temperatureRange", {
              get: function() {
                if (this.props.weatherItem.weatherInfo) {
                  var e = this._convertToDisplayTemperature(this.props.weatherItem.weatherInfo.highestTemperature),
                    t = this._convertToDisplayTemperature(this.props.weatherItem.weatherInfo.lowestTemperature);
                  return m.Text.format(D.q, e, t)
                }
                return ""
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_displayedLocation", {
              get: function() {
                return P(this.props.weatherItem.location)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_weatherDetailMessage", {
              get: function() {
                var e = "F" === this.props.displayTemperatureUnit ? D.g : D.b,
                  t = v.LocaleFormat.formatDate(this._currentDate, {
                    date: "medium"
                  });
                if (this.props.weatherItem.weatherInfo && this.props.weatherItem.location.name) {
                  var a = "";
                  this.props.isEdit && (a = this.props.focusDirection === o.FocusZoneDirection.vertical ? D.n : D.i);
                  var n = this._convertToDisplayTemperature(this.props.weatherItem.weatherInfo.temperature),
                    i = this._convertToDisplayTemperature(this.props.weatherItem.weatherInfo.highestTemperature),
                    r = this._convertToDisplayTemperature(this.props.weatherItem.weatherInfo.lowestTemperature);
                  return m.Text.format(D.o, P(this.props.weatherItem.location), this.props.weatherItem.weatherInfo.caption, n, e, i, r, t, this._providerName, a, this.props.isEdit ? D.d : "")
                }
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_currentDate", {
              get: function() {
                var e = new Date;
                if (this.props.timeZone) {
                  var t = new v.SPDate({
                    fullYear: e.getUTCFullYear(),
                    month: e.getUTCMonth(),
                    date: e.getUTCDate(),
                    hours: e.getUTCHours(),
                    minutes: e.getUTCMinutes(),
                    seconds: e.getUTCSeconds(),
                    milliseconds: e.getUTCMilliseconds()
                  }).convertFromUTC(this.props.timeZone);
                  return new Date(t.fullYear, t.month, t.date, t.hours, t.minutes, t.seconds, t.milliseconds)
                }
                return e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_renderActionBar", {
              get: function() {
                return this.props.isEdit && i.createElement(o.FocusZone, {
                  className: "b_a_98d8a262",
                  direction: this.props.focusDirection,
                  isCircularNavigation: !0
                }, i.createElement(o.IconButton, {
                  className: "o_a_98d8a262",
                  title: D.e,
                  ariaLabel: D.e,
                  iconProps: {
                    iconName: "Edit"
                  },
                  "data-automation-id": "weather-card-edit-button",
                  onClick: this.props.onClickEditButton
                }), i.createElement(o.IconButton, {
                  className: "o_a_98d8a262",
                  title: D.j,
                  ariaLabel: D.j,
                  iconProps: {
                    iconName: "Move"
                  },
                  "data-automation-id": "weather-card-move-button"
                }), i.createElement(o.IconButton, {
                  className: "o_a_98d8a262",
                  title: D.c,
                  ariaLabel: D.c,
                  iconProps: {
                    iconName: "Cancel"
                  },
                  "data-automation-id": "weather-card-delete-button",
                  onClick: this._handleClickDeleteButton
                }))
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._convertToDisplayTemperature = function(e) {
              return "F" === this.props.displayTemperatureUnit ? e : Math.round(5 * (e - 32) / 9)
            }, Object(n.__decorate)([o.autobind], t.prototype, "_renderWeatherProvider", null), t
          }(i.PureComponent),
          B = a("YC6R"),
          O = function(e) {
            function t(t) {
              var a = e.call(this, t) || this;
              a._weatherCardPlaceholder = i.createRef(), a._renderWeatherCard = function(e, t) {
                var n = {
                  bingLocationDataProvider: a.props.bingLocationDataProvider,
                  ref: a._weatherCardPlaceholder,
                  width: a._weatherCardWidth,
                  variantTheme: a.props.variantTheme,
                  onSelectLocation: a._handleSelectLocation
                };
                if ("placeholder" !== e.item) {
                  var r = e.item;
                  return i.createElement(W, {
                    isEdit: a.props.isEdit,
                    width: a._weatherCardWidth,
                    weatherItem: r,
                    displayTemperatureUnit: a.props.displayTemperatureUnit,
                    cultureName: a.props.cultureName,
                    dataDragTag: e.dragLeafTag,
                    dataDragHandle: e.dragHandleTag,
                    rootFocusRef: e.rootFocusRef,
                    timeZone: a.props.timeZone,
                    variantTheme: a.props.variantTheme,
                    focusDirection: e.isMultiItemPerRow ? o.FocusZoneDirection.vertical : o.FocusZoneDirection.horizontal,
                    positionInSet: t + 1,
                    setSize: a.state.weatherItemList.length,
                    onDelete: function() {
                      return a._handleDeleteWeatherItem(t)
                    },
                    onSwitchTemperatureUnit: a.props.onSwitchTemperatureUnit,
                    onClickEditButton: function() {
                      return a.props.onClickEditButton(t)
                    },
                    onClick: function() {
                      return a.props.onClickWeatherItem(t)
                    }
                  })
                }
                return i.createElement(b, {
                  deferredProps: n
                })
              }, a._getLayoutMetrics = function(e) {
                return {
                  itemsCountPerRow: E(a.props.width),
                  itemWidth: E(a.props.width),
                  horizontalMargin: k,
                  verticalMargin: S
                }
              }, a._getGridLayoutAriaLabel = function(e, t) {
                var n = a.state.weatherItemList.length,
                  i = t ? B.d : B.e,
                  r = e ? t ? B.f : B.g : "",
                  o = _.StringHelper.getLocalizedCountValue(B.c, B.a, n);
                return _.StringHelper.format(o, n, i, r)
              }, a._handleWeatherCardReorder = function(e, t) {
                e >= a.state.weatherItemList.length || t >= a.state.weatherItemList.length || a.setState(function(a, i) {
                  var r = Object(n.__spreadArrays)(a.weatherItemList),
                    o = r.splice(e, 1)[0];
                  r.splice(t, 0, o);
                  var s = r.map(function(e) {
                    return e.location
                  });
                  i.onReorderWeatherItems(t, s);
                  var m = _.StringHelper.format(B.h, P(o.location), t + 1);
                  return g.ScreenReaderAlert.read(m, g.ReadingMode.ReadImmediately), {
                    weatherItemList: r
                  }
                })
              };
              var r = [];
              return a.props.weatherLocationList.forEach(function(e) {
                r.push({
                  location: e,
                  weatherInfo: void 0
                })
              }), a.state = {
                weatherItemList: r
              }, a
            }
            return Object(n.__extends)(t, e), t.prototype.componentDidMount = function() {
              var e = this;
              this.props.weatherLocationList.map(function(t, a) {
                e.props.weatherDataProvider.getWeatherInfo(t, "F").then(function(n) {
                  e.state.weatherItemList.splice(a, 1, {
                    location: t,
                    weatherInfo: n
                  });
                  var i = e.state.weatherItemList.concat([]);
                  e.setState({
                    weatherItemList: i
                  })
                }).catch(function(e) {
                  p._TraceLogger.logError(p._LogSource.create("WeatherWebPart"), e, "GetWeatherInfo")
                })
              })
            }, t.prototype.componentDidUpdate = function() {
              void 0 !== this._focusIndex && (this._focusIndex < this.state.weatherItemList.length || this._focusIndex === this.state.weatherItemList.length && this._weatherCardPlaceholder && this._weatherCardPlaceholder.current && this._weatherCardPlaceholder.current.focus(), this._focusIndex = void 0)
            }, t.prototype.render = function() {
              return i.createElement(i.Fragment, null, i.createElement(f.WebPartTitle, {
                edit: this.props.isEdit,
                title: this.props.webPartTitle || "",
                placeholder: B.i,
                marginBottomSize: "Large",
                theme: this.props.variantTheme,
                onTitleChange: this.props.onChangeTitle
              }), this._renderGridLayout())
            }, t.prototype._renderGridLayout = function() {
              var e = this.state.weatherItemList.concat(this.props.isEdit ? ["placeholder"] : []);
              return e.length > 0 && i.createElement(y.GridLayout, {
                width: this.props.width,
                items: e,
                onRenderItem: this._renderWeatherCard,
                displayMode: this.props.isEdit ? m.DisplayMode.Edit : m.DisplayMode.Read,
                getLayoutMetrics: this._getLayoutMetrics,
                getAriaLabel: this._getGridLayoutAriaLabel,
                onReorderItem: this._handleWeatherCardReorder,
                theme: this.props.variantTheme,
                "data-automation-id": "weatherWall"
              })
            }, t.prototype._handleSelectLocation = function(e) {
              var t = this;
              this._getWeatherLocation(e).then(function(e) {
                e && (t.setState(function(a, n) {
                  var i = a.weatherItemList.concat({
                      location: e,
                      weatherInfo: void 0
                    }),
                    r = i.map(function(e) {
                      return e.location
                    });
                  return t._focusIndex = r.length, n.onSelectLocation(r), {
                    weatherItemList: i
                  }
                }), t.props.weatherDataProvider.getWeatherInfo(e, "F").then(function(a) {
                  var n = t.state.weatherItemList.length - 1;
                  t.state.weatherItemList.splice(n, 1, {
                    weatherInfo: a,
                    location: e
                  }), t.setState({
                    weatherItemList: t.state.weatherItemList.concat([])
                  })
                }).catch(function(e) {
                  p._TraceLogger.logError(p._LogSource.create("WeatherWebPart"), e, "GetWeatherInfo")
                }))
              }).catch(function(e) {
                p._TraceLogger.logError(p._LogSource.create("WeatherWebPart"), e, "GetLocationInfo")
              })
            }, t.prototype._getWeatherLocation = function(e) {
              var t = e.name || e.address && e.address.text,
                a = e.address && e.address.addressCountry;
              return this.props.bingLocationDataProvider.getLocationInfo(t).then(function(e) {
                return {
                  countryName: a,
                  name: e[0].name,
                  latitude: e[0].coordinates.latitude,
                  longitude: e[0].coordinates.longitude,
                  showCustomizedDisplayName: !1,
                  customizedDisplayName: void 0
                }
              }).catch(function(n) {
                return {
                  countryName: a,
                  name: t,
                  latitude: e.geo.latitude,
                  longitude: e.geo.longitude,
                  showCustomizedDisplayName: !1,
                  customizedDisplayName: void 0
                }
              })
            }, Object.defineProperty(t.prototype, "_weatherCardWidth", {
              get: function() {
                var e = E(this.props.width);
                return 1 === e ? Math.floor(this.props.width) : Math.min(Math.floor((this.props.width - (e - 1) * k) / e), 380)
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._handleDeleteWeatherItem = function(e) {
              var t = this;
              this.setState(function(a, i) {
                var r = Object(n.__spreadArrays)(a.weatherItemList),
                  o = r.splice(e, 1)[0],
                  s = r.map(function(e) {
                    return e.location
                  });
                t._focusIndex = e < a.weatherItemList.length - 1 ? e : Math.max(0, e - 1), i.onClickDeleteButton(e, s);
                var m = P(o.location);
                return g.ScreenReaderAlert.read(_.StringHelper.format(B.b, m), g.ReadingMode.ReadImmediately), {
                  weatherItemList: r
                }
              })
            }, Object(n.__decorate)([o.autobind], t.prototype, "_renderGridLayout", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleSelectLocation", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleDeleteWeatherItem", null), t
          }(i.Component),
          R = "SPWeatherWebPartPersonalUnitPreference",
          q = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._handleThemeChangedEvent = function(e) {
                t._variantTheme = e.theme, t.render()
              }, t._handleChangeCustomizedLocation = function(e, a) {
                t.properties.locations[e].customizedDisplayName = a, t.render()
              }, t
            }
            return Object(n.__extends)(t, e), t.prototype.render = function() {
              var e = this.context.pageContext.user.preferUserTimeZone ? this.context.pageContext.user.timeZoneInfo : this.context.pageContext.web.timeZoneInfo,
                t = i.createElement(O, {
                  timeZone: e,
                  bingLocationDataProvider: this._bingLocationDataProvider,
                  cultureName: this.context.pageContext.cultureInfo.currentUICultureName,
                  displayTemperatureUnit: this._temperatureUnitSetting,
                  isEdit: this.displayMode === m.DisplayMode.Edit,
                  onChangeTitle: this._handleChangeTitle,
                  onSwitchTemperatureUnit: this._handleSwitchUnit,
                  variantTheme: this._variantTheme,
                  onClickEditButton: this._handleClickEditButton,
                  onClickWeatherItem: this._handleClickWeatherItem,
                  onSelectLocation: this._handleSelectWeatherLocation,
                  onClickDeleteButton: this._handleDeleteWeatherItem,
                  onReorderWeatherItems: this._handleReorderWeatherItems,
                  weatherDataProvider: this._weatherDataProvider,
                  weatherLocationList: this.properties.locations || [],
                  webPartTitle: this.properties.webPartTitle,
                  width: this.width
                });
              r.render(t, this.domElement)
            }, t.prototype.onInit = function() {
              return this._weatherDataProvider = new w(this.context.serviceScope), this._bingLocationDataProvider = new d.BingLocationDataProvider({
                serviceScope: this.context.serviceScope,
                qosPrefix: "WeatherWebPart"
              }), this._getSectionBackgroundTheme(), m._SPEventManager.instance.registerEvent("WeatherWebPart_SwitchTemperatureUnit", this, this._switchUnit), e.prototype.onInit.call(this)
            }, t.prototype.loadPropertyPaneResources = function() {
              var e = this;
              return a.e(3).then(a.bind(null, "ZX/J")).then(function(t) {
                e._weatherWebPartPropertyPaneSettings = t.WeatherPropertyPaneSettings.getDefaultWebPartSettings, e._weatherItemEditPropertyPaneSettings = t.WeatherPropertyPaneSettings.getItemEditSettings
              })
            }, t.prototype.getPropertyPaneConfiguration = function() {
              var t = e.prototype.getPropertyPaneConfiguration.call(this);
              try {
                t = this.context.propertyPane.isRenderedByWebPart() && void 0 !== this._activeItemIndex ? this._weatherItemEditPropertyPaneSettings(this._activeItemIndex, this.properties.locations[this._activeItemIndex], this._handleChangeCustomizedLocation) : this._weatherWebPartPropertyPaneSettings(this.properties.temperatureUnit)
              } catch (e) {
                p._TraceLogger.logError(p._LogSource.create("WeatherWebPart"), e, "getPropertyPaneConfiguration")
              }
              return t
            }, t.prototype.onAfterResize = function(e) {
              this.render()
            }, t.prototype.onDispose = function() {
              m._SPEventManager.instance.unregisterEvent("WeatherWebPart_SwitchTemperatureUnit", this, this._switchUnit), this.context.serviceScope.consume(s.ThemeProvider.serviceKey).themeChangedEvent.remove(this, this._handleThemeChangedEvent), r.unmountComponentAtNode(this.domElement), e.prototype.onDispose.call(this)
            }, Object.defineProperty(t.prototype, "dataVersion", {
              get: function() {
                return m.Version.parse("1.2")
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.onBeforeSerialize = function() {
              delete this.properties.location
            }, t.prototype.onAfterDeserialize = function(e, t) {
              return t && !t.lessThan(m.Version.parse("1.1")) || (e.locations = e.location ? [e.location] : []), t && !t.lessThan(m.Version.parse("1.2")) || (e.locations = e.locations.map(function(e) {
                return {
                  name: e.name,
                  latitude: e.latitude,
                  longitude: e.longitude,
                  showCustomizedDisplayName: !1,
                  customizedDisplayName: void 0
                }
              })), e
            }, t.prototype.onPropertyPaneConfigurationComplete = function() {
              e.prototype.onPropertyPaneConfigurationComplete.call(this), h._EngagementLogger.logEventWithLogEntry(new p._LogEntry("WeatherWebPart", "Properties", p._LogType.Event, {
                displayTemperatureUnit: this.properties.temperatureUnit
              }))
            }, t.prototype.onDisplayModeChanged = function(t) {
              if (e.prototype.onDisplayModeChanged.call(this, t), t === m.DisplayMode.Edit) {
                var a = this.properties.locations.filter(function(e) {
                  return e.showCustomizedDisplayName
                }).length;
                h._EngagementLogger.logEventWithLogEntry(new p._LogEntry("WeatherWebPart", "Count", p._LogType.Event, {
                  isWebPartTitleSpecified: this.properties.webPartTitle ? "true" : "false",
                  weatherCardsCount: String(this.properties.locations.length),
                  customizeDisplayLocationCount: String(a)
                }))
              }
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  webPartTitle: {
                    isSearchablePlainText: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._handleClickEditButton = function(e) {
              this._activeItemIndex = e, this.context.propertyPane.open()
            }, t.prototype._handleClickWeatherItem = function(e) {
              this.displayMode === m.DisplayMode.Edit && this.context.propertyPane.isRenderedByWebPart() && (this._activeItemIndex = e, this.context.propertyPane.refresh())
            }, t.prototype._handleSelectWeatherLocation = function(e) {
              this.properties.locations = e, this._activeItemIndex = this.properties.locations.length - 1, this._refreshPropertyPane(), h._EngagementLogger.logEvent("WeatherWebPart.AddWeatherCard")
            }, t.prototype._handleDeleteWeatherItem = function(e, t) {
              this._activeItemIndex === e ? (e === this.properties.locations.length - 1 && (this._activeItemIndex = e > 0 ? e - 1 : void 0), this._refreshPropertyPane()) : this._activeItemIndex && this._activeItemIndex > e && (this._activeItemIndex -= 1), this.properties.locations = t, h._EngagementLogger.logEvent("WeatherWebPart.DeleteWeatherCard")
            }, t.prototype._handleReorderWeatherItems = function(e, t) {
              this.properties.locations = t, this._activeItemIndex = e, this._refreshPropertyPane(), h._EngagementLogger.logEvent("WeatherWebPart.ReorderWeatherCard")
            }, t.prototype._refreshPropertyPane = function() {
              this.context.propertyPane.isPropertyPaneOpen() && this.context.propertyPane.isRenderedByWebPart() && this.context.propertyPane.refresh()
            }, t.prototype._handleChangeTitle = function(e) {
              this.properties.webPartTitle = e, this.isDisposed || this.render()
            }, t.prototype._handleSwitchUnit = function(e) {
              m._SPEventManager.instance.raiseEvent("WeatherWebPart_SwitchTemperatureUnit", {
                unit: e
              })
            }, t.prototype._switchUnit = function(e) {
              if (this.displayMode === m.DisplayMode.Read) {
                if (window.localStorage.getItem(R) !== e.unit) {
                  window.localStorage.setItem(R, e.unit);
                  var t = "C" === e.unit ? "Celsius" : "Fahrenheit";
                  h._EngagementLogger.logEvent("WeatherWebPart.ViewUnit", t)
                }
                this.render()
              }
            }, Object.defineProperty(t.prototype, "_temperatureUnitSetting", {
              get: function() {
                var e = window.localStorage.getItem(R);
                return this.displayMode === m.DisplayMode.Read && e || this.properties.temperatureUnit
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._getSectionBackgroundTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(s.ThemeProvider.serviceKey);
                e._variantTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, e._handleThemeChangedEvent)
              })
            }, Object(n.__decorate)([o.autobind], t.prototype, "_handleClickEditButton", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleClickWeatherItem", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleSelectWeatherLocation", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleDeleteWeatherItem", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleReorderWeatherItems", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleChangeTitle", null), Object(n.__decorate)([o.autobind], t.prototype, "_handleSwitchUnit", null), Object(n.__decorate)([o.autobind], t.prototype, "_switchUnit", null), t
          }(c.BaseClientSideWebPart);
        t.default = q
      },
      QZHX: function(e, t) {
        e.exports = o
      },
      SWVy: function(e, t, a) {
        var n = a("ywjH"),
          i = a("jOlS");
        "string" == typeof n && (n = [
          [e.i, n]
        ]);
        for (var r = 0; r < n.length; r++) i.loadStyles(n[r][1], !0);
        n.locals && (e.exports = n.locals)
      },
      U4ag: function(e, t) {
        e.exports = s
      },
      UWqr: function(e, t) {
        e.exports = m
      },
      "X+PM": function(e, t) {
        e.exports = p
      },
      YC6R: function(e) {
        e.exports = JSON.parse('{"i":"Add a title","c":"||Weather locations. There is {0} location in the list. {1}.||Weather locations. There are {0} locations in the list. {1}. {2}","a":"0||1||2-","d":"Use left and right arrow keys to select weather locations. ","e":"Use up and down arrow keys to select weather locations. ","f":"Use CTRL + left arrow or CTRL + right arrow to change the order of weather locations.","g":"Use CTRL + up arrow or CTRL + down arrow to change the order of weather locations.","b":"The weather information for {0} has been removed.","h":"Weather information for {0} is now in position {1}."}')
      },
      Ycni: function(e, t) {
        e.exports = c
      },
      br4S: function(e, t) {
        e.exports = d
      },
      cDcd: function(e, t) {
        e.exports = h
      },
      faye: function(e, t) {
        e.exports = l
      },
      "hiL/": function(e, t) {
        e.exports = u
      },
      jOlS: function(e, t) {
        e.exports = _
      },
      q1Tm: function(e, t, a) {
        "use strict";
        e.exports = function(e) {
          var t = [];
          return t.toString = function() {
            return this.map(function(t) {
              var a = function(e, t) {
                var a, n, i, r = e[1] || "",
                  o = e[3];
                if (!o) return r;
                if (t && "function" == typeof btoa) {
                  var s = (a = o, n = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), i = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(n), "/*# ".concat(i, " */")),
                    m = o.sources.map(function(e) {
                      return "/*# sourceURL=".concat(o.sourceRoot).concat(e, " */")
                    });
                  return [r].concat(m).concat([s]).join("\n")
                }
                return [r].join("\n")
              }(t, e);
              return t[2] ? "@media ".concat(t[2], "{").concat(a, "}") : a
            }).join("")
          }, t.i = function(e, a) {
            "string" == typeof e && (e = [
              [null, e, ""]
            ]);
            for (var n = {}, i = 0; i < this.length; i++) {
              var r = this[i][0];
              null != r && (n[r] = !0)
            }
            for (var o = 0; o < e.length; o++) {
              var s = e[o];
              null != s[0] && n[s[0]] || (a && !s[2] ? s[2] = a : a && (s[2] = "(".concat(s[2], ") and (").concat(a, ")")), t.push(s))
            }
          }, t
        }
      },
      qdau: function(e) {
        e.exports = JSON.parse('{"p":"MSN Weather","a":"°C","f":"°F","b":"Celsius","g":"Fahrenheit","o":"Weather for {0}, {1} on {6}. {2} {3}. High Temperature {4} {3}. Low temperature {5} {3}. Provided by {7}. {8} {9}","q":"{0}°/{1}°","e":"Edit details","j":"Move","c":"Remove this location","k":"The Weather web part is powered by MSN Weather. Press enter to open a new window to the MSN Weather site.​","h":"{0}/{1}/{2}","l":"Switch my view between Fahrenheit and Celsius","m":"Press enter to switch between Fahrenheit and Celsius, changing the unit applies to your view of all weather web parts on this page. It does not affect how units are shown for other page viewers.","i":"Use left and right arrow keys to move between the buttons for Edit, Reorder and Remove.","n":"Use up and down arrow keys to move between the buttons for Edit, Reorder and Remove.","d":"Press the Delete key to remove this weather location."}')
      },
      qjmy: function(e, t) {
        e.exports = g
      },
      ut3N: function(e, t) {
        e.exports = w
      },
      vlQI: function(e, t) {
        e.exports = y
      },
      y88i: function(e, t) {
        e.exports = f
      },
      ywjH: function(e, t, a) {
        (e.exports = a("q1Tm")(!1)).push([e.i, ".a_a_98d8a262{padding:16px;line-height:1.5;box-sizing:border-box;height:84px;outline:0}.a_a_98d8a262,.a_a_98d8a262:active .b_a_98d8a262,.a_a_98d8a262:focus .b_a_98d8a262,.a_a_98d8a262:hover .b_a_98d8a262,.a_a_98d8a262[data-is-focused-in=true] .b_a_98d8a262{display:-ms-flexbox;display:flex}.c_a_98d8a262{width:calc(100% - 72px);-ms-flex-positive:1;flex-grow:1}.e_a_98d8a262{font-size:14px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-top:-6px}.f_a_98d8a262{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin:7px 0 -16px}.g_a_98d8a262{margin:-3px 8px 0 0;min-width:32px}.h_a_98d8a262{font-weight:400;font-size:32px;margin-top:-9px}.i_a_98d8a262{font-size:12px;font-weight:400;font-weight:600;white-space:nowrap}[dir=ltr] .i_a_98d8a262{margin-left:4px}[dir=rtl] .i_a_98d8a262{margin-right:4px}.j_a_98d8a262{margin-bottom:20px}.k_a_98d8a262{font-size:12px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}[dir=ltr] .k_a_98d8a262{margin-left:24px}[dir=rtl] .k_a_98d8a262{margin-right:24px}[dir=ltr] .k_a_98d8a262 .l_a_98d8a262{margin-right:16px}[dir=rtl] .k_a_98d8a262 .l_a_98d8a262{margin-left:16px}.m_a_98d8a262{font-weight:600}.m_a_98d8a262,.n_a_98d8a262{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.n_a_98d8a262{margin-top:-4px}.b_a_98d8a262{display:none;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;margin:-16px 0;width:32px}[dir=ltr] .b_a_98d8a262{margin-right:-16px}[dir=rtl] .b_a_98d8a262{margin-left:-16px}.b_a_98d8a262 .o_a_98d8a262{height:28px}.p_a_98d8a262{display:-ms-flexbox;display:flex;margin-top:6px}", ""])
      }
    })
  });