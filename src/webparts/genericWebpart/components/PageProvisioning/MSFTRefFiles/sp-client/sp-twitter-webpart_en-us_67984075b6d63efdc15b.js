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



define("f6fdf4f8-4a24-437b-a127-32e66a5dd9b4_0.1.0", ["tslib", "@ms/sp-telemetry", "@microsoft/sp-component-base", "@microsoft/sp-loader", "@microsoft/office-ui-fabric-react-bundle", "@microsoft/sp-lodash-subset", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities", "@microsoft/load-themed-styles", "@ms/odsp-utilities-bundle"], function(e, t, r, n, o, i, a, s, p, c, u, d, l, f) {
    return function(e) {
      function t(t) {
        for (var r, o, i = t[0], a = t[1], s = 0, c = []; s < i.length; s++) o = i[s], Object.prototype.hasOwnProperty.call(n, o) && n[o] && c.push(n[o][0]), n[o] = 0;
        for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
        for (p && p(t); c.length;) c.shift()()
      }
      var r = {},
        n = {
          0: 0
        };
  
      function o(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
          i: t,
          l: !1,
          exports: {}
        };
        return e[t].call(n.exports, n, n.exports, o), n.l = !0, n.exports
      }
      o.e = function(e) {
        var t = [],
          r = n[e];
        if (0 !== r)
          if (r) t.push(r[2]);
          else {
            var i = new Promise(function(t, o) {
              r = n[e] = [t, o]
            });
            t.push(r[2] = i);
            var a, s = document.createElement("script");
            s.charset = "utf-8", s.timeout = 120, o.nc && s.setAttribute("nonce", o.nc), s.src = function(e) {
              return o.p + "chunk." + ({
                1: "twitter-web-part-property-pane-configuration"
              } [e] || e) + "_" + "en-us" + "_" + {
                1: "eb878a49da9e07b7a193"
              } [e] + ".js"
            }(e);
            var p = new Error;
            a = function(t) {
              s.onerror = s.onload = null, clearTimeout(c);
              var r = n[e];
              if (0 !== r) {
                if (r) {
                  var o = t && ("load" === t.type ? "missing" : t.type),
                    i = t && t.target && t.target.src;
                  p.message = "Loading chunk " + e + " failed.\n(" + o + ": " + i + ")", p.name = "ChunkLoadError", p.type = o, p.request = i, r[1](p)
                }
                n[e] = void 0
              }
            };
            var c = setTimeout(function() {
              a({
                type: "timeout",
                target: s
              })
            }, 12e4);
            s.onerror = s.onload = a, document.head.appendChild(s)
          } return Promise.all(t)
      }, o.m = e, o.c = r, o.d = function(e, t, r) {
        o.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: r
        })
      }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        })
      }, o.t = function(e, t) {
        if (1 & t && (e = o(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (o.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var n in e) o.d(r, n, function(t) {
            return e[t]
          }.bind(null, n));
        return r
      }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e.default
        } : function() {
          return e
        };
        return o.d(t, "a", t), t
      }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, o.p = "", o.oe = function(e) {
        throw console.error(e), e
      };
      var i = window.webpackJsonpf6fdf4f8_4a24_437b_a127_32e66a5dd9b4_0_1_0 = window.webpackJsonpf6fdf4f8_4a24_437b_a127_32e66a5dd9b4_0_1_0 || [],
        a = i.push.bind(i);
      i.push = t, i = i.slice();
      for (var s = 0; s < i.length; s++) t(i[s]);
      var p = a;
      return function() {
        var e, t = document.getElementsByTagName("script"),
          r = "undefined" != typeof spScriptNamePattern ? spScriptNamePattern : /sp-twitter-webpart_en-us_67984075b6d63efdc15b\.js/i;
        if (t && t.length)
          for (var n = 0; n < t.length; n++)
            if (t[n]) {
              var i = t[n].getAttribute("src");
              if (i && i.match(r)) {
                e = i.substring(0, i.lastIndexOf("/") + 1);
                break
              }
            } if (!e)
          for (var a in window.__setWebpackPublicPathLoaderSrcRegistry__)
            if (a && a.match(r)) {
              e = a.substring(0, a.lastIndexOf("/") + 1);
              break
            } o.p = e
      }(), o(o.s = "qqS3")
    }({
      "17wl": function(t, r) {
        t.exports = e
      },
      "2q6Q": function(e, r) {
        e.exports = t
      },
      "7Awa": function(e, t) {
        e.exports = r
      },
      "Bv/Y": function(e) {
        e.exports = JSON.parse('{"a":"Press the Enter key or the Down arrow key to enter the Twitter web part."}')
      },
      Ds9I: function(e, t, r) {
        (e.exports = r("q1Tm")(!1)).push([e.i, '.b_b_3c79a007:focus{position:relative}.b_b_3c79a007:focus:after{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border:1px solid "[theme:neutralsecondary, default: #605e5c]";border-radius:inherit;pointer-events:none}', ""])
      },
      I6O9: function(e, t) {
        e.exports = n
      },
      JEu8: function(e, t, r) {
        "use strict";
        var n = r("r9vP");
        r.o(n, "getTimelineDataSource") && r.d(t, "getTimelineDataSource", function() {
          return n.getTimelineDataSource
        });
        var o = r("S4cx");
        r.d(t, "getTimelineDataSource", function() {
          return o.a
        })
      },
      KL1q: function(e, t) {
        e.exports = o
      },
      LeJD: function(e, t, r) {
        var n = r("Ds9I"),
          o = r("jOlS");
        "string" == typeof n && (n = [
          [e.i, n]
        ]);
        for (var i = 0; i < n.length; i++) o.loadStyles(n[i][1], !0);
        n.locals && (e.exports = n.locals)
      },
      Pk8u: function(e, t) {
        e.exports = i
      },
      S4cx: function(e, t, r) {
        "use strict";
        r.d(t, "a", function() {
          return p
        });
        var n = r("y88i"),
          o = new(r("hiL/").KillSwitch)("22c71747-0920-4893-93e0-78cb3702777d"),
          i = o.isActivated() ? /(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?\w+\/status(?:es)?\/)(\d+)/i : /(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?\w+\/status(?:es)?\/)(\d+)(\?.+)?$/i,
          a = o.isActivated() ? /^https?:\/\/(?:www\.)?twitter\.com\/\w+\/timelines\/(\d+)/i : /^https?:\/\/(?:www\.)?twitter\.com\/\w+\/timelines\/(\d+)$/i,
          s = /^http(s?):\/\/(\w+\.)*twitter\.com\/\w{1,15}$/i;
  
        function p(e) {
          return e ? a.test(e) || Boolean(Number(e)) ? {
            sourceType: "collection",
            id: c(e)
          } : i.test(e) ? {
            sourceType: "tweet",
            tweetId: u(e)
          } : s.test(e) ? {
            sourceType: "url",
            url: e
          } : function(e) {
            try {
              var t = (new DOMParser).parseFromString(e, "text/html").body.firstElementChild;
              return Boolean(t)
            } catch (e) {
              return !1
            }
          }(e) ? {
            sourceType: "widget",
            widgetId: d(e)
          } : "@" === e.charAt(0) ? {
            sourceType: "profile",
            screenName: l(e)
          } : {
            sourceType: "unknown"
          } : {
            sourceType: "unknown"
          }
        }
  
        function c(e) {
          return e.split("/").pop().trim()
        }
  
        function u(e) {
          return o.isActivated() ? Boolean(Number(e)) ? e : e && i.test(e) ? e.split("/").pop().trim() : void 0 : new n.Uri(e).getLastPathSegment()
        }
  
        function d(e) {
          return Boolean(Number(e)) ? e : (new DOMParser).parseFromString(e, "text/html").body.firstElementChild.getAttribute("data-widget-id")
        }
  
        function l(e) {
          return e.substring(1)
        }
      },
      U4ag: function(e, t) {
        e.exports = a
      },
      UWqr: function(e, t) {
        e.exports = s
      },
      br4S: function(e, t) {
        e.exports = p
      },
      cDcd: function(e, t) {
        e.exports = c
      },
      "ccP+": function(e) {
        e.exports = JSON.parse('{"a":"The user name, tweet, or collection is not available. Check to make sure it exists, and try again."}')
      },
      "fRd/": function(e) {
        e.exports = JSON.parse('{"f":"Twitter","c":"Invalid tweet source","e":"Twitter {0} the Internet Explorer 11 browser.","d":"no longer supports","b":" For this web part to work properly, {0}.","a":"use a browser supported by Twitter"}')
      },
      faye: function(e, t) {
        e.exports = u
      },
      hJg2: function(e) {
        e.exports = JSON.parse('{"a":"The link you entered isn\\u0027t working. Check the link and try again."}')
      },
      "hiL/": function(e, t) {
        e.exports = d
      },
      jOlS: function(e, t) {
        e.exports = l
      },
      q1Tm: function(e, t, r) {
        "use strict";
        e.exports = function(e) {
          var t = [];
          return t.toString = function() {
            return this.map(function(t) {
              var r = function(e, t) {
                var r, n, o, i = e[1] || "",
                  a = e[3];
                if (!a) return i;
                if (t && "function" == typeof btoa) {
                  var s = (r = a, n = btoa(unescape(encodeURIComponent(JSON.stringify(r)))), o = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(n), "/*# ".concat(o, " */")),
                    p = a.sources.map(function(e) {
                      return "/*# sourceURL=".concat(a.sourceRoot).concat(e, " */")
                    });
                  return [i].concat(p).concat([s]).join("\n")
                }
                return [i].join("\n")
              }(t, e);
              return t[2] ? "@media ".concat(t[2], "{").concat(r, "}") : r
            }).join("")
          }, t.i = function(e, r) {
            "string" == typeof e && (e = [
              [null, e, ""]
            ]);
            for (var n = {}, o = 0; o < this.length; o++) {
              var i = this[o][0];
              null != i && (n[i] = !0)
            }
            for (var a = 0; a < e.length; a++) {
              var s = e[a];
              null != s[0] && n[s[0]] || (r && !s[2] ? s[2] = r : r && (s[2] = "(".concat(s[2], ") and (").concat(r, ")")), t.push(s))
            }
          }, t
        }
      },
      qqS3: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r("17wl"),
          o = r("cDcd"),
          i = r("faye"),
          a = r("KL1q"),
          s = r("7Awa"),
          p = r("UWqr"),
          c = r("br4S"),
          u = r("2q6Q"),
          d = r("JEu8"),
          l = r("U4ag"),
          f = r("Pk8u"),
          h = r("hiL/"),
          m = r("I6O9"),
          _ = r("Bv/Y");
        r("LeJD");
        var y = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._mounted = !1, t._setRef = function(e) {
                t._twitterWidgetContainer = e
              }, t._handleKeyDown = function(e) {
                e.keyCode !== a.KeyCodes.enter && e.keyCode !== a.KeyCodes.down || (e.preventDefault(), e.target.firstChild.focus())
              }, t._getTwitter = function(e) {
                var t = new u._QosMonitor("TwitterWebpart.ScriptReady");
                return new Promise(function(r, n) {
                  try {
                    e.ready(function(e) {
                      t.writeSuccess(), r(e)
                    })
                  } catch (e) {
                    t.writeUnexpectedFailure("ScriptNotReady", e), n(e)
                  }
                })
              }, t
            }
            return Object(n.__extends)(t, e), t.prototype.componentDidMount = function() {
              var e = this;
              this._mounted = !0, this._loadWidgetScript().then(this._getTwitter).then(function(t) {
                e._twitterWidgetContainer.innerHTML = "", e.props.createComponent(e._twitterWidgetContainer, t).catch(f.noop)
              }).catch(f.noop)
            }, t.prototype.componentWillUnmount = function() {
              this._mounted = !1
            }, t.prototype.componentDidUpdate = function() {
              var e = this;
              this._loadWidgetScript().then(this._getTwitter).then(function(t) {
                e._twitterWidgetContainer.innerHTML = "", e.props.createComponent(e._twitterWidgetContainer, t).catch(f.noop)
              }).catch(f.noop)
            }, t.prototype.render = function() {
              return o.createElement("div", {
                role: "presentation",
                tabIndex: 0,
                onKeyDown: this._handleKeyDown,
                "aria-label": _.a,
                className: "b_b_3c79a007",
                ref: this._setRef,
                "data-automation-id": "twitterWidget"
              })
            }, t.prototype._loadWidgetScript = function() {
              var e = this;
              return h.RetryHelper.retry(3, "TwitterWebPart", "LoadComponent", function() {
                return m.SPComponentLoader.loadScript("https://platform.twitter.com/widgets.js", {
                  globalExportsName: "twttr"
                })
              }).then(function(t) {
                if (!e._mounted) throw new h.ExpectedFailure("ComponentUnmounted");
                if (!t) throw new Error("LoadScriptError");
                if (e._twitterWidgetContainer) return t;
                throw new Error("WidgetContainerUnavailable")
              }).catch(function(e) {
                return Promise.reject(e)
              })
            }, Object(n.__decorate)([Object(h.monitor)("TwitterWebpart.LoadWidgetScript")], t.prototype, "_loadWidgetScript", null), t
          }(o.Component),
          b = r("ccP+"),
          g = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._createComponent = function(e, r) {
                return t._createTimeline(e, r).then(function(r) {
                  r ? r.tabIndex = 0 : (e.innerHTML = b.a, e.tabIndex = -1), t.props.onLoadCompleted()
                }).catch(function(e) {
                  throw t.props.onLoadCompleted(), e
                })
              }, t
            }
            return Object(n.__extends)(t, e), t.prototype.shouldComponentUpdate = function(e) {
              return !Object(f.isEqual)(e, this.props)
            }, t.prototype.render = function() {
              return o.createElement(y, {
                createComponent: this._createComponent
              })
            }, t.prototype._createTimeline = function(e, t) {
              try {
                return "list" === this.props.layoutType ? t.widgets.createTimeline(this.props.dataSource, e, this.props.options) : "grid" === this.props.layoutType && "collection" === this.props.dataSource.sourceType ? t.widgets.createGridFromCollection(this.props.dataSource.id, e, this.props.options) : Promise.reject(this.props.layoutType)
              } catch (e) {
                return Promise.reject(e)
              }
            }, Object(n.__decorate)([Object(h.monitor)("TwitterWebPart.CreateTimeline")], t.prototype, "_createTimeline", null), t
          }(o.Component),
          w = r("hJg2"),
          v = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(n.__extends)(t, e), t.prototype.shouldComponentUpdate = function(e) {
              return !Object(f.isEqual)(e, this.props)
            }, t.prototype.render = function() {
              return o.createElement(y, {
                createComponent: this._createTweet
              })
            }, t.prototype._createTweet = function(e, t) {
              var r = this;
              try {
                return t.widgets.createTweet(this.props.tweetId, e, this.props.options).then(function(t) {
                  t ? (t.tabIndex = 0, r.props.onLoadCompleted()) : (e.innerHTML = w.a, e.tabIndex = -1, r.props.onLoadCompleted())
                }).catch(function(e) {
                  throw r.props.onLoadCompleted(), e
                })
              } catch (e) {
                return Promise.reject(e)
              }
            }, Object(n.__decorate)([a.autobind, Object(h.monitor)("TwitterWebPart.CreateTweet")], t.prototype, "_createTweet", null), t
          }(o.Component),
          T = r("fRd/"),
          C = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._onLoadCompleted = function() {
                t.props.onRenderCompleted && t.props.onRenderCompleted()
              }, t
            }
            return Object(n.__extends)(t, e), t.prototype.render = function() {
              return o.createElement("div", null, o.createElement(l.WebPartTitle, {
                edit: this.props.isEdit,
                title: this.props.title,
                onTitleChange: this.props.onTitleChange,
                placeholder: T.f,
                marginBottomSize: "Large",
                theme: this.props.theme
              }), this.props.isIE ? this._errorMessageForIE : this._twitterWidget)
            }, Object.defineProperty(t.prototype, "_errorMessageForIE", {
              get: function() {
                var e = T.e,
                  t = e ? e.split("{0}") : [],
                  r = T.b,
                  n = r ? r.split("{0}") : [];
                try {
                  return o.createElement("div", null, o.createElement("span", null, t[0]), o.createElement(a.Link, {
                    href: "https://go.microsoft.com/fwlink/?linkid=2114003",
                    target: "_blank",
                    theme: this.props.theme
                  }, T.d), o.createElement("span", null, t[1]), o.createElement("span", null, n[0]), o.createElement(a.Link, {
                    href: "https://go.microsoft.com/fwlink/?linkid=2114004",
                    target: "_blank",
                    theme: this.props.theme
                  }, T.a), o.createElement("span", null, n[1]))
                } catch (e) {}
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_twitterWidget", {
              get: function() {
                var e = Object(d.getTimelineDataSource)(this.props.term.trim()),
                  t = parseInt(this.props.limit, 0),
                  r = {
                    height: "400",
                    width: this.props.widthSlider + "%",
                    chrome: this._twitterDataChrome,
                    tweetLimit: t,
                    limit: t,
                    theme: this.props.displayLightTheme ? "light" : "dark",
                    username: "profile" === e.sourceType ? e.screenName : void 0
                  };
                return "unknown" === e.sourceType ? o.createElement("div", {
                  "data-automation-id": "invalidTweetSource"
                }, T.c) : "tweet" === e.sourceType ? o.createElement(v, {
                  tweetId: e.tweetId,
                  options: r,
                  onLoadCompleted: this._onLoadCompleted
                }) : o.createElement(g, {
                  dataSource: e,
                  options: r,
                  layoutType: "collection" === e.sourceType ? this.props.displayAs : "list",
                  onLoadCompleted: this._onLoadCompleted
                })
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_twitterDataChrome", {
              get: function() {
                var e = [];
                return this.props.displayBorders || e.push("noborders"), this.props.displayFooter || e.push("nofooter"), this.props.displayHeader || e.push("noheader"), e.join(" ").trim()
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(o.PureComponent),
          S = r("twK4"),
          j = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._handleThemeChangedEvent = function(e) {
                t._variantTheme = e.theme, t.render()
              }, t
            }
            return Object(n.__extends)(t, e), t.prototype.onInit = function() {
              return this._getSectionBackgroundTheme(), void 0 !== this.properties.displayLightTheme || (this.properties.displayLightTheme = !Object(a.getTheme)().isInverted), e.prototype.onInit.call(this)
            }, t.prototype.render = function() {
              var e = p._BrowserDetection.getBrowserInformation().browser === p._Browser.IE,
                t = o.createElement(C, Object(n.__assign)(Object(n.__assign)({}, this.properties), {
                  isIE: e,
                  isEdit: this.displayMode === p.DisplayMode.Edit,
                  onTitleChange: this._onTitleChange,
                  onRenderCompleted: this.renderCompleted,
                  theme: this._variantTheme
                }));
              i.render(t, this.domElement), this.displayMode !== p.DisplayMode.Edit || this.renderedFromPersistedData || this.context.propertyPane.isPropertyPaneOpen() || e || this.context.propertyPane.open()
            }, t.prototype.onPropertyPaneConfigurationComplete = function() {
              e.prototype.onPropertyPaneConfigurationComplete.call(this);
              var t = Object(d.getTimelineDataSource)(this.properties.term.trim());
              u._EngagementLogger.logEvent("TwitterWebPart.DataSourceType", t.sourceType)
            }, t.prototype.onBeforeSerialize = function() {
              delete this.properties.tweetSourceType
            }, t.prototype.getPropertyPaneConfiguration = function() {
              return {
                pages: [{
                  header: {
                    description: S.a
                  },
                  groups: [{
                    groupFields: this._twitterPropertyPane.customizedGroupFields
                  }]
                }]
              }
            }, t.prototype.loadPropertyPaneResources = function() {
              var e = this;
              return r.e(1).then(r.bind(null, "dhes")).then(function(t) {
                e._twitterPropertyPane = new t.TwitterPropertyPane(e.properties)
              })
            }, Object.defineProperty(t.prototype, "isRenderAsync", {
              get: function() {
                return p._BrowserDetection.getBrowserInformation().browser !== p._Browser.IE
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.onDispose = function() {
              i.unmountComponentAtNode(this.domElement), this.context.serviceScope.consume(s.ThemeProvider.serviceKey).themeChangedEvent.remove(this, this._handleThemeChangedEvent), e.prototype.onDispose.call(this)
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  title: {
                    isSearchablePlainText: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._onTitleChange = function(e) {
              this.properties.title = e
            }, t.prototype._getSectionBackgroundTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(s.ThemeProvider.serviceKey);
                e._variantTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, e._handleThemeChangedEvent)
              })
            }, Object(n.__decorate)([a.autobind], t.prototype, "_onTitleChange", null), t
          }(c.BaseClientSideWebPart);
        t.default = j
      },
      r9vP: function(e, t) {},
      twK4: function(e) {
        e.exports = JSON.parse('{"a":"You can show Tweets from a user, a curated collection."}')
      },
      y88i: function(e, t) {
        e.exports = f
      }
    })
  });