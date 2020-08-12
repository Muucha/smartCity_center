radio.onReceivedValue(function (name, value) {
    if (name == "taro") {
        taro = value
        led.toggle(0, 0)
    } else if (name == "hanako") {
        hanako = value
        led.toggle(0, 1)
    }
})
let _switch = 0
let goukei = 0
let hanako = 0
let taro = 0
radio.setGroup(1)
basic.forever(function () {
    goukei = taro + hanako
    serial.writeValue("taro", taro)
    serial.writeValue("hanako", hanako)
    serial.writeValue("goukei", goukei)
})
basic.forever(function () {
    if (goukei < 50 && _switch == 0) {
        _switch = 1
        radio.sendValue("switch", 1)
        music.playTone(523, music.beat(BeatFraction.Eighth))
    } else if (goukei >= 50 && _switch == 1) {
        _switch = 0
        radio.sendValue("switch", 0)
        music.playTone(262, music.beat(BeatFraction.Eighth))
    }
})
