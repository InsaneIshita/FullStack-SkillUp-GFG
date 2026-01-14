const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample User Data
let users = [
    {
        userUniqueId: "1",
        userName: "Vecna",
        userEmail: "henrycreel@gmail.com",
        userAge: "36"
    },
    {
        userUniqueId: "2",
        userName: "William Byers",
        userEmail: "willbyers@gmail.com",
        userAge: "17"
    },
    {
        userUniqueId: "3",
        userName: "Max Mayfield",
        userEmail: "madmax@gmail.com",
        userAge: "17"
    },
    {
        userUniqueId: "4",
        userName: "Holly Wheeler",
        userEmail: "hollyjolly@gmail.com",
        userAge: "14"
    }
];

// Home Route - Display Users
app.get("/", (req, res) => {
    res.render("home", { data: users });
});

// Add User Route
app.post("/", (req, res) => {
    const newUser = {
        userUniqueId: req.body.userUniqueId,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userAge: req.body.userAge
    };
    users.push(newUser);
    res.redirect("/");
});

// Delete User Route
app.post("/delete", (req, res) => {
    const userIdToDelete = req.body.userUniqueId;
    users = users.filter(user => user.userUniqueId !== userIdToDelete);
    res.redirect("/");
});

// Update User Route
app.post('/update', (req, res) => {
    users.forEach(user => {
        if (user.userUniqueId === req.body.userUniqueId) {
            user.userName = req.body.userName;
            user.userEmail = req.body.userEmail;
            user.userAge = req.body.userAge;
        }
    });
    res.redirect("/");
}   );

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});