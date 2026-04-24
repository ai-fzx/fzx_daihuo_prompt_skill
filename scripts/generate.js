#!/usr/bin/env node
/**
 * fzx-daihuo-prompt-skill — 带货九宫格提示词生成脚本
 * 
 * 使用方式:
 *   node scripts/generate.js <image_path> [image_path2] ...
 *   node scripts/generate.js --output ./output.md <image_path>
 * 
 * 说明: 此脚本读取商品图片，调用 AI 分析并生成完整的
 *       GPT-Image 2 九宫格提示词 + Seedance 2.0 视频提示词
 */

const fs = require('fs');
const path = require('path');

// ── CLI 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);
const outputFlagIdx = args.indexOf('--output');
let outputFile = null;
let imagePaths = [];

if (outputFlagIdx !== -1) {
  outputFile = args[outputFlagIdx + 1];
  imagePaths = args.filter((_, i) => i !== outputFlagIdx && i !== outputFlagIdx + 1);
} else {
  imagePaths = args;
}

if (imagePaths.length === 0) {
  console.error('用法: node scripts/generate.js [--output <file>] <image1> [image2] ...');
  console.error('示例: node scripts/generate.js ./product.jpg');
  process.exit(1);
}

// ── 验证图片文件 ──────────────────────────────────────────────
const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
for (const imgPath of imagePaths) {
  const absPath = path.resolve(imgPath);
  if (!fs.existsSync(absPath)) {
    console.error(`❌ 图片文件不存在: ${absPath}`);
    process.exit(1);
  }
  const ext = path.extname(absPath).toLowerCase();
  if (!validExts.includes(ext)) {
    console.error(`❌ 不支持的图片格式: ${ext}，支持: ${validExts.join(', ')}`);
    process.exit(1);
  }
}

// ── 提示词模板 ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `你是一位专业的电商带货内容策划师，擅长分析商品图片并生成高质量的 AI 生图/生视频提示词。

你的任务是：
1. 深度分析商品图片的视觉特征
2. 生成 GPT-Image 2 九宫格生图提示词（共9张，英文）
3. 生成 Seedance 2.0 带货视频提示词（共3条，英文四段式）

严格按照以下 JSON 格式输出，不要有任何额外文字：
{
  "analysis": {
    "category": "商品类目（中文）",
    "mainColor": "主色调描述",
    "pattern": "印花/图案描述",
    "silhouette": "版型/形态描述",
    "fabric": "面料质感描述",
    "keyDetails": "核心细节描述（至少3点）",
    "style": "风格定位",
    "targetAudience": "目标人群"
  },
  "gptImage2Prompts": [
    {
      "index": 1,
      "type": "白底商品主图",
      "prompt": "英文提示词（80-150词）"
    },
    {
      "index": 2,
      "type": "模特正面上身（街头）",
      "prompt": "英文提示词"
    },
    {
      "index": 3,
      "type": "模特背面展示（版型）",
      "prompt": "英文提示词"
    },
    {
      "index": 4,
      "type": "核心细节特写A",
      "prompt": "英文提示词"
    },
    {
      "index": 5,
      "type": "核心细节特写B",
      "prompt": "英文提示词"
    },
    {
      "index": 6,
      "type": "自然场景上身图",
      "prompt": "英文提示词"
    },
    {
      "index": 7,
      "type": "城市/运动场景图",
      "prompt": "英文提示词"
    },
    {
      "index": 8,
      "type": "平铺搭配氛围图",
      "prompt": "英文提示词"
    },
    {
      "index": 9,
      "type": "品牌高级感氛围图",
      "prompt": "英文提示词"
    }
  ],
  "seedancePrompts": [
    {
      "index": 1,
      "type": "商品静态展示视频",
      "scene": "英文场景描述",
      "motion": "英文镜头运动描述（含 dolly/tracking/slow motion 等）",
      "style": "英文风格描述",
      "mood": "英文情绪关键词"
    },
    {
      "index": 2,
      "type": "模特上身动态视频",
      "scene": "英文场景描述",
      "motion": "英文镜头运动描述",
      "style": "英文风格描述",
      "mood": "英文情绪关键词"
    },
    {
      "index": 3,
      "type": "生活场景带货视频",
      "scene": "英文场景描述",
      "motion": "英文镜头运动描述",
      "style": "英文风格描述",
      "mood": "英文情绪关键词"
    }
  ]
}`;

// ── Markdown 输出格式化 ────────────────────────────────────────
function formatMarkdown(data, imagePaths) {
  const { analysis, gptImage2Prompts, seedancePrompts } = data;
  const timestamp = new Date().toLocaleString('zh-CN');
  const imageNames = imagePaths.map(p => path.basename(p)).join(', ');

  let md = `# 带货提示词生成报告\n\n`;
  md += `> 生成时间：${timestamp}\n`;
  md += `> 来源图片：${imageNames}\n\n`;
  md += `---\n\n`;

  // 商品分析
  md += `## 一、商品分析结果\n\n`;
  md += `| 维度 | 分析结果 |\n`;
  md += `|------|----------|\n`;
  md += `| 商品类目 | ${analysis.category} |\n`;
  md += `| 主色调 | ${analysis.mainColor} |\n`;
  md += `| 印花/图案 | ${analysis.pattern} |\n`;
  md += `| 版型/形态 | ${analysis.silhouette} |\n`;
  md += `| 面料质感 | ${analysis.fabric} |\n`;
  md += `| 核心细节 | ${analysis.keyDetails} |\n`;
  md += `| 风格定位 | ${analysis.style} |\n`;
  md += `| 目标人群 | ${analysis.targetAudience} |\n\n`;

  // GPT-Image 2 提示词
  md += `---\n\n## 二、GPT-Image 2 九宫格提示词\n\n`;
  md += `> 参数建议：尺寸 1024×1024（1:1），quality: high，style: natural\n\n`;

  for (const item of gptImage2Prompts) {
    md += `### 📸 图${item.index} — ${item.type}\n\n`;
    md += `\`\`\`\n${item.prompt}\n\`\`\`\n\n`;
  }

  // Seedance 提示词
  md += `---\n\n## 三、Seedance 2.0 视频提示词\n\n`;
  md += `> 参数建议：分辨率 1080P，时长 5-8秒，风格 Realistic\n\n`;

  for (const item of seedancePrompts) {
    md += `### 🎬 视频${item.index} — ${item.type}\n\n`;
    md += `\`\`\`\n`;
    md += `[Scene] ${item.scene}\n\n`;
    md += `[Motion] ${item.motion}\n\n`;
    md += `[Style] ${item.style}\n\n`;
    md += `[Mood] ${item.mood}\n`;
    md += `\`\`\`\n\n`;
  }

  // 使用建议
  md += `---\n\n## 四、平台使用建议\n\n`;
  md += `| 用途 | 推荐内容 | 平台 |\n`;
  md += `|------|----------|------|\n`;
  md += `| 淘宝/京东主图 | 图1（白底）+ 图4/5（细节） | PC 端 |\n`;
  md += `| 小红书九宫格 | 图2+3+6+7+8+9 | 移动端 |\n`;
  md += `| 抖音封面图 | 图9（品牌感） | 竖版 1:1 |\n`;
  md += `| 抖音/快手视频 | 视频2 + 视频3 | 竖版 9:16 裁剪 |\n`;
  md += `| 天猫主图视频 | 视频1（商品展示） | 1:1 方形 |\n\n`;
  md += `---\n\n*由 fzx-daihuo-prompt-skill 生成 | 风之馨技术录*\n`;

  return md;
}

// ── 主流程说明 ────────────────────────────────────────────────
// 此脚本设计为由 AI Agent（WorkBuddy）直接调用：
// Agent 读取图片后，使用内置视觉能力分析图片，
// 按照 SKILL.md 中的四段式工作流生成提示词，
// 最后调用此脚本的 formatMarkdown 函数格式化输出。
//
// 如需独立运行（无 Agent），可集成 OpenAI Vision API：
// 取消下方注释并配置 OPENAI_API_KEY 环境变量。

console.log('✅ fzx-daihuo-prompt-skill 脚本已加载');
console.log('📦 图片路径:', imagePaths.map(p => path.resolve(p)).join(', '));

if (outputFile) {
  console.log('📄 输出文件:', path.resolve(outputFile));
}

console.log('\n📋 此技能由 AI Agent 驱动分析，请按 SKILL.md 工作流执行。');
console.log('   Agent 将：');
console.log('   1. 视觉分析图片（Phase 1）');
console.log('   2. 生成 9 张 GPT-Image 2 提示词（Phase 2）');
console.log('   3. 生成 3 条 Seedance 2.0 视频提示词（Phase 3）');
console.log('   4. 格式化输出 Markdown 文档（Phase 4）');

// 导出格式化函数供 Agent 使用
module.exports = { formatMarkdown, SYSTEM_PROMPT };
