class ChatServer {
	constructor() {
		this.rooms = [];
	}

	writeMessage(roomId, message) {
		let currentRoom = rooms.find(r => r.roomId === roomId);
		currentRoom.messages.unshift(message);

		if (currentRoom.messages.length > 30) {
			currentRoom.messages.splice(30);
		}

		return currentRoom.messages;
	}

	getAllMessage(roomId) {
		return rooms.find(r => r.roomId === roomId).messages;
	}

	checkRoom(roomId) {
		return rooms.find(r => r.roomId === roomId) != undefined;
	}

	addRoom(roomId, user) {
		rooms.push({
			'roomId': roomId,
			'users': [user],
			'messages': []
		});
	}

	joinRoom(roomId, user) {
		rooms.find(r => r.roomId === roomId).users.push(user);
	}

	leaveRoom(roomId, user) {
		let room = rooms.find(r => r.roomId === roomId);

		if (room != undefined) {
			room.users.splice(room.users.indexOf(user), 1);

			if (room.users.length === 0) {
				rooms.splice(rooms.indexOf(room), 1);
			}
		}
	}
}

module.exports = ChatServer;