/**
 * Vercel Serverless Function - N8N API 代理
 * 解决CORS跨域问题
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// N8N 后端地址
const N8N_BASE_URL = 'https://lynn-cafa-system.app.n8n.cloud';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // 生产环境建议设置为具体域名
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 处理 preflight 请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 从查询参数获取目标路径
    const { path } = req.query;
    
    if (!path || typeof path !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: '缺少 path 参数' 
      });
    }

    // 构建完整的N8N URL
    const targetUrl = `${N8N_BASE_URL}${path}`;
    
    console.log(`[Proxy] ${req.method} ${targetUrl}`);

    // 转发请求到 N8N
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined,
    });

    // 读取响应文本
    const text = await response.text();
    
    // 如果返回404，记录详细信息
    if (response.status === 404) {
      console.error('[Proxy 404]', {
        targetUrl,
        method: req.method,
        responseText: text
      });
    }

    // 尝试解析JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { success: false, error: text };
    }

    // 返回响应
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error('[Proxy Error]', error);
    res.status(500).json({ 
      success: false, 
      error: '代理请求失败', 
      message: error.message 
    });
  }
}

