export default (cat) => `<!DOCTYPE html>
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
        <form action="/cats/shelter-cat/${cat.id}" method="POST" class="cat-form">
            <h2>Shelter the cat</h2>
            <img name="imageUrl" src="${cat.imageUrl}" alt="">
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${cat.name}" disabled>
            <label for="description">Description</label>
            <textarea name="description" id="description" disabled>${cat.description}</textarea>
            <label for="group">Breed</label>
            <select name="breed" id="group" disabled>
                <option value="${cat.breed}">${cat.breed}</option>
            </select>
            <button>SHELTER THE CAT</button>
        </form>
    </main>
</body>


</html>
`