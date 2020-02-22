# star_wars


1. After downloading the project. Please run this command to install the required packages.

> npm install

2. Then you can start project with the command 

> npm start

I have created a manual testing Document. Please check this link: 
https://github.com/siddhi1909/star-wars/blob/master/Star%20Wars%20API%20Manual%20Testing.pdf

3. We can test the project using

> npm test

I've used jest and enzymen libraries for unit testing prupose

**Description**


> Screen 1 (Login Screen)

Login allows a user to login as a character from STAR WARS using the character
name as the username and birth year as the password.

Example:

• Username: Luke Skywalker

• Password : 19BBY


> Screen 2 (Search Screen)

Includes a type-along search which searches for planets and lists them in components that are sized relative to their population on every keypress in the input field. 

So the planets card's colour width is dependent on it's population. It was a tough job jotting such a large range - 0 - 10^12 onto the widths of planets. So I've divided the population range into 4 static ranges and have used them like 1st range => 0-25% width , 2nd range => 25%-50% width and so on

On clicking the item from the results of the type-along search, it displays the corresponding planet information.

Only the user Luke Skywalker should be able to make more than 15 searches in a minute.
And the users other then Luke will get an error message.

I've also added unit tests using jest and enzyme modules

