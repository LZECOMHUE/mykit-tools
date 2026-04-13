'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const WORDPLAY_PATTERNS = {
  classic: (first1, first2, last1, last2) => {
    const combined = `${first1}${first2}`.replace(/[aeiou]/gi, '');
    return [
      `#${first1}${last2}`,
      `#${first2}${last1}`,
      `#${first1}And${first2}`,
      `#The${first1}${first2}s`,
      `#Mr${first2}${last1}`,
      `#Mrs${first1}${last1}`,
      `#${first1}Loves${first2}`,
      `#Together${new Date().getFullYear()}`,
      `#${last1}${last2}Wedding`,
      `#${new Date().getFullYear()}Wedding`,
    ];
  },

  punny: (first1, first2, last1, last2) => {
    return [
      `#He${first1}SheHit`,
      `#${first1}AndAway`,
      `#OurBig${first2}Day`,
      `#${first1}EverAfter`,
      `#BrideTo${first1}`,
      `#LoveWinsToday`,
      `#Get${first2}OrGetOut`,
      `#${first1}${first2}Bliss`,
      `#TwoHearts${first1}Beat`,
      `#Until${last1}DoUsArt`,
    ];
  },

  romantic: (first1, first2, last1, last2) => {
    return [
      `#SeForever`,
      `#OurLoveStory`,
      `#SoulMates${first1}${first2}`,
      `#Infinity${first1}${first2}`,
      `#ForeverStarts${new Date().getFullYear()}`,
      `#MrAnd${last1}`,
      `#FinallyMr${first2}`,
      `#In${last1}`,
      `#HeAsked${new Date().getFullYear()}`,
      `#Happily${last1}`,
    ];
  },

  modern: (first1, first2, last1, last2) => {
    return [
      `#${first1}${first2}${new Date().getFullYear()}`,
      `#JustMarried`,
      `#AllOfMe${first2}`,
      `#HappilyEverAfter`,
      `#NewlyWeds`,
      `#DateNight`,
      `#MrMrsGoals`,
      `#CoupleGoals`,
      `#LoveWins`,
      `#OfficiallyUs`,
    ];
  },
};

export default function WeddingHashtagGenerator() {
  const [firstName1, setFirstName1] = useState('');
  const [firstName2, setFirstName2] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [style, setStyle] = useState('classic');
  const [generated, setGenerated] = useState([]);

  const generate = () => {
    if (!firstName1 || !firstName2) {
      alert('Please enter both first names');
      return;
    }

    const last1 = lastName1 || 'Wedding';
    const last2 = lastName2 || 'Love';

    const generator = WORDPLAY_PATTERNS[style];
    const hashtags = generator(firstName1, firstName2, last1, last2);
    setGenerated(hashtags);
  };

  const copyToClipboard = () => {
    const text = generated.join(' ');
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const getCharCount = (tag) => {
    return tag.length;
  };

  const isInstagramFriendly = (tag) => {
    return tag.length <= 30;
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <Card>
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Enter your names to generate wedding hashtag ideas
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                First Name (Person 1)
              </label>
              <Input
                type="text"
                value={firstName1}
                onChange={(e) => setFirstName1(e.target.value)}
                placeholder="e.g., Emma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                First Name (Person 2)
              </label>
              <Input
                type="text"
                value={firstName2}
                onChange={(e) => setFirstName2(e.target.value)}
                placeholder="e.g., James"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Last Name (optional)
              </label>
              <Input
                type="text"
                value={lastName1}
                onChange={(e) => setLastName1(e.target.value)}
                placeholder="Current last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                New Last Name (optional)
              </label>
              <Input
                type="text"
                value={lastName2}
                onChange={(e) => setLastName2(e.target.value)}
                placeholder="New last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hashtag Style
            </label>
            <Select
              options={[
                { value: 'classic', label: 'Classic' },
                { value: 'punny', label: 'Punny' },
                { value: 'romantic', label: 'Romantic' },
                { value: 'modern', label: 'Modern' },
              ]}
              value={style}
              onChange={setStyle}
            />
          </div>

          <Button onClick={generate} className="w-full" variant="primary">
            Generate Hashtags
          </Button>
        </div>
      </Card>

      {/* Results */}
      {generated.length > 0 && (
        <Card className="bg-pink-50 border-pink-100">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
            Suggested Wedding Hashtags
          </h3>

          <div className="space-y-2 mb-4">
            {generated.map((tag, idx) => {
              const charCount = getCharCount(tag);
              const isFriendly = isInstagramFriendly(tag);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-[var(--radius-input)] p-3 border border-border hover:border-accent transition-colors cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(tag)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-mono text-text-primary font-medium break-all">
                        {tag}
                      </p>
                      <div className="flex gap-3 mt-2 text-xs">
                        <span className="text-text-muted">
                          {charCount} characters
                        </span>
                        {isFriendly && (
                          <span className="text-green-600 font-medium">
                            Instagram friendly
                          </span>
                        )}
                        {!isFriendly && (
                          <span className="text-orange-600 font-medium">
                            Long for Instagram
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(tag).catch(() => {});
                      }}
                      className="ml-2 text-text-muted hover:text-accent text-xs font-medium whitespace-nowrap"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={copyToClipboard} className="w-full" variant="secondary">
            Copy All Hashtags
          </Button>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
          Hashtag Tips
        </h3>

        <ul className="space-y-3 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Pick your favourite.</span> Choose
              one main hashtag and stick with it across all platforms and signage.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Keep it short.</span> Hashtags under
              30 characters work best on Instagram and are easier to type.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Make it unique.</span> Search your
              hashtag first to ensure it is not already used for something unrelated.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Print it everywhere.</span> Add your
              hashtag to invitations, table cards, and your wedding website.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Encourage guests to use it.</span>{' '}
              Ask everyone to tag their photos so you can find all wedding day moments in one place.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Mix it up.</span> You can use
              multiple hashtags, but one main one makes it easier to search for all photos.
            </span>
          </li>
        </ul>
      </Card>

      {/* Hashtag Ideas by Platform */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
          Platform-Specific Tips
        </h3>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-[var(--radius-input)] p-3 border border-blue-100">
            <p className="font-medium text-text-primary text-sm mb-1">Instagram</p>
            <p className="text-xs text-text-secondary">
              You can use up to 30 hashtags per post. Use 10-15 for best reach. Mix popular and
              niche hashtags.
            </p>
          </div>

          <div className="bg-sky-50 rounded-[var(--radius-input)] p-3 border border-sky-100">
            <p className="font-medium text-text-primary text-sm mb-1">Twitter/X</p>
            <p className="text-xs text-text-secondary">
              Keep hashtags shorter and use 2-3 maximum. Twitter users prefer more text, fewer tags.
            </p>
          </div>

          <div className="bg-purple-50 rounded-[var(--radius-input)] p-3 border border-purple-100">
            <p className="font-medium text-text-primary text-sm mb-1">Facebook</p>
            <p className="text-xs text-text-secondary">
              Hashtags are less critical on Facebook. Use 1-2 maximum to keep posts clean and
              readable.
            </p>
          </div>

          <div className="bg-red-50 rounded-[var(--radius-input)] p-3 border border-red-100">
            <p className="font-medium text-text-primary text-sm mb-1">TikTok</p>
            <p className="text-xs text-text-secondary">
              Use a mix of niche and popular hashtags. TikTok is hashtag-driven, so 5-15 tags help
              with discoverability.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
