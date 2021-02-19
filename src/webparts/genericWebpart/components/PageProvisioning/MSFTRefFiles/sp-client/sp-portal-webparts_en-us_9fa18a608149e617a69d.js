/**
 * This is the MSFT Countdown Timer:
 * https://spoprod-a.akamaihd.net/files/sp-client/TBD.js
 * 
 * Look in this folder in Sources under Page
 * >>  modern.akamai.odsp.cdn.office.net    >> files    >> sp-client    >> TBD.js
 * 
 * this.properties:
 * 
    backgroundImage: this.properties.backgroundImage,

    backgroundOverlay: this.properties.backgroundOverlay,
    buttonText: this.properties.buttonText,
    buttonURL: this.properties.buttonURL,

    countDate: this.properties.countDate,
    countDirection: this.properties.countDirection,
    dateDisplay: this.properties.dateDisplay, //Valid options:   "DAY_ONLY" , "DAY_HOUR_MINUTE" , "DAY_HOUR_MINUTE_SECOND"

    description: this.properties.description,
    
    showCallToAction: this.properties.showButton,


    //These not likely

    title: this.properties.title,

    displayDays: t,
    displayHours: e,
    displayMinutes: n,
    displaySeconds: o,


 * 
 * 
 * 
 * 
 */


define("62cac389-787f-495d-beca-e11786162ef4_1.0.0", ["tslib", "@microsoft/sp-component-base", "@microsoft/sp-loader", "@microsoft/office-ui-fabric-react-bundle", "@microsoft/sp-lodash-subset", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-page-context", "@ms/i18n-utilities", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities", "@microsoft/load-themed-styles", "@ms/sp-deferred-component", "@ms/odsp-utilities-bundle"], function(e, t, n, o, i, r, a, s, c, l, u, d, _, p, h, m) {
    return function(e) {
      function t(t) {
        for (var n, i, r = t[0], a = t[1], s = 0, c = []; s < r.length; s++) i = r[s], Object.prototype.hasOwnProperty.call(o, i) && o[i] && c.push(o[i][0]), o[i] = 0;
        for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
        for (l && l(t); c.length;) c.shift()()
      }
      var n = {},
        o = {
          1: 0
        };
  
      function i(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
          i: t,
          l: !1,
          exports: {}
        };
        return e[t].call(o.exports, o, o.exports, i), o.l = !0, o.exports
      }
      i.e = function(t) {
        for (var n = [], a = function(e) {
            return {
              2: [{
                i: "17ce0976-e69a-4355-be84-89b69a74717d",
                v: "0.1.0",
                m: "fglE"
              }],
              0: [{
                i: "f9e737b7-f0df-4597-ba8c-3060f82380db",
                v: "1.12.0",
                m: "26ea"
              }, {
                i: "c79b9f88-6338-40fb-b463-3aad22a88b15",
                v: "0.1.0",
                m: "9poL"
              }]
            } [e] || []
          }(t), s = 0; s < a.length; s++) e[a[s].m] || function(t) {
          n.push(r.SPComponentLoader.loadComponentById(t.i, t.v).then(function(n) {
            e[t.m] = function(e) {
              e.exports = n
            }
          }))
        }(a[s]);
        var c = o[t];
        if (0 !== c)
          if (c) n.push(c[2]);
          else {
            var l = new Promise(function(e, n) {
              c = o[t] = [e, n]
            });
            n.push(c[2] = l);
            var u, d = document.createElement("script");
            d.charset = "utf-8", d.timeout = 120, i.nc && d.setAttribute("nonce", i.nc), d.src = function(e) {
              return i.p + "chunk." + ({
                0: "countdown-property-pane-templates",
                2: "vendors~countdown-property-pane-templates"
              } [e] || e) + "_" + "none" + "_" + {
                0: "494da72941940b703066",
                2: "87272bbef046f20e1825"
              } [e] + ".js"
            }(t);
            var _ = new Error;
            u = function(e) {
              d.onerror = d.onload = null, clearTimeout(p);
              var n = o[t];
              if (0 !== n) {
                if (n) {
                  var i = e && ("load" === e.type ? "missing" : e.type),
                    r = e && e.target && e.target.src;
                  _.message = "Loading chunk " + t + " failed.\n(" + i + ": " + r + ")", _.name = "ChunkLoadError", _.type = i, _.request = r, n[1](_)
                }
                o[t] = void 0
              }
            };
            var p = setTimeout(function() {
              u({
                type: "timeout",
                target: d
              })
            }, 12e4);
            d.onerror = d.onload = u, document.head.appendChild(d)
          } return Promise.all(n)
      }, i.m = e, i.c = n, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: n
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
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var o in e) i.d(n, o, function(t) {
            return e[t]
          }.bind(null, o));
        return n
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
      var a = window.webpackJsonp_62cac389_787f_495d_beca_e11786162ef4_1_0_0 = window.webpackJsonp_62cac389_787f_495d_beca_e11786162ef4_1_0_0 || [],
        s = a.push.bind(a);
      a.push = t, a = a.slice();
      for (var c = 0; c < a.length; c++) t(a[c]);
      var l = s;
      return function() {
        var e, t = document.getElementsByTagName("script"),
          n = "undefined" != typeof spScriptNamePattern ? spScriptNamePattern : /sp-portal-webparts_en-us_9fa18a608149e617a69d\.js/i;
        if (t && t.length)
          for (var o = 0; o < t.length; o++)
            if (t[o]) {
              var r = t[o].getAttribute("src");
              if (r && r.match(n)) {
                e = r.substring(0, r.lastIndexOf("/") + 1);
                break
              }
            } if (!e)
          for (var a in window.__setWebpackPublicPathLoaderSrcRegistry__)
            if (a && a.match(n)) {
              e = a.substring(0, a.lastIndexOf("/") + 1);
              break
            } i.p = e
      }(), i(i.s = "/AbI")
    }({
      "/AbI": function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n("17wl"),
          i = n("cDcd"),
          r = n("faye"),
          a = n("UWqr"),
          s = n("Pk8u"),
          c = n("br4S"),
          l = n("7Awa"),
          u = n("KL1q"),
          d = n("U4ag"),
          _ = Object(u.classNamesFunction)(),
          p = function(e) {
            var t, n = e.overlayType,
              o = e.variantTheme,
              i = e.width,
              r = Object(u.getTheme)(),
              a = r.semanticColors.bodyText;
            switch ("LIGHT_OVERLAY" === n ? a = "#333333" : "DARK_OVERLAY" === n && (a = "#ffffff"), i) {
              case "LARGE":
                t = "56px 40px";
                break;
              case "MEDIUM":
                t = "35px";
                break;
              default:
                t = "40px 24px"
            }
            return {
              container: {
                backgroundColor: r.palette.white,
                borderColor: o ? o.semanticColors.variantBorder : r.semanticColors.variantBorder,
                borderStyle: "solid",
                borderWidth: "NO_OVERLAY" === n ? 1 : 0,
                color: a,
                overflow: "hidden",
                position: "relative",
                textAlign: "center"
              },
              content: {
                padding: t
              }
            }
          },
          h = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return p(e)
            }, t
          }(d.BaseEmphasisComponentStyles),
          m = n("2Mdr");
  
        function f(e, t) {
          var n = t.valueOf() - e.valueOf();
          if (n <= 0) return {
            daysRemaining: 0,
            hoursRemaining: 0,
            minutesRemaining: 0,
            secondsRemaining: 0
          };
          var o = Math.floor(n / 864e5),
            i = Math.floor(n % 864e5 / 36e5),
            r = Math.floor(n % 36e5 / 6e4),
            a = Math.round(n % 6e4 / 1e3);
          return 60 === (a = Math.floor(a)) && (a = 0, r++), 60 === r && (r = 0, i++), 24 === i && (i = 0, o++), {
            daysRemaining: o,
            hoursRemaining: i,
            minutesRemaining: r,
            secondsRemaining: a
          }
        }
  
        function g() {
          return a._SPFlight.isEnabled(276)
        }
        var b = n("y88i"),
          y = n("hiL/"),
          v = n("ngYW"),
          C = Object(u.classNamesFunction)(),
          I = function(e) {
            var t = e.containerHeight,
              n = e.containerWidth,
              o = e.backgroundImageUrl,
              i = e.imageWidthFactor,
              r = e.isSettingFocalPoint,
              a = e.overlay,
              s = e.focalPoint,
              c = e.imageScale,
              l = {
                background: "transparent"
              },
              u = {
                background: "transparent"
              };
            if (o) {
              s || (s = {
                x: 50,
                y: 50
              }), c || (c = 1);
              var d = 100 * c + "%";
              t && n && i && i > n / t && (d = "auto " + d), l = {
                backgroundImage: "url(" + o + ")",
                backgroundPosition: s.x + "% " + s.y + "%",
                backgroundRepeat: "no-repeat",
                backgroundSize: d,
                transition: "background-image 500ms ease-in-out, background-size 200ms linear",
                selectors: {
                  "div[class^='focalFrame']": {
                    position: "absolute"
                  }
                }
              }
            }
            if (a) {
              var _ = a.color,
                p = parseInt(_.substr(1, 2), 16),
                h = parseInt(_.substr(3, 2), 16);
              u = {
                backgroundColor: "rgba(" + p + ", " + parseInt(_.substr(5, 2), 16) + ", " + h + ", " + a.opacity / 100 + ")",
                opacity: r ? 0 : 1,
                transition: "background-color 250ms ease-in-out"
              }
            }
            return {
              imageContainer: l,
              overlayLayer: u
            }
          },
          w = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return I(e)
            }, t
          }(d.BaseEmphasisComponentStyles);
  
        function S(e) {
          return new Promise(function(t, n) {
            if (e) {
              var o = new Image;
              o.onload = function() {
                return t()
              }, o.onerror = function() {
                return n()
              }, o.src = e
            } else n()
          })
        }
        var T = {
            x: 50,
            y: 50
          },
          A = function(e) {
            function t(t) {
              var n = e.call(this, t) || this;
              n._backgroundContainerStyles = new w, n._handleSetFocalPoint = function() {
                n.setState({
                  isSettingFocalPoint: !0
                })
              }, n._handleFocalPointMove = function(e) {
                n.setState({
                  focalPosition: e
                })
              }, n._handleFocalPointEnd = function() {
                n.setState({
                  isSettingFocalPoint: !1
                }), n.props.onFocalPointChanged(n.state.focalPosition)
              }, n._handleImageChanged = function(e) {
                n.props.onImageChanged(e)
              }, n._hideActionBar = function() {
                n.setState({
                  showActionBar: !1
                })
              }, n._showActionBar = function() {
                n.setState({
                  showActionBar: !0
                })
              }, n._getPreviewUrl = function(e) {
                if (y.ThumbnailUrlGenerator.isVROOMThumbnailEnabled() && e.id && e.siteId && e.webId) {
                  var t = new b.Uri(n.props.absoluteUrl),
                    o = y.PreviewUtility.getVROOMItemUrl(e.siteId, e.webId, e.listId, e.id, t.getLeftPart(1), t.getAuthority());
                  if (!o) return;
                  return y.PreviewUtility.getVROOMThumbnailUrl(o, window.innerWidth)
                }
                var i = y.ExtensionHelper.getExtension(e.url) || "";
                return y.PreviewHelper.getPreviewImageUrl(i, void 0, n.props.absoluteUrl, e.url, e.siteId, e.webId, e.id, window.innerWidth, !1, "countdownBackgroundContainer")
              };
              var o = !!t.image && !!t.image.focalPosition;
              return n.state = {
                backgroundImageUrl: n.props.image ? n.props.image.url : void 0,
                focalPosition: o ? t.image.focalPosition : T,
                isSettingFocalPoint: !1,
                showActionBar: !1
              }, n
            }
            return Object(o.__extends)(t, e), t.prototype.componentDidMount = function() {
              var e = this.props.image;
              e && this._updateBackgroundImageUrl(e)
            }, t.prototype.shouldComponentUpdate = function(e) {
              var t = !this.props.image && !!e.image,
                n = !!this.props.image && !!e.image && this.props.image.url !== e.image.url,
                o = !!this.props.image && !e.image;
              return (t || n) && this.setState({
                focalPosition: T
              }), (n || t || o) && this._updateBackgroundImageUrl(e.image), !0
            }, t.prototype.componentDidUpdate = function(e, t) {
              var n = this;
              this.state.isSettingFocalPoint && t.isSettingFocalPoint && v.c.loadModule().then(function(e) {
                return e.FocalPoint.focus(n._containerComponent)
              })
            }, t.prototype.render = function() {
              var e = this.props,
                t = e.image,
                n = e.hasActionBar,
                o = e.isEditing,
                r = e.onEditButtonClicked,
                a = this.state,
                s = a.isSettingFocalPoint,
                c = a.showActionBar,
                l = this._classNames;
              return i.createElement("div", {
                className: l.imageContainer,
                onBlur: this._hideActionBar,
                onFocus: this._showActionBar,
                onMouseEnter: this._showActionBar,
                onMouseLeave: this._hideActionBar,
                ref: this._resolveRef("_containerComponent")
              }, s && i.createElement(v.b, {
                deferredProps: {
                  position: this.state.focalPosition,
                  onFocalPointEnd: this._handleFocalPointEnd,
                  onFocalPointMove: this._handleFocalPointMove
                }
              }), i.createElement("div", {
                className: l.overlayLayer
              }, this.props.children), n && o && t && i.createElement(v.a, {
                deferredProps: {
                  itemId: t.id,
                  imageItem: t,
                  hasMoveButton: !1,
                  hidden: s || !c,
                  isSettingFocalPoint: !1,
                  reverseRow: !1,
                  onDelete: function() {},
                  onEdit: r,
                  onSetZoomFactor: this._handleImageChanged,
                  onSetFocalPoint: this._handleSetFocalPoint
                }
              }))
            }, Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                var e = this.props,
                  t = e.image,
                  n = e.overlay,
                  o = {
                    backgroundImageUrl: this.state.backgroundImageUrl,
                    containerHeight: this._containerComponent ? this._containerComponent.clientHeight : void 0,
                    containerWidth: this._containerComponent ? this._containerComponent.clientWidth : void 0,
                    imageScale: t && t.zoomRatio,
                    imageWidthFactor: t && t.widthFactor,
                    isSettingFocalPoint: this.state.isSettingFocalPoint,
                    focalPoint: this.state.focalPosition,
                    overlay: n
                  };
                return g() ? C(I, o) : this._backgroundContainerStyles.getClassNames(o)
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._updateBackgroundImageUrl = function(e) {
              var t = this;
              if (e) {
                e.webId && 0 !== e.webId.length || (e.webId = this.props.webId);
                var n = function() {
                    S(e.url).then(function() {
                      return t.setState({
                        backgroundImageUrl: e.url
                      })
                    }).catch(function() {
                      return console.error("Error loading image", e.url)
                    })
                  },
                  o = this._getThumbnailUrl(e);
                S(o).then(function() {
                  return t.setState({
                    backgroundImageUrl: o
                  })
                }).catch(function() {
                  var o = t._getPreviewUrl(e);
                  S(o).then(function() {
                    return t.setState({
                      backgroundImageUrl: o
                    })
                  }).catch(n)
                })
              } else this.setState({
                backgroundImageUrl: void 0
              })
            }, t.prototype._getThumbnailUrl = function(e) {
              var t = y.ExtensionHelper.getExtension(e.url) || "";
              return y.ThumbnailUrlGenerator.getThumbnailUrl({
                absoluteUrl: this.props.absoluteUrl,
                spResource: decodeURI(e.url),
                siteId: e.siteId,
                webId: e.webId,
                listId: e.listId,
                uniqueId: e.id,
                fileType: t,
                width: window.innerWidth,
                callerId: "countdownBackgroundContainer"
              })
            }, t
          }(u.BaseComponent),
          j = n("3D6g"),
          O = Object(u.classNamesFunction)(),
          L = function(e) {
            var t = e.isPlaceholder,
              n = Object(u.getTheme)();
            return {
              callToActionButton: {
                backgroundColor: n.semanticColors.primaryButtonBackground,
                color: n.semanticColors.primaryButtonText,
                display: "inline-block",
                opacity: t ? .75 : 1,
                selectors: t ? {} : {
                  ":hover": {
                    backgroundColor: n.semanticColors.primaryButtonBackgroundHovered,
                    color: n.semanticColors.primaryButtonText
                  },
                  ":active": {
                    backgroundColor: n.semanticColors.primaryButtonBackgroundPressed,
                    color: n.semanticColors.primaryButtonText
                  },
                  ":focus": {
                    color: n.semanticColors.primaryButtonText,
                    outline: "1px solid",
                    outlineColor: n.palette.neutralSecondary
                  }
                }
              }
            }
          },
          E = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return L(e)
            }, t
          }(d.BaseEmphasisComponentStyles),
          x = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._callToActionStyles = new E, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this.props,
                t = e.isEditing,
                n = e.showButton,
                o = e.text,
                r = e.url,
                a = n && "" !== r && "" !== o || this._isPlaceholder,
                s = this._classNames;
              return a && i.createElement(u.PrimaryButton, {
                className: s.callToActionButton,
                disabled: t,
                href: r,
                target: Object(d.getUrlTarget)(r)
              }, "" === o ? j.j : o)
            }, Object.defineProperty(t.prototype, "_isPlaceholder", {
              get: function() {
                var e = this.props,
                  t = e.isEditing,
                  n = e.showButton,
                  o = e.text,
                  i = e.url;
                return t && n && ("" === i || "" === o)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                var e = {
                  variantTheme: this.props.emphasisTheme,
                  isPlaceholder: this._isPlaceholder
                };
                return g() ? O(L, e) : this._callToActionStyles.getClassNames(e)
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(i.PureComponent),
          R = Object(u.classNamesFunction)(),
          P = function(e) {
            return {
              timeContainer: {
                display: "flex",
                justifyContent: "center",
                marginTop: 0,
                marginLeft: -40,
                marginRight: -40,
                marginBottom: "LARGE" === e.width ? 40 : 32
              }
            }
          },
          D = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return P(e)
            }, t
          }(d.BaseEmphasisComponentStyles),
          N = Object(u.classNamesFunction)(),
          k = function(e) {
            var t, n, o, i, r = e.overlayType,
              a = e.width,
              s = Object(u.getTheme)(),
              c = s.semanticColors.bodyText,
              l = s.semanticColors.bodySubtext;
            switch (a) {
              case "LARGE":
                t = 80, n = u.FontSizes.mediumPlus, i = "0 20px", o = 90;
                break;
              case "MEDIUM":
                t = 48, n = u.FontSizes.medium, i = "0 12px", o = 56;
                break;
              default:
                t = 32, n = u.FontSizes.small, i = "0 12px", o = 40
            }
            return "LIGHT_OVERLAY" === r ? c = l = "#333333" : "DARK_OVERLAY" === r && (c = l = "#ffffff"), {
              digit: {
                color: c,
                fontSize: t,
                fontWeight: u.FontWeights.regular
              },
              label: {
                color: l,
                display: "block",
                fontSize: n,
                padding: 0,
                textAlign: "center"
              },
              timePart: {
                margin: i,
                minWidth: o
              }
            }
          },
          q = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return k(e)
            }, t
          }(d.BaseEmphasisComponentStyles),
          B = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._digitStyles = new q, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this.props,
                t = e.digitValue,
                n = e.guid,
                o = e.label,
                r = e.labelAbbreviation,
                a = e.useAbbreviations,
                s = o + "-label-" + n,
                c = this._classNames;
              return i.createElement("div", {
                className: c.timePart
              }, i.createElement("span", {
                "aria-labelledby": s,
                className: c.digit
              }, t), i.createElement("span", {
                "aria-hidden": !0,
                className: c.label,
                id: s
              }, a ? r : o))
            }, Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                var e = {
                  overlayType: this.props.overlayType,
                  width: this.props.width,
                  variantTheme: this.props.emphasisTheme
                };
                return g() ? N(k, e) : this._digitStyles.getClassNames(e)
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(i.PureComponent),
          z = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._countdownClockStyles = new D, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this.props,
                t = e.displayHours,
                n = e.displayMinutes,
                r = e.displaySeconds,
                a = e.daysRemaining,
                s = e.emphasisTheme,
                c = e.guid,
                l = e.hoursRemaining,
                u = e.minutesRemaining,
                d = e.overlayType,
                _ = e.secondsRemaining,
                p = {
                  emphasisTheme: s,
                  guid: c,
                  overlayType: d,
                  useAbbreviations: e.useAbbreviations,
                  width: e.width
                },
                h = this._classNames;
              return i.createElement("div", {
                className: h.timeContainer
              }, i.createElement(B, Object(o.__assign)({}, p, {
                digitValue: a,
                label: j.w,
                labelAbbreviation: j.x
              })), t && i.createElement(B, Object(o.__assign)({}, p, {
                digitValue: l,
                label: j.A,
                labelAbbreviation: j.B
              })), n && i.createElement(B, Object(o.__assign)({}, p, {
                digitValue: u,
                label: j.C,
                labelAbbreviation: j.D
              })), r && i.createElement(B, Object(o.__assign)({}, p, {
                digitValue: _,
                label: j.J,
                labelAbbreviation: j.K
              })))
            }, Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                var e = {
                  variantTheme: this.props.emphasisTheme,
                  width: this.props.width
                };
                return g() ? R(P, e) : this._countdownClockStyles.getClassNames(e)
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(i.PureComponent),
          U = Object(u.classNamesFunction)(),
          F = function(e) {
            var t, n, o = e.overlayType,
              i = e.width,
              r = Object(u.getTheme)(),
              a = Object(d.isFluentEnabledFor)("CountdownWebPart") ? u.FontWeights.regular : u.FontWeights.light,
              s = r.semanticColors.bodyText,
              c = r.palette.neutralSecondary,
              l = r.palette.neutralSecondary,
              _ = r.palette.neutralDark;
            switch (i) {
              case "LARGE":
                t = r.fonts.large.fontSize, n = 40;
                break;
              case "MEDIUM":
                t = r.fonts.mediumPlus.fontSize, n = 32;
                break;
              default:
                t = r.fonts.medium.fontSize, n = 32
            }
            return "LIGHT_OVERLAY" === o ? (c = "#666666", s = "#333333", _ = "#212121", l = "#666666") : "DARK_OVERLAY" === o && (c = "#eaeaea", s = "#ffffff", _ = "#f8f8f8", l = "#d0d0d0"), {
              description: {
                color: s,
                display: "block",
                fontWeight: a,
                minHeight: "1.5em",
                maxWidth: 1204,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                whiteSpace: "pre-wrap",
                selectors: {
                  '[class*="fieldGroup"]': {
                    background: "transparent",
                    minHeight: "auto"
                  }
                },
                fontSize: t,
                marginBottom: n
              },
              descriptionInput: {
                color: s,
                fontWeight: a,
                height: "1.5em",
                lineHeight: "1.5em",
                resize: "none",
                textAlign: "center !important",
                whiteSpace: "pre-wrap",
                selectors: {
                  "::placeholder, ::-webkit-input-placeholder, ::-ms-input-placeholder": {
                    color: l,
                    fontWeight: a,
                    fontSize: t
                  },
                  ":hover": {
                    borderBottomColor: c,
                    borderBottomStyle: "solid",
                    borderBottomWidth: 1
                  },
                  ":active, :focus": {
                    borderBottomColor: r.palette.themePrimary,
                    borderBottomStyle: "solid",
                    borderBottomWidth: 1
                  },
                  ":active, :focus, :hover": {
                    selectors: {
                      "::placeholder": {
                        color: _
                      }
                    }
                  }
                },
                fontSize: t
              }
            }
          },
          G = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return F(e)
            }, t
          }(d.BaseEmphasisComponentStyles),
          M = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._descriptionStyles = new G, t._onTextFieldChange = function(e, n) {
                t.props.onChanged(n || "")
              }, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this.props,
                t = e.isEditing,
                n = e.text,
                o = this._classNames;
              return t ? i.createElement(u.TextField, {
                ariaLabel: j.y,
                autoAdjustHeight: !0,
                borderless: !0,
                className: o.description,
                inputClassName: o.descriptionInput,
                multiline: !0,
                placeholder: j.z,
                value: n,
                onChange: this._onTextFieldChange
              }) : i.createElement("span", {
                className: o.description
              }, n)
            }, Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                var e = {
                  overlayType: this.props.overlayType,
                  variantTheme: this.props.emphasisTheme,
                  width: this.props.width
                };
                return g() ? U(F, e) : this._descriptionStyles.getClassNames(e)
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(i.PureComponent),
          Z = Object(u.classNamesFunction)(),
          W = function(e) {
            var t, n, o = e.overlayType,
              i = e.width,
              r = Object(u.getTheme)(),
              a = r.semanticColors.bodyText,
              s = r.palette.neutralSecondary,
              c = r.palette.neutralSecondary,
              l = r.palette.neutralDark;
            switch (i) {
              case "LARGE":
                t = r.fonts.xxLarge.fontSize, n = 32;
                break;
              case "MEDIUM":
                t = 24, n = 16;
                break;
              default:
                t = r.fonts.xLarge.fontSize, n = 16
            }
            return "LIGHT_OVERLAY" === o ? (s = "#666666", a = "#333333", l = "#212121", c = "#666666") : "DARK_OVERLAY" === o && (s = "#eaeaea", a = "#ffffff", l = "#f8f8f8", c = "#d0d0d0"), {
              title: {
                alignItems: "center",
                color: a,
                display: "flex",
                fontWeight: u.FontWeights.semibold,
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 1204,
                textAlign: "center",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                fontSize: t,
                marginBottom: n
              },
              titleField: {
                marginBottom: "0.6em",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 1204,
                minHeight: "1.5em",
                padding: 0,
                fontSize: t,
                selectors: {
                  '[class*="fieldGroup"]': {
                    background: "transparent",
                    minHeight: "auto"
                  }
                }
              },
              titleInputField: {
                color: a,
                fontWeight: u.FontWeights.semibold,
                height: "1.5em",
                lineHeight: "1.5em",
                resize: "none",
                textAlign: "center",
                selectors: {
                  "::placeholder, ::-webkit-input-placeholder, ::-ms-input-placeholder": {
                    color: c,
                    fontWeight: u.FontWeights.semibold,
                    fontSize: t
                  },
                  ":hover": {
                    borderBottomColor: s,
                    borderBottomStyle: "solid",
                    borderBottomWidth: 1
                  },
                  ":active, :focus": {
                    borderBottomColor: r.palette.themePrimary,
                    borderBottomStyle: "solid",
                    borderBottomWidth: 1
                  },
                  ":active, :focus, :hover": {
                    selectors: {
                      "::placeholder": {
                        color: l
                      }
                    }
                  }
                },
                fontSize: t,
                marginBottom: n
              }
            }
          },
          H = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return W(e)
            }, t
          }(d.BaseEmphasisComponentStyles),
          Y = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._titleStyles = new H, t._onTextFieldChange = function(e, n) {
                t.props.onChanged(n || "")
              }, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this.props,
                t = e.isEditing,
                n = e.text,
                o = this._classNames;
              return t ? i.createElement(u.TextField, {
                ariaLabel: j.R,
                autoAdjustHeight: !0,
                borderless: !0,
                className: o.titleField,
                inputClassName: o.titleInputField,
                maxLength: 110,
                multiline: !0,
                placeholder: j.S,
                value: n,
                onChange: this._onTextFieldChange
              }) : i.createElement("h2", {
                className: o.title
              }, n)
            }, Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                var e = {
                  overlayType: this.props.overlayType,
                  variantTheme: this.props.emphasisTheme,
                  width: this.props.width
                };
                return g() ? Z(W, e) : this._titleStyles.getClassNames(e)
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(i.PureComponent),
          V = function(e) {
            return e ? e.useLightText ? "DARK_OVERLAY" : "LIGHT_OVERLAY" : "NO_OVERLAY"
          },
          K = 1e3,
          J = function(e) {
            function t(t) {
              var n = e.call(this, t) || this;
              return n._CountdownStyles = new h, n._updateWidth = function() {
                n.setState({
                  useAbbreviations: "LARGE" !== n.props.width
                })
              }, n._tickSecond = function() {
                var e, t = new Date(n.props.countDate);
                e = "COUNT_DOWN" === n.props.countDirection ? f(new Date(Date.now()), t) : f(t, new Date(Date.now()));
                var i = Object(o.__assign)(Object(o.__assign)({}, n.state), {
                  daysRemaining: Object(m.a)(e.daysRemaining),
                  hoursRemaining: Object(m.a)(e.hoursRemaining),
                  minutesRemaining: Object(m.a)(e.minutesRemaining),
                  secondsRemaining: Object(m.a)(e.secondsRemaining)
                });
                n.setState(i), 0 === e.daysRemaining && 0 === e.hoursRemaining && 0 === e.minutesRemaining && 0 === e.secondsRemaining && void 0 !== n._tickInterval && (clearInterval(n._tickInterval), n._tickInterval = void 0)
              }, n._startTimer = function() {
                if (void 0 === n._tickInterval) {
                  var e = K - (new Date).getMilliseconds();
                  setTimeout(function() {
                    n._tickInterval = window.setInterval(n._tickSecond, K)
                  }, e)
                }
              }, n._handleFocalPointEnd = function(e) {
                var t = n.props.backgroundImage;
                t.focalPosition = e, n.props.onBackgroundImageChanged(t)
              }, n.state = {
                daysRemaining: "00",
                hoursRemaining: "00",
                position: t.backgroundImage ? t.backgroundImage.focalPosition : void 0,
                minutesRemaining: "00",
                secondsRemaining: "00",
                useAbbreviations: !1
              }, n
            }
            return Object(o.__extends)(t, e), t.prototype.componentDidUpdate = function(e) {
              e.countDate === this.props.countDate && e.countDirection === this.props.countDirection || (this._tickSecond(), this._startTimer()), e.width !== this.props.width && this._updateWidth()
            }, t.prototype.componentDidMount = function() {
              this._tickSecond(), this._startTimer(), this._updateWidth()
            }, t.prototype.componentWillUnmount = function() {
              this._tickInterval && clearInterval(this._tickInterval)
            }, t.prototype.render = function() {
              var e = this.state,
                t = e.daysRemaining,
                n = e.hoursRemaining,
                o = e.minutesRemaining,
                r = e.secondsRemaining,
                a = e.useAbbreviations,
                s = this.props,
                c = s.backgroundImage,
                l = s.backgroundOverlay,
                u = s.buttonText,
                d = s.buttonURL,
                _ = s.displayHours,
                p = s.displayMinutes,
                h = s.displaySeconds,
                m = s.description,
                f = s.guid,
                g = s.emphasisTheme,
                b = s.isEditing,
                y = s.showCallToAction,
                v = s.title,
                C = s.webId,
                I = s.width,
                w = s.onBackgroundImageChanged,
                S = s.onDescriptionChanged,
                T = s.onEditBackgroundImage,
                j = s.onTitleChanged,
                O = this._getClassNames(this.props, this._CountdownStyles),
                L = V(l);
              return i.createElement("div", {
                className: O.container
              }, i.createElement(A, {
                absoluteUrl: this.props.absoluteUrl,
                image: c,
                hasActionBar: !0,
                isEditing: b,
                overlay: l,
                webId: C,
                onEditButtonClicked: T,
                onFocalPointChanged: this._handleFocalPointEnd,
                onImageChanged: w
              }, i.createElement("div", {
                className: O.content
              }, i.createElement(Y, {
                emphasisTheme: g,
                overlayType: L,
                isEditing: b,
                text: v,
                width: I,
                onChanged: j
              }), i.createElement(z, {
                daysRemaining: t,
                displayHours: _,
                displayMinutes: p,
                displaySeconds: h,
                emphasisTheme: g,
                guid: f,
                hoursRemaining: n,
                minutesRemaining: o,
                overlayType: L,
                secondsRemaining: r,
                useAbbreviations: a,
                width: I
              }), i.createElement(M, {
                emphasisTheme: g,
                overlayType: L,
                isEditing: b,
                text: m,
                width: I,
                onChanged: S
              }), i.createElement(x, {
                emphasisTheme: g,
                isEditing: b,
                showButton: y,
                text: u,
                url: d
              }))))
            }, t.prototype._getClassNames = function(e, t) {
              var n = {
                overlayType: V(e.backgroundOverlay),
                width: e.width,
                variantTheme: e.emphasisTheme
              };
              return g() ? _(p, n) : t.getClassNames(n)
            }, Object(o.__decorate)([u.memoize], t.prototype, "_getClassNames", null), t
          }(i.Component),
          X = n("TubH"),
          Q = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._onBackgroundEdit = function() {
                t.context.propertyPane.open(), t.render()
              }, t._onTitleChanged = function(e) {
                t._onCustomPropertyFieldChanged("title", e)
              }, t._onDescriptionChanged = function(e) {
                t._onCustomPropertyFieldChanged("description", e)
              }, t._onBackgroundImageChanged = function(e) {
                t._onCustomPropertyFieldChanged("backgroundImage", e)
              }, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = !1,
                t = !1,
                n = !1,
                o = !1;
              switch (this.properties.dateDisplay) {
                case "DAY_ONLY":
                  t = !0;
                  break;
                case "DAY_HOUR_MINUTE":
                  t = !0, e = !0, n = !0;
                  break;
                case "DAY_HOUR_MINUTE_SECOND":
                default:
                  t = !0, e = !0, n = !0, o = !0
              }
              var s = i.createElement(J, {
                absoluteUrl: this.context.pageContext.site.absoluteUrl,
                backgroundImage: this.properties.backgroundImage,
                backgroundOverlay: this.properties.backgroundOverlay,
                buttonText: this.properties.buttonText,
                buttonURL: this.properties.buttonURL,
                countDate: this.properties.countDate,
                countDirection: this.properties.countDirection,
                dateDisplay: this.properties.dateDisplay,
                description: this.properties.description,
                displayDays: t,
                displayHours: e,
                displayMinutes: n,
                displaySeconds: o,
                emphasisTheme: this._emphasisTheme,
                guid: this._guid,
                isEditing: this.displayMode === a.DisplayMode.Edit,
                showCallToAction: this.properties.showButton,
                title: this.properties.title,
                webId: this.context.pageContext.web.id.toString(),
                width: this._webPartWidth,
                onBackgroundImageChanged: this._onBackgroundImageChanged,
                onDescriptionChanged: this._onDescriptionChanged,
                onEditBackgroundImage: this._onBackgroundEdit,
                onTitleChanged: this._onTitleChanged
              });
              r.render(s, this.domElement)
            }, Object.defineProperty(t.prototype, "dataVersion", {
              get: function() {
                return a.Version.parse("2.1")
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.loadPropertyPaneResources = function() {
              var e = this;
              return Promise.all([n.e(2), n.e(0)]).then(n.bind(null, "ig0L")).then(function(t) {
                var n = t.buildPropertyPaneConfiguration;
                e.getPropertyPaneConfiguration = function() {
                  return n(e.properties, e.context.pageContext.cultureInfo.currentCultureName, e._serviceScope, e.context.pageContext.site.id.toString(), e.context.pageContext.web.id.toString(), e._timeZone, e._shouldUse24HourTime, e._onCustomPropertyFieldChanged.bind(e))
                }
              })
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  title: {
                    isSearchablePlainText: !0
                  },
                  "backgroundImage.url": {
                    isImageSource: !0
                  },
                  buttonURL: {
                    isLink: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.onAfterDeserialize = function(e, t) {
              return t.lessThan(a.Version.parse("2.0")) && (e.showButton = !1), e
            }, t.prototype.onAfterResize = function(e) {
              var t = this._getWidthSize(e);
              this._webPartWidth !== t && (this._webPartWidth = t, this.render())
            }, t.prototype.onInit = function() {
              return this._serviceScope = this.context.serviceScope, this._guid = a.Guid.newGuid().toString(), this._webPartWidth = this._getWidthSize(this.width), this._setDefaultProperties(), this._getEmphasisTheme(), e.prototype.onInit.call(this)
            }, t.prototype.onDispose = function() {
              r.unmountComponentAtNode(this.domElement)
            }, Object.defineProperty(t.prototype, "_shouldUse24HourTime", {
              get: function() {
                return this.context.pageContext.user.preferUserTimeZone ? this.context.pageContext.legacyPageContext.userTime24 : this.context.pageContext.legacyPageContext.webTime24
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_timeZone", {
              get: function() {
                return void 0 === this.context.pageContext.web.timeZoneInfo && void 0 === this.context.pageContext.user.timeZoneInfo ? Object(X.c)((new Date).getTimezoneOffset()) : void 0 !== this.context.pageContext.user.timeZoneInfo && this.context.pageContext.user.preferUserTimeZone ? this.context.pageContext.user.timeZoneInfo : this.context.pageContext.web.timeZoneInfo
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._getWidthSize = function(e) {
              return e < 400 ? "SMALL" : e < 800 ? "MEDIUM" : "LARGE"
            }, t.prototype._onCustomPropertyFieldChanged = function(e, t) {
              Object(s.update)(this.properties, e, function() {
                return t
              }), this.render()
            }, t.prototype._setDefaultProperties = function() {
              if (!this.properties.countDate) {
                var e = new Date(Date.now() + 864e5);
                e.setMinutes(0), e.setSeconds(0), this.properties.countDate = e.toString()
              }
              this.properties.title = this.properties.title || "", this.properties.description = this.properties.description || "", this.properties.countDirection = this.properties.countDirection || "COUNT_DOWN", this.properties.dateDisplay = this.properties.dateDisplay || "DAY_HOUR_MINUTE_SECOND", this.properties.buttonText = this.properties.buttonText || "", this.properties.buttonURL = this.properties.buttonURL || "", void 0 === this.properties.showButton && (this.properties.showButton = !1)
            }, t.prototype._getEmphasisTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(l.ThemeProvider.serviceKey);
                e._emphasisTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, function(t) {
                  e._emphasisTheme = t.theme, e.render()
                })
              })
            }, t
          }(c.BaseClientSideWebPart);
        t.default = Q
      },
      "17wl": function(t, n) {
        t.exports = e
      },
      "2Mdr": function(e, t, n) {
        "use strict";
  
        function o(e, t, n) {
          void 0 === t && (t = "0"), void 0 === n && (n = 2);
          var o = e.toString(),
            i = n - o.length;
          if (i <= 0) return o;
          for (var r = o, a = 0; a < i; a++) r = t + r;
          return r
        }
        n.d(t, "a", function() {
          return o
        })
      },
      "3D6g": function(e) {
        e.exports = JSON.parse('{"v":"Date and time","O":"Time selection","w":"days","A":"hours","C":"minutes","J":"seconds","x":"days","B":"hrs","D":"min","K":"sec","a":"Call to action text","b":"Call to action link","r":"Display timer as","u":"Days","s":"Days, hours, minutes","t":"Days, hours, minutes, seconds","h":"Call to action text required.","i":"Call to action link required.","P":"Can\\u0027t find a SharePoint time zone, so using your computer time setting (for example, UTC{0}).","Q":"Learn how to change your personal language and region settings.","N":"Enter a time that looks like 7:45 PM (standard) or 19:45 (24-hour).","S":"Add a title","R":"Title field.","z":"Add a description","y":"Description field.","j":"Call to action","k":"Call to action","n":"On","l":"Off","o":"Call to action toggle is on.","m":"Call to action toggle is off.","e":"Background image","d":"Add","q":"Change","I":"Remove","c":"Add a background image.","p":"Change the background image.","H":"Remove the background image.","E":"Overlay color","F":"A semitransparent color overlay is added to help with text legibility.","G":"Overlay opacity","f":"Dark color overlay.","g":"Light color overlay.","M":"Uploading image...","L":"Adding overlay to help with legibility..."}')
      },
      "7Awa": function(e, n) {
        e.exports = t
      },
      I6O9: function(e, t) {
        e.exports = n
      },
      KL1q: function(e, t) {
        e.exports = o
      },
      Pk8u: function(e, t) {
        e.exports = i
      },
      TubH: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return c
        }), n.d(t, "b", function() {
          return l
        }), n.d(t, "c", function() {
          return u
        });
        var o = n("X+PM"),
          i = n("UWqr"),
          r = n("Ycni"),
          a = n("3D6g"),
          s = n("2Mdr");
  
        function c(e, t) {
          var n = e.convertToUTC(t);
          return Date.UTC(n.fullYear, n.month, n.date, n.hours, n.minutes, n.seconds, n.milliseconds)
        }
  
        function l(e, t) {
          return function(e) {
            var t = new Date(e);
            return new r.SPDate({
              fullYear: t.getUTCFullYear(),
              month: t.getUTCMonth(),
              date: t.getUTCDate(),
              hours: t.getUTCHours(),
              minutes: t.getUTCMinutes(),
              seconds: t.getUTCSeconds(),
              milliseconds: t.getUTCMilliseconds()
            })
          }(e).convertFromUTC(t)
        }
  
        function u(e) {
          var t = -1 * e / 60,
            n = -1 * e % 60,
            r = (t > 0 ? "+" : "") + t + ":" + Object(s.a)(n);
          return new o.SPTimeZone({
            daylightDate: {
              Year: 0,
              Month: 0,
              DayOfWeek: 0,
              Day: 0,
              Hour: 0,
              Minute: 0,
              Second: 0,
              Milliseconds: 0
            },
            daylightOffset: 0,
            description: i.Text.format(a.P, r),
            id: 0,
            offset: e,
            standardDate: {
              Year: 0,
              Month: 0,
              DayOfWeek: 0,
              Day: 0,
              Hour: 0,
              Minute: 0,
              Second: 0,
              Milliseconds: 0
            },
            standardOffset: 0
          })
        }
      },
      U4ag: function(e, t) {
        e.exports = r
      },
      UWqr: function(e, t) {
        e.exports = a
      },
      "X+PM": function(e, t) {
        e.exports = s
      },
      Ycni: function(e, t) {
        e.exports = c
      },
      br4S: function(e, t) {
        e.exports = l
      },
      cDcd: function(e, t) {
        e.exports = u
      },
      faye: function(e, t) {
        e.exports = d
      },
      "hiL/": function(e, t) {
        e.exports = _
      },
      jOlS: function(e, t) {
        e.exports = p
      },
      ngYW: function(e, t, n) {
        "use strict";
        n.d(t, "c", function() {
          return a
        }), n.d(t, "a", function() {
          return s
        }), n.d(t, "b", function() {
          return c
        });
        var o = n("17wl"),
          i = n("I6O9"),
          r = n("qjmy"),
          a = function() {
            function e() {}
            return e.loadModule = function() {
              return e._moduleLoadPromise || (e._moduleLoadPromise = i.SPComponentLoader.loadComponentById(e._imageToolsModuleGuid)), e._moduleLoadPromise
            }, e._imageToolsModuleGuid = "1e49a922-5650-4595-926f-4d19966e0e67", e
          }(),
          s = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype._internalLoad = function() {
              return a.loadModule().then(function(e) {
                return e.ActionBar
              })
            }, t
          }(r._DeferredComponent),
          c = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype._internalLoad = function() {
              return a.loadModule().then(function(e) {
                return e.FocalPoint
              })
            }, t
          }(r._DeferredComponent)
      },
      qjmy: function(e, t) {
        e.exports = h
      },
      y88i: function(e, t) {
        e.exports = m
      }
    })
  });