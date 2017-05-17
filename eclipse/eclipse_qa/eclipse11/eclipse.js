!function (e) {
	function t(n) {
		if (a[n])
			return a[n].exports;
		var i = a[n] = {
			exports: {},
			id: n,
			loaded: !1
		};
		return e[n].call(i.exports, i, i.exports, t),
		i.loaded = !0,
		i.exports
	}
	var a = {};
	return t.m = e,
	t.c = a,
	t.p = "",
	t(0)
}
([function (e, t, a) {
			a(1),
			e.exports = a(42)
		}, function (e, t, a) {
			function n(e, t) {
				if (i.pauseStart)
					return void setTimeout(function () {
						n(e, t)
					}, 100);
				console.log("ranger/main: Loading Ranger library components");
				var r = a(4);
				r.canvas = e;
				var o = a(5);
				r.scene = a(9),
				r.update = a(19).update,
				r.graphics = a(41);
				try {
					r.app = new o
				} catch (s) {
					console.exception("ranger/main: Failed to initialize Ranger: ", s),
					r.app && r.app.quit("ranger/main: Failed to initialize a library component", !0)
				}
				t && t()
			}
			a(2).set();
			var i = a(3);
			console.verbose = i.verbose,
			console.verboseLog = function () {
				console.verbose && console.log.apply(null, arguments)
			},
			console.verboseInfo = function () {
				console.verbose && console.info.apply(null, arguments)
			},
			console.verboseWarn = function () {
				console.verbose && console.warn.apply(null, arguments)
			},
			console.verboseError = function () {
				console.verbose && console.error.apply(null, arguments)
			},
			console.exception = function (e, t) {
				console.error(e),
				console.error(t),
				t.stack && console.error(t.stack)
			},
			e.exports = {
				init: n
			}
		}, function (e, t, a) {
			function n(e) {
				return e || (e = c), {
					stereo: !1,
					vr: !1,
					mobile: !1,
					ios: !1,
					high: !1,
					medium: !1,
					low: !1,
					profile: !1,
					profileMemory: !1,
					timeMemory: !1,
					pauseStart: !1,
					verbose: !1,
					debug: !1,
					profileInstances: !1,
					usePainters: !1,
					canvasDivisor: 1,
					title: "Ranger",
					path: {
						document: "rpath://./",
						image: "rpath://./",
						server: "rpath://./",
						animation: "rpath://./",
						imageproxy: "rpath://../../..",
						module: "rpath://../../dist",
						scene: "data://scene"
					},
					scene: {
						servers: "$RANGER.MODULE/\\tag.json",
						tags: ""
					},
					log: {
						shader: !1
					},
					camera: {
						time: 0,
						rate: 0,
						type: "Orbit",
						target: "",
						radius: 6e8,
						position: [0, 0, 0],
						orientation: [0, 0, 0, 1]
					},
					virtual: e.high ? {
						physical: [4096, 4096],
						mipLimit: 13,
						uploads: 512,
						pending: 128,
						sampleShift: 2
					}
					 : e.medium ? {
						physical: [2048, 2048],
						mipLimit: 12,
						uploads: 64,
						pending: 32,
						sampleShift: 3
					}
					 : e.low ? {
						physical: [1024, 1024],
						mipLimit: 8,
						uploads: 8,
						pending: 8,
						sampleShift: 5
					}
					 : e.mobile ? {
						physical: [1024, 1024],
						mipLimit: 10,
						uploads: 16,
						pending: 16,
						sampleShift: 5
					}
					 : {
						physical: [2048, 2048],
						mipLimit: 11,
						uploads: 64,
						pending: 32,
						sampleShift: 3
					}
				}
			}
			function i(e) {
				return !!+e || "undefined" != typeof e && ("string" == typeof e && ("true" === e.toLowerCase() || "yes" === e.toLowerCase() || "on" === e.toLowerCase() || "enabled" === e.toLowerCase()))
			}
			function r(e, t) {
				for (var a in t) {
					var n = e[a];
					if ("undefined" != typeof n) {
						var o = t[a];
						"boolean" == typeof n ? t[a] = i(o) : "number" == typeof n ? t[a] = Number(o) : n.constructor === Array && (t[a] = Object.keys(o).map(function (e) {
										return o[e]
									})),
						"string" != typeof n && "boolean" != typeof n && "number" != typeof n && r(n, t[a])
					}
				}
			}
			function o(e, t) {
				for (var a in e) {
					var n = e[a];
					a in t ? "string" != typeof n && "boolean" != typeof n && "number" != typeof n && o(n, t[a]) : t[a] = n
				}
			}
			function s() {
				r(n(), c),
				o(n(), c)
			}
			var c = a(3);
			e.exports = {
				defaults: n,
				set: s
			}
		}, function (e, t) {
			(function (t) {
				if (!("settings" in t.window.__ranger))
					throw Error("Could not find settings!");
				e.exports = t.window.__ranger.settings
			}).call(t, function () {
				return this
			}
				())
		}, function (e, t) {
			(function (t) {
				if (!t.window || !t.window.__ranger)
					throw Error("Could not find Eyes.js");
				this.__ranger = window.__ranger,
				window.performance || (console.warn("ERROR: window.performance does not exist, likely due to using Safari < 8 on Mac OS or using iOS < 8 or iOS >= 8.1.1"), window.performance = {
						now: function () {
							return +new Date
						}
					}),
				e.exports = this.__ranger
			}).call(t, function () {
				return this
			}
				())
		}, function (e, t, a) {
			function n() {
				y = "START_FRAME"
			}
			function i() {
				if ("INITALIZING" !== y)
					do
						x && N.app.renderEventProfiler(y), b[y]();
					while ("START_FRAME" !== y)
			}
			function r(e) {
				var t = JSON.stringify(N.app.profiler.report, null, 2),
				a = new XMLHttpRequest;
				a.open("POST", window.location.origin + "/report/" + e),
				a.setRequestHeader("Content-type", "application/json"),
				a.setRequestHeader("Content-length", t.length),
				a.onreadystatechange = function () {
					200 != a.status && console.log("Problem connecting to server")
				},
				a.send(t),
				console.log("Wrote report to server at: " + window.location.origin + "/report/" + e)
			}
			function o(e) {
				e.callback.apply(this, e.params)
			}
			function s() {
				if (w)
					return !0;
				for (var e = window.performance.now(), t = e + 1, a = []; j.length; ) {
					var n = j.dequeue();
					if (n.start && this.core.frame < n.start)
						a.push(n);
					else {
						switch (n.type) {
						case "CPPCALLBACK":
							this.handleCPPCallbackEvent(n.params);
							break;
						case "CALLBACK":
							o(n.params);
							break;
						case "DOWNLOAD":
							this.handleDownloadEvent(n.params);
							break;
						case "QUIT":
							return !1;
						case "NONE":
						}
						if (window.performance.now() >= t)
							break
					}
				}
				return a.forEach(function (e) {
					j.queue(e)
				}),
				i(),
				!0
			}
			function c(e, t) {
				j.queue({
					type: "CPPCALLBACK",
					params: e,
					start: t
				})
			}
			function l(e) {
				j.queue({
					type: "DOWNLOAD",
					params: e
				})
			}
			function u(e) {
				j.queue({
					type: "CALLBACK",
					params: e
				})
			}
			function d(e) {
				j.queue({
					type: "QUIT",
					params: e
				})
			}
			function M(e, t, a, n, i) {
				var r = this.aux.newWindow(e, t, a, n, i);
				return r ? (I.push(r), r) : null
			}
			function g(e, t) {
				t.offsetLeft = "",
				t.offsetTop = "",
				t.currentElement = "",
				t.mousePressed = !1;
				var a = t.div = document.createElement("div");
				a.className = "pip",
				a.id = "pip" + t.id,
				a.style.bottom = "0 px",
				a.style.right = "0 px",
				e.appendChild(a);
				var n = 0,
				i = 0;
				return t.resize = function () {
					n = Math.abs(e.offsetWidth - e.clientWidth) / 2,
					i = Math.abs(e.offsetHeight - e.clientHeight) / 2,
					t.left = Math.max(0, n + e.offsetLeft + a.offsetLeft),
					t.top = Math.max(0, N.canvas.offsetHeight - (i + e.offsetTop + a.offsetTop + a.offsetHeight)),
					t.width = Math.max(1, a.offsetWidth),
					t.height = Math.max(1, a.offsetHeight)
				},
				v.addResizeListener(a, t.resize),
				window.addEventListener("resize", t.resize),
				t.addResizeListener = function (e) {
					v.addResizeListener(a, e),
					window.addEventListener("resize", e)
				},
				t
			}
			function p(e, t, a, n, i, r) {
				var o = e.subWindow(t, a, n, i);
				return o ? (I.push(o), N.scene.cameraData[o.camera.id] = {}, r || (r = N.canvas.parentElement), g(r, o)) : null
			}
			function m() {
				this.__parent.__construct.call(this),
				this.downloadManager.addReplacement("RANGER", h.path.server),
				this.downloadManager.addReplacement("RANGER.DOCUMENT", h.path.document),
				this.downloadManager.addReplacement("RANGER.IMAGE", h.path.image),
				this.downloadManager.addReplacement("RANGER.IMAGES", h.path.image),
				this.downloadManager.addReplacement("RANGER.IMAGE.PROXY", h.path.imageproxy),
				this.downloadManager.addReplacement("RANGER.MODULE", h.path.module),
				this.downloadManager.addReplacement("RANGER.ANIMATION", h.path.animation),
				this.downloadManager.addReplacement("RANGER.SCENE", h.path.scene)
			}
			var A,
			f,
			D,
			N = a(4),
			h = a(3),
			v = a(6),
			T = 0,
			L = 0,
			y = "INITALIZING",
			w = !1,
			I = [],
			E = a(7),
			j = E.createQueue(),
			x = !1,
			b = {
				INITALIZING: function () {},
				START_FRAME: function () {
					var e = window.performance.now() / 1e3;
					T = e - L,
					L = e,
					N.app.core.startFrame(),
					y = "JS_START_FRAME"
				},
				JS_START_FRAME: function () {
					var e = N.startFrame;
					"function" == typeof e && e(T),
					N.scene.clearFrameData(),
					y = "MAINTAIN_BUFFERS"
				},
				MAINTAIN_BUFFERS: function () {
					N.app.core.maintainBuffers(),
					y = "WINDOW_UPDATE"
				},
				WINDOW_UPDATE: function () {
					for (var e in I)
						I[e].update(D.getCorrectedCursorPosition(), D.touchDown);
					A = 0,
					y = "UPDATE_STATE"
				},
				UPDATE_STATE: function () {
					if (A == I.length)
						A = 0, y = "RENDER_WINDOW";
					else {
						var e = I[A].windowUpdate;
						"function" == typeof e && e(T, I[A]),
						f = I[A].camera,
						y = "UPDATE_CAMERA"
					}
				},
				UPDATE_CAMERA: function () {
					if (f) {
						f.update() || console.warn("Application: Failed to update the camera");
						var e;
						N.scene.cameraData[f.id] && (e = N.scene.cameraData[f.id].attachedNode),
						e && !e.loaded && e.triggerLoad(f.clock),
						y = "UPDATE_FRAMES"
					} else
						A++, y = "UPDATE_STATE"
				},
				UPDATE_FRAMES: function () {
					var e;
					N.scene.cameraData[f.id] && (e = N.scene.cameraData[f.id].attachedNode),
					e && e.updateFrames(f),
					y = "TRANSFORM_SCENE"
				},
				TRANSFORM_SCENE: function () {
					var e;
					if (N.scene.cameraData[f.id] && (e = N.scene.cameraData[f.id].attachedNode), e) {
						var t = {
							parent: e,
							position: [0, 0, 0],
							orientation: [0, 0, 0, 1],
							time: f.clock.time.value
						};
						e.transformToFrame(t, f)
					}
					A++,
					y = "UPDATE_STATE"
				},
				RENDER_WINDOW: function () {
					A == I.length ? (y = "SWAP_BUFFERS", A = 0) : (f = I[A].camera, y = "JS_POST_TRANSFORM")
				},
				JS_POST_TRANSFORM: function () {
					var e = I[A].postTransformUpdate;
					"function" == typeof e && e(T, I[A], f),
					y = "POST_CAMERA_UPDATE"
				},
				POST_CAMERA_UPDATE: function () {
					var e;
					N.scene.cameraData[f.id] && (e = N.scene.cameraData[f.id].attachedNode),
					e && e.postCameraUpdate(f),
					f.postUpdate(),
					y = "JS_POST_CAMERA_UPDATE"
				},
				JS_POST_CAMERA_UPDATE: function () {
					var e = I[A].postCameraUpdate;
					"function" == typeof e && e(T, I[A], f),
					y = "RENDER_CAMERA"
				},
				RENDER_CAMERA: function () {
					x = !0,
					f.render(N.scene.getRenderableObjects(f)),
					y = "RENDER_WINDOW",
					f = null,
					A++
				},
				SWAP_BUFFERS: function () {
					I[A] && I[A].swapBuffers(),
					h.vr && D.vrDevice.isPresenting && D.vrDevice.submitFrame(),
					y = "JS_END_FRAME"
				},
				JS_END_FRAME: function () {
					var e = N.endFrame;
					"function" == typeof e ? e(T) : Array.isArray(e) && e.forEach(function (e) {
						e(T)
					}),
					y = "END_FRAME"
				},
				END_FRAME: function () {
					N.app.core.endFrame(),
					y = "START_FRAME"
				}
			};
			e.exports = N.Application.extend("Application", {
					__construct: m,
					startDrawing: n,
					loop: s,
					addDownloadEvent: l,
					addCallbackEvent: u,
					addCPPCallbackEvent: c,
					addQuitEvent: d,
					newWindow: M,
					subWindow: p,
					windows: I,
					profileReport: r,
					setWin: function (e) {
						if (D = e, N.endFrame) {
							var t = N.endFrame;
							N.endFrame = function (e) {
								t(e),
								D.endFrame(e)
							}
						} else
							N.endFrame = D.endFrame
					},
					getWin: function () {
						return D
					},
					pause: function () {
						w = !0
					},
					unpause: function () {
						w = !1
					}
				})
		}, function (e, t) {
			function a(e) {
				var t = e.__resizeTriggers__,
				a = t.firstElementChild,
				n = t.lastElementChild,
				i = a.firstElementChild;
				n.scrollLeft = n.scrollWidth,
				n.scrollTop = n.scrollHeight,
				i.style.width = a.offsetWidth + 2 + "px",
				i.style.height = a.offsetHeight + 2 + "px",
				a.scrollLeft = a.scrollWidth,
				a.scrollTop = a.scrollHeight
			}
			function n(e) {
				return e.offsetWidth != e.__resizeLast__.width || e.offsetHeight != e.__resizeLast__.height
			}
			function i(e) {
				var t = this;
				a(this),
				this.__resizeRAF__ && l(this.__resizeRAF__),
				this.__resizeRAF__ = c(function () {
						n(t) && (t.__resizeLast__.width = t.offsetWidth, t.__resizeLast__.height = t.offsetHeight, t.__resizeListeners__.forEach(function (a) {
								a.call(t, e)
							}))
					})
			}
			function r() {
				if (!s) {
					var e = (h ? h : "") + ".resize-triggers { " + (v ? v : "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
					t = document.head || document.getElementsByTagName("head")[0],
					a = document.createElement("style");
					a.type = "text/css",
					a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e)),
					t.appendChild(a),
					s = !0
				}
			}
			var o = document.attachEvent,
			s = !1;
			if (!o) {
				var c = function () {
					var e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
						return window.setTimeout(e, 20)
					};
					return function (t) {
						return e(t)
					}
				}
				(),
				l = function () {
					var e = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
					return function (t) {
						return e(t)
					}
				}
				(),
				u = !1,
				d = "animation",
				M = "",
				g = "animationstart",
				p = "Webkit Moz O ms".split(" "),
				m = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),
				A = "",
				f = document.createElement("fakeelement");
				if (void 0 !== f.style.animationName && (u = !0), u === !1)
					for (var D = 0; D < p.length; D++)
						if (void 0 !== f.style[p[D] + "AnimationName"]) {
							A = p[D],
							d = A + "Animation",
							M = "-" + A.toLowerCase() + "-",
							g = m[D],
							u = !0;
							break
						}
				var N = "resizeanim",
				h = "@" + M + "keyframes " + N + " { from { opacity: 0; } to { opacity: 0; } } ",
				v = M + "animation: 1ms " + N + "; "
			}
			e.exports = {
				addResizeListener: function (e, t) {
					o ? e.attachEvent("onresize", t) : (e.__resizeTriggers__ || ("static" == getComputedStyle(e).position && (e.style.position = "relative"), r(), e.__resizeLast__ = {}, e.__resizeListeners__ = [], (e.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", e.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', e.appendChild(e.__resizeTriggers__), a(e), e.addEventListener("scroll", i, !0), g && e.__resizeTriggers__.addEventListener(g, function (t) {
								t.animationName == N && a(e)
							})), e.__resizeListeners__.push(t))
				},
				removeResizeListener: function (e, t) {
					o ? e.detachEvent("onresize", t) : (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1), e.__resizeListeners__.length || (e.removeEventListener("scroll", i), e.__resizeTriggers__ = !e.removeChild(e.__resizeTriggers__)))
				}
			}
		}, function (e, t, a) {
			function n(e, t) {
				if (e.type && t.type) {
					var a = e.type,
					n = t.type;
					if (a in s && n in s)
						return a = s[a], n = s[n], 2 == a && a == n ? r.app.downloadManager.getPriority(t.params) - r.app.downloadManager.getPriority(e.params) : n - a
				}
			}
			function i() {
				return new o({
					comparator: n
				})
			}
			var r = a(4),
			o = a(8),
			s = {
				NONE: 0,
				RENDER: 1,
				DOWNLOAD: 2,
				CPPCALLBACK: 3,
				CALLBACK: 4,
				QUIT: 5
			};
			e.exports = {
				createQueue: i
			}
		}, function (e, t) {
			!function (a) {
				if ("object" == typeof t && "undefined" != typeof e)
					e.exports = a();
				else if ("function" == typeof define && define.amd)
					define([], a);
				else {
					var n;
					n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
					n.PriorityQueue = a()
				}
			}
			(function () {
				return function e(t, a, n) {
					function i(o, s) {
						if (!a[o]) {
							if (!t[o]) {
								var c = "function" == typeof require && require;
								if (!s && c)
									return c(o, !0);
								if (r)
									return r(o, !0);
								var l = new Error("Cannot find module '" + o + "'");
								throw l.code = "MODULE_NOT_FOUND",
								l
							}
							var u = a[o] = {
								exports: {}
							};
							t[o][0].call(u.exports, function (e) {
								var a = t[o][1][e];
								return i(a ? a : e)
							}, u, u.exports, e, t, a, n)
						}
						return a[o].exports
					}
					for (var r = "function" == typeof require && require, o = 0; o < n.length; o++)
						i(n[o]);
					return i
				}
				({
					1: [function (e, t, a) {
							var n,
							i,
							r,
							o,
							s,
							c = function (e, t) {
								function a() {
									this.constructor = e
								}
								for (var n in t)
									l.call(t, n) && (e[n] = t[n]);
								return a.prototype = t.prototype,
								e.prototype = new a,
								e.__super__ = t.prototype,
								e
							},
							l = {}
							.hasOwnProperty;
							n = e("./PriorityQueue/AbstractPriorityQueue"),
							i = e("./PriorityQueue/ArrayStrategy"),
							o = e("./PriorityQueue/BinaryHeapStrategy"),
							r = e("./PriorityQueue/BHeapStrategy"),
							s = function (e) {
								function t(e) {
									e || (e = {}),
									e.strategy || (e.strategy = o),
									e.comparator || (e.comparator = function (e, t) {
										return (e || 0) - (t || 0)
									}),
									t.__super__.constructor.call(this, e)
								}
								return c(t, e),
								t
							}
							(n),
							s.ArrayStrategy = i,
							s.BinaryHeapStrategy = o,
							s.BHeapStrategy = r,
							t.exports = s
						}, {
							"./PriorityQueue/AbstractPriorityQueue": 2,
							"./PriorityQueue/ArrayStrategy": 3,
							"./PriorityQueue/BHeapStrategy": 4,
							"./PriorityQueue/BinaryHeapStrategy": 5
						}
					],
					2: [function (e, t, a) {
							var n;
							t.exports = n = function () {
								function e(e) {
									var t;
									if (null == (null != e ? e.strategy : void 0))
										throw "Must pass options.strategy, a strategy";
									if (null == (null != e ? e.comparator : void 0))
										throw "Must pass options.comparator, a comparator";
									this.priv = new e.strategy(e),
									this.length = (null != e && null != (t = e.initialValues) ? t.length : void 0) || 0
								}
								return e.prototype.queue = function (e) {
									this.length++,
									this.priv.queue(e)
								},
								e.prototype.dequeue = function (e) {
									if (!this.length)
										throw "Empty queue";
									return this.length--,
									this.priv.dequeue()
								},
								e.prototype.peek = function (e) {
									if (!this.length)
										throw "Empty queue";
									return this.priv.peek()
								},
								e.prototype.clear = function () {
									return this.length = 0,
									this.priv.clear()
								},
								e
							}
							()
						}, {}
					],
					3: [function (e, t, a) {
							var n,
							i;
							i = function (e, t, a) {
								var n,
								i,
								r;
								for (i = 0, n = e.length; i < n; )
									r = i + n >>> 1, a(e[r], t) >= 0 ? i = r + 1 : n = r;
								return i
							},
							t.exports = n = function () {
								function e(e) {
									var t;
									this.options = e,
									this.comparator = this.options.comparator,
									this.data = (null != (t = this.options.initialValues) ? t.slice(0) : void 0) || [],
									this.data.sort(this.comparator).reverse()
								}
								return e.prototype.queue = function (e) {
									var t;
									t = i(this.data, e, this.comparator),
									this.data.splice(t, 0, e)
								},
								e.prototype.dequeue = function () {
									return this.data.pop()
								},
								e.prototype.peek = function () {
									return this.data[this.data.length - 1]
								},
								e.prototype.clear = function () {
									this.data.length = 0
								},
								e
							}
							()
						}, {}
					],
					4: [function (e, t, a) {
							var n;
							t.exports = n = function () {
								function e(e) {
									var t,
									a,
									n,
									i,
									r,
									o,
									s,
									c,
									l;
									for (this.comparator = (null != e ? e.comparator : void 0) || function (e, t) {
										return e - t
									}, this.pageSize = (null != e ? e.pageSize : void 0) || 512, this.length = 0, c = 0; 1 << c < this.pageSize; )
										c += 1;
									if (1 << c !== this.pageSize)
										throw "pageSize must be a power of two";
									for (this._shift = c, this._emptyMemoryPageTemplate = t = [], a = n = 0, o = this.pageSize; 0 <= o ? n < o : n > o; a = 0 <= o ? ++n : --n)
										t.push(null);
									if (this._memory = [], this._mask = this.pageSize - 1, e.initialValues)
										for (s = e.initialValues, i = 0, r = s.length; i < r; i++)
											l = s[i], this.queue(l)
								}
								return e.prototype.queue = function (e) {
									this.length += 1,
									this._write(this.length, e),
									this._bubbleUp(this.length, e)
								},
								e.prototype.dequeue = function () {
									var e,
									t;
									return e = this._read(1),
									t = this._read(this.length),
									this.length -= 1,
									this.length > 0 && (this._write(1, t), this._bubbleDown(1, t)),
									e
								},
								e.prototype.peek = function () {
									return this._read(1)
								},
								e.prototype.clear = function () {
									this.length = 0,
									this._memory.length = 0
								},
								e.prototype._write = function (e, t) {
									var a;
									for (a = e >> this._shift; a >= this._memory.length; )
										this._memory.push(this._emptyMemoryPageTemplate.slice(0));
									return this._memory[a][e & this._mask] = t
								},
								e.prototype._read = function (e) {
									return this._memory[e >> this._shift][e & this._mask]
								},
								e.prototype._bubbleUp = function (e, t) {
									var a,
									n,
									i,
									r;
									for (a = this.comparator; e > 1 && (n = e & this._mask, e < this.pageSize || n > 3 ? i = e & ~this._mask | n >> 1 : n < 2 ? (i = e - this.pageSize >> this._shift, i += i & ~(this._mask >> 1), i |= this.pageSize >> 1) : i = e - 2, r = this._read(i), !(a(r, t) < 0)); )
										this._write(i, t), this._write(e, r), e = i
								},
								e.prototype._bubbleDown = function (e, t) {
									var a,
									n,
									i,
									r,
									o;
									for (o = this.comparator; e < this.length; )
										if (e > this._mask && !(e & this._mask - 1) ? a = n = e + 2 : e & this.pageSize >> 1 ? (a = (e & ~this._mask) >> 1, a |= e & this._mask >> 1, a = a + 1 << this._shift, n = a + 1) : (a = e + (e & this._mask), n = a + 1), a !== n && n <= this.length)
											if (i = this._read(a), r = this._read(n), o(i, t) < 0 && o(i, r) <= 0)
												this._write(a, t), this._write(e, i), e = a;
											else {
												if (!(o(r, t) < 0))
													break;
												this._write(n, t),
												this._write(e, r),
												e = n
											}
										else {
											if (!(a <= this.length))
												break;
											if (i = this._read(a), !(o(i, t) < 0))
												break;
											this._write(a, t),
											this._write(e, i),
											e = a
										}
								},
								e
							}
							()
						}, {}
					],
					5: [function (e, t, a) {
							var n;
							t.exports = n = function () {
								function e(e) {
									var t;
									this.comparator = (null != e ? e.comparator : void 0) || function (e, t) {
										return e - t
									},
									this.length = 0,
									this.data = (null != (t = e.initialValues) ? t.slice(0) : void 0) || [],
									this._heapify()
								}
								return e.prototype._heapify = function () {
									var e,
									t,
									a;
									if (this.data.length > 0)
										for (e = t = 1, a = this.data.length; 1 <= a ? t < a : t > a; e = 1 <= a ? ++t : --t)
											this._bubbleUp(e)
								},
								e.prototype.queue = function (e) {
									this.data.push(e),
									this._bubbleUp(this.data.length - 1)
								},
								e.prototype.dequeue = function () {
									var e,
									t;
									return t = this.data[0],
									e = this.data.pop(),
									this.data.length > 0 && (this.data[0] = e, this._bubbleDown(0)),
									t
								},
								e.prototype.peek = function () {
									return this.data[0]
								},
								e.prototype.clear = function () {
									this.length = 0,
									this.data.length = 0
								},
								e.prototype._bubbleUp = function (e) {
									for (var t, a; e > 0 && (t = e - 1 >>> 1, this.comparator(this.data[e], this.data[t]) < 0); )
										a = this.data[t], this.data[t] = this.data[e], this.data[e] = a, e = t
								},
								e.prototype._bubbleDown = function (e) {
									var t,
									a,
									n,
									i,
									r;
									for (t = this.data.length - 1; ; ) {
										if (a = (e << 1) + 1, i = a + 1, n = e, a <= t && this.comparator(this.data[a], this.data[n]) < 0 && (n = a), i <= t && this.comparator(this.data[i], this.data[n]) < 0 && (n = i), n === e)
											break;
										r = this.data[n],
										this.data[n] = this.data[e],
										this.data[e] = r,
										e = n
									}
								},
								e
							}
							()
						}, {}
					]
				}, {}, [1])(1)
			})
		}, function (e, t, a) {
			function n(e) {
				return "string" != typeof e ? e : e in T ? T[e] : (T[e] = new A(e), T[e])
			}
			function i(e) {
				return e in T
			}
			function r() {}
			function o(e, t) {
				for (var a in e) {
					var i = n(a);
					try {
						i.load(e[a]),
						t.resolve()
					} catch (r) {
						console.exception('scene/Scene.load: Failed to load "' + a + '": ', r),
						t.reject()
					}
				}
			}
			function s(t, a) {
				if (!a) {
					if (w.indexOf(t.name) > -1)
						return;
					w.push(t.name)
				}
				e.exports.hooks.every(function (a) {
					return !v[a].hook(t, e.exports.tags)
				}) && console.error("scene/Scene: Request '" + t.name + "': failed to find a hook to satisfy request")
			}
			function c(e) {
				for (var t in T)
					T[t].frame.LCA = {},
				e ? T[t].frame.rootData[e.id] = {}
				 : T[t].frame.rootData = {},
				T[t].frame.last = {},
				T[t].frame.lastUpdate = {
					value: NaN
				}
			}
			function l(e, t) {
				var a = I[e.id];
				if (a && a.rendered)
					for (var n in a.rendered) {
						var i = a.rendered[n],
						r = i.drawn;
						if (t(i.node, i.projectedPosition, r, i.visible))
							return
					}
			}
			function u(e, t) {
				var a = I[e.id],
				n = e.frame;
				for (var i in E)
					if (E[i].enabled && (!(e.name && E[i].cameras && e.name in E[i].cameras) || E[i].cameras[e.name])) {
						var r = D.math.inverse(n.orientation),
						o = D.math.qMulV(r, n.position),
						s = D.math.vAdd(o, E[i].transform.position);
						E[i].transform.parent = e.attachedNode;
						var c = D.math.getMatrix(D.frame.getTransform(E[i].transform));
						c[3][0] = s[0],
						c[3][1] = s[1],
						c[3][2] = s[2],
						a.attachedNode.name in a.rendered || (a.rendered[a.attachedNode.name] = {
								node: a.attachedNode,
								position: s,
								projectedPosition: e.projectPosition(s),
								drawn: []
							}),
						a.rendered[a.attachedNode.name].drawn.push({
							renderable: E[i].renderable,
							position: s
						}),
						t.push({
							renderable: E[i].renderable,
							matrix: c,
							id: {
								node: a.attachedNode
							}
						})
					}
			}
			function d(e, t) {
				var a = D.math.getMatrix(e),
				n = D.math.getTranslation(e);
				if ("rotate" in t)
					if (4 === t.rotate.length)
						for (var i = D.math.qNormalized(t.rotate), r = 0; r < 4; r++)
							a[3][r] = i[r];
					else
						console.warn("Failed to rotate renderable, rotate must be a quaternion");
				if ("translate" in t) {
					n = D.math.vAdd(n, D.math.qMulV(D.math.getRotation(e), t.translate));
					for (var o = 0; o < 3; o++)
						a[3][o] = n[o]
				}
				if ("scale" in t)
					if (3 === t.scale.length)
						for (var s = 0; s < 3; s++)
							for (var c = 0; c < 3; c++)
								a[s][c] *= t.scale[s];
					else
						for (var l = 0; l < 3; l++)
							for (var u = 0; u < 3; u++)
								a[l][u] *= t.scale;
				return {
					matrix: a,
					position: n
				}
			}
			function M(e, t, a, n) {
				var i = I[a.id];
				if (e.renderables) {
					var r = e.renderables.get(a);
					r && r.renderables.length && r.renderables.forEach(function (r) {
						if (r && (!(a.name && r.cameras && a.name in r.cameras) || r.cameras[a.name])) {
							var o = void 0,
							s = void 0;
							if ("enabled" in r.transform && r.transform.enabled) {
								var c = void 0;
								if ("relativeToParent" in r.transform && r.transform.relativeToParent) {
									var l = null;
									if (null !== t && void 0 !== t && t.frame.rootData[a.id] && (l = t.frame.rootData[a.id].thisToRoot), !l)
										return void console.error("No parent transform to be relative to parent in", e.name);
									c = d(l, r.transform)
								} else
									c = d(e.frame.rootData[a.id].thisToRoot, r.transform);
								o = c.matrix,
								s = c.position
							} else
								o = D.math.getMatrix(e.frame.rootData[a.id].thisToRoot), s = D.math.getTranslation(e.frame.rootData[a.id].thisToRoot);
							if (s = D.math.qMulV(D.math.conjugate(a.frame.orientation), D.math.vSub(s, a.frame.position)), o = D.math.toM4(D.math.qMulM3(D.math.conjugate(a.frame.orientation), D.math.toM3(o)), s), !(e.name in i.rendered)) {
								var u = D.math.getTranslation(e.frame.rootData[a.id].thisToRoot),
								M = "enabled" in e.renderables.transform && e.renderables.transform.enabled;
								if (M && "translate" in e.renderables.transform) {
									var g = D.math.getRotation(e.frame.rootData[a.id].thisToRoot),
									p = D.math.qMulV(g, e.renderables.transform.translate);
									u = D.math.vAdd(u, p)
								}
								u = D.math.qMulV(D.math.conjugate(a.frame.orientation), D.math.vSub(u, a.frame.position)),
								i.rendered[e.name] = {
									node: e,
									position: u,
									projectedPosition: a.projectPosition(u),
									drawn: []
								}
							}
							var m = i.rendered[e.name].position;
							"Label" === r.type && (r.data.projectedPosition = a.projectPosition(s), m = s),
							i.rendered[e.name].drawn.push({
								renderable: r,
								position: m
							}),
							n.push({
								renderable: r,
								matrix: o,
								id: {
									node: e
								}
							})
						}
					})
				}
			}
			function g(e, t) {
				return e.near < t.near && (t.far = t.far),
				!0
			}
			function p(e, t, a, n) {
				for (var i in t.relationship.children) {
					var r = t.relationship.children[i];
					r !== a && (M(r, t, e, n), p(e, r, null, n))
				}
			}
			function p(e, t, a, n) {
				for (var i in t.relationship.children) {
					var r = t.relationship.children[i];
					r !== a && (M(r, t, e, n), p(e, r, null, n))
				}
			}
			function m(e) {
				I[e.id] || (I[e.id] = {});
				var t = I[e.id],
				a = t.attachedNode,
				n = null,
				i = [];
				for (t.rendered = {}; a; )
					a.loaded ? (M(a, a.relationship.parent, e, i), p(e, a, n, i), n = a, a = a.relationship.parent) : a = null;
				var r = {},
				o = function (a) {
					var n = t.rendered[a];
					return n.node.ellipsoid || n.drawn.length ? (r[a] = {
							ellipsoid: n.node.ellipsoid || [0, 0, 0],
							rootToThis: n.node.frame.rootData[e.id].rootToThis,
							drawn: []
						}, void n.drawn.forEach(function (e) {
							if ("Label" === e.renderable.type) {
								var t = "Label" === e.renderable.type && "labelType" in e.renderable.data && ("Surface" === e.renderable.data.labelType || "Marker" === e.renderable.data.labelType);
								r[a].drawn.push({
									real: e,
									position: "position" in e ? e.position : n.position,
									self: t
								})
							}
						})) : "continue"
				};
				for (var s in t.rendered) {
					o(s)
				}
				D.math.ellipsoidVisibilityCheck(r, e.frame.position, e.frame.orientation);
				for (var c in r)
					t.rendered[c].visible = r.visible, r[c].drawn.forEach(function (e) {
						e.real.visible = e.visible
					});
				return u(e, i),
				D.settings.usePainters && (i = this.paintersSort(i, e)),
				h.updateLabelSystem(e),
				i
			}
			var A = a(10),
			f = a(3),
			D = a(4),
			N = a(19),
			h = a(22),
			v = {
				fetch: a(37),
				"static": a(40)
			},
			T = {},
			L = [];
			f.scene.tags && (L = L.concat(f.scene.tags.split(",")));
			var y = [];
			f.scene.hooks && (y = y.concat(f.scene.hooks.split(","))),
			0 === y.length && (y = ["static", "fetch"]),
			N.components.scene = function (e, t) {
				for (var a in e)
					switch (a) {
					case "load":
						o(e[a], t);
						break;
					default:
						console.error("scene/Scene update hook: Unknown value", a),
						t.reject()
					}
			};
			var w = [],
			I = {},
			E = {},
			j = function (e, t) {
				var a = [],
				n = [],
				i = [];
				for (var r in e) {
					var o = !1,
					s = [0, 0, 0],
					c = !1;
					if ("boundingEllipsoid" in e[r].renderable ? (o = !0, s = e[r].renderable.boundingEllipsoid) : "ellipsoid" in e[r].id.node && (o = !0, s = e[r].id.node.ellipsoid), o && "Light" !== e[r].renderable.type)
						if ("isOrbit" in e[r].renderable)
							c = e[r].renderable.isOrbit;
						else {
							var l = D.math.getTranslation(e[r].id.node.frame.rootData[t.id].thisToRoot);
							a.push({
								position: e[r].matrix[3].slice(0, 3),
								printPosition: l,
								ellipsoid: s,
								renderable: e[r],
								isOrbit: c
							})
						}
					else
						n.push([e[r]]), i.push({
							near: t.near,
							far: t.far
						})
				}
				for (var u = 0; u < a.length; u++)
					if (Math.max.apply(null, a[u].ellipsoid) > D.math.vNorm(a[u].position))
						a[u].near = t.near, a[u].far = Math.max.apply(null, a[u].ellipsoid);
					else {
						var d = D.math.surfacePointJS(a[u].ellipsoid, a[u].position),
						M = D.math.vSub(d, a[u].position);
						a[u].near = M[2],
						M = D.math.vMul(a[u].position, -1);
						var p = D.math.surfacePointJS(a[u].ellipsoid, M),
						m = D.math.vSub(p, M);
						M = D.math.vMul(M, 2),
						m = D.math.vAdd(m, M),
						a[u].far = m[2],
						a[u].far < 0 && (a[u].far = a[u].near, a[u].near = t.near)
					}
				for (var A = a.length - 1; A >= 0; A--)
					for (var f = 1; f <= A; f++)
						if (a[f - 1].near < a[f].near) {
							var N = a[f - 1];
							a[f - 1] = a[f],
							a[f] = N
						}
				for (var h = 0; h < a.length; h++)
					a[h].far < t.near || a[h].near > t.far ? (a.splice(h, 1), h--) : (a[h].near < t.near && (a[h].near = t.near), a[h].far > t.far && (a[h].far = t.far));
				for (var v = [], T = 0; T < a.length; T++) {
					var L = [];
					L.push(a[T]),
					T--;
					for (var y = 0; y < L.length; y++)
						for (var w = T + 1; w < a.length; w++) {
							var I = L[y].near <= a[w].far && L[y].near >= a[w].near,
							E = L[y].far <= a[w].far && L[y].far >= a[w].near,
							j = a[w].near <= L[y].far && a[w].near >= L[y].near;
							(I || E || j) && g(L[y], a[w]) && (L.push(a[w]), a.splice(w, 1), w--)
						}
					v.push(L)
				}
				for (var x = 0; x < v.length; x++) {
					for (var b = v[x][0].near, S = v[x][0].far, C = 0; C < v[x].length; C++)
						v[x][C].near < b && (b = v[x][C].near), v[x][C].far > S && (S = v[x][C].far);
					i.push({
						near: b,
						far: S
					})
				}
				for (var z = 0; z < v.length; z++) {
					for (var O = [], k = 0; k < v[z].length; k++)
						O.push(v[z][k].renderable);
					n.push(O)
				}
				return n.push(i),
				n
			};
			e.exports = {
				scene: T,
				tags: L,
				hooks: y,
				modules: v,
				request: s,
				get: n,
				has: i,
				load: o,
				update: r,
				clearFrameData: c,
				cameraData: I,
				walk: l,
				getRenderableObjects: m,
				fixedRenderables: E,
				paintersSort: j
			}
		}, function (e, t, a) {
			var n = a(11),
			i = a(4),
			r = a(17);
			e.exports = function (e) {
				var t = {
					name: e,
					contents: {}
				};
				for (var a in n)
					t[a] = new n[a](t);
				return t.triggers = [],
				t.handlingTriggers = !1,
				t.addTrigger = function (e, a) {
					t.loaded && a(t, e),
					t.triggers.push({
						callback: a,
						time: e
					})
				},
				t.handleTriggers = function () {
					t.handlingTriggers || (t.handlingTriggers = !0, t.triggers.forEach(function (e) {
							e.callback(t, e.time)
						}), t.triggers = [], t.handlingTriggers = !1)
				},
				t.triggerLoad = function () {
					i.scene.request(t)
				},
				t.updateFrames = function (e, a) {
					if (!t.loaded)
						return void t.triggerLoad(e.clock);
					var n = t.frame.update(e.clock);
					if (t.relationship.parent && t.relationship.parent !== a && t.relationship.parent.updateFrames(e, t), n)
						for (var i in t.relationship.children) {
							var r = t.relationship.children[i];
							r !== a && r.updateFrames(e, t)
						}
				},
				t.transformToFrame = function (e, a, n) {
					if (t.loaded && t.frame.updateRootData(e, a)) {
						t.relationship.parent && t.relationship.parent !== n && t.relationship.parent.transformToFrame(e, a, t);
						for (var i in t.relationship.children) {
							var r = t.relationship.children[i];
							r !== n && r.transformToFrame(e, a, t)
						}
					}
				},
				t.postCameraUpdate = function (e, a) {
					if (t.loaded) {
						t.renderables && t.renderables.update(e),
						t.relationship.parent && t.relationship.parent !== a && t.relationship.parent.postCameraUpdate(e, t);
						for (var n in t.relationship.children) {
							var i = t.relationship.children[n];
							i !== a && i.postCameraUpdate(e, t)
						}
					}
				},
				t.load = function (e) {
					e = r.replace(e),
					console.verboseInfo("scene/Node.load: loading " + t.name);
					for (var a in e)
						try {
							a in t && t[a].load ? t[a].load(e[a]) : a in n ? (t[a] = new n[a](t), t[a].load(e[a])) : (console.warn("Node.load: In node", t.name, "unknown component", a, "should it be moved to the static section?"), t[a] = JSON.parse(JSON.stringify(e[a])))
						} catch (i) {
							console.exception("Node.load: In node " + t.name + " failed to load component " + a, i)
						}
					return t.loaded ? void console.verboseInfo("scene/Node.load: updated " + t.name) : (console.verboseInfo("scene/Node.load: initial load for " + t.name), t.loaded = !0, t.contents = e, void t.handleTriggers())
				},
				t
			}
		}, function (e, t, a) {
			var n = e.exports;
			n.relationship = a(12),
			n.renderables = a(13),
			n.context = a(14),
			n.frame = a(15),
			n["static"] = function (e) {
				var t = {
					node: e
				};
				return t.load = function (e) {
					for (var a in e)
						t.node[a] = JSON.parse(JSON.stringify(e[a]))
				},
				t
			}
		}, function (e, t, a) {
			var n = a(4),
			i = {};
			e.exports = function (e) {
				var t = {
					node: e,
					children: {}
				};
				return Object.defineProperty(t, "parent", {
					get: function () {
						return i[t.node.name]
					},
					set: function (e) {
						var a = t.node.name;
						if (i[a]) {
							var r = i[a];
							r.relationship.children[a] && delete r.relationship.children[a]
						}
						i[a] = e,
						e && (e.relationship.children[a] = t.node),
						n.scene.clearFrameData()
					}
				}),
				t.load = function (e) {
					for (var a in t.children)
						e.children.indexOf(a) == -1 && delete t.children[a];
					if ("children" in e && e.children.constructor === Array && e.children.forEach(function (e) {
							var a = n.scene.get(e);
							t.children[e] = a,
							i[e] = t.node
						}), e.parent) {
						var r = n.scene.get(e.parent);
						r.addTrigger(null, function () {
							t.parent = r
						}),
						r.triggerLoad()
					}
				},
				t
			}
		}, function (e, t, a) {
			function n(e, t) {
				var a = {
					enabled: !("enabled" in e) || e.enabled,
					json: {},
					ranges: [],
					renderables: {},
					name: t
				};
				return a.addRenderable = function (e, t, n) {
					return t in a.json && (t.match(/(\d+)+$/) ? t = t.replace(/(\d+)+$/, function (e, t) {
								return parseInt(t) + 1
							}) : t += "0"),
					a.json[t] = JSON.parse(JSON.stringify(e)),
					n.renderables.push(t),
					t
				},
				a.emplaceRenderable = function (e, t, n, i) {
					return n in a.json && (n.match(/(\d+)+$/) ? n = n.replace(/(\d+)+$/, function (e, t) {
								return parseInt(t) + 1
							}) : n += "0"),
					a.json[n] = JSON.parse(JSON.stringify(e)),
					i.renderables.push(n),
					a.renderables[n] = t,
					n
				},
				a.removeRenderable = function (e) {
					var t = null,
					n = null,
					i = null;
					e in a.json && (t = a.json[e], delete a.json[e]);
					for (var r in a.ranges) {
						i = a.ranges[r];
						for (var o in i.renderables)
							e == i.renderables[o] && delete i.renderables[o]
					}
					e in a.renderables && (n = a.renderables[e], delete a.renderables[e]);
					var s = {
						json: t,
						renderable: n
					};
					return s
				},
				a.getRange = function (e) {
					var t;
					for (var n in a.ranges)
						if (t = a.ranges[n], t.end == e.end && t.start == e.start)
							break;
					return t || console.log("Range object Not Found, Params provided: ", e),
					t
				},
				a.resolveRanges = function () {
					var e = [];
					for (var t in a.ranges) {
						var n = a.ranges[t];
						n.name = t,
						e.push(n)
					}
					e = e.sort(function (e, t) {
							var a = e.end - t.end;
							return 0 === a ? e.start - t.start : a
						});
					for (var i = 0; i < e.length - 1; i++)
						e[i].end === 1 / 0 && (e[i].end = e[i + 1].start);
					for (i = 1; i < e.length; i++)
						e[i].start = e[i - 1].end;
					a.ranges = e
				},
				a.getRenderables = function (e, t) {
					var n = [];
					for (var i in a.ranges) {
						var r = a.ranges[i],
						o = e.getEnd(r.end, a.name);
						if (!(r.start > t || o <= t))
							for (var s in r.renderables) {
								var c = r.renderables[s];
								if (c in a.renderables) {
									var l = a.renderables[c];
									"enabled" in l && !l.enabled || l.valid && n.push(l)
								}
							}
					}
					return n
				},
				a.getRenderable = function (e, t) {
					var n;
					return t in a.json ? (!(t in a.renderables) && t in a.json && (!a.json[t] || "null" === a.json[t].type || a.json[t].failed ? n = null : (n = new i.Renderable(i.app.core, e.node.context, a.json[t]), "boundingEllipsoid" in a.json[t] && (n.boundingEllipsoid = a.json[t].boundingEllipsoid), "isOrbit" in a.json[t] && (n.isOrbit = a.json[t].isOrbit), n || (console.error("scene/components/renderables.update: Failed to instantiate renderable", t, " in lod ", a, " in node ", e.node.name), a.json[t].failed = !0), "enabled" in a.json[t] && (n.enabled = a.json[t].enabled), "cameras" in a.json[t] && (n.cameras = JSON.parse(JSON.stringify(a.json[t].cameras)))), a.renderables[t] = n, e.updateTransforms()), n = a.renderables[t]) : n
				},
				a.updateRenderableTransform = function (e, t, n) {
					var i,
					r;
					n in a.json && (i = a.json[n], r = a.getRenderable(e, n), null !== i || void 0 !== i ? i.transform = t : console.error("LOD updateRenderableTransform: Json for Renderable is null or undefined: ", n), null !== r || void 0 !== r ? r.transform = t : console.error("LOD updateRenderableTransform: Renderable is null or undefined: ", n))
				},
				a.update = function (e, n, r) {
					for (var o in a.ranges) {
						var s = a.ranges[o],
						c = e.getEnd(s.end, t);
						if (!(s.start > r || c <= r))
							for (var l in s.renderables) {
								var u,
								d = s.renderables[l];
								!(d in a.renderables) && d in a.json && (!a.json[d] || "null" === a.json[d].type || a.json[d].failed ? u = null : (u = new i.Renderable(i.app.core, e.node.context, a.json[d]), "boundingEllipsoid" in a.json[d] && (u.boundingEllipsoid = a.json[d].boundingEllipsoid), "isOrbit" in a.json[d] && (u.isOrbit = a.json[d].isOrbit), u || (console.error("scene/components/renderables.update: Failed to instantiate renderable", d, " in lod ", a, " in node ", e.node.name), a.json[d].failed = !0), "enabled" in a.json[d] && (u.enabled = a.json[d].enabled), "cameras" in a.json[d] && (u.cameras = JSON.parse(JSON.stringify(a.json[d].cameras)))),
									a.renderables[d] = u, e.updateTransforms()),
								u = a.renderables[d],
								u && (u.valid = u.postCameraUpdate(n))
							}
					}
				},
				a
			}
			var i = a(4);
			e.exports = function (e) {
				var t = {
					node: e,
					lod: {}
				};
				return t.transform = {
					enabled: !1
				},
				t.resolveRanges = function (e) {
					if (e)
						t.lod[e].resolveRanges();
					else
						for (var a in t.lod)
							t.lod[a].resolveRanges()
				},
				t.addRenderable = function (e, a, n, i) {
					a = a ? a : "renderable",
					n = n ? n : "lod0",
					i = i ? i : {
						start:  - (1 / 0),
						end: 1 / 0
					},
					n in t.lod || t.addLOD(i, n);
					var r = t.lod[n],
					o = r.getRange(i);
					o || (o = {
							start: "start" in e ? e.start :  - (1 / 0),
							end: "end" in e ? e.end : 1 / 0,
							renderables: []
						}, r.ranges.push(o));
					var s = r.addRenderable(e, a, o);
					return t.resolveRanges(),
					s
				},
				t.emplaceRenderable = function (e, a, n, i, r) {
					n = n ? n : "renderable",
					i = i ? i : "lod0",
					r = r ? r : {
						start:  - (1 / 0),
						end: 1 / 0
					},
					i in t.lod || t.addLOD(r, i);
					var o = t.lod[i],
					s = o.getRange(r);
					s || (s = {
							start: "start" in e ? e.start :  - (1 / 0),
							end: "end" in e ? e.end : 1 / 0,
							renderables: []
						}, o.ranges.push(s));
					var c = o.emplaceRenderable(e, a, n, s);
					return t.resolveRanges(),
					c
				},
				t.removeRenderable = function (e, a) {
					var n,
					i = 0,
					r = null;
					if (a)
						return a in t.lod ? (n = t.lod[a], r = n.removeRenderable(e)) : (console.warn("RemoveRenderable: lodKey not Found in Renderables.lod. lodKey: ", a), null);
					for (var o in t.lod)
						n = t.lod[o], e in n.renderables && (i += 1, r || (r = n.removeRenderable(e)));
					return i > 1 && console.warn("RemoveRenderable: Found more than one Renderable object. Removing the first renderable found."),
					r
				},
				t.deleteRenderable = function (e, a) {
					var n = null,
					i = null;
					if (n = t.removeRenderable(e, a)) {
						var r = n.renderable;
						i = n.json,
						r && r["delete"]()
					}
					return i
				},
				t.updateRenderableTransform = function (e, a, n) {
					var i;
					if (n) {
						if (!(n in t.lod))
							return void console.warn("UpdateRenderableTransform: lodKey not Found in Renderables.lod. lodKey: ", n);
						i = t.lod[n],
						a in i.json && (n in t.transform || (t.transform[n] = {}), t.transform[n][a] = e)
					} else
						for (var r in t.lod)
							i = t.lod[r], a in i.json && (r in t.transform || (t.transform[r] = {}), t.transform[r][a] = e);
					t.updateTransforms()
				},
				t.getRenderable = function (e, a) {
					var n,
					i,
					r = 0;
					if (a)
						return a in t.lod ? (i = t.lod[a], n = i.getRenderable(t, e)) : (console.warn("GetRenderable: lodKey not Found in Renderables.lod. lodKey: ", a), null);
					for (var o in t.lod)
						i = t.lod[o], e in i.renderables && (r += 1, void 0 === n && (n = i.getRenderable(t, e)));
					return r > 1 && console.warn("GetRenderable: Found more than one Renderable object. Returning the first renderable found."),
					n
				},
				t.lodEnabled = function (e, a) {
					return e in t.lod && (t.lod[e].enabled = a, !0)
				},
				t.addLOD = function (e, a, i) {
					a in t.lod || (t.lod[a] = n(e, a));
					var r = {
						start: "start" in e ? e.start :  - (1 / 0),
						end: "end" in e ? e.end : 1 / 0,
						renderables: []
					};
					if (t.lod[a].ranges.push(r), e.renderables) {
						if ("type" in e.renderables)
							return void t.addRenderable(e.renderables, i ? i : a, a, r);
						for (var o in e.renderables)
							t.addRenderable(e.renderables[o], o, a, r)
					}
				},
				t.load = function (e) {
					if ("renderables" in e)
						return t.addLOD(e, "lod0"), void t.resolveRanges();
					for (var a in e)
						if (e[a].constructor === Array)
							e[a].forEach(function (e) {
								t.addLOD(e, a)
							});
						else if ("renderables" in e[a])
							t.addLOD(e[a], a);
						else
							for (var n in e[a])
								t.addLOD(e[a][n], a, n);
					t.resolveRanges()
				},
				t.getEnd = function (e, a) {
					var n = e,
					i = !1,
					r = 1;
					if (t.transform.enabled && "scale" in t.transform && (i = !0, r = 3 === t.transform.scale.length ? Math.max(t.transform.scale[0], t.transform.scale[1], t.transform.scale[2]) : t.transform.scale), a in t.transform)
						for (var o in t.transform[a]) {
							var s = t.transform[a][o],
							c = 1;
							if ("scale" in s && (c = 1 === s.scale.length ? s.scale : Math.max(s.scale[0], s.scale[1], s.scale[2])), "override" in s && s.override) {
								var l = e + Math.log(c);
								l > n && (n = l)
							} else {
								var u = e + Math.log(c * r);
								u > n && (n = u)
							}
						}
					else {
						var d = e + Math.log(r);
						d > n && (n = d)
					}
					return n
				},
				t.getTransform = function (e) {
					var t = [1, 1, 1],
					a = [0, 0, 0],
					n = [0, 0, 0, 1],
					i = !1,
					r = !1;
					if (!("enabled" in e && e.enabled))
						return {
							enabled: r
						};
					if (r = !0, "scale" in e)
						if (3 === e.scale.length)
							for (var o = 0; o < 3; o++)
								t[o] = e.scale[o];
						else
							for (var s = 0; s < 3; s++)
								t[s] = e.scale;
					if ("translate" in e && 3 === e.translate.length)
						for (var c = 0; c < 3; c++)
							a[c] = e.translate[c];
					if ("rotate" in e && 4 === e.rotate.length)
						for (var l = 0; l < 4; l++)
							n[l] = e.rotate[l];
					return "relativeToParent" in e && (i = e.relativeToParent), {
						scale: t,
						translate: a,
						rotate: n,
						enabled: r,
						relativeToParent: i
					}
				},
				t.updateTransforms = function () {
					var e = t.getTransform(t.transform);
					for (var a in t.lod)
						if (a in t.transform)
							for (var n in t.lod[a].renderables) {
								var i = "ignoreNodeTransform" in t.lod[a].renderables[n].transform;
								if (!i || !t.lod[a].renderables[n].transform.ignoreNodeTransform)
									if (n in t.transform[a]) {
										var r = t.getTransform(t.transform[a][n]);
										"override" in t.transform[a][n] && t.transform[a][n].override ? t.lod[a].renderables[n].transform = r : t.lod[a].renderables[n].transform = t.combineTransforms(e, r)
									} else
										t.lod[a].renderables[n].transform = e
							}
						else
							for (var o in t.lod[a].renderables) {
								var s = "ignoreNodeTransform" in t.lod[a].renderables[o].transform;
								s && t.lod[a].renderables[o].transform.ignoreNodeTransform || (t.lod[a].renderables[o].transform = e)
							}
				},
				t.combineTransforms = function (e, t) {
					if (!t.enabled)
						return e;
					if (!e.enabled)
						return t;
					var a = [e.scale[0] * t.scale[0], e.scale[1] * t.scale[1], e.scale[2] * t.scale[2]],
					n = [t.translate[0] * e.scale[0] + e.translate[0], t.translate[1] * e.scale[1] + e.translate[1], t.translate[2] * e.scale[2] + e.translate[2]],
					r = i.math.qMulQ(e.rotate, t.rotate);
					return {
						scale: a,
						translate: n,
						rotate: r,
						enabled: !0
					}
				},
				t.update = function (e) {
					if (t.node.loaded && t.node.frame.rootData[e.id]) {
						var a = Math.log(t.node.frame.getDistance(e));
						for (var n in t.lod) {
							var i = t.lod[n];
							i.enabled && i.update(t, e, a)
						}
					}
				},
				t.get = function (e) {
					if (t.node.loaded && t.node.frame.rootData[e.id]) {
						var a = {
							renderables: [],
							transform: t.node.frame.rootData[e.id].thisToRoot
						},
						n = Math.log(t.node.frame.getDistance(e));
						for (var i in t.lod) {
							var r = t.lod[i];
							r.enabled && (a.renderables = a.renderables.concat(r.getRenderables(t, n)))
						}
						return a
					}
				},
				t
			}
		}, function (e, t, a) {
			var n = a(4);
			e.exports = n.DataContext.extend("DataContext", {
					__construct: function () {
						this.__parent.__construct.call(this, n.app)
					},
					load: function (e) {
						for (var t in e)
							for (var a in e[t])
								this.emplace(t, a, e[t][a])
					}
				})
		}, function (e, t, a) {
			var n = a(11),
			i = a(4),
			r = a(16);
			e.exports = function (e) {
				var t = {
					node: e,
					forceParent: null,
					lastUpdate: NaN,
					LCA: {},
					rootData: {},
					updateCallbacks: new r
				};
				return t.invalidate = function () {
					t.lastUpdate = NaN,
					t.LCA = {},
					t.rootData = {},
					t.last && delete t.last
				},
				t.load = function (e) {
					"parent" in e && "string" == typeof e.parent && (t.forceParent = i.scene.get(e.parent));
					var a = [0, 0, 0];
					"position" in e && (a = e.position);
					var r = [0, 0, 0, 1];
					"orientation" in e && (r = e.orientation),
					t.node.context || (t.node.context = new n.context(t.node)),
					t.node.context.emplace("position", "frame", a),
					t.node.context.emplace("orientation", "frame", r),
					t.invalidate()
				},
				Object.defineProperty(t, "parent", {
					get: function () {
						return t.forceParent ? t.forceParent : t.node.relationship.parent
					}
				}),
				t.get = function (e) {
					if (t.last && t.last.time === e.value)
						return t.last;
					var a = {
						parent: t.parent,
						position: t.node.context.get("position", "frame"),
						orientation: t.node.context.get("orientation", "frame"),
						time: e.value
					};
					return a.position && (a.position = a.position.evaluate(e)),
					a.orientation && (a.orientation = a.orientation.evaluate(e)),
					a.position && a.orientation ? (t.last = a, a) : void 0
				},
				t.update = function (e) {
					if (!t.node.loaded)
						return !1;
					if (t.lastUpdate === e.time.value)
						return !0;
					if (!t.node.context.contains("position", "frame") || !t.node.context.contains("orientation", "frame"))
						return !1;
					t.node.context.get("position", "frame").update(e),
					t.node.context.get("orientation", "frame").update(e);
					var a = t.get(e.time);
					if (!a)
						return t.node.context.erase("vector3", "frame"), t.node.context.erase("quaternion", "frame"), t.node.context.erase("affine3", "parentToThis"), t.node.context.erase("affine3", "thisToParent"), !1;
					var n = i.frame.getTransformInverse(a),
					r = i.frame.getTransform(a);
					return t.node.context.emplace("vector3", "frame", a.position),
					t.node.context.emplace("quaternion", "frame", a.orientation),
					t.node.context.emplace("affine3", "parentToThis", n),
					t.node.context.emplace("affine3", "thisToParent", r),
					t.updateCallbacks.trigger(t.node),
					t.lastUpdate = e.time.value,
					!0
				},
				t.findLCA = function (e) {
					for (var a = [], n = [], i = t.node; i && i.loaded; i = i.frame.parent) {
						if (i.frame.LCA[e.name])
							return t.LCA[e.name] = i.frame.LCA[e.name], t.LCA[e.name];
						n.push(i)
					}
					for (i = e; i && i.loaded; i = i.frame.parent)
						a.push(i);
					if (a.length !== n.length)
						for (var r = a.length > n.length ? a : n, o = Math.abs(a.length - n.length); o--; )
							r.shift();
					return t.LCA[e.name] = a.length ? a[0] : null,
					t.LCA[e.name]
				},
				t.getDistance = function (e) {
					if (t.node.loaded && t.rootData[e.id]) {
						var a = i.math.getTranslation(t.rootData[e.id].thisToRoot);
						return a = i.math.qMulV(i.math.conjugate(e.frame.orientation), i.math.vSub(a, e.frame.position)),
						i.math.vNorm(a)
					}
				},
				t.updateRootData = function (e, a) {
					if (!t.node.loaded || !e.parent || !e.parent.loaded)
						return !1;
					var n = e.parent.name;
					if (!t.LCA[n] && !t.findLCA(e.parent))
						return !1;
					if (t.rootData[a.id])
						return !0;
					var r,
					o,
					s;
					if (!t.LCA[n].frame.rootData[a.id]) {
						var c = e.parent;
						if (c.frame.lastUpdate !== e.time && !c.frame.update({
								time: {
									value: e.time
								},
								rate: 0
							}))
							return !1;
						c.frame.rootData[a.id] || (s = {
								parent: e.parent,
								position: e.position,
								orientation: e.orientation,
								time: e.time
							}, r = i.frame.getTransform(s), o = i.frame.getTransformInverse(s), c.context.replace("affine3", "rootToThis" + a.id, r), c.context.replace("affine3", "thisToRoot" + a.id, o), c.frame.rootData[a.id] = {
								frame: s,
								rootToThis: r,
								thisToRoot: o
							});
						for (var l = c, u = c.frame.rootData[a.id]; c !== t.LCA[n]; ) {
							if (!c.frame.last.parent && !c.frame.update({
									time: {
										value: e.time
									},
									rate: 0
								}))
								return !1;
							c = c.frame.last.parent;
							var d = u;
							if (!c)
								return !1;
							if (c.frame.lastUpdate !== e.time && !c.frame.update({
									time: {
										value: e.time
									},
									rate: 0
								}))
								return !1;
							c.frame.rootData[a.id] || (r = i.math.aMulA(l.context.get("affine3", "thisToParent"), d.rootToThis), o = i.math.aMulA(d.thisToRoot, l.context.get("affine3", "parentToThis")), c.context.replace("affine3", "rootToThis" + a.id, r), c.context.replace("affine3", "thisToRoot" + a.id, o), s = {
									parent: e.parent,
									position: i.math.getTranslation(o),
									orientation: i.math.qMulQ(c.frame.last.orientation, d.frame.orientation),
									time: e.time
								}, c.frame.rootData[a.id] = {
									frame: s,
									rootToThis: r,
									thisToRoot: o
								}),
							u = c.frame.rootData[a.id],
							l = c
						}
					}
					if (t.node === t.LCA[n])
						return !0;
					if (t.lastUpdate !== e.time && !t.update({
							time: {
								value: e.time
							},
							rate: 0
						}))
						return !1;
					if (t.parent.frame.lastUpdate !== e.time)
						return console.error("scene/component/frame/updateRootData: Children came before parents"), !1;
					var M = t.parent.frame.rootData[a.id];
					return r = i.math.aMulA(t.node.context.get("affine3", "parentToThis"), M.rootToThis),
					o = i.math.aMulA(M.thisToRoot, t.node.context.get("affine3", "thisToParent")),
					t.node.context.replace("affine3", "rootToThis" + a.id, r),
					t.node.context.replace("affine3", "thisToRoot" + a.id, o),
					s = {
						parent: e.parent,
						position: i.math.getTranslation(o),
						orientation: i.math.qMulQ(t.last.orientation, M.frame.orientation),
						time: e.time
					},
					t.rootData[a.id] = {
						frame: s,
						rootToThis: r,
						thisToRoot: o
					},
					!0
				},
				t.convert = function (e, a) {
					var n,
					r = a;
					if ("undefined" != typeof r && "id" in r && (n = r, r = t.lastUpdate), "undefined" == typeof r ? r = "undefined" == typeof e.time ? t.lastUpdate : e.time : "number" != typeof r && "value" in r && (r = r.value), isNaN(r) && (r = e.time), !n)
						for (var o in t.rootData)
							t.rootData[o].frame.time === r && (n = {
									id: o
								});
					"time" in e && r !== e.time && console.warn("scene/components/frame.convert: Asked to convert frames across time");
					var s = {
						parent: e.parent,
						position: e.position.slice(),
						orientation: e.orientation.slice(),
						time: r
					};
					if (e.parent === t.node)
						return s;
					if (s.parent = null, !e.parent || !t.node.loaded || !e.parent.loaded)
						return s;
					var c,
					l;
					if (n)
						c = t.node.context.get("affine3", "rootToThis" + n.id), l = e.parent.context.get("affine3", "thisToRoot" + n.id);
					else {
						console.warn("scene/components/frame.convert: Expensive frame transform. Try re-using global update data by specifying a root id or a recent update time");
						var u = t.findLCA(e.parent),
						d = e.parent.frame.findLCA(t.node);
						if (!u || !d)
							return s;
						var M;
						for (c = i.frame.getTransform({
									parent: null,
									position: [0, 0, 0],
									orientation: [0, 0, 0, 1]
								}), M = t.parent; M !== u; M = M.frame.parent) {
							if (!M || !M.loaded || !M.context.contains("affine3", "parentToThis"))
								return s;
							c = i.math.aMulA(c, M.context.get("affine3", "parentToThis"))
						}
						for (l = i.frame.getTransform({
									parent: null,
									position: [0, 0, 0],
									orientation: [0, 0, 0, 1]
								}), M = e.parent; M !== u; M = M.frame.parent) {
							if (!M || !M.loaded || !M.context.contains("affine3", "thisToParent"))
								return s;
							l = i.math.aMulA(M.context.get("affine3", "thisToParent"), l)
						}
					}
					return c && l ? (s.parent = t.node, s.position = i.math.aMulV(c, i.math.aMulV(l, e.position)), s.orientation = i.math.qMulQ(i.math.getRotation(c), i.math.qMulQ(i.math.getRotation(l), e.orientation)), s) : s
				},
				t.load({}),
				t
			}
		}, function (e, t) {
			e.exports = function () {
				var e = {};
				return e.callbacks = [],
				e.push = function (t, a) {
					var n = {};
					return n[t] = a,
					e.callbacks.push(n),
					e.callbacks.length
				},
				e.unshift = function (t, a) {
					var n = {};
					return n[t] = a,
					e.callbacks.unshift(n),
					e.callbacks.length
				},
				e.insert = function (t, a, n) {
					var i = {};
					return i[t] = a,
					e.callbacks.splice(n, 0, i),
					e.callbacks.length
				},
				e.pop = function () {
					return e.callbacks.pop()
				},
				e.shift = function () {
					return e.callbacks.shift()
				},
				e.remove = function (t) {
					var a,
					n = -1;
					for (var i in e.callbacks)
						if (t in e.callbacks[i]) {
							n = i,
							a = e.callbacks[i];
							break
						}
					return n > -1 && e.callbacks.splice(n, 1),
					a
				},
				e.trigger = function () {
					for (var t in e.callbacks)
						for (var a in e.callbacks[t])
							e.callbacks[t][a].apply(null, arguments)
				},
				e.toString = function () {
					var t = "";
					for (var a in e.callbacks)
						for (var n in e.callbacks[a])
							t += "{ " + n + " : " + e.callbacks[a][n] + "} ";
					return t
				},
				e
			}
		}, function (e, t, a) {
			function n(e, t) {
				if (e[0] !== e[0].toUpperCase())
					return void console.error("scene/template: Template named must begin with Upper case");
				var a = r[e];
				if (a) {
					if (t || (t = {}), "function" == typeof a)
						a = a(t);
					else {
						for (var i in a.parameters)
							i in t || (t[i] = a.parameters[i]);
						for (i in t)
							i[0] === i[0].toUpperCase() && console.error("scene/template: Upper case parameter names are not allowed:", i, "in", e);
						a = a.value
					}
					return JSON.parse(JSON.stringify(a), function (e, a) {
						var i;
						if ("string" == typeof a && "$" === a[0]) {
							var r = a.slice(1);
							return r[0] === r[0].toUpperCase() ? "0" === e ? a : (i = n(r), "undefined" != typeof i ? i : a) : r in t ? JSON.parse(JSON.stringify(t[r])) : (console.warn("scene/template: Missing parameter", "$" + r), a)
						}
						return Array.isArray(a) && a.length >= 1 && "string" == typeof a[0] && "$" === a[0][0] ? (a.length > 2 && console.warn("scene/template: Template template array has extra elements:", a), i = n(a[0].slice(1), a[1]), "undefined" != typeof i ? i : a) : a
					})
				}
			}
			function i(e) {
				return JSON.parse(JSON.stringify(e), function (e, t) {
					var a;
					return "string" == typeof t && "0" !== e && "$" === t[0] ? a = n(t.slice(1)) : Array.isArray(t) && t.length >= 1 && "string" == typeof t[0] && "$" === t[0][0] && (t.length > 2 && console.warn("scene/template: Template array has extra elements:", t), a = n(t[0].slice(1), t[1])),
					"undefined" != typeof a && (t = a),
					t
				})
			}
			var r = a(18);
			e.exports = {
				templates: r,
				getTemplate: n,
				replace: i
			}
		}, function (e, t) {
			e.exports = {
				RenderableStarsAndGalaxies: {
					value: {
						type: "particles",
						attributes: {
							meshColor: {
								load: ["var f = function(buffer, count, stride, ctx) {", "  var current = 0;", "  var stars = ctx.data.object.stars;", "  var names = Object.keys(stars);", "  while(current < names.length) {", "    buffer[current * stride + 0] = stars[names[current]].r/255;", "    buffer[current * stride + 1] = stars[names[current]].g/255;", "    buffer[current * stride + 2] = stars[names[current]].b/255;", "    current++;", "  }", "}; f"],
								type: "vec3"
							},
							absMag: {
								load: ["var f = function(buffer, count, stride, context) {", "  var current = 0;", "  var stars = context.data.object.stars;", "  var names = Object.keys(stars);", "  while(current < names.length) {", "    buffer[current * stride + 0] = stars[names[current]].absMag;", "    current++;", "  }", "}; f"],
								type: "float"
							},
							position: {
								load: ["var f = function(buffer, count, stride, context) {", "var current = 0;", "var stars = context.data.object.stars;", "var names = Object.keys(stars);", "while(current < names.length) {", "   buffer[current * stride + 0] = stars[names[current]].x;", "   buffer[current * stride + 1] = stars[names[current]].y;", "   buffer[current * stride + 2] = stars[names[current]].z;", "   current++;", "   }", "}; f"],
								type: "vec3"
							}
						},
						material: {
							lightingModel: "none",
							bindings: {
								sampler2D: {
									color: {
										texture: "data://textures/gradientBall.png",
										uv: "gl_PointCoord"
									}
								},
								"function": {
									"float": {
										fov: ["var f = function(context, camera) {", "   return camera.fov;", "}; f"]
									}
								}
							},
							channel: {
								pointSize: {
									input: {
										"float": ["absMag"]
									},
									code: "$sizingFunction",
									uniform: {
										vec2: ["viewport"],
										"float": ["fov"]
									}
								}
							},
							vertexDefaults: ["color", "Position", "pointSize", "absMag:float"],
							vertex: ["vertex/star"]
						},
						queue: "transparent",
						ready: ["var f = function(context) {", "   var stars = {};", "   var ctx = context.get('JSDataSource');", "   if ( ctx && Object.keys(ctx).every(function(d, i) { var item = ctx[d]; return item && item.data && Object.keys(item.data).length; } ) ) {", "     var datasets = ctx;", "     var datasetNames = Object.keys(ctx);", "     datasetNames.forEach( function (d) {", "       Object.keys(datasets[d].data).forEach ( function (entry) {", "       stars[d+entry] = datasets[d].data[entry];", "     });", "    });", "    context.data.object = context.data.object || {};", "    context.data.object.stars = stars;", "    return true;", "   }", "}; f"],
						states: [{
								enabled: !0,
								mask: !1,
								type: "depth"
							}, {
								destination: "one",
								equation: "add",
								source: "srcAlpha",
								type: "blend"
							}
						],
						uniforms: {
							count: {
								load: ["var f = function(context) {", "   return context.data.object.stars ? Object.keys(context.data.object.stars).length - 2 : 0", "}; f"],
								type: "int"
							}
						}
					},
					parameters: {
						sizingFunction: []
					}
				},
				RenderableKeplerOrbitLines: {
					value: {
						boundingEllipsoid: [0, 0, 0],
						isOrbit: !0,
						type: "particles",
						transform: {
							relativeToParent: !0,
							enabled: !0,
							ignoreNodeTransform: !0
						},
						queue: "orbit",
						primitive: "lineStrip",
						attributes: {
							position: {
								type: "vec3",
								load: ["var f = function(buffer, count, stride, context) {", "   if(!context.contains('kepler', 'orbit')) {", "       console.error('RenderableKeplerOrbitLines: missing kepler orbit data in context');", "       return false;", "   }", "   for(var item = 0; item < count; item++) {", "       var pos = __ranger.math.keplerOrbit(context.data.kepler.orbit, item / (count - 1.0));", "       buffer[item * stride + 0] = pos[0];", "       buffer[item * stride + 1] = pos[1];", "       buffer[item * stride + 2] = pos[2];", "   }", "}; f"]
							},
							Index: {
								type: "float",
								load: ["var f = function(buffer, count, stride, context) {", "   if(!context.contains('kepler', 'orbit')) {", "       console.error('RenderableKeplerOrbitLines: missing kepler orbit data in context');", "       return false;", "   }", "   for(var item = 0; item < count; item++)", "       buffer[item * stride] = item / (count - 1.0);", "}; f"]
							}
						},
						uniforms: {
							count: {
								type: "int",
								value: "$count"
							},
							curIndex: {
								type: "float",
								value: 0,
								update: ["var f = function(camera, value, context) {", "   if(!context.contains('kepler', 'orbit')) {", "       console.error('RenderableKeplerOrbitLines: missing kepler orbit data in context');", "       return 0;", "   }", "    value = ((camera.clock.time.value - context.data.kepler.orbit.epoch) / context.data.kepler.orbit.period) % 1.0;", "    if(value < 0)", "       value += 1;", "", "   return value;", "}; f"]
							}
						},
						material: {
							lightingModel: "none",
							bindings: {
								"float": {
									curIndex: 0
								},
								vec4: {
									color: "$color"
								}
							},
							channel: {
								color: {
									uniform: {
										"float": ["curIndex"]
									},
									operations: [{
											op: "assign",
											sample: "ret * mod(vIndex - curIndex, 1.0)",
											sampleIsCall: !1
										}
									]
								}
							},
							vertexDefaults: ["Position", "Index:float"]
						}
					},
					parameters: {
						count: 1e3,
						color: [1, 1, 1, 1]
					}
				},
				RenderableProjectedMap: {
					value: {
						type: "projectedMap",
						maxVerts: "$maxVerts",
						projection: "$projection",
						normal: "$normal",
						tangent: "$tangent",
						renderBack: "renderBack",
						material: "$material"
					},
					parameters: {
						maxVerts: 75e3,
						normal: 6,
						tangent: !0,
						renderBack: !0
					}
				},
				MaterialPhongTexture: {
					value: {
						bindings: {
							vec4: {
								color: "$color",
								specular: "$specularColor"
							},
							"float": {
								specularStrength: "$specularStrength",
								specularExponent: "$specularExponent"
							},
							sampler2D: {
								color: {
									uv: "vuv0",
									texture: "$texture"
								}
							}
						}
					},
					parameters: {
						color: [1, 1, 1, 1],
						specularColor: [1, 1, 1, 1],
						specularStrength: 0,
						specularExponent: 1
					}
				},
				MaterialNeutralPhongTexture: {
					value: {
						bindings: {
							vec4: {
								color: "$color",
								specular: "$specularColor",
								neutralLighting: "$neutralColor"
							},
							"float": {
								specularStrength: "$specularStrength",
								specularExponent: "$specularExponent"
							},
							sampler2D: {
								color: {
									uv: "vuv0",
									texture: "$texture"
								}
							}
						}
					},
					parameters: {
						color: [1, 1, 1, 1],
						specularColor: [1, 1, 1, 1],
						neutralColor: [1, 1, 1, 1],
						specularStrength: 0,
						specularExponent: 1
					}
				},
				MaterialNeutralPhongTextureCube: {
					value: {
						channel: {
							color: {
								include: ["channel/cubemap"],
								uniform: {
									sampler2D: ["cube0", "cube1", "cube2", "cube3", "cube4", "cube5"]
								},
								operations: [{
										op: "assign",
										sample: "sampleCube(cube0, cube1, cube2, cube3, cube4, cube5, getCubeUV(vuv0))",
										sampleIsCall: !1
									}
								]
							}
						},
						bindings: {
							vec4: {
								color: "$color",
								specular: "$specularColor",
								neutralLighting: "$neutralColor"
							},
							vec3: {
								ambientLight: "$ambientLight"
							},
							"float": {
								specularStrength: "$specularStrength",
								specularExponent: "$specularExponent"
							},
							sampler2D: {
								cube0: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 0,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube1: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 1,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube2: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 2,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube3: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 3,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube4: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 4,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube5: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 5,
											params: "$cubeTemplateParams"
										}
									]
								}
							}
						}
					},
					parameters: {
						color: [1, 1, 1, 1],
						specularColor: [1, 1, 1, 1],
						neutralColor: [1, 1, 1, 1],
						specularStrength: 0,
						specularExponent: 1,
						ambientLight: [.1, .1, .1],
						cubeTemplate: "$StringPrefixIndexSuffix",
						cubeTemplateParams: {}
					}
				},
				MaterialPhongCubeSpecularNormTexture: {
					value: {
						channel: {
							color: {
								include: ["channel/cubemap"],
								uniform: {
									sampler2D: ["cube0", "cube1", "cube2", "cube3", "cube4", "cube5"]
								},
								operations: [{
										op: "assign",
										sample: "sampleCube(cube0, cube1, cube2, cube3, cube4, cube5, getCubeUV(vuv0))",
										sampleIsCall: !1
									}
								]
							},
							normal: {
								include: ["channel/unpackNormal", "channel/unpackedTangent"],
								uniform: {
									sampler2D: ["norm"]
								},
								operations: [{
										op: "assign",
										sample: "unpackNormal(texture2D(norm, vuv0))",
										sampleIsCall: !1,
										extract: "normalFromTangent",
										extractIsCall: !0
									}
								]
							}
						},
						bindings: {
							vec4: {
								color: "$color",
								specular: "$specularColor"
							},
							"float": {
								specularStrength: "$specularStrength",
								specularExponent: "$specularExponent"
							},
							sampler2D: {
								cube0: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 0,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube1: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 1,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube2: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 2,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube3: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 3,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube4: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 4,
											params: "$cubeTemplateParams"
										}
									]
								},
								cube5: {
									uv: "vuv0",
									texture: ["$cubeTemplate", {
											index: 5,
											params: "$cubeTemplateParams"
										}
									]
								},
								norm: {
									uv: "vuv0",
									texture: "$normalTexture"
								},
								specular: {
									uv: "vuv0",
									texture: "$specularTexture"
								}
							}
						}
					},
					parameters: {
						color: [1, 1, 1, 1],
						specularColor: [1, 1, 1, 1],
						specularStrength: 0,
						specularExponent: 1,
						cubeTemplate: "$StringPrefixIndexSuffix",
						cubeTemplateParams: {},
						normTemplate: "$StringPrefixIndexSuffix",
						normTemplateParams: {}
					}
				},
				StringPrefixIndexSuffix: function (e) {
					for (var t = "", a = "", n = ""; e; e = e.params)
						"prefix" in e && (t = e.prefix), "index" in e && (a = e.index), "suffix" in e && (n = e.suffix);
					return t + a + n
				},
				MaterialPhongTextureSpecularMap: {
					value: {
						bindings: {
							vec4: {
								color: "$color",
								specular: "$specularColor"
							},
							"float": {
								specularStrength: "$specularStrength",
								specularExponent: "$specularExponent"
							},
							sampler2D: {
								color: {
									uv: "vuv0",
									texture: "$texture"
								},
								specular: {
									uv: "vuv0",
									texture: "$specular"
								}
							}
						}
					},
					parameters: {
						color: [1, 1, 1, 1],
						specularColor: [1, 1, 1, 1],
						specularStrength: 0,
						specularExponent: 1
					}
				}
			}
		}, function (e, t, a) {
			function n(e, t, a) {
				a = a || __ranger.update.send || function () {},
				r(e, null, a)
			}
			var i = a(20),
			r = new i;
			e.exports = {
				components: r.components,
				update: n
			}
		}, function (e, t, a) {
			function n(e, t) {
				var a = {
					_previousLink: e,
					_functionForThisLink: t,
					resolve: function (e, t) {
						var a = t || "";
						a = this._functionForThisLink(e, a, !0),
						this._previousLink.resolve(e, a)
					},
					reject: function (e, t) {
						var a = t || "";
						a = this._functionForThisLink(e, a, !1),
						this._previousLink.reject(e, a)
					}
				};
				return a
			}
			function i(e, t) {
				var a = function (a, n, i) {
					var r = {};
					r.message = a,
					r.path = n,
					r.success = i,
					t.id && (r.id = t.id),
					e(r)
				},
				i = {
					resolve: function () {},
					reject: function () {}
				};
				return new n(i, a)
			}
			function r(e, t) {
				var a = function (e, a) {
					return a = "/" + t + a
				};
				return new n(e, a)
			}
			function o() {
				var e = {},
				t = s(),
				a = {},
				n = function (n, o, s) {
					s = s || function () {};
					var c = o || i(s, n);
					for (var l in n)
						if ("id" !== l)
							if (l in e) {
								var u = r(c, l);
								a = t.isAllowed(l),
								a.allowed ? e[l](n[l], u) : u.reject(a.message)
							} else {
								var d = r(c, l);
								d.reject()
							}
				};
				return n.components = e,
				n.stateConstraints = t,
				n
			}
			var s = a(21);
			e.exports = o
		}, function (e, t) {
			e.exports = function () {
				var e = {};
				return e.states = {},
				e.addState = function (t, a, n) {
					return e.states[t] = {},
					e.states[t].active = a,
					Array.isArray(n) ? e.states[t].restrict = n : e.states[t].restrict = [],
					!0
				},
				e.removeState = function (t) {
					return t in e.states && (delete e.states[t], !0)
				},
				e.setState = function (t, a) {
					return t in e.states && (e.states[t].active = a, !0)
				},
				e.addRestriction = function (t, a) {
					return !!a && (e.states[t].restrict.push(a), !0)
				},
				e.removeRestriction = function (t, a) {
					var n,
					i = -1;
					for (var r in e.states[t].restrict)
						if (a === e.states[t].restrict[r]) {
							i = r,
							n = e.states[t].restrict[r];
							break
						}
					return i > -1 && e.states[t].restrict.splice(i, 1),
					n
				},
				e.isAllowed = function (t) {
					var a = {
						allowed: !0,
						message: "Request " + t + " Allowed."
					};
					for (var n in e.states)
						if (e.states[n].active && (e.states[n].restrict.indexOf("*") >= 0 || e.states[n].restrict.indexOf(t) >= 0)) {
							a.allowed = !1,
							a.message = "Request " + t + " Rejected. Could not process due to active state: " + n;
							break
						}
					return a
				},
				e
			}
		}, function (e, t, a) {
			function n(e) {
				e || (e = ["Node", "Surface", "Marker"]);
				for (var t, a = document.getElementsByClassName("rangerLabel"), n = 0; n < a.length; n++)
					t = a[n], e.indexOf(t.labelType) > -1 && (t.style["pointer-events"] = "none");
				for (var i in e)
					j[e[i]] = !1
			}
			function i(e) {
				e || (e = ["Node", "Surface", "Marker"]);
				for (var t, a = document.getElementsByClassName("rangerLabel"), n = 0; n < a.length; n++)
					t = a[n], e.indexOf(t.labelType) > -1 && (t.style["pointer-events"] = "auto");
				for (var i in e)
					j[e[i]] = !0
			}
			function r(e, t, a) {
				e in I ? I[e].push(t, a) : (I[e] = v(), I[e].push(t, a))
			}
			function o(e, t, a) {
				if (E.indexOf(e) < 0) {
					for (var n = document.getElementsByClassName("rangerLabel"), i = 0; i < n.length; i++)
						n[i].addEventListener(e, function (e) {
							e.preventDefault(),
							e.type in I && I[e.type].trigger(e.target.node, e)
						});
					E.push(e)
				}
				void 0 !== t && void 0 !== a && r(e, t, a)
			}
			function s(e) {
				e in I && delete I[e]
			}
			function c(e, t) {
				e in I && I[e].remove(t)
			}
			function l(e, t) {
				for (var a = 0; a < E.length; a++) {
					var n = E[a];
					e.addEventListener(n, function (e) {
						e.preventDefault(),
						e.type in I && I[e.type].trigger(t, e)
					})
				}
				e.onremove = function () {
					"onremove" in I && I.onremove.trigger(t, e)
				},
				e.onadd = function () {
					"onadd" in I && I.onadd.trigger(t, e)
				},
				N.addScrollEventListeners(e, h.IE),
				N.preventGestureEvents(e)
			}
			function u(e, t, a, n) {
				var i = document.createElement("div");
				i.innerHTML = a.data.Text,
				i.node = t,
				i.labelType = a.data.labelType,
				i.name = a.data.Text,
				"System" === t.nodeType ? i.style.color = "rgb(255, 127, 51)" : "Star" === t.nodeType ? i.style.color = "rgb(255, 127, 51)" : "Planet" === t.nodeType && (i.style.color = "White"),
				a.data.color && (i.style.color = a.data.color),
				l(i, t, e),
				i.className = "nodeLabel rangerLabel";
				var r = document.createAttribute("eye");
				return r.value = n,
				i.setAttributeNode(r),
				t.interactable === !1 && (i.className += " non-interactable"),
				i
			}
			function d(e, t, a, n) {
				var i = document.createElement("div");
				i.className = "surfaceDot",
				i.node = t,
				i.labelType = a.data.labelType,
				i.id = "surfaceLabelContainer-" + a.data.id,
				i.name = a.data.name,
				i.innerHTML = "&bull;";
				var r = document.createElement("div");
				r.className = "surfaceLabel rangerLabel",
				r.node = t,
				r.labelType = a.data.labelType,
				r.name = a.data.name,
				r.id = a.data.id;
				var o = a.data.Text;
				"" === o ? i.style.display = "none" : i.style.display = "",
				r.innerHTML = a.data.Text,
				r.displayText = o,
				a.data.color && (i.style.color = a.data.color, r.style.color = a.data.color),
				l(r, t, e);
				var s = document.createAttribute("eye");
				return s.value = n,
				i.setAttributeNode(s),
				i.surfaceLabel = r,
				r.surfaceDot = i,
				i.onremove = r.onremove,
				i.onadd = r.onadd,
				i.appendChild(r),
				i
			}
			function M(e, t, a, n) {
				var i = document.createElement("div");
				i.className = "markerLabel",
				i.node = t,
				i.labelType = a.data.labelType,
				i.name = a.data.name,
				i.locationId = a.data.locationId,
				i.id = "markerContainer-" + a.data.id;
				var r = document.createElement("a");
				r.className = "marker rangerLabel ranger-svg",
				r.id = a.data.id,
				r.node = t,
				r.labelType = a.data.labelType,
				r.name = a.data.name,
				r.locationId = a.data.locationId,
				r.href = "#";
				var o = document.createElement("object");
				o.type = "image/svg+xml",
				o.data = a.data.icon,
				o.id = "markerIcon-" + a.data.id,
				o.className = "markerSVG",
				a.data.color && (i.color = a.data.color, o.color = a.data.color),
				l(r, t, e);
				var s = document.createAttribute("eye");
				return s.value = n,
				i.setAttributeNode(s),
				i.marker = r,
				i.onremove = r.onremove,
				i.onadd = r.onadd,
				i.appendChild(r),
				r.icon = o,
				r.appendChild(o),
				i
			}
			function g(e, t, a, n, i, r) {
				var o;
				t.labelDiv || (t.labelDiv = []),
				t.surfaceDivs || (t.surfaceDivs = {}),
				t.markerDivs || (t.markerDivs = {});
				var s = n.data.labelType;
				switch (s) {
				case "Node":
					n.data.labelType = "Node",
					void 0 === t.labelDiv[r] && (t.labelDiv[r] = u(e, t, n, r)),
					o = t.labelDiv[r],
					o.innerHTML = n.data.Text,
					o.labelType in j && !j[o.labelType] && (o.style["pointer-events"] = "none");
					break;
				case "Marker":
					void 0 === t.markerDivs[n.data.id] && (t.markerDivs[n.data.id] = M(e, t, n, r)),
					o = t.markerDivs[n.data.id],
					o.name = n.data.name,
					o.marker.name = n.data.name,
					o.marker.locationId = n.data.locationId,
					o.marker.icon.src = n.data.icon,
					n.data.color && (o.color = n.data.color, o.marker.icon.color = n.data.color),
					o.marker.labelType in j && !j[o.marker.labelType] && (o.marker.style["pointer-events"] = "none");
					break;
				case "Surface":
					void 0 === t.surfaceDivs[n.data.id] && (t.surfaceDivs[n.data.id] = d(e, t, n, r)),
					o = t.surfaceDivs[n.data.id];
					var c = n.data.Text;
					"" === c ? o.style.display = "none" : o.style.display = "",
					n.data.Text !== o.surfaceLabel.displayText && (o.surfaceLabel.innerHTML = n.data.Text, o.surfaceLabel.displayText = n.data.Text),
					o.surfaceLabel.labelType in j && !j[o.surfaceLabel.labelType] && (o.surfaceLabel.style["pointer-events"] = "none");
					break;
				default:
					n.data.labelType = "Node",
					void 0 === t.labelDiv[r] && (t.labelDiv[r] = u(e, t, n, r)),
					o = t.labelDiv[r],
					o.innerHTML = n.data.Text,
					o.labelType in j && !j[o.labelType] && (o.style["pointer-events"] = "none")
				}
				return o.style.left = 50 * a[0] + 50 + "%",
				o.style.top = 50 - 50 * a[1] + "%",
				o.style["z-index"] = 2e3 - i,
				"Node" != o.labelType && "Surface" != o.labelType || (o.style.opacity = 0),
				"Marker" == o.labelType && (o.style.opacity = 1, o.style["z-index"] = 2001),
				o
			}
			function p(e, t, a) {
				for (var n, i, r = 0; r < e.length; r++)
					if (e[r].style.opacity > .4)
						for (var o = r + 1; o < e.length; o++)
							e[o].style.opacity > .4 && (n = e[r].getBoundingClientRect(), i = e[o].getBoundingClientRect(), n.top > i.bottom || n.right < i.left || n.bottom < i.top || n.left > i.right || (e[r].name === a ? e[o].style.opacity = .4 : e[o].name === a ? e[r].style.opacity = .4 : t[e[r].name] < t[e[o].name] ? e[o].style.opacity = .4 : e[r].style.opacity = .4))
			}
			function m(e, t) {
				for (var a, n, i = 0; i < e.length; i++)
					if (e[i].style.opacity > .5)
						for (var r = i + 1; r < e.length; r++)
							e[r].style.opacity > .5 && (a = e[i].getBoundingClientRect(), n = e[r].getBoundingClientRect(), a.top > n.bottom || a.right < n.left || a.bottom < n.top || a.left > n.right || (t[e[i].name] < t[e[r].name] ? e[r].style.opacity = .5 : e[i].style.opacity = .5))
			}
			function A(e) {
				x = e
			}
			function f(e) {
				var t,
				a;
				if (x) {
					t = x.getBoundingClientRect();
					for (var n = 0; n < e.length; n++)
						a = e[n].getBoundingClientRect(), t.top > a.bottom || t.right < a.left || t.bottom < a.top || t.left > a.right || (e[n].style.opacity = 0, "Surface" === e[n].labelType && e[n].surfaceDot && (e[n].surfaceDot.style.opacity = 0))
				}
			}
			function D(e, t) {
				var a = e,
				n = [],
				i = document.getElementById("labels"),
				s = function () {
					var e,
					r,
					o = [],
					s = [],
					c = 0,
					l = {},
					u = [];
					t && N.scene.walk(t, function (t, i, d) {
						for (var M = 0; M < i.length; M++) {
							var p;
							if (i[M][2] > 0 && i[M][0] > -1.2 && i[M][0] < 1.2 && i[M][1] > -1.2 && i[M][1] < 1.2) {
								for (var m in d) {
									var A = i[M],
									f = d[m];
									f.visible && null !== f.renderable && "Label" === f.renderable.type && ("projectedPosition" in f.renderable.data && (A = f.renderable.data.projectedPosition[M]), "System" === t.nodeType && (e = f.renderable.data.Text), r = g(a, t, A, f.renderable, c, M), void 0 !== r && (l[r.name] = A[2], o.push(r), r.parentNode || s.push(r), c += 1, p = [t, r]))
								}
								if (p && 0 === M && u.push(p), void 0 === n[M]) {
									var D = document.createAttribute("eye");
									D.value = M,
									n[M] = document.createElement("div"),
									n[M].setAttributeNode(D),
									n[M].className += "labelWall ",
									n[M].id = "stereo",
									n[M].className += 0 === M ? "left-eye" : "right-eye"
								}
							}
						}
					}),
					void 0 !== n[0] && (h.stereo ? n[0].id = "stereo" : n[0].id = "mono");
					for (var d = document.getElementsByClassName("nodeLabel"), M = 0; M < d.length; M++)
						"" === d[M].style["margin-left"] && "Surface" !== d[M].labelType && (d[M].style["margin-left"] = Math.floor(d[M].clientWidth / 2) + "px"), d[M].style.opacity = .7;
					p(d, l, e);
					var A = document.getElementsByClassName("surfaceLabel");
					for (M = 0; M < A.length; M++)
						A[M].style.opacity = 1;
					var D = document.getElementsByClassName("surfaceDot");
					for (M = 0; M < D.length; M++)
						D[M].style.opacity = 1;
					var v = document.getElementsByClassName("marker"),
					T = [];
					for (M = 0; M < v.length; M++)
						v[M].style.opacity = 1, v[M].attachedElement && (v[M].attachedElement.style.opacity = 1,
							T.push(v[M].attachedElement));
					f(T),
					f(d),
					f(A),
					f(D),
					f(v),
					m([], l),
					l = {},
					n.forEach(function (e) {
						e.parentNode != i && i.appendChild(e)
					}),
					s.forEach(function (e) {
						n[e.getAttribute("eye")].appendChild(e),
						"onadd" in e && e.onadd()
					});
					for (var L = 0; L < n.length; L++)
						for (var I = n[L], E = I.children.length - 1; E >= 0; E--)
							o.indexOf(I.children[E]) < 0 && ("onremove" in I.children[E] && I.children[E].onremove(), I.removeChild(I.children[E]));
					if (h.vr) {
						var j,
						x,
						b = null;
						if (0 !== u.length && (j = y.getIntersection(u, l)))
							w.resetRay(), (b = y.getCurrPair()) && b[0] != j[0] && y.VRmouseout(b, b[0].labelDiv[1]), y.VRmouseover(j, j[0].labelDiv[1]), y.incClock(), y.getClock() > 70 && (y.VRmouseout(j, j[0].labelDiv[1]), y.VRmouseclick(j));
						else {
							var S = y.getCurrPair();
							S && y.VRmouseout(S, S[0].labelDiv[1]),
							y.resetRay(),
							(x = a.pick()) && x.node !== a.cameraState.parent ? (w.pickOver(x), w.incClock(), w.getClock() > 20 && (w.VRplanetClick(x), w.resetRay())) : w.resetRay()
						}
					}
				};
				b[t.id] = s,
				o("click", "transitionToNode", function (e) {
					T.actions.onClick(e, L.speed.standard)
				}),
				o("mouseover", "stopClock", function (e) {
					T.actions.onMouseOver(e)
				}),
				o("mouseout", "startClock", function (e) {
					T.actions.onMouseOut(e)
				}),
				r("onremove", "resetClock", function (e) {
					T.actions.onLabelRemove(e)
				})
			}
			var N = a(4),
			h = a(3),
			v = a(16),
			T = a(23),
			L = a(24),
			y = a(35),
			w = a(36),
			I = {},
			E = [],
			j = {
				Node: !0,
				Surface: !0,
				Marker: !0
			},
			x = null,
			b = {},
			S = function (e) {
				b[e.id] && b[e.id]()
			};
			e.exports = {
				generateLabelSystem: D,
				addEventHandler: r,
				addEventListener: o,
				removeEventHandler: c,
				removeAllEventHandlers: s,
				disableInteractions: n,
				enableInteractions: i,
				setViewportContainer: A,
				updateLabelSystem: S
			}
		}, function (e, t, a) {
			function n(e) {
				i = e,
				i.addBackgroundHandler(o.TouchHandler("backgroundTouch", {
						singleTap: function (e, t, a, n, i, r, o, c, l, u) {
							s.backgroundSingleTap(e, t, a, n, i, r, o, c, l, u)
						},
						doubleTap: function (e, t, a, n, i, r, o, c, l, u) {
							s.backgroundDoubleTap(e, t, a, n, i, r, o, c, l, u)
						}
					})),
				i.addBackgroundHandler(o.MouseHandler("backgroundMouse", {
						click: function (e, t, a, n, i, r) {
							s.backgroundClick(e, t, a, n, i, r)
						},
						doubleClick: function (e, t, a, n, i, r) {
							s.backgroundClick(e, t, a, n, i, r)
						}
					}))
			}
			var i,
			r = a(24),
			o = a(29),
			s = {},
			c = 0;
			s.onClick = function (e, t) {
				if (e.interactable === !1)
					return !1;
				var a = e.ellipsoid ? Math.max(e.ellipsoid[0], e.ellipsoid[1], e.ellipsoid[2]) : 1,
				n = {
					frame: i.cameraState.frame,
					target: e,
					parent: e,
					radius: a / (.25 * Math.tan(i._camera.fov)),
					positionTime: t,
					win: i,
					cameraBehaviorParams: {
						minRadius: e.minZoomMult ? e.minZoomMult * a : 2 * a,
						maxRadius: e.maxZoomMult ? e.maxZoomMult * a : 1 / 0
					}
				};
				return i.setCamera(r.trackingTransition(n)),
				!0
			},
			s.onMouseOver = function (e) {
				c = i._window.camera.clock.rate,
				e.mouseOver = !0,
				i._window.camera.clock = {
					time: i._window.camera.clock.time,
					rate: 0
				}
			},
			s.onMouseOut = function (e) {
				e.mouseOver = !1,
				i._window.camera.clock = {
					time: i._window.camera.clock.time,
					rate: c
				}
			},
			s.onLabelRemove = function (e) {
				e.mouseOver && (i._window.camera.clock = {
						time: i._window.camera.clock.time,
						rate: c
					})
			},
			s.onPick = function (e, t, a) {
				console.verboseLog("Single Pick " + t + " : " + a),
				e && e.node && s.onClick(e.node, r.speed.standard, !1)
			},
			s.backgroundSingleTap = function (e, t, a, n, i, r, o, s, c, l) {
				console.verboseLog("Single tap " + o + " : " + s + ". Picked fragment info: " + l)
			},
			s.backgroundDoubleTap = function (e, t, a, n, i, r, o, c, l, u) {
				console.verboseLog("Double tap " + o + " : " + c + ". Picked fragment info: " + u),
				s.onPick(u, o, c)
			},
			s.backgroundClick = function (e, t, a, n, i, r) {
				console.verboseLog("Single Click " + n + " : " + i + ". Picked fragment info " + r),
				s.onPick(r, n, i)
			},
			s.backgroundDoubleClick = function (e, t, a, n, i, r) {
				console.verboseLog("Double clicked " + t + " at " + n + "," + i + ". Picked fragment info " + r)
			},
			e.exports = {
				init: n,
				actions: s
			}
		}, function (e, t, a) {
			var n = a(4),
			i = a(25),
			r = a(26),
			o = a(27),
			s = a(32),
			c = a(34),
			l = a(3);
			e.exports = {
				speed: {
					fast: .1,
					standard: 3,
					"short": 1
				},
				trackingTransition: function (e) {
					var t = r({
							win: e.win || n.app.getWin(),
							frame: e.frame,
							name: e.name,
							target: n.scene.get(e.target),
							radius: e.radius || 0,
							rate: e.rate,
							positionTime: e.positionTime || 3,
							position: {
								start: [0, 0, 0],
								end: [0, 0, 0]
							},
							bezierTangents: e.bezierTangents,
							orientation: {
								start: [0, 0, 0, 1],
								end: [0, 0, 0, 1]
							},
							time: 0,
							lookUp: {
								start: [0, 0, 0],
								end: [0, 0, 0],
								cross: [0, 0, 0],
								angle: 0,
								rotationBetweenVectors: [0, 0, 0, 0]
							},
							lookPointStart: null,
							lookPointEnd: e.lookPointEnd || [0, 0, 0],
							after: e.after || function () {},
							cameraBehavior: o,
							cameraBehaviorParams: e.cameraBehaviorParams || {},
							fov: {
								start: 0,
								end: 0
							}
						});
					t.fov = {
						start: t.win._camera.fov,
						end: e.fov || t.win._camera.fov
					};
					var a = function (e) {
						var t = {};
						return t.forward = n.math.qMulV(e, i.vector.FORWARD),
						t.up = n.math.qMulV(e, i.vector.UP),
						t
					};
					e.position && (t.position.end = e.position);
					var u = n.app.getWin().cameraState.frame.orientation;
					e.orientation && (u = e.orientation);
					var d = a(u);
					return t.orientation.end = u,
					t.cameraBehavior.ignorePosition && (t.position.end = n.math.vMul(d.forward, -t.radius)),
					t.lookUp.end = d.up,
					t.update = function (e, a) {
						t.time += a;
						var i = n.math.vNorm(n.math.vSub(t.frame.position, t.position.end));
						if (t.time > t.positionTime || i < .1) {
							if (t.win) {
								var r = 1;
								t.target.camera && (r = t.target.camera.preferred[0].radius);
								var o = {
									target: t.target,
									frame: t.frame,
									radius: t.radius || r,
									orientation: t.orientation.end,
									position: t.position.end
								};
								o = Object.assign(o, t.cameraBehaviorParams),
								t.win.setCamera(l.vr ? new s({
										lookController: c({
											targetOrientation: t.orientation.end,
											orientation: t.orientation.end
										}),
										parent: t.target,
										position: t.position.end,
										orientation: t.orientation.end,
										frame: t.frame
									}) : new t.cameraBehavior(o), 5)
							}
							return void t.after()
						}
						var u = n.math.clamp(t.time / (1 * t.positionTime), 0, 1),
						d = n.math.cubicBezier1d(u, 0, t.bezierTangents[0], t.bezierTangents[1], 1);
						t.frame.position = n.math.lerp(d, t.position.start, t.position.end),
						t.win._camera.fov = n.math.lerp(d, [t.fov.start, 0, 0], [t.fov.end, 0, 0])[0];
						var M = n.math.lerp(d, t.lookPointStart, t.lookPointEnd),
						g = n.math.vSub(M, t.frame.position),
						p = n.math.slerp(u, [0, 0, 0, 1], t.lookUp.rotationBetweenVectors),
						m = n.math.qMulV(p, t.lookUp.start),
						A = n.math.lookRotation(g, m);
						t.frame.orientation = A
					},
					t.enter = function (e) {
						var a = n.math.vNorm(e.cameraState.frame.position);
						t.frame = t.target.frame.convert(e.cameraState.frame, e._camera),
						t.position.start = t.frame.position,
						t.orientation.start = t.frame.orientation,
						t.lookUp.start = n.math.qMulV(e.cameraState.frame.orientation, i.vector.UP),
						t.lookUp.cross = n.math.cross(t.lookUp.start, t.lookUp.end),
						t.lookUp.angle = Math.acos(n.math.vDot(t.lookUp.start, t.lookUp.end)) || 0,
						t.lookUp.rotationBetweenVectors = n.math.rotationBetweenVectors(t.lookUp.start, t.lookUp.end),
						isNaN(t.lookUp.rotationBetweenVectors[0]) && (t.lookUp.rotationBetweenVectors = [0, 0, 0, 1]);
						var r = i.vector.FORWARD;
						r = n.math.qMulV(t.orientation.start, r),
						r = n.math.vMul(r, a);
						var o = n.math.lookRotation(r, t.lookUp.start);
						if (t.orientation.start = o, t.lookPointStart = n.math.vAdd(r, t.frame.position), !t.bezierTangents) {
							var s,
							c = a,
							l = n.math.vNorm(t.position.end);
							s = c > l ? [1 - l / c, 1] : [0, c / l],
							t.bezierTangents = s
						}
						t.win = e,
						t.clock = {
							time: e._camera.clock.time,
							rate: e._camera.clock.rate
						},
						void 0 !== t.rate && (t.clock.rate = t.rate),
						e._camera.clock = {
							time: t.clock.time,
							rate: 0
						}
					},
					t.exit = function (e) {
						e._camera.clock = t.clock
					},
					t
				}
			}
		}, function (e, t) {
			e.exports = {
				linear: {
					UP: 1,
					DOWN: -1,
					FORWARD: -1,
					BACKWARD: 1,
					RIGHT: 1,
					LEFT: -1,
					YAWRIGHT: -1,
					YAWLEFT: 1
				},
				vector: {
					FORWARD: [0, 0, -1],
					BACK: [0, 0, 1],
					RIGHT: [1, 0, 0],
					LEFT: [-1, 0, 0],
					UP: [0, 1, 0],
					DOWN: [0, -1, 0]
				}
			}
		}, function (e, t, a) {
			var n = a(4);
			e.exports = function (e) {
				var t = {
					frame: null,
					enter: function () {},
					exit: function () {}
				};
				if (void 0 !== e)
					for (var a in e)
						t[a] = e[a];
				return t.update = function (e) {
					t.frame = e.frame
				},
				t.getMinAltitude = function (e, t) {
					var a,
					n = !1,
					i = {},
					r = t.parent.context.getAllRecursive("GeometryFinder", e._camera.clock.time);
					for (var o in r)
						for (var s in r[o]) {
							var c = r[o][s].getSurfaceHeight(e._camera, t);
							if (c.found) {
								var l = c.frame.parent.frame.convert(t, e._camera.clock.time).position,
								u = "x";
								Math.abs(c.frame.position[u]) < 1e-4 && (u = "y"),
								Math.abs(c.frame.position[u]) < 1e-4 && (u = "z");
								var d = l[u] - c.frame.position[u],
								M = d / c.normal[u];
								(!n || M < n) && (n = M, a = c, i.pos = l, i.result = c, i.diff = d)
							}
						}
					return !!n && {
						parent: a.frame.parent,
						normal: a.normal,
						altitude: n,
						debug: i
					}
				},
				t.altitudePower = t.altitudePower || 1.05,
				t.scaleSpeed = function (e, a, n, i) {
					if (e < a)
						return e / a * n;
					var r = Math.pow(1 + e - a, t.altitudePower) * n;
					return i ? Math.min(i, r) : r
				},
				t.altitudeOffset = t.altitudeOffset || 10,
				t.linearSpeedAltitude = t.linearSpeedAltitude || 20,
				t.maxLinearSpeed = t.maxLinearSpeed || 1,
				t.getVelocity = function (e, a, n, i) {
					var r = n,
					o = n > 0 ? 1 : -1,
					s = t.getMinAltitude(e, a);
					if (s) {
						var c = s.altitude + t.altitudeOffset;
						c < 0 && (c = -c);
						var l = t.scaleSpeed(c, t.linearSpeedAltitude, t.maxLinearSpeed);
						l > c && (l = c / 2),
						r = o * l
					}
					return t.radius && Math.abs(r) > t.radius && (r = o * t.radius / 2),
					Math.abs(r) > i && (r = o * i),
					r
				},
				t.checkFrame = function (e, a, n) {
					var i = !1,
					r = t.getMinAltitude(e, a);
					return r && r.altitude < n && (i = r, i.magnitude =  - (r.altitude - n)),
					i
				},
				t.getClosestSurface = function (e) {
					var t,
					a;
					n.scene.walk(e, function (t) {
						return t && (a = t.frame.getDistance(e)),
						!0
					});
					var i = n.scene.cameraData[e.id].attachedNode,
					r = {
						parent: i,
						position: [0, 0, 0],
						orientation: [0, 0, 0, 1]
					},
					o = i.context.getAllRecursive("GeometryFinder", e.clock.time);
					for (var s in o)
						for (var c in o[s])
							if (o[s][c].ptr) {
								var l = o[s][c].getSurfaceHeight(e, r);
								if (l.found) {
									var u = l.frame.parent.frame.convert(r, e.clock.time).position,
									d = "x";
									Math.abs(l.frame.position[d]) < 1e-4 && (d = "y"),
									Math.abs(l.frame.position[d]) < 1e-4 && (d = "z");
									var M = u[d] - l.frame.position[d],
									g = M / l.normal[d];
									(!t || g < t + 10) && (t = g - 10)
								}
							}
					return a && t && Math.min(a, t) || a || t || 0
				},
				t
			}
		}, function (e, t, a) {
			var n = a(4),
			i = a(25),
			r = a(26),
			o = a(28),
			s = a(31);
			e.exports = function (e) {
				function t(e) {
					return e.nominalRadius ? e.nominalRadius : e.target && e.target.ellipsoid && n.math.vNorm(e.target.ellipsoid) > 0 ? (e.radiusScale || 1) * Math.min(e.target.ellipsoid[0], e.target.ellipsoid[1], e.target.ellipsoid[2]) : 1
				}
				if (!e.target && !e.parent)
					throw Error("ranger.camera.Orbit: Missing required parameter: target");
				e.target = n.scene.get(e.target || e.parent);
				var a = r({
						startPosition: e.startPosition,
						target: e.target,
						parent: e.target,
						frame: e.frame || null,
						orientation: e.orientation || [0, 0, 0, 1],
						offset: e.offset || [0, 0, 0],
						nominalRadius: t(e),
						locked: e.locked || null,
						radius: e.radius && e.radius / t(e) || 5.25,
						minRadius: e.minRadius && e.minRadius / t(e) || 1e-6,
						maxRadius: e.maxRadius && e.maxRadius / t(e) || 1e15,
						minRadiusAsGiven: e.minRadius,
						maxRadiusAsGiven: e.maxRadius
					});
				return a.freeLook = o({
						orientation: e.orientation || [0, 0, 0, 1],
						lookSpeed: e.lookSpeed || .005,
						useStrafeKeys: !0,
						locked: e.locked || null,
						target: e.target || null
					}),
				a.zoomController = s({
						minZoomLevel: a.minRadius,
						maxZoomLevel: a.maxRadius,
						zoomLevel: a.radius,
						zoomVelocityMouse: 3,
						zoomVelocityTouch: 3
					}),
				a.update = function (t, r) {
					if (a.frame.parent = a.target, !e.locked) {
						var o = void 0,
						s = void 0;
						if (a.target.ellipsoid) {
							var c = a.target.frame.get(t.clock.time);
							if (c) {
								var l = a.target.ellipsoid[0] + a.target.ellipsoid[1] + a.target.ellipsoid[2],
								u = n.math.surfacePointJS(a.target.ellipsoid, c.position),
								d = n.math.vNorm(n.math.vSub(a.frame.position, u)),
								M = .002615089448579398,
								g = 1.5690536691476389;
								o = M / Math.pow(l / d, 2),
								s = g / Math.pow(l / d, 2),
								o = n.math.clamp(o, 1e-4, .01),
								s = n.math.clamp(s, .5, 5)
							}
						}
						o && s && (a.freeLook.lookSpeed = o, a.zoomController.zoomVelocityMouse = s, a.zoomController.zoomVelocityTouch = s);
						var p = [0, 1, 2].map(function (e) {
							return n.frame.getAxis(a.frame, e)
						});
						a.freeLook.update(t, r, p[2], p[0], p[1]),
						a.zoomController.update(r)
					}
					a.frame.orientation = a.freeLook.orientation,
					a.radius = a.zoomController.zoomLevel * a.nominalRadius,
					a.frame.position = n.math.vAdd(n.math.vMul(n.math.vNormalized(n.math.qMulV(a.frame.orientation, i.vector.FORWARD)), -a.radius), a.offset)
				},
				a.frame || (a.frame = {
						parent: a.target,
						position: [0, 0, 0],
						orientation: a.freeLook.orientation
					}),
				a.zoom = function (e) {
					a.zoomController.zoom(e)
				},
				a.enter = function (e) {
					e.deleteInputHandler("camera_fly_mouse"),
					e.deleteInputHandler("camera_fly_touch"),
					e.deleteInputHandler("camera_fly_bindings"),
					a.zoomController.enter(e),
					a.freeLook.enter(e)
				},
				a.exit = function (e) {
					a.zoomController.exit(e),
					a.freeLook.exit(e)
				},
				a
			},
			e.exports.ignorePosition = !0
		}, function (e, t, a) {
			var n = a(4),
			i = a(29);
			e.exports = function (e) {
				var t = {
					smooth: !0,
					useStrafeKeys: !1,
					orientation: [0, 0, 0, 1],
					targetOrientation: [0, 0, 0, 1],
					lookVelocity: [0, 0, 0],
					lookSpeed: .03,
					speedMod: !1,
					leftPressed: !1,
					rightPressed: !1,
					downPressed: !1,
					upPressed: !1,
					rollCCWPressed: !1,
					rollCWPressed: !1,
					buttonDown: !1,
					dragX: 0,
					dragY: 0,
					dragR: 0
				};
				if (e)
					for (var a in e)
						a in t && (t[a] = e[a]);
				var r = t.lookSpeed,
				o = 0;
				return t.targetOrientation = t.orientation,
				t.updateFrameParent = function (e, a, i) {
					if (a = n.scene.get(a), i = n.scene.get(i), i && i != a) {
						var r = n.Frame();
						r.parent = a,
						r.position = [0, 0, 0],
						r.orientation = t.orientation,
						t.orientation = i.frame.convert(r, e.clock.time).orientation,
						r.orientation = t.targetOrientation,
						t.targetOrientation = i.frame.convert(r, e.clock.time).orientation
					}
				},
				t.update = function (e, a, i, r, o) {
					a = Math.min(a, 1);
					var s = t.speedMod ? .02 : 2,
					c = t.speedMod ? .01 : 1,
					l = 0,
					u = 0,
					d = 0;
					t.useStrafeKeys && (t.leftPressed ? l -= t.lookSpeed * s : t.rightPressed && (l += t.lookSpeed * s), t.downPressed ? u += t.lookSpeed * s : t.upPressed && (u -= t.lookSpeed * s)),
					t.rollCCWPressed ? d += t.lookSpeed * s : t.rollCWPressed && (d -= t.lookSpeed * s),
					t.buttonDown && (l -= t.dragX * t.lookSpeed * c, u -= t.dragY * t.lookSpeed * c, d -= t.dragR * t.lookSpeed * c),
					t.targetOrientation = n.math.qNormalized(n.math.qMulQ(n.math.angleAxis(l, o), t.targetOrientation)),
					t.targetOrientation = n.math.qNormalized(n.math.qMulQ(n.math.angleAxis(u, r), t.targetOrientation)),
					t.targetOrientation = n.math.qNormalized(n.math.qMulQ(n.math.angleAxis(d, i), t.targetOrientation)),
					t.updateSmoothing(a),
					t.resetKeys()
				},
				t.updateSmoothing = function (a) {
					var i = 0;
					if (e.locked) {
						var s = n.app.getWin()._camera,
						c = s.frame.position,
						l = {};
						l = {
							parent: n.scene.get(e.locked.object1),
							position: [0, 0, 0],
							orientation: [0, 0, 0, 1]
						};
						var u = e.target.frame.convert(l, s).position;
						l = {
							parent: n.scene.get(e.locked.object2),
							position: [0, 0, 0],
							orientation: [0, 0, 0, 1]
						};
						var d = e.target.frame.convert(l, s).position,
						M = n.math.vNormalized(n.math.vSub(c, u)),
						g = n.math.vNormalized(n.math.vSub(c, d));
						i = 180 * Math.acos(n.math.vDot(M, g)) / Math.PI,
						i > e.locked.degree && i > o ? t.lookSpeed = Math.min(2e-4 / i, .001) : t.lookSpeed = r,
						o = i
					}
					t.smooth ? t.orientation = n.math.qNormalized(n.math.slerp(Math.min(10 * a, 1), t.orientation, t.targetOrientation)) : t.orientation = t.targetOrientation
				},
				t.enter = function (a) {
					function n(e, a, n) {
						t.speedMod = n
					}
					function r(e, a, n) {
						t.leftPressed = n
					}
					function o(e, a, n) {
						t.rightPressed = n
					}
					function s(e, a, n) {
						t.upPressed = n
					}
					function c(e, a, n) {
						t.downPressed = n
					}
					function l(e, a, n) {
						t.rollCCWPressed = n
					}
					function u(e, a, n) {
						t.rollCWPressed = n
					}
					t.mouse = i.MouseHandler("camera_look_mouse", {
							drag: function (a, n, i) {
								return t.buttonDown = !0,
								t.dragX = n,
								t.dragY = i,
								e.locked && e.locked.moveLimit && (t.dragX = Math.abs(t.dragX) > e.locked.moveLimit ? 0 : t.dragX, t.dragY = Math.abs(t.dragY) > e.locked.moveLimit ? 0 : t.dragY),
								!0
							},
							click: function () {}
						}),
					t.touch = i.TouchHandler("camera_look_touch", {
							touch: function () {},
							touchDrag: function (a, n, i, r, o, s) {
								return t.buttonDown = !0,
								t.dragX = o,
								t.dragY = s,
								e.locked && e.locked.moveLimit && (t.dragX = Math.abs(t.dragX) > e.locked.moveLimit ? 0 : t.dragX, t.dragY = Math.abs(t.dragY) > e.locked.moveLimit ? 0 : t.dragY),
								!0
							}
						}),
					t.resetKeys = function () {
						t.speedMod = !1,
						t.leftPressed = !1,
						t.rightPressed = !1,
						t.upPressed = !1,
						t.downPressed = !1,
						t.buttonDown = !1,
						t.rollCCWPressed = !1,
						t.rollCWPressed = !1,
						t.dragX = 0,
						t.dragY = 0,
						t.dragR = 0
					},
					t.bindings = i.KeyBinder("camera_look_bindings", {
							SHIFT: n,
							A: r,
							LEFT: r,
							D: o,
							RIGHT: o,
							R: s,
							UP: s,
							F: c,
							DOWN: c,
							Q: l,
							E: u
						}),
					a.addInputHandler(t.mouse),
					a.addInputHandler(t.touch),
					a.addInputHandler(t.bindings)
				},
				t.exit = function (e) {
					e.deleteInputHandler("camera_look_mouse"),
					e.deleteInputHandler("camera_look_touch"),
					e.deleteInputHandler("camera_look_bindings")
				},
				t
			}
		}, function (e, t, a) {
			function n(e, t) {
				for (var a, n = 0; n < t.length; n++)
					if (a = t[n].identifier, a === e)
						return n;
				return -1
			}
			function i(e) {
				var t,
				a = [],
				i = 0;
				if (e.changedTouches.length > 0)
					for (i = 0; i < e.changedTouches.length; i++)
						t = n(e.changedTouches[i].identifier, a), t >= 0 ? a.splice(t, 1, {
							identifier: e.changedTouches[i].identifier,
							x: e.changedTouches[i].clientX,
							y: e.changedTouches[i].clientY
						}) : a.push({
							identifier: e.changedTouches[i].identifier,
							x: e.changedTouches[i].clientX,
							y: e.changedTouches[i].clientY
						});
				return a
			}
			function r(e) {
				return {
					name: e,
					handle: function (e, t) {
						return !1
					}
				}
			}
			function o(e, t) {
				var a = r(e);
				if (a.bindings = {}, "object" == ("undefined" == typeof t ? "undefined" : M(t)) && t)
					for (var n in t)
						a.bindings[n] = t[n];
				return a.handle = function (e, t) {
					return t.type + "" == "KEY_CHANGED" && t.params.key in a.bindings && a.bindings[t.params.key](e, t.params.key, t.params.pressed)
				},
				a.Bind = function (e, t) {
					a.bindings[e] = t
				},
				a.Unbind = function (e) {
					delete a.bindings[e]
				},
				a
			}
			function s(e, t) {
				var a = r(e);
				return a.move = function (e, t, a, n, i) {
					return !1
				},
				a.drag = function (e, t, a, n, i) {
					return !1
				},
				a.click = function (e, t, a, n, i) {
					return !1
				},
				a.doubleClick = function (e, t, a, n, i) {
					return !1
				},
				a.scroll = function (e, t, a, n) {
					return !1
				},
				"object" == ("undefined" == typeof t ? "undefined" : M(t)) && t && ("move" in t && (a.move = t.move), "drag" in t && (a.drag = t.drag), "click" in t && (a.click = t.click), "doubleClick" in t && (a.doubleClick = t.doubleClick), "scroll" in t && (a.scroll = t.scroll)),
				a.handle = function (e, t) {
					switch (t.type + "") {
					case "CURSOR_MOVED":
						return t.params.drag ? a.drag(e, t.params.relativeX, t.params.relativeY, t.params.absoluteX, t.params.absoluteY) : a.move(e, t.params.relativeX, t.params.relativeY, t.params.absoluteX, t.params.absoluteY);
					case "MOUSE_SINGLE_CLICK":
						return a.click(e, t.params.button, t.params.pressed, t.params.X, t.params.Y, t.params.pickedFragmentInfo);
					case "MOUSE_DOUBLE_CLICK":
						return a.doubleClick(e, t.params.button, t.params.pressed, t.params.X, t.params.Y, t.params.pickedFragmentInfo);
					case "MOUSE_WHEEL_CHANGED":
						return a.scroll(e, t.params.tickX, t.params.tickY, t.params.tickZ);
					default:
						return !1
					}
				},
				a
			}
			function c(e, t) {
				var a = r(e);
				return a.touch = function (e, t, a, n, i, r, o, s, c) {
					return !1
				},
				a.touchDrag = function (e, t, a, n, i, r, o, s, c) {
					return !1
				},
				a.singleTap = function (e, t, a, n, i, r, o, s, c) {
					return !1
				},
				a.doubleTap = function (e, t, a, n, i, r, o, s, c) {
					return !1
				},
				a.multi = function (e, t, a, n, i, r, o) {
					return !1
				},
				a.gesture = function (e, t, a, n, i, r, o) {
					return !1
				},
				"object" == ("undefined" == typeof t ? "undefined" : M(t)) && t && ("touch" in t && (a.touch = t.touch), "touchDrag" in t && (a.touchDrag = t.touchDrag), "doubleTap" in t && (a.doubleTap = t.doubleTap), "singleTap" in t && (a.singleTap = t.singleTap), "multi" in t && (a.multi = t.multi), "gesture" in t && (a.gesture = t.gesture)),
				a.handle = function (e, t) {
					switch (t.type + "") {
					case "TOUCH":
						return a.touch(e, t.params.type, t.params.device, t.params.finger, t.params.dx, t.params.dy, t.params.x, t.params.y, t.params.pressure);
					case "TOUCH_DRAG":
						return a.touchDrag(e, t.params.type, t.params.device, t.params.finger, t.params.dx, t.params.dy, t.params.x, t.params.y, t.params.pressure);
					case "SINGLE_TAP":
						return a.singleTap(e, t.params.type, t.params.device, t.params.finger, t.params.dx, t.params.dy, t.params.x, t.params.y, t.params.pressure, t.params.pickedFragmentInfo);
					case "DOUBLE_TAP":
						return a.doubleTap(e, t.params.type, t.params.device, t.params.finger, t.params.dx, t.params.dy, t.params.x, t.params.y, t.params.pressure, t.params.pickedFragmentInfo);
					case "MULTITOUCH":
						return a.multi(e, t.params.device, t.params.dtheta, t.params.ddist, t.params.x, t.params.y, t.params.fingerCount);
					case "GESTURE":
						return a.gesture(e, t.params.device, t.params.gesture, t.params.fingerCount, t.params.error, t.params.x, t.params.y);
					default:
						return !1
					}
				},
				a
			}
			function l(e) {
				u = e,
				u.updates.events = function (e, t) {
					for (; m.length; ) {
						var a = m.dequeue();
						switch (a.type + "") {
						case "KEY_CHANGED":
						case "CURSOR_MOVED":
						case "MOUSE_SINGLE_CLICK":
						case "MOUSE_DOUBLE_CLICK":
						case "MOUSE_WHEEL_CHANGED":
						case "TOUCH":
						case "TOUCH_DRAG":
						case "MULTITOUCH":
						case "SINGLE_TAP":
						case "DOUBLE_TAP":
						case "GESTURE":
							u.passInputEvent(e, a);
							break;
						default:
							console.error("ranger/Window: Unhandled window event: " + a.type)
						}
					}
				}
			}
			var u,
			d,
			M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
				return typeof e
			}
			 : function (e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
			},
			g = a(30),
			p = a(7),
			m = p.createQueue(),
			A = {},
			f = {
				pressed: !1,
				previousX: 0,
				previousY: 0,
				clickedX: 0,
				clickedY: 0,
				clickCount: 0,
				previousTime: 0,
				dragging: !1,
				pickedFragmentInfo: {}
			},
			D = 350;
			A.mouseDown = function (e) {
				e.preventDefault();
				var t = new Date;
				f.previousTime = t.getTime(),
				f.pressed = !0,
				f.dragging = !1
			},
			A.mouseMove = function (e) {
				e.preventDefault();
				var t = document.body.scrollTop || document.documentElement.scrollTop,
				a = document.body.scrollLeft || document.documentElement.scrollLeft,
				n = e.pageX - a || e.clientX || 0,
				i = e.pageY - t || e.clientY || 0;
				u.cursorPosition = [n, i],
				f.pressed && (f.dragging = !0, m.queue({
						type: "CURSOR_MOVED",
						params: {
							drag: !0,
							relativeX: n - f.previousX,
							relativeY: i - f.previousY,
							absoluteX: n,
							absoluteY: i
						}
					})),
				f.previousX = n,
				f.previousY = i
			},
			A.mouseUp = function (e) {
				if (e.preventDefault(), f.pressed && !f.dragging && 0 === f.clickCount) {
					f.clickCount = f.clickCount + 1;
					var t = document.body.scrollTop || document.documentElement.scrollTop,
					a = document.body.scrollLeft || document.documentElement.scrollLeft,
					n = e.pageX - a || e.clientX || 0,
					i = e.pageY - t || e.clientY || 0;
					f.clickedX = n,
					f.clickedY = i;
					for (var r in u._window.pickedFragmentInfo)
						f.pickedFragmentInfo[r] = u._window.pickedFragmentInfo[r];
					d = setTimeout(function () {
							m.queue({
								type: "MOUSE_SINGLE_CLICK",
								params: {
									button: "Button" + e.which + "Down",
									pressed: !0,
									X: f.clickedX,
									Y: f.clickedY,
									pickedFragmentInfo: f.pickedFragmentInfo
								}
							}),
							f.pickedFragmentInfo = {},
							f.clickCount = 0
						}, D)
				} else
					f.pressed && !f.dragging && 1 === f.clickCount && (clearTimeout(d), m.queue({
							type: "MOUSE_DOUBLE_CLICK",
							params: {
								button: "Button" + e.which + "Down",
								pressed: !0,
								X: f.clickedX,
								Y: f.clickedY,
								pickedFragmentInfo: f.pickedFragmentInfo
							}
						}), f.pickedFragmentInfo = {}, f.clickCount = 0);
				f.dragging = !1,
				f.pressed = !1
			},
			A.mouseOut = function (e) {
				e.preventDefault(),
				f = {
					pressed: !1,
					previousX: 0,
					previousY: 0,
					clickedX: 0,
					clickedY: 0,
					clickCount: 0,
					previousTime: 0,
					dragging: !1,
					pickedFragmentInfo: {}
				}
			},
			A.scroll = function (e) {
				e.preventDefault(),
				m.queue({
					type: "MOUSE_WHEEL_CHANGED",
					params: {
						tickX: e.deltaX,
						tickY: e.deltaY,
						tickZ: e.deltaZ
					}
				})
			},
			A.keyPress = function (e) {
				if (u.allowKeypress) {
					var t = g.GetKeyName(e) || "";
					m.queue({
						type: "KEY_CHANGED",
						params: {
							key: t,
							pressed: !0
						}
					})
				}
				return !0
			};
			var N,
			h = {
				ongoingTouches: [],
				touchDown: !1,
				dragging: !1,
				tapCount: 0,
				tapX: 0,
				tapY: 0,
				previousTime: 0,
				pickedFragmentInfo: {},
				previousDistanceBetweenFingers: null,
				twoFingerGesture: !1,
				startDragTouches: null,
				minDeltaDistance: 6
			},
			v = 350;
			A.touchStart = function (e) {
				e.preventDefault();
				for (var t, a = i(e), r = 0; r < a.length; r++)
					t = n(a[r].identifier, h.ongoingTouches), t >= 0 ? h.ongoingTouches.splice(t, 1, {
						identifier: a[r].identifier,
						x: a[r].x,
						y: a[r].y
					}) : h.ongoingTouches.push({
						identifier: a[r].identifier,
						x: a[r].x,
						y: a[r].y
					});
				u.cursorPosition = [a[0].x, a[0].y];
				var o = new Date;
				h.previousTime = o.getTime(),
				h.dragging = !1,
				h.touchDown = !0,
				u.touchDown = !0,
				h.startDragTouches = null
			},
			A.touchMove = function (e) {
				e.preventDefault();
				var t,
				a,
				r,
				o = i(e);
				if (h.startDragTouches || (h.startDragTouches = o), 1 === o.length && 1 === h.ongoingTouches.length) {
					if (u.cursorPosition = [o[0].x, o[0].y], h.twoFingerGesture)
						return void(h.twoFingerGesture = !1);
					h.startDragTouches && (t = Math.pow(h.startDragTouches[0].x - o[0].x, 2), a = Math.pow(h.startDragTouches[0].y - o[0].y, 2), r = Math.sqrt(t + a), r >= h.minDeltaDistance && (h.dragging = !0, m.queue({
								type: "TOUCH_DRAG",
								params: {
									type: "drag",
									device: "tablet",
									finger: "one",
									dx: o[0].x - h.ongoingTouches[0].x,
									dy: o[0].y - h.ongoingTouches[0].y,
									x: o[0].x,
									y: o[0].y,
									pressure: "normal"
								}
							})))
				} else if (2 === o.length && 2 === h.ongoingTouches.length) {
					if (t = Math.pow(o[0].x - o[1].x, 2), a = Math.pow(o[0].y - o[1].y, 2), r = Math.sqrt(t + a), h.previousDistanceBetweenFingers) {
						h.dragging = !0;
						var s = r - h.previousDistanceBetweenFingers;
						m.queue({
							type: "MULTITOUCH",
							params: {
								device: "tablet",
								dtheta: .5,
								ddist: s,
								x: 0,
								y: 0,
								fingerCount: o.length
							}
						})
					}
					h.previousDistanceBetweenFingers = r,
					h.twoFingerGesture = !0
				}
				for (var c, l = 0; l < o.length; l++)
					c = n(o[l].identifier, h.ongoingTouches), c >= 0 && h.ongoingTouches.splice(c, 1, {
						identifier: o[l].identifier,
						x: o[l].x,
						y: o[l].y
					})
			},
			A.touchEnd = function (e) {
				e.preventDefault();
				var t,
				a = i(e);
				if (1 !== a.length || h.dragging || 0 !== h.tapCount)
					1 !== a.length || h.dragging || 1 !== h.tapCount || (clearTimeout(N), m.queue({
							type: "DOUBLE_TAP",
							params: {
								type: "doubleTap",
								device: "tablet",
								finger: "one",
								dx: 0,
								dy: 0,
								x: h.tapX,
								y: h.tapY,
								pressure: "normal",
								pickedFragmentInfo: h.pickedFragmentInfo
							}
						}), h.pickedFragmentInfo = {}, h.tapCount = 0);
				else {
					h.tapCount = h.tapCount + 1,
					u.cursorPosition = [a[0].x, a[0].y],
					h.tapX = a[0].x,
					h.tapY = a[0].y;
					for (var r in u._window.pickedFragmentInfo)
						h.pickedFragmentInfo[r] = u._window.pickedFragmentInfo[r];
					N = setTimeout(function () {
							m.queue({
								type: "SINGLE_TAP",
								params: {
									type: "singleTap",
									device: "tablet",
									finger: "one",
									dx: 0,
									dy: 0,
									x: h.tapX,
									y: h.tapY,
									pressure: "normal",
									pickedFragmentInfo: h.pickedFragmentInfo
								}
							}),
							h.pickedFragmentInfo = {},
							h.tapCount = 0
						}, v)
				}
				for (var o = 0; o < a.length; o++)
					t = n(a[o].identifier, h.ongoingTouches), t >= 0 && h.ongoingTouches.splice(t, 1);
				0 === h.ongoingTouches.length ? (u.touchDown = !1, h.dragging = !1, h.touchDown = !1, h.previousDistanceBetweenFingers = null, h.twoFingerGesture = !1, h.startDragTouches = null) : 1 === h.ongoingTouches.length && (h.previousDistanceBetweenFingers = null)
			},
			A.touchCancel = function (e) {
				e.preventDefault();
				for (var t, a = i(e), r = 0; r < a.length; r++)
					t = n(a[r].identifier, h.ongoingTouches), t >= 0 && h.ongoingTouches.splice(t, 1)
			},
			e.exports = {
				Handler: r,
				KeyBinder: o,
				MouseHandler: s,
				TouchHandler: c,
				eventHandlers: A,
				init: l
			}
		}, function (e, t) {
			function a(e) {
				var t = e.keyCode;
				return t >= 65 && t <= 90 ? t += 32 : (t = r[e.keyCode] || e.keyCode, 2 === e.location && t >= 1248 && t <= 1251 && (t += 4)),
				t
			}
			function n(e) {
				var t,
				n = a(e);
				return t = n >= 1024 ? n - 1024 : o[n] || n
			}
			function i(e) {
				return s[e.keyCode] || s[a(e)]
			}
			var r = {
				16: 1249,
				17: 1248,
				18: 1250,
				20: 1081,
				33: 1099,
				34: 1102,
				35: 1101,
				36: 1098,
				37: 1104,
				38: 1106,
				39: 1103,
				40: 1105,
				44: 316,
				45: 1097,
				46: 127,
				91: 1251,
				93: 1125,
				96: 1122,
				97: 1113,
				98: 1114,
				99: 1115,
				100: 1116,
				101: 1117,
				102: 1118,
				103: 1119,
				104: 1120,
				9: 1121,
				106: 1109,
				107: 1111,
				109: 1110,
				110: 1123,
				111: 1108,
				112: 1082,
				113: 1083,
				114: 1084,
				115: 1085,
				116: 1086,
				117: 1087,
				118: 1088,
				119: 1089,
				120: 1090,
				121: 1091,
				122: 1092,
				123: 1093,
				124: 1128,
				125: 1129,
				126: 1130,
				127: 1131,
				128: 1132,
				129: 1133,
				130: 1134,
				131: 1135,
				132: 1136,
				133: 1137,
				134: 1138,
				135: 1139,
				144: 1107,
				160: 94,
				161: 33,
				162: 34,
				163: 35,
				164: 36,
				165: 37,
				166: 38,
				167: 95,
				168: 40,
				169: 41,
				170: 42,
				171: 43,
				172: 124,
				173: 45,
				174: 123,
				175: 125,
				176: 126,
				181: 127,
				182: 129,
				183: 128,
				188: 44,
				190: 46,
				191: 47,
				192: 96,
				219: 91,
				220: 92,
				221: 93,
				222: 39,
				224: 1251
			},
			o = {
				8: 42,
				9: 43,
				13: 40,
				27: 41,
				32: 44,
				35: 204,
				39: 53,
				44: 54,
				46: 55,
				47: 56,
				48: 39,
				49: 30,
				50: 31,
				51: 32,
				52: 33,
				53: 34,
				54: 35,
				55: 36,
				56: 37,
				57: 38,
				58: 203,
				59: 51,
				61: 46,
				91: 47,
				92: 49,
				93: 48,
				96: 52,
				97: 4,
				98: 5,
				99: 6,
				100: 7,
				101: 8,
				102: 9,
				103: 10,
				104: 11,
				105: 12,
				106: 13,
				107: 14,
				108: 15,
				109: 16,
				110: 17,
				111: 18,
				112: 19,
				113: 20,
				114: 21,
				115: 22,
				116: 23,
				117: 24,
				118: 25,
				119: 26,
				120: 27,
				121: 28,
				122: 29,
				127: 76,
				305: 224,
				308: 226,
				316: 70
			},
			s = {
				16: "SHIFT",
				20: "CAPS",
				33: "PAGE_UP",
				34: "PAGE_DOWN",
				35: "END",
				36: "HOME",
				37: "LEFT",
				38: "UP",
				39: "RIGHT",
				40: "DOWN",
				8: "BACKSPACE",
				9: "TAB",
				13: "RETURN",
				27: "ESCAPE",
				32: "SCAPE",
				44: ",",
				46: ".",
				47: "/",
				48: "0",
				49: "1",
				50: "2",
				51: "3",
				52: "4",
				53: "5",
				54: "6",
				55: "7",
				56: "8",
				57: "9",
				58: ":",
				59: ";",
				61: "=",
				91: "[",
				92: "BACKSLASH",
				93: "]",
				96: "APOSTROPHE",
				97: "A",
				98: "B",
				99: "C",
				100: "D",
				101: "E",
				102: "F",
				103: "G",
				104: "H",
				105: "I",
				106: "J",
				107: "K",
				108: "L",
				109: "M",
				110: "N",
				111: "O",
				112: "P",
				113: "Q",
				114: "R",
				115: "S",
				116: "T",
				117: "U",
				118: "V",
				119: "W",
				120: "X",
				121: "Y",
				122: "Z",
				127: "DELETE",
				305: "CTRL",
				17: "CTRL",
				308: "ALT",
				18: "ALT",
				316: "PRINT_SCREEN"
			};
			e.exports = {
				GetKeyName: i,
				GetKeyCode: n
			}
		}, function (e, t, a) {
			var n = a(4),
			i = a(29);
			e.exports = function (e) {
				var t = {
					smooth: !1,
					zoomVelocityMouse: 1,
					zoomVelocityTouch: 1,
					maxZoomLevel: 1 / 0,
					minZoomLevel:  - (1 / 0),
					targetZoomLevel: 1,
					zoomLevel: 1,
					inputSpeed: 0,
					maxMouseDT: .02,
					maxTouchDT: .05,
					maxTouchDDist: 1.5,
					maxMouseDelta: 2,
					speedMod: !1,
					forwardPressed: !1,
					backPressed: !1,
					zoomPressed: 0
				};
				if (e)
					for (var a in e)
						a in t && (t[a] = e[a]);
				return t.targetZoomLevel = t.zoomLevel,
				t.update = function (e) {
					var a = Math.abs(t.inputSpeed) > .01 ? t.inputSpeed : 0,
					n = t.speedMod ? .01 : 1,
					i = -a * n * .75;
					t.forwardPressed && (i -= 2 * e),
					t.backPressed && (i += 2 * e),
					Math.abs(t.zoomPressed) > .01 && (i -= 5 * t.zoomPressed * Math.min(e, .1)),
					t.targetZoomLevel = t.targetZoomLevel * (1 + i),
					t.targetZoomLevel = t.targetZoomLevel > t.maxZoomLevel ? t.maxZoomLevel : t.targetZoomLevel,
					t.targetZoomLevel = t.targetZoomLevel < t.minZoomLevel ? t.minZoomLevel : t.targetZoomLevel,
					t.updateSmoothing(e),
					t.resetKeys()
				},
				t.updateSmoothing = function (e) {
					t.smooth ? t.zoomLevel = n.math.lerp(t.zoomLevel, t.targetZoomLevel, Math.min(10 * e, 1)) : t.zoomLevel = t.targetZoomLevel
				},
				t.zoom = function (e) {
					t.zoomPressed = e
				},
				t.enter = function (e) {
					function a(e, a, n) {
						t.speedMod = n
					}
					function n(e, a, n) {
						t.forwardPressed = n
					}
					function r(e, a, n) {
						t.backPressed = n
					}
					t.mouse = i.MouseHandler("camera_zoom_mouse", {
							scroll: function (e, a, n) {
								if (n)
									return n > t.maxMouseDelta ? n = t.maxMouseDelta : n < -t.maxMouseDelta && (n = -t.maxMouseDelta), e > t.maxMouseDT && (e = t.maxMouseDT), t.inputSpeed = -n * t.zoomVelocityMouse * e, !0
							}
						}),
					t.touch = i.TouchHandler("camera_zoom_touch", {
							multi: function (e, a, n, i, r, o, s) {
								if (2 == s && Math.abs(i) > n)
									return i > t.maxTouchDDist ? i = t.maxTouchDDist : i < -t.maxTouchDDist && (i = -t.maxTouchDDist), e > t.maxTouchDT && (e = t.maxTouchDT), t.inputSpeed = i * t.zoomVelocityTouch * e, !0
							}
						}),
					t.resetKeys = function () {
						t.inputSpeed = 0,
						t.speedMod = !1,
						t.forwardPressed = !1,
						t.backPressed = !1,
						t.zoomPressed = 0
					},
					t.bindings = i.KeyBinder("camera_zoom_bindings", {
							SHIFT: a,
							W: n,
							S: r
						}),
					e.addInputHandler(t.mouse),
					e.addInputHandler(t.touch),
					e.addInputHandler(t.bindings)
				},
				t.exit = function (e) {
					e.deleteInputHandler("camera_zoom_mouse"),
					e.deleteInputHandler("camera_zoom_touch"),
					e.deleteInputHandler("camera_zoom_bindings")
				},
				t
			}
		}, function (e, t, a) {
			var n = a(4),
			i = a(26),
			r = a(33),
			o = a(28);
			e.exports = function (e) {
				var t = i({
						parent: e.frame.parent
					});
				if (!t.parent)
					throw Error("FreeFly: Missing required parameter: parent");
				return t.freeFly = r({
						frameParent: t.parent,
						position: e.position || [0, 0, 0]
					}),
				t.freeLook = e.lookController || o({
						orientation: e.orientation || [0, 0, 0, 1],
						useStrafeKeys: !1
					}),
				t.update = function (e, a) {
					t.frame.parent = t.parent;
					var i = [0, 1, 2].map(function (e) {
						return n.frame.getAxis(t.frame, e)
					});
					t.freeLook.update(e, a, i[2], i[0], i[1]),
					t.freeFly.update(e, a, t.getClosestSurface(e), i[2], i[0], i[1]),
					t.frame.position = t.freeFly.position,
					t.frame.orientation = t.freeLook.orientation
				},
				t.frame = {
					parent: t.parent,
					position: t.freeFly.position,
					orientation: t.freeLook.orientation
				},
				t.zoom = function (e) {
					t.freeFly.zoom(e)
				},
				t.enter = function (e) {
					e.deleteInputHandler("camera_zoom_mouse"),
					e.deleteInputHandler("camera_zoom_touch"),
					e.deleteInputHandler("camera_zoom_bindings"),
					t.freeFly.enter(e),
					t.freeLook.enter(e)
				},
				t.exit = function (e) {
					t.freeFly.exit(e),
					t.freeLook.exit(e)
				},
				t
			},
			e.exports.ignorePosition = !1
		}, function (e, t, a) {
			var n = a(4),
			i = a(29);
			e.exports = function (e) {
				var t = {
					velocity: [0, 0, 0],
					acceleration: 10,
					frameParent: null,
					position: [0, 0, 0],
					minimumSpeed: 8,
					maximumSpeed: 1e15,
					speedMod: !1,
					forwardPressed: !1,
					backPressed: !1,
					leftPressed: !1,
					rightPressed: !1,
					downPressed: !1,
					upPressed: !1,
					speedUpPressed: !1,
					speedDownPressed: !1,
					zoomPressed: 0,
					scrollSpeed: 0
				};
				if (e)
					for (var a in e)
						a in t && (t[a] = e[a]);
				if (t.frameParent = n.scene.get(t.frameParent), !t.frameParent)
					throw Error("Invalid FlyController frame");
				return t.updateFrameParent = function (e, a) {
					if (a = n.scene.get(a), a && a != t.frameParent) {
						var i = n.Frame();
						i.parent = t.frameParent,
						i.position = t.position,
						i.orientation = [0, 0, 0, 1],
						t.position = a.frame.convert(i, e.clock.time).position
					}
				},
				t.update = function (e, a, i, r, o, s) {
					var c = t.speedMod ? .01 : 1,
					l = c * n.math.clamp(i || 0, t.minimumSpeed, t.maximumSpeed),
					u = [0, 0, 0];
					t.forwardPressed ? u = n.math.vAdd(u, n.math.vMul(r, -l)) : t.backPressed && (u = n.math.vAdd(u, n.math.vMul(r, l))),
					t.leftPressed ? u = n.math.vAdd(u, n.math.vMul(o, -l)) : t.rightPressed && (u = n.math.vAdd(u, n.math.vMul(o, l))),
					t.downPressed ? u = n.math.vAdd(u, n.math.vMul(s, l)) : t.upPressed && (u = n.math.vAdd(u, n.math.vMul(s, -l)));
					var d = a > .1 ? .1 : a;
					t.speedUpPressed ? d > 0 && (t.mimimumSpeed = t.minimumSpeed * Math.pow(2, d)) : t.speedDownPressed && d > 0 && (t.mimimumSpeed = t.minimumSpeed * Math.pow(.5, d));
					var M = (Math.abs(t.scrollSpeed) > .01 ? t.scrollSpeed : 0) + -10 * t.zoomPressed;
					u = n.math.vAdd(u, n.math.vMul(r, l * M)),
					t.velocity = n.math.lerp(Math.min(t.acceleration * a, 1), t.velocity, u),
					t.position = n.math.vAdd(t.position, n.math.vMul(t.velocity, a)),
					t.resetKeys()
				},
				t.zoom = function (e) {
					t.zoomPressed = e
				},
				t.enter = function (e) {
					function a(e, a, n) {
						t.speedMod = n
					}
					function n(e, a, n) {
						t.forwardPressed = n
					}
					function r(e, a, n) {
						t.backPressed = n
					}
					function o(e, a, n) {
						t.leftPressed = n
					}
					function s(e, a, n) {
						t.rightPressed = n
					}
					function c(e, a, n) {
						t.upPressed = n
					}
					function l(e, a, n) {
						t.downPressed = n
					}
					function u(e, a, n) {
						t.speedUpPressed = n
					}
					function d(e, a, n) {
						t.speedDownPressed = n
					}
					t.mouse = i.MouseHandler("camera_fly_mouse", {
							scroll: function (e, a, n, i, r) {
								return !!n && (t.zoomSpeed = r, !0)
							}
						}),
					t.touch = i.TouchHandler("camera_fly_touch", {
							multi: function (e, a, n, i, r, o, s) {
								if (2 == s && Math.abs(n) < .02)
									return t.zoomSpeed = i, !0
							}
						}),
					t.resetKeys = function () {
						t.zoomSpeed = 0,
						t.speedMod = !1,
						t.forwardPressed = !1,
						t.backPressed = !1,
						t.leftPressed = !1,
						t.rightPressed = !1,
						t.upPressed = !1,
						t.downPressed = !1,
						t.speedUpPressed = !1,
						t.speedDownPressed = !1,
						t.zoomPressed = 0
					},
					t.bindings = i.KeyBinder("camera_fly_bindings", {
							LEFT_SHIFT: a,
							W: n,
							UP: n,
							S: r,
							DOWN: r,
							A: o,
							LEFT: o,
							D: s,
							RIGHT: s,
							F: c,
							R: l,
							T: u,
							G: d
						}),
					e.addInputHandler(t.mouse),
					e.addInputHandler(t.touch),
					e.addInputHandler(t.bindings)
				},
				t.exit = function (e) {
					e.deleteInputHandler("camera_fly_mouse"),
					e.deleteInputHandler("camera_fly_touch"),
					e.deleteInputHandler("camera_fly_bindings")
				},
				t
			}
		}, function (e, t, a) {
			var n = a(4);
			e.exports = function (e) {
				var t = {
					targetOrientation: [0, 0, 0, 1],
					orientation: [0, 0, 0, 1]
				};
				if (e)
					for (var a in e)
						a in t && (t[a] = e[a]);
				return t.offset = n.math.qMulQ(t.targetOrientation, n.math.conjugate(n.app.getWin().vrDevice.getPose().orientation)),
				t.update = function () {
					t.orientation = n.math.qMulQ(t.offset, n.app.getWin().vrDevice.getPose().orientation)
				},
				t.enter = function () {},
				t.exit = function () {},
				t
			}
		}, function (e, t, a) {
			function n(e, t) {
				for (var a, n = null, i = Math.max(screen.height, screen.width) / 4, r = Math.min(screen.height, screen.width) / 2, o = 25, s = 0; s < e.length; s++)
					e[s] && (a = e[s][1].getBoundingClientRect(), a.left - o < i && a.right + o > i && a.bottom + o > r && a.top - o < r && (e[s][1].style.opacity > .4 || null === n || t[e[s][1].innerHTML] < t[n[1].innerHTML]) && (n = e[s]));
				return n
			}
			function i() {
				return g.currPair
			}
			function r() {
				return g.clock
			}
			function o() {
				g.currPair = null,
				g.clock = 0
			}
			function s(e, t) {
				var a = e[1];
				a.style.color = "Blue",
				t.style.color = "Blue";
				var n = e[0];
				d.actions.onMouseOver(n),
				g.currPair = e,
				g.clock++
			}
			function c(e, t) {
				var a = e[0],
				n = e[1];
				"System" === a.nodeType ? (n.style.color = "rgb(255, 127, 51)", t.style.color = "rgb(255, 127, 51)") : (n.style.color = "white", t.style.color = "white"),
				d.actions.onMouseOut(a),
				o()
			}
			function l(e) {
				var t = e[0];
				d.actions.onClick(t, M.speed.standard, !0)
			}
			function u() {
				g.clock = g.clock + 1
			}
			var d = a(23),
			M = a(24),
			g = {
				currPair: null,
				clock: null
			};
			e.exports = {
				getIntersection: n,
				getCurrPair: i,
				resetRay: o,
				VRmouseover: s,
				VRmouseout: c,
				VRmouseclick: l,
				getClock: r,
				incClock: u
			}
		}, function (e, t, a) {
			function n(e) {
				d.currPick = e
			}
			function i() {
				d.currPick = null,
				d.clock = 0
			}
			function r() {
				return d.currPick
			}
			function o(e) {
				l.actions.onPick(e, u.speed.standard, !0)
			}
			function s() {
				d.clock = d.clock + 1
			}
			function c() {
				return d.clock
			}
			var l = a(23),
			u = a(24),
			d = {
				currPick: null,
				clock: 0
			};
			e.exports = {
				pickOver: n,
				getCurrPick: r,
				VRplanetClick: o,
				incClock: s,
				getClock: c,
				resetRay: i
			}
		}, function (e, t, a) {
			function n(e, t, a) {
				var n;
				n = e.tags.indexOf("!*") > -1 ? e.tags.filter(function (e) {
						return "!" !== e[0]
					}) : a.slice(),
				n = n.filter(function (t) {
						return e.tags.indexOf("!" + t) < 0
					});
				var i = e.uri;
				return i = i.replace("\\name", t),
				i = i.replace("\\tags", a),
				e.uri.indexOf("\\tag") > -1 ? a.map(function (t) {
					return [i.replace("\\tag", t), e, t]
				}) : [[i, e, "*"]]
			}
			function i(e, t) {
				var a = u.map(function (a) {
						return n(a, e, t)
					});
				return a.reduce(function (e, t) {
					return e.concat(t)
				})
			}
			function r(e, t, a) {
				function n(a) {
					if (a ? l.patch(u, a) : console.verboseWarn("scene/fetch: missing json from " + i), t.length > 1)
						return void r(e, t.slice(1), u);
					try {
						e.load(u)
					} catch (n) {
						console.exception("scene/fetch: Failed to load scene node " + e.name + 'from "' + i + '":', n)
					}
				}
				var i = t[0][0],
				o = t[0][1],
				s = t[0][2],
				u = a || {},
				d = {
					uri: i,
					type: "json"
				};
				if (o.manifest) {
					if (o.data && o.data[s])
						return void n(o.data[s][e.name]);
					var M = new c.JSDataSource(d, function (t) {
							o.data = o.data || {},
							o.data[s] = t && t.data ? t.data : {},
							t && t["delete"](),
							n(o.data[s][e.name])
						});
					return void(M || console.error("Failed to construct a js data source:", d))
				}
				var g = new c.JSDataSource(d, function (e) {
						n(e ? e.data : void 0),
						e && e["delete"]()
					});
				g || console.error("Failed to construct a js data source:", d)
			}
			function o(e, t) {
				var a = i(e.name, t);
				return 0 !== a.length && (console.verbose && console.info("scene/fetch: Load node " + e.name + " from " + a), r(e, a), !0)
			}
			var s = a(3),
			c = a(4),
			l = a(38),
			u = [];
			s.scene.servers && (u = u.concat(s.scene.servers.split(",").map(function (e) {
							for (var t = {
									manifest: !1,
									tags: []
								}, a = e.split("@"); a.length > 1; )
								t.tags.push(a.shift());
							return 0 === t.tags.length && t.tags.push("*"),
							t.uri = a[0],
							t.uri.indexOf("\\name") < 0 && (t.manifest = !0),
							t
						}))),
			e.exports = {
				servers: u,
				URL: n,
				URLs: i,
				getURLs: r,
				hook: o
			}
		}, function (e, t, a) {
			var n = a(39);
			e.exports = {
				makePatch: function (e, t) {
					var a = n.createPatch(e, t);
					return a
				},
				patch: function (e, t) {
					var a = [];
					a = Array.isArray(t) ? t : this.makePatch(e, t),
					n.applyPatch(e, a)
				}
			}
		}, function (e, t) {
			!function (a) {
				if ("object" == typeof t && "undefined" != typeof e)
					e.exports = a();
				else if ("function" == typeof define && define.amd)
					define([], a);
				else {
					var n;
					n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
					n.rfc6902 = a()
				}
			}
			(function () {
				return function e(t, a, n) {
					function i(o, s) {
						if (!a[o]) {
							if (!t[o]) {
								var c = "function" == typeof require && require;
								if (!s && c)
									return c(o, !0);
								if (r)
									return r(o, !0);
								var l = new Error("Cannot find module '" + o + "'");
								throw l.code = "MODULE_NOT_FOUND",
								l
							}
							var u = a[o] = {
								exports: {}
							};
							t[o][0].call(u.exports, function (e) {
								var a = t[o][1][e];
								return i(a ? a : e)
							}, u, u.exports, e, t, a, n)
						}
						return a[o].exports
					}
					for (var r = "function" == typeof require && require, o = 0; o < n.length; o++)
						i(n[o]);
					return i
				}
				({
					1: [function (e, t, a) {
							"use strict";
							function n(e, t) {
								var a = {};
								for (var n in e)
									a[n] = 1;
								for (var i in t)
									delete a[i];
								return Object.keys(a)
							}
							function i(e) {
								var t = {};
								e.forEach(function (e) {
									for (var a in e)
										t[a] = (t[a] || 0) + 1
								});
								var a = e.length;
								for (var n in t)
									t[n] < a && delete t[n];
								return Object.keys(t)
							}
							function r(e) {
								return void 0 === e ? "undefined" : null === e ? "null" : Array.isArray(e) ? "array" : typeof e
							}
							function o(e) {
								return "add" === e.op
							}
							function s(e) {
								return "remove" === e.op
							}
							function c(e, t, a) {
								function n(a, r) {
									var o = i[a + "," + r];
									if (void 0 === o) {
										if (p(e[a - 1], t[r - 1]))
											o = n(a - 1, r - 1);
										else {
											var s = [];
											if (a > 0) {
												var c = n(a - 1, r);
												s.push({
													operations: c.operations.concat({
														op: "remove",
														index: a - 1
													}),
													cost: c.cost + 1
												})
											}
											if (r > 0) {
												var l = n(a, r - 1);
												s.push({
													operations: l.operations.concat({
														op: "add",
														index: a - 1,
														value: t[r - 1]
													}),
													cost: l.cost + 1
												})
											}
											if (a > 0 && r > 0) {
												var u = n(a - 1, r - 1);
												s.push({
													operations: u.operations.concat({
														op: "replace",
														index: a - 1,
														original: e[a - 1],
														value: t[r - 1]
													}),
													cost: u.cost + 1
												})
											}
											var d = s.sort(function (e, t) {
													return e.cost - t.cost
												})[0];
											o = d
										}
										i[a + "," + r] = o
									}
									return o
								}
								var i = {
									"0,0": {
										operations: [],
										cost: 0
									}
								},
								r = isNaN(e.length) || e.length <= 0 ? 0 : e.length,
								c = isNaN(t.length) || t.length <= 0 ? 0 : t.length,
								l = n(r, c).operations,
								u = l.reduce(function (e, t) {
										var n = M(e, 2),
										i = n[0],
										c = n[1];
										if (o(t)) {
											var l = t.index + 1 + c,
											u = l < r + c ? String(l) : "-",
											p = {
												op: t.op,
												path: a.add(u).toString(),
												value: t.value
											};
											return [i.concat(p), c + 1]
										}
										if (s(t)) {
											var p = {
												op: t.op,
												path: a.add(String(t.index + c)).toString()
											};
											return [i.concat(p), c - 1]
										}
										var m = a.add(String(t.index + c)),
										A = d(t.original, t.value, m);
										return [i.concat.apply(i, g(A)), c]
									}, [[], 0]),
								m = M(u, 2),
								A = m[0];
								m[1];
								return A
							}
							function l(e, t, a) {
								var r = [];
								return n(e, t).forEach(function (e) {
									r.push({
										op: "remove",
										path: a.add(e).toString()
									})
								}),
								n(t, e).forEach(function (e) {
									r.push({
										op: "add",
										path: a.add(e).toString(),
										value: t[e]
									})
								}),
								i([e, t]).forEach(function (n) {
									r.push.apply(r, g(d(e[n], t[n], a.add(n))))
								}),
								r
							}
							function u(e, t, a) {
								return p(e, t) ? [] : [{
										op: "replace",
										path: a.toString(),
										value: t
									}
								]
							}
							function d(e, t, a) {
								var n = r(e),
								i = r(t);
								return "array" == n && "array" == i ? c(e, t, a) : "object" == n && "object" == i ? l(e, t, a) : u(e, t, a)
							}
							var M = function (e, t) {
								if (Array.isArray(e))
									return e;
								if (Symbol.iterator in Object(e)) {
									for (var a, n = [], i = e[Symbol.iterator](); !(a = i.next()).done && (n.push(a.value), !t || n.length !== t); );
									return n
								}
								throw new TypeError("Invalid attempt to destructure non-iterable instance")
							},
							g = function (e) {
								if (Array.isArray(e)) {
									for (var t = 0, a = Array(e.length); t < e.length; t++)
										a[t] = e[t];
									return a
								}
								return Array.from(e)
							};
							a.subtract = n,
							a.intersection = i,
							a.objectType = r,
							a.diffArrays = c,
							a.diffObjects = l,
							a.diffValues = u,
							a.diffAny = d,
							Object.defineProperty(a, "__esModule", {
								value: !0
							});
							var p = e("./equal").compare
						}, {
							"./equal": 2
						}
					],
					2: [function (e, t, a) {
							"use strict";
							function n(e, t) {
								for (var a = [], n = 0, i = e.length; n < i; n++)
									a.push([e[n], t[n]]);
								return a
							}
							function i(e, t) {
								return e.length === t.length && n(e, t).every(function (e) {
									return o(e[0], e[1])
								})
							}
							function r(e, t) {
								var a = Object.keys(e),
								n = Object.keys(t);
								return !!i(a, n) && a.every(function (a) {
									return o(e[a], t[a])
								})
							}
							function o(e, t) {
								return e === t || (Array.isArray(e) && Array.isArray(t) ? i(e, t) : Object(e) === e && Object(t) === t && r(e, t))
							}
							a.compare = o,
							Object.defineProperty(a, "__esModule", {
								value: !0
							})
						}, {}
					],
					3: [function (e, t, a) {
							"use strict";
							var n = function o(e, t, a) {
								var n = Object.getOwnPropertyDescriptor(e, t);
								if (void 0 === n) {
									var i = Object.getPrototypeOf(e);
									return null === i ? void 0 : o(i, t, a)
								}
								if ("value" in n && n.writable)
									return n.value;
								var r = n.get;
								if (void 0 !== r)
									return r.call(a)
							},
							i = function (e, t) {
								if ("function" != typeof t && null !== t)
									throw new TypeError("Super expression must either be null or a function, not " + typeof t);
								e.prototype = Object.create(t && t.prototype, {
										constructor: {
											value: e,
											enumerable: !1,
											writable: !0,
											configurable: !0
										}
									}),
								t && (e.__proto__ = t)
							},
							r = function (e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							};
							Object.defineProperty(a, "__esModule", {
								value: !0
							});
							a.MissingError = function (e) {
								function t(e) {
									r(this, t),
									n(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "Value required at path: " + e),
									this.path = e,
									this.name = this.constructor.name
								}
								return i(t, e),
								t
							}
							(Error),
							a.InvalidOperationError = function (e) {
								function t(e) {
									r(this, t),
									n(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "Invalid operation: " + e),
									this.op = e,
									this.name = this.constructor.name
								}
								return i(t, e),
								t
							}
							(Error),
							a.TestError = function (e) {
								function t(e, a) {
									r(this, t),
									n(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "Test failed: " + e + " != " + a),
									this.actual = e,
									this.expected = a,
									this.name = this.constructor.name,
									this.actual = e,
									this.expected = a
								}
								return i(t, e),
								t
							}
							(Error)
						}, {}
					],
					4: [function (e, t, a) {
							"use strict";
							function n(e, t) {
								return t.map(function (t) {
									var a = c[t.op];
									return void 0 === a ? new o(t.op) : a(e, t)
								})
							}
							function i(e, t) {
								var a = new s;
								return l(e, t, a)
							}
							var r = function (e) {
								return e && e.__esModule ? e : {
									"default": e
								}
							};
							a.applyPatch = n,
							a.createPatch = i,
							Object.defineProperty(a, "__esModule", {
								value: !0
							});
							var o = e("./errors").InvalidOperationError,
							s = e("./pointer").Pointer,
							c = r(e("./patch")),
							l = e("./diff").diffAny
						}, {
							"./diff": 1,
							"./errors": 3,
							"./patch": 5,
							"./pointer": 6
						}
					],
					5: [function (e, t, a) {
							"use strict";
							function n(e, t, a) {
								Array.isArray(e) ? "-" == t ? e.push(a) : e.splice(t, 0, a) : e[t] = a
							}
							function i(e, t) {
								Array.isArray(e) ? e.splice(t, 1) : delete e[t]
							}
							function r(e, t) {
								var a = d.fromJSON(t.path).evaluate(e);
								return void 0 === a.parent ? new p(t.path) : (n(a.parent, a.key, t.value), null)
							}
							function o(e, t) {
								var a = d.fromJSON(t.path).evaluate(e);
								return void 0 === a.value ? new p(t.path) : (i(a.parent, a.key), null)
							}
							function s(e, t) {
								var a = d.fromJSON(t.path).evaluate(e);
								return void 0 === a.value ? new p(t.path) : (a.parent[a.key] = t.value, null)
							}
							function c(e, t) {
								var a = d.fromJSON(t.from).evaluate(e);
								if (void 0 === a.value)
									return new p(t.from);
								var r = d.fromJSON(t.path).evaluate(e);
								return void 0 === r.parent ? new p(t.path) : (i(a.parent, a.key), n(r.parent, r.key, a.value), null)
							}
							function l(e, t) {
								var a = d.fromJSON(t.from).evaluate(e);
								if (void 0 === a.value)
									return new p(t.from);
								var r = d.fromJSON(t.path).evaluate(e);
								return void 0 === r.parent ? new p(t.path) : (i(a.parent, a.key), n(r.parent, r.key, a.value), null)
							}
							function u(e, t) {
								var a = d.fromJSON(t.path).evaluate(e),
								n = M(a.value, t.value);
								return n ? null : new m(a.value, t.value)
							}
							a.add = r,
							a.remove = o,
							a.replace = s,
							a.move = c,
							a.copy = l,
							a.test = u,
							Object.defineProperty(a, "__esModule", {
								value: !0
							});
							var d = e("./pointer").Pointer,
							M = e("./equal").compare,
							g = e("./errors"),
							p = g.MissingError,
							m = g.TestError
						}, {
							"./equal": 2,
							"./errors": 3,
							"./pointer": 6
						}
					],
					6: [function (e, t, a) {
							"use strict";
							function n(e) {
								return e.replace(/~1/g, "/").replace(/~0/g, "~")
							}
							function i(e) {
								return e.replace(/~/g, "~0").replace(/\//g, "~1")
							}
							var r = function () {
								function e(e, t) {
									for (var a in t) {
										var n = t[a];
										n.configurable = !0,
										n.value && (n.writable = !0)
									}
									Object.defineProperties(e, t)
								}
								return function (t, a, n) {
									return a && e(t.prototype, a),
									n && e(t, n),
									t
								}
							}
							(),
							o = function (e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							};
							Object.defineProperty(a, "__esModule", {
								value: !0
							});
							a.Pointer = function () {
								function e() {
									var t = void 0 === arguments[0] ? [""] : arguments[0];
									o(this, e),
									this.tokens = t
								}
								return r(e, {
									toString: {
										value: function () {
											return this.tokens.map(i).join("/")
										}
									},
									evaluate: {
										value: function (e) {
											for (var t = null, a = null, n = 1, i = this.tokens.length; n < i; n++)
												t = e, a = this.tokens[n], e = (t || {})[a];
											return {
												parent: t,
												key: a,
												value: e
											}
										}
									},
									push: {
										value: function (e) {
											this.tokens.push(e)
										}
									},
									add: {
										value: function (t) {
											var a = this.tokens.concat(String(t));
											return new e(a)
										}
									}
								}, {
									fromJSON: {
										value: function (t) {
											var a = t.split("/").map(n);
											if ("" !== a[0])
												throw new Error("Invalid JSON Pointer: " + t);
											return new e(a)
										}
									}
								}),
								e
							}
							()
						}, {}
					]
				}, {}, [4])(4)
			})
		}, function (e, t, a) {
			function n() {
				var e;
				o.scene.hooks.forEach(function (t, a) {
					t == this && (e = a)
				}),
				e && (console.verboseInfo("scene/hooks/static: Removing static scene hook"), o.scene.hooks.splice(e, 1))
			}
			function i(e) {
				if (!r.scene["static"])
					return n(), !1;
				if (e.loaded)
					return !0;
				var t = r.scene["static"][e.name];
				if (!t)
					return !1;
				try {
					e.load(t.json);
					for (var a in t.parents) {
						var i = o.scene.get(a),
						s = {
							children: {}
						};
						s.children[e.name] = t.parents[a],
						i.load(s)
					}
				} catch (c) {
					console.exception("scene/hooks/static.js: Failed to load scene node " + e.name, c)
				}
				return !0
			}
			var r = a(3),
			o = a(4);
			e.exports = {
				fini: n,
				hook: i
			}
		}, function (e, t, a) {
			function n() {
				console.log("graphics/graphics: Initializing queues");
				var e = i.app.core,
				t = r._queues = e.getRenderQueueList();
				r.queues = {
					virtualDraw: t.getQueue("virtualDraw"),
					virtualScan: t.getQueue("virtualScan"),
					"default": e.getDefaultRenderQueue(),
					identity: t.getQueue("identity"),
					transparent: t.getQueue("transparent"),
					orbit: t.getQueue("orbit"),
					panoSphere: t.getQueue("fffffff"),
					panoImage: t.getQueue("panoImage")
				},
				r.queues.addConstraint = function (e, t) {
					r._queues.addConstraint(r.queues[e], r.queues[t])
				},
				r.queues.activate = function (e) {
					r._queues.activate(r.queues[e])
				},
				r.queues.transparent.order = 1,
				r.queues.virtualDraw.order = 2,
				r.queues.panoImage.order = 3,
				r.queues.orbit.order = 4,
				r.queues.identity.order = 5,
				r.queues["default"].order = 6,
				r.queues.virtualScan.order = 7,
				r.queues.activate("transparent"),
				r.queues.activate("virtualDraw"),
				r.queues.activate("panoImage"),
				r.queues.activate("orbit"),
				r.queues.activate("identity"),
				r.queues.activate("virtualScan")
			}
			var i = a(4),
			r = {};
			r.init = function () {
				n(),
				r.init = function () {}
			},
			e.exports = r
		}, function (e, t, a) {
			!function () {
				var e = a(4),
				t = a(43),
				n = a(45),
				i = a(50),
				r = a(23),
				o = a(24),
				s = a(22),
				c = a(55);
				a(e.settings.mobile ? 56 : 57),
				a(58),
				a(59);
				var l;
				"Ranger" === e.settings.title && (e.settings.title = "NASA's Eyes: Eclipse 2017"),
				a(1).init(document.getElementById("canvas"), function () {
					l = a(60)("NASA's Eyes: Eclipse 2017", 1600, 900, !1, !0, document.getElementById("canvas")),
					e.app.setWin(l),
					e.scene.tags = ["eclipse"],
					e.scene.hooks = ["fetch"],
					e.scene.get("SS").triggerLoad(),
					e.settings.camera.target = "Sun",
					t.init(l),
					l._camera.clock = {
						time: {
							value: 556612000.2144
						},
						rate: 0
					},
					e.swapImageIconPath = "/swvcss/eclipse/eclipse_qa/assets/swap.svg",
					e.mapPinIconPath = "/swvcss/eclipse/eclipse_qa/assets/map_pin.svg",
					n.init(l);
					var u = e.scene.get("Earth");
					u.addTrigger(null, function () {
						var e,
						t = c.locationData,
						a = t.tier1,
						i = t.tier2,
						r = t.tier3,
						o = t.shadowLabels;
						u.renderables.addLOD({
							start: 0,
							end: 11
						}, "tier1"),
						u.renderables.addLOD({
							start: 0,
							end: 9.49352114988961
						}, "tier2"),
						u.renderables.addLOD({
							start: 0,
							end: 9
						}, "tier3"),
						u.renderables.addLOD({
							start: 0,
							end: 15
						}, "markers"),
						u.renderables.addLOD({
							start: 0,
							end: 15
						}, "shadowLabels");
						for (e in a)
							a[e].time = 0, n.addSurfaceLabel(u, a[e], "tier1", "location", {
								color: "#EEEEEE"
							});
						for (e in i)
							i[e].time = 0, n.addSurfaceLabel(u, i[e], "tier2", "location", {
								color: "#EEEEEE"
							});
						for (e in r)
							r[e].time = 0, n.addSurfaceLabel(u, r[e], "tier3", "location", {
								color: "#EEEEEE"
							});
						for (e in o)
							o[e].time = 0, n.addSurfaceLabel(u, o[e], "shadowLabels", "shadowLabel", {
								color: "#909298"
							})
					});
					var d = !0;
					l.bind("T", function (e, t, a) {
						return !!a && (l._window.camera.clock = {
								time: l._window.camera.clock.time,
								rate: d ? 600 : 0
							}, d = !d, !0)
					}),
					r.actions.onPick = function (e, t, a) {
						if (!e || !e.node || "interactable" in e.node && !e.node.interactable)
							return !1;
						if ("Earth" == e.node.name) {
							var i = l.getCorrectedPositionNDC(t, a),
							s = n.getLatLongFromEllipsoidSelection(l._camera, e.node, i[0], i[1]);
							if (s) {
								var c = [180 * s[0] / Math.PI, 180 * s[1] / Math.PI];
								n.locationClicked(c)
							}
						} else
							r.actions.onClick(e.node, o.speed.standard, !1)
					},
					r.actions.backgroundSingleTap = function (e, t, a, n, i, o, s, c, l, u) {
						r.actions.onPick(u, s, c)
					},
					r.actions.backgroundDoubleTap = function (e, t, a, n, i, r, o, s, c, l) {
						console.verboseLog("Double tap " + o + " : " + s + ". Picked fragment info: " + l)
					},
					s.removeAllEventHandlers("click"),
					s.removeAllEventHandlers("mouseover"),
					s.removeAllEventHandlers("mouseout"),
					s.removeAllEventHandlers("onremove"),
					s.disableInteractions(["Surface"]),
					s.addEventHandler("click", "HandleLabelClick", function (e, t) {
						var a = t.target;
						"Marker" == a.labelType && n.markerClicked(a.id)
					}),
					s.addEventHandler("onadd", "AddPopToMarker", function (e, t) {
						"Marker" == t.labelType && (t && t.icon && t.icon.color && n.updateMarkerColor(t, t.icon.color), t.popup || (n.markerRenderables[t.id].div = t, n.attachPopup(t, n.hasLocation(t.id), t.locationId, t.name), n.markerRenderables[t.id].params.popupDisplayed && n.displayMarkerPopup(t)))
					}),
					window.setTimeout(function () {
						t.applyOrbitCam(l, i.initialCamera())
					}, 2e3),
					console.info("Module startup complete")
				})
			}
			()
		}, function (e, t, a) {
			var n = a(4),
			i = a(3),
			r = a(29),
			o = a(34),
			s = a(24),
			c = a(25),
			l = a(32),
			u = a(27),
			d = a(44),
			M = {
				FreeFly: l,
				Orbit: u,
				SurfaceOrbit: d
			};
			M.init = function (e) {
				Object.keys(M).indexOf(i.camera.type) < 0 && (console.error("ranger/camera: Invalid camera type " + i.camera.type), i.camera.type = "Orbit");
				var t = n.clock.Clock(i.camera.time, i.camera.rate);
				e.initCamera({
					clock: t,
					target: n.scene.get(i.camera.target)
				}),
				e.setCamera(M[i.camera.type](i.camera)),
				M.vrBindings = r.KeyBinder("vr_bindings", {
						M: function () {
							i.stereo = !i.stereo,
							e._camera.projectionDirty = !0
						},
						V: function () {
							i.vr = !i.vr,
							M.updateCameraType(e),
							e._camera.projectionDirty = !0
						}
					}),
				e.addInputHandler(M.vrBindings)
			},
			M.updateCameraType = function (e) {
				var t;
				if (i.vr) {
					if (i.camera.type = "FreeFly", t = {
							lookController: o({
								targetOrientation: e.cameraState.freeLook.orientation,
								orientation: e.cameraState.freeLook.orientation
							}),
							parent: e.cameraState.target,
							position: e.cameraState.frame.position,
							orientation: e.cameraState.frame.orientation,
							frame: e.cameraState.frame
						}, e.setCamera(M[i.camera.type](t)), e._camera.projectionDirty = !0, e.vrDevice.capabilities.canPresent) {
						var a = {};
						a.leftBounds = [0, 0, .5, 1],
						a.rightBounds = [.5, 0, .5, 1],
						a.source = document.getElementById("canvas"),
						e.vrDevice.requestPresent(a)
					}
				} else {
					var n = e.cameraState.parent,
					r = n.ellipsoid ? Math.max(n.ellipsoid[0], n.ellipsoid[1], n.ellipsoid[2]) : 1,
					c = .05,
					l = {
						frame: e.cameraState.frame,
						target: n,
						parent: n,
						radius: 3 * r,
						positionTime: s.speed.standard,
						win: e,
						minRadius: 2 * r,
						maxRadius: n.maxSemiMajorAxis / (Math.tan(e._camera.fov) * c)
					};
					e.setCamera(s.trackingTransition(l))
				}
			},
			M.applyOrbitCam = function (e, t) {
				e.setCamera(new u(t))
			},
			M.constants = c,
			e.exports = M
		}, function (e, t, a) {
			var n = a(4),
			i = a(29),
			r = a(26);
			e.exports = function (e, t, a, o, s, c, l) {
				void 0 === l && (l = 0),
				void 0 === c && (c = 0),
				void 0 === s && (s = -Math.PI / 2),
				void 0 === o && (o = [0, 0, 0]);
				var u = r({
						offset: o,
						targetNode: e,
						orientingNode: a,
						azimuth: c,
						elevation: l,
						radius: t,
						minimumElevation: s,
						pitchSpeed: .01,
						yawSpeed: .01,
						zoomFactor: -1e-4
					});
				return u.name = function () {
					return "SurfaceOrbit" + (u.targetNode ? " target " + u.targetNode.name : "with invalid target") + (u.orientingNode ? " oriented by " + u.orientingNode.name : "")
				},
				u.frame = n.Frame(),
				u.frame.parent = e,
				u.update = function (e) {
					var t = n.Frame();
					if (t.parent = u.orientingNode, t = u.targetNode.frame.convert(t, e.clock.time), !(n.math.vNorm(t.position) < 1e-7)) {
						var a = n.math.vNormalized(n.math.vSub(u.offset, t.position)),
						i = {
							parent: u.orientingNode,
							position: [1, 0, 0],
							orientation: [0, 0, 0, 1]
						};
						i = u.targetNode.frame.convert(i, e.clock.time);
						var r = n.math.vNormalized(n.math.vSub(i.position, t.position));
						r = n.math.vNormalized(n.math.vSub(r, n.math.vMul(a, n.math.vDot(a, r))));
						var o = n.math.cross(r, a),
						s = n.math.vMul(r, u.radius);
						s = n.math.qMulV(n.math.angleAxis(u.elevation, o), s),
						s = n.math.qMulV(n.math.angleAxis(u.azimuth, a), s),
						s = n.math.vAdd(s, u.offset);
						var c = n.math.vNormalized(n.math.vSub(u.offset, s)),
						l = n.math.vSub(a, n.math.vMul(c, n.math.vDot(c, a)));
						n.math.vNorm(l) < 1e-7 && (l = r),
						l = n.math.vNormalized(l),
						u.frame = {
							parent: u.targetNode,
							position: s
						},
						u.frame.orientation = n.math.rotationBetweenVectors([0, 0, -1], c);
						var d = n.math.qMulV(u.frame.orientation, [0, 1, 0]),
						M = n.math.rotationBetweenVectors(d, l);
						u.frame.orientation = n.math.qMulQ(M, u.frame.orientation)
					}
				},
				u.zoom = function (e) {
					return u.radius += e,
					u.radius < 1e-7 && (u.radius = 1e-7),
					!0
				},
				u.yaw = function (e) {
					return u.azimuth += e,
					u.azimuth %= 2 * Math.PI,
					!0
				},
				u.pitch = function (e) {
					return u.elevation += e,
					u.elevation > Math.PI / 2 - 1e-5 && (u.elevation = Math.PI / 2 - 1e-5),
					u.elevation < s + 1e-7 && (u.elevation = s + 1e-7),
					!0
				},
				u.enter = function (e) {
					u.mouse = i.MouseHandler("camera_mouse", {
							drag: function (e, t, a) {
								return t && u.yaw(-t * u.yawSpeed),
								a && u.pitch(a * u.pitchSpeed),
								!0
							},
							scroll: function (e, t, a, n, i) {
								return i && u.zoom(i * u.zoomFactor * u.radius),
								!0
							}
						}),
					u.bindings = i.KeyBinder("camera_bindings", {
							A: function () {
								return u.yaw(-5 * u.yawSpeed)
							},
							D: function () {
								return u.yaw(5 * u.yawSpeed)
							},
							R: function () {
								return u.pitch(5 * u.pitchSpeed)
							},
							F: function () {
								return u.pitch(-5 * u.pitchSpeed)
							},
							W: function () {
								return u.zoom(5 * u.zoomFactor * u.radius)
							},
							S: function () {
								return u.zoom(-5 * u.zoomFactor * u.radius)
							}
						}),
					e.addInputHandler(u.mouse),
					e.addInputHandler(u.bindings)
				},
				u.exit = function (e) {
					e.deleteInputHandler("camera_mouse"),
					e.deleteInputHandler("camera_bindings")
				},
				u.getTarget = function () {
					return u.targetNode
				},
				u
			}
		}, function (e, t, a) {
			function n(e, t, a) {
				return t in e ? Object.defineProperty(e, t, {
					value: a,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[t] = a,
				e
			}
			function i(e) {
				if (void 0 === ne.update.send)
					return void(Te || (console.verboseError("__ranger.update.send is undefined. Ranger will not send messages until defined."), Te = !0));
				var t = {
					message: e,
					path: "/eclipse",
					success: !0
				};
				ne.update.send(t);
				var a = {
					eclipse: e
				};
				ne.update.send(a)
			}
			function r() {
				var e = ne.scene.get("Earth");
				e.addTrigger(null, function () {
					var t = e.renderables.getRenderable("geoid", "model").material;
					!function a() {
						return t.ready() ? void i({
							loadedEarth: !0
						}) : void setTimeout(a, 100)
					}
					()
				})
			}
			function o() {
				te = new ne.Renderable(ne.app.core, new ne.DataContext(ne.app), we.renderableAttributes),
				we.renderable = te,
				ne.scene.fixedRenderables.Headlight = we
			}
			function s() {
				var e = ne.scene.get("Earth"),
				t = ne.scene.get("Moon"),
				a = t.frame.get(ne.app.getWin()._camera.clock.time),
				n = e.frame.convert(a, ne.app.getWin()._window.camera).position;
				a = e.frame.get(ne.app.getWin()._camera.clock.time);
				var i = e.frame.convert(a, ne.app.getWin()._window.camera).position,
				r = ne.math.vNorm(ne.math.vSub(n, i));
				return console.verboseLog("Requested Distance Between Earth and Moon, Distance:", r),
				r
			}
			function c(e) {
				ne.scene.fixedRenderables.Headlight.enabled = e
			}
			function l(e) {
				return console.verboseLog("Setting Default Eclipse Settings for View: ", e),
				de.revertViewports(),
				ee.setTime(le.viewSettings[e].defaultTime),
				ee.setRate(le.viewSettings[e].defaultTimeRate),
				de.updateBrushTimeParams([oe.ET2UTC(le.viewSettings[e].minTime), oe.ET2UTC(le.viewSettings[e].maxTime)]),
				le.viewSettings[e].displayPip ? de.unhidePip : (de.hidePip(), function () {})
			}
			function u(e, t) {
				if (e.constructor !== {}
					.constructor)
					return console.verboseError("Invalid: setView must be JSON. Data received: ", e), void t.reject("Invalid: setView must be JSON. Data received: " + e);
				if (!("view" in e))
					return console.verboseError("Invalid: view not provided in setView. Data received: ", e), void t.reject("Invalid: view not provided in setView. Data received: " + JSON.stringify(e));
				var a = e.view;
				if ("toScale" in e) {
					if ("boolean" != typeof e.toScale)
						return console.verboseError("Invalid: toScale must be a boolean. Data received: ", e.toScale), void t.reject("Invalid: toScale must be a boolean. Data received: " + e.toScale);
					me = e.toScale
				}
				a in ue.switchTo ? !function () {
					console.verboseLog("Setting View to: ", a, "with toScale: ", me);
					var e = l(a);
					ge = a,
					ne.updates.components.eclipse.stateConstraints.setState("settingView", !0),
					"EarthMoon" === ge ? ne.updates.components.eclipse.stateConstraints.setState("earthMoonView", !0) : ne.updates.components.eclipse.stateConstraints.setState("earthMoonView", !1),
					"EarthMoonSun" === ge ? ne.updates.components.eclipse.stateConstraints.setState("earthMoonSunView", !0) : ne.updates.components.eclipse.stateConstraints.setState("earthMoonSunView", !1),
					ue.setTransitionComplete(function () {
						ne.updates.components.eclipse.stateConstraints.setState("settingView", !1),
						console.verboseLog("Transition to new View Completed."),
						i({
							setViewDone: !0
						}),
						me !== pe && me === !1 && (pe = me, Me.scalePlanets(me)),
						e(),
						t.resolve("Transition to new View Completed.")
					}),
					Me.updateTransitionScale(me, a),
					me === pe || me === !1 ? ue.switchTo[a](le.viewSettings[a].defaultFOV) : (Me.scalePlanets(me), pe = me)
				}
				() : (console.verboseError("Unknow view: ", a), t.reject("Unknow view: " + a))
			}
			function d(e) {
				var t = ne.scene.get("Earth");
				if (null !== De.earth && null !== De.politicalEarth)
					return e ? t.renderables.getRenderable("geoid", "model").material = De.politicalEarth : t.renderables.getRenderable("geoid", "model").material = De.earth, void(t.renderables.getRenderable("atmosphere", "model").enabled = !e);
				if (e) {
					var a = ["$RenderableProjectedMap", {
							projection: "WGS84",
							queue: "transparent",
							material: ["$EarthPolitical", {
									specularStrength: .05,
									specularExponent: 15,
									moonRadius: 1738,
									naturalMode: 0,
									moonPosition: [0, 0, 0],
									sunRadius: 696300,
									sunPosition: [0, 0, 0],
									bendPercent1: .215,
									bendPercent2: .42,
									bendShadow1: [.15, .15, .15, 1],
									bendShadow2: [.08, .08, .08, 1],
									umbraShadow: [.4, .4, .4, 1],
									eclipsePenumbra: "$RANGER.IMAGES/static/images/penumbra.png",
									cubeTemplateParams: {
										prefix: "$RANGER.IMAGES/static/images/earth_political_cube_",
										suffix: ".jpg"
									}
								}
							]
						}
					];
					De.earth = t.renderables.getRenderable("geoid", "model").material,
					a = re.replace(a),
					t.renderables.getRenderable("geoid", "model").updateMaterial(ne.app.core, a),
					t.renderables.getRenderable("atmosphere", "model").enabled = !e,
					De.politicalEarth = t.renderables.getRenderable("geoid", "model").material
				} else
					console.verboseError("Rejected! Political Map should not be loaded by Default")
			}
			function M(e, t) {
				if (e.constructor !== {}
					.constructor)
					return console.verboseError("Invalid: setLabelDisplay must be JSON. Data received: ", e), void t.reject("Invalid: setLabelDisplay must be JSON. Data received: " + e);
				var a = ne.scene.get("Earth");
				for (var n in e)
					switch (n) {
					case "name":
						if ("boolean" != typeof e[n])
							return console.verboseError("Invalid: setLabelDisplay name must be a boolean. Data received: ", e), void t.reject("Invalid: setLabelDisplay name must be a boolean. Data received: " + JSON.stringify(e));
						console.verboseLog("Label will display name: ", e[n]),
						Ae = e[n];
						break;
					case "time":
						if ("boolean" != typeof e[n])
							return console.verboseError("Invalid: setLabelDisplay time must be a boolean. Data received: ", e), void t.reject("Invalid: setLabelDisplay time must be a boolean. Data received: " + JSON.stringify(e));
						console.verboseLog("Label will display time: ", e[n]),
						fe = e[n];
						break;
					default:
						return console.verboseError("Unknown Display Setting: ", e),
						void t.reject("Unknown Display Setting: " + JSON.stringify(e))
					}
				var i;
				for (var r in ve)
					i = "", Ae && (i += ve[r].name), fe && (Ae ? i = i + "<br />" + ve[r].time : i += ve[r].time), ae.updateLabel(a, r, ve[r].latLng, {
						Text: i
					}, !1, ve[r].lodKey);
				t.resolve()
			}
			function g(e, t) {
				if ("boolean" != typeof e)
					return console.verboseError("Invalid: shadowLabelsEnabled must be a boolean. Data received: ", e), void t.reject("Invalid: shadowLabelsEnabled must be a boolean. Data received: " + e);
				var a = ne.scene.get("Earth");
				e ? (a.renderables.lodEnabled("shadowLabels", !0), t.resolve("shadowLabels: " + !0)) : (a.renderables.lodEnabled("shadowLabels", !1), t.resolve("shadowLabels: " + !1))
			}
			function p(e, t) {
				var a = oe.UTC2ET(e),
				n = le.validateTime(ge, a);
				if (n)
					ee.setTime(a), ee.pip && (ee.pip._camera.clock = {
							time: {
								value: a
							},
							rate: 0
						}), console.verboseLog("Setting time to: ", e), t.resolve("Setting Time to: " + e);
				else {
					var i = [oe.ET2UTC(le.viewSettings[ge].minTime), oe.ET2UTC(le.viewSettings[ge].maxTime)];
					console.verboseError("Invalid: Time needs to be in Interval [", i[0], ",", i[1], "]. Data received: ", e),
					t.reject("Invalid: Time needs to be in Interval [" + i[0] + "," + i[1] + "]. Data received: " + e)
				}
			}
			function m(e, t) {
				var a = le.validateTimeRate(ge, e);
				if (a)
					ee.setRate(e), console.verboseLog("Setting Time Rate to: ", e), t.resolve("Setting Time Rate to: " + e);
				else {
					var n = [le.viewSettings[ge].minTimeRate, le.viewSettings[ge].maxTimeRate];
					console.verboseError("Invalid: TimeRate needs to be in Interval: [", n[0], ",", n[1], "]. Data received: ", e),
					t.reject("Invalid: TimeRate needs to be in Interval [" + n[0] + "," + n[1] + "]. Data received: " + e)
				}
			}
			function A(e, t) {
				var a = le.validateFOV(ge, e);
				if (a)
					ee._camera.fov = e, console.verboseLog("Setting FOV of Camera to: ", e), t.resolve("Setting FOV of Camera to: " + e);
				else {
					var n = [le.viewSettings[ge].minFOV, le.viewSettings[ge].maxFOV];
					console.verboseError("Invalid: FOV needs to be in Interval [", n[0], ",", n[1], "]. Data received: ", e),
					t.reject("Invalid: FOV needs to be in Interval [" + n[0] + "," + n[1] + "]. Data received: " + e)
				}
			}
			function f(e, t) {
				if ("boolean" != typeof e)
					return console.verboseError("Invalid: setEclipseViewportMode must be a boolean. Data received: ", e), void t.reject("Invalid: setEclipseViewportMode must be a boolean. Data received: " + e);
				if (de.isOnscreen()) {
					var a = e ? de.telescopeFov : de.normalFov;
					de.viewsAreSwapped() ? ee._camera.fov = a : de.getSubWindow()._camera.fov = a,
					console.verboseLog("Setting FOV of eclipse viewport to: ", a),
					t.resolve("Setting FOV of eclipse viewport to: " + a)
				} else
					console.verboseError("Error: PIP is not on the screen."), t.reject("Error: PIP is not on the screen.")
			}
			function D(e, t) {
				if (!e || e.length < 3 || e.length > 4)
					return void t.reject("Invalid: Color must be vec3 or vec4.");
				var a = ne.scene.get("ConePenumbra");
				e[3] = e[3] || a.context.data.vector4.color[3],
				a.context.data.vector4.color = e,
				t.resolve("Color is updated.")
			}
			function N(e, t) {
				if (!e || e.length < 3 || e.length > 4)
					return void t.reject("Invalid: Color must be vec3 or vec4.");
				var a = ne.scene.get("ConeUmbra");
				e[3] = e[3] || a.context.data.vector4.color[3],
				a.context.data.vector4.color = e,
				t.resolve("Color is updated.")
			}
			function h(e) {
				var t = ne.scene.get("Earth");
				t.context.data["double"].shadowScale = e;
			}
			function v(e, t) {
				return "boolean" != typeof e ? (console.verboseError("Invalid: eclipseShadowEnabled must be provided a boolean. Data received: ", e), void t.reject("Invalid: eclipseShadowEnabled must be provided a boolean. Data received: " + e)) : void(e ? (h(1), t.resolve("Enabling Eclipse Shadow."), console.verboseLog("Enabling Eclipse Shadow.")) : (h(0), t.resolve("Disabling Eclipse Shadow."), console.verboseLog("Disabling Eclipse Shadow.")))
			}
			function T(e, t) {
				return "boolean" != typeof e ? (console.verboseError("Invalid: headLightEnabled must be a boolean. Data received: ", e), void t.reject("Invalid: headLightEnabled must be a boolean. Data received: " + e)) : (c(e), void(e ? (console.verboseLog("Turning HeadLight On. Data received: ", e), t.resolve("Turning HeadLight On. Data received: ", e)) : (console.verboseLog("Turning HeadLight Off. Data received: ", e), t.resolve("Turning HeadLight Off. Data received: ", e))))
			}
			function L(e, t) {
				return "boolean" != typeof e ? (console.verboseError("Invalid: politicalMapEnabled must be a boolean. Data received: ", e), void t.reject("Invalid: politicalMapEnabled must be a boolean. Data received: " + e)) : (d(e), void(e ? (console.verboseLog("Political map enabled. Data received: ", e), t.resolve("Political map enabled. Data received: " + e)) : (console.verboseLog("Political map disabled. Data received: ", e), t.resolve("Political map disabled. Data received: " + e))))
			}
			function y(e, t) {
				return "boolean" != typeof e ? (console.verboseError("Invalid: toScale must be a boolean. Data received: ", e), void t.reject("Invalid: toScale must be a boolean. Data received: " + e)) : void(e !== pe && (me = e, Me.updateTransitionScale(me, ge), me === !0 ? (Me.scalePlanets(me), pe = me) : ge in ue.switchTo && ue.switchTo[ge](le.viewSettings[ge].defaultFOV), e ? (console.verboseLog("Setting Scene to be to Scale. Data received: ", e), t.resolve("Setting Scene to be to Scale. Data received: ", e)) : (console.verboseLog("Setting Scene to not be to Scale. Data received: ", e), t.resolve("Setting Scene to not be to Scale. Data received: ", e))))
			}
			function w() {
				return pe
			}
			function I(e, t) {
				return de.isOnscreen() ? (console.verboseLog("Swapping Displays"), de.swapPip(), void t.resolve(e + "Swapping Displays")) : (console.verboseError("Error: PIP is not on the screen."), void t.reject("Error: PIP is not on the screen."))
			}
			function E(e) {
				return e in he
			}
			function j(e) {
				e && e.popup && (Ne[e.id].popupDisplayed = !0, e.popup.style.display = "")
			}
			function x(e) {
				e && e.popup && (Ne[e.id].popupDisplayed = !1, e.popup.style.display = "none")
			}
			function b(e, t, a, n) {
				e && e.popup ? (e.popup.titleDiv.innerHTML = t, n ? (e.popup.locationButton.id = "remove_location_btn", e.popup.locationButton.innerHTML = "- Remove", e.popup.locationButton.locationId = a, e.popup.locationButton.locationExists = n) : (e.popup.locationButton.id = "add_location_btn", e.popup.locationButton.innerHTML = "+ Add", e.popup.locationButton.locationId = a, e.popup.locationButton.locationExists = n)) : console.verboseError("Marker or Popup does not exist.")
			}
			function S(e, t) {
				if (!e || !e.icon)
					return void console.verboseError("Could not update Marker Color, missing html elements: ", e);
				e.icon.color = t,
				e.icon.style.opacity = 0;
				var a = document.getElementById(e.icon.id).contentDocument,
				n = null;
				if (void 0 !== a && null !== a && (n = a.getElementsByTagName("svg")[0]), void 0 === n || null === n)
					return void setTimeout(function () {
						S(e, t)
					}, 100);
				var i = n.getElementsByTagName("style")[0];
				i.innerHTML = "",
				n.style.fill = e.icon.color,
				e.icon.style.opacity = 1
			}
			function C(e, t) {
				if (e.constructor !== {}
					.constructor)
					return console.verboseError("Invalid: addMarker must be JSON. Data received: ", e), void t.reject("Invalid: addMarker must be JSON. Data received: " + e);
				if (!("id" in e && "locationId" in e && "name" in e && "location" in e))
					return console.verboseError("Invalid: addMarker requires, id, locationId, name, and location. Data received: ", e), void t.reject("Invalid: addMarker requires, id, locationId, name, and location. Data received: " + JSON.stringify(e));
				if (!le.validateLatLng(e.location))
					return console.verboseError("Invalid: addMarker provided with invalid location: ", e.location), void t.reject("Invalid: addMarker provided with invalid location: " + JSON.stringify(e.location));
				var a = ne.scene.get("Earth");
				a.addTrigger(null, function () {
					var n = e.id,
					i = e.locationId,
					r = e.name,
					o = e.location,
					s = {
						id: n,
						locationId: i,
						name: r,
						Text: r,
						type: "Label",
						labelType: "Marker",
						time: "0",
						icon: ne.mapPinIconPath,
						latLng: o,
						popupDisplayed: !1
					};
					if ("color" in e && (s.color = e.color), "displayPopup" in e) {
						if ("boolean" != typeof e.displayPopup)
							return console.verboseError("Invalid: displayPopup must be a boolean. Data received: ", e.displayPopup), void t.reject("Invalid: displayPopup must be a boolean. Data received: " + e.displayPopup);
						s.popupDisplayed = e.displayPopup
					}
					console.verboseLog("Attemping to Add Marker with Parameters: ", s),
					ae.addLabel(a, s.id, s.latLng, s, "markers"),
					s.id in Ne ? (Ne[s.id].params = s, Ne[s.id].params.color && S(Ne[s.id].div, Ne[s.id].params.color), Ne[s.id].params.popupDisplayed ? j(Ne[s.id].div) : x(Ne[s.id].div)) : Ne[s.id] = {
						params: s,
						div: null
					},
					t.resolve("Marker " + s.id + " has been successfully added/updated.")
				})
			}
			function z(e, t) {
				var a = ne.scene.get("Earth");
				a.addTrigger(null, function () {
					return e in Ne ? (ae.removeLabel(a, e, "markers"), delete Ne[e], void t.resolve("Marker " + e + " Removed Successfully.")) : (console.verboseError("Invalid: Attempted to remove a non-existing Marker. Data received: ", e), void t.reject("Invalid: Attempted to remove a non-existing Marker. Data received: " + e))
				})
			}
			function O(e, t) {
				if (e.constructor !== {}
					.constructor)
					return console.verboseError("Invalid: updateMarker must be JSON. Data received: ", e), void t.reject("Invalid: updateMarker must be JSON. Data received: " + e);
				if (!("id" in e))
					return console.verboseError("Invalid: updateMarker requires id. Data received: ", e), void t.reject("Invalid: updateMarker requires id. Data received: " + JSON.stringify(e));
				if ("location" in e && !le.validateLatLng(e.location))
					return console.verboseError("Invalid: updateMarker provided with invalid location: ", e.location), void t.reject("Invalid: updateMarker provided with invalid location: " + JSON.stringify(e.location));
				var a = ne.scene.get("Earth");
				a.addTrigger(null, function () {
					if (!(e.id in Ne))
						return console.verboseError("Invalid: Attempted to add a non-existing Marker. Data received: ", e.id, ". Attempting to Add Marker instead."), void C(e, t);
					var n = Ne[e.id];
					if ("locationId" in e && (n.params.locationId = e.locationId), "name" in e && (n.params.Text = e.name, n.params.name = e.name), "location" in e && (n.params.latLng = e.location), "color" in e && (n.params.color = e.color), "displayPopup" in e) {
						if ("boolean" != typeof e.displayPopup)
							return console.verboseError("Invalid: displayPopup must be a boolean. Data received: ", e.displayPopup), void t.reject("Invalid: displayPopup must be a boolean. Data received: " + e.displayPopup);
						n.params.popupDisplayed = e.displayPopup
					}
					ae.updateLabel(a, n.params.id, n.params.latLng, n.params, !1, "markers"),
					b(n.div, n.params.name, n.params.locationId, E(e.locationId)),
					n.params.popupDisplayed ? j(n.div) : x(n.div),
					n.params.color && S(n.div, n.params.color),
					console.verboseLog("Marker", e.id, "Updated Successfully"),
					t.resolve("Marker " + e.id + " Updated Successfully")
				})
			}
			function k(e, t) {
				return e.constructor !== {}
				.constructor ? (console.verboseError("Invalid: setEclipseViewport must be JSON. Data received: ", e), void t.reject("Invalid: setEclipseViewport must be JSON. Data received: " + e)) : "name" in e && "location" in e ? le.validateLatLng(e.location) ? (le.viewSettings[ge].displayPip ? de.setPip(e.name, e.location) : de.setPipWithoutUnhide(e.name, e.location), console.verboseLog("Setting Eclipse Viewport to new Location:", e.location, "with Location Name:", e.name), void t.resolve("Setting Eclipse Viewport to new Location: " + e.location + " with Location Name: " + e.name)) : (console.verboseError("Invalid: setEclipseViewport provided with invalid location: ", e.location), void t.reject("Invalid: setEclipseViewport provided with invalid location: " + JSON.stringify(e.location))) : (console.verboseError("Invalid: setEclipseViewport requires name and location. Data received: ", e), void t.reject("Invalid: setEclipseViewport requires name and location. Data received: " + JSON.stringify(e)))
			}
			function Q(e, t) {
				de.hidePip(),
				console.verboseLog("Eclipse Viewport Removed"),
				t.resolve("Eclipse Viewport Removed")
			}
			function U(e, t) {
				return e in Ne ? (j(Ne[e].div), console.verboseLog("Popup for Marker", e, "Displayed"), void t.resolve("Popup for Marker" + e + "Displayed")) : (console.verboseError("Invalid: Attempted to display Popup of a non-existing Marker. Data received: ", e), void t.reject("Invalid: Attempted to display Popup of a non-existing Marker. Data received: " + e))
			}
			function B(e, t) {
				return e in Ne ? (x(Ne[e].div), console.verboseLog("Popup for Marker", e, "Hidden"), void t.resolve("Popup for Marker" + e + "Hidden")) : (console.verboseError("Invalid: Attempted to hide Popup of a non-existing Marker. Data received: ", e), void t.reject("Invalid: Attempted to hide Popup of a non-existing Marker. Data received: " + e))
			}
			function _(e, t) {
				if (e.constructor !== {}
					.constructor)
					return console.verboseError("Invalid: setMarker must be JSON. Data received: ", e), void t.reject("Invalid: setMarker must be JSON. Data received: " + e);
				if (!("id" in e))
					return console.verboseError("Invalid: setMarker requires id. Data received: ", e), void t.reject("Invalid: setMarker requires id. Data received: " + JSON.stringify(e));
				var a,
				n,
				i,
				r = !1,
				o = ne.scene.get("Earth");
				o.addTrigger(null, function () {
					if (E(e.id)) {
						i = e.id;
						var o = he[i];
						n = o.name,
						a = o.latLng,
						r = !0
					} else if ("name" in e && "location" in e) {
						if (!le.validateLatLng(e.location))
							return console.verboseError("Invalid: setMarker provided with invalid location: ", e.location), void t.reject("Invalid: setMarker provided with invalid location: " + JSON.stringify(e.location));
						i = e.id,
						n = e.name,
						a = e.location,
						r = !0
					} else
						console.verboseError("Error: Could not set Marker, either location does not exist or missing information. Data received: ", e), t.reject("Error: Could not set Marker, either location does not exist or missing information. Data received: " + JSON.stringify(e));
					if (r) {
						var s = {
							id: "Eclipse_Marker",
							locationId: e.id,
							name: n,
							location: a
						};
						if ("color" in e && (s.color = e.color), "displayPopup" in e) {
							if ("boolean" != typeof e.displayPopup)
								return console.verboseError("Invalid: displayPopup must be a boolean. Data received: ", e.displayPopup), void t.reject("Invalid: displayPopup must be a boolean. Data received: " + e.displayPopup);
							s.displayPopup = e.displayPopup
						}
						O(s, t);
						var c = {
							name: n,
							location: a
						};
						k(c, t)
					}
				})
			}
			function P(e, t) {
				if (e.constructor !== {}
					.constructor)
					return console.verboseError("Invalid: addLocation must be JSON. Data received: ", e), void t.reject("Invalid: addLocation must be JSON. Data received: " + e);
				if (!("id" in e && "name" in e && "location" in e))
					return console.verboseError("Invalid: addLocation requires id, name, and location. Data received: ", e), void t.reject("Invalid: addLocation requires id, name, and location. Data received: " + JSON.stringify(e));
				if (!le.validateLatLng(e.location))
					return console.verboseError("Invalid: addLocation provided with invalid location: ", e.location), void t.reject("Invalid: addLocation provided with invalid location: " + JSON.stringify(e.location));
				console.verboseLog("Adding Location to Earth. Location Data: ", e);
				var a = e.id,
				n = e.name,
				i = e.location;
				he[a] = {
					name: n,
					latLng: i
				};
				for (var r in Ne)
					Ne[r].div && Ne[r].div.popup && Ne[r].div.locationId === a && b(Ne[r].div, n, a, !0);
				t.resolve(e)
			}
			function R(e, t, a, n, i) {
				if (t.constructor !== {}
					.constructor)
					return void console.verboseError("Invalid: addSurfaceLabel must be JSON. Data received: ", t);
				if (!("id" in t && "text" in t && "location" in t && "time" in t))
					return void console.verboseError("Invalid: addSurfaceLabel requires id, text, location, and time. Data received: ", t);
				var r = t.id,
				o = t.text,
				s = t.location,
				c = t.time,
				l = {
					id: r,
					Text: o,
					name: o,
					time: c
				};
				for (var u in i)
					l[u] = i[u];
				ae.addLabel(e, r, s, l, a),
				"location" === n && (ve[r] = {
						name: o,
						time: c,
						latLng: s,
						lodKey: a
					})
			}
			function Y(e, t) {
				if (E(e)) {
					console.verboseLog("Removing Location: ", e);
					var a = he[e].name;
					for (var n in Ne)
						Ne[n].div && Ne[n].div.popup && Ne[n].div.locationId === e && b(Ne[n].div, a, e, !1);
					delete he[e],
					t.resolve({
						id: e,
						name: a
					})
				} else
					console.verboseError("Invalid: Attempted to remove a non-existing Location. Data received: ", e), t.reject("Invalid: Attempted to remove a non-existing Location. Data received: " + e)
			}
			function F(e, t) {
				"string" == typeof e ? Ie(n({}, e, null), t) : Ie(e, t)
			}
			function G(e, t) {
				return "boolean" != typeof e ? (console.verboseError("Invalid: keyboardEventsEnabled must be a boolean. Data received: ", e), void t.reject("Invalid: keyboardEventsEnabled must be a boolean. Data received: " + e)) : (e ? (console.verboseLog("Keyboard Events have been enabled. Data received: ", e), t.resolve("Keyboard Events have been enabled. Data received: " + e)) : (console.verboseLog("Keyboard Events have been disabled. Data received: ", e), t.resolve("Keyboard Events have been disabled. Data received: ", e)), void(ee.allowKeypress = e))
			}
			function V() {
				ne.settings.usePainters = !0;
				var e = [["Stars"], ["Galaxies"], ["Sun"], ["Earth", "ConeUmbra", "ConePenumbra", "Moon", "EarthMoonBarycenter"]],
				t = [["Stars"], ["Galaxies"], ["Earth", "ConeUmbra", "ConePenumbra", "Moon", "EarthMoonBarycenter"], ["Sun"]];
				ne.scene.paintersSort = function (a, n) {
					var i = [],
					r = [];
					if ("Earth" === ge || "Moon" === ge)
						r = e;
					else {
						var o = ne.scene.get("Sun").frame.get(n.clock.time),
						s = {},
						c = {};
						"undefined" != typeof o ? (s = ne.scene.get("Earth").frame.convert(o, n), c = ne.scene.get("Moon").frame.convert(o, n)) : (s = {
								position: [0, 0, 0],
								orientation: [0, 0, 0, 1]
							}, c = {
								position: [0, 0, 0],
								orientation: [0, 0, 0, 1]
							});
						var l = ne.scene.get("Earth").frame.convert({
								parent: ne.scene.cameraData[n.id].attachedNode,
								position: n.frame.position,
								orientation: n.frame.orientation
							}, n),
						u = ne.scene.get("Moon").frame.convert({
								parent: ne.scene.cameraData[n.id].attachedNode,
								position: n.frame.position,
								orientation: n.frame.orientation
							}, n),
						d = ne.math.angleBetweenVectors(s.position, l.position),
						M = ne.math.angleBetweenVectors(c.position, u.position);
						r = d < Math.PI / 2 && M < Math.PI / 2 ? t : e
					}
					for (var g in r) {
						var p = [];
						for (var m in r[g]) {
							var A = r[g][m];
							for (var f in a)
								a[f].id.node.name === A && p.push(a[f])
						}
						p.length > 0 && i.push(p)
					}
					if (i.length > 0) {
						for (var D = {
								near: n.near,
								far: n.far
							}, N = [], h = 0; h < i.length; h++)
							N.push(D);
						i.push(N)
					}
					return i
				}
			}
			function W() {
				ee.setRate(0),
				console.verboseLog("Started dragged on Eclipse Viewport, setting Time Rate to 0."),
				i({
					draggedOnEclipseViewport: !0
				})
			}
			function H(e) {
				ee = e,
				r(),
				o(),
				ae = ie(),
				ee.endFrameUpdates.timeLoop = function (e, t) {
					var a = t.getTime();
					a > le.viewSettings[ge].maxTime && (a = le.viewSettings[ge].minTime),
					a < le.viewSettings[ge].minTime && (a = le.viewSettings[ge].maxTime),
					t.setTime(a)
				},
				ue.setTransitionComplete(function () {
					ne.updates.components.eclipse.stateConstraints.setState("settingView", !1),
					console.verboseLog("Transition to new View Completed."),
					i({
						setViewDone: !0
					}),
					me !== pe && me === !1 && (pe = me, Me.scalePlanets(me))
				}),
				ee.endFrameUpdates.reportCurrentFPS = function () {
					if (ne.settings.fps) {
						var e = Date.now();
						if (ye.currentCount++, e - ye.lastTime > ye.interval) {
							if (ye.lastTime = e, ye.frameRate.push(Math.round((ye.currentCount - ye.lastCout) / ye.interval * 1e3)), ye.lastCout = ye.currentCount, Array.isArray(ye.frameRate) && ye.frameRate.length > 0) {
								var t = 0;
								ye.frameRate.forEach(function (e) {
									t += e
								}),
								console.log("After " + Math.round((e - ye.startTime) / 1e3) + "s, avg FPS is " + Math.round(t / ye.frameRate.length))
							}
							console.log("FPS " + ye.frameRate[ye.frameRate.length - 1])
						}
					}
				},
				V(),
				Me.initializeScaling(ue),
				de.setStartDragHandler(W),
				de.updateBrushTimeParams([oe.ET2UTC(le.viewSettings[ge].minTime), oe.ET2UTC(le.viewSettings[ge].maxTime)])
			}
			function Z(e) {
				var t = {};
				t.markerClicked = e,
				console.verboseLog("Marker Clicked: ", e),
				i(t)
			}
			function X(e) {
				var t = {};
				if (t.locationClicked = e, console.verboseLog("Location Clicked: ", e), "debug" in ne.settings && ne.settings.debug) {
					var a = {};
					return a.id = "debug-" + Le.count,
					a.name = "debug-" + Le.count,
					a.location = e,
					a.displayPopup = !0,
					void ne.update({
						eclipse: {
							setMarker: a
						}
					})
				}
				i(t)
			}
			function q(e) {
				var t = {};
				if (t.locationSelectedToAdd = e, console.verboseLog("location Selected to Add: ", e), "debug" in ne.settings && ne.settings.debug && "Eclipse_Marker" in Ne) {
					var a = {};
					return a.id = e,
					a.name = Ne.Eclipse_Marker.params.Text,
					a.location = Ne.Eclipse_Marker.params.latLng,
					ne.update({
						eclipse: {
							addLocation: a
						}
					}),
					void(Le.count = Le.count + 1)
				}
				i(t)
			}
			function J(e) {
				var t = {};
				return t.locationSelectedForRemoval = e,
				console.verboseLog("location Selected For Removal: ", e),
				"debug" in ne.settings && ne.settings.debug ? void ne.update({
					eclipse: {
						removeLocation: e
					}
				}) : void i(t)
			}
			function $(e, t, a, n) {
				var i = e.popup;
				i && i.parentNode.removeChild(i);
				var r = document.createElement("div"),
				o = document.createElement("div"),
				s = document.createElement("div"),
				c = document.createElement("button"),
				l = document.createElement("div"),
				u = document.createElement("div");
				r.className = "map_popover eclipse_modal light_background",
				o.className = "location_title",
				s.className = "location_arrow",
				c.className = "button",
				l.className = "close_btn",
				u.className = "icon",
				r.id = e.id + "-marker-popup",
				o.innerHTML = n,
				t ? (c.id = "remove_location_btn", c.innerHTML = "- Remove", c.locationId = a, c.locationExists = t) : (c.id = "add_location_btn", c.innerHTML = "+ Add", c.locationId = a, c.locationExists = t),
				r.style.position = "absolute",
				r.style.transform = "translate(-50%, -100%)",
				r.style["max-width"] = "none",
				c.addEventListener("click", function (t) {
					t.stopPropagation(),
					c.locationExists ? J(c.locationId) : q(c.locationId),
					x(e)
				}, !1),
				l.addEventListener("click", function (t) {
					t.stopPropagation(),
					x(e)
				}),
				e.appendChild(r),
				r.appendChild(l),
				l.appendChild(u),
				r.appendChild(o),
				r.appendChild(c),
				r.appendChild(s),
				r.style.top = -s.offsetWidth + "px",
				r.style.display = "none",
				r.locationButton = c,
				r.closeButton = l,
				r.titleDiv = o,
				e.popup = r,
				e.attachedElement = r
			}
			function K(e, t, a, n) {
				var i = 0,
				r = 0;
				e.aspect >= 1 ? (i = Math.atan(Math.tan(e.fov / 2) * e.aspect * -a), r = e.fov / 2 * n) : (i = e.fov / 2 * -a, r = Math.atan(Math.tan(e.fov / 2) / e.aspect * n));
				var o = ne.scene.cameraData[e.id].attachedNode.frame.convert(ne.scene.get("Earth").frame.get(e.clock.time), ne.app.getWin()._window.camera),
				s = [0, 0, 1],
				c = Math.tan(i) * s[2] + s[0],
				l = -1 * Math.tan(r) * s[2] + s[1],
				u = ne.math.vMul(ne.math.vNormalized([c, l, s[2]]), -1),
				d = ne.math.qMulV(ne.math.qMulQ(ne.math.conjugate(o.orientation), e.frame.orientation), u),
				M = ne.scene.get("Earth").frame.convert({
						parent: ne.scene.cameraData[e.id].attachedNode,
						position: e.frame.position,
						orientation: e.frame.orientation
					}, e).position;
				d = ne.math.vMul(d, 1e6);
				var g = ne.math.lineEllipsoidIntersection(t.ellipsoid, M, d);
				if (0 !== g.size()) {
					var p = ne.math.vAdd(M, ne.math.vMul(d, g.get(0))),
					m = ne.math.rectangularToGeodetic(t.ellipsoid, p);
					return [m[1], m[0]]
				}
			}
			var ee,
			te,
			ae,
			ne = a(4),
			ie = a(46),
			re = a(17),
			oe = a(47),
			se = a(48),
			ce = a(20),
			le = a(53),
			ue = a(50),
			de = a(49),
			Me = a(54),
			ge = "Earth",
			pe = !0,
			me = !0,
			Ae = !0,
			fe = !0,
			De = {
				earth: null,
				politicalEarth: null
			},
			Ne = {},
			he = {},
			ve = {},
			Te = !1,
			Le = {
				count: 0
			},
			ye = {
				startTime: Date.now(),
				lastTime: Date.now(),
				lastCout: 0,
				currentCount: 0,
				interval: 1e3,
				frameRate: []
			},
			we = {
				renderableAttributes: {
					type: "Light",
					mode: "distantPoint",
					name: "headlight",
					irradience: [.25, .25, .25],
					end: 21.20300751956555
				},
				transform: {
					orientation: [0, 0, 0, 1],
					position: [0, 0, 1e5]
				},
				enabled: !1
			};
			ne.updates = a(19),
			ne.updates.components.eclipse = new ce,
			ne.updates.components.eclipse.stateConstraints.addState("settingView", !1, ["setView", "toScale", "swapDisplays", "setTime", "setTimeRate", "setFOV"]),
			ne.updates.components.eclipse.stateConstraints.addState("earthMoonView", !1, ["setEclipseViewport"]),
			ne.updates.components.eclipse.stateConstraints.addState("earthMoonSunView", !1, ["setEclipseViewport"]);
			var Ie = new ce;
			Ie.components.FOV = function (e, t) {
				var a = {};
				a.FOV = ee._camera.fov,
				i(a),
				t.resolve(a)
			},
			Ie.components.maxFOV = function (e, t) {
				var a = {};
				a.maxFOV = le.viewSettings[ge].maxFOV,
				i(a),
				t.resolve(a)
			},
			Ie.components.minFOV = function (e, t) {
				var a = {};
				a.minFOV = le.viewSettings[ge].minFOV,
				i(a),
				t.resolve(a)
			},
			Ie.components.timeRate = function (e, t) {
				var a = {};
				a.timeRate = ee.getRate(),
				i(a),
				t.resolve(a)
			},
			Ie.components.maxTimeRate = function (e, t) {
				var a = {};
				a.maxTimeRate = le.viewSettings[ge].maxTimeRate,
				i(a),
				t.resolve(a)
			},
			Ie.components.minTimeRate = function (e, t) {
				var a = {};
				a.minTimeRate = le.viewSettings[ge].minTimeRate,
				i(a),
				t.resolve(a)
			},
			Ie.components.time = function (e, t) {
				var a = {};
				a.time = oe.ET2UTC(ee.getTime()),
				i(a),
				t.resolve(a)
			},
			Ie.components.maxTime = function (e, t) {
				var a = {};
				a.maxTime = oe.ET2UTC(le.viewSettings[ge].maxTime),
				i(a),
				t.resolve(a)
			},
			Ie.components.minTime = function (e, t) {
				var a = {};
				a.minTime = oe.ET2UTC(le.viewSettings[ge].minTime),
				i(a),
				t.resolve(a)
			},
			Ie.components.timeRateValues = function (e, t) {
				var a = {};
				a.timeRateValues = le.viewSettings[ge].timeRateValues,
				i(a),
				t.resolve(a)
			},
			Ie.components.earthMoonDistance = function (e, t) {
				var a = {};
				a.earthMoonDistance = s(),
				i(a),
				t.resolve(a)
			},
			Ie.components.cameraState = function (e, t) {
				se.cameraState(e, t)
			},
			Ie.components.cameraIds = function (e, t) {
				se.cameraIds(e, t)
			},
			ne.updates.components.eclipse.components.addLocation = P,
			ne.updates.components.eclipse.components.removeLocation = Y,
			ne.updates.components.eclipse.components.getInfo = F,
			ne.updates.components.eclipse.components.headLightEnabled = T,
			ne.updates.components.eclipse.components.keyboardEventsEnabled = G,
			ne.updates.components.eclipse.components.politicalMapEnabled = L,
			ne.updates.components.eclipse.components.setFOV = A,
			ne.updates.components.eclipse.components.setLabelDisplay = M,
			ne.updates.components.eclipse.components.setPenumbraColor = D,
			ne.updates.components.eclipse.components.setEclipseViewportMode = f,
			ne.updates.components.eclipse.components.addMarker = C,
			ne.updates.components.eclipse.components.removeMarker = z,
			ne.updates.components.eclipse.components.updateMarker = O,
			ne.updates.components.eclipse.components.setMarker = _,
			ne.updates.components.eclipse.components.setEclipseViewport = k,
			ne.updates.components.eclipse.components.removeEclipseViewport = Q,
			ne.updates.components.eclipse.components.setTime = p,
			ne.updates.components.eclipse.components.setTimeRate = m,
			ne.updates.components.eclipse.components.setUmbraColor = N,
			ne.updates.components.eclipse.components.setView = u,
			ne.updates.components.eclipse.components.shadowLabelsEnabled = g,
			ne.updates.components.eclipse.components.swapDisplays = I,
			ne.updates.components.eclipse.components.toScale = y,
			ne.updates.components.eclipse.components.showMarkerPopup = U,
			ne.updates.components.eclipse.components.hideMarkerPopup = B,
			ne.updates.components.eclipse.components.setCameraState = se.setCameraState,
			ne.updates.components.eclipse.components.eclipseShadowEnabled = v,
			e.exports = {
				init: H,
				addEarthLoadedNotification: r,
				sendMessage: i,
				locationClicked: X,
				locationSelectedToAdd: q,
				locationSelectedForRemoval: J,
				getLatLongFromEllipsoidSelection: K,
				isNormalScale: w,
				attachPopup: $,
				hasLocation: E,
				addSurfaceLabel: R,
				displayMarkerPopup: j,
				removeMarkerPopup: x,
				showMarkerPopup: U,
				hideMarkerPopup: B,
				markerClicked: Z,
				markerRenderables: Ne,
				updateMarkerColor: S
			}
		}, function (e, t, a) {
			var n = a(4);
			e.exports = function () {
				var e = {};
				return e.availableRenderables = [],
				e.surfaceLabelMap = {},
				e.defaultLodSetting = {
					lodKey: "surfaceLabels",
					rangeParams: {
						start: 0,
						end: 16
					}
				},
				e.defaultParameters = {
					id: 0,
					locationId: 0,
					type: "Label",
					labelType: "Surface",
					Text: "Label",
					icon: "",
					time: "0",
					name: "Label"
				},
				e.getTranslateFromLatLng = function (e, t) {
					var a = [t[1] * Math.PI / 180, t[0] * Math.PI / 180],
					i = n.math.geodeticToRectangular(e.ellipsoid, [a[0], a[1], .001]);
					return i
				},
				e.addNodeToSurfaceLabels = function (t, a, n) {
					e.surfaceLabelMap[t.name] = {},
					e.surfaceLabelMap[t.name].lodSettings = {},
					e.surfaceLabelMap[t.name].lodSettings.lodKey = "surfaceLabels",
					e.surfaceLabelMap[t.name].lodSettings.rangeParams = {},
					e.surfaceLabelMap[t.name].labels = {};
					for (var i in e.defaultLodSetting.rangeParams)
						e.surfaceLabelMap[t.name].lodSettings.rangeParams[i] = e.defaultLodSetting.rangeParams[i];
					a && (e.surfaceLabelMap[t.name].lodSettings.lodKey = a),
					n && (e.surfaceLabelMap[t.name].lodSettings.rangeParams = n),
					t.renderables.addLOD(e.surfaceLabelMap[t.name].lodSettings.rangeParams, e.surfaceLabelMap[t.name].lodSettings.lodKey, "surfaceLabelRange")
				},
				e.getNodeSurfaceLabels = function (t) {
					return t.name in e.surfaceLabelMap || e.addNodeToSurfaceLabels(t),
					e.surfaceLabelMap[t.name]
				},
				e.hasLabel = function (t, a) {
					var n = e.getNodeSurfaceLabels(t);
					return a in n.labels
				},
				e.addLabel = function (t, a, n, i, r) {
					var o = e.getNodeSurfaceLabels(t);
					if (a in o.labels)
						return console.warn("Attempting to add a new label with an id of an existing Label, updating existing Label instead."), void e.updateLabel(t, a, n, i, !0, r);
					var s,
					c = null,
					l = null,
					u = {};
					for (s in e.defaultParameters)
						u[s] = e.defaultParameters[s];
					u.id = a,
					u.locationId = a;
					for (s in i)
						u[s] = i[s];
					for (s in o.lodSettings.lodKey.rangeParams)
						u[s] = o.lodSettings.lodKey.rangeParams[s];
					var d = e.getTranslateFromLatLng(t, n);
					return u.transform = {
						enabled: !0,
						translate: d
					},
					u.latLng = n,
					r || (r = o.lodSettings.lodKey),
					e.availableRenderables.length > 0 && (c = e.availableRenderables.pop().renderable, c.data = u),
					l = c ? t.renderables.emplaceRenderable(u, c, a, r) : t.renderables.addRenderable(u, a, r),
					t.renderables.getRenderable(a, r),
					t.renderables.updateRenderableTransform(u.transform, l, r),
					o.labels[a] = {},
					o.labels[a].renderableName = l,
					o.labels[a].json = u,
					!0
				},
				e.removeLabel = function (t, a, n) {
					var i = e.getNodeSurfaceLabels(t);
					if (!(a in i.labels))
						return void console.warn("Trying to remove Non-existent Surface Label");
					var r = i.labels[a].renderableName;
					n || (n = i.lodSettings.lodKey);
					var o = t.renderables.removeRenderable(r, n),
					s = i.labels[a].json;
					return delete i.labels[a],
					o.json && o.renderable && e.availableRenderables.push(o),
					s
				},
				e.updateLabelLatLng = function (t, a, n, i) {
					var r = e.getNodeSurfaceLabels(t);
					if (!(a in r.labels))
						return void console.warn("Trying to update transform of Non-existent Surface Label");
					var o = e.getTranslateFromLatLng(t, n),
					s = {
						enabled: !0,
						translate: o
					},
					c = r.labels[a].renderableName;
					i || (i = r.lodSettings.lodKey),
					t.renderables.updateRenderableTransform(s, c, i)
				},
				e.updateLabel = function (t, a, n, i, r, o) {
					var s = e.getNodeSurfaceLabels(t);
					if (!(a in s.labels))
						return void console.warn("Trying to update Non-existent Surface Label");
					o || (o = s.lodSettings.lodKey);
					var c = e.removeLabel(t, a, o);
					r && (c = {});
					for (var l in i)
						c[l] = i[l];
					e.addLabel(t, a, n, c, o)
				},
				e.getLabelData = function (t, a) {
					var n = e.getNodeSurfaceLabels(t);
					if (!(a in n.labels))
						return void console.warn("Trying to get Label Data of Non-existent Surface Label");
					var i = {};
					for (var r in n.labels[a].json)
						i[r] = n.labels[a].json[r];
					return i.renderableName = n.labels[a].renderableName,
					i
				},
				e
			}
		}, function (e, t) {
			function a(e) {
				e /= 1e3;
				var t = r - i,
				a = e - t;
				return a
			}
			function n(e) {
				var t = r - i,
				a = e + t;
				return a *= 1e3
			}
			var i = 554817669.183,
			r = 1501545600;
			e.exports = {
				UTC2ET: a,
				ET2UTC: n
			}
		}, function (e, t, a) {
			function n(e, t) {
				if (e.id) {
					var a = d(e.id);
					if (a) {
						var n = a.cameraState,
						i = {
							id: e.id,
							type: n.name,
							target: n.target.name,
							orientation: n.frame.orientation,
							position: n.frame.position,
							radius: n.radius,
							minRadius: n.minRadiusAsGiven,
							maxRadius: n.maxRadiusAsGiven,
							fov: a._camera.fov,
							focus: n.focus ? n.focus.name : null
						};
						t.resolve(i),
						"debug" in s.settings && s.settings.debug && window.savedCameraStates.push(i)
					} else
						t.reject("No camera with that id exists.")
				} else
					t.reject("Camera id required.")
			}
			function i(e, t) {
				t.resolve(["subWindow", "mainWindow"])
			}
			function r(e, t) {
				if (e.id) {
					var a = d(e.id);
					if (a) {
						var n = function () {
							var n = a.cameraState,
							i = e.type || n.name;
							if ("Telescope" === i && !e.focus)
								return t.reject("Invalid: Telescope camera requires focus."), {
									v: void 0
								};
							var r = {
								cameraBehavior: u[i],
								frame: n.frame,
								target: n.target || M(e.target),
								orientation: e.orientation || n.frame.orientation,
								position: e.position || n.frame.positon,
								radius: e.radius || n.radius,
								win: a,
								cameraBehaviorParams: {
									minRadius: e.minRadius || n.minRadiusAsGiven,
									maxRadius: e.maxRadius || n.maxRadiusAsGiven,
									focus: M(e.focus) || null
								},
								fov: e.fov || a._camera.fov,
								after: function () {
									t.resolve("Transition to new camera state " + u[i].name + " completed.")
								}
							};
							d(e.id).setCamera(c.trackingTransition(r))
						}
						();
						if ("object" === ("undefined" == typeof n ? "undefined" : o(n)))
							return n.v
					} else
						t.reject("No camera with that id exists.")
				} else
					t.reject("Camera id required.")
			}
			var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
				return typeof e
			}
			 : function (e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
			},
			s = a(4),
			c = a(24),
			l = a(49);
			"debug" in s.settings && s.settings.debug && (window.savedCameraStates = []);
			var u = {
				Orbit: a(27),
				FreeFly: a(32),
				Telescope: a(52)
			},
			d = function (e) {
				return "subWindow" === e ? l.getSubWindow() : "mainWindow" === e ? s.app.getWin() : null
			};
			window.getWindowById = d;
			var M = function (e) {
				return e ? s.scene.get(e) : null
			};
			e.exports = {
				cameraState: n,
				setCameraState: r,
				cameraIds: i
			}
		}, function (e, t, a) {
			var n = a(4),
			i = a(50),
			r = a(47),
			o = a(22),
			s = .01072665,
			c = s,
			l = .05,
			u = null,
			d = null,
			M = null,
			g = null,
			p = void 0,
			m = void 0,
			A = 0,
			f = null,
			D = "",
			N = !1,
			h = {
				locationName: null,
				latLng: null
			},
			v = {
				timeIntervalLength: 0,
				timeInterval: [0, 0]
			},
			T = function () {
				var e = document.getElementById("nav-bar");
				e && (e.style.display = "none")
			},
			L = function () {
				var e = document.getElementById("nav-bar");
				e && (e.style.display = "inherit")
			},
			y = function () {
				console.verboseLog("Dragged Event occurred in Pip Window")
			},
			w = function (e) {
				y = e
			},
			I = function () {
				return !!p && "main" != p._camera.name
			},
			E = function () {
				var e = p._camera.fov;
				p._camera.fov = u._camera.fov,
				u._camera.fov = e,
				e = p.cameraState,
				p.cameraState = u.cameraState,
				u.setCamera(e),
				e = p._camera.name,
				p._camera.name = u.camera.name,
				u.camera.name = e,
				I() ? (u.cameraState.exit(n.app.getWin()), u.div.className = D, u.div.removeEventListener("mousedown", f.mouseDown, !1), u.div.removeEventListener("mousemove", f.mouseMove, !1), u.div.removeEventListener("mouseup", f.mouseUp, !1), u.div.removeEventListener("mouseout", f.mouseOut, !1), u.div.removeEventListener("touchstart", f.touchStart, !1), u.div.removeEventListener("touchmove", f.touchMove, !1), u.div.removeEventListener("touchend", f.touchEnd, !1), u.div.removeEventListener("touchcancel", f.touchEnd, !1), n.canvas.addEventListener("mousedown", f.mouseDown, !1), n.canvas.addEventListener("mousemove", f.mouseMove, !1), n.canvas.addEventListener("mouseup", f.mouseUp, !1), n.canvas.addEventListener("mouseout", f.mouseOut, !1), n.canvas.addEventListener("touchstart", f.touchStart, !1), n.canvas.addEventListener("touchmove", f.touchMove, !1), n.canvas.addEventListener("touchend", f.touchEnd, !1), n.canvas.addEventListener("touchcancel", f.touchEnd, !1)) : (n.app.getWin().cameraState.enter(n.app.getWin()), u.div.className = D + " pip-interactable", u.div.addEventListener("mousedown", f.mouseDown, !1), u.div.addEventListener("mousemove", f.mouseMove, !1), u.div.addEventListener("mouseup", f.mouseUp, !1), u.div.addEventListener("mouseout", f.mouseOut, !1), u.div.addEventListener("touchstart", f.touchStart, !1), u.div.addEventListener("touchmove", f.touchMove, !1), u.div.addEventListener("touchend", f.touchEnd, !1), u.div.addEventListener("touchcancel", f.touchEnd, !1), n.canvas.removeEventListener("mousedown", f.mouseDown, !1), n.canvas.removeEventListener("mousemove", f.mouseMove, !1), n.canvas.removeEventListener("mouseup", f.mouseUp, !1), n.canvas.removeEventListener("mouseout", f.mouseOut, !1), n.canvas.removeEventListener("touchstart", f.touchStart, !1), n.canvas.removeEventListener("touchmove", f.touchMove, !1), n.canvas.removeEventListener("touchend", f.touchEnd, !1), n.canvas.removeEventListener("touchcancel", f.touchEnd, !1))
			},
			j = function () {
				I() && E()
			},
			x = function () {
				var e = n.app.getWin(),
				t = null,
				a = !1,
				i = [],
				o = !0,
				s = function (e) {
					e.preventDefault(),
					e.stopPropagation(),
					a = !0,
					o = !0
				},
				c = function (i) {
					i.preventDefault(),
					i.stopPropagation();
					var s = i.clientX;
					if (null === t)
						return void(t = s);
					if (a) {
						o && (o = !1, y());
						var c =  - (s - t),
						l = c / i.target.offsetWidth,
						u = r.ET2UTC(e.getTime()),
						d = u + v.timeIntervalLength * l;
						d = Math.min(d, v.timeInterval[1]),
						d = Math.max(d, v.timeInterval[0]),
						n.update({
							eclipse: {
								setTime: d
							}
						})
					}
					t = s
				},
				l = function (e) {
					e.preventDefault(),
					e.stopPropagation(),
					a = !1,
					o = !0
				},
				u = function (e) {
					e.preventDefault(),
					e.stopPropagation(),
					a = !1,
					t = null,
					o = !0
				},
				d = function (e, t) {
					var a = void 0,
					n = void 0;
					for (n = 0; n < t.length; n++)
						if (a = t[n].identifier, a === e)
							return n;
					return -1
				},
				M = function (e) {
					e.preventDefault(),
					e.stopPropagation();
					var t = e.changedTouches,
					a = void 0,
					n = void 0;
					for (a = 0; a < t.length; a++)
						n = d(t[a].identifier, i), n >= 0 ? i.splice(n, 1, {
							identifier: t[a].identifier,
							x: t[a].clientX,
							y: t[a].clientY
						}) : i.push({
							identifier: t[a].identifier,
							x: t[a].clientX,
							y: t[a].clientY
						});
					o = !0
				},
				g = function (t) {
					t.preventDefault(),
					t.stopPropagation();
					var a = t.changedTouches;
					if (1 === a.length || 1 === i.length) {
						var s = d(i[0].identifier, a);
						if (!(s < 0)) {
							o && (o = !1, y());
							var c = {
								identifier: a[s].identifier,
								x: a[s].clientX,
								y: a[s].clientY
							},
							l = i[0],
							u =  - (c.x - l.x),
							M = u / t.target.offsetWidth,
							g = r.ET2UTC(e.getTime()),
							p = g + v.timeIntervalLength * M;
							p = Math.min(p, v.timeInterval[1]),
							p = Math.max(p, v.timeInterval[0]),
							n.update({
								eclipse: {
									setTime: p
								}
							}),
							i[0] = c
						}
					}
				},
				p = function (e) {
					e.preventDefault(),
					e.stopPropagation();
					var t = void 0,
					a = void 0,
					n = e.changedTouches;
					for (a = 0; a < n.length; a++)
						t = d(n[a].identifier, i), t >= 0 && i.splice(t, 1);
					o = !0
				};
				return {
					mouseDown: s,
					mouseMove: c,
					mouseUp: l,
					mouseOut: u,
					touchStart: M,
					touchMove: g,
					touchEnd: p
				}
			},
			b = function (e) {
				v.timeInterval = e,
				v.timeIntervalLength = e[1] - e[0]
			},
			S = function () {
				return null !== u
			},
			C = function (e, t) {
				if (!S()) {
					f = x(),
					p = n.app.getWin(),
					h.latLng = t,
					h.locationName = e,
					d = document.createElement("div"),
					d.id = "pip-container",
					n.canvas.parentElement.appendChild(d),
					u = n.app.subWindow(n.app.getWin()._window, 100, 100, 400, 200, d),
					u._camera = u.camera,
					u.setCamera = function (e) {
						this.cameraState = e
					},
					D = u.div.className,
					d.style = u.div.style,
					u.camera.fov = s,
					u._camera.name = "pip",
					p._camera.name = "main",
					N || (m = p.updates.camera, delete p.updates.camera, p.updates.clock = function (e) {
						A = p._camera.clock.rate;
						var t = p._camera.clock.time.value + e * A;
						p._camera.clock = {
							time: {
								value: t
							},
							rate: 0
						},
						u && (u._camera.clock = {
								time: {
									value: t
								},
								rate: 0
							})
					}, p.postTransformUpdates.camera = function (e) {
						m(e, p),
						u && m(e, u),
						p._camera.clock = {
							time: {
								value: p._camera.clock.time.value
							},
							rate: A
						}
					}, p.pip = u),
					N = !0,
					M = document.createElement("div"),
					M.id = "swap-button",
					M.onclick = function () {
						n.update({
							eclipse: {
								swapDisplays: null
							}
						})
					};
					var a = document.createElement("img"),
					r = n.swapImageIconPath;
					a.src = r,
					a.id = "swap-image",
					M.appendChild(a);
					var c = document.createElement("div");
					c.id = "nav-bar",
					u.navBar = c,
					d.appendChild(c),
					d.appendChild(M),
					u.div.addEventListener("mousedown", f.mouseDown, !1),
					u.div.addEventListener("mousemove", f.mouseMove, !1),
					u.div.addEventListener("mouseup", f.mouseUp, !1),
					u.div.addEventListener("mouseout", f.mouseOut, !1),
					u.div.addEventListener("touchstart", f.touchStart, !1),
					u.div.addEventListener("touchmove", f.touchMove, !1),
					u.div.addEventListener("touchend", f.touchEnd, !1),
					u.div.addEventListener("touchcancel", f.touchEnd, !1),
					g = document.createElement("div"),
					g.id = "pip-warning",
					u.div.appendChild(g),
					g.innerHTML = "Eclipse not visible from this location",
					g.style.top = "45%",
					g.style.position = "absolute",
					o.setViewportContainer(d),
					u.div.className = D + " pip-interactable"
				}
				u.navBar.textContent = e,
				I() ? (p.setCamera(i.getTelescopeCamera(t)), u.div.className = D) : (u.setCamera(i.getTelescopeCamera(t)), u.div.className = D + " pip-interactable"),
				u.resize(),
				t[1] < 0 && t[1] > -180 ? (d.style["pointer-events"] = "inherit", d.style["background-color"] = "transparent", M.style.display = "inherit", g.style.display = "none") : (d.style["pointer-events"] = "none", d.style["background-color"] = "black", M.style.display = "none", g.style.display = "inherit", I() && E())
			},
			z = function () {
				return u
			},
			O = function () {
				S() && (2 != n.app.windows.length && console.warn("pip.js: Unexpected number of cameras, hidePip() is popping off an unknown camera."), n.app.windows.pop(), d.remove(), u = null)
			},
			k = function () {
				h.locationName && h.latLng && C(h.locationName, h.latLng)
			},
			Q = function (e, t) {
				h.locationName = e,
				h.latLng = t
			};
			e.exports = {
				setPip: C,
				setPipWithoutUnhide: Q,
				hidePip: O,
				unhidePip: k,
				swapPip: E,
				isOnscreen: S,
				revertViewports: j,
				showNavBar: L,
				hideNavBar: T,
				setStartDragHandler: w,
				updateBrushTimeParams: b,
				getSubWindow: z,
				normalFov: c,
				telescopeFov: l,
				viewsAreSwapped: I
			}
		}, function (e, t, a) {
			function n(e) {
				g = e
			}
			function i(e) {
				p = e
			}
			function r() {
				var e = o.scene.get("ConePenumbra");
				e.renderables.lodEnabled("model", !0),
				e = o.scene.get("ConeUmbra"),
				e.renderables.lodEnabled("model", !0),
				e = o.scene.get("ConeEarth"),
				e.renderables.lodEnabled("model", !0)
			}
			var o = a(4),
			s = a(51),
			c = a(52),
			l = a(27),
			u = a(24),
			d = a(25),
			M = [.5065328566884535,  - .0942412441171466, .03476542271963596, .8563494721113643],
			g = {
				transition: {
					earthMoonSun: 35e7,
					earthMoon: 15e5,
					moon: 7e3,
					earth: 27e3
				},
				min: {
					earthMoonSun: 25e3,
					earthMoon: 25e3,
					moon: 5e3,
					earth: 8100
				},
				max: {
					earthMoonSun: 1e9,
					earthMoon: 3e6,
					moon: 14e3,
					earth: 5e4
				},
				earthSurfaceRadius: 6378.14
			},
			p = function () {
				console.log("Transition Complete")
			},
			m = {
				EarthMoonSun: function (e) {
					r(!0);
					var t = o.scene.get("Moon"),
					a = o.scene.get("Earth"),
					n = {
						frame: o.app.getWin().cameraState.frame,
						target: t,
						orientation: [0, 0, 0, 1],
						radius: g.transition.earthMoonSun,
						win: o.app.getWin(),
						cameraBehaviorParams: {
							minRadius: g.min.earthMoonSun,
							maxRadius: g.max.earthMoonSun
						},
						after: p,
						fov: e
					};
					o.app.getWin().setCamera(u.trackingTransition(n)),
					a["static"].node.interactable = !1,
					a.renderables.lodEnabled("markers", !1),
					a.renderables.lodEnabled("tier1", !1),
					a.renderables.lodEnabled("tier2", !1),
					a.renderables.lodEnabled("tier3", !1),
					a.renderables.lodEnabled("shadowLabels", !1)
				},
				EarthMoon: function (e) {
					r(!0);
					var t = o.scene.get("EarthMoonHalfway"),
					a = o.scene.get("Earth"),
					n = {
						frame: o.app.getWin().cameraState.frame,
						target: t,
						orientation: [0, 0, 0, 1],
						radius: g.transition.earthMoon,
						win: o.app.getWin(),
						cameraBehaviorParams: {
							minRadius: g.min.earthMoon,
							maxRadius: g.max.earthMoon
						},
						after: p,
						fov: e
					};
					o.app.getWin().setCamera(u.trackingTransition(n)),
					a["static"].node.interactable = !1,
					a.renderables.lodEnabled("markers", !1),
					a.renderables.lodEnabled("tier1", !1),
					a.renderables.lodEnabled("tier2", !1),
					a.renderables.lodEnabled("tier3", !1),
					a.renderables.lodEnabled("shadowLabels", !1)
				},
				Moon: function (e) {
					r(!0);
					var t = o.scene.get("Moon"),
					a = o.scene.get("Earth"),
					n = o.scene.get("EarthMoonBarycenter"),
					i = {
						parent: t.frame.parent,
						position: [0, 0, 0],
						orientation: [0, 0, 0, 1]
					};
					i = t.frame.convert(i, o.app.getWin()._camera);
					var c = o.math.lookRotation(o.math.vMul(o.math.vNormalized(i.position), 1), [0, 0, 1]),
					M = o.math.angleAxis(Math.PI / 180 * .25, [1, 0, 0]);
					c = o.math.qMulQ(c, M);
					var g = 29e4,
					m = o.math.vMul(o.math.qMulV(c, d.vector.FORWARD), g),
					A = s.getOrientationForPosition(m, o.app.getWin()._camera, t, a);
					i = {
						parent: t,
						position: m,
						orientation: A,
						time: o.app.getWin()._camera.clock.time.value
					},
					i = n.frame.convert(i, o.app.getWin()._camera);
					var f = {
						frame: o.app.getWin().cameraState.frame,
						target: n,
						orientation: i.orientation,
						radius: 775944,
						win: o.app.getWin(),
						cameraBehavior: l,
						cameraBehaviorParams: {
							target: n,
							orientation: i.orientation,
							radius: 775944,
							minRadius: 1e4,
							maxRadius: 1551888,
							lookSpeed: .002
						},
						after: p,
						fov: e
					};
					o.app.getWin().setCamera(u.trackingTransition(f)),
					o.scene.get("ConeEarth").renderables.lodEnabled("model", !1),
					a.renderables.lodEnabled("markers", !0),
					a.renderables.lodEnabled("tier1", !1),
					a.renderables.lodEnabled("tier2", !1),
					a.renderables.lodEnabled("tier3", !1),
					a.renderables.lodEnabled("shadowLabels", !0)
				},
				Earth: function (e) {
					r(!0);
					var t = o.scene.get("Earth"),
					a = {
						frame: o.app.getWin().cameraState.frame,
						target: t,
						orientation: M,
						radius: g.transition.earth,
						win: o.app.getWin(),
						cameraBehaviorParams: {
							minRadius: g.min.earth,
							maxRadius: g.max.earth
						},
						after: p,
						fov: e
					};
					o.app.getWin().setCamera(u.trackingTransition(a)),
					o.scene.get("ConeEarth").renderables.lodEnabled("model", !1),
					t["static"].node.interactable = !0,
					t.renderables.lodEnabled("markers", !0),
					t.renderables.lodEnabled("tier1", !0),
					t.renderables.lodEnabled("tier2", !0),
					t.renderables.lodEnabled("tier3", !0),
					t.renderables.lodEnabled("shadowLabels", !0)
				}
			},
			A = function (e, t) {
				var a = [t[1] * Math.PI / 180, t[0] * Math.PI / 180],
				n = o.math.geodeticToRectangular(e.ellipsoid, [a[0], a[1], .001]);
				return n
			},
			f = function (e) {
				var t = o.scene.get("Earth"),
				a = A(t, e),
				n = {
					parent: t,
					position: [0, 0, 0],
					orientation: [0, 0, 0, 1]
				},
				i = new c({
						target: t,
						focus: o.scene.get("Sun"),
						position: a,
						frame: n,
						fov: .01072665
					});
				return i
			},
			D = function () {
				return {
					target: o.scene.get("Earth"),
					radius: g.transition.earth,
					orientation: M,
					minRadius: g.min.earth,
					maxRadius: g.max.earth
				}
			};
			e.exports = {
				switchTo: m,
				cameraRadii: g,
				updateCameraRadii: n,
				initialCamera: D,
				getTelescopeCamera: f,
				setTransitionComplete: i
			},
			window.cameraModes = e.exports
		}, function (e, t, a) {
			var n = a(4),
			i = a(27),
			r = function (e, t, a, i) {
				var r = i.frame.get(t.clock.time);
				r = a.frame.convert(r, t);
				var o = n.math.vSub(r.position, e),
				s = n.math.lookRotation(o, [0, 0, 1]);
				return s
			};
			e.exports = function (e) {
				if (!e.focus)
					throw Error("ranger.camera.OrbitWithFocus: Missing required parameter: focus");
				var t = i(e),
				a = e.focus,
				n = e.target;
				return t.update = function () {
					return function (e) {
						var i = r(e.frame.position, e, n, a);
						t.frame.orientation = i
					}
				}
				(t.update),
				t
			},
			e.exports.getOrientationForPosition = r
		}, function (e, t, a) {
			var n = a(4),
			i = a(26);
			e.exports = function (e) {
				if (!e.focus)
					throw Error("ranger.camera.OrbitWithFocus: Missing required parameter: focus");
				var t = i(e),
				a = e.focus,
				r = e.target,
				o = e.position;
				return t.update = function (e) {
					var i = a.frame.get(e.clock.time);
					i = r.frame.convert(i, e);
					var s = n.math.vSub(i.position, o),
					c = n.math.lookRotation(s, [0, 0, 1]);
					t.frame.orientation = c,
					t.frame.position = o
				},
				t
			},
			e.exports.ignorePosition = !1
		}, function (e, t) {
			function a(e, t) {
				var a = !1;
				return t <= o[e].maxTime && t >= o[e].minTime && (a = !0),
				a
			}
			function n(e, t) {
				var a = !1;
				return t <= o[e].maxTimeRate && t >= o[e].minTimeRate && (a = !0),
				a
			}
			function i(e, t) {
				var a = !1;
				return t <= o[e].maxFOV && t >= o[e].minFOV && (a = !0),
				a
			}
			function r(e) {
				var t = !1,
				a = !1;
				return Array.isArray(e) && 2 == e.length && (e[0] >= s.minLatitude && e[0] <= s.maxLatitude && (t = !0), e[1] >= s.minLongitude && e[1] <= s.maxLongitude && (a = !0)),
				t && a
			}
			var o = {
				Earth: {
					defaultTime: 556612000.2144,
					minTime: 556606269.183,
					maxTime: 556617789.183,
					defaultTimeRate: 0,
					minTimeRate: -1800,
					maxTimeRate: 1800,
					defaultFOV: .5235987755982988,
					minFOV: .0349066,
					maxFOV: 1.5708,
					timeRateValues: [-1800, -600, -300, -60, -30, -1, 0, 1, 30, 60, 300, 600, 1800],
					displayPip: !0
				},
				Moon: {
					defaultTime: 556612000.2144,
					minTime: 556606269.183,
					maxTime: 556617789.183,
					defaultTimeRate: 0,
					minTimeRate: -1800,
					maxTimeRate: 1800,
					defaultFOV: .03490658503988659,
					minFOV: .017453292519943295,
					maxFOV: .05235987755982988,
					timeRateValues: [-1800, -600, -300, -60, -30, -1, 0, 1, 30, 60, 300, 600, 1800],
					displayPip: !0
				},
				EarthMoon: {
					defaultTime: 556612000.2144,
					minTime: 554020000.984,
					maxTime: 559204000.982,
					defaultTimeRate: 0,
					minTimeRate: -3600,
					maxTimeRate: 3600,
					defaultFOV: .5235987755982988,
					minFOV: .2617993877991494,
					maxFOV: .7853981633974483,
					timeRateValues: [-3600, -1800, -600, -300, -60, -1, 0, 1, 60, 300, 600, 1800, 3600],
					displayPip: !1
				},
				EarthMoonSun: {
					defaultTime: 556612000.2144,
					minTime: 521102000.2144002,
					maxTime: 592122000.2143999,
					defaultTimeRate: 0,
					minTimeRate: -3600,
					maxTimeRate: 3600,
					defaultFOV: .5235987755982988,
					minFOV: .2617993877991494,
					maxFOV: .7853981633974483,
					timeRateValues: [-3600, -1800, -600, -300, -60, -1, 0, 1, 60, 300, 600, 1800, 3600],
					displayPip: !1
				}
			},
			s = {
				minLatitude: -90,
				maxLatitude: 90,
				minLongitude: -180,
				maxLongitude: 180
			};
			e.exports = {
				validateTime: a,
				validateTimeRate: n,
				validateFOV: i,
				validateLatLng: r,
				viewSettings: o,
				locationSettings: s
			}
		}, function (e, t, a) {
			function n(e, t) {
				T = t,
				e ? M.updateCameraRadii(A) : M.updateCameraRadii(f)
			}
			function i() {
				N = 0,
				v === !0 && M.switchTo[T](g.viewSettings[T].defaultFOV),
				h = v
			}
			function r(e) {
				e.frame.updateCallbacks.remove("scaleTransition"),
				N++,
				N > 3 && i()
			}
			function o(e) {
				e.frame.updateCallbacks.remove("orbitTransition"),
				N++,
				N > 3 && i()
			}
			function s(e, t, a, n) {
				var i = function o(i) {
					if (o.count = ++o.count || 1, 1 === o.count && (o.clockStart = Date.now(), o.clockEnd = o.clockStart + a, o.exiting = !1), Date.now() <= o.clockEnd) {
						var s = (Date.now() - o.clockStart) / (o.clockEnd - o.clockStart),
						c = 1;
						c = (t - e) * s + e,
						i.renderables.transform.scale = c,
						i.ellipsoid[0] = m[i.name][0] * c,
						i.ellipsoid[1] = m[i.name][1] * c,
						i.ellipsoid[2] = m[i.name][2] * c,
						i.renderables.updateTransforms()
					} else
						o.exiting || (o.exiting = !0, i.renderables.transform.scale = t, i.renderables.transform.enabled = n, i.ellipsoid[0] = m[i.name][0] * t, i.ellipsoid[1] = m[i.name][1] * t, i.ellipsoid[2] = m[i.name][2] * t, i.renderables.updateTransforms(), d.app.addCallbackEvent({
								callback: r,
								params: [i]
							}))
				};
				return i
			}
			function c(e, t, a, n) {
				var i = function r(i) {
					if (r.count = ++r.count || 1, 1 === r.count && (r.clockStart = Date.now(), r.clockEnd = r.clockStart + a, r.exiting = !1), Date.now() <= r.clockEnd) {
						var s = (Date.now() - r.clockStart) / (r.clockEnd - r.clockStart),
						c = 1;
						c = (t - e) * s + e,
						i.renderables.transform.orbitScale = c
					} else
						r.exiting || (r.exiting = !0, i.renderables.transform.orbitScale = t, i.renderables.transform.enabled = n, d.app.addCallbackEvent({
								callback: o,
								params: [i]
							}))
				};
				return i
			}
			function l(e) {
				v = e,
				v !== h && (e ? (d.scene.scene.Earth.frame.updateCallbacks.push("scaleTransition", s(p.Earth, 1, D, !1)), d.scene.scene.Moon.frame.updateCallbacks.push("scaleTransition", s(p.Moon, 1, D, !1)), d.scene.scene.Sun.frame.updateCallbacks.push("scaleTransition", s(p.Sun, 1, D, !1)), d.scene.scene.Moon.frame.updateCallbacks.push("orbitTransition", c(p.moonOrbit, 1, D, !1))) : (d.scene.scene.Sun.renderables.transform.enabled = !0, d.scene.scene.Earth.renderables.transform.enabled = !0, d.scene.scene.Moon.renderables.transform.enabled = !0, d.scene.scene.Earth.frame.updateCallbacks.push("scaleTransition", s(1, p.Earth, D, !0)), d.scene.scene.Moon.frame.updateCallbacks.push("scaleTransition", s(1, p.Moon, D, !0)), d.scene.scene.Sun.frame.updateCallbacks.push("scaleTransition", s(1, p.Sun, D, !0)), d.scene.scene.Moon.frame.updateCallbacks.push("orbitTransition", c(1, p.moonOrbit, D, !0))))
			}
			function u() {
				A = M.cameraRadii,
				f = {
					transition: {
						earthMoonSun: A.transition.earthMoonSun,
						earthMoon: A.transition.earthMoon * p.moonOrbit,
						moon: A.transition.moon,
						earth: A.transition.earth
					},
					min: {
						earthMoonSun: A.min.Earth,
						earthMoon: A.min.earthMoon * p.moonOrbit,
						moon: A.min.moon,
						earth: A.min.earth
					},
					max: {
						earthMoonSun: A.max.earthMoonSun,
						earthMoon: A.max.earthMoon * p.moonOrbit,
						moon: A.max.moon,
						earth: A.max.earth
					}
				},
				m.Earth = [6378.14, 6378.14, 6356.75],
				m.Sun = [696300, 696300, 696300],
				m.Moon = [1738.1, 1738.1, 1736]
			}
			var d = a(4),
			M = a(50),
			g = a(53),
			p = {
				Moon: 1e3,
				Earth: 500,
				Sun: 10,
				moonOrbit: 200
			},
			m = {},
			A = void 0,
			f = void 0,
			D = 3e3,
			N = 0,
			h = !0,
			v = !0,
			T = "Earth";
			e.exports = {
				scalePlanets: l,
				updateTransitionScale: n,
				initializeScaling: u
			}
		}, function (e, t) {
			var a = {
				shadowLabels: [{
						text: "50%",
						location: [56.83548780979182, -168.42835389605966],
						id: 165
					}, {
						text: "75%",
						location: [49.66195086928178, -162.1800789046905],
						id: 166
					}, {
						text: "100%",
						location: [42.50054691419735, -158.47763669395954],
						id: 167
					}, {
						text: "75%",
						location: [35.402612985629744, -156.30751731245087],
						id: 168
					}, {
						text: "50%",
						location: [29.10251380549358, -154.308341332584],
						id: 169
					}, {
						text: "50%",
						location: [30.223273178118383, -34.77224135971484],
						id: 170
					}, {
						text: "75%",
						location: [22.585225655424054, -39.28566854555102],
						id: 171
					}, {
						text: "100%",
						location: [14.804360855332334, -41.362599672623936],
						id: 172
					}, {
						text: "75%",
						location: [7.457948087094399, -42.84372451377734],
						id: 173
					}, {
						text: "50%",
						location: [.782294500358716, -44.195710134266456],
						id: 174
					}
				],
				tier1: [{
						text: "Kansas City",
						location: [39.1, -94.5833333333333],
						id: 0
					}, {
						text: "Houston",
						location: [29.75, -95.35],
						id: 1
					}, {
						text: "Vancouver",
						location: [49.2166666666667, -123.1],
						id: 2
					}, {
						text: "Los Angeles",
						location: [34.05, -118.25],
						id: 3
					}, {
						text: "New York",
						location: [40.7833333333333, -73.9666666666667],
						id: 4
					}
				],
				tier2: [{
						text: "Salem",
						location: [44.9429, -123.0351],
						id: 5
					}, {
						text: "Olympia",
						location: [47.03787, -122.9007],
						id: 6
					}, {
						text: "Boise",
						location: [43.6135, -116.20345],
						id: 7
					}, {
						text: "Helena",
						location: [46.59271, -112.03611],
						id: 8
					}, {
						text: "Cheyenne",
						location: [41.13998, -104.82025],
						id: 9
					}, {
						text: "Carson City",
						location: [39.1638, -119.7674],
						id: 10
					}, {
						text: "Phoenix",
						location: [33.44838, -112.07404],
						id: 11
					}, {
						text: "Salt Lake City",
						location: [40.76078, -111.89105],
						id: 12
					}, {
						text: "Lincoln",
						location: [40.8, -96.66696],
						id: 13
					}, {
						text: "Des Moines",
						location: [41.60054, -93.60911],
						id: 14
					}, {
						text: "Pierre",
						location: [44.36832, -100.35097],
						id: 15
					}, {
						text: "Bismarck",
						location: [46.80833, -100.78374],
						id: 16
					}, {
						text: "Denver",
						location: [39.73915, -104.9847],
						id: 17
					}, {
						text: "Albuquerque",
						location: [35.08449, -106.65114],
						id: 18
					}, {
						text: "Austin",
						location: [30.26715, -97.74306],
						id: 19
					}, {
						text: "Oklahoma City",
						location: [35.46756, -97.51643],
						id: 20
					}, {
						text: "Baton Rouge",
						location: [30.45075, -91.15455],
						id: 21
					}, {
						text: "Little Rock",
						location: [34.74648, -92.28959],
						id: 22
					}, {
						text: "Jefferson City",
						location: [38.5767, -92.17352],
						id: 23
					}, {
						text: "St Paul",
						location: [44.94441, -93.09327],
						id: 24
					}, {
						text: "Madison",
						location: [43.07305, -89.40123],
						id: 25
					}, {
						text: "Springfield",
						location: [39.80172, -89.64371],
						id: 26
					}, {
						text: "Indianapolis",
						location: [39.76838, -86.15804],
						id: 27
					}, {
						text: "Frankfort",
						location: [38.20091, -84.87328],
						id: 28
					}, {
						text: "Nashville",
						location: [36.16589, -86.78444],
						id: 29
					}, {
						text: "Jackson",
						location: [32.29876, -90.18481],
						id: 30
					}, {
						text: "Montgomery",
						location: [32.36681, -86.29997],
						id: 31
					}, {
						text: "Tallahassee",
						location: [30.43826, -84.28073],
						id: 32
					}, {
						text: "Atlanta",
						location: [33.749, -84.38798],
						id: 33
					}, {
						text: "Columbia",
						location: [34.00071, -81.03481],
						id: 34
					}, {
						text: "Raleigh",
						location: [35.7721, -78.63861],
						id: 35
					}, {
						text: "Richmond",
						location: [37.55376, -77.46026],
						id: 36
					}, {
						text: "Charleston",
						location: [38.34982, -81.63262],
						id: 37
					}, {
						text: "Columbus",
						location: [39.96118, -82.99879],
						id: 38
					}, {
						text: "Lansing",
						location: [42.73254, -84.55553],
						id: 39
					}, {
						text: "Washington",
						location: [38.89511, -77.03637],
						id: 40
					}, {
						text: "Dover",
						location: [39.15817, -75.52437],
						id: 41
					}, {
						text: "Harrisburg",
						location: [40.2737, -76.88442],
						id: 42
					}, {
						text: "Hartford",
						location: [41.76371, -72.68509],
						id: 43
					}, {
						text: "Boston",
						location: [42.35843, -71.05977],
						id: 44
					}, {
						text: "Montpelier",
						location: [44.26006, -72.57539],
						id: 45
					}, {
						text: "Concord",
						location: [43.20814, -71.53757],
						id: 46
					}, {
						text: "Augusta",
						location: [44.31062, -69.77949],
						id: 47
					}, {
						text: "Juneau",
						location: [58.30194, -134.41972],
						id: 48
					}, {
						text: "Honolulu",
						location: [21.30694, -157.85833],
						id: 49
					}
				],
				tier3: [{
						text: "Medford",
						location: [42.32652, -122.87559],
						id: 50
					}, {
						text: "Baker City",
						location: [44.77487, -117.83438],
						id: 51
					}, {
						text: "Portland",
						location: [45.52345, -122.67621],
						id: 52
					}, {
						text: "Eugene",
						location: [44.05207, -123.08675],
						id: 53
					}, {
						text: "Seattle",
						location: [47.60621, -122.33207],
						id: 54
					}, {
						text: "Spokane",
						location: [47.65966, -117.42908],
						id: 55
					}, {
						text: "Twin Falls",
						location: [42.56297, -114.46087],
						id: 56
					}, {
						text: "Idaho Falls",
						location: [43.46658, -112.03414],
						id: 57
					}, {
						text: "Weiser",
						location: [44.251, -116.96933],
						id: 58
					}, {
						text: "Great Falls",
						location: [47.50024, -111.30081],
						id: 59
					}, {
						text: "Billings",
						location: [45.78329, -108.50069],
						id: 60
					}, {
						text: "Miles City",
						location: [46.40834, -105.84056],
						id: 61
					}, {
						text: "Casper",
						location: [42.86663, -106.31308],
						id: 62
					}, {
						text: "Douglas",
						location: [42.75969, -105.38221],
						id: 63
					}, {
						text: "Gillette",
						location: [44.29109, -105.50222],
						id: 64
					}, {
						text: "Jackson",
						location: [43.47993, -110.76243],
						id: 65
					}, {
						text: "Reno",
						location: [39.52963, -119.8138],
						id: 66
					}, {
						text: "Elko",
						location: [40.83242, -115.76312],
						id: 67
					}, {
						text: "Las Vegas",
						location: [36.17497, -115.13722],
						id: 68
					}, {
						text: "Redding",
						location: [40.58654, -122.39168],
						id: 69
					}, {
						text: "Sacramento",
						location: [38.58157, -121.4944],
						id: 70
					}, {
						text: "San Francisco",
						location: [37.77493, -122.41942],
						id: 71
					}, {
						text: "Fresno",
						location: [36.74773, -119.77237],
						id: 72
					}, {
						text: "San Diego",
						location: [32.71533, -117.15726],
						id: 73
					}, {
						text: "Flagstaff",
						location: [35.19807, -111.65127],
						id: 74
					}, {
						text: "Tucson",
						location: [32.22174, -110.92648],
						id: 75
					}, {
						text: "Yuma",
						location: [32.72532, -114.6244],
						id: 76
					}, {
						text: "Moab",
						location: [38.57332, -109.54984],
						id: 77
					}, {
						text: "Vernal",
						location: [40.45552, -109.52875],
						id: 78
					}, {
						text: "St George",
						location: [37.10415, -113.58412],
						id: 79
					}, {
						text: "Brigham City",
						location: [41.51021, -112.0155],
						id: 80
					}, {
						text: "Alliance",
						location: [42.10163, -102.87214],
						id: 81
					}, {
						text: "North Platte",
						location: [41.12389, -100.76542],
						id: 82
					}, {
						text: "Kearney",
						location: [40.69946, -99.08148],
						id: 83
					}, {
						text: "Omaha",
						location: [41.25861, -95.93779],
						id: 84
					}, {
						text: "Sioux City",
						location: [42.49999, -96.40031],
						id: 85
					}, {
						text: "Cedar Rapids",
						location: [42.00833, -91.64407],
						id: 86
					}, {
						text: "Davenport",
						location: [41.52364, -90.57764],
						id: 87
					}, {
						text: "Mason City",
						location: [43.15357, -93.20104],
						id: 88
					}, {
						text: "Rapid City",
						location: [44.08054, -103.23101],
						id: 89
					}, {
						text: "Sioux Falls",
						location: [43.54997, -96.70033],
						id: 90
					}, {
						text: "Minot",
						location: [48.23251, -101.29627],
						id: 91
					}, {
						text: "Grand Forks",
						location: [47.92526, -97.03285],
						id: 92
					}, {
						text: "Dickinson",
						location: [46.87918, -102.78962],
						id: 93
					}, {
						text: "Fargo",
						location: [46.87719, -96.7898],
						id: 94
					}, {
						text: "Fort Collins",
						location: [40.58526, -105.08442],
						id: 95
					}, {
						text: "Pueblo",
						location: [38.25445, -104.60914],
						id: 96
					}, {
						text: "Durango",
						location: [37.27528, -107.88007],
						id: 97
					}, {
						text: "Grand Junction",
						location: [39.06387, -108.55065],
						id: 98
					}, {
						text: "Roswell",
						location: [33.39427, -104.52302],
						id: 99
					}, {
						text: "Santa Fe",
						location: [35.68698, -105.9378],
						id: 100
					}, {
						text: "Farmington",
						location: [36.72806, -108.21869],
						id: 101
					}, {
						text: "Las Cruces",
						location: [32.31232, -106.77834],
						id: 102
					}, {
						text: "Dallas",
						location: [32.78306, -96.80667],
						id: 103
					}, {
						text: "San Antonio",
						location: [29.42412, -98.49363],
						id: 104
					}, {
						text: "Laredo",
						location: [27.50641, -99.50754],
						id: 105
					}, {
						text: "Amarillo",
						location: [35.222, -101.8313],
						id: 106
					}, {
						text: "Lubbock",
						location: [33.57786, -101.85517],
						id: 107
					}, {
						text: "Midland",
						location: [31.99735, -102.07791],
						id: 108
					}, {
						text: "El Paso",
						location: [31.75872, -106.48693],
						id: 109
					}, {
						text: "Tulsa",
						location: [36.15398, -95.99278],
						id: 110
					}, {
						text: "Topeka",
						location: [39.04833, -95.67804],
						id: 111
					}, {
						text: "Atchison",
						location: [39.56305, -95.12164],
						id: 112
					}, {
						text: "Wichita",
						location: [37.69224, -97.33754],
						id: 113
					}, {
						text: "Dodge City",
						location: [37.7528, -100.01708],
						id: 114
					}, {
						text: "Lake Charles",
						location: [30.21309, -93.2044],
						id: 115
					}, {
						text: "Shrevport",
						location: [32.52515, -93.75018],
						id: 116
					}, {
						text: "Fort Smith",
						location: [35.38592, -94.39855],
						id: 117
					}, {
						text: "St Louis",
						location: [38.62727, -90.19789],
						id: 118
					}, {
						text: "Springfield",
						location: [37.21533, -93.29824],
						id: 119
					}, {
						text: "Duluth",
						location: [46.78327, -92.10658],
						id: 120
					}, {
						text: "Rochester",
						location: [44.02163, -92.4699],
						id: 121
					}, {
						text: "Milwaukee",
						location: [43.0389, -87.90647],
						id: 122
					}, {
						text: "Eau Claire",
						location: [44.81135, -91.49849],
						id: 123
					}, {
						text: "Green Bay",
						location: [44.51916, -88.01983],
						id: 124
					}, {
						text: "Carbondale",
						location: [37.72727, -89.21675],
						id: 125
					}, {
						text: "Chicago",
						location: [41.85003, -87.65005],
						id: 126
					}, {
						text: "Evansville",
						location: [37.97476, -87.55585],
						id: 127
					}, {
						text: "Fort Wayne",
						location: [41.1306, -85.12886],
						id: 128
					}, {
						text: "Hopkinsville",
						location: [36.86561, -87.49117],
						id: 129
					}, {
						text: "Cleveland",
						location: [35.15952, -84.87661],
						id: 130
					}, {
						text: "Memphis",
						location: [35.14953, -90.04898],
						id: 131
					}, {
						text: "Tupelo",
						location: [34.25761, -88.70339],
						id: 132
					}, {
						text: "Hattiesburg",
						location: [31.32712, -89.29034],
						id: 133
					}, {
						text: "Birmingham",
						location: [33.52066, -86.80249],
						id: 134
					}, {
						text: "Mobile",
						location: [30.69436, -88.04305],
						id: 135
					}, {
						text: "Orlando",
						location: [28.53834, -81.37924],
						id: 136
					}, {
						text: "Miami",
						location: [25.77427, -80.19366],
						id: 137
					}, {
						text: "Albany",
						location: [31.57851, -84.15574],
						id: 138
					}, {
						text: "Clayton",
						location: [34.87815, -83.40099],
						id: 139
					}, {
						text: "Greenville",
						location: [34.85262, -82.39401],
						id: 140
					}, {
						text: "Charleston",
						location: [32.77657, -79.93092],
						id: 141
					}, {
						text: "Wilmington",
						location: [34.22573, -77.94471],
						id: 142
					}, {
						text: "Charlotte",
						location: [35.22709, -80.84313],
						id: 143
					}, {
						text: "Franklin",
						location: [35.18232, -83.38154],
						id: 144
					}, {
						text: "Roanoke",
						location: [37.27097, -79.94143],
						id: 145
					}, {
						text: "Cleveland",
						location: [41.4995, -81.69541],
						id: 146
					}, {
						text: "Cincinnati",
						location: [39.162, -84.45689],
						id: 147
					}, {
						text: "Detroit",
						location: [42.33143, -83.04575],
						id: 148
					}, {
						text: "Cadillac",
						location: [44.25195, -85.40116],
						id: 149
					}, {
						text: "Baltimore",
						location: [39.29038, -76.61219],
						id: 150
					}, {
						text: "Annapolis",
						location: [38.97845, -76.49218],
						id: 151
					}, {
						text: "Philadelphia",
						location: [39.95234, -75.16379],
						id: 152
					}, {
						text: "Pittsburgh",
						location: [40.44062, -79.99589],
						id: 153
					}, {
						text: "Trenton",
						location: [40.21705, -74.74294],
						id: 154
					}, {
						text: "Albany",
						location: [42.65258, -73.75623],
						id: 155
					}, {
						text: "Buffalo",
						location: [42.88645, -78.87837],
						id: 156
					}, {
						text: "Providence",
						location: [41.82399, -71.41283],
						id: 157
					}, {
						text: "Portland",
						location: [43.66147, -70.25533],
						id: 158
					}, {
						text: "Houlton",
						location: [46.12616, -67.8403],
						id: 159
					}, {
						text: "Anchorage",
						location: [61.21806, -149.90028],
						id: 160
					}, {
						text: "Fairbanks",
						location: [64.83778, -147.71639],
						id: 161
					}, {
						text: "Lihue",
						location: [21.97886, -159.36719],
						id: 162
					}, {
						text: "Wailuku",
						location: [20.89111, -156.50472],
						id: 163
					}, {
						text: "Hilo",
						location: [19.72972, -155.09],
						id: 164
					}
				]
			};
			e.exports = {
				locationData: a
			}
		}, function (e, t, a) {
			var n = a(18);
			n.SolarEclipseShadow = {
				value: {
					lightingModel: "phong",
					ignoredLightNames: ["headlight"],
					channel: {
						color: {
							include: ["channel/eclipseShadow"],
							uniform: {
								"float": ["moonRadius", "sunRadius", "naturalMode", "bendPercent1", "bendPercent2", "shadowScale"],
								vec3: ["moonPosition", "sunPosition"],
								vec4: ["bendShadow1", "bendShadow2", "umbraShadow"],
								sampler2D: ["earthDay", "eclipsePenumbra"]
							},
							prepend: ["vec4 sampleEarth() {", "   float gamma = 1.3;", "   vec4 earthColor = texture2D(earthDay, vuv0);", "   float correctedRed = pow(earthColor.x, 1.0 / gamma);", "   float correctedGreen= pow(earthColor.y, 1.0 / gamma);", "   float correctedBlue = pow(earthColor.z, 1.0 / gamma);", "   vec4 specTex = texture2D(specular0, vuv0);", "   float brightness = 1.0;", "   if(length(specTex) > 0.9){", "       brightness = 2.5;", "   }", "   vec4 col = vec4(correctedRed, correctedGreen, correctedBlue, 1.0) * brightness;", "   return col;", "}"],
							operations: [{
									op: "assign",
									sample: "sampleEarth()",
									sampleIsCall: !1
								}, {
									op: "sub",
									sample: "eclipse(moonRadius, moonPosition, sunRadius, sunPosition, naturalMode)",
									sampleIsCall: !1
								}
							]
						},
						normal: {
							include: ["channel/unpackNormal", "channel/unpackedTangent"],
							uniform: {
								sampler2D: ["norm"],
								"float": ["normalStrength"]
							},
							operations: [{
									op: "assign",
									sample: "unpackNormal((1.0 - normalStrength) * vec4(0.5, 0.5, 1.0, 1.0) + texture2D(norm, vuv0) * normalStrength)",
									sampleIsCall: !1,
									extract: "normalFromTangent",
									extractIsCall: !0
								}
							]
						},
						emissive: {
							include: [],
							uniform: {
								sampler2D: ["earthNight", "eclipsePenumbra"]
							},
							prepend: ["vec4 eclipseBand() {", "   vec4 colorShadow = vec4(0.0, 0.0, 0.0, 0.0);", "   vec4 tex = texture2D(eclipsePenumbra, vuv0);", "   if(tex.a != 0.0) {", "       float gamma = 0.5;", "       float corrected = pow(length(tex), 1.0 / gamma);", "       colorShadow = vec4(corrected, corrected, corrected, 1.0);", "   }", "   return colorShadow * 1.7;", "}", "vec4 sampleEarthNight(){", "   vec4 nightLightColor = vec4(0.0, 0.0, 0.0, 0.0);", "   float product = dot(vnormal, -normalize(sunPosition));", "   float seamWidth = -0.3;", "   if (product > seamWidth && product < 0.0) // blend light seam ", "       nightLightColor = texture2D(earthNight, vuv0) * (seamWidth - product) / seamWidth; // offset so lights are weaker in the sun", "   else if (product > 0.0) // only show lights on dark side ", "       nightLightColor = texture2D(earthNight, vuv0);", "   return nightLightColor;", "}"],
							operations: [{
									op: "assign",
									sample: "sampleEarthNight()",
									sampleIsCall: !1
								}, {
									op: "sub",
									sample: "eclipseBand()",
									sampleIsCall: !1
								}
							]
						}
					},
					bindings: {
						vec4: {
							color: "$color",
							specular: "$specularColor",
							neutralLighting: "$neutralColor",
							bendShadow1: "$bendShadow1",
							bendShadow2: "$bendShadow2",
							umbraShadow: "$umbraShadow"
						},
						vec3: {
							moonPosition: "$moonPosition",
							sunPosition: "$sunPosition"
						},
						"float": {
							bendPercent1: "$bendPercent1",
							bendPercent2: "$bendPercent2",
							naturalMode: "$naturalMode",
							moonRadius: "$moonRadius",
							sunRadius: "$sunRadius",
							specularStrength: "$specularStrength",
							specularExponent: "$specularExponent",
							normalStrength: "$normalStrength"
						},
						sampler2D: {
							eclipsePenumbra: {
								uv: "vuv0",
								texture: "$eclipsePenumbra"
							},
							earthNight: {
								uv: "vuv0",
								texture: "$earthNight"
							},
							specular: {
								uv: "vuv0",
								texture: "$specularTexture"
							},
							norm: {
								uv: "vuv0",
								texture: "$normalTexture"
							},
							earthDay: {
								uv: "vuv0",
								texture: "$earthDay"
							}
						},
						"function": {
							vec3: {
								moonPosition: ["var f = function(context) {", "   var moonPosition = [0.0, 0.0, 0.0];", "   if(__ranger.scene.get('Moon')){", "       var frame = {parent: __ranger.scene.get('Moon'), position: [0,0,0], orientation: [0,0,0,1]};", "       moonPosition = __ranger.scene.get('Earth').frame.convert(frame, __ranger.app.getWin()._window.camera).position;", "   }", "   return moonPosition;", "}; f"],
								sunPosition: ["var f = function(context) {", "   var sunPosition = [0.0, 0.0, 0.0];", "   if(__ranger.scene.get('Sun')){", "       var frame = {parent: __ranger.scene.get('Sun'), position: [0,0,0], orientation: [0,0,0,1]};", "       sunPosition = __ranger.scene.get('Earth').frame.convert(frame, __ranger.app.getWin()._window.camera).position;", "   }", "   return sunPosition;", "}; f"]
							},
							"float": {
								shadowScale: ["var f = function(context) {", "   if(context.data.double && 'shadowScale' in context.data.double)", "       return context.data.double.shadowScale;", "   else", "       return 1.0;", "}; f"]
							}
						}
					}
				},
				parameters: {
					color: [1, 1, 1, 1],
					specularColor: [1, 1, 1, 1],
					neutralColor: [1, 1, 1, 1],
					specularStrength: 0,
					specularExponent: 1,
					normalStrength: 1
				}
			},
			e.exports = {
				SolarEclipseShadow: n.SolarEclipseShadow
			}
		}, function (e, t, a) {
			var n = a(18);
			n.SolarEclipseShadow = {
				value: {
					lightingModel: "phong",
					ignoredLightNames: ["headlight"],
					channel: {
						color: {
							include: ["channel/cubemap", "channel/eclipseShadow"],
							uniform: {
								"float": ["moonRadius", "sunRadius", "naturalMode", "bendPercent1", "bendPercent2", "shadowScale"],
								vec3: ["moonPosition", "sunPosition"],
								vec4: ["bendShadow1", "bendShadow2", "umbraShadow"],
								sampler2D: ["cube0", "cube1", "cube2", "cube3", "cube4", "cube5", "eclipsePenumbra"]
							},
							prepend: ["vec4 sampleEarth() {", "   float gamma = 1.5;", "   vec4 earthColor = sampleCube(cube0, cube1, cube2, cube3, cube4, cube5, getCubeUV(vuv0 + vec2(0.25, 0.0)));", "   float correctedRed = pow(earthColor.x, 1.0 / gamma);", "   float correctedGreen= pow(earthColor.y, 1.0 / gamma);", "   float correctedBlue = pow(earthColor.z, 1.0 / gamma);", "   vec4 specTex = texture2D(specular0, vuv0);", "   float brightness = 1.0;", "   if(length(specTex) > 0.9){", "       brightness = 2.5;", "   }", "   vec4 col = vec4(correctedRed, correctedGreen, correctedBlue, 1.0) * brightness;", "   return col;", "}"],
							operations: [{
									op: "assign",
									sample: "sampleEarth()",
									sampleIsCall: !1
								}, {
									op: "sub",
									sample: "eclipse(moonRadius, moonPosition, sunRadius, sunPosition, naturalMode)",
									sampleIsCall: !1
								}
							]
						},
						normal: {
							include: ["channel/unpackNormal", "channel/unpackedTangent"],
							uniform: {
								sampler2D: ["norm"],
								"float": ["normalStrength"]
							},
							operations: [{
									op: "assign",
									sample: "unpackNormal((1.0 - normalStrength) * vec4(0.5, 0.5, 1.0, 1.0) + texture2D(norm, vuv0) * normalStrength)",
									sampleIsCall: !1,
									extract: "normalFromTangent",
									extractIsCall: !0
								}
							]
						},
						emissive: {
							include: [],
							uniform: {
								sampler2D: ["earthNight", "eclipsePenumbra"]
							},
							prepend: ["vec4 eclipseBand() {", "   vec4 colorShadow = vec4(0.0, 0.0, 0.0, 0.0);", "   vec4 tex = texture2D(eclipsePenumbra, vuv0);", "   if(tex.a != 0.0) {", "       float gamma = 0.5;", "       float corrected = pow(length(tex), 1.0 / gamma);", "       colorShadow = vec4(corrected, corrected, corrected, 1.0);", "   }", "   return colorShadow * 1.7;", "}", "vec4 sampleEarthNight(){", "   vec4 nightLightColor = vec4(0.0, 0.0, 0.0, 0.0);", "   float product = dot(vnormal, -normalize(sunPosition));", "   float seamWidth = -0.3;", "   if (product > seamWidth && product < 0.0) // blend light seam ", "       nightLightColor = texture2D(earthNight, vuv0) * (seamWidth - product) / seamWidth; // offset so lights are weaker in the sun", "   else if (product > 0.0) // only show lights on dark side ", "       nightLightColor = texture2D(earthNight, vuv0);", "   return nightLightColor;", "}"],
							operations: [{
									op: "assign",
									sample: "sampleEarthNight()",
									sampleIsCall: !1
								}, {
									op: "sub",
									sample: "eclipseBand()",
									sampleIsCall: !1
								}
							]
						}
					},
					bindings: {
						vec4: {
							color: "$color",
							specular: "$specularColor",
							neutralLighting: "$neutralColor",
							bendShadow1: "$bendShadow1",
							bendShadow2: "$bendShadow2",
							umbraShadow: "$umbraShadow"
						},
						vec3: {
							moonPosition: "$moonPosition",
							sunPosition: "$sunPosition"
						},
						"float": {
							bendPercent1: "$bendPercent1",
							bendPercent2: "$bendPercent2",
							naturalMode: "$naturalMode",
							moonRadius: "$moonRadius",
							sunRadius: "$sunRadius",
							specularStrength: "$specularStrength",
							specularExponent: "$specularExponent",
							normalStrength: "$normalStrength"
						},
						sampler2D: {
							eclipsePenumbra: {
								uv: "vuv0",
								texture: "$eclipsePenumbra"
							},
							earthNight: {
								uv: "vuv0",
								texture: "$earthNight"
							},
							specular: {
								uv: "vuv0",
								texture: "$specularTexture"
							},
							norm: {
								uv: "vuv0",
								texture: "$normalTexture"
							},
							cube0: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 0,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube1: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 1,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube2: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 2,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube3: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 3,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube4: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 4,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube5: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 5,
										params: "$cubeTemplateParams"
									}
								]
							}
						},
						"function": {
							vec3: {
								moonPosition: ["var f = function(context) {", "   var moonPosition = [0.0, 0.0, 0.0];", "   if(__ranger.scene.get('Moon')){", "       var frame = {parent: __ranger.scene.get('Moon'), position: [0,0,0], orientation: [0,0,0,1]};", "       moonPosition = __ranger.scene.get('Earth').frame.convert(frame, __ranger.app.getWin()._window.camera).position;", "   }", "   return moonPosition;", "}; f"],
								sunPosition: ["var f = function(context) {", "   var sunPosition = [0.0, 0.0, 0.0];", "   if(__ranger.scene.get('Sun')){", "       var frame = {parent: __ranger.scene.get('Sun'), position: [0,0,0], orientation: [0,0,0,1]};", "       sunPosition = __ranger.scene.get('Earth').frame.convert(frame, __ranger.app.getWin()._window.camera).position;", "   }", "   return sunPosition;", "}; f"]
							},
							"float": {
								shadowScale: ["var f = function(context) {", "   if(context.data.double && 'shadowScale' in context.data.double)", "       return context.data.double.shadowScale;", "   else", "       return 1.0;", "}; f"]
							}
						}
					}
				},
				parameters: {
					color: [1, 1, 1, 1],
					specularColor: [1, 1, 1, 1],
					neutralColor: [1, 1, 1, 1],
					specularStrength: 0,
					specularExponent: 1,
					normalStrength: 1,
					cubeTemplate: "$StringPrefixIndexSuffix",
					cubeTemplateParams: {}
				}
			},
			e.exports = {
				SolarEclipseShadow: n.SolarEclipseShadow
			}
		}, function (e, t, a) {
			var n = a(18);
			n.MaterialMoon = {
				value: {
					channel: {
						color: {
							include: ["channel/cubemap"],
							uniform: {
								sampler2D: ["cube0", "cube1", "cube2", "cube3", "cube4", "cube5"],
								"float": ["gammaMult", "gammaConst"]
							},
							operations: [{
									op: "assign",
									sample: "sampleCube(cube0, cube1, cube2, cube3, cube4, cube5, getCubeUV(vuv0))",
									sampleIsCall: !1
								}, {
									op: "assign",
									sample: "gammaConst * ret",
									sampleIsCall: !1
								}, {
									op: "assign",
									sample: "vec4( pow(ret.r, gammaMult), pow(ret.g, gammaMult), pow(ret.b, gammaMult), pow(ret.a, gammaMult) )",
									sampleIsCall: !1
								}
							]
						},
						normal: {
							include: ["channel/unpackNormal", "channel/unpackedTangent"],
							uniform: {
								sampler2D: ["norm"],
								"float": ["normalStrength"]
							},
							operations: [{
									op: "assign",
									sample: "unpackNormal((1.0 - normalStrength) * vec4(0.5, 0.5, 1.0, 1.0) + texture2D(norm, vuv0) * normalStrength)",
									sampleIsCall: !1,
									extract: "normalFromTangent",
									extractIsCall: !0
								}
							]
						}
					},
					bindings: {
						vec4: {
							color: "$color",
							specular: "$specularColor",
							neutralLighting: "$neutralColor"
						},
						"float": {
							normalStrength: "$normalStrength",
							specularStrength: "$specularStrength",
							specularExponent: "$specularExponent",
							gammaConst: "$gammaConst",
							gammaMult: "$gammaMult"
						},
						sampler2D: {
							cube0: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 0,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube1: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 1,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube2: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 2,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube3: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 3,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube4: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 4,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube5: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 5,
										params: "$cubeTemplateParams"
									}
								]
							},
							specular: {
								uv: "vuv0",
								texture: "$specularTexture"
							},
							norm: {
								uv: "vuv0",
								texture: "$normalTexture"
							}
						}
					}
				},
				parameters: {
					color: [1, 1, 1, 1],
					specularColor: [1, 1, 1, 1],
					neutralColor: [1, 1, 1, 1],
					normalStrength: 1,
					specularStrength: 0,
					specularExponent: 1,
					gammaMult: 1.3,
					gammaConst: 1.5,
					cubeTemplate: "$StringPrefixIndexSuffix",
					cubeTemplateParams: {}
				}
			},
			e.exports = {
				MaterialMoon: n.MaterialMoon
			}
		}, function (e, t, a) {
			var n = a(18);
			n.EarthPolitical = {
				value: {
					lightingModel: "none",
					channel: {
						color: {
							include: ["channel/eclipseShadow", "channel/cubemap"],
							uniform: {
								"float": ["moonRadius", "sunRadius", "naturalMode", "bendPercent1", "bendPercent2", "shadowScale"],
								vec3: ["moonPosition", "sunPosition"],
								vec4: ["bendShadow1", "bendShadow2", "umbraShadow"],
								sampler2D: ["cube0", "cube1", "cube2", "cube3", "cube4", "cube5", "eclipsePenumbra"]
							},
							prepend: ["vec4 eclipseBand(){", "   vec4 colorShadow = vec4(0.0, 0.0, 0.0, 0.0);", "   vec4 tex = texture2D(eclipsePenumbra, vuv0);", "   if(tex.a != 0.0){", "       float gamma = 0.6;", "       float corrected = pow(length(tex), 1.0 / gamma);", "       colorShadow = vec4(corrected, corrected, corrected, 1.0);", "   }", "   return colorShadow;", "}", "vec3 changeColor(vec3 colIn, vec3 colOut, vec3 margin){", "   if(colIn.r > colOut.r - margin.r && colIn.r < colOut.r + margin.r){", "       if(colIn.g > colOut.g - margin.g && colIn.g < colOut.g + margin.g){", "           if(colIn.b > colOut.b - margin.b && colIn.b < colOut.b + margin.b){", "               colIn.r = colOut.r;", "               colIn.g = colOut.g;", "               colIn.b = colOut.b;", "           }", "       }", "   }", "   return colIn;", "}", "vec3 filterColor(vec3 colIn){", "    vec3 margin = vec3(0.1, 0.1, 0.1);", "    vec3 newColor = vec3(121.0 / 255.0, 199.0 / 255.0, 237.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(138.0 / 255.0, 183.0 / 255.0, 102.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(247.0 / 255.0, 184.0 / 255.0, 177.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(224.0 / 255.0, 206.0 / 255.0, 116.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(206.0 / 255.0, 168.0 / 255.0, 96.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(160.0 / 255.0, 168.0 / 255.0, 201.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(229.0 / 255.0, 241.0 / 255.0, 243.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    newColor = vec3(191.0 / 255.0, 167.0 / 255.0, 129.0 / 255.0);", "    if(newColor == changeColor(colIn, newColor, margin)){", "       return newColor;", "    }", "    return colIn;", "}"],
							operations: [{
									op: "assign",
									sample: "sampleCube(cube0, cube1, cube2, cube3, cube4, cube5, getCubeUV(vuv0 + vec2(0.25, 0.0)))",
									sampleIsCall: !1
								}, {
									op: "assign",
									sample: "vec4(filterColor(ret.rgb), 1.0)",
									sampleIsCall: !1
								}, {
									op: "sub",
									sample: "eclipseBand()",
									sampleIsCall: !1
								}, {
									op: "sub",
									sample: "eclipse(moonRadius, moonPosition, sunRadius, sunPosition, naturalMode)",
									sampleIsCall: !1
								}
							]
						}
					},
					bindings: {
						vec4: {
							color: "$color",
							specular: "$specularColor",
							neutralLighting: "$neutralColor",
							bendShadow1: "$bendShadow1",
							bendShadow2: "$bendShadow2",
							umbraShadow: "$umbraShadow"
						},
						vec3: {
							moonPosition: "$moonPosition",
							sunPosition: "$sunPosition"
						},
						"float": {
							naturalMode: "$naturalMode",
							moonRadius: "$moonRadius",
							sunRadius: "$sunRadius",
							bendPercent1: "$bendPercent1",
							bendPercent2: "$bendPercent2",
							specularStrength: "$specularStrength",
							specularExponent: "$specularExponent"
						},
						sampler2D: {
							eclipsePenumbra: {
								uv: "vuv0",
								texture: "$eclipsePenumbra"
							},
							cube0: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 0,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube1: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 1,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube2: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 2,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube3: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 3,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube4: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 4,
										params: "$cubeTemplateParams"
									}
								]
							},
							cube5: {
								uv: "vuv0",
								texture: ["$cubeTemplate", {
										index: 5,
										params: "$cubeTemplateParams"
									}
								]
							}
						},
						"function": {
							vec3: {
								moonPosition: ["var f = function(context) {", "   var moonPosition = [0.0, 0.0, 0.0];", "   if(__ranger.scene.get('Moon')){", "       var frame = {parent: __ranger.scene.get('Moon'), position: [0,0,0], orientation: [0,0,0,1]};", "       moonPosition = __ranger.scene.get('Earth').frame.convert(frame, __ranger.app.getWin()._window.camera).position;", "   }", "   return moonPosition;", "}; f"],
								sunPosition: ["var f = function(context) {", "   var sunPosition = [0.0, 0.0, 0.0];", "   if(__ranger.scene.get('Sun')){", "       var frame = {parent: __ranger.scene.get('Sun'), position: [0,0,0], orientation: [0,0,0,1]};", "       sunPosition = __ranger.scene.get('Earth').frame.convert(frame, __ranger.app.getWin()._window.camera).position;", "   }", "   return sunPosition;", "}; f"]
							},
							"float": {
								shadowScale: ["var f = function(context) {", "   if(context.data.double && 'shadowScale' in context.data.double)", "       return context.data.double.shadowScale;", "   else", "       return 1.0;", "}; f"]
							}
						}
					}
				},
				parameters: {
					color: [1, 1, 1, 1],
					specularColor: [1, 1, 1, 1],
					neutralColor: [1, 1, 1, 1],
					specularStrength: 0,
					specularExponent: 1,
					cubeTemplate: "$StringPrefixIndexSuffix",
					cubeTemplateParams: {}
				}
			},
			e.exports = {
				EarthPolitical: n.EarthPolitical
			}
		}, function (e, t, a) {
			(function (t) {
				var n = a(4),
				i = a(29),
				r = a(22),
				o = a(23),
				s = a(61);
				a(62),
				e.exports = function (e, a, c, l, u, d) {
					function M() {
						g._window.width = g.element.width,
						g._window.height = g.element.height
					}
					console.verboseLog('ranger/Window: Creating a ranger.Window("' + e + '", ' + a + "x" + c + ", " + l + ", " + u + ' interface: "' + d + '"');
					var g = {
						title: e,
						_window: n.app.newWindow(e, a, c, l, u),
						element: d,
						_camera: null,
						cameraState: null,
						updates: {},
						postTransformUpdates: {},
						postCameraUpdates: {},
						endFrameUpdates: {},
						inputHandlers: [i.KeyBinder("bindings")],
						cursorPosition: [0, 0],
						backgroundHandlers: [],
						touchDown: !1,
						allowKeypress: !0
					};
					return g.id = g._window.id,
					console.verboseLog("ranger/Window: ID: " + g.id),
					t.window && (t.window.addEventListener("resize", M), g.element.addEventListener("mouseout", i.eventHandlers.mouseOut), g.element.addEventListener("mousemove", i.eventHandlers.mouseMove), t.window.addEventListener("keydown", i.eventHandlers.keyPress), g.element.addEventListener("mousedown", i.eventHandlers.mouseDown), g.element.addEventListener("mouseup", i.eventHandlers.mouseUp), g.element.addEventListener("DOMMouseScroll", i.eventHandlers.scroll), g.element.addEventListener("mousewheel", i.eventHandlers.scroll), g.element.addEventListener("wheel", i.eventHandlers.scroll), g.element.addEventListener("touchstart", i.eventHandlers.touchStart), g.element.addEventListener("touchmove", i.eventHandlers.touchMove), g.element.addEventListener("touchend", i.eventHandlers.touchEnd), g.element.addEventListener("touchcancel", i.eventHandlers.touchCancel), g.element.addEventListener("touchleave", i.eventHandlers.touchCancel), M()),
					g.pick = function () {
						return g._window.pickedFragmentInfo
					},
					g.updates.camera = function (e, t) {
						t.cameraState && (t.cameraState.update(t._camera, e), t.cameraState.frame ? (n.scene.cameraData[t._camera.id].attachedNode = t.cameraState.frame.parent, t._camera.frame = t.cameraState.frame, t.cameraDebug && (console.log("ranger/Window: camera: " + t.cameraState.name()), console.log(t.cameraState.frame.position), console.log(t.cameraState.frame.orientation))) : console.error("ranger/Window: Error: Invalid camera state"))
					},
					g.setCamera = function (e) {
						g.cameraState && g.cameraState.exit(g),
						g.cameraState = e,
						e.enter && e.enter(g)
					},
					g.initCamera = function (e) {
						var t = e.clock || n.clock.Clock(0, 0),
						a = e.target || n.scene.get("Star_Sun");
						console.verboseLog("ranger/Window: " + g.id + ": addCamera(" + t.time.value + ", " + t.rate + ")"),
						g._camera = g._window.addCamera(t),
						g._camera.fov = Math.PI / 6;
						var o = {
							parent: a,
							position: e.position || [0, 0, 0],
							orientation: e.orientation || [0, 0, 0, 1]
						};
						g._camera.frame = o,
						n.scene.cameraData[g._camera.id] || (n.scene.cameraData[g._camera.id] = {}),
						n.scene.cameraData[g._camera.id].attachedNode = a,
						console.verboseLog("ranger/Window: " + g.id + ": camera init complete"),
						navigator.getVRDisplays().then(function (e) {
							return e.length ? (g.vrDevice = e[0], void(g.vrDevice && console.log("VR Device detected."))) : void console.log("No VRDisplays are found.")
						})["catch"](function (e) {
							console.error("Could not get VRDevices", e.stack)
						}),
						g._camera.stereoBindings = i.KeyBinder("stereo_bindings", {
								P: function () {
									g._camera.eyeSeparation += .0025
								},
								O: function () {
									g._camera.eyeSeparation -= .0025
								},
								I: function () {
									g._camera.focalDistance += .0025
								},
								U: function () {
									g._camera.focalDistance -= .0025
								}
							}),
						g.addInputHandler(g._camera.stereoBindings),
						r.generateLabelSystem(g, g._camera)
					},
					g.getInputHandler = function (e) {
						for (var t in g.inputHandlers)
							if (g.inputHandlers[t].name == e)
								return g.inputHandlers[t];
						return null
					},
					g.addInputHandler = function (e) {
						for (var t in g.inputHandlers)
							if (g.inputHandlers[t].name == e.name)
								return void(g.inputHandlers[t] = e);
						g.inputHandlers.push(e)
					},
					g.deleteInputHandler = function (e) {
						for (var t in g.inputHandlers)
							if (g.inputHandlers[t].name == e)
								return void delete g.inputHandlers[t]
					},
					g.addBackgroundHandler = function (e) {
						for (var t in g.backgroundHandlers)
							if (g.backgroundHandlers[t].name == e.name)
								return void(g.backgroundHandlers[t] = e);
						g.backgroundHandlers.push(e)
					},
					g.deleteBackgroundHandler = function (e) {
						for (var t in g.backgroundHandlers)
							if (g.backgroundHandlers[t].name == e)
								return void delete g.backgroundHandlers[t]
					},
					g.bind = function (e, t) {
						g.getInputHandler("bindings").Bind(e, t),
						g.getInputHandler("bindings").Bind(e, t)
					},
					g.unbind = function (e) {
						g.getInputHandler("bindings").Unbind(e)
					},
					g.passInputEvent = function (e, t) {
						var a,
						n = !1;
						for (a in g.inputHandlers)
							try {
								if (void 0 !== g.inputHandlers[a] && g.inputHandlers[a].handle(e, t)) {
									n = !0;
									break
								}
							} catch (i) {
								console.exception('ranger/Window: Updating "' + g.title + '" failed in input handler "' + g.inputHandlers[a].name + '": ', i)
							}
						if (!n)
							for (a in g.backgroundHandlers)
								try {
									if (void 0 !== g.backgroundHandlers[a] && g.backgroundHandlers[a].handle(e, t)) {
										n = !0;
										break
									}
								} catch (i) {
									console.exception('ranger/Window: Updating "' + g.title + '" failed in input handler "' + g.inputHandlers[a].name + '": ', i)
								}
					},
					g.loop = function (e, t, a, n) {
						try {
							a[n](t, g),
							a[n].failed && console.verboseLog('ranger/Window: Updating "' + g.title + '" succeded after ' + a[n].failed + " tries"),
							a[n].failed = 0
						} catch (i) {
							a[n].failed || (a[n].failed = 0),
							(++a[n].failed < 3 || g.doDebug) && console.exception('ranger/Window: Updating "' + g.title + '" failed ' + (a[n].failed < 2 ? "" : "(supressing messages)") + " in " + e + ': "' + n + '": ', i)
						}
					},
					g._window.windowUpdate = function (e) {
						for (var t in g.updates)
							g.loop("windowUpdate", e, g.updates, t)
					},
					g._window.postTransformUpdate = function (e) {
						for (var t in g.postTransformUpdates)
							g.loop("postTransformUpdate", e, g.postTransformUpdates, t)
					},
					g._window.postCameraUpdate = function (e) {
						for (var t in g.postCameraUpdates)
							g.loop("postCameraUpdates", e, g.postCameraUpdates, t)
					},
					g.endFrame = function (e) {
						for (var t in g.endFrameUpdates)
							g.loop("endFrameUpdates", e, g.endFrameUpdates, t)
					},
					g.getClock = function () {
						return g._camera ? g._camera.clock : n.clock.Clock(NaN, NaN)
					},
					g.setRate = function (e) {
						return g._camera ? g._camera.clock = {
							time: g._camera.clock.time,
							rate: e
						}
						 : n.clock.Clock(NaN, NaN)
					},
					g.setTime = function (e) {
						return g._camera ? g._camera.clock = {
							time: {
								value: e
							},
							rate: g._camera.clock.rate
						}
						 : n.clock.Clock(NaN, NaN)
					},
					g.getRate = function () {
						return g._camera ? g._camera.clock.rate : 0
					},
					g.getTime = function () {
						return g._camera ? g._camera.clock.time.value : 0
					},
					g.getCorrectedCursorPosition = function () {
						var e = g.element.getBoundingClientRect(),
						t = [0, 0],
						a = e.top,
						n = e.left;
						return t[0] = g.cursorPosition[0] - n,
						t[1] = g.cursorPosition[1] - a,
						t
					},
					g.getCorrectedPosition = function (e, t) {
						var a = g.element.getBoundingClientRect(),
						n = [0, 0],
						i = a.top,
						r = a.left;
						return n[0] = e - r,
						n[1] = t - i,
						n
					},
					g.getCorrectedPositionNDC = function (e, t) {
						var a = g.getCorrectedPosition(e, t);
						return [(a[0] - (g._window.width - 1) / 2) / ((g._window.width - 1) / 2), (g._window.height - 1 - a[1] - (g._window.height - 1) / 2) / ((g._window.height - 1) / 2)]
					},
					o.init(g),
					s.setAnimation(g),
					n.graphics.init(),
					i.init(g),
					console.verboseLog("ranger/Window: init complete"),
					g
				}
			}).call(t, function () {
				return this
			}
				())
		}, function (e, t, a) {
			function n() {
				if (o)
					return o;
				o = document.createElement("div"),
				o.id = "loadingDiv",
				o.className = "uil-spin-css";
				var e = document.createElement("style");
				e.innerHTML = c,
				o.appendChild(e),
				o.style.left = "50%",
				o.style.top = "50%",
				o.style.position = "absolute",
				o.style.transform = "translate(-100px, -100px) scale(0.25)",
				o.style["pointer-events"] = "none";
				for (var t, a = 0; a < 8; a++)
					t = document.createElement("div"), t.appendChild(document.createElement("div")), o.appendChild(t);
				return o
			}
			function i() {
				s.app.downloadManager.downloadCount > 0 ? document.getElementById("loadingDiv") || document.getElementById("ranger-container").appendChild(o) : document.getElementById("loadingDiv") && o.parentNode.removeChild(o)
			}
			function r(e) {
				n(),
				e.endFrameUpdates.loadingAnimation = i
			}
			var o,
			s = a(4),
			c = ".uil-spin-css {background: none;position: relative;width: 200px;height: 200px;}width: 100%;@-webkit-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@-webkit-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@-moz-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@-ms-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@-moz-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@-webkit-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@-o-keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}@keyframes uil-spin-css {0% {opacity: 1;-ms-transform: scale(1.5);-moz-transform: scale(1.5);-webkit-transform: scale(1.5);-o-transform: scale(1.5);transform: scale(1.5);}100% {opacity: 0.1;-ms-transform: scale(1);-moz-transform: scale(1);-webkit-transform: scale(1);-o-transform: scale(1);transform: scale(1);}}.uil-spin-css > div {width: 24px;height: 24px;margin-left: 4px;margin-top: 4px;position: absolute;}.uil-spin-css > div > div {width: 100%;height: 100%;border-radius: 15px;background: #bdbcbc;}.uil-spin-css > div:nth-of-type(1) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0s;-moz-animation-delay: 0s;-webkit-animation-delay: 0s;-o-animation-delay: 0s;animation-delay: 0s;}.uil-spin-css > div:nth-of-type(1) {-ms-transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(2) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.12s;-moz-animation-delay: 0.12s;-webkit-animation-delay: 0.12s;-o-animation-delay: 0.12s;animation-delay: 0.12s;}.uil-spin-css > div:nth-of-type(2) {-ms-transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(3) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.25s;-moz-animation-delay: 0.25s;-webkit-animation-delay: 0.25s;-o-animation-delay: 0.25s;animation-delay: 0.25s;}.uil-spin-css > div:nth-of-type(3) {-ms-transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(4) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.37s;-moz-animation-delay: 0.37s;-webkit-animation-delay: 0.37s;-o-animation-delay: 0.37s;animation-delay: 0.37s;}.uil-spin-css > div:nth-of-type(4) {-ms-transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(5) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.5s;-moz-animation-delay: 0.5s;-webkit-animation-delay: 0.5s;-o-animation-delay: 0.5s;animation-delay: 0.5s;}.uil-spin-css > div:nth-of-type(5) {-ms-transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(6) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.62s;-moz-animation-delay: 0.62s;-webkit-animation-delay: 0.62s;-o-animation-delay: 0.62s;animation-delay: 0.62s;}.uil-spin-css > div:nth-of-type(6) {-ms-transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(7) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.75s;-moz-animation-delay: 0.75s;-webkit-animation-delay: 0.75s;-o-animation-delay: 0.75s;animation-delay: 0.75s;}.uil-spin-css > div:nth-of-type(7) {-ms-transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);}.uil-spin-css > div:nth-of-type(8) > div {-ms-animation: uil-spin-css 1s linear infinite;-moz-animation: uil-spin-css 1s linear infinite;-webkit-animation: uil-spin-css 1s linear infinite;-o-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-ms-animation-delay: 0.87s;-moz-animation-delay: 0.87s;-webkit-animation-delay: 0.87s;-o-animation-delay: 0.87s;animation-delay: 0.87s;}.uil-spin-css > div:nth-of-type(8) {-ms-transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);-moz-transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);-webkit-transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);-o-transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);}";
			e.exports = {
				loadingDiv: o,
				getLoadingDiv: n,
				loadingAnimation: i,
				setAnimation: r
			}
		}, function (e, t) {
			!function a(e, t, n) {
				function i(o, s) {
					if (!t[o]) {
						if (!e[o]) {
							var c = "function" == typeof require && require;
							if (!s && c)
								return c(o, !0);
							if (r)
								return r(o, !0);
							var l = new Error("Cannot find module '" + o + "'");
							throw l.code = "MODULE_NOT_FOUND",
							l
						}
						var u = t[o] = {
							exports: {}
						};
						e[o][0].call(u.exports, function (t) {
							var a = e[o][1][t];
							return i(a ? a : t)
						}, u, u.exports, a, e, t, n)
					}
					return t[o].exports
				}
				for (var r = "function" == typeof require && require, o = 0; o < n.length; o++)
					i(n[o]);
				return i
			}
			({
				1: [function (e, t, a) {
						"use strict";
						function n(e) {
							if (null === e || void 0 === e)
								throw new TypeError("Object.assign cannot be called with null or undefined");
							return Object(e)
						}
						function i() {
							try {
								if (!Object.assign)
									return !1;
								var e = new String("abc");
								if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0])
									return !1;
								for (var t = {}, a = 0; a < 10; a++)
									t["_" + String.fromCharCode(a)] = a;
								var n = Object.getOwnPropertyNames(t).map(function (e) {
										return t[e]
									});
								if ("0123456789" !== n.join(""))
									return !1;
								var i = {};
								return "abcdefghijklmnopqrst".split("").forEach(function (e) {
									i[e] = e
								}),
								"abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
							} catch (r) {
								return !1
							}
						}
						var r = Object.prototype.hasOwnProperty,
						o = Object.prototype.propertyIsEnumerable;
						t.exports = i() ? Object.assign : function (e, t) {
							for (var a, i, s = n(e), c = 1; c < arguments.length; c++) {
								a = Object(arguments[c]);
								for (var l in a)
									r.call(a, l) && (s[l] = a[l]);
								if (Object.getOwnPropertySymbols) {
									i = Object.getOwnPropertySymbols(a);
									for (var u = 0; u < i.length; u++)
										o.call(a, i[u]) && (s[i[u]] = a[i[u]])
								}
							}
							return s
						}
					}, {}
				],
				2: [function (e, t, a) {
						function n() {
							this.isPolyfilled = !0,
							this.displayId = l++,
							this.displayName = "webvr-polyfill displayName",
							this.isConnected = !0,
							this.isPresenting = !1,
							this.capabilities = {
								hasPosition: !1,
								hasOrientation: !1,
								hasExternalDisplay: !1,
								canPresent: !1,
								maxLayers: 1
							},
							this.stageParameters = null,
							this.waitingForPresent_ = !1,
							this.layer_ = null,
							this.fullscreenElement_ = null,
							this.fullscreenWrapper_ = null,
							this.fullscreenElementCachedStyle_ = null,
							this.fullscreenEventTarget_ = null,
							this.fullscreenChangeHandler_ = null,
							this.fullscreenErrorHandler_ = null,
							this.wakelock_ = new c
						}
						function i() {
							this.isPolyfilled = !0,
							this.hardwareUnitId = "webvr-polyfill hardwareUnitId",
							this.deviceId = "webvr-polyfill deviceId",
							this.deviceName = "webvr-polyfill deviceName"
						}
						function r() {}
						function o() {}
						var s = e("./util.js"),
						c = e("./wakelock.js"),
						l = 1e3,
						u = !1,
						d = [0, 0, .5, 1],
						M = [.5, 0, .5, 1];
						n.prototype.getPose = function () {
							return this.getImmediatePose()
						},
						n.prototype.requestAnimationFrame = function (e) {
							return window.requestAnimationFrame(e)
						},
						n.prototype.cancelAnimationFrame = function (e) {
							return window.cancelAnimationFrame(e)
						},
						n.prototype.wrapForFullscreen = function (e) {
							function t() {
								if (i.fullscreenElement_) {
									var e = ["position: absolute", "top: 0", "left: 0", "width: " + Math.max(screen.width, screen.height) + "px", "height: " + Math.min(screen.height, screen.width) + "px", "border: 0", "margin: 0", "padding: 0"];
									i.fullscreenElement_.setAttribute("style", e.join("; ") + ";")
								}
							}
							if (s.isIOS())
								return e;
							if (!this.fullscreenWrapper_) {
								this.fullscreenWrapper_ = document.createElement("div");
								var a = ["height: " + Math.min(screen.height, screen.width) + "px !important", "top: 0 !important", "left: 0 !important", "right: 0 !important", "border: 0", "margin: 0", "padding: 0", "z-index: 999999 !important", "position: fixed"];
								this.fullscreenWrapper_.setAttribute("style", a.join("; ") + ";"),
								this.fullscreenWrapper_.classList.add("webvr-polyfill-fullscreen-wrapper")
							}
							if (this.fullscreenElement_ == e)
								return this.fullscreenWrapper_;
							this.removeFullscreenWrapper(),
							this.fullscreenElement_ = e;
							var n = this.fullscreenElement_.parentElement;
							n.insertBefore(this.fullscreenWrapper_, this.fullscreenElement_),
							n.removeChild(this.fullscreenElement_),
							this.fullscreenWrapper_.insertBefore(this.fullscreenElement_, this.fullscreenWrapper_.firstChild),
							this.fullscreenElementCachedStyle_ = this.fullscreenElement_.getAttribute("style");
							var i = this;
							return t(),
							this.fullscreenWrapper_
						},
						n.prototype.removeFullscreenWrapper = function () {
							if (this.fullscreenElement_) {
								var e = this.fullscreenElement_;
								this.fullscreenElementCachedStyle_ ? e.setAttribute("style", this.fullscreenElementCachedStyle_) : e.removeAttribute("style"),
								this.fullscreenElement_ = null,
								this.fullscreenElementCachedStyle_ = null;
								var t = this.fullscreenWrapper_.parentElement;
								return this.fullscreenWrapper_.removeChild(e),
								t.insertBefore(e, this.fullscreenWrapper_),
								t.removeChild(this.fullscreenWrapper_),
								e
							}
						},
						n.prototype.requestPresent = function (e) {
							var t = this.isPresenting,
							a = this;
							return e instanceof Array || (u || (console.warn("Using a deprecated form of requestPresent. Should pass in an array of VRLayers."), u = !0), e = [e]),
							new Promise(function (n, i) {
								function r() {
									var e = s.getFullscreenElement();
									a.isPresenting = A === e,
									a.isPresenting ? (screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape-primary")["catch"](function (e) {
											console.error("screen.orientation.lock() failed due to", e.message)
										}), a.waitingForPresent_ = !1, a.beginPresent_(), n()) : (screen.orientation && screen.orientation.unlock && screen.orientation.unlock(), a.removeFullscreenWrapper(), a.wakelock_.release(), a.endPresent_(), a.removeFullscreenListeners_()),
									a.fireVRDisplayPresentChange_()
								}
								function o() {
									a.waitingForPresent_ && (a.removeFullscreenWrapper(), a.removeFullscreenListeners_(), a.wakelock_.release(), a.waitingForPresent_ = !1, a.isPresenting = !1, i(new Error("Unable to present.")))
								}
								if (!a.capabilities.canPresent)
									return void i(new Error("VRDisplay is not capable of presenting."));
								if (0 == e.length || e.length > a.capabilities.maxLayers)
									return void i(new Error("Invalid number of layers."));
								var c = e[0];
								if (!c.source)
									return void n();
								var l = c.leftBounds || d,
								u = c.rightBounds || M;
								if (t) {
									var g = !1,
									p = a.layer_;
									p.source !== c.source && (p.source = c.source, g = !0);
									for (var m = 0; m < 4; m++)
										p.leftBounds[m] !== l[m] && (p.leftBounds[m] = l[m], g = !0), p.rightBounds[m] !== u[m] && (p.rightBounds[m] = u[m], g = !0);
									return g && a.fireVRDisplayPresentChange_(),
									void n()
								}
								if (a.layer_ = {
										predistorted: c.predistorted,
										source: c.source,
										leftBounds: l.slice(0),
										rightBounds: u.slice(0)
									}, a.waitingForPresent_ = !1, a.layer_ && a.layer_.source) {
									var A = a.wrapForFullscreen(a.layer_.source);
									a.addFullscreenListeners_(A, r, o),
									s.requestFullscreen(A) ? (a.wakelock_.request(), a.waitingForPresent_ = !0) : s.isIOS() && (a.wakelock_.request(), a.isPresenting = !0, a.beginPresent_(), a.fireVRDisplayPresentChange_(), n())
								}
								a.waitingForPresent_ || s.isIOS() || (s.exitFullscreen(), i(new Error("Unable to present.")))
							})
						},
						n.prototype.exitPresent = function () {
							var e = this.isPresenting,
							t = this;
							return this.isPresenting = !1,
							this.layer_ = null,
							this.wakelock_.release(),
							new Promise(function (a, n) {
								e ? (!s.exitFullscreen() && s.isIOS() && (t.endPresent_(), t.fireVRDisplayPresentChange_()), a()) : n(new Error("Was not presenting to VRDisplay."))
							})
						},
						n.prototype.getLayers = function () {
							return this.layer_ ? [this.layer_] : []
						},
						n.prototype.fireVRDisplayPresentChange_ = function () {
							var e = new CustomEvent("vrdisplaypresentchange", {
									detail: {
										vrdisplay: this
									}
								});
							window.dispatchEvent(e)
						},
						n.prototype.addFullscreenListeners_ = function (e, t, a) {
							this.removeFullscreenListeners_(),
							this.fullscreenEventTarget_ = e,
							this.fullscreenChangeHandler_ = t,
							this.fullscreenErrorHandler_ = a,
							t && (e.addEventListener("fullscreenchange", t, !1), e.addEventListener("webkitfullscreenchange", t, !1), document.addEventListener("mozfullscreenchange", t, !1), e.addEventListener("msfullscreenchange", t, !1)),
							a && (e.addEventListener("fullscreenerror", a, !1), e.addEventListener("webkitfullscreenerror", a, !1), document.addEventListener("mozfullscreenerror", a, !1), e.addEventListener("msfullscreenerror", a, !1))
						},
						n.prototype.removeFullscreenListeners_ = function () {
							if (this.fullscreenEventTarget_) {
								var e = this.fullscreenEventTarget_;
								if (this.fullscreenChangeHandler_) {
									var t = this.fullscreenChangeHandler_;
									e.removeEventListener("fullscreenchange", t, !1),
									e.removeEventListener("webkitfullscreenchange", t, !1),
									document.removeEventListener("mozfullscreenchange", t, !1),
									e.removeEventListener("msfullscreenchange", t, !1)
								}
								if (this.fullscreenErrorHandler_) {
									var a = this.fullscreenErrorHandler_;
									e.removeEventListener("fullscreenerror", a, !1),
									e.removeEventListener("webkitfullscreenerror", a, !1),
									document.removeEventListener("mozfullscreenerror", a, !1),
									e.removeEventListener("msfullscreenerror", a, !1)
								}
								this.fullscreenEventTarget_ = null,
								this.fullscreenChangeHandler_ = null,
								this.fullscreenErrorHandler_ = null
							}
						},
						n.prototype.beginPresent_ = function () {},
						n.prototype.endPresent_ = function () {},
						n.prototype.submitFrame = function (e) {},
						n.prototype.getEyeParameters = function (e) {
							return null
						},
						r.prototype = new i,
						o.prototype = new i,
						t.exports.VRDisplay = n,
						t.exports.VRDevice = i,
						t.exports.HMDVRDevice = r,
						t.exports.PositionSensorVRDevice = o
					}, {
						"./util.js": 22,
						"./wakelock.js": 24
					}
				],
				3: [function (e, t, a) {
						function n(e) {
							this.gl = e,
							this.ctxAttribs = e.getContextAttributes(),
							this.meshWidth = 20,
							this.meshHeight = 20,
							this.bufferScale = WebVRConfig.BUFFER_SCALE,
							this.bufferWidth = e.drawingBufferWidth,
							this.bufferHeight = e.drawingBufferHeight,
							this.realBindFramebuffer = e.bindFramebuffer,
							this.realEnable = e.enable,
							this.realDisable = e.disable,
							this.realColorMask = e.colorMask,
							this.realClearColor = e.clearColor,
							this.realViewport = e.viewport,
							r.isIOS() || (this.realCanvasWidth = Object.getOwnPropertyDescriptor(e.canvas.__proto__, "width"), this.realCanvasHeight = Object.getOwnPropertyDescriptor(e.canvas.__proto__, "height")),
							this.isPatched = !1,
							this.lastBoundFramebuffer = null,
							this.cullFace = !1,
							this.depthTest = !1,
							this.blend = !1,
							this.scissorTest = !1,
							this.stencilTest = !1,
							this.viewport = [0, 0, 0, 0],
							this.colorMask = [!0, !0, !0, !0],
							this.clearColor = [0, 0, 0, 0],
							this.attribs = {
								position: 0,
								texCoord: 1
							},
							this.program = r.linkProgram(e, s, c, this.attribs),
							this.uniforms = r.getProgramUniforms(e, this.program),
							this.viewportOffsetScale = new Float32Array(8),
							this.setTextureBounds(),
							this.vertexBuffer = e.createBuffer(),
							this.indexBuffer = e.createBuffer(),
							this.indexCount = 0,
							this.renderTarget = e.createTexture(),
							this.framebuffer = e.createFramebuffer(),
							this.depthStencilBuffer = null,
							this.depthBuffer = null,
							this.stencilBuffer = null,
							this.ctxAttribs.depth && this.ctxAttribs.stencil ? this.depthStencilBuffer = e.createRenderbuffer() : this.ctxAttribs.depth ? this.depthBuffer = e.createRenderbuffer() : this.ctxAttribs.stencil && (this.stencilBuffer = e.createRenderbuffer()),
							this.patch(),
							this.onResize(),
							WebVRConfig.CARDBOARD_UI_DISABLED || (this.cardboardUI = new i(e))
						}
						var i = e("./cardboard-ui.js"),
						r = e("./util.js"),
						o = e("./deps/wglu-preserve-state.js"),
						s = ["attribute vec2 position;", "attribute vec3 texCoord;", "varying vec2 vTexCoord;", "uniform vec4 viewportOffsetScale[2];", "void main() {", "  vec4 viewport = viewportOffsetScale[int(texCoord.z)];", "  vTexCoord = (texCoord.xy * viewport.zw) + viewport.xy;", "  gl_Position = vec4( position, 1.0, 1.0 );", "}"].join("\n"),
						c = ["precision mediump float;", "uniform sampler2D diffuse;", "varying vec2 vTexCoord;", "void main() {", "  gl_FragColor = texture2D(diffuse, vTexCoord);", "}"].join("\n");
						n.prototype.destroy = function () {
							var e = this.gl;
							this.unpatch(),
							e.deleteProgram(this.program),
							e.deleteBuffer(this.vertexBuffer),
							e.deleteBuffer(this.indexBuffer),
							e.deleteTexture(this.renderTarget),
							e.deleteFramebuffer(this.framebuffer),
							this.depthStencilBuffer && e.deleteRenderbuffer(this.depthStencilBuffer),
							this.depthBuffer && e.deleteRenderbuffer(this.depthBuffer),
							this.stencilBuffer && e.deleteRenderbuffer(this.stencilBuffer),
							this.cardboardUI && this.cardboardUI.destroy()
						},
						n.prototype.onResize = function () {
							var e = this.gl,
							t = this,
							a = [e.RENDERBUFFER_BINDING, e.TEXTURE_BINDING_2D, e.TEXTURE0];
							o(e, a, function (e) {
								t.realBindFramebuffer.call(e, e.FRAMEBUFFER, null),
								t.scissorTest && t.realDisable.call(e, e.SCISSOR_TEST),
								t.realColorMask.call(e, !0, !0, !0, !0),
								t.realViewport.call(e, 0, 0, e.drawingBufferWidth, e.drawingBufferHeight),
								t.realClearColor.call(e, 0, 0, 0, 1),
								e.clear(e.COLOR_BUFFER_BIT),
								t.realBindFramebuffer.call(e, e.FRAMEBUFFER, t.framebuffer),
								e.bindTexture(e.TEXTURE_2D, t.renderTarget),
								e.texImage2D(e.TEXTURE_2D, 0, t.ctxAttribs.alpha ? e.RGBA : e.RGB, t.bufferWidth, t.bufferHeight, 0, t.ctxAttribs.alpha ? e.RGBA : e.RGB, e.UNSIGNED_BYTE, null),
								e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
								e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
								e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
								e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
								e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.renderTarget, 0),
								t.ctxAttribs.depth && t.ctxAttribs.stencil ? (e.bindRenderbuffer(e.RENDERBUFFER, t.depthStencilBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.bufferWidth, t.bufferHeight), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, t.depthStencilBuffer)) : t.ctxAttribs.depth ? (e.bindRenderbuffer(e.RENDERBUFFER, t.depthBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, t.bufferWidth, t.bufferHeight), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, t.depthBuffer)) : t.ctxAttribs.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, t.stencilBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.STENCIL_INDEX8, t.bufferWidth, t.bufferHeight),
									e.framebufferRenderbuffer(e.FRAMEBUFFER, e.STENCIL_ATTACHMENT, e.RENDERBUFFER, t.stencilBuffer)),
								!e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE && console.error("Framebuffer incomplete!"),
								t.realBindFramebuffer.call(e, e.FRAMEBUFFER, t.lastBoundFramebuffer),
								t.scissorTest && t.realEnable.call(e, e.SCISSOR_TEST),
								t.realColorMask.apply(e, t.colorMask),
								t.realViewport.apply(e, t.viewport),
								t.realClearColor.apply(e, t.clearColor)
							}),
							this.cardboardUI && this.cardboardUI.onResize()
						},
						n.prototype.patch = function () {
							if (!this.isPatched) {
								var e = this,
								t = this.gl.canvas,
								a = this.gl;
								r.isIOS() || (t.width = r.getScreenWidth() * this.bufferScale, t.height = r.getScreenHeight() * this.bufferScale, Object.defineProperty(t, "width", {
										configurable: !0,
										enumerable: !0,
										get: function () {
											return e.bufferWidth
										},
										set: function (t) {
											e.bufferWidth = t,
											e.onResize()
										}
									}), Object.defineProperty(t, "height", {
										configurable: !0,
										enumerable: !0,
										get: function () {
											return e.bufferHeight
										},
										set: function (t) {
											e.bufferHeight = t,
											e.onResize()
										}
									})),
								this.lastBoundFramebuffer = a.getParameter(a.FRAMEBUFFER_BINDING),
								null == this.lastBoundFramebuffer && (this.lastBoundFramebuffer = this.framebuffer, this.gl.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer)),
								this.gl.bindFramebuffer = function (t, n) {
									e.lastBoundFramebuffer = n ? n : e.framebuffer,
									e.realBindFramebuffer.call(a, t, e.lastBoundFramebuffer)
								},
								this.cullFace = a.getParameter(a.CULL_FACE),
								this.depthTest = a.getParameter(a.DEPTH_TEST),
								this.blend = a.getParameter(a.BLEND),
								this.scissorTest = a.getParameter(a.SCISSOR_TEST),
								this.stencilTest = a.getParameter(a.STENCIL_TEST),
								a.enable = function (t) {
									switch (t) {
									case a.CULL_FACE:
										e.cullFace = !0;
										break;
									case a.DEPTH_TEST:
										e.depthTest = !0;
										break;
									case a.BLEND:
										e.blend = !0;
										break;
									case a.SCISSOR_TEST:
										e.scissorTest = !0;
										break;
									case a.STENCIL_TEST:
										e.stencilTest = !0
									}
									e.realEnable.call(a, t)
								},
								a.disable = function (t) {
									switch (t) {
									case a.CULL_FACE:
										e.cullFace = !1;
										break;
									case a.DEPTH_TEST:
										e.depthTest = !1;
										break;
									case a.BLEND:
										e.blend = !1;
										break;
									case a.SCISSOR_TEST:
										e.scissorTest = !1;
										break;
									case a.STENCIL_TEST:
										e.stencilTest = !1
									}
									e.realDisable.call(a, t)
								},
								this.colorMask = a.getParameter(a.COLOR_WRITEMASK),
								a.colorMask = function (t, n, i, r) {
									e.colorMask[0] = t,
									e.colorMask[1] = n,
									e.colorMask[2] = i,
									e.colorMask[3] = r,
									e.realColorMask.call(a, t, n, i, r)
								},
								this.clearColor = a.getParameter(a.COLOR_CLEAR_VALUE),
								a.clearColor = function (t, n, i, r) {
									e.clearColor[0] = t,
									e.clearColor[1] = n,
									e.clearColor[2] = i,
									e.clearColor[3] = r,
									e.realClearColor.call(a, t, n, i, r)
								},
								this.viewport = a.getParameter(a.VIEWPORT),
								a.viewport = function (t, n, i, r) {
									e.viewport[0] = t,
									e.viewport[1] = n,
									e.viewport[2] = i,
									e.viewport[3] = r,
									e.realViewport.call(a, t, n, i, r)
								},
								this.isPatched = !0,
								r.safariCssSizeWorkaround(t)
							}
						},
						n.prototype.unpatch = function () {
							if (this.isPatched) {
								var e = this.gl,
								t = this.gl.canvas;
								r.isIOS() || (Object.defineProperty(t, "width", this.realCanvasWidth), Object.defineProperty(t, "height", this.realCanvasHeight)),
								t.width = this.bufferWidth,
								t.height = this.bufferHeight,
								e.bindFramebuffer = this.realBindFramebuffer,
								e.enable = this.realEnable,
								e.disable = this.realDisable,
								e.colorMask = this.realColorMask,
								e.clearColor = this.realClearColor,
								e.viewport = this.realViewport,
								this.lastBoundFramebuffer == this.framebuffer && e.bindFramebuffer(e.FRAMEBUFFER, null),
								this.isPatched = !1,
								setTimeout(function () {
									r.safariCssSizeWorkaround(t)
								}, 1)
							}
						},
						n.prototype.setTextureBounds = function (e, t) {
							e || (e = [0, 0, .5, 1]),
							t || (t = [.5, 0, .5, 1]),
							this.viewportOffsetScale[0] = e[0],
							this.viewportOffsetScale[1] = e[1],
							this.viewportOffsetScale[2] = e[2],
							this.viewportOffsetScale[3] = e[3],
							this.viewportOffsetScale[4] = t[0],
							this.viewportOffsetScale[5] = t[1],
							this.viewportOffsetScale[6] = t[2],
							this.viewportOffsetScale[7] = t[3]
						},
						n.prototype.submitFrame = function () {
							var e = this.gl,
							t = this,
							a = [];
							if (WebVRConfig.DIRTY_SUBMIT_FRAME_BINDINGS || a.push(e.CURRENT_PROGRAM, e.ARRAY_BUFFER_BINDING, e.ELEMENT_ARRAY_BUFFER_BINDING, e.TEXTURE_BINDING_2D, e.TEXTURE0), o(e, a, function (e) {
									t.realBindFramebuffer.call(e, e.FRAMEBUFFER, null),
									t.cullFace && t.realDisable.call(e, e.CULL_FACE),
									t.depthTest && t.realDisable.call(e, e.DEPTH_TEST),
									t.blend && t.realDisable.call(e, e.BLEND),
									t.scissorTest && t.realDisable.call(e, e.SCISSOR_TEST),
									t.stencilTest && t.realDisable.call(e, e.STENCIL_TEST),
									t.realColorMask.call(e, !0, !0, !0, !0),
									t.realViewport.call(e, 0, 0, e.drawingBufferWidth, e.drawingBufferHeight),
									(t.ctxAttribs.alpha || r.isIOS()) && (t.realClearColor.call(e, 0, 0, 0, 1), e.clear(e.COLOR_BUFFER_BIT)),
									e.useProgram(t.program),
									e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.indexBuffer),
									e.bindBuffer(e.ARRAY_BUFFER, t.vertexBuffer),
									e.enableVertexAttribArray(t.attribs.position),
									e.enableVertexAttribArray(t.attribs.texCoord),
									e.vertexAttribPointer(t.attribs.position, 2, e.FLOAT, !1, 20, 0),
									e.vertexAttribPointer(t.attribs.texCoord, 3, e.FLOAT, !1, 20, 8),
									e.activeTexture(e.TEXTURE0),
									e.uniform1i(t.uniforms.diffuse, 0),
									e.bindTexture(e.TEXTURE_2D, t.renderTarget),
									e.uniform4fv(t.uniforms.viewportOffsetScale, t.viewportOffsetScale),
									e.drawElements(e.TRIANGLES, t.indexCount, e.UNSIGNED_SHORT, 0),
									t.cardboardUI && t.cardboardUI.renderNoState(),
									t.realBindFramebuffer.call(t.gl, e.FRAMEBUFFER, t.framebuffer),
									t.ctxAttribs.preserveDrawingBuffer || (t.realClearColor.call(e, 0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT)),
									WebVRConfig.DIRTY_SUBMIT_FRAME_BINDINGS || t.realBindFramebuffer.call(e, e.FRAMEBUFFER, t.lastBoundFramebuffer),
									t.cullFace && t.realEnable.call(e, e.CULL_FACE),
									t.depthTest && t.realEnable.call(e, e.DEPTH_TEST),
									t.blend && t.realEnable.call(e, e.BLEND),
									t.scissorTest && t.realEnable.call(e, e.SCISSOR_TEST),
									t.stencilTest && t.realEnable.call(e, e.STENCIL_TEST),
									t.realColorMask.apply(e, t.colorMask),
									t.realViewport.apply(e, t.viewport),
									!t.ctxAttribs.alpha && t.ctxAttribs.preserveDrawingBuffer || t.realClearColor.apply(e, t.clearColor)
								}), r.isIOS()) {
								var n = e.canvas;
								n.width == t.bufferWidth && n.height == t.bufferHeight || (t.bufferWidth = n.width, t.bufferHeight = n.height, t.onResize())
							}
						},
						n.prototype.updateDeviceInfo = function (e) {
							var t = this.gl,
							a = this,
							n = [t.ARRAY_BUFFER_BINDING, t.ELEMENT_ARRAY_BUFFER_BINDING];
							o(t, n, function (t) {
								var n = a.computeMeshVertices_(a.meshWidth, a.meshHeight, e);
								if (t.bindBuffer(t.ARRAY_BUFFER, a.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, n, t.STATIC_DRAW), !a.indexCount) {
									var i = a.computeMeshIndices_(a.meshWidth, a.meshHeight);
									t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, a.indexBuffer),
									t.bufferData(t.ELEMENT_ARRAY_BUFFER, i, t.STATIC_DRAW),
									a.indexCount = i.length
								}
							})
						},
						n.prototype.computeMeshVertices_ = function (e, t, a) {
							for (var n = new Float32Array(2 * e * t * 5), i = a.getLeftEyeVisibleTanAngles(), o = a.getLeftEyeNoLensTanAngles(), s = a.getLeftEyeVisibleScreenRect(o), c = 0, l = 0; l < 2; l++) {
								for (var u = 0; u < t; u++)
									for (var d = 0; d < e; d++, c++) {
										var M = d / (e - 1),
										g = u / (t - 1),
										p = M,
										m = g,
										A = r.lerp(i[0], i[2], M),
										f = r.lerp(i[3], i[1], g),
										D = Math.sqrt(A * A + f * f),
										N = a.distortion.distortInverse(D),
										h = A * N / D,
										v = f * N / D;
										M = (h - o[0]) / (o[2] - o[0]),
										g = (v - o[3]) / (o[1] - o[3]);
										a.device.widthMeters / a.device.heightMeters;
										M = 2 * (s.x + M * s.width - .5),
										g = 2 * (s.y + g * s.height - .5),
										n[5 * c + 0] = M,
										n[5 * c + 1] = g,
										n[5 * c + 2] = p,
										n[5 * c + 3] = m,
										n[5 * c + 4] = l
									}
								var T = i[2] - i[0];
								i[0] =  - (T + i[0]),
								i[2] = T - i[2],
								T = o[2] - o[0],
								o[0] =  - (T + o[0]),
								o[2] = T - o[2],
								s.x = 1 - (s.x + s.width)
							}
							return n
						},
						n.prototype.computeMeshIndices_ = function (e, t) {
							for (var a = new Uint16Array(2 * (e - 1) * (t - 1) * 6), n = e / 2, i = t / 2, r = 0, o = 0, s = 0; s < 2; s++)
								for (var c = 0; c < t; c++)
									for (var l = 0; l < e; l++, r++)
										0 != l && 0 != c && (l <= n == c <= i ? (a[o++] = r, a[o++] = r - e - 1, a[o++] = r - e, a[o++] = r - e - 1, a[o++] = r, a[o++] = r - 1) : (a[o++] = r - 1, a[o++] = r - e, a[o++] = r, a[o++] = r - e, a[o++] = r - 1, a[o++] = r - e - 1));
							return a
						},
						n.prototype.getOwnPropertyDescriptor_ = function (e, t) {
							var a = Object.getOwnPropertyDescriptor(e, t);
							return void 0 !== a.get && void 0 !== a.set || (a.configurable = !0, a.enumerable = !0, a.get = function () {
								return this.getAttribute(t)
							}, a.set = function (e) {
								this.setAttribute(t, e)
							}),
							a
						},
						t.exports = n
					}, {
						"./cardboard-ui.js": 4,
						"./deps/wglu-preserve-state.js": 6,
						"./util.js": 22
					}
				],
				4: [function (e, t, a) {
						function n(e) {
							this.gl = e,
							this.attribs = {
								position: 0
							},
							this.program = i.linkProgram(e, o, s, this.attribs),
							this.uniforms = i.getProgramUniforms(e, this.program),
							this.vertexBuffer = e.createBuffer(),
							this.gearOffset = 0,
							this.gearVertexCount = 0,
							this.arrowOffset = 0,
							this.arrowVertexCount = 0,
							this.projMat = new Float32Array(16),
							this.listener = null,
							this.onResize()
						}
						var i = e("./util.js"),
						r = e("./deps/wglu-preserve-state.js"),
						o = ["attribute vec2 position;", "uniform mat4 projectionMat;", "void main() {", "  gl_Position = projectionMat * vec4( position, -1.0, 1.0 );", "}"].join("\n"),
						s = ["precision mediump float;", "uniform vec4 color;", "void main() {", "  gl_FragColor = color;", "}"].join("\n"),
						c = Math.PI / 180,
						l = 60,
						u = 12,
						d = 20,
						M = 1,
						g = .75,
						p = .3125,
						m = 4,
						A = 28,
						f = 1.5;
						n.prototype.destroy = function () {
							var e = this.gl;
							this.listener && e.canvas.removeEventListener("click", this.listener, !1),
							e.deleteProgram(this.program),
							e.deleteBuffer(this.vertexBuffer)
						},
						n.prototype.listen = function (e, t) {
							var a = this.gl.canvas;
							this.listener = function (n) {
								var i = a.clientWidth / 2,
								r = A * f;
								n.clientX > i - r && n.clientX < i + r && n.clientY > a.clientHeight - r ? e(n) : n.clientX < r && n.clientY < r && t(n)
							},
							a.addEventListener("click", this.listener, !1)
						},
						n.prototype.onResize = function () {
							var e = this.gl,
							t = this,
							a = [e.ARRAY_BUFFER_BINDING];
							r(e, a, function (e) {
								function a(e, t) {
									var a = (90 - e) * c,
									n = Math.cos(a),
									i = Math.sin(a);
									r.push(p * n * h + o, p * i * h + h),
									r.push(t * n * h + o, t * i * h + h)
								}
								function n(t, a) {
									r.push(v + t, e.drawingBufferHeight - v - a)
								}
								var r = [],
								o = e.drawingBufferWidth / 2,
								s = e.drawingBufferWidth / (screen.width * window.devicePixelRatio);
								i.isIOS() || (s *= window.devicePixelRatio);
								var D = m * s / 2,
								N = A * f * s,
								h = A * s / 2,
								v = (A * f - A) * s;
								r.push(o - D, N),
								r.push(o - D, e.drawingBufferHeight),
								r.push(o + D, N),
								r.push(o + D, e.drawingBufferHeight),
								t.gearOffset = r.length / 2;
								for (var T = 0; T <= 6; T++) {
									var L = T * l;
									a(L, M),
									a(L + u, M),
									a(L + d, g),
									a(L + (l - d), g),
									a(L + (l - u), M)
								}
								t.gearVertexCount = r.length / 2 - t.gearOffset,
								t.arrowOffset = r.length / 2;
								var y = D / Math.sin(45 * c);
								n(0, h),
								n(h, 0),
								n(h + y, y),
								n(y, h + y),
								n(y, h - y),
								n(0, h),
								n(h, 2 * h),
								n(h + y, 2 * h - y),
								n(y, h - y),
								n(0, h),
								n(y, h - D),
								n(A * s, h - D),
								n(y, h + D),
								n(A * s, h + D),
								t.arrowVertexCount = r.length / 2 - t.arrowOffset,
								e.bindBuffer(e.ARRAY_BUFFER, t.vertexBuffer),
								e.bufferData(e.ARRAY_BUFFER, new Float32Array(r), e.STATIC_DRAW)
							})
						},
						n.prototype.render = function () {
							var e = this.gl,
							t = this,
							a = [e.CULL_FACE, e.DEPTH_TEST, e.BLEND, e.SCISSOR_TEST, e.STENCIL_TEST, e.COLOR_WRITEMASK, e.VIEWPORT, e.CURRENT_PROGRAM, e.ARRAY_BUFFER_BINDING];
							r(e, a, function (e) {
								e.disable(e.CULL_FACE),
								e.disable(e.DEPTH_TEST),
								e.disable(e.BLEND),
								e.disable(e.SCISSOR_TEST),
								e.disable(e.STENCIL_TEST),
								e.colorMask(!0, !0, !0, !0),
								e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight),
								t.renderNoState()
							})
						},
						n.prototype.renderNoState = function () {
							var e = this.gl;
							e.useProgram(this.program),
							e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
							e.enableVertexAttribArray(this.attribs.position),
							e.vertexAttribPointer(this.attribs.position, 2, e.FLOAT, !1, 8, 0),
							e.uniform4f(this.uniforms.color, 1, 1, 1, 1),
							i.orthoMatrix(this.projMat, 0, e.drawingBufferWidth, 0, e.drawingBufferHeight, .1, 1024),
							e.uniformMatrix4fv(this.uniforms.projectionMat, !1, this.projMat),
							e.drawArrays(e.TRIANGLE_STRIP, 0, 4),
							e.drawArrays(e.TRIANGLE_STRIP, this.gearOffset, this.gearVertexCount),
							e.drawArrays(e.TRIANGLE_STRIP, this.arrowOffset, this.arrowVertexCount)
						},
						t.exports = n
					}, {
						"./deps/wglu-preserve-state.js": 6,
						"./util.js": 22
					}
				],
				5: [function (e, t, a) {
						function n() {
							this.displayName = "Cardboard VRDisplay (webvr-polyfill)",
							this.capabilities.hasOrientation = !0,
							this.capabilities.canPresent = !0,
							this.bufferScale_ = WebVRConfig.BUFFER_SCALE,
							this.poseSensor_ = new c,
							this.distorter_ = null,
							this.cardboardUI_ = null,
							this.dpdb_ = new s((!0), this.onDeviceParamsUpdated_.bind(this)),
							this.deviceInfo_ = new o(this.dpdb_.getDeviceParams()),
							this.viewerSelector_ = new u,
							this.viewerSelector_.on("change", this.onViewerChanged_.bind(this)),
							this.deviceInfo_.setViewer(this.viewerSelector_.getCurrentViewer()),
							WebVRConfig.ROTATE_INSTRUCTIONS_DISABLED || (this.rotateInstructions_ = new l),
							M.isIOS() && window.addEventListener("resize", this.onResize_.bind(this))
						}
						var i = e("./cardboard-distorter.js"),
						r = e("./cardboard-ui.js"),
						o = e("./device-info.js"),
						s = e("./dpdb/dpdb.js"),
						c = e("./sensor-fusion/fusion-pose-sensor.js"),
						l = e("./rotate-instructions.js"),
						u = e("./viewer-selector.js"),
						d = e("./base.js").VRDisplay,
						M = e("./util.js"),
						g = {
							LEFT: "left",
							RIGHT: "right"
						};
						n.prototype = new d,
						n.prototype.getImmediatePose = function () {
							return {
								position: this.poseSensor_.getPosition(),
								orientation: this.poseSensor_.getOrientation(),
								linearVelocity: null,
								linearAcceleration: null,
								angularVelocity: null,
								angularAcceleration: null
							}
						},
						n.prototype.resetPose = function () {
							this.poseSensor_.resetPose()
						},
						n.prototype.getEyeParameters = function (e) {
							var t,
							a = [.5 * this.deviceInfo_.viewer.interLensDistance, 0, 0];
							if (e == g.LEFT)
								a[0] *= -1, t = this.deviceInfo_.getFieldOfViewLeftEye();
							else {
								if (e != g.RIGHT)
									return console.error("Invalid eye provided: %s", e), null;
								t = this.deviceInfo_.getFieldOfViewRightEye()
							}
							return {
								fieldOfView: t,
								offset: a,
								renderWidth: .5 * this.deviceInfo_.device.width * this.bufferScale_,
								renderHeight: this.deviceInfo_.device.height * this.bufferScale_
							}
						},
						n.prototype.onDeviceParamsUpdated_ = function (e) {
							console.log("DPDB reported that device params were updated."),
							this.deviceInfo_.updateDeviceParams(e),
							this.distorter_ && this.distorter.updateDeviceInfo(this.deviceInfo_)
						},
						n.prototype.updateBounds_ = function () {
							this.layer_ && this.distorter_ && (this.layer_.leftBounds || this.layer_.rightBounds) && this.distorter_.setTextureBounds(this.layer_.leftBounds, this.layer_.rightBounds)
						},
						n.prototype.beginPresent_ = function () {
							var e = this.layer_.source.getContext("webgl");
							e || (e = this.layer_.source.getContext("experimental-webgl")),
							e || (e = this.layer_.source.getContext("webgl2")),
							e && (this.layer_.predistorted ? WebVRConfig.CARDBOARD_UI_DISABLED || (e.canvas.width = M.getScreenWidth() * this.bufferScale_, e.canvas.height = M.getScreenHeight() * this.bufferScale_, this.cardboardUI_ = new r(e)) : (this.distorter_ = new i(e), this.distorter_.updateDeviceInfo(this.deviceInfo_), this.cardboardUI_ = this.distorter_.cardboardUI), this.cardboardUI_ && this.cardboardUI_.listen(function (e) {
									this.viewerSelector_.show(this.layer_.source.parentElement),
									e.stopPropagation(),
									e.preventDefault()
								}
									.bind(this), function (e) {
									this.exitPresent(),
									e.stopPropagation(),
									e.preventDefault()
								}
									.bind(this)), this.rotateInstructions_ && (M.isLandscapeMode() && M.isMobile() ? this.rotateInstructions_.showTemporarily(3e3, this.layer_.source.parentElement) : this.rotateInstructions_.update()), this.orientationHandler = this.onOrientationChange_.bind(this), window.addEventListener("orientationchange", this.orientationHandler), this.vrdisplaypresentchangeHandler = this.updateBounds_.bind(this), window.addEventListener("vrdisplaypresentchange", this.vrdisplaypresentchangeHandler), this.fireVRDisplayDeviceParamsChange_())
						},
						n.prototype.endPresent_ = function () {
							this.distorter_ && (this.distorter_.destroy(), this.distorter_ = null),
							this.cardboardUI_ && (this.cardboardUI_.destroy(), this.cardboardUI_ = null),
							this.rotateInstructions_ && this.rotateInstructions_.hide(),
							this.viewerSelector_.hide(),
							window.removeEventListener("orientationchange", this.orientationHandler),
							window.removeEventListener("vrdisplaypresentchange", this.vrdisplaypresentchangeHandler)
						},
						n.prototype.submitFrame = function (e) {
							if (this.distorter_)
								this.distorter_.submitFrame();
							else if (this.cardboardUI_ && this.layer_) {
								var t = this.layer_.source.getContext("webgl").canvas;
								t.width == this.lastWidth && t.height == this.lastHeight || this.cardboardUI_.onResize(),
								this.lastWidth = t.width,
								this.lastHeight = t.height,
								this.cardboardUI_.render()
							}
						},
						n.prototype.onOrientationChange_ = function (e) {
							console.log("onOrientationChange_"),
							this.viewerSelector_.hide(),
							this.rotateInstructions_ && this.rotateInstructions_.update(),
							this.onResize_()
						},
						n.prototype.onResize_ = function (e) {
							if (this.layer_) {
								var t = this.layer_.source.getContext("webgl"),
								a = ["position: absolute", "top: 0", "left: 0", "width: " + Math.max(screen.width, screen.height) + "px", "height: " + Math.min(screen.height, screen.width) + "px", "border: 0", "margin: 0", "padding: 0 10px 10px 0"];
								t.canvas.setAttribute("style", a.join("; ") + ";"),
								M.safariCssSizeWorkaround(t.canvas)
							}
						},
						n.prototype.onViewerChanged_ = function (e) {
							this.deviceInfo_.setViewer(e),
							this.distorter_ && this.distorter_.updateDeviceInfo(this.deviceInfo_),
							this.fireVRDisplayDeviceParamsChange_()
						},
						n.prototype.fireVRDisplayDeviceParamsChange_ = function () {
							var e = new CustomEvent("vrdisplaydeviceparamschange", {
									detail: {
										vrdisplay: this,
										deviceInfo: this.deviceInfo_
									}
								});
							window.dispatchEvent(e)
						},
						t.exports = n
					}, {
						"./base.js": 2,
						"./cardboard-distorter.js": 3,
						"./cardboard-ui.js": 4,
						"./device-info.js": 7,
						"./dpdb/dpdb.js": 11,
						"./rotate-instructions.js": 16,
						"./sensor-fusion/fusion-pose-sensor.js": 18,
						"./util.js": 22,
						"./viewer-selector.js": 23
					}
				],
				6: [function (e, t, a) {
						function n(e, t, a) {
							if (!t)
								return void a(e);
							for (var n = [], i = null, r = 0; r < t.length; ++r) {
								var o = t[r];
								switch (o) {
								case e.TEXTURE_BINDING_2D:
								case e.TEXTURE_BINDING_CUBE_MAP:
									var s = t[++r];
									if (s < e.TEXTURE0 || s > e.TEXTURE31) {
										console.error("TEXTURE_BINDING_2D or TEXTURE_BINDING_CUBE_MAP must be followed by a valid texture unit"),
										n.push(null, null);
										break
									}
									i || (i = e.getParameter(e.ACTIVE_TEXTURE)),
									e.activeTexture(s),
									n.push(e.getParameter(o), null);
									break;
								case e.ACTIVE_TEXTURE:
									i = e.getParameter(e.ACTIVE_TEXTURE),
									n.push(null);
									break;
								default:
									n.push(e.getParameter(o))
								}
							}
							a(e);
							for (var r = 0; r < t.length; ++r) {
								var o = t[r],
								c = n[r];
								switch (o) {
								case e.ACTIVE_TEXTURE:
									break;
								case e.ARRAY_BUFFER_BINDING:
									e.bindBuffer(e.ARRAY_BUFFER, c);
									break;
								case e.COLOR_CLEAR_VALUE:
									e.clearColor(c[0], c[1], c[2], c[3]);
									break;
								case e.COLOR_WRITEMASK:
									e.colorMask(c[0], c[1], c[2], c[3]);
									break;
								case e.CURRENT_PROGRAM:
									e.useProgram(c);
									break;
								case e.ELEMENT_ARRAY_BUFFER_BINDING:
									e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, c);
									break;
								case e.FRAMEBUFFER_BINDING:
									e.bindFramebuffer(e.FRAMEBUFFER, c);
									break;
								case e.RENDERBUFFER_BINDING:
									e.bindRenderbuffer(e.RENDERBUFFER, c);
									break;
								case e.TEXTURE_BINDING_2D:
									var s = t[++r];
									if (s < e.TEXTURE0 || s > e.TEXTURE31)
										break;
									e.activeTexture(s),
									e.bindTexture(e.TEXTURE_2D, c);
									break;
								case e.TEXTURE_BINDING_CUBE_MAP:
									var s = t[++r];
									if (s < e.TEXTURE0 || s > e.TEXTURE31)
										break;
									e.activeTexture(s),
									e.bindTexture(e.TEXTURE_CUBE_MAP, c);
									break;
								case e.VIEWPORT:
									e.viewport(c[0], c[1], c[2], c[3]);
									break;
								case e.BLEND:
								case e.CULL_FACE:
								case e.DEPTH_TEST:
								case e.SCISSOR_TEST:
								case e.STENCIL_TEST:
									c ? e.enable(o) : e.disable(o);
									break;
								default:
									console.log("No GL restore behavior for 0x" + o.toString(16))
								}
								i && e.activeTexture(i)
							}
						}
						t.exports = n
					}, {}
				],
				7: [function (e, t, a) {
						function n(e) {
							this.width = e.width || c.getScreenWidth(),
							this.height = e.height || c.getScreenHeight(),
							this.widthMeters = e.widthMeters,
							this.heightMeters = e.heightMeters,
							this.bevelMeters = e.bevelMeters
						}
						function i(e) {
							this.viewer = d.CardboardV2,
							this.updateDeviceParams(e),
							this.distortion = new o(this.viewer.distortionCoefficients)
						}
						function r(e) {
							this.id = e.id,
							this.label = e.label,
							this.fov = e.fov,
							this.interLensDistance = e.interLensDistance,
							this.baselineLensDistance = e.baselineLensDistance,
							this.screenLensDistance = e.screenLensDistance,
							this.distortionCoefficients = e.distortionCoefficients,
							this.inverseCoefficients = e.inverseCoefficients
						}
						var o = e("./distortion/distortion.js"),
						s = e("./math-util.js"),
						c = e("./util.js"),
						l = new n({
								widthMeters: .11,
								heightMeters: .062,
								bevelMeters: .004
							}),
						u = new n({
								widthMeters: .1038,
								heightMeters: .0584,
								bevelMeters: .004
							}),
						d = {
							CardboardV1: new r({
								id: "CardboardV1",
								label: "Cardboard I/O 2014",
								fov: 40,
								interLensDistance: .06,
								baselineLensDistance: .035,
								screenLensDistance: .042,
								distortionCoefficients: [.441, .156],
								inverseCoefficients: [ - .4410035, .42756155,  - .4804439, .5460139,  - .58821183, .5733938,  - .48303202, .33299083,  - .17573841, .0651772,  - .01488963, .001559834]
							}),
							CardboardV2: new r({
								id: "CardboardV2",
								label: "Cardboard I/O 2015",
								fov: 60,
								interLensDistance: .064,
								baselineLensDistance: .035,
								screenLensDistance: .039,
								distortionCoefficients: [.34, .55],
								inverseCoefficients: [ - .33836704,  - .18162185, .862655, -1.2462051, 1.0560602,  - .58208317, .21609078,  - .05444823, .009177956,  - .0009904169, 6183535e-11, -16981803e-13]
							})
						};
						i.prototype.updateDeviceParams = function (e) {
							this.device = this.determineDevice_(e) || this.device
						},
						i.prototype.getDevice = function () {
							return this.device
						},
						i.prototype.setViewer = function (e) {
							this.viewer = e,
							this.distortion = new o(this.viewer.distortionCoefficients)
						},
						i.prototype.determineDevice_ = function (e) {
							if (!e)
								return c.isIOS() ? (console.warn("Using fallback iOS device measurements."), u) : (console.warn("Using fallback Android device measurements."), l);
							var t = .0254,
							a = t / e.xdpi,
							i = t / e.ydpi,
							r = c.getScreenWidth(),
							o = c.getScreenHeight();
							return new n({
								widthMeters: a * r,
								heightMeters: i * o,
								bevelMeters: .001 * e.bevelMm
							})
						},
						i.prototype.getDistortedFieldOfViewLeftEye = function () {
							var e = this.viewer,
							t = this.device,
							a = this.distortion,
							n = e.screenLensDistance,
							i = (t.widthMeters - e.interLensDistance) / 2,
							r = e.interLensDistance / 2,
							o = e.baselineLensDistance - t.bevelMeters,
							c = t.heightMeters - o,
							l = s.radToDeg * Math.atan(a.distort(i / n)),
							u = s.radToDeg * Math.atan(a.distort(r / n)),
							d = s.radToDeg * Math.atan(a.distort(o / n)),
							M = s.radToDeg * Math.atan(a.distort(c / n));
							return {
								leftDegrees: Math.min(l, e.fov),
								rightDegrees: Math.min(u, e.fov),
								downDegrees: Math.min(d, e.fov),
								upDegrees: Math.min(M, e.fov)
							}
						},
						i.prototype.getLeftEyeVisibleTanAngles = function () {
							var e = this.viewer,
							t = this.device,
							a = this.distortion,
							n = Math.tan(-s.degToRad * e.fov),
							i = Math.tan(s.degToRad * e.fov),
							r = Math.tan(s.degToRad * e.fov),
							o = Math.tan(-s.degToRad * e.fov),
							c = t.widthMeters / 4,
							l = t.heightMeters / 2,
							u = e.baselineLensDistance - t.bevelMeters - l,
							d = e.interLensDistance / 2 - c,
							M = -u,
							g = e.screenLensDistance,
							p = a.distort((d - c) / g),
							m = a.distort((M + l) / g),
							A = a.distort((d + c) / g),
							f = a.distort((M - l) / g),
							D = new Float32Array(4);
							return D[0] = Math.max(n, p),
							D[1] = Math.min(i, m),
							D[2] = Math.min(r, A),
							D[3] = Math.max(o, f),
							D
						},
						i.prototype.getLeftEyeNoLensTanAngles = function () {
							var e = this.viewer,
							t = this.device,
							a = this.distortion,
							n = new Float32Array(4),
							i = a.distortInverse(Math.tan(-s.degToRad * e.fov)),
							r = a.distortInverse(Math.tan(s.degToRad * e.fov)),
							o = a.distortInverse(Math.tan(s.degToRad * e.fov)),
							c = a.distortInverse(Math.tan(-s.degToRad * e.fov)),
							l = t.widthMeters / 4,
							u = t.heightMeters / 2,
							d = e.baselineLensDistance - t.bevelMeters - u,
							M = e.interLensDistance / 2 - l,
							g = -d,
							p = e.screenLensDistance,
							m = (M - l) / p,
							A = (g + u) / p,
							f = (M + l) / p,
							D = (g - u) / p;
							return n[0] = Math.max(i, m),
							n[1] = Math.min(r, A),
							n[2] = Math.min(o, f),
							n[3] = Math.max(c, D),
							n
						},
						i.prototype.getLeftEyeVisibleScreenRect = function (e) {
							var t = this.viewer,
							a = this.device,
							n = t.screenLensDistance,
							i = (a.widthMeters - t.interLensDistance) / 2,
							r = t.baselineLensDistance - a.bevelMeters,
							o = (e[0] * n + i) / a.widthMeters,
							s = (e[1] * n + r) / a.heightMeters,
							c = (e[2] * n + i) / a.widthMeters,
							l = (e[3] * n + r) / a.heightMeters;
							return {
								x: o,
								y: l,
								width: c - o,
								height: s - l
							}
						},
						i.prototype.getFieldOfViewLeftEye = function (e) {
							return e ? this.getUndistortedFieldOfViewLeftEye() : this.getDistortedFieldOfViewLeftEye()
						},
						i.prototype.getFieldOfViewRightEye = function (e) {
							var t = this.getFieldOfViewLeftEye(e);
							return {
								leftDegrees: t.rightDegrees,
								rightDegrees: t.leftDegrees,
								upDegrees: t.upDegrees,
								downDegrees: t.downDegrees
							}
						},
						i.prototype.getUndistortedFieldOfViewLeftEye = function () {
							var e = this.getUndistortedParams_();
							return {
								leftDegrees: s.radToDeg * Math.atan(e.outerDist),
								rightDegrees: s.radToDeg * Math.atan(e.innerDist),
								downDegrees: s.radToDeg * Math.atan(e.bottomDist),
								upDegrees: s.radToDeg * Math.atan(e.topDist)
							}
						},
						i.prototype.getUndistortedViewportLeftEye = function () {
							var e = this.getUndistortedParams_(),
							t = this.viewer,
							a = this.device,
							n = t.screenLensDistance,
							i = a.widthMeters / n,
							r = a.heightMeters / n,
							o = a.width / i,
							s = a.height / r,
							c = Math.round((e.eyePosX - e.outerDist) * o),
							l = Math.round((e.eyePosY - e.bottomDist) * s);
							return {
								x: c,
								y: l,
								width: Math.round((e.eyePosX + e.innerDist) * o) - c,
								height: Math.round((e.eyePosY + e.topDist) * s) - l
							}
						},
						i.prototype.getUndistortedParams_ = function () {
							var e = this.viewer,
							t = this.device,
							a = this.distortion,
							n = e.screenLensDistance,
							i = e.interLensDistance / 2 / n,
							r = t.widthMeters / n,
							o = t.heightMeters / n,
							c = r / 2 - i,
							l = (e.baselineLensDistance - t.bevelMeters) / n,
							u = e.fov,
							d = a.distortInverse(Math.tan(s.degToRad * u)),
							M = Math.min(c, d),
							g = Math.min(i, d),
							p = Math.min(l, d),
							m = Math.min(o - l, d);
							return {
								outerDist: M,
								innerDist: g,
								topDist: m,
								bottomDist: p,
								eyePosX: c,
								eyePosY: l
							}
						},
						i.Viewers = d,
						t.exports = i
					}, {
						"./distortion/distortion.js": 9,
						"./math-util.js": 14,
						"./util.js": 22
					}
				],
				8: [function (e, t, a) {
						function n(e) {
							this.display = e,
							this.hardwareUnitId = e.displayId,
							this.deviceId = "webvr-polyfill:HMD:" + e.displayId,
							this.deviceName = e.displayName + " (HMD)"
						}
						function i(e) {
							this.display = e,
							this.hardwareUnitId = e.displayId,
							this.deviceId = "webvr-polyfill:PositionSensor: " + e.displayId,
							this.deviceName = e.displayName + " (PositionSensor)"
						}
						var r = (e("./base.js").VRDisplay, e("./base.js").HMDVRDevice),
						o = e("./base.js").PositionSensorVRDevice;
						n.prototype = new r,
						n.prototype.getEyeParameters = function (e) {
							var t = this.display.getEyeParameters(e);
							return {
								currentFieldOfView: t.fieldOfView,
								maximumFieldOfView: t.fieldOfView,
								minimumFieldOfView: t.fieldOfView,
								recommendedFieldOfView: t.fieldOfView,
								eyeTranslation: {
									x: t.offset[0],
									y: t.offset[1],
									z: t.offset[2]
								},
								renderRect: {
									x: "right" == e ? t.renderWidth : 0,
									y: 0,
									width: t.renderWidth,
									height: t.renderHeight
								}
							}
						},
						n.prototype.setFieldOfView = function (e, t, a, n) {},
						i.prototype = new o,
						i.prototype.getState = function () {
							var e = this.display.getPose();
							return {
								position: e.position ? {
									x: e.position[0],
									y: e.position[1],
									z: e.position[2]
								}
								 : null,
								orientation: e.orientation ? {
									x: e.orientation[0],
									y: e.orientation[1],
									z: e.orientation[2],
									w: e.orientation[3]
								}
								 : null,
								linearVelocity: null,
								linearAcceleration: null,
								angularVelocity: null,
								angularAcceleration: null
							}
						},
						i.prototype.resetState = function () {
							return this.positionDevice.resetPose()
						},
						t.exports.VRDisplayHMDDevice = n,
						t.exports.VRDisplayPositionSensorDevice = i
					}, {
						"./base.js": 2
					}
				],
				9: [function (e, t, a) {
						function n(e) {
							this.coefficients = e
						}
						n.prototype.distortInverse = function (e) {
							for (var t = 0, a = 1, n = e - this.distort(t); Math.abs(a - t) > 1e-4; ) {
								var i = e - this.distort(a),
								r = a - i * ((a - t) / (i - n));
								t = a,
								a = r,
								n = i
							}
							return a
						},
						n.prototype.distort = function (e) {
							for (var t = e * e, a = 0, n = 0; n < this.coefficients.length; n++)
								a = t * (a + this.coefficients[n]);
							return (a + 1) * e
						},
						n.prototype.solveLinear_ = function (e, t) {
							for (var a = e.length, n = 0; n < a - 1; ++n)
								for (var i = n + 1; i < a; ++i) {
									for (var r = e[n][i] / e[n][n], o = n + 1; o < a; ++o)
										e[o][i] -= r * e[o][n];
									t[i] -= r * t[n]
								}
							for (var s = new Array(a), n = a - 1; n >= 0; --n) {
								for (var c = t[n], o = n + 1; o < a; ++o)
									c -= e[o][n] * s[o];
								s[n] = c / e[n][n]
							}
							return s
						},
						n.prototype.solveLeastSquares_ = function (e, t) {
							var a,
							n,
							i,
							r,
							o = e.length,
							s = e[0].length;
							if (o != t.Length)
								throw new Error("Matrix / vector dimension mismatch");
							var c = new Array(s);
							for (i = 0; i < s; ++i)
								for (c[i] = new Array(s), n = 0; n < s; ++n) {
									for (r = 0, a = 0; a < o; ++a)
										r += e[n][a] * e[i][a];
									c[i][n] = r
								}
							var l = new Array(s);
							for (n = 0; n < s; ++n) {
								for (r = 0, a = 0; a < o; ++a)
									r += e[n][a] * t[a];
								l[n] = r
							}
							return this.solveLinear_(c, l)
						},
						n.prototype.approximateInverse = function (e, t) {
							e = e || 1,
							t = t || 100;
							var a,
							i,
							r = 6,
							o = new Array(r);
							for (i = 0; i < r; ++i)
								o[i] = new Array(t);
							var s = new Array(t);
							for (a = 0; a < t; ++a) {
								var c = e * (a + 1) / t,
								l = this.distort(c),
								u = l;
								for (i = 0; i < r; ++i)
									u *= l * l, o[i][a] = u;
								s[a] = c - l
							}
							var d = this.solveLeastSquares_(o, s);
							return new n(d)
						},
						t.exports = n
					}, {}
				],
				10: [function (e, t, a) {
						var n = {
							format: 1,
							last_updated: "2016-01-20T00:18:35Z",
							devices: [{
									type: "android",
									rules: [{
											mdmh: "asus/*/Nexus 7/*"
										}, {
											ua: "Nexus 7"
										}
									],
									dpi: [320.8, 323],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "asus/*/ASUS_Z00AD/*"
										}, {
											ua: "ASUS_Z00AD"
										}
									],
									dpi: [403, 404.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "HTC/*/HTC6435LVW/*"
										}, {
											ua: "HTC6435LVW"
										}
									],
									dpi: [449.7, 443.3],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "HTC/*/HTC One XL/*"
										}, {
											ua: "HTC One XL"
										}
									],
									dpi: [315.3, 314.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "htc/*/Nexus 9/*"
										}, {
											ua: "Nexus 9"
										}
									],
									dpi: 289,
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "HTC/*/HTC One M9/*"
										}, {
											ua: "HTC One M9"
										}
									],
									dpi: [442.5, 443.3],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "HTC/*/HTC One_M8/*"
										}, {
											ua: "HTC One_M8"
										}
									],
									dpi: [449.7, 447.4],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "HTC/*/HTC One/*"
										}, {
											ua: "HTC One"
										}
									],
									dpi: 472.8,
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Huawei/*/Nexus 6P/*"
										}, {
											ua: "Nexus 6P"
										}
									],
									dpi: [515.1, 518],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/Nexus 5X/*"
										}, {
											ua: "Nexus 5X"
										}
									],
									dpi: [422, 419.9],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/LGMS345/*"
										}, {
											ua: "LGMS345"
										}
									],
									dpi: [221.7, 219.1],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/LG-D800/*"
										}, {
											ua: "LG-D800"
										}
									],
									dpi: [422, 424.1],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/LG-D850/*"
										}, {
											ua: "LG-D850"
										}
									],
									dpi: [537.9, 541.9],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/VS985 4G/*"
										}, {
											ua: "VS985 4G"
										}
									],
									dpi: [537.9, 535.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/Nexus 5/*"
										}, {
											ua: "Nexus 5 "
										}
									],
									dpi: [442.4, 444.8],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/Nexus 4/*"
										}, {
											ua: "Nexus 4"
										}
									],
									dpi: [319.8, 318.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/LG-P769/*"
										}, {
											ua: "LG-P769"
										}
									],
									dpi: [240.6, 247.5],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/LGMS323/*"
										}, {
											ua: "LGMS323"
										}
									],
									dpi: [206.6, 204.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "LGE/*/LGLS996/*"
										}, {
											ua: "LGLS996"
										}
									],
									dpi: [403.4, 401.5],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Micromax/*/4560MMX/*"
										}, {
											ua: "4560MMX"
										}
									],
									dpi: [240, 219.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Micromax/*/A250/*"
										}, {
											ua: "Micromax A250"
										}
									],
									dpi: [480, 446.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Micromax/*/Micromax AQ4501/*"
										}, {
											ua: "Micromax AQ4501"
										}
									],
									dpi: 240,
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/DROID RAZR/*"
										}, {
											ua: "DROID RAZR"
										}
									],
									dpi: [368.1, 256.7],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT830C/*"
										}, {
											ua: "XT830C"
										}
									],
									dpi: [254, 255.9],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1021/*"
										}, {
											ua: "XT1021"
										}
									],
									dpi: [254, 256.7],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1023/*"
										}, {
											ua: "XT1023"
										}
									],
									dpi: [254, 256.7],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1028/*"
										}, {
											ua: "XT1028"
										}
									],
									dpi: [326.6, 327.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1034/*"
										}, {
											ua: "XT1034"
										}
									],
									dpi: [326.6, 328.4],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1053/*"
										}, {
											ua: "XT1053"
										}
									],
									dpi: [315.3, 316.1],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1562/*"
										}, {
											ua: "XT1562"
										}
									],
									dpi: [403.4, 402.7],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/Nexus 6/*"
										}, {
											ua: "Nexus 6 "
										}
									],
									dpi: [494.3, 489.7],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1063/*"
										}, {
											ua: "XT1063"
										}
									],
									dpi: [295, 296.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1064/*"
										}, {
											ua: "XT1064"
										}
									],
									dpi: [295, 295.6],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1092/*"
										}, {
											ua: "XT1092"
										}
									],
									dpi: [422, 424.1],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "motorola/*/XT1095/*"
										}, {
											ua: "XT1095"
										}
									],
									dpi: [422, 423.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "OnePlus/*/A0001/*"
										}, {
											ua: "A0001"
										}
									],
									dpi: [403.4, 401],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "OnePlus/*/ONE E1005/*"
										}, {
											ua: "ONE E1005"
										}
									],
									dpi: [442.4, 441.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "OnePlus/*/ONE A2005/*"
										}, {
											ua: "ONE A2005"
										}
									],
									dpi: [391.9, 405.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "OPPO/*/X909/*"
										}, {
											ua: "X909"
										}
									],
									dpi: [442.4, 444.1],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9082/*"
										}, {
											ua: "GT-I9082"
										}
									],
									dpi: [184.7, 185.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G360P/*"
										}, {
											ua: "SM-G360P"
										}
									],
									dpi: [196.7, 205.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/Nexus S/*"
										}, {
											ua: "Nexus S"
										}
									],
									dpi: [234.5, 229.8],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9300/*"
										}, {
											ua: "GT-I9300"
										}
									],
									dpi: [304.8, 303.9],
									bw: 5,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-T230NU/*"
										}, {
											ua: "SM-T230NU"
										}
									],
									dpi: 216,
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SGH-T399/*"
										}, {
											ua: "SGH-T399"
										}
									],
									dpi: [217.7, 231.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-N9005/*"
										}, {
											ua: "SM-N9005"
										}
									],
									dpi: [386.4, 387],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SAMSUNG-SM-N900A/*"
										}, {
											ua: "SAMSUNG-SM-N900A"
										}
									],
									dpi: [386.4, 387.7],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9500/*"
										}, {
											ua: "GT-I9500"
										}
									],
									dpi: [442.5, 443.3],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9505/*"
										}, {
											ua: "GT-I9505"
										}
									],
									dpi: 439.4,
									bw: 4,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G900F/*"
										}, {
											ua: "SM-G900F"
										}
									],
									dpi: [415.6, 431.6],
									bw: 5,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G900M/*"
										}, {
											ua: "SM-G900M"
										}
									],
									dpi: [415.6, 431.6],
									bw: 5,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G800F/*"
										}, {
											ua: "SM-G800F"
										}
									],
									dpi: 326.8,
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G906S/*"
										}, {
											ua: "SM-G906S"
										}
									],
									dpi: [562.7, 572.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9300/*"
										}, {
											ua: "GT-I9300"
										}
									],
									dpi: [306.7, 304.8],
									bw: 5,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-T535/*"
										}, {
											ua: "SM-T535"
										}
									],
									dpi: [142.6, 136.4],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-N920C/*"
										}, {
											ua: "SM-N920C"
										}
									],
									dpi: [515.1, 518.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9300I/*"
										}, {
											ua: "GT-I9300I"
										}
									],
									dpi: [304.8, 305.8],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-I9195/*"
										}, {
											ua: "GT-I9195"
										}
									],
									dpi: [249.4, 256.7],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SPH-L520/*"
										}, {
											ua: "SPH-L520"
										}
									],
									dpi: [249.4, 255.9],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SAMSUNG-SGH-I717/*"
										}, {
											ua: "SAMSUNG-SGH-I717"
										}
									],
									dpi: 285.8,
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SPH-D710/*"
										}, {
											ua: "SPH-D710"
										}
									],
									dpi: [217.7, 204.2],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/GT-N7100/*"
										}, {
											ua: "GT-N7100"
										}
									],
									dpi: 265.1,
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SCH-I605/*"
										}, {
											ua: "SCH-I605"
										}
									],
									dpi: 265.1,
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/Galaxy Nexus/*"
										}, {
											ua: "Galaxy Nexus"
										}
									],
									dpi: [315.3, 314.2],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-N910H/*"
										}, {
											ua: "SM-N910H"
										}
									],
									dpi: [515.1, 518],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-N910C/*"
										}, {
											ua: "SM-N910C"
										}
									],
									dpi: [515.2, 520.2],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G130M/*"
										}, {
											ua: "SM-G130M"
										}
									],
									dpi: [165.9, 164.8],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G928I/*"
										}, {
											ua: "SM-G928I"
										}
									],
									dpi: [515.1, 518.4],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G920F/*"
										}, {
											ua: "SM-G920F"
										}
									],
									dpi: 580.6,
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G920P/*"
										}, {
											ua: "SM-G920P"
										}
									],
									dpi: [522.5, 577],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G925F/*"
										}, {
											ua: "SM-G925F"
										}
									],
									dpi: 580.6,
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "samsung/*/SM-G925V/*"
										}, {
											ua: "SM-G925V"
										}
									],
									dpi: [522.5, 576.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Sony/*/C6903/*"
										}, {
											ua: "C6903"
										}
									],
									dpi: [442.5, 443.3],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "Sony/*/D6653/*"
										}, {
											ua: "D6653"
										}
									],
									dpi: [428.6, 427.6],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Sony/*/E6653/*"
										}, {
											ua: "E6653"
										}
									],
									dpi: [428.6, 425.7],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Sony/*/E6853/*"
										}, {
											ua: "E6853"
										}
									],
									dpi: [403.4, 401.9],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "Sony/*/SGP321/*"
										}, {
											ua: "SGP321"
										}
									],
									dpi: [224.7, 224.1],
									bw: 3,
									ac: 500
								}, {
									type: "android",
									rules: [{
											mdmh: "TCT/*/ALCATEL ONE TOUCH Fierce/*"
										}, {
											ua: "ALCATEL ONE TOUCH Fierce"
										}
									],
									dpi: [240, 247.5],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "THL/*/thl 5000/*"
										}, {
											ua: "thl 5000"
										}
									],
									dpi: [480, 443.3],
									bw: 3,
									ac: 1e3
								}, {
									type: "android",
									rules: [{
											mdmh: "ZTE/*/ZTE Blade L2/*"
										}, {
											ua: "ZTE Blade L2"
										}
									],
									dpi: 240,
									bw: 3,
									ac: 500
								}, {
									type: "ios",
									rules: [{
											res: [640, 960]
										}
									],
									dpi: [325.1, 328.4],
									bw: 4,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [640, 960]
										}
									],
									dpi: [325.1, 328.4],
									bw: 4,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [640, 1136]
										}
									],
									dpi: [317.1, 320.2],
									bw: 3,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [640, 1136]
										}
									],
									dpi: [317.1, 320.2],
									bw: 3,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [750, 1334]
										}
									],
									dpi: 326.4,
									bw: 4,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [750, 1334]
										}
									],
									dpi: 326.4,
									bw: 4,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [1242, 2208]
										}
									],
									dpi: [453.6, 458.4],
									bw: 4,
									ac: 1e3
								}, {
									type: "ios",
									rules: [{
											res: [1242, 2208]
										}
									],
									dpi: [453.6, 458.4],
									bw: 4,
									ac: 1e3
								}
							]
						};
						t.exports = n
					}, {}
				],
				11: [function (e, t, a) {
						function n(e, t) {
							if (this.dpdb = r, this.recalculateDeviceParams_(), e) {
								this.onDeviceParamsUpdated = t,
								console.log("Fetching DPDB...");
								var a = new XMLHttpRequest,
								n = this;
								a.open("GET", s, !0),
								a.addEventListener("load", function () {
									n.loading = !1,
									a.status >= 200 && a.status <= 299 ? (console.log("Successfully loaded online DPDB."), n.dpdb = JSON.parse(a.response), n.recalculateDeviceParams_()) : console.error("Error loading online DPDB!")
								}),
								a.send()
							}
						}
						function i(e) {
							this.xdpi = e.xdpi,
							this.ydpi = e.ydpi,
							this.bevelMm = e.bevelMm
						}
						var r = e("./dpdb-cache.js"),
						o = e("../util.js"),
						s = "https://storage.googleapis.com/cardboard-dpdb/dpdb.json";
						n.prototype.getDeviceParams = function () {
							return this.deviceParams
						},
						n.prototype.recalculateDeviceParams_ = function () {
							console.log("Recalculating device params.");
							var e = this.calcDeviceParams_();
							console.log("New device parameters:"),
							console.log(e),
							e ? (this.deviceParams = e, this.onDeviceParamsUpdated && this.onDeviceParamsUpdated(this.deviceParams)) : console.error("Failed to recalculate device parameters.")
						},
						n.prototype.calcDeviceParams_ = function () {
							var e = this.dpdb;
							if (!e)
								return console.error("DPDB not available."), null;
							if (1 != e.format)
								return console.error("DPDB has unexpected format version."), null;
							if (!e.devices || !e.devices.length)
								return console.error("DPDB does not have a devices section."), null;
							var t = navigator.userAgent || navigator.vendor || window.opera,
							a = o.getScreenWidth(),
							n = o.getScreenHeight();
							if (console.log("User agent: " + t), console.log("Pixel width: " + a), console.log("Pixel height: " + n), !e.devices)
								return console.error("DPDB has no devices section."), null;
							for (var r = 0; r < e.devices.length; r++) {
								var s = e.devices[r];
								if (s.rules)
									if ("ios" == s.type || "android" == s.type) {
										if (o.isIOS() == ("ios" == s.type)) {
											for (var c = !1, l = 0; l < s.rules.length; l++) {
												var u = s.rules[l];
												if (this.matchRule_(u, t, a, n)) {
													console.log("Rule matched:"),
													console.log(u),
													c = !0;
													break
												}
											}
											if (c) {
												var d = s.dpi[0] || s.dpi,
												M = s.dpi[1] || s.dpi;
												return new i({
													xdpi: d,
													ydpi: M,
													bevelMm: s.bw
												})
											}
										}
									} else
										console.warn("Device[" + r + "] has invalid type.");
								else
									console.warn("Device[" + r + "] has no rules section.")
							}
							return console.warn("No DPDB device match."),
							null
						},
						n.prototype.matchRule_ = function (e, t, a, n) {
							if (!e.ua && !e.res)
								return !1;
							if (e.ua && t.indexOf(e.ua) < 0)
								return !1;
							if (e.res) {
								if (!e.res[0] || !e.res[1])
									return !1;
								var i = e.res[0],
								r = e.res[1];
								if (Math.min(a, n) != Math.min(i, r) || Math.max(a, n) != Math.max(i, r))
									return !1
							}
							return !0
						},
						t.exports = n
					}, {
						"../util.js": 22,
						"./dpdb-cache.js": 10
					}
				],
				12: [function (e, t, a) {
						function n() {
							this.callbacks = {}
						}
						n.prototype.emit = function (e) {
							var t = this.callbacks[e];
							if (t) {
								var a = [].slice.call(arguments);
								a.shift();
								for (var n = 0; n < t.length; n++)
									t[n].apply(this, a)
							}
						},
						n.prototype.on = function (e, t) {
							e in this.callbacks ? this.callbacks[e].push(t) : this.callbacks[e] = [t]
						},
						t.exports = n
					}, {}
				],
				13: [function (e, t, a) {
						var n = e("./util.js"),
						i = e("./webvr-polyfill.js");
						window.WebVRConfig = n.extend({
								FORCE_ENABLE_VR: !1,
								K_FILTER: .98,
								PREDICTION_TIME_S: .04,
								TOUCH_PANNER_DISABLED: !1,
								CARDBOARD_UI_DISABLED: !1,
								ROTATE_INSTRUCTIONS_DISABLED: !1,
								YAW_ONLY: !1,
								MOUSE_KEYBOARD_CONTROLS_DISABLED: !1,
								DEFER_INITIALIZATION: !1,
								ENABLE_DEPRECATED_API: !1,
								BUFFER_SCALE: .5,
								DIRTY_SUBMIT_FRAME_BINDINGS: !1
							}, window.WebVRConfig),
						window.WebVRConfig.DEFER_INITIALIZATION ? window.InitializeWebVRPolyfill = function () {
							new i
						}
						 : new i
					}, {
						"./util.js": 22,
						"./webvr-polyfill.js": 25
					}
				],
				14: [function (e, t, a) {
						var n = window.MathUtil || {};
						n.degToRad = Math.PI / 180,
						n.radToDeg = 180 / Math.PI,
						n.Vector2 = function (e, t) {
							this.x = e || 0,
							this.y = t || 0
						},
						n.Vector2.prototype = {
							constructor: n.Vector2,
							set: function (e, t) {
								return this.x = e,
								this.y = t,
								this
							},
							copy: function (e) {
								return this.x = e.x,
								this.y = e.y,
								this
							},
							subVectors: function (e, t) {
								return this.x = e.x - t.x,
								this.y = e.y - t.y,
								this
							}
						},
						n.Vector3 = function (e, t, a) {
							this.x = e || 0,
							this.y = t || 0,
							this.z = a || 0
						},
						n.Vector3.prototype = {
							constructor: n.Vector3,
							set: function (e, t, a) {
								return this.x = e,
								this.y = t,
								this.z = a,
								this
							},
							copy: function (e) {
								return this.x = e.x,
								this.y = e.y,
								this.z = e.z,
								this
							},
							length: function () {
								return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
							},
							normalize: function () {
								var e = this.length();
								if (0 !== e) {
									var t = 1 / e;
									this.multiplyScalar(t)
								} else
									this.x = 0, this.y = 0, this.z = 0;
								return this
							},
							multiplyScalar: function (e) {
								this.x *= e,
								this.y *= e,
								this.z *= e
							},
							applyQuaternion: function (e) {
								var t = this.x,
								a = this.y,
								n = this.z,
								i = e.x,
								r = e.y,
								o = e.z,
								s = e.w,
								c = s * t + r * n - o * a,
								l = s * a + o * t - i * n,
								u = s * n + i * a - r * t,
								d = -i * t - r * a - o * n;
								return this.x = c * s + d * -i + l * -o - u * -r,
								this.y = l * s + d * -r + u * -i - c * -o,
								this.z = u * s + d * -o + c * -r - l * -i,
								this
							},
							dot: function (e) {
								return this.x * e.x + this.y * e.y + this.z * e.z
							},
							crossVectors: function (e, t) {
								var a = e.x,
								n = e.y,
								i = e.z,
								r = t.x,
								o = t.y,
								s = t.z;
								return this.x = n * s - i * o,
								this.y = i * r - a * s,
								this.z = a * o - n * r,
								this
							}
						},
						n.Quaternion = function (e, t, a, n) {
							this.x = e || 0,
							this.y = t || 0,
							this.z = a || 0,
							this.w = void 0 !== n ? n : 1
						},
						n.Quaternion.prototype = {
							constructor: n.Quaternion,
							set: function (e, t, a, n) {
								return this.x = e,
								this.y = t,
								this.z = a,
								this.w = n,
								this
							},
							copy: function (e) {
								return this.x = e.x,
								this.y = e.y,
								this.z = e.z,
								this.w = e.w,
								this
							},
							setFromEulerXYZ: function (e, t, a) {
								var n = Math.cos(e / 2),
								i = Math.cos(t / 2),
								r = Math.cos(a / 2),
								o = Math.sin(e / 2),
								s = Math.sin(t / 2),
								c = Math.sin(a / 2);
								return this.x = o * i * r + n * s * c,
								this.y = n * s * r - o * i * c,
								this.z = n * i * c + o * s * r,
								this.w = n * i * r - o * s * c,
								this
							},
							setFromEulerYXZ: function (e, t, a) {
								var n = Math.cos(e / 2),
								i = Math.cos(t / 2),
								r = Math.cos(a / 2),
								o = Math.sin(e / 2),
								s = Math.sin(t / 2),
								c = Math.sin(a / 2);
								return this.x = o * i * r + n * s * c,
								this.y = n * s * r - o * i * c,
								this.z = n * i * c - o * s * r,
								this.w = n * i * r + o * s * c,
								this
							},
							setFromAxisAngle: function (e, t) {
								var a = t / 2,
								n = Math.sin(a);
								return this.x = e.x * n,
								this.y = e.y * n,
								this.z = e.z * n,
								this.w = Math.cos(a),
								this
							},
							multiply: function (e) {
								return this.multiplyQuaternions(this, e)
							},
							multiplyQuaternions: function (e, t) {
								var a = e.x,
								n = e.y,
								i = e.z,
								r = e.w,
								o = t.x,
								s = t.y,
								c = t.z,
								l = t.w;
								return this.x = a * l + r * o + n * c - i * s,
								this.y = n * l + r * s + i * o - a * c,
								this.z = i * l + r * c + a * s - n * o,
								this.w = r * l - a * o - n * s - i * c,
								this
							},
							inverse: function () {
								return this.x *= -1,
								this.y *= -1,
								this.z *= -1,
								this.normalize(),
								this
							},
							normalize: function () {
								var e = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
								return 0 === e ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (e = 1 / e, this.x = this.x * e, this.y = this.y * e, this.z = this.z * e, this.w = this.w * e),
								this
							},
							slerp: function (e, t) {
								if (0 === t)
									return this;
								if (1 === t)
									return this.copy(e);
								var a = this.x,
								n = this.y,
								i = this.z,
								r = this.w,
								o = r * e.w + a * e.x + n * e.y + i * e.z;
								if (o < 0 ? (this.w = -e.w, this.x = -e.x, this.y = -e.y, this.z = -e.z, o = -o) : this.copy(e), o >= 1)
									return this.w = r, this.x = a, this.y = n, this.z = i, this;
								var s = Math.acos(o),
								c = Math.sqrt(1 - o * o);
								if (Math.abs(c) < .001)
									return this.w = .5 * (r + this.w), this.x = .5 * (a + this.x), this.y = .5 * (n + this.y), this.z = .5 * (i + this.z), this;
								var l = Math.sin((1 - t) * s) / c,
								u = Math.sin(t * s) / c;
								return this.w = r * l + this.w * u,
								this.x = a * l + this.x * u,
								this.y = n * l + this.y * u,
								this.z = i * l + this.z * u,
								this
							},
							setFromUnitVectors: function () {
								var e,
								t,
								a = 1e-6;
								return function (i, r) {
									return void 0 === e && (e = new n.Vector3),
									t = i.dot(r) + 1,
									t < a ? (t = 0, Math.abs(i.x) > Math.abs(i.z) ? e.set(-i.y, i.x, 0) : e.set(0, -i.z, i.y)) : e.crossVectors(i, r),
									this.x = e.x,
									this.y = e.y,
									this.z = e.z,
									this.w = t,
									this.normalize(),
									this
								}
							}
							()
						},
						t.exports = n
					}, {}
				],
				15: [function (e, t, a) {
						function n() {
							this.displayName = "Mouse and Keyboard VRDisplay (webvr-polyfill)",
							this.capabilities.hasOrientation = !0,
							window.addEventListener("keydown", this.onKeyDown_.bind(this)),
							window.addEventListener("mousemove", this.onMouseMove_.bind(this)),
							window.addEventListener("mousedown", this.onMouseDown_.bind(this)),
							window.addEventListener("mouseup", this.onMouseUp_.bind(this)),
							this.phi_ = 0,
							this.theta_ = 0,
							this.targetAngle_ = null,
							this.angleAnimation_ = null,
							this.orientation_ = new r.Quaternion,
							this.rotateStart_ = new r.Vector2,
							this.rotateEnd_ = new r.Vector2,
							this.rotateDelta_ = new r.Vector2,
							this.isDragging_ = !1,
							this.orientationOut_ = new Float32Array(4)
						}
						var i = e("./base.js").VRDisplay,
						r = e("./math-util.js"),
						o = e("./util.js"),
						s = .15,
						c = 80,
						l = .5,
						u = .3;
						n.prototype = new i,
						n.prototype.getImmediatePose = function () {
							return this.orientation_.setFromEulerYXZ(this.phi_, this.theta_, 0),
							this.orientationOut_[0] = this.orientation_.x,
							this.orientationOut_[1] = this.orientation_.y,
							this.orientationOut_[2] = this.orientation_.z,
							this.orientationOut_[3] = this.orientation_.w, {
								position: null,
								orientation: this.orientationOut_,
								linearVelocity: null,
								linearAcceleration: null,
								angularVelocity: null,
								angularAcceleration: null
							}
						},
						n.prototype.onKeyDown_ = function (e) {
							38 == e.keyCode ? this.animatePhi_(this.phi_ + s) : 39 == e.keyCode ? this.animateTheta_(this.theta_ - s) : 40 == e.keyCode ? this.animatePhi_(this.phi_ - s) : 37 == e.keyCode && this.animateTheta_(this.theta_ + s)
						},
						n.prototype.animateTheta_ = function (e) {
							this.animateKeyTransitions_("theta_", e)
						},
						n.prototype.animatePhi_ = function (e) {
							e = o.clamp(e, -Math.PI / 2, Math.PI / 2),
							this.animateKeyTransitions_("phi_", e)
						},
						n.prototype.animateKeyTransitions_ = function (e, t) {
							this.angleAnimation_ && cancelAnimationFrame(this.angleAnimation_);
							var a = this[e],
							n = new Date;
							this.angleAnimation_ = requestAnimationFrame(function i() {
									var r = new Date - n;
									if (r >= c)
										return this[e] = t, void cancelAnimationFrame(this.angleAnimation_);
									this.angleAnimation_ = requestAnimationFrame(i.bind(this));
									var o = r / c;
									this[e] = a + (t - a) * o
								}
									.bind(this))
						},
						n.prototype.onMouseDown_ = function (e) {
							this.rotateStart_.set(e.clientX, e.clientY),
							this.isDragging_ = !0
						},
						n.prototype.onMouseMove_ = function (e) {
							if (this.isDragging_ || this.isPointerLocked_()) {
								if (this.isPointerLocked_()) {
									var t = e.movementX || e.mozMovementX || 0,
									a = e.movementY || e.mozMovementY || 0;
									this.rotateEnd_.set(this.rotateStart_.x - t, this.rotateStart_.y - a)
								} else
									this.rotateEnd_.set(e.clientX, e.clientY);
								this.rotateDelta_.subVectors(this.rotateEnd_, this.rotateStart_),
								this.rotateStart_.copy(this.rotateEnd_),
								this.phi_ += 2 * Math.PI * this.rotateDelta_.y / screen.height * u,
								this.theta_ += 2 * Math.PI * this.rotateDelta_.x / screen.width * l,
								this.phi_ = o.clamp(this.phi_, -Math.PI / 2, Math.PI / 2)
							}
						},
						n.prototype.onMouseUp_ = function (e) 
						{
							this.isDragging_ = !1
						},
						n.prototype.isPointerLocked_ = function () {
							var e = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement;
							return void 0 !== e
						},
						n.prototype.resetPose = function () {
							this.phi_ = 0,
							this.theta_ = 0
						},
						t.exports = n
					}, {
						"./base.js": 2,
						"./math-util.js": 14,
						"./util.js": 22
					}
				],
				16: [function (e, t, a) {
						function n() {
							this.loadIcon_();
							var e = document.createElement("div"),
							t = e.style;
							t.position = "fixed",
							t.top = 0,
							t.right = 0,
							t.bottom = 0,
							t.left = 0,
							t.backgroundColor = "gray",
							t.fontFamily = "sans-serif",
							t.zIndex = 1e6;
							var a = document.createElement("img");
							a.src = this.icon;
							var t = a.style;
							t.marginLeft = "25%",
							t.marginTop = "25%",
							t.width = "50%",
							e.appendChild(a);
							var n = document.createElement("div"),
							t = n.style;
							t.textAlign = "center",
							t.fontSize = "16px",
							t.lineHeight = "24px",
							t.margin = "24px 25%",
							t.width = "50%",
							n.innerHTML = "Place your phone into your Cardboard viewer.",
							e.appendChild(n);
							var i = document.createElement("div"),
							t = i.style;
							t.backgroundColor = "#CFD8DC",
							t.position = "fixed",
							t.bottom = 0,
							t.width = "100%",
							t.height = "48px",
							t.padding = "14px 24px",
							t.boxSizing = "border-box",
							t.color = "#656A6B",
							e.appendChild(i);
							var r = document.createElement("div");
							r.style["float"] = "left",
							r.innerHTML = "No Cardboard viewer?";
							var o = document.createElement("a");
							o.href = "https://www.google.com/get/cardboard/get-cardboard/",
							o.innerHTML = "get one",
							o.target = "_blank";
							var t = o.style;
							t["float"] = "right",
							t.fontWeight = 600,
							t.textTransform = "uppercase",
							t.borderLeft = "1px solid gray",
							t.paddingLeft = "24px",
							t.textDecoration = "none",
							t.color = "#656A6B",
							i.appendChild(r),
							i.appendChild(o),
							this.overlay = e,
							this.text = n,
							this.hide()
						}
						var i = e("./util.js");
						n.prototype.show = function (e) {
							e || this.overlay.parentElement ? e && (this.overlay.parentElement && this.overlay.parentElement != e && this.overlay.parentElement.removeChild(this.overlay), e.appendChild(this.overlay)) : document.body.appendChild(this.overlay),
							this.overlay.style.display = "block";
							var t = this.overlay.querySelector("img"),
							a = t.style;
							i.isLandscapeMode() ? (a.width = "20%", a.marginLeft = "40%", a.marginTop = "3%") : (a.width = "50%", a.marginLeft = "25%", a.marginTop = "25%")
						},
						n.prototype.hide = function () {
							this.overlay.style.display = "none"
						},
						n.prototype.showTemporarily = function (e, t) {
							this.show(t),
							this.timer = setTimeout(this.hide.bind(this), e)
						},
						n.prototype.disableShowTemporarily = function () {
							clearTimeout(this.timer)
						},
						n.prototype.update = function () {
							this.disableShowTemporarily(),
							!i.isLandscapeMode() && i.isMobile() ? this.show() : this.hide()
						},
						n.prototype.loadIcon_ = function () {
							this.icon = i.base64("image/svg+xml", "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE5OHB4IiBoZWlnaHQ9IjI0MHB4IiB2aWV3Qm94PSIwIDAgMTk4IDI0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMy4zICgxMjA4MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+dHJhbnNpdGlvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJ0cmFuc2l0aW9uIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIj4KICAgICAgICAgICAgPGcgaWQ9IkltcG9ydGVkLUxheWVycy1Db3B5LTQtKy1JbXBvcnRlZC1MYXllcnMtQ29weS0rLUltcG9ydGVkLUxheWVycy1Db3B5LTItQ29weSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iSW1wb3J0ZWQtTGF5ZXJzLUNvcHktNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEwNy4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQ5LjYyNSwyLjUyNyBDMTQ5LjYyNSwyLjUyNyAxNTUuODA1LDYuMDk2IDE1Ni4zNjIsNi40MTggTDE1Ni4zNjIsNy4zMDQgQzE1Ni4zNjIsNy40ODEgMTU2LjM3NSw3LjY2NCAxNTYuNCw3Ljg1MyBDMTU2LjQxLDcuOTM0IDE1Ni40Miw4LjAxNSAxNTYuNDI3LDguMDk1IEMxNTYuNTY3LDkuNTEgMTU3LjQwMSwxMS4wOTMgMTU4LjUzMiwxMi4wOTQgTDE2NC4yNTIsMTcuMTU2IEwxNjQuMzMzLDE3LjA2NiBDMTY0LjMzMywxNy4wNjYgMTY4LjcxNSwxNC41MzYgMTY5LjU2OCwxNC4wNDIgQzE3MS4wMjUsMTQuODgzIDE5NS41MzgsMjkuMDM1IDE5NS41MzgsMjkuMDM1IEwxOTUuNTM4LDgzLjAzNiBDMTk1LjUzOCw4My44MDcgMTk1LjE1Miw4NC4yNTMgMTk0LjU5LDg0LjI1MyBDMTk0LjM1Nyw4NC4yNTMgMTk0LjA5NSw4NC4xNzcgMTkzLjgxOCw4NC4wMTcgTDE2OS44NTEsNzAuMTc5IEwxNjkuODM3LDcwLjIwMyBMMTQyLjUxNSw4NS45NzggTDE0MS42NjUsODQuNjU1IEMxMzYuOTM0LDgzLjEyNiAxMzEuOTE3LDgxLjkxNSAxMjYuNzE0LDgxLjA0NSBDMTI2LjcwOSw4MS4wNiAxMjYuNzA3LDgxLjA2OSAxMjYuNzA3LDgxLjA2OSBMMTIxLjY0LDk4LjAzIEwxMTMuNzQ5LDEwMi41ODYgTDExMy43MTIsMTAyLjUyMyBMMTEzLjcxMiwxMzAuMTEzIEMxMTMuNzEyLDEzMC44ODUgMTEzLjMyNiwxMzEuMzMgMTEyLjc2NCwxMzEuMzMgQzExMi41MzIsMTMxLjMzIDExMi4yNjksMTMxLjI1NCAxMTEuOTkyLDEzMS4wOTQgTDY5LjUxOSwxMDYuNTcyIEM2OC41NjksMTA2LjAyMyA2Ny43OTksMTA0LjY5NSA2Ny43OTksMTAzLjYwNSBMNjcuNzk5LDEwMi41NyBMNjcuNzc4LDEwMi42MTcgQzY3LjI3LDEwMi4zOTMgNjYuNjQ4LDEwMi4yNDkgNjUuOTYyLDEwMi4yMTggQzY1Ljg3NSwxMDIuMjE0IDY1Ljc4OCwxMDIuMjEyIDY1LjcwMSwxMDIuMjEyIEM2NS42MDYsMTAyLjIxMiA2NS41MTEsMTAyLjIxNSA2NS40MTYsMTAyLjIxOSBDNjUuMTk1LDEwMi4yMjkgNjQuOTc0LDEwMi4yMzUgNjQuNzU0LDEwMi4yMzUgQzY0LjMzMSwxMDIuMjM1IDYzLjkxMSwxMDIuMjE2IDYzLjQ5OCwxMDIuMTc4IEM2MS44NDMsMTAyLjAyNSA2MC4yOTgsMTAxLjU3OCA1OS4wOTQsMTAwLjg4MiBMMTIuNTE4LDczLjk5MiBMMTIuNTIzLDc0LjAwNCBMMi4yNDUsNTUuMjU0IEMxLjI0NCw1My40MjcgMi4wMDQsNTEuMDM4IDMuOTQzLDQ5LjkxOCBMNTkuOTU0LDE3LjU3MyBDNjAuNjI2LDE3LjE4NSA2MS4zNSwxNy4wMDEgNjIuMDUzLDE3LjAwMSBDNjMuMzc5LDE3LjAwMSA2NC42MjUsMTcuNjYgNjUuMjgsMTguODU0IEw2NS4yODUsMTguODUxIEw2NS41MTIsMTkuMjY0IEw2NS41MDYsMTkuMjY4IEM2NS45MDksMjAuMDAzIDY2LjQwNSwyMC42OCA2Ni45ODMsMjEuMjg2IEw2Ny4yNiwyMS41NTYgQzY5LjE3NCwyMy40MDYgNzEuNzI4LDI0LjM1NyA3NC4zNzMsMjQuMzU3IEM3Ni4zMjIsMjQuMzU3IDc4LjMyMSwyMy44NCA4MC4xNDgsMjIuNzg1IEM4MC4xNjEsMjIuNzg1IDg3LjQ2NywxOC41NjYgODcuNDY3LDE4LjU2NiBDODguMTM5LDE4LjE3OCA4OC44NjMsMTcuOTk0IDg5LjU2NiwxNy45OTQgQzkwLjg5MiwxNy45OTQgOTIuMTM4LDE4LjY1MiA5Mi43OTIsMTkuODQ3IEw5Ni4wNDIsMjUuNzc1IEw5Ni4wNjQsMjUuNzU3IEwxMDIuODQ5LDI5LjY3NCBMMTAyLjc0NCwyOS40OTIgTDE0OS42MjUsMi41MjcgTTE0OS42MjUsMC44OTIgQzE0OS4zNDMsMC44OTIgMTQ5LjA2MiwwLjk2NSAxNDguODEsMS4xMSBMMTAyLjY0MSwyNy42NjYgTDk3LjIzMSwyNC41NDIgTDk0LjIyNiwxOS4wNjEgQzkzLjMxMywxNy4zOTQgOTEuNTI3LDE2LjM1OSA4OS41NjYsMTYuMzU4IEM4OC41NTUsMTYuMzU4IDg3LjU0NiwxNi42MzIgODYuNjQ5LDE3LjE1IEM4My44NzgsMTguNzUgNzkuNjg3LDIxLjE2OSA3OS4zNzQsMjEuMzQ1IEM3OS4zNTksMjEuMzUzIDc5LjM0NSwyMS4zNjEgNzkuMzMsMjEuMzY5IEM3Ny43OTgsMjIuMjU0IDc2LjA4NCwyMi43MjIgNzQuMzczLDIyLjcyMiBDNzIuMDgxLDIyLjcyMiA2OS45NTksMjEuODkgNjguMzk3LDIwLjM4IEw2OC4xNDUsMjAuMTM1IEM2Ny43MDYsMTkuNjcyIDY3LjMyMywxOS4xNTYgNjcuMDA2LDE4LjYwMSBDNjYuOTg4LDE4LjU1OSA2Ni45NjgsMTguNTE5IDY2Ljk0NiwxOC40NzkgTDY2LjcxOSwxOC4wNjUgQzY2LjY5LDE4LjAxMiA2Ni42NTgsMTcuOTYgNjYuNjI0LDE3LjkxMSBDNjUuNjg2LDE2LjMzNyA2My45NTEsMTUuMzY2IDYyLjA1MywxNS4zNjYgQzYxLjA0MiwxNS4zNjYgNjAuMDMzLDE1LjY0IDU5LjEzNiwxNi4xNTggTDMuMTI1LDQ4LjUwMiBDMC40MjYsNTAuMDYxIC0wLjYxMyw1My40NDIgMC44MTEsNTYuMDQgTDExLjA4OSw3NC43OSBDMTEuMjY2LDc1LjExMyAxMS41MzcsNzUuMzUzIDExLjg1LDc1LjQ5NCBMNTguMjc2LDEwMi4yOTggQzU5LjY3OSwxMDMuMTA4IDYxLjQzMywxMDMuNjMgNjMuMzQ4LDEwMy44MDYgQzYzLjgxMiwxMDMuODQ4IDY0LjI4NSwxMDMuODcgNjQuNzU0LDEwMy44NyBDNjUsMTAzLjg3IDY1LjI0OSwxMDMuODY0IDY1LjQ5NCwxMDMuODUyIEM2NS41NjMsMTAzLjg0OSA2NS42MzIsMTAzLjg0NyA2NS43MDEsMTAzLjg0NyBDNjUuNzY0LDEwMy44NDcgNjUuODI4LDEwMy44NDkgNjUuODksMTAzLjg1MiBDNjUuOTg2LDEwMy44NTYgNjYuMDgsMTAzLjg2MyA2Ni4xNzMsMTAzLjg3NCBDNjYuMjgyLDEwNS40NjcgNjcuMzMyLDEwNy4xOTcgNjguNzAyLDEwNy45ODggTDExMS4xNzQsMTMyLjUxIEMxMTEuNjk4LDEzMi44MTIgMTEyLjIzMiwxMzIuOTY1IDExMi43NjQsMTMyLjk2NSBDMTE0LjI2MSwxMzIuOTY1IDExNS4zNDcsMTMxLjc2NSAxMTUuMzQ3LDEzMC4xMTMgTDExNS4zNDcsMTAzLjU1MSBMMTIyLjQ1OCw5OS40NDYgQzEyMi44MTksOTkuMjM3IDEyMy4wODcsOTguODk4IDEyMy4yMDcsOTguNDk4IEwxMjcuODY1LDgyLjkwNSBDMTMyLjI3OSw4My43MDIgMTM2LjU1Nyw4NC43NTMgMTQwLjYwNyw4Ni4wMzMgTDE0MS4xNCw4Ni44NjIgQzE0MS40NTEsODcuMzQ2IDE0MS45NzcsODcuNjEzIDE0Mi41MTYsODcuNjEzIEMxNDIuNzk0LDg3LjYxMyAxNDMuMDc2LDg3LjU0MiAxNDMuMzMzLDg3LjM5MyBMMTY5Ljg2NSw3Mi4wNzYgTDE5Myw4NS40MzMgQzE5My41MjMsODUuNzM1IDE5NC4wNTgsODUuODg4IDE5NC41OSw4NS44ODggQzE5Ni4wODcsODUuODg4IDE5Ny4xNzMsODQuNjg5IDE5Ny4xNzMsODMuMDM2IEwxOTcuMTczLDI5LjAzNSBDMTk3LjE3MywyOC40NTEgMTk2Ljg2MSwyNy45MTEgMTk2LjM1NSwyNy42MTkgQzE5Ni4zNTUsMjcuNjE5IDE3MS44NDMsMTMuNDY3IDE3MC4zODUsMTIuNjI2IEMxNzAuMTMyLDEyLjQ4IDE2OS44NSwxMi40MDcgMTY5LjU2OCwxMi40MDcgQzE2OS4yODUsMTIuNDA3IDE2OS4wMDIsMTIuNDgxIDE2OC43NDksMTIuNjI3IEMxNjguMTQzLDEyLjk3OCAxNjUuNzU2LDE0LjM1NyAxNjQuNDI0LDE1LjEyNSBMMTU5LjYxNSwxMC44NyBDMTU4Ljc5NiwxMC4xNDUgMTU4LjE1NCw4LjkzNyAxNTguMDU0LDcuOTM0IEMxNTguMDQ1LDcuODM3IDE1OC4wMzQsNy43MzkgMTU4LjAyMSw3LjY0IEMxNTguMDA1LDcuNTIzIDE1Ny45OTgsNy40MSAxNTcuOTk4LDcuMzA0IEwxNTcuOTk4LDYuNDE4IEMxNTcuOTk4LDUuODM0IDE1Ny42ODYsNS4yOTUgMTU3LjE4MSw1LjAwMiBDMTU2LjYyNCw0LjY4IDE1MC40NDIsMS4xMTEgMTUwLjQ0MiwxLjExMSBDMTUwLjE4OSwwLjk2NSAxNDkuOTA3LDAuODkyIDE0OS42MjUsMC44OTIiIGlkPSJGaWxsLTEiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTYuMDI3LDI1LjYzNiBMMTQyLjYwMyw1Mi41MjcgQzE0My44MDcsNTMuMjIyIDE0NC41ODIsNTQuMTE0IDE0NC44NDUsNTUuMDY4IEwxNDQuODM1LDU1LjA3NSBMNjMuNDYxLDEwMi4wNTcgTDYzLjQ2LDEwMi4wNTcgQzYxLjgwNiwxMDEuOTA1IDYwLjI2MSwxMDEuNDU3IDU5LjA1NywxMDAuNzYyIEwxMi40ODEsNzMuODcxIEw5Ni4wMjcsMjUuNjM2IiBpZD0iRmlsbC0yIiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYzLjQ2MSwxMDIuMTc0IEM2My40NTMsMTAyLjE3NCA2My40NDYsMTAyLjE3NCA2My40MzksMTAyLjE3MiBDNjEuNzQ2LDEwMi4wMTYgNjAuMjExLDEwMS41NjMgNTguOTk4LDEwMC44NjMgTDEyLjQyMiw3My45NzMgQzEyLjM4Niw3My45NTIgMTIuMzY0LDczLjkxNCAxMi4zNjQsNzMuODcxIEMxMi4zNjQsNzMuODMgMTIuMzg2LDczLjc5MSAxMi40MjIsNzMuNzcgTDk1Ljk2OCwyNS41MzUgQzk2LjAwNCwyNS41MTQgOTYuMDQ5LDI1LjUxNCA5Ni4wODUsMjUuNTM1IEwxNDIuNjYxLDUyLjQyNiBDMTQzLjg4OCw1My4xMzQgMTQ0LjY4Miw1NC4wMzggMTQ0Ljk1Nyw1NS4wMzcgQzE0NC45Nyw1NS4wODMgMTQ0Ljk1Myw1NS4xMzMgMTQ0LjkxNSw1NS4xNjEgQzE0NC45MTEsNTUuMTY1IDE0NC44OTgsNTUuMTc0IDE0NC44OTQsNTUuMTc3IEw2My41MTksMTAyLjE1OCBDNjMuNTAxLDEwMi4xNjkgNjMuNDgxLDEwMi4xNzQgNjMuNDYxLDEwMi4xNzQgTDYzLjQ2MSwxMDIuMTc0IFogTTEyLjcxNCw3My44NzEgTDU5LjExNSwxMDAuNjYxIEM2MC4yOTMsMTAxLjM0MSA2MS43ODYsMTAxLjc4MiA2My40MzUsMTAxLjkzNyBMMTQ0LjcwNyw1NS4wMTUgQzE0NC40MjgsNTQuMTA4IDE0My42ODIsNTMuMjg1IDE0Mi41NDQsNTIuNjI4IEw5Ni4wMjcsMjUuNzcxIEwxMi43MTQsNzMuODcxIEwxMi43MTQsNzMuODcxIFoiIGlkPSJGaWxsLTMiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQ4LjMyNyw1OC40NzEgQzE0OC4xNDUsNTguNDggMTQ3Ljk2Miw1OC40OCAxNDcuNzgxLDU4LjQ3MiBDMTQ1Ljg4Nyw1OC4zODkgMTQ0LjQ3OSw1Ny40MzQgMTQ0LjYzNiw1Ni4zNCBDMTQ0LjY4OSw1NS45NjcgMTQ0LjY2NCw1NS41OTcgMTQ0LjU2NCw1NS4yMzUgTDYzLjQ2MSwxMDIuMDU3IEM2NC4wODksMTAyLjExNSA2NC43MzMsMTAyLjEzIDY1LjM3OSwxMDIuMDk5IEM2NS41NjEsMTAyLjA5IDY1Ljc0MywxMDIuMDkgNjUuOTI1LDEwMi4wOTggQzY3LjgxOSwxMDIuMTgxIDY5LjIyNywxMDMuMTM2IDY5LjA3LDEwNC4yMyBMMTQ4LjMyNyw1OC40NzEiIGlkPSJGaWxsLTQiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNjkuMDcsMTA0LjM0NyBDNjkuMDQ4LDEwNC4zNDcgNjkuMDI1LDEwNC4zNCA2OS4wMDUsMTA0LjMyNyBDNjguOTY4LDEwNC4zMDEgNjguOTQ4LDEwNC4yNTcgNjguOTU1LDEwNC4yMTMgQzY5LDEwMy44OTYgNjguODk4LDEwMy41NzYgNjguNjU4LDEwMy4yODggQzY4LjE1MywxMDIuNjc4IDY3LjEwMywxMDIuMjY2IDY1LjkyLDEwMi4yMTQgQzY1Ljc0MiwxMDIuMjA2IDY1LjU2MywxMDIuMjA3IDY1LjM4NSwxMDIuMjE1IEM2NC43NDIsMTAyLjI0NiA2NC4wODcsMTAyLjIzMiA2My40NSwxMDIuMTc0IEM2My4zOTksMTAyLjE2OSA2My4zNTgsMTAyLjEzMiA2My4zNDcsMTAyLjA4MiBDNjMuMzM2LDEwMi4wMzMgNjMuMzU4LDEwMS45ODEgNjMuNDAyLDEwMS45NTYgTDE0NC41MDYsNTUuMTM0IEMxNDQuNTM3LDU1LjExNiAxNDQuNTc1LDU1LjExMyAxNDQuNjA5LDU1LjEyNyBDMTQ0LjY0Miw1NS4xNDEgMTQ0LjY2OCw1NS4xNyAxNDQuNjc3LDU1LjIwNCBDMTQ0Ljc4MSw1NS41ODUgMTQ0LjgwNiw1NS45NzIgMTQ0Ljc1MSw1Ni4zNTcgQzE0NC43MDYsNTYuNjczIDE0NC44MDgsNTYuOTk0IDE0NS4wNDcsNTcuMjgyIEMxNDUuNTUzLDU3Ljg5MiAxNDYuNjAyLDU4LjMwMyAxNDcuNzg2LDU4LjM1NSBDMTQ3Ljk2NCw1OC4zNjMgMTQ4LjE0Myw1OC4zNjMgMTQ4LjMyMSw1OC4zNTQgQzE0OC4zNzcsNTguMzUyIDE0OC40MjQsNTguMzg3IDE0OC40MzksNTguNDM4IEMxNDguNDU0LDU4LjQ5IDE0OC40MzIsNTguNTQ1IDE0OC4zODUsNTguNTcyIEw2OS4xMjksMTA0LjMzMSBDNjkuMTExLDEwNC4zNDIgNjkuMDksMTA0LjM0NyA2OS4wNywxMDQuMzQ3IEw2OS4wNywxMDQuMzQ3IFogTTY1LjY2NSwxMDEuOTc1IEM2NS43NTQsMTAxLjk3NSA2NS44NDIsMTAxLjk3NyA2NS45MywxMDEuOTgxIEM2Ny4xOTYsMTAyLjAzNyA2OC4yODMsMTAyLjQ2OSA2OC44MzgsMTAzLjEzOSBDNjkuMDY1LDEwMy40MTMgNjkuMTg4LDEwMy43MTQgNjkuMTk4LDEwNC4wMjEgTDE0Ny44ODMsNTguNTkyIEMxNDcuODQ3LDU4LjU5MiAxNDcuODExLDU4LjU5MSAxNDcuNzc2LDU4LjU4OSBDMTQ2LjUwOSw1OC41MzMgMTQ1LjQyMiw1OC4xIDE0NC44NjcsNTcuNDMxIEMxNDQuNTg1LDU3LjA5MSAxNDQuNDY1LDU2LjcwNyAxNDQuNTIsNTYuMzI0IEMxNDQuNTYzLDU2LjAyMSAxNDQuNTUyLDU1LjcxNiAxNDQuNDg4LDU1LjQxNCBMNjMuODQ2LDEwMS45NyBDNjQuMzUzLDEwMi4wMDIgNjQuODY3LDEwMi4wMDYgNjUuMzc0LDEwMS45ODIgQzY1LjQ3MSwxMDEuOTc3IDY1LjU2OCwxMDEuOTc1IDY1LjY2NSwxMDEuOTc1IEw2NS42NjUsMTAxLjk3NSBaIiBpZD0iRmlsbC01IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIuMjA4LDU1LjEzNCBDMS4yMDcsNTMuMzA3IDEuOTY3LDUwLjkxNyAzLjkwNiw0OS43OTcgTDU5LjkxNywxNy40NTMgQzYxLjg1NiwxNi4zMzMgNjQuMjQxLDE2LjkwNyA2NS4yNDMsMTguNzM0IEw2NS40NzUsMTkuMTQ0IEM2NS44NzIsMTkuODgyIDY2LjM2OCwyMC41NiA2Ni45NDUsMjEuMTY1IEw2Ny4yMjMsMjEuNDM1IEM3MC41NDgsMjQuNjQ5IDc1LjgwNiwyNS4xNTEgODAuMTExLDIyLjY2NSBMODcuNDMsMTguNDQ1IEM4OS4zNywxNy4zMjYgOTEuNzU0LDE3Ljg5OSA5Mi43NTUsMTkuNzI3IEw5Ni4wMDUsMjUuNjU1IEwxMi40ODYsNzMuODg0IEwyLjIwOCw1NS4xMzQgWiIgaWQ9IkZpbGwtNiIgZmlsbD0iI0ZBRkFGQSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi40ODYsNzQuMDAxIEMxMi40NzYsNzQuMDAxIDEyLjQ2NSw3My45OTkgMTIuNDU1LDczLjk5NiBDMTIuNDI0LDczLjk4OCAxMi4zOTksNzMuOTY3IDEyLjM4NCw3My45NCBMMi4xMDYsNTUuMTkgQzEuMDc1LDUzLjMxIDEuODU3LDUwLjg0NSAzLjg0OCw0OS42OTYgTDU5Ljg1OCwxNy4zNTIgQzYwLjUyNSwxNi45NjcgNjEuMjcxLDE2Ljc2NCA2Mi4wMTYsMTYuNzY0IEM2My40MzEsMTYuNzY0IDY0LjY2NiwxNy40NjYgNjUuMzI3LDE4LjY0NiBDNjUuMzM3LDE4LjY1NCA2NS4zNDUsMTguNjYzIDY1LjM1MSwxOC42NzQgTDY1LjU3OCwxOS4wODggQzY1LjU4NCwxOS4xIDY1LjU4OSwxOS4xMTIgNjUuNTkxLDE5LjEyNiBDNjUuOTg1LDE5LjgzOCA2Ni40NjksMjAuNDk3IDY3LjAzLDIxLjA4NSBMNjcuMzA1LDIxLjM1MSBDNjkuMTUxLDIzLjEzNyA3MS42NDksMjQuMTIgNzQuMzM2LDI0LjEyIEM3Ni4zMTMsMjQuMTIgNzguMjksMjMuNTgyIDgwLjA1MywyMi41NjMgQzgwLjA2NCwyMi41NTcgODAuMDc2LDIyLjU1MyA4MC4wODgsMjIuNTUgTDg3LjM3MiwxOC4zNDQgQzg4LjAzOCwxNy45NTkgODguNzg0LDE3Ljc1NiA4OS41MjksMTcuNzU2IEM5MC45NTYsMTcuNzU2IDkyLjIwMSwxOC40NzIgOTIuODU4LDE5LjY3IEw5Ni4xMDcsMjUuNTk5IEM5Ni4xMzgsMjUuNjU0IDk2LjExOCwyNS43MjQgOTYuMDYzLDI1Ljc1NiBMMTIuNTQ1LDczLjk4NSBDMTIuNTI2LDczLjk5NiAxMi41MDYsNzQuMDAxIDEyLjQ4Niw3NC4wMDEgTDEyLjQ4Niw3NC4wMDEgWiBNNjIuMDE2LDE2Ljk5NyBDNjEuMzEyLDE2Ljk5NyA2MC42MDYsMTcuMTkgNTkuOTc1LDE3LjU1NCBMMy45NjUsNDkuODk5IEMyLjA4Myw1MC45ODUgMS4zNDEsNTMuMzA4IDIuMzEsNTUuMDc4IEwxMi41MzEsNzMuNzIzIEw5NS44NDgsMjUuNjExIEw5Mi42NTMsMTkuNzgyIEM5Mi4wMzgsMTguNjYgOTAuODcsMTcuOTkgODkuNTI5LDE3Ljk5IEM4OC44MjUsMTcuOTkgODguMTE5LDE4LjE4MiA4Ny40ODksMTguNTQ3IEw4MC4xNzIsMjIuNzcyIEM4MC4xNjEsMjIuNzc4IDgwLjE0OSwyMi43ODIgODAuMTM3LDIyLjc4NSBDNzguMzQ2LDIzLjgxMSA3Ni4zNDEsMjQuMzU0IDc0LjMzNiwyNC4zNTQgQzcxLjU4OCwyNC4zNTQgNjkuMDMzLDIzLjM0NyA2Ny4xNDIsMjEuNTE5IEw2Ni44NjQsMjEuMjQ5IEM2Ni4yNzcsMjAuNjM0IDY1Ljc3NCwxOS45NDcgNjUuMzY3LDE5LjIwMyBDNjUuMzYsMTkuMTkyIDY1LjM1NiwxOS4xNzkgNjUuMzU0LDE5LjE2NiBMNjUuMTYzLDE4LjgxOSBDNjUuMTU0LDE4LjgxMSA2NS4xNDYsMTguODAxIDY1LjE0LDE4Ljc5IEM2NC41MjUsMTcuNjY3IDYzLjM1NywxNi45OTcgNjIuMDE2LDE2Ljk5NyBMNjIuMDE2LDE2Ljk5NyBaIiBpZD0iRmlsbC03IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTQyLjQzNCw0OC44MDggTDQyLjQzNCw0OC44MDggQzM5LjkyNCw0OC44MDcgMzcuNzM3LDQ3LjU1IDM2LjU4Miw0NS40NDMgQzM0Ljc3MSw0Mi4xMzkgMzYuMTQ0LDM3LjgwOSAzOS42NDEsMzUuNzg5IEw1MS45MzIsMjguNjkxIEM1My4xMDMsMjguMDE1IDU0LjQxMywyNy42NTggNTUuNzIxLDI3LjY1OCBDNTguMjMxLDI3LjY1OCA2MC40MTgsMjguOTE2IDYxLjU3MywzMS4wMjMgQzYzLjM4NCwzNC4zMjcgNjIuMDEyLDM4LjY1NyA1OC41MTQsNDAuNjc3IEw0Ni4yMjMsNDcuNzc1IEM0NS4wNTMsNDguNDUgNDMuNzQyLDQ4LjgwOCA0Mi40MzQsNDguODA4IEw0Mi40MzQsNDguODA4IFogTTU1LjcyMSwyOC4xMjUgQzU0LjQ5NSwyOC4xMjUgNTMuMjY1LDI4LjQ2MSA1Mi4xNjYsMjkuMDk2IEwzOS44NzUsMzYuMTk0IEMzNi41OTYsMzguMDg3IDM1LjMwMiw0Mi4xMzYgMzYuOTkyLDQ1LjIxOCBDMzguMDYzLDQ3LjE3MyA0MC4wOTgsNDguMzQgNDIuNDM0LDQ4LjM0IEM0My42NjEsNDguMzQgNDQuODksNDguMDA1IDQ1Ljk5LDQ3LjM3IEw1OC4yODEsNDAuMjcyIEM2MS41NiwzOC4zNzkgNjIuODUzLDM0LjMzIDYxLjE2NCwzMS4yNDggQzYwLjA5MiwyOS4yOTMgNTguMDU4LDI4LjEyNSA1NS43MjEsMjguMTI1IEw1NS43MjEsMjguMTI1IFoiIGlkPSJGaWxsLTgiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQ5LjU4OCwyLjQwNyBDMTQ5LjU4OCwyLjQwNyAxNTUuNzY4LDUuOTc1IDE1Ni4zMjUsNi4yOTcgTDE1Ni4zMjUsNy4xODQgQzE1Ni4zMjUsNy4zNiAxNTYuMzM4LDcuNTQ0IDE1Ni4zNjIsNy43MzMgQzE1Ni4zNzMsNy44MTQgMTU2LjM4Miw3Ljg5NCAxNTYuMzksNy45NzUgQzE1Ni41Myw5LjM5IDE1Ny4zNjMsMTAuOTczIDE1OC40OTUsMTEuOTc0IEwxNjUuODkxLDE4LjUxOSBDMTY2LjA2OCwxOC42NzUgMTY2LjI0OSwxOC44MTQgMTY2LjQzMiwxOC45MzQgQzE2OC4wMTEsMTkuOTc0IDE2OS4zODIsMTkuNCAxNjkuNDk0LDE3LjY1MiBDMTY5LjU0MywxNi44NjggMTY5LjU1MSwxNi4wNTcgMTY5LjUxNywxNS4yMjMgTDE2OS41MTQsMTUuMDYzIEwxNjkuNTE0LDEzLjkxMiBDMTcwLjc4LDE0LjY0MiAxOTUuNTAxLDI4LjkxNSAxOTUuNTAxLDI4LjkxNSBMMTk1LjUwMSw4Mi45MTUgQzE5NS41MDEsODQuMDA1IDE5NC43MzEsODQuNDQ1IDE5My43ODEsODMuODk3IEwxNTEuMzA4LDU5LjM3NCBDMTUwLjM1OCw1OC44MjYgMTQ5LjU4OCw1Ny40OTcgMTQ5LjU4OCw1Ni40MDggTDE0OS41ODgsMjIuMzc1IiBpZD0iRmlsbC05IiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5NC41NTMsODQuMjUgQzE5NC4yOTYsODQuMjUgMTk0LjAxMyw4NC4xNjUgMTkzLjcyMiw4My45OTcgTDE1MS4yNSw1OS40NzYgQzE1MC4yNjksNTguOTA5IDE0OS40NzEsNTcuNTMzIDE0OS40NzEsNTYuNDA4IEwxNDkuNDcxLDIyLjM3NSBMMTQ5LjcwNSwyMi4zNzUgTDE0OS43MDUsNTYuNDA4IEMxNDkuNzA1LDU3LjQ1OSAxNTAuNDUsNTguNzQ0IDE1MS4zNjYsNTkuMjc0IEwxOTMuODM5LDgzLjc5NSBDMTk0LjI2Myw4NC4wNCAxOTQuNjU1LDg0LjA4MyAxOTQuOTQyLDgzLjkxNyBDMTk1LjIyNyw4My43NTMgMTk1LjM4NCw4My4zOTcgMTk1LjM4NCw4Mi45MTUgTDE5NS4zODQsMjguOTgyIEMxOTQuMTAyLDI4LjI0MiAxNzIuMTA0LDE1LjU0MiAxNjkuNjMxLDE0LjExNCBMMTY5LjYzNCwxNS4yMiBDMTY5LjY2OCwxNi4wNTIgMTY5LjY2LDE2Ljg3NCAxNjkuNjEsMTcuNjU5IEMxNjkuNTU2LDE4LjUwMyAxNjkuMjE0LDE5LjEyMyAxNjguNjQ3LDE5LjQwNSBDMTY4LjAyOCwxOS43MTQgMTY3LjE5NywxOS41NzggMTY2LjM2NywxOS4wMzIgQzE2Ni4xODEsMTguOTA5IDE2NS45OTUsMTguNzY2IDE2NS44MTQsMTguNjA2IEwxNTguNDE3LDEyLjA2MiBDMTU3LjI1OSwxMS4wMzYgMTU2LjQxOCw5LjQzNyAxNTYuMjc0LDcuOTg2IEMxNTYuMjY2LDcuOTA3IDE1Ni4yNTcsNy44MjcgMTU2LjI0Nyw3Ljc0OCBDMTU2LjIyMSw3LjU1NSAxNTYuMjA5LDcuMzY1IDE1Ni4yMDksNy4xODQgTDE1Ni4yMDksNi4zNjQgQzE1NS4zNzUsNS44ODMgMTQ5LjUyOSwyLjUwOCAxNDkuNTI5LDIuNTA4IEwxNDkuNjQ2LDIuMzA2IEMxNDkuNjQ2LDIuMzA2IDE1NS44MjcsNS44NzQgMTU2LjM4NCw2LjE5NiBMMTU2LjQ0Miw2LjIzIEwxNTYuNDQyLDcuMTg0IEMxNTYuNDQyLDcuMzU1IDE1Ni40NTQsNy41MzUgMTU2LjQ3OCw3LjcxNyBDMTU2LjQ4OSw3LjggMTU2LjQ5OSw3Ljg4MiAxNTYuNTA3LDcuOTYzIEMxNTYuNjQ1LDkuMzU4IDE1Ny40NTUsMTAuODk4IDE1OC41NzIsMTEuODg2IEwxNjUuOTY5LDE4LjQzMSBDMTY2LjE0MiwxOC41ODQgMTY2LjMxOSwxOC43MiAxNjYuNDk2LDE4LjgzNyBDMTY3LjI1NCwxOS4zMzYgMTY4LDE5LjQ2NyAxNjguNTQzLDE5LjE5NiBDMTY5LjAzMywxOC45NTMgMTY5LjMyOSwxOC40MDEgMTY5LjM3NywxNy42NDUgQzE2OS40MjcsMTYuODY3IDE2OS40MzQsMTYuMDU0IDE2OS40MDEsMTUuMjI4IEwxNjkuMzk3LDE1LjA2NSBMMTY5LjM5NywxMy43MSBMMTY5LjU3MiwxMy44MSBDMTcwLjgzOSwxNC41NDEgMTk1LjU1OSwyOC44MTQgMTk1LjU1OSwyOC44MTQgTDE5NS42MTgsMjguODQ3IEwxOTUuNjE4LDgyLjkxNSBDMTk1LjYxOCw4My40ODQgMTk1LjQyLDgzLjkxMSAxOTUuMDU5LDg0LjExOSBDMTk0LjkwOCw4NC4yMDYgMTk0LjczNyw4NC4yNSAxOTQuNTUzLDg0LjI1IiBpZD0iRmlsbC0xMCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNDUuNjg1LDU2LjE2MSBMMTY5LjgsNzAuMDgzIEwxNDMuODIyLDg1LjA4MSBMMTQyLjM2LDg0Ljc3NCBDMTM1LjgyNiw4Mi42MDQgMTI4LjczMiw4MS4wNDYgMTIxLjM0MSw4MC4xNTggQzExNi45NzYsNzkuNjM0IDExMi42NzgsODEuMjU0IDExMS43NDMsODMuNzc4IEMxMTEuNTA2LDg0LjQxNCAxMTEuNTAzLDg1LjA3MSAxMTEuNzMyLDg1LjcwNiBDMTEzLjI3LDg5Ljk3MyAxMTUuOTY4LDk0LjA2OSAxMTkuNzI3LDk3Ljg0MSBMMTIwLjI1OSw5OC42ODYgQzEyMC4yNiw5OC42ODUgOTQuMjgyLDExMy42ODMgOTQuMjgyLDExMy42ODMgTDcwLjE2Nyw5OS43NjEgTDE0NS42ODUsNTYuMTYxIiBpZD0iRmlsbC0xMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05NC4yODIsMTEzLjgxOCBMOTQuMjIzLDExMy43ODUgTDY5LjkzMyw5OS43NjEgTDcwLjEwOCw5OS42NiBMMTQ1LjY4NSw1Ni4wMjYgTDE0NS43NDMsNTYuMDU5IEwxNzAuMDMzLDcwLjA4MyBMMTQzLjg0Miw4NS4yMDUgTDE0My43OTcsODUuMTk1IEMxNDMuNzcyLDg1LjE5IDE0Mi4zMzYsODQuODg4IDE0Mi4zMzYsODQuODg4IEMxMzUuNzg3LDgyLjcxNCAxMjguNzIzLDgxLjE2MyAxMjEuMzI3LDgwLjI3NCBDMTIwLjc4OCw4MC4yMDkgMTIwLjIzNiw4MC4xNzcgMTE5LjY4OSw4MC4xNzcgQzExNS45MzEsODAuMTc3IDExMi42MzUsODEuNzA4IDExMS44NTIsODMuODE5IEMxMTEuNjI0LDg0LjQzMiAxMTEuNjIxLDg1LjA1MyAxMTEuODQyLDg1LjY2NyBDMTEzLjM3Nyw4OS45MjUgMTE2LjA1OCw5My45OTMgMTE5LjgxLDk3Ljc1OCBMMTE5LjgyNiw5Ny43NzkgTDEyMC4zNTIsOTguNjE0IEMxMjAuMzU0LDk4LjYxNyAxMjAuMzU2LDk4LjYyIDEyMC4zNTgsOTguNjI0IEwxMjAuNDIyLDk4LjcyNiBMMTIwLjMxNyw5OC43ODcgQzEyMC4yNjQsOTguODE4IDk0LjU5OSwxMTMuNjM1IDk0LjM0LDExMy43ODUgTDk0LjI4MiwxMTMuODE4IEw5NC4yODIsMTEzLjgxOCBaIE03MC40MDEsOTkuNzYxIEw5NC4yODIsMTEzLjU0OSBMMTE5LjA4NCw5OS4yMjkgQzExOS42Myw5OC45MTQgMTE5LjkzLDk4Ljc0IDEyMC4xMDEsOTguNjU0IEwxMTkuNjM1LDk3LjkxNCBDMTE1Ljg2NCw5NC4xMjcgMTEzLjE2OCw5MC4wMzMgMTExLjYyMiw4NS43NDYgQzExMS4zODIsODUuMDc5IDExMS4zODYsODQuNDA0IDExMS42MzMsODMuNzM4IEMxMTIuNDQ4LDgxLjUzOSAxMTUuODM2LDc5Ljk0MyAxMTkuNjg5LDc5Ljk0MyBDMTIwLjI0Niw3OS45NDMgMTIwLjgwNiw3OS45NzYgMTIxLjM1NSw4MC4wNDIgQzEyOC43NjcsODAuOTMzIDEzNS44NDYsODIuNDg3IDE0Mi4zOTYsODQuNjYzIEMxNDMuMjMyLDg0LjgzOCAxNDMuNjExLDg0LjkxNyAxNDMuNzg2LDg0Ljk2NyBMMTY5LjU2Niw3MC4wODMgTDE0NS42ODUsNTYuMjk1IEw3MC40MDEsOTkuNzYxIEw3MC40MDEsOTkuNzYxIFoiIGlkPSJGaWxsLTEyIiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2Ny4yMywxOC45NzkgTDE2Ny4yMyw2OS44NSBMMTM5LjkwOSw4NS42MjMgTDEzMy40NDgsNzEuNDU2IEMxMzIuNTM4LDY5LjQ2IDEzMC4wMiw2OS43MTggMTI3LjgyNCw3Mi4wMyBDMTI2Ljc2OSw3My4xNCAxMjUuOTMxLDc0LjU4NSAxMjUuNDk0LDc2LjA0OCBMMTE5LjAzNCw5Ny42NzYgTDkxLjcxMiwxMTMuNDUgTDkxLjcxMiw2Mi41NzkgTDE2Ny4yMywxOC45NzkiIGlkPSJGaWxsLTEzIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTkxLjcxMiwxMTMuNTY3IEM5MS42OTIsMTEzLjU2NyA5MS42NzIsMTEzLjU2MSA5MS42NTMsMTEzLjU1MSBDOTEuNjE4LDExMy41MyA5MS41OTUsMTEzLjQ5MiA5MS41OTUsMTEzLjQ1IEw5MS41OTUsNjIuNTc5IEM5MS41OTUsNjIuNTM3IDkxLjYxOCw2Mi40OTkgOTEuNjUzLDYyLjQ3OCBMMTY3LjE3MiwxOC44NzggQzE2Ny4yMDgsMTguODU3IDE2Ny4yNTIsMTguODU3IDE2Ny4yODgsMTguODc4IEMxNjcuMzI0LDE4Ljg5OSAxNjcuMzQ3LDE4LjkzNyAxNjcuMzQ3LDE4Ljk3OSBMMTY3LjM0Nyw2OS44NSBDMTY3LjM0Nyw2OS44OTEgMTY3LjMyNCw2OS45MyAxNjcuMjg4LDY5Ljk1IEwxMzkuOTY3LDg1LjcyNSBDMTM5LjkzOSw4NS43NDEgMTM5LjkwNSw4NS43NDUgMTM5Ljg3Myw4NS43MzUgQzEzOS44NDIsODUuNzI1IDEzOS44MTYsODUuNzAyIDEzOS44MDIsODUuNjcyIEwxMzMuMzQyLDcxLjUwNCBDMTMyLjk2Nyw3MC42ODIgMTMyLjI4LDcwLjIyOSAxMzEuNDA4LDcwLjIyOSBDMTMwLjMxOSw3MC4yMjkgMTI5LjA0NCw3MC45MTUgMTI3LjkwOCw3Mi4xMSBDMTI2Ljg3NCw3My4yIDEyNi4wMzQsNzQuNjQ3IDEyNS42MDYsNzYuMDgyIEwxMTkuMTQ2LDk3LjcwOSBDMTE5LjEzNyw5Ny43MzggMTE5LjExOCw5Ny43NjIgMTE5LjA5Miw5Ny43NzcgTDkxLjc3LDExMy41NTEgQzkxLjc1MiwxMTMuNTYxIDkxLjczMiwxMTMuNTY3IDkxLjcxMiwxMTMuNTY3IEw5MS43MTIsMTEzLjU2NyBaIE05MS44MjksNjIuNjQ3IEw5MS44MjksMTEzLjI0OCBMMTE4LjkzNSw5Ny41OTggTDEyNS4zODIsNzYuMDE1IEMxMjUuODI3LDc0LjUyNSAxMjYuNjY0LDczLjA4MSAxMjcuNzM5LDcxLjk1IEMxMjguOTE5LDcwLjcwOCAxMzAuMjU2LDY5Ljk5NiAxMzEuNDA4LDY5Ljk5NiBDMTMyLjM3Nyw2OS45OTYgMTMzLjEzOSw3MC40OTcgMTMzLjU1NCw3MS40MDcgTDEzOS45NjEsODUuNDU4IEwxNjcuMTEzLDY5Ljc4MiBMMTY3LjExMywxOS4xODEgTDkxLjgyOSw2Mi42NDcgTDkxLjgyOSw2Mi42NDcgWiIgaWQ9IkZpbGwtMTQiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTY4LjU0MywxOS4yMTMgTDE2OC41NDMsNzAuMDgzIEwxNDEuMjIxLDg1Ljg1NyBMMTM0Ljc2MSw3MS42ODkgQzEzMy44NTEsNjkuNjk0IDEzMS4zMzMsNjkuOTUxIDEyOS4xMzcsNzIuMjYzIEMxMjguMDgyLDczLjM3NCAxMjcuMjQ0LDc0LjgxOSAxMjYuODA3LDc2LjI4MiBMMTIwLjM0Niw5Ny45MDkgTDkzLjAyNSwxMTMuNjgzIEw5My4wMjUsNjIuODEzIEwxNjguNTQzLDE5LjIxMyIgaWQ9IkZpbGwtMTUiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTMuMDI1LDExMy44IEM5My4wMDUsMTEzLjggOTIuOTg0LDExMy43OTUgOTIuOTY2LDExMy43ODUgQzkyLjkzMSwxMTMuNzY0IDkyLjkwOCwxMTMuNzI1IDkyLjkwOCwxMTMuNjg0IEw5Mi45MDgsNjIuODEzIEM5Mi45MDgsNjIuNzcxIDkyLjkzMSw2Mi43MzMgOTIuOTY2LDYyLjcxMiBMMTY4LjQ4NCwxOS4xMTIgQzE2OC41MiwxOS4wOSAxNjguNTY1LDE5LjA5IDE2OC42MDEsMTkuMTEyIEMxNjguNjM3LDE5LjEzMiAxNjguNjYsMTkuMTcxIDE2OC42NiwxOS4yMTIgTDE2OC42Niw3MC4wODMgQzE2OC42Niw3MC4xMjUgMTY4LjYzNyw3MC4xNjQgMTY4LjYwMSw3MC4xODQgTDE0MS4yOCw4NS45NTggQzE0MS4yNTEsODUuOTc1IDE0MS4yMTcsODUuOTc5IDE0MS4xODYsODUuOTY4IEMxNDEuMTU0LDg1Ljk1OCAxNDEuMTI5LDg1LjkzNiAxNDEuMTE1LDg1LjkwNiBMMTM0LjY1NSw3MS43MzggQzEzNC4yOCw3MC45MTUgMTMzLjU5Myw3MC40NjMgMTMyLjcyLDcwLjQ2MyBDMTMxLjYzMiw3MC40NjMgMTMwLjM1Nyw3MS4xNDggMTI5LjIyMSw3Mi4zNDQgQzEyOC4xODYsNzMuNDMzIDEyNy4zNDcsNzQuODgxIDEyNi45MTksNzYuMzE1IEwxMjAuNDU4LDk3Ljk0MyBDMTIwLjQ1LDk3Ljk3MiAxMjAuNDMxLDk3Ljk5NiAxMjAuNDA1LDk4LjAxIEw5My4wODMsMTEzLjc4NSBDOTMuMDY1LDExMy43OTUgOTMuMDQ1LDExMy44IDkzLjAyNSwxMTMuOCBMOTMuMDI1LDExMy44IFogTTkzLjE0Miw2Mi44ODEgTDkzLjE0MiwxMTMuNDgxIEwxMjAuMjQ4LDk3LjgzMiBMMTI2LjY5NSw3Ni4yNDggQzEyNy4xNCw3NC43NTggMTI3Ljk3Nyw3My4zMTUgMTI5LjA1Miw3Mi4xODMgQzEzMC4yMzEsNzAuOTQyIDEzMS41NjgsNzAuMjI5IDEzMi43Miw3MC4yMjkgQzEzMy42ODksNzAuMjI5IDEzNC40NTIsNzAuNzMxIDEzNC44NjcsNzEuNjQxIEwxNDEuMjc0LDg1LjY5MiBMMTY4LjQyNiw3MC4wMTYgTDE2OC40MjYsMTkuNDE1IEw5My4xNDIsNjIuODgxIEw5My4xNDIsNjIuODgxIFoiIGlkPSJGaWxsLTE2IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2OS44LDcwLjA4MyBMMTQyLjQ3OCw4NS44NTcgTDEzNi4wMTgsNzEuNjg5IEMxMzUuMTA4LDY5LjY5NCAxMzIuNTksNjkuOTUxIDEzMC4zOTMsNzIuMjYzIEMxMjkuMzM5LDczLjM3NCAxMjguNSw3NC44MTkgMTI4LjA2NCw3Ni4yODIgTDEyMS42MDMsOTcuOTA5IEw5NC4yODIsMTEzLjY4MyBMOTQuMjgyLDYyLjgxMyBMMTY5LjgsMTkuMjEzIEwxNjkuOCw3MC4wODMgWiIgaWQ9IkZpbGwtMTciIGZpbGw9IiNGQUZBRkEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTQuMjgyLDExMy45MTcgQzk0LjI0MSwxMTMuOTE3IDk0LjIwMSwxMTMuOTA3IDk0LjE2NSwxMTMuODg2IEM5NC4wOTMsMTEzLjg0NSA5NC4wNDgsMTEzLjc2NyA5NC4wNDgsMTEzLjY4NCBMOTQuMDQ4LDYyLjgxMyBDOTQuMDQ4LDYyLjczIDk0LjA5Myw2Mi42NTIgOTQuMTY1LDYyLjYxMSBMMTY5LjY4MywxOS4wMSBDMTY5Ljc1NSwxOC45NjkgMTY5Ljg0NCwxOC45NjkgMTY5LjkxNywxOS4wMSBDMTY5Ljk4OSwxOS4wNTIgMTcwLjAzMywxOS4xMjkgMTcwLjAzMywxOS4yMTIgTDE3MC4wMzMsNzAuMDgzIEMxNzAuMDMzLDcwLjE2NiAxNjkuOTg5LDcwLjI0NCAxNjkuOTE3LDcwLjI4NSBMMTQyLjU5NSw4Ni4wNiBDMTQyLjUzOCw4Ni4wOTIgMTQyLjQ2OSw4Ni4xIDE0Mi40MDcsODYuMDggQzE0Mi4zNDQsODYuMDYgMTQyLjI5Myw4Ni4wMTQgMTQyLjI2Niw4NS45NTQgTDEzNS44MDUsNzEuNzg2IEMxMzUuNDQ1LDcwLjk5NyAxMzQuODEzLDcwLjU4IDEzMy45NzcsNzAuNTggQzEzMi45MjEsNzAuNTggMTMxLjY3Niw3MS4yNTIgMTMwLjU2Miw3Mi40MjQgQzEyOS41NCw3My41MDEgMTI4LjcxMSw3NC45MzEgMTI4LjI4Nyw3Ni4zNDggTDEyMS44MjcsOTcuOTc2IEMxMjEuODEsOTguMDM0IDEyMS43NzEsOTguMDgyIDEyMS43Miw5OC4xMTIgTDk0LjM5OCwxMTMuODg2IEM5NC4zNjIsMTEzLjkwNyA5NC4zMjIsMTEzLjkxNyA5NC4yODIsMTEzLjkxNyBMOTQuMjgyLDExMy45MTcgWiBNOTQuNTE1LDYyLjk0OCBMOTQuNTE1LDExMy4yNzkgTDEyMS40MDYsOTcuNzU0IEwxMjcuODQsNzYuMjE1IEMxMjguMjksNzQuNzA4IDEyOS4xMzcsNzMuMjQ3IDEzMC4yMjQsNzIuMTAzIEMxMzEuNDI1LDcwLjgzOCAxMzIuNzkzLDcwLjExMiAxMzMuOTc3LDcwLjExMiBDMTM0Ljk5NSw3MC4xMTIgMTM1Ljc5NSw3MC42MzggMTM2LjIzLDcxLjU5MiBMMTQyLjU4NCw4NS41MjYgTDE2OS41NjYsNjkuOTQ4IEwxNjkuNTY2LDE5LjYxNyBMOTQuNTE1LDYyLjk0OCBMOTQuNTE1LDYyLjk0OCBaIiBpZD0iRmlsbC0xOCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMDkuODk0LDkyLjk0MyBMMTA5Ljg5NCw5Mi45NDMgQzEwOC4xMiw5Mi45NDMgMTA2LjY1Myw5Mi4yMTggMTA1LjY1LDkwLjgyMyBDMTA1LjU4Myw5MC43MzEgMTA1LjU5Myw5MC42MSAxMDUuNjczLDkwLjUyOSBDMTA1Ljc1Myw5MC40NDggMTA1Ljg4LDkwLjQ0IDEwNS45NzQsOTAuNTA2IEMxMDYuNzU0LDkxLjA1MyAxMDcuNjc5LDkxLjMzMyAxMDguNzI0LDkxLjMzMyBDMTEwLjA0Nyw5MS4zMzMgMTExLjQ3OCw5MC44OTQgMTEyLjk4LDkwLjAyNyBDMTE4LjI5MSw4Ni45NiAxMjIuNjExLDc5LjUwOSAxMjIuNjExLDczLjQxNiBDMTIyLjYxMSw3MS40ODkgMTIyLjE2OSw2OS44NTYgMTIxLjMzMyw2OC42OTIgQzEyMS4yNjYsNjguNiAxMjEuMjc2LDY4LjQ3MyAxMjEuMzU2LDY4LjM5MiBDMTIxLjQzNiw2OC4zMTEgMTIxLjU2Myw2OC4yOTkgMTIxLjY1Niw2OC4zNjUgQzEyMy4zMjcsNjkuNTM3IDEyNC4yNDcsNzEuNzQ2IDEyNC4yNDcsNzQuNTg0IEMxMjQuMjQ3LDgwLjgyNiAxMTkuODIxLDg4LjQ0NyAxMTQuMzgyLDkxLjU4NyBDMTEyLjgwOCw5Mi40OTUgMTExLjI5OCw5Mi45NDMgMTA5Ljg5NCw5Mi45NDMgTDEwOS44OTQsOTIuOTQzIFogTTEwNi45MjUsOTEuNDAxIEMxMDcuNzM4LDkyLjA1MiAxMDguNzQ1LDkyLjI3OCAxMDkuODkzLDkyLjI3OCBMMTA5Ljg5NCw5Mi4yNzggQzExMS4yMTUsOTIuMjc4IDExMi42NDcsOTEuOTUxIDExNC4xNDgsOTEuMDg0IEMxMTkuNDU5LDg4LjAxNyAxMjMuNzgsODAuNjIxIDEyMy43OCw3NC41MjggQzEyMy43OCw3Mi41NDkgMTIzLjMxNyw3MC45MjkgMTIyLjQ1NCw2OS43NjcgQzEyMi44NjUsNzAuODAyIDEyMy4wNzksNzIuMDQyIDEyMy4wNzksNzMuNDAyIEMxMjMuMDc5LDc5LjY0NSAxMTguNjUzLDg3LjI4NSAxMTMuMjE0LDkwLjQyNSBDMTExLjY0LDkxLjMzNCAxMTAuMTMsOTEuNzQyIDEwOC43MjQsOTEuNzQyIEMxMDguMDgzLDkxLjc0MiAxMDcuNDgxLDkxLjU5MyAxMDYuOTI1LDkxLjQwMSBMMTA2LjkyNSw5MS40MDEgWiIgaWQ9IkZpbGwtMTkiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEzLjA5Nyw5MC4yMyBDMTE4LjQ4MSw4Ny4xMjIgMTIyLjg0NSw3OS41OTQgMTIyLjg0NSw3My40MTYgQzEyMi44NDUsNzEuMzY1IDEyMi4zNjIsNjkuNzI0IDEyMS41MjIsNjguNTU2IEMxMTkuNzM4LDY3LjMwNCAxMTcuMTQ4LDY3LjM2MiAxMTQuMjY1LDY5LjAyNiBDMTA4Ljg4MSw3Mi4xMzQgMTA0LjUxNyw3OS42NjIgMTA0LjUxNyw4NS44NCBDMTA0LjUxNyw4Ny44OTEgMTA1LDg5LjUzMiAxMDUuODQsOTAuNyBDMTA3LjYyNCw5MS45NTIgMTEwLjIxNCw5MS44OTQgMTEzLjA5Nyw5MC4yMyIgaWQ9IkZpbGwtMjAiIGZpbGw9IiNGQUZBRkEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTA4LjcyNCw5MS42MTQgTDEwOC43MjQsOTEuNjE0IEMxMDcuNTgyLDkxLjYxNCAxMDYuNTY2LDkxLjQwMSAxMDUuNzA1LDkwLjc5NyBDMTA1LjY4NCw5MC43ODMgMTA1LjY2NSw5MC44MTEgMTA1LjY1LDkwLjc5IEMxMDQuNzU2LDg5LjU0NiAxMDQuMjgzLDg3Ljg0MiAxMDQuMjgzLDg1LjgxNyBDMTA0LjI4Myw3OS41NzUgMTA4LjcwOSw3MS45NTMgMTE0LjE0OCw2OC44MTIgQzExNS43MjIsNjcuOTA0IDExNy4yMzIsNjcuNDQ5IDExOC42MzgsNjcuNDQ5IEMxMTkuNzgsNjcuNDQ5IDEyMC43OTYsNjcuNzU4IDEyMS42NTYsNjguMzYyIEMxMjEuNjc4LDY4LjM3NyAxMjEuNjk3LDY4LjM5NyAxMjEuNzEyLDY4LjQxOCBDMTIyLjYwNiw2OS42NjIgMTIzLjA3OSw3MS4zOSAxMjMuMDc5LDczLjQxNSBDMTIzLjA3OSw3OS42NTggMTE4LjY1Myw4Ny4xOTggMTEzLjIxNCw5MC4zMzggQzExMS42NCw5MS4yNDcgMTEwLjEzLDkxLjYxNCAxMDguNzI0LDkxLjYxNCBMMTA4LjcyNCw5MS42MTQgWiBNMTA2LjAwNiw5MC41MDUgQzEwNi43OCw5MS4wMzcgMTA3LjY5NCw5MS4yODEgMTA4LjcyNCw5MS4yODEgQzExMC4wNDcsOTEuMjgxIDExMS40NzgsOTAuODY4IDExMi45OCw5MC4wMDEgQzExOC4yOTEsODYuOTM1IDEyMi42MTEsNzkuNDk2IDEyMi42MTEsNzMuNDAzIEMxMjIuNjExLDcxLjQ5NCAxMjIuMTc3LDY5Ljg4IDEyMS4zNTYsNjguNzE4IEMxMjAuNTgyLDY4LjE4NSAxMTkuNjY4LDY3LjkxOSAxMTguNjM4LDY3LjkxOSBDMTE3LjMxNSw2Ny45MTkgMTE1Ljg4Myw2OC4zNiAxMTQuMzgyLDY5LjIyNyBDMTA5LjA3MSw3Mi4yOTMgMTA0Ljc1MSw3OS43MzMgMTA0Ljc1MSw4NS44MjYgQzEwNC43NTEsODcuNzM1IDEwNS4xODUsODkuMzQzIDEwNi4wMDYsOTAuNTA1IEwxMDYuMDA2LDkwLjUwNSBaIiBpZD0iRmlsbC0yMSIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNDkuMzE4LDcuMjYyIEwxMzkuMzM0LDE2LjE0IEwxNTUuMjI3LDI3LjE3MSBMMTYwLjgxNiwyMS4wNTkgTDE0OS4zMTgsNy4yNjIiIGlkPSJGaWxsLTIyIiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2OS42NzYsMTMuODQgTDE1OS45MjgsMTkuNDY3IEMxNTYuMjg2LDIxLjU3IDE1MC40LDIxLjU4IDE0Ni43ODEsMTkuNDkxIEMxNDMuMTYxLDE3LjQwMiAxNDMuMTgsMTQuMDAzIDE0Ni44MjIsMTEuOSBMMTU2LjMxNyw2LjI5MiBMMTQ5LjU4OCwyLjQwNyBMNjcuNzUyLDQ5LjQ3OCBMMTEzLjY3NSw3NS45OTIgTDExNi43NTYsNzQuMjEzIEMxMTcuMzg3LDczLjg0OCAxMTcuNjI1LDczLjMxNSAxMTcuMzc0LDcyLjgyMyBDMTE1LjAxNyw2OC4xOTEgMTE0Ljc4MSw2My4yNzcgMTE2LjY5MSw1OC41NjEgQzEyMi4zMjksNDQuNjQxIDE0MS4yLDMzLjc0NiAxNjUuMzA5LDMwLjQ5MSBDMTczLjQ3OCwyOS4zODggMTgxLjk4OSwyOS41MjQgMTkwLjAxMywzMC44ODUgQzE5MC44NjUsMzEuMDMgMTkxLjc4OSwzMC44OTMgMTkyLjQyLDMwLjUyOCBMMTk1LjUwMSwyOC43NSBMMTY5LjY3NiwxMy44NCIgaWQ9IkZpbGwtMjMiIGZpbGw9IiNGQUZBRkEiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEzLjY3NSw3Ni40NTkgQzExMy41OTQsNzYuNDU5IDExMy41MTQsNzYuNDM4IDExMy40NDIsNzYuMzk3IEw2Ny41MTgsNDkuODgyIEM2Ny4zNzQsNDkuNzk5IDY3LjI4NCw0OS42NDUgNjcuMjg1LDQ5LjQ3OCBDNjcuMjg1LDQ5LjMxMSA2Ny4zNzQsNDkuMTU3IDY3LjUxOSw0OS4wNzMgTDE0OS4zNTUsMi4wMDIgQzE0OS40OTksMS45MTkgMTQ5LjY3NywxLjkxOSAxNDkuODIxLDIuMDAyIEwxNTYuNTUsNS44ODcgQzE1Ni43NzQsNi4wMTcgMTU2Ljg1LDYuMzAyIDE1Ni43MjIsNi41MjYgQzE1Ni41OTIsNi43NDkgMTU2LjMwNyw2LjgyNiAxNTYuMDgzLDYuNjk2IEwxNDkuNTg3LDIuOTQ2IEw2OC42ODcsNDkuNDc5IEwxMTMuNjc1LDc1LjQ1MiBMMTE2LjUyMyw3My44MDggQzExNi43MTUsNzMuNjk3IDExNy4xNDMsNzMuMzk5IDExNi45NTgsNzMuMDM1IEMxMTQuNTQyLDY4LjI4NyAxMTQuMyw2My4yMjEgMTE2LjI1OCw1OC4zODUgQzExOS4wNjQsNTEuNDU4IDEyNS4xNDMsNDUuMTQzIDEzMy44NCw0MC4xMjIgQzE0Mi40OTcsMzUuMTI0IDE1My4zNTgsMzEuNjMzIDE2NS4yNDcsMzAuMDI4IEMxNzMuNDQ1LDI4LjkyMSAxODIuMDM3LDI5LjA1OCAxOTAuMDkxLDMwLjQyNSBDMTkwLjgzLDMwLjU1IDE5MS42NTIsMzAuNDMyIDE5Mi4xODYsMzAuMTI0IEwxOTQuNTY3LDI4Ljc1IEwxNjkuNDQyLDE0LjI0NCBDMTY5LjIxOSwxNC4xMTUgMTY5LjE0MiwxMy44MjkgMTY5LjI3MSwxMy42MDYgQzE2OS40LDEzLjM4MiAxNjkuNjg1LDEzLjMwNiAxNjkuOTA5LDEzLjQzNSBMMTk1LjczNCwyOC4zNDUgQzE5NS44NzksMjguNDI4IDE5NS45NjgsMjguNTgzIDE5NS45NjgsMjguNzUgQzE5NS45NjgsMjguOTE2IDE5NS44NzksMjkuMDcxIDE5NS43MzQsMjkuMTU0IEwxOTIuNjUzLDMwLjkzMyBDMTkxLjkzMiwzMS4zNSAxOTAuODksMzEuNTA4IDE4OS45MzUsMzEuMzQ2IEMxODEuOTcyLDI5Ljk5NSAxNzMuNDc4LDI5Ljg2IDE2NS4zNzIsMzAuOTU0IEMxNTMuNjAyLDMyLjU0MyAxNDIuODYsMzUuOTkzIDEzNC4zMDcsNDAuOTMxIEMxMjUuNzkzLDQ1Ljg0NyAxMTkuODUxLDUyLjAwNCAxMTcuMTI0LDU4LjczNiBDMTE1LjI3LDYzLjMxNCAxMTUuNTAxLDY4LjExMiAxMTcuNzksNzIuNjExIEMxMTguMTYsNzMuMzM2IDExNy44NDUsNzQuMTI0IDExNi45OSw3NC42MTcgTDExMy45MDksNzYuMzk3IEMxMTMuODM2LDc2LjQzOCAxMTMuNzU2LDc2LjQ1OSAxMTMuNjc1LDc2LjQ1OSIgaWQ9IkZpbGwtMjQiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUzLjMxNiwyMS4yNzkgQzE1MC45MDMsMjEuMjc5IDE0OC40OTUsMjAuNzUxIDE0Ni42NjQsMTkuNjkzIEMxNDQuODQ2LDE4LjY0NCAxNDMuODQ0LDE3LjIzMiAxNDMuODQ0LDE1LjcxOCBDMTQzLjg0NCwxNC4xOTEgMTQ0Ljg2LDEyLjc2MyAxNDYuNzA1LDExLjY5OCBMMTU2LjE5OCw2LjA5MSBDMTU2LjMwOSw2LjAyNSAxNTYuNDUyLDYuMDYyIDE1Ni41MTgsNi4xNzMgQzE1Ni41ODMsNi4yODQgMTU2LjU0Nyw2LjQyNyAxNTYuNDM2LDYuNDkzIEwxNDYuOTQsMTIuMTAyIEMxNDUuMjQ0LDEzLjA4MSAxNDQuMzEyLDE0LjM2NSAxNDQuMzEyLDE1LjcxOCBDMTQ0LjMxMiwxNy4wNTggMTQ1LjIzLDE4LjMyNiAxNDYuODk3LDE5LjI4OSBDMTUwLjQ0NiwyMS4zMzggMTU2LjI0LDIxLjMyNyAxNTkuODExLDE5LjI2NSBMMTY5LjU1OSwxMy42MzcgQzE2OS42NywxMy41NzMgMTY5LjgxMywxMy42MTEgMTY5Ljg3OCwxMy43MjMgQzE2OS45NDMsMTMuODM0IDE2OS45MDQsMTMuOTc3IDE2OS43OTMsMTQuMDQyIEwxNjAuMDQ1LDE5LjY3IEMxNTguMTg3LDIwLjc0MiAxNTUuNzQ5LDIxLjI3OSAxNTMuMzE2LDIxLjI3OSIgaWQ9IkZpbGwtMjUiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEzLjY3NSw3NS45OTIgTDY3Ljc2Miw0OS40ODQiIGlkPSJGaWxsLTI2IiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExMy42NzUsNzYuMzQyIEMxMTMuNjE1LDc2LjM0MiAxMTMuNTU1LDc2LjMyNyAxMTMuNSw3Ni4yOTUgTDY3LjU4Nyw0OS43ODcgQzY3LjQxOSw0OS42OSA2Ny4zNjIsNDkuNDc2IDY3LjQ1OSw0OS4zMDkgQzY3LjU1Niw0OS4xNDEgNjcuNzcsNDkuMDgzIDY3LjkzNyw0OS4xOCBMMTEzLjg1LDc1LjY4OCBDMTE0LjAxOCw3NS43ODUgMTE0LjA3NSw3NiAxMTMuOTc4LDc2LjE2NyBDMTEzLjkxNCw3Ni4yNzkgMTEzLjc5Niw3Ni4zNDIgMTEzLjY3NSw3Ni4zNDIiIGlkPSJGaWxsLTI3IiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTY3Ljc2Miw0OS40ODQgTDY3Ljc2MiwxMDMuNDg1IEM2Ny43NjIsMTA0LjU3NSA2OC41MzIsMTA1LjkwMyA2OS40ODIsMTA2LjQ1MiBMMTExLjk1NSwxMzAuOTczIEMxMTIuOTA1LDEzMS41MjIgMTEzLjY3NSwxMzEuMDgzIDExMy42NzUsMTI5Ljk5MyBMMTEzLjY3NSw3NS45OTIiIGlkPSJGaWxsLTI4IiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExMi43MjcsMTMxLjU2MSBDMTEyLjQzLDEzMS41NjEgMTEyLjEwNywxMzEuNDY2IDExMS43OCwxMzEuMjc2IEw2OS4zMDcsMTA2Ljc1NSBDNjguMjQ0LDEwNi4xNDIgNjcuNDEyLDEwNC43MDUgNjcuNDEyLDEwMy40ODUgTDY3LjQxMiw0OS40ODQgQzY3LjQxMiw0OS4yOSA2Ny41NjksNDkuMTM0IDY3Ljc2Miw0OS4xMzQgQzY3Ljk1Niw0OS4xMzQgNjguMTEzLDQ5LjI5IDY4LjExMyw0OS40ODQgTDY4LjExMywxMDMuNDg1IEM2OC4xMTMsMTA0LjQ0NSA2OC44MiwxMDUuNjY1IDY5LjY1NywxMDYuMTQ4IEwxMTIuMTMsMTMwLjY3IEMxMTIuNDc0LDEzMC44NjggMTEyLjc5MSwxMzAuOTEzIDExMywxMzAuNzkyIEMxMTMuMjA2LDEzMC42NzMgMTEzLjMyNSwxMzAuMzgxIDExMy4zMjUsMTI5Ljk5MyBMMTEzLjMyNSw3NS45OTIgQzExMy4zMjUsNzUuNzk4IDExMy40ODIsNzUuNjQxIDExMy42NzUsNzUuNjQxIEMxMTMuODY5LDc1LjY0MSAxMTQuMDI1LDc1Ljc5OCAxMTQuMDI1LDc1Ljk5MiBMMTE0LjAyNSwxMjkuOTkzIEMxMTQuMDI1LDEzMC42NDggMTEzLjc4NiwxMzEuMTQ3IDExMy4zNSwxMzEuMzk5IEMxMTMuMTYyLDEzMS41MDcgMTEyLjk1MiwxMzEuNTYxIDExMi43MjcsMTMxLjU2MSIgaWQ9IkZpbGwtMjkiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTEyLjg2LDQwLjUxMiBDMTEyLjg2LDQwLjUxMiAxMTIuODYsNDAuNTEyIDExMi44NTksNDAuNTEyIEMxMTAuNTQxLDQwLjUxMiAxMDguMzYsMzkuOTkgMTA2LjcxNywzOS4wNDEgQzEwNS4wMTIsMzguMDU3IDEwNC4wNzQsMzYuNzI2IDEwNC4wNzQsMzUuMjkyIEMxMDQuMDc0LDMzLjg0NyAxMDUuMDI2LDMyLjUwMSAxMDYuNzU0LDMxLjUwNCBMMTE4Ljc5NSwyNC41NTEgQzEyMC40NjMsMjMuNTg5IDEyMi42NjksMjMuMDU4IDEyNS4wMDcsMjMuMDU4IEMxMjcuMzI1LDIzLjA1OCAxMjkuNTA2LDIzLjU4MSAxMzEuMTUsMjQuNTMgQzEzMi44NTQsMjUuNTE0IDEzMy43OTMsMjYuODQ1IDEzMy43OTMsMjguMjc4IEMxMzMuNzkzLDI5LjcyNCAxMzIuODQxLDMxLjA2OSAxMzEuMTEzLDMyLjA2NyBMMTE5LjA3MSwzOS4wMTkgQzExNy40MDMsMzkuOTgyIDExNS4xOTcsNDAuNTEyIDExMi44Niw0MC41MTIgTDExMi44Niw0MC41MTIgWiBNMTI1LjAwNywyMy43NTkgQzEyMi43OSwyMy43NTkgMTIwLjcwOSwyNC4yNTYgMTE5LjE0NiwyNS4xNTggTDEwNy4xMDQsMzIuMTEgQzEwNS42MDIsMzIuOTc4IDEwNC43NzQsMzQuMTA4IDEwNC43NzQsMzUuMjkyIEMxMDQuNzc0LDM2LjQ2NSAxMDUuNTg5LDM3LjU4MSAxMDcuMDY3LDM4LjQzNCBDMTA4LjYwNSwzOS4zMjMgMTEwLjY2MywzOS44MTIgMTEyLjg1OSwzOS44MTIgTDExMi44NiwzOS44MTIgQzExNS4wNzYsMzkuODEyIDExNy4xNTgsMzkuMzE1IDExOC43MjEsMzguNDEzIEwxMzAuNzYyLDMxLjQ2IEMxMzIuMjY0LDMwLjU5MyAxMzMuMDkyLDI5LjQ2MyAxMzMuMDkyLDI4LjI3OCBDMTMzLjA5MiwyNy4xMDYgMTMyLjI3OCwyNS45OSAxMzAuOCwyNS4xMzYgQzEyOS4yNjEsMjQuMjQ4IDEyNy4yMDQsMjMuNzU5IDEyNS4wMDcsMjMuNzU5IEwxMjUuMDA3LDIzLjc1OSBaIiBpZD0iRmlsbC0zMCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNjUuNjMsMTYuMjE5IEwxNTkuODk2LDE5LjUzIEMxNTYuNzI5LDIxLjM1OCAxNTEuNjEsMjEuMzY3IDE0OC40NjMsMTkuNTUgQzE0NS4zMTYsMTcuNzMzIDE0NS4zMzIsMTQuNzc4IDE0OC40OTksMTIuOTQ5IEwxNTQuMjMzLDkuNjM5IEwxNjUuNjMsMTYuMjE5IiBpZD0iRmlsbC0zMSIgZmlsbD0iI0ZBRkFGQSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTQuMjMzLDEwLjQ0OCBMMTY0LjIyOCwxNi4yMTkgTDE1OS41NDYsMTguOTIzIEMxNTguMTEyLDE5Ljc1IDE1Ni4xOTQsMjAuMjA2IDE1NC4xNDcsMjAuMjA2IEMxNTIuMTE4LDIwLjIwNiAxNTAuMjI0LDE5Ljc1NyAxNDguODE0LDE4Ljk0MyBDMTQ3LjUyNCwxOC4xOTkgMTQ2LjgxNCwxNy4yNDkgMTQ2LjgxNCwxNi4yNjkgQzE0Ni44MTQsMTUuMjc4IDE0Ny41MzcsMTQuMzE0IDE0OC44NSwxMy41NTYgTDE1NC4yMzMsMTAuNDQ4IE0xNTQuMjMzLDkuNjM5IEwxNDguNDk5LDEyLjk0OSBDMTQ1LjMzMiwxNC43NzggMTQ1LjMxNiwxNy43MzMgMTQ4LjQ2MywxOS41NSBDMTUwLjAzMSwyMC40NTUgMTUyLjA4NiwyMC45MDcgMTU0LjE0NywyMC45MDcgQzE1Ni4yMjQsMjAuOTA3IDE1OC4zMDYsMjAuNDQ3IDE1OS44OTYsMTkuNTMgTDE2NS42MywxNi4yMTkgTDE1NC4yMzMsOS42MzkiIGlkPSJGaWxsLTMyIiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0NS40NDUsNzIuNjY3IEwxNDUuNDQ1LDcyLjY2NyBDMTQzLjY3Miw3Mi42NjcgMTQyLjIwNCw3MS44MTcgMTQxLjIwMiw3MC40MjIgQzE0MS4xMzUsNzAuMzMgMTQxLjE0NSw3MC4xNDcgMTQxLjIyNSw3MC4wNjYgQzE0MS4zMDUsNjkuOTg1IDE0MS40MzIsNjkuOTQ2IDE0MS41MjUsNzAuMDExIEMxNDIuMzA2LDcwLjU1OSAxNDMuMjMxLDcwLjgyMyAxNDQuMjc2LDcwLjgyMiBDMTQ1LjU5OCw3MC44MjIgMTQ3LjAzLDcwLjM3NiAxNDguNTMyLDY5LjUwOSBDMTUzLjg0Miw2Ni40NDMgMTU4LjE2Myw1OC45ODcgMTU4LjE2Myw1Mi44OTQgQzE1OC4xNjMsNTAuOTY3IDE1Ny43MjEsNDkuMzMyIDE1Ni44ODQsNDguMTY4IEMxNTYuODE4LDQ4LjA3NiAxNTYuODI4LDQ3Ljk0OCAxNTYuOTA4LDQ3Ljg2NyBDMTU2Ljk4OCw0Ny43ODYgMTU3LjExNCw0Ny43NzQgMTU3LjIwOCw0Ny44NCBDMTU4Ljg3OCw0OS4wMTIgMTU5Ljc5OCw1MS4yMiAxNTkuNzk4LDU0LjA1OSBDMTU5Ljc5OCw2MC4zMDEgMTU1LjM3Myw2OC4wNDYgMTQ5LjkzMyw3MS4xODYgQzE0OC4zNiw3Mi4wOTQgMTQ2Ljg1LDcyLjY2NyAxNDUuNDQ1LDcyLjY2NyBMMTQ1LjQ0NSw3Mi42NjcgWiBNMTQyLjQ3Niw3MSBDMTQzLjI5LDcxLjY1MSAxNDQuMjk2LDcyLjAwMiAxNDUuNDQ1LDcyLjAwMiBDMTQ2Ljc2Nyw3Mi4wMDIgMTQ4LjE5OCw3MS41NSAxNDkuNyw3MC42ODIgQzE1NS4wMSw2Ny42MTcgMTU5LjMzMSw2MC4xNTkgMTU5LjMzMSw1NC4wNjUgQzE1OS4zMzEsNTIuMDg1IDE1OC44NjgsNTAuNDM1IDE1OC4wMDYsNDkuMjcyIEMxNTguNDE3LDUwLjMwNyAxNTguNjMsNTEuNTMyIDE1OC42Myw1Mi44OTIgQzE1OC42Myw1OS4xMzQgMTU0LjIwNSw2Ni43NjcgMTQ4Ljc2NSw2OS45MDcgQzE0Ny4xOTIsNzAuODE2IDE0NS42ODEsNzEuMjgzIDE0NC4yNzYsNzEuMjgzIEMxNDMuNjM0LDcxLjI4MyAxNDMuMDMzLDcxLjE5MiAxNDIuNDc2LDcxIEwxNDIuNDc2LDcxIFoiIGlkPSJGaWxsLTMzIiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0OC42NDgsNjkuNzA0IEMxNTQuMDMyLDY2LjU5NiAxNTguMzk2LDU5LjA2OCAxNTguMzk2LDUyLjg5MSBDMTU4LjM5Niw1MC44MzkgMTU3LjkxMyw0OS4xOTggMTU3LjA3NCw0OC4wMyBDMTU1LjI4OSw0Ni43NzggMTUyLjY5OSw0Ni44MzYgMTQ5LjgxNiw0OC41MDEgQzE0NC40MzMsNTEuNjA5IDE0MC4wNjgsNTkuMTM3IDE0MC4wNjgsNjUuMzE0IEMxNDAuMDY4LDY3LjM2NSAxNDAuNTUyLDY5LjAwNiAxNDEuMzkxLDcwLjE3NCBDMTQzLjE3Niw3MS40MjcgMTQ1Ljc2NSw3MS4zNjkgMTQ4LjY0OCw2OS43MDQiIGlkPSJGaWxsLTM0IiBmaWxsPSIjRkFGQUZBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0NC4yNzYsNzEuMjc2IEwxNDQuMjc2LDcxLjI3NiBDMTQzLjEzMyw3MS4yNzYgMTQyLjExOCw3MC45NjkgMTQxLjI1Nyw3MC4zNjUgQzE0MS4yMzYsNzAuMzUxIDE0MS4yMTcsNzAuMzMyIDE0MS4yMDIsNzAuMzExIEMxNDAuMzA3LDY5LjA2NyAxMzkuODM1LDY3LjMzOSAxMzkuODM1LDY1LjMxNCBDMTM5LjgzNSw1OS4wNzMgMTQ0LjI2LDUxLjQzOSAxNDkuNyw0OC4yOTggQzE1MS4yNzMsNDcuMzkgMTUyLjc4NCw0Ni45MjkgMTU0LjE4OSw0Ni45MjkgQzE1NS4zMzIsNDYuOTI5IDE1Ni4zNDcsNDcuMjM2IDE1Ny4yMDgsNDcuODM5IEMxNTcuMjI5LDQ3Ljg1NCAxNTcuMjQ4LDQ3Ljg3MyAxNTcuMjYzLDQ3Ljg5NCBDMTU4LjE1Nyw0OS4xMzggMTU4LjYzLDUwLjg2NSAxNTguNjMsNTIuODkxIEMxNTguNjMsNTkuMTMyIDE1NC4yMDUsNjYuNzY2IDE0OC43NjUsNjkuOTA3IEMxNDcuMTkyLDcwLjgxNSAxNDUuNjgxLDcxLjI3NiAxNDQuMjc2LDcxLjI3NiBMMTQ0LjI3Niw3MS4yNzYgWiBNMTQxLjU1OCw3MC4xMDQgQzE0Mi4zMzEsNzAuNjM3IDE0My4yNDUsNzEuMDA1IDE0NC4yNzYsNzEuMDA1IEMxNDUuNTk4LDcxLjAwNSAxNDcuMDMsNzAuNDY3IDE0OC41MzIsNjkuNiBDMTUzLjg0Miw2Ni41MzQgMTU4LjE2Myw1OS4wMzMgMTU4LjE2Myw1Mi45MzkgQzE1OC4xNjMsNTEuMDMxIDE1Ny43MjksNDkuMzg1IDE1Ni45MDcsNDguMjIzIEMxNTYuMTMzLDQ3LjY5MSAxNTUuMjE5LDQ3LjQwOSAxNTQuMTg5LDQ3LjQwOSBDMTUyLjg2Nyw0Ny40MDkgMTUxLjQzNSw0Ny44NDIgMTQ5LjkzMyw0OC43MDkgQzE0NC42MjMsNTEuNzc1IDE0MC4zMDIsNTkuMjczIDE0MC4zMDIsNjUuMzY2IEMxNDAuMzAyLDY3LjI3NiAxNDAuNzM2LDY4Ljk0MiAxNDEuNTU4LDcwLjEwNCBMMTQxLjU1OCw3MC4xMDQgWiIgaWQ9IkZpbGwtMzUiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUwLjcyLDY1LjM2MSBMMTUwLjM1Nyw2NS4wNjYgQzE1MS4xNDcsNjQuMDkyIDE1MS44NjksNjMuMDQgMTUyLjUwNSw2MS45MzggQzE1My4zMTMsNjAuNTM5IDE1My45NzgsNTkuMDY3IDE1NC40ODIsNTcuNTYzIEwxNTQuOTI1LDU3LjcxMiBDMTU0LjQxMiw1OS4yNDUgMTUzLjczMyw2MC43NDUgMTUyLjkxLDYyLjE3MiBDMTUyLjI2Miw2My4yOTUgMTUxLjUyNSw2NC4zNjggMTUwLjcyLDY1LjM2MSIgaWQ9IkZpbGwtMzYiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTE1LjkxNyw4NC41MTQgTDExNS41NTQsODQuMjIgQzExNi4zNDQsODMuMjQ1IDExNy4wNjYsODIuMTk0IDExNy43MDIsODEuMDkyIEMxMTguNTEsNzkuNjkyIDExOS4xNzUsNzguMjIgMTE5LjY3OCw3Ni43MTcgTDEyMC4xMjEsNzYuODY1IEMxMTkuNjA4LDc4LjM5OCAxMTguOTMsNzkuODk5IDExOC4xMDYsODEuMzI2IEMxMTcuNDU4LDgyLjQ0OCAxMTYuNzIyLDgzLjUyMSAxMTUuOTE3LDg0LjUxNCIgaWQ9IkZpbGwtMzciIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTE0LDEzMC40NzYgTDExNCwxMzAuMDA4IEwxMTQsNzYuMDUyIEwxMTQsNzUuNTg0IEwxMTQsNzYuMDUyIEwxMTQsMTMwLjAwOCBMMTE0LDEzMC40NzYiIGlkPSJGaWxsLTM4IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iSW1wb3J0ZWQtTGF5ZXJzLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYyLjAwMDAwMCwgMC4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkuODIyLDM3LjQ3NCBDMTkuODM5LDM3LjMzOSAxOS43NDcsMzcuMTk0IDE5LjU1NSwzNy4wODIgQzE5LjIyOCwzNi44OTQgMTguNzI5LDM2Ljg3MiAxOC40NDYsMzcuMDM3IEwxMi40MzQsNDAuNTA4IEMxMi4zMDMsNDAuNTg0IDEyLjI0LDQwLjY4NiAxMi4yNDMsNDAuNzkzIEMxMi4yNDUsNDAuOTI1IDEyLjI0NSw0MS4yNTQgMTIuMjQ1LDQxLjM3MSBMMTIuMjQ1LDQxLjQxNCBMMTIuMjM4LDQxLjU0MiBDOC4xNDgsNDMuODg3IDUuNjQ3LDQ1LjMyMSA1LjY0Nyw0NS4zMjEgQzUuNjQ2LDQ1LjMyMSAzLjU3LDQ2LjM2NyAyLjg2LDUwLjUxMyBDMi44Niw1MC41MTMgMS45NDgsNTcuNDc0IDEuOTYyLDcwLjI1OCBDMS45NzcsODIuODI4IDIuNTY4LDg3LjMyOCAzLjEyOSw5MS42MDkgQzMuMzQ5LDkzLjI5MyA2LjEzLDkzLjczNCA2LjEzLDkzLjczNCBDNi40NjEsOTMuNzc0IDYuODI4LDkzLjcwNyA3LjIxLDkzLjQ4NiBMODIuNDgzLDQ5LjkzNSBDODQuMjkxLDQ4Ljg2NiA4NS4xNSw0Ni4yMTYgODUuNTM5LDQzLjY1MSBDODYuNzUyLDM1LjY2MSA4Ny4yMTQsMTAuNjczIDg1LjI2NCwzLjc3MyBDODUuMDY4LDMuMDggODQuNzU0LDIuNjkgODQuMzk2LDIuNDkxIEw4Mi4zMSwxLjcwMSBDODEuNTgzLDEuNzI5IDgwLjg5NCwyLjE2OCA4MC43NzYsMi4yMzYgQzgwLjYzNiwyLjMxNyA0MS44MDcsMjQuNTg1IDIwLjAzMiwzNy4wNzIgTDE5LjgyMiwzNy40NzQiIGlkPSJGaWxsLTEiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNODIuMzExLDEuNzAxIEw4NC4zOTYsMi40OTEgQzg0Ljc1NCwyLjY5IDg1LjA2OCwzLjA4IDg1LjI2NCwzLjc3MyBDODcuMjEzLDEwLjY3MyA4Ni43NTEsMzUuNjYgODUuNTM5LDQzLjY1MSBDODUuMTQ5LDQ2LjIxNiA4NC4yOSw0OC44NjYgODIuNDgzLDQ5LjkzNSBMNy4yMSw5My40ODYgQzYuODk3LDkzLjY2NyA2LjU5NSw5My43NDQgNi4zMTQsOTMuNzQ0IEw2LjEzMSw5My43MzMgQzYuMTMxLDkzLjczNCAzLjM0OSw5My4yOTMgMy4xMjgsOTEuNjA5IEMyLjU2OCw4Ny4zMjcgMS45NzcsODIuODI4IDEuOTYzLDcwLjI1OCBDMS45NDgsNTcuNDc0IDIuODYsNTAuNTEzIDIuODYsNTAuNTEzIEMzLjU3LDQ2LjM2NyA1LjY0Nyw0NS4zMjEgNS42NDcsNDUuMzIxIEM1LjY0Nyw0NS4zMjEgOC4xNDgsNDMuODg3IDEyLjIzOCw0MS41NDIgTDEyLjI0NSw0MS40MTQgTDEyLjI0NSw0MS4zNzEgQzEyLjI0NSw0MS4yNTQgMTIuMjQ1LDQwLjkyNSAxMi4yNDMsNDAuNzkzIEMxMi4yNCw0MC42ODYgMTIuMzAyLDQwLjU4MyAxMi40MzQsNDAuNTA4IEwxOC40NDYsMzcuMDM2IEMxOC41NzQsMzYuOTYyIDE4Ljc0NiwzNi45MjYgMTguOTI3LDM2LjkyNiBDMTkuMTQ1LDM2LjkyNiAxOS4zNzYsMzYuOTc5IDE5LjU1NCwzNy4wODIgQzE5Ljc0NywzNy4xOTQgMTkuODM5LDM3LjM0IDE5LjgyMiwzNy40NzQgTDIwLjAzMywzNy4wNzIgQzQxLjgwNiwyNC41ODUgODAuNjM2LDIuMzE4IDgwLjc3NywyLjIzNiBDODAuODk0LDIuMTY4IDgxLjU4MywxLjcyOSA4Mi4zMTEsMS43MDEgTTgyLjMxMSwwLjcwNCBMODIuMjcyLDAuNzA1IEM4MS42NTQsMC43MjggODAuOTg5LDAuOTQ5IDgwLjI5OCwxLjM2MSBMODAuMjc3LDEuMzczIEM4MC4xMjksMS40NTggNTkuNzY4LDEzLjEzNSAxOS43NTgsMzYuMDc5IEMxOS41LDM1Ljk4MSAxOS4yMTQsMzUuOTI5IDE4LjkyNywzNS45MjkgQzE4LjU2MiwzNS45MjkgMTguMjIzLDM2LjAxMyAxNy45NDcsMzYuMTczIEwxMS45MzUsMzkuNjQ0IEMxMS40OTMsMzkuODk5IDExLjIzNiw0MC4zMzQgMTEuMjQ2LDQwLjgxIEwxMS4yNDcsNDAuOTYgTDUuMTY3LDQ0LjQ0NyBDNC43OTQsNDQuNjQ2IDIuNjI1LDQ1Ljk3OCAxLjg3Nyw1MC4zNDUgTDEuODcxLDUwLjM4NCBDMS44NjIsNTAuNDU0IDAuOTUxLDU3LjU1NyAwLjk2NSw3MC4yNTkgQzAuOTc5LDgyLjg3OSAxLjU2OCw4Ny4zNzUgMi4xMzcsOTEuNzI0IEwyLjEzOSw5MS43MzkgQzIuNDQ3LDk0LjA5NCA1LjYxNCw5NC42NjIgNS45NzUsOTQuNzE5IEw2LjAwOSw5NC43MjMgQzYuMTEsOTQuNzM2IDYuMjEzLDk0Ljc0MiA2LjMxNCw5NC43NDIgQzYuNzksOTQuNzQyIDcuMjYsOTQuNjEgNy43MSw5NC4zNSBMODIuOTgzLDUwLjc5OCBDODQuNzk0LDQ5LjcyNyA4NS45ODIsNDcuMzc1IDg2LjUyNSw0My44MDEgQzg3LjcxMSwzNS45ODcgODguMjU5LDEwLjcwNSA4Ni4yMjQsMy41MDIgQzg1Ljk3MSwyLjYwOSA4NS41MiwxLjk3NSA4NC44ODEsMS42MiBMODQuNzQ5LDEuNTU4IEw4Mi42NjQsMC43NjkgQzgyLjU1MSwwLjcyNSA4Mi40MzEsMC43MDQgODIuMzExLDAuNzA0IiBpZD0iRmlsbC0yIiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTY2LjI2NywxMS41NjUgTDY3Ljc2MiwxMS45OTkgTDExLjQyMyw0NC4zMjUiIGlkPSJGaWxsLTMiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuMjAyLDkwLjU0NSBDMTIuMDI5LDkwLjU0NSAxMS44NjIsOTAuNDU1IDExLjc2OSw5MC4yOTUgQzExLjYzMiw5MC4wNTcgMTEuNzEzLDg5Ljc1MiAxMS45NTIsODkuNjE0IEwzMC4zODksNzguOTY5IEMzMC42MjgsNzguODMxIDMwLjkzMyw3OC45MTMgMzEuMDcxLDc5LjE1MiBDMzEuMjA4LDc5LjM5IDMxLjEyNyw3OS42OTYgMzAuODg4LDc5LjgzMyBMMTIuNDUxLDkwLjQ3OCBMMTIuMjAyLDkwLjU0NSIgaWQ9IkZpbGwtNCIgZmlsbD0iIzYwN0Q4QiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy43NjQsNDIuNjU0IEwxMy42NTYsNDIuNTkyIEwxMy43MDIsNDIuNDIxIEwxOC44MzcsMzkuNDU3IEwxOS4wMDcsMzkuNTAyIEwxOC45NjIsMzkuNjczIEwxMy44MjcsNDIuNjM3IEwxMy43NjQsNDIuNjU0IiBpZD0iRmlsbC01IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTguNTIsOTAuMzc1IEw4LjUyLDQ2LjQyMSBMOC41ODMsNDYuMzg1IEw3NS44NCw3LjU1NCBMNzUuODQsNTEuNTA4IEw3NS43NzgsNTEuNTQ0IEw4LjUyLDkwLjM3NSBMOC41Miw5MC4zNzUgWiBNOC43Nyw0Ni41NjQgTDguNzcsODkuOTQ0IEw3NS41OTEsNTEuMzY1IEw3NS41OTEsNy45ODUgTDguNzcsNDYuNTY0IEw4Ljc3LDQ2LjU2NCBaIiBpZD0iRmlsbC02IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0Ljk4Niw4My4xODIgQzI0Ljc1Niw4My4zMzEgMjQuMzc0LDgzLjU2NiAyNC4xMzcsODMuNzA1IEwxMi42MzIsOTAuNDA2IEMxMi4zOTUsOTAuNTQ1IDEyLjQyNiw5MC42NTggMTIuNyw5MC42NTggTDEzLjI2NSw5MC42NTggQzEzLjU0LDkwLjY1OCAxMy45NTgsOTAuNTQ1IDE0LjE5NSw5MC40MDYgTDI1LjcsODMuNzA1IEMyNS45MzcsODMuNTY2IDI2LjEyOCw4My40NTIgMjYuMTI1LDgzLjQ0OSBDMjYuMTIyLDgzLjQ0NyAyNi4xMTksODMuMjIgMjYuMTE5LDgyLjk0NiBDMjYuMTE5LDgyLjY3MiAyNS45MzEsODIuNTY5IDI1LjcwMSw4Mi43MTkgTDI0Ljk4Niw4My4xODIiIGlkPSJGaWxsLTciIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuMjY2LDkwLjc4MiBMMTIuNyw5MC43ODIgQzEyLjUsOTAuNzgyIDEyLjM4NCw5MC43MjYgMTIuMzU0LDkwLjYxNiBDMTIuMzI0LDkwLjUwNiAxMi4zOTcsOTAuMzk5IDEyLjU2OSw5MC4yOTkgTDI0LjA3NCw4My41OTcgQzI0LjMxLDgzLjQ1OSAyNC42ODksODMuMjI2IDI0LjkxOCw4My4wNzggTDI1LjYzMyw4Mi42MTQgQzI1LjcyMyw4Mi41NTUgMjUuODEzLDgyLjUyNSAyNS44OTksODIuNTI1IEMyNi4wNzEsODIuNTI1IDI2LjI0NCw4Mi42NTUgMjYuMjQ0LDgyLjk0NiBDMjYuMjQ0LDgzLjE2IDI2LjI0NSw4My4zMDkgMjYuMjQ3LDgzLjM4MyBMMjYuMjUzLDgzLjM4NyBMMjYuMjQ5LDgzLjQ1NiBDMjYuMjQ2LDgzLjUzMSAyNi4yNDYsODMuNTMxIDI1Ljc2Myw4My44MTIgTDE0LjI1OCw5MC41MTQgQzE0LDkwLjY2NSAxMy41NjQsOTAuNzgyIDEzLjI2Niw5MC43ODIgTDEzLjI2Niw5MC43ODIgWiBNMTIuNjY2LDkwLjUzMiBMMTIuNyw5MC41MzMgTDEzLjI2Niw5MC41MzMgQzEzLjUxOCw5MC41MzMgMTMuOTE1LDkwLjQyNSAxNC4xMzIsOTAuMjk5IEwyNS42MzcsODMuNTk3IEMyNS44MDUsODMuNDk5IDI1LjkzMSw4My40MjQgMjUuOTk4LDgzLjM4MyBDMjUuOTk0LDgzLjI5OSAyNS45OTQsODMuMTY1IDI1Ljk5NCw4Mi45NDYgTDI1Ljg5OSw4Mi43NzUgTDI1Ljc2OCw4Mi44MjQgTDI1LjA1NCw4My4yODcgQzI0LjgyMiw4My40MzcgMjQuNDM4LDgzLjY3MyAyNC4yLDgzLjgxMiBMMTIuNjk1LDkwLjUxNCBMMTIuNjY2LDkwLjUzMiBMMTIuNjY2LDkwLjUzMiBaIiBpZD0iRmlsbC04IiBmaWxsPSIjNjA3RDhCIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjI2Niw4OS44NzEgTDEyLjcsODkuODcxIEMxMi41LDg5Ljg3MSAxMi4zODQsODkuODE1IDEyLjM1NCw4OS43MDUgQzEyLjMyNCw4OS41OTUgMTIuMzk3LDg5LjQ4OCAxMi41NjksODkuMzg4IEwyNC4wNzQsODIuNjg2IEMyNC4zMzIsODIuNTM1IDI0Ljc2OCw4Mi40MTggMjUuMDY3LDgyLjQxOCBMMjUuNjMyLDgyLjQxOCBDMjUuODMyLDgyLjQxOCAyNS45NDgsODIuNDc0IDI1Ljk3OCw4Mi41ODQgQzI2LjAwOCw4Mi42OTQgMjUuOTM1LDgyLjgwMSAyNS43NjMsODIuOTAxIEwxNC4yNTgsODkuNjAzIEMxNCw4OS43NTQgMTMuNTY0LDg5Ljg3MSAxMy4yNjYsODkuODcxIEwxMy4yNjYsODkuODcxIFogTTEyLjY2Niw4OS42MjEgTDEyLjcsODkuNjIyIEwxMy4yNjYsODkuNjIyIEMxMy41MTgsODkuNjIyIDEzLjkxNSw4OS41MTUgMTQuMTMyLDg5LjM4OCBMMjUuNjM3LDgyLjY4NiBMMjUuNjY3LDgyLjY2OCBMMjUuNjMyLDgyLjY2NyBMMjUuMDY3LDgyLjY2NyBDMjQuODE1LDgyLjY2NyAyNC40MTgsODIuNzc1IDI0LjIsODIuOTAxIEwxMi42OTUsODkuNjAzIEwxMi42NjYsODkuNjIxIEwxMi42NjYsODkuNjIxIFoiIGlkPSJGaWxsLTkiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuMzcsOTAuODAxIEwxMi4zNyw4OS41NTQgTDEyLjM3LDkwLjgwMSIgaWQ9IkZpbGwtMTAiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi4xMyw5My45MDEgQzUuMzc5LDkzLjgwOCA0LjgxNiw5My4xNjQgNC42OTEsOTIuNTI1IEMzLjg2LDg4LjI4NyAzLjU0LDgzLjc0MyAzLjUyNiw3MS4xNzMgQzMuNTExLDU4LjM4OSA0LjQyMyw1MS40MjggNC40MjMsNTEuNDI4IEM1LjEzNCw0Ny4yODIgNy4yMSw0Ni4yMzYgNy4yMSw0Ni4yMzYgQzcuMjEsNDYuMjM2IDgxLjY2NywzLjI1IDgyLjA2OSwzLjAxNyBDODIuMjkyLDIuODg4IDg0LjU1NiwxLjQzMyA4NS4yNjQsMy45NCBDODcuMjE0LDEwLjg0IDg2Ljc1MiwzNS44MjcgODUuNTM5LDQzLjgxOCBDODUuMTUsNDYuMzgzIDg0LjI5MSw0OS4wMzMgODIuNDgzLDUwLjEwMSBMNy4yMSw5My42NTMgQzYuODI4LDkzLjg3NCA2LjQ2MSw5My45NDEgNi4xMyw5My45MDEgQzYuMTMsOTMuOTAxIDMuMzQ5LDkzLjQ2IDMuMTI5LDkxLjc3NiBDMi41NjgsODcuNDk1IDEuOTc3LDgyLjk5NSAxLjk2Miw3MC40MjUgQzEuOTQ4LDU3LjY0MSAyLjg2LDUwLjY4IDIuODYsNTAuNjggQzMuNTcsNDYuNTM0IDUuNjQ3LDQ1LjQ4OSA1LjY0Nyw0NS40ODkgQzUuNjQ2LDQ1LjQ4OSA4LjA2NSw0NC4wOTIgMTIuMjQ1LDQxLjY3OSBMMTMuMTE2LDQxLjU2IEwxOS43MTUsMzcuNzMgTDE5Ljc2MSwzNy4yNjkgTDYuMTMsOTMuOTAxIiBpZD0iRmlsbC0xMSIgZmlsbD0iI0ZBRkFGQSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjMxNyw5NC4xNjEgTDYuMTAyLDk0LjE0OCBMNi4xMDEsOTQuMTQ4IEw1Ljg1Nyw5NC4xMDEgQzUuMTM4LDkzLjk0NSAzLjA4NSw5My4zNjUgMi44ODEsOTEuODA5IEMyLjMxMyw4Ny40NjkgMS43MjcsODIuOTk2IDEuNzEzLDcwLjQyNSBDMS42OTksNTcuNzcxIDIuNjA0LDUwLjcxOCAyLjYxMyw1MC42NDggQzMuMzM4LDQ2LjQxNyA1LjQ0NSw0NS4zMSA1LjUzNSw0NS4yNjYgTDEyLjE2Myw0MS40MzkgTDEzLjAzMyw0MS4zMiBMMTkuNDc5LDM3LjU3OCBMMTkuNTEzLDM3LjI0NCBDMTkuNTI2LDM3LjEwNyAxOS42NDcsMzcuMDA4IDE5Ljc4NiwzNy4wMjEgQzE5LjkyMiwzNy4wMzQgMjAuMDIzLDM3LjE1NiAyMC4wMDksMzcuMjkzIEwxOS45NSwzNy44ODIgTDEzLjE5OCw0MS44MDEgTDEyLjMyOCw0MS45MTkgTDUuNzcyLDQ1LjcwNCBDNS43NDEsNDUuNzIgMy43ODIsNDYuNzcyIDMuMTA2LDUwLjcyMiBDMy4wOTksNTAuNzgyIDIuMTk4LDU3LjgwOCAyLjIxMiw3MC40MjQgQzIuMjI2LDgyLjk2MyAyLjgwOSw4Ny40MiAzLjM3Myw5MS43MjkgQzMuNDY0LDkyLjQyIDQuMDYyLDkyLjg4MyA0LjY4Miw5My4xODEgQzQuNTY2LDkyLjk4NCA0LjQ4Niw5Mi43NzYgNC40NDYsOTIuNTcyIEMzLjY2NSw4OC41ODggMy4yOTEsODQuMzcgMy4yNzYsNzEuMTczIEMzLjI2Miw1OC41MiA0LjE2Nyw1MS40NjYgNC4xNzYsNTEuMzk2IEM0LjkwMSw0Ny4xNjUgNy4wMDgsNDYuMDU5IDcuMDk4LDQ2LjAxNCBDNy4wOTQsNDYuMDE1IDgxLjU0MiwzLjAzNCA4MS45NDQsMi44MDIgTDgxLjk3MiwyLjc4NSBDODIuODc2LDIuMjQ3IDgzLjY5MiwyLjA5NyA4NC4zMzIsMi4zNTIgQzg0Ljg4NywyLjU3MyA4NS4yODEsMy4wODUgODUuNTA0LDMuODcyIEM4Ny41MTgsMTEgODYuOTY0LDM2LjA5MSA4NS43ODUsNDMuODU1IEM4NS4yNzgsNDcuMTk2IDg0LjIxLDQ5LjM3IDgyLjYxLDUwLjMxNyBMNy4zMzUsOTMuODY5IEM2Ljk5OSw5NC4wNjMgNi42NTgsOTQuMTYxIDYuMzE3LDk0LjE2MSBMNi4zMTcsOTQuMTYxIFogTTYuMTcsOTMuNjU0IEM2LjQ2Myw5My42OSA2Ljc3NCw5My42MTcgNy4wODUsOTMuNDM3IEw4Mi4zNTgsNDkuODg2IEM4NC4xODEsNDguODA4IDg0Ljk2LDQ1Ljk3MSA4NS4yOTIsNDMuNzggQzg2LjQ2NiwzNi4wNDkgODcuMDIzLDExLjA4NSA4NS4wMjQsNC4wMDggQzg0Ljg0NiwzLjM3NyA4NC41NTEsMi45NzYgODQuMTQ4LDIuODE2IEM4My42NjQsMi42MjMgODIuOTgyLDIuNzY0IDgyLjIyNywzLjIxMyBMODIuMTkzLDMuMjM0IEM4MS43OTEsMy40NjYgNy4zMzUsNDYuNDUyIDcuMzM1LDQ2LjQ1MiBDNy4zMDQsNDYuNDY5IDUuMzQ2LDQ3LjUyMSA0LjY2OSw1MS40NzEgQzQuNjYyLDUxLjUzIDMuNzYxLDU4LjU1NiAzLjc3NSw3MS4xNzMgQzMuNzksODQuMzI4IDQuMTYxLDg4LjUyNCA0LjkzNiw5Mi40NzYgQzUuMDI2LDkyLjkzNyA1LjQxMiw5My40NTkgNS45NzMsOTMuNjE1IEM2LjA4Nyw5My42NCA2LjE1OCw5My42NTIgNi4xNjksOTMuNjU0IEw2LjE3LDkzLjY1NCBMNi4xNyw5My42NTQgWiIgaWQ9IkZpbGwtMTIiIGZpbGw9IiM0NTVBNjQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy4zMTcsNjguOTgyIEM3LjgwNiw2OC43MDEgOC4yMDIsNjguOTI2IDguMjAyLDY5LjQ4NyBDOC4yMDIsNzAuMDQ3IDcuODA2LDcwLjczIDcuMzE3LDcxLjAxMiBDNi44MjksNzEuMjk0IDYuNDMzLDcxLjA2OSA2LjQzMyw3MC41MDggQzYuNDMzLDY5Ljk0OCA2LjgyOSw2OS4yNjUgNy4zMTcsNjguOTgyIiBpZD0iRmlsbC0xMyIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjkyLDcxLjEzMyBDNi42MzEsNzEuMTMzIDYuNDMzLDcwLjkwNSA2LjQzMyw3MC41MDggQzYuNDMzLDY5Ljk0OCA2LjgyOSw2OS4yNjUgNy4zMTcsNjguOTgyIEM3LjQ2LDY4LjkgNy41OTUsNjguODYxIDcuNzE0LDY4Ljg2MSBDOC4wMDMsNjguODYxIDguMjAyLDY5LjA5IDguMjAyLDY5LjQ4NyBDOC4yMDIsNzAuMDQ3IDcuODA2LDcwLjczIDcuMzE3LDcxLjAxMiBDNy4xNzQsNzEuMDk0IDcuMDM5LDcxLjEzMyA2LjkyLDcxLjEzMyBNNy43MTQsNjguNjc0IEM3LjU1Nyw2OC42NzQgNy4zOTIsNjguNzIzIDcuMjI0LDY4LjgyMSBDNi42NzYsNjkuMTM4IDYuMjQ2LDY5Ljg3OSA2LjI0Niw3MC41MDggQzYuMjQ2LDcwLjk5NCA2LjUxNyw3MS4zMiA2LjkyLDcxLjMyIEM3LjA3OCw3MS4zMiA3LjI0Myw3MS4yNzEgNy40MTEsNzEuMTc0IEM3Ljk1OSw3MC44NTcgOC4zODksNzAuMTE3IDguMzg5LDY5LjQ4NyBDOC4zODksNjkuMDAxIDguMTE3LDY4LjY3NCA3LjcxNCw2OC42NzQiIGlkPSJGaWxsLTE0IiBmaWxsPSIjODA5N0EyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuOTIsNzAuOTQ3IEM2LjY0OSw3MC45NDcgNi42MjEsNzAuNjQgNi42MjEsNzAuNTA4IEM2LjYyMSw3MC4wMTcgNi45ODIsNjkuMzkyIDcuNDExLDY5LjE0NSBDNy41MjEsNjkuMDgyIDcuNjI1LDY5LjA0OSA3LjcxNCw2OS4wNDkgQzcuOTg2LDY5LjA0OSA4LjAxNSw2OS4zNTUgOC4wMTUsNjkuNDg3IEM4LjAxNSw2OS45NzggNy42NTIsNzAuNjAzIDcuMjI0LDcwLjg1MSBDNy4xMTUsNzAuOTE0IDcuMDEsNzAuOTQ3IDYuOTIsNzAuOTQ3IE03LjcxNCw2OC44NjEgQzcuNTk1LDY4Ljg2MSA3LjQ2LDY4LjkgNy4zMTcsNjguOTgyIEM2LjgyOSw2OS4yNjUgNi40MzMsNjkuOTQ4IDYuNDMzLDcwLjUwOCBDNi40MzMsNzAuOTA1IDYuNjMxLDcxLjEzMyA2LjkyLDcxLjEzMyBDNy4wMzksNzEuMTMzIDcuMTc0LDcxLjA5NCA3LjMxNyw3MS4wMTIgQzcuODA2LDcwLjczIDguMjAyLDcwLjA0NyA4LjIwMiw2OS40ODcgQzguMjAyLDY5LjA5IDguMDAzLDY4Ljg2MSA3LjcxNCw2OC44NjEiIGlkPSJGaWxsLTE1IiBmaWxsPSIjODA5N0EyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTcuNDQ0LDg1LjM1IEM3LjcwOCw4NS4xOTggNy45MjEsODUuMzE5IDcuOTIxLDg1LjYyMiBDNy45MjEsODUuOTI1IDcuNzA4LDg2LjI5MiA3LjQ0NCw4Ni40NDQgQzcuMTgxLDg2LjU5NyA2Ljk2Nyw4Ni40NzUgNi45NjcsODYuMTczIEM2Ljk2Nyw4NS44NzEgNy4xODEsODUuNTAyIDcuNDQ0LDg1LjM1IiBpZD0iRmlsbC0xNiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03LjIzLDg2LjUxIEM3LjA3NCw4Ni41MSA2Ljk2Nyw4Ni4zODcgNi45NjcsODYuMTczIEM2Ljk2Nyw4NS44NzEgNy4xODEsODUuNTAyIDcuNDQ0LDg1LjM1IEM3LjUyMSw4NS4zMDUgNy41OTQsODUuMjg0IDcuNjU4LDg1LjI4NCBDNy44MTQsODUuMjg0IDcuOTIxLDg1LjQwOCA3LjkyMSw4NS42MjIgQzcuOTIxLDg1LjkyNSA3LjcwOCw4Ni4yOTIgNy40NDQsODYuNDQ0IEM3LjM2Nyw4Ni40ODkgNy4yOTQsODYuNTEgNy4yMyw4Ni41MSBNNy42NTgsODUuMDk4IEM3LjU1OCw4NS4wOTggNy40NTUsODUuMTI3IDcuMzUxLDg1LjE4OCBDNy4wMzEsODUuMzczIDYuNzgxLDg1LjgwNiA2Ljc4MSw4Ni4xNzMgQzYuNzgxLDg2LjQ4MiA2Ljk2Niw4Ni42OTcgNy4yMyw4Ni42OTcgQzcuMzMsODYuNjk3IDcuNDMzLDg2LjY2NiA3LjUzOCw4Ni42MDcgQzcuODU4LDg2LjQyMiA4LjEwOCw4NS45ODkgOC4xMDgsODUuNjIyIEM4LjEwOCw4NS4zMTMgNy45MjMsODUuMDk4IDcuNjU4LDg1LjA5OCIgaWQ9IkZpbGwtMTciIGZpbGw9IiM4MDk3QTIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy4yMyw4Ni4zMjIgTDcuMTU0LDg2LjE3MyBDNy4xNTQsODUuOTM4IDcuMzMzLDg1LjYyOSA3LjUzOCw4NS41MTIgTDcuNjU4LDg1LjQ3MSBMNy43MzQsODUuNjIyIEM3LjczNCw4NS44NTYgNy41NTUsODYuMTY0IDcuMzUxLDg2LjI4MiBMNy4yMyw4Ni4zMjIgTTcuNjU4LDg1LjI4NCBDNy41OTQsODUuMjg0IDcuNTIxLDg1LjMwNSA3LjQ0NCw4NS4zNSBDNy4xODEsODUuNTAyIDYuOTY3LDg1Ljg3MSA2Ljk2Nyw4Ni4xNzMgQzYuOTY3LDg2LjM4NyA3LjA3NCw4Ni41MSA3LjIzLDg2LjUxIEM3LjI5NCw4Ni41MSA3LjM2Nyw4Ni40ODkgNy40NDQsODYuNDQ0IEM3LjcwOCw4Ni4yOTIgNy45MjEsODUuOTI1IDcuOTIxLDg1LjYyMiBDNy45MjEsODUuNDA4IDcuODE0LDg1LjI4NCA3LjY1OCw4NS4yODQiIGlkPSJGaWxsLTE4IiBmaWxsPSIjODA5N0EyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTc3LjI3OCw3Ljc2OSBMNzcuMjc4LDUxLjQzNiBMMTAuMjA4LDkwLjE2IEwxMC4yMDgsNDYuNDkzIEw3Ny4yNzgsNy43NjkiIGlkPSJGaWxsLTE5IiBmaWxsPSIjNDU1QTY0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEwLjA4Myw5MC4zNzUgTDEwLjA4Myw0Ni40MjEgTDEwLjE0Niw0Ni4zODUgTDc3LjQwMyw3LjU1NCBMNzcuNDAzLDUxLjUwOCBMNzcuMzQxLDUxLjU0NCBMMTAuMDgzLDkwLjM3NSBMMTAuMDgzLDkwLjM3NSBaIE0xMC4zMzMsNDYuNTY0IEwxMC4zMzMsODkuOTQ0IEw3Ny4xNTQsNTEuMzY1IEw3Ny4xNTQsNy45ODUgTDEwLjMzMyw0Ni41NjQgTDEwLjMzMyw0Ni41NjQgWiIgaWQ9IkZpbGwtMjAiIGZpbGw9IiM2MDdEOEIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMjUuNzM3LDg4LjY0NyBMMTE4LjA5OCw5MS45ODEgTDExOC4wOTgsODQgTDEwNi42MzksODguNzEzIEwxMDYuNjM5LDk2Ljk4MiBMOTksMTAwLjMxNSBMMTEyLjM2OSwxMDMuOTYxIEwxMjUuNzM3LDg4LjY0NyIgaWQ9IkltcG9ydGVkLUxheWVycy1Db3B5LTIiIGZpbGw9IiM0NTVBNjQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
						},
						t.exports = n
					}, {
						"./util.js": 22
					}
				],
				17: [function (e, t, a) {
						function n(e) {
							this.kFilter = e,
							this.currentAccelMeasurement = new i,
							this.currentGyroMeasurement = new i,
							this.previousGyroMeasurement = new i,
							this.filterQ = new r.Quaternion(1, 0, 0, 1),
							this.previousFilterQ = new r.Quaternion,
							this.accelQ = new r.Quaternion,
							this.isOrientationInitialized = !1,
							this.estimatedGravity = new r.Vector3,
							this.measuredGravity = new r.Vector3,
							this.gyroIntegralQ = new r.Quaternion
						}
						var i = e("./sensor-sample.js"),
						r = e("../math-util.js"),
						o = e("../util.js"),
						s = !1;
						n.prototype.addAccelMeasurement = function (e, t) {
							this.currentAccelMeasurement.set(e, t)
						},
						n.prototype.addGyroMeasurement = function (e, t) {
							this.currentGyroMeasurement.set(e, t);
							var a = t - this.previousGyroMeasurement.timestampS;
							o.isTimestampDeltaValid(a) && this.run_(),
							this.previousGyroMeasurement.copy(this.currentGyroMeasurement)
						},
						n.prototype.run_ = function () {
							if (!this.isOrientationInitialized)
								return this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample), this.previousFilterQ.copy(this.accelQ), void(this.isOrientationInitialized = !0);
							var e = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS,
							t = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, e);
							this.gyroIntegralQ.multiply(t),
							this.filterQ.copy(this.previousFilterQ),
							this.filterQ.multiply(t);
							var a = new r.Quaternion;
							a.copy(this.filterQ),
							a.inverse(),
							this.estimatedGravity.set(0, 0, -1),
							this.estimatedGravity.applyQuaternion(a),
							this.estimatedGravity.normalize(),
							this.measuredGravity.copy(this.currentAccelMeasurement.sample),
							this.measuredGravity.normalize();
							var n = new r.Quaternion;
							n.setFromUnitVectors(this.estimatedGravity, this.measuredGravity),
							n.inverse(),
							s && console.log("Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)", r.radToDeg * o.getQuaternionAngle(n), this.estimatedGravity.x.toFixed(1), this.estimatedGravity.y.toFixed(1), this.estimatedGravity.z.toFixed(1), this.measuredGravity.x.toFixed(1), this.measuredGravity.y.toFixed(1), this.measuredGravity.z.toFixed(1));
							var i = new r.Quaternion;
							i.copy(this.filterQ),
							i.multiply(n),
							this.filterQ.slerp(i, 1 - this.kFilter),
							this.previousFilterQ.copy(this.filterQ)
						},
						n.prototype.getOrientation = function () {
							return this.filterQ
						},
						n.prototype.accelToQuaternion_ = function (e) {
							var t = new r.Vector3;
							t.copy(e),
							t.normalize();
							var a = new r.Quaternion;
							return a.setFromUnitVectors(new r.Vector3(0, 0, (-1)), t),
							a.inverse(),
							a
						},
						n.prototype.gyroToQuaternionDelta_ = function (e, t) {
							var a = new r.Quaternion,
							n = new r.Vector3;
							return n.copy(e),
							n.normalize(),
							a.setFromAxisAngle(n, e.length() * t),
							a
						},
						t.exports = n
					}, {
						"../math-util.js": 14,
						"../util.js": 22,
						"./sensor-sample.js": 20
					}
				],
				18: [function (e, t, a) {
						function n() {
							this.deviceId = "webvr-polyfill:fused",
							this.deviceName = "VR Position Device (webvr-polyfill:fused)",
							this.accelerometer = new s.Vector3,
							this.gyroscope = new s.Vector3,
							window.addEventListener("devicemotion", this.onDeviceMotionChange_.bind(this)),
							window.addEventListener("orientationchange", this.onScreenOrientationChange_.bind(this)),
							this.filter = new i(WebVRConfig.K_FILTER),
							this.posePredictor = new r(WebVRConfig.PREDICTION_TIME_S),
							this.touchPanner = new o,
							this.filterToWorldQ = new s.Quaternion,
							c.isIOS() ? this.filterToWorldQ.setFromAxisAngle(new s.Vector3(1, 0, 0), Math.PI / 2) : this.filterToWorldQ.setFromAxisAngle(new s.Vector3(1, 0, 0), -Math.PI / 2),
							this.inverseWorldToScreenQ = new s.Quaternion,
							this.worldToScreenQ = new s.Quaternion,
							this.originalPoseAdjustQ = new s.Quaternion,
							this.originalPoseAdjustQ.setFromAxisAngle(new s.Vector3(0, 0, 1), -window.orientation * Math.PI / 180),
							this.setScreenTransform_(),
							c.isLandscapeMode() && this.filterToWorldQ.multiply(this.inverseWorldToScreenQ),
							this.resetQ = new s.Quaternion,
							this.isFirefoxAndroid = c.isFirefoxAndroid(),
							this.isIOS = c.isIOS(),
							this.orientationOut_ = new Float32Array(4)
						}
						var i = e("./complementary-filter.js"),
						r = e("./pose-predictor.js"),
						o = e("../touch-panner.js"),
						s = e("../math-util.js"),
						c = e("../util.js");
						n.prototype.getPosition = function () {
							return null
						},
						n.prototype.getOrientation = function () {
							var e = this.filter.getOrientation();
							this.predictedQ = this.posePredictor.getPrediction(e, this.gyroscope, this.previousTimestampS);
							var t = new s.Quaternion;
							return t.copy(this.filterToWorldQ),
							t.multiply(this.resetQ),
							WebVRConfig.TOUCH_PANNER_DISABLED || t.multiply(this.touchPanner.getOrientation()),
							t.multiply(this.predictedQ),
							t.multiply(this.worldToScreenQ),
							WebVRConfig.YAW_ONLY && (t.x = 0, t.z = 0, t.normalize()),
							this.orientationOut_[0] = t.x,
							this.orientationOut_[1] = t.y,
							this.orientationOut_[2] = t.z,
							this.orientationOut_[3] = t.w,
							this.orientationOut_
						},
						n.prototype.resetPose = function () {
							this.resetQ.copy(this.filter.getOrientation()),
							this.resetQ.x = 0,
							this.resetQ.y = 0,
							this.resetQ.z *= -1,
							this.resetQ.normalize(),
							c.isLandscapeMode() && this.resetQ.multiply(this.inverseWorldToScreenQ),
							this.resetQ.multiply(this.originalPoseAdjustQ),
							WebVRConfig.TOUCH_PANNER_DISABLED || this.touchPanner.resetSensor()
						},
						n.prototype.onDeviceMotionChange_ = function (e) {
							var t = e.accelerationIncludingGravity,
							a = e.rotationRate,
							n = e.timeStamp / 1e3;
							this.isFirefoxAndroid && (n /= 1e3);
							var i = n - this.previousTimestampS;
							return i <= c.MIN_TIMESTEP || i > c.MAX_TIMESTEP ? (console.warn("Invalid timestamps detected. Time step between successive gyroscope sensor samples is very small or not monotonic"), void(this.previousTimestampS = n)) : (this.accelerometer.set(-t.x, -t.y, -t.z), this.gyroscope.set(a.alpha, a.beta, a.gamma), (this.isIOS || this.isFirefoxAndroid) && this.gyroscope.multiplyScalar(Math.PI / 180), this.filter.addAccelMeasurement(this.accelerometer, n), this.filter.addGyroMeasurement(this.gyroscope, n), void(this.previousTimestampS = n))
						},
						n.prototype.onScreenOrientationChange_ = function (e) {
							this.setScreenTransform_()
						},
						n.prototype.setScreenTransform_ = function () {
							switch (this.worldToScreenQ.set(0, 0, 0, 1), window.orientation) {
							case 0:
								break;
							case 90:
								this.worldToScreenQ.setFromAxisAngle(new s.Vector3(0, 0, 1), -Math.PI / 2);
								break;
							case -90:
								this.worldToScreenQ.setFromAxisAngle(new s.Vector3(0, 0, 1), Math.PI / 2);
								break;
							case 180:
							}
							this.inverseWorldToScreenQ.copy(this.worldToScreenQ),
							this.inverseWorldToScreenQ.inverse()
						},
						t.exports = n
					}, {
						"../math-util.js": 14,
						"../touch-panner.js": 21,
						"../util.js": 22,
						"./complementary-filter.js": 17,
						"./pose-predictor.js": 19
					}
				],
				19: [function (e, t, a) {
						function n(e) {
							this.predictionTimeS = e,
							this.previousQ = new i.Quaternion,
							this.previousTimestampS = null,
							this.deltaQ = new i.Quaternion,
							this.outQ = new i.Quaternion
						}
						var i = e("../math-util.js"),
						r = !1;
						n.prototype.getPrediction = function (e, t, a) {
							if (!this.previousTimestampS)
								return this.previousQ.copy(e), this.previousTimestampS = a, e;
							var n = new i.Vector3;
							n.copy(t),
							n.normalize();
							var o = t.length();
							if (o < 20 * i.degToRad)
								return r && console.log("Moving slowly, at %s deg/s: no prediction", (i.radToDeg * o).toFixed(1)), this.outQ.copy(e), this.previousQ.copy(e), this.outQ;
							var s = (a - this.previousTimestampS, o * this.predictionTimeS);
							return this.deltaQ.setFromAxisAngle(n, s),
							this.outQ.copy(this.previousQ),
							this.outQ.multiply(this.deltaQ),
							this.previousQ.copy(e),
							this.outQ
						},
						t.exports = n
					}, {
						"../math-util.js": 14
					}
				],
				20: [function (e, t, a) {
						function n(e, t) {
							this.set(e, t)
						}
						n.prototype.set = function (e, t) {
							this.sample = e,
							this.timestampS = t
						},
						n.prototype.copy = function (e) {
							this.set(e.sample, e.timestampS)
						},
						t.exports = n
					}, {}
				],
				21: [function (e, t, a) {
						function n() {
							window.addEventListener("touchstart", this.onTouchStart_.bind(this)),
							window.addEventListener("touchmove", this.onTouchMove_.bind(this)),
							window.addEventListener("touchend", this.onTouchEnd_.bind(this)),
							this.isTouching = !1,
							this.rotateStart = new i.Vector2,
							this.rotateEnd = new i.Vector2,
							this.rotateDelta = new i.Vector2,
							this.theta = 0,
							this.orientation = new i.Quaternion
						}
						var i = e("./math-util.js"),
						r = e("./util.js"),
						o = .5;
						n.prototype.getOrientation = function () {
							return this.orientation.setFromEulerXYZ(0, 0, this.theta),
							this.orientation
						},
						n.prototype.resetSensor = function () {
							this.theta = 0
						},
						n.prototype.onTouchStart_ = function (e) {
							1 == e.touches.length && (this.rotateStart.set(e.touches[0].pageX, e.touches[0].pageY), this.isTouching = !0)
						},
						n.prototype.onTouchMove_ = function (e) {
							if (this.isTouching) {
								this.rotateEnd.set(e.touches[0].pageX, e.touches[0].pageY),
								this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart),
								this.rotateStart.copy(this.rotateEnd),
								r.isIOS() && (this.rotateDelta.x *= -1);
								var t = document.body;
								this.theta += 2 * Math.PI * this.rotateDelta.x / t.clientWidth * o
							}
						},
						n.prototype.onTouchEnd_ = function (e) {
							this.isTouching = !1
						},
						t.exports = n
					}, {
						"./math-util.js": 14,
						"./util.js": 22
					}
				],
				22: [function (e, t, a) {
						var n = e("object-assign"),
						i = window.Util || {};
						i.MIN_TIMESTEP = .001,
						i.MAX_TIMESTEP = 1,
						i.base64 = function (e, t) {
							return "data:" + e + ";base64," + t
						},
						i.clamp = function (e, t, a) {
							return Math.min(Math.max(t, e), a)
						},
						i.lerp = function (e, t, a) {
							return e + (t - e) * a
						},
						i.isIOS = function () {
							var e = /iPad|iPhone|iPod/.test(navigator.platform);
							return function () {
								return e
							}
						}
						(),
						i.isSafari = function () {
							var e = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
							return function () {
								return e
							}
						}
						(),
						i.isFirefoxAndroid = function () {
							var e = navigator.userAgent.indexOf("Firefox") !== -1 && navigator.userAgent.indexOf("Android") !== -1;
							return function () {
								return e
							}
						}
						(),
						i.isLandscapeMode = function () {
							return 90 == window.orientation || window.orientation == -90
						},
						i.isTimestampDeltaValid = function (e) {
							return !isNaN(e) && (!(e <= i.MIN_TIMESTEP) && !(e > i.MAX_TIMESTEP))
						},
						i.getScreenWidth = function () {
							return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio
						},
						i.getScreenHeight = function () {
							return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio
						},
						i.requestFullscreen = function (e) {
							if (e.requestFullscreen)
								e.requestFullscreen();
							else if (e.webkitRequestFullscreen)
								e.webkitRequestFullscreen();
							else if (e.mozRequestFullScreen)
								e.mozRequestFullScreen();
							else {
								if (!e.msRequestFullscreen)
									return !1;
								e.msRequestFullscreen()
							}
							return !0
						},
						i.exitFullscreen = function () {
							if (document.exitFullscreen)
								document.exitFullscreen();
							else if (document.webkitExitFullscreen)
								document.webkitExitFullscreen();
							else if (document.mozCancelFullScreen)
								document.mozCancelFullScreen();
							else {
								if (!document.msExitFullscreen)
									return !1;
								document.msExitFullscreen()
							}
							return !0
						},
						i.getFullscreenElement = function () {
							return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
						},
						i.linkProgram = function (e, t, a, n) {
							var i = e.createShader(e.VERTEX_SHADER);
							e.shaderSource(i, t),
							e.compileShader(i);
							var r = e.createShader(e.FRAGMENT_SHADER);
							e.shaderSource(r, a),
							e.compileShader(r);
							var o = e.createProgram();
							e.attachShader(o, i),
							e.attachShader(o, r);
							for (var s in n)
								e.bindAttribLocation(o, n[s], s);
							return e.linkProgram(o),
							e.deleteShader(i),
							e.deleteShader(r),
							o
						},
						i.getProgramUniforms = function (e, t) {
							for (var a = {}, n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), i = "", r = 0; r < n; r++) {
								var o = e.getActiveUniform(t, r);
								i = o.name.replace("[0]", ""),
								a[i] = e.getUniformLocation(t, i)
							}
							return a
						},
						i.orthoMatrix = function (e, t, a, n, i, r, o) {
							var s = 1 / (t - a),
							c = 1 / (n - i),
							l = 1 / (r - o);
							return e[0] = -2 * s,
							e[1] = 0,
							e[2] = 0,
							e[3] = 0,
							e[4] = 0,
							e[5] = -2 * c,
							e[6] = 0,
							e[7] = 0,
							e[8] = 0,
							e[9] = 0,
							e[10] = 2 * l,
							e[11] = 0,
							e[12] = (t + a) * s,
							e[13] = (i + n) * c,
							e[14] = (o + r) * l,
							e[15] = 1,
							e
						},
						i.isMobile = function () {
							var e = !1;
							return function (t) {
								(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
							}
							(navigator.userAgent || navigator.vendor || window.opera),
							e
						},
						i.extend = n,
						i.safariCssSizeWorkaround = function (e) {
							if (i.isIOS()) {
								var t = e.style.width,
								a = e.style.height;
								e.style.width = parseInt(t) + 1 + "px",
								e.style.height = parseInt(a) + "px",
								console.log("Resetting width to...", t),
								setTimeout(function () {
									console.log("Done. Width is now", t),
									e.style.width = t,
									e.style.height = a
								}, 100)
							}
							window.Util = i,
							window.canvas = e
						},
						t.exports = i
					}, {
						"object-assign": 1
					}
				],
				23: [function (e, t, a) {
						function n() {
							try {
								this.selectedKey = localStorage.getItem(s) || o
							} catch (e) {
								console.error("Failed to load viewer profile: %s", e)
							}
							this.dialog = this.createDialog_(r.Viewers),
							this.root = null
						}
						var i = e("./emitter.js"),
						r = (e("./util.js"), e("./device-info.js")),
						o = "CardboardV1",
						s = "WEBVR_CARDBOARD_VIEWER",
						c = "webvr-polyfill-viewer-selector";
						n.prototype = new i,
						n.prototype.show = function (e) {
							this.root = e,
							e.appendChild(this.dialog);
							var t = this.dialog.querySelector("#" + this.selectedKey);
							t.checked = !0,
							this.dialog.style.display = "block"
						},
						n.prototype.hide = function () {
							this.root && this.root.contains(this.dialog) && this.root.removeChild(this.dialog),
							this.dialog.style.display = "none"
						},
						n.prototype.getCurrentViewer = function () {
							return r.Viewers[this.selectedKey]
						},
						n.prototype.getSelectedKey_ = function () {
							var e = this.dialog.querySelector("input[name=field]:checked");
							return e ? e.id : null
						},
						n.prototype.onSave_ = function () {
							if (this.selectedKey = this.getSelectedKey_(), !this.selectedKey || !r.Viewers[this.selectedKey])
								return void console.error("ViewerSelector.onSave_: this should never happen!");
							this.emit("change", r.Viewers[this.selectedKey]);
							try {
								localStorage.setItem(s, this.selectedKey)
							} catch (e) {
								console.error("Failed to save viewer profile: %s", e)
							}
							this.hide()
						},
						n.prototype.createDialog_ = function (e) {
							var t = document.createElement("div");
							t.classList.add(c),
							t.style.display = "none";
							var a = document.createElement("div"),
							n = a.style;
							n.position = "fixed",
							n.left = 0,
							n.top = 0,
							n.width = "100%",
							n.height = "100%",
							n.background = "rgba(0, 0, 0, 0.3)",
							a.addEventListener("click", this.hide.bind(this));
							var i = 280,
							r = document.createElement("div"),
							n = r.style;
							n.boxSizing = "border-box",
							n.position = "fixed",
							n.top = "24px",
							n.left = "50%",
							n.marginLeft = -i / 2 + "px",
							n.width = i + "px",
							n.padding = "24px",
							n.overflow = "hidden",
							n.background = "#fafafa",
							n.fontFamily = "'Roboto', sans-serif",
							n.boxShadow = "0px 5px 20px #666",
							r.appendChild(this.createH1_("Select your viewer"));
							for (var o in e)
								r.appendChild(this.createChoice_(o, e[o].label));
							return r.appendChild(this.createButton_("Save", this.onSave_.bind(this))),
							t.appendChild(a),
							t.appendChild(r),
							t
						},
						n.prototype.createH1_ = function (e) {
							var t = document.createElement("h1"),
							a = t.style;
							return a.color = "black",
							a.fontSize = "20px",
							a.fontWeight = "bold",
							a.marginTop = 0,
							a.marginBottom = "24px",
							t.innerHTML = e,
							t
						},
						n.prototype.createChoice_ = function (e, t) {
							var a = document.createElement("div");
							a.style.marginTop = "8px",
							a.style.color = "black";
							var n = document.createElement("input");
							n.style.fontSize = "30px",
							n.setAttribute("id", e),
							n.setAttribute("type", "radio"),
							n.setAttribute("value", e),
							n.setAttribute("name", "field");
							var i = document.createElement("label");
							return i.style.marginLeft = "4px",
							i.setAttribute("for", e),
							i.innerHTML = t,
							a.appendChild(n),
							a.appendChild(i),
							a
						},
						n.prototype.createButton_ = function (e, t) {
							var a = document.createElement("button");
							a.innerHTML = e;
							var n = a.style;
							return n["float"] = "right",
							n.textTransform = "uppercase",
							n.color = "#1094f7",
							n.fontSize = "14px",
							n.letterSpacing = 0,
							n.border = 0,
							n.background = "none",
							n.marginTop = "16px",
							a.addEventListener("click", t),
							a
						},
						t.exports = n
					}, {
						"./device-info.js": 7,
						"./emitter.js": 12,
						"./util.js": 22
					}
				],
				24: [function (e, t, a) {
						function n() {
							var e = document.createElement("video");
							e.addEventListener("ended", function () {
								e.play()
							}),
							this.request = function () {
								e.paused && (e.src = o.base64("video/mp4", "AAAAGGZ0eXBpc29tAAAAAG1wNDFhdmMxAAAIA21vb3YAAABsbXZoZAAAAADSa9v60mvb+gABX5AAlw/gAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAdkdHJhawAAAFx0a2hkAAAAAdJr2/rSa9v6AAAAAQAAAAAAlw/gAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAQAAAAHAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAJcP4AAAAAAAAQAAAAAG3G1kaWEAAAAgbWRoZAAAAADSa9v60mvb+gAPQkAGjneAFccAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAABodtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAZHc3RibAAAAJdzdHNkAAAAAAAAAAEAAACHYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAMABwASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAADFhdmNDAWQAC//hABlnZAALrNlfllw4QAAAAwBAAAADAKPFCmWAAQAFaOvssiwAAAAYc3R0cwAAAAAAAAABAAAAbgAPQkAAAAAUc3RzcwAAAAAAAAABAAAAAQAAA4BjdHRzAAAAAAAAAG4AAAABAD0JAAAAAAEAehIAAAAAAQA9CQAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEATEtAAAAAAQAehIAAAAABAAAAAAAAAAEAD0JAAAAAAQBMS0AAAAABAB6EgAAAAAEAAAAAAAAAAQAPQkAAAAABAExLQAAAAAEAHoSAAAAAAQAAAAAAAAABAA9CQAAAAAEALcbAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAABuAAAAAQAAAcxzdHN6AAAAAAAAAAAAAABuAAADCQAAABgAAAAOAAAADgAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABIAAAAOAAAADAAAAAwAAAASAAAADgAAAAwAAAAMAAAAEgAAAA4AAAAMAAAADAAAABMAAAAUc3RjbwAAAAAAAAABAAAIKwAAACt1ZHRhAAAAI6llbmMAFwAAdmxjIDIuMi4xIHN0cmVhbSBvdXRwdXQAAAAId2lkZQAACRRtZGF0AAACrgX//6vcRem95tlIt5Ys2CDZI+7veDI2NCAtIGNvcmUgMTQyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDEzIG1lPWhleCBzdWJtZT03IHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTEgdHJlbGxpcz0xIDh4OGRjdD0xIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MTIgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1hYnIgbWJ0cmVlPTEgYml0cmF0ZT0xMDAgcmF0ZXRvbD0xLjAgcWNvbXA9MC42MCBxcG1pbj0xMCBxcG1heD01MSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAU2WIhAAQ/8ltlOe+cTZuGkKg+aRtuivcDZ0pBsfsEi9p/i1yU9DxS2lq4dXTinViF1URBKXgnzKBd/Uh1bkhHtMrwrRcOJslD01UB+fyaL6ef+DBAAAAFEGaJGxBD5B+v+a+4QqF3MgBXz9MAAAACkGeQniH/+94r6EAAAAKAZ5hdEN/8QytwAAAAAgBnmNqQ3/EgQAAAA5BmmhJqEFomUwIIf/+4QAAAApBnoZFESw//76BAAAACAGepXRDf8SBAAAACAGep2pDf8SAAAAADkGarEmoQWyZTAgh//7gAAAACkGeykUVLD//voEAAAAIAZ7pdEN/xIAAAAAIAZ7rakN/xIAAAAAOQZrwSahBbJlMCCH//uEAAAAKQZ8ORRUsP/++gQAAAAgBny10Q3/EgQAAAAgBny9qQ3/EgAAAAA5BmzRJqEFsmUwIIf/+4AAAAApBn1JFFSw//76BAAAACAGfcXRDf8SAAAAACAGfc2pDf8SAAAAADkGbeEmoQWyZTAgh//7hAAAACkGflkUVLD//voAAAAAIAZ+1dEN/xIEAAAAIAZ+3akN/xIEAAAAOQZu8SahBbJlMCCH//uAAAAAKQZ/aRRUsP/++gQAAAAgBn/l0Q3/EgAAAAAgBn/tqQ3/EgQAAAA5Bm+BJqEFsmUwIIf/+4QAAAApBnh5FFSw//76AAAAACAGePXRDf8SAAAAACAGeP2pDf8SBAAAADkGaJEmoQWyZTAgh//7gAAAACkGeQkUVLD//voEAAAAIAZ5hdEN/xIAAAAAIAZ5jakN/xIEAAAAOQZpoSahBbJlMCCH//uEAAAAKQZ6GRRUsP/++gQAAAAgBnqV0Q3/EgQAAAAgBnqdqQ3/EgAAAAA5BmqxJqEFsmUwIIf/+4AAAAApBnspFFSw//76BAAAACAGe6XRDf8SAAAAACAGe62pDf8SAAAAADkGa8EmoQWyZTAgh//7hAAAACkGfDkUVLD//voEAAAAIAZ8tdEN/xIEAAAAIAZ8vakN/xIAAAAAOQZs0SahBbJlMCCH//uAAAAAKQZ9SRRUsP/++gQAAAAgBn3F0Q3/EgAAAAAgBn3NqQ3/EgAAAAA5Bm3hJqEFsmUwIIf/+4QAAAApBn5ZFFSw//76AAAAACAGftXRDf8SBAAAACAGft2pDf8SBAAAADkGbvEmoQWyZTAgh//7gAAAACkGf2kUVLD//voEAAAAIAZ/5dEN/xIAAAAAIAZ/7akN/xIEAAAAOQZvgSahBbJlMCCH//uEAAAAKQZ4eRRUsP/++gAAAAAgBnj10Q3/EgAAAAAgBnj9qQ3/EgQAAAA5BmiRJqEFsmUwIIf/+4AAAAApBnkJFFSw//76BAAAACAGeYXRDf8SAAAAACAGeY2pDf8SBAAAADkGaaEmoQWyZTAgh//7hAAAACkGehkUVLD//voEAAAAIAZ6ldEN/xIEAAAAIAZ6nakN/xIAAAAAOQZqsSahBbJlMCCH//uAAAAAKQZ7KRRUsP/++gQAAAAgBnul0Q3/EgAAAAAgBnutqQ3/EgAAAAA5BmvBJqEFsmUwIIf/+4QAAAApBnw5FFSw//76BAAAACAGfLXRDf8SBAAAACAGfL2pDf8SAAAAADkGbNEmoQWyZTAgh//7gAAAACkGfUkUVLD//voEAAAAIAZ9xdEN/xIAAAAAIAZ9zakN/xIAAAAAOQZt4SahBbJlMCCH//uEAAAAKQZ+WRRUsP/++gAAAAAgBn7V0Q3/EgQAAAAgBn7dqQ3/EgQAAAA5Bm7xJqEFsmUwIIf/+4AAAAApBn9pFFSw//76BAAAACAGf+XRDf8SAAAAACAGf+2pDf8SBAAAADkGb4EmoQWyZTAgh//7hAAAACkGeHkUVLD//voAAAAAIAZ49dEN/xIAAAAAIAZ4/akN/xIEAAAAOQZokSahBbJlMCCH//uAAAAAKQZ5CRRUsP/++gQAAAAgBnmF0Q3/EgAAAAAgBnmNqQ3/EgQAAAA5BmmhJqEFsmUwIIf/+4QAAAApBnoZFFSw//76BAAAACAGepXRDf8SBAAAACAGep2pDf8SAAAAADkGarEmoQWyZTAgh//7gAAAACkGeykUVLD//voEAAAAIAZ7pdEN/xIAAAAAIAZ7rakN/xIAAAAAPQZruSahBbJlMFEw3//7B"), e.play())
							},
							this.release = function () {
								e.pause(),
								e.src = ""
							}
						}
						function i() {
							var e = null;
							this.request = function () {
								e || (e = setInterval(function () {
											window.location = window.location,
											setTimeout(window.stop, 0)
										}, 3e4))
							},
							this.release = function () {
								e && (clearInterval(e), e = null)
							}
						}
						function r() {
							var e = navigator.userAgent || navigator.vendor || window.opera;
							return e.match(/iPhone/i) || e.match(/iPod/i) ? i : n
						}
						var o = e("./util.js");
						t.exports = r()
					}, {
						"./util.js": 22
					}
				],
				25: [function (e, t, a) {
						function n() {
							this.displays = [],
							this.devices = [],
							this.devicesPopulated = !1,
							this.nativeWebVRAvailable = this.isWebVRAvailable(),
							this.nativeLegacyWebVRAvailable = this.isDeprecatedWebVRAvailable(),
							this.nativeLegacyWebVRAvailable || (this.nativeWebVRAvailable || this.enablePolyfill(), WebVRConfig.ENABLE_DEPRECATED_API && this.enableDeprecatedPolyfill())
						}
						var i = e("./cardboard-vr-display.js"),
						r = e("./mouse-keyboard-vr-display.js"),
						o = e("./base.js").VRDisplay,
						s = e("./base.js").HMDVRDevice,
						c = e("./base.js").PositionSensorVRDevice,
						l = e("./display-wrappers.js").VRDisplayHMDDevice,
						u = e("./display-wrappers.js").VRDisplayPositionSensorDevice;
						n.prototype.isWebVRAvailable = function () {
							return "getVRDisplays" in navigator
						},
						n.prototype.isDeprecatedWebVRAvailable = function () {
							return "getVRDevices" in navigator || "mozGetVRDevices" in navigator
						},
						n.prototype.populateDevices = function () {
							if (!this.devicesPopulated) {
								var e = null;
								this.isCardboardCompatible() && (e = new i, this.displays.push(e), WebVRConfig.ENABLE_DEPRECATED_API && (this.devices.push(new l(e)), this.devices.push(new u(e)))),
								this.isMobile() || WebVRConfig.MOUSE_KEYBOARD_CONTROLS_DISABLED || (e = new r, this.displays.push(e), WebVRConfig.ENABLE_DEPRECATED_API && (this.devices.push(new l(e)), this.devices.push(new u(e)))),
								this.devicesPopulated = !0
							}
						},
						n.prototype.enablePolyfill = function () {
							navigator.getVRDisplays = this.getVRDisplays.bind(this),
							window.VRDisplay = o
						},
						n.prototype.enableDeprecatedPolyfill = function () {
							navigator.getVRDevices = this.getVRDevices.bind(this),
							window.HMDVRDevice = s,
							window.PositionSensorVRDevice = c
						},
						n.prototype.getVRDisplays = function () {
							this.populateDevices();
							var e = this.displays;
							return new Promise(function (t, a) {
								try {
									t(e)
								} catch (n) {
									a(n)
								}
							})
						},
						n.prototype.getVRDevices = function () {
							console.warn("getVRDevices is deprecated. Please update your code to use getVRDisplays instead.");
							var e = this;
							return new Promise(function (t, a) {
								try {
									if (!e.devicesPopulated) {
										if (e.nativeWebVRAvailable)
											return navigator.getVRDisplays(function (a) {
												for (var n = 0; n < a.length; ++n)
													e.devices.push(new l(a[n])), e.devices.push(new u(a[n]));
												e.devicesPopulated = !0,
												t(e.devices)
											}, a);
										if (e.nativeLegacyWebVRAvailable)
											return (navigator.getVRDDevices || navigator.mozGetVRDevices)(function (a) {
												for (var n = 0; n < a.length; ++n)
													a[n]instanceof s && e.devices.push(a[n]), a[n]instanceof c && e.devices.push(a[n]);
												e.devicesPopulated = !0,
												t(e.devices)
											}, a)
									}
									e.populateDevices(),
									t(e.devices)
								} catch (n) {
									a(n)
								}
							})
						},
						n.prototype.isMobile = function () {
							return /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)
						},
						n.prototype.isCardboardCompatible = function () {
							return this.isMobile() || WebVRConfig.FORCE_ENABLE_VR
						},
						t.exports = n
					}, {
						"./base.js": 2,
						"./cardboard-vr-display.js": 5,
						"./display-wrappers.js": 8,
						"./mouse-keyboard-vr-display.js": 15
					}
				]
			}, {}, [13])
		}
	]);