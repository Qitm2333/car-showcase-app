// ========================================
// 汽车图片查询系统 - 配置文件
// ========================================

const APP_CONFIG = {
    // ========== Webhook配置 ==========
    // 替换为你的n8n服务器地址和webhook路径
    webhook: {
        // 生产环境URL (部署后使用)
        productionURL: 'https://你的n8n域名/webhook/get-car-images',
        
        // 本地开发URL (本地测试使用)
        localURL: 'http://localhost:5678/webhook/get-car-images',
        
        // 当前使用的环境 ('production' 或 'local')
        environment: 'production',
        
        // 请求超时时间（毫秒）
        timeout: 30000,
        
        // 是否启用调试模式（会在控制台输出详细日志）
        debug: true
    },

    // ========== 界面配置 ==========
    ui: {
        // 搜索示例车型
        exampleCars: [
            '奥迪A6L',
            '宝马X5',
            '特斯拉Model 3',
            '理想L9',
            '比亚迪汉',
            '蔚来ES6',
            '小鹏P7',
            '问界M5'
        ],
        
        // 默认占位符文本
        placeholder: '请输入车型名称，例如：奥迪A6L、宝马X5、特斯拉Model 3...',
        
        // 是否在页面加载时自动聚焦输入框
        autoFocusInput: true,
        
        // 消息自动隐藏时间（毫秒）
        messageAutoHideDelay: 5000
    },

    // ========== 功能配置 ==========
    features: {
        // 是否启用图片预览模态框
        enableImageModal: true,
        
        // 是否启用图片懒加载
        enableLazyLoad: true,
        
        // 是否启用回到顶部按钮
        enableBackToTop: true,
        
        // 回到顶部按钮显示的滚动距离（像素）
        backToTopThreshold: 300,
        
        // 是否显示加载步骤
        showLoadingSteps: true
    },

    // ========== 调试配置 ==========
    debug: {
        // 是否在控制台输出API请求/响应
        logAPIRequests: true,
        
        // 是否显示详细错误信息
        showDetailedErrors: true,
        
        // 是否模拟数据（用于前端测试，不发送真实请求）
        useMockData: false,
        
        // 模拟响应延迟（毫秒）
        mockDelay: 2000
    }
};

// ========== 获取当前Webhook URL ==========
function getWebhookURL() {
    const config = APP_CONFIG.webhook;
    const url = config.environment === 'local' 
        ? config.localURL 
        : config.productionURL;
    
    if (config.debug) {
        console.log(`[配置] 当前环境: ${config.environment}`);
        console.log(`[配置] Webhook URL: ${url}`);
    }
    
    return url;
}

// ========== 模拟数据（用于前端测试） ==========
const MOCK_DATA = {
    success: true,
    carId: "3170",
    carName: "奥迪A6L",
    brandID: "33",
    matchType: "googlesheet_fuzzy_match",
    totalImages: 7,
    categorySummary: {
        "外观": 4,
        "内饰": 2,
        "座椅": 1
    },
    images: [
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M09/8F/8E/1024x0_1_q95_autohomecar__ChxkPWTGJNyASQJXAAi2eA4OKt4906.jpg",
            category: "外观",
            view_type: "view45",
            index: 1
        },
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M05/8F/8E/1024x0_1_q95_autohomecar__ChxkPWTGJNyAEZn2AAkLh_rBMJg155.jpg",
            category: "外观",
            view_type: "viewFront",
            index: 2
        },
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M07/8F/8E/1024x0_1_q95_autohomecar__ChxkPWTGJNyACYNqAAiXs4gLLZk648.jpg",
            category: "外观",
            view_type: "view-45",
            index: 3
        },
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M03/8F/8E/1024x0_1_q95_autohomecar__ChxkPWTGJNyAMMfGAAhvtBgGXnY028.jpg",
            category: "外观",
            view_type: "viewSide",
            index: 4
        },
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M0A/8F/91/1024x0_1_q95_autohomecar__ChxkPWTGJRaAZWVIAAmJ5lq6d1g810.jpg",
            category: "内饰",
            view_type: "viewCNSL",
            index: 5
        },
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M04/8F/92/1024x0_1_q95_autohomecar__ChxkPWTGJRmALxZbAAiPKEHuYJc476.jpg",
            category: "内饰",
            view_type: "viewIP",
            index: 6
        },
        {
            url: "https://car3.autoimg.cn/cardfs/product/g28/M0B/8F/93/1024x0_1_q95_autohomecar__ChxkPWTGJR6ADBqIAAkzqDlLF9Q535.jpg",
            category: "座椅",
            view_type: "viewDoor",
            index: 7
        }
    ],
    message: "成功获取7张图片",
    timestamp: new Date().toISOString()
};

// ========== 日志工具函数 ==========
const Logger = {
    log: function(...args) {
        if (APP_CONFIG.debug.logAPIRequests) {
            console.log('[汽车查询]', ...args);
        }
    },
    
    error: function(...args) {
        console.error('[汽车查询 错误]', ...args);
    },
    
    warn: function(...args) {
        if (APP_CONFIG.debug.logAPIRequests) {
            console.warn('[汽车查询 警告]', ...args);
        }
    },
    
    info: function(...args) {
        if (APP_CONFIG.debug.logAPIRequests) {
            console.info('[汽车查询 信息]', ...args);
        }
    },
    
    debug: function(...args) {
        if (APP_CONFIG.webhook.debug) {
            console.debug('[汽车查询 调试]', ...args);
        }
    }
};

// ========== 配置验证 ==========
function validateConfig() {
    const errors = [];
    const warnings = [];
    
    // 检查webhook URL
    const webhookURL = getWebhookURL();
    if (webhookURL.includes('你的n8n域名')) {
        errors.push('Webhook URL未配置，请修改config.js中的productionURL');
    }
    
    // 检查环境设置
    if (!['production', 'local'].includes(APP_CONFIG.webhook.environment)) {
        warnings.push(`未知的环境配置: ${APP_CONFIG.webhook.environment}，应为 'production' 或 'local'`);
    }
    
    // 检查模拟数据模式
    if (APP_CONFIG.debug.useMockData) {
        warnings.push('当前处于模拟数据模式，不会发送真实请求');
    }
    
    // 输出验证结果
    if (errors.length > 0) {
        Logger.error('配置错误:', errors);
    }
    
    if (warnings.length > 0) {
        Logger.warn('配置警告:', warnings);
    }
    
    return {
        valid: errors.length === 0,
        errors: errors,
        warnings: warnings
    };
}

// ========== 导出配置 ==========
// 在页面加载时自动验证配置
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        Logger.info('========================================');
        Logger.info('汽车图片查询系统配置信息');
        Logger.info('========================================');
        Logger.info('Webhook URL:', getWebhookURL());
        Logger.info('环境:', APP_CONFIG.webhook.environment);
        Logger.info('调试模式:', APP_CONFIG.webhook.debug ? '开启' : '关闭');
        Logger.info('模拟数据:', APP_CONFIG.debug.useMockData ? '开启' : '关闭');
        Logger.info('========================================');
        
        const validation = validateConfig();
        if (!validation.valid) {
            console.error('❌ 配置验证失败，请检查config.js文件');
        } else if (validation.warnings.length > 0) {
            console.warn('⚠️ 配置有警告信息，请检查');
        } else {
            Logger.info('✅ 配置验证通过');
        }
    });
}

