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
  Edit3,
  Mail,
  Building,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Star,
} from "lucide-react";

export default function TrainerProfile() {
  const { user } = useAuth();

  const trainer = {
    ...mockUsers.trainer,
    ...user,
  };

  const [qualifications, setQualifications] = useState(
    trainer.qualifications || [
      {
        id: "tq-01",
        degree: "Ph.D. in Public Administration & Policy",
        institution: "Jawaharlal Nehru University (JNU)",
        year: "2015",
      },
      {
        id: "tq-02",
        degree: "M.Tech in Computer Science & Enterprise Systems",
        institution: "Indian Institute of Technology (IIT Delhi)",
        year: "2010",
      },
      {
        id: "tq-03",
        degree: "B.E. in Electronics & Communication Engineering",
        institution: "Anna University",
        year: "2007",
      },
    ]
  );

  const [experience, setExperience] = useState(
    trainer.experience || [
      {
        id: "te-01",
        role: "Chief Faculty & Program Lead",
        organization: "National Capacity Building Commission Secretariat",
        duration: "2021 - Present",
      },
      {
        id: "te-02",
        role: "Senior Administrative Fellow",
        organization: "Indian Institute of Public Administration (IIPA)",
        duration: "2016 - 2021",
      },
      {
        id: "te-03",
        role: "Technology Policy Consultant",
        organization: "National e-Governance Division (NeGD)",
        duration: "2012 - 2016",
      },
    ]
  );

  const [expertise, setExpertise] = useState(
    trainer.areasOfExpertise || [
      { name: "Digital Governance", category: "Core", color: "bg-teal-50 text-teal-700 border-teal-200" },
      { name: "Public Service Delivery", category: "Core", color: "bg-blue-50 text-blue-700 border-blue-200" },
      { name: "Data-Driven Public Policy", category: "Domain", color: "bg-purple-50 text-purple-700 border-purple-200" },
      { name: "Public Procurement (GeM)", category: "Functional", color: "bg-amber-50 text-amber-700 border-amber-200" },
      { name: "Cloud Architecture for Smart Cities", category: "Technical", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { name: "Zero-Trust Public IT Security", category: "Technical", color: "bg-rose-50 text-rose-700 border-rose-200" },
      { name: "AI Ethics in Citizen Services", category: "Emerging", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      { name: "Public Sector Leadership", category: "Strategic", color: "bg-sky-50 text-sky-700 border-sky-200" },
    ]
  );

  const [modalType, setModalType] = useState(null); // "editProfile" | "addQualification" | "addExperience" | "addExpertise"
  const [toast, setToast] = useState({ show: false, message: "" });

  // Temp form fields
  const [tempDegree, setTempDegree] = useState("");
  const [tempInstitution, setTempInstitution] = useState("");
  const [tempYear, setTempYear] = useState("");

  const [tempRole, setTempRole] = useState("");
  const [tempOrg, setTempOrg] = useState("");
  const [tempDuration, setTempDuration] = useState("");

  const [tempExpertiseName, setTempExpertiseName] = useState("");
  const [tempCategory, setTempCategory] = useState("Core");

  const handleModalSave = (sectionName) => {
    setToast({
      show: true,
      message: `${sectionName} saved successfully (Preview Demo)`,
    });
    setModalType(null);
  };

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="Faculty Dossier & Academic Credentials"
        subtitle="Manage program leadership information, institutional background, and structured competency mapping for capacity courses."
        badgeText="Lead Faculty"
        badgeVariant="primary"
      />

      {/* 1. Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-accent-gradient" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={trainer.avatar}
                alt={trainer.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-purple-500/10 border-2 border-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-accent-gradient text-slate-950 shadow-sm">
                <Star className="w-4 h-4 fill-slate-950" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {trainer.name}
                </h2>
                <Badge variant="primary" size="sm">
                  FACULTY LEAD
                </Badge>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
                  ★ {trainer.rating || 4.9} Rating
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                {trainer.designation}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {trainer.department}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {trainer.email}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Capacity Building Commission (Govt. of India)
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

      {/* 2. Cards for Qualifications, Experience, and Areas of Expertise */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Qualifications */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-brand-teal border border-teal-100">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Qualifications</h3>
                  <p className="text-xs text-slate-500">Academic & doctoral degrees</p>
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

            <div className="space-y-3">
              {qualifications.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{q.degree}</h4>
                    <span className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md shrink-0">
                      {q.year}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{q.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Experience */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Experience</h3>
                  <p className="text-xs text-slate-500">Public policy & teaching tenure</p>
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

            <div className="space-y-3">
              {experience.map((e) => (
                <div
                  key={e.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{e.role}</h4>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md shrink-0">
                      {e.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{e.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Areas of Expertise (Structured Tag Chips for Competency Mapping) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-50 text-[#6d5cae] border border-purple-100">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Areas of Expertise</h3>
                  <p className="text-xs text-slate-500">Structured competency mapping tags</p>
                </div>
              </div>

              <button
                onClick={() => setModalType("addExpertise")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {expertise.map((tag, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                    tag.color || "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Tag className="w-3 h-3 opacity-60" />
                  <span>{tag.name}</span>
                  {tag.category && (
                    <span className="text-[9px] uppercase font-bold opacity-60 ml-0.5">
                      • {tag.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400">
            * Tags are mapped to National Civil Service Competency Framework standards.
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={modalType === "editProfile"}
        onClose={() => setModalType(null)}
        title="Edit Faculty Profile"
        subtitle="Update academic dossier details"
        footer={
          <>
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalSave("Faculty Profile")}
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
              defaultValue={trainer.name}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Designation</label>
            <input
              type="text"
              defaultValue={trainer.designation}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Department</label>
            <input
              type="text"
              defaultValue={trainer.department}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Add Qualification Modal */}
      <Modal
        isOpen={modalType === "addQualification"}
        onClose={() => setModalType(null)}
        title="Add Academic Degree"
        subtitle="Add degree, fellowship, or doctoral research"
        footer={
          <>
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (tempDegree.trim()) {
                  setQualifications([
                    ...qualifications,
                    {
                      id: `tq-${Date.now()}`,
                      degree: tempDegree.trim(),
                      institution: tempInstitution.trim() || "National University",
                      year: tempYear.trim() || "2024",
                    },
                  ]);
                  setTempDegree("");
                  setTempInstitution("");
                  setTempYear("");
                }
                handleModalSave("Qualification");
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Add Qualification
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Degree Title</label>
            <input
              type="text"
              placeholder="e.g. Post-Doctoral Fellowship in Policy Systems"
              value={tempDegree}
              onChange={(e) => setTempDegree(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">University / Institute</label>
            <input
              type="text"
              placeholder="e.g. Oxford Policy Institute"
              value={tempInstitution}
              onChange={(e) => setTempInstitution(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Year</label>
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
        onClose={() => setModalType(null)}
        title="Add Professional Experience"
        subtitle="Add administrative or academic appointment"
        footer={
          <>
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (tempRole.trim()) {
                  setExperience([
                    ...experience,
                    {
                      id: `te-${Date.now()}`,
                      role: tempRole.trim(),
                      organization: tempOrg.trim() || "Administrative Council",
                      duration: tempDuration.trim() || "2024",
                    },
                  ]);
                  setTempRole("");
                  setTempOrg("");
                  setTempDuration("");
                }
                handleModalSave("Experience");
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Add Appointment
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Designation / Role</label>
            <input
              type="text"
              placeholder="e.g. Principal Advisor (Digital India)"
              value={tempRole}
              onChange={(e) => setTempRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Organization</label>
            <input
              type="text"
              placeholder="e.g. Ministry of Electronics and IT"
              value={tempOrg}
              onChange={(e) => setTempOrg(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Duration</label>
            <input
              type="text"
              placeholder="e.g. 2018 - 2021"
              value={tempDuration}
              onChange={(e) => setTempDuration(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
        </div>
      </Modal>

      {/* Add Expertise Modal */}
      <Modal
        isOpen={modalType === "addExpertise"}
        onClose={() => setModalType(null)}
        title="Add Competency Mapping Tag"
        subtitle="Add a structured skill tag for syllabus assignment"
        footer={
          <>
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (tempExpertiseName.trim()) {
                  setExpertise([
                    ...expertise,
                    {
                      name: tempExpertiseName.trim(),
                      category: tempCategory,
                      color: "bg-teal-50 text-teal-700 border-teal-200",
                    },
                  ]);
                  setTempExpertiseName("");
                }
                handleModalSave("Expertise Tag");
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Add Expertise Tag
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Expertise Name</label>
            <input
              type="text"
              placeholder="e.g. Municipal Cloud Telemetry, GFR-2017 Procurement"
              value={tempExpertiseName}
              onChange={(e) => setTempExpertiseName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Competency Category</label>
            <select
              value={tempCategory}
              onChange={(e) => setTempCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
            >
              <option value="Core">Core Governance</option>
              <option value="Technical">Technical Architecture</option>
              <option value="Domain">Policy Domain</option>
              <option value="Functional">Functional Procurement</option>
              <option value="Emerging">Emerging Technologies</option>
              <option value="Strategic">Strategic Leadership</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type="success"
        title="Dossier Updated"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}
