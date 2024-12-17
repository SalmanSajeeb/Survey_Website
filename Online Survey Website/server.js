const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { name, email, age, feedback } = req.body;
    let errors = [];

    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters long.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid email format.');
    }

    if (age && (age < 18 || age > 99)) {
        errors.push('Age must be between 18 and 99.');
    }

    if (!feedback || feedback.length < 50) {
        errors.push('Feedback must be at least 50 characters long.');
    }

    if (errors.length > 0) {
        res.send(`<p>${errors.join('<br>')}</p><a href="survey.html">Back to Survey</a>`);
    } else {
        res.send(`<p>Thank you for your feedback!</p>`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
