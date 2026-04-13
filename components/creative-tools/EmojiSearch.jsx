'use client';

import { useState, useMemo, useCallback } from 'react';
import Card from '@/components/ui/Card';

const EMOJIS = [
  // Smileys
  { emoji: "\u{1F600}", name: "grinning face", category: "smileys", keywords: ["happy", "smile", "grin"] },
  { emoji: "\u{1F603}", name: "grinning face with big eyes", category: "smileys", keywords: ["happy", "joy"] },
  { emoji: "\u{1F604}", name: "grinning face with smiling eyes", category: "smileys", keywords: ["happy", "joy", "laugh"] },
  { emoji: "\u{1F601}", name: "beaming face", category: "smileys", keywords: ["happy", "grin", "smile"] },
  { emoji: "\u{1F606}", name: "grinning squinting face", category: "smileys", keywords: ["happy", "laugh", "lol"] },
  { emoji: "\u{1F605}", name: "grinning face with sweat", category: "smileys", keywords: ["hot", "relief", "nervous"] },
  { emoji: "\u{1F602}", name: "face with tears of joy", category: "smileys", keywords: ["laugh", "funny", "lol", "cry"] },
  { emoji: "\u{1F923}", name: "rolling on floor laughing", category: "smileys", keywords: ["laugh", "funny", "rofl"] },
  { emoji: "\u{1F642}", name: "slightly smiling face", category: "smileys", keywords: ["smile", "happy"] },
  { emoji: "\u{1F643}", name: "upside-down face", category: "smileys", keywords: ["sarcasm", "silly", "awkward"] },
  { emoji: "\u{1F609}", name: "winking face", category: "smileys", keywords: ["wink", "flirt", "joke"] },
  { emoji: "\u{1F60A}", name: "smiling face with smiling eyes", category: "smileys", keywords: ["happy", "blush", "warm"] },
  { emoji: "\u{1F607}", name: "smiling face with halo", category: "smileys", keywords: ["angel", "innocent", "good"] },
  { emoji: "\u{1F970}", name: "smiling face with hearts", category: "smileys", keywords: ["love", "crush", "adore"] },
  { emoji: "\u{1F60D}", name: "heart eyes", category: "smileys", keywords: ["love", "crush", "heart"] },
  { emoji: "\u{1F929}", name: "star-struck", category: "smileys", keywords: ["wow", "amazing", "star", "eyes"] },
  { emoji: "\u{1F618}", name: "face blowing a kiss", category: "smileys", keywords: ["kiss", "love", "heart"] },
  { emoji: "\u{1F617}", name: "kissing face", category: "smileys", keywords: ["kiss", "love"] },
  { emoji: "\u{1F61A}", name: "kissing face with closed eyes", category: "smileys", keywords: ["kiss", "love"] },
  { emoji: "\u{1F60B}", name: "face savoring food", category: "smileys", keywords: ["yummy", "delicious", "tongue"] },
  { emoji: "\u{1F61C}", name: "winking face with tongue", category: "smileys", keywords: ["tongue", "silly", "playful"] },
  { emoji: "\u{1F61D}", name: "squinting face with tongue", category: "smileys", keywords: ["tongue", "silly", "prank"] },
  { emoji: "\u{1F911}", name: "money-mouth face", category: "smileys", keywords: ["money", "rich", "dollar"] },
  { emoji: "\u{1F917}", name: "hugging face", category: "smileys", keywords: ["hug", "warm", "care"] },
  { emoji: "\u{1F914}", name: "thinking face", category: "smileys", keywords: ["think", "hmm", "wonder"] },
  { emoji: "\u{1F910}", name: "zipper-mouth face", category: "smileys", keywords: ["secret", "quiet", "shh"] },
  { emoji: "\u{1F928}", name: "face with raised eyebrow", category: "smileys", keywords: ["suspicious", "doubt", "skeptical"] },
  { emoji: "\u{1F610}", name: "neutral face", category: "smileys", keywords: ["meh", "blank", "indifferent"] },
  { emoji: "\u{1F611}", name: "expressionless face", category: "smileys", keywords: ["blank", "bored", "flat"] },
  { emoji: "\u{1F636}", name: "face without mouth", category: "smileys", keywords: ["speechless", "quiet", "mute"] },
  { emoji: "\u{1F60F}", name: "smirking face", category: "smileys", keywords: ["smirk", "flirt", "sly"] },
  { emoji: "\u{1F612}", name: "unamused face", category: "smileys", keywords: ["bored", "disappointed", "annoyed"] },
  { emoji: "\u{1F644}", name: "face with rolling eyes", category: "smileys", keywords: ["eye roll", "annoyed", "whatever"] },
  { emoji: "\u{1F62C}", name: "grimacing face", category: "smileys", keywords: ["awkward", "nervous", "cringe"] },
  { emoji: "\u{1F925}", name: "lying face", category: "smileys", keywords: ["lie", "pinocchio", "dishonest"] },
  { emoji: "\u{1F60C}", name: "relieved face", category: "smileys", keywords: ["relieved", "calm", "relaxed"] },
  { emoji: "\u{1F614}", name: "pensive face", category: "smileys", keywords: ["sad", "thoughtful", "pensive"] },
  { emoji: "\u{1F62A}", name: "sleepy face", category: "smileys", keywords: ["tired", "sleep", "rest"] },
  { emoji: "\u{1F634}", name: "sleeping face", category: "smileys", keywords: ["sleep", "zzz", "tired"] },
  { emoji: "\u{1F637}", name: "face with medical mask", category: "smileys", keywords: ["sick", "mask", "covid", "ill"] },
  { emoji: "\u{1F912}", name: "face with thermometer", category: "smileys", keywords: ["sick", "fever", "ill"] },
  { emoji: "\u{1F915}", name: "face with head-bandage", category: "smileys", keywords: ["hurt", "injured", "bandage"] },
  { emoji: "\u{1F922}", name: "nauseated face", category: "smileys", keywords: ["sick", "nausea", "gross"] },
  { emoji: "\u{1F92E}", name: "vomiting face", category: "smileys", keywords: ["sick", "vomit", "throw up"] },
  { emoji: "\u{1F927}", name: "sneezing face", category: "smileys", keywords: ["sneeze", "cold", "sick"] },
  { emoji: "\u{1F975}", name: "hot face", category: "smileys", keywords: ["hot", "heat", "sweat"] },
  { emoji: "\u{1F976}", name: "cold face", category: "smileys", keywords: ["cold", "freeze", "ice"] },
  { emoji: "\u{1F631}", name: "face screaming in fear", category: "smileys", keywords: ["scream", "horror", "scared"] },
  { emoji: "\u{1F621}", name: "pouting face", category: "smileys", keywords: ["angry", "rage", "mad"] },
  { emoji: "\u{1F620}", name: "angry face", category: "smileys", keywords: ["angry", "mad", "annoyed"] },
  { emoji: "\u{1F92C}", name: "face with symbols on mouth", category: "smileys", keywords: ["swear", "angry", "curse"] },
  { emoji: "\u{1F608}", name: "smiling face with horns", category: "smileys", keywords: ["devil", "evil", "mischief"] },
  { emoji: "\u{1F480}", name: "skull", category: "smileys", keywords: ["dead", "death", "skeleton"] },
  { emoji: "\u{1F4A9}", name: "pile of poo", category: "smileys", keywords: ["poo", "poop", "funny"] },
  { emoji: "\u{1F921}", name: "clown face", category: "smileys", keywords: ["clown", "funny", "joke"] },
  { emoji: "\u{1F47B}", name: "ghost", category: "smileys", keywords: ["ghost", "spooky", "halloween"] },
  { emoji: "\u{1F47D}", name: "alien", category: "smileys", keywords: ["alien", "space", "ufo"] },
  { emoji: "\u{1F916}", name: "robot", category: "smileys", keywords: ["robot", "ai", "tech"] },
  { emoji: "\u{1F63A}", name: "grinning cat", category: "smileys", keywords: ["cat", "happy", "smile"] },
  // People
  { emoji: "\u{1F44B}", name: "waving hand", category: "people", keywords: ["wave", "hello", "goodbye", "hi"] },
  { emoji: "\u{1F91A}", name: "raised back of hand", category: "people", keywords: ["hand", "backhand"] },
  { emoji: "\u{1F590}\uFE0F", name: "hand with fingers splayed", category: "people", keywords: ["hand", "fingers", "five"] },
  { emoji: "\u270B", name: "raised hand", category: "people", keywords: ["hand", "stop", "high five"] },
  { emoji: "\u{1F596}", name: "vulcan salute", category: "people", keywords: ["spock", "star trek", "hand"] },
  { emoji: "\u{1F44C}", name: "OK hand", category: "people", keywords: ["ok", "perfect", "good"] },
  { emoji: "\u{1F90C}", name: "pinched fingers", category: "people", keywords: ["italian", "what", "gesture"] },
  { emoji: "\u270C\uFE0F", name: "victory hand", category: "people", keywords: ["peace", "victory", "two"] },
  { emoji: "\u{1F91E}", name: "crossed fingers", category: "people", keywords: ["luck", "hope", "fingers crossed"] },
  { emoji: "\u{1F91F}", name: "love-you gesture", category: "people", keywords: ["love", "rock", "hand"] },
  { emoji: "\u{1F918}", name: "sign of the horns", category: "people", keywords: ["rock", "metal", "horns"] },
  { emoji: "\u{1F919}", name: "call me hand", category: "people", keywords: ["call", "phone", "shaka"] },
  { emoji: "\u{1F448}", name: "backhand index pointing left", category: "people", keywords: ["point", "left", "direction"] },
  { emoji: "\u{1F449}", name: "backhand index pointing right", category: "people", keywords: ["point", "right", "direction"] },
  { emoji: "\u{1F446}", name: "backhand index pointing up", category: "people", keywords: ["point", "up", "direction"] },
  { emoji: "\u{1F447}", name: "backhand index pointing down", category: "people", keywords: ["point", "down", "direction"] },
  { emoji: "\u261D\uFE0F", name: "index pointing up", category: "people", keywords: ["point", "up", "one"] },
  { emoji: "\u{1F44D}", name: "thumbs up", category: "people", keywords: ["like", "approve", "yes", "good"] },
  { emoji: "\u{1F44E}", name: "thumbs down", category: "people", keywords: ["dislike", "no", "bad"] },
  { emoji: "\u270A", name: "raised fist", category: "people", keywords: ["fist", "power", "punch"] },
  { emoji: "\u{1F44A}", name: "oncoming fist", category: "people", keywords: ["punch", "fist bump"] },
  { emoji: "\u{1F91B}", name: "left-facing fist", category: "people", keywords: ["fist", "bump"] },
  { emoji: "\u{1F91C}", name: "right-facing fist", category: "people", keywords: ["fist", "bump"] },
  { emoji: "\u{1F44F}", name: "clapping hands", category: "people", keywords: ["clap", "applause", "bravo"] },
  { emoji: "\u{1F64C}", name: "raising hands", category: "people", keywords: ["celebrate", "hooray", "praise"] },
  { emoji: "\u{1F450}", name: "open hands", category: "people", keywords: ["hands", "open"] },
  { emoji: "\u{1F932}", name: "palms up together", category: "people", keywords: ["prayer", "please"] },
  { emoji: "\u{1F91D}", name: "handshake", category: "people", keywords: ["agree", "deal", "meeting"] },
  { emoji: "\u{1F64F}", name: "folded hands", category: "people", keywords: ["pray", "please", "thank you", "hope"] },
  { emoji: "\u{1F4AA}", name: "flexed biceps", category: "people", keywords: ["strong", "muscle", "power", "arm"] },
  { emoji: "\u{1F9E0}", name: "brain", category: "people", keywords: ["smart", "think", "mind", "brain"] },
  { emoji: "\u{1F441}\uFE0F", name: "eye", category: "people", keywords: ["eye", "look", "see", "watch"] },
  { emoji: "\u{1F463}", name: "footprints", category: "people", keywords: ["feet", "walk", "steps"] },
  // Animals
  { emoji: "\u{1F436}", name: "dog face", category: "animals", keywords: ["dog", "puppy", "pet"] },
  { emoji: "\u{1F431}", name: "cat face", category: "animals", keywords: ["cat", "kitten", "pet"] },
  { emoji: "\u{1F42D}", name: "mouse face", category: "animals", keywords: ["mouse", "rodent"] },
  { emoji: "\u{1F439}", name: "hamster", category: "animals", keywords: ["hamster", "pet", "cute"] },
  { emoji: "\u{1F430}", name: "rabbit face", category: "animals", keywords: ["rabbit", "bunny", "easter"] },
  { emoji: "\u{1F98A}", name: "fox", category: "animals", keywords: ["fox", "clever", "orange"] },
  { emoji: "\u{1F43B}", name: "bear", category: "animals", keywords: ["bear", "brown bear"] },
  { emoji: "\u{1F43C}", name: "panda", category: "animals", keywords: ["panda", "bear", "cute"] },
  { emoji: "\u{1F428}", name: "koala", category: "animals", keywords: ["koala", "australia", "cute"] },
  { emoji: "\u{1F42F}", name: "tiger face", category: "animals", keywords: ["tiger", "cat", "wild"] },
  { emoji: "\u{1F981}", name: "lion", category: "animals", keywords: ["lion", "king", "wild"] },
  { emoji: "\u{1F42E}", name: "cow face", category: "animals", keywords: ["cow", "farm", "milk"] },
  { emoji: "\u{1F437}", name: "pig face", category: "animals", keywords: ["pig", "farm", "oink"] },
  { emoji: "\u{1F438}", name: "frog", category: "animals", keywords: ["frog", "toad", "green"] },
  { emoji: "\u{1F435}", name: "monkey face", category: "animals", keywords: ["monkey", "ape", "primate"] },
  { emoji: "\u{1F414}", name: "chicken", category: "animals", keywords: ["chicken", "hen", "farm"] },
  { emoji: "\u{1F427}", name: "penguin", category: "animals", keywords: ["penguin", "ice", "bird"] },
  { emoji: "\u{1F426}", name: "bird", category: "animals", keywords: ["bird", "fly", "tweet"] },
  { emoji: "\u{1F985}", name: "eagle", category: "animals", keywords: ["eagle", "bird", "freedom"] },
  { emoji: "\u{1F987}", name: "bat", category: "animals", keywords: ["bat", "vampire", "night"] },
  { emoji: "\u{1F43A}", name: "wolf", category: "animals", keywords: ["wolf", "howl", "wild"] },
  { emoji: "\u{1F417}", name: "boar", category: "animals", keywords: ["boar", "pig", "wild"] },
  { emoji: "\u{1F434}", name: "horse face", category: "animals", keywords: ["horse", "pony", "ride"] },
  { emoji: "\u{1F984}", name: "unicorn", category: "animals", keywords: ["unicorn", "magic", "fantasy", "horse"] },
  { emoji: "\u{1F41D}", name: "honeybee", category: "animals", keywords: ["bee", "honey", "insect"] },
  { emoji: "\u{1F98B}", name: "butterfly", category: "animals", keywords: ["butterfly", "insect", "pretty"] },
  { emoji: "\u{1F40C}", name: "snail", category: "animals", keywords: ["snail", "slow"] },
  { emoji: "\u{1F422}", name: "turtle", category: "animals", keywords: ["turtle", "slow", "shell"] },
  { emoji: "\u{1F40D}", name: "snake", category: "animals", keywords: ["snake", "reptile"] },
  { emoji: "\u{1F419}", name: "octopus", category: "animals", keywords: ["octopus", "sea", "tentacles"] },
  { emoji: "\u{1F433}", name: "whale", category: "animals", keywords: ["whale", "ocean", "sea"] },
  { emoji: "\u{1F42C}", name: "dolphin", category: "animals", keywords: ["dolphin", "sea", "smart"] },
  { emoji: "\u{1F420}", name: "tropical fish", category: "animals", keywords: ["fish", "tropical", "sea"] },
  { emoji: "\u{1F988}", name: "shark", category: "animals", keywords: ["shark", "sea", "danger"] },
  { emoji: "\u{1F40A}", name: "crocodile", category: "animals", keywords: ["crocodile", "alligator", "reptile"] },
  { emoji: "\u{1F98E}", name: "lizard", category: "animals", keywords: ["lizard", "reptile", "gecko"] },
  { emoji: "\u{1F995}", name: "dinosaur", category: "animals", keywords: ["dinosaur", "t-rex", "extinct"] },
  // Food
  { emoji: "\u{1F34E}", name: "red apple", category: "food", keywords: ["apple", "fruit", "red"] },
  { emoji: "\u{1F34A}", name: "tangerine", category: "food", keywords: ["orange", "citrus", "fruit"] },
  { emoji: "\u{1F34B}", name: "lemon", category: "food", keywords: ["lemon", "citrus", "sour"] },
  { emoji: "\u{1F34C}", name: "banana", category: "food", keywords: ["banana", "fruit", "yellow"] },
  { emoji: "\u{1F349}", name: "watermelon", category: "food", keywords: ["watermelon", "summer", "fruit"] },
  { emoji: "\u{1F347}", name: "grapes", category: "food", keywords: ["grapes", "fruit", "wine"] },
  { emoji: "\u{1F353}", name: "strawberry", category: "food", keywords: ["strawberry", "fruit", "berry"] },
  { emoji: "\u{1F352}", name: "cherries", category: "food", keywords: ["cherry", "fruit", "red"] },
  { emoji: "\u{1F351}", name: "peach", category: "food", keywords: ["peach", "fruit"] },
  { emoji: "\u{1F34D}", name: "pineapple", category: "food", keywords: ["pineapple", "tropical", "fruit"] },
  { emoji: "\u{1F96D}", name: "mango", category: "food", keywords: ["mango", "tropical", "fruit"] },
  { emoji: "\u{1F951}", name: "avocado", category: "food", keywords: ["avocado", "guacamole", "healthy"] },
  { emoji: "\u{1F955}", name: "carrot", category: "food", keywords: ["carrot", "vegetable", "orange"] },
  { emoji: "\u{1F33D}", name: "ear of corn", category: "food", keywords: ["corn", "vegetable", "maize"] },
  { emoji: "\u{1F336}\uFE0F", name: "hot pepper", category: "food", keywords: ["pepper", "spicy", "hot", "chili"] },
  { emoji: "\u{1F966}", name: "broccoli", category: "food", keywords: ["broccoli", "vegetable", "green"] },
  { emoji: "\u{1F9C5}", name: "onion", category: "food", keywords: ["onion", "vegetable", "cry"] },
  { emoji: "\u{1F344}", name: "mushroom", category: "food", keywords: ["mushroom", "fungus"] },
  { emoji: "\u{1F354}", name: "hamburger", category: "food", keywords: ["burger", "fast food", "meat"] },
  { emoji: "\u{1F355}", name: "pizza", category: "food", keywords: ["pizza", "food", "italian"] },
  { emoji: "\u{1F32E}", name: "taco", category: "food", keywords: ["taco", "mexican", "food"] },
  { emoji: "\u{1F32F}", name: "burrito", category: "food", keywords: ["burrito", "mexican", "wrap"] },
  { emoji: "\u{1F37F}", name: "popcorn", category: "food", keywords: ["popcorn", "movie", "snack"] },
  { emoji: "\u{1F363}", name: "sushi", category: "food", keywords: ["sushi", "japanese", "fish", "rice"] },
  { emoji: "\u{1F370}", name: "shortcake", category: "food", keywords: ["cake", "dessert", "sweet"] },
  { emoji: "\u{1F369}", name: "doughnut", category: "food", keywords: ["donut", "dessert", "sweet"] },
  { emoji: "\u{1F36B}", name: "chocolate bar", category: "food", keywords: ["chocolate", "candy", "sweet"] },
  { emoji: "\u{1F36D}", name: "lollipop", category: "food", keywords: ["lollipop", "candy", "sweet"] },
  { emoji: "\u{1F366}", name: "soft ice cream", category: "food", keywords: ["ice cream", "dessert", "cold"] },
  { emoji: "\u{1F36A}", name: "cookie", category: "food", keywords: ["cookie", "biscuit", "sweet"] },
  { emoji: "\u{1F382}", name: "birthday cake", category: "food", keywords: ["cake", "birthday", "party", "celebration"] },
  { emoji: "\u2615", name: "hot beverage", category: "food", keywords: ["coffee", "tea", "drink", "hot"] },
  { emoji: "\u{1F375}", name: "teacup without handle", category: "food", keywords: ["tea", "green tea", "drink"] },
  { emoji: "\u{1F37A}", name: "beer mug", category: "food", keywords: ["beer", "drink", "alcohol", "pub"] },
  { emoji: "\u{1F377}", name: "wine glass", category: "food", keywords: ["wine", "drink", "alcohol", "red"] },
  { emoji: "\u{1F37E}", name: "bottle with popping cork", category: "food", keywords: ["champagne", "celebrate", "party"] },
  { emoji: "\u{1F943}", name: "tumbler glass", category: "food", keywords: ["whiskey", "drink", "alcohol"] },
  // Travel
  { emoji: "\u{1F697}", name: "automobile", category: "travel", keywords: ["car", "drive", "vehicle"] },
  { emoji: "\u{1F695}", name: "taxi", category: "travel", keywords: ["taxi", "cab", "ride"] },
  { emoji: "\u{1F68C}", name: "bus", category: "travel", keywords: ["bus", "transit", "public"] },
  { emoji: "\u{1F691}", name: "ambulance", category: "travel", keywords: ["ambulance", "emergency", "hospital"] },
  { emoji: "\u{1F692}", name: "fire engine", category: "travel", keywords: ["fire", "truck", "emergency"] },
  { emoji: "\u{1F693}", name: "police car", category: "travel", keywords: ["police", "cop", "law"] },
  { emoji: "\u{1F3CE}\uFE0F", name: "racing car", category: "travel", keywords: ["race", "fast", "formula"] },
  { emoji: "\u{1F6B2}", name: "bicycle", category: "travel", keywords: ["bike", "cycle", "ride"] },
  { emoji: "\u{1F6F5}", name: "motor scooter", category: "travel", keywords: ["scooter", "moped", "ride"] },
  { emoji: "\u{1F6E9}\uFE0F", name: "small airplane", category: "travel", keywords: ["plane", "fly", "travel"] },
  { emoji: "\u2708\uFE0F", name: "airplane", category: "travel", keywords: ["plane", "fly", "travel", "flight"] },
  { emoji: "\u{1F680}", name: "rocket", category: "travel", keywords: ["rocket", "space", "launch", "fast"] },
  { emoji: "\u{1F6F8}", name: "flying saucer", category: "travel", keywords: ["ufo", "alien", "space"] },
  { emoji: "\u{1F6A2}", name: "ship", category: "travel", keywords: ["ship", "boat", "cruise", "sea"] },
  { emoji: "\u{1F3D6}\uFE0F", name: "beach with umbrella", category: "travel", keywords: ["beach", "vacation", "sun", "sea"] },
  { emoji: "\u{1F3D4}\uFE0F", name: "snow-capped mountain", category: "travel", keywords: ["mountain", "snow", "skiing"] },
  { emoji: "\u{1F30D}", name: "globe showing Europe-Africa", category: "travel", keywords: ["world", "earth", "globe", "europe"] },
  { emoji: "\u{1F30E}", name: "globe showing Americas", category: "travel", keywords: ["world", "earth", "globe", "america"] },
  { emoji: "\u{1F30F}", name: "globe showing Asia-Australia", category: "travel", keywords: ["world", "earth", "globe", "asia"] },
  { emoji: "\u{1F5FA}\uFE0F", name: "world map", category: "travel", keywords: ["map", "world", "travel"] },
  { emoji: "\u{1F3E0}", name: "house", category: "travel", keywords: ["house", "home", "building"] },
  { emoji: "\u{1F3E2}", name: "office building", category: "travel", keywords: ["office", "work", "building"] },
  { emoji: "\u{1F3E5}", name: "hospital", category: "travel", keywords: ["hospital", "medical", "health"] },
  { emoji: "\u{1F3EB}", name: "school", category: "travel", keywords: ["school", "education", "building"] },
  { emoji: "\u{1F3F0}", name: "castle", category: "travel", keywords: ["castle", "medieval", "princess"] },
  { emoji: "\u26F2", name: "fountain", category: "travel", keywords: ["fountain", "park", "water"] },
  { emoji: "\u{1F5FC}", name: "Tokyo tower", category: "travel", keywords: ["tokyo", "japan", "tower"] },
  { emoji: "\u{1F5FD}", name: "Statue of Liberty", category: "travel", keywords: ["liberty", "new york", "usa", "statue"] },
  { emoji: "\u26F5", name: "sailboat", category: "travel", keywords: ["sail", "boat", "sea", "wind"] },
  { emoji: "\u{1F6A6}", name: "vertical traffic light", category: "travel", keywords: ["traffic", "light", "stop"] },
  // Activities
  { emoji: "\u26BD", name: "soccer ball", category: "activities", keywords: ["football", "soccer", "sport"] },
  { emoji: "\u{1F3C0}", name: "basketball", category: "activities", keywords: ["basketball", "sport", "ball"] },
  { emoji: "\u{1F3C8}", name: "american football", category: "activities", keywords: ["football", "sport", "nfl"] },
  { emoji: "\u26BE", name: "baseball", category: "activities", keywords: ["baseball", "sport", "ball"] },
  { emoji: "\u{1F3BE}", name: "tennis", category: "activities", keywords: ["tennis", "sport", "racket"] },
  { emoji: "\u{1F3D0}", name: "volleyball", category: "activities", keywords: ["volleyball", "sport", "beach"] },
  { emoji: "\u{1F3B1}", name: "pool 8 ball", category: "activities", keywords: ["pool", "billiards", "game"] },
  { emoji: "\u{1F3D3}", name: "ping pong", category: "activities", keywords: ["ping pong", "table tennis", "sport"] },
  { emoji: "\u{1F3C6}", name: "trophy", category: "activities", keywords: ["trophy", "win", "award", "champion"] },
  { emoji: "\u{1F3C5}", name: "sports medal", category: "activities", keywords: ["medal", "win", "award"] },
  { emoji: "\u{1F947}", name: "1st place medal", category: "activities", keywords: ["gold", "first", "winner"] },
  { emoji: "\u{1F3AF}", name: "bullseye", category: "activities", keywords: ["target", "dart", "aim"] },
  { emoji: "\u{1F3B3}", name: "bowling", category: "activities", keywords: ["bowling", "sport", "pins"] },
  { emoji: "\u{1F3AE}", name: "video game", category: "activities", keywords: ["game", "gaming", "controller"] },
  { emoji: "\u{1F3B2}", name: "game die", category: "activities", keywords: ["dice", "game", "luck", "random"] },
  { emoji: "\u{1F3B5}", name: "musical note", category: "activities", keywords: ["music", "note", "song"] },
  { emoji: "\u{1F3B6}", name: "musical notes", category: "activities", keywords: ["music", "notes", "melody"] },
  { emoji: "\u{1F3A4}", name: "microphone", category: "activities", keywords: ["sing", "karaoke", "music"] },
  { emoji: "\u{1F3A7}", name: "headphone", category: "activities", keywords: ["headphones", "music", "listen"] },
  { emoji: "\u{1F3B8}", name: "guitar", category: "activities", keywords: ["guitar", "music", "rock"] },
  { emoji: "\u{1F3B9}", name: "musical keyboard", category: "activities", keywords: ["piano", "keyboard", "music"] },
  { emoji: "\u{1F3A8}", name: "artist palette", category: "activities", keywords: ["art", "paint", "creative"] },
  { emoji: "\u{1F3AC}", name: "clapper board", category: "activities", keywords: ["movie", "film", "cinema"] },
  { emoji: "\u{1F4F7}", name: "camera", category: "activities", keywords: ["camera", "photo", "picture"] },
  { emoji: "\u{1F3AD}", name: "performing arts", category: "activities", keywords: ["theater", "drama", "masks"] },
  { emoji: "\u{1F3AA}", name: "circus tent", category: "activities", keywords: ["circus", "tent", "show"] },
  { emoji: "\u{1F9E9}", name: "puzzle piece", category: "activities", keywords: ["puzzle", "jigsaw", "game"] },
  { emoji: "\u265F\uFE0F", name: "chess pawn", category: "activities", keywords: ["chess", "game", "strategy"] },
  { emoji: "\u{1F3B0}", name: "slot machine", category: "activities", keywords: ["casino", "gamble", "luck"] },
  { emoji: "\u{1FA81}", name: "kite", category: "activities", keywords: ["kite", "fly", "wind", "outdoor"] },
  // Objects
  { emoji: "\u{1F4F1}", name: "mobile phone", category: "objects", keywords: ["phone", "mobile", "cell", "smartphone"] },
  { emoji: "\u{1F4BB}", name: "laptop", category: "objects", keywords: ["computer", "laptop", "pc", "work"] },
  { emoji: "\u{1F5A5}\uFE0F", name: "desktop computer", category: "objects", keywords: ["computer", "desktop", "pc", "work"] },
  { emoji: "\u{1F4FA}", name: "television", category: "objects", keywords: ["tv", "television", "watch", "screen"] },
  { emoji: "\u{1F4F0}", name: "newspaper", category: "objects", keywords: ["news", "paper", "media"] },
  { emoji: "\u{1F4DA}", name: "books", category: "objects", keywords: ["books", "read", "library", "study"] },
  { emoji: "\u{1F4D6}", name: "open book", category: "objects", keywords: ["book", "read", "open"] },
  { emoji: "\u270F\uFE0F", name: "pencil", category: "objects", keywords: ["pencil", "write", "draw"] },
  { emoji: "\u{1F58A}\uFE0F", name: "pen", category: "objects", keywords: ["pen", "write", "ballpoint"] },
  { emoji: "\u{1F4CE}", name: "paperclip", category: "objects", keywords: ["paperclip", "attach", "office"] },
  { emoji: "\u{1F4CB}", name: "clipboard", category: "objects", keywords: ["clipboard", "list", "copy"] },
  { emoji: "\u{1F4C5}", name: "calendar", category: "objects", keywords: ["calendar", "date", "schedule"] },
  { emoji: "\u{1F4C8}", name: "chart increasing", category: "objects", keywords: ["chart", "graph", "growth", "up"] },
  { emoji: "\u{1F4C9}", name: "chart decreasing", category: "objects", keywords: ["chart", "graph", "decline", "down"] },
  { emoji: "\u{1F4E7}", name: "e-mail", category: "objects", keywords: ["email", "mail", "message"] },
  { emoji: "\u{1F4E6}", name: "package", category: "objects", keywords: ["package", "box", "delivery"] },
  { emoji: "\u{1F511}", name: "key", category: "objects", keywords: ["key", "lock", "secure"] },
  { emoji: "\u{1F512}", name: "locked", category: "objects", keywords: ["lock", "secure", "private"] },
  { emoji: "\u{1F513}", name: "unlocked", category: "objects", keywords: ["unlock", "open", "public"] },
  { emoji: "\u{1F50D}", name: "magnifying glass left", category: "objects", keywords: ["search", "find", "zoom", "magnify"] },
  { emoji: "\u{1F4A1}", name: "light bulb", category: "objects", keywords: ["idea", "light", "bulb", "bright"] },
  { emoji: "\u{1F50B}", name: "battery", category: "objects", keywords: ["battery", "power", "charge"] },
  { emoji: "\u{1F50C}", name: "electric plug", category: "objects", keywords: ["plug", "power", "electric"] },
  { emoji: "\u{1F4B0}", name: "money bag", category: "objects", keywords: ["money", "rich", "dollar", "cash"] },
  { emoji: "\u{1F4B3}", name: "credit card", category: "objects", keywords: ["credit", "card", "payment", "money"] },
  { emoji: "\u{1F48E}", name: "gem stone", category: "objects", keywords: ["diamond", "gem", "jewel"] },
  { emoji: "\u2696\uFE0F", name: "balance scale", category: "objects", keywords: ["scale", "balance", "law", "justice"] },
  { emoji: "\u{1F527}", name: "wrench", category: "objects", keywords: ["wrench", "tool", "fix", "repair"] },
  { emoji: "\u{1F528}", name: "hammer", category: "objects", keywords: ["hammer", "tool", "build"] },
  { emoji: "\u{1F6E1}\uFE0F", name: "shield", category: "objects", keywords: ["shield", "protect", "defense"] },
  { emoji: "\u{1F3F7}\uFE0F", name: "label", category: "objects", keywords: ["label", "tag", "price"] },
  { emoji: "\u{1F4CC}", name: "pushpin", category: "objects", keywords: ["pin", "location", "mark"] },
  { emoji: "\u23F0", name: "alarm clock", category: "objects", keywords: ["alarm", "clock", "time", "wake"] },
  { emoji: "\u{1F570}\uFE0F", name: "mantelpiece clock", category: "objects", keywords: ["clock", "time", "vintage"] },
  { emoji: "\u231B", name: "hourglass done", category: "objects", keywords: ["hourglass", "time", "sand"] },
  { emoji: "\u{1F52E}", name: "crystal ball", category: "objects", keywords: ["crystal", "magic", "future", "fortune"] },
  // Symbols
  { emoji: "\u2764\uFE0F", name: "red heart", category: "symbols", keywords: ["heart", "love", "red"] },
  { emoji: "\u{1F9E1}", name: "orange heart", category: "symbols", keywords: ["heart", "love", "orange"] },
  { emoji: "\u{1F49B}", name: "yellow heart", category: "symbols", keywords: ["heart", "love", "yellow"] },
  { emoji: "\u{1F49A}", name: "green heart", category: "symbols", keywords: ["heart", "love", "green"] },
  { emoji: "\u{1F499}", name: "blue heart", category: "symbols", keywords: ["heart", "love", "blue"] },
  { emoji: "\u{1F49C}", name: "purple heart", category: "symbols", keywords: ["heart", "love", "purple"] },
  { emoji: "\u{1F5A4}", name: "black heart", category: "symbols", keywords: ["heart", "dark", "black"] },
  { emoji: "\u{1F90D}", name: "white heart", category: "symbols", keywords: ["heart", "white", "pure"] },
  { emoji: "\u{1F494}", name: "broken heart", category: "symbols", keywords: ["heart", "broken", "sad", "breakup"] },
  { emoji: "\u{1F495}", name: "two hearts", category: "symbols", keywords: ["hearts", "love", "couple"] },
  { emoji: "\u{1F496}", name: "sparkling heart", category: "symbols", keywords: ["heart", "sparkle", "love"] },
  { emoji: "\u{1F4AF}", name: "hundred points", category: "symbols", keywords: ["100", "perfect", "score"] },
  { emoji: "\u{1F4A5}", name: "collision", category: "symbols", keywords: ["boom", "explosion", "crash"] },
  { emoji: "\u{1F4AB}", name: "dizzy", category: "symbols", keywords: ["star", "dizzy", "sparkle"] },
  { emoji: "\u{1F4A2}", name: "anger symbol", category: "symbols", keywords: ["angry", "rage"] },
  { emoji: "\u2728", name: "sparkles", category: "symbols", keywords: ["sparkle", "shine", "glitter", "magic", "star"] },
  { emoji: "\u{1F31F}", name: "glowing star", category: "symbols", keywords: ["star", "glow", "shine"] },
  { emoji: "\u2B50", name: "star", category: "symbols", keywords: ["star", "favourite", "gold"] },
  { emoji: "\u{1F525}", name: "fire", category: "symbols", keywords: ["fire", "hot", "lit", "flame"] },
  { emoji: "\u{1F4A8}", name: "dashing away", category: "symbols", keywords: ["wind", "fast", "running"] },
  { emoji: "\u{1F4A7}", name: "droplet", category: "symbols", keywords: ["water", "drop", "sweat"] },
  { emoji: "\u2714\uFE0F", name: "check mark", category: "symbols", keywords: ["check", "yes", "done", "correct"] },
  { emoji: "\u274C", name: "cross mark", category: "symbols", keywords: ["no", "wrong", "error", "x"] },
  { emoji: "\u2753", name: "question mark", category: "symbols", keywords: ["question", "what", "why"] },
  { emoji: "\u2757", name: "exclamation mark", category: "symbols", keywords: ["exclamation", "alert", "important"] },
  { emoji: "\u267B\uFE0F", name: "recycling symbol", category: "symbols", keywords: ["recycle", "green", "eco"] },
  { emoji: "\u269B\uFE0F", name: "atom symbol", category: "symbols", keywords: ["atom", "science", "physics"] },
  { emoji: "\u262E\uFE0F", name: "peace symbol", category: "symbols", keywords: ["peace", "love", "hippie"] },
  { emoji: "\u267E\uFE0F", name: "infinity", category: "symbols", keywords: ["infinity", "forever", "loop"] },
  { emoji: "\u{1F6AB}", name: "prohibited", category: "symbols", keywords: ["no", "ban", "stop", "forbidden"] },
  { emoji: "\u{1F3C1}", name: "chequered flag", category: "symbols", keywords: ["flag", "finish", "race", "end"] },
  { emoji: "\u26A0\uFE0F", name: "warning", category: "symbols", keywords: ["warning", "caution", "alert"] },
  { emoji: "\u2795", name: "plus", category: "symbols", keywords: ["plus", "add", "positive"] },
  { emoji: "\u2796", name: "minus", category: "symbols", keywords: ["minus", "subtract", "negative"] },
  { emoji: "\u{1F504}", name: "counterclockwise arrows", category: "symbols", keywords: ["refresh", "reload", "repeat"] },
  // Flags
  { emoji: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom", category: "flags", keywords: ["uk", "britain", "england", "flag"] },
  { emoji: "\u{1F1FA}\u{1F1F8}", name: "United States", category: "flags", keywords: ["usa", "america", "flag"] },
  { emoji: "\u{1F1EB}\u{1F1F7}", name: "France", category: "flags", keywords: ["france", "french", "flag"] },
  { emoji: "\u{1F1E9}\u{1F1EA}", name: "Germany", category: "flags", keywords: ["germany", "german", "flag"] },
  { emoji: "\u{1F1EE}\u{1F1F9}", name: "Italy", category: "flags", keywords: ["italy", "italian", "flag"] },
  { emoji: "\u{1F1EA}\u{1F1F8}", name: "Spain", category: "flags", keywords: ["spain", "spanish", "flag"] },
  { emoji: "\u{1F1E8}\u{1F1E6}", name: "Canada", category: "flags", keywords: ["canada", "canadian", "flag", "maple"] },
  { emoji: "\u{1F1E6}\u{1F1FA}", name: "Australia", category: "flags", keywords: ["australia", "aussie", "flag"] },
  { emoji: "\u{1F1EF}\u{1F1F5}", name: "Japan", category: "flags", keywords: ["japan", "japanese", "flag"] },
  { emoji: "\u{1F1E8}\u{1F1F3}", name: "China", category: "flags", keywords: ["china", "chinese", "flag"] },
  { emoji: "\u{1F1EE}\u{1F1F3}", name: "India", category: "flags", keywords: ["india", "indian", "flag"] },
  { emoji: "\u{1F1E7}\u{1F1F7}", name: "Brazil", category: "flags", keywords: ["brazil", "brazilian", "flag"] },
  { emoji: "\u{1F1F0}\u{1F1F7}", name: "South Korea", category: "flags", keywords: ["korea", "south korea", "flag"] },
  { emoji: "\u{1F1F2}\u{1F1FD}", name: "Mexico", category: "flags", keywords: ["mexico", "mexican", "flag"] },
  { emoji: "\u{1F1F3}\u{1F1F1}", name: "Netherlands", category: "flags", keywords: ["netherlands", "dutch", "flag"] },
  { emoji: "\u{1F1F8}\u{1F1EA}", name: "Sweden", category: "flags", keywords: ["sweden", "swedish", "flag"] },
  { emoji: "\u{1F1F3}\u{1F1F4}", name: "Norway", category: "flags", keywords: ["norway", "norwegian", "flag"] },
  { emoji: "\u{1F1F5}\u{1F1F1}", name: "Poland", category: "flags", keywords: ["poland", "polish", "flag"] },
  { emoji: "\u{1F1F5}\u{1F1F9}", name: "Portugal", category: "flags", keywords: ["portugal", "portuguese", "flag"] },
  { emoji: "\u{1F1EE}\u{1F1EA}", name: "Ireland", category: "flags", keywords: ["ireland", "irish", "flag"] },
  { emoji: "\u{1F1F3}\u{1F1FF}", name: "New Zealand", category: "flags", keywords: ["new zealand", "kiwi", "flag"] },
  { emoji: "\u{1F1FF}\u{1F1E6}", name: "South Africa", category: "flags", keywords: ["south africa", "flag"] },
  { emoji: "\u{1F1E6}\u{1F1EA}", name: "United Arab Emirates", category: "flags", keywords: ["uae", "dubai", "flag"] },
  { emoji: "\u{1F1F8}\u{1F1EC}", name: "Singapore", category: "flags", keywords: ["singapore", "flag"] },
  { emoji: "\u{1F3F3}\uFE0F\u200D\u{1F308}", name: "rainbow flag", category: "flags", keywords: ["rainbow", "pride", "lgbtq", "flag"] },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'smileys', label: 'Smileys' },
  { key: 'people', label: 'People' },
  { key: 'animals', label: 'Animals' },
  { key: 'food', label: 'Food' },
  { key: 'travel', label: 'Travel' },
  { key: 'activities', label: 'Activities' },
  { key: 'objects', label: 'Objects' },
  { key: 'symbols', label: 'Symbols' },
  { key: 'flags', label: 'Flags' },
];

export default function EmojiSearch() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [recent, setRecent] = useState([]);
  const [copiedEmoji, setCopiedEmoji] = useState(null);

  const filtered = useMemo(() => {
    let results = EMOJIS;
    if (category !== 'all') {
      results = results.filter((e) => e.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, category]);

  const handleCopy = useCallback(
    (item) => {
      navigator.clipboard.writeText(item.emoji).then(() => {
        setCopiedEmoji(item.emoji);
        setTimeout(() => setCopiedEmoji(null), 1200);
        setRecent((prev) => {
          const next = [item, ...prev.filter((e) => e.emoji !== item.emoji)];
          return next.slice(0, 10);
        });
      }).catch(() => {});
    },
    []
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search emojis by name or keyword..."
          className="w-full bg-white border border-border rounded-[var(--radius-input)] pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              category === cat.key
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary border border-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Recently copied */}
      {recent.length > 0 && (
        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
            Recently copied
          </h3>
          <div className="flex flex-wrap gap-1">
            {recent.map((item, i) => (
              <button
                key={`${item.emoji}-${i}`}
                onClick={() => handleCopy(item)}
                title={item.name}
                className="text-2xl p-1.5 rounded hover:bg-surface-hover transition-colors"
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Results */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading text-sm font-semibold text-text-primary">
            {filtered.length} emoji{filtered.length !== 1 ? 's' : ''}
          </h3>
          {copiedEmoji && (
            <span className="text-xs text-green-600 font-medium">
              Copied {copiedEmoji}!
            </span>
          )}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1">
            {filtered.map((item, i) => (
              <button
                key={`${item.emoji}-${i}`}
                onClick={() => handleCopy(item)}
                title={item.name}
                className="text-2xl p-1.5 rounded hover:bg-surface-hover transition-colors aspect-square flex items-center justify-center"
              >
                {item.emoji}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted py-4 text-center">
            No emojis found for "{search}"
          </p>
        )}
      </Card>
    </div>
  );
}
