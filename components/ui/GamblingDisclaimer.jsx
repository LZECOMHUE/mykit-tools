'use client';

export default function GamblingDisclaimer({ type = 'betting' }) {
  const messages = {
    betting: (
      <>
        <strong>18+ only. Please gamble responsibly.</strong> This tool is for informational and educational purposes only and does not constitute financial or gambling advice. Gambling carries risk and you should never bet more than you can afford to lose. If you or someone you know has a gambling problem, contact the <strong>National Gambling Helpline: 0808 8020 133</strong> or visit{' '}
        <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">BeGambleAware.org</a> for free, confidential support.
      </>
    ),
    lottery: (
      <>
        <strong>18+ only. Please play responsibly.</strong> This tool generates random numbers for entertainment purposes only. Random numbers have no better chance of winning than any other combination. Lottery odds are not in your favour. If you or someone you know has a gambling problem, contact the <strong>National Gambling Helpline: 0808 8020 133</strong> or visit{' '}
        <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">BeGambleAware.org</a> for free, confidential support.
      </>
    ),
    roulette: (
      <>
        <strong>18+ only. For entertainment purposes only.</strong> This is a simulated roulette wheel and no real money is involved. Real casino gambling carries significant risk and the house always has a mathematical edge. If you or someone you know has a gambling problem, contact the <strong>National Gambling Helpline: 0808 8020 133</strong> or visit{' '}
        <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">BeGambleAware.org</a> for free, confidential support.
      </>
    ),
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
      <p className="text-xs text-amber-800 leading-relaxed">
        {messages[type] || messages.betting}
      </p>
    </div>
  );
}
