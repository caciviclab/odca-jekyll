const Glossary = require('glossary-panel');

// JSON file of terms and definitions
// var terms = require('terms');

const terms = [
  { term: 'adjustments', definition: 'A way to go back and fix past financial statements that were misstated because of a reporting error. Adjustments are used to fix mathematical errors, improper accounting methods, and overlooked facts in past periods.' },
  { term: 'advocacy group', definition: 'An organized group of people who use various forms of advocacy to influence public opinion and/or policy. For types of groups see https://www.opensecrets.org/527s/types.php.' },
  { term: 'auto-dialer', definition: 'An electronic device or software that automatically dials telephone numbers. Once the call has been answered, the autodialer either plays a recorded message or connects the call to a live person. Under the California Political Reform Act, certain telephone calls must include a disclaimer. (See FPPC Campaign Manual 8.10-11 for details.)' },
  { term: 'ballot', definition: 'The piece of paper, containing ballot measures, that a voter fills out on a specific day for a specific locality.' },
  { term: 'ballot committee', definition: 'According to the SoS, ballot measure committees are committees receiving money for promoting or defeating an initiative, referendum, recall petition, or any measure which has qualified for the ballot. See &quot;How Is A Measure Committee Required To Use Its Funds?&quot; in this document.' },
];

// Optional configurion objects
// var selectors = { ... };
// var classes = { ... };

document.addEventListener('DOMContentLoaded', new Glossary(terms));
