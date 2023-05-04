import { parse } from 'csv-parse';
import fs from 'node:fs';

const file = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(file);

// Initialize the parser
const parser = parse({
    delimiter: ',',
    from_line: 2,
    ltrim: true,
    rtrim: true,
    skip_empty_lines: true
});

async function exec() {
    const linesParse = stream.pipe(parser);

    for await (const line of linesParse) {

        const [title, description] = line;

        const result = await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
        })        
    }    
};

exec()