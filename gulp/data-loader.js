// data-loader.js
//
// Loads individual entities from the backend repo to aid with processing and
// linking entities together.

const fs = require('fs');
const path = require('path');


// Constructs a loader for the given backend repo path.
function dataLoader(backendStaticRepoPath) {
  function read(parts) {
    const pathParts = [backendStaticRepoPath, 'build']
      .concat(parts)
      // Convert to string (id's could be Numbers)
      .map(p => `${p}`);

    return JSON.parse(fs.readFileSync(path.join(...pathParts)));
  }

  return {
    ballot(id) {
      return read(['ballot', id, 'index.json']);
    },

    locality(id) {
      return read(['locality', id, 'index.json']);
    },

    officeElection(id) {
      return read(['office_election', id, 'index.json']);
    },

    referendumSupporting(id) {
      return read(['referendum', id, 'supporting', 'index.json']);
    },

    referendumOpposing(id) {
      return read(['referendum', id, 'opposing', 'index.json']);
    },
  };
}

module.exports = dataLoader;
