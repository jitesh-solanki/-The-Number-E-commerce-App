import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const QnAContext = createContext();

export const useQnA = () => {
  const context = useContext(QnAContext);
  if (!context) {
    throw new Error('useQnA must be used within QnAProvider');
  }
  return context;
};

export const QnAProvider = ({ children }) => {
  const [questions, setQuestions] = useState({});

  // Load Q&A from localStorage
  useEffect(() => {
    const savedQnA = localStorage.getItem('productQnA');
    if (savedQnA) {
      setQuestions(JSON.parse(savedQnA));
    }
  }, []);

  // Save to localStorage
  const saveQnA = (newQuestions) => {
    setQuestions(newQuestions);
    localStorage.setItem('productQnA', JSON.stringify(newQuestions));
  };

  // Get questions for a product
  const getProductQuestions = (productId) => {
    return questions[productId] || [];
  };

  // Get question count for a product
  const getQuestionCount = (productId) => {
    return (questions[productId] || []).length;
  };

  // Add a new question
  const addQuestion = (productId, question, userName, userEmail) => {
    const currentQuestions = questions[productId] || [];
    const newQuestion = {
      id: Date.now(),
      question,
      userName: userName || 'Anonymous',
      userEmail,
      date: new Date().toISOString().split('T')[0],
      answers: [],
      helpful: 0
    };
    const updatedQuestions = {
      ...questions,
      [productId]: [newQuestion, ...currentQuestions]
    };
    saveQnA(updatedQuestions);
    toast.success('Question posted successfully!');
  };

  // Add an answer to a question
  const addAnswer = (productId, questionId, answer, userName, userEmail, isAdmin = false) => {
    const productQuestions = questions[productId] || [];
    const updatedProductQuestions = productQuestions.map(q => {
      if (q.id === questionId) {
        const newAnswer = {
          id: Date.now(),
          answer,
          userName: userName || (isAdmin ? 'The Number Team' : 'Anonymous'),
          userEmail,
          date: new Date().toISOString().split('T')[0],
          isAdmin
        };
        return { ...q, answers: [...q.answers, newAnswer] };
      }
      return q;
    });
    const updatedQuestions = { ...questions, [productId]: updatedProductQuestions };
    saveQnA(updatedQuestions);
    toast.success('Answer posted successfully!');
  };

  // Mark question as helpful
  const markHelpful = (productId, questionId) => {
    const productQuestions = questions[productId] || [];
    const updatedProductQuestions = productQuestions.map(q =>
      q.id === questionId ? { ...q, helpful: (q.helpful || 0) + 1 } : q
    );
    const updatedQuestions = { ...questions, [productId]: updatedProductQuestions };
    saveQnA(updatedQuestions);
  };

  // Delete question (admin only)
  const deleteQuestion = (productId, questionId) => {
    const productQuestions = questions[productId] || [];
    const updatedProductQuestions = productQuestions.filter(q => q.id !== questionId);
    const updatedQuestions = { ...questions, [productId]: updatedProductQuestions };
    saveQnA(updatedQuestions);
    toast.success('Question deleted');
  };

  return (
    <QnAContext.Provider value={{
      questions,
      getProductQuestions,
      getQuestionCount,
      addQuestion,
      addAnswer,
      markHelpful,
      deleteQuestion
    }}>
      {children}
    </QnAContext.Provider>
  );
};