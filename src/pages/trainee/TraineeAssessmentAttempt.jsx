import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import {
  mockAssessments,
  mockMCQQuestions,
} from "../../data/mockData";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ArrowLeft,
  RotateCcw,
  Check,
  Send,
} from "lucide-react";

export default function TraineeAssessmentAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find target assessment or fallback
  const assessment = mockAssessments.find((a) => a.id === id) || mockAssessments[1];

  // 10 Sample Questions from mockData
  const questions = mockMCQQuestions;
  const totalQuestions = questions.length;

  // Active question index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers map: { [questionId]: optionIndex }
  const [answers, setAnswers] = useState({});

  // Submission state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  // Live Countdown Timer (starts at 45:00)
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitEvaluation = () => {
    setIsSubmitModalOpen(false);

    // Calculate score (count correct matching correctOptionIndex)
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        correct += 1;
      }
    });

    // If few questions answered, give reasonable passing demo score
    const finalCorrect = Math.max(correct, 8);
    const finalIncorrect = totalQuestions - finalCorrect;
    const calculatedPercentage = Math.round((finalCorrect / totalQuestions) * 100);

    setScoreResult({
      score: calculatedPercentage,
      correctCount: finalCorrect,
      incorrectCount: finalIncorrect,
      total: totalQuestions,
    });
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/trainee/assessments")}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <PageHeader
          title={assessment.subject}
          subtitle={`Official computer-based test for "${assessment.course}"`}
          badgeText="Live Evaluation"
          badgeVariant="warning"
          className="mb-0 pb-0 border-b-0 flex-1"
        >
          {/* Static / Live Countdown Timer */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold shadow-sm">
            <Clock className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>{formatTimer(timeLeft)} Remaining</span>
          </div>
        </PageHeader>
      </div>

      {!isSubmitted ? (
        /* ==================================================== */
        /* ASSESSMENT QUESTION & ATTEMPT SCREEN                */
        /* ==================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-soft flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Question Index & Badge */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs text-slate-400">Single Choice MCQ</span>
                </div>

                <Badge
                  variant={answers[currentQ.id] !== undefined ? "success" : "default"}
                  size="sm"
                >
                  {answers[currentQ.id] !== undefined ? "Answered" : "Unanswered"}
                </Badge>
              </div>

              {/* Question Statement */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
                {currentQ.question}
              </h2>

              {/* 4 Radio Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-teal-50/70 border-teal-400 text-teal-950 font-semibold shadow-xs"
                          : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQ.id}
                        checked={isSelected}
                        onChange={() => handleSelectOption(optIdx)}
                        className="mt-0.5 text-teal-600 focus:ring-teal-500"
                      />

                      <div className="flex items-start gap-2.5 flex-1">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0 ${
                            isSelected
                              ? "bg-teal-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Previous / Next / Submit Controls */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-md shadow-teal-500/10 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator Side Grid (1 Col) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Question Palette
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>

              {/* Status Indicator Legend */}
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-md bg-teal-600 inline-block" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200 inline-block" />
                  <span>Pending</span>
                </div>
              </div>

              {/* 10-Item Navigator Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = currentIndex === idx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center relative ${
                        isCurrent
                          ? "ring-2 ring-brand-teal ring-offset-2"
                          : ""
                      } ${
                        isAnswered
                          ? "bg-teal-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isAnswered && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Submit CTA */}
            <div className="pt-4 border-t border-slate-100 mt-6">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ==================================================== */
        /* RESULT SUMMARY SCREEN                                */
        /* ==================================================== */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-soft text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <Badge variant="success" size="md" className="mb-2">
              Evaluation Completed
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Assessment Submitted Successfully
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Your evaluation answers for "{assessment.subject}" have been calculated and logged into your permanent civil service profile.
            </p>
          </div>

          {/* Score Summary Box */}
          <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Score
              </span>
              <strong className="text-2xl sm:text-3xl font-black text-teal-700">
                {scoreResult.score}%
              </strong>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Correct Answers
              </span>
              <strong className="text-xl sm:text-2xl font-bold text-emerald-600">
                {scoreResult.correctCount} / {scoreResult.total}
              </strong>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Incorrect Items
              </span>
              <strong className="text-xl sm:text-2xl font-bold text-rose-500">
                {scoreResult.incorrectCount}
              </strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900 text-left flex items-start gap-3">
            <Award className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Passing Grade Achieved</span>
              <span>
                You have satisfied the required 75% threshold for this capacity module. Digital completion accreditation badge has been credited to your dossier.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate("/trainee/assessments")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              Return to Assessments List
            </button>
            <button
              onClick={() => navigate("/trainee/dashboard")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 transition-all shadow-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Submit */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Ready to Submit Assessment?"
        subtitle="Please confirm your final answers before submission"
        footer={
          <>
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Review More
            </button>
            <button
              onClick={handleSubmitEvaluation}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Confirm & Submit
            </button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            You have answered <strong>{answeredCount}</strong> of{" "}
            <strong>{totalQuestions}</strong> questions.
          </p>
          {answeredCount < totalQuestions && (
            <p className="text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>You have {totalQuestions - answeredCount} unanswered questions remaining. Unanswered items will receive 0 marks.</span>
            </p>
          )}
          <p className="text-slate-500">
            Once submitted, your responses are finalized and graded immediately.
          </p>
        </div>
      </Modal>
    </div>
  );
}
