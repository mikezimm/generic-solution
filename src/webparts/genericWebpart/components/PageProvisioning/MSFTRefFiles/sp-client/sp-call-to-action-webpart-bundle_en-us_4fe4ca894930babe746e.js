/**
 * This is the MSFT Call to Action webpart:
 * https://spoprod-a.akamaihd.net/files/sp-client/sp-call-to-action-webpart-bundle_en-us_4fe4ca894930babe746e.js
 * 
 * Look in this folder in Sources under Page
 * >>  modern.akamai.odsp.cdn.office.net    >> files    >> sp-client    >> sp-call-to-action-webpart-bundle_en-us_4fe4ca894930babe746e.js
 * 
 * this.properties:
 * "button.label": {
 * "button.linkUrl": {
 * "image.url": {
 * "overlayText.text": {
 * 
 * 
 * 
 * 
 */
define("df8e44e7-edd5-46d5-90da-aca1539313b8_0.1.0", ["tslib", "@ms/sp-telemetry", "@microsoft/sp-component-base", "@microsoft/sp-loader", "@microsoft/office-ui-fabric-react-bundle", "@microsoft/sp-lodash-subset", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities", "@ms/sp-deferred-component", "@ms/sp-rich-image", "@microsoft/sp-diagnostics", "@ms/odsp-utilities-bundle"], function(e, t, n, o, i, r, a, s, l, c, d, p, u, h, m, f) {
    return function(e) {
      function t(t) {
        for (var n, i, r = t[0], a = t[1], s = 0, l = []; s < r.length; s++) i = r[s], Object.prototype.hasOwnProperty.call(o, i) && o[i] && l.push(o[i][0]), o[i] = 0;
        for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
        for (c && c(t); l.length;) l.shift()()
      }
      var n = {},
        o = {
          11: 0
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
              }, {
                i: "2c46c8f0-e214-4f49-951e-fd5b9d7b4ae1",
                v: "1.12.0",
                m: "8dK2"
              }, {
                i: "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8",
                v: "1.12.0",
                m: "X+PM"
              }, {
                i: "c07208f0-ea3b-4c1a-9965-ac1b825211a6",
                v: "1.12.0",
                m: "vlQI"
              }]
            } [e] || []
          }(t), s = 0; s < a.length; s++) e[a[s].m] || function(t) {
          n.push(r.SPComponentLoader.loadComponentById(t.i, t.v).then(function(n) {
            e[t.m] = function(e) {
              e.exports = n
            }
          }))
        }(a[s]);
        var l = o[t];
        if (0 !== l)
          if (l) n.push(l[2]);
          else {
            var c = new Promise(function(e, n) {
              l = o[t] = [e, n]
            });
            n.push(l[2] = c);
            var d, p = document.createElement("script");
            p.charset = "utf-8", p.timeout = 120, i.nc && p.setAttribute("nonce", i.nc), p.src = function(e) {
              return i.p + "chunk." + ({
                2: "call-to-action-edit-mode"
              } [e] || e) + "_" + "en-us" + "_" + {
                2: "debb028c9efc21939c42"
              } [e] + ".js"
            }(t);
            var u = new Error;
            d = function(e) {
              p.onerror = p.onload = null, clearTimeout(h);
              var n = o[t];
              if (0 !== n) {
                if (n) {
                  var i = e && ("load" === e.type ? "missing" : e.type),
                    r = e && e.target && e.target.src;
                  u.message = "Loading chunk " + t + " failed.\n(" + i + ": " + r + ")", u.name = "ChunkLoadError", u.type = i, u.request = r, n[1](u)
                }
                o[t] = void 0
              }
            };
            var h = setTimeout(function() {
              d({
                type: "timeout",
                target: p
              })
            }, 12e4);
            p.onerror = p.onload = d, document.head.appendChild(p)
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
      var a = window.webpackJsonp_8c4a6a562ec36ed6536c907cfb0e02ee = window.webpackJsonp_8c4a6a562ec36ed6536c907cfb0e02ee || [],
        s = a.push.bind(a);
      a.push = t, a = a.slice();
      for (var l = 0; l < a.length; l++) t(a[l]);
      var c = s;
      return function() {
        var e, t = document.getElementsByTagName("script"),
          n = "undefined" != typeof spScriptNamePattern ? spScriptNamePattern : /sp-call-to-action-webpart-bundle_en-us_4fe4ca894930babe746e\.js/i;
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
      }(), i(i.s = "vjwA")
    }({
      "17wl": function(t, n) {
        t.exports = e
      },
      "2kWm": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return s
        }), n.d(t, "b", function() {
          return l
        });
        var o = n("17wl"),
          i = n("I6O9"),
          r = n("qjmy"),
          a = function() {
            function e() {}
            return e.loadModule = function() {
              return e._loadedModulePromise || (e._loadedModulePromise = i.SPComponentLoader.loadComponentById("1e49a922-5650-4595-926f-4d19966e0e67")), e._loadedModulePromise
            }, e
          }(),
          s = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype._internalLoad = function() {
              return a.loadModule().then(function(e) {
                return e.FocalPoint
              })
            }, t
          }(r._DeferredComponent),
          l = function() {
            function e() {}
            return e.load = function() {
              return e._classPromise || (e._classPromise = a.loadModule().then(function(e) {
                return e.FocalPoint
              })), e._classPromise
            }, e
          }()
      },
      "2q6Q": function(e, n) {
        e.exports = t
      },
      "5gqb": function(e) {
        e.exports = JSON.parse('{"a":"Type text to display on top of image."}')
      },
      "7Awa": function(e, t) {
        e.exports = n
      },
      "9sBx": function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return r
        });
        var o = n("UWqr"),
          i = n("2q6Q");
  
        function r(e, t) {
          t && t !== o.DisplayMode.Read || (a(e, i._PerformanceExperiment.WEXImagePreAllocate), a(e, i._PerformanceExperiment.WEXImageBreakpointStraddlePerfExperiment))
        }
  
        function a(e, t) {
          i._PerformanceLogger.trackWebpartExperiment(e.webPartTag, t, void 0, !0)
        }
      },
      F0YK: function(e) {
        e.exports = JSON.parse('{"c":"Set focal point","e":"Zoom in","f":"Zoom out","d":"Reset","b":"Add your call to action text here","a":"Button"}')
      },
      F9ya: function(e) {
        e.exports = JSON.parse('{"a":"Button will be clickable when page is in view mode.","b":"Button will not be clickable in view mode until a link is entered.","c":"The image is zoomed to {0} times the original size."}')
      },
      I6O9: function(e, t) {
        e.exports = o
      },
      KL1q: function(e, t) {
        e.exports = i
      },
      Pk8u: function(e, t) {
        e.exports = r
      },
      U4ag: function(e, t) {
        e.exports = a
      },
      UWqr: function(e, t) {
        e.exports = s
      },
      br4S: function(e, t) {
        e.exports = l
      },
      cDcd: function(e, t) {
        e.exports = c
      },
      faye: function(e, t) {
        e.exports = d
      },
      "hiL/": function(e, t) {
        e.exports = p
      },
      qjmy: function(e, t) {
        e.exports = u
      },
      r9Fm: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return i
        }), n.d(t, "b", function() {
          return o
        }), n.d(t, "c", function() {
          return r
        });
        var o, i = {
          Square: "Square",
          Wide: "Wide",
          Tall: "Tall",
          All: "All"
        };
        ! function(e) {
          e[e.Documents = 1] = "Documents", e[e.Images = 2] = "Images", e[e.Pages = 3] = "Pages", e[e.Videos = 4] = "Videos", e[e.Audios = 5] = "Audios", e[e.Models = 6] = "Models", e[e.BasicDocuments = 7] = "BasicDocuments", e[e.Transcripts = 8] = "Transcripts", e[e.VideosWithWebm = 9] = "VideosWithWebm"
        }(o || (o = {}));
        var r = {
          Files: 1,
          FoldersOnly: 2,
          FoldersAndFiles: 3
        }
      },
      rMgv: function(e, t, n) {
        "use strict";
        n.d(t, "b", function() {
          return o
        }), n.d(t, "a", function() {
          return i
        });
        var o = ["http", "https", "mailto"],
          i = "Image"
      },
      tGpx: function(e, t) {
        e.exports = h
      },
      ut3N: function(e, t) {
        e.exports = m
      },
      vjwA: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n("17wl"),
          i = n("cDcd"),
          r = n("faye"),
          a = n("KL1q"),
          s = n("7Awa"),
          l = n("UWqr"),
          c = n("ut3N"),
          d = n("br4S"),
          p = n("y88i"),
          u = n("hiL/"),
          h = n("r9Fm"),
          m = n("2q6Q"),
          f = n("9sBx"),
          g = n("rMgv"),
          _ = n("U4ag"),
          b = n("tGpx"),
          y = Object(a.mergeStyleSets)({
            imageContainer: {
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }
          }),
          v = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t.handleImageLoadFailure = function(e, n) {
                t.props.onImageLoadError && "stockImage" === e && t.props.onImageLoadError(n)
              }, t
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = {
                  imageUrl: this.props.url,
                  uniqueId: this.props.uniqueId,
                  webId: this.props.webId,
                  listId: this.props.listId,
                  siteId: this.props.siteId
                },
                t = {
                  alt: this.props.altText,
                  style: this.resizedStyles,
                  callerId: this.props.callerId,
                  imageData: e,
                  serviceScope: this.props.serviceScope,
                  thumbnailWidth: this.props.thumbnailWidth,
                  onImageLoad: this.props.onImageLoad,
                  onImageLoadFailure: this.handleImageLoadFailure,
                  role: this.props.altText ? void 0 : "presentation"
                };
              return i.createElement("div", {
                className: y.imageContainer
              }, i.createElement(b.SPImg, Object(o.__assign)({
                imgRef: this.props.imageRef
              }, t)))
            }, Object.defineProperty(t.prototype, "resizedStyles", {
              get: function() {
                var e = this.props.focalPosition ? this.props.focalPosition.x : 50,
                  t = this.props.focalPosition ? this.props.focalPosition.y : 50;
                return {
                  left: e + "%",
                  top: t + "%",
                  transform: "translate(-" + e + "%, -" + t + "%)",
                  position: "absolute",
                  width: 100 * this.props.zoomRatio + "%"
                }
              },
              enumerable: !0,
              configurable: !0
            }), t
          }(i.Component),
          x = n("yCEm"),
          C = n("2kWm"),
          I = n("F0YK"),
          S = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t._getClassNames = function(e) {
              return Object(a.mergeStyleSets)({
                bannerContainer: {
                  position: "absolute",
                  marginLeft: -8,
                  top: -48,
                  zIndex: 1,
                  transition: "all .3s ease",
                  display: "none",
                  selectors: {
                    "&:focus, .ControlZone--selected &": {
                      display: "block"
                    }
                  }
                }
              })
            }, t.prototype.render = function() {
              var e = t._getClassNames(Object(a.getTheme)());
              return i.createElement(a.FocusZone, {
                isCircularNavigation: !0,
                componentRef: this._resolveRef("_focusZone"),
                ariaLabelledBy: "BannerPrimaryToolbar-focusZone"
              }, i.createElement("div", {
                className: e.bannerContainer
              }, i.createElement(u.ToolbarButton, {
                onClick: this.props.onZoomIn,
                title: I.e,
                fabricIconKey: "ZoomIn",
                key: "zoomIn",
                "data-automation-id": "call-to-action-zoom-in-button"
              }), i.createElement(u.ToolbarButton, {
                onClick: this.props.onZoomOut,
                title: I.f,
                fabricIconKey: "ZoomOut",
                key: "zoomOut",
                automationId: "call-to-action-zoom-out-button"
              }), i.createElement(u.ToolbarButton, {
                onClick: this.props.onSetFocusPoint,
                title: I.c,
                fabricIconKey: "FocalPoint",
                key: "focusPoint",
                automationId: "call-to-action-focal-point-button"
              }), i.createElement(u.ToolbarButton, {
                onClick: this.props.onReset,
                title: I.d,
                fabricIconKey: "Cancel",
                key: "resetEverything",
                automationId: "call-to-action-reset-button"
              })))
            }, t
          }(a.BaseComponent),
          P = 1.1,
          w = function(e) {
            function t(t) {
              var o = e.call(this, t) || this;
              return o._focalPointContainer = i.createRef(), o.handleChangeSize = function(e, t) {
                o.setState({
                  textFieldHeight: t
                }), requestAnimationFrame(function() {
                  for (var e = o._imageElement ? o._imageElement.clientHeight : 0, t = 0; 0 !== e && e < n._imageContainerHeight(o.state);) t += 1, e *= P;
                  0 !== t && o.onHandleZoomIn(Math.pow(P, t))
                })
              }, o.handleImageLoad = function(e) {
                return o.setState({
                  loadedImageUrl: new p.Uri(e.currentTarget.src)
                })
              }, o.onSetFocusPoint = function() {
                return o.setState({
                  showFocusPoint: !0
                })
              }, o.onReset = function() {
                return o.props.onImageChange(void 0, 1)
              }, o.onZoomIn = function() {
                return o.onHandleZoomIn(P)
              }, o.onHandleZoomOut = function() {
                var e = o.props.image,
                  t = e.zoomRatio <= 1 ? e.zoomRatio : e.zoomRatio / P;
                o.props.onImageChange(e.focalPosition, t)
              }, o.onHandleZoomIn = function(e) {
                void 0 === e && (e = P), o.props.onImageChange(o.props.image.focalPosition, o.props.image.zoomRatio * e)
              }, o._imageRefCallback = function(e) {
                o._imageElement = e
              }, o.state = {
                showFocusPoint: !1,
                loadedImageUrl: void 0,
                textFieldHeight: 43
              }, o
            }
            var n;
            return Object(o.__extends)(t, e), n = t, t._actionContainerHeight = function(e) {
              return e.textFieldHeight + 40 + 5
            }, t._webPartContainerHeight = function(e) {
              return n._actionContainerHeight(e) + 64
            }, t._imageContainerHeight = function(e) {
              return n._webPartContainerHeight(e)
            }, t._getClassNames = function(e, t, o) {
              return Object(a.mergeStyleSets)({
                webPartContainer: {
                  height: n._webPartContainerHeight(t),
                  position: "relative"
                },
                overlayContainer: {
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  outline: 0
                },
                actionContainer: {
                  display: "flex",
                  flexDirection: "column",
                  height: n._actionContainerHeight(t),
                  justifyContent: "space-between",
                  margin: 32
                },
                buttonContainer: {
                  textAlign: e.alignment.toLowerCase()
                },
                imageContainer: {
                  height: n._webPartContainerHeight(t)
                }
              })
            }, t._getButtonStyles = function(e) {
              return {
                root: {
                  height: 40,
                  maxWidth: "100%",
                  borderRadius: 2,
                  padding: "0 20px",
                  fontSize: 16,
                  pointerEvents: e.isEditMode ? "none" : void 0,
                  verticalAlign: "top"
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
              }
            }, t.prototype.render = function() {
              var e = this,
                t = this.props,
                r = t.alignment,
                s = t.button,
                l = t.containerWidth,
                c = t.image,
                d = t.isEditMode,
                p = t.isUploadingImage,
                u = t.overlayText,
                h = t.onOverlayTextChange,
                m = t.onImageChange;
              if (!d && !(s.label || s.linkUrl || u.text)) return !1;
              var f = this.state,
                g = f.showFocusPoint,
                b = f.loadedImageUrl,
                y = n._getClassNames(this.props, this.state, Object(a.getTheme)()),
                P = {
                  position: c.focalPosition,
                  onFocalPointMove: function(e) {
                    return m(e, c.zoomRatio)
                  },
                  onFocalPointEnd: function() {
                    return e.setState({
                      showFocusPoint: !1
                    })
                  }
                },
                w = g && i.createElement(C.a, {
                  deferredProps: P
                }),
                E = !g && i.createElement("div", {
                  className: y.actionContainer
                }, i.createElement(x.a, {
                  isEditMode: d,
                  initialValue: u.text,
                  hostWidth: l - 64,
                  onChangeText: h,
                  alignment: r,
                  placeholder: I.b,
                  heightOption: "NoLimit",
                  fontSize: 18,
                  padding: {
                    top: 8,
                    bottom: 8,
                    left: 20,
                    right: 20
                  },
                  onChangeSize: this.handleChangeSize
                }), i.createElement("div", {
                  className: y.buttonContainer
                }, i.createElement(a.PrimaryButton, {
                  disabled: !s.linkUrl,
                  href: d ? void 0 : s.linkUrl,
                  target: Object(_.getUrlTarget)(s.linkUrl),
                  styles: n._getButtonStyles(this.props)
                }, s.label || I.a))),
                T = d && i.createElement(S, {
                  onSetFocusPoint: this.onSetFocusPoint,
                  onReset: this.onReset,
                  onZoomIn: this.onZoomIn,
                  onZoomOut: this.onHandleZoomOut
                }),
                O = void 0 === b || p,
                j = n._webPartContainerHeight(this.state),
                L = i.createElement(a.Shimmer, {
                  shimmerElements: [{
                    type: a.ShimmerElementType.line,
                    width: l,
                    height: j
                  }],
                  width: l,
                  isDataLoaded: !O
                }, i.createElement("div", {
                  className: y.imageContainer
                }, i.createElement(v, Object(o.__assign)({}, c, {
                  onImageLoad: this.handleImageLoad,
                  callerId: "CallToAction",
                  imageRef: this._imageRefCallback
                }))));
              return i.createElement("div", {
                className: y.webPartContainer
              }, T, L, i.createElement("div", {
                className: y.overlayContainer,
                ref: this._focalPointContainer
              }, w), i.createElement("div", {
                className: y.overlayContainer
              }, E))
            }, t.prototype.componentDidUpdate = function(e, t) {
              var n = this;
              !t.showFocusPoint && this.state.showFocusPoint && C.b.load().then(function(e) {
                e.focus(n._focalPointContainer.current)
              }).catch(function(e) {
                c._TraceLogger.logError(c._LogSource.create("CallToActionWebPart"), e, "LoadFocalPointChunk")
              })
            }, n = Object(o.__decorate)([Object(a.customizable)("CallToAction", ["theme"])], t)
          }(i.Component),
          E = n("F9ya"),
          T = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._isUploadingImage = !1, t._onOverlayTextChange = function(e) {
                t.properties.overlayText = {
                  text: e
                }
              }, t._handleOpenFilePicker = function() {
                t._filePickerWrapper || (t._filePickerWrapper = new t._editModeModule.FilePickerWrapper({
                  serviceScope: t.context.serviceScope,
                  itemTypes: new Set([h.b.Images]),
                  allowExternalTenantLinks: !0,
                  disableWebSearch: !1,
                  isMultiSelectMode: !1,
                  selectableType: h.c.Files
                })), t._filePickerWrapper.openFilePicker({
                  onFileReady: function(e, n) {
                    t.properties.image = {
                      url: e,
                      itemInfo: n,
                      zoomRatio: 1,
                      focalPosition: void 0
                    }, t._isUploadingImage = !1, t.render()
                  },
                  onUploadFileStart: function() {
                    t._isUploadingImage = !0, t.render()
                  }
                })
              }, t._handleThemeChangedEvent = function(e) {
                t._variantTheme = e.theme, t.render()
              }, t._handleImageChange = function(e, n) {
                t.properties.image = Object(o.__assign)(Object(o.__assign)({}, t.properties.image), {
                  zoomRatio: n,
                  focalPosition: e
                }), u.ScreenReaderAlert.read(l.Text.format(E.c, n.toFixed(2)), u.ReadingMode.ReadImmediately), t.render()
              }, t
            }
            return Object(o.__extends)(t, e), t.getThumbnailUrlByImageProperties = function(e, t, n) {
              var i = u.ThumbnailUrlGenerator.getThumbnailUrl(Object(o.__assign)(Object(o.__assign)({}, e.itemInfo), {
                absoluteUrl: t,
                width: n,
                fileType: u.ExtensionHelper.getExtension(new u.SPResourcePath(e.url)) || "",
                callerId: "CallToAction"
              }));
              return new p.Uri(i)
            }, t.prototype.render = function() {
              var e, t, n, s, c = {
                  zoomRatio: this.properties.image.zoomRatio,
                  focalPosition: this.properties.image.focalPosition,
                  serviceScope: this.context.serviceScope,
                  uniqueId: null === (e = this.properties.image.itemInfo) || void 0 === e ? void 0 : e.uniqueId,
                  webId: null === (t = this.properties.image.itemInfo) || void 0 === t ? void 0 : t.webId,
                  listId: null === (n = this.properties.image.itemInfo) || void 0 === n ? void 0 : n.listId,
                  siteId: null === (s = this.properties.image.itemInfo) || void 0 === s ? void 0 : s.siteId,
                  url: this.properties.image.url,
                  thumbnailWidth: this.width
                },
                d = this._variantTheme || Object(a.getTheme)(),
                p = i.createElement(a.Customizer, {
                  settings: {
                    theme: d
                  }
                }, i.createElement(w, {
                  image: c,
                  button: Object(o.__assign)({}, this.properties.button),
                  overlayText: Object(o.__assign)({}, this.properties.overlayText),
                  containerWidth: this.width,
                  isEditMode: this.displayMode === l.DisplayMode.Edit,
                  isUploadingImage: this._isUploadingImage,
                  alignment: this.properties.alignment,
                  onImageChange: this._handleImageChange,
                  onOverlayTextChange: this._onOverlayTextChange
                }));
              r.render(p, this.domElement)
            }, t.prototype.onDispose = function() {
              this.context.serviceScope.consume(s.ThemeProvider.serviceKey).themeChangedEvent.remove(this, this._handleThemeChangedEvent), r.unmountComponentAtNode(this.domElement), e.prototype.onDispose.call(this)
            }, t.prototype.onInit = function() {
              return this.properties.image.url || (this.properties.image.url = t._defaultImageUrl), this._getSectionBackgroundTheme(), Object(f.a)(this.context, this.displayMode), e.prototype.onInit.call(this)
            }, t.prototype.onDisplayModeChanged = function(t) {
              if (t === l.DisplayMode.Edit) {
                var n = this.properties,
                  o = n.button,
                  i = n.overlayText,
                  r = new c._LogEntry("CallToActionWebPart", "SaveWebPart", c._LogType.Event, {
                    buttonLabelLength: String(o.label ? o.label.length : 0),
                    overlayTextLength: String(i.text ? i.text.length : 0),
                    webPartWidth: String(this.width)
                  });
                m._EngagementLogger.logEventWithLogEntry(r)
              }
              e.prototype.onDisplayModeChanged.call(this, t)
            }, t.prototype.onAfterResize = function(e) {
              this.render()
            }, t.prototype.getPropertyPaneConfiguration = function() {
              return this._editModeModule.getPropertyPane({
                alignment: this.properties.alignment,
                openFilePicker: this._handleOpenFilePicker
              })
            }, t.prototype.onPropertyPaneFieldChanged = function(t, n, o) {
              "button.linkUrl" === t && (this.properties.button.linkUrl = u.UrlUtility.ensureSchema(this.properties.button.linkUrl || "", g.b), n ? this.properties.button.linkUrl || u.ScreenReaderAlert.read(E.b, u.ReadingMode.ReadImmediately) : this.properties.button.linkUrl && u.ScreenReaderAlert.read(E.a, u.ReadingMode.ReadImmediately)), e.prototype.onPropertyPaneFieldChanged.call(this, t, n, o)
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                return {
                  "button.label": {
                    isSearchablePlainText: !0
                  },
                  "button.linkUrl": {
                    isLink: !0
                  },
                  "image.url": {
                    isImageSource: !0
                  },
                  "overlayText.text": {
                    isSearchablePlainText: !0
                  }
                }
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.loadPropertyPaneResources = function() {
              var e = this;
              return n.e(2).then(n.bind(null, "RbPn")).then(function(t) {
                e._editModeModule = t
              })
            }, t.prototype._getSectionBackgroundTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(s.ThemeProvider.serviceKey);
                e._variantTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, e._handleThemeChangedEvent)
              })
            }, t._defaultImageUrl = n("wu+p"), t
          }(d.BaseClientSideWebPart);
        t.default = T
      },
      "wu+p": function(e, t, n) {
        e.exports = n.p + "spdefaultbanner_light_a0bc58c25323ac7ccd8b6d2e15b0ee85.jpg"
      },
      y88i: function(e, t) {
        e.exports = f
      },
      yCEm: function(e, t, n) {
        "use strict";
        n.d(t, "a", function() {
          return p
        });
        var o = n("17wl"),
          i = n("cDcd"),
          r = n("KL1q"),
          a = n("UWqr"),
          s = n("ut3N"),
          l = n("Pk8u"),
          c = n("U4ag"),
          d = n("5gqb"),
          p = function(e) {
            function t(t) {
              var n = e.call(this, t) || this;
              return n._overlayTextWrapperRef = i.createRef(), n._handleClick = function(e) {
                e.stopPropagation(), n.props.onClick && n.props.onClick()
              }, n._handleTextChanged = function(e, t) {
                var o = n.props,
                  i = o.maximumCharacters,
                  r = o.onChangeText;
                if (i) {
                  t.length > i && (t = t.substr(0, i));
                  var a = /\n/g;
                  (t.match(a) || []).length >= i && (t = t.replace(a, " "))
                }
                r && r(t), n.setState({
                  text: t
                })
              }, n._handleFocus = function() {
                n._initialValue = n.state.text
              }, n._handleBlur = function() {
                var e;
                n._initialValue !== n.state.text && n.props.qosPrefix && (e = 0 === n.state.text.length ? "Clear" : 0 === n._initialValue.length ? "Add" : "Edit", s._EngagementLogger.logEventWithLogEntry(new s._LogEntry(n.props.qosPrefix, "OverlayText", s._LogType.Event, {
                  action: e,
                  length: n.state.text.length.toString()
                })))
              }, n.state = {
                text: t.initialValue || "",
                textFieldWidth: 0,
                textFieldHeight: 0
              }, n
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = this.props,
                t = e.hostWidth,
                n = e.isEditMode,
                o = e.alignment,
                a = e.fontSize,
                s = e.padding,
                l = this.state.text,
                c = t - s.left - s.right,
                d = 1.5 * a,
                p = d + s.top + s.bottom;
              if (c <= 0 || !n && !l) return !1;
              var u = {
                  fontSize: a,
                  padding: s.top + "px " + s.right + "px " + s.bottom + "px " + s.left + "px",
                  maxWidth: t,
                  fontWeight: "600",
                  color: "#fff",
                  lineHeight: d,
                  minHeight: p
                },
                h = Object(r.mergeStyleSets)({
                  overlayTextContainer: {
                    display: "flex",
                    justifyContent: "Center" === o ? "center" : "Left" === o ? "unset" : "flex-end"
                  }
                }),
                m = n ? this._renderEditModeView(l, u) : this._renderViewModeView(l, u);
              return i.createElement("div", {
                className: h.overlayTextContainer
              }, m)
            }, t.prototype.componentDidUpdate = function(e, t) {
              (!Object(l.isEqual)(e, this.props) || !Object(l.isEqual)(t, this.state)) && this._updateTextFieldSizeBasedOnDisplayWidth()
            }, t.prototype.componentDidMount = function() {
              this._updateTextFieldSizeBasedOnDisplayWidth()
            }, Object.defineProperty(t.prototype, "_isMultiline", {
              get: function() {
                return "SquareHeight" === this.props.heightOption || "NoLimit" === this.props.heightOption
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._updateTextFieldSizeBasedOnDisplayWidth = function() {
              var e = this;
              requestAnimationFrame(function() {
                var t = e._overlayTextWrapperRef.current ? e._overlayTextWrapperRef.current.clientWidth : 0,
                  n = e._overlayTextWrapperRef.current ? e._overlayTextWrapperRef.current.clientHeight : 0;
                t === e.state.textFieldWidth && n === e.state.textFieldHeight || (e.setState({
                  textFieldWidth: t,
                  textFieldHeight: n
                }), e.props.onChangeSize && e.props.onChangeSize(t, n))
              })
            }, t.prototype._renderEditModeView = function(e, n) {
              var a = this.props,
                s = a.hostWidth,
                l = a.placeholder,
                c = a.fontSize,
                p = a.padding,
                u = this.state,
                h = u.textFieldWidth,
                m = u.textFieldHeight,
                f = Object(r.mergeStyleSets)({
                  textField: {
                    width: t._isIE || t._isSafari ? h + 2 + p.right : h + 2,
                    maxWidth: s,
                    height: m,
                    selectors: {
                      "& div": {
                        backgroundColor: "transparent"
                      },
                      "input[type=text], textarea": Object(o.__assign)({
                        margin: "0 auto",
                        backgroundColor: "rgba(0,0,0,0.88)",
                        height: m,
                        overflow: "hidden"
                      }, n),
                      "input[type=text]::placeholder, textarea::placeholder": {
                        fontSize: c,
                        color: "#fff",
                        fontWeight: "600"
                      }
                    }
                  }
                }),
                g = 0 !== h && i.createElement(r.TextField, {
                  borderless: !0,
                  multiline: this._isMultiline,
                  resizable: !1,
                  ariaLabel: d.a,
                  className: f.textField,
                  placeholder: l,
                  value: e,
                  onChange: this._handleTextChanged,
                  onFocus: this._handleFocus,
                  onBlur: this._handleBlur,
                  onClick: this._handleClick,
                  "data-automation-id": "image-overlay-text"
                });
              return i.createElement(i.Fragment, null, this._renderViewModeView(e || l, n, !1), g)
            }, t.prototype._renderViewModeView = function(e, n, a) {
              void 0 === a && (a = !0);
              var s, l = this.props,
                d = l.heightOption,
                p = l.padding,
                u = this.state.textFieldWidth,
                h = n.lineHeight,
                m = 1;
              if (0 !== h && "SquareHeight" === d) {
                var f = n.minHeight;
                u > f && (f = u), m = Math.floor((f - p.top - p.bottom) / h), s = Object(c.truncateText)(m, h)
              } else "NoLimit" === d && (m = -1);
              "\n" === e.slice(-1) && (e += " ");
              var g = Object(r.mergeStyleSets)({
                  overlayTextWrapper: Object(o.__assign)({
                    backgroundColor: "rgba(0,0,0, 0.88)",
                    whiteSpace: this._isMultiline ? "pre-wrap" : "pre",
                    wordWrap: t._isIE && this._isMultiline ? "break-word" : void 0,
                    overflow: t._isIE && this._isMultiline ? "hidden" : void 0,
                    wordBreak: this._isMultiline ? "break-word" : "unset",
                    zIndex: a ? 1 : 0,
                    position: a ? "unset" : "absolute",
                    opacity: a ? 1 : 0,
                    boxSizing: "border-box"
                  }, n),
                  overlayText: s
                }),
                _ = t._isIE ? i.createElement("div", {
                  className: g.overlayText,
                  title: e
                }, e) : i.createElement(c.LessText, {
                  className: "",
                  text: e,
                  lines: m,
                  autoShowTitle: !1
                });
              return i.createElement("div", {
                className: g.overlayTextWrapper,
                ref: this._overlayTextWrapperRef,
                "data-automation-id": "overlay-text-wrapper"
              }, _)
            }, t._browser = a._BrowserDetection.getBrowserInformation().browser, t._isIE = t._browser === a._Browser.IE, t._isSafari = t._browser === a._Browser.Safari, t
          }(i.Component)
      }
    })
  });