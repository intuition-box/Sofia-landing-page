import React, { useState } from 'react';
import styles from './index.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Sofia?",
    answer: "Sofia is a platform that empowers people and organizations to capture, verify, share and amplify knowledge across the web. It transforms how you interact with web content, allowing you to truly own your digital experience."
  },
  {
    question: "How does Sofia work?",
    answer: "Sofia captures your web navigation and transforms it into verifiable signals stored on-chain. Every visited page and action becomes a signal (who you are, what you do, on what content), creating a living semantic graph of your online activity. With your personal AI powered by GaiaNet and ElizaOS, Sofia provides personalized recommendations based on your real behavior, not opaque algorithms. You remain in full control of your data and decide what to share with your trust circle."
  },
  {
    question: "What blockchain does Sofia use?",
    answer: "Sofia is built on the Intuition System blockchain. For more detailed information about the underlying technology, please visit https://www.docs.intuition.systems/docs/introduction/overview"
  },
  {
    question: "When will Sofia be released?",
    answer: "We haven't opened our beta program yet. However, we are actively welcoming contributors through our Early Access Program. For more information about joining our early contributor community, please visit our Discord server."
  },
  {
    question: "What is Sofia's governance model?",
    answer: "Sofia will operate as a DAO on Colony, open to all contributors. Participants will be rewarded with governance tokens for their contributions, ensuring a decentralized and community-driven decision-making process."
  },
  {
    question: "When will the DAO be opened?",
    answer: "The DAO will be launched as soon as we onboard our first contributors. We're actively building our early contributor community through the Early Access Program."
  }
];

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps): React.ReactElement {
  return (
    <div className={styles.faqItem}>
      <button
        className={`${styles.faqQuestion} ${isOpen ? styles.active : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ''}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ(): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <h2 className={styles.faqTitle}>Most Asked Questions</h2>
        <div className={styles.faqContainer}>
          {faqData.map((item, index) => (
            <FAQItemComponent
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
