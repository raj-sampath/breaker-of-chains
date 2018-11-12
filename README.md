# Breaker Of Chains
Solution for GeekTrust Breaker Of Chains on NodeJS

## Problem Statement
The other kingdoms in the Universe also yearn to be the ruler of Southeros and war is imminent! The High Priest of Southeros
intervenes and is trying hard to avoid a war and he suggests a ballot system to decide the ruler.
Your coding challenge is to help the High Priest choose the ruler of Southeros through the ballot system.

### Rules of the Ballot system
1. Any kingdom can compete to be the ruler.
2. They should send a message to all other kingdoms asking for allegiance.
3. This message will be put in a ballot from which the High Priest will pick 6 random messages.
4. The High Priest then hands over the 6 messages to the respective receiving kingdoms.
5. The kingdom that receives the highest number of allegiance is the ruler.

### Rules to decide allegiance by a kingdom
1. The receiving kingdom has to give allegiance to the sending kingdom if the message contains the letters of the animal in their emblem (same as problem 1).
2. If the receiving kingdom is competing to be the ruler, they will not give their allegiance even if the message they received is correct. 
3. A kingdom cannot give their allegiance twice. If they have given their allegiance once, they will not give their allegiance again even
if they get a second message and the message is correct.

### In case there is a tie
1. If there is a tie, the whole ballot process is repeated but only with the tied kingdoms till there is a winner.

### Sending messages
The format of the message dropped in the ballot should contain :
The Sender kingdom
The Receiver kingdom
The Message

## Sample Input 1
Who is the ruler of Southeros?  
**Output**: None

Allies of Ruler?  
**Output**: None

Enter the kingdoms competing to be the ruler: Input: Ice Space Air

Results after round one ballot count  
**Output**: Allies for Ice : 2  
**Output**: Allies for Space: 1  
**Output**: Allies for Air: 0  

Who is the ruler of Southeros?  
**Output**: Ice

Allies of Ruler?  
**Output**: Land Fire

## Sample Input 2
Who is the ruler of Southeros?  
**Output**: None

Allies of Ruler?  
**Output**: None

Results after round one ballot count  
**Output**: Allies for Land : 1  
**Output**:: Allies for Air: 1  

Results after round two ballot count   
**Output**: Allies for Land Output: 1  
**Output**: Allies for Air: 2  

Enter the kingdoms competing to be the ruler: Input: Land Air
 
## Running the Game
1. Clone the Code
2. Open Terminal/Command Prompt and navigate to the the code folder.
3. npm install
4. node game.js
