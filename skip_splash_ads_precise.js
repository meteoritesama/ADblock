/*
 * Quantumult X 精准开屏广告跳过脚本 v2.0
 * 支持：知乎、京东、闲鱼、什么值得买、美团、饿了么、携程、大众点评、网易云音乐、有道词典
 *       + 哔哩哔哩（B站）、小红书、抖音（TikTok 中国版）
 * 原理：针对每个 App 的开屏接口返回结构化“无广告”响应
 * 更新时间：2025年10月
 */

const url = $request.url;
const host = $request.headers?.Host?.toLowerCase() || new URL(url).hostname.toLowerCase();

// 通用无广告响应模板
function noAdResponse(custom = {}) {
  return Object.assign({
    code: 0,
    msg: "success",
    data: null,
    show_ad: false,
    skip: true,
    duration: 0,
    ad: null,
    splash: null
  }, custom);
}

// ========== 原有 10 款 App（略作精简，完整逻辑保留）==========
if (host.includes("zhihu.com") && (url.includes("/splash") || url.includes("/launch"))) {
  console.log("🎯 知乎开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(noAdResponse({ has_ad: false })) } });
}
else if (host.includes("jd.com") && url.includes("functionId=") && /ad|start|splash/.test(url)) {
  console.log("🎯 京东开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: "0", result: { showAd: false, splashTime: 0 } }) } });
}
else if ((host.includes("taobao.com") || host.includes("alicdn.com")) && /xianyu\.splash|splash/.test(url)) {
  console.log("🎯 闲鱼开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ret: ["SUCCESS::接口调用成功"], data: { hasAd: false, splashTime: 0 } }) } });
}
else if (host.includes("smzdm.com") && /loading|splash/.test(url)) {
  console.log("🎯 什么值得买开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(noAdResponse({ show: false })) } });
}
else if (host.includes("meituan.com") && /splash|startup|launch/.test(url)) {
  console.log("🎯 美团开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 200, data: { showAd: false, duration: 0 } }) } });
}
else if (host.includes("ele.me") && /splash|eus\/|ad/.test(url)) {
  console.log("🎯 饿了么开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(noAdResponse({ showAd: false })) } });
}
else if (host.includes("ctrip.com") && /startpage|advertisement|splash/.test(url)) {
  console.log("🎯 携程开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 200, result: { hasAd: false, splashTime: 0 } }) } });
}
else if (host.includes("dianping.com") && /splash|ad/.test(url)) {
  console.log("🎯 大众点评开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(noAdResponse({ adExist: false })) } });
}
else if (host.includes("music.163.com") && /splash|ad/.test(url)) {
  console.log("🎯 网易云音乐开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: 200, data: { showAd: false } }) } });
}
else if (host.includes("youdao.com") && /splash|ad/.test(url)) {
  console.log("🎯 有道词典开屏广告已跳过");
  $done({ response: { status: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(noAdResponse({ hasSplashAd: false })) } });
}
// ========== 新增 App ==========
// 哔哩哔哩（B站）
else if (host.includes("bilibili.com") && (url.includes("/x/splash") || url.includes("ad") || url.includes("startup"))) {
  console.log("🎯 B站开屏广告已跳过");
  $done({
    response: {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: 0,
        message: "0",
        ttl: 1,
        data: {
          has_ad: 0,
          show_ad: false,
          skip_time: 0,
          ad_info: null,
          splash_data: null
        }
      })
    }
  });
}
// 小红书
else if (host.includes("xiaohongshu.com") && (url.includes("splash") || url.includes("ad") || url.includes("startup"))) {
  console.log("🎯 小红书开屏广告已跳过");
  $done({
    response: {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        code: 0,
        data: {
          showSplash: false,
          splashInfo: null,
          duration: 0,
          canSkip: true
        }
      })
    }
  });
}
// 抖音（TikTok 中国版）
else if ((host.includes("amemv.com") || host.includes("douyin.com") || host.includes("snssdk.com")) && 
         (url.includes("splash") || url.includes("ad") || url.includes("startup") || url.includes("get_ad"))) {
  console.log("🎯 抖音开屏广告已跳过");
  $done({
    response: {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status_code: 0,
        message: "success",
        data: {
          has_ad: false,
          show_ad: false,
          splash_duration: 0,
          ad_data: null,
          skip_time: 0
        }
      })
    }
  });
}
// 未匹配，放行
else {
  $done({});
}