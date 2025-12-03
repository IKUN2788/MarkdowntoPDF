<img width="1634" height="989" alt="image" src="https://github.com/user-attachments/assets/f9fc694d-2014-4b90-bdcd-d0e6c842d3be" />

# 🛠️ 构建高效的 Markdown 转 PDF 在线工具

在日常工作和学习中，我们经常需要将 Markdown 笔记转换为 PDF 文档以便分享或打印。虽然市面上有许多工具，但它们往往需要安装庞大的软件或依赖复杂的后端服务。

本文将介绍一个**纯前端实现、轻量级且即开即用**的 Markdown 转 PDF 工具。

**[线上预览](https://project.ikun.space/MD_to_PDF/)**
**[线上预览](https://project.ikun.space/MD_to_PDF/)**
**[线上预览](https://project.ikun.space/MD_to_PDF/)**

## ✨ 主要功能 (Features)

这个工具旨在提供最流畅的写作与转换体验：

1.  **👀 实时预览 (Live Preview)**
    *   左侧编辑，右侧实时渲染。
    *   支持 GitHub 风格的 Markdown 渲染。

2.  **💻 代码高亮 (Syntax Highlighting)**
    *   内置 `Highlight.js`，支持 JavaScript, Python, CSS, HTML 等主流编程语言的语法高亮。
    *   代码块样式经过优化，在 PDF 中也能清晰阅读。

3.  **📄 完美导出 PDF**
    *   基于 `html2pdf.js`，支持 A4 纸张格式。
    *   **智能分页**：自动处理图片、表格和代码块的分页问题，避免内容被截断。
    *   **打印级样式**：导出时自动应用优化后的排版样式（字体、边距、颜色）。

## 🛠️ 技术栈 (Tech Stack)

本项目完全基于原生 Web 技术构建，零后端依赖：

| 组件 | 描述 |
| :--- | :--- |
| **HTML5 & CSS3** | 构建现代化的响应式布局 |
| **Marked.js** | 快速高效的 Markdown 解析器 |
| **Highlight.js** | 强大的代码语法高亮引擎 |
| **html2pdf.js** | 将 DOM 节点直接转换为 PDF |

## 📝 代码实现亮点

### 1. 核心转换逻辑

使用 `html2pdf.js` 并配置高精度的渲染参数：

```javascript
const opt = {
    margin:       [15, 15, 15, 15], // 优化的页边距
    filename:     'document.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
        scale: 2, // 2倍缩放以保证清晰度
        useCORS: true, 
        letterRendering: true 
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } // 智能分页
};
```

### 2. 打印模式样式

为了保证 PDF 的美观，我们在导出时动态应用特定的 CSS 类：

```css
/* PDF Generation Specific Styles */
.print-mode {
    background-color: white !important;
    border: none !important;
}

.print-mode .markdown-body {
    padding: 0 !important;
    font-family: "Microsoft YaHei", sans-serif; /* 优化字体显示 */
}
```

## 🚀 如何使用

1.  **打开工具**：双击 `index.html` 或在本地服务器运行。
2.  **输入内容**：在左侧文本框输入 Markdown，或点击 "📂 选择 Markdown 文件" 上传本地 `.md` 文件。
3.  **导出**：点击右上角的 "📄 导出为 PDF" 按钮，稍等片刻即可下载。

---

> *本文本身即由该工具编写并转换生成。*
