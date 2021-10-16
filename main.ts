function ShowingCountDown () {
    if (ThisLED > 0) {
        ThisLED += -1
        ring.setPixelColor(ThisLED, neopixel.rgb(0, 0, 0))
        ring.show()
        for (let index = 0; index < 1; index++) {
            if (ThisLED < 10) {
                basic.showString("" + (ThisLED))
            } else {
                basic.pause(500)
            }
            basic.pause(100)
        }
    } else {
        ThisLED = 0
        Mode = ""
        tShowingLEDIcon = 1
        pThisRunTime = input.runningTime()
        for (let index = 0; index < 2; index++) {
            BlinkPointLight()
            basic.pause(100)
        }
        BroadcastingResetMediator()
    }
}
function TestCountdown () {
    if (Mode == "CountDown") {
        for (let index = 0; index <= 15; index++) {
            ThisLED = MountOfLED - 1 - index
            ring.setPixelColor(ThisLED, neopixel.rgb(0, 0, 0))
            ring.show()
            basic.pause(1000)
        }
        for (let index = 0; index < 4; index++) {
            basic.showString("B")
            basic.pause(100)
            basic.clearScreen()
            basic.pause(100)
        }
        Mode = ""
    }
}
function BlinkPointLight () {
    basic.showIcon(IconNames.Yes)
    basic.pause(200)
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 2)
})
function FadingOutAll () {
    tThisBrightness = Brightness
    for (let index = 0; index < 6; index++) {
        tDebug += 1
        if (tThisBrightness > 0) {
            tThisBrightness += -10
        } else {
            tThisBrightness = 0
        }
        for (let index = 0; index <= MountOfLED - 1; index++) {
            ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
            ring.setBrightness(tThisBrightness)
            ring.show()
        }
        basic.pause(100)
    }
    basic.pause(50)
    for (let index = 0; index < 2; index++) {
        basic.showString("Z")
        basic.pause(100)
        basic.showString("z")
        basic.pause(100)
        basic.clearScreen()
    }
}
function BroadcastingNewSystemEvents () {
    if (Mode == "") {
        radio.sendValue("GID", GroupNum)
        radio.sendValue("ModeID", 1)
        pThisRunTime = input.runningTime()
        basic.showNumber(pRoundNumber)
        basic.pause(100)
        basic.clearScreen()
        pRoundNumber += 1
    }
}
input.onButtonPressed(Button.AB, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 0)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 1)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 3)
})
function RefillingTheRing () {
    ring.setPixelColor(ThisLED, neopixel.colors(NeoPixelColors.Blue))
    ring.show()
    basic.pause(200)
    ThisLED += 1
    pThisRunTime = input.runningTime()
}
function TurningAllOff () {
    for (let index = 0; index <= MountOfLED - 1; index++) {
        ring.setPixelColor(index, neopixel.rgb(0, 0, 0))
        ring.show()
    }
    for (let index = 0; index < 2; index++) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(50)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "ModeID") {
        // To show the breathing effect with the central point LED to represent the  standby status
        BreathingLED = 0
        if (value == 0) {
            Mode = "WakeUpAll"
            basic.showNumber(value)
            basic.showString("W")
        }
        if (value == 12) {
            Mode = "FadingOut"
            basic.showNumber(value)
        }
        if (value == 1) {
            Mode = "AllOn"
            basic.showNumber(value)
        }
        if (value == 2) {
            if (ThisLED == MountOfLED) {
                Mode = "CountDown"
            }
        }
        if (value == 3) {
            if (ThisLED < MountOfLED && ThisLED > 0) {
                basic.showNumber(value)
                basic.pause(100)
                basic.clearScreen()
                Mode = "Reverse"
            }
        }
    }
})
function FadingOutAllbug () {
    tThisBrightness = Brightness
    pRoundNumber = 5
    while (pRoundNumber > 0) {
        tThisBrightness += -15
        if (tThisBrightness <= 0) {
            tThisBrightness = 0
        }
        for (let index = 0; index <= MountOfLED - 0; index++) {
            ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
            ring.setBrightness(tThisBrightness)
            ring.show()
        }
        pRoundNumber += -1
        basic.pause(200)
    }
}
function breathingLED_Point () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        `)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(2000)
}
function TurningAllOn () {
    tThisBrightness = 10
    for (let index = 0; index < 4; index++) {
        for (let index = 0; index <= MountOfLED - 1; index++) {
            ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
            ring.setBrightness(tThisBrightness)
            ring.show()
        }
        basic.pause(100)
        tThisBrightness += 10
    }
    basic.pause(50)
    for (let index = 0; index < 2; index++) {
        basic.showIcon(IconNames.Confused)
        basic.pause(100)
        basic.clearScreen()
        basic.showIcon(IconNames.Happy)
        basic.pause(100)
    }
}
function BroadcastingResetMediator () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 99)
}
function Trashing () {
    let index = 0
    while (true) {
        ring.setBrightness(Brightness)
        basic.showNumber(pRoundNumber)
        basic.pause(100)
        basic.clearScreen()
    }
    for (let index = 0; index <= MountOfLED - 1; index++) {
        ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
        ring.setBrightness(0)
        ring.show()
    }
    if (index < 10) {
        basic.pause(10)
    } else {
        basic.pause(10)
    }
    basic.clearScreen()
    tThisBrightness = tThisBrightness + index * (Brightness / MountOfLED)
}
function ForMediator () {
    if (Mode == "") {
        if (input.runningTime() > pThisRunTime + 1 * (pIntervalMinutes * 1000)) {
            BroadcastingNewSystemEvents()
        }
    }
}
let tDebug = 0
let tThisBrightness = 0
let Mode = ""
let BreathingLED = 0
let tShowingLEDIcon = 0
let pThisRunTime = 0
let pRoundNumber = 0
let pIntervalMinutes = 0
let ThisLED = 0
let Brightness = 0
let ring: neopixel.Strip = null
let MountOfLED = 0
let GroupNum = 0
radio.setGroup(1)
// Yellow group = 1
// Blue group = 2
GroupNum = 1
MountOfLED = 16
ring = neopixel.create(DigitalPin.P1, MountOfLED, NeoPixelMode.RGB)
Brightness = 50
ring.setBrightness(Brightness)
ThisLED = 0
// Set the interval for triggering the event automatically
pIntervalMinutes = 1.5 * 60
pRoundNumber = 0
pThisRunTime = input.runningTime()
// A (1/0, 1 to to show) variable for displaying the icons on LED without interfering with NeoPixel.
tShowingLEDIcon = 1
// To show the breathing effect with the central point LED to represent the  standby status
BreathingLED = 0
basic.forever(function () {
    if (BreathingLED == 1) {
        breathingLED_Point()
    }
    if (Mode == "WakeUpAll") {
        TurningAllOn()
        basic.pause(2000)
        pThisRunTime = input.runningTime()
        ThisLED = MountOfLED
        Mode = ""
        BroadcastingResetMediator()
    }
    if (Mode == "AllOff") {
        TurningAllOff()
        Mode = ""
        BroadcastingResetMediator()
        pThisRunTime = input.runningTime()
    }
    if (Mode == "FadingOut") {
        FadingOutAll()
        basic.pause(5000)
        Mode = ""
        pThisRunTime = input.runningTime()
        BroadcastingResetMediator()
    }
    if (Mode == "AllOn") {
        TurningAllOn()
        basic.pause(5000)
        Mode = "CountDown"
        pThisRunTime = input.runningTime()
        ThisLED = MountOfLED
    }
    if (Mode == "CountDown") {
        if (tShowingLEDIcon == 1) {
            basic.showIcon(IconNames.Chessboard)
            basic.pause(200)
            basic.showIcon(IconNames.Target)
            basic.pause(200)
            basic.showIcon(IconNames.Diamond)
            basic.pause(500)
            basic.showIcon(IconNames.SmallDiamond)
            tShowingLEDIcon = 0
        }
        ShowingCountDown()
    }
    if (Mode == "Reverse") {
        while (ThisLED < MountOfLED) {
            RefillingTheRing()
        }
        basic.showIcon(IconNames.SmallDiamond)
        basic.pause(1000)
        FadingOutAllbug()
        BreathingLED = 1
        Mode = ""
        BroadcastingResetMediator()
        pThisRunTime = input.runningTime()
        ThisLED = MountOfLED
        if (ThisLED < MountOfLED) {
            basic.pause(200)
            ThisLED += 1
            if (ThisLED == MountOfLED) {
            	
            } else {
                for (let index = 0; index < 2; index++) {
                    BlinkPointLight()
                    basic.pause(100)
                }
            }
        }
    }
})
