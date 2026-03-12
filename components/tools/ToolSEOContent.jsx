/**
 * ToolSEOContent — Semantic, AI-friendly SEO content component
 *
 * Usage in tool pages:
 * <ToolSEOContent
 *   toolName="UK Tax Calculator"
 *   sections={[
 *     { heading: "How to Use", content: "..." },
 *     { heading: "FAQ", items: [{ q: "...", a: "..." }] },
 *   ]}
 *   relatedTools={[...]}
 * />
 *
 * Key principles (from GEO/AEO strategy):
 * - Answer-first format: heading → complete answer → details
 * - Semantic HTML: proper h2/h3 hierarchy, article tags
 * - Structured for AI: short paragraphs, lists, tables, snippable answers
 * - Internal linking: 3-5 related tools for cluster authority
 * - Freshness signals: dateModified metadata
 */

import Link from "next/link";

export default function ToolSEOContent({
  toolName,
  sections = [],
  faqs = [],
  relatedTools = [],
  generateFAQSchema = false,
}) {
  if (!sections.length && !faqs.length) return null;

  // Generate FAQ schema if requested
  const faqSchema =
    generateFAQSchema && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Inject FAQ schema if present */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Main SEO content section */}
      <section className="mt-12 max-w-[800px]">
        {/* Content sections with semantic HTML */}
        <div className="space-y-8 text-text-secondary">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {/* H2 headings for top-level sections */}
              <h2 className="text-xl font-semibold text-text-primary">
                {section.heading}
              </h2>

              {/* Content: Answer-first, no vague qualifiers */}
              {typeof section.content === "string" ? (
                <div className="space-y-3 text-sm leading-relaxed">
                  {section.content.split("\n\n").map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {/* If content is structured (lists, tables, etc.) */}
              {Array.isArray(section.content) && (
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Common values table (for converters/calculators) */}
              {section.table && (
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-surface border-b border-border">
                        {section.table.headers?.map((header, hIdx) => (
                          <th
                            key={hIdx}
                            className="text-left px-3 py-2 text-text-primary font-semibold"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows?.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="border-b border-border hover:bg-surface"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="px-3 py-2 text-text-secondary"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Subheadings (H3) for subsections */}
              {section.subsections &&
                section.subsections.map((sub, subIdx) => (
                  <div key={subIdx} className="mt-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {sub.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {sub.content}
                    </p>
                  </div>
                ))}
            </div>
          ))}

          {/* FAQ Section — Highest citation format for AI */}
          {faqs.length > 0 && (
            <div className="space-y-4 mt-8 pt-8 border-t border-border">
              <h2 className="text-xl font-semibold text-text-primary">
                Frequently Asked Questions
              </h2>

              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2">
                  {/* Question as heading — AI parsers prefer this format */}
                  <h3 className="font-semibold text-text-primary text-base">
                    {faq.question}
                  </h3>
                  {/* Answer immediately following */}
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Tools — Internal linking for cluster authority */}
        {relatedTools.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group p-3 bg-surface border border-border rounded-lg hover:border-accent hover:bg-white transition-all"
                >
                  <p className="font-medium text-sm text-text-primary group-hover:text-accent transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

/**
 * Helper: Create an answer-first content structure
 * For GEO/AEO optimization, answers must be snippable (extractable without editing)
 */
export function createAnswerFirstSection(question, answer, details = null) {
  return {
    heading: question,
    content:
      answer +
      (details
        ? "\n\n" + (typeof details === "string" ? details : details.join("\n\n"))
        : ""),
  };
}

/**
 * Helper: Create FAQ items for ToolSEOContent
 */
export function createFAQ(question, answer) {
  return {
    question,
    answer,
  };
}

/**
 * Helper: Format a data table for snippability
 */
export function createTable(headers, rows) {
  return {
    table: { headers, rows },
  };
}
