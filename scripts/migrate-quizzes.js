/**
 * Quiz Data Migration Script
 * 
 * This script converts quiz questions from quizzes.json to SQL INSERT statements
 * that can be run in Supabase SQL Editor.
 * 
 * Usage:
 * 1. Run: node scripts/migrate-quizzes.js
 * 2. Copy the output SQL
 * 3. Paste and run in Supabase SQL Editor
 */

const fs = require('fs');
const path = require('path');

// HTML entity decoder
function decodeHtmlEntities(text) {
  const htmlEntities = {
    '&eacute;': 'é',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&ldquo;': '"',
    '&Uuml;': 'Ü',
    '&uuml;': 'ü',
    '&Aacute;': 'Á',
    '&aacute;': 'á',
    '&Acirc;': 'Â',
    '&acirc;': 'â',
    '&Agrave;': 'À',
    '&agrave;': 'à',
    '&Auml;': 'Ä',
    '&auml;': 'ä',
    '&Ccedil;': 'Ç',
    '&ccedil;': 'ç',
    '&Eacute;': 'É',
    '&Ecirc;': 'Ê',
    '&ecirc;': 'ê',
    '&Egrave;': 'È',
    '&egrave;': 'è',
    '&Euml;': 'Ë',
    '&euml;': 'ë',
    '&Iacute;': 'Í',
    '&iacute;': 'í',
    '&Icirc;': 'Î',
    '&icirc;': 'î',
    '&Igrave;': 'Ì',
    '&igrave;': 'ì',
    '&Iuml;': 'Ï',
    '&iuml;': 'ï',
    '&Ntilde;': 'Ñ',
    '&ntilde;': 'ñ',
    '&Oacute;': 'Ó',
    '&oacute;': 'ó',
    '&Ocirc;': 'Ô',
    '&ocirc;': 'ô',
    '&Ograve;': 'Ò',
    '&ograve;': 'ò',
    '&Ouml;': 'Ö',
    '&ouml;': 'ö',
    '&Oacute;': 'Ó',
    '&Uacute;': 'Ú',
    '&uacute;': 'ú',
    '&Ucirc;': 'Û',
    '&ucirc;': 'û',
    '&Ugrave;': 'Ù',
    '&ugrave;': 'ù',
    '&mdash;': '—',
    '&ndash;': '–',
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'"
  };
  
  let decoded = text;
  for (const [entity, char] of Object.entries(htmlEntities)) {
    decoded = decoded.replace(new RegExp(entity.replace(/[&]/g, '\\&'), 'g'), char);
  }
  return decoded;
}

// Read the quizzes.json file
const quizzesPath = path.join(__dirname, '../backend/data/quizzes.json');
const quizzes = JSON.parse(fs.readFileSync(quizzesPath, 'utf8'));

console.log('═'.repeat(80));
console.log('QUIZ MIGRATION SQL - Copy and paste this into Supabase SQL Editor');
console.log('═'.repeat(80));
console.log('');

// Generate SQL INSERT statements
const sqlStatements = quizzes.map((q, index) => {
  // Decode HTML entities first, remove newlines, then properly escape for SQL
  const question = decodeHtmlEntities(q.question)
    .replace(/[\r\n]+/g, ' ')  // Remove line breaks
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .trim()
    .replace(/'/g, "''");       // Escape single quotes for SQL
    
  const optionsArray = q.options.map(opt => 
    decodeHtmlEntities(opt)
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
  const optionsJson = JSON.stringify(optionsArray);
  const options = optionsJson.replace(/'/g, "''");  // Escape single quotes for SQL
  
  const category = q.category ? 
    decodeHtmlEntities(q.category)
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/'/g, "''") : 
    'General';
  
  return `  ('${question}', '${options}', ${q.correctIndex}, '${category}')`;
});

// Output the complete SQL
console.log('INSERT INTO quizzes (question, options, correct_index, category)');
console.log('VALUES');
console.log(sqlStatements.join(',\n'));
console.log(';');
console.log('');
console.log('═'.repeat(80));
console.log(`Total questions to migrate: ${quizzes.length}`);
console.log('═'.repeat(80));
