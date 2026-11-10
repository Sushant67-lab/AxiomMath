import { WordProblem } from '../types';

export const WORD_PROBLEMS_DATA: WordProblem[] = [
  // ==========================================
  // ALGEBRA WORD PROBLEMS (Textbook Style)
  // ==========================================
  {
    id: 'wp-alg-01',
    title: 'The High-Speed Railway Rendezvous',
    category: 'algebra',
    ageGroup: '12-15',
    gradeLevel: 'Grade 8-9 (Age 12-15)',
    textbookChapter: 'Chapter 3: Uniform Motion & Linear Systems',
    contextStory: 'Two magnetic levitation trains depart simultaneously from station Alpha and station Beta, located exactly 480 km apart along a direct high-speed line. Train Alpha travels east at a constant speed of 180 km/h, while Train Beta travels west at a constant speed of 140 km/h.',
    questionText: 'How many hours after departure will the two trains pass each other, and at what distance from station Alpha will this encounter take place?',
    givens: [
      { label: 'Total Distance (D)', value: '480 km' },
      { label: 'Speed of Train Alpha (v₁)', value: '180 km/h' },
      { label: 'Speed of Train Beta (v₂)', value: '140 km/h' },
      { label: 'Direction', value: 'Directly towards each other (Simultaneous departure)' }
    ],
    toFind: 'Time until meeting (t in hours) and distance from Station Alpha (d₁ in km).',
    primaryFormula: 'Distance = Speed × Time  |  d₁ + d₂ = D  =>  (v₁ + v₂) · t = D',
    hints: [
      'Since the trains move towards each other, their relative speed of approach is the SUM of their individual speeds: v_rel = v₁ + v₂.',
      'Substitute into the equation: (180 + 140) · t = 480.',
      'Solve for t, then calculate distance from Alpha using d₁ = v₁ · t.'
    ],
    options: [
      { id: 'opt-a', text: '1.5 hours, 270 km from Alpha', explanation: 'Correct! (180 + 140)t = 320t = 480 => t = 1.5 hrs. Distance = 180 × 1.5 = 270 km.' },
      { id: 'opt-b', text: '2.0 hours, 360 km from Alpha', explanation: 'Incorrect: 320 × 2 = 640 km, which exceeds the 480 km track length.' },
      { id: 'opt-c', text: '1.2 hours, 216 km from Alpha', explanation: 'Incorrect: this assumes an approach speed of 400 km/h.' },
      { id: 'opt-d', text: '1.8 hours, 324 km from Alpha', explanation: 'Incorrect: 1.8 × 320 = 576 km.' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Set up the linear distance equation',
        explanation: 'Let t be the elapsed time in hours until the trains meet. In time t, Train Alpha travels distance d₁ = 180 · t, and Train Beta travels d₂ = 140 · t.',
        math: 'd_1 + d_2 = D_{total}'
      },
      {
        step: 'Step 2: Combine terms and solve for t',
        explanation: 'Add the two distances together to equal the full separation distance of 480 kilometers.',
        math: '180t + 140t = 480 \\implies 320t = 480 \\implies t = \\frac{480}{320} = 1.5\\text{ hours}'
      },
      {
        step: 'Step 3: Determine the meeting position relative to Alpha',
        explanation: 'Multiply Train Alpha\'s speed by the calculated time to find where the encounter occurs along the track.',
        math: 'd_1 = 180 \\times 1.5 = 270\\text{ km from Station Alpha}'
      }
    ],
    practicalApplication: 'Air traffic control and train dispatcher algorithms use this exact linear intersection formula to calculate safe routing schedules and avoid collisions.'
  },
  {
    id: 'wp-alg-02',
    title: 'Hydro-Engineering Reservoir Inflow',
    category: 'algebra',
    ageGroup: '12-15',
    gradeLevel: 'Grade 9-10 (Age 14-16)',
    textbookChapter: 'Chapter 5: Rational Equations & Rate of Work',
    contextStory: 'A municipal water reserve has two inlet conduits. Inflow Pipe A can fill the empty reservoir completely in 6 hours when operating alone. Due to a modern pump upgrade, Pipe B can fill the same reservoir in 4 hours on its own. A maintenance drain valve, if accidentally left open, would empty the full tank in 12 hours.',
    questionText: 'If both inlet pipes are turned on while the maintenance drain valve is inadvertently left open, how many hours will it take to fill the reservoir completely?',
    givens: [
      { label: 'Pipe A filling time (t_A)', value: '6 hours' },
      { label: 'Pipe B filling time (t_B)', value: '4 hours' },
      { label: 'Drain emptying time (t_D)', value: '12 hours' }
    ],
    toFind: 'Net time T (hours) required to fill 1 whole reservoir tank.',
    primaryFormula: 'Net Rate = (1 / t_A) + (1 / t_B) - (1 / t_D) = 1 / T',
    hints: [
      'Express each conduit as a fraction of the tank filled or emptied per hour. For example, Pipe A fills 1/6 of the tank per hour.',
      'Inflow adds to the volume, while the drain subtracts: Net Rate = 1/6 + 1/4 - 1/12.',
      'Find a common denominator (12) to sum the hourly rates, then take the reciprocal to get total time T.'
    ],
    options: [
      { id: 'opt-a', text: '3 hours', explanation: 'Correct! Net rate = 2/12 + 3/12 - 1/12 = 4/12 = 1/3 tank/hr. Therefore T = 3 hours.' },
      { id: 'opt-b', text: '2.5 hours', explanation: 'Incorrect: Check common denominator fractions.' },
      { id: 'opt-c', text: '4 hours', explanation: 'Incorrect: That would be the rate of Pipe B alone.' },
      { id: 'opt-d', text: '3.6 hours', explanation: 'Incorrect: Ensure you subtract the drain rate rather than adding it.' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Calculate hourly rates for each conduit',
        explanation: 'Pipe A rate = +1/6 tank/hr, Pipe B rate = +1/4 tank/hr, Drain rate = -1/12 tank/hr.',
        math: 'R_{net} = \\frac{1}{6} + \\frac{1}{4} - \\frac{1}{12}'
      },
      {
        step: 'Step 2: Combine using the lowest common multiple (12)',
        explanation: 'Convert each fraction to denominator 12: 1/6 = 2/12, 1/4 = 3/12, and 1/12 = 1/12.',
        math: 'R_{net} = \\frac{2 + 3 - 1}{12} = \\frac{4}{12} = \\frac{1}{3}\\text{ tank/hour}'
      },
      {
        step: 'Step 3: Invert rate to obtain total time',
        explanation: 'Since 1/3 of the reservoir is filled every hour, the total time required is the reciprocal.',
        math: 'T = \\frac{1}{R_{net}} = \\frac{1}{1/3} = 3\\text{ hours}'
      }
    ],
    practicalApplication: 'Chemical processing plants and industrial biomanufacturing bioreactors monitor net volumetric flow rates using this balance model.'
  },

  // ==========================================
  // TRIGONOMETRY WORD PROBLEMS (Textbook Style)
  // ==========================================
  {
    id: 'wp-trig-01',
    title: 'The Mountain Surveyor’s Dual Angle of Elevation',
    category: 'trigonometry',
    ageGroup: '16-18',
    gradeLevel: 'Grade 10-11 (Age 15-17)',
    textbookChapter: 'Chapter 7: Trigonometric Applications & Heights and Distances',
    contextStory: 'A geological surveying team is measuring the altitude of a vertical mountain summit above a flat plateau. From an initial base camp Point A, the angle of elevation to the peak is measured to be 30°. The team drives directly towards the mountain a distance of 1,000 meters along the flat plateau to Point B. From Point B, the angle of elevation to the summit increases to 45°.',
    questionText: 'Assuming the surveyor instrument height is negligible, determine the height h of the mountain summit above the plateau.',
    givens: [
      { label: 'Angle at Camp A (θ₁)', value: '30°' },
      { label: 'Angle at Camp B (θ₂)', value: '45°' },
      { label: 'Distance between A and B (d)', value: '1,000 meters' },
      { label: 'Terrain', value: 'Horizontal plane up to mountain vertical base' }
    ],
    toFind: 'Summit height h in meters.',
    primaryFormula: 'tan(θ) = Opposite / Adjacent  =>  d = h · [cot(θ₁) - cot(θ₂)]',
    hints: [
      'Let x be the horizontal distance from closer Point B to the mountain base. At 45°, tan(45°) = h / x, which means x = h.',
      'From Point A, the total horizontal distance is (1000 + x) = (1000 + h). Set up tan(30°) = h / (1000 + h).',
      'Remember tan(30°) = 1/√3. Solve: 1000 + h = h√3 => h(√3 - 1) = 1000.'
    ],
    options: [
      { id: 'opt-a', text: '1,366 meters', explanation: 'Correct! h = 1000 / (√3 - 1) = 1000(√3 + 1) / 2 = 500(2.732) ≈ 1,366 m.' },
      { id: 'opt-b', text: '1,000 meters', explanation: 'Incorrect: That is the distance between the two survey stations.' },
      { id: 'opt-c', text: '1,732 meters', explanation: 'Incorrect: That corresponds to 1000 × √3 without accounting for the offset.' },
      { id: 'opt-d', text: '1,500 meters', explanation: 'Incorrect: Review trigonometric derivation.' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Set up right triangle relations from Point B',
        explanation: 'Let the mountain base be Point C. In right triangle △BCD, the angle at B is 45°.',
        math: '\\tan(45^\\circ) = \\frac{h}{BC} = 1 \\implies BC = h'
      },
      {
        step: 'Step 2: Set up right triangle relations from Point A',
        explanation: 'In the larger right triangle △ACD, the total horizontal base AC = AB + BC = 1000 + h.',
        math: '\\tan(30^\\circ) = \\frac{h}{1000 + h} \\implies \\frac{1}{\\sqrt{3}} = \\frac{h}{1000 + h}'
      },
      {
        step: 'Step 3: Cross multiply and rationalize the denominator',
        explanation: 'Rearrange and isolate height h:',
        math: '1000 + h = h\\sqrt{3} \\implies h(\\sqrt{3} - 1) = 1000 \\implies h = \\frac{1000}{\\sqrt{3} - 1}'
      },
      {
        step: 'Step 4: Compute final altitude',
        explanation: 'Multiply numerator and denominator by conjugate (√3 + 1):',
        math: 'h = \\frac{1000(\\sqrt{3} + 1)}{3 - 1} = 500(1.732 + 1) = 500(2.732) = 1,366\\text{ meters}'
      }
    ],
    practicalApplication: 'Modern civil engineering LiDAR and optical theodolites use multi-station triangulation to map terrain topography without physically climbing treacherous peaks.'
  },
  {
    id: 'wp-trig-02',
    title: 'Offshore Search-and-Rescue Bearing',
    category: 'trigonometry',
    ageGroup: '16-18',
    gradeLevel: 'Grade 11-12 (Age 16-18)',
    textbookChapter: 'Chapter 8: Vectors & Law of Cosines',
    contextStory: 'A Coast Guard cutter stationed at harbor coordinates detects an emergency beacon. A disabled fishing vessel is 24 nautical miles away on a bearing of 040°. A rapid patrol craft is dispatched from a naval station situated 32 nautical miles away on a bearing of 100° from the harbor.',
    questionText: 'What is the straight-line distance between the patrol craft and the disabled fishing vessel?',
    givens: [
      { label: 'Distance to Vessel (a)', value: '24 nautical miles' },
      { label: 'Distance to Patrol Craft (b)', value: '32 nautical miles' },
      { label: 'Angle between paths (C)', value: '100° - 040° = 60°' }
    ],
    toFind: 'Distance c separating the two vessels.',
    primaryFormula: 'c² = a² + b² - 2ab · cos(C)',
    hints: [
      'The harbor and the two vessels form a non-right triangle with two known side lengths and the included angle.',
      'The included angle C is simply the difference between the two bearings: 100° - 40° = 60°.',
      'Notice that cos(60°) = 0.5, which simplifies the 2ab cos(C) term nicely.'
    ],
    options: [
      { id: 'opt-a', text: '28.0 nautical miles', explanation: 'Correct! c² = 24² + 32² - 2(24)(32)(0.5) = 576 + 1024 - 768 = 832 => c = √832 ≈ 28.84 or exactly 4√52 ≈ 28.8 nm.' },
      { id: 'opt-b', text: '40.0 nautical miles', explanation: 'Incorrect: That would assume a 90° right triangle (Pythagorean 24-32-40).' },
      { id: 'opt-c', text: '28.8 nautical miles', explanation: 'Correct precision: c = √832 ≈ 28.84 nm.' },
      { id: 'opt-d', text: '56.0 nautical miles', explanation: 'Incorrect: This is just 24 + 32 without geometric triangulation.' }
    ],
    correctOptionId: 'opt-c',
    detailedStepByStep: [
      {
        step: 'Step 1: Compute the included angle between the two position vectors',
        explanation: 'Bearings are measured clockwise from North. The angular separation is the difference:',
        math: 'C = 100^\\circ - 40^\\circ = 60^\\circ'
      },
      {
        step: 'Step 2: Apply the Law of Cosines',
        explanation: 'Substitute known side lengths a = 24 nm, b = 32 nm, and C = 60°:',
        math: 'c^2 = 24^2 + 32^2 - 2(24)(32)\\cos(60^\\circ)'
      },
      {
        step: 'Step 3: Evaluate numeric values',
        explanation: 'Calculate squares and evaluate cos(60°) = 1/2:',
        math: 'c^2 = 576 + 1024 - 2(24)(32)(0.5) = 1600 - 768 = 832'
      },
      {
        step: 'Step 4: Take the square root',
        explanation: 'The straight line distance is:',
        math: 'c = \\sqrt{832} \\approx 28.84\\text{ nautical miles}'
      }
    ],
    practicalApplication: 'Maritime GPS navigation systems and flight management computers continuously perform spherical and planar trigonometry to calculate intercept trajectories.'
  },

  // ==========================================
  // DERIVATIVE WORD PROBLEMS (Calculus Style)
  // ==========================================
  {
    id: 'wp-deriv-01',
    title: 'Optimization: Maximum Enclosed Volume of a Can',
    category: 'derivative',
    ageGroup: '19-25',
    gradeLevel: 'AP Calculus / College Calculus I',
    textbookChapter: 'Chapter 4: Applications of Derivatives & Global Extrema',
    contextStory: 'A beverage packaging manufacturer needs to design a standard closed cylindrical aluminum can with a fixed total internal volume of V = 500 cm³ (0.5 liters). To minimize manufacturing material costs, the total external surface area of aluminum used (top disk, bottom disk, and cylindrical wall) must be minimized.',
    questionText: 'What is the optimal radius r that minimizes the total surface area of the can?',
    givens: [
      { label: 'Volume (V)', value: '500 cm³ = π r² h' },
      { label: 'Surface Area (A)', value: '2πr² (two disks) + 2πrh (side wall)' }
    ],
    toFind: 'Optimal radius r (in cm) that yields minimum area dA/dr = 0.',
    primaryFormula: 'A(r) = 2πr² + 2V / r  =>  dA/dr = 4πr - 2V / r² = 0',
    hints: [
      'Express height h in terms of radius r using the volume constraint: h = 500 / (πr²).',
      'Substitute h into the surface area equation: A(r) = 2πr² + 2πr(500 / πr²) = 2πr² + 1000/r.',
      'Differentiate A with respect to r, set dA/dr = 0, and solve for r.'
    ],
    options: [
      { id: 'opt-a', text: 'r = ³√(250 / π) ≈ 4.30 cm', explanation: 'Correct! 4πr - 1000/r² = 0 => 4πr³ = 1000 => r³ = 250/π => r ≈ 4.30 cm.' },
      { id: 'opt-b', text: 'r = 5.00 cm', explanation: 'Incorrect: Check the cubic root reduction.' },
      { id: 'opt-c', text: 'r = ³√(500 / π) ≈ 5.42 cm', explanation: 'Incorrect: Forgets that the derivative of 2πr² produces 4πr.' },
      { id: 'opt-d', text: 'r = 3.14 cm', explanation: 'Incorrect: This is simply the value of π.' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Set up the objective function in one variable',
        explanation: 'From V = πr²h = 500, we express h = 500 / (πr²). Substitute into Area formula:',
        math: 'A(r) = 2\\pi r^2 + 2\\pi r\\left(\\frac{500}{\\pi r^2}\\right) = 2\\pi r^2 + \\frac{1000}{r}'
      },
      {
        step: 'Step 2: Differentiate with respect to r',
        explanation: 'Use the power rule: d/dr[2πr²] = 4πr, and d/dr[1000 r⁻¹] = -1000 r⁻².',
        math: '\\frac{dA}{dr} = 4\\pi r - \\frac{1000}{r^2}'
      },
      {
        step: 'Step 3: Set derivative to zero to find the critical point',
        explanation: 'Multiply both sides by r² to solve for r:',
        math: '4\\pi r - \\frac{1000}{r^2} = 0 \\implies 4\\pi r^3 = 1000 \\implies r^3 = \\frac{1000}{4\\pi} = \\frac{250}{\\pi}'
      },
      {
        step: 'Step 4: Extract the cube root and verify minimum',
        explanation: 'r = (250 / π)^(1/3) ≈ 4.30 cm. Notice d²A/dr² = 4π + 2000/r³ > 0, confirming a strict global minimum.',
        math: 'r = \\sqrt[3]{\\frac{250}{\\pi}} \\approx 4.30\\text{ cm, with } h = 2r = 8.60\\text{ cm}'
      }
    ],
    practicalApplication: 'Industrial packaging engineers apply this to minimize aluminum coil consumption, saving millions in raw material transport and waste.'
  },
  {
    id: 'wp-deriv-02',
    title: 'Related Rates: The Sliding Firefighting Ladder',
    category: 'derivative',
    ageGroup: '19-25',
    gradeLevel: 'AP Calculus / College Calculus I',
    textbookChapter: 'Chapter 3: Related Rates & Implicit Differentiation',
    contextStory: 'A rigid 13-meter rescue ladder rests against a vertical stone building facade. A ground crew accidentally pulls the base of the ladder horizontally away from the wall at a steady speed of 0.5 m/s. At the precise instant when the base of the ladder is 5 meters away from the wall, how fast is the top of the ladder sliding down the facade?',
    questionText: 'Calculate dy/dt (the rate of change of the top\'s vertical position) when x = 5 meters.',
    givens: [
      { label: 'Ladder Length (L)', value: '13 meters (constant)' },
      { label: 'Current Base Position (x)', value: '5 meters' },
      { label: 'Base Pull Speed (dx/dt)', value: '+0.5 m/s' }
    ],
    toFind: 'Vertical downward velocity dy/dt (in m/s).',
    primaryFormula: 'x² + y² = L²  =>  2x(dx/dt) + 2y(dy/dt) = 0',
    hints: [
      'First use the Pythagorean theorem x² + y² = 13² to find the ladder\'s vertical height y when x = 5: y = √(169 - 25) = 12 m.',
      'Differentiate both sides of x² + y² = 169 with respect to time t implicitly using the chain rule.',
      'Substitute x = 5, y = 12, and dx/dt = 0.5, then solve for dy/dt.'
    ],
    options: [
      { id: 'opt-a', text: '-0.208 m/s (sliding down at ~0.21 m/s)', explanation: 'Correct! 2(5)(0.5) + 2(12)(dy/dt) = 0 => 5 + 24(dy/dt) = 0 => dy/dt = -5/24 ≈ -0.208 m/s.' },
      { id: 'opt-b', text: '-0.500 m/s', explanation: 'Incorrect: The top does not move at the same speed as the base.' },
      { id: 'opt-c', text: '-0.833 m/s', explanation: 'Incorrect: Inverted fraction 20/24.' },
      { id: 'opt-d', text: '-0.125 m/s', explanation: 'Incorrect: Check substitution.' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Compute height y at the instant of interest',
        explanation: 'Apply Pythagorean theorem with x = 5 m and hypotenuse L = 13 m:',
        math: 'y = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ meters}'
      },
      {
        step: 'Step 2: Differentiate x² + y² = 13² with respect to time t',
        explanation: 'Remember ladder length is constant (d/dt[169] = 0):',
        math: '\\frac{d}{dt}[x^2 + y^2] = \\frac{d}{dt}[169] \\implies 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0'
      },
      {
        step: 'Step 3: Substitute the known values and solve for dy/dt',
        explanation: 'Divide through by 2 and substitute x = 5, y = 12, dx/dt = 0.5:',
        math: '(5)(0.5) + (12)\\frac{dy}{dt} = 0 \\implies 2.5 + 12\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{2.5}{12} = -\\frac{5}{24}\\text{ m/s}'
      },
      {
        step: 'Step 4: Interpret the negative sign',
        explanation: 'The negative sign indicates the vertical position y is decreasing as the ladder descends:',
        math: '\\frac{dy}{dt} \\approx -0.2083\\text{ m/s (approx 20.8 cm/s downward)}'
      }
    ],
    practicalApplication: 'Robotic arm inverse kinematics engines solve coupled differential equations identically to govern robotic joint velocity limits.'
  },

  // ==========================================
  // INTEGRATION WORD PROBLEMS (Calculus Style)
  // ==========================================
  {
    id: 'wp-integ-01',
    title: 'Space Capsule Atmospheric Deceleration',
    category: 'integration',
    ageGroup: '19-25',
    gradeLevel: 'College Physics / Calculus II',
    textbookChapter: 'Chapter 6: Definite Integrals in Kinematics',
    contextStory: 'During atmospheric re-entry, an automated return module fires retro-thrusters to shed hypersonic velocity. Telemetry records the capsule velocity v(t) in meters per second over the 10-second burn duration according to the function v(t) = 400 - 30t + t², where t is measured in seconds from ignition (t = 0 to t = 10).',
    questionText: 'Determine the total distance (in meters) traversed by the spacecraft during this 10-second braking phase.',
    givens: [
      { label: 'Velocity Function v(t)', value: '400 - 30t + t² (m/s)' },
      { label: 'Time Interval', value: 'from t = 0 to t = 10 seconds' },
      { label: 'Velocity Check', value: 'v(t) remains positive throughout the 10 seconds' }
    ],
    toFind: 'Total distance s = ∫[0 to 10] v(t) dt.',
    primaryFormula: 'Distance = ∫[t₁ to t₂] v(t) dt',
    hints: [
      'Since velocity is the time derivative of position, total distance traveled is the definite integral of velocity with respect to time.',
      'Integrate term by term: ∫ (400 - 30t + t²) dt = 400t - 15t² + t³/3.',
      'Evaluate the antiderivative at upper limit t = 10, then subtract evaluation at t = 0.'
    ],
    options: [
      { id: 'opt-a', text: '2,833.3 meters', explanation: 'Correct! [400(10) - 15(100) + 1000/3] - 0 = 4000 - 1500 + 333.33 = 2,833.33 m.' },
      { id: 'opt-b', text: '3,200.0 meters', explanation: 'Incorrect: Did not subtract the deceleration quadratic term.' },
      { id: 'opt-c', text: '2,500.0 meters', explanation: 'Incorrect: Forgot the t³/3 term.' },
      { id: 'opt-d', text: '4,000.0 meters', explanation: 'Incorrect: Assumes initial velocity was constant.' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Express total displacement as a definite integral',
        explanation: 'By the Fundamental Theorem of Calculus, position change is the accumulation of velocity over time:',
        math: 's = \\int_{0}^{10} (400 - 30t + t^2) \\, dt'
      },
      {
        step: 'Step 2: Find the antiderivative using power rules',
        explanation: 'Integrate each polynomial component:',
        math: 'F(t) = 400t - \\frac{30t^2}{2} + \\frac{t^3}{3} = 400t - 15t^2 + \\frac{t^3}{3}'
      },
      {
        step: 'Step 3: Evaluate between boundaries t = 0 and t = 10',
        explanation: 'Substitute limits:',
        math: 's = \\left[400(10) - 15(10)^2 + \\frac{10^3}{3}\\right] - [0] = 4000 - 1500 + \\frac{1000}{3}'
      },
      {
        step: 'Step 4: Compute the final arithmetic',
        explanation: 'Combine terms:',
        math: 's = 2500 + 333.33 = 2,833.33\\text{ meters}'
      }
    ],
    practicalApplication: 'Aerospace flight trajectory computers continuously integrate accelerometer telemetry in real-time to compute exact landing ellipses.'
  },
  {
    id: 'wp-integ-02',
    title: 'Industrial Tank Leakage & Total Fluid Loss',
    category: 'integration',
    ageGroup: '19-25',
    gradeLevel: 'College Calculus II / Engineering Math',
    textbookChapter: 'Chapter 7: Exponential Decay Accumulation',
    contextStory: 'A crack develops in a petroleum storage tank at t = 0 hours. Fluid leaks outward at a decaying rate modeled by R(t) = 120 · e^(-0.25 t) liters per hour, where t is elapsed time in hours. Maintenance crews anticipate reaching the remote site in 8 hours to seal the rupture.',
    questionText: 'Calculate the total volume of petroleum (to the nearest whole liter) lost to the environment over the 8-hour window.',
    givens: [
      { label: 'Leakage Rate R(t)', value: '120 e^(-0.25 t) L/hr' },
      { label: 'Time Window', value: 'from t = 0 to t = 8 hours' }
    ],
    toFind: 'Total volume V = ∫[0 to 8] 120 e^(-0.25 t) dt.',
    primaryFormula: '∫ e^(kt) dt = (1/k) e^(kt)  =>  V = ∫[0 to 8] 120 e^(-0.25 t) dt',
    hints: [
      'Integrate the exponential function: ∫ e^(-0.25 t) dt = -1 / 0.25 · e^(-0.25 t) = -4 e^(-0.25 t).',
      'Multiply by the constant 120: Antiderivative = -480 e^(-0.25 t).',
      'Compute: [-480 e^(-0.25 · 8)] - [-480 e^0] = 480 [1 - e^(-2)]. Since e^(-2) ≈ 0.1353, evaluate 480(1 - 0.1353).'
    ],
    options: [
      { id: 'opt-a', text: '415 liters', explanation: 'Correct! 480(1 - e⁻²) = 480(1 - 0.1353) = 480(0.8647) ≈ 415.04 liters.' },
      { id: 'opt-b', text: '960 liters', explanation: 'Incorrect: Assumes a constant leak rate of 120 L/hr without exponential decay.' },
      { id: 'opt-c', text: '480 liters', explanation: 'Incorrect: That would be the total infinite loss if never repaired.' },
      { id: 'opt-d', text: '350 liters', explanation: 'Incorrect: Check the value of e^(-2).' }
    ],
    correctOptionId: 'opt-a',
    detailedStepByStep: [
      {
        step: 'Step 1: Set up the definite integral for total accumulated volume',
        explanation: 'Total loss is the integral of the rate function over the 8-hour interval:',
        math: 'V = \\int_{0}^{8} 120 e^{-0.25 t} \\, dt'
      },
      {
        step: 'Step 2: Antidifferentiate the exponential term',
        explanation: 'Recall that ∫ e^(kt) dt = (1/k) e^(kt). Here k = -0.25 = -1/4, so 1/k = -4:',
        math: '\\int 120 e^{-0.25 t} \\, dt = 120 \\left( -4 e^{-0.25 t} \\right) = -480 e^{-0.25 t}'
      },
      {
        step: 'Step 3: Evaluate limits between t = 0 and t = 8',
        explanation: 'At t = 8, exponent is -0.25(8) = -2. At t = 0, e^0 = 1:',
        math: 'V = \\left[ -480 e^{-2} \\right] - \\left[ -480 e^0 \\right] = 480(1 - e^{-2})'
      },
      {
        step: 'Step 4: Compute numerical result',
        explanation: 'Using e⁻² ≈ 0.135335:',
        math: 'V = 480(1 - 0.135335) = 480(0.86466) \\approx 415.04 \\approx 415\\text{ liters}'
      }
    ],
    practicalApplication: 'Environmental containment agencies and hazard response teams simulate plume diffusion and contaminant volume using decaying exponential integrals.'
  }
];
