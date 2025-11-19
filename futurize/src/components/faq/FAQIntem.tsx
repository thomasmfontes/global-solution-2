interface FAQItemProps {
  pergunta: string;
  resposta: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ pergunta, resposta, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
          {pergunta}
        </h3>
        <svg
          className={`w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          id={`faq-answer-${index}`}
          className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          {resposta}
        </div>
      )}
    </article>
  );
}