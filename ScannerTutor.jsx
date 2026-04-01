import React, { useState, useEffect } from 'react';
import { 
  Camera, RefreshCw, CheckCircle2, Move, Smartphone, 
  Utensils, UserPlus, Wallet, Hospital, ChevronLeft,
  Plus, Minus, ShoppingCart, User, Send, Zap, ZapOff, AlertTriangle, X
} from 'lucide-react';

/**
 * ScannerTutor 組件
 * 專為銀髮族設計的掃描模擬系統
 * 包含：場景選擇、姿勢教學、掃描對焦、防詐騙演練、虛擬應用程式操作
 */
const App = () => {
  // 狀態管理
  const [step, setStep] = useState(0); // 0: 選場景, 1: 教學, 2: 掃描中, 3: 成功動效, 4: 虛擬App
  const [scenario, setScenario] = useState(null);
  const [feedback, setFeedback] = useState('請將鏡頭對準下方的黑白方塊');
  const [isStable, setIsStable] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [showScamAlert, setShowScamAlert] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // 定義練習場景
  const scenarios = [
    { 
      id: 'food', 
      name: '餐廳點餐', 
      icon: <Utensils size={32} />, 
      color: 'bg-orange-500',
      description: '現在很多餐廳都要掃碼看菜單，練習在燈光昏暗時操作。',
      isDark: true 
    },
    { 
      id: 'social', 
      name: '加 LINE 好友', 
      icon: <UserPlus size={32} />, 
      color: 'bg-green-600',
      description: '認識新朋友時，掃描對方的行動條碼就能加好友。',
      isDark: false
    },
    { 
      id: 'hospital', 
      name: '醫院報到', 
      icon: <Hospital size={32} />, 
      color: 'bg-blue-600',
      description: '到醫院看診或領藥，掃描單據可快速報到或查資訊。',
      isDark: false
    },
  ];

  // 掃描邏輯模擬
  useEffect(() => {
    if (step === 2) {
      // 檢查光線環境
      if (scenario?.isDark && !isFlashlightOn) {
        setFeedback('這裡太暗了！請點擊右下方按鈕開啟手電筒');
        setIsStable(false);
        return;
      }

      const timer = setTimeout(() => {
        setFeedback('捕捉到代碼！請保持手部穩定不要晃動...');
        setIsStable(true);
        
        setTimeout(() => {
          // 20% 機率觸發詐騙演練
          if (Math.random() > 0.8) {
            setShowScamAlert(true);
          } else {
            setStep(3);
          }
        }, 2000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, isFlashlightOn, scenario]);

  // 選擇場景處理
  const handleSelectScenario = (s) => {
    setScenario(s);
    setStep(1);
    setCartCount(0);
    setIsFlashlightOn(false);
    setShowScamAlert(false);
  };

  // 渲染虛擬應用程式介面
  const renderVirtualApp = () => {
    switch (scenario?.id) {
      case 'food':
        return (
          <div className="flex flex-col h-full bg-white text-slate-900 overflow-hidden">
            <div className="bg-orange-500 p-4 text-white flex items-center gap-2">
              <Utensils size={24} />
              <h3 className="text-xl font-bold">點餐系統</h3>
            </div>
            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-lg text-yellow-800 font-bold">
                💡 掃描成功！請選擇餐點：
              </div>
              <div className="border-2 border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-500 font-bold">食物圖片</div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl">古早味牛肉麵</h4>
                  <p className="text-orange-600 font-black text-lg">$160</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setCartCount(Math.max(0, cartCount-1))} className="p-2 bg-gray-200 rounded-full"><Minus size={20}/></button>
                  <span className="text-2xl font-black w-6 text-center">{cartCount}</span>
                  <button onClick={() => setCartCount(cartCount+1)} className="p-2 bg-gray-200 rounded-full"><Plus size={20}/></button>
                </div>
              </div>
            </div>
            <div className="p-5 border-t bg-gray-50">
              <button onClick={() => setStep(0)} className="w-full bg-orange-600 text-white py-5 rounded-2xl text-2xl font-black shadow-xl">
                確認點餐 (${cartCount * 160})
              </button>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="flex flex-col h-full bg-[#1c1c1c]">
            <div className="bg-[#00c300] p-4 text-white flex justify-between items-center">
              <ChevronLeft size={32} />
              <h3 className="text-2xl font-bold">加入好友</h3>
              <div className="w-8"></div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
              <div className="w-32 h-32 bg-gray-500 rounded-full border-4 border-[#00c300] flex items-center justify-center shadow-2xl">
                <User size={80} className="text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-white tracking-tight">快樂班 - 陳大姐</h4>
                <p className="text-gray-500 text-lg mt-2">LINE ID: sister-chen</p>
              </div>
              <div className="w-full space-y-4">
                <button onClick={() => setStep(0)} className="w-full bg-[#00c300] text-white py-5 rounded-2xl text-2xl font-black shadow-lg">
                  加入好友
                </button>
                <button onClick={() => setStep(0)} className="w-full bg-white/10 text-white py-4 rounded-2xl text-xl font-bold">
                  封鎖
                </button>
              </div>
            </div>
          </div>
        );
      case 'hospital':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-900">
            <div className="bg-blue-800 p-4 text-white flex items-center gap-2 shadow-lg">
              <Hospital size={28} />
              <h3 className="text-xl font-bold">掛號報到系統</h3>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="bg-white border-2 border-blue-100 rounded-[2rem] p-8 shadow-2xl space-y-8">
                <div className="text-center space-y-3">
                  <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-lg font-bold">掃描識別成功</span>
                  <h4 className="text-4xl font-black text-blue-900">03 診間</h4>
                  <p className="text-2xl text-blue-600 font-bold">家庭醫學科 - 王醫師</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                  <p className="text-gray-500 text-lg">您的掛號序號</p>
                  <p className="text-6xl font-black text-slate-800 my-2">12</p>
                  <p className="text-lg text-red-500 font-bold">目前看診：08 號</p>
                </div>
                <button onClick={() => setStep(0)} className="w-full bg-blue-700 text-white py-6 rounded-2xl text-2xl font-black shadow-xl">
                  確認並完成報到
                </button>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4 md:p-10 select-none">
      {/* 標題區域 */}
      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-4xl font-black text-yellow-400 drop-shadow-md">手機掃描大師</h1>
        <p className="text-gray-400 mt-2 text-lg">資深講師專業推薦：簡單、安全、好上手</p>
      </div>

      {/* 手機殼模擬容器 */}
      <div className="relative w-full max-w-sm aspect-[9/19] bg-black rounded-[4rem] border-[12px] border-gray-800 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] ring-8 ring-gray-700/30">
        
        {/* Step 0: 首頁選單 */}
        {step === 0 && (
          <div className="flex flex-col h-full p-8">
            <h2 className="text-2xl font-bold my-6 text-center text-white">您想練習哪種情境？</h2>
            <div className="space-y-4 overflow-y-auto pr-1">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectScenario(s)}
                  className={`${s.color} flex flex-col p-6 rounded-[2rem] shadow-lg transition-transform active:scale-95 text-left w-full border-b-4 border-black/20`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-white/30 p-3 rounded-2xl">{s.icon}</div>
                    <span className="text-2xl font-black">{s.name}</span>
                  </div>
                  <p className="text-white/90 text-md leading-snug font-medium">{s.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-auto pt-4 text-gray-500 text-sm text-center italic">
              提示：點擊上方彩色按鈕開始
            </div>
          </div>
        )}

        {/* Step 1: 教學準備 */}
        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-10 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <Smartphone size={130} className="text-blue-400" />
              <div className="absolute -right-6 -top-6 bg-yellow-500 rounded-full w-14 h-14 flex items-center justify-center text-black font-black text-2xl shadow-xl border-4 border-black">1</div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white underline decoration-yellow-500 underline-offset-8">練習：{scenario?.name}</h2>
              <p className="text-xl text-gray-200 leading-relaxed font-bold">
                請雙手拿穩手機，<br/>
                距離條碼約 <span className="text-yellow-400 text-3xl">一個手掌</span> 寬。<br/>
                不要急，慢慢對準。
              </p>
            </div>
            <button 
              onClick={() => setStep(2)} 
              className="w-full bg-yellow-500 text-black font-black py-6 rounded-3xl text-2xl shadow-2xl active:scale-95 transition-transform"
            >
              啟動相機
            </button>
          </div>
        )}

        {/* Step 2: 掃描中 */}
        {step === 2 && (
          <div className={`relative h-full w-full transition-colors duration-1000 ${scenario?.isDark && !isFlashlightOn ? 'bg-black' : 'bg-slate-800'}`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* 掃描框區域 */}
              <div className={`w-72 h-72 border-[6px] rounded-[3rem] flex items-center justify-center transition-all duration-500 ${isStable ? 'border-green-500 scale-105 shadow-[0_0_50px_rgba(34,197,94,0.6)]' : 'border-white border-dashed opacity-60'}`}>
                <div className={`w-56 h-56 bg-white/5 flex flex-wrap p-4 ${scenario?.isDark && !isFlashlightOn ? 'opacity-0' : 'opacity-100'}`}>
                  {/* 模擬的 QR Code 圖樣 */}
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`w-1/4 h-1/4 ${Math.random() > 0.5 ? 'bg-white/40' : ''}`} />
                  ))}
                </div>
                {!isStable && <Move size={60} className="absolute text-white/50 animate-pulse" />}
              </div>
              
              {/* 動態指引文字 */}
              <div className="mt-16 bg-black/80 px-8 py-6 rounded-3xl mx-6 border-2 border-white/20 text-center shadow-2xl">
                <p className={`text-2xl font-black leading-tight ${isStable ? 'text-green-400' : 'text-white'}`}>
                  {feedback}
                </p>
              </div>

              {/* 功能按鈕：手電筒 */}
              <button 
                onClick={() => setIsFlashlightOn(!isFlashlightOn)}
                className={`absolute bottom-24 right-10 p-6 rounded-full shadow-2xl transition-all active:scale-75 ${isFlashlightOn ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white backdrop-blur-md'}`}
              >
                {isFlashlightOn ? <Zap size={36} fill="currentColor" /> : <ZapOff size={36} />}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm font-bold bg-black/50 px-2 rounded">補光燈</span>
              </button>
            </div>

            {/* 詐騙彈窗演練 (Scam Alert Simulation) */}
            {showScamAlert && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-8 z-50 animate-in fade-in duration-300">
                <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 space-y-6 border-[8px] border-red-500 shadow-2xl">
                  <div className="flex flex-col items-center gap-4 text-red-600">
                    <AlertTriangle size={80} strokeWidth={3} className="animate-bounce" />
                    <h4 className="text-4xl font-black">恭喜中獎！</h4>
                  </div>
                  <p className="text-2xl font-bold text-center leading-relaxed">
                    您剛才掃描獲得了 <span className="text-red-600 text-3xl">$10,000</span> 元獎金！<br/>
                    請點擊下方領取。
                  </p>
                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={() => {setShowScamAlert(false); setStep(0);}} 
                      className="w-full bg-red-600 text-white py-5 rounded-2xl text-2xl font-black shadow-lg"
                    >
                      ⚠️ 這是詐騙，我不點！
                    </button>
                    <button 
                      onClick={() => {setShowScamAlert(false); setStep(0);}} 
                      className="w-full bg-gray-200 text-gray-500 py-4 rounded-2xl text-xl font-bold"
                    >
                      關閉視窗，保護自己
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: 掃描成功過渡 */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-green-950/90 animate-in fade-in duration-500">
            <div className="bg-green-500 p-8 rounded-full shadow-[0_0_60px_rgba(34,197,94,0.8)] mb-8">
              <CheckCircle2 size={120} className="text-white" />
            </div>
            <h2 className="text-5xl font-black text-white">對焦完成</h2>
            <p className="text-2xl text-green-300 mt-4 mb-10 font-bold">正在進入系統...</p>
            <button 
              onClick={() => setStep(4)} 
              className="w-full bg-white text-black font-black py-6 rounded-3xl text-2xl shadow-2xl hover:bg-gray-100 transition-colors"
            >
              看結果 〉
            </button>
          </div>
        )}

        {/* Step 4: 進入虛擬 App */}
        {step === 4 && renderVirtualApp()}

      </div>

      {/* 底部導師小卡 (Instructor Tip) */}
      <div className="mt-8 max-w-md w-full">
        <div className="bg-blue-600/10 border-l-8 border-blue-500 p-6 rounded-r-[2rem] shadow-inner">
          <p className="text-blue-100 text-lg leading-relaxed italic">
            <strong className="text-blue-400 text-2xl">💡 講師心法：</strong><br/>
            長輩們，如果掃不到，試著將手機「慢慢往後退」。這是在練習對焦，就像看書要拿遠一點點才看得清一樣！
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
