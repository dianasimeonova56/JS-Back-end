import http from 'http'
import fs from 'fs/promises';
import { v4 as uuid } from 'uuid'

import siteCss from './content/styles/site.css.js'
import homePage from './views/home/index.html.js'
import addBreedPage from './views/addBreed.html.js'
import addCatPage from './views/addCat.html.js'
import editCatPage from './views/editCat.html.js'
import catShelterHtml from './views/catShelter.html.js';

// will be transformed into object
let cats = [];
let breeds = []; // implement ADD BREED
// EDIT CAT
let cat = {}

initCats();

const server = http.createServer((req, res) => {
    // POST REQUEST

    const url = req.url;
    const id = url.split('/')[3];
    if (req.method === "POST") {
        // само като изпратим post req
        let body = '';

        // при получаване на данни от request
        // chunk -> buffer
        // buffer.toString()
        req.on('data', chunk => {
            body += chunk.toString();
        })

        // приключва четенето от request
        req.on('end', () => {
            // конвертираме данните към обект, който трябва да се добави в масива cats
            const data = new URLSearchParams(body);
            console.log(data);

            //restarted when server is restarted

            if (url === '/cats/add-cat') {
                cats.push({
                    //id: cats.length + 1, // works if there is no delete option
                    id: uuid(), // randomly generated 
                    ...Object.fromEntries(data.entries()),
                })

                saveCats();

            } else if (url === '/cats/add-breed') {
                // ADD BREED
                // breeds.push()...
                breeds.push({
                    ...Object.fromEntries(data.entries())
                })

                saveBreeds();
            } else if (url === `/cats/edit-cat/${id}`) {
                let modified = { ...Object.fromEntries(data) }
                console.log(modified);

                cats[cats.findIndex(c => c.id == id)] = modified

                saveCats()
            } else if (url === `/cats/edit-cat/${id}`) {
                let modified = { ...Object.fromEntries(data) }
                console.log(modified);

                cats[cats.findIndex(c => c.id == id)] = modified

                saveCats()
            }else if (url === `/cats/shelter-cat/${id}`) {
                let toShelter = { ...Object.fromEntries(data) }
                console.log(toShelter);

                cats = cats.filter(cat => cat.id != id);
                
                saveCats()
            }

            //redirect to main page
            //301 - redirect?
            res.writeHead(301, {
                'location': '/' // send to main page
            })
            res.end();
        });

        return;
    }

    //Load assets
    // primitive routing
    if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css',
        })

        res.write(siteCss)

        return res.end(); // за да не продължава надолу
    }

    res.writeHead(200, {
        'content-type': 'text/html',
    })


    switch (req.url) {
        case '/':
            res.write(homePage(cats));
            break;

        case '/cats/add-breed':
            res.write(addBreedPage());
            break;
        case '/cats/add-cat':
            res.write(addCatPage(breeds));
            break;
        case `/cats/edit-cat/${id}`:
            initCat(id);
            res.write(editCatPage(cat, breeds));
            break;
        case `/cats/shelter-cat/${id}`:
            initCat(id);
            res.write(catShelterHtml(cat));
            break;

        default:
            res.write('Page not found');
            break;
    }



    res.end();

})

async function initCats() {
    //string
    const catsJSON = await fs.readFile('./cats.json', { encoding: 'utf-8' });
    const breedsJSON = await fs.readFile('./breeds.json', { encoding: 'utf-8' });

    //object
    cats = JSON.parse(catsJSON)
    breeds = JSON.parse(breedsJSON)
}

async function initCat(id) {
    cat = cats.find(cat => cat.id == id);
    return cat;
}

async function saveCats() {
    // get current snapshot of cats from memory to save to the cats.json file

    // turn into string
    const catsJSON = JSON.stringify(cats, null, 2)

    // to save into file
    // filePath, which data, which encoding
    await fs.writeFile('./cats.json', catsJSON, { encoding: 'utf-8' });
}

async function saveBreeds() {
    // get current snapshot of breeds from memory to save to the breeds.json file

    // turn into string
    const breedsJSON = JSON.stringify(breeds, null, 2)

    // to save into file
    // filePath, which data, which encoding
    await fs.writeFile('./breeds.json', breedsJSON, { encoding: 'utf-8' });
}

server.listen(5000);
console.log("Server is listening on http://localhost:5000...");
