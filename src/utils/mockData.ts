
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  categoryId: string;
}

export interface CourseSession {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  subcategory: string;
  featured: boolean;
  sessions: CourseSession[];
}

export interface Statistic {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

// Mock data for categories
export const categories: Category[] = [
  {
    id: "cat1",
    name: "Leadership",
    slug: "leadership",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    subcategories: [
      {
        id: "subcat1",
        name: "Executive Leadership",
        slug: "executive-leadership",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        categoryId: "cat1"
      },
      {
        id: "subcat2",
        name: "Team Management",
        slug: "team-management",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        categoryId: "cat1"
      }
    ]
  },
  {
    id: "cat2",
    name: "Digital Marketing",
    slug: "digital-marketing",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2070&auto=format&fit=crop",
    subcategories: [
      {
        id: "subcat3",
        name: "Social Media",
        slug: "social-media",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop",
        categoryId: "cat2"
      },
      {
        id: "subcat4",
        name: "SEO Strategies",
        slug: "seo-strategies",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
        categoryId: "cat2"
      }
    ]
  },
  {
    id: "cat3",
    name: "Project Management",
    slug: "project-management",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    subcategories: [
      {
        id: "subcat5",
        name: "Agile Methods",
        slug: "agile-methods",
        image: "https://images.unsplash.com/photo-1570126688035-1e6adbd61053?q=80&w=2091&auto=format&fit=crop",
        categoryId: "cat3"
      },
      {
        id: "subcat6",
        name: "Scrum Master",
        slug: "scrum-master",
        image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop",
        categoryId: "cat3"
      }
    ]
  },
  {
    id: "cat4",
    name: "HR & Talent",
    slug: "hr-talent",
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?q=80&w=2070&auto=format&fit=crop",
    subcategories: [
      {
        id: "subcat7",
        name: "Recruitment",
        slug: "recruitment",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop",
        categoryId: "cat4"
      },
      {
        id: "subcat8",
        name: "Employee Development",
        slug: "employee-development",
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop",
        categoryId: "cat4"
      }
    ]
  }
];

// Mock data for courses
export const courses: Course[] = [
  {
    id: "course1",
    title: "Executive Leadership Excellence",
    slug: "executive-leadership-excellence",
    shortDescription: "Master the art of executive leadership in this comprehensive training program.",
    fullDescription: "Elevate your leadership skills with our Executive Leadership Excellence program. This comprehensive training is designed for senior managers and executives who want to lead with vision, inspire their teams, and drive organizational success. Throughout this course, you'll learn proven strategies for effective decision-making, managing complex organizational challenges, and developing a leadership style that builds trust and motivates your team. With practical exercises, case studies, and personalized feedback, you'll emerge as a more confident and capable leader ready to take your organization to new heights.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    category: "cat1",
    subcategory: "subcat1",
    featured: true,
    sessions: [
      {
        id: "session1",
        startDate: "2024-06-15",
        endDate: "2024-06-18",
        location: "New York City, NY"
      },
      {
        id: "session2",
        startDate: "2024-08-10",
        endDate: "2024-08-13",
        location: "San Francisco, CA"
      }
    ]
  },
  {
    id: "course2",
    title: "Building High-Performance Teams",
    slug: "building-high-performance-teams",
    shortDescription: "Learn strategies for developing and managing high-performing teams.",
    fullDescription: "Discover how to build and lead high-performance teams in any industry. This transformative course provides a deep dive into team dynamics, motivation techniques, conflict resolution, and collaborative problem-solving. You'll learn how to identify team members' strengths, delegate effectively, and create an environment where innovation thrives. Through interactive workshops and real-world scenarios, you'll develop practical skills for overcoming team challenges and fostering a culture of excellence. By the end of this training, you'll have the tools and confidence to lead teams that consistently exceed expectations and drive organizational success.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    category: "cat1",
    subcategory: "subcat2",
    featured: false,
    sessions: [
      {
        id: "session3",
        startDate: "2024-07-20",
        endDate: "2024-07-22",
        location: "Chicago, IL"
      }
    ]
  },
  {
    id: "course3",
    title: "Social Media Marketing Mastery",
    slug: "social-media-marketing-mastery",
    shortDescription: "Comprehensive training on effective social media marketing strategies.",
    fullDescription: "Master the art and science of social media marketing with our comprehensive training program. This course covers everything from platform-specific strategies to content creation, analytics, and paid advertising. You'll learn how to build a cohesive social media strategy aligned with business goals, create engaging content that resonates with your target audience, and measure ROI effectively. Our expert instructors will guide you through the latest trends, algorithm changes, and best practices across all major platforms. By the end of this course, you'll have the skills to elevate your brand's social presence, increase engagement, and drive measurable business results through social media.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop",
    category: "cat2",
    subcategory: "subcat3",
    featured: true,
    sessions: [
      {
        id: "session4",
        startDate: "2024-06-05",
        endDate: "2024-06-07",
        location: "Austin, TX"
      },
      {
        id: "session5",
        startDate: "2024-09-18",
        endDate: "2024-09-20",
        location: "Miami, FL"
      }
    ]
  },
  {
    id: "course4",
    title: "Advanced SEO Techniques",
    slug: "advanced-seo-techniques",
    shortDescription: "Master advanced SEO strategies to improve website visibility and rankings.",
    fullDescription: "Take your SEO skills to the next level with our Advanced SEO Techniques course. Designed for marketers with a foundational understanding of SEO, this intensive training dives deep into technical optimization, advanced keyword research, link building strategies, and search algorithm analysis. You'll learn how to conduct comprehensive SEO audits, optimize for voice search and mobile, implement structured data, and develop content strategies that drive organic traffic. Our expert instructors share real-world case studies and practical techniques that have helped businesses achieve and maintain top search rankings. By the end of this course, you'll be equipped with cutting-edge SEO knowledge to outperform competitors in even the most challenging industries.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
    category: "cat2",
    subcategory: "subcat4",
    featured: false,
    sessions: [
      {
        id: "session6",
        startDate: "2024-08-25",
        endDate: "2024-08-27",
        location: "Seattle, WA"
      }
    ]
  },
  {
    id: "course5",
    title: "Agile Project Management",
    slug: "agile-project-management",
    shortDescription: "Learn to implement Agile methodologies for successful project delivery.",
    fullDescription: "Transform your project management approach with our comprehensive Agile Project Management course. This hands-on training equips you with the principles, practices, and tools needed to successfully implement Agile methodologies in any organization. You'll learn how to plan and execute sprints, facilitate effective ceremonies, manage backlogs, and track progress using Agile metrics. Our expert instructors will guide you through real-world applications of Scrum, Kanban, and other Agile frameworks, helping you understand when and how to apply each approach. Through interactive exercises and case studies, you'll develop the skills to foster team collaboration, respond to change effectively, and deliver high-value products that meet customer needs.",
    image: "https://images.unsplash.com/photo-1570126688035-1e6adbd61053?q=80&w=2091&auto=format&fit=crop",
    category: "cat3",
    subcategory: "subcat5",
    featured: true,
    sessions: [
      {
        id: "session7",
        startDate: "2024-07-10",
        endDate: "2024-07-12",
        location: "Denver, CO"
      },
      {
        id: "session8",
        startDate: "2024-10-15",
        endDate: "2024-10-17",
        location: "Boston, MA"
      }
    ]
  },
  {
    id: "course6",
    title: "Certified Scrum Master Training",
    slug: "certified-scrum-master-training",
    shortDescription: "Comprehensive training to prepare for the Certified Scrum Master exam.",
    fullDescription: "Prepare for Scrum Master certification with our comprehensive training program. This intensive course provides a deep understanding of Scrum principles, values, and practices as outlined in the Scrum Guide. You'll learn how to effectively facilitate Scrum events, coach development teams, and support Product Owners in backlog management. Our expert trainers will guide you through the challenges of implementing Scrum in various organizational contexts and equip you with strategies to overcome common obstacles. Through practical exercises, simulations, and case studies, you'll develop the knowledge and confidence to pass your certification exam and excel in your role as a Scrum Master. This course includes exam preparation materials and ongoing support during your certification journey.",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop",
    category: "cat3",
    subcategory: "subcat6",
    featured: false,
    sessions: [
      {
        id: "session9",
        startDate: "2024-09-05",
        endDate: "2024-09-06",
        location: "Atlanta, GA"
      }
    ]
  },
  {
    id: "course7",
    title: "Strategic Recruitment & Selection",
    slug: "strategic-recruitment-selection",
    shortDescription: "Learn advanced techniques for effective recruitment and candidate selection.",
    fullDescription: "Master the art and science of strategic recruitment with our comprehensive training program. This course equips HR professionals and hiring managers with cutting-edge strategies to attract, assess, and secure top talent in competitive markets. You'll learn how to develop compelling employer value propositions, design structured interview processes, utilize behavioral and situational assessments, and implement data-driven selection methods. Our expert instructors will guide you through creating inclusive recruitment practices, optimizing candidate experience, and measuring recruitment effectiveness. With a blend of case studies, role-playing exercises, and practical tools, you'll develop the skills to build high-performing teams through strategic recruitment and selection processes that align with your organization's goals and culture.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop",
    category: "cat4",
    subcategory: "subcat7",
    featured: true,
    sessions: [
      {
        id: "session10",
        startDate: "2024-06-20",
        endDate: "2024-06-21",
        location: "Philadelphia, PA"
      },
      {
        id: "session11",
        startDate: "2024-08-15",
        endDate: "2024-08-16",
        location: "Dallas, TX"
      }
    ]
  },
  {
    id: "course8",
    title: "Employee Development & Retention Strategies",
    slug: "employee-development-retention-strategies",
    shortDescription: "Comprehensive strategies for employee development, engagement, and retention.",
    fullDescription: "Discover proven strategies for developing and retaining your organization's most valuable asset—its people. This comprehensive course equips HR professionals and managers with the tools and techniques to create effective development plans, foster employee engagement, and build a culture that attracts and retains top talent. You'll learn how to design career pathways, implement mentoring and coaching programs, and create learning opportunities that align with both organizational needs and employee aspirations. Our expert instructors will guide you through developing recognition systems, conducting meaningful performance conversations, and measuring the impact of your retention initiatives. Through case studies, workshops, and actionable templates, you'll develop a strategic approach to employee development that drives engagement, reduces turnover, and strengthens your organization's competitive advantage.",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop",
    category: "cat4",
    subcategory: "subcat8",
    featured: false,
    sessions: [
      {
        id: "session12",
        startDate: "2024-07-25",
        endDate: "2024-07-26",
        location: "Minneapolis, MN"
      }
    ]
  }
];

// Mock data for statistics
export const statistics: Statistic[] = [
  {
    id: "stat1",
    value: 15,
    label: "Years of Excellence",
    suffix: "+"
  },
  {
    id: "stat2",
    value: 50000,
    label: "Participants Trained",
    suffix: "+"
  },
  {
    id: "stat3",
    value: 1200,
    label: "Corporate Clients",
    suffix: "+"
  },
  {
    id: "stat4",
    value: 120,
    label: "Expert Trainers",
    suffix: "+"
  },
  {
    id: "stat5",
    value: 25,
    label: "Countries Served",
    suffix: "+"
  }
];

// Mock data for hero slider
export const heroSlides: Slide[] = [
  {
    id: "slide1",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    title: "Transform Your Potential",
    subtitle: "Expert-led training programs to elevate your skills and advance your career."
  },
  {
    id: "slide2",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    title: "Develop Your Team",
    subtitle: "Comprehensive training solutions customized for your organization's unique needs."
  },
  {
    id: "slide3",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
    title: "Learn from the Best",
    subtitle: "Industry-leading experts delivering practical knowledge and actionable insights."
  }
];

// Mock data for partners
export const partners: Partner[] = [
  {
    id: "partner1",
    name: "Acme Corporation",
    logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=ACME+Corp"
  },
  {
    id: "partner2",
    name: "TechVision",
    logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=TechVision"
  },
  {
    id: "partner3",
    name: "Global Insights",
    logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Global+Insights"
  },
  {
    id: "partner4",
    name: "Innovate Partners",
    logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Innovate+Partners"
  },
  {
    id: "partner5",
    name: "Enterprise Solutions",
    logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Enterprise+Solutions"
  },
  {
    id: "partner6",
    name: "Future Leaders",
    logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Future+Leaders"
  }
];

// Company information
export const companyInfo = {
  name: "Excellence Training",
  description: "Excellence Training is a premier provider of professional development and corporate training programs. With over 15 years of experience, we've helped thousands of individuals and organizations achieve their full potential through our expert-led courses. Our approach combines cutting-edge content, engaging delivery methods, and practical application to ensure lasting results.",
  phone: "+1 (555) 123-4567",
  email: "info@excellencetraining.com",
  address: "123 Business Avenue, Suite 500, New York, NY 10001",
  socialMedia: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com"
  },
  mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425882426903!3d40.74076097132708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9d1a351d1e06!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690365309025!5m2!1sen!2sus"
};
