import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { useAuth } from "../../context/AuthContext";
import { mockUsers } from "../../data/mockData";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
  Plus,
  Download,
  Eye,
  Edit3,
  Mail,
  Building,
  Calendar,
  FileCheck,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function TraineeProfile() {
  const { user } = useAuth();

  // Trainee profile data from AuthContext or fallback to mockUsers.trainee
  const profile = {
    ...mockUsers.trainee,
    ...user,
  };

  // State for sections to allow interactive client-side additions
  const [qualifications, setQualifications] = useState(
    profile.qualifications || [
      {
        id: "q-01",
        degree: "B.Tech in Civil & Infrastructure Systems",
        institution: "National Institute of Technology (NIT)",
        year: "2021",
      },
      {
        id: "q-02",
        degree: "Executive Diploma in Public Administration",
        institution: "Indian Institute of Public Administration (IIPA)",
        year: "2023",
      },
    ]
  );

  const [experience, setExperience] = useState(
    profile.experience || [
      {
        id: "e-01",
        role: "Junior Project Engineer",
        organization: "Urban Infrastructure & Public Works Dept.",
        duration: "2023 - Present",
      },
      {
        id: "e-02",
        role: "Graduate Engineering Trainee",
        organization: "National Smart City Mission Taskforce",
        duration: "2021 - 2023",
      },
    ]
  );

  const [skills, setSkills] = useState(
    profile.skills || [
      { name: "Digital Governance", color: "bg-teal-50 text-teal-700 border-teal-200" },
      { name: "Smart City Infrastructure", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { name: "Public Procurement (GeM)", color: "bg-amber-50 text-amber-700 border-amber-200" },
      { name: "Data-Driven Policy", color: "bg-purple-50 text-purple-700 border-purple-200" },
      { name: "Cyber Resilience", color: "bg-rose-50 text-rose-700 border-rose-200" },
      { name: "Municipal Telemetry", color: "bg-sky-50 text-sky-700 border-sky-200" },
    ]
  );

  const [certificates, setCertificates] = useState(
    profile.certificates || [
      {
        id: "c-01",
        name: "Certified Public Procurement Specialist (GFR-2017)",
        issuer: "National Capacity Building Commission",
        date: "Oct 2026",
        credentialId: "CBC-2026-9812",
      },
      {
        id: "c-02",
        name: "Digital Governance Architecture Professional",
        issuer: "National Informatics Centre (NIC)",
        date: "Aug 2026",
        credentialId: "NIC-DGA-4402",
      },
      {
        id: "c-03",
        name: "Cyber Resilience & Incident Response in Public IT",
        issuer: "GovTech Academy India",
        date: "Jun 2026",
        credentialId: "GTA-CYB-1190",
      },
    ]
  );

  // Modal State
  const [modalType, setModalType] = useState(null); // "editProfile" | "addQualification" | "addExperience" | "addSkill" | "addCertificate"
  const [toast, setToast] = useState({ show: false, message: "" });

  // Temporary form states for the modals
  const [tempDegree, setTempDegree] = useState("");
  const [tempInstitution, setTempInstitution] = useState("");
  const [tempYear, setTempYear] = useState("");

  const [tempRole, setTempRole] = useState("");
  const [tempOrg, setTempOrg] = useState("");
  const [tempDuration, setTempDuration] = useState("");

  const [tempSkill, setTempSkill] = useState("");

  const [tempCertName, setTempCertName] = useState("");
  const [tempCertIssuer, setTempCertIssuer] = useState("");

  const handleModalClose = () => {
    setModalType(null);
  };

  const handleModalSave = (sectionName) => {
    // Show toast and close modal
    setToast({
      show: true,
      message: `${sectionName} record saved successfully (Preview Demo)`,
    });
    setModalType(null);
  };

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="My Profile & Training Dossier"
        subtitle="Manage your civil service service profile, educational qualifications, accredited skills, and professional certifications."
        badgeText="Verified Civil Officer"
        badgeVariant="success"
      />

      {/* 1. Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-soft relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-accent-gradient" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-teal-500/10 border-2 border-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-accent-gradient text-slate-950 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {profile.name}
                </h2>
                <Badge variant="lavender" size="sm">
                  {profile.role.toUpperCase()}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                {profile.designation}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.department}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  National Capacity Portal ID: {profile.id}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setModalType("editProfile")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. Grid of Sections as Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Qualifications */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-brand-teal border border-teal-100">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Qualifications</h3>
                  <p className="text-xs text-slate-500">Academic and postgraduate degrees</p>
                </div>
              </div>

              <button
                onClick={() => setModalType("addQualification")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {qualifications.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.degree}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.institution}</p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md shrink-0">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Work Experience */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Work Experience</h3>
                  <p className="text-xs text-slate-500">Administrative and project postings</p>
                </div>
              </div>

              <button
                onClick={() => setModalType("addExperience")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.role}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.organization}</p>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 rounded-md shrink-0">
                    {item.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Skills */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-50 text-[#6d5cae] border border-purple-100">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Competencies & Skills</h3>
                  <p className="text-xs text-slate-500">Accredited functional & domain areas</p>
                </div>
              </div>

              <button
                onClick={() => setModalType("addSkill")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add skill</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    skill.color || "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <span>{typeof skill === "string" ? skill : skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Certificates */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-brand-orange border border-amber-100">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Certificates & Accreditations</h3>
                  <p className="text-xs text-slate-500">Government credentials issued</p>
                </div>
              </div>

              <button
                onClick={() => setModalType("addCertificate")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add</span>
              </button>
            </div>

            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.credentialId && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={() =>
                        setToast({
                          show: true,
                          message: `Viewing verified certificate for ${cert.name}`,
                        })
                      }
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="View Certificate"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setToast({
                          show: true,
                          message: `Downloading credential PDF: ${cert.name}`,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-600" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={modalType === "editProfile"}
        onClose={handleModalClose}
        title="Edit Civil Service Profile"
        subtitle="Update officer details and official communications record"
        footer={
          <>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalSave("Profile")}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Save Profile
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={profile.name}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Designation</label>
            <input
              type="text"
              defaultValue={profile.designation}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Ministry / Department</label>
            <input
              type="text"
              defaultValue={profile.department}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>
      </Modal>

      {/* Add Qualification Modal */}
      <Modal
        isOpen={modalType === "addQualification"}
        onClose={handleModalClose}
        title="Add Academic Qualification"
        subtitle="Submit degree, diploma, or institutional credential"
        footer={
          <>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalSave("Qualification")}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Add Qualification
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Degree / Diploma</label>
            <input
              type="text"
              placeholder="e.g. Master in Public Policy (MPP)"
              value={tempDegree}
              onChange={(e) => setTempDegree(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Institution / University</label>
            <input
              type="text"
              placeholder="e.g. Indian Institute of Management (IIM)"
              value={tempInstitution}
              onChange={(e) => setTempInstitution(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Year of Passing</label>
            <input
              type="text"
              placeholder="e.g. 2024"
              value={tempYear}
              onChange={(e) => setTempYear(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Add Experience Modal */}
      <Modal
        isOpen={modalType === "addExperience"}
        onClose={handleModalClose}
        title="Add Work Experience"
        subtitle="Record past administrative assignment or project taskforce"
        footer={
          <>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalSave("Work Experience")}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Add Experience
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Role / Designation</label>
            <input
              type="text"
              placeholder="e.g. Assistant Director (IT Operations)"
              value={tempRole}
              onChange={(e) => setTempRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Organization / Department</label>
            <input
              type="text"
              placeholder="e.g. Ministry of Housing & Urban Affairs"
              value={tempOrg}
              onChange={(e) => setTempOrg(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Duration</label>
            <input
              type="text"
              placeholder="e.g. 2020 - 2022"
              value={tempDuration}
              onChange={(e) => setTempDuration(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Add Skill Modal */}
      <Modal
        isOpen={modalType === "addSkill"}
        onClose={handleModalClose}
        title="Add Competency Tag"
        subtitle="Add a functional skill or domain specialty"
        footer={
          <>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (tempSkill.trim()) {
                  setSkills([...skills, { name: tempSkill.trim(), color: "bg-teal-50 text-teal-700 border-teal-200" }]);
                  setTempSkill("");
                }
                handleModalSave("Skill");
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Add Skill
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Skill Name</label>
            <input
              type="text"
              placeholder="e.g. Municipal Solid Waste Telemetry, GeM E-Tendering"
              value={tempSkill}
              onChange={(e) => setTempSkill(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Add Certificate Modal */}
      <Modal
        isOpen={modalType === "addCertificate"}
        onClose={handleModalClose}
        title="Add Accreditation Certificate"
        subtitle="Attach official competency credential"
        footer={
          <>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalSave("Certificate")}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Submit Certificate
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Certificate Title</label>
            <input
              type="text"
              placeholder="e.g. Advanced Zero-Trust Architecture"
              value={tempCertName}
              onChange={(e) => setTempCertName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Issuing Authority</label>
            <input
              type="text"
              placeholder="e.g. Capacity Building Commission Secretariat"
              value={tempCertIssuer}
              onChange={(e) => setTempCertIssuer(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Notification Toast */}
      <Toast
        show={toast.show}
        type="success"
        title="Profile Updated"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}
