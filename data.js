// All imported Icons
import {
  FaLightbulb,
  FaPenNib,
  FaQuestionCircle,
  FaFlag,
} from "react-icons/fa";
import { MdOutlineLightbulb } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaLaptopCode,
  FaUserGraduate,
  FaProjectDiagram,
  FaCertificate,
  FaHandsHelping,
  FaUserTie,
  FaSearch,
  FaHandHoldingUsd,
} from "react-icons/fa";
//WhyChooseUs section images
import { FaCheckCircle } from "react-icons/fa";
import img1 from "./src/assets/web.jpg";
import img2 from "./src/assets/web.jpg";
import img3 from "./src/assets/web.jpg";
import img4 from "./src/assets/web.jpg";
//Course data file pdf video
import CourseVideo from "./src/assets/course.mp4";
import coursePdf from "./src/assets/testpdf.pdf";


// Award images About us section
import award1 from "./src/assets/award1.webp";
import award2 from "./src/assets/award1.webp";
import award3 from "./src/assets/award1.webp";
import award4 from "./src/assets/award1.webp";
// certificate image
import Cert1 from "./src/assets/certificate1.jpg";
import Cert2 from "./src/assets/certificate2.jpg";
import Cert3 from "./src/assets/certificate3.jpg";
import Cert4 from "./src/assets/certificate3.jpg";
import Cert5 from "./src/assets/certificate3.jpg";
//company logo
import Google from "./src/assets/google.jpg";
import Walmart from "./src/assets/walmart.jpg";
import AirBnb from "./src/assets/airbnb.png";
import MamaEarth from "./src/assets/mamaearth.png";
import Accenture from "./src/assets/accenture.jpg";

// TestimonialSlider data
import Banner from "./src/assets/adm.webp";
import Banner1 from "./src/assets/mdm.webp";
import Banner2 from "./src/assets/pdm.webp";

// MiniCard data
import DM from "./src/assets/1dm.png";
import DM1 from "./src/assets/1dm.png";
import DM2 from "./src/assets/1dm.png";
import DM3 from "./src/assets/1dm.png";
import DM4 from "./src/assets/1dm.png";
import DM5 from "./src/assets/1dm.png";

// BlogSection data
import blog1 from "./src/assets/web.jpg";
import blog2 from "./src/assets/design.jpg";
import blog3 from "./src/assets/digital.jpg";

// OurClients data
import Logo from "./src/assets/logo.png";

// HeroSection data
import BannerHS from "./src/assets/Aboutbgacc.webp";
//AboutBanner image
import AboutBanner from "./src/assets/Digital5.jpeg";
// AboutHeroSection data
import sampleImage from "./src/assets/Aboutbgacc.webp";

// CourseTabs data
import BannerC1 from "./src/assets/mdm.webp";
import BannerC2 from "./src/assets/pdm.webp";
import BannerC3 from "./src/assets/adm.webp";

// ImpactSection data
export const testimonials = [
  {
    image: Banner,
    quoteTitle: "Lounge Lizard genuinely cares about their customers.",
    quoteText:
      "Lounge Lizard was able to take an abstract idea for an app and bring it to reality, while staying true to the original vision.",
    author: "PRESIDENT",
    company: "STUDR",
    rating: 5,
  },
  {
    image: Banner1,
    quoteTitle: "Exceptional creativity and development support.",
    quoteText:
      "The app’s design and usability were outstanding. The agency distinguished themselves with responsive communication.",
    author: "CEO",
    company: "CREATEX",
    rating: 5,
  },
  {
    image: Banner2,
    quoteTitle: "Fantastic end-to-end experience with Lounge Lizard.",
    quoteText:
      "They delivered high-quality designs with strong attention to detail and customer satisfaction.",
    author: "MARKETING HEAD",
    company: "TECHWAVE",
    rating: 5,
  },
];

export const cardData = [
  { id: 1, image: DM, text: "Artificial Intelligence" },
  { id: 2, image: DM1, text: "Web Development" },
  { id: 3, image: DM2, text: "UI/UX Design" },
  { id: 4, image: DM3, text: "Digital Marketing" },
  { id: 5, image: DM4, text: "Data Science" },
  { id: 6, image: DM5, text: "Cyber Security" },
  { id: 7, image: DM, text: "App Development" },
  { id: 8, image: DM1, text: "Cloud Computing" },
  { id: 9, image: DM2, text: "Blockchain" },
  { id: 10, image: DM3, text: "Robotics" },
  { id: 11, image: DM4, text: "HR & Soft Skills" },
  { id: 12, image: DM5, text: "Business Strategy" },
];

export const blogData = [
  {
    id: 1,
    img: blog1,
    date: "05-29-2025",
    title: "Best Web Design Companies in 2025 [June Update]",
    excerpt:
      "Whether you're building a new website or revamping an existing one, partnering with a top web design company is crucial to ensuring a site that is [...]",
    category: "Design",
  },
  {
    id: 2,
    img: blog2,
    date: "05-29-2025",
    title: "TOP Web Development Companies in 2025 [June Update]",
    excerpt:
      "To ensure a fair and objective evaluation, we analyzed numerous web design agencies based on several criteria. These include their portfolio of work [...]",
    category: "Development",
  },
  {
    id: 3,
    img: blog3,
    date: "05-29-2025",
    title: "Top 10 Best Financial Website Designs [June 2025 Update]",
    excerpt:
      "Key Takeaways: These financial website designs use an intuitive flow and stellar UI/UX experience to capture site visitors' business [...]",
    category: "Marketing",
  },
  {
    id: 4,
    img: blog3,
    date: "05-29-2025",
    title: "Top 10 Best Financial Website Designs [June 2025 Update]",
    excerpt:
      "Key Takeaways: These financial website designs use an intuitive flow and stellar UI/UX experience to capture site visitors' business [...]",
    category: "Marketing",
  },
  {
    id: 5,
    img: blog3,
    date: "05-29-2025",
    title: "Top 10 Best Financial Website Designs [June 2025 Update]",
    excerpt:
      "Key Takeaways: These financial website designs use an intuitive flow and stellar UI/UX experience to capture site visitors' business [...]",
    category: "Marketing",
  },
  {
    id: 6,
    img: blog3,
    date: "05-29-2025",
    title: "Top 10 Best Financial Website Designs [June 2025 Update]",
    excerpt:
      "Key Takeaways: These financial website designs use an intuitive flow and stellar UI/UX experience to capture site visitors' business [...]",
    category: "Marketing",
  },
];

export const logos = [
  { name: "Random House", src: Logo },
  { name: "Daiwa", src: Logo },
  { name: "Gold Dust", src: Logo },
  { name: "LoopLoc", src: Logo },
  { name: "Circa", src: Logo },
  { name: "Broadway", src: Logo },
  { name: "MPA", src: Logo },
  { name: "Mountaire", src: Logo },
  { name: "Blue Owl", src: Logo },
  { name: "New Client", src: Logo },
];

export const images = [
  {
    url: BannerHS,
    stat: "90%",
    description: "SOLD-OUT SHOWS ON TICKETMASTER",
    thumbnail: BannerHS,
  },
  {
    url: BannerHS,
    stat: "51%",
    description: "INCREASE IN ORGANIC TRAFFIC",
    thumbnail: BannerHS,
  },
  {
    url: BannerHS,
    stat: "38%",
    description: "BOOST IN SOCIAL REACH",
    thumbnail: BannerHS,
  },
];
export const courseDetailsList = [
  {
    id: "fullstack-web-dev",
    title: "Full-Stack Web Development Bootcamp",
    subtitle: "Become a job-ready MERN stack developer from scratch",
    rating: 4.7,
    image: BannerC1,
    reviewsCount: 260,
    studentsEnrolled: 1500,
    lastUpdated: "May 2025",
    category: "Web Development",
    type: "Student",
    previewVideo: "https://example.com/fullstack-preview.mp4",
    whatYouWillLearn: [
      "Build dynamic websites using HTML, CSS, JS, React, and Node",
      "Design REST APIs with Express",
      "Use MongoDB for database operations",
      "Deploy applications on cloud platforms",
      "Understand Git & GitHub for version control",
      "Create full-stack applications from scratch",
    ],
     modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
     price: 2999,
    salePrice: 1499,
    topics: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    includes: [
      "60 hours on-demand video",
      "20 downloadable resources",
      "Certificate of completion",
      "Mobile and desktop access",
    ],
    curriculum: [
      {
        section: "Frontend Foundations",
        lectures: [
          { title: "HTML/CSS Basics", duration: "1h 20m" },
          { title: "JavaScript Essentials", duration: "1h 45m" },
        ],
      },
      {
        section: "React Development",
        lectures: [
          { title: "JSX and Components", duration: "55 min" },
          { title: "State and Props", duration: "1h 10m" },
        ],
      },
    ],
    
    requirements: [
      "Basic computer knowledge",
      "Willingness to learn programming",
    ],
    description: `This comprehensive bootcamp teaches you how to build modern web apps using the MERN stack. From HTML to deployment, this course is your gateway to a developer career.`,
  },
  {
    id: "cybersecurity-beginners",
    title: "Cybersecurity for Beginners",
    subtitle:
      "Learn the fundamentals of cyber threats, hacking, and online safety",
    rating: 4.8,
    image: BannerC2,
    reviewsCount: 220,
    studentsEnrolled: 980,
    lastUpdated: "April 2025",
    category: "Cybersecurity",
    type: "Student",
    price: 2999,
    salePrice: 1499,
    previewVideo: "https://example.com/cybersecurity-intro.mp4",
    whatYouWillLearn: [
      "Understand cyber attacks and prevention techniques",
      "Use tools like Wireshark & Kali Linux",
      "Identify phishing, malware, and data leaks",
      "Practice safe browsing and password strategies",
      "Intro to ethical hacking and cybersecurity careers",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: ["Cybersecurity", "Ethical Hacking", "Network Security"],
    includes: [
      "18 hours video",
      "10 practical labs",
      "Certificate included",
      "Runs on all devices",
    ],
    curriculum: [
      {
        section: "Threat Basics",
        lectures: [
          { title: "What is Cybersecurity?", duration: "30 min" },
          { title: "Types of Attacks", duration: "40 min" },
        ],
      },
      {
        section: "Tools & Defense",
        lectures: [
          { title: "Wireshark and Packet Analysis", duration: "55 min" },
          { title: "Safe Browsing Habits", duration: "35 min" },
        ],
      },
    ],
    requirements: [
      "Interest in IT or security",
      "No technical background needed",
    ],
    description: `Kickstart your cybersecurity journey with this beginner-friendly course. Great for students exploring security and ethical hacking careers.`,
  },
  {
    id: "graphic-design-pro",
    title: "Graphic Design MasterclassName",
    subtitle: "Master Photoshop, Illustrator & design theory from scratch",
    rating: 4.6,
    image: BannerC2,
    reviewsCount: 180,
    studentsEnrolled: 950,
    lastUpdated: "April 2025",
    category: "Design",
    type: "Student",
    previewVideo: "https://example.com/design-preview.mp4",
    whatYouWillLearn: [
      "Use Photoshop for digital design",
      "Create logos and branding",
      "Understand typography & color theory",
      "Design posters, brochures, and ads",
      "Work with Illustrator shapes and paths",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: ["Photoshop", "Illustrator", "Typography", "Branding"],
    includes: [
      "30 hours on-demand video",
      "12 downloadable files",
      "Certificate of completion",
    ],
    curriculum: [
      {
        section: "Design Basics",
        lectures: [
          { title: "Color Theory", duration: "30 min" },
          { title: "Typography Essentials", duration: "45 min" },
        ],
      },
      {
        section: "Tool Mastery",
        lectures: [
          { title: "Photoshop Interface", duration: "35 min" },
          { title: "Logo Design in Illustrator", duration: "1h 5m" },
        ],
      },
    ],
    price: 2999,
    salePrice: 1499,
    requirements: [
      "No prior design knowledge required",
      "Access to Adobe software preferred",
    ],
    description: `Learn graphic design tools and principles to become a creative professional. Whether you're designing for print or web, this course gets you job-ready.`,
  },
  {
    id: "data-analytics-excel",
    title: "Data Analytics with Excel for Beginners",
    subtitle: "Analyze business data using advanced Excel techniques",
    rating: 4.5,
    image: BannerC3,
    reviewsCount: 100,
    studentsEnrolled: 700,
    price: 2999,
    salePrice: 1199,
    lastUpdated: "March 2025",
    category: "Data Analysis",
    type: "Student",
    previewVideo: "https://example.com/excel-preview.mp4",
    whatYouWillLearn: [
      "Use PivotTables and charts",
      "Clean and prepare data",
      "Perform statistical analysis",
      "Automate tasks with formulas",
      "Create interactive dashboards",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: ["Excel", "Data Cleaning", "Dashboards", "Formulas"],
    includes: [
      "20 hours on-demand video",
      "Excel datasets included",
      "Certificate of completion",
    ],
    curriculum: [
      {
        section: "Data Basics",
        lectures: [
          { title: "Working with Tables", duration: "25 min" },
          { title: "Functions & Logic", duration: "40 min" },
        ],
      },
      {
        section: "Visualization",
        lectures: [
          { title: "Pivot Tables", duration: "35 min" },
          { title: "Dashboards", duration: "45 min" },
        ],
      },
    ],
    requirements: [
      "Basic Excel familiarity",
      "Access to Microsoft Excel (2016+)",
    ],
    description: `Master Excel for data analysis. Learn how to manipulate, analyze, and visualize real business data with powerful spreadsheet techniques.`,
  },
  {
    id: "team-ai-automation",
    title: "AI Automation for Business Teams",
    subtitle: "Empower your team to automate workflows using ChatGPT and tools",
    rating: 4.9,
    image: BannerC1,
    reviewsCount: 75,
    studentsEnrolled: 300,
    lastUpdated: "June 2025",
    category: "Corporate Training",
    type: "Business",
    previewVideo: "https://example.com/business-ai.mp4",
    whatYouWillLearn: [
      "Identify automation opportunities in teams",
      "Use ChatGPT for document creation",
      "Create SOPs and scripts using AI",
      "Train non-tech teams to use no-code tools",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: ["AI", "Productivity", "Automation", "Teamwork"],
    includes: [
      "10 hours video training",
      "Templates for SOPs and flows",
      "Access for 1 year",
    ],
    downloadBrochure: "/data/cybersecurity-brochure.pdf",
    curriculum: [
      {
        section: "Getting Started",
        lectures: [
          { title: "What is AI Automation?", duration: "20 min" },
          { title: "Choosing No-Code Tools", duration: "30 min" },
        ],
      },
      {
        section: "Use Cases",
        lectures: [
          { title: "HR Automation", duration: "25 min" },
          { title: "Marketing Content Generation", duration: "35 min" },
        ],
      },
    ],
    requirements: ["Team management access", "Willingness to change workflows"],
    description: `This course enables managers and leads to introduce AI-based automation to their teams using ChatGPT and simple tools — no coding required.`,
  },
  {
    id: "leadership-communication",
    title: "Effective Leadership Communication",
    subtitle: "Train managers and executives to lead with clarity and impact",
    rating: 4.7,
    image: BannerC2,
    reviewsCount: 55,
    downloadBrochure: "/data/cybersecurity-brochure.pdf",
    studentsEnrolled: 180,
    lastUpdated: "Feb 2025",
    category: "Leadership",
    type: "Business",
    previewVideo: "https://example.com/leadership-preview.mp4",
    whatYouWillLearn: [
      "Build trust through clear messaging",
      "Handle conflicts and feedback effectively",
      "Present confidently in meetings",
      "Improve email and verbal communication",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: ["Leadership", "Communication", "Soft Skills"],
    includes: [
      "6 hours training",
      "Printable resources",
      "Trainer support access",
    ],
    curriculum: [
      {
        section: "Foundations",
        lectures: [
          { title: "What Makes a Good Leader?", duration: "15 min" },
          { title: "Building Empathy in Teams", duration: "30 min" },
        ],
      },
      {
        section: "Practical Exercises",
        lectures: [
          { title: "Active Listening", duration: "20 min" },
          { title: "Handling Difficult Conversations", duration: "40 min" },
        ],
      },
    ],
    requirements: [
      "Mid or senior level managers preferred",
      "Team of 3+ people to apply lessons",
    ],
    description: `This course trains business leaders in mastering the art of communication, motivating teams, and solving workplace conflict with confidence.`,
  },
  {
    id: "digital-team-upskilling",
    title: "Digital Team Upskilling Program",
    subtitle:
      "Empower your marketing and sales teams with practical AI and digital tools",
    rating: 4.6,
    image: BannerC3,
    downloadBrochure: "/data/cybersecurity-brochure.pdf",
    reviewsCount: 110,
    studentsEnrolled: 950,
    lastUpdated: "May 2025",
    category: "Corporate Training",
    type: "Business",
    previewVideo: "https://example.com/digital-teams.mp4",
    whatYouWillLearn: [
      "Boost productivity using ChatGPT and AI tools",
      "Automate repetitive tasks and content writing",
      "Collaborate efficiently using digital project tools",
      "Improve email and ad copy with AI support",
      "Upskill sales & marketing team with trending tools",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: ["ChatGPT", "Trello", "Slack", "CRM Tools", "Automation"],
    includes: [
      "20 hours on-demand video",
      "8 downloadable resources",
      "Team certificates",
      "Cross-device access",
    ],
    curriculum: [
      {
        section: "AI Integration in Marketing",
        lectures: [
          { title: "Using AI for Email Campaigns", duration: "35 min" },
          { title: "Creating Ad Copies With ChatGPT", duration: "28 min" },
        ],
      },
      {
        section: "Digital Tools",
        lectures: [
          { title: "CRM for Lead Management", duration: "42 min" },
          { title: "Project Tools (Trello, Notion)", duration: "50 min" },
        ],
      },
    ],
    requirements: ["Working marketing/sales team", "Basic computer skills"],
    description: `This course is designed to enhance business team efficiency using digital tools and AI-powered strategies. Perfect for marketing and sales departments seeking digital transformation.`,
  },
  {
    id: "corporate-leadership-essentials",
    title: "Corporate Leadership Essentials",
    subtitle: "Lead high-performing teams and manage change effectively",
    rating: 4.9,
    image: BannerC1,
    reviewsCount: 190,
    studentsEnrolled: 600,
    lastUpdated: "April 2025",
    category: "Leadership",
    type: "Business",
    previewVideo: "https://example.com/leadership-preview.mp4",
    whatYouWillLearn: [
      "Understand modern leadership frameworks",
      "Handle remote and hybrid teams",
      "Drive innovation and team accountability",
      "Practice emotional intelligence in leadership",
      "Plan and implement change in organizations",
    ],
       modules: [
      {
        title: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        lessons: ["Welcome", "Tools Setup", "Course Overview"]
      },
      {
        title: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        lessons: ["HTML Basics", "CSS Flexbox", "Responsive Design"]
      },
      {
        title: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        lessons: ["Variables", "Functions", "DOM Manipulation"]
      }
    ],
    topics: [
      "Leadership",
      "Team Management",
      "Change Management",
      "Communication",
    ],
    includes: [
      "15 hours video",
      "10 downloadable templates",
      "Certificate for managers",
      "Works on all devices",
    ],
    downloadBrochure: "/data/cybersecurity-brochure.pdf",
    curriculum: [
      {
        section: "Leadership Mindset",
        lectures: [
          { title: "Principles of Modern Leadership", duration: "40 min" },
          { title: "Managing Across Generations", duration: "35 min" },
        ],
      },
      {
        section: "Change & Growth",
        lectures: [
          { title: "Driving Innovation", duration: "45 min" },
          { title: "Handling Team Conflicts", duration: "50 min" },
        ],
      },
    ],
    requirements: [
      "Mid to senior management roles",
      "Experience working in teams",
    ],
    description: `Ideal for business leaders looking to inspire their teams, drive change, and create a growth-driven company culture.`,
  },
  {
  id: "strategic-digital-marketing",
  title: "Strategic Digital Marketing",
  subtitle: "Master SEO, paid ads, and analytics for business growth",
  rating: 4.8,
  image: BannerC2,
  reviewsCount: 245,
  studentsEnrolled: 1200,
  lastUpdated: "May 2025",
  category: "Marketing",
  type: "Business",
  previewVideo: "https://example.com/marketing-preview.mp4",
  whatYouWillLearn: [
    "Plan data-driven marketing campaigns",
    "Implement SEO & paid advertising effectively",
    "Leverage social media and content marketing",
    "Track performance using advanced analytics",
    "Optimize conversion funnels and customer journeys"
  ],
  modules: [
    {
      title: "Module 1: Foundations",
      completed: true,
      description: "Understand marketing principles",
      lessons: ["Digital vs Traditional", "Marketing Funnels", "Strategy Canvas"]
    },
    {
      title: "Module 2: SEO & SEM",
      completed: false,
      description: "Improve visibility and ranking",
      lessons: ["Keyword Research", "Google Ads", "Landing Pages"]
    },
    {
      title: "Module 3: Analytics",
      completed: false,
      description: "Use analytics for growth",
      lessons: ["Google Analytics", "KPI Tracking", "A/B Testing"]
    }
  ],
  topics: ["SEO", "Ads", "Content", "Analytics", "Strategy"],
  includes: [
    "18 hours video",
    "15 templates and tools",
    "Downloadable resources",
    "Completion Certificate"
  ],
  downloadBrochure: "/data/marketing-brochure.pdf",
  curriculum: [
    {
      section: "Marketing Frameworks",
      lectures: [
        { title: "Customer Personas", duration: "30 min" },
        { title: "Channel Strategy", duration: "40 min" }
      ]
    },
    {
      section: "Execution & Tools",
      lectures: [
        { title: "SEM Campaigns", duration: "45 min" },
        { title: "Analytics Reports", duration: "50 min" }
      ]
    }
  ],
  requirements: [
    "Basic knowledge of digital platforms",
    "Interest in business growth through marketing"
  ],
  description: `Learn how to develop high-impact marketing strategies to grow your business, improve ROI, and engage customers through digital channels.`
}
,{
  id: "data-science-decision-making",
  title: "Data Science for Decision Making",
  subtitle: "Use data and AI insights to improve strategic business outcomes",
  rating: 4.7,
  image: BannerC3,
  reviewsCount: 310,
  studentsEnrolled: 950,
  lastUpdated: "March 2025",
  category: "Data & AI",
  type: "Business",
  previewVideo: "https://example.com/data-preview.mp4",
  whatYouWillLearn: [
    "Understand core data science concepts",
    "Use dashboards and visualizations",
    "Make data-backed business decisions",
    "Integrate AI tools in business workflows",
    "Collaborate effectively with data teams"
  ],
  modules: [
    {
      title: "Module 1: Data Literacy",
      completed: true,
      description: "Learn to read and interpret data",
      lessons: ["Data Types", "Dashboards", "KPIs & Metrics"]
    },
    {
      title: "Module 2: Predictive Tools",
      completed: false,
      description: "Use ML insights in business",
      lessons: ["Forecasting", "Trend Analysis", "AI Use Cases"]
    },
    {
      title: "Module 3: Application",
      completed: false,
      description: "Drive action through data",
      lessons: ["Reporting", "Business Cases", "Presentation"]
    }
  ],
  topics: ["Data", "Machine Learning", "BI", "Strategy"],
  includes: [
    "12 hours content",
    "Case studies",
    "Excel & Power BI files",
    "Completion certificate"
  ],
  downloadBrochure: "/data/data-science-brochure.pdf",
  curriculum: [
    {
      section: "Data Strategy",
      lectures: [
        { title: "Intro to Data Science", duration: "30 min" },
        { title: "How AI Helps Business", duration: "40 min" }
      ]
    },
    {
      section: "Business Impact",
      lectures: [
        { title: "Data-Driven Culture", duration: "45 min" },
        { title: "Collaborating with Analysts", duration: "35 min" }
      ]
    }
  ],
  requirements: [
    "No coding knowledge required",
    "Interest in business innovation"
  ],
  description: `Empower business teams with practical data skills to improve outcomes, collaborate with data experts, and leverage AI-driven insights.`
},{
  id: "agile-project-management",
  title: "Agile Project Management",
  subtitle: "Deliver results with speed and flexibility using Agile frameworks",
  rating: 4.85,
  image: BannerC1,
  reviewsCount: 175,
  studentsEnrolled: 870,
  lastUpdated: "February 2025",
  category: "Project Management",
  type: "Business",
  previewVideo: "https://example.com/agile-preview.mp4",
  whatYouWillLearn: [
    "Implement Scrum and Kanban",
    "Lead Agile ceremonies and retrospectives",
    "Manage product backlogs and sprints",
    "Measure team velocity and outcomes",
    "Align stakeholders with agile goals"
  ],
  modules: [
    {
      title: "Module 1: Agile Basics",
      completed: true,
      description: "Core principles and terminology",
      lessons: ["Agile vs Waterfall", "Scrum Roles", "Kanban Boards"]
    },
    {
      title: "Module 2: Sprint Management",
      completed: false,
      description: "Manage work and iterations",
      lessons: ["User Stories", "Daily Standups", "Sprint Review"]
    },
    {
      title: "Module 3: Leadership in Agile",
      completed: false,
      description: "Facilitate and remove blockers",
      lessons: ["Servant Leadership", "Retrospectives", "Agile Mindset"]
    }
  ],
  topics: ["Agile", "Scrum", "Kanban", "Team Leadership"],
  includes: [
    "10 hours content",
    "Agile toolkit",
    "Scrum Guide PDF",
    "Completion certificate"
  ],
  downloadBrochure: "/data/agile-pm-brochure.pdf",
  curriculum: [
    {
      section: "Getting Started with Agile",
      lectures: [
        { title: "Agile Manifesto", duration: "20 min" },
        { title: "When to Use Agile", duration: "25 min" }
      ]
    },
    {
      section: "Execution & Coaching",
      lectures: [
        { title: "Agile Leadership", duration: "40 min" },
        { title: "Facilitating Retrospectives", duration: "35 min" }
      ]
    }
  ],
  requirements: [
    "Familiarity with team projects",
    "Willingness to adapt to change"
  ],
  description: `Build high-performing teams that thrive under change. Learn to lead projects using agile methodologies to deliver business value faster.`
}

];

export const impactItems = [
  { title: 650, suffix: "+", description: "Websites Launched" },
  { title: 23, suffix: "+", description: "Years of Experience" },
  {
    title: 4.9,
    suffix: " ★",
    description: "Avg. Google Rating",
    isDecimal: true,
  },
  { title: 500, suffix: "+", description: "Happy Clients" },
];

export const features = [
  { id: 1, icon: FaChalkboardTeacher, label: "Expert Trainers" },
  { id: 2, icon: FaCalendarAlt, label: "Flexible Batches" },
  { id: 3, icon: FaLaptopCode, label: "Online classNamees" },
  { id: 4, icon: FaUserGraduate, label: "Doubt classNamees" },
  { id: 5, icon: FaUserTie, label: "Job Oriented Training" },
  { id: 6, icon: FaProjectDiagram, label: "Live Project Work" },
  { id: 7, icon: FaCertificate, label: "Verifiable Certificate" },
  { id: 8, icon: FaHandsHelping, label: "100% Job Assistance" },
];

export const accordionItems = [
  {
    title: "BRANDING",
    faqs: [
      {
        question: "What is brand storytelling?",
        answer:
          "Brand storytelling is the art of using a narrative to connect your brand to customers, providing meaning and emotional resonance.",
      },
      {
        question: "Why is brand identity important?",
        answer:
          "A strong brand identity builds trust, recognition, and emotional connection with your audience, setting you apart in the market.",
      },
      {
        question: "Do you help with logo design?",
        answer:
          "Yes, we create custom logo designs that align with your brand's voice, values, and target audience.",
      },
      {
        question: "What does a branding package include?",
        answer:
          "Our branding packages typically include logo, typography, color palette, voice guidelines, and key marketing assets.",
      },
      {
        question: "Can you rebrand an existing business?",
        answer:
          "Absolutely! We offer brand audits, redesigns, and strategic repositioning for existing businesses ready for a refresh.",
      },
    ],
  },
  {
    title: "DESIGN",
    faqs: [
      {
        question: "What is UI/UX design?",
        answer:
          "UI/UX design is the process of creating user interfaces and experiences that are visually appealing and easy to use.",
      },
      {
        question: "How is responsive design implemented?",
        answer:
          "Responsive design ensures a website looks good on all devices using flexible layouts and media queries.",
      },
      {
        question: "What tools do you use for design?",
        answer:
          "We use Figma, Adobe XD, Sketch, and Photoshop for various design tasks.",
      },
      {
        question: "Do you design logos and brand kits?",
        answer:
          "Yes, we offer complete branding services including logos, style guides, and visual identity kits.",
      },
      {
        question: "Can I request revisions on the design?",
        answer:
          "Yes, we provide a set number of revisions to ensure you’re satisfied with the design outcome.",
      },
    ],
  },
  {
    title: "DIGITAL MARKETING",
    faqs: [
      {
        question: "What platforms do you use for digital marketing?",
        answer:
          "We use Google Ads, Facebook Ads, Instagram, LinkedIn, and various email marketing platforms.",
      },
      {
        question: "What is included in your SEO service?",
        answer:
          "Technical SEO, keyword optimization, backlinking, and analytics reporting are all included.",
      },
      {
        question: "Do you run paid ad campaigns?",
        answer:
          "Yes, we create and manage PPC campaigns on Google and social media platforms.",
      },
      {
        question: "How do you track campaign success?",
        answer:
          "We use tools like Google Analytics and Meta Pixel to measure KPIs and performance metrics.",
      },
      {
        question: "Is content marketing part of your services?",
        answer:
          "Yes, we offer blogging, content planning, and strategy to boost organic traffic.",
      },
    ],
  },
  {
    title: "DEVELOPMENT",
    faqs: [
      {
        question: "Do you build custom websites?",
        answer:
          "Yes, we specialize in custom-built websites tailored to your business needs and target audience.",
      },
      {
        question: "What platforms do you use for e-commerce development?",
        answer:
          "We use Shopify, WooCommerce, and custom solutions built with React, Node.js, and MongoDB.",
      },
      {
        question: "Is mobile responsiveness included?",
        answer:
          "Yes, all websites we develop are fully responsive across mobile, tablet, and desktop devices.",
      },
      {
        question: "Can I manage my own content?",
        answer:
          "Absolutely! We integrate CMS platforms like WordPress or custom CMS so you can easily manage your site content.",
      },
      {
        question: "Do you offer ongoing support and maintenance?",
        answer:
          "Yes, we provide maintenance packages that include updates, bug fixes, security monitoring, and performance optimization.",
      },
    ],
  },
];

export const officeData = {
  heading: "Corporate",
  highlight: "Office",
  locationName: "Digital Vidya, Gurgaon",
  address:
    "Unit No. 304 – B, 3rd Floor, JMD Regent Plaza, MG Road, Gurugram, Haryana – 122001",
  email: "info@digitalvidya.com",
  phone: "+91-8010033033",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.467478261944!2d77.0805174150823!3d28.614179791285388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d84519eec41%3A0x65e498e225fc0995!2sDigital%20Vidya!5e0!3m2!1sen!2sin!4v1663671765030!5m2!1sen!2sin",
};

export const upskillsData = [
  {
    id: 1,
    icon: FaChalkboardTeacher,
    title: "Advance Knowledge",
    subtitle:
      "Make your own website | Run live marketing campaigns | Live projects | Case studies",
    description:
      "DIDM has designed a practical oriented advanced digital marketing course that best suits from student to a marketing specialist. While learning, get exposure to website designing without coding, live projects, and case studies to enhance your skills.",
  },
  {
    id: 2,
    icon: FaUserGraduate,
    title: "Quality Training",
    subtitle:
      "Online and Offline Training | Flexible Batch Timings | Weekday and Weekend Batch | Micro Batch Size",
    description:
      "DIDM is committed to deliver the best digital marketing course learning outcomes with the facility of online/offline training and the option of choosing flexible batch timings by just dialing a number to our 24x7 customer support.",
  },
  {
    id: 3,
    icon: MdOutlineLightbulb,
    title: "Smart classNamees",
    subtitle:
      "Practical classNamees | E-resources | E-Learning | LMS learning | Assessments | Deep Learning Experience",
    description:
      "Being a professional training institute, DIDM believes in high-quality practical training as per market standard. We provide online training sessions through LMS and provide study materials in video and text format so that students can refer to the videos even if they miss any className.",
  },
  {
    id: 4,
    icon: PiCertificateBold,
    title: "Certified Expert",
    subtitle:
      "Industry Expert | Google Certified Trainers | Top Mentors | Experienced Faculty",
    description:
      "Our trainers are qualified Google certified industry experts who adopt an interactive approach during training and focus on every individual to make them industry-ready by clearing the concepts and doubts. They also help trainees in resume building and job placements.",
  },
];

export const contactBannerData = {
  title: "Contact Us",
  description: `Digital Vidya is a brand name of the Company “Engaging Ideas Private Limited”, 
which was registered with the Registrar of Companies in the year 2012 and having CIN U74900DL2012PTC232239. 
The registered office address of the Company is at C-7/6, Mianwali Nagar, Rohtak Road, New Delhi-110087 
and the corporate office address at Unit No. 304, 3rd Floor, JMD Regent Plaza, MG Road, Gurugram, Haryana-122001.`,
};

export const aboutInfo = {
  headingTop: "New Way To Learn",
  mainHeading: "Master In Digital Marketing Course",
  subHeading:
    "Theory | Live Practical | Implementation | 64+ Careers | 650+ Placement Partners",
  awardImages: [award1, award2, award3, award4],
  cards: [
    {
      title: "Our Vision — Empowering Digital Learning",
      content:
        "Our digital marketing courses aim to help you achieve every goal in just one shot with 36+ modules. You can choose according to your need and interest. We provide 100% placement assistance with life-time support through resume-building, Q&A sessions, Google certification, and NCoEM compliance.",
    },
    {
      title: "Our Mission — Shaping Future Marketers",
      content:
        "We guide every student with the help of top trainers and industry experts to make them market-ready. Our course is driven by innovation and a future-ready vision.",
    },
    {
      title: "Our Value — Excellence, Innovation, Integrity",
      content:
        "Our course is driven by innovation, excellence, and integrity. We provide customized training modules that suit every learner and work on client-like projects. We build rapport and skill that help learners succeed in practical scenarios.",
    },
  ],
};

export const steps = [
  {
    title: "Learn",
    description:
      "Upskill yourself by gaining insights from leading professionals' vast experience.",
    icon: FaLightbulb,
    badge: "Live classNamees + Self-Paced",
  },
  {
    title: "Practice",
    description:
      "Sharpen your skills by learning through course assignments, live projects, and regular assessments and quizzes.",
    icon: FaPenNib,
  },
  {
    title: "Ask",
    description:
      "Resolve your queries from industry experts with our dedicated 1:1 doubt-clearing sessions.",
    icon: FaQuestionCircle,
  },
  {
    title: "Build",
    description:
      "Craft a diverse portfolio and appealing resume, and optimize LinkedIn to showcase your digital marketing skills.",
    icon: FaFlag,
  },
];

export const certificates = [
  {
    id: 1,
    name: "Certificate 1",
    image: Cert1,
  },
  {
    id: 2,
    name: "Certificate 2",
    image: Cert2,
  },
  {
    id: 3,
    name: "Certificate 3",
    image: Cert3,
  },
  {
    id: 4,
    name: "Certificate 3",
    image: Cert4,
  },
  {
    id: 5,
    name: "Certificate 3",
    image: Cert5,
  },
];
export const topCompanies = [
  { id: 1, name: "Google", logo: Google },
  { id: 2, name: "Meta", logo: Walmart },
  { id: 3, name: "Expedia", logo: MamaEarth },
  { id: 4, name: "Lenskart", logo: Accenture },
  { id: 5, name: "OLA", logo: AirBnb },
  { id: 6, name: "Walmart", logo: Walmart },
  { id: 7, name: "Duolingo", logo: MamaEarth },
  { id: 8, name: "Airbnb", logo: AirBnb },
  { id: 9, name: "Adobe", logo: Google },
  { id: 10, name: "Mamaearth", logo: MamaEarth },
  { id: 11, name: "Accenture", logo: Accenture },
];
export const featureStats = [
  {
    id: 1,
    icon: FaUserGraduate,
    label: "STUDENTS",
    value: 9450,
    suffix: "+",
  },
  {
    id: 2,
    icon: FaSearch,
    label: "HIRING PARTNERS",
    value: 300,
    suffix: "+",
  },
  {
    id: 3,
    icon: FaHandHoldingUsd,
    label: "NO COST EMI",
    value: 5000,
    prefix: "₹",
  },
  {
    id: 4,
    icon: FaLightbulb,
    label: "BRANDS CASE STUDIES",
    value: 50,
    suffix: "+",
  },
];

export const courseOptions = [
  "Digital Marketing",
  "Web Development",
  "Graphic Design",
  "UI/UX Design",
  "Animation & Multimedia",
  "Others",
];

export const defaultFormData = {
  name: "",
  phone: "",
  course: "",
  email: "",
  message: "",
};
export const steps1 = [
  {
    title: "Learn",
    icon: "https://deen3evddmddt.cloudfront.net/images/courses-details/learn-icon.svg",
    iconFilled:
      "https://deen3evddmddt.cloudfront.net/images/courses-details/blue-learn-icon.svg",
    badge: "Live classNamees",
    badgeIcon:
      "https://deen3evddmddt.cloudfront.net/images/icons/ellipse-icon.svg",
    badge2: "Self-Paced",
    description:
      "Upskill yourself by gaining insights from leading professionals' vast experience.",
  },
  {
    title: "Practice",
    icon: "https://deen3evddmddt.cloudfront.net/images/courses-details/practice-icon.svg",
    iconFilled:
      "https://deen3evddmddt.cloudfront.net/images/courses-details/blue-practice-icon.svg",
    description:
      "Sharpen your skills by learning through course assignments, live projects, and regular assessments and quizzes.",
  },
  {
    title: "Ask",
    icon: "https://deen3evddmddt.cloudfront.net/images/courses-details/build-icon.svg",
    iconFilled:
      "https://deen3evddmddt.cloudfront.net/images/courses-details/blue-build-icon.svg",
    description:
      "Resolve your queries from industry experts with our dedicated 1:1 doubt-clearing sessions.",
  },
  {
    title: "Build",
    icon: "https://deen3evddmddt.cloudfront.net/images/courses-details/success-icon.svg",
    iconFilled:
      "https://deen3evddmddt.cloudfront.net/images/courses-details/blue-success-icon.svg",
    description:
      "Craft a diverse portfolio and appealing resume, and optimize LinkedIn to showcase your digital marketing skills.",
  },
];
export const bannerContent = {
  image: AboutBanner,
  heading: "Welcome to DG Royals",
  paragraph:
    "Empowering learners through industry-ready digital marketing courses, live mentorship, and hands-on training.",
};
export const features12 = [
  "Get Paid Internship & Placements",
  "100% Placement Assistance",
  "Interactive Live Training",
  "Creative Portfolio Building",
  "Weekly Assignments To Gain Realtime Practical Knowledge.",
  "Premium Workshops on Latest Updates",
];

export const images12 = [img1, img2, img3, img4];

export const almunies = [
  {
    name: "Anuj Sangal",
    title: "Youtuber",
    company: "Anuj classNamees",
    message:
      "Excellent institute for Digital Marketing and it has helped me to get my dream job and given me wings to fly. The Faculty members are very experienced and with the help of their best practices, we have gained a lot of practical knowledge.",
    image: img1,
    color: "text-red-600",
  },
  {
    name: "Nidhi Seth",
    title: "Graphic Designer",
    company: "ET Creatives",
    message:
      "I recommend DG Royals institute for Graphic Designing. I had a great experience studying with them and if they say they mean it, they really have an internship program along with a course & excellent placement program for all the trainees.",
    image: img2,
    color: "text-pink-600",
  },
  {
    name: "Rahul Sharma",
    title: "Graphic Designer",
    company: "Periscope",
    message:
      "I did a master's in Graphic Designing from DG Royals and I am so delighted to choose this institute since it has turned my dream into reality. Now I have an excellent knowledge of Industrial Brand designs, advertising & Illustrations.",
    image: img3,
    color: "text-red-500",
  },
];
export const services = [
  {
    id: 1,
    title: "Search Engine Optimization",
    description:
      "50,000+ websites ranked on top of search results across multiple countries",
    icon: "https://cdn-icons-png.flaticon.com/512/979/979585.png",
  },
  {
    id: 2,
    title: "Blogging",
    description: "5,000+ blogs published across various platforms and websites",
    icon: "https://cdn-icons-png.flaticon.com/512/3524/3524388.png",
  },
  {
    id: 3,
    title: "Paid Advertising",
    description: "400% average ROI for 4,000+ successful campaigns",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968527.png",
  },
  {
    id: 4,
    title: "Email Marketing",
    description:
      "15% email open rate & high CTR for 10,000+ successful campaigns",
    icon: "https://cdn-icons-png.flaticon.com/512/5611/5611180.png",
  },
  {
    id: 5,
    title: "Social Media Marketing",
    description: "Complete social media management across all major platforms",
    icon: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
  },
  {
    id: 6,
    title: "Website Development",
    description:
      "200+ websites developed with modern technologies and responsive design",
    icon: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
  },
  {
    id: 7,
    title: "Content Marketing",
    description:
      "High-quality content creation for websites, blogs, and social media",
    icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
  },
];

export const digitalMarketingPoints = [
  {
    type: "benefit",
    image: BannerC1,
    feature: blog3,
    heading: "Reach the Right Audience",
    para: "Target users who are most likely to convert.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2:
      "It reduces ad spend waste by eliminating unqualified impressions.",
    content3:
      "Targeted campaigns improve click-through and conversion rates significantly.",
  },
  {
    type: "benefit",
    image: BannerC1,
    feature: blog3,
    heading: "Improve Brand Awareness",
    para: "Make your brand more visible and memorable.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2:
      "Strategic messaging increases familiarity and trust among audiences.",
    content3: "More visibility leads to higher recall and brand preference.",
  },
  {
    type: "benefit",
    image: BannerC1,
    feature: blog3,
    heading: "Optimize Marketing Budget",
    para: "Get more results with less spend.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2: "Analytics tools help eliminate underperforming spend areas.",
    content3: "Optimization enables higher ROI from each marketing dollar.",
  },
  {
    type: "consequence",
    image: BannerC1,
    feature: blog3,
    heading: "Reach Your Target Audience",
    para: "Marketing efforts become too generic.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2: "Resources are wasted on users with no purchase intent.",
    content3: "Unfocused messaging fails to connect with key segments.",
  },
  {
    type: "consequence",
    image: BannerC1,
    feature: blog3,
    heading: "Stand Out From Competitors",
    para: "Your brand gets lost in the crowd.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2: "Poor differentiation weakens your competitive edge.",
    content3: "Without strategic positioning, your brand is forgettable.",
  },
  {
    type: "consequence",
    image: BannerC1,
    feature: blog3,
    heading: "Stand Out From Competitors",
    para: "Your brand gets lost in the crowd.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2: "Poor differentiation weakens your competitive edge.",
    content3: "Without strategic positioning, your brand is forgettable.",
  },
  {
    type: "consequence",
    image: BannerC1,
    feature: blog3,
    heading: "Stand Out From Competitors",
    para: "Your brand gets lost in the crowd.Your brand gets lost in the crowd.",
    content:
      "Need help with your corporate marketing strategy? Whether you own a startup, enterprise or multiple-location business, a Thrive digital strategy consultant can develop the right internet marketing strategies for your specific needs and demands.",
    content2: "Poor differentiation weakens your competitive edge.",
    content3: "Without strategic positioning, your brand is forgettable.",
  },
];

export const strategyData = {
  withStrategy: {
    title: "A Concrete Digital Marketing Strategy Allows You To:",
    points: [
      "Discover new opportunities",
      "Expand your market reach",
      "Improve audience targeting",
      "Align content with audience needs",
      "Generate leads, traffic, and conversions",
      "Gain visibility on search engines & social media",
      "Make data-backed decisions",
      "Track performance in real-time",
      "Build brand recognition",
      "Increase customer loyalty",
      "Achieve measurable goals",
      "Accomplish financial goals",
    ],
  },
  withoutStrategy: {
    title: "Without a Well-Defined Online Marketing Strategy, You Fail To:",
    points: [
      "Define clear goals",
      "Select the right marketing channels",
      "Keep your website optimized",
      "Deliver consistent messaging",
      "Manage resources and advertising budget wisely",
      "Collaborate effectively",
      "Evaluate campaign performance",
      "Measure cost and conversions",
      "Know your real audience",
      "Track and analyze results",
      "Adapt with market shifts and audience preferences",
      "Shape your competitive advantage",
    ],
  },
};
export const allFaqs = {
  "DIGITAL MARKETING": [
    {
      title: "What is digital marketing?",
      content:
        "Digital marketing is the use of online platforms and tools to promote products or services through channels like SEO, social media, email, and paid advertising.",
    },
    {
      title: "What are the benefits of digital marketing?",
      content:
        "Digital marketing offers numerous benefits including global reach, cost-effectiveness, measurable results, and the ability to target specific audiences.",
    },
    {
      title: "What is SEO?",
      content:
        "SEO stands for Search Engine Optimization. It is the practice of optimizing your website to rank higher in search engine results and increase organic traffic.",
    },
    {
      title: "What is PPC advertising?",
      content:
        "PPC stands for Pay-Per-Click. It is an online advertising model where advertisers pay each time a user clicks on one of their ads.",
    },
    {
      title: "What is social media marketing?",
      content:
        "Social media marketing involves promoting your products or services on social media platforms to increase brand awareness and drive traffic.",
    },
    {
      title: "What is content marketing?",
      content:
        "Content marketing is a strategic approach focused on creating and distributing valuable, relevant content to attract and engage a target audience.",
    },
    {
      title: "What is email marketing?",
      content:
        "Email marketing is the use of emails to send advertisements, request business, or solicit sales or donations, and is meant to build loyalty, trust, or brand awareness.",
    },
    {
      title: "How can digital marketing help my business?",
      content:
        "Digital marketing can help your business grow by increasing your online presence, reaching a larger audience, and engaging with customers in real-time.",
    },
    {
      title: "What is the difference between organic and paid marketing?",
      content:
        "Organic marketing refers to unpaid strategies like SEO and content marketing, while paid marketing involves paid advertisements like PPC and social media ads.",
    },
    {
      title: "How do I measure the success of my digital marketing efforts?",
      content:
        "Success can be measured using various metrics such as website traffic, conversion rates, click-through rates, and return on investment (ROI).",
    },
  ],
  DEVELOPMENT: [
    {
      title: "What is web development?",
      content:
        "Web development involves building and maintaining websites and web applications using technologies like HTML, CSS, JavaScript, and backend frameworks.",
    },
  ],
  DESIGN: [
    {
      title: "What is UI/UX design?",
      content:
        "UI stands for User Interface, and UX stands for User Experience. It focuses on the look, feel, and usability of digital products.",
    },
  ],
  BRANDING: [
    {
      title: "Why is branding important for a business?",
      content:
        "Branding helps create a unique identity and builds trust with customers, making your business more memorable and recognizable.",
    },
  ],
};

export const seoPlans = [
  {
    name: "Silver",
    features: [
      "Business Analysis",
      "Keyword Research",
      "Targeted Keywords - Up to 40 keywords (Home + Blog)",
      "Content Creation",
      "Content Optimization",
      "Website Presence Structurization",
      "Blogs - 10–15 / Month",
      "PPT/PDFs - 1–8 / Month",
      "Image Submission",
      "For Videos - Contact us",
      "Monthly Reports",
    ],
  },
  {
    name: "Gold",
    features: [
      "Business Analysis",
      "Keyword Research",
      "Targeted Keywords - Up to 100 keywords (Home + Blog)",
      "Content Creation",
      "Content Optimization",
      "Website Presence Structurization",
      "Blogs - 16–25 / Month",
      "PPT/PDFs - 7–11 / Month",
      "Image Submission",
      "For Videos - Contact us",
      "Monthly Reports",
    ],
  },
  {
    name: "Diamond",
    features: [
      "Business Analysis",
      "Keyword Research",
      "Targeted Keywords - Up to 200 keywords (Home + Blog)",
      "Content Creation",
      "Content Optimization",
      "Website Presence Structurization",
      "Blogs - 26–40 / Month",
      "PPT/PDFs - 12–20 / Month",
      "Image Submission",
      "For Videos - Contact us",
      "Monthly Reports",
    ],
  },
];
export const courseData = [
  {
    id: 1,
    title: "React for Beginners",
    image: Banner1,
    duration: "6h 30m",
    totalHours: 6.5,
    watchedHours: 3.25,
    badge: "Blend",
    level: "Beginner",
    tags: ["React", "JavaScript"],
    progress: true,
    modules: [
      {
        moduleTitle: "Module 1: Introduction",
        completed: true,
        description: "Basic overview and setup",
        topics: [
          {
            topicTitle: "Welcome",
           contents: [
  {
    type: "video",
    name: "Welcome to the Course",
    duration: "5m",
    url: CourseVideo
  },
  {
    type: "pdf",
    name: "Welcome to the Course PDF",
    duration: "",
    url: coursePdf
  },
  {
    type: "image",
    name: "Certificate Example",
    duration: "",
    url: Cert1
  }
]
          },
          {
            topicTitle: "Tools Setup",
            contents: [
              {
                type: "video",
                name: "Installing Tools",
                duration: "10m",
                url: CourseVideo
              },
              {
                type: "pdf",
                name: "Environment Setup",
                duration: "8m",
                url: coursePdf
              }
            ]
          },
          {
            topicTitle: "Course Overview",
            contents: [
              {
                type: "video",
                name: "Course Structure",
                duration: "6m",
                url: CourseVideo
              }
            ]
          },
          {
            topicTitle: "Module 1 Quiz",
            contents: [
              {
                type: "test",
                name: "Module 1 Quiz",
                questions: [
                  {
                    question: "What is React?",
                    options: ["A library", "A framework", "A database", "A language"],
                    answer: "A library"
                  },
                  {
                    question: "Which company developed React?",
                    options: ["Google", "Facebook", "Microsoft", "Amazon"],
                    answer: "Facebook"
                  },
                  {
                    question: "What is JSX?",
                    options: [
                      "A CSS preprocessor",
                      "A JavaScript extension",
                      "A database",
                      "A testing tool"
                    ],
                    answer: "A JavaScript extension"
                  },
                  {
                    question: "Which hook is used for state in React?",
                    options: ["useState", "useEffect", "useRef", "useContext"],
                    answer: "useState"
                  },
                  {
                    question: "What is the command to create a new React app?",
                    options: [
                      "npx create-react-app my-app",
                      "npm install react",
                      "react new app",
                      "npm start"
                    ],
                    answer: "npx create-react-app my-app"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        moduleTitle: "Module 2: HTML & CSS",
        completed: true,
        description: "Learn structure and styling",
        topics: [
          {
            topicTitle: "HTML Basics",
            contents: [
              {
                type: "video",
                name: "HTML Introduction",
                duration: "15m",
                url: CourseVideo
              }
            ]
          },
          {
            topicTitle: "CSS Flexbox",
            contents: [
              {
                type: "pdf",
                name: "Flexbox Layout",
                duration: "18m",
                url: coursePdf
              }
            ]
          },
          {
            topicTitle: "Responsive Design",
            contents: [
              {
                type: "video",
                name: "Responsive Techniques",
                duration: "20m",
                url: CourseVideo
              }
            ]
          },
          {
            topicTitle: "Module 2 Quiz",
            contents: [
              {
                type: "test",
                name: "Module 2 Quiz",
                questions: [
                  {
                    question: "What does HTML stand for?",
                    options: [
                      "Hyper Text Markup Language",
                      "Home Tool Markup Language",
                      "Hyperlinks and Text Markup Language",
                      "Hyper Tool Markup Language"
                    ],
                    answer: "Hyper Text Markup Language"
                  },
                  {
                    question: "Which tag is used for the largest heading?",
                    options: ["<h1>", "<heading>", "<head>", "<h6>"],
                    answer: "<h1>"
                  },
                  {
                    question: "Which property is used for flex layout?",
                    options: ["display: flex", "flex: display", "layout: flex", "flexbox: true"],
                    answer: "display: flex"
                  },
                  {
                    question: "Which CSS property makes a site responsive?",
                    options: ["media queries", "float", "position", "z-index"],
                    answer: "media queries"
                  },
                  {
                    question: "Which tag is used for a paragraph?",
                    options: ["<p>", "<para>", "<text>", "<paragraph>"],
                    answer: "<p>"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        moduleTitle: "Module 3: JavaScript Essentials",
        completed: false,
        description: "Understand core JS concepts",
        topics: [
          {
            topicTitle: "Variables",
            contents: [
              {
                type: "video",
                name: "JavaScript Variables Explained",
                duration: "12m",
                url: CourseVideo
              }
            ]
          },
          {
            topicTitle: "Functions",
            contents: [
              {
                type: "pdf",
                name: "Function Basics",
                duration: "10m",
                url: coursePdf
              }
            ]
          },
          {
            topicTitle: "DOM Manipulation",
            contents: [
              {
                type: "video",
                name: "Intro to the DOM",
                duration: "14m",
                url: CourseVideo
              }
            ]
          },
          {
            topicTitle: "Module 3 Quiz",
            contents: [
              {
                type: "test",
                name: "Module 3 Quiz",
                questions: [
                  {
                    question: "Which keyword declares a variable in JS?",
                    options: ["var", "let", "const", "All of the above"],
                    answer: "All of the above"
                  },
                  {
                    question: "How do you write a function in JS?",
                    options: [
                      "function myFunc() {}",
                      "func myFunc() {}",
                      "def myFunc() {}",
                      "function:myFunc() {}"
                    ],
                    answer: "function myFunc() {}"
                  },
                  {
                    question: "What does DOM stand for?",
                    options: [
                      "Document Object Model",
                      "Data Object Model",
                      "Document Oriented Model",
                      "Desktop Object Model"
                    ],
                    answer: "Document Object Model"
                  },
                  {
                    question: "Which method selects an element by ID?",
                    options: [
                      "getElementById",
                      "getElement",
                      "querySelectorAll",
                      "getById"
                    ],
                    answer: "getElementById"
                  },
                  {
                    question: "Which symbol is used for comments in JS?",
                    options: [
                      "// comment",
                      "<!-- comment -->",
                      "# comment",
                      "** comment **"
                    ],
                    answer: "// comment"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    finalTest: {
      name: "Final Course Test",
      type: "test",
      questions: [
        {
          question: "What is the virtual DOM?",
          options: [
            "A lightweight copy of the real DOM",
            "A database",
            "A CSS property",
            "A React hook"
          ],
          answer: "A lightweight copy of the real DOM"
        },
        {
          question: "Which method is used to render React elements?",
          options: [
            "ReactDOM.render()",
            "render()",
            "React.render()",
            "DOM.render()"
          ],
          answer: "ReactDOM.render()"
        },
        {
          question: "What is the purpose of useEffect hook?",
          options: [
            "To manage state",
            "To handle side effects",
            "To render components",
            "To create context"
          ],
          answer: "To handle side effects"
        },
        {
          question: "How can you pass data from a parent component to a child component in React?",
          options: [
            "Using props",
            "Using state",
            "Using context",
            "All of the above"
          ],
          answer: "Using props"
        },
        {
          question: "What does the key prop do in React lists?",
          options: [
            "Identifies elements in the DOM",
            "Sets the order of elements",
            "Binds data to components",
            "Tracks component state"
          ],
          answer: "Identifies elements in the DOM"
        },
        {
          question: "Which of the following is a valid use of the spread operator in React?",
          options: [
            "const newState = {...state, updatedField: value}",
            "const newState = state...",
            "const newState = {...state}",
            "Both A and C"
          ],
          answer: "Both A and C"
        },
        {
          question: "What is the default port for React development server?",
          options: [
            "3000",
            "8000",
            "5000",
            "4000"
          ],
          answer: "3000"
        },
        {
          question: "How do you create a context in React?",
          options: [
            "const MyContext = React.createContext()",
            "const MyContext = createContext()",
            "const MyContext = React.Context()",
            "const MyContext = createContext.React()"
          ],
          answer: "const MyContext = React.createContext()"
        },
        {
          question: "What is the purpose of the useReducer hook?",
          options: [
            "To manage complex state logic",
            "To perform side effects",
            "To memoize values",
            "To create refs"
          ],
          answer: "To manage complex state logic"
        },
        {
          question: "Which of the following is NOT a valid React lifecycle method?",
          options: [
            "componentDidMount",
            "componentDidUpdate",
            "componentWillUnmount",
            "rendered"
          ],
          answer: "rendered"
        },
        {
          question: "How can you optimize performance for a React application?",
          options: [
            "By using PureComponent",
            "By implementing shouldComponentUpdate",
            "By using React.memo",
            "All of the above"
          ],
          answer: "All of the above"
        },
        {
          question: "What is the purpose of the React.Fragment component?",
          options: [
            "To group multiple elements without adding extra nodes to the DOM",
            "To apply CSS styles to a group of elements",
            "To manage state for a group of components",
            "To handle events for multiple elements"
          ],
          answer: "To group multiple elements without adding extra nodes to the DOM"
        },
        {
          question: "Which hook would you use to access the previous state in a functional component?",
          options: [
            "useEffect",
            "useState",
            "useRef",
            "useContext"
          ],
          answer: "useRef"
        },
        {
          question: "What is the purpose of the keyExtractor prop in React Native FlatList?",
          options: [
            "To extract unique keys for items in the list",
            "To define the layout of the list",
            "To handle item press events",
            "To optimize image loading"
          ],
          answer: "To extract unique keys for items in the list"
        },
        {
          question: "How do you prevent a component from re-rendering in React?",
          options: [
            "By using shouldComponentUpdate lifecycle method",
            "By returning false in render method",
            "By using React.PureComponent",
            "Both A and C"
          ],
          answer: "Both A and C"
        },
        {
          question: "What is the purpose of the useLayoutEffect hook?",
          options: [
            "To read layout from the DOM and synchronously re-render",
            "To perform side effects after rendering",
            "To subscribe to context changes",
            "To manage local component state"
          ],
          answer: "To read layout from the DOM and synchronously re-render"
        },
        {
          question: "Which of the following is a common performance optimization in React?",
          options: [
            "Using inline functions in render",
            "Binding methods in the constructor",
            "Using array index as key in lists",
            "All of the above"
          ],
          answer: "Binding methods in the constructor"
        },
        {
          question: "What does the React.StrictMode component do?",
          options: [
            "It activates additional checks and warnings for its descendants",
            "It optimizes performance by skipping certain checks",
            "It is used to define routes in a React app",
            "It is a legacy component and has no effect in modern React"
          ],
          answer: "It activates additional checks and warnings for its descendants"
        },
        {
          question: "How can you share state between components in React?",
          options: [
            "By lifting state up to the nearest common ancestor",
            "By using local storage",
            "By passing props down the component tree",
            "Both A and C"
          ],
          answer: "Both A and C"
        },
        {
          question: "What is the purpose of the useImperativeHandle hook?",
          options: [
            "To customize the instance value that is exposed when using ref",
            "To manage complex state logic",
            "To perform side effects in function components",
            "To memoize expensive calculations"
          ],
          answer: "To customize the instance value that is exposed when using ref"
        },
        {
          question: "Which of the following is NOT a valid way to style a React component?",
          options: [
            "Inline styles",
            "CSS stylesheets",
            "Styled-components",
            "React-style"
          ],
          answer: "React-style"
        },
        {
          question: "How do you handle errors in a React application?",
          options: [
            "By using try-catch blocks",
            "By using error boundaries",
            "By using the componentDidCatch lifecycle method",
            "All of the above"
          ],
          answer: "All of the above"
        },
        {
          question: "What is the purpose of the useDebugValue hook?",
          options: [
            "To display a label in React DevTools for custom hooks",
            "To log values to the console",
            "To trigger a re-render",
            "To manage focus on elements"
          ],
          answer: "To display a label in React DevTools for custom hooks"
        },
        {
          question: "Which of the following can be a reason for a component to re-render?",
          options: [
            "Changing state",
            "Changing props",
            "Context value changes",
            "All of the above"
          ],
          answer: "All of the above"
        },
        {
          question: "What is the use of the React.memo function?",
          options: [
            "To memoize a component and prevent unnecessary re-renders",
            "To optimize performance of class components",
            "To create higher-order components",
            "To manage global state"
          ],
          answer: "To memoize a component and prevent unnecessary re-renders"
        },
        {
          question: "How do you create a ref in a functional component?",
          options: [
            "const myRef = React.createRef()",
            "const myRef = useRef()",
            "const myRef = createRef()",
            "const myRef = useCreateRef()"
          ],
          answer: "const myRef = useRef()"
        },
        {
          question: "What is the purpose of the useTransition hook?",
          options: [
            "To manage loading states for async updates",
            "To perform side effects in function components",
            "To memoize expensive calculations",
            "To create context providers"
          ],
          answer: "To manage loading states for async updates"
        },
        {
          question: "Which of the following is a feature of React 18?",
          options: [
            "Automatic batching of updates",
            "Suspense for data fetching",
            "Concurrent rendering",
            "All of the above"
          ],
          answer: "All of the above"
        },
        {
          question: "How do you enable strict mode checks in React?",
          options: [
            "By wrapping components in <React.StrictMode>",
            "By setting strictMode: true in config",
            "By using the --strict flag when starting the app",
            "Strict mode is always enabled in React"
          ],
          answer: "By wrapping components in <React.StrictMode>"
        },
        {
          question: "What is the effect of returning false in a component's render method?",
          options: [
            "Prevents the component from rendering",
            "Renders the component but skips updates",
            "Causes an error",
            "Has no effect"
          ],
          answer: "Prevents the component from rendering"
        },
        {
          question: "Which of the following hooks can only be used in class components?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "None, all are available in class components"
          ],
          answer: "None, all are available in class components"
        },
        {
          question: "What is the purpose of the useContext hook?",
          options: [
            "To access context values in a functional component",
            "To create a context provider",
            "To memoize context values",
            "To trigger a re-render when context changes"
          ],
          answer: "To access context values in a functional component"
        },
        {
          question: "How do you optimize a React app for production?",
          options: [
            "By running npm run build",
            "By using React DevTools",
            "By setting NODE_ENV to production",
            "Both A and C"
          ],
          answer: "Both A and C"
        },
        {
          question: "What is the purpose of the useCallback hook?",
          options: [
            "To memoize functions and prevent unnecessary re-creations",
            "To manage component state",
            "To perform side effects",
            "To create context providers"
          ],
          answer: "To memoize functions and prevent unnecessary re-creations"
        }
    ]
      }
  }

];
export const privacyTabs = [
  {
    title: "Marketplace & Website",
    key: "marketplace",
    children: [
      {
        title: "Data Collection",
        key: "marketplace_data_collection",
        content:
          "We collect user behavior data including clicks, course enrollments, and preferences to personalize your experience.",
      },
      {
        title: "Cookies Policy",
        key: "marketplace_cookies",
        content:
          "Our website uses cookies to track session data, improve services, and for analytics purposes.",
      },
    ],
  },
  {
    title: "Instructors",
    key: "instructors",
    children: [
      {
        title: "Instructor Obligations",
        key: "instructor_obligations",
        content:
          "Instructors must adhere to content policies and update course materials regularly to reflect accuracy.",
      },
    ],
  },
  {
    title: "Udemy Business",
    key: "business",
    children: [
      {
        title: "Business Usage",
        key: "business_usage",
  content: `
  <h1>Instructor Terms</h1>
  <p>This was updated on Nov 2024</p>
  <h2>1. Instructor Obligations</h2>
  <ul>
    <li>You confirm all rights.</li>
    <li>You do not spam.</li>
  </ul>
`
      },
    ],
  },
  {
    title: "Suppliers",
    key: "suppliers",
    children: [
      {
        title: "Data Compliance",
        key: "supplier_data_compliance",
     content: `
  <h1>Instructor Terms</h1>
  <p>This was updated on Nov 2024</p>
  <h2>1. Instructor Obligations</h2>
  <ul>
    <li>You confirm all rights.</li>
    <li>You do not spam.</li>
  </ul>
`
      },
    ],
  },
  {
    title: "Partners",
    key: "partners",
    children: [
     {
  title: "Partnership Guidelines",
  key: "partner_guidelines",
content: `
  <h1>Instructor Terms</h1>
  <p>This was updated on Nov 2024</p>
  <h2>1. Instructor Obligations</h2>
  <ul>
    <li>You confirm all rights.</li>
    <li>You do not spam.</li>
  </ul>
`
}

    ],
  },
];


export const testQuestions = [
  {
    id: 1,
    type: "single",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswers: ["Paris"],
  },
  {
    id: 2,
    type: "multi",
    question: "Which of the following are programming languages?",
    options: ["HTML", "Python", "JavaScript", "CSS"],
    correctAnswers: ["Python", "JavaScript"],
  },
  {
    id: 3,
    type: "single",
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
    correctAnswers: ["Harper Lee"],
  },
  {
    id: 4,
    type: "multi",
    question: "Select the prime numbers.",
    options: ["2", "4", "5", "9"],
    correctAnswers: ["2", "5"],
  },
  {
    id: 5,
    type: "single",
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Syntax",
      "Computer Style Sheets",
    ],
    correctAnswers: ["Cascading Style Sheets"],
  },
  {
    id: 6,
    type: "multi",
    question: "Which of the following are fruits?",
    options: ["Carrot", "Apple", "Potato", "Banana"],
    correctAnswers: ["Apple", "Banana"],
  },
  {
    id: 7,
    type: "single",
    question: "What is the boiling point of water at sea level?",
    options: ["100°C", "90°C", "80°C", "120°C"],
    correctAnswers: ["100°C"],
  },
  {
    id: 8,
    type: "multi",
    question: "Which are front-end frameworks?",
    options: ["React", "Django", "Angular", "Laravel"],
    correctAnswers: ["React", "Angular"],
  },
  {
    id: 9,
    type: "single",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Jupiter", "Venus", "Mars"],
    correctAnswers: ["Mars"],
  },
  {
    id: 10,
    type: "multi",
    question: "Which of the following are mammals?",
    options: ["Shark", "Dog", "Whale", "Eagle"],
    correctAnswers: ["Dog", "Whale"],
  },
  {
    id: 11,
    type: "single",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correctAnswers: ["Pacific"],
  },
  {
    id: 12,
    type: "multi",
    question: "Which countries are in Europe?",
    options: ["Brazil", "Germany", "Spain", "Canada"],
    correctAnswers: ["Germany", "Spain"],
  },
  {
    id: 13,
    type: "single",
    question: "What is H2O commonly known as?",
    options: ["Salt", "Water", "Oxygen", "Hydrogen"],
    correctAnswers: ["Water"],
  },
  {
    id: 14,
    type: "multi",
    question: "Which are types of clouds?",
    options: ["Cirrus", "Cumulus", "Nimbus", "Borealis"],
    correctAnswers: ["Cirrus", "Cumulus", "Nimbus"],
  },
  {
    id: 15,
    type: "single",
    question: "What is the square root of 64?",
    options: ["6", "8", "10", "12"],
    correctAnswers: ["8"],
  },
  {
    id: 16,
    type: "multi",
    question: "Which are valid JavaScript data types?",
    options: ["String", "Boolean", "Float", "Object"],
    correctAnswers: ["String", "Boolean", "Object"],
  },
  {
    id: 17,
    type: "single",
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    correctAnswers: ["Carbon Dioxide"],
  },
  {
    id: 18,
    type: "multi",
    question: "Which of these are continents?",
    options: ["Asia", "Antarctica", "Greenland", "Africa"],
    correctAnswers: ["Asia", "Antarctica", "Africa"],
  },
  {
    id: 19,
    type: "single",
    question: "Which company created the iPhone?",
    options: ["Google", "Microsoft", "Apple", "Samsung"],
    correctAnswers: ["Apple"],
  },
  {
    id: 20,
    type: "multi",
    question: "Which are valid HTML tags?",
    options: ["<div>", "<span>", "<loop>", "<img>"],
    correctAnswers: ["<div>", "<span>", "<img>"],
  },
  {
    id: 21,
    type: "single",
    question: "What is the capital of Japan?",
    options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"],
    correctAnswers: ["Tokyo"],
  },
  {
    id: 22,
    type: "multi",
    question: "Which of these are web browsers?",
    options: ["Chrome", "Firefox", "Photoshop", "Safari"],
    correctAnswers: ["Chrome", "Firefox", "Safari"],
  },
  {
    id: 23,
    type: "single",
    question: "Who painted the Mona Lisa?",
    options: ["Picasso", "Van Gogh", "Da Vinci", "Rembrandt"],
    correctAnswers: ["Da Vinci"],
  },
  {
    id: 24,
    type: "multi",
    question: "Select the even numbers.",
    options: ["1", "2", "3", "4"],
    correctAnswers: ["2", "4"],
  },
  {
    id: 25,
    type: "single",
    question: "Which organ pumps blood in the human body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    correctAnswers: ["Heart"],
  },
  {
    id: 26,
    type: "multi",
    question: "Select the colors in the rainbow.",
    options: ["Red", "Black", "Violet", "Green"],
    correctAnswers: ["Red", "Violet", "Green"],
  },
  {
    id: 27,
    type: "single",
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswers: ["7"],
  },
  {
    id: 28,
    type: "multi",
    question: "Which are basic math operations?",
    options: ["Addition", "Multiplication", "Sorting", "Subtraction"],
    correctAnswers: ["Addition", "Multiplication", "Subtraction"],
  },
  {
    id: 29,
    type: "single",
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    correctAnswers: ["Au"],
  },
  {
    id: 30,
    type: "multi",
    question: "Which are operating systems?",
    options: ["Linux", "Windows", "Google", "macOS"],
    correctAnswers: ["Linux", "Windows", "macOS"],
  },
];




// ll