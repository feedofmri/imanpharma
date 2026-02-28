import fs from 'fs';

const path = 'f:/Areas/Development/Projects/React/imanpharma/frontend/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

const servicesRegex = /\{\/\* Services Preview \*\/\}[\s\S]*?<\/section>/;
const featuredRegex = /\{\/\* Featured Products \*\/\}[\s\S]*?<\/section>/;

const servicesMatch = content.match(servicesRegex);
const featuredMatch = content.match(featuredRegex);

if (servicesMatch && featuredMatch) {
    const servicesText = servicesMatch[0];
    const featuredText = featuredMatch[0];

    // Remove both original blocks including their leading whitespaces if possible
    content = content.replace(/\n*\{\/\* Services Preview \*\/\}[\s\S]*?<\/section>/, '');
    content = content.replace(/\n*\{\/\* Featured Products \*\/\}[\s\S]*?<\/section>/, '');

    // Now find the quick stats section end to insert after it
    const quickStatsRegex = /\{\/\* Quick Stats \*\/\}[\s\S]*?<\/section>/;
    const statsMatch = content.match(quickStatsRegex);

    if (statsMatch) {
        content = content.replace(statsMatch[0], statsMatch[0] + '\n\n      ' + featuredText + '\n\n      ' + servicesText);
        fs.writeFileSync(path, content, 'utf8');
        console.log('Successfully swapped sections.');
    } else {
        console.log('Could not find Quick Stats section.');
    }
} else {
    console.log('Could not find sections.');
}
