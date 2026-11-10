import { Formula } from '../types';

export const FORMULAS_DATA: Formula[] = [
  // ==========================================
  // TRIGONOMETRY
  // ==========================================
  {
    id: 'trig-pythagorean-identity',
    title: 'Fundamental Pythagorean Identity',
    category: 'trigonometry',
    ageGroup: 'all',
    difficulty: 'Foundation',
    latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
    formulaDisplay: 'sin²(θ) + cos²(θ) = 1',
    readable: 'The square of sine plus the square of cosine equals one for any real angle theta.',
    description: 'Derived directly from the Pythagorean theorem on the unit circle (x² + y² = 1 where x = cos θ and y = sin θ). Essential for simplifying trigonometric expressions.',
    variables: [
      { symbol: 'θ', meaning: 'Angle measured in radians or degrees' },
      { symbol: 'sin(θ)', meaning: 'Vertical coordinate (opposite / hypotenuse)' },
      { symbol: 'cos(θ)', meaning: 'Horizontal coordinate (adjacent / hypotenuse)' }
    ],
    keyRulesOrIdentities: [
      'tan²(θ) + 1 = sec²(θ) (dividing by cos²θ)',
      '1 + cot²(θ) = csc²(θ) (dividing by sin²θ)',
      'sin(θ) = ±√(1 - cos²(θ))'
    ],
    workedExample: {
      question: 'If cos(θ) = 3/5 and θ is in Quadrant I, find sin(θ).',
      stepByStep: [
        'Apply sin²(θ) + cos²(θ) = 1',
        'Substitute: sin²(θ) + (3/5)² = 1',
        'sin²(θ) + 9/25 = 1 => sin²(θ) = 16/25',
        'Since θ is in Quadrant I, sin(θ) > 0'
      ],
      finalAnswer: 'sin(θ) = 4/5',
      tip: 'Always check which quadrant θ lies in to choose the positive or negative root.'
    },
    interactiveType: 'unit_circle'
  },
  {
    id: 'trig-sine-rule',
    title: 'Law of Sines',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R',
    formulaDisplay: 'a / sin(A) = b / sin(B) = c / sin(C) = 2R',
    readable: 'The ratio of any side length of a triangle to the sine of its opposite angle is constant and equals the diameter of the circumcircle.',
    description: 'Used to solve non-right triangles when given either two angles and one side (AAS/ASA) or two sides and a non-included angle (SSA ambiguous case).',
    variables: [
      { symbol: 'a, b, c', meaning: 'Lengths of sides opposite to angles A, B, and C' },
      { symbol: 'A, B, C', meaning: 'Interior angles of the triangle' },
      { symbol: 'R', meaning: 'Circumradius of the triangle' }
    ],
    keyRulesOrIdentities: [
      'Area = (1/2) * a * b * sin(C)',
      'Ambiguous Case: when given side a, side b, and angle A, check if b*sin(A) < a < b (produces 2 valid triangles)'
    ],
    workedExample: {
      question: 'In △ABC, A = 30°, B = 45°, and side a = 8 cm. Find side b.',
      stepByStep: [
        'Apply: a / sin(A) = b / sin(B)',
        '8 / sin(30°) = b / sin(45°)',
        '8 / (1/2) = b / (√2 / 2)',
        '16 = b / (√2 / 2) => b = 16 * (√2 / 2)'
      ],
      finalAnswer: 'b = 8√2 ≈ 11.31 cm',
      tip: 'Ensure your calculator is in DEGREE mode when inputting angle values.'
    }
  },
  {
    id: 'trig-cosine-rule',
    title: 'Law of Cosines',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: 'c^2 = a^2 + b^2 - 2ab\\cos(C)',
    formulaDisplay: 'c² = a² + b² - 2ab · cos(C)',
    readable: 'The square of a side equals the sum of the squares of the other two sides minus twice their product times the cosine of the included angle.',
    description: 'A generalization of the Pythagorean theorem for any triangle. When C = 90°, cos(90°) = 0, reducing cleanly to c² = a² + b².',
    variables: [
      { symbol: 'a, b', meaning: 'Adjacent known sides' },
      { symbol: 'C', meaning: 'Included angle between sides a and b' },
      { symbol: 'c', meaning: 'Opposite side length' }
    ],
    keyRulesOrIdentities: [
      'cos(C) = (a² + b² - c²) / (2ab)',
      'cos(A) = (b² + c² - a²) / (2bc)',
      'cos(B) = (a² + c² - b²) / (2ac)'
    ],
    workedExample: {
      question: 'Two ships leave harbor at the same time. Ship A travels 6 miles, Ship B travels 10 miles with an angle of 60° between their paths. How far apart are they?',
      stepByStep: [
        'Let a = 6, b = 10, C = 60°',
        'c² = 6² + 10² - 2(6)(10)cos(60°)',
        'c² = 36 + 100 - 120(0.5)',
        'c² = 136 - 60 = 76 => c = √76'
      ],
      finalAnswer: 'c = 2√19 ≈ 8.72 miles',
      tip: 'The Law of Cosines is best used for SAS (Side-Angle-Side) and SSS (Side-Side-Side) problems.'
    }
  },
  {
    id: 'trig-double-angle',
    title: 'Double Angle Formulas',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta), \\quad \\cos(2\\theta) = \\cos^2(\\theta) - \\sin^2(\\theta)',
    formulaDisplay: 'sin(2θ) = 2sin(θ)cos(θ)  |  cos(2θ) = cos²(θ) - sin²(θ)',
    readable: 'Sine of double the angle is twice the product of sine and cosine; cosine of double angle has three equivalent standard forms.',
    description: 'Essential in calculus for integrating powers of trigonometric functions like sin²(x) and cos²(x) by transforming them into linear multiples of the angle.',
    variables: [
      { symbol: 'θ', meaning: 'Base angle' },
      { symbol: '2θ', meaning: 'Double angle' }
    ],
    keyRulesOrIdentities: [
      'cos(2θ) = 2cos²(θ) - 1',
      'cos(2θ) = 1 - 2sin²(θ)',
      'tan(2θ) = 2tan(θ) / (1 - tan²(θ))',
      'Power reduction: sin²(θ) = (1 - cos(2θ))/2'
    ],
    workedExample: {
      question: 'Express cos²(3x) in terms of the first power of cosine.',
      stepByStep: [
        'Use the identity: cos²(θ) = (1 + cos(2θ)) / 2',
        'Substitute θ = 3x, so 2θ = 6x',
        'cos²(3x) = (1 + cos(6x)) / 2'
      ],
      finalAnswer: '(1 + cos(6x)) / 2',
      tip: 'Power reduction identities are crucial for solving integrals such as ∫ cos²(x) dx.'
    }
  },
  {
    id: 'trig-sum-difference',
    title: 'Angle Addition & Subtraction',
    category: 'trigonometry',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B',
    formulaDisplay: 'sin(A ± B) = sin(A)cos(B) ± cos(A)sin(B)',
    readable: 'The sine of the sum or difference of two angles combines alternating products of sines and cosines.',
    description: 'Allows computation of exact trigonometric ratios for non-standard angles such as 15° (45° - 30°) and 75° (45° + 30°).',
    variables: [
      { symbol: 'A, B', meaning: 'Two distinct angles' }
    ],
    keyRulesOrIdentities: [
      'cos(A ± B) = cos(A)cos(B) ∓ sin(A)sin(B)',
      'tan(A ± B) = [tan(A) ± tan(B)] / [1 ∓ tan(A)tan(B)]'
    ],
    workedExample: {
      question: 'Find the exact value of sin(75°).',
      stepByStep: [
        'Decompose 75° into 45° + 30°',
        'Apply: sin(45° + 30°) = sin(45°)cos(30°) + cos(45°)sin(30°)',
        '= (√2 / 2) · (√3 / 2) + (√2 / 2) · (1 / 2)',
        '= (√6 + √2) / 4'
      ],
      finalAnswer: '(√6 + √2) / 4 ≈ 0.9659',
      tip: 'Notice the sign for cosine addition flips: cos(A+B) uses a MINUS sign between products.'
    }
  },

  // ==========================================
  // ALGEBRA
  // ==========================================
  {
    id: 'alg-quadratic-formula',
    title: 'The Quadratic Formula & Discriminant',
    category: 'algebra',
    ageGroup: 'all',
    difficulty: 'Foundation',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    formulaDisplay: 'x = (-b ± √(b² - 4ac)) / (2a)',
    readable: 'Roots of any quadratic equation ax² + bx + c = 0 are calculated using coefficients a, b, and c.',
    description: 'Solves second-degree polynomial equations. The term under the radical, Δ = b² - 4ac, determines whether roots are real, distinct, repeated, or complex.',
    variables: [
      { symbol: 'a', meaning: 'Coefficient of x² (a ≠ 0)' },
      { symbol: 'b', meaning: 'Coefficient of x' },
      { symbol: 'c', meaning: 'Constant term' },
      { symbol: 'Δ = b² - 4ac', meaning: 'Discriminant' }
    ],
    keyRulesOrIdentities: [
      'Δ > 0: Two distinct real roots (parabola cuts x-axis twice)',
      'Δ = 0: Exactly one repeated real root (vertex touches x-axis)',
      'Δ < 0: Two complex conjugate roots (parabola never crosses x-axis)',
      'Vertex x-coordinate: x_v = -b / (2a)'
    ],
    workedExample: {
      question: 'Solve 2x² - 4x - 6 = 0 for x.',
      stepByStep: [
        'Identify: a = 2, b = -4, c = -6',
        'Discriminant Δ = (-4)² - 4(2)(-6) = 16 + 48 = 64',
        'x = (-(-4) ± √64) / (2 · 2) = (4 ± 8) / 4',
        'Root 1: (4 + 8) / 4 = 3; Root 2: (4 - 8) / 4 = -1'
      ],
      finalAnswer: 'x = 3 or x = -1',
      tip: 'Always simplify by dividing by the greatest common divisor first if possible (here x² - 2x - 3 = 0).'
    },
    interactiveType: 'quadratic_roots'
  },
  {
    id: 'alg-logarithm-rules',
    title: 'Logarithm Laws & Change of Base',
    category: 'algebra',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\log_b(xy) = \\log_b(x) + \\log_b(y), \\quad \\log_b(a) = \\frac{\\ln(a)}{\\ln(b)}',
    formulaDisplay: 'log(xy) = log(x) + log(y)  |  log_b(a) = ln(a) / ln(b)',
    readable: 'Logarithms transform multiplication into addition, division into subtraction, and exponents into scalar multiples.',
    description: 'Logarithms invert exponentiation. They are essential in scientific scales (pH, Richter, decibels), finance (compound interest), and algorithm complexity analysis.',
    variables: [
      { symbol: 'b', meaning: 'Base of logarithm (b > 0, b ≠ 1)' },
      { symbol: 'x, y', meaning: 'Positive real arguments' },
      { symbol: 'ln(x)', meaning: 'Natural logarithm with base e ≈ 2.71828' }
    ],
    keyRulesOrIdentities: [
      'log_b(x / y) = log_b(x) - log_b(y)',
      'log_b(x^k) = k · log_b(x)',
      'log_b(1) = 0 and log_b(b) = 1',
      'b^(log_b(x)) = x'
    ],
    workedExample: {
      question: 'Solve for x: 3^(2x - 1) = 27.',
      stepByStep: [
        'Notice that 27 = 3³',
        'Equate exponents directly: 2x - 1 = 3',
        '2x = 4 => x = 2',
        'Alternatively with logs: (2x - 1)ln(3) = ln(27) = 3ln(3)'
      ],
      finalAnswer: 'x = 2',
      tip: 'When bases cannot be matched directly, apply natural log (ln) to both sides.'
    }
  },
  {
    id: 'alg-binomial-theorem',
    title: 'Binomial Theorem',
    category: 'algebra',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k',
    formulaDisplay: '(a + b)ⁿ = Σ [n! / (k!(n-k)!)] · aⁿ⁻ᵏ · bᵏ',
    readable: 'Any binomial raised to an integer power n expands into a series of terms weighted by combinations (Pascal’s triangle).',
    description: 'Expands polynomials without laborious multiplication and forms the backbone of binomial probability and Taylor series approximations.',
    variables: [
      { symbol: 'n', meaning: 'Power of the expansion (non-negative integer)' },
      { symbol: 'k', meaning: 'Index of term, running from 0 to n' },
      { symbol: 'C(n, k)', meaning: 'Combinations formula: n! / (k!(n-k)!)' }
    ],
    keyRulesOrIdentities: [
      'Total terms in (a + b)ⁿ is n + 1',
      'Sum of coefficients for (1 + 1)ⁿ = 2ⁿ',
      'General (k+1)-th term: T_{k+1} = C(n, k) · aⁿ⁻ᵏ · bᵏ'
    ],
    workedExample: {
      question: 'Find the 3rd term in the expansion of (x + 2)⁴.',
      stepByStep: [
        'Here n = 4, a = x, b = 2',
        'For 3rd term, index k = 2',
        'T₃ = C(4, 2) · x⁴⁻² · 2²',
        'C(4, 2) = (4 · 3) / 2 = 6',
        'T₃ = 6 · x² · 4 = 24x²'
      ],
      finalAnswer: '24x²',
      tip: 'The (r)-th term corresponds to index k = r - 1 because summation starts at k = 0.'
    }
  },
  {
    id: 'alg-sequences-series',
    title: 'Arithmetic & Geometric Series Sums',
    category: 'algebra',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: 'S_n^{\\text{arith}} = \\frac{n}{2}(2a_1 + (n-1)d), \\quad S_n^{\\text{geom}} = \\frac{a_1(1 - r^n)}{1 - r}',
    formulaDisplay: 'Sₙ(arith) = (n/2)[2a₁ + (n-1)d]  |  Sₙ(geom) = a₁(1 - rⁿ) / (1 - r)',
    readable: 'Sum of arithmetic terms uses average of first and last; sum of geometric series multiplies initial term by geometric multiplier.',
    description: 'Fundamental in discrete mathematics, financial amortization, annuities, loan repayments, and infinite convergent series.',
    variables: [
      { symbol: 'a₁', meaning: 'First term of sequence' },
      { symbol: 'd', meaning: 'Common difference (arithmetic)' },
      { symbol: 'r', meaning: 'Common ratio (geometric, r ≠ 1)' },
      { symbol: 'n', meaning: 'Number of terms' }
    ],
    keyRulesOrIdentities: [
      'Infinite geometric sum when |r| < 1: S_∞ = a₁ / (1 - r)',
      'Arithmetic n-th term: aₙ = a₁ + (n - 1)d',
      'Geometric n-th term: aₙ = a₁ · rⁿ⁻¹'
    ],
    workedExample: {
      question: 'Find the infinite sum of 16 + 8 + 4 + 2 + ...',
      stepByStep: [
        'First term a₁ = 16',
        'Common ratio r = 8 / 16 = 1/2',
        'Since |r| = 1/2 < 1, the series converges',
        'S_∞ = a₁ / (1 - r) = 16 / (1 - 1/2) = 16 / 0.5'
      ],
      finalAnswer: 'S_∞ = 32',
      tip: 'If |r| ≥ 1, the infinite geometric series diverges to infinity or oscillates.'
    }
  },

  // ==========================================
  // DERIVATIVES
  // ==========================================
  {
    id: 'deriv-power-rule',
    title: 'The Power Rule for Derivatives',
    category: 'derivative',
    ageGroup: '16-18',
    difficulty: 'Foundation',
    latex: '\\frac{d}{dx}[x^n] = n x^{n-1}',
    formulaDisplay: 'd/dx [xⁿ] = n · xⁿ⁻¹',
    readable: 'To differentiate a variable raised to a constant exponent n, multiply by the exponent and decrease the power by 1.',
    description: 'The most foundational differentiation shortcut in single-variable calculus. Valid for all real numbers n (positive, negative, or fractional).',
    variables: [
      { symbol: 'x', meaning: 'Independent variable' },
      { symbol: 'n', meaning: 'Constant exponent (n ∈ ℝ)' }
    ],
    keyRulesOrIdentities: [
      'd/dx [c] = 0 (derivative of any constant is zero)',
      'd/dx [c · f(x)] = c · f\'(x) (constant multiple rule)',
      'd/dx [1/x] = d/dx [x⁻¹] = -1 · x⁻² = -1/x²',
      'd/dx [√x] = d/dx [x^(1/2)] = (1/2)x^(-1/2) = 1 / (2√x)'
    ],
    workedExample: {
      question: 'Find the derivative of f(x) = 5x⁴ - 3x² + 7x - 9.',
      stepByStep: [
        'Differentiate term by term using power rule:',
        'd/dx [5x⁴] = 5 · (4x³) = 20x³',
        'd/dx [-3x²] = -3 · (2x) = -6x',
        'd/dx [7x¹] = 7 · (1x⁰) = 7',
        'd/dx [-9] = 0'
      ],
      finalAnswer: 'f\'(x) = 20x³ - 6x + 7',
      tip: 'Rewrite radical and rational fractions as negative or fractional powers before applying.'
    },
    interactiveType: 'tangent_derivative'
  },
  {
    id: 'deriv-product-quotient-rule',
    title: 'Product & Quotient Rules',
    category: 'derivative',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[u \\cdot v] = u\'v + uv\', \\quad \\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u\'v - uv\'}{v^2}',
    formulaDisplay: 'd/dx [u · v] = u\'v + uv\'  |  d/dx [u / v] = (u\'v - uv\') / v²',
    readable: 'Derivative of a product is first derivative times second plus first times second derivative; quotient is (low d-high minus high d-low) over low squared.',
    description: 'Calculates the rate of change when two functions are multiplied or divided. Never simply differentiate both numerator and denominator individually.',
    variables: [
      { symbol: 'u(x)', meaning: 'First or numerator function' },
      { symbol: 'v(x)', meaning: 'Second or denominator function (v ≠ 0)' },
      { symbol: 'u\', v\'', meaning: 'Respective first derivatives' }
    ],
    keyRulesOrIdentities: [
      'Mnemonic for quotient: (Lo · dHi - Hi · dLo) / (Lo · Lo)',
      'Extended product rule: (u·v·w)\' = u\'vw + uv\'w + uvw\''
    ],
    workedExample: {
      question: 'Differentiate y = (x² + 1) · sin(x).',
      stepByStep: [
        'Let u = x² + 1 => u\' = 2x',
        'Let v = sin(x) => v\' = cos(x)',
        'Apply product rule: y\' = u\'v + uv\'',
        'y\' = (2x) · sin(x) + (x² + 1) · cos(x)'
      ],
      finalAnswer: 'y\' = 2x sin(x) + (x² + 1)cos(x)',
      tip: 'Always group expressions with parentheses to avoid sign errors when simplifying.'
    }
  },
  {
    id: 'deriv-chain-rule',
    title: 'The Chain Rule for Composite Functions',
    category: 'derivative',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
    formulaDisplay: 'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)',
    readable: 'Derivative of outer function evaluated at inner function, multiplied by derivative of inner function.',
    description: 'Handles nested composite expressions like sin(x² + 1) or e^(3x). Fundamental to implicit differentiation, related rates, and neural network backpropagation.',
    variables: [
      { symbol: 'g(x)', meaning: 'Inner function' },
      { symbol: 'f(u)', meaning: 'Outer function, where u = g(x)' },
      { symbol: 'dy/dx', meaning: '(dy/du) · (du/dx) in Leibniz notation' }
    ],
    keyRulesOrIdentities: [
      'Generalized power: d/dx [uⁿ] = n · uⁿ⁻¹ · u\'',
      'Exponential: d/dx [e^u] = e^u · u\'',
      'Trig: d/dx [sin(u)] = cos(u) · u\'',
      'Logarithmic: d/dx [ln(u)] = (1/u) · u\' = u\' / u'
    ],
    workedExample: {
      question: 'Find the derivative of f(x) = (3x² - 5)⁴.',
      stepByStep: [
        'Identify outer function: f(u) = u⁴ => f\'(u) = 4u³',
        'Identify inner function: u = 3x² - 5 => u\' = 6x',
        'Multiply outer and inner derivatives: 4(3x² - 5)³ · (6x)',
        'Simplify: 24x(3x² - 5)³'
      ],
      finalAnswer: 'f\'(x) = 24x(3x² - 5)³',
      tip: 'Never forget to multiply by the derivative of the inside term ("the chain").'
    }
  },
  {
    id: 'deriv-transcendental',
    title: 'Derivatives of Trig, Exp & Log Functions',
    category: 'derivative',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    latex: '\\frac{d}{dx}[e^x] = e^x, \\quad \\frac{d}{dx}[\\ln x] = \\frac{1}{x}, \\quad \\frac{d}{dx}[\\tan x] = \\sec^2 x',
    formulaDisplay: 'd/dx [eˣ] = eˣ  |  d/dx [ln x] = 1/x  |  d/dx [tan x] = sec² x',
    readable: 'The natural exponential function is its own derivative; natural log derivative is reciprocal; tangent derivative is secant squared.',
    description: 'Forms the core calculus vocabulary for differential equations, wave motion, harmonic oscillators, and electrical engineering signals.',
    variables: [
      { symbol: 'e', meaning: 'Euler\'s constant ≈ 2.71828' },
      { symbol: 'sec(x)', meaning: '1 / cos(x)' }
    ],
    keyRulesOrIdentities: [
      'd/dx [sin x] = cos x',
      'd/dx [cos x] = -sin x (note minus sign!)',
      'd/dx [sec x] = sec(x) tan(x)',
      'd/dx [cot x] = -csc²(x)',
      'd/dx [aˣ] = aˣ · ln(a)'
    ],
    workedExample: {
      question: 'Find the derivative of g(x) = ln(cos(x)).',
      stepByStep: [
        'Use chain rule: d/dx [ln(u)] = u\' / u',
        'Here u = cos(x), so u\' = -sin(x)',
        'g\'(x) = -sin(x) / cos(x)',
        '= -tan(x)'
      ],
      finalAnswer: 'g\'(x) = -tan(x)',
      tip: 'Remember all trigonometric co-functions (cos, cot, csc) have NEGATIVE derivatives.'
    }
  },

  // ==========================================
  // INTEGRATION
  // ==========================================
  {
    id: 'integ-power-rule',
    title: 'Indefinite Integral Power Rule',
    category: 'integration',
    ageGroup: '16-18',
    difficulty: 'Foundation',
    latex: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
    formulaDisplay: '∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + C   (for n ≠ -1)',
    readable: 'To integrate x raised to power n, add 1 to the exponent and divide by the new exponent, plus an arbitrary constant of integration C.',
    description: 'The inverse operation to the differentiation power rule. When n = -1, division by zero occurs, yielding the natural logarithm instead.',
    variables: [
      { symbol: 'n', meaning: 'Power of the integrand (n ≠ -1)' },
      { symbol: 'C', meaning: 'Constant of integration' },
      { symbol: 'dx', meaning: 'Differential indicating variable of integration' }
    ],
    keyRulesOrIdentities: [
      'Special case n = -1: ∫ (1/x) dx = ln|x| + C',
      'Linearity: ∫ [a·f(x) + b·g(x)] dx = a∫f(x)dx + b∫g(x)dx',
      '∫ 1 dx = x + C'
    ],
    workedExample: {
      question: 'Evaluate the indefinite integral: ∫ (6x² - 4x + 5) dx.',
      stepByStep: [
        'Integrate term by term:',
        '∫ 6x² dx = 6 · (x³/3) = 2x³',
        '∫ -4x dx = -4 · (x²/2) = -2x²',
        '∫ 5 dx = 5x',
        'Append the arbitrary constant + C'
      ],
      finalAnswer: '2x³ - 2x² + 5x + C',
      tip: 'Do not forget "+ C" in any indefinite integral! In exams, omitting +C loses marks.'
    },
    interactiveType: 'riemann_integral'
  },
  {
    id: 'integ-fundamental-theorem',
    title: 'Fundamental Theorem of Calculus (FTC)',
    category: 'integration',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a), \\quad \\text{where } F\'(x) = f(x)',
    formulaDisplay: '∫[a to b] f(x) dx = F(b) - F(a)',
    readable: 'The definite integral of f(x) from a to b equals the difference between antiderivative F evaluated at the upper and lower limits.',
    description: 'Bridges differential and integral calculus. Geometrically computes the net signed area bounded between the function curve and the x-axis.',
    variables: [
      { symbol: 'a, b', meaning: 'Lower and upper integration limits' },
      { symbol: 'F(x)', meaning: 'Any antiderivative of f(x)' },
      { symbol: 'Net Area', meaning: 'Area above x-axis minus area below x-axis' }
    ],
    keyRulesOrIdentities: [
      'FTC Part 1: d/dx [ ∫[a to x] f(t) dt ] = f(x)',
      'Reversing limits flips the sign: ∫[a to b] f(x) dx = -∫[b to a] f(x) dx',
      'Additive interval property: ∫[a to c] = ∫[a to b] + ∫[b to c]'
    ],
    workedExample: {
      question: 'Calculate the exact area under f(x) = 3x² from x = 1 to x = 3.',
      stepByStep: [
        'Find antiderivative: F(x) = ∫ 3x² dx = x³',
        'Evaluate at upper limit: F(3) = 3³ = 27',
        'Evaluate at lower limit: F(1) = 1³ = 1',
        'Subtract: F(3) - F(1) = 27 - 1'
      ],
      finalAnswer: '26',
      tip: 'Notice that the constant C cancels out in definite integrals: (27 + C) - (1 + C) = 26.'
    }
  },
  {
    id: 'integ-substitution-method',
    title: 'Integration by Substitution (u-sub)',
    category: 'integration',
    ageGroup: '16-18',
    difficulty: 'Intermediate',
    latex: '\\int f(g(x)) g\'(x) \\, dx = \\int f(u) \\, du',
    formulaDisplay: '∫ f(g(x)) · g\'(x) dx = ∫ f(u) du',
    readable: 'Substitute u = g(x) and du = g\'(x)dx to transform a complex integral into an elementary one.',
    description: 'The reverse of the derivative chain rule. Used when the integrand contains both an inner function and a multiple of its derivative.',
    variables: [
      { symbol: 'u = g(x)', meaning: 'Chosen substitute variable' },
      { symbol: 'du = g\'(x)dx', meaning: 'Differential substitute' }
    ],
    keyRulesOrIdentities: [
      'For definite integrals, update limits: u(a) and u(b)',
      '∫ [f\'(x) / f(x)] dx = ln|f(x)| + C',
      '∫ f\'(x) · [f(x)]ⁿ dx = [f(x)]ⁿ⁺¹ / (n + 1) + C'
    ],
    workedExample: {
      question: 'Evaluate ∫ 2x · cos(x²) dx.',
      stepByStep: [
        'Let u = x²',
        'Differentiate: du = 2x dx => dx = du / (2x)',
        'Substitute into integral: ∫ 2x · cos(u) · (du / (2x))',
        'The 2x factors cancel cleanly: ∫ cos(u) du = sin(u) + C',
        'Substitute back u = x²'
      ],
      finalAnswer: 'sin(x²) + C',
      tip: 'Look for the "inner function" whose derivative is floating outside as a factor.'
    }
  },
  {
    id: 'integ-by-parts',
    title: 'Integration by Parts',
    category: 'integration',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    latex: '\\int u \\, dv = u v - \\int v \\, du',
    formulaDisplay: '∫ u dv = u · v - ∫ v du',
    readable: 'The integral of u with respect to v equals u times v minus the integral of v with respect to u.',
    description: 'The reverse of the product rule. Crucial for integrating products of disparate function families, such as polynomials times exponentials, trig, or logarithms.',
    variables: [
      { symbol: 'u', meaning: 'Part chosen to differentiate (easier derivative)' },
      { symbol: 'dv', meaning: 'Part chosen to integrate (easy to integrate)' },
      { symbol: 'du', meaning: 'u\' dx' },
      { symbol: 'v', meaning: '∫ dv' }
    ],
    keyRulesOrIdentities: [
      'LIATE Priority Rule for picking u: Logarithmic > Inverse Trig > Algebraic > Trig > Exponential',
      'Tabular integration shortcut for polynomials multiplied by sin(ax) or e^(ax)'
    ],
    workedExample: {
      question: 'Evaluate ∫ x · eˣ dx.',
      stepByStep: [
        'Follow LIATE: x is Algebraic (pick u = x), eˣ is Exponential (pick dv = eˣ dx)',
        'du = dx, v = ∫ eˣ dx = eˣ',
        'Apply formula: ∫ u dv = uv - ∫ v du',
        '= x · eˣ - ∫ eˣ dx',
        '= x · eˣ - eˣ + C'
      ],
      finalAnswer: 'eˣ(x - 1) + C',
      tip: 'When integrating ln(x), write it as ∫ ln(x) · 1 dx, picking u = ln(x) and dv = 1 dx.'
    }
  },
  {
    id: 'alg-exponent-laws',
    title: 'Exponent Laws & Radical Conversions',
    category: 'algebra',
    ageGroup: '12-15',
    difficulty: 'Foundation',
    latex: 'a^m \\cdot a^n = a^{m+n}, \\quad (a^m)^n = a^{mn}, \\quad a^{-n} = \\frac{1}{a^n}',
    formulaDisplay: 'aᵐ · aⁿ = aᵐ⁺ⁿ  |  (aᵐ)ⁿ = aᵐⁿ  |  a⁻ⁿ = 1/aⁿ',
    readable: 'Multiplying identical bases adds powers; powers of powers multiply; negative powers represent reciprocals.',
    description: 'Foundational algebra laws that govern simplification of exponential expressions and radicals, converting n-th roots into fractional powers x^(1/n).',
    variables: [
      { symbol: 'a', meaning: 'Base term (a ≠ 0 for negative powers)' },
      { symbol: 'm, n', meaning: 'Exponents (integer or fractional)' }
    ],
    keyRulesOrIdentities: [
      'aᵐ / aⁿ = aᵐ⁻ⁿ',
      'a⁰ = 1 (for any a ≠ 0)',
      'ⁿ√a = a^(1/n)',
      'ⁿ√(aᵐ) = a^(m/n)'
    ],
    workedExample: {
      question: 'Simplify and evaluate (8^(2/3)) · 2⁻¹.',
      stepByStep: [
        'Express 8 as power of 2: 8 = 2³',
        '(2³)^(2/3) = 2^(3 · 2/3) = 2² = 4',
        'Evaluate 2⁻¹ = 1/2',
        'Multiply: 4 · (1/2) = 2'
      ],
      finalAnswer: '2',
      tip: 'Always factor base numbers into prime powers to simplify fractional exponents quickly.'
    }
  },
  {
    id: 'deriv-lhopital',
    title: 'L\'Hôpital\'s Rule for Indeterminate Limits',
    category: 'derivative',
    ageGroup: '19-25',
    difficulty: 'Advanced',
    latex: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)} \\quad \\left(\\text{for } \\frac{0}{0} \\text{ or } \\frac{\\pm\\infty}{\\pm\\infty}\\right)',
    formulaDisplay: 'lim [f(x) / g(x)] = lim [f\'(x) / g\'(x)]  (for 0/0 or ∞/∞)',
    readable: 'When a ratio limit yields 0/0 or infinity over infinity, differentiate numerator and denominator independently.',
    description: 'A powerful calculus theorem that evaluates limits where algebraic substitution breaks down into indeterminate forms.',
    variables: [
      { symbol: 'f(x), g(x)', meaning: 'Differentiable functions near c' },
      { symbol: 'f\'(x), g\'(x)', meaning: 'Independent derivatives (NOT quotient rule)' }
    ],
    keyRulesOrIdentities: [
      'Only applies to indeterminate forms 0/0 or ±∞/±∞',
      'Differentiate top and bottom separately (do NOT use the quotient rule)',
      'Can be applied iteratively if the result remains indeterminate'
    ],
    workedExample: {
      question: 'Evaluate lim (x → 0) of sin(5x) / x.',
      stepByStep: [
        'Direct substitution gives sin(0)/0 = 0/0 (indeterminate form)',
        'Apply L\'Hôpital: differentiate numerator: d/dx[sin(5x)] = 5cos(5x)',
        'Differentiate denominator: d/dx[x] = 1',
        'Take limit: lim (x → 0) [5cos(5x) / 1] = 5cos(0) / 1 = 5(1) = 5'
      ],
      finalAnswer: '5',
      tip: 'Always confirm the limit is truly 0/0 or ∞/∞ before applying L\'Hôpital\'s Rule.'
    }
  },
  {
    id: 'integ-area-between-curves',
    title: 'Definite Integral for Area Between Curves',
    category: 'integration',
    ageGroup: '19-25',
    difficulty: 'Intermediate',
    latex: 'A = \\int_{a}^{b} [f(x) - g(x)] \\, dx \\quad (f(x) \\ge g(x))',
    formulaDisplay: 'A = ∫[a to b] (Top Function - Bottom Function) dx',
    readable: 'The geometric area trapped between two curves equals the integral of the upper curve minus the lower curve over the interval.',
    description: 'Computes geometric region area enclosed between two intersecting or bounded curves in a Cartesian plane.',
    variables: [
      { symbol: 'f(x)', meaning: 'Upper boundary curve (top)' },
      { symbol: 'g(x)', meaning: 'Lower boundary curve (bottom)' },
      { symbol: 'a, b', meaning: 'X-coordinates of intersection points' }
    ],
    keyRulesOrIdentities: [
      'If curves cross, split the integral at intersection points',
      'For curves with respect to y: A = ∫ (Right Curve - Left Curve) dy',
      'Area is always strictly positive: A ≥ 0'
    ],
    workedExample: {
      question: 'Find the area between y = x and y = x² from x = 0 to x = 1.',
      stepByStep: [
        'Over interval [0, 1], x ≥ x², so Top = x and Bottom = x²',
        'Area = ∫[0 to 1] (x - x²) dx',
        'Antiderivative = [x²/2 - x³/3] evaluated from 0 to 1',
        '= (1/2 - 1/3) - (0) = 3/6 - 2/6 = 1/6'
      ],
      finalAnswer: '1/6 square units',
      tip: 'Sketch a quick curve or test an intermediate test point (like x = 0.5) to confirm which curve lies on top.'
    }
  }
];
