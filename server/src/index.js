import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Use port number from the PORT environment variable or 3000 if not specified
const port = process.env.PORT || 3000;

const app = express();

const httpServer = http.createServer(app); // Assign the HTTP server to a variable

app.use(cors());
app.use(express.json());

// Create a socket.io server and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "https://a-for-ani.adaptable.app/",
    },
});

// Variables to store data on the server
const rooms = {}; // Object to store users in each room
const ready = {}; // Object to store users' ready status
const roomStates = {}; // Object to store the state of each room (whether it is in the lobby or in-game)
const socketToUser = {}; // Object to store socket.id to username mapping
const letterCards = {}; // Object to store the letter card value for each room
const answers = []; // Array to store objects of the answers submitted by each player
const votes = {}; // Object to store the votes for each answer
const playersVoted = new Set(); // Set to keep track of players who have voted
let restartVotes = {}; // Object to store the votes to restart the game

// Array of letters for random letter choosing for the client LetterCard component
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Array of letters for random letter choosing
// Aux function to generate a random index
const randomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
};

// Calculate the vote results and determine the outcome
const calculateVoteResults = (votes, answer) => {
    const voteData = votes[answer];
    if (!voteData) {
        // Handle the case where there are no votes for this answer
        return {
            answer,
            accepted: false, // Reject the answer since there are no votes
        };
    }

    const totalVotes = voteData.true + voteData.false;
    const yesPercentage = (voteData.true / totalVotes) * 100;

    if (yesPercentage > 51) {
        // Accept the answer if more than 51% voted "Yes"
        return {
            answer,
            accepted: true,
        };
    } else {
        // Reject the answer if 51% or fewer voted "Yes"
        return {
            answer,
            accepted: false,
        };
    }
};

// Reset the votes and playersVoted for the next round
const resetVotesAndPlayersVoted = () => {
    Object.keys(votes).forEach((answer) => {
        // Clear the votes for each answer
        votes[answer] = { true: 0, false: 0 };
    });

    // Clear the set of players who have voted
    playersVoted.clear();
};

const disconnectUsersAndDestroyRoom = (io, roomId) => {
    // Get all connected sockets in the room
    const roomSockets = io.sockets.adapter.rooms[roomId]?.sockets || {};

    // Disconnect all users in the room
    for (const socketId in roomSockets) {
        io.sockets.sockets[socketId].leave(roomId); // Make the users leave the room
    }

    // Delete the room
    delete io.sockets.adapter.rooms[roomId];
};

// Array of all categories for the client CategoryCard component
const allCategories = [
    "A Boy's Name",
    "U.S. Cities",
    "Things That Are Cold",
    "School Supplies",
    "Pro Sports Teams",
    "Insects",
    "Breakfast Foods",
    "T.V. Shows",
    "Things That Are Found in the Ocean",
    "Presidents",
    "Product Names",
    "Appliances",
    "Types of Drink",
    "Personality Traits",
    "Articles of Clothing",
    "Desserts",
    "Car Parts",
    "Things Found on a Map",
    "Athletes",
    "4-Letter Words",
    "Items in a Refrigerator",
    "Farm Animals",
    "Street Names",
    "Things on a Beach",
    "Colors",
    "Tools",
    "A Girl's Name",
    "Villains/Monsters",
    "Footwear",
    "Something You're Afraid Of",
    "Terms of Measurement",
    "Book Titles",
    "Heroes",
    "Gifts/Presents",
    "Kinds of Dances",
    "Things That Are Black",
    "Vehicles",
    "Tropical Locations",
    "College Majors",
    "Dairy Products",
    "Things in a Souvenir Shop",
    "Items in Your Purse/Wallet",
    "Famous Females",
    "Medicine/Drugs",
    "Things Made of Metal",
    "People in Uniform",
    "Things You Plug In",
    "Animals",
    "Languages",
    "Names Used in the Bible",
    "Junk Food",
    "Things That Grow",
    "Companies",
    "Video Games",
    "Electronic Gadgets",
    "Board Games",
    "Things That Use a Remote",
    "Card Games",
    "Internet Lingo",
    "Offensive Words",
    "Wireless Things",
    "Computer Parts",
    "Software",
    "Websites",
    "Game Terms",
    "Things in a Grocery Store",
    "Reasons to Quit Your Job",
    "Things That Have Stripes",
    "Tourist Attractions",
    "Diet Foods",
    "Things Found in a Hospital",
    "Food/Drink That Is Green",
    "Weekend Activities",
    "Seafood",
    "Christmas Songs",
    "Words Ending in -N",
    "Words With Double Letters",
    "Children's Books",
    "Things Found at a Bar",
    "Sports Played Indoors",
    "Names Used in Songs",
    "Foods You Eat Raw",
    "Places in Europe",
    "Olympic Events",
    "Things You See at the Zoo",
    "Animals in Books or Movies",
    "Things to Do at a Party",
    "Kinds of Soup",
    "Things Found in New York",
    "Things You Get Tickets For",
    "Things You Do at Work",
    "Foreign Words Used in English",
    "Things You Shouldn't Touch",
    "Spicy Foods",
    "Things at a Carnival",
    "Things You Make",
    "Places to Hang Out",
    "Honeymoon Spots",
    "Things You Buy for Kids",
    "Reasons to Take Out a Loan",
    "Things to Do on a Date",
    "Historic Events",
    "Things You Do Every Day",
    "Things You Save Up to Buy",
    "Things You Sit On",
    "Reasons to Make a Phone Call",
    "Types of Weather",
    "Titles People Can Have",
    "Things That Have Buttons",
    "Items You Take On a Trip",
    "Things That Have Wheels",
    "Reasons to Call 911",
    "Things That Make You Smile",
    "Ways to Kill Time",
    "Hobbies",
    "Holiday Activities",
    "European Capitals",
];

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("join_room", (roomId, user) => {
        // Check if the room is full
        if (roomStates[roomId] && roomStates[roomId].gameStarted) {
            socket.emit("game_in_progress");
            return;
        } else if (rooms[roomId] && rooms[roomId].length >= 4) {
            socket.emit("room_full");
            return;
        } else {
            socket.join(roomId);
            io.to(roomId).emit("user_joined", user);
        }

        // Add the user to the room on the server-side
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push(user);

        // Add the user to the socketToUser object
        socketToUser[socket.id] = user;

        // Update the readiness object when a user joins
        if (!ready[roomId]) {
            ready[roomId] = [];
        }

        // Send the list of users in the room to the newly joined user and updated readiness
        io.to(roomId).emit(
            "users_in_room",
            rooms[roomId],
            socketToUser,
            ready[roomId]
        );
    });

    socket.on("ready", (roomId, user) => {
        // Add the user to the ready object
        if (!ready[roomId]) {
            ready[roomId] = [];
        }
        ready[roomId].push(user);

        io.to(roomId).emit("users_ready", ready[roomId]);
    });

    socket.on("start_game", (roomId) => {
        if (!roomStates[roomId]) {
            roomStates[roomId] = {};
        }
        roomStates[roomId].gameStarted = true;
        roomStates[roomId].players = []; // Initialize players array

        io.to(roomId).emit("game_started");
    });

    socket.on("send_message", (roomId, message) => {
        io.to(roomId).emit("chat_message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        delete socketToUser[socket.id];
    });

    socket.on("leave_room", (roomId, user) => {
        console.log("User left room: ", socket.id);
        if (rooms[roomId]) {
            // Filter out the user from the room's user array
            rooms[roomId] = rooms[roomId].filter(
                (roomUser) => roomUser !== user
            );

            //Remove the socket id to user mapping
            delete socketToUser[socket.id];

            io.to(roomId).emit("user_left", rooms[roomId]);
        }
        socket.leave(roomId);
    });

    socket.on("generate_letter", (cardId) => {
        let genLetter = letters[randomIndex(letters)];

        // Associate the generated letter with the card's ID
        letterCards[cardId] = genLetter;

        console.log(letterCards);

        io.emit("letter_generated", letterCards);
    });

    socket.on("generate_category", () => {
        let genCategory = [];
        for (let i = 0; i < 3; i++) {
            genCategory.push(allCategories[randomIndex(allCategories)]);
        }

        console.log(genCategory);

        io.emit("category_generated", genCategory);
    });

    socket.on("answer_submitted", (answer, user) => {
        answers.push([answer, user]);
        console.log("BAKCEND answers " + answers);
        console.log(
            "BACKEND Answer submitted: " +
                answers[0][0] +
                " by " +
                answers[0][1]
        );

        //send the answer to all clients
        io.emit("start_vote", answers);
    });

    socket.on("vote_submitted", (vote, answer, users) => {
        console.log(
            "vote: " + vote + " answer: " + answer + " users: " + users
        );
        // Record the player's vote for the given answer
        votes[answer] = votes[answer] || { true: 0, false: 0 };
        votes[answer][vote]++;

        // Add the player to the set of players who have voted
        playersVoted.add(socket.id);

        if (playersVoted.size === users.length) {
            const voteResults = calculateVoteResults(votes, answer);

            //Idenepent of the vote outcome, remove the answer from the list of answers
            answers.splice(answers.indexOf(answer), 1);

            console.log(voteResults);
            io.emit("vote_outcome", voteResults);

            // Reset the votes and playersVoted for the next round
            resetVotesAndPlayersVoted();
        }
    });

    socket.on("vote_restart_game", (vote, users, room) => {
        console.log("RESTART -> vote: " + vote + " users: " + users);
        // Record the player's vote for the given answer
        // Record the player's vote for restarting the game
        restartVotes[socket.id] = vote;

        // Add the player to the set of players who have voted
        playersVoted.add(socket.id);

        if (playersVoted.size === users.length) {
            // Check if all users voted to restart
            const unanimousRestart = Object.values(restartVotes).every((v) => v);
            
            console.log("Unanimous restart: ", unanimousRestart);
            if (unanimousRestart) {
                // If all users voted to restart, emit an event to the Game component
                io.emit("restart_game");
            } else {
                // If the vote isn't unanimous, disconnect users and destroy the room
                disconnectUsersAndDestroyRoom(io, room);
            }

            // Reset the votes and playersVoted for the next vote
            restartVotes = {};
            resetVotesAndPlayersVoted();
        }
    });
});

httpServer.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
