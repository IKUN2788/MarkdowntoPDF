document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdownInput');
    const previewContent = document.getElementById('previewContent');
    const fileInput = document.getElementById('fileInput');
    const convertBtn = document.getElementById('convertBtn');

    // Configure Marked.js with Highlight.js
    marked.setOptions({
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        breaks: true, // Enable line breaks
        gfm: true     // Enable GitHub Flavored Markdown
    });

    // Update Preview Function
    function updatePreview() {
        const markdownText = markdownInput.value;
        const htmlContent = marked.parse(markdownText);
        previewContent.innerHTML = htmlContent;
        
        // Re-highlight code blocks after render (sometimes needed if highlight option doesn't catch all)
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // Event Listener for Text Input
    markdownInput.addEventListener('input', updatePreview);

    // Event Listener for File Upload
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            markdownInput.value = event.target.result;
            updatePreview();
        };
        reader.readAsText(file);
    });

    // Event Listener for PDF Conversion
    convertBtn.addEventListener('click', () => {
        const element = document.getElementById('previewContent');
        
        // Add print mode class for better styling during PDF generation
        element.classList.add('print-mode');

        // Options for html2pdf
        const opt = {
            margin:       [15, 15, 15, 15], // top, left, bottom, right (increased margins)
            filename:     'document.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true, 
                logging: false,
                letterRendering: true 
            },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Show loading state
        const originalText = convertBtn.innerText;
        convertBtn.innerText = '正在生成...';
        convertBtn.disabled = true;

        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            convertBtn.innerText = originalText;
            convertBtn.disabled = false;
            element.classList.remove('print-mode');
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            alert('生成 PDF 时出错，请查看控制台。');
            convertBtn.innerText = originalText;
            convertBtn.disabled = false;
            element.classList.remove('print-mode');
        });
    });

    // Initial sample text
    const sampleText = `# 欢迎使用 Markdown 转 PDF 工具

在此处输入或粘贴 **Markdown** 文本。

## 功能列表
- 实时预览
- 支持代码高亮
- 支持上传 .md 文件
- 一键导出 PDF

## 代码示例
\`\`\`javascript
console.log('Hello, World!');
\`\`\`

## 表格示例
| 名称 | 类型 | 描述 |
|------|------|------|
| item1| A    | 测试 |
| item2| B    | 测试 |

`;

    if (!markdownInput.value) {
        markdownInput.value = sampleText;
        updatePreview();
    }
});
