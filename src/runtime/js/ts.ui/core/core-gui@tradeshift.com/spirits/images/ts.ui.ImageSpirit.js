/**
 * Spirit of the image. Note that all this fallback image functionality should
 * probably be moved serverside (on an open accesss point) at some point.
 * TODO: Read https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa#Unicode_Strings
 * @using {string} css (this is the Base64 encoded "'Open Sans" in weight 400)
 */
ts.ui.ImageSpirit = (function using(fontcss, UNIT_DOUBLE) {
	/**
	 * Generate URL from Blob stylesheet. The stylesheet
	 * contains the font so that we can use that in SVG.
	 * It turns out that Chrome doesn't do `@import` in
	 * SVG files, so we should probably convert this to
	 * something that works more optimized.
	 * @type {string}
	 */
	var fontsheet = (function generatesheet() {
		return gui.Client.hasBlob
			? URL.createObjectURL(new Blob([fontcss], { type: 'text/css' }))
			: null;
	})();

	/**
	 * With our current setup, only Firefox can handle the font in
	 * a really optimized way because Chrome can't use `@import` in
	 * SVG files. If that becomes a problem, we must fix it. But
	 * the fast workaround is to return `null` which will then
	 * fallback the font to Arial in that browser. Note that this
	 * should only be a problem if there are hundreds of generated
	 * images being rendered at the exact same time.
	 * @param {string} agent
	 * @returns string;
	 */
	function getfontsheet(agent) {
		switch (agent) {
			case 'gecko':
			case 'webkit':
				return fontsheet;
			default:
				return null;
		}
	}

	/**
	 * Get computed image source (caching this to optimize repeated requests).
	 * TODO: Use Blob URL instead of base64 in browsers that support it.
	 * @param {string}
	 * @param @optional {number} width
	 * @param @optional {number} height
	 */
	var getsource = gui.Combo.memoized(function(name, width, height) {
		return (
			'data:image/svg+xml;base64,' +
			window.btoa(
				ts.ui.svgname.edbml(
					getinitials(name),
					getcolorval(name, 50),
					getcolorval(name, -180),
					width || height || UNIT_DOUBLE,
					getfontsheet(gui.Client.agent),
					fontcss
				)
			)
		);
	});

	/**
	 * Get initials for name.
	 * If the name is Karl Benson(Ka), It will return KA
	 * @param {string} name
	 * @returns {string}
	 */
	function getinitials(name) {
		var regExp = /\(([^)]+)\)/;
		if (regExp.test(name)) {
			return regExp.exec(name)[1].toUpperCase();
		}
		var names = name.split(/\s+/);
		var first = names.shift();
		var last = names.pop() || '';
		return (first[0] + (last[0] || '')).toUpperCase();
	}

	/**
	 * Compute consistantly pleasent color for given string.
	 * @param {string} str
	 * @param @optional {number} mod Darken or ligthen mod
	 */
	function getcolorval(name, mod) {
		var base = [245, 245, 245]; // TODO: optimize for diff backgrounds
		var r = base[0];
		var g = base[1];
		var b = base[2];
		var red = color(name, 3);
		var green = color(name, 5);
		var blue = color(name, 7);
		red = (red + r) / 2;
		green = (green + g) / 2;
		blue = (blue + b) / 2;
		var col = [red, green, blue].map(Math.floor);
		return 'rgb(' + darken(col, mod || 0).join(',') + ')';
	}

	/**
	 * Obscurely darken or lighten a color.
	 * https://gist.github.com/p01/1005192
	 */
	function darken(c, n) {
		return c.map(function(d) {
			return (d += n) < 0 ? 0 : d > 255 ? 255 : d | 0;
		});
	}

	/**
	 * Get integer hashcode.
	 * @param {string} word
	 * @param {number} n
	 * @returns {number}
	 */
	function hash(word, n) {
		var h = 0;
		for (var i = 0; i < word.length; i++) {
			h = word.charCodeAt(i) + ((h << n) - h);
		}
		return Math.abs(h);
	}

	/**
	 * Get computed color value.
	 * @param {string} word
	 * @param {number} n
	 * @returns {number}
	 */
	function color(word, n) {
		return Math.floor(parseFloat('0.' + hash(word, n)) * 256);
	}

	return ts.ui.Spirit.extend(
		{
			/**
			 * Setup load handler (dependant on cache status).
			 */
			onconfigure: function() {
				this.super.onconfigure();
				var src = this.att.get('src');
				var alt = this.att.get('alt');
				var tit = this.att.get('title');
				if (src) {
					if (this.element.naturalWidth) {
						this._onload();
					} else {
						this.event.add('load').add('error');
					}
					if (alt && !tit) {
						this.att.set('title', alt);
					}
				} else {
					this.event.add('load');
					this.att.add('alt');
				}
			},

			/**
			 * Handle event.
			 * @param {Event} e
			 */
			onevent: function(e) {
				this.super.onevent(e);
				switch (e.type) {
					case 'load':
						this.event.remove('load');
						this._onload();
						break;
					case 'error':
						this.event.remove('error');
						this.att.add('alt');
						break;
				}
			},

			/**
			 * The ALT attribute will be used to generate a fallback
			 * image: We generate an SVG which we then Base64 encode.
			 * @param {gui.Att} att
			 */
			onatt: function(att) {
				this.super.onatt(att);
				if (att.name === 'alt') {
					var val = String(att.value);
					if (!val.includes('{')) {
						// no weird handlebars syntax
						if (!this.att.has('title')) {
							this.att.set('title', val);
						}
						if (window.btoa) {
							this.element.src = this._computesource(att.value);
						} else {
							// We'll need to polyfill some Base64 stuff for Exploder :/
							console.warn('TODO: Image fallback for IE9');
						}
					}
				}
			},

			// Private .................................................................

			/**
			 * We've set the `opacity` to `0` while loading the image just
			 * in case the browser flashes some kind of strange symbol. But
			 * this is perhaps not needed nowadays, must check slow connection.
			 */
			_onload: function() {
				this.css.add('ts-loaded');
				this.action.dispatch(ts.ui.ACTION_DID_LOAD);
			},

			/**
			 * Compute fallback image source. Note that we don't read `offsetWidth`
			 * because that will force the browser the repaint mid-rendering, we'll
			 * suggest that the `width` attribute is specified (for best quality).
			 * @param {string} name
			 * @returns {string}
			 */
			_computesource: function(name) {
				var w = this.att.get('width');
				var h = this.att.get('height');
				if ((w || h) && w !== h) {
					console.error('Height of the ' + this + ' must match the width');
				}
				return getsource(name, w, h);
			}
		},
		{
			// Static ...............................................................

			/**
			 * Compute consistantly pleasent color for given string.
			 * Exposing this in case the color needs to be replicated.
			 * @param {string} str
			 * @returns {string}
			 */
			getColorForString: function(str) {
				return getcolorval(str);
			}
		}
	);
})(
	[
		'@font-face {',
		'	font-family: "Open Sans";',
		' font-style: normal;',
		' font-weight: 400;',
		"	src: url('data:application/font-woff;charset=utf-8;base64,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') format('woff');",
		'}'
	].join('\n'),
	ts.ui.UNIT_DOUBLE
);
