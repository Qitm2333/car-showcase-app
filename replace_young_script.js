const fs = require('fs');
const path = require('path');

// 需要修改的文件列表
const filesToUpdate = [
    'src/imports/favorites-detail/左侧组件-15-767.tsx',
    'src/imports/favorites-main/左侧组件-42-657.tsx',
    'src/imports/inspiration-main/左侧组件-15-767.tsx',
    'src/imports/favorites-main/03收藏夹页面GbzLayout.tsx',
    'src/imports/inspiration-detail/左侧组件.tsx',
    'src/imports/favorites-main/02车型展示子层级GbzLayout.tsx',
    'src/imports/favorites-main/02车型展示ResahpeGbzLayout.tsx',
    'src/imports/ai-analysis/02车型展示子层级GbzLayout.tsx',
    'src/imports/favorites-detail/02车型展示ResahpeGbzLayout-1-1077.tsx',
    'src/imports/ai-analysis/03收藏夹页面GbzLayout.tsx',
    'src/imports/ai-analysis/02车型展示ResahpeGbzLayout.tsx',
    'src/imports/ai-analysis/02车型展示ResahpeGbzLayout-1-1077.tsx',
    'src/imports/inspiration-detail/02车型展示ResahpeGbzLayout-1-1077.tsx',
    'src/imports/favorites-detail/02车型展示ResahpeGbzLayout.tsx',
    'src/imports/ai-analysis/左侧组件.tsx',
    'src/imports/ai-analysis/左侧组件-45-1179.tsx',
    'src/imports/favorites-detail/左侧组件-42-657.tsx',
    'src/imports/ai-analysis/04收藏夹详情页面GbzLayout.tsx',
    'src/imports/favorites-main/左侧组件.tsx',
    'src/imports/favorites-detail/左侧组件.tsx',
    'src/imports/search-results/SearchResultsLayout.tsx',
    'src/imports/favorites-main/02车型展示ResahpeGbzLayout-1-1077.tsx',
    'src/imports/favorites-detail/03收藏夹页面GbzLayout.tsx',
    'src/imports/inspiration-main/02车型展示ResahpeGbzLayout.tsx',
    'src/imports/inspiration-detail/左侧组件-15-767.tsx',
    'src/imports/ai-analysis/左侧组件-42-657.tsx',
    'src/imports/inspiration-detail/02车型展示子层级GbzLayout.tsx',
    'src/imports/inspiration-detail/02车型展示ResahpeGbzLayout.tsx',
    'src/imports/favorites-detail/02车型展示子层级GbzLayout.tsx',
    'src/imports/favorites-main/左侧组件-15-767.tsx',
    'src/imports/ai-analysis/左侧组件-15-767.tsx'
];

// 处理每个文件
filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // 检查是否已经导入了DynamicUserName
        if (!content.includes('import DynamicUserName')) {
            // 在import语句后添加导入
            content = content.replace(
                /import React from "react";/,
                'import React from "react";\nimport DynamicUserName from "@/components/DynamicUserName";'
            );
        }
        
        // 替换Young文本
        content = content.replace(
            /<p className="leading-\[normal\] whitespace-pre">Young<\/p>/,
            '<DynamicUserName />'
        );
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});

console.log('All files processed!');