# Control Deck Particle Toggle

A Control Deck plugin to interact with a toggle (on/off) controlled by a Particle device.

## Usage

### Authentication

Follow the steps [here](https://docs.particle.io/reference/SDKs/javascript/#logging-in) to obtain an access token and set it to `PARTICLE_LOGIN_TOKEN` in your env.

### Setup

```
"button_0": {
  "plugin": "control-deck-particle-toggle",
  "options": {
    "particle_id": "XXXXXXXXXXXXXXXX",
    "status_variable": "isFlagUp",
    "on_function": "flagUp",
    "off_function": "flagDown",
    "on_icon": "dnd.png",
    "off_icon": "dnd-off.png"
  }
}
```

`statusVariable` is the variable defined in your Particle setup to track the status of whatever you're toggling. This should be a boolean.  
`on_function` / `off_function` are the functions defined in Particle.  
`on_icon` / `off_icon` (optional). Supply images to place on your button. Will fallback to a gray or green button if no images are supplied.
