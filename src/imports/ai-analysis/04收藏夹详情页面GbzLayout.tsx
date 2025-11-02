import React, { useState } from "react";
import svgPaths from "./svg-58vs26dot4";
import svgPathsLeftSidebar from "./svg-lt6sj6nxih";
import svgPathsAi from "./svg-x97xq9ehdi";
import DynamicUserName from "@/components/DynamicUserName";
import DynamicUserInitial from "@/components/DynamicUserInitial";
import SearchBar from "@/components/SearchBar";
import LanguageSelector from "@/components/LanguageSelector";
import { useAIAnalysis } from "@/contexts/AIAnalysisContext";
import { useFolderCache } from "@/contexts/FolderCacheContext";
import img1 from "figma:asset/5b705b92be0721d93aaa1956ff0e19d5f801458a.png";
import img2 from "figma:asset/b0ef633e840f58f4d9b3383d20f87d9d4bbde4ae.png";
import img21 from "figma:asset/f0d1fd67cd8c187a7ced484b53d26339e55cba01.png";
import imgAi041 from "figma:asset/46003650cde3b949971119d949fc7063f28bc448.png";
import imgAi042 from "figma:asset/8e8053a6dbca7a6848f369ad65db2225e6e22d34.png";
import imgSuv1 from "figma:asset/aaef27828b208eb34705cf8627140f4cb4a529bf.png";
import imgIntersect from "figma:asset/e2cc2b7cf74e7714fdd94354b7cd1ccc784092f6.png";

// 背景组件
function BackgroundComponent() {
  return (
    <div className="absolute h-[2174px] right-[-425px] top-[-232px] w-[1881px] z-[-1] pointer-events-none" data-name="背景">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1881 2174">
        <g id="èæ¯">
          <g id="Rectangle 32"></g>
          <foreignObject height="593.6" width="622.6" x="115.7" y="-6.3">
            <div style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_1_597_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <ellipse cx="427" cy="290.5" data-figma-bg-blur-radius="4" fill="url(#paint0_radial_1_597)" fillOpacity="0.49" id="Ellipse 52" opacity="0.2" rx="305" ry="290.5" />
          <circle cx="1151.5" cy="1444.5" fill="url(#paint1_radial_1_597)" fillOpacity="0.38" id="Ellipse 51" opacity="0.2" r="729.5" />
        </g>
        <defs>
          <clipPath id="bgblur_0_1_597_clip_path" transform="translate(-115.7 6.3)">
            <ellipse cx="427" cy="290.5" rx="305" ry="290.5" />
          </clipPath>
          <radialGradient cx="0" cy="0" gradientTransform="translate(427 290.5) rotate(90) scale(290.5 305)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_597" r="1">
            <stop stopColor="#7E8BFF" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient cx="0" cy="0" gradientTransform="translate(1151.5 1444.5) rotate(90) scale(729.5)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_597" r="1">
            <stop stopColor="#7E98FF" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// 左侧导航栏组件
function FrameLeft() {
  return (
    <div className="absolute aspect-[28/28] left-[19.78%] overflow-clip right-[73.63%] top-[899px]" data-name="Frame">
      <div className="absolute bottom-[86.77%] left-[18.63%] right-[37.25%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 3">
          <path d={svgPaths.p3d59c00} fill="var(--fill-0, #545456)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[2.45%] right-[1.96%] top-[4.41%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.pa222700} fill="var(--fill-0, #545456)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group1Left() {
  return (
    <div className="absolute contents inset-[11.64%_6.59%_83.6%_6.96%]">
      <div className="absolute bg-white inset-[11.64%_6.59%_83.6%_6.96%] rounded-[18px]">
        <div aria-hidden="true" className="absolute border-[#6f30d6] border-[0.2px] border-solid inset-0 pointer-events-none rounded-[18px]" />
      </div>
    </div>
  );
}

function GroupLeft() {
  return (
    <div className="absolute inset-[4.12%_76.19%_91.76%_6.96%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
        <g id="Group 19">
          <g id="Ellipse 35">
            <circle cx="39.4992" cy="39.5003" fill="url(#paint0_linear_1_577)" r="6.5" />
            <circle cx="39.4992" cy="39.5003" fill="var(--fill-1, #999AFF)" r="6.5" />
          </g>
          <g id="Subtract">
            <path d={svgPaths.p1eb60c40} fill="url(#paint1_linear_1_577)" />
            <path d={svgPaths.p1eb60c40} fill="var(--fill-1, #6062EF)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_577" x1="45.9992" x2="30.4992" y1="43.0003" y2="34.0003">
            <stop stopColor="#6062EF" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_577" x1="35.9992" x2="10.9997" y1="3.49992" y2="43.499">
            <stop stopColor="#6062EF" />
            <stop offset="1" stopColor="#ADAEFC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ========== 动态对话列表组件 ==========

// ⭐ 骨架屏：对话项加载中
function DialogueItemSkeleton() {
  return (
    <div className="rounded-[18px] mb-[10px] py-[8px] pl-[12px] pr-[8px] bg-[#f8f9fa]">
      <div className="flex items-center gap-[10px]">
        <div className="w-[18px] h-[18px] bg-gradient-to-br from-[#e0dff5] to-[#d5d4e8] rounded-full animate-pulse flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-[14px] bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded w-[80%] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// ⭐ 动态对话项
interface DialogueItemProps {
  title: string;
  preview?: string;
  isActive: boolean;
  onClick: () => void;
}

function DialogueItem({ title, preview, isActive, onClick }: DialogueItemProps) {
  return (
    <div
      className={`
        cursor-pointer transition-all duration-200 rounded-[18px] mb-[10px] py-[8px] pl-[12px] pr-[8px]
        ${isActive ? 'bg-[#ebe9ff] shadow-[0_1px_3px_rgba(96,98,239,0.12)]' : 'hover:bg-[#f5f3ff]'}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-[10px]">
        <img src={img1} alt="" className={`w-[18px] h-[18px] object-contain flex-shrink-0 ${isActive ? 'opacity-80' : 'opacity-70'}`} />
        <p className={`font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] text-[14px] truncate flex-1 leading-[1.4] ${isActive ? 'text-[rgba(0,0,0,0.9)] font-medium' : 'text-[rgba(0,0,0,0.8)]'}`}>
          {title}
        </p>
      </div>
    </div>
  );
}

// ⭐ 动态对话列表容器
function DynamicDialogueList() {
  const { dialogues, isLoadingDialogues, currentDialogueID, selectDialogue } = useAIAnalysis();

  if (isLoadingDialogues) {
    return (
      <div className="absolute left-[48px] right-[12.09%] top-[755px] bottom-[8%]">
        <div className="flex flex-col pt-[8px]">
          <DialogueItemSkeleton />
          <DialogueItemSkeleton />
          <DialogueItemSkeleton />
        </div>
      </div>
    );
  }

  // ⭐ 空状态提示 - 居中显示
  if (dialogues.length === 0) {
    return (
      <div className="absolute left-[60px] w-[150px] top-[775px] h-[120px] flex flex-col items-center justify-center pointer-events-none">
        <p className="font-['Inter:Regular',_sans-serif] text-[13px] text-[rgba(0,0,0,0.4)] text-center whitespace-nowrap">
          暂无对话历史
          <br />
          <span className="text-[11px]">开始新的对话吧</span>
        </p>
      </div>
    );
  }

  // ⭐ 显示所有对话，添加内部滚动（隐藏滚动条）
  return (
    <>
      <style>{`
        .dialogue-list-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div 
        className="dialogue-list-scroll absolute left-[48px] right-[12.09%] top-[755px] bottom-[8%] overflow-y-auto pt-[8px]"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {dialogues.map((dialogue) => (
          <DialogueItem
            key={dialogue.dialogueID}
            title={dialogue.title}
            preview={dialogue.preview}
            isActive={dialogue.dialogueID === currentDialogueID}
            onClick={() => selectDialogue(dialogue.dialogueID)}
          />
        ))}
      </div>
    </>
  );
}

// ========== 动态消息显示组件 ==========

// ⭐ 动态消息气泡
interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  messageType?: 'text' | 'proposal' | 'confirmation';  // ⭐ 新增
  onAccept?: () => void;  // ⭐ Accept按钮回调
  onReject?: () => void;  // ⭐ Reject按钮回调
}

function MessageBubble({ role, content, messageType = 'text', onAccept, onReject }: MessageBubbleProps) {
  const [isAccepted, setIsAccepted] = useState(false);  // ⭐ 跟踪Accept状态
  
  if (role === 'user') {
    // 用户消息 - 右对齐，静态风格（右边距27px与输入框对齐）
    return (
      <div className="flex justify-end mb-6 mr-[27px] animate-fadeIn">
        <div className="max-w-[70%] bg-[#fefdff] rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px] px-[25px] py-[18px] shadow-sm border border-[#ddd6eb]">
          <p className="font-['Bricolage_Grotesque:Medium',_sans-serif] text-[18px] text-[#272727] leading-[1.8] whitespace-pre-wrap break-words" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {content}
          </p>
        </div>
      </div>
    );
  } else {
    // AI消息 - 左对齐，静态风格
    const shouldShowButtons = messageType === 'proposal' && onAccept && onReject;
    
    // ⭐ 按钮点击处理
    const handleAcceptClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsAccepted(true);
      if (onAccept) {
        onAccept();
      }
    };
    
    const handleRejectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onReject) {
        onReject();
      }
    };
    
    return (
      <div className="flex justify-start mb-6 animate-fadeIn relative z-[100]">
        <div className="max-w-[70%] relative z-[100]">
          <div className="bg-[#fefdff] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] px-[25px] py-[18px] shadow-sm border border-[#ddd6eb]">
            <p className="font-['Bricolage_Grotesque:Medium',_sans-serif] text-[18px] text-[#272727] leading-[1.8] whitespace-pre-wrap break-words" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {content}
            </p>
          </div>
          
          {/* ⭐ Proposal类型：显示Accept/Reject按钮 */}
          {shouldShowButtons && (
            <div 
              className="flex gap-2 mt-4 justify-end relative z-[200]"
              style={{ position: 'relative', zIndex: 200 }}
            >
              <button
                onClick={handleRejectClick}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  console.log('🖱️ Reject mousedown');
                }}
                type="button"
                className="px-5 py-2 bg-[#f5f5f5] text-[#666] rounded-[18px] font-['Inter:Medium',_sans-serif] text-[14px] font-medium hover:bg-[#e8e8e8] transition-colors duration-200 cursor-pointer select-none"
                style={{ position: 'relative', zIndex: 201, pointerEvents: 'all' }}
              >
                Reject
              </button>
              <button
                onClick={handleAcceptClick}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  console.log('🖱️ Accept mousedown');
                }}
                type="button"
                className={`px-5 py-2 rounded-[18px] font-['Inter:Medium',_sans-serif] text-[14px] font-medium transition-colors duration-200 cursor-pointer select-none ${
                  isAccepted 
                    ? 'bg-[#4ade80] text-white hover:bg-[#22c55e]' 
                    : 'bg-[#e8e6f2] text-[#6062ef] hover:bg-[#ddd6eb]'
                }`}
                style={{ position: 'relative', zIndex: 201, pointerEvents: 'all' }}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// ⭐ Loading消息气泡
function LoadingBubble() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white rounded-[18px] px-4 py-3 shadow-md border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#667eea] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#667eea] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#667eea] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

// ⭐ 报告卡片组件
interface ReportCardProps {
  reportName: string;
  htmlContent: string;
}

function ReportCard({ reportName, htmlContent }: ReportCardProps) {
  const handleOpenReport = () => {
    // 在新窗口打开HTML报告
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="flex justify-start mb-6 animate-fadeIn">
      <div className="bg-[#fefdff] rounded-[20px] px-8 py-6 shadow-sm border border-[#e5e4f0] w-[520px]">
        {/* 提示文本 */}
        <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#666] mb-2">
          您的报告生成完毕后即可点击预览
        </p>
        <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#999] mb-4">
          由于服务器限制，此内容刷新界面后即消失
        </p>
        
        {/* 报告卡片 */}
        <div 
          onClick={handleOpenReport}
          className="bg-white rounded-[16px] px-6 py-5 border border-[#e8e8e8] flex items-center justify-between cursor-pointer hover:border-[#6062ef] hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            {/* 文档图标 */}
            <div className="w-12 h-12 bg-[#f0f0ff] rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8e6f2] transition-colors">
              <svg className="w-5 h-5 text-[#6062ef]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* 报告名称 */}
            <div className="flex flex-col gap-1">
              <p className="font-['Inter:Medium',_sans-serif] text-[17px] text-[#272727] font-medium">
                {reportName}
              </p>
              <p className="font-['Inter:Regular',_sans-serif] text-[13px] text-[#999]">
                Created At 12:34
              </p>
            </div>
          </div>
          
          {/* 下载图标 */}
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#999] group-hover:text-[#6062ef] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ⭐ 消息骨架屏 - AI消息
function MessageSkeletonAI() {
  return (
    <div className="flex justify-start mb-6">
      <div className="w-[693px] bg-[#fefdff] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] px-[25px] py-[18px] shadow-sm border border-[#ddd6eb]">
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded"></div>
          <div className="h-4 bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

// ⭐ 消息骨架屏 - 用户消息
function MessageSkeletonUser() {
  return (
    <div className="flex justify-end mb-6 mr-[27px]">
      <div className="w-[550px] bg-[#fefdff] rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px] px-[25px] py-[18px] shadow-sm border border-[#ddd6eb]">
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded w-4/5"></div>
          <div className="h-4 bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded"></div>
        </div>
      </div>
    </div>
  );
}

// ⭐ 消息列表骨架屏（加载对话时显示）
function MessagesLoadingSkeleton() {
  return (
    <div className="flex flex-col pt-8">
      <MessageSkeletonUser />
      <MessageSkeletonAI />
      <MessageSkeletonUser />
    </div>
  );
}

// ⭐ 动态消息列表容器
function DynamicMessagesList({ clearReportStatesRef }: { clearReportStatesRef: React.MutableRefObject<(() => void) | null> }) {
  const { messages, sendMessage, generateReport, currentTitle, isSending, isLoadingDetail, currentDialogueID } = useAIAnalysis();
  const [handledProposals, setHandledProposals] = useState<Set<number>>(new Set());  // ⭐ 记录已处理的proposal索引
  const [generatedReport, setGeneratedReport] = useState<{ name: string; html: string; insertAfterIndex: number } | null>(null);  // ⭐ 生成的报告
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);  // ⭐ 报告生成中
  const [reportCompleted, setReportCompleted] = useState(false);  // ⭐ 报告已完成标志
  
  // ⭐ 将清理函数赋值给 ref，供外部调用
  React.useEffect(() => {
    clearReportStatesRef.current = () => {
      console.log('🧹🧹🧹 [清理函数被调用] ===== 开始清除报告状态 =====');
      console.log('  当前状态:', {
        generatedReport: !!generatedReport,
        isGeneratingReport,
        reportCompleted
      });
      setGeneratedReport(null);
      setIsGeneratingReport(false);
      setReportCompleted(false);
      console.log('  ✅ 清理完成');
    };
  }, [clearReportStatesRef, generatedReport, isGeneratingReport, reportCompleted]);
  
  // ⭐ 当对话ID变化时，清空所有状态
  const prevDialogueIDRef = React.useRef(currentDialogueID);
  React.useEffect(() => {
    if (prevDialogueIDRef.current !== currentDialogueID) {
      console.log('🔄 [对话切换] 清空所有状态，从', prevDialogueIDRef.current, '切换到', currentDialogueID);
      setHandledProposals(new Set());
      setGeneratedReport(null);
      setIsGeneratingReport(false);
      setReportCompleted(false);
      prevDialogueIDRef.current = currentDialogueID;
    }
  }, [currentDialogueID]);

  // ⭐ 自动滚动到底部
  React.useEffect(() => {
    // 延迟滚动，确保 DOM 已更新
    const timer = setTimeout(() => {
      const scrollContainer = document.getElementById('ai-messages-container');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages.length, isSending, isGeneratingReport, generatedReport]);

  // ⭐ 当有新的用户消息到来时，清除已生成的报告卡片（避免重复显示）
  const prevMessagesLengthRef = React.useRef(messages.length);
  React.useEffect(() => {
    console.log('📨 [useEffect-消息变化] 触发，消息数量:', messages.length, '上次:', prevMessagesLengthRef.current);
    // ⭐ 检查是否有新消息且消息数量增加
    if (messages.length > prevMessagesLengthRef.current) {
      // 检查最新的消息是否是用户发送的
      const lastMessage = messages[messages.length - 1];
      console.log('  最新消息:', {
        role: lastMessage?.role,
        contentPreview: lastMessage?.content?.substring(0, 30)
      });
      if (lastMessage && lastMessage.role === 'user') {
        // ⭐ 用户发送了新消息，立即清除所有报告相关状态（无论是否有报告）
        console.log('🧹🧹🧹 [useEffect-清除报告状态] 检测到新的用户消息，清除所有报告相关状态');
        console.log('  当前报告状态:', {
          generatedReport: !!generatedReport,
          isGeneratingReport,
          reportCompleted
        });
        setGeneratedReport(null);
        setIsGeneratingReport(false);
        setReportCompleted(false);
        console.log('  ✅ useEffect 清理完成');
      }
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, generatedReport, isGeneratingReport, reportCompleted]);

  // 显示骨架屏：加载对话详情时
  if (isLoadingDetail) {
    return <MessagesLoadingSkeleton />;
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <svg className="w-20 h-20 text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-gray-400">
          开始新的对话吧！
        </p>
      </div>
    );
  }

  // ⭐ 接受方案的处理函数
  const handleAcceptProposal = async (index: number) => {
    console.log('✅ [接受方案] 用户点击接受按钮，消息索引:', index);
    
    // 标记为已处理
    setHandledProposals(prev => new Set(prev).add(index));
    
    // ⭐ 报告将插入在当前 proposal 消息之后
    const reportInsertPosition = index;
    
    // ⭐ 先设置插入位置，开始生成报告
    console.log('📊 [设置报告状态] 开始生成报告...');
    setGeneratedReport({
      name: '',
      html: '',
      insertAfterIndex: reportInsertPosition
    });
    setIsGeneratingReport(true);
    setReportCompleted(false);
    console.log('  状态已更新: isGeneratingReport=true, reportCompleted=false');
    
    // ⭐ 直接生成报告，不发送额外消息
    try {
      const htmlContent = await generateReport();
      if (htmlContent) {
        console.log('📊 [报告生成成功] HTML长度:', htmlContent.length);
        setGeneratedReport({
          name: currentTitle || '车型对比分析报告',
          html: htmlContent,
          insertAfterIndex: reportInsertPosition
        });
        setReportCompleted(true);  // ⭐ 标记报告已完成
        console.log('  状态已更新: reportCompleted=true');
      }
    } catch (error) {
      console.error('❌ [报告生成失败]:', error);
      setGeneratedReport(null);  // 失败时清空
      setReportCompleted(false);
    } finally {
      setIsGeneratingReport(false);
      console.log('📊 [报告生成结束] isGeneratingReport=false');
    }
  };

  // ⭐ 拒绝方案的处理函数
  const handleRejectProposal = (index: number) => {
    // 只标记为已处理，不发送消息
    setHandledProposals(prev => new Set(prev).add(index));
  };

  // ⭐ 不再需要手动"生成报告"按钮，Accept 后自动生成

  return (
    <div className="flex flex-col min-h-full">
      {messages.map((msg, index) => {
        // ⭐ 如果是 proposal 类型且未被处理，显示按钮
        const showProposalButtons = msg.messageType === 'proposal' && !handledProposals.has(index);
        
        return (
          <React.Fragment key={index}>
            <MessageBubble 
              role={msg.role} 
              content={msg.content} 
              messageType={msg.messageType}
              onAccept={showProposalButtons ? () => handleAcceptProposal(index) : undefined}
              onReject={showProposalButtons ? () => handleRejectProposal(index) : undefined}
            />
            
            {/* ⭐ 在指定消息后插入报告生成状态 */}
            {generatedReport && 
             isGeneratingReport && 
             !reportCompleted && 
             generatedReport.insertAfterIndex === index && 
             !generatedReport.html && 
             typeof generatedReport.insertAfterIndex === 'number' && (
              <div className="flex justify-start mb-6 animate-fadeIn">
                <div className="max-w-[70%] bg-[#fefdff] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] px-[25px] py-[18px] shadow-sm border border-[#ddd6eb]">
                  <div className="flex items-center gap-3">
                    <p className="font-['Bricolage_Grotesque:Medium',_sans-serif] text-[16px] text-[#272727] leading-[1.8]">
                      好的，正在为您生成报告
                    </p>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#6062ef] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[#6062ef] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[#6062ef] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* ⭐ 在指定消息后插入报告卡片 */}
            {generatedReport && generatedReport.html && generatedReport.insertAfterIndex === index && (
              <ReportCard reportName={generatedReport.name} htmlContent={generatedReport.html} />
            )}
          </React.Fragment>
        );
      })}
      
      {isSending && <LoadingBubble />}
      
      {/* ⭐ 底部占位空间 - 确保内容不会被输入框遮挡 */}
      <div className="h-[150px] flex-shrink-0" />
    </div>
  );
}

// ========== 输入框和发送功能 ==========

// ⭐ 动态输入框处理
function DynamicInputHandler(clearReportStatesRef: React.MutableRefObject<(() => void) | null>) {
  const { sendMessage, isSending, currentTags } = useAIAnalysis();
  const [inputValue, setInputValue] = useState('');

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;
    
    const content = inputValue;
    console.log('📤 [发送消息] 准备发送:', {
      contentPreview: content.substring(0, 30),
      tagsCount: currentTags.length,
      时间: new Date().toLocaleTimeString()
    });
    setInputValue(''); // 立即清空输入框
    
    // ⭐ 发送消息前，立即调用清理函数
    if (clearReportStatesRef.current) {
      console.log('🧹🧹🧹 [发送前清理] 调用清理函数');
      clearReportStatesRef.current();
      console.log('  清理函数调用完成');
    } else {
      console.warn('⚠️ [发送前清理] clearReportStatesRef.current 为 null!');
    }
    
    // ⭐ 传递当前的 tags 给 sendMessage
    console.log('📤 [发送消息] 开始调用 sendMessage');
    await sendMessage(content, currentTags);
    console.log('📤 [发送消息] sendMessage 完成');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSending) {
      handleSend();
    }
  };

  return {
    inputValue,
    setInputValue,
    handleSend,
    handleKeyPress,
    isSending,
    currentTags  // ⭐ 导出 currentTags 供 InputBox 使用
  };
}

// ========== 生成报告功能 ==========

// ⭐ 生成报告处理
async function handleGenerateReport(generateReport: () => Promise<string | null>) {
  const htmlContent = await generateReport();
  
  if (htmlContent) {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      alert('✅ 报告已在新窗口打开\n\n提示：您可以使用浏览器的打印功能保存为PDF');
    } else {
      alert('❌ 无法打开新窗口\n\n请允许浏览器弹出窗口权限');
    }
  }
}

function Group2Left() {
  return (
    <div className="absolute contents inset-[4.12%_24.98%_91.76%_6.96%]">
      <GroupLeft />
      <div className="absolute flex flex-col font-['Reddit_Sans:Bold',_sans-serif] font-bold inset-[4.66%_24.98%_92.13%_16.85%] justify-center leading-[0] text-[#6062ef] text-[30px] text-center tracking-[0.6px]">
        <p className="leading-[normal]">Quality</p>
      </div>
    </div>
  );
}

function Group3Left() {
  return (
    <div className="absolute contents inset-[4.12%_24.98%_91.76%_6.96%]">
      <Group2Left />
    </div>
  );
}

function Vector1Left() {
  return (
    <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
      <div className="absolute inset-[-4.29%_-2.86%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 16">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p3651580} fillRule="evenodd" id="Vector-22" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
            <path d={svgPaths.p3dfca380} fill="var(--stroke-0, black)" id="Vector-23" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineVideoPlus() {
  return (
    <div className="absolute inset-[48.79%_71.43%_48.7%_18.32%]" data-name="Xnix/Line/Video_plus">
      <Vector1Left />
    </div>
  );
}

function Group4Left() {
  return (
    <div className="absolute contents inset-[48.79%_71.43%_48.7%_18.32%]">
      <XnixLineVideoPlus />
    </div>
  );
}

function Vector2Left() {
  return (
    <div className="absolute contents left-[2.58px] top-[3px]" data-name="Vector">
      <div className="absolute inset-[27.91%_31.25%_18.77%_27.43%]" data-name="Vector-15">
        <div className="absolute inset-[-3.63%_-4.68%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
            <path clipRule="evenodd" d={svgPaths.p18b12500} fillRule="evenodd" id="Vector-15" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_12.5%_23.78%_8.33%]" data-name="Vector-16">
        <div className="absolute inset-[-3.49%_-2.44%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 19">
            <path d={svgPaths.p129a0700} fill="var(--stroke-0, black)" id="Vector-16" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[3px] left-[15px] top-[3px] w-0">
        <div className="absolute inset-[-20%_-0.6px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.6 3.6V2.1V0.6" id="Vector 619" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function XnixLineLightbulbOn() {
  return (
    <div className="absolute inset-[29.81%_71.06%_67.41%_17.58%]" data-name="Xnix/Line/Lightbulb_on">
      <Vector2Left />
    </div>
  );
}

function Component5() {
  return (
    <div className="absolute h-[1117px] left-0 top-0 w-[273px]" data-name="Component 5">
      <div className="absolute bottom-[-0.18%] left-0 right-0 top-0" data-name="BG01">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 273 1119">
          <g id="BG01">
            <path d="M0 0H273V1119H0V0Z" fill="url(#paint0_linear_33_393)" fillOpacity="0.7" />
            <path d="M0 0H273V1119H0V0Z" fill="var(--fill-1, #F4F5FF)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_33_393" x1="130.026" x2="-10" y1="-1.11657" y2="1089">
              <stop stopColor="#F6FCFF" />
              <stop offset="1" stopColor="#F7FAFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* ⭐ 移除：笔记本图标 FrameLeft */}
      <Group1Left />
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold inset-[12.98%_43.96%_84.87%_32.97%] justify-center leading-[0] not-italic text-[20px] text-black text-nowrap">
        <DynamicUserName />
      </div>
      {/* ⭐ 保留"历史分析"标题 */}
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[65.17%_65.93%_33.21%_12.09%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">历史分析</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[23.55%_66.3%_74.84%_11.72%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">全部工具</p>
      </div>
      <Group3Left />
      
      {/* ⭐ 动态对话列表（替换静态对话项） */}
      <DynamicDialogueList />
      <div className="absolute inset-[61.23%_6.59%_38.77%_7.69%]">
        <div className="absolute bottom-[-1px] left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 2">
            <path d="M0 1H234" id="Vector 100" stroke="var(--stroke-0, #DBD3ED)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[19.96%_6.59%_80.04%_6.96%]">
        <div className="absolute bottom-[-1px] left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 236 2">
            <path d="M0 1H236" id="Vector 106" stroke="var(--stroke-0, #DBD3ED)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute aspect-[200/200] left-[19.05%] right-[72.89%] top-[408px]" data-name="收藏 未收藏 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[36.44%_45.05%_61.41%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">收藏夹</p>
      </div>
      <div className="absolute aspect-[200/200] left-[19.41%] right-[73.26%] top-[479px]" data-name="项目-2 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[42.7%_37.73%_55.15%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">我的项目</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[48.97%_37.73%_48.88%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">线上评审</p>
      </div>
      <div className="absolute aspect-[200/200] left-[19.05%] right-[72.53%] top-[618px]" data-name="AI-04 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAi041} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[55.24%_45.42%_42.61%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">AI分析</p>
      </div>
      {/* ⭐ 移除：ZU的遮阳板对标 文字和SUV图片 */}
      <div className="absolute inset-[12.54%_71.8%_84.39%_15.75%]" data-name="Intersect">
        <img alt="" className="block max-w-none size-full" height="34.314" src={imgIntersect} width="34" />
      </div>
      <div className="absolute inset-[13.97%_17.22%_85.59%_77.66%]">
        <div className="absolute inset-[-20%_-7.14%_-24.58%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
            <path d={svgPaths.p10dcc480} id="Vector 118" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.25" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[5.55%_8.41%_93.11%_88.64%] items-center justify-center">
        <div className="flex-none h-[8.05px] rotate-[90deg] w-[14.95px]">
          <div className="relative size-full">
            <div className="absolute inset-[-12.42%_-6.69%_-18.26%_-6.69%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 11">
                <path d="M1 1L8.47485 9.05L15.95 1" id="Vector 119" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeOpacity="0.95" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group4Left />
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[30.17%_37.73%_67.68%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
      <XnixLineLightbulbOn />
      <div className="absolute left-[43px] size-[35px] top-[140px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
          <circle cx="17.5" cy="17.5" fill="var(--fill-0, #787EFF)" id="Ellipse 61" r="17.5" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[17px] justify-center leading-[0] left-[60.5px] not-italic text-[18px] text-center text-white top-[156.5px] translate-x-[-50%] translate-y-[-50%] w-[19px]">
        <DynamicUserInitial />
      </div>
    </div>
  );
}

// AI分析亮条组件
function AiHighlight() {
  return (
    <div className="absolute h-[55px] left-[19px] top-[601px] w-[243px]" data-name="AI分析组件亮条">
      <div className="absolute bottom-[3.38%] left-0 right-[4.53%] top-0">
        <div className="absolute bottom-[-3.76%] left-[-0.43%] right-[-0.43%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 56">
            <g filter="url(#filter0_d_45_1183)" id="Group 1437252927">
              <path d={svgPathsLeftSidebar.pf796d80} fill="url(#paint0_linear_45_1183)" id="Rectangle 33" stroke="var(--stroke-0, #C8A6FF)" strokeWidth="0.2" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.1429" id="filter0_d_45_1183" width="234" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_45_1183" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_45_1183" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_45_1183" x1="239.5" x2="-22.5" y1="-26" y2="76.5">
                <stop stopColor="white" />
                <stop offset="0.485577" stopColor="#E4E4FF" />
                <stop offset="1" stopColor="#D1D2FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[28.81%] not-italic right-0 text-[#6062ef] text-[20px] top-0">
        <p className="leading-[normal]">AI分析</p>
      </div>
      <div className="absolute contents left-[13.58%] right-[76.95%] top-[17px]" data-name="Mask group">
        <div className="absolute aspect-[200/200] bg-[#6062ef] left-[13.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] right-[76.95%] top-[17px]" data-name="AI-04 2" style={{ maskImage: `url('${imgAi042}')`, maskSize: '23px 23px' }} />
      </div>
    </div>
  );
}

function LeftSidebarComponent() {
  return (
    <div className="fixed h-[1117px] left-0 top-0 w-[273px] z-40" data-name="左侧组件">
      <Component5 />
      <AiHighlight />
    </div>
  );
}

// 顶部搜索栏组件 - 与灵感搜集页面保持一致
function TopSearchComponent() {
  return (
    <>
      <SearchBar placeholder="搜索AI分析内容..." from="ai-analysis" />
      <LanguageSelector />
    </>
  );
}

// ⭐ 右侧AI分析内容 - "接受此方案"按钮（连接生成报告功能）
function AiAcceptButton() {
  const { generateReport } = useAIAnalysis();

  const handleClick = async () => {
    await handleGenerateReport(generateReport);
  };

  return (
    <div
      onClick={handleClick}
      className="absolute bg-[#fbfbfb] box-border content-stretch flex gap-[10px] items-center justify-center px-[30px] py-[20px] right-[27px] rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px] top-[245px] w-[181px] cursor-pointer hover:bg-[#f0f0f0] hover:scale-105 transition-all duration-200 active:scale-95"
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px]" />
      <p className="font-['Bricolage_Grotesque:Medium',_'Noto_Sans_JP:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#272727] text-[16px] tracking-[-0.128px] w-[116px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        生成报告
      </p>
    </div>
  );
}

// 文档图标和报告卡片
function VectorDoc() {
  return (
    <div className="absolute inset-[16.67%_20.83%_20.83%_20.83%]" data-name="Vector">
      <div className="absolute inset-[-2.5%_-2.68%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPathsAi.p1be6ae00} fillRule="evenodd" id="Vector-14" stroke="var(--stroke-0, #6062EF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPathsAi.p329bb500} fill="var(--stroke-0, #6062EF)" id="Vector-15" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineNotesLinesAlt() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Xnix/Line/Notes-lines-alt">
      <VectorDoc />
    </div>
  );
}

function ReportInfo() {
  return (
    <div className="content-stretch flex flex-col h-[38px] items-start leading-[normal] relative shrink-0 w-[195px]">
      <p className="font-['Bricolage_Grotesque:Medium',_'Noto_Sans_SC:Medium',_'Noto_Sans_JP:Medium',_sans-serif] font-medium h-[19px] relative shrink-0 text-[#272727] text-[18px] tracking-[-0.144px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        SU调研报告
      </p>
      <p className="capitalize font-['Bricolage_Grotesque:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-[rgba(0,0,0,0.23)] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        Created at: 12:34
      </p>
    </div>
  );
}

function ReportFrame() {
  return (
    <div className="content-stretch flex gap-[10px] h-[53px] items-center relative shrink-0">
      <XnixLineNotesLinesAlt />
      <ReportInfo />
    </div>
  );
}

function DownloadIcon() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Group 1437252864">
          <circle cx="24" cy="24" fill="var(--fill-0, #272727)" fillOpacity="0.1" id="Ellipse 55" r="24" />
          <g id="Xnix/Line/Download">
            <path d={svgPathsAi.p607b00} fill="var(--stroke-0, black)" id="Vector" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// AI对话气泡背景
function ChatBubbleBackground() {
  return (
    <div className="bg-[#fefdff] h-[172px] relative rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px] w-[695px]">
      <div aria-hidden="true" className="absolute border border-[#ddd6eb] border-solid inset-0 pointer-events-none rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px]" />
    </div>
  );
}

function ChatBubbleContent() {
  return (
    <>
      <div className="absolute flex h-[172px] items-center justify-center left-0 top-0 w-[695px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <ChatBubbleBackground />
        </div>
      </div>
      <p className="absolute font-['Bricolage_Grotesque:Medium',_'Noto_Sans_JP:Medium',_'Noto_Sans_SC:Medium',_'Noto_Sans_KR:Medium',_sans-serif] font-medium h-[137px] leading-[1.8] left-[25px] text-[#272727] text-[16px] top-[10px] w-[641px] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <span>
          接下来将您进行以下调研：
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </span>
        <span className="text-[rgba(39,39,39,0.67)]">
          {`1.  整理：寻找SUV相关竞品，并提取关键特征元素`}
          <br aria-hidden="true" />
          2. 识别：为用户概述并生成相关竞品分析报告
          <br aria-hidden="true" />
          3. 数据整理：按项目对标的形式产出报告，并精简文本
        </span>
      </p>
    </>
  );
}

// Accept/Reject按钮区域
function AcceptRejectButtons() {
  return (
    <>
      <div className="absolute bg-[rgba(101,220,105,0.3)] h-[29px] left-[581px] rounded-[20px] top-[189px] w-[114px]">
        <div aria-hidden="true" className="absolute border border-[#ddd6eb] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="absolute bg-[rgba(253,253,253,0.3)] h-[29px] left-[449px] rounded-[20px] top-[189px] w-[114px]">
        <div aria-hidden="true" className="absolute border border-[#ddd6eb] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="absolute capitalize flex flex-col font-['Bricolage_Grotesque:Bold',_sans-serif] font-bold h-[14px] justify-center leading-[0] left-[638.5px] opacity-75 text-[#272727] text-[16px] text-center top-[203px] translate-x-[-50%] translate-y-[-50%] w-[55px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[normal]">accept</p>
      </div>
      <div className="absolute capitalize flex flex-col font-['Bricolage_Grotesque:Bold',_sans-serif] font-bold h-[14px] justify-center leading-[0] left-[506px] opacity-75 text-[#272727] text-[16px] text-center top-[203px] translate-x-[-50%] translate-y-[-50%] w-[50px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[normal]">reject</p>
      </div>
      <ChatBubbleContent />
    </>
  );
}

// 下方的回复气泡
function ReplyBubble() {
  return (
    <div className="absolute bg-[#fefdff] box-border content-stretch flex gap-[10px] items-center left-0 px-[25px] py-[15px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] top-[339px] w-[693px]">
      <div aria-hidden="true" className="absolute border border-[#ddd6eb] border-solid inset-0 pointer-events-none rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px]" />
      <p className="font-['Bricolage_Grotesque:Medium',_'Noto_Sans_JP:Medium',_'Noto_Sans_SC:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#272727] text-[16px] text-nowrap tracking-[-0.128px] whitespace-pre" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        SU相关的调研报告已生成完毕，单击即可预览，也可直接下载。
      </p>
    </div>
  );
}

// 对话内容组件（旧的静态版本，已废弃）
function AiDialogContent() {
  return (
    <div className="relative w-full min-h-full px-[81px] pt-[51px] pb-[40px]" data-name="对话">
      <div className="relative" style={{ minHeight: '600px' }}>
        <AiAcceptButton />
        {/* <ReportCard /> */}
        <AcceptRejectButtons />
        <ReplyBubble />
      </div>
    </div>
  );
}

// 新对话按钮
function VectorAdd() {
  return (
    <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 20 20" fill="none">
      <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function XnixLineAdd() {
  return <VectorAdd />;
}

function NewChatButtonContent() {
  return (
    <div className="flex gap-[8px] items-center">
      <XnixLineAdd />
      <p className="font-['Bricolage_Grotesque:Medium',_'Noto_Sans_JP:Medium',_'Noto_Sans_KR:Medium',_'Noto_Sans_SC:Medium',_sans-serif] font-medium text-[20px] text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        新对话
      </p>
    </div>
  );
}

// ⭐ 新对话按钮（连接startNewDialogue）
function NewChatButton() {
  const { startNewDialogue } = useAIAnalysis();

  return (
    <div
      onClick={startNewDialogue}
      className="fixed bg-[#6062ef] box-border content-stretch flex flex-col gap-[10px] items-center justify-center pl-[16px] pr-[24px] py-[10px] right-[54px] rounded-[20px] top-[156px] translate-y-[-50%] z-20 cursor-pointer hover:bg-[#5053d5] transition-colors duration-200"
    >
      <NewChatButtonContent />
    </div>
  );
}

// 底部输入框区域
function InputCursor() {
  return (
    <div className="absolute bottom-[53px] h-[18px] left-[446.06px] w-[17px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 18">
        <g id="Group 1437252881">
          <g id="Ellipse 56">
            <ellipse cx="8.33902" cy="9" fill="var(--fill-0, #F7F7F7)" rx="8.33902" ry="9" />
            <path d={svgPathsAi.p31032480} stroke="var(--stroke-0, black)" strokeOpacity="0.5" strokeWidth="0.5" />
          </g>
          <g id="Group 12">
            <path d={svgPathsAi.p1c357400} id="Vector 104" stroke="var(--stroke-0, #494949)" strokeLinecap="round" strokeOpacity="0.75" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CloseIcon2() {
  return (
    <div className="relative size-[11.506px]">
      <div className="absolute inset-[-4.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
          <g id="Group 1437252882">
            <g id="Group 12">
              <path d={svgPathsAi.p1f414d00} id="Vector 104" stroke="var(--stroke-0, #494949)" strokeLinecap="round" strokeOpacity="0.75" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Tag3() {
  return (
    <div className="absolute bg-[rgba(242,242,242,0.5)] bottom-[66px] h-[27px] left-[333.02px] rounded-[81px] w-[97.289px]">
      <div className="box-border content-stretch flex h-[27px] items-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[97.289px]">
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] text-center w-[71.345px]">
          <p className="leading-[normal]">收藏夹3</p>
        </div>
        <div className="flex h-[calc(1px*((var(--transform-inner-width)*0.7335295081138611)+(var(--transform-inner-height)*0.7335295081138611)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.6796575784683228)+(var(--transform-inner-width)*0.6796575784683228)))]" style={{ "--transform-inner-width": "11.5", "--transform-inner-height": "11.5" } as React.CSSProperties}>
          <div className="flex-none rotate-[47.183deg] skew-x-[4.354deg]">
            <CloseIcon2 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[81px]" />
    </div>
  );
}

function CloseIcon3() {
  return (
    <div className="relative size-[11.506px]">
      <div className="absolute inset-[-4.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
          <g id="Group 1437252883">
            <g id="Group 12">
              <path d={svgPathsAi.p1f414d00} id="Vector 104" stroke="var(--stroke-0, #494949)" strokeLinecap="round" strokeOpacity="0.75" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Tag2() {
  return (
    <div className="absolute bg-[rgba(242,242,242,0.5)] bottom-[66px] h-[27px] left-[219.98px] rounded-[81px] w-[97.289px]">
      <div className="box-border content-stretch flex h-[27px] items-center overflow-clip px-[5px] py-0 relative rounded-[inherit] w-[97.289px]">
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal h-[26px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] text-center w-[71.345px]">
          <p className="leading-[normal]">我的项目</p>
        </div>
        <div className="flex h-[calc(1px*((var(--transform-inner-width)*0.7335295081138611)+(var(--transform-inner-height)*0.7335295081138611)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.6796575784683228)+(var(--transform-inner-width)*0.6796575784683228)))]" style={{ "--transform-inner-width": "11.5", "--transform-inner-height": "11.5" } as React.CSSProperties}>
          <div className="flex-none rotate-[47.183deg] skew-x-[4.354deg]">
            <CloseIcon3 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[81px]" />
    </div>
  );
}

function CloseIcon4() {
  return (
    <div className="relative size-[11.506px]">
      <div className="absolute inset-[-4.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
          <g id="Group 1437252884">
            <g id="Group 12">
              <path d={svgPathsAi.p1f414d00} id="Vector 104" stroke="var(--stroke-0, #494949)" strokeLinecap="round" strokeOpacity="0.75" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Tag1() {
  return (
    <div className="absolute bg-[rgba(242,242,242,0.5)] bottom-[66px] h-[27px] left-[106.94px] rounded-[81px] w-[97.289px]">
      <div className="box-border content-stretch flex h-[27px] items-center overflow-clip px-[5px] py-0 relative rounded-[inherit] w-[97.289px]">
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[26px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] text-center w-[71.345px]">
          <p className="leading-[normal]">收藏夹1</p>
        </div>
        <div className="flex h-[calc(1px*((var(--transform-inner-width)*0.7335295081138611)+(var(--transform-inner-height)*0.7335295081138611)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.6796575784683228)+(var(--transform-inner-width)*0.6796575784683228)))]" style={{ "--transform-inner-width": "11.5", "--transform-inner-height": "11.5" } as React.CSSProperties}>
          <div className="flex-none rotate-[47.183deg] skew-x-[4.354deg]">
            <CloseIcon4 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[81px]" />
    </div>
  );
}

function SendButtonCircle() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-0 top-0">
      <div className="bg-[#6062ef] rounded-[58px] shrink-0 size-[52px]" />
    </div>
  );
}

function SendButtonWrapper() {
  return (
    <div className="absolute contents left-0 top-0">
      <SendButtonCircle />
    </div>
  );
}

function VectorSend() {
  return (
    <div className="h-[22.547px] relative shrink-0 w-[20.995px]" data-name="Vector">
      <div className="absolute inset-[-3.33%_-3.57%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 25">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPathsAi.p1aef780} fillRule="evenodd" id="Vector-26" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineSend() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[6px] relative" data-name="Xnix/Line/Send_2">
      <VectorSend />
    </div>
  );
}

function SendIconRotated() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center ml-0 mt-0 relative w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "36.984375", "--transform-inner-height": "34.53125" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <XnixLineSend />
        </div>
      </div>
    </div>
  );
}

function SendButton() {
  return (
    <div className="absolute bottom-[58px] flex items-center justify-center right-[121px] size-[52px]">
      <SendButtonWrapper />
      <SendIconRotated />
    </div>
  );
}

// 底部输入框组件
// ⭐ 动态标签组件
interface DynamicTagProps {
  folderName: string;
  folderID: string;
  index: number;
  onRemove: () => void;
}

function DynamicTag({ folderName, index, onRemove }: DynamicTagProps) {
  const leftPositions = [106.94, 219.98, 333.02]; // 三个标签的left位置
  const left = leftPositions[index] || leftPositions[leftPositions.length - 1] + (index - 2) * 113;
  
  return (
    <div 
      className="absolute bg-[rgba(242,242,242,0.5)] bottom-[66px] h-[27px] rounded-[81px] transition-all duration-200 z-20"
      style={{ left: `${left}px`, width: '97.289px' }}
    >
      <div className="box-border content-stretch flex h-[27px] items-center overflow-clip px-[5px] py-0 relative rounded-[inherit] w-full z-20">
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[26px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] text-center flex-1 pointer-events-none">
          <p className="leading-[normal] truncate">{folderName}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer hover:opacity-70 transition-opacity relative z-30"
          type="button"
        >
          <svg className="w-[10px] h-[10px] pointer-events-none" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ⭐ InputBox组件接收props
interface InputBoxProps {
  inputHandler: ReturnType<typeof DynamicInputHandler>;
}

function InputBox({ inputHandler }: InputBoxProps) {
  const { inputValue, setInputValue, handleSend, handleKeyPress, isSending, currentTags } = inputHandler;
  
  // ⭐ 使用 Context 的 tags 和加载状态
  const { setCurrentTags, isLoadingDetail } = useAIAnalysis();
  
  // ⭐ 状态管理：已选择的收藏夹（本地UI状态）
  const [selectedFolders, setSelectedFolders] = React.useState<Array<{ folderID: string; folderName: string }>>([]);
  const [showFolderDropdown, setShowFolderDropdown] = React.useState(false);
  
  // ⭐ 获取所有收藏夹
  const { folders } = useFolderCache();
  
  // ⭐ 监听 Context 的 currentTags 变化，同步到 selectedFolders
  React.useEffect(() => {
    console.log('🏷️🏷️🏷️ [Tags-useEffect] 触发同步');
    console.log('  currentTags:', currentTags);
    
    if (currentTags && currentTags.length > 0) {
      // ⭐ 直接用 tagName 创建 folder 对象，不需要匹配真实收藏夹
      // 这样即使收藏夹被删除了，tags 仍然能显示
      const folderObjects = currentTags.map(tagName => ({
        folderID: tagName,  // 使用 tagName 作为 ID
        folderName: tagName
      }));
      
      setSelectedFolders(folderObjects);
      console.log('  ✅ 同步完成，selectedFolders:', folderObjects);
    } else {
      setSelectedFolders([]);
      console.log('  ✅ currentTags 为空，清空 selectedFolders');
    }
  }, [currentTags]);
  
  // ⭐ 移除标签（同步到 Context）
  const handleRemoveTag = (folderID: string) => {
    const newFolders = selectedFolders.filter(f => f.folderID !== folderID);
    setSelectedFolders(newFolders);
    
    // ⭐ 同步到 Context
    const newTags = newFolders.map(f => f.folderName);
    setCurrentTags(newTags);
    console.log('🏷️ [Tags] 移除标签后同步到 Context:', newTags);
  };
  
  // ⭐ 添加标签（同步到 Context）
  const handleAddFolder = (folder: { folderID: string; folderName: string }) => {
    if (!selectedFolders.find(f => f.folderID === folder.folderID)) {
      const newFolders = [...selectedFolders, folder];
      setSelectedFolders(newFolders);
      
      // ⭐ 同步到 Context
      const newTags = newFolders.map(f => f.folderName);
      setCurrentTags(newTags);
      console.log('🏷️ [Tags] 添加标签后同步到 Context:', newTags);
    }
    setShowFolderDropdown(false);
  };
  
  // ⭐ 计算加号按钮的位置（根据标签数量动态调整）
  const addButtonLeft = selectedFolders.length === 0 ? 106.94 : 106.94 + selectedFolders.length * 113 + 10;
  
  // ⭐ 点击外部关闭下拉列表
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showFolderDropdown) {
        setShowFolderDropdown(false);
      }
    };
    
    if (showFolderDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showFolderDropdown]);

  return (
    <div className="relative h-[240px] w-full" data-name="对话框">
      {/* 输入框背景 */}
      <div className="absolute bg-white bottom-[40px] h-[160px] left-[81px] right-[108px] rounded-[18px]">
        <div aria-hidden="true" className="absolute border border-[#6062ef] border-solid inset-0 pointer-events-none rounded-[18px] shadow-[0px_14px_44px_0px_rgba(0,0,0,0.1)]" />
      </div>
      
      {/* ⭐ 真实输入框 - 改用 textarea（允许发送时继续输入） */}
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !isSending) {
            e.preventDefault();
            handleKeyPress(e as any);
          }
        }}
        placeholder="请输入您的问题，例如：请帮我分析问界M7的外观..."
        className="absolute bottom-[60px] left-[108px] right-[250px] h-[120px] bg-transparent border-none outline-none font-['Bricolage_Grotesque:Medium',_sans-serif] text-[#555] text-[22px] tracking-[-0.176px] font-medium resize-none z-10 placeholder:text-[#b0b0b0] placeholder:opacity-50 pt-[10px] pl-0"
        style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
      />
      
      {/* ⭐ 动态标签区域 */}
      {isLoadingDetail ? (
        // 🎨 标签骨架屏（和真实标签位置一致）
        <>
          <div 
            className="absolute bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded-[81px] animate-pulse"
            style={{
              left: '106.94px',
              bottom: '66px',
              width: '97.289px',
              height: '27px'
            }}
          />
          <div 
            className="absolute bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded-[81px] animate-pulse"
            style={{
              left: '219.98px',
              bottom: '66px',
              width: '97.289px',
              height: '27px'
            }}
          />
        </>
      ) : (
        selectedFolders.map((folder, index) => (
          <DynamicTag
            key={folder.folderID}
            folderID={folder.folderID}
            folderName={folder.folderName}
            index={index}
            onRemove={() => handleRemoveTag(folder.folderID)}
          />
        ))
      )}
      
      {/* ⭐ 附加文件按钮（圆形加号按钮） - 动态位置 */}
      {!isLoadingDetail && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setShowFolderDropdown(!showFolderDropdown);
          }}
          className="absolute bottom-[66px] w-[27px] h-[27px] cursor-pointer hover:opacity-80 transition-all duration-200 z-20"
          style={{ left: `${addButtonLeft}px` }}
        >
          <div className="relative size-full rounded-full border border-[rgba(0,0,0,0.15)] flex items-center justify-center bg-white">
            <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}
      
      {/* ⭐ 收藏夹下拉列表 */}
      {showFolderDropdown && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-[100px] bg-white rounded-[12px] shadow-lg border border-[rgba(0,0,0,0.1)] overflow-hidden z-30 animate-dropdown-in"
          style={{ left: `${addButtonLeft}px`, minWidth: '150px', maxWidth: '200px' }}
        >
          <div className="max-h-[200px] overflow-y-auto py-[4px]">
            {folders.length === 0 ? (
              <div className="px-[12px] py-[8px] text-[14px] text-[rgba(0,0,0,0.4)] text-center">
                暂无收藏夹
              </div>
            ) : (
              folders.map((folder) => (
                <div
                  key={folder.folderID}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddFolder({ folderID: folder.folderID, folderName: folder.folderName });
                  }}
                  className="px-[12px] py-[8px] cursor-pointer hover:bg-[rgba(96,98,239,0.08)] transition-colors"
                >
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[rgba(0,0,0,0.8)] truncate">
                    {folder.folderName}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* ⭐ 发送按钮（连接handleSend） */}
      <div
        onClick={!isSending ? handleSend : undefined}
        className={`absolute inset-0 cursor-pointer ${isSending ? 'opacity-50' : ''}`}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <SendButton />
        </div>
      </div>
    </div>
  );
}

export default function Component04FavoritesDetailGbzLayout() {
  // ⭐ 使用AI分析hooks
  const { currentTitle, isLoadingDetail, currentDialogueID, showReportError, setShowReportError } = useAIAnalysis();
  
  // ⭐ 用于存储报告清理函数的 ref
  const clearReportStatesRef = React.useRef<(() => void) | null>(null);
  
  const inputHandler = DynamicInputHandler(clearReportStatesRef);

  // ⭐ 调试：监听标题变化
  React.useEffect(() => {
    console.log('📋 [页面标题] currentTitle 变化:', {
      currentTitle,
      dialogueID: currentDialogueID,
      时间: new Date().toLocaleTimeString()
    });
  }, [currentTitle, currentDialogueID]);

  return (
    <div className="bg-white relative h-screen w-full overflow-hidden" data-name="04-ai 分析-GBZ-layout">
      <BackgroundComponent />
      <LeftSidebarComponent />
      
      {/* 固定顶部区域 */}
      <div className="fixed top-0 left-0 right-0 h-[222px] z-10 bg-white border-b border-gray-200">
        <TopSearchComponent />
        <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_KR:Bold',_sans-serif] font-bold justify-center leading-[0] left-[322px] not-italic text-[35px] text-[rgba(0,0,0,0.95)] text-nowrap top-[156px] translate-y-[-50%]">
          {/* ⭐ 加载中显示骨架屏 */}
          {isLoadingDetail ? (
            <div className="h-[35px] w-[280px] bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded-[8px] animate-pulse"></div>
          ) : (
            <p className="leading-[normal] whitespace-pre" title={`标题: ${currentTitle || '(空)'} | 对话ID: ${currentDialogueID || '(新对话)'}`}>
              {currentTitle || 'AI车型分析助手'}
            </p>
          )}
        </div>
      </div>

      {/* 中间可滚动对话内容区域 */}
      <div id="ai-messages-container" className="absolute left-[290px] right-0 top-[222px] bottom-[210px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 z-[5] px-[81px] py-[51px]" style={{ scrollBehavior: 'smooth' }}>
        <DynamicMessagesList clearReportStatesRef={clearReportStatesRef} />
      </div>

      {/* 固定底部输入框区域 */}
      <div className="fixed bottom-0 left-[290px] right-0 h-[240px] z-10">
        <InputBox inputHandler={inputHandler} />
      </div>

      {/* 固定右下角新对话按钮 */}
      <NewChatButton />

      {/* 🚨 报告生成失败提示弹窗 */}
      {showReportError && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-[9998] animate-in fade-in duration-200"
            onClick={() => setShowReportError(false)}
          />
          
          {/* 错误提示卡片 */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[480px] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-[24px] shadow-[0_24px_80px_rgba(239,68,68,0.2)] p-10">
              {/* 图标和标题 */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">报告生成失败</h3>
                <p className="text-[16px] text-gray-500">当前服务器繁忙，请稍后重试</p>
              </div>

              {/* 提示信息 */}
              <div className="bg-red-50 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[15px] text-red-900 font-medium mb-1">可能的原因</p>
                    <ul className="text-[14px] text-red-800 space-y-1">
                      <li>• 网络连接不稳定</li>
                      <li>• 服务器正在处理大量请求</li>
                      <li>• 对话内容过长导致超时</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 建议 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[15px] text-gray-900 font-medium mb-1">建议操作</p>
                    <ul className="text-[14px] text-gray-700 space-y-1">
                      <li>• 等待 1-2 分钟后重试</li>
                      <li>• 检查网络连接是否正常</li>
                      <li>• 如问题持续，请联系管理员</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 关闭按钮 */}
              <button
                onClick={() => setShowReportError(false)}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl text-[17px] font-semibold hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                知道了
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
