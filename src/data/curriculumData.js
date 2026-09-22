// MAKAUT Official Curriculum Database for GradeCompass
// Extracted from official syllabus Excel sheets across 11 B.Tech disciplines (Semesters 3-8)

export const BRANCHES = [
  {
    "id": "CSE",
    "name": "Computer Science & Engineering"
  },
  {
    "id": "CSE-AIML",
    "name": "CSE (Artificial Intelligence & Machine Learning)"
  },
  {
    "id": "AI-DS",
    "name": "Artificial Intelligence and Data Science"
  },
  {
    "id": "CSE-DS",
    "name": "CSE (Data Science)"
  },
  {
    "id": "CSE-CS",
    "name": "CSE (Cyber Security)"
  },
  {
    "id": "CSE-IOT",
    "name": "CSE (Internet of Things)"
  },
  {
    "id": "ECE",
    "name": "Electronics & Communication Engineering"
  },
  {
    "id": "EE",
    "name": "Electrical Engineering"
  },
  {
    "id": "ME",
    "name": "Mechanical Engineering"
  },
  {
    "id": "CE",
    "name": "Civil Engineering"
  },
  {
    "id": "BME",
    "name": "Biomedical Engineering"
  }
];

export const SEMESTERS = [
  { id: 'SEM-1', name: 'Semester 1' },
  { id: 'SEM-2', name: 'Semester 2' },
  { id: 'SEM-3', name: 'Semester 3' },
  { id: 'SEM-4', name: 'Semester 4' },
  { id: 'SEM-5', name: 'Semester 5' },
  { id: 'SEM-6', name: 'Semester 6' },
  { id: 'SEM-7', name: 'Semester 7' },
  { id: 'SEM-8', name: 'Semester 8' },
];

export const CURRICULUM_DATABASE = {
  "CSE": {
    "SEM-3": [
      {
        "id": "cse-sem-3-esc301",
        "name": "Analog & Digital Electronics",
        "code": "ESC-301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-sem-3-pcccs301",
        "name": "Data Structure & Algorithm",
        "code": "PCC-CS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-3-pcccs302",
        "name": "Computer Organization",
        "code": "PCC-CS302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-sem-3-bsc301",
        "name": "Mathematics-III (Differential Calculus)",
        "code": "BSC-301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-3-hsmc301",
        "name": "Economics for Engineers (Humanities-II)",
        "code": "HSMC-301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "cse-sem-4-pcccs401",
        "name": "Discrete Mathematics",
        "code": "PCC-CS401",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-4-pcccs402",
        "name": "Computer Architecture",
        "code": "PCC-CS402",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-4-pcccs403",
        "name": "Formal Language & Automata Theory",
        "code": "PCC-CS403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-4-pcccs404",
        "name": "Design and Analysis of Algorithms",
        "code": "PCC-CS404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-4-bsc401",
        "name": "Biology",
        "code": "BSC-401",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "cse-sem-4-mc401",
        "name": "Environmental Science",
        "code": "MC-401",
        "type": "Theory",
        "credits": 1,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "cse-sem-5-esc501",
        "name": "Software Engineering",
        "code": "ESC501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-5-pcccs501",
        "name": "Compiler Design",
        "code": "PCC-CS501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-5-pcccs502",
        "name": "Operating Systems",
        "code": "PCC-CS502",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-sem-5-pcccs503",
        "name": "Object Oriented Programming",
        "code": "PCC-CS503",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-5-hsmc501",
        "name": "Introduction to Industrial Management (Humanities-III)",
        "code": "HSMC-501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-5-pecit501ab",
        "name": "Computer Architecture and Organization / Computer Graphics",
        "code": "PEC-IT501A/B",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-sem-5-mccs501ab",
        "name": "Constitution of India / Essence of Indian Knowledge Tradition",
        "code": "MC-CS501A/B",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-6": [
      {
        "id": "cse-sem-6-pcccs601",
        "name": "Database Management Systems",
        "code": "PCC-CS601",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-sem-6-pcccs602",
        "name": "Computer Networks",
        "code": "PCC-CS602",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-sem-6-pecit601abcd",
        "name": "Advanced Algorithms / Distributed Database Management System / Signals and Systems / Image Processing",
        "code": "PEC-IT601A/B/C/D",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-sem-6-pecit602abcd",
        "name": "Parallel Computing / Data Warehousing and Data Mining / Human Computer Interaction / Pattern Recognition",
        "code": "PEC-IT602A/B/C/D",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-sem-6-oecit601a",
        "name": "Numerical Methods",
        "code": "OEC-IT601A",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-6-oecit601b",
        "name": "Human Resource Development and Organizational Behavior",
        "code": "OEC-IT601B",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-sem-6-projcs601",
        "name": "Research Methodology",
        "code": "PROJ-CS601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "cse-sem-7-peccs701abcde",
        "name": "Quantum Computing / Cloud Computing / Distributed Computing / Multi-agent Intelligent Systems / Machine Learning",
        "code": "PEC-CS701A/B/C/D/E",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-sem-7-peccs702abcde",
        "name": "Neural Networks and Deep Learning / Soft Computing / Adhoc-Sensor Network / Information Theory and Coding / Cyber Security",
        "code": "PEC-CS702A/B/C/D/E",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-sem-7-oeccs701abc",
        "name": "Operation Research / Cyber Forensics and Auditing / Indian Philosophy",
        "code": "OEC-CS701A/B/C",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-7-hsmc701",
        "name": "Project Management and Entrepreneurship",
        "code": "HSMC-701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "cse-sem-8-peccs801abcde",
        "name": "Signals and Networks / Cryptography and Network Security / Speech and Natural Language Processing / Web and Internet Technology / Internet of Things",
        "code": "PEC-CS801A/B/C/D/E",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-sem-8-oeccs801abcd",
        "name": "Cyber Law and Ethics / Mobile Computing / Robotics",
        "code": "OEC-CS801A/B/C/D",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-8-oeccs802ab",
        "name": "E-Commerce & ERP / Multimedia Technology",
        "code": "OEC-CS802A/B",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-sem-8-hsmc801",
        "name": "Soft Skill and Professional Communication",
        "code": "HSMC-801",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      }
    ]
  },
  "CSE-AIML": {
    "SEM-3": [
      {
        "id": "cse-aiml-sem-3-esc301",
        "name": "Analog and Digital Electronics",
        "code": "ESC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-aiml-sem-3-pcccs301",
        "name": "Data Structure & Algorithms",
        "code": "PCC-CS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-aiml-sem-3-pcccs302",
        "name": "Computer Organization",
        "code": "PCC-CS302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-aiml-sem-3-bscaiml301",
        "name": "Linear Algebra",
        "code": "BSC AIML301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-3-hsmc301",
        "name": "Economics for Engineers (Humanities-II)",
        "code": "HSMC301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "cse-aiml-sem-4-pcccs401",
        "name": "Discrete Mathematics",
        "code": "PCCCS401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-4-pccaiml401",
        "name": "Artificial Intelligence",
        "code": "PCCAIML401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-4-pccaiml402",
        "name": "Optimization Techniques",
        "code": "PCCAIML402",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-4-pcccs404",
        "name": "Design and Analysis of Algorithm",
        "code": "PCCCS404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-aiml-sem-4-bsc401",
        "name": "Biology",
        "code": "BSC401",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      },
      {
        "id": "cse-aiml-sem-4-mc401",
        "name": "Environmental Science",
        "code": "MC401",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "cse-aiml-sem-5-pccaiml501",
        "name": "Probability and Statistics",
        "code": "PCCAIML501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-5-pcccs502",
        "name": "Operating System",
        "code": "PCCCS502",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-aiml-sem-5-pcccs503",
        "name": "Object Oriented Programming",
        "code": "PCCCS503",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-aiml-sem-5-pccaiml502",
        "name": "Introduction to Machine Learning",
        "code": "PCCAIML502",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-aiml-sem-5-hsmc501",
        "name": "Introduction to Industrial Management",
        "code": "HSMC501",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-5-pecaiml501abc",
        "name": "Cloud Computing / Pattern Recognition / Graph Theory",
        "code": "PECAIML501 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      }
    ],
    "SEM-6": [
      {
        "id": "cse-aiml-sem-6-pccaiml601",
        "name": "Machine Learning Applications",
        "code": "PCCAIML601",
        "type": "Theory",
        "credits": 2,
        "icon": "cpu"
      },
      {
        "id": "cse-aiml-sem-6-pccaiml602",
        "name": "Deep Learning",
        "code": "PCCAIML602",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-6-pccaiml603",
        "name": "Soft Computing",
        "code": "PCCAIML603",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-6-pcccs602",
        "name": "Computer Networks",
        "code": "PCCCS602",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-aiml-sem-6-pecaiml601abcd",
        "name": "Big Data Analytics / Data Mining / Distributed System / Game Theory",
        "code": "PECAIML601 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-aiml-sem-6-oecaiml601abcd",
        "name": "Database Management System / Human Computer Interaction / Neural Network / Cryptography and Network Security",
        "code": "OECAIML601 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      }
    ],
    "SEM-7": [
      {
        "id": "cse-aiml-sem-7-pecaiml701abcd",
        "name": "Social Network Analysis / Computer Vision / Quantum Computing / Multi Agent Intelligent System",
        "code": "PECAIML701 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-aiml-sem-7-pecaiml702abcd",
        "name": "Ecommerce and ERP / Information Theory and Coding / Computer Aided Design / Digital Signal Processing",
        "code": "PECAIML702 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-aiml-sem-7-oecaiml701abcd",
        "name": "Internet of Things / Bio Informatics / Robotics / Compiler Design",
        "code": "OECAIML701 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-aiml-sem-7-hsmc701",
        "name": "Project Management and Entrepreneurship",
        "code": "HSMC701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "cse-aiml-sem-8-pecaiml801abc",
        "name": "Natural Language Processing / Cyber Law and Ethics / Mobile Computing",
        "code": "PECAIML801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-aiml-sem-8-oecaiml801abc",
        "name": "Economic Policies in India / Microelectronics and VLSI / Software Engineering",
        "code": "OECAIML801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-aiml-sem-8-oecaiml802abc",
        "name": "Organization Behaviour / Research Methodology / Soft Skill and Interpersonal Communication",
        "code": "OECAIML802 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      }
    ]
  },
  "AI-DS": {
    "SEM-3": [
      {
        "id": "ai-ds-sem-3-esc301",
        "name": "Analog and Digital Electronics",
        "code": "ESC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ai-ds-sem-3-pcccs301",
        "name": "Data Structure and Algorithms",
        "code": "PCCCS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ai-ds-sem-3-pcccs302",
        "name": "Computer Organization",
        "code": "PCCCS302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ai-ds-sem-3-bscaids301",
        "name": "Linear Algebra",
        "code": "BSCAIDS301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-3-hsmc301",
        "name": "Economics for Engineers (Humanities II)",
        "code": "HSMC301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "ai-ds-sem-4-pcccs401",
        "name": "Discrete Mathematics",
        "code": "PCCCS401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-4-pccaids401",
        "name": "Artificial Intelligence",
        "code": "PCCAIDS401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-4-pcccs403",
        "name": "Formal Language and Automata Theory",
        "code": "PCCCS403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ai-ds-sem-4-pcccs404",
        "name": "Design and Analysis of Algorithm",
        "code": "PCCCS404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ai-ds-sem-4-bsc401",
        "name": "Biology",
        "code": "BSC401",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      },
      {
        "id": "ai-ds-sem-4-mc401",
        "name": "Environmental Science",
        "code": "MC401",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "ai-ds-sem-5-pccaids501",
        "name": "Probability and Statistics",
        "code": "PCCAIDS501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-5-pcccs502",
        "name": "Operating System",
        "code": "PCCCS502",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ai-ds-sem-5-pcccs503",
        "name": "Object Oriented Programming & Java",
        "code": "PCCCS503",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ai-ds-sem-5-pccaids502",
        "name": "Data Science",
        "code": "PCCAIDS502",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "ai-ds-sem-5-hsmc501",
        "name": "Introduction to Industrial Management",
        "code": "HSMC501",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-5-pecaids501abcd",
        "name": "Soft Computing / Cloud Computing / Pattern Recognition / Graph Theory",
        "code": "PECAIDS501 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      }
    ],
    "SEM-6": [
      {
        "id": "ai-ds-sem-6-pccaids601",
        "name": "Data Preparation and Analysis",
        "code": "PCCAIDS601",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-6-pccaids602",
        "name": "Big Data",
        "code": "PCCAIDS602",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "ai-ds-sem-6-pcccs601",
        "name": "Database Management System",
        "code": "PCCCS601",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "ai-ds-sem-6-pcccs602",
        "name": "Computer Networks",
        "code": "PCCCS602",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ai-ds-sem-6-pecaids601abcd",
        "name": "Machine Learning / Data Mining / Distributed System / Game Theory",
        "code": "PECAIDS601 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "ai-ds-sem-6-oecaids601abcd",
        "name": "Optimization and Multi-valued Analysis / Human Computer Interaction / Neural Network / Cryptography and Network Security",
        "code": "OECAIDS601 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      }
    ],
    "SEM-7": [
      {
        "id": "ai-ds-sem-7-pecaids701abcd",
        "name": "Social Network Analysis / Computer Vision / Data Visualization / Deep Learning",
        "code": "PECAIDS701 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ai-ds-sem-7-pecaids702abcd",
        "name": "Ecommerce and ERP / Information Theory and Coding / Data Security and Access Control / Digital Signal Processing",
        "code": "PECAIDS702 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ai-ds-sem-7-oecaids701abcd",
        "name": "Internet of Things / Bio Informatics / Robotics / Compiler Design",
        "code": "OECAIDS701 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ai-ds-sem-7-hsmc701",
        "name": "Project Management and Entrepreneurship",
        "code": "HSMC701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "ai-ds-sem-8-pecaids801abc",
        "name": "Natural Language Processing / Cyber Law and Ethics / Mobile Computing",
        "code": "PECAIDS801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ai-ds-sem-8-oecaids801abc",
        "name": "Economic Policies in India / Knowledge Discovery / Software Engineering",
        "code": "OECAIDS801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ai-ds-sem-8-oecaids802abc",
        "name": "Organization Behaviour / Research Methodology / Soft Skill and Interpersonal Communication",
        "code": "OECAIDS802 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      }
    ]
  },
  "CSE-DS": {
    "SEM-3": [
      {
        "id": "cse-ds-sem-3-esc301",
        "name": "Analog and Digital Electronics",
        "code": "ESC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-ds-sem-3-pcccs301",
        "name": "Data Structure & Algorithms",
        "code": "PCC-CS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-3-pcccs302",
        "name": "Computer Organization",
        "code": "PCC-CS302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-ds-sem-3-pccds301",
        "name": "Introduction to Data Science",
        "code": "PCC-DS301",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-ds-sem-3-bsc301",
        "name": "Mathematics-III (Differential Calculus)",
        "code": "BSC 301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-ds-sem-3-hsmc301",
        "name": "Economics for Engineers (Humanities-II)",
        "code": "HSMC 301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "cse-ds-sem-4-pcccs401",
        "name": "Discrete Mathematics",
        "code": "PCC-CS401",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "cse-ds-sem-4-pccds401",
        "name": "Database Management System",
        "code": "PCC-DS401",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-ds-sem-4-pcccs403",
        "name": "Formal Language & Automata Theory",
        "code": "PCC-CS403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-4-pcccs404",
        "name": "Design & Analysis of Algorithms",
        "code": "PCC-CS404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-4-pccds402",
        "name": "Data Mining",
        "code": "PCC-DS402",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-ds-sem-4-bsc401",
        "name": "Biology",
        "code": "BSC 401",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "cse-ds-sem-4-mc401",
        "name": "Environmental Sciences",
        "code": "MC401",
        "type": "Theory",
        "credits": 0,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "cse-ds-sem-5-esc501",
        "name": "Software Engineering",
        "code": "ESC501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-5-pccds501",
        "name": "Statistics for Data Science",
        "code": "PCC-DS501",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-ds-sem-5-pcccs502",
        "name": "Operating Systems",
        "code": "PCC-CS502",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-ds-sem-5-pcccs503",
        "name": "Object Oriented Programming",
        "code": "PCC-CS503",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-5-hsmc501",
        "name": "Introduction to Industrial Management (Humanities III)",
        "code": "HSMC-501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-ds-sem-5-pecds501abcde",
        "name": "Theory of Computation / Mobile Computing and Applications / Advanced Computer Architecture / Computer Graphics / Compiler Design",
        "code": "PEC-DS501A/B/C/D/E",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-5-mccs501",
        "name": "Constitution of India / Essence of Indian Knowledge Tradition",
        "code": "MC-CS501",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-6": [
      {
        "id": "cse-ds-sem-6-pccds601",
        "name": "Artificial Intelligence",
        "code": "PCC-DS601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-ds-sem-6-pccds602",
        "name": "Data Communication and Computer Networks",
        "code": "PCC-DS602",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-ds-sem-6-pccds603",
        "name": "Big Data Technology",
        "code": "PCC-DS603",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-ds-sem-6-pecds601abcde",
        "name": "Advanced Algorithms / Distributed Systems / Information Security / Image Processing / Machine Learning",
        "code": "PEC-DS601A/B/C/D/E",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-6-pecds602abcd",
        "name": "Parallel and Distributed Algorithms / Data Warehousing / Human Computer Interaction / Data Analysis and Modeling Technique",
        "code": "PEC-DS602A/B/C/D",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-ds-sem-6-oecds601abc",
        "name": "Numerical Methods / Human Resource Development and Organizational Behavior / Social Computing",
        "code": "OEC-DS601A/B/C",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-ds-sem-6-projds601",
        "name": "Research Methodology",
        "code": "PROJ-DS601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "cse-ds-sem-7-pecds701abcdef",
        "name": "Quantum Computing / Cloud Computing / Digital Signal Processing / Multi-agent Intelligent Systems / Time Series Analysis and Forecasting / Data Visualization",
        "code": "PEC-DS701A/B/C/D/E/F",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-ds-sem-7-pecds702abcdef",
        "name": "Neural Networks and Deep Learning / Soft Computing / Ad-Hoc and Sensor Networks / Information Theory and Coding / Surveillance and Cyber Security / Pattern Recognition",
        "code": "PEC-DS702A/B/C/D/E/F",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-ds-sem-7-oecds701abc",
        "name": "Operations Research / Multimedia Technology / Soft Skill & Interpersonal Communication",
        "code": "OEC-DS701A/B/C",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-ds-sem-7-hsmc701",
        "name": "Project Management and Entrepreneurship",
        "code": "HSMC701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "cse-ds-sem-8-pecds801abcde",
        "name": "Signals and Networks / Quantum Cryptography and Network Security / Natural Language Processing / Computer Vision / Web and Internet Technology / Internet of Things",
        "code": "PEC-DS801A/B/C/D/E",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-ds-sem-8-oecds801abcd",
        "name": "Big Data Analysis / Cyber Law and Ethics / Mobile Computing / Robotics",
        "code": "OEC-DS801A/B/C/D",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-ds-sem-8-oecds802abc",
        "name": "Business Analytics / Data Science Ethics / Number Theory",
        "code": "OEC-DS802A/B/C",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      }
    ]
  },
  "CSE-CS": {
    "SEM-3": [
      {
        "id": "cse-cs-sem-3-esc301",
        "name": "Analog and Digital Electronics",
        "code": "ESC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-cs-sem-3-pcccs301",
        "name": "Data Structure and Algorithms",
        "code": "PCC-CS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-cs-sem-3-pcccs302",
        "name": "Computer Organization",
        "code": "PCC-CS302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-cs-sem-3-bsccs301",
        "name": "Discrete Mathematics",
        "code": "BSC-CS301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-3-hsmc301",
        "name": "Economics for Engineers (Humanities II)",
        "code": "HSMC301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "cse-cs-sem-4-pcccsy401",
        "name": "Probability and Statistics",
        "code": "PCC-CSY401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-4-pccicb401",
        "name": "Data Communication and Networks",
        "code": "PCC-ICB401",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-cs-sem-4-pcccs403",
        "name": "Formal Language and Automata Theory",
        "code": "PCC-CS403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-cs-sem-4-pcccs404",
        "name": "Design and Analysis of Algorithm",
        "code": "PCC-CS404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-cs-sem-4-bsc401",
        "name": "Biology",
        "code": "BSC401",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "cse-cs-sem-4-mc401",
        "name": "Environmental Science",
        "code": "MC401",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "cse-cs-sem-5-pcccs501",
        "name": "Cyber Security",
        "code": "PCCCS501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-5-pcccs502",
        "name": "Cyber Law & Cyber Crime",
        "code": "PCCCS502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-5-pcccs503",
        "name": "Operating System",
        "code": "PCCCS503",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-cs-sem-5-pccicb502",
        "name": "Object Oriented Programming",
        "code": "PCCICB502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-cs-sem-5-hsmc501",
        "name": "Industrial Management",
        "code": "HSMC501",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-5-pecicb501abc",
        "name": "Mobile Computing / Internet Technology / Smart Sensors and IoT",
        "code": "PECICB501 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-cs-sem-5-mc501",
        "name": "Constitution of India / Essence of Indian Knowledge Tradition",
        "code": "MC-501",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-6": [
      {
        "id": "cse-cs-sem-6-pcccs601",
        "name": "Cryptography and Network Security",
        "code": "PCCCS601",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-cs-sem-6-pcccs602",
        "name": "Infrastructure Security",
        "code": "PCCCS602",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-6-pcccs603",
        "name": "Database Management System",
        "code": "PCCCS603",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-cs-sem-6-pecicb601abcde",
        "name": "Cloud Computing / Software Engineering / Ethical Hacking",
        "code": "PECICB601 (A/B/C/D/E)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-cs-sem-6-oecicb601abcd",
        "name": "Human Resource Development / Design Thinking / Economic Policies in India / Organizational Behaviour",
        "code": "OECICB601 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-cs-sem-6-projcs601",
        "name": "Research Methodology",
        "code": "PROJ-CS601",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "cse-cs-sem-7-pecicb701abc",
        "name": "Digital Forensics / Information Theory and Coding / Blockchain Technology",
        "code": "PECICB701 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-7-pecicb702abc",
        "name": "AI & ML / Malware Analysis / Mobile Application and Services",
        "code": "PECICB702 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-7-oecicb701abc",
        "name": "Soft Skill and Interpersonal Communication / Bio Informatics / Business Analytics",
        "code": "OECICB701 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-cs-sem-7-hsmc701",
        "name": "Project Management and Entrepreneurship",
        "code": "HSMC701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "cse-cs-sem-8-pecicb801ab",
        "name": "Information Security Management System (ISMS) / Distributed System",
        "code": "PECICB801 (A/B)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-cs-sem-8-oecicb801abc",
        "name": "Security Operations Management / E-commerce and Digital Payment System / Operations Research",
        "code": "OECICB801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-cs-sem-8-oecicb802abc",
        "name": "Management Information System (MIS) / Multimedia Technology / Introduction to Arts and Aesthetics",
        "code": "OECICB802 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ]
  },
  "CSE-IOT": {
    "SEM-3": [
      {
        "id": "cse-iot-sem-3-esc301",
        "name": "Analog and Digital Electronics",
        "code": "ESC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-iot-sem-3-pcccs301",
        "name": "Data Structure and Algorithms",
        "code": "PCCCS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-iot-sem-3-pcccs302",
        "name": "Computer Organization",
        "code": "PCCCS302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-iot-sem-3-bscicb301",
        "name": "Linear Algebra",
        "code": "BSCICB301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-iot-sem-3-hsmc301",
        "name": "Economics for Engineers (Humanities II)",
        "code": "HSMC301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "cse-iot-sem-4-pcccs401",
        "name": "Discrete Mathematics",
        "code": "PCCCS401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-iot-sem-4-pccicb401",
        "name": "Data Communication and Networks",
        "code": "PCCICB401",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-iot-sem-4-pcccs403",
        "name": "Formal Language and Automata Theory",
        "code": "PCCCS403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-iot-sem-4-pcccs404",
        "name": "Design and Analysis of Algorithm",
        "code": "PCCCS404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-iot-sem-4-bsc401",
        "name": "Biology",
        "code": "BSC401",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "cse-iot-sem-4-mc401",
        "name": "Environmental Science",
        "code": "MC401",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "cse-iot-sem-5-pccicb501",
        "name": "IoT Application and Design",
        "code": "PCCICB501",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-iot-sem-5-pcccs502",
        "name": "Operating System",
        "code": "PCCCS502",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-iot-sem-5-pcccs503",
        "name": "Object Oriented Programming",
        "code": "PCCCS503",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-iot-sem-5-pccicb502",
        "name": "Wireless Sensor Networks",
        "code": "PCCICB502",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-iot-sem-5-hsmc501",
        "name": "Introduction to Industrial Management",
        "code": "HSMC501",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "cse-iot-sem-5-pecicb501abc",
        "name": "Embedded System / Internet Technology / Smart Sensors and IoT",
        "code": "PECICB501 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      }
    ],
    "SEM-6": [
      {
        "id": "cse-iot-sem-6-pccicb601",
        "name": "Cryptography and Network Security",
        "code": "PCCICB601",
        "type": "Theory",
        "credits": 2,
        "icon": "monitor"
      },
      {
        "id": "cse-iot-sem-6-pcccs601",
        "name": "Database Management System",
        "code": "PCCCS601",
        "type": "Theory",
        "credits": 3,
        "icon": "database"
      },
      {
        "id": "cse-iot-sem-6-pcccs602",
        "name": "Ethical Hacking",
        "code": "PCCCS602",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-iot-sem-6-pecicb601abcde",
        "name": "Cloud Computing / Cyber Law and Cyber Crime / Steganography and Watermarking / Software Engineering / Digital Forensics",
        "code": "PECICB601 (A/B/C/D/E)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "cse-iot-sem-6-oecicb601abc",
        "name": "Human Resource Development and Organizational Behaviour / Indian Music System / Economic Policies in India",
        "code": "OECICB601 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      }
    ],
    "SEM-7": [
      {
        "id": "cse-iot-sem-7-pecicb701abc",
        "name": "Blockchain and Cryptocurrency / Social Network Analysis / Ecommerce and ERP",
        "code": "PECICB701 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "cse-iot-sem-7-pecicb702abc",
        "name": "Machine Learning / Information Theory and Coding / Cyber Security in Blockchain Technology",
        "code": "PECICB702 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-iot-sem-7-oecicb701abc",
        "name": "Soft Skill and Interpersonal Communication / Bio Informatics / Business Analytics",
        "code": "OECICB701 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-iot-sem-7-hsmc701",
        "name": "Project Management and Entrepreneurship",
        "code": "HSMC701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "cse-iot-sem-8-pecicb801abc",
        "name": "Security Assessment and Risk Analysis / Mobile Applications and Services / Deep Learning",
        "code": "PECICB801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-iot-sem-8-oecicb801abc",
        "name": "Operations Research / Remote Sensing and GIS / Digital Signal Processing",
        "code": "OECICB801 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "cse-iot-sem-8-oecicb802abc",
        "name": "Numerical Methods / Multimedia Technology / Introduction to Arts and Aesthetics",
        "code": "OECICB802 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "cse-iot-sem-8-grandviva",
        "name": "Grand Viva",
        "code": "\u2014",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ]
  },
  "ECE": {
    "SEM-3": [
      {
        "id": "ece-sem-3-ec301",
        "name": "Electronic Devices",
        "code": "EC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-3-ec302",
        "name": "Digital System Design",
        "code": "EC302",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-3-ec303",
        "name": "Signals and Systems",
        "code": "EC303",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-3-ec304",
        "name": "Network Theory",
        "code": "EC304",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ece-sem-3-escs301",
        "name": "Data Structure & Algorithm (ES)",
        "code": "ES-CS301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ece-sem-3-bsm301",
        "name": "Probability & Statistics (BS)",
        "code": "BS-M301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "ece-sem-4-ec401",
        "name": "Analog Communication",
        "code": "EC401",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-4-ec402",
        "name": "Analog Electronic Circuits",
        "code": "EC402",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-4-ec403",
        "name": "Microprocessor & Microcontrollers",
        "code": "EC403",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-4-escs401",
        "name": "Design and Analysis of Algorithm (ES)",
        "code": "ES-CS401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      },
      {
        "id": "ece-sem-4-bsm401",
        "name": "Numerical Methods (BS)",
        "code": "BS-M401",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-4-bsb401",
        "name": "Biology for Engineers",
        "code": "BS-B401",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "ece-sem-5-ec501",
        "name": "Electromagnetic Waves",
        "code": "EC501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-5-ec502",
        "name": "Computer Architecture",
        "code": "EC502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-5-ec503",
        "name": "Digital Communication & Stochastic Process",
        "code": "EC503",
        "type": "Theory",
        "credits": 3.5,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-5-ec504",
        "name": "Digital Signal Processing",
        "code": "EC504",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-5-peec505",
        "name": "Program Elective I",
        "code": "PE-EC505",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-5-oeec506",
        "name": "Open Elective I",
        "code": "OE-EC506",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-6": [
      {
        "id": "ece-sem-6-ec601",
        "name": "Control System & Instrumentation",
        "code": "EC601",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ece-sem-6-ec602",
        "name": "Computer Network",
        "code": "EC602",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ece-sem-6-peec603",
        "name": "Program Elective II",
        "code": "PE-EC603",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-6-oeec604",
        "name": "Open Elective II",
        "code": "OE-EC604",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-6-hshu601",
        "name": "Economics for Engineers",
        "code": "HS-HU601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "ece-sem-7-peec701",
        "name": "Program Elective III",
        "code": "PE-EC701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-7-peec702",
        "name": "Program Elective IV",
        "code": "PE-EC702",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-7-peec703",
        "name": "Program Elective V",
        "code": "PE-EC703",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-7-oeec704",
        "name": "Open Elective III",
        "code": "OE-EC704",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-7-hshu701",
        "name": "Principles of Management",
        "code": "HS-HU701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "ece-sem-8-peec801",
        "name": "Program Elective VI",
        "code": "PE-EC801",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-8-peec802",
        "name": "Program Elective VII",
        "code": "PE-EC802",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-8-oeec803",
        "name": "Open Elective IV",
        "code": "OE-EC803",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ece-sem-8-oeec804",
        "name": "Open Elective V",
        "code": "OE-EC804",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ]
  },
  "EE": {
    "SEM-3": [
      {
        "id": "ee-sem-3-pcee301",
        "name": "Electric Circuit Theory",
        "code": "PC-EE 301",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-3-pcee302",
        "name": "Analog Electronics",
        "code": "PC-EE 302",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-3-pcee303",
        "name": "Electromagnetic Field Theory",
        "code": "PC-EE 303",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ee-sem-3-esme301",
        "name": "Engineering Mechanics",
        "code": "ES-ME 301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ee-sem-3-bsm301",
        "name": "Mathematics-III",
        "code": "BS-M 301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ee-sem-3-bsee301",
        "name": "Biology for Engineers",
        "code": "BS-EE301",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "ee-sem-3-mcee301",
        "name": "Indian Constitution",
        "code": "MC-EE 301",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "ee-sem-4-pcee401",
        "name": "Electric Machine-I",
        "code": "PC-EE 401",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-4-pcee402",
        "name": "Digital Electronic",
        "code": "PC-EE 402",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-4-pcee403",
        "name": "Electrical and Electronics Measurement",
        "code": "PC-EE 403",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-4-esee401",
        "name": "Thermal Power Engineering",
        "code": "ES-EE 401",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-4-hmee401",
        "name": "Values and Ethics in Profession",
        "code": "HM-EE401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ee-sem-4-mcee401",
        "name": "Environmental Science",
        "code": "MC-EE401",
        "type": "Theory",
        "credits": 0,
        "icon": "leaf"
      }
    ],
    "SEM-5": [
      {
        "id": "ee-sem-5-pcee501",
        "name": "Electric Machine-II",
        "code": "PC-EE 501",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-5-pcee502",
        "name": "Power System-I",
        "code": "PC-EE 502",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-5-pcee503",
        "name": "Control System",
        "code": "PC-EE 503",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-5-pcee504",
        "name": "Power Electronics",
        "code": "PC-EE 504",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-5-peee501abc",
        "name": "High Voltage Engineering / Power Plant Engineering / Renewable & Non-conventional Energy",
        "code": "PE-EE 501 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-5-oeee501abc",
        "name": "Data Structure & Algorithm / Object Oriented Programming / Computer Organization & Architecture",
        "code": "OE-EE 501 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "file-code"
      }
    ],
    "SEM-6": [
      {
        "id": "ee-sem-6-pcee601",
        "name": "Power System-II",
        "code": "PC-EE 601",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-6-pcee602",
        "name": "Microprocessor & Microcontroller",
        "code": "PC-EE-602",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-6-peee601abc",
        "name": "Digital Control System / HVDC Transmission / Electrical Machine Design",
        "code": "PE-EE 601 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-6-peee602abc",
        "name": "Electrical and Hybrid Vehicle / Power Quality & FACTS / Industrial Electrical Systems",
        "code": "PE-EE 602 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-6-oeee601abc",
        "name": "Digital Signal Processing / Communication Engineering / VLSI & Microelectronics",
        "code": "OE-EE 601 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-6-hmee601",
        "name": "Economics for Engineers",
        "code": "HM-EE 601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "ee-sem-7-pcee701",
        "name": "Electric Drive",
        "code": "PC-EE 701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ee-sem-7-peee701abc",
        "name": "Control System Design / Electrical Energy Conservation & Auditing / Power Generation Economics",
        "code": "PE-EE 701 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-7-oeee701abc",
        "name": "Artificial Intelligence / Internet of Things / Computer Graphics",
        "code": "OE-EE701 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ee-sem-7-oeee702abc",
        "name": "Embedded System / Digital Image Processing / Computer Network",
        "code": "OE-EE702 (A/B/C)",
        "type": "Theory",
        "credits": 3,
        "icon": "monitor"
      },
      {
        "id": "ee-sem-7-hmee701",
        "name": "Principle of Management",
        "code": "HM-EE701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "ee-sem-8-pcee801",
        "name": "Utilization of Electric Power",
        "code": "PC-EE 801",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-8-peee801abcd",
        "name": "Line-commutated and Active PWM Rectifiers / Power System Dynamics & Control / Advanced Electric Drives / Industrial Automation and Control",
        "code": "PE-EE 801 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ee-sem-8-oeee801abcd",
        "name": "Soft Computing Techniques / Biomedical Instrumentation / Introduction to Machine Learning / Sensors and Transducers",
        "code": "OE-EE 801 (A/B/C/D)",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      }
    ]
  },
  "ME": {
    "SEM-3": [
      {
        "id": "me-sem-3-bsm301",
        "name": "Mathematics III",
        "code": "BS-M301",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-3-bsbio301",
        "name": "Biology",
        "code": "BS-BIO301",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "me-sem-3-esece301",
        "name": "Basic Electronics Engineering",
        "code": "ES-ECE301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "me-sem-3-esme301",
        "name": "Engineering Mechanics",
        "code": "ES-ME301",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-3-pcme301",
        "name": "Thermodynamics",
        "code": "PC-ME301",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-3-pcme302",
        "name": "Manufacturing Processes",
        "code": "PC-ME302",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "me-sem-4-esme401",
        "name": "Materials Engineering",
        "code": "ES-ME401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-4-pcme401",
        "name": "Applied Thermodynamics",
        "code": "PC-ME401",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-4-pcme402",
        "name": "Fluid Mechanics & Fluid Machines",
        "code": "PC-ME402",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      },
      {
        "id": "me-sem-4-pcme403",
        "name": "Strength of Materials",
        "code": "PC-ME403",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-4-pcme404",
        "name": "Metrology and Instrumentation",
        "code": "PC-ME404",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      }
    ],
    "SEM-5": [
      {
        "id": "me-sem-5-pcme501",
        "name": "Heat Transfer",
        "code": "PC-ME501",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-5-pcme502",
        "name": "Solid Mechanics",
        "code": "PC-ME502",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-5-pcme503",
        "name": "Kinematics & Theory of Machines",
        "code": "PC-ME503",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      },
      {
        "id": "me-sem-5-hmhu501",
        "name": "Effective Technical Communication",
        "code": "HM-HU501",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "me-sem-5-mc501",
        "name": "Essence of Indian Knowledge Tradition",
        "code": "MC501",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-6": [
      {
        "id": "me-sem-6-pcme601",
        "name": "Manufacturing Technology",
        "code": "PC-ME601",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "me-sem-6-pcme602",
        "name": "Design of Machine Elements",
        "code": "PC-ME602",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      },
      {
        "id": "me-sem-6-peme601",
        "name": "Professional Elective-I",
        "code": "PE-ME601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-6-peme602",
        "name": "Professional Elective-II",
        "code": "PE-ME602",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-6-hmhu601",
        "name": "Operations Research",
        "code": "HM-HU601",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-6-mc601",
        "name": "Constitution of India",
        "code": "MC601",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "me-sem-7-pcme701",
        "name": "Advanced Manufacturing Technology",
        "code": "PC-ME701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-7-peme701",
        "name": "Professional Elective-III",
        "code": "PE-ME701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-7-peme702",
        "name": "Professional Elective-IV",
        "code": "PE-ME702",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-7-oeme701",
        "name": "Open Elective-I",
        "code": "OE-ME701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-7-hmhu701",
        "name": "Economics for Engineers",
        "code": "HM-HU701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "me-sem-8-peme801",
        "name": "Professional Elective-V",
        "code": "PE-ME801",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-8-peme802",
        "name": "Professional Elective-VI",
        "code": "PE-ME802",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-8-oeme801",
        "name": "Open Elective-II",
        "code": "OE-ME801",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "me-sem-8-oeme802",
        "name": "Open Elective-III",
        "code": "OE-ME802",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ]
  },
  "CE": {
    "SEM-3": [
      {
        "id": "ce-sem-3-cebs301",
        "name": "Biology for Engineers",
        "code": "CE(BS)301",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "ce-sem-3-cees301",
        "name": "Engineering Mechanics",
        "code": "CE(ES)301",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-3-cees302",
        "name": "Energy Science & Engineering",
        "code": "CE(ES)302",
        "type": "Theory",
        "credits": 2,
        "icon": "leaf"
      },
      {
        "id": "ce-sem-3-cebs301",
        "name": "Mathematics-III (Transform & Discrete Mathematics)",
        "code": "CE(BS)301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-3-cehs301",
        "name": "Humanities-I (Effective Technical Communication)",
        "code": "CE(HS)301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "ce-sem-3-cehs302",
        "name": "Introduction to Civil Engineering",
        "code": "CE(HS)302",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "ce-sem-4-cees401",
        "name": "Introduction to Fluid Mechanics",
        "code": "CE(ES)401",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-4-cees402",
        "name": "Introduction to Solid Mechanics",
        "code": "CE(ES)402",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-4-cepc401",
        "name": "Soil Mechanics \u2013 I",
        "code": "CE(PC)401",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-4-cepc402",
        "name": "Environmental Engineering - I",
        "code": "CE(PC)402",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "ce-sem-4-cepc403",
        "name": "Surveying & Geomatics",
        "code": "CE(PC)403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-4-cepc404",
        "name": "Concrete Technology",
        "code": "CE(PC)404",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-4-cehs401",
        "name": "Civil Engineering - Societal & Global Impact",
        "code": "CE(HS)401",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-4-cemc401",
        "name": "Management I (Organizational Behavior)",
        "code": "CE(MC)401",
        "type": "Theory",
        "credits": 0,
        "icon": "cpu"
      }
    ],
    "SEM-5": [
      {
        "id": "ce-sem-5-cepc501",
        "name": "Design of RC Structures",
        "code": "CE(PC)501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-5-cepc502",
        "name": "Engineering Hydrology",
        "code": "CE(PC)502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-5-cepc503",
        "name": "Structural Analysis \u2013 I",
        "code": "CE(PC)503",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-5-cepc504",
        "name": "Soil Mechanics \u2013 II",
        "code": "CE(PC)504",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-5-cepc505",
        "name": "Environmental Engineering \u2013 II",
        "code": "CE(PC)505",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "ce-sem-5-cepc506",
        "name": "Transportation Engineering",
        "code": "CE(PC)506",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-5-cemc501",
        "name": "Constitution of India / Essence of Indian Knowledge Tradition",
        "code": "CE(MC)501",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-6": [
      {
        "id": "ce-sem-6-cepc601",
        "name": "Construction Engineering & Management",
        "code": "CE(PC)601",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-6-cepc602",
        "name": "Engineering Economics, Estimation & Costing",
        "code": "CE(PC)602",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-6-cepc603",
        "name": "Water Resources Engineering",
        "code": "CE(PC)603",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-6-cepc604",
        "name": "Design of Steel Structures",
        "code": "CE(PC)604",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-6-cepe601",
        "name": "Elective-I",
        "code": "CE(PE)601",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-6-cepe602",
        "name": "Elective-II",
        "code": "CE(PE)602",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-6-ceoe601",
        "name": "Open Elective-I (Humanities)",
        "code": "CE(OE)601",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "ce-sem-7-ceoe701",
        "name": "Open Elective-II",
        "code": "CE(OE)701",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-7-cepe701",
        "name": "Elective III",
        "code": "CE(PE)701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-7-cepe702",
        "name": "Elective IV",
        "code": "CE(PE)702",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-7-cepe703",
        "name": "Elective V",
        "code": "CE(PE)703",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-7-cepe704",
        "name": "Elective-VI",
        "code": "CE(PE)704",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-7-cepe705",
        "name": "Elective-VII",
        "code": "CE(PE)705",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "ce-sem-8-cehs801",
        "name": "Professional Practice, Law & Ethics",
        "code": "CE(HS)801",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-8-cepe801",
        "name": "Elective VIII",
        "code": "CE(PE)801",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-8-ceoe801",
        "name": "Open Elective-III",
        "code": "CE(OE)801",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "ce-sem-8-ceoe802",
        "name": "Open Elective-IV",
        "code": "CE(OE)802",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ]
  },
  "BME": {
    "SEM-3": [
      {
        "id": "bme-sem-3-bsm301",
        "name": "Mathematics \u2013 III (Probability & Statistics)",
        "code": "BS-M301",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-3-esec301",
        "name": "Analog Electronic Circuits",
        "code": "ES-EC301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-3-pcbme301",
        "name": "Signals & Systems in Biomedical Engineering",
        "code": "PC-BME301",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-3-pcbme302",
        "name": "Engineering Physiology & Anatomy",
        "code": "PC-BME302",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "bme-sem-3-pcbme303",
        "name": "Biophysics & Biochemistry",
        "code": "PC-BME303",
        "type": "Theory",
        "credits": 3,
        "icon": "leaf"
      },
      {
        "id": "bme-sem-3-hmhu301",
        "name": "Technical English",
        "code": "HM-HU301",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      }
    ],
    "SEM-4": [
      {
        "id": "bme-sem-4-bsm401",
        "name": "Numerical Methods",
        "code": "BS-M401",
        "type": "Theory",
        "credits": 2,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-4-esec401",
        "name": "Digital Electronics & Integrated Circuits",
        "code": "ES-EC401",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-4-pcbme401",
        "name": "Biosensors & Transducers",
        "code": "PC-BME401",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-4-pcbme402",
        "name": "Biomedical Instrumentation",
        "code": "PC-BME402",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-4-pcbme403",
        "name": "Analytical & Diagnostic Equipments",
        "code": "PC-BME403",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-4-peee401peee402",
        "name": "Professional Elective-I",
        "code": "PE-EE401 / PE-EE402",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-5": [
      {
        "id": "bme-sem-5-pcbme501",
        "name": "Therapeutic Equipments & Assistive Devices",
        "code": "PC-BME501",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-5-pcbme502",
        "name": "Medical Imaging Techniques",
        "code": "PC-BME502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-5-pebme501pebme502",
        "name": "Professional Elective-II",
        "code": "PE-BME501 / PE-BME502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-5-oeei501oeei502",
        "name": "Open Elective-I",
        "code": "OE-EI501 / OE-EI502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-5-oecs501oecs502",
        "name": "Open Elective-II",
        "code": "OE-CS501 / OE-CS502",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-5-mces501",
        "name": "Environmental Science & Safety",
        "code": "MC-ES501",
        "type": "Theory",
        "credits": 0,
        "icon": "leaf"
      }
    ],
    "SEM-6": [
      {
        "id": "bme-sem-6-pcbme601",
        "name": "Biomedical Digital Signal Processing",
        "code": "PC-BME601",
        "type": "Theory",
        "credits": 3,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-6-pcbme602",
        "name": "Biomaterials & Tissue Engineering",
        "code": "PC-BME602",
        "type": "Theory",
        "credits": 4,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-6-pcbme603",
        "name": "Biomechanics & Implants",
        "code": "PC-BME603",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-6-pcbme604",
        "name": "Advanced Medical Imaging Techniques",
        "code": "PC-BME604",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-6-pebme601pebme602pebme603",
        "name": "Professional Elective-III",
        "code": "PE-BME601 / PE-BME602 / PE-BME603",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-6-oecs601oecs602oecs603",
        "name": "Open Elective-III",
        "code": "OE-CS601 / OE-CS602 / OE-CS603",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ],
    "SEM-7": [
      {
        "id": "bme-sem-7-hmhu701",
        "name": "Principles of Management & Organizational Behaviour",
        "code": "HM-HU701",
        "type": "Theory",
        "credits": 4,
        "icon": "cpu"
      },
      {
        "id": "bme-sem-7-pcbme701",
        "name": "Medical Image Processing",
        "code": "PC-BME701",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-7-pebme701pebme702pebme703",
        "name": "Professional Elective-IV",
        "code": "PE-BME701 / PE-BME702 / PE-BME703",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-7-oebme701oebme702oebme703",
        "name": "Open Elective-IV",
        "code": "OE-BME701 / OE-BME702 / OE-BME703",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-7-mchu701",
        "name": "Indian Constitution",
        "code": "MC-HU701",
        "type": "Theory",
        "credits": 0,
        "icon": "file-text"
      }
    ],
    "SEM-8": [
      {
        "id": "bme-sem-8-pebme801pebme802pebme803",
        "name": "Professional Elective-V",
        "code": "PE-BME801 / PE-BME802 / PE-BME803",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      },
      {
        "id": "bme-sem-8-oebme801oebme802oebme803",
        "name": "Open Elective-V",
        "code": "OE-BME801 / OE-BME802 / OE-BME803",
        "type": "Theory",
        "credits": 3,
        "icon": "file-text"
      }
    ]
  }
};

// Fetch subjects for specific branch and semester (returns empty array if not added yet)
export function getSubjectsForBranchAndSemester(branchId, semesterId) {
  const branchData = CURRICULUM_DATABASE[branchId];
  if (branchData && branchData[semesterId]) {
    return branchData[semesterId];
  }
  return [];
}
