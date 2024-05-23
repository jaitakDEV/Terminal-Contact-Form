import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    id: "email",
    question: "To start, could you give us ",
    highlight: "your email?",
    confirmation: "✅",
  },
  {
    id: "name",
    question: "Awesome! And what's ",
    highlight: "your name?",
    confirmation: "✅",
  },
  {
    id: "description",
    question: "Perfect, and how can we ",
    highlight: "help you?",
    confirmation: "✅",
  },
];

const ContactForm = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({
    email: "",
    name: "",
    description: "",
  });
  const [currentInput, setCurrentInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedResponses = JSON.parse(
      localStorage.getItem("contactFormResponses")
    );
    if (storedResponses) {
      setResponses(storedResponses);
    }
  }, []);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step < questions.length) {
      const updatedResponses = {
        ...responses,
        [questions[step].id]: currentInput,
      };
      setResponses(updatedResponses);
      localStorage.setItem(
        "contactFormResponses",
        JSON.stringify(updatedResponses)
      );
      setCurrentInput("");
      setStep(step + 1);
    } else {
      setSubmitted(true);
      localStorage.removeItem("contactFormResponses");
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResponses({ email: "", name: "", description: "" });
    setCurrentInput("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-5 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full text-white border border-gray-700"
      >
        <div className="bg-gray-900 px-3 py-2 rounded-t-lg flex justify-between items-center border-b border-gray-700">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm">Terminal Contact Form</div>
          <div></div>
        </div>
        <div className="p-3">
          <p className="text-green-500">
            <a
              href="https://github.com/jaitakDEV"
              target="_blank"
              rel="noopener noreferrer"
            >
              jaitakDEV
            </a>
          </p>

          <p>Hey there! We're excited to connect 🔗</p>
          <hr className="border-gray-700 my-4" />
          <form onSubmit={handleFormSubmit}>
            {!submitted ? (
              <>
                <div className="mb-4">
                  {questions.slice(0, step).map((q, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        {q.question}
                        {q.highlight && (
                          <span className="text-purple-500">{q.highlight}</span>
                        )}
                      </p>
                      <p className="text-green-500">
                        {responses[q.id]} {q.confirmation}
                      </p>
                    </div>
                  ))}
                  {step < questions.length && (
                    <>
                      <p className="flex items-center">
                        <span className="text-green-500">
                          ➜ ~ Enter {questions[step].id}:{" "}
                        </span>
                        <input
                          type="text"
                          value={currentInput}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 ml-2 text-white"
                          autoFocus
                          style={{
                            border: "none",
                            background: "none",
                            color: "white",
                            padding: 0,
                          }}
                        />
                      </p>
                    </>
                  )}
                </div>
                {step === questions.length && (
                  <>
                    <p>Beautiful! Here's what we've got:</p>
                    <p>
                      email: {responses.email} {questions[0].confirmation}
                    </p>
                    <p>
                      name: {responses.name} {questions[1].confirmation}
                    </p>
                    <p>
                      description: {responses.description}{" "}
                      {questions[2].confirmation}
                    </p>
                    <p>Look good?</p>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleRestart}
                        className="mr-2 py-2 px-4 bg-red-600 hover:bg-red-500 rounded text-white"
                      >
                        Restart
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded text-white"
                      >
                        Send it!
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p>Sent! We'll get back to you ASAP 😎</p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
