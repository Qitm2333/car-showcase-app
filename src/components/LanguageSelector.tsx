/**
 * 🌐 语言选择器组件
 * 
 * 功能：
 * - 显示当前语言
 * - 支持切换语言（后期可扩展）
 * 
 * 配置说明：
 * - 目前为静态显示，后期可添加点击切换逻辑
 * - 可扩展为下拉菜单选择器
 */

interface LanguageSelectorProps {
  /** 当前语言 */
  currentLanguage?: "简体中文" | "English";
  /** 语言切换回调 */
  onLanguageChange?: (language: string) => void;
}

export default function LanguageSelector({
  currentLanguage = "简体中文",
  onLanguageChange
}: LanguageSelectorProps) {
  
  const handleLanguageClick = () => {
    // TODO: 后期可添加语言切换逻辑
    console.log("🌐 点击切换语言");
    if (onLanguageChange) {
      const newLang = currentLanguage === "简体中文" ? "English" : "简体中文";
      onLanguageChange(newLang);
    }
  };

  return (
    <div className="absolute contents right-[64px] top-[54px]">
      <button 
        onClick={handleLanguageClick}
        className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-normal h-[34px] justify-center leading-[0] not-italic right-[64px] text-[15px] text-[rgba(0,0,0,0.26)] text-right top-[71px] translate-y-[-50%] w-[467px] cursor-pointer hover:opacity-80 transition-opacity"
      >
        <p className="leading-[normal]">
          <span>{currentLanguage === "简体中文" ? "English / " : ""}</span>
          <span className="font-['Inter:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold not-italic text-[#6062ef]">
            {currentLanguage}
          </span>
        </p>
      </button>
    </div>
  );
}

