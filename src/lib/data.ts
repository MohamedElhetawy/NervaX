export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  images: string[];
  live_url?: string | null;
  github_url?: string | null;
  created_at: string;
  problem?: string;
  thinking?: string;
  execution?: string;
  challenges?: string;
  result?: string;
  featured?: boolean;
  status?: "in-progress" | "completed" | "planning" | "coming-soon";
}

export const projects: Project[] = [
  {
    id: "nervax-platform",
    title: "NervaX Platform",
    description:
      "A full-stack digital identity platform showcasing innovation and technical excellence. Built with modern web technologies for optimal performance and user experience.",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-01-15",
    status: "in-progress",
    problem: "The need for a digital presence that goes beyond a typical portfolio — something that serves as a proof of capability, tech showcase, and personal brand all in one.",
    thinking: "The approach was to treat the website itself as a product. Every interaction, animation, and design decision needed to reflect the same quality standard expected in professional projects.",
    execution: "Built with Next.js App Router for SSR and SEO, Tailwind CSS for a consistent design system, Framer Motion for purposeful animations, and Supabase for backend services.",
    challenges: "Balancing visual impact with performance. Ensuring animations enhance rather than distract, and maintaining sub-1.5s load times while delivering a rich experience.",
    result: "A high-performance portfolio with Lighthouse score >90, custom cursor interactions, and a design system that communicates luxury tech minimalism.",
    featured: true,
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description:
      "Real-time analytics dashboard powered by AI insights. Processes large datasets and presents actionable intelligence through intuitive visualizations.",
    tech_stack: ["React", "Python", "FastAPI", "PostgreSQL", "D3.js"],
    images: ["/projects/skeleton-landing.svg"],
    github_url: "https://github.com/nervax/ai-dashboard",
    created_at: "2024-03-20",
    status: "in-progress",
    problem: "Organizations struggle to extract meaningful insights from their data in real-time. Traditional dashboards show numbers but lack the intelligence to highlight what matters.",
    thinking: "Instead of just visualizing data, the dashboard needed to actively analyze patterns and surface insights. The UI had to make complex AI outputs understandable at a glance.",
    execution: "FastAPI backend for real-time data processing, React frontend with D3.js for custom visualizations, PostgreSQL for efficient data storage, and ML models for pattern detection.",
    challenges: "Handling real-time data streams without UI jank. Making AI-generated insights explainable and trustworthy. Designing visualizations that work across different data types.",
    result: "A dashboard that reduces insight discovery time by 60%, with real-time processing of 10K+ events/second and intuitive AI-powered recommendations.",
    featured: true,
  },
  {
    id: "ecommerce-engine",
    title: "E-Commerce Engine",
    description:
      "Scalable e-commerce platform with advanced inventory management, real-time order tracking, and seamless payment integration.",
    tech_stack: ["Next.js", "Node.js", "Stripe", "Redis", "MongoDB"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-06-10",
    status: "in-progress",
    problem: "Small to medium businesses need enterprise-grade e-commerce capabilities without the enterprise price tag. Existing solutions are either too simple or too expensive.",
    thinking: "Build a modular system where businesses can start with basics and progressively enable advanced features. The architecture must handle flash sales and seasonal spikes gracefully.",
    execution: "Next.js for the storefront, Node.js microservices for order processing, Stripe for payments, Redis for caching and rate limiting, MongoDB for flexible product catalogs.",
    challenges: "Ensuring zero-downtime during high-traffic events. Maintaining data consistency across microservices. Building a checkout flow that minimizes cart abandonment.",
    result: "Platform handling 50K+ concurrent users, 99.99% uptime during peak events, and an average checkout completion rate 23% above industry standard.",
    featured: true,
  },
  {
    id: "devops-pipeline",
    title: "DevOps Automation Pipeline",
    description:
      "End-to-end CI/CD pipeline with automated testing, deployment, and monitoring. Reduces deployment time from hours to minutes.",
    tech_stack: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Prometheus"],
    images: ["/projects/skeleton-landing.svg"],
    github_url: "https://github.com/nervax/devops-pipeline",
    created_at: "2024-08-05",
    status: "in-progress",
    problem: "Manual deployment processes are slow, error-prone, and create bottlenecks. Teams waste hours on repetitive tasks instead of building features.",
    thinking: "Automation should cover the entire lifecycle — from code push to production monitoring. The pipeline needs to be self-healing and provide clear visibility at every stage.",
    execution: "Docker for containerization, Kubernetes for orchestration, GitHub Actions for CI/CD, Terraform for infrastructure as code, Prometheus + Grafana for monitoring.",
    challenges: "Creating rollback mechanisms that work reliably. Balancing pipeline speed with thorough testing. Making the system observable without information overload.",
    result: "Deployment time reduced from 4 hours to 12 minutes. Zero-downtime deployments. 95% reduction in deployment-related incidents.",
    featured: false,
  },
  {
    id: "edusmart-platform",
    title: "EduSmart: إعادة تعريف التعليم الجامعي",
    description:
      "منصة تعليمية ذكية تدمج Next.js و Django لبناء عقل رقمي يصاحب الطالب الجامعي. تتضمن مساعد ذكي يعتمد على تقنيات RAG للإجابة على الأسئلة من المناهج الفعلية.",
    tech_stack: ["Next.js", "Django", "RAG Technology", "Python", "TypeScript", "PostgreSQL"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-09-15",
    status: "in-progress",
    problem: "فجوة كبيرة بين المناهج التقليدية وسرعة تطور التكنولوجيا. الطلاب يحتاجون إلى مصدر موثوق للمعلومات يتفاعل معهم بذكاء.",
    thinking: "لم يكن الهدف مجرد منصة لرفع الملفات، بل خلق عقل رقمي حقيقي يفهم محتوى المناهج ويساعد الطلاب على الفهم الأعمق.",
    execution: "دمج Next.js للواجهة الأمامية مع Django في الخلفية. تطوير مساعد ذكي باستخدام تقنيات RAG لربط الأسئلة بالمحتوى الدراسي الفعلي. تكامل قواعد بيانات قوية لتخزين المناهج.",
    challenges: "جعل المنصة ذكية حقاً وليست مجرد واجهة. ضمان دقة الإجابات والاستشهاد بالمصادر من الكتب الدراسية. التعامل مع حجم كبير من المحتوى التعليمي.",
    result: "منصة احترافية شاركت في مسابقة Rally 2026. نموذج عمل يطمح لتغيير مستقبل التعليم في مصر. اهتمام من الأوساط الأكاديمية وخطة لرقمنة كليات الزراعة والعلوم.",
    featured: true,
  },
  {
    id: "fit-x-app",
    title: "Fit X: المدرب الذكي في جيبك",
    description:
      "تطبيق لياقة ذكي يعتمد على معمارية Hybrid Local-First. يتميز بخوارزميات ذكاء اصطناعي تفهم نمط حياة المستخدم وتقترح جداول تدريب وتغذية مرنة.",
    tech_stack: ["Flutter", "Python", "Machine Learning", "TensorFlow", "Firebase"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-10-20",
    status: "in-progress",
    problem: "معظم تطبيقات اللياقة تفتقر إلى الخصوصية والذكاء المحلي. تطلب اتصالاً دائماً بالإنترنت وتعتمد على بيانات عامة غير مخصصة.",
    thinking: "بناء تطبيق يعمل بكفاءة حتى بدون إنترنت، مع تطوير خوارزميات ذكاء اصطناعي تتعلم من سلوك المستخدم الشخصي وتتطور معه.",
    execution: "Flutter لبناء تجربة مستخدم سلسة عبر المنصات. Python لمعالجة البيانات الصحية. معمارية Local-First للعمل بدون إنترنت مع مزامنة ذكية. نماذج تعلم آلي لفهم نمط الحياة.",
    challenges: "بناء هندسة Hybrid Local-First موثوقة. تطوير خوارزميات تتعلم من البيانات الشخصية دون تسريب الخصوصية. مزامنة البيانات بذكاء والتعامل مع التضاربات.",
    result: "تطبيق احترافي يعمل بدون إنترنت مع مزامنة ذكية. خوارزميات ذكاء اصطناعي تقترح جداول تدريب مرنة تتطور مع المستخدم. تقييمات عالية من المستخدمين بسبب الخصوصية والذكاء.",
    featured: true,
  },
  {
    id: "nevra-x-agency",
    title: "NEVRA X: وكالة الابتكار التقني",
    description:
      "مختبر للابتكار التقني. وكالة برمجية متخصصة في تحويل الأفكار المعقدة إلى واجهات مستخدم ساحرة وحلول برمجية قوية. تستخدم أحدث تقنيات الـ Automation و n8n.",
    tech_stack: ["Next.js", "TypeScript", "n8n", "Automation", "UI/UX Design", "Python"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-11-01",
    status: "in-progress",
    problem: "الحاجة إلى وكالة تقنية تجمع بين الابتكار الفني والتنفيذ التقني القوي. وكالة تفهم الرؤية وتحولها إلى واقع ملموس.",
    thinking: "بناء كيان أكبر من مجرد مطور واحد. وكالة تعكس فلسفتها الأساسية: 'حلول تقنية بلا حدود'. الهوية البصرية والشعار يجب أن يعبران عن هذه الفلسفة.",
    execution: "تصميم شعار يرمز للانهاية (Infinity) مع دمج حروف N, X, M لتعبيراً عن دمج الشبكات العصبية بالطابع الهندسي. فريق متخصص في كل جانب: التصميم والتطوير والتشغيل الآلي.",
    challenges: "بناء هوية بصرية قوية تعكس الابتكار. ضمان جودة متسقة عبر جميع المشاريع. استخدام أدوات Automation لتحسين الإنتاجية دون التضحية بالجودة.",
    result: "وكالة احترافية معروفة بالابتكار والجودة. تصميم شعار فريد يعكس الفلسفة. استخدام n8n والتقنيات الحديثة يضمن أعلى مستويات الإنتاجية. عملاء راضون يعودون للتعاون المتكرر.",
    featured: true,
  },
  {
    id: "zera3i-academy",
    title: "Zera3i Academy: الجسر بين الأرض والذكاء الاصطناعي",
    description:
      "منصة تعليمية متخصصة في دمج الذكاء الاصطناعي مع العمليات الزراعية. تعليم شامل لمهندسي ومزارعي المستقبل على استخدام تقنيات AI في الزراعة الحديثة.",
    tech_stack: ["Next.js", "TensorFlow", "Python", "Data Analytics", "PostgreSQL", "React"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-11-10",
    status: "in-progress",
    problem: "فجوة كبيرة بين القطاع الزراعي التقليدي والتقنيات الحديثة. المهندسون والمزارعون يحتاجون إلى مرجع موثوق لفهم تطبيقات الذكاء الاصطناعي في الزراعة.",
    thinking: "ليس تعليماً فحسب، بل محاولة لكسر الحاجز بين المزارع/المهندس الزراعي وبين أدوات المستقبل. جعل التكنولوجيا في متناول اليد.",
    execution: "منصة شاملة تغطي تحليل التربة باستخدام ML. إدارة الموارد المائية بتقنيات ذكية. نماذج تنبؤ بالمحاصيل والآفات. واجهة بديهية تناسب جميع المستويات.",
    challenges: "ترجمة المفاهيم التقنية لمتخصصين زراعيين. ضمان دقة البيانات والنماذج. بناء مجتمع من المستخدمين المتفاعلين والمساهمين.",
    result: "منصة متكاملة تربط الزراعة بالذكاء الاصطناعي. مرجع أول لطلاب وخريجي كليات الزراعة. اهتمام من الأساتذة والمتخصصين. آفاق جديدة لسوق العمل الحديث.",
    featured: true,
  },
  {
    id: "el-hetawy-butcher",
    title: "El Hetawy Butcher: دمج الأصالة بالتكنولوجيا",
    description:
      "تحويل رقمي لمتجر عريق. بناء هوية رقمية احترافية تليق بسمعة المكان. من محل جزارة محلي إلى علامة تجارية احترافية تنافس في الفضاء الرقمي.",
    tech_stack: ["Next.js", "E-Commerce", "Stripe", "Content Management", "SEO", "Design"],
    images: ["/projects/skeleton-landing.svg"],
    created_at: "2024-12-05",
    status: "in-progress",
    problem: "متجر عائلي عريق يحتاج إلى دخول العصر الرقمي. الحاجة للتنافس مع المتاجر الأخرى في الفضاء الرقمي دون فقدان الأصالة والهوية.",
    thinking: "ليس مجرد موقع إلكتروني عادي، بل بناء هوية رقمية كاملة تعكس جودة الخدمة والأصالة والسمعة العريقة.",
    execution: "تصميم متناسق للألوان والشعار يعكس الأصالة والجودة. موقع احترافي مع نظام إدارة محتوى قوي. تكامل دفع آمن للطلبات الإلكترونية. استراتيجية محتوى للتسويق الرقمي.",
    challenges: "الحفاظ على الطابع التقليدي والأصالة مع احتضان التكنولوجيا. بناء ثقة العملاء الجدد. التسويق الفعال للمتجر الجديد على الإنترنت.",
    result: "متجر احترافي عبر الإنترنت يحافظ على الهوية التقليدية. علامة تجارية قوية في الفضاء الرقمي. جذب عملاء جدد محليين وإقليميين. تحويل بنجاح من متجر محلي إلى متجر رقمي احترافي.",
    featured: true,
  },
];

