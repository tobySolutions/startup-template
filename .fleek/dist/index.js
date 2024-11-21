var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a3, b2) => (typeof require !== "undefined" ? require : a3)[b2]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb2, mod) => function __require2() {
  return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .svelte-kit/output/server/chunks/index.js
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function fail(status, data) {
  return new ActionFailure(status, data);
}
var BROWSER, DEV, HttpError, Redirect, SvelteKitError, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    BROWSER = false;
    DEV = false;
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body2) {
        this.status = status;
        if (typeof body2 === "string") {
          this.body = { message: body2 };
        } else if (body2) {
          this.body = body2;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location2) {
        this.status = status;
        this.location = location2;
      }
    };
    SvelteKitError = class extends Error {
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/lifecycle.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a3, b2) {
  return a3 != a3 ? b2 == b2 : a3 !== b2 || a3 && typeof a3 === "object" || typeof a3 === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_2) => value = _2)();
  return value;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
  return rest;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function set_current_component(component8) {
  current_component = component8;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component8 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component8.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component8, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function hasContext(key2) {
  return get_current_component().$$.context.has(key2);
}
var current_component;
var init_lifecycle = __esm({
  ".svelte-kit/output/server/chunks/lifecycle.js"() {
  }
});

// .svelte-kit/output/server/chunks/ssr.js
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name2) => {
    if (invalid_attribute_name_character.test(name2)) return;
    const value = attributes[name2];
    if (value === true) str += " " + name2;
    else if (boolean_attributes.has(name2.toLowerCase())) {
      if (value) str += " " + name2;
    } else if (value != null) {
      str += ` ${name2}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name2 = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name2) continue;
    style_object[name2] = value;
  }
  for (const name2 in style_directive) {
    const value = style_directive[name2];
    if (value) {
      style_object[name2] = value;
    } else {
      delete style_object[name2];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i2 = pattern2.lastIndex - 1;
    const ch = str[i2];
    escaped2 += str.substring(last, i2) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i2 + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component8, name2) {
  if (!component8 || !component8.$$render) {
    if (name2 === "svelte:component") name2 += " this={...}";
    throw new Error(
      `<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`
    );
  }
  return component8;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean) return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2] != null && style_object[key2] !== "").map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
var _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    init_lifecycle();
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate2(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate2;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    const char = str[i2];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i2) + replacement;
      last_pos = i2 + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
      Object.prototype
    ).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom2 = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom2.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i2) => {
            keys.push(`[${i2}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names2 = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a3, b2) => b2[1] - a3[1]).forEach((entry, i2) => {
    names2.set(entry[0], get_name(i2));
  });
  function stringify2(thing) {
    if (names2.has(thing)) {
      return names2.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom2.has(thing)) {
      return custom2.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v2, i2) => i2 in thing ? stringify2(v2) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names2.size) {
    const params = [];
    const statements = [];
    const values = [];
    names2.forEach((name2, thing) => {
      params.push(name2);
      if (custom2.has(thing)) {
        values.push(
          /** @type {string} */
          custom2.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v2, i2) => {
            statements.push(`${name2}[${i2}]=${stringify2(v2)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name2}.${Array.from(thing).map((v2) => `add(${stringify2(v2)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name2}.${Array.from(thing).map(([k, v2]) => `set(${stringify2(k)}, ${stringify2(v2)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name2}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name2 = "";
  do {
    name2 = chars[num % chars.length] + name2;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? `${name2}0` : name2;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number") return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index8, standalone = false) {
    if (index8 === UNDEFINED) return void 0;
    if (index8 === NAN) return NaN;
    if (index8 === POSITIVE_INFINITY) return Infinity;
    if (index8 === NEGATIVE_INFINITY) return -Infinity;
    if (index8 === NEGATIVE_ZERO) return -0;
    if (standalone) throw new Error(`Invalid input`);
    if (index8 in hydrated) return hydrated[index8];
    const value = values[index8];
    if (!value || typeof value !== "object") {
      hydrated[index8] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers?.[type];
        if (reviver) {
          return hydrated[index8] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index8] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index8] = set;
            for (let i2 = 1; i2 < value.length; i2 += 1) {
              set.add(hydrate(value[i2]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index8] = map;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              map.set(hydrate(value[i2]), hydrate(value[i2 + 1]));
            }
            break;
          case "RegExp":
            hydrated[index8] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index8] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index8] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index8] = obj;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              obj[value[i2]] = hydrate(value[i2 + 1]);
            }
            break;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array2 = new Array(value.length);
        hydrated[index8] = array2;
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          const n = value[i2];
          if (n === HOLE) continue;
          array2[i2] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index8] = object;
      for (const key2 in value) {
        const n = value[key2];
        object[key2] = hydrate(n);
      }
    }
    return hydrated[index8];
  }
  return hydrate(0);
}
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_constants();
  }
});

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom2 = [];
  for (const key2 in reducers) {
    custom2.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing)) return indexes.get(thing);
    if (thing === void 0) return UNDEFINED;
    if (Number.isNaN(thing)) return NAN;
    if (thing === Infinity) return POSITIVE_INFINITY;
    if (thing === -Infinity) return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;
    const index9 = p2++;
    indexes.set(thing, index9);
    for (const { key: key2, fn } of custom2) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index9] = `["${key2}",${flatten(value2)}]`;
        return index9;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i2 = 0; i2 < thing.length; i2 += 1) {
            if (i2 > 0) str += ",";
            if (i2 in thing) {
              keys.push(`[${i2}]`);
              str += flatten(thing[i2]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started) str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index9] = str;
    return index9;
  }
  const index8 = flatten(value);
  if (index8 < 0) return `${index8}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing instanceof String) return stringify_string(thing.toString());
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto2 = fn.length < 2;
  return readable(initial_value, (set, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync2 = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update2);
      if (auto2) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i2) => subscribe(
        store,
        (value) => {
          values[i2] = value;
          pending &= ~(1 << i2);
          if (started) {
            sync2();
          }
        },
        () => {
          pending |= 1 << i2;
        }
      )
    );
    started = true;
    sync2();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function readonly(store) {
  return {
    subscribe: store.subscribe.bind(store)
  };
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_lifecycle();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse4;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse4(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index8 = 0;
      while (index8 < str.length) {
        var eqIdx = str.indexOf("=", index8);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index8);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index8 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index8, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index8 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name2, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name2)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name2 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name2 = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name: name2,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name2 = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name2 = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name: name2, value };
    }
    function parse4(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse4;
    module.exports.parse = parse4;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = document.createElement("style");
  const css2 = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
  style.appendChild(css2);
  const disable = () => document.head.appendChild(style);
  const enable = () => document.head.removeChild(style);
  if (typeof window.getComputedStyle !== "undefined") {
    disable();
    action();
    window.getComputedStyle(style).opacity;
    enable();
    return;
  }
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    action();
    window.requestAnimationFrame(enable);
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 120);
  }, 120);
}
function sanitizeClassNames(classNames) {
  return classNames.filter((className) => className.length > 0);
}
function createUserPrefersMode() {
  const defaultValue2 = "system";
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(getModeStorageKey());
  let value = isValidMode(initialValue) ? initialValue : defaultValue2;
  function getModeStorageKey() {
    return get_store_value(modeStorageKey);
  }
  const { subscribe: subscribe2, set: _set } = writable(value, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (e.key !== getModeStorageKey())
        return;
      const newValue = e.newValue;
      if (isValidMode(newValue)) {
        _set(value = newValue);
      } else {
        _set(value = defaultValue2);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v2) {
    _set(value = v2);
    storage.setItem(getModeStorageKey(), value);
  }
  return {
    subscribe: subscribe2,
    set
  };
}
function createCustomTheme() {
  const storage = isBrowser ? localStorage : noopStorage;
  const initialValue = storage.getItem(getThemeStorageKey());
  let value = initialValue === null || initialValue === void 0 ? "" : initialValue;
  function getThemeStorageKey() {
    return get_store_value(themeStorageKey);
  }
  const { subscribe: subscribe2, set: _set } = writable(value, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (e.key !== getThemeStorageKey())
        return;
      const newValue = e.newValue;
      if (newValue === null) {
        _set(value = "");
      } else {
        _set(value = newValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v2) {
    _set(value = v2);
    storage.setItem(getThemeStorageKey(), value);
  }
  return {
    subscribe: subscribe2,
    set
  };
}
function createSystemMode() {
  const defaultValue2 = void 0;
  let track = true;
  const { subscribe: subscribe2, set } = writable(defaultValue2, () => {
    if (!isBrowser)
      return;
    const handler = (e) => {
      if (!track)
        return;
      set(e.matches ? "light" : "dark");
    };
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    mediaQueryState.addEventListener("change", handler);
    return () => mediaQueryState.removeEventListener("change", handler);
  });
  function query() {
    if (!isBrowser)
      return;
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    set(mediaQueryState.matches ? "light" : "dark");
  }
  function tracking(active) {
    track = active;
  }
  return {
    subscribe: subscribe2,
    query,
    tracking
  };
}
function createDerivedMode() {
  const { subscribe: subscribe2 } = derived([
    userPrefersMode,
    systemPrefersMode,
    themeColors,
    disableTransitions,
    darkClassNames,
    lightClassNames
  ], ([$userPrefersMode, $systemPrefersMode, $themeColors, $disableTransitions, $darkClassNames, $lightClassNames]) => {
    if (!isBrowser)
      return void 0;
    const derivedMode = $userPrefersMode === "system" ? $systemPrefersMode : $userPrefersMode;
    const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
    const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);
    function update2() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode === "light") {
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.remove(...sanitizedDarkClassNames);
        if (sanitizedLightClassNames.length)
          htmlEl.classList.add(...sanitizedLightClassNames);
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.light);
        }
      } else {
        if (sanitizedLightClassNames.length)
          htmlEl.classList.remove(...sanitizedLightClassNames);
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.add(...sanitizedDarkClassNames);
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.dark);
        }
      }
    }
    if ($disableTransitions) {
      withoutTransition(update2);
    } else {
      update2();
    }
    return derivedMode;
  });
  return {
    subscribe: subscribe2
  };
}
function createDerivedTheme() {
  const { subscribe: subscribe2 } = derived([theme, disableTransitions], ([$theme, $disableTransitions]) => {
    if (!isBrowser)
      return void 0;
    function update2() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", $theme);
    }
    if ($disableTransitions) {
      withoutTransition(update2);
    } else {
      update2();
    }
    return $theme;
  });
  return {
    subscribe: subscribe2
  };
}
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
function defineConfig(config) {
  return config;
}
function setInitialMode({ defaultMode, themeColors: themeColors2, darkClassNames: darkClassNames2 = ["dark"], lightClassNames: lightClassNames2 = [], defaultTheme = "" }) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem("mode-watcher-mode") || defaultMode;
  const theme2 = localStorage.getItem("mode-watcher-theme") || defaultTheme;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (light) {
    if (darkClassNames2.length)
      rootEl.classList.remove(...darkClassNames2);
    if (lightClassNames2.length)
      rootEl.classList.add(...lightClassNames2);
  } else {
    if (lightClassNames2.length)
      rootEl.classList.remove(...lightClassNames2);
    if (darkClassNames2.length)
      rootEl.classList.add(...darkClassNames2);
  }
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  if (theme2) {
    rootEl.setAttribute("data-theme", theme2);
    localStorage.setItem("mode-watcher-theme", theme2);
  }
  localStorage.setItem("mode-watcher-mode", mode);
}
var timeoutAction, timeoutEnable, noopStorage, isBrowser, modes, modeStorageKey, themeStorageKey, userPrefersMode, systemPrefersMode, themeColors, theme, disableTransitions, darkClassNames, lightClassNames, Mode_watcher, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_index2();
    init_lifecycle();
    noopStorage = {
      getItem: (_key) => null,
      setItem: (_key, _value) => {
      }
    };
    isBrowser = typeof document !== "undefined";
    modes = ["dark", "light", "system"];
    modeStorageKey = writable("mode-watcher-mode");
    themeStorageKey = writable("mode-watcher-theme");
    userPrefersMode = createUserPrefersMode();
    systemPrefersMode = createSystemMode();
    themeColors = writable(void 0);
    theme = createCustomTheme();
    disableTransitions = writable(true);
    darkClassNames = writable([]);
    lightClassNames = writable([]);
    createDerivedMode();
    createDerivedTheme();
    Mode_watcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let trueNonce;
      let $$unsubscribe_themeStorageKeyStore;
      let $$unsubscribe_modeStorageKeyStore;
      $$unsubscribe_themeStorageKeyStore = subscribe(themeStorageKey, (value) => value);
      $$unsubscribe_modeStorageKeyStore = subscribe(modeStorageKey, (value) => value);
      let { track = true } = $$props;
      let { defaultMode = "system" } = $$props;
      let { themeColors: themeColors$1 = void 0 } = $$props;
      let { disableTransitions: disableTransitions$1 = true } = $$props;
      let { darkClassNames: darkClassNames$1 = ["dark"] } = $$props;
      let { lightClassNames: lightClassNames$1 = [] } = $$props;
      let { defaultTheme = "" } = $$props;
      let { nonce = "" } = $$props;
      let { themeStorageKey: themeStorageKey$1 = "mode-watcher-theme" } = $$props;
      let { modeStorageKey: modeStorageKey$1 = "mode-watcher-mode" } = $$props;
      const initConfig = defineConfig({
        defaultMode,
        themeColors: themeColors$1,
        darkClassNames: darkClassNames$1,
        lightClassNames: lightClassNames$1,
        defaultTheme,
        modeStorageKey: modeStorageKey$1,
        themeStorageKey: themeStorageKey$1
      });
      if ($$props.track === void 0 && $$bindings.track && track !== void 0) $$bindings.track(track);
      if ($$props.defaultMode === void 0 && $$bindings.defaultMode && defaultMode !== void 0) $$bindings.defaultMode(defaultMode);
      if ($$props.themeColors === void 0 && $$bindings.themeColors && themeColors$1 !== void 0) $$bindings.themeColors(themeColors$1);
      if ($$props.disableTransitions === void 0 && $$bindings.disableTransitions && disableTransitions$1 !== void 0) $$bindings.disableTransitions(disableTransitions$1);
      if ($$props.darkClassNames === void 0 && $$bindings.darkClassNames && darkClassNames$1 !== void 0) $$bindings.darkClassNames(darkClassNames$1);
      if ($$props.lightClassNames === void 0 && $$bindings.lightClassNames && lightClassNames$1 !== void 0) $$bindings.lightClassNames(lightClassNames$1);
      if ($$props.defaultTheme === void 0 && $$bindings.defaultTheme && defaultTheme !== void 0) $$bindings.defaultTheme(defaultTheme);
      if ($$props.nonce === void 0 && $$bindings.nonce && nonce !== void 0) $$bindings.nonce(nonce);
      if ($$props.themeStorageKey === void 0 && $$bindings.themeStorageKey && themeStorageKey$1 !== void 0) $$bindings.themeStorageKey(themeStorageKey$1);
      if ($$props.modeStorageKey === void 0 && $$bindings.modeStorageKey && modeStorageKey$1 !== void 0) $$bindings.modeStorageKey(modeStorageKey$1);
      {
        disableTransitions.set(disableTransitions$1);
      }
      {
        themeColors.set(themeColors$1);
      }
      {
        darkClassNames.set(darkClassNames$1);
      }
      {
        lightClassNames.set(lightClassNames$1);
      }
      {
        modeStorageKey.set(modeStorageKey$1);
      }
      {
        themeStorageKey.set(themeStorageKey$1);
      }
      trueNonce = typeof window === "undefined" ? nonce : "";
      $$unsubscribe_themeStorageKeyStore();
      $$unsubscribe_modeStorageKeyStore();
      return `${$$result.head += `<!-- HEAD_svelte-1nen96w_START -->${themeColors$1 ? `   <meta name="theme-color"${add_attribute("content", themeColors$1.dark, 0)}>` : ``}${trueNonce ? ` <!-- HTML_TAG_START -->${`<script nonce=${trueNonce}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`}<!-- HTML_TAG_END -->` : ` <!-- HTML_TAG_START -->${`<script>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`}<!-- HTML_TAG_END -->`}<!-- HEAD_svelte-1nen96w_END -->`, ""}`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Mode_watcher, "ModeWatcher").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    imports = ["_app/immutable/nodes/0.DwYm4Foh.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/index.7X9LQzY4.js"];
    stylesheets = ["_app/immutable/assets/0.C2Ok8FAL.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/stores.js
function get(key2, parse4 = JSON.parse) {
  try {
    return parse4(sessionStorage[key2]);
  } catch {
  }
}
function invalidateAll() {
  {
    throw new Error("Cannot call invalidateAll() on the server");
  }
}
async function applyAction(result) {
  {
    throw new Error("Cannot call applyAction(...) on the server");
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, getStores, page, navigating;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_lifecycle();
    init_exports();
    init_devalue();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    navigating = {
      subscribe(fn) {
        const store = getStores().navigating;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_lifecycle();
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.CUUY-qkV.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/stores.DrTtW2Km.js", "_app/immutable/chunks/entry.az7H4NcX.js", "_app/immutable/chunks/index.7X9LQzY4.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/dequal/dist/index.mjs
var init_dist = __esm({
  "node_modules/dequal/dist/index.mjs"() {
  }
});

// node_modules/tailwind-variants/dist/chunk-JXBJZR5A.js
function i(e, o) {
  e.forEach(function(r2) {
    Array.isArray(r2) ? i(r2, o) : o.push(r2);
  });
}
function y(e) {
  let o = [];
  return i(e, o), o;
}
var l, u, x, a, p, g;
var init_chunk_JXBJZR5A = __esm({
  "node_modules/tailwind-variants/dist/chunk-JXBJZR5A.js"() {
    l = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e;
    u = (e) => !e || typeof e != "object" || Object.keys(e).length === 0;
    x = (e, o) => JSON.stringify(e) === JSON.stringify(o);
    a = (...e) => y(e).filter(Boolean);
    p = (e, o) => {
      let r2 = {}, c2 = Object.keys(e), f = Object.keys(o);
      for (let t of c2) if (f.includes(t)) {
        let s2 = e[t], n = o[t];
        typeof s2 == "object" && typeof n == "object" ? r2[t] = p(s2, n) : Array.isArray(s2) || Array.isArray(n) ? r2[t] = a(n, s2) : r2[t] = n + " " + s2;
      } else r2[t] = e[t];
      for (let t of f) c2.includes(t) || (r2[t] = o[t]);
      return r2;
    };
    g = (e) => !e || typeof e != "string" ? e : e.replace(/\s+/g, " ").trim();
  }
});

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
function createClassGroupUtils(config) {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator: validator2
  }) => validator2(classRest))?.classGroupId;
}
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  const {
    theme: theme2,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme2);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme2) {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme2), classPartObject, classGroupId, theme2);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key2, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key2), classGroupId, theme2);
    });
  });
}
function getPart(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key2, value]) => [prefix + key2, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  function update2(key2, value) {
    cache.set(key2, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get(key2) {
      let value = cache.get(key2);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key2)) !== void 0) {
        update2(key2, value);
        return value;
      }
    },
    set(key2, value) {
      if (cache.has(key2)) {
        cache.set(key2, value);
      } else {
        update2(key2, value);
      }
    }
  };
}
function createParseClassName(config) {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  function parseClassName(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index8 = 0; index8 < className.length; index8++) {
      let currentCharacter = className[index8];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index8, index8 + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index8));
          modifierStart = index8 + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index8;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  }
  if (experimentalParseClassName) {
    return function parseClassNameExperimental(className) {
      return experimentalParseClassName({
        className,
        parseClassName
      });
    };
  }
  return parseClassName;
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    parseClassName: createParseClassName(config),
    ...createClassGroupUtils(config)
  };
}
function mergeClassList(classList, configUtils) {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter((parsed) => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map((parsed) => parsed.originalClassName).join(" ");
}
function twJoin() {
  let index8 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index8 < arguments.length) {
    if (argument = arguments[index8++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix2) {
  if (typeof mix2 === "string") {
    return mix2;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix2.length; k++) {
    if (mix2[k]) {
      if (resolvedValue = toValue(mix2[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key2) {
  const themeGetter = (theme2) => theme2[key2] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isNumber(value) {
  return Boolean(value) && !Number.isNaN(Number(value));
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isInteger(value) {
  return Boolean(value) && Number.isInteger(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, sizeLabels, isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryImage(value) {
  return getIsArbitraryValue(value, imageLabels, isImage);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function isAny() {
  return true;
}
function getIsArbitraryValue(value, label, testValue) {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
}
function isNever() {
  return false;
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function isImage(value) {
  return imageRegex.test(value);
}
function getDefaultConfig() {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale2 = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumber = () => [isNumber, isArbitraryNumber];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale2]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale2]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale2]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
function mergeConfigs(baseConfig, {
  cacheSize,
  prefix,
  separator,
  experimentalParseClassName,
  extend = {},
  override: override2 = {}
}) {
  overrideProperty(baseConfig, "cacheSize", cacheSize);
  overrideProperty(baseConfig, "prefix", prefix);
  overrideProperty(baseConfig, "separator", separator);
  overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName);
  for (const configKey in override2) {
    overrideConfigProperties(baseConfig[configKey], override2[configKey]);
  }
  for (const key2 in extend) {
    mergeConfigProperties(baseConfig[key2], extend[key2]);
  }
  return baseConfig;
}
function overrideProperty(baseObject, overrideKey, overrideValue) {
  if (overrideValue !== void 0) {
    baseObject[overrideKey] = overrideValue;
  }
}
function overrideConfigProperties(baseObject, overrideObject) {
  if (overrideObject) {
    for (const key2 in overrideObject) {
      overrideProperty(baseObject, key2, overrideObject[key2]);
    }
  }
}
function mergeConfigProperties(baseObject, mergeObject) {
  if (mergeObject) {
    for (const key2 in mergeObject) {
      const mergeValue = mergeObject[key2];
      if (mergeValue !== void 0) {
        baseObject[key2] = (baseObject[key2] || []).concat(mergeValue);
      }
    }
  }
}
function extendTailwindMerge(configExtension, ...createConfig) {
  return typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
}
var CLASS_PART_SEPARATOR, arbitraryPropertyRegex, IMPORTANT_MODIFIER, SPLIT_CLASSES_REGEX, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, sizeLabels, imageLabels, twMerge;
var init_bundle_mjs = __esm({
  "node_modules/tailwind-merge/dist/bundle-mjs.mjs"() {
    CLASS_PART_SEPARATOR = "-";
    arbitraryPropertyRegex = /^\[(.+)\]$/;
    IMPORTANT_MODIFIER = "!";
    SPLIT_CLASSES_REGEX = /\s+/;
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// node_modules/tailwind-variants/dist/index.js
var ie, _, M, R, v, q, j, Z, ce;
var init_dist2 = __esm({
  "node_modules/tailwind-variants/dist/index.js"() {
    init_chunk_JXBJZR5A();
    init_bundle_mjs();
    ie = { twMerge: true, twMergeConfig: {}, responsiveVariants: false };
    _ = (s2) => s2 || void 0;
    M = (...s2) => _(y(s2).filter(Boolean).join(" "));
    R = null;
    v = {};
    q = false;
    j = (...s2) => (b$1) => b$1.twMerge ? ((!R || q) && (q = false, R = u(v) ? twMerge : extendTailwindMerge({ ...v, extend: { theme: v.theme, classGroups: v.classGroups, conflictingClassGroupModifiers: v.conflictingClassGroupModifiers, conflictingClassGroups: v.conflictingClassGroups, ...v.extend } })), _(R(M(s2)))) : M(s2);
    Z = (s2, b2) => {
      for (let e in b2) s2.hasOwnProperty(e) ? s2[e] = M(s2[e], b2[e]) : s2[e] = b2[e];
      return s2;
    };
    ce = (s2, b$1) => {
      let { extend: e = null, slots: N = {}, variants: F = {}, compoundVariants: U = [], compoundSlots: C = [], defaultVariants: W = {} } = s2, m = { ...ie, ...b$1 }, S = e != null && e.base ? M(e.base, s2 == null ? void 0 : s2.base) : s2 == null ? void 0 : s2.base, g$1 = e != null && e.variants && !u(e.variants) ? p(F, e.variants) : F, A = e != null && e.defaultVariants && !u(e.defaultVariants) ? { ...e.defaultVariants, ...W } : W;
      !u(m.twMergeConfig) && !x(m.twMergeConfig, v) && (q = true, v = m.twMergeConfig);
      let O = u(e == null ? void 0 : e.slots), $ = u(N) ? {} : { base: M(s2 == null ? void 0 : s2.base, O && (e == null ? void 0 : e.base)), ...N }, w = O ? $ : Z({ ...e == null ? void 0 : e.slots }, u($) ? { base: s2 == null ? void 0 : s2.base } : $), h$1 = u(e == null ? void 0 : e.compoundVariants) ? U : a(e == null ? void 0 : e.compoundVariants, U), V = (f) => {
        if (u(g$1) && u(N) && O) return j(S, f == null ? void 0 : f.class, f == null ? void 0 : f.className)(m);
        if (h$1 && !Array.isArray(h$1)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof h$1}`);
        if (C && !Array.isArray(C)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof C}`);
        let K = (t, n, a3 = [], i2) => {
          let r2 = a3;
          if (typeof n == "string") r2 = r2.concat(g(n).split(" ").map((o) => `${t}:${o}`));
          else if (Array.isArray(n)) r2 = r2.concat(n.reduce((o, c2) => o.concat(`${t}:${c2}`), []));
          else if (typeof n == "object" && typeof i2 == "string") {
            for (let o in n) if (n.hasOwnProperty(o) && o === i2) {
              let c2 = n[o];
              if (c2 && typeof c2 == "string") {
                let l2 = g(c2);
                r2[i2] ? r2[i2] = r2[i2].concat(l2.split(" ").map((u2) => `${t}:${u2}`)) : r2[i2] = l2.split(" ").map((u2) => `${t}:${u2}`);
              } else Array.isArray(c2) && c2.length > 0 && (r2[i2] = c2.reduce((l2, u2) => l2.concat(`${t}:${u2}`), []));
            }
          }
          return r2;
        }, z2 = (t, n = g$1, a$1 = null, i2 = null) => {
          var J;
          let r2 = n[t];
          if (!r2 || u(r2)) return null;
          let o = (J = i2 == null ? void 0 : i2[t]) != null ? J : f == null ? void 0 : f[t];
          if (o === null) return null;
          let c2 = l(o), l2 = Array.isArray(m.responsiveVariants) && m.responsiveVariants.length > 0 || m.responsiveVariants === true, u2 = A == null ? void 0 : A[t], d = [];
          if (typeof c2 == "object" && l2) for (let [T, L] of Object.entries(c2)) {
            let ne = r2[L];
            if (T === "initial") {
              u2 = L;
              continue;
            }
            Array.isArray(m.responsiveVariants) && !m.responsiveVariants.includes(T) || (d = K(T, ne, d, a$1));
          }
          let ae = c2 != null && typeof c2 != "object" ? c2 : l(u2), k = r2[ae || "false"];
          return typeof d == "object" && typeof a$1 == "string" && d[a$1] ? Z(d, k) : d.length > 0 ? (d.push(k), d) : k;
        }, P = () => g$1 ? Object.keys(g$1).map((t) => z2(t, g$1)) : null, p2 = (t, n) => {
          if (!g$1 || typeof g$1 != "object") return null;
          let a3 = new Array();
          for (let i2 in g$1) {
            let r2 = z2(i2, g$1, t, n), o = t === "base" && typeof r2 == "string" ? r2 : r2 && r2[t];
            o && (a3[a3.length] = o);
          }
          return a3;
        }, D = {};
        for (let t in f) f[t] !== void 0 && (D[t] = f[t]);
        let H = (t, n) => {
          var i2;
          let a3 = typeof (f == null ? void 0 : f[t]) == "object" ? { [t]: (i2 = f[t]) == null ? void 0 : i2.initial } : {};
          return { ...A, ...D, ...a3, ...n };
        }, I = (t = [], n) => {
          let a3 = [];
          for (let { class: i2, className: r2, ...o } of t) {
            let c2 = true;
            for (let [l2, u2] of Object.entries(o)) {
              let d = H(l2, n);
              if (Array.isArray(u2)) {
                if (!u2.includes(d[l2])) {
                  c2 = false;
                  break;
                }
              } else if (d[l2] !== u2) {
                c2 = false;
                break;
              }
            }
            c2 && (i2 && a3.push(i2), r2 && a3.push(r2));
          }
          return a3;
        }, ee = (t) => {
          let n = I(h$1, t);
          if (!Array.isArray(n)) return n;
          let a3 = {};
          for (let i2 of n) if (typeof i2 == "string" && (a3.base = j(a3.base, i2)(m)), typeof i2 == "object") for (let [r2, o] of Object.entries(i2)) a3[r2] = j(a3[r2], o)(m);
          return a3;
        }, te = (t) => {
          if (C.length < 1) return null;
          let n = {};
          for (let { slots: a3 = [], class: i2, className: r2, ...o } of C) {
            if (!u(o)) {
              let c2 = true;
              for (let l2 of Object.keys(o)) {
                let u2 = H(l2, t)[l2];
                if (u2 === void 0 || (Array.isArray(o[l2]) ? !o[l2].includes(u2) : o[l2] !== u2)) {
                  c2 = false;
                  break;
                }
              }
              if (!c2) continue;
            }
            for (let c2 of a3) n[c2] = n[c2] || [], n[c2].push([i2, r2]);
          }
          return n;
        };
        if (!u(N) || !O) {
          let t = {};
          if (typeof w == "object" && !u(w)) for (let n of Object.keys(w)) t[n] = (a3) => {
            var i2, r2;
            return j(w[n], p2(n, a3), ((i2 = ee(a3)) != null ? i2 : [])[n], ((r2 = te(a3)) != null ? r2 : [])[n], a3 == null ? void 0 : a3.class, a3 == null ? void 0 : a3.className)(m);
          };
          return t;
        }
        return j(S, P(), I(h$1), f == null ? void 0 : f.class, f == null ? void 0 : f.className)(m);
      }, x2 = () => {
        if (!(!g$1 || typeof g$1 != "object")) return Object.keys(g$1);
      };
      return V.variantKeys = x2(), V.extend = e, V.base = S, V.slots = w, V.variants = g$1, V.defaultVariants = A, V.compoundSlots = C, V.compoundVariants = h$1, V;
    };
  }
});

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var init_clsx = __esm({
  "node_modules/clsx/dist/clsx.mjs"() {
  }
});

// .svelte-kit/output/server/chunks/Icon.js
function is_void(name2) {
  return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key2) => {
    if (style[key2] === void 0)
      return str;
    return str + `${key2}:${style[key2]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
function lightable(value) {
  function subscribe2(run2) {
    run2(value);
    return () => {
    };
  }
  return { subscribe: subscribe2 };
}
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop2
            });
          };
          fn.action = action ?? noop2;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop2
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop2
          });
        };
        resultFn.action = action ?? noop2;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop2
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop2() {
}
function addEventListener2(target, event, handler, options2) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options2));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options2));
  };
}
function addMeltEventListener(target, event, handler, options2) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options2));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options2));
    };
  }
  return () => noop2();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
function omit(obj, ...keys) {
  const result = {};
  for (const key2 of Object.keys(obj)) {
    if (!keys.includes(key2)) {
      result[key2] = obj[key2];
    }
  }
  return result;
}
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key2) => {
      if (key2 !== "action") {
        attrs[key2] = builder[key2];
      }
    });
  });
  return attrs;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var void_element_names, hiddenAction, isFunctionWithParams, kbd, defaults, Button$1, buttonVariants, Button, defaultAttributes, Icon;
var init_Icon = __esm({
  ".svelte-kit/output/server/chunks/Icon.js"() {
    init_lifecycle();
    init_ssr();
    init_dist();
    init_index2();
    init_dist2();
    init_clsx();
    init_bundle_mjs();
    void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    ({
      type: "hidden",
      "aria-hidden": true,
      hidden: true,
      tabIndex: -1,
      style: styleToString({
        position: "absolute",
        opacity: 0,
        "pointer-events": "none",
        margin: 0,
        transform: "translateX(-100%)"
      })
    });
    hiddenAction = (obj) => {
      return new Proxy(obj, {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        },
        ownKeys(target) {
          return Reflect.ownKeys(target).filter((key2) => key2 !== "action");
        }
      });
    };
    isFunctionWithParams = (fn) => {
      return typeof fn === "function";
    };
    makeElement("empty");
    withGet.writable = function(initial2) {
      const internal2 = writable(initial2);
      let value = initial2;
      return {
        subscribe: internal2.subscribe,
        set(newValue) {
          internal2.set(newValue);
          value = newValue;
        },
        update(updater) {
          const newValue = updater(value);
          internal2.set(newValue);
          value = newValue;
        },
        get() {
          return value;
        }
      };
    };
    withGet.derived = function(stores, fn) {
      const subscribers = /* @__PURE__ */ new Map();
      const get2 = () => {
        const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
        return fn(values);
      };
      const subscribe2 = (subscriber) => {
        const unsubscribers = [];
        const storesArr = Array.isArray(stores) ? stores : [stores];
        storesArr.forEach((store) => {
          unsubscribers.push(store.subscribe(() => {
            subscriber(get2());
          }));
        });
        subscriber(get2());
        subscribers.set(subscriber, unsubscribers);
        return () => {
          const unsubscribers2 = subscribers.get(subscriber);
          if (unsubscribers2) {
            for (const unsubscribe of unsubscribers2) {
              unsubscribe();
            }
          }
          subscribers.delete(subscriber);
        };
      };
      return {
        get: get2,
        subscribe: subscribe2
      };
    };
    kbd = {
      ALT: "Alt",
      ARROW_DOWN: "ArrowDown",
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight",
      ARROW_UP: "ArrowUp",
      BACKSPACE: "Backspace",
      CAPS_LOCK: "CapsLock",
      CONTROL: "Control",
      DELETE: "Delete",
      END: "End",
      ENTER: "Enter",
      ESCAPE: "Escape",
      F1: "F1",
      F10: "F10",
      F11: "F11",
      F12: "F12",
      F2: "F2",
      F3: "F3",
      F4: "F4",
      F5: "F5",
      F6: "F6",
      F7: "F7",
      F8: "F8",
      F9: "F9",
      HOME: "Home",
      META: "Meta",
      PAGE_DOWN: "PageDown",
      PAGE_UP: "PageUp",
      SHIFT: "Shift",
      SPACE: " ",
      TAB: "Tab",
      CTRL: "Control",
      ASTERISK: "*",
      A: "a",
      P: "p"
    };
    readable(void 0, (set) => {
      function clicked(event) {
        set(event);
        set(void 0);
      }
      const unsubscribe = addEventListener2(document, "pointerup", clicked, {
        passive: false,
        capture: true
      });
      return unsubscribe;
    });
    readable(void 0, (set) => {
      function keydown(event) {
        if (event && event.key === kbd.ESCAPE) {
          set(event);
        }
        set(void 0);
      }
      const unsubscribe = addEventListener2(document, "keydown", keydown, {
        passive: false
      });
      return unsubscribe;
    });
    ({
      prefix: "",
      disabled: readable(false),
      required: readable(false),
      name: readable(void 0)
    });
    defaults = {
      isDateDisabled: void 0,
      isDateUnavailable: void 0,
      value: void 0,
      preventDeselect: false,
      numberOfMonths: 1,
      pagedNavigation: false,
      weekStartsOn: 0,
      fixedWeeks: false,
      calendarLabel: "Event Date",
      locale: "en",
      minValue: void 0,
      maxValue: void 0,
      disabled: false,
      readonly: false,
      weekdayFormat: "narrow"
    };
    ({
      isDateDisabled: void 0,
      isDateUnavailable: void 0,
      value: void 0,
      positioning: {
        placement: "bottom"
      },
      closeOnEscape: true,
      closeOnOutsideClick: true,
      onOutsideClick: void 0,
      preventScroll: false,
      forceVisible: false,
      locale: "en",
      granularity: void 0,
      disabled: false,
      readonly: false,
      minValue: void 0,
      maxValue: void 0,
      weekdayFormat: "narrow",
      ...omit(defaults, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
    });
    Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
      let { href = void 0 } = $$props;
      let { type = void 0 } = $$props;
      let { builders = [] } = $$props;
      let { el = void 0 } = $$props;
      const attrs = { "data-button-root": "" };
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
      if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
      if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
      return `${builders && builders.length ? ` ${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            {
              type: escape_attribute_value(href ? void 0 : type)
            },
            { href: escape_attribute_value(href) },
            { tabindex: "0" },
            escape_object(getAttrs(builders)),
            escape_object($$restProps),
            escape_object(attrs)
          ],
          {}
        )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")}` : ` ${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            {
              type: escape_attribute_value(href ? void 0 : type)
            },
            { href: escape_attribute_value(href) },
            { tabindex: "0" },
            escape_object($$restProps),
            escape_object(attrs)
          ],
          {}
        )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")}`}`;
    });
    buttonVariants = ce({
      base: "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10"
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default"
      }
    });
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
      let { class: className = void 0 } = $$props;
      let { variant = "default" } = $$props;
      let { size = "default" } = $$props;
      let { builders = [] } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
      if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
      return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
        $$result,
        Object.assign(
          {},
          { builders },
          {
            class: cn(buttonVariants({ variant, size, className }))
          },
          { type: "button" },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    defaultAttributes = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    };
    Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
      let { name: name2 = void 0 } = $$props;
      let { color: color2 = "currentColor" } = $$props;
      let { size = 24 } = $$props;
      let { strokeWidth = 2 } = $$props;
      let { absoluteStrokeWidth = false } = $$props;
      let { iconNode = [] } = $$props;
      const mergeClasses = (...classes) => classes.filter((className, index8, array2) => {
        return Boolean(className) && array2.indexOf(className) === index8;
      }).join(" ");
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
      if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
      if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
      if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
      return `<svg${spread(
        [
          escape_object(defaultAttributes),
          escape_object($$restProps),
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          { stroke: escape_attribute_value(color2) },
          {
            "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
          },
          {
            class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name2 ? `lucide-${name2}` : "", $$props.class))
          }
        ],
        {}
      )}>${each(iconNode, ([tag, attrs]) => {
        return `${((tag$1) => {
          return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
        })(tag)}`;
      })}${slots.default ? slots.default({}) : ``}</svg>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(app)/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var DiscordSvg, TwitterSvg, Footer, Align_justify, Header, Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/_layout.svelte.js"() {
    init_ssr();
    init_Icon();
    DiscordSvg = "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIGZpbGw9JyNmZmYnIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RGlzY29yZDwvdGl0bGU+PHBhdGggZD0iTTIwLjMxNyA0LjM2OThhMTkuNzkxMyAxOS43OTEzIDAgMDAtNC44ODUxLTEuNTE1Mi4wNzQxLjA3NDEgMCAwMC0uMDc4NS4wMzcxYy0uMjExLjM3NTMtLjQ0NDcuODY0OC0uNjA4MyAxLjI0OTUtMS44NDQ3LS4yNzYyLTMuNjgtLjI3NjItNS40ODY4IDAtLjE2MzYtLjM5MzMtLjQwNTgtLjg3NDItLjYxNzctMS4yNDk1YS4wNzcuMDc3IDAgMDAtLjA3ODUtLjAzNyAxOS43MzYzIDE5LjczNjMgMCAwMC00Ljg4NTIgMS41MTUuMDY5OS4wNjk5IDAgMDAtLjAzMjEuMDI3N0MuNTMzNCA5LjA0NTgtLjMxOSAxMy41Nzk5LjA5OTIgMTguMDU3OGEuMDgyNC4wODI0IDAgMDAuMDMxMi4wNTYxYzIuMDUyOCAxLjUwNzYgNC4wNDEzIDIuNDIyOCA1Ljk5MjkgMy4wMjk0YS4wNzc3LjA3NzcgMCAwMC4wODQyLS4wMjc2Yy40NjE2LS42MzA0Ljg3MzEtMS4yOTUyIDEuMjI2LTEuOTk0MmEuMDc2LjA3NiAwIDAwLS4wNDE2LS4xMDU3Yy0uNjUyOC0uMjQ3Ni0xLjI3NDMtLjU0OTUtMS44NzIyLS44OTIzYS4wNzcuMDc3IDAgMDEtLjAwNzYtLjEyNzdjLjEyNTgtLjA5NDMuMjUxNy0uMTkyMy4zNzE4LS4yOTE0YS4wNzQzLjA3NDMgMCAwMS4wNzc2LS4wMTA1YzMuOTI3OCAxLjc5MzMgOC4xOCAxLjc5MzMgMTIuMDYxNCAwYS4wNzM5LjA3MzkgMCAwMS4wNzg1LjAwOTVjLjEyMDIuMDk5LjI0Ni4xOTgxLjM3MjguMjkyNGEuMDc3LjA3NyAwIDAxLS4wMDY2LjEyNzYgMTIuMjk4NiAxMi4yOTg2IDAgMDEtMS44NzMuODkxNC4wNzY2LjA3NjYgMCAwMC0uMDQwNy4xMDY3Yy4zNjA0LjY5OC43NzE5IDEuMzYyOCAxLjIyNSAxLjk5MzJhLjA3Ni4wNzYgMCAwMC4wODQyLjAyODZjMS45NjEtLjYwNjcgMy45NDk1LTEuNTIxOSA2LjAwMjMtMy4wMjk0YS4wNzcuMDc3IDAgMDAuMDMxMy0uMDU1MmMuNTAwNC01LjE3Ny0uODM4Mi05LjY3MzktMy41NDg1LTEzLjY2MDRhLjA2MS4wNjEgMCAwMC0uMDMxMi0uMDI4NnpNOC4wMiAxNS4zMzEyYy0xLjE4MjUgMC0yLjE1NjktMS4wODU3LTIuMTU2OS0yLjQxOSAwLTEuMzMzMi45NTU1LTIuNDE4OSAyLjE1Ny0yLjQxODkgMS4yMTA4IDAgMi4xNzU3IDEuMDk1MiAyLjE1NjggMi40MTkgMCAxLjMzMzItLjk1NTUgMi40MTg5LTIuMTU2OSAyLjQxODl6bTcuOTc0OCAwYy0xLjE4MjUgMC0yLjE1NjktMS4wODU3LTIuMTU2OS0yLjQxOSAwLTEuMzMzMi45NTU0LTIuNDE4OSAyLjE1NjktMi40MTg5IDEuMjEwOCAwIDIuMTc1NyAxLjA5NTIgMi4xNTY4IDIuNDE5IDAgMS4zMzMyLS45NDYgMi40MTg5LTIuMTU2OCAyLjQxODlaIi8+PC9zdmc+";
    TwitterSvg = "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIGZpbGw9JyNmZmYnIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+WDwvdGl0bGU+PHBhdGggZD0iTTE4LjkwMSAxLjE1M2gzLjY4bC04LjA0IDkuMTlMMjQgMjIuODQ2aC03LjQwNmwtNS44LTcuNTg0LTYuNjM4IDcuNTg0SC40NzRsOC42LTkuODNMMCAxLjE1NGg3LjU5NGw1LjI0MyA2LjkzMlpNMTcuNjEgMjAuNjQ0aDIuMDM5TDYuNDg2IDMuMjRINC4yOThaIi8+PC9zdmc+";
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const footerNavs = [
        {
          label: "Product",
          items: [
            { href: "/", name: "Email Collection" },
            { href: "/pricing", name: "Pricing" },
            { href: "/faq", name: "FAQ" }
          ]
        },
        {
          label: "Community",
          items: [
            { href: "/", name: "Discord" },
            { href: "/", name: "Twitter" },
            {
              href: "mailto:hello@chatcollect.com",
              name: "Email"
            }
          ]
        },
        {
          label: "Legal",
          items: [{ href: "/terms", name: "Terms" }, { href: "/privacy", name: "Privacy" }]
        }
      ];
      const footerSocials = [
        {
          href: "",
          name: "Discord",
          icon: DiscordSvg
        },
        {
          href: "",
          name: "Twitter",
          icon: TwitterSvg
        }
      ];
      return `<footer><div class="mx-auto w-full max-w-screen-xl xl:pb-2"><div class="gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between"><div class="mb-12 flex flex-col gap-4" data-svelte-h="svelte-remeht"><a href="https://animation-svelte.vercel.app" class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-floor-plan size-8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"></path><path d="M9 3v7"></path><path d="M21 10h-7"></path><path d="M3 15h9"></path></svg> <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Svee UI</span></a> <p class="max-w-xs">UI Library for Design Engineers</p></div> <div class="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">${each(footerNavs, (nav) => {
        return `<div><h2 class="mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white">${escape(nav.label)}</h2> <ul class="grid gap-2">${each(nav.items, (item) => {
          return `<li><a${add_attribute("href", item.href, 0)} class="cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200">${escape(item.name)}</a> </li>`;
        })}</ul> </div>`;
      })}</div></div> <div class="flex flex-col gap-2 rounded-md border-neutral-700/20 px-8 py-4 sm:flex sm:flex-row sm:items-center sm:justify-between"><div class="flex items-center space-x-5 sm:mt-0 sm:justify-center">${each(footerSocials, (social) => {
        return `<a${add_attribute("href", social.href, 0)} class="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"><img${add_attribute("src", social.icon, 0)} class="size-4"${add_attribute("alt", social.name, 0)}> <span class="sr-only">${escape(social.name)}</span> </a>`;
      })}</div> <span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center">Copyright \xA9
				${escape(" ")} ${escape((/* @__PURE__ */ new Date()).getFullYear())} ${escape(" ")} <a href="/" class="cursor-pointer" data-svelte-h="svelte-1tw9d6d">Svee UI</a>
				. All Rights Reserved.</span></div></div> </footer>`;
    });
    Align_justify = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        [
          "line",
          {
            "x1": "3",
            "x2": "21",
            "y1": "6",
            "y2": "6"
          }
        ],
        [
          "line",
          {
            "x1": "3",
            "x2": "21",
            "y1": "12",
            "y2": "12"
          }
        ],
        [
          "line",
          {
            "x1": "3",
            "x2": "21",
            "y1": "18",
            "y2": "18"
          }
        ]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "align-justify" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let hamburgerMenuIsOpen = false;
      return ` <header class="fixed left-0 top-0 z-50 w-full -translate-y-4 animate-fade-in border-b opacity-0 backdrop-blur-md"> <div class="container flex h-14 items-center justify-between"><a class="text-md flex items-center" href="/" data-svelte-h="svelte-clkfqn">Svee UI</a> <div class="ml-auto flex h-full items-center"><a class="mr-6 text-sm" href="/signin" data-svelte-h="svelte-gbr95z">Log in</a> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          variant: "secondary",
          class: "mr-6 text-sm",
          href: "/signup"
        },
        {},
        {
          default: () => {
            return `Sign up`;
          }
        }
      )}</div> <button class="ml-6 md:hidden"><span class="sr-only" data-svelte-h="svelte-zt9sly">Toggle menu</span> ${`${validate_component(Align_justify, "AlignJustify").$$render($$result, { strokeWidth: 1.4, class: "text-gray-300" }, {}, {})}`}</button></div> </header> <nav${add_attribute(
        "class",
        cn(
          `fixed left-0 top-0 z-50 h-screen w-full overflow-auto `,
          {
            "pointer-events-none": !hamburgerMenuIsOpen
          },
          {
            "bg-background/70 backdrop-blur-md": hamburgerMenuIsOpen
          }
        ),
        0
      )}>${``}</nav>`;
    });
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="min-h-screen bg-background font-sans antialiased">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="mx-auto flex-1 overflow-hidden">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default;
    imports3 = ["_app/immutable/nodes/2.DIzcbmqC.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/spread.DCI-Q8-Y.js", "_app/immutable/chunks/Icon.C7FeuGwB.js", "_app/immutable/chunks/index.7X9LQzY4.js", "_app/immutable/chunks/index.BWd_yHDk.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/Toaster.svelte_svelte_type_style_lang.js
function cn2(...classes) {
  return classes.filter(Boolean).join(" ");
}
function clientWritable(initialValue) {
  const store = writable(initialValue);
  function set(value) {
    if (isBrowser2) {
      store.set(value);
    }
  }
  function update2(updater) {
    if (isBrowser2) {
      store.update(updater);
    }
  }
  return {
    subscribe: store.subscribe,
    set,
    update: update2
  };
}
function createToastState() {
  const toasts = clientWritable([]);
  const heights = clientWritable([]);
  function addToast(data) {
    toasts.update((prev) => [data, ...prev]);
  }
  function create(data) {
    const { message: message2, ...rest } = data;
    const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    const $toasts = get_store_value(toasts);
    const alreadyExists = $toasts.find((toast2) => {
      return toast2.id === id;
    });
    if (alreadyExists) {
      toasts.update((prev) => prev.map((toast2) => {
        if (toast2.id === id) {
          return {
            ...toast2,
            ...data,
            id,
            title: message2,
            dismissable,
            type,
            updated: true
          };
        }
        return {
          ...toast2,
          updated: false
        };
      }));
    } else {
      addToast({ ...rest, id, title: message2, dismissable, type });
    }
    return id;
  }
  function dismiss(id) {
    if (id === void 0) {
      toasts.update((prev) => prev.map((toast2) => ({ ...toast2, dismiss: true })));
      return;
    }
    toasts.update((prev) => prev.map((toast2) => toast2.id === id ? { ...toast2, dismiss: true } : toast2));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev) => prev.filter((toast2) => toast2.id !== id));
    return id;
  }
  function message(message2, data) {
    return create({ ...data, type: "default", message: message2 });
  }
  function error(message2, data) {
    return create({ ...data, type: "error", message: message2 });
  }
  function success(message2, data) {
    return create({ ...data, type: "success", message: message2 });
  }
  function info(message2, data) {
    return create({ ...data, type: "info", message: message2 });
  }
  function warning2(message2, data) {
    return create({ ...data, type: "warning", message: message2 });
  }
  function loading(message2, data) {
    return create({ ...data, type: "loading", message: message2 });
  }
  function promise(promise2, data) {
    if (!data) {
      return;
    }
    let id = void 0;
    if (data.loading !== void 0) {
      id = create({
        ...data,
        promise: promise2,
        type: "loading",
        message: data.loading
      });
    }
    const p2 = promise2 instanceof Promise ? promise2 : promise2();
    let shouldDismiss = id !== void 0;
    p2.then((response) => {
      if (response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message2 = typeof data.error === "function" ? (
          // @ts-expect-error: Incorrect response type
          data.error(`HTTP error! status: ${response.status}`)
        ) : data.error;
        create({ id, type: "error", message: message2 });
      } else if (data.success !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.success === "function" ? data.success(response) : data.success
        );
        create({ id, type: "success", message: message2 });
      }
    }).catch((error2) => {
      if (data.error !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.error === "function" ? data.error(error2) : data.error
        );
        create({ id, type: "error", message: message2 });
      }
    }).finally(() => {
      if (shouldDismiss) {
        dismiss(id);
        id = void 0;
      }
      data.finally?.();
    });
    return id;
  }
  function custom2(component8, data) {
    const id = data?.id || toastsCounter++;
    create({ component: component8, id, ...data });
    return id;
  }
  function removeHeight(id) {
    heights.update((prev) => prev.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get_store_value(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev) => [data, ...prev]);
      return;
    }
    heights.update((prev) => prev.map((el) => {
      if (el.toastId === data.toastId) {
        return data;
      } else {
        return el;
      }
    }));
  }
  function reset2() {
    toasts.set([]);
    heights.set([]);
  }
  return {
    // methods
    create,
    addToast,
    dismiss,
    remove,
    message,
    error,
    success,
    info,
    warning: warning2,
    loading,
    promise,
    custom: custom2,
    removeHeight,
    setHeight,
    reset: reset2,
    // stores
    toasts,
    heights
  };
}
function toastFunction(message, data) {
  return toastState.create({
    message,
    ...data
  });
}
var isBrowser2, toastsCounter, toastState, basicToast, toast, useEffect;
var init_Toaster_svelte_svelte_type_style_lang = __esm({
  ".svelte-kit/output/server/chunks/Toaster.svelte_svelte_type_style_lang.js"() {
    init_lifecycle();
    init_index2();
    isBrowser2 = typeof document !== "undefined";
    toastsCounter = 0;
    toastState = createToastState();
    basicToast = toastFunction;
    toast = Object.assign(basicToast, {
      success: toastState.success,
      info: toastState.info,
      warning: toastState.warning,
      error: toastState.error,
      custom: toastState.custom,
      message: toastState.message,
      promise: toastState.promise,
      dismiss: toastState.dismiss,
      loading: toastState.loading
    });
    useEffect = (subscribe2) => ({ subscribe: subscribe2 });
  }
});

// .svelte-kit/output/server/entries/pages/(app)/(auth)/_layout@.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => Layout3
});
function getInitialTheme(t) {
  if (t !== "system") {
    return t;
  }
  if (typeof window !== "undefined") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return DARK;
    }
    return LIGHT;
  }
  return LIGHT;
}
function getDocumentDirection() {
  if (typeof window === "undefined") return "ltr";
  if (typeof document === "undefined") return "ltr";
  const dirAttribute = document.documentElement.getAttribute("dir");
  if (dirAttribute === "auto" || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction;
  }
  return dirAttribute;
}
var Icon2, Loader, TOAST_LIFETIME, GAP$1, TIME_BEFORE_UNMOUNT, Toast, css, VISIBLE_TOASTS_AMOUNT, VIEWPORT_OFFSET, TOAST_WIDTH, GAP, DARK, LIGHT, Toaster, Layout3;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/(auth)/_layout@.svelte.js"() {
    init_ssr();
    init_lifecycle();
    init_Toaster_svelte_svelte_type_style_lang();
    Icon2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { type = "success" } = $$props;
      if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
      return `${type === "success" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>` : `${type === "error" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>` : `${type === "info" ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>` : `${type === "warning" ? `<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>` : ``}`}`}`}`;
    });
    Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visible } = $$props;
      const bars = Array(12).fill(0);
      if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0) $$bindings.visible(visible);
      return `<div class="sonner-loading-wrapper"${add_attribute("data-visible", visible, 0)}><div class="sonner-spinner">${each(bars, (_2, i2) => {
        return `<div class="sonner-loading-bar"></div>`;
      })}</div></div>`;
    });
    TOAST_LIFETIME = 4e3;
    GAP$1 = 14;
    TIME_BEFORE_UNMOUNT = 200;
    Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isFront;
      let isVisible;
      let toastType;
      let toastClass;
      let toastDescriptionClass;
      let heightIndex;
      let coords;
      let toastsHeightBefore;
      let disabled;
      let isPromiseLoadingOrInfiniteDuration;
      let $$unsubscribe_effect = noop, $$subscribe_effect = () => ($$unsubscribe_effect(), $$unsubscribe_effect = subscribe(effect, ($$value) => $$value), effect);
      let $heights, $$unsubscribe_heights;
      let $toasts, $$unsubscribe_toasts;
      const defaultClasses = {
        toast: "",
        title: "",
        description: "",
        loader: "",
        closeButton: "",
        cancelButton: "",
        actionButton: "",
        action: "",
        warning: "",
        error: "",
        success: "",
        default: "",
        info: "",
        loading: ""
      };
      const { toasts, heights, removeHeight, setHeight, remove } = toastState;
      $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
      $$unsubscribe_heights = subscribe(heights, (value) => $heights = value);
      let { toast: toast2 } = $$props;
      let { index: index8 } = $$props;
      let { expanded } = $$props;
      let { invert } = $$props;
      let { position } = $$props;
      let { visibleToasts } = $$props;
      let { expandByDefault } = $$props;
      let { closeButton } = $$props;
      let { interacting } = $$props;
      let { cancelButtonStyle = "" } = $$props;
      let { actionButtonStyle = "" } = $$props;
      let { duration = 4e3 } = $$props;
      let { descriptionClass = "" } = $$props;
      let { classes = {} } = $$props;
      let { unstyled = false } = $$props;
      let mounted = false;
      let removed = false;
      let swiping = false;
      let swipeOut = false;
      let offsetBeforeRemove = 0;
      let initialHeight = 0;
      let toastRef;
      let offset = 0;
      let closeTimerStartTimeRef = 0;
      let lastCloseTimerStartTimeRef = 0;
      async function updateHeights() {
        {
          return;
        }
      }
      function deleteToast() {
        removed = true;
        offsetBeforeRemove = offset;
        removeHeight(toast2.id);
        setTimeout(
          () => {
            remove(toast2.id);
          },
          TIME_BEFORE_UNMOUNT
        );
      }
      let timeoutId;
      let remainingTime = toast2.duration || duration || TOAST_LIFETIME;
      function pauseTimer() {
        if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
          const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef;
          remainingTime = remainingTime - elapsedTime;
        }
        lastCloseTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
      }
      function startTimer() {
        closeTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
        timeoutId = setTimeout(
          () => {
            toast2.onAutoClose?.(toast2);
            deleteToast();
          },
          remainingTime
        );
      }
      let effect;
      if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0) $$bindings.toast(toast2);
      if ($$props.index === void 0 && $$bindings.index && index8 !== void 0) $$bindings.index(index8);
      if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);
      if ($$props.invert === void 0 && $$bindings.invert && invert !== void 0) $$bindings.invert(invert);
      if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
      if ($$props.visibleToasts === void 0 && $$bindings.visibleToasts && visibleToasts !== void 0) $$bindings.visibleToasts(visibleToasts);
      if ($$props.expandByDefault === void 0 && $$bindings.expandByDefault && expandByDefault !== void 0) $$bindings.expandByDefault(expandByDefault);
      if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0) $$bindings.closeButton(closeButton);
      if ($$props.interacting === void 0 && $$bindings.interacting && interacting !== void 0) $$bindings.interacting(interacting);
      if ($$props.cancelButtonStyle === void 0 && $$bindings.cancelButtonStyle && cancelButtonStyle !== void 0) $$bindings.cancelButtonStyle(cancelButtonStyle);
      if ($$props.actionButtonStyle === void 0 && $$bindings.actionButtonStyle && actionButtonStyle !== void 0) $$bindings.actionButtonStyle(actionButtonStyle);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
      if ($$props.descriptionClass === void 0 && $$bindings.descriptionClass && descriptionClass !== void 0) $$bindings.descriptionClass(descriptionClass);
      if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0) $$bindings.classes(classes);
      if ($$props.unstyled === void 0 && $$bindings.unstyled && unstyled !== void 0) $$bindings.unstyled(unstyled);
      classes = { ...defaultClasses, ...classes };
      isFront = index8 === 0;
      isVisible = index8 + 1 <= visibleToasts;
      toast2.title;
      toast2.description;
      toastType = toast2.type;
      toastClass = toast2.class || "";
      toastDescriptionClass = toast2.descriptionClass || "";
      heightIndex = $heights.findIndex((height) => height.toastId === toast2.id) || 0;
      coords = position.split("-");
      toastsHeightBefore = $heights.reduce(
        (prev, curr, reducerIndex) => {
          if (reducerIndex >= heightIndex) return prev;
          return prev + curr.height;
        },
        0
      );
      invert = toast2.invert || invert;
      disabled = toastType === "loading";
      offset = Math.round(heightIndex * GAP$1 + toastsHeightBefore);
      {
        updateHeights();
      }
      {
        if (toast2.updated) {
          clearTimeout(timeoutId);
          remainingTime = toast2.duration || duration || TOAST_LIFETIME;
          startTimer();
        }
      }
      isPromiseLoadingOrInfiniteDuration = toast2.promise && toastType === "loading" || toast2.duration === Number.POSITIVE_INFINITY;
      $$subscribe_effect(effect = useEffect(() => {
        if (!isPromiseLoadingOrInfiniteDuration) {
          if (expanded || interacting) {
            pauseTimer();
          } else {
            startTimer();
          }
        }
        return () => clearTimeout(timeoutId);
      }));
      {
        if (toast2.delete) {
          deleteToast();
        }
      }
      $$unsubscribe_effect();
      $$unsubscribe_heights();
      $$unsubscribe_toasts();
      return `   <li${add_attribute("aria-live", toast2.important ? "assertive" : "polite", 0)} aria-atomic="true" role="status"${add_attribute("tabindex", 0, 0)}${add_attribute("class", cn2($$props.class, toastClass, classes?.toast, toast2?.classes?.toast, classes?.[toastType], toast2?.classes?.[toastType]), 0)} data-sonner-toast=""${add_attribute("data-styled", !(toast2.component || toast2?.unstyled || unstyled), 0)}${add_attribute("data-mounted", mounted, 0)}${add_attribute("data-promise", Boolean(toast2.promise), 0)}${add_attribute("data-removed", removed, 0)}${add_attribute("data-visible", isVisible, 0)}${add_attribute("data-y-position", coords[0], 0)}${add_attribute("data-x-position", coords[1], 0)}${add_attribute("data-index", index8, 0)}${add_attribute("data-front", isFront, 0)}${add_attribute("data-swiping", swiping, 0)}${add_attribute("data-type", toastType, 0)}${add_attribute("data-invert", invert, 0)}${add_attribute("data-swipe-out", swipeOut, 0)}${add_attribute("data-expanded", Boolean(expanded || expandByDefault && mounted), 0)}${add_styles(merge_ssr_styles(escape(`${$$props.style} ${toast2.style}`, true), {
        "--index": index8,
        "--toasts-before": index8,
        "--z-index": $toasts.length - index8,
        "--offset": `${removed ? offsetBeforeRemove : offset}px`,
        "--initial-height": `${initialHeight}px`
      }))}${add_attribute("this", toastRef, 0)}>${closeButton && !toast2.component ? `<button aria-label="Close toast"${add_attribute("data-disabled", disabled, 0)} data-close-button${add_attribute("class", cn2(classes?.closeButton, toast2?.classes?.closeButton), 0)}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>` : ``} ${toast2.component ? `${validate_component(toast2.component || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast2.componentProps), {}, {})}` : `${toastType !== "default" || toast2.icon || toast2.promise ? `<div data-icon="">${(toast2.promise || toastType === "loading") && !toast2.icon ? `${slots["loading-icon"] ? slots["loading-icon"]({}) : ``}` : ``} ${toast2.icon ? `${validate_component(toast2.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${toastType === "success" ? `${slots["success-icon"] ? slots["success-icon"]({}) : ``}` : `${toastType === "error" ? `${slots["error-icon"] ? slots["error-icon"]({}) : ``}` : `${toastType === "warning" ? `${slots["warning-icon"] ? slots["warning-icon"]({}) : ``}` : `${toastType === "info" ? `${slots["info-icon"] ? slots["info-icon"]({}) : ``}` : ``}`}`}`}`}</div>` : ``} <div data-content="">${toast2.title ? `<div data-title=""${add_attribute("class", cn2(classes?.title, toast2?.classes?.title), 0)}>${typeof toast2.title !== "string" ? `${validate_component(toast2.title || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast2.componentProps), {}, {})}` : `${escape(toast2.title)}`}</div>` : ``} ${toast2.description ? `<div data-description=""${add_attribute("class", cn2(descriptionClass, toastDescriptionClass, classes?.description, toast2.classes?.description), 0)}>${typeof toast2.description !== "string" ? `${validate_component(toast2.description || missing_component, "svelte:component").$$render($$result, Object.assign({}, toast2.componentProps), {}, {})}` : `${escape(toast2.description)}`}</div>` : ``}</div> ${toast2.cancel ? `<button data-button data-cancel${add_attribute("style", cancelButtonStyle, 0)}${add_attribute("class", cn2(classes?.cancelButton, toast2?.classes?.cancelButton), 0)}>${escape(toast2.cancel.label)}</button>` : ``} ${toast2.action ? `<button data-button=""${add_attribute("style", actionButtonStyle, 0)}${add_attribute("class", cn2(classes?.actionButton, toast2?.classes?.actionButton), 0)}>${escape(toast2.action.label)}</button>` : ``}`}</li>`;
    });
    css = {
      code: ":where(html[dir='ltr']),:where([data-sonner-toaster][dir='ltr']){--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}:where(html[dir='rtl']),:where([data-sonner-toaster][dir='rtl']){--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,\n			system-ui,\n			-apple-system,\n			BlinkMacSystemFont,\n			Segoe UI,\n			Roboto,\n			Helvetica Neue,\n			Arial,\n			Noto Sans,\n			sans-serif,\n			Apple Color Emoji,\n			Segoe UI Emoji,\n			Segoe UI Symbol,\n			Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position='right']){right:max(var(--offset), env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position='left']){left:max(var(--offset), env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position='center']){left:50%;transform:translateX(-50%)}:where([data-sonner-toaster][data-y-position='top']){top:max(var(--offset), env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position='bottom']){bottom:max(var(--offset), env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform 400ms,\n			opacity 400ms,\n			height 400ms,\n			box-shadow 200ms;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled='true']){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),\n			0 0 0 2px rgba(0, 0, 0, 0.2)}:where([data-sonner-toast][data-y-position='top']){top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position='bottom']){bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise='true']) :where([data-icon])>svg{opacity:0;transform:scale(0.8);transform-origin:center;animation:sonner-fade-in 300ms ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled='true'] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity 400ms,\n			box-shadow 200ms}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px rgba(0, 0, 0, 0.4)}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0, 0, 0, 0.08)}:where([data-sonner-toast][data-theme='dark']) :where([data-cancel]){background:rgba(255, 255, 255, 0.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity 100ms,\n			background 200ms,\n			border-color 200ms}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),\n			0 0 0 2px rgba(0, 0, 0, 0.2)}:where([data-sonner-toast]) :where([data-disabled='true']){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping='true'])::before{content:'';position:absolute;left:0;right:0;height:100%;z-index:-1}:where(\n			[data-sonner-toast][data-y-position='top'][data-swiping='true']\n		)::before{bottom:50%;transform:scaleY(3) translateY(50%)}:where(\n			[data-sonner-toast][data-y-position='bottom'][data-swiping='true']\n		)::before{top:50%;transform:scaleY(3) translateY(-50%)}:where(\n			[data-sonner-toast][data-swiping='false'][data-removed='true']\n		)::before{content:'';position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast])::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted='true']){--y:translateY(0);opacity:1}:where([data-sonner-toast][data-expanded='false'][data-front='false']){--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before)))\n			scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity 400ms}:where(\n			[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']\n		)\n		>*{opacity:0}:where([data-sonner-toast][data-visible='false']){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted='true'][data-expanded='true']){--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where(\n			[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false']\n		){--y:translateY(calc(var(--lift) * -100%));opacity:0}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']\n		){--y:translateY(\n			calc(var(--lift) * var(--offset) + var(--lift) * -100%)\n		);opacity:0}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']\n		){--y:translateY(40%);opacity:0;transition:transform 500ms,\n			opacity 200ms}:where(\n			[data-sonner-toast][data-removed='true'][data-front='false']\n		)::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping='true']{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out='true'][data-y-position='bottom'],[data-sonner-toast][data-swipe-out='true'][data-y-position='top']{animation:swipe-out 200ms ease-out forwards}@keyframes swipe-out{from{transform:translateY(\n				calc(var(--lift) * var(--offset) + var(--swipe-amount))\n			);opacity:1}to{transform:translateY(\n				calc(\n					var(--lift) * var(--offset) + var(--swipe-amount) +\n						var(--lift) * -100%\n				)\n			);opacity:0}}@media(max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset:16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position='left']{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position='bottom']{bottom:20px}[data-sonner-toaster][data-y-position='top']{top:20px}[data-sonner-toaster][data-x-position='center']{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme='light']{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 91%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 91%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 91%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme='light']\n		[data-sonner-toast][data-invert='true']{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-theme='dark']\n		[data-sonner-toast][data-invert='true']{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-theme='dark']{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 100%, 12%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 12%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-rich-colors='true'] [data-sonner-toast][data-type='success']{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-theme='dark']\n		[data-sonner-toast][data-type='default']\n		[data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='success']\n		[data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='info']{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='info']\n		[data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='warning']{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='warning']\n		[data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors='true'] [data-sonner-toast][data-type='error']{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors='true']\n		[data-sonner-toast][data-type='error']\n		[data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible='false']{transform-origin:center;animation:sonner-fade-out 0.2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(0.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-0.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-0.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-0.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-0.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-0.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-0.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-0.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-0.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-0.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:0.15}}@media(prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none !important;animation:none !important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);transform-origin:center;transition:opacity 200ms,\n			transform 200ms}.sonner-loader[data-visible='false']{opacity:0;transform:scale(0.8) translate(-50%, -50%)}",
      map: `{"version":3,"file":"Toaster.svelte","sources":["Toaster.svelte"],"sourcesContent":["<script>import { onDestroy, onMount } from 'svelte';\\nimport { toastState } from './state.js';\\nimport Toast from './Toast.svelte';\\nimport Loader from './Loader.svelte';\\nimport Icon from './Icon.svelte';\\n// Visible toasts amount\\nconst VISIBLE_TOASTS_AMOUNT = 3;\\n// Viewport padding\\nconst VIEWPORT_OFFSET = '32px';\\n// Default toast width\\nconst TOAST_WIDTH = 356;\\n// Default gap between toasts\\nconst GAP = 14;\\nconst DARK = 'dark';\\nconst LIGHT = 'light';\\nfunction getInitialTheme(t) {\\n    if (t !== 'system') {\\n        return t;\\n    }\\n    if (typeof window !== 'undefined') {\\n        if (window.matchMedia &&\\n            window.matchMedia('(prefers-color-scheme: dark)').matches) {\\n            return DARK;\\n        }\\n        return LIGHT;\\n    }\\n    return LIGHT;\\n}\\nfunction getDocumentDirection() {\\n    if (typeof window === 'undefined')\\n        return 'ltr';\\n    if (typeof document === 'undefined')\\n        return 'ltr'; // For Fresh purpose\\n    const dirAttribute = document.documentElement.getAttribute('dir');\\n    if (dirAttribute === 'auto' || !dirAttribute) {\\n        return window.getComputedStyle(document.documentElement)\\n            .direction;\\n    }\\n    return dirAttribute;\\n}\\nexport let invert = false;\\nexport let theme = 'light';\\nexport let position = 'bottom-right';\\nexport let hotkey = ['altKey', 'KeyT'];\\nexport let richColors = false;\\nexport let expand = false;\\nexport let duration = 4000;\\nexport let visibleToasts = VISIBLE_TOASTS_AMOUNT;\\nexport let closeButton = false;\\nexport let toastOptions = {};\\nexport let offset = null;\\nexport let dir = getDocumentDirection();\\nconst { toasts, heights, reset } = toastState;\\n$: possiblePositions = Array.from(new Set([\\n    position,\\n    ...$toasts\\n        .filter((toast) => toast.position)\\n        .map((toast) => toast.position)\\n].filter(Boolean)));\\nlet expanded = false;\\nlet interacting = false;\\nlet actualTheme = getInitialTheme(theme);\\nlet listRef;\\nlet lastFocusedElementRef = null;\\nlet isFocusWithinRef = false;\\n$: hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');\\n$: if ($toasts.length <= 1) {\\n    expanded = false;\\n}\\n// Check for dismissed toasts and remove them. We need to do this to have dismiss animation.\\n$: {\\n    const toastsToDismiss = $toasts.filter((toast) => toast.dismiss && !toast.delete);\\n    if (toastsToDismiss.length > 0) {\\n        const updatedToasts = $toasts.map((toast) => {\\n            const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id);\\n            if (matchingToast) {\\n                return { ...toast, delete: true };\\n            }\\n            return toast;\\n        });\\n        toasts.set(updatedToasts);\\n    }\\n}\\nonDestroy(() => {\\n    if (listRef && lastFocusedElementRef) {\\n        lastFocusedElementRef.focus({ preventScroll: true });\\n        lastFocusedElementRef = null;\\n        isFocusWithinRef = false;\\n    }\\n});\\nonMount(() => {\\n    reset();\\n    const handleKeydown = (event) => {\\n        const isHotkeyPressed = hotkey.every((key) => \\n        // eslint-disable-next-line @typescript-eslint/no-explicit-any\\n        event[key] || event.code === key);\\n        if (isHotkeyPressed) {\\n            expanded = true;\\n            listRef?.focus();\\n        }\\n        if (event.code === 'Escape' &&\\n            (document.activeElement === listRef ||\\n                listRef?.contains(document.activeElement))) {\\n            expanded = false;\\n        }\\n    };\\n    document.addEventListener('keydown', handleKeydown);\\n    return () => {\\n        document.removeEventListener('keydown', handleKeydown);\\n    };\\n});\\n$: {\\n    if (theme !== 'system') {\\n        actualTheme = theme;\\n    }\\n    if (typeof window !== 'undefined') {\\n        if (theme === 'system') {\\n            // check if current preference is dark\\n            if (window.matchMedia &&\\n                window.matchMedia('(prefers-color-scheme: dark)').matches) {\\n                // it's currently dark\\n                actualTheme = DARK;\\n            }\\n            else {\\n                // it's not dark\\n                actualTheme = LIGHT;\\n            }\\n        }\\n        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');\\n        const changeHandler = ({ matches }) => {\\n            actualTheme = matches ? DARK : LIGHT;\\n        };\\n        if ('addEventListener' in mediaQueryList) {\\n            mediaQueryList.addEventListener('change', changeHandler);\\n        }\\n        else {\\n            // @ts-expect-error deprecated API\\n            mediaQueryList.addListener(changeHandler);\\n        }\\n    }\\n}\\nfunction handleBlur(event) {\\n    if (isFocusWithinRef &&\\n        !event.currentTarget.contains(event.relatedTarget)) {\\n        isFocusWithinRef = false;\\n        if (lastFocusedElementRef) {\\n            lastFocusedElementRef.focus({ preventScroll: true });\\n            lastFocusedElementRef = null;\\n        }\\n    }\\n}\\nfunction handleFocus(event) {\\n    if (!isFocusWithinRef) {\\n        isFocusWithinRef = true;\\n        lastFocusedElementRef = event.relatedTarget;\\n    }\\n}\\n<\/script>\\n\\n{#if $toasts.length > 0}\\n\\t<section aria-label={\`Notifications \${hotkeyLabel}\`} tabIndex={-1}>\\n\\t\\t{#each possiblePositions as position, index}\\n\\t\\t\\t<ol\\n\\t\\t\\t\\ttabIndex={-1}\\n\\t\\t\\t\\tbind:this={listRef}\\n\\t\\t\\t\\tclass={$$props.class}\\n\\t\\t\\t\\tdata-sonner-toaster\\n\\t\\t\\t\\tdata-theme={actualTheme}\\n\\t\\t\\t\\tdata-rich-colors={richColors}\\n\\t\\t\\t\\tdir={dir === 'auto' ? getDocumentDirection() : dir}\\n\\t\\t\\t\\tdata-y-position={position.split('-')[0]}\\n\\t\\t\\t\\tdata-x-position={position.split('-')[1]}\\n\\t\\t\\t\\ton:blur={handleBlur}\\n\\t\\t\\t\\ton:focus={handleFocus}\\n\\t\\t\\t\\ton:mouseenter={() => (expanded = true)}\\n\\t\\t\\t\\ton:mousemove={() => (expanded = true)}\\n\\t\\t\\t\\ton:mouseleave={() => {\\n\\t\\t\\t\\t\\tif (!interacting) {\\n\\t\\t\\t\\t\\t\\texpanded = false;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ton:pointerdown={() => (interacting = true)}\\n\\t\\t\\t\\ton:pointerup={() => (interacting = false)}\\n\\t\\t\\t\\tstyle:--front-toast-height={\`\${$heights[0]?.height}px\`}\\n\\t\\t\\t\\tstyle:--offset={typeof offset === 'number'\\n\\t\\t\\t\\t\\t? \`\${offset}px\`\\n\\t\\t\\t\\t\\t: offset || VIEWPORT_OFFSET}\\n\\t\\t\\t\\tstyle:--width={\`\${TOAST_WIDTH}px\`}\\n\\t\\t\\t\\tstyle:--gap={\`\${GAP}px\`}\\n\\t\\t\\t\\tstyle={$$props.style}\\n\\t\\t\\t\\t{...$$restProps}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#each $toasts.filter((toast) => (!toast.position && index === 0) || toast.position === position) as toast, index (toast.id)}\\n\\t\\t\\t\\t\\t<Toast\\n\\t\\t\\t\\t\\t\\t{index}\\n\\t\\t\\t\\t\\t\\t{toast}\\n\\t\\t\\t\\t\\t\\t{invert}\\n\\t\\t\\t\\t\\t\\t{visibleToasts}\\n\\t\\t\\t\\t\\t\\t{closeButton}\\n\\t\\t\\t\\t\\t\\t{interacting}\\n\\t\\t\\t\\t\\t\\t{position}\\n\\t\\t\\t\\t\\t\\texpandByDefault={expand}\\n\\t\\t\\t\\t\\t\\t{expanded}\\n\\t\\t\\t\\t\\t\\tactionButtonStyle={toastOptions?.actionButtonStyle ||\\n\\t\\t\\t\\t\\t\\t\\t''}\\n\\t\\t\\t\\t\\t\\tcancelButtonStyle={toastOptions?.cancelButtonStyle ||\\n\\t\\t\\t\\t\\t\\t\\t''}\\n\\t\\t\\t\\t\\t\\tclass={toastOptions?.class || ''}\\n\\t\\t\\t\\t\\t\\tdescriptionClass={toastOptions?.descriptionClass || ''}\\n\\t\\t\\t\\t\\t\\tclasses={toastOptions.classes || {}}\\n\\t\\t\\t\\t\\t\\tduration={toastOptions?.duration ?? duration}\\n\\t\\t\\t\\t\\t\\tunstyled={toastOptions.unstyled || false}\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"loading-icon\\" slot=\\"loading-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Loader visible={toast.type === 'loading'} />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"success-icon\\" slot=\\"success-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"success\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"error-icon\\" slot=\\"error-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"error\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"warning-icon\\" slot=\\"warning-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"warning\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t\\t<slot name=\\"info-icon\\" slot=\\"info-icon\\">\\n\\t\\t\\t\\t\\t\\t\\t<Icon type=\\"info\\" />\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t</Toast>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</ol>\\n\\t\\t{/each}\\n\\t</section>\\n{/if}\\n\\n<style global>\\n\\t:global(:where(html[dir='ltr'])),\\n\\t:global(:where([data-sonner-toaster][dir='ltr'])) {\\n\\t\\t--toast-icon-margin-start: -3px;\\n\\t\\t--toast-icon-margin-end: 4px;\\n\\t\\t--toast-svg-margin-start: -1px;\\n\\t\\t--toast-svg-margin-end: 0px;\\n\\t\\t--toast-button-margin-start: auto;\\n\\t\\t--toast-button-margin-end: 0;\\n\\t\\t--toast-close-button-start: 0;\\n\\t\\t--toast-close-button-end: unset;\\n\\t\\t--toast-close-button-transform: translate(-35%, -35%);\\n\\t}\\n\\n\\t:global(:where(html[dir='rtl'])),\\n\\t:global(:where([data-sonner-toaster][dir='rtl'])) {\\n\\t\\t--toast-icon-margin-start: 4px;\\n\\t\\t--toast-icon-margin-end: -3px;\\n\\t\\t--toast-svg-margin-start: 0px;\\n\\t\\t--toast-svg-margin-end: -1px;\\n\\t\\t--toast-button-margin-start: 0;\\n\\t\\t--toast-button-margin-end: auto;\\n\\t\\t--toast-close-button-start: unset;\\n\\t\\t--toast-close-button-end: 0;\\n\\t\\t--toast-close-button-transform: translate(35%, -35%);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster])) {\\n\\t\\tposition: fixed;\\n\\t\\twidth: var(--width);\\n\\t\\tfont-family:\\n\\t\\t\\tui-sans-serif,\\n\\t\\t\\tsystem-ui,\\n\\t\\t\\t-apple-system,\\n\\t\\t\\tBlinkMacSystemFont,\\n\\t\\t\\tSegoe UI,\\n\\t\\t\\tRoboto,\\n\\t\\t\\tHelvetica Neue,\\n\\t\\t\\tArial,\\n\\t\\t\\tNoto Sans,\\n\\t\\t\\tsans-serif,\\n\\t\\t\\tApple Color Emoji,\\n\\t\\t\\tSegoe UI Emoji,\\n\\t\\t\\tSegoe UI Symbol,\\n\\t\\t\\tNoto Color Emoji;\\n\\t\\t--gray1: hsl(0, 0%, 99%);\\n\\t\\t--gray2: hsl(0, 0%, 97.3%);\\n\\t\\t--gray3: hsl(0, 0%, 95.1%);\\n\\t\\t--gray4: hsl(0, 0%, 93%);\\n\\t\\t--gray5: hsl(0, 0%, 90.9%);\\n\\t\\t--gray6: hsl(0, 0%, 88.7%);\\n\\t\\t--gray7: hsl(0, 0%, 85.8%);\\n\\t\\t--gray8: hsl(0, 0%, 78%);\\n\\t\\t--gray9: hsl(0, 0%, 56.1%);\\n\\t\\t--gray10: hsl(0, 0%, 52.3%);\\n\\t\\t--gray11: hsl(0, 0%, 43.5%);\\n\\t\\t--gray12: hsl(0, 0%, 9%);\\n\\t\\t--border-radius: 8px;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tlist-style: none;\\n\\t\\toutline: none;\\n\\t\\tz-index: 999999999;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='right'])) {\\n\\t\\tright: max(var(--offset), env(safe-area-inset-right));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='left'])) {\\n\\t\\tleft: max(var(--offset), env(safe-area-inset-left));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-x-position='center'])) {\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translateX(-50%);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-y-position='top'])) {\\n\\t\\ttop: max(var(--offset), env(safe-area-inset-top));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toaster][data-y-position='bottom'])) {\\n\\t\\tbottom: max(var(--offset), env(safe-area-inset-bottom));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) {\\n\\t\\t--y: translateY(100%);\\n\\t\\t--lift-amount: calc(var(--lift) * var(--gap));\\n\\t\\tz-index: var(--z-index);\\n\\t\\tposition: absolute;\\n\\t\\topacity: 0;\\n\\t\\ttransform: var(--y);\\n\\t\\tfilter: blur(0);\\n\\t\\t/* https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not */\\n\\t\\ttouch-action: none;\\n\\t\\ttransition:\\n\\t\\t\\ttransform 400ms,\\n\\t\\t\\topacity 400ms,\\n\\t\\t\\theight 400ms,\\n\\t\\t\\tbox-shadow 200ms;\\n\\t\\tbox-sizing: border-box;\\n\\t\\toutline: none;\\n\\t\\toverflow-wrap: anywhere;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-styled='true'])) {\\n\\t\\tpadding: 16px;\\n\\t\\tbackground: var(--normal-bg);\\n\\t\\tborder: 1px solid var(--normal-border);\\n\\t\\tcolor: var(--normal-text);\\n\\t\\tborder-radius: var(--border-radius);\\n\\t\\tbox-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);\\n\\t\\twidth: var(--width);\\n\\t\\tfont-size: 13px;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 6px;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast]:focus-visible)) {\\n\\t\\tbox-shadow:\\n\\t\\t\\t0px 4px 12px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 0 0 2px rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-y-position='top'])) {\\n\\t\\ttop: 0;\\n\\t\\t--y: translateY(-100%);\\n\\t\\t--lift: 1;\\n\\t\\t--lift-amount: calc(1 * var(--gap));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-y-position='bottom'])) {\\n\\t\\tbottom: 0;\\n\\t\\t--y: translateY(100%);\\n\\t\\t--lift: -1;\\n\\t\\t--lift-amount: calc(var(--lift) * var(--gap));\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-description])) {\\n\\t\\tfont-weight: 400;\\n\\t\\tline-height: 1.4;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-title])) {\\n\\t\\tfont-weight: 500;\\n\\t\\tline-height: 1.5;\\n\\t\\tcolor: inherit;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) {\\n\\t\\tdisplay: flex;\\n\\t\\theight: 16px;\\n\\t\\twidth: 16px;\\n\\t\\tposition: relative;\\n\\t\\tjustify-content: flex-start;\\n\\t\\talign-items: center;\\n\\t\\tflex-shrink: 0;\\n\\t\\tmargin-left: var(--toast-icon-margin-start);\\n\\t\\tmargin-right: var(--toast-icon-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-promise='true'])) :global(:where([data-icon])) > :global(svg) {\\n\\t\\topacity: 0;\\n\\t\\ttransform: scale(0.8);\\n\\t\\ttransform-origin: center;\\n\\t\\tanimation: sonner-fade-in 300ms ease forwards;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) > :global(*) {\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-icon])) :global(svg) {\\n\\t\\tmargin-left: var(--toast-svg-margin-start);\\n\\t\\tmargin-right: var(--toast-svg-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-content])) {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 2px;\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-styled='true']) :global([data-button]) {\\n\\t\\tborder-radius: 4px;\\n\\t\\tpadding-left: 8px;\\n\\t\\tpadding-right: 8px;\\n\\t\\theight: 24px;\\n\\t\\tfont-size: 12px;\\n\\t\\tcolor: var(--normal-bg);\\n\\t\\tbackground: var(--normal-text);\\n\\t\\tmargin-left: var(--toast-button-margin-start);\\n\\t\\tmargin-right: var(--toast-button-margin-end);\\n\\t\\tborder: none;\\n\\t\\tcursor: pointer;\\n\\t\\toutline: none;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex-shrink: 0;\\n\\t\\ttransition:\\n\\t\\t\\topacity 400ms,\\n\\t\\t\\tbox-shadow 200ms;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-button]):focus-visible) {\\n\\t\\tbox-shadow: 0 0 0 2px rgba(0, 0, 0, 0.4);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-button]):first-of-type) {\\n\\t\\tmargin-left: var(--toast-button-margin-start);\\n\\t\\tmargin-right: var(--toast-button-margin-end);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-cancel])) {\\n\\t\\tcolor: var(--normal-text);\\n\\t\\tbackground: rgba(0, 0, 0, 0.08);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-theme='dark'])) :global(:where([data-cancel])) {\\n\\t\\tbackground: rgba(255, 255, 255, 0.3);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-close-button])) {\\n\\t\\tposition: absolute;\\n\\t\\tleft: var(--toast-close-button-start);\\n\\t\\tright: var(--toast-close-button-end);\\n\\t\\ttop: 0;\\n\\t\\theight: 20px;\\n\\t\\twidth: 20px;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0;\\n\\t\\tbackground: var(--gray1);\\n\\t\\tcolor: var(--gray12);\\n\\t\\tborder: 1px solid var(--gray4);\\n\\t\\ttransform: var(--toast-close-button-transform);\\n\\t\\tborder-radius: 50%;\\n\\t\\tcursor: pointer;\\n\\t\\tz-index: 1;\\n\\t\\ttransition:\\n\\t\\t\\topacity 100ms,\\n\\t\\t\\tbackground 200ms,\\n\\t\\t\\tborder-color 200ms;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-close-button]):focus-visible) {\\n\\t\\tbox-shadow:\\n\\t\\t\\t0px 4px 12px rgba(0, 0, 0, 0.1),\\n\\t\\t\\t0 0 0 2px rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) :global(:where([data-disabled='true'])) {\\n\\t\\tcursor: not-allowed;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast]):hover) :global(:where([data-close-button]):hover) {\\n\\t\\tbackground: var(--gray2);\\n\\t\\tborder-color: var(--gray5);\\n\\t}\\n\\n\\t/* Leave a ghost div to avoid setting hover to false when swiping out */\\n\\t:global(:where([data-sonner-toast][data-swiping='true'])::before) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\theight: 100%;\\n\\t\\tz-index: -1;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-y-position='top'][data-swiping='true']\\n\\t\\t)::before) {\\n\\t\\t/* y 50% needed to distribute height additional height evenly */\\n\\t\\tbottom: 50%;\\n\\t\\ttransform: scaleY(3) translateY(50%);\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-y-position='bottom'][data-swiping='true']\\n\\t\\t)::before) {\\n\\t\\t/* y -50% needed to distribute height additional height evenly */\\n\\t\\ttop: 50%;\\n\\t\\ttransform: scaleY(3) translateY(-50%);\\n\\t}\\n\\n\\t/* Leave a ghost div to avoid setting hover to false when transitioning out */\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-swiping='false'][data-removed='true']\\n\\t\\t)::before) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tinset: 0;\\n\\t\\ttransform: scaleY(2);\\n\\t}\\n\\n\\t/* Needed to avoid setting hover to false when inbetween toasts */\\n\\t:global(:where([data-sonner-toast])::after) {\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\theight: calc(var(--gap) + 1px);\\n\\t\\tbottom: 100%;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-mounted='true'])) {\\n\\t\\t--y: translateY(0);\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-expanded='false'][data-front='false'])) {\\n\\t\\t--scale: var(--toasts-before) * 0.05 + 1;\\n\\t\\t--y: translateY(calc(var(--lift-amount) * var(--toasts-before)))\\n\\t\\t\\tscale(calc(-1 * var(--scale)));\\n\\t\\theight: var(--front-toast-height);\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast])) > :global(*) {\\n\\t\\ttransition: opacity 400ms;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']\\n\\t\\t)\\n\\t\\t)> :global(*) {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-visible='false'])) {\\n\\t\\topacity: 0;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\t:global(:where([data-sonner-toast][data-mounted='true'][data-expanded='true'])) {\\n\\t\\t--y: translateY(calc(var(--lift) * var(--offset)));\\n\\t\\theight: var(--initial-height);\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false']\\n\\t\\t)) {\\n\\t\\t--y: translateY(calc(var(--lift) * -100%));\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true']\\n\\t\\t)) {\\n\\t\\t--y: translateY(\\n\\t\\t\\tcalc(var(--lift) * var(--offset) + var(--lift) * -100%)\\n\\t\\t);\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false']\\n\\t\\t)) {\\n\\t\\t--y: translateY(40%);\\n\\t\\topacity: 0;\\n\\t\\ttransition:\\n\\t\\t\\ttransform 500ms,\\n\\t\\t\\topacity 200ms;\\n\\t}\\n\\n\\t/* Bump up the height to make sure hover state doesn't get set to false */\\n\\t:global(:where(\\n\\t\\t\\t[data-sonner-toast][data-removed='true'][data-front='false']\\n\\t\\t)::before) {\\n\\t\\theight: calc(var(--initial-height) + 20%);\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-swiping='true']) {\\n\\t\\ttransform: var(--y) translateY(var(--swipe-amount, 0px));\\n\\t\\ttransition: none;\\n\\t}\\n\\n\\t:global([data-sonner-toast][data-swipe-out='true'][data-y-position='bottom']),\\n\\t:global([data-sonner-toast][data-swipe-out='true'][data-y-position='top']) {\\n\\t\\tanimation: swipe-out 200ms ease-out forwards;\\n\\t}\\n\\n\\t@keyframes -global-swipe-out {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateY(\\n\\t\\t\\t\\tcalc(var(--lift) * var(--offset) + var(--swipe-amount))\\n\\t\\t\\t);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\n\\t\\tto {\\n\\t\\t\\ttransform: translateY(\\n\\t\\t\\t\\tcalc(\\n\\t\\t\\t\\t\\tvar(--lift) * var(--offset) + var(--swipe-amount) +\\n\\t\\t\\t\\t\\t\\tvar(--lift) * -100%\\n\\t\\t\\t\\t)\\n\\t\\t\\t);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (max-width: 600px) {\\n\\t\\t:global([data-sonner-toaster]) {\\n\\t\\t\\tposition: fixed;\\n\\t\\t\\t--mobile-offset: 16px;\\n\\t\\t\\tright: var(--mobile-offset);\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster]) :global([data-sonner-toast]) {\\n\\t\\t\\tleft: 0;\\n\\t\\t\\tright: 0;\\n\\t\\t\\twidth: calc(100% - var(--mobile-offset) * 2);\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-x-position='left']) {\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-y-position='bottom']) {\\n\\t\\t\\tbottom: 20px;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-y-position='top']) {\\n\\t\\t\\ttop: 20px;\\n\\t\\t}\\n\\n\\t\\t:global([data-sonner-toaster][data-x-position='center']) {\\n\\t\\t\\tleft: var(--mobile-offset);\\n\\t\\t\\tright: var(--mobile-offset);\\n\\t\\t\\ttransform: none;\\n\\t\\t}\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='light']) {\\n\\t\\t--normal-bg: #fff;\\n\\t\\t--normal-border: var(--gray4);\\n\\t\\t--normal-text: var(--gray12);\\n\\n\\t\\t--success-bg: hsl(143, 85%, 96%);\\n\\t\\t--success-border: hsl(145, 92%, 91%);\\n\\t\\t--success-text: hsl(140, 100%, 27%);\\n\\n\\t\\t--info-bg: hsl(208, 100%, 97%);\\n\\t\\t--info-border: hsl(221, 91%, 91%);\\n\\t\\t--info-text: hsl(210, 92%, 45%);\\n\\n\\t\\t--warning-bg: hsl(49, 100%, 97%);\\n\\t\\t--warning-border: hsl(49, 91%, 91%);\\n\\t\\t--warning-text: hsl(31, 92%, 45%);\\n\\n\\t\\t--error-bg: hsl(359, 100%, 97%);\\n\\t\\t--error-border: hsl(359, 100%, 94%);\\n\\t\\t--error-text: hsl(360, 100%, 45%);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='light']\\n\\t\\t[data-sonner-toast][data-invert='true']) {\\n\\t\\t--normal-bg: #000;\\n\\t\\t--normal-border: hsl(0, 0%, 20%);\\n\\t\\t--normal-text: var(--gray1);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='dark']\\n\\t\\t[data-sonner-toast][data-invert='true']) {\\n\\t\\t--normal-bg: #fff;\\n\\t\\t--normal-border: var(--gray3);\\n\\t\\t--normal-text: var(--gray12);\\n\\t}\\n\\n\\t:global([data-sonner-toaster][data-theme='dark']) {\\n\\t\\t--normal-bg: #000;\\n\\t\\t--normal-border: hsl(0, 0%, 20%);\\n\\t\\t--normal-text: var(--gray1);\\n\\n\\t\\t--success-bg: hsl(150, 100%, 6%);\\n\\t\\t--success-border: hsl(147, 100%, 12%);\\n\\t\\t--success-text: hsl(150, 86%, 65%);\\n\\n\\t\\t--info-bg: hsl(215, 100%, 6%);\\n\\t\\t--info-border: hsl(223, 100%, 12%);\\n\\t\\t--info-text: hsl(216, 87%, 65%);\\n\\n\\t\\t--warning-bg: hsl(64, 100%, 6%);\\n\\t\\t--warning-border: hsl(60, 100%, 12%);\\n\\t\\t--warning-text: hsl(46, 87%, 65%);\\n\\n\\t\\t--error-bg: hsl(358, 76%, 10%);\\n\\t\\t--error-border: hsl(357, 89%, 16%);\\n\\t\\t--error-text: hsl(358, 100%, 81%);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='success']) {\\n\\t\\tbackground: var(--success-bg);\\n\\t\\tborder-color: var(--success-border);\\n\\t\\tcolor: var(--success-text);\\n\\t}\\n\\n\\t:global([data-theme='dark']\\n\\t\\t[data-sonner-toast][data-type='default']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--normal-bg);\\n\\t\\tborder-color: var(--normal-border);\\n\\t\\tcolor: var(--normal-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='success']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--success-bg);\\n\\t\\tborder-color: var(--success-border);\\n\\t\\tcolor: var(--success-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='info']) {\\n\\t\\tbackground: var(--info-bg);\\n\\t\\tborder-color: var(--info-border);\\n\\t\\tcolor: var(--info-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='info']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--info-bg);\\n\\t\\tborder-color: var(--info-border);\\n\\t\\tcolor: var(--info-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='warning']) {\\n\\t\\tbackground: var(--warning-bg);\\n\\t\\tborder-color: var(--warning-border);\\n\\t\\tcolor: var(--warning-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='warning']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--warning-bg);\\n\\t\\tborder-color: var(--warning-border);\\n\\t\\tcolor: var(--warning-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']) :global([data-sonner-toast][data-type='error']) {\\n\\t\\tbackground: var(--error-bg);\\n\\t\\tborder-color: var(--error-border);\\n\\t\\tcolor: var(--error-text);\\n\\t}\\n\\n\\t:global([data-rich-colors='true']\\n\\t\\t[data-sonner-toast][data-type='error']\\n\\t\\t[data-close-button]) {\\n\\t\\tbackground: var(--error-bg);\\n\\t\\tborder-color: var(--error-border);\\n\\t\\tcolor: var(--error-text);\\n\\t}\\n\\n\\t:global(.sonner-loading-wrapper) {\\n\\t\\t--size: 16px;\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tposition: absolute;\\n\\t\\tinset: 0;\\n\\t\\tz-index: 10;\\n\\t}\\n\\n\\t:global(.sonner-loading-wrapper[data-visible='false']) {\\n\\t\\ttransform-origin: center;\\n\\t\\tanimation: sonner-fade-out 0.2s ease forwards;\\n\\t}\\n\\n\\t:global(.sonner-spinner) {\\n\\t\\tposition: relative;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar) {\\n\\t\\tanimation: sonner-spin 1.2s linear infinite;\\n\\t\\tbackground: var(--gray11);\\n\\t\\tborder-radius: 6px;\\n\\t\\theight: 8%;\\n\\t\\tleft: -10%;\\n\\t\\tposition: absolute;\\n\\t\\ttop: -3.9%;\\n\\t\\twidth: 24%;\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(1)) {\\n\\t\\tanimation-delay: -1.2s;\\n\\t\\ttransform: rotate(0.0001deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(2)) {\\n\\t\\tanimation-delay: -1.1s;\\n\\t\\ttransform: rotate(30deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(3)) {\\n\\t\\tanimation-delay: -1s;\\n\\t\\ttransform: rotate(60deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(4)) {\\n\\t\\tanimation-delay: -0.9s;\\n\\t\\ttransform: rotate(90deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(5)) {\\n\\t\\tanimation-delay: -0.8s;\\n\\t\\ttransform: rotate(120deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(6)) {\\n\\t\\tanimation-delay: -0.7s;\\n\\t\\ttransform: rotate(150deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(7)) {\\n\\t\\tanimation-delay: -0.6s;\\n\\t\\ttransform: rotate(180deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(8)) {\\n\\t\\tanimation-delay: -0.5s;\\n\\t\\ttransform: rotate(210deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(9)) {\\n\\t\\tanimation-delay: -0.4s;\\n\\t\\ttransform: rotate(240deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(10)) {\\n\\t\\tanimation-delay: -0.3s;\\n\\t\\ttransform: rotate(270deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(11)) {\\n\\t\\tanimation-delay: -0.2s;\\n\\t\\ttransform: rotate(300deg) translate(146%);\\n\\t}\\n\\n\\t:global(.sonner-loading-bar:nth-child(12)) {\\n\\t\\tanimation-delay: -0.1s;\\n\\t\\ttransform: rotate(330deg) translate(146%);\\n\\t}\\n\\n\\t@keyframes -global-sonner-fade-in {\\n\\t\\t0% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\ttransform: scale(0.8);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes -global-sonner-fade-out {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0;\\n\\t\\t\\ttransform: scale(0.8);\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes -global-sonner-spin {\\n\\t\\t0% {\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\topacity: 0.15;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (prefers-reduced-motion) {\\n\\t\\t:global([data-sonner-toast]),\\n\\t\\t:global([data-sonner-toast]) > :global(*),\\n\\t\\t:global(.sonner-loading-bar) {\\n\\t\\t\\ttransition: none !important;\\n\\t\\t\\tanimation: none !important;\\n\\t\\t}\\n\\t}\\n\\n\\t:global(.sonner-loader) {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t\\ttransform-origin: center;\\n\\t\\ttransition:\\n\\t\\t\\topacity 200ms,\\n\\t\\t\\ttransform 200ms;\\n\\t}\\n\\n\\t:global(.sonner-loader[data-visible='false']) {\\n\\t\\topacity: 0;\\n\\t\\ttransform: scale(0.8) translate(-50%, -50%);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4OS,uBAAwB,CACxB,wCAA0C,CACjD,yBAAyB,CAAE,IAAI,CAC/B,uBAAuB,CAAE,GAAG,CAC5B,wBAAwB,CAAE,IAAI,CAC9B,sBAAsB,CAAE,GAAG,CAC3B,2BAA2B,CAAE,IAAI,CACjC,yBAAyB,CAAE,CAAC,CAC5B,0BAA0B,CAAE,CAAC,CAC7B,wBAAwB,CAAE,KAAK,CAC/B,8BAA8B,CAAE,qBACjC,CAEQ,uBAAwB,CACxB,wCAA0C,CACjD,yBAAyB,CAAE,GAAG,CAC9B,uBAAuB,CAAE,IAAI,CAC7B,wBAAwB,CAAE,GAAG,CAC7B,sBAAsB,CAAE,IAAI,CAC5B,2BAA2B,CAAE,CAAC,CAC9B,yBAAyB,CAAE,IAAI,CAC/B,0BAA0B,CAAE,KAAK,CACjC,wBAAwB,CAAE,CAAC,CAC3B,8BAA8B,CAAE,oBACjC,CAEQ,6BAA+B,CACtC,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,WAAW,CACV,aAAa,CAAC;AACjB,GAAG,SAAS,CAAC;AACb,GAAG,aAAa,CAAC;AACjB,GAAG,kBAAkB,CAAC;AACtB,GAAG,KAAK,CAAC,EAAE,CAAC;AACZ,GAAG,MAAM,CAAC;AACV,GAAG,SAAS,CAAC,IAAI,CAAC;AAClB,GAAG,KAAK,CAAC;AACT,GAAG,IAAI,CAAC,IAAI,CAAC;AACb,GAAG,UAAU,CAAC;AACd,GAAG,KAAK,CAAC,KAAK,CAAC,KAAK,CAAC;AACrB,GAAG,KAAK,CAAC,EAAE,CAAC,KAAK,CAAC;AAClB,GAAG,KAAK,CAAC,EAAE,CAAC,MAAM,CAAC;AACnB,GAAG,IAAI,CAAC,KAAK,CAAC,KAAK,CACjB,OAAO,CAAE,eAAe,CACxB,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,eAAe,CACxB,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,iBAAiB,CAC1B,OAAO,CAAE,eAAe,CACxB,OAAO,CAAE,iBAAiB,CAC1B,QAAQ,CAAE,iBAAiB,CAC3B,QAAQ,CAAE,iBAAiB,CAC3B,QAAQ,CAAE,cAAc,CACxB,eAAe,CAAE,GAAG,CACpB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,SACV,CAEQ,sDAAwD,CAC/D,KAAK,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,qBAAqB,CAAC,CACrD,CAEQ,qDAAuD,CAC9D,IAAI,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,oBAAoB,CAAC,CACnD,CAEQ,uDAAyD,CAChE,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAC3B,CAEQ,oDAAsD,CAC7D,GAAG,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CACjD,CAEQ,uDAAyD,CAChE,MAAM,CAAE,IAAI,IAAI,QAAQ,CAAC,CAAC,CAAC,IAAI,sBAAsB,CAAC,CACvD,CAEQ,2BAA6B,CACpC,GAAG,CAAE,gBAAgB,CACrB,aAAa,CAAE,8BAA8B,CAC7C,OAAO,CAAE,IAAI,SAAS,CAAC,CACvB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,IAAI,GAAG,CAAC,CACnB,MAAM,CAAE,KAAK,CAAC,CAAC,CAEf,YAAY,CAAE,IAAI,CAClB,UAAU,CACT,SAAS,CAAC,KAAK,CAAC;AACnB,GAAG,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,MAAM,CAAC,KAAK,CAAC;AAChB,GAAG,UAAU,CAAC,KAAK,CACjB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,QAChB,CAEQ,+CAAiD,CACxD,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,eAAe,CAAC,CACtC,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,aAAa,CAAE,IAAI,eAAe,CAAC,CACnC,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3C,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,GACN,CAEQ,yCAA2C,CAClD,UAAU,CACT,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AACnC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC7B,CAEQ,kDAAoD,CAC3D,GAAG,CAAE,CAAC,CACN,GAAG,CAAE,iBAAiB,CACtB,MAAM,CAAE,CAAC,CACT,aAAa,CAAE,oBAChB,CAEQ,qDAAuD,CAC9D,MAAM,CAAE,CAAC,CACT,GAAG,CAAE,gBAAgB,CACrB,MAAM,CAAE,EAAE,CACV,aAAa,CAAE,8BAChB,CAEQ,2BAA4B,CAAS,0BAA4B,CACxE,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEQ,2BAA4B,CAAS,oBAAsB,CAClE,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OACR,CAEQ,2BAA4B,CAAS,mBAAqB,CACjE,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,CAAC,CACd,WAAW,CAAE,IAAI,yBAAyB,CAAC,CAC3C,YAAY,CAAE,IAAI,uBAAuB,CAC1C,CAEQ,gDAAiD,CAAS,mBAAoB,CAAW,GAAK,CACrG,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,gBAAgB,CAAE,MAAM,CACxB,SAAS,CAAE,cAAc,CAAC,KAAK,CAAC,IAAI,CAAC,QACtC,CAEQ,2BAA4B,CAAS,mBAAoB,CAAW,CAAG,CAC9E,WAAW,CAAE,CACd,CAEQ,2BAA4B,CAAS,mBAAoB,CAAS,GAAK,CAC9E,WAAW,CAAE,IAAI,wBAAwB,CAAC,CAC1C,YAAY,CAAE,IAAI,sBAAsB,CACzC,CAEQ,2BAA4B,CAAS,sBAAwB,CACpE,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,GACN,CAEQ,uCAAwC,CAAS,aAAe,CACvE,aAAa,CAAE,GAAG,CAClB,YAAY,CAAE,GAAG,CACjB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,UAAU,CAAE,IAAI,aAAa,CAAC,CAC9B,WAAW,CAAE,IAAI,2BAA2B,CAAC,CAC7C,YAAY,CAAE,IAAI,yBAAyB,CAAC,CAC5C,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,CAAC,CACd,UAAU,CACT,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,UAAU,CAAC,KACb,CAEQ,2BAA4B,CAAS,mCAAqC,CACjF,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACxC,CAEQ,2BAA4B,CAAS,mCAAqC,CACjF,WAAW,CAAE,IAAI,2BAA2B,CAAC,CAC7C,YAAY,CAAE,IAAI,yBAAyB,CAC5C,CAEQ,2BAA4B,CAAS,qBAAuB,CACnE,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC/B,CAEQ,8CAA+C,CAAS,qBAAuB,CACtF,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACpC,CAEQ,2BAA4B,CAAS,2BAA6B,CACzE,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,0BAA0B,CAAC,CACrC,KAAK,CAAE,IAAI,wBAAwB,CAAC,CACpC,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CAC9B,SAAS,CAAE,IAAI,8BAA8B,CAAC,CAC9C,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,UAAU,CACT,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,UAAU,CAAC,KAAK,CAAC;AACpB,GAAG,YAAY,CAAC,KACf,CAEQ,2BAA4B,CAAS,yCAA2C,CACvF,UAAU,CACT,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AACnC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC7B,CAEQ,2BAA4B,CAAS,8BAAgC,CAC5E,MAAM,CAAE,WACT,CAEQ,iCAAkC,CAAS,iCAAmC,CACrF,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,YAAY,CAAE,IAAI,OAAO,CAC1B,CAGQ,wDAA0D,CACjE,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EACV,CAEQ;AACT;AACA,WAAa,CAEX,MAAM,CAAE,GAAG,CACX,SAAS,CAAE,OAAO,CAAC,CAAC,CAAC,WAAW,GAAG,CACpC,CAEQ;AACT;AACA,WAAa,CAEX,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,OAAO,CAAC,CAAC,CAAC,WAAW,IAAI,CACrC,CAGQ;AACT;AACA,WAAa,CACX,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,SAAS,CAAE,OAAO,CAAC,CACpB,CAGQ,kCAAoC,CAC3C,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,KAAK,IAAI,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IACR,CAEQ,gDAAkD,CACzD,GAAG,CAAE,aAAa,CAClB,OAAO,CAAE,CACV,CAEQ,sEAAwE,CAC/E,OAAO,CAAE,+BAA+B,CACxC,GAAG,CAAE;AACP,iCAAiC,CAC/B,MAAM,CAAE,IAAI,oBAAoB,CACjC,CAEQ,2BAA4B,CAAW,CAAG,CACjD,UAAU,CAAE,OAAO,CAAC,KACrB,CAEQ;AACT;AACA;AACA,EAAG,CAAU,CAAG,CACd,OAAO,CAAE,CACV,CAEQ,iDAAmD,CAC1D,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IACjB,CAEQ,sEAAwE,CAC/E,GAAG,CAAE,6CAA6C,CAClD,MAAM,CAAE,IAAI,gBAAgB,CAC7B,CAEQ;AACT;AACA,GAAK,CACH,GAAG,CAAE,qCAAqC,CAC1C,OAAO,CAAE,CACV,CAEQ;AACT;AACA,GAAK,CACH,GAAG,CAAE;AACP;AACA,GAAG,CACD,OAAO,CAAE,CACV,CAEQ;AACT;AACA,GAAK,CACH,GAAG,CAAE,eAAe,CACpB,OAAO,CAAE,CAAC,CACV,UAAU,CACT,SAAS,CAAC,KAAK,CAAC;AACnB,GAAG,OAAO,CAAC,KACV,CAGQ;AACT;AACA,WAAa,CACX,MAAM,CAAE,KAAK,IAAI,gBAAgB,CAAC,CAAC,CAAC,CAAC,GAAG,CACzC,CAEQ,wCAA0C,CACjD,SAAS,CAAE,IAAI,GAAG,CAAC,CAAC,WAAW,IAAI,cAAc,CAAC,IAAI,CAAC,CAAC,CACxD,UAAU,CAAE,IACb,CAEQ,oEAAqE,CACrE,iEAAmE,CAC1E,SAAS,CAAE,SAAS,CAAC,KAAK,CAAC,QAAQ,CAAC,QACrC,CAEA,WAAmB,SAAU,CAC5B,IAAK,CACJ,SAAS,CAAE;AACd,IAAI,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC;AAC3D,IAAI,CACD,OAAO,CAAE,CACV,CAEA,EAAG,CACF,SAAS,CAAE;AACd,IAAI;AACJ,KAAK,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC;AACxD,MAAM,IAAI,MAAM,CAAC,CAAC,CAAC,CAAC,KAAK;AACzB,KAAK;AACL,IAAI,CACD,OAAO,CAAE,CACV,CACD,CAEA,MAAO,YAAY,KAAK,CAAE,CACjB,qBAAuB,CAC9B,QAAQ,CAAE,KAAK,CACf,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,IAAI,CAAE,IAAI,eAAe,CAAC,CAC1B,KAAK,CAAE,IACR,CAEQ,qBAAsB,CAAS,mBAAqB,CAC3D,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,CAC5C,CAEQ,6CAA+C,CACtD,IAAI,CAAE,IAAI,eAAe,CAC1B,CAEQ,+CAAiD,CACxD,MAAM,CAAE,IACT,CAEQ,4CAA8C,CACrD,GAAG,CAAE,IACN,CAEQ,+CAAiD,CACxD,IAAI,CAAE,IAAI,eAAe,CAAC,CAC1B,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,SAAS,CAAE,IACZ,CACD,CAEQ,yCAA2C,CAClD,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,YAAY,CAC7B,aAAa,CAAE,aAAa,CAE5B,YAAY,CAAE,kBAAkB,CAChC,gBAAgB,CAAE,kBAAkB,CACpC,cAAc,CAAE,mBAAmB,CAEnC,SAAS,CAAE,mBAAmB,CAC9B,aAAa,CAAE,kBAAkB,CACjC,WAAW,CAAE,kBAAkB,CAE/B,YAAY,CAAE,kBAAkB,CAChC,gBAAgB,CAAE,iBAAiB,CACnC,cAAc,CAAE,iBAAiB,CAEjC,UAAU,CAAE,mBAAmB,CAC/B,cAAc,CAAE,mBAAmB,CACnC,YAAY,CAAE,mBACf,CAEQ;AACT,yCAA2C,CACzC,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,eAAe,CAChC,aAAa,CAAE,YAChB,CAEQ;AACT,yCAA2C,CACzC,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,YAAY,CAC7B,aAAa,CAAE,aAChB,CAEQ,wCAA0C,CACjD,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,eAAe,CAChC,aAAa,CAAE,YAAY,CAE3B,YAAY,CAAE,kBAAkB,CAChC,gBAAgB,CAAE,mBAAmB,CACrC,cAAc,CAAE,kBAAkB,CAElC,SAAS,CAAE,kBAAkB,CAC7B,aAAa,CAAE,mBAAmB,CAClC,WAAW,CAAE,kBAAkB,CAE/B,YAAY,CAAE,iBAAiB,CAC/B,gBAAgB,CAAE,kBAAkB,CACpC,cAAc,CAAE,iBAAiB,CAEjC,UAAU,CAAE,kBAAkB,CAC9B,cAAc,CAAE,kBAAkB,CAClC,YAAY,CAAE,mBACf,CAEQ,yBAA0B,CAAS,wCAA0C,CACpF,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,YAAY,CAAE,IAAI,eAAe,CAAC,CAClC,KAAK,CAAE,IAAI,aAAa,CACzB,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ,yBAA0B,CAAS,qCAAuC,CACjF,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,KAAK,CAAE,IAAI,WAAW,CACvB,CAEQ,yBAA0B,CAAS,wCAA0C,CACpF,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,YAAY,CAAE,IAAI,gBAAgB,CAAC,CACnC,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEQ,yBAA0B,CAAS,sCAAwC,CAClF,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,KAAK,CAAE,IAAI,YAAY,CACxB,CAEQ;AACT;AACA,qBAAuB,CACrB,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,KAAK,CAAE,IAAI,YAAY,CACxB,CAEQ,uBAAyB,CAChC,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,EACV,CAEQ,6CAA+C,CACtD,gBAAgB,CAAE,MAAM,CACxB,SAAS,CAAE,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,QACtC,CAEQ,eAAiB,CACxB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAClB,CAEQ,mBAAqB,CAC5B,SAAS,CAAE,WAAW,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,CAC3C,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,EAAE,CACV,IAAI,CAAE,IAAI,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,GACR,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,SAAS,CAAC,CAAC,UAAU,IAAI,CAC5C,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CACxC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,GAAG,CACpB,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CACxC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CACxC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,gCAAkC,CACzC,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,iCAAmC,CAC1C,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,iCAAmC,CAC1C,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEQ,iCAAmC,CAC1C,eAAe,CAAE,KAAK,CACtB,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CACzC,CAEA,WAAmB,cAAe,CACjC,EAAG,CACF,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CACrB,CACA,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CAAC,CACnB,CACD,CAEA,WAAmB,eAAgB,CAClC,EAAG,CACF,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CAAC,CACnB,CACA,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CACrB,CACD,CAEA,WAAmB,WAAY,CAC9B,EAAG,CACF,OAAO,CAAE,CACV,CACA,IAAK,CACJ,OAAO,CAAE,IACV,CACD,CAEA,MAAO,wBAAyB,CACvB,mBAAoB,CACpB,mBAAoB,CAAW,CAAE,CACjC,mBAAqB,CAC5B,UAAU,CAAE,IAAI,CAAC,UAAU,CAC3B,SAAS,CAAE,IAAI,CAAC,UACjB,CACD,CAEQ,cAAgB,CACvB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,gBAAgB,CAAE,MAAM,CACxB,UAAU,CACT,OAAO,CAAC,KAAK,CAAC;AACjB,GAAG,SAAS,CAAC,KACZ,CAEQ,oCAAsC,CAC7C,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,IAAI,CAC3C"}`
    };
    VISIBLE_TOASTS_AMOUNT = 3;
    VIEWPORT_OFFSET = "32px";
    TOAST_WIDTH = 356;
    GAP = 14;
    DARK = "dark";
    LIGHT = "light";
    Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let possiblePositions;
      let hotkeyLabel;
      let $$restProps = compute_rest_props($$props, [
        "invert",
        "theme",
        "position",
        "hotkey",
        "richColors",
        "expand",
        "duration",
        "visibleToasts",
        "closeButton",
        "toastOptions",
        "offset",
        "dir"
      ]);
      let $toasts, $$unsubscribe_toasts;
      let $heights, $$unsubscribe_heights;
      let { invert = false } = $$props;
      let { theme: theme2 = "light" } = $$props;
      let { position = "bottom-right" } = $$props;
      let { hotkey = ["altKey", "KeyT"] } = $$props;
      let { richColors = false } = $$props;
      let { expand = false } = $$props;
      let { duration = 4e3 } = $$props;
      let { visibleToasts = VISIBLE_TOASTS_AMOUNT } = $$props;
      let { closeButton = false } = $$props;
      let { toastOptions = {} } = $$props;
      let { offset = null } = $$props;
      let { dir = getDocumentDirection() } = $$props;
      const { toasts, heights, reset: reset2 } = toastState;
      $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
      $$unsubscribe_heights = subscribe(heights, (value) => $heights = value);
      let expanded = false;
      let interacting = false;
      let actualTheme = getInitialTheme(theme2);
      let listRef;
      onDestroy(() => {
      });
      if ($$props.invert === void 0 && $$bindings.invert && invert !== void 0) $$bindings.invert(invert);
      if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0) $$bindings.theme(theme2);
      if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
      if ($$props.hotkey === void 0 && $$bindings.hotkey && hotkey !== void 0) $$bindings.hotkey(hotkey);
      if ($$props.richColors === void 0 && $$bindings.richColors && richColors !== void 0) $$bindings.richColors(richColors);
      if ($$props.expand === void 0 && $$bindings.expand && expand !== void 0) $$bindings.expand(expand);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
      if ($$props.visibleToasts === void 0 && $$bindings.visibleToasts && visibleToasts !== void 0) $$bindings.visibleToasts(visibleToasts);
      if ($$props.closeButton === void 0 && $$bindings.closeButton && closeButton !== void 0) $$bindings.closeButton(closeButton);
      if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0) $$bindings.toastOptions(toastOptions);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
      if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
      $$result.css.add(css);
      possiblePositions = Array.from(new Set([
        position,
        ...$toasts.filter((toast2) => toast2.position).map((toast2) => toast2.position)
      ].filter(Boolean)));
      hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
      {
        if ($toasts.length <= 1) {
          expanded = false;
        }
      }
      {
        {
          const toastsToDismiss = $toasts.filter((toast2) => toast2.dismiss && !toast2.delete);
          if (toastsToDismiss.length > 0) {
            const updatedToasts = $toasts.map((toast2) => {
              const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast2.id);
              if (matchingToast) {
                return { ...toast2, delete: true };
              }
              return toast2;
            });
            toasts.set(updatedToasts);
          }
        }
      }
      {
        {
          if (theme2 !== "system") {
            actualTheme = theme2;
          }
          if (typeof window !== "undefined") {
            if (theme2 === "system") {
              if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                actualTheme = DARK;
              } else {
                actualTheme = LIGHT;
              }
            }
            const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
            const changeHandler = ({ matches }) => {
              actualTheme = matches ? DARK : LIGHT;
            };
            if ("addEventListener" in mediaQueryList) {
              mediaQueryList.addEventListener("change", changeHandler);
            } else {
              mediaQueryList.addListener(changeHandler);
            }
          }
        }
      }
      $$unsubscribe_toasts();
      $$unsubscribe_heights();
      return `${$toasts.length > 0 ? `<section${add_attribute("aria-label", `Notifications ${hotkeyLabel}`, 0)}${add_attribute("tabindex", -1, 0)}>${each(possiblePositions, (position2, index8) => {
        return `<ol${spread(
          [
            { tabindex: escape_attribute_value(-1) },
            {
              class: escape_attribute_value($$props.class)
            },
            { "data-sonner-toaster": true },
            {
              "data-theme": escape_attribute_value(actualTheme)
            },
            {
              "data-rich-colors": escape_attribute_value(richColors)
            },
            {
              dir: escape_attribute_value(dir === "auto" ? getDocumentDirection() : dir)
            },
            {
              "data-y-position": escape_attribute_value(position2.split("-")[0])
            },
            {
              "data-x-position": escape_attribute_value(position2.split("-")[1])
            },
            {
              style: escape_attribute_value($$props.style)
            },
            escape_object($$restProps)
          ],
          {
            styles: {
              "--front-toast-height": `${$heights[0]?.height}px`,
              "--offset": typeof offset === "number" ? `${offset}px` : offset || VIEWPORT_OFFSET,
              "--width": `${TOAST_WIDTH}px`,
              "--gap": `${GAP}px`
            }
          }
        )}${add_attribute("this", listRef, 0)}>${each($toasts.filter((toast2) => !toast2.position && index8 === 0 || toast2.position === position2), (toast2, index22) => {
          return `${validate_component(Toast, "Toast").$$render(
            $$result,
            {
              index: index22,
              toast: toast2,
              invert,
              visibleToasts,
              closeButton,
              interacting,
              position: position2,
              expandByDefault: expand,
              expanded,
              actionButtonStyle: toastOptions?.actionButtonStyle || "",
              cancelButtonStyle: toastOptions?.cancelButtonStyle || "",
              class: toastOptions?.class || "",
              descriptionClass: toastOptions?.descriptionClass || "",
              classes: toastOptions.classes || {},
              duration: toastOptions?.duration ?? duration,
              unstyled: toastOptions.unstyled || false
            },
            {},
            {
              "info-icon": () => {
                return `${slots["info-icon"] ? slots["info-icon"]({ slot: "info-icon" }) : ` ${validate_component(Icon2, "Icon").$$render($$result, { type: "info" }, {}, {})} `}`;
              },
              "warning-icon": () => {
                return `${slots["warning-icon"] ? slots["warning-icon"]({ slot: "warning-icon" }) : ` ${validate_component(Icon2, "Icon").$$render($$result, { type: "warning" }, {}, {})} `}`;
              },
              "error-icon": () => {
                return `${slots["error-icon"] ? slots["error-icon"]({ slot: "error-icon" }) : ` ${validate_component(Icon2, "Icon").$$render($$result, { type: "error" }, {}, {})} `}`;
              },
              "success-icon": () => {
                return `${slots["success-icon"] ? slots["success-icon"]({ slot: "success-icon" }) : ` ${validate_component(Icon2, "Icon").$$render($$result, { type: "success" }, {}, {})} `}`;
              },
              "loading-icon": () => {
                return `${slots["loading-icon"] ? slots["loading-icon"]({ slot: "loading-icon" }) : ` ${validate_component(Loader, "Loader").$$render($$result, { visible: toast2.type === "loading" }, {}, {})} `}`;
              }
            }
          )}`;
        })} </ol>`;
      })}</section>` : ``}`;
    });
    Layout3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Toaster, "Toaster").$$render($$result, { theme: "dark" }, {}, {})} ${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ??= (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default;
    imports4 = ["_app/immutable/nodes/3.C9frN411.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/spread.DCI-Q8-Y.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.BrPaV8wb.js", "_app/immutable/chunks/index.7X9LQzY4.js"];
    stylesheets4 = ["_app/immutable/assets/Toaster.436keKGd.css"];
    fonts4 = [];
  }
});

// node_modules/tslib/tslib.es6.mjs
function __rest(s2, e) {
  var t = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
    t[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t[p2[i2]] = s2[p2[i2]];
    }
  return t;
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i2 = m.call(o), r2, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
    if (ar || !(i2 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
      ar[i2] = from[i2];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
  }
});

// node_modules/framesync/dist/es/on-next-frame.mjs
var defaultTimestep, getCurrentTime, onNextFrame;
var init_on_next_frame = __esm({
  "node_modules/framesync/dist/es/on-next-frame.mjs"() {
    defaultTimestep = 1 / 60 * 1e3;
    getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
    onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
  }
});

// node_modules/framesync/dist/es/create-render-step.mjs
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index8 = toRunNextFrame.indexOf(callback);
      if (index8 !== -1)
        toRunNextFrame.splice(index8, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i2 = 0; i2 < numToRun; i2++) {
          const callback = toRun[i2];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
var init_create_render_step = __esm({
  "node_modules/framesync/dist/es/create-render-step.mjs"() {
  }
});

// node_modules/framesync/dist/es/index.mjs
var maxElapsed, useDefaultElapsed, runNextFrame, isProcessing, frame, stepsOrder, steps, sync, cancelSync, flushSync, processStep, processFrame, startLoop, getFrameData, es_default;
var init_es = __esm({
  "node_modules/framesync/dist/es/index.mjs"() {
    init_on_next_frame();
    init_create_render_step();
    maxElapsed = 40;
    useDefaultElapsed = true;
    runNextFrame = false;
    isProcessing = false;
    frame = {
      delta: 0,
      timestamp: 0
    };
    stepsOrder = [
      "read",
      "update",
      "preRender",
      "render",
      "postRender"
    ];
    steps = stepsOrder.reduce((acc, key2) => {
      acc[key2] = createRenderStep(() => runNextFrame = true);
      return acc;
    }, {});
    sync = stepsOrder.reduce((acc, key2) => {
      const step = steps[key2];
      acc[key2] = (process2, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
          startLoop();
        return step.schedule(process2, keepAlive, immediate);
      };
      return acc;
    }, {});
    cancelSync = stepsOrder.reduce((acc, key2) => {
      acc[key2] = steps[key2].cancel;
      return acc;
    }, {});
    flushSync = stepsOrder.reduce((acc, key2) => {
      acc[key2] = () => steps[key2].process(frame);
      return acc;
    }, {});
    processStep = (stepId) => steps[stepId].process(frame);
    processFrame = (timestamp) => {
      runNextFrame = false;
      frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
      frame.timestamp = timestamp;
      isProcessing = true;
      stepsOrder.forEach(processStep);
      isProcessing = false;
      if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
      }
    };
    startLoop = () => {
      runNextFrame = true;
      useDefaultElapsed = true;
      if (!isProcessing)
        onNextFrame(processFrame);
    };
    getFrameData = () => frame;
    es_default = sync;
  }
});

// node_modules/popmotion/node_modules/tslib/tslib.es6.js
function __rest2(s2, e) {
  var t = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
    t[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t[p2[i2]] = s2[p2[i2]];
    }
  return t;
}
var init_tslib_es62 = __esm({
  "node_modules/popmotion/node_modules/tslib/tslib.es6.js"() {
  }
});

// node_modules/hey-listen/dist/hey-listen.es.js
var warning, invariant;
var init_hey_listen_es = __esm({
  "node_modules/hey-listen/dist/hey-listen.es.js"() {
    warning = function() {
    };
    invariant = function() {
    };
    if (false) {
      warning = function(check, message) {
        if (!check && typeof console !== "undefined") {
          console.warn(message);
        }
      };
      invariant = function(check, message) {
        if (!check) {
          throw new Error(message);
        }
      };
    }
  }
});

// node_modules/popmotion/dist/es/utils/clamp.mjs
var clamp;
var init_clamp = __esm({
  "node_modules/popmotion/dist/es/utils/clamp.mjs"() {
    clamp = (min, max, v2) => Math.min(Math.max(v2, min), max);
  }
});

// node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta2 = exponentialDecay * duration;
      const a3 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta2);
      return safeMin - a3 / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta2 = exponentialDecay * duration;
      const d = delta2 * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta2);
      const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g2;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a3 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a3 * b2;
    };
    derivative = (undampedFreq2) => {
      const a3 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a3 * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i2 = 1; i2 < rootIterations; i2++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var safeMin, minDuration, maxDuration, minDamping, maxDamping, rootIterations;
var init_find_spring = __esm({
  "node_modules/popmotion/dist/es/animations/utils/find-spring.mjs"() {
    init_hey_listen_es();
    init_clamp();
    safeMin = 1e-3;
    minDuration = 0.01;
    maxDuration = 10;
    minDamping = 0.05;
    maxDamping = 1;
    rootIterations = 12;
  }
});

// node_modules/popmotion/dist/es/animations/generators/spring.mjs
function isSpringType(options2, keys) {
  return keys.some((key2) => options2[key2] !== void 0);
}
function getSpringOptions(options2) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options2);
  if (!isSpringType(options2, physicsKeys) && isSpringType(options2, durationKeys)) {
    const derived2 = findSpring(options2);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived2), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options2 = __rest2(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options2);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    if (restDelta === void 0) {
      restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
    }
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      };
      resolveVelocity = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
var durationKeys, physicsKeys, zero;
var init_spring = __esm({
  "node_modules/popmotion/dist/es/animations/generators/spring.mjs"() {
    init_tslib_es62();
    init_find_spring();
    durationKeys = ["duration", "bounce"];
    physicsKeys = ["stiffness", "damping", "mass"];
    spring.needsInterpolation = (a3, b2) => typeof a3 === "string" || typeof b2 === "string";
    zero = (_t) => 0;
  }
});

// node_modules/popmotion/dist/es/utils/progress.mjs
var progress;
var init_progress = __esm({
  "node_modules/popmotion/dist/es/utils/progress.mjs"() {
    progress = (from, to, value) => {
      const toFromDifference = to - from;
      return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    };
  }
});

// node_modules/popmotion/dist/es/utils/mix.mjs
var mix;
var init_mix = __esm({
  "node_modules/popmotion/dist/es/utils/mix.mjs"() {
    mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;
  }
});

// node_modules/style-value-types/dist/es/utils.mjs
function isString(v2) {
  return typeof v2 === "string";
}
var clamp2, sanitize, floatRegex, colorRegex, singleColorRegex;
var init_utils2 = __esm({
  "node_modules/style-value-types/dist/es/utils.mjs"() {
    clamp2 = (min, max) => (v2) => Math.max(Math.min(v2, max), min);
    sanitize = (v2) => v2 % 1 ? Number(v2.toFixed(5)) : v2;
    floatRegex = /(-)?([\d]*\.?[\d])+/g;
    colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
    singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
  }
});

// node_modules/style-value-types/dist/es/numbers/index.mjs
var number, alpha, scale;
var init_numbers = __esm({
  "node_modules/style-value-types/dist/es/numbers/index.mjs"() {
    init_utils2();
    number = {
      test: (v2) => typeof v2 === "number",
      parse: parseFloat,
      transform: (v2) => v2
    };
    alpha = Object.assign(Object.assign({}, number), { transform: clamp2(0, 1) });
    scale = Object.assign(Object.assign({}, number), { default: 1 });
  }
});

// node_modules/style-value-types/dist/es/numbers/units.mjs
var createUnitType, degrees, percent, px, vh, vw, progressPercentage;
var init_units = __esm({
  "node_modules/style-value-types/dist/es/numbers/units.mjs"() {
    init_utils2();
    createUnitType = (unit) => ({
      test: (v2) => isString(v2) && v2.endsWith(unit) && v2.split(" ").length === 1,
      parse: parseFloat,
      transform: (v2) => `${v2}${unit}`
    });
    degrees = createUnitType("deg");
    percent = createUnitType("%");
    px = createUnitType("px");
    vh = createUnitType("vh");
    vw = createUnitType("vw");
    progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v2) => percent.parse(v2) / 100, transform: (v2) => percent.transform(v2 * 100) });
  }
});

// node_modules/style-value-types/dist/es/color/utils.mjs
var isColorString, splitColor;
var init_utils3 = __esm({
  "node_modules/style-value-types/dist/es/color/utils.mjs"() {
    init_utils2();
    isColorString = (type, testProp) => (v2) => {
      return Boolean(isString(v2) && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v2, testProp));
    };
    splitColor = (aName, bName, cName) => (v2) => {
      if (!isString(v2))
        return v2;
      const [a3, b2, c2, alpha2] = v2.match(floatRegex);
      return {
        [aName]: parseFloat(a3),
        [bName]: parseFloat(b2),
        [cName]: parseFloat(c2),
        alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
      };
    };
  }
});

// node_modules/style-value-types/dist/es/color/hsla.mjs
var hsla;
var init_hsla = __esm({
  "node_modules/style-value-types/dist/es/color/hsla.mjs"() {
    init_numbers();
    init_units();
    init_utils2();
    init_utils3();
    hsla = {
      test: isColorString("hsl", "hue"),
      parse: splitColor("hue", "saturation", "lightness"),
      transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
      }
    };
  }
});

// node_modules/style-value-types/dist/es/color/rgba.mjs
var clampRgbUnit, rgbUnit, rgba;
var init_rgba = __esm({
  "node_modules/style-value-types/dist/es/color/rgba.mjs"() {
    init_numbers();
    init_utils2();
    init_utils3();
    clampRgbUnit = clamp2(0, 255);
    rgbUnit = Object.assign(Object.assign({}, number), { transform: (v2) => Math.round(clampRgbUnit(v2)) });
    rgba = {
      test: isColorString("rgb", "red"),
      parse: splitColor("red", "green", "blue"),
      transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
    };
  }
});

// node_modules/style-value-types/dist/es/color/hex.mjs
function parseHex(v2) {
  let r2 = "";
  let g2 = "";
  let b2 = "";
  let a3 = "";
  if (v2.length > 5) {
    r2 = v2.substr(1, 2);
    g2 = v2.substr(3, 2);
    b2 = v2.substr(5, 2);
    a3 = v2.substr(7, 2);
  } else {
    r2 = v2.substr(1, 1);
    g2 = v2.substr(2, 1);
    b2 = v2.substr(3, 1);
    a3 = v2.substr(4, 1);
    r2 += r2;
    g2 += g2;
    b2 += b2;
    a3 += a3;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g2, 16),
    blue: parseInt(b2, 16),
    alpha: a3 ? parseInt(a3, 16) / 255 : 1
  };
}
var hex;
var init_hex = __esm({
  "node_modules/style-value-types/dist/es/color/hex.mjs"() {
    init_rgba();
    init_utils3();
    hex = {
      test: isColorString("#"),
      parse: parseHex,
      transform: rgba.transform
    };
  }
});

// node_modules/style-value-types/dist/es/color/index.mjs
var color;
var init_color = __esm({
  "node_modules/style-value-types/dist/es/color/index.mjs"() {
    init_utils2();
    init_hex();
    init_hsla();
    init_rgba();
    color = {
      test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
      parse: (v2) => {
        if (rgba.test(v2)) {
          return rgba.parse(v2);
        } else if (hsla.test(v2)) {
          return hsla.parse(v2);
        } else {
          return hex.parse(v2);
        }
      },
      transform: (v2) => {
        return isString(v2) ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
      }
    };
  }
});

// node_modules/style-value-types/dist/es/complex/index.mjs
function test(v2) {
  var _a, _b, _c, _d;
  return isNaN(v2) && isString(v2) && ((_b = (_a = v2.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v2.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v2) {
  if (typeof v2 === "number")
    v2 = `${v2}`;
  const values = [];
  let numColors = 0;
  const colors = v2.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v2 = v2.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v2.match(floatRegex);
  if (numbers) {
    v2 = v2.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v2 };
}
function parse3(v2) {
  return analyse(v2).values;
}
function createTransformer(v2) {
  const { values, numColors, tokenised } = analyse(v2);
  const numValues = values.length;
  return (v3) => {
    let output = tokenised;
    for (let i2 = 0; i2 < numValues; i2++) {
      output = output.replace(i2 < numColors ? colorToken : numberToken, i2 < numColors ? color.transform(v3[i2]) : sanitize(v3[i2]));
    }
    return output;
  };
}
function getAnimatableNone(v2) {
  const parsed = parse3(v2);
  const transformer = createTransformer(v2);
  return transformer(parsed.map(convertNumbersToZero));
}
var colorToken, numberToken, convertNumbersToZero, complex;
var init_complex = __esm({
  "node_modules/style-value-types/dist/es/complex/index.mjs"() {
    init_color();
    init_numbers();
    init_utils2();
    colorToken = "${c}";
    numberToken = "${n}";
    convertNumbersToZero = (v2) => typeof v2 === "number" ? 0 : v2;
    complex = { test, parse: parse3, createTransformer, getAnimatableNone };
  }
});

// node_modules/style-value-types/dist/es/complex/filter.mjs
function applyDefaultFilter(v2) {
  let [name2, value] = v2.slice(0, -1).split("(");
  if (name2 === "drop-shadow")
    return v2;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v2;
  const unit = value.replace(number2, "");
  let defaultValue2 = maxDefaults.has(name2) ? 1 : 0;
  if (number2 !== value)
    defaultValue2 *= 100;
  return name2 + "(" + defaultValue2 + unit + ")";
}
var maxDefaults, functionRegex, filter;
var init_filter = __esm({
  "node_modules/style-value-types/dist/es/complex/filter.mjs"() {
    init_complex();
    init_utils2();
    maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
    functionRegex = /([a-z-]*)\(.*?\)/g;
    filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v2) => {
      const functions = v2.match(functionRegex);
      return functions ? functions.map(applyDefaultFilter).join(" ") : v2;
    } });
  }
});

// node_modules/style-value-types/dist/es/index.mjs
var init_es2 = __esm({
  "node_modules/style-value-types/dist/es/index.mjs"() {
    init_numbers();
    init_units();
    init_hsla();
    init_rgba();
    init_hex();
    init_color();
    init_complex();
    init_filter();
  }
});

// node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p2, q2, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p2 + (q2 - p2) * 6 * t;
  if (t < 1 / 2)
    return q2;
  if (t < 2 / 3)
    return p2 + (q2 - p2) * (2 / 3 - t) * 6;
  return p2;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q2 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p2 = 2 * lightness - q2;
    red = hueToRgb(p2, q2, hue + 1 / 3);
    green = hueToRgb(p2, q2, hue);
    blue = hueToRgb(p2, q2, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
var init_hsla_to_rgba = __esm({
  "node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs"() {
  }
});

// node_modules/popmotion/dist/es/utils/mix-color.mjs
var mixLinearColor, colorTypes, getColorType, notAnimatable, mixColor;
var init_mix_color = __esm({
  "node_modules/popmotion/dist/es/utils/mix-color.mjs"() {
    init_mix();
    init_es2();
    init_hey_listen_es();
    init_hsla_to_rgba();
    mixLinearColor = (from, to, v2) => {
      const fromExpo = from * from;
      const toExpo = to * to;
      return Math.sqrt(Math.max(0, v2 * (toExpo - fromExpo) + fromExpo));
    };
    colorTypes = [hex, rgba, hsla];
    getColorType = (v2) => colorTypes.find((type) => type.test(v2));
    notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
    mixColor = (from, to) => {
      let fromColorType = getColorType(from);
      let toColorType = getColorType(to);
      invariant(!!fromColorType, notAnimatable(from));
      invariant(!!toColorType, notAnimatable(to));
      let fromColor = fromColorType.parse(from);
      let toColor = toColorType.parse(to);
      if (fromColorType === hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = rgba;
      }
      if (toColorType === hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = rgba;
      }
      const blended = Object.assign({}, fromColor);
      return (v2) => {
        for (const key2 in blended) {
          if (key2 !== "alpha") {
            blended[key2] = mixLinearColor(fromColor[key2], toColor[key2], v2);
          }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v2);
        return fromColorType.transform(blended);
      };
    };
  }
});

// node_modules/popmotion/dist/es/utils/inc.mjs
var isNum;
var init_inc = __esm({
  "node_modules/popmotion/dist/es/utils/inc.mjs"() {
    isNum = (v2) => typeof v2 === "number";
  }
});

// node_modules/popmotion/dist/es/utils/pipe.mjs
var combineFunctions, pipe;
var init_pipe = __esm({
  "node_modules/popmotion/dist/es/utils/pipe.mjs"() {
    combineFunctions = (a3, b2) => (v2) => b2(a3(v2));
    pipe = (...transformers) => transformers.reduce(combineFunctions);
  }
});

// node_modules/popmotion/dist/es/utils/mix-complex.mjs
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v2) => mix(origin, target, v2);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
function analyse2(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i2 = 0; i2 < numValues; i2++) {
    if (numNumbers || typeof parsed[i2] === "number") {
      numNumbers++;
    } else {
      if (parsed[i2].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixArray, mixObject, mixComplex;
var init_mix_complex = __esm({
  "node_modules/popmotion/dist/es/utils/mix-complex.mjs"() {
    init_es2();
    init_mix();
    init_mix_color();
    init_inc();
    init_pipe();
    init_hey_listen_es();
    mixArray = (from, to) => {
      const output = [...from];
      const numValues = output.length;
      const blendValue = from.map((fromThis, i2) => getMixer(fromThis, to[i2]));
      return (v2) => {
        for (let i2 = 0; i2 < numValues; i2++) {
          output[i2] = blendValue[i2](v2);
        }
        return output;
      };
    };
    mixObject = (origin, target) => {
      const output = Object.assign(Object.assign({}, origin), target);
      const blendValue = {};
      for (const key2 in output) {
        if (origin[key2] !== void 0 && target[key2] !== void 0) {
          blendValue[key2] = getMixer(origin[key2], target[key2]);
        }
      }
      return (v2) => {
        for (const key2 in blendValue) {
          output[key2] = blendValue[key2](v2);
        }
        return output;
      };
    };
    mixComplex = (origin, target) => {
      const template = complex.createTransformer(target);
      const originStats = analyse2(origin);
      const targetStats = analyse2(target);
      const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
      if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
      } else {
        warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p2) => `${p2 > 0 ? target : origin}`;
      }
    };
  }
});

// node_modules/popmotion/dist/es/utils/interpolate.mjs
function detectMixerFactory(v2) {
  if (typeof v2 === "number") {
    return mixNumber;
  } else if (typeof v2 === "string") {
    if (color.test(v2)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v2)) {
    return mixArray;
  } else if (typeof v2 === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i2 = 0; i2 < numMixers; i2++) {
    let mixer = mixerFactory(output[i2], output[i2 + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i2] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v2) => mixer(progress(from, to, v2));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v2) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v2 <= input[0]) {
      foundMixerIndex = true;
    } else if (v2 >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i2 = 1;
      for (; i2 < inputLength; i2++) {
        if (input[i2] > v2 || i2 === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i2 - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v2);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
}
var mixNumber;
var init_interpolate = __esm({
  "node_modules/popmotion/dist/es/utils/interpolate.mjs"() {
    init_progress();
    init_mix();
    init_mix_color();
    init_mix_complex();
    init_es2();
    init_clamp();
    init_pipe();
    init_hey_listen_es();
    mixNumber = (from, to) => (p2) => mix(from, to, p2);
  }
});

// node_modules/popmotion/dist/es/easing/utils.mjs
var reverseEasing, mirrorEasing, createExpoIn, createBackIn, createAnticipate;
var init_utils4 = __esm({
  "node_modules/popmotion/dist/es/easing/utils.mjs"() {
    reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);
    mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;
    createExpoIn = (power) => (p2) => Math.pow(p2, power);
    createBackIn = (power) => (p2) => p2 * p2 * ((power + 1) * p2 - power);
    createAnticipate = (power) => {
      const backEasing = createBackIn(power);
      return (p2) => (p2 *= 2) < 1 ? 0.5 * backEasing(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));
    };
  }
});

// node_modules/popmotion/dist/es/easing/index.mjs
var DEFAULT_OVERSHOOT_STRENGTH, BOUNCE_FIRST_THRESHOLD, BOUNCE_SECOND_THRESHOLD, BOUNCE_THIRD_THRESHOLD, linear, easeIn, easeOut, easeInOut, circIn, circOut, circInOut, backIn, backOut, backInOut, anticipate, ca, cb, cc, bounceOut, bounceIn, bounceInOut;
var init_easing = __esm({
  "node_modules/popmotion/dist/es/easing/index.mjs"() {
    init_utils4();
    DEFAULT_OVERSHOOT_STRENGTH = 1.525;
    BOUNCE_FIRST_THRESHOLD = 4 / 11;
    BOUNCE_SECOND_THRESHOLD = 8 / 11;
    BOUNCE_THIRD_THRESHOLD = 9 / 10;
    linear = (p2) => p2;
    easeIn = createExpoIn(2);
    easeOut = reverseEasing(easeIn);
    easeInOut = mirrorEasing(easeIn);
    circIn = (p2) => 1 - Math.sin(Math.acos(p2));
    circOut = reverseEasing(circIn);
    circInOut = mirrorEasing(circOut);
    backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
    backOut = reverseEasing(backIn);
    backInOut = mirrorEasing(backIn);
    anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
    ca = 4356 / 361;
    cb = 35442 / 1805;
    cc = 16061 / 1805;
    bounceOut = (p2) => {
      if (p2 === 1 || p2 === 0)
        return p2;
      const p22 = p2 * p2;
      return p2 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p2 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p2 + 3.4 : p2 < BOUNCE_THIRD_THRESHOLD ? ca * p22 - cb * p2 + cc : 10.8 * p2 * p2 - 20.52 * p2 + 10.72;
    };
    bounceIn = reverseEasing(bounceOut);
    bounceInOut = (p2) => p2 < 0.5 ? 0.5 * (1 - bounceOut(1 - p2 * 2)) : 0.5 * bounceOut(p2 * 2 - 1) + 0.5;
  }
});

// node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i2) => i2 !== 0 ? i2 / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t) => {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}
var init_keyframes = __esm({
  "node_modules/popmotion/dist/es/animations/generators/keyframes.mjs"() {
    init_interpolate();
    init_easing();
  }
});

// node_modules/popmotion/dist/es/animations/generators/decay.mjs
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t) => {
      const delta2 = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta2 > restDelta || delta2 < -restDelta);
      state.value = state.done ? target : target + delta2;
      return state;
    },
    flipTarget: () => {
    }
  };
}
var init_decay = __esm({
  "node_modules/popmotion/dist/es/animations/generators/decay.mjs"() {
  }
});

// node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes;
}
var types;
var init_detect_animation_from_options = __esm({
  "node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs"() {
    init_spring();
    init_keyframes();
    init_decay();
    types = { keyframes, spring, decay };
  }
});

// node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
var init_elapsed = __esm({
  "node_modules/popmotion/dist/es/animations/utils/elapsed.mjs"() {
  }
});

// node_modules/popmotion/dist/es/animations/index.mjs
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options2 = __rest2(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options2;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options2.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options2);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options2), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update2(delta2) {
    if (!isForwardPlayback)
      delta2 = -delta2;
    elapsed += delta2;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update2);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
var framesync;
var init_animations = __esm({
  "node_modules/popmotion/dist/es/animations/index.mjs"() {
    init_tslib_es62();
    init_detect_animation_from_options();
    init_es();
    init_interpolate();
    init_elapsed();
    framesync = (update2) => {
      const passTimestamp = ({ delta: delta2 }) => update2(delta2);
      return {
        start: () => es_default.update(passTimestamp, true),
        stop: () => cancelSync.update(passTimestamp)
      };
    };
  }
});

// node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
var init_velocity_per_second = __esm({
  "node_modules/popmotion/dist/es/utils/velocity-per-second.mjs"() {
  }
});

// node_modules/popmotion/dist/es/animations/inertia.mjs
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v2) {
    return min !== void 0 && v2 < min || max !== void 0 && v2 > max;
  }
  function boundaryNearest(v2) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v2) < Math.abs(max - v2) ? min : max;
  }
  function startAnimation2(options2) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options2), {
      driver,
      onUpdate: (v2) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v2);
        (_a = options2.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options2, v2);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options2) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options2));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v2) => {
      prev = current;
      current = v2;
      velocity = velocityPerSecond(v2 - prev, getFrameData().delta);
      if (heading === 1 && v2 > boundary || heading === -1 && v2 < boundary) {
        startSpring({ from: v2, to: boundary, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}
var init_inertia = __esm({
  "node_modules/popmotion/dist/es/animations/inertia.mjs"() {
    init_animations();
    init_velocity_per_second();
    init_es();
  }
});

// node_modules/popmotion/dist/es/utils/is-point.mjs
var isPoint;
var init_is_point = __esm({
  "node_modules/popmotion/dist/es/utils/is-point.mjs"() {
    isPoint = (point) => point.hasOwnProperty("x") && point.hasOwnProperty("y");
  }
});

// node_modules/popmotion/dist/es/utils/is-point-3d.mjs
var isPoint3D;
var init_is_point_3d = __esm({
  "node_modules/popmotion/dist/es/utils/is-point-3d.mjs"() {
    init_is_point();
    isPoint3D = (point) => isPoint(point) && point.hasOwnProperty("z");
  }
});

// node_modules/popmotion/dist/es/utils/distance.mjs
function distance(a3, b2) {
  if (isNum(a3) && isNum(b2)) {
    return distance1D(a3, b2);
  } else if (isPoint(a3) && isPoint(b2)) {
    const xDelta = distance1D(a3.x, b2.x);
    const yDelta = distance1D(a3.y, b2.y);
    const zDelta = isPoint3D(a3) && isPoint3D(b2) ? distance1D(a3.z, b2.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}
var distance1D;
var init_distance = __esm({
  "node_modules/popmotion/dist/es/utils/distance.mjs"() {
    init_is_point();
    init_is_point_3d();
    init_inc();
    distance1D = (a3, b2) => Math.abs(a3 - b2);
  }
});

// node_modules/popmotion/dist/es/easing/cubic-bezier.mjs
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i2 = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
  return currentT;
}
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i2 = 0; i2 < newtonIterations; ++i2) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i2 = 0; i2 < kSplineTableSize; ++i2) {
    sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
var a2, b, c, calcBezier, getSlope, subdivisionPrecision, subdivisionMaxIterations, newtonIterations, newtonMinSlope, kSplineTableSize, kSampleStepSize;
var init_cubic_bezier = __esm({
  "node_modules/popmotion/dist/es/easing/cubic-bezier.mjs"() {
    init_easing();
    a2 = (a1, a22) => 1 - 3 * a22 + 3 * a1;
    b = (a1, a22) => 3 * a22 - 6 * a1;
    c = (a1) => 3 * a1;
    calcBezier = (t, a1, a22) => ((a2(a1, a22) * t + b(a1, a22)) * t + c(a1)) * t;
    getSlope = (t, a1, a22) => 3 * a2(a1, a22) * t * t + 2 * b(a1, a22) * t + c(a1);
    subdivisionPrecision = 1e-7;
    subdivisionMaxIterations = 10;
    newtonIterations = 8;
    newtonMinSlope = 1e-3;
    kSplineTableSize = 11;
    kSampleStepSize = 1 / (kSplineTableSize - 1);
  }
});

// node_modules/popmotion/dist/es/index.mjs
var init_es3 = __esm({
  "node_modules/popmotion/dist/es/index.mjs"() {
    init_animations();
    init_inertia();
    init_clamp();
    init_distance();
    init_mix();
    init_pipe();
    init_progress();
    init_velocity_per_second();
    init_easing();
    init_cubic_bezier();
  }
});

// .svelte-kit/output/server/chunks/scheduler.js
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component8 = dirty_components[flushidx];
        flushidx++;
        set_current_component(component8);
        update(component8.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
      const callback = render_callbacks[i2];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var dirty_components, binding_callbacks, render_callbacks, flush_callbacks, resolved_promise, update_scheduled, seen_callbacks, flushidx;
var init_scheduler = __esm({
  ".svelte-kit/output/server/chunks/scheduler.js"() {
    init_lifecycle();
    dirty_components = [];
    binding_callbacks = [];
    render_callbacks = [];
    flush_callbacks = [];
    resolved_promise = /* @__PURE__ */ Promise.resolve();
    update_scheduled = false;
    seen_callbacks = /* @__PURE__ */ new Set();
    flushidx = 0;
  }
});

// .svelte-kit/output/server/entries/pages/(app)/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key2) => {
    const propertyKey = key2;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function createSwitch(props) {
  const propsWithDefaults = { ...defaults2, ...props };
  const options2 = toWritableStores(omit(propsWithDefaults, "checked"));
  const { disabled, required, name: nameStore, value } = options2;
  const checkedWritable = propsWithDefaults.checked ?? writable(propsWithDefaults.defaultChecked);
  const checked = overridable(checkedWritable, propsWithDefaults?.onCheckedChange);
  function toggleSwitch() {
    if (disabled.get())
      return;
    checked.update((prev) => !prev);
  }
  const root = makeElement(name(), {
    stores: [checked, disabled, required],
    returned: ([$checked, $disabled, $required]) => {
      return {
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        "data-state": $checked ? "checked" : "unchecked",
        type: "button",
        role: "switch",
        "aria-checked": $checked ? "true" : "false",
        "aria-required": $required ? "true" : void 0
      };
    },
    action(node) {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleSwitch();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleSwitch();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const input = makeElement(name("input"), {
    stores: [checked, nameStore, required, disabled, value],
    returned: ([$checked, $name, $required, $disabled, $value]) => {
      return {
        type: "checkbox",
        "aria-hidden": true,
        hidden: true,
        tabindex: -1,
        name: $name,
        value: $value,
        checked: $checked,
        required: $required,
        disabled: disabledAttr($disabled),
        style: styleToString({
          position: "absolute",
          opacity: 0,
          "pointer-events": "none",
          margin: 0,
          transform: "translateX(-100%)"
        })
      };
    }
  });
  return {
    elements: {
      root,
      input
    },
    states: {
      checked
    },
    options: options2
  };
}
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}
function removeUndefined(obj) {
  const result = {};
  for (const key2 in obj) {
    const value = obj[key2];
    if (value !== void 0) {
      result[key2] = value;
    }
  }
  return result;
}
function getOptionUpdater(options2) {
  return function(key2, value) {
    if (value === void 0)
      return;
    const store = options2[key2];
    if (store) {
      store.set(value);
    }
  };
}
function getSwitchData() {
  const NAME = "switch";
  const PARTS = ["root", "input", "thumb"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSwitchData();
  const getAttrs2 = createBitAttrs(NAME, PARTS);
  const Switch2 = { ...createSwitch(removeUndefined(props)), getAttrs: getAttrs2 };
  setContext(NAME, Switch2);
  return {
    ...Switch2,
    updateOption: getOptionUpdater(Switch2.options)
  };
}
function getCtx() {
  const { NAME } = getSwitchData();
  return getContext(NAME);
}
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index8 = arr.indexOf(item);
  index8 > -1 && arr.splice(index8, 1);
}
function motionValue(init2, startStopNotifier) {
  return new MotionValue(init2, startStopNotifier);
}
function getAnimatableNone2(key2, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key2);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options2 = Object.assign({}, transition);
  if (times)
    options2["offset"] = times;
  if (transition.duration)
    options2["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options2.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options2["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options2.type = "keyframes";
  if (yoyo || loop || flip) {
    warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
    legacyRepeatWarning = true;
    if (yoyo) {
      options2.repeatType = "reverse";
    } else if (loop) {
      options2.repeatType = "loop";
    } else if (flip) {
      options2.repeatType = "mirror";
    }
    options2.repeat = loop || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options2.type = "keyframes";
  return options2;
}
function getDelayFromTransition(transition, key2) {
  var _a;
  var valueTransition = getValueTransition(transition, key2) || {};
  return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options2) {
  if (Array.isArray(options2.to) && options2.to[0] === null) {
    options2.to = __spreadArray([], __read(options2.to));
    options2.to[0] = options2.from;
  }
  return options2;
}
function getPopmotionAnimationOptions(transition, options2, key2) {
  var _a;
  if (Array.isArray(options2.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }
  hydrateKeyframes(options2);
  if (!isTransitionDefined(transition)) {
    transition = Object.assign(Object.assign({}, transition), getDefaultTransition(key2, options2.to));
  }
  return Object.assign(Object.assign({}, options2), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key2, value, target, transition, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition, key2);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key2, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key2, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key2, origin);
  warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key2 + ' from "' + origin + '" to "' + target + '". ' + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");
  function start() {
    var options2 = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v2) {
        return value.set(v2);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(Object.assign(Object.assign({}, options2), valueTransition)) : animate(Object.assign(Object.assign({}, getPopmotionAnimationOptions(valueTransition, options2, key2)), { onUpdate: function(v2) {
      var _a2;
      options2.onUpdate(v2);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v2);
    }, onComplete: function() {
      var _a2;
      options2.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2;
    value.set(target);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    return { stop: function() {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
function getValueTransition(transition, key2) {
  return transition[key2] || transition["default"] || transition;
}
function startAnimation(key2, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key2, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key2);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}
function isVariantLabels(v2) {
  return Array.isArray(v2);
}
function isVariantLabel(v2) {
  return typeof v2 === "string" || isVariantLabels(v2);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key2) {
    return current[key2] = value.get();
  });
  return current;
}
function getVelocity$1(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key2) {
    return velocity[key2] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom2, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  return typeof definition === "function" ? definition(custom2 !== null && custom2 !== void 0 ? custom2 : props.custom, currentValues, currentVelocity) : definition;
}
function resolveVariant(visualElement2, definition, custom2) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom2 !== null && custom2 !== void 0 ? custom2 : props.custom, getCurrent(visualElement2), getVelocity$1(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}
function setMotionValue(visualElement2, key2, value) {
  if (visualElement2.hasValue(key2)) {
    visualElement2.getValue(key2).set(value);
  } else {
    visualElement2.addValue(key2, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = __rest(_a, ["transitionEnd", "transition"]);
  target = Object.assign(Object.assign({}, target), transitionEnd);
  for (var key2 in target) {
    var value = resolveFinalValueInKeyframes(target[key2]);
    setMotionValue(visualElement2, key2, value);
  }
}
function setVariants(visualElement2, variantLabels) {
  var reversedLabels = __spreadArray([], __read(variantLabels)).reverse();
  reversedLabels.forEach(function(key2) {
    var _a;
    var variant = visualElement2.getVariant(key2);
    variant && setTarget(visualElement2, variant);
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      setVariants(child, variantLabels);
    });
  });
}
function setValues(visualElement2, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement2, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement2, [definition]);
  } else {
    setTarget(visualElement2, definition);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key22) {
    return !visualElement2.hasValue(key22);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i2 = 0; i2 < numNewValues; i2++) {
    var key2 = newValueKeys[i2];
    var targetValue = target[key2];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key2]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key2)) !== null && _b !== void 0 ? _b : target[key2];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && isNumericalString(value)) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key2, targetValue);
    }
    visualElement2.addValue(key2, motionValue(value));
    (_c = (_d = origin)[key2]) !== null && _c !== void 0 ? _c : _d[key2] = value;
    visualElement2.setBaseTarget(key2, value);
  }
}
function getOriginFromTransition(key2, transition) {
  if (!transition)
    return;
  var valueTransition = transition[key2] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key2 in target) {
    origin[key2] = (_a = getOriginFromTransition(key2, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key2)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}
function animateVisualElement(visualElement2, definition, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  visualElement2.notifyAnimationStart();
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options2);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options2);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options2.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options2);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options2) {
  var _a;
  if (options2 === void 0) {
    options2 = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options2.custom);
  var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options2.transitionOverride) {
    transition = options2.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options2);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options2);
  } : function() {
    return Promise.resolve();
  };
  var when = transition.when;
  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options2.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key2 in target) {
    var value = visualElement2.getValue(key2);
    var valueTarget = target[key2];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key2)) {
      continue;
    }
    var animation = startAnimation(key2, value, valueTarget, Object.assign({ delay }, transition));
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options2) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i2) {
    if (i2 === void 0) {
      i2 = 0;
    }
    return i2 * staggerChildren;
  } : function(i2) {
    if (i2 === void 0) {
      i2 = 0;
    }
    return maxStaggerDuration - i2 * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i2) {
    animations2.push(animateVariant(child, variant, Object.assign(Object.assign({}, options2), { delay: delayChildren + generateStaggerDuration(i2) })).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function stopAnimation(visualElement2) {
  visualElement2.forEachValue(function(value) {
    return value.stop();
  });
}
function sortByTreeOrder(a3, b2) {
  return a3.sortNodePosition(b2);
}
function shouldBlockAnimation(_a, key2) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key2) && needsAnimating[key2] !== true;
  needsAnimating[key2] = false;
  return shouldBlock;
}
function animationControls(startStopNotifier) {
  var hasMounted = false;
  var pendingAnimations = [];
  var subscribers = /* @__PURE__ */ new Set();
  var stopNotification;
  var controls = {
    subscribe: function(visualElement2) {
      if (subscribers.size === 0) {
        stopNotification = startStopNotifier?.();
      }
      subscribers.add(visualElement2);
      return function() {
        subscribers.delete(visualElement2);
        if (subscribers.size === 0) {
          stopNotification?.();
        }
      };
    },
    start: function(definition, transitionOverride) {
      if (hasMounted) {
        var animations_1 = [];
        subscribers.forEach(function(visualElement2) {
          animations_1.push(animateVisualElement(visualElement2, definition, {
            transitionOverride
          }));
        });
        return Promise.all(animations_1);
      } else {
        return new Promise(function(resolve2) {
          pendingAnimations.push({
            animation: [definition, transitionOverride],
            resolve: resolve2
          });
        });
      }
    },
    set: function(definition) {
      return subscribers.forEach(function(visualElement2) {
        setValues(visualElement2, definition);
      });
    },
    stop: function() {
      subscribers.forEach(function(visualElement2) {
        stopAnimation(visualElement2);
      });
    },
    mount: function() {
      hasMounted = true;
      pendingAnimations.forEach(function(_a) {
        var animation = _a.animation, resolve2 = _a.resolve;
        controls.start.apply(controls, __spreadArray([], __read(animation))).then(resolve2);
      });
      return function() {
        hasMounted = false;
        controls.stop();
      };
    }
  };
  return controls;
}
function eachAxis(handler) {
  return [handler("x"), handler("y")];
}
function noop3(any) {
  return any;
}
function convertBoundingBoxToAxisBox(_a) {
  var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertAxisBoxToBoundingBox(_a) {
  var x2 = _a.x, y2 = _a.y;
  return {
    top: y2.min,
    bottom: y2.max,
    left: x2.min,
    right: x2.max
  };
}
function transformBoundingBox(_a, transformPoint2) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  if (transformPoint2 === void 0) {
    transformPoint2 = noop3;
  }
  var topLeft = transformPoint2({ x: left, y: top });
  var bottomRight = transformPoint2({ x: right, y: bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function axisBox() {
  return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
  return {
    x: Object.assign({}, box.x),
    y: Object.assign({}, box.y)
  };
}
function delta() {
  return {
    x: Object.assign({}, zeroDelta),
    y: Object.assign({}, zeroDelta)
  };
}
function isDraggable(visualElement2) {
  var _a = visualElement2.getProps(), drag2 = _a.drag, _dragX = _a._dragX;
  return drag2 && !_dragX;
}
function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
function scalePoint(point, scale2, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x2 = _a.x, y2 = _a.y;
  applyAxisDelta(box.x, x2.translate, x2.scale, x2.originPoint);
  applyAxisDelta(box.y, y2.translate, y2.scale, y2.originPoint);
}
function applyAxisTransforms(final, axis, transforms, _a) {
  var _b = __read(_a, 3), key2 = _b[0], scaleKey = _b[1], originKey = _b[2];
  final.min = axis.min;
  final.max = axis.max;
  var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(final, transforms[key2], transforms[scaleKey], originPoint, transforms.scale);
}
function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  var originPoint = mix(axis.min, axis.max, origin) - translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a) {
  var _b = __read(_a, 3), key2 = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms[key2], transforms[scaleKey], transforms[originKey], transforms.scale);
}
function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
function applyTreeDeltas(box, treeScale, treePath) {
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node;
  var delta2;
  for (var i2 = 0; i2 < treeLength; i2++) {
    node = treePath[i2];
    delta2 = node.getLayoutState().delta;
    treeScale.x *= delta2.x.scale;
    treeScale.y *= delta2.y.scale;
    applyBoxDelta(box, delta2);
    if (isDraggable(node)) {
      applyBoxTransforms(box, box, node.getLatestValues());
    }
  }
}
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function calcOrigin$1(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clampProgress(origin);
}
function updateAxisDelta(delta2, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta2.origin = origin;
  delta2.originPoint = mix(source.min, source.max, delta2.origin);
  delta2.scale = calcLength(target) / calcLength(source);
  if (isNear(delta2.scale, 1, 1e-4))
    delta2.scale = 1;
  delta2.translate = mix(target.min, target.max, delta2.origin) - delta2.originPoint;
  if (isNear(delta2.translate))
    delta2.translate = 0;
}
function updateBoxDelta(delta2, source, target, origin) {
  updateAxisDelta(delta2.x, source.x, target.x, defaultOrigin(origin.originX));
  updateAxisDelta(delta2.y, source.y, target.y, defaultOrigin(origin.originY));
}
function defaultOrigin(origin) {
  return typeof origin === "number" ? origin : 0.5;
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
  calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
  calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}
function createLayoutState() {
  return {
    isHydrated: false,
    layout: axisBox(),
    layoutCorrected: axisBox(),
    treeScale: { x: 1, y: 1 },
    delta: delta(),
    deltaFinal: delta(),
    deltaTransform: ""
  };
}
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
  var x2 = _a.x, y2 = _a.y;
  var xTranslate = x2.translate / treeScale.x;
  var yTranslate = y2.translate / treeScale.y;
  var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform += "rotate(" + rotate + ") ";
    if (rotateX)
      transform += "rotateX(" + rotateX + ") ";
    if (rotateY)
      transform += "rotateY(" + rotateY + ") ";
  }
  transform += "scale(" + x2.scale + ", " + y2.scale + ")";
  return !latestTransform && transform === identityProjection ? "" : transform;
}
function buildLayoutProjectionTransformOrigin(_a) {
  var deltaFinal = _a.deltaFinal;
  return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i2 = 0; i2 < prevLength; i2++) {
    if (prev[i2] !== next[i2])
      return false;
  }
  return true;
}
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options2 = _a.options;
      return animateVisualElement(visualElement2, animation, options2);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate2 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = __rest(resolved, ["transition", "transitionEnd"]);
      acc = Object.assign(Object.assign(Object.assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key2) {
    return allAnimatedKeys[key2] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate2 = makeAnimator(visualElement2);
  }
  function animateChanges(options2, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = /* @__PURE__ */ new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i22) {
      var type = reversePriorityOrder[i22];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i22;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = Object.assign({}, encounteredKeys);
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        return "continue";
      }
      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i22 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = Object.assign(Object.assign({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key22) {
        shouldAnimateType = true;
        removedKeys.delete(key22);
        typeState.needsAnimating[key22] = true;
      };
      for (var key2 in allKeys) {
        var next = resolvedValues[key2];
        var prev = prevResolvedValues[key2];
        if (encounteredKeys.hasOwnProperty(key2))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev)) {
              markToAnimate(key2);
            } else {
              typeState.protectedKeys[key2] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key2);
          } else {
            removedKeys.add(key2);
          }
        } else if (next !== void 0 && removedKeys.has(key2)) {
          markToAnimate(key2);
        } else {
          typeState.protectedKeys[key2] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = Object.assign(Object.assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
          return {
            animation,
            options: Object.assign({ type }, options2)
          };
        }))));
      }
    };
    for (var i2 = 0; i2 < numAnimationTypes; i2++) {
      _loop_1(i2);
    }
    allAnimatedKeys = Object.assign({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key2) {
        var fallbackTarget = visualElement2.getBaseTarget(key2);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key2] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate2(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options2) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options2, type);
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function variantsHaveChanged(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      return names.forEach(function(name2) {
        var _a;
        (_a = propSubscriptions[name2]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        var on = "on" + name2;
        var propListener = props[on];
        if (propListener) {
          propSubscriptions[name2] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i2) {
    lifecycles["on" + names[i2]] = function(handler) {
      return manager.add(handler);
    };
    lifecycles["notify" + names[i2]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, __spreadArray([], __read(args)));
    };
  });
  return lifecycles;
}
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key2 in next) {
    var nextValue = next[key2];
    var prevValue = prev[key2];
    if (isMotionValue(nextValue)) {
      element.addValue(key2, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key2, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key2)) {
        var existingValue = element.getValue(key2);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key2, motionValue((_a = element.getStaticValue(key2)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key2 in prev) {
    if (next[key2] === void 0)
      element.removeValue(key2);
  }
  return next;
}
function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
  var delta2 = _a.delta, layout = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
  var target = _b.target;
  resetBox(layoutCorrected, layout);
  applyTreeDeltas(layoutCorrected, treeScale, treePath);
  updateBoxDelta(delta2, layoutCorrected, target, transformOrigin);
}
function calcRelativeOffsetAxis(parent, child) {
  return {
    min: child.min - parent.min,
    max: child.max - parent.min
  };
}
function calcRelativeOffset(parent, child) {
  return {
    x: calcRelativeOffsetAxis(parent.x, child.x),
    y: calcRelativeOffsetAxis(parent.y, child.y)
  };
}
function setCurrentViewportBox(visualElement2) {
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent) {
    visualElement2.rebaseProjectionTarget();
    return;
  }
  var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  eachAxis(function(axis) {
    visualElement2.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
  });
}
function fireResolveRelativeTargetBox(child) {
  child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
  child.updateLayoutProjection();
}
function isValidMotionProp(key2) {
  return validMotionProps.has(key2);
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}
function isProjecting(visualElement2) {
  var isEnabled = visualElement2.projection.isEnabled;
  return isEnabled || visualElement2.shouldResetTransform();
}
function collectProjectingAncestors(visualElement2, ancestors) {
  if (ancestors === void 0) {
    ancestors = [];
  }
  var parent = visualElement2.parent;
  if (parent)
    collectProjectingAncestors(parent, ancestors);
  if (isProjecting(visualElement2))
    ancestors.push(visualElement2);
  return ancestors;
}
function collectProjectingChildren(visualElement2) {
  var children = [];
  var addChild = function(child) {
    if (isProjecting(child))
      children.push(child);
    child.children.forEach(addChild);
  };
  visualElement2.children.forEach(addChild);
  return children.sort(compareByDepth);
}
function updateLayoutMeasurement(visualElement2) {
  if (visualElement2.shouldResetTransform())
    return;
  var layoutState = visualElement2.getLayoutState();
  visualElement2.notifyBeforeLayoutMeasure(layoutState.layout);
  layoutState.isHydrated = true;
  layoutState.layout = visualElement2.measureViewportBox();
  layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
  visualElement2.notifyLayoutMeasure(layoutState.layout, visualElement2.prevViewportBox || layoutState.layout);
  es_default.update(function() {
    return visualElement2.rebaseProjectionTarget();
  });
}
function snapshotViewportBox(visualElement2, nc) {
  if (visualElement2.shouldResetTransform())
    return;
  if (!nc) visualElement2.prevViewportBox = visualElement2.measureViewportBox(false);
  visualElement2.rebaseProjectionTarget(false, visualElement2.prevViewportBox);
}
function pushJob(stack, job, pointer) {
  if (!stack[pointer])
    stack[pointer] = [];
  stack[pointer].push(job);
}
function batchLayout(callback) {
  unresolvedJobs.add(callback);
  return function() {
    return unresolvedJobs.delete(callback);
  };
}
function flushLayout() {
  if (!unresolvedJobs.size)
    return;
  var pointer = 0;
  var reads = [[]];
  var writes = [];
  var setRead = function(job) {
    return pushJob(reads, job, pointer);
  };
  var setWrite = function(job) {
    pushJob(writes, job, pointer);
    pointer++;
  };
  unresolvedJobs.forEach(function(callback) {
    callback(setRead, setWrite);
    pointer = 0;
  });
  unresolvedJobs.clear();
  es_default.postRender(function() {
    setTimeout(function() {
      return false;
    }, 10);
  });
  var numStacks = writes.length;
  for (var i2 = 0; i2 <= numStacks; i2++) {
    reads[i2] && reads[i2].forEach(executeJob);
    writes[i2] && writes[i2].forEach(executeJob);
  }
}
function createBatcher() {
  var queue = /* @__PURE__ */ new Set();
  return {
    add: function(child) {
      return queue.add(child);
    },
    flush: function(_a) {
      var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
      batchLayout(function(read, write) {
        var order2 = Array.from(queue).sort(compareByDepth);
        var ancestors = parent ? collectProjectingAncestors(parent) : [];
        write(function() {
          var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order2));
          allElements.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          order2.forEach(updateLayoutMeasurement);
        });
        write(function() {
          ancestors.forEach(function(element) {
            return element.restoreTransform();
          });
          order2.forEach(layoutReady);
        });
        read(function() {
          order2.forEach(function(child) {
            if (child.isPresent)
              child.presence = Presence.Present;
          });
        });
        write(function() {
          flushSync.preRender();
          flushSync.render();
        });
        read(function() {
          es_default.postRender(function() {
            return order2.forEach(assignProjectionToSnapshot);
          });
          queue.clear();
        });
      });
      flushLayout();
    }
  };
}
function assignProjectionToSnapshot(child) {
  child.prevViewportBox = child.projection.target;
}
function isSharedLayout(context) {
  return !!context.forceUpdate;
}
function loadFeatures(features) {
  for (var key2 in features) {
    var Component = features[key2];
    if (Component !== null) {
      featureDefinitions[key2].Component = Component;
    }
  }
}
function sortTransformProps(a3, b2) {
  return transformProps.indexOf(a3) - transformProps.indexOf(b2);
}
function isTransformProp(key2) {
  return transformPropSet.has(key2);
}
function isTransformOriginProp(key2) {
  return transformOriginProps.has(key2);
}
function isForcedMotionValue(key2, _a) {
  var layout = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key2) || isTransformOriginProp(key2) || (layout || layoutId !== void 0) && !!valueScaleCorrection[key2];
}
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i2 = 0; i2 < numTransformKeys; i2++) {
    var key2 = transformKeys2[i2];
    transformString += (translateAlias[key2] || key2) + "(" + transform[key2] + ") ";
    if (key2 === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}
function isCSSVariable$1(key2) {
  return key2.startsWith("--");
}
function buildHTMLStyles(state, latestValues, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var _a;
  var style = state.style, vars = state.vars, transform = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key2 in latestValues) {
    var value = latestValues[key2];
    if (isCSSVariable$1(key2)) {
      vars[key2] = value;
      continue;
    }
    var valueType = numberValueTypes[key2];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key2)) {
      hasTransform = true;
      transform[key2] = valueAsType;
      transformKeys2.push(key2);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key2)) {
      transformOrigin[key2] = valueAsType;
      hasTransformOrigin = true;
    } else {
      if (layoutState && projection && layoutState.isHydrated && valueScaleCorrection[key2]) {
        var correctedValue = valueScaleCorrection[key2].process(value, layoutState, projection);
        var applyTo = valueScaleCorrection[key2].applyTo;
        if (applyTo) {
          var num = applyTo.length;
          for (var i2 = 0; i2 < num; i2++) {
            style[applyTo[i2]] = correctedValue;
          }
        } else {
          style[key2] = correctedValue;
        }
      } else {
        style[key2] = valueAsType;
      }
    }
  }
  if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : void 0);
    if (transformTemplate) {
      style.transform = transformTemplate(transform, style.transform);
    }
    style.transformOrigin = buildProjectionTransformOrigin(layoutState);
  } else {
    if (hasTransform) {
      style.transform = buildTransform(state, options2, transformIsNone, transformTemplate);
    }
    if (hasTransformOrigin) {
      style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}
function copyRawValuesOnly(target, source, props) {
  for (const key2 in source) {
    if (!isMotionValue(source[key2]) && !isForcedMotionValue(key2, props)) {
      target[key2] = source[key2];
    }
  }
}
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
}
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  var keys = camelKeys;
  attrs[keys.offset] = progressToPixels(-offset, totalLength);
  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}
function buildSVGAttrs(state, _a, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (totalPathLength !== void 0 && pathLength !== void 0) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset);
  }
}
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key2 in props) {
    if (shouldForward(key2) || forwardMotionProps === true && isValidMotionProp(key2) || !isDom && !isValidMotionProp(key2)) {
      filteredProps[key2] = props[key2];
    }
  }
  return filteredProps;
}
function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}
function isCSSVariable(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  var _a = __read(match, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
function getVariableValue(current, element, depth) {
  var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable(fallback)) {
    return getVariableValue(fallback, element);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = __rest(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof HTMLElement))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = Object.assign({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key2 in target) {
    var current = target[key2];
    if (!isCSSVariable(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key2] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key2]) !== null && _b !== void 0 ? _b : transitionEnd[key2] = current;
  }
  return { target, transitionEnd };
}
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key2) {
    var value = visualElement2.getValue(key2);
    if (value !== void 0) {
      removedTransforms.push([key2, value.get()]);
      value.set(key2.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}
function scrapeMotionValuesFromProps$1(props) {
  var style = props.style;
  var newValues = {};
  for (var key2 in style) {
    if (isMotionValue(style[key2]) || isForcedMotionValue(key2, props)) {
      newValues[key2] = style[key2];
    }
  }
  return newValues;
}
function renderHTML(element, _a) {
  var style = _a.style, vars = _a.vars;
  Object.assign(element.style, style);
  for (var key2 in vars) {
    element.style.setProperty(key2, vars[key2]);
  }
}
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
function scrapeMotionValuesFromProps(props) {
  var newValues = scrapeMotionValuesFromProps$1(props);
  for (var key2 in props) {
    if (isMotionValue(props[key2])) {
      var targetKey = key2 === "x" || key2 === "y" ? "attr" + key2.toUpperCase() : key2;
      newValues[targetKey] = props[key2];
    }
  }
  return newValues;
}
function renderSVG(element, renderState) {
  renderHTML(element, renderState);
  for (var key2 in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key2) ? camelToDash(key2) : key2, renderState.attrs[key2]);
  }
}
function isPath(element) {
  return element.tagName === "path";
}
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial2 = props.initial, animate2 = props.animate;
    return {
      initial: initial2 === false || isVariantLabel(initial2) ? initial2 : void 0,
      animate: isVariantLabel(animate2) ? animate2 : void 0
    };
  }
  return props.inherit !== false ? context || {} : {};
}
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const blockInitialAnimation = presenceContext?.initial === false;
  const motionValues = scrapeMotionValues(props);
  for (const key2 in motionValues) {
    values[key2] = resolveMotionValue(motionValues[key2]);
  }
  let { initial: initial2, animate: animate2 } = props;
  const isControllingVariants = checkIfControllingVariants(props);
  const isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial2 !== null && initial2 !== void 0 ? initial2 : initial2 = context.initial;
    animate2 !== null && animate2 !== void 0 ? animate2 : animate2 = context.animate;
  }
  const variantToSet = blockInitialAnimation || initial2 === false ? animate2 : initial2;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved) return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key2 in target) values[key2] = target[key2];
      for (const key2 in transitionEnd) values[key2] = transitionEnd[key2];
    });
  }
  return values;
}
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement2, externalRef) {
  return function(instance) {
    var _a;
    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
    if (visualElement2) {
      instance ? visualElement2.mount(instance) : visualElement2.unmount();
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  };
}
function addDomEvent(target, eventName, handler, options2) {
  target.addEventListener(eventName, handler, options2);
  return function() {
    return target.removeEventListener(eventName, handler, options2);
  };
}
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}
function getPointerEventName(name2) {
  if (supportsPointerEvents()) {
    return name2;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name2];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name2];
  }
  return name2;
}
function addPointerEvent(target, eventName, handler, options2) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options2);
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a3, b2) {
  return { x: a3.x - b2.x, y: a3.y - b2.y };
}
function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  var i2 = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i2 >= 0) {
    timestampedPoint = history[i2];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i2--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
function createLock(name2) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name2;
      return openLock;
    }
    return false;
  };
}
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
function createHoverEvent(visualElement2, isActive, callback) {
  return (event, info) => {
    if (!isMouseEvent(event) || isDragActive()) return;
    callback?.(event, info);
    visualElement2.animationState?.setActive(AnimationType.Hover, isActive);
  };
}
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcConstrainedMinPoint(point, length, progress2, constraints2, elastic) {
  var min = point - length * progress2;
  return constraints2 ? applyConstraints(min, constraints2, elastic) : min;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }
  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcPositionFromProgress(axis, constraints2, progress2) {
  var axisLength = axis.max - axis.min;
  var min = mix(constraints2.min, constraints2.max - axisLength, progress2);
  return { min, max: min + axisLength };
}
function rebaseAxisConstraints(layout, constraints2) {
  var relativeConstraints = {};
  if (constraints2.min !== void 0) {
    relativeConstraints.min = constraints2.min - layout.min;
  }
  if (constraints2.max !== void 0) {
    relativeConstraints.max = constraints2.max - layout.min;
  }
  return relativeConstraints;
}
function resolveDragElastic(dragElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
function convertToRelativeProjection(visualElement2, isLayoutDrag) {
  if (isLayoutDrag === void 0) {
    isLayoutDrag = true;
  }
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent)
    return false;
  var offset;
  if (isLayoutDrag) {
    offset = calcRelativeOffset(projectionParent.projection.target, visualElement2.projection.target);
    removeBoxTransforms(offset, projectionParent.getLatestValues());
  } else {
    offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  }
  eachAxis(function(axis) {
    return visualElement2.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
  });
  return true;
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
function shuffleArray(array2) {
  let currentIndex = array2.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array2[currentIndex], array2[randomIndex]] = [array2[randomIndex], array2[currentIndex]];
  }
  return array2;
}
function toHumanPrice(price, decimals = 2) {
  return Number(price / 100).toFixed(decimals);
}
var globals, overridable, defaults2, name, Switch_input, Object_1, Switch$1, Switch_thumb, Arrow_right, Chart_no_axes_column_increasing, Check, Chevron_right, File2, Globe, Heart_handshake, Rss, Shield, seo, GoogleSvg, GitHubSvg, UberSvg, MicrosoftSvg, NotionSvg, ClientSection, Marquee, Presence, VisibilityAction, SubscriptionManager, isFloat, MotionValue, getDomContext, setDomContext, MotionConfigContext, ScaleCorrectionContext, ScaleCorrectionParentContext, provideScaleCorrection, ScaleCorrectionProvider, secondsToMilliseconds, easingLookup, easingDefinitionToFunction, isEasingArray, isAnimatable, isKeyframesTarget, underDampedSpring, criticallyDampedSpring, linearTween, keyframes2, defaultTransitions, getDefaultTransition, int, numberValueTypes, defaultValueTypes, getDefaultValueType, legacyRepeatWarning, isNumericalString, isCustomValue, resolveFinalValueInKeyframes, testValueType, auto, dimensionValueTypes, findDimensionValueType, valueTypes, findValueType, valueScaleCorrection, zeroDelta, xKeys, yKeys, clampProgress, isMotionValue, createProjectionState, zeroLayout, identityProjection, isAnimationControls, AnimationType, variantPriorityOrder, reversePriorityOrder, numAnimationTypes, names, compareByDepth, FlatTree, visualElement, variantProps, numVariantProps, validMotionProps, PresenceContext, counter, incrementId, usePresence, LayoutGroupContext, unresolvedJobs, executeJob, defaultHandler, SharedLayoutContext, FramerTreeLayoutContext, LazyContext, MotionContext, UseVisualElement, createDefinition, featureDefinitions, UseFeatures, MotionContextProvider, createHtmlRenderState, createSvgRenderState, transformAxes, order, transformProps, transformPropSet, transformOriginProps, translateAlias, getValueAsType, UseInitialMotionValues, UseStyle, UseHTMLProps, progressToPixels, camelKeys, UseSVGProps, shouldForward, emotionIsPropValid_1, UseRender, cssVariableRegex, positionalKeys, isPositionalKey, hasPositionalKey, setAndResetVelocity, isNumOrPxType, BoundingBoxDimension, getPosFromMatrix, getTranslateFromMatrix, transformKeys, nonTranslationalTransformKeys, positionalValues, convertChangedValueTypes, checkAndConvertChangedValueTypes, parseDomVariant, htmlConfig, htmlVisualElement, CAMEL_CASE_PATTERN, REPLACE_TEMPLATE, camelToDash, camelCaseAttributes, svgVisualElement, createDomVisualElement, svgMotionConfig, htmlMotionConfig, UseCreateMotionContext, makeState, UseVisualState, Motion, UseDomEvent, defaultPagePoint, wrapHandler, isBrowser3, supportsPointerEvents, supportsTouchEvents, supportsMouseEvents, mouseEventNames, touchEventNames, UsePointerEvent, PanSession, UsePanGesture, isNodeOrChild, globalHorizontalLock, globalVerticalLock, UseTapGesture, UseHoverGesture, UseFocusGesture, createMotionClass, gestureAnimations, defaultElastic, elementDragControls, lastPointerEvent, VisualElementDragControls, UseDrag, drag, Animate, AnimateLayoutContextProvider, Measure, MeasureContextProvider, layoutAnimations, AnimationState, Exit, animations, featureBundle, motion, useAnimation, CtaCard, CtaSection, AnimatedShinyText, BorderBeam, HeroDarkImg, HeroLightImg, HeroSection, Switch, PricingSection, SphereMask, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/_page.svelte.js"() {
    init_ssr();
    init_Icon();
    init_lifecycle();
    init_index2();
    init_tslib_es6();
    init_es();
    init_es3();
    init_es2();
    init_hey_listen_es();
    init_scheduler();
    init_dist();
    globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
      // @ts-ignore Node typings have this
      global
    );
    overridable = (_store, onChange) => {
      const store = withGet(_store);
      const update2 = (updater, sideEffect) => {
        store.update((curr) => {
          const next = updater(curr);
          let res = next;
          if (onChange) {
            res = onChange({ curr, next });
          }
          sideEffect?.(res);
          return res;
        });
      };
      const set = (curr) => {
        update2(() => curr);
      };
      return {
        ...store,
        update: update2,
        set
      };
    };
    defaults2 = {
      defaultChecked: false,
      disabled: false,
      required: false,
      name: "",
      value: ""
    };
    ({ name } = createElHelpers("switch"));
    Switch_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let inputValue;
      let $$restProps = compute_rest_props($$props, ["el"]);
      let $value, $$unsubscribe_value;
      let $input, $$unsubscribe_input;
      let $name, $$unsubscribe_name;
      let $disabled, $$unsubscribe_disabled;
      let $required, $$unsubscribe_required;
      let { el = void 0 } = $$props;
      const { elements: { input }, options: { value, name: name2, disabled, required } } = getCtx();
      $$unsubscribe_input = subscribe(input, (value2) => $input = value2);
      $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
      $$unsubscribe_name = subscribe(name2, (value2) => $name = value2);
      $$unsubscribe_disabled = subscribe(disabled, (value2) => $disabled = value2);
      $$unsubscribe_required = subscribe(required, (value2) => $required = value2);
      if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
      inputValue = $value === void 0 || $value === "" ? "on" : $value;
      $$unsubscribe_value();
      $$unsubscribe_input();
      $$unsubscribe_name();
      $$unsubscribe_disabled();
      $$unsubscribe_required();
      return `<input${spread(
        [
          escape_object($input),
          { name: escape_attribute_value($name) },
          { disabled: $disabled || null },
          { required: $required || null },
          {
            value: escape_attribute_value(inputValue)
          },
          escape_object($$restProps)
        ],
        {}
      )}${add_attribute("this", el, 0)}>`;
    });
    ({ Object: Object_1 } = globals);
    Switch$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let builder;
      let attrs;
      let $$restProps = compute_rest_props($$props, [
        "checked",
        "onCheckedChange",
        "disabled",
        "name",
        "value",
        "includeInput",
        "required",
        "asChild",
        "inputAttrs",
        "el"
      ]);
      let $root, $$unsubscribe_root;
      let { checked = void 0 } = $$props;
      let { onCheckedChange = void 0 } = $$props;
      let { disabled = void 0 } = $$props;
      let { name: name2 = void 0 } = $$props;
      let { value = void 0 } = $$props;
      let { includeInput = true } = $$props;
      let { required = void 0 } = $$props;
      let { asChild = false } = $$props;
      let { inputAttrs = void 0 } = $$props;
      let { el = void 0 } = $$props;
      const { elements: { root }, states: { checked: localChecked }, updateOption, getAttrs: getAttrs2 } = setCtx({
        disabled,
        name: name2,
        value,
        required,
        defaultChecked: checked,
        onCheckedChange: ({ next }) => {
          if (checked !== next) {
            onCheckedChange?.(next);
            checked = next;
          }
          return next;
        }
      });
      $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
      createDispatcher();
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
      if ($$props.onCheckedChange === void 0 && $$bindings.onCheckedChange && onCheckedChange !== void 0) $$bindings.onCheckedChange(onCheckedChange);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
      if ($$props.includeInput === void 0 && $$bindings.includeInput && includeInput !== void 0) $$bindings.includeInput(includeInput);
      if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
      if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
      if ($$props.inputAttrs === void 0 && $$bindings.inputAttrs && inputAttrs !== void 0) $$bindings.inputAttrs(inputAttrs);
      if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
      checked !== void 0 && localChecked.set(checked);
      {
        updateOption("disabled", disabled);
      }
      {
        updateOption("name", name2);
      }
      {
        updateOption("value", value);
      }
      {
        updateOption("required", required);
      }
      builder = $root;
      attrs = {
        ...getAttrs2("root"),
        "data-checked": checked ? "" : void 0
      };
      {
        Object.assign(builder, attrs);
      }
      $$unsubscribe_root();
      return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`} ${includeInput ? `${validate_component(Switch_input, "SwitchInput").$$render($$result, Object_1.assign({}, inputAttrs), {}, {})}` : ``}`;
    });
    Switch_thumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let attrs;
      let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
      let $checked, $$unsubscribe_checked;
      let { asChild = false } = $$props;
      let { el = void 0 } = $$props;
      const { states: { checked }, getAttrs: getAttrs2 } = getCtx();
      $$unsubscribe_checked = subscribe(checked, (value) => $checked = value);
      if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
      if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
      attrs = {
        ...getAttrs2("thumb"),
        "data-state": $checked ? "checked" : "unchecked",
        "data-checked": $checked ? "" : void 0
      };
      $$unsubscribe_checked();
      return `${asChild ? `${slots.default ? slots.default({ attrs, checked: $checked }) : ``}` : `<span${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}></span>`}`;
    });
    Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Chart_no_axes_column_increasing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        [
          "line",
          {
            "x1": "12",
            "x2": "12",
            "y1": "20",
            "y2": "10"
          }
        ],
        [
          "line",
          {
            "x1": "18",
            "x2": "18",
            "y1": "20",
            "y2": "4"
          }
        ],
        [
          "line",
          {
            "x1": "6",
            "x2": "6",
            "y1": "20",
            "y2": "16"
          }
        ]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chart-no-axes-column-increasing" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    File2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        [
          "path",
          {
            "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
          }
        ],
        ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "file" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Globe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        ["circle", { "cx": "12", "cy": "12", "r": "10" }],
        [
          "path",
          {
            "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
          }
        ],
        ["path", { "d": "M2 12h20" }]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "globe" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Heart_handshake = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        [
          "path",
          {
            "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          }
        ],
        [
          "path",
          {
            "d": "M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"
          }
        ],
        ["path", { "d": "m18 15-2-2" }],
        ["path", { "d": "m15 18-2-2" }]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "heart-handshake" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Rss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        ["path", { "d": "M4 11a9 9 0 0 1 9 9" }],
        ["path", { "d": "M4 4a16 16 0 0 1 16 16" }],
        ["circle", { "cx": "5", "cy": "19", "r": "1" }]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "rss" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Shield = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        [
          "path",
          {
            "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          }
        ]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shield" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    seo = {
      title: "Svelte Startup Template",
      description: "Svelte Startup Template is a template for building Startup Applications. It is built with SvelteKit, TailwindCSS, and Svelte Animations",
      image: "https://i.pinimg.com/736x/85/9a/92/859a92a2629f912010a0a72270aefedc.jpg",
      twitter: "SEO twitter",
      url: "https://startup-sve.vercel.app",
      keywords: "svelte, sveltekit, tailwindcss, svelte animations, startup, template"
    };
    GoogleSvg = "data:image/svg+xml,%3csvg%20width='113'%20height='48'%20viewBox='0%200%20113%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M48.2375%2025.6501C48.2375%2030.9734%2044.0732%2034.896%2038.9625%2034.896C33.8519%2034.896%2029.6875%2030.9734%2029.6875%2025.6501C29.6875%2020.2894%2033.8519%2016.4043%2038.9625%2016.4043C44.0732%2016.4043%2048.2375%2020.2894%2048.2375%2025.6501ZM44.1774%2025.6501C44.1774%2022.3236%2041.7638%2020.0476%2038.9625%2020.0476C36.1613%2020.0476%2033.7477%2022.3236%2033.7477%2025.6501C33.7477%2028.9433%2036.1613%2031.2527%2038.9625%2031.2527C41.7638%2031.2527%2044.1774%2028.9391%2044.1774%2025.6501Z'%20fill='%23EA4335'/%3e%3cpath%20d='M68.2468%2025.6501C68.2468%2030.9734%2064.0824%2034.896%2058.9718%2034.896C53.8612%2034.896%2049.6968%2030.9734%2049.6968%2025.6501C49.6968%2020.2936%2053.8612%2016.4043%2058.9718%2016.4043C64.0824%2016.4043%2068.2468%2020.2894%2068.2468%2025.6501ZM64.1867%2025.6501C64.1867%2022.3236%2061.7731%2020.0476%2058.9718%2020.0476C56.1705%2020.0476%2053.7569%2022.3236%2053.7569%2025.6501C53.7569%2028.9433%2056.1705%2031.2527%2058.9718%2031.2527C61.7731%2031.2527%2064.1867%2028.9391%2064.1867%2025.6501Z'%20fill='%23FBBC05'/%3e%3cpath%20d='M87.4224%2016.9629V33.562C87.4224%2040.3901%2083.3956%2043.1789%2078.6351%2043.1789C74.1539%2043.1789%2071.4569%2040.1817%2070.4398%2037.7306L73.9747%2036.2591C74.6041%2037.7639%2076.1465%2039.5397%2078.631%2039.5397C81.6782%2039.5397%2083.5665%2037.6597%2083.5665%2034.1206V32.7909H83.4248C82.516%2033.9122%2080.7652%2034.8918%2078.5559%2034.8918C73.933%2034.8918%2069.6978%2030.865%2069.6978%2025.6835C69.6978%2020.4645%2073.933%2016.4043%2078.5559%2016.4043C80.7611%2016.4043%2082.5119%2017.3839%2083.4248%2018.4719H83.5665V16.9671H87.4224V16.9629ZM83.8541%2025.6835C83.8541%2022.4278%2081.6823%2020.0476%2078.9186%2020.0476C76.1173%2020.0476%2073.7704%2022.4278%2073.7704%2025.6835C73.7704%2028.9058%2076.1173%2031.2527%2078.9186%2031.2527C81.6823%2031.2527%2083.8541%2028.9058%2083.8541%2025.6835Z'%20fill='%234285F4'/%3e%3cpath%20d='M93.779%207.23364V34.3292H89.8188V7.23364H93.779Z'%20fill='%2334A853'/%3e%3cpath%20d='M109.211%2028.6932L112.363%2030.7941C111.346%2032.299%20108.895%2034.8918%20104.659%2034.8918C99.407%2034.8918%2095.4844%2030.8317%2095.4844%2025.646C95.4844%2020.1477%2099.4403%2016.4001%20104.205%2016.4001C109.003%2016.4001%20111.35%2020.2185%20112.117%2022.282L112.538%2023.3324L100.178%2028.4514C101.124%2030.3064%20102.596%2031.2527%20104.659%2031.2527C106.727%2031.2527%20108.161%2030.2356%20109.211%2028.6932ZM99.5112%2025.3667L107.773%2021.936C107.319%2020.7813%20105.952%2019.9768%20104.343%2019.9768C102.279%2019.9768%2099.407%2021.7984%2099.5112%2025.3667Z'%20fill='%23EA4335'/%3e%3cpath%20d='M14.6975%2023.2447V19.3221H27.9159C28.0451%2020.0058%2028.1118%2020.8145%2028.1118%2021.6899C28.1118%2024.6329%2027.3073%2028.272%2024.7145%2030.8648C22.1925%2033.491%2018.9702%2034.8917%2014.7016%2034.8917C6.78972%2034.8917%200.136719%2028.4471%200.136719%2020.5352C0.136719%2012.6233%206.78972%206.17871%2014.7016%206.17871C19.0786%206.17871%2022.1967%207.89615%2024.5394%2010.1347L21.7715%2012.9026C20.0916%2011.3269%2017.8155%2010.1013%2014.6975%2010.1013C8.91985%2010.1013%204.40114%2014.7576%204.40114%2020.5352C4.40114%2026.3128%208.91985%2030.9691%2014.6975%2030.9691C18.445%2030.9691%2020.5793%2029.4642%2021.9466%2028.0969C23.0554%2026.9881%2023.7849%2025.4041%2024.0725%2023.2406L14.6975%2023.2447Z'%20fill='%234285F4'/%3e%3c/svg%3e";
    GitHubSvg = "/_app/immutable/assets/GitHub.Cr3qLdtz.svg";
    UberSvg = "data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_201_8153)'%3e%3cpath%20d='M4.14324%2028.8547C4.44757%2029.6623%204.8689%2030.3528%205.40732%2030.9263C5.94573%2031.4998%206.5836%2031.9387%207.32091%2032.243C8.0583%2032.5474%208.86002%2032.6995%209.72614%2032.6995C10.5689%2032.6995%2011.3589%2032.5415%2012.0963%2032.2254C12.8337%2031.9094%2013.4773%2031.4646%2014.0274%2030.8912C14.5775%2030.3176%2015.0047%2029.633%2015.309%2028.8371C15.6134%2028.0412%2015.7655%2027.1518%2015.7655%2026.1686V11H19.4523V35.5787H15.8006V33.2963C14.9813%2034.1624%2014.0157%2034.8295%2012.9038%2035.2978C11.7919%2035.7659%2010.5923%2036%209.30481%2036C7.99389%2036%206.77084%2035.7717%205.6355%2035.3153C4.50024%2034.8588%203.51703%2034.2093%202.6861%2033.3666C1.85517%2032.5238%201.19967%2031.5116%200.719831%2030.3294C0.239918%2029.1473%200%2027.8306%200%2026.3792V11H3.68679V26.1686C3.68679%2027.1518%203.83892%2028.0471%204.14324%2028.8547Z'%20fill='%23010202'/%3e%3cpath%20d='M25.8073%2011V19.9536C26.6266%2019.1344%2027.5747%2018.4848%2028.6514%2018.0049C29.7282%2017.525%2030.8987%2017.2851%2032.1626%2017.2851C33.4736%2017.2851%2034.7024%2017.5308%2035.8494%2018.0224C36.9964%2018.514%2037.9912%2019.1811%2038.834%2020.0239C39.6767%2020.8666%2040.3439%2021.8614%2040.8354%2023.0084C41.327%2024.1555%2041.5727%2025.3727%2041.5727%2026.6601C41.5727%2027.9475%2041.327%2029.1589%2040.8354%2030.2942C40.3439%2031.4295%2039.6767%2032.4186%2038.834%2033.2611C37.9912%2034.1039%2036.9964%2034.771%2035.8494%2035.2626C34.7024%2035.7542%2033.4735%2035.9999%2032.1626%2035.9999C30.8986%2035.9999%2029.7224%2035.76%2028.6339%2035.2801C27.5454%2034.8003%2026.5915%2034.1507%2025.7722%2033.3314V35.5786H22.261V11H25.8073ZM26.2111%2029.0829C26.5271%2029.832%2026.966%2030.4874%2027.5278%2031.0492C28.0896%2031.611%2028.7451%2032.0558%2029.4941%2032.3835C30.2432%2032.7112%2031.0508%2032.8751%2031.9169%2032.8751C32.7596%2032.8751%2033.5555%2032.7112%2034.3045%2032.3835C35.0536%2032.0558%2035.7031%2031.6111%2036.2533%2031.0492C36.8034%2030.4875%2037.2423%2029.832%2037.57%2029.0829C37.8977%2028.3338%2038.0615%2027.5263%2038.0615%2026.6601C38.0615%2025.794%2037.8977%2024.9806%2037.57%2024.2198C37.2423%2023.459%2036.8034%2022.7978%2036.2533%2022.236C35.7031%2021.6742%2035.0536%2021.2353%2034.3045%2020.9193C33.5554%2020.6033%2032.7596%2020.4452%2031.9169%2020.4452C31.0742%2020.4452%2030.2783%2020.6032%2029.5293%2020.9193C28.7803%2021.2353%2028.1248%2021.6742%2027.563%2022.236C27.0012%2022.7978%2026.5564%2023.459%2026.2287%2024.2198C25.901%2024.9806%2025.7372%2025.794%2025.7372%2026.6601C25.7371%2027.5263%2025.8951%2028.3338%2026.2111%2029.0829Z'%20fill='%23010202'/%3e%3cpath%20d='M43.5737%2023.0435C44.0418%2021.9199%2044.6856%2020.931%2045.5048%2020.0766C46.3241%2019.2222%2047.2956%2018.5492%2048.4192%2018.0576C49.5428%2017.5661%2050.76%2017.3203%2052.0709%2017.3203C53.3583%2017.3203%2054.5522%2017.5544%2055.6524%2018.0225C56.7525%2018.4907%2057.7006%2019.1403%2058.4965%2019.9713C59.2923%2020.8022%2059.9127%2021.7854%2060.3574%2022.9207C60.8022%2024.056%2061.0245%2025.2908%2061.0245%2026.6251V27.7838H46.4529C46.57%2028.5095%2046.8041%2029.1825%2047.1552%2029.8027C47.5064%2030.423%2047.9452%2030.9614%2048.4719%2031.4179C48.9986%2031.8744%2049.5955%2032.2314%2050.2626%2032.4888C50.9298%2032.7463%2051.6378%2032.8751%2052.3869%2032.8751C54.5171%2032.8751%2056.2377%2031.9972%2057.5485%2030.2416L60.1117%2032.1376C59.2222%2033.3315%2058.122%2034.2678%2056.8112%2034.9466C55.5003%2035.6255%2054.0256%2035.9649%2052.387%2035.9649C51.0527%2035.9649%2049.8063%2035.7307%2048.6476%2035.2626C47.4888%2034.7945%2046.4823%2034.139%2045.6279%2033.2963C44.7735%2032.4535%2044.1005%2031.4646%2043.609%2030.3293C43.1174%2029.1941%2042.8716%2027.9592%2042.8716%2026.625C42.8714%2025.361%2043.1056%2024.1671%2043.5737%2023.0435ZM48.507%2021.6565C47.5121%2022.4876%2046.8509%2023.5936%2046.5232%2024.9747H57.4432C57.1388%2023.5936%2056.4892%2022.4876%2055.4944%2021.6565C54.4995%2020.8256%2053.335%2020.4101%2052.0007%2020.4101C50.6664%2020.4101%2049.5019%2020.8256%2048.507%2021.6565Z'%20fill='%23010202'/%3e%3cpath%20d='M67.6607%2022.0604C66.9117%2022.8797%2066.5371%2023.9915%2066.5371%2025.3961V35.5788H62.9907V17.6714H66.5019V19.8835C66.9467%2019.1578%2067.5261%2018.5843%2068.24%2018.163C68.9539%2017.7415%2069.8025%2017.5308%2070.7857%2017.5308H72.0146V20.8314H70.5399C69.3695%2020.8315%2068.4097%2021.2411%2067.6607%2022.0604Z'%20fill='%23010202'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_201_8153'%3e%3crect%20width='72'%20height='48'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
    MicrosoftSvg = "/_app/immutable/assets/Microsoft.CEPf0Ni9.svg";
    NotionSvg = "data:image/svg+xml,%3csvg%20width='129'%20height='48'%20viewBox='0%200%20129%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M44.9356%2034.7749V20.2199H45.1949L55.7896%2034.7749H59.1236V13.4006H55.4192V27.919H55.1598L44.5652%2013.4006H41.2312V34.7749H44.9356ZM69.6071%2035.1049C74.497%2035.1049%2077.4976%2031.9519%2077.4976%2026.6725C77.4976%2021.4297%2074.497%2018.2401%2069.6071%2018.2401C64.7543%2018.2401%2061.7167%2021.4297%2061.7167%2026.6725C61.7537%2031.9519%2064.7173%2035.1049%2069.6071%2035.1049ZM69.6071%2032.0252C67.014%2032.0252%2065.5322%2030.0821%2065.5322%2026.6725C65.5322%2023.2995%2067.014%2021.3198%2069.6071%2021.3198C72.2002%2021.3198%2073.682%2023.2995%2073.682%2026.6725C73.682%2030.0821%2072.2002%2032.0252%2069.6071%2032.0252ZM80.8686%2014.6105V18.68H78.2755V21.6131H80.8686V30.4487C80.8686%2033.6017%2082.3504%2034.8483%2086.1289%2034.8483C86.8327%2034.8483%2087.5366%2034.7749%2088.0922%2034.6649V31.8053C87.6477%2031.8419%2087.3513%2031.8786%2086.8327%2031.8786C85.2769%2031.8786%2084.573%2031.182%2084.573%2029.5688V21.6131H88.0922V18.68H84.573V14.6105H80.8686ZM90.3149%2034.7749H94.0193V18.5701H90.3149V34.7749ZM92.1671%2015.8937C93.3896%2015.8937%2094.3898%2014.9038%2094.3898%2013.6939C94.3898%2012.4474%2093.3896%2011.4575%2092.1671%2011.4575C90.9446%2011.4575%2089.9444%2012.4474%2089.9444%2013.6939C89.9444%2014.9038%2090.9446%2015.8937%2092.1671%2015.8937ZM104.169%2035.1049C109.059%2035.1049%20112.06%2031.9519%20112.06%2026.6725C112.06%2021.4297%20109.059%2018.2401%20104.169%2018.2401C99.3166%2018.2401%2096.279%2021.4297%2096.279%2026.6725C96.279%2031.9519%2099.2426%2035.1049%20104.169%2035.1049ZM104.169%2032.0252C101.576%2032.0252%20100.095%2030.0821%20100.095%2026.6725C100.095%2023.2995%20101.576%2021.3198%20104.169%2021.3198C106.726%2021.3198%20108.244%2023.2995%20108.244%2026.6725C108.207%2030.0821%20106.726%2032.0252%20104.169%2032.0252ZM114.245%2034.7749H117.95V25.3526C117.95%2022.9696%20119.358%2021.4664%20121.543%2021.4664C123.803%2021.4664%20124.84%2022.7129%20124.84%2025.1693V34.7749H128.545V24.2894C128.545%2020.4032%20126.544%2018.2401%20122.914%2018.2401C120.469%2018.2401%20118.839%2019.34%20118.061%2021.1731H117.802V18.5701H114.208C114.245%2018.5701%20114.245%2034.7749%20114.245%2034.7749Z'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.71206%2012.0326C6.79023%2012.9024%207.18021%2012.8337%209.19893%2012.6964L28.2162%2011.5519C28.6291%2011.5519%2028.285%2011.1399%2028.1474%2011.0941L24.9816%208.82806C24.3852%208.37028%2023.5594%207.82093%2022.0224%207.95826L3.62452%209.30874C2.95926%209.37741%202.82162%209.72075%203.0969%209.97254L5.71206%2012.0326ZM6.85905%2016.4502V36.4098C6.85905%2037.4857%207.38667%2037.8748%208.60249%2037.8061L29.5008%2036.593C30.7166%2036.5243%2030.8543%2035.7918%2030.8543%2034.922V15.0998C30.8543%2014.23%2030.5102%2013.7493%2029.7761%2013.818L7.93723%2015.0998C7.13433%2015.1684%206.85905%2015.5804%206.85905%2016.4502ZM27.4821%2017.5261C27.6197%2018.1212%2027.4821%2018.7392%2026.8857%2018.8079L25.8763%2019.0139V33.7547C25.0046%2034.2125%2024.2017%2034.4871%2023.5135%2034.4871C22.4353%2034.4871%2022.16%2034.1438%2021.3571%2033.1367L14.7733%2022.8135V32.7933L16.8609%2033.2511C16.8609%2033.2511%2016.8609%2034.4642%2015.1863%2034.4642L10.5524%2034.7389C10.4148%2034.4642%2010.5524%2033.8005%2011.0112%2033.6631L12.227%2033.3198V20.1355L10.5524%2019.9981C10.4148%2019.403%2010.7589%2018.5332%2011.6994%2018.4645L16.6774%2018.1212L23.5364%2028.5588V19.3343L21.793%2019.1283C21.6553%2018.3959%2022.2059%2017.8465%2022.8712%2017.7778L27.4821%2017.5261ZM2.08754%207.47759L21.2424%206.08133C23.5823%205.87532%2024.2017%206.01266%2025.6698%207.08847L31.7719%2011.3688C32.7812%2012.1013%2033.1253%2012.3073%2033.1253%2013.1084V36.6159C33.1253%2038.0808%2032.5977%2038.9506%2030.7166%2039.0879L8.48779%2040.4384C7.06552%2040.5071%206.40026%2040.3011%205.66618%2039.3626L1.147%2033.5258C0.3441%2032.45%200%2031.6488%200%2030.7104V9.81231C0%208.59917%200.550559%207.61492%202.08754%207.47759Z'%20fill='black'/%3e%3c/svg%3e";
    ClientSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<section id="clients" class="mx-auto max-w-7xl px-6 text-center md:px-8" data-svelte-h="svelte-14f9udj"><div class="py-14"><div class="mx-auto max-w-screen-xl px-4 md:px-8"><h2 class="text-center text-sm font-semibold text-gray-600">TRUSTED BY TEAMS FROM AROUND THE WORLD</h2> <div class="mt-6"><ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white"><li><img alt="Google"${add_attribute("src", GoogleSvg, 0)} class="h-8 w-28 px-2 dark:brightness-0 dark:invert"${add_attribute("width", 28, 0)}${add_attribute("height", 8, 0)}></li> <li><img alt="Microsoft"${add_attribute("src", MicrosoftSvg, 0)} class="h-8 w-28 px-2 dark:brightness-0 dark:invert"${add_attribute("width", 28, 0)}${add_attribute("height", 8, 0)}></li> <li><img alt="GitHub"${add_attribute("src", GitHubSvg, 0)} class="h-8 w-28 px-2 dark:brightness-0 dark:invert"${add_attribute("width", 28, 0)}${add_attribute("height", 8, 0)}></li> <li><img alt="Uber"${add_attribute("src", UberSvg, 0)} class="h-8 w-28 px-2 dark:brightness-0 dark:invert"${add_attribute("width", 28, 0)}${add_attribute("height", 8, 0)}></li> <li><img alt="Notion"${add_attribute("src", NotionSvg, 0)} class="h-8 w-28 px-2 dark:brightness-0 dark:invert"${add_attribute("width", 28, 0)}${add_attribute("height", 8, 0)}></li></ul></div></div></div></section>`;
    });
    Marquee = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { pauseOnHover = false } = $$props;
      let { vertical = false } = $$props;
      let { repeat = 4 } = $$props;
      let { reverse = false } = $$props;
      let { class: className = "" } = $$props;
      if ($$props.pauseOnHover === void 0 && $$bindings.pauseOnHover && pauseOnHover !== void 0) $$bindings.pauseOnHover(pauseOnHover);
      if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0) $$bindings.vertical(vertical);
      if ($$props.repeat === void 0 && $$bindings.repeat && repeat !== void 0) $$bindings.repeat(repeat);
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0) $$bindings.reverse(reverse);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      return `<div${add_attribute(
        "class",
        cn(
          "group flex overflow-hidden p-2 [--duration:2s] [--gap:1rem] [gap:var(--gap)]",
          {
            "flex-row": !vertical,
            "flex-col": vertical
          },
          className
        ),
        0
      )}>${each({ length: repeat }, (_2, i2) => {
        return `<div${add_attribute(
          "class",
          cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse
          }),
          0
        )}>${slots.default ? slots.default({}) : `Default`} </div>`;
      })}</div>`;
    });
    (function(Presence2) {
      Presence2[Presence2["Entering"] = 0] = "Entering";
      Presence2[Presence2["Present"] = 1] = "Present";
      Presence2[Presence2["Exiting"] = 2] = "Exiting";
    })(Presence || (Presence = {}));
    (function(VisibilityAction2) {
      VisibilityAction2[VisibilityAction2["Hide"] = 0] = "Hide";
      VisibilityAction2[VisibilityAction2["Show"] = 1] = "Show";
    })(VisibilityAction || (VisibilityAction = {}));
    SubscriptionManager = /** @class */
    function() {
      function SubscriptionManager2() {
        this.subscriptions = [];
      }
      SubscriptionManager2.prototype.add = function(handler) {
        var _this = this;
        addUniqueItem(this.subscriptions, handler);
        return function() {
          return removeItem(_this.subscriptions, handler);
        };
      };
      SubscriptionManager2.prototype.notify = function(a3, b2, c2) {
        var numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
          return;
        if (numSubscriptions === 1) {
          this.subscriptions[0](a3, b2, c2);
        } else {
          for (var i2 = 0; i2 < numSubscriptions; i2++) {
            var handler = this.subscriptions[i2];
            handler && handler(a3, b2, c2);
          }
        }
      };
      SubscriptionManager2.prototype.getSize = function() {
        return this.subscriptions.length;
      };
      SubscriptionManager2.prototype.clear = function() {
        this.subscriptions.length = 0;
      };
      return SubscriptionManager2;
    }();
    isFloat = function(value) {
      return !isNaN(parseFloat(value));
    };
    MotionValue = /** @class */
    function() {
      function MotionValue2(init2, startStopNotifier) {
        var _this = this;
        this.timeDelta = 0;
        this.lastUpdated = 0;
        this.updateSubscribers = new SubscriptionManager();
        this.velocityUpdateSubscribers = new SubscriptionManager();
        this.renderSubscribers = new SubscriptionManager();
        this.canTrackVelocity = false;
        this.updateAndNotify = function(v2, render) {
          if (render === void 0) {
            render = true;
          }
          _this.prev = _this.current;
          _this.current = v2;
          var _a = getFrameData(), delta2 = _a.delta, timestamp = _a.timestamp;
          if (_this.lastUpdated !== timestamp) {
            _this.timeDelta = delta2;
            _this.lastUpdated = timestamp;
            es_default.postRender(_this.scheduleVelocityCheck);
          }
          if (_this.prev !== _this.current) {
            _this.updateSubscribers.notify(_this.current);
          }
          if (_this.velocityUpdateSubscribers.getSize()) {
            _this.velocityUpdateSubscribers.notify(_this.getVelocity());
          }
          if (render) {
            _this.renderSubscribers.notify(_this.current);
          }
        };
        this.scheduleVelocityCheck = function() {
          return es_default.postRender(_this.velocityCheck);
        };
        this.velocityCheck = function(_a) {
          var timestamp = _a.timestamp;
          if (timestamp !== _this.lastUpdated) {
            _this.prev = _this.current;
            _this.velocityUpdateSubscribers.notify(_this.getVelocity());
          }
        };
        this.hasAnimated = false;
        this.prev = this.current = init2;
        this.canTrackVelocity = isFloat(this.current);
        this.onSubscription = () => {
        };
        this.onUnsubscription = () => {
        };
        if (startStopNotifier) {
          this.onSubscription = () => {
            if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
              const unsub = startStopNotifier();
              this.onUnsubscription = () => {
              };
              if (unsub) {
                this.onUnsubscription = () => {
                  if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
                    unsub();
                  }
                };
              }
            }
          };
        }
      }
      MotionValue2.prototype.onChange = function(subscription) {
        this.onSubscription();
        const unsub = this.updateSubscribers.add(subscription);
        return () => {
          unsub();
          this.onUnsubscription();
        };
      };
      MotionValue2.prototype.subscribe = function(subscription) {
        return this.onChange(subscription);
      };
      MotionValue2.prototype.clearListeners = function() {
        this.updateSubscribers.clear();
        this.onUnsubscription();
      };
      MotionValue2.prototype.onRenderRequest = function(subscription) {
        this.onSubscription();
        subscription(this.get());
        const unsub = this.renderSubscribers.add(subscription);
        return () => {
          unsub();
          this.onUnsubscription();
        };
      };
      MotionValue2.prototype.attach = function(passiveEffect) {
        this.passiveEffect = passiveEffect;
      };
      MotionValue2.prototype.set = function(v2, render) {
        if (render === void 0) {
          render = true;
        }
        if (!render || !this.passiveEffect) {
          this.updateAndNotify(v2, render);
        } else {
          this.passiveEffect(v2, this.updateAndNotify);
        }
      };
      MotionValue2.prototype.update = function(v2) {
        this.set(v2(this.get()));
      };
      MotionValue2.prototype.get = function() {
        this.onSubscription();
        const curr = this.current;
        this.onUnsubscription();
        return curr;
      };
      MotionValue2.prototype.getPrevious = function() {
        return this.prev;
      };
      MotionValue2.prototype.getVelocity = function() {
        this.onSubscription();
        const vel = this.canTrackVelocity ? (
          // These casts could be avoided if parseFloat would be typed better
          velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
        ) : 0;
        this.onUnsubscription();
        return vel;
      };
      MotionValue2.prototype.start = function(animation) {
        var _this = this;
        this.stop();
        return new Promise(function(resolve2) {
          _this.hasAnimated = true;
          _this.stopAnimation = animation(resolve2);
        }).then(function() {
          return _this.clearAnimation();
        });
      };
      MotionValue2.prototype.stop = function() {
        if (this.stopAnimation)
          this.stopAnimation();
        this.clearAnimation();
      };
      MotionValue2.prototype.isAnimating = function() {
        return !!this.stopAnimation;
      };
      MotionValue2.prototype.clearAnimation = function() {
        this.stopAnimation = null;
      };
      MotionValue2.prototype.destroy = function() {
        this.updateSubscribers.clear();
        this.renderSubscribers.clear();
        this.stop();
        this.onUnsubscription();
      };
      return MotionValue2;
    }();
    getDomContext = (name2, el) => {
      if (!el || !window) {
        return void 0;
      }
      let par = el;
      while (par = par.parentNode) {
        if (par.motionDomContext && par.motionDomContext.has(name2)) {
          return par.motionDomContext.get(name2);
        }
      }
      return void 0;
    };
    setDomContext = (name2, el, value) => {
      if (el && window) {
        if (!el.motionDomContext) {
          el.motionDomContext = /* @__PURE__ */ new Map();
        }
        el.motionDomContext.set(name2, value);
      }
    };
    MotionConfigContext = (c2) => getDomContext("MotionConfig", c2) || writable({
      transformPagePoint: function(p2) {
        return p2;
      },
      isStatic: false
    });
    ScaleCorrectionContext = (isCustom) => getDomContext("ScaleCorrection", isCustom) || writable([]);
    ScaleCorrectionParentContext = () => writable([]);
    provideScaleCorrection = (isCustom) => {
      const fromParent = getContext(ScaleCorrectionContext) || ScaleCorrectionContext(isCustom);
      const ctx = ScaleCorrectionContext();
      setContext(ScaleCorrectionContext, ctx);
      setDomContext("ScaleCorrection", isCustom, ctx);
      setContext(ScaleCorrectionParentContext, fromParent);
    };
    ScaleCorrectionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { isCustom } = $$props;
      provideScaleCorrection(isCustom);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      return `${slots.default ? slots.default({}) : ``}`;
    });
    secondsToMilliseconds = function(seconds) {
      return seconds * 1e3;
    };
    easingLookup = {
      linear,
      easeIn,
      easeInOut,
      easeOut,
      circIn,
      circInOut,
      circOut,
      backIn,
      backInOut,
      backOut,
      anticipate,
      bounceIn,
      bounceInOut,
      bounceOut
    };
    easingDefinitionToFunction = function(definition) {
      if (Array.isArray(definition)) {
        var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        return cubicBezier(x1, y1, x2, y2);
      } else if (typeof definition === "string") {
        return easingLookup[definition];
      }
      return definition;
    };
    isEasingArray = function(ease) {
      return Array.isArray(ease) && typeof ease[0] !== "number";
    };
    isAnimatable = function(key2, value) {
      if (key2 === "zIndex")
        return false;
      if (typeof value === "number" || Array.isArray(value))
        return true;
      if (typeof value === "string" && // It's animatable if we have a string
      complex.test(value) && // And it contains numbers and/or colors
      !value.startsWith("url(")) {
        return true;
      }
      return false;
    };
    isKeyframesTarget = function(v2) {
      return Array.isArray(v2);
    };
    underDampedSpring = function() {
      return {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restDelta: 0.5,
        restSpeed: 10
      };
    };
    criticallyDampedSpring = function(to) {
      return {
        type: "spring",
        stiffness: 550,
        damping: to === 0 ? 2 * Math.sqrt(550) : 30,
        restDelta: 0.01,
        restSpeed: 10
      };
    };
    linearTween = function() {
      return {
        type: "keyframes",
        ease: "linear",
        duration: 0.3
      };
    };
    keyframes2 = function(values) {
      return {
        type: "keyframes",
        duration: 0.8,
        values
      };
    };
    defaultTransitions = {
      x: underDampedSpring,
      y: underDampedSpring,
      z: underDampedSpring,
      rotate: underDampedSpring,
      rotateX: underDampedSpring,
      rotateY: underDampedSpring,
      rotateZ: underDampedSpring,
      scaleX: criticallyDampedSpring,
      scaleY: criticallyDampedSpring,
      scale: criticallyDampedSpring,
      opacity: linearTween,
      backgroundColor: linearTween,
      color: linearTween,
      default: criticallyDampedSpring
    };
    getDefaultTransition = function(valueKey, to) {
      var transitionFactory;
      if (isKeyframesTarget(to)) {
        transitionFactory = keyframes2;
      } else {
        transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
      }
      return Object.assign({ to }, transitionFactory(to));
    };
    int = Object.assign(Object.assign({}, number), { transform: Math.round });
    numberValueTypes = {
      // Border props
      borderWidth: px,
      borderTopWidth: px,
      borderRightWidth: px,
      borderBottomWidth: px,
      borderLeftWidth: px,
      borderRadius: px,
      radius: px,
      borderTopLeftRadius: px,
      borderTopRightRadius: px,
      borderBottomRightRadius: px,
      borderBottomLeftRadius: px,
      // Positioning props
      width: px,
      maxWidth: px,
      height: px,
      maxHeight: px,
      size: px,
      top: px,
      right: px,
      bottom: px,
      left: px,
      // Spacing props
      padding: px,
      paddingTop: px,
      paddingRight: px,
      paddingBottom: px,
      paddingLeft: px,
      margin: px,
      marginTop: px,
      marginRight: px,
      marginBottom: px,
      marginLeft: px,
      // Transform props
      rotate: degrees,
      rotateX: degrees,
      rotateY: degrees,
      rotateZ: degrees,
      scale,
      scaleX: scale,
      scaleY: scale,
      scaleZ: scale,
      skew: degrees,
      skewX: degrees,
      skewY: degrees,
      distance: px,
      translateX: px,
      translateY: px,
      translateZ: px,
      x: px,
      y: px,
      z: px,
      perspective: px,
      transformPerspective: px,
      opacity: alpha,
      originX: progressPercentage,
      originY: progressPercentage,
      originZ: px,
      // Misc
      zIndex: int,
      // SVG
      fillOpacity: alpha,
      strokeOpacity: alpha,
      numOctaves: int
    };
    defaultValueTypes = Object.assign(Object.assign({}, numberValueTypes), {
      // Color props
      color,
      backgroundColor: color,
      outlineColor: color,
      fill: color,
      stroke: color,
      // Border props
      borderColor: color,
      borderTopColor: color,
      borderRightColor: color,
      borderBottomColor: color,
      borderLeftColor: color,
      filter,
      WebkitFilter: filter
    });
    getDefaultValueType = function(key2) {
      return defaultValueTypes[key2];
    };
    legacyRepeatWarning = false;
    isNumericalString = function(v2) {
      return /^\-?\d*\.?\d+$/.test(v2);
    };
    isCustomValue = function(v2) {
      return Boolean(v2 && typeof v2 === "object" && v2.mix && v2.toValue);
    };
    resolveFinalValueInKeyframes = function(v2) {
      return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
    };
    testValueType = function(v2) {
      return function(type) {
        return type.test(v2);
      };
    };
    auto = {
      test: function(v2) {
        return v2 === "auto";
      },
      parse: function(v2) {
        return v2;
      }
    };
    dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
    findDimensionValueType = function(v2) {
      return dimensionValueTypes.find(testValueType(v2));
    };
    valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
    findValueType = function(v2) {
      return valueTypes.find(testValueType(v2));
    };
    valueScaleCorrection = {};
    zeroDelta = {
      translate: 0,
      scale: 1,
      origin: 0,
      originPoint: 0
    };
    xKeys = ["x", "scaleX", "originX"];
    yKeys = ["y", "scaleY", "originY"];
    clampProgress = function(v2) {
      return clamp(0, 1, v2);
    };
    isMotionValue = function(value) {
      return value !== null && typeof value === "object" && value.getVelocity;
    };
    createProjectionState = function() {
      return {
        isEnabled: false,
        isTargetLocked: false,
        target: axisBox(),
        targetFinal: axisBox()
      };
    };
    zeroLayout = createLayoutState();
    identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, { x: 1, y: 1 });
    isAnimationControls = function(v2) {
      return typeof v2 === "object" && typeof v2.start === "function";
    };
    (function(AnimationType2) {
      AnimationType2["Animate"] = "animate";
      AnimationType2["Hover"] = "whileHover";
      AnimationType2["Tap"] = "whileTap";
      AnimationType2["Drag"] = "whileDrag";
      AnimationType2["Focus"] = "whileFocus";
      AnimationType2["Exit"] = "exit";
    })(AnimationType || (AnimationType = {}));
    variantPriorityOrder = [
      AnimationType.Animate,
      AnimationType.Hover,
      AnimationType.Tap,
      AnimationType.Drag,
      AnimationType.Focus,
      AnimationType.Exit
    ];
    reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
    numAnimationTypes = variantPriorityOrder.length;
    names = [
      "LayoutMeasure",
      "BeforeLayoutMeasure",
      "LayoutUpdate",
      "ViewportBoxUpdate",
      "Update",
      "Render",
      "AnimationComplete",
      "LayoutAnimationComplete",
      "AnimationStart",
      "SetAxisTarget",
      "Unmount"
    ];
    compareByDepth = function(a3, b2) {
      return a3.depth - b2.depth;
    };
    FlatTree = /** @class */
    function() {
      function FlatTree2() {
        this.children = [];
        this.isDirty = false;
      }
      FlatTree2.prototype.add = function(child) {
        addUniqueItem(this.children, child);
        this.isDirty = true;
      };
      FlatTree2.prototype.remove = function(child) {
        removeItem(this.children, child);
        this.isDirty = true;
      };
      FlatTree2.prototype.forEach = function(callback) {
        this.isDirty && this.children.sort(compareByDepth);
        var numChildren = this.children.length;
        for (var i2 = 0; i2 < numChildren; i2++) {
          callback(this.children[i2]);
        }
      };
      return FlatTree2;
    }();
    visualElement = function(_a) {
      var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps2 = _a.scrapeMotionValuesFromProps;
      return function(_a2, options2) {
        var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState;
        if (options2 === void 0) {
          options2 = {};
        }
        var latestValues = visualState.latestValues, renderState = visualState.renderState;
        var instance;
        var lifecycles = createLifecycles();
        var projection = createProjectionState();
        var projectionParent;
        var leadProjection = projection;
        var leadLatestValues = latestValues;
        var unsubscribeFromLeadVisualElement;
        var layoutState = createLayoutState();
        var crossfader;
        var hasViewportBoxUpdated = false;
        var values = /* @__PURE__ */ new Map();
        var valueSubscriptions = /* @__PURE__ */ new Map();
        var prevMotionValues = {};
        var projectionTargetProgress;
        var baseTarget = Object.assign({}, latestValues);
        var removeFromVariantTree;
        function render() {
          if (!instance)
            return;
          if (element.isProjectionReady()) {
            applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
            updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
          }
          triggerBuild();
          renderInstance(instance, renderState);
        }
        function triggerBuild() {
          var valuesToRender = latestValues;
          if (crossfader && crossfader.isActive()) {
            var crossfadedValues = crossfader.getCrossfadeState(element);
            if (crossfadedValues)
              valuesToRender = crossfadedValues;
          }
          build(element, renderState, valuesToRender, leadProjection, layoutState, options2, props);
        }
        function update2() {
          lifecycles.notifyUpdate(latestValues);
        }
        function updateLayoutProjection() {
          if (!element.isProjectionReady())
            return;
          var delta2 = layoutState.delta, treeScale = layoutState.treeScale;
          var prevTreeScaleX = treeScale.x;
          var prevTreeScaleY = treeScale.y;
          var prevDeltaTransform = layoutState.deltaTransform;
          updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
          hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta2);
          hasViewportBoxUpdated = false;
          var deltaTransform = buildLayoutProjectionTransform(delta2, treeScale);
          if (deltaTransform !== prevDeltaTransform || // Also compare calculated treeScale, for values that rely on this only for scale correction
          prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
            element.scheduleRender();
          }
          layoutState.deltaTransform = deltaTransform;
        }
        function updateTreeLayoutProjection() {
          element.layoutTree.forEach(fireUpdateLayoutProjection);
        }
        function bindToMotionValue(key22, value2) {
          var removeOnChange = value2.onChange(function(latestValue) {
            latestValues[key22] = latestValue;
            props.onUpdate && es_default.update(update2, false, true);
          });
          var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
          valueSubscriptions.set(key22, function() {
            removeOnChange();
            removeOnRenderRequest();
          });
        }
        var initialMotionValues = scrapeMotionValuesFromProps2(props);
        for (var key2 in initialMotionValues) {
          var value = initialMotionValues[key2];
          if (latestValues[key2] !== void 0 && isMotionValue(value)) {
            value.set(latestValues[key2], false);
          }
        }
        var isControllingVariants = checkIfControllingVariants(props);
        var isVariantNode = checkIfVariantNode(props);
        var element = Object.assign(Object.assign({
          treeType,
          /**
           * This is a mirror of the internal instance prop, which keeps
           * VisualElement type-compatible with React's RefObject.
           */
          current: null,
          /**
           * The depth of this visual element within the visual element tree.
           */
          depth: parent ? parent.depth + 1 : 0,
          parent,
          children: /* @__PURE__ */ new Set(),
          /**
           * An ancestor path back to the root visual element. This is used
           * by layout projection to quickly recurse back up the tree.
           */
          path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
          layoutTree: parent ? parent.layoutTree : new FlatTree(),
          /**
           *
           */
          presenceId,
          projection,
          /**
           * If this component is part of the variant tree, it should track
           * any children that are also part of the tree. This is essentially
           * a shadow tree to simplify logic around how to stagger over children.
           */
          variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
          /**
           * Whether this instance is visible. This can be changed imperatively
           * by AnimateSharedLayout, is analogous to CSS's visibility in that
           * hidden elements should take up layout, and needs enacting by the configured
           * render function.
           */
          isVisible: void 0,
          /**
           * Normally, if a component is controlled by a parent's variants, it can
           * rely on that ancestor to trigger animations further down the tree.
           * However, if a component is created after its parent is mounted, the parent
           * won't trigger that mount animation so the child needs to.
           *
           * TODO: This might be better replaced with a method isParentMounted
           */
          manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
          /**
           * This can be set by AnimatePresence to force components that mount
           * at the same time as it to mount as if they have initial={false} set.
           */
          blockInitialAnimation,
          /**
           * Determine whether this component has mounted yet. This is mostly used
           * by variant children to determine whether they need to trigger their
           * own animations on mount.
           */
          isMounted: function() {
            return Boolean(instance);
          },
          mount: function(newInstance) {
            instance = element.current = newInstance;
            element.pointTo(element);
            if (isVariantNode && parent && !isControllingVariants) {
              removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
            }
            parent === null || parent === void 0 ? void 0 : parent.children.add(element);
          },
          /**
           *
           */
          unmount: function() {
            cancelSync.update(update2);
            cancelSync.render(render);
            cancelSync.preRender(element.updateLayoutProjection);
            valueSubscriptions.forEach(function(remove) {
              return remove();
            });
            element.stopLayoutAnimation();
            element.layoutTree.remove(element);
            removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
            parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
            unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
            lifecycles.clearAllListeners();
          },
          /**
           * Add a child visual element to our set of children.
           */
          addVariantChild: function(child) {
            var _a3;
            var closestVariantNode = element.getClosestVariantNode();
            if (closestVariantNode) {
              (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
              return function() {
                return closestVariantNode.variantChildren.delete(child);
              };
            }
          },
          sortNodePosition: function(other) {
            if (!sortNodePosition || treeType !== other.treeType)
              return 0;
            return sortNodePosition(element.getInstance(), other.getInstance());
          },
          /**
           * Returns the closest variant node in the tree starting from
           * this visual element.
           */
          getClosestVariantNode: function() {
            return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
          },
          /**
           * A method that schedules an update to layout projections throughout
           * the tree. We inherit from the parent so there's only ever one
           * job scheduled on the next frame - that of the root visual element.
           */
          scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function() {
            return es_default.preRender(element.updateTreeLayoutProjection, false, true);
          },
          /**
           * Expose the latest layoutId prop.
           */
          getLayoutId: function() {
            return props.layoutId;
          },
          /**
           * Returns the current instance.
           */
          getInstance: function() {
            return instance;
          },
          /**
           * Get/set the latest static values.
           */
          getStaticValue: function(key22) {
            return latestValues[key22];
          },
          setStaticValue: function(key22, value2) {
            return latestValues[key22] = value2;
          },
          /**
           * Returns the latest motion value state. Currently only used to take
           * a snapshot of the visual element - perhaps this can return the whole
           * visual state
           */
          getLatestValues: function() {
            return latestValues;
          },
          /**
           * Set the visiblity of the visual element. If it's changed, schedule
           * a render to reflect these changes.
           */
          setVisibility: function(visibility) {
            if (element.isVisible === visibility)
              return;
            element.isVisible = visibility;
            element.scheduleRender();
          },
          /**
           * Make a target animatable by Popmotion. For instance, if we're
           * trying to animate width from 100px to 100vw we need to measure 100vw
           * in pixels to determine what we really need to animate to. This is also
           * pluggable to support Framer's custom value types like Color,
           * and CSS variables.
           */
          makeTargetAnimatable: function(target, canMutate) {
            if (canMutate === void 0) {
              canMutate = true;
            }
            return makeTargetAnimatable(element, target, props, canMutate);
          },
          // Motion values ========================
          /**
           * Add a motion value and bind it to this visual element.
           */
          addValue: function(key22, value2) {
            if (element.hasValue(key22))
              element.removeValue(key22);
            values.set(key22, value2);
            latestValues[key22] = value2.get();
            bindToMotionValue(key22, value2);
          },
          /**
           * Remove a motion value and unbind any active subscriptions.
           */
          removeValue: function(key22) {
            var _a3;
            values.delete(key22);
            (_a3 = valueSubscriptions.get(key22)) === null || _a3 === void 0 ? void 0 : _a3();
            valueSubscriptions.delete(key22);
            delete latestValues[key22];
            removeValueFromRenderState(key22, renderState);
          },
          /**
           * Check whether we have a motion value for this key
           */
          hasValue: function(key22) {
            return values.has(key22);
          },
          /**
           * Get a motion value for this key. If called with a default
           * value, we'll create one if none exists.
           */
          getValue: function(key22, defaultValue2) {
            var value2 = values.get(key22);
            if (value2 === void 0 && defaultValue2 !== void 0) {
              value2 = motionValue(defaultValue2);
              element.addValue(key22, value2);
            }
            return value2;
          },
          /**
           * Iterate over our motion values.
           */
          forEachValue: function(callback) {
            return values.forEach(callback);
          },
          /**
           * If we're trying to animate to a previously unencountered value,
           * we need to check for it in our state and as a last resort read it
           * directly from the instance (which might have performance implications).
           */
          readValue: function(key22) {
            var _a3;
            return (_a3 = latestValues[key22]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key22, options2);
          },
          /**
           * Set the base target to later animate back to. This is currently
           * only hydrated on creation and when we first read a value.
           */
          setBaseTarget: function(key22, value2) {
            baseTarget[key22] = value2;
          },
          /**
           * Find the base target for a value thats been removed from all animation
           * props.
           */
          getBaseTarget: function(key22) {
            if (getBaseTarget) {
              var target = getBaseTarget(props, key22);
              if (target !== void 0 && !isMotionValue(target))
                return target;
            }
            return baseTarget[key22];
          }
        }, lifecycles), {
          /**
           * Build the renderer state based on the latest visual state.
           */
          build: function() {
            triggerBuild();
            return renderState;
          },
          /**
           * Schedule a render on the next animation frame.
           */
          scheduleRender: function() {
            es_default.render(render, false, true);
          },
          /**
           * Synchronously fire render. It's prefered that we batch renders but
           * in many circumstances, like layout measurement, we need to run this
           * synchronously. However in those instances other measures should be taken
           * to batch reads/writes.
           */
          syncRender: render,
          /**
           * Update the provided props. Ensure any newly-added motion values are
           * added to our map, old ones removed, and listeners updated.
           */
          setProps: function(newProps) {
            props = newProps;
            lifecycles.updatePropListeners(newProps);
            prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps2(props), prevMotionValues);
          },
          getProps: function() {
            return props;
          },
          // Variants ==============================
          /**
           * Returns the variant definition with a given name.
           */
          getVariant: function(name2) {
            var _a3;
            return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name2];
          },
          /**
           * Returns the defined default transition on this component.
           */
          getDefaultTransition: function() {
            return props.transition;
          },
          /**
           * Used by child variant nodes to get the closest ancestor variant props.
           */
          getVariantContext: function(startAtParent) {
            if (startAtParent === void 0) {
              startAtParent = false;
            }
            if (startAtParent)
              return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
            if (!isControllingVariants) {
              var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
              if (props.initial !== void 0) {
                context_1.initial = props.initial;
              }
              return context_1;
            }
            var context = {};
            for (var i2 = 0; i2 < numVariantProps; i2++) {
              var name_1 = variantProps[i2];
              var prop = props[name_1];
              if (isVariantLabel(prop) || prop === false) {
                context[name_1] = prop;
              }
            }
            return context;
          },
          // Layout projection ==============================
          /**
           * Enable layout projection for this visual element. Won't actually
           * occur until we also have hydrated layout measurements.
           */
          enableLayoutProjection: function() {
            projection.isEnabled = true;
            element.layoutTree.add(element);
          },
          /**
           * Lock the projection target, for instance when dragging, so
           * nothing else can try and animate it.
           */
          lockProjectionTarget: function() {
            projection.isTargetLocked = true;
          },
          unlockProjectionTarget: function() {
            element.stopLayoutAnimation();
            projection.isTargetLocked = false;
          },
          getLayoutState: function() {
            return layoutState;
          },
          setCrossfader: function(newCrossfader) {
            crossfader = newCrossfader;
          },
          isProjectionReady: function() {
            return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
          },
          /**
           * Start a layout animation on a given axis.
           */
          startLayoutAnimation: function(axis, transition, isRelative) {
            if (isRelative === void 0) {
              isRelative = false;
            }
            var progress2 = element.getProjectionAnimationProgress()[axis];
            var _a3 = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a3.min, max = _a3.max;
            var length = max - min;
            progress2.clearListeners();
            progress2.set(min);
            progress2.set(min);
            progress2.onChange(function(v2) {
              element.setProjectionTargetAxis(axis, v2, v2 + length, isRelative);
            });
            return element.animateMotionValue(axis, progress2, 0, transition);
          },
          /**
           * Stop layout animations.
           */
          stopLayoutAnimation: function() {
            eachAxis(function(axis) {
              return element.getProjectionAnimationProgress()[axis].stop();
            });
          },
          /**
           * Measure the current viewport box with or without transforms.
           * Only measures axis-aligned boxes, rotate and skew must be manually
           * removed with a re-render to work.
           */
          measureViewportBox: function(withTransform) {
            if (withTransform === void 0) {
              withTransform = true;
            }
            var viewportBox = measureViewportBox(instance, options2);
            if (!withTransform)
              removeBoxTransforms(viewportBox, latestValues);
            return viewportBox;
          },
          /**
           * Get the motion values tracking the layout animations on each
           * axis. Lazy init if not already created.
           */
          getProjectionAnimationProgress: function() {
            projectionTargetProgress || (projectionTargetProgress = {
              x: motionValue(0),
              y: motionValue(0)
            });
            return projectionTargetProgress;
          },
          /**
           * Update the projection of a single axis. Schedule an update to
           * the tree layout projection.
           */
          setProjectionTargetAxis: function(axis, min, max, isRelative) {
            if (isRelative === void 0) {
              isRelative = false;
            }
            var target;
            if (isRelative) {
              if (!projection.relativeTarget) {
                projection.relativeTarget = axisBox();
              }
              target = projection.relativeTarget[axis];
            } else {
              projection.relativeTarget = void 0;
              target = projection.target[axis];
            }
            projection.isHydrated = true;
            target.min = min;
            target.max = max;
            hasViewportBoxUpdated = true;
            lifecycles.notifySetAxisTarget();
          },
          /**
           * Rebase the projection target on top of the provided viewport box
           * or the measured layout. This ensures that non-animating elements
           * don't fall out of sync differences in measurements vs projections
           * after a page scroll or other relayout.
           */
          rebaseProjectionTarget: function(force, box) {
            if (box === void 0) {
              box = layoutState.layout;
            }
            var _a3 = element.getProjectionAnimationProgress(), x2 = _a3.x, y2 = _a3.y;
            var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x2.isAnimating() && !y2.isAnimating();
            if (force || shouldRebase) {
              eachAxis(function(axis) {
                var _a4 = box[axis], min = _a4.min, max = _a4.max;
                element.setProjectionTargetAxis(axis, min, max);
              });
            }
          },
          /**
           * Notify the visual element that its layout is up-to-date.
           * Currently Animate.tsx uses this to check whether a layout animation
           * needs to be performed.
           */
          notifyLayoutReady: function(config) {
            setCurrentViewportBox(element);
            element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
          },
          /**
           * Temporarily reset the transform of the instance.
           */
          resetTransform: function() {
            return resetTransform(element, instance, props);
          },
          restoreTransform: function() {
            return restoreTransform(instance, renderState);
          },
          updateLayoutProjection,
          updateTreeLayoutProjection: function() {
            element.layoutTree.forEach(fireResolveRelativeTargetBox);
            es_default.preRender(updateTreeLayoutProjection, false, true);
          },
          getProjectionParent: function() {
            if (projectionParent === void 0) {
              var foundParent = false;
              for (var i2 = element.path.length - 1; i2 >= 0; i2--) {
                var ancestor = element.path[i2];
                if (ancestor.projection.isEnabled) {
                  foundParent = ancestor;
                  break;
                }
              }
              projectionParent = foundParent;
            }
            return projectionParent;
          },
          resolveRelativeTargetBox: function() {
            var relativeParent = element.getProjectionParent();
            if (!projection.relativeTarget || !relativeParent)
              return;
            calcRelativeBox(projection, relativeParent.projection);
            if (isDraggable(relativeParent)) {
              var target = projection.target;
              applyBoxTransforms(target, target, relativeParent.getLatestValues());
            }
          },
          shouldResetTransform: function() {
            return Boolean(props._layoutResetTransform);
          },
          /**
           *
           */
          pointTo: function(newLead) {
            leadProjection = newLead.projection;
            leadLatestValues = newLead.getLatestValues();
            unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
            unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function() {
              var _a3;
              if (element.isPresent) {
                element.presence = Presence.Present;
              } else {
                (_a3 = element.layoutSafeToRemove) === null || _a3 === void 0 ? void 0 : _a3.call(element);
              }
            }));
          },
          // TODO: Clean this up
          isPresent: true,
          presence: Presence.Entering
        });
        return element;
      };
    };
    variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
    numVariantProps = variantProps.length;
    validMotionProps = /* @__PURE__ */ new Set([
      "initial",
      "animate",
      "exit",
      "style",
      "variants",
      "transition",
      "transformTemplate",
      "transformValues",
      "custom",
      "inherit",
      "layout",
      "layoutId",
      "onLayoutAnimationComplete",
      "onViewportBoxUpdate",
      "onLayoutMeasure",
      "onBeforeLayoutMeasure",
      "onAnimationStart",
      "onAnimationComplete",
      "onUpdate",
      "onDragStart",
      "onDrag",
      "onDragEnd",
      "onMeasureDragConstraints",
      "onDirectionLock",
      "onDragTransitionEnd",
      "drag",
      "dragControls",
      "dragListener",
      "dragConstraints",
      "dragDirectionLock",
      "_dragX",
      "_dragY",
      "dragElastic",
      "dragMomentum",
      "dragPropagation",
      "dragTransition",
      "whileDrag",
      "onPan",
      "onPanStart",
      "onPanEnd",
      "onPanSessionStart",
      "onTap",
      "onTapStart",
      "onTapCancel",
      "onHoverStart",
      "onHoverEnd",
      "whileFocus",
      "whileTap",
      "whileHover"
    ]);
    PresenceContext = (c2) => getDomContext("Presence", c2) || writable(null);
    counter = 0;
    incrementId = () => counter++;
    usePresence = (isCustom = false) => {
      const context = getContext(PresenceContext) || PresenceContext(isCustom);
      const id = get_store_value(context) === null ? void 0 : incrementId();
      if (get_store_value(context) === null) {
        return readable([true, null]);
      }
      return derived(
        context,
        ($v) => !$v.isPresent && $v.onExitComplete ? [false, () => $v.onExitComplete?.(id)] : [true]
      );
    };
    LayoutGroupContext = (c2) => getDomContext("LayoutGroup", c2) || writable(null);
    unresolvedJobs = /* @__PURE__ */ new Set();
    executeJob = function(job) {
      return job();
    };
    defaultHandler = {
      layoutReady: function(child) {
        return child.notifyLayoutReady();
      }
    };
    SharedLayoutContext = (custom2) => getDomContext("SharedLayout", custom2) || writable(createBatcher());
    FramerTreeLayoutContext = () => writable(createBatcher());
    LazyContext = (c2) => getDomContext("Lazy", c2) || writable({ strict: false });
    MotionContext = (c2) => getDomContext("Motion", c2) || writable({});
    UseVisualElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $presenceContext, $$unsubscribe_presenceContext;
      let $config, $$unsubscribe_config;
      let $lazyContext, $$unsubscribe_lazyContext;
      let $layoutGroupId, $$unsubscribe_layoutGroupId;
      let $mc, $$unsubscribe_mc;
      let { createVisualElement = void 0, props, Component, visualState, isCustom } = $$props;
      const config = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_config = subscribe(config, (value) => $config = value);
      const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
      $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
      const lazyContext = getContext(LazyContext) || LazyContext(isCustom);
      $$unsubscribe_lazyContext = subscribe(lazyContext, (value) => $lazyContext = value);
      const mc = getContext(MotionContext) || MotionContext(isCustom);
      $$unsubscribe_mc = subscribe(mc, (value) => $mc = value);
      let parent = get_store_value(mc).visualElement;
      const layoutGroupId = getContext(LayoutGroupContext) || LayoutGroupContext(isCustom);
      $$unsubscribe_layoutGroupId = subscribe(layoutGroupId, (value) => $layoutGroupId = value);
      let layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
      let visualElementRef = void 0;
      if (!createVisualElement) {
        createVisualElement = $lazyContext.renderer;
      }
      let visualElement2 = visualElementRef;
      onDestroy(() => {
        visualElement2?.notifyUnmount();
      });
      if ($$props.createVisualElement === void 0 && $$bindings.createVisualElement && createVisualElement !== void 0) $$bindings.createVisualElement(createVisualElement);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      parent = $mc.visualElement;
      layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
      {
        if (!visualElementRef && createVisualElement) {
          visualElementRef = createVisualElement(Component, {
            visualState,
            parent,
            props: { ...props, layoutId },
            presenceId: $presenceContext?.id,
            blockInitialAnimation: $presenceContext?.initial === false
          });
        }
      }
      visualElement2 = visualElementRef;
      {
        if (visualElement2) {
          visualElement2.setProps({ ...$config, ...props, layoutId });
          visualElement2.isPresent = isPresent($presenceContext);
          visualElement2.isPresenceRoot = !parent || parent.presenceId !== $presenceContext?.id;
          visualElement2.syncRender();
        }
      }
      $$unsubscribe_presenceContext();
      $$unsubscribe_config();
      $$unsubscribe_lazyContext();
      $$unsubscribe_layoutGroupId();
      $$unsubscribe_mc();
      return `${slots.default ? slots.default({ visualElement: visualElement2 }) : ``}`;
    });
    createDefinition = function(propNames) {
      return {
        isEnabled: function(props) {
          return propNames.some(function(name2) {
            return !!props[name2];
          });
        }
      };
    };
    featureDefinitions = {
      measureLayout: createDefinition(["layout", "layoutId", "drag"]),
      animation: createDefinition([
        "animate",
        "exit",
        "variants",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag"
      ]),
      exit: createDefinition(["exit"]),
      drag: createDefinition(["drag", "dragControls"]),
      focus: createDefinition(["whileFocus"]),
      hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
      tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
      pan: createDefinition([
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
      ]),
      layoutAnimation: createDefinition(["layout", "layoutId"])
    };
    UseFeatures = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const featureNames = Object.keys(featureDefinitions);
      const numFeatures = featureNames.length;
      let { visualElement: visualElement2, props } = $$props;
      let features = [];
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      {
        {
          features = [];
          for (let i2 = 0; i2 < numFeatures; i2++) {
            const name2 = featureNames[i2];
            const { isEnabled, Component } = featureDefinitions[name2];
            if (isEnabled(props) && Component) {
              features.push({
                Component,
                key: name2,
                props,
                visualElement: visualElement2
              });
            }
          }
        }
      }
      return `${visualElement2 ? `${slots.default ? slots.default({ features }) : ``}` : ``}`;
    });
    MotionContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { value, isCustom } = $$props;
      let store = writable(value);
      setContext(MotionContext, store);
      setDomContext("Motion", isCustom, store);
      onDestroy(() => {
        value?.visualElement?.unmount();
      });
      if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      {
        store.set(value);
      }
      return `${slots.default ? slots.default({}) : ``}`;
    });
    createHtmlRenderState = function() {
      return {
        style: {},
        transform: {},
        transformKeys: [],
        transformOrigin: {},
        vars: {}
      };
    };
    createSvgRenderState = function() {
      return Object.assign(Object.assign({}, createHtmlRenderState()), { attrs: {} });
    };
    transformAxes = ["", "X", "Y", "Z"];
    order = ["translate", "scale", "rotate", "skew"];
    transformProps = ["transformPerspective", "x", "y", "z"];
    order.forEach(function(operationKey) {
      return transformAxes.forEach(function(axesKey) {
        return transformProps.push(operationKey + axesKey);
      });
    });
    transformPropSet = new Set(transformProps);
    transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
    translateAlias = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective"
    };
    getValueAsType = function(value, type) {
      return type && typeof value === "number" ? type.transform(value) : value;
    };
    UseInitialMotionValues = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let styles;
      let { visualState, isStatic, props } = $$props;
      const memo = () => {
        let state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, void 0, void 0, { enableHardwareAcceleration: !isStatic }, props.transformTemplate);
        const { vars, style } = state;
        return { ...vars, ...style };
      };
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      styles = memo();
      return `${slots.default ? slots.default({ styles }) : ``}`;
    });
    UseStyle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let styleProp;
      let { visualState, props, isStatic } = $$props;
      let style = {};
      const cRVO = copyRawValuesOnly;
      const toStyle = (s1) => {
        Object.assign(style, s1);
        if (props.transformValues) {
          style = props.transformValues(style);
        }
        return style;
      };
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      styleProp = props.style || {};
      {
        cRVO(style, styleProp, props);
      }
      return `${validate_component(UseInitialMotionValues, "UseInitialMotionValues").$$render($$result, { props, visualState, isStatic }, {}, {
        default: ({ styles: s1 }) => {
          return `${slots.default ? slots.default({ styles: toStyle(s1) }) : ``}`;
        }
      })}`;
    });
    UseHTMLProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { props, visualState, isStatic } = $$props;
      const getHTMLProps = (style, props2) => {
        let htmlProps = {};
        if (Boolean(props2.drag)) {
          htmlProps.draggable = false;
          style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
          style.touchAction = props2.drag === true ? "none" : `pan-${props2.drag === "x" ? "y" : "x"}`;
        }
        htmlProps.style = style;
        return htmlProps;
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      return `${validate_component(UseStyle, "UseStyle").$$render($$result, { visualState, props, isStatic }, {}, {
        default: ({ styles }) => {
          return `${slots.default ? slots.default({ visualProps: getHTMLProps(styles, props) }) : ``}`;
        }
      })}`;
    });
    progressToPixels = function(progress2, length) {
      return px.transform(progress2 * length);
    };
    camelKeys = {
      offset: "strokeDashoffset",
      array: "strokeDasharray"
    };
    UseSVGProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let visualProps;
      let { visualState, props } = $$props;
      let memo = () => {
        const state = createSvgRenderState();
        buildSVGAttrs(state, visualState, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
        return {
          ...state.attrs,
          style: { ...state.style }
        };
      };
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      visualProps = memo();
      {
        if (props.style) {
          const rawStyles = {};
          copyRawValuesOnly(rawStyles, props.style, props);
          visualProps.style = { ...rawStyles, ...visualProps.style };
        }
      }
      return `${slots.default ? slots.default({ visualProps }) : ``}`;
    });
    shouldForward = function(key2) {
      return !isValidMotionProp(key2);
    };
    try {
      emotionIsPropValid_1 = __require("@emotion/is-prop-valid").default;
      shouldForward = function(key2) {
        if (key2.startsWith("on")) {
          return !isValidMotionProp(key2);
        } else {
          return emotionIsPropValid_1(key2);
        }
      };
    } catch (_a) {
    }
    UseRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let filteredProps;
      let { props, visualState, Component, forwardMotionProps = false, isStatic, ref, targetEl = void 0 } = $$props;
      const motion2 = (node) => {
        ref(node);
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
      if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0) $$bindings.forwardMotionProps(forwardMotionProps);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0) $$bindings.targetEl(targetEl);
      filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
      {
        if (targetEl) {
          motion2(targetEl);
        }
      }
      return `${validate_component((Component === "SVG" ? UseSVGProps : UseHTMLProps) || missing_component, "svelte:component").$$render($$result, { visualState, isStatic, props }, {}, {
        default: ({ visualProps }) => {
          return `${slots.default ? slots.default({
            motion: motion2,
            props: { ...filteredProps, ...visualProps }
          }) : ``}`;
        }
      })}`;
    });
    cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
    positionalKeys = /* @__PURE__ */ new Set([
      "width",
      "height",
      "top",
      "left",
      "right",
      "bottom",
      "x",
      "y"
    ]);
    isPositionalKey = function(key2) {
      return positionalKeys.has(key2);
    };
    hasPositionalKey = function(target) {
      return Object.keys(target).some(isPositionalKey);
    };
    setAndResetVelocity = function(value, to) {
      value.set(to, false);
      value.set(to);
    };
    isNumOrPxType = function(v2) {
      return v2 === number || v2 === px;
    };
    (function(BoundingBoxDimension2) {
      BoundingBoxDimension2["width"] = "width";
      BoundingBoxDimension2["height"] = "height";
      BoundingBoxDimension2["left"] = "left";
      BoundingBoxDimension2["right"] = "right";
      BoundingBoxDimension2["top"] = "top";
      BoundingBoxDimension2["bottom"] = "bottom";
    })(BoundingBoxDimension || (BoundingBoxDimension = {}));
    getPosFromMatrix = function(matrix, pos) {
      return parseFloat(matrix.split(", ")[pos]);
    };
    getTranslateFromMatrix = function(pos2, pos3) {
      return function(_bbox, _a) {
        var transform = _a.transform;
        if (transform === "none" || !transform)
          return 0;
        var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
        if (matrix3d) {
          return getPosFromMatrix(matrix3d[1], pos3);
        } else {
          var matrix = transform.match(/^matrix\((.+)\)$/);
          if (matrix) {
            return getPosFromMatrix(matrix[1], pos2);
          } else {
            return 0;
          }
        }
      };
    };
    transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
    nonTranslationalTransformKeys = transformProps.filter(function(key2) {
      return !transformKeys.has(key2);
    });
    positionalValues = {
      // Dimensions
      width: function(_a) {
        var x2 = _a.x;
        return x2.max - x2.min;
      },
      height: function(_a) {
        var y2 = _a.y;
        return y2.max - y2.min;
      },
      top: function(_bbox, _a) {
        var top = _a.top;
        return parseFloat(top);
      },
      left: function(_bbox, _a) {
        var left = _a.left;
        return parseFloat(left);
      },
      bottom: function(_a, _b) {
        var y2 = _a.y;
        var top = _b.top;
        return parseFloat(top) + (y2.max - y2.min);
      },
      right: function(_a, _b) {
        var x2 = _a.x;
        var left = _b.left;
        return parseFloat(left) + (x2.max - x2.min);
      },
      // Transform
      x: getTranslateFromMatrix(4, 13),
      y: getTranslateFromMatrix(5, 14)
    };
    convertChangedValueTypes = function(target, visualElement2, changedKeys) {
      var originBbox = visualElement2.measureViewportBox();
      var element = visualElement2.getInstance();
      var elementComputedStyle = getComputedStyle(element);
      var display = elementComputedStyle.display, top = elementComputedStyle.top, left = elementComputedStyle.left, bottom = elementComputedStyle.bottom, right = elementComputedStyle.right, transform = elementComputedStyle.transform;
      var originComputedStyle = { top, left, bottom, right, transform };
      if (display === "none") {
        visualElement2.setStaticValue("display", target.display || "block");
      }
      visualElement2.syncRender();
      var targetBbox = visualElement2.measureViewportBox();
      changedKeys.forEach(function(key2) {
        var value = visualElement2.getValue(key2);
        setAndResetVelocity(value, positionalValues[key2](originBbox, originComputedStyle));
        target[key2] = positionalValues[key2](targetBbox, elementComputedStyle);
      });
      return target;
    };
    checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
      if (origin === void 0) {
        origin = {};
      }
      if (transitionEnd === void 0) {
        transitionEnd = {};
      }
      target = Object.assign({}, target);
      transitionEnd = Object.assign({}, transitionEnd);
      var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
      var removedTransformValues = [];
      var hasAttemptedToRemoveTransformValues = false;
      var changedValueTypeKeys = [];
      targetPositionalKeys.forEach(function(key2) {
        var value = visualElement2.getValue(key2);
        if (!visualElement2.hasValue(key2))
          return;
        var from = origin[key2];
        var to = target[key2];
        var fromType = findDimensionValueType(from);
        var toType;
        if (isKeyframesTarget(to)) {
          var numKeyframes = to.length;
          for (var i2 = to[0] === null ? 1 : 0; i2 < numKeyframes; i2++) {
            if (!toType) {
              toType = findDimensionValueType(to[i2]);
            }
          }
        } else {
          toType = findDimensionValueType(to);
        }
        if (fromType !== toType) {
          if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
            var current = value.get();
            if (typeof current === "string") {
              value.set(parseFloat(current));
            }
            if (typeof to === "string") {
              target[key2] = parseFloat(to);
            } else if (Array.isArray(to) && toType === px) {
              target[key2] = to.map(parseFloat);
            }
          } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
            if (from === 0) {
              value.set(toType.transform(from));
            } else {
              target[key2] = fromType.transform(to);
            }
          } else {
            if (!hasAttemptedToRemoveTransformValues) {
              removedTransformValues = removeNonTranslationalTransform(visualElement2);
              hasAttemptedToRemoveTransformValues = true;
            }
            changedValueTypeKeys.push(key2);
            transitionEnd[key2] = transitionEnd[key2] !== void 0 ? transitionEnd[key2] : target[key2];
            setAndResetVelocity(value, to);
          }
        }
      });
      if (changedValueTypeKeys.length) {
        var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
        if (removedTransformValues.length) {
          removedTransformValues.forEach(function(_a) {
            var _b = __read(_a, 2), key2 = _b[0], value = _b[1];
            visualElement2.getValue(key2).set(value);
          });
        }
        visualElement2.syncRender();
        return { target: convertedTarget, transitionEnd };
      } else {
        return { target, transitionEnd };
      }
    };
    parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
      var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
      target = resolved.target;
      transitionEnd = resolved.transitionEnd;
      return unitConversion(visualElement2, target, origin, transitionEnd);
    };
    htmlConfig = {
      treeType: "dom",
      readValueFromInstance: function(domElement, key2) {
        if (isTransformProp(key2)) {
          var defaultType = getDefaultValueType(key2);
          return defaultType ? defaultType.default || 0 : 0;
        } else {
          var computedStyle = getComputedStyle$1(domElement);
          return (isCSSVariable$1(key2) ? computedStyle.getPropertyValue(key2) : computedStyle[key2]) || 0;
        }
      },
      sortNodePosition: function(a3, b2) {
        return a3.compareDocumentPosition(b2) & 2 ? 1 : -1;
      },
      getBaseTarget: function(props, key2) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key2];
      },
      measureViewportBox: function(element, _a) {
        var transformPagePoint = _a.transformPagePoint;
        return getBoundingBox(element, transformPagePoint);
      },
      /**
       * Reset the transform on the current Element. This is called as part
       * of a batched process across the entire layout tree. To remove this write
       * cycle it'd be interesting to see if it's possible to "undo" all the current
       * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
       * works
       */
      resetTransform: function(element, domElement, props) {
        var transformTemplate = props.transformTemplate;
        domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        element.scheduleRender();
      },
      restoreTransform: function(instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
      },
      removeValueFromRenderState: function(key2, _a) {
        var vars = _a.vars, style = _a.style;
        delete vars[key2];
        delete style[key2];
      },
      /**
       * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
       * can be animated by Motion.
       */
      makeTargetAnimatable: function(element, _a, _b, isMounted) {
        var transformValues = _b.transformValues;
        if (isMounted === void 0) {
          isMounted = true;
        }
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, element);
        if (transformValues) {
          if (transitionEnd)
            transitionEnd = transformValues(transitionEnd);
          if (target)
            target = transformValues(target);
          if (origin)
            origin = transformValues(origin);
        }
        if (isMounted) {
          checkTargetForNewValues(element, target, origin);
          var parsed = parseDomVariant(element, target, origin, transitionEnd);
          transitionEnd = parsed.transitionEnd;
          target = parsed.target;
        }
        return Object.assign({
          transition,
          transitionEnd
        }, target);
      },
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
      build: function(element, renderState, latestValues, projection, layoutState, options2, props) {
        if (element.isVisible !== void 0) {
          renderState.style.visibility = element.isVisible ? "visible" : "hidden";
        }
        var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
        buildHTMLStyles(renderState, latestValues, projection, layoutState, options2, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
      },
      render: renderHTML
    };
    htmlVisualElement = visualElement(htmlConfig);
    CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
    REPLACE_TEMPLATE = "$1-$2";
    camelToDash = function(str) {
      return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
    };
    camelCaseAttributes = /* @__PURE__ */ new Set([
      "baseFrequency",
      "diffuseConstant",
      "kernelMatrix",
      "kernelUnitLength",
      "keySplines",
      "keyTimes",
      "limitingConeAngle",
      "markerHeight",
      "markerWidth",
      "numOctaves",
      "targetX",
      "targetY",
      "surfaceScale",
      "specularConstant",
      "specularExponent",
      "stdDeviation",
      "tableValues",
      "viewBox"
    ]);
    svgVisualElement = visualElement(Object.assign(Object.assign({}, htmlConfig), {
      getBaseTarget: function(props, key2) {
        return props[key2];
      },
      readValueFromInstance: function(domElement, key2) {
        var _a;
        if (isTransformProp(key2)) {
          return ((_a = getDefaultValueType(key2)) === null || _a === void 0 ? void 0 : _a.default) || 0;
        }
        key2 = !camelCaseAttributes.has(key2) ? camelToDash(key2) : key2;
        return domElement.getAttribute(key2);
      },
      scrapeMotionValuesFromProps,
      build: function(_element, renderState, latestValues, projection, layoutState, options2, props) {
        var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
        buildSVGAttrs(renderState, latestValues, projection, layoutState, options2, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
      },
      render: renderSVG
    }));
    createDomVisualElement = function(Component, options2) {
      return Component === "SVG" ? svgVisualElement(options2, { enableHardwareAcceleration: false }) : htmlVisualElement(options2, { enableHardwareAcceleration: true });
    };
    svgMotionConfig = {
      scrapeMotionValuesFromProps,
      createRenderState: createSvgRenderState,
      onMount: function(props, instance, _a) {
        var renderState = _a.renderState, latestValues = _a.latestValues;
        try {
          renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
        } catch (e) {
          renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        if (isPath(instance)) {
          renderState.totalPathLength = instance.getTotalLength();
        }
        buildSVGAttrs(renderState, latestValues, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
        renderSVG(instance, renderState);
      }
    };
    htmlMotionConfig = {
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
      createRenderState: createHtmlRenderState
    };
    UseCreateMotionContext = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $mc, $$unsubscribe_mc;
      let { props, isStatic, isCustom } = $$props;
      let mc = getContext(MotionContext) || MotionContext(isCustom);
      $$unsubscribe_mc = subscribe(mc, (value2) => $mc = value2);
      let { initial: initial2, animate: animate2 } = getCurrentTreeVariants(props, get_store_value(mc));
      const variantLabelsAsDependency = (prop) => {
        return Array.isArray(prop) ? prop.join(" ") : prop;
      };
      const memo = () => {
        return { initial: initial2, animate: animate2 };
      };
      let value = memo();
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ initial: initial2, animate: animate2 } = getCurrentTreeVariants(props, $mc));
      {
        if (isStatic) {
          value = memo(variantLabelsAsDependency(initial2), variantLabelsAsDependency(animate2));
        }
      }
      $$unsubscribe_mc();
      return `${slots.default ? slots.default({ value }) : ``}`;
    });
    makeState = ({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) => {
      const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
        renderState: createRenderState()
      };
      if (onMount) {
        state.mount = (instance) => onMount(props, instance, state);
      }
      return state;
    };
    UseVisualState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $presenceContext, $$unsubscribe_presenceContext;
      let $context, $$unsubscribe_context;
      let { config, props, isStatic, isCustom } = $$props;
      const context = getContext(MotionContext) || MotionContext(isCustom);
      $$unsubscribe_context = subscribe(context, (value) => $context = value);
      const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
      $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
      let state = makeState(config, props, get_store_value(context), get_store_value(presenceContext));
      const ms = makeState;
      if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      {
        if (isStatic) {
          state = ms(config, props, $context, $presenceContext);
        }
      }
      $$unsubscribe_presenceContext();
      $$unsubscribe_context();
      return `${slots.default ? slots.default({ state }) : ``}`;
    });
    Motion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let motionProps;
      let isStatic;
      let $$restProps = compute_rest_props($$props, ["isSVG", "forwardMotionProps", "externalRef", "targetEl"]);
      let $a, $$unsubscribe_a;
      let { isSVG = false, forwardMotionProps = false, externalRef = void 0, targetEl = void 0 } = $$props;
      const isCustom = targetEl;
      let Component = isSVG ? "SVG" : "DOM";
      let createVisualElement = createDomVisualElement;
      let visualStateConfig = isSVG ? svgMotionConfig : htmlMotionConfig;
      const a3 = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_a = subscribe(a3, (value) => $a = value);
      const setContext2 = (c2, v2) => {
        c2.visualElement = v2;
        return v2;
      };
      if ($$props.isSVG === void 0 && $$bindings.isSVG && isSVG !== void 0) $$bindings.isSVG(isSVG);
      if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0) $$bindings.forwardMotionProps(forwardMotionProps);
      if ($$props.externalRef === void 0 && $$bindings.externalRef && externalRef !== void 0) $$bindings.externalRef(externalRef);
      if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0) $$bindings.targetEl(targetEl);
      motionProps = $$restProps;
      ({ isStatic } = $a || {});
      $$unsubscribe_a();
      return `${validate_component(ScaleCorrectionProvider, "ScaleCorrectionProvider").$$render($$result, { isCustom }, {}, {
        default: () => {
          return `${validate_component(UseCreateMotionContext, "UseCreateMotionContext").$$render($$result, { props: motionProps, isStatic, isCustom }, {}, {
            default: ({ value: context }) => {
              return `${validate_component(UseVisualState, "UseVisualState").$$render(
                $$result,
                {
                  config: visualStateConfig,
                  props: motionProps,
                  isStatic,
                  isCustom
                },
                {},
                {
                  default: ({ state: visualState }) => {
                    return `${validate_component(UseVisualElement, "UseVisualElement").$$render(
                      $$result,
                      {
                        Component,
                        visualState,
                        createVisualElement,
                        props: motionProps,
                        isCustom
                      },
                      {},
                      {
                        default: ({ visualElement: visualElement2 }) => {
                          return `${validate_component(UseFeatures, "UseFeatures").$$render(
                            $$result,
                            {
                              visualElement: setContext2(context, visualElement2),
                              props: motionProps
                            },
                            {},
                            {
                              default: ({ features: _features }) => {
                                return `${validate_component(MotionContextProvider, "MotionContextProvider").$$render($$result, { value: context, isCustom }, {}, {
                                  default: () => {
                                    return `${validate_component(UseRender, "UseRender").$$render(
                                      $$result,
                                      {
                                        Component,
                                        props: motionProps,
                                        ref: useMotionRef(visualState, context.visualElement, externalRef),
                                        visualState,
                                        isStatic,
                                        forwardMotionProps
                                      },
                                      {},
                                      {
                                        default: ({ motion: motion2, props: renderProps }) => {
                                          return `${slots.default ? slots.default({ motion: motion2, props: renderProps }) : ``}`;
                                        }
                                      }
                                    )}`;
                                  }
                                })} ${``}`;
                              }
                            }
                          )}`;
                        }
                      }
                    )}`;
                  }
                }
              )}`;
            }
          })}`;
        }
      })}`;
    });
    UseDomEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { ref, eventName, handler = void 0, options: options2 = void 0 } = $$props;
      let cleanup = () => {
      };
      const effect = () => {
        cleanup();
        if (!ref) {
          return () => {
          };
        }
        const element = ref.current;
        if (handler && element) {
          return addDomEvent(element, eventName, handler, options2);
        }
        return () => {
        };
      };
      onDestroy(cleanup);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0) $$bindings.eventName(eventName);
      if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      cleanup = effect();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    defaultPagePoint = { pageX: 0, pageY: 0 };
    wrapHandler = function(handler, shouldFilterPrimaryPointer) {
      if (shouldFilterPrimaryPointer === void 0) {
        shouldFilterPrimaryPointer = false;
      }
      var listener = function(event) {
        return handler(event, extractEventInfo(event));
      };
      return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
    };
    isBrowser3 = typeof window !== "undefined";
    supportsPointerEvents = function() {
      return isBrowser3 && window.onpointerdown === null;
    };
    supportsTouchEvents = function() {
      return isBrowser3 && window.ontouchstart === null;
    };
    supportsMouseEvents = function() {
      return isBrowser3 && window.onmousedown === null;
    };
    mouseEventNames = {
      pointerdown: "mousedown",
      pointermove: "mousemove",
      pointerup: "mouseup",
      pointercancel: "mousecancel",
      pointerover: "mouseover",
      pointerout: "mouseout",
      pointerenter: "mouseenter",
      pointerleave: "mouseleave"
    };
    touchEventNames = {
      pointerdown: "touchstart",
      pointermove: "touchmove",
      pointerup: "touchend",
      pointercancel: "touchcancel"
    };
    UsePointerEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { ref, eventName, handler = void 0, options: options2 = void 0 } = $$props;
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0) $$bindings.eventName(eventName);
      if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0) $$bindings.handler(handler);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
        $$result,
        {
          ref,
          eventName: getPointerEventName(eventName),
          handler: handler && wrapHandler(handler, eventName === "pointerdown"),
          options: options2
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    PanSession = /** @class */
    function() {
      function PanSession2(event, handlers, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
        this.startEvent = null;
        this.lastMoveEvent = null;
        this.lastMoveEventInfo = null;
        this.handlers = {};
        this.updatePoint = function() {
          if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
            return;
          var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
          var isPanStarted = _this.startEvent !== null;
          var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
          if (!isPanStarted && !isDistancePastThreshold)
            return;
          var point2 = info2.point;
          var timestamp2 = getFrameData().timestamp;
          _this.history.push(Object.assign(Object.assign({}, point2), { timestamp: timestamp2 }));
          var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
          if (!isPanStarted) {
            onStart && onStart(_this.lastMoveEvent, info2);
            _this.startEvent = _this.lastMoveEvent;
          }
          onMove && onMove(_this.lastMoveEvent, info2);
        };
        this.handlePointerMove = function(event2, info2) {
          _this.lastMoveEvent = event2;
          _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
          if (isMouseEvent(event2) && event2.buttons === 0) {
            _this.handlePointerUp(event2, info2);
            return;
          }
          es_default.update(_this.updatePoint, true);
        };
        this.handlePointerUp = function(event2, info2) {
          _this.end();
          var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
          var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
          if (_this.startEvent && onEnd) {
            onEnd(event2, panInfo);
          }
          onSessionEnd && onSessionEnd(event2, panInfo);
        };
        if (isTouchEvent(event) && event.touches.length > 1)
          return;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        var info = extractEventInfo(event);
        var initialInfo = transformPoint(info, this.transformPagePoint);
        var point = initialInfo.point;
        var timestamp = getFrameData().timestamp;
        this.history = [Object.assign(Object.assign({}, point), { timestamp })];
        var onSessionStart = handlers.onSessionStart;
        onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
      }
      PanSession2.prototype.updateHandlers = function(handlers) {
        this.handlers = handlers;
      };
      PanSession2.prototype.end = function() {
        this.removeListeners && this.removeListeners();
        cancelSync.update(this.updatePoint);
      };
      return PanSession2;
    }();
    UsePanGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let hasPanEvents;
      let $mcc, $$unsubscribe_mcc;
      let { props, visualElement: visualElement2, isCustom } = $$props;
      let { onPan, onPanStart, onPanEnd, onPanSessionStart } = props;
      let panSession = null;
      const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
      let { transformPagePoint } = get_store_value(mcc);
      let handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
          panSession = null;
          onPanEnd && onPanEnd(event, info);
        }
      };
      function onPointerDown(event) {
        panSession = new PanSession(event, handlers, { transformPagePoint });
      }
      onDestroy(() => panSession && panSession.end());
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ onPan, onPanStart, onPanEnd, onPanSessionStart } = props);
      hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
      ({ transformPagePoint } = $mcc);
      handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
          panSession = null;
          onPanEnd && onPanEnd(event, info);
        }
      };
      $$unsubscribe_mcc();
      return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerdown",
          handler: hasPanEvents && onPointerDown
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    isNodeOrChild = function(parent, child) {
      if (!child) {
        return false;
      } else if (parent === child) {
        return true;
      } else {
        return isNodeOrChild(parent, child.parentElement);
      }
    };
    globalHorizontalLock = createLock("dragHorizontal");
    globalVerticalLock = createLock("dragVertical");
    UseTapGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let onTap;
      let onTapStart;
      let onTapCancel;
      let whileTap;
      let hasPressListeners;
      let { props, visualElement: visualElement2 } = $$props;
      let isPressing = false;
      let cancelPointerEndListeners = null;
      function removePointerEndListener() {
        cancelPointerEndListeners?.();
        cancelPointerEndListeners = null;
      }
      function checkPointerEnd() {
        removePointerEndListener();
        isPressing = false;
        visualElement2.animationState?.setActive(AnimationType.Tap, false);
        return !isDragActive();
      }
      function onPointerUp(event, info) {
        if (!checkPointerEnd()) return;
        !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel?.(event, info) : onTap?.(event, info);
      }
      function onPointerCancel(event, info) {
        if (!checkPointerEnd()) return;
        onTapCancel?.(event, info);
      }
      function onPointerDown(event, info) {
        if (isPressing) return;
        removePointerEndListener();
        isPressing = true;
        cancelPointerEndListeners = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
        onTapStart?.(event, info);
        visualElement2.animationState?.setActive(AnimationType.Tap, true);
      }
      onDestroy(removePointerEndListener);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      ({ onTap, onTapStart, onTapCancel, whileTap } = props);
      hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
      return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerdown",
          handler: hasPressListeners ? onPointerDown : void 0
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    UseHoverGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { props, visualElement: visualElement2 } = $$props;
      let { onHoverStart, onHoverEnd, whileHover } = props;
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      ({ onHoverStart, onHoverEnd, whileHover } = props);
      return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerenter",
          handler: onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0
        },
        {},
        {}
      )} ${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerleave",
          handler: onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0
        },
        {},
        {}
      )} ${slots.default ? slots.default({}) : ``}`;
    });
    UseFocusGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let whileFocus;
      let { props, visualElement: visualElement2 } = $$props;
      const onFocus = () => {
        visualElement2.animationState?.setActive(AnimationType.Focus, true);
      };
      const onBlur = () => {
        visualElement2.animationState?.setActive(AnimationType.Focus, false);
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      ({ whileFocus } = props);
      return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "focus",
          handler: whileFocus ? onFocus : void 0
        },
        {},
        {
          default: () => {
            return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
              $$result,
              {
                ref: visualElement2,
                eventName: "blur",
                handler: whileFocus ? onBlur : void 0
              },
              {},
              {
                default: () => {
                  return `${slots.default ? slots.default({}) : ``}`;
                }
              }
            )}`;
          }
        }
      )}`;
    });
    createMotionClass = (features) => {
      features && loadFeatures(features);
      return Motion;
    };
    gestureAnimations = {
      tap: UseTapGesture,
      focus: UseFocusGesture,
      hover: UseHoverGesture
    };
    defaultElastic = 0.35;
    elementDragControls = /* @__PURE__ */ new WeakMap();
    VisualElementDragControls = /** @class */
    function() {
      function VisualElementDragControls2(_a) {
        var visualElement2 = _a.visualElement;
        this.isDragging = false;
        this.currentDirection = null;
        this.constraints = false;
        this.elastic = axisBox();
        this.props = {};
        this.hasMutatedConstraints = false;
        this.cursorProgress = {
          x: 0.5,
          y: 0.5
        };
        this.originPoint = {};
        this.openGlobalLock = null;
        this.panSession = null;
        this.visualElement = visualElement2;
        this.visualElement.enableLayoutProjection();
        elementDragControls.set(visualElement2, this);
      }
      VisualElementDragControls2.prototype.start = function(originEvent, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
        var onSessionStart = function(event) {
          var _a2;
          _this.stopMotion();
          var initialPoint = getViewportPointFromEvent(event).point;
          (_a2 = _this.cancelLayout) === null || _a2 === void 0 ? void 0 : _a2.call(_this);
          _this.cancelLayout = batchLayout(function(read, write) {
            var ancestors = collectProjectingAncestors(_this.visualElement);
            var children = collectProjectingChildren(_this.visualElement);
            var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
            var hasManuallySetCursorOrigin = false;
            _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
            write(function() {
              tree.forEach(function(element) {
                return element.resetTransform();
              });
            });
            read(function() {
              updateLayoutMeasurement(_this.visualElement);
              children.forEach(updateLayoutMeasurement);
            });
            write(function() {
              tree.forEach(function(element) {
                return element.restoreTransform();
              });
              if (snapToCursor) {
                hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
              }
            });
            read(function() {
              var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());
              if (!isRelativeDrag) {
                _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
              }
              _this.visualElement.scheduleUpdateLayoutProjection();
              var projection = _this.visualElement.projection;
              eachAxis(function(axis) {
                if (!hasManuallySetCursorOrigin) {
                  var _a3 = projection.target[axis], min = _a3.min, max = _a3.max;
                  _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
                }
                var axisValue = _this.getAxisMotionValue(axis);
                if (axisValue) {
                  _this.originPoint[axis] = axisValue.get();
                }
              });
            });
            write(function() {
              flushSync.update();
              flushSync.preRender();
              flushSync.render();
              flushSync.postRender();
            });
            read(function() {
              return _this.resolveDragConstraints();
            });
          });
        };
        var onStart = function(event, info) {
          var _a2, _b2, _c2;
          var _d = _this.props, drag2 = _d.drag, dragPropagation = _d.dragPropagation;
          if (drag2 && !dragPropagation) {
            if (_this.openGlobalLock)
              _this.openGlobalLock();
            _this.openGlobalLock = getGlobalLock(drag2);
            if (!_this.openGlobalLock)
              return;
          }
          flushLayout();
          _this.isDragging = true;
          _this.currentDirection = null;
          (_b2 = (_a2 = _this.props).onDragStart) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, event, info);
          (_c2 = _this.visualElement.animationState) === null || _c2 === void 0 ? void 0 : _c2.setActive(AnimationType.Drag, true);
        };
        var onMove = function(event, info) {
          var _a2, _b2, _c2, _d;
          var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
          if (!dragPropagation && !_this.openGlobalLock)
            return;
          var offset = info.offset;
          if (dragDirectionLock && _this.currentDirection === null) {
            _this.currentDirection = getCurrentDirection(offset);
            if (_this.currentDirection !== null) {
              (_b2 = (_a2 = _this.props).onDirectionLock) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, _this.currentDirection);
            }
            return;
          }
          _this.updateAxis("x", info.point, offset);
          _this.updateAxis("y", info.point, offset);
          (_d = (_c2 = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c2, event, info);
          lastPointerEvent = event;
        };
        var onSessionEnd = function(event, info) {
          return _this.stop(event, info);
        };
        var transformPagePoint = this.props.transformPagePoint;
        this.panSession = new PanSession(originEvent, {
          onSessionStart,
          onStart,
          onMove,
          onSessionEnd
        }, { transformPagePoint });
      };
      VisualElementDragControls2.prototype.resolveDragConstraints = function() {
        var _this = this;
        var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
        var layout = this.visualElement.getLayoutState().layoutCorrected;
        if (dragConstraints) {
          this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout, dragConstraints) : calcRelativeConstraints(layout, dragConstraints);
        } else {
          this.constraints = false;
        }
        this.elastic = resolveDragElastic(dragElastic);
        if (this.constraints && !this.hasMutatedConstraints) {
          eachAxis(function(axis) {
            if (_this.getAxisMotionValue(axis)) {
              _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
            }
          });
        }
      };
      VisualElementDragControls2.prototype.resolveRefConstraints = function(layoutBox, constraints2) {
        var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
        var constraintsElement = constraints2.current;
        invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
        var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
        if (onMeasureDragConstraints) {
          var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
          this.hasMutatedConstraints = !!userConstraints;
          if (userConstraints) {
            measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
          }
        }
        return measuredConstraints;
      };
      VisualElementDragControls2.prototype.cancelDrag = function() {
        var _a, _b;
        this.visualElement.unlockProjectionTarget();
        (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
        this.isDragging = false;
        this.panSession && this.panSession.end();
        this.panSession = null;
        if (!this.props.dragPropagation && this.openGlobalLock) {
          this.openGlobalLock();
          this.openGlobalLock = null;
        }
        (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
      };
      VisualElementDragControls2.prototype.stop = function(event, info) {
        var _a, _b, _c;
        (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
        this.panSession = null;
        var isDragging = this.isDragging;
        this.cancelDrag();
        if (!isDragging)
          return;
        var velocity = info.velocity;
        this.animateDragEnd(velocity);
        (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
      };
      VisualElementDragControls2.prototype.snapToCursor = function(point) {
        var _this = this;
        return eachAxis(function(axis) {
          var drag2 = _this.props.drag;
          if (!shouldDrag(axis, drag2, _this.currentDirection))
            return;
          var axisValue = _this.getAxisMotionValue(axis);
          if (axisValue) {
            var box = _this.visualElement.getLayoutState().layout;
            var length_1 = box[axis].max - box[axis].min;
            var center = box[axis].min + length_1 / 2;
            var offset = point[axis] - center;
            _this.originPoint[axis] = point[axis];
            axisValue.set(offset);
          } else {
            _this.cursorProgress[axis] = 0.5;
            return true;
          }
        }).includes(true);
      };
      VisualElementDragControls2.prototype.updateAxis = function(axis, point, offset) {
        var drag2 = this.props.drag;
        if (!shouldDrag(axis, drag2, this.currentDirection))
          return;
        return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
      };
      VisualElementDragControls2.prototype.updateAxisMotionValue = function(axis, offset) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!offset || !axisValue)
          return;
        var nextValue = this.originPoint[axis] + offset[axis];
        var update2 = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
        axisValue.set(update2);
      };
      VisualElementDragControls2.prototype.updateVisualElementAxis = function(axis, point) {
        var _a;
        var axisLayout = this.visualElement.getLayoutState().layout[axis];
        var axisLength = axisLayout.max - axisLayout.min;
        var axisProgress = this.cursorProgress[axis];
        var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
        this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
      };
      VisualElementDragControls2.prototype.setProps = function(_a) {
        var _b = _a.drag, drag2 = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
        this.props = Object.assign({
          drag: drag2,
          dragDirectionLock,
          dragPropagation,
          dragConstraints,
          dragElastic,
          dragMomentum
        }, remainingProps);
      };
      VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
        var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
        var dragKey = "_drag" + axis.toUpperCase();
        if (this.props[dragKey]) {
          return this.props[dragKey];
        } else if (!layout && layoutId === void 0) {
          return this.visualElement.getValue(axis, 0);
        }
      };
      VisualElementDragControls2.prototype.isLayoutDrag = function() {
        return !this.getAxisMotionValue("x");
      };
      VisualElementDragControls2.prototype.isExternalDrag = function() {
        var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
        return _dragX || _dragY;
      };
      VisualElementDragControls2.prototype.animateDragEnd = function(velocity) {
        var _this = this;
        var _a = this.props, drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
        var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
        var constraints2 = this.constraints || {};
        if (isRelative && Object.keys(constraints2).length && this.isLayoutDrag()) {
          var projectionParent = this.visualElement.getProjectionParent();
          if (projectionParent) {
            var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints2);
            eachAxis(function(axis) {
              var _a2 = relativeConstraints_1[axis], min = _a2.min, max = _a2.max;
              constraints2[axis] = {
                min: isNaN(min) ? void 0 : min,
                max: isNaN(max) ? void 0 : max
              };
            });
          }
        }
        var momentumAnimations = eachAxis(function(axis) {
          var _a2;
          if (!shouldDrag(axis, drag2, _this.currentDirection)) {
            return;
          }
          var transition = (_a2 = constraints2 === null || constraints2 === void 0 ? void 0 : constraints2[axis]) !== null && _a2 !== void 0 ? _a2 : {};
          var bounceStiffness = dragElastic ? 200 : 1e6;
          var bounceDamping = dragElastic ? 40 : 1e7;
          var inertia2 = Object.assign(Object.assign({
            type: "inertia",
            velocity: dragMomentum ? velocity[axis] : 0,
            bounceStiffness,
            bounceDamping,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10
          }, dragTransition), transition);
          return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia2) : _this.visualElement.startLayoutAnimation(axis, inertia2, isRelative);
        });
        return Promise.all(momentumAnimations).then(function() {
          var _a2, _b;
          (_b = (_a2 = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a2);
        });
      };
      VisualElementDragControls2.prototype.stopMotion = function() {
        var _this = this;
        eachAxis(function(axis) {
          var axisValue = _this.getAxisMotionValue(axis);
          axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
        });
      };
      VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!axisValue)
          return;
        var currentValue = axisValue.get();
        axisValue.set(currentValue);
        axisValue.set(currentValue);
        return startAnimation(axis, axisValue, 0, transition);
      };
      VisualElementDragControls2.prototype.scalePoint = function() {
        var _this = this;
        var _a = this.props, drag2 = _a.drag, dragConstraints = _a.dragConstraints;
        if (!isRefObject(dragConstraints) || !this.constraintsBox)
          return;
        this.stopMotion();
        var boxProgress = { x: 0, y: 0 };
        eachAxis(function(axis) {
          boxProgress[axis] = calcOrigin$1(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
        });
        this.updateConstraints(function() {
          eachAxis(function(axis) {
            if (!shouldDrag(axis, drag2, null))
              return;
            var _a2 = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a2.min, max = _a2.max;
            _this.visualElement.setProjectionTargetAxis(axis, min, max);
          });
        });
        setTimeout(flushLayout, 1);
      };
      VisualElementDragControls2.prototype.updateConstraints = function(onReady) {
        var _this = this;
        this.cancelLayout = batchLayout(function(read, write) {
          var ancestors = collectProjectingAncestors(_this.visualElement);
          write(function() {
            return ancestors.forEach(function(element) {
              return element.resetTransform();
            });
          });
          read(function() {
            return updateLayoutMeasurement(_this.visualElement);
          });
          write(function() {
            return ancestors.forEach(function(element) {
              return element.restoreTransform();
            });
          });
          read(function() {
            _this.resolveDragConstraints();
          });
          if (onReady)
            write(onReady);
        });
      };
      VisualElementDragControls2.prototype.mount = function(visualElement2) {
        var _this = this;
        var element = visualElement2.getInstance();
        var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
          var _a = _this.props, drag2 = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
          drag2 && dragListener && _this.start(event);
        });
        var stopResizeListener = addDomEvent(window, "resize", function() {
          _this.scalePoint();
        });
        var stopLayoutUpdateListener = visualElement2.onLayoutUpdate(function() {
          if (_this.isDragging) {
            _this.resolveDragConstraints();
          }
        });
        var prevDragCursor = visualElement2.prevDragCursor;
        if (prevDragCursor) {
          this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
        }
        return function() {
          stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
          stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
          stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
          _this.cancelDrag();
        };
      };
      return VisualElementDragControls2;
    }();
    UseDrag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $mcc, $$unsubscribe_mcc;
      let { visualElement: visualElement2, props, isCustom } = $$props;
      const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
      let dragControls = new VisualElementDragControls({ visualElement: visualElement2 });
      let cleanup;
      const dragEffect = () => {
        if (cleanup) {
          cleanup();
        }
        if (groupDragControls) {
          cleanup = groupDragControls.subscribe(dragControls);
        }
      };
      let { dragControls: groupDragControls } = props;
      let { transformPagePoint } = get_store_value(mcc);
      dragControls.setProps({ ...props, transformPagePoint });
      onDestroy(() => {
        if (cleanup) {
          cleanup();
        }
      });
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ dragControls: groupDragControls } = props);
      ({ transformPagePoint } = $mcc);
      {
        dragControls.setProps({ ...props, transformPagePoint });
      }
      {
        dragEffect();
      }
      $$unsubscribe_mcc();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    drag = {
      pan: UsePanGesture,
      drag: UseDrag
    };
    Animate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visualElement: visualElement2, layout = void 0, safeToRemove } = $$props;
      let stopAxisAnimation = { x: void 0, y: void 0 };
      let unsubLayoutReady;
      onDestroy(() => {
        unsubLayoutReady();
        eachAxis((axis) => stopAxisAnimation[axis]?.());
      });
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0) $$bindings.layout(layout);
      if ($$props.safeToRemove === void 0 && $$bindings.safeToRemove && safeToRemove !== void 0) $$bindings.safeToRemove(safeToRemove);
      return ``;
    });
    AnimateLayoutContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $presence, $$unsubscribe_presence;
      let { visualElement: visualElement2, props, isCustom } = $$props;
      let { layout } = props;
      const presence = usePresence(isCustom);
      $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ layout } = props);
      $$unsubscribe_presence();
      return `${validate_component(Animate, "Animate").$$render(
        $$result,
        {
          visualElement: visualElement2,
          layout,
          safeToRemove: $presence[1]
        },
        {},
        {}
      )}`;
    });
    Measure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visualElement: visualElement2, syncLayout, framerSyncLayout, update: update2 } = $$props;
      const scaleCorrectionContext = getContext(ScaleCorrectionContext);
      const scaleCorrectionParentContext = getContext(ScaleCorrectionParentContext);
      let updated2 = false;
      const updater = (nc = false) => {
        if (updated2) {
          return null;
        }
        updated2 = true;
        get_store_value(scaleCorrectionContext).forEach((v2) => {
          v2.updater?.(true);
        });
        if (isSharedLayout(syncLayout)) {
          syncLayout.syncUpdate();
        } else {
          snapshotViewportBox(visualElement2, nc);
          syncLayout.add(visualElement2);
        }
        return null;
      };
      const afterU = (nc = false) => {
        updated2 = false;
        const scc = get_store_value(scaleCorrectionContext);
        scc.forEach((v2, i2) => {
          v2.afterU?.(true);
        });
        if (!isSharedLayout(syncLayout)) {
          syncLayout.flush();
        }
      };
      scaleCorrectionParentContext.update((v2) => v2.concat([{ updater, afterU }]));
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.syncLayout === void 0 && $$bindings.syncLayout && syncLayout !== void 0) $$bindings.syncLayout(syncLayout);
      if ($$props.framerSyncLayout === void 0 && $$bindings.framerSyncLayout && framerSyncLayout !== void 0) $$bindings.framerSyncLayout(framerSyncLayout);
      if ($$props.update === void 0 && $$bindings.update && update2 !== void 0) $$bindings.update(update2);
      update2 !== void 0 && updater(update2);
      return ``;
    });
    MeasureContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let update2;
      let $syncLayout, $$unsubscribe_syncLayout;
      let $framerSyncLayout, $$unsubscribe_framerSyncLayout;
      let { visualElement: visualElement2, props, isCustom } = $$props;
      const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);
      $$unsubscribe_syncLayout = subscribe(syncLayout, (value) => $syncLayout = value);
      const framerSyncLayout = getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext();
      $$unsubscribe_framerSyncLayout = subscribe(framerSyncLayout, (value) => $framerSyncLayout = value);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ update: update2 } = props);
      $$unsubscribe_syncLayout();
      $$unsubscribe_framerSyncLayout();
      return `${validate_component(Measure, "Measure").$$render(
        $$result,
        {
          syncLayout: $syncLayout,
          framerSyncLayout: $framerSyncLayout,
          visualElement: visualElement2,
          update: update2
        },
        {},
        {}
      )}`;
    });
    layoutAnimations = {
      measureLayout: MeasureContextProvider,
      layoutAnimation: AnimateLayoutContextProvider
    };
    AnimationState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visualElement: visualElement2, props } = $$props;
      let { animate: animate2 } = props;
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      ({ animate: animate2 } = props);
      {
        {
          visualElement2.animationState = visualElement2.animationState || createAnimationState(visualElement2);
        }
      }
      {
        if (isAnimationControls(animate2)) {
          tick().then(() => animate2.subscribe(visualElement2));
        }
      }
      return ``;
    });
    Exit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let custom2;
      let $presence, $$unsubscribe_presence;
      let $presenceContext, $$unsubscribe_presenceContext;
      let { props, visualElement: visualElement2, isCustom } = $$props;
      const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
      $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
      const presence = usePresence(isCustom);
      $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
      const effect = (pres) => {
        const [isPresent2, onExitComplete] = pres;
        const animation = visualElement2.animationState?.setActive(AnimationType.Exit, !isPresent2, {
          custom: $presenceContext?.custom ?? custom2
        });
        !isPresent2 && animation?.then(onExitComplete);
        return "";
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ custom: custom2 } = props);
      {
        effect($presence);
      }
      $$unsubscribe_presence();
      $$unsubscribe_presenceContext();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    animations = {
      animation: AnimationState,
      exit: Exit
    };
    featureBundle = {
      ...animations,
      ...gestureAnimations,
      ...drag,
      ...layoutAnimations
    };
    motion = //createMotionProxy(allMotionFeatures);
    /* @__PURE__ */ createMotionClass(featureBundle);
    useAnimation = () => {
      const controls = animationControls(() => {
        const cleanup = {};
        tick().then((v2) => cleanup.clean = controls.mount());
        return () => {
          cleanup.clean?.();
        };
      });
      return controls;
    };
    Promise.resolve();
    CtaCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { id = crypto.randomUUID().slice(0, 6) } = $$props;
      let controls = useAnimation();
      if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
      return `${validate_component(motion, "Motion").$$render(
        $$result,
        {
          initial: { opacity: 0 },
          animate: controls
        },
        {},
        {
          default: ({ motion: motion2 }) => {
            return `<div${add_attribute("id", id, 0)}${add_attribute(
              "class",
              cn(
                "relative size-20 cursor-pointer overflow-hidden rounded-2xl border p-4",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
              ),
              0
            )}>${slots.default ? slots.default({}) : ``}</div>`;
          }
        }
      )}`;
    });
    CtaSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let tiles = [
        {
          icon: Heart_handshake,
          bg: "pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px]"
        },
        {
          icon: Globe,
          bg: "pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px]"
        },
        {
          icon: File2,
          bg: "pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-[20px]"
        },
        {
          icon: Shield,
          bg: "pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-[20px]"
        },
        {
          icon: Rss,
          bg: "pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px]"
        },
        {
          icon: Chart_no_axes_column_increasing,
          bg: "pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px]"
        }
      ];
      let randomTiles1 = shuffleArray(tiles);
      let randomTiles2 = shuffleArray(tiles);
      let randomTiles3 = shuffleArray(tiles);
      let randomTiles4 = shuffleArray(tiles);
      return `<section id="cta"><div class="py-14"><div class="flex w-full flex-col items-center justify-center"><div class="relative flex w-full flex-col items-center justify-center overflow-hidden">${validate_component(Marquee, "Marquee").$$render(
        $$result,
        {
          reverse: true,
          class: "-delay-[200ms] [--duration:10s]",
          repeat: 5
        },
        {},
        {
          default: () => {
            return `${each(randomTiles1, ({ icon, bg }, id) => {
              return `${validate_component(CtaCard, "CtaCard").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "size-full" }, {}, {})} <div${add_attribute("class", bg, 0)}></div> `;
                }
              })}`;
            })}`;
          }
        }
      )} ${validate_component(Marquee, "Marquee").$$render(
        $$result,
        {
          reverse: true,
          class: "[--duration:25s]",
          repeat: 5
        },
        {},
        {
          default: () => {
            return `${each(randomTiles2, ({ icon, bg }, id) => {
              return `${validate_component(CtaCard, "CtaCard").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "size-full" }, {}, {})} <div${add_attribute("class", bg, 0)}></div> `;
                }
              })}`;
            })}`;
          }
        }
      )} ${validate_component(Marquee, "Marquee").$$render(
        $$result,
        {
          reverse: true,
          class: "-delay-[200ms] [--duration:20s]",
          repeat: 5
        },
        {},
        {
          default: () => {
            return `${each(randomTiles1, ({ icon, bg }, id) => {
              return `${validate_component(CtaCard, "CtaCard").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "size-full" }, {}, {})} <div${add_attribute("class", bg, 0)}></div> `;
                }
              })}`;
            })}`;
          }
        }
      )} ${validate_component(Marquee, "Marquee").$$render(
        $$result,
        {
          reverse: true,
          class: "[--duration:30s]",
          repeat: 5
        },
        {},
        {
          default: () => {
            return `${each(randomTiles2, ({ icon, bg }, id) => {
              return `${validate_component(CtaCard, "CtaCard").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "size-full" }, {}, {})} <div${add_attribute("class", bg, 0)}></div> `;
                }
              })}`;
            })}`;
          }
        }
      )} ${validate_component(Marquee, "Marquee").$$render(
        $$result,
        {
          reverse: true,
          class: "-delay-[200ms] [--duration:20s]",
          repeat: 5
        },
        {},
        {
          default: () => {
            return `${each(randomTiles3, ({ icon, bg }, id) => {
              return `${validate_component(CtaCard, "CtaCard").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "size-full" }, {}, {})} <div${add_attribute("class", bg, 0)}></div> `;
                }
              })}`;
            })}`;
          }
        }
      )} ${validate_component(Marquee, "Marquee").$$render(
        $$result,
        {
          reverse: true,
          class: "[--duration:30s]",
          repeat: 5
        },
        {},
        {
          default: () => {
            return `${each(randomTiles4, ({ icon, bg }, id) => {
              return `${validate_component(CtaCard, "CtaCard").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "size-full" }, {}, {})} <div${add_attribute("class", bg, 0)}></div> `;
                }
              })}`;
            })}`;
          }
        }
      )} <div class="absolute z-10"><div class="mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">${validate_component(Heart_handshake, "HeartHandshake").$$render(
        $$result,
        {
          class: "mx-auto size-16 text-black dark:text-white lg:size-24"
        },
        {},
        {}
      )}</div> <div class="z-10 mt-4 flex flex-col items-center text-center text-primary"><h1 class="text-3xl font-bold lg:text-4xl" data-svelte-h="svelte-769go9">Stop wasting time on design.</h1> <p class="mt-2" data-svelte-h="svelte-92niu3">Start your 7-day free trial. No credit card required.</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "lg",
          variant: "outline",
          href: "#",
          class: "group mt-4 rounded-[2rem] px-6"
        },
        {},
        {
          default: () => {
            return `Get Started
							${validate_component(Chevron_right, "ChevronRight").$$render(
              $$result,
              {
                class: "ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1"
              },
              {},
              {}
            )}`;
          }
        }
      )}</div> <div class="bg-backtround absolute inset-0 -z-10 rounded-full opacity-40 blur-xl dark:bg-background"></div></div> <div class="to-backtround absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-70% dark:to-background"></div></div></div></div></section>`;
    });
    AnimatedShinyText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { shimmerWidth = 100 } = $$props;
      let { class: className = "" } = $$props;
      if ($$props.shimmerWidth === void 0 && $$bindings.shimmerWidth && shimmerWidth !== void 0) $$bindings.shimmerWidth(shimmerWidth);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      return `<p${add_attribute(
        "class",
        cn(
          "mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50 ",
          // Shimmer effect
          "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
          // Shimmer gradient
          "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80",
          className
        ),
        0
      )}${add_styles({ "--shimmer-width": `${shimmerWidth}px` })}>${slots.default ? slots.default({}) : `Shimmer Animation`}</p>`;
    });
    BorderBeam = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { size = 200 } = $$props;
      let { duration = 15 } = $$props;
      let { anchor = 90 } = $$props;
      let { borderWidth = 1.5 } = $$props;
      let { colorFrom = "#ffaa40" } = $$props;
      let { colorTo = "#9c40ff" } = $$props;
      let { delay = 0 } = $$props;
      let delaySec = delay + "s";
      let { class: className = "" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
      if ($$props.anchor === void 0 && $$bindings.anchor && anchor !== void 0) $$bindings.anchor(anchor);
      if ($$props.borderWidth === void 0 && $$bindings.borderWidth && borderWidth !== void 0) $$bindings.borderWidth(borderWidth);
      if ($$props.colorFrom === void 0 && $$bindings.colorFrom && colorFrom !== void 0) $$bindings.colorFrom(colorFrom);
      if ($$props.colorTo === void 0 && $$bindings.colorTo && colorTo !== void 0) $$bindings.colorTo(colorTo);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0) $$bindings.delay(delay);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      return `<div${add_attribute(
        "class",
        cn(
          "pointer-events-none absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
          // mask styles
          "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
          // pseudo styles
          "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
          className
        ),
        0
      )}${add_styles({
        "--border-width": borderWidth,
        "--size": size,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": delaySec,
        "--anchor": anchor,
        "--duration": duration
      })}></div>`;
    });
    HeroDarkImg = "/_app/immutable/assets/hero-dark.CHQXafxr.png";
    HeroLightImg = "/_app/immutable/assets/hero-light.c90KfZgv.png";
    HeroSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<section id="hero" class="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8"><div class="backdrop-filter-[12px] group inline-flex h-7 -translate-y-4 animate-fade-in items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black">${validate_component(AnimatedShinyText, "AnimatedShinyText").$$render(
        $$result,
        {
          class: "inline-flex items-center justify-center"
        },
        {},
        {
          default: () => {
            return `<span data-svelte-h="svelte-1wjk0pb">\u2728 Introducing Svee UI Template</span> ${escape(" ")} ${validate_component(Arrow_right, "ArrowRightIcon").$$render(
              $$result,
              {
                class: "ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
              },
              {},
              {}
            )}`;
          }
        }
      )}</div> <h1 class="-translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">Svee UI is the new way
		<br class="hidden md:block"> ${escape(" ")}
		to build landing pages.</h1> <p class="mb-12 -translate-y-4 animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">Beautifully designed, animated components and templates built with
		<br class="hidden md:block"> ${escape(" ")}
		Tailwind CSS, <a href="https://svelte.dev" class="underline underline-offset-2" data-svelte-h="svelte-jvpu8c">Svelte</a>, and
		<a href="https://animation-svelte.vercel.app" class="underline underline-offset-2" data-svelte-h="svelte-1jjqd15">Svelte Animations</a>.</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          class: "-translate-y-4 animate-fade-in gap-1 rounded-lg text-white opacity-0 ease-in-out [--animation-delay:600ms] dark:text-black"
        },
        {},
        {
          default: () => {
            return `<span data-svelte-h="svelte-q589x6">Get Started for free</span> ${validate_component(Arrow_right, "ArrowRightIcon").$$render(
              $$result,
              {
                class: "ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
              },
              {},
              {}
            )}`;
          }
        }
      )} <div class="relative mt-32 animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"><div class="${"rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] " + escape("", true)}">${validate_component(BorderBeam, "BorderBeam").$$render(
        $$result,
        {
          size: 200,
          duration: 12,
          delay: 0,
          colorFrom: "var(--color-one)",
          colorTo: "var(--color-two)"
        },
        {},
        {}
      )} <img${add_attribute("src", HeroDarkImg, 0)} alt="HeroDarkImage" class="relative hidden size-full rounded-[inherit] border object-contain dark:block"> <img${add_attribute("src", HeroLightImg, 0)} alt="HeroLightImage" class="relative block size-full rounded-[inherit] border object-contain dark:hidden"></div></div></section>`;
    });
    Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "checked"]);
      let { class: className = void 0 } = $$props;
      let { checked = void 0 } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        $$rendered = `${validate_component(Switch$1, "SwitchPrimitive.Root").$$render(
          $$result,
          Object.assign(
            {},
            {
              class: cn("focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)
            },
            $$restProps,
            { checked }
          ),
          {
            checked: ($$value) => {
              checked = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(Switch_thumb, "SwitchPrimitive.Thumb").$$render(
                $$result,
                {
                  class: cn("bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
                },
                {},
                {}
              )}`;
            }
          }
        )}`;
      } while (!$$settled);
      return $$rendered;
    });
    PricingSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let productPrices = [
        {
          id: "price_1",
          name: "Basic",
          description: "A basic plan for startups and individual users",
          features: [
            "AI-powered analytics",
            "Basic support",
            "5 projects limit",
            "Access to basic AI tools"
          ],
          monthlyPrice: 1e3,
          yearlyPrice: 1e4,
          isMostPopular: false
        },
        {
          id: "price_2",
          name: "Premium",
          description: "A premium plan for growing businesses",
          features: [
            "Advanced AI insights",
            "Priority support",
            "Unlimited projects",
            "Access to all AI tools",
            "Custom integrations"
          ],
          monthlyPrice: 2e3,
          yearlyPrice: 2e4,
          isMostPopular: true
        },
        {
          id: "price_5",
          name: "Enterprise",
          description: "An enterprise plan with advanced features for large organizations",
          features: [
            "Custom AI solutions",
            "24/7 dedicated support",
            "Unlimited projects",
            "Access to all AI tools",
            "Custom integrations",
            "Data security and compliance"
          ],
          monthlyPrice: 5e3,
          yearlyPrice: 5e4,
          isMostPopular: false
        },
        {
          id: "price_6",
          name: "Ultimate",
          description: "The ultimate plan with all features for industry leaders",
          features: [
            "Bespoke AI development",
            "White-glove support",
            "Unlimited projects",
            "Priority access to new AI tools",
            "Custom integrations",
            "Highest data security and compliance"
          ],
          monthlyPrice: 8e3,
          yearlyPrice: 8e4,
          isMostPopular: false
        }
      ];
      let interval = "month";
      let isLoading = false;
      if ($$props.toHumanPrice === void 0 && $$bindings.toHumanPrice && toHumanPrice !== void 0) $$bindings.toHumanPrice(toHumanPrice);
      return `<section id="pricing"><div class="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8"><div class="mx-auto max-w-5xl text-center"><h4 class="text-xl font-bold tracking-tight text-black dark:text-white" data-svelte-h="svelte-269wum">Pricing</h4> <h2 class="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl" data-svelte-h="svelte-128ewby">Simple pricing for everyone.</h2> <p class="mt-6 text-xl leading-8 text-black/80 dark:text-white">Choose an
				${escape(" ")} <strong data-svelte-h="svelte-1mqbli9">affordable plan</strong> ${escape(" ")}
				that&#39;s packed with the best features for engaging your audience, creating customer loyalty,
				and driving sales.</p></div> <div class="flex w-full items-center justify-center space-x-2">${validate_component(Switch, "Switch").$$render($$result, { id: "interval" }, {}, {})} <span data-svelte-h="svelte-16c2m9h">Annual</span> <span class="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black" data-svelte-h="svelte-8y5ics">2 MONTHS FREE \u2728</span></div> <div class="mx-auto grid w-full flex-col justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">${each(productPrices, (price, id) => {
        return `<div${add_attribute(
          "class",
          cn("relative flex max-w-[400px] flex-col gap-8 overflow-hidden rounded-2xl border p-4 text-black dark:text-white", {
            "border-2 border-[var(--color-one)] dark:border-[var(--color-one)]": price.isMostPopular
          }),
          0
        )}><div class="flex items-center"><div class="ml-4"><h2 class="text-base font-semibold leading-7">${escape(price.name)}</h2> <p class="h-12 text-sm leading-5 text-black/70 dark:text-white">${escape(price.description)}</p> </div></div> <div class="flex flex-row gap-1"><span class="text-4xl font-bold text-black dark:text-white">${`$${escape(toHumanPrice(price.monthlyPrice, 0))}`} <span class="text-xs">/ ${escape(interval)} </span></span> </div> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            class: cn("group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter", "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"),
            disabled: isLoading
          },
          {},
          {
            default: () => {
              return `<span class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black"></span> ${`${`Subscribe`}`} `;
            }
          }
        )} <hr class="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"> ${price.features && price.features.length > 0 ? `<ul class="flex flex-col gap-2 font-normal">${each(price.features, (feature, idx) => {
          return `<li class="flex items-center gap-3 text-xs font-medium text-black dark:text-white">${validate_component(Check, "CheckIcon").$$render(
            $$result,
            {
              class: "size-5 shrink-0  rounded-full bg-green-400 p-[2px] text-black dark:text-white"
            },
            {},
            {}
          )} <span class="flex">${escape(feature)}</span> </li>`;
        })} </ul>` : ``} </div>`;
      })}</div></div></section>`;
    });
    SphereMask = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { reverse = false } = $$props;
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0) $$bindings.reverse(reverse);
      return `<div${add_attribute(
        "class",
        cn(
          // color
          "[--color:var(--color-one)]",
          "pointer-events-none relative  mx-auto h-[50rem] overflow-hidden",
          // sphere mask
          "[mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)]",
          // reverse
          reverse ? "my-[-22rem] rotate-180 md:mt-[-30rem]" : "my-[-18.8rem]",
          // before
          "before:absolute before:inset-0 before:size-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)]",
          // after
          "after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background"
        ),
        0
      )}></div>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<!-- HEAD_svelte-sc8jpu_START -->${$$result.title = `<title>${escape(seo.title)}</title>`, ""}<meta name="description"${add_attribute("content", seo.description, 0)}><meta name="keywords"${add_attribute("content", seo.keywords, 0)}><meta property="og:title"${add_attribute("content", seo.title, 0)}><meta property="og:description"${add_attribute("content", seo.description, 0)}><meta property="og:image"${add_attribute("content", seo.image, 0)}><meta property="og:site_name"${add_attribute("content", seo.title, 0)}><meta property="og:url"${add_attribute("content", seo.url, 0)}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${add_attribute("content", seo.title, 0)}><meta name="twitter:description"${add_attribute("content", seo.description, 0)}><meta name="twitter:image"${add_attribute("content", seo.image, 0)}><meta name="twitter:site" content="@Sikandar_Bhide"><!-- HEAD_svelte-sc8jpu_END -->`, ""} ${validate_component(HeroSection, "HeroSection").$$render($$result, {}, {}, {})} ${validate_component(ClientSection, "ClientSection").$$render($$result, {}, {}, {})} ${validate_component(SphereMask, "SphereMask").$$render($$result, {}, {}, {})} ${validate_component(PricingSection, "PricingSection").$$render($$result, {}, {}, {})} ${validate_component(CtaSection, "CtaSection").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports5 = ["_app/immutable/nodes/4.T4p21GSo.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/spread.DCI-Q8-Y.js", "_app/immutable/chunks/Icon.C7FeuGwB.js", "_app/immutable/chunks/index.7X9LQzY4.js", "_app/immutable/chunks/index.BWd_yHDk.js", "_app/immutable/chunks/loader.Cs7jjPqK.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// node_modules/zod/lib/index.mjs
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x2) => !!x2)
  });
  ctx.common.issues.push(issue);
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function timeRegexSource(args) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key2 in schema.shape) {
      const fieldSchema = schema.shape[key2];
      newShape[key2] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a3, b2) {
  const aType = getParsedType(a3);
  const bType = getParsedType(b2);
  if (a3 === b2) {
    return { valid: true, data: a3 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b2);
    const sharedKeys = util.objectKeys(a3).filter((key2) => bKeys.indexOf(key2) !== -1);
    const newObj = { ...a3, ...b2 };
    for (const key2 of sharedKeys) {
      const sharedValue = mergeValues(a3[key2], b2[key2]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key2] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a3.length !== b2.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index8 = 0; index8 < a3.length; index8++) {
      const itemA = a3[index8];
      const itemB = b2[index8];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a3 === +b2) {
    return { valid: true, data: a3 };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
function custom(check, params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p2 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p2.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p22 = typeof p2 === "string" ? { message: p2 } : p2;
        ctx.addIssue({ code: "custom", ...p22, fatal: _fatal });
      }
    });
  return ZodAny.create();
}
var util, objectUtil, ZodParsedType, getParsedType, ZodIssueCode, quotelessJson, ZodError, errorMap, overrideErrorMap, makeIssue, EMPTY_PATH, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, errorUtil, _ZodEnum_cache, _ZodNativeEnum_cache, ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, nanoidRegex, durationRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv6Regex, base64Regex, dateRegexSource, dateRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, ZodReadonly, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce, NEVER, z;
var init_lib = __esm({
  "node_modules/zod/lib/index.mjs"() {
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key2 in object) {
          if (Object.prototype.hasOwnProperty.call(object, key2)) {
            keys.push(key2);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array2, separator = " | ") {
        return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_2, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = (obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    };
    ZodError = class _ZodError extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i2 = 0;
              while (i2 < issue.path.length) {
                const el = issue.path[i2];
                const terminal = i2 === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i2++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
    errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    };
    overrideErrorMap = errorMap;
    makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      if (issueData.message !== void 0) {
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message
        };
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: errorMessage
      };
    };
    EMPTY_PATH = [];
    ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s2 of results) {
          if (s2.status === "aborted")
            return INVALID;
          if (s2.status === "dirty")
            status.dirty();
          arrayValue.push(s2.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          const key2 = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key: key2,
            value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key: key2, value } = pair;
          if (key2.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key2.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key2.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key2.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x2) => x2.status === "aborted";
    isDirty = (x2) => x2.status === "dirty";
    isValid = (x2) => x2.status === "valid";
    isAsync = (x2) => typeof Promise !== "undefined" && x2 instanceof Promise;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = class {
      constructor(parent, value, path, key2) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key2;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (this._key instanceof Array) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    ZodType = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this, this._def);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[0-9a-z]+$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    nanoidRegex = /^[a-z0-9_-]{21}$/i;
    durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    dateRegex = new RegExp(`^${dateRegexSource}$`);
    ZodString = class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "nanoid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "duration",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
      }
      ip(options2) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options2) });
      }
      datetime(options2) {
        var _a, _b;
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options2
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
          offset: (_a = options2 === null || options2 === void 0 ? void 0 : options2.offset) !== null && _a !== void 0 ? _a : false,
          local: (_b = options2 === null || options2 === void 0 ? void 0 : options2.local) !== null && _b !== void 0 ? _b : false,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      date(message) {
        return this._addCheck({ kind: "date", message });
      }
      time(options2) {
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options2
          });
        }
        return this._addCheck({
          kind: "time",
          precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options2) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options2 === null || options2 === void 0 ? void 0 : options2.position,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      /**
       * @deprecated Use z.string().min(1) instead.
       * @see {@link ZodString.min}
       */
      nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
      }
      trim() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      var _a;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodBigInt.create = (params) => {
      var _a;
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i2) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i2) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key2 in ctx.data) {
            if (!shapeKeys.includes(key2)) {
              extraKeys.push(key2);
            }
          }
        }
        const pairs = [];
        for (const key2 of shapeKeys) {
          const keyValidator = shape[key2];
          const value = ctx.data[key2];
          pairs.push({
            key: { status: "valid", value: key2 },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key2)),
            alwaysSet: key2 in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key2 of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key2 },
                value: { status: "valid", value: ctx.data[key2] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key2 of extraKeys) {
            const value = ctx.data[key2];
            pairs.push({
              key: { status: "valid", value: key2 },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key2)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key2 in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key2 = await pair.key;
              const value = await pair.value;
              syncPairs.push({
                key: key2,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key2, schema) {
        return this.augment({ [key2]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index8) {
        return new _ZodObject({
          ...this._def,
          catchall: index8
        });
      }
      pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key2) => {
          if (mask[key2] && this.shape[key2]) {
            shape[key2] = this.shape[key2];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          if (!mask[key2]) {
            shape[key2] = this.shape[key2];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          const fieldSchema = this.shape[key2];
          if (mask && !mask[key2]) {
            newShape[key2] = fieldSchema;
          } else {
            newShape[key2] = fieldSchema.optional();
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          if (mask && !mask[key2]) {
            newShape[key2] = this.shape[key2];
          } else {
            const fieldSchema = this.shape[key2];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key2] = newField;
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options2 = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options2.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options2) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types2, params) => {
      return new ZodUnion({
        options: types2,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    };
    ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options2, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options2) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options: options2,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x2) => !!x2);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key2 in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, key2)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key2], ctx.path, key2)),
            alwaysSet: key2 in ctx.data
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key2, value], index8) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, [index8, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index8, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key2 = await pair.key;
              const value = await pair.value;
              if (key2.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key2.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key2.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key2 = pair.key;
            const value = pair.value;
            if (key2.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key2.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key2.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i2) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i2)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x2) => !!x2),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x2) => !!x2),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class _ZodEnum extends ZodType {
      constructor() {
        super(...arguments);
        _ZodEnum_cache.set(this, void 0);
      }
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
          __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, {
          ...this._def,
          ...newDef
        });
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
          ...this._def,
          ...newDef
        });
      }
    };
    _ZodEnum_cache = /* @__PURE__ */ new WeakMap();
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      constructor() {
        super(...arguments);
        _ZodNativeEnum_cache.set(this, void 0);
      }
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
          __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    _ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then(async (processed2) => {
              if (status.value === "aborted")
                return INVALID;
              const result = await this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted")
                return INVALID;
              if (result.status === "dirty")
                return DIRTY(result.value);
              if (status.value === "dirty")
                return DIRTY(result.value);
              return result;
            });
          } else {
            if (status.value === "aborted")
              return INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY(result.value);
            if (status.value === "dirty")
              return DIRTY(result.value);
            return result;
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base2 = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base2))
              return base2;
            const result = effect.transform(base2.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base2) => {
              if (!isValid(base2))
                return base2;
              return Promise.resolve(effect.transform(base2.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a3, b2) {
        return new _ZodPipeline({
          in: a3,
          out: b2,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
          if (isValid(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        };
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = () => stringType().optional();
    onumber = () => numberType().optional();
    oboolean = () => booleanType().optional();
    coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
    z = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      defaultErrorMap: errorMap,
      setErrorMap,
      getErrorMap,
      makeIssue,
      EMPTY_PATH,
      addIssueToContext,
      ParseStatus,
      INVALID,
      DIRTY,
      OK,
      isAborted,
      isDirty,
      isValid,
      isAsync,
      get util() {
        return util;
      },
      get objectUtil() {
        return objectUtil;
      },
      ZodParsedType,
      getParsedType,
      ZodType,
      datetimeRegex,
      ZodString,
      ZodNumber,
      ZodBigInt,
      ZodBoolean,
      ZodDate,
      ZodSymbol,
      ZodUndefined,
      ZodNull,
      ZodAny,
      ZodUnknown,
      ZodNever,
      ZodVoid,
      ZodArray,
      ZodObject,
      ZodUnion,
      ZodDiscriminatedUnion,
      ZodIntersection,
      ZodTuple,
      ZodRecord,
      ZodMap,
      ZodSet,
      ZodFunction,
      ZodLazy,
      ZodLiteral,
      ZodEnum,
      ZodNativeEnum,
      ZodPromise,
      ZodEffects,
      ZodTransformer: ZodEffects,
      ZodOptional,
      ZodNullable,
      ZodDefault,
      ZodCatch,
      ZodNaN,
      BRAND,
      ZodBranded,
      ZodPipeline,
      ZodReadonly,
      custom,
      Schema: ZodType,
      ZodSchema: ZodType,
      late,
      get ZodFirstPartyTypeKind() {
        return ZodFirstPartyTypeKind;
      },
      coerce,
      any: anyType,
      array: arrayType,
      bigint: bigIntType,
      boolean: booleanType,
      date: dateType,
      discriminatedUnion: discriminatedUnionType,
      effect: effectsType,
      "enum": enumType,
      "function": functionType,
      "instanceof": instanceOfType,
      intersection: intersectionType,
      lazy: lazyType,
      literal: literalType,
      map: mapType,
      nan: nanType,
      nativeEnum: nativeEnumType,
      never: neverType,
      "null": nullType,
      nullable: nullableType,
      number: numberType,
      object: objectType,
      oboolean,
      onumber,
      optional: optionalType,
      ostring,
      pipeline: pipelineType,
      preprocess: preprocessType,
      promise: promiseType,
      record: recordType,
      set: setType,
      strictObject: strictObjectType,
      string: stringType,
      symbol: symbolType,
      transformer: effectsType,
      tuple: tupleType,
      "undefined": undefinedType,
      union: unionType,
      unknown: unknownType,
      "void": voidType,
      NEVER,
      ZodIssueCode,
      quotelessJson,
      ZodError
    });
  }
});

// node_modules/just-clone/index.mjs
function clone(obj) {
  let result = obj;
  var type = {}.toString.call(obj).slice(8, -1);
  if (type == "Set") {
    return new Set([...obj].map((value) => clone(value)));
  }
  if (type == "Map") {
    return new Map([...obj].map((kv) => [clone(kv[0]), clone(kv[1])]));
  }
  if (type == "Date") {
    return new Date(obj.getTime());
  }
  if (type == "RegExp") {
    return RegExp(obj.source, getRegExpFlags(obj));
  }
  if (type == "Array" || type == "Object") {
    result = Array.isArray(obj) ? [] : {};
    for (var key2 in obj) {
      result[key2] = clone(obj[key2]);
    }
  }
  return result;
}
function getRegExpFlags(regExp) {
  if (typeof regExp.source.flags == "string") {
    return regExp.source.flags;
  } else {
    var flags = [];
    regExp.global && flags.push("g");
    regExp.ignoreCase && flags.push("i");
    regExp.multiline && flags.push("m");
    regExp.sticky && flags.push("y");
    regExp.unicode && flags.push("u");
    return flags.join("");
  }
}
var collectionClone;
var init_just_clone = __esm({
  "node_modules/just-clone/index.mjs"() {
    collectionClone = clone;
  }
});

// node_modules/ts-deepmerge/esm/index.js
var isObject, merge, defaultOptions;
var init_esm = __esm({
  "node_modules/ts-deepmerge/esm/index.js"() {
    isObject = (obj) => {
      if (typeof obj === "object" && obj !== null) {
        if (typeof Object.getPrototypeOf === "function") {
          const prototype = Object.getPrototypeOf(obj);
          return prototype === Object.prototype || prototype === null;
        }
        return Object.prototype.toString.call(obj) === "[object Object]";
      }
      return false;
    };
    merge = (...objects) => objects.reduce((result, current) => {
      if (Array.isArray(current)) {
        throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
      }
      Object.keys(current).forEach((key2) => {
        if (["__proto__", "constructor", "prototype"].includes(key2)) {
          return;
        }
        if (Array.isArray(result[key2]) && Array.isArray(current[key2])) {
          result[key2] = merge.options.mergeArrays ? merge.options.uniqueArrayItems ? Array.from(new Set(result[key2].concat(current[key2]))) : [...result[key2], ...current[key2]] : current[key2];
        } else if (isObject(result[key2]) && isObject(current[key2])) {
          result[key2] = merge(result[key2], current[key2]);
        } else {
          result[key2] = current[key2] === void 0 ? merge.options.allowUndefinedOverrides ? current[key2] : result[key2] : current[key2];
        }
      });
      return result;
    }, {});
    defaultOptions = {
      allowUndefinedOverrides: true,
      mergeArrays: true,
      uniqueArrayItems: true
    };
    merge.options = defaultOptions;
    merge.withOptions = (options2, ...objects) => {
      merge.options = Object.assign(Object.assign({}, defaultOptions), options2);
      const result = merge(...objects);
      merge.options = defaultOptions;
      return result;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride, defaultOptions2, getDefaultOptions;
var init_Options = __esm({
  "node_modules/zod-to-json-schema/dist/esm/Options.js"() {
    ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
    defaultOptions2 = {
      name: void 0,
      $refStrategy: "root",
      basePath: ["#"],
      effectStrategy: "input",
      pipeStrategy: "all",
      dateStrategy: "format:date-time",
      mapStrategy: "entries",
      removeAdditionalStrategy: "passthrough",
      definitionPath: "definitions",
      target: "jsonSchema7",
      strictUnions: false,
      definitions: {},
      errorMessages: false,
      markdownDescription: false,
      patternStrategy: "escape",
      applyRegexFlags: false,
      emailStrategy: "format:email",
      base64Strategy: "contentEncoding:base64",
      nameStrategy: "ref"
    };
    getDefaultOptions = (options2) => typeof options2 === "string" ? {
      ...defaultOptions2,
      name: options2
    } : {
      ...defaultOptions2,
      ...options2
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs;
var init_Refs = __esm({
  "node_modules/zod-to-json-schema/dist/esm/Refs.js"() {
    init_Options();
    getRefs = (options2) => {
      const _options = getDefaultOptions(options2);
      const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
      return {
        ..._options,
        currentPath,
        propertyPath: void 0,
        seen: new Map(Object.entries(_options.definitions).map(([name2, def]) => [
          def._def,
          {
            def: def._def,
            path: [..._options.basePath, _options.definitionPath, name2],
            // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
            jsonSchema: void 0
          }
        ]))
      };
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key2, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key2]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key2, value, errorMessage, refs) {
  res[key2] = value;
  addErrorMessage(res, key2, errorMessage, refs);
}
var init_errorMessages = __esm({
  "node_modules/zod-to-json-schema/dist/esm/errorMessages.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}
var init_any = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/any.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}
var init_array = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/array.js"() {
    init_lib();
    init_errorMessages();
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
var init_bigint = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js"() {
    init_errorMessages();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}
var init_boolean = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
var init_branded = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/branded.js"() {
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef;
var init_catch = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/catch.js"() {
    init_parseDef();
    parseCatchDef = (def, refs) => {
      return parseDef(def.innerType._def, refs);
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i2) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser;
var init_date = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/date.js"() {
    init_errorMessages();
    integerDateParser = (def, refs) => {
      const res = {
        type: "integer",
        format: "unix-time"
      };
      if (refs.target === "openApi3") {
        return res;
      }
      for (const check of def.checks) {
        switch (check.kind) {
          case "min":
            setResponseValueAndErrors(
              res,
              "minimum",
              check.value,
              // This is in milliseconds
              check.message,
              refs
            );
            break;
          case "max":
            setResponseValueAndErrors(
              res,
              "maximum",
              check.value,
              // This is in milliseconds
              check.message,
              refs
            );
            break;
        }
      }
      return res;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
var init_default = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/default.js"() {
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}
var init_effects = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/effects.js"() {
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: def.values
  };
}
var init_enum = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/enum.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x2) => !!x2);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}
var isJsonSchema7AllOfType;
var init_intersection = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js"() {
    init_parseDef();
    isJsonSchema7AllOfType = (type) => {
      if ("type" in type && type.type === "string")
        return false;
      return "allOf" in type;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
var init_literal = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/literal.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  function processPattern(value) {
    return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(value) : value;
  }
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${processPattern(check.value)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${processPattern(check.value)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(processPattern(check.value)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji, check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_2) => {
          })(check);
      }
    }
  }
  return res;
}
var emojiRegex2, zodPatterns, escapeNonAlphaNumeric, addFormat, addPattern, processRegExp;
var init_string = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/string.js"() {
    init_errorMessages();
    zodPatterns = {
      /**
       * `c` was changed to `[cC]` to replicate /i flag
       */
      cuid: /^[cC][^\s-]{8,}$/,
      cuid2: /^[0-9a-z]+$/,
      ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
      /**
       * `a-z` was added to replicate /i flag
       */
      email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
      /**
       * Constructed a valid Unicode RegExp
       *
       * Lazily instantiate since this type of regex isn't supported
       * in all envs (e.g. React Native).
       *
       * See:
       * https://github.com/colinhacks/zod/issues/2433
       * Fix in Zod:
       * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
       */
      emoji: () => {
        if (emojiRegex2 === void 0) {
          emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
        }
        return emojiRegex2;
      },
      /**
       * Unused
       */
      uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      /**
       * Unused
       */
      ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
      /**
       * Unused
       */
      ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
      base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
      nanoid: /^[a-zA-Z0-9_-]{21}$/
    };
    escapeNonAlphaNumeric = (value) => Array.from(value).map((c2) => /[a-zA-Z0-9]/.test(c2) ? c2 : `\\${c2}`).join("");
    addFormat = (schema, value, message, refs) => {
      if (schema.format || schema.anyOf?.some((x2) => x2.format)) {
        if (!schema.anyOf) {
          schema.anyOf = [];
        }
        if (schema.format) {
          schema.anyOf.push({
            format: schema.format,
            ...schema.errorMessage && refs.errorMessages && {
              errorMessage: { format: schema.errorMessage.format }
            }
          });
          delete schema.format;
          if (schema.errorMessage) {
            delete schema.errorMessage.format;
            if (Object.keys(schema.errorMessage).length === 0) {
              delete schema.errorMessage;
            }
          }
        }
        schema.anyOf.push({
          format: value,
          ...message && refs.errorMessages && { errorMessage: { format: message } }
        });
      } else {
        setResponseValueAndErrors(schema, "format", value, message, refs);
      }
    };
    addPattern = (schema, regex, message, refs) => {
      if (schema.pattern || schema.allOf?.some((x2) => x2.pattern)) {
        if (!schema.allOf) {
          schema.allOf = [];
        }
        if (schema.pattern) {
          schema.allOf.push({
            pattern: schema.pattern,
            ...schema.errorMessage && refs.errorMessages && {
              errorMessage: { pattern: schema.errorMessage.pattern }
            }
          });
          delete schema.pattern;
          if (schema.errorMessage) {
            delete schema.errorMessage.pattern;
            if (Object.keys(schema.errorMessage).length === 0) {
              delete schema.errorMessage;
            }
          }
        }
        schema.allOf.push({
          pattern: processRegExp(regex, refs),
          ...message && refs.errorMessages && { errorMessage: { pattern: message } }
        });
      } else {
        setResponseValueAndErrors(schema, "pattern", processRegExp(regex, refs), message, refs);
      }
    };
    processRegExp = (regexOrFunction, refs) => {
      const regex = typeof regexOrFunction === "function" ? regexOrFunction() : regexOrFunction;
      if (!refs.applyRegexFlags || !regex.flags)
        return regex.source;
      const flags = {
        i: regex.flags.includes("i"),
        m: regex.flags.includes("m"),
        s: regex.flags.includes("s")
        // `.` matches newlines
      };
      const source = flags.i ? regex.source.toLowerCase() : regex.source;
      let pattern2 = "";
      let isEscaped = false;
      let inCharGroup = false;
      let inCharRange = false;
      for (let i2 = 0; i2 < source.length; i2++) {
        if (isEscaped) {
          pattern2 += source[i2];
          isEscaped = false;
          continue;
        }
        if (flags.i) {
          if (inCharGroup) {
            if (source[i2].match(/[a-z]/)) {
              if (inCharRange) {
                pattern2 += source[i2];
                pattern2 += `${source[i2 - 2]}-${source[i2]}`.toUpperCase();
                inCharRange = false;
              } else if (source[i2 + 1] === "-" && source[i2 + 2]?.match(/[a-z]/)) {
                pattern2 += source[i2];
                inCharRange = true;
              } else {
                pattern2 += `${source[i2]}${source[i2].toUpperCase()}`;
              }
              continue;
            }
          } else if (source[i2].match(/[a-z]/)) {
            pattern2 += `[${source[i2]}${source[i2].toUpperCase()}]`;
            continue;
          }
        }
        if (flags.m) {
          if (source[i2] === "^") {
            pattern2 += `(^|(?<=[\r
]))`;
            continue;
          } else if (source[i2] === "$") {
            pattern2 += `($|(?=[\r
]))`;
            continue;
          }
        }
        if (flags.s && source[i2] === ".") {
          pattern2 += inCharGroup ? `${source[i2]}\r
` : `[${source[i2]}\r
]`;
          continue;
        }
        pattern2 += source[i2];
        if (source[i2] === "\\") {
          isEscaped = true;
        } else if (inCharGroup && source[i2] === "]") {
          inCharGroup = false;
        } else if (!inCharGroup && source[i2] === "[") {
          inCharGroup = true;
        }
      }
      try {
        const regexTest = new RegExp(pattern2);
      } catch {
        console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
        return regex.source;
      }
      return pattern2;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key2) => ({
        ...acc,
        [key2]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key2]
        }) ?? {}
      }), {}),
      additionalProperties: false
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const keyType = Object.entries(parseStringDef(def.keyType._def, refs)).reduce((acc, [key2, value]) => key2 === "type" ? acc : { ...acc, [key2]: value }, {});
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  }
  return schema;
}
var init_record = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/record.js"() {
    init_lib();
    init_parseDef();
    init_string();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
var init_map = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/map.js"() {
    init_parseDef();
    init_record();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key2) => {
    return typeof object[object[key2]] !== "number";
  });
  const actualValues = actualKeys.map((key2) => object[key2]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
var init_nativeEnum = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}
var init_never = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/never.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}
var init_null = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/null.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options2 = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options2.every((x2) => x2._def.typeName in primitiveMappings && (!x2._def.checks || !x2._def.checks.length))) {
    const types2 = options2.reduce((types3, x2) => {
      const type = primitiveMappings[x2._def.typeName];
      return type && !types3.includes(type) ? [...types3, type] : types3;
    }, []);
    return {
      type: types2.length > 1 ? types2 : types2[0]
    };
  } else if (options2.every((x2) => x2._def.typeName === "ZodLiteral" && !x2.description)) {
    const types2 = options2.reduce((acc, x2) => {
      const type = typeof x2._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x2._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types2.length === options2.length) {
      const uniqueTypes = types2.filter((x2, i2, a3) => a3.indexOf(x2) === i2);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options2.reduce((acc, x2) => {
          return acc.includes(x2._def.value) ? acc : [...acc, x2._def.value];
        }, [])
      };
    }
  } else if (options2.every((x2) => x2._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options2.reduce((acc, x2) => [
        ...acc,
        ...x2._def.values.filter((x3) => !acc.includes(x3))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var primitiveMappings, asAnyOf;
var init_union = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/union.js"() {
    init_parseDef();
    primitiveMappings = {
      ZodString: "string",
      ZodNumber: "number",
      ZodBigInt: "integer",
      ZodBoolean: "boolean",
      ZodNull: "null"
    };
    asAnyOf = (def, refs) => {
      const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x2, i2) => parseDef(x2._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", `${i2}`]
      })).filter((x2) => !!x2 && (!refs.strictUnions || typeof x2 === "object" && Object.keys(x2).length > 0));
      return anyOf.length ? { anyOf } : void 0;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base3 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base3 && "$ref" in base3)
      return { allOf: [base3], nullable: true };
    return base3 && { ...base3, nullable: true };
  }
  const base2 = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base2 && { anyOf: [base2, { type: "null" }] };
}
var init_nullable = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js"() {
    init_parseDef();
    init_union();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
var init_number = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/number.js"() {
    init_errorMessages();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function decideAdditionalProperties(def, refs) {
  if (refs.removeAdditionalStrategy === "strict") {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys !== "strict" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true;
  } else {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true;
  }
}
function parseObjectDef(def, refs) {
  const result = {
    type: "object",
    ...Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
      if (propDef === void 0 || propDef._def === void 0)
        return acc;
      const parsedDef = parseDef(propDef._def, {
        ...refs,
        currentPath: [...refs.currentPath, "properties", propName],
        propertyPath: [...refs.currentPath, "properties", propName]
      });
      if (parsedDef === void 0)
        return acc;
      return {
        properties: { ...acc.properties, [propName]: parsedDef },
        required: propDef.isOptional() ? acc.required : [...acc.required, propName]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: decideAdditionalProperties(def, refs)
  };
  if (!result.required.length)
    delete result.required;
  return result;
}
var init_object = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/object.js"() {
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef;
var init_optional = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/optional.js"() {
    init_parseDef();
    parseOptionalDef = (def, refs) => {
      if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
        return parseDef(def.innerType._def, refs);
      }
      const innerSchema = parseDef(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "1"]
      });
      return innerSchema ? {
        anyOf: [
          {
            not: {}
          },
          innerSchema
        ]
      } : {};
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef;
var init_pipeline = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js"() {
    init_parseDef();
    parsePipelineDef = (def, refs) => {
      if (refs.pipeStrategy === "input") {
        return parseDef(def.in._def, refs);
      } else if (refs.pipeStrategy === "output") {
        return parseDef(def.out._def, refs);
      }
      const a3 = parseDef(def.in._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", "0"]
      });
      const b2 = parseDef(def.out._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", a3 ? "1" : "0"]
      });
      return {
        allOf: [a3, b2].filter((x2) => x2 !== void 0)
      };
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
var init_promise = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/promise.js"() {
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}
var init_set = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/set.js"() {
    init_errorMessages();
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x2, i2) => parseDef(x2._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i2}`]
      })).reduce((acc, x2) => x2 === void 0 ? acc : [...acc, x2], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x2, i2) => parseDef(x2._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i2}`]
      })).reduce((acc, x2) => x2 === void 0 ? acc : [...acc, x2], [])
    };
  }
}
var init_tuple = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js"() {
    init_parseDef();
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}
var init_undefined = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}
var init_unknown = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js"() {
  }
});

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef;
var init_readonly = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js"() {
    init_parseDef();
    parseReadonlyDef = (def, refs) => {
      return parseDef(def.innerType._def, refs);
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchema = selectParser(def, def.typeName, refs);
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref, getRelativePath, selectParser, addMeta;
var init_parseDef = __esm({
  "node_modules/zod-to-json-schema/dist/esm/parseDef.js"() {
    init_lib();
    init_any();
    init_array();
    init_bigint();
    init_boolean();
    init_branded();
    init_catch();
    init_date();
    init_default();
    init_effects();
    init_enum();
    init_intersection();
    init_literal();
    init_map();
    init_nativeEnum();
    init_never();
    init_null();
    init_nullable();
    init_number();
    init_object();
    init_optional();
    init_pipeline();
    init_promise();
    init_record();
    init_set();
    init_string();
    init_tuple();
    init_undefined();
    init_union();
    init_unknown();
    init_readonly();
    init_Options();
    get$ref = (item, refs) => {
      switch (refs.$refStrategy) {
        case "root":
          return { $ref: item.path.join("/") };
        case "relative":
          return { $ref: getRelativePath(refs.currentPath, item.path) };
        case "none":
        case "seen": {
          if (item.path.length < refs.currentPath.length && item.path.every((value, index8) => refs.currentPath[index8] === value)) {
            console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
            return {};
          }
          return refs.$refStrategy === "seen" ? {} : void 0;
        }
      }
    };
    getRelativePath = (pathA, pathB) => {
      let i2 = 0;
      for (; i2 < pathA.length && i2 < pathB.length; i2++) {
        if (pathA[i2] !== pathB[i2])
          break;
      }
      return [(pathA.length - i2).toString(), ...pathB.slice(i2)].join("/");
    };
    selectParser = (def, typeName, refs) => {
      switch (typeName) {
        case ZodFirstPartyTypeKind.ZodString:
          return parseStringDef(def, refs);
        case ZodFirstPartyTypeKind.ZodNumber:
          return parseNumberDef(def, refs);
        case ZodFirstPartyTypeKind.ZodObject:
          return parseObjectDef(def, refs);
        case ZodFirstPartyTypeKind.ZodBigInt:
          return parseBigintDef(def, refs);
        case ZodFirstPartyTypeKind.ZodBoolean:
          return parseBooleanDef();
        case ZodFirstPartyTypeKind.ZodDate:
          return parseDateDef(def, refs);
        case ZodFirstPartyTypeKind.ZodUndefined:
          return parseUndefinedDef();
        case ZodFirstPartyTypeKind.ZodNull:
          return parseNullDef(refs);
        case ZodFirstPartyTypeKind.ZodArray:
          return parseArrayDef(def, refs);
        case ZodFirstPartyTypeKind.ZodUnion:
        case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
          return parseUnionDef(def, refs);
        case ZodFirstPartyTypeKind.ZodIntersection:
          return parseIntersectionDef(def, refs);
        case ZodFirstPartyTypeKind.ZodTuple:
          return parseTupleDef(def, refs);
        case ZodFirstPartyTypeKind.ZodRecord:
          return parseRecordDef(def, refs);
        case ZodFirstPartyTypeKind.ZodLiteral:
          return parseLiteralDef(def, refs);
        case ZodFirstPartyTypeKind.ZodEnum:
          return parseEnumDef(def);
        case ZodFirstPartyTypeKind.ZodNativeEnum:
          return parseNativeEnumDef(def);
        case ZodFirstPartyTypeKind.ZodNullable:
          return parseNullableDef(def, refs);
        case ZodFirstPartyTypeKind.ZodOptional:
          return parseOptionalDef(def, refs);
        case ZodFirstPartyTypeKind.ZodMap:
          return parseMapDef(def, refs);
        case ZodFirstPartyTypeKind.ZodSet:
          return parseSetDef(def, refs);
        case ZodFirstPartyTypeKind.ZodLazy:
          return parseDef(def.getter()._def, refs);
        case ZodFirstPartyTypeKind.ZodPromise:
          return parsePromiseDef(def, refs);
        case ZodFirstPartyTypeKind.ZodNaN:
        case ZodFirstPartyTypeKind.ZodNever:
          return parseNeverDef();
        case ZodFirstPartyTypeKind.ZodEffects:
          return parseEffectsDef(def, refs);
        case ZodFirstPartyTypeKind.ZodAny:
          return parseAnyDef();
        case ZodFirstPartyTypeKind.ZodUnknown:
          return parseUnknownDef();
        case ZodFirstPartyTypeKind.ZodDefault:
          return parseDefaultDef(def, refs);
        case ZodFirstPartyTypeKind.ZodBranded:
          return parseBrandedDef(def, refs);
        case ZodFirstPartyTypeKind.ZodReadonly:
          return parseReadonlyDef(def, refs);
        case ZodFirstPartyTypeKind.ZodCatch:
          return parseCatchDef(def, refs);
        case ZodFirstPartyTypeKind.ZodPipeline:
          return parsePipelineDef(def, refs);
        case ZodFirstPartyTypeKind.ZodFunction:
        case ZodFirstPartyTypeKind.ZodVoid:
        case ZodFirstPartyTypeKind.ZodSymbol:
          return void 0;
        default:
          return /* @__PURE__ */ ((_2) => void 0)(typeName);
      }
    };
    addMeta = (def, refs, jsonSchema) => {
      if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
          jsonSchema.markdownDescription = def.description;
        }
      }
      return jsonSchema;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema;
var init_zodToJsonSchema = __esm({
  "node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js"() {
    init_parseDef();
    init_Refs();
    zodToJsonSchema = (schema, options2) => {
      const refs = getRefs(options2);
      const definitions = typeof options2 === "object" && options2.definitions ? Object.entries(options2.definitions).reduce((acc, [name3, schema2]) => ({
        ...acc,
        [name3]: parseDef(schema2._def, {
          ...refs,
          currentPath: [...refs.basePath, refs.definitionPath, name3]
        }, true) ?? {}
      }), {}) : void 0;
      const name2 = typeof options2 === "string" ? options2 : options2?.nameStrategy === "title" ? void 0 : options2?.name;
      const main2 = parseDef(schema._def, name2 === void 0 ? refs : {
        ...refs,
        currentPath: [...refs.basePath, refs.definitionPath, name2]
      }, false) ?? {};
      const title = typeof options2 === "object" && options2.name !== void 0 && options2.nameStrategy === "title" ? options2.name : void 0;
      if (title !== void 0) {
        main2.title = title;
      }
      const combined = name2 === void 0 ? definitions ? {
        ...main2,
        [refs.definitionPath]: definitions
      } : main2 : {
        $ref: [
          ...refs.$refStrategy === "relative" ? [] : refs.basePath,
          refs.definitionPath,
          name2
        ].join("/"),
        [refs.definitionPath]: {
          ...definitions,
          [name2]: main2
        }
      };
      if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
      } else if (refs.target === "jsonSchema2019-09") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
      }
      return combined;
    };
  }
});

// node_modules/zod-to-json-schema/dist/esm/index.js
var init_esm2 = __esm({
  "node_modules/zod-to-json-schema/dist/esm/index.js"() {
    init_Options();
    init_Refs();
    init_errorMessages();
    init_parseDef();
    init_any();
    init_array();
    init_bigint();
    init_boolean();
    init_branded();
    init_catch();
    init_date();
    init_default();
    init_effects();
    init_enum();
    init_intersection();
    init_literal();
    init_map();
    init_nativeEnum();
    init_never();
    init_null();
    init_nullable();
    init_number();
    init_object();
    init_optional();
    init_pipeline();
    init_promise();
    init_readonly();
    init_record();
    init_set();
    init_string();
    init_tuple();
    init_undefined();
    init_union();
    init_unknown();
    init_zodToJsonSchema();
    init_zodToJsonSchema();
  }
});

// node_modules/memoize-weak/lib/memoize.js
var require_memoize = __commonJS({
  "node_modules/memoize-weak/lib/memoize.js"(exports, module) {
    function isPrimitive(value) {
      return typeof value !== "object" && typeof value !== "function" || value === null;
    }
    function MapTree() {
      this.childBranches = /* @__PURE__ */ new WeakMap();
      this.primitiveKeys = /* @__PURE__ */ new Map();
      this.hasValue = false;
      this.value = void 0;
    }
    MapTree.prototype.has = function has(key2) {
      var keyObject = isPrimitive(key2) ? this.primitiveKeys.get(key2) : key2;
      return keyObject ? this.childBranches.has(keyObject) : false;
    };
    MapTree.prototype.get = function get2(key2) {
      var keyObject = isPrimitive(key2) ? this.primitiveKeys.get(key2) : key2;
      return keyObject ? this.childBranches.get(keyObject) : void 0;
    };
    MapTree.prototype.resolveBranch = function resolveBranch(key2) {
      if (this.has(key2)) {
        return this.get(key2);
      }
      var newBranch = new MapTree();
      var keyObject = this.createKey(key2);
      this.childBranches.set(keyObject, newBranch);
      return newBranch;
    };
    MapTree.prototype.setValue = function setValue(value) {
      this.hasValue = true;
      return this.value = value;
    };
    MapTree.prototype.createKey = function createKey(key2) {
      if (isPrimitive(key2)) {
        var keyObject = {};
        this.primitiveKeys.set(key2, keyObject);
        return keyObject;
      }
      return key2;
    };
    MapTree.prototype.clear = function clear() {
      if (arguments.length === 0) {
        this.childBranches = /* @__PURE__ */ new WeakMap();
        this.primitiveKeys.clear();
        this.hasValue = false;
        this.value = void 0;
      } else if (arguments.length === 1) {
        var key2 = arguments[0];
        if (isPrimitive(key2)) {
          var keyObject = this.primitiveKeys.get(key2);
          if (keyObject) {
            this.childBranches.delete(keyObject);
            this.primitiveKeys.delete(key2);
          }
        } else {
          this.childBranches.delete(key2);
        }
      } else {
        var childKey = arguments[0];
        if (this.has(childKey)) {
          var childBranch = this.get(childKey);
          childBranch.clear.apply(childBranch, Array.prototype.slice.call(arguments, 1));
        }
      }
    };
    module.exports = function memoize2(fn) {
      var argsTree = new MapTree();
      function memoized() {
        var args = Array.prototype.slice.call(arguments);
        var argNode = args.reduce(function getBranch(parentBranch, arg) {
          return parentBranch.resolveBranch(arg);
        }, argsTree);
        if (argNode.hasValue) {
          return argNode.value;
        }
        var value = fn.apply(null, args);
        return argNode.setValue(value);
      }
      memoized.clear = argsTree.clear.bind(argsTree);
      return memoized;
    };
  }
});

// node_modules/memoize-weak/index.js
var require_memoize_weak = __commonJS({
  "node_modules/memoize-weak/index.js"(exports, module) {
    module.exports = require_memoize();
  }
});

// .svelte-kit/output/server/chunks/zod.js
function setPath(parent, key2, value) {
  parent[key2] = value;
  return "skip";
}
function isInvalidPath(originalPath, pathData) {
  return pathData.value !== void 0 && typeof pathData.value !== "object" && pathData.path.length < originalPath.length;
}
function pathExists(obj, path, options2 = {}) {
  if (!options2.modifier) {
    options2.modifier = (pathData) => isInvalidPath(path, pathData) ? void 0 : pathData.value;
  }
  const exists = traversePath(obj, path, options2.modifier);
  if (!exists)
    return void 0;
  if (options2.value === void 0)
    return exists;
  return options2.value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
  if (!realPath.length)
    return void 0;
  const path = [realPath[0]];
  let parent = obj;
  while (parent && path.length < realPath.length) {
    const key22 = path[path.length - 1];
    const value = modifier ? modifier({
      parent,
      key: String(key22),
      value: parent[key22],
      path: path.map((p2) => String(p2)),
      isLeaf: false,
      set: (v2) => setPath(parent, key22, v2)
    }) : parent[key22];
    if (value === void 0)
      return void 0;
    else
      parent = value;
    path.push(realPath[path.length]);
  }
  if (!parent)
    return void 0;
  const key2 = realPath[realPath.length - 1];
  return {
    parent,
    key: String(key2),
    value: parent[key2],
    path: realPath.map((p2) => String(p2)),
    isLeaf: true,
    set: (v2) => setPath(parent, key2, v2)
  };
}
function traversePaths(parent, modifier, path = []) {
  for (const key2 in parent) {
    const value = parent[key2];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key: key2,
      value,
      path: path.concat([key2]),
      // path.map(String).concat([key])
      isLeaf,
      set: (v2) => setPath(parent, key2, v2)
    };
    const status = modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      continue;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
function eqSet(xs, ys) {
  return xs === ys || xs.size === ys.size && [...xs].every((x2) => ys.has(x2));
}
function comparePaths(newObj, oldObj) {
  const diffPaths = /* @__PURE__ */ new Map();
  function builtInDiff(one, other) {
    if (one instanceof Date && other instanceof Date && one.getTime() !== other.getTime())
      return true;
    if (one instanceof Set && other instanceof Set && !eqSet(one, other))
      return true;
    if (one instanceof File && other instanceof File && one !== other)
      return true;
    return false;
  }
  function isBuiltin(data) {
    return data instanceof Date || data instanceof Set || data instanceof File;
  }
  function checkPath(data, compareTo) {
    const otherData = compareTo ? traversePath(compareTo, data.path) : void 0;
    function addDiff() {
      diffPaths.set(data.path.join(" "), data.path);
      return "skip";
    }
    if (isBuiltin(data.value)) {
      if (!isBuiltin(otherData?.value) || builtInDiff(data.value, otherData.value)) {
        return addDiff();
      }
    }
    if (data.isLeaf) {
      if (!otherData || data.value !== otherData.value) {
        addDiff();
      }
    }
  }
  traversePaths(newObj, (data) => checkPath(data, oldObj));
  traversePaths(oldObj, (data) => checkPath(data, newObj));
  return Array.from(diffPaths.values());
}
function setPaths(obj, paths, value) {
  const isFunction = typeof value === "function";
  for (const path of paths) {
    const leaf = traversePath(obj, path, ({ parent, key: key2, value: value2 }) => {
      if (value2 === void 0 || typeof value2 !== "object") {
        parent[key2] = {};
      }
      return parent[key2];
    });
    if (leaf)
      leaf.parent[leaf.key] = isFunction ? value(path, leaf) : value;
  }
}
function splitPath(path) {
  return path.toString().split(/[[\].]+/).filter((p2) => p2);
}
function mergePath(path) {
  return path.reduce((acc, next) => {
    const key2 = String(next);
    if (typeof next === "number" || /^\d+$/.test(key2))
      acc += `[${key2}]`;
    else if (!acc)
      acc += key2;
    else
      acc += `.${key2}`;
    return acc;
  }, "");
}
function clone$1(data) {
  return data && typeof data === "object" ? collectionClone(data) : data;
}
function assertSchema(schema, path) {
  if (typeof schema === "boolean") {
    throw new SchemaError("Schema property cannot be defined as boolean.", path);
  }
}
function schemaInfo(schema, isOptional, path) {
  assertSchema(schema, path);
  if (schema.allOf && schema.allOf.length) {
    return {
      ...merge.withOptions({ allowUndefinedOverrides: false }, ...schema.allOf.map((s2) => schemaInfo(s2, false, []))),
      schema
    };
  }
  const types2 = schemaTypes(schema, path);
  const array2 = schema.items && types2.includes("array") ? (Array.isArray(schema.items) ? schema.items : [schema.items]).filter((s2) => typeof s2 !== "boolean") : void 0;
  const additionalProperties = schema.additionalProperties && typeof schema.additionalProperties === "object" && types2.includes("object") ? Object.fromEntries(Object.entries(schema.additionalProperties).filter(([, value]) => typeof value !== "boolean")) : void 0;
  const properties = schema.properties && types2.includes("object") ? Object.fromEntries(Object.entries(schema.properties).filter(([, value]) => typeof value !== "boolean")) : void 0;
  const union = unionInfo(schema)?.filter((u2) => u2.type !== "null" && u2.const !== null);
  return {
    types: types2.filter((s2) => s2 !== "null"),
    isOptional,
    isNullable: types2.includes("null"),
    schema,
    union: union?.length ? union : void 0,
    array: array2,
    properties,
    additionalProperties,
    required: schema.required
  };
}
function schemaTypes(schema, path) {
  assertSchema(schema, path);
  let types2 = schema.const === null ? ["null"] : [];
  if (schema.type) {
    types2 = Array.isArray(schema.type) ? schema.type : [schema.type];
  }
  if (schema.anyOf) {
    types2 = schema.anyOf.flatMap((s2) => schemaTypes(s2, path));
  }
  if (types2.includes("array") && schema.uniqueItems) {
    const i2 = types2.findIndex((t) => t != "array");
    types2[i2] = "set";
  } else if (schema.format && conversionFormatTypes.includes(schema.format)) {
    types2.unshift(schema.format);
    if (schema.format == "unix-time") {
      const i2 = types2.findIndex((t) => t == "integer");
      types2.splice(i2, 1);
    }
  }
  if (schema.const && schema.const !== null && typeof schema.const !== "function") {
    types2.push(typeof schema.const);
  }
  return Array.from(new Set(types2));
}
function unionInfo(schema) {
  if (!schema.anyOf || !schema.anyOf.length)
    return void 0;
  return schema.anyOf.filter((s2) => typeof s2 !== "boolean");
}
function defaultValues(schema, isOptional = false, path = []) {
  return _defaultValues(schema, isOptional, path);
}
function _defaultValues(schema, isOptional, path) {
  if (!schema) {
    throw new SchemaError("Schema was undefined", path);
  }
  const info = schemaInfo(schema, isOptional, path);
  if (!info)
    return void 0;
  let objectDefaults = void 0;
  if ("default" in schema) {
    if (info.types.includes("object") && schema.default && typeof schema.default == "object" && !Array.isArray(schema.default)) {
      objectDefaults = schema.default;
    } else {
      if (info.types.length > 1) {
        if (info.types.includes("unix-time") && (info.types.includes("integer") || info.types.includes("number")))
          throw new SchemaError("Cannot resolve a default value with a union that includes a date and a number/integer.", path);
      }
      const [type] = info.types;
      return formatDefaultValue(type, schema.default);
    }
  }
  let _multiType;
  const isMultiTypeUnion = () => {
    if (!info.union || info.union.length < 2)
      return false;
    if (info.union.some((i2) => i2.enum))
      return true;
    if (!_multiType) {
      _multiType = new Set(info.types.map((i2) => {
        return ["integer", "unix-time"].includes(i2) ? "number" : i2;
      }));
    }
    return _multiType.size > 1;
  };
  let output = {};
  if (!objectDefaults && info.union) {
    const singleDefault = info.union.filter((s2) => typeof s2 !== "boolean" && s2.default !== void 0);
    if (singleDefault.length == 1) {
      return _defaultValues(singleDefault[0], isOptional, path);
    } else if (singleDefault.length > 1) {
      throw new SchemaError("Only one default value can exist in a union, or set a default value for the whole union.", path);
    } else {
      if (info.isNullable)
        return null;
      if (info.isOptional)
        return void 0;
      if (isMultiTypeUnion()) {
        throw new SchemaError("Multi-type unions must have a default value, or exactly one of the union types must have.", path);
      }
      if (info.union.length && info.types[0] == "object") {
        output = info.union.length > 1 ? merge.withOptions({ allowUndefinedOverrides: true }, ...info.union.map((s2) => _defaultValues(s2, isOptional, path))) : _defaultValues(info.union[0], isOptional, path);
      }
    }
  }
  if (!objectDefaults) {
    if (info.isNullable)
      return null;
    if (info.isOptional)
      return void 0;
  }
  if (info.properties) {
    for (const [key2, value] of Object.entries(info.properties)) {
      assertSchema(value, [...path, key2]);
      const def = objectDefaults && objectDefaults[key2] !== void 0 ? objectDefaults[key2] : _defaultValues(value, !info.required?.includes(key2), [...path, key2]);
      output[key2] = def;
    }
    return output;
  } else if (objectDefaults) {
    return objectDefaults;
  }
  if (schema.enum) {
    return schema.enum[0];
  }
  if (isMultiTypeUnion()) {
    throw new SchemaError("Default values cannot have more than one type.", path);
  } else if (info.types.length == 0) {
    return void 0;
  }
  const [formatType] = info.types;
  return defaultValue(formatType, schema.enum);
}
function formatDefaultValue(type, value) {
  switch (type) {
    case "set":
      return Array.isArray(value) ? new Set(value) : value;
    case "Date":
    case "date":
    case "unix-time":
      if (typeof value === "string" || typeof value === "number")
        return new Date(value);
      break;
    case "bigint":
      if (typeof value === "string" || typeof value === "number")
        return BigInt(value);
      break;
    case "symbol":
      if (typeof value === "string" || typeof value === "number")
        return Symbol(value);
      break;
  }
  return value;
}
function defaultValue(type, enumType2) {
  switch (type) {
    case "string":
      return enumType2 && enumType2.length > 0 ? enumType2[0] : "";
    case "number":
    case "integer":
      return enumType2 && enumType2.length > 0 ? enumType2[0] : 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    case "null":
      return null;
    case "Date":
    case "date":
    case "unix-time":
      return void 0;
    case "bigint":
      return BigInt(0);
    case "set":
      return /* @__PURE__ */ new Set();
    case "symbol":
      return Symbol();
    case "undefined":
    case "any":
      return void 0;
    default:
      throw new SchemaError("Schema type or format not supported, requires explicit default value: " + type);
  }
}
function defaultTypes(schema, path = []) {
  return _defaultTypes(schema, false, path);
}
function _defaultTypes(schema, isOptional, path) {
  if (!schema) {
    throw new SchemaError("Schema was undefined", path);
  }
  const info = schemaInfo(schema, isOptional, path);
  const output = {
    __types: info.types
  };
  if (info.schema.items && typeof info.schema.items == "object" && !Array.isArray(info.schema.items)) {
    output.__items = _defaultTypes(info.schema.items, info.isOptional, path);
  }
  if (info.properties) {
    for (const [key2, value] of Object.entries(info.properties)) {
      assertSchema(value, [...path, key2]);
      output[key2] = _defaultTypes(info.properties[key2], !info.required?.includes(key2), [
        ...path,
        key2
      ]);
    }
  }
  if (info.additionalProperties && info.types.includes("object")) {
    const additionalInfo = schemaInfo(info.additionalProperties, info.isOptional, path);
    if (additionalInfo.properties && additionalInfo.types.includes("object")) {
      for (const [key2] of Object.entries(additionalInfo.properties)) {
        output[key2] = _defaultTypes(additionalInfo.properties[key2], !additionalInfo.required?.includes(key2), [...path, key2]);
      }
    }
  }
  if (info.isNullable && !output.__types.includes("null")) {
    output.__types.push("null");
  }
  if (info.isOptional && !output.__types.includes("undefined")) {
    output.__types.push("undefined");
  }
  return output;
}
function mapErrors(errors, shape) {
  const output = {};
  function addFormLevelError(error) {
    if (!("_errors" in output))
      output._errors = [];
    if (!Array.isArray(output._errors)) {
      if (typeof output._errors === "string")
        output._errors = [output._errors];
      else
        throw new SuperFormError("Form-level error was not an array.");
    }
    output._errors.push(error.message);
  }
  for (const error of errors) {
    if (!error.path || error.path.length == 1 && !error.path[0]) {
      addFormLevelError(error);
      continue;
    }
    const isLastIndexNumeric = /^\d$/.test(String(error.path[error.path.length - 1]));
    const objectError = !isLastIndexNumeric && pathExists(shape, error.path.filter((p2) => /\D/.test(String(p2))))?.value;
    const leaf = traversePath(output, error.path, ({ value, parent: parent2, key: key22 }) => {
      if (value === void 0)
        parent2[key22] = {};
      return parent2[key22];
    });
    if (!leaf) {
      addFormLevelError(error);
      continue;
    }
    const { parent, key: key2 } = leaf;
    if (objectError) {
      if (!(key2 in parent))
        parent[key2] = {};
      if (!("_errors" in parent[key2]))
        parent[key2]._errors = [error.message];
      else
        parent[key2]._errors.push(error.message);
    } else {
      if (!(key2 in parent))
        parent[key2] = [error.message];
      else
        parent[key2].push(error.message);
    }
  }
  return output;
}
function updateErrors(New, Previous, force) {
  if (force)
    return New;
  traversePaths(Previous, (errors) => {
    if (!Array.isArray(errors.value))
      return;
    errors.set(void 0);
  });
  traversePaths(New, (error) => {
    if (!Array.isArray(error.value) && error.value !== void 0)
      return;
    setPaths(Previous, [error.path], error.value);
  });
  return Previous;
}
function flattenErrors(errors) {
  return _flattenErrors(errors, []);
}
function _flattenErrors(errors, path) {
  const entries = Object.entries(errors);
  return entries.filter(([, value]) => value !== void 0).flatMap(([key2, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      const currPath = path.concat([key2]);
      return { path: mergePath(currPath), messages };
    } else {
      return _flattenErrors(errors[key2], path.concat([key2]));
    }
  });
}
function mergeDefaults(parsedData, defaults3) {
  if (!parsedData)
    return clone$1(defaults3);
  return merge.withOptions({ mergeArrays: false }, defaults3, parsedData);
}
function replaceInvalidDefaults(Data, Defaults, _schema, Errors, preprocessed) {
  const defaultType = _schema.additionalProperties && typeof _schema.additionalProperties == "object" ? { __types: schemaInfo(_schema.additionalProperties, false, []).types } : void 0;
  const Types = defaultTypes(_schema);
  function Types_correctValue(dataValue, defValue, type) {
    const types2 = type.__types;
    if (!types2.length || types2.every((t) => t == "undefined" || t == "null" || t == "any")) {
      return dataValue;
    } else if (types2.length == 1 && types2[0] == "array" && !type.__items) {
      return dataValue;
    }
    const dateTypes = ["unix-time", "Date", "date"];
    for (const schemaType of types2) {
      const defaultTypeValue = defaultValue(schemaType, void 0);
      const sameType = typeof dataValue === typeof defaultTypeValue || dateTypes.includes(schemaType) && dataValue instanceof Date;
      const sameExistance = sameType && dataValue === null === (defaultTypeValue === null);
      if (sameType && sameExistance) {
        return dataValue;
      } else if (type.__items) {
        return Types_correctValue(dataValue, defValue, type.__items);
      }
    }
    if (defValue === void 0 && types2.includes("null")) {
      return null;
    }
    return defValue;
  }
  function Data_traverse() {
    traversePaths(Defaults, Defaults_traverseAndReplace);
    Errors_traverseAndReplace();
    return Data;
  }
  function Data_setValue(currentPath, newValue) {
    setPaths(Data, [currentPath], newValue);
  }
  function Errors_traverseAndReplace() {
    for (const error of Errors) {
      if (!error.path)
        continue;
      Defaults_traverseAndReplace({
        path: error.path,
        value: pathExists(Defaults, error.path)?.value
      });
    }
  }
  function Defaults_traverseAndReplace(defaultPath) {
    const currentPath = defaultPath.path;
    if (!currentPath || !currentPath[0])
      return;
    if (typeof currentPath[0] === "string" && preprocessed?.includes(currentPath[0]))
      return;
    const dataPath = pathExists(Data, currentPath);
    if (!dataPath && defaultPath.value !== void 0 || dataPath && dataPath.value === void 0) {
      Data_setValue(currentPath, defaultPath.value);
    } else if (dataPath) {
      const defValue = defaultPath.value;
      const dataValue = dataPath.value;
      if (defValue !== void 0 && typeof dataValue === typeof defValue && dataValue === null === (defValue === null)) {
        return;
      }
      const typePath = currentPath.filter((p2) => /\D/.test(String(p2)));
      const pathTypes = traversePath(Types, typePath, (path) => {
        return "__items" in path.value ? path.value.__items : path.value;
      });
      if (!pathTypes) {
        throw new SchemaError("No types found for defaults", currentPath);
      }
      const fieldType = pathTypes.value ?? defaultType;
      if (!fieldType) {
        throw new SchemaError("No default value specified for field (can be undefined, but must be explicit)", currentPath);
      }
      Data_setValue(currentPath, Types_correctValue(dataValue, defValue, fieldType));
    }
  }
  {
    return Data_traverse();
  }
}
function cancelFlash(options2) {
  if (!options2.flashMessage || !browser)
    return;
  if (!shouldSyncFlash(options2))
    return;
  document.cookie = `flash=; Max-Age=0; Path=${options2.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options2) {
  if (!options2.flashMessage || !browser)
    return false;
  return options2.syncFlashMessage;
}
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data);
  }
  return parsed;
}
function clone2(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({
    action,
    result,
    reset: reset2 = true,
    invalidateAll: shouldInvalidateAll = true
  }) => {
    if (result.type === "success") {
      if (reset2) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      if (shouldInvalidateAll) {
        await invalidateAll();
      }
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction();
    }
  };
  async function handle_submit(event) {
    const method = event.submitter?.hasAttribute("formmethod") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone2(form_element).method;
    if (method !== "post") return;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone2(form_element).action
    );
    const enctype = event.submitter?.hasAttribute("formenctype") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formEnctype
    ) : clone2(form_element).enctype;
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      formData: form_data,
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled) return;
    let result;
    try {
      const headers2 = new Headers({
        accept: "application/json",
        "x-sveltekit-action": "true"
      });
      if (enctype !== "multipart/form-data") {
        headers2.set(
          "Content-Type",
          /^(:?application\/x-www-form-urlencoded|text\/plain)$/.test(enctype) ? enctype : "application/x-www-form-urlencoded"
        );
      }
      const body2 = enctype === "multipart/form-data" ? form_data : new URLSearchParams(form_data);
      const response = await fetch(action, {
        method: "POST",
        headers: headers2,
        cache: "no-store",
        body: body2,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error") result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      ) return;
      result = { type: "error", error };
    }
    callback({
      action,
      formData: form_data,
      formElement: form_element,
      update: (opts) => fallback_callback({
        action,
        result,
        reset: opts?.reset,
        invalidateAll: opts?.invalidateAll
      }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
async function updateCustomValidity(validityEl, errors) {
  if ("setCustomValidity" in validityEl) {
    validityEl.setCustomValidity("");
  }
  if (noCustomValidityDataAttribute in validityEl.dataset)
    return;
  setCustomValidity(validityEl, errors);
}
function setCustomValidityForm(formElement, errors) {
  for (const el of formElement.querySelectorAll("input,select,textarea,button")) {
    if ("dataset" in el && noCustomValidityDataAttribute in el.dataset || !el.name) {
      continue;
    }
    const path = traversePath(errors, splitPath(el.name));
    const error = path && typeof path.value === "object" && "_errors" in path.value ? path.value._errors : path?.value;
    setCustomValidity(el, error);
    if (error)
      return;
  }
}
function setCustomValidity(el, errors) {
  const message = errors && errors.length ? errors.join("\n") : "";
  el.setCustomValidity(message);
  if (message)
    el.reportValidity();
}
function inputInfo(el) {
  const immediate = !!el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type));
  const multiple = !!el && el instanceof HTMLSelectElement && el.multiple;
  const file = !!el && el instanceof HTMLInputElement && el.type == "file";
  return { immediate, multiple, file };
}
function Form(formElement, timers, options2) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options2.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options2.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s2) {
    state = s2;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formElement;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options2.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options2.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options2.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formElement;
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (opts) => {
      if (!opts.clearAll)
        Timers_clear();
      else
        Timers_clearAll();
      if (!opts.cancelled)
        setTimeout(() => scrollToFirstError(Form2, options2), 1);
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed({ cancelled: true });
    });
    return {
      submitting() {
        Timers_start();
      },
      completed,
      scrollToFirstError() {
        setTimeout(() => scrollToFirstError(Form2, options2), 1);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
function updateProxyField(obj, path, updater) {
  const output = traversePath(obj, path, ({ parent, key: key2, value }) => {
    if (value === void 0)
      parent[key2] = /\D/.test(key2) ? {} : [];
    return parent[key2];
  });
  if (output) {
    const newValue = updater(output.value);
    output.parent[output.key] = newValue;
  }
  return obj;
}
function superFieldProxy(superForm2, path, baseOptions) {
  const form = superForm2.form;
  const path2 = splitPath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd, options2) {
      form.update((data) => updateProxyField(data, path2, upd), options2 ?? baseOptions);
    },
    set(value, options2) {
      form.update((data) => updateProxyField(data, path2, () => value), options2 ?? baseOptions);
    }
  };
}
function isSuperForm(form, options2) {
  const isSuperForm2 = "form" in form;
  if (!isSuperForm2 && options2?.taint !== void 0) {
    throw new SuperFormError("If options.taint is set, the whole superForm object must be used as a proxy.");
  }
  return isSuperForm2;
}
function fieldProxy(form, path, options2) {
  const path2 = splitPath(path);
  if (isSuperForm(form, options2)) {
    return superFieldProxy(form, path, options2);
  }
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd) {
      form.update((data) => updateProxyField(data, path2, upd));
    },
    set(value) {
      form.update((data) => updateProxyField(data, path2, () => value));
    }
  };
}
function schemaShape(schema, path = []) {
  const output = _schemaShape(schema, path);
  if (!output)
    throw new SchemaError("No shape could be created for schema.", path);
  return output;
}
function _schemaShape(schema, path) {
  assertSchema(schema, path);
  const info = schemaInfo(schema, false, path);
  if (info.array || info.union) {
    const arr = info.array || [];
    const union = info.union || [];
    return arr.concat(union).reduce((shape, next) => {
      const nextShape = _schemaShape(next, path);
      if (nextShape)
        shape = { ...shape ?? {}, ...nextShape };
      return shape;
    }, arr.length ? {} : void 0);
  }
  if (info.properties) {
    const output = {};
    for (const [key2, prop] of Object.entries(info.properties)) {
      const shape = _schemaShape(prop, [...path, key2]);
      if (shape)
        output[key2] = shape;
    }
    return output;
  }
  return info.types.includes("array") || info.types.includes("object") ? {} : void 0;
}
function shapeFromObject(obj) {
  let output = {};
  const isArray = Array.isArray(obj);
  for (const [key2, value] of Object.entries(obj)) {
    if (!value || typeof value !== "object")
      continue;
    if (isArray)
      output = { ...output, ...shapeFromObject(value) };
    else
      output[key2] = shapeFromObject(value);
  }
  return output;
}
function superForm(form, formOptions) {
  let initialForm;
  let options2 = formOptions ?? {};
  let initialValidator = void 0;
  {
    if (options2.legacy ?? LEGACY_MODE) {
      if (options2.resetForm === void 0)
        options2.resetForm = false;
      if (options2.taintedMessage === void 0)
        options2.taintedMessage = true;
    }
    if (STORYBOOK_MODE) {
      if (options2.applyAction === void 0)
        options2.applyAction = false;
    }
    if (typeof options2.SPA === "string") {
      if (options2.invalidateAll === void 0)
        options2.invalidateAll = false;
      if (options2.applyAction === void 0)
        options2.applyAction = false;
    }
    initialValidator = options2.validators;
    options2 = {
      ...defaultFormOptions,
      ...options2
    };
    if ((options2.SPA === true || typeof options2.SPA === "object") && options2.validators === void 0) {
      console.warn("No validators set for superForm in SPA mode. Add a validation adapter to the validators option, or set it to false to disable this warning.");
    }
    if (!form) {
      throw new SuperFormError("No form data sent to superForm. Make sure the output from superValidate is used (usually data.form) and that it's not null or undefined. Alternatively, an object with default values for the form can also be used, but then constraints won't be available.");
    }
    if (Context_isValidationObject(form) === false) {
      form = {
        id: options2.id ?? Math.random().toString(36).slice(2, 10),
        valid: false,
        posted: false,
        errors: {},
        data: form,
        shape: shapeFromObject(form)
      };
    }
    form = form;
    const _initialFormId = form.id = options2.id ?? form.id;
    const _currentPage = get_store_value(page) ?? (STORYBOOK_MODE ? {} : void 0);
    if (!initialForms.has(form)) {
      initialForms.set(form, form);
    }
    initialForm = initialForms.get(form);
    if (_currentPage.form && typeof _currentPage.form === "object") {
      const postedData = _currentPage.form;
      for (const postedForm of Context_findValidationForms(postedData).reverse()) {
        if (postedForm.id == _initialFormId && !initialForms.has(postedForm)) {
          initialForms.set(postedData, postedData);
          const pageDataForm = form;
          form = postedForm;
          form.constraints = pageDataForm.constraints;
          form.shape = pageDataForm.shape;
          if (form.valid && options2.resetForm && (options2.resetForm === true || options2.resetForm())) {
            form = clone$1(pageDataForm);
            form.message = clone$1(postedForm.message);
          }
          break;
        }
      }
    } else {
      form = clone$1(initialForm);
    }
    onDestroy(() => {
      Unsubscriptions_unsubscribe();
      NextChange_clear();
      EnhancedForm_destroy();
      for (const events of Object.values(formEvents)) {
        events.length = 0;
      }
      formIds.get(_currentPage)?.delete(_initialFormId);
    });
    if (options2.dataType !== "json") {
      const checkForNestedData = (key2, value) => {
        if (!value || typeof value !== "object")
          return;
        if (Array.isArray(value)) {
          if (value.length > 0)
            checkForNestedData(key2, value[0]);
        } else if (!(value instanceof Date) && !(value instanceof File) && !browser) {
          throw new SuperFormError(`Object found in form field "${key2}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
        }
      };
      for (const [key2, value] of Object.entries(form.data)) {
        checkForNestedData(key2, value);
      }
    }
  }
  const __data = {
    formId: form.id,
    form: clone$1(form.data),
    constraints: form.constraints ?? {},
    posted: form.posted,
    errors: clone$1(form.errors),
    message: clone$1(form.message),
    tainted: void 0,
    valid: form.valid,
    submitting: false,
    shape: form.shape
  };
  const Data = __data;
  const FormId = writable(options2.id ?? form.id);
  function Context_findValidationForms(data) {
    const forms = Object.values(data).filter((v2) => Context_isValidationObject(v2) !== false);
    return forms;
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : false;
  }
  const _formData = writable(form.data);
  const Form$1 = {
    subscribe: _formData.subscribe,
    set: (value, options22 = {}) => {
      const newData = clone$1(value);
      Tainted_update(newData, options22.taint ?? true);
      return _formData.set(newData);
    },
    update: (updater, options22 = {}) => {
      return _formData.update((value) => {
        const newData = updater(value);
        Tainted_update(newData, options22.taint ?? true);
        return newData;
      });
    }
  };
  function Form_isSPA() {
    return options2.SPA === true || typeof options2.SPA === "object";
  }
  async function Form_validate(opts = {}) {
    const dataToValidate = opts.formData ?? Data.form;
    let errors = {};
    let status;
    const validator2 = opts.adapter ?? options2.validators;
    if (typeof validator2 == "object") {
      if (validator2 != initialValidator && !("jsonSchema" in validator2)) {
        throw new SuperFormError('Client validation adapter found in options.validators. A full adapter must be used when changing validators dynamically, for example "zod" instead of "zodClient".');
      }
      status = await /* @__PURE__ */ validator2.validate(dataToValidate);
      if (!status.success) {
        errors = mapErrors(status.issues, validator2.shape ?? Data.shape ?? {});
      } else if (opts.recheckValidData !== false) {
        return Form_validate({ ...opts, recheckValidData: false });
      }
    } else {
      status = { success: true, data: {} };
    }
    const data = { ...Data.form, ...dataToValidate, ...status.success ? status.data : {} };
    return {
      valid: status.success,
      posted: false,
      errors,
      data,
      constraints: Data.constraints,
      message: void 0,
      id: Data.formId,
      shape: Data.shape
    };
  }
  function Form__changeEvent(event) {
    if (!options2.onChange || !event.paths.length || event.type == "blur")
      return;
    let changeEvent;
    const paths = event.paths.map(mergePath);
    if (event.type && event.paths.length == 1 && event.formElement && event.target instanceof Element) {
      changeEvent = {
        path: paths[0],
        paths,
        formElement: event.formElement,
        target: event.target,
        set(path, value, options22) {
          fieldProxy({ form: Form$1 }, path, options22).set(value);
        },
        get(path) {
          return get_store_value(fieldProxy(Form$1, path));
        }
      };
    } else {
      changeEvent = {
        paths,
        target: void 0,
        set(path, value, options22) {
          fieldProxy({ form: Form$1 }, path, options22).set(value);
        },
        get(path) {
          return get_store_value(fieldProxy(Form$1, path));
        }
      };
    }
    options2.onChange(changeEvent);
  }
  async function Form_clientValidation(event, force = false, adapter) {
    if (event) {
      if (options2.validators == "clear") {
        Errors.update(($errors) => {
          setPaths($errors, event.paths, void 0);
          return $errors;
        });
      }
      setTimeout(() => Form__changeEvent(event));
    }
    let skipValidation = false;
    if (!force) {
      if (options2.validationMethod == "onsubmit" || options2.validationMethod == "submit-only") {
        skipValidation = true;
      } else if (options2.validationMethod == "onblur" && event?.type == "input")
        skipValidation = true;
      else if (options2.validationMethod == "oninput" && event?.type == "blur")
        skipValidation = true;
    }
    if (skipValidation || !event || !options2.validators || options2.validators == "clear") {
      if (event?.paths) {
        const formElement = event?.formElement ?? EnhancedForm_get();
        if (formElement)
          Form__clearCustomValidity(formElement);
      }
      return;
    }
    const result = await Form_validate({ adapter });
    if (result.valid && (event.immediate || event.type != "input")) {
      Form$1.set(result.data, { taint: "ignore" });
    }
    await tick();
    Form__displayNewErrors(result.errors, event, force);
    return result;
  }
  function Form__clearCustomValidity(formElement) {
    const validity = /* @__PURE__ */ new Map();
    if (options2.customValidity && formElement) {
      for (const el of formElement.querySelectorAll(`[name]`)) {
        if (typeof el.name !== "string" || !el.name.length)
          continue;
        const message = "validationMessage" in el ? String(el.validationMessage) : "";
        validity.set(el.name, { el, message });
        updateCustomValidity(el, void 0);
      }
    }
    return validity;
  }
  async function Form__displayNewErrors(errors, event, force) {
    const { type, immediate, multiple, paths } = event;
    const previous = Data.errors;
    const output = {};
    let validity = /* @__PURE__ */ new Map();
    const formElement = event.formElement ?? EnhancedForm_get();
    if (formElement)
      validity = Form__clearCustomValidity(formElement);
    traversePaths(errors, (error) => {
      if (!Array.isArray(error.value))
        return;
      const currentPath = [...error.path];
      if (currentPath[currentPath.length - 1] == "_errors") {
        currentPath.pop();
      }
      const joinedPath = currentPath.join(".");
      function addError() {
        setPaths(output, [error.path], error.value);
        if (options2.customValidity && isEventError && validity.has(joinedPath)) {
          const { el, message } = validity.get(joinedPath);
          if (message != error.value) {
            setTimeout(() => updateCustomValidity(el, error.value));
            validity.clear();
          }
        }
      }
      if (force)
        return addError();
      const lastPath = error.path[error.path.length - 1];
      const isObjectError = lastPath == "_errors";
      const isEventError = error.value && paths.some((path) => {
        return isObjectError ? currentPath && path && currentPath.length > 0 && currentPath[0] == path[0] : joinedPath == path.join(".");
      });
      if (isEventError && options2.validationMethod == "oninput")
        return addError();
      if (immediate && !multiple && isEventError)
        return addError();
      if (multiple) {
        const errorPath = pathExists(get_store_value(Errors), error.path.slice(0, -1));
        if (errorPath?.value && typeof errorPath?.value == "object") {
          for (const errors2 of Object.values(errorPath.value)) {
            if (Array.isArray(errors2)) {
              return addError();
            }
          }
        }
      }
      const previousError = pathExists(previous, error.path);
      if (previousError && previousError.key in previousError.parent) {
        return addError();
      }
      if (isObjectError) {
        if (options2.validationMethod == "oninput" || type == "blur" && Tainted_hasBeenTainted(mergePath(error.path.slice(0, -1)))) {
          return addError();
        }
      } else {
        if (type == "blur" && isEventError) {
          return addError();
        }
      }
    });
    Errors.set(output);
  }
  function Form_set(data, options22 = {}) {
    if (options22.keepFiles) {
      traversePaths(Data.form, (info) => {
        if (info.value instanceof File || browser) {
          const dataPath = pathExists(data, info.path);
          if (!dataPath || !(dataPath.key in dataPath.parent)) {
            setPaths(data, [info.path], info.value);
          }
        }
      });
    }
    return Form$1.set(data, options22);
  }
  function Form_shouldReset(validForm, successActionResult) {
    return validForm && successActionResult && options2.resetForm && (options2.resetForm === true || options2.resetForm());
  }
  async function Form_updateFromValidation(form2, successResult) {
    if (form2.valid && successResult && Form_shouldReset(form2.valid, successResult)) {
      Form_reset({ message: form2.message, posted: true });
    } else {
      rebind({
        form: form2,
        untaint: successResult,
        keepFiles: true,
        // Check if the form data should be used for updating, or if the invalidateAll load function should be used:
        skipFormData: options2.invalidateAll == "force"
      });
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form2 });
    }
  }
  function Form_reset(opts = {}) {
    if (opts.newState)
      initialForm.data = { ...initialForm.data, ...opts.newState };
    const resetData = clone$1(initialForm);
    resetData.data = { ...resetData.data, ...opts.data };
    if (opts.id !== void 0)
      resetData.id = opts.id;
    rebind({
      form: resetData,
      untaint: true,
      message: opts.message,
      keepFiles: false,
      posted: opts.posted,
      resetted: true
    });
  }
  async function Form_updateFromActionResult(result) {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (Form_shouldReset(true, true))
        Form_reset({ posted: true });
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== Data.formId)
        continue;
      await Form_updateFromValidation(newForm, result.status >= 200 && result.status < 300);
    }
  }
  const Message = writable(__data.message);
  const Constraints = writable(__data.constraints);
  const Posted = writable(__data.posted);
  const Shape = writable(__data.shape);
  const _errors = writable(form.errors);
  const Errors = {
    subscribe: _errors.subscribe,
    set(value, options22) {
      return _errors.set(updateErrors(value, Data.errors, options22?.force));
    },
    update(updater, options22) {
      return _errors.update((value) => {
        return updateErrors(updater(value), Data.errors, options22?.force);
      });
    },
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: () => Errors.set({})
  };
  let NextChange = null;
  function NextChange_setHtmlEvent(event) {
    if (NextChange && event && Object.keys(event).length == 1 && event.paths?.length && NextChange.target && NextChange.target instanceof HTMLInputElement && NextChange.target.type.toLowerCase() == "file") {
      NextChange.paths = event.paths;
    } else {
      NextChange = event;
    }
    setTimeout(() => {
      Form_clientValidation(NextChange);
    }, 0);
  }
  function NextChange_additionalEventInformation(event, immediate, multiple, formElement, target) {
    if (NextChange === null) {
      NextChange = { paths: [] };
    }
    NextChange.type = event;
    NextChange.immediate = immediate;
    NextChange.multiple = multiple;
    NextChange.formElement = formElement;
    NextChange.target = target;
  }
  function NextChange_paths() {
    return NextChange?.paths ?? [];
  }
  function NextChange_clear() {
    NextChange = null;
  }
  const Tainted = {
    defaultMessage: "Leave page? Changes that you made may not be saved.",
    state: writable(),
    message: options2.taintedMessage,
    clean: clone$1(form.data),
    // Important to clone form.data, so it's not comparing the same object,
    forceRedirection: false
  };
  function Tainted_enable() {
    options2.taintedMessage = Tainted.message;
  }
  function Tainted_currentState() {
    return Tainted.state;
  }
  function Tainted_hasBeenTainted(path) {
    if (!Data.tainted)
      return false;
    if (!path)
      return !!Data.tainted;
    const field = pathExists(Data.tainted, splitPath(path));
    return !!field && field.key in field.parent;
  }
  function Tainted_isTainted(path) {
    if (!arguments.length)
      return Tainted__isObjectTainted(Data.tainted);
    if (typeof path === "boolean")
      return path;
    if (typeof path === "object")
      return Tainted__isObjectTainted(path);
    if (!Data.tainted || path === void 0)
      return false;
    const field = pathExists(Data.tainted, splitPath(path));
    return Tainted__isObjectTainted(field?.value);
  }
  function Tainted__isObjectTainted(obj) {
    if (!obj)
      return false;
    if (typeof obj === "object") {
      for (const obj2 of Object.values(obj)) {
        if (Tainted__isObjectTainted(obj2))
          return true;
      }
    }
    return obj === true;
  }
  function Tainted_update(newData, taintOptions) {
    if (taintOptions == "ignore")
      return;
    const paths = comparePaths(newData, Data.form);
    const newTainted = comparePaths(newData, Tainted.clean).map((path) => path.join());
    if (paths.length) {
      if (taintOptions == "untaint-all" || taintOptions == "untaint-form") {
        Tainted.state.set(void 0);
      } else {
        Tainted.state.update((currentlyTainted) => {
          if (!currentlyTainted)
            currentlyTainted = {};
          setPaths(currentlyTainted, paths, (path, data) => {
            if (!newTainted.includes(path.join()))
              return void 0;
            const currentValue = traversePath(newData, path);
            const cleanPath = traversePath(Tainted.clean, path);
            return currentValue && cleanPath && currentValue.value === cleanPath.value ? void 0 : taintOptions === true ? true : taintOptions === "untaint" ? void 0 : data.value;
          });
          return currentlyTainted;
        });
      }
    }
    NextChange_setHtmlEvent({ paths });
  }
  function Tainted_set(tainted, newClean) {
    Tainted.state.set(tainted);
    if (newClean)
      Tainted.clean = newClean;
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const Unsubscriptions = [
    // eslint-disable-next-line dci-lint/private-role-access
    Tainted.state.subscribe((tainted) => __data.tainted = clone$1(tainted)),
    // eslint-disable-next-line dci-lint/private-role-access
    Form$1.subscribe((form2) => __data.form = clone$1(form2)),
    // eslint-disable-next-line dci-lint/private-role-access
    Errors.subscribe((errors) => __data.errors = clone$1(errors)),
    FormId.subscribe((id) => __data.formId = id),
    Constraints.subscribe((constraints2) => __data.constraints = constraints2),
    Posted.subscribe((posted) => __data.posted = posted),
    Message.subscribe((message) => __data.message = message),
    Submitting.subscribe((submitting) => __data.submitting = submitting),
    Shape.subscribe((shape) => __data.shape = shape)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  let EnhancedForm;
  function EnhancedForm_get() {
    return EnhancedForm;
  }
  function EnhancedForm_setAction(action) {
    if (EnhancedForm)
      EnhancedForm.action = action;
  }
  function EnhancedForm_destroy() {
    if (EnhancedForm?.parentElement) {
      EnhancedForm.remove();
    }
    EnhancedForm = void 0;
  }
  const AllErrors = derived(Errors, ($errors) => $errors ? flattenErrors($errors) : []);
  options2.taintedMessage = void 0;
  function rebind(opts) {
    const form2 = opts.form;
    const message = opts.message ?? form2.message;
    if (opts.untaint || opts.resetted) {
      Tainted_set(typeof opts.untaint === "boolean" ? void 0 : opts.untaint, form2.data);
    }
    if (opts.skipFormData !== true) {
      Form_set(form2.data, {
        taint: "ignore",
        keepFiles: opts.keepFiles
      });
    }
    Message.set(message);
    if (opts.resetted)
      Errors.update(() => ({}), { force: true });
    else
      Errors.set(form2.errors);
    FormId.set(form2.id);
    Posted.set(opts.posted ?? form2.posted);
    if (form2.constraints)
      Constraints.set(form2.constraints);
    if (form2.shape)
      Shape.set(form2.shape);
    __data.valid = form2.valid;
    if (options2.flashMessage && shouldSyncFlash(options2)) {
      const flash = options2.flashMessage.module.getFlash(page);
      if (message && get_store_value(flash) === void 0) {
        flash.set(message);
      }
    }
  }
  const formEvents = {
    onSubmit: options2.onSubmit ? [options2.onSubmit] : [],
    onResult: options2.onResult ? [options2.onResult] : [],
    onUpdate: options2.onUpdate ? [options2.onUpdate] : [],
    onUpdated: options2.onUpdated ? [options2.onUpdated] : [],
    onError: options2.onError ? [options2.onError] : []
  };
  function superFormEnhance(FormElement, events) {
    if (options2.SPA !== void 0 && FormElement.method == "get")
      FormElement.method = "post";
    if (typeof options2.SPA === "string") {
      if (options2.SPA.length && FormElement.action == document.location.href) {
        FormElement.action = options2.SPA;
      }
    } else {
      EnhancedForm = FormElement;
    }
    if (events) {
      if (events.onError) {
        if (options2.onError === "apply") {
          throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
        } else if (events.onError === "apply") {
          throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
        }
        formEvents.onError.push(events.onError);
      }
      if (events.onResult)
        formEvents.onResult.push(events.onResult);
      if (events.onSubmit)
        formEvents.onSubmit.push(events.onSubmit);
      if (events.onUpdate)
        formEvents.onUpdate.push(events.onUpdate);
      if (events.onUpdated)
        formEvents.onUpdated.push(events.onUpdated);
    }
    Tainted_enable();
    let lastInputChange;
    async function onInput(e) {
      const info = inputInfo(e.target);
      if (info.immediate && !info.file)
        await new Promise((r2) => setTimeout(r2, 0));
      lastInputChange = NextChange_paths();
      NextChange_additionalEventInformation("input", info.immediate, info.multiple, FormElement, e.target ?? void 0);
    }
    async function onBlur(e) {
      if (Data.submitting)
        return;
      if (!lastInputChange || NextChange_paths() != lastInputChange) {
        return;
      }
      const info = inputInfo(e.target);
      if (info.immediate && !info.file)
        await new Promise((r2) => setTimeout(r2, 0));
      Form_clientValidation({
        paths: lastInputChange,
        immediate: info.multiple,
        multiple: info.multiple,
        type: "blur",
        formElement: FormElement,
        target: e.target ?? void 0
      });
      lastInputChange = void 0;
    }
    FormElement.addEventListener("focusout", onBlur);
    FormElement.addEventListener("input", onInput);
    onDestroy(() => {
      FormElement.removeEventListener("focusout", onBlur);
      FormElement.removeEventListener("input", onInput);
    });
    const htmlForm = Form(FormElement, { submitting: Submitting, delayed: Delayed, timeout: Timeout }, options2);
    let currentRequest;
    let customRequest = void 0;
    return enhance(FormElement, async (submitParams) => {
      let jsonData = void 0;
      let validationAdapter = options2.validators;
      const submit = {
        ...submitParams,
        jsonData(data) {
          if (options2.dataType !== "json") {
            throw new SuperFormError("options.dataType must be set to 'json' to use jsonData.");
          }
          jsonData = data;
        },
        validators(adapter) {
          validationAdapter = adapter;
        },
        customRequest(request) {
          customRequest = request;
        }
      };
      const _submitCancel = submit.cancel;
      let cancelled = false;
      function clientValidationResult(validation) {
        const validationResult = { ...validation, posted: true };
        const status = validationResult.valid ? 200 : (typeof options2.SPA === "boolean" || typeof options2.SPA === "string" ? void 0 : options2.SPA?.failStatus) ?? 400;
        const data = { form: validationResult };
        const result = validationResult.valid ? { type: "success", status, data } : { type: "failure", status, data };
        setTimeout(() => validationResponse({ result }), 0);
      }
      function clearOnSubmit() {
        switch (options2.clearOnSubmit) {
          case "errors-and-message":
            Errors.clear();
            Message.set(void 0);
            break;
          case "errors":
            Errors.clear();
            break;
          case "message":
            Message.set(void 0);
            break;
        }
      }
      function cancel(opts = {
        resetTimers: true
      }) {
        cancelled = true;
        if (opts.resetTimers && htmlForm.isSubmitting()) {
          htmlForm.completed({ cancelled });
        }
        return _submitCancel();
      }
      submit.cancel = cancel;
      if (htmlForm.isSubmitting() && options2.multipleSubmits == "prevent") {
        cancel({ resetTimers: false });
      } else {
        if (htmlForm.isSubmitting() && options2.multipleSubmits == "abort") {
          if (currentRequest)
            currentRequest.abort();
        }
        htmlForm.submitting();
        currentRequest = submit.controller;
        for (const event of formEvents.onSubmit) {
          await event(submit);
        }
      }
      if (cancelled && options2.flashMessage)
        cancelFlash(options2);
      if (!cancelled) {
        const noValidate = !Form_isSPA() && (FormElement.noValidate || (submit.submitter instanceof HTMLButtonElement || submit.submitter instanceof HTMLInputElement) && submit.submitter.formNoValidate);
        let validation = void 0;
        const validateForm = async () => {
          return await Form_validate({ adapter: validationAdapter });
        };
        clearOnSubmit();
        if (!noValidate) {
          validation = await validateForm();
          if (!validation.valid) {
            cancel({ resetTimers: false });
            clientValidationResult(validation);
          }
        }
        if (!cancelled) {
          if (options2.flashMessage && (options2.clearOnSubmit == "errors-and-message" || options2.clearOnSubmit == "message") && shouldSyncFlash(options2)) {
            options2.flashMessage.module.getFlash(page).set(void 0);
          }
          const submitData = "formData" in submit ? submit.formData : submit.data;
          lastInputChange = void 0;
          if (Form_isSPA()) {
            if (!validation)
              validation = await validateForm();
            cancel({ resetTimers: false });
            clientValidationResult(validation);
          } else if (options2.dataType === "json") {
            if (!validation)
              validation = await validateForm();
            const postData = clone$1(jsonData ?? validation.data);
            traversePaths(postData, (data) => {
              if (data.value instanceof File) {
                const key2 = "__superform_file_" + mergePath(data.path);
                submitData.append(key2, data.value);
                return data.set(void 0);
              } else if (Array.isArray(data.value) && data.value.length && data.value.every((v2) => v2 instanceof File)) {
                const key2 = "__superform_files_" + mergePath(data.path);
                for (const file of data.value) {
                  submitData.append(key2, file);
                }
                return data.set(void 0);
              }
            });
            Object.keys(postData).forEach((key2) => {
              if (typeof submitData.get(key2) === "string") {
                submitData.delete(key2);
              }
            });
            const chunks = chunkSubstr(stringify(postData), options2.jsonChunkSize ?? 5e5);
            for (const chunk of chunks) {
              submitData.append("__superform_json", chunk);
            }
          }
          if (!submitData.has("__superform_id")) {
            const id = Data.formId;
            if (id !== void 0)
              submitData.set("__superform_id", id);
          }
          if (typeof options2.SPA === "string") {
            EnhancedForm_setAction(options2.SPA);
          }
        }
      }
      function chunkSubstr(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);
        for (let i2 = 0, o = 0; i2 < numChunks; ++i2, o += size) {
          chunks[i2] = str.substring(o, o + size);
        }
        return chunks;
      }
      async function validationResponse(event) {
        let cancelled2 = false;
        currentRequest = null;
        let result = "type" in event.result && "status" in event.result ? event.result : {
          type: "error",
          status: parseInt(String(event.result.status)) || 500,
          error: event.result.error instanceof Error ? event.result.error : event.result
        };
        const cancel2 = () => cancelled2 = true;
        const data = {
          result,
          formEl: FormElement,
          formElement: FormElement,
          cancel: cancel2
        };
        const unsubCheckforNav = STORYBOOK_MODE || !Form_isSPA() ? () => {
        } : navigating.subscribe(($nav) => {
          if (!$nav || $nav.from?.route.id === $nav.to?.route.id)
            return;
          cancel2();
        });
        for (const event2 of formEvents.onResult) {
          await event2(data);
        }
        result = data.result;
        if (!cancelled2) {
          if ((result.type === "success" || result.type == "failure") && result.data) {
            const forms = Context_findValidationForms(result.data);
            if (!forms.length) {
              throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
            }
            for (const newForm of forms) {
              if (newForm.id !== Data.formId)
                continue;
              const data2 = {
                form: newForm,
                formEl: FormElement,
                formElement: FormElement,
                cancel: () => cancelled2 = true,
                result
              };
              for (const event2 of formEvents.onUpdate) {
                await event2(data2);
              }
              result = data2.result;
              if (!cancelled2) {
                if (options2.customValidity) {
                  setCustomValidityForm(FormElement, data2.form.errors);
                }
                if (Form_shouldReset(data2.form.valid, result.type == "success")) {
                  data2.formElement.querySelectorAll('input[type="file"]').forEach((e) => e.value = "");
                }
              }
            }
          }
          if (!cancelled2) {
            if (result.type !== "error") {
              if (result.type === "success" && options2.invalidateAll) {
                await invalidateAll();
              }
              if (options2.applyAction) {
                await applyAction();
              } else {
                await Form_updateFromActionResult(result);
              }
            } else {
              if (options2.applyAction) {
                if (options2.onError == "apply") {
                  await applyAction();
                } else {
                  ({
                    type: "failure",
                    status: Math.floor(result.status || 500),
                    data: result
                  });
                  await applyAction();
                }
              }
              if (options2.onError !== "apply") {
                const data2 = { result, message: Message };
                for (const onErrorEvent of formEvents.onError) {
                  if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options2.flashMessage?.onError)) {
                    await onErrorEvent(data2);
                  }
                }
              }
            }
            if (options2.flashMessage) {
              if (result.type == "error" && options2.flashMessage.onError) {
                await options2.flashMessage.onError({
                  result,
                  flashMessage: options2.flashMessage.module.getFlash(page)
                });
              }
            }
          }
        }
        if (cancelled2 && options2.flashMessage) {
          cancelFlash(options2);
        }
        if (cancelled2 || result.type != "redirect") {
          htmlForm.completed({ cancelled: cancelled2 });
        } else if (STORYBOOK_MODE) {
          htmlForm.completed({ cancelled: cancelled2, clearAll: true });
        } else {
          const unsub = navigating.subscribe(($nav) => {
            if ($nav)
              return;
            setTimeout(() => {
              try {
                if (unsub)
                  unsub();
              } catch {
              }
            });
            if (htmlForm.isSubmitting()) {
              htmlForm.completed({ cancelled: cancelled2, clearAll: true });
            }
          });
        }
        unsubCheckforNav();
      }
      if (customRequest) {
        if (!cancelled)
          _submitCancel();
        const response = await customRequest(submitParams);
        const result = response instanceof Response ? deserialize(await response.text()) : deserialize(response.responseText);
        if (result.type === "error")
          result.status = response.status;
        validationResponse({ result });
      }
      return validationResponse;
    });
  }
  function removeFiles2(formData) {
    const paths = [];
    traversePaths(formData, (data2) => {
      if (data2.value instanceof File) {
        paths.push(data2.path);
        return "skip";
      } else if (Array.isArray(data2.value) && data2.value.length && data2.value.every((d) => d instanceof File)) {
        paths.push(data2.path);
        return "skip";
      }
    });
    if (!paths.length)
      return { data: formData, paths };
    const data = clone$1(formData);
    setPaths(data, paths, (path) => pathExists(initialForm.data, path)?.value);
    return { data, paths };
  }
  return {
    form: Form$1,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    tainted: Tainted_currentState(),
    submitting: readonly(Submitting),
    delayed: readonly(Delayed),
    timeout: readonly(Timeout),
    options: options2,
    capture() {
      const { data, paths } = removeFiles2(Data.form);
      let tainted = Data.tainted;
      if (paths.length) {
        tainted = clone$1(tainted) ?? {};
        setPaths(tainted, paths, false);
      }
      return {
        valid: Data.valid,
        posted: Data.posted,
        errors: Data.errors,
        data,
        constraints: Data.constraints,
        message: Data.message,
        id: Data.formId,
        tainted,
        shape: Data.shape
      };
    },
    restore: (snapshot) => {
      rebind({ form: snapshot, untaint: snapshot.tainted ?? true });
    },
    async validate(path, opts = {}) {
      if (!options2.validators) {
        throw new SuperFormError("options.validators must be set to use the validate method.");
      }
      if (opts.update === void 0)
        opts.update = true;
      if (opts.taint === void 0)
        opts.taint = false;
      if (typeof opts.errors == "string")
        opts.errors = [opts.errors];
      let data;
      const splittedPath = splitPath(path);
      if ("value" in opts) {
        if (opts.update === true || opts.update === "value") {
          Form$1.update(($form) => {
            setPaths($form, [splittedPath], opts.value);
            return $form;
          }, { taint: opts.taint });
          data = Data.form;
        } else {
          data = clone$1(Data.form);
          setPaths(data, [splittedPath], opts.value);
        }
      } else {
        data = Data.form;
      }
      const result = await Form_validate({ formData: data });
      const error = pathExists(result.errors, splittedPath);
      if (error && error.value && opts.errors) {
        error.value = opts.errors;
      }
      if (opts.update === true || opts.update == "errors") {
        Errors.update(($errors) => {
          setPaths($errors, [splittedPath], error?.value);
          return $errors;
        });
      }
      return error?.value;
    },
    async validateForm(opts = {}) {
      if (!options2.validators && !opts.schema) {
        throw new SuperFormError("options.validators or the schema option must be set to use the validateForm method.");
      }
      const result = opts.update ? await Form_clientValidation({ paths: [] }, true, opts.schema) : Form_validate({ adapter: opts.schema });
      const enhancedForm = EnhancedForm_get();
      if (opts.update && enhancedForm) {
        setTimeout(() => {
          if (!enhancedForm)
            return;
          scrollToFirstError(enhancedForm, {
            ...options2,
            scrollToError: opts.focusOnError === false ? "off" : options2.scrollToError
          });
        }, 1);
      }
      return result || Form_validate({ adapter: opts.schema });
    },
    allErrors: AllErrors,
    posted: Posted,
    reset(options22) {
      return Form_reset({
        message: options22?.keepMessage ? Data.message : void 0,
        data: options22?.data,
        id: options22?.id,
        newState: options22?.newState
      });
    },
    submit(submitter) {
      const form2 = EnhancedForm_get() ? EnhancedForm_get() : submitter && submitter instanceof HTMLElement ? submitter.closest("form") : void 0;
      if (!form2) {
        throw new SuperFormError("use:enhance must be added to the form to use submit, or pass a HTMLElement inside the form (or the form itself) as an argument.");
      }
      if (!form2.requestSubmit) {
        return form2.submit();
      }
      const isSubmitButton = submitter && (submitter instanceof HTMLButtonElement && submitter.type == "submit" || submitter instanceof HTMLInputElement && ["submit", "image"].includes(submitter.type));
      form2.requestSubmit(isSubmitButton ? submitter : void 0);
    },
    isTainted: Tainted_isTainted,
    enhance: superFormEnhance
  };
}
function constraints(schema) {
  return _constraints(schemaInfo(schema, false, []), []);
}
function merge2(...constraints2) {
  const filtered = constraints2.filter((c2) => !!c2);
  if (!filtered.length)
    return void 0;
  if (filtered.length == 1)
    return filtered[0];
  return merge(...filtered);
}
function _constraints(info, path) {
  if (!info)
    return void 0;
  let output = void 0;
  if (info.union && info.union.length) {
    const infos = info.union.map((s2) => schemaInfo(s2, info.isOptional, path));
    const merged = infos.map((i2) => _constraints(i2, path));
    output = merge2(output, ...merged);
    if (output && (info.isNullable || info.isOptional || infos.some((i2) => i2?.isNullable || i2?.isOptional))) {
      delete output.required;
    }
  }
  if (info.array) {
    output = merge2(output, ...info.array.map((i2) => _constraints(schemaInfo(i2, info.isOptional, path), path)));
  }
  if (info.properties) {
    const obj = {};
    for (const [key2, prop] of Object.entries(info.properties)) {
      const propInfo = schemaInfo(prop, !info.required?.includes(key2) || prop.default !== void 0, [key2]);
      const propConstraint = _constraints(propInfo, [...path, key2]);
      if (typeof propConstraint === "object" && Object.values(propConstraint).length > 0) {
        obj[key2] = propConstraint;
      }
    }
    output = merge2(output, obj);
  }
  return output ?? constraint(info);
}
function constraint(info) {
  const output = {};
  const schema = info.schema;
  const type = schema.type;
  const format = schema.format;
  if (type == "integer" && format == "unix-time") {
    const date = schema;
    if (date.minimum !== void 0)
      output.min = new Date(date.minimum).toISOString();
    if (date.maximum !== void 0)
      output.max = new Date(date.maximum).toISOString();
  } else if (type == "string") {
    const str = schema;
    const patterns = [
      str.pattern,
      ...str.allOf ? str.allOf.map((s2) => typeof s2 == "boolean" ? void 0 : s2.pattern) : []
    ].filter((s2) => s2 !== void 0);
    if (patterns.length > 0)
      output.pattern = patterns[0];
    if (str.minLength !== void 0)
      output.minlength = str.minLength;
    if (str.maxLength !== void 0)
      output.maxlength = str.maxLength;
  } else if (type == "number" || type == "integer") {
    const num = schema;
    if (num.minimum !== void 0)
      output.min = num.minimum;
    else if (num.exclusiveMinimum !== void 0)
      output.min = num.exclusiveMinimum + (type == "integer" ? 1 : Number.MIN_VALUE);
    if (num.maximum !== void 0)
      output.max = num.maximum;
    else if (num.exclusiveMaximum !== void 0)
      output.max = num.exclusiveMaximum - (type == "integer" ? 1 : Number.MIN_VALUE);
    if (num.multipleOf !== void 0)
      output.step = num.multipleOf;
  } else if (type == "array") {
    const arr = schema;
    if (arr.minItems !== void 0)
      output.min = arr.minItems;
    if (arr.maxItems !== void 0)
      output.max = arr.maxItems;
  }
  if (!info.isNullable && !info.isOptional) {
    output.required = true;
  }
  return Object.keys(output).length > 0 ? output : void 0;
}
function schemaHash(schema) {
  return hashCode(_schemaHash(schemaInfo(schema, false, []), 0, []));
}
function _schemaHash(info, depth, path) {
  if (!info)
    return "";
  function tab() {
    return "  ".repeat(depth);
  }
  function mapSchemas(schemas) {
    return schemas.map((s2) => _schemaHash(schemaInfo(s2, info?.isOptional ?? false, path), depth + 1, path)).filter((s2) => s2).join("|");
  }
  function nullish() {
    const output = [];
    if (info?.isNullable)
      output.push("null");
    if (info?.isOptional)
      output.push("undefined");
    return !output.length ? "" : "|" + output.join("|");
  }
  if (info.union) {
    return "Union {\n  " + tab() + mapSchemas(info.union) + "\n" + tab() + "}" + nullish();
  }
  if (info.properties) {
    const output = [];
    for (const [key2, prop] of Object.entries(info.properties)) {
      const propInfo = schemaInfo(prop, !info.required?.includes(key2) || prop.default !== void 0, [key2]);
      output.push(key2 + ": " + _schemaHash(propInfo, depth + 1, path));
    }
    return "Object {\n  " + tab() + output.join(",\n  ") + "\n" + tab() + "}" + nullish();
  }
  if (info.array) {
    return "Array[" + mapSchemas(info.array) + "]" + nullish();
  }
  return info.types.join("|") + nullish();
}
function hashCode(str) {
  let hash2 = 0;
  for (let i2 = 0, len = str.length; i2 < len; i2++) {
    const chr = str.charCodeAt(i2);
    hash2 = (hash2 << 5) - hash2 + chr;
    hash2 |= 0;
  }
  if (hash2 < 0)
    hash2 = hash2 >>> 0;
  return hash2.toString(36);
}
// @__NO_SIDE_EFFECTS__
function createAdapter(adapter, jsonSchema) {
  if (!adapter || !("superFormValidationLibrary" in adapter)) {
    throw new SuperFormError('Superforms v2 requires a validation adapter for the schema. Import one of your choice from "sveltekit-superforms/adapters" and wrap the schema with it.');
  }
  if (!jsonSchema)
    jsonSchema = adapter.jsonSchema;
  return {
    ...adapter,
    constraints: adapter.constraints ?? constraints(jsonSchema),
    defaults: adapter.defaults ?? defaultValues(jsonSchema),
    shape: schemaShape(jsonSchema),
    id: schemaHash(jsonSchema)
  };
}
async function parseRequest(data, schemaData, options2) {
  let parsed;
  if (data instanceof FormData) {
    parsed = parseFormData(data, schemaData, options2);
  } else if (data instanceof URL || data instanceof URLSearchParams) {
    parsed = parseSearchParams(data, schemaData, options2);
  } else if (data instanceof Request) {
    parsed = await tryParseFormData(data, schemaData, options2);
  } else if (
    // RequestEvent
    data && typeof data === "object" && "request" in data && data.request instanceof Request
  ) {
    parsed = await tryParseFormData(data.request, schemaData, options2);
  } else {
    parsed = {
      id: void 0,
      data,
      posted: false
    };
  }
  return parsed;
}
async function tryParseFormData(request, schemaData, options2) {
  let formData = void 0;
  try {
    formData = await request.formData();
  } catch (e) {
    if (e instanceof TypeError && e.message.includes("already been consumed")) {
      throw e;
    }
    return { id: void 0, data: void 0, posted: false };
  }
  return parseFormData(formData, schemaData, options2);
}
function parseSearchParams(data, schemaData, options2) {
  if (data instanceof URL)
    data = data.searchParams;
  const convert = new FormData();
  for (const [key2, value] of data.entries()) {
    convert.append(key2, value);
  }
  const output = parseFormData(convert, schemaData, options2);
  output.posted = false;
  return output;
}
function parseFormData(formData, schemaData, options2) {
  function tryParseSuperJson() {
    if (formData.has("__superform_json")) {
      try {
        const output = parse(formData.getAll("__superform_json").join("") ?? "");
        if (typeof output === "object") {
          const filePaths = Array.from(formData.keys());
          for (const path of filePaths.filter((path2) => path2.startsWith("__superform_file_"))) {
            const realPath = splitPath(path.substring(17));
            setPaths(output, [realPath], formData.get(path));
          }
          for (const path of filePaths.filter((path2) => path2.startsWith("__superform_files_"))) {
            const realPath = splitPath(path.substring(18));
            const allFiles = formData.getAll(path);
            setPaths(output, [realPath], Array.from(allFiles));
          }
          return output;
        }
      } catch {
      }
    }
    return null;
  }
  const data = tryParseSuperJson();
  const id = formData.get("__superform_id")?.toString();
  return data ? { id, data, posted: true } : {
    id,
    data: _parseFormData(formData, schemaData, options2),
    posted: true
  };
}
function _parseFormData(formData, schema, options2) {
  const output = {};
  let schemaKeys;
  if (options2?.strict) {
    schemaKeys = new Set([...formData.keys()].filter((key2) => !key2.startsWith("__superform_")));
  } else {
    let unionKeys = [];
    if (schema.anyOf) {
      const info = schemaInfo(schema, false, []);
      if (info.union?.some((s2) => s2.type !== "object")) {
        throw new SchemaError("All form types must be an object if schema is a union.");
      }
      unionKeys = info.union?.flatMap((s2) => Object.keys(s2.properties ?? {})) ?? [];
    }
    schemaKeys = new Set([
      ...unionKeys,
      ...Object.keys(schema.properties ?? {}),
      ...schema.additionalProperties ? formData.keys() : []
    ].filter((key2) => !key2.startsWith("__superform_")));
  }
  function parseSingleEntry(key2, entry, info) {
    if (options2?.preprocessed && options2.preprocessed.includes(key2)) {
      return entry;
    }
    if (entry && typeof entry !== "string") {
      const allowFiles = legacyMode ? options2?.allowFiles === true : options2?.allowFiles !== false;
      return !allowFiles ? void 0 : entry.size ? entry : info.isNullable ? null : void 0;
    }
    if (info.types.length > 1) {
      throw new SchemaError(unionError, key2);
    }
    const [type] = info.types;
    return parseFormDataEntry(key2, entry, type ?? "any", info);
  }
  const defaultPropertyType = typeof schema.additionalProperties == "object" ? schema.additionalProperties : { type: "string" };
  for (const key2 of schemaKeys) {
    const property = schema.properties ? schema.properties[key2] : defaultPropertyType;
    assertSchema(property, key2);
    const info = schemaInfo(property ?? defaultPropertyType, !schema.required?.includes(key2), [
      key2
    ]);
    if (!info)
      continue;
    if (!info.types.includes("boolean") && !schema.additionalProperties && !formData.has(key2)) {
      continue;
    }
    const entries = formData.getAll(key2);
    if (info.union && info.union.length > 1) {
      throw new SchemaError(unionError, key2);
    }
    if (info.types.includes("array") || info.types.includes("set")) {
      const items = property.items ?? (info.union?.length == 1 ? info.union[0] : void 0);
      if (!items || typeof items == "boolean" || Array.isArray(items) && items.length != 1) {
        throw new SchemaError('Arrays must have a single "items" property that defines its type.', key2);
      }
      const arrayType2 = Array.isArray(items) ? items[0] : items;
      assertSchema(arrayType2, key2);
      const arrayInfo = schemaInfo(arrayType2, info.isOptional, [key2]);
      if (!arrayInfo)
        continue;
      const isFileArray = entries.length && entries.some((e) => e && typeof e !== "string");
      const arrayData = entries.map((e) => parseSingleEntry(key2, e, arrayInfo));
      if (isFileArray && arrayData.every((file) => !file))
        arrayData.length = 0;
      output[key2] = info.types.includes("set") ? new Set(arrayData) : arrayData;
    } else {
      output[key2] = parseSingleEntry(key2, entries[entries.length - 1], info);
    }
  }
  return output;
}
function parseFormDataEntry(key2, value, type, info) {
  if (!value) {
    if (type == "boolean" && info.isOptional && info.schema.default === true) {
      return false;
    }
    const defaultValue2 = defaultValues(info.schema, info.isOptional, [key2]);
    if (info.schema.enum && defaultValue2 !== null && defaultValue2 !== void 0) {
      return value;
    }
    if (defaultValue2 !== void 0)
      return defaultValue2;
    if (info.isNullable)
      return null;
    if (info.isOptional)
      return void 0;
  }
  function typeError() {
    throw new SchemaError(type[0].toUpperCase() + type.slice(1) + ` type found. Set the dataType option to "json" and add use:enhance on the client to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`, key2);
  }
  switch (type) {
    case "string":
    case "any":
      return value;
    case "integer":
      return parseInt(value ?? "", 10);
    case "number":
      return parseFloat(value ?? "");
    case "boolean":
      return Boolean(value == "false" ? "" : value).valueOf();
    case "unix-time": {
      const date = new Date(value ?? "");
      return !isNaN(date) ? date : void 0;
    }
    case "bigint":
      return BigInt(value ?? ".");
    case "symbol":
      return Symbol(String(value));
    case "set":
    case "array":
    case "object":
      return typeError();
    default:
      throw new SuperFormError("Unsupported schema type for FormData: " + type);
  }
}
async function validate(schema, data, errorMap2) {
  const result = await schema.safeParseAsync(data, { errorMap: errorMap2 });
  if (result.success) {
    return {
      data: result.data,
      success: true
    };
  }
  return {
    issues: result.error.issues.map(({ message, path }) => ({ message, path })),
    success: false
  };
}
function _zod(schema, options2) {
  return /* @__PURE__ */ createAdapter({
    superFormValidationLibrary: "zod",
    validate: async (data) => validate(schema, data, options2?.errorMap),
    jsonSchema: options2?.jsonSchema ?? /* @__PURE__ */ zodToJSONSchema(schema, options2?.config),
    defaults: options2?.defaults
  });
}
function _zodClient(schema, options2) {
  return {
    superFormValidationLibrary: "zod",
    validate: async (data) => validate(schema, data, options2?.errorMap)
  };
}
var import_memoize_weak, browser, formSchema, conversionFormatTypes, SuperFormError, SchemaError, noCustomValidityDataAttribute, isElementInViewport, scrollToAndCenter, immediateInputTypes, FetchStatus, activeTimers, scrollToFirstError, formIds, initialForms, defaultOnError, defaultFormOptions, LEGACY_MODE, STORYBOOK_MODE, legacyMode, unionError, memoize, defaultOptions3, zodToJSONSchema, zod, zodClient;
var init_zod = __esm({
  ".svelte-kit/output/server/chunks/zod.js"() {
    init_lib();
    init_index2();
    init_stores();
    init_chunks();
    init_lifecycle();
    init_scheduler();
    init_devalue();
    init_devalue();
    init_just_clone();
    init_esm();
    init_esm2();
    import_memoize_weak = __toESM(require_memoize_weak(), 1);
    browser = BROWSER;
    formSchema = z.object({
      email: z.string().email()
    });
    conversionFormatTypes = ["unix-time", "bigint", "any", "symbol", "set"];
    SuperFormError = class _SuperFormError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _SuperFormError.prototype);
      }
    };
    SchemaError = class _SchemaError extends SuperFormError {
      path;
      constructor(message, path) {
        super((path && path.length ? `[${Array.isArray(path) ? path.join(".") : path}] ` : "") + message);
        this.path = Array.isArray(path) ? path.join(".") : path;
        Object.setPrototypeOf(this, _SchemaError.prototype);
      }
    };
    noCustomValidityDataAttribute = "noCustomValidity";
    isElementInViewport = (el, topOffset = 0) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    };
    scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
      const elementRect = el.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const top = absoluteElementTop - window.innerHeight / (2 * offset);
      window.scrollTo({ left: 0, top, behavior });
    };
    immediateInputTypes = ["checkbox", "radio", "range", "file"];
    (function(FetchStatus2) {
      FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
      FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
      FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
      FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
    })(FetchStatus || (FetchStatus = {}));
    activeTimers = /* @__PURE__ */ new Set();
    scrollToFirstError = async (Form2, options2) => {
      if (options2.scrollToError == "off")
        return;
      const selector = options2.errorSelector;
      if (!selector)
        return;
      await tick();
      let el;
      el = Form2.querySelector(selector);
      if (!el)
        return;
      el = el.querySelector(selector) ?? el;
      const nav = options2.stickyNavbar ? document.querySelector(options2.stickyNavbar) : null;
      if (typeof options2.scrollToError != "string") {
        el.scrollIntoView(options2.scrollToError);
      } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
        scrollToAndCenter(el, void 0, options2.scrollToError);
      }
      function Form_shouldAutoFocus(userAgent) {
        if (typeof options2.autoFocusOnError === "boolean")
          return options2.autoFocusOnError;
        else
          return !/iPhone|iPad|iPod|Android/i.test(userAgent);
      }
      if (!Form_shouldAutoFocus(navigator.userAgent))
        return;
      let focusEl;
      focusEl = el;
      if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
        focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
      }
      if (focusEl) {
        try {
          focusEl.focus({ preventScroll: true });
          if (options2.selectErrorText && focusEl.tagName == "INPUT") {
            focusEl.select();
          }
        } catch (err) {
        }
      }
    };
    formIds = /* @__PURE__ */ new WeakMap();
    initialForms = /* @__PURE__ */ new WeakMap();
    defaultOnError = (event) => {
      console.warn("Unhandled error caught by Superforms, use onError event to handle it:", event.result.error);
    };
    defaultFormOptions = {
      applyAction: true,
      invalidateAll: true,
      resetForm: true,
      autoFocusOnError: "detect",
      scrollToError: "smooth",
      errorSelector: '[aria-invalid="true"],[data-invalid]',
      selectErrorText: false,
      stickyNavbar: void 0,
      taintedMessage: false,
      onSubmit: void 0,
      onResult: void 0,
      onUpdate: void 0,
      onUpdated: void 0,
      onError: defaultOnError,
      dataType: "form",
      validators: void 0,
      customValidity: false,
      clearOnSubmit: "message",
      delayMs: 500,
      timeoutMs: 8e3,
      multipleSubmits: "prevent",
      SPA: void 0,
      validationMethod: "auto"
    };
    LEGACY_MODE = false;
    try {
      if (SUPERFORMS_LEGACY)
        LEGACY_MODE = true;
    } catch {
    }
    STORYBOOK_MODE = false;
    try {
      if (globalThis.STORIES)
        STORYBOOK_MODE = true;
    } catch {
    }
    legacyMode = false;
    try {
      if (SUPERFORMS_LEGACY)
        legacyMode = true;
    } catch {
    }
    unionError = 'FormData parsing failed: Unions are only supported when the dataType option for superForm is set to "json".';
    memoize = import_memoize_weak.default;
    defaultOptions3 = {
      dateStrategy: "integer",
      pipeStrategy: "output",
      $refStrategy: "none"
    };
    zodToJSONSchema = /* @__NO_SIDE_EFFECTS__ */ (...params) => {
      params[1] = typeof params[1] == "object" ? { ...defaultOptions3, ...params[1] } : defaultOptions3;
      return zodToJsonSchema(...params);
    };
    zod = /* @__PURE__ */ memoize(_zod);
    zodClient = /* @__PURE__ */ memoize(_zodClient);
  }
});

// .svelte-kit/output/server/chunks/superValidate.js
async function superValidate(data, adapter, options2) {
  if (data && "superFormValidationLibrary" in data) {
    options2 = adapter;
    adapter = data;
    data = void 0;
  }
  const validator2 = adapter;
  const defaults3 = options2?.defaults ?? validator2.defaults;
  const jsonSchema = validator2.jsonSchema;
  const parsed = await parseRequest(data, jsonSchema, options2);
  const addErrors = options2?.errors ?? (options2?.strict ? true : !!parsed.data);
  const parsedData = options2?.strict ? parsed.data ?? {} : mergeDefaults(parsed.data, defaults3);
  let status;
  if (!!parsed.data || addErrors) {
    status = await /* @__PURE__ */ validator2.validate(parsedData);
  } else {
    status = { success: false, issues: [] };
  }
  const valid = status.success;
  const errors = valid || !addErrors ? {} : mapErrors(status.issues, validator2.shape);
  const dataWithDefaults = valid ? status.data : replaceInvalidDefaults(options2?.strict ? mergeDefaults(parsedData, defaults3) : parsedData, defaults3, jsonSchema, status.issues, options2?.preprocessed);
  let outputData;
  if (jsonSchema.additionalProperties === false) {
    outputData = {};
    for (const key2 of Object.keys(jsonSchema.properties ?? {})) {
      if (key2 in dataWithDefaults)
        outputData[key2] = dataWithDefaults[key2];
    }
  } else {
    outputData = dataWithDefaults;
  }
  const output = {
    id: parsed.id ?? options2?.id ?? validator2.id,
    valid,
    posted: parsed.posted,
    errors,
    data: outputData
  };
  if (!parsed.posted) {
    output.constraints = validator2.constraints;
    if (Object.keys(validator2.shape).length) {
      output.shape = validator2.shape;
    }
  }
  return output;
}
function withFiles(obj) {
  if (typeof obj !== "object")
    return obj;
  for (const key2 in obj) {
    const value = obj[key2];
    if (value instanceof File)
      delete obj[key2];
    else if (value && typeof value === "object")
      withFiles(value);
  }
  return obj;
}
function fail2(status, data) {
  function checkForm(data2) {
    return !!data2 && typeof data2 === "object" && "valid" in data2 && "data" in data2 && "id" in data2;
  }
  function checkObj(data2) {
    if (data2 && typeof data2 === "object") {
      for (const key2 in data2) {
        const v2 = data2[key2];
        if (checkForm(v2)) {
          v2.valid = false;
          removeFiles(v2);
        } else if (v2 && typeof v2 === "object") {
          checkObj(v2);
        }
      }
    }
    return data2;
  }
  return fail(status, checkObj(data));
}
var removeFiles;
var init_superValidate = __esm({
  ".svelte-kit/output/server/chunks/superValidate.js"() {
    init_chunks();
    init_just_clone();
    init_zod();
    init_esm();
    removeFiles = withFiles;
  }
});

// .svelte-kit/output/server/entries/pages/(app)/(auth)/signin/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions,
  load: () => load
});
var import_memoize_weak2, load, actions;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/(auth)/signin/_page.server.ts.js"() {
    init_zod();
    init_stores();
    init_just_clone();
    init_esm();
    init_chunks();
    init_devalue();
    init_superValidate();
    import_memoize_weak2 = __toESM(require_memoize_weak(), 1);
    load = async () => {
      return {
        form: await superValidate(zod(formSchema))
      };
    };
    actions = {
      default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
          return fail2(400, {
            form
          });
        }
        await new Promise((resolve2) => setTimeout(resolve2, 800));
        return {
          form
        };
      }
    };
  }
});

// node_modules/nanoid/non-secure/index.js
var urlAlphabet, nanoid;
var init_non_secure = __esm({
  "node_modules/nanoid/non-secure/index.js"() {
    urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    nanoid = (size = 21) => {
      let id = "";
      let i2 = size;
      while (i2--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
  }
});

// .svelte-kit/output/server/chunks/input.js
function setFormField(props) {
  setContext(FORM_FIELD, props);
  return props;
}
function getFormField() {
  if (!hasContext(FORM_FIELD)) {
    ctxError("Form.Field");
  }
  return getContext(FORM_FIELD);
}
function setFormControl(props) {
  setContext(FORM_CONTROL, props);
  return props;
}
function ctxError(ctx) {
  throw new Error(`Unable to find \`${ctx}\` context. Did you forget to wrap the component in a \`${ctx}\`?`);
}
function getAriaDescribedBy({ fieldErrorsId = void 0, descriptionId = void 0, errors }) {
  let describedBy = "";
  if (descriptionId) {
    describedBy += descriptionId + " ";
  }
  if (errors.length && fieldErrorsId) {
    describedBy += fieldErrorsId;
  }
  return describedBy ? describedBy.trim() : void 0;
}
function getAriaRequired(constraints2) {
  if (!("required" in constraints2))
    return void 0;
  return constraints2.required ? "true" : void 0;
}
function getAriaInvalid(errors) {
  return errors && errors.length ? "true" : void 0;
}
function getDataFsError(errors) {
  return errors && errors.length ? "" : void 0;
}
function generateId() {
  return nanoid(5);
}
function extractErrorArray(errors) {
  if (Array.isArray(errors))
    return errors;
  if (typeof errors === "object" && "_errors" in errors) {
    if (errors._errors !== void 0)
      return errors._errors;
  }
  return [];
}
function getValueAtPath(path, obj) {
  const keys = path.split(/[[\].]/).filter(Boolean);
  let value = obj;
  for (const key2 of keys) {
    if (typeof value !== "object" || value === null) {
      return void 0;
    }
    value = value[key2];
  }
  return value;
}
var Chevron_left, Loader2, GitHubSvg2, FORM_FIELD, FORM_CONTROL, Field, Control$1, Field_errors, Form_field_errors, Form_field, Form_button, Control, Input;
var init_input = __esm({
  ".svelte-kit/output/server/chunks/input.js"() {
    init_ssr();
    init_Icon();
    init_lifecycle();
    init_index2();
    init_non_secure();
    init_clsx();
    init_dist();
    Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-left" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Loader2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const iconNode = [
        ["path", { "d": "M12 2v4" }],
        ["path", { "d": "m16.2 7.8 2.9-2.9" }],
        ["path", { "d": "M18 12h4" }],
        ["path", { "d": "m16.2 16.2 2.9 2.9" }],
        ["path", { "d": "M12 18v4" }],
        ["path", { "d": "m4.9 19.1 2.9-2.9" }],
        ["path", { "d": "M2 12h4" }],
        ["path", { "d": "m4.9 4.9 2.9 2.9" }]
      ];
      return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "loader" }, $$props, { iconNode }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    GitHubSvg2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%20256%20250'%20width='256'%20height='250'%20fill='%23fff'%20xmlns='http://www.w3.org/2000/svg'%20preserveAspectRatio='xMidYMid'%20%3e%3cpath%20d='M128.001%200C57.317%200%200%2057.307%200%20128.001c0%2056.554%2036.676%20104.535%2087.535%20121.46%206.397%201.185%208.746-2.777%208.746-6.158%200-3.052-.12-13.135-.174-23.83-35.61%207.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78%2012.853.902%2019.621%2013.19%2019.621%2013.19%2011.417%2019.568%2029.945%2013.911%2037.249%2010.64%201.149-8.272%204.466-13.92%208.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258%200-13.975%205-25.394%2013.188-34.358-1.329-3.224-5.71-16.242%201.24-33.874%200%200%2010.749-3.44%2035.21%2013.121%2010.21-2.836%2021.16-4.258%2032.038-4.307%2010.878.049%2021.837%201.47%2032.066%204.307%2024.431-16.56%2035.165-13.12%2035.165-13.12%206.967%2017.63%202.584%2030.65%201.255%2033.873%208.207%208.964%2013.173%2020.383%2013.173%2034.358%200%2049.163-29.944%2059.988-58.447%2063.157%204.591%203.972%208.682%2011.762%208.682%2023.704%200%2017.126-.148%2030.91-.148%2035.126%200%203.407%202.304%207.398%208.792%206.14C219.37%20232.5%20256%20184.537%20256%20128.002%20256%2057.307%20198.691%200%20128.001%200Zm-80.06%20182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655%201.279-.838%202.205-.399.93.418%201.46%201.293%201.139%201.931Zm6.296%205.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566%201.787-.301%202.626.591.838.903%201%202.088.363%202.66Zm4.32%207.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547%202.058-.055%202.861%201.075.782%201.157.782%202.522-.019%203.08Zm7.304%208.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776%202.213-.558%203.315.49%201.11%201.03%201.45%202.505.701%203.27Zm9.442%202.81c-.31%201.003-1.75%201.459-3.199%201.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01%201.747-1.484%203.207-1.028%201.446.436%202.396%201.602%202.095%202.622Zm10.744%201.193c.036%201.055-1.193%201.93-2.715%201.95-1.53.034-2.769-.82-2.786-1.86%200-1.065%201.202-1.932%202.733-1.958%201.522-.03%202.768.818%202.768%201.868Zm10.555-.405c.182%201.03-.875%202.088-2.387%202.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114%202.376-2.387%201.514-.263%202.868.356%203.061%201.403Z'%20/%3e%3c/svg%3e";
    FORM_FIELD = Symbol("FORM_FIELD_CTX");
    FORM_CONTROL = Symbol("FORM_CONTROL_CTX");
    Field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let formErrors;
      let formConstraints;
      let formTainted;
      let formData;
      let $formTainted, $$unsubscribe_formTainted = noop, $$subscribe_formTainted = () => ($$unsubscribe_formTainted(), $$unsubscribe_formTainted = subscribe(formTainted, ($$value) => $formTainted = $$value), formTainted);
      let $formConstraints, $$unsubscribe_formConstraints = noop, $$subscribe_formConstraints = () => ($$unsubscribe_formConstraints(), $$unsubscribe_formConstraints = subscribe(formConstraints, ($$value) => $formConstraints = $$value), formConstraints);
      let $formErrors, $$unsubscribe_formErrors = noop, $$subscribe_formErrors = () => ($$unsubscribe_formErrors(), $$unsubscribe_formErrors = subscribe(formErrors, ($$value) => $formErrors = $$value), formErrors);
      let $formData, $$unsubscribe_formData = noop, $$subscribe_formData = () => ($$unsubscribe_formData(), $$unsubscribe_formData = subscribe(formData, ($$value) => $formData = $$value), formData);
      let $errors, $$unsubscribe_errors;
      let $tainted, $$unsubscribe_tainted;
      let { form } = $$props;
      let { name: name2 } = $$props;
      const field = {
        name: writable(name2),
        errors: writable([]),
        constraints: writable({}),
        tainted: writable(false),
        fieldErrorsId: writable(),
        descriptionId: writable(),
        form
      };
      const { tainted, errors } = field;
      $$unsubscribe_tainted = subscribe(tainted, (value) => $tainted = value);
      $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
      setFormField(field);
      if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      $$subscribe_formErrors({ errors: formErrors, constraints: formConstraints, tainted: formTainted, form: formData } = form, $$subscribe_formConstraints(), $$subscribe_formTainted(), $$subscribe_formData());
      {
        field.name.set(name2);
      }
      {
        field.errors.set(extractErrorArray(getValueAtPath(name2, $formErrors)));
      }
      {
        field.constraints.set(getValueAtPath(name2, $formConstraints) ?? {});
      }
      {
        field.tainted.set($formTainted ? getValueAtPath(name2, $formTainted) === true : false);
      }
      $$unsubscribe_formTainted();
      $$unsubscribe_formConstraints();
      $$unsubscribe_formErrors();
      $$unsubscribe_formData();
      $$unsubscribe_errors();
      $$unsubscribe_tainted();
      return ` ${slots.default ? slots.default({
        value: $formData[name2],
        errors: $errors,
        tainted: $tainted,
        constraints: $formConstraints[name2]
      }) : ``}`;
    });
    Control$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let errorAttr;
      let attrs;
      let labelAttrs;
      let $idStore, $$unsubscribe_idStore;
      let $constraints, $$unsubscribe_constraints;
      let $errors, $$unsubscribe_errors;
      let $descriptionId, $$unsubscribe_descriptionId;
      let $fieldErrorsId, $$unsubscribe_fieldErrorsId;
      let $name, $$unsubscribe_name;
      let { id = generateId() } = $$props;
      const { name: name2, fieldErrorsId, descriptionId, errors, constraints: constraints2 } = getFormField();
      $$unsubscribe_name = subscribe(name2, (value) => $name = value);
      $$unsubscribe_fieldErrorsId = subscribe(fieldErrorsId, (value) => $fieldErrorsId = value);
      $$unsubscribe_descriptionId = subscribe(descriptionId, (value) => $descriptionId = value);
      $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
      $$unsubscribe_constraints = subscribe(constraints2, (value) => $constraints = value);
      const controlContext = {
        id: writable(id),
        attrs: writable(),
        labelAttrs: writable()
      };
      const { id: idStore } = controlContext;
      $$unsubscribe_idStore = subscribe(idStore, (value) => $idStore = value);
      setFormControl(controlContext);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
      {
        controlContext.id.set(id);
      }
      errorAttr = getDataFsError($errors);
      attrs = {
        name: $name,
        id: $idStore,
        "data-fs-error": errorAttr,
        "aria-describedby": getAriaDescribedBy({
          fieldErrorsId: $fieldErrorsId,
          descriptionId: $descriptionId,
          errors: $errors
        }),
        "aria-invalid": getAriaInvalid($errors),
        "aria-required": getAriaRequired($constraints),
        "data-fs-control": ""
      };
      labelAttrs = {
        for: $idStore,
        "data-fs-label": "",
        "data-fs-error": errorAttr
      };
      {
        controlContext.attrs.set(attrs);
      }
      {
        controlContext.labelAttrs.set(labelAttrs);
      }
      $$unsubscribe_idStore();
      $$unsubscribe_constraints();
      $$unsubscribe_errors();
      $$unsubscribe_descriptionId();
      $$unsubscribe_fieldErrorsId();
      $$unsubscribe_name();
      return ` ${slots.default ? slots.default({ attrs }) : ``}`;
    });
    Field_errors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let errorAttr;
      let fieldErrorsAttrs;
      let errorAttrs;
      let $$restProps = compute_rest_props($$props, ["id", "asChild", "el"]);
      let $fieldErrorsId, $$unsubscribe_fieldErrorsId;
      let $errors, $$unsubscribe_errors;
      const { fieldErrorsId, errors } = getFormField();
      $$unsubscribe_fieldErrorsId = subscribe(fieldErrorsId, (value) => $fieldErrorsId = value);
      $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
      let { id = generateId() } = $$props;
      let { asChild = false } = $$props;
      let { el = void 0 } = $$props;
      if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
      if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
      if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
      errorAttr = getDataFsError($errors);
      {
        fieldErrorsId.set(id);
      }
      fieldErrorsAttrs = {
        id: $fieldErrorsId,
        "data-fs-error": errorAttr,
        "data-fs-field-errors": "",
        "aria-live": "assertive",
        ...$$restProps
      };
      errorAttrs = {
        "data-fs-field-error": "",
        "data-fs-error": errorAttr
      };
      $$unsubscribe_fieldErrorsId();
      $$unsubscribe_errors();
      return ` ${asChild ? `${slots.default ? slots.default({
        errors: $errors,
        fieldErrorsAttrs,
        errorAttrs
      }) : ``}` : `<div${spread([escape_object(fieldErrorsAttrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({
        errors: $errors,
        fieldErrorsAttrs,
        errorAttrs
      }) : ` ${each($errors, (error) => {
        return `<div${spread([escape_object(errorAttrs)], {})}>${escape(error)}</div>`;
      })} `}</div>`}`;
    });
    Form_field_errors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "errorClasses"]);
      let { class: className = void 0 } = $$props;
      let { errorClasses = void 0 } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      if ($$props.errorClasses === void 0 && $$bindings.errorClasses && errorClasses !== void 0) $$bindings.errorClasses(errorClasses);
      return `${validate_component(Field_errors, "FormPrimitive.FieldErrors").$$render(
        $$result,
        Object.assign(
          {},
          {
            class: cn("text-destructive text-sm font-medium", className)
          },
          $$restProps
        ),
        {},
        {
          default: ({ errors, fieldErrorsAttrs, errorAttrs }) => {
            return `${slots.default ? slots.default({ errors, fieldErrorsAttrs, errorAttrs }) : ` ${each(errors, (error) => {
              return `<div${spread(
                [
                  escape_object(errorAttrs),
                  {
                    class: escape_attribute_value(cn(errorClasses))
                  }
                ],
                {}
              )}>${escape(error)}</div>`;
            })} `}`;
          }
        }
      )}`;
    });
    Form_field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { form } = $$props;
      let { name: name2 } = $$props;
      let { class: className = void 0 } = $$props;
      if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
      if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      return `${validate_component(Field, "FormPrimitive.Field").$$render($$result, { form, name: name2 }, {}, {
        default: ({ constraints: constraints2, errors, tainted, value }) => {
          return `<div${add_attribute("class", cn("space-y-2", className), 0)}>${slots.default ? slots.default({ constraints: constraints2, errors, tainted, value }) : ``}</div>`;
        }
      })}`;
    });
    Form_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `${validate_component(Button, "Button.Root").$$render($$result, Object.assign({}, { type: "submit" }, $$restProps), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    });
    Control = Control$1;
    Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
      let { class: className = void 0 } = $$props;
      let { value = void 0 } = $$props;
      let { readonly: readonly2 = void 0 } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly2 !== void 0) $$bindings.readonly(readonly2);
      return `<input${spread(
        [
          {
            class: escape_attribute_value(cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
          },
          { readonly: readonly2 || null },
          escape_object($$restProps)
        ],
        {}
      )}${add_attribute("value", value, 0)}>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/(app)/(auth)/signin/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var import_memoize_weak3, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/(auth)/signin/_page.svelte.js"() {
    init_lifecycle();
    init_ssr();
    init_input();
    init_Icon();
    init_zod();
    init_stores();
    init_just_clone();
    init_esm();
    init_chunks();
    init_devalue();
    import_memoize_weak3 = __toESM(require_memoize_weak(), 1);
    init_Toaster_svelte_svelte_type_style_lang();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $formData, $$unsubscribe_formData;
      let { data } = $$props;
      let dataForm = data.form;
      let form = superForm(dataForm, {
        validators: zodClient(formSchema),
        onSubmit: () => {
          isFormLoading = true;
        },
        onUpdate: ({ result }) => {
          isFormLoading = false;
          if (result.status === 200) {
            toast.success("Check your email", {
              description: "We have sent you a login link. Be sure to check your spam too."
            });
          } else {
            toast.error("Something went wrong", {
              description: "Your sign in request failed. Please try again."
            });
          }
        }
      });
      const { form: formData, enhance: enhance2 } = form;
      $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
      let loading = false;
      let isFormLoading = false;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        $$rendered = `${$$result.head += `<!-- HEAD_svelte-1512w18_START -->${$$result.title = `<title>Sign In | Svee UI</title>`, ""}<meta name="description" content="Sign In for Svee UI"><!-- HEAD_svelte-1512w18_END -->`, ""} <div class="container flex h-screen w-screen flex-col items-center justify-center">${validate_component(Button, "Button").$$render(
          $$result,
          {
            variant: "ghost",
            href: "/",
            class: "absolute left-4 top-4 md:left-8 md:top-8"
          },
          {},
          {
            default: () => {
              return `${validate_component(Chevron_left, "ChevronLeftIcon").$$render($$result, { class: "mr-2 size-4" }, {}, {})}
		Back`;
            }
          }
        )} <div class="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]"><div class="flex flex-col gap-2 text-center" data-svelte-h="svelte-1u2y1ky"> <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1> <p class="text-sm text-muted-foreground">Login to your account</p></div>  <form method="POST">${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "email", class: "mb-4" }, {}, {
          default: () => {
            return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
              default: ({ attrs }) => {
                return `${validate_component(Input, "Input").$$render(
                  $$result,
                  Object.assign({}, { placeholder: "name@example.com" }, attrs, { value: $formData.email }),
                  {
                    value: ($$value) => {
                      $formData.email = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            })}  ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(Form_button, "Form.Button").$$render(
          $$result,
          {
            size: "sm",
            class: "w-full",
            disabled: isFormLoading
          },
          {},
          {
            default: () => {
              return `${isFormLoading ? `${validate_component(Loader2, "Loader").$$render($$result, { class: "mr-2 size-4 animate-spin" }, {}, {})}` : ``}
				Sign In with Email`;
            }
          }
        )}</form>  <div class="relative" data-svelte-h="svelte-17jfgrf"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-background px-2 text-muted-foreground">Or continue with</span></div></div> ${validate_component(Button, "Button").$$render($$result, { variant: "outline", disabled: loading }, {}, {
          default: () => {
            return `${`<img${add_attribute("src", GitHubSvg2, 0)} alt="github" class="mr-2 size-4">`}
			Github`;
          }
        })} <p class="px-8 text-center text-sm text-muted-foreground" data-svelte-h="svelte-o3nvsx"><a href="/signup" class="hover:text-brand underline underline-offset-4">Don&#39;t have an account? Sign Up</a></p></div></div>`;
      } while (!$$settled);
      $$unsubscribe_formData();
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, server_id, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_page_server_ts();
    index6 = 5;
    component6 = async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    server_id = "src/routes/(app)/(auth)/signin/+page.server.ts";
    imports6 = ["_app/immutable/nodes/5.CuRyue5C.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/spread.DCI-Q8-Y.js", "_app/immutable/chunks/zod.B_mMbn6x.js", "_app/immutable/chunks/Icon.C7FeuGwB.js", "_app/immutable/chunks/index.7X9LQzY4.js", "_app/immutable/chunks/stores.DrTtW2Km.js", "_app/immutable/chunks/entry.az7H4NcX.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.BrPaV8wb.js", "_app/immutable/chunks/loader.Cs7jjPqK.js"];
    stylesheets6 = ["_app/immutable/assets/Toaster.436keKGd.css"];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(app)/(auth)/signup/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  actions: () => actions2,
  load: () => load2
});
var import_memoize_weak4, load2, actions2;
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/(auth)/signup/_page.server.ts.js"() {
    init_zod();
    init_stores();
    init_just_clone();
    init_esm();
    init_chunks();
    init_devalue();
    init_superValidate();
    import_memoize_weak4 = __toESM(require_memoize_weak(), 1);
    load2 = async () => {
      return {
        form: await superValidate(zod(formSchema))
      };
    };
    actions2 = {
      default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
          return fail2(400, {
            form
          });
        }
        await new Promise((resolve2) => setTimeout(resolve2, 800));
        return {
          form
        };
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(app)/(auth)/signup/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var import_memoize_weak5, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(app)/(auth)/signup/_page.svelte.js"() {
    init_lifecycle();
    init_ssr();
    init_input();
    init_Icon();
    init_zod();
    init_stores();
    init_just_clone();
    init_esm();
    init_chunks();
    init_devalue();
    import_memoize_weak5 = __toESM(require_memoize_weak(), 1);
    init_Toaster_svelte_svelte_type_style_lang();
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $formData, $$unsubscribe_formData;
      let { data } = $$props;
      let dataForm = data.form;
      let form = superForm(dataForm, {
        validators: zodClient(formSchema),
        onSubmit: () => {
          isFormLoading = true;
        },
        onUpdate: ({ result }) => {
          isFormLoading = false;
          if (result.status === 200) {
            toast.success("Check your email", {
              description: "We have sent you a login link. Be sure to check your spam too."
            });
          } else {
            toast.error("Something went wrong", {
              description: "Your sign in request failed. Please try again."
            });
          }
        }
      });
      const { form: formData, enhance: enhance2 } = form;
      $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
      let loading = false;
      let isFormLoading = false;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        $$rendered = `${$$result.head += `<!-- HEAD_svelte-4774fo_START -->${$$result.title = `<title>Sign Up | Svee UI</title>`, ""}<meta name="description" content="Sign Up for Svee UI"><!-- HEAD_svelte-4774fo_END -->`, ""} <div class="container flex h-screen w-screen flex-col items-center justify-center">${validate_component(Button, "Button").$$render(
          $$result,
          {
            variant: "ghost",
            href: "/",
            class: "absolute left-4 top-4 md:left-8 md:top-8"
          },
          {},
          {
            default: () => {
              return `${validate_component(Chevron_left, "ChevronLeftIcon").$$render($$result, { class: "mr-2 size-4" }, {}, {})}
		Back`;
            }
          }
        )} <div class="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]"><div class="flex flex-col gap-2 text-center" data-svelte-h="svelte-1vleely"> <h1 class="text-2xl font-semibold tracking-tight">Welcome to Svee UI</h1> <p class="text-sm text-muted-foreground">Sign up for an account</p></div>  <form method="POST">${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "email", class: "mb-4" }, {}, {
          default: () => {
            return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
              default: ({ attrs }) => {
                return `${validate_component(Input, "Input").$$render(
                  $$result,
                  Object.assign({}, { placeholder: "name@example.com" }, attrs, { value: $formData.email }),
                  {
                    value: ($$value) => {
                      $formData.email = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            })}  ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(Form_button, "Form.Button").$$render(
          $$result,
          {
            size: "sm",
            class: "w-full",
            disabled: isFormLoading
          },
          {},
          {
            default: () => {
              return `${isFormLoading ? `${validate_component(Loader2, "Loader").$$render($$result, { class: "mr-2 size-4 animate-spin" }, {}, {})}` : ``}
				Sign Up with Email`;
            }
          }
        )}</form>  <div class="relative" data-svelte-h="svelte-17jfgrf"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-background px-2 text-muted-foreground">Or continue with</span></div></div> ${validate_component(Button, "Button").$$render($$result, { variant: "outline", disabled: loading }, {}, {
          default: () => {
            return `${`<img${add_attribute("src", GitHubSvg2, 0)} alt="github" class="mr-2 size-4">`}
			Github`;
          }
        })} <p class="px-8 text-center text-sm text-muted-foreground" data-svelte-h="svelte-12qipve"><a href="/signin" class="hover:text-brand underline underline-offset-4">Already have an account? Sign In</a></p></div></div>`;
      } while (!$$settled);
      $$unsubscribe_formData();
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  server: () => page_server_ts_exports2,
  server_id: () => server_id2,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, server_id2, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_server_ts2();
    index7 = 6;
    component7 = async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    server_id2 = "src/routes/(app)/(auth)/signup/+page.server.ts";
    imports7 = ["_app/immutable/nodes/6.lHelSqgf.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js", "_app/immutable/chunks/spread.DCI-Q8-Y.js", "_app/immutable/chunks/zod.B_mMbn6x.js", "_app/immutable/chunks/Icon.C7FeuGwB.js", "_app/immutable/chunks/index.7X9LQzY4.js", "_app/immutable/chunks/stores.DrTtW2Km.js", "_app/immutable/chunks/entry.az7H4NcX.js", "_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.BrPaV8wb.js", "_app/immutable/chunks/loader.Cs7jjPqK.js"];
    stylesheets7 = ["_app/immutable/assets/Toaster.436keKGd.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/index.js
init_chunks();

// .svelte-kit/output/server/chunks/internal.js
init_lifecycle();
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0) $$bindings.data_2(data_2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<link rel="stylesheet" href="https://rsms.me/inter/inter.css">\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "eec8"
};
async function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_exports();
init_devalue();
init_index2();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types2) {
  const parts = [];
  accept.split(",").forEach((str, i2) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q2 = "1"] = match;
      parts.push({ type, subtype, q: +q2, i: i2 });
    }
  });
  parts.sort((a3, b2) => {
    if (a3.q !== b2.q) {
      return b2.q - a3.q;
    }
    if (a3.subtype === "*" !== (b2.subtype === "*")) {
      return a3.subtype === "*" ? 1 : -1;
    }
    if (a3.type === "*" !== (b2.type === "*")) {
      return a3.type === "*" ? 1 : -1;
    }
    return a3.i - b2.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types2) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types2.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location2) {
  const response = new Response(void 0, {
    status,
    headers: { location: location2 }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions3 = server2?.actions;
  if (!actions3) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions3);
  try {
    const data = await call_action(event, actions3);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions3 = server2?.actions;
  if (!actions3) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions3);
  try {
    const data = await call_action(event, actions3);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions3) {
  if (actions3.default && Object.keys(actions3).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions3) {
  const url = new URL(event.request.url);
  let name2 = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name2 = param[0].slice(1);
      if (name2 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions3[name2];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name2}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "") message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i2 = value.length;
      while (i2) hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i2 = buffer.length;
      while (i2) hash2 = hash2 * 33 ^ buffer[--i2];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter2, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter2(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w = array2.subarray(i2, i2 + 16);
    let tmp;
    let a3;
    let b2;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a3 = w[i22 + 1 & 15];
        b2 = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a3 >>> 7 ^ a3 >>> 18 ^ a3 >>> 3 ^ a3 << 25 ^ a3 << 14) + (b2 >>> 17 ^ b2 >>> 19 ^ b2 >>> 10 ^ b2 << 15 ^ b2 << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a3 = bytes[i2 + 0];
    const b2 = bytes[i2 + 1];
    const c2 = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c2;
    bytes[i2 + 2] = b2;
    bytes[i2 + 3] = a3;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l2; i2 += 3) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars2[bytes[i2] & 63];
  }
  if (i2 === l2 + 1) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l2) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v2) => !!v2).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r2) => {
    fulfil = f;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets8 = new Set(client.stylesheets);
  const fonts8 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      data2 = { ...data2, ...branch[i2].data };
      props[`data_${i2}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets8.add(url);
      for (const url of node.fonts) fonts8.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v2]) => inline_styles.set(k, v2));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets8) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts8) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b2) => b2.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global2}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i2) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j2]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i2) => {
      if (!invalidated[i2]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i2) => p2.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i2 + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i2) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = await server_promises[j2];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i2) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                Object.assign(data, await load_promises[j2]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i2],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises) p2.catch(() => {
    });
    for (const p2 of load_promises) p2.catch(() => {
    });
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      if (node) {
        try {
          const server_data = await server_promises[i2];
          const data = await load_promises[i2];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i2--) {
            if (page2.errors[i2]) {
              const index8 = (
                /** @type {number} */
                page2.errors[i2]
              );
              const node2 = await manifest2._.nodes[index8]();
              let j2 = i2;
              while (!branch[j2]) j2 -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j2 + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i2 = 0; i2 < params.length; i2 += 1) {
    const param = params[i2];
    let value = values[i2 - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i2 - buffered, i2 + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i2 + 1];
      const next_value = values[i2 + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults3 = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name2, opts) {
      const c2 = new_cookies[name2];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name2, value]) => ({ name: name2, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name2, value, options2) {
      validate_options(options2);
      set_internal(name2, value, { ...defaults3, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name2, options2) {
      validate_options(options2);
      cookies.set(name2, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name2, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name2, value, { ...defaults3, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name2 in parsed) {
        combined_cookies[name2] = parsed[name2];
      }
    }
    return Object.entries(combined_cookies).map(([name2, value]) => `${name2}=${value}`).join("; ");
  }
  function set_internal(name2, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name2] = { name: name2, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint2) {
  if (!constraint2) return true;
  const normalized = constraint2[0] === "." ? constraint2.slice(1) : constraint2;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint2) {
  if (!constraint2) return true;
  const normalized = constraint2.endsWith("/") ? constraint2.slice(0, -1) : constraint2;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name: name2, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name2, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name2, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name: name2, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name2, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config) continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-fleek"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV) ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback) disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location2 = response.headers.get("location");
      if (location2) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location2
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v2) => v2.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/fleek-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png"]),
    mimeTypes: { ".png": "image/png" },
    _: {
      client: { "start": "_app/immutable/entry/start.BPrBnDMp.js", "app": "_app/immutable/entry/app.BYDDWUos.js", "imports": ["_app/immutable/entry/start.BPrBnDMp.js", "_app/immutable/chunks/entry.az7H4NcX.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.7X9LQzY4.js", "_app/immutable/entry/app.BYDDWUos.js", "_app/immutable/chunks/scheduler.D8fFf-op.js", "_app/immutable/chunks/index.C4Drof7a.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7)))
      ],
      routes: [
        {
          id: "/(app)",
          pattern: /^\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 4 },
          endpoint: null
        },
        {
          id: "/(app)/(auth)/signin",
          pattern: /^\/signin\/?$/,
          params: [],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 5 },
          endpoint: null
        },
        {
          id: "/(app)/(auth)/signup",
          pattern: /^\/signup\/?$/,
          params: [],
          page: { layouts: [0, 3], errors: [1, ,], leaf: 6 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Map([]);
var base_path = "";

// .svelte-kit/fleek-tmp/entry.js
var server = new Server(manifest);
async function adaptFleekRequestToFetch(fleekRequest) {
  let url;
  if (fleekRequest.headers?.["origin"]) {
    url = new URL(`${fleekRequest.headers["origin"]}${fleekRequest.path}`);
  } else {
    url = new URL(`http://0.0.0.0${fleekRequest.path}`);
  }
  for (const [key2, value] of Object.entries(fleekRequest.query ?? {})) {
    url.searchParams.append(key2, value);
  }
  return new Request(url, {
    method: fleekRequest.method,
    headers: fleekRequest.headers,
    body: !fleekRequest.body ? null : typeof fleekRequest.body === "object" ? JSON.stringify(fleekRequest.body) : fleekRequest.body
  });
}
async function adaptFetchResponseToFleekResponse(response) {
  const headers2 = {};
  response.headers.forEach((value, key2) => {
    headers2[key2] = value;
  });
  return {
    status: response.status,
    headers: headers2,
    body: await response.arrayBuffer()
  };
}
async function main(fleekRequest) {
  await server.init({ env: fleek.env });
  const request = await adaptFleekRequestToFetch(fleekRequest);
  const url = new URL(request.url);
  const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  if (prerendered.has(pathname)) {
    const response2 = await fetch(
      `https://${process.env.ASSETS_CID}.ipfs.flk-ipfs.xyz/${prerendered.get(pathname).file}`
    );
    return adaptFetchResponseToFleekResponse(response2);
  }
  if (pathname.startsWith(`${base_path}/_app/`) || pathname.startsWith(`${base_path}/assets/`)) {
    const response2 = await fetch(`https://${process.env.ASSETS_CID}.ipfs.flk-ipfs.xyz${pathname}`);
    return adaptFetchResponseToFleekResponse(response2);
  }
  const response = await server.respond(request, {
    platform: {
      env: {},
      context: {
        waitUntil(promise) {
          return promise;
        }
      },
      ASSETS: {
        fetch: async (path) => {
          return fetch(`https://${process.env.ASSETS_CID}.ipfs.flk-ipfs.xyz${path}`);
        }
      }
    },
    getClientAddress() {
      return request.headers.get("X-Forwarded-For");
    }
  });
  return adaptFetchResponseToFleekResponse(response);
}
export {
  main
};
/**
 * @license lucide-svelte v0.416.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
