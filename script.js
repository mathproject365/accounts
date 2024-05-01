let accounts = [];
let currentUser = null;

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Basic validation
    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    // Check if username already exists
    if (accounts.find(account => account.username === username)) {
        alert('Username already exists.');
        return;
    }

    // Add account to the list
    const newAccount = { username, password, messages: [] };
    accounts.push(newAccount);

    // If current user is the newly registered user, update UI
    if (currentUser && currentUser.username === username) {
        displayCurrentUser(newAccount);
    }

    // Clear the form
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';

    // Refresh the accounts list
    displayAccounts();
}

function signIn() {
    const username = document.getElementById('sign-username').value;
    const password = document.getElementById('sign-password').value;

    // Find the user in the accounts list
    const user = accounts.find(account => account.username === username && account.password === password);

    if (!user) {
        alert('Invalid username or password.');
        return;
    }

    currentUser = user;
    document.getElementById('sign-username').value = '';
    document.getElementById('sign-password').value = '';
    document.getElementById('message-form').style.display = 'block';

    // Display current user's account details
    displayCurrentUser(currentUser);
}

function displayCurrentUser(user) {
    const currentUserDetails = document.getElementById('current-user-details');
    currentUserDetails.innerHTML = `
        <h2>Welcome, ${user.username}!</h2>
        <p>Messages:</p>
        <ul>
            ${user.messages.map(message => `<li><strong>${message.sender}:</strong> ${message.message}</li>`).join('')}
        </ul>
    `;
}

function displayAccounts() {
    const accountsList = document.getElementById('accounts');
    accountsList.innerHTML = '';
    accounts.forEach(account => {
        const listItem = document.createElement('li');
        listItem.textContent = account.username;
        listItem.onclick = () => {
            sendMessage(account.username);
        };
        listItem.oncontextmenu = (event) => {
            event.preventDefault();
            sendMessage(account.username);
            return false;
        };
        accountsList.appendChild(listItem);
    });
}

function sendMessage(recipientUsername) {
    if (!currentUser) {
        alert('Please sign in first.');
        return;
    }

    const messageContent = prompt(`Send a message to ${recipientUsername}:`);
    if (!messageContent) return;

    const recipientAccount = accounts.find(account => account.username === recipientUsername);
    if (!recipientAccount) {
        alert('Recipient not found.');
        return;
    }

    recipientAccount.messages.push({ sender: currentUser.username, message: messageContent });

    // If current user is the sender, update UI
    if (currentUser.username === recipientUsername) {
        displayCurrentUser(recipientAccount);
    }

    alert('Message sent.');
}

// Initial display of accounts
displayAccounts();
