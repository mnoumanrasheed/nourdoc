import {
  Activity, AudioLines, BookOpenCheck, BriefcaseMedical, Building2, CircleDollarSign,
  ClipboardCheck, Cloud, Code2, FileCheck2, FileText, GraduationCap, HeartHandshake,
  Hospital, Landmark, Layers3, LockKeyhole, Network, ScrollText, ShieldCheck, Sparkles,
  Stethoscope, Users, Waypoints,
} from 'lucide-react'

export const navItems = [
  { label: 'Why NourDoc', path: '/why-nourdoc' },
  { label: 'Product', path: '/product' },
  { label: 'Healthcare Impact', path: '/healthcare-impact' },
  { label: 'Security', path: '/security-compliance' },
  { label: 'Partners', path: '/partners' },
  { label: 'About', path: '/about' },
]

export const capabilities = [
  { title: 'Ambient Listening', text: 'Capture the consented clinical conversation without a separate dictation workflow.', icon: AudioLines },
  { title: 'Clinical Transcription', text: 'Turn doctor–patient conversations into text using AI speech-to-text.', icon: FileText },
  { title: 'Structured Notes', text: 'Organize voice data into Subjective, Objective, Assessment and Plan.', icon: ClipboardCheck },
  { title: 'Coding Support', text: 'Support documentation workflows designed with coding readiness in mind.', icon: Code2 },
  { title: 'EMR / HMIS Integration', text: 'An integration-oriented architecture for healthcare systems and workflows.', icon: Network },
  { title: 'Enterprise Security', text: 'Privacy, access control and governance positioned as foundational requirements.', icon: ShieldCheck },
]

export const workflow = [
  { n: '01', title: 'Listen', text: 'Capture the consented patient conversation.' },
  { n: '02', title: 'Understand', text: 'Recognize medical language, speakers and clinical context.' },
  { n: '03', title: 'Draft', text: 'Create structured SOAP documentation.' },
  { n: '04', title: 'Review & Sign', text: 'The clinician edits and approves the final documentation.' },
]

export const securityTopics = [
  { title: 'HIPAA Aligned', text: 'Safeguards aligned to HIPAA requirements for protected health information.', icon: ShieldCheck },
  { title: 'GDPR Ready', text: 'Attention to data-subject rights, lawful basis and international processing.', icon: Landmark },
  { title: 'Privacy By Design', text: 'Consent-first recording and privacy-conscious product design.', icon: LockKeyhole },
  { title: 'Role-Based Access', text: 'Control access according to user roles.', icon: Users },
  { title: 'Audit Logs', text: 'Record access and actions involving clinical information.', icon: ScrollText },
  { title: 'Secure Cloud', text: 'Hardened and monitored cloud infrastructure positioning.', icon: Cloud },
]

export const partnerCategories = [
  { title: 'Hospitals', icon: Hospital }, { title: 'Clinics', icon: Stethoscope },
  { title: 'Medical Universities', icon: GraduationCap }, { title: 'EMR Vendors', icon: Layers3 },
  { title: 'HMIS Vendors', icon: Building2 }, { title: 'Insurance Companies', icon: ShieldCheck },
  { title: 'Medical Coding Companies', icon: Code2 }, { title: 'Medical Transcription Companies', icon: FileText },
  { title: 'RCM Companies', icon: CircleDollarSign }, { title: 'System Integrators', icon: Waypoints },
  { title: 'Technology Partners', icon: Sparkles },
]

export const impactAreas = [
  { title: 'Clinical', text: 'Reduce manual documentation work around the encounter.', icon: Activity },
  { title: 'Patient experience', text: 'Keep more attention available for the patient interaction.', icon: HeartHandshake },
  { title: 'Operational', text: 'Simplify the journey from conversation to reviewed documentation.', icon: BriefcaseMedical },
  { title: 'Financial', text: 'Support more complete, structured documentation workflows.', icon: CircleDollarSign },
  { title: 'Compliance', text: 'Put clinician review, consent and privacy into the workflow.', icon: FileCheck2 },
]

export const buildGroups = [
  { title: 'Clinical Advisors', icon: Stethoscope }, { title: 'Engineering Team', icon: Code2 },
  { title: 'Medical Experts', icon: BookOpenCheck }, { title: 'Healthcare Partners', icon: HeartHandshake },
]
