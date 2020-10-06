/**
 * This is the MSFT Button webpart:
 * https://spoprod-a.akamaihd.net/files/sp-client/sp-button-webpart-bundle_en-us_8859ddc1ee474af99714.js
 * 
 * Look in this folder in Sources under Page
 * >>  spoprod-a.akamaihd.net    >> files    >> sp-client    >> sp-button-webpart-bundle_en-us_8859ddc1ee474af99714.js
 * 
 * this.properties:
 * 
 *     label: this.properties.label,
 *     linkUrl: this.properties.linkUrl,
 *     alignment: this.properties.alignment,
 * 
 * 
 */

define("0f087d7f-520e-42b7-89c0-496aaf979d58_0.1.0", ["tslib", "@microsoft/sp-component-base", "@microsoft/office-ui-fabric-react-bundle", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities"], function(e, t, n, o, r, i, a, l, s) {
    return function(e) {
      var t = {};
  
      function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {
          i: o,
          l: !1,
          exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
      }
      return n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: o
        })
      }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        })
      }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var r in e) n.d(o, r, function(t) {
            return e[t]
          }.bind(null, r));
        return o
      }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e.default
        } : function() {
          return e
        };
        return n.d(t, "a", t), t
      }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, n.p = "", n(n.s = "/SFG")
    }({
      "/SFG": function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n("17wl"),
          r = n("cDcd"),
          i = n("faye"),
          a = n("KL1q"),
          l = n("7Awa"),
          s = n("UWqr"),
          c = n("br4S"),
          _ = n("hiL/"),
          d = ["http", "https", "mailto"],
          u = n("B5ub");
  
        function p(e, t) {
          return Object(c.PropertyPaneCustomField)({
            onRender: function(n, l, s) {
              var c = Object(a.getTheme)(),
                _ = {
                  background: c.semanticColors.buttonBackgroundPressed,
                  color: c.palette.themePrimary
                },
                d = {
                  rootHovered: Object(o.__assign)({}, _)
                },
                p = Object(o.__assign)({
                  root: Object(o.__assign)({}, _)
                }, d),
                f = [r.createElement(a.IconButton, {
                  onClick: function() {
                    return s && s(e, "Left")
                  },
                  iconProps: {
                    iconName: "AlignHorizontalLeft"
                  },
                  title: u.b,
                  ariaLabel: u.b,
                  styles: "Left" === t ? p : d,
                  role: "menuitem"
                }), r.createElement(a.IconButton, {
                  onClick: function() {
                    return s && s(e, "Center")
                  },
                  iconProps: {
                    iconName: "AlignHorizontalCenter"
                  },
                  title: u.a,
                  ariaLabel: u.a,
                  styles: "Center" === t ? p : d,
                  role: "menuitem"
                }), r.createElement(a.IconButton, {
                  onClick: function() {
                    return s && s(e, "Right")
                  },
                  iconProps: {
                    iconName: "AlignHorizontalRight"
                  },
                  title: u.c,
                  ariaLabel: u.c,
                  styles: "Right" === t ? p : d,
                  role: "menuitem"
                })];
              Object(a.getRTL)() && f.reverse();
              var m = r.createElement(r.Fragment, null, f);
              i.render(m, n)
            },
            key: "PropertyPaneAlignmentButtonField",
            onDispose: function(e) {
              i.unmountComponentAtNode(e)
            }
          })
        }
        var f = n("U4ag"),
          m = n("98M1"),
          h = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t._getTooltipStyles = function(e) {
              return {
                content: {
                  backgroundColor: e.semanticColors.bodyBackground,
                  color: e.semanticColors.bodyText
                }
              }
            }, t.prototype.render = function() {
              var e = this.props,
                n = e.theme,
                o = e.label,
                i = e.linkUrl,
                l = e.alignment,
                s = e.isEditMode,
                c = Boolean(i || o);
              if (!s && !c) return !1;
              var _ = {
                  root: {
                    height: 40,
                    maxWidth: "100%",
                    borderRadius: 2,
                    padding: "0 20px",
                    fontSize: 16,
                    verticalAlign: "top",
                    pointerEvents: s ? "none" : void 0
                  },
                  flexContainer: {
                    display: "block"
                  },
                  textContainer: {
                    maxWidth: "100%"
                  },
                  label: {
                    lineHeight: 38,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: 0,
                    maxWidth: "100%"
                  }
                },
                d = Object(a.getRTL)() ? l.toLowerCase() + "@noflip" : l.toLowerCase(),
                u = Object(a.mergeStyles)({
                  textAlign: d,
                  outline: 0
                });
              return r.createElement("div", {
                "data-automation-id": "button-container",
                className: u
              }, r.createElement(a.TooltipHost, {
                content: i,
                tooltipProps: {
                  styles: n && t._getTooltipStyles(n)
                },
                styles: {
                  root: {
                    display: "inline-block"
                  }
                }
              }, r.createElement(a.PrimaryButton, {
                "data-automation-id": "button-web-part",
                href: s ? void 0 : i,
                target: Object(f.getUrlTarget)(i),
                disabled: !i,
                styles: _
              }, o || m.a)))
            }, t
          }(r.Component),
          b = Object(a.customizable)("Button", ["theme"])(h),
          g = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._handleThemeChangedEvent = function(e) {
                t._variantTheme = e.theme, t.render()
              }, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this._variantTheme || Object(a.getTheme)(),
                t = r.createElement(a.Customizer, {
                  settings: {
                    theme: e
                  }
                }, r.createElement(b, {
                  label: this.properties.label,
                  linkUrl: this.properties.linkUrl,
                  alignment: this.properties.alignment,
                  isEditMode: this.displayMode === s.DisplayMode.Edit
                }));
              i.render(t, this.domElement)
            }, t.prototype.onDispose = function() {
              this.context.serviceScope.consume(l.ThemeProvider.serviceKey).themeChangedEvent.remove(this, this._handleThemeChangedEvent), i.unmountComponentAtNode(this.domElement), e.prototype.onDispose.call(this)
            }, t.prototype.onInit = function() {
              return this._getSectionBackgroundTheme(), e.prototype.onInit.call(this)
            }, Object.defineProperty(t.prototype, "dataVersion", {
              get: function() {
                return s.Version.parse("1.0")
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.getPropertyPaneConfiguration = function() {
              return e = this.properties.alignment, (t = [Object(c.PropertyPaneTextField)("label", {
                label: u.e,
                placeholder: u.f
              }), Object(c.PropertyPaneTextField)("linkUrl", {
                label: u.g,
                placeholder: "https://",
                onGetErrorMessage: function(e) {
                  return void 0 === _.UrlUtility.ensureSchema(e, d) ? u.j : ""
                },
                deferredValidationTime: 1e3
              }), Object(c.PropertyPaneLabel)("alignmentLabel", {
                text: u.d
              }), p("alignment", e)]).push(Object(c.PropertyPaneCustomField)({
                onRender: function(e) {
                  var t = r.createElement(a.Label, null, u.k, " ", r.createElement(a.Link, {
                    style: {
                      fontWeight: "normal"
                    },
                    href: u.i,
                    target: "_blank"
                  }, u.h));
                  i.render(t, e)
                },
                key: "PropertyPaneColorTipsField",
                onDispose: function(e) {
                  i.unmountComponentAtNode(e)
                }
              })), {
                pages: [{
                  groups: [{
                    groupFields: t
                  }]
                }]
              };
              var e, t
            }, t.prototype.onPropertyPaneFieldChanged = function(t, n, o) {
              "linkUrl" === t && (this.properties.linkUrl = _.UrlUtility.ensureSchema(this.properties.linkUrl || "", d), n ? this.properties.linkUrl || _.ScreenReaderAlert.read(m.c, _.ReadingMode.ReadImmediately) : this.properties.linkUrl && _.ScreenReaderAlert.read(m.b, _.ReadingMode.ReadImmediately)), e.prototype.onPropertyPaneFieldChanged.call(this, t, n, o)
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  label: {
                    isSearchablePlainText: !0
                  },
                  linkUrl: {
                    isLink: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._getSectionBackgroundTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(l.ThemeProvider.serviceKey);
                e._variantTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, e._handleThemeChangedEvent)
              })
            }, t
          }(c.BaseClientSideWebPart);
        t.default = g
      },
      "17wl": function(t, n) {
        t.exports = e
      },
      "7Awa": function(e, n) {
        e.exports = t
      },
      "98M1": function(e) {
        e.exports = JSON.parse('{"a":"Button","b":"Button will be clickable when page is in view mode.","c":"Button will not be clickable in view mode until a link is entered."}')
      },
      B5ub: function(e) {
        e.exports = JSON.parse('{"e":"Label","f":"Type label here","g":"Link","j":"Add http://, https://, or mailto: to the beginning of the link and try again.","d":"Button alignment","b":"Left","a":"Center","c":"Right","h":"Learn more","i":"https://go.microsoft.com/fwlink/?linkid=2083772","k":"Button color is based on the site theme accent color."}')
      },
      KL1q: function(e, t) {
        e.exports = n
      },
      U4ag: function(e, t) {
        e.exports = o
      },
      UWqr: function(e, t) {
        e.exports = r
      },
      br4S: function(e, t) {
        e.exports = i
      },
      cDcd: function(e, t) {
        e.exports = a
      },
      faye: function(e, t) {
        e.exports = l
      },
      "hiL/": function(e, t) {
        e.exports = s
      }
    })
  });