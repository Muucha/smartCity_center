radio.onReceivedValue(function (name, value) {
    if (name == "taro") {
        taro = value
        led.toggle(0, 0)
    } else if (name == "hanako") {
        hanako = value
        led.toggle(1, 0)
    }
})
let average = 0
let hanako = 0
let taro = 0
radio.setGroup(1)
basic.forever(function () {
    average = (taro + hanako) / 2
    serial.writeValue("taro", taro)
    serial.writeValue("hanako", hanako)
    serial.writeValue("average", average)
    basic.pause(1000)
})
basic.forever(function () {
    if (average < 50) {
        radio.sendValue("led", 1)
    } else {
        radio.sendValue("switch", 0)
    }
    basic.pause(1000)
})
