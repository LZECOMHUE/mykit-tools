"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

export default function WeddingInvitationWordingGenerator() {
  const [config, setConfig] = useState({
    formality: "semi-formal",
    ceremonyType: "church",
    hostedBy: "couple",
    hasEveningOnly: false,
    coupleNames: "Jane Smith & John Jones",
    ceremonyDate: "15th June 2025",
    ceremonyTime: "2:00 PM",
    ceremonyLocation: "St. Mary's Church",
    receptionLocation: "The Grand Hotel",
  });

  const [wordings, setWordings] = useState(null);

  const generateWordings = () => {
    const options = [
      generateWording("option1"),
      generateWording("option2"),
      generateWording("option3"),
    ];
    setWordings(options);
  };

  const generateWording = (option) => {
    let mainText = "";
    let rsvpText = "";

    if (config.formality === "formal") {
      mainText = getFormaldWording(option);
      rsvpText = "The pleasure of your company is requested at the marriage of...";
    } else if (config.formality === "semi-formal") {
      mainText = getSemiFormalWording(option);
      rsvpText = "We request the honour of your presence as we celebrate...";
    } else if (config.formality === "casual") {
      mainText = getCasualWording(option);
      rsvpText = "Join us as we tie the knot...";
    } else {
      mainText = getModernWording(option);
      rsvpText = "Come celebrate love with us...";
    }

    return { mainText, rsvpText, option };
  };

  const getFormaldWording = (option) => {
    const wordings = [
      `Together with their parents request the honour of your presence at the marriage of ${config.coupleNames}

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation}

Reception to follow at
${config.receptionLocation}

Black tie requested`,
      `Mr and Mrs [Parents' names] request the honour of your presence at the marriage of their daughter ${config.coupleNames}

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation}

And afterwards at
${config.receptionLocation}`,
      `The honour of your presence is requested at the marriage of ${config.coupleNames}

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation}

Reception and dinner to follow`,
    ];
    return wordings[option.includes("option1") ? 0 : option.includes("option2") ? 1 : 2];
  };

  const getSemiFormalWording = (option) => {
    const wordings = [
      `Together with their parents, ${config.coupleNames} are delighted to invite you to their wedding

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation}

Followed by a reception at
${config.receptionLocation}`,
      `We're getting married! We would love for you to celebrate with us on

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation}

Reception at ${config.receptionLocation}

Dress code: Smart`,
      `You are cordially invited to the wedding of ${config.coupleNames}

${config.ceremonyDate}
${config.ceremonyTime} at ${config.ceremonyLocation}

Celebration and reception to follow at
${config.receptionLocation}`,
    ];
    return wordings[option.includes("option1") ? 0 : option.includes("option2") ? 1 : 2];
  };

  const getCasualWording = (option) => {
    const wordings = [
      `Join us as ${config.coupleNames} celebrate their wedding!

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation}

Come back to ${config.receptionLocation} for a good time!`,
      `We're tying the knot! Come party with us.

${config.ceremonyDate} | ${config.ceremonyTime}
${config.ceremonyLocation}

Party continues at ${config.receptionLocation}`,
      `${config.coupleNames} are getting married! You're invited!

When: ${config.ceremonyDate} at ${config.ceremonyTime}
Where: ${config.ceremonyLocation}

Reception at ${config.receptionLocation}`,
    ];
    return wordings[option.includes("option1") ? 0 : option.includes("option2") ? 1 : 2];
  };

  const getModernWording = (option) => {
    const wordings = [
      `We're getting married!

Save the date: ${config.ceremonyDate} at ${config.ceremonyTime}

Ceremony: ${config.ceremonyLocation}
Reception: ${config.receptionLocation}

Can't wait to celebrate with you!
${config.coupleNames}`,
      `This is it. We're getting married.

${config.ceremonyDate} at ${config.ceremonyTime}
${config.ceremonyLocation} | ${config.receptionLocation}

Join us!`,
      `Two hearts, one love, one wedding day.

Join ${config.coupleNames} on ${config.ceremonyDate} at ${config.ceremonyTime}

${config.ceremonyLocation}
Reception at ${config.receptionLocation}`,
    ];
    return wordings[option.includes("option1") ? 0 : option.includes("option2") ? 1 : 2];
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Wedding Invitation Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <Select
            label="Formality Level"
            value={config.formality}
            onChange={(e) => setConfig({ ...config, formality: e.target.value })}
            options={[
              { value: "formal", label: "Formal" },
              { value: "semi-formal", label: "Semi-Formal" },
              { value: "casual", label: "Casual" },
              { value: "modern", label: "Modern & Fun" },
            ]}
          />

          <Select
            label="Ceremony Type"
            value={config.ceremonyType}
            onChange={(e) => setConfig({ ...config, ceremonyType: e.target.value })}
            options={[
              { value: "church", label: "Church" },
              { value: "civil", label: "Civil Ceremony" },
              { value: "outdoor", label: "Outdoor Ceremony" },
              { value: "destination", label: "Destination Wedding" },
              { value: "elopement-party", label: "Elopement Party" },
            ]}
          />

          <Select
            label="Hosted By"
            value={config.hostedBy}
            onChange={(e) => setConfig({ ...config, hostedBy: e.target.value })}
            options={[
              { value: "couple", label: "Couple" },
              { value: "parents", label: "Parents" },
              { value: "both", label: "Couple & Parents" },
            ]}
          />

          <Input
            label="Couple Names"
            type="text"
            value={config.coupleNames}
            onChange={(e) => setConfig({ ...config, coupleNames: e.target.value })}
          />

          <Input
            label="Ceremony Date"
            type="text"
            placeholder="e.g., 15th June 2025"
            value={config.ceremonyDate}
            onChange={(e) => setConfig({ ...config, ceremonyDate: e.target.value })}
          />

          <Input
            label="Ceremony Time"
            type="text"
            placeholder="e.g., 2:00 PM"
            value={config.ceremonyTime}
            onChange={(e) => setConfig({ ...config, ceremonyTime: e.target.value })}
          />

          <Input
            label="Ceremony Location"
            type="text"
            placeholder="e.g., St. Mary's Church"
            value={config.ceremonyLocation}
            onChange={(e) =>
              setConfig({ ...config, ceremonyLocation: e.target.value })
            }
          />

          <Input
            label="Reception Location"
            type="text"
            placeholder="e.g., The Grand Hotel"
            value={config.receptionLocation}
            onChange={(e) =>
              setConfig({ ...config, receptionLocation: e.target.value })
            }
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="evening"
              checked={config.hasEveningOnly}
              onChange={(e) =>
                setConfig({ ...config, hasEveningOnly: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="evening" className="text-text-secondary text-sm font-medium">
              Include evening reception only option
            </label>
          </div>
        </div>

        <Button onClick={generateWordings} className="w-full">
          Generate Invitation Wordings
        </Button>
      </Card>

      {wordings && (
        <div className="space-y-4">
          {wordings.map((wording, idx) => (
            <Card key={idx}>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
                Option {idx + 1}
              </h3>

              <div className="bg-surface rounded-lg p-6 mb-6 text-center font-heading">
                <p className="text-text-primary whitespace-pre-line text-sm leading-relaxed">
                  {wording.mainText}
                </p>
              </div>

              <div className="bg-accent/10 border border-accent rounded-lg p-6 mb-6">
                <h4 className="font-heading font-bold text-accent mb-3">
                  RSVP Wording
                </h4>
                <p className="text-text-secondary text-sm">
                  {wording.rsvpText}
                </p>
                <p className="text-text-secondary text-sm mt-3">
                  Please respond by [Date]
                  <br />
                  [Email or phone number]
                </p>
              </div>

              <Button variant="secondary" className="w-full">
                Copy This Wording
              </Button>
            </Card>
          ))}

          <Card className="bg-accent/10 border-accent">
            <p className="text-accent font-heading font-bold mb-2">Pro Tips</p>
            <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside">
              <li>Use high-quality cardstock for printed invitations</li>
              <li>Include a wedding website link for more information</li>
              <li>Set RSVP deadline 2-3 weeks before wedding</li>
              <li>Consider a second card for dietary requirements</li>
              <li>Proofread carefully before printing</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
