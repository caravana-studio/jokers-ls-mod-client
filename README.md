<p align="center" width="100%">
    <img src="https://github.com/jokers-of-neon/jokers-of-neon-app/assets/24213554/8c72b427-fbbb-430e-8575-86d3d99cb7c8"> 
</p>

“Jokers of Neon” is a roguelike deck-builder fully on-chain card game inspired by the mechanics of the game "Balatro". Throughout the game, players face progressive challenges, testing their ability to accumulate points playing hands and enhance their deck with increasingly powerful special cards and modifiers.

Branding design, logo and Twitter account are on the way.


## React-app

Run the following commands to run the game:

    npm i
    npm run dev

You can find a .env file in the root of the project that has the default values to connect to a local instance of katana, torii and graphql.
Run the contracts before the frontend app.


## PoC

Stable version available at: https://jokers-of-neon-app.onrender.com/ 

Latest changes: https://jokers-of-neon-latest.onrender.com/ 


## Key Features:

* Free-to-Play Model: Players can enjoy the game without any initial cost, making it accessible to a wide audience.
* Mobile Compatibility: The game is designed to be played seamlessly on mobile devices.
* Accessibility for Non-Crypto Users: We aim to provide a user experience similar to traditional web2 applications by utilizing account abstraction. This allows players to engage with the game without needing prior knowledge of blockchain technology.
* Enhanced Design and User Experience (UX): Our strong focus on design ensures a visually appealing and immersive experience. Collaborating with professional designers, we are committed to delivering a high-quality interface that enhances gameplay.
* Regular Updates and Special Events: Special themed events and regular content updates keep the game fresh and exciting, providing new challenges and opportunities for players to explore.


## Game Mechanics:

Each game starts with five hands of cards and five discards per round. Players must reach a point target that increases with each round won. Upon reaching the required points, they access a store where they can use their points to enhance their plays and acquire special cards that provide unique abilities or modify the game conditions.

If a player fails to meet the point target and runs out of hands to play, the game ends and their score is recorded on a "leaderboard" that resets weekly. Players compete in two categories: "PRO" and "FREE", with prizes awarded to the top scorers in each cycle.



## What Jokers of Neon is and what is not?

Jokers of Neon is not related to betting or gambling and is not a Poker game.

The primary mission of Jokers of Neon is to be a strategic deck-building game where players construct their decks based on their strategies to accumulate points and progress through levels.


## Game Economy:

Participation in the PRO competition requires an entry ticket, with its value distributed as follows:

* 70% to the current PRO competition pool
* 7% to the current FREE competition pool
* 10% to the next cycle's PRO competition pool
* 1% to the next cycle's FREE competition pool
* The remainder is used to cover fees and profit.

Thus, the more players participate, the larger the prize pool.
(The percentages are indicative; a more in-depth study will be conducted later.)

Contract owners can add funds to the competition pool but never withdraw, ensuring transparency and fairness.


## Types of Cards and Deck:

* Traditional cards, used to form classic poker plays (pair, flush, straight, etc.)
* Neon cards. They are traditional cards with a neon design. They score double points and add +1 multi.
* Jokers, which can be used as any other traditional card as needed
* Modifier cards, which can be applied to traditional cards to achieve various effects (add more points, change suits, etc.)
* Special cards, which apply global effects that can affect specific cards or the game itself. Each game has space for adding 6 special cards. There are two types:
   * Permanent
   * Temporary: self-destruct after X number of rounds or hands

Players start with a traditional deck of 52 cards + 2 jokers. As they win rounds, they can improve their deck by adding special and modifier cards. In the store, players can also buy traditional cards, which when purchased replace other cards in the deck. This allows players to choose the type of deck they want to build according to their strategy.


## Rage Rounds:
After five rounds, the game introduces "Rage Rounds," where each round presents an additional difficulty, such as modifiers that change the value of certain cards, increasing the challenge and strategy required.


## Point Counting:
Each play has points, multi and a level. Total points are calculated by multiplying points by multi. When the level of a particular play is increased (from the store), its points and multipliers increase.

All traditional cards played in the hand are added to the points, according to their value (2 adds 2 points; 5 adds 5 points; ace adds 11 points; jack, queen, and king add 10 points; and the jokers add 15 points).
The multiplier is only altered by modifiers and special cards, as appropriate.


## Store:
At the end of each round, the user can use the points earned in the round to (1) upgrade the level of plays and (2) add cards.
In the store, all plays with their current level, points, and corresponding multipliers will be listed. Using their points, the user can upgrade the level of the plays. Randomly, only some of all the plays will be available for modification, only once per round. There will be a button with which, by paying a certain amount of points, the randomization can be rerun so that other plays are available for level upgrading.
In another section of the store, cards of different types will be listed:

* Special cards, which can be purchased and by default go to the deck. However, there is an option to pay extra to activate them immediately.
* Modifier cards, which always go to the deck
* Traditional cards, neon cards and Jokers, which go directly to the deck and must replace other cards in the deck.


## Other Game Mechanics:
* When a player completes 10 rounds in the FREE category, they gain access to the PRO category without needing to pay the entry ticket.
* Neon cards can bring both positive and negative effects at the same time.
* In addition to the weekly cycles, special weekend events or on specific dates can be organized, with special themes, new cards, and new content.




