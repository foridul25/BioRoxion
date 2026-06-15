const { useState, useEffect, useRef, createContext, useContext } = React;

// ============================================================
// BANGLADESH MEDICAL DATA - EXPANDED
// ============================================================
const BD_DOCTORS = [
  { id:1, name:"Dr. Mohammad Rafiqul Islam", specialty:"Cardiology", hospital:"BSMMU", hospitals:["BSMMU","Square Hospital"], district:"Dhaka", division:"Dhaka", experience:22, rating:4.9, reviews:342, fee:500, available:true, phone:"01711-234567", img:"RI", gender:"Male", qualification:"MBBS, MD (Cardiology)", languages:["Bangla","English"], visitingHours:"Mon-Fri: 10AM-2PM", bio:"Senior Cardiologist with 22 years of experience specializing in interventional cardiology and heart failure management." },
  { id:2, name:"Dr. Nasrin Sultana", specialty:"Gynecology", hospital:"Dhaka Medical College", hospitals:["Dhaka Medical College","Popular Diagnostic Centre"], district:"Dhaka", division:"Dhaka", experience:18, rating:4.8, reviews:289, fee:400, available:true, phone:"01712-345678", img:"NS", gender:"Female", qualification:"MBBS, FCPS (Gynecology)", languages:["Bangla","English"], visitingHours:"Sat-Thu: 9AM-1PM", bio:"Expert in high-risk pregnancy, laparoscopic surgery and reproductive endocrinology." },
  { id:3, name:"Dr. A.K.M. Shamsuzzoha", specialty:"Neurology", hospital:"National Institute of Neurosciences", hospitals:["National Institute of Neurosciences","BSMMU"], district:"Dhaka", division:"Dhaka", experience:25, rating:4.9, reviews:415, fee:700, available:false, phone:"01713-456789", img:"SS", gender:"Male", qualification:"MBBS, MD (Neurology), FRCP", languages:["Bangla","English","Urdu"], visitingHours:"Sun-Thu: 11AM-3PM", bio:"Leading neurologist specializing in stroke, epilepsy, and neurodegenerative disorders." },
  { id:4, name:"Dr. Farida Begum", specialty:"Pediatrics", hospital:"Shishu Hospital", hospitals:["Shishu Hospital","Ad-din Hospital"], district:"Dhaka", division:"Dhaka", experience:15, rating:4.7, reviews:198, fee:600, available:true, phone:"01714-567890", img:"FB", gender:"Female", qualification:"MBBS, DCH, MD (Pediatrics)", languages:["Bangla","English"], visitingHours:"Sat-Wed: 10AM-2PM", bio:"Specialist in neonatal care, pediatric infectious diseases and childhood development." },
  { id:5, name:"Dr. Rezaul Karim", specialty:"Orthopedics", hospital:"CRP Savar", hospitals:["CRP Savar","BSMMU","Evercare Hospital"], district:"Dhaka", division:"Dhaka", experience:20, rating:4.8, reviews:276, fee:500, available:true, phone:"01715-678901", img:"RK", gender:"Male", qualification:"MBBS, MS (Orthopedics)", languages:["Bangla","English"], visitingHours:"Mon-Fri: 9AM-1PM", bio:"Expert in joint replacement surgery, sports medicine and spinal disorders." },
  { id:6, name:"Dr. Sabina Yasmin", specialty:"Dermatology", hospital:"DMCH", hospitals:["DMCH","Green Life Hospital"], district:"Dhaka", division:"Dhaka", experience:12, rating:4.6, reviews:167, fee:800, available:true, phone:"01716-789012", img:"SY", gender:"Female", qualification:"MBBS, DDV, MD (Dermatology)", languages:["Bangla","English"], visitingHours:"Sun-Thu: 2PM-6PM", bio:"Specialist in skin disorders, cosmetology, and dermatological surgeries." },
  { id:7, name:"Dr. Harunur Rashid", specialty:"Gastroenterology", hospital:"Birdem Hospital", hospitals:["Birdem Hospital","United Hospital"], district:"Dhaka", division:"Dhaka", experience:19, rating:4.8, reviews:301, fee:600, available:false, phone:"01717-890123", img:"HR", gender:"Male", qualification:"MBBS, MD (Gastroenterology)", languages:["Bangla","English"], visitingHours:"Mon-Sat: 10AM-2PM", bio:"Expert in endoscopy, liver diseases, IBD and advanced GI procedures." },
  { id:8, name:"Dr. Dilruba Akhter", specialty:"Endocrinology", hospital:"BIRDEM", hospitals:["BIRDEM","Labaid Hospital"], district:"Dhaka", division:"Dhaka", experience:16, rating:4.7, reviews:224, fee:400, available:true, phone:"01718-901234", img:"DA", gender:"Female", qualification:"MBBS, MD (Endocrinology)", languages:["Bangla","English"], visitingHours:"Sat-Thu: 9AM-12PM", bio:"Specialist in diabetes, thyroid disorders, hormonal imbalances and metabolic diseases." },
  { id:9, name:"Dr. Nurul Islam", specialty:"Pulmonology", hospital:"NIDCH", hospitals:["NIDCH","DMCH"], district:"Dhaka", division:"Dhaka", experience:21, rating:4.8, reviews:312, fee:500, available:true, phone:"01719-012345", img:"NI", gender:"Male", qualification:"MBBS, FCPS (Medicine), MD (Pulmonology)", languages:["Bangla","English"], visitingHours:"Sun-Thu: 10AM-2PM", bio:"Expert in respiratory diseases, asthma, COPD, and pulmonary hypertension." },
  { id:10, name:"Dr. Shahanara Begum", specialty:"Ophthalmology", hospital:"BSMMU", hospitals:["BSMMU","Ispahani Islamia Eye Institute"], district:"Dhaka", division:"Dhaka", experience:14, rating:4.6, reviews:143, fee:700, available:true, phone:"01720-123456", img:"SB", gender:"Female", qualification:"MBBS, DO, MS (Ophthalmology)", languages:["Bangla","English"], visitingHours:"Mon-Sat: 9AM-1PM", bio:"Specialist in cataract surgery, glaucoma management and retinal disorders." },
  { id:11, name:"Dr. Khondaker Golam Mostofa", specialty:"Cardiology", hospital:"Chittagong Medical College", hospitals:["Chittagong Medical College","Ibn Sina Hospital Chittagong"], district:"Chittagong", division:"Chittagong", experience:23, rating:4.9, reviews:387, fee:400, available:true, phone:"01711-234568", img:"KG", gender:"Male", qualification:"MBBS, MD (Cardiology), FACC", languages:["Bangla","English"], visitingHours:"Mon-Fri: 10AM-2PM", bio:"Senior cardiologist specializing in cardiac catheterization and echocardiography." },
  { id:12, name:"Dr. Rasheda Khanam", specialty:"Obstetrics", hospital:"CMCH", hospitals:["CMCH","Chittagong Maa-O-Shishu Hospital"], district:"Chittagong", division:"Chittagong", experience:17, rating:4.7, reviews:209, fee:700, available:true, phone:"01712-345679", img:"RK2", gender:"Female", qualification:"MBBS, FCPS (Gynae & Obs)", languages:["Bangla","English","Arabic"], visitingHours:"Sat-Thu: 9AM-1PM", bio:"Expert in obstetrics, high-risk pregnancies, and minimally invasive gynecological procedures." },
  { id:13, name:"Dr. Mahbubur Rahman", specialty:"Surgery", hospital:"Rajshahi Medical College", hospitals:["Rajshahi Medical College","Popular Diagnostic Rajshahi"], district:"Rajshahi", division:"Rajshahi", experience:24, rating:4.9, reviews:456, fee:700, available:false, phone:"01713-456790", img:"MR", gender:"Male", qualification:"MBBS, MS (Surgery), FRCS", languages:["Bangla","English"], visitingHours:"Sun-Thu: 10AM-2PM", bio:"Senior surgeon with expertise in laparoscopic and colorectal surgery." },
  { id:14, name:"Dr. Sumaiya Islam", specialty:"Psychiatry", hospital:"NIMH Dhaka", hospitals:["NIMH Dhaka","Green Life Hospital"], district:"Dhaka", division:"Dhaka", experience:13, rating:4.7, reviews:178, fee:600, available:true, phone:"01714-567891", img:"SI", gender:"Female", qualification:"MBBS, MD (Psychiatry)", languages:["Bangla","English"], visitingHours:"Mon-Sat: 2PM-6PM", bio:"Specialist in depression, anxiety, schizophrenia and addiction psychiatry." },
  { id:15, name:"Dr. Aminul Hoque", specialty:"Urology", hospital:"Khulna Medical College", hospitals:["Khulna Medical College","Ad-din Hospital Khulna"], district:"Khulna", division:"Khulna", experience:18, rating:4.6, reviews:156, fee:500, available:true, phone:"01715-678902", img:"AH", gender:"Male", qualification:"MBBS, MS (Urology)", languages:["Bangla","English"], visitingHours:"Sun-Thu: 10AM-1PM", bio:"Expert in kidney stones, prostate disorders, and urological oncology." },
  { id:16, name:"Dr. Tahmina Akter", specialty:"Rheumatology", hospital:"BSMMU", hospitals:["BSMMU","Square Hospital"], district:"Dhaka", division:"Dhaka", experience:11, rating:4.5, reviews:112, fee:700, available:true, phone:"01716-789013", img:"TA", gender:"Female", qualification:"MBBS, MD (Rheumatology)", languages:["Bangla","English"], visitingHours:"Mon-Fri: 10AM-2PM", bio:"Specialist in arthritis, lupus, gout and inflammatory joint diseases." },
  { id:17, name:"Dr. Selim Reza", specialty:"Oncology", hospital:"NICRH Dhaka", hospitals:["NICRH Dhaka","Evercare Hospital"], district:"Dhaka", division:"Dhaka", experience:20, rating:4.8, reviews:267, fee:500, available:false, phone:"01717-890124", img:"SR", gender:"Male", qualification:"MBBS, MD (Oncology), FRCR", languages:["Bangla","English"], visitingHours:"Mon-Wed: 10AM-2PM", bio:"Expert in medical oncology, chemotherapy and targeted cancer therapies." },
  { id:18, name:"Dr. Lovely Akhter", specialty:"Nephrology", hospital:"Kidney Foundation", hospitals:["Kidney Foundation","BSMMU"], district:"Dhaka", division:"Dhaka", experience:15, rating:4.7, reviews:189, fee:400, available:true, phone:"01718-901235", img:"LA", gender:"Female", qualification:"MBBS, MD (Nephrology)", languages:["Bangla","English"], visitingHours:"Sat-Thu: 9AM-1PM", bio:"Specialist in chronic kidney disease, dialysis management and kidney transplantation." },
  { id:19, name:"Dr. Aminur Rahman Chowdhury", specialty:"Cardiology", hospital:"Sylhet MAG Osmani Medical College", hospitals:["Sylhet MAG Osmani Medical College","Jalalabad Ragib-Rabeya Medical College"], district:"Sylhet", division:"Sylhet", experience:16, rating:4.7, reviews:201, fee:400, available:true, phone:"01719-234567", img:"AC", gender:"Male", qualification:"MBBS, MD (Cardiology)", languages:["Bangla","English","Sylheti"], visitingHours:"Mon-Fri: 9AM-1PM", bio:"Cardiologist specializing in cardiac imaging and preventive cardiology." },
  { id:20, name:"Dr. Nargis Fatema", specialty:"Pediatrics", hospital:"Sher-e-Bangla Medical College", hospitals:["Sher-e-Bangla Medical College","Barisal General Hospital"], district:"Barisal", division:"Barisal", experience:14, rating:4.6, reviews:134, fee:700, available:true, phone:"01720-345678", img:"NF", gender:"Female", qualification:"MBBS, DCH, FCPS (Pediatrics)", languages:["Bangla","English"], visitingHours:"Sat-Wed: 9AM-1PM", bio:"Specialist in pediatric nutrition, immunization and childhood developmental disorders." },
  { id:21, name:"Dr. Zahirul Haque", specialty:"Neurology", hospital:"Rangpur Medical College", hospitals:["Rangpur Medical College","Popular Diagnostic Rangpur"], district:"Rangpur", division:"Rangpur", experience:17, rating:4.7, reviews:167, fee:500, available:true, phone:"01711-456789", img:"ZH", gender:"Male", qualification:"MBBS, MD (Neurology)", languages:["Bangla","English"], visitingHours:"Sun-Thu: 10AM-2PM", bio:"Expert in stroke management, headache disorders and neuromuscular diseases." },
  { id:22, name:"Dr. Farzana Binte Amin", specialty:"Dermatology", hospital:"Mymensingh Medical College", hospitals:["Mymensingh Medical College","Ibn Sina Hospital Mymensingh"], district:"Mymensingh", division:"Mymensingh", experience:10, rating:4.5, reviews:98, fee:700, available:true, phone:"01712-567890", img:"FA", gender:"Female", qualification:"MBBS, DDV (London)", languages:["Bangla","English"], visitingHours:"Mon-Sat: 2PM-6PM", bio:"Specialist in acne, eczema, psoriasis and aesthetic dermatology." },
];

const BD_HOSPITALS = [
  { id:1, name:"Bangabandhu Sheikh Mujib Medical University", short:"BSMMU", address:"Shahbagh, Dhaka-1000", district:"Dhaka", division:"Dhaka", beds:1750, emergency:true, rating:4.9, phone:"02-9661062", ambulance:"02-9661064", type:"Government", lat:23.7380, lon:90.3974, departments:["Cardiology","Neurology","Oncology","Nephrology","Pediatrics","Surgery","Orthopedics","Gynecology"], openHours:"24/7 Emergency", established:1998 },
  { id:2, name:"Dhaka Medical College Hospital", short:"DMCH", address:"Secretariat Rd, Dhaka-1000", district:"Dhaka", division:"Dhaka", beds:2600, emergency:true, rating:4.8, phone:"02-9672040", ambulance:"02-9672041", type:"Government", lat:23.7241, lon:90.3960, departments:["All Major Specialties","Trauma","Burns","Plastic Surgery","ENT","Psychiatry"], openHours:"24/7", established:1946 },
  { id:3, name:"Square Hospital Ltd.", short:"Square", address:"18/F West Panthapath, Dhaka-1205", district:"Dhaka", division:"Dhaka", beds:400, emergency:true, rating:4.9, phone:"02-8159457", ambulance:"10616", type:"Private", lat:23.7510, lon:90.3803, departments:["Cardiology","Oncology","Orthopedics","Neurology","Gastroenterology","IVF","Urology"], openHours:"24/7", established:2006 },
  { id:4, name:"United Hospital Limited", short:"United", address:"Plot 15, Road 71, Gulshan-2, Dhaka", district:"Dhaka", division:"Dhaka", beds:450, emergency:true, rating:4.8, phone:"10666", ambulance:"10666", type:"Private", lat:23.7943, lon:90.4160, departments:["Cardiology","Neuroscience","Orthopedics","Oncology","Pediatrics","Nephrology"], openHours:"24/7", established:2006 },
  { id:5, name:"Evercare Hospital Dhaka", short:"Evercare", address:"Plot 81, Block-E, Bashundhara, Dhaka", district:"Dhaka", division:"Dhaka", beds:430, emergency:true, rating:4.9, phone:"10678", ambulance:"10678", type:"Private", lat:23.8163, lon:90.4318, departments:["Cardiology","Bone Marrow Transplant","Oncology","Pediatrics","Neurology","Robotic Surgery"], openHours:"24/7", established:2005 },
  { id:6, name:"Labaid Specialized Hospital", short:"Labaid", address:"House 1, Road 4, Dhanmondi, Dhaka", district:"Dhaka", division:"Dhaka", beds:300, emergency:true, rating:4.7, phone:"10606", ambulance:"10606", type:"Private", lat:23.7455, lon:90.3737, departments:["Cardiology","Endocrinology","Nephrology","Dermatology","Ophthalmology","Gynecology"], openHours:"24/7", established:1999 },
  { id:7, name:"Ibn Sina Hospital Ltd.", short:"Ibn Sina", address:"House 48, Road 9/A, Dhanmondi, Dhaka", district:"Dhaka", division:"Dhaka", beds:200, emergency:true, rating:4.7, phone:"02-8611222", ambulance:"01711-000000", type:"Private", lat:23.7490, lon:90.3741, departments:["Internal Medicine","Surgery","Pediatrics","Gynecology","Orthopedics","Dermatology"], openHours:"24/7", established:1983 },
  { id:8, name:"Popular Diagnostic Centre", short:"Popular", address:"House 16, Road 2, Dhanmondi, Dhaka", district:"Dhaka", division:"Dhaka", beds:150, emergency:false, rating:4.6, phone:"02-9129807", ambulance:"N/A", type:"Private", lat:23.7450, lon:90.3748, departments:["Diagnostic","Cardiology","Radiology","Pathology","Gastroenterology"], openHours:"7AM-10PM", established:1983 },
  { id:9, name:"BIRDEM General Hospital", short:"BIRDEM", address:"122 Kazi Nazrul Islam Ave, Dhaka-1000", district:"Dhaka", division:"Dhaka", beds:700, emergency:true, rating:4.8, phone:"02-9661551", ambulance:"02-9661552", type:"Specialized", lat:23.7401, lon:90.3885, departments:["Endocrinology","Nephrology","Cardiology","Ophthalmology","Podiatry","Nutrition"], openHours:"24/7", established:1980 },
  { id:10, name:"Green Life Hospital", short:"Green Life", address:"32 Green Rd, Farmgate, Dhaka", district:"Dhaka", division:"Dhaka", beds:250, emergency:true, rating:4.6, phone:"02-9125653", ambulance:"01911-000001", type:"Private", lat:23.7562, lon:90.3832, departments:["Cardiology","Oncology","Neurology","Pediatrics","Orthopedics"], openHours:"24/7", established:2001 },
  { id:11, name:"Chittagong Medical College Hospital", short:"CMCH", address:"Chittagong-4203", district:"Chittagong", division:"Chittagong", beds:1500, emergency:true, rating:4.8, phone:"031-619718", ambulance:"031-619719", type:"Government", lat:22.3558, lon:91.8219, departments:["All Specialties","Trauma","Burns","ICU","Pediatrics","Oncology"], openHours:"24/7", established:1957 },
  { id:12, name:"MAG Osmani Medical College Hospital", short:"SOMCH", address:"Sylhet-3100", district:"Sylhet", division:"Sylhet", beds:1200, emergency:true, rating:4.7, phone:"0821-714902", ambulance:"0821-714903", type:"Government", lat:24.8976, lon:91.8710, departments:["All Major Specialties","Cardiology","Neurology","Pediatrics","Surgery"], openHours:"24/7", established:1962 },
  { id:13, name:"Rajshahi Medical College Hospital", short:"RMCH", address:"Rajshahi-6000", district:"Rajshahi", division:"Rajshahi", beds:1600, emergency:true, rating:4.8, phone:"0721-775522", ambulance:"0721-775523", type:"Government", lat:24.3636, lon:88.5946, departments:["All Specialties","Oncology","Nephrology","Neurology","Cardiology"], openHours:"24/7", established:1958 },
  { id:14, name:"Khulna Medical College Hospital", short:"KMCH", address:"Khulna-9000", district:"Khulna", division:"Khulna", beds:1000, emergency:true, rating:4.7, phone:"041-724088", ambulance:"041-724089", type:"Government", lat:22.8456, lon:89.5403, departments:["All Major Specialties","Cardiology","Surgery","Pediatrics","Gynecology"], openHours:"24/7", established:1971 },
  { id:15, name:"Ad-din Hospital", short:"Ad-din", address:"2 Bara Maghbazar, Dhaka", district:"Dhaka", division:"Dhaka", beds:300, emergency:true, rating:4.6, phone:"02-9356631", ambulance:"01711-555555", type:"Private", lat:23.7401, lon:90.4105, departments:["Gynecology","Pediatrics","Neonatology","Internal Medicine","Surgery"], openHours:"24/7", established:1981 },
];

const BLOOD_BANKS = [
  { id:1, name:"Quantum Blood Bank", district:"Dhaka", division:"Dhaka", phone:"01713-062060", available:["A+","B+","O+","AB+"], address:"149/7 Monipuri Para, Tejgaon, Dhaka" },
  { id:2, name:"Sandhani Blood Bank DMCH", district:"Dhaka", division:"Dhaka", phone:"01709-765432", available:["A+","A-","B+","B-","O+","O-","AB+","AB-"], address:"Dhaka Medical College, Dhaka" },
  { id:3, name:"Bangladesh Red Crescent Blood Bank", district:"Dhaka", division:"Dhaka", phone:"02-9330188", available:["A+","B+","O+","O-","AB+"], address:"684-686 Bara Magh Bazar, Dhaka-1217" },
  { id:4, name:"Chittagong Blood Bank", district:"Chittagong", division:"Chittagong", phone:"031-620091", available:["A+","B+","O+","AB+","O-"], address:"CMCH Campus, Chittagong" },
  { id:5, name:"Sandhani Rajshahi", district:"Rajshahi", division:"Rajshahi", phone:"01715-345678", available:["A+","B+","O+"], address:"Rajshahi Medical College, Rajshahi" },
];

const AMBULANCES = [
  { id:1, name:"DGHS Ambulance Service", district:"Dhaka", phone:"16789", available:true, distance:"1.2 km", type:"Advanced Life Support", fare:"Free", driver:"Md. Karim", eta:"8 min", icu:true, ac:true },
  { id:2, name:"BDRCS Ambulance", district:"Dhaka", phone:"01713-062060", available:true, distance:"2.1 km", type:"Basic Life Support", fare:"৳500", driver:"Md. Rahim", eta:"12 min", icu:false, ac:true },
  { id:3, name:"Shasthya Batayon", district:"Dhaka", phone:"16777", available:false, distance:"3.5 km", type:"Advanced Life Support", fare:"৳800", driver:"Md. Hossain", eta:"20 min", icu:true, ac:true },
  { id:4, name:"JibanRaksha Ambulance", district:"Dhaka", phone:"01800-000911", available:true, distance:"4.0 km", type:"Basic Life Support", fare:"৳600", driver:"Md. Raju", eta:"22 min", icu:false, ac:false },
  { id:5, name:"Fire Service Ambulance", district:"Dhaka", phone:"02-9555555", available:true, distance:"2.8 km", type:"Emergency Rescue", fare:"Free", driver:"Md. Salam", eta:"15 min", icu:false, ac:false },
  { id:6, name:"ICU Air Ambulance BD", district:"Dhaka", phone:"01922-000999", available:true, distance:"5.0 km", type:"ICU Ambulance", fare:"৳3000", driver:"Md. Jahir", eta:"25 min", icu:true, ac:true },
];

const SPECIALTIES = ["Cardiology","Neurology","Orthopedics","Gynecology","Pediatrics","Dermatology","Gastroenterology","Endocrinology","Pulmonology","Ophthalmology","Psychiatry","Urology","Oncology","Nephrology","Surgery","Obstetrics","Rheumatology"];
const DISTRICTS = ["Dhaka","Chittagong","Rajshahi","Khulna","Sylhet","Barisal","Rangpur","Mymensingh","Comilla","Gazipur","Narayanganj","Jessore"];
const BLOOD_GROUPS = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

// ============================================================
// LOCAL STORAGE HELPERS
// ============================================================
const storage = {
  get: (key, def = null) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

// ============================================================
// THEME CONTEXT
// ============================================================
const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });
const useTheme = () => useContext(ThemeContext);

const DARK_COLORS = {
  bg: "#0A0E1A", bgCard: "#111827", bgCard2: "#1a2235",
  border: "rgba(99,179,237,0.15)", blue: "#3B82F6", blueLight: "#60A5FA",
  cyan: "#06B6D4", purple: "#8B5CF6", purpleLight: "#A78BFA",
  green: "#10B981", red: "#EF4444", orange: "#F59E0B",
  text: "#F1F5F9", textSub: "#94A3B8", textMuted: "#64748B",
  gradBlue: "linear-gradient(135deg,#1e40af,#0284c7)",
  gradPurple: "linear-gradient(135deg,#4c1d95,#7c3aed)",
  gradRed: "linear-gradient(135deg,#7f1d1d,#ef4444)",
};

const LIGHT_COLORS = {
  bg: "#F0F4FF", bgCard: "#FFFFFF", bgCard2: "#E8EEF8",
  border: "rgba(59,130,246,0.18)", blue: "#2563EB", blueLight: "#3B82F6",
  cyan: "#0891B2", purple: "#7C3AED", purpleLight: "#8B5CF6",
  green: "#059669", red: "#DC2626", orange: "#D97706",
  text: "#0F172A", textSub: "#475569", textMuted: "#94A3B8",
  gradBlue: "linear-gradient(135deg,#1d4ed8,#0369a1)",
  gradPurple: "linear-gradient(135deg,#5b21b6,#6d28d9)",
  gradRed: "linear-gradient(135deg,#991b1b,#dc2626)",
};

// C is now a proxy that always returns the current theme colors
// Components call getC() to get current colors
let _isDark = true;
const getC = () => _isDark ? DARK_COLORS : LIGHT_COLORS;
// Keep C as alias for backwards compat (will be updated via hook in components)
let C = DARK_COLORS;

// ============================================================
// GLOBAL STYLES
// ============================================================
const getGlobalStyle = (isDark) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  body{font-family:'Inter',sans-serif;background:${isDark?"#0A0E1A":"#F0F4FF"};color:${isDark?"#F1F5F9":"#0F172A"};overscroll-behavior:none}
  ::-webkit-scrollbar{width:3px;background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(99,179,237,0.3);border-radius:2px}
  input,textarea,select{font-family:inherit;outline:none}
  button{font-family:inherit;cursor:pointer;border:none;background:none}
  @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}
  @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @keyframes glow{0%,100%{box-shadow:0 0 10px #3B82F6}50%{box-shadow:0 0 30px #3B82F6,0 0 60px #06B6D4}}
  .fade{animation:fadeIn 0.4s ease forwards}
  .pulse{animation:pulse 2s infinite}
  .spin{animation:spin 1s linear infinite}
  .ping{animation:ping 1.2s cubic-bezier(0,0,0.2,1) infinite}
  .glass{background:${isDark?"rgba(17,24,39,0.8)":"rgba(255,255,255,0.8)"};backdrop-filter:blur(12px);border:1px solid ${isDark?"rgba(99,179,237,0.15)":"rgba(59,130,246,0.18)"}}
  .card{background:${isDark?"#111827":"#FFFFFF"};border:1px solid ${isDark?"rgba(99,179,237,0.12)":"rgba(59,130,246,0.15)"};border-radius:16px;padding:16px}
  .btn-primary{background:linear-gradient(135deg,#1e40af,#0284c7);color:#fff;border-radius:12px;padding:14px;font-size:15px;font-weight:600;width:100%;display:block;text-align:center;border:none;cursor:pointer}
  .btn-outline{background:transparent;color:${isDark?"#60A5FA":"#2563EB"};border:1px solid ${isDark?"rgba(99,179,237,0.4)":"rgba(37,99,235,0.4)"};border-radius:12px;padding:14px;font-size:15px;font-weight:500;width:100%;display:block;text-align:center}
  .input{background:${isDark?"#1a2235":"#EEF2FF"};border:1px solid ${isDark?"rgba(99,179,237,0.2)":"rgba(59,130,246,0.25)"};border-radius:12px;padding:14px 16px;color:${isDark?"#F1F5F9":"#0F172A"};font-size:15px;width:100%}
  .input:focus{border-color:${isDark?"#3B82F6":"#2563EB"}}
  .tag{padding:4px 10px;border-radius:20px;font-size:12px;font-weight:500}
  .bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(100%,430px);background:${isDark?"rgba(10,14,26,0.95)":"rgba(240,244,255,0.95)"};backdrop-filter:blur(20px);border-top:1px solid ${isDark?"rgba(99,179,237,0.15)":"rgba(59,130,246,0.2)"};display:flex;z-index:100;padding:8px 0 16px}
  .screen{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;padding-bottom:80px;background:${isDark?"#0A0E1A":"#F0F4FF"}}
  .screen-no-nav{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;background:${isDark?"#0A0E1A":"#F0F4FF"}}
  .header{padding:16px 20px 0;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:50;background:${isDark?"#0A0E1A":"#F0F4FF"};padding-bottom:8px}
  .avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;letter-spacing:0.5px}
  .badge-green{background:rgba(16,185,129,0.15);color:${isDark?"#10B981":"#059669"}}
  .badge-red{background:rgba(239,68,68,0.15);color:${isDark?"#EF4444":"#DC2626"}}
  .badge-orange{background:rgba(245,158,11,0.15);color:${isDark?"#F59E0B":"#D97706"}}
  .badge-blue{background:rgba(59,130,246,0.15);color:${isDark?"#60A5FA":"#2563EB"}}
  .section-title{font-size:17px;font-weight:600;color:${isDark?"#F1F5F9":"#0F172A"};margin-bottom:12px}
  input[type=checkbox]{accent-color:#3B82F6}
  .floating-btn{position:absolute;bottom:90px;right:16px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#0284c7);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 20px rgba(59,130,246,0.4);z-index:90;cursor:pointer;border:none}
  .modal-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:flex-end}
  .modal-sheet{background:#111827;border-radius:24px 24px 0 0;width:100%;max-height:85%;overflow-y:auto;padding:24px;animation:slideUp 0.3s ease}
  .tab-active{background:linear-gradient(135deg,#1e40af,#0284c7);color:#fff;border-radius:10px}
  .tab-inactive{background:transparent;color:#94A3B8;border-radius:10px}
  .notif-dot{position:absolute;top:-2px;right:-2px;width:8px;height:8px;border-radius:50%;background:#EF4444;border:2px solid #0A0E1A}
`;

// ============================================================
// UTILITY COMPONENTS
// ============================================================
function Icon({ n, size = 20, color, style = {} }) {
  const icons = {
    home: "M10 2L1 9h2v9h5v-5h4v5h5V9h2L10 2z",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    message: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
    back: "M19 12H5m7-7l-7 7 7 7",
    check: "M20 6L9 17l-5-5",
    plus: "M12 5v14M5 12h14",
    search: "M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z",
    phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.61a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
    map: "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8zM12 13a3 3 0 100-6 3 3 0 000 6z",
    calendar: "M3 4h18M16 2v4M8 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
    share: "M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98",
    mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01",
    info: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 8h.01M11 12h1v4h1",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",
    logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
    lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z",
    "eye-off": "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22",
    camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z",
    x: "M18 6L6 18M6 6l12 12",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
    blood: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    navigate: "M3 11l19-9-9 19-2-8-8-2z",
    filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    award: "M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
    chevron: "M6 9l6 6 6-6",
    building: "M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18M2 22h20M16 22v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={icons[n] || ""} />
    </svg>
  );
}

function Avatar({ initials, size = 40, color = C.blue }) {
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.35, background: `${color}22`, color, border: `1px solid ${color}44`, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Badge({ children, type = "blue" }) {
  const types = { blue: "badge-blue", green: "badge-green", red: "badge-red", orange: "badge-orange" };
  return <span className={`tag ${types[type]}`}>{children}</span>;
}

function Spinner() {
  return <div className="spin" style={{ width: 24, height: 24, border: `3px solid rgba(59,130,246,0.2)`, borderTop: `3px solid ${C.blue}`, borderRadius: "50%" }} />;
}

function ProgressBar({ value, color = C.blue, height = 6 }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, value)}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function HealthMetricCard({ icon, label, value, unit, color, status }) {
  const statusColor = status === "Normal" ? C.green : status === "High" ? C.red : status === "Low" ? C.orange : C.textSub;
  return (
    <div className="card" style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          <Icon n={icon} size={18} />
        </div>
        <span style={{ fontSize: 11, color: statusColor, fontWeight: 600 }}>{status}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{value}</div>
      <div style={{ fontSize: 11, color: C.textSub, marginTop: 2 }}>{unit}</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "absolute", bottom: 100, left: 16, right: 16, zIndex: 999, background: "#1a2235", border: "1px solid rgba(99,179,237,0.3)", borderRadius: 14, padding: "14px 18px", fontSize: 14, color: C.text, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <span style={{ fontSize: 18 }}>✅</span> {msg}
    </div>
  );
}

// ============================================================
// SCREENS
// ============================================================

function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(onDone, 300); return 100; } return p + 2; }), 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg,#050d1a,#0a1628,#050d1a)", minHeight: "100%" }}>
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div className="ping" style={{ position: "absolute", inset: -20, borderRadius: "50%", background: `${C.blue}20` }} />
        <div style={{ width: 100, height: 100, borderRadius: 28, background: "linear-gradient(135deg,#1e40af,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, boxShadow: `0 0 40px ${C.blue}60` }}>🏥</div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>HealthSense BD</div>
      <div style={{ fontSize: 13, color: C.cyan, marginTop: 6, letterSpacing: 1 }}>AI-POWERED SMART HEALTHCARE</div>
      <div style={{ marginTop: 60, width: 200 }}>
        <ProgressBar value={progress} color={C.cyan} height={3} />
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: C.textMuted }}>Initializing AI Systems... {progress}%</div>
      </div>
    </div>
  );
}

function OnboardingScreen({ onDone }) {
  const [page, setPage] = useState(0);
  const slides = [
    { icon: "🔬", title: "AI Symptom Analysis", desc: "Describe your symptoms and get instant AI-powered health analysis with risk scores and doctor recommendations.", color: C.blue },
    { icon: "🧪", title: "Bio-Roxion IoT Kit", desc: "Connect your Bio-Roxion device to analyze blood, urine, and saliva biomarkers with medical-grade precision.", color: C.cyan },
    { icon: "👨‍⚕️", title: "2500+ Doctors", desc: "Find and book appointments with specialist doctors across all 64 districts of Bangladesh instantly.", color: C.purple },
    { icon: "🚨", title: "Emergency SOS", desc: "One tap SOS activates ambulance dispatch, notifies emergency contacts and shares your live location.", color: C.red },
  ];
  const s = slides[page];
  return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
        <button onClick={onDone} style={{ color: C.textSub, fontSize: 14 }}>Skip</button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 140, height: 140, borderRadius: 40, background: `${s.color}15`, border: `2px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, marginBottom: 32 }}>{s.icon}</div>
        <div style={{ fontSize: 26, fontWeight: 700, textAlign: "center", color: C.text, marginBottom: 16 }}>{s.title}</div>
        <div style={{ fontSize: 15, color: C.textSub, textAlign: "center", lineHeight: 1.7 }}>{s.desc}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
        {slides.map((_, i) => <div key={i} style={{ width: i === page ? 24 : 8, height: 8, borderRadius: 4, background: i === page ? s.color : "rgba(255,255,255,0.15)", transition: "all 0.3s" }} />)}
      </div>
      {page < slides.length - 1 ? (
        <button className="btn-primary" onClick={() => setPage(p => p + 1)}>Next →</button>
      ) : (
        <button className="btn-primary" onClick={onDone}>Get Started 🚀</button>
      )}
    </div>
  );
}

function LoginScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handle = () => {
    setErr("");
    if (mode === "email") {
      if (!email) return setErr("Email required");
      if (!/\S+@\S+\.\S+/.test(email)) return setErr("Invalid email address");
    } else {
      if (!phone) return setErr("Phone number required");
      if (!/^(\+880|880|0)?1[3-9]\d{8}$/.test(phone.replace(/\s/g, ""))) return setErr("Invalid Bangladesh phone number");
    }
    if (!pass) return setErr("Password required");
    if (pass.length < 6) return setErr("Password too short");
    setLoading(true);
    const savedUsers = storage.get("hs_users", []);
    const identifier = mode === "email" ? email : phone;
    const found = savedUsers.find(u => (mode === "email" ? u.email === identifier : u.phone === identifier));
    setTimeout(() => {
      setLoading(false);
      const userData = found || { email: mode === "email" ? email : `user@phone.bd`, name: mode === "email" ? email.split("@")[0] : "User", bloodGroup: "B+", age: 28, gender: "Male", phone: mode === "phone" ? phone : "+8801711000000" };
      if (remember) storage.set("hs_session", userData);
      onLogin(userData);
    }, 1500);
  };

  const handleForgot = () => {
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) return setErr("Enter valid email");
    setForgotSent(true);
  };

  if (forgotMode) return (
    <div className="screen-no-nav" style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <button onClick={() => { setForgotMode(false); setForgotSent(false); setErr(""); }} style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 8, color: C.textSub }}>
        <Icon n="back" size={20} /> Back to Login
      </button>
      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔐 Reset Password</div>
      <div style={{ fontSize: 14, color: C.textSub, marginBottom: 32 }}>Enter your email to receive reset instructions</div>
      {forgotSent ? (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.green }}>Email Sent!</div>
          <div style={{ fontSize: 13, color: C.textSub, marginTop: 8 }}>Check your inbox for password reset link</div>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => { setForgotMode(false); setForgotSent(false); }}>Back to Login</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input className="input" placeholder="Email Address" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} type="email" />
          {err && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: 12, fontSize: 13, color: C.red }}>⚠️ {err}</div>}
          <button className="btn-primary" onClick={handleForgot}>Send Reset Link</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="screen-no-nav" style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>👋</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>Welcome Back</div>
        <div style={{ fontSize: 14, color: C.textSub, marginTop: 4 }}>Sign in to HealthSense BD</div>
      </div>
      {/* Mode Tabs */}
      <div style={{ display: "flex", background: C.bgCard, borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
        {[["email","📧 Email"],["phone","📱 Mobile"]].map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 500, ...(mode === m ? { background: "linear-gradient(135deg,#1e40af,#0284c7)", color: "#fff" } : { background: "transparent", color: C.textSub }) }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {mode === "email" ? (
          <input className="input" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} type="email" />
        ) : (
          <input className="input" placeholder="+8801XXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} type="tel" />
        )}
        <div style={{ position: "relative" }}>
          <input className="input" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} type={showPass ? "text" : "password"} style={{ paddingRight: 48 }} onKeyDown={e => e.key === "Enter" && handle()} />
          <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: C.textSub }}>
            <Icon n={showPass ? "eye-off" : "eye"} size={18} />
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.textSub, cursor: "pointer" }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember Me
          </label>
          <button onClick={() => { setForgotMode(true); setErr(""); }} style={{ fontSize: 14, color: C.blueLight }}>Forgot Password?</button>
        </div>
        {err && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: 12, fontSize: 13, color: C.red }}>⚠️ {err}</div>}
        <button className="btn-primary" onClick={handle} disabled={loading} style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}>
          {loading ? "Signing In..." : "Login"}
        </button>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 32, textAlign: "center", fontSize: 14, color: C.textSub }}>
        Don't have an account? <button onClick={onRegister} style={{ color: C.blueLight, fontWeight: 600 }}>Create Account</button>
      </div>
    </div>
  );
}

function RegisterScreen({ onDone, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", gender: "", bloodGroup: "", password: "", confirm: "" });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return "Full name required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email";
    if (!/^(\+880|880|0)?1[3-9]\d{8}$/.test(form.phone.replace(/\s/g, ""))) return "Invalid Bangladesh phone";
    if (!form.age || form.age < 1 || form.age > 120) return "Age must be 1-120";
    if (!form.gender) return "Select gender";
    if (!form.bloodGroup) return "Select blood group";
    if (form.password.length < 8) return "Password min 8 characters";
    if (!/[A-Z]/.test(form.password)) return "Password needs uppercase letter";
    if (!/\d/.test(form.password)) return "Password needs a number";
    if (form.password !== form.confirm) return "Passwords don't match";
    return null;
  };

  const handle = () => {
    const e = validate();
    if (e) return setErr(e);
    setErr("");
    // Check duplicate
    const savedUsers = storage.get("hs_users", []);
    if (savedUsers.find(u => u.email === form.email)) return setErr("Email already registered");
    const newUser = { ...form, id: Date.now() };
    storage.set("hs_users", [...savedUsers, newUser]);
    setSuccess(true);
    setTimeout(() => onDone(newUser), 2000);
  };

  if (success) return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, minHeight: "100%" }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>✅</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.green }}>Account Created!</div>
      <div style={{ fontSize: 14, color: C.textSub, marginTop: 8 }}>Welcome to HealthSense BD</div>
    </div>
  );

  return (
    <div className="screen-no-nav" style={{ padding: "16px 24px 40px" }}>
      <div className="header" style={{ padding: "16px 0 16px" }}>
        <button onClick={onBack}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Create Account</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[["name","Full Name","text"],["email","Email Address","email"],["phone","Phone (+8801XXXXXXXXX)","tel"],["age","Age","number"]].map(([k,p,t]) => (
          <input key={k} className="input" placeholder={p} type={t} value={form[k]} onChange={e => set(k)(e.target.value)} />
        ))}
        <select className="input" value={form.gender} onChange={e => set("gender")(e.target.value)} style={{ color: form.gender ? C.text : C.textMuted }}>
          <option value="">Select Gender</option>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>
        <select className="input" value={form.bloodGroup} onChange={e => set("bloodGroup")(e.target.value)} style={{ color: form.bloodGroup ? C.text : C.textMuted }}>
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
        </select>
        <div style={{ position: "relative" }}>
          <input className="input" placeholder="Password (min 8 chars, A-Z, 0-9)" type={showPass ? "text" : "password"} value={form.password} onChange={e => set("password")(e.target.value)} style={{ paddingRight: 48 }} />
          <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: C.textSub }}>
            <Icon n={showPass ? "eye-off" : "eye"} size={18} />
          </button>
        </div>
        <input className="input" placeholder="Confirm Password" type="password" value={form.confirm} onChange={e => set("confirm")(e.target.value)} />
        {err && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: 12, fontSize: 13, color: C.red }}>⚠️ {err}</div>}
        <button className="btn-primary" onClick={handle} style={{ marginTop: 8 }}>Create Account</button>
      </div>
    </div>
  );
}

function HomeScreen({ user, navigate }) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Appointment reminder: Dr. Rafiqul Islam tomorrow at 10:30 AM", time: "2h ago", read: false },
    { id: 2, text: "Your Bio-Roxion report is ready", time: "Yesterday", read: false },
    { id: 3, text: "Health tip: Drink 8 glasses of water daily", time: "2 days ago", read: true },
  ]);
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const metrics = [
    { icon: "heart", label: "Heart Rate", value: "78", unit: "bpm", color: C.red, status: "Normal" },
    { icon: "activity", label: "Blood Pressure", value: "118/76", unit: "mmHg", color: C.blue, status: "Normal" },
    { icon: "blood", label: "Blood Sugar", value: "95", unit: "mg/dL", color: C.orange, status: "Normal" },
    { icon: "zap", label: "SpO2", value: "98", unit: "%", color: C.cyan, status: "Normal" },
    { icon: "alert", label: "Temperature", value: "36.8", unit: "°C", color: C.purple, status: "Normal" },
    { icon: "user", label: "BMI", value: "23.4", unit: "kg/m²", color: C.green, status: "Normal" },
  ];
  const quickActions = [
    { icon: "activity", label: "AI Analysis", color: C.blue, screen: "analysis" },
    { icon: "cpu", label: "Bio Kit", color: C.cyan, screen: "biokit" },
    { icon: "message", label: "AI Chat", color: C.purple, screen: "chat" },
    { icon: "user", label: "Doctors", color: C.green, screen: "doctors" },
    { icon: "building", label: "Hospitals", color: C.orange, screen: "hospitals" },
    { icon: "navigate", label: "Ambulance", color: C.red, screen: "ambulance" },
    { icon: "alert", label: "SOS", color: C.red, screen: "sos" },
    { icon: "download", label: "Reports", color: C.blue, screen: "reports" },
  ];
  const healthScore = 85;
  const scoreColor = C.green;

  return (
    <div className="screen">
      {showNotif && (
        <div className="modal-overlay" onClick={() => setShowNotif(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Notifications</div>
              <button onClick={() => { setNotifications(n => n.map(x => ({ ...x, read: true }))); }} style={{ fontSize: 13, color: C.blueLight }}>Mark all read</button>
            </div>
            {notifications.map(n => (
              <div key={n.id} onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))} style={{ padding: "14px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer", opacity: n.read ? 0.6 : 1 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.read ? "transparent" : C.blue, marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, color: C.text, lineHeight: 1.5 }}>{n.text}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{n.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "linear-gradient(180deg,#0f2027,#0A0E1A)", padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, color: C.textSub }}>Good Morning 👋</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{user?.name || "User"}</div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{ color: C.textSub, position: "relative" }} onClick={() => setShowNotif(true)}>
              <Icon n="bell" size={22} />
              {unreadCount > 0 && <div className="notif-dot" />}
            </button>
            <button onClick={() => navigate("profile")}><Avatar initials={(user?.name || "U")[0].toUpperCase()} color={C.blue} /></button>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${scoreColor}30`, borderRadius: 20, padding: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke={scoreColor} strokeWidth="8" strokeDasharray={`${(healthScore / 100) * 201} 201`} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: scoreColor }}>{healthScore}</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: C.textSub }}>Health Score</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: scoreColor }}>Excellent</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>All vitals are in normal range</div>
            <div style={{ marginTop: 10 }}><ProgressBar value={healthScore} color={scoreColor} /></div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        <div style={{ marginBottom: 24 }}>
          <div className="section-title">Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {quickActions.map(a => (
              <button key={a.screen} onClick={() => navigate(a.screen)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: `${a.color}12`, border: `1px solid ${a.color}25`, borderRadius: 16, padding: "14px 8px", cursor: "pointer" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${a.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color }}>
                  {a.label === "SOS" ? <span style={{ fontSize: 14, fontWeight: 800, color: C.red }}>SOS</span> : <Icon n={a.icon} size={20} />}
                </div>
                <span style={{ fontSize: 11, color: C.textSub, fontWeight: 500 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="section-title">Health Vitals</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {metrics.map(m => <HealthMetricCard key={m.label} {...m} />)}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="section-title">Upcoming Appointment</div>
          <div className="card" style={{ display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }} onClick={() => navigate("appointments")}>
            <Avatar initials="RF" size={48} color={C.blue} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Dr. Rafiqul Islam</div>
              <div style={{ fontSize: 13, color: C.textSub }}>Cardiology • BSMMU</div>
              <div style={{ fontSize: 12, color: C.cyan, marginTop: 4 }}>📅 Tomorrow, 10:30 AM</div>
            </div>
            <Badge type="green">Confirmed</Badge>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div className="section-title">Recent Report</div>
          <div className="card" onClick={() => navigate("reports")} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Bio-Roxion Full Panel</div>
                <div style={{ fontSize: 13, color: C.textSub }}>18 biomarkers analyzed</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>June 1, 2026</div>
              </div>
              <Badge type="green">Normal</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisScreen({ navigate }) {
  const [step, setStep] = useState(0);
  const [symptoms, setSymptoms] = useState([]);
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const symptomList = ["Fever","Cough","Headache","Fatigue","Chest Pain","Dizziness","Nausea","Weight Loss","Breathing Difficulty","Sore Throat","Body Ache","Loss of Appetite","Vomiting","Diarrhea","Joint Pain","Rash","Swelling","Blurred Vision","Numbness","Palpitations"];
  const severities = ["Mild","Moderate","Severe"];
  const durations = ["1-3 Days","4-7 Days","1-2 Weeks","2-4 Weeks","1+ Month"];
  const historyList = ["Diabetes","Hypertension","Asthma","Heart Disease","Kidney Disease","Cancer History","Thyroid Disorder","Liver Disease","Arthritis"];

  const toggleItem = (arr, setArr, item) => setArr(a => a.includes(item) ? a.filter(x => x !== item) : [...a, item]);

  const analyze = async () => {
    if (!symptoms.length || !severity || !duration) return alert("Please complete all fields");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a Bangladesh medical AI assistant. Analyze these symptoms and respond ONLY in JSON format with no preamble or markdown.

Symptoms: ${symptoms.join(", ")}
Severity: ${severity}
Duration: ${duration}
Medical History: ${history.join(", ") || "None"}

Respond with exactly this JSON structure:
{"risk": <number 0-100>, "confidence": <number 60-95>, "conditions": ["condition1","condition2","condition3"], "tests": ["test1","test2","test3","test4"], "advice": "<brief advice in 1-2 sentences>"}`
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setStep(3);
    } catch {
      // Fallback
      setResult({
        risk: symptoms.includes("Chest Pain") ? 72 : symptoms.includes("Breathing Difficulty") ? 65 : 38,
        confidence: 87,
        conditions: symptoms.includes("Chest Pain") ? ["Angina Pectoris","Acute Gastritis","Anxiety Disorder"] : symptoms.includes("Fever") ? ["Viral Infection","Dengue Fever","Typhoid"] : ["Common Cold","Stress-Related Illness","Dehydration"],
        tests: ["Complete Blood Count (CBC)","CRP Test","Chest X-Ray","Urine Routine"],
        advice: "Please consult with a specialist for proper diagnosis and treatment. Maintain hydration and rest."
      });
      setStep(3);
    }
    setLoading(false);
  };

  if (step === 3 && result) return (
    <div className="screen">
      <div className="header">
        <button onClick={() => { setStep(0); setResult(null); setSymptoms([]); setSeverity(""); setDuration(""); setHistory([]); }}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Analysis Result</div>
      </div>
      <div style={{ padding: "0 20px" }} className="fade">
        <div style={{ background: result.risk > 60 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", border: `1px solid ${result.risk > 60 ? C.red : C.orange}30`, borderRadius: 20, padding: 20, marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Risk Score</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: result.risk > 60 ? C.red : result.risk > 40 ? C.orange : C.green }}>{result.risk}</div>
          <div style={{ fontSize: 14, color: C.textSub }}>/100 • Confidence: {result.confidence}%</div>
          <div style={{ marginTop: 12 }}><ProgressBar value={result.risk} color={result.risk > 60 ? C.red : result.risk > 40 ? C.orange : C.green} /></div>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Possible Conditions</div>
          {(result.conditions || []).map((c, i) => (
            <div key={c} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < result.conditions.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: 14 }}>{c}</span>
              <span style={{ fontSize: 13, color: i === 0 ? C.red : i === 1 ? C.orange : C.textSub }}>{i === 0 ? "Most Likely" : i === 1 ? "Possible" : "Less Likely"}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Suggested Tests</div>
          {(result.tests || []).map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
              <Icon n="check" size={16} color={C.green} />
              <span style={{ fontSize: 14, color: C.textSub }}>{t}</span>
            </div>
          ))}
        </div>
        {result.advice && (
          <div className="card" style={{ marginBottom: 16, background: "rgba(6,182,212,0.08)", border: `1px solid ${C.cyan}30` }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: C.cyan }}>🤖 AI Advice</div>
            <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6 }}>{result.advice}</div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <button className="btn-primary" onClick={() => navigate("biokit")} style={{ flex: 1, padding: 14 }}>Start Bio-Kit Test</button>
          <button className="btn-outline" onClick={() => navigate("doctors")} style={{ flex: 1, padding: 14 }}>Find Doctor</button>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minHeight: "100%" }}>
      <Spinner />
      <div style={{ fontSize: 18, fontWeight: 600 }}>AI Analyzing Symptoms...</div>
      <div style={{ fontSize: 13, color: C.textSub }}>Processing {symptoms.length} symptoms with medical AI</div>
    </div>
  );

  return (
    <div className="screen">
      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>AI Symptom Analysis</div>
      </div>
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
        {["Symptoms","Severity","History"].map((s, i) => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? C.blue : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ padding: "0 20px" }}>
        {step === 0 && (
          <div className="fade">
            <div className="section-title">Select Your Symptoms</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              {symptomList.map(s => (
                <button key={s} onClick={() => toggleItem(symptoms, setSymptoms, s)} style={{ padding: "10px 16px", borderRadius: 20, border: `1px solid ${symptoms.includes(s) ? C.blue : "rgba(255,255,255,0.15)"}`, background: symptoms.includes(s) ? `${C.blue}20` : "transparent", color: symptoms.includes(s) ? C.blueLight : C.textSub, fontSize: 14, fontWeight: symptoms.includes(s) ? 600 : 400, cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 16 }}>{symptoms.length} selected</div>
            <button className="btn-primary" onClick={() => symptoms.length ? setStep(1) : alert("Select at least 1 symptom")}>Next →</button>
          </div>
        )}
        {step === 1 && (
          <div className="fade">
            <div className="section-title" style={{ marginBottom: 20 }}>Symptom Severity</div>
            {severities.map(s => (
              <div key={s} onClick={() => setSeverity(s)} style={{ padding: 18, borderRadius: 16, border: `1px solid ${severity === s ? C.blue : "rgba(255,255,255,0.12)"}`, background: severity === s ? `${C.blue}15` : C.bgCard, marginBottom: 12, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{s}</div>
                  <div style={{ fontSize: 13, color: C.textSub }}>{s === "Mild" ? "Manageable, daily activities normal" : s === "Moderate" ? "Affecting daily activities" : "Severe discomfort, urgent care needed"}</div>
                </div>
                {severity === s && <Icon n="check" size={20} color={C.blue} />}
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <div className="section-title" style={{ marginBottom: 12 }}>Duration</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                {durations.map(d => (
                  <button key={d} onClick={() => setDuration(d)} style={{ padding: "10px 16px", borderRadius: 20, border: `1px solid ${duration === d ? C.cyan : "rgba(255,255,255,0.15)"}`, background: duration === d ? `${C.cyan}20` : "transparent", color: duration === d ? C.cyan : C.textSub, fontSize: 13, cursor: "pointer" }}>{d}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-outline" onClick={() => setStep(0)} style={{ flex: 1 }}>Back</button>
              <button className="btn-primary" onClick={() => severity && duration ? setStep(2) : alert("Select severity and duration")} style={{ flex: 1 }}>Next →</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="fade">
            <div className="section-title">Medical History (Optional)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              {historyList.map(h => (
                <button key={h} onClick={() => toggleItem(history, setHistory, h)} style={{ padding: "10px 16px", borderRadius: 20, border: `1px solid ${history.includes(h) ? C.purple : "rgba(255,255,255,0.15)"}`, background: history.includes(h) ? `${C.purple}20` : "transparent", color: history.includes(h) ? C.purpleLight : C.textSub, fontSize: 14, cursor: "pointer" }}>{h}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</button>
              <button className="btn-primary" onClick={analyze} style={{ flex: 1 }}>Analyze 🔬</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BioKitScreen({ navigate }) {
  const [connected, setConnected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [sample, setSample] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  const stages = ["Sample Collection","Biomarker Extraction","Molecular Analysis","AI Validation","Report Generation"];
  const scan = () => { setScanning(true); setTimeout(() => { setScanning(false); setConnected(true); }, 2500); };
  const startTest = () => {
    if (!sample) return alert("Select a sample type");
    setProcessing(true); setStage(0);
    const advance = (s) => { if (s < stages.length) { setTimeout(() => { setStage(s); advance(s + 1); }, 1200); } else { setTimeout(() => { setProcessing(false); setDone(true); }, 800); } };
    advance(1);
  };

  if (done) return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, minHeight: "100%", gap: 20 }}>
      <div style={{ fontSize: 72 }}>✅</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>Analysis Complete!</div>
      <div style={{ fontSize: 14, color: C.textSub, textAlign: "center" }}>Your biomarker results are ready</div>
      <button className="btn-primary" style={{ width: "100%", marginTop: 16 }} onClick={() => navigate("biokitresults")}>View Results →</button>
      <button className="btn-outline" style={{ width: "100%" }} onClick={() => { setDone(false); setSample(null); setConnected(false); }}>Run New Test</button>
    </div>
  );

  if (processing) return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, minHeight: "100%", gap: 24 }}>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg viewBox="0 0 120 120" className="spin">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="8" />
          <circle cx="60" cy="60" r="54" fill="none" stroke={C.cyan} strokeWidth="8" strokeDasharray="85 254" strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🔬</div>
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, color: C.text }}>Processing {sample} Sample</div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {stages.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: i < stage ? `${C.green}15` : i === stage ? `${C.cyan}15` : C.bgCard, border: `1px solid ${i < stage ? C.green : i === stage ? C.cyan : "rgba(255,255,255,0.08)"}30` }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < stage ? `${C.green}20` : i === stage ? `${C.cyan}20` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: i < stage ? C.green : i === stage ? C.cyan : C.textMuted, fontSize: 14, fontWeight: 700 }}>
              {i < stage ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 14, color: i < stage ? C.green : i === stage ? C.cyan : C.textMuted, fontWeight: i === stage ? 600 : 400 }}>{s}</span>
            {i === stage && <div style={{ marginLeft: "auto" }}><Spinner /></div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="screen">
      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Bio-Roxion Kit</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div className="card" style={{ marginBottom: 20, background: connected ? "rgba(16,185,129,0.1)" : C.bgCard, border: `1px solid ${connected ? C.green : C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 36 }}>📡</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{connected ? "Bio-Roxion Kit 01" : "No Device Connected"}</div>
                <div style={{ fontSize: 13, color: connected ? C.green : C.textSub }}>{connected ? "🟢 Connected • Battery 87%" : "Tap to scan for device"}</div>
              </div>
            </div>
            {!connected && (
              <button onClick={scan} style={{ padding: "10px 16px", borderRadius: 10, background: `${C.blue}20`, border: `1px solid ${C.blue}40`, color: C.blueLight, fontSize: 13, fontWeight: 600 }}>
                {scanning ? "Scanning..." : "Scan"}
              </button>
            )}
          </div>
          {connected && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[["Battery","87%",C.green],["Signal","Strong",C.cyan],["Sync","Ready",C.blue]].map(([k,v,c]) => (
                <div key={k} style={{ textAlign: "center", padding: "10px 0" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: c }}>{v}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{k}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="section-title">Select Sample Type</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {[
            { type: "Blood Sample", desc: "Full blood panel — CBC, glucose, lipids, liver enzymes", icon: "🩸", color: C.red },
            { type: "Urine Sample", desc: "Urinalysis — kidney function, infection markers, glucose", icon: "🧪", color: C.orange },
            { type: "Saliva Sample", desc: "Hormones, cortisol, inflammatory markers, DNA analysis", icon: "💧", color: C.blue },
          ].map(s => (
            <div key={s.type} onClick={() => setSample(s.type)} style={{ padding: 18, borderRadius: 16, border: `1px solid ${sample === s.type ? s.color : "rgba(255,255,255,0.12)"}`, background: sample === s.type ? `${s.color}12` : C.bgCard, cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 32 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{s.type}</div>
                <div style={{ fontSize: 12, color: C.textSub, marginTop: 2 }}>{s.desc}</div>
              </div>
              {sample === s.type && <Icon n="check" size={20} color={s.color} />}
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={startTest} disabled={!connected}>
          {!connected ? "Connect Device First" : "Start Analysis 🔬"}
        </button>
      </div>
    </div>
  );
}

function BioKitResultsScreen({ navigate }) {
  const [toast, setToast] = useState("");
  const biomarkers = [
    { name: "Hemoglobin", value: 14.2, unit: "g/dL", normal: "13.5-17.5", status: "Normal" },
    { name: "WBC Count", value: 6800, unit: "/μL", normal: "4500-11000", status: "Normal" },
    { name: "Platelet Count", value: 285000, unit: "/μL", normal: "150000-400000", status: "Normal" },
    { name: "Glucose (Fasting)", value: 118, unit: "mg/dL", normal: "70-100", status: "High" },
    { name: "HbA1c", value: 6.1, unit: "%", normal: "<5.7", status: "High" },
    { name: "Total Cholesterol", value: 185, unit: "mg/dL", normal: "<200", status: "Normal" },
    { name: "LDL", value: 112, unit: "mg/dL", normal: "<100", status: "High" },
    { name: "HDL", value: 52, unit: "mg/dL", normal: ">40", status: "Normal" },
    { name: "Triglycerides", value: 145, unit: "mg/dL", normal: "<150", status: "Normal" },
    { name: "CRP (C-Reactive Protein)", value: 2.1, unit: "mg/L", normal: "<3.0", status: "Normal" },
    { name: "Creatinine", value: 0.9, unit: "mg/dL", normal: "0.7-1.2", status: "Normal" },
    { name: "SGPT (ALT)", value: 35, unit: "U/L", normal: "7-56", status: "Normal" },
  ];
  const statusColor = s => s === "Normal" ? C.green : s === "High" ? C.red : C.orange;
  const abnormal = biomarkers.filter(b => b.status !== "Normal");

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      <div className="header">
        <button onClick={() => navigate("biokit")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Biomarker Results</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.green }}>{biomarkers.length - abnormal.length}</div>
            <div style={{ fontSize: 12, color: C.textSub }}>Normal</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.orange }}>{abnormal.length}</div>
            <div style={{ fontSize: 12, color: C.textSub }}>Needs Attention</div>
          </div>
        </div>
        {abnormal.length > 0 && (
          <div className="card" style={{ marginBottom: 20, background: "rgba(245,158,11,0.08)", border: `1px solid ${C.orange}30` }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>🤖</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.orange, marginBottom: 6 }}>AI Insights</div>
                <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6 }}>Elevated glucose and LDL detected. Pre-diabetic markers present. Recommend dietary changes, exercise plan, and follow-up in 3 months. Consider consulting an Endocrinologist.</div>
              </div>
            </div>
          </div>
        )}
        <div className="section-title">Detailed Results</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {biomarkers.map(b => (
            <div key={b.name} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Normal: {b.normal}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: statusColor(b.status) }}>{b.value.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{b.unit}</div>
              </div>
              <div style={{ marginLeft: 12 }}><Badge type={b.status === "Normal" ? "green" : "orange"}>{b.status}</Badge></div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <button className="btn-primary" onClick={() => navigate("chat")} style={{ flex: 1 }}>Explain with AI</button>
          <button onClick={() => setToast("Report saved to your device!")} style={{ flex: 1, padding: 14, borderRadius: 12, border: `1px solid ${C.border}`, color: C.textSub, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14 }}>
            <Icon n="download" size={18} /> PDF
          </button>
          <button onClick={() => setToast("Report link copied!")} style={{ width: 50, padding: 14, borderRadius: 12, border: `1px solid ${C.border}`, color: C.textSub, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n="share" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ navigate }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm Bio-Roxion Health AI 🏥\n\nI can:\n• Explain your test results\n• Answer health questions\n• Suggest doctors in Bangladesh\n• Provide medical information\n\nHow can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatMode, setChatMode] = useState("ai");
  const endRef = useRef();

  // mode অনুযায়ী আলাদা suggestion chips
  const suggestionsByMode = {
    ai: ["Explain my report", "What does high LDL mean?", "Is 118 glucose serious?", "What is BMI?"],
    doctor: ["Which doctor for diabetes?", "Best cardiologist in Dhaka", "Find a gynecologist", "Pediatrician near me"],
    support: ["How to book an ambulance?", "How to use Bio-Roxion Kit?", "App not syncing properly", "Contact support team"],
  };

  // Offline/local smart replies — keyword match করে রিয়েলিস্টিক উত্তর দেয়
  const localKnowledge = [
    { keys: ["report", "result", "biomarker"], reply: "Your last Bio-Kit report shows mostly normal values, but Glucose, HbA1c and LDL are slightly elevated — this points toward an early pre-diabetes risk. I'd suggest reducing sugar intake, regular walking, and a follow-up test in 3 months. Please consult an Endocrinologist for a proper review." },
    { keys: ["ldl", "cholesterol"], reply: "LDL is often called 'bad cholesterol'. A high LDL level can increase heart disease risk over time. Eating less oily/fried food, adding more fiber, and regular exercise usually helps. If it stays high, a doctor may prescribe medication." },
    { keys: ["glucose", "sugar", "diabet"], reply: "A fasting glucose of 118 mg/dL is slightly above the normal range (70-100 mg/dL) — this is called 'pre-diabetes'. It's not an emergency, but monitoring diet, increasing exercise, and re-testing in a few months is important. An Endocrinologist can guide you further." },
    { keys: ["bmi"], reply: "BMI (Body Mass Index) measures weight relative to height. A BMI between 18.5–24.9 is considered healthy. Your current BMI of 23.4 falls within the normal range — great job maintaining it!" },
    { keys: ["diabetes doctor", "endocrin"], reply: "For diabetes management, an Endocrinologist is the right specialist. In Dhaka, BIRDEM Hospital and BSMMU have excellent endocrinology departments. You can book directly from the Doctors tab." },
    { keys: ["cardiolog", "heart"], reply: "For heart-related concerns, a Cardiologist is recommended. BSMMU, Square Hospital and Evercare Hospital in Dhaka have highly rated cardiologists available — check the Doctors section to book." },
    { keys: ["gynaecolog", "gynecolog", "pregnan"], reply: "For pregnancy or gynecological care, Dhaka Medical College and Popular Diagnostic Centre have experienced specialists. You can filter by 'Gynecology' in the Doctors tab to find one near you." },
    { keys: ["pediatric", "child"], reply: "For child healthcare, Shishu Hospital and Ad-din Hospital have dedicated pediatric specialists. You can find and book one from the Doctors tab by selecting 'Pediatrics'." },
    { keys: ["hospital", "dhaka"], reply: "Some top hospitals in Dhaka include BSMMU, Square Hospital, United Hospital, and Evercare Hospital — all offer 24/7 emergency services and multiple specialist departments." },
    { keys: ["ambulance"], reply: "You can book an ambulance from the Ambulance tab — it shows nearby ambulances with ICU/AC options, fare estimates and ETA. For emergencies, use the SOS button for instant dispatch." },
    { keys: ["bio-roxion kit", "bio kit", "device", "sync"], reply: "To use the Bio-Roxion Kit: go to the Bio-Kit tab, tap 'Scan' to connect your device via Bluetooth, select your sample type (blood/urine/saliva), then tap 'Start Analysis'. Make sure Bluetooth is on and the device is charged." },
    { keys: ["support", "contact", "help"], reply: "Our support team typically responds within 24 hours via the app. For urgent medical emergencies, please use the SOS button on the Home screen instead." },
  ];

  const getFallbackReply = (text, mode) => {
    const lower = text.toLowerCase();
    const match = localKnowledge.find(item => item.keys.some(k => lower.includes(k)));
    if (match) return match.reply;
    if (mode === "doctor") return "I'd recommend checking the Doctors section — you can filter by specialty and district to find the best match for your needs near you.";
    if (mode === "support") return "Thanks for letting us know! Our team will look into this. For urgent issues, please use the SOS button on the Home screen.";
    return "That's a good question. While I can share general health information, please consult a qualified doctor for an accurate diagnosis — you can find nearby specialists in the Doctors section.";
  };

  const sendToAI = async (text) => {
    const history = messages.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are a helpful medical AI assistant for Bangladesh healthcare. You help patients understand their health reports, suggest specialist doctors, explain medical terms, and provide health information relevant to Bangladesh. Be helpful, empathetic and concise. When suggesting doctors, mention Bangladeshi hospitals and specialties. Never diagnose definitively — always recommend consulting a doctor.",
          messages: [...history, { role: "user", content: text }]
        })
      });
      if (!response.ok) throw new Error("API not reachable");
      const data = await response.json();
      const aiText = data.content?.[0]?.text;
      if (!aiText) throw new Error("Empty AI response");
      return aiText;
    } catch {
      // API না পেলে স্মার্ট fallback রিপ্লাই দেবে — demo কখনো ব্রেক করবে না
      return getFallbackReply(text, chatMode);
    }
  };

  const send = async (msg) => {
    const text = msg || input.trim();
    if (!text) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    const reply = await sendToAI(text);
    setTyping(false);
    setMessages(m => [...m, { role: "ai", text: reply }]);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: C.bg }}>
      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Bio-Roxion Health AI</div>
          <div style={{ fontSize: 12, color: C.green }}>🟢 Online</div>
        </div>
        <Avatar initials="AI" size={36} color={C.purple} />
      </div>
      {/* Mode Tabs */}
      <div style={{ padding: "8px 16px", display: "flex", gap: 8 }}>
        {[["ai","🤖 AI Chat"],["doctor","👨‍⚕️ Doctors"],["support","💬 Support"]].map(([m, label]) => (
          <button key={m} onClick={() => setChatMode(m)} style={{ padding: "8px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, ...(chatMode === m ? { background: `${C.purple}30`, color: C.purpleLight, border: `1px solid ${C.purple}50` } : { background: "transparent", color: C.textMuted, border: `1px solid ${C.border}` }) }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            {m.role === "ai" && <Avatar initials="AI" size={32} color={C.purple} style={{ marginRight: 8, flexShrink: 0 }} />}
            <div style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? `linear-gradient(135deg,${C.blue},${C.cyan})` : C.bgCard2, border: m.role === "ai" ? `1px solid ${C.border}` : "none", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", color: C.text }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Avatar initials="AI" size={32} color={C.purple} />
            <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: C.bgCard2, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(i => <div key={i} className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: C.purple, animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "8px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
        {suggestionsByMode[chatMode].map(s => (
          <button key={s} onClick={() => send(s)} style={{ whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: "transparent", color: C.textSub, fontSize: 12, cursor: "pointer" }}>{s}</button>
        ))}
      </div>
      <div style={{ padding: "12px 16px 20px", display: "flex", gap: 12, alignItems: "center", borderTop: `1px solid ${C.border}` }}>
        <input className="input" style={{ flex: 1, padding: "12px 16px" }} placeholder={chatMode === "doctor" ? "Ask about doctors or specialists..." : chatMode === "support" ? "Describe your issue..." : "Ask about your health..."} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button onClick={() => send()} style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
          <Icon n="send" size={18} />
        </button>
      </div>
    </div>
  );
}

function DoctorsScreen({ navigate, onSelectDoctor }) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [district, setDistrict] = useState("");
  const [gender, setGender] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxFee, setMaxFee] = useState(5000);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [toast, setToast] = useState("");

  const filtered = BD_DOCTORS.filter(d =>
    (!search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase())) &&
    (!specialty || d.specialty === specialty) &&
    (!district || d.district === district) &&
    (!gender || d.gender === gender) &&
    d.rating >= minRating &&
    d.fee <= maxFee
  );

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <Avatar initials={selectedDoc.img} size={64} color={selectedDoc.gender === "Female" ? C.purple : C.blue} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedDoc.name}</div>
                <div style={{ fontSize: 14, color: C.cyan }}>{selectedDoc.specialty}</div>
                <div style={{ fontSize: 13, color: C.textSub }}>{selectedDoc.qualification}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <Badge type="blue">⭐ {selectedDoc.rating} ({selectedDoc.reviews} reviews)</Badge>
              <Badge type="green">{selectedDoc.experience} yrs exp</Badge>
              <Badge type={selectedDoc.available ? "green" : "orange"}>{selectedDoc.available ? "Available" : "Busy"}</Badge>
            </div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textSub, marginBottom: 8 }}>About</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: C.text }}>{selectedDoc.bio}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[
                ["🏥 Hospitals", selectedDoc.hospitals.join(", ")],
                ["⏰ Visiting Hours", selectedDoc.visitingHours],
                ["💰 Consultation Fee", `৳${selectedDoc.fee}`],
                ["🌍 Languages", selectedDoc.languages.join(", ")],
                ["📍 Location", `${selectedDoc.district}, ${selectedDoc.division}`],
              ].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 13, color: C.textSub, minWidth: 120 }}>{k}</span>
                  <span style={{ fontSize: 13, color: C.text }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href={`tel:${selectedDoc.phone}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, borderRadius: 10, background: `${C.green}15`, border: `1px solid ${C.green}30`, color: C.green, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                <Icon n="phone" size={15} /> Call
              </a>
              <button onClick={() => { setSelectedDoc(null); navigate("appointments"); }} style={{ flex: 2, padding: 12, borderRadius: 10, background: `linear-gradient(135deg,${C.blue},${C.cyan})`, color: "#fff", fontSize: 13, fontWeight: 600 }}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      {showFilter && (
        <div className="modal-overlay" onClick={() => setShowFilter(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Filter Doctors</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Gender</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["","Male","Female"].map(g => (
                  <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${gender === g ? C.blue : C.border}`, background: gender === g ? `${C.blue}20` : "transparent", color: gender === g ? C.blueLight : C.textSub, fontSize: 13 }}>{g || "All"}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Min Rating: ⭐ {minRating || "Any"}</div>
              <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={e => setMinRating(+e.target.value)} style={{ width: "100%", accentColor: C.blue }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Max Fee: ৳{maxFee}</div>
              <input type="range" min={500} max={5000} step={100} value={maxFee} onChange={e => setMaxFee(+e.target.value)} style={{ width: "100%", accentColor: C.blue }} />
            </div>
            <button className="btn-primary" onClick={() => setShowFilter(false)}>Apply Filters</button>
          </div>
        </div>
      )}

      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Find Doctors</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.textSub }}>{filtered.length} found</span>
          <button onClick={() => setShowFilter(true)}><Icon n="filter" size={20} color={C.blueLight} /></button>
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <Icon n="search" size={18} color={C.textMuted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input className="input" style={{ paddingLeft: 42 }} placeholder="Search by name, specialty, hospital..." value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: C.textMuted }}><Icon n="x" size={16} /></button>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <select className="input" style={{ padding: "10px 12px", fontSize: 13 }} value={specialty} onChange={e => setSpecialty(e.target.value)}>
            <option value="">All Specialties</option>
            {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="input" style={{ padding: "10px 12px", fontSize: 13 }} value={district} onChange={e => setDistrict(e.target.value)}>
            <option value="">All Districts</option>
            {DISTRICTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: C.textSub }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>No doctors found</div>
            <button onClick={() => { setSearch(""); setSpecialty(""); setDistrict(""); setGender(""); setMinRating(0); setMaxFee(5000); }} style={{ marginTop: 12, color: C.blueLight, fontSize: 13 }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 16 }}>
            {filtered.map(d => (
              <div key={d.id} className="card">
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <Avatar initials={d.img} size={52} color={d.gender === "Female" ? C.purple : C.blue} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{d.name}</div>
                    <div style={{ fontSize: 13, color: C.cyan, marginBottom: 2 }}>{d.specialty}</div>
                    <div style={{ fontSize: 12, color: C.textSub }}>{d.hospital} • {d.district}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, color: C.orange }}>⭐ {d.rating}</span>
                      <span style={{ fontSize: 12, color: C.textMuted }}>{d.experience}yr exp</span>
                      <span style={{ fontSize: 12, color: C.green }}>৳{d.fee}</span>
                      <Badge type={d.available ? "green" : "orange"}>{d.available ? "Available" : "Busy"}</Badge>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button onClick={() => setSelectedDoc(d)} style={{ flex: 1, padding: 10, borderRadius: 10, background: `${C.blue}15`, border: `1px solid ${C.blue}30`, color: C.blueLight, fontSize: 13, fontWeight: 500 }}>View Profile</button>
                  <a href={`tel:${d.phone}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, borderRadius: 10, background: `${C.green}15`, border: `1px solid ${C.green}30`, color: C.green, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                    <Icon n="phone" size={15} /> Call
                  </a>
                  <button onClick={() => navigate("appointments")} style={{ flex: 2, padding: 10, borderRadius: 10, background: `linear-gradient(135deg,${C.blue},${C.cyan})`, color: "#fff", fontSize: 13, fontWeight: 600 }}>
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentsScreen({ navigate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [type, setType] = useState("");
  const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState("book");
  const [toast, setToast] = useState("");

  const times = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","02:00 PM","02:30 PM","03:00 PM","04:00 PM","04:30 PM"];
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; });

  const pastAppointments = [
    { doctor: "Dr. Rafiqul Islam", specialty: "Cardiology", date: "May 15, 2026", time: "10:30 AM", status: "Completed", type: "In-Person" },
    { doctor: "Dr. Dilruba Akhter", specialty: "Endocrinology", date: "April 20, 2026", time: "11:00 AM", status: "Completed", type: "Video Call" },
    { doctor: "Dr. A.K.M. Shamsuzzoha", specialty: "Neurology", date: "March 8, 2026", time: "09:30 AM", status: "Cancelled", type: "In-Person" },
  ];

  if (booked) return (
    <div className="screen-no-nav" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, minHeight: "100%" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>Appointment Booked!</div>
      <div style={{ fontSize: 14, color: C.textSub, marginTop: 8, textAlign: "center" }}>
        Dr. Rafiqul Islam • {selectedDate?.toDateString()} • {selectedTime}
      </div>
      <div style={{ marginTop: 12 }}><Badge type="green">Confirmation SMS Sent</Badge></div>
      <div style={{ display: "flex", gap: 12, marginTop: 32, width: "100%" }}>
        <button className="btn-outline" onClick={() => { setBooked(false); setActiveTab("history"); }} style={{ flex: 1 }}>View History</button>
        <button className="btn-primary" onClick={() => navigate("home")} style={{ flex: 1 }}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      <div className="header">
        <button onClick={() => navigate("doctors")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Appointments</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", background: C.bgCard, borderRadius: 12, padding: 4, marginBottom: 20, gap: 4 }}>
          {[["book","Book New"],["history","History"]].map(([t, label]) => (
            <button key={t} onClick={() => setActiveTab(t)} className={activeTab === t ? "tab-active" : "tab-inactive"} style={{ flex: 1, padding: "10px", fontSize: 14, fontWeight: 500 }}>{label}</button>
          ))}
        </div>

        {activeTab === "book" && (
          <>
            <div className="card" style={{ marginBottom: 20, display: "flex", gap: 14 }}>
              <Avatar initials="RI" size={48} color={C.blue} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Dr. Rafiqul Islam</div>
                <div style={{ fontSize: 13, color: C.cyan }}>Cardiology • BSMMU</div>
                <div style={{ fontSize: 12, color: C.textSub }}>Consultation: ৳1,500</div>
              </div>
            </div>
            <div className="section-title">Select Date</div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
              {days.map(d => (
                <button key={d.toDateString()} onClick={() => setSelectedDate(d)} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 16px", borderRadius: 14, border: `1px solid ${selectedDate?.toDateString() === d.toDateString() ? C.blue : "rgba(255,255,255,0.12)"}`, background: selectedDate?.toDateString() === d.toDateString() ? `${C.blue}20` : C.bgCard, minWidth: 64 }}>
                  <span style={{ fontSize: 11, color: C.textSub }}>{d.toLocaleDateString("en", { weekday: "short" })}</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: selectedDate?.toDateString() === d.toDateString() ? C.blueLight : C.text }}>{d.getDate()}</span>
                </button>
              ))}
            </div>
            <div className="section-title">Select Time</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {times.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)} style={{ padding: "12px", borderRadius: 12, border: `1px solid ${selectedTime === t ? C.cyan : "rgba(255,255,255,0.12)"}`, background: selectedTime === t ? `${C.cyan}20` : C.bgCard, color: selectedTime === t ? C.cyan : C.textSub, fontSize: 14, fontWeight: selectedTime === t ? 600 : 400 }}>{t}</button>
              ))}
            </div>
            <div className="section-title">Consultation Type</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              {["In-Person","Video Call","Phone Call"].map(t => (
                <button key={t} onClick={() => setType(t)} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1px solid ${type === t ? C.purple : "rgba(255,255,255,0.12)"}`, background: type === t ? `${C.purple}20` : C.bgCard, color: type === t ? C.purpleLight : C.textSub, fontSize: 12, fontWeight: type === t ? 600 : 400 }}>{t}</button>
              ))}
            </div>
            <button className="btn-primary" onClick={() => { if (!selectedDate || !selectedTime || !type) return alert("Please select date, time and consultation type"); setBooked(true); }}>
              Confirm Booking — ৳1,500
            </button>
          </>
        )}

        {activeTab === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pastAppointments.map((a, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{a.doctor}</div>
                    <div style={{ fontSize: 13, color: C.cyan }}>{a.specialty}</div>
                    <div style={{ fontSize: 12, color: C.textSub, marginTop: 4 }}>📅 {a.date} • ⏰ {a.time}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>📋 {a.type}</div>
                  </div>
                  <Badge type={a.status === "Completed" ? "green" : "orange"}>{a.status}</Badge>
                </div>
                {a.status === "Completed" && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => navigate("doctors")} style={{ flex: 1, padding: "10px", borderRadius: 10, background: `${C.blue}15`, border: `1px solid ${C.blue}30`, color: C.blueLight, fontSize: 13 }}>Book Again</button>
                    <button onClick={() => setToast("Review submitted! Thank you.")} style={{ flex: 1, padding: "10px", borderRadius: 10, background: `${C.orange}15`, border: `1px solid ${C.orange}30`, color: C.orange, fontSize: 13 }}>Rate ⭐</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HospitalsScreen({ navigate }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [toast, setToast] = useState("");

  const filtered = BD_HOSPITALS.filter(h =>
    (!search || h.name.toLowerCase().includes(search.toLowerCase()) || h.district.toLowerCase().includes(search.toLowerCase()) || h.short.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || h.type === typeFilter)
  );

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      {selectedHospital && (
        <div className="modal-overlay" onClick={() => setSelectedHospital(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedHospital.name}</div>
                <div style={{ fontSize: 13, color: C.textSub, marginTop: 2 }}>{selectedHospital.address}</div>
              </div>
              <Badge type={selectedHospital.emergency ? "red" : "blue"}>{selectedHospital.type}</Badge>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.green }}>{selectedHospital.beds}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Beds</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.orange }}>⭐ {selectedHospital.rating}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Rating</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.blue }}>{selectedHospital.established}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Est.</div>
              </div>
            </div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Departments</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selectedHospital.departments.map(d => (
                  <span key={d} style={{ padding: "4px 10px", borderRadius: 20, background: `${C.blue}15`, color: C.blueLight, fontSize: 12 }}>{d}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: C.textSub }}>📞 Emergency</span>
                <a href={`tel:${selectedHospital.phone}`} style={{ fontSize: 13, color: C.red, textDecoration: "none", fontWeight: 600 }}>{selectedHospital.phone}</a>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: C.textSub }}>🚑 Ambulance</span>
                <a href={`tel:${selectedHospital.ambulance}`} style={{ fontSize: 13, color: C.orange, textDecoration: "none", fontWeight: 600 }}>{selectedHospital.ambulance}</a>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: C.textSub }}>⏰ Hours</span>
                <span style={{ fontSize: 13, color: C.text }}>{selectedHospital.openHours}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href={`tel:${selectedHospital.phone}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, borderRadius: 10, background: `${C.red}15`, border: `1px solid ${C.red}30`, color: C.red, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                <Icon n="phone" size={15} /> Emergency
              </a>
              <button onClick={() => { setSelectedHospital(null); navigate("doctors"); }} style={{ flex: 1, padding: 12, borderRadius: 10, background: `${C.blue}15`, border: `1px solid ${C.blue}30`, color: C.blueLight, fontSize: 13 }}>
                View Doctors
              </button>
              <a href={`https://maps.google.com/?q=${selectedHospital.lat},${selectedHospital.lon}`} target="_blank" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, borderRadius: 10, background: `${C.green}15`, border: `1px solid ${C.green}30`, color: C.green, fontSize: 13, textDecoration: "none" }}>
                <Icon n="map" size={15} /> Map
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Hospitals</div>
        <div style={{ marginLeft: "auto", fontSize: 13, color: C.textSub }}>{filtered.length}+</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <Icon n="search" size={18} color={C.textMuted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input className="input" style={{ paddingLeft: 42 }} placeholder="Search hospitals or district..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
          {["","Government","Private","Specialized"].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: 20, border: `1px solid ${typeFilter === t ? C.blue : C.border}`, background: typeFilter === t ? `${C.blue}20` : "transparent", color: typeFilter === t ? C.blueLight : C.textSub, fontSize: 13 }}>{t || "All Types"}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(h => (
            <div key={h.id} className="card" style={{ cursor: "pointer" }} onClick={() => setSelectedHospital(h)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ flex: 1, marginRight: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{h.name}</div>
                  <div style={{ fontSize: 12, color: C.textSub, marginTop: 2 }}>{h.address}</div>
                </div>
                <Badge type={h.emergency ? "red" : "blue"}>{h.emergency ? "24/7" : "Outpatient"}</Badge>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: C.orange }}>⭐ {h.rating}</span>
                <span style={{ fontSize: 12, color: C.textMuted }}>{h.beds} beds</span>
                <span style={{ fontSize: 12, color: C.textMuted }}>{h.type}</span>
                <span style={{ fontSize: 12, color: C.textMuted }}>{h.district}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={`tel:${h.phone}`} onClick={e => e.stopPropagation()} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, borderRadius: 10, background: `${C.green}15`, border: `1px solid ${C.green}30`, color: C.green, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                  <Icon n="phone" size={15} /> Call
                </a>
                <a href={`https://maps.google.com/?q=${h.lat},${h.lon}`} target="_blank" onClick={e => e.stopPropagation()} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 10, borderRadius: 10, background: `${C.blue}15`, border: `1px solid ${C.blue}30`, color: C.blueLight, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                  <Icon n="map" size={15} /> Navigate
                </a>
                <button onClick={e => { e.stopPropagation(); setSelectedHospital(h); }} style={{ flex: 1, padding: 10, borderRadius: 10, background: `${C.purple}15`, border: `1px solid ${C.purple}30`, color: C.purpleLight, fontSize: 13 }}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AmbulanceScreen({ navigate }) {
  const [booking, setBooking] = useState(null);
  const [booked, setBooked] = useState(false);
  const [toast, setToast] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [showBloodBanks, setShowBloodBanks] = useState(false);

  const confirmBooking = () => {
    if (!pickupAddress) return alert("Enter pickup address");
    setBooked(true);
    setTimeout(() => { setBooked(false); setBooking(null); setPickupAddress(""); setToast(`${booking.name} booked! Driver: ${booking.driver} is on the way.`); }, 100);
  };

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      {booking && (
        <div className="modal-overlay" onClick={() => setBooking(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Book Ambulance</div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{booking.name}</div>
              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: C.textSub }}>🚑 {booking.type}</span>
                <span style={{ fontSize: 13, color: booking.icu ? C.green : C.textMuted }}>{booking.icu ? "✅ ICU" : "No ICU"}</span>
                <span style={{ fontSize: 13, color: booking.ac ? C.blue : C.textMuted }}>{booking.ac ? "❄️ AC" : "No AC"}</span>
                <span style={{ fontSize: 13, color: C.orange }}>⏱ ETA: {booking.eta}</span>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Pickup Address</div>
              <textarea className="input" style={{ height: 80, resize: "none" }} placeholder="Enter your current address / location" value={pickupAddress} onChange={e => setPickupAddress(e.target.value)} />
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, padding: 12, borderRadius: 12, background: C.bgCard, border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>{booking.fare}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Estimated Fare</div>
              </div>
              <div style={{ flex: 1, padding: 12, borderRadius: 12, background: C.bgCard, border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.blue }}>{booking.eta}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Est. Arrival</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setBooking(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button onClick={confirmBooking} className="btn-primary" style={{ flex: 2 }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Ambulance Service</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 16, padding: 16, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 28 }}>🚨</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.red }}>Emergency? Press SOS</div>
            <div style={{ fontSize: 12, color: C.textSub }}>For immediate dispatch and auto-notification</div>
          </div>
          <button onClick={() => navigate("sos")} style={{ marginLeft: "auto", padding: "10px 16px", borderRadius: 10, background: C.red, color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>SOS</button>
        </div>

        <div className="section-title">Nearby Ambulances</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {AMBULANCES.map(a => (
            <div key={a.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{a.type} • {a.distance}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    {a.icu && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: `${C.green}20`, color: C.green }}>ICU</span>}
                    {a.ac && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: `${C.blue}20`, color: C.blueLight }}>AC</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <Badge type={a.available ? "green" : "red"}>{a.available ? "Available" : "Busy"}</Badge>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{a.fare}</span>
                  <span style={{ fontSize: 12, color: C.orange }}>ETA: {a.eta}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={`tel:${a.phone}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, borderRadius: 10, background: `${C.green}20`, border: `1px solid ${C.green}40`, color: C.green, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  📞 Call
                </a>
                {a.available && (
                  <button onClick={() => setBooking(a)} style={{ flex: 2, padding: 12, borderRadius: 10, background: `linear-gradient(135deg,${C.blue},${C.cyan})`, color: "#fff", fontSize: 13, fontWeight: 600 }}>
                    🚑 Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Nearby Blood Banks</div>
          <button onClick={() => setShowBloodBanks(!showBloodBanks)} style={{ fontSize: 13, color: C.blueLight }}>{showBloodBanks ? "Hide" : "Show All"}</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {BLOOD_BANKS.slice(0, showBloodBanks ? undefined : 2).map(b => (
            <div key={b.id} className="card" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>🩸 {b.name}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{b.district} • {b.address}</div>
                </div>
                <a href={`tel:${b.phone}`} style={{ padding: "8px 12px", borderRadius: 8, background: `${C.red}15`, border: `1px solid ${C.red}30`, color: C.red, fontSize: 12, textDecoration: "none" }}>Call</a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {b.available.map(bg => <span key={bg} style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(239,68,68,0.1)", color: C.red, fontSize: 11, fontWeight: 600 }}>{bg}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SOSScreen({ navigate }) {
  const [countdown, setCountdown] = useState(null);
  const [activated, setActivated] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState(storage.get("hs_emergency_contacts", [{ name: "Family Member", phone: "01711000000" }]));
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const timerRef = useRef();

  const startSOS = () => { setCountdown(5); setCancelled(false); };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) { clearInterval(timerRef.current); setActivated(true); return; }
    timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [countdown]);

  const cancel = () => { clearTimeout(timerRef.current); setCountdown(null); setCancelled(true); };

  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;
    const updated = [...emergencyContacts, newContact];
    setEmergencyContacts(updated);
    storage.set("hs_emergency_contacts", updated);
    setNewContact({ name: "", phone: "" });
    setShowAddContact(false);
  };

  if (activated) return (
    <div className="screen-no-nav" style={{ background: "linear-gradient(180deg,#1a0000,#0A0E1A)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, minHeight: "100%", gap: 20 }}>
      <div className="ping" style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgba(239,68,68,0.1)" }} />
      <div style={{ fontSize: 24, fontWeight: 800, color: C.red }}>🚨 SOS ACTIVATED</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        {["✅ Ambulance Dispatched (DGHS 16789)","✅ Emergency Contacts Notified","✅ Location Shared (GPS Active)","✅ Nearest Hospital Alerted"].map(a => (
          <div key={a} style={{ padding: 14, borderRadius: 12, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", fontSize: 14, color: C.green }}>{a}</div>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: C.textSub }}>Help is on the way. Stay calm and stay put.</div>
      <a href="tel:999" style={{ display: "block", padding: "14px 32px", borderRadius: 12, background: C.red, color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none", textAlign: "center", width: "100%" }}>📞 Call 999 Now</a>
      <button onClick={() => { setActivated(false); setCountdown(null); }} style={{ padding: "14px 32px", borderRadius: 12, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: C.text, fontSize: 14 }}>Cancel SOS</button>
    </div>
  );

  return (
    <div className="screen-no-nav" style={{ background: "linear-gradient(180deg,#1a0000,#0A0E1A)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, minHeight: "100%", gap: 24, overflowY: "auto" }}>
      {showAddContact && (
        <div className="modal-overlay" onClick={() => setShowAddContact(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Add Emergency Contact</div>
            <input className="input" placeholder="Name" value={newContact.name} onChange={e => setNewContact(c => ({ ...c, name: e.target.value }))} style={{ marginBottom: 12 }} />
            <input className="input" placeholder="Phone Number" type="tel" value={newContact.phone} onChange={e => setNewContact(c => ({ ...c, phone: e.target.value }))} style={{ marginBottom: 20 }} />
            <button className="btn-primary" onClick={addContact}>Add Contact</button>
          </div>
        </div>
      )}

      <button onClick={() => navigate("home")} style={{ position: "absolute", top: 20, left: 20, color: C.textSub }}>
        <Icon n="back" size={24} />
      </button>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>🚨 Emergency SOS</div>
      <div style={{ fontSize: 14, color: C.textSub, textAlign: "center" }}>Press SOS to dispatch emergency services</div>

      {countdown !== null ? (
        <div style={{ position: "relative", width: 180, height: 180 }}>
          <div className="ping" style={{ position: "absolute", inset: -20, borderRadius: "50%", background: "rgba(239,68,68,0.15)" }} />
          <svg viewBox="0 0 180 180" style={{ width: "100%", transform: "rotate(-90deg)" }}>
            <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="8" />
            <circle cx="90" cy="90" r="80" fill="none" stroke={C.red} strokeWidth="8" strokeDasharray={`${(countdown / 5) * 503} 503`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s linear" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: C.red }}>{countdown}</div>
          </div>
        </div>
      ) : (
        <button onClick={startSOS} style={{ width: 180, height: 180, borderRadius: "50%", background: "linear-gradient(135deg,#7f1d1d,#ef4444)", border: "4px solid rgba(239,68,68,0.3)", color: "#fff", fontSize: 28, fontWeight: 900, boxShadow: `0 0 40px rgba(239,68,68,0.4)`, cursor: "pointer" }}>
          SOS
        </button>
      )}
      {countdown !== null && <button onClick={cancel} style={{ padding: "14px 32px", borderRadius: 12, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: C.text, fontSize: 14 }}>Cancel</button>}
      {cancelled && <div style={{ color: C.green, fontSize: 14 }}>✅ SOS Cancelled</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", marginTop: 8 }}>
        {[
          { label: "National Emergency", number: "999", color: C.red },
          { label: "Ambulance (DGHS)", number: "16789", color: C.orange },
          { label: "Fire & Civil Defence", number: "9555555", color: C.blue },
          { label: "Police", number: "100", color: C.purple },
        ].map(e => (
          <a key={e.label} href={`tel:${e.number}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 14, background: `${e.color}12`, border: `1px solid ${e.color}25`, textDecoration: "none" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ color: e.color }}><Icon n="phone" size={20} /></div>
              <span style={{ fontSize: 14, color: C.text }}>{e.label}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: e.color }}>{e.number}</span>
          </a>
        ))}
      </div>

      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Emergency Contacts</div>
          <button onClick={() => setShowAddContact(true)} style={{ color: C.blueLight, fontSize: 13 }}>+ Add</button>
        </div>
        {emergencyContacts.map((c, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: C.text }}>{c.name}</span>
            <a href={`tel:${c.phone}`} style={{ color: C.green, fontSize: 13, textDecoration: "none" }}>{c.phone}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsScreen({ navigate }) {
  const [filter, setFilter] = useState("Monthly");
  const [toast, setToast] = useState("");
  const heartData = [72, 78, 74, 80, 76, 78, 75, 79, 77, 73, 76, 78];
  const sugarData = [92, 95, 98, 102, 95, 110, 105, 98, 95, 100, 97, 95];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const MiniChart = ({ data, color, height = 60 }) => {
    const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${height - ((v - min) / range) * (height - 8)}`).join(" ");
    return (
      <svg viewBox={`0 0 100 ${height}`} style={{ width: "100%", height }} preserveAspectRatio="none">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <polyline points={`0,${height} ${pts} 100,${height}`} fill={`${color}20`} stroke="none" />
      </svg>
    );
  };

  const reports = [
    { name: "Bio-Roxion Full Panel", date: "June 1, 2026", biomarkers: 18, status: "Normal" },
    { name: "Cardiac Checkup", date: "May 15, 2026", biomarkers: 8, status: "Normal" },
    { name: "Diabetes Panel", date: "Apr 20, 2026", biomarkers: 5, status: "Attention" },
    { name: "Liver Function Test", date: "Mar 10, 2026", biomarkers: 6, status: "Normal" },
  ];

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      <div className="header">
        <button onClick={() => navigate("home")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Health Reports</div>
        <button onClick={() => setToast("All reports exported!")} style={{ marginLeft: "auto", color: C.textSub }}><Icon n="download" size={20} /></button>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["Weekly","Monthly","Yearly"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${filter === f ? C.blue : "rgba(255,255,255,0.12)"}`, background: filter === f ? `${C.blue}20` : "transparent", color: filter === f ? C.blueLight : C.textSub, fontSize: 13, fontWeight: filter === f ? 600 : 400 }}>{f}</button>
          ))}
        </div>
        {[
          { label: "Heart Rate", data: heartData, color: C.red, current: "78 bpm", trend: "Stable" },
          { label: "Blood Sugar", data: sugarData, color: C.orange, current: "95 mg/dL", trend: "Improving" },
        ].map(chart => (
          <div key={chart.label} className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{chart.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: chart.color, marginTop: 2 }}>{chart.current}</div>
              </div>
              <Badge type="green">{chart.trend}</Badge>
            </div>
            <MiniChart data={chart.data} color={chart.color} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {months.slice(0, 6).map(m => <span key={m} style={{ fontSize: 9, color: C.textMuted }}>{m}</span>)}
            </div>
          </div>
        ))}
        <div className="section-title">Test Reports</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {reports.map(r => (
            <div key={r.name} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>📋 {r.name}</div>
                <div style={{ fontSize: 12, color: C.textSub }}>{r.date} • {r.biomarkers} markers</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge type={r.status === "Normal" ? "green" : "orange"}>{r.status}</Badge>
                <button onClick={() => setToast(`${r.name} downloaded!`)}><Icon n="download" size={16} color={C.textMuted} /></button>
                <button onClick={() => setToast("Report shared!")}><Icon n="share" size={16} color={C.textMuted} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ navigate, user, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", bloodGroup: user?.bloodGroup || "B+", age: user?.age || "", gender: user?.gender || "" });
  const [saved, setSaved] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passErr, setPassErr] = useState("");
  const [toast, setToast] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const save = () => {
    if (!form.name.trim()) return alert("Name required");
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
    setToast("Profile updated successfully!");
  };

  const changePassword = () => {
    setPassErr("");
    if (!oldPass) return setPassErr("Enter current password");
    if (newPass.length < 8) return setPassErr("New password min 8 characters");
    if (!/[A-Z]/.test(newPass)) return setPassErr("Password needs uppercase");
    if (newPass !== confirmPass) return setPassErr("Passwords don't match");
    setShowChangePass(false);
    setOldPass(""); setNewPass(""); setConfirmPass("");
    setToast("Password changed successfully!");
  };

  const menuItems = [
    { icon: "activity", label: "Medical History", sub: "View all conditions", color: C.blue, action: null },
    { icon: "download", label: "My Reports", sub: "Download health reports", color: C.cyan, action: () => navigate("reports") },
    { icon: "calendar", label: "Appointments", sub: "Upcoming & past", color: C.purple, action: () => navigate("appointments") },
    { icon: "settings", label: "Settings", sub: "App preferences", color: C.orange, action: () => navigate("settings") },
    { icon: "lock", label: "Change Password", sub: "Update security", color: C.green, action: () => setShowChangePass(true) },
    { icon: "trash", label: "Delete Account", sub: "Permanently remove account", color: C.red, action: () => setShowDeleteConfirm(true) },
  ];

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}

      {showChangePass && (
        <div className="modal-overlay" onClick={() => setShowChangePass(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Change Password</div>
            <input className="input" type="password" placeholder="Current Password" value={oldPass} onChange={e => setOldPass(e.target.value)} style={{ marginBottom: 12 }} />
            <input className="input" type="password" placeholder="New Password (min 8, A-Z, 0-9)" value={newPass} onChange={e => setNewPass(e.target.value)} style={{ marginBottom: 12 }} />
            <input className="input" type="password" placeholder="Confirm New Password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} style={{ marginBottom: 12 }} />
            {passErr && <div style={{ color: C.red, fontSize: 13, marginBottom: 12 }}>⚠️ {passErr}</div>}
            <button className="btn-primary" onClick={changePassword}>Change Password</button>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.red, marginBottom: 12 }}>⚠️ Delete Account</div>
            <div style={{ fontSize: 14, color: C.textSub, marginBottom: 20, lineHeight: 1.6 }}>This will permanently delete your account and all data. This action cannot be undone.</div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => { setShowDeleteConfirm(false); onLogout(); }} style={{ flex: 1, padding: 14, borderRadius: 12, background: C.red, color: "#fff", fontSize: 15, fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <div style={{ fontSize: 18, fontWeight: 700 }}>My Profile</div>
        <button onClick={() => { if (editing) { setEditing(false); } else { setEditing(true); } }} style={{ marginLeft: "auto", color: C.blueLight, fontSize: 14, fontWeight: 500 }}>
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24, paddingTop: 8 }}>
          <div style={{ position: "relative" }}>
            <Avatar initials={(form.name || user?.name || "U")[0].toUpperCase()} size={80} color={C.blue} />
            {editing && (
              <button onClick={() => setToast("Photo upload coming soon!")} style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n="camera" size={14} color="#fff" />
              </button>
            )}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 12 }}>{form.name || user?.name || "User"}</div>
          <div style={{ fontSize: 13, color: C.textSub }}>{user?.email}</div>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.red }}>{form.bloodGroup || user?.bloodGroup || "B+"}</div>
              <div style={{ fontSize: 11, color: C.textSub }}>Blood Group</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.green }}>85</div>
              <div style={{ fontSize: 11, color: C.textSub }}>Health Score</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.blue }}>3</div>
              <div style={{ fontSize: 11, color: C.textSub }}>Appointments</div>
            </div>
          </div>
        </div>

        {editing && (
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Edit Profile</div>
            {[["Full Name", "name", "text"], ["Phone", "phone", "tel"], ["Age", "age", "number"]].map(([label, key, type]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: C.textSub, marginBottom: 6 }}>{label}</div>
                <input className="input" type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: C.textSub, marginBottom: 6 }}>Gender</div>
              <select className="input" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                <option value="">Select</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: C.textSub, marginBottom: 6 }}>Blood Group</div>
              <select className="input" value={form.bloodGroup} onChange={e => setForm(f => ({ ...f, bloodGroup: e.target.value }))}>
                {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <button className="btn-primary" onClick={save}>Save Changes</button>
          </div>
        )}

        {menuItems.map(item => (
          <div key={item.label} onClick={item.action || (() => {})} className="card" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, cursor: item.action ? "pointer" : "default", ...(item.label === "Delete Account" ? { background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" } : {}) }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
              <Icon n={item.icon} size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: item.label === "Delete Account" ? C.red : C.text }}>{item.label}</div>
              <div style={{ fontSize: 12, color: C.textSub }}>{item.sub}</div>
            </div>
            <Icon n="back" size={16} color={C.textMuted} style={{ transform: "rotate(180deg)" }} />
          </div>
        ))}

        <button onClick={onLogout} className="card" style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, marginBottom: 24, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: C.red }}>
            <Icon n="logout" size={20} />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: C.red }}>Logout</div>
            <div style={{ fontSize: 12, color: C.textSub }}>Sign out of your account</div>
          </div>
        </button>
      </div>
    </div>
  );
}

function SettingsScreen({ navigate, isDark, toggleTheme }) {
  const [notif, setNotif] = useState(storage.get("hs_notif", true));
  const [lang, setLang] = useState(storage.get("hs_lang", "English"));
  const [biometric, setBiometric] = useState(false);
  const [apptReminder, setApptReminder] = useState(true);
  const [toast, setToast] = useState("");

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} style={{ width: 48, height: 26, borderRadius: 13, background: value ? `linear-gradient(135deg,${C.blue},${C.cyan})` : "rgba(128,128,128,0.25)", border: "none", cursor: "pointer", position: "relative", transition: "all 0.3s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: value ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.3s" }} />
    </button>
  );

  return (
    <div className="screen">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      <div className="header">
        <button onClick={() => navigate("profile")}><Icon n="back" size={22} color={C.text} /></button>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>Settings</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {[
          { section: "Appearance", items: [
            { icon: "zap", label: "Dark Mode", sub: isDark ? "Switch to Light theme" : "Switch to Dark theme", color: C.purple, toggle: true, value: isDark, onChange: () => { toggleTheme(); setToast(isDark ? "Light mode on ☀️" : "Dark mode on 🌙"); } },
          ]},
          { section: "Notifications", items: [
            { icon: "bell", label: "Push Notifications", sub: "Health alerts & updates", color: C.blue, toggle: true, value: notif, onChange: (v) => { setNotif(v); storage.set("hs_notif", v); } },
            { icon: "calendar", label: "Appointment Reminders", sub: "Get reminded before appointments", color: C.cyan, toggle: true, value: apptReminder, onChange: setApptReminder },
          ]},
          { section: "Security", items: [
            { icon: "lock", label: "Biometric Login", sub: "Fingerprint / Face ID", color: C.green, toggle: true, value: biometric, onChange: setBiometric },
            { icon: "lock", label: "Change Password", sub: "Update your password", color: C.orange, action: () => navigate("profile") },
            { icon: "user", label: "Privacy Settings", sub: "Manage data permissions", color: C.blue, action: () => setToast("Privacy settings saved!") },
          ]},
          { section: "Language", items: [
            { icon: "info", label: "App Language", sub: lang, color: C.cyan, action: () => { const next = lang === "English" ? "বাংলা" : "English"; setLang(next); storage.set("hs_lang", next); setToast(`Language changed to ${next}`); } },
          ]},
          { section: "About", items: [
            { icon: "info", label: "App Version", sub: "HealthSense BD v3.0.0", color: C.textSub },
            { icon: "star", label: "Rate App", sub: "Leave us a review", color: C.orange, action: () => setToast("Thank you for rating us! ⭐⭐⭐⭐⭐") },
            { icon: "share", label: "Share App", sub: "Refer to a friend", color: C.cyan, action: () => setToast("Share link copied!") },
          ]},
        ].map(group => (
          <div key={group.section} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>{group.section}</div>
            <div style={{ background: C.bgCard, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
              {group.items.map((item, i) => (
                <div key={item.label} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 16px", borderBottom: i < group.items.length - 1 ? `1px solid ${C.border}` : "none", cursor: item.action ? "pointer" : "default" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
                    <Icon n={item.icon} size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: C.textSub }}>{item.sub}</div>
                  </div>
                  {item.toggle && <Toggle value={item.value} onChange={item.onChange} />}
                  {item.action && !item.toggle && <Icon n="back" size={16} color={C.textMuted} style={{ transform: "rotate(180deg)" }} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// BOTTOM NAVIGATION
// ============================================================
function BottomNav({ active, navigate }) {
  const tabs = [
    { id: "home", icon: "home", label: "Home" },
    { id: "analysis", icon: "activity", label: "Analysis" },
    { id: "biokit", icon: "cpu", label: "Bio-Kit" },
    { id: "chat", icon: "message", label: "AI Chat" },
    { id: "profile", icon: "user", label: "Profile" },
  ];
  return (
    <div className="bottom-nav">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => navigate(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            {isActive && <div style={{ position: "absolute", top: -8, width: 32, height: 3, borderRadius: 2, background: `linear-gradient(90deg,${C.blue},${C.cyan})` }} />}
            <Icon n={t.icon} size={22} color={isActive ? C.cyan : C.textMuted} />
            <span style={{ fontSize: 10, color: isActive ? C.cyan : C.textMuted, fontWeight: isActive ? 600 : 400 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
const NO_NAV_SCREENS = ["splash", "onboarding", "login", "register", "sos", "chat"];

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(() => storage.get("hs_session", null));
  const [isDark, setIsDark] = useState(() => storage.get("hs_theme", true));

  // Keep global C in sync
  C = isDark ? DARK_COLORS : LIGHT_COLORS;
  _isDark = isDark;

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    storage.set("hs_theme", next);
  };

  useEffect(() => {
    if (user && screen === "splash") {
      setTimeout(() => setScreen("home"), 2000);
    }
  }, []);

  const navigate = (s) => setScreen(s);
  const handleLogin = (u) => { setUser(u); setScreen("home"); };
  const handleLogout = () => { setUser(null); storage.set("hs_session", null); setScreen("login"); };

  const showNav = user && !NO_NAV_SCREENS.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen onDone={() => setScreen(user ? "home" : "onboarding")} />;
      case "onboarding": return <OnboardingScreen onDone={() => setScreen("login")} />;
      case "login": return <LoginScreen onLogin={handleLogin} onRegister={() => setScreen("register")} />;
      case "register": return <RegisterScreen onDone={handleLogin} onBack={() => setScreen("login")} />;
      case "home": return <HomeScreen user={user} navigate={navigate} />;
      case "analysis": return <AnalysisScreen navigate={navigate} />;
      case "biokit": return <BioKitScreen navigate={navigate} />;
      case "biokitresults": return <BioKitResultsScreen navigate={navigate} />;
      case "chat": return <ChatScreen navigate={navigate} />;
      case "doctors": return <DoctorsScreen navigate={navigate} />;
      case "appointments": return <AppointmentsScreen navigate={navigate} />;
      case "hospitals": return <HospitalsScreen navigate={navigate} />;
      case "ambulance": return <AmbulanceScreen navigate={navigate} />;
      case "sos": return <SOSScreen navigate={navigate} />;
      case "reports": return <ReportsScreen navigate={navigate} />;
      case "profile": return <ProfileScreen navigate={navigate} user={user} onLogout={handleLogout} />;
      case "settings": return <SettingsScreen navigate={navigate} isDark={isDark} toggleTheme={toggleTheme} />;
      default: return <HomeScreen user={user} navigate={navigate} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <style>{getGlobalStyle(isDark)}</style>
      <div style={{ position: "fixed", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", background: isDark ? "#050810" : "#D6E0F5" }}>
        <div style={{ width: "100%", maxWidth: 430, height: "100%", maxHeight: 900, position: "relative", overflow: "hidden", background: C.bg, boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}>
          {renderScreen()}
          {showNav && <BottomNav active={screen} navigate={navigate} />}
          {screen === "home" && (
            <button className="floating-btn" onClick={() => navigate("chat")} style={{ bottom: 90, right: 16 }}>🤖</button>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
