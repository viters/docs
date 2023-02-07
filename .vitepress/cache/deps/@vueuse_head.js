import {
  defineComponent,
  getCurrentInstance,
  inject,
  isRef,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  unref,
  version,
  watch,
  watchEffect
} from "./chunk-GOZHMCMR.js";

// node_modules/.pnpm/hookable@5.4.2/node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, arguments_) {
  return hooks.reduce((promise, hookFunction) => promise.then(() => hookFunction.apply(void 0, arguments_)), Promise.resolve());
}
function parallelCaller(hooks, arguments_) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, arguments_)));
}
function callEachWith(callbacks, argument0) {
  for (const callback of callbacks) {
    callback(argument0);
  }
}
var Hookable = class {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index2 = this._hooks[name].indexOf(function_);
      if (index2 !== -1) {
        this._hooks[name].splice(index2, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    this._hooks[name] = void 0;
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...arguments_) {
    return this.callHookWith(serialCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    return this.callHookWith(parallelCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(this._hooks[name] || [], arguments_);
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      const index2 = this._before.indexOf(function_);
      if (index2 !== -1) {
        this._before.splice(index2, 1);
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      const index2 = this._after.indexOf(function_);
      if (index2 !== -1) {
        this._after.splice(index2, 1);
      }
    };
  }
};
function createHooks() {
  return new Hookable();
}

// node_modules/.pnpm/@unhead+vue@1.0.21_vue@3.2.47/node_modules/@unhead/vue/dist/index.mjs
var TagsWithInnerContent = ["script", "style", "noscript"];
var HasElementTags$1 = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var UniqueTags$1 = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function tagDedupeKey$1(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags$1.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
var setAttrs = (ctx, markSideEffect) => {
  const { tag, $el } = ctx;
  if (!$el)
    return;
  Object.entries(tag.props).forEach(([k, value]) => {
    value = String(value);
    const attrSdeKey = `attr:${k}`;
    if (k === "class") {
      if (!value)
        return;
      for (const c of value.split(" ")) {
        const classSdeKey = `${attrSdeKey}:${c}`;
        if (markSideEffect)
          markSideEffect(ctx, classSdeKey, () => $el.classList.remove(c));
        if (!$el.classList.contains(c))
          $el.classList.add(c);
      }
      return;
    }
    if (markSideEffect && !k.startsWith("data-h-"))
      markSideEffect(ctx, attrSdeKey, () => $el.removeAttribute(k));
    if ($el.getAttribute(k) !== value)
      $el.setAttribute(k, value);
  });
  if (TagsWithInnerContent.includes(tag.tag) && $el.innerHTML !== (tag.children || ""))
    $el.innerHTML = tag.children || "";
};
function hashCode(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function renderDOMHead(head, options = {}) {
  var _a, _b;
  const ctx = { shouldRender: true };
  await head.hooks.callHook("dom:beforeRender", ctx);
  if (!ctx.shouldRender)
    return;
  const dom = options.document || window.document;
  const staleSideEffects = head._popSideEffectQueue();
  head.headEntries().map((entry) => entry._sde).forEach((sde) => {
    Object.entries(sde).forEach(([key, fn]) => {
      staleSideEffects[key] = fn;
    });
  });
  const preRenderTag = async (tag) => {
    const entry = head.headEntries().find((e) => e._i === tag._e);
    const renderCtx = {
      renderId: tag._d || hashCode(JSON.stringify({ ...tag, _e: void 0, _p: void 0 })),
      $el: null,
      shouldRender: true,
      tag,
      entry,
      staleSideEffects
    };
    await head.hooks.callHook("dom:beforeRenderTag", renderCtx);
    return renderCtx;
  };
  const renders = [];
  const pendingRenders = {
    body: [],
    head: []
  };
  const markSideEffect = (ctx2, key, fn) => {
    key = `${ctx2.renderId}:${key}`;
    if (ctx2.entry)
      ctx2.entry._sde[key] = fn;
    delete staleSideEffects[key];
  };
  const markEl = (ctx2) => {
    head._elMap[ctx2.renderId] = ctx2.$el;
    renders.push(ctx2);
    markSideEffect(ctx2, "el", () => {
      var _a2;
      (_a2 = ctx2.$el) == null ? void 0 : _a2.remove();
      delete head._elMap[ctx2.renderId];
    });
  };
  for (const t of await head.resolveTags()) {
    const ctx2 = await preRenderTag(t);
    if (!ctx2.shouldRender)
      continue;
    const { tag } = ctx2;
    if (tag.tag === "title") {
      dom.title = tag.children || "";
      renders.push(ctx2);
      continue;
    }
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      ctx2.$el = dom[tag.tag === "htmlAttrs" ? "documentElement" : "body"];
      setAttrs(ctx2, markSideEffect);
      renders.push(ctx2);
      continue;
    }
    ctx2.$el = head._elMap[ctx2.renderId];
    if (!ctx2.$el && tag._hash) {
      ctx2.$el = dom.querySelector(`${((_a = tag.tagPosition) == null ? void 0 : _a.startsWith("body")) ? "body" : "head"} > ${tag.tag}[data-h-${tag._hash}]`);
    }
    if (ctx2.$el) {
      if (ctx2.tag._d)
        setAttrs(ctx2);
      markEl(ctx2);
      continue;
    }
    ctx2.$el = dom.createElement(tag.tag);
    setAttrs(ctx2);
    pendingRenders[((_b = tag.tagPosition) == null ? void 0 : _b.startsWith("body")) ? "body" : "head"].push(ctx2);
  }
  Object.entries(pendingRenders).forEach(([pos, queue]) => {
    var _a2;
    if (!queue.length)
      return;
    const children = (_a2 = dom == null ? void 0 : dom[pos]) == null ? void 0 : _a2.children;
    if (!children)
      return;
    for (const $el of [...children].reverse()) {
      const elTag = $el.tagName.toLowerCase();
      if (!HasElementTags$1.includes(elTag))
        continue;
      const dedupeKey = tagDedupeKey$1({
        tag: elTag,
        // convert attributes to object
        props: $el.getAttributeNames().reduce((props, name) => ({ ...props, [name]: $el.getAttribute(name) }), {})
      });
      const matchIdx = queue.findIndex((ctx2) => {
        var _a3;
        return ctx2 && (ctx2.tag._d === dedupeKey || ((_a3 = $el.isEqualNode) == null ? void 0 : _a3.call($el, ctx2.$el)));
      });
      if (matchIdx !== -1) {
        const ctx2 = queue[matchIdx];
        ctx2.$el = $el;
        setAttrs(ctx2);
        markEl(ctx2);
        delete queue[matchIdx];
      }
    }
    queue.forEach((ctx2) => {
      if (!ctx2.$el)
        return;
      switch (ctx2.tag.tagPosition) {
        case "bodyClose":
          dom.body.appendChild(ctx2.$el);
          break;
        case "bodyOpen":
          dom.body.insertBefore(ctx2.$el, dom.body.firstChild);
          break;
        case "head":
        default:
          dom.head.appendChild(ctx2.$el);
          break;
      }
      markEl(ctx2);
    });
  });
  for (const ctx2 of renders)
    await head.hooks.callHook("dom:renderTag", ctx2);
  Object.values(staleSideEffects).forEach((fn) => fn());
}
var domUpdatePromise = null;
async function debouncedRenderDOMHead(head, options = {}) {
  function doDomUpdate() {
    domUpdatePromise = null;
    return renderDOMHead(head, options);
  }
  const delayFn = options.delayFn || ((fn) => setTimeout(fn, 10));
  return domUpdatePromise = domUpdatePromise || new Promise((resolve) => delayFn(() => resolve(doDomUpdate())));
}
var index = {
  __proto__: null,
  debouncedRenderDOMHead,
  get domUpdatePromise() {
    return domUpdatePromise;
  },
  hashCode,
  renderDOMHead
};
var ValidHeadTags = [
  "title",
  "titleTemplate",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var TagConfigKeys = ["tagPosition", "tagPriority", "tagDuplicateStrategy"];
async function normaliseTag(tagName, input) {
  const tag = { tag: tagName, props: {} };
  if (tagName === "title" || tagName === "titleTemplate") {
    tag.children = input instanceof Promise ? await input : input;
    return tag;
  }
  tag.props = await normaliseProps({ ...input });
  ["children", "innerHtml", "innerHTML"].forEach((key) => {
    if (typeof tag.props[key] !== "undefined") {
      tag.children = tag.props[key];
      if (typeof tag.children === "object")
        tag.children = JSON.stringify(tag.children);
      delete tag.props[key];
    }
  });
  Object.keys(tag.props).filter((k) => TagConfigKeys.includes(k)).forEach((k) => {
    tag[k] = tag.props[k];
    delete tag.props[k];
  });
  if (typeof tag.props.class === "object" && !Array.isArray(tag.props.class)) {
    tag.props.class = Object.keys(tag.props.class).filter((k) => tag.props.class[k]);
  }
  if (Array.isArray(tag.props.class))
    tag.props.class = tag.props.class.join(" ");
  if (tag.props.content && Array.isArray(tag.props.content)) {
    return tag.props.content.map((v, i) => {
      const newTag = { ...tag, props: { ...tag.props } };
      newTag.props.content = v;
      newTag.key = `${tag.props.name || tag.props.property}:${i}`;
      return newTag;
    });
  }
  return tag;
}
async function normaliseProps(props) {
  for (const k of Object.keys(props)) {
    if (props[k] instanceof Promise) {
      props[k] = await props[k];
    }
    if (String(props[k]) === "true") {
      props[k] = "";
    } else if (String(props[k]) === "false") {
      delete props[k];
    }
  }
  return props;
}
var tagWeight = (tag) => {
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  switch (tag.tagPriority) {
    case "critical":
      return 2;
    case "high":
      return 9;
    case "low":
      return 12;
  }
  switch (tag.tag) {
    case "base":
      return -1;
    case "title":
      return 1;
    case "meta":
      if (tag.props.charset)
        return -2;
      if (tag.props["http-equiv"] === "content-security-policy")
        return 0;
      return 10;
    default:
      return 10;
  }
};
var sortTags = (aTag, bTag) => {
  return tagWeight(aTag) - tagWeight(bTag);
};
var UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function tagDedupeKey(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
var renderTitleTemplate = (template, title) => {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template.replace("%s", title ?? "");
};
function resolveTitleTemplateFromTags(tags) {
  let titleTemplateIdx = tags.findIndex((i) => i.tag === "titleTemplate");
  const titleIdx = tags.findIndex((i) => i.tag === "title");
  if (titleIdx !== -1 && titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      tags[titleTemplateIdx].children,
      tags[titleIdx].children
    );
    if (newTitle !== null) {
      tags[titleIdx].children = newTitle || tags[titleIdx].children;
    } else {
      delete tags[titleIdx];
    }
  } else if (titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      tags[titleTemplateIdx].children
    );
    if (newTitle !== null) {
      tags[titleTemplateIdx].children = newTitle;
      tags[titleTemplateIdx].tag = "title";
      titleTemplateIdx = -1;
    }
  }
  if (titleTemplateIdx !== -1) {
    delete tags[titleTemplateIdx];
  }
  return tags.filter(Boolean);
}
var DedupesTagsPlugin = (options) => {
  options = options || {};
  const dedupeKeys = options.dedupeKeys || ["hid", "vmid", "key"];
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": function({ tag }) {
        dedupeKeys.forEach((key) => {
          if (tag.props[key]) {
            tag.key = tag.props[key];
            delete tag.props[key];
          }
        });
        const dedupe = tag.key ? `${tag.tag}:${tag.key}` : tagDedupeKey(tag);
        if (dedupe)
          tag._d = dedupe;
      },
      "tags:resolve": function(ctx) {
        const deduping = {};
        ctx.tags.forEach((tag) => {
          let dedupeKey = tag._d || tag._p;
          const dupedTag = deduping[dedupeKey];
          if (dupedTag) {
            let strategy = tag == null ? void 0 : tag.tagDuplicateStrategy;
            if (!strategy && (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs"))
              strategy = "merge";
            if (strategy === "merge") {
              const oldProps = dupedTag.props;
              ["class", "style"].forEach((key) => {
                if (tag.props[key] && oldProps[key]) {
                  if (key === "style" && !oldProps[key].endsWith(";"))
                    oldProps[key] += ";";
                  tag.props[key] = `${oldProps[key]} ${tag.props[key]}`;
                }
              });
              deduping[dedupeKey].props = {
                ...oldProps,
                ...tag.props
              };
              return;
            } else if (tag._e === dupedTag._e) {
              dedupeKey = tag._d = `${dedupeKey}:${tag._p}`;
            }
            const propCount = Object.keys(tag.props).length;
            if ((propCount === 0 || propCount === 1 && typeof tag.props["data-h-key"] !== "undefined") && !tag.children) {
              delete deduping[dedupeKey];
              return;
            }
          }
          deduping[dedupeKey] = tag;
        });
        ctx.tags = Object.values(deduping);
      }
    }
  });
};
var SortTagsPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        const tagIndexForKey = (key) => {
          var _a;
          return (_a = ctx.tags.find((tag) => tag._d === key)) == null ? void 0 : _a._p;
        };
        for (const tag of ctx.tags) {
          if (!tag.tagPriority || typeof tag.tagPriority === "number")
            continue;
          const modifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];
          for (const { prefix, offset } of modifiers) {
            if (tag.tagPriority.startsWith(prefix)) {
              const key = tag.tagPriority.replace(prefix, "");
              const index2 = tagIndexForKey(key);
              if (typeof index2 !== "undefined")
                tag._p = index2 + offset;
            }
          }
        }
        ctx.tags.sort((a, b) => a._p - b._p).sort(sortTags);
      }
    }
  });
};
var TitleTemplatePlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        ctx.tags = resolveTitleTemplateFromTags(ctx.tags);
      }
    }
  });
};
var DeprecatedTagAttrPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": function({ tag }) {
        if (typeof tag.props.body !== "undefined") {
          tag.tagPosition = "bodyClose";
          delete tag.props.body;
        }
      }
    }
  });
};
var IsBrowser$1 = typeof window !== "undefined";
var ProvideTagHashPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": (ctx) => {
        var _a, _b;
        const { tag, entry } = ctx;
        const isDynamic = typeof tag.props._dynamic !== "undefined";
        if (!HasElementTags.includes(tag.tag) || !tag.key)
          return;
        tag._hash = hashCode(JSON.stringify({ tag: tag.tag, key: tag.key }));
        if (IsBrowser$1 || ((_b = (_a = getActiveHead()) == null ? void 0 : _a.resolvedOptions) == null ? void 0 : _b.document))
          return;
        if (entry._m === "server" || isDynamic) {
          tag.props[`data-h-${tag._hash}`] = "";
        }
      },
      "tags:resolve": (ctx) => {
        ctx.tags = ctx.tags.map((t) => {
          delete t.props._dynamic;
          return t;
        });
      }
    }
  });
};
var PatchDomOnEntryUpdatesPlugin = (options) => {
  return defineHeadPlugin({
    hooks: {
      "entries:updated": function(head) {
        if (typeof (options == null ? void 0 : options.document) === "undefined" && typeof window === "undefined")
          return;
        let delayFn = options == null ? void 0 : options.delayFn;
        if (!delayFn && typeof requestAnimationFrame !== "undefined")
          delayFn = requestAnimationFrame;
        Promise.resolve().then(function() {
          return index;
        }).then(({ debouncedRenderDOMHead: debouncedRenderDOMHead3 }) => {
          debouncedRenderDOMHead3(head, { document: (options == null ? void 0 : options.document) || window.document, delayFn });
        });
      }
    }
  });
};
var EventHandlersPlugin = () => {
  const stripEventHandlers = (mode, tag) => {
    const props = {};
    const eventHandlers = {};
    Object.entries(tag.props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function")
        eventHandlers[key] = value;
      else
        props[key] = value;
    });
    let delayedSrc;
    if (mode === "dom" && tag.tag === "script" && typeof props.src === "string" && typeof eventHandlers.onload !== "undefined") {
      delayedSrc = props.src;
      delete props.src;
    }
    return { props, eventHandlers, delayedSrc };
  };
  return defineHeadPlugin({
    hooks: {
      "ssr:render": function(ctx) {
        ctx.tags = ctx.tags.map((tag) => {
          tag.props = stripEventHandlers("ssr", tag).props;
          return tag;
        });
      },
      "dom:beforeRenderTag": function(ctx) {
        const { props, eventHandlers, delayedSrc } = stripEventHandlers("dom", ctx.tag);
        if (!Object.keys(eventHandlers).length)
          return;
        ctx.tag.props = props;
        ctx.tag._eventHandlers = eventHandlers;
        ctx.tag._delayedSrc = delayedSrc;
      },
      "dom:renderTag": function(ctx) {
        const $el = ctx.$el;
        if (!ctx.tag._eventHandlers || !$el)
          return;
        const $eventListenerTarget = ctx.tag.tag === "bodyAttrs" && typeof window !== "undefined" ? window : $el;
        Object.entries(ctx.tag._eventHandlers).forEach(([k, value]) => {
          const sdeKey = `${ctx.tag._d || ctx.tag._p}:${k}`;
          const eventName = k.slice(2).toLowerCase();
          const eventDedupeKey = `data-h-${eventName}`;
          delete ctx.staleSideEffects[sdeKey];
          if ($el.hasAttribute(eventDedupeKey))
            return;
          const handler = value;
          $el.setAttribute(eventDedupeKey, "");
          $eventListenerTarget.addEventListener(eventName, handler);
          if (ctx.entry) {
            ctx.entry._sde[sdeKey] = () => {
              $eventListenerTarget.removeEventListener(eventName, handler);
              $el.removeAttribute(eventDedupeKey);
            };
          }
        });
        if (ctx.tag._delayedSrc) {
          $el.setAttribute("src", ctx.tag._delayedSrc);
        }
      }
    }
  });
};
function asArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
var HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var activeHead;
var setActiveHead = (head) => activeHead = head;
var getActiveHead = () => activeHead;
var TagEntityBits = 10;
async function normaliseEntryTags(e) {
  const tagPromises = [];
  Object.entries(e.resolvedInput || e.input).filter(([k, v]) => typeof v !== "undefined" && ValidHeadTags.includes(k)).forEach(([k, value]) => {
    const v = asArray$1(value);
    tagPromises.push(...v.map((props) => normaliseTag(k, props)).flat());
  });
  return (await Promise.all(tagPromises)).flat().map((t, i) => {
    t._e = e._i;
    t._p = (e._i << TagEntityBits) + i;
    return t;
  });
}
var CorePlugins = () => [
  // dedupe needs to come first
  DedupesTagsPlugin(),
  SortTagsPlugin(),
  TitleTemplatePlugin(),
  ProvideTagHashPlugin(),
  EventHandlersPlugin(),
  DeprecatedTagAttrPlugin()
];
var DOMPlugins = (options = {}) => [
  PatchDomOnEntryUpdatesPlugin({ document: options == null ? void 0 : options.document, delayFn: options == null ? void 0 : options.domDelayFn })
];
function createHead$1(options = {}) {
  const head = createHeadCore({
    ...options,
    plugins: [...DOMPlugins(options), ...(options == null ? void 0 : options.plugins) || []]
  });
  setActiveHead(head);
  return head;
}
function createHeadCore(options = {}) {
  let entries = [];
  let _sde = {};
  let _eid = 0;
  const hooks = createHooks();
  if (options == null ? void 0 : options.hooks)
    hooks.addHooks(options.hooks);
  options.plugins = [
    ...CorePlugins(),
    ...(options == null ? void 0 : options.plugins) || []
  ];
  options.plugins.forEach((p) => p.hooks && hooks.addHooks(p.hooks));
  const updated = () => hooks.callHook("entries:updated", head);
  const head = {
    resolvedOptions: options,
    headEntries() {
      return entries;
    },
    get hooks() {
      return hooks;
    },
    use(plugin) {
      if (plugin.hooks)
        hooks.addHooks(plugin.hooks);
    },
    push(input, options2) {
      const activeEntry = {
        _i: _eid++,
        input,
        _sde: {}
      };
      if (options2 == null ? void 0 : options2.mode)
        activeEntry._m = options2 == null ? void 0 : options2.mode;
      entries.push(activeEntry);
      updated();
      return {
        dispose() {
          entries = entries.filter((e) => {
            if (e._i !== activeEntry._i)
              return true;
            _sde = { ..._sde, ...e._sde || {} };
            e._sde = {};
            updated();
            return false;
          });
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          entries = entries.map((e) => {
            if (e._i === activeEntry._i) {
              activeEntry.input = e.input = input2;
              updated();
            }
            return e;
          });
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry of resolveCtx.entries) {
        for (const tag of await normaliseEntryTags(entry)) {
          const tagCtx = { tag, entry };
          await hooks.callHook("tag:normalise", tagCtx);
          resolveCtx.tags.push(tagCtx.tag);
        }
      }
      await hooks.callHook("tags:resolve", resolveCtx);
      return resolveCtx.tags;
    },
    _elMap: {},
    _popSideEffectQueue() {
      const sde = { ..._sde };
      _sde = {};
      return sde;
    }
  };
  head.hooks.callHook("init", head);
  return head;
}
function defineHeadPlugin(plugin) {
  return plugin;
}
var composableNames = [
  "useHead",
  "useTagTitle",
  "useTagBase",
  "useTagMeta",
  "useTagMetaFlat",
  // alias
  "useSeoMeta",
  "useTagLink",
  "useTagScript",
  "useTagStyle",
  "useTagNoscript",
  "useHtmlAttrs",
  "useBodyAttrs",
  "useTitleTemplate",
  // server only composables
  "useServerHead",
  "useServerTagTitle",
  "useServerTagBase",
  "useServerTagMeta",
  "useServerTagMetaFlat",
  "useServerTagLink",
  "useServerTagScript",
  "useServerTagStyle",
  "useServerTagNoscript",
  "useServerHtmlAttrs",
  "useServerBodyAttrs",
  "useServerTitleTemplate"
];
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    let dynamic = false;
    const unrefdObj = Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        if (typeof v === "function" || isRef(v))
          dynamic = true;
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
    if (dynamic && HasElementTags.includes(String(lastKey)))
      unrefdObj._dynamic = true;
    return unrefdObj;
  }
  return root;
}
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
var Vue3 = version.startsWith("3");
var IsBrowser = typeof window !== "undefined";
var headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    // arbitrary delay the dom update for batch updates
    domDelayFn: (fn) => setTimeout(() => nextTick(() => fn()), 10),
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  const vuePlugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.provide(headSymbol, head);
      }
    }
  };
  head.install = vuePlugin.install;
  return head;
}
var VueHeadMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance)
      return;
    const options = instance.type;
    if (!options || !("head" in options))
      return;
    const source = typeof options.head === "function" ? () => options.head.call(instance.proxy) : options.head;
    useHead(source);
  }
};
var VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry of ctx.entries)
          entry.resolvedInput = resolveUnrefHeadInput(entry.input);
      }
    }
  });
};
var Vue2ProvideUnheadPlugin = function(_Vue, head) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      const origProvide = options.provide;
      options.provide = function() {
        let origProvideResult;
        if (typeof origProvide === "function")
          origProvideResult = origProvide.call(this);
        else
          origProvideResult = origProvide || {};
        return {
          ...origProvideResult,
          [headSymbol]: head
        };
      };
    }
  });
};
function unpackToArray(input, options) {
  const unpacked = [];
  const kFn = options.resolveKeyData || ((ctx) => ctx.key);
  const vFn = options.resolveValueData || ((ctx) => ctx.value);
  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k, value: i };
      const val = vFn(ctx);
      if (typeof val === "object")
        return unpackToArray(val, options);
      if (Array.isArray(val))
        return val;
      return {
        [typeof options.key === "function" ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === "function" ? options.value(ctx) : options.value]: val
      };
    }).flat());
  }
  return unpacked;
}
function unpackToString(value, options) {
  return Object.entries(value).map(([key, value2]) => {
    if (typeof value2 === "object")
      value2 = unpackToString(value2, options);
    if (options.resolve) {
      const resolved = options.resolve({ key, value: value2 });
      if (resolved)
        return resolved;
    }
    if (typeof value2 === "number")
      value2 = value2.toString();
    if (typeof value2 === "string" && options.wrapValue) {
      value2 = value2.replace(new RegExp(options.wrapValue, "g"), `\\${options.wrapValue}`);
      value2 = `${options.wrapValue}${value2}${options.wrapValue}`;
    }
    return `${key}${options.keyValueSeparator || ""}${value2}`;
  }).join(options.entrySeparator || "");
}
var MetaPackingSchema = {
  robots: {
    unpack: {
      keyValueSeparator: ":"
    }
  },
  // Pragma directives
  contentSecurityPolicy: {
    unpack: {
      keyValueSeparator: " ",
      entrySeparator: "; "
    },
    metaKey: "http-equiv"
  },
  fbAppId: {
    keyValue: "fb:app_id",
    metaKey: "property"
  },
  msapplicationTileImage: {
    keyValue: "msapplication-TileImage"
  },
  /**
   * Tile colour for windows
   */
  msapplicationTileColor: {
    keyValue: "msapplication-TileColor"
  },
  /**
   * URL of a config for windows tile.
   */
  msapplicationConfig: {
    keyValue: "msapplication-Config"
  },
  charset: {
    metaKey: "charset"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  },
  refresh: {
    metaKey: "http-equiv"
  }
};
function resolveMetaKeyType(key) {
  var _a;
  return PropertyPrefixKeys.test(key) ? "property" : ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.metaKey) || "name";
}
var ArrayableInputs = ["Image", "Video", "Audio"];
function unpackMeta(input) {
  const extras = [];
  ArrayableInputs.forEach((key) => {
    const ogKey = `og:${key.toLowerCase()}`;
    const inputKey = `og${key}`;
    const val = input[inputKey];
    if (typeof val === "object") {
      (Array.isArray(val) ? val : [val]).forEach((entry) => {
        if (!entry)
          return;
        const unpackedEntry = unpackToArray(entry, {
          key: "property",
          value: "content",
          resolveKeyData({ key: key2 }) {
            return fixKeyCase(`${ogKey}${key2 !== "url" ? `:${key2}` : ""}`);
          },
          resolveValueData({ value }) {
            return typeof value === "number" ? value.toString() : value;
          }
        });
        extras.push(
          ...unpackedEntry.sort((a, b) => a.property === ogKey ? -1 : b.property === ogKey ? 1 : 0)
        );
      });
      delete input[inputKey];
    }
  });
  const meta = unpackToArray(input, {
    key({ key }) {
      return resolveMetaKeyType(key);
    },
    value({ key }) {
      return key === "charset" ? "charset" : "content";
    },
    resolveKeyData({ key }) {
      var _a;
      return ((_a = MetaPackingSchema[key]) == null ? void 0 : _a.keyValue) || fixKeyCase(key);
    },
    resolveValueData({ value, key }) {
      if (value === null)
        return "_null";
      if (typeof value === "object") {
        const definition = MetaPackingSchema[key];
        if (key === "refresh")
          return `${value.seconds};url=${value.url}`;
        return unpackToString(
          changeKeyCasingDeep(value),
          {
            entrySeparator: ", ",
            keyValueSeparator: "=",
            resolve({ value: value2, key: key2 }) {
              if (value2 === null)
                return "";
              if (typeof value2 === "boolean")
                return `${key2}`;
            },
            ...definition == null ? void 0 : definition.unpack
          }
        );
      }
      return typeof value === "number" ? value.toString() : value;
    }
  });
  return [...extras, ...meta].filter((v) => typeof v.content === "undefined" || v.content !== "_null");
}
var PropertyPrefixKeys = /^(og|fb)/;
var ColonPrefixKeys = /^(og|twitter|fb)/;
function fixKeyCase(key) {
  key = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  if (ColonPrefixKeys.test(key)) {
    key = key.replace("secure-url", "secure_url").replace(/-/g, ":");
  }
  return key;
}
function changeKeyCasingDeep(input) {
  if (Array.isArray(input)) {
    return input.map((entry) => changeKeyCasingDeep(entry));
  }
  if (typeof input !== "object" || Array.isArray(input))
    return input;
  const output = {};
  for (const [key, value] of Object.entries(input))
    output[fixKeyCase(key)] = changeKeyCasingDeep(value);
  return output;
}
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch([resolvedInput, deactivated], ([e, disable]) => {
    if (!disable)
      entry.patch(e);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useServerHead(input, options = {}) {
  return useHead(input, { ...options, mode: "server" });
}
var useServerTagTitle = (title) => useServerHead({ title });
var useServerTitleTemplate = (titleTemplate) => useServerHead({ titleTemplate });
var useServerTagMeta = (meta) => useServerHead({ meta: asArray(meta) });
var useServerTagMetaFlat = (meta) => {
  const input = ref({});
  watchEffect(() => {
    input.value = unpackMeta(resolveUnrefHeadInput(meta));
  });
  return useServerHead({ meta: input });
};
var useServerTagLink = (link) => useServerHead({ link: asArray(link) });
var useServerTagScript = (script) => useServerHead({ script: asArray(script) });
var useServerTagStyle = (style) => useServerHead({ style: asArray(style) });
var useServerTagNoscript = (noscript) => useServerHead({ noscript: asArray(noscript) });
var useServerTagBase = (base) => useServerHead({ base });
var useServerHtmlAttrs = (attrs) => useServerHead({ htmlAttrs: attrs });
var useServerBodyAttrs = (attrs) => useHead({ bodyAttrs: attrs });
var useSeoMeta = (input) => {
  const headInput = ref({});
  watchEffect(() => {
    const resolvedMeta = resolveUnrefHeadInput(input);
    const { title, titleTemplate, ...meta } = resolvedMeta;
    headInput.value = {
      title,
      titleTemplate,
      meta: unpackMeta(meta)
    };
  });
  return useHead(headInput);
};
function useHead(input, options = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser = IsBrowser || !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
var useTagTitle = (title) => useHead({ title });
var useTitleTemplate = (titleTemplate) => useHead({ titleTemplate });
var useTagMeta = (meta) => useHead({ meta: asArray(meta) });
var useTagMetaFlat = (meta) => {
  const input = ref({});
  watchEffect(() => {
    input.value = unpackMeta(resolveUnrefHeadInput(meta));
  });
  return useHead({ meta: input });
};
var useTagLink = (link) => useHead({ link: asArray(link) });
var useTagScript = (script) => useHead({ script: asArray(script) });
var useTagStyle = (style) => useHead({ style: asArray(style) });
var useTagNoscript = (noscript) => useHead({ noscript: asArray(noscript) });
var useTagBase = (base) => useHead({ base });
var useHtmlAttrs = (attrs) => useHead({ htmlAttrs: attrs });
var useBodyAttrs = (attrs) => useHead({ bodyAttrs: attrs });
var coreComposableNames = [
  "injectHead"
];
var unheadVueComposablesImports = {
  "@unhead/vue": [...coreComposableNames, ...composableNames]
};

// node_modules/.pnpm/@unhead+dom@1.0.21/node_modules/@unhead/dom/dist/index.mjs
var TagsWithInnerContent2 = ["script", "style", "noscript"];
var HasElementTags2 = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
var UniqueTags2 = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"];
function tagDedupeKey2(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags2.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
var setAttrs2 = (ctx, markSideEffect) => {
  const { tag, $el } = ctx;
  if (!$el)
    return;
  Object.entries(tag.props).forEach(([k, value]) => {
    value = String(value);
    const attrSdeKey = `attr:${k}`;
    if (k === "class") {
      if (!value)
        return;
      for (const c of value.split(" ")) {
        const classSdeKey = `${attrSdeKey}:${c}`;
        if (markSideEffect)
          markSideEffect(ctx, classSdeKey, () => $el.classList.remove(c));
        if (!$el.classList.contains(c))
          $el.classList.add(c);
      }
      return;
    }
    if (markSideEffect && !k.startsWith("data-h-"))
      markSideEffect(ctx, attrSdeKey, () => $el.removeAttribute(k));
    if ($el.getAttribute(k) !== value)
      $el.setAttribute(k, value);
  });
  if (TagsWithInnerContent2.includes(tag.tag) && $el.innerHTML !== (tag.children || ""))
    $el.innerHTML = tag.children || "";
};
function hashCode2(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function renderDOMHead2(head, options = {}) {
  var _a, _b;
  const ctx = { shouldRender: true };
  await head.hooks.callHook("dom:beforeRender", ctx);
  if (!ctx.shouldRender)
    return;
  const dom = options.document || window.document;
  const staleSideEffects = head._popSideEffectQueue();
  head.headEntries().map((entry) => entry._sde).forEach((sde) => {
    Object.entries(sde).forEach(([key, fn]) => {
      staleSideEffects[key] = fn;
    });
  });
  const preRenderTag = async (tag) => {
    const entry = head.headEntries().find((e) => e._i === tag._e);
    const renderCtx = {
      renderId: tag._d || hashCode2(JSON.stringify({ ...tag, _e: void 0, _p: void 0 })),
      $el: null,
      shouldRender: true,
      tag,
      entry,
      staleSideEffects
    };
    await head.hooks.callHook("dom:beforeRenderTag", renderCtx);
    return renderCtx;
  };
  const renders = [];
  const pendingRenders = {
    body: [],
    head: []
  };
  const markSideEffect = (ctx2, key, fn) => {
    key = `${ctx2.renderId}:${key}`;
    if (ctx2.entry)
      ctx2.entry._sde[key] = fn;
    delete staleSideEffects[key];
  };
  const markEl = (ctx2) => {
    head._elMap[ctx2.renderId] = ctx2.$el;
    renders.push(ctx2);
    markSideEffect(ctx2, "el", () => {
      var _a2;
      (_a2 = ctx2.$el) == null ? void 0 : _a2.remove();
      delete head._elMap[ctx2.renderId];
    });
  };
  for (const t of await head.resolveTags()) {
    const ctx2 = await preRenderTag(t);
    if (!ctx2.shouldRender)
      continue;
    const { tag } = ctx2;
    if (tag.tag === "title") {
      dom.title = tag.children || "";
      renders.push(ctx2);
      continue;
    }
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      ctx2.$el = dom[tag.tag === "htmlAttrs" ? "documentElement" : "body"];
      setAttrs2(ctx2, markSideEffect);
      renders.push(ctx2);
      continue;
    }
    ctx2.$el = head._elMap[ctx2.renderId];
    if (!ctx2.$el && tag._hash) {
      ctx2.$el = dom.querySelector(`${((_a = tag.tagPosition) == null ? void 0 : _a.startsWith("body")) ? "body" : "head"} > ${tag.tag}[data-h-${tag._hash}]`);
    }
    if (ctx2.$el) {
      if (ctx2.tag._d)
        setAttrs2(ctx2);
      markEl(ctx2);
      continue;
    }
    ctx2.$el = dom.createElement(tag.tag);
    setAttrs2(ctx2);
    pendingRenders[((_b = tag.tagPosition) == null ? void 0 : _b.startsWith("body")) ? "body" : "head"].push(ctx2);
  }
  Object.entries(pendingRenders).forEach(([pos, queue]) => {
    var _a2;
    if (!queue.length)
      return;
    const children = (_a2 = dom == null ? void 0 : dom[pos]) == null ? void 0 : _a2.children;
    if (!children)
      return;
    for (const $el of [...children].reverse()) {
      const elTag = $el.tagName.toLowerCase();
      if (!HasElementTags2.includes(elTag))
        continue;
      const dedupeKey = tagDedupeKey2({
        tag: elTag,
        // convert attributes to object
        props: $el.getAttributeNames().reduce((props, name) => ({ ...props, [name]: $el.getAttribute(name) }), {})
      });
      const matchIdx = queue.findIndex((ctx2) => {
        var _a3;
        return ctx2 && (ctx2.tag._d === dedupeKey || ((_a3 = $el.isEqualNode) == null ? void 0 : _a3.call($el, ctx2.$el)));
      });
      if (matchIdx !== -1) {
        const ctx2 = queue[matchIdx];
        ctx2.$el = $el;
        setAttrs2(ctx2);
        markEl(ctx2);
        delete queue[matchIdx];
      }
    }
    queue.forEach((ctx2) => {
      if (!ctx2.$el)
        return;
      switch (ctx2.tag.tagPosition) {
        case "bodyClose":
          dom.body.appendChild(ctx2.$el);
          break;
        case "bodyOpen":
          dom.body.insertBefore(ctx2.$el, dom.body.firstChild);
          break;
        case "head":
        default:
          dom.head.appendChild(ctx2.$el);
          break;
      }
      markEl(ctx2);
    });
  });
  for (const ctx2 of renders)
    await head.hooks.callHook("dom:renderTag", ctx2);
  Object.values(staleSideEffects).forEach((fn) => fn());
}
var domUpdatePromise2 = null;
async function debouncedRenderDOMHead2(head, options = {}) {
  function doDomUpdate() {
    domUpdatePromise2 = null;
    return renderDOMHead2(head, options);
  }
  const delayFn = options.delayFn || ((fn) => setTimeout(fn, 10));
  return domUpdatePromise2 = domUpdatePromise2 || new Promise((resolve) => delayFn(() => resolve(doDomUpdate())));
}

// node_modules/.pnpm/@unhead+ssr@1.0.21/node_modules/@unhead/ssr/dist/index.mjs
var SelfClosingTags = ["meta", "link", "base"];
var propsToString = (props) => {
  const handledAttributes = [];
  for (const [key, value] of Object.entries(props)) {
    if (value === false || value == null)
      continue;
    let attribute = key;
    if (value !== true)
      attribute += `="${String(value).replace(/"/g, "&quot;")}"`;
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? ` ${handledAttributes.join(" ")}` : "";
};
var tagToString = (tag) => {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  return SelfClosingTags.includes(tag.tag) ? openTag : `${openTag}${tag.children || ""}</${tag.tag}>`;
};
function ssrRenderTags(tags) {
  const schema = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: [], bodyClose: [], bodyOpen: [] } };
  for (const tag of tags) {
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      schema[tag.tag] = { ...schema[tag.tag], ...tag.props };
      continue;
    }
    schema.tags[tag.tagPosition || "head"].push(tagToString(tag));
  }
  return {
    headTags: schema.tags.head.join("\n"),
    bodyTags: schema.tags.bodyClose.join("\n"),
    bodyTagsOpen: schema.tags.bodyOpen.join("\n"),
    htmlAttrs: propsToString(schema.htmlAttrs),
    bodyAttrs: propsToString(schema.bodyAttrs)
  };
}
async function renderSSRHead(head) {
  const beforeRenderCtx = { shouldRender: true };
  await head.hooks.callHook("ssr:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender) {
    return {
      headTags: "",
      bodyTags: "",
      bodyTagsOpen: "",
      htmlAttrs: "",
      bodyAttrs: ""
    };
  }
  const ctx = { tags: await head.resolveTags() };
  await head.hooks.callHook("ssr:render", ctx);
  const html = ssrRenderTags(ctx.tags);
  const renderCtx = { tags: ctx.tags, html };
  await head.hooks.callHook("ssr:rendered", renderCtx);
  return renderCtx.html;
}

// node_modules/.pnpm/@vueuse+head@1.0.25_vue@3.2.47/node_modules/@vueuse/head/dist/index.mjs
function createHead2(initHeadObject) {
  const unhead = createHead();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document, force) {
      if (force)
        renderDOMHead2(unhead, { document });
      else
        debouncedRenderDOMHead2(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
var HeadVuePlugin = Vue2ProvideUnheadPlugin;
var renderHeadToString = (head) => renderSSRHead(head.unhead);
var Vue2 = version.startsWith("2.");
var IsBrowser2 = typeof window !== "undefined";
var addVNodeToHeadObj = (node, obj) => {
  const nodeType = Vue2 ? node.tag : node.type;
  const type = nodeType === "html" ? "htmlAttrs" : nodeType === "body" ? "bodyAttrs" : nodeType;
  if (typeof type !== "string" || !(type in obj))
    return;
  const nodeData = Vue2 ? node.data : node;
  const props = (Vue2 ? nodeData.attrs : node.props) || {};
  if (Vue2) {
    if (nodeData.staticClass)
      props.class = nodeData.staticClass;
    if (nodeData.staticStyle)
      props.style = Object.entries(nodeData.staticStyle).map(([key, value]) => `${key}:${value}`).join(";");
  }
  if (node.children) {
    const childrenAttr = Vue2 ? "text" : "children";
    props.children = Array.isArray(node.children) ? node.children[0][childrenAttr] : node[childrenAttr];
  }
  if (Array.isArray(obj[type]))
    obj[type].push(props);
  else if (type === "title")
    obj.title = props.children;
  else
    obj[type] = props;
};
var vnodesToHeadObj = (nodes) => {
  const obj = {
    title: void 0,
    htmlAttrs: void 0,
    bodyAttrs: void 0,
    base: void 0,
    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: []
  };
  for (const node of nodes) {
    if (typeof node.type === "symbol" && Array.isArray(node.children)) {
      for (const childNode of node.children)
        addVNodeToHeadObj(childNode, obj);
    } else {
      addVNodeToHeadObj(node, obj);
    }
  }
  return obj;
};
var Head = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Head",
  setup(_, { slots }) {
    const head = injectHead();
    const obj = ref({});
    const entry = head.push(obj);
    if (IsBrowser2) {
      onBeforeUnmount(() => {
        entry.dispose();
      });
    }
    return () => {
      watchEffect(() => {
        if (!slots.default)
          return;
        entry.patch(vnodesToHeadObj(slots.default()));
      });
      return null;
    };
  }
});
export {
  Head,
  HeadVuePlugin,
  Vue2ProvideUnheadPlugin,
  VueHeadMixin,
  createHead2 as createHead,
  createHeadCore,
  injectHead,
  renderHeadToString,
  unheadVueComposablesImports,
  useBodyAttrs,
  useHead,
  useHtmlAttrs,
  useSeoMeta,
  useServerBodyAttrs,
  useServerHead,
  useServerHtmlAttrs,
  useServerTagBase,
  useServerTagLink,
  useServerTagMeta,
  useServerTagMetaFlat,
  useServerTagNoscript,
  useServerTagScript,
  useServerTagStyle,
  useServerTagTitle,
  useServerTitleTemplate,
  useTagBase,
  useTagLink,
  useTagMeta,
  useTagMetaFlat,
  useTagNoscript,
  useTagScript,
  useTagStyle,
  useTagTitle,
  useTitleTemplate
};
//# sourceMappingURL=@vueuse_head.js.map
