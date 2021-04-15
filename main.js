"use strict"

const assert = require("assert")
const readline = require("readline")
const { start } = require("repl")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
}

// This function shows the user what the board currently looks like. It updates after every time a move is made.
const printStacks = () => {
  console.log("a: " + stacks.a)
  console.log("b: " + stacks.b)
  console.log("c: " + stacks.c)
}

// This function move the piece from one array to another. It only runs if the conditions of valid entry and legal move have been made. It always removes the last index in the array.
const movePiece = (startStack, endStack) => {
  // Your code here
  stacks[endStack].push(stacks[startStack][stacks[startStack].length - 1])
  stacks[startStack].splice([stacks[startStack].length - 1], 1)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// This function checks if the move is legal or not, it returns true or false, which will then continue the towersOfHanoi function and another conditional will be run either allowing the move or rejecting and telling the user that the move is not legal.
const isLegal = (startStack, endStack) => {
  // Your code here
  if (stacks[startStack][startStack.length - 1] < stacks[endStack][endStack.length - 1] || stacks[endStack] == 0) {
    return true
  } else {
    return false
  }
}

// This function checks for a valid input. If input is valid the towersOfHanoi function will run with the user input in each parameter.
const isValidInput = (startStack, endStack) => {
  if ((startStack == "a" || startStack == "b" || startStack == "c") && (endStack == "a" || endStack == "b" || endStack == "c")) {
    return true
  } else {
    return false
  }
}

// This function runs after a move has been made. If a win condition is met, the user will receive a victory message and the board will be reset. The game will restart by invoking the resetBoard function.
const checkForWin = () => {
  // Your code here
  if (stacks.b.length == 4 || stacks.c.length == 4) {
    console.log("you win")
    resetBoard()
    return true
  } else {
    return false
    getPrompt()
  }
}

//This function resets the board to it's default value. It runs when a win condition has been met.
const resetBoard = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  }
}

// This function contains most of the other functions that will run over the course of this game. It controls the flow of the game and checks the logic for if the game should continue or not.
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  isLegal(startStack, endStack)
  if (isLegal(startStack, endStack) == true) {
    movePiece(startStack, endStack)
    checkForWin()
  } else {
    console.log("That is not a legal move.")
    getPrompt()
  }
}

// This function sets the prompt for the user and asks for their input. It repeats every time after a move is made or if an invalid entry was made by the user.
const getPrompt = () => {
  printStacks()
  rl.question("start stack: ", startStack => {
    rl.question("end stack: ", endStack => {
      isValidInput(startStack, endStack)
      if (isValidInput(startStack, endStack) == true) {
        towersOfHanoi(startStack, endStack)
        getPrompt()
      } else {
        console.log("You can only input 'a', 'b', or 'c'. Please re-enter your stack choices.")
        getPrompt()
      }
    })
  })
}

// Tests

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi("a", "b")
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] })
    })
  })

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      }
      assert.equal(isLegal("a", "b"), false)
    })
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      }
      assert.equal(isLegal("a", "c"), true)
    })
  })
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] }
      assert.equal(checkForWin(), true)
      stacks = { a: [1], b: [4, 3, 2], c: [] }
      assert.equal(checkForWin(), false)
    })
  })
} else {
  getPrompt()
}
