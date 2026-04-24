---
name: fzx-daihuo-prompt-skill
description: Use when a user provides one or more product images and wants to generate a GPT-Image 2 nine-grid (九宫格单张大图) and Seedance 2.0 video prompts for e-commerce/带货 content. Triggers on: 九宫格图片, 九宫格提示词, 带货九宫格, GPT-Image2九宫格, 单张九宫格, 3x3 grid, Seedance视频脚本, 产品图转九宫格.
---

# fzx-daihuo-prompt-skill — 带货九宫格提示词生成技能

## Overview

分析用户提供的商品图片，自动识别商品类目、视觉特征、材质、风格，生成：
1. **GPT-Image 2 九宫格图片提示词**（1条，一次性生成3×3九宫格大图）
2. **Seedance 2.0 视频提示词**（3条，覆盖商品展示/模特上身/生活场景三类视频）

## When to Use

- 用户上传商品图片，要求生成**一张九宫格大图**（3×3布局）的提示词
- 用户提到"九宫格图片"、"一张九宫格"、"3x3图"、"九宫格提示词"关键词
- 用户需要将商品图转化为可用于 AI 生图/生视频的结构化提示词
- 用户想做小红书/抖音的 AI 带货封面

## 工作流程

### Phase 1：图片分析（必须完成）

仔细分析图片，提取以下维度：

| 维度 | 分析要点 |
|------|---------|
| **商品类目** | 上衣/裤子/鞋/包/配饰/家居/数码等 |
| **主色调** | 主色+辅色+点缀色（精确描述） |
| **印花/图案** | 纯色/条纹/格子/印花类型（水墨/碎花/几何等） |
| **版型/形态** | 宽松/修身/A型/H型等版型描述 |
| **面料质感** | 光泽感/哑光/绒面/冰丝/牛仔/针织等 |
| **核心细节** | 领口/袖型/拉链/扣子/口袋/logo/绣花等 |
| **风格定位** | 街头/运动/商务/度假/复古/极简等 |
| **目标人群** | 性别+年龄段（如：20-30岁女性/青年男性） |
| **商品数量** | 单件/套装/多件组合 |

### Phase 2：生成 GPT-Image 2 九宫格提示词

**核心概念**：用一条英文提示词，一次性生成一张3×3布局的九宫格大图。每个格子（cell）展示商品的不同角度/场景/细节，9格合一，形成完整的带货视觉矩阵。

**九宫格布局定义**（固定顺序）：

```
┌─────────────────┬─────────────────┬─────────────────┐
│  [1] 白底主图     │  [2] 模特正面     │  [3] 模特背面     │
│    商品平铺/挂拍   │    街头日常场景   │    展示版型剪裁   │
├─────────────────┼─────────────────┼─────────────────┤
│  [4] 细节特写A   │  [5] 平铺搭配     │  [6] 细节特写B   │
│    第一核心卖点    │    氛围道具搭配   │    第二核心卖点    │
├─────────────────┼─────────────────┼─────────────────┤
│  [7] 场景上身    │  [8] 场景上身     │  [9] 品牌氛围     │
│    户外自然场景    │    城市运动场景    │    高级感封面图   │
└─────────────────┴─────────────────┴─────────────────┘
```

**提示词结构**（4段式）：

```
[全局设定]
A single square image divided into a 3×3 grid (nine equal cells with thin white 
dividers), each cell showcasing the same [商品品类] from a different angle and 
scene. High-quality e-commerce product photography style, unified warm/dynamic 
lighting across all cells, consistent color grading, sharp focus throughout.

[第1行 — 产品基础展示]
Top-left cell (Cell 1): [商品英文描述], flat lay on pure white background, centered 
and sharp. Top-middle cell (Cell 2): [商品英文描述] on [性别] model, [年龄] years 
old, [人种], standing full-body in a [城市/街头] setting, [时间段] sunlight, 
confident frontal pose. Top-right cell (Cell 3): Same [性别] model from the back, 
showing silhouette and tailoring details, [城市/极简背景], natural light.

[第2行 — 细节与搭配]
Middle-left cell (Cell 4): Extreme close-up macro shot of [第一核心细节，如口袋/拉链/印花], 
showing craftsmanship and texture, shallow depth of field, studio lighting. 
Middle cell (Cell 5): [商品英文描述] styled with [搭配单品，如白T恤/运动鞋/棒球帽], 
arranged on [中性色道具，如浅米色亚麻/木质道具], lifestyle flat styling, warm tones. 
Middle-right cell (Cell 6): Close-up of [第二核心细节，如领口/抽绳/面料质感], 
macro detail photography, fabric sheen or texture visible, soft studio light.

[第3行 — 场景与氛围]
Bottom-left cell (Cell 7): [性别] model wearing [商品英文描述] in a [户外自然场景, 
如海边/公园/山野], relaxed walking pose, [时间段] natural light, fabric moving 
in breeze, lifestyle travel photography. Bottom-middle cell (Cell 8): Same model 
wearing [商品英文描述] in an [城市运动场景, 如城市街道/地铁站/运动场], dynamic 
walking or casual action pose, urban street photography, slightly motion-blurred 
background, energetic mood. Bottom-right cell (Cell 9): Premium brand atmosphere 
shot, [性别] model or garment alone on a [高级感场景, 如黑色混凝土墙/极简白色空间/ 
金属置物架], dramatic low-key side lighting, luxury streetwear aesthetic, 
cinematic mood, this cell is the hero brand moment.

[整体风格]
Color palette: [主色调], cohesive and harmonious across all nine cells. 
Style: editorial e-commerce hybrid, commercial photography quality. 
Mood: [目标人群情感诉求, 如：confident/youthful/relaxed-luxury/aspirational].
```

**关键规则**：
- **商品描述必须完整**：每格都要重复关键商品特征（颜色+材质+款式+核心细节），确保9格风格统一
- **模特描述必须统一**：第2/3/7/8格的模特描述保持一致（性别+年龄+人种+体型）
- **9格共用同一色调**：主色调、灯光色温统一，保证整张图和谐
- **单条提示词写完**：不要拆分，GPT-Image 2 需要看到完整的全局+分区描述
- **整体 300-500 词**：涵盖全局设定和9个格子的具体内容

### Phase 3：生成 Seedance 2.0 视频提示词

必须生成 3 条：

```
视频1：商品静态展示视频（旋转/飘动/特写运镜）
视频2：模特上身动态展示（行走/动作展示，强调衣物动态）
视频3：生活场景带货视频（有故事感，氛围感强，高转化）
```

**每条 Seedance 提示词格式**（四段式）：

```
[Scene] 场景人物物品描述（英文）

[Motion] 镜头运动+人物动作描述（英文）
- 必须包含具体镜头语言：dolly in / pull back / tracking shot / slow motion / 
  orbit / crane up / rack focus 等
- 必须描述面料动态：fabric flutter / cloth rippling / breeze effect 等

[Style] 画面风格+色彩+帧率描述（英文）
- 色彩：warm golden tones / cool urban palette / vivid tropical colors 等
- 光线：natural sunlight / studio softbox / golden hour 等

[Mood] 情绪/氛围关键词（英文）
- 与商品目标人群情感诉求对齐
```

**关键规则**：
- [Motion] 段必须有具体的镜头运动描述，这是 Seedance 理解运镜的核心
- 面料动态单独描述（体现商品质感卖点）
- [Mood] 段对齐目标人群情感（如：街头青年 = edgy/cool/confident；都市白领 = polished/sophisticated）

### Phase 4：输出格式

```markdown
## 商品分析结果
[8个维度的表格 + 商品数量]

## GPT-Image 2 九宫格提示词

一张3×3九宫格大图，一次生成：
[完整单条提示词]

> 参数建议：尺寸 2048×2048（方形），quality: high，style: natural
> 生成后可用截图工具裁成9张独立图，或直接用作小红书九宫格封面

## Seedance 2.0 视频提示词

### 视频1 — 商品静态展示
[四段式提示词]

### 视频2 — 模特上身动态
[四段式提示词]

### 视频3 — 生活场景带货
[四段式提示词]

## 使用建议
[平台 × 用途 × 推荐内容的对应表格]
```

## 多图处理规则

- **同一商品多角度图**：合并分析，各角度信息互补，提示词更精准
- **不同商品/颜色**：询问用户是否分开生成。默认每件商品输出一套提示词，九宫格布局需适配商品数量（如：2件商品可做2×3或3×2布局）

## 质量检查清单

- [ ] 9格商品描述是否统一（颜色+材质+款式+细节一致）
- [ ] 模特描述是否前后统一（性别+年龄+人种）
- [ ] 9格色调是否统一（同一色温+主色调）
- [ ] 提示词是否为单条完整结构（不是9条分散提示词）
- [ ] Seedance 是否有具体镜头运动语言
- [ ] 是否有平台使用建议

## Common Mistakes

| 错误 | 正确做法 |
|------|---------|
| 生成9条分散提示词 | 必须是一条完整提示词描述3×3布局 |
| 9格商品描述不一致 | 每格都重复完整商品特征 |
| 模特描述前后矛盾 | 第2/3/7/8格模特保持完全一致 |
| 缺少面料动态描述 | Seedance [Motion] 段必须描述 fabric flutter 等 |
| Seedance 没有镜头语言 | [Motion] 必须有 dolly/tracking/orbit 等具体运镜 |
