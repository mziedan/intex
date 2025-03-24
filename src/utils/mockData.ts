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
  price?: number;
  discountPrice?: number;
  duration?: string;
  level?: string;
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

export const courses: Course[] = [
  {
    id: "course1",
    slug: "advanced-leadership-skills",
    title: "Advanced Leadership Skills",
    shortDescription: "Develop the skills needed to lead teams effectively in today's dynamic business environment.",
    description: `This comprehensive leadership program is designed for managers who want to enhance their leadership capabilities. Participants will learn advanced techniques for team motivation, conflict resolution, and strategic decision-making.

The course covers:
- Strategic leadership thinking
- Building high-performance teams
- Managing change effectively
- Emotional intelligence in leadership
- Influence and persuasion techniques
- Crisis management

By the end of this training, participants will be equipped with practical tools and frameworks to lead with confidence and achieve superior team results.`,
    price: 1299,
    discountPrice: 999,
    duration: "3 days",
    level: "Intermediate",
    category: "cat1",
    subcategory: "subcat1",
    featured: true,
    image: "/placeholder.svg",
    sessions: [
      {
        id: "session1",
        startDate: new Date(2023, 11, 4),
        endDate: new Date(2023, 11, 6),
        location: "New York City",
        capacity: 25,
        registrations: 18
      },
      {
        id: "session2",
        startDate: new Date(2024, 1, 15),
        endDate: new Date(2024, 1, 17),
        location: "San Francisco",
        capacity: 25,
        registrations: 12
      },
      {
        id: "session3",
        startDate: new Date(2024, 3, 8),
        endDate: new Date(2024, 3, 10),
        location: "Chicago",
        capacity: 25,
        registrations: 5
      }
    ]
  },
  {
    id: "course2",
    slug: "project-management-fundamentals",
    title: "Project Management Fundamentals",
    shortDescription: "Master the essential skills and methodologies required to successfully manage projects of any size.",
    description: "A comprehensive introduction to project management principles and practices. Learn how to initiate, plan, execute, monitor, and close projects effectively. This course covers the core project management knowledge areas including scope, time, cost, quality, resources, communication, risk, procurement, and stakeholder management.",
    price: 899,
    duration: "2 days",
    level: "Beginner",
    category: "cat2",
    subcategory: "subcat3",
    featured: true,
    image: "/placeholder.svg",
    sessions: [
      {
        id: "session4",
        startDate: new Date(2023, 11, 11),
        endDate: new Date(2023, 11, 12),
        location: "Online",
        capacity: 30,
        registrations: 25
      },
      {
        id: "session5",
        startDate: new Date(2024, 0, 22),
        endDate: new Date(2024, 0, 23),
        location: "Online",
        capacity: 30,
        registrations: 14
      }
    ]
  },
  {
    id: "course3",
    slug: "data-analysis-with-python",
    title: "Data Analysis with Python",
    shortDescription: "Learn how to use Python for data analysis, visualization, and interpretation.",
    description: "This hands-on course teaches you how to use Python for data analysis. You'll learn how to import, clean, transform, and visualize data using popular libraries like Pandas, NumPy, and Matplotlib. By the end of the course, you'll be able to build complex data analysis pipelines and extract meaningful insights from real-world datasets.",
    price: 1199,
    duration: "4 days",
    level: "Intermediate",
    category: "cat3",
    subcategory: "subcat5",
    featured: false,
    image: "/placeholder.svg",
    sessions: [
      {
        id: "session6",
        startDate: new Date(2023, 11, 18),
        endDate: new Date(2023, 11, 21),
        location: "Boston",
        capacity: 20,
        registrations: 15
      },
      {
        id: "session7",
        startDate: new Date(2024, 2, 4),
        endDate: new Date(2024, 2, 7),
        location: "Online",
        capacity: 35,
        registrations: 10
      }
    ]
  },
  {
    id: "course4",
    slug: "cybersecurity-essentials",
    title: "Cybersecurity Essentials",
    shortDescription: "Learn the fundamentals of cybersecurity to protect your organization from digital threats.",
    description: "This course provides a solid foundation in cybersecurity principles and practices. Participants will learn about common cyber threats, vulnerability assessment, risk management, and defense strategies. The course also covers security policies, compliance requirements, and incident response.",
    price: 999,
    duration: "2 days",
    level: "Beginner",
    category: "cat3",
    subcategory: "subcat6",
    featured: true,
    image: "/placeholder.svg",
    sessions: [
      {
        id: "session8",
        startDate: new Date(2024, 0, 8),
        endDate: new Date(2024, 0, 9),
        location: "Washington DC",
        capacity: 25,
        registrations: 22
      },
      {
        id: "session9",
        startDate: new Date(2024, 2, 18),
        endDate: new Date(2024, 2, 19),
        location: "Online",
        capacity: 30,
        registrations: 5
      },
      {
        id: "session10",
        startDate: new Date(2024, 4, 13),
        endDate: new Date(2024, 4, 14),
        location: "Austin",
        capacity: 25,
        registrations: 0
      }
    ]
  },
  {
    id: "course5",
    slug: "strategic-marketing",
    title: "Strategic Marketing",
    shortDescription: "Develop and implement effective marketing strategies that drive business growth.",
    description: "This course provides a comprehensive overview of strategic marketing principles and practices. Learn how to analyze market opportunities, develop effective marketing strategies, and create compelling marketing plans. Topics include market research, segmentation, targeting, positioning, product development, pricing, distribution, and promotion.",
    price: 899,
    duration: "2 days",
    level: "Intermediate",
    category: "cat2",
    subcategory: "subcat4",
    featured: false,
    image: "/placeholder.svg",
    sessions: [
      {
        id: "session11",
        startDate: new Date(2023, 11, 14),
        endDate: new Date(2023, 11, 15),
        location: "Chicago",
        capacity: 25,
        registrations: 20
      },
      {
        id: "session12",
        startDate: new Date(2024, 3, 22),
        endDate: new Date(2024, 3, 23),
        location: "Miami",
        capacity: 25,
        registrations: 8
      }
    ]
  },
  {
    id: "course6",
    slug: "effective-communication",
    title: "Effective Communication",
    shortDescription: "Enhance your communication skills to improve workplace relationships and productivity.",
    description: "This interactive workshop focuses on developing effective verbal and written communication skills. Participants will learn techniques for clear and concise communication, active listening, giving and receiving feedback, and managing difficult conversations. The course also covers presentation skills, email etiquette, and cross-cultural communication.",
    price: 599,
    duration: "1 day",
    level: "All Levels",
    category: "cat1",
    subcategory: "subcat2",
    featured: false,
    image: "/placeholder.svg",
    sessions: [
      {
        id: "session13",
        startDate: new Date(2024, 0, 15),
        endDate: new Date(2024, 0, 15),
        location: "Online",
        capacity: 40,
        registrations: 30
      },
      {
        id: "session14",
        startDate: new Date(2024, 1, 12),
        endDate: new Date(2024, 1, 12),
        location: "Seattle",
        capacity: 25,
        registrations: 15
      },
      {
        id: "session15",
        startDate: new Date(2024, 3, 5),
        endDate: new Date(2024, 3, 5),
        location: "Online",
        capacity: 40,
        registrations: 10
      }
    ]
  }
];

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
