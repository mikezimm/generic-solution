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



define(["tslib", "@ms/sp-telemetry", "@microsoft/sp-component-base", "@microsoft/office-ui-fabric-react-bundle", "@microsoft/sp-lodash-subset", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-embed-webpart-base", "@ms/sp-component-utilities", "@microsoft/load-themed-styles", "@ms/sp-html-embed", "@microsoft/sp-diagnostics", "@microsoft/sp-http", "@ms/odsp-utilities-bundle"], function(e, t, r, i, o, a, n, s, d, l, c, h, _, p, m, u, f) {
    return function(e) {
      var t = {};
  
      function r(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
          i: i,
          l: !1,
          exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.l = !0, o.exports
      }
      return r.m = e, r.c = t, r.d = function(e, t, i) {
        r.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: i
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
        var i = Object.create(null);
        if (r.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var o in e) r.d(i, o, function(t) {
            return e[t]
          }.bind(null, o));
        return i
      }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e.default
        } : function() {
          return e
        };
        return r.d(t, "a", t), t
      }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, r.p = "", r(r.s = "pg8z")
    }({
      "0zOQ": function(e, t, r) {
        (e.exports = r("q1Tm")(!1)).push([e.i, '.a_a_1290c3e3{background-color:"[theme:black, default: #000000]"}.b_a_1290c3e3{font-size:12px;font-weight:400;color:#a80000;margin:0}.c_a_1290c3e3{color:#d83b01}.e_a_1290c3e3{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.f_a_1290c3e3{-ms-flex-positive:1;flex-grow:1}.g_a_1290c3e3{vertical-align:top;top:11px;position:relative;-ms-flex:none;flex:none;height:100%;outline:0}.h_a_1290c3e3{background:linear-gradient(180deg,rgba(0,0,0,.75) 1.2%,rgba(0,0,0,.55) 39.1%,transparent 99.28%,transparent 0);overflow:hidden;display:-ms-flexbox;display:flex;position:absolute;top:0;width:100%;height:100%}[dir=ltr] .h_a_1290c3e3{left:0}[dir=rtl] .h_a_1290c3e3{right:0}.i_a_1290c3e3{color:#fff;font-family:Segoe UI;font-style:normal;font-weight:600;font-size:24px;line-height:32px;margin-left:14px;margin-top:8px;margin-right:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.j_a_1290c3e3{position:relative;background-color:#000;width:100%;height:0;min-height:200px;padding:0 8px 56.25%;overflow:hidden;box-sizing:border-box}.j_a_1290c3e3 .Placeholder-container{color:#fff;position:absolute;width:100%;height:100%;top:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex-flow:column;flex-flow:column}[dir=ltr] .j_a_1290c3e3 .Placeholder-container{left:0}[dir=rtl] .j_a_1290c3e3 .Placeholder-container{right:0}.j_a_1290c3e3 .Placeholder-container .Placeholder-head{width:100%}.j_a_1290c3e3 .Placeholder-container .Placeholder-head .Placeholder-headContainer{white-space:nowrap;text-align:center}.j_a_1290c3e3 .Placeholder-container .Placeholder-head .Placeholder-icon{display:inline-block;vertical-align:middle;white-space:normal;font-size:28px;font-weight:100}.j_a_1290c3e3 .Placeholder-container .Placeholder-head .Placeholder-text{display:inline-block;vertical-align:middle;white-space:normal;font-size:24px;max-width:70%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}[dir=ltr] .j_a_1290c3e3 .Placeholder-container .Placeholder-head .Placeholder-text{padding-left:14px}[dir=rtl] .j_a_1290c3e3 .Placeholder-container .Placeholder-head .Placeholder-text{padding-right:14px}.j_a_1290c3e3 .Placeholder-container .Placeholder-body{white-space:nowrap;text-align:center;padding-top:15px}.j_a_1290c3e3 .Placeholder-container .Placeholder-body .Placeholder-playButton-container{display:-ms-inline-flexbox;display:inline-flex;border:2px solid #fff;border-radius:50%;width:65px;height:65px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.j_a_1290c3e3 .Placeholder-container .Placeholder-body .Placeholder-playButton-container .Placeholder-playButton-icon{font-size:40px}.k_a_1290c3e3{position:relative;background-color:#000;width:100%;height:0;min-height:200px;padding:0 8px 56.25%;overflow:hidden;box-sizing:border-box}.k_a_1290c3e3 .Placeholder-container{position:absolute;width:100%;height:100%;top:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex-flow:column;flex-flow:column}[dir=ltr] .k_a_1290c3e3 .Placeholder-container{left:0}[dir=rtl] .k_a_1290c3e3 .Placeholder-container{right:0}.k_a_1290c3e3 .Placeholder-container .Placeholder-backplate{background:linear-gradient(180deg,rgba(0,0,0,.75) 1.2%,rgba(0,0,0,.55) 39.1%,transparent 99.28%,transparent 0);overflow:hidden;display:-ms-flexbox;display:flex;position:absolute;top:0;width:100%;height:100%}[dir=ltr] .k_a_1290c3e3 .Placeholder-container .Placeholder-backplate{left:0}[dir=rtl] .k_a_1290c3e3 .Placeholder-container .Placeholder-backplate{right:0}.k_a_1290c3e3 .Placeholder-container .Placeholder-backplate .Placeholder-title{color:#fff;font-family:Segoe UI;font-style:normal;font-weight:600;font-size:24px;line-height:32px;margin-left:14px;margin-top:8px;margin-right:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.k_a_1290c3e3 .Placeholder-container .Placeholder-playButton-container{color:#fff;display:-ms-inline-flexbox;display:inline-flex;border:2px solid #fff;border-radius:50%;width:65px;height:65px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;z-index:2}.k_a_1290c3e3 .Placeholder-container .Placeholder-playButton-container .Placeholder-playButton-icon{font-size:40px}', ""])
      },
      "17wl": function(t, r) {
        t.exports = e
      },
      "2q6Q": function(e, r) {
        e.exports = t
      },
      "7Awa": function(e, t) {
        e.exports = r
      },
      "8Aeb": function(e) {
        e.exports = JSON.parse('{"T":"Office 365 Video","V":"Display an Office 365 Video on your page. Find the video you want on the Office 365 Video portal, and then paste its web address below.","W":"Display videos from your organization\\u0027s Microsoft Stream video portal. You can show top videos or find a specific video or channel in Stream, and paste its web address below.","U":"Video address","f":"Channel address","R":"Show title and video info","A":"This link doesn’t seem to be from your organization’s Office 365 Video portal. Check the address and try again.","D":"Office 365 Video portal:","C":"Office 365 Video will be retired on March 1, 2021","B":"Learn more","Y":"O365 Video Preview.","k":"Office 365 Video","i":"Microsoft Stream","j":"Display a video from your organization\\u0027s Office 365 Video channels, so people can watch it directly on your page.","l":"Display videos from your Microsoft Stream video portal.","b":"Add video","c":"Add video or channel","s":"Paste either website address or embed code here","x":"Paste Office 365 Video address here","z":"Play start time for the Stream video.","v":"Paste Stream video address here","u":"Paste Stream channel address here","a":"{0} {1}.","w":"https://contoso.sharepoint.com/portals/hub/...","y":"hh:mm:ss","t":"https://web.microsoftstream.com/...","h":"Embedded the content successfully","S":"Embedded the video successfully","Q":"This is a multiline text box.","r":"Go to Microsoft Stream","E":"This seems like the web address for a video channel, which can contain several videos. Click on the video you want to display from that channel and paste that address instead.","F":"We recognize the URL you providing is the site URL of your organization O365 Video portal. Please provide specific video file URL to us.","L":"Source","n":"This address doesn\\u0027t seem to be a Stream video. Check the address and try again.","m":"This address doesn\\u0027t seem to be a Stream channel. Check the address and try again.","O":"Single video","N":"Channel","P":"Start at","e":"Embedded the channel successfully","q":"Can\\u0027t access Stream.","d":"Browse channel","I":"Sort by","J":"Trending","H":"Publish date","K":"Views","G":"Likes","M":"All of Stream","p":"Filter search term","o":"Enter a search term to filter video results.","X":"View more in Stream","g":"Stream videos"}')
      },
      AmIq: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r("17wl"),
          o = r("UWqr"),
          a = i.__importDefault(r("iZ/7")),
          n = i.__importStar(r("EB4i")),
          s = function() {
            function e(e) {
              this._context = e, this._dispose = this._dispose.bind(this), window.addEventListener("unload", this._dispose)
            }
            return e._getCorrelationId = function(e) {
              return e.headers.get("sprequestguid")
            }, e._extractRealError = function(e) {
              return e.hasOwnProperty("error") ? e.error : e
            }, e.prototype.getOAuthToken = function(e, t, r) {
              var i = this,
                o = this._getCachedTokenData(e);
              return o && !this._isExpiring(o) ? Promise.resolve({
                token: o.accessToken,
                isGuest: !1,
                expirationTimeMs: o.expiresOn,
                _correlationId: o.correlationId
              }) : this._retriableFetchWithDigest(e, a.default.retries, t, r).then(function(t) {
                return i._storeTokenData(e, t), {
                  token: t.accessToken,
                  isGuest: !1,
                  expirationTimeMs: t.expiresOn,
                  _correlationId: t.correlationId
                }
              })
            }, e.prototype.clearCachedToken = function(e) {
              var t = this._getCacheKey(e);
              window.sessionStorage.removeItem(t);
              var r = this._resourceKeys.indexOf(t);
              !isNaN(r) && r > -1 && this._resourceKeys.splice(r)
            }, Object.defineProperty(e.prototype, "_resourceKeys", {
              get: function() {
                return this._keysToDispose || (this._keysToDispose = new Array), this._keysToDispose
              },
              enumerable: !1,
              configurable: !0
            }), e.prototype._retriableFetchWithDigest = function(t, r, i, a) {
              var s, d = this,
                l = this._context.qosMonitor();
              return this._context.fetchWithDigest(this._buildTokenRequest(t, i, a)).then(function(c) {
                if (s = {
                    CorrelationId: e._getCorrelationId(c),
                    resource: t
                  }, 200 !== c.status) {
                  d._context.logger.logError("fetchWithDigest failed. Server responded with " + c.statusText);
                  var h = new n.default(n.OAuthUtilityErrorType.unknownError, {
                    httpResponseStatus: c.status,
                    message: c.statusText,
                    correlationId: e._getCorrelationId(c)
                  });
                  return o._SPKillSwitch.isActivated("13621315-ff1d-45a5-a115-c607c98657a4") || 403 !== c.status ? 400 !== c.status ? (l.writeUnexpectedFailure("UnknownError", h, s), Promise.reject(h)) : c.json().then(function(o) {
                    var n = e._extractRealError(o),
                      c = d._getErrorCodeFromResponseCode(n);
                    if (!d._isRetriableError(c) || 0 === r) {
                      var h = d._buildErrorFromResponse(n);
                      return l.writeUnexpectedFailure("SharepointServerError", h, s), Promise.reject(h)
                    }
                    return d._context.logger.logError("fetchWithDigest failed. Retrying. Retries left: " + r), d._retriableFetchWithDigest(t, r - 1, i, a)
                  }) : (l.writeExpectedFailure("Unauthorized", h, s), Promise.reject(h))
                }
                return d._instrumentedParseResponseData(c, l, s)
              })
            }, e.prototype._getCachedTokenData = function(e) {
              return JSON.parse(window.sessionStorage.getItem(this._getCacheKey(e)))
            }, e.prototype._storeTokenData = function(e, t) {
              window.sessionStorage.setItem(this._getCacheKey(e), JSON.stringify(t))
            }, e.prototype._getCacheKey = function(e) {
              var t = ["sp-client-shared", a.default.npmPackageVersion, "OAuthUtility", e].join(";");
              return -1 === this._resourceKeys.indexOf(t) && this._resourceKeys.push(t), t
            }, e.prototype._isExpiring = function(e) {
              return e.expiresOn - Date.now() / 1e3 < a.default.aboutToExpireIntervalSeconds
            }, e.prototype._isRetriableError = function(e) {
              return -1 !== a.default.retriableErrorCodes.indexOf(e)
            }, e.prototype._buildTokenRequest = function(e, t, r) {
              var i = new Headers;
              i.append("Content-Type", "application/json; charset=utf-8"), i.append("Odata-Version", "4.0"), i.append("Accept", "application/json;odata.metadata=minimal");
              var o = {
                  method: "POST",
                  headers: i,
                  body: JSON.stringify(this._buildRequestBody(e, r))
                },
                n = t;
              return n && n.lastIndexOf("/") === n.length - 1 && (n = n.substr(0, n.length - 1)), new Request(n + a.default.apiUrl, o)
            }, e.prototype._buildRequestBody = function(e, t) {
              return o._SPKillSwitch.isActivated("d0b667ec-278c-4551-bada-5c5e34f466b1") ? {
                resource: e
              } : {
                resource: e,
                tokenType: t
              }
            }, e.prototype._buildErrorFromResponse = function(e) {
              var t, r, i = this._getErrorCodeFromResponseCode(e);
              return void 0 === i ? new n.default(n.OAuthUtilityErrorType.malformedResponseBody, {
                httpResponseStatus: 400,
                message: a.default.unexpectedErrorCodeFormat,
                correlationId: e.correlationId
              }) : (e.message && ("string" == typeof e.message ? t = e.message : (t = e.message.value, r = e.message.lang)), new n.default(n.OAuthUtilityErrorType.serverError, {
                httpResponseStatus: 400,
                message: t,
                cultureName: r,
                serverErrorCode: i,
                correlationId: e.correlationId,
                redirectUrl: e["error.redirectUrl"] || e["@error.redirectUrl"]
              }))
            }, e.prototype._getErrorCodeFromResponseCode = function(e) {
              var t = e.code,
                r = Number(t);
              if (isNaN(r) && "string" == typeof e.message) {
                var i = t.indexOf(","); - 1 !== i && (r = Number(t.substr(0, i)))
              }
              return r
            }, e.prototype._instrumentedParseResponseData = function(t, r, i) {
              return Promise.resolve().then(function() {
                return t.ok ? t.json() : Promise.reject(new Error(t.statusText))
              }).then(function(o) {
                return r.writeSuccess(i), {
                  accessToken: o.access_token,
                  correlationId: e._getCorrelationId(t),
                  expiresOn: Number(o.expires_on),
                  notBefore: Number(o.not_before),
                  resource: o.resource,
                  tokenType: o.token_type
                }
              }).catch(function(o) {
                throw r.writeUnexpectedFailure("ResponseParseError", o, i), new n.default(n.OAuthUtilityErrorType.malformedResponseBody, {
                  httpResponseStatus: t.status,
                  message: a.default.unexpectedTokenMessageFormat,
                  correlationId: e._getCorrelationId(t)
                })
              })
            }, e.prototype._dispose = function(e) {
              window.removeEventListener("unload", this._dispose);
              for (var t = 0, r = this._resourceKeys; t < r.length; t++) {
                var i = r[t];
                window.sessionStorage.removeItem(i)
              }
            }, e
          }();
        t.default = s
      },
      Dg0b: function(e) {
        e.exports = JSON.parse('{"e":"Show a Kindle instant book preview by pasting its embed code.","d":"Kindle instant preview embed code","i":"<iframe width=\\u0022853\\u0022 height=\\u0022480\\u0022 src=\\u0022https://read.amazon.com/...\\u0022 > </iframe>","s":"Show share button","r":"Show buy button","a":"Add associate ID (optional)","f":"Show a sample of a Kindle book","b":"Add preview","g":"Kindle instant preview","h":"This is not a valid Kindle instant preview link. Find your Kindle book, and then click Embed to get a valid link.","l":"Learn more about embedding Kindle Previews","m":"https://go.microsoft.com/fwlink/?linkid=858987","t":"Size of preview","u":"Small (212x362)","n":"Medium (250x418)","k":"Large (336x550)","c":"Size to fit","j":"Must be at least 4 characters","q":"Show book content","o":"In place","p":"In a new tab"}')
      },
      EB4i: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.OAuthUtilityErrorType = void 0;
        var i, o = r("17wl");
        ! function(e) {
          e[e.unknownError = 0] = "unknownError", e[e.malformedResponseBody = 1] = "malformedResponseBody", e[e.serverError = 2] = "serverError"
        }(i = t.OAuthUtilityErrorType || (t.OAuthUtilityErrorType = {}));
        var a = function(e) {
          function t(r, i) {
            var o = e.call(this, i.message) || this;
            return o.__proto__ = t.prototype, o._type = r, o._httpResponseStatus = i.httpResponseStatus, o._cultureName = i.cultureName, o._message = i.message, o._serverErrorCode = i.serverErrorCode, o._correlationId = i.correlationId, o._redirectUrl = i.redirectUrl, o
          }
          return o.__extends(t, e), Object.defineProperty(t.prototype, "type", {
            get: function() {
              return this._type
            },
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(t.prototype, "serverErrorCode", {
            get: function() {
              if (this.type !== i.serverError) throw new Error("ServerErrorCode can only be obtained for errors of type serverError");
              return this._serverErrorCode
            },
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(t.prototype, "httpResponseStatus", {
            get: function() {
              return this._httpResponseStatus
            },
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(t.prototype, "message", {
            get: function() {
              return this._message
            },
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(t.prototype, "cultureName", {
            get: function() {
              return this._cultureName
            },
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(t.prototype, "correlationId", {
            get: function() {
              return this._correlationId
            },
            enumerable: !1,
            configurable: !0
          }), Object.defineProperty(t.prototype, "redirectUrl", {
            get: function() {
              return this._redirectUrl
            },
            enumerable: !1,
            configurable: !0
          }), t
        }(Error);
        t.default = a
      },
      Eozn: function(e, t, r) {
        var i = r("0zOQ"),
          o = r("jOlS");
        "string" == typeof i && (i = [
          [e.i, i]
        ]);
        for (var a = 0; a < i.length; a++) o.loadStyles(i[a][1], !0);
        i.locals && (e.exports = i.locals)
      },
      KL1q: function(e, t) {
        e.exports = i
      },
      Pk8u: function(e, t) {
        e.exports = o
      },
      U4ag: function(e, t) {
        e.exports = a
      },
      UWqr: function(e, t) {
        e.exports = n
      },
      Uejs: function(e) {
        e.exports = JSON.parse('{"a":"Stream"}')
      },
      X89z: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r("17wl"),
          o = r("br4S"),
          a = r("UWqr"),
          n = r("fwx1"),
          s = new Map([
            [1, {
              height: 362,
              width: 212
            }],
            [2, {
              height: 418,
              width: 250
            }],
            [3, {
              height: 550,
              width: 336
            }],
            [4, void 0]
          ]);
  
        function d(e) {
          return s.get(e)
        }
        var l = r("Pk8u"),
          c = function() {
            function e() {}
            return e.amazonPreviewDomains = [Object(l.escapeRegExp)("read.amazon.com"), Object(l.escapeRegExp)("read.amazon.in")], e.hideShareParam = "hideShare", e.hideBuyParam = "hideBuy", e.associateIDParam = "tag", e.previewParam = "preview", e.minLengthAssociateID = 4, e.maxLengthAssociateID = 64, e.maxCanvasAdditionalWidth = 100, e
          }(),
          h = r("8Aeb"),
          _ = r("Dg0b"),
          p = function(e) {
            function t() {
              var t = e.call(this) || this;
              return t._hidePreviewOptions = !0, t._hideShareToggle = !1, t._validateAssociateID = t._validateAssociateID.bind(t), t
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "acceptedDomains", {
              get: function() {
                return c.amazonPreviewDomains
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "embedStrings", {
              get: function() {
                return t._embedStrings
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.populateRunTimeState = function(e) {
              if (this._latestValidEmbedCodeHtml) {
                var t = n.HTMLEmbed.htmlAttrSplit(this._latestValidEmbedCodeHtml);
                return this._createRunTimeState(t)
              }
              return {
                showBuyButton: !0,
                showShareButton: !0,
                associateId: "",
                preview: "newtab",
                size: 4
              }
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  captionText: {
                    isSearchablePlainText: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getPropertyPaneConfiguration = function() {
              var e = !this.properties.embedCode;
              return {
                pages: [{
                  header: {
                    description: _.e
                  },
                  groups: [{
                    groupFields: [Object(o.PropertyPaneTextField)("embedCode", {
                      label: _.d,
                      multiline: !0,
                      onGetErrorMessage: this.validateEmbeddableCode.bind(this),
                      deferredValidationTime: 2e3,
                      placeholder: _.i,
                      ariaLabel: a.Text.format(h.a, h.s, h.Q),
                      rows: 8
                    }), Object(o.PropertyPaneLink)("embedCodeLink", {
                      text: _.l,
                      href: _.m,
                      target: "_blank"
                    }), Object(o.PropertyPaneDropdown)("runtimeState.size", {
                      label: _.t,
                      options: [{
                        key: 1,
                        text: _.u
                      }, {
                        key: 2,
                        text: _.n
                      }, {
                        key: 3,
                        text: _.k
                      }, {
                        key: 4,
                        text: _.c
                      }],
                      disabled: e
                    }), Object(o.PropertyPaneDropdown)("runtimeState.preview", {
                      label: _.q,
                      options: [{
                        key: "inline",
                        text: _.o
                      }, {
                        key: "newtab",
                        text: _.p
                      }],
                      disabled: this._hidePreviewOptions || e
                    }), Object(o.PropertyPaneToggle)("runtimeState.showBuyButton", {
                      label: _.r,
                      disabled: e
                    }), Object(o.PropertyPaneToggle)("runtimeState.showShareButton", {
                      label: _.s,
                      disabled: this._hideShareToggle || e
                    }), Object(o.PropertyPaneTextField)("runtimeState.associateId", {
                      label: _.a,
                      multiline: !1,
                      deferredValidationTime: 500,
                      maxLength: c.maxLengthAssociateID,
                      onGetErrorMessage: this._validateAssociateID,
                      disabled: e
                    })]
                  }]
                }]
              }
            }, t.prototype.onPropertyPaneFieldChanged = function(e, t, r) {
              if (-1 !== e.indexOf("runtimeState")) {
                switch (e.replace("runtimeState.", "")) {
                  case "showBuyButton":
                    this.properties.runtimeState.showBuyButton = r, this._hidePreviewOptions = !(r && 3 === this.properties.runtimeState.size), this._hidePreviewOptions && (this.properties.runtimeState.preview = "newtab");
                    break;
                  case "showShareButton":
                    this.properties.runtimeState.showShareButton = r;
                    break;
                  case "associateId":
                    this.properties.runtimeState.associateId = r;
                    break;
                  case "size":
                    this.properties.runtimeState.size = r, this._hidePreviewOptions = !(3 === r && this.properties.runtimeState.showBuyButton), this._hideShareToggle = 2 === r || 1 === r, this._hideShareToggle && (this.properties.runtimeState.showShareButton = !1), this._hidePreviewOptions && (this.properties.runtimeState.preview = "newtab")
                }
                this._latestValidEmbedCodeHtml = this._generateIframeEmbedCode()
              } else "embedCode" === e && r && r !== t && (this.properties.runtimeState = this.populateRunTimeState(this.properties))
            }, t.prototype._applyRuntimeStateToEmbedCode = function() {
              this._latestValidEmbedCodeHtml = this._generateIframeEmbedCode()
            }, t.prototype._generateIframeEmbedCode = function() {
              if (this._latestValidEmbedCodeHtml) {
                var e = n.HTMLEmbed.normalize(this._latestValidEmbedCodeHtml.trim()),
                  t = n.HTMLEmbed.htmlAttrSplit(e),
                  r = new URL(t[n.HTMLEmbed.srcStr]);
                this.properties.runtimeState.showBuyButton ? r.searchParams.delete(c.hideBuyParam) : r.searchParams.set(c.hideBuyParam, "true"), this.properties.runtimeState.showShareButton ? r.searchParams.delete(c.hideShareParam) : r.searchParams.set(c.hideShareParam, "true"), this.properties.runtimeState.associateId ? r.searchParams.set(c.associateIDParam, this.properties.runtimeState.associateId) : r.searchParams.delete(c.associateIDParam), this.properties.runtimeState.preview && !this._hidePreviewOptions ? r.searchParams.set(c.previewParam, this.properties.runtimeState.preview) : r.searchParams.delete(c.previewParam), t[n.HTMLEmbed.srcStr] = r.href;
                var i = d(this.properties.runtimeState.size);
                if (i) t[n.HTMLEmbed.heightStr] = "" + i.height, t[n.HTMLEmbed.widthStr] = "" + i.width, this.properties.shouldScaleWidth = !1, this._hideShareToggle = i.height < d(3).height || i.width < d(3).width;
                else {
                  var o = this.width + c.maxCanvasAdditionalWidth;
                  n.HTMLEmbed.scaleWidthAndHeight(t, o, Math.ceil(.7 * o), this.properties.shouldScaleWidth = !0), this._hideShareToggle = !1
                }
                return n.HTMLEmbed.iframeAttributeMaptoString(t)
              }
            }, t.prototype._validateAssociateID = function(e) {
              if (e) return e.length < c.minLengthAssociateID ? _.j : void 0
            }, t.prototype._createRunTimeState = function(e) {
              var t = new URL(e[n.HTMLEmbed.srcStr]),
                r = parseInt(e[n.HTMLEmbed.heightStr], 10),
                i = parseInt(e[n.HTMLEmbed.widthStr], 10);
              this._hideShareToggle = r < d(3).height || i < d(3).width;
              var o = !t.searchParams.has(c.hideBuyParam),
                a = function(e, t) {
                  var r = 4;
                  return s.forEach(function(i, o) {
                    o <= 3 && e === i.height && t === i.width && (r = o)
                  }), r
                }(r, i);
              return this._hidePreviewOptions = !(3 === a && o), this.renderedOnce && (this.properties.shouldScaleWidth = 4 === a), {
                showBuyButton: o,
                showShareButton: !t.searchParams.has(c.hideShareParam),
                associateId: t.searchParams.has(c.associateIDParam) ? t.searchParams.get(c.associateIDParam) : void 0,
                size: a || 4,
                preview: t.searchParams.has(c.previewParam) ? t.searchParams.get(c.previewParam) : "newtab"
              }
            }, t._embedStrings = {
              buttonPlaceHolderActionLabel: _.b,
              emptyPlaceHolderEmbedWebPartDescription: _.f,
              emptyPlaceholderEmbedWebPartIconLabel: _.g,
              incorrectURLError: _.h,
              placeHolderIcon: void 0
            }, t
          }(n.BaseEmbedWebPart);
        t.default = p
      },
      ZHzX: function(e) {
        e.exports = JSON.parse('{"b":"Add a video from YouTube by pasting its link or its embed code below.","c":"YouTube link or embed code","g":"https://www.youtube.com/watch?v=... \\nor \\n<iframe width=\\u0022853\\u0022 height=\\u0022480\\u0022","d":"Enhance your page by embedding a YouTube video.","e":"YouTube","f":"This is not a YouTube link. Please use a valid YouTube URL.","a":"Add video","h":"Learn more about embedding YouTube videos","i":"https://go.microsoft.com/fwlink/?linkid=857887","j":"Enter the number of seconds or the time in the format hours:minutes:seconds.","k":"Start time","l":"Show player controls","m":"Privacy-enhanced mode"}')
      },
      ZOpO: function(e, t, r) {
        "use strict";
        r.r(t), r.d(t, "STREAM_ICON", function() {
          return R
        }), r.d(t, "SORTBY_SELECT_ATTRIBUTES", function() {
          return V
        });
        var i = r("17wl"),
          o = r("cDcd"),
          a = r("faye"),
          n = r("KL1q"),
          s = r("7Awa"),
          d = r("hiL/"),
          l = r("ut3N"),
          c = r("UWqr"),
          h = r("br4S"),
          _ = r("krEX"),
          p = r("U4ag"),
          m = r("y88i"),
          u = r("fwx1"),
          f = r("8Aeb");
        r("Eozn");
        var b = {
            blackBackGround: "a_a_1290c3e3",
            domainCheckFailureErrorMessage: "b_a_1290c3e3",
            retirementWarning: "c_a_1290c3e3",
            streamHeader: "e_a_1290c3e3",
            streamHeaderTitle: "f_a_1290c3e3",
            streamHeaderLink: "g_a_1290c3e3",
            streamVideoBackplate: "h_a_1290c3e3",
            streamVideoTitle: "i_a_1290c3e3",
            StreamVideoPlayeriOSPlaceholder: "j_a_1290c3e3",
            StreamVideoPlayeriOSPlaceholderWithThumbnail: "k_a_1290c3e3"
          },
          g = r("2q6Q"),
          S = function() {
            function e() {}
            return e.getInputEngagementData = function(e, t) {
              return {
                currentHostname: location.hostname,
                inputHostname: d.UrlUtility.getHostnameFromUrl(e),
                resultValidatedCode: t
              }
            }, e.logUserInputEvent = function(t) {
              var r = new l._LogEntry(m.StringHelper.format("[{0}]", e.webPartName), "ConfigurationComplete", l._LogType.Event, {
                currentHostname: t.currentHostname,
                inputHostname: t.inputHostname,
                validateResult: t.resultValidatedCode.toString()
              });
              g._EngagementLogger.logEventWithLogEntry(r)
            }, e.webPartName = "EmbeddedVideoWebPart", e.streamWebPartName = "StreamWebPart", e
          }(),
          y = function() {
            function e() {}
            return e.isOAuthWithNoSourceKillSwitchActivated = function() {
              return c._SPKillSwitch.isActivated(c.Guid.tryParse("6249cfff-d328-489c-85b3-ebe0e03e3f9a"), "06/07/2019", "Stream_oAuthAlways")
            }, e.isHandleO365VideoCaptionChangeKillSwitchActivated = function() {
              return c._SPKillSwitch.isActivated(c.Guid.parse("fda823b3-9192-4490-ab50-9dee1497f3d1"), "6/10/2018", "Handle the change of O365 video caption")
            }, e.isSourceTypeSerializedKillSwitchActivated = function() {
              return c._SPKillSwitch.isActivated(c.Guid.tryParse("3f437a82-9af4-4fb2-8ccd-f45b33496c2f"), "7/6/2020", "Serializes the selected source to the webpart properties instead of calculating it from the video/channel URL")
            }, e._isWebpartExperimentKSActivated = function() {
              return c._SPKillSwitch.isActivated(c.Guid.parse("9d8ec404-5443-4458-a70d-e61a445c7a5d"), "2020/08/25", "Log webpart experiment")
            }, e.isStreamUseIframeToReportRenderCompleteKillSwitchActivated = function() {
              return c._SPKillSwitch.isActivated(c.Guid.parse("3dd62a34-7c9b-4de8-a432-c7bf6d2c1c4d"), "6/25/2020", "Use PostMessage signals from the embed iframe to measure renderCompleted() instead of iframe.onload")
            }, e._isStreamHostCorrelationIdKSActivated = function() {
              return c._SPKillSwitch.isActivated("95f3cebb-20e9-44b1-9c35-e8a7b9409ebc")
            }, e._isStreamFixRenderAsyncActivated = function() {
              return c._SPKillSwitch.isActivated("ed396bf7-09ae-4d9f-b2bf-eea1befec9d7")
            }, e._isStreamIOSPlaceholderFixesKillSwitchActivated = function() {
              return c._SPKillSwitch.isActivated("ed7199af-c48e-4193-ad26-51ab34530ec1")
            }, e._isStreamImageCacheSpammingFixesKillSwitchActivated = function() {
              return c._SPKillSwitch.isActivated("fb5d4048-cb4e-403e-89aa-899e640f7452")
            }, e
          }(),
          v = {
            browse: "BROWSE",
            video: "VIDEO",
            channel: "CHANNEL"
          },
          T = function(e) {
            function t(t) {
              var r = e.call(this, t) || this;
              return r._logViewMoreLinkClickEngagement = function() {
                g._EngagementLogger.logEvent(S.streamWebPartName + ".viewMoreLinkClicked")
              }, r
            }
            return Object(i.__extends)(t, e), t.prototype.render = function() {
              var e = this.props.isEditMode ? this.props.title : this.props.title || f.g,
                t = this.props,
                r = t.isEditMode,
                i = t.linkUrl,
                a = t.showHeader,
                s = t.onTitleChange,
                l = t.streamVideoProps,
                c = t.videoThumbnail,
                h = t.backplateTitle,
                _ = c ? d.ThumbnailUrlGenerator.getThumbnailUrl(c) : void 0;
              return o.createElement("div", null, a && o.createElement("div", {
                className: b.streamHeader
              }, o.createElement(p.WebPartTitle, {
                className: b.streamHeaderTitle,
                edit: r,
                title: e,
                placeholder: f.g,
                onTitleChange: s,
                marginBottomSize: "Middle",
                theme: l.emphasisTheme
              }), o.createElement(n.Link, {
                disabled: r,
                "aria-label": f.X,
                className: b.streamHeaderLink,
                href: i,
                onClick: this._logViewMoreLinkClickEngagement,
                target: "_blank"
              }, f.X)), this._getHTMLEmbedElements(l, _, h))
            }, t.prototype._getHTMLEmbedElements = function(e, t, r) {
              var i = e.htmlEmbedProps,
                a = e.placeholderProps,
                n = e.displayMode,
                s = e.renderCompleted,
                d = e.captionText,
                l = e.qosPrefixName,
                c = e.emphasisTheme,
                h = r ? o.createElement("div", {
                  className: b.streamVideoBackplate
                }, o.createElement("div", {
                  className: b.streamVideoTitle
                }, r)) : void 0;
              return o.createElement(u.HTMLEmbed, {
                ref: this._resolveRef("embedComponent"),
                htmlEmbedProps: i,
                placeholderProps: a,
                displayMode: n,
                renderCompleted: s,
                captionText: d,
                onCaptionTextChange: this.props.onCaptionChange,
                qosPrefixName: l,
                emphasisTheme: c,
                backgroundImageUrl: t,
                divBehindIframe: h
              })
            }, t
          }(n.BaseComponent),
          w = function() {
            function e() {}
            return e.generateIframeForSource = function(t, r, i, o, a, n, s) {
              return '<iframe width="640" height="' + (r === v.browse ? 475 : 360) + '" src="' + e.getStreamFullSourceUrl(t, r, i, o, a, n, s) + '" frameborder="0" allowfullscreen></iframe>'
            }, e._isSourceFromStream = function(e, t, r) {
              return !!(e && t && r) && !((e = e.toUpperCase()).indexOf(t) <= 0) && e.indexOf(r) > 0
            }, e.getStreamFullSourceUrl = function(t, r, i, o, a, n, s) {
              var d = new m.Uri(t),
                l = this.isLoadedInIOSSharePointApp() ? "SPO-APP-IOS" : "SPO";
              return d.setQueryParameter("app", l), r === v.video ? (d.setPath("embed" + d.getPath(!0)), d.setQueryParameter("autoplay", e.isLoadedInIOSSharePointApp().toString()), i && o && e._convertHMSToSeconds(o) > 0 && d.setQueryParameter("st", e._convertHMSToSeconds(o).toString()), d.setQueryParameter("preload", "none")) : r === v.channel ? (d.setPath("embed" + d.getPath(!0)), d.setQueryParameter("sort", a)) : r === v.browse && (d.setQueryParameter("displayMode", "buttons"), d.setQueryParameter("showDescription", "true"), d.setQueryParameter("sort", n), s && d.setQueryParameter("q", encodeURIComponent(s))), d.toString()
            }, e.trimStreamSourceUrl = function(e) {
              return e.split("?")[0]
            }, e.isShowHeader = function(e) {
              return e === v.browse
            }, e.getBrowseViewMoreLinkUrl = function(e) {
              var t = new m.Uri("https://web.microsoftstream.com");
              return e && (t.setPath("browse"), t.setQueryParameter("q", encodeURIComponent(e))), t.toString()
            }, e.handleIOSPlaceholderClick = function(t, r, i, o, a, n, s) {
              var d = {
                name: "videoLink",
                videoLink: e.getStreamFullSourceUrl(t, r, i, o, a, n, s)
              };
              e.sendMessageToIOSSharePointApp(d)
            }, e.isLoadedInIOSSharePointApp = function() {
              return !!window.webkit && !!window.webkit.messageHandlers && !!window.webkit.messageHandlers.StreamIOSSPHandler
            }, e.sendMessageToIOSSharePointApp = function(e) {
              window.webkit.messageHandlers.StreamIOSSPHandler.postMessage(e, "*")
            }, e.getPropertyPanelStreamVideoFields = function(e) {
              var t = [];
              return t.push(Object(h.PropertyPaneTextField)("videoSource", {
                label: f.U,
                multiline: !0,
                onGetErrorMessage: e,
                placeholder: f.t,
                ariaLabel: m.StringHelper.format(f.a, f.v, f.Q)
              })), t.push(Object(h.PropertyPaneCheckbox)("videoStartTimeCheck", {
                text: f.P
              })), t.push(Object(h.PropertyPaneTextField)("videoStartTime", {
                placeholder: f.y,
                ariaLabel: m.StringHelper.format(f.a, f.z)
              })), t
            }, e.getPropertyPanelStreamChannelFields = function(e) {
              var t = [];
              t.push(Object(h.PropertyPaneTextField)("videoSource", {
                label: f.f,
                multiline: !0,
                onGetErrorMessage: e,
                placeholder: f.t,
                ariaLabel: m.StringHelper.format(f.a, f.u, f.Q)
              }));
              var r = Object(h.PropertyPaneDropdown)("channelSortBySelect", {
                label: f.I,
                options: [{
                  key: V.trending,
                  text: f.J
                }, {
                  key: V.date,
                  text: f.H
                }, {
                  key: V.views,
                  text: f.K
                }, {
                  key: V.likes,
                  text: f.G
                }]
              });
              return r.properties.selectedKey = V.trending, t.push(r), t
            }, e.getPropertyPanelStreamBrowseFields = function() {
              var e = [],
                t = Object(h.PropertyPaneDropdown)("browseSortBySelect", {
                  label: f.I,
                  options: [{
                    key: V.trending,
                    text: f.J
                  }, {
                    key: V.date,
                    text: f.H
                  }, {
                    key: V.views,
                    text: f.K
                  }, {
                    key: V.likes,
                    text: f.G
                  }]
                });
              return t.properties.selectedKey = V.trending, e.push(t), e.push(Object(h.PropertyPaneTextField)("browseFilterTerm", {
                label: f.p,
                multiline: !0,
                placeholder: f.o,
                ariaLabel: m.StringHelper.format(f.a, f.o, f.Q)
              })), e
            }, e.getStreamPropertyPanelTopFields = function(e) {
              var t = [],
                r = Object(h.PropertyPaneLink)("videoSourceLink", {
                  text: f.r,
                  href: "https://web.microsoftstream.com",
                  target: "_blank"
                });
              t.push(r);
              var i = [];
              i.push({
                key: e.browse,
                text: f.M
              }), i.push({
                key: e.video,
                text: f.O
              }), i.push({
                key: e.channel,
                text: f.N
              });
              var o = Object(h.PropertyPaneDropdown)("sourceSelect", {
                label: f.L,
                options: i
              });
              return o.properties.selectedKey = e.browse, t.push(o), t
            }, e._convertHMSToSeconds = function(e) {
              var t = e.split(":"),
                r = 0,
                i = 1;
              try {
                if (e) {
                  for (; t.length > 0;) r += i * parseInt(t.pop(), 10), i *= 60;
                  return r
                }
              } catch (e) {
                return r
              }
            }, e
          }(),
          P = function(e) {
            function t(t) {
              var r = e.call(this, t) || this;
              return r.state = {
                visible: !1
              }, r
            }
            return Object(i.__extends)(t, e), t.prototype.setVisible = function(e) {
              this.setState({
                visible: e
              })
            }, t.prototype.render = function() {
              return this.state.visible && o.createElement("div", null, o.createElement("label", {
                className: b.domainCheckFailureErrorMessage
              }, f.D), "<", o.createElement("a", {
                href: this._o365VideoPortalUrl,
                target: "_blank",
                className: b.domainCheckFailureErrorMessage
              }, this._o365VideoPortalUrl), ">")
            }, Object.defineProperty(t.prototype, "_o365VideoPortalUrl", {
              get: function() {
                return m.Uri.concatenate(location.origin, "/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=h")
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(o.Component),
          E = r("vlQI"),
          C = r("jHvI"),
          I = r("Uejs");
  
        function A(e) {
          return e.isStream && (!y.isOAuthWithNoSourceKillSwitchActivated() || !!e.videoSource)
        }
        var O = function() {
            function e(e) {
              this._iframeContentWindow = e.iframeContentWindow, this._onAuthError = e.onAuthError, this._provider = e.serviceScope.consume(E.OAuthTokenProvider.serviceKey), this._webServerRelativeUrl = e.webServerRelativeUrl, this._setThumbnailAndTitle = e.setThumbnailAndTitle, this._videoId = e.videoId, this._displayMode = e.displayMode, this._iframeReportsRenderCompleted = e.iframeReportsRenderCompleted, this._correlationId = e.correlationId, this._shouldUpdateVideoThumbnail = e.shuoldUpdateVideoThumbnail
            }
            return e.prototype.handleStreamMessage = function(t) {
              var r = this;
              if (t.source === this._iframeContentWindow && t.data && "object" == typeof t.data) {
                var i = t.data;
                switch (i.name) {
                  case "embedhtmlloaded":
                    y.isStreamUseIframeToReportRenderCompleteKillSwitchActivated() || this._iframeReportsRenderCompleted();
                    break;
                  case "playerevent":
                    "ready" !== i.eventData.eventname || y.isStreamUseIframeToReportRenderCompleteKillSwitchActivated() || this._iframeReportsRenderCompleted();
                    break;
                  case "initializestreamconnection":
                    i.result = !0, (!y._isStreamImageCacheSpammingFixesKillSwitchActivated() && this._shouldUpdateVideoThumbnail || y._isStreamImageCacheSpammingFixesKillSwitchActivated() && this._videoId && this._displayMode === c.DisplayMode.Edit) && (this._streamOrigin = t.origin, this._getVideoThumbnailQosMonitor = new g._QosMonitor("StreamWebPart.GetVideoThumbnail"), this._sendThumbnailRequestMessage()), this._iframeContentWindow.postMessage(i, t.origin);
                    break;
                  case "fetchvideothumbnailresult":
                    this._setThumbnailAndTitle(i.eventData.thumbnailDataUrl, i.eventData.name, this._getVideoThumbnailQosMonitor);
                    break;
                  case "getstreamtoken":
                    this._getOAuthTokenQosMonitor = new g._QosMonitor("StreamWebPart.GetOAuthToken"), i.clientSessionId && l._TraceLogger.logVerbose(e._logSource, i.clientSessionId, "StreamOAuthClientRequestId"), this._getOAuthToken().then(function(e) {
                      i.result = !0, i.correlationId = e._correlationId, i.eventData.token = e.token, r._iframeContentWindow.postMessage(i, t.origin), r._getOAuthTokenQosMonitor.writeSuccess()
                    }).catch(function(o) {
                      var a = o instanceof C.OAuthUtilityError && !!o.redirectUrl;
                      a && r._onAuthError(o), l._TraceLogger.logError(e._logSource, o), i.eventData.reason = a ? "Multi-factor authentication" : o.message, o instanceof C.OAuthUtilityError && (i.correlationId = o.correlationId), r._iframeContentWindow.postMessage(i, t.origin)
                    })
                }
              }
            }, e.prototype._getOAuthToken = function() {
              var e = this;
              return this._provider.getOAuthToken("https://stream.microsoft.com", this._webServerRelativeUrl).then(function(e) {
                return e
              }).catch(function(t) {
                if (e._getOAuthTokenQosMonitor)
                  if (t.redirectUrl) {
                    var r = y._isStreamHostCorrelationIdKSActivated() ? void 0 : {
                      correlationId: e._correlationId
                    };
                    e._getOAuthTokenQosMonitor.writeExpectedFailure("MultiFactorAuth", t, r)
                  } else {
                    var i = t instanceof C.OAuthUtilityError ? C.OAuthUtilityErrorType[t.type] : "UnknownOAuthError";
                    e._getOAuthTokenQosMonitor.writeUnexpectedFailure(i, t, {
                      correlationId: y._isStreamHostCorrelationIdKSActivated() ? void 0 : e._correlationId,
                      requestId: t.correlationId,
                      serverErrorCode: t.type === C.OAuthUtilityErrorType.serverError ? t.serverErrorCode : "NotServerError"
                    })
                  } return Promise.reject(t)
              })
            }, e.prototype._sendThumbnailRequestMessage = function() {
              var e = {
                id: c.Guid.newGuid().toString(),
                name: "fetchvideothumbnails",
                result: !0,
                methodData: {
                  videoids: [this._videoId]
                }
              };
              this._iframeContentWindow.postMessage(e, this._streamOrigin)
            }, e._logSource = l._LogSource.create("StreamOAuthUtility"), Object(i.__decorate)([n.autobind], e.prototype, "handleStreamMessage", null), e
          }(),
          x = function(e) {
            function t(t) {
              return e.call(this, t) || this
            }
            return Object(i.__extends)(t, e), t.prototype.render = function() {
              if (!this.props.videoThumbnail && !this.props.videoTitle) return o.createElement("div", null, o.createElement("div", {
                className: b.StreamVideoPlayeriOSPlaceholder,
                onClick: this.props.onClick,
                role: "presentation"
              }, o.createElement("div", {
                className: "Placeholder-container"
              }, o.createElement("div", {
                className: "Placeholder-head"
              }, o.createElement("div", {
                className: "Placeholder-headContainer"
              }, o.createElement(n.Icon, {
                className: "Placeholder-icon",
                iconName: "StreamLogo"
              }), o.createElement("span", {
                className: "Placeholder-text"
              }, f.i))), o.createElement("div", {
                className: "Placeholder-body"
              }, o.createElement("div", {
                className: "Placeholder-playButton-container"
              }, o.createElement(n.Icon, {
                className: "Placeholder-playButton-icon",
                iconName: "Play"
              }))))), !y._isStreamIOSPlaceholderFixesKillSwitchActivated() && o.createElement(p.CaptionElement, {
                isEditMode: !1,
                text: this.props.captionText || ""
              }));
              var e = {
                backgroundImage: "url(" + (this.props.videoThumbnail ? d.ThumbnailUrlGenerator.getThumbnailUrl(this.props.videoThumbnail) : void 0) + ")",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "black"
              };
              return o.createElement("div", null, o.createElement("div", {
                className: b.StreamVideoPlayeriOSPlaceholderWithThumbnail,
                onClick: this.props.onClick,
                role: "presentation"
              }, o.createElement("div", {
                className: "Placeholder-container",
                style: e
              }, o.createElement("div", {
                className: "Placeholder-backplate"
              }, o.createElement("div", {
                className: "Placeholder-title"
              }, this.props.videoTitle)), o.createElement("div", {
                className: "Placeholder-playButton-container"
              }, o.createElement(n.Icon, {
                className: "Placeholder-playButton-icon",
                iconName: "Play"
              })))), !y._isStreamIOSPlaceholderFixesKillSwitchActivated() && o.createElement(p.CaptionElement, {
                isEditMode: !1,
                text: this.props.captionText || ""
              }))
            }, t
          }(o.Component),
          L = "o365retirementLearnMore";
  
        function j() {
          return o.createElement("div", null, o.createElement("label", {
            "aria-labelledby": L,
            className: b.retirementWarning
          }, f.C), " ", o.createElement("a", {
            id: L,
            href: "https://aka.ms/O365VideoMigration",
            target: "_blank"
          }, f.B))
        }
        var R = "StreamLogo",
          V = {
            trending: "trending",
            date: "date",
            views: "views",
            likes: "likes"
          },
          k = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._latestSourceType = "BROWSE", t._latestVideoStartTime = "00:00", t._latestChannelSortBy = V.trending, t._latestBrowseSortBy = V.trending, t._latestVideoStartTimeCheckValue = !1, t._renderAlreadyCompleted = !1, t._shouldUpdateVideoThumbnail = !1, t._htmlEmbedRenderCompleted = function() {
                y._isStreamFixRenderAsyncActivated() && !y.isStreamUseIframeToReportRenderCompleteKillSwitchActivated() && t._streamOAuthUtility || t.renderCompleted()
              }, t._handleThemeChangedEvent = function(e) {
                t._emphasisTheme = e.theme, t.render()
              }, t._setThumbnailAndTitle = function(e, r, i) {
                t._shouldUpdateVideoThumbnail = !1, t.properties.videoTitle = r, t.properties.streamVideoThumbnail && t._deleteThumbnail(t.properties.streamVideoThumbnail).then(function(e) {
                  e.ok || i.writeUnexpectedFailure("DeleteThumbnailError", void 0, {
                    status: e.status
                  })
                }).catch(function(e) {
                  i.writeUnexpectedFailure("DeleteThumbnailError", e)
                }), t.properties.streamVideoThumbnail = void 0, p.EditModeUtilitiesLoader.GetUtilities().then(function(o) {
                  var a, n, s = o.SPFileHandler,
                    d = s.replaceSpecialCharacters(r + "-" + c.Guid.newGuid()),
                    l = (a = void 0, (n = e.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)) && n.length && (a = n[1]), a),
                    h = void 0;
                  switch (l) {
                    case "image/png":
                      h = ".png";
                      break;
                    case "image/jpeg":
                      h = ".jpg";
                      break;
                    default:
                      var _ = y._isStreamHostCorrelationIdKSActivated() ? void 0 : {
                        correlationId: t._streamCorrelationId
                      };
                      return void i.writeExpectedFailure("UnknownContentType", void 0, _)
                  }
                  var p = e.split(",").pop(),
                    m = void 0 !== p ? function(e, t) {
                      void 0 === t && (t = "");
                      for (var r, i = atob(e), o = [], a = i.length, n = 0; n < a; n += 512) {
                        var s = i.slice(n, n + 512);
                        r = [];
                        for (var d = 0; d < s.length; d++) r[d] = s.charCodeAt(d);
                        var l = new Uint8Array(r);
                        o.push(l), r.length = 0
                      }
                      return new Blob(o, {
                        type: t
                      })
                    }(p, l) : void 0;
                  m ? (t._SPFileHandler || (t._SPFileHandler = new s({
                    serviceScope: t.context.serviceScope,
                    qosPrefix: S.streamWebPartName
                  })), t._SPFileHandler.uploadLocalFile(m, d + h).then(function(e) {
                    t.properties.streamVideoThumbnail = e, i.writeSuccess(), t._render()
                  }).catch(function(e) {
                    i.writeUnexpectedFailure("ThumbnailUploadFailed", e)
                  })) : (_ = y._isStreamHostCorrelationIdKSActivated() ? void 0 : {
                    correlationId: t._streamCorrelationId
                  }, i.writeExpectedFailure("UnabledToDecodeThumbnailData", void 0, _))
                }).catch(function(e) {
                  throw i.writeUnexpectedFailure("EditModeUtilitiesLoaderError", e), e
                })
              }, t._onTitleChange = function(e) {
                t.properties.title = e, l._EngagementLogger.logEvent(S.streamWebPartName + ".titleChanged")
              }, t._onCaptionChange = function(e) {
                t.properties.captionText = e
              }, t._handleO365VideoCaptionChange = function(e) {
                t.properties.captionText = e
              }, t
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "previewImageUrl", {
              get: function() {
                return this._isStreamWebPart() && this.properties.streamVideoThumbnail ? Object(p.webPartPreviewThumbnail)({
                  pageContext: this.context.pageContext,
                  url: this.properties.streamVideoThumbnail.serverRelativeUrl,
                  siteId: this.context.pageContext.site.id.toString(),
                  webId: this.context.pageContext.web.id.toString(),
                  listId: this.properties.streamVideoThumbnail.listId,
                  uniqueId: this.properties.streamVideoThumbnail.uniqueId
                }) : this.properties.thumbnailUrl
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.render = function() {
              var e, t, r, i, n, s = this,
                d = this.properties.videoSource ? this.properties.videoSource.trim() : "";
              if (this._renderAlreadyCompleted = !1, A(this.properties) && this._oAuthError) return e = this._oAuthError, t = this.context.manifest.alias, r = this.domElement, i = {
                error: e,
                customErrorMessage: !e.redirectUrl && f.q,
                webpartName: I.a,
                webpartAlias: t,
                webpartIcon: R
              }, n = o.createElement(p.OAuthErrorRenderer, i), void a.render(n, r);
              this._isStreamWebPart() && (this._streamCorrelationId = c.Guid.newGuid().toString(), this._latestSourceType = this.properties.sourceType), !this.renderedOnce && d && (this._isStreamWebPart() ? l._EngagementLogger.logEvent(S.streamWebPartName + ".view") : l._EngagementLogger.logEvent(S.webPartName + ".view"));
              var h = this.properties.embedCode,
                _ = this.properties.videoSource;
              _ && !h && this._loadStreamVideoOrChannel(_);
              var m = void 0 === this.properties.embedCode ? "" : this.properties.embedCode.trim();
              this.renderedOnce || (this._latestValidEmbedCode = m, this._latestValidVideoSource = d, this._latestValidThumbnailUrl = this.properties.thumbnailUrl, this._latestVideoStartTimeCheckValue = this.properties.videoStartTimeCheck, this._latestVideoStartTime = this.properties.videoStartTime, this._latestChannelSortBy = this.properties.channelSortBy || this._latestChannelSortBy, this._latestBrowseSortBy = this.properties.browseSortBy || this._latestBrowseSortBy, this._latestBrowseSearchTerm = this.properties.browseSearchTerm || this._latestBrowseSearchTerm);
              var u = this.validateVideoSource(d);
              "string" == typeof u ? this._render() : u.then(function() {
                s._render()
              })
            }, t.prototype.validateVideoSource = function(e) {
              if (this._isStreamWebPart() && this._latestSourceType === v.browse) return this._loadStreamBrowse(), "";
              var t = e.trim();
              return this._setO365VideoPortalLinkVisible(!1), this._shouldValidate(t) ? (this._latestValidatedVideoSource = t, this._resetHtmlParams(), this.renderedOnce ? t ? (this._isStreamWebPart() || this._setErrorMessageByVideoUrl(t), this._errorMessage ? (this._triggerRenderIfValidateFailed(), this._errorMessage) : this._latestValidVideoSource === t && "" !== this._latestValidEmbedCode ? (this._triggerRenderIfValidateFailed(), this._errorMessage) : (this._promptingTipsControl.renderLoadingIndicator(), this._isStreamWebPart() ? this._loadStreamVideoOrChannel(t) ? "" : this._errorMessage : this._loadO365Video(t))) : (this._emptyLatestValidVideoCode(), this._errorMessage) : this._errorMessage) : (this._latestValidVideoSource === t && (this._errorMessage = ""), this._latestValidatedVideoSource = t, this._triggerRenderIfValidateFailed(), this._errorMessage)
            }, t.prototype.onInit = function() {
              return void 0 === this.properties.isStream && (this.properties.isStream = !1), this._emptyLatestValidVideoCode(), this._latestValidatedVideoSource = "", this._latestSourceType = v.browse, this.properties.sourceType || (this.properties.sourceType = v.browse), this._SPServerDataProvider = new u.SPServerDataProvider(this.context.httpClient, this.context.spHttpClient, this.context.pageContext, this.context.serviceScope), y._isStreamImageCacheSpammingFixesKillSwitchActivated() || this.displayMode !== c.DisplayMode.Edit || (this._shouldUpdateVideoThumbnail = !0), this._promptingTipsControl = new u.PromptingTipsControl(this.domElement, this.context.statusRenderer), this._getEmphasisTheme(), e.prototype.onInit.call(this)
            }, t.prototype.onDispose = function() {
              this._streamOAuthUtility && window.removeEventListener("message", this._streamOAuthUtility.handleStreamMessage, !1), a.unmountComponentAtNode(this.domElement), this._component = void 0, this.context.serviceScope.consume(s.ThemeProvider.serviceKey).themeChangedEvent.remove(this, this._handleThemeChangedEvent), e.prototype.onDispose.call(this)
            }, t.prototype.onBeforeSerialize = function() {
              this.properties.embedCode = this._latestValidEmbedCode, this.properties.videoSource = this._latestValidVideoSource, this.properties.thumbnailUrl = this._latestValidThumbnailUrl, this._isStreamWebPart() && (this.properties.sourceType = this._latestSourceType, this.properties.videoStartTimeCheck = this._latestVideoStartTimeCheckValue, this.properties.videoStartTime = this._latestVideoStartTime, this.properties.channelSortBy = this._latestChannelSortBy, this.properties.browseSortBy = this._latestBrowseSortBy, this.properties.browseSearchTerm = this._latestBrowseSearchTerm)
            }, t.prototype.onAfterDeserialize = function(e, t) {
              return e.isStream && t.lessThan(c.Version.parse("1.4")) && (e.sourceType = this._calculateSourceType(e.videoSource, e.sourceSelect)), e
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  title: {
                    isSearchablePlainText: !0
                  },
                  captionText: {
                    isSearchablePlainText: !0
                  },
                  videoSource: {
                    isLink: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "isRenderAsync", {
              get: function() {
                return !(y._isStreamFixRenderAsyncActivated() || !this._isStreamWebPart()) || !!this.properties.videoSource && !!this.properties.videoSource.trim()
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "dataVersion", {
              get: function() {
                return c.Version.parse("1.4")
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.onPropertyPaneConfigurationComplete = function() {
              e.prototype.onPropertyPaneConfigurationComplete.call(this), this._inputEngagementData && (S.logUserInputEvent(this._inputEngagementData), this._inputEngagementData = void 0), l._EngagementLogger.logEvent(S.webPartName + ".edit")
            }, t.prototype.onPropertyPaneFieldChanged = function(t, r, i) {
              if (r !== i) {
                if (this._isStreamWebPart()) switch (t) {
                  case "sourceSelect":
                    this._latestSourceType = i, this._latestValidVideoSource = "", this.properties.videoSource = "", this.properties.streamVideoThumbnail = void 0, this.properties.videoTitle = void 0, this._inputEngagementData = void 0, this._latestValidEmbedCode = "", this._latestVideoStartTimeCheckValue = !1, this._latestVideoStartTime = "", this.properties.videoStartTimeCheck = !1, this.properties.videoStartTime = "", y._isStreamFixRenderAsyncActivated() || this._component.resetRenderCompletedCalled();
                    break;
                  case "videoStartTimeCheck":
                    this._latestVideoStartTimeCheckValue = i, this._validateVideoStartTime();
                    break;
                  case "videoStartTime":
                    this._latestVideoStartTime = i, this._latestVideoStartTimeCheckValue && this._validateVideoStartTime();
                    break;
                  case "channelSortBySelect":
                    this._latestChannelSortBy = i, this._loadStreamVideoOrChannel(this._latestValidVideoSource);
                    break;
                  case "browseSortBySelect":
                    this._latestBrowseSortBy = i, this._loadStreamBrowse();
                    break;
                  case "browseFilterTerm":
                    this._latestBrowseSearchTerm = i, this._loadStreamBrowse()
                }
                if ("videoSource" === t) {
                  this._latestValidVideoSource = i;
                  var o = this.properties.streamVideoThumbnail;
                  if (o) {
                    var a = new l._QosMonitor("StreamWebPart.DeleteVideoThumbnail");
                    this._deleteThumbnail(o).then(function() {
                      a.writeSuccess()
                    }).catch(function(e) {
                      a.writeUnexpectedFailure("DeleteFailed", e)
                    }), this.properties.streamVideoThumbnail = void 0
                  }
                  this.properties.videoTitle = void 0, y._isStreamImageCacheSpammingFixesKillSwitchActivated() || (this._shouldUpdateVideoThumbnail = !0)
                }
              }
              e.prototype.onPropertyPaneFieldChanged.call(this, t, r, i)
            }, t.prototype.getPropertyPaneConfiguration = function() {
              return this._isStreamWebPart() ? {
                pages: [{
                  header: {
                    description: f.W
                  },
                  groups: [{
                    groupFields: w.getStreamPropertyPanelTopFields(v)
                  }, {
                    groupFields: this._getStreamPropertyPanelBottomFields()
                  }]
                }]
              } : this._propertyPaneConfigurationForO365Video()
            }, Object.defineProperty(t.prototype, "accessibleTitle", {
              get: function() {
                return this._component && this._component.getAccessibleTitle && this._component.getAccessibleTitle(f.T)
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.renderCompleted = function() {
              this._renderAlreadyCompleted || (this._renderAlreadyCompleted = !0, e.prototype.renderCompleted.call(this))
            }, t.prototype.onAfterResize = function(e) {
              this.displayMode !== c.DisplayMode.Edit || this.properties.videoSource || this._render()
            }, t.prototype._getEmphasisTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(s.ThemeProvider.serviceKey);
                e._emphasisTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, e._handleThemeChangedEvent)
              })
            }, t.prototype._validateVideoStartTime = function() {
              this._latestValidVideoSource && this._loadStreamVideoOrChannel(this._latestValidVideoSource)
            }, t.prototype._loadO365Video = function(e) {
              var t = this;
              return this._SPServerDataProvider.GetVideoByURL(_.O365VideoIframeUtilities.generateVideoUrlForIframeCodeRest(e), S.webPartName).then(function(r) {
                return t._inputEngagementData = S.getInputEngagementData(e, 0), t._promptingTipsControl.clearPromptingTipsZone(), t._latestValidEmbedCode = r.DefaultEmbedCode, t._latestValidVideoSource = e, t._latestValidThumbnailUrl = r.ThumbnailUrl ? r.ThumbnailUrl.trim().replace(/\.[^\.]+?VideoPreview=\d$/gi, "") : "", Promise.resolve("")
              }, function(r) {
                return t._inputEngagementData = S.getInputEngagementData(e, 2), t._promptingTipsControl.clearPromptingTipsZone(), t._errorMessage = r, t._setO365VideoPortalLinkVisible(!0), t._triggerRenderIfValidateFailed(), Promise.resolve(t._errorMessage)
              })
            }, t.prototype._loadStreamVideoOrChannel = function(e) {
              var t, r;
              return e = w.trimStreamSourceUrl(e), w._isSourceFromStream(e, this._latestSourceType, ".MICROSOFTSTREAM.COM") ? (r = w.generateIframeForSource(e, this._latestSourceType, this._latestVideoStartTimeCheckValue, this._latestVideoStartTime, this._latestChannelSortBy), this._processSuccessResponse(e, r), t = !0) : (this._latestSourceType === v.video ? this._showErrorResponse(e, f.n) : this._latestSourceType === v.channel && this._showErrorResponse(e, f.m), t = !1), t
            }, t.prototype._loadStreamBrowse = function() {
              var e = w.generateIframeForSource("https://web.microsoftstream.com/embed/browse", this._latestSourceType, this._latestVideoStartTimeCheckValue, this._latestVideoStartTime, this._latestChannelSortBy, this._latestBrowseSortBy, this._latestBrowseSearchTerm);
              this._processSuccessResponse("https://web.microsoftstream.com/embed/browse", e)
            }, t.prototype._processSuccessResponse = function(e, t) {
              return this._inputEngagementData = S.getInputEngagementData(e, 0), this._promptingTipsControl.clearPromptingTipsZone(), this.properties.embedCode = t, this._latestValidEmbedCode = t, this._latestValidVideoSource = e, this._latestValidThumbnailUrl = "", !0
            }, t.prototype._showErrorResponse = function(e, t) {
              return this._inputEngagementData = S.getInputEngagementData(e, 2), this._promptingTipsControl.clearPromptingTipsZone(), this._errorMessage = t, this._triggerRenderIfValidateFailed(), !1
            }, t.prototype._getStreamPropertyPanelBottomFields = function() {
              var e = [];
              return this._latestSourceType === v.video ? e = w.getPropertyPanelStreamVideoFields(this.validateVideoSource.bind(this)) : this._latestSourceType === v.channel ? e = w.getPropertyPanelStreamChannelFields(this.validateVideoSource.bind(this)) : this._latestSourceType === v.browse && (e = w.getPropertyPanelStreamBrowseFields()), e
            }, t.prototype._propertyPaneConfigurationForO365Video = function() {
              return {
                pages: [{
                  header: {
                    description: f.V
                  },
                  groups: [{
                    groupFields: [this._office365RetirementWarning, Object(h.PropertyPaneTextField)("videoSource", {
                      "data-automation-id": "o365video-source-input",
                      label: f.U,
                      multiline: !0,
                      onGetErrorMessage: this.validateVideoSource.bind(this),
                      placeholder: f.w,
                      ariaLabel: m.StringHelper.format(f.a, f.x, f.Q)
                    }), this._office365VideoPortalLink, Object(h.PropertyPaneToggle)("showInfo", {
                      label: f.R
                    })]
                  }]
                }]
              }
            }, Object.defineProperty(t.prototype, "_office365VideoPortalLink", {
              get: function() {
                var e = this;
                return Object(h.PropertyPaneCustomField)({
                  key: "o365VideoPortalLink",
                  onRender: function(t) {
                    var r = o.createElement(P);
                    e._o365VideoPortalLink = a.render(r, t)
                  },
                  onDispose: function(e) {
                    a.unmountComponentAtNode(e)
                  }
                })
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_office365RetirementWarning", {
              get: function() {
                return Object(h.PropertyPaneCustomField)({
                  key: "o365VideoPortalRetirement",
                  onRender: function(e) {
                    var t = o.createElement(j);
                    a.render(t, e)
                  },
                  onDispose: function(e) {
                    a.unmountComponentAtNode(e)
                  }
                })
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._resetHtmlParams = function() {
              this._errorMessage = ""
            }, t.prototype._triggerRenderIfValidateFailed = function() {
              this._errorMessage && this._render()
            }, t.prototype._render = function() {
              this.displayMode !== c.DisplayMode.Read && this._errorMessage && !this.renderedOnce ? this._promptingTipsControl.renderError(this._errorMessage) : this._promptingTipsControl.clearPromptingTipsZone(), this.displayMode === c.DisplayMode.Edit && !this._errorMessage && this._latestValidEmbedCode && (this._latestSourceType === v.channel ? this._promptingTipsControl.readContentAsAlert(f.e) : this._latestSourceType === v.video ? this._promptingTipsControl.readContentAsAlert(f.S) : this._latestSourceType === v.browse && this._promptingTipsControl.readContentAsAlert(f.h)), this._updateShowInfo();
              var e = u.HTMLEmbed.htmlAttrSplit(this._errorMessage && !this.renderedOnce ? "" : this._latestValidEmbedCode);
              if (0 !== Object.keys(e).length) {
                this._isStreamWebPart() || (e[u.HTMLEmbed.className] = b.blackBackGround);
                var t = this.width + 1e3;
                u.HTMLEmbed.scaleWidthAndHeight(e, t, t, !0)
              }
              this._isStreamWebPart() ? w.isLoadedInIOSSharePointApp() && this._latestValidVideoSource ? this._createStreamPlaceholderIOSComponent() : (this._createStreamComponent(e), !y._isStreamImageCacheSpammingFixesKillSwitchActivated() && this._streamOAuthUtility && window.removeEventListener("message", this._streamOAuthUtility.handleStreamMessage, !1), A(this.properties) && this._component && this._component.contentWindow && (this._streamOAuthUtility = new O({
                serviceScope: this.context.serviceScope,
                webServerRelativeUrl: this.context.pageContext.web.serverRelativeUrl,
                onAuthError: this._handleOAuthError,
                iframeContentWindow: this._component.contentWindow,
                setThumbnailAndTitle: this._setThumbnailAndTitle,
                displayMode: this.displayMode,
                iframeReportsRenderCompleted: this.renderCompleted.bind(this),
                videoId: this._videoId,
                correlationId: y._isStreamHostCorrelationIdKSActivated() ? void 0 : this._streamCorrelationId,
                shuoldUpdateVideoThumbnail: y._isStreamImageCacheSpammingFixesKillSwitchActivated() ? void 0 : this._shouldUpdateVideoThumbnail
              }), window.addEventListener("message", this._streamOAuthUtility.handleStreamMessage))) : this._createO365Component(e), this.displayMode !== c.DisplayMode.Edit || this.renderedOnce || this.renderedFromPersistedData || (l._EngagementLogger.logEvent(S.webPartName + ".create"), this.context.propertyPane.open())
            }, t.prototype._deleteThumbnail = function(e) {
              var t = this.context.pageContext.web.absoluteUrl + "/_api/web/GetFileByServerRelativePath(DecodedUrl=@a1)/recycle?@a1='" + encodeURI(e.serverRelativeUrl) + "'";
              return this.context.spHttpClient.post(t, E.SPHttpClient.configurations.v1, {})
            }, t.prototype._isStreamWebPart = function() {
              return this.properties.isStream
            }, t.prototype._createStreamVideoPlaceholderIOSComponent = function() {
              var e = this,
                t = {
                  videoTitle: this.properties.videoTitle,
                  videoThumbnail: this._getVideoThumbnailRequest(this.properties.streamVideoThumbnail),
                  captionText: y._isStreamIOSPlaceholderFixesKillSwitchActivated() ? void 0 : this.properties.captionText,
                  onClick: function() {
                    w.handleIOSPlaceholderClick(e._latestValidVideoSource, y._isStreamIOSPlaceholderFixesKillSwitchActivated() ? e._latestSourceType : v.video, e._latestVideoStartTimeCheckValue, e._latestVideoStartTime, y._isStreamIOSPlaceholderFixesKillSwitchActivated() ? e._latestChannelSortBy : void 0)
                  }
                },
                r = o.createElement(x, t);
              this._component = a.render(r, u.HTMLEmbed.getRealWebPartDom(this.domElement))
            }, t.prototype._createStreamChannelPlaceholderIOSComponent = function() {
              var e = this,
                t = {
                  htmlEmbedProps: {},
                  placeholderProps: {
                    description: "",
                    icon: R,
                    iconText: f.i,
                    buttonLabel: f.d,
                    onAdd: function() {
                      w.handleIOSPlaceholderClick(e._latestValidVideoSource, e._latestSourceType, e._latestVideoStartTimeCheckValue, e._latestVideoStartTime, e._latestChannelSortBy, y._isStreamIOSPlaceholderFixesKillSwitchActivated() ? void 0 : e._latestBrowseSortBy, y._isStreamIOSPlaceholderFixesKillSwitchActivated() ? void 0 : e._latestBrowseSearchTerm)
                    },
                    contentClassName: this._latestSourceType
                  },
                  displayMode: c.DisplayMode.Edit,
                  renderCompleted: this._htmlEmbedRenderCompleted,
                  captionText: this.properties.captionText,
                  qosPrefixName: S.streamWebPartName,
                  emphasisTheme: this._emphasisTheme
                },
                r = o.createElement(u.HTMLEmbed, t);
              this._component = a.render(r, u.HTMLEmbed.getRealWebPartDom(this.domElement))
            }, t.prototype._createStreamPlaceholderIOSComponent = function() {
              (this.displayMode !== c.DisplayMode.Read || this._latestValidVideoSource) && (this._latestSourceType === v.video ? this._createStreamVideoPlaceholderIOSComponent() : this._createStreamChannelPlaceholderIOSComponent())
            }, t.prototype._createStreamComponent = function(e) {
              var t = {
                streamVideoProps: {
                  htmlEmbedProps: e,
                  placeholderProps: {
                    description: f.l,
                    icon: R,
                    iconText: f.i,
                    buttonLabel: f.c,
                    onAdd: this.context.propertyPane.open.bind(this),
                    contentClassName: this._latestSourceType
                  },
                  displayMode: this.displayMode,
                  renderCompleted: this._htmlEmbedRenderCompleted,
                  captionText: this.properties.captionText,
                  qosPrefixName: S.streamWebPartName,
                  emphasisTheme: this._emphasisTheme
                },
                containerWidth: this.width,
                showHeader: w.isShowHeader(this._latestSourceType),
                isEditMode: this.displayMode === c.DisplayMode.Edit,
                title: this.properties.title,
                onTitleChange: this._onTitleChange,
                onCaptionChange: this._onCaptionChange,
                linkUrl: w.getBrowseViewMoreLinkUrl(this._latestBrowseSearchTerm)
              };
              this._applyFastEmbedExperimentChanges(t);
              var r = o.createElement(T, t),
                i = a.render(r, u.HTMLEmbed.getRealWebPartDom(this.domElement));
              this._component = i.embedComponent
            }, t.prototype._applyFastEmbedExperimentChanges = function(e) {
              var t = e.streamVideoProps,
                r = t.htmlEmbedProps.src;
              if (this._latestSourceType === v.video && r) {
                var i = new m.Uri(r);
                y._isStreamHostCorrelationIdKSActivated() || i.setQueryParameter("hostCorrelationId", this._streamCorrelationId), i.setQueryParameter("thinEmbed", "true"), i.removeQueryParameter("preload"), (this.displayMode === c.DisplayMode.Edit || this.properties.streamVideoThumbnail && this.properties.videoTitle) && (i.setQueryParameter("delayLoadUI", "true"), this.properties.streamVideoThumbnail && (e.videoThumbnail = this._getVideoThumbnailRequest(this.properties.streamVideoThumbnail)), e.backplateTitle = this.properties.videoTitle), t.htmlEmbedProps.src = i.toString()
              }
            }, t.prototype._getVideoThumbnailRequest = function(e) {
              var t = this.context.pageContext,
                r = t.site,
                i = t.web,
                o = this.properties.streamVideoThumbnail,
                a = o.listId,
                n = o.uniqueId,
                s = o.serverRelativeUrl;
              return {
                absoluteUrl: i.absoluteUrl,
                siteId: r.id.toString(),
                webId: i.id.toString(),
                listId: a,
                uniqueId: n,
                spResource: s,
                fileType: d.ExtensionHelper.getExtension(new m.Uri(s)),
                callerId: "streamEmbed"
              }
            }, t.prototype._createO365Component = function(e) {
              var t = {
                  htmlEmbedProps: e,
                  placeholderProps: {
                    description: f.j,
                    icon: "OfficeVideoLogo",
                    iconText: f.k,
                    buttonLabel: f.b,
                    onAdd: this.context.propertyPane.open.bind(this),
                    webpartWidth: this.width
                  },
                  displayMode: this.displayMode,
                  renderCompleted: this._htmlEmbedRenderCompleted,
                  captionText: this.properties.captionText,
                  onCaptionTextChange: y.isHandleO365VideoCaptionChangeKillSwitchActivated() ? void 0 : this._handleO365VideoCaptionChange,
                  qosPrefixName: S.webPartName,
                  emphasisTheme: this._emphasisTheme,
                  thumbnailUrl: this.previewImageUrl + ".PNG?VideoPreview=1&width=" + this.width,
                  previewImageDisplayTimeoutInMs: 2e3,
                  thumbnailAltText: f.Y
                },
                r = o.createElement(u.HTMLEmbed, t);
              this._component = a.render(r, u.HTMLEmbed.getRealWebPartDom(this.domElement))
            }, t.prototype._updateShowInfo = function() {
              "" !== this._latestValidEmbedCode && (this.properties.showInfo ? this._latestValidEmbedCode = this._latestValidEmbedCode.replace(/showInfo=false/g, "showInfo=true") : this._latestValidEmbedCode = this._latestValidEmbedCode.replace(/showInfo=true/g, "showInfo=false"))
            }, t.prototype._setErrorMessageByVideoUrl = function(e) {
              var t = _.O365VideoIframeUtilities.getChidVidFromVideoUrl(e);
              c.Guid.isValid(t[_.O365VideoIframeUtilities.vidKey]) && c.Guid.isValid(t[_.O365VideoIframeUtilities.chidKey]) ? this._errorMessage = "" : (this._inputEngagementData = S.getInputEngagementData(e, 1), this._isChannelURL(e) ? this._errorMessage = f.E : this._isVideoPortalURL(e) ? this._errorMessage = f.F : (this._errorMessage = f.A, this._setO365VideoPortalLinkVisible(!0)))
            }, t.prototype._emptyLatestValidVideoCode = function() {
              this._latestValidEmbedCode = "", this._latestValidVideoSource = ""
            }, t.prototype._setO365VideoPortalLinkVisible = function(e) {
              this._o365VideoPortalLink && this._o365VideoPortalLink.setVisible(e)
            }, t.prototype._shouldValidate = function(e) {
              return this._latestValidVideoSource !== e && this._latestValidatedVideoSource !== e
            }, t.prototype._handleOAuthError = function(e) {
              this._oAuthError = e, this.render()
            }, t.prototype._isChannelURL = function(e) {
              return /PointPublishing.aspx?.*chid=/i.test(e) && !/vid=/i.test(e)
            }, t.prototype._isVideoPortalURL = function(e) {
              return /PointPublishing.aspx?.*app=video&p=h$/i.test(e) && !/vid=/i.test(e) && !/chid=/i.test(e)
            }, t.prototype._calculateSourceType = function(e, t) {
              return e || (e = ""), -1 !== (e = e.toUpperCase()).indexOf(v.video) ? v.video : -1 !== e.indexOf(v.channel) ? v.channel : t || v.browse
            }, Object.defineProperty(t.prototype, "_videoId", {
              get: function() {
                if (this._latestSourceType === v.video) {
                  var e = this._latestValidVideoSource.match("(/video/)([a-z|0-9|-]*)");
                  return e && e.length > 0 && e[e.length - 1] || void 0
                }
              },
              enumerable: !0,
              configurable: !0
            }), Object(i.__decorate)([n.autobind], t.prototype, "onPropertyPaneFieldChanged", null), Object(i.__decorate)([n.autobind], t.prototype, "_getStreamPropertyPanelBottomFields", null), Object(i.__decorate)([n.autobind], t.prototype, "_handleOAuthError", null), t
          }(h.BaseClientSideWebPart);
        t.default = k
      },
      br4S: function(e, t) {
        e.exports = s
      },
      cDcd: function(e, t) {
        e.exports = d
      },
      "d+7Q": function(e) {
        e.exports = JSON.parse('{"b":"Help manage time better by adding Microsoft Bookings page link","c":"Microsoft Bookings","d":"This is not a Bookings link. Please use a valid Bookings URL.","a":"Link to a Bookings page"}')
      },
      faye: function(e, t) {
        e.exports = l
      },
      fwx1: function(e, t) {
        e.exports = c
      },
      "hiL/": function(e, t) {
        e.exports = h
      },
      "iZ/7": function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = function() {
          function e() {}
          return e.tokenCacheSessionStorageId = "tokenCache", e.aboutToExpireIntervalSeconds = 600, e.apiUrl = "/_api/SP.OAuth.Token/Acquire", e.retries = 3, e.retriableErrorCodes = [10006, 10008], e.unexpectedErrorCodeFormat = "Expected error code format is <numericCode>, <exception class name>", e.unexpectedTokenMessageFormat = "Your token request succeedeed but the token could not be parsed from the response.This is most probably caused by a change in the server response format", e.npmPackageVersion = "0.1.5", e
        }();
        t.default = i
      },
      jHvI: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r("AmIq");
        Object.defineProperty(t, "OAuthUtility", {
          enumerable: !0,
          get: function() {
            return i.default
          }
        });
        var o = r("EB4i");
        Object.defineProperty(t, "OAuthUtilityError", {
          enumerable: !0,
          get: function() {
            return o.default
          }
        }), Object.defineProperty(t, "OAuthUtilityErrorType", {
          enumerable: !0,
          get: function() {
            return o.OAuthUtilityErrorType
          }
        })
      },
      jOlS: function(e, t) {
        e.exports = _
      },
      k3Fh: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r("17wl"),
          o = r("fwx1"),
          a = r("Pk8u"),
          n = function() {
            function e() {}
            return e.acceptedBookingsDomains = [Object(a.escapeRegExp)("outlook-sdf.office.com"), Object(a.escapeRegExp)("outlook.office.com"), Object(a.escapeRegExp)("outlook-sdf.office365.com"), Object(a.escapeRegExp)("outlook.office365.com")], e
          }(),
          s = r("d+7Q"),
          d = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "acceptedDomains", {
              get: function() {
                return n.acceptedBookingsDomains
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "embedStrings", {
              get: function() {
                return t._embedStrings
              },
              enumerable: !0,
              configurable: !0
            }), t._embedStrings = {
              buttonPlaceHolderActionLabel: s.a,
              emptyPlaceHolderEmbedWebPartDescription: s.b,
              emptyPlaceholderEmbedWebPartIconLabel: s.c,
              incorrectURLError: s.d,
              placeHolderIcon: void 0
            }, t
          }(o.BaseEmbedWebPart);
        t.default = d
      },
      krEX: function(e, t) {
        e.exports = p
      },
      nw6A: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r("17wl"),
          o = r("UWqr"),
          a = r("br4S"),
          n = r("fwx1"),
          s = /^(([0-9]?[0-9]?[0-9]))?:([0-5]?[0-9])(:([0-5]?[0-9]))?$/,
          d = /^\d+$/;
  
        function l(e) {
          return s.test(e)
        }
        var c = r("Pk8u"),
          h = function() {
            function e() {}
            return e.nocookieURL = "www.youtube-nocookie.com", e.controlsParam = "controls", e.showinfoParam = "showinfo", e.startTimeParam = "start", e.youTubeDefaultDomain = "www.youtube.com", e.acceptedYouTubeDomains = [Object(c.escapeRegExp)("youtube.com"), Object(c.escapeRegExp)("www.youtube.com"), Object(c.escapeRegExp)("www.youtube-nocookie.com"), Object(c.escapeRegExp)("youtu.be")], e
          }(),
          _ = r("8Aeb"),
          p = r("ZHzX"),
          m = function(e) {
            function t() {
              var t = e.call(this) || this;
              return t._validateNumericalStartTime = t._validateNumericalStartTime.bind(t), t
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "acceptedDomains", {
              get: function() {
                return h.acceptedYouTubeDomains
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "embedStrings", {
              get: function() {
                return t._embedStrings
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.populateRunTimeState = function(e) {
              if (this._latestValidEmbedCodeHtml) {
                var t = n.HTMLEmbed.htmlAttrSplit(this._latestValidEmbedCodeHtml);
                return this._createRunTimeState(t)
              }
              return {
                isPrivate: !1,
                showControls: !0,
                startTime: ""
              }
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  title: {
                    isSearchablePlainText: !0
                  },
                  captionText: {
                    isSearchablePlainText: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.onBeforeSerialize = function() {
              e.prototype.onBeforeSerialize.call(this), delete this.properties.runtimeState.showRelatedVideos, delete this.properties.runtimeState.showInfo
            }, t.prototype.onPropertyPaneFieldChanged = function(e, t, r) {
              if (-1 !== e.indexOf("runtimeState")) {
                switch (e.replace("runtimeState.", "")) {
                  case "isPrivate":
                    this.properties.runtimeState.isPrivate = r;
                    break;
                  case "showControls":
                    this.properties.runtimeState.showControls = r;
                    break;
                  case "startTime":
                    this.properties.runtimeState.startTime = r
                }
                this._latestValidEmbedCodeHtml = this._generateIframeEmbedCode()
              } else "embedCode" === e && r && r !== t && (this.properties.runtimeState = this.populateRunTimeState(this.properties))
            }, t.prototype.getPropertyPaneConfiguration = function() {
              var e = !this.properties.embedCode;
              return {
                pages: [{
                  header: {
                    description: p.b
                  },
                  groups: [{
                    groupFields: [Object(a.PropertyPaneTextField)("embedCode", {
                      label: p.c,
                      value: this.properties.embedCode,
                      multiline: !0,
                      onGetErrorMessage: this.validateEmbeddableCode.bind(this),
                      deferredValidationTime: 2e3,
                      placeholder: p.g,
                      ariaLabel: o.Text.format(_.a, _.s, _.Q),
                      rows: 5
                    }), Object(a.PropertyPaneLink)("embedCodeLink", {
                      text: p.h,
                      href: p.i,
                      target: "_blank"
                    }), Object(a.PropertyPaneTextField)("runtimeState.startTime", {
                      label: p.k,
                      value: this.properties.runtimeState.startTime,
                      multiline: !1,
                      placeholder: "00:00",
                      onGetErrorMessage: this._validateNumericalStartTime,
                      deferredValidationTime: 1e3,
                      disabled: e
                    }), Object(a.PropertyPaneToggle)("runtimeState.showControls", {
                      label: p.l,
                      disabled: e
                    }), Object(a.PropertyPaneToggle)("runtimeState.isPrivate", {
                      label: p.m,
                      disabled: e
                    })]
                  }]
                }]
              }
            }, t.prototype._applyRuntimeStateToEmbedCode = function() {
              this._latestValidEmbedCodeHtml = this._generateIframeEmbedCode()
            }, t.prototype._validateNumericalStartTime = function(e) {
              if (!e) return "";
              if (l(e)) this._startTime = function(e) {
                if (l(e)) {
                  var t = e.split(":"),
                    r = 0;
                  return 3 === t.length && (r += 3600 * parseInt(t.splice(0, 1)[0], 10)), r + (60 * parseInt(t[0], 10) + parseInt(t[1], 10))
                }
                return -1
              }(e);
              else {
                if (! function(e) {
                    return d.test(e)
                  }(e)) return this._startTime = void 0, p.j;
                this._startTime = parseInt(e, 10)
              }
              return ""
            }, t.prototype._generateIframeEmbedCode = function() {
              if (this._latestValidEmbedCodeHtml) {
                var e = n.HTMLEmbed.normalize(this._latestValidEmbedCodeHtml.trim()),
                  t = n.HTMLEmbed.htmlAttrSplit(e),
                  r = new URL(t[n.HTMLEmbed.srcStr]);
                return this.properties.runtimeState.isPrivate ? r.hostname = h.nocookieURL : r.hostname = h.youTubeDefaultDomain, this.properties.runtimeState.showControls ? r.searchParams.delete(h.controlsParam) : r.searchParams.set(h.controlsParam, "0"), this.properties.runtimeState.startTime ? (this._startTime || this._validateNumericalStartTime(this.properties.runtimeState.startTime), r.searchParams.set(h.startTimeParam, this._startTime.toString())) : r.searchParams.delete(h.startTimeParam), t[n.HTMLEmbed.srcStr] = r.href, n.HTMLEmbed.iframeAttributeMaptoString(t)
              }
            }, t.prototype._createRunTimeState = function(e) {
              var t = new URL(e[n.HTMLEmbed.srcStr]);
              return {
                isPrivate: t.hostname === h.nocookieURL,
                showControls: !t.searchParams.has(h.controlsParam),
                startTime: t.searchParams.has(h.startTimeParam) ? t.searchParams.get(h.startTimeParam) : void 0
              }
            }, t._embedStrings = {
              buttonPlaceHolderActionLabel: p.a,
              emptyPlaceHolderEmbedWebPartDescription: p.d,
              emptyPlaceholderEmbedWebPartIconLabel: p.e,
              incorrectURLError: p.f,
              placeHolderIcon: void 0
            }, t
          }(n.BaseEmbedWebPart);
        t.default = m
      },
      pg8z: function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t["275c0095-a77e-4f6d-a2a0-6a7626911518"] = r("ZOpO"), t["490d7c76-1824-45b2-9de3-676421c997fa"] = r("qd2E"), t["544dd15b-cf3c-441b-96da-004d5a8cea1d"] = r("nw6A"), t["46698648-fcd5-41fc-9526-c7f7b2ace919"] = r("X89z"), t["d24a7165-c455-4d43-8bc8-fedb04d6c1b5"] = r("k3Fh")
      },
      q1Tm: function(e, t, r) {
        "use strict";
        e.exports = function(e) {
          var t = [];
          return t.toString = function() {
            return this.map(function(t) {
              var r = function(e, t) {
                var r, i, o, a = e[1] || "",
                  n = e[3];
                if (!n) return a;
                if (t && "function" == typeof btoa) {
                  var s = (r = n, i = btoa(unescape(encodeURIComponent(JSON.stringify(r)))), o = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i), "/*# ".concat(o, " */")),
                    d = n.sources.map(function(e) {
                      return "/*# sourceURL=".concat(n.sourceRoot).concat(e, " */")
                    });
                  return [a].concat(d).concat([s]).join("\n")
                }
                return [a].join("\n")
              }(t, e);
              return t[2] ? "@media ".concat(t[2], "{").concat(r, "}") : r
            }).join("")
          }, t.i = function(e, r) {
            "string" == typeof e && (e = [
              [null, e, ""]
            ]);
            for (var i = {}, o = 0; o < this.length; o++) {
              var a = this[o][0];
              null != a && (i[a] = !0)
            }
            for (var n = 0; n < e.length; n++) {
              var s = e[n];
              null != s[0] && i[s[0]] || (r && !s[2] ? s[2] = r : r && (s[2] = "(".concat(s[2], ") and (").concat(r, ")")), t.push(s))
            }
          }, t
        }
      },
      qd2E: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r("17wl"),
          o = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(i.__extends)(t, e), Object.defineProperty(t.prototype, "isDynamicDataEnabled", {
              get: function() {
                return !0
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(r("fwx1").BaseEmbedWebPart);
        t.default = o
      },
      ut3N: function(e, t) {
        e.exports = m
      },
      vlQI: function(e, t) {
        e.exports = u
      },
      y88i: function(e, t) {
        e.exports = f
      }
    })
  });