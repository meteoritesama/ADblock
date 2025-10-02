/*
 * Quantumult X 开屏广告跳过脚本 v3.0
 * 脚本名称：SkipSplash（请确保名称完全一致）
 * 支持：知乎、京东、闲鱼、什么值得买、美团、饿了么、携程、大众点评、网易云音乐、有道词典、B站、小红书、抖音
 */

const url = $request.url;
const host = $request.headers?.Host?.toLowerCase() || new URL(url).hostname.toLowerCase();

// 通用返回结构
function noAd(data = {}) {
  return JSON.stringify(Object.assign({
    code: 0,
    msg: "success",
    show_ad: false,
    skip: true,
    duration: 0
  }, data));
}

// 知乎
if (/zhihu\.com/.test(host) && /splash|launch/.test(url)) {
  console.log("🎯 知乎开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: noAd({ has_ad: false }) } });
}

// 京东
else if (/jd\.com/.test(host) && /functionId=.*(ad|start|splash)/.test(url)) {
  console.log("🎯 京东开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: "0", result: { showAd: false, splashTime: 0 } }) } });
}

// 闲鱼（阿里系）
else if (/(taobao|alicdn)\.com/.test(host) && /xianyu\.splash|splash/.test(url)) {
  console.log("🎯 闲鱼开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ret: ["SUCCESS::接口调用成功"], data: { hasAd: false, splashTime: 0 } }) } });
}

// 什么值得买
else if (/smzdm\.com/.test(host) && /loading|splash/.test(url)) {
  console.log("🎯 什么值得买开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: noAd({ show: false }) } });
}

// 美团
else if (/meituan\.com/.test(host) && /splash|startup|launch/.test(url)) {
  console.log("🎯 美团开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 200, data: { showAd: false, duration: 0 } }) } });
}

// 饿了么
else if (/ele\.me/.test(host) && /splash|eus\/|ad/.test(url)) {
  console.log("🎯 饿了么开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: noAd({ showAd: false }) } });
}

// 携程旅行
else if (/ctrip\.com/.test(host) && /startpage|advertisement|splash/.test(url)) {
  console.log("🎯 携程开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 200, result: { hasAd: false, splashTime: 0 } }) } });
}

// 大众点评
else if (/dianping\.com/.test(host) && /splash|ad/.test(url)) {
  console.log("🎯 大众点评开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: noAd({ adExist: false }) } });
}

// 网易云音乐
else if (/music\.163\.com/.test(host) && /splash|ad/.test(url)) {
  console.log("🎯 网易云音乐开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 200, data: { showAd: false } }) } });
}

// 有道词典
else if (/youdao\.com/.test(host) && /splash|ad/.test(url)) {
  console.log("🎯 有道词典开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: noAd({ hasSplashAd: false }) } });
}

// 哔哩哔哩（B站）
else if (/bilibili\.com/.test(host) && /splash|ad|startup/.test(url)) {
  console.log("🎯 B站开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 0, data: { has_ad: 0, show_ad: false, skip_time: 0 } }) } });
}

// 小红书
else if (/xiaohongshu\.com/.test(host) && /splash|ad|startup/.test(url)) {
  console.log("🎯 小红书开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ success: true, code: 0, data: { showSplash: false, duration: 0, canSkip: true } }) } });
}

// 抖音（含字节系）
else if (/(amemv|douyin|snssdk)\.com/.test(host) && /splash|ad|startup|get_ad/.test(url)) {
  console.log("🎯 抖音开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status_code: 0, data: { has_ad: false, splash_duration: 0, skip_time: 0 } }) } });
}

// 未匹配，放行
else {
  $done({});
}