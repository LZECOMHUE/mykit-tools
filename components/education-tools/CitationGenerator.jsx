'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const CitationGenerator = () => {
  const [sources, setSources] = useState([{ id: 1, type: 'book', data: {} }]);
  const [nextId, setNextId] = useState(2);
  const [activeTab, setActiveTab] = useState('apa');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeSourceId, setActiveSourceId] = useState(1);

  const SOURCE_TYPES = ['Book', 'Website / Web Page', 'Journal Article', 'Newspaper Article', 'Video'];
  const CITATION_FORMATS = [
    { id: 'apa', label: 'APA 7th Edition' },
    { id: 'mla', label: 'MLA 9th Edition' },
    { id: 'harvard', label: 'Harvard' },
    { id: 'chicago', label: 'Chicago (Author-Date)' },
    { id: 'vancouver', label: 'Vancouver' },
  ];

  const sourceTypeMap = {
    'Book': 'book',
    'Website / Web Page': 'website',
    'Journal Article': 'journal',
    'Newspaper Article': 'newspaper',
    'Video': 'video',
  };

  const typeToLabel = {
    book: 'Book',
    website: 'Website / Web Page',
    journal: 'Journal Article',
    newspaper: 'Newspaper Article',
    video: 'Video',
  };

  // Get fields for current source type
  const getFields = (sourceType) => {
    const baseFields = {
      book: ['authors', 'title', 'publisher', 'year', 'edition', 'pages', 'city'],
      website: ['authors', 'pageTitle', 'websiteName', 'url', 'datePublished', 'dateAccessed'],
      journal: ['authors', 'articleTitle', 'journalName', 'volume', 'issue', 'year', 'pages', 'doi'],
      newspaper: ['authors', 'articleTitle', 'newspaperName', 'date', 'pages', 'url'],
      video: ['creator', 'title', 'platform', 'url', 'datePublished'],
    };
    return baseFields[sourceType] || [];
  };

  // Format author names
  const formatAuthorName = (first, last, isFirstAuthor = true, format = 'apa') => {
    if (!first && !last) return '';

    if (format === 'apa' || format === 'chicago' || format === 'vancouver') {
      if (isFirstAuthor) return `${last}, ${first.charAt(0)}.`;
      return `${first.charAt(0)}. ${last}`;
    } else if (format === 'mla') {
      if (isFirstAuthor) return `${last}, ${first}`;
      return `${first} ${last}`;
    } else if (format === 'harvard') {
      if (isFirstAuthor) return `${last}, ${first.charAt(0)}.`;
      return `${first.charAt(0)}. ${last}`;
    }
    return '';
  };

  // Format authors list
  const formatAuthors = (authors, format = 'apa') => {
    if (!authors || authors.length === 0) return '';

    const formatted = authors
      .filter((a) => a.first || a.last)
      .map((a, i) => formatAuthorName(a.first, a.last, i === 0, format));

    if (formatted.length === 0) return '';
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return formatted.join(' & ');

    if (format === 'mla') {
      return formatted.join(', ');
    }
    return formatted[0] + ' et al.';
  };

  // Generate citations
  const generateCitation = (source, format) => {
    const { type, data } = source;
    const authors = data.authors || [];
    const authorString = formatAuthors(authors, format);
    const hasAuthors = authors.some((a) => a.first || a.last);

    if (type === 'book') {
      if (format === 'apa') {
        const year = data.year || '[n.d.]';
        const title = data.title ? `*${data.title}*` : '';
        const publisher = data.publisher || '';
        let citation = '';
        if (authorString) citation += authorString + ` (${year}). `;
        if (title) citation += title + '. ';
        if (publisher) citation += publisher + '.';
        return citation;
      } else if (format === 'mla') {
        const title = data.title ? `*${data.title}*` : '';
        const publisher = data.publisher || '';
        const year = data.year || '[n.d.]';
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (title) citation += title + '. ';
        if (publisher || year) citation += publisher + ', ' + year + '.';
        return citation;
      } else if (format === 'harvard') {
        const year = data.year || '[n.d.]';
        const title = data.title ? `*${data.title}*` : '';
        const city = data.city || '';
        const publisher = data.publisher || '';
        let citation = '';
        if (authorString) citation += authorString + ' (' + year + ') ';
        if (title) citation += title + '. ';
        if (city && publisher) citation += city + ': ' + publisher + '.';
        else if (publisher) citation += publisher + '.';
        return citation;
      } else if (format === 'chicago') {
        const year = data.year || '[n.d.]';
        const title = data.title ? `*${data.title}*` : '';
        const city = data.city || '';
        const publisher = data.publisher || '';
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (title) citation += title + '. ';
        if (city && publisher) citation += city + ': ' + publisher + ', ' + year + '.';
        else if (publisher) citation += publisher + ', ' + year + '.';
        return citation;
      } else if (format === 'vancouver') {
        const title = data.title || '';
        const publisher = data.publisher || '';
        const year = data.year || '';
        const pages = data.pages || '';
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (title) citation += title + '. ';
        if (publisher) citation += publisher;
        if (year) citation += '; ' + year;
        if (pages) citation += ':' + pages;
        citation += '.';
        return citation;
      }
    } else if (type === 'website') {
      const pageTitle = data.pageTitle || '';
      const websiteName = data.websiteName || '';
      const url = data.url || '';
      const datePublished = data.datePublished || '';
      const dateAccessed = data.dateAccessed || new Date().toISOString().split('T')[0];

      if (format === 'apa') {
        let citation = '';
        if (authorString) citation += authorString + ' (';
        else citation += '(';
        if (datePublished) {
          const date = new Date(datePublished);
          citation += date.getFullYear() + ', ' + date.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '). ';
        } else {
          citation += '[n.d.]). ';
        }
        if (pageTitle) citation += pageTitle + '. ';
        if (websiteName) citation += websiteName + '. ';
        if (url) citation += 'Retrieved from ' + url;
        return citation;
      } else if (format === 'mla') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (pageTitle) citation += '"' + pageTitle + '." ';
        if (websiteName) citation += '*' + websiteName + '*, ';
        if (datePublished) {
          const date = new Date(datePublished);
          citation += date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ';
        }
        if (url) citation += url + '.';
        return citation;
      } else if (format === 'harvard') {
        let citation = '';
        if (authorString) citation += authorString + ' (';
        else citation += '(';
        if (datePublished) citation += datePublished.substring(0, 4) + ') ';
        else citation += '[n.d.]) ';
        if (pageTitle) citation += '*' + pageTitle + '* [Online]. ';
        citation += 'Available at: ';
        if (url) citation += url + ' ';
        citation += '(Accessed: ' + dateAccessed + ').';
        return citation;
      } else if (format === 'chicago') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (pageTitle) citation += '"' + pageTitle + '." ';
        if (websiteName) citation += websiteName + '. ';
        if (url) citation += 'Accessed ' + dateAccessed + '. ' + url + '.';
        return citation;
      } else if (format === 'vancouver') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (pageTitle) citation += pageTitle + '. ';
        if (websiteName) citation += websiteName + '. ';
        if (dateAccessed) citation += 'Available from: ' + url + ' [Accessed ' + dateAccessed + '].';
        return citation;
      }
    } else if (type === 'journal') {
      const articleTitle = data.articleTitle || '';
      const journalName = data.journalName || '';
      const volume = data.volume || '';
      const issue = data.issue || '';
      const year = data.year || '';
      const pages = data.pages || '';
      const doi = data.doi || '';

      if (format === 'apa') {
        let citation = '';
        if (authorString) citation += authorString + ' (' + year + '). ';
        if (articleTitle) citation += articleTitle + '. ';
        if (journalName) citation += '*' + journalName + '*, ';
        if (volume) citation += '*' + volume + '*';
        if (issue) citation += '(' + issue + ')';
        if (pages) citation += ', ' + pages;
        citation += '.';
        if (doi) citation += ' https://doi.org/' + doi;
        return citation;
      } else if (format === 'mla') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (articleTitle) citation += '"' + articleTitle + '." ';
        if (journalName) citation += '*' + journalName + '*, ';
        if (volume) citation += 'vol. ' + volume;
        if (issue) citation += ', no. ' + issue;
        if (year) citation += ', ' + year;
        if (pages) citation += ', pp. ' + pages;
        citation += '.';
        return citation;
      } else if (format === 'harvard') {
        let citation = '';
        if (authorString) citation += authorString + ' (' + year + ') ';
        if (articleTitle) citation += "'" + articleTitle + "', ";
        if (journalName) citation += '*' + journalName + '*, ';
        if (volume && issue) citation += volume + '(' + issue + ')';
        else if (volume) citation += volume;
        if (pages) citation += ', pp. ' + pages;
        citation += '.';
        return citation;
      } else if (format === 'chicago') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (articleTitle) citation += '"' + articleTitle + '." ';
        if (journalName) citation += '*' + journalName + '* ';
        if (volume) citation += volume;
        if (issue) citation += ', no. ' + issue;
        if (year) citation += ' (' + year + ')';
        if (pages) citation += ': ' + pages;
        citation += '.';
        return citation;
      } else if (format === 'vancouver') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (articleTitle) citation += articleTitle + '. ';
        if (journalName) citation += journalName + '. ';
        if (year) citation += year;
        if (volume) citation += ';' + volume;
        if (issue) citation += '(' + issue + ')';
        if (pages) citation += ':' + pages;
        citation += '.';
        return citation;
      }
    } else if (type === 'newspaper') {
      const articleTitle = data.articleTitle || '';
      const newspaperName = data.newspaperName || '';
      const date = data.date || '';
      const pages = data.pages || '';
      const url = data.url || '';

      if (format === 'apa') {
        let citation = '';
        if (authorString) citation += authorString + ' (';
        else citation += '(';
        if (date) {
          const d = new Date(date);
          citation += d.getFullYear() + ', ' + d.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '). ';
        } else {
          citation += '[n.d.]). ';
        }
        if (articleTitle) citation += articleTitle + '. *' + newspaperName + '*.';
        else citation += '*' + newspaperName + '*.';
        if (pages) citation += ' ' + pages;
        return citation;
      } else if (format === 'mla') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (articleTitle) citation += '"' + articleTitle + '." ';
        if (newspaperName) citation += '*' + newspaperName + '*, ';
        if (date) {
          const d = new Date(date);
          citation += d.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        }
        if (pages) citation += ', pp. ' + pages;
        citation += '.';
        return citation;
      } else if (format === 'harvard') {
        let citation = '';
        if (authorString) citation += authorString + ' (';
        else citation += '(';
        if (date) citation += new Date(date).getFullYear() + ') ';
        else citation += '[n.d.]) ';
        if (articleTitle) citation += "'" + articleTitle + "', ";
        if (newspaperName) citation += '*' + newspaperName + '*.';
        return citation;
      } else if (format === 'chicago') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (articleTitle) citation += '"' + articleTitle + '." ';
        if (newspaperName) citation += '*' + newspaperName + '*, ';
        if (date) citation += new Date(date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        if (pages) citation += ', ' + pages;
        citation += '.';
        return citation;
      } else if (format === 'vancouver') {
        let citation = '';
        if (authorString) citation += authorString + '. ';
        if (articleTitle) citation += articleTitle + '. ';
        if (newspaperName) citation += newspaperName + '. ';
        if (date) citation += new Date(date).getFullYear();
        if (pages) citation += ':' + pages;
        citation += '.';
        return citation;
      }
    } else if (type === 'video') {
      const creator = data.creator || '';
      const title = data.title || '';
      const platform = data.platform || '';
      const url = data.url || '';
      const datePublished = data.datePublished || '';

      if (format === 'apa') {
        let citation = '';
        if (creator) citation += creator + ' (';
        else citation += '(';
        if (datePublished) {
          const d = new Date(datePublished);
          citation += d.getFullYear() + ', ' + d.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '). ';
        } else {
          citation += '[n.d.]). ';
        }
        if (title) citation += '*' + title + '*';
        citation += ' [Video]. ' + platform + '. ';
        if (url) citation += 'Retrieved from ' + url;
        return citation;
      } else if (format === 'mla') {
        let citation = '';
        if (creator) citation += creator + '. ';
        if (title) citation += '"' + title + '." ';
        if (platform) citation += '*' + platform + '*, ';
        if (datePublished) {
          const d = new Date(datePublished);
          citation += d.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ';
        }
        if (url) citation += url + '.';
        return citation;
      } else if (format === 'harvard') {
        let citation = '';
        if (creator) citation += creator + ' (';
        else citation += '(';
        if (datePublished) citation += new Date(datePublished).getFullYear() + ') ';
        else citation += '[n.d.]) ';
        if (title) citation += '*' + title + '* [Online]. ';
        if (platform) citation += platform + '. ';
        if (url) citation += 'Available at: ' + url;
        return citation;
      } else if (format === 'chicago') {
        let citation = '';
        if (creator) citation += creator + '. ';
        if (title) citation += '"' + title + '." ';
        if (platform) citation += platform + '. ';
        if (datePublished) citation += 'Accessed ' + datePublished + '. ';
        if (url) citation += url + '.';
        return citation;
      } else if (format === 'vancouver') {
        let citation = '';
        if (creator) citation += creator + '. ';
        if (title) citation += title + '. ';
        if (platform) citation += platform + '; ';
        if (datePublished) citation += datePublished;
        citation += '. Available from: ';
        if (url) citation += url;
        return citation;
      }
    }

    return '';
  };

  // Generate in-text citation
  const generateInTextCitation = (source, format) => {
    const { type, data } = source;
    const authors = data.authors || [];
    const year = data.year || data.datePublished ? new Date(data.datePublished).getFullYear() : '[n.d.]';

    if (authors.length === 0) {
      if (type === 'website' && data.websiteName) {
        if (format === 'apa') return `(${data.websiteName}, ${year})`;
        if (format === 'mla') return `(${data.websiteName})`;
        if (format === 'harvard') return `(${data.websiteName} ${year})`;
        if (format === 'chicago') return `(${data.websiteName} ${year})`;
        if (format === 'vancouver') return `[1]`;
      }
      return '';
    }

    const firstAuthor = authors[0];
    const lastName = firstAuthor.last || '';

    if (format === 'apa' || format === 'chicago' || format === 'harvard') {
      if (authors.length >= 2) return `(${lastName} et al., ${year})`;
      return `(${lastName}, ${year})`;
    } else if (format === 'mla') {
      if (authors.length >= 2) return `(${lastName} et al.)`;
      return `(${lastName})`;
    } else if (format === 'vancouver') {
      return `[1]`;
    }

    return '';
  };

  const updateSourceData = (sourceId, field, value) => {
    setSources((prev) =>
      prev.map((source) => {
        if (source.id === sourceId) {
          return {
            ...source,
            data: { ...source.data, [field]: value },
          };
        }
        return source;
      })
    );
  };

  const updateAuthor = (sourceId, authorIndex, field, value) => {
    setSources((prev) =>
      prev.map((source) => {
        if (source.id === sourceId) {
          const authors = source.data.authors || [];
          const updated = [...authors];
          if (!updated[authorIndex]) updated[authorIndex] = {};
          updated[authorIndex] = { ...updated[authorIndex], [field]: value };
          return {
            ...source,
            data: { ...source.data, authors: updated },
          };
        }
        return source;
      })
    );
  };

  const addAuthor = (sourceId) => {
    setSources((prev) =>
      prev.map((source) => {
        if (source.id === sourceId) {
          const authors = source.data.authors || [];
          if (authors.length < 5) {
            return {
              ...source,
              data: { ...source.data, authors: [...authors, {}] },
            };
          }
        }
        return source;
      })
    );
  };

  const changeSourceType = (sourceId, newType) => {
    setSources((prev) =>
      prev.map((source) => {
        if (source.id === sourceId) {
          return { id: sourceId, type: newType, data: {} };
        }
        return source;
      })
    );
  };

  const addSource = () => {
    const newId = nextId;
    setSources((prev) => [...prev, { id: newId, type: 'book', data: {} }]);
    setNextId(newId + 1);
    setActiveSourceId(newId);
  };

  const removeSource = (sourceId) => {
    if (sources.length > 1) {
      setSources((prev) => prev.filter((s) => s.id !== sourceId));
      if (activeSourceId === sourceId) {
        setActiveSourceId(sources[0].id);
      }
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyBibliography = () => {
    const bibliography = sources
      .map((source) => {
        const lines = CITATION_FORMATS.map((fmt) => generateCitation(source, fmt.id));
        return generateCitation(source, activeTab);
      })
      .filter((c) => c)
      .sort()
      .join('\n\n');

    copyToClipboard(bibliography, 'bib');
  };

  const currentSource = sources.find((s) => s.id === activeSourceId);
  const fields = currentSource ? getFields(currentSource.type) : [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Source Type Selector */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Source Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SOURCE_TYPES.map((typeLabel) => {
            const typeKey = sourceTypeMap[typeLabel];
            const isActive = currentSource?.type === typeKey;
            return (
              <button
                key={typeKey}
                onClick={() => changeSourceType(activeSourceId, typeKey)}
                className={`p-3 text-sm font-medium rounded-lg border-2 transition-all text-center ${
                  isActive
                    ? 'border-accent bg-accent bg-opacity-10 text-accent'
                    : 'border-border bg-white text-text-primary hover:border-text-muted'
                }`}
              >
                {typeLabel}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Source Input Form */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Source {sources.length > 1 && `${sources.findIndex((s) => s.id === activeSourceId) + 1}`}</h2>
          {sources.length > 1 && (
            <button
              onClick={() => removeSource(activeSourceId)}
              className="text-sm text-error hover:text-red-700 font-medium"
            >
              ✕ Remove
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Authors */}
          {fields.includes('authors') && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-text-primary">Authors</label>
                <button
                  onClick={() => addAuthor(activeSourceId)}
                  className="text-xs bg-accent bg-opacity-10 text-accent px-2 py-1 rounded hover:bg-opacity-20"
                  disabled={(currentSource?.data.authors?.length || 0) >= 5}
                >
                  + Add Author
                </button>
              </div>
              {(currentSource?.data.authors || [{ first: '', last: '' }]).map((author, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={author.first || ''}
                    onChange={(e) => updateAuthor(activeSourceId, idx, 'first', e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={author.last || ''}
                    onChange={(e) => updateAuthor(activeSourceId, idx, 'last', e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Creator (for videos) */}
          {fields.includes('creator') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Creator / Channel Name</label>
              <input
                type="text"
                value={currentSource?.data.creator || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'creator', e.target.value)}
                placeholder="Creator or channel name"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Title / Article Title / Page Title */}
          {fields.includes('title') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
              <input
                type="text"
                value={currentSource?.data.title || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'title', e.target.value)}
                placeholder="Book title"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {fields.includes('pageTitle') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Page Title</label>
              <input
                type="text"
                value={currentSource?.data.pageTitle || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'pageTitle', e.target.value)}
                placeholder="Title of the web page"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {fields.includes('articleTitle') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Article Title</label>
              <input
                type="text"
                value={currentSource?.data.articleTitle || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'articleTitle', e.target.value)}
                placeholder="Title of the article"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Publisher / Website Name / Journal Name / Newspaper Name */}
          {fields.includes('publisher') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Publisher</label>
              <input
                type="text"
                value={currentSource?.data.publisher || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'publisher', e.target.value)}
                placeholder="Publisher name"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {fields.includes('websiteName') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Website Name</label>
              <input
                type="text"
                value={currentSource?.data.websiteName || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'websiteName', e.target.value)}
                placeholder="Name of the website"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {fields.includes('journalName') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Journal Name</label>
              <input
                type="text"
                value={currentSource?.data.journalName || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'journalName', e.target.value)}
                placeholder="Name of the journal"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {fields.includes('newspaperName') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Newspaper Name</label>
              <input
                type="text"
                value={currentSource?.data.newspaperName || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'newspaperName', e.target.value)}
                placeholder="Name of the newspaper"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* URL */}
          {fields.includes('url') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">URL</label>
              <input
                type="url"
                value={currentSource?.data.url || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* City */}
          {fields.includes('city') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">City (optional)</label>
              <input
                type="text"
                value={currentSource?.data.city || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'city', e.target.value)}
                placeholder="Publication city"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Year */}
          {fields.includes('year') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Year</label>
              <input
                type="number"
                value={currentSource?.data.year || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'year', e.target.value)}
                placeholder="YYYY"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Edition */}
          {fields.includes('edition') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Edition (optional)</label>
              <input
                type="text"
                value={currentSource?.data.edition || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'edition', e.target.value)}
                placeholder="e.g., 2nd Edition"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Volume */}
          {fields.includes('volume') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Volume</label>
              <input
                type="text"
                value={currentSource?.data.volume || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'volume', e.target.value)}
                placeholder="Volume number"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Issue */}
          {fields.includes('issue') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Issue</label>
              <input
                type="text"
                value={currentSource?.data.issue || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'issue', e.target.value)}
                placeholder="Issue number"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Pages */}
          {fields.includes('pages') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Pages (optional)</label>
              <input
                type="text"
                value={currentSource?.data.pages || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'pages', e.target.value)}
                placeholder="e.g., 123-145"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* DOI */}
          {fields.includes('doi') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">DOI (optional)</label>
              <input
                type="text"
                value={currentSource?.data.doi || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'doi', e.target.value)}
                placeholder="10.1000/xyz123"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Date Published */}
          {fields.includes('datePublished') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Date Published (optional)</label>
              <input
                type="date"
                value={currentSource?.data.datePublished || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'datePublished', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Date Accessed */}
          {fields.includes('dateAccessed') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Date Accessed</label>
              <input
                type="date"
                value={currentSource?.data.dateAccessed || new Date().toISOString().split('T')[0]}
                onChange={(e) => updateSourceData(activeSourceId, 'dateAccessed', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Date (for newspapers) */}
          {fields.includes('date') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
              <input
                type="date"
                value={currentSource?.data.date || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Platform (for videos) */}
          {fields.includes('platform') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Platform</label>
              <input
                type="text"
                value={currentSource?.data.platform || ''}
                onChange={(e) => updateSourceData(activeSourceId, 'platform', e.target.value)}
                placeholder="e.g., YouTube, Vimeo"
                className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Add Another Source */}
      {sources.length < 5 && (
        <div className="mb-6">
          <Button
            onClick={addSource}
            variant="secondary"
            className="w-full"
          >
            + Add Another Source
          </Button>
        </div>
      )}

      {/* Format Selector Tabs */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Citation Format</h2>
        <div className="flex flex-wrap gap-2">
          {CITATION_FORMATS.map((format) => (
            <button
              key={format.id}
              onClick={() => setActiveTab(format.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                activeTab === format.id
                  ? 'border-accent bg-accent bg-opacity-10 text-accent'
                  : 'border-border bg-white text-text-primary hover:border-text-muted'
              }`}
            >
              {format.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Citations Output */}
      <div className="space-y-6">
        {sources.map((source, idx) => {
          const citation = generateCitation(source, activeTab);
          const inText = generateInTextCitation(source, activeTab);

          return (
            <Card key={source.id} className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-text-secondary mb-2">
                  {idx + 1}. {typeToLabel[source.type]}
                </h3>
              </div>

              {/* In-text Citation */}
              {inText && (
                <div className="mb-6">
                  <p className="text-xs font-medium text-text-muted mb-2">In-text citation:</p>
                  <div className="bg-surface p-3 rounded-lg font-mono text-sm text-text-primary break-words">
                    {inText}
                  </div>
                </div>
              )}

              {/* Full Citation */}
              <div className="mb-4">
                <p className="text-xs font-medium text-text-muted mb-2">Full citation:</p>
                <div className="bg-surface p-4 rounded-lg font-mono text-sm text-text-primary break-words whitespace-pre-wrap">
                  {citation}
                </div>
              </div>

              <Button
                onClick={() => copyToClipboard(citation, idx)}
                variant={copiedIndex === idx ? 'primary' : 'secondary'}
                className="w-full"
              >
                {copiedIndex === idx ? '✓ Copied!' : '📋 Copy Citation'}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Bibliography */}
      {sources.length > 1 && (
        <Card className="p-6 mt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Bibliography (Works Cited)</h2>
          <div className="space-y-4">
            {sources
              .map((source) => generateCitation(source, activeTab))
              .filter((c) => c)
              .sort()
              .map((citation, idx) => (
                <div key={idx} className="bg-surface p-4 rounded-lg font-mono text-sm text-text-primary break-words whitespace-pre-wrap">
                  {citation}
                </div>
              ))}
          </div>

          <Button
            onClick={copyBibliography}
            variant={copiedIndex === 'bib' ? 'primary' : 'secondary'}
            className="w-full mt-4"
          >
            {copiedIndex === 'bib' ? '✓ Copied!' : '📋 Copy All Citations'}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CitationGenerator;
