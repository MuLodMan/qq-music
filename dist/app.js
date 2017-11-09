/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RECOMMEND_URL = exports.RECOMMEND_URL = 'https://qq-music-api.now.sh';
var TOPLIST_URL = exports.TOPLIST_URL = 'https://qq-music-api.now.sh/top';
var SEARCH_URL = exports.SEARCH_URL = 'https://qq-music-api.now.sh/search';
var LYRICS_URL = exports.LYRICS_URL = 'https://qq-music-api.now.sh/lyrics';
var HotSearch_URL = exports.HotSearch_URL = 'http://localhost:4000/mostSearch';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.songUrl = songUrl;
exports.lyricsUrl = lyricsUrl;
exports.albumCoverUrl = albumCoverUrl;
exports.searchUrl = searchUrl;

var _constants = __webpack_require__(0);

function songUrl(id) {
  return 'http://ws.stream.qqmusic.qq.com/' + id + '.m4a?fromtag=46';
}

function lyricsUrl(songid) {
  return _constants.LYRICS_URL + '?id=' + songid;
}

function albumCoverUrl(id) {
  return 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + id + '.jpg';
}

function searchUrl(keyword) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return _constants.SEARCH_URL + '?keyword=' + keyword + '&page=' + page;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazyload = lazyload;
function lazyload(images) {
  var imgs = [].slice.call(images || document.querySelectorAll('.lazyload')); // Array.from(images)
  var onscroll = throttle(function () {
    if (imgs.length === 0) {
      return window.removeEventListener('scroll', onscroll);
    }
    imgs = imgs.filter(function (img) {
      return img.classList.contains('lazyload');
    });
    imgs.forEach(function (img) {
      return inViewport(img) && loadImage(img);
    });
  }, 300);

  window.addEventListener('scroll', onscroll);
  window.dispatchEvent(new Event('scroll'));
}

function throttle(func, wait) {
  var prev = void 0,
      timer = void 0;
  return function fn() {
    var curr = Date.now();
    var diff = curr - prev;
    if (!prev || diff >= wait) {
      func();
      prev = curr;
    } else if (diff < wait) {
      clearTimeout(timer);
      timer = setTimeout(fn, wait - diff);
    }
  };
}

function inViewport(img) {
  var _img$getBoundingClien = img.getBoundingClientRect(),
      top = _img$getBoundingClien.top,
      left = _img$getBoundingClien.left,
      right = _img$getBoundingClien.right,
      bottom = _img$getBoundingClien.bottom;

  var vpWidth = document.documentElement.clientWidth;
  var vpHeight = document.documentElement.clientHeight;
  return (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) && (left > 0 && left < vpWidth || right > 0 && right < vpWidth);
}

function loadImage(img, callback) {
  var image = new Image();
  image.src = img.dataset.src;
  image.onload = function () {
    img.src = image.src;
    img.classList.remove('lazyload');
    if (typeof callback === 'function') callback();
  };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _search = __webpack_require__(5);

var _toplist = __webpack_require__(6);

var _recommend = __webpack_require__(7);

var _music_player = __webpack_require__(9);

__webpack_require__(12);

var search = new _search.Search(document.querySelector('#search-view'));
var hotsearch = new _search.hotSearch();
var player = new _music_player.MusicPlayer(document.querySelector('#player'));
var toplist = new _toplist.TopList(document.querySelector('#rank-view')).launch();
var recommend = new _recommend.Recommend(document.querySelector('#rec-view')).launch();
if (hotsearch.listHtml.hasChildNodes()) {
  hotsearch.listHtml.addEventListener('click', function (e) {
    search.$input.value = e.target.textContent;
    search.$input.dispatchEvent(new Event('keyup'));
  });
}

document.querySelector('.show-player').addEventListener('click', function () {
  player.show();
});
search.$input.addEventListener('keyup', function (e) {
  var keyword = event.target.value.trim();
  if (keyword) hotsearch.listHtml.style.display = "none";else hotsearch.listHtml.style.display = "block";
  search.onKeyUp.call(search, e);
});
onHashChange();
addEventListener('hashchange', onHashChange);
function onHashChange() {
  var hash = location.hash;
  if (/^#player\?.+/.test(hash)) {
    var matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g);
    var options = matches && matches.reduce(function (res, cur) {
      var arr = cur.split('=');
      res[arr[0]] = decodeURIComponent(arr[1]);
      return res;
    }, {});
    player.play(options);
  } else {
    player.hide();
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tabSwith = document.querySelector('.navbar>.nav-list');
tabSwith.addEventListener('click', function (event) {

  var target = event.target;

  if (target.dataset.role !== 'tab') return;

  [].forEach.call(target.parentElement.children, function (tab) {
    tab.classList.remove('active');
  });
  target.classList.add('active');

  var content = document.querySelector(target.dataset.view);

  if (content) {
    [].forEach.call(content.parentElement.children, function (child) {
      child.style.display = 'none';
    });
    content.style.display = 'block';
  }
  if (target.dataset.view === "#search-view") return;
  window.dispatchEvent(new Event('scroll'));
});
tabSwith.firstElementChild.dispatchEvent(new Event('click', { bubbles: true }));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotSearch = exports.Search = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function () {
  function Search(el) {
    _classCallCheck(this, Search);

    this.$el = el;
    this.$input = this.$el.querySelector('#search');
    this.$songs = this.$el.querySelector('.song-list');
    this.page = 1;
    this.songs = {};
    this.keyword = '';
    this.perpage = 20;
    this.nomore = false;
    this.fetching = false;
    this.onscroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onscroll);
  }

  _createClass(Search, [{
    key: 'onKeyUp',
    value: function onKeyUp(event) {
      var keyword = event.target.value.trim(),
          searchInput = document.querySelector('.result_tags');
      if (!keyword) return this.reset();
      this.search(keyword);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(event) {
      if (this.nomore) return window.removeEventListener('scroll', this.onscroll);
      if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50) {
        this.search(this.keyword, this.page + 1);
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.page = 1;
      this.songs = {};
      this.keyword = '';
      this.nomore = false;
      this.$songs.innerHTML = '';
    }
  }, {
    key: 'search',
    value: function search(keyword, page) {
      var _this = this;

      if (this.keyword === keyword && this.songs[page || this.page]) return;
      if (this.nomore || this.fetching) return;
      if (this.keyword !== keyword) this.reset();
      this.keyword = keyword;
      this.loading();
      fetch((0, _helpers.searchUrl)(this.keyword, page || this.page)).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this.page = json.data.song.curpage;
        _this.songs[_this.page] = json.data.song.list;
        _this.nomore = json.message === 'no results';
        return json.data.song.list;
      }).then(function (songs) {
        return _this.append(songs);
      }).then(function () {
        return _this.done();
      }).catch(function () {
        return _this.fetching = false;
      });
    }
  }, {
    key: 'append',
    value: function append(songs) {
      var html = songs.map(function (song) {
        var artist = song.singer.map(function (s) {
          return s.name;
        }).join(' ');
        return '\n        <a class="song-item"\n           href="#player?artist=' + artist + '&songid=' + song.songid + '&songname=' + song.songname + '&albummid=' + song.albummid + '&duration=' + song.interval + '">\n          <i class="icon icon-music"></i>\n          <div class="song-name ellipsis">' + song.songname + '</div>\n          <div class="song-artist ellipsis">' + artist + '</div>\n        </a>';
      }).join('');
      this.$songs.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: 'loading',
    value: function loading() {
      this.fetching = true;
      this.$el.querySelector('.search-loading').classList.add('show');
    }
  }, {
    key: 'done',
    value: function done() {
      this.fetching = false;
      if (this.nomore) {
        this.$el.querySelector('.loading-icon').style.display = 'none';
        this.$el.querySelector('.loading-text').style.display = 'none';
        this.$el.querySelector('.loading-done').style.display = 'block';
        this.$el.querySelector('.search-loading').classList.add('show');
      } else {
        this.$el.querySelector('.search-loading').classList.remove('show');
      }
    }
  }]);

  return Search;
}();

var hotSearch = function () {
  function hotSearch() {
    _classCallCheck(this, hotSearch);

    this.listHtml = document.querySelector('.result_tags');
    this.getResult();
  }

  _createClass(hotSearch, [{
    key: 'getResult',
    value: function getResult() {
      var req = new XMLHttpRequest();
      var that = this;
      req.open('get', _constants.HotSearch_URL);
      req.send();
      req.addEventListener("load", function (e) {
        // console.log(e)
        var results = JSON.parse(e.target.response);
        console.log(results);
        var htmlTemp = results.data.hotkey.map(function (e) {
          return '<a href="javascript:;" class="js_keyword tag_s">' + e.k + ' </a>';
        }).join('');
        that.listHtml.innerHTML = htmlTemp;
      });
    }
  }]);

  return hotSearch;
}();

exports.Search = Search;
exports.hotSearch = hotSearch;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lazyload = __webpack_require__(2);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopList = exports.TopList = function () {
  function TopList(el) {
    _classCallCheck(this, TopList);

    this.$el = el;
  }

  _createClass(TopList, [{
    key: 'launch',
    value: function launch() {
      var _this = this;

      fetch(_constants.TOPLIST_URL).then(function (res) {
        return res.json();
      }).then(function (json) {
        return _this.list = json.data.topList;
      }).then(function () {
        return _this.render();
      });
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.$el.querySelector('.toplist').innerHTML = this.list.map(function (item) {
        return '<li class="top-item">\n        <div class="top-item-media">\n          <a href="#">\n            <img class="lazyload" data-src="' + item.picUrl.replace('http://', 'https://') + '">\n          </a>\n        </div>\n        <div class="top-item-info">\n          <h3 class="top-item-title ellipsis">' + item.topTitle + '</h3>\n          <ul class="top-item-list">' + _this2.songlist(item.songList) + '</ul>\n        </div>\n      </li>';
      }).join('');

      (0, _lazyload.lazyload)(this.$el.querySelectorAll('.lazyload'));
    }
  }, {
    key: 'songlist',
    value: function songlist(songs) {
      return songs.map(function (song, i) {
        return '<li class="top-item-song">\n        <i class="song-index">' + (i + 1) + '</i>\n        <span class="song-name">' + song.songname + '</span>- ' + song.singername + '\n      </li>';
      }).join('');
    }
  }]);

  return TopList;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recommend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slider = __webpack_require__(8);

var _lazyload = __webpack_require__(2);

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recommend = exports.Recommend = function () {
  function Recommend(el) {
    _classCallCheck(this, Recommend);

    this.$el = el;
  }

  _createClass(Recommend, [{
    key: 'launch',
    value: function launch() {
      var _this = this;

      fetch(_constants.RECOMMEND_URL).then(function (res) {
        return res.json();
      }).then(function (json) {
        return _this.json = json;
      }).then(function () {
        return _this.render();
      });
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      this.renderSlider(this.json.data.slider);
      this.renderRadios(this.json.data.radioList);
      this.renderPlayLists(this.json.data.songList);
      (0, _lazyload.lazyload)();
    }
  }, {
    key: 'renderSlider',
    value: function renderSlider(slides) {
      this.slider = new _slider.Slider({
        el: this.$el.querySelector('#slider'),
        slides: slides.map(function (slide) {
          return {
            link: slide.linkUrl.replace('http://', 'https://'),
            image: slide.picUrl.replace('http://', 'https://')
          };
        })
      });
    }
  }, {
    key: 'renderRadios',
    value: function renderRadios(radios) {
      this.$el.querySelector('.radios .list').innerHTML = radios.map(function (radio) {
        return '<div class="list-item">\n        <div class="list-media">\n          <img class="lazyload" data-src="' + radio.picUrl + '">\n          <span class="icon icon-play"></span>\n        </div>\n        <div class="list-detail">\n          <h3 class="list-title">' + radio.Ftitle + '</h3>\n        </div>\n      </div>';
      }).join('');
    }
  }, {
    key: 'renderPlayLists',
    value: function renderPlayLists(playlists) {
      this.$el.querySelector('.playlists .list').innerHTML = playlists.map(function (list) {
        return '<div class="list-item">\n        <div class="list-media">\n          <img class="lazyload" data-src="' + list.picUrl + '">\n          <span class="icon icon-play"></span>\n        </div>\n        <div class="list-detail">\n          <h3 class="list-title">' + list.songListDesc + '</h3>\n          <div class="list-text"></div>\n        </div>\n      </div>';
      }).join('');
    }
  }]);

  return Recommend;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = exports.Slider = function () {
  function Slider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    this.$el = options.el;
    this.slides = options.slides;
    this.interval = options.interval || 3000;
    this.duration = options.duration || 300;
    this.index = 0;
    this.render();
    this.start();
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      this.$el.innerHTML = '<div class="qq-slider-wrap"></div>';
      this.$wrap = this.$el.firstElementChild;
      this.$wrap.style.transitionDuration = this.duration + 'ms';
      this.$wrap.style.width = this.slides.length * 100 + '%';
      this.$wrap.innerHTML = this.slides.map(function (slide) {
        return '<div class="qq-slider-item">\n          <a href="' + slide.link + '">\n            <img src="' + slide.image + '">\n          </a>\n      </div>';
      }).join('');
    }
  }, {
    key: 'start',
    value: function start() {
      setInterval(this.next.bind(this), this.interval);
    }
  }, {
    key: 'next',
    value: function next() {
      this.index += 1;
      if (this.index === this.slides.length) {
        this.$wrap.style.transform = 'translate(0)';
        this.index = 0;
        return;
      }
      this.$wrap.style.transform = 'translate(-' + this.index * 100 / this.slides.length + '%)';
    }
  }]);

  return Slider;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _progress_bar = __webpack_require__(10);

var _lyrics_player = __webpack_require__(11);

var _helpers = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MusicPlayer = exports.MusicPlayer = function () {
  function MusicPlayer(el) {
    _classCallCheck(this, MusicPlayer);

    this.$el = el;
    this.$el.addEventListener('click', this.onOff.bind(this));
    this.$audio = this.createAudio();
    this.lyrics = new _lyrics_player.LyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio);
    this.progress = new _progress_bar.ProgressBar(this.$el.querySelector('.progress'));
    this.fetching = false;
  }

  _createClass(MusicPlayer, [{
    key: 'createAudio',
    value: function createAudio() {
      var _this = this;

      var audio = document.createElement('audio');
      audio.id = 'player-' + Math.floor(Math.random() * 100) + '-' + +new Date();
      audio.addEventListener('ended', function () {
        _this.$audio.play();
        _this.lyrics.restart();
        _this.progress.restart();
      });
      document.body.appendChild(audio);
      return audio;
    }
  }, {
    key: 'onOff',
    value: function onOff(event) {
      var target = event.target;
      switch (true) {
        case target.matches('.icon-play'):
          this.onPlay(event);
          break;
        case target.matches('.icon-pause'):
          this.onPause(event);
          break;
        case target.matches('.icon-list'):
          this.hide();
          break;
      }
    }
  }, {
    key: 'onPlay',
    value: function onPlay(event) {
      if (this.fetching) return;
      this.$audio.play();
      this.lyrics.start();
      this.progress.start();
      event.target.classList.add('icon-pause');
      event.target.classList.remove('icon-play');
    }
  }, {
    key: 'onPause',
    value: function onPause(event) {
      this.$audio.pause();
      this.lyrics.pause();
      this.progress.pause();
      event.target.classList.add('icon-play');
      event.target.classList.remove('icon-pause');
    }
  }, {
    key: 'onPosition',
    value: function onPosition(e) {
      // console.log(e.target.style.transform.replace(/translate\((.+?)\)/g,'$1'))
      var clickBarPosition = e.clientX - this.$el.querySelector('.progress-elapsed').offsetWidth,
          ratio = clickBarPosition / e.target.clientWidth;
      this.$audio.currentTime = this.$audio.duration * ratio;
      this.progress.elapsed = ratio * this.progress.duration;
      this.progress.update(true);
      this.lyrics.update();
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!options) return;

      this.$el.querySelector('.song-name').innerText = options.songname;
      this.$el.querySelector('.song-artist').innerText = options.artist;
      this.progress.reset(options.duration);

      var coverUrl = (0, _helpers.albumCoverUrl)(options.albummid);
      this.$el.querySelector('.album-cover').src = coverUrl;
      this.$el.querySelector('.player-background').style.backgroundImage = 'url(' + coverUrl + ')';

      if (options.songid) {
        if (this.songid !== options.songid) {
          this.$el.querySelector('.icon-action').className = 'icon-action icon-play';
        }

        this.songid = options.songid;
        this.$audio.src = (0, _helpers.songUrl)(this.songid);
        this.fetching = true;
        fetch((0, _helpers.lyricsUrl)(this.songid)).then(function (res) {
          return res.json();
        }).then(function (json) {
          return json.lyric;
        }).then(function (text) {
          return _this2.lyrics.reset(text);
        }).catch(function () {}).then(function () {
          return _this2.fetching = false;
        });
      }
      this.show();
      this.progress.$el.querySelector('.progress-bar').addEventListener('click', this.onPosition.bind(this));
    }
  }, {
    key: 'show',
    value: function show() {
      this.$el.classList.add('show');
      document.body.classList.add('noscroll');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.$el.classList.remove('show');
      document.body.classList.remove('noscroll');
    }
  }]);

  return MusicPlayer;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = exports.ProgressBar = function () {
  function ProgressBar(el, duration, start) {
    _classCallCheck(this, ProgressBar);

    this.$el = el;
    this.elapsed = 0;
    this.duration = duration || 0;
    this.progress = 0;
    this.render();
    this.$progress = this.$el.querySelector('.progress-bar-progress');
    this.$elapsed = this.$el.querySelector('.progress-elapsed');
    this.$duration = this.$el.querySelector('.progress-duration');
    this.$elapsed.innerText = this.formatTime(this.elapsed);
    this.$duration.innerText = this.formatTime(this.duration);
    if (start) this.start();
  }

  _createClass(ProgressBar, [{
    key: 'start',
    value: function start() {
      this.pause();
      this.intervalId = setInterval(this.update.bind(this), 50);
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearInterval(this.intervalId);
    }
  }, {
    key: 'update',
    value: function update() {
      this.elapsed += 0.05;
      if (this.elapsed >= this.duration) this.reset();
      this.progress = this.elapsed / this.duration;
      this.$progress.style.transform = 'translate(' + (this.progress * 100 - 100) + '%)';
      this.$elapsed.innerText = this.formatTime(this.elapsed);
    }
  }, {
    key: 'reset',
    value: function reset(duration) {
      this.pause();
      this.elapsed = 0;
      this.progress = 0;
      this.$progress.style.transform = 'translate(-100%)';
      this.$elapsed.innerText = this.formatTime(this.elapsed);
      if (duration) {
        this.duration = +duration;
        this.$duration.innerText = this.formatTime(this.duration);
      }
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.reset();
      this.start();
    }
  }, {
    key: 'render',
    value: function render() {
      this.$el.innerHTML = '\n      <div class="progress-time progress-elapsed"></div>\n        <div class="progress-bar">\n          <div class="progress-bar-progress"></div>\n        </div>\n      <div class="progress-time progress-duration"></div>\n    ';
    }
  }, {
    key: 'formatTime',
    value: function formatTime(seconds) {
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      if (mins < 10) mins = '0' + mins;
      if (secs < 10) secs = '0' + secs;
      return mins + ':' + secs;
    }
  }]);

  return ProgressBar;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LyricsPlayer = exports.LyricsPlayer = function () {
  function LyricsPlayer(el, audio) {
    _classCallCheck(this, LyricsPlayer);

    this.$el = el;
    this.$el.innerHTML = '<div class="player-lyrics-lines"></div>';
    this.$lines = this.$el.querySelector('.player-lyrics-lines');
    this.$audio = audio;
    this.text = '';
    this.index = 0;
    this.lyrics = [];
    this.elapsed = 0;
    this.reset(this.text);
  }

  _createClass(LyricsPlayer, [{
    key: 'start',
    value: function start() {
      this.pause();
      this.intervalId = setInterval(this.update.bind(this), 1000);
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearInterval(this.intervalId);
    }
  }, {
    key: 'update',
    value: function update() {
      this.elapsed = Math.round(this.$audio ? this.$audio.currentTime : this.elapsed + 1);
      if (this.index === this.lyrics.length - 1) return;
      for (var i = 0; i < this.lyrics.length; i++) {
        var seconds = this.getSeconds(this.lyrics[i]);
        if (this.elapsed === seconds) {
          this.$lines.children[this.index].classList.remove('active');
          this.$lines.children[i].classList.add('active');
          this.index = i;
          break;
        }
        if (this.elapsed < seconds) {
          this.$lines.children[this.index].classList.remove('active');
          this.$lines.children[i - 1].classList.add('active');
          this.index = i - 1;
          break;
        }
      }
      // if (this.index > 2) {
      //   let y = -(this.index - 2) * this.LINE_HEIGHT
      //   this.$lines.style.transform = `translateY(${y}px)`
      // }
      var y = -this.index * this.LINE_HEIGHT;
      this.$lines.style.transform = 'translateY(' + y + 'px)';
    }
  }, {
    key: 'render',
    value: function render() {
      var html = this.lyrics.map(function (line) {
        return '\n      <div class="player-lyrics-line">' + line.slice(10) + '</div>\n    ';
      }).join('');
      this.$lines.innerHTML = html;
    }
  }, {
    key: 'reset',
    value: function reset(text) {
      this.pause();
      this.index = 0;
      this.elapsed = 0;

      this.$lines.style.transform = 'translateY(0)';
      var $active = this.$lines.querySelector('.active');
      if ($active) {
        $active.classList.remove('active');
      }

      if (text) {
        this.text = this.formatText(text) || '';
        this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];
        if (this.lyrics.length) this.render();
      }

      if (this.lyrics.length) {
        this.$lines.children[this.index].classList.add('active');
      }
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.reset();
      this.start();
    }
  }, {
    key: 'getSeconds',
    value: function getSeconds(line) {
      return +line.replace(/^\[(\d{2}):(\d{2}).*/, function (match, p1, p2) {
        return 60 * +p1 + +p2;
      });
    }
  }, {
    key: 'formatText',
    value: function formatText(text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      return div.innerText;
    }
  }]);

  return LyricsPlayer;
}();

LyricsPlayer.prototype.LINE_HEIGHT = 42;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/less-loader/dist/cjs.js!./app.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/less-loader/dist/cjs.js!./app.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(undefined);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box;\n}\nbody {\n  margin: 0;\n}\nh1,\nh2,\nh3 {\n  margin: 0;\n  font-weight: normal;\n}\nul,\nol {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\na {\n  text-decoration: none;\n}\ni {\n  font-style: normal;\n}\n#header {\n  display: flex;\n  align-items: center;\n  height: 44px;\n  background: #31c27c;\n}\n#header h1 {\n  display: none;\n}\n#header #logo {\n  height: 25px;\n  margin-left: 10px;\n}\n#header .show-player {\n  position: absolute;\n  display: inline-block;\n  right: 10px;\n  top: 8px;\n  height: 28px;\n  padding: 0 12px;\n  line-height: 28px;\n  border-radius: 99px;\n  font-size: 14px;\n  background: #149c5a;\n  color: #fff;\n}\n.navbar {\n  background: #fff;\n}\n.navbar .nav-list {\n  display: flex;\n  align-items: center;\n}\n.navbar .nav-list .nav-item {\n  flex: 1;\n  cursor: pointer;\n  position: relative;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.6);\n  height: 40px;\n  line-height: 40px;\n}\n.navbar .nav-list .nav-item.active {\n  color: #31c27c;\n}\n.navbar .nav-list .nav-item.active::after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #31c27c;\n}\n.qq-slider {\n  width: 100%;\n  overflow: hidden;\n}\n.qq-slider .qq-slider-wrap {\n  display: flex;\n}\n.qq-slider .qq-slider-item {\n  flex-basis: 100%;\n}\n.qq-slider .qq-slider-item > a {\n  display: block;\n}\n.qq-slider .qq-slider-item > a img {\n  width: 100%;\n  display: block;\n}\n.noscroll {\n  overflow: hidden;\n}\n.ellipsis {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.radios,\n.playlists {\n  margin: 14px 2px 0 10px;\n}\n.radios .title,\n.playlists .title {\n  color: #000;\n  font-size: 16px;\n  margin-bottom: 11px;\n}\n.radios .list,\n.playlists .list {\n  display: flex;\n  flex-wrap: wrap;\n}\n.radios .list .list-item,\n.playlists .list .list-item {\n  flex: 1;\n  flex-basis: 40%;\n  background: #fff;\n  margin-right: 8px;\n  margin-bottom: 10px;\n}\n.radios .list .list-item .list-media,\n.playlists .list .list-item .list-media {\n  position: relative;\n  margin-bottom: 5px;\n}\n.radios .list .list-item .list-detail,\n.playlists .list .list-item .list-detail {\n  padding: 0 7px 5px;\n}\n.radios .list .list-item .list-title,\n.playlists .list .list-item .list-title {\n  font-size: 14px;\n}\n.radios .list .list-item .icon,\n.playlists .list .list-item .icon {\n  background-repeat: no-repeat;\n  background-size: 24px 60px;\n  background-image: url('images/icon_play.png');\n}\n.radios .list .list-item .icon-play,\n.playlists .list .list-item .icon-play {\n  height: 24px;\n  bottom: 5px;\n  right: 5px;\n  width: 24px;\n  position: absolute;\n  background-position: 0 0;\n}\n.radios .list .list-item img,\n.playlists .list .list-item img {\n  width: 100%;\n  display: block;\n  min-height: 145px;\n}\n.radios .list-title {\n  height: 36px;\n}\n#rec-view .footer {\n  margin: 10px 0 22px;\n}\n.footer-logo {\n  display: block;\n  width: 82px;\n  height: 24px;\n  margin: 0 auto 10px;\n  background-image: url(images/logo_footer.png);\n  background-repeat: no-repeat;\n  background-size: cover;\n  text-indent: -9999px;\n}\n#rank-view {\n  margin: 10px;\n}\n.toplist {\n  margin-bottom: 50px;\n}\n.toplist .top-item {\n  height: 100px;\n  background: #fff;\n  margin-bottom: 10px;\n}\n.toplist .top-item-media {\n  float: left;\n}\n.toplist .top-item-media img {\n  width: 100px;\n  height: 100px;\n  display: block;\n}\n.toplist .top-item-info {\n  position: relative;\n  padding: 7px 10px 6px 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.toplist .top-item-info::after {\n  content: '';\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  margin-top: -4px;\n  width: 6px;\n  height: 6px;\n  transform: rotate(315deg);\n  border-right: 1px solid #b2b2b2;\n  border-bottom: 1px solid #b2b2b2;\n}\n.toplist .top-item-title {\n  color: #000;\n  font-size: 16px;\n  font-weight: normal;\n  margin-bottom: 6px;\n}\n.toplist .top-item-list {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.5);\n}\n.toplist .top-item-list .top-item-song {\n  height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.toplist .top-item-list .song-index {\n  float: left;\n  min-width: 10px;\n  text-align: center;\n}\n.toplist .top-item-list .song-name {\n  color: #000;\n  margin-left: 8px;\n  margin-right: 5px;\n}\n.search-bar {\n  display: flex;\n  padding: 10px;\n  background: #f4f4f4;\n}\n.search-bar .input-wrap {\n  flex: 1;\n  position: relative;\n  border-radius: 3px;\n  background: #fff;\n  padding: 8px 12px 8px 35px;\n}\n.search-bar input {\n  flex: 1;\n  outline: 0;\n  height: 20px;\n  line-height: 20px;\n  width: 100%;\n  color: rgba(0, 0, 0, 0.3);\n  border: none;\n  display: block;\n  -webkit-appearance: none;\n  font-size: 14px;\n}\n.search-bar ::-webkit-input-placeholder {\n  color: #ccc;\n}\n.search-bar .icon-search {\n  position: absolute;\n  top: 9px;\n  left: 10px;\n  width: 18px;\n  height: 18px;\n  z-index: 3;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJlSURBVFhH7ZfRShRRHMb3Jkqzm7wJSrqIIDBxX6C0a62H6C7oqq4ixYreQMmMHkXbjLQeIYgyQuqiyIuotKDt923fyLCszv/MzF5EDnzs2T3/7zffOXNm5myjcXDUOAOtVquJ7qOn6AP6ZamtQ33NGk/ZG8VJJtEaagf1XJ7agwEdRI9zIT7RnkdT6Iz7VaO2flPf51z9I9oDtQQDNIxeGv6Nz9voaBFcNa79bu8LsYp8+/Z75FmYN3w/nwqUB204lFiDqYzd+txlek37RFkQ3pNIjDZaKsXBeMkATfloKUjOBGMMifUbXUzmYVp3oFvJ5j0M8GbNXEtiYtJzRtOru6lwAUfhsIZQdveNR30NTPccaD5sChbCXTD7btDSUCAdmqGpsClYCHPa7CdBSyeQXgEKNBI2BQthnjX7Y9DSCfTTpkNhU7AQ7jGzd4KWvgc67EDbKYH6eclOO9BmSqBsUU+HTcFCwJcdaCVo6Vyy7LZfCJuChbAfONCdoKUTKHsw6iE2FDYWFIqFthxoLImLSZsr3fqzScZ9isUyczWZiXEC6UWoF2LaaHqcDcY4+mHmheRAMmBe8oje8nmqFOQvZwS9N2uxLEcgbUuzDdpGmZnyzLxzGG3yqm1lARxH2VZEUz6DChc6NXoia83I087pRukZyozAjqCHvv6Cf0GL6Ao655MrgNr6TX1bDqF1qO/Xcv7qobymJoA+6xpxfvTd7VVqdxcw7au1h3IwbUfn0DJ6hb6ibbSJVtzX8w9B30JVWQf/QqibVQZYm7drpg5C7TmzuZnSI6JZ2yWoAnKo61UY/5f3Dy7dC4CdAEhQAAAAAElFTkSuQmCC);\n  background-repeat: no-repeat;\n  background-size: cover;\n  text-indent: -999px;\n}\n.search-results .song-item {\n  display: block;\n  position: relative;\n  height: 55px;\n  padding-left: 56px;\n  overflow: hidden;\n  background: #fff;\n  border-bottom: 1px solid #ddd;\n}\n.search-results .song-name {\n  margin: 10px 0 2px;\n  line-height: 18px;\n  font-size: 16px;\n  font-weight: normal;\n  color: #000;\n}\n.search-results .song-artist {\n  color: #808080;\n  font-size: 12px;\n}\n.search-results .icon-music {\n  top: 18px;\n  left: 18px;\n  width: 22px;\n  height: 20px;\n  position: absolute;\n  background-position: 0 0;\n  background-size: 22px 30px;\n  background-repeat: no-repeat;\n  background-image: url(images/search.png);\n}\n.search-loading {\n  height: 55px;\n  text-align: center;\n  position: relative;\n  display: none;\n  align-items: center;\n  justify-content: center;\n}\n.search-loading.show {\n  display: flex;\n}\n.search-loading .loading-icon {\n  top: -2px;\n  width: 20px;\n  height: 20px;\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  background-size: 20px 20px;\n  background-image: url('images/icon_loading.png');\n  animation: loading 1s infinite;\n}\n.search-loading .loading-text {\n  margin-left: 5px;\n}\n.search-loading .loading-done,\n.search-loading .loading-text {\n  color: #808080;\n  font-size: 12px;\n}\n@keyframes loading {\n  from {\n    transform: rotate(0deg);\n  }\n  8.32% {\n    transform: rotate(0deg);\n  }\n  8.33% {\n    transform: rotate(30deg);\n  }\n  16.65% {\n    transform: rotate(30deg);\n  }\n  16.66% {\n    transform: rotate(60deg);\n  }\n  24.99% {\n    transform: rotate(60deg);\n  }\n  25% {\n    transform: rotate(90deg);\n  }\n  33.32% {\n    transform: rotate(90deg);\n  }\n  33.33% {\n    transform: rotate(120deg);\n  }\n  41.65% {\n    transform: rotate(120deg);\n  }\n  41.66% {\n    transform: rotate(150deg);\n  }\n  49.99% {\n    transform: rotate(150deg);\n  }\n  50% {\n    transform: rotate(180deg);\n  }\n  58.32% {\n    transform: rotate(180deg);\n  }\n  58.33% {\n    transform: rotate(210deg);\n  }\n  66.65% {\n    transform: rotate(210deg);\n  }\n  66.66% {\n    transform: rotate(240deg);\n  }\n  74.99% {\n    transform: rotate(240deg);\n  }\n  75% {\n    transform: rotate(270deg);\n  }\n  83.32% {\n    transform: rotate(270deg);\n  }\n  83.33% {\n    transform: rotate(300deg);\n  }\n  91.65% {\n    transform: rotate(300deg);\n  }\n  91.66% {\n    transform: rotate(330deg);\n  }\n  99.99% {\n    transform: rotate(330deg);\n  }\n}\n.js_keyword.tag_s {\n  border-radius: 99px;\n  border: rgba(48, 65, 74, 0.9) 1px solid;\n  text-align: center;\n  padding: 0.1em;\n  color: rgba(48, 65, 74, 0.9);\n  display: inline-block;\n  margin: 5px;\n}\n#player {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9;\n  position: fixed;\n  transition: 0.3s;\n  overflow: hidden;\n  opacity: 0;\n  transform: translateY(-100%);\n}\n#player.show {\n  opacity: 1;\n  transform: translateY(0);\n}\n#player .player-container {\n  z-index: 9;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background: rgba(0, 0, 0, 0.6);\n}\n#player .player-background {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  background-size: cover;\n  background-position: bottom center;\n  filter: blur(15px);\n  transform: scale(1.15);\n}\n#player .player-header {\n  display: flex;\n  padding: 15px;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.1);\n}\n#player .player-header .icon-action {\n  width: 44px;\n  height: 44px;\n  border: solid 1px #fff;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.1);\n  opacity: .6;\n  margin-right: 10px;\n  background-image: url(images/sprite_play.png);\n  background-repeat: no-repeat;\n  background-size: 40px 380px;\n}\n#player .player-header .icon-play {\n  background-position: 15px -153px;\n}\n#player .player-header .icon-pause {\n  background-position: 17px -183px;\n}\n#player .player-header .album-cover {\n  width: 80px;\n  height: 80px;\n  display: block;\n  margin-right: 15px;\n}\n#player .player-header .song-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n#player .player-header .song-name {\n  height: 30px;\n  font-size: 18px;\n  font-weight: normal;\n  color: #fff;\n}\n#player .player-header .song-artist {\n  height: 21px;\n  font-size: 14px;\n  color: #fff;\n}\n#player .player-lyrics {\n  flex: 1;\n  overflow: hidden;\n  margin: 36px 0 60px 0;\n  color: rgba(255, 255, 255, 0.6);\n  max-height: calc(100%);\n}\n#player .player-lyrics .player-lyrics-lines {\n  overflow: hidden;\n  transition: .5s;\n}\n#player .player-lyrics .player-lyrics-line {\n  height: 42px;\n  line-height: 42px;\n  overflow: hidden;\n  padding: 0 15px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 16px;\n  color: rgba(255, 255, 255, 0.6);\n  text-align: center;\n}\n#player .player-lyrics .active {\n  color: #31c27c;\n}\n#player .player-footer {\n  position: relative;\n}\n#player .player-footer .icon-list {\n  width: 40px;\n  height: 40px;\n  right: 13px;\n  top: -40px;\n  position: absolute;\n  background-image: url(images/sprite_play.png);\n  background-repeat: no-repeat;\n  background-size: 40px 380px;\n  background-position: 8px -250px;\n}\n#player .player-footer .progress {\n  display: flex;\n  align-items: center;\n}\n#player .player-footer .progress-bar {\n  flex: 1;\n  overflow: hidden;\n  background-color: rgba(255, 255, 255, 0.2);\n}\n#player .player-footer .progress-bar .progress-bar-progress {\n  width: 100%;\n  height: 2px;\n  transform: translateX(-100%);\n  background: #31c27c;\n}\n#player .player-footer .progress-time {\n  top: 0;\n  z-index: 1;\n  width: 55px;\n  font-size: 12px;\n  color: #808080;\n  line-height: 40px;\n  text-align: center;\n  letter-spacing: 1px;\n}\n#player .player-footer .actions {\n  height: 65px;\n  margin-top: 10px;\n}\n#player .player-footer .btn-download {\n  position: relative;\n  display: block;\n  height: 45px;\n  line-height: 45px;\n  margin: 0 50px;\n  padding: 0 55px;\n  overflow: hidden;\n  white-space: nowrap;\n  font-size: 20px;\n  color: #fff;\n  border-radius: 999px;\n  background-color: #31c27c;\n  text-align: center;\n  background-image: url(images/sprite_play.png);\n  background-repeat: no-repeat;\n  background-size: 43px 380px;\n  background-position: 6px -321px;\n}\nbody {\n  background: #f4f4f4;\n  font-family: FZLTXIHJW--GB1-0, \"hiragino sans gb\", \"Helvetica Neue\", Helvetica, STHeiTi, Arial;\n}\n.wraper-Head {\n  position: fixed;\n  width: 100%;\n  z-index: 2;\n}\n* {\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map