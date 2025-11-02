import React, { useEffect, useRef, useState } from 'react';

interface Mosquito {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  style: number;
  isCaught: boolean;
  rotation: number;
}

interface Frog {
  x: number;
  y: number;
  isEating: boolean;
  tongueProgress: number;
  eatTarget: Mosquito | null;
  squashStretch: number;
  anticipation: number;
  blinkTimer: number;
  isBlinking: boolean;
}

export default function FrogGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mosquitosRef = useRef<Mosquito[]>([]);
  const frogRef = useRef<Frog | null>(null);
  const frameCountRef = useRef(0);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas大小（支持高DPI屏幕）
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = parent.clientWidth;
        const displayHeight = parent.clientHeight;
        
        // 设置实际渲染尺寸（考虑设备像素比）
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        
        // 设置CSS显示尺寸
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        // 缩放上下文以匹配设备像素比
        ctx.scale(dpr, dpr);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 初始化青蛙（使用显示尺寸）
    const parent = canvas.parentElement;
    const displayWidth = parent?.clientWidth || canvas.width;
    const displayHeight = parent?.clientHeight || canvas.height;
    
    frogRef.current = {
      x: displayWidth / 2,
      y: displayHeight - 150,
      isEating: false,
      tongueProgress: 0,
      eatTarget: null,
      squashStretch: 1.0,
      anticipation: 0,
      blinkTimer: 0,
      isBlinking: false,
    };

    // 初始化8只蚊子（使用显示尺寸）
    for (let i = 0; i < 8; i++) {
      mosquitosRef.current.push(createMosquito(displayWidth, displayHeight));
    }

    // 动画循环（使用显示尺寸）
    const animate = () => {
      frameCountRef.current++;
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || canvas.width;
      const h = parent?.clientHeight || canvas.height;
      draw(ctx, w, h);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const createMosquito = (width: number, height: number): Mosquito => {
    return {
      x: Math.random() * (width - 200) + 100,
      y: Math.random() * (height - 400) + 80,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      phase: Math.random() * Math.PI * 2,
      style: Math.floor(Math.random() * 2),
      isCaught: false,
      rotation: 0,
    };
  };

  const updateMosquito = (m: Mosquito, width: number, height: number) => {
    if (!m.isCaught) {
      m.x += m.vx;
      m.y += m.vy;
      m.phase += 0.1;

      // 边界反弹
      if (m.x < 100) { m.x = 100; m.vx = Math.abs(m.vx) * 0.8; }
      if (m.x > width - 100) { m.x = width - 100; m.vx = -Math.abs(m.vx) * 0.8; }
      if (m.y < 80) { m.y = 80; m.vy = Math.abs(m.vy) * 0.8; }
      if (m.y > height - 250) { m.y = height - 250; m.vy = -Math.abs(m.vy) * 0.8; }

      // 8字形飞行
      m.x += Math.sin(m.phase) * 0.8;
      m.y += Math.cos(m.phase * 1.3) * 0.8;

      // 随机改变方向
      if (Math.random() < 0.02) {
        m.vx += (Math.random() - 0.5);
        m.vy += (Math.random() - 0.5);
        m.vx = Math.max(-2, Math.min(2, m.vx));
        m.vy = Math.max(-2, Math.min(2, m.vy));
      }
    } else {
      m.rotation += 0.3;
      m.x += (Math.random() - 0.5) * 4;
      m.y += (Math.random() - 0.5) * 4;
    }
  };

  const drawMosquito = (ctx: CanvasRenderingContext2D, m: Mosquito, isNearest: boolean) => {
    ctx.save();
    ctx.translate(m.x, m.y);

    if (m.isCaught) {
      ctx.rotate(m.rotation);
      const scale = 0.8 + Math.sin(frameCountRef.current * 0.1) * 0.2;
      ctx.scale(scale, scale);
    }

    // 高亮圈
    if (isNearest && !m.isCaught) {
      ctx.strokeStyle = 'rgba(255, 200, 0, 0.6)';
      ctx.lineWidth = 2;
      const highlightSize = 40 + Math.sin(frameCountRef.current * 0.05) * 5;
      ctx.beginPath();
      ctx.arc(0, 0, highlightSize / 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 绘制蚊子
    ctx.fillStyle = '#6496ff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (Math.floor(frameCountRef.current / 10) % 2 === 0) {
      ctx.fillText('C●○', 0, 0);
    } else {
      ctx.fillText('~●~', 0, 0);
    }

    ctx.restore();
  };

  const updateFrog = (frog: Frog) => {
    if (frog.isEating) {
      frog.tongueProgress += 0.015;

      if (frog.tongueProgress > 0.5 && frog.eatTarget) {
        frog.eatTarget.isCaught = true;
      }

      if (frog.tongueProgress < 0.15) {
        frog.anticipation = easeOutQuad(frog.tongueProgress / 0.15) * -15;
        frog.squashStretch = 1.0 - (frog.tongueProgress / 0.15) * 0.3;
      } else if (frog.tongueProgress < 0.5) {
        const t = (frog.tongueProgress - 0.15) / 0.35;
        frog.anticipation = -15 + t * 15;
        frog.squashStretch = 0.7 + t * 0.5;
      } else if (frog.tongueProgress < 0.7) {
        frog.anticipation = 0;
        frog.squashStretch = 1.2;
      } else {
        const t = (frog.tongueProgress - 0.7) / 0.3;
        frog.anticipation = t * 5;
        frog.squashStretch = 1.2 - t * 0.2;
      }

      if (frog.tongueProgress >= 1) {
        frog.tongueProgress = 0;
        frog.isEating = false;
        frog.anticipation = 0;
        frog.squashStretch = 1.0;
      }
    } else {
      frog.squashStretch = 1.0 + Math.sin(frameCountRef.current * 0.03) * 0.02;
      frog.anticipation = 0;
    }

    frog.blinkTimer++;
    if (frog.blinkTimer > 120 && !frog.isEating) {
      frog.isBlinking = true;
      if (frog.blinkTimer > 130) {
        frog.isBlinking = false;
        frog.blinkTimer = 0;
      }
    }
  };

  const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

  const drawFrog = (ctx: CanvasRenderingContext2D, frog: Frog) => {
    ctx.save();
    ctx.translate(frog.x + frog.anticipation, frog.y);
    ctx.scale(2 - frog.squashStretch, frog.squashStretch);

    // 绘制舌头
    if (frog.isEating && frog.eatTarget && frog.tongueProgress > 0.15) {
      ctx.save();
      ctx.scale(1 / (2 - frog.squashStretch), 1 / frog.squashStretch);

      const eatProgress = Math.min((frog.tongueProgress - 0.15) / 0.35, 1);
      const returnProgress = Math.max((frog.tongueProgress - 0.7) / 0.3, 0);
      const actualProgress = frog.tongueProgress < 0.7 ? eatProgress : 1 - returnProgress;

      const tx = (frog.eatTarget.x - frog.x - frog.anticipation) * actualProgress;
      const ty = (frog.eatTarget.y - frog.y) * actualProgress;

      ctx.strokeStyle = '#ff8c00';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      ctx.fillStyle = '#ff8c00';
      ctx.beginPath();
      ctx.arc(tx, ty, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 绘制青蛙身体
    ctx.fillStyle = '#32c850';
    ctx.font = '24px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 眼睛
    if (frog.isBlinking) {
      ctx.fillText('(−),(−)', 0, -20);
    } else {
      ctx.fillText('(O),(O)', 0, -20);
    }

    // 嘴巴
    if (frog.isEating) {
      if (frog.tongueProgress < 0.15) {
        ctx.fillText('(→←)', -5, 0);
      } else if (frog.tongueProgress < 0.7) {
        ctx.fillText('(<=)', -5, 0);
      } else {
        ctx.fillText('(^ω^)', -5, 0);
      }
    } else {
      ctx.fillText('(←→)', 0, 0);
    }

    // 鼻子
    ctx.fillText('(.>__<.)', 0, 20);

    // 脚
    const footShake = Math.sin(frameCountRef.current * 0.1) * 2;
    ctx.fillText('^^^  ^^^', footShake, 40);

    ctx.restore();
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 清空画布
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // 重置transform以正确清空整个画布
    ctx.fillStyle = '#f0f8ff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    const frog = frogRef.current;
    if (!frog) return;

    // 找到最近的蚊子
    let nearest: Mosquito | null = null;
    let minDist = Infinity;
    if (!frog.isEating) {
      for (const m of mosquitosRef.current) {
        const d = Math.hypot(frog.x - m.x, frog.y - m.y);
        if (d < minDist) {
          minDist = d;
          nearest = m;
        }
      }
    }

    // 更新和绘制蚊子
    for (let i = mosquitosRef.current.length - 1; i >= 0; i--) {
      const m = mosquitosRef.current[i];
      updateMosquito(m, width, height);
      drawMosquito(ctx, m, m === nearest && minDist < 400);
    }

    // 更新和绘制青蛙
    updateFrog(frog);
    drawFrog(ctx, frog);

    // 移除被吃掉的蚊子并生成新的
    if (frog.eatTarget && frog.tongueProgress > 0.95) {
      const index = mosquitosRef.current.indexOf(frog.eatTarget);
      if (index > -1) {
        mosquitosRef.current.splice(index, 1);
        mosquitosRef.current.push(createMosquito(width, height));
      }
      frog.eatTarget = null;
    }

    // 绘制提示文字（右上角）
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    const rightX = width - 20;
    ctx.fillText('点击鼠标吃掉最近的蚊子', rightX, 30);
    ctx.fillText(`蚊子数量: ${mosquitosRef.current.length}`, rightX, 55);
    if (nearest && minDist < 400) {
      ctx.fillText(`距离: ${Math.floor(minDist)} 像素`, rightX, 80);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const frog = frogRef.current;
    if (!canvas || !frog || frog.isEating) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 找到最近的蚊子
    let nearest: Mosquito | null = null;
    let minDist = Infinity;
    for (const m of mosquitosRef.current) {
      const d = Math.hypot(frog.x - m.x, frog.y - m.y);
      if (d < minDist) {
        minDist = d;
        nearest = m;
      }
    }

    if (nearest && minDist < 400) {
      frog.isEating = true;
      frog.eatTarget = nearest;
      frog.tongueProgress = 0;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="absolute inset-0 cursor-pointer"
    />
  );
}

