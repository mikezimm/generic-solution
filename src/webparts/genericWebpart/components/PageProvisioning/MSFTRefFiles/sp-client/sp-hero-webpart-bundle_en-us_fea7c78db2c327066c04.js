
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


define("c4bd7b2f-7b6e-4599-8485-16504575f590_1.0.0", ["tslib", "@ms/sp-telemetry", "@microsoft/sp-component-base", "@microsoft/sp-image-helper", "@microsoft/sp-loader", "@microsoft/office-ui-fabric-react-bundle", "@microsoft/sp-lodash-subset", "@ms/sp-dataproviders", "@ms/sp-webpart-shared", "@microsoft/sp-core-library", "@microsoft/sp-page-context", "@microsoft/sp-webpart-base", "react", "react-dom", "@ms/sp-component-utilities", "@microsoft/load-themed-styles", "@ms/sp-deferred-component", "@ms/sp-rich-image", "@microsoft/sp-diagnostics", "@microsoft/sp-http", "@ms/odsp-utilities-bundle"], function(e, t, i, o, a, r, n, _, c, s, l, d, p, h, f, u, m, g, b, I, y) {
    return function(e) {
      function t(t) {
        for (var i, a, r = t[0], n = t[1], _ = 0, c = []; _ < r.length; _++) a = r[_], Object.prototype.hasOwnProperty.call(o, a) && o[a] && c.push(o[a][0]), o[a] = 0;
        for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        for (s && s(t); c.length;) c.shift()()
      }
      var i = {},
        o = {
          12: 0
        };
  
      function a(t) {
        if (i[t]) return i[t].exports;
        var o = i[t] = {
          i: t,
          l: !1,
          exports: {}
        };
        return e[t].call(o.exports, o, o.exports, a), o.l = !0, o.exports
      }
      a.e = function(t) {
        for (var i = [], n = function(e) {
            return {
              13: [{
                i: "17ce0976-e69a-4355-be84-89b69a74717d",
                v: "0.1.0",
                m: "fglE"
              }, {
                i: "c79b9f88-6338-40fb-b463-3aad22a88b15",
                v: "0.1.0",
                m: "9poL"
              }]
            } [e] || []
          }(t), _ = 0; _ < n.length; _++) e[n[_].m] || function(t) {
          i.push(r.SPComponentLoader.loadComponentById(t.i, t.v).then(function(i) {
            e[t.m] = function(e) {
              e.exports = i
            }
          }))
        }(n[_]);
        var c = o[t];
        if (0 !== c)
          if (c) i.push(c[2]);
          else {
            var s = new Promise(function(e, i) {
              c = o[t] = [e, i]
            });
            i.push(c[2] = s);
            var l, d = document.createElement("script");
            d.charset = "utf-8", d.timeout = 120, a.nc && d.setAttribute("nonce", a.nc), d.src = function(e) {
              return a.p + "chunk." + ({
                13: "sp-hero-webpart-edit-mode"
              } [e] || e) + "_" + "none" + "_" + {
                13: "a835b3c9a878e50709f9"
              } [e] + ".js"
            }(t);
            var p = new Error;
            l = function(e) {
              d.onerror = d.onload = null, clearTimeout(h);
              var i = o[t];
              if (0 !== i) {
                if (i) {
                  var a = e && ("load" === e.type ? "missing" : e.type),
                    r = e && e.target && e.target.src;
                  p.message = "Loading chunk " + t + " failed.\n(" + a + ": " + r + ")", p.name = "ChunkLoadError", p.type = a, p.request = r, i[1](p)
                }
                o[t] = void 0
              }
            };
            var h = setTimeout(function() {
              l({
                type: "timeout",
                target: d
              })
            }, 12e4);
            d.onerror = d.onload = l, document.head.appendChild(d)
          } return Promise.all(i)
      }, a.m = e, a.c = i, a.d = function(e, t, i) {
        a.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: i
        })
      }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        })
      }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (a.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e)
          for (var o in e) a.d(i, o, function(t) {
            return e[t]
          }.bind(null, o));
        return i
      }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
          return e.default
        } : function() {
          return e
        };
        return a.d(t, "a", t), t
      }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, a.p = "";
      var r = a("I6O9");
      a.oe = function(e) {
        throw console.error(e), e
      };
      var n = window.webpackJsonp_8c4a6a562ec36ed6536c907cfb0e02ee = window.webpackJsonp_8c4a6a562ec36ed6536c907cfb0e02ee || [],
        _ = n.push.bind(n);
      n.push = t, n = n.slice();
      for (var c = 0; c < n.length; c++) t(n[c]);
      var s = _;
      return function() {
        var e, t = document.getElementsByTagName("script"),
          i = "undefined" != typeof spScriptNamePattern ? spScriptNamePattern : /sp-hero-webpart-bundle_en-us_fea7c78db2c327066c04\.js/i;
        if (t && t.length)
          for (var o = 0; o < t.length; o++)
            if (t[o]) {
              var r = t[o].getAttribute("src");
              if (r && r.match(i)) {
                e = r.substring(0, r.lastIndexOf("/") + 1);
                break
              }
            } if (!e)
          for (var n in window.__setWebpackPublicPathLoaderSrcRegistry__)
            if (n && n.match(i)) {
              e = n.substring(0, n.lastIndexOf("/") + 1);
              break
            } a.p = e
      }(), a(a.s = "bu4K")
    }({
      "/gjK": function(e, t, i) {
        (e.exports = i("q1Tm")(!1)).push([e.i, ".fk_k_9f38462c{position:absolute;bottom:8px;visibility:hidden;opacity:0;transition:all .15s ease}[dir=ltr] .fk_k_9f38462c{right:8px}[dir=rtl] .fk_k_9f38462c{left:8px}.ControlZone--selected .fl_k_9f38462c{visibility:visible;opacity:1;z-index:2}", ""])
      },
      "17wl": function(t, i) {
        t.exports = e
      },
      "2kWm": function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return _
        }), i.d(t, "b", function() {
          return c
        });
        var o = i("17wl"),
          a = i("I6O9"),
          r = i("qjmy"),
          n = function() {
            function e() {}
            return e.loadModule = function() {
              return e._loadedModulePromise || (e._loadedModulePromise = a.SPComponentLoader.loadComponentById("1e49a922-5650-4595-926f-4d19966e0e67")), e._loadedModulePromise
            }, e
          }(),
          _ = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype._internalLoad = function() {
              return n.loadModule().then(function(e) {
                return e.FocalPoint
              })
            }, t
          }(r._DeferredComponent),
          c = function() {
            function e() {}
            return e.load = function() {
              return e._classPromise || (e._classPromise = n.loadModule().then(function(e) {
                return e.FocalPoint
              })), e._classPromise
            }, e
          }()
      },
      "2q6Q": function(e, i) {
        e.exports = t
      },
      "30S8": function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return r
        });
        var o = i("UWqr"),
          a = i("U4ag"),
          r = function() {
            function e() {}
            return e.isFluentBasicEnabled = function() {
              return Object(a.isFluentEnabledFor)("HeroWebPart")
            }, e.isDeprecateEmphasisClassFlightEnabled = function() {
              return o._SPFlight.isEnabled(276)
            }, e
          }()
      },
      "6sCH": function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return a
        }), i.d(t, "c", function() {
          return r
        }), i.d(t, "d", function() {
          return n
        }), i.d(t, "b", function() {
          return _
        });
        var o = i("UWqr"),
          a = function() {
            function e() {}
            return e.isFixHeroAltKillSwitchActivated = function() {
              return o._SPKillSwitch.isActivated("d533d913-eaf4-4b82-ad0b-13bbe6773346")
            }, e.isFixIOSDescriptionInvisibleKillSwitchActivated = function() {
              return o._SPKillSwitch.isActivated("05e41834-d6e2-4e32-bdc5-fa2b578cf3e2")
            }, e.isHeroClickTelemetryKillSwitchActivated = function() {
              return o._SPKillSwitch.isActivated("807861ae-55a5-486e-aa30-ec3362b07b24")
            }, e.isHeroWordNotSplitKillSwitchActivated = function() {
              return o._SPKillSwitch.isActivated("610723fe-b0eb-469e-ae70-a592f5f3ad10")
            }, e.isHeroVideoUsageTelemetryKillSwitchActivated = function() {
              return o._SPKillSwitch.isActivated("5e4dc490-8487-4471-a6d8-0674d147fb1f")
            }, e
          }();
  
        function r() {
          return o._SPKillSwitch.isActivated("d90f453c-fa57-47ca-bfa4-236ad93d4b23")
        }
  
        function n() {
          return o._SPKillSwitch.isActivated("5ff74a6b-c4ed-4bd3-ae42-51a6416a6a15")
        }
  
        function _() {
          return o._SPKillSwitch.isActivated("c1de7feb-a49a-4549-9895-816194b8793f")
        }
      },
      "7Awa": function(e, t) {
        e.exports = i
      },
      8959: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return a
        });
        var o = i("2q6Q");
  
        function a() {
          return 1 === o._SPPerfExperiment.getVariantAndTrackExperiment(o._PerformanceExperiment.HeroVideoMetadataExperiment)
        }
      },
      "8dK2": function(e, t) {
        e.exports = o
      },
      "9sBx": function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return r
        });
        var o = i("UWqr"),
          a = i("2q6Q");
  
        function r(e, t) {
          t && t !== o.DisplayMode.Read || (n(e, a._PerformanceExperiment.WEXImagePreAllocate), n(e, a._PerformanceExperiment.WEXImageBreakpointStraddlePerfExperiment))
        }
  
        function n(e, t) {
          a._PerformanceLogger.trackWebpartExperiment(e.webPartTag, t, void 0, !0)
        }
      },
      CDLH: function(e, t, i) {
        "use strict";
        i("o5IQ"), t.a = {
          placeholderWrapper: "am_i_9f38462c",
          heroItemElement: "an_i_9f38462c",
          uploadingSpinner: "ao_i_9f38462c",
          heroImageHost: "ap_i_9f38462c",
          heroItemElement__active: "aq_i_9f38462c",
          indicatorOnlyOnFocus: "ar_i_9f38462c",
          content: "as_i_9f38462c",
          fluent: "at_i_9f38462c",
          heroItemElement__tiles: "au_i_9f38462c",
          contentAboveCallToAction: "av_i_9f38462c",
          title: "o_i_9f38462c",
          truncate2: "aw_i_9f38462c",
          truncate3: "ax_i_9f38462c",
          notSplit: "ay_i_9f38462c",
          truncate4: "az_i_9f38462c",
          heroItemElement__inCarousel: "ba_i_9f38462c",
          callToAction: "bb_i_9f38462c",
          upperCase: "bc_i_9f38462c",
          callToActionContent: "be_i_9f38462c",
          callToActionContentInViewMode: "bf_i_9f38462c",
          callToAction_icon: "bg_i_9f38462c",
          heroItemElement__featured: "bh_i_9f38462c",
          heroItemElement__colorOnly: "bi_i_9f38462c",
          heroItemElement__layers: "bj_i_9f38462c",
          heroItemElement__placeholder: "bk_i_9f38462c",
          heroItemElement__placeholder_content: "bl_i_9f38462c",
          heroItemElement__placeholder_title: "bm_i_9f38462c",
          heroItemElement__placeholder_descriptionLine: "bn_i_9f38462c",
          heroItemElement__placeholder__tiles: "bo_i_9f38462c",
          heroItemElement__placeholder_icon: "bp_i_9f38462c",
          heroItemElement__placeholder__layers: "bq_i_9f38462c",
          heroItemElement__placeholder__layers__imageArea: "br_i_9f38462c",
          heroItemElement__placeholder__layers__contentArea: "bs_i_9f38462c",
          heroItemElement__placeholder__layers__reversed: "bt_i_9f38462c",
          heroItemElement__tiledLg: "bu_i_9f38462c",
          heroItemElement__textDark: "bv_i_9f38462c",
          itemContainer: "bw_i_9f38462c",
          heroItemElement__viewable: "bx_i_9f38462c",
          heroItemElement__focalPoint: "by_i_9f38462c",
          heroItemElement__viewableImageWithAnimation: "bz_i_9f38462c",
          heroItemElement__viewableImageWithAnimationSmallTile: "ca_i_9f38462c",
          heroItemElement__viewableImageWithAnimationMediumTile: "cb_i_9f38462c",
          heroItemElement__viewableImageWithAnimationLargeTile: "cc_i_9f38462c",
          themeColor: "ce_i_9f38462c",
          featureText: "cf_i_9f38462c",
          description: "p_i_9f38462c",
          heroItemElement__Md: "cg_i_9f38462c",
          heroItemElement__Lg: "ch_i_9f38462c",
          heroItemElement__Xl: "ci_i_9f38462c",
          heroItemElement__XXl: "cj_i_9f38462c",
          heroItemElement__XXXl: "ck_i_9f38462c",
          heroItemElement__Sm: "cl_i_9f38462c",
          heroItemElement__reversed: "cm_i_9f38462c",
          heroItemElement__layersCarouselTemp: "cn_i_9f38462c",
          parallaxHost: "co_i_9f38462c",
          itemSizeS: "cp_i_9f38462c",
          itemSizeM: "cq_i_9f38462c",
          itemSizeL: "cr_i_9f38462c",
          itemSizeXL: "cs_i_9f38462c",
          itemSizeXXL: "ct_i_9f38462c",
          fixDescriptionOnIOS: "cu_i_9f38462c",
          DisplayedCallToActionContent: "cv_i_9f38462c",
          textContainer: "cw_i_9f38462c",
          heroDuration: "cx_i_9f38462c",
          heroStackLayoutWithDuration: "cy_i_9f38462c"
        }
      },
      H3rQ: function(e, t, i) {
        var o = i("/gjK"),
          a = i("jOlS");
        "string" == typeof o && (o = [
          [e.i, o]
        ]);
        for (var r = 0; r < o.length; r++) a.loadStyles(o[r][1], !0);
        o.locals && (e.exports = o.locals)
      },
      I6O9: function(e, t) {
        e.exports = a
      },
      KL1q: function(e, t) {
        e.exports = r
      },
      LQOY: function(e) {
        e.exports = JSON.parse('{"H":"Layout options","I":"Layout","jb":"Tiles","fb":"Layers","eb":"One tile","nb":"Two tiles","ib":"Three tiles","A":"Four tiles","x":"Five tiles","P":"One layer","mb":"Two layers","hb":"Three layers","z":"Four layers","w":"Five layers","lb":"Title","K":"Select a link to a document or page","s":"Description","qb":"Hero","R":"Select link","U":"Hero Content","S":"Make a visual impression with content.","T":"Select a link to an image, document, or page.","cb":"Current selected link","q":"Change","p":"Change link. The current selected link is {0}. Press enter to change link.","o":"Change","n":"Change Image","pb":"Uploading...","v":"This file type is not supported","u":"Use an image, document, or page instead.","Y":"40 character limit - {0} characters left||40 character limit - {0} character left||40 character limit - {0} characters left","X":"500 character limit - {0} characters left||500 character limit - {0} character left||500 character limit - {0} characters left","ab":"80 character limit - {0} characters left||80 character limit - {0} character left||80 character limit - {0} characters left","bb":"110 character limit - {0} characters left||110 character limit - {0} character left||110 character limit - {0} characters left","W":"40 character limit - {0} characters left||40 character limit - {0} character left||40 character limit - {0} characters left","V":"Describe this image for people who can\\u0027t see it","Z":"0||1||2-","db":"Show title in layout","i":"Alternative text","j":"Auto-selected image","r":"Custom image","gb":"Color block","J":"Link","C":"Background image","Q":"Options","Cb":"Show call to action link","yb":"Call to action text","xb":"Call to action link","wb":"Learn more","vb":"Continue reading","Bb":"Show topic heading","Ab":"Topic heading text","zb":"Topic","rb":"Yes","M":"No","N":"No default image available. Select a custom image","O":"To see layout options, try making your window size larger or your screen resolution higher. If you\\u0027re using this web part in a 1/3 column, move the web part to a 2/3 or full-width column.","f":"{0}, showing {1} in a carousel.","h":"{0}, showing {1} as tiles. Use left and right arrow keys to move between items.","g":"{0}, showing {1} as stacks. Use left and right arrow keys to move between items.","e":"{0} items||{0} item||{0} items","d":"0||1||2-","D":"Press enter to go to this link","G":"Use ctrl + left arrow or ctrl + right arrow to reorder hero items.","F":"Press up or down arrow keys to move into item.","a":"{0}. {1}. {2}.","b":"{0}. {1}. ","c":"{0}. {1}. {2}.","E":"Use left and right arrow keys to move between items.","l":"{0}. {1}.","m":"{0}. {1}.","kb":"The Title character limit is {0}. No more characters can be accepted.","ob":"Image uploaded.","k":"Add http:// or https:// to the beginning of the link and try again.","y":"Set focal point","sb":"Zoom in","tb":"Zoom out","t":"Edit details. Press enter to change the title, link, image, or other options for this item.","L":"Move item. When selected, use ctrl + left arrow or ctrl + right arrow to reorder items.","ub":"Current zoom ratio is {0}.","B":"Page hero. Use left and right arrow keys to move between items."}')
      },
      NcRX: function(e, t, i) {
        (e.exports = i("q1Tm")(!1)).push([e.i, '.a_a_37591358,.b_a_37591358{height:100%;position:relative}a.c_a_37591358{text-decoration:none;display:block}.e_a_37591358 .c_a_37591358{position:absolute}.e_a_37591358.f_a_37591358 .c_a_37591358{bottom:0;left:0;right:0;top:0}.e_a_37591358.g_a_37591358 .c_a_37591358:first-child{left:0;right:0;top:0;bottom:50%}.e_a_37591358.g_a_37591358 .c_a_37591358:nth-child(2){left:0;right:0;top:50%;bottom:0}.e_a_37591358.h_a_37591358 .c_a_37591358:first-child{left:0;right:0;top:0;bottom:66.67%}.e_a_37591358.h_a_37591358 .c_a_37591358:nth-child(2){left:0;right:0;top:33.33%;bottom:33.33%}.e_a_37591358.h_a_37591358 .c_a_37591358:nth-child(3){left:0;right:0;top:66.66%;bottom:0}.e_a_37591358.i_a_37591358 .c_a_37591358:first-child{left:0;right:0;top:0;bottom:75%}.e_a_37591358.i_a_37591358 .c_a_37591358:nth-child(2){left:0;right:0;top:25%;bottom:50%}.e_a_37591358.i_a_37591358 .c_a_37591358:nth-child(3){left:0;right:0;top:50%;bottom:25%}.e_a_37591358.i_a_37591358 .c_a_37591358:nth-child(4){left:0;right:0;top:75%;bottom:0}.e_a_37591358.j_a_37591358 .c_a_37591358:first-child{left:0;right:0;top:0;bottom:80%}.e_a_37591358.j_a_37591358 .c_a_37591358:nth-child(2){left:0;right:0;top:20%;bottom:60%}.e_a_37591358.j_a_37591358 .c_a_37591358:nth-child(3){left:0;right:0;top:40%;bottom:40%}.e_a_37591358.j_a_37591358 .c_a_37591358:nth-child(4){left:0;right:0;top:60%;bottom:20%}.e_a_37591358.j_a_37591358 .c_a_37591358:nth-child(5){left:0;right:0;top:80%;bottom:0}.k_a_37591358 .c_a_37591358{position:absolute}.k_a_37591358.f_a_37591358 .c_a_37591358{bottom:0;left:0;right:0;top:0}.k_a_37591358.g_a_37591358 .c_a_37591358:first-child{bottom:0;top:0}[dir=ltr] .k_a_37591358.g_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.g_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.g_a_37591358 .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.g_a_37591358 .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.g_a_37591358 .c_a_37591358:nth-child(2){bottom:0;top:0}[dir=ltr] .k_a_37591358.g_a_37591358 .c_a_37591358:nth-child(2){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.g_a_37591358 .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.g_a_37591358 .c_a_37591358:nth-child(2){right:0}[dir=rtl] .k_a_37591358.g_a_37591358 .c_a_37591358:nth-child(2){left:0}.k_a_37591358.h_a_37591358 .c_a_37591358:first-child{bottom:0;top:0}[dir=ltr] .k_a_37591358.h_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.h_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.h_a_37591358 .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.h_a_37591358 .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(2){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(2){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(2){right:0}[dir=rtl] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(2){left:0}.k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(3){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(3){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(3){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(3){right:0}[dir=rtl] .k_a_37591358.h_a_37591358 .c_a_37591358:nth-child(3){left:0}.k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:first-child{bottom:0;top:0}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(2){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(2){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(2){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(2){left:calc(25% + 1px)}.k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(3){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(3){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(3){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(3){right:0}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(3){left:0}.k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(4){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(4){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(4){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(4){right:0}[dir=rtl] .k_a_37591358.i_a_37591358:not(.l_a_37591358) .c_a_37591358:nth-child(4){left:0}.k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:first-child{bottom:0;top:0}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(2){top:0;bottom:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(2){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(2){right:0}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(2){left:0}.k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(3){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(3){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(3){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(3){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(3){left:calc(25% + 1px)}.k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(4){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(4){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(4){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(4){right:0}[dir=rtl] .k_a_37591358.i_a_37591358.l_a_37591358 .c_a_37591358:nth-child(4){left:0}.k_a_37591358.j_a_37591358 .c_a_37591358:first-child{bottom:0;top:0}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(2){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(2){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(2){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(2){left:calc(25% + 1px)}.k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(3){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(3){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(3){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(3){right:0}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(3){left:0}.k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(4){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(4){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(4){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(4){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(4){left:calc(25% + 1px)}.k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(5){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(5){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(5){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(5){right:0}[dir=rtl] .k_a_37591358.j_a_37591358 .c_a_37591358:nth-child(5){left:0}.k_a_37591358.m_a_37591358 .c_a_37591358:first-child{bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(2){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(2){left:0}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(2){right:0}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(2){left:calc(50% + 1px)}.k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(3){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(3){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(3){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(3){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(3){left:calc(25% + 1px)}.k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(4){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(4){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(4){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(4){right:0}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(4){left:0}.k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(5){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(5){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(5){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(5){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(5){left:calc(25% + 1px)}.k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(6){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(6){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(6){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(6){right:0}[dir=rtl] .k_a_37591358.m_a_37591358 .c_a_37591358:nth-child(6){left:0}.k_a_37591358.n_a_37591358 .c_a_37591358:first-child{bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:first-child{right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:first-child{left:calc(50% + 1px)}.k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(2){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(2){left:0}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(2){right:0}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(2){right:calc(75% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(2){left:calc(75% + 1px)}.k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(3){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(3){left:calc(25% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(3){right:calc(25% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(3){right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(3){left:calc(50% + 1px)}.k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(4){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(4){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(4){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(4){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(4){left:calc(25% + 1px)}.k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(5){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(5){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(5){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(5){right:0}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(5){left:0}.k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(6){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(6){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(6){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(6){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(6){left:calc(25% + 1px)}.k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(7){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(7){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(7){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(7){right:0}[dir=rtl] .k_a_37591358.n_a_37591358 .c_a_37591358:nth-child(7){left:0}.k_a_37591358.o_a_37591358 .c_a_37591358:first-child{bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:first-child{left:0}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:first-child{right:0}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:first-child{right:calc(75% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:first-child{left:calc(75% + 1px)}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(2){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(2){left:25%}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(2){right:25%}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(2){right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(2){left:calc(50% + 1px)}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(3){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(3){left:0}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(3){right:0}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(3){right:calc(75% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(3){left:calc(75% + 1px)}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(4){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(4){left:calc(25% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(4){right:calc(25% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(4){right:calc(50% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(4){left:calc(50% + 1px)}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(5){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(5){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(5){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(5){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(5){left:calc(25% + 1px)}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(6){bottom:calc(50% + 1px);top:0}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(6){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(6){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(6){right:0}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(6){left:0}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(7){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(7){left:calc(50% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(7){right:calc(50% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(7){right:calc(25% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(7){left:calc(25% + 1px)}.k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(8){bottom:0;top:calc(50% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(8){left:calc(75% + 1px)}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(8){right:calc(75% + 1px)}[dir=ltr] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(8){right:0}[dir=rtl] .k_a_37591358.o_a_37591358 .c_a_37591358:nth-child(8){left:0}.c_a_37591358.p_a_37591358:focus:after{border:1px solid "[theme:white, default: #ffffff]";outline-style:solid;outline-width:2px;bottom:2px;content:"";left:2px;pointer-events:none;position:absolute;right:2px;top:2px;z-index:1}', ""])
      },
      PIHo: function(e, t, i) {
        (e.exports = i("q1Tm")(!1)).push([e.i, ".ai_g_9f38462c .slick-slide{width:100%}.ai_g_9f38462c .aj_g_9f38462c{text-decoration:none}.ai_g_9f38462c:focus{outline:0}.ai_g_9f38462c .ak_g_9f38462c{outline:inherit}", ""])
      },
      Pk8u: function(e, t) {
        e.exports = n
      },
      QZHX: function(e, t) {
        e.exports = _
      },
      Ts1k: function(e, t, i) {
        "use strict";
        i.d(t, "b", function() {
          return _
        }), i.d(t, "c", function() {
          return c
        }), i.d(t, "e", function() {
          return s.a
        }), i.d(t, "d", function() {
          return l.a
        }), i.d(t, "a", function() {
          return a
        }), i.d(t, "f", function() {
          return r
        }), i.d(t, "k", function() {
          return f
        }), i.d(t, "g", function() {
          return C
        }), i.d(t, "h", function() {
          return n.a
        }), i.d(t, "i", function() {
          return w
        }), i.d(t, "j", function() {
          return E
        });
        var o = i("vojf"),
          a = 768,
          r = function() {
            function e() {}
            return e.isFeaturedTile = function(e, t) {
              return 0 === t || e === o.b.TwoPieces || e === o.b.ThreePieces || e === o.b.FourPieces && 1 === t
            }, e.isIndexValid = function(e) {
              return void 0 !== e && e >= 0 && e <= 4
            }, e.computeRenderWidthRatio = function(t, i, a, r) {
              switch (t) {
                case o.c.Stack:
                  return .58;
                case o.c.Tile:
                  if (r) {
                    var n = e.calculateTileSizeRatio(r, i, a);
                    if (n) return e.getTileWidthRatio(n)
                  }
                  return 1;
                default:
                  return 1
              }
            }, e.calculateTileSizeRatio = function(e, t, i) {
              var a = i;
              switch (e) {
                case o.b.OnePiece:
                  return "Full";
                case o.b.TwoPieces:
                  return "FourEights";
                case o.b.ThreePieces:
                  return 0 === t ? "FourEights" : 1 === t || 2 === t ? "TwoEights" : void 0;
                case o.b.FourPieces:
                  return 0 === t ? "FourEights" : 1 === t ? a ? "OneEighth" : "TwoEights" : 2 === t ? "OneEighth" : 3 === t ? a ? "TwoEights" : "OneEighth" : void 0;
                case o.b.FivePieces:
                  return 0 === t ? "FourEights" : "OneEighth";
                default:
                  return
              }
            }, e.calculateTileSize = function(e, t, i) {
              switch (this.calculateTileSizeRatio(e, t, i)) {
                case "Full":
                  return "XXL";
                case "SixEights":
                  return "XL";
                case "FourEights":
                  return "L";
                case "TwoEights":
                  return "M";
                case "OneEighth":
                default:
                  return "S"
              }
            }, e.calculateLayerSize = function(e) {
              return e >= 1920 ? "XXXL" : e >= 1600 ? "XXL" : e >= 1366 ? "XL" : e >= 1024 ? "L" : e >= a ? "M" : e >= 656 ? "S" : void 0
            }, e.isStackReversed = function(e) {
              return e % 2 == 1
            }, e.getTileWidthRatio = function(e) {
              switch (e) {
                case "Full":
                  return 1;
                case "SixEights":
                  return .75;
                case "FourEights":
                case "TwoEights":
                  return .5;
                case "OneEighth":
                default:
                  return .25
              }
            }, e
          }(),
          n = i("UcqV"),
          _ = function() {
            function e() {}
            return e.updateCustomMetadata = function(t) {
              t.heroLayoutThreshold = n.a.mobileViewWidth + 1;
              for (var i = t.layout, o = t.layoutCategory, a = t.content, r = t.useLegacyFourTileStyle, _ = n.a.getItemCount(i), c = 0; a && c < a.length; c++) 3 === a[c].imageDisplayOption ? (e._updateImageCustomData(o, i, c, _, r, a[c].image), e._hideCustomImage(a[c].previewImage)) : 1 === a[c].imageDisplayOption ? (e._updateImageCustomData(o, i, c, _, r, a[c].previewImage), e._hideCustomImage(a[c].image)) : (e._hideCustomImage(a[c].previewImage), e._hideCustomImage(a[c].image))
            }, e._updateImageCustomData = function(e, t, i, o, a, _) {
              _ && (_.widthFactor = r.computeRenderWidthRatio(e, i, a, t), i < o ? _.minCanvasWidth = 0 === i ? 1 : n.a.mobileViewWidth + 1 : this._hideCustomImage(_))
            }, e._hideCustomImage = function(e) {
              e && (e.minCanvasWidth = 32767)
            }, e
          }(),
          c = function() {
            function e() {}
            return e.CarouselFailure = "CarouselFailure", e.HeroPatternFailure = "HeroPatternFailure", e.GetPropertyPaneConfiguration = "getPropertyPaneConfiguration", e.DefaultFailureTag = "DefaultFailureTag", e
          }(),
          s = i("6sCH"),
          l = i("30S8"),
          d = i("hiL/"),
          p = i("rMgv"),
          h = ["imageDisplayOption", "callToActionLink", "callToActionText", "layoutCategory", "showTitle", "showCallToAction", "showFeature", "title", "layout"];
  
        function f(e, t) {
          _.updateCustomMetadata(e.webPartProperties),
            function(e) {
              var t = e.path,
                i = e.oldValue,
                o = e.newValue,
                a = e.webPartProperties,
                r = e.activeItemIndex;
              if (i !== o) {
                var _ = u(t, r);
                switch (_) {
                  case "imageDisplayOption":
                    n.a.LogUsageForImageDisplayOptions(a.layoutCategory, a.layout, i, o, "Click");
                    break;
                  case "showCallToAction":
                  case "showTitle":
                  case "showFeature":
                    n.a.LogUsageForOptions(a.layoutCategory, a.layout, _, o.toString(), "Click")
                }
              }
            }(e),
            function(e, t) {
              switch (u(e.path, e.activeItemIndex)) {
                case "imageDisplayOption":
                  ! function(e, t) {
                    var i = e.newValue,
                      o = e.oldValue,
                      a = e.activeItemIndex,
                      r = e.webPartProperties;
                    i === o && 2 !== o || 2 !== i || void 0 === a ? void 0 !== a && (r.content[a].color = 4, t.renderWebPart()) : (r.content[a].color = 5, t.renderWebPart())
                  }(e, t);
                  break;
                case "callToActionText":
                  ! function(e) {
                    var t = e.activeItemIndex,
                      i = e.webPartProperties;
                    void 0 !== t && (i.content[t].upperCaseCallToAction = !1)
                  }(e);
                  break;
                case "layoutCategory":
                  ! function(e, t) {
                    var i = e.newValue,
                      a = e.oldValue,
                      r = e.webPartProperties;
                    i !== a && i === o.c.Stack && (r.content.forEach(function(e) {
                      e && 2 === e.imageDisplayOption && (e.imageDisplayOption = 1)
                    }), t.renderWebPart())
                  }(e, t);
                  break;
                case "title":
                  ! function(e) {
                    var t = e.oldValue,
                      i = e.newValue,
                      o = e.activeItemIndex,
                      a = e.webPartProperties;
                    i !== t && void 0 !== t && 0 === t.toString().length && void 0 !== i && i.toString().length > 0 && void 0 !== o && !1 === a.content[o].showTitle && (a.content[o].showTitle = !0)
                  }(e);
                  break;
                case "layout":
                  ! function(e, t) {
                    var i = e.newValue,
                      a = e.oldValue,
                      r = e.webPartProperties;
                    i !== a && r.layoutCategory === o.c.Tile && (r.useLegacyFourTileStyle = !1, t.renderWebPart())
                  }(e, t);
                  break;
                case "callToActionLink":
                  ! function(e) {
                    var t = e.oldValue,
                      i = e.newValue,
                      o = e.activeItemIndex,
                      a = e.webPartProperties;
                    i !== t && void 0 !== o && (a.content[o].callToActionLink = d.UrlUtility.ensureSchema(a.content[o].callToActionLink || "", p.b))
                  }(e)
              }
            }(e, t)
        }
  
        function u(e, t) {
          var i = h.filter(function(i) {
            return ("layout" === (o = i) || "layoutCategory" === o ? function(e, t) {
              return e === o
            } : function(e, t) {
              return e === "content[" + t + "]." + o
            })(e, t);
            var o
          });
          return i.length ? i[0] : void 0
        }
        var m = i("17wl"),
          g = i("X+PM"),
          b = i("2q6Q"),
          I = i("UWqr"),
          y = i("vlQI"),
          x = i("y88i"),
          v = function() {
            function e(e, t) {
              var i = this;
              this._url = e, t.whenFinished(function() {
                i._httpClient = t.consume(y.SPHttpClient.serviceKey), i._pageContext = t.consume(g.PageContext.serviceKey), i._qosPrefix = "SPEmbeddableService"
              })
            }
            return e.prototype.setQosPrefixStr = function(e) {
              this._qosPrefix = e
            }, e.prototype.getEmbeddableHtmlCode = function(e) {
              var t = new b._QosMonitor(this._qosPrefix + ".GetOEmbedIframeHtml"),
                i = 1e3 * (1 + 4 * Math.random());
              return this._getEmbeddableHtmlCodeImpl(3, i, t, e)
            }, e.prototype._getEmbeddableHtmlCodeImpl = function(e, t, i, o) {
              var a, r, n = this,
                _ = this._pageContext.web.absoluteUrl,
                c = new x.Uri(x.Uri.concatenate(_, "_api/SP.Publishing.EmbedService/EmbedData"));
              c.setQueryParameter("url", x.StringHelper.format("%27{0}%27", x.UriEncoding.encodeRestUriStringToken(this._url))), c.setQueryParameter("version", "1"), (null === (a = o) || void 0 === a ? void 0 : a.isBannerImageUrl) && c.setQueryParameter("bannerImageUrl", "true");
              var s = new Headers;
              return s.append("client-type", this._qosPrefix), this._httpClient.get(c.toString(), y.SPHttpClient.configurations.v1, {
                headers: s
              }).then(function(e) {
                return r = e, n._checkStatus(e)
              }).then(function(e) {
                return e.json()
              }).then(function(e) {
                return i.writeSuccess(), Promise.resolve({
                  Type: e.Type,
                  Html: e.Html,
                  ResponseCode: e.ResponseCode,
                  EmbedServiceResponseCode: e.EmbedServiceResponseCode,
                  ErrorMessage: e.ErrorMessage,
                  EmbedMetadata: {
                    CreatorName: e.CreatorName,
                    DatePublishedAt: e.DatePublishedAt,
                    Description: e.Description,
                    PublisherName: e.PublisherName,
                    Thumbnail: e.ThumbnailUrl,
                    Title: e.Title,
                    VideoId: e.VideoId,
                    SiteId: e.SiteId,
                    WebId: e.WebId,
                    ListId: e.ListId,
                    UniqueId: e.UniqueId,
                    Url: e.Url
                  }
                })
              }).catch(function(o) {
                var a;
                return r && (a = r.correlationId ? r.correlationId.toString() : ""), --e <= 0 ? (r && 403 === r.status ? i.writeExpectedFailure("AuthError", o, {
                  correlationId: a
                }) : i.writeUnexpectedFailure("GetOEmbedIframeHtmlFail", o, {
                  correlationId: a
                }), Promise.resolve({
                  Type: "unknown",
                  Html: "",
                  ResponseCode: 3,
                  ErrorMessage: o.message
                })) : I._SPKillSwitch.isActivated(I.Guid.parse("22f0ca4a-8954-4846-b06f-dda11a5e288a"), "6/6/2019", "Embeddable service retry interval") ? n._getEmbeddableHtmlCodeImpl(e, 2 * t, i) : new Promise(function(e) {
                  return setTimeout(e, t)
                }).then(function() {
                  return n._getEmbeddableHtmlCodeImpl(e, 2 * t, i)
                })
              })
            }, e.prototype._checkStatus = function(e) {
              return e.status >= 200 && e.status < 300 ? Promise.resolve(e) : Promise.reject(new Error(x.StringHelper.format("details: {0} | responseCode: {1}", JSON.stringify(e), e.status)))
            }, e
          }(),
          P = function() {
            function e() {}
            return e.createEmbeddableService = function(e, t, i) {
              var o;
              return o = new v(e, i), t && o.setQosPrefixStr(t), o
            }, e
          }(),
          C = function() {
            function e() {}
            return e.getImageUrlWithThumbnailGenerator = function(e, t, i) {
              var o = n.a.getUrl(e.url),
                a = d.ExtensionHelper.getExtension(e.url),
                r = {
                  absoluteUrl: t,
                  spResource: o,
                  siteId: e.siteId,
                  webId: e.webId,
                  listId: e.listId,
                  uniqueId: e.id,
                  fileType: a,
                  width: i,
                  callerId: "heroRequestImageData"
                };
              return d.ThumbnailUrlGenerator.getThumbnailUrl(r)
            }, e.getImageUrlWithEmbeddableService = function(e, t) {
              return Object(m.__awaiter)(this, void 0, void 0, function() {
                return Object(m.__generator)(this, function(i) {
                  return /^http:\/\/|^https:\/\//i.test(e) ? d.UrlUtility.isInternalResource(e, t.consume(g.PageContext.serviceKey)) ? [2, Promise.resolve("")] : [2, P.createEmbeddableService(e, "HeroWebPart", t).getEmbeddableHtmlCode().then(function(e) {
                    return e.EmbedMetadata && e.EmbedMetadata.Thumbnail ? Promise.resolve(e.EmbedMetadata.Thumbnail) : Promise.resolve("")
                  }).catch(function() {
                    return Promise.resolve("")
                  })] : [2, Promise.resolve("")]
                })
              })
            }, e.prototype.updateImageItem = function(t, i, o, a) {
              return Object(m.__awaiter)(this, void 0, void 0, function() {
                var r;
                return Object(m.__generator)(this, function(n) {
                  switch (n.label) {
                    case 0:
                      return (r = this.getImageUrl(t, i, o)) ? [3, 2] : [4, e.getImageUrlWithEmbeddableService(t.url, a)];
                    case 1:
                      r = n.sent(), n.label = 2;
                    case 2:
                      return t.imageUrl = r, [2]
                  }
                })
              })
            }, e.prototype.getImageUrl = function(t, i, o) {
              if (n.a.shouldUseOriginalUrl(t.url)) return t.url;
              var a = e.getImageUrlWithThumbnailGenerator(t, i, o);
              return a !== n.a.getUrl(t.url) ? a : t.imageUrl ? t.imageUrl : t.url.match(/\.(jpeg|jpg|gif|png)$/) ? t.url : void 0
            }, e
          }(),
          S = i("tGpx");
  
        function w(e) {
          var t = new Map,
            o = d.PreviewUtility.getDefaultImage(new d.SPResourcePath(e.imageData.imageUrl));
          return t.set("fullImage", function() {
            return Promise.resolve(o || e.imageData.imageUrl)
          }), t.set("embeddableService", function() {
            return C.getImageUrlWithEmbeddableService(e.imageData.imageUrl, e.serviceScope)
          }), t.set("stockImage", function() {
            return Promise.resolve(i("layD"))
          }), t
        }
  
        function E(e) {
          var t = Object(S.getDefaultServices)(e);
          return t.set("stockImage", function() {
            return Promise.resolve(i("layD"))
          }), t
        }
      },
      U4ag: function(e, t) {
        e.exports = c
      },
      UWqr: function(e, t) {
        e.exports = s
      },
      UcqV: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return l
        });
        var o = i("8dK2"),
          a = i("y88i"),
          r = i("hiL/"),
          n = i("vojf"),
          _ = i("2q6Q"),
          c = i("U4ag"),
          s = i("30S8"),
          l = function() {
            function e() {}
            return e.getContentType = function(t) {
              var i = e._getExtension(t) || "";
              return "aspx" === i ? "Web Page" : r.spConstants.documentExtensionsSet.has(i) ? "Document" : r.spConstants.imageExtensionsSet.has(i) ? "Image" : "NotSupported"
            }, e.getItemCount = function(e) {
              switch (e) {
                case n.b.OnePiece:
                  return 1;
                case n.b.TwoPieces:
                  return 2;
                case n.b.ThreePieces:
                  return 3;
                case n.b.FourPieces:
                  return 4;
                case n.b.FivePieces:
                  return 5;
                default:
                  return 0
              }
            }, e.getHost = function(e) {
              return new a.Uri(e).getHost()
            }, e.isRelativeUrl = function(t) {
              return !!t && !e.getHost(t)
            }, e.isLinkTypePage = function(t) {
              return "aspx" === e._getExtension(t)
            }, e.getRelativePath = function(e) {
              if (e) return new a.Uri(e).getPath()
            }, e.getRightPartFromPath = function(e) {
              if (e) {
                var t = new a.Uri(e);
                return t.getPath() + (t.getQuery() ? "?" + t.getQuery() : "") + (t.getFragment() ? "#" + t.getFragment() : "")
              }
            }, e.getLink = function(t) {
              if (t) return e.shouldUseOriginalUrl(t) ? t : Object(c.isExternalUrl)(t) ? t : e.getRightPartFromPath(t)
            }, e.shouldUseOriginalUrl = function(t) {
              return Boolean(t && e.startsWith(t.toLowerCase(), "mailto:"))
            }, e.showWarningDialog = function(e, t) {
              var i = {
                title: e,
                contentElement: t
              };
              Object(r.DeferredDialogUtility)().then(function(e) {
                e.showError(i)
              }).catch(function() {
                return Promise.reject()
              })
            }, e.getUrl = function(t) {
              if (t) return e.shouldUseOriginalUrl(t) ? t : -1 !== t.toUpperCase().search("/_LAYOUTS/IMAGES/") ? t : e.getHost(t) ? t : window.location.protocol + "//" + window.location.host + t
            }, e.hasImage = function(t, i) {
              return e._countImageItems(t, !0, i)
            }, e.countImageItems = function(t, i) {
              return e._countImageItems(t, !1, i)
            }, e.InitializePropertiesForStack = function(e) {
              e && e.map(function(e) {
                e && (e.showTitle = !0, e.showDescription = !0, 2 === e.imageDisplayOption && (e.imageDisplayOption = 1))
              })
            }, e.InitializePropertiesForTile = function(e) {
              e && e.map(function(e) {
                e && (e.showDescription = !1)
              })
            }, e.LogUsageForLink = function(t, i, o, a) {
              var r = e._getCommonTag(t, i);
              r = (r = r + "." + o) + "." + a, _._EngagementLogger.logEvent(r)
            }, e.LogUsageForImage = function(t, i, o, a) {
              var r = e._getCommonTag(t, i);
              r = (r += o ? ".CustomImage" : ".AutoSelectedImage") + "." + a, _._EngagementLogger.logEvent(r)
            }, e.LogUsageForCallToAction = function(t, i, o) {
              var a = e._getCommonTag(t, i);
              a = (a += ".CallToAction") + "." + o, _._EngagementLogger.logEvent(a)
            }, e.LogUsageForOptions = function(t, i, o, a, r) {
              var n = e._getCommonTag(t, i);
              n = (n = (n = n + "." + o) + "." + a) + "." + r, _._EngagementLogger.logEvent(n)
            }, e.LogUsageForImageDisplayOptions = function(t, i, o, a, r) {
              var n = e._getCommonTag(t, i);
              n = (n = (n = n + ".From." + e._getImageDisplayOptionTag(o)) + ".To." + e._getImageDisplayOptionTag(a)) + "." + r, _._EngagementLogger.logEvent(n)
            }, e.getWebPartHeight = function(t, i, o, a) {
              return i || o === n.c.Tile ? e._getTileWebPartHeight(t) : e._getStackWebPartHeight(a, t)
            }, e.getWebViewPath = function(e, t) {
              if (e) return "Document" !== t || Object(c.isExternalUrl)(e) ? e : r.SPUtility.getWebPathOfFile(e)
            }, e.getTargetSetting = function(e) {
              return Object(c.getUrlTarget)(e)
            }, e.startsWith = function(e, t) {
              return e.substring(0, t.length) === t
            }, e.isExternalResource = function(e) {
              return o._ThumbnailUrlGenerator.getThumbnailProvider(e) === o._ThumbnailProviderType.External
            }, e.getFolderRelativePath = function(e) {
              var t = new r.SPResourcePath(e).segments;
              return t.pop(), t.join("/")
            }, e.getDurationAsStringFromSeconds = function(t) {
              if (void 0 === t || t < 0) return "";
              var i = Math.floor(t / 3600),
                o = Math.floor((t - 3600 * i) / 60),
                a = Math.floor(t - 3600 * i - 60 * o),
                r = i.toString(),
                n = o.toString(),
                _ = a.toString();
              return n = i > 0 ? e._padDurationWithZero(o, n) : n, _ = e._padDurationWithZero(a, _), 0 === i ? n + ":" + _ : r + ":" + n + ":" + _
            }, e._padDurationWithZero = function(e, t) {
              return e < 10 ? "0" + t : t
            }, e._getTileWebPartHeight = function(e) {
              return e > 1920 ? 800 : e > 1600 ? 600 : e > 1366 ? 490 : e > 1024 ? 450 : e > 600 ? 400 : 404
            }, e._getStackWebPartHeight = function(e, t) {
              var i = 400;
              switch (t > 1600 && (i = 500), t > 1920 && (i = 600), e) {
                case n.b.OnePiece:
                  return i;
                case n.b.TwoPieces:
                  return 2 * i;
                case n.b.ThreePieces:
                  return 3 * i;
                case n.b.FourPieces:
                  return 4 * i;
                case n.b.FivePieces:
                  return 5 * i;
                default:
                  return 0
              }
            }, e._getImageDisplayOptionTag = function(e) {
              switch (e) {
                case 1:
                  return "AutoSelected";
                case 3:
                  return "Custom";
                case 2:
                  return "ColorOnly";
                case 0:
                  return "None"
              }
              return "None"
            }, e._getCommonTag = function(e, t) {
              var i = e === n.c.Stack ? "SPPages.HeroLayout.Stack" : "SPPages.HeroLayout.Tile";
              switch (t) {
                case n.b.OnePiece:
                  i += "OnePiece";
                  break;
                case n.b.TwoPieces:
                  i += "TwoPieces";
                  break;
                case n.b.ThreePieces:
                  i += "ThreePieces";
                  break;
                case n.b.FourPieces:
                  i += "FourPieces";
                  break;
                case n.b.FivePieces:
                  i += "FivePieces"
              }
              return i
            }, e._countImageItems = function(t, i, o) {
              if (!t || 0 === t.length) return _._EngagementLogger.log({
                name: "Hero.ItemMissing",
                extraData: {
                  layout: o,
                  itemsCount: 0
                }
              }), 0;
              for (var a = 0, r = 0; r < e.getItemCount(o); r++) {
                var n = t[r];
                if (n ? (3 === n.imageDisplayOption && n.image || 1 === n.imageDisplayOption && n.previewImage) && a++ : _._EngagementLogger.log({
                    name: "Hero.ItemMissing",
                    extraData: {
                      layout: o,
                      itemsCount: t.length,
                      itemIndex: r
                    }
                  }), i && a > 0) return !0
              }
              return a
            }, e._getExtension = function(e) {
              return r.ExtensionHelper.getExtension(e)
            }, e.heroLoggingPathLink = "HeroPathLink", e.mobileViewWidth = 639, e.imageWidthInPropertyPane = 140, e.imageHeightInPropertyPane = 120, e.titleMaxLength = s.a.isFluentBasicEnabled() ? 110 : 80, e.callToActionMaxLength = 40, e.featureTextMaxLength = 40, e.descriptionMaxLength = 500, e.RENDERLISTDATAASSTREAM_DURATION_TO_SECONDS_TIME_FACTOR = 1e7, e
          }()
      },
      "X+PM": function(e, t) {
        e.exports = l
      },
      br4S: function(e, t) {
        e.exports = d
      },
      bu4K: function(e, t, i) {
        "use strict";
        i.r(t);
        var o = i("17wl"),
          a = i("cDcd"),
          r = i("faye"),
          n = i("7Awa"),
          _ = i("UWqr"),
          c = i("ut3N"),
          s = i("vlQI"),
          l = i("8dK2"),
          d = i("br4S"),
          p = i("y88i"),
          h = i("hiL/"),
          f = i("QZHX"),
          u = i("vojf"),
          m = i("2q6Q"),
          g = i("U4ag"),
          b = i("9sBx"),
          I = i("lxgo"),
          y = i("KL1q"),
          x = function() {
            function e() {}
            return e.GetOnePlaceholderContent = function(t, i) {
              void 0 === i && (i = !1);
              var o = i ? e.GetDefaultImage(t) : void 0,
                a = i,
                r = i ? 3 : 0;
              return {
                id: _.Guid.newGuid().toString(),
                type: "Image",
                color: 4,
                image: o,
                link: void 0,
                description: "",
                title: "",
                showDescription: !1,
                showTitle: !0,
                alternateText: "",
                imageDisplayOption: r,
                isDefaultImage: a,
                showCallToAction: !1,
                callToActionText: void 0,
                callToActionLink: void 0,
                isDefaultImageLoaded: !1,
                isCustomImageLoaded: !1,
                featureText: void 0,
                showFeatureText: !1
              }
            }, e.GetPlaceholderContent = function() {
              for (var t = [], i = 0; i < 5; i++) t.push(e.GetOnePlaceholderContent(i));
              return t
            }, e.isItemPlaceholder = function(e) {
              return !e.link
            }, e.GetDefaultImage = function(e) {
              return {
                url: h.PreviewUtility.getDefaultImageById(e),
                id: _.Guid.newGuid().toString(),
                webId: _.Guid.newGuid().toString(),
                siteId: _.Guid.newGuid().toString()
              }
            }, e
          }(),
          v = i("Ts1k"),
          P = i("8959"),
          C = i("6sCH"),
          S = i("Pk8u"),
          w = i("X+PM"),
          E = a.lazy(function() {
            return i.e(13).then(i.bind(null, "xXRA")).then(function(e) {
              return {
                default: e.HeroPlaceholder
              }
            })
          }),
          L = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              return a.createElement(a.Suspense, {
                fallback: !1
              }, a.createElement(E, Object(o.__assign)({}, this.props)))
            }, t
          }(a.Component),
          T = i("CDLH"),
          k = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.render = function() {
              var e = Object(y.css)(T.a.callToAction, this.props.upperCase && T.a.upperCase, v.d.isFluentBasicEnabled() && T.a.fluent, this.props.callToActionClassName),
                t = Object(y.getRTL)() ? "Back" : "Forward";
              if (this.props.href) {
                var i = this.props.href ? v.h.getTargetSetting(this.props.href) : v.h.getTargetSetting(this.props.itemHref);
                return a.createElement("a", {
                  href: this.props.href || this.props.itemHref,
                  target: i,
                  className: e,
                  "data-automation-id": "HeroCallToAction"
                }, this.props.text, " ", a.createElement(y.Icon, {
                  iconName: t,
                  className: T.a.callToAction_icon
                }))
              }
              return a.createElement("span", {
                className: e,
                "data-automation-id": "HeroCallToAction"
              }, this.props.text, " ", a.createElement(y.Icon, {
                iconName: t,
                className: T.a.callToAction_icon
              }))
            }, t
          }(a.PureComponent),
          j = i("2kWm"),
          A = i("tGpx"),
          O = a.forwardRef(function(e, t) {
            var i = Object(o.__rest)(e, []),
              r = {
                imageUrl: e.imageProperties.url,
                siteId: e.imageProperties.siteId,
                webId: e.imageProperties.webId,
                listId: e.imageProperties.listId
              },
              n = !v.h.isExternalResource(e.imageProperties.url),
              _ = {
                imageData: r,
                serviceScope: e.serviceScope,
                callerId: e.callerId,
                thumbnailWidth: e.thumbnailWidth,
                onImageLoadFailure: e.onImageLoadFailure,
                onImageLoad: e.onImageLoad
              },
              c = 0 !== m._SPPerfExperiment.getVariantAndTrackExperiment(m._PerformanceExperiment.WEXImagePreAllocate, !0) ? A.ImageWithPreAllocate : y.Image;
            return a.createElement("div", {
              ref: t,
              style: {
                position: "absolute",
                height: "100%",
                width: "100%"
              }
            }, a.createElement(c, Object(o.__assign)({
              styles: function() {
                return {
                  root: {
                    height: "100%",
                    width: "100%"
                  }
                }
              }
            }, i, Object(A.useFallback)({
              services: Object(C.c)() ? n ? Object(v.j)(_) : Object(v.i)(_) : void 0,
              getServices: function() {
                return n ? Object(v.j)(_) : Object(v.i)(_)
              },
              callerId: e.callerId,
              imageData: r,
              thumbnailWidth: e.thumbnailWidth,
              onImageLoad: e.onImageLoad,
              onImageLoadFailure: e.onImageLoadFailure
            }))))
          }),
          D = function(e) {
            function t(t) {
              var i = e.call(this, t) || this;
              return i._imageWrapperRef = a.createRef(), i._imageContainerRef = a.createRef(), i._handleImageLoad = function() {
                i.props.onImageLoad(), i._updateImageStyle()
              }, i._handleFocalPointMove = function(e) {
                i.setState({
                  focalPosition: e
                })
              }, i._handleImageLoadFailure = function(e, t) {
                "stockImage" === e && i.props.onImageLoadError(t)
              }, i.state = {
                focalPosition: i.props.focalPosition,
                isPortrait: void 0
              }, i
            }
            return Object(o.__extends)(t, e), t.prototype.UNSAFE_componentWillReceiveProps = function(e) {
              this.props.imageSrc !== e.imageSrc || this.props.image.url !== e.image.url ? this.setState({
                focalPosition: this.props.focalPosition,
                isPortrait: void 0
              }) : this.props.webPartWidth !== e.webPartWidth && this._updateImageStyle()
            }, t.prototype.componentDidUpdate = function(e) {
              var t = this;
              !e.shouldRenderFocalPoint && this.props.shouldRenderFocalPoint && j.b.load().then(function(e) {
                e.focus(t._imageWrapperRef.current)
              }).catch(function(e) {
                c._TraceLogger.logError(c._LogSource.create("HeroWebPart"), e, "LoadFocalPointChunk")
              })
            }, t.prototype.render = function() {
              var e = this,
                t = {
                  position: this.state.focalPosition,
                  onFocalPointMove: this._handleFocalPointMove,
                  onFocalPointEnd: function(t) {
                    return e.props.onFocalPointMoveEnd(e.state.focalPosition, t)
                  }
                },
                i = this.props.shouldRenderFocalPoint && a.createElement(j.a, {
                  deferredProps: t
                }),
                o = this.state.focalPosition ? this.state.focalPosition.x : 50,
                r = this.state.focalPosition ? this.state.focalPosition.y : 50,
                n = 100 * this.props.zoomRatio + "%",
                _ = {
                  left: o + "%",
                  top: r + "%",
                  transform: "translate(-" + o + "%, -" + r + "%)",
                  position: "absolute",
                  width: this.state.isPortrait ? n : void 0,
                  height: this.state.isPortrait ? void 0 : n
                },
                c = a.createElement(O, {
                  callerId: "HeroWebPart",
                  style: _,
                  "data-automation-id": "HeroImage",
                  imageProperties: this.props.image,
                  serviceScope: this.props.serviceScope,
                  thumbnailWidth: this.props.itemWidth,
                  onImageLoad: this._handleImageLoad,
                  onImageLoadFailure: this._handleImageLoadFailure,
                  ref: this._imageContainerRef,
                  alt: v.e.isFixHeroAltKillSwitchActivated() ? void 0 : this.props.altText
                }),
                s = this.props.videoDuration ? a.createElement("div", {
                  className: Object(y.css)(T.a.heroDuration)
                }, this.props.videoDuration) : void 0,
                l = this.props.layout === u.c.Stack;
              return a.createElement(a.Fragment, null, a.createElement("div", {
                className: Object(y.css)(this.props.className, T.a.heroImageHost, Object(P.a)() && l && T.a.heroStackLayoutWithDuration),
                ref: this._imageWrapperRef
              }, a.createElement("div", {
                className: T.a.parallaxHost
              }, c, i), Object(P.a)() && l && s), Object(P.a)() && !l && s)
            }, t.prototype._updateImageStyle = function() {
              var e = this;
              window.requestAnimationFrame(function() {
                return e._updateImageStyleImmediately()
              })
            }, t.prototype._updateImageStyleImmediately = function() {
              if (this._imageContainerRef.current && this._imageWrapperRef.current) {
                var e = this._imageContainerRef.current.getElementsByTagName("img");
                if (e.length > 0) {
                  var t = e[0],
                    i = t.naturalWidth / t.naturalHeight,
                    o = this._imageWrapperRef.current.clientWidth / this._imageWrapperRef.current.clientHeight;
                  this.setState({
                    isPortrait: i < o
                  })
                }
              }
            }, t
          }(a.PureComponent),
          F = i("LQOY");
        i("H3rQ");
        var R = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._focalPointButton = a.createRef(), t._renderSingleToolbarButton = function(e) {
                return a.createElement(h.ToolbarButton, Object(o.__assign)({
                  key: e.automationId
                }, e))
              }, t
            }
            return Object(o.__extends)(t, e), t.prototype.componentDidUpdate = function(e) {
              e.isSettingFocalPoint && !this.props.isSettingFocalPoint && this._focalPointButton.current && this._focalPointButton.current.focus()
            }, t.prototype.render = function() {
              return a.createElement("div", {
                className: this._getContainerClassNames()
              }, this._getToolbarButtonPropsList().map(this._renderSingleToolbarButton))
            }, t.prototype._getContainerClassNames = function() {
              return Object(y.css)("fk_k_9f38462c", !this.props.hidden && "fl_k_9f38462c")
            }, t.prototype._getToolbarButtonPropsList = function() {
              var e = this,
                t = {
                  buttonProps: {
                    role: "menuitem"
                  }
                };
              return [{
                onClick: this.props.onEditClick,
                onFocus: this.props.onEditOrMoveIconFocus,
                automationId: "edit-button",
                title: F.t,
                fabricIconKey: "Edit"
              }, {
                onFocus: this.props.onEditOrMoveIconFocus,
                title: F.L,
                automationId: "move-button",
                fabricIconKey: "Move"
              }, {
                title: F.y,
                automationId: "focal-point-button",
                onClick: this.props.handleSetFocalPoint,
                fabricIconKey: "FocalPoint",
                shouldHide: !this.props.handleSetFocalPoint,
                ref: this._focalPointButton
              }, {
                title: F.sb,
                automationId: "zoom-in-button",
                onClick: function() {
                  return e.props.handleZoom && e.props.handleZoom(1.1)
                },
                fabricIconKey: "ZoomIn",
                shouldHide: !this.props.handleZoom
              }, {
                title: F.tb,
                automationId: "zoom-out-button",
                onClick: function() {
                  return e.props.handleZoom && e.props.handleZoom(.9)
                },
                fabricIconKey: "ZoomOut",
                shouldHide: !this.props.handleZoom
              }].filter(function(e) {
                return !e.shouldHide
              }).map(function(e) {
                return Object(o.__assign)(Object(o.__assign)({}, t), e)
              })
            }, t
          }(a.Component),
          q = i("30S8"),
          M = function(e) {
            var t = e.variantTheme,
              i = e.layers,
              o = e.imageLoaded,
              a = e.colorOnly,
              r = q.a.isFluentBasicEnabled();
            if (t) {
              var n = Object(y.getTheme)(),
                _ = !n.isInverted && t.isInverted || n.isInverted && !t.isInverted,
                c = _ ? n.semanticColors.primaryButtonBackgroundHovered : n.semanticColors.primaryButtonBackground,
                s = _ ? n.semanticColors.primaryButtonTextHovered : n.semanticColors.primaryButtonText,
                l = i || !(o || a),
                d = l ? {
                  color: r ? t.semanticColors.link + " !important" : t.semanticColors.bodyText + " !important"
                } : void 0,
                p = l ? {
                  color: t.semanticColors.bodyText + " !important"
                } : void 0;
              return {
                callToAction: d,
                description: i ? {
                  color: t.semanticColors.bodyText
                } : void 0,
                featureText: i ? {
                  backgroundColor: t.semanticColors.accentButtonBackground,
                  color: t.semanticColors.accentButtonText
                } : void 0,
                title: p,
                themeColor: [{
                  backgroundColor: c,
                  color: s
                }]
              }
            }
            return {
              callToAction: void 0,
              description: void 0,
              featureText: void 0,
              title: void 0,
              themeColor: void 0
            }
          },
          U = function(e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return Object(o.__extends)(t, e), t.prototype.getStyles = function(e) {
              return M(e)
            }, t
          }(g.BaseEmphasisComponentStyles),
          N = 1568,
          z = 500,
          W = Object(y.classNamesFunction)(),
          H = function(e) {
            function t(i) {
              var r = e.call(this, i) || this;
              return r._webAbsoluteUrl = void 0, r._errorLoadingOriginal = !1, r._HeroItemStyles = new U, r._onUploadStart = function() {
                r.setState({
                  isUploadInProgress: !0
                })
              }, r._onUploadComplete = function(e) {
                r._updateItemState(e).catch(function(e) {
                  c._TraceLogger.logError(c._LogSource.create("HeroWebPart"), e, "UpdateItemAndState")
                })
              }, r._onUploadError = function(e) {
                c._TraceLogger.logError(t._logSource, e), r.setState({
                  isUploadInProgress: !1
                })
              }, r._onRecentFileSelectedStart = function() {
                r.setState({
                  isUploadInProgress: !0
                })
              }, r._onRecentFileSelectedComplete = function(e) {
                r._updateItemState(e).then(function() {
                  e && r.forceUpdate()
                }).catch(function(e) {
                  c._TraceLogger.logError(c._LogSource.create("HeroWebPart"), e, "UpdateItemAndState")
                })
              }, r._getPlaceHolder = function() {
                var e = {
                  onRecentFileSelectedStart: r._onRecentFileSelectedStart,
                  onRecentFileSelectedComplete: r._onRecentFileSelectedComplete,
                  onUploadFileStart: r._onUploadStart,
                  onUploadFileComplete: r._onUploadComplete,
                  onUploadFileError: r._onUploadError,
                  serviceScope: r.props.serviceScope
                };
                return a.createElement(L, {
                  index: r.props.index,
                  isActive: r.props.isActive,
                  layoutCategory: r.props.layoutCategory,
                  emphasisTheme: r.props.emphasisTheme,
                  filePickerProps: e,
                  onUploadStart: r._onUploadStart
                })
              }, r._getItemControl = function() {
                var e, t, i, o, a, n, _, c, s, l, d, p, h, f, m, g, b, I, P, C, S, w, E, L, k, j, A = r.props.item;
                if (!A) return null;
                var O = r._classNames ? r._classNames.themeColor : "",
                  D = r.props.webPartWidth,
                  F = v.f.calculateLayerSize(D),
                  R = v.f.calculateTileSize(r.props.layout, r.props.index, r.props.useLegacyFourTileMode),
                  q = r.props.layoutCategory === u.c.Stack ? F : R,
                  M = Object(y.css)(T.a.heroItemElement, T.a.indicatorOnlyOnFocus, r._isImageLoaded(A) || 2 === A.imageDisplayOption ? "" : T.a.heroItemElement__textDark, ((e = {})[T.a.heroItemElement__colorOnly] = 2 === A.imageDisplayOption, e), ((t = {})[O] = 2 === A.imageDisplayOption, t), ((i = {})[T.a.heroItemElement__viewable] = !r.props.edit && !x.isItemPlaceholder(r.props.item), i), ((o = {})[T.a.heroItemElement__textDark] = r.isStack && !r.props.isInCarousel, o), ((a = {})[T.a.heroItemElement__active] = r.props.isActive, a), ((n = {})[T.a.heroItemElement__featured] = r.props.isFeatured, n), ((_ = {})[T.a.heroItemElement__inCarousel] = r.props.isInCarousel, _), ((c = {})[T.a.heroItemElement__layers] = r.isStack && !r.props.isInCarousel, c), ((s = {}).layers = r.isStack && !r.props.isInCarousel, s), ((l = {})[T.a.heroItemElement__tiles] = !r.isStack && !r.props.isInCarousel, l), ((d = {})[T.a.heroItemElement__reversed] = r.isStack && v.f.isStackReversed(r.props.index), d), ((p = {})[T.a.heroItemElement__tiledLg] = D >= N, p), ((h = {})[T.a.heroItemElement__Sm] = "S" === F, h), ((f = {})[T.a.heroItemElement__Md] = "M" === F, f), ((m = {})[T.a.heroItemElement__Lg] = "L" === F, m), ((g = {})[T.a.heroItemElement__Xl] = "XL" === F, g), ((b = {})[T.a.heroItemElement__XXl] = "XXL" === F, b), ((I = {})[T.a.heroItemElement__XXXl] = "XXXL" === F, I), ((P = {})[T.a.fluent] = v.d.isFluentBasicEnabled(), P), ((C = {})[T.a.itemSizeS] = "S" === q, C), ((S = {})[T.a.itemSizeM] = "M" === q, S), ((w = {})[T.a.itemSizeL] = "L" === q, w), ((E = {})[T.a.itemSizeXL] = "XL" === q, E), ((L = {})[T.a.itemSizeXXL] = "XXL" === q || "XXXL" === q, L), ((k = {})[T.a.heroItemElement__layersCarouselTemp] = r.isStack && r.props.isInCarousel, k), ((j = {})[T.a.heroItemElement__focalPoint] = r.state.isSettingFocalPoint, j));
                return r._getItemImageAndTextControl(A, M)
              }, r._getItemImageAndTextControl = function(e, t) {
                var i = r.isStack || !r.state.isSettingFocalPoint;
                return Object(C.d)() || (i = i || 2 === e.imageDisplayOption), a.createElement(y.FocusZone, Object(o.__assign)({
                  className: t,
                  direction: y.FocusZoneDirection.vertical
                }, r.props.edit && {
                  onClick: r._showActionBar
                }), r.state.isUploadInProgress && r._getUploadingSpinner(), r._getImageControl(e), i && r._getItemContentControl(e), r._getActionBarControl())
              }, r._getItemContentControl = function(e) {
                if (e && (e.showTitle || e.showCallToAction)) {
                  var i = r._classNames ? r._classNames.featureText : "",
                    o = r.isStack && e.showFeatureText && e.featureText && a.createElement("span", {
                      className: Object(y.css)(T.a.featureText, i)
                    }, e.featureText),
                    n = Object(y.css)(r._classNames ? r._classNames.description : "", T.a.description, v.d.isFluentBasicEnabled() && T.a.fluent, "CSS" === t._truncateType && r._getCssTruncateClassName("Description")),
                    _ = r.isStack && e.description && a.createElement("span", {
                      title: e.description,
                      ref: r._resolveRef("_descriptionTextElement"),
                      className: n
                    }, e.description),
                    c = Object(y.css)(T.a.callToActionContent, !r.props.edit && T.a.callToActionContentInViewMode, v.d.isFluentBasicEnabled() && T.a.fluent, v.d.isFluentBasicEnabled() && r._shouldShowCallToAction(e) && T.a.DisplayedCallToActionContent),
                    s = Object(y.css)(T.a.content, r._shouldShowCallToAction(e) && T.a.contentAboveCallToAction, v.d.isFluentBasicEnabled() && T.a.fluent),
                    l = a.createElement("div", {
                      className: s
                    }, o, r._getTitleElement(e), _),
                    d = a.createElement("div", {
                      className: c
                    }, r._getCallToActionControl(e)),
                    p = Object(y.css)(T.a.itemContainer, !v.e.isFixIOSDescriptionInvisibleKillSwitchActivated() && T.a.fixDescriptionOnIOS);
                  return v.d.isFluentBasicEnabled() ? a.createElement("div", {
                    className: p
                  }, a.createElement("div", {
                    className: T.a.textContainer
                  }, l, d)) : a.createElement("div", {
                    className: p
                  }, l, d)
                }
              }, r._getCallToActionControl = function(e) {
                if (r._shouldShowCallToAction(e)) {
                  var t = Object(y.css)(r._classNames && r._classNames.callToAction);
                  return a.createElement(k, {
                    text: e.callToActionText,
                    href: e.callToActionLink,
                    itemHref: e.link,
                    upperCase: Boolean(e.upperCaseCallToAction),
                    callToActionClassName: t
                  })
                }
              }, r._getTitleElement = function(e) {
                var i = Object(y.css)(T.a.title, r._classNames && r._classNames.title, v.d.isFluentBasicEnabled() && T.a.fluent, !v.e.isHeroWordNotSplitKillSwitchActivated() && T.a.notSplit),
                  o = Object(y.css)("CSS" === t._truncateType && r._getCssTruncateClassName("Title"));
                return e.title && e.showTitle ? a.createElement("div", {
                  className: i
                }, a.createElement("div", {
                  ref: r._resolveRef("_titleTextElement"),
                  "data-automation-id": "HeroTitle",
                  className: o
                }, e.title)) : void 0
              }, r._getImageControl = function(e) {
                var t = "";
                r.props.layoutCategory !== u.c.Tile || r.props.edit || (t = Object(y.css)(T.a.heroItemElement__viewableImageWithAnimation, r.imageTileHoverStyle));
                var i = function(e) {
                    var t, i;
                    if (Object(P.a)() && (null === (t = e) || void 0 === t ? void 0 : t.duration) && (null === (i = e) || void 0 === i ? void 0 : i.duration) >= 0) return v.h.getDurationAsStringFromSeconds(Math.floor(e.duration / v.h.RENDERLISTDATAASSTREAM_DURATION_TO_SECONDS_TIME_FACTOR))
                  }(e.videoMetadata),
                  o = e.alternateText || e.title;
                if (1 === e.imageDisplayOption && e.previewImage && !r.state.isUploadInProgress) {
                  var n = r._getImageUrl(e.previewImage, !1, e.type, !1, !0);
                  return a.createElement(D, {
                    altText: o || "",
                    imageSrc: n,
                    focalPosition: e.previewImage.focalPosition,
                    webAbsoluteUrl: r._webAbsoluteUrl,
                    webPartWidth: r.props.webPartWidth,
                    className: t,
                    onImageLoad: r._onDefaultImageLoad,
                    onImageLoadError: r._onDefaultImageErrorLoad,
                    shouldRenderFocalPoint: r.state.isSettingFocalPoint,
                    onFocalPointMoveEnd: r._handleFocalPointMoveEnd,
                    zoomRatio: e.previewImage.zoomRatio || 1,
                    serviceScope: r.props.serviceScope,
                    itemWidth: r._widthForSingleItem,
                    image: e.previewImage,
                    layout: r.props.layoutCategory,
                    videoDuration: i
                  })
                }
                if (3 === e.imageDisplayOption && e.image && !r.state.isUploadInProgress) {
                  var _ = r._getImageUrl(e.image, Boolean(e.isDefaultImage), e.type, !0, !1);
                  return a.createElement(D, {
                    altText: o || "",
                    imageSrc: _,
                    focalPosition: e.image.focalPosition,
                    webAbsoluteUrl: r._webAbsoluteUrl,
                    webPartWidth: r.props.webPartWidth,
                    className: t,
                    onImageLoad: r._onCustomImageLoad,
                    onImageLoadError: r._onCustomImageErrorLoad,
                    shouldRenderFocalPoint: r.state.isSettingFocalPoint,
                    onFocalPointMoveEnd: r._handleFocalPointMoveEnd,
                    zoomRatio: e.image.zoomRatio || 1,
                    serviceScope: r.props.serviceScope,
                    itemWidth: r._widthForSingleItem,
                    image: e.image,
                    layout: r.props.layoutCategory,
                    videoDuration: i
                  })
                }
                if (2 === e.imageDisplayOption) return a.createElement("div", {
                  className: T.a.themeColor,
                  style: r._getColorOption()
                })
              }, r._getActionBarControl = function() {
                return r.props.edit && r._renderToolbar()
              }, r._handleZoom = function(e) {
                if (r.props.onSetImageProps && void 0 !== r._imageItem) {
                  var t = (r._imageItem.zoomRatio || 1) * e;
                  r.props.onSetImageProps(Object(o.__assign)(Object(o.__assign)({}, r._imageItem), {
                    zoomRatio: t
                  })), r._alertZoomRatio(t)
                }
              }, r._alertZoomRatio = function(e) {
                h.ScreenReaderAlert.read(_.Text.format(F.ub, e.toFixed(2)), h.ReadingMode.ReadImmediately)
              }, r._onDefaultImageLoad = function() {
                r.props.onLoad && r.props.onLoad(r.props.index, !1)
              }, r._onDefaultImageErrorLoad = function(e) {
                var t = r.props.item;
                r.state.errorLoadingPreview ? "Image" !== t.type || r._errorLoadingOriginal || (r._errorLoadingOriginal = !0, r.props.onLoadError && r.props.onLoadError(r.props.index, !1)) : "Image" === t.type ? r.setState({
                  errorLoadingPreview: !0
                }) : r.props.onLoadError && r.props.onLoadError(r.props.index, !1)
              }, r._onCustomImageLoad = function() {
                r.props.onLoad && r.props.onLoad(r.props.index, !0)
              }, r._onCustomImageErrorLoad = function(e) {
                r.state.errorLoadingPreview ? r._errorLoadingOriginal || (r._errorLoadingOriginal = !0, r.props.onLoadError && r.props.onLoadError(r.props.index, !0)) : r.setState({
                  errorLoadingPreview: !0
                })
              }, r._onEditClick = function() {
                r.props.onEdit && r.props.onEdit(r.props.index)
              }, r._handleSetFocalPoint = function() {
                r.setState({
                  isSettingFocalPoint: !0
                }), r.props.onSetFocalPointStart && r.props.onSetFocalPointStart()
              }, r._handleFocalPointMoveEnd = function(e, t) {
                m._EngagementLogger.logEvent("HeroFocalPoint.MoveEnd", t), r.setState({
                  isSettingFocalPoint: !1
                });
                var i = r._imageItem;
                r.props.onSetImageProps && void 0 !== i && r.props.onSetImageProps(Object(o.__assign)(Object(o.__assign)({}, i), {
                  focalPosition: e
                }))
              }, r._truncateText = function() {
                r._titleTextElement && "JS" === t._truncateType && Object(g.clampElement)(r._titleTextElement, r._getTitleMaxLineCount(), r.props.item.title || ""), r._descriptionTextElement && "JS" === t._truncateType && Object(g.clampElement)(r._descriptionTextElement, r._getDescriptionMaxLineCount(), r.props.item.description || "")
              }, r._getImageUrl = function(e, t, i, o, a) {
                if (!r._webAbsoluteUrl || !(!t || t && e.url && -1 !== e.url.toUpperCase().search("/_LAYOUTS/IMAGES/"))) return e.url;
                if (r.state.errorLoadingPreview) {
                  if (!o && "Image" === i || o) return e.url
                } else {
                  var n = (new v.g).getImageUrl(e, r._webAbsoluteUrl, r._widthForSingleItem);
                  if (n) return n;
                  v.g.getImageUrlWithEmbeddableService(e.url, r.props.serviceScope).then(function(t) {
                    e.imageUrl !== t && (e.imageUrl = t, r._updateImageOfItem(e, a))
                  }).catch(function(e) {
                    c._TraceLogger.logError(c._LogSource.create("HeroWebPart"), e, "GetImageUrlWithEmbeddableService")
                  })
                }
              }, r._getColorOption = function() {
                switch (r.props.item.color) {
                  case 5:
                    return;
                  case 0:
                    return {
                      backgroundColor: "#72729d"
                    };
                  case 1:
                    return {
                      backgroundColor: "#4179b4"
                    };
                  case 2:
                    return {
                      backgroundColor: "#9b7c98"
                    };
                  case 3:
                    return {
                      backgroundColor: "#cbaeb2"
                    };
                  case 4:
                    return {
                      backgroundColor: "#ffffff"
                    }
                }
              }, r._updateItemState = function(e) {
                return (new v.g).updateImageItem(e, r._webAbsoluteUrl, r._widthForSingleItem, r.props.serviceScope).then(function() {
                  r.props.onAdd && r.props.onAdd(r.props.item.id, e), r.setState({
                    isUploadInProgress: !1
                  })
                })
              }, r._onEditOrMoveIconFocus = function() {
                r.props.onEditIconFocus && r.props.onEditIconFocus(r.props.index)
              }, r._showActionBar = function() {
                r.setState({
                  showActionBar: !0
                })
              }, r._hideActionBar = function() {
                r.setState({
                  showActionBar: !1
                })
              }, r._alertZoomRatio = Object(S.debounce)(r._alertZoomRatio, z), i.serviceScope.whenFinished(function() {
                var e = i.serviceScope.consume(w.PageContext.serviceKey);
                e && e.web && (r._webAbsoluteUrl = e.web.absoluteUrl)
              }), r.state = {
                isUploadInProgress: !1,
                isSettingFocalPoint: !1,
                errorLoadingPreview: !1
              }, r
            }
            return Object(o.__extends)(t, e), Object.defineProperty(t.prototype, "_classNames", {
              get: function() {
                return v.d.isDeprecateEmphasisClassFlightEnabled() ? Boolean(this.props.emphasisTheme) && W(M, {
                  layers: this.isStack && !this.props.isInCarousel,
                  variantTheme: this.props.emphasisTheme,
                  imageLoaded: this._isImageLoaded(this.props.item),
                  colorOnly: 2 === this.props.item.imageDisplayOption
                }) : Boolean(this.props.emphasisTheme) && this._HeroItemStyles.getClassNames({
                  layers: this.isStack && !this.props.isInCarousel,
                  variantTheme: this.props.emphasisTheme,
                  imageLoaded: this._isImageLoaded(this.props.item),
                  colorOnly: 2 === this.props.item.imageDisplayOption
                }, !1)
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.componentDidMount = function() {
              this._truncateText()
            }, t.prototype.UNSAFE_componentWillReceiveProps = function(e) {
              this.setState({
                isUploadInProgress: !1,
                errorLoadingPreview: !1
              }), this._errorLoadingOriginal = !1
            }, t.prototype.componentDidUpdate = function(e) {
              var t = this.props.webPartWidth !== e.webPartWidth,
                i = this.props.edit && (this.props.item.description !== e.item.description || this.props.item.title !== e.item.title);
              (t || i) && this._truncateText(), this.props.edit && (this.props.isActive && !e.isActive ? this._showActionBar() : !this.props.isActive && e.isActive && this._hideActionBar())
            }, t.prototype.shouldComponentUpdate = function(e, t) {
              return !Object(S.isEqual)(this.state, t) || !Object(S.isEqual)(this.props, e) || e.isForceUpdate
            }, t.prototype.render = function() {
              return v.d.isDeprecateEmphasisClassFlightEnabled() || this._updateClassNames(), this.props.edit && !this.state.isUploadInProgress && this.props.item && x.isItemPlaceholder(this.props.item) ? this._getPlaceHolder() : this._getItemControl()
            }, t.prototype._updateClassNames = function() {
              Boolean(this.props.emphasisTheme) && this._HeroItemStyles.getClassNames({
                layers: this.isStack && !this.props.isInCarousel,
                variantTheme: this.props.emphasisTheme,
                imageLoaded: this._isImageLoaded(this.props.item),
                colorOnly: 2 === this.props.item.imageDisplayOption
              }, !0)
            }, Object.defineProperty(t.prototype, "isStack", {
              get: function() {
                return this.props.layoutCategory === u.c.Stack
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._shouldShowCallToAction = function(e) {
              return Boolean((this.isStack || this.props.isFeatured) && e.showCallToAction && e.callToActionText)
            }, Object.defineProperty(t.prototype, "imageTileHoverStyle", {
              get: function() {
                var e = void 0,
                  t = this.props,
                  i = t.layout,
                  o = t.index,
                  a = t.useLegacyFourTileMode;
                if (i) switch (v.f.calculateTileSizeRatio(i, o, a)) {
                  case "Full":
                    e = T.a.heroItemElement__viewableImageWithAnimationLargeTile;
                    break;
                  case "SixEights":
                  case "FourEights":
                  case "TwoEights":
                    e = T.a.heroItemElement__viewableImageWithAnimationMediumTile;
                    break;
                  case "OneEighth":
                    e = T.a.heroItemElement__viewableImageWithAnimationSmallTile;
                    break;
                  default:
                    e = void 0
                }
                return e
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._isDefaultImageLoaded = function(e) {
              return Boolean(e.previewImage && e.isDefaultImageLoaded)
            }, t.prototype._isCustomImageLoaded = function(e) {
              return Boolean(e.image && e.isCustomImageLoaded)
            }, t.prototype._isImageLoaded = function(e) {
              return this._isDefaultImageLoaded(e) || this._isCustomImageLoaded(e)
            }, t.prototype._shouldShowFocalAndZoomButton = function() {
              return 1 === this.props.item.imageDisplayOption || 3 === this.props.item.imageDisplayOption
            }, t.prototype._renderToolbar = function() {
              var e = this._shouldShowFocalAndZoomButton();
              return a.createElement(R, {
                onEditClick: this._onEditClick,
                onEditOrMoveIconFocus: this._onEditOrMoveIconFocus,
                handleSetFocalPoint: e ? this._handleSetFocalPoint : void 0,
                handleZoom: e ? this._handleZoom : void 0,
                hidden: !this.state.showActionBar,
                isSettingFocalPoint: this.state.isSettingFocalPoint
              })
            }, t.prototype._getUploadingSpinner = function() {
              return a.createElement(y.Spinner, {
                type: y.SpinnerType.large,
                label: F.pb,
                className: T.a.uploadingSpinner
              })
            }, t.prototype._updateImageOfItem = function(e, t) {
              this.props.onUpdateImage && this.props.onUpdateImage(this.props.item.id, e, t ? 1 : 0)
            }, Object.defineProperty(t.prototype, "_widthForSingleItem", {
              get: function() {
                if (this.props.isInCarousel) return Math.min(this.props.webPartWidth, v.h.mobileViewWidth);
                var e = v.f.computeRenderWidthRatio(this.props.layoutCategory, this.props.index, this.props.useLegacyFourTileMode, this.props.layout);
                return Math.floor(this.props.webPartWidth * e)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_imageItem", {
              get: function() {
                return 1 === this.props.item.imageDisplayOption ? this.props.item.previewImage : 3 === this.props.item.imageDisplayOption ? this.props.item.image : void 0
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._getCssTruncateClassName = function(e) {
              var t = "Title" === e ? this._getTitleMaxLineCount() : this._getDescriptionMaxLineCount();
              return Object(y.css)(2 === t && T.a.truncate2, 3 === t && T.a.truncate3, 4 === t && T.a.truncate4)
            }, t.prototype._getTitleMaxLineCount = function() {
              return v.d.isFluentBasicEnabled() ? this.props.isInCarousel ? 2 : 3 : this.isStack && this.props.webPartWidth > v.h.mobileViewWidth && this.props.webPartWidth < v.a ? 3 : 2
            }, t.prototype._getDescriptionMaxLineCount = function() {
              return this.isStack && this.props.webPartWidth > v.a ? 4 : 3
            }, t._logSource = c._LogSource.create("HeroItemElement"), t._truncateType = _._BrowserDetection.getBrowserInformation().browser !== _._Browser.IE ? "CSS" : "JS", t
          }(y.BaseComponent);
        i("s4oQ");
        var G = function(e) {
            function t(t) {
              var i = e.call(this, t) || this;
              return i._containerDivRef = a.createRef(), i._itemsCompleted = 0, i.setWebPartWidth = function(e) {
                i.setState({
                  webPartWidth: e
                })
              }, i._onRenderCarouselItem = function(e, t, r) {
                var n = i._populateDisplayItems(),
                  _ = v.h.getWebPartHeight(i.state.webPartWidth, !0, i.props.webPartProps.layoutCategory, i.props.webPartProps.layout),
                  c = n[t].item,
                  s = v.h.getWebViewPath(c.link, c.type),
                  l = !i.props.edit,
                  d = a.createElement(H, Object(o.__assign)({}, n[t], {
                    index: t,
                    hasMoveIcon: !1,
                    isActive: !1,
                    webPartWidth: i.state.webPartWidth,
                    isFeatured: i._isFeatured(t),
                    isInCarousel: !0,
                    onEditIconFocus: i._onFocusItem,
                    layoutCategory: i.props.webPartProps.layoutCategory,
                    isForceUpdate: i.props.isForceUpdate,
                    onSetImageProps: function(e) {
                      return i._handleSetImageProps(t, e)
                    },
                    emphasisTheme: i.props.emphasisTheme,
                    useLegacyFourTileMode: i._shouldUseLegacyFourTileMode
                  }));
                return l ? a.createElement("div", {
                  style: {
                    height: _ - 54
                  },
                  role: "button",
                  onClick: function(e) {
                    return i._onClickCarouselItem(e, s)
                  }
                }, d) : a.createElement("div", {
                  style: {
                    height: _ - 54
                  }
                }, d)
              }, i._onClickCarouselItem = function(e, t) {
                "A" !== e.target.tagName.toUpperCase() && i.props.onClick && i.props.onClick(t, v.h.getTargetSetting(t))
              }, i._onLoad = function(e, t) {
                i._checkRenderCompleted(), i.props.onLoad && i.props.onLoad(e, t)
              }, i._onLoadError = function(e, t) {
                i._checkRenderCompleted(), i.props.onLoadError && i.props.onLoadError(e, t)
              }, i._checkRenderCompleted = function() {
                i._itemsCompleted++, (i.props.isCarousel && 1 === i._itemsCompleted || i._imageItems === i._itemsCompleted) && (i.props.renderCompleted(), i._itemsCompleted = 0)
              }, i._onEditItem = function(e) {
                i.props.onEditItem && i.props.onEditItem(e)
              }, i._isActive = function(e) {
                return i._activeItemIndex === e
              }, i._onRenderHeroItem = function(e) {
                var t = i._itemsToDisplay[e],
                  r = i.props.edit && !i.props.isCarousel && !i.state.isSettingFocalPoint,
                  n = i._isActive(e);
                return a.createElement(H, Object(o.__assign)({}, t, {
                  index: e,
                  hasMoveIcon: r,
                  isFeatured: i._isFeatured(e),
                  isInCarousel: i.props.isCarousel,
                  isActive: n,
                  webPartWidth: i.state.webPartWidth,
                  layout: i.props.webPartProps.layout,
                  layoutCategory: i.props.webPartProps.layoutCategory,
                  isForceUpdate: i.props.isForceUpdate,
                  onSetFocalPointStart: i._handleSetFocalPointStart,
                  onSetImageProps: function(t) {
                    return i._handleSetImageProps(e, t)
                  },
                  emphasisTheme: i.props.emphasisTheme,
                  useLegacyFourTileMode: i._shouldUseLegacyFourTileMode
                }))
              }, i._getHeroItemLink = function(e) {
                var t = i._itemsToDisplay[e],
                  o = v.h.getWebViewPath(t.item.link, t.item.type);
                return {
                  href: o,
                  target: v.h.getTargetSetting(o)
                }
              }, i._getHeroItemAriaLabel = function(e) {
                var t, o = i._itemsToDisplay[e].item,
                  a = o.title || o.alternateText;
                if (Object(P.a)() && (null === (t = o.videoMetadata) || void 0 === t ? void 0 : t.duration)) {
                  var r = v.h.getDurationAsStringFromSeconds(o.videoMetadata.duration / v.h.RENDERLISTDATAASSTREAM_DURATION_TO_SECONDS_TIME_FACTOR);
                  r && (a = a + " " + h.SPUtility.getNarratorFriendlyDurationText(r))
                }
                var n = i._couldNavigateInsideItemInReadMode(e) ? p.StringHelper.format(F.c, a, F.F, F.D) : p.StringHelper.format(F.b, a, F.D),
                  _ = p.StringHelper.format(F.a, a, F.F, F.G);
                return i.props.edit ? _ : n
              }, i._handleSetFocalPointStart = function() {
                i.setState({
                  isSettingFocalPoint: !0
                })
              }, i._handleSetImageProps = function(e, t) {
                i.setState({
                  isSettingFocalPoint: !1
                }), i.props.onActivateItem(e), i.props.onSetImageProps(e, t)
              }, i._populateDisplayItems = function() {
                var e = [];
                return i.props.webPartProps.content.map(function(t) {
                  e.push({
                    item: Object(o.__assign)({}, t),
                    edit: i.props.edit,
                    serviceScope: i.props.serviceScope,
                    onLoad: i._onLoad,
                    onEdit: i._onEditItem,
                    onAdd: i.props.onAddItem,
                    onAddLegacy: i.props.onAddItemLegacy,
                    onLoadError: i._onLoadError,
                    onUpdateImage: i.props.onAfterImagePropertyChanged
                  })
                }), e
              }, i._isFeatured = function(e) {
                return i.props.webPartProps.layoutCategory === u.c.Tile && v.f.isFeaturedTile(i.props.webPartProps.layout, e)
              }, i._onReorder = function(e, t) {
                i.props.webPartProps && i.props.webPartProps.content && i.props.webPartProps.content[t] && i.props.onReorder && i.props.onReorder(e, t)
              }, i._onFocusItem = function(e) {
                i.props.onActivateItem(e)
              }, i._onClickItem = function(e, t) {
                var o, a;
                if ("A" !== t.target.tagName.toUpperCase()) {
                  var r = i._itemsToDisplay[e],
                    n = v.h.getWebViewPath(r.item.link, r.item.type),
                    _ = v.h.getTargetSetting(n);
                  if (!v.e.isHeroClickTelemetryKillSwitchActivated()) {
                    var s = new h.SPResourcePath(r.item.link),
                      d = h.ExtensionHelper.getExtension(s),
                      p = void 0 !== d && l._PreviewUtility.isVideo(d),
                      f = [];
                    (null === (a = null === (o = r.item) || void 0 === o ? void 0 : o.videoMetadata) || void 0 === a ? void 0 : a.duration) && f.push("duration"), m._EngagementLogger.logEventWithLogEntry(new c._LogEntry("HeroWebpartClick", "Properties", c._LogType.Event, {
                      isVideo: p.toString(),
                      videoProperties: f.join(",")
                    }))
                  }
                  i.props.onClick && i.props.onClick(n, _)
                }
              }, i.state = {
                isSettingFocalPoint: !1,
                activeItemIndex: i.props.activeItemIndex,
                webPartWidth: i.props.webPartWidth
              }, i._imageItems = v.h.countImageItems(i.props.webPartProps && i.props.webPartProps.content, i.props.webPartProps.layout), i._isParallaxActive = !1, i
            }
            return Object(o.__extends)(t, e), t.prototype.componentDidMount = function() {
              this._shouldParallax && !this.props.edit && this._initializeParallax()
            }, t.prototype.UNSAFE_componentWillReceiveProps = function(e) {
              this.setState({
                activeItemIndex: e.activeItemIndex
              })
            }, t.prototype.UNSAFE_componentWillUpdate = function(e, t) {
              this._shouldParallax && e.edit !== this.props.edit && e.edit && this._disposeParallax()
            }, t.prototype.render = function() {
              if (this._shouldHideContent()) return !1;
              var e = v.h.getWebPartHeight(this.state.webPartWidth, this.props.isCarousel, this.props.webPartProps.layoutCategory, this.props.webPartProps.layout),
                t = this.props.isCarousel ? Object(y.mergeStyles)(["ai_g_9f38462c", "ak_g_9f38462c"]) : "ai_g_9f38462c";
              return a.createElement("div", {
                className: t,
                style: {
                  height: e
                },
                ref: this._containerDivRef
              }, this._getHeroControl())
            }, t.prototype.componentDidUpdate = function(e, t) {
              this._shouldParallax && e.edit !== this.props.edit && !this.props.edit && this._initializeParallax()
            }, t.prototype.componentWillUnmount = function() {
              this._shouldParallax && !this.props.edit && this._disposeParallax()
            }, Object.defineProperty(t.prototype, "_shouldParallax", {
              get: function() {
                return !!this._containerDivRef.current && this.props.isFullWidth
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._initializeParallax = function() {
              var e = this;
              this._imageContainers.forEach(function(t) {
                t.parentElement && (t.parentElement.style.overflow = "hidden", e._isParallaxActive = g.Parallax.instance.tryAddParallax(t))
              })
            }, t.prototype._disposeParallax = function() {
              this._isParallaxActive && (this._imageContainers.forEach(function(e) {
                g.Parallax.instance.removeParallax(e)
              }), this._isParallaxActive = !1)
            }, Object.defineProperty(t.prototype, "_imageContainers", {
              get: function() {
                if (this._containerDivRef.current) {
                  for (var e = this._containerDivRef.current.getElementsByTagName("img"), t = new Array(e.length), i = 0; i < e.length; i++) t[i] = e[i].parentElement, t[i].style.height = "100%";
                  return t
                }
                return []
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._getHeroControl = function() {
              return this._itemsToDisplay = this._populateDisplayItems(), this.props.isCarousel ? this._getCarouselControl() : this._getHeroPatternControl()
            }, t.prototype._getHeroPatternControl = function() {
              return a.createElement(u.a, {
                layoutCategory: this.props.webPartProps.layoutCategory,
                layout: this.props.webPartProps.layout,
                editMode: this.props.edit,
                canReorder: this.props.edit && !this.state.isSettingFocalPoint,
                onReorder: this._onReorder,
                onRenderHeroItem: this._onRenderHeroItem,
                activeItemIndex: this._activeItemIndex,
                onFocusItem: this._onFocusItem,
                getLink: this._getHeroItemLink,
                getAriaLabel: this._getHeroItemAriaLabel,
                onClickHeroItem: this._onClickItem,
                useLegacyFourTileMode: this._shouldUseLegacyFourTileMode,
                heroPatternAriaLabel: Object(C.b)() ? void 0 : F.B
              })
            }, t.prototype._getCarouselControl = function() {
              if (this.props.carouselComponentClass) {
                for (var e = [], i = 0; i < v.h.getItemCount(this.props.webPartProps.layout); i++) e.push({
                  id: this._itemsToDisplay[i].item.id,
                  edit: this._itemsToDisplay[i].edit
                });
                var o = p.StringHelper.format(F.l, F.E, F.F),
                  r = p.StringHelper.format(F.m, F.E, F.D),
                  n = {
                    items: e,
                    settings: t.carouselSetting,
                    edit: this.props.edit,
                    width: this.state.webPartWidth,
                    onRenderItem: this._onRenderCarouselItem,
                    strings: {
                      containerAriaLabelEditMode: o,
                      containerAriaLabelReadMode: r
                    },
                    theme: this.props.emphasisTheme
                  };
                return a.createElement(this.props.carouselComponentClass, n)
              }
            }, Object.defineProperty(t.prototype, "_activeItemIndex", {
              get: function() {
                return this.props.activeItemIndex
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "_shouldUseLegacyFourTileMode", {
              get: function() {
                return this.props.webPartProps.useLegacyFourTileStyle
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._shouldHideContent = function() {
              var e = this.props.webPartProps.content,
                t = v.h.getItemCount(this.props.webPartProps.layout),
                i = e.slice(0, t).every(x.isItemPlaceholder);
              return !this.props.edit && i
            }, t.prototype._couldNavigateInsideItemInReadMode = function(e) {
              var t = this._itemsToDisplay[e];
              return Boolean(t.item.showCallToAction && t.item.callToActionLink)
            }, t.carouselSetting = {
              autoplay: !1,
              dots: !1
            }, t
          }(a.Component),
          Z = function() {
            function e() {}
            return Object.defineProperty(e, "currentVersion", {
              get: function() {
                return _.Version.parse("1.5")
              },
              enumerable: !0,
              configurable: !0
            }), e.migrate = function(e, t, i) {
              return i && !i.lessThan(_.Version.parse("1.3")) || (v.b.updateCustomMetadata(e), e.carouselLayoutMaxWidth = v.h.mobileViewWidth, e.heroLayoutComponentId = "9586b262-54de-4b27-9eb9-34c671400c33", e.carouselLayoutComponentId = "8ac0c53c-e8d0-4e3e-87d0-7449eb0d4027"), !t || i && !i.lessThan(_.Version.parse("1.4")) || e.content && e.content.forEach(function(e) {
                return e.upperCaseCallToAction = !0
              }), !t || i && !i.lessThan(_.Version.parse("1.5")) || (e.useLegacyFourTileStyle = !0), e
            }, e
          }(),
          B = function() {},
          K = function(e) {
            function t() {
              var t = null !== e && e.apply(this, arguments) || this;
              return t._activeItemIndex = void 0, t._isCarousel = !1, t._isForceUpdate = !1, t._updateActiveIndex = function(e) {
                t._activeItemIndex = e
              }, t._onLoad = function(e, i) {
                t._onLoadOrError(e, i, !1)
              }, t._onLoadError = function(e, i) {
                t._onLoadOrError(e, i, !0)
              }, t._onLoadOrError = function(e, i, o) {
                var a = Boolean(t.properties.content[e].isCustomImageLoaded),
                  r = Boolean(t.properties.content[e].isDefaultImageLoaded);
                t.properties.content[e].isCustomImageLoaded = i && !o, t.properties.content[e].isDefaultImageLoaded = !i && !o, a === t.properties.content[e].isCustomImageLoaded && r === t.properties.content[e].isDefaultImageLoaded || t.render(), void 0 !== t._activeItemIndex && t._activeItemIndex === e && 1 === t.properties.content[e].imageDisplayOption && t._editMode && t._editMode.updatePropertyPane(e)
              }, t._handleHeroItemClick = function(e, i) {
                if (e) {
                  var o = document.createElement("a");
                  o.setAttribute("href", e), o.setAttribute("target", i), t.domElement.appendChild(o), o.click(), t.domElement.removeChild(o)
                }
              }, t._handleThemeChangedEvent = function(e) {
                t._emphasisTheme = e.theme, t.render()
              }, t
            }
            return Object(o.__extends)(t, e), Object.defineProperty(t.prototype, "previewImageUrl", {
              get: function() {
                var e = void 0;
                if (this.properties.content)
                  for (var t = 0; t < this.properties.content.length && !(e = this.properties.content[t].image || this.properties.content[t].previewImage); t++);
                return e ? e.url && e.url.toUpperCase().lastIndexOf("/_LAYOUTS/IMAGES/") > -1 ? void 0 : Object(g.webPartPreviewThumbnail)({
                  pageContext: this.context.pageContext,
                  url: e.url,
                  siteId: e.siteId,
                  webId: e.webId,
                  listId: e.listId,
                  uniqueId: e.id
                }) : void 0
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "dataVersion", {
              get: function() {
                return Z.currentVersion
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.render = function() {
              var e = this,
                i = this.displayMode === _.DisplayMode.Edit;
              if (!i || this._editMode) {
                this._setForceUpdate();
                var o = new c._QosMonitor("RenderHeroWebPart"),
                  n = this.context.webPartTag,
                  s = {
                    webPartProps: this.properties,
                    edit: i,
                    serviceScope: this.context.serviceScope,
                    renderCompleted: this.renderCompleted,
                    onEditItem: i ? this._editMode.onEditItem : B,
                    onReorder: i ? this._editMode.onReorder : B,
                    onActivateItem: i ? this._editMode.onActivateItem : B,
                    onAddItem: i ? this._editMode.onAddItem : B,
                    onSetImageProps: i ? this._editMode.handleSetImageProps : B,
                    webPartWidth: this.width,
                    activeItemIndex: this._activeItemIndex,
                    isCarousel: this.isCarousel,
                    onLoad: this._onLoad,
                    onLoadError: this._onLoadError,
                    isForceUpdate: this._isForceUpdate,
                    isFullWidth: this.properties.isFullWidth,
                    onAfterImagePropertyChanged: i ? this._editMode.onAfterImagePropertyChanged : B,
                    onClick: this._handleHeroItemClick,
                    emphasisTheme: this._emphasisTheme
                  };
                this.isCarousel ? (m._PerformanceLogger.saveTempData(n + ".loadLayoutStart", m._PerformanceLogger.now()), I.a.loadCarousel().then(function(t) {
                  m._PerformanceLogger.saveTempData(n + ".loadLayoutEnd", m._PerformanceLogger.now()), s.carouselComponentClass = t, e._component = r.render(a.createElement(G, s), e.domElement), o.writeSuccess(), m._PerformanceLogger.saveTempData(n + ".syncLayoutRenderComplete", m._PerformanceLogger.now())
                }).catch(function(i) {
                  c._TraceLogger.logError(t._logSource, i), o.writeUnexpectedFailure(e.isCarousel ? v.c.CarouselFailure : v.c.HeroPatternFailure, i, {
                    stack: i.stack
                  })
                })) : this._component = r.render(a.createElement(G, s), this.domElement)
              }
            }, t.prototype.onAfterDeserialize = function(e, t) {
              return e = this._tryPatchMissingHeroItems(e), Z.migrate(e, this.renderedFromPersistedData, t)
            }, Object.defineProperty(t.prototype, "isRenderAsync", {
              get: function() {
                return this.properties && this.properties.content && v.h.hasImage(this.properties.content, this.properties.layout)
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.onInit = function() {
              var t = this;
              return this._initializeData(), this._getEmphasisTheme(), m._PerformanceLogger.markComponent(this.context.webPartTag, m._PerformanceDataDimensions.Layout + (this.isCarousel ? "Carousel" : "Hero")), this.isCarousel && I.a.loadModule().catch(function(e) {
                c._TraceLogger.logError(c._LogSource.create("HeroWebPart"), e, "LoadCarouseLayout")
              }), this._pageDataSource = new f.PageDataSource({
                spHttpClient: this.context.serviceScope.consume(s.SPHttpClient.serviceKey)
              }), this.displayMode === _.DisplayMode.Edit ? this._loadEditMode().then(function() {
                return e.prototype.onInit.call(t)
              }) : (Object(b.a)(this.context, this.displayMode), e.prototype.onInit.call(this))
            }, t.prototype.loadPropertyPaneResources = function() {
              return this._loadEditMode()
            }, t.prototype.getPropertyPaneConfiguration = function() {
              var e = new c._QosMonitor("getPropertyPaneConfiguration");
              try {
                if (this.context.propertyPane.isRenderedByWebPart()) {
                  var i = this._editModeModule.HeroPropertyPaneSettings.getItemEditingSettings(this.properties, this._activeItemIndex, this.context.serviceScope, this._editMode.onAfterImagePropertyChanged, this._editMode.onAfterLinkPropertyChanged, this.isCarousel);
                  return e.writeSuccess(), i
                }
                if (!this.context.propertyPane.isPropertyPaneOpen()) {
                  var o = this._activeItemIndex;
                  this._activeItemIndex = void 0, o !== this._activeItemIndex && this.render()
                }
                var a = this._editModeModule.HeroPropertyPaneSettings.getDefaultWebPartSettings(this.properties, this._isCarousel);
                return e.writeSuccess(), a
              } catch (i) {
                throw e.writeUnexpectedFailure(v.c.DefaultFailureTag, i), c._TraceLogger.logError(t._logSource, i), i
              }
            }, t.prototype.onAfterResize = function(e) {
              this._component && this._component.setWebPartWidth(e);
              var t = this.isCarousel;
              this.isCarousel = this.isMobileView, t !== this.isCarousel && (this.displayMode === _.DisplayMode.Edit && this._editMode && (this.isCarousel ? this._editMode.updatePropertyPane(0) : this._editMode.updatePropertyPane(this._activeItemIndex)), this.render()), this._setForceUpdate()
            }, t.prototype.onPropertyPaneFieldChanged = function(t, i, o) {
              Object(v.k)({
                path: t,
                oldValue: i,
                newValue: o,
                webPartProperties: this.properties,
                activeItemIndex: this._activeItemIndex
              }, {
                renderWebPart: this.render.bind(this)
              }), e.prototype.onPropertyPaneFieldChanged.call(this, t, i, o)
            }, t.prototype.onDispose = function() {
              r.unmountComponentAtNode(this.domElement), this._component = void 0, this.context.serviceScope.consume(n.ThemeProvider.serviceKey).themeChangedEvent.remove(this, this._handleThemeChangedEvent), e.prototype.onDispose.call(this)
            }, t.prototype.onDisplayModeChanged = function(t) {
              this.displayMode === _.DisplayMode.Edit && this._loadEditMode(), e.prototype.onDisplayModeChanged.call(this, t)
            }, Object.defineProperty(t.prototype, "propertiesMetadata", {
              get: function() {
                var e = {
                  "content[*].link": {
                    isLink: !0
                  },
                  "content[*].title": {
                    isSearchablePlainText: !0
                  },
                  "content[*].alternateText": {
                    isSearchablePlainText: !0
                  },
                  "content[*].callToActionText": {
                    isSearchablePlainText: !0
                  },
                  "content[*].callToActionLink": {
                    isLink: !0
                  },
                  "content[*].image.url": {
                    isImageSource: !0
                  },
                  "content[*].previewImage.url": {
                    isImageSource: !0
                  }
                };
                return e["content[*].image.url"].customMetadata = this._getImageCustomMetadata("content[*].image"), e["content[*].previewImage.url"].customMetadata = this._getImageCustomMetadata("content[*].previewImage"), e.heroLayoutComponentId = {
                  isComponentDependency: !0,
                  customMetadata: {
                    minCanvasWidth: "heroLayoutThreshold"
                  }
                }, e.carouselLayoutComponentId = {
                  isComponentDependency: !0,
                  customMetadata: {
                    maxCanvasWidth: "carouselLayoutMaxWidth"
                  }
                }, e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "accessibleTitle", {
              get: function() {
                var e = this.properties.layoutCategory === u.c.Tile ? F.h : F.g;
                return p.StringHelper.format(this.isCarousel ? F.f : e, F.qb, p.StringHelper.formatWithLocalizedCountValue(F.e, F.d, v.h.getItemCount(this.properties.layout)))
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype.renderCompleted = function() {
              var t;
              if (!v.e.isHeroVideoUsageTelemetryKillSwitchActivated()) {
                var i = 0,
                  o = 0,
                  a = this.properties.layout;
                if (this.displayMode === _.DisplayMode.Read && (null === (t = this.properties) || void 0 === t ? void 0 : t.content)) {
                  this.properties.content.forEach(function(e, t) {
                    if (t < a) {
                      var r = new h.SPResourcePath(e.link),
                        n = h.ExtensionHelper.getExtension(r);
                      void 0 !== n && l._PreviewUtility.isVideo(n) && i++, e.videoMetadata && o++
                    }
                  });
                  var r = i / a * 100,
                    n = o / a * 100,
                    s = new c._LogEntry("HeroWebPart", "VideoUsage", c._LogType.Event, {
                      videoPercent: Math.round(r).toString(),
                      videoWithMetadataPercent: Math.round(n).toString()
                    });
                  c._EngagementLogger.logEventWithLogEntry(s)
                }
              }
              e.prototype.renderCompleted.call(this)
            }, t.prototype._loadEditMode = function() {
              var e = this;
              return this._editModePromise || (this._editModePromise = i.e(13).then(i.bind(null, "UAXk")).then(function(t) {
                e._editModeModule = t, e._editMode = new t.HeroEditMode(function() {
                  return e.properties
                }, function() {
                  return e.context
                }, function() {
                  return e.render.bind(e)
                }, function() {
                  return e._updateActiveIndex
                }, function() {
                  return e._pageDataSource
                }), e.render()
              }).catch(function(e) {
                c._TraceLogger.logError(t._logSource, new Error("Failed to import edit mode module"))
              }))
            }, t.prototype._getImageCustomMetadata = function(e) {
              return {
                siteId: e + ".siteId",
                webId: e + ".webId",
                listId: e + ".listId",
                uniqueId: e + ".id",
                renderWidthRatio: e + ".widthFactor",
                renderWidthRatioThreshold: "heroLayoutThreshold",
                minCanvasWidth: e + ".minCanvasWidth"
              }
            }, t.prototype._initializeData = function() {
              if (this.isCarousel = this.isMobileView, this.properties && (this.properties.heroLayoutThreshold = v.h.mobileViewWidth + 1, this.properties.carouselLayoutMaxWidth = v.h.mobileViewWidth, this.properties.heroLayoutComponentId = "9586b262-54de-4b27-9eb9-34c671400c33", this.properties.carouselLayoutComponentId = "8ac0c53c-e8d0-4e3e-87d0-7449eb0d4027"), this.properties && this.properties.content) return this.properties.layoutCategory ? this.properties.layoutCategory === u.c.Stack && v.h.InitializePropertiesForStack(this.properties.content) : this.properties.layoutCategory = u.c.Tile, this.properties.layoutCategory === u.c.Tile && v.h.InitializePropertiesForTile(this.properties.content), void(this._activeItemIndex = void 0);
              this.properties.layoutCategory = u.c.Tile, this.properties.layout = u.b.FivePieces, this.properties.content = x.GetPlaceholderContent(), this._activeItemIndex = void 0
            }, Object.defineProperty(t.prototype, "isMobileView", {
              get: function() {
                return this.width <= v.h.mobileViewWidth
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(t.prototype, "isCarousel", {
              get: function() {
                return this._isCarousel
              },
              set: function(e) {
                this._isCarousel = e
              },
              enumerable: !0,
              configurable: !0
            }), t.prototype._setForceUpdate = function() {
              this.context.propertyPane.isPropertyPaneOpen() ? this._isForceUpdate = !0 : this._isForceUpdate = !1
            }, t.prototype._tryPatchMissingHeroItems = function(e) {
              if (e.content)
                if (e.content instanceof Array)
                  for (var t = 0; t < 5; t++) t >= e.content.length ? (c._EngagementLogger.log({
                    name: "Hero.PatchMissingItem",
                    extraData: {
                      itemCount: e.content.length,
                      missingItemIndex: t,
                      displayMode: this.displayMode
                    }
                  }), e.content.push(x.GetOnePlaceholderContent(t))) : e.content[t] || (c._EngagementLogger.log({
                    name: "Hero.PatchNullItem",
                    extraData: {
                      nullItemIndex: t,
                      displayMode: this.displayMode
                    }
                  }), e.content[t] = x.GetOnePlaceholderContent(t));
                else c._EngagementLogger.log({
                  name: "Hero.PatchContent",
                  extraData: {
                    displayMode: this.displayMode
                  }
                }), e.content = x.GetPlaceholderContent();
              return e
            }, t.prototype._getEmphasisTheme = function() {
              var e = this;
              this.context.serviceScope.whenFinished(function() {
                var t = e.context.serviceScope.consume(n.ThemeProvider.serviceKey);
                e._emphasisTheme = t.tryGetTheme(), t.themeChangedEvent.add(e, e._handleThemeChangedEvent)
              })
            }, t._logSource = c._LogSource.create("HeroWebPart"), t
          }(d.BaseClientSideWebPart);
        t.default = K
      },
      cDcd: function(e, t) {
        e.exports = p
      },
      "e2z/": function(e, t, i) {
        (e.exports = i("q1Tm")(!1)).push([e.i, '.am_i_9f38462c{height:100%}.an_i_9f38462c{box-sizing:border-box;height:100%;overflow:hidden}.an_i_9f38462c,.an_i_9f38462c:hover{position:relative}.an_i_9f38462c:hover:after{border:1px solid "[theme:white, default: #ffffff]";outline-color:"[theme:neutralTertiary, default: #a19f9d]";outline-style:solid;outline-width:2px;bottom:2px;content:"";left:2px;pointer-events:none;position:absolute;right:2px;top:2px;z-index:1}.ao_i_9f38462c{height:58px;margin-top:-29px;position:absolute;top:50%;width:100%}.ap_i_9f38462c{width:100%;height:100%}.aq_i_9f38462c:focus.ar_i_9f38462c,.aq_i_9f38462c:not(.ar_i_9f38462c),:focus .aq_i_9f38462c.ar_i_9f38462c{position:relative}.aq_i_9f38462c:focus.ar_i_9f38462c:after,.aq_i_9f38462c:not(.ar_i_9f38462c):after,:focus .aq_i_9f38462c.ar_i_9f38462c:after{border:1px solid "[theme:white, default: #ffffff]";outline-color:"[theme:themePrimary, default: #0078d4]";outline-style:solid;outline-width:2px;bottom:2px;content:"";left:2px;pointer-events:none;position:absolute;right:2px;top:2px;z-index:1}.as_i_9f38462c{-ms-flex-align:start;align-items:flex-start;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:end;justify-content:flex-end;position:absolute;top:0;right:0;bottom:0;left:0}.as_i_9f38462c:after{display:block;content:""}.as_i_9f38462c:not(.at_i_9f38462c){background-color:transparent;background-image:linear-gradient(180deg,transparent 15%,rgba(0,0,0,.7));padding:28px 28px 0}.as_i_9f38462c.at_i_9f38462c{padding:32px;position:relative}.au_i_9f38462c .as_i_9f38462c{pointer-events:none}.as_i_9f38462c:not(.at_i_9f38462c):after{height:28px}.as_i_9f38462c.at_i_9f38462c:after{height:0}.av_i_9f38462c:after{display:block;height:55px;content:""}.av_i_9f38462c:not(.at_i_9f38462c):after{height:55px}.av_i_9f38462c.at_i_9f38462c:after{height:0}.o_i_9f38462c{width:100%;word-break:break-word}.o_i_9f38462c:not(.at_i_9f38462c){font-size:24px;font-weight:300}.o_i_9f38462c:not(.at_i_9f38462c) .aw_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;box-sizing:content-box;max-height:2.7em;overflow:hidden}.o_i_9f38462c:not(.at_i_9f38462c) .ax_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;box-sizing:content-box;max-height:4.05em;overflow:hidden}.o_i_9f38462c.at_i_9f38462c{max-height:9999px;font-size:28px;font-weight:600}.o_i_9f38462c.at_i_9f38462c .aw_i_9f38462c{-webkit-line-clamp:2;max-height:2.7em}.o_i_9f38462c.at_i_9f38462c .aw_i_9f38462c,.o_i_9f38462c.at_i_9f38462c .ax_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;box-sizing:content-box;overflow:hidden}.o_i_9f38462c.at_i_9f38462c .ax_i_9f38462c{-webkit-line-clamp:3;max-height:4.05em}.o_i_9f38462c.ay_i_9f38462c{word-break:normal}.o_i_9f38462c.ay_i_9f38462c .ax_i_9f38462c,.o_i_9f38462c.ay_i_9f38462c .az_i_9f38462c{text-overflow:ellipsis}.au_i_9f38462c .o_i_9f38462c,.ba_i_9f38462c .o_i_9f38462c{color:#fff}.bb_i_9f38462c{font-weight:600;word-break:break-word;pointer-events:all}.bb_i_9f38462c:not(.at_i_9f38462c){font-size:12px}.bb_i_9f38462c.at_i_9f38462c{font-size:16px}[dir=ltr] .bb_i_9f38462c{padding-left:2px}[dir=rtl] .bb_i_9f38462c{padding-right:2px}.bb_i_9f38462c:not(.at_i_9f38462c){margin-top:16px}.bb_i_9f38462c.bc_i_9f38462c{text-transform:uppercase}.be_i_9f38462c.at_i_9f38462c{position:relative;padding-top:0}.be_i_9f38462c .bb_i_9f38462c{text-decoration:none}.be_i_9f38462c .bb_i_9f38462c:focus{text-decoration:underline}.bf_i_9f38462c:not(.at_i_9f38462c) a:hover{transform:scale(1.04)}.au_i_9f38462c .bb_i_9f38462c,.ba_i_9f38462c .bb_i_9f38462c{color:#fff}.bg_i_9f38462c{position:relative;top:2px}.bh_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-size:32px;font-weight:100;max-width:none}.bh_i_9f38462c:not(.ba_i_9f38462c) .be_i_9f38462c:not(.at_i_9f38462c){padding-left:28px}.bh_i_9f38462c:not(.ba_i_9f38462c) .be_i_9f38462c.at_i_9f38462c{padding-left:32px}.bi_i_9f38462c .as_i_9f38462c{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;background-image:none}.bi_i_9f38462c .bb_i_9f38462c,.bi_i_9f38462c .o_i_9f38462c{color:"[theme:white, default: #ffffff]"}.bi_i_9f38462c .be_i_9f38462c:not(.at_i_9f38462c){bottom:35%}.bi_i_9f38462c .be_i_9f38462c.at_i_9f38462c{bottom:0}.bi_i_9f38462c.bj_i_9f38462c{background:0 0}.bk_i_9f38462c{-ms-flex-align:center;align-items:center;height:100%;-ms-flex-pack:center;justify-content:center;width:100%}.bk_i_9f38462c,.bl_i_9f38462c{display:-ms-flexbox;display:flex}.bl_i_9f38462c{-ms-flex-direction:column;flex-direction:column;margin-bottom:20px}.bm_i_9f38462c{font-size:21px;margin-bottom:8px}.bn_i_9f38462c{font-size:14px}.bo_i_9f38462c{background-color:"[theme:neutralLighter, default: #f3f2f1]";-ms-flex-direction:column;flex-direction:column}.bo_i_9f38462c .bl_i_9f38462c{-ms-flex-align:center;align-items:center}.bo_i_9f38462c .bp_i_9f38462c{font-size:32px}.bq_i_9f38462c{-ms-flex-direction:row;flex-direction:row}.bq_i_9f38462c .br_i_9f38462c{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;width:58%;height:100%}.bq_i_9f38462c .bs_i_9f38462c{padding:32px;width:42%}.bq_i_9f38462c .bl_i_9f38462c{-ms-flex-align:start;align-items:flex-start}.bq_i_9f38462c .bp_i_9f38462c{font-size:48px}.bt_i_9f38462c:not(.ba_i_9f38462c){-ms-flex-direction:row-reverse;flex-direction:row-reverse}.bu_i_9f38462c .as_i_9f38462c{padding:40px}.bu_i_9f38462c.bh_i_9f38462c .be_i_9f38462c{padding-left:40px}.bu_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-size:24px}.bu_i_9f38462c.bh_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-size:42px}.bv_i_9f38462c:not(.bj_i_9f38462c) .bb_i_9f38462c,.bv_i_9f38462c:not(.bj_i_9f38462c) .o_i_9f38462c{color:"[theme:neutralPrimary, default: #323130]"}.bv_i_9f38462c .as_i_9f38462c{background-image:none}.ba_i_9f38462c .bw_i_9f38462c{-ms-flex-pack:end;justify-content:flex-end}.ba_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-weight:400}.ba_i_9f38462c.bh_i_9f38462c .o_i_9f38462c{font-size:24px}.ba_i_9f38462c .be_i_9f38462c{display:-ms-flexbox;display:flex;position:absolute;left:28px;right:28px;bottom:28px}.ba_i_9f38462c .bb_i_9f38462c{margin-top:8px;font-size:11px}.bx_i_9f38462c:hover{cursor:pointer}.by_i_9f38462c{z-index:2}.bz_i_9f38462c.ap_i_9f38462c{transition:transform .75s cubic-bezier(.1,.2,0,1);transform-style:preserve-3d}.ca_i_9f38462c:hover.ap_i_9f38462c{transform:scale(1.06)}.cb_i_9f38462c:hover.ap_i_9f38462c{transform:scale(1.04)}.cc_i_9f38462c:hover.ap_i_9f38462c{transform:scale(1.02)}.au_i_9f38462c .be_i_9f38462c{display:-ms-flexbox;display:flex;right:0;left:0}.au_i_9f38462c .be_i_9f38462c.at_i_9f38462c{position:relative}.au_i_9f38462c .be_i_9f38462c:not(.at_i_9f38462c){position:absolute;bottom:28px}.bj_i_9f38462c{display:-ms-flexbox;display:flex;border:none}.bj_i_9f38462c .ap_i_9f38462c{width:58%;box-sizing:border-box}.bj_i_9f38462c .ce_i_9f38462c{width:58%}.bj_i_9f38462c .bw_i_9f38462c{width:42%;position:relative}.bj_i_9f38462c .as_i_9f38462c{box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;padding:5%;position:static;max-width:700px;width:100%}.bj_i_9f38462c .o_i_9f38462c{max-height:none}.bj_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-size:24px;font-weight:300;line-height:1.3}.bj_i_9f38462c .cf_i_9f38462c{font-weight:600;font-size:12px;margin-bottom:12px;padding:4px 12px;text-transform:uppercase;letter-spacing:1px}.bj_i_9f38462c .p_i_9f38462c{margin-top:3%;width:100%;letter-spacing:.2px;word-break:break-word}.bj_i_9f38462c .p_i_9f38462c:not(.at_i_9f38462c){font-size:15px;line-height:1.6}.bj_i_9f38462c .p_i_9f38462c:not(.at_i_9f38462c).ax_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;box-sizing:content-box;max-height:4.8em;overflow:hidden}.bj_i_9f38462c .p_i_9f38462c:not(.at_i_9f38462c).az_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;box-sizing:content-box;max-height:6.4em;overflow:hidden}.bj_i_9f38462c .p_i_9f38462c.at_i_9f38462c{font-size:"[theme:mediumPlusFontSize, default: 16px]";font-weight:"[theme:mediumPlusFontWeight, default: 400]";line-height:1.4}.bj_i_9f38462c .p_i_9f38462c.at_i_9f38462c.ax_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;box-sizing:content-box;max-height:4.2em;overflow:hidden}.bj_i_9f38462c .p_i_9f38462c.at_i_9f38462c.az_i_9f38462c{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;box-sizing:content-box;max-height:5.6em;overflow:hidden}.bj_i_9f38462c .be_i_9f38462c{position:absolute;bottom:40px;width:100%}.bj_i_9f38462c .bb_i_9f38462c{-ms-flex-item-align:stretch;align-self:stretch;margin-top:auto;padding-top:15px}.bj_i_9f38462c .bb_i_9f38462c:not(.at_i_9f38462c){margin-left:28px;font-size:12px}.bj_i_9f38462c .bb_i_9f38462c{padding-left:0;margin-left:5%;display:inline-block}.bj_i_9f38462c.cg_i_9f38462c .be_i_9f38462c{bottom:40px}.bj_i_9f38462c.cg_i_9f38462c .bb_i_9f38462c{margin-left:40px}.bj_i_9f38462c.ch_i_9f38462c .be_i_9f38462c{bottom:45px}.bj_i_9f38462c.ch_i_9f38462c .bb_i_9f38462c{margin-left:45px}.bj_i_9f38462c.ci_i_9f38462c .be_i_9f38462c{bottom:55px}.bj_i_9f38462c.ci_i_9f38462c .bb_i_9f38462c{margin-left:55px}.bj_i_9f38462c.cj_i_9f38462c .be_i_9f38462c{bottom:65px}.bj_i_9f38462c.cj_i_9f38462c .bb_i_9f38462c{margin-left:65px}.bj_i_9f38462c.ck_i_9f38462c .be_i_9f38462c{bottom:65px}.bj_i_9f38462c.ck_i_9f38462c .bb_i_9f38462c{margin-left:65px}.bj_i_9f38462c.cl_i_9f38462c .p_i_9f38462c{visibility:hidden}.bj_i_9f38462c.cg_i_9f38462c .as_i_9f38462c{padding:40px}.bj_i_9f38462c.ch_i_9f38462c .as_i_9f38462c{padding:45px;max-width:550px}.bj_i_9f38462c.ci_i_9f38462c .as_i_9f38462c{padding:55px;max-width:550px}.bj_i_9f38462c.cj_i_9f38462c .as_i_9f38462c{padding:65px;max-width:700px}.bj_i_9f38462c.cj_i_9f38462c .as_i_9f38462c .cf_i_9f38462c{margin-bottom:15px}.bj_i_9f38462c.cj_i_9f38462c .as_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-size:28px;line-height:1.3}.bj_i_9f38462c.ck_i_9f38462c .as_i_9f38462c{padding:65px;max-width:700px}.bj_i_9f38462c.ck_i_9f38462c .as_i_9f38462c .o_i_9f38462c:not(.at_i_9f38462c){font-size:32px;line-height:1.4}.bj_i_9f38462c.ck_i_9f38462c .as_i_9f38462c .p_i_9f38462c{margin-top:15px}.bj_i_9f38462c.ck_i_9f38462c .as_i_9f38462c .p_i_9f38462c:not(.at_i_9f38462c){line-height:1.6}.cm_i_9f38462c:not(.ba_i_9f38462c){-ms-flex-direction:row-reverse;flex-direction:row-reverse}.cn_i_9f38462c .cf_i_9f38462c,.cn_i_9f38462c .p_i_9f38462c{display:none}.co_i_9f38462c{position:relative;width:100%;height:100%;overflow:hidden}.au_i_9f38462c.at_i_9f38462c.cp_i_9f38462c .o_i_9f38462c,.au_i_9f38462c.at_i_9f38462c.cq_i_9f38462c .o_i_9f38462c{font-size:20px}.au_i_9f38462c.at_i_9f38462c.cr_i_9f38462c .o_i_9f38462c{font-size:28px}.au_i_9f38462c.at_i_9f38462c.cr_i_9f38462c .as_i_9f38462c{padding-right:32px}.au_i_9f38462c.at_i_9f38462c.cs_i_9f38462c .o_i_9f38462c{font-size:28px}.au_i_9f38462c.at_i_9f38462c.cs_i_9f38462c .as_i_9f38462c{padding-right:68px}.au_i_9f38462c.at_i_9f38462c.ct_i_9f38462c .o_i_9f38462c{font-size:32px}.au_i_9f38462c.at_i_9f38462c.ct_i_9f38462c .as_i_9f38462c{padding-right:280px}.bj_i_9f38462c.at_i_9f38462c.cp_i_9f38462c .o_i_9f38462c,.bj_i_9f38462c.at_i_9f38462c.cq_i_9f38462c .o_i_9f38462c{font-size:20px}.ba_i_9f38462c.at_i_9f38462c .o_i_9f38462c,.bj_i_9f38462c.at_i_9f38462c.cr_i_9f38462c .o_i_9f38462c,.bj_i_9f38462c.at_i_9f38462c.cs_i_9f38462c .o_i_9f38462c{font-size:24px}.ba_i_9f38462c.at_i_9f38462c .as_i_9f38462c{padding-right:24px}.au_i_9f38462c.at_i_9f38462c .ap_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .ap_i_9f38462c{position:absolute}.au_i_9f38462c.at_i_9f38462c .bw_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .bw_i_9f38462c{width:100%;height:100%;background-color:transparent;background-image:linear-gradient(180deg,transparent 15%,rgba(0,0,0,.7));position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:end;justify-content:flex-end;pointer-events:none}.au_i_9f38462c.at_i_9f38462c .bw_i_9f38462c.cu_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .bw_i_9f38462c.cu_i_9f38462c{transform:translateZ(1px)}.au_i_9f38462c.at_i_9f38462c .be_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .be_i_9f38462c{position:relative;bottom:0;left:0;padding-left:32px}.au_i_9f38462c.at_i_9f38462c .be_i_9f38462c.cv_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .be_i_9f38462c.cv_i_9f38462c{padding-top:16px}.au_i_9f38462c.at_i_9f38462c .as_i_9f38462c.at_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .as_i_9f38462c.at_i_9f38462c{padding-bottom:0!important;padding-top:0!important}.au_i_9f38462c.at_i_9f38462c .cw_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .cw_i_9f38462c{padding-bottom:32px;padding-top:32px}.au_i_9f38462c.at_i_9f38462c .bb_i_9f38462c,.ba_i_9f38462c.at_i_9f38462c .bb_i_9f38462c{margin-top:0}.au_i_9f38462c .as_i_9f38462c.at_i_9f38462c{padding-left:32px!important}.bi_i_9f38462c.au_i_9f38462c.at_i_9f38462c .bw_i_9f38462c,.bi_i_9f38462c.ba_i_9f38462c.at_i_9f38462c .bw_i_9f38462c{background:0 0;padding-bottom:0;-ms-flex-pack:center;justify-content:center}.bv_i_9f38462c .bw_i_9f38462c{background:0 0!important}.cx_i_9f38462c{color:#fff;margin-bottom:8px;position:absolute;bottom:0;font-size:14px;background-color:rgba(0,0,0,.45);border-radius:2px;padding-bottom:4px;z-index:1}[dir=ltr] .cx_i_9f38462c{padding-right:3px}[dir=ltr] .cx_i_9f38462c,[dir=rtl] .cx_i_9f38462c{padding-left:3px}[dir=rtl] .cx_i_9f38462c{padding-right:3px}[dir=ltr] .cx_i_9f38462c{margin-right:8px}[dir=rtl] .cx_i_9f38462c{margin-left:8px}[dir=ltr] .cx_i_9f38462c{right:0}[dir=rtl] .cx_i_9f38462c{left:0}.cy_i_9f38462c{position:relative}', ""])
      },
      faye: function(e, t) {
        e.exports = h
      },
      "hiL/": function(e, t) {
        e.exports = f
      },
      jOlS: function(e, t) {
        e.exports = u
      },
      k2W4: function(e, t, i) {
        var o = i("NcRX"),
          a = i("jOlS");
        "string" == typeof o && (o = [
          [e.i, o]
        ]);
        for (var r = 0; r < o.length; r++) a.loadStyles(o[r][1], !0);
        o.locals && (e.exports = o.locals)
      },
      layD: function(e, t, i) {
        e.exports = i.p + "pageheader_d05b937912fe25c2df09f78a71b21950.png"
      },
      lxgo: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return a
        });
        var o = i("I6O9"),
          a = function() {
            function e() {}
            return e.loadModule = function() {
              return e._loadedModulePromise || (e._loadedModulePromise = o.SPComponentLoader.loadComponentById(e.carouselComponentId)), e._loadedModulePromise
            }, e.loadCarousel = function() {
              return e.loadModule().then(function(e) {
                return e.CarouselLayoutLoader.loadCarousel()
              })
            }, e.carouselComponentId = "8ac0c53c-e8d0-4e3e-87d0-7449eb0d4027", e
          }()
      },
      o5IQ: function(e, t, i) {
        var o = i("e2z/"),
          a = i("jOlS");
        "string" == typeof o && (o = [
          [e.i, o]
        ]);
        for (var r = 0; r < o.length; r++) a.loadStyles(o[r][1], !0);
        o.locals && (e.exports = o.locals)
      },
      q1Tm: function(e, t, i) {
        "use strict";
        e.exports = function(e) {
          var t = [];
          return t.toString = function() {
            return this.map(function(t) {
              var i = function(e, t) {
                var i, o, a, r = e[1] || "",
                  n = e[3];
                if (!n) return r;
                if (t && "function" == typeof btoa) {
                  var _ = (i = n, o = btoa(unescape(encodeURIComponent(JSON.stringify(i)))), a = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o), "/*# ".concat(a, " */")),
                    c = n.sources.map(function(e) {
                      return "/*# sourceURL=".concat(n.sourceRoot).concat(e, " */")
                    });
                  return [r].concat(c).concat([_]).join("\n")
                }
                return [r].join("\n")
              }(t, e);
              return t[2] ? "@media ".concat(t[2], "{").concat(i, "}") : i
            }).join("")
          }, t.i = function(e, i) {
            "string" == typeof e && (e = [
              [null, e, ""]
            ]);
            for (var o = {}, a = 0; a < this.length; a++) {
              var r = this[a][0];
              null != r && (o[r] = !0)
            }
            for (var n = 0; n < e.length; n++) {
              var _ = e[n];
              null != _[0] && o[_[0]] || (i && !_[2] ? _[2] = i : i && (_[2] = "(".concat(_[2], ") and (").concat(i, ")")), t.push(_))
            }
          }, t
        }
      },
      qjmy: function(e, t) {
        e.exports = m
      },
      rMgv: function(e, t, i) {
        "use strict";
        i.d(t, "b", function() {
          return o
        }), i.d(t, "a", function() {
          return a
        });
        var o = ["http", "https", "mailto"],
          a = "Image"
      },
      s4oQ: function(e, t, i) {
        var o = i("PIHo"),
          a = i("jOlS");
        "string" == typeof o && (o = [
          [e.i, o]
        ]);
        for (var r = 0; r < o.length; r++) a.loadStyles(o[r][1], !0);
        o.locals && (e.exports = o.locals)
      },
      tGpx: function(e, t) {
        e.exports = g
      },
      ut3N: function(e, t) {
        e.exports = b
      },
      vlQI: function(e, t) {
        e.exports = I
      },
      vojf: function(e, t, i) {
        "use strict";
        i.d(t, "a", function() {
          return p
        }), i.d(t, "b", function() {
          return l
        }), i.d(t, "c", function() {
          return d
        });
        var o = i("17wl"),
          a = i("cDcd"),
          r = i("KL1q"),
          n = i("ut3N"),
          _ = i("hiL/"),
          c = i("UWqr");
        i("k2W4");
        var s = {
            heroPatternFocusZone: "a_a_37591358",
            heroPattern: "b_a_37591358",
            heroPattern_element: "c_a_37591358",
            heroPattern__stacks: "e_a_37591358",
            heroPattern__oneElement: "f_a_37591358",
            heroPattern__twoElements: "g_a_37591358",
            heroPattern__threeElements: "h_a_37591358",
            heroPattern__fourElements: "i_a_37591358",
            heroPattern__fiveElements: "j_a_37591358",
            heroPattern__tiles: "k_a_37591358",
            invertedFourPieceTile: "l_a_37591358",
            heroPattern__sixElements: "m_a_37591358",
            heroPattern__sevenElements: "n_a_37591358",
            heroPattern__eightElements: "o_a_37591358",
            fixFocusBorder: "p_a_37591358"
          },
          l = {
            OnePiece: 1,
            TwoPieces: 2,
            ThreePieces: 3,
            FourPieces: 4,
            FivePieces: 5,
            SixPieces: 6,
            SevenPieces: 7,
            EightPieces: 8
          },
          d = {
            Tile: 1,
            Stack: 2
          },
          p = function(e) {
            function t() {
              var i = null !== e && e.apply(this, arguments) || this;
              return i._sortable = void 0, i.continueReorder = !1, i._itemsList = [], i._isManuallySetFocus = !1, i._listKey = Math.random(), i._getItemsControl = function() {
                var e = i.props.layoutCategory === d.Stack ? "SPPages.HeroLayout.Stack" : "SPPages.HeroLayout.Tile",
                  t = i.props.layoutCategory === d.Stack ? s.heroPattern__stacks : s.heroPattern__tiles,
                  _ = void 0,
                  c = Object(r.css)(s.heroPattern, t, s.heroPattern__threeElements);
                switch (i.props.layout) {
                  case l.OnePiece:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__oneElement), i._itemcCount = 1, e += "OnePiece";
                    break;
                  case l.TwoPieces:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__twoElements), i._itemcCount = 2, e += "TwoPieces";
                    break;
                  case l.ThreePieces:
                    _ = c, i._itemcCount = 3, e += "ThreePieces";
                    break;
                  case l.FourPieces:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__fourElements, !i.props.useLegacyFourTileMode && s.invertedFourPieceTile), i._itemcCount = 4, e += "FourPieces";
                    break;
                  case l.FivePieces:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__fiveElements), i._itemcCount = 5, e += "FivePieces";
                    break;
                  case l.SixPieces:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__sixElements), i._itemcCount = 6, e += "SixPieces";
                    break;
                  case l.SevenPieces:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__sevenElements), i._itemcCount = 7, e += "SevenPieces";
                    break;
                  case l.EightPieces:
                    _ = Object(r.css)(s.heroPattern, t, s.heroPattern__eightElements), i._itemcCount = 8, e += "EightPieces"
                }
                e += ".Click", n._EngagementLogger.logEvent(e);
                var p = {
                  direction: r.FocusZoneDirection.horizontal,
                  isInnerZoneKeystroke: function(e) {
                    return e.which === r.KeyCodes.up || e.which === r.KeyCodes.down
                  }
                };
                i.props.canReorder || (p.isCircularNavigation = !0);
                var h = i.props.layoutCategory === d.Stack ? "Layers" : "Tiles";
                return a.createElement(r.FocusZone, Object(o.__assign)({}, p, {
                  className: s.heroPatternFocusZone
                }), a.createElement("div", {
                  key: i._listKey,
                  className: _,
                  ref: i._resolveRef("_containerDiv"),
                  role: "list",
                  "data-automation-id": h,
                  "aria-label": i.props.heroPatternAriaLabel
                }, i._itemcCount > 0 && i._renderOneTileControl(0), i._itemcCount > 1 && i._renderOneTileControl(1), i._itemcCount > 2 && i._renderOneTileControl(2), i._itemcCount > 3 && i._renderOneTileControl(3), i._itemcCount > 4 && i._renderOneTileControl(4), i._itemcCount > 5 && i._renderOneTileControl(5), i._itemcCount > 6 && i._renderOneTileControl(6), i._itemcCount > 7 && i._renderOneTileControl(7)))
              }, i._renderOneTileControl = function(e) {
                var n = {
                  "aria-label": i.props.getAriaLabel ? i.props.getAriaLabel(e) : "",
                  "data-is-focusable": !0,
                  "data-automation-id": "HeroPatternElement",
                  role: "listitem",
                  className: Object(r.css)(s.heroPattern_element, !c._SPKillSwitch.isActivated("a6bc645d-d1d7-491e-914b-cf0f3cd50f84") && s.fixFocusBorder, i.props.canReorder && t.draggableElement),
                  onFocus: function() {
                    return i.props.onFocusItem && i.props.onFocusItem(e)
                  },
                  onKeyDown: i._handleKeyDown(e),
                  ref: function(t) {
                    return i._itemsList[e] = t
                  }
                };
                return i.props.editMode ? a.createElement("div", Object(o.__assign)({}, n), i.props.onRenderHeroItem(e)) : (n.onClick = function(t) {
                  return i.props.onClickHeroItem && i.props.onClickHeroItem(e, t)
                }, a.createElement("div", Object(o.__assign)({}, n), i.props.onRenderHeroItem(e)))
              }, i._createSortableTiles = function() {
                if (i.props.canReorder && i._containerDiv) {
                  var e = new n._QosMonitor("HeroPattern.createSortable", !0);
                  _.SortableLoader.GetSortable().then(function(o) {
                    i._sortable = o.create(i._containerDiv, {
                      group: i._listKey,
                      forceFallback: c._SPKillSwitch.isActivated("f8008869-c26a-4a89-906b-290844d6d4ba") || c._Browser.Safari !== c._BrowserDetection.getBrowserInformation().browser,
                      onEnd: i._onReorderEnd,
                      animation: 200,
                      draggable: "." + t.draggableElement
                    }), e.writeSuccess()
                  }).catch(function(t) {
                    throw e.writeUnexpectedFailure(void 0, t), t
                  })
                }
              }, i._onReorderEnd = function(e) {
                if (void 0 !== e.newIndex && void 0 !== e.oldIndex) {
                  var t = e.oldIndex,
                    o = e.newIndex;
                  void 0 !== o && void 0 !== t && t !== o && (i._listKey = Math.random(), i.props.onReorder && (i.props.onReorder(t, o), i.continueReorder = !0))
                }
              }, i._handleKeyDown = function(e) {
                return function(t) {
                  if (i.props.canReorder) switch (t.which) {
                    case r.KeyCodes.left:
                      t.ctrlKey && e > 0 && e < i._itemcCount && (i._listKey = Math.random(), i.props.onReorder && i.props.onReorder(e, e - 1), i.continueReorder = !0, i._isManuallySetFocus = !0, t.stopPropagation());
                      break;
                    case r.KeyCodes.right:
                      t.ctrlKey && e >= 0 && e < i._itemcCount - 1 && (i._listKey = Math.random(), i.props.onReorder && i.props.onReorder(e, e + 1), i.continueReorder = !0, i._isManuallySetFocus = !0, t.stopPropagation())
                  }
                }
              }, i
            }
            return Object(o.__extends)(t, e), t.prototype.componentDidMount = function() {
              this._createSortableTiles()
            }, t.prototype.componentDidUpdate = function(e) {
              var t = e.layout !== this.props.layout;
              this.props.canReorder || t || this.continueReorder ? (this._createSortableTiles(), this._isManuallySetFocus && void 0 !== this.props.activeItemIndex && this._itemsList && this._itemsList[this.props.activeItemIndex] && this._itemsList[this.props.activeItemIndex].focus && e.activeItemIndex !== this.props.activeItemIndex && (this._itemsList[this.props.activeItemIndex].tabIndex = 0, this._itemsList[this.props.activeItemIndex].focus(), this._isManuallySetFocus = !1)) : this._sortable && (this._sortable.destroy(), this._sortable = void 0)
            }, t.prototype.componentWillUnmount = function() {
              this._sortable && (this._sortable.destroy(), this._sortable = void 0)
            }, t.prototype.shouldComponentUpdate = function(e) {
              return this.props !== e
            }, t.prototype.render = function() {
              var e = new n._QosMonitor("RenderHeroLayout");
              try {
                var i = this._getItemsControl();
                return e.writeSuccess(), i
              } catch (i) {
                throw e.writeUnexpectedFailure("FailedRender", i), n._TraceLogger.logError(t._logSource, i), i
              }
            }, t.draggableElement = "draggableElement", t._logSource = n._LogSource.create("HeroPattern"), t
          }(r.BaseComponent)
      },
      y88i: function(e, t) {
        e.exports = y
      }
    })
  });