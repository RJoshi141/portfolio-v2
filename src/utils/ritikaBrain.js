/**
 * Ritika's Local Knowledge Brain
 * 
 * This utility matches user questions to answers from the knowledge base
 * using pattern matching and tag scoring. No external API calls - everything
 * runs locally in the browser.
 * 
 * Returns a structured object:
 * {
 *   entryId: string,
 *   answerText: string,
 *   answerType: 'paragraph' | 'bulleted',
 *   bullets: null | array,
 *   links: null | array,
 *   followUpQuestions: array
 * }
 */

import { ritikaKnowledgeBase } from '../data/ritikaKnowledgeBase';

// Track the last answered entry for follow-up questions
let lastAnsweredEntryId = null;

/**
 * Normalize a string for matching (lowercase, trim, remove extra spaces)
 */
function normalizeInput(text) {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Check if a word appears in the text (as a whole word, not substring)
 */
function wordInText(word, text) {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return regex.test(text);
}

/**
 * Calculate a score for how well a knowledge base entry matches the user's question
 * 
 * Scoring logic:
 * - Pattern match: +10 points if any questionPattern is contained in the input
 * - Tag match: +2 points for each tag that appears as a word in the input
 * 
 * Returns the score and the matched entry
 */
function scoreEntry(entry, normalizedInput) {
  let score = 0;

  // Check for pattern matches (exact or partial match in questionPatterns)
  for (const pattern of entry.questionPatterns) {
    if (normalizedInput.includes(pattern.toLowerCase())) {
      score += 10;
      break; // Only count once per entry
    }
  }

  // Check for tag matches (each matching tag adds points)
  for (const tag of entry.tags) {
    if (wordInText(tag, normalizedInput)) {
      score += 2;
    }
  }

  return score;
}

/**
 * Convert an entry's answer to a structured object
 * Handles both string (backward compatibility) and object formats
 */
function formatAnswer(entry) {
  // If answer is a string, treat as paragraph
  if (typeof entry.answer === 'string') {
    return {
      entryId: entry.id,
      answerText: entry.answer,
      answerType: 'paragraph',
      bullets: null,
      links: null,
      followUpQuestions: [],
    };
  }

  // If answer is an object, extract fields
  return {
    entryId: entry.id,
    answerText: entry.answer.text || '',
    answerType: entry.answer.type || 'paragraph',
    bullets: entry.answer.bullets || null,
    links: entry.answer.links || null,
    followUpQuestions: entry.answer.followUpQuestions || [],
  };
}

/**
 * Get answer from Ritika's knowledge base based on user message
 * 
 * This is where we call the local knowledge base instead of an external API.
 * 
 * @param {string} userMessage - The user's question
 * @returns {object} - Structured answer object with answerText, answerType, bullets, and followUpQuestions
 */
export function getAnswerFromRitikaBrain(userMessage) {
  const normalized = normalizeInput(userMessage);

  // Handle greetings
  const greetingWords = ['hi', 'hello', 'hey', 'greetings', 'yo'];
  if (greetingWords.some(word => normalized.startsWith(word) || normalized.includes(` ${word} `)) || 
      normalized.includes("what's up") || normalized.includes("whats up")) {
    return {
      entryId: 'greeting',
      answerText: `Hi! I'm here to help you learn about Ritika's skills, work experience, projects, and interests. What would you like to know? 😊`,
      answerType: 'paragraph',
      bullets: null,
      links: null,
      followUpQuestions: [
        'What are Ritika\'s key skills and areas of expertise?',
        'Can you give an overview of Ritika\'s past work experience?',
        'What are some of Ritika\'s notable projects?',
      ],
    };
  }

  // Handle gratitude (thank you, thanks)
  const gratitudePatterns = ['thank you', 'thanks'];
  if (gratitudePatterns.some(pattern => normalized.includes(pattern))) {
    return {
      entryId: 'gratitude',
      answerText: `You're welcome! Feel free to ask me anything else about Ritika's work, experience, or projects. I'm here to help! 😊`,
      answerType: 'paragraph',
      bullets: null,
      links: null,
      followUpQuestions: [
        'What are Ritika\'s key skills and areas of expertise?',
        'Can you give an overview of Ritika\'s past work experience?',
        'What are some of Ritika\'s notable projects?',
      ],
    };
  }

  // Handle farewells (bye, goodbye)
  const farewellPatterns = ['goodbye', 'good bye'];
  const farewellWords = ['bye'];
  if (farewellPatterns.some(pattern => normalized.includes(pattern)) ||
      farewellWords.some(word => wordInText(word, normalized))) {
    return {
      entryId: 'farewell',
      answerText: `Goodbye! It was great chatting with you. Feel free to come back anytime if you have more questions about Ritika! 👋`,
      answerType: 'paragraph',
      bullets: null,
      links: null,
      followUpQuestions: [],
    };
  }

  // Handle acknowledgments (ok, okay)
  const acknowledgmentWords = ['ok', 'okay'];
  if (acknowledgmentWords.some(word => wordInText(word, normalized))) {
    return {
      entryId: 'acknowledgment',
      answerText: `Got it! Is there anything else you'd like to know about Ritika's skills, experience, or projects?`,
      answerType: 'paragraph',
      bullets: null,
      links: null,
      followUpQuestions: [
        'What are Ritika\'s key skills and areas of expertise?',
        'Can you give an overview of Ritika\'s past work experience?',
        'What are some of Ritika\'s notable projects?',
      ],
    };
  }

  // Handle follow-up questions
  const followUpPatterns = ['tell me more', 'elaborate', 'more details', 'expand', 'can you explain more'];
  if (followUpPatterns.some(pattern => normalized.includes(pattern))) {
    if (lastAnsweredEntryId) {
      const lastEntry = ritikaKnowledgeBase.find(entry => entry.id === lastAnsweredEntryId);
      if (lastEntry) {
        const formatted = formatAnswer(lastEntry);
        // If there's a longAnswer, use it
        if (lastEntry.longAnswer) {
          return {
            ...formatted,
            answerText: lastEntry.longAnswer,
          };
        }
        return formatted;
      }
    }
    // If no last entry, fall through to normal matching
  }

  // Score all entries
  const scoredEntries = ritikaKnowledgeBase.map(entry => ({
    entry,
    score: scoreEntry(entry, normalized),
  }));

  // Filter entries with score > 0 and sort by score (highest first)
  const matchingEntries = scoredEntries
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  // Handle multi-topic questions - if multiple entries match, prefer the one with higher score
  // Only combine if scores are very close (within 2 points) and one doesn't have bullets
  if (matchingEntries.length > 1) {
    const topScore = matchingEntries[0].score;
    const topEntries = matchingEntries.filter(({ score }) => score >= topScore - 2);
    
    if (topEntries.length > 1) {
      // Check if any entry has bullets - if so, prefer that one
      const bulletedEntry = topEntries.find(({ entry }) => {
        const formatted = formatAnswer(entry);
        return formatted.answerType === 'bulleted' && formatted.bullets;
      });
      
      // If we found a bulleted entry, use it instead of combining
      if (bulletedEntry) {
        lastAnsweredEntryId = bulletedEntry.entry.id;
        return formatAnswer(bulletedEntry.entry);
      }
      
      // Otherwise, combine answers from multiple entries
      const combinedText = topEntries
        .map(({ entry }) => {
          const formatted = formatAnswer(entry);
          return formatted.answerText;
        })
        .filter((text, index, self) => self.indexOf(text) === index) // Remove duplicates
        .join('\n\n');
      
      // Combine follow-up questions
      const combinedFollowUps = topEntries
        .flatMap(({ entry }) => {
          const formatted = formatAnswer(entry);
          return formatted.followUpQuestions;
        })
        .filter((q, index, self) => self.indexOf(q) === index); // Remove duplicates
      
      lastAnsweredEntryId = topEntries[0].entry.id; // Track first entry
      return {
        entryId: topEntries[0].entry.id,
        answerText: combinedText,
        answerType: 'paragraph',
        bullets: null,
        links: null,
        followUpQuestions: combinedFollowUps,
      };
    }
  }

  // Return the best matching entry
  if (matchingEntries.length > 0) {
    const bestEntry = matchingEntries[0].entry;
    lastAnsweredEntryId = bestEntry.id; // Track for follow-ups
    return formatAnswer(bestEntry);
  }

  // No match found - return friendly fallback with suggested follow-up questions
  return {
    entryId: 'fallback',
    answerText: `I'm not sure about that one. Try asking about Ritika's skills, work experience, or projects!`,
    answerType: 'paragraph',
    bullets: null,
    links: null,
    followUpQuestions: [
      'What are Ritika\'s main technical skills?',
      'Can you give an overview of Ritika\'s past work experience?',
      'What are some of Ritika\'s key projects?',
    ],
  };
}
