import { ts2doc } from '@ts2doc/json';
import fs from 'fs-extra';
import { globSync } from 'glob';

export function managerEntries(entry = [], options) {
    if (options.patternDocType == null) {
        throw new Error('patternDocType is required as an option');
    }

    const filesToParse = globSync(options.patternDocType);
    const doc = ts2doc(filesToParse, options.compilerOptions);
    fs.ensureDirSync('node_modules/.cache/ts2doc');
    fs.writeJsonSync('node_modules/.cache/ts2doc/doc.json', doc);

    return entry;
}
