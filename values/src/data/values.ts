export interface Value {
  id: string;
  name: string;
  description?: string;
  score?: number;
}

export const values: Value[] = [
  { id: "broad-interests", name: "Broad interests" },
  { id: "power-influence", name: "Power, Influence" },
  { id: "challenge", name: "Challenge" },
  { id: "professional-accomplishment", name: "Professional Accomplishment" },
  { id: "courage-risk-taking", name: "Courage, Risk taking" },
  { id: "professional-conduct", name: "Professional Conduct" },
  { id: "creating-balance", name: "Creating balance in one's life" },
  { id: "quality", name: "Quality (Excellent, Thorough Work)" },
  { id: "creativity-originality", name: "Creativity, originality" },
  { id: "recognition", name: "Recognition from One's Field" },
  { id: "curiosity", name: "Curiosity" },
  { id: "rewarding-relationships", name: "Rewarding and Supportive Relationships" },
  { id: "efficient-work-habits", name: "Efficient work habits" },
  { id: "knowledge-truth", name: "Searching for Knowledge and Truth" },
  { id: "enjoyment", name: "Enjoyment of the activity itself" },
  { id: "self-examination", name: "Self-Examination, Self-Understanding" },
  { id: "faith", name: "Faith" },
  { id: "social-concerns", name: "Social Concerns, Pursuing the Common Good" },
  { id: "fame-success", name: "Fame, Success" },
  { id: "solitude-contemplation", name: "Solitude, Contemplation" },
  { id: "hard-work-commitment", name: "Hard work and Commitment" },
  { id: "spirituality", name: "Spirituality" },
  { id: "honesty-integrity", name: "Honesty and Integrity" },
  { id: "teaching-mentoring", name: "Teaching, Mentoring" },
  { id: "independence", name: "Independence" },
  { id: "helping-others", name: "Understanding, Helping, Serving Others" },
  { id: "openness", name: "Openness, Receptive to New Ideas" },
  { id: "vision", name: "Vision (Seeing the Big Picture)" },
  { id: "personal-growth", name: "Personal Growth and Learning" },
  { id: "wealth", name: "Wealth, Material Well-Being" },
];
