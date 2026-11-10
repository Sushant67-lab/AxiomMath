import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'es' | 'fr' | 'de';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    'nav.vault': 'Formula Vault',
    'nav.wordproblems': 'Word Problems',
    'nav.rush': 'Speed Rush',
    'nav.test': 'Diagnostic Test',
    'nav.progress': 'Progress Report',
    'nav.signin': 'Sign In / Sign Up',
    'nav.guest': 'Guest Scholar',
    'nav.guestTag': 'Guest Mode',

    // Hero
    'hero.badge': 'MATHEMATICAL MASTERY & PROBLEM ARENA · CURRICULUM AGES 12–25',
    'hero.headline': 'Master Formulas. Solve Word Problems. Level Up.',
    'hero.subtitle': 'From Middle School Algebra to Advanced College Differential Equations. Solve authentic multi-step textbook word problems, challenge speed blitz formulas, and test your diagnostic mastery.',
    'hero.selectStage': 'Select Your Curriculum Stage:',
    'hero.btnProblems': 'Textbook Word Problems',
    'hero.btnRush': 'Speed Rush (45s)',
    'hero.btnTest': 'Diagnostic Test Center',

    // Categories
    'cat.all': 'All Disciplines',
    'cat.trigonometry': 'Trigonometry',
    'cat.algebra': 'Algebra',
    'cat.derivative': 'Derivatives',
    'cat.integration': 'Integration',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'Formula Rush: Speed Match',
    'rush.subtitle': 'Test your quick formula recall. Complete identities before the 45-second timer runs out.',
    'rush.best': 'Personal Best:',
    'rush.blitzTitle': '45-Second Mathematical Blitz',
    'rush.blitzDesc': 'Formulas from Trigonometry, Algebra, Derivatives, and Integration will flash on screen with a missing component. Identify the correct identity match as fast as possible to build streak combos.',
    'rush.startBtn': 'Start Rush Game',
    'rush.time': 'TIME',
    'rush.combos': 'COMBOS',
    'rush.rewards': 'REWARDS',
    'rush.pts': 'pts',
    'rush.guestPromptTitle': 'Player Identification Required',
    'rush.guestPromptDesc': 'Choose how you would like to proceed with Formula Rush:',
    'rush.guestContinue': 'Play as Guest (Instant Play)',
    'rush.guestContinueDesc': 'Play immediately. Scores and XP are temporary and not synced to an official profile.',
    'rush.signinRequired': 'Sign In / Register (Recommended)',
    'rush.signinRequiredDesc': 'Mandatory to permanently record high scores, track XP, unlock badges, and earn verified certificates.',
    'rush.mandatoryToggle': 'Mandatory Sign-In Mode',
    'rush.mandatoryToggleDesc': 'Require players to log in before playing to ensure progress is never lost.',

    // Word Problems
    'wp.title': 'Textbook Word Problems Arena',
    'wp.subtitle': 'Authentic multi-step textbook questions from standard curricula (AP, Cambridge, CBSE & University STEM).',
    'wp.allChapters': 'All Textbook Chapters',
    'wp.exercises': 'Textbook Exercises',
    'wp.scratchpad': 'Scratchpad',
    'wp.openScratchpad': 'Open Scratchpad',
    'wp.hideScratchpad': 'Hide Scratchpad',
    'wp.verifyBtn': 'Verify Solution',
    'wp.nextBtn': 'Next Exercise',
    'wp.hints': 'Textbook Guided Hints',
    'wp.revealHint': 'Reveal Hint',
    'wp.resetProblem': 'Reset Problem',
    'wp.workedSolution': 'Complete Worked Textbook Solution:',

    // Test Center
    'test.title': 'Mathematical Diagnostic Test Center',
    'test.subtitle': 'Timed curriculum evaluations for Trigonometry, Algebra, Derivatives, and Integration.',
    'test.beginBtn': 'Begin Diagnostic Examination',
    'test.submitBtn': 'Submit Examination',
    'test.flag': 'Flag',
    'test.previous': 'Previous',
    'test.next': 'Next',

    // Progress Report
    'progress.title': 'Student Academic Dossier',
    'progress.accuracy': 'Overall Accuracy',
    'progress.wordProblemsSolved': 'Textbook Problems Solved',
    'progress.examsCompleted': 'Diagnostic Exams Completed',
    'progress.domainMastery': 'Mathematical Domain Mastery Index',
    'progress.reportCardBtn': 'Report Card',
    'progress.guestBanner': 'You are currently in Guest mode. Sign up to permanently sync your progress and certificates.'
  },

  hi: {
    // Navigation
    'nav.vault': 'फॉर्मूला वॉल्ट',
    'nav.wordproblems': 'शब्द समस्याएँ',
    'nav.rush': 'स्पीड रश खेल',
    'nav.test': 'निदान परीक्षा',
    'nav.progress': 'प्रगति रिपोर्ट',
    'nav.signin': 'साइन इन / रजिस्टर',
    'nav.guest': 'अतिथि छात्र (Guest)',
    'nav.guestTag': 'अतिथि मोड',

    // Hero
    'hero.badge': 'गणितीय निपुणता और समस्या क्षेत्र · आयु 12–25 पाठ्यक्रम',
    'hero.headline': 'गणित सीखें। शब्द समस्याएँ हल करें। आगे बढ़ें।',
    'hero.subtitle': 'माध्यमिक विद्यालय बीजगणित से लेकर कॉलेज के अवकल समीकरण तक। प्रामाणिक पाठ्यपुस्तक शब्द समस्याएँ हल करें और स्पीड रश में स्वयं को परखें।',
    'hero.selectStage': 'अपना पाठ्यक्रम स्तर चुनें:',
    'hero.btnProblems': 'पाठ्यपुस्तक शब्द समस्याएँ',
    'hero.btnRush': 'स्पीड रश (45 सेकंड)',
    'hero.btnTest': 'निदान परीक्षा केंद्र',

    // Categories
    'cat.all': 'सभी विषय',
    'cat.trigonometry': 'त्रिकोणमिति',
    'cat.algebra': 'बीजगणित',
    'cat.derivative': 'अवकलन (Derivatives)',
    'cat.integration': 'समाकलन (Integration)',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'फॉर्मूला रश: स्पीड मैच',
    'rush.subtitle': 'अपने त्वरित सूत्र स्मरण का परीक्षण करें। 45 सेकंड में लुप्त भागों को पूरा करें।',
    'rush.best': 'सर्वश्रेष्ठ स्कोर:',
    'rush.blitzTitle': '45-सेकंड का गणितीय मुकाबला',
    'rush.blitzDesc': 'त्रिकोणमिति, बीजगणित, अवकलन और समाकलन के सूत्र स्क्रीन पर आएंगे। स्ट्रीक कॉम्बो बनाने के लिए सही विकल्प चुनें।',
    'rush.startBtn': 'रश खेल शुरू करें',
    'rush.time': 'समय',
    'rush.combos': 'कॉम्बो',
    'rush.rewards': 'पुरस्कार',
    'rush.pts': 'अंक',
    'rush.guestPromptTitle': 'खिलाड़ी पहचान आवश्यक',
    'rush.guestPromptDesc': 'खेलने से पहले कृपया अपनी पहचान का चयन करें:',
    'rush.guestContinue': 'अतिथि के रूप में खेलें (Guest Play)',
    'rush.guestContinueDesc': 'तुरंत खेलें। स्कोर और XP अस्थायी रहेंगे और स्थायी प्रोफ़ाइल में नहीं जुड़ेंगे।',
    'rush.signinRequired': 'साइन इन / रजिस्टर करें (अनुशंसित)',
    'rush.signinRequiredDesc': 'उच्च स्कोर, XP, बैज और आधिकारिक प्रमाणपत्र सहेजने के लिए अनिवार्य है।',
    'rush.mandatoryToggle': 'अनिवार्य साइन-इन मोड',
    'rush.mandatoryToggleDesc': 'प्रगति सुरक्षित रखने के लिए खेल से पहले लॉगिन अनिवार्य करें।',

    // Word Problems
    'wp.title': 'पाठ्यपुस्तक शब्द समस्या क्षेत्र',
    'wp.subtitle': 'मानक पाठ्यक्रमों (CBSE, ICSE, AP और विश्वविद्यालय) के प्रामाणिक बहु-चरणीय प्रश्न।',
    'wp.allChapters': 'सभी पाठ्यपुस्तक अध्याय',
    'wp.exercises': 'अभ्यास प्रश्न',
    'wp.scratchpad': 'रफ पैड',
    'wp.openScratchpad': 'रफ पैड खोलें',
    'wp.hideScratchpad': 'रफ पैड छुपाएं',
    'wp.verifyBtn': 'उत्तर जांचें',
    'wp.nextBtn': 'अगला प्रश्न',
    'wp.hints': 'मार्गदर्शक संकेत',
    'wp.revealHint': 'संकेत देखें',
    'wp.resetProblem': 'रीसेट करें',
    'wp.workedSolution': 'पूर्ण हल (हल सहित प्रमाण):',

    // Test Center
    'test.title': 'गणितीय निदान परीक्षा केंद्र',
    'test.subtitle': 'त्रिकोणमिति, बीजगणित, अवकलन और समाकलन के लिए समयबद्ध परीक्षाएं।',
    'test.beginBtn': 'परीक्षा शुरू करें',
    'test.submitBtn': 'परीक्षा जमा करें',
    'test.flag': 'फ़्लैग',
    'test.previous': 'पिछला',
    'test.next': 'अगला',

    // Progress Report
    'progress.title': 'छात्र शैक्षणिक रिपोर्ट',
    'progress.accuracy': 'कुल सटीकता',
    'progress.wordProblemsSolved': 'हल किए गए प्रश्न',
    'progress.examsCompleted': 'पूर्ण परीक्षाएं',
    'progress.domainMastery': 'गणितीय विषय निपुणता',
    'progress.reportCardBtn': 'रिपोर्ट कार्ड',
    'progress.guestBanner': 'आप वर्तमान में अतिथि मोड में हैं। अपनी प्रगति सुरक्षित करने के लिए साइन अप करें।'
  },

  mr: {
    // Navigation
    'nav.vault': 'फॉर्म्युला व्हॉल्ट',
    'nav.wordproblems': 'शाब्दिक उदाहरणे',
    'nav.rush': 'स्पीड रश खेळ',
    'nav.test': 'निदान परीक्षा',
    'nav.progress': 'प्रगती अहवाल',
    'nav.signin': 'साइन इन / नोंदणी',
    'nav.guest': 'अतिथी विद्यार्थी (Guest)',
    'nav.guestTag': 'अतिथी मोड',

    // Hero
    'hero.badge': 'गणितीय प्रभुत्व आणि समस्या सोडवणे · वय १२–२५ अभ्यासक्रम',
    'hero.headline': 'गणित शिका. शाब्दिक प्रश्न सोडवा. पुढे जा.',
    'hero.subtitle': 'शालेय बीजगणितापासून ते कॉलेजच्या उच्च कलनशास्त्रापर्यंत. पाठ्यपुस्तकातील शाब्दिक समस्या सोडवा आणि स्पीड रशमध्ये स्वतःची परीक्षा घ्या.',
    'hero.selectStage': 'आपला अभ्यासक्रम स्तर निवडा:',
    'hero.btnProblems': 'पाठ्यपुस्तक शाब्दिक प्रश्न',
    'hero.btnRush': 'स्पीड रश (४५ सेकंद)',
    'hero.btnTest': 'निदान परीक्षा केंद्र',

    // Categories
    'cat.all': 'सर्व विषय',
    'cat.trigonometry': 'त्रिकोणमिती',
    'cat.algebra': 'बीजगणित',
    'cat.derivative': 'अवकलन (Derivatives)',
    'cat.integration': 'समाकलन (Integration)',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'फॉर्म्युला रश: स्पीड मॅच',
    'rush.subtitle': 'आपल्या त्वरित सूत्र स्मरणाची चाचणी घ्या. ४५ सेकंदात रिकाम्या जागा भरा.',
    'rush.best': 'सर्वोत्कृष्ट गुण:',
    'rush.blitzTitle': '४५-सेकंदांचे गणितीय आव्हान',
    'rush.blitzDesc': 'त्रिकोणमिती, बीजगणित, अवकलन आणि समाकलनाची सूत्रे स्क्रीनवर येतील. कॉम्बो मिळवण्यासाठी योग्य उत्तर निवडा.',
    'rush.startBtn': 'रश खेळ सुरू करा',
    'rush.time': 'वेळ',
    'rush.combos': 'कॉम्बो',
    'rush.rewards': 'पुरस्कार',
    'rush.pts': 'गुण',
    'rush.guestPromptTitle': 'खेळाडू ओळख आवश्यक',
    'rush.guestPromptDesc': 'खेळण्यापूर्वी कृपया पर्याय निवडा:',
    'rush.guestContinue': 'अतिथी म्हणून खेळा (त्वरित खेळ)',
    'rush.guestContinueDesc': 'खाते न उघडता लगेच खेळा. गुण तात्पुरते राहतील.',
    'rush.signinRequired': 'साइन इन / नोंदणी करा (शिफारस)',
    'rush.signinRequiredDesc': 'उच्च गुण, XP, पदके आणि अधिकृत प्रमाणपत्र जतन करण्यासाठी अनिवार्य आहे.',
    'rush.mandatoryToggle': 'अनिवार्य साइन-इन मोड',
    'rush.mandatoryToggleDesc': 'प्रगती सुरक्षित ठेवण्यासाठी खेळापूर्वी लॉगिन अनिवार्य करा.',

    // Word Problems
    'wp.title': 'पाठ्यपुस्तक शाब्दिक उदाहरणे कट्टा',
    'wp.subtitle': 'भौतिकशास्त्र, अभियांत्रिकी आणि गणितातील वास्तववादी बहु-टप्प्यांची उदाहरणे.',
    'wp.allChapters': 'सर्व पाठ्यपुस्तक प्रकरणे',
    'wp.exercises': 'सराव उदाहरणे',
    'wp.scratchpad': 'रफ नोंदवही',
    'wp.openScratchpad': 'नोंदवही उघडा',
    'wp.hideScratchpad': 'नोंदवही लपवा',
    'wp.verifyBtn': 'उत्तर तपासा',
    'wp.nextBtn': 'पुढील उदाहरण',
    'wp.hints': 'मार्गदर्शक सूचना व हिंट्स',
    'wp.revealHint': 'हिंट पहा',
    'wp.resetProblem': 'पुन्हा सोडवा',
    'wp.workedSolution': 'पायरी-दर-पायरी संपूर्ण उत्तर:',

    // Test Center
    'test.title': 'गणितीय निदान परीक्षा केंद्र',
    'test.subtitle': 'त्रिकोणमिती, बीजगणित, अवकलन आणि समाकलनासाठी वेळबद्ध परीक्षा.',
    'test.beginBtn': 'परीक्षा सुरू करा',
    'test.submitBtn': 'परीक्षा जमा करा',
    'test.flag': 'खूण करा',
    'test.previous': 'मागील',
    'test.next': 'पुढील',

    // Progress Report
    'progress.title': 'विद्यार्थी शैक्षणिक प्रगती अहवाल',
    'progress.accuracy': 'एकूण अचूकता',
    'progress.wordProblemsSolved': 'सोडवलेली शाब्दिक उदाहरणे',
    'progress.examsCompleted': 'पूर्ण झालेल्या परीक्षा',
    'progress.domainMastery': 'विषयनिहाय निपुणता निर्देशांक',
    'progress.reportCardBtn': 'गुणपत्रिका / प्रमाणपत्र',
    'progress.guestBanner': 'तुम्ही सध्या अतिथी मोडमध्ये आहात. तुमची प्रगती सुरक्षित करण्यासाठी नोंदणी करा.'
  },

  ta: {
    // Navigation
    'nav.vault': 'ஃபார்முலா களஞ்சியம்',
    'nav.wordproblems': 'கணக்குச் சொற்பிரச்சினைகள்',
    'nav.rush': 'ஸ்பீட் ரஷ் விளையாட்டு',
    'nav.test': 'கணிதத் தேர்வு',
    'nav.progress': 'முன்னேற்ற அறிக்கை',
    'nav.signin': 'உள்நுழை / பதிவு செய்',
    'nav.guest': 'விருந்தினர் மாணவர் (Guest)',
    'nav.guestTag': 'விருந்தினர் பயன்முறை',

    // Hero
    'hero.badge': 'கணிதத் தேர்ச்சி மற்றும் தீர்வுக் களம் · வயது 12–25 பாடத்திட்டம்',
    'hero.headline': 'சூத்திரங்களைக் கற்க. கணக்குகளைத் தீர்க்க. முன்னேறுக.',
    'hero.subtitle': 'பள்ளி இயற்கணிதம் முதல் கல்லூரி கால்குலஸ் வரை. பாடப்புத்தகக் கணக்குகளைத் தீர்த்து ஸ்பீட் ரஷ் விளையாட்டில் உங்களைச் சோதிக்கவும்.',
    'hero.selectStage': 'உங்கள் கல்வி நிலையைத் தேர்ந்தெடுக்கவும்:',
    'hero.btnProblems': 'பாடப்புத்தக கணக்குகள்',
    'hero.btnRush': 'ஸ்பீட் ரஷ் (45 விநாடிகள்)',
    'hero.btnTest': 'கணிதத் தேர்வு மையம்',

    // Categories
    'cat.all': 'அனைத்துத் துறைகள்',
    'cat.trigonometry': 'முக்கோணவியல்',
    'cat.algebra': 'இயற்கணிதம்',
    'cat.derivative': 'வகையீட்டு நுண்கணிதம்',
    'cat.integration': 'தொகையீட்டு நுண்கணிதம்',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'ஃபார்முலா ரஷ்: வேகப் பொருத்தம்',
    'rush.subtitle': '45 விநாடிகளுக்குள் விடுபட்ட கணிதச் சூத்திரங்களைச் சரியாகப் பூர்த்தி செய்க.',
    'rush.best': 'சிறந்த சாதனை:',
    'rush.blitzTitle': '45-விநாடி கணிதப் போர்',
    'rush.blitzDesc': 'முக்கோணவியல், இயற்கணிதம், வகையீடு மற்றும் தொகையீட்டுச் சூத்திரங்கள் தோன்றும். விரைவாகத் தேர்வு செய்க.',
    'rush.startBtn': 'விளையாட்டைத் தொடங்கு',
    'rush.time': 'நேரம்',
    'rush.combos': 'காம்போ',
    'rush.rewards': 'புள்ளிகள்',
    'rush.pts': 'புள்ளிகள்',
    'rush.guestPromptTitle': 'வீரர் அடையாளம் தேவை',
    'rush.guestPromptDesc': 'எவ்வாறு விளையாட விரும்புகிறீர்கள்?',
    'rush.guestContinue': 'விருந்தினராக விளையாடு (உடனடி ஆட்டம்)',
    'rush.guestContinueDesc': 'கணக்கு இல்லாமல் உடனே விளையாடலாம். புள்ளிகள் நிரந்தரமாகச் சேமிக்கப்படாது.',
    'rush.signinRequired': 'உள்நுழை / பதிவு செய் (பரிந்துரைக்கப்படுவது)',
    'rush.signinRequiredDesc': 'மதிப்பெண்கள், XP மற்றும் அதிகாரப்பூர்வ சான்றிதழ்களைச் சேமிக்க இது கட்டாயம்.',
    'rush.mandatoryToggle': 'உள்நுழைவு கட்டாய பயன்முறை',
    'rush.mandatoryToggleDesc': 'விளையாடுவதற்கு முன் உள்நுழைவைக் கட்டாயமாக்குக.',

    // Word Problems
    'wp.title': 'பாடப்புத்தகக் கணக்குகள் களம்',
    'wp.subtitle': 'இயற்பியல் மற்றும் பொறியியல் சார்ந்த பல-படிநிலைக் கணக்குகள்.',
    'wp.allChapters': 'அனைத்துப் பாட அத்தியாயங்கள்',
    'wp.exercises': 'பயிற்சிக் கணக்குகள்',
    'wp.scratchpad': 'டிஜிட்டல் குறிப்பேடு',
    'wp.openScratchpad': 'குறிப்பேட்டைத் திற',
    'wp.hideScratchpad': 'குறிப்பேட்டை மூடு',
    'wp.verifyBtn': 'தீர்வைச் சரிபார்',
    'wp.nextBtn': 'அடுத்த கணக்கு',
    'wp.hints': 'வழிகாட்டும் குறிப்புகள்',
    'wp.revealHint': 'குறிப்பைப் பார்',
    'wp.resetProblem': 'மீண்டும் செய்',
    'wp.workedSolution': 'முழுமையான தீர்வு விளக்கம்:',

    // Test Center
    'test.title': 'கணித ஆய்வுத் தேர்வு மையம்',
    'test.subtitle': 'நேரக் கட்டுப்பாட்டுடன் கூடிய கணிதத் தேர்வுகள்.',
    'test.beginBtn': 'தேர்வைத் தொடங்கு',
    'test.submitBtn': 'தேர்வைச் சமர்ப்பி',
    'test.flag': 'குறியிடு',
    'test.previous': 'முந்தையது',
    'test.next': 'அடுத்தது',

    // Progress Report
    'progress.title': 'மாணவர் கல்வி முன்னேற்ற அறிக்கை',
    'progress.accuracy': 'ஒட்டுமொத்தத் துல்லியம்',
    'progress.wordProblemsSolved': 'தீர்க்கப்பட்ட கணக்குகள்',
    'progress.examsCompleted': 'முடிக்கப்பட்ட தேர்வுகள்',
    'progress.domainMastery': 'பாடவாரியான தேர்ச்சி விகிதம்',
    'progress.reportCardBtn': 'மதிப்பெண் அட்டை',
    'progress.guestBanner': 'நீங்கள் விருந்தினர் முறையில் உள்ளீர்கள். முன்னேற்றத்தை நிரந்தரமாகச் சேமிக்கப் பதிவு செய்யுங்கள்.'
  },

  te: {
    // Navigation
    'nav.vault': 'ఫార్ములా వాల్ట్',
    'nav.wordproblems': 'పద సమస్యలు (Word Problems)',
    'nav.rush': 'స్పీడ్ రష్ గేమ్',
    'nav.test': 'గణిత పరీక్ష',
    'nav.progress': 'పురోగతి నివేదిక',
    'nav.signin': 'సైన్ ఇన్ / రిజిస్టర్',
    'nav.guest': 'అతిథి విద్యార్థి (Guest)',
    'nav.guestTag': 'అతిథి మోడ్',

    // Hero
    'hero.badge': 'గణిత నైపుణ్యం & సమస్యా పరిష్కారం · 12–25 వయస్సు పాఠ్యాంశాలు',
    'hero.headline': 'సూత్రాలు నేర్చుకోండి. లెక్కలు సాధించండి. ముందుకు సాగండి.',
    'hero.subtitle': 'హైస్కూల్ బీజగణితం నుండి కాలేజీ కలన గణితం వరకు. పాఠ్యపుస్తక సమస్యలను సాధించండి మరియు స్పీడ్ రష్‌లో మీ ప్రతిభను పరీక్షించుకోండి.',
    'hero.selectStage': 'మీ విద్యా స్థాయిని ఎంచుకోండి:',
    'hero.btnProblems': 'పాఠ్యపుస్తక పద సమస్యలు',
    'hero.btnRush': 'స్పీడ్ రష్ (45 సెకన్లు)',
    'hero.btnTest': 'పరీక్షా కేంద్రం',

    // Categories
    'cat.all': 'అన్ని విభాగాలు',
    'cat.trigonometry': 'త్రికోణమితి',
    'cat.algebra': 'బీజగణితం',
    'cat.derivative': 'అవకలనం (Derivatives)',
    'cat.integration': 'సమాకలనం (Integration)',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'ఫార్ములా రష్: స్పీడ్ మ్యాచ్',
    'rush.subtitle': '45 సెకన్లలో సూత్రాల ఖాళీలను పూరించి మీ వేగాన్ని నిరూపించుకోండి.',
    'rush.best': 'వ్యక్తిగత అత్యుత్తమ స్కోరు:',
    'rush.blitzTitle': '45-సెకన్ల గణిత బ్లిట్జ్',
    'rush.blitzDesc': 'త్రికోణమితి, బీజగణితం, కలన గణిత సూత్రాలు కనిపిస్తాయి. త్వరగా సరైన సమాధానం ఎంచుకోండి.',
    'rush.startBtn': 'గేమ్ ప్రారంభించండి',
    'rush.time': 'సమయం',
    'rush.combos': 'కాంబో',
    'rush.rewards': 'రివార్డులు',
    'rush.pts': 'పాయింట్లు',
    'rush.guestPromptTitle': 'ఆటగాడి గుర్తింపు అవసరం',
    'rush.guestPromptDesc': 'మీరు ఎలా ఆడాలనుకుంటున్నారో ఎంచుకోండి:',
    'rush.guestContinue': 'అతిథిగా ఆడండి (తక్షణ ఆట)',
    'rush.guestContinueDesc': 'ఖాతా లేకుండా వెంటనే ఆడండి. పాయింట్లు తాత్కాలికంగా మాత్రమే ఉంటాయి.',
    'rush.signinRequired': 'సైన్ ఇన్ / రిజిస్టర్ అవ్వండి (సిఫార్సు చేయబడింది)',
    'rush.signinRequiredDesc': 'హైస్కోర్లు, XP మరియు అధికారిక సర్టిఫికేట్‌లను సేవ్ చేయడానికి ఇది తప్పనిసరి.',
    'rush.mandatoryToggle': 'తప్పనిసరి సైన్-ఇన్ మోడ్',
    'rush.mandatoryToggleDesc': 'ఆడే ముందు లాగిన్ తప్పనిసరి చేయడానికి ఎనేబుల్ చేయండి.',

    // Word Problems
    'wp.title': 'పాఠ్యపుస్తక పద సమస్యల వేదిక',
    'wp.subtitle': 'భౌతిక శాస్త్రం మరియు ఇంజనీరింగ్ ఆధారిత బహుళ-దశల సమస్యలు.',
    'wp.allChapters': 'అన్ని పాఠ్యపుస్తక అధ్యాయాలు',
    'wp.exercises': 'అభ్యాస లెక్కలు',
    'wp.scratchpad': 'డిజిటల్ రఫ్ నోట్స్',
    'wp.openScratchpad': 'రఫ్ నోట్స్ తెరవండి',
    'wp.hideScratchpad': 'రఫ్ నోట్స్ మూసివేయండి',
    'wp.verifyBtn': 'సమాధానం సరిచూడండి',
    'wp.nextBtn': 'తదుపరి లెక్క',
    'wp.hints': 'మార్గదర్శక సూచనలు (హింట్స్)',
    'wp.revealHint': 'సూచన చూడండి',
    'wp.resetProblem': 'రీసెట్ చేయండి',
    'wp.workedSolution': 'దశలవారీ పూర్తి సాధన విధానం:',

    // Test Center
    'test.title': 'గణిత పరీక్షా కేంద్రం',
    'test.subtitle': 'త్రికోణమితి, బీజగణితం, కలన గణితం కోసం సమయ ఆధారిత పరీక్షలు.',
    'test.beginBtn': 'పరీక్ష ప్రారంభించండి',
    'test.submitBtn': 'పరీక్షను సమర్పించండి',
    'test.flag': 'గుర్తుంచుకో (Flag)',
    'test.previous': 'మునుపటిది',
    'test.next': 'తదుపరిది',

    // Progress Report
    'progress.title': 'విద్యార్థి విద్యా పురోగతి నివేదిక',
    'progress.accuracy': 'మొత్తం ఖచ్చితత్వం',
    'progress.wordProblemsSolved': 'సాధించిన సమస్యలు',
    'progress.examsCompleted': 'పూర్తయిన పరీక్షలు',
    'progress.domainMastery': 'విభాగాలవారీ నైపుణ్య సూచిక',
    'progress.reportCardBtn': 'రిపోర్ట్ కార్డు',
    'progress.guestBanner': 'మీరు ప్రస్తుతం అతిథి మోడ్‌లో ఉన్నారు. రికార్డులను సేవ్ చేయడానికి సైన్ అప్ చేయండి.'
  },

  es: {
    // Navigation
    'nav.vault': 'Bóveda de Fórmulas',
    'nav.wordproblems': 'Problemas Escritos',
    'nav.rush': 'Desafío Rápido',
    'nav.test': 'Prueba Diagnóstica',
    'nav.progress': 'Reporte de Progreso',
    'nav.signin': 'Iniciar Sesión / Registro',
    'nav.guest': 'Estudiante Invitado',
    'nav.guestTag': 'Modo Invitado',

    // Hero
    'hero.badge': 'DOMINIO MATEMÁTICO · CURRÍCULO EDADES 12–25',
    'hero.headline': 'Domina Fórmulas. Resuelve Problemas. Sube de Nivel.',
    'hero.subtitle': 'Desde álgebra de secundaria hasta cálculo diferencial universitario. Resuelve problemas auténticos de libros de texto y desafía tu velocidad.',
    'hero.selectStage': 'Selecciona tu etapa de estudio:',
    'hero.btnProblems': 'Problemas de Texto',
    'hero.btnRush': 'Desafío Rápido (45s)',
    'hero.btnTest': 'Centro de Pruebas',

    // Categories
    'cat.all': 'Todas las Disciplinas',
    'cat.trigonometry': 'Trigonometría',
    'cat.algebra': 'Álgebra',
    'cat.derivative': 'Derivadas',
    'cat.integration': 'Integración',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'Desafío Rápido: Emparejamiento',
    'rush.subtitle': 'Pon a prueba tu memoria rápida de fórmulas. Completa las identidades antes de que termine el tiempo.',
    'rush.best': 'Mejor Récord:',
    'rush.blitzTitle': 'Desafío Matemático de 45 Segundos',
    'rush.blitzDesc': 'Fórmulas de Trigonometría, Álgebra, Derivadas e Integrales aparecerán con partes faltantes. ¡Elige rápido!',
    'rush.startBtn': 'Comenzar Juego',
    'rush.time': 'TIEMPO',
    'rush.combos': 'COMBOS',
    'rush.rewards': 'PUNTOS',
    'rush.pts': 'pts',
    'rush.guestPromptTitle': 'Identificación de Jugador',
    'rush.guestPromptDesc': 'Elige cómo deseas jugar:',
    'rush.guestContinue': 'Jugar como Invitado (Partida Rápida)',
    'rush.guestContinueDesc': 'Juega de inmediato sin cuenta. Los puntos no se guardan de forma permanente.',
    'rush.signinRequired': 'Iniciar Sesión / Registrarse (Recomendado)',
    'rush.signinRequiredDesc': 'Obligatorio para guardar récords, acumular XP y desbloquear certificados oficiales.',
    'rush.mandatoryToggle': 'Modo de Registro Obligatorio',
    'rush.mandatoryToggleDesc': 'Exigir inicio de sesión antes de jugar para proteger el historial académico.',

    // Word Problems
    'wp.title': 'Problemas de Libros de Texto',
    'wp.subtitle': 'Problemas contextuales auténticos de física, ingeniería y optimización.',
    'wp.allChapters': 'Todos los Capítulos',
    'wp.exercises': 'Ejercicios',
    'wp.scratchpad': 'Borrador Digital',
    'wp.openScratchpad': 'Abrir Borrador',
    'wp.hideScratchpad': 'Cerrar Borrador',
    'wp.verifyBtn': 'Verificar Solución',
    'wp.nextBtn': 'Siguiente Ejercicio',
    'wp.hints': 'Pistas Guiadas',
    'wp.revealHint': 'Ver Pista',
    'wp.resetProblem': 'Reiniciar',
    'wp.workedSolution': 'Solución Paso a Paso:',

    // Test Center
    'test.title': 'Centro de Pruebas Diagnósticas',
    'test.subtitle': 'Exámenes cronometrados para evaluar tu dominio en matemáticas.',
    'test.beginBtn': 'Comenzar Examen',
    'test.submitBtn': 'Entregar Examen',
    'test.flag': 'Marcar',
    'test.previous': 'Anterior',
    'test.next': 'Siguiente',

    // Progress Report
    'progress.title': 'Expediente Académico',
    'progress.accuracy': 'Precisión Global',
    'progress.wordProblemsSolved': 'Problemas Resueltos',
    'progress.examsCompleted': 'Exámenes Completados',
    'progress.domainMastery': 'Índice de Dominio Matemático',
    'progress.reportCardBtn': 'Certificado Oficial',
    'progress.guestBanner': 'Estás en modo invitado. Regístrate para sincronizar tu progreso y certificados.'
  },

  fr: {
    // Navigation
    'nav.vault': 'Bibliothèque de Formules',
    'nav.wordproblems': 'Problèmes Textuels',
    'nav.rush': 'Course Rapide',
    'nav.test': 'Test Diagnostique',
    'nav.progress': 'Rapport de Progrès',
    'nav.signin': 'Connexion / Inscription',
    'nav.guest': 'Élève Invité',
    'nav.guestTag': 'Mode Invité',

    // Hero
    'hero.badge': 'MAÎTRISE MATHÉMATIQUE · CURRICULUM 12–25 ANS',
    'hero.headline': 'Maîtrisez les formules. Résolvez. Progressez.',
    'hero.subtitle': 'De l\'algèbre de collège aux équations différentielles universitaires. Résolvez des problèmes de manuels et testez vos réflexes.',
    'hero.selectStage': 'Sélectionnez votre niveau d\'études :',
    'hero.btnProblems': 'Problèmes de Manuel',
    'hero.btnRush': 'Course Rapide (45s)',
    'hero.btnTest': 'Centre d\'Évaluation',

    // Categories
    'cat.all': 'Toutes Disciplines',
    'cat.trigonometry': 'Trigonométrie',
    'cat.algebra': 'Algèbre',
    'cat.derivative': 'Dérivées',
    'cat.integration': 'Intégration',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'Course Rapide : Correspondance',
    'rush.subtitle': 'Testez vos réflexes mathématiques en 45 secondes chrono.',
    'rush.best': 'Meilleur Score :',
    'rush.blitzTitle': 'Épreuve Éclair de 45 Secondes',
    'rush.blitzDesc': 'Identifiez les symboles et complétez les formules le plus rapidement possible.',
    'rush.startBtn': 'Lancer le Jeu',
    'rush.time': 'TEMPS',
    'rush.combos': 'COMBOS',
    'rush.rewards': 'XP',
    'rush.pts': 'pts',
    'rush.guestPromptTitle': 'Identification du Joueur',
    'rush.guestPromptDesc': 'Comment souhaitez-vous participer ?',
    'rush.guestContinue': 'Jouer en Invité (Jeu Immédiat)',
    'rush.guestContinueDesc': 'Jouez instantanément. Les scores ne sont pas sauvegardés définitivement.',
    'rush.signinRequired': 'Se Connecter / S\'inscrire (Recommandé)',
    'rush.signinRequiredDesc': 'Obligatoire pour enregistrer vos records, accumuler de l\'XP et obtenir des certificats.',
    'rush.mandatoryToggle': 'Mode Connexion Obligatoire',
    'rush.mandatoryToggleDesc': 'Exiger la connexion pour garantir la sauvegarde des résultats.',

    // Word Problems
    'wp.title': 'Problèmes de Manuels Scolaires',
    'wp.subtitle': 'Questions authentiques à étapes multiples basées sur les programmes scolaires.',
    'wp.allChapters': 'Tous les Chapitres',
    'wp.exercises': 'Exercices',
    'wp.scratchpad': 'Brouillon Numérique',
    'wp.openScratchpad': 'Ouvrir Brouillon',
    'wp.hideScratchpad': 'Fermer Brouillon',
    'wp.verifyBtn': 'Vérifier la Solution',
    'wp.nextBtn': 'Exercice Suivant',
    'wp.hints': 'Indices Guidés',
    'wp.revealHint': 'Révéler l\'Indice',
    'wp.resetProblem': 'Réinitialiser',
    'wp.workedSolution': 'Solution Détaillée Pas à Pas :',

    // Test Center
    'test.title': 'Centre de Tests Diagnostiques',
    'test.subtitle': 'Évaluations chronométrées en trigonométrie, algèbre, dérivées et intégrales.',
    'test.beginBtn': 'Commencer l\'Épreuve',
    'test.submitBtn': 'Soumettre l\'Épreuve',
    'test.flag': 'Marquer',
    'test.previous': 'Précédent',
    'test.next': 'Suivant',

    // Progress Report
    'progress.title': 'Dossier Académique de l\'Élève',
    'progress.accuracy': 'Précision Globale',
    'progress.wordProblemsSolved': 'Problèmes Résolus',
    'progress.examsCompleted': 'Examens Terminés',
    'progress.domainMastery': 'Indice de Maîtrise des Disciplines',
    'progress.reportCardBtn': 'Bulletin Officiel',
    'progress.guestBanner': 'Vous êtes en mode invité. Inscrivez-vous pour enregistrer votre progression.'
  },

  de: {
    // Navigation
    'nav.vault': 'Formel-Tresor',
    'nav.wordproblems': 'Textaufgaben',
    'nav.rush': 'Schnell-Rush',
    'nav.test': 'Diagnosetest',
    'nav.progress': 'Fortschritt',
    'nav.signin': 'Anmelden / Registrieren',
    'nav.guest': 'Gast-Schüler',
    'nav.guestTag': 'Gast-Modus',

    // Hero
    'hero.badge': 'MATHEMATISCHE MEISTERSCHAFT · LEHRPLAN 12–25 JAHRE',
    'hero.headline': 'Formeln meistern. Textaufgaben lösen. Level steigen.',
    'hero.subtitle': 'Von Schulalgebra bis zu fortgeschrittenen Differentialgleichungen. Lösen Sie echte Lehrbuch-Aufgaben.',
    'hero.selectStage': 'Wählen Sie Ihre Bildungsstufe:',
    'hero.btnProblems': 'Lehrbuch-Textaufgaben',
    'hero.btnRush': 'Schnell-Rush (45s)',
    'hero.btnTest': 'Diagnosetest-Zentrum',

    // Categories
    'cat.all': 'Alle Fachbereiche',
    'cat.trigonometry': 'Trigonometrie',
    'cat.algebra': 'Algebra',
    'cat.derivative': 'Ableitungen',
    'cat.integration': 'Integration',

    // Game (Formula Rush) & Guest Gate
    'rush.title': 'Formel-Rush: Schnell-Zuordnung',
    'rush.subtitle': 'Testen Sie Ihr Formel-Gedächtnis in 45 Sekunden.',
    'rush.best': 'Persönliche Bestleistung:',
    'rush.blitzTitle': '45-Sekunden Mathe-Blitz',
    'rush.blitzDesc': 'Vervollständigen Sie fehlende mathematische Identitäten so schnell wie möglich.',
    'rush.startBtn': 'Spiel starten',
    'rush.time': 'ZEIT',
    'rush.combos': 'KOMBO',
    'rush.rewards': 'BELOHNUNG',
    'rush.pts': 'Punkte',
    'rush.guestPromptTitle': 'Spieler-Identifikation erforderlich',
    'rush.guestPromptDesc': 'Wählen Sie, wie Sie am Formel-Rush teilnehmen möchten:',
    'rush.guestContinue': 'Als Gast spielen (Sofortspiel)',
    'rush.guestContinueDesc': 'Sofort spielen ohne Registrierung. Punkte werden nicht dauerhaft gespeichert.',
    'rush.signinRequired': 'Anmelden / Registrieren (Empfohlen)',
    'rush.signinRequiredDesc': 'Erforderlich, um Highscores, XP und offizielle Zertifikate dauerhaft zu sichern.',
    'rush.mandatoryToggle': 'Anmelde-Pflichtmodus',
    'rush.mandatoryToggleDesc': 'Erfordert Login vor Spielbeginn zur Sicherung des Lernerfolgs.',

    // Word Problems
    'wp.title': 'Lehrbuch-Textaufgaben',
    'wp.subtitle': 'Echte mehrstufige Aufgaben aus Physik, Ingenieurwesen und Wirtschaftsmathematik.',
    'wp.allChapters': 'Alle Buchkapitel',
    'wp.exercises': 'Übungen',
    'wp.scratchpad': 'Digitaler Notizblock',
    'wp.openScratchpad': 'Notizblock öffnen',
    'wp.hideScratchpad': 'Notizblock schließen',
    'wp.verifyBtn': 'Lösung überprüfen',
    'wp.nextBtn': 'Nächste Aufgabe',
    'wp.hints': 'Schrittweise Hinweise',
    'wp.revealHint': 'Hinweis aufdecken',
    'wp.resetProblem': 'Zurücksetzen',
    'wp.workedSolution': 'Vollständiger Lösungsweg:',

    // Test Center
    'test.title': 'Mathematisches Diagnose-Testzentrum',
    'test.subtitle': 'Zeitgesteuerte Prüfungen für Trigonometrie, Algebra, Ableitungen und Integrale.',
    'test.beginBtn': 'Prüfung starten',
    'test.submitBtn': 'Prüfung abgeben',
    'test.flag': 'Markieren',
    'test.previous': 'Zurück',
    'test.next': 'Weiter',

    // Progress Report
    'progress.title': 'Akademische Leistungsakte',
    'progress.accuracy': 'Gesamtgenauigkeit',
    'progress.wordProblemsSolved': 'Gelöste Aufgaben',
    'progress.examsCompleted': 'Absolvierte Prüfungen',
    'progress.domainMastery': 'Fachbereichs-Meisterschaft',
    'progress.reportCardBtn': 'Offizielles Zeugnis',
    'progress.guestBanner': 'Sie sind als Gast angemeldet. Registrieren Sie sich für dauerhafte Zeugnisse.'
  }
};

const STORAGE_LANG_KEY = 'axiom_math_lang_pref_v2';
const STORAGE_MANDATORY_AUTH_KEY = 'axiom_math_mandatory_auth_v2';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isMandatoryAuth: boolean;
  setIsMandatoryAuth: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY) as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [isMandatoryAuth, setIsMandatoryAuthState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MANDATORY_AUTH_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return false; // Default allows guest, but user can toggle mandatory mode
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  };

  const setIsMandatoryAuth = (val: boolean) => {
    setIsMandatoryAuthState(val);
    try {
      localStorage.setItem(STORAGE_MANDATORY_AUTH_KEY, JSON.stringify(val));
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isMandatoryAuth,
        setIsMandatoryAuth
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
