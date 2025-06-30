#include <AFMotor.h>

// Define motor pins
#define motorA1 7 // IN1
#define motorA2 6 // IN2
#define motorB1 5 // IN3
#define motorB2 4 // IN4
#define ENA 8     // PWM for motor A
#define ENB 3     // PWM for motor B

void setup() {
  Serial.begin(9600); // Start Bluetooth communication
  pinMode(motorA1, OUTPUT);
  pinMode(motorA2, OUTPUT);
  pinMode(motorB1, OUTPUT);
  pinMode(motorB2, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read(); // Read command from Bluetooth
    controlMotors(command);
  }
}

void controlMotors(char command) {
  switch (command) {
    case 'F': // Move Forward
      digitalWrite(motorA1, LOW);
      digitalWrite(motorA2, HIGH);
      digitalWrite(motorB1, HIGH);
      digitalWrite(motorB2, LOW);
      analogWrite(ENA, 255); // Set speed (max)
      analogWrite(ENB, 255); // Set speed (max)
      break;
    case 'B': // Move Backward
      digitalWrite(motorA1, HIGH);
      digitalWrite(motorA2, LOW);
      digitalWrite(motorB1, LOW);
      digitalWrite(motorB2, HIGH);
      analogWrite(ENA, 255); // Set speed (max)
      analogWrite(ENB, 255); // Set speed (max)
      break;
    case 'L': // Turn Left
      digitalWrite(motorA1, LOW);
      digitalWrite(motorA2, HIGH);
      digitalWrite(motorB1, LOW);
      digitalWrite(motorB2, HIGH);
      analogWrite(ENA, 255); // Set speed (max)
      analogWrite(ENB, 255); // Set speed (max)
      break;
    case 'R': // Turn Right
      digitalWrite(motorA1, HIGH);
      digitalWrite(motorA2, LOW);
      digitalWrite(motorB1, HIGH);
      digitalWrite(motorB2, LOW);
      analogWrite(ENA, 255); // Set speed (max)
      analogWrite(ENB, 255); // Set speed (max)
      break;
    case 'S': // Stop
      digitalWrite(motorA1, LOW);
      digitalWrite(motorA2, LOW);
      digitalWrite(motorB1, LOW);
      digitalWrite(motorB2, LOW);
      break;
    default: // Default case
      break;
  }
}
