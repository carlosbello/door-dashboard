#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>


#define DEBUG 1

// Bath Room IDs
const int  R1 = 14;
const int  R2 = 12;
const int  R3 = 13;
int RID[2];

int roomID = 2;

// State  (-1 = Undefined | 0 = Open | 1 = Closed)
String CurrentState = "";
boolean flag_chg = false;

// Wifi Connectivity Details
const char* ssid     = "tuentiguests";
const char* password = "XXX"; // <---- Put the WiFi password here


// Web Server details
const char* host = "http://server.domain/api/path"; // <--- Put the API endpoint here

// Helper Functions
void checkSensor0(){
    int TResult = digitalRead(R2);

    if(TResult == HIGH){
        Serial.print("Sensor(");
        Serial.print(roomID);
        Serial.println(") is CLOSED");
        CurrentState = "closed"; 
    }
    if(TResult == LOW){
        Serial.print("Sensor(");
        Serial.print(roomID);
        Serial.println(") is OPEN");
        CurrentState = "open"; 
    }
    flag_chg = true;
}



void setup() {

    RID[0] = R1;
    RID[1] = R2;
    RID[2] = R3;

    // Limit Switch Pinouts
    pinMode(R1, INPUT_PULLUP);
    pinMode(R2, INPUT_PULLUP);
    pinMode(R3, INPUT_PULLUP);

    // Wifi connectivity establish
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }


    // Console Setup
    Serial.begin(115200);

    Serial.println("");
    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    // handlers for PIN Interruption
    attachInterrupt(digitalPinToInterrupt(R2), checkSensor0, CHANGE);
   
}


void loop() {
    delay(500);
    Serial.print("connecting to ");
    Serial.println(host);

      HTTPClient http;  

     // Sample Request  
     //String url = "room=hombres cocina&type=wc&status=closed&id=3";

       String url = "room=Kitchen´ men toilet&";
       url+= "type=wc&";
       url+= "status=";
       url+= CurrentState;
       url+= "&id=";
       url+=roomID;

      if(flag_chg == true){
        Serial.print("Establishing connection to ");
        Serial.println(host);
        http.begin(host);
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");
        http.POST(url);
        http.writeToStream(&Serial);
        http.end();
        
        flag_chg = false;
      }
}
