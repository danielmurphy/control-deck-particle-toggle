const Particle = require('particle-api-js');
const path = require('path');

class ControlDeckParticleToggle {
  constructor(streamDeck, buttonId, options) {
    this.particle = new Particle();
    this.statusVariable = options.status_variable;
    this.status = null;
    this.buttonId = buttonId;
    this.streamDeck = streamDeck;
    this.particleId = options.particle_id;
    this.onFunction = options.on_function;
    this.offFunction = options.off_function;

    if (options.on_icon) {
      this.onIconPath = path.resolve(
        path.dirname(require.main.filename),
        options.on_icon
      );
    }
    if (options.off_icon) {
      this.offIconPath = path.resolve(
        path.dirname(require.main.filename),
        options.off_icon
      );
    }

    this._getStatus();
    setInterval(() => {
      this._getStatus();
    }, 1000);

    this.streamDeck.on('up', keyIndex => {
      if (keyIndex === this.buttonId) {
        this._setStatus(!this.status);
      }
    });
  }

  _getStatus() {
    this.particle
      .getVariable({
        name: this.statusVariable,
        deviceId: this.particleId,
        auth: process.env.PARTICLE_LOGIN_TOKEN
      })
      .then(data => {
        this._setStatus(data.body.result);
      });
  }

  _setStatus(newStatus) {
    if (this.status !== null && this.status !== newStatus) {
      const functionToCall = newStatus ? this.onFunction : this.offFunction;
      console.log(`sending ${functionToCall}`);
      this.particle.callFunction({
        name: functionToCall,
        deviceId: this.particleId,
        auth: process.env.PARTICLE_LOGIN_TOKEN
      });
    }
    this.status = newStatus;
    this._updateStreamDeck();
  }

  _updateStreamDeck() {
    if (this.status) {
      this.onIconPath
        ? this.streamDeck.fillImageFromFile(this.buttonId, this.onIconPath)
        : this.streamDeck.fillColor(this.buttonId, 0, 255, 0);
    } else {
      this.offIconPath
        ? this.streamDeck.fillImageFromFile(this.buttonId, this.offIconPath)
        : this.streamDeck.fillColor(this.buttonId, 200, 200, 200);
    }
  }
}

module.exports = ControlDeckParticleToggle;
