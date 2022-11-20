# discord-altv-bot

## Description

Discord Altv Bot is a Discord bot to handle all your altV server needs directly from discord.

For now, it let's you start, stop, restart and see the status of your server by using `/` commands in Discord.

## Usage

<b syle="color:red">Not to be used in production (yet)! At the moment any member of a server can run all commands in any channel.</b>

Once the bot is up and running, you can use the following commands:

`/server operation start` - Starts the altv-server

`/server operation stop` - Stops the altv-server

`/server operation restart` - Restarts the altv-server

`/server operation status` - Returns the status of the server (`ONLINE` or `OFFLINE`)

## Installation

### Requirements

1. Any operatingsystem running systemd (eg Ubuntu)
2. Need to have root access
3. NodeJS installed (NodeJS 13 or higher)
4. Discord bot needs to be running on the same server as altv

```
WARNING!
YOU DO NOT WANT TO RUN THIS BOT OR ALTV UNDER YOUR ROOT ACCOUNT
CREATE ANOTHER USERACCOUNT TO RUN ALTV AND THE BOT
```

### Installation steps

#### <b>Step 1. Invite the bot to your discord</b>

Head over to https://discord.com/developers/applications

1. Create a new application
2. Go to OAuth2 -> URL Generator
3. From `Scopes` select `bot`
4. From `Bot permissions` select `Administrator`
5. Paste the generated URL at the bottom into your web-browser and invite the bot to your server

#### <b>Step 2. Install the bot on your server</b>

Clone this repo to your server and install all necessary packages

```bash
git clone https://github.com/svnoak/discord-altv-bot.git
cd discord-altv-bot
npm install
node deploy-commands.js
```

Open config.json

```bash
nano config.json
```

Fill in CLIENT_ID, CLIENT_SECRET and SERVER_ID.

##### <b>Where to find CLIENT_ID and CLIENT_SECRET</b>

Head over to https://discord.com/developers/applications

1. Create a new application (you can call it "Discord altV Bot)
2. Go to OAuth2
3. Copy CLIENT ID and CLIENT SECRET

##### <b>Where to find SERVER_ID</b>

Open Discord on your computer, right click on your server in the left list and click "Copy ID"

#### Step 3

I advise strongly to run altv and the discord bot under another user that is not root!

First we enable linger for the selected user and run following command as root

`USERNAME` is the username of the user running altv-server and the bot

```bash
sudo loginctl enable-linger *USERNAME*
```

```bash
mkdir /home/USERNAME/.local/share/systemd
mkdir /home/USERNAME/.local/share/systemd/user
cd /home/USERNAME/.local/share/systemd/user
nano altv-bot.service
```

Copy the folling into altv-bot.service

```systemd
[Unit]
Description=altV Dev Server Discord bot
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/node /home/USERNAME/discord-bot/index.js
Restart=on-failure

[Install]
WantedBy=default.target
```

Create another file called altv-server.service and into it the following

```systemd
[Unit]
Description=altV Dev Serve
After=network.target

[Service]
Type=simple
ExecStart=/home/USERNAME/ALTV-DIRECTORY/altv-server
Restart=on-failure

[Install]
WantedBy=default.target

```

Login as `USERNAME`

Start the altv-bot

```
systemctl --user start altv-bot
```

You should see the bot being online on your server.