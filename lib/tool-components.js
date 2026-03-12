// Maps tool slugs to their client components.
// Only tools with custom components need to be listed here.
// Tools not listed will show the "Coming soon" placeholder.

import dynamic from "next/dynamic";

const components = {
  // ── Finance ─────────────────────────────────────────────
  "uk-tax-calculator": dynamic(() => import("@/components/finance-tools/UKTaxCalculator")),
  "vat-calculator": dynamic(() => import("@/components/finance-tools/VATCalculator")),
  "mortgage-calculator": dynamic(() => import("@/components/finance-tools/MortgageCalculator")),
  "savings-burndown": dynamic(() => import("@/components/finance-tools/SavingsBurndown")),
  "hourly-to-salary": dynamic(() => import("@/components/finance-tools/HourlyToSalary")),
  "tip-calculator": dynamic(() => import("@/components/finance-tools/TipCalculator")),
  "compound-interest-calculator": dynamic(() => import("@/components/finance-tools/CompoundInterestCalculator")),
  "loan-repayment-calculator": dynamic(() => import("@/components/finance-tools/LoanRepaymentCalculator")),
  "stamp-duty-calculator": dynamic(() => import("@/components/finance-tools/StampDutyCalculator")),
  "discount-calculator": dynamic(() => import("@/components/finance-tools/DiscountCalculator")),
  "markup-calculator": dynamic(() => import("@/components/finance-tools/MarkupCalculator")),
  "profit-margin-calculator": dynamic(() => import("@/components/finance-tools/ProfitMarginCalculator")),
  "roi-calculator": dynamic(() => import("@/components/finance-tools/ROICalculator")),
  "pay-rise-calculator": dynamic(() => import("@/components/finance-tools/PayRiseCalculator")),
  "inflation-calculator": dynamic(() => import("@/components/finance-tools/InflationCalculator")),
  "retirement-countdown": dynamic(() => import("@/components/finance-tools/RetirementCountdown")),

  // ── Converters — Weight ─────────────────────────────────
  "kg-to-lbs": dynamic(() => import("@/components/converter-tools/KgToLbs")),
  "lbs-to-kg": dynamic(() => import("@/components/converter-tools/LbsToKg")),
  "stone-to-kg": dynamic(() => import("@/components/converter-tools/StoneToKg")),
  "kg-to-stone": dynamic(() => import("@/components/converter-tools/KgToStone")),
  "oz-to-grams": dynamic(() => import("@/components/converter-tools/OzToGrams")),
  "grams-to-oz": dynamic(() => import("@/components/converter-tools/GramsToOz")),
  "stone-to-lbs": dynamic(() => import("@/components/converter-tools/StoneToLbs")),
  "lbs-to-stone": dynamic(() => import("@/components/converter-tools/LbsToStone")),

  // ── Converters — Temperature & Length ───────────────────
  "celsius-to-fahrenheit": dynamic(() => import("@/components/converter-tools/CelsiusToFahrenheit")),
  "fahrenheit-to-celsius": dynamic(() => import("@/components/converter-tools/FahrenheitToCelsius")),
  "cm-to-inches": dynamic(() => import("@/components/converter-tools/CmToInches")),
  "inches-to-cm": dynamic(() => import("@/components/converter-tools/InchesToCm")),
  "feet-to-metres": dynamic(() => import("@/components/converter-tools/FeetToMetres")),
  "metres-to-feet": dynamic(() => import("@/components/converter-tools/MetresToFeet")),

  // ── Converters — Cooking / Volume ──────────────────────
  "grams-to-cups": dynamic(() => import("@/components/converter-tools/GramsToCups")),
  "cups-to-grams": dynamic(() => import("@/components/converter-tools/CupsToGrams")),
  "cups-to-ml": dynamic(() => import("@/components/converter-tools/CupsToMl")),
  "ml-to-cups": dynamic(() => import("@/components/converter-tools/MlToCups")),
  "tbsp-to-ml": dynamic(() => import("@/components/converter-tools/TbspToMl")),
  "pints-to-litres": dynamic(() => import("@/components/converter-tools/PintsToLitres")),
  "litres-to-pints": dynamic(() => import("@/components/converter-tools/LitresToPints")),
  "gallons-to-litres": dynamic(() => import("@/components/converter-tools/GallonsToLitres")),
  "litres-to-gallons": dynamic(() => import("@/components/converter-tools/LitresToGallons")),
  "tsp-to-ml": dynamic(() => import("@/components/converter-tools/TspToMl")),
  "ml-to-tsp": dynamic(() => import("@/components/converter-tools/MlToTsp")),

  // ── Converters — Distance & Speed ──────────────────────
  "miles-to-km": dynamic(() => import("@/components/converter-tools/MilesToKm")),
  "km-to-miles": dynamic(() => import("@/components/converter-tools/KmToMiles")),
  "mph-to-kph": dynamic(() => import("@/components/converter-tools/MphToKph")),
  "kph-to-mph": dynamic(() => import("@/components/converter-tools/KphToMph")),
  "steps-to-miles": dynamic(() => import("@/components/converter-tools/StepsToMiles")),
  "miles-to-steps": dynamic(() => import("@/components/converter-tools/MilesToSteps")),

  // ── Health & Fitness ───────────────────────────────────
  "bmi-calculator": dynamic(() => import("@/components/health-tools/BmiCalculator")),
  "tdee-calculator": dynamic(() => import("@/components/health-tools/TDEECalculator")),
  "calorie-deficit-calculator": dynamic(() => import("@/components/health-tools/CalorieDeficitCalculator")),
  "protein-intake-calculator": dynamic(() => import("@/components/health-tools/ProteinIntakeCalculator")),
  "body-fat-calculator": dynamic(() => import("@/components/health-tools/BodyFatCalculator")),
  "pregnancy-due-date-calculator": dynamic(() => import("@/components/health-tools/PregnancyDueDateCalculator")),
  "water-intake-calculator": dynamic(() => import("@/components/health-tools/WaterIntakeCalculator")),
  "heart-rate-zone-calculator": dynamic(() => import("@/components/health-tools/HeartRateZoneCalculator")),
  "ideal-weight-calculator": dynamic(() => import("@/components/health-tools/IdealWeightCalculator")),

  // ── Date & Time ────────────────────────────────────────
  "age-calculator": dynamic(() => import("@/components/datetime-tools/AgeCalculator")),
  "date-difference-calculator": dynamic(() => import("@/components/datetime-tools/DateDifferenceCalculator")),
  "days-until-calculator": dynamic(() => import("@/components/datetime-tools/DaysUntilCalculator")),
  "work-hours-calculator": dynamic(() => import("@/components/datetime-tools/WorkHoursCalculator")),
  "sleep-calculator": dynamic(() => import("@/components/datetime-tools/SleepCalculator")),
  "unix-timestamp-converter": dynamic(() => import("@/components/datetime-tools/UnixTimestampConverter")),
  "timezone-converter": dynamic(() => import("@/components/datetime-tools/TimezoneConverter")),
  "time-calculator": dynamic(() => import("@/components/datetime-tools/TimeCalculator")),
  "custom-countdown": dynamic(() => import("@/components/datetime-tools/CustomCountdown")),
  "birthday-countdown": dynamic(() => import("@/components/datetime-tools/BirthdayCountdown")),

  // ── Developer Tools ────────────────────────────────────
  "password-generator": dynamic(() => import("@/components/developer-tools/PasswordGenerator")),
  "cron-builder": dynamic(() => import("@/components/developer-tools/CronBuilder")),
  "wifi-qr-generator": dynamic(() => import("@/components/home-tools/WifiQRCodeGenerator")),
  "json-formatter": dynamic(() => import("@/components/developer-tools/JSONFormatter")),
  "base64-converter": dynamic(() => import("@/components/developer-tools/Base64Converter")),
  "url-encoder": dynamic(() => import("@/components/developer-tools/URLEncoder")),
  "uuid-generator": dynamic(() => import("@/components/developer-tools/UUIDGenerator")),
  "hash-generator": dynamic(() => import("@/components/developer-tools/HashGenerator")),
  "lorem-ipsum-generator": dynamic(() => import("@/components/developer-tools/LoremIpsumGenerator")),
  "meta-tag-previewer": dynamic(() => import("@/components/developer-tools/MetaTagPreviewer")),
  "robots-txt-generator": dynamic(() => import("@/components/developer-tools/RobotsTxtGenerator")),
  "markdown-preview": dynamic(() => import("@/components/developer-tools/MarkdownPreview")),
  "regex-tester": dynamic(() => import("@/components/developer-tools/RegexTester")),

  // ── Text Tools ─────────────────────────────────────────
  "word-counter": dynamic(() => import("@/components/text-tools/WordCounter")),
  "case-converter": dynamic(() => import("@/components/text-tools/CaseConverter")),
  "text-diff": dynamic(() => import("@/components/text-tools/TextDiff")),
  "character-counter": dynamic(() => import("@/components/text-tools/CharacterCounter")),
  "string-repeater": dynamic(() => import("@/components/text-tools/StringRepeater")),
  "remove-duplicate-lines": dynamic(() => import("@/components/text-tools/RemoveDuplicateLines")),

  // ── Maths & Science ────────────────────────────────────
  "percentage-calculator": dynamic(() => import("@/components/maths-tools/PercentageCalculator")),
  "cubic-feet-calculator": dynamic(() => import("@/components/maths-tools/CubicFeetCalculator")),
  "area-calculator": dynamic(() => import("@/components/maths-tools/AreaCalculator")),
  "fraction-calculator": dynamic(() => import("@/components/maths-tools/FractionCalculator")),
  "random-number-generator": dynamic(() => import("@/components/maths-tools/RandomNumberGenerator")),
  "standard-deviation-calculator": dynamic(() => import("@/components/maths-tools/StandardDeviationCalculator")),
  "pythagorean-theorem-calculator": dynamic(() => import("@/components/maths-tools/PythagoreanCalculator")),
  "percent-change-calculator": dynamic(() => import("@/components/maths-tools/PercentChangeCalculator")),
  "percentage-increase-calculator": dynamic(() => import("@/components/maths-tools/PercentageIncreaseCalculator")),
  "percentage-decrease-calculator": dynamic(() => import("@/components/maths-tools/PercentageDecreaseCalculator")),
  "percentage-difference-calculator": dynamic(() => import("@/components/maths-tools/PercentageDifferenceCalculator")),
  "mixed-numbers-calculator": dynamic(() => import("@/components/maths-tools/MixedNumbersCalculator")),

  // ── Home & Property ────────────────────────────────────
  "paint-calculator": dynamic(() => import("@/components/home-tools/PaintCalculator")),
  "electricity-cost-calculator": dynamic(() => import("@/components/home-tools/ElectricityCostCalculator")),
  "tile-calculator": dynamic(() => import("@/components/home-tools/TileCalculator")),
  "square-footage-calculator": dynamic(() => import("@/components/home-tools/SquareFootageCalculator")),
  "construction-calculator": dynamic(() => import("@/components/home-tools/ConstructionCalculator")),

  // ── Cooking ────────────────────────────────────────────
  "oven-temperature-converter": dynamic(() => import("@/components/cooking-tools/OvenTemperatureConverter")),
  "recipe-scaler": dynamic(() => import("@/components/cooking-tools/RecipeScaler")),
  "recipe-unit-converter": dynamic(() => import("@/components/cooking-tools/RecipeUnitConverter")),

  // ── Fun & Viral ────────────────────────────────────────
  "pop-star-name-generator": dynamic(() => import("@/components/fun-tools/PopStarNameGenerator")),
  "rapper-name-generator": dynamic(() => import("@/components/fun-tools/RapperNameGenerator")),
  "pirate-name-generator": dynamic(() => import("@/components/fun-tools/PirateNameGenerator")),
  "superhero-name-generator": dynamic(() => import("@/components/fun-tools/SuperheroNameGenerator")),
  "band-name-generator": dynamic(() => import("@/components/fun-tools/BandNameGenerator")),
  "salary-visualizer": dynamic(() => import("@/components/fun-tools/SalaryVisualizer")),
  "life-stats": dynamic(() => import("@/components/fun-tools/LifeStats")),

  // ── Creative ───────────────────────────────────────────
  "contrast-checker": dynamic(() => import("@/components/creative-tools/ContrastChecker")),
  "interior-palette-creator": dynamic(() => import("@/components/creative-tools/InteriorPaletteCreator")),

  // ── Wedding ───────────────────────────────────────────
  "wedding-seating-planner": dynamic(() => import("@/components/wedding-tools/WeddingSeatingPlanner")),

  // ── Games & Entertainment ─────────────────────────────
  "dice-roller": dynamic(() => import("@/components/games-tools/DiceRoller")),
  "coin-flip": dynamic(() => import("@/components/games-tools/CoinFlip")),
  "number-picker": dynamic(() => import("@/components/games-tools/RandomNumberGenerator")),
  "would-you-rather": dynamic(() => import("@/components/games-tools/WouldYouRather")),
  "truth-or-dare": dynamic(() => import("@/components/games-tools/TruthOrDare")),
  "never-have-i-ever": dynamic(() => import("@/components/games-tools/NeverHaveIEver")),
  "spin-the-wheel": dynamic(() => import("@/components/games-tools/SpinTheWheel")),
  "rock-paper-scissors": dynamic(() => import("@/components/games-tools/RockPaperScissors")),
  "trivia-quiz": dynamic(() => import("@/components/games-tools/TriviaQuiz")),
  "charades-generator": dynamic(() => import("@/components/games-tools/CharadesGenerator")),
  "guess-the-name-game": dynamic(() => import("@/components/games-tools/GuessTheNameGame")),
  "bingo-card-generator": dynamic(() => import("@/components/games-tools/BingoCardGenerator")),
  "raffle-ticket-picker": dynamic(() => import("@/components/games-tools/RaffleTicketPicker")),
  "random-name-picker": dynamic(() => import("@/components/games-tools/RandomNamePicker")),
  "random-number-picker": dynamic(() => import("@/components/games-tools/RandomNumberPicker")),

  // ── Parenting ─────────────────────────────────────────
  "baby-name-generator": dynamic(() => import("@/components/parenting-tools/BabyNameGenerator")),
  "chore-chart-generator": dynamic(() => import("@/components/parenting-tools/ChoreChartGenerator")),
  "screen-time-calculator": dynamic(() => import("@/components/parenting-tools/ScreenTimeCalculator")),
  "baby-due-date-countdown": dynamic(() => import("@/components/parenting-tools/BabyDueDateCountdown")),

  // ── Education ─────────────────────────────────────────
  "grade-calculator": dynamic(() => import("@/components/education-tools/GradeCalculator")),
  "reading-level-checker": dynamic(() => import("@/components/education-tools/ReadingLevelChecker")),
  "flashcard-maker": dynamic(() => import("@/components/education-tools/FlashcardMaker")),

  // ── Travel ────────────────────────────────────────────
  "packing-list-generator": dynamic(() => import("@/components/travel-tools/PackingListGenerator")),
  "timezone-meeting-planner": dynamic(() => import("@/components/travel-tools/TimezoneMeetingPlanner")),
  "travel-budget-calculator": dynamic(() => import("@/components/travel-tools/TravelBudgetCalculator")),
  "holiday-countdown": dynamic(() => import("@/components/travel-tools/HolidayCountdown")),

  // ── Business ──────────────────────────────────────────
  "business-profit-calculator": dynamic(() => import("@/components/business-tools/ProfitMarginCalculator")),
  "meeting-cost-calculator": dynamic(() => import("@/components/business-tools/MeetingCostCalculator")),
  "email-subject-line-tester": dynamic(() => import("@/components/business-tools/EmailSubjectLineTester")),

  // ── Seasonal ───────────────────────────────────────────
  "christmas-countdown": dynamic(() => import("@/components/seasonal-tools/ChristmasCountdown")),
  "halloween-costume-generator": dynamic(() => import("@/components/seasonal-tools/HalloweenCostumeGenerator")),
  "new-year-resolution-generator": dynamic(() => import("@/components/seasonal-tools/NewYearResolutionGenerator")),
  "new-year-countdown": dynamic(() => import("@/components/seasonal-tools/NewYearCountdown")),

  // ── Automotive ────────────────────────────────────────
  "fuel-cost-calculator": dynamic(() => import("@/components/automotive-tools/FuelCostCalculator")),
  "tyre-size-calculator": dynamic(() => import("@/components/automotive-tools/TyreSizeCalculator")),
  "car-loan-calculator": dynamic(() => import("@/components/automotive-tools/CarLoanCalculator")),

  // ── Creative (additional) ──────────────────────────────
  "font-pair-suggester": dynamic(() => import("@/components/creative-tools/FontPairSuggester")),

  // ── Wedding (additional) ───────────────────────────────
  "wedding-budget-calculator": dynamic(() => import("@/components/wedding-tools/WeddingBudgetCalculator")),
  "wedding-countdown": dynamic(() => import("@/components/wedding-tools/WeddingCountdown")),

  // ── QR Code ──────────────────────────────────────────
  "qr-code-generator": dynamic(() => import("@/components/developer-tools/QRCodeGenerator")),

  // ── Cooking — New ──────────────────────────────────────
  "recipe-scaler": dynamic(() => import("@/components/cooking-tools/RecipeScaler")),
  "cooking-time-calculator": dynamic(() => import("@/components/cooking-tools/CookingTimeCalculator")),
  "baking-substitution-finder": dynamic(() => import("@/components/cooking-tools/BakingSubstitutionFinder")),
  "cake-tin-converter": dynamic(() => import("@/components/cooking-tools/CakeTinConverter")),
  "coffee-ratio-calculator": dynamic(() => import("@/components/cooking-tools/CoffeeRatioCalculator")),
  "cups-to-grams-flour": dynamic(() => import("@/components/cooking-tools/CupsToGramsFlour")),
  "cups-to-grams-sugar": dynamic(() => import("@/components/cooking-tools/CupsToGramsSugar")),
  "cups-to-grams-butter": dynamic(() => import("@/components/cooking-tools/CupsToGramsButter")),
  "cups-to-grams-rice": dynamic(() => import("@/components/cooking-tools/CupsToGramsRice")),
  "cups-to-grams-oats": dynamic(() => import("@/components/cooking-tools/CupsToGramsOats")),

  // ── Home & DIY — New ───────────────────────────────────
  "paint-calculator": dynamic(() => import("@/components/home-tools/PaintCalculator")),
  "tile-calculator": dynamic(() => import("@/components/home-tools/TileCalculator")),
  "wallpaper-calculator": dynamic(() => import("@/components/home-tools/WallpaperCalculator")),
  "fence-calculator": dynamic(() => import("@/components/home-tools/FenceCalculator")),
  "gravel-calculator": dynamic(() => import("@/components/home-tools/GravelCalculator")),
  "concrete-calculator": dynamic(() => import("@/components/home-tools/ConcreteCalculator")),

  // ── Lottery Pickers ────────────────────────────────────
  "uk-lotto-number-picker": dynamic(() => import("@/components/games-tools/UKLottoPicker")),
  "euromillions-number-picker": dynamic(() => import("@/components/games-tools/EuroMillionsPicker")),
  "thunderball-number-picker": dynamic(() => import("@/components/games-tools/ThunderballPicker")),
  "set-for-life-number-picker": dynamic(() => import("@/components/games-tools/SetForLifePicker")),
  "powerball-number-picker": dynamic(() => import("@/components/games-tools/PowerballPicker")),
  "mega-millions-number-picker": dynamic(() => import("@/components/games-tools/MegaMillionsPicker")),

  // ── Quiz & Self-Discovery ─────────────────────────────
  "big-five-personality-test": dynamic(() => import("@/components/quiz-tools/BigFivePersonalityTest")),
  "attachment-style-quiz": dynamic(() => import("@/components/quiz-tools/AttachmentStyleQuiz")),
  "love-language-quiz": dynamic(() => import("@/components/quiz-tools/LoveLanguageQuiz")),
  "self-esteem-scale": dynamic(() => import("@/components/quiz-tools/SelfEsteemScale")),
  "depression-screening-phq9": dynamic(() => import("@/components/quiz-tools/DepressionScreening")),
  "anxiety-screening-gad7": dynamic(() => import("@/components/quiz-tools/AnxietyScreening")),
  "narcissism-test": dynamic(() => import("@/components/quiz-tools/NarcissismTest")),
  "emotional-intelligence-quiz": dynamic(() => import("@/components/quiz-tools/EmotionalIntelligenceQuiz")),
  "crush-quiz": dynamic(() => import("@/components/quiz-tools/CrushQuiz")),
  "red-flags-quiz": dynamic(() => import("@/components/quiz-tools/RedFlagsQuiz")),
  "communication-style-quiz": dynamic(() => import("@/components/quiz-tools/CommunicationStyleQuiz")),

  // ── Sports & Fitness ──────────────────────────────────
  "betting-odds-calculator": dynamic(() => import("@/components/sports-tools/BettingOddsCalculator")),
  "darts-score-tracker": dynamic(() => import("@/components/sports-tools/DartsScoreTracker")),
  "tournament-bracket-generator": dynamic(() => import("@/components/sports-tools/TournamentBracketGenerator")),
  "running-training-plan": dynamic(() => import("@/components/sports-tools/RunningTrainingPlan")),
  "golf-handicap-calculator": dynamic(() => import("@/components/sports-tools/GolfHandicapCalculator")),

  // ── Health — Nutrition ─────────────────────────────────
  "macro-calculator": dynamic(() => import("@/components/health-tools/MacroCalculator")),

  // ── 200 Club ───────────────────────────────────────────
  "invoice-generator": dynamic(() => import("@/components/business-tools/InvoiceGenerator")),
  "colour-palette-generator": dynamic(() => import("@/components/creative-tools/ColourPaletteGenerator")),
  "pomodoro-timer": dynamic(() => import("@/components/datetime-tools/PomodoroTimer")),
  "sudoku-generator": dynamic(() => import("@/components/games-tools/SudokuGenerator")),
  "mortgage-affordability-calculator": dynamic(() => import("@/components/finance-tools/MortgageAffordabilityCalculator")),
  "unit-price-calculator": dynamic(() => import("@/components/home-tools/UnitPriceCalculator")),
  "aspect-ratio-calculator": dynamic(() => import("@/components/creative-tools/AspectRatioCalculator")),
  "baby-growth-calculator": dynamic(() => import("@/components/parenting-tools/BabyGrowthCalculator")),
  "readability-checker": dynamic(() => import("@/components/text-tools/ReadabilityChecker")),

  // ── Batch 1: Education + Word Searches ─────────────────
  "word-search-generator": dynamic(() => import("@/components/education-tools/WordSearchGenerator")),
  "christmas-word-search": dynamic(() => import("@/components/education-tools/ChristmasWordSearch")),
  "halloween-word-search": dynamic(() => import("@/components/education-tools/HalloweenWordSearch")),
  "animals-word-search": dynamic(() => import("@/components/education-tools/AnimalsWordSearch")),
  "word-scramble-generator": dynamic(() => import("@/components/education-tools/WordScrambleGenerator")),
  "handwriting-practice-sheet": dynamic(() => import("@/components/education-tools/HandwritingPracticeSheet")),
  "spelling-test-generator": dynamic(() => import("@/components/education-tools/SpellingTestGenerator")),
  "times-tables-practice": dynamic(() => import("@/components/education-tools/TimesTablesPractice")),
  "maths-worksheet-generator": dynamic(() => import("@/components/education-tools/MathsWorksheetGenerator")),
  "citation-generator": dynamic(() => import("@/components/education-tools/CitationGenerator")),

  // ── Batch 2: UK Finance Cluster ───────────────────────────
  "uk-dividend-tax-calculator": dynamic(() => import("@/components/finance-tools/DividendTaxCalculator")),
  "uk-capital-gains-tax-calculator": dynamic(() => import("@/components/finance-tools/CapitalGainsTaxCalculator")),
  "uk-inheritance-tax-calculator": dynamic(() => import("@/components/finance-tools/InheritanceTaxCalculator")),
  "uk-student-loan-calculator": dynamic(() => import("@/components/finance-tools/StudentLoanCalculator")),
  "uk-pension-calculator": dynamic(() => import("@/components/finance-tools/PensionCalculator")),
  "uk-salary-sacrifice-calculator": dynamic(() => import("@/components/finance-tools/SalarySacrificeCalculator")),
  "uk-self-assessment-estimator": dynamic(() => import("@/components/finance-tools/SelfAssessmentEstimator")),
  "uk-buy-to-let-calculator": dynamic(() => import("@/components/finance-tools/BuyToLetCalculator")),
};

export function getToolComponent(slug) {
  return components[slug] || null;
}
