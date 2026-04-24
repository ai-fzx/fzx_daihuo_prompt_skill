# fzx-daihuo-prompt-skill

<!-- 徽章 -->
[![GitHub stars](https://img.shields.io/github/stars/ai-fzx/fzx_daihuo_prompt_skill?style=social)](https://github.com/ai-fzx/fzx_daihuo_prompt_skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: WorkBuddy](https://img.shields.io/badge/Platform-WorkBuddy-blue.svg)](https://www.codebuddy.cn)
[![Product: GPT-Image 2](https://img.shields.io/badge/Product-GPT--Image%202-red.svg)](https://openai.com)
[![Product: Seedance 2.0](https://img.shields.io/badge/Product-Seedance%202.0-orange.svg)](https://www.seeds.land)

> 通过 AI 视觉分析商品图片，自动生成一张 **3×3 九宫格大图提示词**（GPT-Image 2）和 **3 条带货视频提示词**（Seedance 2.0）。一次上传，完整输出 · 九宫格合一 · 开箱即用

---

## 📋 目录

- [新手必读](#1-新手必读)
- [能力概览](#2-能力概览)
- [九宫格布局说明](#3-九宫格布局说明)
- [快速开始](#4-快速开始)
- [使用说明](#5-使用说明)
- [提示词格式详解](#6-提示词格式详解)
- [常见错误](#7-常见错误)
- [联系与作者](#8-联系与作者)
- [License](#9-license)

---

## 1. 新手必读

**本技能做什么**：上传一张商品图片（支持多图），AI 自动分析商品视觉特征，输出：
1. **1 条 GPT-Image 2 九宫格提示词** — 一次生成一张 3×3 九宫格大图，9 格合一
2. **3 条 Seedance 2.0 视频提示词** — 商品展示 / 模特上身 / 生活场景

**使用前提**：在 WorkBuddy 中上传图片即可，无需额外配置。

**核心概念**：

| 旧方案（错误） | 本技能（正确） |
|---------------|--------------|
| 生成 9 条分散提示词 | **1 条完整提示词**生成一张 3×3 九宫格大图 |
| 需要分别生图 9 次 | **一次性生成**九宫格大图 |
| 需要截图拼图 | 生成后**直接用**，或截图裁成 9 张发布小红书 |

---

## 2. 能力概览

| 功能 | 描述 |
|------|------|
| 🖼️ **GPT-Image 2 九宫格提示词** | 1 条提示词，一次生成一张 3×3 九宫格大图，覆盖白底主图/模特正背面/细节特写/场景上身/品牌氛围 9 个格子 |
| 🎬 **Seedance 2.0 视频提示词** | 3 条提示词，覆盖商品静态展示 / 模特动态上身 / 生活场景带货视频 |
| 🔍 **商品视觉分析** | 自动识别商品类目、主色调、印花、版型、面料质感、核心细节、风格定位、目标人群 |
| 📦 **多图支持** | 同一商品多角度图自动合并分析，提示词更精准 |

---

## 3. 九宫格布局说明

```
┌─────────────────┬─────────────────┬─────────────────┐
│  [1] 白底主图     │  [2] 模特正面      │  [3] 模特背面      │
│    商品平铺/挂拍   │    街头日常场景    │    展示版型剪裁    │
├─────────────────┼─────────────────┼─────────────────┤
│  [4] 细节特写A   │  [5] 平铺搭配      │  [6] 细节特写B   │
│    第一核心卖点    │    氛围道具搭配    │    第二核心卖点    │
├─────────────────┼─────────────────┼─────────────────┤
│  [7] 场景上身    │  [8] 场景上身      │  [9] 品牌氛围      │
│    户外自然场景    │    城市运动场景    │    高级感封面图    │
└─────────────────┴─────────────────┴─────────────────┘
```

| 格子 | 类型 | 说明 |
|------|------|------|
| ① | 白底主图 | 商品平铺或挂拍，纯色背景，标准电商主图 |
| ② | 模特正面 | 街头/日常场景，模特正面展示上身效果 |
| ③ | 模特背面 | 展示版型、剪裁、裤子口袋等背面细节 |
| ④ | 细节特写A | 第一核心卖点特写（口袋/拉链/印花等） |
| ⑤ | 平铺搭配 | 商品搭配道具/其他单品的氛围图 |
| ⑥ | 细节特写B | 第二核心卖点特写（领口/面料/抽绳等） |
| ⑦ | 场景上身 | 户外自然场景（海边/公园/山野）上身图 |
| ⑧ | 场景上身 | 城市运动场景（街头/地铁/运动场）上身图 |
| ⑨ | 品牌氛围 | 高级感封面，品牌调性，大片质感 |

---

## 4. 快速开始

### 方式一：在 WorkBuddy 中使用（推荐）

1. 打开 WorkBuddy，进入项目
2. 上传商品图片（支持 JPG/PNG/WebP）
3. 输入以下任一触发词：
   - `九宫格提示词`
   - `带货九宫格`
   - `GPT-Image2九宫格`
   - `单张九宫格`
   - `产品图转九宫格`
4. AI 自动触发技能，输出提示词

### 方式二：脚本方式

```bash
# 基础用法
node scripts/generate.js ./product.jpg

# 指定输出文件
node scripts/generate.js --output ./output.md ./product.jpg

# 多图模式（同一商品多角度）
node scripts/generate.js ./front.jpg ./back.jpg ./detail.jpg
```

---

## 5. 使用说明

### GPT-Image 2 九宫格提示词

**参数建议**：
- 分辨率：`2048 × 2048`（方形）
- Quality：`high`
- Style：`natural`

**使用流程**：
1. 复制 AI 输出的九宫格提示词
2. 粘贴到 GPT-Image 2（或支持 GPT-Image 2 的平台）
3. 一次生成一张 3×3 九宫格大图
4. 如需发布小红书九宫格：截图 → 裁成 9 张 → 按布局顺序发布

### Seedance 2.0 视频提示词

**参数建议**：
- 分辨率：1080P
- 时长：5-8 秒
- 风格：Realistic

**使用流程**：
1. 复制视频提示词的四段式内容
2. 粘贴到 Seedance 2.0（或支持 Seedance 的平台）
3. 分别生成 3 条视频

### 平台对照表

| 平台 | 内容类型 | 提示词来源 |
|------|---------|----------|
| 小红书 | 九宫格封面（9张图） | 九宫格提示词 → 截图裁成9张 |
| 抖音 | 单张大封面 | 九宫格提示词 → 1:1 裁剪 |
| 抖音 / 快手 | 带货短视频 | Seedance 视频提示词 × 3 |
| 天猫 / 京东 | 主图视频 | 视频1（商品展示） |
| 微博 | 带货图文 | 九宫格提示词 → 1:1 裁剪 |

---

## 6. 提示词格式详解

### GPT-Image 2 九宫格提示词结构（4段式）

```
[全局设定]
A single square image divided into a 3×3 grid (nine equal cells with thin 
white dividers), each cell showcasing the same [商品品类]...

[第1行 — 产品基础展示]
Top-left cell (Cell 1): [商品英文描述], flat lay on pure white background...
Top-middle cell (Cell 2): [商品英文描述] on [性别] model, [年龄] years old...
Top-right cell (Cell 3): Same [性别] model from the back, showing silhouette...

[第2行 — 细节与搭配]
Middle-left cell (Cell 4): Extreme close-up macro shot of [第一核心细节]...
Middle cell (Cell 5): [商品英文描述] styled with [搭配单品]...
Middle-right cell (Cell 6): Close-up of [第二核心细节]...

[第3行 — 场景与氛围]
Bottom-left cell (Cell 7): [性别] model wearing [商品英文描述] in [户外场景]...
Bottom-middle cell (Cell 8): Same model in [城市运动场景], dynamic walking...
Bottom-right cell (Cell 9): Premium brand atmosphere shot...

[整体风格]
Color palette: [主色调], cohesive across all nine cells.
Style: editorial e-commerce hybrid.
Mood: [目标人群情感诉求].
```

### Seedance 视频提示词结构（四段式）

```
[Scene] 场景人物物品描述（英文）

[Motion] 镜头运动+人物动作描述（英文）
- 必须包含具体镜头语言：dolly in / pull back / tracking shot / 
  slow motion / orbit / crane up 等
- 必须描述面料动态：fabric flutter / cloth rippling 等

[Style] 画面风格+色彩+帧率描述（英文）

[Mood] 情绪/氛围关键词（英文）
```

---

## 7. 常见错误

| 错误 | 原因 | 正确做法 |
|------|------|---------|
| 生成的图九格不统一 | 提示词没有强调商品特征一致 | 每格都重复完整商品特征（颜色+材质+款式+细节） |
| 模特九格中看起来像不同人 | 模特描述前后不一致 | 第 2/3/7/8 格的模特描述保持完全一致 |
| 九格色调差异大 | 没有强调统一色温 | 提示词结尾必须加 `Color palette: [主色调], cohesive across all nine cells` |
| 视频没有运镜效果 | [Motion] 段缺少镜头语言 | 必须写 dolly/tracking/orbit/slow motion 等具体运镜 |
| 面料质感没体现 | 没有面料动态描述 | [Motion] 段必须写 `fabric flutter / cloth rippling` 等 |

---

## 8. 联系与作者

- **作者**：风之馨（风之馨品牌创始人）
- **GitHub**：[@ai-fzx](https://github.com/ai-fzx)
- **微信公众号**：风之馨技术录
- **问题反馈**：[GitHub Issues](https://github.com/ai-fzx/fzx_daihuo_prompt_skill/issues)
- **技能反馈**：[WorkBuddy 专家中心](https://www.codebuddy.cn)

---

## 9. License

MIT © 风之馨

---

> 本技能由 **风之馨技术录** 出品，永久免费开源。
