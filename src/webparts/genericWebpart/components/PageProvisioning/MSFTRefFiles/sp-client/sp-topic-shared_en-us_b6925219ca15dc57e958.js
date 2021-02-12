/**
 * This is the MSFT Call to Action webpart:
 * https://spoprod-a.akamaihd.net/files/sp-client/TBD.js
 * 
 * Look in this folder in Sources under Page
 * >>  modern.akamai.odsp.cdn.office.net    >> files    >> sp-client    >> TBD.js
 * 
 * this.properties:
 * "": {
 * "": {
 * "": {
 * "": {
 * 
 * 
 * 
 * 
 */

define("49d290fb-a38e-4001-97d3-a2db486db2fa_0.1.0", ["tslib", "@ms/sp-telemetry", "@microsoft/sp-loader", "@microsoft/office-ui-fabric-react-bundle", "@microsoft/sp-lodash-subset", "@microsoft/sp-core-library", "@microsoft/sp-page-context", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities", "@microsoft/load-themed-styles", "@microsoft/sp-diagnostics", "@microsoft/sp-http", "@ms/odsp-utilities-bundle"], function(e, t, n, i, r, o, a, c, s, u, d, l, p, f, _) {
    return function(e) {
      function t(t) {
        for (var n, r, o = t[0], a = t[1], c = 0, s = []; c < o.length; c++) r = o[c], Object.prototype.hasOwnProperty.call(i, r) && i[r] && s.push(i[r][0]), i[r] = 0;
        for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
        for (u && u(t); s.length;) s.shift()()
      }
      var n = {},
        i = {
          2: 0
        };
  
      function r(t) {
        if (n[t]) return n[t].exports;
        var i = n[t] = {
          i: t,
          l: !1,
          exports: {}
        };
        return e[t].call(i.exports, i, i.exports, r), i.l = !0, i.exports
      }
      r.e = function(t) {
        for (var n = [], a = function(e) {
            var t = {
                i: "17ce0976-e69a-4355-be84-89b69a74717d",
                v: "0.1.0",
                m: "fglE"
              },
              n = {
                i: "2e09fb9b-13bb-48f2-859f-97d6fff71176",
                v: "1.1.13",
                m: "K9kD"
              };
            return {
              4: [{
                i: "c79b9f88-6338-40fb-b463-3aad22a88b15",
                v: "0.1.0",
                m: "9poL"
              }],
              7: [t],
              3: [{
                i: "764afdc3-183e-47f5-8d20-a62aff2b0881",
                v: "0.1.0",
                m: "mMzb"
              }, {
                i: "c83d5509-ccd5-4c67-919f-2440f237927a",
                v: "0.2.231",
                m: "Ycni"
              }, n],
              1: [n],
              0: [n, t]
            } [e] || []
          }(t), c = 0; c < a.length; c++) e[a[c].m] || function(t) {
          n.push(o.SPComponentLoader.loadComponentById(t.i, t.v).then(function(n) {
            e[t.m] = function(e) {
              e.exports = n
            }
          }))
        }(a[c]);
        var s = i[t];
        if (0 !== s)
          if (s) n.push(s[2]);
          else {
            var u = new Promise(function(e, n) {
              s = i[t] = [e, n]
            });
            n.push(s[2] = u);
            var d, l = document.createElement("script");
            l.charset = "utf-8", l.timeout = 120, r.nc && l.setAttribute("nonce", r.nc), l.src = function(e) {
              return r.p + "chunk." + ({
                0: "data-sync-nucleus",
                1: "shared-react-splivepersonacard",
                3: "sp-topic-shared-topic-card",
                4: "topic-shared-create-new-topic-dialog",
                5: "topic-shared-topic-association-callout",
                6: "vendors~shared-react-splivepersonacard",
                7: "vendors~sp-topic-shared-topic-card"
              } [e] || e) + "_" + (["en-us", "none"])[{
                "0": 1,
                "1": 1,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 1,
                "7": 1,
                "8": 1,
                "9": 1
              } [e]] + "_" + {
                0: "4f4e56f5303e765187fe",
                1: "e785e252069aac973293",
                3: "383af58d90badf03a69d",
                4: "ca084a486deac08aab3e",
                5: "377ef8a4ba0846e91f80",
                6: "584c4ba5907501e647ed",
                7: "6f7b805fa95c23d91326",
                8: "60872a3eba2f29aedbd8",
                9: "8841a19c74f6d356200a"
              } [e] + ".js"
            }(t);
            var p = new Error;
            d = function(e) {
              l.onerror = l.onload = null, clearTimeout(f);
              var n = i[t];
              if (0 !== n) {
                if (n) {
                  var r = e && ("load" === e.type ? "missing" : e.type),
                    o = e && e.target && e.target.src;
                  p.message = "Loading chunk " + t + " failed.\n(" + r + ": " + o + ")", p.name = "ChunkLoadError", p.type = r, p.request = o, n[1](p)
                }
                i[t] = void 0
              }
            };
            var f = setTimeout(function() {
              d({
                type: "timeout",
                target: l
              })
            }, 12e4);
            l.onerror = l.onload = d, document.head.appendChild(l)
          } return Promise.all(n)
      }, r.m = e, r.c = n, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: n
        })
      }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        })
      }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var i in e) r.d(n, i, function(t) {
            return e[t]
          }.bind(null, i));
        return n
      }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e.default
        } : function() {
          return e
        };
        return r.d(t, "a", t), t
      }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, r.p = "";
      var o = r("I6O9");
      r.oe = function(e) {
        throw console.error(e), e
      };
      var a = window.webpackJsonp_49d290fb_a38e_4001_97d3_a2db486db2fa_0_1_0 = window.webpackJsonp_49d290fb_a38e_4001_97d3_a2db486db2fa_0_1_0 || [],
        c = a.push.bind(a);
      a.push = t, a = a.slice();
      for (var s = 0; s < a.length; s++) t(a[s]);
      var u = c;
      return function() {
        var e, t = document.getElementsByTagName("script"),
          n = "undefined" != typeof spScriptNamePattern ? spScriptNamePattern : /sp-topic-shared_en-us_b6925219ca15dc57e958\.js/i;
        if (t && t.length)
          for (var i = 0; i < t.length; i++)
            if (t[i]) {
              var o = t[i].getAttribute("src");
              if (o && o.match(n)) {
                e = o.substring(0, o.lastIndexOf("/") + 1);
                break
              }
            } if (!e)
          for (var a in window.__setWebpackPublicPathLoaderSrcRegistry__)
            if (a && a.match(n)) {
              e = a.substring(0, a.lastIndexOf("/") + 1);
              break
            } r.p = e
      }(), r(r.s = "mwqp")
    }({
      "+ORw": function(e, t, n) {
        "use strict";
        n.d(t, "r", function() {
          return a
        }), n.d(t, "q", function() {
          return c
        }), n.d(t, "o", function() {
          return s
        }), n.d(t, "B", function() {
          return u
        }), n.d(t, "p", function() {
          return d
        }), n.d(t, "u", function() {
          return l
        }), n.d(t, "l", function() {
          return p
        }), n.d(t, "i", function() {
          return f
        }), n.d(t, "s", function() {
          return _
        }), n.d(t, "n", function() {
          return h
        }), n.d(t, "b", function() {
          return g
        }), n.d(t, "g", function() {
          return b
        }), n.d(t, "h", function() {
          return v
        }), n.d(t, "a", function() {
          return m
        }), n.d(t, "v", function() {
          return y
        }), n.d(t, "t", function() {
          return S
        }), n.d(t, "x", function() {
          return P
        }), n.d(t, "C", function() {
          return I
        }), n.d(t, "z", function() {
          return T
        }), n.d(t, "k", function() {
          return w
        }), n.d(t, "A", function() {
          return C
        }), n.d(t, "j", function() {
          return E
        }), n.d(t, "w", function() {
          return O
        }), n.d(t, "e", function() {
          return x
        }), n.d(t, "c", function() {
          return D
        }), n.d(t, "m", function() {
          return A
        }), n.d(t, "y", function() {
          return R
        }), n.d(t, "f", function() {
          return N
        });
        var i = n("hiL/"),
          r = n("UWqr"),
          o = function() {
            function e() {}
            return e.mediaWikiDemo = new i.KillSwitch("cb9b7f5e-38e9-4530-9cce-d94adf544027"), e.useV2AnnotationsEndpoint = new i.KillSwitch("445356d1-5ffc-436b-8631-fdaca5a2258e"), e.logRequestId = new i.KillSwitch("f5a57d72-149f-4b8d-abed-9cf22f2a3dc3"), e.previewPage404Fix = new i.KillSwitch("36c2c71f-dc0d-4d7c-873a-ab3f09722570"), e.revertTopicCenterPerfChanges = new i.KillSwitch("e0490783-6ac9-4d84-a95a-8a1e4c59e2df"), e.removeLogTokenFetchTime = new i.KillSwitch("0e4428bc-190b-4f77-9ed8-93de78c314db"), e
          }();
  
        function a() {
          return r._SPKillSwitch.isActivated("beeb1fb1-d5d4-44f9-a3b3-0eba16748727")
        }
  
        function c() {
          return r._SPKillSwitch.isActivated("beeb1fb1-d5d4-44f9-a3b3-0eba16748727")
        }
  
        function s() {
          return r._SPKillSwitch.isActivated("03c915c2-fd9d-4d69-a7cd-813c63f83884")
        }
  
        function u() {
          return r._SPKillSwitch.isActivated("040e5812-ee72-430b-93d9-42b62ff8ce13")
        }
  
        function d() {
          return r._SPKillSwitch.isActivated("225addd8-1fbc-4c95-b273-c100a116e2ae")
        }
  
        function l() {
          return r._SPKillSwitch.isActivated("92e61a3c-31b1-4447-acae-510ebde23970")
        }
  
        function p() {
          return r._SPKillSwitch.isActivated("788a8b16-7367-4039-964e-a30277bf08fc")
        }
  
        function f() {
          return r._SPKillSwitch.isActivated("f0c06645-7607-4a62-9f65-83580caad556")
        }
  
        function _() {
          return r._SPKillSwitch.isActivated("0033fbed-12fc-41bd-913e-3ea722a4aae6")
        }
  
        function h() {
          return r._SPKillSwitch.isActivated("30d56fc6-8865-48dd-86b5-a4471f67ebb2")
        }
  
        function g() {
          return r._SPKillSwitch.isActivated("7838eb23-a337-43f4-aa22-0c1d2537f237")
        }
  
        function b() {
          return r._SPKillSwitch.isActivated("9339dc59-4ce3-457c-beda-b1768cb77ad5")
        }
  
        function v() {
          return r._SPKillSwitch.isActivated("9ad305a5-4be4-4a26-9c28-e5642782d858")
        }
  
        function m() {
          return r._SPKillSwitch.isActivated("0d7ff0fc-d4b6-469b-a44c-4c1e83b67a77")
        }
  
        function y() {
          return r._SPKillSwitch.isActivated("9243c796-7671-4ca8-9aab-3c6252d8379b")
        }
  
        function S() {
          return r._SPKillSwitch.isActivated("523a6a99-6000-422e-82ed-134cddcf3f90")
        }
  
        function P() {
          return r._SPKillSwitch.isActivated("ddca4f7b-d48e-4bac-8cbf-cabda40095c8")
        }
  
        function I() {
          return r._SPKillSwitch.isActivated("a1e54e1e-1575-4359-a89f-d0b771504f3a")
        }
  
        function T() {
          return r._SPKillSwitch.isActivated("dd6d1b34-5024-42e4-95f7-03ab66f62e46")
        }
  
        function w() {
          return r._SPKillSwitch.isActivated("365aa2ba-5999-4896-a0a1-d59a2277afa8")
        }
  
        function C() {
          return r._SPKillSwitch.isActivated("55f4a40b-b625-4cbb-947d-b83ae919e254")
        }
  
        function E() {
          return r._SPKillSwitch.isActivated("f47e805d-5165-4a19-b358-ead298ab69e6")
        }
  
        function O() {
          return r._SPKillSwitch.isActivated("1f494f8a-f9db-4d81-b89b-a9a9bd08bada")
        }
  
        function x() {
          return r._SPKillSwitch.isActivated("fff00d58-21a8-459b-a4d7-c774e11bd3d0")
        }
  
        function D() {
          return r._SPKillSwitch.isActivated("b3188a26-535a-4bba-9d28-9efae76dcdad")
        }
  
        function A() {
          return r._SPKillSwitch.isActivated("e517fa26-3ff9-4d03-8787-96b5d816bd7c")
        }
  
        function R() {
          return r._SPKillSwitch.isActivated("b74c9e15-5c2b-431a-9fd3-abf5bb35f929")
        }
  
        function N() {
          return r._SPKillSwitch.isActivated("15414d36-2271-47b3-8dba-7af9b4688ba8")
        }
        t.d = o
      },
      "05y5": function(e, t, n) {
        "use strict";
        var i = n("Tpx+"),
          r = n("ut3N"),
          o = n("UWqr"),
          a = n("Pk8u"),
          c = n("hiL/"),
          s = n("WGsJ"),
          u = function() {
            function e() {}
            return e.parseClientCachableResponse = function(e, t, n, i, a, u, d) {
              var l = this;
              if (o.Validate.isNotNullOrUndefined(e, "response"), o.Validate.isNotNullOrUndefined(t, "isRawData"), o.Validate.isNotNullOrUndefined(n, "isCachedDataEmpty"), o.Validate.isNotNullOrUndefined(i, "processRawData"), o.Validate.isNotNullOrUndefined(a, "qosMonitor"), o.Validate.isNonemptyString(u, "qosTagPrefix"), !e.cachedResponse && !e.serverResponse) {
                var p = new Error("ParseClientCachableResponse_EmptyResponse");
                throw a.writeUnexpectedFailure(p.message), p
              }
              var f, _ = d && this._isIdInvalidForCacheUsage(d);
              if ((!e.cachedResponse || _) && e.serverResponse) return e.serverResponse.then(function(e) {
                return _ && l._clearIdFromInvalidCacheUsage(d), l._processHttpResponse(e, a)
              });
              var h = new r._QosMonitor(u + ".IndexedDB.CacheOnly.DP"),
                g = s.a.processResponseRawData(e.cachedResponse, t, i.bind(this)).then(function(e) {
                  return f = JSON.stringify(e), h.writeSuccess(), n(e) ? Promise.reject("Indexed DB cached data is empty") : e
                });
              if (!e.serverResponse) return g;
              var b = !1,
                v = e.serverResponse.then(function(e) {
                  if (b = !0, f) try {
                    l._logCacheRefreshedQos(f, e, i.bind(l), u)
                  } catch (e) {}
                  return l._processHttpResponse(e, a)
                }),
                m = o.Guid.parse("fdbcc3e7-1aa1-4bc5-809c-fd4b4cf3ce56"),
                y = o.Guid.parse("ae67b80b-7315-447c-94bc-8d51c712bfb8"),
                S = [{
                  raceablePromise: g,
                  raceId: m
                }, {
                  raceablePromise: v,
                  raceId: y
                }];
              return c.SmartRace.race(S).then(function(e) {
                return e.raceId !== m || b || v.then(function(e) {
                  return e
                }).catch(function(e) {
                  throw e
                }), b ? v : g
              })
            }, e.getUniquePageId = function(e, t, n) {
              var i, r, o;
              return (null === (i = e) || void 0 === i ? void 0 : i.toString().length) && (null === (r = t) || void 0 === r ? void 0 : r.toString().length) && (null === (o = n) || void 0 === o ? void 0 : o.toString().length) ? {
                siteId: e.toString(),
                webId: t.toString(),
                uniqueId: n.toString()
              } : void 0
            }, e.setInvalidForCacheUsage = function(e) {
              var t;
              o.Validate.isNotNullOrUndefined(e.uniqueId, "uniquePageId.uniqueId"), o.Validate.isNotNullOrUndefined(e.siteId, "uniquePageId.siteId"), o.Validate.isNotNullOrUndefined(e.webId, "uniquePageId.webId");
              var n = null != (t = this._getInvalidIdsFromStorage()) ? t : [];
              this._getIndexOf(e, n) === this._indexNotPresent && (n.push(e), sessionStorage.setItem("CortexInvalidIDBPages", JSON.stringify(n)))
            }, e._clearIdFromInvalidCacheUsage = function(e) {
              var t = this._getInvalidIdsFromStorage();
              if (t) {
                var n = this._getIndexOf(e, t);
                n !== this._indexNotPresent && (1 === t.length ? sessionStorage.removeItem("CortexInvalidIDBPages") : (t.splice(n, 1), sessionStorage.setItem("CortexInvalidIDBPages", JSON.stringify(t))))
              }
            }, e._isIdInvalidForCacheUsage = function(e) {
              var t = this._getInvalidIdsFromStorage();
              return !!t && this._getIndexOf(e, t) !== this._indexNotPresent
            }, e._getIndexOf = function(e, t) {
              return Object(a.findIndex)(t, function(t) {
                return t.uniqueId === e.uniqueId && t.siteId === e.siteId && t.webId === e.webId
              })
            }, e._getInvalidIdsFromStorage = function() {
              var e, t;
              if (null !== (e = sessionStorage) && void 0 !== e && e.getItem) {
                var n = null != (t = sessionStorage.getItem("CortexInvalidIDBPages")) ? t : "";
                return n ? JSON.parse(n) : void 0
              }
            }, e._logCacheRefreshedQos = function(e, t, n, i) {
              var o = this;
              t.clone && 200 === t.status && t.clone().json().then(function(t) {
                var a, c = n(t);
                a = o._compareResponseData(e, JSON.stringify(c)) ? "RefreshedNoChanges.DP" : "Refreshed.DP", new r._QosMonitor(i + ".IndexedDB." + a).writeSuccess()
              }).catch(function(e) {
                return Promise.reject(e)
              })
            }, e._compareResponseData = function(e, t) {
              var n;
              return !!(null === (n = e) || void 0 === n ? void 0 : n.length) && e === t
            }, e._getExtraData = function(e) {
              return {
                mscv: e.headers.get("ms-cv"),
                requestId: e.headers.get("request-id"),
                status: e.status
              }
            }, e._processAPIError = function(e, t) {
              var n = this._getExtraData(e),
                i = null === n.mscv ? "Substrate Cortex API server failure: $tag::" + e.status + "::" + e.statusText : "Microservice API server failure: $tag::" + e.status + "::" + e.statusText,
                r = new Error(i);
              return 403 === e.status ? void t.writeExpectedFailure("APIFailure", r, n) : (t.writeUnexpectedFailure("APIFailure", r, n), r)
            }, e._processHttpResponse = function(e, t) {
              if (Object(i.c)(e), e.ok) return t.writeSuccess(this._getExtraData(e)), e.json();
              var n = this._processAPIError(e, t);
              return n ? Promise.reject(n) : Promise.resolve(void 0)
            }, e.onlyIndexedDB = s.a.onlyIndexedDB, e._indexNotPresent = -1, e
          }();
        t.a = u
      },
      "17wl": function(t, n) {
        t.exports = e
      },
      "1jTL": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return o
        }), n.d(t, "b", function() {
          return a
        });
        var i = n("hiL/"),
          r = n("+ORw");
  
        function o(e) {
          return a(e) ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/MediaWiki_logo_1.png/120px-MediaWiki_logo_1.png" : i.Icons.getIconUrl(e.split(".").pop() || "")
        }
  
        function a(e) {
          return !r.d.mediaWikiDemo.isActivated() && "contososearchwiki.westus.cloudapp.azure.com" === new URL(e).host
        }
      },
      "2q6Q": function(e, n) {
        e.exports = t
      },
      "53ge": function(e, t, n) {
        "use strict";
        var i = n("ut3N"),
          r = n("UWqr"),
          o = n("X+PM"),
          a = n("vlQI"),
          c = n("Tpx+"),
          s = n("+ORw"),
          u = n("oUEy"),
          d = function() {
            function e(e, t) {
              var n = this;
              r.Environment.type !== r.EnvironmentType.Local && (this._pageContext = t, e.whenFinished(function() {
                n._tokenProvider = e.consume(a.OAuthTokenProvider.serviceKey)
              }))
            }
            return e.prototype.getOAuthToken = function(e) {
              var t = new i._QosMonitor(u.c + ".STITokenFetch.getOAuthToken");
              return this._tokenProvider.getOAuthToken(e, this._pageContext.web.serverRelativeUrl, "STI").then(function(e) {
                return t.writeSuccess(), e.token
              }).catch(function(e) {
                return t.writeUnexpectedFailure("FailedToGetOAuthToken", e), Promise.reject(e)
              })
            }, e
          }(),
          l = n("NDxI"),
          p = function() {
            function e(e, t) {
              var n = this;
              void 0 === t && (t = !0), this._serviceScope = e, this._willSetCortexDisabledFlag = t, this._extraData = {}, e.whenFinished(function() {
                n._pageContext = e.consume(o.PageContext.serviceKey), n._useSTIToken && (n._tokenDataProvider = new d(n._serviceScope, n._pageContext))
              }), this._isIndexedDBEnabled = Object(c.b)()
            }
            return Object.defineProperty(e.prototype, "_substrateEndpoint", {
              get: function() {
                return -1 !== location.origin.toLowerCase().indexOf("microsoft.sharepoint-df.com") ? "https://substrate-sdf.office.com/" + this.apiEndpoint + "/" + this.apiName + this.apiParams : "https://substrate.office.com/DWEngineV2/api/v1.0/KnowledgeManagement//" + this.apiName + this.apiParams
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "pageContext", {
              get: function() {
                return this._pageContext
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "apiEndpoint", {
              get: function() {
                return "DWEngineV2/api/v1.0/KnowledgeManagement/"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "isPost", {
              get: function() {
                return !1
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "apiName", {
              get: function() {
                return "Topics"
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype.getCustomRequestOptions = function(e) {}, Object.defineProperty(e.prototype, "qosTag", {
              get: function() {
                throw new Error("Needs to be overridden by the derived class")
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype.getRequest = function(e, t) {
              var n = this;
              void 0 === e && (e = "");
              var r, o, a = u.c + ".AADTokenFetch",
                d = u.c + "." + this.qosTag + ".API." + u.b,
                p = u.c + "." + this.qosTag + "." + u.b,
                f = new i._QosMonitor(a),
                _ = new i._QosMonitor(p);
              i._EngagementLogger.logEvent(p);
              var h = (new Date).getTime(),
                g = 0,
                b = function() {
                  o = !0, g = (new Date).getTime(), f.writeSuccess(), r = new i._QosMonitor(d)
                };
              return this._isIndexedDBEnabled && t && this._useSTIToken ? this._makeClientCachableRequest(e, b, t) : this._makeRequest(e, b).then(function(e) {
                (Object(s.v)() || n._willSetCortexDisabledFlag) && Object(c.c)(e);
                var t = (new Date).getTime();
                if (!s.d.logRequestId.isActivated() && e.headers && (n._requestId = e.headers.get("request-id"), n._requestId && (n._extraData.requestId = n._requestId), !s.d.revertTopicCenterPerfChanges.isActivated())) {
                  var i = e.status;
                  i && (n._extraData.status = i), n._extraData.duration = t - h + " ms";
                  var o = t - g;
                  n._extraData.e2eLatency = g ? o : "";
                  var a = e._tokenFetchRequestTime;
                  !s.d.removeLogTokenFetchTime.isActivated() && a && (n._extraData.tokenFetchDuration = a, g && (n._extraData.apiLatency = o - a)), n._extraData.clientRequestId = n._requestId
                }
                if (!e.ok) return d = new l.a("Substrate Cortex API server failure: $tag::" + e.status + "::" + e.statusText, e.status, e.statusText), Object(s.i)() ? (403 === e.status ? r.writeExpectedFailure("APIFailure", d, n._extraData) : r.writeUnexpectedFailure("APIFailure", d, n._extraData), _.writeUnexpectedFailure("APIFailure", d, n._extraData)) : 403 === e.status ? (r.writeExpectedFailure("APIFailure", d, n._extraData), _.writeExpectedFailure("APIFailure", d, n._extraData)) : (r.writeUnexpectedFailure("APIFailure", d, n._extraData), _.writeUnexpectedFailure("APIFailure", d, n._extraData)), Promise.reject(d);
                var u = void 0;
                try {
                  return u = e.json(), r.writeSuccess(n._extraData), _.writeSuccess(n._extraData), u
                } catch (t) {
                  var d = new l.a("Substrate Cortex API deserialization failure: $tag::[RequestId: " + n._requestId + ", Name:" + t.name + ", message:" + t.message + ", stack:" + t.stack, e.status, e.statusText);
                  return _.writeUnexpectedFailure("DeserializationError", d, n._extraData), r.writeUnexpectedFailure("DeserializationError", d, n._extraData), Promise.reject(d)
                }
              }).catch(function(e) {
                var t;
                return o ? window.navigator.onLine ? (t = e, (Object(s.c)() || void 0 === t.status) && (t = new Error("Substrate Cortex API failure: $tag::[RequestId: " + n._requestId + ", Name:" + e.name + ", message:" + e.name + ", stack:" + e.stack)), r && r.writeUnexpectedFailure("Exception", t), (Object(s.c)() || _) && _.writeUnexpectedFailure("Exception", t)) : (t = new Error("Substrate Cortex API failure Offline: $tag::[RequestId: " + n._requestId + ", Name:" + e.name + ", message:" + e.message + ", stack:" + e.stack), r && r.writeExpectedFailure("Offline", t), _.writeExpectedFailure("Offline", t)) : (t = new Error("Substrate Cortex token failure: $tag::[RequestId: " + n._requestId + ", Name:" + e.name + ", message:" + e.message + ", stack:" + e.stack), window.navigator.onLine ? f.writeUnexpectedFailure("Exception", t) : f.writeExpectedFailure("Offline", t), r && r.writeExpectedFailure("TokenFetchError", t), _.writeExpectedFailure("TokenFetchError", t)), Promise.reject(t)
              })
            }, Object.defineProperty(e.prototype, "correlationId", {
              get: function() {
                return this._requestId
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "apiParams", {
              get: function() {
                return "?provider=Yggdrasil"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "_useSTIToken", {
              get: function() {
                return r._SPFlight.isEnabled(1865)
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype._getAPI = function(e, t, n) {
              return this.isPost ? e.post(this._substrateEndpoint + t, a.AadHttpClient.configurations.v1, this._getRequestOptions(n)) : e.get(this._substrateEndpoint + t, a.AadHttpClient.configurations.v1, this._getRequestOptions(n))
            }, e.prototype._getRequestOptions = function(e) {
              var t;
              t = (new Date).getTime();
              var n = {
                headers: {}
              };
              return n.headers["Content-Type"] = "application/json", n.headers["X-AnchorMailbox"] = s.d.revertTopicCenterPerfChanges.isActivated() ? this._pageContext.user.email : "SMTP:" + this._pageContext.user.email, n.headers["X-RoutingParameter-SessionKey"] = s.d.revertTopicCenterPerfChanges.isActivated() ? this._pageContext.user.email : "SMTP:" + this._pageContext.user.email, s.d.revertTopicCenterPerfChanges.isActivated() || (this._requestId = r.Guid.newGuid().toString(), n.headers["Client-Request-Id"] = this._requestId, n.headers["request-id"] = this._requestId), !Object(s.b)() && this._isOriginatingFromSPDFKnowledgeHub() && (n.headers[u.e] = "true"), e && (n.headers.Authorization = "Bearer " + e), this.getCustomRequestOptions(n), this._extraData.getRequestOptionsTime = (new Date).getTime() - t + " ms", n
            }, e.prototype._makeRequest = function(e, t) {
              return this._useSTIToken ? this._makeRequestUsingSTITokens(e, t) : this._makeRequestDeprecated(e, t)
            }, e.prototype._makeRequestUsingSTITokens = function(e, t) {
              var n = this;
              return this._tokenDataProvider.getOAuthToken("https://outlook.office365.com/dwengine").then(function(i) {
                t();
                var r = n._serviceScope.consume(a.HttpClient.serviceKey);
                return n._getAPI(r, e, i)
              })
            }, e.prototype._makeClientCachableRequest = function(e, t, n) {
              var i = this;
              return this._tokenDataProvider.getOAuthToken("https://outlook.office365.com/dwengine").then(function(r) {
                t();
                var o = i._serviceScope.consume(a.HttpClient.serviceKey);
                return i._executeRequestWithCacheOptions(o, e, n, r)
              })
            }, e.prototype._executeRequestWithCacheOptions = function(e, t, n, i) {
              if (this.isPost) {
                var r = this._getRequestOptions(i);
                return r.method = "POST", e.fetch(this._substrateEndpoint + t, a.HttpClient.configurations.v1, r, n)
              }
              return e.get(this._substrateEndpoint + t, a.HttpClient.configurations.v1, this._getRequestOptions(i), n)
            }, e.prototype._makeRequestDeprecated = function(e, t) {
              var n = this;
              return this._serviceScope.consume(a.AadHttpClientFactory.serviceKey)._getStandardClient("https://outlook.office365.com/dwengine").then(function(i) {
                return t(), n._getAPI(i, e, void 0)
              })
            }, e.prototype._isOriginatingFromSPDFKnowledgeHub = function() {
              return 0 === window.location.href.toLowerCase().indexOf(u.d)
            }, e
          }();
        t.a = p
      },
      "6DK4": function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
          return o
        }), n.d(t, "b", function() {
          return a
        }), n.d(t, "d", function() {
          return c
        }), n.d(t, "a", function() {
          return s
        });
        var i = n("UWqr");
  
        function r() {
          return new URL(window.location.href).searchParams.get("useMSAIAPI")
        }
  
        function o() {
          return i._SPFlight.isEnabled(1951) || "true" === r()
        }
  
        function a() {
          return i._SPFlight.isEnabled(1919) || o()
        }
  
        function c() {
          return "false" !== r()
        }
  
        function s(e) {
          var t = e.headers.get("sprequestguid") || "",
            n = e.headers.get("microsoftsharepointteamservices") || "";
          return "[HTTP]:" + e.status + " - " + e.statusText + " [CorrelationId]:" + t + " [Version]:" + n
        }
      },
      "6ayc": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return d
        }), n.d(t, "b", function() {
          return l
        });
        var i = n("cDcd"),
          r = n("KL1q"),
          o = n("hiL/"),
          a = n("Kwxa");
        n("MGnC");
        var c = {
            container: "b_b_04103875",
            stacked: "c_b_04103875",
            gap: "e_b_04103875",
            miniGapRight: "f_b_04103875",
            miniGapLeft: "g_b_04103875",
            licenseLink: "h_b_04103875",
            licenseLinkStacked: "i_b_04103875",
            sourceText: "j_b_04103875"
          },
          s = n("UWqr");
  
        function u() {
          return s._SPKillSwitch.isActivated("727ee38a-7662-46ce-9e14-ef81358d7007")
        }
  
        function d(e) {
          return i.createElement("div", {
            className: e.className
          }, e.source.url ? i.createElement(o.StringFormaterWithNodes, {
            template: a.a,
            values: [i.createElement(r.Link, {
              href: e.source.url,
              target: "_blank",
              "data-interception": "off",
              title: e.source.title
            }, e.source.title)],
            className: c.sourceText
          }) : i.createElement("span", null, e.source.title))
        }
  
        function l(e) {
          var t = a.a.split("{0}"),
            n = Boolean(t[0]),
            d = Boolean(t[t.length - 1]),
            l = e.stacked;
          return s._SPKillSwitch.isActivated("97888487-f745-4957-a3e1-f75f684aac96") ? i.createElement("div", {
            className: Object(r.css)(c.container, e.className)
          }, i.createElement("span", {
            className: Object(r.css)(n && c.miniGapRight)
          }, t[0]), i.createElement(r.Link, {
            href: e.source.url,
            target: "_blank",
            title: u() ? e.source.title : e.source.url
          }, a.b), i.createElement("span", {
            className: Object(r.css)(d && c.miniGapLeft)
          }, t.slice(1)), i.createElement(r.Link, {
            href: "https://creativecommons.org/licenses/by-sa/3.0/",
            target: "_blank",
            title: u() ? a.c : void 0,
            className: s._SPKillSwitch.isActivated("17c19ba4-19d2-47f6-8b5a-4be89961086c") ? c.gap : Object(r.css)(c.gap, c.licenseLink)
          }, a.c)) : i.createElement(o.StringFormaterWithNodes, {
            template: a.a,
            className: Object(r.css)(c.container, e.className, l && c.stacked),
            values: [i.createElement(r.Link, {
              href: e.source.url,
              target: "_blank",
              title: e.source.url,
              className: c.miniGapLeft
            }, a.b), i.createElement(r.Link, {
              href: "https://creativecommons.org/licenses/by-sa/3.0/",
              target: "_blank",
              className: Object(r.css)(l ? c.licenseLinkStacked : c.gap, c.licenseLink)
            }, a.c)]
          })
        }
      },
      DnL5: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return c
        });
        var i = n("6DK4"),
          r = n("HAeJ"),
          o = n("nAUB"),
          a = n("h4Yq"),
          c = function() {
            function e(e, t) {
              this._substrateDataProvider = new r.a(e), this._legacyDataProvider = new o.b(e, t)
            }
            return e.prototype.fetchTopicEntity = function(e, t, n) {
              var r = this;
              return Object(i.b)() ? (setTimeout(function() {
                return r._legacyDataProvider.getTopicEntity(e, t, n)
              }, 500), this._substrateDataProvider.getTopic(e, t).then(a.i)) : (setTimeout(function() {
                return r._substrateDataProvider.getTopic(e, t)
              }, 500), this._legacyDataProvider.getTopicEntity(e, t, n))
            }, e
          }()
      },
      GKvq: function(e) {
        e.exports = JSON.parse('{"h":"Topic feedback: {0}","a":"Tell us about your experience with this topic. Was the information accurate or helpful?","c":"Engineering notes: ","d":"Source: ","f":"Topic id: ","e":"Toolkit versions: ","b":"Browser agent: ","g":"User language: "}')
      },
      Gw7F: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return r
        });
        var i = n("rMgv");
  
        function r(e) {
          var t;
          return (null === (t = e) || void 0 === t ? void 0 : t.length) > 0 ? i.a.Curated : i.a.NotCurated
        }
      },
      HAeJ: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return u
        });
        var i = n("17wl"),
          r = n("UWqr"),
          o = n("53ge"),
          a = n("YC7o"),
          c = n("+ORw"),
          s = n("rMgv"),
          u = function(e) {
            function t(t, n) {
              var i = e.call(this, t) || this;
              return i._useMined = n, i
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return "GetTopicById"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return !Object(c.s)() && this._useMined ? "Topics/Mined" : "Topics"
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getTopic = function(e, t) {
              return void 0 === t && (t = this._useMined), r.Validate.isNonemptyString(e, "topicId"), this._useMined = t, this.getRequest("&id=" + e).then(function(e) {
                if (!e || !e.value || Object(c.w)() && 0 === e.value.length) throw new Error("Fail to fetch response from getTopicById");
                if (!Object(c.w)() && 0 === e.value.length) throw new a.a(s.f);
                return e.value[0]
              })
            }, t
          }(o.a)
      },
      I6O9: function(e, t) {
        e.exports = n
      },
      KL1q: function(e, t) {
        e.exports = i
      },
      Kwxa: function(e) {
        e.exports = JSON.parse('{"a":"From {0}","b":"Wikipedia","c":"Text under CC-BY-SA license"}')
      },
      "LN/c": function(e, t, n) {
        (e.exports = n("q1Tm")(!1)).push([e.i, ".b_b_04103875{display:-ms-flexbox;display:flex}.b_b_04103875.c_b_04103875{display:block}[dir=ltr] .b_b_04103875 .e_b_04103875{margin-left:12px}[dir=rtl] .b_b_04103875 .e_b_04103875{margin-right:12px}[dir=ltr] .b_b_04103875 .f_b_04103875{margin-right:4px}[dir=ltr] .b_b_04103875 .g_b_04103875,[dir=rtl] .b_b_04103875 .f_b_04103875{margin-left:4px}[dir=rtl] .b_b_04103875 .g_b_04103875{margin-right:4px}.b_b_04103875 .h_b_04103875{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.b_b_04103875 .i_b_04103875{display:block}.j_b_04103875{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}", ""])
      },
      LSGH: function(e, t, n) {
        "use strict";
        n.d(t, "m", function() {
          return r
        }), n.d(t, "B", function() {
          return o
        }), n.d(t, "n", function() {
          return a
        }), n.d(t, "i", function() {
          return c
        }), n.d(t, "A", function() {
          return s
        }), n.d(t, "y", function() {
          return u
        }), n.d(t, "b", function() {
          return d
        }), n.d(t, "c", function() {
          return l
        }), n.d(t, "j", function() {
          return p
        }), n.d(t, "u", function() {
          return f
        }), n.d(t, "r", function() {
          return _
        }), n.d(t, "p", function() {
          return h
        }), n.d(t, "s", function() {
          return g
        }), n.d(t, "k", function() {
          return b
        }), n.d(t, "w", function() {
          return v
        }), n.d(t, "v", function() {
          return m
        }), n.d(t, "x", function() {
          return y
        }), n.d(t, "d", function() {
          return S
        }), n.d(t, "h", function() {
          return P
        }), n.d(t, "z", function() {
          return I
        }), n.d(t, "t", function() {
          return T
        }), n.d(t, "e", function() {
          return w
        }), n.d(t, "o", function() {
          return C
        }), n.d(t, "f", function() {
          return E
        }), n.d(t, "a", function() {
          return O
        }), n.d(t, "g", function() {
          return x
        }), n.d(t, "l", function() {
          return D
        }), n.d(t, "q", function() {
          return A
        });
        var i = n("UWqr");
  
        function r() {
          return i._SPKillSwitch.isActivated("6c4aea94-db76-4907-99a8-65a7415edb65")
        }
  
        function o() {
          return i._SPKillSwitch.isActivated("933db094-c270-4a41-8a34-5655797a5663")
        }
  
        function a() {
          return i._SPKillSwitch.isActivated("a882150e-eb39-4ef0-8b78-9bee27cf3520")
        }
  
        function c() {
          return i._SPKillSwitch.isActivated("1c491058-2ad1-4adc-b201-a4e7cc71825d")
        }
  
        function s() {
          return i._SPKillSwitch.isActivated("71da2c82-f18b-4464-aa7d-25a9d6ce4d3d")
        }
  
        function u() {
          return i._SPKillSwitch.isActivated("46b9fcf8-1cda-447a-bc45-5e8732d5707a")
        }
  
        function d() {
          return i._SPKillSwitch.isActivated("2c4761dd-79a0-473b-94a7-0670961a5570")
        }
  
        function l() {
          return i._SPKillSwitch.isActivated("4950e98f-c3b4-4961-9839-cf100947b001")
        }
  
        function p() {
          return i._SPKillSwitch.isActivated("0c8c056d-cb2c-4f28-80e4-b1800b4fe4af")
        }
  
        function f() {
          return i._SPKillSwitch.isActivated("e8470950-d4ae-45e2-bbe5-4b87e3e194a5")
        }
  
        function _() {
          return i._SPKillSwitch.isActivated("c5d960d2-23f5-4766-a43f-a841151d414c")
        }
  
        function h() {
          return i._SPKillSwitch.isActivated("e703c6e8-633b-4980-b496-ec492c03ee29")
        }
  
        function g() {
          return i._SPKillSwitch.isActivated("d58d3fec-02bf-4c38-a976-d929619c1651")
        }
  
        function b() {
          return i._SPKillSwitch.isActivated("6ae01165-d861-4b5e-a3ed-6e73a5eca4bf")
        }
  
        function v() {
          return i._SPKillSwitch.isActivated("3cf35ac6-3e93-4e3c-9f69-0c38bdfe573e")
        }
  
        function m() {
          return i._SPKillSwitch.isActivated("1fdcbf32-c429-4307-9788-a0135cec2c51")
        }
  
        function y() {
          return i._SPKillSwitch.isActivated("29a2731e-81c9-4cbd-b79c-9635d9f3f9b4")
        }
  
        function S() {
          return i._SPKillSwitch.isActivated("ed46d874-2322-4d3f-a4ae-115c57570435")
        }
  
        function P() {
          return i._SPKillSwitch.isActivated("1a1d8929-dae7-4ba9-8ed1-ad3a674b2292")
        }
  
        function I() {
          return i._SPKillSwitch.isActivated("b7ed387f-2b2c-4bcf-aa82-cf6395defd0a")
        }
  
        function T() {
          return i._SPKillSwitch.isActivated("91027550-8b09-435e-a039-f118df62f7e3")
        }
  
        function w() {
          return i._SPKillSwitch.isActivated("b2d2026e-2e47-45df-9997-c8ef147d5698")
        }
  
        function C() {
          return i._SPKillSwitch.isActivated("706b4ce4-f589-4aac-9548-757f1a5c2732")
        }
  
        function E() {
          return i._SPKillSwitch.isActivated("7b38ec69-fb3d-466e-b834-9128b880ebcf")
        }
  
        function O() {
          return i._SPKillSwitch.isActivated("8294b36e-e725-4a41-bf0e-f5fdf7e1be59")
        }
  
        function x() {
          return i._SPKillSwitch.isActivated("3c64e6b1-2dfb-42c7-879e-8f1e227b9173")
        }
  
        function D() {
          return i._SPKillSwitch.isActivated("d7ae7412-e571-40ac-96bb-b1e3a0626bd3")
        }
  
        function A() {
          return i._SPKillSwitch.isActivated("cbfd2a21-002f-4c91-8c16-7a6c837eab51")
        }
      },
      M0jl: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return c
        });
        var i = n("17wl"),
          r = n("ut3N"),
          o = n("+ORw"),
          a = n("XJVB");
  
        function c(e, t, n, c, s) {
          var u = {};
          !Object(o.r)() && c && (u.topicOrigin = Object(a.a)(c)), !Object(o.q)() && s && (u.topicCurated = s), r._EngagementLogger.logEventWithLogEntry(new r._LogEntry(t, e, r._LogType.Event, Object(i.__assign)(Object(i.__assign)({}, n), u), !0))
        }
      },
      MGnC: function(e, t, n) {
        var i = n("LN/c"),
          r = n("jOlS");
        "string" == typeof i && (i = [
          [e.i, i]
        ]);
        for (var o = 0; o < i.length; o++) r.loadStyles(i[o][1], !0);
        i.locals && (e.exports = i.locals)
      },
      NDxI: function(e, t, n) {
        "use strict";
        var i = n("17wl"),
          r = function(e) {
            function t(n, i, r) {
              void 0 === n && (n = "unknown"), void 0 === i && (i = 200);
              var o = e.call(this, n) || this;
              return "unknown" === n && (o.isUnknown = !0), o.__proto__ = t.prototype, o.status = i, o.code = r, o
            }
            return Object(i.__extends)(t, e), t
          }(Error);
        t.a = r
      },
      "NG/M": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return s
        });
        var i = n("UWqr"),
          r = n("hiL/"),
          o = n("rMgv"),
          a = n("+ORw"),
          c = n("DnL5"),
          s = function() {
            function e() {
              this._cache = new Map, this._currentTopic = void 0
            }
            return e.getInstance = function(t) {
              return this._instance || (this._instance = new e, this._instance._serviceScope = t), this._instance
            }, e.prototype.update = function(e, t) {
              var n = this;
              e && e.length > 0 && e.forEach(function(e) {
                i.Validate.isNonemptyString(e.Id, "entity.Id"), i.Validate.isNonemptyString(e.Name, "entity.Name"), i.Validate.isNonemptyString(e.Type, "entity.Type"), n._copyClientOnlyProps(e), n._copyMinedRelations(e), n._cache.set(e.Id, e), n._indexOriginalIds(e, t)
              })
            }, e.prototype.get = function(e) {
              return i.Validate.isNonemptyString(e, "topicId"), this._cache.get(e)
            }, e.prototype.tryGet = function(e) {
              var t = this;
              i.Validate.isNonemptyString(e, "topicId");
              var n = this._cache.get(e);
              return n ? Promise.resolve(n) : this.fetch(e).then(function(e) {
                return t.update([e]), e
              })
            }, e.prototype.fetch = function(e) {
              return i.Validate.isNonemptyString(e, "topicId"), this._cache.has(e) ? Promise.resolve(this._cache.get(e)) : this._getAggregatedTopicEntityDataProvider().fetchTopicEntity(e, !1)
            }, Object.defineProperty(e.prototype, "currentTopic", {
              get: function() {
                return this._currentTopic
              },
              set: function(e) {
                i.Validate.isNonemptyString(e.Id, "entity.Id"), e.Id !== r.NULL_TOPIC_ENTITY.Id && i.Validate.isNonemptyString(e.Name, "entity.Name"), i.Validate.isNonemptyString(e.Type, "entity.Type"), this._currentTopic = e
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype._copyMinedRelations = function(e) {
              var t = e.RelatedDocuments || [],
                n = e.RelatedPeople || [];
              e.HiddenMinedDocuments = [], e.HiddenMinedPeople = [];
              for (var i = t.length - 1; i >= o.d; i--) t[i].State === r.ENTITY_STATE.Mined && e.HiddenMinedDocuments.push(t[i]);
              for (i = n.length - 1; i >= o.e; i--) n[i].State === r.ENTITY_STATE.Mined && e.HiddenMinedPeople.push(n[i])
            }, e.prototype._copyClientOnlyProps = function(e) {
              this._cache.has(e.Id) && !e.Url && (e.Url = this._cache.get(e.Id).Url)
            }, e.prototype._indexOriginalIds = function(e, t) {
              var n, i = this;
              Object(a.C)() || (t && t !== e.Id && this._cache.set(t, e), (null === (n = e.OriginalIds) || void 0 === n ? void 0 : n.length) && e.OriginalIds.map(function(n) {
                return n !== t && n !== e.Id && i._cache.set(n, e)
              }))
            }, e.prototype._getAggregatedTopicEntityDataProvider = function() {
              return this._aggregatedTopicEntityDataProvider || (this._aggregatedTopicEntityDataProvider = new c.a(this._serviceScope, "CSIKM.TopicCache")), this._aggregatedTopicEntityDataProvider
            }, e
          }()
      },
      NmML: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return r
        });
        var i = n("rMgv");
  
        function r(e, t) {
          if (!e) return e;
          var n = new URL(e);
          return n.searchParams.append(i.j.LinkSource, t), n.href
        }
      },
      OUh5: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return u
        });
        var i = n("UWqr"),
          r = n("ut3N"),
          o = n("+ORw"),
          a = "https://microsoft.sharepoint-df.com/teams/knowledgehub",
          c = "https://microsoft.sharepoint.com/sites/knowledgecenter",
          s = ["odspcsitest", "olfilato-test-site", "EdensTestSPDF", "knowledgehub"];
  
        function u(e) {
          var t, n;
          i.Validate.isNotNullOrUndefined(e, "pageContext");
          var u = r._LogSource.create("TopicUtilities");
          if (function(e) {
              i.Validate.isNotNullOrUndefined(e, "pageContext");
              var t = (o.d.previewPage404Fix.isActivated() ? location.origin : e.site.absoluteUrl).toLowerCase();
              return -1 !== t.indexOf("microsoft.sharepoint-df.com") && s.some(function(e) {
                return -1 !== t.indexOf(e)
              })
            }(e)) return a;
          if (null === (n = null === (t = e.legacyPageContext) || void 0 === t ? void 0 : t.knowledgeHubSiteDetails) || void 0 === n ? void 0 : n.Url) {
            var d = e.legacyPageContext.knowledgeHubSiteDetails.Url;
            return d === a ? c : d
          }
          return -1 !== location.origin.toLowerCase().indexOf("microsoft") ? c : void r._TraceLogger.logError(u, new Error("Error: Configure the KnowledgeCenter URL for Knowledge Mining scenarios to work correctly."))
        }
      },
      Pk8u: function(e, t) {
        e.exports = r
      },
      "Tpx+": function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
          return b
        }), n.d(t, "a", function() {
          return v
        }), n.d(t, "b", function() {
          return m
        });
        var i = n("ut3N"),
          r = n("UWqr"),
          o = function() {
            function e(e) {
              this._guid = r.Guid.parse(e)
            }
            return e.prototype.isActivated = function() {
              return r._SPKillSwitch.isActivated(this._guid, "", "")
            }, e
          }();
  
        function a() {
          return r._SPKillSwitch.isActivated("03fe1e3a-35a4-4d30-9d7d-eba1b4537dbb")
        }! function() {
          function e() {}
          e.newYoutubeUrlRegexKS = new o("93326c3b-13a0-4ea5-9979-87eddec6d21a"), e.urlUtilityRefactor = new o("77727f04-2ebb-4f7a-b916-692003f4dec7")
        }();
        var c = "cortexDisableFlag",
          s = "lastCortexDisableFlagLogged",
          u = "CSIKM.CortexEnabledFlag",
          d = ".Set",
          l = ".True",
          p = 1703,
          f = 1082,
          _ = 60083,
          h = 90041,
          g = 90059;
  
        function b(e) {
          var t, n, r;
          if (403 === (null === (t = e) || void 0 === t ? void 0 : t.status)) {
            var o = new Date((new Date).getTime() + 36e5);
            if (null === (n = sessionStorage) || void 0 === n ? void 0 : n.setItem) {
              sessionStorage.setItem(c, o.toISOString());
              var p = u + d + l;
              a() ? i._EngagementLogger.logEvent(p) : function(e, t) {
                var n, r, o;
                void 0 === t && (t = !0), (null === (n = sessionStorage) || void 0 === n ? void 0 : n.getItem) && (null != (r = sessionStorage.getItem(s)) ? r : "") !== e && (null === (o = sessionStorage) || void 0 === o ? void 0 : o.setItem) && (t && i._EngagementLogger.logEvent(e), sessionStorage.setItem(s, e))
              }(p), !a() && (null === (r = sessionStorage) || void 0 === r ? void 0 : r.removeItem) && sessionStorage.removeItem(s)
            }
          }
        }
  
        function v() {
          return r._SPFlight.isEnabled(p) && (1 === r._SPExperiment.getVariantAndLogExposure(h) || r._SPFlight.isEnabled(f) || y())
        }
  
        function m() {
          return r._SPFlight.isEnabled(p) && y()
        }
  
        function y() {
          return 1 === r._SPExperiment.getVariantAndLogExposure(g) || r._SPFlight.isEnabled(_)
        }
      },
      UWqr: function(e, t) {
        e.exports = o
      },
      WGsJ: function(e, t, n) {
        "use strict";
        var i = n("17wl"),
          r = function() {
            function e() {}
            return e.processResponseRawData = function(e, t, n) {
              for (var r = [], o = 3; o < arguments.length; o++) r[o - 3] = arguments[o];
              return e.then(function(e) {
                return t(e) ? n.apply(void 0, Object(i.__spreadArrays)([e], r)) : e
              })
            }, e.useStalePropName = "useStale", e.parentKeyOverride = "parentKeyOverride", e.onlyIndexedDB = "onlyIndexedDB", e.onlyMySiteCache = "onlyMySiteCache", e
          }();
        t.a = r
      },
      "X+PM": function(e, t) {
        e.exports = a
      },
      XJVB: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return r
        });
        var i = n("rMgv");
  
        function r(e) {
          var t;
          return (null === (t = e) || void 0 === t ? void 0 : t.split(i.i)[0]) || ""
        }
      },
      YC7o: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return r
        });
        var i = n("17wl"),
          r = function(e) {
            function t(n) {
              var i = e.call(this, n) || this;
              return i.__proto__ = t.prototype, i
            }
            return Object(i.__extends)(t, e), t
          }(Error)
      },
      aj7r: function(e, t, n) {
        "use strict";
  
        function i(e) {
          return e.toLowerCase().replace(/[{}]/g, "")
        }
        n.d(t, "a", function() {
          return i
        })
      },
      br4S: function(e, t) {
        e.exports = c
      },
      cDcd: function(e, t) {
        e.exports = s
      },
      faye: function(e, t) {
        e.exports = u
      },
      h4Yq: function(e, t, n) {
        "use strict";
        n.d(t, "d", function() {
          return a
        }), n.d(t, "a", function() {
          return c
        }), n.d(t, "b", function() {
          return s
        }), n.d(t, "c", function() {
          return u
        }), n.d(t, "e", function() {
          return d
        }), n.d(t, "f", function() {
          return l
        }), n.d(t, "i", function() {
          return p
        }), n.d(t, "g", function() {
          return f
        }), n.d(t, "h", function() {
          return _
        });
        var i = n("17wl"),
          r = n("+ORw"),
          o = n("aj7r");
  
        function a(e) {
          var t = e.RelatedResourcesMap,
            n = [];
          return t.forEach(function(e) {
            "File" === e.Key && (n = e.Value)
          }), n ? n.map(function(e) {
            return c(e)
          }) : []
        }
  
        function c(e) {
          var t;
          return {
            DepartmentId: e.DepartmentId,
            GroupId: e.GroupId,
            LastModifiedTime: e.LastModifiedTime,
            Title: e.Title,
            Url: e.FilePath,
            WebviewUrl: e.Url,
            SiteId: Object(o.a)(e.SiteId),
            WebId: Object(o.a)(e.WebId),
            UniqueId: Object(o.a)(e.UniqueId),
            State: e.State,
            ViewCount: e.ViewCount,
            Modifier: e.LastModifier ? {
              Email: e.LastModifier.EmailAddress,
              Name: e.LastModifier.DisplayName,
              OId: e.LastModifier.ObjectId,
              Upn: e.LastModifier.UserPrincipalName
            } : void 0,
            AIReason: {
              ReasonType: e.AIReason && e.AIReason.ReasonType ? e.AIReason.ReasonType : "",
              TopicMentionsCount: null === (t = e.AIReason) || void 0 === t ? void 0 : t.TopicMentionsCount
            }
          }
        }
  
        function s(e) {
          var t = e.RelatedResourcesMap,
            n = [];
          return t.forEach(function(e) {
            "People" === e.Key && (n = e.Value)
          }), n ? n.map(function(e) {
            return u(e)
          }) : []
        }
  
        function u(e) {
          var t;
          return {
            Email: e.EmailAddress,
            Name: e.DisplayName,
            Upn: e.UserPrincipalName,
            OId: e.ObjectId,
            Description: e.Description,
            AIReason: e.AIReason ? {
              Count: e.AIReason.FileContributions ? e.AIReason.FileContributions.length : 0,
              DocumentContributedTo: (null === (t = e.AIReason.FileContributions) || void 0 === t ? void 0 : t.length) > 0 ? {
                Title: e.AIReason.FileContributions[0].Title + (e.AIReason.FileContributions[0].Extension ? "." + e.AIReason.FileContributions[0].Extension : ""),
                Url: e.AIReason.FileContributions[0].Url
              } : {}
            } : void 0
          }
        }
  
        function d(e) {
          return Object(i.__assign)(Object(i.__assign)({}, e), {
            SiteId: Object(o.a)(e.SiteId),
            WebId: Object(o.a)(e.WebId)
          })
        }
  
        function l(e) {
          return {
            Acronym: e.Acronym,
            Title: e.Title,
            BannerColor: e.Color,
            BannerImageUrl: e.LogoUrl,
            Url: e.Url,
            Type: "Site",
            ItemReference: {
              SiteId: Object(o.a)(e.SiteId),
              WebId: Object(o.a)(e.WebId),
              Type: "SiteReference"
            },
            EntityState: e.State
          }
        }
  
        function p(e) {
          var t, n = e.RelatedResourcesMap,
            i = [],
            o = [],
            a = [],
            s = !1,
            l = !1,
            p = !1;
          n && n.length > 0 && n.forEach(function(e) {
            "People" === e.Key ? (i = e.Value, s = e.MoreResultsAvailable) : "File" === e.Key ? (o = e.Value, l = e.MoreResultsAvailable) : "Site" === e.Key && (a = e.Value, p = e.MoreResultsAvailable)
          });
          var f = [];
          return !Object(r.x)() && (null === (t = e.Definitions) || void 0 === t ? void 0 : t.length) && e.Definitions.forEach(function(e) {
            var t, n, i, r, o, a, c, s = null === (n = null === (t = e.AIReason) || void 0 === t ? void 0 : t.SourceFiles) || void 0 === n ? void 0 : n[0];
            f.push({
              Definition: e.Value,
              SourceType: "Wikipedia" === (null === (i = s) || void 0 === i ? void 0 : i.Source) ? "Wikipedia" : "Private",
              State: e.State,
              Url: null === (r = s) || void 0 === r ? void 0 : r.Url,
              WacUrl: null === (o = s) || void 0 === o ? void 0 : o.Url,
              SourceDocumentTitle: null === (a = s) || void 0 === a ? void 0 : a.Title,
              SourceDocumentExtension: null === (c = s) || void 0 === c ? void 0 : c.Extension
            })
          }), {
            Definitions: f,
            Definition: e.Definition,
            Id: e.Id,
            Name: e.DisplayName,
            State: e.State,
            Score: parseInt(e.RelevanceScore, 10),
            Type: e.TopicType,
            RelatedDocuments: o.map(c),
            RelatedPeople: i.map(u),
            RelatedSites: a.map(d),
            Url: e.Url,
            AlternateNames: e.AlternateNames,
            AtTheMinimumRelatedPeopleCount: s ? 11 : i.length,
            AtTheMinimumRelatedResourcesCount: l ? 11 : o.length,
            AtTheMinimumRelatedTopicsCount: p ? 11 : a.length,
            HiddenMinedDocuments: [],
            HiddenMinedPeople: [],
            LifecycleState: e.LifeCycle,
            OriginalIds: Object(r.z)() ? [] : e.AncestorIds
          }
        }
  
        function f(e) {
          var t = {
            EntityDetails: [],
            PageMatches: []
          };
          if (e.EntityAnnotation) {
            var n = e.EntityAnnotation.SectionMatches;
            if (n.length) {
              var i = n.map(function(e) {
                return {
                  ComponentId: e.SectionId,
                  Matches: e.EntityMatches.map(function(e) {
                    return {
                      Start: e.StartPos,
                      Length: e.Length,
                      Entities: [{
                        EntityId: e.Entities[0].Id,
                        Score: 0
                      }]
                    }
                  })
                }
              });
              t.PageMatches = i;
              var r = e.EntityAnnotation.EntityDetails.map(p);
              t.EntityDetails = r
            }
          }
          return t
        }
  
        function _(e) {
          var t = {
            value: []
          };
          if (e) {
            var n = e.map(function(e) {
              return {
                EntityId: e.Id,
                Name: e.DisplayName,
                Type: e.Type,
                Definition: void 0,
                AlternateNames: [],
                RelatedPeople: []
              }
            });
            t.value = n
          }
          return t
        }
      },
      hN9v: function(e) {
        e.exports = JSON.parse('{"k":"Title area","l":"Title region description","m":"Summary","e":"People","j":"Files and pages","g":"Related sites","h":"Sites","i":"Graph","b":"Conversations","n":"Topic","d":"People related to the current topic.","c":"Documents related to the current topic.","f":"Sites related to the current topic.","a":"Yammer conversations related to the current topic."}')
      },
      "hiL/": function(e, t) {
        e.exports = d
      },
      hrbp: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return p
        });
        var i, r = n("UWqr"),
          o = n("hiL/"),
          a = n("aj7r"),
          c = n("j84u"),
          s = n("rMgv"),
          u = n("+ORw"),
          d = n("jamc"),
          l = n("hN9v");
        ! function(e) {
          e[e.TopicGraph = 486] = "TopicGraph", e[e.YammerTopic = 745] = "YammerTopic"
        }(i || (i = {}));
        var p = function() {
          function e() {}
          return e.getLayoutWebPartData = function(t, n) {
            r.Validate.isNotNullOrUndefined(t, "topic"), r.Validate.isNotNullOrUndefined(t.Id, "topicId"), r.Validate.isNotNullOrUndefined(t.Name, "topicName");
            var a = t.Name,
              c = [],
              s = [{
                id: e.TITLE_REGION_WP_ID,
                title: l.k,
                dataVersion: d.a.titleRegion,
                instanceId: e.TITLE_REGION_WP_ID,
                description: l.l,
                serverProcessedContent: {
                  htmlStrings: {},
                  searchablePlainTexts: {},
                  imageSources: {},
                  links: {}
                },
                properties: {
                  imageSourceType: o.ImageSourceType.none,
                  title: a,
                  textAlignment: "Left",
                  showPublishDate: !1,
                  authors: void 0,
                  showTopicHeader: !0,
                  authorByline: void 0,
                  layoutType: "TopicPage",
                  topicId: t.Id,
                  topicName: t.Name,
                  topicHeader: l.n,
                  preventTitleOverwrite: !0,
                  hasTitleBeenCommitted: !0,
                  focusOnInput: !0
                }
              }, {
                id: e.DEFINITION_WP_ID,
                instanceId: e._OVERVIEW_RTE_INSTANCE_ID,
                title: l.m,
                description: l.m,
                dataVersion: d.a.definition,
                properties: {
                  content: t.Definition,
                  title: l.m,
                  topicName: t.Name,
                  curated: c,
                  suggested: e._getAlternateNamesInfo(t.AlternateNames),
                  removed: c
                }
              }, {
                id: e.RELATED_PEOPLE_WP_ID,
                instanceId: e.RELATED_PEOPLE_WP_ID,
                title: l.e,
                description: l.d,
                dataVersion: d.a.people,
                properties: {
                  title: l.e,
                  topicName: t.Name,
                  suggested: e._getExpertInfoFromRelatedPeople(t.RelatedPeople),
                  curated: e._defaultCurated(t, n),
                  removed: []
                }
              }, {
                id: e.RELATED_DOCS_WP_ID,
                instanceId: e.RELATED_DOCS_WP_ID,
                title: l.j,
                description: l.c,
                dataVersion: d.a.resource,
                properties: {
                  title: l.j,
                  topicName: t.Name,
                  suggested: e._getSuggestedResources(t.RelatedDocuments),
                  curated: []
                }
              }, {
                id: e.SITES_WP_ID,
                instanceId: e.SITES_WP_ID,
                title: l.g,
                description: l.f,
                dataVersion: d.a.sites,
                properties: {
                  isOnTopicPage: !0,
                  layoutId: Object(u.t)() ? "FilmStrip" : "CompactGrid",
                  title: Object(u.t)() ? l.h : l.g,
                  titleFontWeightBold: !0,
                  hideWebPartWhenEmpty: !0,
                  isTitleEditable: !1
                }
              }];
            return e._isFlightEnabled(i.TopicGraph) && s.push({
              id: e.GRAPH_WP_ID,
              instanceId: e.GRAPH_WP_ID,
              title: l.i,
              description: l.f,
              dataVersion: d.a.graph,
              properties: {
                isOnTopicPage: !0,
                title: l.i,
                topicName: t.Name,
                titleFontWeightBold: !0,
                suggested: [],
                curated: []
              }
            }), e._isFlightEnabled(i.YammerTopic) && s.push({
              id: e.YAMMER_WP_ID,
              instanceId: e.YAMMER_WP_ID,
              title: l.b,
              description: l.a,
              dataVersion: "1.0",
              properties: {
                isOnTopicPage: !0,
                title: l.b,
                type: "Topic",
                id: "eyJfdHlwZSI6IlRvcGljIiwiaWQiOiI1OTQwMjQyODQxNiJ9",
                feedSubtype: "QUESTIONS",
                threadCount: 3,
                showHighlights: !0,
                templateType: "Cortex"
              }
            }), s
          }, e.getAnchorIdForWebPart = function(e) {
            var t;
            return (t = {}, t[this.RELATED_DOCS_WP_ID] = s.h, t[this.RELATED_PEOPLE_WP_ID] = s.g, t)[e]
          }, e.getTitleRegionData = function(t, n) {
            return e.getLayoutWebPartData(t, n).filter(function(t) {
              return t.id === e.TITLE_REGION_WP_ID
            })[0]
          }, e._getExpertInfoFromRelatedPeople = function(e) {
            return e ? e.map(function(e) {
              return {
                name: e.Name,
                id: e.OId,
                email: e.Email,
                upn: e.Upn
              }
            }) : []
          }, e._defaultCurated = function(e, t) {
            if (e.Id === o.NULL_TOPIC_ENTITY.Id) {
              var n = t.user,
                i = n.displayName,
                r = n.email,
                a = n.loginName;
              return [{
                id: r,
                name: i,
                email: r,
                upn: a,
                curationDetails: Object(c.b)(r, i, a)
              }]
            }
            return []
          }, e._getAlternateNamesInfo = function(e) {
            return e ? e.map(function(e) {
              return {
                name: e.Name
              }
            }) : []
          }, e._getSuggestedResources = function(e) {
            return e && e.length > 0 ? e.map(function(e) {
              var t, n, i;
              return {
                aiReason: e.AIReason ? {
                  reasonType: e.AIReason.ReasonType,
                  topicMentionsCount: e.AIReason.TopicMentionsCount
                } : void 0,
                title: e.Title,
                url: e.Url,
                modifier: {
                  email: (null === (t = e.Modifier) || void 0 === t ? void 0 : t.Email) || "",
                  name: (null === (n = e.Modifier) || void 0 === n ? void 0 : n.Name) || "",
                  id: (null === (i = e.Modifier) || void 0 === i ? void 0 : i.OId) || ""
                },
                viewCount: void 0 === e.ViewCount ? 0 : e.ViewCount,
                siteId: Object(a.a)(e.SiteId),
                webId: Object(a.a)(e.WebId),
                uniqueId: Object(a.a)(e.UniqueId),
                lastModifiedTime: e.LastModifiedTime
              }
            }) : []
          }, e._isFlightEnabled = function(e) {
            return r._SPFlight.isEnabled(e)
          }, e.TITLE_REGION_WP_ID = "cbe7b0a9-3504-44dd-a3a3-0e5cacd07788", e.RELATED_DOCS_WP_ID = "9346e298-66c6-4122-853c-a1eef08b5827", e.RELATED_PEOPLE_WP_ID = "29991a50-6f14-42e0-9536-aef85d91b05c", e.LOCKED_RTE_WP_ID = "09fc0123-851e-4fd3-bdd6-6e2e31cb1ef7", e.DEFINITION_WP_ID = "e9ee7242-273c-473f-bfa5-149b32873501", e.SITES_WP_ID = "7cba020c-5ccb-42e8-b6fc-75b3149aba7b", e.GRAPH_WP_ID = "81ce1eba-74ad-4f0d-a692-2133b98bc308", e.YAMMER_WP_ID = "cb3bfe97-a47f-47ca-bffb-bb9a5ff83d75", e._OVERVIEW_RTE_INSTANCE_ID = "7aca70c6-02bc-4b46-a27e-093e34a7a4dc", e
        }()
      },
      j84u: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return o
        }), n.d(t, "b", function() {
          return a
        });
        var i = n("hiL/"),
          r = n("UWqr");
  
        function o(e, t, n, o) {
          r.Validate.isNotNullOrUndefined(e, "serviceScope"), r.Validate.isNotNullOrUndefined(o, "newRelation");
          var a = e.consume(i.EntityRelationsService.serviceKey)[i.RelationsContainerKey].relations;
          a[t] || (a[t] = {}), a[t][n] = o
        }
  
        function a(e, t, n, i) {
          return void 0 === i && (i = !1), {
            author: {
              email: e,
              name: t,
              upn: n
            },
            time: (new Date).toISOString(),
            isAddedFromSearch: i
          }
        }
      },
      jOlS: function(e, t) {
        e.exports = l
      },
      jamc: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return i
        });
        var i = function() {
          function e() {}
          return e.titleRegion = "1.4", e.definition = "1.3.0", e.people = "1.1.0", e.resource = "1.4.0", e.sites = "1.0", e.graph = "1.3", e
        }()
      },
      jrLr: function(e, t, n) {
        "use strict";
        var i = n("6DK4");
        n.d(t, "c", function() {
          return i.a
        }), n.d(t, "m", function() {
          return i.b
        }), n.d(t, "n", function() {
          return i.c
        }), n.d(t, "o", function() {
          return i.d
        });
        var r = n("h4Yq");
        n.d(t, "d", function() {
          return r.a
        }), n.d(t, "e", function() {
          return r.b
        }), n.d(t, "f", function() {
          return r.c
        }), n.d(t, "g", function() {
          return r.d
        }), n.d(t, "h", function() {
          return r.e
        }), n.d(t, "i", function() {
          return r.f
        }), n.d(t, "j", function() {
          return r.g
        }), n.d(t, "k", function() {
          return r.h
        }), n.d(t, "l", function() {
          return r.i
        });
        var o = n("oUEy");
        n.d(t, "a", function() {
          return o.a
        });
        var a = n("NDxI");
        n.d(t, "b", function() {
          return a.a
        })
      },
      mAUd: function(e, t, n) {
        "use strict";
        n.d(t, "d", function() {
          return _
        }), n.d(t, "o", function() {
          return h
        }), n.d(t, "c", function() {
          return g
        }), n.d(t, "m", function() {
          return v
        }), n.d(t, "j", function() {
          return m
        }), n.d(t, "l", function() {
          return y
        }), n.d(t, "k", function() {
          return S
        }), n.d(t, "n", function() {
          return P
        }), n.d(t, "e", function() {
          return I
        }), n.d(t, "a", function() {
          return T
        }), n.d(t, "i", function() {
          return w
        }), n.d(t, "h", function() {
          return C
        }), n.d(t, "b", function() {
          return E
        }), n.d(t, "g", function() {
          return O
        }), n.d(t, "f", function() {
          return x
        });
        var i = n("UWqr"),
          r = n("hiL/"),
          o = n("+ORw"),
          a = n("X+PM"),
          c = n("ut3N"),
          s = n("y88i"),
          u = n("aj7r"),
          d = n("rMgv"),
          l = n("NmML"),
          p = n("OUh5"),
          f = n("GKvq");
  
        function _(e, t, n, r) {
          i.Validate.isNotNullOrUndefined(e, "name"), i.Validate.isNotNullOrUndefined(t, "id"), i.Validate.isNotNullOrUndefined(n, "pageContext"), i.Validate.isNotNullOrUndefined(r, "linkSource");
          var o = Object(p.a)(n) + "/_layouts/15/TopicPagePreview.aspx?topicId=" + t + "&topicName=" + encodeURIComponent(e);
          return Object(l.a)(o, r)
        }
  
        function h(e) {
          i.Validate.isNotNullOrUndefined(e, "url"), window.open(e, "_blank")
        }
  
        function g(e) {
          var t, n;
          if (!e || !e.knowledgeHubSiteDetails) return !1;
          var i = null === (t = e) || void 0 === t ? void 0 : t.siteId,
            r = null === (n = e) || void 0 === n ? void 0 : n.webId;
          return i = Object(u.a)(i), r = Object(u.a)(r), e.knowledgeHubSiteDetails.SiteId === i && e.knowledgeHubSiteDetails.WebId === r
        }
  
        function b() {
          var e = new URL(window.location.href).pathname.toLowerCase();
          return e.substring(e.lastIndexOf("/") + 1)
        }
  
        function v() {
          return S() && b().toLowerCase() === d.k.topicPagePreviewStubFileName.toLowerCase()
        }
  
        function m() {
          return S() && b().toLowerCase() === d.k.createTopicPageStubFileName.toLowerCase()
        }
  
        function y() {
          return b().toLowerCase() === d.k.newPageStubFileName.toLowerCase()
        }
  
        function S() {
          return -1 !== new URL(window.location.href).pathname.toLowerCase().indexOf(d.k.layoutsPagePrefix)
        }
  
        function P() {
          return -1 !== new URLSearchParams(window.location.search).toString().indexOf("showAllTopics")
        }
  
        function I(e) {
          return Object(p.a)(e) + "/" + d.k.layoutsPagePrefix + d.k.createTopicPageStubFileName
        }
        var T = new Set(["doc", "docx", "one", "ppt", "pptx", "xls", "xlsx"]);
  
        function w(e, t, n, i) {
          var r, a, c = Object(o.g)() ? (null === (a = i) || void 0 === a ? void 0 : a.split(".").pop()) || "" : ((null === (r = i) || void 0 === r ? void 0 : r.split(".").pop()) || "").toLowerCase();
          if (!Object(o.g)() && i && "msg" === c) {
            var s = C(i),
              u = s.substring(0, s.lastIndexOf("/"));
            return i.substring(0, i.lastIndexOf("/")) + "?id=" + s + "&parent=" + u
          }
          return T.has(c) && e && t && n ? e + "/" + t + "/Doc.aspx?sourcedoc={" + encodeURIComponent(n) + "}" : i
        }
  
        function C(e) {
          return new URL(e).pathname
        }
  
        function E(e) {
          if (!e) return 0;
          var t = e.replace(/<[^>]*>/g, " ");
          return (t = (t = (t = t.replace(/&nbsp;|&emsp;|&br;/g, " ")).replace(/\s+/g, " ")).trim()).split(" ").filter(function(e) {
            return !!e
          }).length
        }
  
        function O(e, t) {
          var n, i = new c._QosMonitor(t),
            s = e.consume(r.PageService.serviceKey),
            u = e.consume(a.PageContext.serviceKey);
          return Object(o.h)() || (null === (n = u) || void 0 === n ? void 0 : n.list) ? s.getCurrentItem().then(function(e) {
            var t, n, r, o = null === (r = null === (n = null === (t = e) || void 0 === t ? void 0 : t.item) || void 0 === n ? void 0 : n.properties) || void 0 === r ? void 0 : r.uniqueId;
            return o ? i.writeSuccess() : i.writeUnexpectedFailure("getUndefinedPageUniqueId"), o
          }).catch(function(e) {
            i.writeUnexpectedFailure("getPageUniqueIdFailed", e)
          }) : Promise.resolve(void 0)
        }
  
        function x(e) {
          var t = e.topicName,
            n = e.topicId,
            i = e.source,
            r = e.buildNumber,
            o = e.feedbackEmail,
            a = e.pageContext,
            c = encodeURIComponent(s.StringHelper.format(f.h, t)),
            u = ["" + f.d + i, "" + f.f + n, f.e + "buildNumber=" + r, "" + f.b + window.navigator.userAgent, "" + f.g + a.legacyPageContext.currentLanguage].join("\n");
          return "mailto:" + o + "?subject=" + c + "&body=" + encodeURIComponent(f.a + "\n\n\n" + f.c + "\n" + u)
        }
      },
      mwqp: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mockApiResponse", function() {
          return i
        }), n.d(t, "_BaseSubstrateTopicDataProvider", function() {
          return r.a
        }), n.d(t, "SubstrateTopicsDataProvider", function() {
          return c
        }), n.d(t, "SubstrateTopicsDataProviderV2", function() {
          return u
        }), n.d(t, "SubstrateFeedbackDataProvider", function() {
          return d
        }), n.d(t, "SubstrateGetTopicSuggestionProvider", function() {
          return _
        }), n.d(t, "CreateTopicDataProvider", function() {
          return h.a
        }), n.d(t, "TopicPageLayoutDefaultTemplate", function() {
          return g.a
        }), n.d(t, "addEntityRelations", function() {
          return b.a
        }), n.d(t, "getCurationDetails", function() {
          return b.b
        }), n.d(t, "generatePreviewUrl", function() {
          return v.d
        }), n.d(t, "openInNewTab", function() {
          return v.o
        }), n.d(t, "deprecatedIsSiteKnowledgeCenter", function() {
          return v.c
        }), n.d(t, "isPreviewPage", function() {
          return v.m
        }), n.d(t, "isCreateTopicPage", function() {
          return v.j
        }), n.d(t, "isNewPage", function() {
          return v.l
        }), n.d(t, "isLayoutsPage", function() {
          return v.k
        }), n.d(t, "isShowAllTopicsPage", function() {
          return v.n
        }), n.d(t, "getCreateTopicPageUrl", function() {
          return v.e
        }), n.d(t, "WEB_VIEW_EXTENSIONS", function() {
          return v.a
        }), n.d(t, "getWebviewUrl", function() {
          return v.i
        }), n.d(t, "getPathName", function() {
          return v.h
        }), n.d(t, "countWordFromHTMLString", function() {
          return v.b
        }), n.d(t, "getPageUniqueId", function() {
          return v.g
        }), n.d(t, "getFeedbackMailLink", function() {
          return v.f
        }), n.d(t, "_translateResources", function() {
          return m.d
        }), n.d(t, "_translateDoc", function() {
          return m.a
        }), n.d(t, "_translatePeople", function() {
          return m.b
        }), n.d(t, "_translatePerson", function() {
          return m.c
        }), n.d(t, "_translateSubstrateSuggestionSearchAPIResponse", function() {
          return m.h
        }), n.d(t, "_SubstrateGetTopicByIdDataProvider", function() {
          return y.a
        }), n.d(t, "_SubstrateGetTopicsByIdsDataProvider", function() {
          return S
        }), n.d(t, "_SubstrateAnnotationDataProvider", function() {
          return T
        }), n.d(t, "_useSubstrateMSAIAPI", function() {
          return w.c
        }), n.d(t, "_useSubstrateMSAIAPIASPrimary", function() {
          return w.d
        }), n.d(t, "_BaseKMWebPart", function() {
          return C.a
        }), n.d(t, "_DeferredTopicCard", function() {
          return A
        }), n.d(t, "_TopicCache", function() {
          return D.a
        }), n.d(t, "DeferredCreateNewTopicDialog", function() {
          return N
        }), n.d(t, "DeferredTopicAssociationCallout", function() {
          return L
        }), n.d(t, "chooseIcon", function() {
          return k.a
        }), n.d(t, "isMediaWikiDemo", function() {
          return k.b
        }), n.d(t, "TopicConstants", function() {
          return s.k
        }), n.d(t, "logEngagement", function() {
          return q.a
        }), n.d(t, "useSubstrateMSAIAPI", function() {
          return U.n
        }), n.d(t, "useSubstrateApiWhenGettingTopicEntity", function() {
          return U.m
        }), n.d(t, "useSubstrateMSAIAPIASPrimary", function() {
          return U.o
        }), n.d(t, "getStatusMessage", function() {
          return U.c
        }), n.d(t, "translateResources", function() {
          return U.g
        }), n.d(t, "translateDoc", function() {
          return U.d
        }), n.d(t, "translatePeople", function() {
          return U.e
        }), n.d(t, "translatePerson", function() {
          return U.f
        }), n.d(t, "translateSite", function() {
          return U.h
        }), n.d(t, "translateSiteMetadata", function() {
          return U.i
        }), n.d(t, "translateSubstrateTopicEntity", function() {
          return U.l
        }), n.d(t, "translateSubstrateAnnotationResponse", function() {
          return U.j
        }), n.d(t, "translateSubstrateSuggestionSearchAPIResponse", function() {
          return U.k
        }), n.d(t, "MSIT_KNOWLEDGE_HUB_URL", function() {
          return U.a
        }), n.d(t, "RestApiError", function() {
          return U.b
        }), n.d(t, "TopicEntityDataProvider", function() {
          return C.b
        }), n.d(t, "AggregatedTopicEntityDataProvider", function() {
          return M.a
        }), n.d(t, "TOPIC_CARD_RELATED_PEOPLE", function() {
          return s.g
        }), n.d(t, "TOPIC_CARD_RELATED_RESOURCES", function() {
          return s.h
        }), n.d(t, "TOPIC_ID_ORIGIN_BREAKER", function() {
          return s.i
        }), n.d(t, "CuratedTypes", function() {
          return s.a
        }), n.d(t, "DefinitionTypes", function() {
          return s.b
        }), n.d(t, "TopicPageParams", function() {
          return s.j
        }), n.d(t, "LinkSourceTypes", function() {
          return s.c
        }), n.d(t, "isMobileView", function() {
          return s.l
        }), n.d(t, "RELATED_PEOPLE_LIMIT", function() {
          return s.e
        }), n.d(t, "RELATED_DOCUMENTS_LIMIT", function() {
          return s.d
        }), n.d(t, "SUBSTRATE_GETTOPICBYID_EMPTY_RESPONSE_ERROR", function() {
          return s.f
        }), n.d(t, "EmptyResponseError", function() {
          return F.a
        }), n.d(t, "isAnnotatePageTitleFlightEnabled", function() {
          return K.b
        }), n.d(t, "SubstrateManagedDashboardDataProvider", function() {
          return H
        }), n.d(t, "WikiSourceElement", function() {
          return W.b
        }), n.d(t, "SuggestedDefinitionSourceElement", function() {
          return W.a
        }), n.d(t, "DataVersion", function() {
          return G.a
        }), n.d(t, "topicCurated", function() {
          return V.a
        }), n.d(t, "topicOrigin", function() {
          return B.a
        }), n.d(t, "_cleanGuid", function() {
          return z.a
        }), n.d(t, "isSiteKnowledgeCenter", function() {
          return Q
        }), n.d(t, "getKnowledgeHubUrl", function() {
          return J
        }), n.d(t, "getKnowledgeHubUrlWithOverrides", function() {
          return Y.a
        }), n.d(t, "_executePostAnnotationActions", function() {
          return le
        }), n.d(t, "_annotateInnerHtmls", function() {
          return ue
        }), n.d(t, "_insertAnnotationPreviewLink", function() {
          return de
        }), n.d(t, "_HASHTAGGED_TOPIC_ID_ATTRIBUTE", function() {
          return re
        }), n.d(t, "_KM_PREVIEW_LINK_HTML_TAG", function() {
          return oe
        }), n.d(t, "_KM_TOPIC_ID_ATTRIBUTE", function() {
          return ie
        }), n.d(t, "canCreateNewTopicOnCurrentSite", function() {
          return _e
        }), n.d(t, "canCreateNewTopic", function() {
          return he
        }), n.d(t, "isEnvMSIT", function() {
          return fe
        });
        var i = {
            PageMatches: [{
              ComponentId: "1212fc8d-dd6b-408a-8d5d-9f1cc787efbb",
              Matches: [{
                Start: 33,
                Length: 14,
                Entities: [{
                  EntityId: "Yukon_Un99HElc8M0PepGv-ibwNZ4Lpawi3QtGyWfzAOvPUGY",
                  Score: 1
                }]
              }]
            }],
            EntityDetails: [{
              Id: "Yukon_Un99HElc8M0PepGv-ibwNZ4Lpawi3QtGyWfzAOvPUGY",
              State: "Curated, Mined",
              LifecycleState: {
                State: "Published"
              },
              Score: 0,
              Name: "Project Cortex",
              Url: "https://microsoft.sharepoint.com/sites/knowledgecenter/SitePages/Project-Cortex.aspx",
              Definition: "Project Cortex is your knowledge network in Microsoft 365, empowering people with knowledge and expertise in the apps you use every day.\nBuilding on the leading content services of SharePoint, Project Cortex connects content in Microsoft 365 and external content and enables you to manage your information and streamline processes with advanced security, compliance and automated workflow.\nProject Cortex applies AI to automatically organize your content, and delivers innovative experiences—topic cards, topic pages and knowledge centers—in Office, Outlook and Microsoft Teams.\n",
              Definitions: [],
              Type: "Project",
              AtTheMinimumRelatedResourcesCount: 11,
              AtTheMinimumRelatedPeopleCount: 11,
              RelatedPeople: [{
                Upn: "",
                Name: "Naomi Moneypenny",
                Email: "Naomi.Moneypenny@microsoft.com",
                OId: "00000000-0000-0000-0000-000000000000",
                Description: void 0,
                State: "Curated",
                AIReason: void 0
              }, {
                Upn: "nkokoye@microsoft.com",
                Name: "Nkem Okoye",
                Email: "nkokoye@microsoft.com",
                OId: "00000000-0000-0000-0000-000000000000",
                Description: void 0,
                State: "Curated, Mined",
                AIReason: void 0
              }],
              RelatedDocuments: [{
                GroupId: "93f37c3c-37e2-4281-828a-241c8a5d6ac8",
                DepartmentId: "00000000-0000-0000-0000-000000000000",
                Title: "GA-Overview_of__Language_Understanding_Model_in_SharePoint_Using_Project_Cortex",
                Url: "https://microsoft.sharepoint-df.com/teams/ECMandSearchinODSP/Capture/GA-Overview_of__Language_Understanding_Model_in_SharePoint_Using_Project_Cortex.docx",
                WebviewUrl: "https://microsoft.sharepoint-df.com/teams/ECMandSearchinODSP/Capture/GA-Overview_of__Language_Understanding_Model_in_SharePoint_Using_Project_Cortex.docx",
                LastModifiedTime: "2020-05-01T07:16:00Z",
                ViewCount: 13,
                State: "Mined",
                SiteId: "258e1f20-fb33-4141-bcbb-c0f40cf83dc6",
                WebId: "2aeac71c-2716-4c01-b529-78b6f93ed3db",
                UniqueId: "b0839ea1-ad45-4698-9118-dc84a42e7f33",
                Modifier: {
                  Upn: "ssquires@microsoft.com",
                  Name: "Sean Squires",
                  Email: "ssquires@microsoft.com"
                },
                AIReason: void 0
              }, {
                GroupId: "00000000-0000-0000-0000-000000000000",
                DepartmentId: "47060b5d-eb3a-4f7b-a1c0-421fc86cd0f6",
                Title: "Customer Profiling and Segmentation",
                Url: "https://microsoft.sharepoint-df.com/teams/ODSPWeb/SitePages/Customer-Profiling-and-Segmentation(1).aspx",
                WebviewUrl: "https://microsoft.sharepoint-df.com/teams/ODSPWeb/SitePages/Customer-Profiling-and-Segmentation(1).aspx",
                LastModifiedTime: "2020-02-13T18:02:35Z",
                ViewCount: 101,
                State: "Mined",
                SiteId: "47060b5d-eb3a-4f7b-a1c0-421fc86cd0f6",
                WebId: "b8573d90-81d1-4c02-9754-506bfcc71f51",
                UniqueId: "96082162-9d9f-449e-967b-25ea4877227a",
                Modifier: {
                  Upn: "anrani@microsoft.com",
                  Name: "Aneema Rani",
                  Email: "Aneema.Rani@microsoft.com"
                },
                AIReason: void 0
              }],
              RelatedSites: [{
                Title: "Project Cortex",
                SiteId: "4afbba34-2ba1-4d06-bcfc-6e112144012b",
                WebId: "e4ad031e-5dcd-4a5e-909e-4eb0a17d06b0",
                Url: "https://microsoft.sharepoint.com/sites/projectcortex",
                Color: "#a4262c",
                Acronym: "PC",
                LogoUrl: "",
                State: "Curated"
              }],
              AlternateNames: [],
              HiddenMinedDocuments: [],
              HiddenMinedPeople: [],
              OriginalIds: ["AL_eLnG1wGyug7rPoGij0zZyg"]
            }]
          },
          r = n("53ge"),
          o = n("17wl"),
          a = n("UWqr"),
          c = function(e) {
            function t(t, n) {
              var i = e.call(this, t, !1) || this;
              return i._requestType = n, i
            }
            return Object(o.__extends)(t, e), t.prototype.getTopics = function(e, t, n, i, r) {
              var o = this;
              a.Validate.isNotNullOrUndefined(e, "count");
              var c = "&$top=" + e;
              return n && (c += "&$filter=contains(tolower(Name),tolower('" + n + "'))"), t && (c += "&$skip=" + t), i && (c += "&$orderby=" + i + (r ? "+desc" : "")), c += "&$count=true", this.getRequest(c).then(function(e) {
                var t;
                return e.correlationId = null != (t = o.correlationId) ? t : "", e
              })
            }, Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return "Topics/" + this._requestType
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return this._requestType
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getCustomRequestOptions = function(e) {
              e.headers["X-ODataQuery"] = "true"
            }, t
          }(r.a),
          s = n("rMgv"),
          u = function(e) {
            function t(t, n) {
              var i = e.call(this, t, !1) || this;
              return i._requestType = n, i
            }
            return Object(o.__extends)(t, e), t.prototype.getTopics = function(e, t, n, i, r) {
              var o = this;
              return a.Validate.isNotNullOrUndefined(e, "count"), this._count = e, this._skipToken = t, this._name = n, this._orderBy = i, this._orderByDesc = r, this.getRequest("").then(function(e) {
                var t;
                return e.correlationId = null != (t = o.correlationId) ? t : "", e
              })
            }, Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return "Topics/Managed"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return this._requestType
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "isPost", {
              get: function() {
                return !0
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getCustomRequestOptions = function(e) {
              e.headers["X-ODataQuery"] = "true", e.headers.accept = "application/json";
              var t = {
                Size: this._count,
                ManagedTopicState: this._requestType
              };
              this._skipToken && (t.From = this._skipToken), this._name && (t.TopicNameStartsWith = this._name), this._orderBy && (t.Sort = {
                Field: this._orderBy,
                Direction: this._orderByDesc ? s.k.descending : s.k.ascending
              }), e.body = JSON.stringify(t)
            }, t
          }(r.a),
          d = function(e) {
            function t(t, n) {
              var i = this;
              return a.Validate.isNotNullOrUndefined(t, "serviceScope"), a.Validate.isNotNullOrUndefined(n, "feedbackType"), (i = e.call(this, t, !1) || this)._topics = [], i._feedbackType = n, i
            }
            return Object(o.__extends)(t, e), Object.defineProperty(t.prototype, "apiEndpoint", {
              get: function() {
                return "DWEngineV2/api/v1.0/KnowledgeManagement"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return "Topics/" + this._feedbackType
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return this._feedbackType
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "isPost", {
              get: function() {
                return !0
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.provideFeedback = function(e) {
              return a.Validate.isNotNullOrUndefined(e, "topics"), this._topics = e.map(function(e) {
                return {
                  Id: e.Id,
                  Name: e.Name
                }
              }), this.getRequest()
            }, t.prototype.getCustomRequestOptions = function(e) {
              e.body = JSON.stringify({
                Topics: this._topics
              })
            }, t
          }(r.a),
          l = n("05y5"),
          p = n("ut3N"),
          f = n("oUEy"),
          _ = function(e) {
            function t(t) {
              var n = e.call(this, t) || this;
              return n._processRawData = function(e) {
                if (e.value) return e
              }, n
            }
            return Object(o.__extends)(t, e), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return "GetTopicSuggestion"
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getTopicSuggestion = function(e, t) {
              return this._isIndexedDBEnabled && t ? this._getClientCachableRequest(e, t) : this.getRequest("&prefix=" + e).then(function(e) {
                return e.value
              })
            }, t.prototype._getClientCachableRequest = function(e, t) {
              var n = this,
                i = new p._QosMonitor(f.c + "." + this.qosTag + ".API." + f.b);
              return this.getRequest("&prefix=" + e, t).then(function(e) {
                return l.a.parseClientCachableResponse(e, n._isRawData, n._isCachedDataEmpty, n._processRawData, i, f.c + "." + n.qosTag + ".API").then(function(e) {
                  return e.value
                }).catch(function(e) {
                  return Promise.reject(e)
                })
              })
            }, t.prototype._isRawData = function(e) {
              return e && e.value
            }, t.prototype._isCachedDataEmpty = function(e) {
              return 0 === e.value.length
            }, t
          }(r.a),
          h = n("r7AW"),
          g = n("hrbp"),
          b = n("j84u"),
          v = n("mAUd"),
          m = n("h4Yq"),
          y = n("HAeJ"),
          S = function(e) {
            function t(t) {
              return e.call(this, t) || this
            }
            return Object(o.__extends)(t, e), t.prototype.fetchTopics = function(e) {
              return a.Validate.isNotNullOrUndefined(e, "topicIds"), 0 === e.length ? Promise.resolve([]) : (this._topicIds = e, this.getRequest().then(function(e) {
                return e.value.map(m.i)
              }))
            }, Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return "GetTopicsByIds"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return "Topics/Ids"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "isPost", {
              get: function() {
                return !0
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getCustomRequestOptions = function(t) {
              e.prototype.getCustomRequestOptions.call(this, t), t.body = JSON.stringify({
                TopicIds: this._topicIds
              })
            }, t
          }(r.a),
          P = n("Tpx+"),
          I = n("+ORw"),
          T = function(e) {
            function t(t, n) {
              var i = e.call(this, t) || this;
              return i._processRawData = function(e) {
                if (e.EntityAnnotation) return e
              }, i._doNotRetrieveTopicDetails = n, i
            }
            return Object(o.__extends)(t, e), t.prototype.getAnnotations = function(e, t, n) {
              return a.Validate.isNotNullOrUndefined(e, "contentArr"), a.Validate.isNotNullOrUndefined(t, "spoId"), this._contentArr = e, this._spoId = t, Object(P.b)() && n ? this._getClientCachableRequest(n, this._spoId) : this.getRequest().then(function(e) {
                return e
              })
            }, Object.defineProperty(t.prototype, "isPost", {
              get: function() {
                return !0
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "apiEndpoint", {
              get: function() {
                return I.d.useV2AnnotationsEndpoint.isActivated() ? "DWEngineV2B2/api/v1.0/KnowledgeManagement/" : "DWEngineV2/api/v1.0/KnowledgeManagement/"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return "Annotation"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                var e = "Annotation";
                return Object(I.n)() ? e : this._doNotRetrieveTopicDetails ? e + ".DoNotRetrieveDetails" : e
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getCustomRequestOptions = function(e) {
              var n, i, r, o, a, c, s = this,
                u = {
                  Provider: "Yggdrasil"
                };
              u.TextSections = this._contentArr.map(function(e) {
                return Object(I.n)() ? {
                  SectionId: e.id,
                  Text: e.text
                } : {
                  SectionId: e.id,
                  Text: e.text,
                  RetrieveTopicDetails: !s._doNotRetrieveTopicDetails
                }
              }), u.CurrentPageId = {
                SiteId: (i = null === (n = this._spoId.siteId) || void 0 === n ? void 0 : n.toString(), null != i ? i : t._allTopicsPageGuid),
                WebId: (o = null === (r = this._spoId.webId) || void 0 === r ? void 0 : r.toString(), null != o ? o : t._allTopicsPageGuid),
                UniqueId: (c = null === (a = this._spoId.uniqueId) || void 0 === a ? void 0 : a.toString(), null != c ? c : t._allTopicsPageGuid)
              }, e.body = JSON.stringify({
                AnnotationRequest: u
              });
              var d = new URL(window.location.href).searchParams;
              e && e.headers && "0" === d.get("threshold") && (e.headers["X-Debug-SkipAnnotationFiltering"] = "true"), e && e.headers && "true" === d.get("useYukonAndTopicPredictor") ? e.headers[f.f] = "true" : e && e.headers && "true" === d.get("useYukonHighlightApi") ? e.headers[f.g] = "true" : e && e.headers && "true" !== d.get("useTopicPredictor") && (Object(I.o)() ? e.headers[f.f] = "true" : e.headers[f.g] = "true")
            }, t.prototype._isRawData = function(e) {
              return e && e.EntityAnnotation
            }, t.prototype._isCachedDataEmpty = function(e) {
              return 0 === e.EntityAnnotation.EntityDetails.length
            }, t.prototype._getClientCachableRequest = function(e, t) {
              var n = this,
                i = new p._QosMonitor(f.c + "." + this.apiName + ".API." + f.b),
                r = l.a.getUniquePageId(t.siteId, t.webId, t.uniqueId);
              return this.getRequest("", e).then(function(e) {
                return l.a.parseClientCachableResponse(e, n._isRawData, n._isCachedDataEmpty, n._processRawData, i, f.c + "." + n.apiName + ".API", r)
              })
            }, t._allTopicsPageGuid = "9833225a-d24b-4b9e-b16d-bba52bae6e23", t
          }(r.a),
          w = n("6DK4"),
          C = n("nAUB"),
          E = n("cDcd"),
          O = n("faye"),
          x = n("LSGH"),
          D = n("NG/M"),
          A = function() {
            function e(e) {
              var t = this;
              this.closeTopicCard = function() {
                t._topicCard && t._topicCard.setFutureTopicId("")
              }, this._getTopicCardProps = function() {
                return {
                  knowledgeHubUrl: t._props.pageContext.legacyPageContext.knowledgeHubUrl,
                  tryGetTopicInfo: t._getTopicInfo,
                  getCurrentTopicFromCache: t._getCurrentTopicFromCache,
                  setCurrentTopicInCache: t._setCurrentTopicInCache,
                  serviceScope: t._props.serviceScope,
                  getSPOId: t._getSPOId,
                  removeAnnotation: t._removeAnnotation,
                  shouldLinksOpenInNewTab: !Object(x.u)() && t._props.shouldLinksOpenInNewTab
                }
              }, this._getTopicInfo = function(e) {
                return t._topicCache.tryGet(e)
              }, this._getCurrentTopicFromCache = function() {
                return t._topicCache.currentTopic
              }, this._setCurrentTopicInCache = function(e) {
                t._topicCache.currentTopic = e
              }, this._getSPOId = function() {
                var e, n, i;
                return {
                  siteId: null === (e = t._props.pageContext.site) || void 0 === e ? void 0 : e.id,
                  webId: null === (n = t._props.pageContext.web) || void 0 === n ? void 0 : n.id,
                  listId: null === (i = t._props.pageContext.list) || void 0 === i ? void 0 : i.id,
                  uniqueId: a.Guid.tryParse(t._pageUniqueId)
                }
              }, this._removeAnnotation = function(e) {
                var n, i;
                return null === (i = (n = t._props).onRemoveAnnotation) || void 0 === i ? void 0 : i.call(n, e)
              }, this._dispose = function() {
                window.removeEventListener("unload", t._dispose);
                var e = window.document.body.querySelector(s.k.kmTopicCardAttribute);
                e && (e.remove ? e.remove() : e.parentElement.removeChild(e))
              }, this._props = e
            }
            return e.getInstance = function(t) {
              return e._instance || (e._instance = new e(t)), e._instance
            }, e.prototype.loadTopicCard = function() {
              var t = this;
              this._rendered || (this._rendered = new Promise(function(e) {
                t._onAfterRendered = e
              }), Promise.all([this._import(), this._setPageUniqueId()]).then(function() {
                setTimeout(function() {
                  t._renderTopicCard()
                })
              }).catch(function(t) {
                p._TraceLogger.logError(e._logSource, t)
              }))
            }, e.prototype.showTopicCard = function(e, t, n, i) {
              var r = this;
              void 0 === i && (i = !1), this._topicCard && (this._topicCard.setFutureTopicId(e), setTimeout(function() {
                var e;
                null === (e = r._topicCard) || void 0 === e || e.setElement(t, n, i)
              }, 200))
            }, e.prototype._import = function() {
              var e = this;
              return Promise.all([n.e(7), n.e(3)]).then(n.bind(null, "pWas")).then(function(t) {
                return e._topicCardBundle = t, Object(I.f)() ? e._topicCache = t.TopicCache.getInstance(e._props.serviceScope) : e._topicCache = D.a.getInstance(e._props.serviceScope), t.TopicCard
              })
            }, e.prototype._setPageUniqueId = function() {
              var e = this;
              return Object(v.g)(this._props.serviceScope, "CSIKM.DeferredTopicCard.setPageUniqueId").then(function(t) {
                e._pageUniqueId = t
              })
            }, e.prototype._renderTopicCard = function() {
              var e = this,
                t = document.createElement("div");
              t.setAttribute(s.k.kmTopicCardAttribute, "true"), window.document.body.appendChild(t);
              var n = E.createElement(this._topicCardBundle.TopicCard, Object(o.__assign)({
                ref: function(t) {
                  !e._topicCard && t && (e._topicCard = t)
                }
              }, this._getTopicCardProps()));
              this._onAfterRendered(), window.addEventListener("unload", this._dispose), O.render(n, t)
            }, Object.defineProperty(e.prototype, "topicCard", {
              get: function() {
                return this._topicCard
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "rendered", {
              get: function() {
                return this._rendered
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "topicCache", {
              get: function() {
                return this._topicCache
              },
              enumerable: !0,
              configurable: !0
            }), e._logSource = p._LogSource.create("DeferredTopicCard"), e
          }(),
          R = E.lazy(function() {
            return n.e(4).then(n.bind(null, "/G8a"))
          });
  
        function N(e) {
          return E.createElement(E.Suspense, {
            fallback: E.createElement(E.Fragment, null)
          }, E.createElement(R, Object(o.__assign)({}, e)))
        }
        var j = E.lazy(function() {
          return n.e(5).then(n.bind(null, "SACp"))
        });
  
        function L(e) {
          return E.createElement(E.Suspense, {
            fallback: E.createElement(E.Fragment, null)
          }, E.createElement(j, Object(o.__assign)({}, e)))
        }
        var k = n("1jTL"),
          q = n("M0jl"),
          U = n("jrLr"),
          M = n("DnL5"),
          F = (n("NmML"), n("YC7o")),
          K = n("w4+A"),
          H = function(e) {
            function t(t, n) {
              var i = e.call(this, t) || this;
              return i._pastDays = 30, i._managedTopicState = n, i
            }
            return Object(o.__extends)(t, e), t.prototype.getDashboardData = function() {
              return this.getRequest().then(function(e) {
                return e
              })
            }, Object.defineProperty(t.prototype, "isPost", {
              get: function() {
                return !0
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "apiName", {
              get: function() {
                return "Topics/ManagedDashboard"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "qosTag", {
              get: function() {
                return "ManagedDashboard"
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getCustomRequestOptions = function(e) {
              e.headers["X-ODataQuery"] = "true";
              var t = {
                ManagedTopicState: this._managedTopicState,
                PastDays: this._pastDays
              };
              e.body = JSON.stringify(t)
            }, t
          }(r.a),
          W = n("6ayc"),
          G = n("jamc"),
          V = n("Gw7F"),
          B = n("XJVB"),
          z = n("aj7r");
  
        function Q(e) {
          var t, n;
          if (!e || !e.knowledgeHubSiteDetails) return !1;
          var i = null === (t = e) || void 0 === t ? void 0 : t.siteId,
            r = null === (n = e) || void 0 === n ? void 0 : n.webId;
          return i = Object(z.a)(i), r = Object(z.a)(r), e.knowledgeHubSiteDetails.SiteId === i && e.knowledgeHubSiteDetails.WebId === r
        }
  
        function J(e) {
          var t, n, i;
          return null === (i = null === (n = null === (t = e) || void 0 === t ? void 0 : t.legacyPageContext) || void 0 === n ? void 0 : n.knowledgeHubSiteDetails) || void 0 === i ? void 0 : i.Url
        }
        var Y = n("OUh5"),
          Z = n("KL1q"),
          X = n("hiL/");
  
        function $(e, t) {
          var n, i, r = new Set([e.Id].concat(null != (n = e.OriginalIds) ? n : []));
          return [t.Id].concat((i = t.OriginalIds, null != i ? i : [])).some(function(e) {
            return r.has(e)
          })
        }
        var ee = n("pR+h"),
          te = "!important",
          ne = a.Guid.parse("9833225a-d24b-4b9e-b16d-bba52bae6e23"),
          ie = "data-sp-topic-id",
          re = "data-sp-hashtagged-topic-id",
          oe = "span",
          ae = "a[" + re + "]",
          ce = oe + "[" + ie + "]," + ae;
  
        function se() {
          var e = Object(Z.getTheme)();
          return Object(Z.mergeStyleSets)({
            highlightSpacingFix: {
              borderBottom: "none" + te,
              textDecoration: "underline",
              backgroundColor: e.palette.neutralLighter + te,
              textDecorationColor: e.palette.neutralPrimary,
              ":hover": {
                backgroundColor: e.palette.themeLighter + te,
                textDecorationColor: e.palette.themeDark
              }
            },
            highlight: {
              cursor: "pointer",
              backgroundColor: e.palette.neutralLight,
              borderBottom: "1px solid",
              borderBottomColor: e.palette.neutralPrimary,
              color: e.palette.neutralPrimary + te,
              ":hover": {
                backgroundColor: e.palette.themeLighter,
                borderBottomColor: e.palette.themeDark,
                color: e.palette.themeDark + te
              }
            }
          })
        }
  
        function ue(e, t, n, i) {
          return function(e, t, n, i) {
            var r = e.filter(function(e) {
              return -1 === e.text.indexOf(ie)
            });
            if (!r || 0 === r.length) return Promise.resolve(void 0);
            var o = new T(t, void 0);
            return n || (n = {
              siteId: ne,
              webId: ne,
              uniqueId: ne
            }), o.getAnnotations(r, n).then(function(e) {
              return Object(U.j)(e)
            })
          }(e, t, i).then(function(i) {
            var r, a, c, s;
            n.update(i.EntityDetails);
            var u = function(e, t, n) {
              var i, r, a, c, s, u = [],
                d = new Set([]),
                l = new Map(e.map(function(e) {
                  return [e.id, e.text]
                }));
              try {
                for (var p = Object(o.__values)(t), f = p.next(); !f.done; f = p.next()) {
                  var _ = f.value,
                    h = {
                      ComponentId: _.ComponentId,
                      Matches: []
                    };
                  try {
                    for (var g = (a = void 0, Object(o.__values)(_.Matches)), b = g.next(); !b.done; b = g.next()) {
                      var v = b.value,
                        m = v.Entities[0].EntityId;
                      (null === (s = l.get(h.ComponentId)) || void 0 === s ? void 0 : s.indexOf(re + '="' + m + '"')) > -1 ? d.add(m) : d.has(m) || (d.add(m), h.Matches.push(v))
                    }
                  } catch (e) {
                    a = {
                      error: e
                    }
                  } finally {
                    try {
                      b && !b.done && (c = g.return) && c.call(g)
                    } finally {
                      if (a) throw a.error
                    }
                  }
                  u.push(h)
                }
              } catch (e) {
                i = {
                  error: e
                }
              } finally {
                try {
                  f && !f.done && (r = p.return) && r.call(p)
                } finally {
                  if (i) throw i.error
                }
              }
              return u
            }(e, i.PageMatches).reduce(function(e, t) {
              return e.set(t.ComponentId, t.Matches), e
            }, new Map);
            try {
              for (var d = Object(o.__values)(e), l = d.next(); !l.done; l = d.next()) {
                var f = l.value;
                if (u.has(f.id)) {
                  var _ = u.get(f.id).sort(function(e, t) {
                    return t.Start - e.Start
                  });
                  if (f.text) {
                    var h = t.consume(X.TopicDataService.serviceKey).currentTopicEntity;
                    try {
                      for (var g = (c = void 0, Object(o.__values)(_)), b = g.next(); !b.done; b = g.next()) {
                        var v = b.value,
                          m = n.get(v.Entities[0].EntityId);
                        m ? $(m, h) || (f.text = de(f.text, m, v)) : p._TraceLogger.logError(p._LogSource.create("TopicAnnotator"), new Error("Topic Entity missing form response Entity id: " + v.Entities[0].EntityId))
                      }
                    } catch (e) {
                      c = {
                        error: e
                      }
                    } finally {
                      try {
                        b && !b.done && (s = g.return) && s.call(g)
                      } finally {
                        if (c) throw c.error
                      }
                    }
                  }
                }
              }
            } catch (e) {
              r = {
                error: e
              }
            } finally {
              try {
                l && !l.done && (a = d.return) && a.call(d)
              } finally {
                if (r) throw r.error
              }
            }
            return e
          })
        }
  
        function de(e, t, n) {
          var i, r = n.Start + n.Length,
            o = e.slice(n.Start, r),
            c = a.Text.format(ee.a, o),
            s = se(),
            u = s.highlight,
            d = s.highlightSpacingFix,
            l = "<" + oe + "\n    class='" + Object(Z.css)(u, d) + "'\n    data-sp-topic-id='" + t.Id + "'\n    data-sp-topic-name='" + ((i = t.Name) ? i.replace(new RegExp("'", "g"), "&#39;").replace(new RegExp('"', "g"), "&#34;") : "") + "'\n    role='button'\n    aria-haspopup='true'\n    tabindex='0'\n    aria-label='" + c + "'\n  >" + o + "</" + oe + ">";
          return e.slice(0, n.Start) + l + e.slice(r)
        }
  
        function le(e, t, n, i) {
          var r;
          ! function(e, t) {
            if (e) {
              var n = e.querySelectorAll(ae),
                i = Array.prototype.slice.call(n),
                r = se(),
                o = r.highlight,
                a = r.highlightSpacingFix;
              i.forEach(function(e) {
                var n = e.getAttribute(re);
                t.get(n) ? (e.className = Object(Z.css)(o, a), e.setAttribute(ie, n), e.setAttribute("role", "button"), e.setAttribute("aria-haspopup", "true")) : (e.tabIndex = -1, e.setAttribute("role", "Text"))
              })
            }
          }(e, t);
          var a = function(e, t) {
              return {
                mouseenter: function(t) {
                  return e(t.target)
                },
                mouseleave: function() {
                  return t()
                },
                keydown: function(n) {
                  "Enter" === n.key && (e(n.target), n.preventDefault()), "Escape" === n.key && t()
                },
                click: function(t) {
                  return e(t.target)
                }
              }
            }(n, i),
            c = null === (r = e) || void 0 === r ? void 0 : r.querySelectorAll(ce);
          return c && c.forEach(function(e) {
              var t, n;
              try {
                for (var i = Object(o.__values)(Object.keys(a)), r = i.next(); !r.done; r = i.next()) {
                  var c = r.value;
                  e.addEventListener(c, a[c])
                }
              } catch (e) {
                t = {
                  error: e
                }
              } finally {
                try {
                  r && !r.done && (n = i.return) && n.call(i)
                } finally {
                  if (t) throw t.error
                }
              }
            }),
            function() {
              ! function(e, t) {
                e && t && e.forEach(function(e) {
                  var n, i;
                  try {
                    for (var r = Object(o.__values)(Object.keys(t)), a = r.next(); !a.done; a = r.next()) {
                      var c = a.value;
                      e.removeEventListener(c, t[c])
                    }
                  } catch (e) {
                    n = {
                      error: e
                    }
                  } finally {
                    try {
                      a && !a.done && (i = r.return) && i.call(r)
                    } finally {
                      if (n) throw n.error
                    }
                  }
                })
              }(c, a)
            }
        }
        var pe = n("X+PM");
  
        function fe(e) {
          var t = e.legacyPageContext.env,
            n = e.legacyPageContext.farmLabel;
          return "prodbubble" === t && "MSIT_SPDF_1_Content" !== n
        }
  
        function _e(e) {
          if (!e) return !1;
          var t = e.legacyPageContext;
          if (!t) return !1;
          var n = new pe.SPPermission(t.webPermMasks);
          return Object(X.isCortexEnabled)(e) && n.hasAnyPermissions(pe.SPPermission.manageLists, pe.SPPermission.manageWeb) && (Object(I.m)() || !fe(e) || n.hasPermission(pe.SPPermission.manageWeb))
        }
  
        function he(e) {
          return Q(e.legacyPageContext) && _e(e)
        }
      },
      nAUB: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return v
        }), n.d(t, "b", function() {
          return A
        });
        var i = n("17wl"),
          r = n("cDcd"),
          o = n("faye"),
          a = n("UWqr"),
          c = n("ut3N"),
          s = n("br4S"),
          u = n("hiL/"),
          d = n("rMgv"),
          l = n("+ORw"),
          p = n("DnL5"),
          f = function(e) {
            function t(t) {
              var n = e.call(this, t) || this;
              return n.state = {
                error: void 0
              }, Object(l.y)() && (n._qosMonitor = new c._QosMonitor(t.webPartTag + ".ComponentRender")), n
            }
            return Object(i.__extends)(t, e), t.prototype.componentDidMount = function() {
              !this.state.error && this.props.isReadyToCompleteRender && (Object(l.y)() ? this._qosMonitor.writeSuccess(this._extraQosData) : this.props.logRenderSuccess())
            }, t.prototype.componentDidUpdate = function(e) {
              this.state.error || e.isReadyToCompleteRender || !this.props.isReadyToCompleteRender || (Object(l.y)() ? this._qosMonitor.writeSuccess(this._extraQosData) : this.props.logRenderSuccess())
            }, t.prototype.componentDidCatch = function(e, t) {
              this.setState({
                error: e
              }), Object(l.y)() ? this._qosMonitor.writeUnexpectedFailure("FailedToRender", e, this._extraQosData) : this.props.logRenderError(e)
            }, t.prototype.render = function() {
              if (this.state.error) throw this.props.onCatchError(this.state.error), this.state.error;
              return this.props.children
            }, Object.defineProperty(t.prototype, "_extraQosData", {
              get: function() {
                return {
                  isSuggestedDataLoaded: this.props.isSuggestedDataLoaded
                }
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(r.Component);
  
        function _(e) {
          r.useEffect(function() {
            e.isReadyToCompleteRender && e.asyncRenderCompleted()
          }, [e.isReadyToCompleteRender, e.asyncRenderCompleted]);
          var t = e.contentElement,
            n = e.onCatchError,
            i = e.isSuggestedDataLoaded,
            o = e.isReadyToCompleteRender,
            a = e.webPartTag;
          return r.createElement(f, {
            onCatchError: n,
            isSuggestedDataLoaded: i,
            isReadyToCompleteRender: o,
            webPartTag: a,
            logRenderError: e.logRenderError,
            logRenderSuccess: e.logRenderSuccess
          }, t)
        }
        var h = n("jrLr"),
          g = n("mAUd"),
          b = 50,
          v = function(e) {
            function t(n) {
              var i = e.call(this) || this;
              return i.requestMaximumRelations = function() {
                return i._hasGotMaximumRelations ? Promise.resolve(b) : (i._hasGotMaximumRelations = !0, i._updateEntity(b).then(function() {
                  return b
                }))
              }, i._logRenderError = function(e) {
                i._renderQosMonitor.writeUnexpectedFailure("FailedToRender", e, i._extraQosData)
              }, i._logRenderSuccess = function() {
                i._renderQosMonitor.writeSuccess(i._extraQosData)
              }, i._handleTopicLoaded = function(e) {
                var n = e.topic;
                if (Object(l.j)() || !n || n.Id === i.topicId) try {
                  i.isSuggestedDataLoaded = !0, t._currentTopicEntity = n, !n && Object(l.p)() || i._feedSuggestedDataToWebPart(n)
                } catch (e) {
                  Object(l.y)() || (i._logRenderError(e), i.renderCompleted(e))
                }
              }, i._handleRenderError = function(t) {
                e.prototype.renderError.call(i, t)
              }, i
            }
            return Object(i.__extends)(t, e), t.prototype.render = function() {
              var e = this;
              if (this.isUseBaseKMContainer()) {
                this.onUpdateAccessibleTitle();
                var t = r.createElement(_, {
                  contentElement: this.contentElement,
                  webPartTag: this.qosPrefix,
                  isSuggestedDataLoaded: this.isSuggestedDataLoaded,
                  isReadyToCompleteRender: this.isReadyToCompleteRender(),
                  asyncRenderCompleted: function() {
                    return e.renderCompleted()
                  },
                  onCatchError: this._handleRenderError,
                  logRenderSuccess: this._logRenderSuccess,
                  logRenderError: this._logRenderError
                });
                this.webPartContext ? o.render(r.createElement(this.webPartContext.Provider, {
                  value: this.webPartContextData
                }, t), this.domElement) : o.render(t, this.domElement)
              }
            }, Object.defineProperty(t.prototype, "webPartContext", {
              get: function() {},
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "webPartContextData", {
              get: function() {},
              enumerable: !0,
              configurable: !0
            }), t.prototype.isReadyToCompleteRender = function() {
              return !this.isRenderAsync || this.isSuggestedDataLoaded
            }, t.prototype.onInit = function() {
              return Object(l.y)() || (this._renderQosMonitor = new c._QosMonitor(this.qosPrefix + ".ComponentRender")), this._registerTopicLoadedEventListener(), e.prototype.onInit.call(this)
            }, t.prototype.onBeforeSerialize = function() {
              this.onUpdateEntityRelations(), e.prototype.onBeforeSerialize.call(this)
            }, t.prototype.onDispose = function() {
              e.prototype.onDispose.call(this), t._currentTopicEntity = void 0, t._afterLoadSuggestedListeners.clear(), this._unregisterTopicLoadedSPEventListeners()
            }, t.prototype.getCurrentTopicEntity = function() {
              return t._currentTopicEntity ? Promise.resolve(t._currentTopicEntity) : this.requestTopicEntity()
            }, t.prototype.requestTopicEntity = function(e) {
              return void 0 === e && (e = this.initialRelationCount), this.topicId && this.topicId.length > 0 && this.topicId !== u.NULL_TOPIC_ENTITY.Id ? (this._initTopicEntityDataProvider(), this._aggregatedTopicEntityDataProvider.fetchTopicEntity(this.topicId, !0, e)) : Promise.resolve(void 0)
            }, t.prototype.onUpdateAccessibleTitle = function() {
              if (this.displayMode === a.DisplayMode.Edit) {
                var e = this.accessibleTitle || this._getDefaultAccessibleTitle();
                if (e) {
                  var t = "cswpAccessibleLabelContextual_" + this.context.instanceId,
                    n = this.domElement.querySelector("#" + t);
                  n && n.textContent !== e && (n.textContent = e)
                }
              }
            }, Object.defineProperty(t.prototype, "shouldUseSubstrateMSAIAPI", {
              get: function() {
                return Object(h.m)()
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "isRenderAsync", {
              get: function() {
                return !Object(l.u)()
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.isTopicPreviewPage = function() {
              return Object(g.m)()
            }, Object.defineProperty(t.prototype, "topicDataService", {
              get: function() {
                return this._topicDataService || (this._topicDataService = this.context.serviceScope.consume(u.TopicDataService.serviceKey)), this._topicDataService
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "initialRelationCount", {
              get: function() {
                return d.l ? b : 10
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "topicId", {
              get: function() {
                var e;
                return null === (e = this.topicDataService.currentTopicEntity) || void 0 === e ? void 0 : e.Id
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.isUseBaseKMContainer = function() {
              return !Object(l.A)()
            }, t.prototype._feedSuggestedDataToWebPart = function(e) {
              if (Object(l.k)()) this.onAfterLoadSuggested(e && this.getSuggestedItemsFromTopicEntity(e));
              else {
                var t = e ? this.getSuggestedItemsFromTopicEntity(e) : void 0;
                this.onAfterLoadSuggested(t), this.render()
              }
            }, t.prototype._updateEntity = function(e) {
              var t = this;
              return this.requestTopicEntity(e).then(function(e) {
                t.topicDataService.currentTopicEntity = e, t._feedSuggestedDataToWebPart(e)
              })
            }, t.prototype._initTopicEntityDataProvider = function() {
              this._aggregatedTopicEntityDataProvider || (this._aggregatedTopicEntityDataProvider = new p.a(this.context.serviceScope, this.qosPrefix))
            }, Object.defineProperty(t.prototype, "_extraQosData", {
              get: function() {
                return {
                  isSuggestedDataLoaded: this.isSuggestedDataLoaded
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._unregisterTopicLoadedSPEventListeners = function() {
              a._SPEventManager.instance.unregisterEvent(d.k.currentTopicLoadedEvent, this, this._handleTopicLoaded)
            }, t.prototype._registerTopicLoadedEventListener = function() {
              a._SPEventManager.instance.registerEvent(d.k.currentTopicLoadedEvent, this, this._handleTopicLoaded)
            }, t._afterLoadSuggestedListeners = new Map, t
          }(s.BaseClientSideWebPart),
          m = n("vlQI"),
          y = n("KL1q"),
          S = n("X+PM"),
          P = function(e) {
            this.name = "SPHomeMicroserviceNotAvailableError", this.message = "SPHome Microservice not available in this environment", this.message = e || this.message
          },
          I = function(e) {
            function t(t) {
              var n = e.call(this, t) || this;
              return n._requestUpdater = function(e) {
                return Promise.resolve(e)
              }, n
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "requestUpdater", {
              set: function(e) {
                this._requestUpdater = e
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._fetch = function(t, n, i) {
              var r = this;
              return this._requestUpdater({
                url: t,
                options: i
              }).then(function(t) {
                return e.prototype._fetch.call(r, t.url, n, t.options)
              })
            }, t
          }(m.SPHttpClient),
          T = a.ServiceKey.create("sp-http:SPHttpMicroserviceClient", I),
          w = n("WGsJ"),
          C = "_spHomeClientContextLoaded",
          E = new u.KillSwitch("0306551a-b040-4e46-ae3d-98f35375764b"),
          O = function() {
            function e(e) {
              var t = this;
              this._isServiceAvailable = void 0, this._hasPrefetchedToken = !1, this._requestUpdater = function(e) {
                return t._fetchTokenIfExpired().then(function() {
                  return {
                    url: t._generateUrlVersionedPath(e.url),
                    options: t._getRequestOptions(e.options)
                  }
                })
              }, this._isPrefetchTokenFlightEnabled && (this._initializeFromPrefetchedToken = new Promise(function(e, n) {
                var i = new y.Async;
                window[C] = function() {
                  i.dispose();
                  var r = new c._QosMonitor("SpHomeClientContextPrefetch");
                  try {
                    t._initializeWithPrefetchedToken(), t._hasPrefetchedToken ? r.writeSuccess() : r.writeUnexpectedFailure("NoPrefetchedToken")
                  } catch (e) {
                    r.writeUnexpectedFailure("Unexpected", e), n(e)
                  }
                  e()
                }, i.setTimeout(function() {
                  return !t._hasPrefetchedToken && n(new Error("Timeout"))
                }, 1e4)
              })), this._stopUsingSPHttpMSClient = a._SPKillSwitch.isActivated("14b96c7e-3dcc-42e8-8a42-f56091d1f9f3"), e.whenFinished(function() {
                t._spHttpClient = e.consume(m.SPHttpClient.serviceKey), t._stopUsingSPHttpMSClient || (t._spHttpMicroserviceClient = e.consume(T), t._spHttpMicroserviceClient.requestUpdater = t._requestUpdater), t._httpClient = e.consume(m.HttpClient.serviceKey), t._pageContext = e.consume(S.PageContext.serviceKey), t._isPrefetchTokenFlightEnabled && t._initializeWithPrefetchedToken(), t._isUserSupportedBySubstrate = t._isSubtrateSupportedUser(e.consume(S.PageContext.serviceKey).user)
              })
            }
            return e.prototype.get = function(e, t, n, i) {
              return i ? this._get(e, t, n, i) : this._get_deprecated(e, t, n)
            }, e.prototype.post = function(e, t, n, i, r) {
              return r ? this._post(e, t, n, i, r) : this._post_deprecated(e, t, n, i)
            }, Object.defineProperty(e.prototype, "isServiceAvailable", {
              get: function() {
                var e = this;
                return void 0 !== this._isServiceAvailable ? Promise.resolve(this._isServiceAvailable) : this._fetchTokenIfExpired().then(function() {
                  return e._isServiceAvailable = !0, e._isServiceAvailable
                }).catch(function(t) {
                  return e._isServiceAvailable = !1, e._isServiceAvailable
                })
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "isUserSupportedBySubstrate", {
              get: function() {
                return this._isUserSupportedBySubstrate
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype._get = function(e, t, n, i) {
              var r = this;
              if (!this._stopUsingSPHttpMSClient && this._spHttpMicroserviceClient) {
                var o = this._generateVersionedPath(e, t);
                return this._spHttpMicroserviceClient.get(o, new m.SPHttpClientConfiguration(m.HttpClient.configurations.v1, {}), this._getRequestOptions({}, n), this._getCacheConfiguration(i, o))
              }
              return this._fetchTokenIfExpired().then(function() {
                return r._spHttpClient.get(r._generateUrl(e, t), new m.SPHttpClientConfiguration(m.HttpClient.configurations.v1, {}), r._getRequestOptions({}, n), i)
              })
            }, e.prototype._get_deprecated = function(e, t, n) {
              var i = this;
              return this._fetchTokenIfExpired().then(function() {
                return E.isActivated() ? i._httpClient.get(i._generateUrl(e, t), m.HttpClient.configurations.v1, i._getRequestOptions({}, n)) : i._spHttpClient.get(i._generateUrl(e, t), new m.SPHttpClientConfiguration(m.HttpClient.configurations.v1, {}), i._getRequestOptions({}, n))
              })
            }, e.prototype._post = function(e, t, n, i, r) {
              var o = this;
              if (void 0 === t && (t = ""), !this._stopUsingSPHttpMSClient && this._spHttpMicroserviceClient) {
                var a = this._generateVersionedPath(e, n);
                return this._spHttpMicroserviceClient.fetch(a, new m.SPHttpClientConfiguration(m.HttpClient.configurations.v1, {}), this._getRequestOptions({
                  body: t
                }, i, "POST"), this._getCacheConfiguration(r, a))
              }
              return this._fetchTokenIfExpired().then(function() {
                return o._spHttpClient.fetch(o._generateUrl(e, n), new m.SPHttpClientConfiguration(m.HttpClient.configurations.v1, {}), o._getRequestOptions({
                  body: t
                }, i, "POST"), r)
              })
            }, e.prototype._post_deprecated = function(e, t, n, i) {
              var r = this;
              return void 0 === t && (t = ""), this._fetchTokenIfExpired().then(function() {
                return E.isActivated() ? r._httpClient.post(r._generateUrl(e, n), m.HttpClient.configurations.v1, r._getRequestOptions({
                  body: t
                }, i)) : r._spHttpClient.post(r._generateUrl(e, n), new m.SPHttpClientConfiguration(m.HttpClient.configurations.v1, {}), r._getRequestOptions({
                  body: t
                }, i))
              })
            }, e.prototype._getCacheConfiguration = function(e, t) {
              return e && (e.extraProps || (e.extraProps = new Map), e.extraProps.set(w.a.parentKeyOverride, t)), e
            }, e.prototype._generateUrl = function(t, n) {
              return void 0 === n && (n = 1), a.Text.format(e.MICROSERVICE_ENDPOINT, this._url, n, t)
            }, e.prototype._generateUrlVersionedPath = function(t) {
              return a.Text.format(e.MICROSERVICE_ENDPOINT_V, this._url, t)
            }, e.prototype._generateVersionedPath = function(t, n) {
              return void 0 === n && (n = 1), a.Text.format(e.VERSIONED_PATH, n, t)
            }, e.prototype._isTokenValid = function() {
              return this._tokenExpiry && this._tokenExpiry > new Date
            }, e.prototype._getTokenAndMicroserviceDetails = function() {
              var e, t = this,
                n = new c._QosMonitor("SPHomeHttpClient"),
                i = this._pageContext.web.absoluteUrl + "/_api/sphomeservice/context?$expand=Token,Payload";
              return this._spHttpClient.get(i, m.SPHttpClient.configurations.v1).then(function(t) {
                if (e = t.correlationId ? t.correlationId.toString() : void 0, t.ok) return t.json();
                var i = new Error(t.statusText);
                throw n.writeUnexpectedFailure("FailedResponse", i, {
                  correlationId: e,
                  Status: t.status
                }), i
              }).then(function(e) {
                if (!e.Token || !e.Token.access_token) throw t._isServiceAvailable = !1, new P;
                t._isServiceAvailable = !0, t._token = e.Token.access_token, t._tokenExpiry = new Date(1e3 * Number(e.Token.expires_on) - 15e3), t._payload = e.Payload, t._url = e.Urls[0], t._alreadyGettingTokenPromise = void 0, n.writeSuccess()
              }).catch(function(i) {
                throw i instanceof P ? n.writeExpectedFailure("NotAvailable", i, {
                  correlationId: e
                }) : n.writeUnexpectedFailure("SPHomeHttpClient", i, {
                  correlationId: e
                }), t._alreadyGettingTokenPromise = void 0, i
              })
            }, e.prototype._getRequestOptions = function(e, t, n) {
              var i;
              return void 0 === e && (e = {}), e.headers = e.headers || {}, this._token && (e.headers.Authorization = "Bearer " + this._token), this._payload && (e.headers["SPHome-ApiContext"] = this._payload), e.headers["Content-Type"] = "application/json", e.headers["SPHome-ClientType"] = "PagesWeb", (null === (i = this._pageContext) || void 0 === i ? void 0 : i.legacyPageContext) && (e.headers.FarmLabel = this._pageContext.legacyPageContext.farmLabel), n && (e.headers["X-HTTP-Method"] = n, e.method = n), t && t.forEach(function(t, n) {
                e.headers[n] = t
              }), e
            }, e.prototype._initializeWithPrefetchedToken = function() {
              var e = new c._QosMonitor("InitializeSpHomeClientContext");
              try {
                if (!this._hasPrefetchedToken)
                  if (window._spHomeClientContext && window._spHomeClientContext !== []) {
                    var t = window._spHomeClientContext,
                      n = t.Token;
                    this._token = n && n.AccessToken, this._payload = t.Payload, this._url = t.Urls && t.Urls[0], this._tokenExpiry = n && n.ExpiresOn && new Date(1e3 * Number(t.Token.ExpiresOn) - 15e3), this._hasPrefetchedToken = !0, e.writeSuccess()
                  } else window._spHomeClientContext === [] ? e.writeUnexpectedFailure("SPHomeClientContextNotAvailable", new Error("EmptyTokenReturned")) : e.writeExpectedFailure("SPHomeClientContextNotAvailable", new Error("TokenNotAvailable"))
              } catch (t) {
                this._hasPrefetchedToken = !1, e.writeUnexpectedFailure("InitializeSPHomeClientContextFailed", t.message)
              }
              return this._hasPrefetchedToken
            }, e.prototype._fetchTokenIfExpired = function() {
              if (this._isTokenValid()) return Promise.resolve();
              if (!this._alreadyGettingTokenPromise)
                if (this._isPrefetchTokenFlightEnabled) {
                  var e = a.Guid.parse("928806ac-3e49-4e4e-9114-7c392215230f"),
                    t = a.Guid.parse("5ff931f9-8682-4614-b4f1-9b8d1aa74942"),
                    n = [{
                      raceablePromise: this._initializeFromPrefetchedToken,
                      raceId: e
                    }, {
                      raceablePromise: this._getTokenAndMicroserviceDetails(),
                      raceId: t
                    }];
                  this._alreadyGettingTokenPromise = u.SmartRace.race(n).then(function(e) {
                    return e.raceablePromise
                  }).catch(function(e) {
                    throw e
                  })
                } else this._alreadyGettingTokenPromise = this._getTokenAndMicroserviceDetails();
              return this._alreadyGettingTokenPromise
            }, Object.defineProperty(e.prototype, "_isPrefetchTokenFlightEnabled", {
              get: function() {
                return a._SPFlight.isEnabled(1265)
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype._isSubtrateSupportedUser = function(e) {
              if (e) {
                var t = e.isAnonymousGuestUser,
                  n = e.isExternalGuestUser;
                return !t && !n
              }
              return !0
            }, e.serviceKey = a.ServiceKey.create("sp-component-utilities:SPHomeHttpClient", e), e.MICROSERVICE_ENDPOINT = "{0}/api/v{1}/{2}", e.MICROSERVICE_ENDPOINT_V = "{0}/api/{1}", e.VERSIONED_PATH = "v{0}/{1}", e
          }(),
          x = n("Tpx+"),
          D = n("05y5"),
          A = function() {
            function e(e, t) {
              this._cacheStrategy = m._CacheStrategy.CacheAndNetwork, this._processRawData = function(e) {
                return e
              }, a.Validate.isNotNullOrUndefined(e, "serviceScope"), a.Validate.isNonemptyString(t, "qosPrefix"), this._serviceScope = e, this._spHomeHttpClient = this._serviceScope.consume(O.serviceKey), this._qosPrefix = t, this._indexedDBEnabled = !Object(l.B)() && Object(x.a)(), this._useExtraQosData = !Object(l.l)()
            }
            return e.prototype.getTopicEntity = function(e, t, n) {
              var i = this;
              void 0 === n && (n = 8);
              var r = new c._QosMonitor(this._qosPrefix + ".GetTopicById.DP"),
                o = t ? "knowledgebase/entities('{0}')/mined(relationCount=" + n + ")" : "knowledgebase/entities('{0}')";
              if (this._indexedDBEnabled) {
                var s = {
                  alias: "FirstParty_KMTopicEntityDP",
                  id: e,
                  expirationDuration: d.k.topicCacheDuration,
                  cacheStrategy: this._cacheStrategy,
                  extraProps: new Map([
                    [D.a.onlyIndexedDB, !0]
                  ])
                };
                return this._spHomeHttpClient.get(a.Text.format(o, e), 2, void 0, s).then(function(e) {
                  return i._processResponse(e, r)
                }).catch(function(e) {
                  throw r.writeUnexpectedFailure("FailedGetTopicEntity", e), e
                })
              }
              return this._spHomeHttpClient.get(a.Text.format(o, e), 2).then(function(e) {
                return i._processServerResponse(e, r)
              }).catch(function(e) {
                throw r.writeUnexpectedFailure("FailedGetTopicEntity", e), e
              })
            }, e.prototype._processResponse = function(e, t) {
              return D.a.parseClientCachableResponse(e, this._isRawData, this._isCachedDataEmpty, this._processRawData, t, this._qosPrefix)
            }, e.prototype._processServerResponse = function(e, t) {
              return e.ok ? (t.writeSuccess(Object(l.a)() ? void 0 : this._getExtraData(e)), e.json()) : 403 !== e.status ? (t.writeUnexpectedFailure("TopicEntityResponseFailure", new Error(JSON.stringify(e.body)), Object(l.a)() ? void 0 : this._getExtraData(e)), Promise.reject(new Error("TopicEntity API Failure: " + e.status + ": " + e.statusText))) : void t.writeExpectedFailure("TopicEntityResponseFailure", new Error(JSON.stringify(e.body)), this._getExtraData(e))
            }, e.prototype._isRawData = function(e) {
              return e && e.Id
            }, e.prototype._isCachedDataEmpty = function(e) {
              return !e.Id || !e.Name
            }, e.prototype._getExtraData = function(e) {
              return this._useExtraQosData ? {
                mscv: e.headers.get("ms-cv"),
                status: e.status
              } : void 0
            }, e
          }()
      },
      oUEy: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
          return i
        }), n.d(t, "b", function() {
          return r
        }), n.d(t, "g", function() {
          return o
        }), n.d(t, "f", function() {
          return a
        }), n.d(t, "e", function() {
          return c
        }), n.d(t, "d", function() {
          return s
        }), n.d(t, "a", function() {
          return u
        });
        var i = "CSIKM.Substrate",
          r = "DP",
          o = "X-Debug-UseYukonHighlightApi",
          a = "X-Debug-UseYukonAndTopicPredictor",
          c = "X-SPDF-TestFeedback",
          s = "https://microsoft.sharepoint-df.com/teams/knowledgehub",
          u = "https://microsoft.sharepoint.com/sites/knowledgecenter"
      },
      "pR+h": function(e) {
        e.exports = JSON.parse('{"a":"Topic {0}."}')
      },
      q1Tm: function(e, t, n) {
        "use strict";
        e.exports = function(e) {
          var t = [];
          return t.toString = function() {
            return this.map(function(t) {
              var n = function(e, t) {
                var n, i, r, o = e[1] || "",
                  a = e[3];
                if (!a) return o;
                if (t && "function" == typeof btoa) {
                  var c = (n = a, i = btoa(unescape(encodeURIComponent(JSON.stringify(n)))), r = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i), "/*# ".concat(r, " */")),
                    s = a.sources.map(function(e) {
                      return "/*# sourceURL=".concat(a.sourceRoot).concat(e, " */")
                    });
                  return [o].concat(s).concat([c]).join("\n")
                }
                return [o].join("\n")
              }(t, e);
              return t[2] ? "@media ".concat(t[2], "{").concat(n, "}") : n
            }).join("")
          }, t.i = function(e, n) {
            "string" == typeof e && (e = [
              [null, e, ""]
            ]);
            for (var i = {}, r = 0; r < this.length; r++) {
              var o = this[r][0];
              null != o && (i[o] = !0)
            }
            for (var a = 0; a < e.length; a++) {
              var c = e[a];
              null != c[0] && i[c[0]] || (n && !c[2] ? c[2] = n : n && (c[2] = "(".concat(c[2], ") and (").concat(n, ")")), t.push(c))
            }
          }, t
        }
      },
      r7AW: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return h
        });
        var i, r = n("ut3N"),
          o = n("2q6Q"),
          a = n("UWqr"),
          c = n("vlQI"),
          s = n("hiL/"),
          u = n("hrbp"),
          d = n("Pk8u"),
          l = n("NDxI");
        ! function(e) {
          e[e.BadRequest = 400] = "BadRequest", e[e.Conflict = 409] = "Conflict", e[e.Forbidden = 403] = "Forbidden", e[e.NotFound = 404] = "NotFound", e[e.NotAcceptable = 406] = "NotAcceptable", e[e.ServerError = 500] = "ServerError", e[e.RequestEntityTooLarge = 413] = "RequestEntityTooLarge", e[e.NotImplemented = 501] = "NotImplemented"
        }(i || (i = {}));
        var p, f = i,
          _ = n("6DK4"),
          h = function() {
            function e(e, t) {
              this._logSource = r._LogSource.create("CSIKM.CreateTopicDataProvider"), this._pageContext = e, this._serviceScope = t, this._spHttpClient = t.consume(c.SPHttpClient.serviceKey)
            }
            return e._getOdataRestApiError = function(e, t) {
              var n;
              void 0 === t && (t = f.ServerError);
              var i = e["odata.error"];
              return (null === (n = i) || void 0 === n ? void 0 : n.message) ? new l.a("Message: " + i.message.value, t, i.code) : void 0
            }, e.prototype.createTopicPage = function(e) {
              var t = e.topic,
                n = e.canvasContent1,
                i = this._restTopicsEndPointUrl,
                r = new b({
                  Title: t.Name,
                  EntityId: t.Id !== s.NULL_TOPIC_ENTITY.Id ? t.Id : "",
                  EntityType: "Project",
                  EntityRelations: s.EntityRelationsService.getRelationsAsString(this._serviceScope),
                  LayoutWebpartsContent: JSON.stringify(u.a.getLayoutWebPartData(t, this._pageContext)),
                  CanvasContent1: JSON.stringify(n),
                  TopicHeader: "Topic",
                  BannerImageUrl: "/_layouts/15/images/sitepagethumbnail.png",
                  PageLayoutType: "Topic"
                });
              return this._createPage(i, new g("POST"), JSON.stringify(r), "createTopicPage")
            }, e.prototype._createPage = function(t, n, i, a) {
              var s = new o._QosMonitor(e.componentName),
                u = {
                  body: i,
                  headers: n
                };
              return r._TraceLogger.logVerbose(this._logSource, a), this._spHttpClient.post(t, c.SPHttpClient.configurations.v1, u).then(function(t) {
                if (!t.ok) throw new l.a(_.a(t), t.status);
                return t.json().then(function(n) {
                  var i, r = e._getOdataRestApiError(n, null === (i = t) || void 0 === i ? void 0 : i.status);
                  if (r) throw r;
                  return n
                })
              }).catch(function(e) {
                throw e.status === f.Forbidden ? s.writeExpectedFailure("FailedResponseForbidden", e) : s.writeUnexpectedFailure("FailedResponseStatus", e), e
              })
            }, Object.defineProperty(e.prototype, "_webServerRelativeUrl", {
              get: function() {
                return a.UrlUtilities.removeEndSlash(this._pageContext.legacyPageContext.webServerRelativeUrl)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "_restSitePagesEndPointUrl", {
              get: function() {
                return this._webServerRelativeUrl + "/_api/sitepages/pages"
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "_restTopicsEndPointUrl", {
              get: function() {
                return this._restSitePagesEndPointUrl + "/topics"
              },
              enumerable: !0,
              configurable: !0
            }), e.componentName = "CSIKM.CreateNewTopic", e
          }(),
          g = function(e) {
            this["OData-Version"] = "3.0", this["If-Match"] = "*", this["X-HTTP-Method"] = e
          },
          b = function() {
            function e(e) {
              this.__metadata = {
                type: "SP.Publishing.TopicSitePage"
              }, e && Object(d.assign)(this, e)
            }
            return e.prototype.toString = function() {
              return JSON.stringify(this)
            }, e
          }();
        ! function(e) {
          e[e.NotPromoted = 0] = "NotPromoted", e[e.PromoteOnPublish = 1] = "PromoteOnPublish", e[e.Promoted = 2] = "Promoted"
        }(p || (p = {}))
      },
      rMgv: function(e, t, n) {
        "use strict";
        n.d(t, "g", function() {
          return r
        }), n.d(t, "h", function() {
          return o
        }), n.d(t, "i", function() {
          return a
        }), n.d(t, "a", function() {
          return c
        }), n.d(t, "b", function() {
          return s
        }), n.d(t, "j", function() {
          return u
        }), n.d(t, "c", function() {
          return d
        }), n.d(t, "l", function() {
          return l
        }), n.d(t, "e", function() {
          return p
        }), n.d(t, "d", function() {
          return f
        }), n.d(t, "f", function() {
          return _
        });
        var i = function() {
          function e() {}
          return e.topicViewerConfirmedTopicsLogPrefix = "CSKIM.TopicViewer.ConfirmedTopics.DP", e.topicViewerUnconfirmedTopicsLogPrefix = "CSKIM.TopicViewer.UnconfirmedTopics.DP", e.topicViewerExcludedTopicsLogPrefix = "CSKIM.TopicViewer.ExcludedTopics.DP", e.topicPagePreviewStubFileName = "TopicPagePreview.aspx", e.createTopicPageStubFileName = "CreateTopicPage.aspx", e.newPageStubFileName = "newpage.aspx", e.layoutsPagePrefix = "_layouts/15/", e.topicCacheDuration = 864e5, e.kmTopicIdAttribute = "data-sp-topic-id", e.kmHashtaggedTopicIdAttribute = "data-sp-hashtagged-topic-id", e.kmTopicCardAttribute = "data-sp-topic-card", e.kmAnnotateLogPrefix = "CSIKM.Annotate", e.kmTopicPickerLogPrefix = "CSIKM.TopicPicker", e.kmTopicCenterLogPrefix = "CSIKM.TopicCenter", e.kmFeedbackLogPrefix = "CSIKM.Feedback", e.kmTopicCardLogPrefix = "CSIKM.TopicCard", e.kmTopicPageLogPrefix = "CSIKM.TopicPage", e.kmTopicCacheLogPrefix = "CSIKM.TopicCache", e.timeZoneStartIndexInDatetime = 19, e.pageVersionParam = "version", e.pageVersionCompareFromParam = "versionCompareFrom", e.pageVersionCompareToParam = "versionCompareTo", e.currentTopicLoadedEvent = "CurrentTopicLoadedEvent", e.ascending = 1, e.descending = 2, e.onAnnotateTitleEventName = "onAnnotateTitle_Cortex", e
        }();
        t.k = i;
        var r = "topic_related_people",
          o = "topic_related_resources",
          a = "_",
          c = {
            Curated: "Curated",
            NotCurated: "NotCurated"
          },
          s = {
            MinedDefinition: "MinedDefinition",
            Definition: "Definition",
            NoDefinition: "NoDefinition"
          },
          u = {
            TopicId: "topicId",
            TopicName: "topicName",
            LinkSource: "ls",
            ShowAllTopics: "showAllTopics",
            TopicsCount: "top",
            SkipCount: "skip"
          },
          d = {
            Annotation: "ANNOTATION",
            TopicCard: "CARD",
            TopicManagement: "MGMT",
            GraphWebPart: "GRAPH",
            MyTopics: "MYTOPICS"
          },
          l = window.innerWidth < 640,
          p = 2,
          f = 2,
          _ = "Empty response from substrate getTopicById api"
      },
      ut3N: function(e, t) {
        e.exports = p
      },
      vlQI: function(e, t) {
        e.exports = f
      },
      "w4+A": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return r
        }), n.d(t, "b", function() {
          return o
        });
        var i = n("UWqr");
  
        function r(e) {
          return i._SPFlight.isEnabled(e)
        }
  
        function o() {
          return i._SPFlight.isEnabled(1442)
        }
      },
      y88i: function(e, t) {
        e.exports = _
      }
    })
  });