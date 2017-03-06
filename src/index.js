import DSS from './dss';
import { trim } from './util';

const dss = new DSS();

// Describe default detection pattern
dss.detector((line) => {
    if (typeof line !== 'string') {
        return false;
    }
    const reference = line.split('\n\n').pop();
    return !!reference.match(/.*@/);
});

// Describe default parsing of a name
dss.parser('name', ({ line }) => line.contents);

// Describe default parsing of a description
dss.parser('description', ({ line }) => line.contents);

// Describe default parsing of a state
dss.parser('state', ({ line }) => {
    const state = line.contents.split(' - ');
    return [{
        name: (state[0]) ? trim(state[0]) : '',
        escaped: (state[0]) ? trim(state[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
        description: (state[1]) ? trim(state[1]) : ''
    }];
});

// Describe default parsing of a piece markup
dss.parser('markup', ({ line }) => (
    [{
        example: line.contents,
        escaped: line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }]
));

export default dss;
