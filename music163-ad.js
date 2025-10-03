/*
网易云音乐网页版去广告脚本（QuanX 专用）
作用：移除 banner 广告、VIP 推广、活动弹窗等
作者：AI Assistant
更新时间：2025-10
*/

let body = $response.body;

if (!body || typeof body !== "string") {
  $done({});
}

// 移除顶部 banner 广告
body = body.replace(/<div class="m-banner"[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除右侧/底部广告位（如“云贝兑好礼”等）
body = body.replace(/<div class="[^"]*u-adv[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除“开通 VIP”推广卡片
body = body.replace(/<div class="m-vip-tips"[^>]*>[\s\S]*?<\/div>/gi, '');
body = body.replace(/<div class="[^"]*vip-privilege[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除“新人礼包”“活动弹窗”等（常见于首页）
body = body.replace(/<div class="[^"]*pop-activity[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
body = body.replace(/<div class="g-popup"[^>]*>[\s\S]*?<\/div>/gi, '');

// 移除“广告”文字标签（如歌单中的“广告”角标）
body = body.replace(/<span class="[^"]*ic-ads[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '');

// 可选：移除“赞助”“品牌专区”等推荐
body = body.replace(/<div class="[^"]*brand-zone[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

$done({ body });