import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiThumbsUp, FiUser, FiClock, FiHelpCircle, FiMail, FiSend } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useQnA } from '../context/QnAContext';
import toast from 'react-hot-toast';

const ProductQnA = ({ productId, productName }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { getProductQuestions, addQuestion, addAnswer, markHelpful, deleteQuestion } = useQnA();
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState({});
  const [showAnswerForm, setShowAnswerForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = getProductQuestions(productId);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) {
      toast.error('Please enter your question');
      return;
    }

    setIsSubmitting(true);
    addQuestion(
      productId,
      questionText.trim(),
      user?.name || 'Anonymous',
      user?.email
    );
    setQuestionText('');
    setShowQuestionForm(false);
    setIsSubmitting(false);
  };

  const handleSubmitAnswer = async (questionId) => {
    if (!answerText[questionId]?.trim()) {
      toast.error('Please enter your answer');
      return;
    }

    addAnswer(
      productId,
      questionId,
      answerText[questionId].trim(),
      user?.name,
      user?.email,
      isAdmin
    );
    setAnswerText(prev => ({ ...prev, [questionId]: '' }));
    setShowAnswerForm(prev => ({ ...prev, [questionId]: false }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="mt-12">
      {/* Q&A Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <FiHelpCircle className="text-indigo-500" />
            Questions & Answers
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {questions.length} questions • Get answers from the community
          </p>
        </div>
        <button
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          {showQuestionForm ? 'Cancel' : 'Ask a Question'}
        </button>
      </div>

      {/* Ask Question Form */}
      <AnimatePresence>
        {showQuestionForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border dark:border-gray-600">
              <h4 className="text-lg font-semibold mb-3 dark:text-white">Ask a Question about {productName}</h4>
              <form onSubmit={handleSubmitQuestion}>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows="3"
                  placeholder="What would you like to know about this product?"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
                  required
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Question'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuestionForm(false)}
                    className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <FiMessageSquare className="text-5xl text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2 dark:text-white">No questions yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Be the first to ask a question about this product!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Question */}
              <div className="p-5 border-b dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">{q.userName}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FiClock size={10} />
                        <span>{formatDate(q.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markHelpful(productId, q.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <FiThumbsUp size={12} /> Helpful ({q.helpful || 0})
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => deleteQuestion(productId, q.id)}
                        className="text-xs text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ml-12">{q.question}</p>
              </div>

              {/* Answers */}
              {q.answers.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 pl-12">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Answers ({q.answers.length}):</p>
                  <div className="space-y-3">
                    {q.answers.map((answer) => (
                      <div key={answer.id} className="pl-4 border-l-2 border-indigo-300 dark:border-indigo-700">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold dark:text-white">
                            {answer.isAdmin ? (
                              <span className="text-indigo-600 dark:text-indigo-400">The Number Team</span>
                            ) : (
                              answer.userName
                            )}
                          </span>
                          {answer.isAdmin && (
                            <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                              Official
                            </span>
                          )}
                          <span className="text-xs text-gray-500">• {formatDate(answer.date)}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{answer.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer Form */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 pl-12">
                {!showAnswerForm[q.id] ? (
                  <button
                    onClick={() => setShowAnswerForm(prev => ({ ...prev, [q.id]: true }))}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {isAdmin ? 'Answer as Admin' : 'Add an Answer'}
                  </button>
                ) : (
                  <div className="mt-2">
                    <textarea
                      value={answerText[q.id] || ''}
                      onChange={(e) => setAnswerText(prev => ({ ...prev, [q.id]: e.target.value }))}
                      rows="2"
                      placeholder={isAdmin ? "Write an official response..." : "Share your answer..."}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white text-sm resize-none"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleSubmitAnswer(q.id)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition flex items-center gap-1"
                      >
                        <FiSend size={12} /> Post Answer
                      </button>
                      <button
                        onClick={() => setShowAnswerForm(prev => ({ ...prev, [q.id]: false }))}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductQnA;