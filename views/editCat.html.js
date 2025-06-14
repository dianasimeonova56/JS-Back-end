export default (cat, breeds) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/styles/site.css">
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <title>Cat Shelter</title>
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/cats/add-breed">Add Breed</a></li>
                <li><a href="/cats/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
    </header>
    <main>
        <form action="/cats/edit-cat/${cat.id}" method="POST" class="cat-form">
            <h2>Edit Cat</h2>
            <label for="name">${cat.name}</label>
            <input name="name" type="text" id="name" value="${cat.name}">
            <label for="description">Description</label>
            <textarea name="description" id="description">${cat.description}</textarea>
            <label for="image">Image</label>
            <input name="imageUrl" type="text" id="image" value="${cat.imageUrl}">
            <label for="group">${cat.breed}</label>
            <select name="breed" id="group">
                ${breeds.map(breed => ` <option value="${breed.breed}">${breed.breed}</option>`)}
            </select>
            <button>Edit Cat</button>
        </form>
    </main>
</body>

</html>
`