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

  // ── Unpaid Work Value Calculators (Viral Parenting Cluster)
  "stay-at-home-mum-calculator": dynamic(() => import("@/components/parenting-tools/StayAtHomeParentCalculator")),
  "stay-at-home-mom-calculator": dynamic(() => import("@/components/parenting-tools/StayAtHomeParentCalculator")),
  "emotional-labour-calculator": dynamic(() => import("@/components/parenting-tools/EmotionalLabourCalculator")),
  "breastfeeding-calculator": dynamic(() => import("@/components/parenting-tools/BreastfeedingCalculator")),
  "household-task-split": dynamic(() => import("@/components/parenting-tools/HouseholdTaskSplit")),
  "cost-of-raising-a-child": dynamic(() => import("@/components/parenting-tools/CostOfRaisingChild")),
  "grandparent-childcare-calculator": dynamic(() => import("@/components/parenting-tools/GrandparentChildcareCalculator")),
  "career-sacrifice-calculator": dynamic(() => import("@/components/parenting-tools/CareerSacrificeCalculator")),

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
  "drive-vs-train-cost": dynamic(() => import("@/components/travel-tools/DriveVsTrainCost")),

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

  // ── Converters — New Batch ───────────────────────────────
  "mm-to-inches": dynamic(() => import("@/components/converter-tools/MmToInches")),
  "inches-to-mm": dynamic(() => import("@/components/converter-tools/InchesToMm")),
  "metres-to-yards": dynamic(() => import("@/components/converter-tools/MetresToYards")),
  "yards-to-metres": dynamic(() => import("@/components/converter-tools/YardsToMetres")),
  "mm-to-cm": dynamic(() => import("@/components/converter-tools/MmToCm")),
  "cm-to-mm": dynamic(() => import("@/components/converter-tools/CmToMm")),
  "metres-to-km": dynamic(() => import("@/components/converter-tools/MetresToKm")),
  "km-to-metres": dynamic(() => import("@/components/converter-tools/KmToMetres")),
  "feet-to-inches": dynamic(() => import("@/components/converter-tools/FeetToInches")),
  "inches-to-feet": dynamic(() => import("@/components/converter-tools/InchesToFeet")),
  "oz-to-ml": dynamic(() => import("@/components/converter-tools/OzToMl")),
  "ml-to-oz": dynamic(() => import("@/components/converter-tools/MlToOz")),
  "grams-to-kg": dynamic(() => import("@/components/converter-tools/GramsToKg")),
  "kg-to-grams": dynamic(() => import("@/components/converter-tools/KgToGrams")),
  "miles-to-metres": dynamic(() => import("@/components/converter-tools/MilesToMetres")),
  "metres-to-miles": dynamic(() => import("@/components/converter-tools/MetresToMiles")),
  "celsius-to-kelvin": dynamic(() => import("@/components/converter-tools/CelsiusToKelvin")),
  "kelvin-to-celsius": dynamic(() => import("@/components/converter-tools/KelvinToCelsius")),
  "cups-to-tbsp": dynamic(() => import("@/components/converter-tools/CupsToTbsp")),
  "tbsp-to-cups": dynamic(() => import("@/components/converter-tools/TbspToCups")),
  "tbsp-to-tsp": dynamic(() => import("@/components/converter-tools/TbspToTsp")),
  "tsp-to-tbsp": dynamic(() => import("@/components/converter-tools/TspToTbsp")),
  "lbs-to-oz": dynamic(() => import("@/components/converter-tools/LbsToOz")),
  "oz-to-lbs": dynamic(() => import("@/components/converter-tools/OzToLbs")),

  // ── Quality Tier 2 — New Batch ───────────────────────────
  "mortgage-overpayment-calculator": dynamic(() => import("@/components/finance-tools/MortgageOverpaymentCalculator")),
  "debt-snowball-calculator": dynamic(() => import("@/components/finance-tools/DebtSnowballCalculator")),
  "colour-contrast-checker-pro": dynamic(() => import("@/components/creative-tools/ColourContrastCheckerPro")),
  "energy-cost-calculator": dynamic(() => import("@/components/home-tools/EnergyCostCalculator")),

  // ── Tier 2 Batch — Finance & Utility ───────────────────────
  "split-bill-calculator": dynamic(() => import("@/components/finance-tools/SplitBillCalculator")),
  "savings-goal-calculator": dynamic(() => import("@/components/finance-tools/SavingsGoalCalculator")),
  "salary-breakdown-visualiser": dynamic(() => import("@/components/finance-tools/SalaryBreakdownVisualiser")),
  "rent-vs-buy-calculator": dynamic(() => import("@/components/finance-tools/RentVsBuyCalculator")),

  // ── Tier 2 Batch — Developer ────────────────────────────────
  "pixel-to-rem-converter": dynamic(() => import("@/components/developer-tools/PixelToRemConverter")),
  "box-shadow-generator": dynamic(() => import("@/components/developer-tools/BoxShadowGenerator")),
  "gradient-generator": dynamic(() => import("@/components/developer-tools/GradientGenerator")),

  // ── Tier 2 Batch — Home & Wedding ──────────────────────────
  "electricity-bill-estimator": dynamic(() => import("@/components/home-tools/ElectricityBillEstimator")),
  "screen-size-calculator": dynamic(() => import("@/components/maths-tools/ScreenSizeCalculator")),
  "wedding-guest-list-manager": dynamic(() => import("@/components/wedding-tools/WeddingGuestListManager")),

  // ── Canvas API Creative Tools ──────────────────────────────
  "signature-pad": dynamic(() => import("@/components/creative-tools/SignaturePad")),
  "pixel-art-maker": dynamic(() => import("@/components/creative-tools/PixelArtMaker")),
  "meme-generator": dynamic(() => import("@/components/creative-tools/MemeGenerator")),
  "photo-filter-tool": dynamic(() => import("@/components/creative-tools/PhotoFilterTool")),
  "whiteboard": dynamic(() => import("@/components/creative-tools/Whiteboard")),

  // ── Image Editing Tools ────────────────────────────────────
  "pixelate-image": dynamic(() => import("@/components/creative-tools/PixelateImage")),
  "image-resizer": dynamic(() => import("@/components/creative-tools/ImageResizer")),
  "image-compressor": dynamic(() => import("@/components/creative-tools/ImageCompressor")),
  "rotate-image": dynamic(() => import("@/components/creative-tools/RotateImage")),
  "flip-image": dynamic(() => import("@/components/creative-tools/FlipImage")),
  "crop-image": dynamic(() => import("@/components/creative-tools/CropImage")),
  "png-to-jpg": dynamic(() => import("@/components/creative-tools/PngToJpg")),
  "jpg-to-png": dynamic(() => import("@/components/creative-tools/JpgToPng")),
  "invert-image-colors": dynamic(() => import("@/components/creative-tools/InvertImageColors")),
  "sepia-filter": dynamic(() => import("@/components/creative-tools/SepiaFilter")),
  "adjust-image-brightness": dynamic(() => import("@/components/creative-tools/AdjustImageBrightness")),
  "adjust-image-contrast": dynamic(() => import("@/components/creative-tools/AdjustImageContrast")),
  "webp-to-jpg": dynamic(() => import("@/components/creative-tools/WebpToJpg")),
  "jpg-to-webp": dynamic(() => import("@/components/creative-tools/JpgToWebp")),
  "png-to-webp": dynamic(() => import("@/components/creative-tools/PngToWebp")),
  "webp-to-png": dynamic(() => import("@/components/creative-tools/WebpToPng")),
  "emoji-search": dynamic(() => import("@/components/creative-tools/EmojiSearch")),

  // ── Developer Tools (Batch 2) ───────────────────────────────
  "image-to-base64": dynamic(() => import("@/components/developer-tools/ImageToBase64")),
  "base64-to-image": dynamic(() => import("@/components/developer-tools/Base64ToImage")),
  "json-prettifier": dynamic(() => import("@/components/developer-tools/JsonPrettifier")),
  "json-minifier": dynamic(() => import("@/components/developer-tools/JsonMinifier")),
  "json-validator": dynamic(() => import("@/components/developer-tools/JsonValidator")),
  "html-encoder-decoder": dynamic(() => import("@/components/developer-tools/HtmlEncoderDecoder")),
  "markdown-to-html": dynamic(() => import("@/components/developer-tools/MarkdownToHtml")),

  // ── Text & Maths Tools (Batch 2) ───────────────────────────
  "sum-calculator": dynamic(() => import("@/components/maths-tools/SumCalculator")),
  "word-randomizer": dynamic(() => import("@/components/text-tools/WordRandomizer")),
  "sort-lines": dynamic(() => import("@/components/text-tools/SortLines")),
  "extract-emails": dynamic(() => import("@/components/text-tools/ExtractEmails")),
  "extract-urls": dynamic(() => import("@/components/text-tools/ExtractUrls")),
  "number-to-words": dynamic(() => import("@/components/maths-tools/NumberToWords")),

  // ── Batch 3 — Image, Developer, Creative, Fun ──────────────
  "online-timer": dynamic(() => import("@/components/datetime-tools/OnlineTimer")),
  "reduce-image-quality": dynamic(() => import("@/components/creative-tools/ReduceImageQuality")),
  "rainbow-filter": dynamic(() => import("@/components/creative-tools/RainbowFilter")),
  "background-remover": dynamic(() => import("@/components/creative-tools/BackgroundRemover")),
  "blur-image": dynamic(() => import("@/components/creative-tools/BlurImage")),
  "sharpen-image": dynamic(() => import("@/components/creative-tools/SharpenImage")),
  "add-text-to-image": dynamic(() => import("@/components/creative-tools/AddTextToImage")),
  "add-watermark-to-image": dynamic(() => import("@/components/creative-tools/AddWatermarkToImage")),
  "image-color-picker": dynamic(() => import("@/components/creative-tools/ImageColorPicker")),
  "json-to-csv": dynamic(() => import("@/components/developer-tools/JsonToCsv")),
  "csv-to-json": dynamic(() => import("@/components/developer-tools/CsvToJson")),
  "ascii-art-generator": dynamic(() => import("@/components/creative-tools/AsciiArtGenerator")),
  "color-palette-from-image": dynamic(() => import("@/components/creative-tools/ColorPaletteFromImage")),
  "qr-code-reader": dynamic(() => import("@/components/developer-tools/QrCodeReader")),
  "image-to-pdf": dynamic(() => import("@/components/creative-tools/ImageToPdf")),
  "favicon-generator": dynamic(() => import("@/components/creative-tools/FaviconGenerator")),
  "color-picker": dynamic(() => import("@/components/creative-tools/ColorPicker")),
  "heic-to-jpg": dynamic(() => import("@/components/creative-tools/HeicToJpg")),
  "typing-speed-test": dynamic(() => import("@/components/fun-tools/TypingSpeedTest")),
  "image-dimensions": dynamic(() => import("@/components/creative-tools/ImageDimensions")),

  // ── Batch 4 — Text, CSV, Developer, Image ──────────────────
  "adjust-image-saturation": dynamic(() => import("@/components/creative-tools/AdjustImageSaturation")),
  "adjust-image-hue": dynamic(() => import("@/components/creative-tools/AdjustImageHue")),
  "gif-to-png": dynamic(() => import("@/components/creative-tools/GifToPng")),
  "image-to-data-uri": dynamic(() => import("@/components/developer-tools/ImageToDataUri")),
  "json-escape": dynamic(() => import("@/components/developer-tools/JsonEscape")),
  "json-to-text": dynamic(() => import("@/components/developer-tools/JsonToText")),
  "csv-column-extractor": dynamic(() => import("@/components/developer-tools/CsvColumnExtractor")),
  "csv-delimiter-changer": dynamic(() => import("@/components/developer-tools/CsvDelimiterChanger")),
  "csv-validator": dynamic(() => import("@/components/developer-tools/CsvValidator")),
  "csv-transpose": dynamic(() => import("@/components/developer-tools/CsvTranspose")),
  "msn-text-generator": dynamic(() => import("@/components/text-tools/MsnTextGenerator")),
  "zalgo-text-generator": dynamic(() => import("@/components/text-tools/ZalgoTextGenerator")),
  "rot13-encoder": dynamic(() => import("@/components/text-tools/Rot13Encoder")),
  "word-reverser": dynamic(() => import("@/components/text-tools/WordReverser")),
  "text-repeater": dynamic(() => import("@/components/text-tools/TextRepeater")),
  "add-line-numbers": dynamic(() => import("@/components/text-tools/AddLineNumbers")),
  "remove-empty-lines": dynamic(() => import("@/components/text-tools/RemoveEmptyLines")),
  "line-prefix-suffix": dynamic(() => import("@/components/text-tools/LinePrefixSuffix")),
  "remove-extra-spaces": dynamic(() => import("@/components/text-tools/RemoveExtraSpaces")),
  "string-to-binary": dynamic(() => import("@/components/developer-tools/StringToBinary")),
  "html-to-text": dynamic(() => import("@/components/developer-tools/HtmlToText")),

  // ── Kids Activities (Batch 3) ────────────────────────────────
  "easter-egg-hunt-clue-generator": dynamic(() => import("@/components/parenting-tools/EasterEggHuntClueGenerator")),
  "christmas-treasure-hunt-generator": dynamic(() => import("@/components/parenting-tools/ChristmasTreasureHuntGenerator")),
  "birthday-party-game-planner": dynamic(() => import("@/components/parenting-tools/BirthdayPartyGamePlanner")),
  "treasure-hunt-clue-generator": dynamic(() => import("@/components/parenting-tools/TreasureHuntClueGenerator")),
  "pass-the-parcel-forfeit-generator": dynamic(() => import("@/components/parenting-tools/PassTheParcelForfeitGenerator")),
  "kids-activity-spinner": dynamic(() => import("@/components/parenting-tools/KidsActivitySpinner")),
  "scavenger-hunt-generator": dynamic(() => import("@/components/parenting-tools/ScavengerHuntGenerator")),
  "rainy-day-schedule-generator": dynamic(() => import("@/components/parenting-tools/RainyDayScheduleGenerator")),
  "science-experiment-generator": dynamic(() => import("@/components/parenting-tools/ScienceExperimentGenerator")),
  "craft-project-generator": dynamic(() => import("@/components/parenting-tools/CraftProjectGenerator")),
  "elf-on-the-shelf-idea-generator": dynamic(() => import("@/components/parenting-tools/ElfOnTheShelfIdeaGenerator")),
  "advent-calendar-activity-generator": dynamic(() => import("@/components/parenting-tools/AdventCalendarActivityGenerator")),
  "halloween-scavenger-hunt": dynamic(() => import("@/components/parenting-tools/HalloweenScavengerHunt")),
  "phonics-treasure-hunt": dynamic(() => import("@/components/parenting-tools/PhonicsTreasureHunt")),
  "party-bag-checklist-generator": dynamic(() => import("@/components/parenting-tools/PartyBagChecklistGenerator")),

  // ── Quiz & Personality (Batch 4) ─────────────────────────────
  "which-decade-do-you-belong-in": dynamic(() => import("@/components/quiz-tools/WhichDecadeQuiz")),
  "what-type-of-friend-are-you": dynamic(() => import("@/components/quiz-tools/WhatTypeFriendQuiz")),
  "what-dog-breed-are-you": dynamic(() => import("@/components/quiz-tools/WhatDogBreedQuiz")),
  "what-career-suits-you": dynamic(() => import("@/components/quiz-tools/WhatCareerSuitsYouQuiz")),
  "how-british-are-you": dynamic(() => import("@/components/quiz-tools/HowBritishQuiz")),
  "hogwarts-house-quiz": dynamic(() => import("@/components/quiz-tools/HogwartsHouseQuiz")),
  "introvert-extrovert-scale": dynamic(() => import("@/components/quiz-tools/IntrovertExtrovertScale")),
  "stress-level-assessment": dynamic(() => import("@/components/quiz-tools/StressLevelAssessment")),
  "what-element-are-you": dynamic(() => import("@/components/quiz-tools/WhatElementQuiz")),
  "mental-age-quiz": dynamic(() => import("@/components/quiz-tools/MentalAgeQuiz")),

  // ── Games & Generators (Batch 5) ─────────────────────────────
  "pub-quiz-generator": dynamic(() => import("@/components/games-tools/PubQuizGenerator")),
  "scattergories-list-generator": dynamic(() => import("@/components/games-tools/ScattergoriesListGenerator")),
  "music-round-generator": dynamic(() => import("@/components/games-tools/MusicRoundGenerator")),
  "secret-santa-generator": dynamic(() => import("@/components/games-tools/SecretSantaGenerator")),
  "who-knows-me-best": dynamic(() => import("@/components/games-tools/WhoKnowsMeBest")),
  "couples-quiz-generator": dynamic(() => import("@/components/games-tools/CouplesQuizGenerator")),
  "pub-quiz-answer-sheet-printer": dynamic(() => import("@/components/games-tools/PubQuizAnswerSheetPrinter")),

  // ── Wedding & Events (Batch 6) ───────────────────────────────
  "wedding-timeline-builder": dynamic(() => import("@/components/wedding-tools/WeddingTimelineBuilder")),
  "wedding-table-name-generator": dynamic(() => import("@/components/wedding-tools/WeddingTableNameGenerator")),
  "hen-do-planner": dynamic(() => import("@/components/wedding-tools/HenDoPlanner")),
  "wedding-speech-outline-generator": dynamic(() => import("@/components/wedding-tools/WeddingSpeechOutlineGenerator")),
  "wedding-invitation-wording-generator": dynamic(() => import("@/components/wedding-tools/WeddingInvitationWordingGenerator")),

  // ── Home & Life Admin (Batch 7) ──────────────────────────────
  "moving-house-checklist": dynamic(() => import("@/components/home-tools/MovingHouseChecklist")),
  "broadband-speed-converter": dynamic(() => import("@/components/home-tools/BroadbandSpeedConverter")),
  "cleaning-schedule-generator": dynamic(() => import("@/components/home-tools/CleaningScheduleGenerator")),
  "tv-size-calculator": dynamic(() => import("@/components/home-tools/TVSizeCalculator")),
  "habit-tracker": dynamic(() => import("@/components/home-tools/HabitTracker")),
  "tipping-guide-abroad": dynamic(() => import("@/components/home-tools/TippingGuideAbroad")),
  "home-inventory-tracker": dynamic(() => import("@/components/home-tools/HomeInventoryTracker")),

  // ── Seasonal (Batch 7) ───────────────────────────────────────
  "halloween-costume-idea-generator": dynamic(() => import("@/components/seasonal-tools/HalloweenCostumeIdeaGenerator")),
  "christmas-gift-budget-tracker": dynamic(() => import("@/components/seasonal-tools/ChristmasGiftBudgetTracker")),
  "christmas-dinner-planner": dynamic(() => import("@/components/seasonal-tools/ChristmasDinnerPlanner")),
  "easter-activity-planner": dynamic(() => import("@/components/seasonal-tools/EasterActivityPlanner")),
  "bonfire-night-planner": dynamic(() => import("@/components/seasonal-tools/BonfireNightPlanner")),
  "back-to-school-checklist": dynamic(() => import("@/components/seasonal-tools/BackToSchoolChecklist")),
  "mothers-day-gift-idea-generator": dynamic(() => import("@/components/seasonal-tools/MothersDayGiftIdeaGenerator")),
  "fathers-day-gift-idea-generator": dynamic(() => import("@/components/seasonal-tools/FathersDayGiftIdeaGenerator")),

  // ── Fun & Viral (Batch 7) ────────────────────────────────────
  "wizard-name-generator": dynamic(() => import("@/components/fun-tools/WizardNameGenerator")),
  "elf-name-generator": dynamic(() => import("@/components/fun-tools/ElfNameGenerator")),
  "celebrity-birthday-twin": dynamic(() => import("@/components/fun-tools/CelebrityBirthdayTwin")),
  "paint-colour-mixer": dynamic(() => import("@/components/fun-tools/PaintColourMixer")),
  "uk-council-tax-calculator": dynamic(() => import("@/components/fun-tools/UKCouncilTaxCalculator")),
  "how-common-is-your-name": dynamic(() => import("@/components/fun-tools/HowCommonIsYourName")),

  // ── Text Tools (Batch 8) ─────────────────────────────────────
  "slug-generator": dynamic(() => import("@/components/text-tools/SlugGenerator")),
  "word-frequency-counter": dynamic(() => import("@/components/text-tools/WordFrequencyCounter")),
  "fancy-text-generator": dynamic(() => import("@/components/text-tools/FancyTextGenerator")),
  "instagram-caption-formatter": dynamic(() => import("@/components/text-tools/InstagramCaptionFormatter")),
  "email-template-generator": dynamic(() => import("@/components/text-tools/EmailTemplateGenerator")),

  // ── Developer Tools (Batch 8) ────────────────────────────────
  "jwt-decoder": dynamic(() => import("@/components/developer-tools/JWTDecoder")),
  "css-minifier": dynamic(() => import("@/components/developer-tools/CSSMinifier")),
  "javascript-minifier": dynamic(() => import("@/components/developer-tools/JavaScriptMinifier")),
  "sql-formatter": dynamic(() => import("@/components/developer-tools/SQLFormatter")),
  "html-entity-encoder": dynamic(() => import("@/components/developer-tools/HTMLEntityEncoder")),

  // ── Travel (Batch 9) ─────────────────────────────────────────
  "currency-converter": dynamic(() => import("@/components/travel-tools/CurrencyConverter")),
  "flight-time-calculator": dynamic(() => import("@/components/travel-tools/FlightTimeCalculator")),
  "luggage-weight-checker": dynamic(() => import("@/components/travel-tools/LuggageWeightChecker")),
  "jet-lag-calculator": dynamic(() => import("@/components/travel-tools/JetLagCalculator")),

  // ── Sports (Batch 9) ─────────────────────────────────────────
  "pace-to-finish-calculator": dynamic(() => import("@/components/sports-tools/PaceToFinishCalculator")),
  "cycling-calorie-calculator": dynamic(() => import("@/components/sports-tools/CyclingCalorieCalculator")),
  "swim-pace-calculator": dynamic(() => import("@/components/sports-tools/SwimPaceCalculator")),

  // ── Automotive (Batch 9) ─────────────────────────────────────
  "ev-charging-time-calculator": dynamic(() => import("@/components/automotive-tools/EVChargingTimeCalculator")),
  "road-trip-cost-calculator": dynamic(() => import("@/components/automotive-tools/RoadTripCostCalculator")),

  // ── Final 3 ──────────────────────────────────────────────────
  "baby-name-explorer": dynamic(() => import("@/components/parenting-tools/BabyNameExplorer")),

  // ── Converters — Weight (Additional) ─────────────────────────
  "kg-to-ounces": dynamic(() => import("@/components/converter-tools/KgToOunces")),
  "ounces-to-kg": dynamic(() => import("@/components/converter-tools/OuncesToKg")),
  "fl-oz-to-ml": dynamic(() => import("@/components/converter-tools/FlOzToMl")),
  "ml-to-fl-oz": dynamic(() => import("@/components/converter-tools/MlToFlOz")),
  "sticks-butter-to-grams": dynamic(() => import("@/components/converter-tools/SticksButterToGrams")),
  "gas-mark-to-celsius": dynamic(() => import("@/components/converter-tools/GasMarkToCelsius")),

  // ── Converters — Speed (Nautical & Aviation) ──────────────────
  "knots-to-mph": dynamic(() => import("@/components/converter-tools/KnotsToMph")),
  "mph-to-knots": dynamic(() => import("@/components/converter-tools/MphToKnots")),
  "knots-to-kph": dynamic(() => import("@/components/converter-tools/KnotsToKph")),
  "kph-to-knots": dynamic(() => import("@/components/converter-tools/KphToKnots")),
  "nautical-miles-to-km": dynamic(() => import("@/components/converter-tools/NauticalMilesToKm")),
  "km-to-nautical-miles": dynamic(() => import("@/components/converter-tools/KmToNauticalMiles")),

  // ── Converters — Temperature (Additional) ────────────────────
  "fahrenheit-to-kelvin": dynamic(() => import("@/components/converter-tools/FahrenheitToKelvin")),
  "kelvin-to-fahrenheit": dynamic(() => import("@/components/converter-tools/KelvinToFahrenheit")),

  // ── Converters — Number Systems ──────────────────────────────
  "hex-to-decimal": dynamic(() => import("@/components/converter-tools/HexToDecimal")),
  "decimal-to-hex": dynamic(() => import("@/components/converter-tools/DecimalToHex")),

  // ── Converters — Area ────────────────────────────────────────
  "square-feet-to-square-metres": dynamic(() => import("@/components/converter-tools/SquareFeetToSquareMetres")),
  "square-metres-to-square-feet": dynamic(() => import("@/components/converter-tools/SquareMetresToSquareFeet")),
  "acres-to-hectares": dynamic(() => import("@/components/converter-tools/AcresToHectares")),
  "hectares-to-acres": dynamic(() => import("@/components/converter-tools/HectaresToAcres")),
  "square-miles-to-square-km": dynamic(() => import("@/components/converter-tools/SquareMilesToSquareKm")),
  "square-km-to-square-miles": dynamic(() => import("@/components/converter-tools/SquareKmToSquareMiles")),
  "square-yards-to-square-metres": dynamic(() => import("@/components/converter-tools/SquareYardsToSquareMetres")),
  "square-metres-to-square-yards": dynamic(() => import("@/components/converter-tools/SquareMetresToSquareYards")),

  // ── Converters — Digital Storage ─────────────────────────────
  "mb-to-gb": dynamic(() => import("@/components/converter-tools/MbToGb")),
  "gb-to-mb": dynamic(() => import("@/components/converter-tools/GbToMb")),
  "gb-to-tb": dynamic(() => import("@/components/converter-tools/GbToTb")),
  "tb-to-gb": dynamic(() => import("@/components/converter-tools/TbToGb")),
  "kb-to-mb": dynamic(() => import("@/components/converter-tools/KbToMb")),
  "mb-to-kb": dynamic(() => import("@/components/converter-tools/MbToKb")),
  "bits-to-bytes": dynamic(() => import("@/components/converter-tools/BitsToBytes")),
  "bytes-to-bits": dynamic(() => import("@/components/converter-tools/BytesToBits")),

  // ── Converters — Energy & Power ──────────────────────────────
  "calories-to-joules": dynamic(() => import("@/components/converter-tools/CaloriesToJoules")),
  "joules-to-calories": dynamic(() => import("@/components/converter-tools/JoulesToCalories")),
  "kwh-to-btu": dynamic(() => import("@/components/converter-tools/KwhToBtu")),
  "btu-to-kwh": dynamic(() => import("@/components/converter-tools/BtuToKwh")),
  "calories-to-kcal": dynamic(() => import("@/components/converter-tools/CaloriesToKcal")),
  "kcal-to-calories": dynamic(() => import("@/components/converter-tools/KcalToCalories")),

  // ── Converters — Pressure ────────────────────────────────────
  "psi-to-bar": dynamic(() => import("@/components/converter-tools/PsiToBar")),
  "bar-to-psi": dynamic(() => import("@/components/converter-tools/BarToPsi")),
  "atm-to-psi": dynamic(() => import("@/components/converter-tools/AtmToPsi")),
  "psi-to-atm": dynamic(() => import("@/components/converter-tools/PsiToAtm")),

  // ── Converters — Time ────────────────────────────────────────
  "hours-to-minutes": dynamic(() => import("@/components/converter-tools/HoursToMinutes")),
  "minutes-to-hours": dynamic(() => import("@/components/converter-tools/MinutesToHours")),
  "days-to-hours": dynamic(() => import("@/components/converter-tools/DaysToHours")),
  "hours-to-days": dynamic(() => import("@/components/converter-tools/HoursToDays")),
  "weeks-to-days": dynamic(() => import("@/components/converter-tools/WeeksToDays")),
  "days-to-weeks": dynamic(() => import("@/components/converter-tools/DaysToWeeks")),

  // ── Converters — Fuel Economy ───────────────────────────────
  "mpg-to-litres-per-100km": dynamic(() => import("@/components/converter-tools/MpgToLitresPer100km")),
  "litres-per-100km-to-mpg": dynamic(() => import("@/components/converter-tools/LitresPer100kmToMpg")),
  "mpg-uk-to-mpg-us": dynamic(() => import("@/components/converter-tools/MpgUkToMpgUs")),
  "mpg-us-to-mpg-uk": dynamic(() => import("@/components/converter-tools/MpgUsToMpgUk")),

  // ── Converters — Angle ───────────────────────────────────────
  "degrees-to-radians": dynamic(() => import("@/components/converter-tools/DegreesToRadians")),
  "radians-to-degrees": dynamic(() => import("@/components/converter-tools/RadiansToDegrees")),
  "degrees-to-gradians": dynamic(() => import("@/components/converter-tools/DegreesToGradians")),
  "gradians-to-degrees": dynamic(() => import("@/components/converter-tools/GradiansToDegrees")),

  // ── Converters — Frequency ──────────────────────────────────
  "hz-to-khz": dynamic(() => import("@/components/converter-tools/HzToKhz")),
  "khz-to-hz": dynamic(() => import("@/components/converter-tools/KhzToHz")),
  "mhz-to-ghz": dynamic(() => import("@/components/converter-tools/MhzToGhz")),
  "ghz-to-mhz": dynamic(() => import("@/components/converter-tools/GhzToMhz")),

  // ── Converters — Force ───────────────────────────────────────
  "newtons-to-lbs-force": dynamic(() => import("@/components/converter-tools/NewtonsToLbsForce")),
  "lbs-force-to-newtons": dynamic(() => import("@/components/converter-tools/LbsForceToNewtons")),
  "kg-force-to-newtons": dynamic(() => import("@/components/converter-tools/KgForceToNewtons")),
  "newtons-to-kg-force": dynamic(() => import("@/components/converter-tools/NewtonsToKgForce")),

  // ── Converters — Clothing Sizes ─────────────────────────────
  "uk-to-us-shoe-size-mens": dynamic(() => import("@/components/converter-tools/UkToUsShoesMens")),
  "uk-to-us-shoe-size-womens": dynamic(() => import("@/components/converter-tools/UkToUsShoesWomens")),
  "uk-to-eu-shoe-size": dynamic(() => import("@/components/converter-tools/UkToEuShoeSize")),
  "us-to-eu-shoe-size": dynamic(() => import("@/components/converter-tools/UsToEuShoeSize")),
  "uk-to-us-dress-size": dynamic(() => import("@/components/converter-tools/UkToUsDressSize")),
  "uk-to-eu-dress-size": dynamic(() => import("@/components/converter-tools/UkToEuDressSize")),

  // ── Converters — Paper Sizes ────────────────────────────────
  "a4-to-letter-dimensions": dynamic(() => import("@/components/converter-tools/A4ToLetterDimensions")),
  "a3-to-tabloid-dimensions": dynamic(() => import("@/components/converter-tools/A3ToTabloidDimensions")),
  "a5-to-half-letter-dimensions": dynamic(() => import("@/components/converter-tools/A5ToHalfLetterDimensions")),

  // ── Converters — Number Conversion ──────────────────────────
  "number-to-roman-numerals": dynamic(() => import("@/components/converter-tools/NumberToRomanNumerals")),
  "roman-numerals-to-number": dynamic(() => import("@/components/converter-tools/RomanNumeralsToNumber")),

  // ── Text Tools (Additional) ──────────────────────────────────
  "text-reverser": dynamic(() => import("@/components/text-tools/TextReverser")),
  "text-sorter": dynamic(() => import("@/components/text-tools/TextSorter")),
  "whitespace-remover": dynamic(() => import("@/components/text-tools/WhitespaceRemover")),
  "text-to-binary": dynamic(() => import("@/components/text-tools/TextToBinary")),
  "text-to-morse-code": dynamic(() => import("@/components/text-tools/TextToMorseCode")),

  // ── Sports Tools ─────────────────────────────────────────────
  "one-rep-max-calculator": dynamic(() => import("@/components/sports-tools/OneRepMaxCalculator")),

  // ── Home Tools (Additional) ──────────────────────────────────
  "flooring-calculator": dynamic(() => import("@/components/home-tools/FlooringCalculator")),

  // ── When Is Tools (Seasonal) ──────────────────────────────────
  "when-is-christmas": dynamic(() => import("@/components/seasonal-tools/WhenIsChristmas")),
  "when-is-halloween": dynamic(() => import("@/components/seasonal-tools/WhenIsHalloween")),
  "when-is-valentines-day": dynamic(() => import("@/components/seasonal-tools/WhenIsValentinesDay")),
  "when-is-new-year": dynamic(() => import("@/components/seasonal-tools/WhenIsNewYear")),
  "when-is-easter": dynamic(() => import("@/components/seasonal-tools/WhenIsEaster")),
  "when-is-chinese-new-year": dynamic(() => import("@/components/seasonal-tools/WhenIsChineseNewYear")),
  "when-is-ramadan": dynamic(() => import("@/components/seasonal-tools/WhenIsRamadan")),
  "when-is-diwali": dynamic(() => import("@/components/seasonal-tools/WhenIsDiwali")),
  "when-is-hanukkah": dynamic(() => import("@/components/seasonal-tools/WhenIsHanukkah")),
  "when-is-mothers-day": dynamic(() => import("@/components/seasonal-tools/WhenIsMothersDay")),
  "when-is-fathers-day": dynamic(() => import("@/components/seasonal-tools/WhenIsFathersDay")),
  "when-is-thanksgiving": dynamic(() => import("@/components/seasonal-tools/WhenIsThanksgiving")),
  "when-is-summer-solstice": dynamic(() => import("@/components/seasonal-tools/WhenIsSummerSolstice")),
  "when-is-winter-solstice": dynamic(() => import("@/components/seasonal-tools/WhenIsWinterSolstice")),
  "when-is-spring-equinox": dynamic(() => import("@/components/seasonal-tools/WhenIsSpringEquinox")),
  "when-is-autumn-equinox": dynamic(() => import("@/components/seasonal-tools/WhenIsAutumnEquinox")),
  "when-is-black-friday": dynamic(() => import("@/components/seasonal-tools/WhenIsBlackFriday")),

  // ── Name Generators (Fun) ──────────────────────────────────
  "vampire-name-generator": dynamic(() => import("@/components/fun-tools/VampireNameGenerator")),
  "witch-name-generator": dynamic(() => import("@/components/fun-tools/WitchNameGenerator")),
  "superhero-alter-ego-generator": dynamic(() => import("@/components/fun-tools/SuperheroAlterEgoGenerator")),
  "dj-name-generator": dynamic(() => import("@/components/fun-tools/DjNameGenerator")),
  "fantasy-tavern-name-generator": dynamic(() => import("@/components/fun-tools/FantasyTavernNameGenerator")),
  "pirate-ship-name-generator": dynamic(() => import("@/components/fun-tools/PirateShipNameGenerator")),
  "alien-name-generator": dynamic(() => import("@/components/fun-tools/AlienNameGenerator")),
  "zombie-apocalypse-name-generator": dynamic(() => import("@/components/fun-tools/ZombieApocalypseNameGenerator")),

  // ── Fortune & Mystical Tools (Games) ──────────────────────────────────
  "magic-8-ball": dynamic(() => import("@/components/games-tools/Magic8Ball")),
  "tarot-card-reader": dynamic(() => import("@/components/games-tools/TarotCardReader")),
  "oracle-card-reader": dynamic(() => import("@/components/games-tools/OracleCardReader")),
  "fortune-teller": dynamic(() => import("@/components/games-tools/FortuneTeller")),
  "palm-reading-guide": dynamic(() => import("@/components/games-tools/PalmReadingGuide")),
  "crystal-ball-fortune": dynamic(() => import("@/components/games-tools/CrystalBallFortune")),
  "astrology-birth-chart": dynamic(() => import("@/components/games-tools/AstrologyBirthChart")),
  "daily-horoscope": dynamic(() => import("@/components/games-tools/DailyHoroscope")),
  "rune-stone-reader": dynamic(() => import("@/components/games-tools/RuneStoneReader")),
  "numerology-calculator": dynamic(() => import("@/components/games-tools/NumerologyCalculator")),

  // ── Business Tools (New Batch) ──────────────────────────────────
  "break-even-calculator": dynamic(() => import("@/components/business-tools/BreakEvenCalculator")),
  "business-name-generator": dynamic(() => import("@/components/business-tools/BusinessNameGenerator")),
  "discount-calculator": dynamic(() => import("@/components/business-tools/DiscountCalculator")),
  "freelance-rate-calculator": dynamic(() => import("@/components/business-tools/FreelanceRateCalculator")),
  "salary-to-hourly-converter": dynamic(() => import("@/components/business-tools/SalaryToHourlyConverter")),
  // vat-calculator mapped above in Finance section (line 10)
  "roi-calculator": dynamic(() => import("@/components/business-tools/ROICalculator")),
  "pay-rise-calculator": dynamic(() => import("@/components/business-tools/PayRiseCalculator")),
  "compound-interest-calculator": dynamic(() => import("@/components/business-tools/CompoundInterestCalculator")),
  "time-to-double-calculator": dynamic(() => import("@/components/business-tools/TimeToDoubleCalculator")),

  // ── Travel Tools (New Batch) ──────────────────────────────────
  "tip-calculator": dynamic(() => import("@/components/travel-tools/TipCalculator")),
  "travel-visa-checker": dynamic(() => import("@/components/travel-tools/TravelVisaChecker")),
  "time-zone-converter": dynamic(() => import("@/components/travel-tools/TimeZoneConverter")),
  "holiday-countdown-generator": dynamic(() => import("@/components/travel-tools/HolidayCountdownGenerator")),
  "sunrise-sunset-calculator": dynamic(() => import("@/components/travel-tools/SunriseSunsetCalculator")),
  "distance-calculator": dynamic(() => import("@/components/travel-tools/DistanceCalculator")),

  // ── Wedding Tools (New Batch) ──────────────────────────────────
  "wedding-drink-calculator": dynamic(() => import("@/components/wedding-tools/WeddingDrinkCalculator")),
  "wedding-catering-calculator": dynamic(() => import("@/components/wedding-tools/WeddingCateringCalculator")),
  "wedding-vow-generator": dynamic(() => import("@/components/wedding-tools/WeddingVowGenerator")),
  "wedding-hashtag-generator": dynamic(() => import("@/components/wedding-tools/WeddingHashtagGenerator")),
  "wedding-cost-per-head-calculator": dynamic(() => import("@/components/wedding-tools/WeddingCostPerHeadCalculator")),

  // ── Converter Tools (New Batch) ──
  "hex-to-rgb": dynamic(() => import("@/components/converter-tools/HexToRgb")),
  "binary-to-decimal": dynamic(() => import("@/components/converter-tools/BinaryToDecimal")),
  "number-base-converter": dynamic(() => import("@/components/converter-tools/NumberBaseConverter")),
  "clothing-size-converter": dynamic(() => import("@/components/converter-tools/ClothingSizeConverter")),
  "paper-size-converter": dynamic(() => import("@/components/converter-tools/PaperSizeConverter")),
  "data-storage-converter": dynamic(() => import("@/components/converter-tools/DataStorageConverter")),
  "cooking-measurement-converter": dynamic(() => import("@/components/converter-tools/CookingMeasurementConverter")),
  "speed-converter": dynamic(() => import("@/components/converter-tools/SpeedConverter")),
  "pressure-converter": dynamic(() => import("@/components/converter-tools/PressureConverter")),
  "energy-converter": dynamic(() => import("@/components/converter-tools/EnergyConverter")),
  "angle-converter": dynamic(() => import("@/components/converter-tools/AngleConverter")),
  "fuel-consumption-converter": dynamic(() => import("@/components/converter-tools/FuelConsumptionConverter")),

  // ── Text Tools (New Batch) ──
  "text-to-slug": dynamic(() => import("@/components/text-tools/TextToSlug")),
  "random-text-generator": dynamic(() => import("@/components/text-tools/RandomTextGenerator")),
  "readability-score-checker": dynamic(() => import("@/components/text-tools/ReadabilityScoreChecker")),
  "find-and-replace": dynamic(() => import("@/components/text-tools/FindAndReplace")),
  "text-to-csv-converter": dynamic(() => import("@/components/text-tools/TextToCsvConverter")),
  "line-counter": dynamic(() => import("@/components/text-tools/LineCounter")),
  "text-encryption-tool": dynamic(() => import("@/components/text-tools/TextEncryptionTool")),
  "email-extractor": dynamic(() => import("@/components/text-tools/EmailExtractor")),
  "whitespace-cleaner": dynamic(() => import("@/components/text-tools/WhitespaceCleaner")),
  "text-to-speech-previewer": dynamic(() => import("@/components/text-tools/TextToSpeechPreviewer")),

  // ── DateTime Tools (New Batch) ──
  "work-days-calculator": dynamic(() => import("@/components/datetime-tools/WorkDaysCalculator")),
  "week-number-calculator": dynamic(() => import("@/components/datetime-tools/WeekNumberCalculator")),
  "leap-year-checker": dynamic(() => import("@/components/datetime-tools/LeapYearChecker")),
  "stopwatch": dynamic(() => import("@/components/datetime-tools/Stopwatch")),
  "world-clock": dynamic(() => import("@/components/datetime-tools/WorldClock")),
  "date-format-converter": dynamic(() => import("@/components/datetime-tools/DateFormatConverter")),

  // ── Maths Tools (New Batch) ──
  "volume-calculator": dynamic(() => import("@/components/maths-tools/VolumeCalculator")),
  "quadratic-equation-solver": dynamic(() => import("@/components/maths-tools/QuadraticEquationSolver")),
  "prime-number-checker": dynamic(() => import("@/components/maths-tools/PrimeNumberChecker")),
  "greatest-common-factor-calculator": dynamic(() => import("@/components/maths-tools/GreatestCommonFactorCalculator")),
  "scientific-notation-converter": dynamic(() => import("@/components/maths-tools/ScientificNotationConverter")),
  "logarithm-calculator": dynamic(() => import("@/components/maths-tools/LogarithmCalculator")),
  "trigonometry-calculator": dynamic(() => import("@/components/maths-tools/TrigonometryCalculator")),
  "probability-calculator": dynamic(() => import("@/components/maths-tools/ProbabilityCalculator")),

  // ── Fun Tools (New Batch) ──
  "excuse-generator": dynamic(() => import("@/components/fun-tools/ExcuseGenerator")),
  "pickup-line-generator": dynamic(() => import("@/components/fun-tools/PickupLineGenerator")),
  "roast-generator": dynamic(() => import("@/components/fun-tools/RoastGenerator")),
  "compliment-generator": dynamic(() => import("@/components/fun-tools/ComplimentGenerator")),
  "bucket-list-generator": dynamic(() => import("@/components/fun-tools/BucketListGenerator")),
  "nickname-generator": dynamic(() => import("@/components/fun-tools/NicknameGenerator")),
  "conspiracy-theory-generator": dynamic(() => import("@/components/fun-tools/ConspiracyTheoryGenerator")),
  "fortune-cookie-generator": dynamic(() => import("@/components/fun-tools/FortuneCookieGenerator")),
  "new-hobby-suggester": dynamic(() => import("@/components/fun-tools/NewHobbySuggester")),
  "six-word-story": dynamic(() => import("@/components/fun-tools/SixWordStory")),
  "mad-libs-generator": dynamic(() => import("@/components/fun-tools/MadLibsGenerator")),

  // ── Finance Tools (New Batch) ──
  "pension-calculator": dynamic(() => import("@/components/finance-tools/PensionCalculator")),
  "isa-calculator": dynamic(() => import("@/components/finance-tools/IsaCalculator")),
  "dividend-tax-calculator": dynamic(() => import("@/components/finance-tools/DividendTaxCalculator")),
  "inheritance-tax-calculator": dynamic(() => import("@/components/finance-tools/InheritanceTaxCalculator")),
  "council-tax-calculator": dynamic(() => import("@/components/finance-tools/CouncilTaxCalculator")),
  "child-benefit-calculator": dynamic(() => import("@/components/finance-tools/ChildBenefitCalculator")),
  "debt-payoff-calculator": dynamic(() => import("@/components/finance-tools/DebtPayoffCalculator")),
  "credit-card-payoff-calculator": dynamic(() => import("@/components/finance-tools/CreditCardPayoffCalculator")),
  "national-insurance-calculator": dynamic(() => import("@/components/finance-tools/NationalInsuranceCalculator")),

  // ── Business Tools (New Batch) ──
  "invoice-number-generator": dynamic(() => import("@/components/business-tools/InvoiceNumberGenerator")),
  "business-card-designer": dynamic(() => import("@/components/business-tools/BusinessCardDesigner")),
  "social-media-post-scheduler": dynamic(() => import("@/components/business-tools/SocialMediaPostScheduler")),
  "content-calendar-generator": dynamic(() => import("@/components/business-tools/ContentCalendarGenerator")),
  "pricing-calculator": dynamic(() => import("@/components/business-tools/PricingCalculator")),
  "meeting-agenda-generator": dynamic(() => import("@/components/business-tools/MeetingAgendaGenerator")),
  "employee-cost-calculator": dynamic(() => import("@/components/business-tools/EmployeeCostCalculator")),
  "startup-runway-calculator": dynamic(() => import("@/components/business-tools/StartupRunwayCalculator")),
  "word-cloud-generator": dynamic(() => import("@/components/business-tools/WordCloudGenerator")),
  "nda-template-generator": dynamic(() => import("@/components/business-tools/NdaTemplateGenerator")),
  "receipt-generator": dynamic(() => import("@/components/business-tools/ReceiptGenerator")),
  "tax-year-calendar": dynamic(() => import("@/components/business-tools/TaxYearCalendar")),
  "company-name-checker": dynamic(() => import("@/components/business-tools/CompanyNameChecker")),

  // ── Cooking Tools (New Batch) ──
  "cooking-timer": dynamic(() => import("@/components/cooking-tools/CookingTimer")),
  "meat-cooking-calculator": dynamic(() => import("@/components/cooking-tools/MeatCookingCalculator")),
  "baking-conversion-calculator": dynamic(() => import("@/components/cooking-tools/BakingConversionCalculator")),
  "egg-timer": dynamic(() => import("@/components/cooking-tools/EggTimer")),
  "bbq-planner": dynamic(() => import("@/components/cooking-tools/BbqPlanner")),
  "meal-planner": dynamic(() => import("@/components/cooking-tools/MealPlanner")),
  "calories-in-recipe": dynamic(() => import("@/components/cooking-tools/CaloriesInRecipe")),
  "freezer-storage-guide": dynamic(() => import("@/components/cooking-tools/FreezerStorageGuide")),
  "substitute-ingredient-finder": dynamic(() => import("@/components/cooking-tools/SubstituteIngredientFinder")),
  "kitchen-unit-converter": dynamic(() => import("@/components/cooking-tools/KitchenUnitConverter")),
  "sourdough-calculator": dynamic(() => import("@/components/cooking-tools/SourdoughCalculator")),
  "pizza-dough-calculator": dynamic(() => import("@/components/cooking-tools/PizzaDoughCalculator")),
  "cocktail-recipe-generator": dynamic(() => import("@/components/cooking-tools/CocktailRecipeGenerator")),

  // ── PDF & Image Tools ─────────────────────────────────────────
  "merge-pdf": dynamic(() => import("@/components/pdf-tools/MergePDF")),
  "split-pdf": dynamic(() => import("@/components/pdf-tools/SplitPDF")),
  "rotate-pdf": dynamic(() => import("@/components/pdf-tools/RotatePDF")),
  "delete-pdf-pages": dynamic(() => import("@/components/pdf-tools/DeletePDFPages")),
  "extract-pdf-pages": dynamic(() => import("@/components/pdf-tools/ExtractPDFPages")),
  "number-pdf-pages": dynamic(() => import("@/components/pdf-tools/NumberPages")),
  "watermark-pdf": dynamic(() => import("@/components/pdf-tools/WatermarkPDF")),
  "protect-pdf": dynamic(() => import("@/components/pdf-tools/ProtectPDF")),
  "jpg-to-pdf": dynamic(() => import("@/components/pdf-tools/JPGtoPDF")),
  "flatten-pdf": dynamic(() => import("@/components/pdf-tools/FlattenPDF")),
  "crop-pdf": dynamic(() => import("@/components/pdf-tools/CropPDF")),
  "pdf-to-jpg": dynamic(() => import("@/components/pdf-tools/PDFtoJPG")),
  "pdf-reader": dynamic(() => import("@/components/pdf-tools/PDFReader")),

  // ── Pixel, DPI & Image Calculators ─────────────────────────────────
  "pixel-dpi-calculator": dynamic(() => import("@/components/creative-tools/PixelDpiCalculator")),
  "image-file-size-calculator": dynamic(() => import("@/components/creative-tools/ImageFileSizeCalculator")),
  "pixels-to-physical-converter": dynamic(() => import("@/components/creative-tools/PixelsToPhysicalConverter")),
  "screen-ppi-calculator": dynamic(() => import("@/components/creative-tools/ScreenPpiCalculator")),
  "megapixel-calculator": dynamic(() => import("@/components/creative-tools/MegapixelCalculator")),
  "image-dpi-changer": dynamic(() => import("@/components/creative-tools/ImageDpiChanger")),

  // ── Betting & Gambling Calculators ─────────────────────────────────
  "matched-betting-calculator": dynamic(() => import("@/components/betting-tools/MatchedBettingCalculator")),
  "dutching-calculator": dynamic(() => import("@/components/betting-tools/DutchingCalculator")),
  "each-way-calculator": dynamic(() => import("@/components/betting-tools/EachWayCalculator")),
  "odds-converter": dynamic(() => import("@/components/betting-tools/OddsConverter")),
  "lay-bet-calculator": dynamic(() => import("@/components/betting-tools/LayBetCalculator")),
  "accumulator-calculator": dynamic(() => import("@/components/betting-tools/AccumulatorCalculator")),
  "lottery-odds-comparison": dynamic(() => import("@/components/betting-tools/LotteryOddsComparison")),

  // ── Games ───────────────────────────────────────────────────────────
  "roulette-wheel": dynamic(() => import("@/components/games-tools/RouletteWheel")),

  // ── Health & Fertility Tools ─────────────────────────────────
  "ovulation-calculator": dynamic(() => import("@/components/health-tools/OvulationCalculator")),
  "conception-date-calculator": dynamic(() => import("@/components/health-tools/ConceptionDateCalculator")),
  "when-can-i-take-a-pregnancy-test": dynamic(() => import("@/components/health-tools/PregnancyTestCalculator")),
  "implantation-calculator": dynamic(() => import("@/components/health-tools/ImplantationCalculator")),
  "pregnancy-week-calculator": dynamic(() => import("@/components/health-tools/PregnancyWeekCalculator")),
  "fertile-window-calculator": dynamic(() => import("@/components/health-tools/FertileWindowCalculator")),
  "irregular-cycle-ovulation-estimator": dynamic(() => import("@/components/health-tools/IrregularCycleOvulationEstimator")),
  "early-pregnancy-symptoms-checker": dynamic(() => import("@/components/health-tools/EarlyPregnancySymptomsChecker")),
  "maternity-leave-planner": dynamic(() => import("@/components/health-tools/MaternityLeavePlanner")),
  "pregnancy-milestone-calendar": dynamic(() => import("@/components/health-tools/PregnancyMilestoneCalendar")),
  "period-tracker": dynamic(() => import("@/components/health-tools/PeriodTracker")),

  // ── Home Energy Tools ────────────────────────────────────────
  "heat-pump-savings-calculator": dynamic(() => import("@/components/home-tools/HeatPumpSavingsCalculator")),
  "solar-panel-savings-calculator": dynamic(() => import("@/components/home-tools/SolarPanelSavingsCalculator")),
  "solar-battery-payback-calculator": dynamic(() => import("@/components/home-tools/SolarBatteryPaybackCalculator")),
  "epc-improvement-checker": dynamic(() => import("@/components/home-tools/EPCImprovementChecker")),
  "insulation-savings-calculator": dynamic(() => import("@/components/home-tools/InsulationSavingsCalculator")),
  "double-glazing-payback-calculator": dynamic(() => import("@/components/home-tools/DoubleGlazingPaybackCalculator")),
  "home-energy-cost-calculator": dynamic(() => import("@/components/home-tools/HomeEnergyCostCalculator")),
  "boiler-vs-heat-pump-calculator": dynamic(() => import("@/components/home-tools/BoilerVsHeatPumpCalculator")),
  "underfloor-heating-cost-calculator": dynamic(() => import("@/components/home-tools/UnderfloorHeatingCostCalculator")),
  "retrofit-savings-estimator": dynamic(() => import("@/components/home-tools/RetrofitSavingsEstimator")),
  "should-i-fix-or-replace": dynamic(() => import("@/components/home-tools/ShouldIFixOrReplace")),

  // ── Automotive Tools ────────────────────────────────────────
  "company-car-tax-calculator": dynamic(() => import("@/components/automotive-tools/CompanyCarTaxCalculator")),
  "ev-vs-petrol-company-car": dynamic(() => import("@/components/automotive-tools/EVvsPetrolCompanyCarCalculator")),
  "salary-sacrifice-car-calculator": dynamic(() => import("@/components/automotive-tools/SalarySacrificeCarCalculator")),
  "petrol-vs-electric-total-cost": dynamic(() => import("@/components/automotive-tools/PetrolVsElectricTotalCostCalculator")),
  "car-tax-checker": dynamic(() => import("@/components/automotive-tools/CarTaxChecker")),
  "mileage-reimbursement-calculator": dynamic(() => import("@/components/automotive-tools/MileageReimbursementCalculator")),
  "cost-per-mile-calculator": dynamic(() => import("@/components/automotive-tools/CostPerMileCalculator")),
  "ev-range-calculator": dynamic(() => import("@/components/automotive-tools/EVRangeCalculator")),
  "lease-vs-buy-car-calculator": dynamic(() => import("@/components/automotive-tools/LeaseVsBuyCarCalculator")),
  "should-i-keep-my-old-car": dynamic(() => import("@/components/automotive-tools/ShouldIKeepMyOldCarCalculator")),

  // ── Finance/Pension/Benefits Tools ──────────────────────────
  "state-pension-age-checker": dynamic(() => import("@/components/finance-tools/StatePensionAgeChecker")),
  "pension-income-calculator": dynamic(() => import("@/components/finance-tools/PensionIncomeCalculator")),
  "pension-tax-free-lump-sum": dynamic(() => import("@/components/finance-tools/PensionTaxFreeLumpSum")),
  "workplace-pension-calculator": dynamic(() => import("@/components/finance-tools/WorkplacePensionCalculator")),
  "can-i-retire-early": dynamic(() => import("@/components/finance-tools/CanIRetireEarlyCalculator")),
  "emergency-fund-calculator": dynamic(() => import("@/components/finance-tools/EmergencyFundCalculator")),
  "child-benefit-tax-calculator": dynamic(() => import("@/components/finance-tools/ChildBenefitTaxCalculator")),
  "childcare-cost-calculator": dynamic(() => import("@/components/finance-tools/ChildcareCostCalculator")),
  "maternity-pay-calculator": dynamic(() => import("@/components/finance-tools/MaternityPayCalculator")),
  "should-i-rent-or-buy": dynamic(() => import("@/components/finance-tools/ShouldIRentOrBuy")),
  "should-i-pay-off-debt-or-save": dynamic(() => import("@/components/finance-tools/ShouldIPayOffDebtOrSave")),
  "buy-vs-subscribe-calculator": dynamic(() => import("@/components/finance-tools/BuyVsSubscribeCalculator")),
  "is-childcare-worth-it": dynamic(() => import("@/components/finance-tools/IsChildcareWorthItCalculator")),

  // ── Decision-maker/Fun Tools ────────────────────────────────
  "pros-and-cons-generator": dynamic(() => import("@/components/fun-tools/ProsAndConsGenerator")),
  "decision-matrix-maker": dynamic(() => import("@/components/fun-tools/DecisionMatrixMaker")),
  "this-or-that-decider": dynamic(() => import("@/components/fun-tools/ThisOrThatDecider")),
  "priority-ranker": dynamic(() => import("@/components/fun-tools/PriorityRanker")),
  "coin-flip-but-smarter": dynamic(() => import("@/components/fun-tools/CoinFlipButSmarter")),
  "zodiac-compatibility-checker": dynamic(() => import("@/components/fun-tools/ZodiacCompatibilityChecker")),
  "chinese-zodiac-calculator": dynamic(() => import("@/components/fun-tools/ChineseZodiacCalculator")),
  "lucky-number-generator": dynamic(() => import("@/components/fun-tools/LuckyNumberGenerator")),
  "daily-horoscope-generator": dynamic(() => import("@/components/fun-tools/DailyHoroscopeGenerator")),
  "dog-age-calculator": dynamic(() => import("@/components/fun-tools/DogAgeCalculator")),
  "cat-age-calculator": dynamic(() => import("@/components/fun-tools/CatAgeCalculator")),
  "pet-food-cost-calculator": dynamic(() => import("@/components/fun-tools/PetFoodCostCalculator")),
  "dog-walking-cost-calculator": dynamic(() => import("@/components/fun-tools/DogWalkingCostCalculator")),

  // ── Cooking Tools ──────────────────────────────────────────
  "make-or-buy-calculator": dynamic(() => import("@/components/cooking-tools/MakeOrBuyCalculator")),
  "random-recipe-generator": dynamic(() => import("@/components/cooking-tools/RandomRecipeGenerator")),
  "cocktail-finder": dynamic(() => import("@/components/cooking-tools/CocktailFinder")),

  // ── Date/Time Tools ────────────────────────────────────────
  "holiday-leave-maximiser": dynamic(() => import("@/components/datetime-tools/HolidayLeaveMaximiser")),
  "bank-holiday-checker": dynamic(() => import("@/components/datetime-tools/BankHolidayChecker")),
  "working-days-calculator": dynamic(() => import("@/components/datetime-tools/WorkingDaysCalculator")),
  "year-progress-tracker": dynamic(() => import("@/components/datetime-tools/YearProgressTracker")),

  // ── Text/Word Tools ────────────────────────────────────────
  "rhyme-finder": dynamic(() => import("@/components/text-tools/RhymeFinder")),
  "synonym-finder": dynamic(() => import("@/components/text-tools/SynonymFinder")),
  "word-association-tool": dynamic(() => import("@/components/text-tools/WordAssociationTool")),

  // ── Education Tools ───────────────────────────────────────
  "country-comparison-tool": dynamic(() => import("@/components/education-tools/CountryComparisonTool")),
  "country-quiz": dynamic(() => import("@/components/education-tools/CountryQuiz")),
  "number-facts": dynamic(() => import("@/components/education-tools/NumberFacts")),
  "writing-prompt-generator": dynamic(() => import("@/components/education-tools/WritingPromptGenerator")),

  // ── Travel/Currency Tools ──────────────────────────────────
  "historical-exchange-rate-checker": dynamic(() => import("@/components/travel-tools/HistoricalExchangeRateChecker")),
  "travel-money-calculator": dynamic(() => import("@/components/travel-tools/TravelMoneyCalculator")),

  // ── Map Tools ──────────────────────────────────────────────
  "walking-time-calculator": dynamic(() => import("@/components/map-tools/WalkingTimeCalculator")),
  "walking-route-calculator": dynamic(() => import("@/components/map-tools/WalkingTimeCalculator")),
  "nearest-playground-finder": dynamic(() => import("@/components/map-tools/NearestPlaygroundFinder")),
  "nearest-defibrillator-finder": dynamic(() => import("@/components/map-tools/NearestDefibrillatorFinder")),
  "nearest-public-toilet-finder": dynamic(() => import("@/components/map-tools/NearestPublicToiletFinder")),
  "nearest-ev-charger-finder": dynamic(() => import("@/components/map-tools/NearestEVChargerFinder")),
  "nearest-cash-machine-finder": dynamic(() => import("@/components/map-tools/NearestCashMachineFinder")),
  "nearest-park-finder": dynamic(() => import("@/components/map-tools/NearestParkFinder")),
  "how-far-from-the-sea": dynamic(() => import("@/components/map-tools/HowFarFromTheSeaCalculator")),
  "pub-density-map": dynamic(() => import("@/components/map-tools/PubDensityMap")),
  "school-run-calculator": dynamic(() => import("@/components/map-tools/SchoolRunCalculator")),

  // ── Seasonal "When Is" Tools ───────────────────────────────
  "when-is-eid-al-fitr": dynamic(() => import("@/components/seasonal-tools/WhenIsEidAlFitr")),
  "when-is-eid-al-adha": dynamic(() => import("@/components/seasonal-tools/WhenIsEidAlAdha")),
  "when-is-st-patricks-day": dynamic(() => import("@/components/seasonal-tools/WhenIsStPatricksDay")),
  "when-is-st-georges-day": dynamic(() => import("@/components/seasonal-tools/WhenIsStGeorgesDay")),
  "when-is-mothers-day-uk": dynamic(() => import("@/components/seasonal-tools/WhenIsMothersDayUK")),
  "when-is-pancake-day": dynamic(() => import("@/components/seasonal-tools/WhenIsPancakeDay")),
  "when-is-world-book-day": dynamic(() => import("@/components/seasonal-tools/WhenIsWorldBookDay")),
  "when-is-remembrance-day": dynamic(() => import("@/components/seasonal-tools/WhenIsRemembranceDay")),
  "when-is-burns-night": dynamic(() => import("@/components/seasonal-tools/WhenIsBurnsNight")),
  "when-does-spring-start": dynamic(() => import("@/components/seasonal-tools/WhenDoesSpringStart")),
  "when-does-summer-start": dynamic(() => import("@/components/seasonal-tools/WhenDoesSummerStart")),
  "when-does-autumn-start": dynamic(() => import("@/components/seasonal-tools/WhenDoesAutumnStart")),
  "when-does-winter-start": dynamic(() => import("@/components/seasonal-tools/WhenDoesWinterStart")),
  "when-is-the-longest-day": dynamic(() => import("@/components/seasonal-tools/WhenIsTheLongestDay")),
  "when-is-the-shortest-day": dynamic(() => import("@/components/seasonal-tools/WhenIsTheShortestDay")),
  "when-is-super-bowl": dynamic(() => import("@/components/seasonal-tools/WhenIsSuperBowl")),
  "when-is-memorial-day": dynamic(() => import("@/components/seasonal-tools/WhenIsMemorialDay")),
  "when-is-labor-day": dynamic(() => import("@/components/seasonal-tools/WhenIsLaborDay")),

  // ── Marketplace Fee Calculators ──────────────────────────────
  "etsy-fee-calculator": dynamic(() => import("@/components/business-tools/EtsyFeeCalculator")),
  "ebay-fee-calculator": dynamic(() => import("@/components/business-tools/EbayFeeCalculator")),
  "amazon-fba-calculator": dynamic(() => import("@/components/business-tools/AmazonFbaCalculator")),
  "shopify-profit-calculator": dynamic(() => import("@/components/business-tools/ShopifyProfitCalculator")),

  // ── Hobby & Maker Cost Calculators ─────────────────────────

  // 3D Printing
  "3d-print-cost-calculator": dynamic(() => import("@/components/creative-tools/3DPrintCostCalculator")),
  "filament-calculator": dynamic(() => import("@/components/creative-tools/FilamentCalculator")),
  "filament-comparison": dynamic(() => import("@/components/creative-tools/FilamentComparison")),
  "3d-print-pricing-guide": dynamic(() => import("@/components/creative-tools/PrintPricingGuide")),
  "print-shrinkage-calculator": dynamic(() => import("@/components/creative-tools/PrintShrinkageCalculator")),

  // Knitting & Crochet
  "yarn-cost-calculator": dynamic(() => import("@/components/creative-tools/YarnCostCalculator")),
  "knitting-gauge-calculator": dynamic(() => import("@/components/creative-tools/KnittingGaugeCalculator")),
  "yarn-weight-converter": dynamic(() => import("@/components/creative-tools/YarnWeightConverter")),
  "crochet-blanket-calculator": dynamic(() => import("@/components/creative-tools/CrochetBlanketCalculator")),
  "stitch-counter": dynamic(() => import("@/components/creative-tools/StitchCounter")),

  // Sewing & Quilting
  "fabric-cost-calculator": dynamic(() => import("@/components/creative-tools/FabricCostCalculator")),
  "quilt-calculator": dynamic(() => import("@/components/creative-tools/QuiltCalculator")),
  "seam-allowance-calculator": dynamic(() => import("@/components/creative-tools/SeamAllowanceCalculator")),
  "curtain-fabric-calculator": dynamic(() => import("@/components/creative-tools/CurtainFabricCalculator")),

  // Woodworking
  "wood-cost-calculator": dynamic(() => import("@/components/home-tools/WoodCostCalculator")),
  "board-foot-calculator": dynamic(() => import("@/components/home-tools/BoardFootCalculator")),
  "wood-joint-calculator": dynamic(() => import("@/components/home-tools/WoodJointCalculator")),
  "sawhorse-angle-calculator": dynamic(() => import("@/components/home-tools/SawhorseAngleCalculator")),
  "wood-finishing-calculator": dynamic(() => import("@/components/home-tools/WoodFinishingCalculator")),

  // Painting & Art
  "painting-cost-calculator": dynamic(() => import("@/components/creative-tools/PaintingCostCalculator")),
  "paint-mixing-ratios": dynamic(() => import("@/components/creative-tools/PaintMixingCalculator")),
  "canvas-size-guide": dynamic(() => import("@/components/creative-tools/CanvasSizeGuide")),
  "art-pricing-calculator": dynamic(() => import("@/components/creative-tools/ArtPricingCalculator")),

  // Candle & Soap
  "candle-cost-calculator": dynamic(() => import("@/components/creative-tools/CandleCostCalculator")),
  "wax-melt-calculator": dynamic(() => import("@/components/creative-tools/WaxMeltCalculator")),
  "fragrance-load-calculator": dynamic(() => import("@/components/creative-tools/FragranceLoadCalculator")),
  "soap-calculator": dynamic(() => import("@/components/creative-tools/SoapRecipeCalculator")),

  // Resin & Jewellery
  "resin-calculator": dynamic(() => import("@/components/creative-tools/ResinCalculator")),
  "jewellery-pricing-calculator": dynamic(() => import("@/components/creative-tools/JewelleryPricingCalculator")),
  "ring-size-converter": dynamic(() => import("@/components/creative-tools/RingSizeConverter")),

  // Baking Business
  "cake-pricing-calculator": dynamic(() => import("@/components/cooking-tools/CakePricingCalculator")),
  "bake-sale-calculator": dynamic(() => import("@/components/cooking-tools/BakeSaleCalculator")),
  "recipe-cost-calculator": dynamic(() => import("@/components/cooking-tools/RecipeCostCalculator")),

  // Photography
  "photography-pricing-calculator": dynamic(() => import("@/components/creative-tools/PhotographyPricingCalculator")),
  "photo-print-cost-calculator": dynamic(() => import("@/components/creative-tools/PhotoPrintCostCalculator")),
  "golden-hour-calculator": dynamic(() => import("@/components/creative-tools/GoldenHourCalculator")),

  // Music (existing)
  "recording-cost-calculator": dynamic(() => import("@/components/creative-tools/RecordingCostCalculator")),
  "guitar-string-cost": dynamic(() => import("@/components/creative-tools/GuitarStringCostTracker")),
  "tap-tempo": dynamic(() => import("@/components/creative-tools/TapTempo")),

  // Music Tools (Flagship Cluster)
  "guitar-tuner": dynamic(() => import("@/components/music-tools/GuitarTuner")),
  "bass-tuner": dynamic(() => import("@/components/music-tools/BassTuner")),
  "ukulele-tuner": dynamic(() => import("@/components/music-tools/UkuleleTuner")),
  "chord-library": dynamic(() => import("@/components/music-tools/ChordLibrary")),
  "scale-finder": dynamic(() => import("@/components/music-tools/ScaleFinder")),
  "metronome": dynamic(() => import("@/components/music-tools/Metronome")),
  "key-finder": dynamic(() => import("@/components/music-tools/KeyFinder")),
  "transpose-tool": dynamic(() => import("@/components/music-tools/TransposeTool")),
  "setlist-timer": dynamic(() => import("@/components/music-tools/SetlistTimer")),
  "music-theory": dynamic(() => import("@/components/music-tools/MusicTheoryReference")),
  "piano-chords": dynamic(() => import("@/components/music-tools/PianoChords")),
  "song-structure": dynamic(() => import("@/components/music-tools/SongStructureBuilder")),
  "frequency-to-note": dynamic(() => import("@/components/music-tools/FrequencyToNote")),
  "practice-tracker": dynamic(() => import("@/components/music-tools/PracticeTracker")),

  // International Finance - US
  "us-income-tax-calculator": dynamic(() => import("@/components/international-finance-tools/USIncomeTaxCalculator")),
  "us-paycheck-calculator": dynamic(() => import("@/components/international-finance-tools/USPaycheckCalculator")),
  "us-tip-calculator": dynamic(() => import("@/components/international-finance-tools/USTipCalculator")),
  "us-mortgage-calculator": dynamic(() => import("@/components/international-finance-tools/USMortgageCalculator")),
  "us-401k-calculator": dynamic(() => import("@/components/international-finance-tools/US401kCalculator")),
  "us-student-loan-calculator": dynamic(() => import("@/components/international-finance-tools/USStudentLoanCalculator")),
  "us-state-tax-comparison": dynamic(() => import("@/components/international-finance-tools/USStateComparison")),

  // International Finance - Canada
  "canada-income-tax-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaIncomeTaxCalculator")),
  "canada-paycheck-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaPaycheckCalculator")),
  "canada-rrsp-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaRRSPCalculator")),
  "canada-tfsa-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaTFSACalculator")),
  "canada-mortgage-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaMortgageCalculator")),
  "canada-gst-hst-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaGSTHSTCalculator")),
  "canada-capital-gains-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaCapitalGainsCalculator")),
  "canada-child-benefit-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaChildBenefitCalculator")),

  // International Finance - Australia
  "australia-income-tax-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaIncomeTaxCalculator")),
  "australia-pay-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaPayCalculator")),
  "australia-super-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaSuperCalculator")),
  "australia-hecs-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaHECSCalculator")),
  "australia-stamp-duty-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaStampDutyCalculator")),
  "australia-mortgage-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaMortgageCalculator")),
  "australia-gst-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaGSTCalculator")),
  "australia-capital-gains-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaCapitalGainsCalculator")),

  // International Finance - India
  "india-income-tax-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaIncomeTaxCalculator")),
  "india-hra-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaHRACalculator")),
  "india-gst-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaGSTCalculator")),
  "india-home-loan-emi-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaHomeLoanEMICalculator")),
  "india-sip-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaSIPCalculator")),
  "india-ppf-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaPPFCalculator")),
  "india-fd-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaFDCalculator")),
  "india-gratuity-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaGratuityCalculator")),

  // International Beyond Finance - US
  "us-gpa-calculator": dynamic(() => import("@/components/international-finance-tools/USGPACalculator")),
  "us-overtime-calculator": dynamic(() => import("@/components/international-finance-tools/USOvertimeCalculator")),
  "us-home-affordability-calculator": dynamic(() => import("@/components/international-finance-tools/USHomeAffordabilityCalculator")),
  "thanksgiving-dinner-calculator": dynamic(() => import("@/components/international-finance-tools/ThanksgivingDinnerCalculator")),
  "us-back-to-school-calculator": dynamic(() => import("@/components/international-finance-tools/USBackToSchoolCalculator")),
  "us-minimum-wage-map": dynamic(() => import("@/components/international-finance-tools/USMinimumWageMap")),

  // International Beyond Finance - Canada
  "canada-immigration-points-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaImmigrationPointsCalculator")),
  "canada-maternity-leave-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaMaternityLeaveCalculator")),
  "canada-heating-cost-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaHeatingCostCalculator")),

  // International Beyond Finance - Australia
  "australia-penalty-rate-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaPenaltyRateCalculator")),
  "australia-visa-cost-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaVisaCostCalculator")),
  "australia-public-holiday-planner": dynamic(() => import("@/components/international-finance-tools/AustraliaPublicHolidayPlanner")),

  // International Beyond Finance - India
  "india-emi-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaEMICalculator")),
  "india-gold-rate-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaGoldRateCalculator")),
  "india-wedding-budget-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaWeddingBudgetCalculator")),
  "india-school-admission-age-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaSchoolAdmissionAgeCalculator")),
  "india-electricity-bill-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaElectricityBillCalculator")),
  "india-train-fare-calculator": dynamic(() => import("@/components/international-finance-tools/IndiaTrainFareCalculator")),

  // Universal / Cross-Country
  "tipping-guide-by-country": dynamic(() => import("@/components/international-finance-tools/TippingGuideByCountry")),
  "maternity-leave-by-country": dynamic(() => import("@/components/international-finance-tools/MaternityLeaveByCountry")),
  "grade-conversion-tool": dynamic(() => import("@/components/international-finance-tools/GradeConversionTool")),
  "date-format-converter": dynamic(() => import("@/components/international-finance-tools/DateFormatConverter")),
  "speed-limit-converter": dynamic(() => import("@/components/international-finance-tools/SpeedLimitConverter")),
  "annual-leave-by-country": dynamic(() => import("@/components/international-finance-tools/AnnualLeaveByCountry")),

  // Gardening
  "raised-bed-calculator": dynamic(() => import("@/components/home-tools/RaisedBedCalculator")),
  "seed-spacing-calculator": dynamic(() => import("@/components/home-tools/SeedSpacingCalculator")),
  "lawn-feed-calculator": dynamic(() => import("@/components/home-tools/LawnFeedCalculator")),
  "watering-calculator": dynamic(() => import("@/components/home-tools/WateringCalculator")),

  // Gaming & Tabletop
  "miniatures-cost-calculator": dynamic(() => import("@/components/games-tools/MiniaturesCostCalculator")),
  "dnd-cost-calculator": dynamic(() => import("@/components/games-tools/DndCostCalculator")),
  "mtg-deck-cost": dynamic(() => import("@/components/games-tools/MtgDeckCostCalculator")),

  // General Hobby & Side Hustle
  "craft-fair-calculator": dynamic(() => import("@/components/business-tools/CraftFairCalculator")),
  "side-hustle-hourly-rate": dynamic(() => import("@/components/business-tools/SideHustleHourlyRate")),
  "hobby-cost-tracker": dynamic(() => import("@/components/business-tools/HobbyCostTracker")),

  // ── World Cup 2026 ──────────────────────────────────────
  "world-cup-2026-wall-chart": dynamic(() => import("@/components/sports-tools/WorldCupWallChart")),

  // ── US Finance (Batch 2) ──────────────────────────────────
  "us-self-employment-tax-calculator": dynamic(() => import("@/components/international-finance-tools/USSelfEmploymentTaxCalculator")),
  "us-capital-gains-tax-calculator": dynamic(() => import("@/components/international-finance-tools/USCapitalGainsTaxCalculator")),
  "us-sales-tax-calculator": dynamic(() => import("@/components/international-finance-tools/USSalesTaxCalculator")),
  "us-property-tax-estimator": dynamic(() => import("@/components/international-finance-tools/USPropertyTaxEstimator")),
  "us-roth-vs-traditional-ira": dynamic(() => import("@/components/international-finance-tools/USRothVsTraditionalIRA")),
  "us-salary-vs-hourly": dynamic(() => import("@/components/international-finance-tools/USSalaryVsHourly")),
  "us-cost-of-living-comparison": dynamic(() => import("@/components/international-finance-tools/USCostOfLivingComparison")),
  "us-health-insurance-estimator": dynamic(() => import("@/components/international-finance-tools/USHealthInsuranceEstimator")),
  "us-payroll-tax-calculator": dynamic(() => import("@/components/international-finance-tools/USPayrollTaxCalculator")),
  "us-bonus-tax-calculator": dynamic(() => import("@/components/international-finance-tools/USBonusTaxCalculator")),
  "us-w4-withholding-calculator": dynamic(() => import("@/components/international-finance-tools/USW4Calculator")),
  "us-gas-cost-calculator": dynamic(() => import("@/components/international-finance-tools/USGasCostCalculator")),
  "us-car-loan-calculator": dynamic(() => import("@/components/international-finance-tools/USCarLoanCalculator")),
  "us-rent-affordability-calculator": dynamic(() => import("@/components/international-finance-tools/USRentAffordabilityCalculator")),
  "us-net-worth-calculator": dynamic(() => import("@/components/international-finance-tools/USNetWorthCalculator")),
  "us-hourly-wage-calculator": dynamic(() => import("@/components/international-finance-tools/USHourlyWageCalculator")),
  "us-child-tax-credit-calculator": dynamic(() => import("@/components/international-finance-tools/USChildTaxCreditCalculator")),
  "us-inflation-calculator": dynamic(() => import("@/components/international-finance-tools/USInflationCalculator")),

  // ── Canada Finance (Batch 2) ──────────────────────────────
  "canada-ei-benefits-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaEIBenefitsCalculator")),
  "canada-land-transfer-tax-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaLandTransferTaxCalculator")),
  "canada-self-employment-tax": dynamic(() => import("@/components/international-finance-tools/CanadaSelfEmploymentTax")),
  "canada-retirement-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaRetirementCalculator")),
  "canada-salary-comparison-by-province": dynamic(() => import("@/components/international-finance-tools/CanadaSalaryComparisonByProvince")),
  "canada-rrsp-vs-tfsa": dynamic(() => import("@/components/international-finance-tools/CanadaRRSPvsTFSA")),
  "canada-car-loan-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaCarLoanCalculator")),

  // ── Australia Finance (Batch 2) ───────────────────────────
  "australia-rental-yield-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaRentalYieldCalculator")),
  "australia-salary-sacrifice-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaSalarySacrificeCalculator")),
  "australia-centrelink-estimator": dynamic(() => import("@/components/international-finance-tools/AustraliaCentrelinkEstimator")),
  "australia-fuel-cost-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaFuelCostCalculator")),
  "australia-pension-age-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaPensionAgeCalculator")),
  "australia-contractor-vs-employee": dynamic(() => import("@/components/international-finance-tools/AustraliaContractorVsEmployee")),
  "australia-cost-of-living-by-city": dynamic(() => import("@/components/international-finance-tools/AustraliaCostOfLivingByCity")),

  // ── US Beyond-Finance ─────────────────────────────────────
  "us-cooking-measurement-converter": dynamic(() => import("@/components/international-finance-tools/USCookingMeasurementConverter")),
  "fahrenheit-weather-guide": dynamic(() => import("@/components/international-finance-tools/FahrenheitWeatherGuide")),
  "us-college-cost-calculator": dynamic(() => import("@/components/international-finance-tools/USCollegeCostCalculator")),
  "sat-score-calculator": dynamic(() => import("@/components/international-finance-tools/SATScoreCalculator")),
  "us-school-grade-calculator": dynamic(() => import("@/components/international-finance-tools/USSchoolGradeCalculator")),
  "us-health-insurance-cost-estimator": dynamic(() => import("@/components/international-finance-tools/USHealthInsuranceCostEstimator")),
  "us-medical-bill-estimator": dynamic(() => import("@/components/international-finance-tools/USMedicalBillEstimator")),
  "us-hsa-calculator": dynamic(() => import("@/components/international-finance-tools/USHSACalculator")),
  "us-car-payment-calculator": dynamic(() => import("@/components/international-finance-tools/USCarPaymentCalculator")),
  "us-ev-tax-credit-checker": dynamic(() => import("@/components/international-finance-tools/USEVTaxCreditChecker")),
  "us-w2-vs-1099-comparison": dynamic(() => import("@/components/international-finance-tools/USW2vs1099Comparison")),
  "us-closing-costs-calculator": dynamic(() => import("@/components/international-finance-tools/USClosingCostsCalculator")),
  "us-election-countdown": dynamic(() => import("@/components/international-finance-tools/USElectionCountdown")),
  "super-bowl-countdown": dynamic(() => import("@/components/international-finance-tools/SuperBowlCountdown")),
  "us-gas-price-tracker": dynamic(() => import("@/components/international-finance-tools/USGasPriceTracker")),

  // ── Canada Beyond-Finance ─────────────────────────────────
  "canada-snow-day-probability": dynamic(() => import("@/components/international-finance-tools/CanadaSnowDayProbability")),
  "canada-child-care-cost-by-province": dynamic(() => import("@/components/international-finance-tools/CanadaChildCareCostByProvince")),
  "canada-tipping-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaTippingCalculator")),
  "canada-winter-tyre-date-checker": dynamic(() => import("@/components/international-finance-tools/CanadaWinterTyreDateChecker")),
  "canada-turkey-size-calculator": dynamic(() => import("@/components/international-finance-tools/CanadaTurkeySizeCalculator")),
  "canada-university-tuition-estimator": dynamic(() => import("@/components/international-finance-tools/CanadaUniversityTuitionEstimator")),
  "canada-parental-leave-splitter": dynamic(() => import("@/components/international-finance-tools/CanadaParentalLeaveSplitter")),

  // ── Australia Beyond-Finance ──────────────────────────────
  "australia-long-service-leave-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaLongServiceLeaveCalculator")),
  "australia-school-zone-speed-reminder": dynamic(() => import("@/components/international-finance-tools/AustraliaSchoolZoneSpeedReminder")),
  "australia-bushfire-risk-checker": dynamic(() => import("@/components/international-finance-tools/AustraliaBushfireRiskChecker")),
  "australia-water-usage-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaWaterUsageCalculator")),
  "australia-skin-cancer-check-reminder": dynamic(() => import("@/components/international-finance-tools/AustraliaSkinCancerCheckReminder")),
  "australia-electricity-plan-comparison": dynamic(() => import("@/components/international-finance-tools/AustraliaElectricityPlanComparison")),
  "australia-pet-registration-cost": dynamic(() => import("@/components/international-finance-tools/AustraliaPetRegistrationCost")),
  "australia-rego-cost-calculator": dynamic(() => import("@/components/international-finance-tools/AustraliaRegoCostCalculator")),

  // ── Universal / Cross-Country (Batch 2) ───────────────────
  "blood-alcohol-limit-by-country": dynamic(() => import("@/components/international-finance-tools/BloodAlcoholLimitByCountry")),
  "notice-period-calculator": dynamic(() => import("@/components/international-finance-tools/NoticePeriodCalculator")),
};

export function getToolComponent(slug) {
  return components[slug] || null;
}
