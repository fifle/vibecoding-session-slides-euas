import { useEffect, useState } from "react";

interface Slide {
  id: string;
  title: string;
  pageNum: number;
}

const slides: Slide[] = [
  { id: "slide_01_title", title: "VIBE CODING", pageNum: 1 },
  { id: "slide_02_speaker", title: "SPEAKER", pageNum: 2 },
  { id: "slide_03_goal", title: "SESSION GOAL", pageNum: 3 },
  { id: "slide_04_schedule", title: "SCHEDULE (4 HOURS)", pageNum: 4 },
  { id: "slide_05_concepts", title: "GENAI, LLM AND PROMPTING", pageNum: 5 },
  { id: "slide_05b_ai_spectrum", title: "AI ENGINEER SPECTRUM", pageNum: 6 },
  { id: "slide_06_vibe_coding", title: "VIBE CODING", pageNum: 7 },
  { id: "slide_06b_karpathy_quote", title: "THE NEW LANGUAGE", pageNum: 8 },
  { id: "slide_07_pros_cons", title: "VIBE CODING: PRO & CON", pageNum: 9 },
  { id: "slide_08_sdd", title: "SPEC-DRIVEN DEVELOPMENT (SDD)", pageNum: 10 },
  { id: "slide_09_sdd_template", title: "SDD TEMPLATE", pageNum: 11 },
  { id: "slide_10_tools_google", title: "TOOLS: GOOGLE AI STUDIO", pageNum: 12 },
  { id: "slide_11a_manus_spotlight", title: "MANUS AI: THE FUTURE", pageNum: 13 },
  { id: "slide_11b_ides", title: "IDES AND WORKFLOW", pageNum: 14 },
  { id: "slide_11c_cursor", title: "CURSOR: SUPERPOWERS", pageNum: 15 },
  { id: "slide_11d_mcp", title: "MCP & AUTOMATION", pageNum: 16 },
  { id: "slide_11e_design", title: "DESIGN AND GRAPHICS", pageNum: 17 },
  { id: "slide_11_tools_overview", title: "OTHER TOOLS", pageNum: 18 },
  { id: "slide_12_firebase", title: "FIREBASE: WHAT IS IT?", pageNum: 19 },
  { id: "slide_13_firestore_model", title: "FIRESTORE DATA MODEL", pageNum: 20 },
  { id: "slide_14_checkpoints", title: "PAGES AND CHECKPOINTS", pageNum: 21 },
  { id: "slide_15_fallback", title: "FALLBACK PLAN", pageNum: 22 },
  { id: "slide_16_prompt_1", title: "PROMPT 1: PROJECT STRUCTURE", pageNum: 23 },
  { id: "slide_17_prompt_2", title: "PROMPT 2: FIRESTORE READ & UI", pageNum: 24 },
  { id: "slide_18_prompt_3", title: "PROMPT 3: ADMIN AUTH & CRUD", pageNum: 25 },
  { id: "slide_19_prompt_4", title: "PROMPT 4: FIRESTORE SECURITY RULES", pageNum: 26 },
  { id: "slide_20_ai_vs_human", title: "AI VS HUMAN", pageNum: 27 },
  { id: "slide_21_ethics", title: "ETHICS AND RISKS", pageNum: 28 },
  { id: "slide_22_homework", title: "HOMEWORK PLAN (1H)", pageNum: 29 },
  { id: "slide_27_resources", title: "USEFUL MATERIALS", pageNum: 30 },
  { id: "slide_24_summary", title: "SUMMARY", pageNum: 31 },
  { id: "slide_25_qa", title: "Q&A AND DISCUSSION", pageNum: 32 },
  { id: "slide_26_thanks", title: "THANK YOU!", pageNum: 33 },
];

function SlideFrame({ slide }: { slide: Slide }) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSlide = async () => {
      try {
        const response = await fetch(`/${slide.id}.html`);
        let html = await response.text();
        
        // Inject viewport meta tag and responsive styling
        const viewportMeta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        const responsiveStyle = '<style>body { margin: 0; padding: 0; overflow: hidden; } .slide-container { width: 100vw !important; height: 100vh !important; max-width: 100vw !important; max-height: 100vh !important; }</style>';
        
        // Insert meta tag and styles into head
        html = html.replace('</head>', viewportMeta + responsiveStyle + '</head>');
        setContent(html);
      } catch (error) {
        console.error(`Failed to load ${slide.id}:`, error);
        setContent("<div>Failed to load slide</div>");
      } finally {
        setIsLoading(false);
      }
    };

    loadSlide();
  }, [slide.id]);

  return (
    <div className="w-screen h-screen flex-shrink-0 overflow-hidden bg-white">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      ) : (
        <iframe
          srcDoc={content}
          className="w-full h-full border-none"
          title={slide.title}
          sandbox="allow-same-origin"
          style={{
            transform: 'scale(1)',
            transformOrigin: '0 0',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      {slides.map((slide) => (
        <div key={slide.id} className="snap-start">
          <SlideFrame slide={slide} />
        </div>
      ))}
    </div>
  );
}
