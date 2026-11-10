import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS_DATA: QuizQuestion[] = [
  // ================= TRIGONOMETRY =================
  {
    id: 'q-trig-01',
    category: 'trigonometry',
    ageGroup: 'all',
    difficulty: 'Foundation',
    question: 'What is the simplified value of sin²(42°) + cos²(42°)?',
    formulaContext: 'Fundamental Pythagorean Identity',
    options: ['0', '1', '2', '0.5'],
    correctIndex: 1,
    explanation: 'By the Pythagorean identity sin²(θ) + cos²(θ) = 1, this holds true for any real angle θ.'
  },
  {
    id: 'q-trig-02',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'Which of the following is equivalent to cos(2θ)?',
    formulaContext: 'Double Angle Formulas',
    options: ['2cos(θ)', 'cos²(θ) + sin²(θ)', '1 - 2sin²(θ)', '2sin(θ)cos(θ)'],
    correctIndex: 2,
    explanation: 'cos(2θ) has three equivalent forms: cos²(θ) - sin²(θ), 2cos²(θ) - 1, and 1 - 2sin²(θ).'
  },
  {
    id: 'q-trig-03',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'In △ABC, side a = 10, side b = 10, and angle C = 60°. What type of triangle is this?',
    formulaContext: 'Law of Cosines',
    options: ['Equilateral triangle', 'Right-angled triangle', 'Scalene obtuse triangle', 'Isosceles with c = 15'],
    correctIndex: 0,
    explanation: 'By Law of Cosines, c² = 10² + 10² - 2(10)(10)cos(60°) = 200 - 100 = 100, so c = 10. All three sides are 10.'
  },
  {
    id: 'q-trig-04',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'What is the exact value of tan(θ) if sec²(θ) = 25/16 and θ is in Quadrant I?',
    formulaContext: 'Secant-Tangent Identity: 1 + tan²(θ) = sec²(θ)',
    options: ['3/4', '4/3', '9/16', '5/4'],
    correctIndex: 0,
    explanation: 'tan²(θ) = sec²(θ) - 1 = 25/16 - 1 = 9/16. In Q1, tan(θ) > 0, so tan(θ) = 3/4.'
  },
  {
    id: 'q-trig-05',
    category: 'trigonometry',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    question: 'Using angle addition, what is the exact value of sin(15°)?',
    formulaContext: 'sin(45° - 30°)',
    options: ['(√6 - √2) / 4', '(√6 + √2) / 4', '1 / 2', '√3 / 4'],
    correctIndex: 0,
    explanation: 'sin(45° - 30°) = sin(45°)cos(30°) - cos(45°)sin(30°) = (√2/2)(√3/2) - (√2/2)(1/2) = (√6 - √2) / 4.'
  },

  // ================= ALGEBRA =================
  {
    id: 'q-alg-01',
    category: 'algebra',
    ageGroup: 'all',
    difficulty: 'Foundation',
    question: 'For the equation x² - 6x + 9 = 0, what does the discriminant Δ indicate about the roots?',
    formulaContext: 'Quadratic Discriminant Δ = b² - 4ac',
    options: ['Two distinct real roots', 'Exactly one repeated real root', 'Two complex conjugate roots', 'No roots exist'],
    correctIndex: 1,
    explanation: 'Δ = (-6)² - 4(1)(9) = 36 - 36 = 0. A discriminant of 0 indicates a single repeated real root (x = 3).'
  },
  {
    id: 'q-alg-02',
    category: 'algebra',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'Simplify the expression: log₂(32) - log₂(4).',
    formulaContext: 'Logarithm Quotient Rule: log(x) - log(y) = log(x/y)',
    options: ['2', '3', '4', '8'],
    correctIndex: 1,
    explanation: 'log₂(32 / 4) = log₂(8) = 3, because 2³ = 8.'
  },
  {
    id: 'q-alg-03',
    category: 'algebra',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'What is the sum of the infinite geometric series: 10 + 5 + 2.5 + 1.25 + ... ?',
    formulaContext: 'Infinite Series Sum S_∞ = a₁ / (1 - r)',
    options: ['15', '20', '25', 'Diverges'],
    correctIndex: 1,
    explanation: 'Here a₁ = 10 and common ratio r = 0.5. S_∞ = 10 / (1 - 0.5) = 10 / 0.5 = 20.'
  },
  {
    id: 'q-alg-04',
    category: 'algebra',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'In the binomial expansion of (x + y)⁵, what is the coefficient of x³y²?',
    formulaContext: 'Binomial Theorem: C(n, k)',
    options: ['5', '10', '15', '20'],
    correctIndex: 1,
    explanation: 'The coefficient is given by C(5, 2) = 5! / (2! 3!) = (5 × 4) / 2 = 10.'
  },
  {
    id: 'q-alg-05',
    category: 'algebra',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    question: 'If log₁₀(x) + log₁₀(x - 3) = 1, what is the real solution for x?',
    formulaContext: 'Logarithmic Product Law & Quadratic Factorization',
    options: ['x = 5', 'x = -2', 'x = 5 and x = -2', 'x = 10'],
    correctIndex: 0,
    explanation: 'log₁₀(x(x - 3)) = 1 => x² - 3x = 10 => x² - 3x - 10 = 0 => (x - 5)(x + 2) = 0. Since log requires positive arguments, x = 5 is the sole valid solution.'
  },

  // ================= DERIVATIVES =================
  {
    id: 'q-der-01',
    category: 'derivative',
    ageGroup: '16-18',
    difficulty: 'Foundation',
    question: 'What is the derivative of f(x) = 4x³ - 5x² + 7x - 12?',
    formulaContext: 'Power Rule: d/dx[xⁿ] = n·xⁿ⁻¹',
    options: ['12x² - 10x + 7', '12x² - 5x + 7', '4x² - 10x + 7', '12x³ - 10x² + 7x'],
    correctIndex: 0,
    explanation: 'Using power rule: 4(3x²) - 5(2x) + 7(1) - 0 = 12x² - 10x + 7.'
  },
  {
    id: 'q-der-02',
    category: 'derivative',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'Using the chain rule, find d/dx [sin(3x²)].',
    formulaContext: 'Chain Rule: f\'(g(x)) · g\'(x)',
    options: ['cos(3x²)', '6x · cos(3x²)', '6x · sin(3x²)', '-6x · cos(3x²)'],
    correctIndex: 1,
    explanation: 'The outer derivative is cos(3x²) and inner derivative of 3x² is 6x. Product is 6x cos(3x²).'
  },
  {
    id: 'q-der-03',
    category: 'derivative',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'What is the derivative of y = x · eˣ?',
    formulaContext: 'Product Rule: u\'v + uv\'',
    options: ['eˣ', 'x eˣ', 'eˣ(x + 1)', 'x² eˣ'],
    correctIndex: 2,
    explanation: 'Let u = x (u\' = 1) and v = eˣ (v\' = eˣ). y\' = (1)(eˣ) + (x)(eˣ) = eˣ(x + 1).'
  },
  {
    id: 'q-der-04',
    category: 'derivative',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    question: 'What is the slope of the tangent line to y = ln(x) at the point x = e²?',
    formulaContext: 'Derivative of Natural Log: d/dx[ln(x)] = 1/x',
    options: ['1 / e²', '2 / e', 'e²', '1'],
    correctIndex: 0,
    explanation: 'dy/dx = 1/x. At x = e², the slope is dy/dx = 1/e².'
  },
  {
    id: 'q-der-05',
    category: 'derivative',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    question: 'What is d/dx [tan(x)]?',
    formulaContext: 'Trigonometric Derivatives',
    options: ['sec(x)', 'sec²(x)', '-csc²(x)', 'cos²(x)'],
    correctIndex: 1,
    explanation: 'By the quotient rule on sin(x)/cos(x), d/dx [tan(x)] = (cos²x - (-sin²x)) / cos²x = 1/cos²x = sec²(x).'
  },

  // ================= INTEGRATION =================
  {
    id: 'q-int-01',
    category: 'integration',
    ageGroup: '16-18',
    difficulty: 'Foundation',
    question: 'What is the antiderivative: ∫ 6x⁵ dx ?',
    formulaContext: 'Power Rule: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C',
    options: ['x⁶ + C', '30x⁴ + C', '6x⁶ + C', 'x⁶ / 6 + C'],
    correctIndex: 0,
    explanation: '∫ 6x⁵ dx = 6 · (x⁶ / 6) + C = x⁶ + C.'
  },
  {
    id: 'q-int-02',
    category: 'integration',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'Evaluate the definite integral: ∫[0 to 2] 3x² dx.',
    formulaContext: 'Fundamental Theorem of Calculus',
    options: ['6', '8', '12', '24'],
    correctIndex: 1,
    explanation: 'The antiderivative is F(x) = x³. F(2) - F(0) = 2³ - 0³ = 8.'
  },
  {
    id: 'q-int-03',
    category: 'integration',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    question: 'What is ∫ (1 / x) dx for x > 0?',
    formulaContext: 'Special Case of Power Rule',
    options: ['-1 / x² + C', 'ln(x) + C', 'x⁰ + C', 'eˣ + C'],
    correctIndex: 1,
    explanation: 'The power rule fails when n = -1. The antiderivative of 1/x is ln|x| + C.'
  },
  {
    id: 'q-int-04',
    category: 'integration',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    question: 'Using u-substitution, what is the value of ∫ 2x (x² + 5)³ dx ?',
    formulaContext: 'Substitution Method with u = x² + 5',
    options: ['(x² + 5)⁴ / 4 + C', '(x² + 5)⁴ + C', '2(x² + 5)⁴ + C', 'x² (x² + 5)⁴ / 4 + C'],
    correctIndex: 0,
    explanation: 'Let u = x² + 5, so du = 2x dx. The integral becomes ∫ u³ du = u⁴ / 4 + C = (x² + 5)⁴ / 4 + C.'
  },
  {
    id: 'q-int-05',
    category: 'integration',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    question: 'Which formula represents Integration by Parts?',
    formulaContext: 'Product Rule Inversion',
    options: ['∫ u dv = uv - ∫ v du', '∫ u dv = uv + ∫ v du', '∫ u dv = u\'v - uv\'', '∫ u dv = (u/v) - ∫ v du'],
    correctIndex: 0,
    explanation: 'Integration by Parts states: ∫ u dv = uv - ∫ v du, derived from the product rule d(uv) = u dv + v du.'
  }
];

export interface RushChallenge {
  id: string;
  category: 'trigonometry' | 'algebra' | 'derivative' | 'integration';
  leftHandSide: string;
  missingPart: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const RUSH_CHALLENGES: RushChallenge[] = [
  {
    id: 'r-1',
    category: 'trigonometry',
    leftHandSide: 'sin²(x) + cos²(x) =',
    missingPart: '?',
    prompt: 'Complete the identity: sin²(x) + cos²(x) = ?',
    options: ['1', '0', 'tan²(x)', '2'],
    correctAnswer: '1',
    explanation: 'Fundamental identity on the unit circle!'
  },
  {
    id: 'r-2',
    category: 'derivative',
    leftHandSide: 'd/dx [sin(x)] =',
    missingPart: '?',
    prompt: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', 'sec²(x)', '-sin(x)'],
    correctAnswer: 'cos(x)',
    explanation: 'Derivative of sin(x) is positive cos(x).'
  },
  {
    id: 'r-3',
    category: 'derivative',
    leftHandSide: 'd/dx [cos(x)] =',
    missingPart: '?',
    prompt: 'What is the derivative of cos(x)?',
    options: ['-sin(x)', 'sin(x)', '-cos(x)', 'tan(x)'],
    correctAnswer: '-sin(x)',
    explanation: 'Derivatives of co-functions take a negative sign: -sin(x).'
  },
  {
    id: 'r-4',
    category: 'integration',
    leftHandSide: '∫ eˣ dx =',
    missingPart: '?',
    prompt: 'What is the indefinite integral of eˣ?',
    options: ['eˣ + C', 'x eˣ + C', 'ln(x) + C', 'eˣ⁺¹ + C'],
    correctAnswer: 'eˣ + C',
    explanation: 'eˣ is its own antiderivative!'
  },
  {
    id: 'r-5',
    category: 'algebra',
    leftHandSide: 'log(a · b) =',
    missingPart: '?',
    prompt: 'Logarithm product rule: log(a · b) = ?',
    options: ['log(a) + log(b)', 'log(a) · log(b)', 'log(a) - log(b)', 'b · log(a)'],
    correctAnswer: 'log(a) + log(b)',
    explanation: 'Logs convert multiplication into addition.'
  },
  {
    id: 'r-6',
    category: 'algebra',
    leftHandSide: 'Quadratic Discriminant Δ =',
    missingPart: '?',
    prompt: 'Formula for quadratic discriminant Δ:',
    options: ['b² - 4ac', 'b² + 4ac', '-b / 2a', '4ac - b²'],
    correctAnswer: 'b² - 4ac',
    explanation: 'Δ = b² - 4ac determines number and type of roots.'
  },
  {
    id: 'r-7',
    category: 'derivative',
    leftHandSide: 'd/dx [x⁵] =',
    missingPart: '?',
    prompt: 'Apply power rule: d/dx [x⁵] = ?',
    options: ['5x⁴', '4x⁵', '5x⁶', 'x⁴ / 5'],
    correctAnswer: '5x⁴',
    explanation: 'Multiply by power 5 and subtract 1 from exponent.'
  },
  {
    id: 'r-8',
    category: 'integration',
    leftHandSide: '∫ (1/x) dx =',
    missingPart: '?',
    prompt: 'Antiderivative of 1/x for x > 0:',
    options: ['ln|x| + C', '-1/x² + C', 'x + C', 'eˣ + C'],
    correctAnswer: 'ln|x| + C',
    explanation: 'Natural logarithm is the antiderivative of 1/x.'
  },
  {
    id: 'r-9',
    category: 'trigonometry',
    leftHandSide: 'sin(2θ) =',
    missingPart: '?',
    prompt: 'Double angle formula: sin(2θ) = ?',
    options: ['2sin(θ)cos(θ)', 'cos²(θ) - sin²(θ)', '2tan(θ)', 'sin²(θ)'],
    correctAnswer: '2sin(θ)cos(θ)',
    explanation: 'sin(2θ) = 2sin(θ)cos(θ).'
  },
  {
    id: 'r-10',
    category: 'integration',
    leftHandSide: '∫ sec²(x) dx =',
    missingPart: '?',
    prompt: 'Antiderivative of sec²(x):',
    options: ['tan(x) + C', 'sec(x) + C', '-cot(x) + C', 'cos(x) + C'],
    correctAnswer: 'tan(x) + C',
    explanation: 'Since d/dx[tan(x)] = sec²(x), ∫ sec²(x) dx = tan(x) + C.'
  }
];
