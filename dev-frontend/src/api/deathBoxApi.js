import Api from './api.js';

const deathBoxNamespace = 'deathbox';

class DeathBoxApi extends Api {
	constructor(callbacks) {
		super(deathBoxNamespace);

		this.socket.on('createRoom', game => callbacks['createRoom'](game));
		this.socket.on('joinRoom', game => callbacks['joinRoom'](game));
		this.socket.on('updateChoice', game => callbacks['updateChoice'](game));
		this.socket.on('pileClicked', game => { console.log('Pile clicked!'); callbacks['pileClicked'](game); });
		this.socket.on('removePlayer', game => callbacks['removePlayer'](game));
	}

	createRoom(name) {
		this.socket.emit('createRoom', name);
	}

	joinRoom(room, name) {
		this.socket.emit('joinRoom', room, name);
	}

	updateChoice(choice) {
		this.socket.emit('updateChoice', choice);
	}

	pileClicked(row, column) {
		this.socket.emit('pileClicked', row, column);
	}
}

export default DeathBoxApi;