export interface FormulaItem {
  id: string;
  name: string;
  math: string;
  explanation?: string;
  details?: string[];
}

export interface FormulaTopic {
  id: string;
  topicNumber: string;
  title: string;
  formulas: FormulaItem[];
}

export interface FormulaChapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  badge: string;
  color: string;
  topics: FormulaTopic[];
}

export const ENGINEERING_FORMULAS_DATA: FormulaChapter[] = [
  // CHAPTER 1
  {
    id: 'ch1',
    chapterNumber: 1,
    title: 'Basic Mathematics',
    description: 'Percentages, ratios, exponents, logarithms, and surds foundation.',
    badge: 'Foundation',
    color: 'emerald',
    topics: [
      {
        id: '1.1',
        topicNumber: '1.1',
        title: 'Percentage',
        formulas: [
          {
            id: 'pct-1',
            name: 'Percentage Formula',
            math: 'Percentage = (\\frac{\\text{Value}}{\\text{Total Value}}) \\times 100\\%',
            explanation: 'Determines the proportion of a part relative to the whole.'
          },
          {
            id: 'pct-2',
            name: 'Percentage Increase',
            math: '\\text{Percentage Increase} = \\left[ \\frac{\\text{New Value} - \\text{Old Value}}{\\text{Old Value}} \\right] \\times 100\\%',
            explanation: 'Measures the rate of expansion relative to the initial baseline.'
          },
          {
            id: 'pct-3',
            name: 'Percentage Decrease',
            math: '\\text{Percentage Decrease} = \\left[ \\frac{\\text{Old Value} - \\text{New Value}}{\\text{Old Value}} \\right] \\times 100\\%',
            explanation: 'Measures the loss rate relative to the initial baseline.'
          },
          {
            id: 'pct-4',
            name: 'New Value after Percentage Change',
            math: '\\text{New Value} = \\text{Original Value} \\times \\left(1 \\pm \\frac{\\text{Percentage}}{100}\\right)',
            explanation: 'Direct multiplier formulation for growth (+) or decay (-).'
          }
        ]
      },
      {
        id: '1.2',
        topicNumber: '1.2',
        title: 'Ratio and Proportion',
        formulas: [
          {
            id: 'rp-1',
            name: 'Ratio Definition',
            math: 'a : b = \\frac{a}{b}',
            explanation: 'Comparison of two quantities of the same unit.'
          },
          {
            id: 'rp-2',
            name: 'Fundamental Proportion Rule',
            math: '\\text{If } \\frac{a}{b} = \\frac{c}{d} \\implies ad = bc',
            explanation: 'Product of extremes equals product of means.'
          },
          {
            id: 'rp-3',
            name: 'Fourth Proportional',
            math: '\\text{Fourth Proportional } (x) = \\frac{b \\times c}{a}',
            explanation: 'For proportional sequence a : b :: c : x.'
          },
          {
            id: 'rp-4',
            name: 'Mean Proportional',
            math: '\\text{Mean Proportional } (x) = \\sqrt{ab}',
            explanation: 'Geometric mean between two quantities where a : x :: x : b.'
          }
        ]
      },
      {
        id: '1.3',
        topicNumber: '1.3',
        title: 'Average',
        formulas: [
          {
            id: 'avg-1',
            name: 'Arithmetic Mean (Average)',
            math: '\\bar{x} = \\frac{\\text{Sum of Observations}}{\\text{Number of Observations}} = \\frac{\\sum x_i}{n}',
            explanation: 'Standard central measure of a data distribution.'
          },
          {
            id: 'avg-2',
            name: 'Weighted Average',
            math: '\\bar{x}_w = \\frac{\\sum (w_i x_i)}{\\sum w_i}',
            explanation: 'Accounts for relative importance or frequencies of observations.'
          }
        ]
      },
      {
        id: '1.4',
        topicNumber: '1.4',
        title: 'Exponents and Powers',
        formulas: [
          { id: 'exp-1', name: 'Product of Powers', math: 'a^m \\times a^n = a^{m+n}' },
          { id: 'exp-2', name: 'Quotient of Powers', math: '\\frac{a^m}{a^n} = a^{m-n}' },
          { id: 'exp-3', name: 'Power of a Power', math: '(a^m)^n = a^{mn}' },
          { id: 'exp-4', name: 'Power of a Product', math: '(ab)^n = a^n b^n' },
          { id: 'exp-5', name: 'Power of a Quotient', math: '\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}' },
          { id: 'exp-6', name: 'Zero Exponent', math: 'a^0 = 1 \\quad (a \\neq 0)' },
          { id: 'exp-7', name: 'Negative Exponent', math: 'a^{-n} = \\frac{1}{a^n}' },
          { id: 'exp-8', name: 'Fractional Exponent (Root)', math: 'a^{1/n} = \\sqrt[n]{a}' },
          { id: 'exp-9', name: 'General Rational Exponent', math: 'a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m' }
        ]
      },
      {
        id: '1.5',
        topicNumber: '1.5',
        title: 'Logarithms',
        formulas: [
          { id: 'log-1', name: 'Log of Unity', math: '\\log_a(1) = 0' },
          { id: 'log-2', name: 'Log of Base', math: '\\log_a(a) = 1' },
          { id: 'log-3', name: 'Product Rule', math: '\\log_a(xy) = \\log_a(x) + \\log_a(y)' },
          { id: 'log-4', name: 'Quotient Rule', math: '\\log_a\\left(\\frac{x}{y}\\right) = \\log_a(x) - \\log_a(y)' },
          { id: 'log-5', name: 'Power Rule', math: '\\log_a(x^n) = n \\log_a(x)' },
          { id: 'log-6', name: 'Square Root Log', math: '\\log_a(\\sqrt{x}) = \\frac{1}{2}\\log_a(x)' },
          { id: 'log-7', name: 'Change of Base Theorem', math: '\\log_a(x) = \\frac{\\log_b(x)}{\\log_b(a)} = \\frac{\\ln x}{\\ln a}' },
          { id: 'log-8', name: 'Natural Log Inverse (ln)', math: '\\ln(e^x) = x' },
          { id: 'log-9', name: 'Exponential Inverse', math: 'e^{\\ln x} = x \\quad (x > 0)' }
        ]
      },
      {
        id: '1.6',
        topicNumber: '1.6',
        title: 'Surds',
        formulas: [
          { id: 'srd-1', name: 'Multiplication of Surds', math: '\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}' },
          { id: 'srd-2', name: 'Division of Surds', math: '\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}' },
          { id: 'srd-3', name: 'Conjugate Surd Product', math: '(\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b' },
          { id: 'srd-4', name: 'Rationalization of Denominator', math: '\\frac{1}{\\sqrt{a} + \\sqrt{b}} = \\frac{\\sqrt{a} - \\sqrt{b}}{a - b}' }
        ]
      }
    ]
  },

  // CHAPTER 2
  {
    id: 'ch2',
    chapterNumber: 2,
    title: 'Algebra',
    description: 'Identities, quadratic and linear equations, progressions, and combinatorics.',
    badge: 'Core Algebra',
    color: 'cyan',
    topics: [
      {
        id: '2.1',
        topicNumber: '2.1',
        title: 'Algebraic Identities',
        formulas: [
          { id: 'alg-1', name: 'Square of Sum', math: '(a+b)^2 = a^2 + 2ab + b^2' },
          { id: 'alg-2', name: 'Square of Difference', math: '(a-b)^2 = a^2 - 2ab + b^2' },
          { id: 'alg-3', name: 'Difference of Squares', math: '(a+b)(a-b) = a^2 - b^2' },
          { id: 'alg-4', name: 'Cube of Sum', math: '(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3' },
          { id: 'alg-5', name: 'Cube of Difference', math: '(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3' },
          { id: 'alg-6', name: 'Sum of Cubes', math: 'a^3 + b^3 = (a+b)(a^2 - ab + b^2)' },
          { id: 'alg-7', name: 'Difference of Cubes', math: 'a^3 - b^3 = (a-b)(a^2 + ab + b^2)' },
          { id: 'alg-8', name: 'Sum of Squares Identity', math: 'a^2 + b^2 = (a+b)^2 - 2ab = (a-b)^2 + 2ab' },
          { id: 'alg-9', name: 'Trinomial Square', math: '(a+b+c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca' },
          { id: 'alg-10', name: 'Trinomial Cube', math: '(a+b+c)^3 = a^3 + b^3 + c^3 + 3(a+b)(b+c)(c+a)' }
        ]
      },
      {
        id: '2.2',
        topicNumber: '2.2',
        title: 'Quadratic Equations',
        formulas: [
          { id: 'qd-1', name: 'Standard Quadratic Form', math: 'ax^2 + bx + c = 0 \\quad (a \\neq 0)' },
          { id: 'qd-2', name: 'Quadratic Formula (Roots)', math: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
          { id: 'qd-3', name: 'Discriminant (D)', math: 'D = b^2 - 4ac \\quad (D>0: \\text{real, distinct}; D=0: \\text{equal}; D<0: \\text{complex})' },
          { id: 'qd-4', name: 'Sum of Roots', math: '\\alpha + \\beta = -\\frac{b}{a}' },
          { id: 'qd-5', name: 'Product of Roots', math: '\\alpha\\beta = \\frac{c}{a}' },
          { id: 'qd-6', name: 'Equation from Roots', math: 'x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0' }
        ]
      },
      {
        id: '2.3',
        topicNumber: '2.3',
        title: 'Linear Equations',
        formulas: [
          { id: 'le-1', name: 'Single Variable Linear', math: 'ax + b = 0 \\implies x = -\\frac{b}{a}' },
          { id: 'le-2', name: 'System of Two Linear Equations', math: 'a_1x + b_1y = c_1, \\quad a_2x + b_2y = c_2' },
          { id: 'le-3', name: 'Cramer\'s / Determinant Solution', math: 'x = \\frac{c_1b_2 - b_1c_2}{a_1b_2 - b_1a_2}, \\quad y = \\frac{a_1c_2 - c_1a_2}{a_1b_2 - b_1a_2}' }
        ]
      },
      {
        id: '2.4',
        topicNumber: '2.4',
        title: 'Arithmetic Progression (AP)',
        formulas: [
          { id: 'ap-1', name: 'nth Term of an AP', math: 'a_n = a + (n-1)d', explanation: 'a = first term, d = common difference' },
          { id: 'ap-2', name: 'Sum of First n Terms (with d)', math: 'S_n = \\frac{n}{2} [2a + (n-1)d]' },
          { id: 'ap-3', name: 'Sum of First n Terms (with last term l)', math: 'S_n = \\frac{n(a + l)}{2}' }
        ]
      },
      {
        id: '2.5',
        topicNumber: '2.5',
        title: 'Geometric Progression (GP)',
        formulas: [
          { id: 'gp-1', name: 'nth Term of a GP', math: 'a_n = a r^{n-1}', explanation: 'a = initial term, r = common ratio' },
          { id: 'gp-2', name: 'Sum of n Terms (r > 1)', math: 'S_n = \\frac{a(r^n - 1)}{r - 1} \\quad (r \\neq 1)' },
          { id: 'gp-3', name: 'Sum of n Terms (r < 1)', math: 'S_n = \\frac{a(1 - r^n)}{1 - r} \\quad (r \\neq 1)' },
          { id: 'gp-4', name: 'Infinite GP Sum', math: 'S_\\infty = \\frac{a}{1 - r} \\quad (|r| < 1)' }
        ]
      },
      {
        id: '2.6',
        topicNumber: '2.6',
        title: 'Binomial Theorem',
        formulas: [
          { id: 'bin-1', name: 'Binomial Expansion', math: '(a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r' },
          { id: 'bin-2', name: 'General Term', math: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^r' },
          { id: 'bin-3', name: 'Binomial Coefficient', math: '\\binom{n}{r} = C(n,r) = \\frac{n!}{r!(n-r)!}' }
        ]
      },
      {
        id: '2.7',
        topicNumber: '2.7',
        title: 'Permutations and Combinations',
        formulas: [
          { id: 'pc-1', name: 'Permutation Formula (Ordered)', math: '^nP_r = \\frac{n!}{(n-r)!}' },
          { id: 'pc-2', name: 'Combination Formula (Unordered)', math: '^nC_r = \\frac{n!}{r!(n-r)!}' },
          { id: 'pc-3', name: 'Complementary Combination', math: '^nC_r = ^nC_{n-r}' },
          { id: 'pc-4', name: 'Relation between P and C', math: '^nP_r = r! \\times ^nC_r' }
        ]
      }
    ]
  },

  // CHAPTER 3
  {
    id: 'ch3',
    chapterNumber: 3,
    title: 'Trigonometry',
    description: 'Ratios, identities, angle transformations, and inverse trigonometric functions.',
    badge: 'Trigonometry',
    color: 'violet',
    topics: [
      {
        id: '3.1',
        topicNumber: '3.1',
        title: 'Basic Trigonometric Ratios',
        formulas: [
          { id: 'tr-1', name: 'Sine Ratio', math: '\\sin \\theta = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}} = \\frac{P}{H}' },
          { id: 'tr-2', name: 'Cosine Ratio', math: '\\cos \\theta = \\frac{\\text{Base}}{\\text{Hypotenuse}} = \\frac{B}{H}' },
          { id: 'tr-3', name: 'Tangent Ratio', math: '\\tan \\theta = \\frac{\\text{Perpendicular}}{\\text{Base}} = \\frac{P}{B} = \\frac{\\sin \\theta}{\\cos \\theta}' },
          { id: 'tr-4', name: 'Cosecant Ratio', math: '\\csc \\theta = \\frac{1}{\\sin \\theta} = \\frac{H}{P}' },
          { id: 'tr-5', name: 'Secant Ratio', math: '\\sec \\theta = \\frac{1}{\\cos \\theta} = \\frac{H}{B}' },
          { id: 'tr-6', name: 'Cotangent Ratio', math: '\\cot \\theta = \\frac{1}{\\tan \\theta} = \\frac{B}{P} = \\frac{\\cos \\theta}{\\sin \\theta}' }
        ]
      },
      {
        id: '3.2',
        topicNumber: '3.2',
        title: 'Reciprocal Identities',
        formulas: [
          { id: 'rc-1', name: 'Sine-Cosecant Reciprocal', math: '\\sin \\theta \\times \\csc \\theta = 1' },
          { id: 'rc-2', name: 'Cosine-Secant Reciprocal', math: '\\cos \\theta \\times \\sec \\theta = 1' },
          { id: 'rc-3', name: 'Tangent-Cotangent Reciprocal', math: '\\tan \\theta \\times \\cot \\theta = 1' }
        ]
      },
      {
        id: '3.3',
        topicNumber: '3.3',
        title: 'Pythagorean Identities',
        formulas: [
          { id: 'py-1', name: 'Fundamental Identity', math: '\\sin^2 \\theta + \\cos^2 \\theta = 1' },
          { id: 'py-2', name: 'Secant-Tangent Identity', math: '1 + \\tan^2 \\theta = \\sec^2 \\theta' },
          { id: 'py-3', name: 'Cosecant-Cotangent Identity', math: '1 + \\cot^2 \\theta = \\csc^2 \\theta' }
        ]
      },
      {
        id: '3.4',
        topicNumber: '3.4',
        title: 'Complementary Angles',
        formulas: [
          { id: 'cm-1', name: 'sin(90° - θ)', math: '\\sin(90^\\circ - \\theta) = \\cos \\theta' },
          { id: 'cm-2', name: 'cos(90° - θ)', math: '\\cos(90^\\circ - \\theta) = \\sin \\theta' },
          { id: 'cm-3', name: 'tan(90° - θ)', math: '\\tan(90^\\circ - \\theta) = \\cot \\theta' },
          { id: 'cm-4', name: 'cot(90° - θ)', math: '\\cot(90^\\circ - \\theta) = \\tan \\theta' },
          { id: 'cm-5', name: 'sec(90° - θ)', math: '\\sec(90^\\circ - \\theta) = \\csc \\theta' },
          { id: 'cm-6', name: 'csc(90° - θ)', math: '\\csc(90^\\circ - \\theta) = \\sec \\theta' }
        ]
      },
      {
        id: '3.5',
        topicNumber: '3.5',
        title: 'Negative Angles (Even/Odd)',
        formulas: [
          { id: 'neg-1', name: 'sin(-θ) (Odd)', math: '\\sin(-\\theta) = -\\sin \\theta' },
          { id: 'neg-2', name: 'cos(-θ) (Even)', math: '\\cos(-\\theta) = \\cos \\theta' },
          { id: 'neg-3', name: 'tan(-θ) (Odd)', math: '\\tan(-\\theta) = -\\tan \\theta' }
        ]
      },
      {
        id: '3.6',
        topicNumber: '3.6',
        title: 'Allied Angles',
        formulas: [
          { id: 'al-1', name: 'sin(90° + θ)', math: '\\sin(90^\\circ + \\theta) = \\cos \\theta' },
          { id: 'al-2', name: 'cos(90° + θ)', math: '\\cos(90^\\circ + \\theta) = -\\sin \\theta' },
          { id: 'al-3', name: 'sin(180° - θ)', math: '\\sin(180^\\circ - \\theta) = \\sin \\theta' },
          { id: 'al-4', name: 'cos(180° - θ)', math: '\\cos(180^\\circ - \\theta) = -\\cos \\theta' },
          { id: 'al-5', name: 'sin(180° + θ)', math: '\\sin(180^\\circ + \\theta) = -\\sin \\theta' },
          { id: 'al-6', name: 'cos(180° + θ)', math: '\\cos(180^\\circ + \\theta) = -\\cos \\theta' },
          { id: 'al-7', name: 'sin(360° - θ)', math: '\\sin(360^\\circ - \\theta) = -\\sin \\theta' },
          { id: 'al-8', name: 'cos(360° - θ)', math: '\\cos(360^\\circ - \\theta) = \\cos \\theta' }
        ]
      },
      {
        id: '3.7',
        topicNumber: '3.7',
        title: 'Compound Angle Formulas',
        formulas: [
          { id: 'cp-1', name: 'sin(A + B)', math: '\\sin(A+B) = \\sin A \\cos B + \\cos A \\sin B' },
          { id: 'cp-2', name: 'sin(A - B)', math: '\\sin(A-B) = \\sin A \\cos B - \\cos A \\sin B' },
          { id: 'cp-3', name: 'cos(A + B)', math: '\\cos(A+B) = \\cos A \\cos B - \\sin A \\sin B' },
          { id: 'cp-4', name: 'cos(A - B)', math: '\\cos(A-B) = \\cos A \\cos B + \\sin A \\sin B' },
          { id: 'cp-5', name: 'tan(A + B)', math: '\\tan(A+B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}' },
          { id: 'cp-6', name: 'tan(A - B)', math: '\\tan(A-B) = \\frac{\\tan A - \\tan B}{1 + \\tan A \\tan B}' }
        ]
      },
      {
        id: '3.8',
        topicNumber: '3.8',
        title: 'Double Angle Formulas',
        formulas: [
          { id: 'da-1', name: 'sin(2A)', math: '\\sin 2A = 2\\sin A \\cos A = \\frac{2\\tan A}{1 + \\tan^2 A}' },
          { id: 'da-2', name: 'cos(2A) (Full)', math: '\\cos 2A = \\cos^2 A - \\sin^2 A' },
          { id: 'da-3', name: 'cos(2A) in Sine', math: '\\cos 2A = 1 - 2\\sin^2 A' },
          { id: 'da-4', name: 'cos(2A) in Cosine', math: '\\cos 2A = 2\\cos^2 A - 1' },
          { id: 'da-5', name: 'tan(2A)', math: '\\tan 2A = \\frac{2\\tan A}{1 - \\tan^2 A}' }
        ]
      },
      {
        id: '3.9',
        topicNumber: '3.9',
        title: 'Triple Angle Formulas',
        formulas: [
          { id: 'ta-1', name: 'sin(3A)', math: '\\sin 3A = 3\\sin A - 4\\sin^3 A' },
          { id: 'ta-2', name: 'cos(3A)', math: '\\cos 3A = 4\\cos^3 A - 3\\cos A' },
          { id: 'ta-3', name: 'tan(3A)', math: '\\tan 3A = \\frac{3\\tan A - \\tan^3 A}{1 - 3\\tan^2 A}' }
        ]
      },
      {
        id: '3.10',
        topicNumber: '3.10',
        title: 'Half Angle Formulas',
        formulas: [
          { id: 'ha-1', name: 'sin²(A/2)', math: '\\sin^2\\left(\\frac{A}{2}\\right) = \\frac{1 - \\cos A}{2}' },
          { id: 'ha-2', name: 'cos²(A/2)', math: '\\cos^2\\left(\\frac{A}{2}\\right) = \\frac{1 + \\cos A}{2}' },
          { id: 'ha-3', name: 'tan(A/2) - Form 1', math: '\\tan\\left(\\frac{A}{2}\\right) = \\frac{\\sin A}{1 + \\cos A}' },
          { id: 'ha-4', name: 'tan(A/2) - Form 2', math: '\\tan\\left(\\frac{A}{2}\\right) = \\frac{1 - \\cos A}{\\sin A}' }
        ]
      },
      {
        id: '3.11',
        topicNumber: '3.11',
        title: 'Product to Sum Formulas',
        formulas: [
          { id: 'ps-1', name: 'sin A sin B', math: '\\sin A \\sin B = \\frac{\\cos(A-B) - \\cos(A+B)}{2}' },
          { id: 'ps-2', name: 'cos A cos B', math: '\\cos A \\cos B = \\frac{\\cos(A-B) + \\cos(A+B)}{2}' },
          { id: 'ps-3', name: 'sin A cos B', math: '\\sin A \\cos B = \\frac{\\sin(A+B) + \\sin(A-B)}{2}' }
        ]
      },
      {
        id: '3.12',
        topicNumber: '3.12',
        title: 'Sum to Product Formulas',
        formulas: [
          { id: 'sp-1', name: 'sin A + sin B', math: '\\sin A + \\sin B = 2\\sin\\left(\\frac{A+B}{2}\\right)\\cos\\left(\\frac{A-B}{2}\\right)' },
          { id: 'sp-2', name: 'sin A - sin B', math: '\\sin A - \\sin B = 2\\cos\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{A-B}{2}\\right)' },
          { id: 'sp-3', name: 'cos A + cos B', math: '\\cos A + \\cos B = 2\\cos\\left(\\frac{A+B}{2}\\right)\\cos\\left(\\frac{A-B}{2}\\right)' },
          { id: 'sp-4', name: 'cos A - cos B', math: '\\cos A - \\cos B = -2\\sin\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{A-B}{2}\\right)' }
        ]
      },
      {
        id: '3.13',
        topicNumber: '3.13',
        title: 'Standard Trigonometric Values Table',
        formulas: [
          { id: 'st-sin', name: 'Sine (0°, 30°, 45°, 60°, 90°)', math: '\\sin(0^\\circ)=0, \\; \\sin(30^\\circ)=\\frac{1}{2}, \\; \\sin(45^\\circ)=\\frac{1}{\\sqrt{2}}, \\; \\sin(60^\\circ)=\\frac{\\sqrt{3}}{2}, \\; \\sin(90^\\circ)=1' },
          { id: 'st-cos', name: 'Cosine (0°, 30°, 45°, 60°, 90°)', math: '\\cos(0^\\circ)=1, \\; \\cos(30^\\circ)=\\frac{\\sqrt{3}}{2}, \\; \\cos(45^\\circ)=\\frac{1}{\\sqrt{2}}, \\; \\cos(60^\\circ)=\\frac{1}{2}, \\; \\cos(90^\\circ)=0' },
          { id: 'st-tan', name: 'Tangent (0°, 30°, 45°, 60°, 90°)', math: '\\tan(0^\\circ)=0, \\; \\tan(30^\\circ)=\\frac{1}{\\sqrt{3}}, \\; \\tan(45^\\circ)=1, \\; \\tan(60^\\circ)=\\sqrt{3}, \\; \\tan(90^\\circ)=\\text{Undefined}' }
        ]
      },
      {
        id: '3.14',
        topicNumber: '3.14',
        title: 'Inverse Trigonometry',
        formulas: [
          { id: 'it-1', name: 'sin⁻¹x + cos⁻¹x', math: '\\sin^{-1}(x) + \\cos^{-1}(x) = \\frac{\\pi}{2}' },
          { id: 'it-2', name: 'tan⁻¹x + cot⁻¹x', math: '\\tan^{-1}(x) + \\cot^{-1}(x) = \\frac{\\pi}{2}' },
          { id: 'it-3', name: 'sec⁻¹x Reciprocal', math: '\\sec^{-1}(x) = \\cos^{-1}\\left(\\frac{1}{x}\\right)' },
          { id: 'it-4', name: 'csc⁻¹x Reciprocal', math: '\\csc^{-1}(x) = \\sin^{-1}\\left(\\frac{1}{x}\\right)' },
          { id: 'it-5', name: 'Sum of Inverse Tangents', math: '\\tan^{-1}(x) + \\tan^{-1}(y) = \\tan^{-1}\\left(\\frac{x+y}{1 - xy}\\right) \\quad (xy < 1)' }
        ]
      }
    ]
  },

  // CHAPTER 4
  {
    id: 'ch4',
    chapterNumber: 4,
    title: 'Coordinate Geometry',
    description: 'Distance, slope, lines, circle, parabola, ellipse, and hyperbola.',
    badge: 'Geometry',
    color: 'amber',
    topics: [
      {
        id: '4.1',
        topicNumber: '4.1',
        title: 'Distance Formula',
        formulas: [
          { id: 'cg-dist', name: 'Euclidean Distance in 2D', math: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}' }
        ]
      },
      {
        id: '4.2',
        topicNumber: '4.2',
        title: 'Midpoint Formula',
        formulas: [
          { id: 'cg-mid', name: 'Midpoint of Segment', math: 'M = \\left( \\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2} \\right)' }
        ]
      },
      {
        id: '4.3',
        topicNumber: '4.3',
        title: 'Section Formula',
        formulas: [
          { id: 'cg-sec-in', name: 'Internal Division (m : n)', math: 'P = \\left( \\frac{m x_2 + n x_1}{m + n}, \\; \\frac{m y_2 + n y_1}{m + n} \\right)' },
          { id: 'cg-sec-ex', name: 'External Division (m : n)', math: 'P = \\left( \\frac{m x_2 - n x_1}{m - n}, \\; \\frac{m y_2 - n y_1}{m - n} \\right)' }
        ]
      },
      {
        id: '4.4',
        topicNumber: '4.4',
        title: 'Slope of a Line',
        formulas: [
          { id: 'cg-slope', name: 'Slope Gradient (m)', math: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan \\theta' }
        ]
      },
      {
        id: '4.5',
        topicNumber: '4.5',
        title: 'Equation of a Straight Line',
        formulas: [
          { id: 'cg-l1', name: 'Slope-Intercept Form', math: 'y = mx + c' },
          { id: 'cg-l2', name: 'Point-Slope Form', math: 'y - y_1 = m(x - x_1)' },
          { id: 'cg-l3', name: 'Two-Point Form', math: '\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}' },
          { id: 'cg-l4', name: 'Intercept Form', math: '\\frac{x}{a} + \\frac{y}{b} = 1' },
          { id: 'cg-l5', name: 'General Form', math: 'Ax + By + C = 0 \\implies m = -\\frac{A}{B}' }
        ]
      },
      {
        id: '4.6',
        topicNumber: '4.6',
        title: 'Circle',
        formulas: [
          { id: 'cg-cir1', name: 'Standard Circle Form', math: '(x - h)^2 + (y - k)^2 = r^2 \\quad [\\text{Centre } (h,k), \\text{ Radius } r]' },
          { id: 'cg-cir2', name: 'General Circle Form', math: 'x^2 + y^2 + 2gx + 2fy + c = 0' },
          { id: 'cg-cir3', name: 'Centre and Radius (General)', math: '\\text{Centre} = (-g, -f), \\quad \\text{Radius } r = \\sqrt{g^2 + f^2 - c}' }
        ]
      },
      {
        id: '4.7',
        topicNumber: '4.7',
        title: 'Parabola',
        formulas: [
          { id: 'cg-par1', name: 'Horizontal Parabola (y² = 4ax)', math: 'y^2 = 4ax \\implies \\text{Focus: } (a,0), \\; \\text{Directrix: } x = -a' },
          { id: 'cg-par2', name: 'Vertical Parabola (x² = 4ay)', math: 'x^2 = 4ay \\implies \\text{Focus: } (0,a), \\; \\text{Directrix: } y = -a' }
        ]
      },
      {
        id: '4.8',
        topicNumber: '4.8',
        title: 'Ellipse',
        formulas: [
          { id: 'cg-elp1', name: 'Standard Ellipse Form', math: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (a > b)' },
          { id: 'cg-elp2', name: 'Focal Relation', math: 'c^2 = a^2 - b^2' },
          { id: 'cg-elp3', name: 'Eccentricity', math: 'e = \\frac{c}{a} = \\sqrt{1 - \\frac{b^2}{a^2}} < 1' }
        ]
      },
      {
        id: '4.9',
        topicNumber: '4.9',
        title: 'Hyperbola',
        formulas: [
          { id: 'cg-hyp1', name: 'Standard Hyperbola Form', math: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1' },
          { id: 'cg-hyp2', name: 'Focal Relation', math: 'c^2 = a^2 + b^2' },
          { id: 'cg-hyp3', name: 'Eccentricity', math: 'e = \\frac{c}{a} = \\sqrt{1 + \\frac{b^2}{a^2}} > 1' }
        ]
      }
    ]
  },

  // CHAPTER 5
  {
    id: 'ch5',
    chapterNumber: 5,
    title: 'Matrices and Determinants',
    description: 'Matrix algebra, transpose, determinants, matrix inversion, and linear systems.',
    badge: 'Linear Algebra',
    color: 'rose',
    topics: [
      {
        id: '5.1',
        topicNumber: '5.1',
        title: 'Matrix Operations',
        formulas: [
          { id: 'mat-add', name: 'Addition of Matrices', math: 'A + B = [a_{ij} + b_{ij}]' },
          { id: 'mat-sub', name: 'Subtraction of Matrices', math: 'A - B = [a_{ij} - b_{ij}]' },
          { id: 'mat-scal', name: 'Scalar Multiplication', math: 'k A = [k \\cdot a_{ij}]' },
          { id: 'mat-mult', name: 'Matrix Multiplication', math: '(AB)_{ij} = \\sum_{k=1}^m a_{ik} b_{kj}' }
        ]
      },
      {
        id: '5.2',
        topicNumber: '5.2',
        title: 'Transpose Properties',
        formulas: [
          { id: 'tr-p1', name: 'Product Transpose', math: '(AB)^T = B^T A^T' },
          { id: 'tr-p2', name: 'Sum Transpose', math: '(A + B)^T = A^T + B^T' },
          { id: 'tr-p3', name: 'Double Transpose', math: '(A^T)^T = A' }
        ]
      },
      {
        id: '5.3',
        topicNumber: '5.3',
        title: 'Determinants',
        formulas: [
          { id: 'det-2x2', name: '2×2 Determinant', math: '\\det(A) = |A| = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc' },
          { id: 'det-3x3', name: '3×3 Determinant Expansion', math: '|A| = a(ei - fh) - b(di - fg) + c(dh - eg)' }
        ]
      },
      {
        id: '5.4',
        topicNumber: '5.4',
        title: 'Inverse of a Matrix',
        formulas: [
          { id: 'inv-gen', name: 'General Inverse Formula', math: 'A^{-1} = \\frac{\\text{adj}(A)}{|A|} \\quad (|A| \\neq 0)' },
          { id: 'inv-2x2', name: 'Explicit 2×2 Matrix Inverse', math: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}' }
        ]
      },
      {
        id: '5.5',
        topicNumber: '5.5',
        title: 'Important Properties',
        formulas: [
          { id: 'prop-det-prod', name: 'Product Determinant', math: '|AB| = |A| \\cdot |B|' },
          { id: 'prop-det-trans', name: 'Transpose Determinant', math: '|A^T| = |A|' },
          { id: 'prop-det-inv', name: 'Inverse Determinant', math: '|A^{-1}| = \\frac{1}{|A|}' },
          { id: 'prop-mat-inv', name: 'Matrix Times Inverse', math: 'A A^{-1} = A^{-1} A = I' },
          { id: 'prop-mat-id', name: 'Identity Matrix Multiplication', math: 'A I = I A = A' }
        ]
      }
    ]
  },

  // CHAPTER 6
  {
    id: 'ch6',
    chapterNumber: 6,
    title: 'Limits and Continuity',
    description: 'Standard limits, L\'Hopital\'s rule concepts, continuity, and differentiability.',
    badge: 'Calculus',
    color: 'emerald',
    topics: [
      {
        id: '6.1',
        topicNumber: '6.1',
        title: 'Standard Limits',
        formulas: [
          { id: 'lim-1', name: 'Trig Ratio Limit', math: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
          { id: 'lim-2', name: 'Tangent Ratio Limit', math: '\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1' },
          { id: 'lim-3', name: 'Cosine-Squared Limit', math: '\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}' },
          { id: 'lim-4', name: 'Natural Exponential Limit', math: '\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1' },
          { id: 'lim-5', name: 'General Exponential Limit', math: '\\lim_{x \\to 0} \\frac{a^x - 1}{x} = \\ln a' },
          { id: 'lim-6', name: 'Logarithmic Limit', math: '\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = 1' },
          { id: 'lim-7', name: 'Euler Number Definition (e)', math: '\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e' },
          { id: 'lim-8', name: 'Power Limit', math: '\\lim_{x \\to 0} \\frac{(1+x)^n - 1}{x} = n' }
        ]
      },
      {
        id: '6.2',
        topicNumber: '6.2',
        title: 'Continuity',
        formulas: [
          { id: 'cont-def', name: 'Condition for Continuity at x = a', math: '\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)', explanation: 'Left-hand limit = Right-hand limit = Value of function at the point.' }
        ]
      },
      {
        id: '6.3',
        topicNumber: '6.3',
        title: 'Differentiability',
        formulas: [
          { id: 'diff-def', name: 'First Principle Derivative', math: 'f\'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}' }
        ]
      }
    ]
  },

  // CHAPTER 7
  {
    id: 'ch7',
    chapterNumber: 7,
    title: 'Differentiation',
    description: 'Power, exponential, trigonometric, inverse trig, chain rule, and partial derivatives.',
    badge: 'Differential Calculus',
    color: 'cyan',
    topics: [
      {
        id: '7.1',
        topicNumber: '7.1',
        title: 'Basic Differentiation Rules',
        formulas: [
          { id: 'd-c', name: 'Derivative of Constant', math: '\\frac{d}{dx}(c) = 0' },
          { id: 'd-x', name: 'Derivative of x', math: '\\frac{d}{dx}(x) = 1' },
          { id: 'd-xn', name: 'Power Rule', math: '\\frac{d}{dx}(x^n) = n x^{n-1}' },
          { id: 'd-invx', name: 'Derivative of 1/x', math: '\\frac{d}{dx}\\left(\\frac{1}{x}\\right) = -\\frac{1}{x^2}' },
          { id: 'd-sqrtx', name: 'Derivative of √x', math: '\\frac{d}{dx}(\\sqrt{x}) = \\frac{1}{2\\sqrt{x}}' },
          { id: 'd-ex', name: 'Natural Exponential Derivative', math: '\\frac{d}{dx}(e^x) = e^x' },
          { id: 'd-ax', name: 'General Exponential Derivative', math: '\\frac{d}{dx}(a^x) = a^x \\ln a' },
          { id: 'd-lnx', name: 'Natural Log Derivative', math: '\\frac{d}{dx}(\\ln x) = \\frac{1}{x}' },
          { id: 'd-logax', name: 'Base-a Log Derivative', math: '\\frac{d}{dx}(\\log_a x) = \\frac{1}{x \\ln a}' }
        ]
      },
      {
        id: '7.2',
        topicNumber: '7.2',
        title: 'Trigonometric Differentiation',
        formulas: [
          { id: 'd-sin', name: 'd/dx (sin x)', math: '\\frac{d}{dx}(\\sin x) = \\cos x' },
          { id: 'd-cos', name: 'd/dx (cos x)', math: '\\frac{d}{dx}(\\cos x) = -\\sin x' },
          { id: 'd-tan', name: 'd/dx (tan x)', math: '\\frac{d}{dx}(\\tan x) = \\sec^2 x' },
          { id: 'd-cot', name: 'd/dx (cot x)', math: '\\frac{d}{dx}(\\cot x) = -\\csc^2 x' },
          { id: 'd-sec', name: 'd/dx (sec x)', math: '\\frac{d}{dx}(\\sec x) = \\sec x \\tan x' },
          { id: 'd-csc', name: 'd/dx (csc x)', math: '\\frac{d}{dx}(\\csc x) = -\\csc x \\cot x' }
        ]
      },
      {
        id: '7.3',
        topicNumber: '7.3',
        title: 'Inverse Trigonometric Differentiation',
        formulas: [
          { id: 'd-asin', name: 'd/dx (arcsin x)', math: '\\frac{d}{dx}(\\sin^{-1} x) = \\frac{1}{\\sqrt{1 - x^2}}' },
          { id: 'd-acos', name: 'd/dx (arccos x)', math: '\\frac{d}{dx}(\\cos^{-1} x) = -\\frac{1}{\\sqrt{1 - x^2}}' },
          { id: 'd-atan', name: 'd/dx (arctan x)', math: '\\frac{d}{dx}(\\tan^{-1} x) = \\frac{1}{1 + x^2}' },
          { id: 'd-acot', name: 'd/dx (arccot x)', math: '\\frac{d}{dx}(\\cot^{-1} x) = -\\frac{1}{1 + x^2}' },
          { id: 'd-asec', name: 'd/dx (arcsec x)', math: '\\frac{d}{dx}(\\sec^{-1} x) = \\frac{1}{|x|\\sqrt{x^2 - 1}}' },
          { id: 'd-acsc', name: 'd/dx (arccsc x)', math: '\\frac{d}{dx}(\\csc^{-1} x) = -\\frac{1}{|x|\\sqrt{x^2 - 1}}' }
        ]
      },
      {
        id: '7.4',
        topicNumber: '7.4',
        title: 'Differentiation Rules',
        formulas: [
          { id: 'rule-sum', name: 'Sum Rule', math: '\\frac{d}{dx}(u + v) = u\' + v\'' },
          { id: 'rule-prod', name: 'Product Rule (Leibniz)', math: '\\frac{d}{dx}(uv) = u\' v + u v\'' },
          { id: 'rule-quot', name: 'Quotient Rule', math: '\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v u\' - u v\'}{v^2}' },
          { id: 'rule-chain', name: 'Chain Rule', math: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}' }
        ]
      },
      {
        id: '7.5',
        topicNumber: '7.5',
        title: 'Logarithmic Differentiation',
        formulas: [
          { id: 'log-diff', name: 'Power Function Differentiation y = u^v', math: 'y = u^v \\implies \\ln y = v \\ln u \\implies \\frac{y\'}{y} = v\' \\ln u + v\\left(\\frac{u\'}{u}\\right)' }
        ]
      },
      {
        id: '7.6',
        topicNumber: '7.6',
        title: 'Parametric Differentiation',
        formulas: [
          { id: 'param-diff', name: 'First Derivative of Parametric Curves', math: '\\text{If } x = f(t), y = g(t) \\implies \\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}' }
        ]
      },
      {
        id: '7.7',
        topicNumber: '7.7',
        title: 'Second Derivative',
        formulas: [
          { id: 'd2-def', name: 'Second Order Derivative', math: '\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)' }
        ]
      },
      {
        id: '7.8',
        topicNumber: '7.8',
        title: 'Partial Differentiation',
        formulas: [
          { id: 'pdiff-def', name: 'Partial Derivative Definition', math: '\\frac{\\partial z}{\\partial x} = \\lim_{\\Delta x \\to 0} \\frac{f(x+\\Delta x, y) - f(x,y)}{\\Delta x} \\quad [y \\text{ held constant}]' }
        ]
      },
      {
        id: '7.9',
        topicNumber: '7.9',
        title: 'Euler\'s Theorem for Homogeneous Functions',
        formulas: [
          { id: 'euler-homo', name: 'Euler\'s Homogeneous Theorem', math: 'x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u \\quad [\\text{Degree } n]' }
        ]
      }
    ]
  },

  // CHAPTER 8
  {
    id: 'ch8',
    chapterNumber: 8,
    title: 'Applications of Differentiation',
    description: 'Tangents, normals, monotonicity, extrema, curvature, Rolle\'s and LMVT.',
    badge: 'Applied Calculus',
    color: 'violet',
    topics: [
      {
        id: '8.1',
        topicNumber: '8.1',
        title: 'Tangent and Normal',
        formulas: [
          { id: 'tan-slp', name: 'Slope of Tangent', math: 'm_T = \\left.\\frac{dy}{dx}\\right|_{(x_1, y_1)}' },
          { id: 'norm-slp', name: 'Slope of Normal', math: 'm_N = -\\frac{1}{dy/dx}' },
          { id: 'tan-eq', name: 'Equation of Tangent Line', math: 'y - y_1 = m_T(x - x_1)' },
          { id: 'norm-eq', name: 'Equation of Normal Line', math: 'y - y_1 = -\\frac{1}{m_T}(x - x_1)' }
        ]
      },
      {
        id: '8.2',
        topicNumber: '8.2',
        title: 'Increasing and Decreasing Functions',
        formulas: [
          { id: 'inc-dec', name: 'Monotonicity Test', math: 'f\'(x) > 0 \\implies \\text{Increasing}; \\quad f\'(x) < 0 \\implies \\text{Decreasing}' }
        ]
      },
      {
        id: '8.3',
        topicNumber: '8.3',
        title: 'Maxima and Minima (Extrema)',
        formulas: [
          { id: 'crit-pt', name: 'Critical Points Condition', math: 'f\'(x) = 0' },
          { id: 'sec-der-test', name: 'Second Derivative Test', math: 'f\'\'(x) < 0 \\implies \\text{Local Max}; \\quad f\'\'(x) > 0 \\implies \\text{Local Min}; \\quad f\'\'(x) = 0 \\implies \\text{Inconclusive}' }
        ]
      },
      {
        id: '8.4',
        topicNumber: '8.4',
        title: 'Radius of Curvature',
        formulas: [
          { id: 'rad-curv', name: 'Radius of Curvature (ρ)', math: '\\rho = \\frac{\\left[1 + \\left(\\frac{dy}{dx}\\right)^2\\right]^{3/2}}{\\left|\\frac{d^2y}{dx^2}\\right|}' }
        ]
      },
      {
        id: '8.5',
        topicNumber: '8.5',
        title: 'Rolle\'s Theorem',
        formulas: [
          { id: 'rolle-thm', name: 'Rolle\'s Mean Value Theorem', math: '\\text{If } f(a) = f(b) \\implies \\exists c \\in (a,b) \\text{ such that } f\'(c) = 0' }
        ]
      },
      {
        id: '8.6',
        topicNumber: '8.6',
        title: 'Lagrange Mean Value Theorem (LMVT)',
        formulas: [
          { id: 'lmvt-thm', name: 'Lagrange Mean Value Theorem', math: 'f\'(c) = \\frac{f(b) - f(a)}{b - a} \\quad \\text{for some } c \\in (a,b)' }
        ]
      }
    ]
  },

  // CHAPTER 9
  {
    id: 'ch9',
    chapterNumber: 9,
    title: 'Integration',
    description: 'Standard integrals, trigonometric, by parts, substitution, and definite integrals.',
    badge: 'Integral Calculus',
    color: 'emerald',
    topics: [
      {
        id: '9.1',
        topicNumber: '9.1',
        title: 'Basic Integration Formulas',
        formulas: [
          { id: 'int-dx', name: 'Integral of dx', math: '\\int dx = x + C' },
          { id: 'int-xn', name: 'Power Rule of Integration', math: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)' },
          { id: 'int-1x', name: 'Integral of 1/x', math: '\\int \\frac{1}{x} dx = \\ln|x| + C' },
          { id: 'int-ex', name: 'Exponential Integral', math: '\\int e^x dx = e^x + C' },
          { id: 'int-ax', name: 'General Exponential Integral', math: '\\int a^x dx = \\frac{a^x}{\\ln a} + C' },
          { id: 'int-lnx', name: 'Integral of ln x', math: '\\int \\ln x dx = x \\ln x - x + C' }
        ]
      },
      {
        id: '9.2',
        topicNumber: '9.2',
        title: 'Trigonometric Integration',
        formulas: [
          { id: 'int-sin', name: '∫ sin x dx', math: '\\int \\sin x dx = -\\cos x + C' },
          { id: 'int-cos', name: '∫ cos x dx', math: '\\int \\cos x dx = \\sin x + C' },
          { id: 'int-sec2', name: '∫ sec² x dx', math: '\\int \\sec^2 x dx = \\tan x + C' },
          { id: 'int-csc2', name: '∫ csc² x dx', math: '\\int \\csc^2 x dx = -\\cot x + C' },
          { id: 'int-sectan', name: '∫ sec x tan x dx', math: '\\int \\sec x \\tan x dx = \\sec x + C' },
          { id: 'int-csccot', name: '∫ csc x cot x dx', math: '\\int \\csc x \\cot x dx = -\\csc x + C' },
          { id: 'int-tan', name: '∫ tan x dx', math: '\\int \\tan x dx = -\\ln|\\cos x| + C = \\ln|\\sec x| + C' },
          { id: 'int-cot', name: '∫ cot x dx', math: '\\int \\cot x dx = \\ln|\\sin x| + C' },
          { id: 'int-sec', name: '∫ sec x dx', math: '\\int \\sec x dx = \\ln|\\sec x + \\tan x| + C' },
          { id: 'int-csc', name: '∫ csc x dx', math: '\\int \\csc x dx = \\ln|\\csc x - \\cot x| + C' }
        ]
      },
      {
        id: '9.3',
        topicNumber: '9.3',
        title: 'Standard Integration Formulas',
        formulas: [
          { id: 'st-int1', name: '∫ dx/√(a² - x²)', math: '\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\left(\\frac{x}{a}\\right) + C' },
          { id: 'st-int2', name: '∫ dx/(a² + x²)', math: '\\int \\frac{dx}{a^2 + x^2} = \\frac{1}{a} \\tan^{-1}\\left(\\frac{x}{a}\\right) + C' },
          { id: 'st-int3', name: '∫ dx/√(x² - a²)', math: '\\int \\frac{dx}{\\sqrt{x^2 - a^2}} = \\ln|x + \\sqrt{x^2 - a^2}| + C' },
          { id: 'st-int4', name: '∫ dx/(x² - a²)', math: '\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a} \\ln\\left|\\frac{x-a}{x+a}\\right| + C' },
          { id: 'st-int5', name: '∫ dx/(a² - x²)', math: '\\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a} \\ln\\left|\\frac{a+x}{a-x}\\right| + C' }
        ]
      },
      {
        id: '9.4',
        topicNumber: '9.4',
        title: 'Integration by Parts',
        formulas: [
          { id: 'ibp-form', name: 'Integration by Parts (ILATE)', math: '\\int u \\, dv = u v - \\int v \\, du' }
        ]
      },
      {
        id: '9.5',
        topicNumber: '9.5',
        title: 'Substitution Method',
        formulas: [
          { id: 'sub-form', name: 'u-Substitution', math: '\\int f(g(x)) g\'(x) dx = \\int f(u) du \\quad [\\text{where } u = g(x)]' }
        ]
      },
      {
        id: '9.6',
        topicNumber: '9.6',
        title: 'Definite Integration',
        formulas: [
          { id: 'ftc-form', name: 'Fundamental Theorem of Calculus', math: '\\int_a^b f(x) dx = F(b) - F(a) \\quad [F\'(x) = f(x)]' }
        ]
      },
      {
        id: '9.7',
        topicNumber: '9.7',
        title: 'Properties of Definite Integration',
        formulas: [
          { id: 'prop-rev', name: 'Limit Reversal', math: '\\int_a^b f(x) dx = -\\int_b^a f(x) dx' },
          { id: 'prop-split', name: 'Interval Splitting', math: '\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx' },
          { id: 'prop-king', name: 'King\'s Property', math: '\\int_0^a f(x) dx = \\int_0^a f(a-x) dx' },
          { id: 'prop-even', name: 'Even Function Symmetry', math: '\\int_{-a}^a f(x) dx = 2\\int_0^a f(x) dx \\quad [f(-x) = f(x)]' },
          { id: 'prop-odd', name: 'Odd Function Symmetry', math: '\\int_{-a}^a f(x) dx = 0 \\quad [f(-x) = -f(x)]' }
        ]
      },
      {
        id: '9.8',
        topicNumber: '9.8',
        title: 'Trigonometric Substitution',
        formulas: [
          { id: 'trig-sub1', name: 'Form √(a² - x²)', math: '\\text{Substitute } x = a \\sin \\theta \\implies dx = a \\cos \\theta \\, d\\theta' },
          { id: 'trig-sub2', name: 'Form √(a² + x²)', math: '\\text{Substitute } x = a \\tan \\theta \\implies dx = a \\sec^2 \\theta \\, d\\theta' },
          { id: 'trig-sub3', name: 'Form √(x² - a²)', math: '\\text{Substitute } x = a \\sec \\theta \\implies dx = a \\sec \\theta \\tan \\theta \\, d\\theta' }
        ]
      }
    ]
  },

  // CHAPTER 10
  {
    id: 'ch10',
    chapterNumber: 10,
    title: 'Applications of Integration',
    description: 'Planar area, area between curves, volume of revolution, and arc length.',
    badge: 'Applied Calculus',
    color: 'cyan',
    topics: [
      {
        id: '10.1',
        topicNumber: '10.1',
        title: 'Area Under a Curve',
        formulas: [
          { id: 'area-curve', name: 'Area to x-Axis', math: '\\text{Area} = \\int_a^b y \\, dx' }
        ]
      },
      {
        id: '10.2',
        topicNumber: '10.2',
        title: 'Area Between Two Curves',
        formulas: [
          { id: 'area-2curves', name: 'Enclosed Area', math: '\\text{Area} = \\int_a^b [y_{\\text{upper}} - y_{\\text{lower}}] \\, dx' }
        ]
      },
      {
        id: '10.3',
        topicNumber: '10.3',
        title: 'Volume of Revolution',
        formulas: [
          { id: 'vol-disk', name: 'Disk Method (about x-axis)', math: 'V = \\pi \\int_a^b y^2 \\, dx' },
          { id: 'vol-washer', name: 'Washer Method', math: 'V = \\pi \\int_a^b (R^2 - r^2) \\, dx' }
        ]
      },
      {
        id: '10.4',
        topicNumber: '10.4',
        title: 'Arc Length',
        formulas: [
          { id: 'arc-len', name: 'Curve Arc Length', math: 'L = \\int_a^b \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} \\, dx' }
        ]
      },
      {
        id: '10.5',
        topicNumber: '10.5',
        title: 'Surface Area of Revolution',
        formulas: [
          { id: 'surf-rev', name: 'Revolution Surface Area (about x-axis)', math: 'S = 2\\pi \\int_a^b y \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} \\, dx' }
        ]
      }
    ]
  },

  // CHAPTER 11
  {
    id: 'ch11',
    chapterNumber: 11,
    title: 'Differential Equations',
    description: 'Order and degree, separable, linear first-order, homogeneous, and second-order ODEs.',
    badge: 'Engineering ODE',
    color: 'rose',
    topics: [
      {
        id: '11.1',
        topicNumber: '11.1',
        title: 'Order and Degree',
        formulas: [
          { id: 'ode-od', name: 'Definitions', math: '\\text{Order} = \\text{Highest derivative}; \\quad \\text{Degree} = \\text{Power of highest derivative after clearing radicals}' }
        ]
      },
      {
        id: '11.2',
        topicNumber: '11.2',
        title: 'Variable Separable Equation',
        formulas: [
          { id: 'ode-sep', name: 'Separation of Variables', math: '\\frac{dy}{dx} = f(x)g(y) \\implies \\frac{dy}{g(y)} = f(x)dx \\implies \\int \\frac{dy}{g(y)} = \\int f(x)dx + C' }
        ]
      },
      {
        id: '11.3',
        topicNumber: '11.3',
        title: 'First Order Linear Differential Equation',
        formulas: [
          { id: 'ode-lin-std', name: 'Standard Form', math: '\\frac{dy}{dx} + P(x) y = Q(x)' },
          { id: 'ode-lin-if', name: 'Integrating Factor (IF)', math: '\\text{IF} = e^{\\int P(x) dx}' },
          { id: 'ode-lin-sol', name: 'General Solution', math: 'y \\cdot (\\text{IF}) = \\int Q(x) \\cdot (\\text{IF}) \\, dx + C' }
        ]
      },
      {
        id: '11.4',
        topicNumber: '11.4',
        title: 'Homogeneous Differential Equation',
        formulas: [
          { id: 'ode-homo', name: 'Substitution y = vx', math: '\\frac{dy}{dx} = F\\left(\\frac{y}{x}\\right) \\implies \\text{Put } y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}' }
        ]
      },
      {
        id: '11.5',
        topicNumber: '11.5',
        title: 'Second Order Linear ODE with Constant Coefficients',
        formulas: [
          { id: 'ode-2nd-std', name: 'Homogeneous Form', math: 'a \\frac{d^2y}{dx^2} + b \\frac{dy}{dx} + c y = 0' },
          { id: 'ode-2nd-aux', name: 'Auxiliary (Characteristic) Equation', math: 'a m^2 + b m + c = 0' },
          { id: 'ode-2nd-r1', name: 'Case 1: Distinct Real Roots (m₁, m₂)', math: 'y = C_1 e^{m_1 x} + C_2 e^{m_2 x}' },
          { id: 'ode-2nd-r2', name: 'Case 2: Repeated Real Roots (m)', math: 'y = (C_1 + C_2 x) e^{m x}' },
          { id: 'ode-2nd-r3', name: 'Case 3: Complex Conjugate Roots (α ± iβ)', math: 'y = e^{\\alpha x} [C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x)]' }
        ]
      }
    ]
  },

  // CHAPTER 12
  {
    id: 'ch12',
    chapterNumber: 12,
    title: 'Vector Algebra',
    description: 'Magnitude, unit vectors, dot product, cross product, triple products, and projection.',
    badge: 'Vectors',
    color: 'amber',
    topics: [
      {
        id: '12.1',
        topicNumber: '12.1',
        title: 'Vector Magnitude',
        formulas: [
          { id: 'vec-mag', name: 'Magnitude in 3D', math: '|\\vec{A}| = \\sqrt{A_x^2 + A_y^2 + A_z^2}' }
        ]
      },
      {
        id: '12.2',
        topicNumber: '12.2',
        title: 'Unit Vector',
        formulas: [
          { id: 'vec-unit', name: 'Unit Vector Definition', math: '\\hat{a} = \\frac{\\vec{A}}{|\\vec{A}|}' }
        ]
      },
      {
        id: '12.3',
        topicNumber: '12.3',
        title: 'Dot (Scalar) Product',
        formulas: [
          { id: 'vec-dot1', name: 'Geometric Dot Product', math: '\\vec{A} \\cdot \\vec{B} = |\\vec{A}| |\\vec{B}| \\cos \\theta' },
          { id: 'vec-dot2', name: 'Component Dot Product', math: '\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z' }
        ]
      },
      {
        id: '12.4',
        topicNumber: '12.4',
        title: 'Cross (Vector) Product',
        formulas: [
          { id: 'vec-cross1', name: 'Cross Product Magnitude', math: '|\\vec{A} \\times \\vec{B}| = |\\vec{A}| |\\vec{B}| \\sin \\theta' },
          { id: 'vec-cross2', name: 'Determinant Formulation', math: '\\vec{A} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}' }
        ]
      },
      {
        id: '12.5',
        topicNumber: '12.5',
        title: 'Scalar Triple Product (Box Product)',
        formulas: [
          { id: 'vec-stp', name: 'Volume of Parallelepiped', math: '[\\vec{A} \\, \\vec{B} \\, \\vec{C}] = \\vec{A} \\cdot (\\vec{B} \\times \\vec{C}) = \\begin{vmatrix} A_x & A_y & A_z \\\\ B_x & B_y & B_z \\\\ C_x & C_y & C_z \\end{vmatrix}' }
        ]
      },
      {
        id: '12.6',
        topicNumber: '12.6',
        title: 'Vector Triple Product',
        formulas: [
          { id: 'vec-vtp', name: 'BAC-CAB Expansion', math: '\\vec{A} \\times (\\vec{B} \\times \\vec{C}) = \\vec{B}(\\vec{A} \\cdot \\vec{C}) - \\vec{C}(\\vec{A} \\cdot \\vec{B})' }
        ]
      },
      {
        id: '12.7',
        topicNumber: '12.7',
        title: 'Projection',
        formulas: [
          { id: 'vec-proj-scal', name: 'Scalar Projection of A on B', math: '\\text{proj}_{\\vec{B}}(\\vec{A}) = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{B}|}' },
          { id: 'vec-proj-vec', name: 'Vector Projection of A on B', math: '\\vec{P} = \\left[ \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{B}|^2} \\right] \\vec{B}' }
        ]
      }
    ]
  },

  // CHAPTER 13
  {
    id: 'ch13',
    chapterNumber: 13,
    title: 'Three-Dimensional Geometry',
    description: '3D distance, direction cosines, plane equations, and straight line equations.',
    badge: '3D Geometry',
    color: 'violet',
    topics: [
      {
        id: '13.1',
        topicNumber: '13.1',
        title: 'Distance Between Two Points',
        formulas: [
          { id: '3d-dist', name: '3D Distance Formula', math: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}' }
        ]
      },
      {
        id: '13.2',
        topicNumber: '13.2',
        title: 'Direction Cosines',
        formulas: [
          { id: '3d-dc', name: 'Fundamental Relation', math: 'l^2 + m^2 + n^2 = 1 \\quad (l = \\cos \\alpha, m = \\cos \\beta, n = \\cos \\gamma)' }
        ]
      },
      {
        id: '13.3',
        topicNumber: '13.3',
        title: 'Equation of a Plane',
        formulas: [
          { id: '3d-plane', name: 'General Cartesian Plane', math: 'a x + b y + c z + d = 0' }
        ]
      },
      {
        id: '13.4',
        topicNumber: '13.4',
        title: 'Distance of a Point from a Plane',
        formulas: [
          { id: '3d-pt-plane', name: 'Perpendicular Distance (D)', math: 'D = \\frac{|a x_1 + b y_1 + c z_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}' }
        ]
      },
      {
        id: '13.5',
        topicNumber: '13.5',
        title: 'Equation of a Straight Line in 3D',
        formulas: [
          { id: '3d-line', name: 'Symmetric (Canonical) Form', math: '\\frac{x - x_1}{l} = \\frac{y - y_1}{m} = \\frac{z - z_1}{n}' }
        ]
      }
    ]
  },

  // CHAPTER 14
  {
    id: 'ch14',
    chapterNumber: 14,
    title: 'Probability and Statistics',
    description: 'Probability theorems, conditional probability, Bayes\' theorem, and distributions.',
    badge: 'Statistics',
    color: 'emerald',
    topics: [
      {
        id: '14.1',
        topicNumber: '14.1',
        title: 'Classical Probability',
        formulas: [
          { id: 'prob-def', name: 'Probability Definition', math: 'P(A) = \\frac{n(A)}{n(S)} \\quad (0 \\le P(A) \\le 1)' },
          { id: 'prob-comp', name: 'Complementary Event', math: 'P(A\') = 1 - P(A)' }
        ]
      },
      {
        id: '14.2',
        topicNumber: '14.2',
        title: 'Addition Theorem',
        formulas: [
          { id: 'prob-add-gen', name: 'General Union Rule', math: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)' },
          { id: 'prob-add-mut', name: 'Mutually Exclusive Events', math: 'P(A \\cup B) = P(A) + P(B) \\quad [A \\cap B = \\emptyset]' }
        ]
      },
      {
        id: '14.3',
        topicNumber: '14.3',
        title: 'Multiplication Theorem',
        formulas: [
          { id: 'prob-mult-dep', name: 'Dependent Events', math: 'P(A \\cap B) = P(A) P(B|A)' },
          { id: 'prob-mult-ind', name: 'Independent Events', math: 'P(A \\cap B) = P(A) P(B)' }
        ]
      },
      {
        id: '14.4',
        topicNumber: '14.4',
        title: 'Conditional Probability',
        formulas: [
          { id: 'prob-cond', name: 'Conditional Probability Rule', math: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad [P(B) > 0]' }
        ]
      },
      {
        id: '14.5',
        topicNumber: '14.5',
        title: 'Bayes\' Theorem',
        formulas: [
          { id: 'bayes-thm', name: 'Bayes\' Formula for Posterior Probability', math: 'P(A_i|B) = \\frac{P(B|A_i) P(A_i)}{\\sum_{j=1}^k P(B|A_j) P(A_j)}' }
        ]
      },
      {
        id: '14.6',
        topicNumber: '14.6',
        title: 'Mean',
        formulas: [
          { id: 'stat-mean', name: 'Arithmetic Mean (μ)', math: '\\mu = \\frac{\\sum x_i}{n}' }
        ]
      },
      {
        id: '14.7',
        topicNumber: '14.7',
        title: 'Variance',
        formulas: [
          { id: 'stat-var', name: 'Population Variance (σ²)', math: '\\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{n}' }
        ]
      },
      {
        id: '14.8',
        topicNumber: '14.8',
        title: 'Standard Deviation',
        formulas: [
          { id: 'stat-sd', name: 'Standard Deviation (σ)', math: '\\text{SD} = \\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\frac{\\sum (x_i - \\mu)^2}{n}}' }
        ]
      },
      {
        id: '14.9',
        topicNumber: '14.9',
        title: 'Binomial Distribution',
        formulas: [
          { id: 'dist-bin-pmf', name: 'Binomial Probability Mass Function', math: 'P(X = r) = \\binom{n}{r} p^r q^{n-r} \\quad (p + q = 1)' },
          { id: 'dist-bin-mv', name: 'Mean and Variance', math: '\\text{Mean} = np, \\quad \\text{Variance} = npq' }
        ]
      },
      {
        id: '14.10',
        topicNumber: '14.10',
        title: 'Poisson Distribution',
        formulas: [
          { id: 'dist-poi-pmf', name: 'Poisson Probability Mass Function', math: 'P(X = r) = \\frac{e^{-\\lambda} \\lambda^r}{r!}' },
          { id: 'dist-poi-mv', name: 'Mean and Variance', math: '\\text{Mean} = \\lambda, \\quad \\text{Variance} = \\lambda' }
        ]
      },
      {
        id: '14.11',
        topicNumber: '14.11',
        title: 'Normal (Gaussian) Distribution',
        formulas: [
          { id: 'dist-norm-pdf', name: 'Normal Probability Density Function', math: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}' },
          { id: 'dist-norm-mv', name: 'Parameters', math: '\\text{Mean} = \\mu, \\quad \\text{Variance} = \\sigma^2' }
        ]
      }
    ]
  },

  // CHAPTER 15
  {
    id: 'ch15',
    chapterNumber: 15,
    title: 'Complex Numbers',
    description: 'Cartesian and polar forms, modulus, conjugate, Euler\'s formula, and De Moivre.',
    badge: 'Complex Analysis',
    color: 'cyan',
    topics: [
      {
        id: '15.1',
        topicNumber: '15.1',
        title: 'Basic Form',
        formulas: [
          { id: 'cpx-basic', name: 'Algebraic Form', math: 'z = a + ib \\quad (i^2 = -1, \\; \\text{Re}(z) = a, \\; \\text{Im}(z) = b)' }
        ]
      },
      {
        id: '15.2',
        topicNumber: '15.2',
        title: 'Modulus',
        formulas: [
          { id: 'cpx-mod', name: 'Modulus |z|', math: '|z| = \\sqrt{a^2 + b^2}' }
        ]
      },
      {
        id: '15.3',
        topicNumber: '15.3',
        title: 'Conjugate',
        formulas: [
          { id: 'cpx-conj', name: 'Complex Conjugate (z̄)', math: '\\bar{z} = a - ib, \\quad z \\times \\bar{z} = |z|^2 = a^2 + b^2' }
        ]
      },
      {
        id: '15.4',
        topicNumber: '15.4',
        title: 'Polar Form',
        formulas: [
          { id: 'cpx-polar', name: 'Trigonometric Polar Form', math: 'z = r(\\cos \\theta + i \\sin \\theta) \\quad [r = \\sqrt{a^2+b^2}, \\; \\theta = \\tan^{-1}(b/a)]' }
        ]
      },
      {
        id: '15.5',
        topicNumber: '15.5',
        title: 'Euler\'s Formula',
        formulas: [
          { id: 'cpx-euler', name: 'Euler\'s Identity', math: 'e^{i\\theta} = \\cos \\theta + i \\sin \\theta \\implies z = r e^{i\\theta}' }
        ]
      },
      {
        id: '15.6',
        topicNumber: '15.6',
        title: 'De Moivre\'s Theorem',
        formulas: [
          { id: 'cpx-demoivre', name: 'De Moivre\'s Formula', math: '(\\cos \\theta + i \\sin \\theta)^n = \\cos(n\\theta) + i \\sin(n\\theta)' }
        ]
      }
    ]
  },

  // CHAPTER 16
  {
    id: 'ch16',
    chapterNumber: 16,
    title: 'Sequences and Series',
    description: 'Sum of powers of natural numbers, odd, even, and harmonic sequences.',
    badge: 'Series',
    color: 'rose',
    topics: [
      {
        id: '16.1',
        topicNumber: '16.1',
        title: 'Sum of First n Natural Numbers',
        formulas: [
          { id: 'seq-n', name: 'Sum of Natural Numbers (Σn)', math: '\\sum_{k=1}^n k = 1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2}' }
        ]
      },
      {
        id: '16.2',
        topicNumber: '16.2',
        title: 'Sum of Squares (Σn²)',
        formulas: [
          { id: 'seq-n2', name: 'Sum of Squares', math: '\\sum_{k=1}^n k^2 = 1^2 + 2^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}' }
        ]
      },
      {
        id: '16.3',
        topicNumber: '16.3',
        title: 'Sum of Cubes (Σn³)',
        formulas: [
          { id: 'seq-n3', name: 'Sum of Cubes', math: '\\sum_{k=1}^n k^3 = 1^3 + 2^3 + \\dots + n^3 = \\left[ \\frac{n(n+1)}{2} \\right]^2' }
        ]
      },
      {
        id: '16.4',
        topicNumber: '16.4',
        title: 'First n Odd Numbers',
        formulas: [
          { id: 'seq-odd', name: 'Sum of Odd Integers', math: '1 + 3 + 5 + \\dots + (2n-1) = n^2' }
        ]
      },
      {
        id: '16.5',
        topicNumber: '16.5',
        title: 'First n Even Numbers',
        formulas: [
          { id: 'seq-even', name: 'Sum of Even Integers', math: '2 + 4 + 6 + \\dots + 2n = n(n+1)' }
        ]
      },
      {
        id: '16.6',
        topicNumber: '16.6',
        title: 'Harmonic Series',
        formulas: [
          { id: 'seq-harm', name: 'Harmonic Sum (Hₙ)', math: 'H_n = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots + \\frac{1}{n} = \\sum_{k=1}^n \\frac{1}{k}' }
        ]
      }
    ]
  },

  // CHAPTER 17
  {
    id: 'ch17',
    chapterNumber: 17,
    title: 'Laplace Transforms',
    description: 'Integral definition, standard transforms, derivative properties, and inverse Laplace.',
    badge: 'Engineering Transforms',
    color: 'violet',
    topics: [
      {
        id: '17.1',
        topicNumber: '17.1',
        title: 'Definition of Laplace Transform',
        formulas: [
          { id: 'lap-def', name: 'Integral Definition', math: '\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^\\infty e^{-st} f(t) \\, dt' }
        ]
      },
      {
        id: '17.2',
        topicNumber: '17.2',
        title: 'Standard Laplace Transforms',
        formulas: [
          { id: 'lap-1', name: 'L{1}', math: '\\mathcal{L}\\{1\\} = \\frac{1}{s} \\quad (s > 0)' },
          { id: 'lap-t', name: 'L{t}', math: '\\mathcal{L}\\{t\\} = \\frac{1}{s^2}' },
          { id: 'lap-tn', name: 'L{t^n}', math: '\\mathcal{L}\\{t^n\\} = \\frac{n!}{s^{n+1}} \\quad (n \\in \\mathbb{N})' },
          { id: 'lap-eat', name: 'L{e^(at)}', math: '\\mathcal{L}\\{e^{at}\\} = \\frac{1}{s - a} \\quad (s > a)' },
          { id: 'lap-sin', name: 'L{sin(at)}', math: '\\mathcal{L}\\{\\sin(at)\\} = \\frac{a}{s^2 + a^2}' },
          { id: 'lap-cos', name: 'L{cos(at)}', math: '\\mathcal{L}\\{\\cos(at)\\} = \\frac{s}{s^2 + a^2}' },
          { id: 'lap-sinh', name: 'L{sinh(at)}', math: '\\mathcal{L}\\{\\sinh(at)\\} = \\frac{a}{s^2 - a^2}' },
          { id: 'lap-cosh', name: 'L{cosh(at)}', math: '\\mathcal{L}\\{\\cosh(at)\\} = \\frac{s}{s^2 - a^2}' },
          { id: 'lap-d1', name: 'Transform of First Derivative', math: '\\mathcal{L}\\{f\'(t)\\} = s F(s) - f(0)' },
          { id: 'lap-d2', name: 'Transform of Second Derivative', math: '\\mathcal{L}\\{f\'\'(t)\\} = s^2 F(s) - s f(0) - f\'(0)' },
          { id: 'lap-shift', name: 'First Shifting Theorem', math: '\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a)' }
        ]
      },
      {
        id: '17.3',
        topicNumber: '17.3',
        title: 'Inverse Laplace Transform',
        formulas: [
          { id: 'ilap-1s', name: 'L⁻¹{1/s}', math: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s}\\right\\} = 1' },
          { id: 'ilap-1s2', name: 'L⁻¹{1/s²}', math: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s^2}\\right\\} = t' },
          { id: 'ilap-eat', name: 'L⁻¹{1/(s-a)}', math: '\\mathcal{L}^{-1}\\left\\{\\frac{1}{s-a}\\right\\} = e^{at}' },
          { id: 'ilap-sin', name: 'L⁻¹{a/(s²+a²)}', math: '\\mathcal{L}^{-1}\\left\\{\\frac{a}{s^2+a^2}\\right\\} = \\sin(at)' },
          { id: 'ilap-cos', name: 'L⁻¹{s/(s²+a²)}', math: '\\mathcal{L}^{-1}\\left\\{\\frac{s}{s^2+a^2}\\right\\} = \\cos(at)' }
        ]
      }
    ]
  },

  // CHAPTER 18
  {
    id: 'ch18',
    chapterNumber: 18,
    title: 'Fourier Series',
    description: 'Trigonometric series representation, Euler-Fourier coefficients, even and odd functions.',
    badge: 'Engineering Transforms',
    color: 'emerald',
    topics: [
      {
        id: '18.1',
        topicNumber: '18.1',
        title: 'Fourier Series Representation',
        formulas: [
          { id: 'fs-series', name: 'Standard Fourier Expansion', math: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty [a_n \\cos(nx) + b_n \\sin(nx)] \\quad [x \\in (-\\pi, \\pi)]' }
        ]
      },
      {
        id: '18.2',
        topicNumber: '18.2',
        title: 'Fourier Coefficients',
        formulas: [
          { id: 'fs-a0', name: 'Constant Term a₀', math: 'a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^\\pi f(x) \\, dx' },
          { id: 'fs-an', name: 'Cosine Coefficient aₙ', math: 'a_n = \\frac{1}{\\pi} \\int_{-\\pi}^\\pi f(x) \\cos(nx) \\, dx' },
          { id: 'fs-bn', name: 'Sine Coefficient bₙ', math: 'b_n = \\frac{1}{\\pi} \\int_{-\\pi}^\\pi f(x) \\sin(nx) \\, dx' }
        ]
      },
      {
        id: '18.3',
        topicNumber: '18.3',
        title: 'Even Functions [f(-x) = f(x)]',
        formulas: [
          { id: 'fs-even', name: 'Even Function Simplification', math: 'b_n = 0, \\quad a_n = \\frac{2}{\\pi} \\int_0^\\pi f(x) \\cos(nx) \\, dx' }
        ]
      },
      {
        id: '18.4',
        topicNumber: '18.4',
        title: 'Odd Functions [f(-x) = -f(x)]',
        formulas: [
          { id: 'fs-odd', name: 'Odd Function Simplification', math: 'a_0 = 0, \\quad a_n = 0, \\quad b_n = \\frac{2}{\\pi} \\int_0^\\pi f(x) \\sin(nx) \\, dx' }
        ]
      }
    ]
  },

  // CHAPTER 19
  {
    id: 'ch19',
    chapterNumber: 19,
    title: 'Important Geometrical Formulas',
    description: '2D planar and 3D solid geometry area, perimeter, surface area, and volume formulas.',
    badge: 'Mensuration',
    color: 'amber',
    topics: [
      {
        id: '19.1',
        topicNumber: '19.1',
        title: 'Square',
        formulas: [
          { id: 'geo-sq-a', name: 'Area', math: '\\text{Area} = a^2' },
          { id: 'geo-sq-p', name: 'Perimeter', math: '\\text{Perimeter} = 4a' },
          { id: 'geo-sq-d', name: 'Diagonal', math: '\\text{Diagonal} = a\\sqrt{2}' }
        ]
      },
      {
        id: '19.2',
        topicNumber: '19.2',
        title: 'Rectangle',
        formulas: [
          { id: 'geo-rect-a', name: 'Area', math: '\\text{Area} = l \\times b' },
          { id: 'geo-rect-p', name: 'Perimeter', math: '\\text{Perimeter} = 2(l + b)' },
          { id: 'geo-rect-d', name: 'Diagonal', math: '\\text{Diagonal} = \\sqrt{l^2 + b^2}' }
        ]
      },
      {
        id: '19.3',
        topicNumber: '19.3',
        title: 'Triangle',
        formulas: [
          { id: 'geo-tri-a', name: 'Basic Area', math: '\\text{Area} = \\frac{1}{2} b h' },
          { id: 'geo-tri-h', name: 'Heron\'s Formula', math: '\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)} \\quad \\left[ s = \\frac{a+b+c}{2} \\right]' }
        ]
      },
      {
        id: '19.4',
        topicNumber: '19.4',
        title: 'Equilateral Triangle',
        formulas: [
          { id: 'geo-eq-a', name: 'Area', math: '\\text{Area} = \\frac{\\sqrt{3}}{4} a^2' },
          { id: 'geo-eq-h', name: 'Height', math: '\\text{Height} = \\frac{\\sqrt{3}}{2} a' }
        ]
      },
      {
        id: '19.5',
        topicNumber: '19.5',
        title: 'Circle',
        formulas: [
          { id: 'geo-cir-a', name: 'Area', math: '\\text{Area} = \\pi r^2' },
          { id: 'geo-cir-c', name: 'Circumference', math: '\\text{Circumference} = 2\\pi r' },
          { id: 'geo-cir-d', name: 'Diameter', math: '\\text{Diameter} = 2r' }
        ]
      },
      {
        id: '19.6',
        topicNumber: '19.6',
        title: 'Cylinder',
        formulas: [
          { id: 'geo-cyl-csa', name: 'Curved Surface Area (CSA)', math: '\\text{CSA} = 2\\pi r h' },
          { id: 'geo-cyl-tsa', name: 'Total Surface Area (TSA)', math: '\\text{TSA} = 2\\pi r(h + r)' },
          { id: 'geo-cyl-v', name: 'Volume', math: 'V = \\pi r^2 h' }
        ]
      },
      {
        id: '19.7',
        topicNumber: '19.7',
        title: 'Cone',
        formulas: [
          { id: 'geo-cone-l', name: 'Slant Height (l)', math: 'l = \\sqrt{r^2 + h^2}' },
          { id: 'geo-cone-csa', name: 'Curved Surface Area (CSA)', math: '\\text{CSA} = \\pi r l' },
          { id: 'geo-cone-tsa', name: 'Total Surface Area (TSA)', math: '\\text{TSA} = \\pi r(l + r)' },
          { id: 'geo-cone-v', name: 'Volume', math: 'V = \\frac{1}{3} \\pi r^2 h' }
        ]
      },
      {
        id: '19.8',
        topicNumber: '19.8',
        title: 'Sphere',
        formulas: [
          { id: 'geo-sph-sa', name: 'Surface Area', math: 'S = 4\\pi r^2' },
          { id: 'geo-sph-v', name: 'Volume', math: 'V = \\frac{4}{3} \\pi r^3' }
        ]
      },
      {
        id: '19.9',
        topicNumber: '19.9',
        title: 'Hemisphere',
        formulas: [
          { id: 'geo-hemi-csa', name: 'Curved Surface Area (CSA)', math: '\\text{CSA} = 2\\pi r^2' },
          { id: 'geo-hemi-tsa', name: 'Total Surface Area (TSA)', math: '\\text{TSA} = 3\\pi r^2' },
          { id: 'geo-hemi-v', name: 'Volume', math: 'V = \\frac{2}{3} \\pi r^3' }
        ]
      },
      {
        id: '19.10',
        topicNumber: '19.10',
        title: 'Cube',
        formulas: [
          { id: 'geo-cube-v', name: 'Volume', math: 'V = a^3' },
          { id: 'geo-cube-tsa', name: 'Total Surface Area', math: '\\text{TSA} = 6a^2' },
          { id: 'geo-cube-lsa', name: 'Lateral Surface Area', math: '\\text{LSA} = 4a^2' },
          { id: 'geo-cube-d', name: 'Space Diagonal', math: 'd = a\\sqrt{3}' }
        ]
      },
      {
        id: '19.11',
        topicNumber: '19.11',
        title: 'Cuboid',
        formulas: [
          { id: 'geo-cuboid-v', name: 'Volume', math: 'V = l \\times b \\times h' },
          { id: 'geo-cuboid-tsa', name: 'Total Surface Area', math: '\\text{TSA} = 2(lb + bh + hl)' },
          { id: 'geo-cuboid-d', name: 'Space Diagonal', math: 'd = \\sqrt{l^2 + b^2 + h^2}' }
        ]
      }
    ]
  },

  // CHAPTER 20
  {
    id: 'ch20',
    chapterNumber: 20,
    title: 'Important Mathematical Constants',
    description: 'Universal constants, logarithmic identities, and angular conversion rates.',
    badge: 'Constants & Units',
    color: 'cyan',
    topics: [
      {
        id: '20.1',
        topicNumber: '20.1',
        title: 'Universal Constants & Conversions',
        formulas: [
          { id: 'const-pi', name: 'Pi (π)', math: '\\pi \\approx 3.1415926535...' },
          { id: 'const-e', name: 'Euler\'s Number (e)', math: 'e \\approx 2.7182818284...' },
          { id: 'const-sqrt2', name: 'Square Root of 2 (√2)', math: '\\sqrt{2} \\approx 1.41421356...' },
          { id: 'const-sqrt3', name: 'Square Root of 3 (√3)', math: '\\sqrt{3} \\approx 1.73205080...' },
          { id: 'const-lne', name: 'Natural Log of Base (ln e)', math: '\\ln(e) = 1' },
          { id: 'const-log10', name: 'Common Log of 10 (log₁₀ 10)', math: '\\log_{10}(10) = 1' },
          { id: 'const-rad', name: '1 Radian in Degrees', math: '1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.2958^\\circ' },
          { id: 'const-deg', name: '1 Degree in Radians', math: '1^\\circ = \\frac{\\pi}{180^\\circ} \\text{ rad} \\approx 0.0174533 \\text{ rad}' }
        ]
      }
    ]
  }
];
